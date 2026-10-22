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
  assert.match(html, /<title>Ganrich Advisory \| Strategy, Transformation and Applied AI<\/title>/i);
  assert.match(html, /Clarity for consequential decisions\./);
  assert.match(html, /Strategic clarity, built for execution\./);
  assert.match(html, /AI accelerates the work\. Judgment determines the answer\./);
  assert.match(html, /Start a conversation/);
  assert.match(html, /hrefLang="tr"/);
  assert.match(html, /\/og\/en\/home\.png/);
  assert.match(html, /threshold-field/);
  assert.doesNotMatch(html, /\[EMAIL\]|\[LINKEDIN\]/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders localized Turkish content and metadata", async () => {
  const response = await render("/tr");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Ganrich Advisory \| Strateji, Dönüşüm ve Uygulamalı Yapay Zekâ/);
  assert.match(html, /Kritik kararlar için netlik\./);
  assert.match(html, /Uygulamaya dönüşen stratejik netlik\./);
  assert.match(html, /Görüşme başlatın/);
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
  assert.match(turkishHtml, /Ahmed Furkan Gul/);
  assert.match(turkishHtml, /Kurucu, Ganrich Advisory/);
  assert.match(turkishHtml, /İstanbul Kent Üniversitesinde Dr\. Öğr\. Üyesi/);
});

test("server-renders the bilingual strategic intelligence routes", async () => {
  const routes = [
    ["/en/decision-lab", /Decision Lab/, /Work on the decision/],
    ["/tr/karar-laboratuvari/karar-atlasi", /Karar Atlası/, /Karardan başlayın/],
    ["/en/decision-lab/decision-framer", /Decision Framer/, /What decision needs to be made/],
    ["/en/decision-lab/market-entry-compass", /Market Entry Compass/, /EDITABLE WEIGHTS/],
    ["/en/decision-lab/board-brief-builder", /Board Brief Builder/, /Write for the decision, not the archive/],
    ["/tr/karar-laboratuvari/yapay-zeka-deger-mercegi", /Yapay Zekâ Değer Merceği/, /Değer mantığını görünür kılın/],
    ["/en/decision-lab/changelog", /Decision Lab Changelog/, /Five live tools/],
    ["/en/private-executive-briefing", /Private Executive Briefing/, /Request the briefing/],
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

test("hardens Decision Lab state, export, briefing, and contextual handoff", async () => {
  const [intelligence, site] = await Promise.all([
    readFile(new URL("../app/intelligence.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(intelligence, /params\.set\("decision"/);
  assert.match(intelligence, /params\.set\(`a\$\{index\}`/);
  assert.match(intelligence, /params\.set\(`s\$\{index\}`/);
  assert.match(intelligence, /Export \/ print PDF/);
  assert.match(intelligence, /Email this to me/);
  assert.match(intelligence, /Discuss this decision/);
  assert.match(intelligence, /This tool structures user-entered information/);
  assert.match(site, /Tool context/);
  assert.match(site, /defaultValue=\{prefill\.context\}/);
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

  assert.match(html, /aria-controls="home-market-panel"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(site, /event\.key === "ArrowRight"/);
  assert.match(site, /tabIndex=\{region === i \? 0 : -1\}/);
  assert.match(shell, /role="dialog" aria-modal="true" aria-labelledby="briefing-tray-title"/);
  assert.match(shell, /aria-controls="ganrich-command"/);
  assert.match(site, /lazy\(\(\) => import\("\.\/intelligence"\)/);
  assert.match(intelligence, /event\.key === "ArrowRight"/);
  assert.match(controls, /event\.key === "Escape"/);
  assert.match(privacy, /Trust should be designed into the experience/);
  assert.match(css, /min-height: 44px/);
  assert.ok(compressedBytes <= 150 * 1024, `Marketing JavaScript is ${compressedBytes} gzip bytes; budget is 153600`);
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
  assert.match(sitemap, /https:\/\/ganrichadvisory\.com\/en\/insights\/category\/applied-ai/);
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
      .filter(path => !path.endsWith("/feed.xml") && !path.startsWith("/assets/"));
    for (const path of internalLinks) {
      assert.ok(sitemapPaths.has(path), `Internal link ${path} is absent from the canonical route inventory`);
    }
  }
});

test("makes insight search functional and governs dynamic PDF report discovery", async () => {
  const [siteSource, reportSource, englishRoute, turkishRoute, css] = await Promise.all([
    readFile(new URL("../app/site.tsx", import.meta.url), "utf8"),
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
    ["/en/privacy-center", /Trust should be designed into the experience\./, /No analytics or advertising trackers/],
    ["/tr/gizlilik-merkezi", /Güven, deneyimin içine tasarlanmalıdır\./, /İsteğe bağlı tercihler varsayılan olarak kapalı/],
    ["/en/privacy", /Privacy, explained in plain language\./, /transmitted securely and stored/],
    ["/tr/kvkk-aydinlatma-metni", /Türkiye veri koruma bilgilendirmesi\./, /Aydınlatma/],
    ["/en/cookies", /deliberately small technology footprint/, /Analytics, advertising/],
    ["/en/data-rights", /rights channel should be secure/, /Do not send identity documents/],
    ["/en/ai-transparency", /AI assists the work/, /Decision Lab tools run in the visitor’s browser/],
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
  const briefing = await briefingResponse.text();

  assert.match(contact, /stored securely to review and respond/);
  assert.match(contact, /I have read the privacy notice/);
  assert.match(briefing, /stored securely to review and respond/);
  assert.match(briefing, /I have read the privacy notice/);
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
