import assert from "node:assert/strict";
import test from "node:test";
import { checkResultMessage, sendCheckResult } from "../app/check-result-email.ts";
import { checks } from "../app/readiness-check-content.ts";

const links = { check: "https://ganrichadvisory.com/en/decision-lab/cbam-readiness-check", programme: "https://ganrichadvisory.com/en/solutions/cbam-data-readiness", paper: "https://ganrichadvisory.com/en/insights/report/x", contact: "https://ganrichadvisory.com/en/contact?service=solutionCbam" };

test("builds the emailed check result from the canonical copy and the answers", () => {
  const copy = checks.cbam.copy.en;
  const answers = [2, 2, 1, 0, 2, 1, 2, 2];
  const { subject, text, html } = checkResultMessage({ lang: "en", copy, answers, links });
  assert.match(subject, /^Your CBAM readiness check result: 12\/16 \(Well advanced\)$/);
  assert.match(text, /Readiness score: 12\/16/);
  assert.match(text, new RegExp(copy.questions[3].gap.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(text, new RegExp(copy.questions[0].gap.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(html, /<!doctype html>/);
  assert.match(html, /cbam-data-readiness/);
  assert.match(text, /do not add you to any mailing list/);
});

test("writes the Turkish result in Turkish", () => {
  const copy = checks.eudr.copy.tr;
  const { subject, text } = checkResultMessage({ lang: "tr", copy, answers: Array(copy.questions.length).fill(0), links: { ...links, paper: undefined } });
  assert.match(subject, /sonucunuz: 0\//);
  assert.match(text, /Merhaba,/);
  assert.doesNotMatch(text, /Teknik notu okuyun/);
});

test("sends the result only to the visitor, with a reply-to for the founder", async () => {
  let body;
  const status = await sendCheckResult({ RESEND_API_KEY: "k", INQUIRY_NOTIFY_FROM: "Ganrich <n@ganrichadvisory.com>" }, "buyer@example.com",
    { lang: "en", copy: checks.cra.copy.en, answers: Array(checks.cra.copy.en.questions.length).fill(1), links },
    async (_url, init) => { body = JSON.parse(init.body); return new Response("{}", { status: 200 }); });
  assert.equal(status, "sent");
  assert.deepEqual(body.to, ["buyer@example.com"]);
  assert.equal(body.reply_to, "furkangul@ganrichadvisory.com");
  assert.equal(await sendCheckResult({}, "buyer@example.com", { lang: "en", copy: checks.cra.copy.en, answers: [], links }), "skipped");
});
