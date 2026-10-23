/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { logTraffic } from "./traffic";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  DOCUMENTS: R2Bucket;
  EDITOR_AUTH?: string;
  ANALYTICS_LOGGING?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

// Identity headers that only ChatGPT Sites hosting may set. Anywhere else a
// client could send them, so they are dropped before the app sees the request.
const SITES_IDENTITY_HEADERS = [
  "oai-authenticated-user-email",
  "oai-authenticated-user-full-name",
  "oai-authenticated-user-full-name-encoding",
];

function withoutUntrustedIdentity(request: Request, env: Env): Request {
  if (env?.EDITOR_AUTH === "sites") return request;
  if (!SITES_IDENTITY_HEADERS.some(name => request.headers.has(name))) return request;
  const headers = new Headers(request.headers);
  for (const name of SITES_IDENTITY_HEADERS) headers.delete(name);
  return new Request(request, { headers });
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    const startedAt = Date.now();
    const response = await handler.fetch(withoutUntrustedIdentity(request, env), env, ctx);
    ctx.waitUntil(logTraffic(request, response, env, startedAt).catch(() => undefined));
    return response;
  },
};

export default worker;
