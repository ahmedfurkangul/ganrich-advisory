import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { gzipSync } from "node:zlib";

async function render(path = "/en") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the English consultancy experience", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>CBAM, CRA &amp; EU Readiness for Turkish Industry \| Ganrich<\/title>/i);
  assert.match(html, /Your EU buyer is asking\. Decide what to give, when and at what cost\./);
  assert.match(html, /Turkish exporters facing EU buyer requirements/);
  assert.match(html, /CBAM definitive regime/);
  assert.match(html, /Request a first review/);
  assert.match(html, /hrefLang="tr"/);
  assert.match(html, /\/og\/en\/home\.png/);
  assert.match(html, /rule-timeline/);
  assert.doesNotMatch(html, /\[EMAIL\]|\[LINKEDIN\]/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders localized Turkish content and metadata", async () => {
  const response = await render("/tr");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Ganrich Advisory \| Türk Sanayisi için AB Uyumu ve Strateji/);
  assert.match(html, /AB alıcınız soruyor\. Neyi, ne zaman ve ne kadara vereceğinizi netleştirelim\./);
  assert.match(html, /CBAM kesin rejimi/);
  assert.match(html, /Ön görüşme isteyin/);
  assert.match(html, /hrefLang="en"/);
  assert.match(html, /\/og\/tr\/home\.png/);
  assert.match(html, /<html lang="tr"/);
});

test("publishes the verified bilingual founder profile", async () => {
  const english = await render("/en/about");
  const englishHtml = await english.text();
  assert.match(englishHtml, /Ahmed Furkan Gul/);
  assert.match(englishHtml, /Founder, Ganrich Advisory/);
  assert.match(englishHtml, /Tay Group/);
  assert.match(englishHtml, /Assistant Professor at İstanbul Kent University/);
  assert.match(englishHtml, /https:\/\/www\.linkedin\.com\/in\/furkangul\//);
  assert.doesNotMatch(englishHtml, /\[FOUNDER NAME\]/);

  const turkish = await render("/tr/hakkimizda");
  const turkishHtml = await turkish.text();
  assert.match(turkishHtml, /Ahmed Furkan Gül/);
  assert.doesNotMatch(turkishHtml, /Furkan Gul\b/);
  assert.match(turkishHtml, /Kurucu, Ganrich Advisory/);
  assert.match(turkishHtml, /İstanbul Kent Üniversitesinde Dr\. Öğr\. Üyesi/);
});

test("server-renders the bilingual strategic intelligence routes", async () => {
  const routes = [
    ["/en/decision-lab", /EU Readiness Checks/, /See in two minutes where you stand on an EU rule/],
    ["/tr/karar-laboratuvari/karar-atlasi", /Karar Atlası/, /Karardan başlayın/],
    ["/en/decision-lab/decision-framer", /Decision Framer/, /What decision needs to be made/],
    ["/en/decision-lab/market-entry-compass", /Market Entry Compass/, /EDITABLE WEIGHTS/],
    ["/en/decision-lab/board-brief-builder", /Board Brief Builder/, /Write for the decision, not the archive/],
    ["/tr/karar-laboratuvari/yapay-zeka-deger-mercegi", /Yapay Zekâ Değer Merceği/, /Değer mantığını görünür kılın/],
    ["/en/decision-lab/changelog", /Decision Lab Changelog/, /Five live tools/],
    ["/en/insights/decision-quality-applied-ai", /Decision quality in the age of applied AI/, /24 July 2026/],
    ["/en/insights/transformation-activity-to-value", /From transformation activity to transformation value/, /A transformation becomes executable/],
    ["/en/insights/market-entry-sequence-of-commitments", /Market entry is a sequence of commitments/, /strongest entry strategies/],
    ["/en/insights/turkiye-gulf-capital-corridor", /The Türkiye–Gulf capital corridor/, /more institutional/],
    ["/en/insights/family-holdings-operating-model-transition", /Family holdings and the operating-model transition/, /implicit authority/],
    ["/en/insights/ai-value-mid-market-industrials", /Where AI creates measurable value in mid-market industrials/, /repeatable operating decision/],
    ["/tr/icgoruler/turkiye-korfez-sermaye-koridoru", /Türkiye–Körfez sermaye koridoru/, /daha kurumsal hâle geliyor/],
    ["/tr/icgoruler/aile-holdingleri-isletim-modeli-gecisi", /Aile holdingleri ve işletim modeli geçişi/, /örtük otoriteden açık karar haklarına/],
    ["/tr/icgoruler/orta-olcekli-sanayide-yapay-zeka-degeri", /Orta ölçekli sanayi şirketlerinde yapay zekâ/, /tekrarlanan bir işletim kararını/],
  ];

  for (const [path, title, marker] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title, path);
    assert.match(html, marker, path);
  }
});

test("publishes page-specific bilingual social cards", async () => {
  const [aboutResponse, articleResponse] = await Promise.all([
    render("/en/about"),
    render("/tr/icgoruler/orta-olcekli-sanayide-yapay-zeka-degeri"),
  ]);
  const [about, article] = await Promise.all([aboutResponse.text(), articleResponse.text()]);

  assert.match(about, /\/og\/en\/about\.png/);
  assert.match(article, /\/og\/tr\/article-orta-olcekli-sanayide-yapay-zeka-degeri\.png/);
  await Promise.all([
    access(new URL("../public/og/en/about.png", import.meta.url)),
    access(new URL("../public/og/tr/about.png", import.meta.url)),
    access(new URL("../public/og/en/article-decision-quality-applied-ai.png", import.meta.url)),
    access(new URL("../public/og/tr/article-orta-olcekli-sanayide-yapay-zeka-degeri.png", import.meta.url)),
    access(new URL("../public/og/en/boardBriefBuilder.png", import.meta.url)),
    access(new URL("../public/og/tr/aiValueLens.png", import.meta.url)),
    access(new URL("../public/og/en/categoryAppliedAi.png", import.meta.url)),
    access(new URL("../public/og/tr/categoryOperatingModel.png", import.meta.url)),
  ]);
});

test("every social card the calendar pages reference exists", async () => {
  for (const [path, card] of [
    ["/en/insights/eu-regulation-calendar", "/og/en/regulationCalendar.png"],
    ["/tr/icgoruler/ab-mevzuat-takvimi", "/og/tr/regulationCalendar.png"],
  ]) {
    const html = await (await render(path)).text();
    assert.ok(html.includes(card), `${path} references ${card}`);
    await access(new URL(`../public${card}`, import.meta.url));
  }
});

test("renders bilingual engagement, sample, and decision-note journeys", async () => {
  const paths=["/en/expertise/market-entry","/en/expertise/operating-model","/en/sample-work","/en/insights/entry-model-choice","/en/insights/founder-decision-rights","/en/insights/ai-pilot-or-process","/en/insights/transformation-value-review","/tr/uzmanlik/pazara-giris","/tr/uzmanlik/isletim-modeli","/tr/ornek-calismalar","/tr/icgoruler/pazara-giris-modeli","/tr/icgoruler/kurucu-karar-haklari","/tr/icgoruler/yapay-zeka-pilotu-ve-surec","/tr/icgoruler/donusum-deger-takibi"];
  for(const path of paths){const response=await render(path);assert.equal(response.status,200,path);const html=await response.text();assert.match(html,/rel="canonical"/);assert.match(html,/hrefLang="tr"/);assert.doesNotMatch(html,/href="[^"]*undefined/);}
  const contact=await (await render("/en/contact")).text();
  assert.match(contact,/What are you deciding/);assert.match(contact,/optional/);
});

test("keeps core interactions keyboard-operable and marketing JavaScript within budget", async () => {
  const [response, site, intelligence, shell, privacy, controls, css] = await Promise.all([
    render("/en"),
    readFile(new URL("../app/site.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/intelligence.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/intelligence-shell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy-center.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy-controls.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  const html = await response.text();
  const assets = [...new Set(html.match(/\/assets\/[^"' ]+\.js/g) ?? [])];
  const assetSources = await Promise.all(assets.map((asset) => readFile(new URL(`../dist/client${asset}`, import.meta.url))));
  const compressedBytes = assetSources.reduce((total, source) => total + gzipSync(source).byteLength, 0);

  assert.match(html, /href="\/en\/solutions#strategy"/);
  assert.match(html, /aria-expanded="false"/);


  assert.match(shell, /role="dialog" aria-modal="true" aria-labelledby="briefing-tray-title"/);
  assert.doesNotMatch(shell, /ganrich-command/); // the header search palette was removed in Wave 1
  assert.match(site, /lazy\(\(\) => import\("\.\/intelligence"\)/);
  assert.match(intelligence, /event\.key === "ArrowRight"/);
  assert.match(controls, /event\.key === "Escape"/);
  assert.match(privacy, /mergedTrustParts/);
  assert.match(css, /min-height: 44px/);
  // 157 KB since solutions batch 3 added five programmes to the client-side catalogue (156053 bytes in the
  // cloud container). Gzip output differs by a few hundred bytes between machines (the Mac measures about
  // 400 B more), so the budget keeps a little headroom.
  assert.ok(compressedBytes <= 157 * 1024, `Marketing JavaScript is ${compressedBytes} gzip bytes; budget is ${157 * 1024}`);
});

test("publishes production-safe bilingual SEO, taxonomy, feeds, and discovery files", async () => {
  const [articleResponse, categoryResponse, turkishCategoryResponse, feedResponse, turkishFeedResponse, sitemapResponse, reportSitemapResponse, robotsResponse] = await Promise.all([
    render("/en/insights/decision-quality-applied-ai"),
    render("/en/insights/category/applied-ai"),
    render("/tr/icgoruler/kategori/isletim-modeli"),
    render("/en/feed.xml"),
    render("/tr/feed.xml"),
    render("/sitemap.xml"),
    render("/reports-sitemap.xml"),
    render("/robots.txt"),
  ]);
  const [article, category, turkishCategory, feed, turkishFeed, sitemap, reportSitemap, robots] = await Promise.all([
    articleResponse.text(),
    categoryResponse.text(),
    turkishCategoryResponse.text(),
    feedResponse.text(),
    turkishFeedResponse.text(),
    sitemapResponse.text(),
    reportSitemapResponse.text(),
    robotsResponse.text(),
  ]);

  // Category pages are folded into the technical-notes library with the strategy filter.
  for (const [response, target] of [[categoryResponse, /\/en\/insights#strategy$/], [turkishCategoryResponse, /\/tr\/icgoruler#strategy$/]]) {
    assert.ok([301, 307, 308].includes(response.status), `category status ${response.status}`);
    assert.match(response.headers.get("location") ?? "", target);
  }
  void category; void turkishCategory;
  assert.match(article, /rel="canonical" href="https:\/\/ganrichadvisory\.com\/en\/insights\/decision-quality-applied-ai"/);
  assert.match(article, /rel="alternate" type="application\/rss\+xml" href="https:\/\/ganrichadvisory\.com\/en\/feed\.xml"/);
  assert.match(article, /"@type":"Article"/);
  assert.match(article, /"@type":"BreadcrumbList"/);
  assert.match(article, /"@type":"Person"/);
  assert.match(article, /"Organization","ProfessionalService"/);
  assert.doesNotMatch(article, /localhost:3000/);
  assert.match(feedResponse.headers.get("content-type") ?? "", /^application\/rss\+xml/);
  assert.match(feed, /<title>The Ganrich Brief<\/title>/);
  assert.match(feed, /decision-quality-applied-ai/);
  assert.match(turkishFeed, /<title>Ganrich Bülteni<\/title>/);
  assert.doesNotMatch(sitemap, /\/insights\/category\//);
  assert.match(sitemap, /https:\/\/ganrichadvisory\.com\/en\/insights\/decision-quality-applied-ai/);
  assert.match(sitemap, /hreflang="tr"/);
  assert.doesNotMatch(sitemap, /localhost/);
  assert.equal(reportSitemapResponse.status, 200);
  assert.match(reportSitemapResponse.headers.get("content-type") ?? "", /^application\/xml/);
  assert.match(reportSitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(robots, /Disallow: \/api\//);
  assert.match(robots, /Allow: \/api\/pdf-insights\/\*\/document/);
  assert.match(robots, /Sitemap: https:\/\/ganrichadvisory\.com\/sitemap\.xml/);
  assert.match(robots, /Sitemap: https:\/\/ganrichadvisory\.com\/reports-sitemap\.xml/);
});

test("keeps principal internal links inside the published route inventory", async () => {
  const [sitemapResponse, ...pageResponses] = await Promise.all([
    render("/sitemap.xml"),
    render("/en"),
    render("/en/insights"),
    render("/en/decision-lab"),
    render("/tr"),
    render("/tr/icgoruler"),
    render("/tr/karar-laboratuvari"),
  ]);
  const sitemap = await sitemapResponse.text();
  const sitemapPaths = new Set([...sitemap.matchAll(/<loc>(https:\/\/ganrichadvisory\.com[^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname));
  assert.ok(sitemapPaths.size > 40, `Expected a substantial route inventory, found ${sitemapPaths.size}`);
  assert.equal(sitemapPaths.size, [...sitemap.matchAll(/<loc>/g)].length, "Sitemap must not contain duplicate canonical locations");

  for (const response of pageResponses) {
    const html = await response.text();
    const internalLinks = [...html.matchAll(/href="(\/[^"#]+)(?:#[^"]*)?"/g)]
      .map(match => match[1].replace(/&amp;/g, "&").split("?")[0])
      // Whitepaper pages come from D1 and are listed in reports-sitemap.xml, not the static sitemap.
      // Category pages are linked for browsing but are noindex, so they are left out of the sitemap.
      .filter(path => !path.endsWith("/feed.xml") && !path.startsWith("/assets/") && !/^\/(en\/insights\/report|tr\/icgoruler\/rapor)\//.test(path) && !/^\/(en\/insights\/category|tr\/icgoruler\/kategori)\//.test(path));
    for (const path of internalLinks) {
      assert.ok(sitemapPaths.has(path), `Internal link ${path} is absent from the canonical route inventory`);
    }
  }
});

test("makes insight search functional and governs dynamic PDF report discovery", async () => {
  const [siteSource, reportSource, englishRoute, turkishRoute, css] = await Promise.all([
    readFile(new URL("../app/technical-notes.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/pdf-insight-pages.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[lang]/insights/report/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[lang]/icgoruler/rapor/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(siteSource, /const \[query, setQuery\] = useState\(""\)/);
  assert.match(siteSource, /toLocaleLowerCase\(locale\)\.includes\(q\)/);
  assert.match(siteSource, /No note matches this search\./);
  assert.match(siteSource, /Bu aramayla eşleşen bir not yok\./);
  assert.doesNotMatch(css, /\.newsletter\b/);
  assert.match(reportSource, /export async function pdfReportMetadata/);
  assert.match(reportSource, /robots: published \?/);
  assert.match(reportSource, /"@type": "Report"/);
  assert.match(reportSource, /"@type": "BreadcrumbList"/);
  assert.match(reportSource, /insight\.gatingModel !== "private"/);
  assert.match(englishRoute, /pdfReportMetadata\("en", slug\)/);
  assert.match(turkishRoute, /pdfReportMetadata\("tr", slug\)/);
});

test("adds restrained baseline security and indexing headers", async () => {
  const [pageResponse, apiResponse] = await Promise.all([render("/en"), render("/api/analytics")]);

  assert.equal(pageResponse.headers.get("x-content-type-options"), "nosniff");
  assert.equal(pageResponse.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.match(pageResponse.headers.get("permissions-policy") ?? "", /camera=\(\)/);
  assert.equal(pageResponse.headers.get("strict-transport-security"), "max-age=31536000");
  assert.equal(pageResponse.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.match(pageResponse.headers.get("content-security-policy") ?? "", /frame-ancestors 'self'/);
  assert.equal(apiResponse.headers.get("x-robots-tag"), "noindex, nofollow");
});

test("returns a true house-voice 404 and keeps analytics disabled by default", async () => {
  const [missingResponse, analyticsResponse, analyticsSource, endpointSource, errorSource] = await Promise.all([
    render("/en/address-that-does-not-exist"),
    render("/api/analytics"),
    readFile(new URL("../app/analytics.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/analytics/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/error.tsx", import.meta.url), "utf8"),
  ]);
  const missing = await missingResponse.text();

  assert.equal(missingResponse.status, 404);
  assert.match(missing, /The page is not here\./);
  assert.match(missing, /Bu sayfa burada değil\./);
  assert.match(missing, /(?:name="robots" content="noindex"|content="noindex" name="robots")/);
  assert.equal(analyticsResponse.status, 405);
  assert.match(analyticsSource, /NEXT_PUBLIC_ANALYTICS_MODE === "cookieless"/);
  assert.match(analyticsSource, /preference\.analytics === true/);
  assert.match(endpointSource, /NEXT_PUBLIC_ANALYTICS_MODE !== "cookieless"/);
  assert.match(endpointSource, /payload\.path\.slice\(0, 300\)/);
  assert.match(errorSource, /No decision should depend on a broken interface/);
});

test("publishes a restrained bilingual privacy and trust center", async () => {
  const routes = [
    ["/en/privacy", /Privacy, explained in plain language\./, /transmitted securely and stored/],
    ["/en/privacy", /id="cookies"[\s\S]*deliberately small technology footprint/, /Analytics cookies, advertising/],
    ["/en/privacy", /id="rights"[\s\S]*Your data rights, through a secure channel\./, /Do not send identity documents/],
    ["/tr/kvkk-aydinlatma-metni", /Türkiye veri koruma bilgilendirmesi\./, /Aydınlatma/],
    ["/en/legal", /id="ai"[\s\S]*AI assists the work/, /Decision Lab tools run in the visitor’s browser/],
    ["/en/cookie-preferences", /Cookie preferences/, /Functional preferences/],
  ];

  for (const [path, title, marker] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title, path);
    assert.match(html, marker, path);
    assert.doesNotMatch(html, /\[(?:QUALIFIED|CONTROLLER|EMAIL|ADDRESS|KEP|VENDOR|RETENTION)[^\]]*\]/i, path);
  }
});

test("keeps notice, optional consent, and secure inquiry handling separate", async () => {
  const [contactResponse, briefingResponse, privacySource, inquiryApi, schema, migration] = await Promise.all([
    render("/en/contact"),
    render("/en/private-executive-briefing"),
    readFile(new URL("../app/privacy-center.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/inquiries/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../drizzle/0001_lonely_sauron.sql", import.meta.url), "utf8"),
  ]);
  const contact = await contactResponse.text();

  assert.match(contact, /stored securely to review and respond/);
  assert.match(contact, /I have read the privacy notice/);
  // The private briefing request now uses the one contact form, with the briefing topic preselected.
  assert.ok([301, 307, 308].includes(briefingResponse.status), `briefing status ${briefingResponse.status}`);
  assert.match(briefingResponse.headers.get("location") ?? "", /\/en\/contact\?service=briefing$/);
  assert.match(privacySource, /Accept optional/);
  assert.match(privacySource, /Essential only/);
  assert.match(privacySource, /Manage choices/);
  assert.match(privacySource, /analytics: false/);
  assert.match(privacySource, /marketing: false/);
  assert.match(inquiryApi, /request_fingerprint/);
  assert.match(inquiryApi, /privacyAcknowledged/);
  assert.match(schema, /export const inquiries/);
  assert.match(migration, /CREATE TABLE IF NOT EXISTS `inquiries`/);
  assert.match(migration, /CREATE INDEX IF NOT EXISTS `inquiries_created_at_idx`/);
});

test("includes the governed PDF insight ingestion system", async () => {
  const [hosting, schema, studio, api, documentRoute, system, migration] = await Promise.all([
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/pdf-insights.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/pdf-insights/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/pdf-insights/[id]/document/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../PDF-INSIGHT-SYSTEM.md", import.meta.url), "utf8"),
    readFile(new URL("../drizzle/0000_volatile_skin.sql", import.meta.url), "utf8"),
  ]);

  assert.match(hosting, /"d1": "DB"/);
  assert.match(hosting, /"r2": "DOCUMENTS"/);
  assert.match(schema, /pdfInsightVersions/);
  assert.match(studio, /The PDF is the authority/);
  assert.match(studio, /Approved for AI-assisted retrieval/);
  assert.match(api, /SHA-256/);
  assert.match(api, /Publication requires a title, thesis/);
  assert.match(documentRoute, /content-disposition/);
  assert.match(documentRoute, /record\.gating_model === "fully_ungated"/);
  assert.match(studio, /The source document is shared on request\./);
  assert.match(studio, /Karar bağlamını paylaşın\./);
  assert.match(system, /No representative PDF accompanied/);
  assert.match(migration, /CREATE TABLE `pdf_insights`/);
});

test("prepares governed report syndication and an explicit production sign-off gate", async () => {
  const [rss, rootFeed, localizedFeed, preflight, packageJson, signOff, operations] = await Promise.all([
    readFile(new URL("../app/rss.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/feed.xml/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/[lang]/feed.xml/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../scripts/release-preflight.mjs", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../RELEASE-SIGN-OFF.md", import.meta.url), "utf8"),
    readFile(new URL("../RELEASE-OPERATIONS.md", import.meta.url), "utf8"),
  ]);

  assert.match(rss, /listPdfInsights\(\{ status: "published", language: lang \}\)/);
  assert.match(rss, /report\.gatingModel !== "private"/);
  assert.match(rss, /report\.shortSummary \|\| report\.executiveThesis/);
  assert.match(rss, /\.catch\(\(\) => \[\]\)/);
  assert.match(rootFeed, /await renderInsightFeed\("en"\)/);
  assert.match(localizedFeed, /await renderInsightFeed/);
  assert.match(preflight, /Prospect-facing placeholder audit is clean/);
  assert.match(preflight, /Build is not older than source/);
  assert.match(packageJson, /"release:preflight": "node scripts\/release-preflight\.mjs"/);
  assert.match(signOff, /This record is intentionally unsigned/);
  assert.match(signOff, /Public deployment of the named candidate version explicitly approved/);
  assert.match(operations, /No new prospect-facing interface copy is introduced/);
});

test("removes starter-only infrastructure and keeps production system assets", async () => {
  const [page, layout, packageJson, system, intelligenceSystem] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../SITE-SYSTEM.md", import.meta.url), "utf8"),
    readFile(new URL("../STRATEGIC-INTELLIGENCE-SYSTEM.md", import.meta.url), "utf8"),
  ]);

  assert.match(page, /redirect\("\/en"\)/);
  assert.match(layout, /Ganrich Advisory/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(system, /Draft → Review → Translation Review → Approved → Published/);
  assert.match(intelligenceSystem, /Decision Atlas/);
  assert.match(intelligenceSystem, /Responsible AI/);
  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});

test("returns 404 for paths outside the /en and /tr trees", async () => {
  const response = await render("/missing-page");
  assert.equal(response.status, 404);
  const english = await render("/en");
  assert.equal(english.status, 200);
});

test("publishes the solutions programmes in both languages without prices or durations", async () => {
  const { routeMap } = await import("../app/content.ts").catch(() => ({ routeMap: null }));
  const paths = ["/en/solutions", "/tr/cozumler", "/en/solutions/cbam-data-readiness", "/en/solutions/cra-incident-readiness", "/en/solutions/ai-order-desk-assistant", "/tr/cozumler/cbam-veri-hazirligi", "/tr/cozumler/sanayide-su-dengesi"];
  for (const path of paths) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /rel="canonical"/, path);
    const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
    assert.doesNotMatch(text, /€|\$\s?\d|\bUSD\b|\bEUR\b|\d+\s?(weeks?|months?|hafta|ay)\b/i, `${path} must not show prices or durations`);
  }
  const hub = await (await render("/en/solutions")).text();
  for (const title of ["CBAM Data Readiness", "CRA Incident Readiness", "AI Order Desk Assistant", "Industrial Water Balance"]) assert.match(hub, new RegExp(title));
  const home = await (await render("/en")).text();
  assert.match(home, /href="\/en\/solutions"/);
  // Batch 2 (October 2026): each new programme renders in both languages and links its own whitepaper.
  const batch2 = [
    ["/en/solutions/machinery-regulation-transition", "/tr/cozumler/makine-tuzugune-gecis", "machinery-regulation-no-transition-26659c0f", "makine-tuzugu-gecis-suresi-yok-6cec1c86"],
    ["/en/solutions/eu-packaging-compliance", "/tr/cozumler/ab-ambalaj-uyumu", "ppwr-packaging-file-7d6aa9bd", "ppwr-ambalaj-dosyasi-65f6be90"],
    ["/en/solutions/battery-passport-readiness", "/tr/cozumler/batarya-pasaportu-hazirligi", "battery-passport-data-supply-chain-9f541303", "batarya-pasaportu-veri-zinciri-11d198db"],
    ["/en/solutions/forced-labour-supply-chain-evidence", "/tr/cozumler/zorla-calistirma-tedarik-kaniti", "forced-labour-proof-not-policy-a099a490", "zorla-calistirma-politika-degil-kanit-492125d0"],
    ["/en/solutions/turkiye-ets-readiness", "/tr/cozumler/turkiye-ets-hazirligi", "turkiye-ets-monitoring-before-money-d75e501c", "turkiye-ets-paradan-once-olcum-000f6369"],
  ];
  // Batch 3 (October 2026): five more EU market-access programmes with their own whitepapers.
  batch2.push(
    ["/en/solutions/construction-products-transition", "/tr/cozumler/yapi-urunlerinde-gecis", "construction-products-family-by-family-d0de592d", "yapi-urunleri-aile-aile-gecis-69b43613"],
    ["/en/solutions/textile-ecodesign-readiness", "/tr/cozumler/tekstilde-ekotasarim-hazirligi", "espr-textiles-after-destruction-ban-22b37a1c", "espr-tekstil-imha-yasagindan-sonra-9b18a3aa"],
    ["/en/solutions/nis2-supplier-security", "/tr/cozumler/nis2-tedarikci-guvenligi", "nis2-supplier-security-evidence-ea4bc3b0", "nis2-tedarikci-guvenligi-kaniti-afa3e63f"],
    ["/en/solutions/eu-mdr-portfolio-transition", "/tr/cozumler/ab-mdr-portfoy-gecisi", "eu-mdr-two-deadlines-database-5c93bf77", "ab-mdr-iki-son-tarih-9abc973b"],
    ["/en/solutions/supplier-sustainability-data", "/tr/cozumler/tedarikci-surdurulebilirlik-verisi", "supplier-sustainability-data-after-omnibus-97a36c53", "tedarikci-surdurulebilirlik-verisi-omnibus-82382d59"],
  );
  for (const [enPath, trPath, enSlug, trSlug] of batch2) {
    for (const [path, slug] of [[enPath, enSlug], [trPath, trSlug]]) {
      const response = await render(path);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.match(html, new RegExp(slug), `${path} links its whitepaper`);
      const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
      assert.doesNotMatch(text, /€|\$\s?\d|\bUSD\b|\bEUR\b|\d+\s?(weeks?|months?|hafta|ay)\b/i, `${path} must not show prices or durations`);
    }
  }
  if (routeMap) assert.equal(Object.keys(routeMap.en).filter(key => key.startsWith("solution")).length, Object.keys(routeMap.tr).filter(key => key.startsWith("solution")).length);
});

test("hides the traffic dashboard from anyone who is not a verified editor", async () => {
  for (const path of ["/en/insights/pdf-studio/analytics", "/tr/icgoruler/pdf-studyosu/analitik"]) {
    const response = await render(path);
    assert.equal(response.status, 404, `${path} must not be public`);
    assert.doesNotMatch(await response.text(), /Traffic and analysis|Trafik ve analiz/);
  }
});

test("gives search engines and AI assistants tags, structured data, llms.txt and crawler rules", async () => {
  const [solution, hub, service, home, llms, llmsFull, robots, sitemap] = await Promise.all([
    render("/en/solutions/cbam-data-readiness").then(r => r.text()),
    render("/tr/cozumler").then(r => r.text()),
    render("/en/expertise/market-entry").then(r => r.text()),
    render("/en").then(r => r.text()),
    render("/llms.txt"),
    render("/llms-full.txt"),
    render("/robots.txt").then(r => r.text()),
    render("/sitemap.xml").then(r => r.text()),
  ]);
  const graph = html => JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1].replace(/\\u003c/g, "<"))["@graph"];
  const types = html => graph(html).map(node => [].concat(node["@type"]).join(","));

  // Tags are visible on the page, in the keywords meta and on the hub's flagship cards.
  assert.match(solution, /class="solution-tags"/);
  assert.match(solution, /<li>CBAM<\/li>/);
  assert.match(solution, /name="keywords" content="CBAM,/);
  assert.match(hub, /Çoğu müşterinin başladığı yer/);
  assert.match(hub, /class="solution-tags"/);

  // Structured data describes the organisation, the site, the page and the offer.
  for (const type of ["Organization,ProfessionalService", "WebSite", "WebPage", "BreadcrumbList", "Service", "FAQPage"]) assert.ok(types(solution).includes(type), `solution page lacks ${type}`);
  const org = graph(home).find(node => node["@id"] === "https://ganrichadvisory.com/#organization");
  assert.equal(org.email, "furkangul@ganrichadvisory.com");
  assert.ok(org.sameAs.includes("https://www.linkedin.com/company/135278307/"));
  assert.equal(org.hasOfferCatalog.itemListElement.length, 29); // 21 programmes, 2 strategy services, 5 service models and AI Decisions
  assert.ok(types(hub).includes("ItemList") && types(hub).includes("CollectionPage"));
  assert.ok(types(service).includes("Service"));
  const crumbs = graph(solution).find(node => node["@type"] === "BreadcrumbList").itemListElement.map(item => item.name);
  assert.deepEqual(crumbs, ["Home", "Solutions", "CBAM Data Readiness"]);
  assert.match(solution, /\/og\/en\/solutionCbam\.png/);
  assert.doesNotMatch(JSON.stringify(graph(solution)), /"price"|priceCurrency/);

  // llms.txt and llms-full.txt are plain Markdown maps of the public site.
  assert.equal(llms.status, 200);
  assert.match(llms.headers.get("content-type") ?? "", /^text\/plain/);
  const llmsText = await llms.text();
  assert.match(llmsText, /^# Ganrich Advisory\n\n> /);
  assert.match(llmsText, /\[CBAM Data Readiness\]\(https:\/\/ganrichadvisory\.com\/en\/solutions\/cbam-data-readiness\)/);
  assert.match(llmsText, /\[SKDM \(CBAM\) Veri Hazırlığı\]\(https:\/\/ganrichadvisory\.com\/tr\/cozumler\/cbam-veri-hazirligi\)/);
  assert.doesNotMatch(llmsText, /pdf-studio|\/api\//);
  const fullText = await llmsFull.text();
  assert.equal(llmsFull.status, 200);
  assert.match(fullText, /### CBAM Data Readiness/);
  assert.match(fullText, /Scope and boundaries:/);

  // AI search crawlers get explicit groups; private paths stay closed to everyone.
  for (const bot of ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) assert.match(robots, new RegExp(`User-Agent: ${bot}`, "i"));
  assert.equal((robots.match(/Disallow: \/en\/insights\/pdf-studio/g) ?? []).length, 2);
  assert.match(sitemap, /<loc>https:\/\/ganrichadvisory\.com\/en\/solutions\/cbam-data-readiness<\/loc>[\s\S]*?<priority>0\.8<\/priority>/);
});

test("homepage whitepapers match the solutions catalogue", async () => {
  // Read the sources as text: the homepage copy is duplicated to stay inside its JS budget.
  const [home, catalogue] = await Promise.all([
    readFile(new URL("../app/home-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/solutions-content.ts", import.meta.url), "utf8"),
  ]);
  const entries = [...home.matchAll(/key: "(\w+)", title: "([^"]+)", slug: "([^"]+)"/g)];
  assert.equal(entries.length, 6);
  for (const [, key, title, slug] of entries) {
    const line = catalogue.split("\n").find(l => l.includes(`key: '${key}'`) && l.includes(`slug: '${slug}'`));
    assert.ok(line, `${key} ${slug} is in solutions-content.ts`);
    assert.ok(line.includes(`paper: { title: '${title}'`), `${slug} title matches`);
  }
});

test("retired pages redirect to the simplified paths", async () => {
  for (const [path, target] of [["/en/expertise", /\/en\/solutions#strategy$/], ["/tr/uzmanlik", /\/tr\/cozumler#strategy$/], ["/en/markets", /\/en\/solutions#strategy$/], ["/tr/cografyalar", /\/tr\/cozumler#strategy$/], ["/en/private-executive-briefing", /\/en\/contact\?service=briefing$/]]) {
    const response = await render(path);
    assert.ok([301, 307, 308].includes(response.status), `${path} status ${response.status}`);
    assert.match(response.headers.get("location") ?? "", target, path);
  }
});

test("publishes the CBAM readiness check in both languages and links it from the CBAM programme", async () => {
  for (const [path, title] of [["/en/decision-lab/cbam-readiness-check", /CBAM Readiness Check \| Ganrich Advisory/], ["/tr/karar-laboratuvari/cbam-hazirlik-testi", /SKDM \(CBAM\) Hazırlık Testi \| Ganrich Advisory/]]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title);
    assert.match(html, /rel="canonical"/);
  }
  assert.match(await (await render("/en/solutions/cbam-data-readiness")).text(), /href="\/en\/decision-lab\/cbam-readiness-check"/);
  assert.match(await (await render("/tr/karar-laboratuvari")).text(), /SKDM \(CBAM\) Hazırlık Testi/);
});

test("publishes the CRA readiness check in both languages and links it from the CRA programme", async () => {
  for (const [path, title] of [["/en/decision-lab/cra-readiness-check", /CRA Readiness Check \| Ganrich Advisory/], ["/tr/karar-laboratuvari/cra-hazirlik-testi", /CRA Hazırlık Testi \| Ganrich Advisory/]]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title);
    assert.match(html, /rel="canonical"/);
  }
  assert.match(await (await render("/en/solutions/cra-incident-readiness")).text(), /href="\/en\/decision-lab\/cra-readiness-check"/);
  assert.match(await (await render("/tr/cozumler/cra-olay-hazirligi")).text(), /href="\/tr\/karar-laboratuvari\/cra-hazirlik-testi"/);
  assert.match(await (await render("/en/decision-lab")).text(), /CRA Readiness Check/);
});

test("publishes the EUDR readiness check in both languages and links it from the EUDR programme", async () => {
  for (const [path, title] of [["/en/decision-lab/eudr-readiness-check", /EUDR Readiness Check \| Ganrich Advisory/], ["/tr/karar-laboratuvari/eudr-hazirlik-testi", /EUDR Hazırlık Testi \| Ganrich Advisory/]]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title);
    assert.match(html, /rel="canonical"/);
  }
  assert.match(await (await render("/en/solutions/eudr-traceability")).text(), /href="\/en\/decision-lab\/eudr-readiness-check"/);
  assert.match(await (await render("/tr/cozumler/eudr-izlenebilirlik")).text(), /href="\/tr\/karar-laboratuvari\/eudr-hazirlik-testi"/);
  assert.match(await (await render("/tr/karar-laboratuvari")).text(), /EUDR Hazırlık Testi/);
});

test("publishes the regulation newsletter page in both languages and offers sign-up on EU programmes", async () => {
  for (const [path, title] of [["/en/insights/regulation-updates", /Regulation Updates \| Ganrich Advisory/], ["/tr/icgoruler/mevzuat-bulteni", /Mevzuat Bülteni \| Ganrich Advisory/]]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title);
    assert.match(html, /rel="canonical"/);
  }
  const eu = await (await render("/tr/cozumler/eudr-izlenebilirlik")).text();
  assert.match(eu, /Mevzuat güncellemelerini e-postayla alın/);
  assert.match(await (await render("/en")).text(), /href="\/en\/insights\/regulation-updates"/);
  assert.match(await (await render("/tr/gizlilik")).text(), /E-postayla mevzuat bülteni/);
});

test("keeps the Opportunity Studio showcase reachable but unlinked and noindex, and the Order Desk makes no build claim", async () => {
  for (const [path, products] of [["/en/opportunity-studio", /Five working tools behind our programmes/], ["/tr/opportunity-studio", /Programlarımızın arkasındaki beş çalışma aracı/]]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /Opportunity Studio(: Beş Çalışma Aracı)? \| Ganrich Advisory/);
    assert.match(html, products);
    for (const name of ["Carbon Ledger", "Order Pilot", "Signal Room", "Access Studio", "Border Atlas"]) assert.match(html, new RegExp(name));
    assert.match(html, /\?service=studio/);
    assert.doesNotMatch(html, /studio\.ganrichadvisory\.com/);
  }
  // Since the AI positioning brief (4 Nov 2026) the showcase stays reachable but is noindex and unlinked:
  // Ganrich does not build or run AI for clients.
  assert.match(await (await render("/en/opportunity-studio")).text(), /name="robots" content="noindex/);
  for (const path of ["/en/solutions", "/tr/cozumler", "/en/solutions/cbam-data-readiness", "/tr/cozumler/yapay-zeka-siparis-masasi", "/en/contact"]) {
    assert.doesNotMatch(await (await render(path)).text(), /href="\/(en|tr)\/opportunity-studio|value="studio"/, `${path} links the Studio`);
  }
  assert.doesNotMatch(await (await render("/sitemap.xml")).text(), /opportunity-studio/);
  const desk = await (await render("/en/solutions/ai-order-desk-assistant")).text();
  assert.match(desk, /We do not build, resell or operate the software/);
  assert.match(desk, /Do you build the assistant\?/);
  assert.match(await (await render("/tr/cozumler/yapay-zeka-siparis-masasi")).text(), /Yazılımı geliştirmiyor, satmıyor veya işletmiyoruz/);
  await access(new URL("../public/studio/carbon-en.webp", import.meta.url));
});

test("gives each trust page its own title and keeps the offer catalogue to home and solutions", async () => {
  const paths = ["/en/privacy", "/en/legal", "/tr/kvkk-aydinlatma-metni", "/tr/gizlilik", "/tr/yasal-bilgilendirme"];
  const pages = await Promise.all(paths.map(path => render(path).then(response => response.text())));
  const titles = pages.map(page => page.match(/<title>([^<]*)<\/title>/)?.[1]);
  assert.equal(new Set(titles).size, paths.length);
  assert.match(pages[2], /<title>KVKK Aydınlatma Metni \| Ganrich Advisory<\/title>/);
  const [home, about] = await Promise.all([render("/en"), render("/en/about")].map(p => p.then(response => response.text())));
  assert.match(home, /"OfferCatalog"/);
  assert.doesNotMatch(about, /"OfferCatalog"/);
  assert.doesNotMatch(home, /name="keywords"/);
});

test("names the data controller and states purposes, transfers, retention and how to apply", async () => {
  const [kvkk, privacy, rights, vendors] = await Promise.all(["/tr/kvkk-aydinlatma-metni", "/en/privacy", "/tr/gizlilik", "/en/privacy"].map(path => render(path).then(response => response.text())));
  for (const page of [kvkk, privacy, rights]) {
    assert.match(page, /Ahmed Furkan Gül/);
    assert.match(page, /furkangul@ganrichadvisory\.com/);
  }
  assert.match(kvkk, /m\. 5\/2-c/);
  assert.match(kvkk, /yurt dışına aktarılmaktadır/);
  assert.match(kvkk, /30 gün içinde/);
  assert.match(privacy, /24 months from receipt/);
  assert.match(vendors, /Cloudflare, Inc\./);
  assert.doesNotMatch(kvkk + privacy + rights + vendors, /Publication gate|Yayın kapısı|not yet published|henüz yayımlanmamaktadır/);
});

test("Turkish pages spell the founder's name Gül and English pages keep Gul", async () => {
  const about = await readFile(new URL("../app/marketing-pages.tsx", import.meta.url), "utf8");
  assert.match(about, /isEn \? "Ahmed Furkan Gul" : "Ahmed Furkan Gül"/);
  const data = await readFile(new URL("../app/structured-data.ts", import.meta.url), "utf8");
  assert.match(data, /lang === "tr" \? "Ahmed Furkan Gül" : "Ahmed Furkan Gul"/);
  const insights = await readFile(new URL("../app/phase-two-insights.ts", import.meta.url), "utf8");
  assert.match(insights, /author: "Ahmed Furkan Gül"/);
  const banner = await readFile(new URL("../app/privacy-controls.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(banner, /Gösterişsiz/);
});

test("folds the trust pages into privacy, KVKK and legal, and redirects the old addresses to their sections", async () => {
  const cases = [
    ["/en/privacy-center", "/en/privacy"], ["/tr/gizlilik-merkezi", "/tr/gizlilik"],
    ["/en/cookies", "/en/privacy#cookies"], ["/en/vendors", "/en/privacy#providers"], ["/en/data-rights", "/en/privacy#rights"],
    ["/tr/ilgili-kisi-basvurusu", "/tr/gizlilik#rights"], ["/en/policy-updates", "/en/privacy#changes"],
    ["/en/terms", "/en/legal#terms"], ["/tr/kullanim-kosullari", "/tr/yasal-bilgilendirme#terms"], ["/en/ai-transparency", "/en/legal#ai"],
  ];
  for (const [path, target] of cases) {
    const response = await render(path);
    assert.ok([301, 307, 308].includes(response.status), `${path} status ${response.status}`);
    assert.ok((response.headers.get("location") ?? "").endsWith(target), `${path} -> ${response.headers.get("location")}`);
  }
  const privacy = await (await render("/en/privacy")).text();
  for (const id of ["cookies", "providers", "rights", "changes"]) assert.match(privacy, new RegExp(`id="${id}"`));
  const sitemap = await (await render("/sitemap.xml")).text();
  assert.doesNotMatch(sitemap, /privacy-center|\/en\/cookies<|data-rights|ai-transparency|\/en\/terms<|policy-updates|\/en\/vendors</);
});

test("turns the Decision Lab into a readiness-check hub with the decision tools below", async () => {
  const [en, tr] = await Promise.all(["/en/decision-lab", "/tr/karar-laboratuvari"].map(path => render(path).then(response => response.text())));
  for (const href of ["/en/decision-lab/cbam-readiness-check", "/en/decision-lab/cra-readiness-check", "/en/decision-lab/eudr-readiness-check"]) assert.match(en, new RegExp(`href="${href}"`));
  assert.equal((en.match(/Start the check/g) ?? []).length, 3);
  assert.match(en, /href="\/en\/decision-lab\/decision-framer"/);
  assert.doesNotMatch(en, /Five instruments|tool-need/);
  assert.match(tr, /Hazırlık testleri/);
});

test("leads the solutions hub with the four flagship programmes and lists the rest below", async () => {
  const hub = await (await render("/en/solutions")).text();
  const flagship = hub.slice(hub.indexOf('id="flagship"'), hub.indexOf('id="more"'));
  for (const title of ["CBAM Data Readiness", "CRA Incident Readiness", "EUDR Traceability File", "AI Order Desk Assistant"]) assert.match(flagship, new RegExp(title));
  assert.doesNotMatch(flagship, /Industrial Water Balance|PFAS Substitution/);
  assert.equal((flagship.match(/Take the 2-minute check/g) ?? []).length, 3);
  const more = hub.slice(hub.indexOf('id="more"'), hub.indexOf('id="strategy"'));
  for (const title of ["PFAS Substitution Programme", "Industrial Water Balance", "E-commerce Margin Clarity"]) assert.match(more, new RegExp(title));
  assert.doesNotMatch(more, /CBAM Data Readiness/);
  assert.doesNotMatch(hub, /aria-pressed/);
});

test("keeps the header to the menu, language switch and one call to action", async () => {
  const html = await (await render("/tr")).text();
  const header = html.slice(html.indexOf('<header class="header">'), html.indexOf("</header>"));
  assert.doesNotMatch(header, /⌘K|Keşfet|explore-trigger/);
  assert.match(header, /Ön görüşme isteyin/);
});

test("tells one positioning story in the footer, About page and structured data", async () => {
  const [about, home, aboutTr] = await Promise.all(["/en/about", "/en", "/tr/hakkimizda"].map(path => render(path).then(response => response.text())));
  assert.match(about, /Independent decision partner for Turkish exporters facing EU buyer requirements\./);
  assert.match(about, /independent decision partner for Turkish manufacturers and exporters facing EU buyer requirements/);
  assert.match(home, /Independent decision partner for Turkish exporters facing EU buyer requirements/);
  assert.match(aboutTr, /AB alıcı talepleriyle karşılaşan Türk ihracatçılar için bağımsız karar ortağı\./);
  for (const page of [about, home, aboutTr]) assert.doesNotMatch(page, /Middle East and North Africa|regional fluency|bölgesel derinlik/);
});

test("offers an emailed copy and a PDF of the readiness check result", async () => {
  const source = await readFile(new URL("../app/readiness-check.tsx", import.meta.url), "utf8");
  assert.match(source, /name="resultCopy" value="yes" defaultChecked/);
  assert.match(source, /window\.print\(\)/);
  const route = await readFile(new URL("../app/api/inquiries/route.ts", import.meta.url), "utf8");
  assert.match(route, /input\.answers\.every\(a => a === 0 \|\| a === 1 \|\| a === 2\)/);
});

test("answers common regulation questions on the flagship programme pages", async () => {
  const cbam = await (await render("/en/solutions/cbam-data-readiness")).text();
  assert.match(cbam, /Common questions/);
  assert.match(cbam, /Which importers are covered\?/);
  assert.match(cbam, /"@type":"Question","name":"Which importers are covered\?"/);
  const craTr = await (await render("/tr/cozumler/cra-olay-hazirligi")).text();
  assert.match(craTr, /Sık sorulan sorular/);
  assert.match(craTr, /11 Aralık 2027/);
});

test("links the three readiness checks from the homepage", async () => {
  const [en, tr] = await Promise.all(["/en", "/tr"].map(path => render(path).then(response => response.text())));
  assert.match(en, /See where you stand in two minutes\./);
  for (const path of ["/en/decision-lab/cbam-readiness-check", "/en/decision-lab/cra-readiness-check", "/en/decision-lab/eudr-readiness-check"]) assert.ok(en.includes(`href="${path}"`), path);
  assert.match(tr, /Nerede durduğunuzu iki dakikada görün\./);
  assert.ok(tr.includes('href="/tr/karar-laboratuvari/cbam-hazirlik-testi"'));
});

test("keeps the header call to action sized to its label", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  for (const rule of css.match(/[^{}]+\{[^}]*\bwidth:\s*44px[^}]*\}/g) ?? []) assert.doesNotMatch(rule, /\.button\.compact/);
  assert.match(css, /\.button\.compact, \.save-control, \.reading-modes button, \.command-input button \{ min-height: 44px; \}/);
});

test("lists whitepapers, articles and decision notes in one technical-notes library", async () => {
  for (const [path, title, paper, article] of [
    ["/en/insights", /Technical Notes \| Ganrich Advisory/, /href="\/en\/insights\/report\/cbam-actual-or-default-e9f664d8"/, /href="\/en\/insights\/decision-quality-applied-ai"/],
    ["/tr/icgoruler", /Teknik Notlar \| Ganrich Advisory/, /href="\/tr\/icgoruler\/rapor\/cbam-gercek-mi-varsayilan-mi-ef31215c"/, /href="\/tr\/icgoruler\/uygulamali-yapay-zeka-karar-kalitesi"/],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title);
    assert.match(html, paper);
    assert.match(html, article);
    assert.doesNotMatch(html, /\/(insights\/category|icgoruler\/kategori)\//);
  }
  const tr = await (await render("/tr/icgoruler")).text();
  for (const label of ["AB kuralları", "Enerji ve sanayi", "Uygulamalı yapay zekâ", "Strateji ve büyüme", "Teknik not (PDF)", "Karar notu"]) assert.ok(tr.includes(label), label);
});

test("publishes the EU regulation calendar with official sources and feeds the homepage timeline from it", async () => {
  for (const [path, title, source] of [["/en/insights/eu-regulation-calendar", /EU Regulation Calendar \| Ganrich Advisory/, /Official text: Regulation \(EU\) 2023\/956/], ["/tr/icgoruler/ab-mevzuat-takvimi", /AB Mevzuat Takvimi \| Ganrich Advisory/, /Resmî metin: Regulation \(EU\) 2023\/956/]]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title);
    assert.match(html, source);
    assert.match(html, /href="https:\/\/eur-lex\.europa\.eu\/eli\/reg\/2024\/2847\/oj"/);
    assert.match(html, /2026-10-24/);
  }
  const home = await (await render("/tr")).text();
  assert.match(home, /href="\/tr\/icgoruler\/ab-mevzuat-takvimi"/);
  assert.match(home, /10 Ekim 2026/);
  const { ruleCalendar } = await import("../app/regulation-calendar.ts");
  for (const r of ruleCalendar) {
    assert.match(r.date, /^\d{4}-\d{2}-\d{2}$/, r.id);
    assert.match(r.source.url, /^https:\/\/(eur-lex|trade\.ec)\.europa\.eu\//, r.id);
  }
});

test("keeps page descriptions between 70 and 160 characters", async () => {
  const paths = ["/en", "/tr", "/en/insights", "/tr/icgoruler", "/en/opportunity-studio", "/tr/opportunity-studio",
    "/en/decision-lab/cra-readiness-check", "/tr/karar-laboratuvari/cra-hazirlik-testi", "/en/decision-lab/eudr-readiness-check",
    "/tr/karar-laboratuvari/eudr-hazirlik-testi", "/en/insights/regulation-updates", "/tr/icgoruler/mevzuat-bulteni",
    "/en/insights/eu-regulation-calendar", "/tr/icgoruler/ab-mevzuat-takvimi", "/en/legal", "/tr/yasal-bilgilendirme",
    "/tr/iletisim", "/en/decision-lab/board-brief-builder", "/tr/karar-laboratuvari/karar-atlasi"];
  for (const path of paths) {
    const html = await (await render(path)).text();
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
    const length = [...description.replace(/&#x27;|&quot;|&amp;|&lt;|&gt;|&#39;/g, "x")].length;
    assert.ok(length >= 70 && length <= 160, `${path}: ${length}`);
  }
});

test("links the August 2026 CBAM guidance note from the CBAM programme and the library", async () => {
  assert.match(await (await render("/en/solutions/cbam-data-readiness")).text(), /href="\/en\/insights\/report\/cbam-august-guidance-turkish-exporters-58a4abcd"/);
  assert.match(await (await render("/tr/cozumler/cbam-veri-hazirligi")).text(), /href="\/tr\/icgoruler\/rapor\/skdm-agustos-rehberleri-turk-ihracatci-1d698fcc"/);
  assert.match(await (await render("/tr/icgoruler")).text(), /Ağustos rehberleri: SKDM \(CBAM\)/);
});

test("answers the practical SKDM questions on the CBAM programme page and in FAQPage data", async () => {
  const tr = await (await render("/tr/cozumler/cbam-veri-hazirligi")).text();
  const faq = JSON.parse(tr.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1].replace(/\\u003c/g, "<"))["@graph"].find(node => node["@type"] === "FAQPage");
  const questions = faq.mainEntity.map(item => item.name);
  for (const q of ["SKDM (CBAM) nedir?", "Hangi mallar ve GTİP kodları kapsamda?", "SKDM sertifikası ne kadar, ne zaman ödenir?", "SKDM iletişim şablonu nedir?"]) assert.ok(questions.includes(q), q);
  assert.match(await (await render("/en/solutions/cbam-data-readiness")).text(), /What is CBAM, and what is SKDM\?/);
});

test("states the Türkiye ETS pilot procedures and the January 2027 monitoring plan deadline", async () => {
  assert.match(await (await render("/tr/cozumler/turkiye-ets-hazirligi")).text(), /27 Ocak 2027/);
  assert.match(await (await render("/en/solutions/turkiye-ets-readiness")).text(), /27 January 2027/);
});

test("links the Türkiye ETS pilot note from its programme and the library", async () => {
  assert.match(await (await render("/en/solutions/turkiye-ets-readiness")).text(), /href="\/en\/insights\/report\/turkiye-ets-pilot-monitoring-plan-8fa4535e"/);
  assert.match(await (await render("/tr/cozumler/turkiye-ets-hazirligi")).text(), /href="\/tr\/icgoruler\/rapor\/turkiye-ets-pilotu-izleme-plani-98334c09"/);
  assert.match(await (await render("/tr/icgoruler")).text(), /Türkiye ETS pilotu: Ocak 2027/);
});

test("links the EUDR checklist note and states the timber date for micro and small operators", async () => {
  const en = await (await render("/en/solutions/eudr-traceability")).text();
  assert.match(en, /href="\/en\/insights\/report\/eudr-checklist-turkish-wood-furniture-204bc82e"/);
  assert.match(en, /timber products already covered by the EU Timber Regulation/);
  const tr = await (await render("/tr/cozumler/eudr-izlenebilirlik")).text();
  assert.match(tr, /href="\/tr\/icgoruler\/rapor\/eudr-kontrol-listesi-ahsap-mobilya-a607fc4b"/);
  assert.match(tr, /AB Kereste Tüzüğü kapsamındaki ahşap ürünlerinin/);
  assert.match(await (await render("/tr/icgoruler")).text(), /Türk ahşap ve mobilya ihracatçıları için kontrol listesi/);
});

test("links the textile product passport note from its programme and the library", async () => {
  assert.match(await (await render("/en/solutions/textile-ecodesign-readiness")).text(), /href="\/en\/insights\/report\/textile-product-passport-turkish-suppliers-eb264118"/);
  assert.match(await (await render("/tr/cozumler/tekstilde-ekotasarim-hazirligi")).text(), /href="\/tr\/icgoruler\/rapor\/tekstil-urun-pasaportu-turk-tedarikci-66a3e53c"/);
  assert.match(await (await render("/tr/icgoruler")).text(), /Tekstilde dijital ürün pasaportu/);
});

test("uses the Turkish search terms and fuller descriptions on key pages", async () => {
  const ets = await (await render("/tr/cozumler/turkiye-ets-hazirligi")).text();
  assert.match(ets, /<title>Türkiye ETS \(TR ETS\) Pilot Hazırlığı \| Ganrich Advisory<\/title>/);
  assert.match(ets, /name="description" content="TR ETS pilot döneminde/);
  assert.match(await (await render("/tr/icgoruler/ab-mevzuat-takvimi")).text(), /AB Yeşil Mutabakat düzenlemeleri/);
  assert.match(await (await render("/tr")).text(), /AB Yeşil Mutabakat ve ürün kuralları/);
  assert.match(await (await render("/tr/cozumler/tekstilde-ekotasarim-hazirligi")).text(), /name="description" content="ESPR ve Dijital Ürün Pasaportu/);
  assert.match(await (await render("/tr/cozumler/zorla-calistirma-tedarik-kaniti")).text(), /<title>Zorla Çalıştırma Tüzüğü: Tedarik Zinciri Kanıtı \| Ganrich<\/title>/);
});

test("gives every programme report a short search title and a full description", async () => {
  const [seoSource, reportSource, solutionsSource] = await Promise.all([
    readFile(new URL("../app/report-seo.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/pdf-insight-pages.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/solutions-content.ts", import.meta.url), "utf8"),
  ]);
  const entries = [...seoSource.matchAll(/'([a-z0-9-]+)': \['((?:[^'\\]|\\.)*)', '((?:[^'\\]|\\.)*)'\]/g)];
  const slugs = [...solutionsSource.matchAll(/(?:paper|update): \{ title: '(?:[^'\\]|\\.)*', slug: '([^']+)'/g)].map(m => m[1]);
  for (const slug of slugs) assert.ok(entries.some(e => e[1] === slug), `missing SEO entry for ${slug}`);
  for (const [, slug, title, description] of entries) {
    assert.ok([...`${title} | Ganrich`].length <= 60, `${slug} title`);
    const length = [...description].length;
    assert.ok(length >= 150 && length <= 160, `${slug} description ${length}`);
  }
  assert.match(reportSource, /seo \? `\$\{seo\[0\]\} \| Ganrich`/);
});

test("points x-default at each page's own English URL and pairs EN/TR reports", async () => {
  const tr = await (await render("/tr/cozumler/turkiye-ets-hazirligi")).text();
  assert.match(tr, /hrefLang="x-default" href="https:\/\/ganrichadvisory\.com\/en\/solutions\/turkiye-ets-readiness"/);
  const en = await (await render("/en/solutions")).text();
  assert.match(en, /hrefLang="x-default" href="https:\/\/ganrichadvisory\.com\/en\/solutions"/);
  const reportSource = await readFile(new URL("../app/pdf-insight-pages.tsx", import.meta.url), "utf8");
  assert.match(reportSource, /reportTranslation\(lang, insight\.slug\)/);
  assert.match(reportSource, /"x-default": lang === "en" \? path : pair/);
});

test("publishes the EUDR and steel passport guides in both languages with full text in the HTML", async () => {
  const pages = [
    ["/en/insights/eudr-30-december-2026-turkish-exporters", "EUDR 30 December 2026: What Your EU Buyer Will Ask For", "/tr/icgoruler/eudr-30-aralik-2026-ihracatci", /The data pack your EU buyer will ask for/],
    ["/tr/icgoruler/eudr-30-aralik-2026-ihracatci", "EUDR 30 Aralık 2026: AB Alıcınız Sizden Ne İsteyecek?", "/en/insights/eudr-30-december-2026-turkish-exporters", /AB alıcınızın isteyeceği veri paketi/],
    ["/en/insights/steel-digital-product-passport-espr-turkiye", "Steel Digital Product Passport: What ESPR Means for Türkiye", "/tr/icgoruler/celik-dijital-urun-pasaportu-espr", /How DPP and CBAM data overlap/],
    ["/tr/icgoruler/celik-dijital-urun-pasaportu-espr", "Çelik Dijital Ürün Pasaportu: ESPR Türk Üreticiye Ne Getirir", "/en/insights/steel-digital-product-passport-espr-turkiye", /<table>/],
  ];
  for (const [path, title, pair, body] of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`<title>${title}</title>`), `${path} title`);
    assert.match(html, body);
    assert.ok(html.includes(`href="https://ganrichadvisory.com${pair}"`), `${path} hreflang pair`);
    assert.match(html, /"@type":"Article"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /\/og\/(en|tr)\/guide(Eudr2026|SteelDpp)\.png/);
    assert.match(html, /\/guides\/guide(Eudr2026|SteelDpp)-(en|tr)\.webp/);
  }
  const [routes, index, content] = await Promise.all(["advisory-routes.ts", "guides-index.ts", "guides-content.ts"].map(f => readFile(new URL(`../app/${f}`, import.meta.url), "utf8")));
  for (const p of ["insights/eudr-30-december-2026-turkish-exporters", "icgoruler/celik-dijital-urun-pasaportu-espr"]) {
    assert.ok(routes.includes(`'${p}'`) && content.includes(`"path": "${p}"`), p);
  }
  for (const m of index.matchAll(/"h1": "((?:[^"\\]|\\.)*)"/g)) assert.ok(content.includes(`"h1": "${m[1]}"`), "index h1 matches content");
  assert.match(await (await render("/tr/icgoruler")).text(), /Çelik Dijital Ürün Pasaportu: ESPR Türk çelik üreticisinden/);
});

test("publishes the CBAM 2026 and CRA standards guides with FAQ markup, sitemap entries and working internal links", async () => {
  const pages = [
    ["/en/insights/cbam-2026-update-tr-ets-cop31", "CBAM 2026 Update: Prices, Deadlines and TR ETS Before COP31", "/tr/icgoruler/skdm-2026-guncel-sertifika-fiyati-tr-ets", /<strong>10% in 2026, 20% in 2027 and 30% in 2028<\/strong>/],
    ["/tr/icgoruler/skdm-2026-guncel-sertifika-fiyati-tr-ets", "SKDM 2026: Sertifika Fiyatları, Takvim ve TR ETS Pilotu", "/en/insights/cbam-2026-update-tr-ets-cop31", /18814 sayılı Olur ile süre 27 Ocak 2027/],
    ["/en/insights/cra-compliance-without-harmonised-standards", "CRA Compliance Without Harmonised Standards: What to Rely On", "/tr/icgoruler/cra-uyumu-standart-yokken-turk-uretici", /Route 1: default products, module A without standards/],
    ["/tr/icgoruler/cra-uyumu-standart-yokken-turk-uretici", "CRA Uyumu: Standart Yokken Türk Üretici Neye Dayanacak?", "/en/insights/cra-compliance-without-harmonised-standards", /standartsız modül A/],
  ];
  const sitemap = await (await render("/sitemap.xml")).text();
  for (const [path, title, pair, body] of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`<title>${title}</title>`), `${path} title`);
    assert.match(html, body);
    assert.ok(html.includes(`href="https://ganrichadvisory.com${pair}"`), `${path} hreflang pair`);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /\/og\/(en|tr)\/guide(Cbam2026|CraStandards)\.png/);
    assert.ok(sitemap.includes(`https://ganrichadvisory.com${path}`), `${path} in sitemap`);
  }
  const tr = await (await render("/tr/icgoruler/skdm-2026-guncel-sertifika-fiyati-tr-ets")).text();
  assert.equal((tr.match(/<li>Tesisiniz TR ETS pilot/g) ?? []).length, 2, "TR checklist has steps 4 and 6");
  const content = await readFile(new URL("../app/guides-content.ts", import.meta.url), "utf8");
  const links = [...new Set([...content.matchAll(/\]\((\/(?:en|tr)\/[^)]+)\)/g)].map(m => m[1]))];
  for (const link of links) assert.equal((await render(link)).status, 200, `internal link ${link}`);
});

test("publishes the CRA reporting (refrigeration) guide in both languages with FAQ markup, sitemap entries and library cards", async () => {
  const pages = [
    ["/en/insights/cra-reporting-white-goods-refrigeration", "CRA Reporting for Refrigeration and White-Goods Exporters", "/tr/icgoruler/cra-bildirim-beyaz-esya-sogutma", /<strong>Article 14 reporting has applied since 11 September 2026\.<\/strong>/],
    ["/tr/icgoruler/cra-bildirim-beyaz-esya-sogutma", "CRA Bildirimi: Beyaz Eşya ve Soğutma İhracatçısı", "/en/insights/cra-reporting-white-goods-refrigeration", /<strong>Madde 14 bildirim yükümlülükleri 11 Eylül 2026’dan beri uygulanıyor\.<\/strong>/],
  ];
  const sitemap = await (await render("/sitemap.xml")).text();
  for (const [path, title, pair, body] of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`<title>${title}</title>`), `${path} title`);
    assert.match(html, body);
    assert.ok(html.includes(`href="https://ganrichadvisory.com${pair}"`), `${path} hreflang pair`);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /\/og\/(en|tr)\/guideCraReporting\.png/);
    assert.match(html, /href="https:\/\/www\.enisa\.europa\.eu\/news\/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu" rel="noopener noreferrer" target="_blank"/);
    assert.doesNotMatch(html, /beyaz eşya üreticileri şimdi ne yapmalı/i, "TR description is the reviewed one, without the urgency line");
    assert.ok(sitemap.includes(`https://ganrichadvisory.com${path}`), `${path} in sitemap`);
  }
  assert.match(await (await render("/en/insights")).text(), /CRA Reporting for Refrigeration and White-Goods Exporters/);
  assert.match(await (await render("/tr/icgoruler")).text(), /CRA Bildirimi: Beyaz Eşya ve Soğutma İhracatçısı/);
});

test("publishes the Gulf market entry guide in both languages with FAQ markup, sitemap entries and a strategy library card", async () => {
  const pages = [
    ["/en/insights/gulf-market-entry-framework-turkish-companies", "Gulf Market Entry: UAE or Saudi Arabia First? A Framework", "/tr/icgoruler/korfez-pazara-giris-karar-cercevesi", /Cabinet Resolution No\. 55 of 2021/],
    ["/tr/icgoruler/korfez-pazara-giris-karar-cercevesi", "Körfez&#x27;e Giriş: Önce BAE mi, Suudi Arabistan mı?", "/en/insights/gulf-market-entry-framework-turkish-companies", /Kademeli taahhüt merdiveni/],
  ];
  const sitemap = await (await render("/sitemap.xml")).text();
  for (const [path, title, pair, body] of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`<title>${title}</title>`), `${path} title`);
    assert.match(html, body);
    assert.ok(html.includes(`href="https://ganrichadvisory.com${pair}"`), `${path} hreflang pair`);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /\/og\/(en|tr)\/guideGulfEntry\.png/);
    assert.doesNotMatch(html, /\b(Draft|Taslak)\b/, "no draft wording");
    assert.match(html, /(not legal or tax advice|hukuki ya da vergisel danışmanlık değildir)/);
    assert.ok(sitemap.includes(`https://ganrichadvisory.com${path}`), `${path} in sitemap`);
  }
  assert.match(await (await render("/en/insights")).text(), /Gulf market entry: UAE or Saudi Arabia first\?/);
  assert.match(await (await render("/tr/icgoruler")).text(), /Körfez pazarına giriş: Önce BAE mi, Suudi Arabistan mı\?/);
});

test("publishes the UK CBAM 2027 guide in both languages with FAQ markup, sitemap entries and library cards", async () => {
  const pages = [
    ["/en/insights/uk-cbam-2027-turkish-exporters", "UK CBAM 2027: What Turkish Steel and Aluminium Must Do", "/tr/icgoruler/ingiltere-skdm-2027-ihracatci", /<strong>£9\.69 per tCO2e for iron and steel<\/strong>/],
    ["/tr/icgoruler/ingiltere-skdm-2027-ihracatci", "İngiltere SKDM 2027: Türk Çelik ve Alüminyum İhracatçısı", "/en/insights/uk-cbam-2027-turkish-exporters", /yedi haftalık eylem listesi/],
  ];
  const sitemap = await (await render("/sitemap.xml")).text();
  for (const [path, title, pair, body] of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`<title>${title}</title>`), `${path} title`);
    assert.match(html, body);
    assert.ok(html.includes(`href="https://ganrichadvisory.com${pair}"`), `${path} hreflang pair`);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /\/og\/(en|tr)\/guideUkCbam\.png/);
    assert.doesNotMatch(html, /\*?(Draft|Taslak)\. |DRAFT v2|editor notes|editör notları/i, "no draft footer, status line or editor notes");
    assert.match(html, /(not legal or tax advice|hukuki ya da vergisel danışmanlık değildir)/);
    assert.ok(sitemap.includes(`https://ganrichadvisory.com${path}`), `${path} in sitemap`);
  }
  assert.match(await (await render("/en/insights")).text(), /UK CBAM from 1 January 2027/);
  assert.match(await (await render("/tr/icgoruler")).text(), /İngiltere SKDM&#x27;si 1 Ocak 2027&#x27;de başlıyor/);
});

test("links the CBAM actual-vs-default report from the CBAM 2026 guide and the readiness check intro", async () => {
  const pairs = [
    ["/en/insights/cbam-2026-update-tr-ets-cop31", "/en/insights/report/cbam-actual-or-default-e9f664d8"],
    ["/tr/icgoruler/skdm-2026-guncel-sertifika-fiyati-tr-ets", "/tr/icgoruler/rapor/cbam-gercek-mi-varsayilan-mi-ef31215c"],
    ["/en/decision-lab/cbam-readiness-check", "/en/insights/report/cbam-actual-or-default-e9f664d8"],
    ["/tr/karar-laboratuvari/cbam-hazirlik-testi", "/tr/icgoruler/rapor/cbam-gercek-mi-varsayilan-mi-ef31215c"],
  ];
  for (const [page, report] of pairs) {
    const html = await (await render(page)).text();
    assert.ok(html.includes(`href="${report}"`), `${page} links ${report}`);
  }
});

test("link arrows are SVG icons, not the emoji-prone ↗ character", async () => {
  for (const path of ["/en", "/tr", "/en/solutions", "/tr/cozumler", "/en/about", "/tr/hakkinda"]) {
    const response = await render(path);
    const html = await response.text();
    assert.equal(html.includes("↗"), false, `${path} still renders the ↗ character`);
    if (response.status === 200) assert.match(html, /class="arrow-icon/, `${path} has no arrow icon`);
  }
});

test("AI Decisions page renders in both languages with offers, FAQ and Service schema, and no prices or ratings", async () => {
  const pages = [
    ["/en/expertise/ai-decisions", "AI Decisions: Independent AI Advisory | Ganrich Advisory", "/tr/uzmanlik/yapay-zeka-kararlari", /AI decisions, independent of the vendor who builds them\./, /We do not build or resell AI systems\./, /We take no vendor commissions or referral fees\./],
    ["/tr/uzmanlik/yapay-zeka-kararlari", "Yapay Zekâ Kararları: Bağımsız Danışmanlık | Ganrich Advisory", "/en/expertise/ai-decisions", /Yapay zekâ kararları, onu kuran tedarikçiden bağımsız\./, /Yapay zekâ sistemi geliştirmiyor veya satmıyoruz\./, /komisyon veya yönlendirme ücreti almıyoruz/],
  ];
  const sitemap = await (await render("/sitemap.xml")).text();
  for (const [path, title, pair, hero, noBuild, noCommission] of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`<title>${title}</title>`), `${path} title`);
    for (const re of [hero, noBuild, noCommission, /KVKK/, /EU AI Act|AB Yapay Zekâ Yasası/]) assert.match(html, re, `${path} ${re}`);
    assert.ok(html.includes(`href="https://ganrichadvisory.com${pair}"`), `${path} hreflang pair`);
    assert.match(html, /"@type":"Service"/);
    assert.match(html, /"@type":"OfferCatalog"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.doesNotMatch(html, /AggregateRating|"@type":"Review"|"price"/, `${path} has no ratings, reviews or prices`);
    const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
    assert.doesNotMatch(text, /€|\$\s?\d|\bUSD\b|\bEUR\b|\bTL\b|₺/, `${path} must not show prices`);
    assert.match(text, /4 (weeks|hafta)/, `${path} shows the approved four-week durations`);
    assert.match(html, /\/og\/(en|tr)\/aiDecisions\.png/);
    assert.ok(sitemap.includes(`https://ganrichadvisory.com${path}`), `${path} in sitemap`);
    for (const link of [...html.matchAll(/href="(\/(?:en|tr)\/[^"#?]+)/g)].map(m => m[1]).filter((v, i, a) => a.indexOf(v) === i)) {
      assert.equal((await render(link)).status, 200, `${path} links ${link}`);
    }
  }
  const llms = await (await render("/llms.txt")).text();
  assert.match(llms, /\/en\/expertise\/ai-decisions/);
});

test("home pages link the AI Decisions page and the About page states the AI decision role", async () => {
  for (const [path, href] of [["/en", "/en/expertise/ai-decisions"], ["/tr", "/tr/uzmanlik/yapay-zeka-kararlari"]]) {
    const html = await (await render(path)).text();
    assert.ok(html.includes(`href="${href}"`), `${path} links ${href}`);
  }
  assert.match(await (await render("/en/about")).text(), /independent decision layer above deployment: it does not build AI/);
  assert.match(await (await render("/tr/hakkimizda")).text(), /uygulamanın üzerindeki bağımsız karar katmanıdır: yapay zekâ geliştirmez/);
});

test("the old AI Value Diagnostic address redirects to the board diagnostic on the AI Decisions page", async () => {
  for (const [from, to] of [["/en/expertise/ai-value", "/en/expertise/ai-decisions#aiDiagnostic"], ["/tr/uzmanlik/yapay-zeka-degeri", "/tr/uzmanlik/yapay-zeka-kararlari#aiDiagnostic"]]) {
    const response = await render(from);
    assert.ok([307, 308].includes(response.status), `${from} status ${response.status}`);
    assert.ok((response.headers.get("location") ?? "").endsWith(to), `${from} -> ${response.headers.get("location")}`);
  }
  const sitemap = await (await render("/sitemap.xml")).text();
  assert.doesNotMatch(sitemap, /expertise\/ai-value<|uzmanlik\/yapay-zeka-degeri</);
  const hub = await (await render("/en/solutions")).text();
  assert.ok(hub.includes('href="/en/expertise/ai-decisions"'), "solutions hub links AI Decisions");
  assert.doesNotMatch(hub, /AI Value Diagnostic/);
  const contact = await (await render("/en/contact")).text();
  assert.doesNotMatch(contact, /AI Value Diagnostic/);
});

test("guides with a readiness check start it mid-article with links that prefill the first answer", async () => {
  for (const [path, check] of [
    ["/en/insights/eudr-30-december-2026-turkish-exporters", "/en/decision-lab/eudr-readiness-check"],
    ["/tr/icgoruler/eudr-30-aralik-2026-ihracatci", "/tr/karar-laboratuvari/eudr-hazirlik-testi"],
  ]) {
    const html = await (await render(path)).text();
    assert.match(html, /class="guide-check"/);
    for (const v of [2, 1, 0]) assert.ok(html.includes(`href="${check}?a1=${v}"`), `${path} links ${check}?a1=${v}`);
    assert.ok(html.indexOf('class="guide-check"') > html.indexOf("<h2"), "the starter comes after the first section");
  }
  const source = await readFile(new URL("../app/readiness-check.tsx", import.meta.url), "utf8");
  assert.match(source, /params\.get\('a1'\)/);
});

test("every guide ends with an email-only copy form and a Save as PDF button", async () => {
  for (const path of ["/en/insights/eudr-30-december-2026-turkish-exporters", "/tr/icgoruler/celik-dijital-urun-pasaportu-espr"]) {
    const html = await (await render(path)).text();
    assert.match(html, /class="guide-copy"/);
    assert.match(html, /name="email"/);
    assert.doesNotMatch(html.slice(html.indexOf('class="guide-copy"')), /name="name"/);
    assert.match(html, /PDF/);
  }
  const route = await readFile(new URL("../app/api/guide-copy/route.ts", import.meta.url), "utf8");
  assert.match(route, /'download'/);
  assert.match(route, /guideByKey/);
});

test("the bulletin page shows the email-only sign-up before the explanation", async () => {
  for (const path of ["/en/insights/regulation-updates", "/tr/icgoruler/mevzuat-bulteni"]) {
    const html = await (await render(path)).text();
    const form = html.indexOf('class="updates-signup"'), points = html.indexOf('class="updates-points"');
    assert.ok(form > 0 && points > form, `${path}: form before points`);
    const signup = html.slice(form, points);
    assert.match(signup, /name="email"/);
    assert.doesNotMatch(signup, /name="(name|organization)"/);
  }
});

test("the contact form needs only name, email and topic", async () => {
  for (const path of ["/en/contact", "/tr/iletisim"]) {
    const html = await (await render(path)).text();
    const form = html.slice(html.indexOf('<form class="contact-form'));
    const tag = (name) => form.match(new RegExp(`<(input|select)[^>]*name="${name}"[^>]*>`))?.[0] ?? "";
    for (const field of ["name", "email", "topic"]) assert.match(tag(field), /required/, `${path}: ${field} required`);
    assert.ok(tag("organization") && !/required/.test(tag("organization")), `${path}: company optional`);
  }
  const route = await readFile(new URL("../app/api/inquiries/route.ts", import.meta.url), "utf8");
  assert.match(route, /kind === "contact" && !interest/);
});

test("EU Buyer Request Desk page renders in both languages, is linked from home and contact, and shows no prices", async () => {
  const pages = [
    ["/en/expertise/eu-buyer-request-desk", "EU Buyer Request Desk | Ganrich Advisory", "/tr/uzmanlik/ab-alici-talep-masasi", /One desk for every EU buyer request\./, /We are not a verification body/, /take no commissions or referral fees/, "/en"],
    ["/tr/uzmanlik/ab-alici-talep-masasi", "AB Alıcı Talep Masası | Ganrich Advisory", "/en/expertise/eu-buyer-request-desk", /AB alıcılarınızdan gelen her talep için tek masa\./, /Doğrulama kuruluşu değiliz/, /komisyon veya yönlendirme ücreti almıyoruz/, "/tr"],
  ];
  const sitemap = await (await render("/sitemap.xml")).text();
  for (const [path, title, pair, hero, noVerify, noCommission, home] of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`<title>${title}</title>`), `${path} title`);
    for (const re of [hero, noVerify, noCommission, /KVKK/]) assert.match(html, re, `${path} ${re}`);
    assert.ok(html.includes(`href="https://ganrichadvisory.com${pair}"`), `${path} hreflang pair`);
    assert.match(html, /"@type":"Service"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.doesNotMatch(html, /AggregateRating|"@type":"Review"|"price"/, `${path} has no ratings, reviews or prices`);
    const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
    assert.doesNotMatch(text, /€|\$\s?\d|\bUSD\b|\bEUR\b|\bTL\b|₺/, `${path} must not show prices`);
    assert.match(html, /\/og\/(en|tr)\/buyerDesk\.png/);
    assert.ok(html.includes("?service=buyerDesk"), `${path} contact link preselects the desk`);
    assert.ok(sitemap.includes(`https://ganrichadvisory.com${path}`), `${path} in sitemap`);
    for (const link of [...html.matchAll(/href="(\/(?:en|tr)\/[^"#?]+)/g)].map(m => m[1]).filter((v, i, a) => a.indexOf(v) === i)) {
      assert.equal((await render(link)).status, 200, `${path} links ${link}`);
    }
    assert.ok((await (await render(home)).text()).includes(`href="${path}"`), `${home} links the desk`);
  }
  const contact = await (await render("/en/contact")).text();
  assert.match(contact, /value="buyerDesk"/);
  const llms = await (await render("/llms.txt")).text();
  assert.match(llms, /\/en\/expertise\/eu-buyer-request-desk/);
});

test("four service model pages render in both languages, link from Solutions and contact, and show no prices", async () => {
  const pages = [
    ["toolSelection", "/en/expertise/compliance-tool-and-verifier-selection", "/tr/uzmanlik/uyum-yazilimi-ve-dogrulayici-secimi", /without a sales pitch/, /yazılım satmıyor/i],
    ["incentiveFile", "/en/expertise/green-transition-incentive-file", "/tr/uzmanlik/yesil-donusum-tesvik-dosyasi", /cannot guarantee approval/, /Onay garantisi veremeyiz/],
    ["cohortProgramme", "/en/expertise/exporter-cohort-programme", "/tr/uzmanlik/ihracatci-kohort-programi", /anonymous summary/, /anonim özet/],
    ["marketAccessDirector", "/en/expertise/part-time-eu-market-access-director", "/tr/uzmanlik/yari-zamanli-ab-pazar-erisimi-direktoru", /Decisions stay with the board/, /Kararlar yönetim kurulunda kalır/],
  ];
  const sitemap = await (await render("/sitemap.xml")).text();
  const llms = await (await render("/llms.txt")).text();
  const hubs = { en: await (await render("/en/solutions")).text(), tr: await (await render("/tr/cozumler")).text() };
  const contacts = { en: await (await render("/en/contact")).text(), tr: await (await render("/tr/iletisim")).text() };
  const checked = new Set();
  for (const [key, enPath, trPath, enMark, trMark] of pages) {
    for (const [lang, path, pair, mark] of [["en", enPath, trPath, enMark], ["tr", trPath, enPath, trMark]]) {
      const response = await render(path);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.match(html, mark, `${path} boundary text`);
      assert.ok(html.includes(`href="https://ganrichadvisory.com${pair}"`), `${path} hreflang pair`);
      assert.match(html, /"@type":"Service"/);
      assert.match(html, /"@type":"FAQPage"/);
      assert.doesNotMatch(html, /AggregateRating|"@type":"Review"|"price"/, `${path} has no ratings, reviews or prices`);
      const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
      assert.doesNotMatch(text, /€|\$\s?\d|\bUSD\b|\bEUR\b|\bTL\b|₺/, `${path} must not show prices`);
      assert.ok(html.includes(`/og/${lang}/${key}.png`), `${path} OG card`);
      assert.ok(html.includes(`?service=${key}`), `${path} contact link preselects the service`);
      assert.ok(sitemap.includes(`https://ganrichadvisory.com${path}`), `${path} in sitemap`);
      assert.ok(llms.includes(path), `${path} in llms.txt`);
      assert.ok(hubs[lang].includes(`href="${path}"`), `Solutions links ${path}`);
      assert.match(contacts[lang], new RegExp(`value="${key}"`), `contact topic ${key}`);
      const body = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
      for (const link of body.matchAll(/href="(\/(?:en|tr)\/[^"#?]+)/g)) checked.add(link[1]);
    }
  }
  for (const link of checked) {
    const response = await render(link);
    assert.equal(response.status, 200, `service pages link ${link}`);
    await response.arrayBuffer();
  }
});

test("Solutions explains the three engagement tiers in both languages without prices", async () => {
  for (const [path, tiers] of [["/en/solutions", ["Diagnosis", "Implementation coordination", "Ongoing support"]], ["/tr/cozumler", ["Teşhis", "Uygulama koordinasyonu", "Sürekli destek"]]]) {
    const html = await (await render(path)).text();
    assert.match(html, /id="how"/, `${path} tiers section`);
    for (const t of tiers) assert.ok(html.includes(`<strong>${t}</strong>`), `${path} ${t}`);
    assert.ok(html.includes('href="#how"'), `${path} subnav link`);
    const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
    assert.doesNotMatch(text, /€|\$\s?\d|\bUSD\b|\bEUR\b|\bTL\b|₺/, `${path} must not show prices`);
  }
});
