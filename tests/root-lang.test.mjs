import assert from "node:assert/strict";
import test from "node:test";
import { preferredLang, rootRedirect } from "../worker/root-lang.ts";

test("sends the bare domain to Turkish only when the browser ranks Turkish above English", () => {
  assert.equal(preferredLang(null), "en");
  assert.equal(preferredLang(""), "en");
  assert.equal(preferredLang("tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"), "tr");
  assert.equal(preferredLang("tr"), "tr");
  assert.equal(preferredLang("en-GB,en;q=0.9,tr;q=0.8"), "en");
  assert.equal(preferredLang("de-DE,de;q=0.9"), "en");
  assert.equal(preferredLang("de,tr;q=0.5"), "tr");
  assert.equal(preferredLang("tr;q=0,en;q=0.5"), "en");
});

test("answers the root with a temporary, uncached redirect that varies on Accept-Language", () => {
  const tr = rootRedirect(new Request("https://ganrichadvisory.com/?utm_source=linkedin", { headers: { "accept-language": "tr-TR,tr;q=0.9" } }));
  assert.equal(tr.status, 302);
  assert.equal(tr.headers.get("location"), "https://ganrichadvisory.com/tr?utm_source=linkedin");
  assert.equal(tr.headers.get("vary"), "Accept-Language");
  assert.match(tr.headers.get("cache-control") ?? "", /no-store/);
  const en = rootRedirect(new Request("https://ganrichadvisory.com/"));
  assert.equal(en.headers.get("location"), "https://ganrichadvisory.com/en");
});
