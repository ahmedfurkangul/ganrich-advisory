import type { Lang } from "./content";

/*
 * Lightweight practice data shared by client components (header, footer, contact form, search).
 * Full engagement scope lives in practice-content.ts and is rendered on the server.
 */

export type EngagementKey = "serviceMarketEntry" | "serviceOperatingModel" | "serviceAiValue";

export type EngagementSummary = { key: EngagementKey; index: string; name: string; short: string; contactPrompt: string };

export const engagementSummaries: Record<Lang, EngagementSummary[]> = {
  en: [
    { key: "serviceMarketEntry", index: "01", name: "Market Entry Decision Sprint", short: "Decide where to expand beyond Türkiye, through which model, and how much to commit before the evidence is in.", contactPrompt: "Discuss a market-entry decision" },
    { key: "serviceOperatingModel", index: "02", name: "Operating Model Review", short: "Make clear who decides what as the business outgrows the way it was founded.", contactPrompt: "Discuss an operating-model question" },
    { key: "serviceAiValue", index: "03", name: "AI Value Diagnostic", short: "Find the few operating decisions and workflows where AI would create measurable value, and what must be true first.", contactPrompt: "Discuss an AI value question" },
  ],
  tr: [
    { key: "serviceMarketEntry", index: "01", name: "Pazara Giriş Karar Sprinti", short: "Türkiye dışında nereye, hangi modelle açılacağınıza ve kanıt oluşmadan ne kadar taahhüt vereceğinize karar verin.", contactPrompt: "Bir pazara giriş kararını konuşalım" },
    { key: "serviceOperatingModel", index: "02", name: "İşletim Modeli İncelemesi", short: "Şirket kuruluş biçiminin ötesine geçerken hangi kararı kimin vereceğini netleştirin.", contactPrompt: "Bir işletim modeli sorusunu konuşalım" },
    { key: "serviceAiValue", index: "03", name: "Yapay Zekâ Değer Teşhisi", short: "Yapay zekânın ölçülebilir değer yaratacağı birkaç işletim kararını ve iş akışını, önce neyin doğru olması gerektiğiyle birlikte bulun.", contactPrompt: "Bir yapay zekâ değer sorusunu konuşalım" },
  ],
};

export function engagementSummary(lang: Lang, key: string) {
  const found = engagementSummaries[lang].find((item) => item.key === key);
  if (!found) throw new Error(`Unknown engagement ${key}`);
  return found;
}

/* Verified founder facts only. Source: existing About page and LAUNCH-READINESS.md. */
export const founder = {
  name: "Ahmed Furkan Gul",
  linkedin: "https://www.linkedin.com/in/furkangul/",
  academic: "https://avesis.kent.edu.tr/ahmedfurkan.gul",
  email: "furkangul@ganrichadvisory.com",
  portrait: { webp: "/people/ahmed-furkan-gul.webp", jpg: "/people/ahmed-furkan-gul.jpg", width: 900, height: 1125 },
  en: {
    role: "Founder, Ganrich Advisory · Istanbul, Türkiye",
    short: "Ahmed Furkan Gul founded Ganrich Advisory and leads every engagement personally. His work sits where corporate strategy, business development and the study of strategic decision-making meet.",
    facts: [
      ["Corporate practice", "Served as Chief Strategy and Business Development Officer at Tay Group. This experience was gained in an executive role, not through Ganrich client engagements."],
      ["Decision research", "Research at Yeditepe University on how leadership styles and advice-seeking behaviour affect the speed and quality of strategic decisions."],
      ["Academic role", "Assistant Professor at İstanbul Kent University, connecting management questions with technology and education."],
    ] as Array<[string, string]>,
  },
  tr: {
    role: "Kurucu, Ganrich Advisory · İstanbul, Türkiye",
    short: "Ahmed Furkan Gul, Ganrich Advisory’nin kurucusudur ve her çalışmayı bizzat yürütür. Çalışmaları kurumsal strateji, iş geliştirme ve stratejik karar alma araştırmalarının kesiştiği noktadadır.",
    facts: [
      ["Kurumsal deneyim", "Tay Group’ta Chief Strategy and Business Development Officer (Strateji ve İş Geliştirme Direktörü) olarak görev yaptı. Bu deneyim Ganrich müşteri çalışmalarında değil, yöneticilik rolünde edinilmiştir."],
      ["Karar araştırmaları", "Yeditepe Üniversitesindeki araştırmaları, liderlik stilleri ve tavsiye arama davranışının stratejik kararların hızı ve kalitesini nasıl etkilediğini inceler."],
      ["Akademik görev", "İstanbul Kent Üniversitesinde Dr. Öğr. Üyesi olarak yönetim sorularını teknoloji ve eğitimle buluşturur."],
    ] as Array<[string, string]>,
  },
};

export const firstConversation = {
  en: [
    ["You write a few lines", "Name, email and a short description of the situation are enough. Please leave out confidential detail."],
    ["The founder replies", "Ahmed Furkan Gul reads each inquiry and replies personally, with a few questions if they help prepare."],
    ["A first conversation", "A focused conversation about the decision, why it matters now, what is already known, and whether Ganrich is the right fit."],
    ["A short written proposal", "If it makes sense to work together, you receive a scope, approach, deliverables and fees in writing before anything starts."],
  ] as Array<[string, string]>,
  tr: [
    ["Birkaç satır yazarsınız", "Adınız, e-postanız ve durumun kısa bir açıklaması yeterli. Lütfen gizli ayrıntıları eklemeyin."],
    ["Kurucu yanıtlar", "Ahmed Furkan Gul her talebi okur ve hazırlığa yardımcı olacaksa birkaç soruyla birlikte bizzat yanıtlar."],
    ["İlk görüşme", "Karar, neden şimdi önemli olduğu, şu an bilinenler ve Ganrich’in doğru seçenek olup olmadığı üzerine odaklı bir görüşme."],
    ["Kısa bir yazılı teklif", "Birlikte çalışmak anlamlıysa, hiçbir şey başlamadan önce kapsam, yaklaşım, çıktılar ve ücret yazılı olarak iletilir."],
  ] as Array<[string, string]>,
};
