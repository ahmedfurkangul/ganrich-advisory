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
