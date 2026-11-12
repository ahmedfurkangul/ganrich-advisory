import { insightArticles, insightRouteKeys } from "./content";
import { guideByKey, guideLastmod } from "./guides-content";

/**
 * ISO date used as sitemap lastmod and, where a page already emits it, JSON-LD dateModified.
 *
 * Only pages with an editorial date get one: long-form guides (`date`, or
 * `dateModified` after a body revision) and the legacy insight articles.
 * Solutions, hubs, Decision Lab, notes, legal and similar pages have no real
 * content date in their source, so lastmod is omitted for them (sitemaps.org
 * allows that). Never use the build clock, commit history or a guide's
 * `checked` label here. Add a date for those pages only after their content
 * files gain an `updatedAt` that editors change when the page text changes.
 */
export function routeLastModified(key: string): string | undefined {
  const guide = guideByKey(key);
  if (guide) return guideLastmod(guide);
  const articleIndex = insightRouteKeys.indexOf(key as (typeof insightRouteKeys)[number]);
  if (articleIndex >= 0) return insightArticles.en[articleIndex].date;
  return undefined;
}

