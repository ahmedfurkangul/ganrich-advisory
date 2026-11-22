import type { Lang } from "./content";

// The homepage lists the published whitepapers without importing the full solutions catalogue,
// which keeps the homepage JavaScript inside its budget. A test checks these match solutions-content.ts.
export const homePapers: Record<Lang, { key: string; title: string; slug: string }[]> = {
  en: [
    { key: "solutionCbam", title: "Actual or default? The CBAM data decision for Turkish metal exporters", slug: "cbam-actual-or-default-e9f664d8" },
    { key: "solutionCra", title: "The 24-hour test: CRA incident readiness for manufacturers selling into the EU", slug: "cra-the-24-hour-test-96989394" },
  ],
  tr: [
    { key: "solutionCbam", title: "Gerçek emisyon mu, varsayılan değer mi? Türk metal ihracatçıları için SKDM veri kararı", slug: "cbam-gercek-mi-varsayilan-mi-ef31215c" },
    { key: "solutionCra", title: "24 saat testi: AB’ye satış yapan üreticiler için CRA olay hazırlığı", slug: "cra-24-saat-testi-37aca9ad" },
  ],
};
