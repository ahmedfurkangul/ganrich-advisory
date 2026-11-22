// The bare domain sends people to the language their browser asks for: Turkish when the
// Accept-Language header ranks Turkish above English, English otherwise (also for crawlers,
// which usually send no header). Both language versions stay indexable through hreflang, and
// x-default remains /en.

export function preferredLang(acceptLanguage: string | null): "tr" | "en" {
  if (!acceptLanguage) return "en";
  let tr = 0;
  let en = 0;
  for (const part of acceptLanguage.split(",")) {
    const [tag, ...params] = part.trim().toLowerCase().split(";");
    const qParam = params.map(p => p.trim()).find(p => p.startsWith("q="));
    const q = qParam ? Number(qParam.slice(2)) : 1;
    if (!Number.isFinite(q) || q <= 0) continue;
    const base = tag.split("-")[0];
    if (base === "tr") tr = Math.max(tr, q);
    else if (base === "en") en = Math.max(en, q);
  }
  return tr > en ? "tr" : "en";
}

export function rootRedirect(request: Request): Response {
  const url = new URL(request.url);
  const lang = preferredLang(request.headers.get("accept-language"));
  return new Response(null, {
    status: 302,
    headers: {
      location: `${url.origin}/${lang}${url.search}`,
      vary: "Accept-Language",
      "cache-control": "private, no-store",
    },
  });
}
