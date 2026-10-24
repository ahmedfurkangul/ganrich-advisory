import assert from "node:assert/strict";
import test from "node:test";
import { inquiryAlertMessage, sendInquiryAlert } from "../app/inquiry-notify.ts";

const inquiry = {
  kind: "contact", language: "tr", source: "/tr/iletisim", name: "Ayşe Demir", email: "ayse@example.com",
  organization: "Demir Holding", role: "", region: "", interest: "", context: "We are weighing a Gulf entry decision.",
  decision: "", contactMethod: "email",
};
const env = { RESEND_API_KEY: "test-key", INQUIRY_NOTIFY_TO: "a@example.com, b@example.com", INQUIRY_NOTIFY_FROM: "Ganrich <n@example.com>" };

test("builds a plain-text alert without empty fields", () => {
  const { subject, text } = inquiryAlertMessage(inquiry);
  assert.equal(subject, "New inquiry: Ayşe Demir (Demir Holding)");
  assert.match(text, /Organization: Demir Holding/);
  assert.doesNotMatch(text, /Role:/);
  assert.match(text, /We are weighing a Gulf entry decision\./);
});

test("sends through Resend with reply-to set to the visitor", async () => {
  let call;
  const result = await sendInquiryAlert(env, inquiry, async (url, init) => { call = { url, init }; return new Response("{}", { status: 200 }); });
  assert.equal(result, "sent");
  assert.equal(call.url, "https://api.resend.com/emails");
  assert.equal(call.init.headers.authorization, "Bearer test-key");
  const body = JSON.parse(call.init.body);
  assert.deepEqual(body.to, ["a@example.com", "b@example.com"]);
  assert.equal(body.reply_to, "ayse@example.com");
});

test("skips without configuration and never throws on provider errors", async () => {
  assert.equal(await sendInquiryAlert({}, inquiry, async () => { throw new Error("should not be called"); }), "skipped");
  assert.equal(await sendInquiryAlert(env, inquiry, async () => new Response("bad", { status: 422 })), "failed");
  assert.equal(await sendInquiryAlert(env, inquiry, async () => { throw new TypeError("network"); }), "failed");
});

test("labels whitepaper download leads", () => {
  const { subject } = inquiryAlertMessage({ ...inquiry, kind: "download", interest: "PDF: The 24-hour test" });
  assert.equal(subject, "Whitepaper download: Ayşe Demir (Demir Holding)");
});
