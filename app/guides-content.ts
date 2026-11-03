import type { Lang } from "./content";

// Long-form guides (EUDR, steel DPP, CBAM 2026, CRA standards). Text comes from the reviewed article drafts as written;
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
 },
 {
  "key": "guideCbam2026",
  "solution": "solutionCbam",
  "date": "2026-11-03",
  "checked": {
   "en": "3 November 2026",
   "tr": "3 Kasım 2026"
  },
  "image": "guideCbam2026",
  "readingTime": {
   "en": "11 min",
   "tr": "11 dk"
  },
  "topic": {
   "en": "CBAM",
   "tr": "SKDM (CBAM)"
  },
  "en": {
   "path": "insights/cbam-2026-update-tr-ets-cop31",
   "title": "CBAM 2026 Update: Prices, Deadlines and TR ETS Before COP31",
   "description": "CBAM 2026 for Turkish producers: Q1–Q3 certificate prices, the 30 Sep 2027 declaration, verification, the 50-tonne rule and how the new TR ETS pilot fits in.",
   "h1": "CBAM 2026 update: what Turkish producers should know before COP31 in Antalya",
   "blocks": [
    {
     "t": "p",
     "text": "From 9 to 20 November 2026, Antalya hosts COP31, the UN Climate Change Conference (UNFCCC, accessed 3 Nov 2026). Carbon pricing will be in the air. For Turkish exporters of steel, aluminium, cement and fertilisers, though, the most concrete carbon price is not one being negotiated in Antalya. It is the EU's CBAM certificate price, and three of its four 2026 quarters are already published."
    },
    {
     "t": "p",
     "text": "Since 1 January 2026 CBAM, the EU's Carbon Border Adjustment Mechanism, has been in its definitive regime (European Commission, accessed 3 Nov 2026). EU importers now carry a financial obligation for the carbon embedded in the goods they buy. The bill for 2026 is paid in 2027, but its size is being set now, shipment by shipment, by the emissions data non-EU producers can or cannot provide."
    },
    {
     "t": "p",
     "text": "This update pulls together what changed since our October briefing: the published 2026 prices, the Commission's de minimis review, verifier access to the CBAM Registry, and Türkiye's own emissions trading pilot, which now has a regulation and a procedure behind it."
    },
    {
     "t": "h2",
     "text": "Why it matters for Türkiye right now"
    },
    {
     "t": "p",
     "text": "Speaking at Steel Networking Summits 2026, Trade Minister Ömer Bolat said Türkiye's exports to the EU of CBAM-covered steel products fell 1.7% in January–September 2026, and total iron and steel exports to the EU fell 6.7%. He said the EU's 50% quota cut from 1 July 2026 and CBAM were both directly affecting the sector. The EU still takes 42.3% of Türkiye's steel exports. Bolat described the priority as supporting the green transition while making sure exporters do not face disproportionate costs and additional trade barriers (T.C. Ticaret Bakanlığı, 26 Oct 2026)."
    },
    {
     "t": "p",
     "text": "In other words, this is a market to defend with data, not one to leave."
    },
    {
     "t": "h2",
     "text": "The 2026 CBAM certificate price, quarter by quarter"
    },
    {
     "t": "p",
     "text": "The Commission publishes the 2026 certificate price once per quarter (European Commission, CBAM certificate price page, accessed 3 Nov 2026):"
    },
    {
     "t": "table",
     "head": [
      "Quarter (2026 imports)",
      "Price per certificate",
      "Published"
     ],
     "rows": [
      [
       "Q1 2026",
       "€75.36",
       "7 Apr 2026"
      ],
      [
       "Q2 2026",
       "€75.28",
       "6 Jul 2026"
      ],
      [
       "Q3 2026",
       "€82.32",
       "5 Oct 2026"
      ],
      [
       "Q4 2026",
       "not yet published",
       "due 4 Jan 2027"
      ]
     ]
    },
    {
     "t": "p",
     "text": "The method is set in Implementing Regulation (EU) 2025/2548: the price is calculated from publicly available EU ETS auction information. For 2026 the price is quarterly; from 2027 it becomes weekly (Commission price page; Regulation (EU) 2023/956, Art. 21, as amended by Regulation (EU) 2025/2083). Certificates for 2026 imports go on sale on the central platform from February 2027 (Commission CBAM news page; Ticaret Bakanlığı, accessed 3 Nov 2026)."
    },
    {
     "t": "p",
     "text": "Two practical points follow. First, the quarter in which goods were imported now has a known price for most of 2026, so an importer can put a number on each 2026 shipment once it has the emissions value. Second, for 2026 only, importers do not have to hold certificates covering 50% of their imports at each quarter end (Ticaret Bakanlığı, accessed 3 Nov 2026). That helps cash flow; it does not reduce what is owed."
    },
    {
     "t": "h2",
     "text": "Deadlines that have not moved"
    },
    {
     "t": "ul",
     "items": [
      "**1 Jan 2026:** definitive regime starts.",
      "**February 2027:** certificate sales for 2026 imports begin.",
      "**30 Sep 2027:** first annual CBAM declaration, covering 2026 imports (Ticaret Bakanlığı, accessed 3 Nov 2026). On 30 Sep 2026 the Commission published a follow-up to its webinar \"CBAM from policy to practice – emissions calculation, declarations, and certificates\" (Commission CBAM news page)."
     ]
    },
    {
     "t": "h2",
     "text": "The 50-tonne rule: reviewed and kept"
    },
    {
     "t": "p",
     "text": "An importer whose CBAM goods do not cumulatively exceed 50 tonnes net mass in a calendar year is exempt for that year. The threshold covers iron and steel, aluminium, fertilisers and cement, not electricity or hydrogen (Regulation (EU) 2025/2083, Art. 2a)."
    },
    {
     "t": "p",
     "text": "On 30 September 2026 the Commission published its first assessment of the threshold. For 1 April 2025 to 31 March 2026, the exempted imports represented 0.87% of embedded emissions, below the 1% ceiling the regulation sets (Commission CBAM news page, accessed 3 Nov 2026). For Turkish suppliers the message is simple: small EU buyers may be exempt, but almost all of the embedded emissions still sit with buyers that are not."
    },
    {
     "t": "h2",
     "text": "Actual emissions vs default values"
    },
    {
     "t": "p",
     "text": "Embedded emissions are calculated either as actual emissions under the CBAM methodology, or with the Commission's default values. Defaults carry a mark-up of **10% in 2026, 20% in 2027 and 30% in 2028**; for fertilisers it is 1% (Ticaret Bakanlığı, accessed 3 Nov 2026). For cement and fertilisers, indirect emissions from electricity count; for iron, steel and aluminium only direct emissions count."
    },
    {
     "t": "p",
     "text": "The default values are published on the Commission's CBAM legislation and guidance page. Every producer should compare its own intensity per CN code with the default. If yours is lower, verified actual data is a commercial advantage. If it is higher, the mark-up rises every year and will not protect you for long."
    },
    {
     "t": "h2",
     "text": "Verification: the bottleneck to book now"
    },
    {
     "t": "p",
     "text": "Actual emissions must be verified by verifiers accredited by EU accreditation bodies, with on-site installation visits as the priority approach. Legal entities from third countries can also become verifiers (Ticaret Bakanlığı, accessed 3 Nov 2026). Since 1 September 2026 verifiers can access the CBAM Registry, and the Commission published further verifier resources on 28 September 2026 (Commission CBAM news page, accessed 3 Nov 2026)."
    },
    {
     "t": "p",
     "text": "The working documents remain the ten guidance documents the Commission published on 14 August 2026: general guides No. 1 to 4 and sector guides No. 5a to 5f for cement, hydrogen, fertilisers, iron and steel, aluminium and electricity (DG TAXUD, 14 Aug 2026). Guidance No. 2 and No. 3 cover monitoring plans, system boundaries, activity data and the embedded emissions calculation."
    },
    {
     "t": "p",
     "text": "A practical sequence:"
    },
    {
     "t": "ul",
     "items": [
      "Map every EU-bound product to its CN code and CBAM sector.",
      "Confirm installation boundaries and production routes against Guidance No. 3 and your sector guide.",
      "Collect 2026 activity data monthly, not at year end.",
      "Contract an accredited verifier and plan the site visit.",
      "Agree in writing with each EU buyer what data you hand over, in what format and when."
     ]
    },
    {
     "t": "h2",
     "text": "Free allocation and the carbon price paid at home"
    },
    {
     "t": "p",
     "text": "EU producers still receive some free EU ETS allowances, so CBAM adjusts the importer's obligation in the same way. The factor falls each year and reaches zero in 2034 (Ticaret Bakanlığı, accessed 3 Nov 2026). Guidance No. 4 explains the calculation."
    },
    {
     "t": "p",
     "text": "The second lever is a carbon price actually paid in the country of production. It can be deducted from the CBAM obligation if it is verified (Ticaret Bakanlığı, accessed 3 Nov 2026). This is where Türkiye's emissions trading system becomes relevant."
    },
    {
     "t": "h2",
     "text": "TR ETS: what is now in place"
    },
    {
     "t": "p",
     "text": "The Turkish ETS Regulation was published in the Resmî Gazete on 27 August 2026 (No. 33353) and entered into force on publication (Art. 41). It is based on Climate Law No. 7552 (Art. 3). The regulation gave pilot plants two months from entry into force to submit their first monitoring methodology plans and allowed the Climate Change Directorate to extend this by up to six months (Provisional Art. 3). The Directorate has used that power: by Olur No. 18814 of 13 October 2026 the deadline is now 27 January 2027 (İklim Değişikliği Başkanlığı, 14 Oct 2026)."
    },
    {
     "t": "p",
     "text": "On 1 October 2026 the Directorate announced the pilot procedures, approved on 30 September 2026 (İklim Değişikliği Başkanlığı, 1 Oct 2026). The pilot covers 2026 and 2027 emissions and installations above the threshold in electricity generation, cement, iron and steel, aluminium and fertilisers. For 2026 there are reporting obligations only. The first surrender obligation applies to 2027 emissions."
    },
    {
     "t": "p",
     "text": "What this means for CBAM is a question to approach carefully. The pilot creates monitoring and reporting duties in exactly the CBAM sectors, so one well-built data system can serve both. Whether and how much any Turkish carbon price could be deducted under CBAM depends on the price actually paid and its verification; we do not assume a figure. See our [Türkiye ETS readiness](/en/solutions/turkiye-ets-readiness) page for the pilot steps."
    },
    {
     "t": "h2",
     "text": "Sector notes"
    },
    {
     "t": "ul",
     "items": [
      "**Iron and steel:** the most exposed sector. Bolat said 78% of Turkish capacity is scrap-based electric arc furnace production (Ticaret Bakanlığı, 26 Oct 2026). Any advantage counts only if it is measured and verified; otherwise defaults apply. See Guidance No. 5d.",
      "**Aluminium:** direct emissions only. See Guidance No. 5e.",
      "**Cement:** indirect emissions from electricity are included, so electricity data matters as much as kiln data. See Guidance No. 5a.",
      "**Fertilisers:** a 1% mark-up on defaults, but indirect emissions are included. See Guidance No. 5c."
     ]
    },
    {
     "t": "h2",
     "text": "What to do before year end"
    },
    {
     "t": "ol",
     "items": [
      "Price your 2026 exposure per buyer: volumes per quarter × emissions per tonne × the published Q1–Q3 prices.",
      "Compare actual intensity with defaults for each CN code.",
      "Lock in a verifier for the 2026 data year.",
      "Align your CBAM monitoring with your TR ETS monitoring methodology plan if your plant is in the pilot.",
      "Brief the board on 2027: the default mark-up rises to 20% and certificate purchases begin in February 2027.",
      "If your plant is in the TR ETS pilot, submit your first monitoring methodology plan by 27 January 2027."
     ]
    },
    {
     "t": "p",
     "text": "Our [CBAM readiness check](/en/decision-lab/cbam-readiness-check) shows where your gaps are. For a structured review of data, monitoring and buyer communication, see [CBAM data readiness](/en/solutions/cbam-data-readiness). For the supplier layer, see [supplier sustainability data](/en/solutions/supplier-sustainability-data)."
    },
    {
     "t": "h2",
     "text": "FAQ"
    },
    {
     "t": "faq",
     "items": [
      [
       "What is the CBAM certificate price for 2026?",
       "€75.36 for Q1, €75.28 for Q2 and €82.32 for Q3 2026. The Q4 price is due on 4 January 2027 (European Commission, accessed 3 Nov 2026)."
      ],
      [
       "Does a Turkish exporter buy CBAM certificates?",
       "No. The EU importer, as authorised CBAM declarant, buys and surrenders them. The exporter supplies the emissions data that decides how many are needed."
      ],
      [
       "When is the first CBAM declaration due?",
       "By 30 September 2027, for goods imported in 2026."
      ],
      [
       "Is the 50-tonne exemption staying?",
       "The Commission's 30 September 2026 assessment found exempted imports were 0.87% of embedded emissions, below the 1% limit. The rule applies per importer and year and not to electricity or hydrogen."
      ],
      [
       "What happens without actual emissions data?",
       "The importer uses default values plus 10% in 2026, 20% in 2027 and 30% in 2028 (1% for fertilisers)."
      ],
      [
       "Does TR ETS reduce CBAM costs?",
       "A verified carbon price actually paid in the country of production can be deducted. The TR ETS pilot requires only reporting for 2026; the first surrender obligation applies to 2027 emissions."
      ]
     ]
    },
    {
     "t": "sources",
     "title": "Sources (all accessed 3 Nov 2026 unless stated)",
     "items": [
      "UNFCCC, COP31 page (Türkiye hosts; COP31 President-designate Murat Kurum, President of Negotiations Chris Bowen of Australia), \"UN Climate Change Conference - Antalya, November 2026\": https://unfccc.int/cop31",
      "European Commission, Price of CBAM certificates: https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en",
      "European Commission, CBAM communication and news (de minimis assessment 30 Sep 2026; procedure for verifier Registry access published 28 Aug 2026, access from 1 Sep 2026; verifier resources 28 Sep 2026; webinar follow-up 30 Sep 2026): https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-communication-and-news_en",
      "European Commission, CBAM definitive regime: https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-definitive-regime_en",
      "European Commission, CBAM legislation and guidance (default values): https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-legislation-and-guidance_en",
      "European Commission, DG TAXUD, guidance documents for the definitive period, 14 Aug 2026: https://taxation-customs.ec.europa.eu/news/european-commission-publishes-series-guidance-documents-support-cbam-implementation-definitive-2026-08-14_en",
      "Regulation (EU) 2025/2083 of 8 Oct 2025 amending Regulation (EU) 2023/956 (Art. 2a, Art. 21): https://eur-lex.europa.eu/eli/reg/2025/2083/oj/eng",
      "T.C. Ticaret Bakanlığı, \"AB SKDM Hakkında Genel Bilgiler ve Uygulama Mevzuatı\": https://ticaret.gov.tr/dis-iliskiler/yesil-mutabakat/sinirda-karbon-duzenleme-mekanizmalari/avrupa-birligi-sinirda-karbon-duzenleme-mekanizmasi/ab-skdm-hakkinda-genel-bilgiler-ve-uygulama-mevzuati",
      "T.C. Ticaret Bakanlığı, \"Ticaret Bakanı Ömer Bolat, Steel Networking Summits 2026'da Konuştu\", 26 Oct 2026: https://ticaret.gov.tr/haberler/ticaret-bakani-omer-bolat-steel-networking-summits-2026da-konustu",
      "Resmî Gazete, Türkiye Emisyon Ticaret Sistemi Yönetmeliği, 27 Aug 2026, No. 33353: https://www.resmigazete.gov.tr/eskiler/2026/08/20260827-7.htm",
      "İklim Değişikliği Başkanlığı, \"TR ETS Pilot Uygulama Dönemine İlişkin Usul ve Esaslar Yayımlandı\", 1 Oct 2026: https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-iliskin-usul-ve-esaslar-yayimlandi-duyuru-1045"
     ]
    }
   ]
  },
  "tr": {
   "path": "icgoruler/skdm-2026-guncel-sertifika-fiyati-tr-ets",
   "title": "SKDM 2026: Sertifika Fiyatları, Takvim ve TR ETS Pilotu",
   "description": "SKDM 2026'da neler değişti? 1.-3. çeyrek sertifika fiyatları, 30 Eylül 2027 beyanı, doğrulama, 50 ton eşiği ve yeni TR ETS pilot dönemi ihracatçıya tek yazıda.",
   "h1": "SKDM 2026 güncellemesi: COP31 öncesinde Türk sanayicisinin bilmesi gerekenler",
   "blocks": [
    {
     "t": "p",
     "text": "9-20 Kasım 2026'da Antalya, BM İklim Değişikliği Konferansı COP31'e ev sahipliği yapıyor (UNFCCC, erişim 3 Kasım 2026). Karbon fiyatlaması bu iki hafta boyunca gündemin merkezinde olacak. Ne var ki çelik, alüminyum, çimento ve gübre ihracatçısı için en somut karbon fiyatı Antalya'daki müzakerelerden çıkmayacak; o fiyat, AB'nin SKDM sertifika fiyatı. Üstelik 2026'nın dört çeyreğinden üçünün fiyatı açıklandı bile."
    },
    {
     "t": "p",
     "text": "Sınırda Karbon Düzenleme Mekanizması (SKDM) 1 Ocak 2026'dan beri kesin uygulama döneminde (Avrupa Komisyonu, erişim 3 Kasım 2026). AB'li ithalatçı, aldığı ürünlerdeki gömülü emisyonun mali yükünü artık doğrudan taşıyor. 2026'nın faturası 2027'de ödenecek; ama tutarı bugün, her sevkiyatta, Türk üreticinin verebildiği ya da veremediği emisyon verisiyle belirleniyor."
    },
    {
     "t": "p",
     "text": "Bu güncelleme, ekim ayındaki değerlendirmemizden bu yana değişenleri tek yerde topluyor: açıklanan 2026 fiyatları, Komisyonun 50 ton eşiği değerlendirmesi, doğrulayıcıların SKDM Sicili'ne erişimi ve artık yönetmeliğine ve usul ve esaslarına kavuşan Türkiye Emisyon Ticaret Sistemi (TR ETS) pilot dönemi."
    },
    {
     "t": "h2",
     "text": "Türkiye için neden şimdi önemli?"
    },
    {
     "t": "p",
     "text": "Ticaret Bakanı Ömer Bolat, Steel Networking Summits 2026'daki konuşmasında 2026'nın ocak-eylül döneminde SKDM kapsamındaki çelik ürünlerinde AB'ye ihracatın yüzde 1,7, demir-çelikte AB'ye toplam ihracatın ise yüzde 6,7 gerilediğini söyledi. Bolat'a göre AB'nin 1 Temmuz 2026'dan itibaren kotaları yüzde 50 daraltması ve SKDM sektörü doğrudan etkiliyor. Çelik ihracatımızın yüzde 42,3'ü hâlâ AB'ye gidiyor. Bakan önceliği şöyle tanımladı: \"yeşil dönüşümü desteklemek ama ihracatçıların da orantısız maliyetler ve ilave ticaret engelleriyle karşılaşmamasını sağlamak\" (T.C. Ticaret Bakanlığı, 26 Ekim 2026)."
    },
    {
     "t": "p",
     "text": "Kısacası mesele pazardan çekilmek değil; pazarı veriyle savunmak."
    },
    {
     "t": "h2",
     "text": "2026 SKDM sertifika fiyatı, çeyrek çeyrek"
    },
    {
     "t": "p",
     "text": "Komisyon 2026 sertifika fiyatını her çeyrek için ayrı açıklıyor (Avrupa Komisyonu, SKDM sertifika fiyatı sayfası, erişim 3 Kasım 2026):"
    },
    {
     "t": "table",
     "head": [
      "Çeyrek (2026 ithalatı)",
      "Sertifika başına fiyat",
      "Açıklanma tarihi"
     ],
     "rows": [
      [
       "2026 1. çeyrek",
       "75,36 €",
       "7 Nisan 2026"
      ],
      [
       "2026 2. çeyrek",
       "75,28 €",
       "6 Temmuz 2026"
      ],
      [
       "2026 3. çeyrek",
       "82,32 €",
       "5 Ekim 2026"
      ],
      [
       "2026 4. çeyrek",
       "henüz açıklanmadı",
       "4 Ocak 2027'de bekleniyor"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Hesaplama yöntemi (AB) 2025/2548 sayılı Uygulama Tüzüğü'nde belirlendi: fiyat, kamuya açık AB ETS ihale verilerinden hesaplanıyor. 2026 için fiyat çeyreklik; 2027'den itibaren haftalık hesaplanacak (Komisyon fiyat sayfası; (AB) 2023/956 sayılı Tüzük md. 21, (AB) 2025/2083 ile değişik). 2026 ithalatına ait sertifikalar Şubat 2027'den itibaren merkezi platformda satışa çıkıyor (Komisyon SKDM haber sayfası; Ticaret Bakanlığı, erişim 3 Kasım 2026)."
    },
    {
     "t": "p",
     "text": "Buradan iki pratik sonuç çıkıyor. Birincisi, 2026'nın büyük bölümü için fiyat artık belli; ithalatçı emisyon değerini öğrendiği anda her sevkiyatın maliyetini hesaplayabilir. İkincisi, yalnızca 2026'ya özgü bir kolaylık var: İthalatçının her çeyrek sonunda ithalatın yüzde 50'sine denk gelen sertifikayı elde tutma zorunluluğu bu yıl uygulanmıyor (Ticaret Bakanlığı, erişim 3 Kasım 2026). Bu kolaylık nakit akışını rahatlatır, ama ödenecek tutarı azaltmaz."
    },
    {
     "t": "h2",
     "text": "Değişmeyen tarihler"
    },
    {
     "t": "ul",
     "items": [
      "**1 Ocak 2026:** kesin uygulama dönemi başladı.",
      "**Şubat 2027:** 2026 ithalatı için sertifika satışı başlıyor.",
      "**30 Eylül 2027:** 2026 ithalatını kapsayan ilk yıllık SKDM beyanının son günü (Ticaret Bakanlığı, erişim 3 Kasım 2026). Komisyon 30 Eylül 2026'da \"CBAM from policy to practice – emissions calculation, declarations, and certificates\" web seminerinin özet materyallerini yayımladı (Komisyon SKDM haber sayfası)."
     ]
    },
    {
     "t": "h2",
     "text": "50 ton eşiği: gözden geçirildi, yerinde kaldı"
    },
    {
     "t": "p",
     "text": "Bir takvim yılında SKDM kapsamındaki ithalatı toplamda 50 ton net kütleyi aşmayan ithalatçı o yıl için muaf. Eşik demir-çelik, alüminyum, gübre ve çimentoyu kapsıyor; elektrik ve hidrojene uygulanmıyor ((AB) 2025/2083 sayılı Tüzük, md. 2a)."
    },
    {
     "t": "p",
     "text": "Komisyon 30 Eylül 2026'da eşiğe ilişkin ilk değerlendirmesini yayımladı. 1 Nisan 2025 – 31 Mart 2026 döneminde muaf tutulan ithalat, gömülü emisyonların yüzde 0,87'sine karşılık geldi; bu, tüzükteki yüzde 1 sınırının altında (Komisyon SKDM haber sayfası, erişim 3 Kasım 2026). Türk tedarikçi için mesaj açık: Küçük AB'li alıcılar muaf olabilir, ancak gömülü emisyonun neredeyse tamamı muaf olmayan alıcıların payına düşüyor."
    },
    {
     "t": "h2",
     "text": "Gerçek emisyon mu, varsayılan değer mi?"
    },
    {
     "t": "p",
     "text": "Gömülü emisyonlar ya SKDM metodolojisine göre gerçek emisyon olarak ya da Komisyonun varsayılan değerleriyle hesaplanıyor. Varsayılan değerlere **2026'da %10, 2027'de %20, 2028'de %30** marj ekleniyor; gübrede bu oran %1 (Ticaret Bakanlığı, erişim 3 Kasım 2026). Çimento ve gübrede elektrikten kaynaklanan dolaylı emisyonlar da hesaba giriyor; demir-çelik ve alüminyumda yalnızca doğrudan emisyonlar sayılıyor."
    },
    {
     "t": "p",
     "text": "Varsayılan değerler Komisyonun SKDM mevzuat ve rehber sayfasında yayımlanıyor. Her üretici kendi emisyon yoğunluğunu GTİP kodu bazında varsayılan değerle karşılaştırmalı. Yoğunluğunuz varsayılan değerin altındaysa doğrulanmış gerçek veri doğrudan ticari avantajdır. Üstündeyse, marj her yıl arttığı için varsayılan değer sizi uzun süre korumaz."
    },
    {
     "t": "h2",
     "text": "Doğrulama: şimdiden yer ayırtmanız gereken darboğaz"
    },
    {
     "t": "p",
     "text": "Gerçek emisyonlar, AB akreditasyon otoritelerince akredite edilmiş doğrulayıcılar tarafından ve öncelikle yerinde tesis ziyaretiyle doğrulanmalı. Üçüncü ülkelerdeki tüzel kişiler de doğrulayıcı olabiliyor (Ticaret Bakanlığı, erişim 3 Kasım 2026). Doğrulayıcılar 1 Eylül 2026'dan beri SKDM Sicili'ne erişebiliyor; Komisyon 28 Eylül 2026'da doğrulayıcılara yönelik ek kaynaklar yayımladı (Komisyon SKDM haber sayfası, erişim 3 Kasım 2026)."
    },
    {
     "t": "p",
     "text": "Temel çalışma belgeleri yine Komisyonun 14 Ağustos 2026'da yayımladığı on rehber: 1-4 numaralı genel rehberler ve çimento, hidrojen, gübre, demir-çelik, alüminyum ve elektrik için 5a-5f sektör rehberleri (DG TAXUD, 14 Ağustos 2026). İzleme planı, sistem sınırları, faaliyet verisi ve gömülü emisyon hesabı Rehber 2 ve 3'te anlatılıyor."
    },
    {
     "t": "p",
     "text": "Pratik bir sıralama:"
    },
    {
     "t": "ul",
     "items": [
      "AB'ye giden her ürünü GTİP kodu ve SKDM sektörüyle eşleştirin.",
      "Tesis sınırlarını ve üretim rotalarını Rehber 3 ve sektör rehberinize göre netleştirin.",
      "2026 faaliyet verisini yıl sonunu beklemeden aylık toplayın.",
      "Akredite bir doğrulayıcıyla sözleşme yapın, yerinde ziyareti planlayın.",
      "Her AB'li alıcıyla hangi veriyi, hangi formatta ve ne zaman ileteceğinizi yazılı olarak belirleyin."
     ]
    },
    {
     "t": "h2",
     "text": "Ücretsiz tahsisat ve yurt içinde ödenen karbon fiyatı"
    },
    {
     "t": "p",
     "text": "AB'li üreticiler hâlâ bir miktar ücretsiz AB ETS tahsisatı aldığı için SKDM'de ithalatçının yükümlülüğü de aynı şekilde düzeltiliyor. Bu faktör her yıl azalıyor ve 2034'te sıfıra iniyor (Ticaret Bakanlığı, erişim 3 Kasım 2026). Hesaplama Rehber 4'te açıklanıyor."
    },
    {
     "t": "p",
     "text": "İkinci kaldıraç, üretim ülkesinde fiilen ödenmiş karbon fiyatı. Bu fiyat, doğrulanmış olması koşuluyla SKDM yükümlülüğünden düşülebiliyor (Ticaret Bakanlığı, erişim 3 Kasım 2026). TR ETS tam da bu noktada önem kazanıyor."
    },
    {
     "t": "h2",
     "text": "TR ETS: şu an yürürlükte olanlar"
    },
    {
     "t": "p",
     "text": "Türkiye Emisyon Ticaret Sistemi Yönetmeliği 27 Ağustos 2026 tarihli ve 33353 sayılı Resmî Gazete'de yayımlandı ve yayımı tarihinde yürürlüğe girdi (md. 41). Yönetmeliğin dayanağı 7552 sayılı İklim Kanunu (md. 3). Yönetmelik, pilot tesislere ilk izleme metodolojisi planlarını sunmaları için yürürlük tarihinden itibaren iki ay süre verdi ve İklim Değişikliği Başkanlığı'na bu süreyi altı aya kadar uzatma yetkisi tanıdı (geçici md. 3). Başkanlık bu yetkiyi kullandı: 13 Ekim 2026 tarihli ve 18814 sayılı Olur ile süre 27 Ocak 2027'ye uzatıldı (İklim Değişikliği Başkanlığı, 14 Ekim 2026)."
    },
    {
     "t": "p",
     "text": "İklim Değişikliği Başkanlığı, 30 Eylül 2026 tarihli Olur ile onaylanan pilot dönem usul ve esaslarını 1 Ekim 2026'da duyurdu. Pilot dönem 2026 ve 2027 sistem yılı emisyonlarını kapsıyor; elektrik üretimi, çimento, demir-çelik, alüminyum ve gübre sektörlerinde eşiğin üzerindeki tesisler dahil. 2026 için yalnızca raporlama yükümlülüğü var. Tahsisat teslim yükümlülüğü ilk kez 2027 sistem yılı emisyonları için başlıyor."
    },
    {
     "t": "p",
     "text": "Bunun SKDM'ye etkisini dikkatle okumak gerekiyor. Pilot dönem, tam olarak SKDM sektörlerinde izleme ve raporlama yükümlülüğü getiriyor; yani iyi kurulmuş tek bir veri sistemi iki yükümlülüğe de hizmet edebilir. Türkiye'de ödenecek bir karbon fiyatının SKDM'den ne ölçüde düşülebileceği ise fiilen ödenen fiyata ve doğrulanmasına bağlı; bir rakam varsaymıyoruz. Pilot dönem adımları için [Türkiye ETS hazırlığı](/tr/cozumler/turkiye-ets-hazirligi) sayfamıza bakabilirsiniz."
    },
    {
     "t": "h2",
     "text": "Sektör notları"
    },
    {
     "t": "ul",
     "items": [
      "**Demir-çelik:** en çok etkilenen sektör. Bakan Bolat'a göre Türk çelik kapasitesinin yüzde 78'i hurda bazlı elektrik ark ocağına dayanıyor (Ticaret Bakanlığı, 26 Ekim 2026). Bu yapının sağlayabileceği avantaj ancak ölçülür ve doğrulanırsa sayılır; aksi hâlde varsayılan değer uygulanır. Rehber 5d.",
      "**Alüminyum:** yalnızca doğrudan emisyon. Rehber 5e.",
      "**Çimento:** elektrikten gelen dolaylı emisyon dahil; elektrik verisi en az fırın verisi kadar önemli. Rehber 5a.",
      "**Gübre:** varsayılan değerde %1 marj, ama dolaylı emisyon hesapta. Rehber 5c."
     ]
    },
    {
     "t": "h2",
     "text": "Yıl sonuna kadar yapılacaklar"
    },
    {
     "t": "ol",
     "items": [
      "2026 maruziyetinizi alıcı bazında hesaplayın: çeyreklik hacim × ton başına emisyon × açıklanan 1.-3. çeyrek fiyatları.",
      "Her GTİP kodu için gerçek yoğunluğunuzu varsayılan değerle karşılaştırın.",
      "2026 veri yılı için akredite bir doğrulayıcıyla şimdiden anlaşın.",
      "Tesisiniz TR ETS pilot dönemi kapsamındaysa SKDM izlemenizi TR ETS izleme metodolojisi planınızla uyumlu hâle getirin.",
      "Yönetim kurulunu 2027 konusunda bilgilendirin: varsayılan değer marjı %20'ye çıkıyor, sertifika alımları Şubat 2027'de başlıyor.",
      "Tesisiniz TR ETS pilot dönemi kapsamındaysa ilk izleme metodolojisi planınızı en geç 27 Ocak 2027'de sunun."
     ]
    },
    {
     "t": "p",
     "text": "Nerede durduğunuzu görmek için [SKDM hazırlık testimizi](/tr/karar-laboratuvari/cbam-hazirlik-testi) kullanabilirsiniz. Veri, izleme ve alıcı iletişimini kapsayan yapılandırılmış bir değerlendirme için [SKDM veri hazırlığı](/tr/cozumler/cbam-veri-hazirligi) sayfamıza göz atın. Tedarikçi katmanı için [tedarikçi sürdürülebilirlik verisi](/tr/cozumler/tedarikci-surdurulebilirlik-verisi) çalışmamız yol gösterir."
    },
    {
     "t": "h2",
     "text": "Sıkça sorulan sorular"
    },
    {
     "t": "faq",
     "items": [
      [
       "2026 SKDM sertifika fiyatı ne kadar?",
       "2026'nın 1. çeyreği için 75,36 €, 2. çeyreği için 75,28 €, 3. çeyreği için 82,32 €. 4. çeyrek fiyatının 4 Ocak 2027'de açıklanması bekleniyor (Avrupa Komisyonu, erişim 3 Kasım 2026)."
      ],
      [
       "Türk ihracatçı SKDM sertifikası almak zorunda mı?",
       "Hayır. Sertifikayı yetkili SKDM beyan sahibi olan AB'li ithalatçı alır ve teslim eder. İhracatçı, kaç sertifika gerektiğini belirleyen emisyon verisini sağlar."
      ],
      [
       "İlk SKDM beyanı ne zaman?",
       "2026 ithalatı için en geç 30 Eylül 2027."
      ],
      [
       "50 ton muafiyeti devam ediyor mu?",
       "Komisyonun 30 Eylül 2026 değerlendirmesine göre muaf ithalat gömülü emisyonların %0,87'si; %1 sınırının altında. Eşik ithalatçı başına ve yıllık; elektrik ve hidrojene uygulanmıyor."
      ],
      [
       "Gerçek emisyon verisi olmazsa ne olur?",
       "İthalatçı varsayılan değerleri kullanır; üzerine 2026'da %10, 2027'de %20, 2028'de %30 marj eklenir (gübrede %1)."
      ],
      [
       "TR ETS, SKDM maliyetini azaltır mı?",
       "Üretim ülkesinde fiilen ödenmiş ve doğrulanmış karbon fiyatı düşülebiliyor. TR ETS pilot döneminde 2026 için yalnızca raporlama var; ilk teslim yükümlülüğü 2027 emisyonları için başlıyor."
      ]
     ]
    },
    {
     "t": "sources",
     "title": "Kaynaklar (aksi belirtilmedikçe erişim 3 Kasım 2026)",
     "items": [
      "UNFCCC, COP31 sayfası: https://unfccc.int/cop31",
      "Avrupa Komisyonu, SKDM sertifika fiyatı: https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en",
      "Avrupa Komisyonu, SKDM haberler (50 ton değerlendirmesi 30 Eylül 2026; doğrulayıcıların Sicil erişim prosedürü 28 Ağustos 2026'da yayımlandı, erişim 1 Eylül 2026'dan itibaren; doğrulayıcı kaynakları 28 Eylül 2026; web semineri özet materyalleri 30 Eylül 2026): https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-communication-and-news_en",
      "Avrupa Komisyonu, SKDM kesin dönem: https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-definitive-regime_en",
      "Avrupa Komisyonu, SKDM mevzuat ve rehberler (varsayılan değerler): https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-legislation-and-guidance_en",
      "Avrupa Komisyonu, DG TAXUD, kesin dönem rehberleri, 14 Ağustos 2026: https://taxation-customs.ec.europa.eu/news/european-commission-publishes-series-guidance-documents-support-cbam-implementation-definitive-2026-08-14_en",
      "(AB) 2025/2083 sayılı Tüzük, 8 Ekim 2025 (md. 2a, md. 21): https://eur-lex.europa.eu/eli/reg/2025/2083/oj/eng",
      "T.C. Ticaret Bakanlığı, \"AB SKDM Hakkında Genel Bilgiler ve Uygulama Mevzuatı\": https://ticaret.gov.tr/dis-iliskiler/yesil-mutabakat/sinirda-karbon-duzenleme-mekanizmalari/avrupa-birligi-sinirda-karbon-duzenleme-mekanizmasi/ab-skdm-hakkinda-genel-bilgiler-ve-uygulama-mevzuati",
      "T.C. Ticaret Bakanlığı, Bakan Bolat'ın Steel Networking Summits 2026 konuşması, 26 Ekim 2026: https://ticaret.gov.tr/haberler/ticaret-bakani-omer-bolat-steel-networking-summits-2026da-konustu",
      "Resmî Gazete, Türkiye Emisyon Ticaret Sistemi Yönetmeliği, 27 Ağustos 2026, sayı 33353: https://www.resmigazete.gov.tr/eskiler/2026/08/20260827-7.htm",
      "İklim Değişikliği Başkanlığı, TR ETS pilot dönem usul ve esasları duyurusu, 1 Ekim 2026: https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-iliskin-usul-ve-esaslar-yayimlandi-duyuru-1045"
     ]
    }
   ]
  }
 },
 {
  "key": "guideCraStandards",
  "solution": "solutionCra",
  "date": "2026-11-03",
  "checked": {
   "en": "3 November 2026",
   "tr": "3 Kasım 2026"
  },
  "image": "guideCraStandards",
  "readingTime": {
   "en": "9 min",
   "tr": "9 dk"
  },
  "topic": {
   "en": "CRA",
   "tr": "CRA"
  },
  "en": {
   "path": "insights/cra-compliance-without-harmonised-standards",
   "title": "CRA Compliance Without Harmonised Standards: What to Rely On",
   "description": "No CRA harmonised standard is cited yet and the deadlines are moving. What the Cyber Resilience Act lets Turkish manufacturers rely on until 11 December 2027.",
   "h1": "CRA compliance without harmonised standards: what can a Turkish manufacturer rely on?",
   "blocks": [
    {
     "t": "p",
     "text": "If you make routers, industrial controllers, smart home devices, software or almost anything else with a digital element, and you sell into the EU, the Cyber Resilience Act (CRA) applies to you from 11 December 2027. Part of it already applies: since 11 September 2026, manufacturers must report actively exploited vulnerabilities (Regulation (EU) 2024/2847, Art. 71(2))."
    },
    {
     "t": "p",
     "text": "The usual way to show compliance with an EU product law is a harmonised standard. For the CRA, those standards are late. This article sets out what the primary texts say about the delay, the new dates, and the routes a manufacturer can use while the standards are not there."
    },
    {
     "t": "h2",
     "text": "The standards are late: what the record shows"
    },
    {
     "t": "p",
     "text": "In February 2025 the Commission asked the European standardisation organisations (CEN, CENELEC and ETSI) for 41 standards in support of the CRA, known as M/606 (European Commission, CRA standardisation page). The request, Implementing Decision C(2025) 618 of 3 February 2025, set three adoption deadlines (C(2025) 618, Annex I):"
    },
    {
     "t": "ul",
     "items": [
      "**30 August 2026** for items 1 and 15, the horizontal principles and vulnerability-handling standards;",
      "**30 October 2026** for items 16 to 41, the product-specific standards for important and critical products;",
      "**30 October 2027** for items 2 to 14, the standards on the individual essential requirements."
     ]
    },
    {
     "t": "p",
     "text": "The first two dates have passed. According to Standards Drift, a standards-tracking site, as at 30 October 2026 no harmonised standard had been cited in the Official Journal for the CRA, ETSI had 18 work items (EN 304 617 to EN 304 642), and CEN-CENELEC's prEN 40000-1-1 and -1-2 had been at formal vote since 1 October 2026 (Standards Drift, 2 Nov 2026). We have not independently verified those status points; the deadline figures in that piece match the Commission's documents."
    },
    {
     "t": "h2",
     "text": "The new deadlines: agreed by Member States, not yet adopted"
    },
    {
     "t": "p",
     "text": "The Commission has prepared an amendment to C(2025) 618. A draft implementing decision dated 23 September 2026 went to the Member States' Committee on Standards by written procedure between 16 September and 13 October 2026 (Comitology register, CMTD(2026)1607). It would replace Annex I with these deadlines:"
    },
    {
     "t": "ul",
     "items": [
      "**items 1 and 15:** 30 November 2026;",
      "**items 16 to 41:** 31 January 2027;",
      "**items 2 to 14:** unchanged at 30 October 2027."
     ]
    },
    {
     "t": "p",
     "text": "The draft cites a joint report of the standardisation organisations of 3 June 2026 as the reason for the change. It also says that if the organisations do not accept the amended request within one month, the decision stops applying and the February 2025 version continues (draft decision, Art. 2)."
    },
    {
     "t": "p",
     "text": "On 13 October 2026 the committee gave a positive opinion: 26 Member States in favour, none against, one abstention (voting sheet, registered 28 October 2026). A positive opinion is not adoption. On 3 November 2026 the register showed no adopted act."
    },
    {
     "t": "p",
     "text": "Two points matter for planning. These dates are for the standards organisations to adopt standards, not for publication in the Official Journal. And none of them moves the CRA's own application dates."
    },
    {
     "t": "h2",
     "text": "The CRA dates that have not moved"
    },
    {
     "t": "ul",
     "items": [
      "**11 June 2026:** rules on notified bodies (Chapter IV) apply.",
      "**11 September 2026:** reporting obligations in Article 14 apply.",
      "**11 December 2027:** the rest of the regulation applies (Art. 71(2))."
     ]
    },
    {
     "t": "p",
     "text": "Article 14 also reaches backwards. It applies to all in-scope products, including those placed on the market before 11 December 2027 (Art. 69(3)). Other requirements apply to those older products only if they undergo a substantial modification from that date (Art. 69(2))."
    },
    {
     "t": "p",
     "text": "What Article 14 requires now: an early warning within 24 hours of becoming aware of an actively exploited vulnerability, a vulnerability notification within 72 hours, and a final report no later than 14 days after a corrective or mitigating measure is available. Notifications go to the coordinating CSIRT and ENISA through the single reporting platform (Art. 14(1)-(2))."
    },
    {
     "t": "h2",
     "text": "Why a harmonised standard matters"
    },
    {
     "t": "p",
     "text": "A product that conforms to a harmonised standard whose reference is published in the Official Journal is presumed to meet the essential requirements that standard covers (Art. 27(1)). The Commission's own guidance on harmonised standards is clear on the other side: \"The use of these standards remains voluntary. Manufacturers ... are free to choose another technical solution to demonstrate compliance\" (European Commission, harmonised standards page, accessed 3 Nov 2026)."
    },
    {
     "t": "p",
     "text": "So a missing standard does not make compliance impossible. It removes a shortcut. What it costs you depends on your product's category."
    },
    {
     "t": "h2",
     "text": "Route 1: default products, module A without standards"
    },
    {
     "t": "p",
     "text": "Most products with digital elements are neither \"important\" nor \"critical\". For them, the manufacturer can use internal control (module A) and assess conformity itself (Art. 32(1)(a)). The CRA's recitals say this also applies where a manufacturer chooses not to apply a harmonised standard in whole or in part."
    },
    {
     "t": "p",
     "text": "The price is documentation. The technical documentation must list the standards, common specifications or certification schemes applied. Where none were applied, it must describe the solutions adopted to meet the essential requirements in Annex I, Parts I and II, and list the other technical specifications used (Annex VII, point 5). The recitals add that the manufacturer has to show in its documentation how compliance is reached otherwise."
    },
    {
     "t": "p",
     "text": "In practice: build a requirement-by-requirement map from Annex I to your design, tests and processes, and keep the evidence."
    },
    {
     "t": "h2",
     "text": "Route 2: important products, class I"
    },
    {
     "t": "p",
     "text": "For important products in class I (Annex III), self-assessment under module A is available only if the manufacturer applies harmonised standards, common specifications or a European cybersecurity certification scheme at assurance level at least \"substantial\". Where these are not applied, applied only in part, or do not exist, the product must go through a third-party route: EU-type examination (module B) plus module C, or full quality assurance (module H) (Art. 32(2))."
    },
    {
     "t": "p",
     "text": "This is where the delay bites. Until a relevant standard is cited, a class I manufacturer should plan for a notified body. The rules on notified bodies have applied since 11 June 2026 (Art. 71(2)), so check early which bodies cover your product and how long their queues are."
    },
    {
     "t": "h2",
     "text": "Route 3: class II and critical products"
    },
    {
     "t": "p",
     "text": "Class II products always need a third-party route (module B+C or H) or, where available, a certification scheme at level at least \"substantial\" (Art. 32(3)). Critical products in Annex IV follow Article 32(4). For these groups, the missing standards change the evidence a notified body will look at, not whether a notified body is involved."
    },
    {
     "t": "h2",
     "text": "Two more fallbacks in the text"
    },
    {
     "t": "ul",
     "items": [
      "**Common specifications.** The Commission may adopt common specifications by implementing act, but only under conditions: it has asked for a standard, and the request was not accepted, the standard was not delivered on time, or it does not comply with the request; and no reference is published or expected within a reasonable period (Art. 27(2)). Conformity with common specifications also gives a presumption of conformity (Art. 27(4)), and they are repealed once a harmonised standard's reference is published (Art. 27(6)). None has been adopted for the CRA as far as the sources we checked show; do not plan on one.",
      "**EU cybersecurity certification.** A certificate or statement under the Cybersecurity Act (Regulation (EU) 2019/881) can give a presumption of conformity where a scheme is specified for this purpose (Art. 27(8)-(9))."
     ]
    },
    {
     "t": "h2",
     "text": "What a Turkish manufacturer should do now"
    },
    {
     "t": "ol",
     "items": [
      "**Classify each product:** default, important class I or II, or critical.",
      "**Set up Article 14 reporting now:** who decides in 24 hours, who files in 72 hours, and how you reach the single reporting platform.",
      "**Map Annex I** to your design, tests and processes, product by product.",
      "**Write the technical documentation as if no standard will arrive in time,** following Annex VII, point 5.",
      "**For class I and above, contact notified bodies** and plan for a third-party assessment.",
      "**Track the dates:** 30 November 2026 and 31 January 2027 for the standards organisations, if the amendment is adopted; and 11 December 2027 for the CRA itself."
     ]
    },
    {
     "t": "p",
     "text": "Our [CRA readiness check](/en/decision-lab/cra-readiness-check) shows where your gaps are. For Article 14 processes, see [CRA incident readiness](/en/solutions/cra-incident-readiness). If EU customers are asking you security questions under NIS2, see [NIS2 supplier security](/en/solutions/nis2-supplier-security)."
    },
    {
     "t": "h2",
     "text": "FAQ"
    },
    {
     "t": "faq",
     "items": [
      [
       "Are there harmonised standards for the CRA yet?",
       "According to Standards Drift (2 Nov 2026), none had been cited in the Official Journal as at 30 October 2026. Only cited standards give a presumption of conformity (Art. 27(1))."
      ],
      [
       "Did the CRA deadlines move?",
       "No. The CRA applies from 11 December 2027; reporting has applied since 11 September 2026. Only the deadlines for the standards organisations are being amended, and that amendment is not yet adopted."
      ],
      [
       "What are the proposed new standards deadlines?",
       "30 November 2026 for items 1 and 15, and 31 January 2027 for items 16 to 41; items 2 to 14 stay at 30 October 2027 (draft, positive committee opinion 13 Oct 2026)."
      ],
      [
       "Can we self-assess without a harmonised standard?",
       "For default products, yes, under module A, with documentation describing the solutions you used. For important class I products, not without standards, common specifications or certification; otherwise a notified body is needed."
      ],
      [
       "Do products we already sell fall under the CRA?",
       "Article 14 reporting applies to them already. Other requirements apply to products placed on the market before 11 December 2027 only if they are substantially modified from that date."
      ]
     ]
    },
    {
     "t": "sources",
     "title": "Sources (accessed 3 Nov 2026)",
     "items": [
      "Regulation (EU) 2024/2847 (Cyber Resilience Act), OJ L, 20.11.2024 (Art. 14, 27, 32, 69, 71; Annex VII): https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng",
      "European Commission, Implementing Decision C(2025) 618 of 3 Feb 2025 (standardisation request, Annex I): https://ec.europa.eu/transparency/documents-register/api/files/C%282025%29618%5F1/de00000001069729?rendition=false",
      "Comitology register, CMTD(2026)1607, Committee on Standards: draft implementing decision (Ares(2026)9002280, 23 Sep 2026) and voting sheet (Ares(2026)10140870, 28 Oct 2026): https://ec.europa.eu/transparency/comitology-register/screen/documents/D118113/1?lang=en (draft; voting sheet ref. V118783/01)",
      "European Commission, Cyber Resilience Act standardisation (last update 31 Jul 2026): https://digital-strategy.ec.europa.eu/en/policies/cra-standardisation",
      "European Commission, Harmonised standards: https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards_en",
      "Secondary: Standards Drift, \"Cyber Resilience Act: the second harmonised standards deadline (30 October 2026) has passed\", 2 Nov 2026: https://standardsdrift.com/analysis/the-second-cra-deadline/"
     ]
    }
   ]
  },
  "tr": {
   "path": "icgoruler/cra-uyumu-standart-yokken-turk-uretici",
   "title": "CRA Uyumu: Standart Yokken Türk Üretici Neye Dayanacak?",
   "description": "CRA için henüz atfı yayımlanmış uyumlaştırılmış standart yok, tarihler kayıyor. Siber Dayanıklılık Yasası 11 Aralık 2027'ye dek üreticiye hangi yolları açıyor?",
   "h1": "CRA uyumu: standart yokken Türk üretici neye dayanacak?",
   "blocks": [
    {
     "t": "p",
     "text": "Yönlendirici (router), endüstriyel kontrol cihazı, akıllı ev ürünü, yazılım ya da dijital unsur içeren hemen her ürünü AB'ye satıyorsanız, Siber Dayanıklılık Yasası (CRA) 11 Aralık 2027'den itibaren sizin için de geçerli. Bir kısmı ise şimdiden uygulanıyor: 11 Eylül 2026'dan beri üreticiler, aktif olarak istismar edilen güvenlik açıklarını bildirmek zorunda ((AB) 2024/2847 sayılı Tüzük, md. 71(2))."
    },
    {
     "t": "p",
     "text": "Bir AB ürün mevzuatına uyumu göstermenin olağan yolu uyumlaştırılmış standarttır. CRA'da bu standartlar gecikti. Bu yazıda gecikme, yeni tarihler ve standartlar yokken üreticinin başvurabileceği yollar konusunda birincil metinlerin ne söylediğini derliyoruz."
    },
    {
     "t": "h2",
     "text": "Standartlar gecikti: kayıtlar ne gösteriyor?"
    },
    {
     "t": "p",
     "text": "Komisyon Şubat 2025'te Avrupa standardizasyon kuruluşlarından (CEN, CENELEC ve ETSI) CRA'yı desteklemek üzere M/606 olarak bilinen 41 standart istedi (Avrupa Komisyonu, CRA standardizasyon sayfası). 3 Şubat 2025 tarihli C(2025) 618 sayılı Uygulama Kararı üç kabul tarihi belirledi (C(2025) 618, Ek I):"
    },
    {
     "t": "ul",
     "items": [
      "**30 Ağustos 2026:** 1 ve 15 numaralı kalemler; yatay ilkeler ve açık yönetimi standartları;",
      "**30 Ekim 2026:** 16-41 numaralı kalemler; önemli ve kritik ürünler için ürüne özgü standartlar;",
      "**30 Ekim 2027:** 2-14 numaralı kalemler; tek tek temel gereklere ilişkin standartlar."
     ]
    },
    {
     "t": "p",
     "text": "İlk iki tarih geçti. Standartları takip eden Standards Drift sitesine göre 30 Ekim 2026 itibarıyla CRA için AB Resmî Gazetesi'nde atıf yapılmış uyumlaştırılmış standart yoktu; ETSI'de 18 iş kalemi (EN 304 617 – EN 304 642) bulunuyordu; CEN-CENELEC'in prEN 40000-1-1 ve -1-2 taslakları 1 Ekim 2026'dan beri resmî oylamadaydı (Standards Drift, 2 Kasım 2026). Bu durum bilgilerini bağımsız olarak doğrulamadık; yazıdaki tarih bilgileri ise Komisyon belgeleriyle örtüşüyor."
    },
    {
     "t": "h2",
     "text": "Yeni tarihler: üye devletlerden olumlu görüş var, kabul henüz yok"
    },
    {
     "t": "p",
     "text": "Komisyon, C(2025) 618'i değiştiren bir karar taslağı hazırladı. 23 Eylül 2026 tarihli taslak uygulama kararı, 16 Eylül – 13 Ekim 2026 arasında yazılı usulle üye devletlerin Standartlar Komitesi'ne sunuldu (Komitoloji sicili, CMTD(2026)1607). Taslak Ek I'i şu tarihlerle değiştiriyor:"
    },
    {
     "t": "ul",
     "items": [
      "**1 ve 15 numaralı kalemler:** 30 Kasım 2026;",
      "**16-41 numaralı kalemler:** 31 Ocak 2027;",
      "**2-14 numaralı kalemler:** değişmeden 30 Ekim 2027."
     ]
    },
    {
     "t": "p",
     "text": "Taslak, değişikliğin gerekçesi olarak standardizasyon kuruluşlarının 3 Haziran 2026 tarihli ortak raporunu gösteriyor. Kuruluşlar değiştirilmiş talebi bir ay içinde kabul etmezse kararın uygulanmayacağını ve Şubat 2025 tarihli metnin geçerliliğini koruyacağını da belirtiyor (taslak karar, md. 2)."
    },
    {
     "t": "p",
     "text": "Komite 13 Ekim 2026'da olumlu görüş verdi: 26 üye devlet lehte, aleyhte oy yok, bir çekimser (oylama tutanağı, sicile kaydı 28 Ekim 2026). Olumlu görüş, kabul anlamına gelmiyor. 3 Kasım 2026 itibarıyla sicilde kabul edilmiş bir karar görünmüyordu."
    },
    {
     "t": "p",
     "text": "Planlama için iki nokta önemli. Bu tarihler standardizasyon kuruluşlarının standartları kabul etmesine ilişkin; AB Resmî Gazetesi'nde yayıma ilişkin değil. Hiçbiri de CRA'nın kendi uygulama tarihlerini değiştirmiyor."
    },
    {
     "t": "h2",
     "text": "Değişmeyen CRA tarihleri"
    },
    {
     "t": "ul",
     "items": [
      "**11 Haziran 2026:** onaylanmış kuruluşlara ilişkin kurallar (IV. Bölüm) uygulanmaya başladı.",
      "**11 Eylül 2026:** 14. maddedeki raporlama yükümlülükleri uygulanmaya başladı.",
      "**11 Aralık 2027:** Tüzüğün geri kalanı uygulanacak (md. 71(2))."
     ]
    },
    {
     "t": "ol",
     "items": [
      "madde geriye de uzanıyor: 11 Aralık 2027'den önce piyasaya sunulmuş olanlar dahil kapsamdaki tüm ürünlere uygulanıyor (md. 69(3)). Diğer gereklilikler bu eski ürünlere ancak o tarihten sonra esaslı bir değişiklik geçirirlerse uygulanıyor (md. 69(2))."
     ]
    },
    {
     "t": "ol",
     "items": [
      "maddenin şimdiden istedikleri: Aktif olarak istismar edilen bir açığı öğrendikten sonra 24 saat içinde erken uyarı, 72 saat içinde açık bildirimi ve düzeltici ya da hafifletici önlem kullanıma sunulduktan sonra en geç 14 gün içinde nihai rapor. Bildirimler, tek raporlama platformu üzerinden koordinatör CSIRT'e ve ENISA'ya yapılıyor (md. 14(1)-(2))."
     ]
    },
    {
     "t": "h2",
     "text": "Uyumlaştırılmış standart neden önemli?"
    },
    {
     "t": "p",
     "text": "AB Resmî Gazetesi'nde atfı yayımlanmış bir uyumlaştırılmış standarda uyan ürünün, o standardın kapsadığı temel gereklere uygun olduğu varsayılıyor (md. 27(1)). Komisyonun uyumlaştırılmış standartlar sayfası madalyonun öbür yüzünü de açıkça ortaya koyuyor: Bu standartların kullanımı gönüllü; üreticiler uyumu göstermek için başka bir teknik çözüm seçmekte serbest (Avrupa Komisyonu, uyumlaştırılmış standartlar sayfası, erişim 3 Kasım 2026)."
    },
    {
     "t": "p",
     "text": "Yani standart olmaması uyumu imkânsız kılmıyor; bir kestirmeyi ortadan kaldırıyor. Bunun size bedeli ürününüzün kategorisine bağlı."
    },
    {
     "t": "h2",
     "text": "1. yol: varsayılan ürünler, standartsız modül A"
    },
    {
     "t": "p",
     "text": "Dijital unsurlu ürünlerin çoğu ne \"önemli\" ne de \"kritik\" sınıfında. Bunlarda üretici iç kontrol (modül A) yoluyla uygunluğu kendisi değerlendirebiliyor (md. 32(1)(a)). CRA'nın gerekçe bölümü, üreticinin uyumlaştırılmış standardı tamamen ya da kısmen uygulamamayı seçtiği durumlarda da bunun geçerli olduğunu söylüyor."
    },
    {
     "t": "p",
     "text": "Bunun bedeli dokümantasyon. Teknik dosyada uygulanan standartlar, ortak spesifikasyonlar ya da sertifikasyon şemaları listelenmeli. Hiçbiri uygulanmadıysa Ek I'in I. ve II. bölümlerindeki temel gerekleri karşılamak için benimsenen çözümler tarif edilmeli ve kullanılan diğer teknik spesifikasyonlar listelenmeli (Ek VII, 5. bent). Gerekçe bölümü ayrıca üreticinin uyumu başka yoldan nasıl sağladığını teknik dosyasında göstermesi gerektiğini ekliyor."
    },
    {
     "t": "p",
     "text": "Pratikte yapılması gereken: Ek I'deki her gereği tasarımınıza, testlerinize ve süreçlerinize tek tek eşleyen bir harita kurmak ve kanıtı saklamak."
    },
    {
     "t": "h2",
     "text": "2. yol: önemli ürünler, I. sınıf"
    },
    {
     "t": "p",
     "text": "Ek III'teki I. sınıf önemli ürünlerde modül A ile öz değerlendirme ancak üretici uyumlaştırılmış standartları, ortak spesifikasyonları ya da en az \"kayda değer\" (substantial) güvence düzeyinde bir Avrupa siber güvenlik sertifikasyon şemasını uyguluyorsa mümkün. Bunlar uygulanmadıysa, kısmen uygulandıysa ya da mevcut değilse ürün üçüncü taraf yoluna girmek zorunda: AB tip incelemesi (modül B) ile modül C ya da tam kalite güvencesi (modül H) (md. 32(2))."
    },
    {
     "t": "p",
     "text": "Gecikmenin asıl acıttığı yer burası. İlgili standarda atıf yapılana kadar I. sınıf üreticisi onaylanmış kuruluşla çalışmayı planlamalı. Onaylanmış kuruluşlara ilişkin kurallar 11 Haziran 2026'dan beri uygulanıyor (md. 71(2)); ürününüzü hangi kuruluşların kapsadığını ve bekleme sürelerini erkenden kontrol edin."
    },
    {
     "t": "h2",
     "text": "3. yol: II. sınıf ve kritik ürünler"
    },
    {
     "t": "p",
     "text": "II. sınıf ürünler her durumda üçüncü taraf yolundan (modül B+C ya da H) ya da mevcutsa en az \"kayda değer\" (substantial) düzeyde bir sertifikasyon şemasından geçmek zorunda (md. 32(3)). Ek IV'teki kritik ürünler 32. maddenin 4. fıkrasına tabi. Bu gruplarda standartların olmaması, onaylanmış kuruluşun bakacağı kanıtı değiştiriyor; onaylanmış kuruluşun sürece dahil olup olmayacağını değil."
    },
    {
     "t": "h2",
     "text": "Metindeki iki yedek yol daha"
    },
    {
     "t": "ul",
     "items": [
      "**Ortak spesifikasyonlar.** Komisyon uygulama işlemiyle ortak spesifikasyon kabul edebilir; ama ancak belli koşullarda: Bir standart talep etmiş olmalı, talep kabul edilmemiş, standart zamanında teslim edilmemiş ya da talebe uygun olmamalı ve makul süre içinde atıf yayımlanmamış ya da beklenmiyor olmalı (md. 27(2)). Ortak spesifikasyonlara uyum da uygunluk varsayımı sağlıyor (md. 27(4)); bir uyumlaştırılmış standardın atfı yayımlandığında ise yürürlükten kaldırılıyor (md. 27(6)). Kontrol ettiğimiz kaynaklarda CRA için kabul edilmiş bir ortak spesifikasyon görünmüyor; planınızı buna dayandırmayın.",
      "**AB siber güvenlik sertifikasyonu.** Siber Güvenlik Yasası ((AB) 2019/881) kapsamındaki bir sertifika ya da beyan, bu amaçla belirlenmiş bir şema varsa uygunluk varsayımı sağlayabiliyor (md. 27(8)-(9))."
     ]
    },
    {
     "t": "h2",
     "text": "Türk üretici şimdi ne yapmalı?"
    },
    {
     "t": "ol",
     "items": [
      "**Her ürünü sınıflandırın:** varsayılan, önemli I. ya da II. sınıf veya kritik.",
      "**14. madde raporlamasını şimdi kurun:** 24 saatte kim karar veriyor, 72 saatte kim bildiriyor, tek raporlama platformuna nasıl ulaşıyorsunuz?",
      "**Ek I'i ürün ürün** tasarımınıza, testlerinize ve süreçlerinize eşleyin.",
      "**Teknik dosyayı standart zamanında gelmeyecekmiş gibi yazın;** Ek VII'nin 5. bendini izleyin.",
      "**I. sınıf ve üzerindeki ürünler için onaylanmış kuruluşlarla görüşün** ve üçüncü taraf değerlendirmesini planlayın.",
      "**Tarihleri izleyin:** değişiklik kabul edilirse standardizasyon kuruluşları için 30 Kasım 2026 ve 31 Ocak 2027; CRA'nın kendisi için 11 Aralık 2027."
     ]
    },
    {
     "t": "p",
     "text": "Nerede durduğunuzu görmek için [CRA hazırlık testimizi](/tr/karar-laboratuvari/cra-hazirlik-testi) kullanabilirsiniz. 14. madde süreçleri için [CRA olay hazırlığı](/tr/cozumler/cra-olay-hazirligi) sayfamıza bakın. AB'li müşterileriniz NIS2 kapsamında güvenlik soruları soruyorsa [NIS2 tedarikçi güvenliği](/tr/cozumler/nis2-tedarikci-guvenligi) çalışmamız bu katmanı ele alıyor."
    },
    {
     "t": "h2",
     "text": "Sıkça sorulan sorular"
    },
    {
     "t": "faq",
     "items": [
      [
       "CRA için uyumlaştırılmış standart var mı?",
       "Standards Drift'e göre (2 Kasım 2026) 30 Ekim 2026 itibarıyla AB Resmî Gazetesi'nde atıf yapılmış bir standart yoktu. Uygunluk varsayımını yalnızca atıf yapılmış standartlar sağlıyor (md. 27(1))."
      ],
      [
       "CRA'nın tarihleri ertelendi mi?",
       "Hayır. CRA 11 Aralık 2027'den itibaren uygulanıyor; raporlama 11 Eylül 2026'dan beri yürürlükte. Değiştirilen yalnızca standardizasyon kuruluşlarının tarihleri ve bu değişiklik henüz kabul edilmedi."
      ],
      [
       "Önerilen yeni standart tarihleri neler?",
       "1 ve 15 numaralı kalemler için 30 Kasım 2026, 16-41 için 31 Ocak 2027; 2-14 numaralı kalemler 30 Ekim 2027'de kalıyor (taslak; komite olumlu görüşü 13 Ekim 2026)."
      ],
      [
       "Standart olmadan öz değerlendirme yapabilir miyiz?",
       "Varsayılan ürünlerde evet: modül A ile ve kullandığınız çözümleri anlatan bir teknik dosyayla. I. sınıf önemli ürünlerde standart, ortak spesifikasyon ya da sertifikasyon olmadan hayır; onaylanmış kuruluş gerekiyor."
      ],
      [
       "Şu an sattığımız ürünler CRA kapsamında mı?",
       "14. madde raporlaması bu ürünlere şimdiden uygulanıyor. Diğer gereklilikler, 11 Aralık 2027'den önce piyasaya sunulan ürünlere ancak bu tarihten sonra esaslı bir değişiklik yapılırsa uygulanıyor."
      ]
     ]
    },
    {
     "t": "sources",
     "title": "Kaynaklar (erişim 3 Kasım 2026)",
     "items": [
      "(AB) 2024/2847 sayılı Tüzük (Siber Dayanıklılık Yasası), AB Resmî Gazetesi L, 20.11.2024 (md. 14, 27, 32, 69, 71; Ek VII): https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng",
      "Avrupa Komisyonu, 3 Şubat 2025 tarihli C(2025) 618 sayılı Uygulama Kararı (standardizasyon talebi, Ek I): https://ec.europa.eu/transparency/documents-register/api/files/C%282025%29618%5F1/de00000001069729?rendition=false",
      "Komitoloji sicili, CMTD(2026)1607, Standartlar Komitesi: taslak uygulama kararı (Ares(2026)9002280, 23 Eylül 2026) ve oylama tutanağı (Ares(2026)10140870, 28 Ekim 2026): https://ec.europa.eu/transparency/comitology-register/screen/documents/D118113/1?lang=en (draft; voting sheet ref. V118783/01)",
      "Avrupa Komisyonu, CRA standardizasyonu (son güncelleme 31 Temmuz 2026): https://digital-strategy.ec.europa.eu/en/policies/cra-standardisation",
      "Avrupa Komisyonu, Uyumlaştırılmış standartlar: https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards_en",
      "İkincil kaynak: Standards Drift, \"Cyber Resilience Act: the second harmonised standards deadline (30 October 2026) has passed\", 2 Kasım 2026: https://standardsdrift.com/analysis/the-second-cra-deadline/"
     ]
    }
   ]
  }
 }
];

export const guideByKey = (key: string) => guides.find(g => g.key === key);
