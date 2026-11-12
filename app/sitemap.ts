import type { MetadataRoute } from "next";
import { isServicePageKey } from "./service-page-index";
import { Lang, routeMap } from "./content";
import { pathLastModified } from "./content-updated";
import { absoluteUrl } from "./site-config";

// Redirected addresses stay out of the sitemap.
const redirected = new Set(["serviceAI", "expertise", "markets", "privateBriefing", "privacyCenter", "cookies", "vendors", "dataRights", "policyUpdates", "terms", "aiTransparency"]);
// Opportunity Studio is noindex and unlinked since the AI positioning brief (Ganrich does not build or run AI for clients).
redirected.add("studio");
// Cookie preferences is a noindex utility page; listing it in the sitemap sends Google a contradictory signal.
redirected.add("cookiePreferences");

/** Public route keys, in sitemap order. Category pages are noindex, so they stay out. */
export function sitemapRouteKeys(): string[] {
  return ["home", ...Object.keys(routeMap.en).filter(key => !redirected.has(key) && !key.startsWith("category"))];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Lang[] = ["en", "tr"];
  const routeKeys = sitemapRouteKeys();
  return routeKeys.flatMap((key) => languages.map((lang) => {
    const route = key === "home" ? "" : routeMap[lang][key];
    const path = `/${lang}${route ? `/${route}` : ""}`;
    const other: Lang = lang === "en" ? "tr" : "en";
    const otherRoute = key === "home" ? "" : routeMap[other][key];
    const isArticle = key.startsWith("article");
    const isCategory = key.startsWith("category");
    const isOffering = key === "solutions" || key.startsWith("solution") || key.startsWith("service") || key === "aiDecisions" || isServicePageKey(key) || key === "expertise";
    return {
      url: absoluteUrl(path),
      lastModified: pathLastModified(key, path),
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
