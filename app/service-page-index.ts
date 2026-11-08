import type { Lang } from "./content";

// Light index of the service model pages: keys, titles and taglines only, so client components
// (Solutions hub, contact form) can list them without bundling the full page copy.
export const SERVICE_PAGE_KEYS = ["buyerDesk", "toolSelection", "incentiveFile", "cohortProgramme", "marketAccessDirector"] as const;
export type ServicePageKey = typeof SERVICE_PAGE_KEYS[number];
export const isServicePageKey = (key: string): key is ServicePageKey => (SERVICE_PAGE_KEYS as readonly string[]).includes(key);

export const SERVICE_PAGE_TITLES: Record<ServicePageKey, Record<Lang, string>> = {
  buyerDesk: { en: "EU Buyer Request Desk", tr: "AB Alıcı Talep Masası" },
  toolSelection: { en: "Tool and Verifier Selection", tr: "Yazılım ve Doğrulayıcı Seçimi" },
  incentiveFile: { en: "Incentive and Finance File", tr: "Teşvik ve Finansman Dosyası" },
  cohortProgramme: { en: "Exporter Cohort Programme", tr: "İhracatçı Kohort Programı" },
  marketAccessDirector: { en: "Part-time EU Market Access Director", tr: "Yarı Zamanlı AB Pazar Erişimi Direktörü" },
};

export const SERVICE_PAGE_TAGLINES: Record<ServicePageKey, Record<Lang, string>> = {
  buyerDesk: { en: "One independent desk that sorts every EU buyer request, decides the answer with you and keeps answers consistent.", tr: "Her AB alıcı talebini sınıflandıran, yanıta sizinle karar veren ve yanıtları tutarlı tutan bağımsız bir masa." },
  toolSelection: { en: "A short, vendor-neutral sprint to choose compliance software or a verifier, or to learn you do not need one yet.", tr: "Uyum yazılımı veya doğrulayıcı seçmek ya da henüz gerekmediğini görmek için kısa ve tarafsız bir çalışma." },
  incentiveFile: { en: "Turn the EU compliance work you must do anyway into a credible application for public support or green finance.", tr: "Zaten yapmanız gereken AB uyum çalışmasını kamu desteği veya yeşil finansman için güçlü bir başvuruya dönüştürün." },
  cohortProgramme: { en: "A group programme with an exporter association, industrial zone or chamber: shared sessions, company-by-company decisions.", tr: "İhracatçı birliği, OSB veya oda ile grup programı: ortak oturumlar, şirket bazında kararlar." },
  marketAccessDirector: { en: "Senior ownership of EU rules and buyer requirements for a few days a month, without a full-time hire.", tr: "Tam zamanlı işe alım yapmadan, ayda birkaç gün AB kuralları ve alıcı talepleri için üst düzey sahiplik." },
};

export const servicePageTitle = (lang: Lang, key: string) => isServicePageKey(key) ? SERVICE_PAGE_TITLES[key][lang] : undefined;
