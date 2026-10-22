import { renderInsightFeed } from "../rss";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(await renderInsightFeed("en"), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=21600",
    },
  });
}
