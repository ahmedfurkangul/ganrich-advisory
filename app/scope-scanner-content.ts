// AB Kural Kapsam Tarayıcısı / EU Rule Scope Scanner.
//
// Five questions about what a Turkish manufacturer sells into the EU and how. Each answer points at rule ids in
// app/regulation-calendar.ts (dates, short lines, programme and readiness-check links come from there, so the two
// never drift) or at one of the few programme topics that have no single application date. The scanner only says
// which rules are worth a closer look; it never says whether a company complies.
//
// No runtime imports: the tests load this file directly with Node.

export type ScopeLang = "en" | "tr";

// Programme topics without one application date in the calendar.
export type ScopeExtra = { id: string; key: string; rule: { en: string; tr: string }; en: string; tr: string };

export const scopeExtras: ScopeExtra[] = [
  { id: "nis2", key: "solutionNis2",
    rule: { en: "NIS2 supplier security", tr: "NIS2 tedarikçi güvenliği" },
    en: "EU companies in critical sectors must manage the cybersecurity of their suppliers, so they send security questionnaires and contract clauses down the chain.",
    tr: "Kritik sektörlerdeki AB şirketleri tedarikçilerinin siber güvenliğini yönetmek zorunda; bu yüzden zincir boyunca güvenlik anketi ve sözleşme maddesi gönderiyorlar." },
  { id: "supplier-data", key: "solutionSupplierData",
    rule: { en: "Supplier sustainability data", tr: "Tedarikçi sürdürülebilirlik verisi" },
    en: "Large EU buyers collect emissions, human-rights and due-diligence data from suppliers for their own reporting, even where the law does not reach the supplier directly.",
    tr: "Büyük AB alıcıları kendi raporlamaları için tedarikçilerden emisyon, insan hakları ve durum tespiti verisi topluyor; yasa tedarikçiye doğrudan uzanmasa bile." },
  { id: "tr-ets", key: "solutionTrEts",
    rule: { en: "Türkiye ETS (domestic)", tr: "Türkiye ETS (yurt içi)" },
    en: "A Türkiye rule, not an EU one: large installations in heavy industry prepare for monitoring and reporting under the Turkish emissions trading system, which also matters for CBAM.",
    tr: "AB değil Türkiye kuralı: ağır sanayideki büyük tesisler Türkiye emisyon ticaret sistemi kapsamında izleme ve raporlamaya hazırlanıyor; bu SKDM açısından da önemli." },
];

export type ScopeOption = { id: string; en: string; tr: string; rules: string[] };
export type ScopeQuestion = { id: string; multi: boolean; en: string; tr: string; options: ScopeOption[] };

const yes = { en: "Yes", tr: "Evet" };
const no = { en: "No", tr: "Hayır" };
const yesNo = (rules: string[]): ScopeOption[] => [{ id: "yes", ...yes, rules }, { id: "no", ...no, rules: [] }];

export const scopeQuestions: ScopeQuestion[] = [
  { id: "products", multi: true,
    en: "Which of these do you make or sell to EU customers? Select all that apply.",
    tr: "AB müşterilerine bunlardan hangilerini üretiyor veya satıyorsunuz? Uyanların hepsini seçin.",
    options: [
      { id: "metals", en: "Iron, steel or aluminium; cement, fertilisers or hydrogen", tr: "Demir, çelik veya alüminyum; çimento, gübre veya hidrojen", rules: ["cbam", "tr-ets"] },
      { id: "machinery", en: "Machinery or industrial equipment", tr: "Makine veya endüstriyel ekipman", rules: ["machinery"] },
      { id: "digital", en: "Products with software, firmware or a network connection", tr: "Yazılım, gömülü yazılım veya ağ bağlantısı olan ürünler", rules: ["cra-reporting", "cra-full"] },
      { id: "batteries", en: "Batteries, or products with a built-in battery", tr: "Batarya veya bataryalı ürünler", rules: ["battery"] },
      { id: "textiles", en: "Clothing, footwear or home textiles", tr: "Giyim, ayakkabı veya ev tekstili", rules: ["espr-destruction", "pfhxa"] },
      { id: "eudr", en: "Wood, furniture, paper, rubber, leather, or cattle, cocoa, coffee, palm oil or soya products", tr: "Ahşap, mobilya, kâğıt, kauçuk, deri veya sığır, kakao, kahve, palm yağı, soya ürünleri", rules: ["eudr"] },
      { id: "construction", en: "Construction products", tr: "Yapı ürünleri", rules: ["cpr"] },
      { id: "medical", en: "Medical devices", tr: "Tıbbi cihazlar", rules: ["eudamed", "mdr-legacy-2027"] },
      { id: "chemicals", en: "Chemicals, coatings, or food-contact paper and board", tr: "Kimyasallar, kaplamalar veya gıdayla temas eden kâğıt ve karton", rules: ["pfhxa"] },
      { id: "none", en: "None of these", tr: "Hiçbiri", rules: [] },
    ] },
  { id: "packaging", multi: false,
    en: "Do your products reach the EU in packaging that you supply?",
    tr: "Ürünleriniz AB'ye sizin sağladığınız ambalajla mı ulaşıyor?",
    options: yesNo(["ppwr"]) },
  { id: "online", multi: false,
    en: "Do you sell online directly to consumers in the EU?",
    tr: "AB'deki tüketicilere doğrudan online satış yapıyor musunuz?",
    options: yesNo(["eaa", "low-value-duty", "product-identifiers"]) },
  { id: "brands", multi: false,
    en: "Do you supply large EU brands, retailers or manufacturers?",
    tr: "Büyük AB markalarına, perakendecilerine veya üreticilerine tedarik yapıyor musunuz?",
    options: yesNo(["forced-labour", "supplier-data"]) },
  { id: "critical", multi: false,
    en: "Do you supply IT, software or components to EU companies in energy, transport, health, water, digital infrastructure or manufacturing?",
    tr: "Enerji, ulaşım, sağlık, su, dijital altyapı veya imalat sektöründeki AB şirketlerine BT, yazılım ya da bileşen tedarik ediyor musunuz?",
    options: yesNo(["nis2"]) },
];

// answers[questionId] = selected option ids. Returns rule ids in question order, without duplicates.
export function scopeRuleIds(answers: Record<string, string[]>): string[] {
  const ids: string[] = [];
  for (const q of scopeQuestions) for (const o of q.options) {
    if (!(answers[q.id] ?? []).includes(o.id)) continue;
    for (const r of o.rules) if (!ids.includes(r)) ids.push(r);
  }
  return ids;
}

export const scopeCopy = {
  en: {
    label: "EU rule scope scanner",
    title: "Which EU rules could reach your products?",
    intro: "Five questions, about one minute. You see the EU rules worth a closer look, their dates and where to start. Nothing is stored and no email is needed.",
    see: "Show the rules",
    progress: (n: number, t: number) => `${n} of ${t} answered`,
    resultTitle: (n: number) => n === 1 ? "1 rule worth a closer look" : `${n} rules worth a closer look`,
    none: "None of the rules on our list matched your answers. That does not mean no EU rule applies: product safety, CE marking and chemical rules reach almost every product.",
    applies: "Applies since", from: "From", noDate: "Date depends on your buyer",
    programme: "What it means for you", check: "Take the readiness check",
    disclaimer: "This is an indicative scan, not a legal opinion or a compliance assessment. Whether a rule applies depends on your product’s customs code, your role in the EU supply chain and your company’s size.",
    checked: (d: string) => `EU dates checked on ${d} against the official texts in our regulation calendar.`,
    calendar: "See the full EU regulation calendar",
    nextTitle: "Requests arriving from several buyers?",
    next: "The EU Buyer Request Desk sorts each request into what the law requires, what the buyer wants and what is open to negotiation, and keeps one answer library for your team.",
    desk: "See the EU Buyer Request Desk", contact: "Ask a question", newsletter: "Get short updates when a date moves",
    pdf: "Save as PDF", restart: "Change my answers",
  },
  tr: {
    label: "AB kural kapsam tarayıcısı",
    title: "Ürünlerinize hangi AB kuralları uzanabilir?",
    intro: "Beş soru, yaklaşık bir dakika. Yakından bakmaya değer AB kurallarını, tarihlerini ve nereden başlayacağınızı görürsünüz. Hiçbir şey saklanmaz, e-posta gerekmez.",
    see: "Kuralları göster",
    progress: (n: number, t: number) => `${t} sorudan ${n} tanesi yanıtlandı`,
    resultTitle: (n: number) => `Yakından bakmaya değer ${n} kural`,
    none: "Yanıtlarınız listemizdeki kurallardan hiçbiriyle eşleşmedi. Bu, hiçbir AB kuralının uygulanmadığı anlamına gelmez: ürün güvenliği, CE işareti ve kimyasal kuralları neredeyse her ürüne uzanır.",
    applies: "Uygulanıyor:", from: "Başlangıç:", noDate: "Tarih alıcınıza göre değişir",
    programme: "Sizin için ne anlama geliyor", check: "Hazırlık testine başlayın",
    disclaimer: "Bu, yol gösterici bir taramadır; hukuki görüş veya uyum değerlendirmesi değildir. Bir kuralın uygulanıp uygulanmadığı ürününüzün GTİP koduna, AB tedarik zincirindeki rolünüze ve şirketinizin büyüklüğüne bağlıdır.",
    checked: (d: string) => `AB tarihleri mevzuat takvimimizdeki resmi metinlerle ${d} tarihinde kontrol edildi.`,
    calendar: "AB mevzuat takviminin tamamını görün",
    nextTitle: "Talepler birden çok alıcıdan mı geliyor?",
    next: "AB Alıcı Talep Masası her talebi yasal zorunluluk, alıcının isteği ve pazarlığa açık konu olarak ayırır; ekibiniz için tek bir yanıt kütüphanesi tutar.",
    desk: "AB Alıcı Talep Masası'nı görün", contact: "Soru sorun", newsletter: "Bir tarih değiştiğinde kısa not alın",
    pdf: "PDF olarak kaydet", restart: "Yanıtlarımı değiştir",
  },
} as const;
