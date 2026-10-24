import assert from "node:assert/strict";
import test from "node:test";
import { cacheKey, isCacheablePage, isCacheableResponse, servePage } from "../worker/edge-cache.ts";

const page = (path, headers = {}) => new Request(`https://ganrichadvisory.com${path}`, { headers: { accept: "text/html", ...headers } });
const html = (init = {}) => new Response("<html>ok</html>", { status: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store, must-revalidate", ...(init.headers ?? {}) }, ...init });

test("caches only plain public page loads", () => {
  for (const path of ["/en", "/tr", "/tr/cozumler", "/en/insights/eu-regulation-calendar"]) assert.equal(isCacheablePage(page(path)), true, path);
  for (const path of ["/api/inquiries", "/en/insights/pdf-studio", "/tr/icgoruler/pdf-studyosu/analitik", "/en/insights/report/cbam", "/tr/icgoruler/rapor/x", "/en/contact?service=studio", "/tr/icgoruler/mevzuat-bulteni?confirm=abc", "/robots.txt", "/en/feed.xml", "/_vinext/image"]) assert.equal(isCacheablePage(page(path)), false, path);
  assert.equal(isCacheablePage(page("/en", { rsc: "1" })), false);
  assert.equal(isCacheablePage(page("/en", { "sec-purpose": "prefetch" })), false);
  assert.equal(isCacheablePage(page("/en", { cookie: "a=1; CF_Authorization=x" })), false);
  assert.equal(isCacheablePage(page("/en", { accept: "text/x-component" })), false);
  assert.equal(isCacheablePage(new Request("https://ganrichadvisory.com/en", { method: "POST" })), false);
  assert.equal(isCacheableResponse(html()), true);
  assert.equal(isCacheableResponse(html({ status: 404 })), false);
  assert.equal(isCacheableResponse(html({ headers: { "set-cookie": "x=1" } })), false);
});

test("keys the copy by Worker version so a deploy never serves old HTML", () => {
  assert.notEqual(cacheKey(page("/en"), "v1").url, cacheKey(page("/en"), "v2").url);
});

test("serves a stored copy on the second request and keeps browsers from caching it", async () => {
  const store = new Map();
  const cache = { match: async key => store.get(key.url)?.clone(), put: async (key, response) => { store.set(key.url, response); } };
  const pending = [];
  let renders = 0;
  const render = async () => { renders++; return html(); };
  const first = await servePage(page("/en"), "v1", cache, render, p => pending.push(p));
  assert.equal(first.headers.get("x-edge-cache"), "MISS");
  assert.equal(await first.text(), "<html>ok</html>");
  await Promise.all(pending);
  assert.match(store.values().next().value.headers.get("cache-control"), /max-age=300/);
  const second = await servePage(page("/en"), "v1", cache, render, p => pending.push(p));
  assert.equal(second.headers.get("x-edge-cache"), "HIT");
  assert.equal(second.headers.get("cache-control"), "no-store, must-revalidate");
  assert.equal(await second.text(), "<html>ok</html>");
  assert.equal(renders, 1);
  await servePage(page("/en"), undefined, cache, render, p => pending.push(p));
  assert.equal(renders, 2, "no version binding, no cache");
});
