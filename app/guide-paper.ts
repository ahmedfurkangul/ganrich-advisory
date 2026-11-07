import type { Lang } from "./content";
import { solutions } from "./solutions-content";

// The PDF whitepaper of a guide's programme, if it has one (same report routes as the solution pages).
export function solutionPaperPath(lang: Lang, solution: string) {
  const paper = solutions[lang].find(s => s.key === solution)?.paper;
  return paper ? (lang === "tr" ? `/tr/icgoruler/rapor/${paper.slug}` : `/en/insights/report/${paper.slug}`) : undefined;
}
