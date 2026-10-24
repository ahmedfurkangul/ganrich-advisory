// First-party, cookieless traffic logging for the analytics dashboard.
//
// Runs after the response is sent (ctx.waitUntil), so it never slows a page down and a logging
// failure never breaks one. Nothing here sets a cookie or stores an IP address or full user agent.

export type TrafficEnv = { DB?: D1Database; ANALYTICS_LOGGING?: string };

type Bot = { name: string; category: "ai" | "search" | "seo" | "social" | "monitor" | "other" };

// Order matters: the first match wins, so specific names come before generic ones.
const BOTS: Array<[RegExp, Bot]> = [
  [/OAI-SearchBot/i, { name: "OAI-SearchBot (ChatGPT search)", category: "ai" }],
  [/ChatGPT-User/i, { name: "ChatGPT-User", category: "ai" }],
  [/GPTBot/i, { name: "GPTBot (OpenAI)", category: "ai" }],
  [/Claude-SearchBot/i, { name: "Claude-SearchBot", category: "ai" }],
  [/Claude-User/i, { name: "Claude-User", category: "ai" }],
  [/ClaudeBot|anthropic-ai/i, { name: "ClaudeBot (Anthropic)", category: "ai" }],
  [/Perplexity-User/i, { name: "Perplexity-User", category: "ai" }],
  [/PerplexityBot/i, { name: "PerplexityBot", category: "ai" }],
  [/Google-Extended|Google-CloudVertexBot|GoogleOther/i, { name: "Google AI (Gemini)", category: "ai" }],
  [/Applebot-Extended/i, { name: "Applebot-Extended", category: "ai" }],
  [/meta-externalagent|meta-externalfetcher|FacebookBot/i, { name: "Meta AI", category: "ai" }],
  [/Bytespider/i, { name: "Bytespider (ByteDance)", category: "ai" }],
  [/CCBot/i, { name: "CCBot (Common Crawl)", category: "ai" }],
  [/MistralAI-User/i, { name: "Mistral", category: "ai" }],
  [/DuckAssistBot/i, { name: "DuckAssistBot", category: "ai" }],
  [/cohere-ai|cohere-training/i, { name: "Cohere", category: "ai" }],
  [/YouBot/i, { name: "You.com", category: "ai" }],
  [/Amazonbot/i, { name: "Amazonbot", category: "ai" }],
  [/Googlebot|Google-InspectionTool|Storebot-Google|AdsBot-Google/i, { name: "Googlebot", category: "search" }],
  [/bingbot|BingPreview|msnbot/i, { name: "Bingbot", category: "search" }],
  [/YandexBot|YandexImages/i, { name: "YandexBot", category: "search" }],
  [/Applebot/i, { name: "Applebot", category: "search" }],
  [/DuckDuckBot/i, { name: "DuckDuckBot", category: "search" }],
  [/Baiduspider/i, { name: "Baiduspider", category: "search" }],
  [/SeznamBot|Qwantbot|Yeti|Sogou|PetalBot|Mojeek/i, { name: "Other search engine", category: "search" }],
  [/AhrefsBot|SemrushBot|MJ12bot|DotBot|rogerbot|Screaming Frog|SEOkicks|BLEXBot|serpstatbot|DataForSeoBot/i, { name: "SEO crawler", category: "seo" }],
  [/LinkedInBot/i, { name: "LinkedIn preview", category: "social" }],
  [/facebookexternalhit|Twitterbot|WhatsApp|TelegramBot|Slackbot|Discordbot|redditbot|Pinterest/i, { name: "Link preview", category: "social" }],
  [/UptimeRobot|Pingdom|StatusCake|Better Uptime|cloudflare-healthchecks/i, { name: "Uptime monitor", category: "monitor" }],
  [/bot\b|crawler|spider|crawl|slurp|headless|python-requests|curl\/|wget|Go-http-client|node-fetch|axios|scrapy|httpx|libwww|Java\//i, { name: "Other automated client", category: "other" }],
];

export function classifyBot(userAgent: string): Bot | null {
  if (!userAgent) return { name: "No user agent", category: "other" };
  for (const [pattern, bot] of BOTS) if (pattern.test(userAgent)) return bot;
  return null;
}

export function deviceInfo(userAgent: string) {
  const device = /iPad|Tablet|Android(?!.*Mobile)/i.test(userAgent) ? "tablet" : /Mobi|iPhone|Android/i.test(userAgent) ? "mobile" : "desktop";
  const browser = /Edg\//.test(userAgent) ? "Edge"
    : /OPR\/|Opera/.test(userAgent) ? "Opera"
    : /SamsungBrowser/.test(userAgent) ? "Samsung Internet"
    : /Firefox\/|FxiOS/.test(userAgent) ? "Firefox"
    : /Chrome\/|CriOS/.test(userAgent) ? "Chrome"
    : /Safari\//.test(userAgent) ? "Safari"
    : "Other";
  const os = /iPhone|iPad|iPod/.test(userAgent) ? "iOS"
    : /Android/.test(userAgent) ? "Android"
    : /Windows/.test(userAgent) ? "Windows"
    : /Mac OS X|Macintosh/.test(userAgent) ? "macOS"
    : /CrOS/.test(userAgent) ? "ChromeOS"
    : /Linux/.test(userAgent) ? "Linux"
    : "Other";
  return { device, browser, os };
}

// Files that are worth counting even though they are not HTML pages.
const DISCOVERY_FILES = /^\/(robots\.txt|llms\.txt|llms-full\.txt|sitemap\.xml|reports-sitemap\.xml|(en|tr)\/feed\.xml)$/;
const PDF_DOCUMENT = /^\/api\/pdf-insights\/[^/]+\/document$/;
const SKIP = /^\/(_vinext|assets|brand|og|people|fonts|favicon|apple-touch|icon|manifest|api\/)/;

/** Decide whether a request is logged, and as what. */
export function trafficKind(request: Request, response: Response): "page" | "file" | "pdf" | null {
  if (request.method !== "GET") return null;
  const { pathname } = new URL(request.url);
  if (PDF_DOCUMENT.test(pathname)) return response.status < 400 ? "pdf" : null;
  if (DISCOVERY_FILES.test(pathname)) return "file";
  if (SKIP.test(pathname) || /\.[a-z0-9]{2,5}$/i.test(pathname)) return null;
  // Editors looking at their own studio or dashboard are not visitors.
  if (/^\/(en\/insights\/pdf-studio|tr\/icgoruler\/pdf-studyosu)/.test(pathname)) return null;
  if (request.headers.get("rsc") || new URL(request.url).searchParams.has("_rsc")) return null;
  if (request.headers.get("purpose") === "prefetch" || request.headers.get("sec-purpose")?.includes("prefetch")) return null;
  const type = response.headers.get("content-type") ?? "";
  return type.includes("text/html") ? "page" : null;
}

function referrerHost(referrer: string | null, ownHost: string) {
  if (!referrer) return "";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
    return host === ownHost.replace(/^www\./, "").toLowerCase() ? "" : host.slice(0, 120);
  } catch {
    return "";
  }
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
}

let cachedSalt: { day: string; salt: string } | null = null;

/** A random salt per UTC day. Older salts are deleted, so yesterday's hashes can never be recomputed. */
async function dailySalt(db: D1Database, day: string) {
  if (cachedSalt?.day === day) return cachedSalt.salt;
  const fresh = [...crypto.getRandomValues(new Uint8Array(24))].map(b => b.toString(16).padStart(2, "0")).join("");
  await db.prepare("INSERT OR IGNORE INTO analytics_salts (day, salt) VALUES (?, ?)").bind(day, fresh).run();
  const row = await db.prepare("SELECT salt FROM analytics_salts WHERE day = ?").bind(day).first<{ salt: string }>();
  await db.prepare("DELETE FROM analytics_salts WHERE day < ?").bind(day).run();
  // Keep 13 months of traffic, enough for a year-on-year comparison.
  const cutoff = new Date(Date.parse(day) - 396 * 86_400_000).toISOString().slice(0, 10);
  await db.prepare("DELETE FROM page_views WHERE day < ?").bind(cutoff).run();
  cachedSalt = { day, salt: row?.salt ?? fresh };
  return cachedSalt.salt;
}

type CfProperties = { country?: string; city?: string; asOrganization?: string };

export async function logTraffic(request: Request, response: Response, env: TrafficEnv, startedAt: number) {
  if (!env?.DB || env.ANALYTICS_LOGGING === "off") return;
  const kind = trafficKind(request, response);
  if (!kind) return;
  const url = new URL(request.url);
  const userAgent = request.headers.get("user-agent") ?? "";
  const bot = classifyBot(userAgent);
  // Only bots are logged for discovery files; people rarely open robots.txt and it would add noise.
  if (kind === "file" && !bot) return;
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const cf = ((request as unknown as { cf?: CfProperties }).cf) ?? {};
  const ip = request.headers.get("cf-connecting-ip") ?? "";
  const visitor = bot ? "" : (await sha256(`${await dailySalt(env.DB, day)}|${ip}|${userAgent}`)).slice(0, 16);
  const { device, browser, os } = bot ? { device: "", browser: "", os: "" } : deviceInfo(userAgent);
  const param = (name: string) => (url.searchParams.get(name) ?? "").slice(0, 80);
  const lang = url.pathname.startsWith("/tr") ? "tr" : url.pathname.startsWith("/en") ? "en" : "";
  await env.DB.prepare(`INSERT INTO page_views
    (ts, day, path, lang, kind, status, referrer_host, utm_source, utm_medium, utm_campaign, country, city, network, device, browser, os, bot_name, bot_category, visitor, duration_ms)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(
    now.toISOString(), day, url.pathname.slice(0, 300), lang, kind, response.status,
    referrerHost(request.headers.get("referer"), url.hostname),
    param("utm_source"), param("utm_medium"), param("utm_campaign"),
    cf.country ?? "", bot ? "" : (cf.city ?? "").slice(0, 80), (cf.asOrganization ?? "").slice(0, 120),
    device, browser, os, bot?.name ?? "", bot?.category ?? "", visitor, Math.max(0, Date.now() - startedAt),
  ).run();
}

// Steps toward a first contact, sent by the page as a beacon. Stored in the same log with the page
// they happened on, so the dashboard can show a funnel. Nothing typed into a form is ever sent.
// "seen" is sent once per page load after the page's JavaScript runs. Most scanners and crawlers never
// run it, so a visitor with a "seen" row that day is a browser-confirmed visitor.
// "check_start" and "check_complete" follow the readiness checks.
export const LEAD_EVENTS = new Set(["seen", "cta", "form_start", "form_submit", "check_start", "check_complete"]);

export async function logLeadEvent(request: Request, env: TrafficEnv) {
  if (!env?.DB || env.ANALYTICS_LOGGING === "off") return;
  const userAgent = request.headers.get("user-agent") ?? "";
  if (classifyBot(userAgent)) return;
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return;
  let payload: { event?: unknown; path?: unknown };
  try {
    payload = JSON.parse((await request.text()).slice(0, 1000));
  } catch {
    return;
  }
  const event = typeof payload.event === "string" ? payload.event : "";
  const path = typeof payload.path === "string" ? payload.path.slice(0, 300) : "";
  if (!LEAD_EVENTS.has(event) || !/^\/(en|tr)(\/|$)/.test(path)) return;
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const ip = request.headers.get("cf-connecting-ip") ?? "";
  const visitor = (await sha256(`${await dailySalt(env.DB, day)}|${ip}|${userAgent}`)).slice(0, 16);
  const { device, browser, os } = deviceInfo(userAgent);
  const cf = ((request as unknown as { cf?: CfProperties }).cf) ?? {};
  await env.DB.prepare(`INSERT INTO page_views (ts, day, path, lang, kind, status, country, device, browser, os, visitor)
    VALUES (?, ?, ?, ?, ?, 200, ?, ?, ?, ?, ?)`).bind(
    now.toISOString(), day, path, path.slice(1, 3), event, cf.country ?? "", device, browser, os, visitor,
  ).run();
}
