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
  assert.match(html, /<title>Ganrich Advisory \| EU Readiness and Strategy for Turkish Industry<\/title>/i);
  assert.match(html, /A clear next step on EU rules and growth decisions\./);
  assert.match(html, /Turkish industry and exporters/);
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
  assert.match(html, /AB kuralları ve büyüme kararları için net bir sonraki adım\./);
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

test("renders bilingual engagement, sample, and decision-note journeys", async () => {
  const paths=["/en/expertise/market-entry","/en/expertise/operating-model","/en/expertise/ai-value","/en/sample-work","/en/insights/entry-model-choice","/en/insights/founder-decision-rights","/en/insights/ai-pilot-or-process","/en/insights/transformation-value-review","/tr/uzmanlik/pazara-giris","/tr/uzmanlik/isletim-modeli","/tr/uzmanlik/yapay-zeka-degeri","/tr/ornek-calismalar","/tr/icgoruler/pazara-giris-modeli","/tr/icgoruler/kurucu-karar-haklari","/tr/icgoruler/yapay-zeka-pilotu-ve-surec","/tr/icgoruler/donusum-deger-takibi"];
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
  // 152 KB since the contact-step beacon (PR #14). Gzip output differs by a few hundred bytes between
  // machines (153354 in the cloud container, 153737 on the Mac), so the budget keeps about 2 KB of headroom.
  assert.ok(compressedBytes <= 152 * 1024, `Marketing JavaScript is ${compressedBytes} gzip bytes; budget is 155648`);
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

  assert.equal(categoryResponse.status, 200);
  assert.match(category, /Applied AI\./);
  assert.match(category, /Decision-led perspectives on AI value/);
  assert.match(category, /\/og\/en\/categoryAppliedAi\.png/);
  assert.match(turkishCategory, /İşletim modeli\./);
  assert.match(turkishCategory, /<html lang="tr"/);
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
  // Category pages stay reachable but are noindex and out of the sitemap.
  assert.match(category, /(?:name="robots" content="noindex, follow"|content="noindex, follow" name="robots")/);
  assert.doesNotMatch(sitemap, /\/insights\/category\//);
  assert.match(sitemap, /https:\/\/ganrichadvisory\.com\/en\/insights\/decision-quality-applied-ai/);
  assert.match(sitemap, /hreflang="tr"/);
  assert.doesNotMatch(sitemap, /localhost/);
  assert.equal(reportSitemapResponse.status, 200);
  assert.match(reportSitemapResponse.headers.get("content-type") ?? "", /^application\/xml/);
  assert.match(reportSitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(robots, /Disallow: \/api\//);
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
    readFile(new URL("../app/marketing-pages.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/pdf-insight-pages.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[lang]/insights/report/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[lang]/icgoruler/rapor/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(siteSource, /const \[query, setQuery\] = useState\(""\)/);
  assert.match(siteSource, /searchable\.includes\(normalizedQuery\)/);
  assert.match(siteSource, /No perspective matches this search\./);
  assert.match(siteSource, /Bu aramayla eşleşen bir perspektif yok\./);
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
  assert.equal(org.hasOfferCatalog.itemListElement.length, 19); // 16 programmes and 3 strategy services
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
  assert.match(llmsText, /\[CBAM Veri Hazırlığı\]\(https:\/\/ganrichadvisory\.com\/tr\/cozumler\/cbam-veri-hazirligi\)/);
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
  for (const [path, title] of [["/en/decision-lab/cbam-readiness-check", /CBAM Readiness Check \| Ganrich Advisory/], ["/tr/karar-laboratuvari/cbam-hazirlik-testi", /CBAM Hazırlık Testi \| Ganrich Advisory/]]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title);
    assert.match(html, /rel="canonical"/);
  }
  assert.match(await (await render("/en/solutions/cbam-data-readiness")).text(), /href="\/en\/decision-lab\/cbam-readiness-check"/);
  assert.match(await (await render("/tr/karar-laboratuvari")).text(), /CBAM Hazırlık Testi/);
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

test("publishes the Opportunity Studio showcase in both languages without linking the private host", async () => {
  for (const [path, products] of [["/en/opportunity-studio", /Five working tools behind our programmes/], ["/tr/opportunity-studio", /Programlarımızın arkasındaki beş çalışma aracı/]]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /Opportunity Studio \| Ganrich Advisory/);
    assert.match(html, products);
    for (const name of ["Carbon Ledger", "Order Pilot", "Signal Room", "Access Studio", "Border Atlas"]) assert.match(html, new RegExp(name));
    assert.match(html, /\?service=studio/);
    assert.doesNotMatch(html, /studio\.ganrichadvisory\.com/);
  }
  assert.match(await (await render("/en/solutions")).text(), /href="\/en\/opportunity-studio"/);
  assert.match(await (await render("/en/solutions/cbam-data-readiness")).text(), /href="\/en\/opportunity-studio#carbon"/);
  assert.match(await (await render("/tr/cozumler/yapay-zeka-siparis-masasi")).text(), /href="\/tr\/opportunity-studio#orders"/);
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
  assert.match(about, /Strategy and EU-readiness advisory for Turkish industry and exporters\./);
  assert.match(about, /EU-readiness advisory for Turkish manufacturers and exporters/);
  assert.match(aboutTr, /Türk sanayi ve ihracatçıları için strateji ve AB uyum danışmanlığı\./);
  for (const page of [about, home, aboutTr]) assert.doesNotMatch(page, /Middle East and North Africa|regional fluency|bölgesel derinlik/);
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
