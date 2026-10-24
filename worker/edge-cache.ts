// Short edge cache for public HTML pages.
//
// Rendering a page on every request costs a Worker render (and sometimes a D1 read) even though public pages
// change only on deploy or when an editor publishes a paper. Each Cloudflare location keeps a copy of a page
// for EDGE_TTL seconds. The cache key includes the Worker version, so a deploy never serves HTML that points
// at the previous build's assets. Without the version binding nothing is cached.
//
// Only plain GET page loads are cached: no query string, no RSC/prefetch requests, no editor or API paths,
// no signed-in editor, and only 200 HTML responses without cookies. Browsers still get the original
// no-store header, so a visitor never keeps a stale copy.

export const EDGE_TTL = 300;

const PRIVATE_PATH = /^\/(api\/|_vinext\/|(en\/insights\/pdf-studio|tr\/icgoruler\/pdf-studyosu)(\/|$)|(en\/insights\/report|tr\/icgoruler\/rapor)\/)/;

export function isCacheablePage(request: Request) {
  if (request.method !== "GET") return false;
  const url = new URL(request.url);
  if (url.search) return false;
  if (!/^\/(en|tr)(\/|$)/.test(url.pathname)) return false;
  if (PRIVATE_PATH.test(url.pathname)) return false;
  if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return false;
  const h = request.headers;
  if (h.get("rsc") || h.get("next-router-prefetch") || h.get("purpose") === "prefetch" || h.get("sec-purpose")?.includes("prefetch")) return false;
  if (h.get("authorization") || h.get("cf-access-jwt-assertion") || /(^|;\s*)CF_Authorization=/.test(h.get("cookie") ?? "")) return false;
  return (h.get("accept") ?? "text/html").includes("text/html");
}

export function isCacheableResponse(response: Response) {
  return response.status === 200
    && (response.headers.get("content-type") ?? "").includes("text/html")
    && !response.headers.has("set-cookie");
}

export function cacheKey(request: Request, version: string) {
  const url = new URL(request.url);
  url.searchParams.set("__v", version);
  return new Request(url.toString(), { method: "GET" });
}

type EdgeCache = { match(key: Request): Promise<Response | undefined>; put(key: Request, response: Response): Promise<void> };

export async function servePage(
  request: Request,
  version: string | undefined,
  cache: EdgeCache | undefined,
  render: () => Promise<Response>,
  waitUntil: (promise: Promise<unknown>) => void,
): Promise<Response> {
  if (!version || !cache || !isCacheablePage(request)) return render();
  const key = cacheKey(request, version);
  const hit = await cache.match(key).catch(() => undefined);
  if (hit) {
    const headers = new Headers(hit.headers);
    headers.set("cache-control", "no-store, must-revalidate");
    headers.set("x-edge-cache", "HIT");
    return new Response(hit.body, { status: hit.status, headers });
  }
  const response = await render();
  if (!isCacheableResponse(response)) return response;
  const stored = new Headers(response.headers);
  stored.set("cache-control", `public, max-age=${EDGE_TTL}`);
  stored.delete("vary"); // the key already limits the copy to a plain HTML page load
  const [forCache, forVisitor] = response.body ? response.body.tee() : [null, null];
  waitUntil(cache.put(key, new Response(forCache, { status: 200, headers: stored })).catch(() => undefined));
  const headers = new Headers(response.headers);
  headers.set("x-edge-cache", "MISS");
  return new Response(forVisitor, { status: response.status, statusText: response.statusText, headers });
}
