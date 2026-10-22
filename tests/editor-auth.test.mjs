import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { verifyAccessToken } from "../app/access-jwt.ts";

const TEAM = "ganrich.cloudflareaccess.com";
const AUD = "test-audience-tag";

function base64Url(bytes) {
  return Buffer.from(bytes).toString("base64url");
}

async function keyPair(kid) {
  const pair = await crypto.subtle.generateKey(
    { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    true,
    ["sign", "verify"],
  );
  const jwk = { ...(await crypto.subtle.exportKey("jwk", pair.publicKey)), kid };
  return { privateKey: pair.privateKey, jwk };
}

async function sign(privateKey, payload, header = { alg: "RS256", kid: "k1", typ: "JWT" }) {
  const encoder = new TextEncoder();
  const head = base64Url(encoder.encode(JSON.stringify(header)));
  const body = base64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, encoder.encode(`${head}.${body}`));
  return `${head}.${body}.${base64Url(new Uint8Array(signature))}`;
}

const now = Date.UTC(2026, 9, 22, 12, 0, 0);
const valid = {
  aud: [AUD],
  email: "Editor@Example.com",
  iss: `https://${TEAM}`,
  exp: now / 1000 + 600,
  nbf: now / 1000 - 10,
};

test("accepts a correctly signed Cloudflare Access token", async () => {
  const { privateKey, jwk } = await keyPair("k1");
  const token = await sign(privateKey, valid);
  const email = await verifyAccessToken(token, { teamDomain: `https://${TEAM}/`, audience: AUD, now, fetchKeys: async () => [jwk] });
  assert.equal(email, "editor@example.com");
});

test("rejects forged, expired, mis-addressed and malformed tokens", async () => {
  const { privateKey, jwk } = await keyPair("k1");
  const attacker = await keyPair("k1");
  const options = { teamDomain: TEAM, audience: AUD, now, fetchKeys: async () => [jwk] };

  assert.equal(await verifyAccessToken(await sign(attacker.privateKey, valid), options), null, "wrong signing key");
  assert.equal(await verifyAccessToken(await sign(privateKey, { ...valid, exp: now / 1000 - 1 }), options), null, "expired");
  assert.equal(await verifyAccessToken(await sign(privateKey, { ...valid, aud: ["other-app"] }), options), null, "other audience");
  assert.equal(await verifyAccessToken(await sign(privateKey, { ...valid, iss: "https://evil.cloudflareaccess.com" }), options), null, "other issuer");
  assert.equal(await verifyAccessToken(await sign(privateKey, valid, { alg: "none", kid: "k1" }), options), null, "alg none");
  assert.equal(await verifyAccessToken(await sign(privateKey, valid, { alg: "RS256", kid: "unknown" }), options), null, "unknown key");
  assert.equal(await verifyAccessToken("not-a-token", options), null, "malformed");
  assert.equal(await verifyAccessToken(await sign(privateKey, valid), { ...options, audience: "" }), null, "unconfigured");
});

test("editor identity never comes from a client-supplied Sites header", async () => {
  const [auth, worker, pages, ...routes] = await Promise.all([
    readFile(new URL("../app/editor-auth.ts", import.meta.url), "utf8"),
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/pdf-insight-pages.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/pdf-insights/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/pdf-insights/chunked/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/pdf-insights/[id]/document/route.ts", import.meta.url), "utf8"),
  ]);

  assert.match(auth, /env\.EDITOR_AUTH === "sites"/);
  assert.match(auth, /allowedEmails\(env\.EDITOR_EMAILS\)\.has\(email\)/);
  assert.match(worker, /withoutUntrustedIdentity\(request, env\)/);
  assert.match(pages, /requireEditor\(\)/);
  for (const route of routes) {
    assert.doesNotMatch(route, /oai-authenticated-user-email/);
    assert.match(route, /editorFromRequest\(request\)/);
  }
});
