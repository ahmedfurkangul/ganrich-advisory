// Light map from a programme to its rule hub, for client components. Full hub content is in rule-hubs-content.ts.
export const hubBySolution: Record<string, string> = { solutionCbam: "hubCbam", solutionCra: "hubCra", solutionEudr: "hubEudr", solutionTrEts: "hubTrEts", solutionPackaging: "hubPpwr", solutionSupplierData: "hubSupplierData" };
export const hubLabel = { en: "Everything on this rule in one place", tr: "Bu kural hakkında her şey tek sayfada" } as const;

// The hubs listed on the Insights page, in the order buyers ask about them.
export const hubStrip = {
  en: { title: "EU rules, one page each", items: [
    { key: "hubCbam", name: "CBAM", line: "Emissions data your EU importer must declare" },
    { key: "hubEudr", name: "EUDR", line: "Deforestation-free proof from 30 December 2026" },
    { key: "hubCra", name: "Cyber Resilience Act", line: "Vulnerability reporting and the road to 2027" },
    { key: "hubTrEts", name: "Türkiye ETS", line: "Pilot dates, the İKS account and the CBAM link" },
    { key: "hubPpwr", name: "PPWR", line: "The packaging file EU buyers ask for" },
    { key: "hubSupplierData", name: "Supplier data", line: "What the Omnibus cap lets buyers ask" },
  ] },
  tr: { title: "AB kuralları, her biri tek sayfada", items: [
    { key: "hubCbam", name: "SKDM (CBAM)", line: "AB ithalatçınızın beyan edeceği emisyon verisi" },
    { key: "hubEudr", name: "EUDR", line: "30 Aralık 2026'dan itibaren ormansızlaşma kanıtı" },
    { key: "hubCra", name: "Siber Dayanıklılık Yasası", line: "Açık bildirimi ve 2027'ye giden yol" },
    { key: "hubTrEts", name: "Türkiye ETS", line: "Pilot tarihleri, İKS hesabı ve SKDM bağlantısı" },
    { key: "hubPpwr", name: "PPWR", line: "AB alıcılarının istediği ambalaj dosyası" },
    { key: "hubSupplierData", name: "Tedarikçi verisi", line: "Omnibus sınırına göre alıcı ne isteyebilir" },
  ] },
} as const;
