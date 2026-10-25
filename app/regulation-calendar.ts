// EU rule dates that Turkish manufacturers and exporters meet through their EU buyers.
//
// This list is the single source for the homepage timeline and the regulation calendar page. Every date
// comes from the official text named in `source`; update CALENDAR_CHECKED whenever the list is re-checked.

import type { Lang } from "./content";

export const CALENDAR_CHECKED = { date: "2026-10-24", en: "24 October 2026", tr: "24 Ekim 2026" } as const;

export type RuleDate = {
  id: string;
  date: string; // ISO date the obligation applies from
  key: string; // programme route key in routeMap
  check?: string; // readiness-check route key, where one exists
  home?: boolean; // shown in the homepage timeline
  rule: { en: string; tr: string };
  // [short line for the timeline, one sentence on what changes for an exporter]
  en: [string, string];
  tr: [string, string];
  source: { act: string; url: string };
};

export const ruleCalendar: RuleDate[] = [
  { id: "eaa", date: "2025-06-28", key: "solutionAccessibility", home: true,
    rule: { en: "European Accessibility Act", tr: "Avrupa Erişilebilirlik Yasası" },
    en: ["European Accessibility Act applies to e-commerce", "Online shops and selected products sold to EU consumers must meet accessibility requirements. Micro-enterprises providing services are exempt."],
    tr: ["Avrupa Erişilebilirlik Yasası e-ticarette uygulanıyor", "AB tüketicilerine satış yapan online mağazalar ve belirli ürünler erişilebilirlik şartlarını karşılamalı. Hizmet sunan mikro işletmeler muaf."],
    source: { act: "Directive (EU) 2019/882", url: "https://eur-lex.europa.eu/eli/dir/2019/882/oj" } },
  { id: "cbam", date: "2026-01-01", key: "solutionCbam", check: "cbamCheck", home: true,
    rule: { en: "CBAM", tr: "SKDM (CBAM)" },
    en: ["CBAM definitive regime: importers ask for emissions data", "EU importers of steel, aluminium, cement, fertilisers, hydrogen and electricity declare embedded emissions and buy certificates, so they ask their suppliers for actual emissions data."],
    tr: ["CBAM kesin rejimi: ithalatçılar emisyon verisi istiyor", "Çelik, alüminyum, çimento, gübre, hidrojen ve elektrik ithal eden AB şirketleri gömülü emisyonu beyan edip sertifika alıyor; bu yüzden tedarikçilerinden gerçek emisyon verisi istiyor."],
    source: { act: "Regulation (EU) 2023/956", url: "https://eur-lex.europa.eu/eli/reg/2023/956/oj" } },
  { id: "cpr", date: "2026-01-08", key: "solutionCpr",
    rule: { en: "Construction Products Regulation", tr: "Yapı Ürünleri Tüzüğü" },
    en: ["New Construction Products Regulation applies", "Product families move to the new rules as new harmonised technical specifications are cited; declarations add environmental characteristics based on life-cycle assessment."],
    tr: ["Yeni Yapı Ürünleri Tüzüğü uygulanıyor", "Ürün aileleri yeni uyumlaştırılmış teknik şartnameler yayımlandıkça yeni kurallara geçiyor; beyanlara yaşam döngüsü değerlendirmesine dayalı çevresel özellikler ekleniyor."],
    source: { act: "Regulation (EU) 2024/3110", url: "https://eur-lex.europa.eu/eli/reg/2024/3110/oj" } },
  { id: "eudamed", date: "2026-05-28", key: "solutionMdr",
    rule: { en: "EUDAMED", tr: "EUDAMED" },
    en: ["EUDAMED registration becomes mandatory", "Medical device manufacturers must use four EUDAMED modules, including actor and UDI/device registration, with transitional periods for devices already on the market."],
    tr: ["EUDAMED kaydı zorunlu hale geliyor", "Tıbbi cihaz üreticileri aktör ve UDI/cihaz kaydı dahil dört EUDAMED modülünü kullanmak zorunda; piyasadaki cihazlar için geçiş süreleri var."],
    source: { act: "Regulation (EU) 2024/1860 and Commission Decision (EU) 2025/2371", url: "https://eur-lex.europa.eu/eli/reg/2024/1860/oj" } },
  { id: "low-value-duty", date: "2026-07-01", key: "solutionEexport",
    rule: { en: "Low-value e-commerce", tr: "Düşük değerli e-ticaret" },
    en: ["€3 customs duty per item on parcels up to €150", "The customs duty exemption for low-value consignments ends; a temporary flat duty applies per item sent to EU consumers."],
    tr: ["150 €’ya kadar gönderilerde kalem başına 3 € gümrük vergisi", "Düşük değerli gönderilerdeki gümrük vergisi muafiyeti sona erdi; AB tüketicisine gönderilen her kalem için geçici sabit vergi uygulanıyor."],
    source: { act: "Council Regulation (EU) 2026/382", url: "https://trade.ec.europa.eu/access-to-markets/en/news/eu-applies-eu3-customs-duty-item-low-value-e-commerce-consignments" } },
  { id: "espr-destruction", date: "2026-07-19", key: "solutionTextiles",
    rule: { en: "Ecodesign (ESPR)", tr: "Ekotasarım (ESPR)" },
    en: ["Ban on destroying unsold clothes and footwear", "Large companies may no longer destroy unsold apparel, clothing accessories and footwear in the EU; medium-sized companies follow on 19 July 2030."],
    tr: ["Satılmayan giyim ve ayakkabının imhası yasak", "Büyük şirketler AB’de satılmayan giyim, giyim aksesuarı ve ayakkabıyı artık imha edemiyor; orta ölçekli şirketler 19 Temmuz 2030’da takip ediyor."],
    source: { act: "Regulation (EU) 2024/1781", url: "https://eur-lex.europa.eu/eli/reg/2024/1781/oj" } },
  { id: "ppwr", date: "2026-08-12", key: "solutionPackaging", home: true,
    rule: { en: "Packaging (PPWR)", tr: "Ambalaj (PPWR)" },
    en: ["Packaging needs a declaration of conformity (PPWR)", "Packaging placed on the EU market needs technical documentation and an EU declaration of conformity, and substance limits apply to food-contact packaging."],
    tr: ["Ambalaj uygunluk beyanı gerektiriyor (PPWR)", "AB pazarına sunulan ambalaj için teknik dosya ve AB uygunluk beyanı gerekiyor; gıdayla temas eden ambalajda madde sınırları uygulanıyor."],
    source: { act: "Regulation (EU) 2025/40", url: "https://eur-lex.europa.eu/eli/reg/2025/40/oj" } },
  { id: "cra-reporting", date: "2026-09-11", key: "solutionCra", check: "craCheck", home: true,
    rule: { en: "Cyber Resilience Act", tr: "Siber Dayanıklılık Yasası" },
    en: ["Cyber Resilience Act reporting obligations begin", "Manufacturers of products with digital elements must report actively exploited vulnerabilities and severe incidents, with an early warning within 24 hours."],
    tr: ["Siber Dayanıklılık Yasası bildirim yükümlülükleri başladı", "Dijital unsurlu ürün üreticileri, aktif olarak istismar edilen açıkları ve ciddi olayları bildirmeli; ilk uyarı 24 saat içinde yapılır."],
    source: { act: "Regulation (EU) 2024/2847", url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj" } },
  { id: "pfhxa", date: "2026-10-10", key: "solutionPfas", home: true,
    rule: { en: "PFHxA restriction", tr: "PFHxA kısıtlaması" },
    en: ["PFHxA restriction reaches textiles, footwear and food-contact paper", "PFHxA and related substances are restricted in consumer clothing, footwear, food-contact paper and board, consumer mixtures and cosmetics. Other consumer textiles follow on 10 October 2027."],
    tr: ["PFHxA kısıtlaması tekstil, ayakkabı ve gıda ambalajında", "PFHxA ve ilgili maddeler tüketici giyiminde, ayakkabıda, gıdayla temas eden kâğıt ve kartonda, tüketici karışımlarında ve kozmetikte kısıtlandı. Diğer tüketici tekstilleri 10 Ekim 2027’de takip ediyor."],
    source: { act: "Commission Regulation (EU) 2024/2462", url: "https://eur-lex.europa.eu/eli/reg/2024/2462/oj" } },
  { id: "product-identifiers", date: "2026-11-01", key: "solutionEexport", home: true,
    rule: { en: "Low-value e-commerce", tr: "Düşük değerli e-ticaret" },
    en: ["Product identifiers for low-value distance sales", "Import declarations for distance sales must carry product identifiers; a generic description is no longer enough."],
    tr: ["Düşük değerli mesafeli satışlarda ürün tanımlayıcısı", "Mesafeli satış ithalat beyanlarında ürün tanımlayıcısı zorunlu; genel bir ürün tanımı artık yetmiyor."],
    source: { act: "European Commission, Access2Markets", url: "https://trade.ec.europa.eu/access-to-markets/en/news/eu-applies-eu3-customs-duty-item-low-value-e-commerce-consignments" } },
  { id: "eudr", date: "2026-12-30", key: "solutionEudr", check: "eudrCheck", home: true,
    rule: { en: "EUDR", tr: "EUDR" },
    en: ["EUDR applies to large and medium operators", "Cattle, cocoa, coffee, oil palm, rubber, soya and wood products need a due diligence statement with geolocation. Micro and small operators follow on 30 June 2027."],
    tr: ["EUDR büyük ve orta işletmelere uygulanıyor", "Sığır, kakao, kahve, palm yağı, kauçuk, soya ve ahşap ürünleri için coğrafi konum içeren durum tespiti beyanı gerekiyor. Mikro ve küçük işletmeler 30 Haziran 2027’de takip ediyor."],
    source: { act: "Regulation (EU) 2023/1115, as amended by Regulation (EU) 2025/2650", url: "https://eur-lex.europa.eu/eli/reg/2023/1115/oj" } },
  { id: "machinery", date: "2027-01-20", key: "solutionMachinery", home: true,
    rule: { en: "Machinery Regulation", tr: "Makine Tüzüğü" },
    en: ["Machinery Regulation applies, with no transition period", "Machinery placed on the EU market must meet the new regulation, including requirements on cybersecurity, software and digital instructions."],
    tr: ["Makine Tüzüğü geçiş süresi olmadan uygulanıyor", "AB pazarına sunulan makineler; siber güvenlik, yazılım ve dijital kullanım kılavuzu şartları dahil yeni tüzüğe uymalı."],
    source: { act: "Regulation (EU) 2023/1230", url: "https://eur-lex.europa.eu/eli/reg/2023/1230/oj" } },
  { id: "battery", date: "2027-02-18", key: "solutionBattery", home: true,
    rule: { en: "Battery Regulation", tr: "Batarya Tüzüğü" },
    en: ["QR codes and battery passports for EU batteries", "Batteries carry a QR code, and industrial batteries over 2 kWh and electric-vehicle and light-means-of-transport batteries need a digital battery passport."],
    tr: ["AB bataryalarında QR kod ve batarya pasaportu", "Bataryalar QR kod taşıyor; 2 kWh üzeri endüstriyel bataryalar ile elektrikli araç ve hafif ulaşım aracı bataryaları dijital batarya pasaportu gerektiriyor."],
    source: { act: "Regulation (EU) 2023/1542", url: "https://eur-lex.europa.eu/eli/reg/2023/1542/oj" } },
  { id: "cra-full", date: "2027-12-11", key: "solutionCra", check: "craCheck",
    rule: { en: "Cyber Resilience Act", tr: "Siber Dayanıklılık Yasası" },
    en: ["Cyber Resilience Act applies in full", "Products with digital elements need to meet the essential cybersecurity requirements and carry the CE marking on that basis."],
    tr: ["Siber Dayanıklılık Yasası tümüyle uygulanıyor", "Dijital unsurlu ürünler temel siber güvenlik şartlarını karşılamalı ve CE işaretini bu temelde taşımalı."],
    source: { act: "Regulation (EU) 2024/2847", url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj" } },
  { id: "forced-labour", date: "2027-12-14", key: "solutionForcedLabour", home: true,
    rule: { en: "Forced Labour Regulation", tr: "Zorla Çalıştırma Tüzüğü" },
    en: ["Ban on products made with forced labour", "Products made with forced labour may not be placed on or exported from the EU market; authorities can order their withdrawal."],
    tr: ["Zorla çalıştırmayla üretilen ürünlere yasak", "Zorla çalıştırmayla üretilen ürünler AB pazarına sunulamaz ve AB’den ihraç edilemez; makamlar piyasadan çekilmelerini isteyebilir."],
    source: { act: "Regulation (EU) 2024/3015", url: "https://eur-lex.europa.eu/eli/reg/2024/3015/oj" } },
  { id: "mdr-legacy-2027", date: "2027-12-31", key: "solutionMdr",
    rule: { en: "Medical Device Regulation", tr: "Tıbbi Cihaz Tüzüğü" },
    en: ["Legacy class III and implantable IIb devices must be MDR-certified", "Devices sold on directive-era certificates under the extended transition must be certified under the MDR. Other class IIb, class IIa and certain class I devices follow on 31 December 2028."],
    tr: ["Eski sınıf III ve implante edilebilir IIb cihazlar MDR belgesi almalı", "Uzatılmış geçiş kapsamında direktif dönemi sertifikalarıyla satılan cihazlar MDR kapsamında belgelendirilmeli. Diğer sınıf IIb, sınıf IIa ve bazı sınıf I cihazlar 31 Aralık 2028’de takip ediyor."],
    source: { act: "Regulation (EU) 2023/607", url: "https://eur-lex.europa.eu/eli/reg/2023/607/oj" } },
];

const months = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
};

// Fixed month names rather than Intl, so server and browser always render the same text.
export function ruleDateLabel(lang: Lang, iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[lang][m - 1]} ${y}`;
}
