import type { Lang } from './content';

// Direct answers to the questions buyers ask most about the four flagship programmes.
// Shown on the programme page and added to its FAQPage structured data. Keep dates in line with solutions-content.ts.
export const FAQ_CHECKED = { en: '26 October 2026', tr: '26 Ekim 2026' } as const;

type Faq = [question: string, answer: string][];

export const solutionFaq: Record<Lang, Record<string, Faq>> = {
  en: {
    solutionCbam: [
      ['What is CBAM, and what is SKDM?', 'CBAM is the EU’s Carbon Border Adjustment Mechanism. It puts a carbon price on the emissions embedded in certain goods imported into the EU, so that imports carry a cost comparable to EU production under the EU emissions trading system. In Türkiye the same mechanism is called SKDM (Sınırda Karbon Düzenleme Mekanizması). Reporting ran from October 2023 to the end of 2025; the paying period began on 1 January 2026.'],
      ['Which goods and customs codes are covered?', 'Annex I of the CBAM Regulation lists the covered goods by CN code: cement, iron and steel, aluminium, fertilisers, hydrogen and electricity, including some downstream products such as certain steel and aluminium articles. Türkiye’s GTİP codes follow the EU Combined Nomenclature at eight-digit level, so the check is made product by product against Annex I.'],
      ['How much does a CBAM certificate cost, and when is it paid?', 'For 2026 imports the price is the quarterly average of EU ETS auction prices, which the Commission publishes after each quarter on its CBAM pages. From 2027 the price is a weekly average. Certificates are bought from 1 February 2027, and those for 2026 imports are surrendered with the annual declaration by 30 September 2027.'],
      ['What is the CBAM communication template?', 'A spreadsheet published by the Commission that installation operators can use to send embedded emissions data to their EU importers in a common format. Its use is voluntary, but most importers ask for it or for the same data. For actual values in a 2026 declaration, the data behind it must also be verified.'],
      ['Does CBAM apply to us if we only export to the EU?', 'The legal obligations sit with the EU importer, who must be an authorised CBAM declarant and report the embedded emissions of the goods it brings in. As the producer you file nothing yourself, but your buyer can only use actual emissions values if you supply installation-level data. Without it, the importer must use default values.'],
      ['Which importers are covered?', 'Importers bringing in more than 50 tonnes a year of covered goods in total. Below that threshold an importer is exempt, which is why some buyers ask for data and others do not.'],
      ['Why does actual versus default matter?', 'Default values are set conservatively, and the mark-up added to them rises over the coming years. For many installations, verified actual values lower the CBAM cost the importer carries, and that cost often comes back into the price conversation.'],
      ['What data does our buyer need from us?', 'In practice: the production route, the installation’s direct emissions and, for some goods, indirect emissions from electricity, plus the inputs and outputs used to attribute them to each product. Any carbon price already paid in the country of production is also relevant.'],
      ['Do our emissions need to be verified?', 'Yes. Actual emissions used in a CBAM declaration must be verified by an accredited verifier. We prepare and organise the data for verification; we are not a verification body.'],
    ],
    solutionCra: [
      ['Which products does the Cyber Resilience Act cover?', 'Products with digital elements placed on the EU market: connected hardware and software, including industrial equipment with firmware. Some product groups, such as medical devices and vehicles, are covered by their own EU rules instead.'],
      ['What applies now, and what later?', 'The reporting obligations have applied since 11 September 2026. Most other requirements, such as secure-by-design rules and conformity assessment, apply from 11 December 2027.'],
      ['What exactly has to be reported, and how fast?', 'Actively exploited vulnerabilities and severe incidents affecting your product. An early warning is due within 24 hours of becoming aware, a notification within 72 hours, and a final report later: 14 days after a fix is available for a vulnerability, or one month after the notification for an incident.'],
      ['Where are reports sent?', 'Through the single reporting platform run by ENISA, to the national computer security incident response team designated as coordinator.'],
      ['Do products already on the market count?', 'Yes. The reporting obligations apply to in-scope products already on the EU market, not only to new ones.'],
    ],
    solutionEudr: [
      ['When does EUDR apply?', 'From 30 December 2026 for large and medium operators, and for micro and small operators of timber products already covered by the EU Timber Regulation. Other micro and small operators follow on 30 June 2027. The Commission’s May 2026 review confirmed there will be no further postponement.'],
      ['Who files the due-diligence statement?', 'The operator who places the product on the EU market, usually your EU importer. As an exporter outside the EU you do not file one, but the importer cannot file without the information you supply.'],
      ['What information will our importer ask for?', 'The country of production, the geolocation of every plot of land where the wood was harvested, quantities, supplier details and evidence that harvesting was legal under the rules of the country of production.'],
      ['How precise does geolocation need to be?', 'For plots larger than four hectares, a polygon of the plot boundary is required. Smaller plots can be described with a single point.'],
      ['Is furniture in scope?', 'Wood and many wood products are in scope, including a number of furniture codes. The list is set by customs code and was updated in 2026, so we check it product line by product line.'],
    ],
    solutionOrderDesk: [
      ['Does the assistant send orders or invoices on its own?', 'No. It prepares a draft order in the ERP and a member of your team approves, edits or rejects it. Nothing reaches the customer or the invoice run without that approval.'],
      ['Which ERP systems can it work with?', 'Any system that can import orders, through an API or a structured file. We confirm the route with your ERP partner before the pilot starts.'],
      ['What happens to customer messages and personal data?', 'Messages are processed only to prepare the draft order, under a written agreement and with the data kept to what the order needs. Your KVKK notice and retention rules apply, and the pilot design records where data is processed.'],
      ['How do we know it is accurate enough?', 'The pilot measures line-level accuracy on your own messages, against what your staff actually entered, before anyone relies on it. The decision to go further is made on that number.'],
    ],
  },
  tr: {
    solutionCbam: [
      ['SKDM (CBAM) nedir?', 'Sınırda Karbon Düzenleme Mekanizması (SKDM), AB’deki adıyla CBAM, AB’ye ithal edilen belirli mallara gömülü emisyonlara karbon fiyatı uygular. Amaç, ithal malların AB emisyon ticaret sistemi altındaki AB üretimiyle karşılaştırılabilir bir maliyet taşımasıdır. Ekim 2023’ten 2025 sonuna kadar yalnızca raporlama yapıldı; ödemeli dönem 1 Ocak 2026’da başladı.'],
      ['Hangi mallar ve GTİP kodları kapsamda?', 'SKDM Tüzüğü’nün I. Eki kapsamdaki malları KN koduna göre listeler: çimento, demir-çelik, alüminyum, gübre, hidrojen ve elektrik; bazı çelik ve alüminyum mamulleri gibi ileri ürünler de dahil. Türkiye’nin GTİP kodları sekiz haneli düzeyde AB Kombine Nomenklatürü’nü izler; bu yüzden kontrol ürün bazında I. Ek’e göre yapılır.'],
      ['SKDM sertifikası ne kadar, ne zaman ödenir?', '2026 ithalatı için fiyat, AB ETS ihale fiyatlarının çeyreklik ortalamasıdır; Komisyon bu fiyatı her çeyrekten sonra SKDM sayfalarında yayımlar. 2027’den itibaren haftalık ortalama uygulanır. Sertifikalar 1 Şubat 2027’den itibaren satın alınır; 2026 ithalatına ait olanlar 30 Eylül 2027’ye kadar yıllık beyanla teslim edilir.'],
      ['SKDM iletişim şablonu nedir?', 'Komisyon’un yayımladığı ve tesis işletmecilerinin gömülü emisyon verisini AB’deki ithalatçılarına ortak bir formatta göndermek için kullanabildiği bir tablo. Kullanımı gönüllüdür, ancak çoğu ithalatçı bu şablonu ya da aynı verileri ister. 2026 beyanında gerçek değer kullanılacaksa şablonun arkasındaki verinin doğrulanmış olması da gerekir.'],
      ['Yalnızca AB’ye ihracat yapıyorsak SKDM (CBAM) bizi de kapsar mı?', 'Yasal yükümlülükler AB’deki ithalatçıdadır: yetkili CBAM beyancısı olmalı ve ithal ettiği malların gömülü emisyonlarını bildirmelidir. Üretici olarak siz bir beyan vermezsiniz; ancak alıcınız gerçek emisyon değerlerini ancak siz tesis düzeyinde veri sağlarsanız kullanabilir. Veri yoksa ithalatçı varsayılan değerleri kullanmak zorundadır.'],
      ['Hangi ithalatçılar kapsamda?', 'Kapsamdaki mallardan yılda toplam 50 tonun üzerinde ithalat yapanlar. Bu eşiğin altındaki ithalatçılar muaftır; bu yüzden bazı alıcılar veri isterken bazıları istemez.'],
      ['Gerçek ve varsayılan değer ayrımı neden önemli?', 'Varsayılan değerler ihtiyatlı belirlenir ve bunlara eklenen pay önümüzdeki yıllarda artar. Birçok tesiste doğrulanmış gerçek değerler ithalatçının taşıdığı CBAM maliyetini düşürür; bu maliyet de çoğu zaman fiyat görüşmesine geri döner.'],
      ['Alıcımız bizden hangi verileri ister?', 'Uygulamada: üretim yolu, tesisin doğrudan emisyonları, bazı mallarda elektrikten kaynaklanan dolaylı emisyonlar ve bunları ürün bazına dağıtmak için kullanılan girdi ve çıktılar. Üretim ülkesinde ödenmiş bir karbon fiyatı varsa o da önemlidir.'],
      ['Emisyonlarımızın doğrulanması gerekiyor mu?', 'Evet. CBAM beyanında kullanılan gerçek emisyonlar akredite bir doğrulayıcı tarafından doğrulanmalıdır. Biz veriyi doğrulamaya hazır hâle getirir ve düzenleriz; doğrulama kuruluşu değiliz.'],
    ],
    solutionCra: [
      ['Siber Dayanıklılık Yasası hangi ürünleri kapsar?', 'AB pazarına sunulan dijital unsurlu ürünleri: bağlantılı donanım ve yazılım, ürün yazılımı olan endüstriyel ekipman dahil. Tıbbi cihazlar ve araçlar gibi bazı ürün grupları kendi AB kurallarına tabidir.'],
      ['Şimdi ne geçerli, sonra ne gelecek?', 'Bildirim yükümlülükleri 11 Eylül 2026’dan beri uygulanıyor. Tasarımdan güvenlik kuralları ve uygunluk değerlendirmesi gibi diğer gerekliliklerin çoğu 11 Aralık 2027’den itibaren uygulanacak.'],
      ['Tam olarak ne, ne kadar hızlı bildirilmeli?', 'Ürününüzü etkileyen, aktif olarak istismar edilen açıklar ve ciddi olaylar. Farkına varıldıktan sonra 24 saat içinde erken uyarı, 72 saat içinde bildirim ve daha sonra nihai rapor gerekir: açıklarda düzeltme hazır olduktan sonra 14 gün içinde, olaylarda bildirimden sonra bir ay içinde.'],
      ['Bildirimler nereye yapılır?', 'ENISA’nın işlettiği tek bildirim platformu üzerinden, koordinatör olarak belirlenen ulusal bilgisayar güvenliği olaylarına müdahale ekibine.'],
      ['Piyasadaki mevcut ürünler de sayılır mı?', 'Evet. Bildirim yükümlülükleri yalnızca yeni ürünlere değil, AB pazarında zaten bulunan kapsamdaki ürünlere de uygulanır.'],
    ],
    solutionEudr: [
      ['EUDR ne zaman uygulanacak?', 'Büyük ve orta işletmeciler ile AB Kereste Tüzüğü kapsamındaki ahşap ürünlerinin mikro ve küçük işletmecileri için 30 Aralık 2026’dan itibaren. Diğer mikro ve küçük işletmeciler 30 Haziran 2027’de takip ediyor. Komisyon’un Mayıs 2026 incelemesi yeni bir erteleme olmayacağını teyit etti.'],
      ['Durum tespiti beyanını kim verir?', 'Ürünü AB pazarına süren işletme, yani genellikle AB’deki ithalatçınız. AB dışındaki ihracatçı olarak siz beyan vermezsiniz; ancak ithalatçı sizin sağladığınız bilgi olmadan beyan veremez.'],
      ['İthalatçımız bizden hangi bilgileri isteyecek?', 'Üretim ülkesi, kerestenin kesildiği her arazi parçasının coğrafi konumu, miktarlar, tedarikçi bilgileri ve kesimin üretim ülkesinin kurallarına göre yasal olduğunu gösteren kanıtlar.'],
      ['Coğrafi konum ne kadar hassas olmalı?', 'Dört hektardan büyük arazilerde arazi sınırını gösteren bir poligon gerekir. Daha küçük araziler tek bir noktayla tanımlanabilir.'],
      ['Mobilya kapsamda mı?', 'Ahşap ve birçok ahşap ürünü, bazı mobilya kodları dahil, kapsamdadır. Liste gümrük koduna göre belirlenir ve 2026’da güncellendi; bu yüzden kontrolü ürün grubu bazında yapıyoruz.'],
    ],
    solutionOrderDesk: [
      ['Asistan siparişi veya faturayı kendi başına gönderir mi?', 'Hayır. ERP’de bir taslak sipariş hazırlar; ekibinizden biri onaylar, düzeltir veya reddeder. Bu onay olmadan müşteriye veya fatura sürecine hiçbir şey ulaşmaz.'],
      ['Hangi ERP sistemleriyle çalışır?', 'API veya yapılandırılmış dosya ile sipariş alabilen her sistemle. Pilottan önce yolu ERP iş ortağınızla birlikte netleştiririz.'],
      ['Müşteri mesajlarına ve kişisel verilere ne olur?', 'Mesajlar yalnızca taslak siparişi hazırlamak için, yazılı bir sözleşme çerçevesinde ve siparişin gerektirdiği veriyle sınırlı olarak işlenir. KVKK aydınlatmanız ve saklama kurallarınız geçerlidir; pilot tasarımı verinin nerede işlendiğini kayda geçirir.'],
      ['Yeterince doğru olduğunu nasıl anlarız?', 'Pilot, kendi mesajlarınız üzerinde ve personelinizin gerçekte girdiği kayıtlarla karşılaştırarak satır düzeyinde doğruluğu ölçer; buna güvenmeden önce. Devam etme kararı bu sayıya göre verilir.'],
    ],
  },
};

export const faqFor = (lang: Lang, key: string): Faq | undefined => solutionFaq[lang][key];
