/**
 * Revision dates for public pages that do not already carry an editorial date.
 *
 * Each value is a real UTC calendar date (YYYY-MM-DD), never the build clock.
 * Recorded on 12 November 2026 against repository history through 7290e82.
 * This file has no runtime imports so tests can load it directly.
 *
 * Method:
 * 1. Tie each route key to the source that holds its visible copy: the content
 *    object in both languages, its on-page FAQ and topic tags, sentence-level
 *    prose in the page component, and the title plus meta description in
 *    `app/[lang]/[[...slug]]/page.tsx`.
 * 2. `git blame -w` (whitespace ignored) gives the committer timestamp of the
 *    last commit that touched each of those lines. Lines that are only
 *    punctuation are ignored. The page date is the UTC calendar day of the
 *    newest remaining line.
 * 3. Listing pages use the newer of their own copy and the newest item they
 *    list. Home uses the homepage copy, the whitepaper titles in
 *    `home-content.ts`, and the rules the homepage timeline actually shows.
 *    Solutions uses the programme catalogue. Insights uses the articles, notes
 *    and guides. Decision Lab uses its tool pages.
 * 4. History in this repository begins with the 22 October 2026 import
 *    (2330f5eb, "Import Ganrich Advisory site source"). Pages whose copy has
 *    not changed since that import are dated 2026-10-22.
 * 5. Guides are not listed here. Sitemap lastmod uses `date` on the guide, or
 *    `dateModified` when a later commit changed the guide body. The `checked`
 *    label is a source-review date and is not a content date.
 * 6. Legacy articles are not listed here. Their text has not been revised
 *    since the publication date they record (24 July 2026), so lastmod stays
 *    that editorial date. The only later commit that touches the file is the
 *    sitewide Turkish spelling of the founder's name (24 October 2026); that
 *    is not treated as a revision of the articles.
 * 7. When a page's copy cannot be tied to a commit, add both language
 *    pathnames to `SITEMAP_LASTMOD_EXCLUSIONS` (for example `/en/about` and
 *    `/tr/hakkimizda`) and leave lastmod unset. The list is empty: every
 *    indexed static page has a date.
 */
export const updatedAt = {
  // Listing pages: newest of the page's own copy and the items it lists.
  home: "2026-11-09", // homepage whitepaper titles, home-content.ts
  solutions: "2026-11-09", // SKDM (CBAM) Veri Hazırlığı programme copy
  insights: "2026-11-11", // Green Deal guide
  decisionLab: "2026-11-10", // EU Rule Scope Scanner
  about: "2026-11-08",
  contact: "2026-11-01",
  sampleWork: "2026-11-03",
  newsletter: "2026-11-09",
  regulationCalendar: "2026-11-01",
  privacy: "2026-11-09",
  kvkk: "2026-11-09",
  legal: "2026-11-09",
  aiDecisions: "2026-11-04",
  serviceMarket: "2026-10-22",
  serviceOperating: "2026-10-22",
  buyerDesk: "2026-11-09",
  toolSelection: "2026-11-09",
  incentiveFile: "2026-11-09",
  cohortProgramme: "2026-11-09",
  marketAccessDirector: "2026-11-09",
  decisionAtlas: "2026-10-25",
  decisionFramer: "2026-10-22",
  marketCompass: "2026-10-22",
  boardBriefBuilder: "2026-10-25",
  aiValueLens: "2026-10-22",
  cbamCheck: "2026-11-09",
  craCheck: "2026-10-25",
  eudrCheck: "2026-10-25",
  scopeScanner: "2026-11-10",
  decisionLabChangelog: "2026-10-22",
  solutionCbam: "2026-11-09",
  solutionCra: "2026-11-01",
  solutionEudr: "2026-11-01",
  solutionPfas: "2026-10-23",
  solutionEexport: "2026-10-23",
  solutionAccessibility: "2026-10-23",
  solutionMachinery: "2026-10-24",
  solutionPackaging: "2026-10-24",
  solutionBattery: "2026-10-24",
  solutionForcedLabour: "2026-11-01",
  solutionCpr: "2026-10-25",
  solutionTextiles: "2026-11-01",
  solutionNis2: "2026-10-25",
  solutionMdr: "2026-10-25",
  solutionSupplierData: "2026-10-25",
  solutionTrEts: "2026-11-01",
  solutionEnergy: "2026-10-23",
  solutionStorage: "2026-10-23",
  solutionWater: "2026-10-23",
  solutionOrderDesk: "2026-11-04",
  solutionMargin: "2026-10-23",
  noteEntry: "2026-10-22",
  noteFounder: "2026-10-22",
  noteAI: "2026-10-22",
  noteValue: "2026-10-22",
} as const;

export type UpdatedPageKey = keyof typeof updatedAt;

/**
 * Sitemap pathnames with no defensible content date. Lastmod is omitted for
 * these URLs. Include both languages. Empty because every indexed static page
 * has a date under the method above.
 */
export const SITEMAP_LASTMOD_EXCLUSIONS: readonly string[] = [];
