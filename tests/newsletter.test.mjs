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
