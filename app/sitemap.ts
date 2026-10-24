import type { MetadataRoute } from "next";
import { insightArticles, Lang, routeMap } from "./content";
import { absoluteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Lang[] = ["en", "tr"];
  // Redirected addresses stay out of the sitemap.
  const redirected = new Set(["expertise", "markets", "privateBriefing"]);
  // Category pages are noindex (see page metadata), so they stay out as well.
  const routeKeys = ["home", ...Object.keys(routeMap.en).filter(key => !redirected.has(key) && !key.startsWith("category"))];
  return routeKeys.flatMap((key) => languages.map((lang) => {
    const route = key === "home" ? "" : routeMap[lang][key];
    const path = `/${lang}${route ? `/${route}` : ""}`;
    const other: Lang = lang === "en" ? "tr" : "en";
    const otherRoute = key === "home" ? "" : routeMap[other][key];
    const isArticle = key.startsWith("article");
    const isCategory = key.startsWith("category");
    const isOffering = key === "solutions" || key.startsWith("solution") || key.startsWith("service") || key === "expertise";
    const articleIndex = ["article", "articleTransformation", "articleMarketEntry", "articleCorridor", "articleFamilyHoldings", "articleIndustrialAi"].indexOf(key);
    return {
      url: absoluteUrl(path),
      lastModified: isArticle && articleIndex >= 0 ? insightArticles[lang][articleIndex].date : undefined,
      changeFrequency: isArticle || isCategory || key === "insights" || key === "solutions" ? "weekly" as const : "monthly" as const,
      priority: key === "home" ? 1 : isOffering || isArticle ? .8 : isCategory || key === "insights" ? .75 : .7,
      alternates: {
        languages: {
          en: absoluteUrl(lang === "en" ? path : `/${other}${otherRoute ? `/${otherRoute}` : ""}`),
          tr: absoluteUrl(lang === "tr" ? path : `/${other}${otherRoute ? `/${otherRoute}` : ""}`),
        },
      },
    };
  }));
}
