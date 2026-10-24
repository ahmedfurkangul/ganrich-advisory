import { advisoryRoutes } from './advisory-routes';
import { phaseTwoInsightArticles, phaseTwoInsights } from "./phase-two-insights";

export type Lang = "en" | "tr";

export const expertise = {
  en: [
    ["Growth and Portfolio Strategy", "Make explicit choices about where to play, how to win, and what to stop.", "Where should capital be concentrated?", "Portfolio choices · Growth theses · Resource allocation"],
    ["Market Entry and Regional Expansion", "Prioritize markets, test strategic assumptions, and design a credible route to growth.", "Which markets merit commitment—and in what sequence?", "Market prioritization · Entry model · Expansion roadmap"],
    ["Operating Model and Transformation", "Translate strategy into structure, governance, capabilities, and action.", "What must change for the strategy to become executable?", "Operating model · Governance · Transformation design"],
    ["AI, Data and Digital Strategy", "Focus technology on the decisions, workflows, and capabilities where value is real.", "Where can AI improve decision quality or performance?", "AI value agenda · Data priorities · Responsible adoption"],
    ["Organization and Performance", "Align accountability, talent, metrics, and incentives around strategic priorities.", "What is preventing the organization from acting with clarity?", "Organization design · Performance system · Capabilities"],
    ["Strategic Execution and Program Management", "Mobilize priority programs with clear decisions, disciplined cadence, and transparent value tracking.", "How will activity translate into measurable progress?", "Program mobilization · Decision cadence · Value tracking"],
  ],
  tr: [
    ["Büyüme ve Portföy Stratejisi", "Nerede oynanacağı, nasıl kazanılacağı ve hangi faaliyetlerden vazgeçileceği konusunda net tercihler oluşturun.", "Sermaye hangi alanlarda yoğunlaştırılmalı?", "Portföy tercihleri · Büyüme tezleri · Kaynak tahsisi"],
    ["Pazara Giriş ve Bölgesel Büyüme", "Pazarları önceliklendirin, stratejik varsayımları sınayın ve güvenilir bir büyüme rotası tasarlayın.", "Hangi pazarlar, hangi sırayla yatırım kararı gerektiriyor?", "Pazar önceliklendirme · Giriş modeli · Büyüme yol haritası"],
    ["İşletim Modeli ve Dönüşüm", "Stratejiyi yapıya, yönetişime, yetkinliklere ve uygulamaya dönüştürün.", "Stratejinin uygulanabilir hâle gelmesi için ne değişmeli?", "İşletim modeli · Yönetişim · Dönüşüm tasarımı"],
    ["Yapay Zekâ, Veri ve Dijital Strateji", "Teknolojiyi, gerçek değer yaratan karar, iş akışı ve yetkinliklere odaklayın.", "Yapay zekâ karar kalitesini veya performansı nerede geliştirebilir?", "Yapay zekâ değer gündemi · Veri öncelikleri · Sorumlu benimseme"],
    ["Organizasyon ve Performans", "Yetki ve sorumlulukları, yetenekleri, ölçümleri ve teşvikleri stratejik öncelikler etrafında uyumlayın.", "Organizasyonun net biçimde harekete geçmesini ne engelliyor?", "Organizasyon tasarımı · Performans sistemi · Yetkinlikler"],
    ["Stratejik Uygulama ve Program Yönetimi", "Öncelikli programları net karar mekanizmaları, disiplinli çalışma ritmi ve şeffaf değer takibiyle harekete geçirin.", "Faaliyet nasıl ölçülebilir ilerlemeye dönüşecek?", "Program mobilizasyonu · Karar ritmi · Değer takibi"],
  ],
} as const;

export const markets = {
  en: [
    ["Türkiye", "Growth choices, operating-model resilience, family-business evolution, and value-led transformation."],
    ["Middle East and North Africa", "Market-specific expansion, institutional capability, portfolio priorities, and execution across distinct subregions."],
    ["Europe", "Cross-border growth, operating-model alignment, productivity, and responsible AI adoption."],
    ["Africa", "Country- and corridor-specific growth, operating readiness, partnership models, and execution discipline."],
  ],
  tr: [
    ["Türkiye", "Büyüme tercihleri, dayanıklı işletim modelleri, aile şirketlerinde dönüşüm ve değer odaklı uygulama."],
    ["Orta Doğu ve Kuzey Afrika", "Farklı alt bölgelerde pazara özgü büyüme, kurumsal yetkinlik, portföy öncelikleri ve uygulama."],
    ["Avrupa", "Sınır ötesi büyüme, işletim modeli uyumu, verimlilik ve sorumlu yapay zekâ kullanımı."],
    ["Afrika", "Ülke ve koridor bazlı büyüme, operasyonel hazırlık, iş birliği modelleri ve uygulama disiplini."],
  ],
} as const;

export type InsightArticle = {
  slug: string;
  type: string;
  title: string;
  thesis: string;
  applicability: string;
  author: string;
  date: string;
  dateLabel: string;
  readingTime: string;
  region: string;
  topic: string;
  findings: Array<[string, string]>;
  analysis: string[];
  implications: string[];
  framework: string[];
  frameworkTitle: string;
  counterargument: string;
  weakeningEvidence: string;
  source: string;
  sections: Array<{ title: string; paragraphs: string[] }>;
  boardQuestions: string[];
  relatedTool: "decisionFramer" | "marketCompass" | "decisionAtlas";
  relatedToolLabel: string;
  sources: Array<{ label: string; url?: string; note: string }>;
  methodology: string;
  dataPeriod: string;
  confidence: string;
};

export const insights = phaseTwoInsights;
export const insightArticles: Record<Lang, InsightArticle[]> = phaseTwoInsightArticles;

export type InsightCategoryKey =
  | "categoryAppliedAi"
  | "categoryTransformation"
  | "categoryGrowth"
  | "categoryRegionalExpansion"
  | "categoryOperatingModel";

export type InsightCategory = {
  key: InsightCategoryKey;
  label: string;
  description: string;
  topic: string;
};

export const insightCategories: Record<Lang, InsightCategory[]> = {
  en: [
    { key: "categoryAppliedAi", label: "Applied AI", description: "Decision-led perspectives on AI value, evidence, operating readiness, and accountable adoption.", topic: "Applied AI" },
    { key: "categoryTransformation", label: "Transformation", description: "Perspectives on moving transformation from reported activity to governed, measurable value.", topic: "Transformation" },
    { key: "categoryGrowth", label: "Growth", description: "Frameworks for growth choices, commitment sequencing, capital concentration, and strategic learning.", topic: "Growth" },
    { key: "categoryRegionalExpansion", label: "Regional expansion", description: "Context-specific perspectives on cross-border growth, market entry, and regional economic corridors.", topic: "Regional expansion" },
    { key: "categoryOperatingModel", label: "Operating model", description: "Perspectives on decision rights, governance, accountability, and organizational transition.", topic: "Operating model" },
  ],
  tr: [
    { key: "categoryAppliedAi", label: "Uygulamalı Yapay Zekâ", description: "Yapay zekâ değeri, kanıt, kurumsal hazırlık ve sorumlu benimseme üzerine karar odaklı bakışlar.", topic: "Uygulamalı Yapay Zekâ" },
    { key: "categoryTransformation", label: "Dönüşüm", description: "Dönüşümü raporlanan faaliyetten yönetilen ve ölçülebilir değere taşıyan bakışlar.", topic: "Dönüşüm" },
    { key: "categoryGrowth", label: "Büyüme", description: "Büyüme tercihleri, taahhüt sıralaması, sermaye yoğunlaşması ve stratejik öğrenme çerçeveleri.", topic: "Büyüme" },
    { key: "categoryRegionalExpansion", label: "Bölgesel büyüme", description: "Sınır ötesi büyüme, pazara giriş ve bölgesel ekonomik koridorlara ilişkin bağlama özgü bakışlar.", topic: "Bölgesel büyüme" },
    { key: "categoryOperatingModel", label: "İşletim modeli", description: "Karar hakları, yönetişim, hesap verebilirlik ve kurumsal geçiş üzerine bakışlar.", topic: "İşletim modeli" },
  ],
};

export const routeMap: Record<Lang, Record<string, string>> = {
  en: {
    ...advisoryRoutes.en,
    expertise: "expertise",
    markets: "markets",
    insights: "insights",
    decisionLab: "decision-lab",
    decisionAtlas: "decision-lab/decision-atlas",
    decisionFramer: "decision-lab/decision-framer",
    marketCompass: "decision-lab/market-entry-compass",
    boardBriefBuilder: "decision-lab/board-brief-builder",
    aiValueLens: "decision-lab/ai-value-lens",
    cbamCheck: "decision-lab/cbam-readiness-check",
    craCheck: "decision-lab/cra-readiness-check",
    eudrCheck: "decision-lab/eudr-readiness-check",
    decisionLabChangelog: "decision-lab/changelog",
    privateBriefing: "private-executive-briefing",
    about: "about",
    contact: "contact",
    privacyCenter: "privacy-center",
    privacy: "privacy",
    cookies: "cookies",
    cookiePreferences: "cookie-preferences",
    dataRights: "data-rights",
    aiTransparency: "ai-transparency",
    legal: "legal",
    terms: "terms",
    vendors: "vendors",
    policyUpdates: "policy-updates",
    kvkk: "turkiye-data-protection-notice",
    article: "insights/decision-quality-applied-ai",
    articleTransformation: "insights/transformation-activity-to-value",
    articleMarketEntry: "insights/market-entry-sequence-of-commitments",
    articleCorridor: "insights/turkiye-gulf-capital-corridor",
    articleFamilyHoldings: "insights/family-holdings-operating-model-transition",
    articleIndustrialAi: "insights/ai-value-mid-market-industrials",
    categoryAppliedAi: "insights/category/applied-ai",
    categoryTransformation: "insights/category/transformation",
    categoryGrowth: "insights/category/growth",
    categoryRegionalExpansion: "insights/category/regional-expansion",
    categoryOperatingModel: "insights/category/operating-model",
  },
  tr: {
    ...advisoryRoutes.tr,
    expertise: "uzmanlik",
    markets: "cografyalar",
    insights: "icgoruler",
    decisionLab: "karar-laboratuvari",
    decisionAtlas: "karar-laboratuvari/karar-atlasi",
    decisionFramer: "karar-laboratuvari/karar-cerceveleyici",
    marketCompass: "karar-laboratuvari/pazara-giris-pusulasi",
    boardBriefBuilder: "karar-laboratuvari/yonetim-kurulu-brifingi",
    aiValueLens: "karar-laboratuvari/yapay-zeka-deger-mercegi",
    cbamCheck: "karar-laboratuvari/cbam-hazirlik-testi",
    craCheck: "karar-laboratuvari/cra-hazirlik-testi",
    eudrCheck: "karar-laboratuvari/eudr-hazirlik-testi",
    decisionLabChangelog: "karar-laboratuvari/degisiklik-gunlugu",
    privateBriefing: "ozel-yonetici-brifingi",
    about: "hakkimizda",
    contact: "iletisim",
    privacyCenter: "gizlilik-merkezi",
    privacy: "gizlilik",
    cookies: "cerezler",
    cookiePreferences: "cerez-tercihleri",
    dataRights: "ilgili-kisi-basvurusu",
    aiTransparency: "yapay-zeka-seffafligi",
    legal: "yasal-bilgilendirme",
    terms: "kullanim-kosullari",
    vendors: "hizmet-saglayicilar",
    policyUpdates: "politika-guncellemeleri",
    kvkk: "kvkk-aydinlatma-metni",
    article: "icgoruler/uygulamali-yapay-zeka-karar-kalitesi",
    articleTransformation: "icgoruler/donusum-faaliyetinden-degere",
    articleMarketEntry: "icgoruler/pazara-giris-taahhutler-dizisidir",
    articleCorridor: "icgoruler/turkiye-korfez-sermaye-koridoru",
    articleFamilyHoldings: "icgoruler/aile-holdingleri-isletim-modeli-gecisi",
    articleIndustrialAi: "icgoruler/orta-olcekli-sanayide-yapay-zeka-degeri",
    categoryAppliedAi: "icgoruler/kategori/uygulamali-yapay-zeka",
    categoryTransformation: "icgoruler/kategori/donusum",
    categoryGrowth: "icgoruler/kategori/buyume",
    categoryRegionalExpansion: "icgoruler/kategori/bolgesel-buyume",
    categoryOperatingModel: "icgoruler/kategori/isletim-modeli",
  },
};

const insightRouteKeys = [
  "article",
  "articleTransformation",
  "articleMarketEntry",
  "articleCorridor",
  "articleFamilyHoldings",
  "articleIndustrialAi",
] as const;

export function insightHref(lang: Lang, index: number) {
  return `/${lang}/${routeMap[lang][insightRouteKeys[index] ?? insightRouteKeys[0]]}`;
}

export function insightIndex(kind: string) {
  const index = insightRouteKeys.indexOf(kind as (typeof insightRouteKeys)[number]);
  return index < 0 ? 0 : index;
}

export function insightCategoryForKind(lang: Lang, kind: string) {
  return insightCategories[lang].find((category) => category.key === kind);
}

export function pageKind(lang: Lang, route: string) {
  if (!route) return "home";
  const hit = Object.entries(routeMap[lang]).find(([, value]) => value === route);
  return hit?.[0] ?? "notFound";
}

export function switchHref(lang: Lang, route: string) {
  const next: Lang = lang === "en" ? "tr" : "en";
  const kind = pageKind(lang, route);
  return `/${next}${kind === "home" || kind === "notFound" ? "" : `/${routeMap[next][kind]}`}`;
}
