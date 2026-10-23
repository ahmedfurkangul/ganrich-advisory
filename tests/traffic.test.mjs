import assert from "node:assert/strict";
import test from "node:test";
import { classifyBot, deviceInfo, logLeadEvent, logTraffic, trafficKind } from "../worker/traffic.ts";
import { channelOf } from "../db/traffic.ts";
import { trafficInsights } from "../app/traffic-insights.ts";

const html = (status = 200) => new Response("<html></html>", { status, headers: { "content-type": "text/html; charset=utf-8" } });
const get = (path, headers = {}) => new Request(`https://ganrichadvisory.com${path}`, { headers });

test("recognises AI, search and other crawlers and keeps people separate", () => {
  assert.equal(classifyBot("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)").category, "ai");
  assert.equal(classifyBot("Mozilla/5.0 (compatible; OAI-SearchBot/1.0)").name, "OAI-SearchBot (ChatGPT search)");
  assert.equal(classifyBot("Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)").category, "ai");
  assert.equal(classifyBot("Mozilla/5.0 (compatible; PerplexityBot/1.0)").category, "ai");
  assert.equal(classifyBot("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)").category, "search");
  assert.equal(classifyBot("Mozilla/5.0 (compatible; bingbot/2.0)").category, "search");
  assert.equal(classifyBot("LinkedInBot/1.0 (compatible; Mozilla/5.0)").category, "social");
  assert.equal(classifyBot("curl/8.5.0").category, "other");
  assert.equal(classifyBot("").category, "other"); // no user agent counts as automated
  assert.equal(classifyBot("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"), null);
  assert.deepEqual(deviceInfo("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"), { device: "mobile", browser: "Safari", os: "iOS" });
  assert.deepEqual(deviceInfo("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 Edg/130.0"), { device: "desktop", browser: "Edge", os: "Windows" });
});

test("logs pages, PDFs and discovery files but not assets, API calls, prefetches or the editor studio", () => {
  assert.equal(trafficKind(get("/en/solutions"), html()), "page");
  assert.equal(trafficKind(get("/en/missing"), html(404)), "page");
  assert.equal(trafficKind(get("/llms.txt"), new Response("x", { headers: { "content-type": "text/plain" } })), "file");
  assert.equal(trafficKind(get("/api/pdf-insights/abc/document"), new Response("x")), "pdf");
  assert.equal(trafficKind(get("/api/inquiries"), html()), null);
  assert.equal(trafficKind(get("/assets/index.css"), new Response("x", { headers: { "content-type": "text/css" } })), null);
  assert.equal(trafficKind(get("/og/en/home.png"), new Response("x")), null);
  assert.equal(trafficKind(get("/en/insights/pdf-studio/analytics"), html()), null);
  assert.equal(trafficKind(get("/en", { rsc: "1" }), html()), null);
  assert.equal(trafficKind(get("/en", { "sec-purpose": "prefetch" }), html()), null);
  assert.equal(trafficKind(new Request("https://ganrichadvisory.com/en", { method: "POST" }), html()), null);
});

test("writes a cookieless row with no IP address and a daily pseudonymous visitor", async () => {
  const statements = [];
  const db = {
    prepare(sql) {
      return {
        bind(...params) {
          return {
            run: async () => { statements.push({ sql, params }); return {}; },
            first: async () => sql.startsWith("SELECT salt") ? { salt: "test-salt" } : null,
          };
        },
      };
    },
  };
  const request = get("/en/solutions?utm_source=linkedin&utm_campaign=launch", {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
    referer: "https://www.linkedin.com/feed/",
    "cf-connecting-ip": "203.0.113.9",
  });
  await logTraffic(request, html(), { DB: db }, Date.now());
  const insert = statements.find(s => s.sql.includes("INSERT INTO page_views"));
  assert.ok(insert, "page view was written");
  assert.ok(!insert.params.includes("203.0.113.9"), "IP address must not be stored");
  assert.ok(!insert.params.some(p => typeof p === "string" && p.includes("Mozilla")), "full user agent must not be stored");
  assert.equal(insert.params[2], "/en/solutions");
  assert.equal(insert.params[6], "linkedin.com");
  assert.equal(insert.params[7], "linkedin");
  assert.match(insert.params[18], /^[0-9a-f]{16}$/);
  assert.ok(statements.some(s => s.sql.startsWith("DELETE FROM analytics_salts")), "old salts are discarded");

  await logTraffic(request, html(), { DB: db, ANALYTICS_LOGGING: "off" }, Date.now());
  assert.equal(statements.filter(s => s.sql.includes("INSERT INTO page_views")).length, 1, "logging can be switched off");
  await logTraffic(request, html(), {}, Date.now()); // no database: silently skipped
});

test("sorts visits into channels, including AI assistants", () => {
  assert.equal(channelOf("chatgpt.com", "", ""), "ai");
  assert.equal(channelOf("", "chatgpt.com", ""), "ai");
  assert.equal(channelOf("perplexity.ai", "", ""), "ai");
  assert.equal(channelOf("google.com.tr", "", ""), "search");
  assert.equal(channelOf("lnkd.in", "", ""), "social");
  assert.equal(channelOf("", "linkedin", "social"), "social");
  assert.equal(channelOf("", "newsletter", "email"), "email");
  assert.equal(channelOf("", "", ""), "direct");
  assert.equal(channelOf("example.org", "", ""), "referral");
});

test("writes a cautious analysis from the numbers", () => {
  const empty = { days: 30, hasData: false };
  assert.match(trafficInsights("en", empty)[0].text, /No traffic has been recorded/);
  const report = {
    days: 30, from: "2026-09-24", to: "2026-10-23", hasData: true,
    totals: { views: 400, visitors: 150, pagesPerVisitor: 2.7, inquiries: 3, conversion: 0.02, aiReferrals: 12, botHits: 300, aiBotHits: 120, pdfDownloads: 9, notFound: 4 },
    previous: { views: 300, visitors: 100, inquiries: 1, aiReferrals: 2 },
    channels: [{ channel: "search", visitors: 70 }, { channel: "ai", visitors: 12 }],
    aiReferrers: [{ label: "chatgpt.com", views: 10, visitors: 9 }],
    discovery: [{ label: "/llms.txt", views: 5, extra: "GPTBot (OpenAI)" }],
    pages: [{ label: "/en/solutions", views: 80, visitors: 60 }],
    rising: [{ label: "/en/solutions", now: 80, before: 20 }],
    devices: [{ label: "mobile", views: 100, visitors: 60 }, { label: "desktop", views: 300, visitors: 90 }],
    pdfs: [{ label: "CBAM: actual or default?", views: 9 }],
    funnel: { visitors: 150, cta: 12, formStart: 6, formSubmit: 2, inquiries: 3 },
  };
  const en = trafficInsights("en", report).map(i => i.text).join("\n");
  assert.match(en, /Visitors rose 50% against the previous 30 days/);
  assert.match(en, /12 visitors arrived from AI assistants, most from chatgpt\.com/);
  assert.match(en, /llms\.txt was fetched 5 times/);
  assert.match(en, /40% of visitors use a phone/);
  assert.match(en, /3 inquiries came in, a conversion rate of 2\.0%/);
  assert.match(en, /4 visits hit a missing page/);
  assert.match(en, /12 visitors clicked a contact button, 6 started the form and 2 sent it/);
  assert.match(en, /More than half of the people who start the contact form leave/);
  const tr = trafficInsights("tr", report).map(i => i.text).join("\n");
  assert.match(tr, /Ziyaretçi sayısı önceki 30 güne göre %50 arttı/);
});

test("records contact steps with the page only, and ignores bots, other sites and unknown steps", async () => {
  const statements = [];
  const db = { prepare(sql) { return { bind(...params) { return {
    run: async () => { statements.push({ sql, params }); return {}; },
    first: async () => sql.startsWith("SELECT salt") ? { salt: "test-salt" } : null,
  }; } }; } };
  const person = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  const beacon = (body, headers = {}) => new Request("https://ganrichadvisory.com/api/lead-event", {
    method: "POST", body: JSON.stringify(body),
    headers: { "user-agent": person, "cf-connecting-ip": "203.0.113.9", origin: "https://ganrichadvisory.com", ...headers },
  });
  const inserts = () => statements.filter(s => s.sql.includes("INSERT INTO page_views"));
  await logLeadEvent(beacon({ event: "cta", path: "/tr/cozumler/cbam-veri-hazirligi" }), { DB: db });
  assert.equal(inserts().length, 1);
  const row = inserts()[0].params;
  assert.equal(row[2], "/tr/cozumler/cbam-veri-hazirligi");
  assert.equal(row[3], "tr");
  assert.equal(row[4], "cta");
  assert.ok(!row.includes("203.0.113.9"), "IP address must not be stored");
  assert.match(row[9], /^[0-9a-f]{16}$/);
  await logLeadEvent(beacon({ event: "form_submit", path: "/en/contact", name: "Jane" }), { DB: db });
  assert.ok(!inserts()[1].params.includes("Jane"), "form content is never stored");
  await logLeadEvent(beacon({ event: "purchase", path: "/en" }), { DB: db });
  await logLeadEvent(beacon({ event: "cta", path: "https://evil.example/" }), { DB: db });
  await logLeadEvent(beacon({ event: "cta", path: "/en" }, { origin: "https://evil.example" }), { DB: db });
  await logLeadEvent(beacon({ event: "cta", path: "/en" }, { "user-agent": "curl/8.5.0" }), { DB: db });
  await logLeadEvent(beacon({ event: "cta", path: "/en" }), { DB: db, ANALYTICS_LOGGING: "off" });
  assert.equal(inserts().length, 2);
});
