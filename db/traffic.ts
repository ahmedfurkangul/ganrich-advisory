// Aggregates for the editor analytics dashboard. All queries read the cookieless page_views log
// written by worker/traffic.ts, plus the inquiries table for conversion.

export type Row = { label: string; views: number; visitors?: number; extra?: string };
export type Channel = "direct" | "search" | "ai" | "social" | "email" | "referral" | "campaign";

export type TrafficReport = {
  days: number;
  from: string;
  to: string;
  totals: { views: number; visitors: number; pagesPerVisitor: number; inquiries: number; conversion: number; aiReferrals: number; botHits: number; aiBotHits: number; pdfDownloads: number; notFound: number };
  previous: { views: number; visitors: number; inquiries: number; aiReferrals: number };
  daily: Array<{ day: string; views: number; visitors: number; aiBots: number; searchBots: number }>;
  channels: Array<{ channel: Channel; visitors: number }>;
  pages: Row[];
  entryPages: Row[];
  referrers: Row[];
  aiReferrers: Row[];
  campaigns: Row[];
  countries: Row[];
  cities: Row[];
  networks: Row[];
  devices: Row[];
  browsers: Row[];
  systems: Row[];
  languages: Row[];
  hours: number[];
  pdfs: Row[];
  notFound: Row[];
  bots: Array<{ name: string; category: string; hits: number; lastSeen: string }>;
  aiBotPaths: Row[];
  discovery: Row[];
  recent: Array<{ ts: string; path: string; referrer: string; country: string; city: string; device: string; browser: string }>;
  rising: Array<{ label: string; now: number; before: number }>;
  funnel: { visitors: number; confirmed: number; cta: number; formStart: number; formSubmit: number; inquiries: number; checkStart: number; checkComplete: number };
  checkPages: Row[];
  funnelChannels: Array<{ channel: Channel; visitors: number; cta: number; submits: number }>;
  ctaPages: Row[];
  inquiryTopics: Row[];
  hasData: boolean;
};

const SEARCH = /(^|\.)(google\.[a-z.]+|bing\.com|yandex\.[a-z.]+|duckduckgo\.com|ecosia\.org|search\.yahoo\.com|yahoo\.com|baidu\.com|naver\.com|qwant\.com|startpage\.com|search\.brave\.com)$/;
const AI = /(^|\.)(chatgpt\.com|chat\.openai\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|bard\.google\.com|copilot\.microsoft\.com|copilot\.cloud\.microsoft|you\.com|poe\.com|chat\.deepseek\.com|deepseek\.com|grok\.com|x\.ai|meta\.ai|chat\.mistral\.ai|phind\.com|kagi\.com)$/;
const SOCIAL = /(^|\.)(linkedin\.com|lnkd\.in|x\.com|t\.co|twitter\.com|facebook\.com|fb\.me|l\.facebook\.com|instagram\.com|l\.instagram\.com|youtube\.com|reddit\.com|whatsapp\.com|wa\.me|t\.me|telegram\.org|threads\.net|medium\.com|substack\.com)$/;
const EMAIL = /(^|\.)(mail\.google\.com|outlook\.live\.com|outlook\.office\.com|outlook\.office365\.com|mail\.yahoo\.com|mail\.yandex\.[a-z.]+)$/;

export function channelOf(referrer: string, utmSource: string, utmMedium: string): Channel {
  const source = utmSource.toLowerCase();
  if (source && (AI.test(source) || /chatgpt|openai|perplexity|claude|gemini|copilot/.test(source))) return "ai";
  if (utmMedium.toLowerCase() === "email" || source === "newsletter") return "email";
  if (source && /linkedin|twitter|facebook|instagram|whatsapp/.test(source)) return "social";
  if (source) return "campaign";
  if (!referrer) return "direct";
  if (AI.test(referrer)) return "ai";
  if (SEARCH.test(referrer)) return "search";
  if (SOCIAL.test(referrer)) return "social";
  if (EMAIL.test(referrer)) return "email";
  return "referral";
}

function isoDay(date: Date) {
  return date.toISOString().slice(0, 10);
}

type Db = D1Database;
const HUMAN = "bot_category = '' AND kind = 'page'";

async function all<T>(db: Db, sql: string, ...params: unknown[]) {
  return (await db.prepare(sql).bind(...params).all<T>()).results ?? [];
}

async function first<T>(db: Db, sql: string, ...params: unknown[]) {
  return (await db.prepare(sql).bind(...params).first<T>()) ?? ({} as T);
}

async function group(db: Db, column: string, from: string, to: string, limit = 10, where = HUMAN) {
  return (await all<{ label: string; views: number; visitors: number }>(db,
    `SELECT ${column} AS label, COUNT(*) AS views, COUNT(DISTINCT day || visitor) AS visitors
     FROM page_views WHERE day >= ? AND day <= ? AND ${where} AND ${column} != ''
     GROUP BY ${column} ORDER BY visitors DESC, views DESC LIMIT ${limit}`, from, to))
    .map(r => ({ label: r.label, views: r.views, visitors: r.visitors }));
}

export async function trafficReport(days: number): Promise<TrafficReport> {
  const { env } = await import("cloudflare:workers");
  const db = (env as unknown as { DB?: Db }).DB;
  if (!db) throw new Error("D1 binding DB is unavailable");
  const today = new Date();
  const to = isoDay(today);
  const from = isoDay(new Date(today.getTime() - (days - 1) * 86_400_000));
  const prevTo = isoDay(new Date(today.getTime() - days * 86_400_000));
  const prevFrom = isoDay(new Date(today.getTime() - (2 * days - 1) * 86_400_000));

  // A visitor id is only stable within one UTC day, so "visitors" means the sum of daily unique visitors.
  const totalsFor = (a: string, b: string) => first<{ views: number; visitors: number }>(db,
    `SELECT COUNT(*) AS views, COUNT(DISTINCT day || visitor) AS visitors FROM page_views WHERE day >= ? AND day <= ? AND ${HUMAN} AND status < 400`, a, b);
  const inquiriesFor = (a: string, b: string) => first<{ n: number }>(db,
    "SELECT COUNT(*) AS n FROM inquiries WHERE substr(created_at, 1, 10) >= ? AND substr(created_at, 1, 10) <= ?", a, b).catch(() => ({ n: 0 }));
  const entriesFor = (a: string, b: string) => all<{ referrer_host: string; utm_source: string; utm_medium: string; visitors: number }>(db,
    `SELECT referrer_host, utm_source, utm_medium, COUNT(DISTINCT day || visitor) AS visitors FROM page_views
     WHERE day >= ? AND day <= ? AND ${HUMAN} GROUP BY referrer_host, utm_source, utm_medium`, a, b);

  const [cur, prev, inq, prevInq, entries, prevEntries] = await Promise.all([
    totalsFor(from, to), totalsFor(prevFrom, prevTo), inquiriesFor(from, to), inquiriesFor(prevFrom, prevTo), entriesFor(from, to), entriesFor(prevFrom, prevTo),
  ]);

  const channelTotals = new Map<Channel, number>();
  for (const e of entries) {
    const c = channelOf(e.referrer_host, e.utm_source, e.utm_medium);
    channelTotals.set(c, (channelTotals.get(c) ?? 0) + e.visitors);
  }
  const aiReferrals = channelTotals.get("ai") ?? 0;
  const prevAi = prevEntries.filter(e => channelOf(e.referrer_host, e.utm_source, e.utm_medium) === "ai").reduce((s, e) => s + e.visitors, 0);

  const [dailyRows, pages, entryPages, referrers, campaigns, countries, cities, networks, devices, browsers, systems, languages, hourRows, pdfRows, notFound, bots, aiBotPaths, discovery, recent, botTotals, pagesBefore] = await Promise.all([
    all<{ day: string; views: number; visitors: number; aiBots: number; searchBots: number }>(db,
      `SELECT day,
        SUM(CASE WHEN ${HUMAN} AND status < 400 THEN 1 ELSE 0 END) AS views,
        COUNT(DISTINCT CASE WHEN ${HUMAN} AND status < 400 THEN visitor END) AS visitors,
        SUM(CASE WHEN bot_category = 'ai' THEN 1 ELSE 0 END) AS aiBots,
        SUM(CASE WHEN bot_category = 'search' THEN 1 ELSE 0 END) AS searchBots
       FROM page_views WHERE day >= ? AND day <= ? GROUP BY day ORDER BY day`, from, to),
    group(db, "path", from, to, 15, `${HUMAN} AND status < 400`),
    group(db, "path", from, to, 10, `${HUMAN} AND status < 400 AND referrer_host != ''`),
    group(db, "referrer_host", from, to, 15),
    all<{ label: string; views: number; visitors: number }>(db,
      `SELECT utm_source || CASE WHEN utm_medium != '' THEN ' / ' || utm_medium ELSE '' END || CASE WHEN utm_campaign != '' THEN ' / ' || utm_campaign ELSE '' END AS label,
        COUNT(*) AS views, COUNT(DISTINCT day || visitor) AS visitors FROM page_views
       WHERE day >= ? AND day <= ? AND ${HUMAN} AND utm_source != '' GROUP BY label ORDER BY visitors DESC LIMIT 10`, from, to),
    group(db, "country", from, to, 12),
    group(db, "city || ', ' || country", from, to, 12, `${HUMAN} AND city != ''`),
    group(db, "network", from, to, 12),
    group(db, "device", from, to, 3),
    group(db, "browser", from, to, 6),
    group(db, "os", from, to, 6),
    group(db, "lang", from, to, 2),
    all<{ hour: number; views: number }>(db,
      // Istanbul is UTC+3 all year.
      `SELECT (CAST(substr(ts, 12, 2) AS INTEGER) + 3) % 24 AS hour, COUNT(*) AS views FROM page_views
       WHERE day >= ? AND day <= ? AND ${HUMAN} GROUP BY hour`, from, to),
    all<{ label: string; views: number; visitors: number; title: string | null }>(db,
      `SELECT v.path AS label, COUNT(*) AS views, COUNT(DISTINCT v.day || v.visitor) AS visitors, MAX(p.title) AS title
       FROM page_views v LEFT JOIN pdf_insights p ON v.path = '/api/pdf-insights/' || p.id || '/document'
       WHERE v.day >= ? AND v.day <= ? AND v.kind = 'pdf' AND v.bot_category = '' GROUP BY v.path ORDER BY views DESC LIMIT 10`, from, to).catch(() => []),
    group(db, "path", from, to, 10, `${HUMAN} AND status = 404`),
    all<{ name: string; category: string; hits: number; lastSeen: string }>(db,
      `SELECT bot_name AS name, bot_category AS category, COUNT(*) AS hits, MAX(ts) AS lastSeen FROM page_views
       WHERE day >= ? AND day <= ? AND bot_category != '' GROUP BY bot_name, bot_category ORDER BY hits DESC LIMIT 25`, from, to),
    all<{ label: string; views: number }>(db,
      `SELECT path AS label, COUNT(*) AS views FROM page_views WHERE day >= ? AND day <= ? AND bot_category = 'ai'
       GROUP BY path ORDER BY views DESC LIMIT 12`, from, to),
    all<{ label: string; views: number; extra: string }>(db,
      `SELECT path AS label, COUNT(*) AS views, GROUP_CONCAT(DISTINCT bot_name) AS extra FROM page_views
       WHERE day >= ? AND day <= ? AND kind = 'file' GROUP BY path ORDER BY views DESC`, from, to),
    all<{ ts: string; path: string; referrer: string; country: string; city: string; device: string; browser: string }>(db,
      `SELECT ts, path, referrer_host AS referrer, country, city, device, browser FROM page_views
       WHERE ${HUMAN} ORDER BY ts DESC LIMIT 40`),
    first<{ bots: number; ai: number; pdf: number; nf: number }>(db,
      `SELECT SUM(CASE WHEN bot_category != '' THEN 1 ELSE 0 END) AS bots, SUM(CASE WHEN bot_category = 'ai' THEN 1 ELSE 0 END) AS ai,
        SUM(CASE WHEN kind = 'pdf' AND bot_category = '' THEN 1 ELSE 0 END) AS pdf,
        SUM(CASE WHEN ${HUMAN} AND status = 404 THEN 1 ELSE 0 END) AS nf
       FROM page_views WHERE day >= ? AND day <= ?`, from, to),
    all<{ label: string; views: number }>(db,
      `SELECT path AS label, COUNT(*) AS views FROM page_views WHERE day >= ? AND day <= ? AND ${HUMAN} AND status < 400 GROUP BY path`, prevFrom, prevTo),
  ]);

  // Lead funnel: unique visitor-days reaching each step, and the channel of each visitor's first page that day.
  const [steps, channelSteps, ctaPages, topicRows, checkPages] = await Promise.all([
    first<{ seen: number; cta: number; fs: number; sub: number; cs: number; cc: number }>(db,
      `SELECT COUNT(DISTINCT CASE WHEN kind = 'seen' THEN day || visitor END) AS seen,
        COUNT(DISTINCT CASE WHEN kind = 'cta' THEN day || visitor END) AS cta,
        COUNT(DISTINCT CASE WHEN kind = 'form_start' THEN day || visitor END) AS fs,
        COUNT(DISTINCT CASE WHEN kind = 'form_submit' THEN day || visitor END) AS sub,
        COUNT(DISTINCT CASE WHEN kind = 'check_start' THEN day || visitor || path END) AS cs,
        COUNT(DISTINCT CASE WHEN kind = 'check_complete' THEN day || visitor || path END) AS cc
       FROM page_views WHERE day >= ? AND day <= ? AND kind IN ('seen', 'cta', 'form_start', 'form_submit', 'check_start', 'check_complete')`, from, to),
    all<{ referrer_host: string; utm_source: string; utm_medium: string; visitors: number; cta: number; sub: number }>(db,
      `WITH firsts AS (
         SELECT day || visitor AS v, referrer_host, utm_source, utm_medium FROM page_views
         WHERE id IN (SELECT MIN(id) FROM page_views WHERE day >= ? AND day <= ? AND ${HUMAN} GROUP BY day, visitor)),
       steps AS (
         SELECT day || visitor AS v, MAX(kind = 'cta') AS cta, MAX(kind = 'form_submit') AS sub FROM page_views
         WHERE day >= ? AND day <= ? AND kind IN ('cta', 'form_submit') GROUP BY day, visitor)
       SELECT f.referrer_host, f.utm_source, f.utm_medium, COUNT(*) AS visitors,
         SUM(COALESCE(s.cta, 0)) AS cta, SUM(COALESCE(s.sub, 0)) AS sub
       FROM firsts f LEFT JOIN steps s ON s.v = f.v GROUP BY f.referrer_host, f.utm_source, f.utm_medium`, from, to, from, to),
    group(db, "path", from, to, 10, "kind = 'cta'"),
    all<{ source: string; n: number }>(db,
      `SELECT source, COUNT(*) AS n FROM inquiries WHERE substr(created_at, 1, 10) >= ? AND substr(created_at, 1, 10) <= ?
       GROUP BY source ORDER BY n DESC`, from, to).catch(() => []),
    // Completed readiness checks per check page.
    group(db, "path", from, to, 10, "kind = 'check_complete'"),
  ]);
  const funnelMap = new Map<Channel, { visitors: number; cta: number; submits: number }>();
  for (const r of channelSteps) {
    const c = channelOf(r.referrer_host, r.utm_source, r.utm_medium);
    const m = funnelMap.get(c) ?? { visitors: 0, cta: 0, submits: 0 };
    m.visitors += r.visitors; m.cta += r.cta ?? 0; m.submits += r.sub ?? 0;
    funnelMap.set(c, m);
  }
  // The contact form records its topic in the source as ?service=<key>.
  const topicMap = new Map<string, number>();
  for (const r of topicRows) {
    const topic = /[?&]service=([\w-]*)/.exec(r.source ?? "")?.[1] || "(none)";
    topicMap.set(topic, (topicMap.get(topic) ?? 0) + r.n);
  }

  const dayMap = new Map(dailyRows.map(r => [r.day, r]));
  const daily = Array.from({ length: days }, (_, i) => {
    const day = isoDay(new Date(Date.parse(from) + i * 86_400_000));
    const r = dayMap.get(day);
    return { day, views: r?.views ?? 0, visitors: r?.visitors ?? 0, aiBots: r?.aiBots ?? 0, searchBots: r?.searchBots ?? 0 };
  });
  const hours = Array.from({ length: 24 }, (_, h) => hourRows.find(r => r.hour === h)?.views ?? 0);
  const before = new Map(pagesBefore.map(r => [r.label, r.views]));
  const rising = pages
    .map(p => ({ label: p.label, now: p.views, before: before.get(p.label) ?? 0 }))
    .filter(p => p.now >= 3 && p.now >= p.before * 1.5)
    .sort((a, b) => (b.now - b.before) - (a.now - a.before))
    .slice(0, 5);
  const views = cur.views ?? 0;
  const visitors = cur.visitors ?? 0;
  const inquiries = inq.n ?? 0;

  return {
    days, from, to,
    totals: {
      views, visitors,
      pagesPerVisitor: visitors ? views / visitors : 0,
      inquiries,
      conversion: visitors ? inquiries / visitors : 0,
      aiReferrals,
      botHits: botTotals.bots ?? 0,
      aiBotHits: botTotals.ai ?? 0,
      pdfDownloads: botTotals.pdf ?? 0,
      notFound: botTotals.nf ?? 0,
    },
    previous: { views: prev.views ?? 0, visitors: prev.visitors ?? 0, inquiries: prevInq.n ?? 0, aiReferrals: prevAi },
    daily,
    channels: [...channelTotals].map(([channel, v]) => ({ channel, visitors: v })).sort((a, b) => b.visitors - a.visitors),
    pages, entryPages, referrers,
    aiReferrers: referrers.filter(r => AI.test(r.label)),
    campaigns, countries, cities, networks, devices, browsers, systems, languages, hours,
    pdfs: pdfRows.map(r => ({ label: r.title || r.label, views: r.views, visitors: r.visitors })),
    notFound, bots, aiBotPaths, discovery, recent, rising,
    funnel: { visitors, confirmed: steps.seen ?? 0, cta: steps.cta ?? 0, formStart: steps.fs ?? 0, formSubmit: steps.sub ?? 0, inquiries, checkStart: steps.cs ?? 0, checkComplete: steps.cc ?? 0 },
    checkPages: checkPages.map(r => ({ ...r, extra: undefined })),
    funnelChannels: [...funnelMap].map(([channel, m]) => ({ channel, ...m })).sort((a, b) => b.visitors - a.visitors),
    ctaPages: ctaPages.map(r => ({ ...r, extra: undefined })),
    inquiryTopics: [...topicMap].map(([label, views]) => ({ label, views })).sort((a, b) => b.views - a.views),
    hasData: views > 0 || (botTotals.bots ?? 0) > 0,
  };
}
