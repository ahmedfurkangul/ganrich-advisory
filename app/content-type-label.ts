import type { Lang } from "./content";

// PDF studio stores the content type in English; Turkish pages show it in Turkish.
const tr: Record<string, string> = {
  "Report": "Rapor", "Infographic Series": "İnfografik serisi", "Report Extract": "Rapor özeti", "Executive Briefing": "Yönetici brifingi",
  "Strategic Perspective": "Stratejik perspektif", "Research Paper": "Araştırma makalesi", "Data Note": "Veri notu", "Framework": "Çerçeve",
  "Field Note": "Saha notu", "Regional Outlook": "Bölgesel görünüm", "Annual Outlook": "Yıllık görünüm", "Case Note": "Vaka notu",
  "Presentation": "Sunum", "Archived Publication": "Arşiv yayını", "Other": "Diğer",
};

export function contentTypeLabel(lang: Lang, type: string) {
  return lang === "tr" ? tr[type] ?? type : type;
}
