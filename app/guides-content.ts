import type { Lang } from "./content";

// Long-form guides (EUDR, steel DPP, CBAM 2026, CRA standards, CRA reporting). Text comes from the reviewed article drafts as written;
// inline links use [text](/path) and emphasis uses *text*, rendered by app/guides.tsx.
export type GuideBlock =
  | { t: "h2" | "h3" | "p"; text: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "faq"; items: [string, string][] }
  | { t: "sources"; title: string; items: string[] };
export type GuideText = { path: string; title: string; description: string; h1: string; blocks: GuideBlock[] };
export type Guide = { key: string; solution: string; date: string; dateModified?: string; checked: Record<Lang, string>; image: string; readingTime: Record<Lang, string>; topic: Record<Lang, string> } & Record<Lang, GuideText>;

export const guides: Guide[] = [
 {
  "key": "guideGreenDeal",
  "solution": "solutionCbam",
  "date": "2026-11-11",
  "checked": {
   "en": "11 November 2026",
   "tr": "11 Kasım 2026"
  },
  "image": "guideGreenDeal",
  "readingTime": {
   "en": "9 min",
   "tr": "9 dk"
  },
  "topic": {
   "en": "Green Deal",
   "tr": "Yeşil Mutabakat"
  },
  "en": {
   "path": "insights/turkiye-green-deal-action-plan-2026-2030-exporters",
   "title": "Türkiye Green Deal Action Plan 2026-2030: Exporter Guide",
   "description": "Türkiye's Green Deal Action Plan 2026-2030 is out. What its CBAM, TR ETS, national CBAM, Digital Product Passport and EUDR actions mean for exporters to the EU.",
   "h1": "Türkiye's Green Deal Action Plan 2026–2030: what changes for exporters to the EU",
   "blocks": [
    {
     "t": "p",
     "text": "On 10 November 2026, while COP31 was under way in Antalya, Türkiye put its updated Green Deal Action Plan (GDAP) into effect through Presidential Circular No. 2026/12, published in the Official Gazette (No. 33426). The plan was prepared under the coordination of the Ministry of Trade, and the full text is published on the Ministry's website. It replaces the 2021 plan and sets out 11 policy areas, 41 objectives and 142 actions (GDAP 2026–2030)."
    },
    {
     "t": "p",
     "text": "For an EU buyer or investor, the plan is a clear official signal of where Türkiye's climate-trade policy is going. For a Turkish exporter, a handful of actions matter directly: CBAM data, the Türkiye Emissions Trading System (TR ETS), a possible **national CBAM**, the Digital Product Passport (DPP) and the EU Deforestation Regulation (EUDR). This article reads the plan from the exporter's side: what it says, when, who leads, and what to do now."
    },
    {
     "t": "h2",
     "text": "Why the update, and what the trade numbers show"
    },
    {
     "t": "p",
     "text": "The EU CBAM's definitive phase, with financial obligations, began on 1 January 2026. According to the plan, the EU takes **47%** of Türkiye's exports of CBAM-covered goods, and Türkiye is the EU's **second-largest supplier** of those goods (GDAP 2026–2030, Carbon Pricing Policies chapter)."
    },
    {
     "t": "p",
     "text": "Early effects are visible. In figures given by Trade Minister Ömer Bolat at Steel Networking Summits 2026 on 26 October 2026, Türkiye's **exports of CBAM-covered steel products to the EU fell 1.7% in January–September 2026**. Iron and steel exports to the EU overall fell 6.7% (Ministry of Trade, 26 Oct 2026). We set out the context in [our CBAM 2026 update](/en/insights/cbam-2026-update-tr-ets-cop31)."
    },
    {
     "t": "p",
     "text": "Those numbers do not prove CBAM alone is diverting trade; quotas, prices and demand moved at the same time. But the direction is clear, and the plan starts from exactly this pressure."
    },
    {
     "t": "h2",
     "text": "Carbon pricing: 4 objectives, 14 actions"
    },
    {
     "t": "p",
     "text": "The action timeline lists 14 carbon-pricing actions (1.1.1–1.4.4) under four objectives; the Turkish plan's introductory narrative gives the number as 13 (GDAP 2026–2030, Action Timeline). The ones an exporter should track:"
    },
    {
     "t": "ul",
     "items": [
      "**Sectoral impact of the TR ETS (1.1.1, 2026–2028, Ministry of Environment, Urbanisation and Climate Change):** a study of the national carbon price's effect on competitiveness and costs by sector.",
      "**Carbon leakage list (1.1.3, 2027–2030):** a method, then a list of high-risk sectors and risk levels, which will shape how sectors are protected under the TR ETS.",
      "**Verification and accreditation (1.1.4, 2026–2030, Ministry of Environment, Urbanisation and Climate Change and TÜRKAK):** planning verifier capacity by sector and **harmonising TR ETS and CBAM verification criteria**, which could spare installations a double verification burden.",
      "**From default to actual values (1.2.3, 2026–2028, Ministry of Trade):** access to verified emissions data in CBAM sectors, enough accredited verifiers, and work \"to ensure that default emission values converge toward actual emission values\".",
      "**Renewable electricity (1.2.4, 2026–2028):** pressing the EU to count unlicensed renewable installations in indirect-emissions accounting and to accept **YEK-G, Türkiye's renewable energy guarantee-of-origin system, in CBAM Scope 2 calculations**."
     ]
    },
    {
     "t": "p",
     "text": "The plan also states that deducting the TR ETS carbon price from CBAM liability on exports to the EU is expected to support competitiveness. That is an objective, not a working mechanism: the deduction depends on Article 9 of the EU CBAM Regulation and its implementing rules. The Commission adopted the implementing act on 5 November 2026, but it has not yet been published in the Official Journal. We cover the detail in [our TR ETS market and registry article](/en/insights/turkiye-ets-market-registry-cbam)."
    },
    {
     "t": "h2",
     "text": "A national CBAM is now on the agenda"
    },
    {
     "t": "p",
     "text": "The least discussed item is the objective \"Establishing a National CBAM\", with two actions led by the Ministry of Trade:"
    },
    {
     "t": "ul",
     "items": [
      "**1.3.1 (2027):** a sectoral impact assessment and the **legislative framework** for a national CBAM compatible with the TR ETS.",
      "**1.3.2 (2027–2028):** **a mechanism similar to the CBAM registry**, inter-agency data sharing, analysis of sectors' emissions competitiveness, and \"analyzing the embedded emissions of products and identifying potential product groups that could be included in the CBAM scope\"."
     ]
    },
    {
     "t": "p",
     "text": "The logic is familiar from the EU: once Turkish producers pay a carbon price under the TR ETS, imports should not undercut them by avoiding it. The plan gives no start date, price or product list; 2027 is a work schedule, not an entry-into-force date. For companies that both export and import products such as steel, aluminium or cement, there are two practical implications: the embedded emissions of your imported inputs may later be required in Türkiye too; and the same dataset you already provide to your EU customer may also be requested in a domestic registry."
    },
    {
     "t": "h2",
     "text": "Digital Product Passport, ecodesign and customs"
    },
    {
     "t": "p",
     "text": "The Green and Circular Economy area sets 9 objectives and 31 actions. The plan notes that the Commission's 2025–2030 working plan prioritises 16 product groups, including iron and steel, aluminium, apparel, tyres, furniture and household appliances. For exporters, the key actions are:"
    },
    {
     "t": "ul",
     "items": [
      "**DPP compliance (2.5.2, 2026–2027, Ministry of Trade):** negotiating Türkiye's access to the EU DPP database, mapping data and digital-infrastructure needs, and preparing a **DPP Compliance Roadmap**.",
      "**EU databases (2.3.2, 2026–2028):** rules on protecting trade secrets, **EU recognition of Turkish e-signatures**, and consultations on joining EPREL and the DPP system.",
      "**Ecodesign alignment (2.3.1, 2026–2030):** ESPR and the Batteries, Construction Products, End-of-Life Vehicles and Packaging regulations, plus accreditation for notified bodies and test labs.",
      "**Standards (2.3.5):** a Turkish Standards Institute (TSE) mirror committee to follow CEN/CENELEC ecodesign work.",
      "**Customs (2.3.3, 2027–2030):** integrating customs processes with EU databases and assessing alignment with the EU Single Window Environment for Customs."
     ]
    },
    {
     "t": "p",
     "text": "None of this changes what your EU customer will ask for in the meantime: the buyer's passport data request will not wait for the Ankara–Brussels database talks. See [our steel DPP article](/en/insights/steel-digital-product-passport-espr-turkiye) for what a steel passport is likely to require."
    },
    {
     "t": "h2",
     "text": "EUDR: state data is coming, but may not arrive by 30 December"
    },
    {
     "t": "p",
     "text": "Action 2.5.3 (\"as of 2026\", Ministry of Agriculture and Forestry with the Ministry of Trade) covers the basic data EUDR sectors need for due diligence, a standard format for national forest and land-use data (geolocation, boundaries, permits, harvesting, production) and verification of forest cover against the 31 December 2020 cut-off."
    },
    {
     "t": "p",
     "text": "That will help wood and furniture exporters over time, but the plan sets no completion date, while EUDR applies to large and medium operators from 30 December 2026. For today's obligation, see [our EUDR 30 December article](/en/insights/eudr-30-december-2026-turkish-exporters)."
    },
    {
     "t": "h2",
     "text": "What the plan does not do"
    },
    {
     "t": "ol",
     "items": [
      "**It creates no new company obligations.** It is a coordination document; legal duties come from separate law such as the TR ETS Regulation (Official Gazette 27 Aug 2026, No. 33353) and from EU regulations.",
      "**No date means no date.** For the national CBAM, 2027 is when the framework work happens, not when a charge starts.",
      "**Several outcomes depend on Brussels.** DPP database access and YEK-G recognition need EU acceptance; the TR ETS deduction depends on EU rules and on meeting their conditions."
     ]
    },
    {
     "t": "p",
     "text": "Monitoring is defined: under the Circular, the **Green Deal Working Group**, set up in 2021 and chaired by the Trade Minister or a deputy minister he designates, with deputy ministers from 11 other ministries plus the deputy heads of the Presidency of Strategy and Budget and the Investment and Finance Office and the acting head of the Council of Higher Education, will continue to track progress, and each institution will send an **annual progress report** to the Ministry of Trade (Circular No. 2026/12, Official Gazette, 10 Nov 2026)."
    },
    {
     "t": "h2",
     "text": "Six steps for exporters now"
    },
    {
     "t": "ol",
     "items": [
      "**Build your emissions data on actual values.** The plan makes convergence from defaults to actuals a public goal; your buyers are moving the same way. Test which route costs you less with the [CBAM readiness check](/en/decision-lab/cbam-readiness-check).",
      "**One dataset, three uses.** Use the same installation data for EU CBAM, TR ETS monitoring and a possible national CBAM. Our [CBAM data readiness](/en/solutions/cbam-data-readiness) and [Türkiye ETS readiness](/en/solutions/turkiye-ets-readiness) work sets this up.",
      "**Book a verifier early.** The plan itself provides for work to reach a sufficient number of accredited verifiers; a squeeze in 2027, before the first CBAM declarations, is plausible.",
      "**Keep your renewable electricity evidence.** YEK-G and unlicensed solar records may cut indirect emissions if the EU accepts them, and answer buyer questions either way.",
      "**Ask your input suppliers for embedded emissions.** If a national CBAM comes, that will be the first question.",
      "**Plan passport data around customer demand,** not around the timing of government talks."
     ]
    },
    {
     "t": "p",
     "text": "To decide which step comes first for you, see our [solutions](/en/solutions) and the [Decision Lab](/en/decision-lab). Our [EU regulation calendar](/en/insights/eu-regulation-calendar) tracks every Green Deal deadline."
    },
    {
     "t": "h2",
     "text": "FAQ"
    },
    {
     "t": "faq",
     "items": [
      [
       "Does the Green Deal Action Plan create new obligations for companies?",
       "Not directly. It assigns tasks and timelines to public bodies. Company obligations come from separate legislation such as the TR ETS Regulation and from EU regulations."
      ],
      [
       "When will Türkiye's national CBAM start?",
       "The plan gives no start date. Action 1.3.1 schedules an impact assessment and legal framework for 2027; action 1.3.2 schedules a CBAM-style registry mechanism for 2027–2028."
      ],
      [
       "Will the carbon price I pay under the TR ETS be deducted from EU CBAM?",
       "That is the plan's aim, but no deduction can be claimed today. It depends on Article 9 of the EU CBAM Regulation; the implementing act setting the calculation and evidence rules was adopted by the Commission on 5 November 2026 (C(2026) 7665) but had not been published in the EU Official Journal as of 11 November 2026."
      ],
      [
       "Do YEK-G certificates reduce indirect emissions under CBAM?",
       "Not yet. Action 1.2.4 commits Türkiye to seek EU acceptance of YEK-G in Scope 2 calculations; the outcome depends on the EU."
      ],
      [
       "Where can I read the full plan?",
       "The Ministry of Trade published it in Turkish and English (PDF) on its Green Deal announcements page."
      ]
     ]
    },
    {
     "t": "sources",
     "title": "Sources (accessed 11 November 2026)",
     "items": [
      "Presidential Circular No. 2026/12 on the Green Deal Action Plan (2026–2030), Official Gazette of Türkiye, 10 Nov 2026, No. 33426: [https://www.resmigazete.gov.tr/eskiler/2026/11/20261110-5.pdf](https://www.resmigazete.gov.tr/eskiler/2026/11/20261110-5.pdf)",
      "Ministry of Trade, \"Green Deal Action Plan (2026–2030) published\", 10 Nov 2026: [https://ticaret.gov.tr/dis-iliskiler/yesil-mutabakat/duyurular/yesil-mutabakat-eylem-plani-2026-2030-yayimlandi](https://ticaret.gov.tr/dis-iliskiler/yesil-mutabakat/duyurular/yesil-mutabakat-eylem-plani-2026-2030-yayimlandi)",
      "Ministry of Trade, Green Deal Action Plan (2026–2030), full text (PDF, EN): [https://ticaret.gov.tr/data/6af2bb11269de173e872a5f6/Green%20Deal%20Action%20Plan%20(2026-2030).pdf](https://ticaret.gov.tr/data/6af2bb11269de173e872a5f6/Green%20Deal%20Action%20Plan%20%282026-2030%29.pdf)",
      "Ministry of Trade, \"Trade Minister Ömer Bolat speaks at Steel Networking Summits 2026\" (Turkish), 26 Oct 2026: [https://ticaret.gov.tr/haberler/ticaret-bakani-omer-bolat-steel-networking-summits-2026da-konustu](https://ticaret.gov.tr/haberler/ticaret-bakani-omer-bolat-steel-networking-summits-2026da-konustu)"
     ]
    }
   ]
  },
  "tr": {
   "path": "icgoruler/yesil-mutabakat-eylem-plani-2026-2030-ihracatci",
   "title": "Yeşil Mutabakat Eylem Planı 2026-2030: İhracatçıya Etkisi",
   "description": "Yeşil Mutabakat Eylem Planı (2026-2030) yayımlandı. SKDM, Türkiye ETS, ulusal SKDM, Dijital Ürün Pasaportu ve EUDR eylemleri ihracatçı için ne anlama geliyor?",
   "h1": "Yeşil Mutabakat Eylem Planı (2026–2030): ihracatçı için ne değişiyor, ne değişmiyor?",
   "blocks": [
    {
     "t": "p",
     "text": "10 Kasım 2026'da, Antalya'daki COP31 sürerken, Türkiye'nin güncellenen Yeşil Mutabakat Eylem Planı (YMEP) 2026/12 sayılı Cumhurbaşkanlığı Genelgesi ile yürürlüğe konuldu (RG 10.11.2026, sayı 33426). Plan, Ticaret Bakanlığı'nın koordinasyonunda hazırlandı ve tam metni Bakanlığın internet sitesinde yayımlandı. 2021 tarihli ilk planın yerini alan yeni metin 11 politika alanı, 41 hedef ve 142 eylemden oluşuyor (YMEP 2026–2030)."
    },
    {
     "t": "p",
     "text": "142 eylemin büyük bölümü kamu kurumlarına görev veriyor. Ancak AB'ye ihracat yapan bir şirket için birkaç eylem doğrudan bilançoya ve müşteri ilişkisine dokunuyor: SKDM verisi, Türkiye ETS, gündeme gelebilecek bir **ulusal SKDM**, Dijital Ürün Pasaportu ve EUDR. Bu yazıda planı ihracatçının gözünden okuyoruz: Ne diyor, ne zaman, sorumlusu kim ve şirketin bugün ne yapması mantıklı?"
    },
    {
     "t": "h2",
     "text": "Plan neden şimdi güncellendi: rakamlar ne söylüyor?"
    },
    {
     "t": "p",
     "text": "AB'nin Sınırda Karbon Düzenleme Mekanizması (SKDM) 1 Ocak 2026'da mali yükümlülük dönemine girdi. Plana göre AB, SKDM kapsamındaki ürünlerde Türkiye'nin ihracatının **%47'sini** alıyor; Türkiye de bu ürünlerde AB'nin **ikinci büyük tedarikçisi** konumunda (YMEP 2026–2030, Karbon Fiyatlandırma Politikaları bölümü)."
    },
    {
     "t": "p",
     "text": "İlk etkiler görünmeye başladı. Ticaret Bakanı Ömer Bolat'ın 26 Ekim 2026'da Steel Networking Summits 2026'da paylaştığı rakamlara göre, 2026'nın Ocak–Eylül döneminde **SKDM kapsamındaki çelik ürünlerinde AB'ye ihracat %1,7 azaldı**. Demir-çelikte AB'ye toplam ihracat ise %6,7 geriledi (Ticaret Bakanlığı, 26 Ekim 2026). Bu rakamları bağlamıyla birlikte [SKDM 2026 güncelleme yazımızda](/tr/icgoruler/skdm-2026-guncel-sertifika-fiyati-tr-ets) ele aldık."
    },
    {
     "t": "p",
     "text": "Bu rakamlar tek başına \"SKDM ihracatı düşürdü\" demeye yetmez; aynı dönemde kotalar, fiyatlar ve talep de birlikte etkili oldu. Ama yön açık: AB pazarında kalmak isteyen ihracatçı için emisyon verisi artık ticari bir gereklilik. Yeni plan da tam bu noktadan yola çıkıyor."
    },
    {
     "t": "h2",
     "text": "Karbon fiyatlandırması: 4 hedef, 14 eylem"
    },
    {
     "t": "p",
     "text": "Planın eylem takvimi, karbon fiyatlandırması başlığında 4 hedef altında 14 eylem (1.1.1–1.4.4) sıralıyor; planın Türkçe metninin giriş bölümünde ise bu sayı 13 olarak geçiyor (YMEP 2026–2030, Eylem Takvimi). İhracatçıyı en çok ilgilendirenler şunlar:"
    },
    {
     "t": "ul",
     "items": [
      "**Türkiye ETS'nin sektörel etkileri (1.1.1, 2026–2028, Çevre, Şehircilik ve İklim Değişikliği Bakanlığı):** Ulusal karbon fiyatının sektörlerin rekabet gücü ve maliyetleri üzerindeki etkisini ölçecek bir çalışma.",
      "**Karbon kaçağı riski yüksek sektörler listesi (1.1.3, 2027–2030):** Önce yöntem, ardından liste ve risk seviyeleri belirlenecek. Bu liste, Türkiye ETS'de hangi sektörün nasıl korunacağının temelini oluşturacak.",
      "**Doğrulama ve akreditasyon (1.1.4, 2026–2030, ÇŞİDB ve TÜRKAK):** Doğrulayıcı kapasitesinin sektör bazında planlanması ve **Türkiye ETS ile SKDM doğrulama kriterlerinin uyumlaştırılması**. Aynı tesis için iki ayrı doğrulamanın getirdiği yükün azalması açısından önemli.",
      "**Varsayılan değerlerden gerçek değerlere (1.2.3, 2026–2028, Ticaret Bakanlığı):** SKDM sektörlerinde doğrulanmış emisyon verisine erişim, yeterli sayıda akredite doğrulayıcı ve \"varsayılan emisyon değerlerin gerçek emisyon değerlerine yakınsanmasına yönelik çalışmalar\".",
      "**Yenilenebilir elektrik ve dolaylı emisyon (1.2.4, 2026–2028):** Lisanssız yenilenebilir enerji yatırımlarının AB'nin dolaylı emisyon hesabında dikkate alınması ve **YEK-G sisteminin SKDM'de kapsam 2 hesabında kullanılabilmesi** için AB nezdinde girişimde bulunulması."
     ]
    },
    {
     "t": "p",
     "text": "Plan ayrıca, Türkiye ETS'de ödenecek karbon bedelinin AB'ye ihracatta SKDM yükümlülüğünden **mahsup edilmesiyle** rekabet gücünün destekleneceğini belirtiyor. Bu bir hedef ve beklenti; mahsubun nasıl işleyeceği AB SKDM Tüzüğü'nün 9. maddesine ve uygulama kurallarına bağlı. Komisyon bu kuralları içeren uygulama tüzüğünü 5 Kasım 2026'da kabul etti, ancak metin henüz AB Resmî Gazetesi'nde yayımlanmadı. Ayrıntıları [Türkiye ETS piyasası ve İKS hesabı yazımızda](/tr/icgoruler/tr-ets-piyasasi-iks-hesabi-skdm) ele aldık."
    },
    {
     "t": "h2",
     "text": "Ulusal SKDM: planın en yeni ama en az konuşulan maddesi"
    },
    {
     "t": "p",
     "text": "Planın \"Ulusal Sınırda Karbon Düzenleme Mekanizması\" hedefi iki eylemden oluşuyor; ikisinin de sorumlusu Ticaret Bakanlığı:"
    },
    {
     "t": "ul",
     "items": [
      "**1.3.1 (2027):** Türkiye ETS ile uyumlu bir ulusal SKDM için sektörel etki analizi ve **mevzuat çerçevesinin oluşturulması**.",
      "**1.3.2 (2027–2028):** **SKDM kayıt sistemine benzer bir mekanizmanın kurulması**, kurumlar arası veri paylaşımı, sektörlerin emisyon rekabetçiliğinin analizi ve \"ürünlerin gömülü emisyon değerlerinin analiz edilmesi, SKDM kapsamına alınabilecek potansiyel ürün gruplarının belirlenmesi\"."
     ]
    },
    {
     "t": "p",
     "text": "Bu ne anlama geliyor? Türkiye ETS yerli üreticiye karbon maliyeti getirdiğinde, aynı ürünü ithal eden rakibin bu maliyetten kurtulmaması için sınırda bir düzeltme düşünülüyor. Plan bir yürürlük tarihi, fiyat ya da ürün listesi vermiyor; 2027 için öngörülen, mevzuat çerçevesi ve etki analizi. Yine de çelik, alüminyum ya da çimento gibi ürünlerde hem ihracat hem ithalat yapan şirketler için iki sonuç var: İthal girdinizin gömülü emisyonu ileride Türkiye'de de sorulabilir; AB'deki müşterinize verdiğiniz veri setinin aynısı yurt içindeki bir kayıt sisteminde de istenebilir."
    },
    {
     "t": "h2",
     "text": "Dijital Ürün Pasaportu, ekotasarım ve gümrük: veri altyapısı eylemleri"
    },
    {
     "t": "p",
     "text": "İkinci politika alanı (Yeşil ve Döngüsel Ekonomi) 9 hedef ve 31 eylem içeriyor. Plan, Avrupa Komisyonu'nun 2025–2030 çalışma planında demir-çelik, alüminyum, hazır giyim, lastik, mobilya ve beyaz eşya dâhil 16 ürün grubuna öncelik verildiğini hatırlatıyor. İhracatçı açısından öne çıkan eylemler:"
    },
    {
     "t": "ul",
     "items": [
      "**Dijital Ürün Pasaportu uyumu (2.5.2, 2026–2027, Ticaret Bakanlığı):** Türkiye'nin AB DPP veri tabanına erişimi için Komisyon'la müzakere, veri ve dijital altyapı ihtiyaçlarının belirlenmesi ve bir **DPP Uyum Yol Haritası** hazırlanması.",
      "**AB veri tabanlarına katılım (2.3.2, 2026–2028):** EPREL ve DPP için ticari sırların korunmasına yönelik hukuki düzenleme, **e-imzaların AB tarafından tanınması** ve katılım adımları konusunda AB ile istişare.",
      "**Ekotasarım mevzuatına uyum (2.3.1, 2026–2030):** ESPR ile Pil, Yapı Ürünleri, Araç Döngüselliği ve Ambalaj tüzükleri; onaylanmış kuruluşlar ve test laboratuvarları için akreditasyon altyapısı.",
      "**Standardizasyon (2.3.5):** TSE bünyesinde, CEN/CENELEC ekotasarım çalışmalarını izleyecek bir ayna komite kurulması.",
      "**Gümrük entegrasyonu (2.3.3, 2027–2030):** Gümrük süreçlerinin AB mevzuatındaki veri tabanlarıyla entegrasyonu ve AB Gümrük Tek Pencere ortamına uyumun değerlendirilmesi."
     ]
    },
    {
     "t": "p",
     "text": "Bu eylemler sonuçlanana kadar şirketin önündeki iş değişmiyor: AB'deki müşteriniz pasaport verisini sizden isteyecek ve bu talep, Türkiye'nin veri tabanına erişim müzakeresini beklemeyecek. Çelikte neler istenebileceğini [çelik Dijital Ürün Pasaportu yazımızda](/tr/icgoruler/celik-dijital-urun-pasaportu-espr) anlattık."
    },
    {
     "t": "h2",
     "text": "EUDR: veri devletten de gelecek, ama 30 Aralık'a yetişmeyebilir"
    },
    {
     "t": "p",
     "text": "Eylem 2.5.3 (\"2026 itibarıyla\", Tarım ve Orman Bakanlığı ile Ticaret Bakanlığı) şunları öngörüyor: EUDR kapsamındaki sektörlerin durum tespiti için ihtiyaç duyacağı temel verilerin belirlenmesi, ulusal orman ve arazi kullanım verileri (coğrafi konum, sınırlar, izinler, hasat ve üretim) için standart bir format oluşturulması ve ulusal orman örtüsü ile kaybının 31 Aralık 2020 referans tarihine göre doğrulanması."
    },
    {
     "t": "p",
     "text": "Bu, ahşap ve mobilya ihracatçısı için orta vadede ciddi bir kolaylık anlamına geliyor. Ancak plan bir bitiş tarihi vermiyor; büyük ve orta ölçekli işletmeler için uygulama ise 30 Aralık 2026'da başlıyor. Bugünkü yükümlülükler için [EUDR 30 Aralık yazımıza](/tr/icgoruler/eudr-30-aralik-2026-ihracatci) bakabilirsiniz."
    },
    {
     "t": "h2",
     "text": "Plan neyi söylemiyor"
    },
    {
     "t": "p",
     "text": "Planı okurken üç sınırı akılda tutmak gerekiyor:"
    },
    {
     "t": "ol",
     "items": [
      "**Yeni yükümlülük getirmiyor.** Plan bir koordinasyon belgesi; şirketlerin doğrudan yükümlülükleri Türkiye ETS Yönetmeliği (RG 27.08.2026, 33353) gibi ayrı mevzuattan ve AB düzenlemelerinden doğuyor.",
      "**Tarih verilmeyen yerde tarih yok.** Ulusal SKDM için 2027 bir çalışma takvimi, yürürlük tarihi değil.",
      "**Sonuç AB'nin kararına bağlı.** DPP veri tabanına erişim ve YEK-G'nin kapsam 2'de tanınması AB'nin kabulüne; Türkiye ETS mahsubu ise AB kurallarına ve bu kuralların koşullarının sağlanmasına bağlı hedefler."
     ]
    },
    {
     "t": "p",
     "text": "Uygulamanın nasıl izleneceği de belli. Genelge'ye göre 2021'de kurulan **Yeşil Mutabakat Çalışma Grubu**, Ticaret Bakanı ya da görevlendireceği bakan yardımcısının başkanlığında, 11 bakanlığın bakan yardımcıları ile Strateji ve Bütçe Başkan Yardımcısı, Yatırım ve Finans Ofisi Başkan Yardımcısı ve YÖK Başkan Vekilinin katılımıyla çalışmalarını sürdürecek ve gelişmeleri izleyecek. Kurumlar da sorumlu oldukları eylemlerle ilgili **yıllık gelişme raporunu** Ticaret Bakanlığı'na gönderecek (Genelge 2026/12, RG 10.11.2026)."
    },
    {
     "t": "h2",
     "text": "İhracatçı için 6 adımlık eylem listesi"
    },
    {
     "t": "ol",
     "items": [
      "**Emisyon verinizi \"gerçek değer\" üzerine kurun.** Plan, varsayılan değerlerden gerçek değerlere geçişi bir kamu hedefi hâline getirdi; müşterileriniz de aynı yöne ilerliyor. Hangisinin size daha ucuza geldiğini [SKDM hazırlık testi](/tr/karar-laboratuvari/cbam-hazirlik-testi) ile ölçün.",
      "**Tek veri seti, üç kullanım.** AB SKDM, Türkiye ETS izlemesi ve olası bir ulusal SKDM için aynı tesis verisini kullanın. [SKDM veri hazırlığı](/tr/cozumler/cbam-veri-hazirligi) ve [Türkiye ETS hazırlığı](/tr/cozumler/turkiye-ets-hazirligi) çalışmalarımız bu yapıyı kuruyor.",
      "**Doğrulayıcıyla erken anlaşın.** Plan da \"yeterli akredite doğrulayıcı sayısına erişilmesine yönelik çalışmalar\" öngörüyor; ilk SKDM beyanından önce, 2027'de doğrulayıcı takviminde sıkışma yaşanması olası.",
      "**Yenilenebilir elektrik belgelerinizi saklayın.** YEK-G ve lisanssız GES verileri, AB tarafından tanınırsa dolaylı emisyonunuzu düşürebilir; tanınmasa bile müşteri sorularını yanıtlarken işinize yarar.",
      "**İthal girdilerinizin gömülü emisyonunu tedarikçilerinize sorun.** Ulusal SKDM gelirse ilk soru bu olacak.",
      "**Pasaport verisini resmî müzakere takvimine göre değil, müşteri talebine göre planlayın.**"
     ]
    },
    {
     "t": "p",
     "text": "Sizin için hangi adımın öncelikli olduğunu netleştirmek için [çözümlerimize](/tr/cozumler) ve [Karar Laboratuvarı](/tr/karar-laboratuvari) araçlarına göz atabilirsiniz. AB Yeşil Mutabakatı'nın tüm takvimini [AB mevzuat takvimimizde](/tr/icgoruler/ab-mevzuat-takvimi) güncel tutuyoruz."
    },
    {
     "t": "h2",
     "text": "Sık sorulan sorular"
    },
    {
     "t": "faq",
     "items": [
      [
       "Yeşil Mutabakat Eylem Planı şirketlere yeni bir yükümlülük getiriyor mu?",
       "Doğrudan getirmiyor. Plan, kamu kurumlarına görev ve takvim veriyor. Şirketlerin yükümlülükleri Türkiye ETS Yönetmeliği gibi ayrı mevzuattan ve AB tüzüklerinden doğuyor."
      ],
      [
       "Ulusal SKDM ne zaman yürürlüğe girecek?",
       "Plan bir yürürlük tarihi vermiyor. Eylem 1.3.1, 2027'de etki analizi ve mevzuat çerçevesi; Eylem 1.3.2 ise 2027–2028'de SKDM kayıt sistemine benzer bir mekanizma öngörüyor."
      ],
      [
       "Türkiye ETS'de ödediğim bedel AB SKDM'den düşülecek mi?",
       "Plan bunu hedefliyor, ama bugün uygulanabilir bir mahsup yok. Mahsup AB SKDM Tüzüğü'nün 9. maddesine bağlı; hesaplama ve kanıt kurallarını belirleyen uygulama tüzüğü Komisyon tarafından 5 Kasım 2026'da kabul edildi (C(2026) 7665), ancak 11 Kasım 2026 itibarıyla AB Resmî Gazetesi'nde yayımlanmadı."
      ],
      [
       "YEK-G belgesi SKDM'de dolaylı emisyonu düşürür mü?",
       "Henüz değil. Eylem 1.2.4, YEK-G'nin kapsam 2 hesabında kullanılabilmesi için AB nezdinde girişim öngörüyor; sonuç AB'nin kabulüne bağlı."
      ],
      [
       "Planın tam metnine nereden ulaşabilirim?",
       "Plan, Ticaret Bakanlığı'nın Yeşil Mutabakat duyurular sayfasında Türkçe ve İngilizce PDF olarak yayımlandı."
      ]
     ]
    },
    {
     "t": "sources",
     "title": "Kaynaklar (erişim: 11 Kasım 2026)",
     "items": [
      "Yeşil Mutabakat Eylem Planı (2026–2030) ile İlgili 2026/12 Sayılı Cumhurbaşkanlığı Genelgesi, Resmî Gazete, 10 Kasım 2026, sayı 33426: [https://www.resmigazete.gov.tr/eskiler/2026/11/20261110-5.pdf](https://www.resmigazete.gov.tr/eskiler/2026/11/20261110-5.pdf)",
      "T.C. Ticaret Bakanlığı, \"Yeşil Mutabakat Eylem Planı (2026–2030) Yayımlandı\", 10 Kasım 2026: [https://ticaret.gov.tr/dis-iliskiler/yesil-mutabakat/duyurular/yesil-mutabakat-eylem-plani-2026-2030-yayimlandi](https://ticaret.gov.tr/dis-iliskiler/yesil-mutabakat/duyurular/yesil-mutabakat-eylem-plani-2026-2030-yayimlandi)",
      "T.C. Ticaret Bakanlığı, Yeşil Mutabakat Eylem Planı (2026–2030), tam metin (PDF, TR): [https://ticaret.gov.tr/data/6af2bb11269de173e872a5f6/Yeşil%20Mutabakat%20Eylem%20Planı%20(2026%20-%202030)_Son.pdf](https://ticaret.gov.tr/data/6af2bb11269de173e872a5f6/Yeşil%20Mutabakat%20Eylem%20Planı%20%282026%20-%202030%29_Son.pdf)",
      "T.C. Ticaret Bakanlığı, \"Ticaret Bakanı Ömer Bolat, Steel Networking Summits 2026'da Konuştu\", 26 Ekim 2026: [https://ticaret.gov.tr/haberler/ticaret-bakani-omer-bolat-steel-networking-summits-2026da-konustu](https://ticaret.gov.tr/haberler/ticaret-bakani-omer-bolat-steel-networking-summits-2026da-konustu)"
     ]
    }
   ]
  }
 },
 {
  "key": "guideTrEtsMarket",
  "solution": "solutionTrEts",
  "date": "2026-11-10",
  "checked": {
   "en": "10 November 2026",
   "tr": "10 Kasım 2026"
  },
  "image": "guideTrEtsMarket",
  "readingTime": {
   "en": "10 min",
   "tr": "10 dk"
  },
  "topic": {
   "en": "Türkiye ETS",
   "tr": "TR ETS"
  },
  "en": {
   "path": "insights/turkiye-ets-market-registry-cbam",
   "title": "Türkiye ETS Market Rules: Registry, 2026 and CBAM",
   "description": "Türkiye's ETS market regulation is in force: EPİAŞ, the İKS registry account, the 2026 top-up mechanism and what the CBAM Article 9 deduction may mean.",
   "h1": "Türkiye's ETS Market Rules: Registry Account, 2026 Top-Up and CBAM",
   "blocks": [
    {
     "t": "p",
     "text": "Türkiye's emissions trading system is no longer just a reporting timetable: its market rules are now published. The Energy Market Regulatory Authority's (EPDK) regulation on operating the Türkiye ETS market appeared in the Official Gazette on 21 October 2026 (No. 33407) and took effect the same day ([Official Gazette, 21.10.2026](https://www.resmigazete.gov.tr/eskiler/2026/10/20261021.htm); Art. 54). It sets out who runs the market, where allowances are held, how they trade, and one transitional mechanism for 2026 that matters to anyone exporting to the EU. Real trading has not started yet."
    },
    {
     "t": "p",
     "text": "For a plant in the pilot, the question has moved on from \"when is our monitoring plan due?\" to \"how do we register, and would buying allowances for 2026 reduce what our EU customers pay under CBAM?\" This piece answers both from the official texts and keeps the law separate from our interpretation."
    },
    {
     "t": "h2",
     "text": "The pilot in brief"
    },
    {
     "t": "p",
     "text": "According to the Climate Change Presidency's announcement of 1 October 2026, the pilot covers emissions for the 2026 and 2027 system years. Installations above the set emissions threshold in power generation, cement, iron and steel, aluminium and fertilisers are in. 2026 is reporting only; the first surrender obligation applies to 2027 emissions. The detail sits in the Procedures and Principles approved on 30 September 2026 (Approval No. 18626) ([Climate Change Presidency, 01.10.2026](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-iliskin-usul-ve-esaslar-yayimlandi-duyuru-1045))."
    },
    {
     "t": "p",
     "text": "The deadline for first monitoring methodology plans was extended to 27 January 2027 by Approval No. 18814 of 13 October 2026 ([Climate Change Presidency, 14.10.2026](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemi-izleme-metodolojisi-planlarinin-sunulma-suresinin-uzatilmasi-hakkinda-duyuru-1046)). We covered that side in our [Türkiye ETS pilot monitoring plan report](/en/insights/report/turkiye-ets-pilot-monitoring-plan-8fa4535e). Here we focus on the market."
    },
    {
     "t": "h2",
     "text": "Who runs the market and where allowances sit"
    },
    {
     "t": "p",
     "text": "The market operator is EPİAŞ, Türkiye's energy exchange operator. Trading runs through its ETS Market Management System (ETSPYS) (Arts. 3 and 4). Issuing, holding, transferring, cancelling and surrendering allowances happens in the Transaction Registry System (İKS), in accounts opened in the operator's name; free allocations are credited to those accounts plant by plant (Art. 6)."
    },
    {
     "t": "p",
     "text": "The market has two layers:"
    },
    {
     "t": "ul",
     "items": [
      "**Primary market:** allowances sold for the first time at auction. The lira price set at auction is the Allowance Reference Price (TRF).",
      "**Secondary market:** a spot allowance market and, if one is set up, a futures market."
     ]
    },
    {
     "t": "p",
     "text": "Bids are made in lots of 100 allowances (Arts. 3 and 12), each allowance being one tonne of CO2 equivalent, with prices in TRY per tCO2e in steps of 50 kuruş. Cash settlement and collateral go through a central clearing house established under Capital Markets Law No. 6362."
    },
    {
     "t": "p",
     "text": "Until the registry and the primary and spot markets go live, ETSPYS will run a virtual trial with no delivery, invoicing or payment obligations (Provisional Art. 1). That is a cheap way for compliance and treasury teams to learn the bid, collateral and settlement flow before real money is involved."
    },
    {
     "t": "h2",
     "text": "Opening a registry account"
    },
    {
     "t": "p",
     "text": "Covered operators must open an İKS account (Art. 7). It is held in the operator's name, and the operator transacts for each of its installations. Operator data flows into ETSPYS from the Climate Change Presidency's monitoring, reporting and verification (MRV) system, so errors in MRV records carry straight into market registration."
    },
    {
     "t": "p",
     "text": "Three steps are mandatory:"
    },
    {
     "t": "ol",
     "items": [
      "Sign a participant agreement with the central clearing house.",
      "Apply to EPİAŞ through ETSPYS.",
      "Sign the İKS participation agreement."
     ]
    },
    {
     "t": "p",
     "text": "The file includes a registration form, original or notarised proof of signing authority, a Trade Registry Gazette extract and the İKS agreement. EPİAŞ reviews the application within 10 business days of filing, then allows 10 business days to fix any gaps; if they are not fixed in time, registration does not go ahead (Art. 8)."
    },
    {
     "t": "p",
     "text": "In practice, if signing authorities, registry records and MRV plant data don't match, these two windows alone can cost about four weeks. It makes sense to build this file alongside the monitoring plan."
    },
    {
     "t": "h2",
     "text": "The extra reserve and its price floor"
    },
    {
     "t": "p",
     "text": "The regulation (Art. 19) provides for an \"extra reserve\" auction for plants that cannot cover their surrender obligation. It can be used only for compliance, only by decision of the Carbon Market Board, and only up to each plant's shortfall; allowances bought go straight to the plant's surrender account."
    },
    {
     "t": "p",
     "text": "That auction has a floor price: 50% above the higher of the three-month weighted average primary price and the three-month weighted average spot price, measured on the last business day of November (if there is no primary price in that window, the spot average is used). The cap is set by EPDK after consulting the Climate Change Presidency. Our reading: a plant that leaves its shortfall to the last minute pays well above the market, so forecasting 2027 allowance needs early is worth real money."
    },
    {
     "t": "h2",
     "text": "The 2026 top-up price mechanism"
    },
    {
     "t": "p",
     "text": "Provisional Article 2 opens a separate door for 2026 emissions. If participants request allowances equal to their verified 2026 emissions, plant by plant, a top-up allowance price **may** apply. In these auctions each participant pays its own bid and no TRF is calculated. The allowances go to the plant's surrender account but **are not counted toward meeting the obligation** (Provisional Art. 2(3))."
    },
    {
     "t": "p",
     "text": "The text says the mechanism \"may\" apply, not that it will; application, issuance and auction dates are to be set by the Climate Change Presidency (Provisional Art. 2(2)). As of 7 November 2026 the Presidency's announcements list shows none. The Carbon Market Board decision announced on 3 September 2026 says that in 2026 a method for applying the top-up price will be developed and the price mechanism will start from the 2027 system year ([Climate Change Presidency, KPK/2026/1](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-yonelik-karbon-piyasasi-kurulu-toplanti-kararlarina-kpk-2026-1-iliskin-duyuru-duyuru-45)). Whether, and when, an auction for 2026 emissions will be held is therefore unclear. A separate, permanent top-up mechanism for allowances that must be surrendered sits in Art. 20."
    },
    {
     "t": "p",
     "text": "So a 2026 purchase satisfies no obligation under Turkish law. Why would a company make one?"
    },
    {
     "t": "p",
     "text": "**Ganrich interpretation:** in our view the most plausible reason is CBAM. Neither the regulation nor the authorities say so; it is our reading of how the text is built."
    },
    {
     "t": "h2",
     "text": "Would that payment reduce CBAM costs?"
    },
    {
     "t": "p",
     "text": "**The law (current consolidated text):** under Article 9(1) of the CBAM Regulation (EU) 2023/956, as amended by (EU) 2025/2083 (EUR-Lex consolidated text of 20.10.2025), where embedded emissions are determined on the basis of **actual emissions**, an authorised CBAM declarant may claim a reduction in certificates for the carbon price effectively paid in a third country, taking into account any rebate or compensation there. Article 9(2) requires the documentation to be certified by a person independent of the declarant and of the third country's authorities, plus evidence of actual payment. Under Article 9(4), goods declared on default values can only claim a reduction by reference to yearly default carbon prices. Article 3(29) defines the carbon price to include amounts paid in the form of emission allowances under an emissions trading system ([EUR-Lex, consolidated text 20.10.2025](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02023R0956-20251020))."
    },
    {
     "t": "p",
     "text": "**The implementing act: adopted, Official Journal text not yet confirmed.** The draft act on calculating the deduction was opened for feedback on 13 May 2026 as Ares(2026)4841230 ([EUR-Lex draft](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=PI_COM%3AAres%282026%294841230); [Commission, 13.05.2026](https://taxation-customs.ec.europa.eu/news/carbon-price-paid-third-countries-2026-05-13_en)). A Commission Secretariat-General day note records that the College adopted the act by written procedure on 5 November 2026 as C(2026) 7665 (procedure PE/2026/7507). The title is still \"Commission Implementing Regulation (EU) …/...\", and the note marks it as an act deemed signed for publication ([SEC(2026) 275/3, 05.11.2026](https://ec.europa.eu/transparency/documents-register/api/files/SEC%282026%29275?ersIds=090166e5365a76ee)). EUR-Lex holds a matching record, \"C/2026/7665 final\", form \"implementing regulation\", document date 05.11.2026 ([EUR-Lex record](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=PI_COM:C%282026%297665)). As of 10 November 2026, however, the full text still cannot be viewed on EUR-Lex, no Official Journal or CELEX number has been found, and the Commission's [CBAM legislation page](https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-legislation-and-guidance_en) still does not list the act (the latest implementing act there remains (EU) 2026/1740). Until the authentic Official Journal text is readable, details on calculation, evidence and start of application should be read as proposals in the May 2026 draft, not as settled rules."
    },
    {
     "t": "p",
     "text": "**Ganrich interpretation: open questions.**"
    },
    {
     "t": "ol",
     "items": [
      "**Voluntary purchases.** We found no EU text that squarely addresses whether a purchase that doesn't count toward domestic compliance is a carbon price \"effectively paid\".",
      "**The price itself.** A price set by each participant's own bid may draw extra scrutiny on the EU side.",
      "**Compensation.** The Carbon Market Board set free allocation at 100% for the pilot ([Climate Change Presidency, KPK/2026/1, 03.09.2026](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-yonelik-karbon-piyasasi-kurulu-toplanti-kararlarina-kpk-2026-1-iliskin-duyuru-duyuru-45)). How that is netted off can't be settled until the final implementing text is readable."
     ]
    },
    {
     "t": "p",
     "text": "So it is too early to plan 2026 allowance purchases as a CBAM saving. The sound move is to prepare the data that would let you decide: product-level actual emissions, verification, proof of payment and independent certification. For 2026 certificate prices and the wider picture, see our [CBAM 2026 update](/en/insights/cbam-2026-update-tr-ets-cop31)."
    },
    {
     "t": "h2",
     "text": "What covered plants should do now"
    },
    {
     "t": "ul",
     "items": [
      "**Start the İKS file.** Make sure signing authority, registry records and MRV plant data agree.",
      "**Join the virtual trial.** Learn bids, collateral and settlement in ETSPYS without financial risk.",
      "**Forecast your 2027 shortfall.** The extra-reserve floor makes late buying expensive.",
      "**Tie any 2026 purchase to CBAM data.** Don't buy until your EU customers' import volumes, your actual emissions data and its verification, and the final implementing act are clear.",
      "**Put the decision in one place.** Compliance, finance and export teams should work from the same numbers."
     ]
    },
    {
     "t": "p",
     "text": "Our [Türkiye ETS readiness](/en/solutions/turkiye-ets-readiness) work turns these steps into a plant-level roadmap. [CBAM data readiness](/en/solutions/cbam-data-readiness) covers the EU evidence side and [measured energy retrofit](/en/solutions/measured-energy-retrofit) the abatement side. Take the [CBAM readiness check](/en/decision-lab/cbam-readiness-check) to see where you stand, and follow EU dates in our [EU regulation calendar](/en/insights/eu-regulation-calendar)."
    },
    {
     "t": "h2",
     "text": "Frequently asked questions"
    },
    {
     "t": "faq",
     "items": [
      [
       "When does the Türkiye ETS market start trading?",
       "The regulation took effect on 21 October 2026. Until the primary and spot markets go live, ETSPYS runs a virtual trial with no payments. Real trading dates will be announced by the authorities."
      ],
      [
       "Is a registry (İKS) account mandatory?",
       "Yes. Covered operators must open one. It is held in the operator's name, and the operator transacts for each installation."
      ],
      [
       "Do plants surrender allowances for 2026?",
       "No. 2026 is reporting only and surrender starts with 2027 emissions. Allowances bought under the 2026 top-up mechanism don't count toward compliance either."
      ],
      [
       "Will 2026 allowance purchases reduce CBAM certificates?",
       "Not yet. Article 9 allows a deduction for a carbon price effectively paid where emissions are declared on actual values. The Commission adopted an implementing regulation on this as C(2026) 7665 on 5 November 2026 ([SEC(2026) 275/3, 05.11.2026](https://ec.europa.eu/transparency/documents-register/api/files/SEC%282026%29275?ersIds=090166e5365a76ee)), but as of 10 November 2026 the Official Journal text has not been confirmed and it is unclear whether voluntary purchases qualify."
      ],
      [
       "What is the monitoring plan deadline?",
       "27 January 2027 (Approval No. 18814 of 13 October 2026)."
      ]
     ]
    },
    {
     "t": "p",
     "text": "*This article is general information, not legal advice. Regulatory status checked on 10 November 2026.*"
    },
    {
     "t": "sources",
     "title": "Sources",
     "items": [
      "Official Gazette of Türkiye, 21.10.2026, No. 33407, Regulation on Operating the Türkiye ETS Market: [index](https://www.resmigazete.gov.tr/eskiler/2026/10/20261021.htm), [PDF](https://www.resmigazete.gov.tr/eskiler/2026/10/20261021-4.pdf). Accessed 7 November 2026.",
      "Official Gazette of Türkiye, 27.08.2026, No. 33353, Türkiye ETS Regulation: [text](https://www.resmigazete.gov.tr/eskiler/2026/08/20260827-7.htm). Accessed 7 November 2026.",
      "Climate Change Presidency, pilot Procedures and Principles published, 01.10.2026: [announcement](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-iliskin-usul-ve-esaslar-yayimlandi-duyuru-1045). Accessed 7 November 2026.",
      "Climate Change Presidency, monitoring plan deadline extension, 14.10.2026: [announcement](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemi-izleme-metodolojisi-planlarinin-sunulma-suresinin-uzatilmasi-hakkinda-duyuru-1046). Accessed 7 November 2026.",
      "Regulation (EU) 2023/956 (CBAM), consolidated text of 20.10.2025 incl. (EU) 2025/2083, Articles 3(29) and 9: [EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02023R0956-20251020). Accessed 7 November 2026.",
      "European Commission, draft implementing act on carbon price deduction, Ares(2026)4841230, 13.05.2026: [EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=PI_COM%3AAres%282026%294841230). Accessed 7 November 2026.",
      "European Commission, SEC(2026) 275/3, day note of decisions adopted by written procedure on 5 November 2026, entry PE/2026/7507 – C(2026) 7665: [PDF](https://ec.europa.eu/transparency/documents-register/api/files/SEC%282026%29275?ersIds=090166e5365a76ee). Accessed 10 November 2026.",
      "EUR-Lex record, C/2026/7665 final, document date 05.11.2026 (full Official Journal text not confirmed): [record](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=PI_COM:C%282026%297665). Accessed 10 November 2026.",
      "Climate Change Presidency, KPK/2026/1 decisions, 03.09.2026: [announcement](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-yonelik-karbon-piyasasi-kurulu-toplanti-kararlarina-kpk-2026-1-iliskin-duyuru-duyuru-45). Accessed 7 November 2026.",
      "European Commission, CBAM legislation and guidance: [page](https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-legislation-and-guidance_en). Accessed 10 November 2026."
     ]
    }
   ]
  },
  "tr": {
   "path": "icgoruler/tr-ets-piyasasi-iks-hesabi-skdm",
   "title": "TR ETS Piyasası: İKS Hesabı, 2026 ve SKDM İndirimi",
   "description": "TR ETS piyasa yönetmeliği yürürlükte: EPİAŞ, İKS hesabı, 2026 tamamlayıcı tahsisat mekanizması ve SKDM Madde 9 indirimine olası etkisi; tesisler için rehber.",
   "h1": "TR ETS Piyasa Yönetmeliği: İKS Hesabı, 2026 Tamamlayıcı Tahsisat ve SKDM İndirimi",
   "blocks": [
    {
     "t": "p",
     "text": "Türkiye'nin emisyon ticaret sistemi artık yalnızca bir izleme takviminden ibaret değil; piyasa kuralları da yayımlandı. Enerji Piyasası Düzenleme Kurumu'nun (EPDK) hazırladığı \"Türkiye Emisyon Ticaret Sistemi Piyasasının İşletilmesine İlişkin Yönetmelik\", 21 Ekim 2026 tarihli ve 33407 sayılı Resmî Gazete'de yayımlanarak aynı gün yürürlüğe girdi ([Resmî Gazete, 21.10.2026](https://www.resmigazete.gov.tr/eskiler/2026/10/20261021.htm); Madde 54). Yönetmelik, tahsisatların nerede tutulacağını, piyasayı kimin işleteceğini, nasıl alınıp satılacağını ve 2026 için dikkat çekici bir geçiş mekanizmasını düzenliyor. Gerçek işlemler ise henüz başlamadı."
    },
    {
     "t": "p",
     "text": "Pilot kapsamındaki bir tesis için soru artık \"İzleme planını ne zaman sunacağız?\" sorusunu aşıyor: \"Piyasaya nasıl kaydolacağız ve 2026'da tahsisat almak AB'deki SKDM yükümlülüğümüzü azaltır mı?\" Bu yazıda iki soruyu resmî metinlere dayanarak yanıtlıyor, mevzuatı ve bizim yorumumuzu ayrı tutuyoruz."
    },
    {
     "t": "h2",
     "text": "TR ETS pilot dönemi: kısa hatırlatma"
    },
    {
     "t": "p",
     "text": "İklim Değişikliği Başkanlığı'nın 1 Ekim 2026 tarihli duyurusuna göre pilot uygulama dönemi 2026 ve 2027 sistem yıllarının emisyonlarını kapsıyor. Elektrik üretimi, çimento, demir-çelik, alüminyum ve gübre sektörlerinde belirlenen emisyon eşiğinin üzerindeki tesisler pilota dahil. 2026'da yalnızca raporlama yükümlülüğü var; tahsisat teslim yükümlülüğü ilk kez 2027 emisyonları için başlıyor. Ayrıntılar 30 Eylül 2026 tarihli ve 18626 sayılı Olur ile yayımlanan Usul ve Esaslar'da ([İklim Değişikliği Başkanlığı, 01.10.2026](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-iliskin-usul-ve-esaslar-yayimlandi-duyuru-1045))."
    },
    {
     "t": "p",
     "text": "İlk İzleme Metodolojisi Planlarının sunulma süresi, 13 Ekim 2026 tarihli ve 18814 sayılı Olur ile 27 Ocak 2027'ye uzatıldı ([İklim Değişikliği Başkanlığı, 14.10.2026](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemi-izleme-metodolojisi-planlarinin-sunulma-suresinin-uzatilmasi-hakkinda-duyuru-1046)). İzleme planı boyutunu [TR ETS pilotu izleme planı raporumuzda](/tr/icgoruler/rapor/turkiye-ets-pilotu-izleme-plani-98334c09) ele aldık; burada piyasa boyutuna odaklanıyoruz."
    },
    {
     "t": "h2",
     "text": "Piyasayı kim işletiyor, tahsisatlar nerede tutuluyor?"
    },
    {
     "t": "p",
     "text": "Yönetmeliğe göre piyasa işletmecisi Enerji Piyasaları İşletme A.Ş. (EPİAŞ). İşlemler EPİAŞ'ın işlettiği ETS Piyasası Yönetim Sistemi (ETSPYS) üzerinden yürüyor (Madde 3 ve 4). Tahsisatların ihracı, elde tutulması, transferi, iptali ve itfası İşlem Kayıt Sistemi'nde (İKS) işletme adına açılan hesaplarda kayden izleniyor; ücretsiz tahsisatlar işletme hesaplarına tesis bazında aktarılıyor (Madde 6)."
    },
    {
     "t": "p",
     "text": "Piyasa iki katmanlı:"
    },
    {
     "t": "ul",
     "items": [
      "**Birincil piyasa:** tahsisatların ihale ile ilk kez satıldığı yer. İhalede oluşan Türk lirası fiyatı Tahsisat Referans Fiyatı (TRF) olarak adlandırılıyor.",
      "**İkincil piyasa:** spot tahsisat piyasası ve, kurulması halinde, vadeli tahsisat piyasası."
     ]
    },
    {
     "t": "p",
     "text": "Teklifler lot üzerinden veriliyor (Madde 3 ve 12): 1 lot 100 tahsisat, 1 tahsisat 1 ton CO2 eşdeğeri. Fiyatlar TL/tCO2e cinsinden, 50 kuruş ve katları şeklinde giriliyor. Nakit takas ve teminat işlemleri, 6362 sayılı Sermaye Piyasası Kanunu'na göre kurulmuş merkezi uzlaştırma kuruluşu üzerinden yürüyor."
    },
    {
     "t": "p",
     "text": "İKS ile birincil ve spot piyasalar faaliyete geçene kadar ETSPYS'de teslimat, faturalama ve ödeme yükümlülüğü doğurmayan bir \"sanal uygulama\" yapılacak (Geçici Madde 1). Bu, ekiplerin sistemi gerçek para riskine girmeden öğrenmesi için iyi bir fırsat."
    },
    {
     "t": "h2",
     "text": "İKS hesabı nasıl açılır?"
    },
    {
     "t": "p",
     "text": "ETS kapsamındaki işletmeler İKS'de hesap açtırmak zorunda (Madde 7). Hesap işletme adına açılıyor ve işletme bağlı tesisleri adına işlem yapıyor. İşletme bilgileri İklim Değişikliği Başkanlığı'nın izleme, raporlama ve doğrulama (MRV) sisteminden ETSPYS'ye aktarılıyor; dolayısıyla MRV kayıtlarındaki hatalar piyasa kaydına da yansır."
    },
    {
     "t": "p",
     "text": "Hesap için üç adım zorunlu:"
    },
    {
     "t": "ol",
     "items": [
      "Merkezi uzlaştırma kuruluşu ile katılımcı anlaşması imzalamak,",
      "ETSPYS üzerinden EPİAŞ'a başvurmak,",
      "İKS katılım anlaşmasını imzalamak."
     ]
    },
    {
     "t": "p",
     "text": "Başvuru dosyasında işletme kayıt formu, imza yetkililerinin yetki belgesinin aslı ya da noter onaylı sureti, Türkiye Ticaret Sicili Gazetesi örneği ve İKS katılım anlaşması yer alıyor. EPİAŞ başvuruyu, başvuru tarihini izleyen 10 iş günü içinde inceliyor; eksiklik varsa giderilmesi için 10 iş günü süre veriliyor. Eksikler süresinde tamamlanmazsa kayıt yapılmıyor (Madde 8)."
    },
    {
     "t": "p",
     "text": "Pratik sonuç: imza yetkisi, sicil kayıtları ve MRV sistemindeki tesis bilgileri tutarlı değilse yalnızca bu iki süre yaklaşık dört haftalık bir gecikme yaratabilir. Dosyayı izleme planıyla eş zamanlı hazırlamak yerinde olur."
    },
    {
     "t": "h2",
     "text": "Ek rezerv ve fiyat sınırları"
    },
    {
     "t": "p",
     "text": "Yönetmelik (Madde 19), teslim yükümlülüğünü karşılayamayan tesisler için bir \"ek rezerv\" ihalesi öngörüyor. Ek rezerv yalnızca teslim yükümlülüğü için, Karbon Piyasası Kurulu kararıyla ve her tesisin tahsisat açığıyla sınırlı kullanılabiliyor; alınan tahsisatlar doğrudan tesisin itfa hesabına gidiyor."
    },
    {
     "t": "p",
     "text": "Bu ihalede bir taban fiyat var: Kasım ayının son iş günü itibarıyla son 3 ayın birincil piyasa ağırlıklı ortalaması ile spot piyasa ağırlıklı ortalamasından yüksek olanının yüzde 50 fazlası (son 3 ayda birincil piyasa fiyatı yoksa spot ortalaması esas alınıyor). Azami fiyatı EPDK, İklim Değişikliği Başkanlığı'nın görüşünü alarak belirliyor. Bizim okumamıza göre mesaj açık: açığını son dakikada kapatmaya çalışan tesis piyasa fiyatının belirgin biçimde üzerinde öder. Tahsisat ihtiyacını erken öngörmek doğrudan paraya dönüşüyor."
    },
    {
     "t": "h2",
     "text": "2026 tamamlayıcı tahsisat fiyatı mekanizması"
    },
    {
     "t": "p",
     "text": "Geçici Madde 2, 2026 emisyonları için ayrı bir kapı açıyor. Piyasa katılımcıları tesis bazında doğrulanmış 2026 emisyonlarına eşdeğer miktarda tahsisat talep ederse tamamlayıcı tahsisat fiyatı **uygulanabilir**. Bu ihalelerde eşleşme fiyatı her katılımcının kendi alış teklifi; TRF hesaplanmıyor. Alınan tahsisatlar tesisin itfa hesabına aktarılıyor ama **yükümlülüğün yerine getirilmesinde dikkate alınmıyor** (Geçici Madde 2(3))."
    },
    {
     "t": "p",
     "text": "Metin mekanizmanın uygulanacağını değil, \"uygulanabilir\" olduğunu söylüyor; başvuru, ihraç ve ihale tarihlerini İklim Değişikliği Başkanlığı belirleyecek (Geçici Madde 2(2)). İDB'nin duyuru listesinde 7 Kasım 2026 itibarıyla bu tarihlere ilişkin bir duyuru yok. Karbon Piyasası Kurulu'nun 3 Eylül 2026'da duyurulan kararına göre ise 2026'da tamamlayıcı tahsisat fiyatının uygulanmasına yönelik yöntem geliştirilecek, fiyat mekanizması 2027 sistem yılı itibarıyla başlatılacak ([İDB, KPK/2026/1](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-yonelik-karbon-piyasasi-kurulu-toplanti-kararlarina-kpk-2026-1-iliskin-duyuru-duyuru-45)). Dolayısıyla 2026 emisyonları için bir ihalenin yapılıp yapılmayacağı ve ne zaman yapılacağı belirsiz. Teslim edilmesi gereken tahsisatlar için kalıcı bir tamamlayıcı mekanizma ise ayrıca Madde 20'de düzenleniyor."
    },
    {
     "t": "p",
     "text": "Kısacası 2026 alımı Türk mevzuatı açısından hiçbir yükümlülüğü karşılamıyor. Peki bir şirket bunu neden yapsın?"
    },
    {
     "t": "p",
     "text": "**Ganrich yorumu:** bize göre en makul gerekçe SKDM. Bunu ne yönetmelik ne de ilgili kurumlar açıkça söylüyor; bu, metnin kurgusundan çıkardığımız bir okuma."
    },
    {
     "t": "h2",
     "text": "Bu ödeme SKDM'de indirim sağlar mı?"
    },
    {
     "t": "p",
     "text": "**Mevzuat (güncel konsolide metin):** SKDM Tüzüğü ((AB) 2023/956, (AB) 2025/2083 ile değişik; EUR-Lex konsolide metni 20.10.2025) Madde 9(1)'e göre, gömülü emisyonlar **gerçek emisyonlara** göre belirlenmişse yetkili SKDM beyancısı üçüncü ülkede fiilen ödenmiş karbon fiyatı için sertifika sayısında indirim talep edebilir; o ülkedeki her türlü iade veya telafi hesaba katılır. Madde 9(2), belgelerin beyancıdan ve üçüncü ülke makamlarından bağımsız bir kişi tarafından onaylanmasını ve fiilî ödeme kanıtını istiyor. Madde 9(4)'e göre varsayılan değerlerle beyan edilen ürünlerde indirim yalnızca yıllık varsayılan karbon fiyatları üzerinden talep edilebilir. Madde 3(29) karbon fiyatını, bir emisyon ticaret sistemi kapsamında tahsisat biçiminde ödenen tutarı da kapsayacak şekilde tanımlıyor ([EUR-Lex, konsolide metin 20.10.2025](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02023R0956-20251020))."
    },
    {
     "t": "p",
     "text": "**Uygulama tüzüğü: kabul edildi, Resmî Gazete metni henüz teyit edilemedi.** İndirimin hesaplanmasına ilişkin uygulama tüzüğü taslağı 13 Mayıs 2026'da Ares(2026)4841230 numarasıyla görüşe açıldı ([EUR-Lex taslak](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=PI_COM%3AAres%282026%294841230); [Komisyon, 13.05.2026](https://taxation-customs.ec.europa.eu/news/carbon-price-paid-third-countries-2026-05-13_en)). Komisyon Genel Sekreterliği'nin günlük notuna göre Koleji, 5 Kasım 2026'da yazılı usulle bu tüzüğü C(2026) 7665 olarak kabul etti (usul PE/2026/7507). Başlık hâlâ \"Komisyon Uygulama Tüzüğü (AB) …/...\" biçiminde; not, tüzüğü yayımlanmak üzere imzalanmış sayılan işlemler arasında gösteriyor ([SEC(2026) 275/3, 05.11.2026](https://ec.europa.eu/transparency/documents-register/api/files/SEC%282026%29275?ersIds=090166e5365a76ee)). EUR-Lex'te buna uyan, \"C/2026/7665 final\" başlıklı, biçimi \"uygulama tüzüğü\", belge tarihi 05.11.2026 olan bir kayıt bulunuyor ([EUR-Lex kaydı](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=PI_COM:C%282026%297665)). Ancak 10 Kasım 2026 itibarıyla tam metin EUR-Lex'te hâlâ görüntülenemiyor; AB Resmî Gazetesi veya CELEX numarası bulunamadı ve Komisyon'un [SKDM mevzuat sayfası](https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-legislation-and-guidance_en) tüzüğü hâlâ listelemiyor (listedeki en yeni uygulama tüzüğü (AB) 2026/1740). Nihai Resmî Gazete metni okunana kadar hesaplama, kanıt ve uygulama başlangıcına ilişkin ayrıntıları kesin kural olarak değil, Mayıs 2026 taslağının önerileri olarak okumak gerekiyor."
    },
    {
     "t": "p",
     "text": "**Ganrich yorumu: açık kalan sorular.**"
    },
    {
     "t": "ol",
     "items": [
      "**Gönüllü alımın niteliği.** Yükümlülüğe sayılmayan bir alımın \"fiilen ödenmiş karbon fiyatı\" kabul edilip edilmeyeceğini açıkça ele alan bir AB metni bulamadık.",
      "**Fiyatın kendisi.** Fiyatın katılımcının kendi teklifiyle oluşması AB tarafında ayrıca sorgulanabilir.",
      "**Telafi etkisi.** Karbon Piyasası Kurulu pilot dönemde ücretsiz tahsisat oranını yüzde 100 olarak belirledi ([İDB, KPK/2026/1 duyurusu, 03.09.2026](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-yonelik-karbon-piyasasi-kurulu-toplanti-kararlarina-kpk-2026-1-iliskin-duyuru-duyuru-45)). Ücretsiz tahsisatın indirim hesabında nasıl düşüleceği nihai uygulama metni okunmadan netleşmez."
     ]
    },
    {
     "t": "p",
     "text": "Bu nedenle 2026 tahsisat alımını bugünden bir SKDM indirimi olarak planlamak erken. Doğru hamle, kararı verdirecek veriyi şimdiden hazırlamak: ürün bazında gerçek emisyon, doğrulama, ödeme kanıtı ve bağımsız onay. 2026 SKDM sertifika fiyatları ve genel tablo için [SKDM 2026 güncellememize](/tr/icgoruler/skdm-2026-guncel-sertifika-fiyati-tr-ets) bakabilirsiniz."
    },
    {
     "t": "h2",
     "text": "Tesisler şimdi ne yapmalı?"
    },
    {
     "t": "ul",
     "items": [
      "**İKS dosyasını başlatın.** Yetki belgeleri, sicil kayıtları ve MRV sistemindeki tesis bilgileri tutarlı olsun.",
      "**Sanal uygulamaya katılın.** ETSPYS'deki deneme döneminde teklif, teminat ve uzlaştırma akışını gerçek para riskine girmeden öğrenin.",
      "**2027 tahsisat açığınızı tahmin edin.** Ek rezerv taban fiyatı geç kalanı pahalıya getirecek biçimde kurgulanmış.",
      "**2026 kararını SKDM verisine bağlayın.** AB müşterilerinizin ithalat hacmi, gerçek emisyon verisi ve doğrulama durumu ile uygulama tüzüğünün nihai metni netleşmeden 2026 tamamlayıcı mekanizmasından alım yapmayın.",
      "**Kararı tek yerde toplayın.** Uyum, finans ve ihracat ekipleri aynı rakamlar üzerinden çalışmalı."
     ]
    },
    {
     "t": "p",
     "text": "[Türkiye ETS hazırlık hizmetimiz](/tr/cozumler/turkiye-ets-hazirligi) bu adımları tesis bazında bir yol haritasına çeviriyor. SKDM veri boyutunda [SKDM veri hazırlığı](/tr/cozumler/cbam-veri-hazirligi), emisyon azaltımı boyutunda ise [ölçüme dayalı enerji iyileştirmesi](/tr/cozumler/olcume-dayali-enerji-iyilestirmesi) devreye giriyor. Nerede durduğunuzu görmek için [SKDM hazırlık testini](/tr/karar-laboratuvari/cbam-hazirlik-testi) yapabilir, AB tarihlerini [AB mevzuat takviminde](/tr/icgoruler/ab-mevzuat-takvimi) izleyebilirsiniz."
    },
    {
     "t": "h2",
     "text": "Sıkça sorulan sorular"
    },
    {
     "t": "faq",
     "items": [
      [
       "TR ETS piyasası ne zaman işlemeye başlıyor?",
       "Yönetmelik 21 Ekim 2026'da yürürlüğe girdi. Birincil ve spot piyasa faaliyete geçene kadar ETSPYS'de ödeme doğurmayan bir sanal uygulama yapılacak. Gerçek işlem tarihleri ilgili kurumlarca duyurulacak."
      ],
      [
       "İKS hesabı açmak zorunlu mu?",
       "Evet. ETS kapsamındaki işletmeler İKS'de hesap açtırmak zorunda. Hesap işletme adına açılıyor ve işletme bağlı tesisleri adına işlem yapıyor."
      ],
      [
       "2026'da tahsisat teslim etmem gerekiyor mu?",
       "Hayır. 2026'da yalnızca raporlama yükümlülüğü var; teslim yükümlülüğü 2027 emisyonları için başlıyor. 2026 tamamlayıcı mekanizmasıyla alınan tahsisatlar da yükümlülüğe sayılmıyor."
      ],
      [
       "2026'da aldığım tahsisatlar SKDM'de indirim sağlar mı?",
       "Henüz değil. Madde 9, gerçek emisyonlara dayalı beyanlarda fiilen ödenen karbon fiyatı için indirime izin veriyor. Komisyon, 5 Kasım 2026'da bu konuda C(2026) 7665 sayılı uygulama tüzüğünü kabul etti ([SEC(2026) 275/3, 05.11.2026](https://ec.europa.eu/transparency/documents-register/api/files/SEC%282026%29275?ersIds=090166e5365a76ee)); ancak 10 Kasım 2026 itibarıyla AB Resmî Gazetesi metni teyit edilemedi. Gönüllü alımların kabul edilip edilmeyeceği de netleşmedi."
      ],
      [
       "İzleme planı için son tarih ne?",
       "27 Ocak 2027 (13 Ekim 2026 tarihli ve 18814 sayılı Olur)."
      ]
     ]
    },
    {
     "t": "p",
     "text": "*Bu yazı genel bilgilendirme amaçlıdır, hukuki görüş değildir. Mevzuat durumu 10 Kasım 2026 itibarıyla kontrol edilmiştir.*"
    },
    {
     "t": "sources",
     "title": "Kaynaklar",
     "items": [
      "Resmî Gazete, 21.10.2026, Sayı 33407, Türkiye Emisyon Ticaret Sistemi Piyasasının İşletilmesine İlişkin Yönetmelik: [fihrist](https://www.resmigazete.gov.tr/eskiler/2026/10/20261021.htm), [PDF](https://www.resmigazete.gov.tr/eskiler/2026/10/20261021-4.pdf). Erişim: 7 Kasım 2026.",
      "Resmî Gazete, 27.08.2026, Sayı 33353, Türkiye Emisyon Ticaret Sistemi Yönetmeliği: [metin](https://www.resmigazete.gov.tr/eskiler/2026/08/20260827-7.htm). Erişim: 7 Kasım 2026.",
      "İklim Değişikliği Başkanlığı, \"TR ETS Pilot Uygulama Dönemine İlişkin Usul ve Esaslar Yayımlandı\", 01.10.2026: [duyuru](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-iliskin-usul-ve-esaslar-yayimlandi-duyuru-1045). Erişim: 7 Kasım 2026.",
      "İklim Değişikliği Başkanlığı, izleme metodolojisi planı süre uzatımı, 14.10.2026: [duyuru](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemi-izleme-metodolojisi-planlarinin-sunulma-suresinin-uzatilmasi-hakkinda-duyuru-1046). Erişim: 7 Kasım 2026.",
      "(AB) 2023/956 sayılı SKDM Tüzüğü, konsolide metin 20.10.2025 ((AB) 2025/2083 dahil), Madde 3(29) ve 9: [EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02023R0956-20251020). Erişim: 7 Kasım 2026.",
      "Avrupa Komisyonu, karbon fiyatı indirimine ilişkin uygulama tüzüğü taslağı, Ares(2026)4841230, 13.05.2026: [EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=PI_COM%3AAres%282026%294841230). Erişim: 7 Kasım 2026.",
      "Avrupa Komisyonu, SEC(2026) 275/3, 5 Kasım 2026 tarihinde yazılı usulle kabul edilen kararlara ilişkin günlük not, madde PE/2026/7507 – C(2026) 7665: [PDF](https://ec.europa.eu/transparency/documents-register/api/files/SEC%282026%29275?ersIds=090166e5365a76ee). Erişim: 10 Kasım 2026.",
      "EUR-Lex kaydı, C/2026/7665 final, belge tarihi 05.11.2026 (Resmî Gazete tam metni teyit edilemedi): [kayıt](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=PI_COM:C%282026%297665). Erişim: 10 Kasım 2026.",
      "İklim Değişikliği Başkanlığı, KPK/2026/1 kararlarına ilişkin duyuru, 03.09.2026: [duyuru](https://www.iklim.gov.tr/tr-ets-pilot-uygulama-donemine-yonelik-karbon-piyasasi-kurulu-toplanti-kararlarina-kpk-2026-1-iliskin-duyuru-duyuru-45). Erişim: 7 Kasım 2026.",
      "Avrupa Komisyonu, SKDM mevzuat ve kılavuz sayfası: [sayfa](https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-legislation-and-guidance_en). Erişim: 10 Kasım 2026."
     ]
    }
   ]
  }
 },
 {
  "key": "guideCbamDefaults",
  "solution": "solutionCbam",
  "date": "2026-11-09",
  "checked": {
   "en": "9 November 2026",
   "tr": "9 Kasım 2026"
  },
  "image": "guideCbamDefaults",
  "readingTime": {
   "en": "6 min",
   "tr": "6 dk"
  },
  "topic": {
   "en": "CBAM",
   "tr": "SKDM (CBAM)"
  },
  "en": {
   "path": "insights/cbam-default-values-2026-turkish-steel-aluminium",
   "title": "CBAM Default Values 2026: Actual or Default for Steel",
   "description": "CBAM default values for 2026, the 10–30% mark-up and Türkiye values for rebar, hot-rolled steel and aluminium, with a worked example and verification rules.",
   "h1": "CBAM default values 2026: what the mark-up means for Turkish steel and aluminium exporters",
   "blocks": [
    {
     "t": "p",
     "text": "Every tonne of steel or aluminium a Turkish plant ships to the EU now carries a number: its embedded emissions. The EU importer declares either the plant's verified actual figure or the Commission's default value plus a mark-up. This note sets out where the 2026 default values come from, what they are for three common Turkish products, and what using actual data requires."
    },
    {
     "t": "h2",
     "text": "Where the 2026 default values come from"
    },
    {
     "t": "p",
     "text": "The default values are set in Annex I to Commission Implementing Regulation (EU) 2025/2621. The Commission corrected Annexes I and IV with Implementing Regulation (EU) 2026/1740, adopted on 20 July 2026, and says a consolidated text of 2025/2621 \"will be available soon\". It also publishes the values in an Excel file (version 2, dated 6 August 2026), which is for information only: the legally binding values are those in the regulation."
    },
    {
     "t": "p",
     "text": "The values are set by country and by product (CN code). Where a product is not listed for a country, or the field shows \"-\", the declarant must use the table \"Other countries and territories\", which is the average of the ten exporting countries with the highest emission intensities for that good (Commission CBAM Q&A, 4.25–4.26)."
    },
    {
     "t": "h2",
     "text": "The mark-up: 10% in 2026, 30% from 2028"
    },
    {
     "t": "p",
     "text": "Default values must be increased by a mark-up that rises each year. It applies to default values, not to verified actual data."
    },
    {
     "t": "table",
     "head": [
      "Sector",
      "2026",
      "2027",
      "2028 onwards"
     ],
     "rows": [
      [
       "Iron and steel, aluminium, cement, hydrogen",
       "10%",
       "20%",
       "30%"
      ],
      [
       "Fertilisers",
       "1%",
       "1%",
       "1%"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Source: Commission CBAM Q&A (last updated 15 October 2026), 4.25. The Commission adds that the defaults including the mark-up are set so that embedded emissions are not underestimated, so it should \"in most cases\" be more advantageous to use actual values where they are available."
    },
    {
     "t": "h2",
     "text": "Türkiye default values for three common products"
    },
    {
     "t": "table",
     "head": [
      "CN code",
      "Product",
      "Default value, total (tCO2e per tonne)"
     ],
     "rows": [
      [
       "7214 20 00",
       "Rebar: bars and rods with indentations, ribs or other deformations",
       "2.310"
      ],
      [
       "7208",
       "Hot-rolled flat products of iron or non-alloy steel, width ≥ 600 mm",
       "2.428"
      ],
      [
       "7601",
       "Unwrought aluminium",
       "1.700"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Source: Commission Excel \"Default values definitive period\", Türkiye sheet, version 2 (6 August 2026), based on Regulation (EU) 2026/1740. For these three goods the Türkiye table lists direct emissions only; indirect emissions show \"N/A\". Check your own CN codes in the regulation before relying on any figure."
    },
    {
     "t": "h2",
     "text": "Worked example: 1,000 tonnes of rebar"
    },
    {
     "t": "p",
     "text": "Using the Türkiye default for CN 7214 20 00 (2.310 tCO2e per tonne) and the mark-up for each year:"
    },
    {
     "t": "ul",
     "items": [
      "**2026:** 2.310 × 1.10 = 2.541 tCO2e per tonne, or 2,541 tCO2e for 1,000 tonnes.",
      "**2027:** 2.310 × 1.20 = 2.772 tCO2e per tonne, or 2,772 tCO2e.",
      "**2028 onwards:** 2.310 × 1.30 = 3.003 tCO2e per tonne, or 3,003 tCO2e."
     ]
    },
    {
     "t": "p",
     "text": "These are embedded emissions, not the number of certificates. The certificates an importer surrenders are reduced by the adjustment for EU free allocation and by any carbon price effectively paid in the country of production. If your verified intensity for the same product is below the marked-up default, actual data lowers your buyer's CBAM cost; if it is above, the default is the cheaper figure for now, but the gap narrows as the mark-up rises."
    },
    {
     "t": "h2",
     "text": "What using actual emissions requires"
    },
    {
     "t": "ul",
     "items": [
      "**Verification:** actual emissions declared for goods imported from 1 January 2026 must be verified by an accredited CBAM verifier. The declarant includes the operator's calculation and the verification report in the CBAM declaration (Q&A 5.9).",
      "**A first physical site visit:** the verifier must visit the installation the first time; a virtual visit or waiver is possible only in later years under strict conditions (Q&A 5.15).",
      "**The right year:** for goods imported in 2026, the reporting period is 2026. If there are no actual verified emissions for 2026, default values must be used (Q&A 5.17).",
      "**No LCA shortcuts:** emission factors from life-cycle assessments or life-cycle inventory databases are not accepted (Q&A 4.24).",
      "**Timing:** national accreditation bodies were expected to issue the first CBAM accreditations around September 2026, with verification work in early 2027 (Q&A 5.12)."
     ]
    },
    {
     "t": "h2",
     "text": "When actual data pays off, and when it does not"
    },
    {
     "t": "p",
     "text": "Compare your own intensity with the marked-up default, product by product. Actual data pays off when your figure is clearly lower and the volume to the EU is large enough to carry the cost of monitoring and verification. It may not pay off for small or one-off flows, or where your route is more emissions-intensive than the default. Agree with each EU buyer who pays for verification and how the CBAM cost is reflected in price. Our report [Actual or default? The CBAM data decision for Turkish metal exporters](/en/insights/report/cbam-actual-or-default-e9f664d8) sets out that decision."
    },
    {
     "t": "h2",
     "text": "Key dates"
    },
    {
     "t": "p",
     "text": "Sales of CBAM certificates start on 1 February 2027. The first annual CBAM declaration, for goods imported in 2026, is due by 30 September 2027 (Q&A)."
    },
    {
     "t": "h2",
     "text": "FAQ"
    },
    {
     "t": "faq",
     "items": [
      [
       "What is a CBAM default value?",
       "The embedded-emissions value per tonne, set by the Commission by country and CN code, that the EU declarant uses when verified actual data is not available. The 2026 values are in Annex I to Implementing Regulation (EU) 2025/2621, as corrected by Implementing Regulation (EU) 2026/1740."
      ],
      [
       "How large is the mark-up?",
       "10% in 2026, 20% in 2027 and 30% from 2028 for iron and steel, aluminium, cement and hydrogen; 1% for fertilisers from 2026 (Commission CBAM Q&A, 4.25)."
      ],
      [
       "Do actual emissions have to be verified?",
       "Yes. Actual emissions declared for goods imported from 1 January 2026 must be verified by an accredited CBAM verifier, and the verification report goes with the declaration (Q&A 5.9)."
      ],
      [
       "What if Türkiye has no value for my product?",
       "If the product is not listed for Türkiye or the field shows \"-\", the declarant uses the \"Other countries and territories\" table, which averages the ten exporting countries with the highest emission intensities (Q&A 4.25–4.26)."
      ],
      [
       "Can we use our LCA or EPD figures instead?",
       "No. Emission factors from life-cycle assessments or life-cycle inventory databases are not accepted for calculating embedded emissions of CBAM goods (Q&A 4.24)."
      ]
     ]
    },
    {
     "t": "p",
     "text": "To see where your data stands, take the [CBAM readiness check](/en/decision-lab/cbam-readiness-check). For prices and the TR ETS link, see [CBAM 2026: prices and TR ETS](/en/insights/cbam-2026-update-tr-ets-cop31). Our [CBAM data readiness](/en/solutions/cbam-data-readiness) work prepares the file your buyer needs."
    },
    {
     "t": "sources",
     "title": "Sources",
     "items": [
      "European Commission, CBAM legislation and guidance (accessed 9 Nov 2026): https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-legislation-and-guidance_en",
      "European Commission, Default values definitive period (Excel, version 2, 6 Aug 2026, Türkiye sheet; information only): https://taxation-customs.ec.europa.eu/document/download/1c05d211-80cb-4aaa-8ef0-e08005a95d7e_en?filename=DV%20correcting%20act_final%20update_06.08.xlsx",
      "European Commission, CBAM Questions and Answers, last updated 15 Oct 2026, sections 4.24–4.26, 5.9, 5.12, 5.15, 5.17: https://taxation-customs.ec.europa.eu/document/download/013fa763-5dce-4726-a204-69fec04d5ce2_en"
     ]
    }
   ]
  },
  "tr": {
   "path": "icgoruler/skdm-varsayilan-degerler-2026-gercek-emisyon",
   "title": "SKDM Varsayılan Değerleri 2026: Gerçek Emisyon mu?",
   "description": "SKDM (CBAM) 2026 varsayılan değerleri, %10–30 ek pay; inşaat demiri, sıcak haddelenmiş çelik ve alüminyum için Türkiye değerleri, örnek hesap ve doğrulama.",
   "h1": "SKDM varsayılan değerleri 2026: ek pay Türk çelik ve alüminyum ihracatçısı için ne anlama geliyor?",
   "blocks": [
    {
     "t": "p",
     "text": "Türk tesisinin AB'ye gönderdiği her ton çelik ve alüminyumun artık bir sayısı var: gömülü emisyonu. AB'deki ithalatçı, Sınırda Karbon Düzenleme Mekanizması (SKDM, AB'deki adıyla CBAM) kapsamında ya tesisin doğrulanmış gerçek emisyonunu ya da Komisyon'un varsayılan değerini ek payıyla birlikte beyan ediyor. Bu not, 2026 varsayılan değerlerinin nereden geldiğini, sık ihraç edilen üç Türk ürünü için ne olduğunu ve gerçek veri kullanmanın ne gerektirdiğini özetliyor."
    },
    {
     "t": "h2",
     "text": "2026 varsayılan değerleri nereden geliyor?"
    },
    {
     "t": "p",
     "text": "Varsayılan değerler (AB) 2025/2621 sayılı Komisyon Uygulama Tüzüğü'nün Ek I'inde yer alıyor. Komisyon, Ek I ve Ek IV'ü 20 Temmuz 2026'da kabul edilen (AB) 2026/1740 sayılı Uygulama Tüzüğü ile düzeltti ve 2025/2621'in konsolide metninin \"yakında\" yayımlanacağını belirtiyor. Değerler ayrıca bir Excel dosyasında (sürüm 2, 6 Ağustos 2026) yayımlanıyor; bu dosya yalnızca bilgi amaçlı, bağlayıcı değerler tüzükte."
    },
    {
     "t": "p",
     "text": "Değerler ülke ve ürün (GTİP/CN kodu) bazında belirleniyor. Ürün o ülke için listede yoksa ya da alanda \"-\" varsa beyan sahibi \"Diğer ülkeler ve bölgeler\" tablosunu kullanmak zorunda. Bu tablo, o ürün için emisyon yoğunluğu en yüksek on ihracatçı ülkenin ortalaması (Komisyon SKDM Soru-Cevap, 4.25–4.26)."
    },
    {
     "t": "h2",
     "text": "Ek pay: 2026'da %10, 2028'den itibaren %30"
    },
    {
     "t": "p",
     "text": "Varsayılan değerler her yıl artan bir ek payla yükseltiliyor. Ek pay varsayılan değere uygulanıyor, doğrulanmış gerçek veriye değil."
    },
    {
     "t": "table",
     "head": [
      "Sektör",
      "2026",
      "2027",
      "2028 ve sonrası"
     ],
     "rows": [
      [
       "Demir-çelik, alüminyum, çimento, hidrojen",
       "%10",
       "%20",
       "%30"
      ],
      [
       "Gübre",
       "%1",
       "%1",
       "%1"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Kaynak: Komisyon SKDM Soru-Cevap (son güncelleme 15 Ekim 2026), 4.25. Komisyon, ek paylı varsayılan değerlerin gömülü emisyonu düşük göstermeyecek şekilde belirlendiğini, bu yüzden gerçek değer varsa kullanmanın \"çoğu durumda\" daha avantajlı olacağını ekliyor."
    },
    {
     "t": "h2",
     "text": "Üç yaygın ürün için Türkiye varsayılan değerleri"
    },
    {
     "t": "table",
     "head": [
      "GTİP/CN kodu",
      "Ürün",
      "Varsayılan değer, toplam (ton başına tCO2e)"
     ],
     "rows": [
      [
       "7214 20 00",
       "İnşaat demiri: nervürlü veya şekil verilmiş çubuklar",
       "2,310"
      ],
      [
       "7208",
       "Demir veya alaşımsız çelikten sıcak haddelenmiş yassı ürünler, genişliği ≥ 600 mm",
       "2,428"
      ],
      [
       "7601",
       "İşlenmemiş alüminyum",
       "1,700"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Kaynak: Komisyon \"Default values definitive period\" Excel dosyası, Türkiye sayfası, sürüm 2 (6 Ağustos 2026), 2026/1740 sayılı Tüzük'e dayalı. Bu üç ürün için Türkiye tablosu yalnızca doğrudan emisyon veriyor; dolaylı emisyon \"N/A\". Herhangi bir rakama dayanmadan önce kendi GTİP kodlarınızı tüzükte kontrol edin."
    },
    {
     "t": "h2",
     "text": "Örnek hesap: 1.000 ton inşaat demiri"
    },
    {
     "t": "p",
     "text": "GTİP 7214 20 00 için Türkiye varsayılan değeri (ton başına 2,310 tCO2e) ve her yılın ek payıyla:"
    },
    {
     "t": "ul",
     "items": [
      "**2026:** 2,310 × 1,10 = ton başına 2,541 tCO2e; 1.000 ton için 2.541 tCO2e.",
      "**2027:** 2,310 × 1,20 = ton başına 2,772 tCO2e; 2.772 tCO2e.",
      "**2028 ve sonrası:** 2,310 × 1,30 = ton başına 3,003 tCO2e; 3.003 tCO2e."
     ]
    },
    {
     "t": "p",
     "text": "Bu rakamlar gömülü emisyondur, sertifika adedi değildir. İthalatçının teslim edeceği sertifika sayısı, AB'deki ücretsiz tahsis düzeltmesi ve üretim ülkesinde fiilen ödenen karbon fiyatı düşüldükten sonra belirlenir. Aynı ürün için doğrulanmış yoğunluğunuz ek paylı varsayılan değerin altındaysa gerçek veri alıcınızın SKDM maliyetini düşürür; üstündeyse şimdilik varsayılan değer daha ucuzdur, ama ek pay arttıkça fark kapanır."
    },
    {
     "t": "h2",
     "text": "Gerçek emisyon kullanmak ne gerektiriyor?"
    },
    {
     "t": "ul",
     "items": [
      "**Doğrulama:** 1 Ocak 2026'dan itibaren ithal edilen mallar için beyan edilen gerçek emisyonlar akredite bir SKDM doğrulayıcısı tarafından doğrulanmalı. Beyan sahibi, operatörün hesabını ve doğrulama raporunu SKDM beyanına ekler (Soru-Cevap 5.9).",
      "**İlk yıl fiziki saha ziyareti:** Doğrulayıcı tesisi ilk kez fiziki olarak ziyaret etmek zorunda; sanal ziyaret ya da muafiyet ancak sonraki yıllarda ve sıkı koşullarla mümkün (Soru-Cevap 5.15).",
      "**Doğru yıl:** 2026'da ithal edilen mallar için raporlama dönemi 2026. 2026'ya ait doğrulanmış gerçek emisyon yoksa varsayılan değer kullanılmak zorunda (Soru-Cevap 5.17).",
      "**YDD kısayolu yok:** Yaşam döngüsü değerlendirmesi (LCA) ya da yaşam döngüsü envanteri veri tabanlarından alınan emisyon faktörleri kabul edilmiyor (Soru-Cevap 4.24).",
      "**Zamanlama:** Ulusal akreditasyon kuruluşlarının ilk SKDM akreditasyonlarını Eylül 2026 civarında vermesi, doğrulama işinin 2027 başında yapılması bekleniyordu (Soru-Cevap 5.12)."
     ]
    },
    {
     "t": "h2",
     "text": "Gerçek veri ne zaman kazandırır, ne zaman kazandırmaz?"
    },
    {
     "t": "p",
     "text": "Kendi yoğunluğunuzu ürün ürün ek paylı varsayılan değerle karşılaştırın. Değeriniz belirgin şekilde düşükse ve AB'ye giden hacim izleme ve doğrulama maliyetini taşıyacak kadar büyükse gerçek veri kazandırır. Küçük ya da tek seferlik sevkiyatlarda veya üretim rotanız varsayılan değerden daha yoğunsa kazandırmayabilir. Doğrulamanın bedelini kimin ödeyeceğini ve SKDM maliyetinin fiyata nasıl yansıyacağını her AB alıcısıyla konuşun. Bu kararı [SKDM'de gerçek emisyon mu, varsayılan değer mi?](/tr/icgoruler/rapor/cbam-gercek-mi-varsayilan-mi-ef31215c) raporumuzda ele alıyoruz."
    },
    {
     "t": "h2",
     "text": "Önemli tarihler"
    },
    {
     "t": "p",
     "text": "SKDM sertifikalarının satışı 1 Şubat 2027'de başlıyor. 2026 ithalatı için ilk yıllık SKDM beyanının son günü 30 Eylül 2027 (Soru-Cevap)."
    },
    {
     "t": "h2",
     "text": "Sıkça sorulan sorular"
    },
    {
     "t": "faq",
     "items": [
      [
       "SKDM'de varsayılan değer nedir?",
       "Doğrulanmış gerçek veri olmadığında AB'deki beyan sahibinin kullandığı, Komisyon'un ülke ve GTİP kodu bazında belirlediği ton başına gömülü emisyon değeridir. 2026 değerleri, 2026/1740 ile düzeltilen 2025/2621 sayılı Uygulama Tüzüğü'nün Ek I'inde yer alır."
      ],
      [
       "Varsayılan değere ne kadar ek pay eklenir?",
       "Demir-çelik, alüminyum, çimento ve hidrojende 2026 için %10, 2027 için %20, 2028'den itibaren %30; gübrede 2026'dan itibaren %1 (Komisyon SKDM Soru-Cevap, 4.25)."
      ],
      [
       "Gerçek emisyon kullanmak için doğrulama şart mı?",
       "Evet. 1 Ocak 2026'dan itibaren ithal edilen mallar için beyan edilen gerçek emisyonlar akredite bir SKDM doğrulayıcısınca doğrulanmalı ve doğrulama raporu beyana eklenmeli (Soru-Cevap 5.9)."
      ],
      [
       "Türkiye için ürünümün değeri yoksa ne olur?",
       "Ürün Türkiye için listede yoksa ya da alanda \"-\" varsa beyan sahibi \"Diğer ülkeler ve bölgeler\" tablosunu kullanır; bu tablo emisyon yoğunluğu en yüksek on ihracatçı ülkenin ortalamasıdır (Soru-Cevap 4.25–4.26)."
      ],
      [
       "Ürün karbon ayak izi (LCA/EPD) verimiz gerçek emisyon yerine geçer mi?",
       "Hayır. Yaşam döngüsü değerlendirmesi ya da yaşam döngüsü envanteri veri tabanlarından alınan emisyon faktörleri SKDM gömülü emisyon hesabında kabul edilmiyor (Soru-Cevap 4.24)."
      ]
     ]
    },
    {
     "t": "p",
     "text": "Verinizin nerede durduğunu görmek için [2 dakikalık SKDM hazırlık testini](/tr/karar-laboratuvari/cbam-hazirlik-testi) yapın. Sertifika fiyatları ve TR ETS bağlantısı için [SKDM 2026: güncel sertifika fiyatı ve TR ETS](/tr/icgoruler/skdm-2026-guncel-sertifika-fiyati-tr-ets) yazımıza bakın. [SKDM veri hazırlığı çalışmamız](/tr/cozumler/cbam-veri-hazirligi) alıcınızın istediği dosyayı hazırlıyor."
    },
    {
     "t": "sources",
     "title": "Kaynaklar",
     "items": [
      "Avrupa Komisyonu, CBAM legislation and guidance (erişim 9 Kasım 2026): https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-legislation-and-guidance_en",
      "Avrupa Komisyonu, Default values definitive period (Excel, sürüm 2, 6 Ağustos 2026, Türkiye sayfası; yalnızca bilgi amaçlı): https://taxation-customs.ec.europa.eu/document/download/1c05d211-80cb-4aaa-8ef0-e08005a95d7e_en?filename=DV%20correcting%20act_final%20update_06.08.xlsx",
      "Avrupa Komisyonu, CBAM Questions and Answers, son güncelleme 15 Ekim 2026, bölüm 4.24–4.26, 5.9, 5.12, 5.15, 5.17: https://taxation-customs.ec.europa.eu/document/download/013fa763-5dce-4726-a204-69fec04d5ce2_en"
     ]
    }
   ]
  }
 },
 {
  "key": "guideUkCbam",
  "solution": "solutionCbam",
  "date": "2026-11-09",
  "checked": {
   "en": "9 November 2026",
   "tr": "9 Kasım 2026"
  },
  "image": "guideUkCbam",
  "readingTime": {
   "en": "9 min",
   "tr": "9 dk"
  },
  "topic": {
   "en": "UK CBAM",
   "tr": "İngiltere SKDM"
  },
  "en": {
   "path": "insights/uk-cbam-2027-turkish-exporters",
   "title": "UK CBAM 2027: What Turkish Steel and Aluminium Must Do",
   "description": "UK CBAM starts on 1 January 2027. What Turkish steel and aluminium exporters must prepare, how it differs from EU CBAM and which emissions data UK buyers need.",
   "h1": "UK CBAM from 1 January 2027: what Turkish steel and aluminium exporters must prepare",
   "blocks": [
    {
     "t": "p",
     "text": "Turkish steel and aluminium exporters spent 2026 on EU CBAM data. A second CBAM starts in seven weeks: the UK's applies to aluminium, iron and steel, cement, fertiliser and hydrogen goods imported into the UK on or after 1 January 2027 (HMRC, CBAM policy summary, updated 2 Nov 2026)."
    },
    {
     "t": "p",
     "text": "It is not a copy of the EU system: threshold, calendar, rate and the treatment of a home carbon price all differ."
    },
    {
     "t": "h2",
     "text": "What starts on 1 January 2027, and what does not"
    },
    {
     "t": "ul",
     "items": [
      "**From 1 January 2027:** liability; record keeping (code, tax point date, value, weight, exemption evidence; £500 fixed penalty if records are not kept); quarterly sector rates (HMRC policy summary; Keeping records for CBAM, updated 3 Nov 2026; Rates for CBAM, 16 Oct 2026).",
      "**Later:** registration opens 1 January 2028 (first-year deadline 31 January 2028); the return and payment for all of 2027 are due by 31 May 2028; quarterly returns follow, Q1 2028 due by 31 July 2028 (HMRC policy summary, Table 2)."
     ]
    },
    {
     "t": "p",
     "text": "Nothing is paid in 2027. But once an importer's CBAM imports cross the £50,000 threshold, every in-scope shipment from that point is chargeable, and its emissions data must exist when the importer files in 2028. Goods imported while an importer is below the threshold, neither registrable nor registered, are not charged (Finance Act 2026, section 147)."
    },
    {
     "t": "h2",
     "text": "Goods in scope: by UK commodity code"
    },
    {
     "t": "p",
     "text": "Only listed commodity codes are \"CBAM goods\" (HMRC, Check which goods are in scope, 16 Jul 2026); aluminium and iron and steel **scrap** is excluded. The charge covers **direct emissions** plus emissions embodied in **precursors**, so purchased billet or slab emissions follow a rolled product (HMRC policy summary). Check codes against the HMRC lists; do not assume your EU mapping carries over."
    },
    {
     "t": "h2",
     "text": "Who is liable: the UK importer, and when that is you"
    },
    {
     "t": "p",
     "text": "The liable person is the importer: the person in whose name the customs declaration is made, or on whose behalf it is made (Finance Act 2026, section 146). Usually that is the UK buyer."
    },
    {
     "t": "ol",
     "items": [
      "**If you sell DDP and the UK import declaration is made in your name or on your behalf, you are the importer and the CBAM liability is yours.** The Finance Act 2026 (section 146) makes the importer liable, and HMRC says this applies whether the importer is established in the UK or outside it. Using a customs broker or freight forwarder to lodge the declaration does not move the liability to them. If your own UK imports of CBAM goods reach the £50,000 threshold, you must register with HMRC yourself: registration uses a Government Gateway account and asks for an EORI number. A tax agent can file returns for you but cannot register for you and carries no liability. Because the test counts all of your own imports, DDP sales to several UK customers add up.",
      "**Even when the buyer is liable, the data comes from you**: actual emissions need verified intensity from your installation (HMRC policy summary)."
     ]
    },
    {
     "t": "h2",
     "text": "UK vs EU CBAM side by side"
    },
    {
     "t": "table",
     "head": [
      "",
      "UK CBAM",
      "EU CBAM"
     ],
     "rows": [
      [
       "Start of charge",
       "1 Jan 2027",
       "Definitive regime from 1 Jan 2026"
      ],
      [
       "Threshold",
       "£50,000 of CBAM goods by value, per importer (30-day forward or 12-month look-back test); no charge below it",
       "50 tonnes net mass per importer per year"
      ],
      [
       "Who files",
       "Importer (liable person), UK or non-UK established; may appoint a tax agent to file returns",
       "Authorised CBAM declarant"
      ],
      [
       "Price",
       "Sector rate published quarterly: UK ETS auction price minus a free-allocation adjustment",
       "Certificate price, quarterly in 2026, weekly from 2027"
      ],
      [
       "First payment",
       "Return and payment by 31 May 2028 for 2027 imports",
       "First declaration by 30 Sep 2027 for 2026 imports"
      ],
      [
       "Defaults",
       "One default value per good, regardless of origin",
       "Commission defaults, mark-up 10% (2026), 20% (2027), 30% (2028)"
      ]
     ]
    },
    {
     "t": "p",
     "text": "EU column as verified in our [CBAM 2026 update](/en/insights/cbam-2026-update-tr-ets-cop31)."
    },
    {
     "t": "p",
     "text": "HMRC's illustrative rates, published 16 October 2026 and based on the Q3 2026 average UK ETS price of £58.15, were **£9.69 per tCO2e for iron and steel** and **£9.79 for aluminium**. HMRC stresses these are not forecasts (HMRC, Illustrative CBAM rates, 16 Oct 2026). HMRC says the underlying data is likely to change before 1 January 2027 and the figures create no tax liability. The Q1 2027 rate will use the Q4 2026 UK ETS auction average (Finance Act 2026, s149). The low figure comes from the free-allocation adjustment, which currently removes about 83% of the ETS price."
    },
    {
     "t": "p",
     "text": "The £50,000 threshold is tested by value, not weight: 30 days forward from any day, or 12 months back on the first day of each month (Finance Act 2026, Sch 17 para 2). The threshold applies per importer, across all its CBAM imports made in the course of business, and only imports from 1 January 2027 count."
    },
    {
     "t": "h2",
     "text": "The data pack a UK buyer will ask for"
    },
    {
     "t": "ul",
     "items": [
      "**Installation identity**, production route and precursor data per product.",
      "**Verified emissions intensity per good** for a calendar year: for 2027 imports, 2027 data if available, otherwise 2026, or the production year (HMRC policy summary, Options 1 and 2).",
      "**A verification report or good-specific summary**, kept by the importer for six years (HMRC, Verifying emissions data, 16 Oct 2026; Keeping records for CBAM).",
      "**Weight and value records** matching the import declaration."
     ]
    },
    {
     "t": "p",
     "text": "Two rules deserve attention. First, if an importer files a return with default values, it **cannot amend it later** with actual data (HMRC, Iron and steel default values, 16 Oct 2026). Second, if your buyer wants to use actual data, the verifier must be accredited for UK CBAM against ISO/IEC 17029 and ISO 14065 by an eligible accreditation body, must have the right sectoral scope and must be independent of the installation (HMRC, Verifying emissions data). The verifier does not have to be British. An eligible accreditation body is a full member of the Global Accreditation Cooperation (Global ACI) that has been peer-evaluated for those standards, and it normally accredits verifiers in its own country (HMRC, Responsibilities if you accredit verifiers for CBAM). HMRC says the methodology is \"broadly designed to support interoperability with the EU CBAM\" (HMRC policy summary), so the same monitoring data can often serve both. An EU CBAM accreditation does not by itself cover UK CBAM, though. Ask your verifier, or TÜRKAK in the case of a Turkish verifier, whether a UK CBAM scope is available and when. If your buyer uses default values, no verification is needed."
    },
    {
     "t": "p",
     "text": "See also our report [CBAM: actual or default values for metal exporters](/en/insights/report/cbam-actual-or-default-e9f664d8)."
    },
    {
     "t": "h2",
     "text": "Carbon price relief and TR ETS: nothing to deduct for 2027 imports"
    },
    {
     "t": "p",
     "text": "**Carbon Price Relief** reduces the liability where a qualifying carbon price was paid, shown on a verified carbon pricing verification form; free allowances count at zero (HMRC, Work out your Carbon Price Relief, updated 2 Nov 2026). The TR ETS pilot requires reporting only for 2026; surrender starts with 2027 emissions (İklim Değişikliği Başkanlığı, announcement 1045, 1 Oct 2026)."
    },
    {
     "t": "p",
     "text": "Our reading: for 2027 imports, relief from TR ETS is likely to be zero. The verification form must cover 2025 or 2026, and TR ETS required no allowances to be surrendered for either year. HMRC's guidance sets criteria for a qualifying scheme rather than listing approved ones, and the importer must show that the scheme meets them. For later years, TR ETS will have to be tested against those criteria. Even then, the pilot rules provide for free allocation, which HMRC counts at zero. Plan for the full charge and treat any relief as upside."
    },
    {
     "t": "h2",
     "text": "\"The UK charge is small. Why bother?\""
    },
    {
     "t": "p",
     "text": "A sceptical CFO will say the rate is low and many UK buyers sit below £50,000. Fair, with caveats. The rate is low because UK producers still get free allowances, and it rises as they are phased out (Finance Act 2026, s149). Defaults ignore origin, so a low-intensity electric arc furnace mill loses its edge without verified data, and a default return can never be corrected. The same data serves EU CBAM, where the Commission's certificate price for Q3 2026 imports was €82.32 per tonne, before the EU's own free-allocation deduction (European Commission), so UK verification is an incremental cost. DDP sellers count all their UK sales toward one threshold. For small UK flows, defaults may honestly be cheaper: decide by product and volume."
    },
    {
     "t": "h2",
     "text": "One data system for EU CBAM, UK CBAM and TR ETS"
    },
    {
     "t": "p",
     "text": "The three regimes ask for overlapping data on different calendars; TR ETS pilot plants owe first monitoring methodology plans by 27 January 2027 (see [Türkiye ETS readiness](/en/solutions/turkiye-ets-readiness)). Build one installation-level model with product-level outputs for all three. Where accreditation scopes allow, ask your verifier to cover EU and UK requirements in a single site visit."
    },
    {
     "t": "h2",
     "text": "A seven-week action list before 1 January 2027"
    },
    {
     "t": "ol",
     "items": [
      "**List UK customers, Incoterms and the importer** on each flow.",
      "**Map products to UK commodity codes.**",
      "**Compare your intensity with the UK default** per code (HMRC tables, 16 Oct 2026).",
      "**Ask your verifier (and TÜRKAK)** about a UK CBAM scope and a 2027 plan.",
      "**Agree a data clause with UK buyers**: what, in which format, by when in 2028.",
      "**Align with your TR ETS monitoring plan** if your plant is in the pilot.",
      "**Brief sales teams**: UK buyers will compare landed cost including CBAM."
     ]
    },
    {
     "t": "p",
     "text": "Our [CBAM data readiness](/en/solutions/cbam-data-readiness) work covers steps 2 to 6. To test where you stand, take the [CBAM readiness check](/en/decision-lab/cbam-readiness-check)."
    },
    {
     "t": "h2",
     "text": "What could still change"
    },
    {
     "t": "p",
     "text": "Two things to watch. First, HMRC will publish the first actual sector rates, for 1 January to 31 March 2027, before the end of 2026. They will be based on the average UK ETS auction price in the last quarter of 2026, so they will differ from the illustrative figures above. Second, press reports (Euronews, 6 November 2026; Bloomberg, 8 November 2026) say the UK and EU have concluded, or nearly concluded, talks to link their emissions trading systems, with an announcement expected at an EU–UK summit on 20 November. A draft text seen by Euronews says linking would exempt EU and UK goods from each other's CBAMs \"subject to respective laws and procedures\". Nothing is agreed or in force yet: the deal needs approval on both sides, Bloomberg reports that it is tied to separate agri-food and youth-mobility agreements, and any exemption would not be automatic. If it goes ahead, EU mills selling into the UK could eventually face no UK CBAM while Turkish mills still would. Better data is a lever a Turkish exporter controls."
    },
    {
     "t": "h2",
     "text": "FAQ"
    },
    {
     "t": "faq",
     "items": [
      [
       "Does a Turkish exporter have to register with HMRC for UK CBAM?",
       "Not if your UK customer is the importer. If the import declaration is made in your name or on your behalf, as is common under DDP, you are the importer and liable wherever you are established. You must then register once your own UK imports of CBAM goods reach £50,000 under either test. Registration opens on 1 January 2028, with a first-year deadline of 31 January 2028."
      ],
      [
       "Can we reuse our EU CBAM verified figures for the UK?",
       "Not automatically. The UK methodology is broadly designed for interoperability with the EU, so the same monitoring data can often feed both. But if your buyer wants to use actual data, it must be verified for a calendar year by a verifier accredited for UK CBAM. Check whether your verifier has, or can get, that scope."
      ],
      [
       "What happens if we give our UK buyer no data?",
       "The importer uses HMRC's origin-blind default and cannot later amend that return."
      ],
      [
       "Is scrap covered?",
       "No. Aluminium and steel scrap codes are excluded."
      ],
      [
       "Does TR ETS reduce the UK charge?",
       "Not for 2027 imports, in our reading. Relief needs a carbon price that was actually payable, verified on a form covering 2025 or 2026, and TR ETS imposed no surrender obligation in either year. Because free allowances count at zero, relief may stay limited in later years too."
      ]
     ]
    },
    {
     "t": "p",
     "text": "*Facts as of 9 November 2026; HMRC is still publishing guidance. This article is not legal or tax advice.*"
    }
   ]
  },
  "tr": {
   "path": "icgoruler/ingiltere-skdm-2027-ihracatci",
   "title": "İngiltere SKDM 2027: Türk Çelik ve Alüminyum İhracatçısı",
   "description": "İngiltere SKDM'si 1 Ocak 2027'de başlıyor. Türk çelik ve alüminyum ihracatçısı için AB SKDM'den farkları, İngiliz alıcının isteyeceği veri ve 7 haftalık plan.",
   "h1": "İngiltere SKDM'si 1 Ocak 2027'de başlıyor: Türk çelik ve alüminyum ihracatçısı neyi hazırlamalı?",
   "blocks": [
    {
     "t": "p",
     "text": "Çelik ve alüminyum ihracatçılarımız 2026'yı AB'nin Sınırda Karbon Düzenleme Mekanizması (SKDM) verisiyle geçirdi. Yedi hafta sonra ikincisi başlıyor: Birleşik Krallık'ın (İngiltere) SKDM'si (UK CBAM), 1 Ocak 2027 ve sonrasında ithal edilen alüminyum, demir-çelik, çimento, gübre ve hidrojen ürünlerine uygulanacak (HMRC, CBAM policy summary, güncelleme 2 Kasım 2026)."
    },
    {
     "t": "p",
     "text": "AB sisteminin kopyası değil: eşik, takvim, oran ve üretici ülkede ödenen karbon fiyatının mahsubu farklı işliyor."
    },
    {
     "t": "h2",
     "text": "1 Ocak 2027'de ne başlıyor, ne başlamıyor?"
    },
    {
     "t": "ul",
     "items": [
      "**1 Ocak 2027'den itibaren:** yükümlülük; kayıt tutma (tarife kodu, vergi doğuran olay tarihi, kıymet, ağırlık, muafiyet kanıtı; kayıt tutulmazsa 500 sterlin maktu ceza); çeyreklik sektör oranları (HMRC policy summary; Keeping records for CBAM, güncelleme 3 Kasım 2026; Rates for CBAM, 16 Ekim 2026).",
      "**Daha sonra:** kayıt 1 Ocak 2028'de açılıyor (ilk yıl için son gün 31 Ocak 2028); 2027'nin tamamına ilişkin beyan ve ödeme 31 Mayıs 2028'e kadar; ardından çeyreklik beyan, 2028 ilk çeyreği için son gün 31 Temmuz 2028 (HMRC policy summary, Tablo 2)."
     ]
    },
    {
     "t": "p",
     "text": "2027'de para ödenmiyor. Ancak bir ithalatçının SKDM malı ithalatı 50.000 sterlinlik eşiği aştığı andan itibaren kapsamdaki her sevkiyat vergiye tabi oluyor ve ithalatçı 2028'de beyan verirken o sevkiyatın emisyon verisinin hazır olması gerekiyor. İthalatçı eşiğin altındayken, yani kayıt yükümlüsü olmadığı ve kayıtlı olmadığı dönemde yaptığı ithalattan SKDM alınmıyor (Finance Act 2026, madde 147)."
    },
    {
     "t": "h2",
     "text": "Kapsamdaki mallar: İngiliz tarife koduna göre"
    },
    {
     "t": "p",
     "text": "Yalnızca listelenen tarife kodları \"SKDM malı\" sayılıyor (HMRC, Check which goods are in scope, 16 Temmuz 2026); alüminyum ve demir-çelik **hurdası** kapsam dışı. Vergi **doğrudan emisyonlar** ile **öncül (precursor)** malların gömülü emisyonları üzerinden hesaplanıyor; yani satın alınan kütük ya da slabın emisyonu haddelenmiş ürüne taşınıyor (HMRC policy summary). Kodlarınızı HMRC listeleriyle kontrol edin; AB eşleştirmenizin aynen geçerli olacağını varsaymayın."
    },
    {
     "t": "h2",
     "text": "Yükümlü kim: İngiliz ithalatçı, ama bazen siz"
    },
    {
     "t": "p",
     "text": "Yükümlü kişi ithalatçı; yani gümrük beyannamesi kendi adına ya da kendi hesabına verilen kişi (Finance Act 2026, madde 146). Genellikle bu, İngiliz alıcı."
    },
    {
     "t": "ol",
     "items": [
      "**DDP satıyorsanız ve İngiltere ithalat beyannamesi sizin adınıza ya da sizin hesabınıza veriliyorsa, ithalatçı sizsiniz ve SKDM yükümlülüğü size aittir.** 2026 Finans Kanunu (Finance Act 2026, madde 146) yükümlülüğü ithalatçıya yüklüyor; HMRC de bunun, ithalatçı İngiltere'de ya da İngiltere dışında yerleşik olsun, geçerli olduğunu belirtiyor. Beyannameyi bir gümrük müşaviri ya da nakliye komisyoncusu aracılığıyla vermeniz yükümlülüğü onlara geçirmez. Kendi İngiltere ithalatınızdaki SKDM mallarının değeri 50.000 sterlinlik eşiğe ulaşırsa HMRC'ye kendiniz kayıt olmanız gerekir; kayıt Government Gateway hesabıyla yapılıyor ve EORI numarası isteniyor. Vergi danışmanınız (tax agent) beyanlarınızı sizin adınıza verebilir, ancak sizin yerinize kayıt olamaz ve yükümlülük üstlenmez. Test sizin tüm ithalatınızı saydığı için birden fazla İngiliz müşteriye yaptığınız DDP satışlar toplanır.",
      "**Yükümlü alıcı olsa bile veri sizden gelir**: fiili emisyon için tesisinizden doğrulanmış yoğunluk gerekiyor (HMRC policy summary)."
     ]
    },
    {
     "t": "h2",
     "text": "İngiltere ve AB SKDM yan yana"
    },
    {
     "t": "table",
     "head": [
      "",
      "İngiltere SKDM",
      "AB SKDM"
     ],
     "rows": [
      [
       "Mali yükümlülüğün başlangıcı",
       "1 Ocak 2027",
       "Kesin dönem 1 Ocak 2026'dan itibaren"
      ],
      [
       "Eşik",
       "İthalatçı bazında, kıymetle 50.000 sterlin (30 gün ileriye ya da 12 ay geriye bakan test); eşiğin altında vergi yok",
       "İthalatçı başına yılda 50 ton net ağırlık"
      ],
      [
       "Beyanı kim verir",
       "İthalatçı (yükümlü kişi), İngiltere'de ya da yurt dışında yerleşik; beyanlar için vergi danışmanı (tax agent) yetkilendirebilir",
       "Yetkilendirilmiş SKDM beyancısı"
      ],
      [
       "Fiyat",
       "Çeyreklik sektör oranı: İngiltere ETS ihale fiyatından ücretsiz tahsis düzeltmesi düşülerek",
       "Sertifika fiyatı; 2026'da çeyreklik, 2027'den itibaren haftalık"
      ],
      [
       "İlk ödeme",
       "2027 ithalatı için beyan ve ödeme 31 Mayıs 2028'e kadar",
       "2026 ithalatı için ilk beyan 30 Eylül 2027'ye kadar"
      ],
      [
       "Varsayılan değer",
       "Her mal için menşeden bağımsız tek değer",
       "Komisyon değerleri; ek pay %10 (2026), %20 (2027), %30 (2028)"
      ]
     ]
    },
    {
     "t": "p",
     "text": "AB sütunu [SKDM 2026 güncellememizde](/tr/icgoruler/skdm-2026-guncel-sertifika-fiyati-tr-ets) doğrulandığı şekliyle."
    },
    {
     "t": "p",
     "text": "HMRC'nin 16 Ekim 2026'da yayımladığı ve 2026 üçüncü çeyrek İngiltere ETS ortalama fiyatına (58,15 sterlin) dayanan örnek oranlar **demir-çelik için tCO2e başına 9,69 sterlin**, **alüminyum için 9,79 sterlin**. HMRC bunların tahmin olmadığını vurguluyor (HMRC, Illustrative CBAM rates, 16 Ekim 2026). HMRC, hesaplamaya esas verilerin 1 Ocak 2027'den önce değişmesinin muhtemel olduğunu ve bu rakamların herhangi bir vergi yükümlülüğü doğurmadığını belirtiyor. 2027'nin ilk çeyreği oranı, 2026'nın son çeyreğindeki İngiltere ETS ihale ortalamasına dayanacak (Finance Act 2026, madde 149). Oranın düşük olmasının nedeni ücretsiz tahsis düzeltmesi; bu düzeltme şu anda ETS fiyatının yaklaşık %83'ünü düşüyor."
    },
    {
     "t": "p",
     "text": "50.000 sterlinlik eşik ağırlıkla değil kıymetle ölçülüyor: herhangi bir günden 30 gün ileriye ya da her ayın ilk günü 12 ay geriye bakılıyor (Finance Act 2026, Ek 17 paragraf 2). Eşik ithalatçı bazında, ticari faaliyet kapsamında yapılan tüm SKDM malı ithalatı toplanarak uygulanıyor ve yalnızca 1 Ocak 2027 ve sonrasındaki ithalat sayılıyor."
    },
    {
     "t": "h2",
     "text": "İngiliz alıcının isteyeceği veri paketi"
    },
    {
     "t": "ul",
     "items": [
      "Ürün bazında **tesis kimliği**, üretim rotası ve öncül mal verisi.",
      "**Ürün bazında doğrulanmış emisyon yoğunluğu**, takvim yılı için: 2027 ithalatında varsa 2027, yoksa 2026 verisi ya da ürünün üretildiği yılın verisi (HMRC policy summary, Seçenek 1 ve 2).",
      "İthalatçının altı yıl saklayacağı **doğrulama raporu ya da ürüne özel doğrulama özeti** (HMRC, Verifying emissions data, 16 Ekim 2026; Keeping records for CBAM).",
      "Gümrük beyannamesiyle uyumlu **ağırlık ve kıymet kayıtları**."
     ]
    },
    {
     "t": "p",
     "text": "İki kurala dikkat. Birincisi, ithalatçı beyanı varsayılan değerle verirse **sonradan fiili veriyle düzeltemez** (HMRC, Iron and steel default values, 16 Ekim 2026). İkincisi, alıcınız fiili veri kullanmak isterse doğrulayıcının İngiltere SKDM'si için ISO/IEC 17029 ve ISO 14065 kapsamında uygun bir akreditasyon kuruluşunca akredite edilmiş, doğru sektör kapsamına sahip ve tesisten bağımsız olması gerekiyor (HMRC, Verifying emissions data). Doğrulayıcının İngiliz olması gerekmiyor. Uygun akreditasyon kuruluşu, Global Accreditation Cooperation'ın (Global ACI) tam üyesi olan ve bu standartlar için akran değerlendirmesinden geçmiş bir kuruluş; normalde kendi ülkesindeki doğrulayıcıları akredite ediyor (HMRC, Responsibilities if you accredit verifiers for CBAM). HMRC yöntemin AB SKDM ile \"büyük ölçüde birlikte çalışabilir\" tasarlandığını söylüyor (HMRC policy summary); yani aynı izleme verisi çoğu zaman iki rejime de hizmet edebilir. Ancak AB SKDM akreditasyonu tek başına İngiltere SKDM'sini kapsamıyor. Doğrulayıcınıza, Türk bir doğrulayıcı söz konusuysa TÜRKAK'a da, İngiltere SKDM kapsamının sunulup sunulmadığını ve ne zaman sunulacağını sorun. Alıcınız varsayılan değer kullanırsa doğrulama gerekmiyor."
    },
    {
     "t": "p",
     "text": "Ayrıca bkz. raporumuz: [SKDM: Gerçek mi Varsayılan mı? Metal İhracatı](/tr/icgoruler/rapor/cbam-gercek-mi-varsayilan-mi-ef31215c)."
    },
    {
     "t": "h2",
     "text": "Karbon fiyatı mahsubu ve TR ETS: 2027 ithalatı için düşülecek bir şey yok"
    },
    {
     "t": "p",
     "text": "**Karbon Fiyatı Mahsubu (Carbon Price Relief)**, nitelikli bir karbon fiyatı ödenmişse ve bu, doğrulanmış bir karbon fiyatı doğrulama formuyla gösterilirse SKDM borcunu azaltıyor; ücretsiz tahsisler sıfır sayılıyor (HMRC, Work out your Carbon Price Relief, güncelleme 2 Kasım 2026). TR ETS pilot döneminde 2026 için yalnızca raporlama var; teslim yükümlülüğü 2027 emisyonlarıyla başlıyor (İklim Değişikliği Başkanlığı, 1045 sayılı duyuru, 1 Ekim 2026)."
    },
    {
     "t": "p",
     "text": "Bizim okumamız şu: 2027'de ithal edilen mallar için TR ETS'den mahsup büyük olasılıkla sıfır olacak. Doğrulama formu 2025 ya da 2026'yı kapsamalı; TR ETS'de bu iki yılın hiçbiri için izin teslim yükümlülüğü yok. HMRC'nin rehberi onaylı sistemleri listelemiyor, nitelikli sistem için kriter koyuyor; sistemin bu kriterleri karşıladığını göstermek ithalatçıya düşüyor. Sonraki yıllar için TR ETS'nin bu kriterlere uyup uymadığının ayrıca değerlendirilmesi gerekecek. O durumda bile pilot dönem kuralları ücretsiz tahsisat öngörüyor ve HMRC ücretsiz tahsisatı sıfır fiyatla sayıyor. 2027 için İngiltere SKDM yükünün tamamını planlayın; mahsup çıkarsa bunu ek kazanç olarak görün."
    },
    {
     "t": "h2",
     "text": "\"İngiltere'deki yük küçük, neden uğraşalım?\""
    },
    {
     "t": "p",
     "text": "Temkinli bir finans direktörü oranın düşük olduğunu ve birçok İngiliz alıcının 50.000 sterlinin altında kaldığını söyleyecektir. Haklı, ama bazı çekincelerle. Oran, İngiliz üreticiler hâlâ ücretsiz tahsis aldığı için düşük ve bu tahsisler azaldıkça yükselecek (Finance Act 2026, madde 149). Varsayılan değerler menşeye bakmıyor; düşük yoğunluklu bir elektrik ark ocağı tesisi doğrulanmış veri olmadan avantajını kaybediyor ve varsayılan değerle verilen beyan hiçbir zaman düzeltilemiyor. Aynı veri AB SKDM'sine de hizmet ediyor; Avrupa Komisyonu'nun 2026 üçüncü çeyrek ithalatı için açıkladığı sertifika fiyatı, AB'nin kendi ücretsiz tahsis düşümü öncesinde ton başına 82,32 avro (Avrupa Komisyonu). Bu yüzden İngiltere doğrulaması yalnızca marjinal bir ek maliyet getiriyor. DDP satıcılar tüm İngiltere satışlarını tek eşikte topluyor. Küçük İngiltere akışlarında ise varsayılan değer gerçekten daha ucuz olabilir: ürün ve hacim bazında karar verin."
    },
    {
     "t": "h2",
     "text": "AB SKDM, İngiltere SKDM ve TR ETS için tek veri sistemi"
    },
    {
     "t": "p",
     "text": "Üç rejim örtüşen veriyi farklı takvimlerle istiyor; TR ETS pilot tesislerinin ilk izleme metodolojisi planları için son gün 27 Ocak 2027 (bkz. [Türkiye ETS hazırlığı](/tr/cozumler/turkiye-ets-hazirligi)). Üçü için de ürün düzeyinde çıktı veren tek bir tesis modeli kurun. Akreditasyon kapsamları izin veriyorsa doğrulayıcınızdan AB ve İngiltere gerekliliklerini tek saha ziyaretinde karşılamasını isteyin."
    },
    {
     "t": "h2",
     "text": "1 Ocak 2027'ye kadar yedi haftalık eylem listesi"
    },
    {
     "t": "ol",
     "items": [
      "**İngiliz müşterileri, teslim şekillerini ve her akıştaki ithalatçıyı** listeleyin.",
      "**Ürünleri İngiliz tarife kodlarıyla eşleştirin.**",
      "**Her kod için yoğunluğunuzu İngiltere varsayılan değeriyle karşılaştırın** (HMRC tabloları, 16 Ekim 2026).",
      "**Doğrulayıcınıza (ve TÜRKAK'a)** İngiltere SKDM kapsamını ve 2027 planını sorun.",
      "**İngiliz alıcılarla veri maddesi üzerinde anlaşın**: ne, hangi formatta, 2028'de hangi tarihe kadar.",
      "**Tesisiniz pilotta ise TR ETS izleme planınızla uyumlu ilerleyin.**",
      "**Satış ekibini bilgilendirin**: İngiliz alıcılar SKDM dahil maliyeti çeyreklik oranlarla karşılaştıracak."
     ]
    },
    {
     "t": "p",
     "text": "[SKDM veri hazırlığı](/tr/cozumler/cbam-veri-hazirligi) çalışmamız 2 ile 6 arasındaki adımları kapsıyor. Nerede durduğunuzu görmek için [SKDM hazırlık testini](/tr/karar-laboratuvari/cbam-hazirlik-testi) yapın."
    },
    {
     "t": "h2",
     "text": "Neler hâlâ değişebilir?"
    },
    {
     "t": "p",
     "text": "İzlenmesi gereken iki konu var. Birincisi, HMRC ilk gerçek sektör oranlarını (1 Ocak–31 Mart 2027) 2026 sonundan önce yayımlayacak. Bu oranlar 2026'nın son çeyreğindeki ortalama İngiltere ETS ihale fiyatına dayanacağı için yukarıdaki örnek rakamlardan farklı olacak. İkincisi, basın haberlerine göre (Euronews, 6 Kasım 2026; Bloomberg, 8 Kasım 2026) İngiltere ve AB emisyon ticaret sistemlerini bağlama müzakerelerini tamamladı ya da tamamlamak üzere; duyurunun 20 Kasım'daki AB–İngiltere zirvesinde yapılması bekleniyor. Euronews'un gördüğü taslak metne göre bağlantı, AB ve İngiliz mallarını \"her iki tarafın ilgili mevzuat ve usullerine tabi olarak\" birbirlerinin SKDM'sinden muaf tutacak. Henüz kesinleşmiş ya da yürürlüğe girmiş bir şey yok: anlaşmanın iki tarafta da onaylanması gerekiyor, Bloomberg'e göre ayrı tarım-gıda ve gençlik hareketliliği anlaşmalarına bağlı ve muafiyet otomatik olmayacak. Gerçekleşirse İngiltere'ye satan AB'li üreticiler zamanla İngiltere SKDM'sinden kurtulabilir, Türk üreticiler ise kurtulamaz. Daha iyi veri, Türk ihracatçının kontrol edebildiği bir kaldıraç."
    },
    {
     "t": "h2",
     "text": "Sıkça sorulan sorular"
    },
    {
     "t": "faq",
     "items": [
      [
       "Türk ihracatçı İngiltere SKDM'si için HMRC'ye kayıt olmak zorunda mı?",
       "İthalatçı İngiliz müşterinizse hayır. İthalat beyannamesi sizin adınıza ya da sizin hesabınıza veriliyorsa (DDP satışlarda sık görülen durum), nerede yerleşik olursanız olun ithalatçı ve yükümlü sizsiniz. Bu durumda kendi İngiltere ithalatınızdaki SKDM mallarının değeri iki testten biriyle 50.000 sterline ulaştığında kayıt olmanız gerekir. Kayıt 1 Ocak 2028'de açılıyor; ilk yıl için son gün 31 Ocak 2028."
      ],
      [
       "AB SKDM için doğrulanmış verilerimizi İngiltere'de kullanabilir miyiz?",
       "Otomatik olarak hayır. İngiltere yöntemi AB ile büyük ölçüde birlikte çalışabilir tasarlandığı için aynı izleme verisi çoğu zaman iki rejimi de besleyebilir. Ama alıcınız fiili veri kullanmak isterse veri, takvim yılı bazında, İngiltere SKDM'si için akredite bir doğrulayıcı tarafından doğrulanmalı. Doğrulayıcınızın bu kapsama sahip olup olmadığını ya da alıp alamayacağını sorun."
      ],
      [
       "İngiliz alıcıya hiç veri vermezsek ne olur?",
       "İthalatçı HMRC'nin menşeden bağımsız varsayılan değerini kullanır ve o beyanı sonradan düzeltemez."
      ],
      [
       "Hurda kapsamda mı?",
       "Hayır. Alüminyum ve çelik hurdası kodları kapsam dışı."
      ],
      [
       "TR ETS İngiltere'deki yükü azaltır mı?",
       "Okumamıza göre 2027 ithalatı için hayır. Mahsup, fiilen ödenmesi gereken ve 2025 ya da 2026'yı kapsayan bir formla doğrulanmış bir karbon fiyatı gerektiriyor; TR ETS'de bu iki yılın hiçbiri için teslim yükümlülüğü yok. Ücretsiz tahsisler sıfır sayıldığı için sonraki yıllarda da mahsup sınırlı kalabilir."
      ]
     ]
    },
    {
     "t": "p",
     "text": "*Bilgiler 9 Kasım 2026 itibarıyla; HMRC rehber yayımlamaya devam ediyor. Bu yazı hukuki ya da vergisel danışmanlık değildir.*"
    }
   ]
  }
 },
 {
  "key": "guideGulfEntry",
  "solution": "serviceMarket",
  "date": "2026-11-09",
  "checked": {
   "en": "9 November 2026",
   "tr": "9 Kasım 2026"
  },
  "image": "guideGulfEntry",
  "readingTime": {
   "en": "9 min",
   "tr": "9 dk"
  },
  "topic": {
   "en": "Gulf market entry",
   "tr": "Körfez'e giriş"
  },
  "en": {
   "path": "insights/gulf-market-entry-framework-turkish-companies",
   "title": "Gulf Market Entry: UAE or Saudi Arabia First? A Framework",
   "description": "UAE or Saudi Arabia; free zone, distributor or local partner? A Gulf entry framework for Turkish companies, with the tests that matter before you commit.",
   "h1": "Gulf market entry: UAE or Saudi Arabia first? A decision framework for Turkish companies",
   "blocks": [
    {
     "t": "p",
     "text": "Turkish boards discussing the Gulf usually start with one question: Dubai or Riyadh? It is the wrong first question; the country is the third or fourth decision. This piece sets out the sequence, the rules behind each step, and the tests to run before committing capital."
    },
    {
     "t": "h2",
     "text": "Ask \"which customer, which proof\" before \"which country\""
    },
    {
     "t": "ol",
     "items": [
      "**Who is the first buyer?** A distributor, a retailer, an industrial user or a government entity; each points to a different entry model.",
      "**What must the first 90 days prove?** Demand at your price, a partner who can execute, a clear compliance route.",
      "**What is the smallest commitment that can prove it?** A distributor shipment proves more about demand than a company licence."
     ]
    },
    {
     "t": "p",
     "text": "Then compare countries."
    },
    {
     "t": "h2",
     "text": "Five entry routes, lightest to heaviest"
    },
    {
     "t": "ol",
     "items": [
      "**Direct export** to an importer of record. Low cost, little control. The Saudi importer needs a commercial registration with the right activity code, plus any sector licence the activity needs (T.C. Ticaret Bakanlığı, *Suudi Arabistan Pazar Bilgileri*, 2026).",
      "**Distributor or agent.** Türkiye's Ministry of Trade advises Saudi distributors who can deliver, support and solve problems locally, exclusive nationwide or by region (Jeddah-West, Riyadh-Central, Dammam-East) (Ticaret Bakanlığı, 2026).",
      "**Free-zone company** in the UAE. Free zones have no foreign ownership restrictions (JAFZA website; DMCC website).",
      "**Onshore company or branch.** In the UAE, foreign investors can fully own companies in all legal forms, except activities with a strategic impact (UAE Ministry of Economy and Tourism). That list is set by Cabinet Resolution No. 55 of 2021: defence and security, banking, exchange houses, finance companies and insurance, telecoms, money printing, Hajj and Umrah services, Quran centres and fisheries.",
      "**Partner or joint venture**, by choice or because the activity requires it."
     ]
    },
    {
     "t": "h2",
     "text": "UAE as a test base, Saudi Arabia as a scale market"
    },
    {
     "t": "p",
     "text": "**The UAE is usually the faster place to set up and test.** DMCC says its setup process \"takes around 10 working days\" (DMCC website), a claim covering licensing only; bank accounts and visas take longer. Corporate tax is 0% up to AED 375,000 of taxable income and 9% above (Cabinet Decision No. 116 of 2022, Arts. 2–3), for financial years starting on or after 1 June 2023. Multinational groups with global revenue of €750 million or more in at least two of the four preceding years also pay a domestic minimum top-up tax that lifts their UAE effective rate to 15%, for financial years starting on or after 1 January 2025 (Cabinet Decision No. 142 of 2024; UAE Ministry of Finance)."
    },
    {
     "t": "p",
     "text": "A Qualifying Free Zone Person pays 0% on qualifying income, but sales to mainland customers qualify only for specific activities. For goods, that generally means distribution from a VAT Designated Zone (such as JAFZA) to a customer who resells or processes them (Ministerial Decision No. 229 of 2025). DMCC is a free zone but does not appear on the Designated Zone list (Cabinet Decision No. 59 of 2017, as amended). If non-qualifying revenue exceeds the lower of 5% of revenue or AED 5 million, the 0% regime is lost for that year and the next four (FTA, Free Zone Persons guide). VAT at 5% still applies to most mainland sales."
    },
    {
     "t": "p",
     "text": "**Saudi Arabia is usually the larger market and the harder base.** Three rules shape the decision:"
    },
    {
     "t": "ul",
     "items": [
      "**Registration, not licensing.** The Investment Law, published on 16 August 2024, entered into force 180 days later, in February 2025, together with its Implementing Regulations (Ministerial Decision No. 1086/1446), and repealed the old Foreign Investment Law (Art. 16; Bureau of Experts). Foreign investors now register with the Ministry of Investment (MISA) before investing (Art. 7). Some activities are prohibited or restricted for foreign investors (Art. 8).",
      "**Wholly foreign trading is capital-heavy.** MISA lists a minimum capital of SAR 30,000,000 for a 100% foreign commercial activity, with presence in at least three regional or global markets. It also requires an investment of at least SAR 300 million over five years (including the SAR 30 million capital), or SAR 200 million plus local manufacturing, R&D or logistics conditions. With a Saudi partner holding at least 25%, the minimum capital is SAR 26,666,667 (MISA, Investor Guide, 13th ed., February 2026). MISA has signalled some flexibility on these amounts for applicants with a detailed five-year business plan (Deloitte, May 2026), so treat them as the starting position, not the final number. Türkiye's Ministry of Trade cites the same SAR 30 million threshold as a reason for its distributor advice (Ticaret Bakanlığı, 2026).",
      "**Tax.** A Saudi company's profits attributable to non-Saudi, non-GCC shareholders are taxed at 20% income tax; the share held by Saudi and GCC shareholders pays zakat at 2.5% of the zakat base. VAT is 15% (ZATCA). With mixed ownership, both apply."
     ]
    },
    {
     "t": "p",
     "text": "**Regional headquarters (RHQ).** Since 1 January 2024, Saudi government entities may contract with foreign companies that keep their Middle East and North Africa regional headquarters outside the Kingdom, and that appear on a list kept by MISA, only on restricted terms. The restriction also covers those companies' agents, distributors and suppliers for their goods and services (Council of Ministers Decision No. 461 of 1445H, Arts. 1, 3 and 5). Contracts worth an estimated SAR 1 million or less, and work performed outside Saudi Arabia, are exempt (Art. 4). In public tenders, a listed company's bid can be accepted only if it is the only technically acceptable bid, or the best technical bid and at least 25% cheaper than the next best (Art. 6). Government entities can also ask an exemption committee to approve a specific project or period (Arts. 9–10)."
    },
    {
     "t": "p",
     "text": "An RHQ needs a separate legal entity in Saudi Arabia (a company or registered branch), group presence in at least two countries other than Saudi Arabia and the group's head-office country, at least 15 full-time staff within a year, and no revenue-generating activity beyond RHQ functions (MISA, Terms and Conditions; Investor Guide, 13th ed.). In return, it gets 0% income tax on eligible income from eligible activities and 0% withholding tax on specified payments to non-residents, for 30 years, renewable (ZATCA, RHQ guideline, 2nd version, May 2026). An RHQ is rarely the entry move for Turkish companies. The trap: if you set up a MENA regional headquarters in Dubai and are listed, your Saudi distributor's sales of your products to government buyers can be caught as well."
    },
    {
     "t": "h2",
     "text": "\"Is UAE-as-test-base costing me in both markets?\""
    },
    {
     "t": "p",
     "text": "A sceptical CEO's objection: a Dubai base could restrict me and my Saudi distributor on government contracts over SAR 1 million, and a DMCC company may miss 0% on mainland sales. Honest answer: it can, under conditions you can test in advance."
    },
    {
     "t": "p",
     "text": "**It costs you in Saudi Arabia when** your target buyers are Saudi government entities on contracts above SAR 1 million, your UAE entity functions as your MENA regional headquarters, and your company is on MISA's list. The rule binds government entities (ministries, public bodies and government-founded non-profits), not private buyers. If you sell to state-owned companies or giga-project developers, ask whether they apply similar supplier rules."
    },
    {
     "t": "p",
     "text": "**It costs you in the UAE when** more than 5% of your free-zone company's revenue, or more than AED 5 million, comes from non-qualifying sources, such as goods sold to mainland customers from a zone or activity that does not qualify. Cross that line and the company loses the 0% regime for that year and the next four, and is taxed under the standard rules (9% above AED 375,000). Most mainland sales also carry 5% VAT either way."
    },
    {
     "t": "p",
     "text": "**How to structure around it:**"
    },
    {
     "t": "ul",
     "items": [
      "If Saudi government buyers are core, test the RHQ rule before you name a UAE entity your regional headquarters. Whether a UAE sales office counts as one is a question for legal advice; MISA's list is updated quarterly and circulated to government entities (Art. 5), so ask your Saudi buyer or counsel whether you are on it. The alternatives are a Saudi RHQ, bidding on the narrow terms above (sole acceptable bid, or best technical bid at least 25% cheaper), or asking the government buyer to seek an exemption (Arts. 9–10).",
      "For UAE mainland goods sales, compare a Designated Zone distribution model, an onshore company, or a UAE distributor.",
      "If neither market's rules fit, skip the UAE base and go straight to a Saudi distributor."
     ]
    },
    {
     "t": "h2",
     "text": "Local partner: strategic choice, not legal must"
    },
    {
     "t": "p",
     "text": "In the UAE, a local shareholder is generally a choice. In Saudi Arabia, a partner is often the practical route: not always legally required, but the 100% foreign thresholds are high and buyers expect a local counterpart. Choose one for access, execution (warehousing, after-sales, spare parts) and regulatory work; Saudi buyers read physical presence as a sign someone will answer when problems arise (Ticaret Bakanlığı, 2026)."
    },
    {
     "t": "p",
     "text": "Protect yourself early: register your Saudi trademark in your Turkish company's name through a licensed Saudi IP agent with a legalised power of attorney, and hold pre-market approvals (food, medicines, medical devices) in your own name so a distributor change does not strand them (Ticaret Bakanlığı, 2026)."
    },
    {
     "t": "h2",
     "text": "Relationship-led and public-sector buying"
    },
    {
     "t": "p",
     "text": "Saudi buyers prefer people they have met or were introduced to by someone they trust, so trade fairs beat email outreach (Ticaret Bakanlığı, 2026)."
    },
    {
     "t": "p",
     "text": "Tenders are announced on Etimad. Local content weighs most with Aramco and in defence. Aramco's iktva programme reached 70% local content across its procurement in early 2026 and now aims for 75% by 2030 (Aramco, February 2026); in defence, the national target is to localise more than 50% of military spending by 2030, against 27.3% at end-2025 (GAMI). These are programme-level figures, not a fixed rule for every tender, so check the local-content terms of each tender."
    },
    {
     "t": "h2",
     "text": "Product compliance and paperwork, early"
    },
    {
     "t": "ul",
     "items": [
      "**SABER** (SASO's platform) registration, required for regulated products, is the importer's or local seller's obligation (Ticaret Bakanlığı, 2026; saber.sa).",
      "**SFDA** covers food, medicines, cosmetics and medical devices. Halal certificates must come from bodies the SFDA recognises; certificates issued under SMIIC standards are not accepted (Ticaret Bakanlığı, 2026).",
      "**Legalisation.** MISA registration needs your commercial register and last-year financials certified by the Saudi embassy (MISA, Investor Guide, 13th ed.).",
      "**Arabic labelling:** check the SASO or SFDA technical regulation for your product; labelling rules differ by product."
     ]
    },
    {
     "t": "h2",
     "text": "A staged-commitment ladder with go/no-go gates"
    },
    {
     "t": "table",
     "head": [
      "Stage",
      "Commitment",
      "Gate to pass before the next stage"
     ],
     "rows": [
      [
       "0. Desk test",
       "Product compliance map; target buyer list",
       "Product can be registered; no excluded activity"
      ],
      [
       "1. Proof of demand",
       "Fair visit; samples; first orders through a distributor",
       "Repeat orders at target margin"
      ],
      [
       "2. Partner proof",
       "Distribution agreement with KPIs; trademark and approvals in your name",
       "Partner hits KPIs for two to three quarters"
      ],
      [
       "3. Light presence",
       "UAE free-zone or onshore entity for regional sales and service",
       "Regional revenue justifies fixed cost; RHQ and free-zone tests passed"
      ],
      [
       "4. Saudi presence",
       "MISA registration; Saudi entity, alone or with a partner",
       "Saudi revenue, local content or public buyers require it"
      ],
      [
       "5. RHQ",
       "Only if government contracts are core",
       "Government contracts above SAR 1m are core, and the business case covers RHQ substance (15 staff, 3 senior executives)"
      ]
     ]
    },
    {
     "t": "p",
     "text": "This is the logic of [market entry as a sequence of commitments](/en/insights/market-entry-sequence-of-commitments) and of our [market entry](/en/expertise/market-entry) work. On two-way capital flows, see [The Türkiye–Gulf capital corridor](/en/insights/turkiye-gulf-capital-corridor)."
    },
    {
     "t": "h2",
     "text": "FAQ"
    },
    {
     "t": "faq",
     "items": [
      [
       "Do I need a local company to sell?",
       "No. An importer or distributor can sell for you. You need a company to import, hold stock, invoice locally, or bid where local presence is required."
      ],
      [
       "What does the UAE's 9% corporate tax mean for a free-zone company?",
       "A Qualifying Free Zone Person pays 0% on qualifying income and 9% on other taxable income, without the AED 375,000 0% band. If non-qualifying revenue exceeds 5% of total revenue or AED 5 million (whichever is lower), the 0% regime is lost for five tax periods. Mainland sales are where most companies trip this rule; model them with a tax adviser before choosing a zone. General information, not tax advice; rules change and depend on your facts."
      ]
     ]
    },
    {
     "t": "h2",
     "text": "Next step"
    },
    {
     "t": "p",
     "text": "Test your case with our [Market Entry Compass](/en/decision-lab/market-entry-compass); see also the [Decision Lab](/en/decision-lab) and [Solutions](/en/solutions)."
    },
    {
     "t": "p",
     "text": "*Facts as of 9 November 2026. Rules differ by activity and emirate; this article is not legal or tax advice.*"
    }
   ]
  },
  "tr": {
   "path": "icgoruler/korfez-pazara-giris-karar-cercevesi",
   "title": "Körfez'e Giriş: Önce BAE mi, Suudi Arabistan mı?",
   "description": "BAE mi Suudi Arabistan mı; serbest bölge, distribütör mü yerel ortak mı? Türk şirketleri için Körfez'e giriş çerçevesi ve taahhütten önce yapılacak testler.",
   "h1": "Körfez pazarına giriş: Önce BAE mi, Suudi Arabistan mı? Türk şirketleri için karar çerçevesi",
   "blocks": [
    {
     "t": "p",
     "text": "Körfez'i konuşan yönetim kurullarında tartışma genellikle tek soruyla açılıyor: Dubai mi, Riyad mı? Bu, ilk sorulacak soru değil. Ülke seçimi sıralamada üçüncü ya da dördüncü karar. Bu yazıda kararların sırasını, her birini belirleyen kuralları ve sermaye bağlamadan önce yapılacak testleri ele alıyoruz."
    },
    {
     "t": "h2",
     "text": "Yanlış soru: \"Hangi müşteri, hangi kanıt\" yerine \"hangi ülke\""
    },
    {
     "t": "p",
     "text": "Önce üç soruya cevap verin:"
    },
    {
     "t": "ol",
     "items": [
      "**İlk alıcı kim?** Distribütör, perakende zinciri, sanayi kullanıcısı ya da kamu kurumu; her biri farklı bir giriş modeline işaret ediyor.",
      "**İlk 90 gün neyi kanıtlamalı?** Sizin fiyatınızda gerçek talep, işi yürütebilecek bir ortak ve ürününüz için net bir uygunluk yolu.",
      "**Bunu kanıtlayacak en küçük taahhüt ne?** Distribütör üzerinden yapılan bir sevkiyat, talep hakkında şirket lisansından daha fazlasını söyler."
     ]
    },
    {
     "t": "p",
     "text": "Ülkeleri ancak bundan sonra karşılaştırın."
    },
    {
     "t": "h2",
     "text": "Beş giriş yolu"
    },
    {
     "t": "p",
     "text": "En hafiften en ağıra:"
    },
    {
     "t": "ol",
     "items": [
      "**Doğrudan ihracat:** Yerel ithalatçıya satış. Maliyeti düşük, kontrolü az. Suudi ithalatçının ilgili faaliyet kodunu içeren ticari sicil kaydına (CR) ve sektör lisanslarına sahip olması gerekiyor (T.C. Ticaret Bakanlığı, *Suudi Arabistan Pazar Bilgileri*, 2026).",
      "**Distribütör ya da acente:** Ticaret Bakanlığı, ürünü sürekli ulaştırabilecek, teknik destek verebilecek ve yerel sorunları çözebilecek Suudi distribütörlerle çalışmayı tavsiye ediyor. Distribütörlük tüm ülke için münhasır ya da üç ana bölge (Cidde-Batı, Riyad-Orta, Dammam-Doğu) bazında verilebiliyor (Ticaret Bakanlığı, 2026).",
      "**BAE'de serbest bölge şirketi:** Serbest bölgelerde yabancı mülkiyet kısıtı yok (JAFZA ve DMCC internet siteleri).",
      "**Ana karada (onshore) şirket ya da şube:** BAE'de yabancı yatırımcı, stratejik etkisi olan faaliyetler dışında tüm şirket türlerinde tam mülkiyete sahip olabiliyor (BAE Ekonomi ve Turizm Bakanlığı). Bu faaliyetler 2021 tarihli 55 sayılı Bakanlar Kurulu Kararı'nda sayılıyor: savunma ve güvenlik, bankacılık, döviz büroları, finansman şirketleri ve sigorta, telekomünikasyon, para basımı, hac ve umre hizmetleri, Kuran kursları ve balıkçılık.",
      "**Yerel ortak ya da ortak girişim:** Faaliyet gerektirdiği için ya da bilinçli bir tercihle."
     ]
    },
    {
     "t": "h2",
     "text": "BAE test üssü, Suudi Arabistan ölçek pazarı"
    },
    {
     "t": "p",
     "text": "**BAE genellikle kurulumun ve testin daha hızlı olduğu yer.** DMCC kuruluşun \"yaklaşık 10 iş günü\" sürdüğünü söylüyor; bu bölgenin kendi beyanı (DMCC internet sitesi) ve yalnızca lisans sürecini kapsıyor; banka hesabı ve vizeler daha uzun sürer. Kurumlar vergisi, 1 Haziran 2023 ve sonrasında başlayan hesap dönemlerinde 375.000 dirheme kadar vergilendirilebilir gelirde %0, üzerinde %9 (116 sayılı 2022 Bakanlar Kurulu Kararı, md. 2-3). Son dört yılın en az ikisinde küresel geliri 750 milyon avro ve üzerinde olan çok uluslu gruplar ayrıca, 1 Ocak 2025 ve sonrasında başlayan hesap dönemlerinden itibaren, BAE'deki efektif vergi oranlarını %15'e tamamlayan yurt içi asgari tamamlayıcı vergi öder (2024 tarihli 142 sayılı Bakanlar Kurulu Kararı; BAE Maliye Bakanlığı)."
    },
    {
     "t": "p",
     "text": "Nitelikli Serbest Bölge Kişisi nitelikli gelirinde %0 öder; ancak ana karadaki müşterilere satışlar yalnızca belirli faaliyetlerde nitelikli sayılır. Mallarda bu genellikle, KDV açısından \"belirlenmiş bölge\" (Designated Zone) olan bir serbest bölgeden (ör. JAFZA) malı yeniden satan ya da işleyen müşteriye yapılan dağıtım anlamına geliyor (2025 tarihli 229 sayılı Bakanlık Kararı). DMCC bir serbest bölge, ancak belirlenmiş bölgeler listesinde yer almıyor (2017 tarihli 59 sayılı Bakanlar Kurulu Kararı ve değişiklikleri). Nitelikli olmayan gelir toplam gelirin %5'ini ya da 5 milyon dirhemi (hangisi düşükse) aşarsa %0 rejimi o yıl ve izleyen dört yıl için kaybediliyor (FTA, Serbest Bölge Kişileri rehberi). Ana karaya satışların çoğunda %5 KDV yine uygulanıyor."
    },
    {
     "t": "p",
     "text": "**Suudi Arabistan genellikle daha büyük pazar ama daha zor üs.** Kararı üç kural belirliyor:"
    },
    {
     "t": "ul",
     "items": [
      "**Lisans değil kayıt.** 16 Ağustos 2024'te yayımlanan Yatırım Kanunu, yayımından 180 gün sonra, Şubat 2025'te, Uygulama Yönetmeliği (1086/1446 sayılı Bakanlık Kararı) ile birlikte yürürlüğe girdi ve eski Yabancı Yatırım Kanunu'nu yürürlükten kaldırdı (md. 16; Uzmanlar Kurulu). Yabancı yatırımcı artık yatırım yapmadan önce Yatırım Bakanlığı'na (MISA) kayıt oluyor (md. 7). Bazı faaliyetler yabancı yatırımcıya yasak ya da kısıtlı (md. 8). Ticaret Bakanlığı'nın 2026 rehberinde hâlâ \"MISA lisanslı yerel şirket\" ifadesi geçiyor; güncel terim \"kayıt\".",
      "**%100 yabancı sermayeli ticaret şirketi sermaye yoğun.** MISA'ya göre %100 yabancı ticari faaliyet için asgari sermaye 30.000.000 riyal ve en az üç bölgesel ya da küresel pazarda varlık şartı var. Buna ek olarak beş yılda en az 300 milyon riyal (30 milyon riyallik sermaye dahil) ya da 200 milyon riyal artı yerel üretim, Ar-Ge veya lojistik şartları düzeyinde yatırım isteniyor. Suudi ortağın en az %25 pay aldığı ticari faaliyette asgari sermaye 26.666.667 riyal (MISA, Yatırımcı Rehberi, 13. baskı, Şubat 2026). MISA, ayrıntılı beş yıllık iş planı sunan başvurularda bu tutarlarda esneklik sinyali veriyor (Deloitte, Mayıs 2026); bu rakamları nihai değil, başlangıç pozisyonu olarak okuyun. Ticaret Bakanlığı da aynı 30 milyon riyallik eşiği distribütör tavsiyesinin gerekçesi olarak gösteriyor (Ticaret Bakanlığı, 2026).",
      "**Vergi.** Suudi bir şirketin Suudi ve KİK vatandaşı olmayan ortaklara düşen kârı %20 gelir vergisine tabi; Suudi ve KİK ortaklarına düşen pay ise zekât matrahı üzerinden %2,5 zekât öder. KDV %15 (ZATCA). Karma ortaklıkta ikisi birlikte uygulanır."
     ]
    },
    {
     "t": "p",
     "text": "**Bölgesel merkez (RHQ).** 1 Ocak 2024'ten bu yana Suudi kamu kurumları, Orta Doğu ve Kuzey Afrika bölgesel merkezini Krallık dışında tutan ve MISA'nın listesinde yer alan yabancı şirketlerle ancak kısıtlı koşullarda sözleşme yapabiliyor. Kısıtlama bu şirketlerin ürün ve hizmetleri için çalışan acente, distribütör ve tedarikçilerini de kapsıyor (Bakanlar Kurulu'nun 1445H tarihli 461 sayılı Kararı, md. 1, 3 ve 5). Tahmini bedeli 1 milyon riyal veya altındaki işler ile Suudi Arabistan dışında yürütülen işler kapsam dışı (md. 4). Açık ihalelerde listedeki şirketin teklifi ancak teknik olarak kabul edilebilir tek teklifse ya da teknik açıdan en iyi teklif olup ikinci en iyi tekliften en az %25 ucuzsa kabul edilebiliyor (md. 6). Kamu kurumları belirli bir proje ya da süre için istisna komitesine de başvurabiliyor (md. 9–10)."
    },
    {
     "t": "p",
     "text": "RHQ için Suudi Arabistan'da ayrı bir tüzel kişilik (şirket ya da kayıtlı şube), grubun Suudi Arabistan ve ana merkez ülkesi dışında en az iki ülkede varlığı, bir yıl içinde en az 15 tam zamanlı çalışan ve RHQ faaliyetleri dışında gelir getiren ticari faaliyet yürütmeme şartları aranıyor (MISA, Şartlar ve Koşullar; Yatırımcı Rehberi, 13. baskı). Karşılığında uygun faaliyetlerden elde edilen uygun gelirde %0 gelir vergisi ve yurt dışı mukimlere yapılan belirli ödemelerde %0 stopaj, 30 yıl süreyle ve yenilenebilir şekilde uygulanıyor (ZATCA, RHQ rehberi, 2. sürüm, Mayıs 2026). Türk şirketlerinin çoğu için RHQ bir giriş adımı değil. Ancak bir tuzağa dikkat: Bölgesel merkezinizi Dubai'de kurar ve listeye girerseniz, Suudi distribütörünüzün ürünlerinizi kamu alıcılarına satışı da kısıtlamaya takılabilir."
    },
    {
     "t": "h2",
     "text": "\"BAE'yi test üssü yapmak bana iki pazarda da kaybettirir mi?\""
    },
    {
     "t": "p",
     "text": "Şüpheci bir CEO bunu açıkça soracaktır: Dubai'deki bir üs, 1 milyon riyalin üzerindeki kamu sözleşmelerinde hem beni hem Suudi distribütörümü kısıtlayabilir; DMCC şirketi de ana karadaki satışlarımda %0'dan yararlanamayabilir. Dürüst cevap: Kaybettirebilir, ama yalnızca önceden test edebileceğiniz belirli koşullarda."
    },
    {
     "t": "p",
     "text": "**Suudi Arabistan'da kaybettirir:** Hedef alıcılarınız 1 milyon riyalin üzerindeki sözleşmelerde Suudi kamu kurumlarıysa, BAE şirketiniz MENA bölgesel merkeziniz işlevini görüyorsa ve şirketiniz MISA'nın listesindeyse. Kural özel alıcıları değil, kamu kurumlarını (bakanlıklar, kamu kuruluşları ve devletin kurduğu kâr amacı gütmeyen kuruluşlar) bağlıyor. Devlete ait şirketlere ya da dev proje geliştiricilerine satıyorsanız benzer tedarikçi kuralları uygulayıp uygulamadıklarını sorun."
    },
    {
     "t": "p",
     "text": "**BAE'de kaybettirir:** Serbest bölge şirketinizin gelirinin %5'inden fazlası ya da 5 milyon dirhemden fazlası nitelikli olmayan kaynaklardan, örneğin nitelikli olmayan bir bölgeden ya da faaliyetten ana karadaki müşterilere yapılan mal satışlarından geliyorsa. Bu sınır aşılırsa şirket o yıl ve izleyen dört yıl için %0 rejimini kaybeder ve standart kurallarla (375.000 dirhemin üzerinde %9) vergilendirilir. Ana kara satışlarının çoğunda %5 KDV yine de uygulanır."
    },
    {
     "t": "p",
     "text": "**Nasıl yapılandırılır:**"
    },
    {
     "t": "ul",
     "items": [
      "Suudi kamu alıcıları ana işinizse, bir BAE şirketini bölgesel merkeziniz yapmadan önce RHQ kuralını test edin. Bir BAE satış ofisinin bölgesel merkez sayılıp sayılmadığı hukuki danışmanlık konusu; MISA'nın listesi üç ayda bir güncellenip kamu kurumlarına dağıtılıyor (md. 5); listede olup olmadığınızı Suudi alıcınıza ya da hukuk danışmanınıza sorun. Alternatifler Suudi RHQ, yukarıdaki dar koşullarla teklif vermek (kabul edilebilir tek teklif ya da en az %25 ucuz en iyi teknik teklif) ya da kamu alıcısından istisna başvurusu yapmasını istemek (md. 9–10).",
      "BAE ana karasına mal satışında belirlenmiş bölgeden dağıtım modelini, ana kara şirketini ya da BAE'li bir distribütörü karşılaştırın.",
      "İki pazarın kuralları da uymuyorsa BAE üssünü atlayın ve doğrudan Suudi distribütörle başlayın."
     ]
    },
    {
     "t": "h2",
     "text": "Yerel ortak: hukuki zorunluluk değil, stratejik tercih"
    },
    {
     "t": "p",
     "text": "BAE'de yerel hissedar, stratejik etkisi olan faaliyetler dışında genellikle tercih. Suudi Arabistan'da ortak çoğu zaman pratik yol: Kanun her durumda istemiyor, ama %100 yabancı ticaret eşikleri yüksek ve alıcılar yerel bir muhatap bekliyor."
    },
    {
     "t": "p",
     "text": "Ortağı getirdiği şey için seçin: kendi başınıza ulaşamayacağınız alıcılara erişim, uygulama (depolama, satış sonrası hizmet, yedek parça; Ticaret Bakanlığı'na göre Suudi alıcılar fiziksel varlığı, sorun çıktığında muhatap bulunacağının işareti olarak görüyor) ve mevzuat işleri."
    },
    {
     "t": "p",
     "text": "Kendinizi baştan koruyun. Markanızı Suudi Arabistan'da Türkiye'deki şirketiniz adına, Suudi Arabistan'da lisanslı bir marka vekili aracılığıyla, tasdikli vekâletnameyle tescil ettirin. Ön izin gerektiren ürünlerde (gıda, ilaç, tıbbi cihaz) izinleri kendi adınıza alın; böylece distribütör değiştirdiğinizde kayıtlarınız yarı yolda kalmaz (Ticaret Bakanlığı, 2026)."
    },
    {
     "t": "h2",
     "text": "İlişkiye dayalı ve kamu kaynaklı satın alma"
    },
    {
     "t": "p",
     "text": "Suudi alıcılar yüz yüze tanıdıkları ya da güvendikleri biri aracılığıyla tanıştıkları kişilerle iş yapmayı tercih ediyor; bu yüzden en önemli giriş faaliyeti fuar katılımı ve fuarlar e-postadan genellikle daha verimli (Ticaret Bakanlığı, 2026)."
    },
    {
     "t": "p",
     "text": "Kamu ihaleleri Etimad platformunda duyuruluyor. Yerli katkı en çok Aramco'da ve savunmada belirleyici. Aramco'nun iktva programı 2026 başında tedarikinde %70 yerli katkıya ulaştı ve 2030 için %75 hedefliyor (Aramco, Şubat 2026); savunmada ulusal hedef, 2030'a kadar askerî harcamaların %50'sinden fazlasını yerelleştirmek; 2025 sonunda oran %27,3'tü (GAMI). Bunlar her ihale için sabit bir kural değil, program düzeyinde rakamlar; her ihalenin yerli katkı şartlarını ayrıca kontrol edin."
    },
    {
     "t": "h2",
     "text": "Ürün uygunluğu ve evrak işleri: erkenden"
    },
    {
     "t": "ul",
     "items": [
      "**SABER** (SASO'nun platformu): Teknik düzenlemeye tabi ürünler için kayıt zorunlu; kayıt ithalatçının ya da yerel satıcının yükümlülüğü (Ticaret Bakanlığı, 2026; saber.sa).",
      "**SFDA:** Gıda, ilaç, kozmetik ve tıbbi cihazlardan sorumlu. Helal sertifikaları SFDA'nın tanıdığı kuruluşlardan alınmalı; SMIIC standartlarına göre düzenlenen helal sertifikaları kabul edilmiyor (Ticaret Bakanlığı, 2026).",
      "**Belge tasdiki:** MISA kaydı için yabancı şirketin ticaret sicil kaydı ve son yıl mali tabloları Suudi büyükelçiliği tasdikli olarak isteniyor (MISA, Yatırımcı Rehberi, 13. baskı).",
      "**Arapça etiket:** Ürününüze ilişkin SASO ya da SFDA teknik düzenlemesini kontrol edin; etiket kuralları ürüne göre değişiyor."
     ]
    },
    {
     "t": "h2",
     "text": "Kademeli taahhüt merdiveni ve devam/dur kapıları"
    },
    {
     "t": "table",
     "head": [
      "Aşama",
      "Taahhüt",
      "Bir sonraki aşamaya geçmeden önce aşılması gereken kapı"
     ],
     "rows": [
      [
       "0. Masa başı test",
       "Ürün bazında uygunluk haritası; hedef alıcı listesi",
       "Ürün kaydedilebiliyor; faaliyet yasak listede değil"
      ],
      [
       "1. Talep kanıtı",
       "Fuar ziyareti; numune; distribütör üzerinden ilk siparişler",
       "Hedef marjda tekrar eden sipariş"
      ],
      [
       "2. Ortak kanıtı",
       "Performans hedefli distribütörlük sözleşmesi; marka ve izinler kendi adınıza",
       "Ortak iki-üç çeyrek hedefleri tutturuyor"
      ],
      [
       "3. Hafif varlık",
       "Bölgesel satış ve hizmet için BAE serbest bölge ya da ana kara şirketi",
       "Bölgesel gelir sabit maliyeti karşılıyor; RHQ ve serbest bölge testleri geçildi"
      ],
      [
       "4. Suudi varlığı",
       "MISA kaydı; tek başına ya da ortakla Suudi şirketi",
       "Suudi geliri, yerli katkı ya da kamu alıcısı bunu gerektiriyor"
      ],
      [
       "5. RHQ",
       "Yalnızca kamu sözleşmeleri ana işse",
       "1 milyon riyalin üzerindeki kamu sözleşmeleri ana iş ve iş planı RHQ'nun gerçek faaliyet şartlarını (15 çalışan, 3 üst düzey yönetici) karşılıyor"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Bu, [pazara giriş bir taahhütler dizisidir](/tr/icgoruler/pazara-giris-taahhutler-dizisidir) yaklaşımımızın mantığı ve [pazara giriş](/tr/uzmanlik/pazara-giris) çalışmalarımızın özü. Giriş modelleri için: [pazara giriş modeli](/tr/icgoruler/pazara-giris-modeli). İki yönlü sermaye akışının Körfezli ortaklarla görüşmeleri nasıl değiştirdiğini [Türkiye–Körfez sermaye koridoru](/tr/icgoruler/turkiye-korfez-sermaye-koridoru) yazımızda ele aldık."
    },
    {
     "t": "h2",
     "text": "Sıkça sorulan sorular"
    },
    {
     "t": "faq",
     "items": [
      [
       "Satış yapmak için yerel şirket kurmam gerekir mi?",
       "Hayır. İthalatçı ya da distribütör üzerinden satabilirsiniz. Şirket; ithalat yapmanız, stok tutmanız, yerel fatura kesmeniz ya da yerel varlık isteyen kamu ihalelerine girmeniz gerektiğinde zorunlu hâle geliyor."
      ],
      [
       "BAE'deki %9 kurumlar vergisi serbest bölge şirketi için ne anlama geliyor?",
       "Nitelikli Serbest Bölge Kişisi nitelikli gelirinde %0, diğer vergilendirilebilir gelirinde ise 375.000 dirhemlik %0 dilimi olmadan %9 öder. Nitelikli olmayan gelir toplam gelirin %5'ini ya da 5 milyon dirhemi (hangisi düşükse) aşarsa %0 rejimi beş vergi dönemi için kaybedilir. Şirketlerin çoğu bu kurala ana kara satışlarında takılır; bölge seçmeden önce bunları bir vergi danışmanıyla modelleyin. Genel bilgidir, vergi danışmanlığı değildir; kurallar değişebilir ve somut duruma göre farklılaşır."
      ]
     ]
    },
    {
     "t": "h2",
     "text": "Sonraki adım"
    },
    {
     "t": "p",
     "text": "Körfez senaryonuzu bu kapılarla [Pazara Giriş Pusulası](/tr/karar-laboratuvari/pazara-giris-pusulasi) ile test edin. Diğer araçlar [Karar Laboratuvarı](/tr/karar-laboratuvari)'nda, hizmetlerimiz [Çözümler](/tr/cozumler) sayfasında."
    },
    {
     "t": "p",
     "text": "*Bilgiler 9 Kasım 2026 itibarıyla. Kurallar faaliyete ve emirliğe göre değişir; bu yazı hukuki ya da vergisel danışmanlık değildir.*"
    }
   ]
  }
 },
 {
  "key": "guideCraReporting",
  "solution": "solutionCra",
  "date": "2026-11-05",
  "dateModified": "2026-11-07",
  "checked": {
   "en": "7 November 2026",
   "tr": "7 Kasım 2026"
  },
  "image": "guideCraReporting",
  "readingTime": {
   "en": "9 min",
   "tr": "9 dk"
  },
  "topic": {
   "en": "CRA",
   "tr": "CRA"
  },
  "en": {
   "path": "insights/cra-reporting-white-goods-refrigeration",
   "title": "CRA Reporting for Refrigeration and White-Goods Exporters",
   "description": "ENISA and the Commission’s 4 Nov 2026 joint statement on refrigeration cyber incidents: CRA Art. 14 reporting since 11 Sep. What Turkish exporters must do.",
   "h1": "CRA Reporting for Refrigeration and White-Goods Exporters",
   "blocks": [
    {
     "t": "p",
     "text": "*Source check: 7 November 2026 (Europe/Istanbul). General information, not a product-specific legal opinion.*"
    },
    {
     "t": "p",
     "text": "A refrigeration incident is not automatically a reporting duty for every refrigerator manufacturer. But manufacturers of in-scope products with digital elements cannot wait for the CRA’s main requirements in December 2027 before preparing to report. **Article 14 reporting has applied since 11 September 2026.** The first questions are whether your product is in scope, whether a reportable event affects its security, and when you became aware. [CRA, Arts. 2, 14, 69 and 71; adopted 23 October 2024](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "h2",
     "text": "What ENISA actually confirmed"
    },
    {
     "t": "p",
     "text": "The [ENISA–Commission joint statement of 4 November 2026](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu) reports cybersecurity incidents affecting commercial refrigeration systems and similar devices in several EU Member States since 11 October, with another wave on 1–2 November. It advises organisations to mitigate exposure in affected systems and points them to national CSIRT advisories."
    },
    {
     "t": "p",
     "text": "That statement is verified, but it is not a product recall or a list of affected brands. It identifies no manufacturer, country of origin or attack method. It does not establish that Turkish white-goods manufacturers or household refrigerators were targeted. “White goods” is this article’s audience framing, not an incident attribution. The statement recalls existing CRA and NIS2 obligations; it does not create a new reporting deadline. [ENISA, 4 November 2026](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu)"
    },
    {
     "t": "h2",
     "text": "Which refrigeration products are in scope?"
    },
    {
     "t": "p",
     "text": "**Law.** Article 2(1) covers products with digital elements made available on the EU market whose intended purpose or reasonably foreseeable use includes a direct or indirect logical or physical data connection to a device or network. The definition includes hardware, software, separately marketed components and qualifying remote data processing. The manufacturer is the entity that develops or has the product developed or manufactured and markets it under its own name or trademark. Being based in Türkiye does not, by itself, remove that role. [CRA, Arts. 2(1), 3(1)–(2), 3(13) and 3(22)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "p",
     "text": "**Application to this sector.** A networked commercial cabinet, connected domestic refrigerator or separately marketed controller can meet that test. These are examples derived from the legal criteria, not a statutory list. Wi-Fi is not the only relevant connection: check service interfaces and indirect connections too. Conversely, a purely mechanical appliance with no qualifying digital product or data connection is not brought into scope simply because it provides refrigeration. A product’s cloud function belongs in the assessment where the manufacturer designs it or is responsible for it and its absence would prevent a product function. [CRA, Arts. 2(1) and 3(1)–(2), recitals 9–12](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "p",
     "text": "**Exclusions need their own check.** Article 2 excludes products covered by the medical-device and in-vitro diagnostic-device regulations, products covered by Regulation (EU) 2019/2144, aviation products certified under Regulation (EU) 2018/1139, and marine equipment within Directive 2014/90/EU. It also excludes same-specification spare parts replacing identical components, exclusively national-security/defence products and products specifically designed for classified information. Delegated Regulation (EU) 2025/1535 additionally excludes products within Regulation (EU) No 168/2013, except the specified L1e vehicles designed to pedal. These are not blanket exemptions for every vehicle-related component or every spare part. [CRA, Art. 2](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [Delegated Regulation, adopted 29 July 2025, Art. 1](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R1535)"
    },
    {
     "t": "p",
     "text": "Non-commercial free and open-source software is not treated as a market supply merely because its code is available. That does not exempt a commercial appliance incorporating open-source components. Open-source software stewards have a separate regime; their Article 24(3) reporting duties start on 11 December 2027, not September 2026. [CRA, Art. 3(22), recitals 18–19, Arts. 24 and 71](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [Commission guidance, 27 July 2026, Section 3](https://ec.europa.eu/newsroom/dae/redirection/document/131456)"
    },
    {
     "t": "h2",
     "text": "Reporting applies to legacy products too"
    },
    {
     "t": "p",
     "text": "Article 71(2) sets 11 December 2027 as the general application date, with Article 14 applying from 11 September 2026 and Chapter IV on notified bodies from 11 June 2026. Article 69(3) expressly brings earlier in-scope products into Article 14 reporting. For other requirements, Article 69(2) provides that pre-11 December 2027 products become subject where substantially modified from that date. Do not turn the reporting exception into a claim that all legacy products already require CRA conformity assessment. [CRA, Arts. 69 and 71](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "p",
     "text": "**Non-binding guidance.** Paragraph 210 of the Commission’s 27 July 2026 guidance says reporting continues after the support period ends. Paragraph 217 distinguishes an old vulnerability from prior awareness of its active exploitation: active exploitation already known before 11 September 2026 need not be reported retrospectively; awareness arising after that date can trigger reporting even if the vulnerability itself was already known. [Commission guidance, Section 9.1](https://ec.europa.eu/newsroom/dae/redirection/document/131456)"
    },
    {
     "t": "h2",
     "text": "Two reporting tracks, not one generic incident form"
    },
    {
     "t": "p",
     "text": "An **actively exploited vulnerability** requires reliable evidence of exploitation by a malicious actor in a system without its owner’s permission. Mere technical exploitability or a good-faith test is not the same thing. A **severe incident** is assessed separately: Article 14(5) covers actual or potential adverse effects on protection of sensitive or important data/functions, or actual or potential introduction or execution of malicious code in the product or a user’s network and information systems. [CRA, Art. 3(42), Art. 14(5), recital 68](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "table",
     "head": [
      "Stage",
      "Actively exploited vulnerability: Art. 14(2)",
      "Severe incident: Art. 14(4)"
     ],
     "rows": [
      [
       "Early warning",
       "Without undue delay, within 24 hours of awareness; affected Member States where applicable",
       "Same clock; also state whether unlawful or malicious acts are suspected"
      ],
      [
       "Notification",
       "Without undue delay, within 72 hours of awareness; product, exploit/vulnerability and available corrective or mitigating measures",
       "Same clock; incident nature, initial assessment and available corrective or mitigating measures"
      ],
      [
       "Final report",
       "No later than 14 days after a corrective or mitigating measure becomes available",
       "Within one month after submission of the incident notification"
      ]
     ]
    },
    {
     "t": "p",
     "text": "The 72-hour and final stages apply unless the relevant information has already been provided. Final vulnerability reports cover severity/impact, available malicious-actor information and the fix; final incident reports cover severity/impact, likely threat or root cause, and applied/ongoing mitigation. A coordinator CSIRT may request an intermediate update under Article 14(6). **The 72 hours run from awareness, not 72 hours after the early warning.** [CRA, Art. 14(2), (4) and (6)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "p",
     "text": "**Guidance, not an extra waiting period.** The Commission describes awareness as reasonable certainty after an immediate initial assessment. It calls for prompt investigation and progressively updated reports, not waiting for a complete forensic investigation. Record the awareness time and the evidence behind it. [Commission guidance, paragraphs 213–215](https://ec.europa.eu/newsroom/dae/redirection/document/131456)"
    },
    {
     "t": "p",
     "text": "ENISA’s FAQ also warns that the current SRP 72-hour counter uses 48 hours after early-warning submission and can show an earlier due time. Platform reminders do not replace the legal clock. [ENISA FAQ, displayed update 15 October 2026, Q26](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions)"
    },
    {
     "t": "h2",
     "text": "A third-party component needs product-level analysis"
    },
    {
     "t": "p",
     "text": "A component vulnerability that is technically exploitable is not automatically an actively exploited vulnerability in your product. The Commission’s non-binding paragraph 218 says manufacturers report actively exploited vulnerabilities contained in their own product. It then explains that if the component vulnerability cannot be exploited in that product, **or has not been exploited in that product**, it is not subject to mandatory reporting for that manufacturer on that basis. Component presence or an external advisory alone does not settle the question; document the product-specific evidence and assess the separate severe-incident test. [Commission guidance, paragraph 218](https://ec.europa.eu/newsroom/dae/redirection/document/131456); [CRA, Art. 14](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "p",
     "text": "Article 15 provides for voluntary reporting in the Regulation. **It is not a live voluntary SRP route:** ENISA’s FAQ, Q4 and Q27, says that functionality remains for a future phase. Do not submit a non-reportable vulnerability as a mandatory report just to use the platform. This does not remove any separately applicable vulnerability-handling duties; those have their own dates and transitional rules. [CRA, Arts. 13, 15, 69 and 71](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [ENISA FAQ, 15 October 2026](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions)"
    },
    {
     "t": "h2",
     "text": "Where a Turkish manufacturer reports"
    },
    {
     "t": "p",
     "text": "Use the SRP and the coordinator CSIRT determined under Article 14(7). The EU main establishment is where product-cybersecurity decisions are predominantly taken; if it cannot be determined, use the EU establishment with the most employees. Without an EU main establishment, apply this order using available information:"
    },
    {
     "t": "ol",
     "items": [
      "Member State of the authorised representative acting for the highest number of the manufacturer’s products;",
      "failing that, the importer placing the highest number on the market;",
      "failing that, the distributor making the highest number available;",
      "failing that, the Member State with the highest number of users."
     ]
    },
    {
     "t": "p",
     "text": "This is not a free choice of the most convenient authority. Notifications are normally simultaneously accessible to ENISA; Article 16(2) provides a narrow exception for full details of a 72-hour vulnerability notification in particularly exceptional circumstances. Dissemination restrictions are not permission to postpone the manufacturer’s reporting. [CRA, Arts. 14(7) and 16(2)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [Delegated Regulation (EU) 2026/881, adopted 11 December 2025, recital 2 and Arts. 1, 3–5](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026R0881)"
    },
    {
     "t": "p",
     "text": "**Operational guidance.** ENISA advises registering on the SRP and initiating CSIRT validation only when a notification is needed. Prepare personal MFA-enabled EU Login accounts beforehand. Validation runs in parallel and does not prevent submission while pending. The platform’s **Assigned Representative** is a user role, not the CRA’s **authorised representative**, which is an EU-established person with a written manufacturer mandate. [ENISA FAQ, 15 October 2026, Q9](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions); [CRA, Art. 3(15)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "h2",
     "text": "What to prepare before the next alert"
    },
    {
     "t": "p",
     "text": "**Our operational recommendation, not additional law:** maintain one product/security record containing the scope rationale, versions and components, awareness evidence, reporting track, coordinator-CSIRT rationale, responsible person and deputy, and separate deadline calculations. Rehearse both the vulnerability and severe-incident tracks."
    },
    {
     "t": "p",
     "text": "Prepare user notices as well as authority reports. Article 14(8) requires informing impacted users and, where appropriate, all users, including necessary mitigation/corrective measures. The Commission’s guidance calls for proportionate, risk-based disclosure; this is not an instruction to publish sensitive exploit details indiscriminately. [CRA, Art. 14(8)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [Commission guidance, paragraphs 219–221](https://ec.europa.eu/newsroom/dae/redirection/document/131456)"
    },
    {
     "t": "p",
     "text": "Assess NIS2 separately where the organisation falls under that Directive; the joint statement does not make every refrigerator maker a NIS2 entity or say an SRP report replaces all other reporting. [ENISA, 4 November 2026](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu) For readiness support, see [CRA incident readiness](/en/solutions/cra-incident-readiness) and the [CRA readiness check](/en/decision-lab/cra-readiness-check). Conformity and standards are a separate workstream: [CRA compliance without harmonised standards](/en/insights/cra-compliance-without-harmonised-standards)."
    },
    {
     "t": "h2",
     "text": "FAQ"
    },
    {
     "t": "faq",
     "items": [
      [
       "When did CRA reporting start?",
       "On 11 September 2026, under Article 71(2), second sentence, and Article 69(3) of Regulation (EU) 2024/2847. The ENISA–Commission joint statement of 4 November 2026 recalls the same date."
      ],
      [
       "How long do I have for the early warning?",
       "Without undue delay and in any event within 24 hours of becoming aware of an actively exploited vulnerability or a severe incident (Art. 14(2)(a) and 14(4)(a))."
      ],
      [
       "Is the final-report deadline the same for vulnerabilities and severe incidents?",
       "No. For actively exploited vulnerabilities it is no later than 14 days after a corrective or mitigating measure is available; for severe incidents it is within one month after the incident notification is submitted (Art. 14(2)(c) and 14(4)(c))."
      ],
      [
       "Where does a Turkey-based manufacturer notify?",
       "If there is no main establishment in the Union, follow Article 14(7): the coordinator CSIRT of the Member State of the authorised representative, importer, distributor or largest user base, in that order, via the SRP with simultaneous access for ENISA."
      ],
      [
       "Does the joint statement single out Turkish white-goods makers?",
       "No. It describes incidents in commercial refrigeration systems and similar devices and names no manufacturers, brands or countries of origin. The Article 14 reminder is addressed to manufacturers of products with digital elements on the EU market generally."
      ],
      [
       "Are the main CRA cybersecurity requirements already mandatory?",
       "No. Per the statement and Article 71(2), those apply from 11 December 2027. What is live now is Article 14 (and, since 11 June 2026, Chapter IV on notified bodies)."
      ]
     ]
    },
    {
     "t": "h2",
     "text": "Primary sources and dates"
    },
    {
     "t": "ul",
     "items": [
      "[Regulation (EU) 2024/2847](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847): adopted 23 October 2024; Official Journal publication 20 November 2024. Articles cited above are law. [EUR-Lex document status and corrections](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32024R2847) were also checked.",
      "[ENISA–Commission joint statement](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu): published 4 November 2026. Evidence of reported incidents, not company attribution.",
      "[Commission CRA reporting page](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting): no publication/update date displayed in the retrieved text; operational summary, checked 7 November 2026.",
      "[Commission guidance library page](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-new-guidance-support-timely-cyber-resilience-act-implementation) and [C(2026) 5252 annex](https://ec.europa.eu/newsroom/dae/redirection/document/131456): published 27 July 2026; non-binding guidance, especially Section 9.1.",
      "[ENISA SRP FAQ](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions): displays “Updated: 15 October 2026”; Q4/Q27 voluntary route, Q9 registration, Q26 counters. [SRP overview](https://www.enisa.europa.eu/cra-srp) separately notes a 4 November 2026 v1.3 upgrade and ongoing documentation updates; re-check instructions when reporting.",
      "[Delegated Regulation (EU) 2025/1535](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R1535): adopted 29 July 2025; OJ 29 October 2025. [Delegated Regulation (EU) 2026/881](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026R0881): adopted 11 December 2025; OJ 20 April 2026."
     ]
    },
    {
     "t": "p",
     "text": "All sources accessed 7 November 2026 (Europe/Istanbul). Access dates are not publication dates. Incident investigations, attribution and individual product exposure were not independently established here."
    }
   ]
  },
  "tr": {
   "path": "icgoruler/cra-bildirim-beyaz-esya-sogutma",
   "title": "CRA Bildirimi: Beyaz Eşya ve Soğutma İhracatçısı",
   "description": "ENISA ve Komisyon’un 4 Kasım 2026 ortak açıklaması: ticari soğutma siber olayları ve CRA Madde 14 bildirimi. Beyaz eşya ve soğutma ihracatçısı için özet.",
   "h1": "CRA Bildirimi: Beyaz Eşya ve Soğutma İhracatçısı",
   "blocks": [
    {
     "t": "p",
     "text": "*Kaynak kontrolü: 7 Kasım 2026 (Europe/Istanbul). Genel bilgilendirmedir; ürüne özgü hukuki görüş değildir.*"
    },
    {
     "t": "p",
     "text": "Soğutma sistemlerinde yaşanan bir siber olay, her buzdolabı üreticisine otomatik bildirim yükümlülüğü doğurmaz. Ancak CRA kapsamındaki dijital unsurlu ürünlerin üreticileri de hazırlığı Aralık 2027’ye bırakamaz: **Madde 14 bildirim yükümlülükleri 11 Eylül 2026’dan beri uygulanıyor.** Önce ürünün kapsamını, ardından bildirilecek olayın niteliğini ve ne zaman farkına varıldığını belirlemek gerekiyor. [(AB) 2024/2847, Madde 2, 14, 69 ve 71; kabul tarihi 23 Ekim 2024](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "h2",
     "text": "ENISA açıklamasında doğrulanan ne?"
    },
    {
     "t": "p",
     "text": "[ENISA ile Avrupa Komisyonu’nun 4 Kasım 2026 tarihli ortak açıklaması](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu), birkaç AB üye devletinde ticari soğutma sistemlerini ve benzer cihazları etkileyen siber olayların 11 Ekim’den beri yaşandığını, 1–2 Kasım’da yeni bir dalga görüldüğünü bildiriyor. Kuruluşlara etkilenen sistemlerde riski azaltma çağrısı yapıyor ve ulusal CSIRT duyurularına yönlendiriyor."
    },
    {
     "t": "p",
     "text": "Açıklama doğrulandı; ancak bir geri çağırma duyurusu veya etkilenen marka listesi değil. Üretici, menşe ülke ya da saldırı yöntemi vermiyor. Türk beyaz eşya üreticilerinin veya ev tipi buzdolaplarının hedef alındığını ortaya koymuyor. Bu yazıdaki “beyaz eşya” ifadesi hedef okuru tanımlıyor; olayın hangi ürünleri etkilediğine ilişkin bir iddia değil. Açıklama mevcut CRA ve NIS2 yükümlülüklerini hatırlatıyor; yeni bir bildirim tarihi getirmiyor. [ENISA, 4 Kasım 2026](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu)"
    },
    {
     "t": "h2",
     "text": "Hangi soğutma ürünleri kapsama girer?"
    },
    {
     "t": "p",
     "text": "**Tüzük ne diyor?** Madde 2(1), AB pazarında bulundurulan; amaçlanan veya makul ölçüde öngörülebilir kullanımı bir cihaza ya da ağa doğrudan veya dolaylı, mantıksal veya fiziksel veri bağlantısını içeren dijital unsurlu ürünleri kapsıyor. Tanım; donanımı, yazılımı, ayrı piyasaya sunulan bileşenleri ve koşulları karşılayan uzaktan veri işlemeyi içeriyor. Üretici, ürünü geliştiren/üreten veya geliştirilmesini/üretilmesini sağlayan ve kendi adı ya da markasıyla pazarlayan kişi veya kuruluş. Türkiye’de yerleşik olmak bu rolü tek başına ortadan kaldırmıyor. [Madde 2(1), 3(1)–(2), 3(13) ve 3(22)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "p",
     "text": "**Sektöre uygulaması.** Ağa bağlı ticari dolap, bağlantılı ev tipi buzdolabı veya ayrı pazarlanan kontrol ünitesi bu ölçütleri karşılayabilir. Bunlar tüzükte sayılan ürünler değil, hukuki ölçütlerden türetilmiş örnekler. Yalnız Wi-Fi’ye bakmayın; servis arayüzlerini ve dolaylı bağlantıları da inceleyin. Buna karşılık, ilgili dijital unsur ve veri bağlantısı bulunmayan tamamen mekanik bir cihaz, sırf soğutma yaptığı için kapsama girmez. Üreticinin geliştirdiği veya sorumluluğunda geliştirilen bulut işlevi olmadan ürünün bir işlevi çalışamıyorsa, bu işlev de kapsam değerlendirmesine dahildir. [Madde 2(1), 3(1)–(2); gerekçe 9–12](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "p",
     "text": "**İstisnaları ayrıca kontrol edin.** Madde 2; tıbbi cihaz ve in vitro tanı cihazı tüzüklerine tabi ürünleri, (AB) 2019/2144 kapsamındaki ürünleri, (AB) 2018/1139 uyarınca sertifikalandırılmış havacılık ürünlerini ve 2014/90/AB kapsamındaki denizcilik ekipmanını dışarıda bırakıyor. Aynı teknik özelliklerde üretilip özdeş bileşenlerin yerine geçen yedek parçalar; yalnız ulusal güvenlik/savunma için geliştirilen veya değiştirilen ürünler ve gizlilik dereceli bilgiyi işlemek üzere özel tasarlanan ürünler de hariç. (AB) 2025/1535 sayılı Yetki Devrine Dayanan Tüzük ayrıca (AB) 168/2013 kapsamındaki ürünleri, belirtilen pedallı L1e araçlar hariç olmak üzere kapsam dışında tutuyor. Bunlar her araç bağlantılı bileşene veya her yedek parçaya tanınmış genel muafiyetler değil. [CRA Madde 2](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [29 Temmuz 2025’te kabul edilen (AB) 2025/1535, Madde 1](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R1535)"
    },
    {
     "t": "p",
     "text": "Ticari olmayan özgür ve açık kaynak yazılım, kodu erişilebilir olduğu için tek başına piyasada bulundurma sayılmaz. Bu ayrım, açık kaynak bileşen kullanan ticari beyaz eşyayı muaf kılmaz. Açık kaynak yazılım sorumluları için ayrı rejim vardır; Madde 24(3) bildirim yükümlülükleri Eylül 2026’da değil, 11 Aralık 2027’de uygulanmaya başlar. [Madde 3(22), gerekçe 18–19, Madde 24 ve 71](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [Komisyon rehberi, 27 Temmuz 2026, Bölüm 3](https://ec.europa.eu/newsroom/dae/redirection/document/131456)"
    },
    {
     "t": "h2",
     "text": "Eski ürünlerde de bildirim var"
    },
    {
     "t": "p",
     "text": "Madde 71(2) genel uygulama tarihini 11 Aralık 2027 olarak belirliyor; Madde 14 için tarih 11 Eylül 2026, onaylanmış kuruluşlara ilişkin Bölüm IV için ise 11 Haziran 2026. Madde 69(3), daha önce piyasaya arz edilmiş kapsamdaki ürünleri de açıkça Madde 14’e tabi tutuyor. Diğer gereklilikler bakımından Madde 69(2), 11 Aralık 2027’den önce piyasaya arz edilen ürünlerin o tarihten itibaren esaslı değişikliğe uğraması halinde tüzüğe tabi olacağını belirtiyor. Bildirim istisnasını, bütün eski ürünlerde CRA uygunluk değerlendirmesinin şimdiden zorunlu olduğu şeklinde okumayın. [Madde 69 ve 71](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "p",
     "text": "**Bağlayıcı olmayan rehberin açıklaması.** Komisyon’un 27 Temmuz 2026 tarihli rehberinin 210. paragrafına göre bildirim, ürünün destek süresi bittikten sonra da devam ediyor. Paragraf 217 ise eski bir açık ile aktif istismarının önceden bilinmesini ayırıyor: aktif istismarı 11 Eylül 2026’dan önce zaten bilinen açıklar için geriye dönük bildirim istenmiyor. Ancak istismar o tarihten sonra öğrenilirse, açığın kendisi önceden biliniyor olsa da bildirim doğabilir. [Komisyon rehberi, Bölüm 9.1](https://ec.europa.eu/newsroom/dae/redirection/document/131456)"
    },
    {
     "t": "h2",
     "text": "İki ayrı bildirim hattı, iki farklı nihai rapor süresi"
    },
    {
     "t": "p",
     "text": "**Aktif olarak istismar edilen güvenlik açığı**, kötü niyetli bir aktörün sistem sahibinin izni olmadan istismar ettiğine ilişkin güvenilir kanıt bulunan açıktır. Teknik olarak istismar edilebilir olmak veya iyi niyetli güvenlik testi aynı şey değildir. **Ciddi olay** ise ayrı değerlendirilir: Madde 14(5), hassas veya önemli veri/işlevlerin korunmasının fiilen ya da potansiyel olarak olumsuz etkilenmesini veya ürüne ya da kullanıcının ağ ve bilgi sistemlerine zararlı kod sokulmasına/çalıştırılmasına yol açılmasını ya da açılabilmesini kapsar. [Madde 3(42), 14(5); gerekçe 68](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "table",
     "head": [
      "Aşama",
      "Aktif istismar edilen açık: Madde 14(2)",
      "Ciddi olay: Madde 14(4)"
     ],
     "rows": [
      [
       "Erken uyarı",
       "Farkına varıldıktan sonra gereksiz gecikme olmaksızın, en geç 24 saatte; uygun olduğunda ilgili üye devletler",
       "Aynı süre; ayrıca hukuka aykırı veya kötü niyetli eylem şüphesi bulunup bulunmadığı"
      ],
      [
       "Bildirim",
       "Farkına varıldıktan sonra gereksiz gecikme olmaksızın, en geç 72 saatte; ürün, açık/istismar ve mevcut düzeltici veya azaltıcı önlemler",
       "Aynı süre; olayın niteliği, ilk değerlendirme ve mevcut düzeltici veya azaltıcı önlemler"
      ],
      [
       "Nihai rapor",
       "Düzeltici veya azaltıcı önlem kullanılabilir hale geldikten sonra en geç 14 günde",
       "Olay bildiriminin sunulmasından itibaren bir ay içinde"
      ]
     ]
    },
    {
     "t": "p",
     "text": "72 saatlik ve nihai aşamalar, ilgili bilgi daha önce verilmemişse uygulanır. Açığın nihai raporu ciddiyet/etkiyi, varsa kötü niyetli aktör bilgisini ve düzeltmeyi; olayın nihai raporu ciddiyet/etkiyi, muhtemel tehdit veya kök nedeni ve uygulanan/süren azaltıcı önlemleri içerir. Koordinatör CSIRT, Madde 14(6) uyarınca ara rapor isteyebilir. **72 saat erken uyarıdan sonra değil, farkına varma anından itibaren hesaplanır.** [Madde 14(2), (4) ve (6)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "p",
     "text": "**Rehber ek bekleme süresi tanımıyor.** Komisyon, farkına varmayı derhal yapılan ilk değerlendirme sonrasında makul kesinliğe ulaşılmasıyla açıklıyor. Tam adli inceleme bitene kadar beklemeyi değil, hızlı değerlendirmeyi ve bildirimin aşamalı tamamlanmasını öneriyor. Farkına varma zamanını ve dayanağını kaydedin. [Rehber, paragraf 213–215](https://ec.europa.eu/newsroom/dae/redirection/document/131456)"
    },
    {
     "t": "p",
     "text": "ENISA SSS’sine göre mevcut SRP sayacı, 72 saatlik bildirim için erken uyarıdan 48 saat sonrasını esas alıyor; bu nedenle yasal süreden erken bir vade gösterebiliyor. Platform hatırlatıcıları hukuki sürenin yerine geçmiyor. [ENISA SSS, sayfadaki güncelleme 15 Ekim 2026, S26](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions)"
    },
    {
     "t": "h2",
     "text": "Üçüncü taraf bileşende açık varsa"
    },
    {
     "t": "p",
     "text": "Bileşendeki açığın teknik olarak istismar edilebilir olması, ürününüzde aktif olarak istismar edilmiş açık bulunduğu anlamına gelmez. Komisyon’un bağlayıcı olmayan 218. paragrafı, üreticinin kendi ürününde bulunan aktif istismar edilmiş açıkları bildireceğini söylüyor. Bileşendeki açık o üründe istismar edilemiyorsa **veya o üründe istismar edilmemişse**, o üretici için bu gerekçeyle zorunlu bildirim doğmadığını açıklıyor. Yalnız bileşenin üründe bulunması veya dışarıdaki bir duyuru kararı sonuçlandırmaz; ürüne özgü kanıtı kaydedin ve ciddi olay ölçütünü de ayrıca değerlendirin. [Rehber, paragraf 218](https://ec.europa.eu/newsroom/dae/redirection/document/131456); [Madde 14](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "p",
     "text": "Tüzük Madde 15’te gönüllü bildirimi düzenliyor. Ancak **SRP’de çalışan bir gönüllü bildirim kanalı yok:** ENISA SSS S4 ve S27 bu işlevin sonraki aşamada açılacağını belirtiyor. Sırf platformu kullanmak için zorunlu bildirim ölçütlerini karşılamayan bir açığı zorunlu bildirim olarak göndermeyin. Bu ayrım, ayrıca uygulanabilir güvenlik açığı yönetimi yükümlülüklerini kaldırmaz; onların tarihleri ve geçiş kuralları ayrıdır. [Madde 13, 15, 69 ve 71](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [ENISA SSS, 15 Ekim 2026](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions)"
    },
    {
     "t": "h2",
     "text": "Türkiye’deki üretici nereye bildirir?"
    },
    {
     "t": "p",
     "text": "SRP üzerinden, Madde 14(7)’ye göre belirlenen koordinatör CSIRT’e bildirim yapılır. AB’deki ana kuruluş, ürünün siber güvenlik kararlarının ağırlıklı alındığı yerdir; belirlenemiyorsa AB’de en fazla çalışanı bulunan kuruluş esas alınır. AB’de ana kuruluş yoksa, eldeki bilgiye göre şu sırayı uygulayın:"
    },
    {
     "t": "ol",
     "items": [
      "Üreticinin en fazla sayıda ürünü için hareket eden yetkili temsilcinin yerleşik olduğu üye devlet;",
      "bu basamak uygulanamıyorsa, en fazla ürünü piyasaya arz eden ithalatçının bulunduğu üye devlet;",
      "o da uygulanamıyorsa, en fazla ürünü piyasada bulunduran distribütörün bulunduğu üye devlet;",
      "bunlar yoksa, en fazla kullanıcının bulunduğu üye devlet."
     ]
    },
    {
     "t": "p",
     "text": "En kolay makamı seçme serbestisi yok. Bildirim normalde eşzamanlı olarak ENISA’nın erişimine açılır. Madde 16(2), özellikle istisnai koşullarda 72 saatlik güvenlik açığı bildiriminin tüm ayrıntıları için dar bir istisna getiriyor. Bilginin diğer makamlara yayılmasına ilişkin kısıtlar, üreticinin bildirim süresini erteleme izni değildir. [Madde 14(7), 16(2)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [11 Aralık 2025’te kabul edilen (AB) 2026/881, gerekçe 2, Madde 1 ve 3–5](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026R0881)"
    },
    {
     "t": "p",
     "text": "**Platform rehberi.** ENISA, SRP kaydını ve CSIRT doğrulamasını yalnız bildirim gerektiğinde başlatmayı öneriyor. Kişisel, çok faktörlü doğrulamalı EU Login hesapları önceden hazırlanabilir. Doğrulama bildirimle paralel ilerler; sonuçlanmamış olması bildirimi engellemez. SRP’deki **Assigned Representative** bir kullanıcı rolüdür. CRA’daki **yetkili temsilci** ise AB’de yerleşik, üreticiden yazılı yetki almış kişi veya kuruluştur; aynı rol değildir. [ENISA SSS, 15 Ekim 2026, S9](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions); [Madde 3(15)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)"
    },
    {
     "t": "h2",
     "text": "Bir sonraki uyarıdan önce hazırlanacak dosya"
    },
    {
     "t": "p",
     "text": "**Editoryal önerimiz; ek bir hukuki şart değil:** ürünün kapsam gerekçesini, sürüm/bileşen bilgisini, farkına varma kanıtını, bildirim hattını, CSIRT seçim gerekçesini, sorumlu ve yedeğini, ayrı süre hesaplarıyla tek kayıtta tutun. Hem güvenlik açığı hem ciddi olay senaryosunu prova edin."
    },
    {
     "t": "p",
     "text": "Makam bildirimlerinin yanında kullanıcı bilgilendirmesini hazırlayın. Madde 14(8), etkilenen kullanıcıların ve uygun olduğunda tüm kullanıcıların, gerekli risk azaltıcı/düzeltici önlemler dahil bilgilendirilmesini istiyor. Rehber risk temelli ve orantılı açıklama yapılmasını öneriyor; hassas istismar ayrıntılarının gelişigüzel yayımlanmasını değil. [Madde 14(8)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [Rehber, paragraf 219–221](https://ec.europa.eu/newsroom/dae/redirection/document/131456)"
    },
    {
     "t": "p",
     "text": "Kuruluş Direktif kapsamına giriyorsa NIS2’yi ayrıca değerlendirin. Ortak açıklama her buzdolabı üreticisini NIS2 kuruluşu yapmıyor; SRP bildiriminin diğer bütün bildirimlerin yerine geçtiğini de söylemiyor. [ENISA, 4 Kasım 2026](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu) Hazırlık için [CRA olay hazırlığı](/tr/cozumler/cra-olay-hazirligi) ve [CRA hazırlık testi](/tr/karar-laboratuvari/cra-hazirlik-testi) sayfalarına bakabilirsiniz. Uygunluk ve standartlar ayrı iş akışıdır: [CRA uyumu: standart yokken](/tr/icgoruler/cra-uyumu-standart-yokken-turk-uretici)."
    },
    {
     "t": "h2",
     "text": "Sıkça sorulan sorular"
    },
    {
     "t": "faq",
     "items": [
      [
       "CRA bildirim yükümlülüğü ne zaman başladı?",
       "11 Eylül 2026’da. Dayanak: (AB) 2024/2847 Madde 71(2) ikinci cümle ve Madde 69(3); ENISA–Komisyon ortak açıklaması (4 Kasım 2026) aynı tarihi hatırlatıyor."
      ],
      [
       "Erken uyarı süresi ne kadar?",
       "Aktif istismar veya ciddi olay farkına varıldıktan sonra gecikmeksizin ve her hâlükârda 24 saat (Madde 14(2)(a) ve 14(4)(a))."
      ],
      [
       "Nihai rapor süresi güvenlik açığı ile ciddi olayda aynı mı?",
       "Hayır. Aktif istismarda düzeltici/azaltıcı önlem çıktıktan sonra en geç 14 gün; ciddi olayda olay bildiriminin sunulmasından itibaren bir ay (Madde 14(2)(c) ve 14(4)(c))."
      ],
      [
       "Türkiye’de kurulu bir üretici nereye bildirir?",
       "Birlik’te ana kuruluş yoksa Madde 14(7)’deki sıraya göre: yetkili temsilci, ithalatçı, distribütör veya kullanıcı sayısının en yüksek olduğu üye devletin koordinatör CSIRT’i; bildirim SRP üzerinden ENISA’ya da eşzamanlı açılır."
      ],
      [
       "Ortak açıklama Türk beyaz eşya üreticilerini hedef alıyor mu?",
       "Hayır. Açıklama ticari soğutma sistemleri ve benzer cihazlardaki olayları anlatıyor; üretici, marka veya menşe ülke saymıyor. Madde 14 hatırlatması, AB pazarındaki dijital unsurlu ürün üreticilerinin tümüne yönelik."
      ],
      [
       "Ana CRA gereklilikleri de şimdiden mi zorunlu?",
       "Hayır. Ortak açıklama ve Madde 71(2)’ye göre ana siber güvenlik gereklilikleri 11 Aralık 2027’de uygulanır; bugün yürürlükte olan kısım Madde 14 (ve 11 Haziran 2026’dan beri onaylanmış kuruluşlara ilişkin Bölüm IV)."
      ]
     ]
    },
    {
     "t": "h2",
     "text": "Birincil kaynaklar ve tarihler"
    },
    {
     "t": "ul",
     "items": [
      "[(AB) 2024/2847 sayılı Tüzük](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847): kabul 23 Ekim 2024; AB Resmî Gazetesi yayımı 20 Kasım 2024. Yukarıdaki madde atıfları bağlayıcı metne aittir. [EUR-Lex durum ve düzeltme kayıtları](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32024R2847) da kontrol edildi.",
      "[ENISA–Komisyon ortak açıklaması](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu): yayım 4 Kasım 2026. Bildirilen olayları doğrular; şirketlere ilişkin isnat kaynağı değildir.",
      "[Komisyon CRA bildirim sayfası](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting): alınan metinde yayım/güncelleme tarihi görünmüyor; 7 Kasım 2026’da kontrol edilen uygulama özeti.",
      "[Komisyon rehberi kütüphane kaydı](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-new-guidance-support-timely-cyber-resilience-act-implementation) ve [C(2026) 5252 eki](https://ec.europa.eu/newsroom/dae/redirection/document/131456): yayım 27 Temmuz 2026; bağlayıcı olmayan rehber, özellikle Bölüm 9.1.",
      "[ENISA SRP SSS](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions): “Updated: 15 October 2026”; S4/S27 gönüllü kanal, S9 kayıt, S26 sayaçlar. [SRP ana sayfası](https://www.enisa.europa.eu/cra-srp), ayrıca 4 Kasım 2026’da v1.3’e geçildiğini ve belgelerin güncellendiğini belirtiyor; bildirim anında talimatları yeniden kontrol edin.",
      "[(AB) 2025/1535](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R1535): kabul 29 Temmuz 2025; Resmî Gazete 29 Ekim 2025. [(AB) 2026/881](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026R0881): kabul 11 Aralık 2025; Resmî Gazete 20 Nisan 2026."
     ]
    },
    {
     "t": "p",
     "text": "Bütün kaynaklara erişim: 7 Kasım 2026 (Europe/Istanbul). Erişim tarihi yayım tarihi değildir. Olayların soruşturma sonuçları, saldırganların kimliği ve tekil ürünlerin etkilenmesi bu incelemede bağımsız olarak saptanmadı."
    }
   ]
  }
 },
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
  "dateModified": "2026-11-09",
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
     "text": "The default values are published on the Commission's CBAM legislation and guidance page. Every producer should compare its own intensity per CN code with the default. If yours is lower, verified actual data is a commercial advantage. If it is higher, the mark-up rises every year and will not protect you for long. For that decision in detail, see our report [Actual or default? The CBAM data decision for Turkish metal exporters](/en/insights/report/cbam-actual-or-default-e9f664d8)."
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
     "text": "Varsayılan değerler Komisyonun SKDM mevzuat ve rehber sayfasında yayımlanıyor. Her üretici kendi emisyon yoğunluğunu GTİP kodu bazında varsayılan değerle karşılaştırmalı. Yoğunluğunuz varsayılan değerin altındaysa doğrulanmış gerçek veri doğrudan ticari avantajdır. Üstündeyse, marj her yıl arttığı için varsayılan değer sizi uzun süre korumaz. Kararın ayrıntısı için raporumuza bakın: [SKDM'de gerçek emisyon mu, varsayılan değer mi?](/tr/icgoruler/rapor/cbam-gercek-mi-varsayilan-mi-ef31215c)"
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

/** Publication date, or a later content-revision date when one was set. Never `checked` or the build clock. */
export function guideLastmod(guide: Guide): string {
  return guide.dateModified ?? guide.date;
}
