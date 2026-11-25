import type { Lang } from "./content";

// A two- or three-sentence answer at the top of each guide. Every claim here is
// stated, with its source, in the guide body; update both together.
export const guideShortAnswers: Record<string, Record<Lang, string>> = {
  guideCbamDeclaration: {
    en: "On 19 November 2026 the European Commission opened a draft implementing regulation on CBAM declarations (Ares(2026)10806938) for feedback until 17 December 2026. It has not been adopted and can change; until it is, Regulation (EU) 2023/956 as amended applies. A Turkish exporter does not file the declaration, but the first one, due by 30 September 2027 for 2026 imports, is built from data only the producing installation holds.",
    tr: "Avrupa Komisyonu 19 Kasım 2026'da SKDM beyanlarına ilişkin bir uygulama tüzüğü taslağını (Ares(2026)10806938) 17 Aralık 2026'ya kadar görüşe açtı. Taslak kabul edilmemiştir ve değişebilir; kabul edilene kadar değişik 2023/956 sayılı Tüzük'ün kuralları geçerlidir. Türk ihracatçı beyan vermez; 2026 ithalatı için 30 Eylül 2027'ye kadar verilecek ilk beyanın içindeki verinin önemli bir kısmını ise yalnızca üretim tesisi sağlayabilir.",
  },
  guideSupplierData: {
    en: "Under the Omnibus I Directive, an EU customer that reports under the CSRD may not require a supplier with up to 1,000 employees to provide more sustainability information than the voluntary standard covers, for financial years from 2027. The cap does not cover data that product rules such as CBAM, EUDR, PPWR or the Battery Regulation require. One base report along the voluntary standard answers most questionnaires.",
    tr: "Omnibus I Direktifi'ne göre CSRD kapsamında raporlayan bir AB müşterisi, 2027'den itibaren başlayan hesap dönemlerinde 1.000'e kadar çalışanı olan tedarikçiden gönüllü standardın kapsadığından fazla sürdürülebilirlik bilgisi isteyemez. Sınır, SKDM, EUDR, PPWR veya Batarya Tüzüğü gibi ürün kurallarının istediği veriyi kapsamaz. Gönüllü standarda göre hazırlanan tek bir temel rapor anketlerin çoğunu yanıtlar.",
  },
  guideCbamDownstream: {
    en: "The Commission has proposed (COM(2025) 989) to extend CBAM from 1 January 2028 to steel- and aluminium-intensive downstream goods such as machinery parts, fasteners and appliances. The text is not final: key points were still open before the 30 November trilogue. Makers of these goods should check their CN codes now and start collecting emissions data from their steel and aluminium suppliers.",
    tr: "Komisyon, SKDM'nin 1 Ocak 2028'den itibaren makine parçası, bağlantı elemanı ve beyaz eşya gibi çelik ve alüminyum yoğun alt ürünlere genişletilmesini önerdi (COM(2025) 989). Metin kesinleşmedi: kilit konular 30 Kasım üçlü görüşmesi öncesinde hâlâ açıktı. Bu ürünlerin üreticileri GTİP kodlarını şimdi kontrol etmeli ve çelik ve alüminyum tedarikçilerinden emisyon verisi toplamaya başlamalı.",
  },
  guideCbamVerifier: {
    en: "Your EU buyer can declare your actual emissions instead of default values only with a verifier's report. Only a national accreditation body of an EU Member State can accredit a CBAM verifier, so TÜRKAK accreditation alone is not enough. With the first annual declaration due by 30 September 2027, book verification for 2026 data early.",
    tr: "AB alıcınız varsayılan değerler yerine gerçek emisyonlarınızı ancak bir doğrulayıcı raporuyla beyan edebilir. SKDM doğrulayıcısını yalnızca bir AB üye devletinin ulusal akreditasyon kurumu akredite edebilir; TÜRKAK akreditasyonu tek başına yetmez. İlk yıllık beyanın son tarihi 30 Eylül 2027 olduğundan 2026 verisinin doğrulamasını erken planlayın.",
  },
  guideGreenDeal: {
    en: "Türkiye's updated Green Deal Action Plan took effect on 10 November 2026 through Presidential Circular 2026/12, with 11 policy areas, 41 objectives and 142 actions. For exporters to the EU, the actions on CBAM data, the Türkiye ETS, a possible national CBAM, the Digital Product Passport and EUDR matter most. The plan sets direction and lead agencies; it does not by itself create new obligations for companies.",
    tr: "Türkiye'nin güncellenen Yeşil Mutabakat Eylem Planı, 2026/12 sayılı Cumhurbaşkanlığı Genelgesi ile 10 Kasım 2026'da yürürlüğe girdi: 11 politika alanı, 41 hedef ve 142 eylem. AB'ye ihracat yapanlar için en önemlileri SKDM verisi, Türkiye ETS, olası ulusal SKDM, Dijital Ürün Pasaportu ve EUDR eylemleri. Plan yön ve sorumlu kurumları belirler; tek başına şirketlere yeni yükümlülük getirmez.",
  },
  guideTrEtsMarket: {
    en: "EPDK's market regulation for the Türkiye ETS has been in force since 21 October 2026: it sets who runs the market, where allowances are held in registry accounts and how a 2026 top-up mechanism works. Whether a payment under TR ETS can reduce your EU buyer's CBAM bill depends on CBAM Article 9, actual emissions data and the Commission's implementing act on the deduction.",
    tr: "Türkiye ETS piyasasına ilişkin EPDK yönetmeliği 21 Ekim 2026'dan beri yürürlükte: piyasayı kimin işleteceğini, tahsislerin hangi kayıt hesaplarında tutulacağını ve 2026 tamamlama mekanizmasının nasıl çalışacağını belirliyor. TR ETS kapsamında yapılan bir ödemenin AB alıcınızın SKDM maliyetini düşürüp düşürmeyeceği SKDM 9. maddesine, gerçek emisyon verisine ve Komisyon'un indirime ilişkin uygulama işlemine bağlı.",
  },
  guideCbamDefaults: {
    en: "When an EU importer has no verified actual data, it declares the Commission's default value plus a mark-up: 10% in 2026, 20% in 2027 and 30% from 2028 for steel, aluminium, cement and hydrogen. The mark-up never applies to verified actual emissions. For many Turkish plants, verified actual data becomes worth its cost as the mark-up rises.",
    tr: "AB ithalatçısının doğrulanmış gerçek verisi yoksa Komisyon'un varsayılan değerini bir ek oranla beyan eder: çelik, alüminyum, çimento ve hidrojende 2026'da %10, 2027'de %20, 2028'den itibaren %30. Ek oran doğrulanmış gerçek emisyonlara hiçbir zaman uygulanmaz. Ek oran yükseldikçe birçok Türk tesisi için doğrulanmış gerçek veri maliyetine değer hale gelir.",
  },
  guideUkCbam: {
    en: "The UK's own CBAM applies to aluminium, iron and steel, cement, fertiliser and hydrogen goods imported into the UK from 1 January 2027, and the UK importer is liable. It differs from EU CBAM in threshold, calendar and rate. For 2027 imports, relief for a Türkiye ETS carbon price is likely to be zero, so plan for the full charge.",
    tr: "Birleşik Krallık'ın kendi SKDM'si 1 Ocak 2027'den itibaren ülkeye ithal edilen alüminyum, demir-çelik, çimento, gübre ve hidrojen ürünlerine uygulanır; yükümlü Birleşik Krallık ithalatçısıdır. Eşik, takvim ve oran bakımından AB SKDM'sinden farklıdır. 2027 ithalatında Türkiye ETS karbon fiyatı için indirim büyük olasılıkla sıfır olacağından tam ücreti planlayın.",
  },
  guideGulfEntry: {
    en: "Decide which customer you are serving and what proof they need before choosing between the UAE and Saudi Arabia; the country is the third or fourth decision. Many Turkish companies use the UAE as a test base and Saudi Arabia as the scale market. Commit capital in stages, with a go/no-go test at each step.",
    tr: "BAE ile Suudi Arabistan arasında seçim yapmadan önce hangi müşteriye hizmet edeceğinize ve o müşterinin hangi kanıtı istediğine karar verin; ülke üçüncü ya da dördüncü karardır. Birçok Türk şirketi BAE'yi test üssü, Suudi Arabistan'ı ölçek pazarı olarak kullanır. Sermayeyi aşamalı bağlayın ve her adımda devam/dur testi yapın.",
  },
  guideCraReporting: {
    en: "Since 11 September 2026, manufacturers of in-scope products with digital elements must report actively exploited vulnerabilities and severe incidents under CRA Article 14, including for products already on the market. A refrigeration incident does not create a reporting duty for every manufacturer. Check scope, whether the event affects your product's security, and when you became aware.",
    tr: "11 Eylül 2026'dan beri dijital unsurlu kapsam içi ürünlerin üreticileri, aktif olarak istismar edilen açıkları ve ciddi olayları CRA 14. madde uyarınca bildirmek zorunda; bu, piyasadaki eski ürünleri de kapsar. Bir soğutma olayı her üretici için bildirim yükümlülüğü doğurmaz. Kapsamı, olayın ürününüzün güvenliğini etkileyip etkilemediğini ve ne zaman haberdar olduğunuzu kontrol edin.",
  },
  guideEudr2026: {
    en: "EUDR applies to large and medium operators from 30 December 2026 and to micro and small operators from 30 June 2027. Your EU buyer will ask for a due diligence statement reference, the geolocation of the plots where the commodity was produced and proof that it was produced legally. Which products are caught depends on the CN code, not the trade name.",
    tr: "EUDR büyük ve orta ölçekli işletmelere 30 Aralık 2026'dan, mikro ve küçük işletmelere 30 Haziran 2027'den itibaren uygulanır. AB alıcınız bir özen yükümlülüğü beyanı (DDS) referansı, emtianın üretildiği parsellerin coğrafi konumu ve yasal üretim kanıtı isteyecek. Hangi ürünlerin kapsama girdiğini ticari ad değil GTİP kodu belirler.",
  },
  guideSteelDpp: {
    en: "Iron and steel is first in line among ESPR product groups: the Commission's timeline lists its ecodesign delegated act for adoption in Q4 2026. The legal basis and the DPP registry are decided; what a steel passport must contain is still open. Much of the data will overlap with what CBAM already asks for, so build one data set for both.",
    tr: "Demir-çelik, ESPR ürün grupları arasında ilk sırada: Komisyon takvimi bu gruba ilişkin ekotasarım yetki devri işlemini 2026'nın son çeyreğinde kabul edilecek olarak gösteriyor. Hukuki dayanak ve DÜP sicili kesinleşti; çelik pasaportunun neleri içereceği hâlâ açık. Verinin büyük kısmı SKDM'nin zaten istediği veriyle örtüşeceğinden ikisi için tek bir veri seti kurun.",
  },
  guideCbam2026: {
    en: "CBAM's definitive period began on 1 January 2026, and the first annual declaration and certificate surrender for 2026 imports are due by 30 September 2027. The 50-tonne threshold was reviewed and kept. Turkish producers who want their EU buyers to use actual emissions instead of default values need verified data, and verifier capacity is the bottleneck.",
    tr: "SKDM'nin kesin dönemi 1 Ocak 2026'da başladı; 2026 ithalatı için ilk yıllık beyan ve sertifika teslimi 30 Eylül 2027'ye kadar yapılmalı. 50 tonluk eşik gözden geçirildi ve korundu. AB alıcılarının varsayılan değer yerine gerçek emisyonları kullanmasını isteyen Türk üreticilerin doğrulanmış veriye ihtiyacı var; darboğaz doğrulayıcı kapasitesi.",
  },
  guideCraStandards: {
    en: "No CRA harmonised standard is cited yet, and the main obligations apply from 11 December 2027. Most products are in the default category and can self-assess under module A without a standard, if the technical documentation shows how each essential requirement is met. Important class I products without an applied standard need a notified body, so check capacity early.",
    tr: "Henüz yayımlanmış bir CRA uyumlaştırılmış standardı yok ve ana yükümlülükler 11 Aralık 2027'den itibaren uygulanıyor. Ürünlerin çoğu varsayılan kategoride ve teknik dosya her temel gerekliliğin nasıl karşılandığını gösterirse standart olmadan modül A ile öz değerlendirme yapabilir. Standart uygulanmayan I. sınıf önemli ürünler onaylanmış kuruluş gerektirir; kapasiteyi erkenden kontrol edin.",
  },
};
