import type { Lang } from "./content";

// One page per EU rule that brings together what a Turkish exporter needs: the short answer, the dates,
// what the EU buyer will ask for, the first steps, and links to the guide, check, programme and papers.
// Every claim here is stated, with its source, in the linked guide; update both together.

export type HubText = {
  title: string; // <title> and og
  description: string; // meta description
  label: string; // eyebrow
  h1: string;
  lead: string;
  shortAnswer: string;
  datesTitle: string;
  dates: [string, string, string][]; // [ISO date, label, what applies]
  asksTitle: string;
  asks: string[];
  stepsTitle: string;
  steps: string[];
  faq: [string, string][];
  glossary: [string, string][]; // [term in this language, term in the other language]
  checked: string;
};

export type RuleHub = {
  key: string;
  solution: string;
  check?: string;
  guides: string[];
  reports: Record<Lang, { slug: string; title: string }[]>;
} & Record<Lang, HubText>;

export const ruleHubs: RuleHub[] = [
  {
    key: "hubCra",
    solution: "solutionCra",
    check: "craCheck",
    guides: ["guideCraReporting", "guideCraStandards"],
    reports: {
      en: [{ slug: "cra-the-24-hour-test-96989394", title: "The 24-hour test: CRA incident readiness for manufacturers selling into the EU" }],
      tr: [{ slug: "cra-24-saat-testi-37aca9ad", title: "24 saat testi: AB'ye satış yapan üreticiler için CRA olay hazırlığı" }],
    },
    en: {
      title: "Cyber Resilience Act for Turkish manufacturers: dates, reporting and first steps | Ganrich Advisory",
      description: "CRA reporting has applied since 11 September 2026 and the main rules apply from 11 December 2027. The dates, the 24-hour clock and first steps for Turkish manufacturers.",
      label: "CRA · Cyber Resilience Act",
      h1: "Cyber Resilience Act for Turkish manufacturers: what applies now, and what comes in 2027",
      lead: "Everything on this site about the EU Cyber Resilience Act in one place: the dates, the reporting clock, the conformity routes while standards are late, and our guides, check and programme.",
      shortAnswer: "If you sell products with digital elements into the EU, the Cyber Resilience Act's reporting duties have applied since 11 September 2026, including for products already on the market: an early warning within 24 hours of becoming aware of an actively exploited vulnerability or severe incident. The main requirements apply from 11 December 2027. No harmonised standard is cited yet, so important class I products should plan for a notified body.",
      datesTitle: "Dates that apply",
      dates: [
        ["2026-06-11", "11 June 2026", "Rules on notified bodies (Chapter IV) apply."],
        ["2026-09-11", "11 September 2026", "Article 14 reporting applies to all in-scope products, including those placed on the market earlier."],
        ["2027-12-11", "11 December 2027", "The rest of the regulation applies, including the essential cybersecurity requirements and conformity assessment."],
      ],
      asksTitle: "What the CRA expects of a manufacturer now",
      asks: [
        "An early warning within 24 hours of becoming aware of an actively exploited vulnerability or a severe incident.",
        "A notification within 72 hours of awareness, not 72 hours after the early warning.",
        "A final report: for a vulnerability, no later than 14 days after a fix or mitigation is available; for a severe incident, within one month of the notification.",
        "Reports through the single reporting platform to the coordinator CSIRT set by Article 14(7). Without an EU main establishment, the Member State follows a fixed order: authorised representative, importer, distributor, then largest user base.",
        "Information for impacted users, and where appropriate all users, including the corrective measures they can take.",
      ],
      stepsTitle: "First steps",
      steps: [
        "Check which of your products have a direct or indirect data connection and are in scope, and record the reasoning.",
        "Classify each product: default, important class I or II, or critical.",
        "Set up Article 14 reporting now: who decides within 24 hours, who files within 72, and personal MFA-enabled EU Login accounts for the platform.",
        "Map Annex I to your design, tests and processes, and write the technical documentation as if no standard will arrive in time.",
        "For class I and above, contact notified bodies early and plan for a third-party assessment.",
      ],
      faq: [
        ["Are the main CRA requirements already mandatory?", "No. They apply from 11 December 2027. What applies now is Article 14 reporting, since 11 September 2026, and the rules on notified bodies, since 11 June 2026."],
        ["Does reporting apply to products we already sell?", "Yes. Article 69(3) brings products placed on the market before 11 December 2027 into Article 14 reporting. Other requirements apply to them only if they are substantially modified from that date."],
        ["Can we self-assess without a harmonised standard?", "For default products, yes, under module A, with technical documentation describing the solutions you used. For important class I products, not without standards, common specifications or certification; otherwise a notified body is needed."],
        ["Is a vulnerability in a third-party component automatically reportable?", "No. The Commission's non-binding guidance says manufacturers report actively exploited vulnerabilities in their own product. If the component vulnerability cannot be, or has not been, exploited in your product, it is not subject to mandatory reporting. Record the product-level evidence."],
      ],
      glossary: [
        ["Product with digital elements", "Dijital unsurlu ürün"],
        ["Actively exploited vulnerability", "Aktif olarak istismar edilen açık"],
        ["Severe incident", "Ciddi olay"],
        ["Single reporting platform (SRP)", "Tek raporlama platformu (SRP)"],
        ["Coordinator CSIRT", "Koordinatör CSIRT"],
        ["Notified body", "Onaylanmış kuruluş"],
        ["Harmonised standard", "Uyumlaştırılmış standart"],
      ],
      checked: "Dates and sources last checked 17 November 2026 against Regulation (EU) 2024/2847, the Commission's guidance and ENISA. General information, not legal advice.",
    },
    tr: {
      title: "Türk üreticiler için Siber Dayanıklılık Yasası (CRA): tarihler, bildirim ve ilk adımlar | Ganrich Advisory",
      description: "CRA bildirim yükümlülüğü 11 Eylül 2026'dan beri uygulanıyor, ana kurallar 11 Aralık 2027'de başlıyor. Türk üreticiler için tarihler, 24 saatlik süre ve ilk adımlar.",
      label: "CRA · Siber Dayanıklılık Yasası",
      h1: "Türk üreticiler için Siber Dayanıklılık Yasası: şimdi ne geçerli, 2027'de ne geliyor?",
      lead: "Bu sitede AB Siber Dayanıklılık Yasası üzerine olan her şey tek yerde: tarihler, bildirim süreleri, standartlar gecikirken uygunluk yolları ve rehberlerimiz, testimiz ve programımız.",
      shortAnswer: "AB'ye dijital unsurlu ürün satıyorsanız, Siber Dayanıklılık Yasası'nın bildirim yükümlülükleri piyasadaki ürünler dahil 11 Eylül 2026'dan beri uygulanıyor: aktif olarak istismar edilen bir açığın ya da ciddi bir olayın farkına varıldıktan sonra 24 saat içinde erken uyarı. Ana gereklilikler 11 Aralık 2027'den itibaren uygulanır. Henüz yayımlanmış bir uyumlaştırılmış standart yok; bu yüzden I. sınıf önemli ürünler onaylanmış kuruluş planlamalı.",
      datesTitle: "Geçerli tarihler",
      dates: [
        ["2026-06-11", "11 Haziran 2026", "Onaylanmış kuruluşlara ilişkin kurallar (Bölüm IV) uygulanıyor."],
        ["2026-09-11", "11 Eylül 2026", "Madde 14 bildirim yükümlülüğü, daha önce piyasaya sürülenler dahil kapsamdaki tüm ürünlere uygulanıyor."],
        ["2027-12-11", "11 Aralık 2027", "Temel siber güvenlik gereklilikleri ve uygunluk değerlendirmesi dahil Tüzüğün geri kalanı uygulanıyor."],
      ],
      asksTitle: "CRA üreticiden şimdi ne bekliyor?",
      asks: [
        "Aktif olarak istismar edilen bir açığın ya da ciddi bir olayın farkına varıldıktan sonra en geç 24 saat içinde erken uyarı.",
        "Farkına varma anından itibaren en geç 72 saat içinde bildirim; erken uyarıdan 72 saat sonra değil.",
        "Nihai rapor: açıkta, düzeltici veya azaltıcı önlem kullanılabilir hale geldikten sonra en geç 14 gün içinde; ciddi olayda, bildirimden itibaren bir ay içinde.",
        "Bildirimler, tek raporlama platformu üzerinden Madde 14(7)'ye göre belirlenen koordinatör CSIRT'e yapılır. AB'de ana kuruluş yoksa üye devlet sabit bir sırayla belirlenir: yetkili temsilci, ithalatçı, dağıtıcı, ardından en fazla kullanıcının bulunduğu ülke.",
        "Etkilenen kullanıcıların, gerekirse tüm kullanıcıların, alabilecekleri düzeltici önlemlerle birlikte bilgilendirilmesi.",
      ],
      stepsTitle: "İlk adımlar",
      steps: [
        "Hangi ürünlerinizin doğrudan veya dolaylı veri bağlantısı olduğunu ve kapsama girdiğini kontrol edin, gerekçesini kaydedin.",
        "Her ürünü sınıflandırın: varsayılan, I. veya II. sınıf önemli ya da kritik.",
        "Madde 14 bildirim düzenini şimdi kurun: 24 saatte kim karar verir, 72 saatte kim bildirir; platform için kişisel, çok faktörlü doğrulamalı EU Login hesapları.",
        "Ek I'i tasarım, test ve süreçlerinize eşleyin; teknik dosyayı hiçbir standart zamanında gelmeyecekmiş gibi yazın.",
        "I. sınıf ve üzeri ürünlerde onaylanmış kuruluşlarla erkenden görüşün ve üçüncü taraf değerlendirmesi planlayın.",
      ],
      faq: [
        ["CRA'nın ana gereklilikleri şimdiden zorunlu mu?", "Hayır. 11 Aralık 2027'den itibaren uygulanır. Şu an geçerli olanlar 11 Eylül 2026'dan beri Madde 14 bildirim yükümlülüğü ve 11 Haziran 2026'dan beri onaylanmış kuruluş kurallarıdır."],
        ["Bildirim yükümlülüğü hâlihazırda sattığımız ürünleri de kapsıyor mu?", "Evet. Madde 69(3), 11 Aralık 2027'den önce piyasaya sürülen ürünleri de Madde 14 bildirimine dahil eder. Diğer gereklilikler bu ürünlere ancak o tarihten sonra esaslı değişikliğe uğrarlarsa uygulanır."],
        ["Uyumlaştırılmış standart olmadan öz değerlendirme yapabilir miyiz?", "Varsayılan ürünlerde evet: modül A ile, kullandığınız çözümleri anlatan bir teknik dosyayla. I. sınıf önemli ürünlerde standart, ortak spesifikasyon veya sertifikasyon olmadan olmaz; aksi halde onaylanmış kuruluş gerekir."],
        ["Üçüncü taraf bir bileşendeki açık otomatik olarak bildirilir mi?", "Hayır. Komisyon'un bağlayıcı olmayan rehberine göre üretici kendi ürünündeki aktif olarak istismar edilen açıkları bildirir. Bileşendeki açık ürününüzde istismar edilemiyorsa ya da edilmediyse zorunlu bildirime tabi değildir. Ürün düzeyindeki kanıtı kaydedin."],
      ],
      glossary: [
        ["Dijital unsurlu ürün", "Product with digital elements"],
        ["Aktif olarak istismar edilen açık", "Actively exploited vulnerability"],
        ["Ciddi olay", "Severe incident"],
        ["Tek raporlama platformu (SRP)", "Single reporting platform (SRP)"],
        ["Koordinatör CSIRT", "Coordinator CSIRT"],
        ["Onaylanmış kuruluş", "Notified body"],
        ["Uyumlaştırılmış standart", "Harmonised standard"],
      ],
      checked: "Tarihler ve kaynaklar en son 17 Kasım 2026'da (AB) 2024/2847 sayılı Tüzük, Komisyon rehberi ve ENISA ile karşılaştırıldı. Genel bilgidir, hukuki görüş değildir.",
    },
  },
  {
    key: "hubCbam",
    solution: "solutionCbam",
    check: "cbamCheck",
    guides: ["guideCbam2026", "guideCbamDefaults", "guideCbamVerifier", "guideTrEtsMarket", "guideUkCbam", "guideCbamDownstream"],
    reports: {
      en: [{ slug: "cbam-actual-or-default-e9f664d8", title: "Actual or default? The CBAM data decision for Turkish metal exporters" }, { slug: "cbam-august-guidance-turkish-exporters-58a4abcd", title: "The August guidance: what the Commission's new CBAM rulebook asks of Turkish exporters" }],
      tr: [{ slug: "cbam-gercek-mi-varsayilan-mi-ef31215c", title: "Gerçek emisyon mu, varsayılan değer mi? Türk metal ihracatçıları için SKDM veri kararı" }, { slug: "skdm-agustos-rehberleri-turk-ihracatci-1d698fcc", title: "Ağustos rehberleri: SKDM (CBAM) ilk maliyet yılında Türk ihracatçıdan ne istiyor?" }],
    },
    en: {
      title: "CBAM for Turkish exporters: dates, data and first steps | Ganrich Advisory",
      description: "CBAM's paying phase began on 1 January 2026. The dates, what your EU importer will ask a Turkish producer for, and the first steps, on one page.",
      label: "CBAM · Carbon Border Adjustment Mechanism",
      h1: "CBAM for Turkish exporters: what your EU importer needs from you, and by when",
      lead: "Everything on this site about the EU Carbon Border Adjustment Mechanism in one place: the dates, the emissions data your importer needs, the first steps, and our guides, check and programme.",
      shortAnswer: "CBAM's definitive regime has applied since 1 January 2026. Your EU importer, as authorised CBAM declarant, declares the embedded emissions of your steel, aluminium, cement, fertiliser or hydrogen and buys certificates; the first annual declaration for 2026 imports is due by 30 September 2027. Without your verified actual data, it must use default values with a mark-up of 10% in 2026, 20% in 2027 and 30% from 2028.",
      datesTitle: "Dates that apply",
      dates: [
        ["2026-01-01", "1 January 2026", "Definitive regime starts. Embedded emissions are declared on actual or default values; defaults carry a 10% mark-up."],
        ["2027-01-01", "1 January 2027", "Default mark-up rises to 20%. The UK's own CBAM starts for goods imported into the UK."],
        ["2027-02", "February 2027", "Certificate sales for 2026 imports begin on the central platform."],
        ["2027-09-30", "30 September 2027", "First annual CBAM declaration and certificate surrender, covering 2026 imports."],
        ["2028-01-01", "1 January 2028", "Default mark-up rises to 30%. The proposed extension to steel- and aluminium-intensive downstream goods would start; it is not yet law."],
      ],
      asksTitle: "What your EU importer will ask for",
      asks: [
        "The CN code and production route of each product you ship, and the installation where it was made.",
        "Embedded emissions per tonne, calculated under the CBAM methodology: direct emissions for iron, steel and aluminium; direct and indirect for cement and fertilisers.",
        "A verifier's report if the importer is to use your actual values instead of defaults. Only a verifier accredited by an EU Member State's national accreditation body can issue it.",
        "Evidence of any carbon price actually paid in Türkiye, certified, if a deduction is to be claimed.",
        "Data on a calendar it can plan around, ahead of the declaration due by 30 September 2027.",
      ],
      stepsTitle: "First steps",
      steps: [
        "Map every EU-bound product to its CN code and CBAM sector.",
        "Compare your emissions intensity with the marked-up default for each CN code. Where yours is clearly lower, actual data pays off.",
        "Collect 2026 activity data monthly, not at year end, following the Commission's guidance documents.",
        "Contract an accredited verifier and plan the site visit for the 2026 data year.",
        "Agree in writing with each EU buyer what data you hand over, in what format and when.",
      ],
      faq: [
        ["Does a Turkish exporter buy CBAM certificates?", "No. The EU importer, as authorised CBAM declarant, buys and surrenders them. The exporter supplies the emissions data that decides how many are needed."],
        ["Is the 50-tonne exemption staying?", "Yes. An importer whose CBAM goods stay at or below 50 tonnes net mass in a calendar year is exempt for that year. The Commission's 30 September 2026 assessment found exempted imports were 0.87% of embedded emissions, below the 1% limit. It does not apply to electricity or hydrogen."],
        ["Can TÜRKAK accredit a CBAM verifier?", "No. Only a national accreditation body of an EU Member State can grant CBAM accreditation. Legal entities from third countries can become verifiers, but their accreditation must come from an EU body."],
        ["Does TR ETS reduce what my buyer pays under CBAM?", "Possibly later. A verified carbon price actually paid in the country of production can be deducted, but only with actual emissions data. The TR ETS pilot requires reporting only for 2026; the first surrender obligation applies to 2027 emissions."],
      ],
      glossary: [
        ["Carbon Border Adjustment Mechanism (CBAM)", "Sınırda Karbon Düzenleme Mekanizması (SKDM)"],
        ["Authorised CBAM declarant", "Yetkili SKDM beyan sahibi"],
        ["Embedded emissions", "Gömülü emisyon"],
        ["Default value", "Varsayılan değer"],
        ["Actual emissions", "Gerçek emisyon"],
        ["Verifier", "Doğrulayıcı"],
        ["CBAM certificate", "SKDM sertifikası"],
      ],
      checked: "Dates and sources last checked 3 November 2026 against the European Commission's CBAM pages and the Turkish Ministry of Trade. General information, not legal advice.",
    },
    tr: {
      title: "Türk ihracatçılar için SKDM (CBAM): tarihler, veri ve ilk adımlar | Ganrich Advisory",
      description: "SKDM'nin ödemeli dönemi 1 Ocak 2026'da başladı. Tarihler, AB ithalatçınızın Türk üreticiden isteyeceği veri ve ilk adımlar tek sayfada.",
      label: "SKDM (CBAM) · Sınırda Karbon Düzenleme Mekanizması",
      h1: "Türk ihracatçılar için SKDM: AB ithalatçınız sizden ne isteyecek, ne zamana kadar?",
      lead: "Bu sitede AB Sınırda Karbon Düzenleme Mekanizması üzerine olan her şey tek yerde: tarihler, ithalatçınızın ihtiyaç duyduğu emisyon verisi, ilk adımlar ve rehberlerimiz, testimiz ve programımız.",
      shortAnswer: "SKDM'nin kesin dönemi 1 Ocak 2026'dan beri uygulanıyor. Yetkili SKDM beyan sahibi olan AB'li ithalatçınız çelik, alüminyum, çimento, gübre veya hidrojen ürünlerinizin gömülü emisyonunu beyan eder ve sertifika alır; 2026 ithalatı için ilk yıllık beyanın son günü 30 Eylül 2027. Doğrulanmış gerçek veriniz yoksa varsayılan değerleri 2026'da %10, 2027'de %20, 2028'den itibaren %30 ek oranla kullanmak zorundadır.",
      datesTitle: "Geçerli tarihler",
      dates: [
        ["2026-01-01", "1 Ocak 2026", "Kesin dönem başladı. Gömülü emisyon gerçek ya da varsayılan değerle beyan ediliyor; varsayılan değerlere %10 ek oran uygulanıyor."],
        ["2027-01-01", "1 Ocak 2027", "Varsayılan değer ek oranı %20'ye çıkıyor. Birleşik Krallık'ın kendi SKDM'si ülkeye ithal edilen ürünler için başlıyor."],
        ["2027-02", "Şubat 2027", "2026 ithalatına ait sertifikalar merkezi platformda satışa çıkıyor."],
        ["2027-09-30", "30 Eylül 2027", "2026 ithalatını kapsayan ilk yıllık SKDM beyanı ve sertifika teslimi."],
        ["2028-01-01", "1 Ocak 2028", "Varsayılan değer ek oranı %30'a çıkıyor. Çelik ve alüminyum yoğun mamul ürünlere önerilen genişleme bu tarihte başlayacak; henüz yasalaşmadı."],
      ],
      asksTitle: "AB ithalatçınızın isteyeceği veri",
      asks: [
        "Gönderdiğiniz her ürünün GTİP/KN kodu ve üretim rotası ile üretildiği tesis.",
        "SKDM metodolojisine göre hesaplanmış ton başına gömülü emisyon: demir-çelik ve alüminyumda doğrudan emisyon; çimento ve gübrede doğrudan ve dolaylı emisyon.",
        "İthalatçının varsayılan değer yerine gerçek değerlerinizi kullanması için doğrulayıcı raporu. Bu raporu yalnızca bir AB üye devletinin ulusal akreditasyon kurumunca akredite edilmiş doğrulayıcı verebilir.",
        "İndirim talep edilecekse, Türkiye'de fiilen ödenen karbon fiyatının belgelenmiş kanıtı.",
        "30 Eylül 2027'deki beyan öncesinde planlayabileceği bir takvimle teslim edilen veri.",
      ],
      stepsTitle: "İlk adımlar",
      steps: [
        "AB'ye giden her ürünü GTİP koduna ve SKDM sektörüne eşleyin.",
        "Her GTİP için emisyon yoğunluğunuzu ek oranlı varsayılan değerle karşılaştırın. Sizinki belirgin şekilde düşükse gerçek veri kazandırır.",
        "2026 faaliyet verisini yıl sonunda değil, Komisyon rehberlerine göre aylık toplayın.",
        "2026 veri yılı için akredite bir doğrulayıcıyla anlaşın ve tesis ziyaretini planlayın.",
        "Her AB alıcınızla hangi veriyi, hangi formatta ve ne zaman vereceğinizi yazılı olarak netleştirin.",
      ],
      faq: [
        ["Türk ihracatçı SKDM sertifikası almak zorunda mı?", "Hayır. Sertifikayı yetkili SKDM beyan sahibi olan AB'li ithalatçı alır ve teslim eder. İhracatçı, kaç sertifika gerektiğini belirleyen emisyon verisini sağlar."],
        ["50 ton muafiyeti devam ediyor mu?", "Evet. Bir takvim yılında SKDM kapsamındaki ithalatı net 50 tonu aşmayan ithalatçı o yıl için muaftır. Komisyon'un 30 Eylül 2026 değerlendirmesine göre muaf ithalat gömülü emisyonların %0,87'sini oluşturdu; bu, %1 sınırının altında. Muafiyet elektrik ve hidrojen için geçerli değil."],
        ["TÜRKAK bir SKDM doğrulayıcısını akredite edebilir mi?", "Hayır. SKDM akreditasyonunu yalnızca bir AB üye devletinin ulusal akreditasyon kurumu verebilir. Üçüncü ülke tüzel kişileri doğrulayıcı olabilir, ancak akreditasyonları bir AB kurumundan gelmelidir."],
        ["TR ETS alıcımın SKDM maliyetini düşürür mü?", "İleride olabilir. Üretim ülkesinde fiilen ödenmiş ve doğrulanmış bir karbon fiyatı düşülebilir, ancak yalnızca gerçek emisyon verisiyle. TR ETS pilotu 2026 için yalnızca raporlama istiyor; ilk teslim yükümlülüğü 2027 emisyonları için geçerli."],
      ],
      glossary: [
        ["Sınırda Karbon Düzenleme Mekanizması (SKDM)", "Carbon Border Adjustment Mechanism (CBAM)"],
        ["Yetkili SKDM beyan sahibi", "Authorised CBAM declarant"],
        ["Gömülü emisyon", "Embedded emissions"],
        ["Varsayılan değer", "Default value"],
        ["Gerçek emisyon", "Actual emissions"],
        ["Doğrulayıcı", "Verifier"],
        ["SKDM sertifikası", "CBAM certificate"],
      ],
      checked: "Tarihler ve kaynaklar en son 3 Kasım 2026'da Avrupa Komisyonu'nun SKDM sayfaları ve T.C. Ticaret Bakanlığı ile karşılaştırıldı. Genel bilgidir, hukuki görüş değildir.",
    },
  },
  {
    key: "hubEudr",
    solution: "solutionEudr",
    check: "eudrCheck",
    guides: ["guideEudr2026"],
    reports: {
      en: [{ slug: "eudr-checklist-turkish-wood-furniture-204bc82e", title: "EUDR checklist for Turkish wood and furniture exporters" }],
      tr: [{ slug: "eudr-kontrol-listesi-ahsap-mobilya-a607fc4b", title: "Ahşap ve mobilya ihracatçıları için EUDR kontrol listesi" }],
    },
    en: {
      title: "EUDR for Turkish exporters: dates, data and first steps | Ganrich Advisory",
      description: "EUDR applies from 30 December 2026. What your EU buyer will ask a Turkish exporter for, the dates that apply, and the first steps, on one page.",
      label: "EUDR · EU Deforestation Regulation",
      h1: "EUDR for Turkish exporters: what your EU buyer will ask for, and by when",
      lead: "Everything on this site about the EU Deforestation Regulation in one place: the dates, the data pack your buyer needs, the first steps, and our guide, check and programme.",
      shortAnswer: "EUDR applies to large and medium operators from 30 December 2026 and to micro and small operators from 30 June 2027. In most Turkish export flows your EU customer is the operator and files the due diligence statement; your job is the data behind it. Expect requests for plot geolocation, evidence of no deforestation after 31 December 2020 and proof of legal production.",
      datesTitle: "Dates that apply",
      dates: [
        ["2026-12-30", "30 December 2026", "Large and medium operators, and micro and small operators of timber products already covered by the EU Timber Regulation."],
        ["2027-06-30", "30 June 2027", "Other micro and small operators established as such by 31 December 2024."],
        ["2027-12-30", "30 December 2027", "New products added by Delegated Regulation (EU) 2026/2102, including soluble coffee, certain palm oil derivatives and frozen cattle tongues."],
      ],
      asksTitle: "What your EU buyer will ask for",
      asks: [
        "Product identification: description, CN code, quantity and country of production.",
        "Geolocation of every plot where the commodity was produced: points, or polygons for plots over four hectares (other than cattle), with at least six decimal digits.",
        "Evidence that the land was not deforested after 31 December 2020, for example satellite checks of the plots.",
        "Legality evidence under the laws of the country of production: land use, forestry and environment, labour and tax.",
        "Supply chain information: names and addresses of your suppliers and of the customers you sell to.",
        "A DDS reference number where an earlier operator in the chain has already filed one.",
      ],
      stepsTitle: "First steps",
      steps: [
        "Map every EU-bound product line to its CN code and check it against Annex I. Scope follows the code, not the trade name.",
        "Ask each EU buyer in writing which format they want: their portal, a spreadsheet, GeoJSON, or a DDS reference.",
        "Collect plot geolocation and legality documents from upstream suppliers, and flag gaps by supplier.",
        "Agree who checks the plots against the 31 December 2020 cut-off.",
        "Build a repeatable file that links each shipment to its plots and documents.",
      ],
      faq: [
        ["Does a Turkish exporter file the due diligence statement?", "Usually not. Where a non-EU company places goods on the EU market, the first EU-established person making them available is deemed the operator and files the statement in the EU Information System (Regulation (EU) 2023/1115, Article 7). Your job is the data."],
        ["Is an FSC or PEFC certificate enough?", "Do not assume so. The regulation requires geolocation, a deforestation-free check against 31 December 2020 and legality evidence. Certification can support the risk assessment but does not replace the operator's due diligence (recital 52)."],
        ["Does Türkiye's low-risk classification remove the work?", "Only partly. Türkiye is classified low risk, which allows simplified due diligence only for commodities produced in Türkiye, not for imported timber, pulp or rubber processed here."],
        ["Are leather and technical rubber still in scope?", "Cattle hides, skins and leather and several technical-rubber codes were removed from Annex I by Delegated Regulation (EU) 2026/2102, in force since 18 September 2026. Tyres remain in scope. Check each product at eight-digit code level."],
      ],
      glossary: [
        ["Due diligence statement (DDS)", "Özen yükümlülüğü beyanı (DDS)"],
        ["Operator", "İşletmeci"],
        ["Downstream operator", "Alt işletmeci"],
        ["Geolocation", "Coğrafi konum"],
        ["Deforestation-free", "Ormansızlaşmaya yol açmamış"],
        ["EU Information System", "AB Bilgi Sistemi"],
      ],
      checked: "Dates and sources last checked 2 November 2026 against the European Commission's EUDR page and EUR-Lex. General information, not legal advice.",
    },
    tr: {
      title: "Türk ihracatçılar için EUDR: tarihler, veri ve ilk adımlar | Ganrich Advisory",
      description: "EUDR 30 Aralık 2026'da uygulanmaya başlıyor. AB alıcınızın Türk ihracatçıdan isteyeceği veri, geçerli tarihler ve ilk adımlar tek sayfada.",
      label: "EUDR · AB Ormansızlaşma Tüzüğü",
      h1: "Türk ihracatçılar için EUDR: AB alıcınız ne isteyecek, ne zamana kadar?",
      lead: "Bu sitede AB Ormansızlaşmanın Önlenmesi Tüzüğü üzerine olan her şey tek yerde: tarihler, alıcınızın ihtiyaç duyduğu veri paketi, ilk adımlar ve rehberimiz, testimiz ve programımız.",
      shortAnswer: "EUDR büyük ve orta ölçekli işletmecilere 30 Aralık 2026'dan, mikro ve küçük işletmecilere 30 Haziran 2027'den itibaren uygulanır. Türk ihracatının çoğunda işletmeci AB'deki müşterinizdir ve özen yükümlülüğü beyanını o verir; sizin işiniz beyanın arkasındaki veridir. Parsel koordinatı, 31 Aralık 2020'den sonra ormansızlaşma olmadığına dair kanıt ve yasal üretim kanıtı istenmesini bekleyin.",
      datesTitle: "Geçerli tarihler",
      dates: [
        ["2026-12-30", "30 Aralık 2026", "Büyük ve orta ölçekli işletmeciler ile hâlihazırda AB Kereste Tüzüğü kapsamındaki ahşap ürünlerinin mikro ve küçük işletmecileri."],
        ["2027-06-30", "30 Haziran 2027", "31 Aralık 2024 itibarıyla mikro veya küçük işletme olarak kurulmuş diğer işletmeciler."],
        ["2027-12-30", "30 Aralık 2027", "(AB) 2026/2102 sayılı Yetki Devrine Dayanan Tüzük ile eklenen yeni ürünler: çözünür kahve, bazı palmiye yağı türevleri ve dondurulmuş sığır dili dahil."],
      ],
      asksTitle: "AB alıcınızın isteyeceği veri",
      asks: [
        "Ürün bilgisi: tanım, KN/GTİP kodu, miktar ve üretim ülkesi.",
        "Emtianın üretildiği tüm parsellerin coğrafi konumu: nokta ya da sığır dışındaki emtialarda dört hektarı aşan parseller için poligon; en az altı ondalık basamak.",
        "31 Aralık 2020'den sonra ormansızlaşma olmadığına dair kanıt: örneğin parsellerin uydu verisiyle kontrolü.",
        "Üretim ülkesinin mevzuatına uygunluk kanıtı: arazi kullanımı, orman ve çevre, iş ve vergi kuralları.",
        "Tedarik zinciri bilgisi: tedarikçilerinizin ve sattığınız müşterilerin unvan ve adresleri.",
        "Zincirde daha önce beyan verilmişse DDS referans numarası.",
      ],
      stepsTitle: "İlk adımlar",
      steps: [
        "AB'ye giden her ürün satırını GTİP ile eşleyin ve Ek I ile karşılaştırın. Kapsamı ticari ad değil kod belirler.",
        "Her AB alıcınıza yazılı olarak hangi formatı istediğini sorun: kendi portalı, tablo, GeoJSON ya da DDS referansı.",
        "Tedarikçilerden parsel koordinatı ve yasallık belgelerini toplayın; eksikleri tedarikçi bazında işaretleyin.",
        "Parsellerin 31 Aralık 2020 kesim tarihine göre kontrolünü kimin yapacağını netleştirin.",
        "Her sevkiyatı parsel ve belgelerine bağlayan, tekrarlanabilir bir dosya kurun.",
      ],
      faq: [
        ["Özen yükümlülüğü beyanını Türk ihracatçı mı verir?", "Genellikle hayır. AB dışındaki bir şirket malı AB piyasasına arz ettiğinde, ürünü piyasada bulunduran ilk AB yerleşik kişi işletmeci sayılır ve beyanı AB Bilgi Sistemi'nde o verir ((AB) 2023/1115, Madde 7). Sizin işiniz veriyi sağlamak."],
        ["FSC veya PEFC sertifikası yeterli mi?", "Öyle varsaymayın. Tüzük coğrafi konum, 31 Aralık 2020'ye göre ormansızlaşma kontrolü ve yasallık kanıtı istiyor. Sertifikasyon risk değerlendirmesini destekleyebilir ama işletmecinin özen yükümlülüğünün yerini almaz (gerekçe 52)."],
        ["Türkiye'nin düşük riskli sayılması işi ortadan kaldırır mı?", "Yalnızca kısmen. Türkiye düşük riskli sınıfta; bu, basitleştirilmiş özen yükümlülüğünü yalnızca Türkiye'de üretilen emtialar için mümkün kılar. Türkiye'de işlenen ithal kereste, selüloz veya kauçuk için geçerli değildir."],
        ["Deri ve teknik kauçuk hâlâ kapsamda mı?", "Sığır ham derisi, derisi ve işlenmiş derisi ile bazı teknik kauçuk kodları, 18 Eylül 2026'dan beri yürürlükte olan (AB) 2026/2102 sayılı Yetki Devrine Dayanan Tüzük ile Ek I'den çıkarıldı. Lastikler kapsamda kalıyor. Her ürünü sekiz haneli kod düzeyinde kontrol edin."],
      ],
      glossary: [
        ["Özen yükümlülüğü beyanı (DDS)", "Due diligence statement (DDS)"],
        ["İşletmeci", "Operator"],
        ["Alt işletmeci", "Downstream operator"],
        ["Coğrafi konum", "Geolocation"],
        ["Ormansızlaşmaya yol açmamış", "Deforestation-free"],
        ["AB Bilgi Sistemi", "EU Information System"],
      ],
      checked: "Tarihler ve kaynaklar en son 2 Kasım 2026'da Avrupa Komisyonu'nun EUDR sayfası ve EUR-Lex ile karşılaştırıldı. Genel bilgidir, hukuki görüş değildir.",
    },
  },
];

export const ruleHubByKey = (key: string) => ruleHubs.find(h => h.key === key);
export const hubForSolution = (solution: string) => ruleHubs.find(h => h.solution === solution);
