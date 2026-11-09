import assert from "node:assert/strict";
import test from "node:test";
import { confirmationMessage, isToken, newToken, normaliseEmail, sendConfirmation } from "../app/newsletter-core.ts";

test("normalises and validates subscriber email addresses", () => {
  assert.equal(normaliseEmail("  Ayse@Example.COM "), "ayse@example.com");
  assert.equal(normaliseEmail("not-an-email"), "");
  assert.equal(normaliseEmail(42), "");
});

test("creates unguessable 48-character tokens and rejects anything else", () => {
  const token = newToken();
  assert.ok(isToken(token));
  assert.notEqual(token, newToken());
  assert.equal(isToken("abc"), false);
  assert.equal(isToken("' OR 1=1 --".padEnd(48, "a")), false);
});

test("writes the confirmation email in the visitor's language with confirm and unsubscribe links", () => {
  const token = "a".repeat(48);
  const tr = confirmationMessage("tr", "https://ganrichadvisory.com", token);
  assert.match(tr.subject, /onaylayın/);
  assert.match(tr.text, new RegExp(`https://ganrichadvisory.com/api/newsletter/confirm\\?token=${token}`));
  assert.match(tr.text, new RegExp(`/tr/icgoruler/mevzuat-bulteni\\?unsubscribe=${token}`));
  const en = confirmationMessage("en", "https://ganrichadvisory.com", token);
  assert.match(en.text, /\/en\/insights\/regulation-updates\?unsubscribe=/);
});

test("sends the confirmation through Resend only when configured", async () => {
  assert.equal(await sendConfirmation({}, "a@example.com", "en", "https://x", "a".repeat(48)), "skipped");
  let sent;
  const fetcher = async (url, init) => { sent = { url, body: JSON.parse(init.body) }; return new Response("{}", { status: 200 }); };
  const result = await sendConfirmation({ RESEND_API_KEY: "k", INQUIRY_NOTIFY_FROM: "Ganrich <n@example.com>" }, "a@example.com", "tr", "https://x", "a".repeat(48), fetcher);
  assert.equal(result, "sent");
  assert.equal(sent.url, "https://api.resend.com/emails");
  assert.deepEqual(sent.body.to, ["a@example.com"]);
  assert.equal(sent.body.from, "Ganrich <n@example.com>");
});

test("adds a confirmed subscriber to the Resend segment for their language, and only when configured", async () => {
  const { syncSubscribed } = await import("../app/newsletter-resend.ts");
  assert.equal(await syncSubscribed({ RESEND_API_KEY: "k" }, "a@example.com", "tr"), "skipped");
  const calls = [];
  const fetcher = async (url, init) => { calls.push({ url, method: init.method, body: init.body && JSON.parse(init.body) }); return new Response("{}", { status: 200 }); };
  const env = { RESEND_API_KEY: "k", RESEND_SEGMENT_TR: "seg-tr", RESEND_SEGMENT_EN: "seg-en" };
  assert.equal(await syncSubscribed(env, "a@example.com", "tr", fetcher), "synced");
  assert.equal(calls[0].url, "https://api.resend.com/contacts");
  assert.deepEqual(calls[0].body, { email: "a@example.com", unsubscribed: false, segments: [{ id: "seg-tr" }] });
  assert.deepEqual(calls.at(-1), { url: "https://api.resend.com/contacts/a%40example.com/segments/seg-en", method: "DELETE", body: undefined });
});

test("re-subscribes an existing Resend contact when creating it fails", async () => {
  const { syncSubscribed } = await import("../app/newsletter-resend.ts");
  const calls = [];
  const fetcher = async (url, init) => { calls.push(`${init.method} ${url}`); return new Response("{}", { status: calls.length === 1 ? 409 : 200 }); };
  assert.equal(await syncSubscribed({ RESEND_API_KEY: "k", RESEND_SEGMENT_EN: "seg-en" }, "a@example.com", "en", fetcher), "synced");
  assert.deepEqual(calls, [
    "POST https://api.resend.com/contacts",
    "PATCH https://api.resend.com/contacts/a%40example.com",
    "POST https://api.resend.com/contacts/a%40example.com/segments/seg-en",
  ]);
});

test("marks an unsubscribed address in Resend and treats an unknown contact as done", async () => {
  const { syncUnsubscribed } = await import("../app/newsletter-resend.ts");
  let sent;
  const fetcher = async (url, init) => { sent = { url, method: init.method, body: JSON.parse(init.body) }; return new Response("{}", { status: 404 }); };
  assert.equal(await syncUnsubscribed({ RESEND_API_KEY: "k" }, "a@example.com", fetcher), "skipped");
  assert.equal(await syncUnsubscribed({ RESEND_API_KEY: "k", RESEND_SEGMENT_TR: "seg-tr" }, "a@example.com", fetcher), "synced");
  assert.deepEqual(sent, { url: "https://api.resend.com/contacts/a%40example.com", method: "PATCH", body: { unsubscribed: true } });
});

test("accepts only correctly signed, recent Resend webhooks", async () => {
  const { verifyResendWebhook } = await import("../app/newsletter-resend.ts");
  const { createHmac } = await import("node:crypto");
  const key = Buffer.from("test-secret-key-bytes");
  const secret = `whsec_${key.toString("base64")}`;
  const body = JSON.stringify({ type: "contact.updated", data: { email: "a@example.com", unsubscribed: true } });
  const now = Date.UTC(2026, 10, 9, 12);
  const timestamp = String(Math.floor(now / 1000));
  const signature = createHmac("sha256", key).update(`msg_1.${timestamp}.${body}`).digest("base64");
  const headers = (sig, ts = timestamp) => new Headers({ "svix-id": "msg_1", "svix-timestamp": ts, "svix-signature": sig });
  assert.equal(await verifyResendWebhook(secret, headers(`v1,${signature}`), body, now), true);
  assert.equal(await verifyResendWebhook(secret, headers(`v1,bad v1,${signature}`), body, now), true);
  assert.equal(await verifyResendWebhook(secret, headers(`v1,${signature}`), body.replace("true", "false"), now), false);
  assert.equal(await verifyResendWebhook(secret, headers(`v1,${signature}`, String(Number(timestamp) - 600)), body, now), false);
  assert.equal(await verifyResendWebhook(undefined, headers(`v1,${signature}`), body, now), false);
});

test("reads unsubscribes and deletions from Resend contact events and ignores the rest", async () => {
  const { unsubscribedEmailFrom } = await import("../app/newsletter-resend.ts");
  assert.equal(unsubscribedEmailFrom({ type: "contact.updated", data: { email: " A@Example.com ", unsubscribed: true } }), "a@example.com");
  assert.equal(unsubscribedEmailFrom({ type: "contact.deleted", data: { email: "a@example.com" } }), "a@example.com");
  assert.equal(unsubscribedEmailFrom({ type: "contact.updated", data: { email: "a@example.com", unsubscribed: false } }), null);
  assert.equal(unsubscribedEmailFrom({ type: "email.sent", data: { email: "a@example.com" } }), null);
  assert.equal(unsubscribedEmailFrom("nonsense"), null);
});
