import type { Lang } from "./content";

// Long-form guides (EUDR, steel DPP). Text comes from the reviewed article drafts as written;
// inline links use [text](/path) and emphasis uses *text*, rendered by app/guides.tsx.
export type GuideBlock =
  | { t: "h2" | "h3" | "p"; text: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "faq"; items: [string, string][] }
  | { t: "sources"; title: string; items: string[] };
export type GuideText = { path: string; title: string; description: string; h1: string; blocks: GuideBlock[] };
export type Guide = { key: string; solution: string; date: string; checked: Record<Lang, string>; image: string; readingTime: Record<Lang, string>; topic: Record<Lang, string> } & Record<Lang, GuideText>;

export const guides: Guide[] = [
 {
  "key": "guideEudr2026",
  "solution": "solutionEudr",
  "date": "2026-11-02",
  "checked": {
   "en": "2 November 2026",
   "tr": "2 Kasım 2026"
  },
  "image": "guideEudr2026",
  "readingTime": {
   "en": "9 min",
   "tr": "9 dk"
  },
  "topic": {
   "en": "EUDR",
   "tr": "EUDR"
  },
  "en": {
   "path": "insights/eudr-30-december-2026-turkish-exporters",
   "title": "EUDR 30 December 2026: What Your EU Buyer Will Ask For",
   "description": "EUDR applies to large and medium operators from 30 December 2026. What your EU buyer will ask you for: DDS reference, plot geolocation and legality proof.",
   "h1": "EUDR 30 December 2026: what your EU buyer will ask you to send, and by when",
   "blocks": [
    {
     "t": "p",
     "text": "If your EU customer has started sending questionnaires about \"EUDR\", \"geolocation\" or a \"DDS reference\", you are not alone. After two postponements, the EU Deforestation Regulation, Regulation (EU) 2023/1115, now applies to large and medium operators from 30 December 2026 (European Commission, DG ENV, accessed 2 Nov 2026). That is about eight weeks from the planned publication date."
    },
    {
     "t": "p",
     "text": "Most of what is written about EUDR is addressed to the EU importer. This article is written for the other side of the table: the Turkish exporter, processor or supply-chain manager who has to produce the evidence. It is cross-sector. For wood and furniture specifically, see our [EUDR checklist for Turkish wood and furniture exporters](/en/insights/report/eudr-checklist-turkish-wood-furniture-204bc82e)."
    },
    {
     "t": "h2",
     "text": "What changes on 30 December 2026 (and who gets until 30 June 2027)"
    },
    {
     "t": "p",
     "text": "The European Commission's EUDR page, checked on 2 November 2026, lists these application dates (European Commission, DG ENV, accessed 2 Nov 2026):"
    },
    {
     "t": "ul",
     "items": [
      "Large and medium operators: 30 December 2026.",
      "Micro and small operators: 30 June 2027.",
      "Micro and small operators already covered by the EU Timber Regulation (EUTR): 30 December 2026."
     ]
    },
    {
     "t": "p",
     "text": "These dates are the result of two amendments. The first, Regulation (EU) 2024/3234 of 19 December 2024, delayed the original December 2024 start by a year (EUR-Lex). The second, Regulation (EU) 2025/2650 of 19 December 2025, was published in the Official Journal on 23 December 2025 and entered into force on 26 December 2025 (European Commission, DG ENV newsletter, Dec 2025)."
    },
    {
     "t": "p",
     "text": "Practically: your EU buyer, if it is a large or medium company, must be able to show on 30 December 2026 that the relevant goods it places on the EU market are compliant. Its data request to you is therefore due well before that date."
    },
    {
     "t": "h2",
     "text": "Which Turkish exports are caught: commodities and CN codes, not trade names"
    },
    {
     "t": "p",
     "text": "EUDR covers seven commodities: cattle, cocoa, coffee, oil palm, rubber, soya and wood, plus listed derived products such as chocolate, tyres, paper and furniture (European Commission, DG ENV, accessed 2 Nov 2026). Scope is decided by the customs codes in Annex I of Regulation (EU) 2023/1115, not by what the product is called in your catalogue (Reg. (EU) 2023/1115, Annex I as amended by Delegated Regulation (EU) 2026/2102, OJ 17 Sep 2026)."
    },
    {
     "t": "p",
     "text": "Check every product line you ship to the EU against Annex I using its CN code. Typical Turkish hits include sawn wood, panels, pulp, paper and printed matter, wooden furniture, tyres and other natural-rubber products, and processed cocoa or coffee. Cattle hides and leather are no longer on the list (see below)."
    },
    {
     "t": "h2",
     "text": "Who files what: operator, downstream operator, trader"
    },
    {
     "t": "p",
     "text": "The regulation puts the due diligence duty on the operator, the person who first places a relevant product on the EU market or exports it from the EU. The operator submits a due diligence statement (DDS) in the EU Information System, which the Commission launched on 4 December 2024 (European Commission, DG ENV, accessed 2 Nov 2026)."
    },
    {
     "t": "p",
     "text": "In most Turkish export flows, the EU importer is the operator and files the DDS. Your job is to give it the data it needs. Three points need care:"
    },
    {
     "t": "ul",
     "items": [
      "If your Turkish company, or an EU entity in your group, itself places goods on the EU market, it may carry operator duties directly.",
      "Where a company established outside the EU places products on the EU market, the first person established in the EU that makes them available is deemed to be the operator (Reg. (EU) 2023/1115, Art. 7).",
      "The December 2025 amendment, Regulation (EU) 2025/2650 of 19 December 2025, created a new category of \"downstream operator\". Downstream operators and traders no longer submit due diligence statements; the first downstream operator or trader must collect and keep DDS reference numbers (Reg. (EU) 2025/2650, recitals 4-5)."
     ]
    },
    {
     "t": "p",
     "text": "In practice, this means not every EU firm that buys and processes your goods will ask you for data separately; the request will come mainly from the first operator, usually your direct customer. But that customer will expect a complete and consistent pack from you to stand behind its own statement."
    },
    {
     "t": "h2",
     "text": "The data pack your EU buyer will ask for"
    },
    {
     "t": "p",
     "text": "Under Regulation (EU) 2023/1115, a product may be placed on the EU market only if it is deforestation-free, produced in accordance with the relevant legislation of the country of production, and covered by a due diligence statement (Reg. (EU) 2023/1115, Art. 3). \"Deforestation-free\" uses a cut-off date of 31 December 2020 (Reg. (EU) 2023/1115, Art. 2). Expect your buyer to ask for:"
    },
    {
     "t": "ol",
     "items": [
      "Product identification: description, CN code, quantity, and the country of production.",
      "Geolocation of all plots of land where the commodity was produced, as points or, for larger plots, polygons (Reg. (EU) 2023/1115, Art. 9). Coordinates need at least six decimal digits; plots of more than four hectares, for commodities other than cattle, must be given as polygons describing the perimeter.",
      "Evidence that the land was not deforested after 31 December 2020, for example satellite-based checks against the plots.",
      "Legality evidence: documents showing production complied with relevant laws in the country of production, such as land-use rights, forestry and environmental rules, labour and tax rules.",
      "Supplier chain information: names and addresses of suppliers and of the customers you sell to.",
      "A DDS reference number if an earlier operator in the chain has already filed one, so the buyer can refer to it. Operators must pass DDS reference numbers, or declaration identifiers, down the supply chain (Reg. (EU) 2023/1115, Art. 4(7) as amended by Reg. (EU) 2025/2650). At the border, the DDS reference number or declaration identifier must be made available to customs before release for free circulation or export, normally by the person lodging the customs declaration (Art. 26(4) as amended). So the reference number should sit in the shipment file with the invoice and origin documents."
     ]
    },
    {
     "t": "p",
     "text": "The hard part is rarely the form. It is getting plot-level geolocation from the start of a chain you do not control."
    },
    {
     "t": "h2",
     "text": "Sector notes for Türkiye"
    },
    {
     "t": "ul",
     "items": [
      "Wood, pulp and paper: much Turkish timber, pulp and paper is imported, so geolocation must come from the original forest supplier abroad. Map where each input batch comes from. Our [wood and furniture checklist](/en/insights/report/eudr-checklist-turkish-wood-furniture-204bc82e) covers this in detail.",
      "Leather: cattle hides, skins and leather (ex 4101, 4104, 4107) were removed from Annex I by Delegated Regulation (EU) 2026/2102, in force since 18 September 2026. Check remaining cattle codes, such as live cattle and meat, at eight-digit level.",
      "Rubber and tyres: natural rubber is imported, mostly from Southeast Asia. Tyres remain in scope; several technical-rubber codes (belts, ex 4016) were removed in September 2026 (Delegated Reg. (EU) 2026/2102). Check each code.",
      "Cocoa and coffee processors: chocolate makers and roasters need plot data for every origin. Note the new scope from December 2027 below."
     ]
    },
    {
     "t": "h2",
     "text": "What the December 2025 amendment simplified, and what it did not"
    },
    {
     "t": "p",
     "text": "The text of Regulation (EU) 2025/2650 shows three points that matter to exporters: downstream operators and traders no longer file DDSs; \"micro or small primary operators\", meaning micro or small producers established in a country classified as low risk that place their own produce on the market, submit a one-time simplified declaration and receive a declaration identifier; and the first downstream actor must collect reference numbers and declaration identifiers (Reg. (EU) 2025/2650, recitals 4-6). The 30 June 2027 date applies to micro and small undertakings established as such by 31 December 2024, except for products covered by the EU Timber Regulation (amended Art. 38(3))."
    },
    {
     "t": "p",
     "text": "Türkiye is classified low risk (Implementing Reg. (EU) 2025/1093). That allows simplified due diligence only for commodities produced in Türkiye, not for imported timber, pulp or rubber processed here."
    },
    {
     "t": "h2",
     "text": "The conversation to have with your EU buyer"
    },
    {
     "t": "p",
     "text": "The Regulation requires the operator, before placing a product on the market, to collect information, assess risk and, where needed, mitigate it (Reg. (EU) 2023/1115, Art. 8). Your customer will build all of these steps on the information you provide, so start the conversation yourself instead of waiting for their form:"
    },
    {
     "t": "ul",
     "items": [
      "Format: their own portal, a spreadsheet template or a GeoJSON file? In what format do they want coordinates?",
      "Batch matching: do they expect location data per shipment, per order or per year? Where inputs of different origins are mixed in one batch, do they want all possible plots?",
      "Confidentiality: your supplier names and plot data have commercial value. Put in the contract that shared data will be used only for compliance.",
      "Liability: review together what happens if the data turn out to be wrong, and the warranty and indemnity clauses in the contract."
     ]
    },
    {
     "t": "h2",
     "text": "New scope from 30 December 2027"
    },
    {
     "t": "p",
     "text": "Commission Delegated Regulation (EU) 2026/2102 adds new products to EUDR scope from 30 December 2027, including soluble coffee, certain palm oil derivatives and frozen cattle tongues (European Commission, DG ENV, accessed 2 Nov 2026). Food exporters who assumed they were outside EUDR should recheck their CN codes against the delegated act."
    },
    {
     "t": "h2",
     "text": "An eight-week action list"
    },
    {
     "t": "ol",
     "items": [
      "Week 1: map every EU-bound product line to its CN code and check it against Annex I.",
      "Week 1-2: ask each EU buyer in writing what format they want: their own portal, a spreadsheet, or a DDS reference.",
      "Week 2-4: collect plot geolocation and legality documents from upstream suppliers; flag gaps by supplier.",
      "Week 3-6: run deforestation checks on plots against the 31 December 2020 cut-off, or confirm who will.",
      "Week 5-8: build a repeatable batch-level file that links each shipment to its plots and documents.",
      "Throughout: recheck the Commission page for any change; we last confirmed the dates on 2 November 2026."
     ]
    },
    {
     "t": "p",
     "text": "Track related deadlines on our [EU regulation calendar](/en/insights/eu-regulation-calendar), and see how we organise supplier data in [supplier sustainability data](/en/solutions/supplier-sustainability-data)."
    },
    {
     "t": "h2",
     "text": "FAQ"
    },
    {
     "t": "faq",
     "items": [
      [
       "Does a Turkish exporter file the due diligence statement?",
       "Usually not. Where a non-EU company places goods on the EU market, the first EU-established person making them available is deemed the operator (Reg. (EU) 2023/1115, Art. 7), and that operator files the DDS in the EU Information System. Your job is the data."
      ],
      [
       "Is an FSC or PEFC certificate enough?",
       "Do not assume so. The regulation requires geolocation, a deforestation-free check against 31 December 2020, and legality evidence (Reg. (EU) 2023/1115, Arts. 2, 3, 9). The regulation says certification or other third-party verified schemes can be used in risk assessment but should not substitute the operator's responsibility for due diligence (Reg. (EU) 2023/1115, recital 52)."
      ],
      [
       "Are goods ordered before 30 December 2026 exempt?",
       "Not automatically. What counts is when goods are placed on the EU market. One specific transitional rule: timber and timber products produced before 29 June 2023 and placed on the market from 30 December 2026 stay under the EU Timber Regulation until 31 December 2029 (Reg. (EU) 2023/1115, Art. 37 as amended by Reg. (EU) 2025/2650)."
      ]
     ]
    },
    {
     "t": "p",
     "text": "Not sure where you stand? Take the [EUDR readiness check](/en/decision-lab/eudr-readiness-check) or book an [EUDR traceability review](/en/solutions/eudr-traceability)."
    },
    {
     "t": "sources",
     "title": "Sources",
     "items": [
      "European Commission, DG ENV, \"Regulation on Deforestation-free products\" (accessed 2 Nov 2026): https://environment.ec.europa.eu/topics/forests/deforestation/regulation-deforestation-free-products_en",
      "European Commission, DG ENV newsletter, \"EU Deforestation Regulation updates – Final text of EUDR is now published online\" (Dec 2025; in force 26 Dec 2025): https://ec.europa.eu/newsroom/env/newsletter-archives/70716",
      "Regulation (EU) 2023/1115 (31 May 2023), EUR-Lex (text read 2 Nov 2026): https://eur-lex.europa.eu/eli/reg/2023/1115/oj",
      "Regulation (EU) 2024/3234 (19 Dec 2024), EUR-Lex: https://eur-lex.europa.eu/eli/reg/2024/3234/oj",
      "Regulation (EU) 2025/2650 of 19 Dec 2025 (OJ 23 Dec 2025), EUR-Lex (text read 2 Nov 2026): https://eur-lex.europa.eu/eli/reg/2025/2650/oj",
      "Commission Delegated Regulation (EU) 2026/2102 of 13 July 2026 (OJ L, 17.9.2026), EUR-Lex: https://eur-lex.europa.eu/eli/reg_del/2026/2102/oj (read live 2 Nov 2026)",
      "Commission Implementing Regulation (EU) 2025/1093 (country classification; Türkiye listed low risk), EUR-Lex: https://eur-lex.europa.eu/eli/reg_impl/2025/1093/oj/eng (read live 2 Nov 2026)"
     ]
    }
   ]
  },
  "tr": {
   "path": "icgoruler/eudr-30-aralik-2026-ihracatci",
   "title": "EUDR 30 Aralık 2026: AB Alıcınız Sizden Ne İsteyecek?",
   "description": "EUDR 30 Aralık 2026'da büyük ve orta ölçekli işletmecilere uygulanıyor. AB alıcınızın sizden isteyeceği DDS referansı, parsel konumu ve yasallık kanıtı.",
   "h1": "EUDR 30 Aralık 2026: AB alıcınız sizden hangi belgeyi, ne zamana kadar isteyecek?",
   "blocks": [
    {
     "t": "p",
     "text": "30 Aralık 2026. AB'nin Ormansızlaşmanın Önlenmesi Tüzüğü (EUDR, (AB) 2023/1115 sayılı Tüzük), iki kez ertelendikten sonra büyük ve orta ölçekli işletmeciler için bu tarihte uygulanmaya başlıyor (Avrupa Komisyonu, DG ENV, erişim 2 Kasım 2026). Planlanan yayın tarihi itibarıyla geriye yaklaşık sekiz hafta kalıyor."
    },
    {
     "t": "p",
     "text": "AB'deki müşteriniz \"coğrafi konum\", \"DDS referans numarası\" ya da \"özen yükümlülüğü\" konulu bir form gönderdiyse yalnız değilsiniz. EUDR üzerine yazılanların çoğu AB'deki ithalatçıya sesleniyor. Bu yazı ise masanın öbür tarafına, yani belgeyi hazırlaması gereken Türk ihracatçıya, fason üreticiye ve tedarik zinciri yöneticisine odaklanıyor ve sektörler arası bir bakış sunuyor. Yalnızca ahşap ve mobilya ile ilgileniyorsanız [ahşap ve mobilya ihracatçıları için EUDR kontrol listemize](/tr/icgoruler/rapor/eudr-kontrol-listesi-ahsap-mobilya-a607fc4b) bakabilirsiniz."
    },
    {
     "t": "h2",
     "text": "30 Aralık 2026'da ne değişiyor, kimin 30 Haziran 2027'ye kadar süresi var?"
    },
    {
     "t": "p",
     "text": "Avrupa Komisyonu'nun EUDR sayfasında 2 Kasım 2026 itibarıyla yer alan uygulama tarihleri şöyle (Avrupa Komisyonu, DG ENV, erişim 2 Kasım 2026):"
    },
    {
     "t": "ul",
     "items": [
      "Büyük ve orta ölçekli işletmeciler: 30 Aralık 2026",
      "Mikro ve küçük işletmeciler: 30 Haziran 2027",
      "Hâlihazırda AB Kereste Tüzüğü (EUTR) kapsamındaki mikro ve küçük işletmeciler: 30 Aralık 2026"
     ]
    },
    {
     "t": "p",
     "text": "Bu takvim iki değişikliğin sonucu. İlkinde, 19 Aralık 2024 tarihli (AB) 2024/3234 sayılı Tüzük, Aralık 2024'teki ilk başlangıç tarihini bir yıl erteledi (EUR-Lex). İkincisi, 19 Aralık 2025 tarihli (AB) 2025/2650 sayılı Tüzük 23 Aralık 2025'te AB Resmî Gazetesi'nde yayımlandı ve 26 Aralık 2025'te yürürlüğe girdi (Avrupa Komisyonu, DG ENV bülteni, Aralık 2025)."
    },
    {
     "t": "p",
     "text": "Pratikteki sonucu şu: AB'deki alıcınız büyük ya da orta ölçekliyse, 30 Aralık 2026'da piyasaya sürdüğü ürünlerin uyumlu olduğunu gösterebilmek zorunda. Dolayısıyla sizden veri talebi bu tarihten epey önce gelecek."
    },
    {
     "t": "h2",
     "text": "Hangi ihracat kalemleri kapsamda? Ticari ad değil, GTİP/KN kodu belirler"
    },
    {
     "t": "p",
     "text": "EUDR yedi emtiayı kapsıyor: sığır, kakao, kahve, palmiye yağı, kauçuk, soya ve ahşap; ayrıca çikolata, lastik, kâğıt ve mobilya gibi bunlardan türetilen ürünler (Avrupa Komisyonu, DG ENV, erişim 2 Kasım 2026). Kapsamı ürünün kataloğunuzdaki adı değil, Tüzüğün Ek I'indeki Kombine Nomenklatür (KN) kodları belirliyor ((AB) 2023/1115, (AB) 2026/2102 sayılı Yetki Devrine Dayanan Tüzük ile değiştirilmiş Ek I, AB Resmî Gazetesi 17 Eylül 2026)."
    },
    {
     "t": "p",
     "text": "AB'ye gönderdiğiniz her ürün satırını GTİP'i üzerinden Ek I ile karşılaştırın. Türkiye için tipik kalemler: biçilmiş kereste, levha, selüloz, kâğıt ve basılı ürünler, ahşap mobilya, lastik ve diğer doğal kauçuk ürünleri, işlenmiş kakao ve kahve. Sığır derisi ve işlenmiş deri artık listede değil (aşağıya bakın)."
    },
    {
     "t": "h2",
     "text": "Kim neyi beyan eder: işletmeci, alt işletmeci, tüccar"
    },
    {
     "t": "p",
     "text": "Tüzük özen yükümlülüğünü (due diligence), ilgili ürünü AB piyasasına ilk kez arz eden ya da AB'den ihraç eden işletmeciye yüklüyor. İşletmeci, Komisyon'un 4 Aralık 2024'te devreye aldığı AB Bilgi Sistemi'nde bir özen yükümlülüğü beyanı (DDS) sunuyor (Avrupa Komisyonu, DG ENV, erişim 2 Kasım 2026)."
    },
    {
     "t": "p",
     "text": "Türk ihracatının çoğunda işletmeci AB'deki ithalatçıdır ve DDS'yi o verir. Sizin göreviniz ona gereken veriyi sağlamaktır. Üç noktaya dikkat etmek gerekiyor:"
    },
    {
     "t": "ul",
     "items": [
      "Şirketiniz ya da grubunuzdaki bir AB şirketi malı AB piyasasına kendisi arz ediyorsa, işletmeci yükümlülükleri doğrudan size düşebilir.",
      "AB dışında yerleşik bir şirket ürünü AB piyasasına arz ettiğinde, ürünü AB'de piyasada bulunduran ilk AB yerleşik kişi işletmeci sayılır ((AB) 2023/1115, Madde 7).",
      "19 Aralık 2025 tarihli (AB) 2025/2650 sayılı Tüzük yeni bir \"alt işletmeci\" (downstream operator) kategorisi getirdi. Alt işletmeciler ve tüccarlar artık özen yükümlülüğü beyanı vermiyor; zincirdeki ilk alt işletmeci ya da tüccar DDS referans numaralarını toplayıp saklamakla yükümlü ((AB) 2025/2650, gerekçe 4-5)."
     ]
    },
    {
     "t": "p",
     "text": "Bunun Türk ihracatçı için pratik anlamı şu: AB'de malınızı alan ve işleyen her firma ayrı ayrı sizden veri istemeyecek; veriyi esas olarak ilk işletmeci, yani çoğunlukla doğrudan müşteriniz isteyecek. Ancak o müşteri kendi beyanının arkasında durabilmek için sizden eksiksiz ve tutarlı bir paket bekleyecek."
    },
    {
     "t": "h2",
     "text": "AB alıcınızın isteyeceği veri paketi"
    },
    {
     "t": "p",
     "text": "(AB) 2023/1115'e göre bir ürün ancak ormansızlaşmaya yol açmamışsa, üretildiği ülkenin mevzuatına uygun üretilmişse ve bir özen yükümlülüğü beyanı ile kapsanıyorsa AB piyasasına arz edilebilir (Madde 3). \"Ormansızlaşmaya yol açmamış\" tanımında kesim tarihi 31 Aralık 2020'dir (Madde 2). Alıcınızın şunları istemesini bekleyin:"
    },
    {
     "t": "ol",
     "items": [
      "Ürün bilgisi: tanım, KN/GTİP kodu, miktar ve üretim ülkesi.",
      "Tüm üretim parsellerinin coğrafi konumu: nokta ya da büyük parsellerde poligon olarak (Madde 9). Koordinatlar en az altı ondalık basamaklı olmalı; sığır dışındaki emtialarda dört hektarı aşan parseller için sınırı tarif eden poligon gerekiyor.",
      "31 Aralık 2020'den sonra ormansızlaşma olmadığına dair kanıt: örneğin parsellerin uydu verisiyle kontrolü.",
      "Yasallık kanıtı: arazi kullanım hakkı, orman ve çevre mevzuatı, iş ve vergi mevzuatı gibi üretim ülkesi kurallarına uyumu gösteren belgeler.",
      "Tedarik zinciri bilgisi: tedarikçilerinizin ve sattığınız müşterilerin unvan ve adresleri.",
      "DDS referans numarası: zincirde daha önce beyan verilmişse alıcı ona atıf yapabilmeli. İşletmeciler DDS referans numaralarını veya beyan tanımlayıcılarını zincirin aşağısına iletmek zorunda ((AB) 2025/2650 ile değişik Madde 4(7)). Gümrükte ise serbest dolaşıma giriş ya da ihracat öncesinde DDS referans numarası veya beyan tanımlayıcısı gümrük idaresine sunulmalı; bunu kural olarak gümrük beyannamesini veren kişi yapar (değişik Madde 26(4)). Bu yüzden referans numarası, fatura ve menşe belgeleriyle birlikte sevkiyat dosyasının parçası olmalı."
     ]
    },
    {
     "t": "p",
     "text": "Zor olan formu doldurmak değil; kontrolünüzde olmayan bir zincirin başındaki parselin koordinatını elde etmek."
    },
    {
     "t": "h2",
     "text": "Türkiye için sektör notları"
    },
    {
     "t": "ul",
     "items": [
      "Ahşap, selüloz ve kâğıt: Türkiye'de kullanılan kereste, selüloz ve kağıdın önemli bir kısmı ithal. Coğrafi konum yurt dışındaki orman tedarikçisinden gelmek zorunda. Her girdi partisinin kaynağını haritalayın. Ayrıntı için [ahşap ve mobilya kontrol listesi](/tr/icgoruler/rapor/eudr-kontrol-listesi-ahsap-mobilya-a607fc4b).",
      "Deri: sığır ham derisi, derisi ve işlenmiş derisi (ex 4101, 4104, 4107), 18 Eylül 2026'dan beri yürürlükte olan (AB) 2026/2102 sayılı Yetki Devrine Dayanan Tüzük ile Ek I'den çıkarıldı. Canlı sığır ve et gibi kalan sığır kodlarını sekiz haneli düzeyde kontrol edin.",
      "Kauçuk ve lastik: doğal kauçuk ithal, çoğunlukla Güneydoğu Asya'dan. Lastikler kapsamda kalıyor; bazı teknik kauçuk kodları (kayışlar, ex 4016) Eylül 2026'da çıkarıldı ((AB) 2026/2102). Her kodu tek tek kontrol edin.",
      "Kakao ve kahve işleyenler: çikolata üreticileri ve kavurucular her menşe için parsel verisine ihtiyaç duyar. Aşağıdaki Aralık 2027 genişlemesine de bakın."
     ]
    },
    {
     "t": "h2",
     "text": "Aralık 2025 değişikliği neyi sadeleştirdi, neyi değiştirmedi?"
    },
    {
     "t": "p",
     "text": "(AB) 2025/2650 metnine göre ihracatçıyı en çok ilgilendiren üç nokta var:"
    },
    {
     "t": "ul",
     "items": [
      "Alt işletmeci ve tüccarlar beyan vermiyor. Yük, zincirin başındaki işletmecide ve ilk alt halkada toplanıyor.",
      "Mikro veya küçük birincil işletmeci. Düşük riskli olarak sınıflandırılmış bir ülkede yerleşik olup kendi yetiştirdiği, hasat ettiği ya da beslediği ürünü piyasaya arz eden mikro veya küçük işletmeler, her sevkiyat için DDS yerine tek seferlik basitleştirilmiş beyan veriyor ve bir beyan tanımlayıcısı alıyor. AB içi ve dışı işletmeciler bu tanıma girebiliyor (gerekçe 6). Türkiye düşük riskli olarak sınıflandırıldı ((AB) 2025/1093 sayılı Uygulama Tüzüğü). Bu, basitleştirilmiş özen yükümlülüğünü yalnızca Türkiye'de üretilen emtialar için mümkün kılıyor; Türkiye'de işlenen ithal kereste, selüloz ya da kauçuk için değil.",
      "Küçük işletme tarihi. 30 Haziran 2027, 31 Aralık 2024 itibarıyla mikro veya küçük işletme olarak kurulmuş olanlara uygulanıyor; EUTR kapsamındaki ürünler bu ertelemeden yararlanmıyor ve 30 Aralık 2026'ya tabi (değişik Madde 38(3))."
     ]
    },
    {
     "t": "h2",
     "text": "AB alıcınızla yapmanız gereken konuşma"
    },
    {
     "t": "p",
     "text": "Tüzük işletmeciye, ürünü piyasaya arz etmeden önce bilgi toplama, riski değerlendirme ve gerekirse riski azaltma adımlarından oluşan bir özen yükümlülüğü getiriyor ((AB) 2023/1115, Madde 8). Müşteriniz bu adımların hepsini sizin verdiğiniz bilgiye dayandıracak. Bu yüzden konuşmayı ondan gelecek formu beklemeden siz başlatın:"
    },
    {
     "t": "ul",
     "items": [
      "Format: Kendi portalı mı, Excel şablonu mu, GeoJSON dosyası mı? Koordinatları hangi biçimde istiyor?",
      "Parti eşleştirmesi: Konum verisini sevkiyat, sipariş ya da yıllık bazda mı bekliyor? Farklı menşeli girdilerin aynı partide karıştığı ürünlerde tüm olası parselleri mi istiyor?",
      "Gizlilik: Tedarikçi adlarınız ve parsel verileriniz ticari değer taşıyor. Paylaşılan verinin yalnızca uyum amacıyla kullanılacağını sözleşmeye yazdırın.",
      "Sorumluluk: Veride hata çıkarsa ne olacağını, sözleşmedeki garanti ve tazmin maddelerini birlikte gözden geçirin."
     ]
    },
    {
     "t": "h2",
     "text": "30 Aralık 2027'den itibaren yeni kapsam"
    },
    {
     "t": "p",
     "text": "(AB) 2026/2102 sayılı Komisyon Yetki Devrine Dayanan Tüzüğü, aralarında çözünür (hazır) kahve, bazı palmiye yağı türevleri ve dondurulmuş sığır dilinin bulunduğu yeni ürünleri 30 Aralık 2027'den itibaren EUDR kapsamına alıyor (Avrupa Komisyonu, DG ENV, erişim 2 Kasım 2026). Kapsam dışında olduğunu düşünen gıda ihracatçıları GTİP'lerini bu tüzükle yeniden kontrol etmeli."
    },
    {
     "t": "h2",
     "text": "Sekiz haftalık eylem listesi"
    },
    {
     "t": "ol",
     "items": [
      "1. hafta: AB'ye giden her ürün satırını GTİP ile eşleyin, Ek I ile karşılaştırın.",
      "1-2. hafta: her AB alıcınıza yazılı olarak hangi formatı istediğini sorun: kendi portalı mı, tablo mu, DDS referansı mı?",
      "2-4. hafta: tedarikçilerden parsel koordinatı ve yasallık belgelerini toplayın; eksikleri tedarikçi bazında işaretleyin.",
      "3-6. hafta: parsellerin 31 Aralık 2020 kesim tarihine göre kontrolünü yaptırın ya da kimin yapacağını netleştirin.",
      "5-8. hafta: her sevkiyatı parsel ve belgelerine bağlayan, parti bazlı ve tekrarlanabilir bir dosya kurun.",
      "Sürekli: Komisyon sayfasını takip edin; tarihleri en son 2 Kasım 2026'da kontrol ettik."
     ]
    },
    {
     "t": "p",
     "text": "İlgili tarihler için [AB mevzuat takvimimize](/tr/icgoruler/ab-mevzuat-takvimi), tedarikçi verisini nasıl düzenlediğimiz için [tedarikçi sürdürülebilirlik verisi](/tr/cozumler/tedarikci-surdurulebilirlik-verisi) sayfasına bakabilirsiniz."
    },
    {
     "t": "h2",
     "text": "Sıkça sorulan sorular"
    },
    {
     "t": "faq",
     "items": [
      [
       "Özen yükümlülüğü beyanını (DDS) Türk ihracatçı mı verir?",
       "Genellikle hayır. AB dışındaki bir şirket malı AB piyasasına arz ettiğinde, ürünü piyasada bulunduran ilk AB yerleşik kişi işletmeci sayılır ((AB) 2023/1115, Madde 7) ve DDS'yi AB Bilgi Sistemi'nde o verir. Sizin işiniz, veriyi eksiksiz sağlamak."
      ],
      [
       "FSC veya PEFC sertifikası yeterli mi?",
       "Öyle varsaymayın. Tüzük coğrafi konum, 31 Aralık 2020'ye göre ormansızlaşma kontrolü ve yasallık kanıtı istiyor (Madde 2, 3, 9). Tüzüğe göre sertifikasyon ya da üçüncü taraf doğrulamalı sistemler risk değerlendirmesinde kullanılabilir, ancak işletmecinin özen yükümlülüğü sorumluluğunun yerine geçmez ((AB) 2023/1115, gerekçe 52)."
      ],
      [
       "30 Aralık 2026'dan önce sipariş edilen mallar muaf mı?",
       "Otomatik olarak değil. Belirleyici olan malın AB piyasasına arz edildiği tarih. Özel bir geçiş hükmü var: 29 Haziran 2023'ten önce üretilip 30 Aralık 2026'dan itibaren piyasaya arz edilen kereste ve kereste ürünleri 31 Aralık 2029'a kadar AB Kereste Tüzüğü'ne tabi kalıyor (değişik Madde 37)."
      ]
     ]
    },
    {
     "t": "p",
     "text": "Nerede durduğunuzdan emin değil misiniz? [EUDR hazırlık testini](/tr/karar-laboratuvari/eudr-hazirlik-testi) yapın ya da bir [EUDR izlenebilirlik değerlendirmesi](/tr/cozumler/eudr-izlenebilirlik) planlayın."
    },
    {
     "t": "sources",
     "title": "Kaynaklar",
     "items": [
      "Avrupa Komisyonu, DG ENV, \"Regulation on Deforestation-free products\" (erişim 2 Kasım 2026)",
      "Avrupa Komisyonu, DG ENV bülteni, (AB) 2025/2650 yayımı (Aralık 2025; yürürlük 26 Aralık 2025)",
      "(AB) 2023/1115, (AB) 2024/3234, (AB) 2025/2650, (AB) 2026/2102 sayılı tüzükler, EUR-Lex",
      "(AB) 2023/1115 ve (AB) 2025/2650 metinleri EUR-Lex'ten 2 Kasım 2026'da okundu."
     ]
    }
   ]
  }
 },
 {
  "key": "guideSteelDpp",
  "solution": "solutionCbam",
  "date": "2026-11-02",
  "checked": {
   "en": "2 November 2026",
   "tr": "2 Kasım 2026"
  },
  "image": "guideSteelDpp",
  "readingTime": {
   "en": "10 min",
   "tr": "10 dk"
  },
  "topic": {
   "en": "ESPR · Digital Product Passport",
   "tr": "ESPR · Dijital Ürün Pasaportu"
  },
  "en": {
   "path": "insights/steel-digital-product-passport-espr-turkiye",
   "title": "Steel Digital Product Passport: What ESPR Means for Türkiye",
   "description": "Iron and steel is first in line among ESPR product groups on the Commission's DPP timeline. What a steel passport may ask of Turkish mills, and what is open.",
   "h1": "The steel Digital Product Passport: what ESPR means for Turkish mills, and what is still open",
   "blocks": [
    {
     "t": "p",
     "text": "Turkish steel exporters have spent 2026 learning to supply embedded-emissions data to EU CBAM declarants. The next EU data requirement is already on the calendar. The European Commission's Digital Product Passport (DPP) timeline lists the ecodesign delegated act for iron and steel for adoption in Q4 2026, first in line among product groups under the Ecodesign for Sustainable Products Regulation (European Commission, DG GROW, accessed 2 Nov 2026)."
    },
    {
     "t": "p",
     "text": "This article separates what is decided from what is not, so a steel or metals export manager can plan 2027 without guessing."
    },
    {
     "t": "h2",
     "text": "What is decided today"
    },
    {
     "t": "ul",
     "items": [
      "The legal basis. The DPP rests on the Ecodesign for Sustainable Products Regulation, Regulation (EU) 2024/1781 (ESPR). Product-specific DPP requirements come either from ESPR delegated acts or from separate EU laws such as the Batteries Regulation and the Construction Products Regulation (European Commission, DG GROW, accessed 2 Nov 2026).",
      "The registry. Commission Implementing Regulation (EU) 2026/1778 on the DPP registry was published in the Official Journal on 17 July 2026 (T.C. Ticaret Bakanlığı, DPP page, accessed 2 Nov 2026). The Commission says the registry became operational on 20 July 2026 (European Commission, DG GROW).",
      "What the registry holds. It stores the unique identifier of each product with mandatory registration data. The full product information is kept by the economic operator or a DPP service provider. A data carrier such as a QR code links the product to its passport, and for imported products the registry's unique registration identifier can be checked at customs (European Commission, DG GROW).",
      "Standards. The first six DPP standards were published in the Official Journal by July 2026 (Ticaret Bakanlığı); the Commission expects an implementing decision on the remaining two in November 2026 (European Commission, DG GROW)."
     ]
    },
    {
     "t": "h2",
     "text": "What ESPR itself already says about the passport"
    },
    {
     "t": "p",
     "text": "Even without a steel act, the framework regulation fixes the architecture. ESPR's recitals say (Regulation (EU) 2024/1781 of 13 June 2024, recitals):"
    },
    {
     "t": "ul",
     "items": [
      "The passport should be linked to a unique product identifier and, where appropriate, to a unique operator identifier and a unique facility identifier, so that the actors and manufacturing facilities related to a product can be traced. These identifiers and the data carrier should follow internationally recognised standards.",
      "The passport should let economic operators, named as manufacturers, authorised representatives, importers, distributors, dealers and fulfilment service providers, access, introduce or update data, without endangering the protection of confidential business information.",
      "Data should be accurate, complete and up to date, and the passport can be complemented by non-digital information such as a label or product manual."
     ]
    },
    {
     "t": "p",
     "text": "For a Turkish mill, the facility identifier is the notable point: it ties a product to the plant where it was made, much as CBAM ties emissions to an installation. Whether the steel act requires it is for the act to decide."
    },
    {
     "t": "h2",
     "text": "Steel is first in line for ESPR, and why it matters for Türkiye"
    },
    {
     "t": "p",
     "text": "The Commission's list of planned ESPR delegated acts puts iron and steel in 2026, ahead of textiles, tyres and aluminium (2027), furniture (2028), and mattresses and ICT products (2029) (European Commission, DG GROW, accessed 2 Nov 2026)."
    },
    {
     "t": "p",
     "text": "For Türkiye this is a direct exposure. Turkish mills that ship to the EU already deal with CBAM ([our CBAM data readiness service](/en/solutions/cbam-data-readiness)). A steel passport would add a product-level information duty at the point of placing on the EU market."
    },
    {
     "t": "p",
     "text": "The difference matters. Under CBAM the declaration duty sits with the EU importer, and the Turkish installation supplies emissions data. Under the DPP the information is tied to the product itself: the data carrier on the product or batch, the registry record and the identifier that customs can check are links in one chain (European Commission, DG GROW). Data readiness is therefore not only a job for the environment or sustainability team; it involves production planning, quality, shipping and IT. Which data sit with whom, how they are shared with the EU buyer and how commercially sensitive data are protected are questions to start discussing now."
    },
    {
     "t": "h2",
     "text": "Timeline: what comes when"
    },
    {
     "t": "p",
     "text": "The Commission publishes an indicative timeline, subject to change (European Commission, DG GROW, accessed 2 Nov 2026):"
    },
    {
     "t": "table",
     "head": [
      "When",
      "What"
     ],
     "rows": [
      [
       "20 Jul 2026",
       "DPP registry operational"
      ],
      [
       "Nov 2026",
       "Implementing decision on the remaining two DPP standards"
      ],
      [
       "Q4 2026",
       "Adoption of the ESPR delegated act for iron and steel"
      ],
      [
       "18 Feb 2027",
       "DPP mandatory for certain batteries (EV, light means of transport, industrial)"
      ],
      [
       "Q2-Q3 2027",
       "Delegated act for DPP service providers (Ticaret Bakanlığı: Q3 2027)"
      ],
      [
       "Q3-Q4 2027",
       "Delegated acts for textiles, aluminium and tyres"
      ],
      [
       "2028",
       "Furniture"
      ]
     ]
    },
    {
     "t": "p",
     "text": "The key planning rule: after an ESPR delegated act is adopted, economic operators get a transition period of at least 18 months (European Commission, DG GROW). If the steel act is adopted in Q4 2026, obligations would not apply before mid-2028 at the earliest, and later if adoption slips (Ganrich calculation from the Commission's indicative dates; the actual date will be set in the act)."
    },
    {
     "t": "h2",
     "text": "What a steel passport is likely to hold, and what is still open"
    },
    {
     "t": "table",
     "head": [
      "Decided",
      "Not decided (as of 2 Nov 2026)"
     ],
     "rows": [
      [
       "Legal basis (ESPR) and registry rules",
       "Exact data fields for steel"
      ],
      [
       "Iron and steel is first in line among ESPR delegated acts, planned Q4 2026",
       "Whether performance thresholds (e.g. for carbon) are set, and at what level"
      ],
      [
       "Transition of at least 18 months after adoption",
       "Which steel products and CN codes are in scope"
      ],
      [
       "Product identifier + data carrier + customs check of the registry identifier",
       "Whether information is per batch, per product model or per installation"
      ]
     ]
    },
    {
     "t": "p",
     "text": "The Commission says a DPP may, depending on the product group, include information on safety, origin, materials, repairability, environmental performance, reuse and recycling (European Commission, DG GROW). For steel specifically, the Commission's call for evidence (published 20 May 2026, Have Your Say initiative 17672) lists the policy options under assessment: information requirements on the carbon footprint of iron and steel products, on recycled content and on substances that make them harder to recycle; performance classes and minimum environmental performance thresholds, based for example on carbon footprint; and digital product passport requirements for all actors in the supply chain. The initiative will also define \"low-carbon steel\" for the Industrial Accelerator Act. As of 2 November 2026, no draft act had been published for feedback (Have Your Say initiative 17672; secondary: Publicea, 28 Oct 2026)."
    },
    {
     "t": "h2",
     "text": "How DPP and CBAM data overlap"
    },
    {
     "t": "p",
     "text": "*This section is Ganrich analysis, not a regulatory fact.* CBAM already requires installation-level embedded emissions for steel. If the steel delegated act includes a carbon-footprint field, mills that already have verified CBAM monitoring will likely start ahead. The methods may differ (CBAM embedded emissions versus a product footprint method), so do not assume one number will serve both. Build one emissions data set that can be traced to source, and keep the method choices documented."
    },
    {
     "t": "h2",
     "text": "What the Turkish Ministry of Trade is telling exporters"
    },
    {
     "t": "p",
     "text": "The Ministry of Trade has a DPP information page on EU technical regulation alignment (accessed 2 Nov 2026) and published a DPP frequently-asked-questions document on 24 June 2026. On 15 October 2026 the Ministry of Trade opened a DPP question-collection survey (Ministry of Trade, announcement, 15 Oct 2026), which TOBB relayed to chambers on 20 October 2026. If you received it, it is worth answering: it is how Turkish industry's questions reach the authorities."
    },
    {
     "t": "h2",
     "text": "Five things to prepare in 2027"
    },
    {
     "t": "ol",
     "items": [
      "Product inventory: list EU-bound steel products by CN code, grade and mill, so scope can be checked the day the act is published.",
      "Identifiers: decide how you will give each product or batch a unique identifier and data carrier (marking, labels, certificates).",
      "Emissions data: keep CBAM monitoring running at verified quality; it is your best base for any carbon field.",
      "Recycled content: document scrap inputs and their sources by heat or batch.",
      "Service provider decision: decide whether you will host passport data yourself or use a DPP service provider; rules for providers are expected in 2027."
     ]
    },
    {
     "t": "p",
     "text": "Our [supplier sustainability data](/en/solutions/supplier-sustainability-data) work and the [textile product passport report](/en/insights/report/textile-product-passport-turkish-suppliers-eb264118) show how this works in practice; for batteries see [battery passport readiness](/en/solutions/battery-passport-readiness). Track dates on the [EU regulation calendar](/en/insights/eu-regulation-calendar)."
    },
    {
     "t": "h2",
     "text": "FAQ"
    },
    {
     "t": "faq",
     "items": [
      [
       "Is a Digital Product Passport mandatory for steel today?",
       "No. Obligations start only after the iron and steel delegated act is adopted and its transition period of at least 18 months ends (European Commission, DG GROW, accessed 2 Nov 2026)."
      ],
      [
       "What is the first mandatory DPP?",
       "Certain batteries, from 18 February 2027 (European Commission, DG GROW)."
      ],
      [
       "When is the steel act expected?",
       "Q4 2026 on the Commission's indicative timeline."
      ],
      [
       "Does the EU registry store all our product data?",
       "No. It stores unique identifiers and mandatory registration data; full product information is held by the operator or a DPP service provider (European Commission, DG GROW; Implementing Reg. (EU) 2026/1778)."
      ],
      [
       "Will customs check the passport?",
       "For imported products, the registry's unique registration identifier can be checked at customs (European Commission, DG GROW; Ministry of Trade)."
      ],
      [
       "Will our commercially sensitive data be public?",
       "Access will be managed by user role (DG GROW); the steel act will decide which field is open to whom."
      ],
      [
       "Has a draft steel act been published?",
       "No. As of 2 November 2026, no draft had been published for feedback (Have Your Say initiative 17672). Recheck on publication day."
      ],
      [
       "Will our CBAM emissions data be reused?",
       "Not decided. It is a likely starting point, but that is our analysis, not EU text."
      ],
      [
       "Which steel products are in scope?",
       "Not decided until the act is published."
      ],
      [
       "Who builds the passport, us or our EU buyer?",
       "Under ESPR, the manufacturer must ensure a passport is available (Art. 27(1)(c)), and the importer must ensure the same before placing the product on the market (Art. 29(2)(c)) (Regulation (EU) 2024/1781). For a Turkish mill selling into the EU, that means the passport is in practice built from your data, even when your EU importer is the one placing it on the market. What the steel passport must contain will be set in the act."
      ]
     ]
    },
    {
     "t": "p",
     "text": "Next step: take the [CBAM readiness check](/en/decision-lab/cbam-readiness-check), which covers the emissions data a steel passport is likely to build on."
    },
    {
     "t": "sources",
     "title": "Sources",
     "items": [
      "European Commission, DG GROW, \"Digital Product Passport\" (accessed 2 Nov 2026): https://single-market-economy.ec.europa.eu/single-market/digital-product-passport_en",
      "Regulation (EU) 2024/1781 (ESPR) of 13 Jun 2024, OJ 28 Jun 2024 (text read 2 Nov 2026): https://eur-lex.europa.eu/eli/reg/2024/1781/oj",
      "Commission Implementing Regulation (EU) 2026/1778 (OJ 17 Jul 2026, per Ticaret Bakanlığı): https://eur-lex.europa.eu/eli/reg_impl/2026/1778/oj",
      "T.C. Ticaret Bakanlığı, \"AB Dijital Ürün Pasaportu\" (accessed 2 Nov 2026): https://ticaret.gov.tr/urun-guvenligi/ab-teknik-mevzuat-uyumu/dijital-urun-pasaportu",
      "T.C. Ticaret Bakanlığı, \"Dijital Ürün Pasaportu Sıkça Sorulan Sorular Dokümanı\" (24 Jun 2026): https://ticaret.gov.tr/dis-iliskiler/yesil-mutabakat/duyurular/dijital-urun-pasaportu-sikca-sorulan-sorular-dokumani",
      "European Commission, Have Your Say initiative 17672, \"Ecodesign requirements for iron and steel products\" (call for evidence 20 May 2026; checked 2 Nov 2026, draft act stage \"upcoming\", feedback not open): https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives/17672",
      "T.C. Ticaret Bakanlığı, \"AB Dijital Ürün Pasaportu (DPP) Soru Toplama Anketi\" (15 Oct 2026): https://ticaret.gov.tr/urun-guvenligi/duyurular/ab-dijital-urun-pasaportu-dpp-soru-toplama-anketi (survey: https://anketler.ticaret.gov.tr/anket-cevapla/405)",
      "TOBB letter to chambers, \"AB Dijital Ürün Pasaportu - Soru Toplama Anketi\" (20 Oct 2026), as published by Mardin TSO: https://mardintso.org.tr/rscms/uploads/2026/10/AB-Dijital-Urun-Pasaportu-Soru-Toplama-Anketi.pdf",
      "Secondary: Publicea (28 Oct 2026)."
     ]
    }
   ]
  },
  "tr": {
   "path": "icgoruler/celik-dijital-urun-pasaportu-espr",
   "title": "Çelik Dijital Ürün Pasaportu: ESPR Türk Üreticiye Ne Getirir",
   "description": "Demir-çelik, Komisyon'un DPP takviminde ESPR ürün grupları arasında ilk sırada. Çelik Dijital Ürün Pasaportu Türk üreticiden ne isteyebilir, ne hâlâ belirsiz?",
   "h1": "Çelik Dijital Ürün Pasaportu: ESPR Türk çelik üreticisinden ne isteyecek, ne hâlâ belirsiz?",
   "blocks": [
    {
     "t": "p",
     "text": "Türk çelik ihracatçıları 2026'yı SKDM kapsamında AB'deki beyan sahiplerine gömülü emisyon verisi sağlamayı öğrenerek geçirdi. AB'nin bir sonraki veri talebi şimdiden takvimde: Avrupa Komisyonu'nun Dijital Ürün Pasaportu (DPP) takvimine göre demir-çelik için yetki devrine dayanan tüzük 2026'nın dördüncü çeyreğinde kabul edilmesi öngörülüyor. Sürdürülebilir Ürünler için Ekotasarım Gereklilikleri Tüzüğü (ESPR) kapsamındaki ürün grupları arasında sıra ilk olarak demir-çelikte (Avrupa Komisyonu, DG GROW, erişim 2 Kasım 2026)."
    },
    {
     "t": "p",
     "text": "Bu yazıda neyin kesinleştiğini ve neyin henüz belirsiz olduğunu ayırıyoruz; böylece bir çelik ya da metal ihracat yöneticisi 2027'yi tahmine değil, bilgiye dayanarak planlayabilir."
    },
    {
     "t": "h2",
     "text": "Bugün kesinleşmiş olanlar"
    },
    {
     "t": "ul",
     "items": [
      "Hukuki dayanak. DPP, (AB) 2024/1781 sayılı Sürdürülebilir Ürünler için Ekotasarım Gereklilikleri Tüzüğü'ne (ESPR) dayanıyor. Ürüne özel DPP şartları ya ESPR kapsamındaki yetki devrine dayanan tüzüklerle ya da Batarya Tüzüğü, Yapı Ürünleri Tüzüğü gibi ayrı AB mevzuatıyla belirleniyor (Avrupa Komisyonu, DG GROW, erişim 2 Kasım 2026).",
      "Sicil. DPP Sicili'ne ilişkin (AB) 2026/1778 sayılı Komisyon Uygulama Tüzüğü 17 Temmuz 2026 tarihli AB Resmî Gazetesi'nde yayımlandı (T.C. Ticaret Bakanlığı, AB Dijital Ürün Pasaportu sayfası, erişim 2 Kasım 2026). Komisyon'a göre Sicil 20 Temmuz 2026'da faaliyete geçti.",
      "Sicilde ne var? Her ürünün tek ve benzersiz tanımlayıcısı ile zorunlu kayıt verileri. Ürün bilgisinin tamamı ise iktisadi işletmecide ya da bir DPP hizmet sağlayıcısında tutuluyor. Karekod gibi bir veri taşıyıcı ürünü pasaportuna bağlıyor; ithal ürünlerde Sicil'in verdiği tek ve benzersiz kayıt tanımlayıcısı (URI) gümrükte kontrol edilebiliyor (Avrupa Komisyonu, DG GROW). Bakanlık sayfasına göre Sicil'de emtia kodu, ürün, işletmeci ve tesis tanımlayıcıları da yer alacak.",
      "Standartlar. İlk altı DPP standardı Temmuz 2026 itibarıyla AB Resmî Gazetesi'nde yayımlandı (Ticaret Bakanlığı); kalan iki standarda ilişkin uygulama kararı Kasım 2026'da bekleniyor (Avrupa Komisyonu, DG GROW)."
     ]
    },
    {
     "t": "h2",
     "text": "ESPR pasaport için bugünden neyi söylüyor?"
    },
    {
     "t": "p",
     "text": "Çelik tüzüğü olmasa da çerçeve tüzük mimariyi belirliyor. ESPR'nin gerekçe hükümlerine göre (13 Haziran 2024 tarihli (AB) 2024/1781 sayılı Tüzük, gerekçeler):"
    },
    {
     "t": "ul",
     "items": [
      "Pasaport bir tek ve benzersiz ürün tanımlayıcısına, uygun olduğu durumlarda da tek ve benzersiz işletmeci tanımlayıcısına ve tek ve benzersiz tesis tanımlayıcısına bağlanmalı; böylece ürünle ilgili aktörler ve üretim tesisleri izlenebilmeli. Tanımlayıcılar ve veri taşıyıcı uluslararası kabul görmüş standartlara göre verilmeli.",
      "İmalatçı, yetkili temsilci, ithalatçı, dağıtıcı, satıcı ve sipariş karşılama hizmet sağlayıcısı gibi iktisadi işletmeciler verilere erişebilmeli, veri girebilmeli ve güncelleyebilmeli; bu yapılırken gizli ticari bilgilerin korunması tehlikeye atılmamalı.",
      "Veriler doğru, eksiksiz ve güncel olmalı; pasaport gerektiğinde etiket veya kullanım kılavuzu gibi dijital olmayan bilgilerle desteklenebilir."
     ]
    },
    {
     "t": "p",
     "text": "Türk tesisleri açısından dikkat çeken unsur tesis tanımlayıcısı: ürünü üretildiği tesise bağlıyor, tıpkı SKDM'nin emisyonu bir tesise bağlaması gibi. Çelik tüzüğünün bunu zorunlu kılıp kılmayacağına tüzüğün kendisi karar verecek."
    },
    {
     "t": "h2",
     "text": "ESPR'de sıra ilk olarak çelikte: Türkiye için neden önemli?"
    },
    {
     "t": "p",
     "text": "Komisyon'un planladığı ESPR tüzükleri listesinde demir-çelik 2026'da; tekstil, lastik ve alüminyum 2027'de, mobilya 2028'de, yatak ve BİT ürünleri 2029'da yer alıyor (Avrupa Komisyonu, DG GROW, erişim 2 Kasım 2026)."
    },
    {
     "t": "p",
     "text": "Bu, Türkiye'yi doğrudan ilgilendiriyor. AB'ye satış yapan Türk çelik üreticileri zaten SKDM ile uğraşıyor ([CBAM veri hazırlığı](/tr/cozumler/cbam-veri-hazirligi)). Çelik pasaportu bunun üzerine, AB piyasasına arz anında ürün düzeyinde bir bilgi yükümlülüğü ekleyecek."
    },
    {
     "t": "p",
     "text": "Aradaki fark önemli. SKDM'de beyan yükümlülüğü AB'deki ithalatçıda; Türk tesisi ise emisyon verisini sağlayan taraf konumunda. DPP'de ise bilgi ürünün kendisine bağlanıyor: ürün ya da parti üzerindeki veri taşıyıcı, Sicil'deki kayıt ve gümrükte kontrol edilebilen URI aynı zincirin halkaları (Avrupa Komisyonu, DG GROW). Bu da veri hazırlığının yalnızca çevre ya da sürdürülebilirlik ekibinin işi olmadığı, üretim planlama, kalite, sevkiyat ve bilgi işlem ekiplerini de içine aldığı anlamına geliyor. Hangi bilginin kimde tutulacağı, AB alıcısıyla nasıl paylaşılacağı ve ticari sır niteliğindeki verinin nasıl korunacağı soruları şimdiden konuşulmaya başlanmalı."
    },
    {
     "t": "h2",
     "text": "Takvim: ne zaman ne geliyor?"
    },
    {
     "t": "p",
     "text": "Komisyon'un değişebilecek gösterge niteliğindeki takvimi (Avrupa Komisyonu, DG GROW, erişim 2 Kasım 2026):"
    },
    {
     "t": "table",
     "head": [
      "Tarih",
      "Gelişme"
     ],
     "rows": [
      [
       "20 Temmuz 2026",
       "DPP Sicili faaliyete geçti"
      ],
      [
       "Kasım 2026",
       "Kalan iki DPP standardına ilişkin uygulama kararı"
      ],
      [
       "2026 4. çeyrek",
       "Demir-çelik için ESPR yetki devrine dayanan tüzüğün kabulü"
      ],
      [
       "18 Şubat 2027",
       "Bazı bataryalar için DPP zorunlu (elektrikli araç, hafif ulaşım, endüstriyel)"
      ],
      [
       "2027 2.-3. çeyrek",
       "DPP hizmet sağlayıcılarına ilişkin tüzük (Ticaret Bakanlığı: 2027 3. çeyrek)"
      ],
      [
       "2027 3.-4. çeyrek",
       "Tekstil, alüminyum ve lastik tüzükleri"
      ],
      [
       "2028",
       "Mobilya"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Planlamadaki temel kural: bir ESPR tüzüğü kabul edildikten sonra iktisadi işletmecilere en az 18 aylık geçiş süresi tanınıyor (Avrupa Komisyonu, DG GROW). Çelik tüzüğü 2026'nın son çeyreğinde kabul edilirse yükümlülükler en erken 2028 ortasında, kabul gecikirse daha geç başlar (Komisyon'un gösterge tarihlerinden Ganrich hesabı; kesin tarihi tüzük belirleyecek)."
    },
    {
     "t": "h2",
     "text": "Çelik pasaportunda muhtemelen ne olacak, ne belirsiz?"
    },
    {
     "t": "table",
     "head": [
      "Kesinleşti",
      "Belirsiz (2 Kasım 2026 itibarıyla)"
     ],
     "rows": [
      [
       "Hukuki dayanak (ESPR) ve Sicil kuralları",
       "Çelik için veri alanlarının tam listesi"
      ],
      [
       "ESPR tüzükleri arasında sıra ilk demir-çelikte, 2026 4. çeyrekte bekleniyor",
       "Karbon gibi performans eşiklerinin konup konmayacağı ve hangi seviyede olacağı"
      ],
      [
       "Kabulden sonra en az 18 ay geçiş",
       "Hangi çelik ürünlerinin ve GTİP'lerin kapsamda olacağı"
      ],
      [
       "Ürün tanımlayıcı + veri taşıyıcı + gümrükte URI kontrolü",
       "Bilginin parti, model ya da tesis bazında mı isteneceği"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Komisyon'a göre DPP, ürün grubuna bağlı olarak güvenlik, menşe, malzeme, onarılabilirlik, çevresel performans, yeniden kullanım ve geri dönüşüm bilgilerini içerebilir (DG GROW). Çelik özelinde Komisyon'un etki analizi için görüş çağrısı (20 Mayıs 2026'da yayımlandı, Have Your Say girişimi 17672) değerlendirilen seçenekleri sıralıyor: demir-çelik ürünlerinin karbon ayak izi, geri dönüştürülmüş içeriği ve geri dönüşümü zorlaştıran maddeler hakkında bilgi gereklilikleri; örneğin karbon ayak izine dayalı performans sınıfları ve asgari çevresel performans eşikleri; tedarik zincirindeki tüm aktörler için dijital ürün pasaportu gereklilikleri. Girişim ayrıca Sanayi Hızlandırıcı Yasası için \"düşük karbonlu çelik\" tanımını yapacak. 2 Kasım 2026 itibarıyla görüşe açılmış bir taslak tüzük yayımlanmamıştı (Have Your Say girişimi 17672; ikincil kaynak: Publicea, 28 Ekim 2026)."
    },
    {
     "t": "h2",
     "text": "DPP ve SKDM verisi nerede kesişiyor?"
    },
    {
     "t": "p",
     "text": "*Bu bölüm Ganrich analizidir, mevzuat hükmü değildir.* SKDM çelik için tesis düzeyinde gömülü emisyon verisi istiyor. Çelik tüzüğüne bir karbon ayak izi alanı girerse, doğrulanmış SKDM izlemesi olan tesisler büyük olasılıkla avantajlı başlayacaktır. Ancak yöntemler farklı olabilir (SKDM gömülü emisyonu ile ürün ayak izi yöntemi), bu nedenle tek bir rakamın iki ihtiyacı birden karşılayacağını varsaymayın. Kaynağına kadar izlenebilen tek bir emisyon veri seti kurun, yöntem tercihlerini belgeleyin."
    },
    {
     "t": "h2",
     "text": "Ticaret Bakanlığı ihracatçılara ne diyor?"
    },
    {
     "t": "p",
     "text": "Ticaret Bakanlığı'nın AB teknik mevzuat uyumu başlığı altında bir AB Dijital Ürün Pasaportu sayfası var (erişim 2 Kasım 2026) ve Bakanlık 24 Haziran 2026'da bir Dijital Ürün Pasaportu Sıkça Sorulan Sorular Dokümanı yayımladı. Bakanlık ayrıca 15 Ekim 2026'da bir \"AB Dijital Ürün Pasaportu (DPP) Soru Toplama Anketi\" açtı (Ticaret Bakanlığı, duyuru, 15 Ekim 2026); anket TOBB tarafından 20 Ekim 2026'da odalara iletildi. Size ulaştıysa yanıtlamanızı öneririz: sektörün sorularının resmî makamlara ulaşmasının yolu bu."
    },
    {
     "t": "h2",
     "text": "2027'de hazırlanması gereken beş şey"
    },
    {
     "t": "ol",
     "items": [
      "Ürün envanteri: AB'ye giden çelik ürünlerini GTİP, kalite ve tesis bazında listeleyin; böylece tüzük yayımlandığı gün kapsamı kontrol edebilirsiniz.",
      "Tanımlayıcılar: her ürüne ya da partiye benzersiz tanımlayıcı ve veri taşıyıcıyı nasıl vereceğinize karar verin (markalama, etiket, sertifika).",
      "Emisyon verisi: SKDM izlemesini doğrulanabilir kalitede sürdürün; olası karbon alanının en iyi temeli bu.",
      "Geri dönüştürülmüş içerik: hurda girdilerini ve kaynaklarını döküm/parti bazında belgeleyin.",
      "Hizmet sağlayıcı kararı: pasaport verisini kendiniz mi tutacaksınız, bir DPP hizmet sağlayıcısı mı kullanacaksınız? Hizmet sağlayıcı kuralları 2027'de bekleniyor."
     ]
    },
    {
     "t": "p",
     "text": "Uygulamada nasıl işlediğini [tedarikçi sürdürülebilirlik verisi](/tr/cozumler/tedarikci-surdurulebilirlik-verisi) çalışmamızda ve [tekstil ürün pasaportu raporumuzda](/tr/icgoruler/rapor/tekstil-urun-pasaportu-turk-tedarikci-66a3e53c) görebilirsiniz; bataryalar için [batarya pasaportu hazırlığı](/tr/cozumler/batarya-pasaportu-hazirligi). Tarihler için [AB mevzuat takvimi](/tr/icgoruler/ab-mevzuat-takvimi)."
    },
    {
     "t": "h2",
     "text": "Sıkça sorulan sorular"
    },
    {
     "t": "faq",
     "items": [
      [
       "Çelik için Dijital Ürün Pasaportu bugün zorunlu mu?",
       "Hayır. Yükümlülük, demir-çelik tüzüğü kabul edilip en az 18 aylık geçiş süresi dolduktan sonra başlar (Avrupa Komisyonu, DG GROW, erişim 2 Kasım 2026)."
      ],
      [
       "İlk zorunlu DPP hangisi?",
       "Bazı bataryalar, 18 Şubat 2027'den itibaren (DG GROW)."
      ],
      [
       "Çelik tüzüğü ne zaman bekleniyor?",
       "Komisyon'un gösterge takvimine göre 2026'nın dördüncü çeyreğinde."
      ],
      [
       "AB Sicili tüm ürün verimizi mi tutacak?",
       "Hayır. Sicil tanımlayıcıları ve zorunlu kayıt verilerini tutar; ürün bilgisinin tamamı işletmecide ya da hizmet sağlayıcıda kalır (DG GROW; (AB) 2026/1778)."
      ],
      [
       "Gümrük pasaportu kontrol edecek mi?",
       "İthal ürünlerde Sicil'in verdiği URI gümrükte kontrol edilebilir (DG GROW; Ticaret Bakanlığı)."
      ],
      [
       "Ticari sır niteliğindeki verilerimiz herkese açık mı olacak?",
       "Erişim kullanıcı rolüne göre yönetilecek (DG GROW); hangi alanın kime açık olacağını çelik tüzüğü belirleyecek."
      ],
      [
       "Çelik için taslak tüzük yayımlandı mı?",
       "Hayır. 2 Kasım 2026 itibarıyla görüşe açılmış bir taslak yayımlanmamıştı (Have Your Say girişimi 17672). Yayın günü yeniden kontrol edin."
      ],
      [
       "SKDM emisyon verimiz yeniden kullanılacak mı?",
       "Henüz karara bağlanmadı. Muhtemel bir başlangıç noktası; ancak bu bizim analizimiz, AB metninde yer almıyor."
      ],
      [
       "Hangi çelik ürünleri kapsamda?",
       "Tüzük yayımlanana kadar belli değil."
      ],
      [
       "Pasaportu kim hazırlar, biz mi AB alıcımız mı?",
       "ESPR'ye göre pasaportun mevcut olmasını imalatçı sağlar (Madde 27(1)(c)); ithalatçı da ürünü piyasaya arz etmeden önce pasaportun mevcut olduğunu güvence altına almak zorundadır (Madde 29(2)(c)) ((AB) 2024/1781). AB'ye satış yapan bir Türk tesisi için bu, ürünü AB'de piyasaya ithalatçınız arz etse bile pasaportun pratikte sizin verinizle oluşturulacağı anlamına geliyor. Çelik pasaportunun içeriğini tüzük belirleyecek."
      ]
     ]
    },
    {
     "t": "p",
     "text": "Sonraki adım: çelik pasaportunun büyük olasılıkla dayanacağı emisyon verisini ölçen [CBAM hazırlık testini](/tr/karar-laboratuvari/cbam-hazirlik-testi) yapın."
    },
    {
     "t": "sources",
     "title": "Kaynaklar",
     "items": [
      "Avrupa Komisyonu, DG GROW, \"Digital Product Passport\" (erişim 2 Kasım 2026)",
      "13 Haziran 2024 tarihli (AB) 2024/1781 sayılı Tüzük (ESPR), AB Resmî Gazetesi 28 Haziran 2024 (metin 2 Kasım 2026'da okundu)",
      "(AB) 2026/1778 sayılı Komisyon Uygulama Tüzüğü (AB RG 17 Temmuz 2026)",
      "T.C. Ticaret Bakanlığı, \"AB Dijital Ürün Pasaportu\" (erişim 2 Kasım 2026)",
      "T.C. Ticaret Bakanlığı, \"Dijital Ürün Pasaportu Sıkça Sorulan Sorular Dokümanı\" (24 Haziran 2026)",
      "Avrupa Komisyonu, Have Your Say girişimi 17672 (görüş çağrısı 20 Mayıs 2026; 2 Kasım 2026'da kontrol edildi, taslak aşaması \"yakında\")",
      "T.C. Ticaret Bakanlığı, \"AB Dijital Ürün Pasaportu (DPP) Soru Toplama Anketi\" (15 Ekim 2026)",
      "TOBB'un odalara yazısı, \"AB Dijital Ürün Pasaportu - Soru Toplama Anketi\" (20 Ekim 2026), Mardin TSO yayını: https://mardintso.org.tr/rscms/uploads/2026/10/AB-Dijital-Urun-Pasaportu-Soru-Toplama-Anketi.pdf",
      "İkincil: Publicea (28 Ekim 2026)."
     ]
    }
   ]
  }
 }
];

export const guideByKey = (key: string) => guides.find(g => g.key === key);
