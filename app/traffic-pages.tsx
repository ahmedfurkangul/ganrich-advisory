import type { Metadata } from "next";
import { trafficReport } from "../db/traffic";
import { routeMap, type Lang } from "./content";
import { requireEditor } from "./editor-auth";
import { SiteLayout } from "./site";
import { TrafficDashboard } from "./traffic-dashboard";

export const trafficPaths: Record<Lang, { self: string; studio: string }> = {
  en: { self: "/en/insights/pdf-studio/analytics", studio: "/en/insights/pdf-studio" },
  tr: { self: "/tr/icgoruler/pdf-studyosu/analitik", studio: "/tr/icgoruler/pdf-studyosu" },
};

export function trafficMetadata(lang: Lang): Metadata {
  return {
    title: lang === "en" ? "Traffic and analysis | Ganrich Advisory" : "Trafik ve analiz | Ganrich Advisory",
    robots: { index: false, follow: false, noarchive: true },
  };
}

export async function TrafficRoute({ lang, days }: { lang: Lang; days?: string }) {
  await requireEditor();
  const range = [7, 30, 90, 365].includes(Number(days)) ? Number(days) : 30;
  const report = await trafficReport(range);
  return <SiteLayout lang={lang} route={routeMap[lang].insights}>
    <TrafficDashboard lang={lang} report={report} selfHref={trafficPaths[lang].self} studioHref={trafficPaths[lang].studio}/>
  </SiteLayout>;
}
