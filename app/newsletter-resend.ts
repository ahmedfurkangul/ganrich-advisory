// Keeps the Resend contact list in step with the subscribers table, so the weekly Sunday Brief can be
// sent as a Resend Broadcast to one segment per language. D1 stays the record of consent; Resend only
// holds confirmed addresses and their language.
//
// The variables are secrets set with wrangler, so they are not in the generated Env type; routes cast to
// ResendSyncEnv. Configuration (all optional; without them nothing is synced and nothing fails):
// - RESEND_API_KEY: the existing sending key (needs access to contacts).
// - RESEND_SEGMENT_TR / RESEND_SEGMENT_EN: segment ids created in the Resend dashboard.
// - RESEND_WEBHOOK_SECRET: signing secret (whsec_…) of the webhook that reports unsubscribes back.

import type { NewsletterLang } from "./newsletter-core";

export type ResendSyncEnv = {
  RESEND_API_KEY?: string;
  RESEND_SEGMENT_TR?: string;
  RESEND_SEGMENT_EN?: string;
};

const api = "https://api.resend.com";

function segmentFor(env: ResendSyncEnv, lang: NewsletterLang) {
  return lang === "tr" ? env.RESEND_SEGMENT_TR : env.RESEND_SEGMENT_EN;
}

// Adds a confirmed subscriber to the segment for their language and takes them out of the other one.
export async function syncSubscribed(env: ResendSyncEnv, email: string, lang: NewsletterLang, fetcher: typeof fetch = fetch): Promise<"synced" | "skipped" | "failed"> {
  const segment = segmentFor(env, lang);
  if (!env.RESEND_API_KEY || !segment) return "skipped";
  const headers = { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" };
  const contact = encodeURIComponent(email);
  try {
    const created = await fetcher(`${api}/contacts`, { method: "POST", headers, body: JSON.stringify({ email, unsubscribed: false, segments: [{ id: segment }] }) });
    if (!created.ok) {
      // The contact most likely exists already (an earlier sign-up): subscribe it again and add the segment.
      const updated = await fetcher(`${api}/contacts/${contact}`, { method: "PATCH", headers, body: JSON.stringify({ unsubscribed: false }) });
      const added = await fetcher(`${api}/contacts/${contact}/segments/${encodeURIComponent(segment)}`, { method: "POST", headers });
      if (!updated.ok || !added.ok) {
        console.error("Resend contact sync failed", created.status, updated.status, added.status);
        return "failed";
      }
    }
    const other = segmentFor(env, lang === "tr" ? "en" : "tr");
    if (other && other !== segment) {
      // Best effort: a language change should not leave the address in both lists.
      await fetcher(`${api}/contacts/${contact}/segments/${encodeURIComponent(other)}`, { method: "DELETE", headers }).catch(() => undefined);
    }
    return "synced";
  } catch (caught) {
    console.error("Resend contact sync failed", caught instanceof Error ? caught.name : "unknown");
    return "failed";
  }
}

// Marks an address as unsubscribed from all broadcasts in Resend.
export async function syncUnsubscribed(env: ResendSyncEnv, email: string, fetcher: typeof fetch = fetch): Promise<"synced" | "skipped" | "failed"> {
  if (!env.RESEND_API_KEY || (!env.RESEND_SEGMENT_TR && !env.RESEND_SEGMENT_EN)) return "skipped";
  try {
    const response = await fetcher(`${api}/contacts/${encodeURIComponent(email)}`, {
      method: "PATCH",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ unsubscribed: true }),
    });
    // 404: the address never reached Resend, so there is nothing to unsubscribe.
    if (!response.ok && response.status !== 404) {
      console.error("Resend unsubscribe sync failed", response.status);
      return "failed";
    }
    return "synced";
  } catch (caught) {
    console.error("Resend unsubscribe sync failed", caught instanceof Error ? caught.name : "unknown");
    return "failed";
  }
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

function bytesToBase64(bytes: ArrayBuffer) {
  let binary = "";
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

// Verifies a Resend (Svix) webhook: HMAC-SHA256 over "id.timestamp.body" with the base64 secret after
// "whsec_", compared with each "v1,<signature>" in the header. Rejects timestamps more than 5 minutes off.
export async function verifyResendWebhook(secret: string | undefined, headers: Headers, body: string, now = Date.now()) {
  const id = headers.get("svix-id");
  const timestamp = headers.get("svix-timestamp");
  const signatures = headers.get("svix-signature");
  if (!secret?.startsWith("whsec_") || !id || !timestamp || !signatures) return false;
  const seconds = Number(timestamp);
  if (!Number.isFinite(seconds) || Math.abs(now / 1000 - seconds) > 300) return false;
  let key: CryptoKey;
  try {
    key = await crypto.subtle.importKey("raw", base64ToBytes(secret.slice("whsec_".length)), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  } catch {
    return false;
  }
  const expected = bytesToBase64(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${id}.${timestamp}.${body}`)));
  return signatures.split(" ").some(entry => {
    const [version, signature] = entry.split(",");
    if (version !== "v1" || !signature || signature.length !== expected.length) return false;
    let difference = 0;
    for (let index = 0; index < expected.length; index += 1) difference |= expected.charCodeAt(index) ^ signature.charCodeAt(index);
    return difference === 0;
  });
}

// Reads which address, if any, a webhook event says should stop receiving the newsletter.
export function unsubscribedEmailFrom(event: unknown): string | null {
  if (!event || typeof event !== "object") return null;
  const { type, data } = event as { type?: unknown; data?: { email?: unknown; unsubscribed?: unknown } };
  if (typeof data?.email !== "string") return null;
  if (type === "contact.deleted" || (type === "contact.updated" && data.unsubscribed === true)) return data.email.trim().toLowerCase();
  return null;
}
