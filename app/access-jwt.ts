// Verifies Cloudflare Access application tokens (RS256 JWTs) with WebCrypto.
// Kept free of runtime imports so it can be unit-tested directly in Node.

export type AccessKeySource = (teamDomain: string) => Promise<JsonWebKey[]>;

export type AccessVerifyOptions = {
  teamDomain: string;
  audience: string;
  fetchKeys?: AccessKeySource;
  now?: number;
};

type JwtHeader = { alg?: string; kid?: string };
type JwtPayload = { aud?: string | string[]; email?: string; exp?: number; nbf?: number; iss?: string };
type KeyWithKid = JsonWebKey & { kid?: string };

const KEY_CACHE_MS = 10 * 60 * 1000;
const keyCache = new Map<string, { keys: JsonWebKey[]; fetchedAt: number }>();

export function normalizeTeamDomain(value: string): string {
  return value.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "").toLowerCase();
}

function base64UrlToBytes(value: string): Uint8Array<ArrayBuffer> {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function decodeJson<T>(segment: string): T | null {
  try {
    return JSON.parse(new TextDecoder().decode(base64UrlToBytes(segment))) as T;
  } catch {
    return null;
  }
}

export const fetchAccessKeys: AccessKeySource = async teamDomain => {
  const cached = keyCache.get(teamDomain);
  if (cached && Date.now() - cached.fetchedAt < KEY_CACHE_MS) return cached.keys;
  const response = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!response.ok) throw new Error(`Access certificate request failed with ${response.status}.`);
  const body = await response.json() as { keys?: JsonWebKey[] };
  const keys = Array.isArray(body.keys) ? body.keys : [];
  keyCache.set(teamDomain, { keys, fetchedAt: Date.now() });
  return keys;
};

/** Returns the verified email in the token, or null when any check fails. */
export async function verifyAccessToken(token: string, options: AccessVerifyOptions): Promise<string | null> {
  const teamDomain = normalizeTeamDomain(options.teamDomain);
  const audience = options.audience.trim();
  if (!teamDomain || !audience) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [headerSegment, payloadSegment, signatureSegment] = parts;
  const header = decodeJson<JwtHeader>(headerSegment);
  const payload = decodeJson<JwtPayload>(payloadSegment);
  if (!header || !payload || header.alg !== "RS256" || !header.kid) return null;

  const now = Math.floor((options.now ?? Date.now()) / 1000);
  const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!audiences.includes(audience)) return null;
  if (payload.iss !== `https://${teamDomain}`) return null;
  if (typeof payload.exp !== "number" || payload.exp <= now) return null;
  if (typeof payload.nbf === "number" && payload.nbf > now + 60) return null;
  if (typeof payload.email !== "string" || !payload.email.includes("@")) return null;

  let keys: JsonWebKey[];
  try {
    keys = await (options.fetchKeys ?? fetchAccessKeys)(teamDomain);
  } catch {
    return null;
  }
  const jwk = (keys as KeyWithKid[]).find(key => key.kid === header.kid);
  if (!jwk) return null;

  try {
    const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const valid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      base64UrlToBytes(signatureSegment),
      new TextEncoder().encode(`${headerSegment}.${payloadSegment}`),
    );
    return valid ? payload.email.toLowerCase() : null;
  } catch {
    return null;
  }
}
