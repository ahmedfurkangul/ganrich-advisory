import { insightArticles, insightRouteKeys } from "./content";
import { SITEMAP_LASTMOD_EXCLUSIONS, updatedAt } from "./content-dates";
import { guideByKey, guideLastmod } from "./guides-content";

export { SITEMAP_LASTMOD_EXCLUSIONS, updatedAt };

/** ISO date used as sitemap lastmod and, where a page already emits it, JSON-LD dateModified. */
export function routeLastModified(key: string): string | undefined {
  const guide = guideByKey(key);
  if (guide) return guideLastmod(guide);
  const articleIndex = insightRouteKeys.indexOf(key as (typeof insightRouteKeys)[number]);
  if (articleIndex >= 0) return insightArticles.en[articleIndex].date;
  return (updatedAt as Record<string, string | undefined>)[key];
}

export function pathLastModified(key: string, path: string): string | undefined {
  if (SITEMAP_LASTMOD_EXCLUSIONS.includes(path)) return undefined;
  return routeLastModified(key);
}
