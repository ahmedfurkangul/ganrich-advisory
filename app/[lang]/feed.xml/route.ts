import { renderInsightFeed } from "../../rss";

type Context = { params: Promise<{ lang: string }> };

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: Context) {
  const { lang } = await params;
  return new Response(await renderInsightFeed(lang === "tr" ? "tr" : "en"), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=21600",
    },
  });
}
