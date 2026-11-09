import assert from "node:assert/strict";
import test from "node:test";
import { goneResponse, isGonePath } from "../worker/gone.ts";

test("removed Sites infographic reports answer 410 Gone", async () => {
  const path = "/tr/icgoruler/rapor/turkiye-sanayi-dinamikleri-2014-2026-infografik-serisi-cdafed7f";
  assert.equal(isGonePath(path), true);
  assert.equal(isGonePath(path + "/"), true);
  assert.equal(isGonePath("/en/insights/report/kentlesen-dunya-10-infografik-bafe853b"), true);
  for (const live of ["/tr/icgoruler/rapor/cbam-gercek-mi-varsayilan-mi-ef31215c", "/tr/icgoruler", "/tr/icgoruler/rapor/x"]) assert.equal(isGonePath(live), false, live);
  const response = goneResponse(path);
  assert.equal(response.status, 410);
  assert.equal(response.headers.get("x-robots-tag"), "noindex");
  assert.match(await response.text(), /Bu rapor kaldırıldı/);
});
