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
