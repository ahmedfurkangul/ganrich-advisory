import type { Lang } from './content';

// Questions, answer labels and result copy for the readiness checks. Shared by the check page and by the
// inquiry API, which rebuilds the emailed result from these canonical texts rather than from the browser.

export type Answer = 2 | 1 | 0;
type Question = { q: string; gap: string };

const cbamCopy = {
  en: {
    label: 'CBAM readiness check',
    title: 'How ready is your CBAM data for an EU buyer?',
    intro: 'Eight questions, about two minutes. You see the result straight away. Nothing is stored unless you ask for a review.',
    answers: ['Yes', 'Partly', 'No or not sure'] as const,
    progress: (n: number, total: number) => `${n} of ${total} answered`,
    see: 'See the result',
    score: 'Readiness score',
    bands: [
      ['Early stage', 'Start with scoping: which products are in scope, and which EU buyers need what, by when. Until then, buyers will rely on default values.'],
      ['Data exists, not yet decision-ready', 'The building blocks are there. The next step is an installation-level emissions file and an honest comparison of actual and default values for one product.'],
      ['Well advanced', 'You are ready to test actual values against defaults with one buyer and to plan verification. The question now is whether a recurring data routine pays off.'],
    ] as const,
    gaps: 'Gaps to close first',
    noGaps: 'No major gaps in these eight areas.',
    disclaimer: 'This is an indicative self-assessment, not a compliance opinion or a verification.',
    ask: 'Ask for a CBAM readiness review',
    askIntro: 'Send the result and we will reply by email with what we would look at first, for one product and one EU buyer.',
    name: 'Name', email: 'Work email', company: 'Company',
    privacy: 'I have read the privacy notice and understand how my request will be handled.', privacyLink: 'Privacy notice',
    send: 'Send the result', sending: 'Sending…',
    sent: 'Thank you. Your result has reached Ganrich Advisory and we will reply by email.',
    error: 'Unable to send. Please try again or write to furkangul@ganrichadvisory.com.',
    paper: 'Read the whitepaper: Actual or default?',
    programme: 'See the CBAM Data Readiness programme',
    restart: 'Start again',
    questions: [
      { q: 'Do you know which of your products sold into the EU are covered by CBAM (iron and steel, aluminium, cement, fertilisers, hydrogen, electricity)?', gap: 'Map products to CN codes and confirm which EU shipments are in scope.' },
      { q: 'Has an EU buyer asked you for emissions data, or for a supplier communication template?', gap: 'Ask your main EU buyers what they need, in which format and by when.' },
      { q: 'Can you measure fuel, electricity and key inputs per installation over a full reporting period?', gap: 'Set up installation-level records for fuels, electricity and inputs.' },
      { q: 'Do you know your direct and indirect emissions per tonne of product?', gap: 'Calculate specific embedded emissions for at least one product.' },
      { q: 'Do you have emissions data for precursors you buy, such as pig iron, ferro-alloys or unwrought aluminium?', gap: 'Request precursor emissions data from your suppliers.' },
      { q: 'Have you compared what actual values and default values would mean for your buyer’s CBAM cost?', gap: 'Run an actual-versus-default comparison before the next price talk.' },
      { q: 'Is one named person responsible for CBAM data and buyer communication?', gap: 'Name an owner for CBAM data and buyer requests.' },
      { q: 'Have you planned how actual emissions data would be verified by an accredited verifier?', gap: 'Plan verification well ahead of your buyer’s reporting deadline.' },
    ] as Question[],
  },
  tr: {
    label: 'CBAM hazırlık testi',
    title: 'CBAM veriniz AB alıcınız için ne kadar hazır?',
    intro: 'Sekiz soru, yaklaşık iki dakika. Sonucu hemen görürsünüz. Değerlendirme istemediğiniz sürece hiçbir şey kaydedilmez.',
    answers: ['Evet', 'Kısmen', 'Hayır veya emin değilim'] as const,
    progress: (n: number, total: number) => `${total} sorudan ${n} tanesi yanıtlandı`,
    see: 'Sonucu görün',
    score: 'Hazırlık puanı',
    bands: [
      ['Başlangıç aşaması', 'Kapsamı netleştirerek başlayın: hangi ürünler kapsamda, hangi AB alıcısı neyi ne zamana kadar istiyor. O zamana kadar alıcılarınız varsayılan değerleri kullanır.'],
      ['Veri var, karar için henüz hazır değil', 'Temel parçalar mevcut. Sonraki adım, tesis düzeyinde bir emisyon dosyası ve tek bir ürün için gerçek ile varsayılan değerlerin dürüst bir karşılaştırması.'],
      ['İleri aşama', 'Gerçek değerleri tek bir alıcıyla varsayılan değerlere karşı sınamaya ve doğrulamayı planlamaya hazırsınız. Artık soru, düzenli bir veri rutininin kendini amorti edip etmediği.'],
    ] as const,
    gaps: 'Önce kapatılması gereken boşluklar',
    noGaps: 'Bu sekiz alanda belirgin bir boşluk yok.',
    disclaimer: 'Bu, yol gösterici bir öz değerlendirmedir; uyum görüşü veya doğrulama değildir.',
    ask: 'CBAM hazırlık değerlendirmesi isteyin',
    askIntro: 'Sonucu gönderin; tek bir ürün ve tek bir AB alıcısı için önce neye bakacağımızı e-postayla yazalım.',
    name: 'Ad soyad', email: 'İş e-postası', company: 'Şirket',
    privacy: 'Gizlilik bildirimini okudum ve talebimin nasıl işleneceğini anladım.', privacyLink: 'Gizlilik bildirimi',
    send: 'Sonucu gönderin', sending: 'Gönderiliyor…',
    sent: 'Teşekkürler. Sonucunuz Ganrich Advisory’ye ulaştı; e-postayla dönüş yapacağız.',
    error: 'Gönderilemedi. Lütfen tekrar deneyin veya furkangul@ganrichadvisory.com adresine yazın.',
    paper: 'Teknik notu okuyun: Gerçek mi, varsayılan mı?',
    programme: 'CBAM Veri Hazırlığı programını inceleyin',
    restart: 'Baştan başlayın',
    questions: [
      { q: 'AB’ye sattığınız ürünlerden hangilerinin CBAM kapsamında olduğunu biliyor musunuz (demir-çelik, alüminyum, çimento, gübre, hidrojen, elektrik)?', gap: 'Ürünleri GTİP/KN kodlarıyla eşleştirin ve hangi AB sevkiyatlarının kapsamda olduğunu netleştirin.' },
      { q: 'Bir AB alıcısı sizden emisyon verisi veya tedarikçi bildirim şablonu istedi mi?', gap: 'Ana AB alıcılarınıza neyi, hangi formatta ve ne zamana kadar istediklerini sorun.' },
      { q: 'Yakıt, elektrik ve temel girdileri tesis bazında ve tam bir raporlama dönemi boyunca ölçebiliyor musunuz?', gap: 'Yakıt, elektrik ve girdiler için tesis düzeyinde kayıt düzeni kurun.' },
      { q: 'Ton ürün başına doğrudan ve dolaylı emisyonlarınızı biliyor musunuz?', gap: 'En az bir ürün için gömülü emisyonları hesaplayın.' },
      { q: 'Satın aldığınız ara ürünlerin (pik demir, ferro alaşımlar, işlenmemiş alüminyum gibi) emisyon verisi elinizde mi?', gap: 'Tedarikçilerinizden ara ürün emisyon verisi isteyin.' },
      { q: 'Gerçek değerler ile varsayılan değerlerin alıcınızın CBAM maliyetine etkisini karşılaştırdınız mı?', gap: 'Bir sonraki fiyat görüşmesinden önce gerçek–varsayılan değer karşılaştırması yapın.' },
      { q: 'CBAM verisinden ve alıcı iletişiminden sorumlu, adı belli bir kişi var mı?', gap: 'CBAM verisi ve alıcı talepleri için bir sorumlu belirleyin.' },
      { q: 'Gerçek emisyon verisinin akredite bir doğrulayıcı tarafından nasıl doğrulanacağını planladınız mı?', gap: 'Doğrulamayı alıcınızın bildirim tarihinden epey önce planlayın.' },
    ] as Question[],
  },
};

const craCopy = {
  en: {
    label: 'CRA readiness check',
    title: 'Could you report an exploited vulnerability within 24 hours?',
    intro: 'Eight questions, about two minutes, on the Cyber Resilience Act reporting duties that have applied since 11 September 2026. You see the result straight away. Nothing is stored unless you ask for a review.',
    answers: ['Yes', 'Partly', 'No or not sure'] as const,
    progress: (n: number, total: number) => `${n} of ${total} answered`,
    see: 'See the result',
    score: 'Readiness score',
    bands: [
      ['Early stage', 'Start with scope and ownership: which products with digital elements you sell in the EU, and who decides when something must be reported. Without that, the 24-hour clock cannot be met.'],
      ['Partly ready', 'The pieces exist but are not yet joined up. The next step is to connect intake, decision, reporting and fixing into one routine, and to test it on a realistic scenario.'],
      ['Well advanced', 'You have the basics in place. The question now is whether the routine holds under pressure, which a timed exercise with the people involved will show.'],
    ] as const,
    gaps: 'Gaps to close first',
    noGaps: 'No major gaps in these eight areas.',
    disclaimer: 'This is an indicative self-assessment, not a legal opinion or a security audit.',
    ask: 'Ask for a CRA incident readiness review',
    askIntro: 'Send the result and we will reply by email with what we would look at first, for one product line.',
    name: 'Name', email: 'Work email', company: 'Company',
    privacy: 'I have read the privacy notice and understand how my request will be handled.', privacyLink: 'Privacy notice',
    send: 'Send the result', sending: 'Sending…',
    sent: 'Thank you. Your result has reached Ganrich Advisory and we will reply by email.',
    error: 'Unable to send. Please try again or write to furkangul@ganrichadvisory.com.',
    paper: 'Read the whitepaper: The 24-hour test',
    programme: 'See the CRA Incident Readiness programme',
    restart: 'Start again',
    questions: [
      { q: 'Do you know which of your products sold in the EU contain software or connect to a network, and so count as products with digital elements under the CRA?', gap: 'List the products with digital elements you sell in the EU, including older models still on the market.' },
      { q: 'Is a named person or small team authorised to decide, within hours, whether a vulnerability is actively exploited and must be reported?', gap: 'Name who decides on reporting, with a deputy, and write down what they may decide alone.' },
      { q: 'Can customers and security researchers report a vulnerability to you through a published contact or disclosure policy?', gap: 'Publish a security contact and a short vulnerability disclosure policy.' },
      { q: 'Do you know which software components, including open-source libraries, are in each product and version?', gap: 'Build a software bill of materials for your main product lines.' },
      { q: 'Could you tell, within a day, which products, versions and customers a new vulnerability affects?', gap: 'Link components to products, versions and customers so impact can be assessed quickly.' },
      { q: 'Do you know how an early warning is submitted through ENISA’s single reporting platform, and who in your company submits it?', gap: 'Prepare the reporting route: account, templates and who submits the 24-hour early warning and 72-hour notification.' },
      { q: 'Can you ship a security update for affected products and tell users how to apply it?', gap: 'Set up a way to deliver security updates and notify users, including for products in the field.' },
      { q: 'Have you rehearsed the 24-hour and 72-hour sequence in an exercise within the last year?', gap: 'Run a timed exercise on a realistic vulnerability scenario with the people who would be involved.' },
    ] as Question[],
  },
  tr: {
    label: 'CRA hazırlık testi',
    title: 'İstismar edilen bir açığı 24 saat içinde bildirebilir misiniz?',
    intro: 'Siber Dayanıklılık Yasasının 11 Eylül 2026’dan beri geçerli bildirim yükümlülükleri üzerine sekiz soru, yaklaşık iki dakika. Sonucu hemen görürsünüz. Değerlendirme istemediğiniz sürece hiçbir şey kaydedilmez.',
    answers: ['Evet', 'Kısmen', 'Hayır veya emin değilim'] as const,
    progress: (n: number, total: number) => `${total} sorudan ${n} tanesi yanıtlandı`,
    see: 'Sonucu görün',
    score: 'Hazırlık puanı',
    bands: [
      ['Başlangıç aşaması', 'Kapsam ve sorumlulukla başlayın: AB’de hangi dijital unsurlu ürünleri sattığınız ve bir durumun bildirilmesi gerektiğine kimin karar verdiği. Bunlar olmadan 24 saatlik süre karşılanamaz.'],
      ['Kısmen hazır', 'Parçalar var ama henüz birbirine bağlı değil. Sonraki adım; bildirim alma, karar, raporlama ve düzeltmeyi tek bir düzende birleştirmek ve gerçekçi bir senaryoyla sınamak.'],
      ['İleri aşama', 'Temeller yerinde. Artık soru, düzenin baskı altında dayanıp dayanmadığı; bunu ilgili kişilerle yapılacak süreli bir tatbikat gösterir.'],
    ] as const,
    gaps: 'Önce kapatılması gereken boşluklar',
    noGaps: 'Bu sekiz alanda belirgin bir boşluk yok.',
    disclaimer: 'Bu, yol gösterici bir öz değerlendirmedir; hukuki görüş veya güvenlik denetimi değildir.',
    ask: 'CRA olay hazırlığı değerlendirmesi isteyin',
    askIntro: 'Sonucu gönderin; tek bir ürün hattı için önce neye bakacağımızı e-postayla yazalım.',
    name: 'Ad soyad', email: 'İş e-postası', company: 'Şirket',
    privacy: 'Gizlilik bildirimini okudum ve talebimin nasıl işleneceğini anladım.', privacyLink: 'Gizlilik bildirimi',
    send: 'Sonucu gönderin', sending: 'Gönderiliyor…',
    sent: 'Teşekkürler. Sonucunuz Ganrich Advisory’ye ulaştı; e-postayla dönüş yapacağız.',
    error: 'Gönderilemedi. Lütfen tekrar deneyin veya furkangul@ganrichadvisory.com adresine yazın.',
    paper: 'Teknik notu okuyun: 24 saat testi',
    programme: 'CRA Olay Hazırlığı programını inceleyin',
    restart: 'Baştan başlayın',
    questions: [
      { q: 'AB’de sattığınız ürünlerden hangilerinin yazılım içerdiğini veya bir ağa bağlandığını, yani CRA kapsamında dijital unsurlu ürün sayıldığını biliyor musunuz?', gap: 'Piyasada hâlâ bulunan eski modeller dahil, AB’de sattığınız dijital unsurlu ürünleri listeleyin.' },
      { q: 'Bir açığın aktif olarak istismar edilip edilmediğine ve bildirilmesi gerekip gerekmediğine saatler içinde karar verebilecek, adı belli bir kişi veya küçük bir ekip var mı?', gap: 'Bildirim kararını kimin vereceğini ve vekilini belirleyin; tek başına neye karar verebileceklerini yazın.' },
      { q: 'Müşteriler ve güvenlik araştırmacıları size yayımlanmış bir iletişim adresi veya açık bildirme politikası üzerinden açık bildirebiliyor mu?', gap: 'Bir güvenlik iletişim adresi ve kısa bir açık bildirme politikası yayımlayın.' },
      { q: 'Her ürün ve sürümde, açık kaynak kütüphaneler dahil hangi yazılım bileşenlerinin bulunduğunu biliyor musunuz?', gap: 'Ana ürün hatlarınız için yazılım malzeme listesi (SBOM) oluşturun.' },
      { q: 'Yeni bir açığın hangi ürünleri, sürümleri ve müşterileri etkilediğini bir gün içinde söyleyebilir misiniz?', gap: 'Etki hızlı değerlendirilebilsin diye bileşenleri ürünler, sürümler ve müşterilerle ilişkilendirin.' },
      { q: 'ENISA’nın tek bildirim platformu üzerinden erken uyarının nasıl gönderildiğini ve şirketinizde bunu kimin göndereceğini biliyor musunuz?', gap: 'Bildirim yolunu hazırlayın: hesap, şablonlar ve 24 saatlik erken uyarı ile 72 saatlik bildirimi kimin göndereceği.' },
      { q: 'Etkilenen ürünler için güvenlik güncellemesi yayımlayıp kullanıcılara nasıl uygulayacaklarını anlatabilir misiniz?', gap: 'Sahadaki ürünler dahil, güvenlik güncellemesi dağıtma ve kullanıcıları bilgilendirme yolu kurun.' },
      { q: 'Son bir yıl içinde 24 saat ve 72 saat adımlarını bir tatbikatta prova ettiniz mi?', gap: 'Sürece dahil olacak kişilerle, gerçekçi bir açık senaryosu üzerinde süreli bir tatbikat yapın.' },
    ] as Question[],
  },
};

const eudrCopy = {
  en: {
    label: 'EUDR readiness check',
    title: 'Could your EU importer file its due-diligence statement with your data?',
    intro: 'Eight questions, about two minutes, on the origin, geolocation and legality data the EU Deforestation Regulation asks for. It is scheduled to apply from 30 December 2026 for large and medium operators. You see the result straight away. Nothing is stored unless you ask for a review.',
    answers: ['Yes', 'Partly', 'No or not sure'] as const,
    progress: (n: number, total: number) => `${n} of ${total} answered`,
    see: 'See the result',
    score: 'Readiness score',
    bands: [
      ['Early stage', 'Start with scope and origin: which of your products fall under the regulation, and who supplies the raw material for each. Until then, your importer cannot complete its due diligence with your data.'],
      ['Partly ready', 'Some of the data exists, but it is not yet tied to shipments. The next step is to link supplier, origin and geolocation to each batch for one product line and test the package with one importer.'],
      ['Well advanced', 'The basics are in place. The question now is whether the data holds up shipment by shipment, including when material comes through traders or is mixed in production.'],
    ] as const,
    gaps: 'Gaps to close first',
    noGaps: 'No major gaps in these eight areas.',
    disclaimer: 'This is an indicative self-assessment, not a legal opinion or a deforestation-free certification.',
    ask: 'Ask for an EUDR traceability review',
    askIntro: 'Send the result and we will reply by email with what we would look at first, for one product line.',
    name: 'Name', email: 'Work email', company: 'Company',
    privacy: 'I have read the privacy notice and understand how my request will be handled.', privacyLink: 'Privacy notice',
    send: 'Send the result', sending: 'Sending…',
    sent: 'Thank you. Your result has reached Ganrich Advisory and we will reply by email.',
    error: 'Unable to send. Please try again or write to furkangul@ganrichadvisory.com.',
    paper: '',
    programme: 'See the EUDR Traceability File programme',
    restart: 'Start again',
    questions: [
      { q: 'Do you know which of the products you sell into the EU fall under the regulation, by customs (HS) code, after the 2026 scope update?', gap: 'Map each EU product line to the in-scope customs codes and record which ones fall outside.' },
      { q: 'For each shipment, can you name the supplier and the country where the wood or other commodity was produced?', gap: 'Build a supplier and origin map for your main EU product line, including material bought through traders.' },
      { q: 'Can you obtain the geolocation of the plots or forest areas where the raw material was harvested?', gap: 'Ask suppliers for plot coordinates or boundaries and note where the chain breaks.' },
      { q: 'Can you show that the raw material does not come from land deforested or degraded after 31 December 2020?', gap: 'Collect evidence for the 2020 cut-off date for each origin, such as forest management records or certification data.' },
      { q: 'Can you show that the raw material was harvested legally in the country of production, with permits and transport documents?', gap: 'Gather the harvesting permits and legality documents for each origin and keep them with the batch.' },
      { q: 'Do you keep in-scope material with known origin separate from material of unknown origin through storage and production?', gap: 'Set up batch traceability so material of unknown origin cannot enter EU-bound products unnoticed.' },
      { q: 'Do you know what data, in what format, your EU importer needs from you for its due-diligence statement, and who in your company provides it?', gap: 'Agree a data template with your main importer and name who prepares and sends it for each shipment.' },
      { q: 'Do you keep this information for at least five years, ready to show to a buyer or an authority?', gap: 'Store origin, geolocation and legality records by shipment for at least five years.' },
    ] as Question[],
  },
  tr: {
    label: 'EUDR hazırlık testi',
    title: 'AB ithalatçınız durum tespiti beyanını sizin verinizle verebilir mi?',
    intro: 'AB Ormansızlaşma Yönetmeliğinin istediği menşe, coğrafi konum ve yasallık verisi üzerine sekiz soru, yaklaşık iki dakika. Yönetmeliğin büyük ve orta işletmeler için 30 Aralık 2026’dan itibaren uygulanması planlanıyor. Sonucu hemen görürsünüz. Değerlendirme istemediğiniz sürece hiçbir şey kaydedilmez.',
    answers: ['Evet', 'Kısmen', 'Hayır veya emin değilim'] as const,
    progress: (n: number, total: number) => `${total} sorudan ${n} tanesi yanıtlandı`,
    see: 'Sonucu görün',
    score: 'Hazırlık puanı',
    bands: [
      ['Başlangıç aşaması', 'Kapsam ve menşeyle başlayın: ürünlerinizden hangilerinin yönetmelik kapsamına girdiği ve her birinin hammaddesini kimin sağladığı. Bunlar netleşmeden ithalatçınız durum tespitini sizin verinizle tamamlayamaz.'],
      ['Kısmen hazır', 'Verinin bir kısmı var ama henüz sevkiyatlara bağlı değil. Sonraki adım; tek bir ürün hattında tedarikçi, menşe ve coğrafi konumu her partiye bağlamak ve paketi bir ithalatçıyla sınamak.'],
      ['İleri aşama', 'Temeller yerinde. Artık soru, verinin sevkiyat bazında, malzeme tüccarlar üzerinden geldiğinde veya üretimde karıştığında da dayanıp dayanmadığı.'],
    ] as const,
    gaps: 'Önce kapatılması gereken boşluklar',
    noGaps: 'Bu sekiz alanda belirgin bir boşluk yok.',
    disclaimer: 'Bu, yol gösterici bir öz değerlendirmedir; hukuki görüş veya ormansızlaşmadan arî olma belgesi değildir.',
    ask: 'EUDR izlenebilirlik değerlendirmesi isteyin',
    askIntro: 'Sonucu gönderin; tek bir ürün hattı için önce neye bakacağımızı e-postayla yazalım.',
    name: 'Ad soyad', email: 'İş e-postası', company: 'Şirket',
    privacy: 'Gizlilik bildirimini okudum ve talebimin nasıl işleneceğini anladım.', privacyLink: 'Gizlilik bildirimi',
    send: 'Sonucu gönderin', sending: 'Gönderiliyor…',
    sent: 'Teşekkürler. Sonucunuz Ganrich Advisory’ye ulaştı; e-postayla dönüş yapacağız.',
    error: 'Gönderilemedi. Lütfen tekrar deneyin veya furkangul@ganrichadvisory.com adresine yazın.',
    paper: '',
    programme: 'EUDR İzlenebilirlik Dosyası programını inceleyin',
    restart: 'Baştan başlayın',
    questions: [
      { q: 'AB’ye sattığınız ürünlerden hangilerinin, 2026 kapsam güncellemesinden sonra, gümrük (GTİP) koduna göre yönetmelik kapsamına girdiğini biliyor musunuz?', gap: 'Her AB ürün hattını kapsamdaki gümrük kodlarıyla eşleştirin ve kapsam dışında kalanları kayda geçirin.' },
      { q: 'Her sevkiyat için tedarikçiyi ve ahşabın veya diğer hammaddenin üretildiği ülkeyi söyleyebilir misiniz?', gap: 'Tüccarlar üzerinden alınan malzeme dahil, ana AB ürün hattınız için tedarikçi ve menşe haritası çıkarın.' },
      { q: 'Hammaddenin hasat edildiği arazi veya orman alanlarının coğrafi konumunu temin edebilir misiniz?', gap: 'Tedarikçilerden parsel koordinatlarını veya sınırlarını isteyin ve zincirin nerede koptuğunu not edin.' },
      { q: 'Hammaddenin 31 Aralık 2020’den sonra ormansızlaşan veya bozulan arazilerden gelmediğini gösterebilir misiniz?', gap: 'Her menşe için 2020 kesim tarihine dair kanıt toplayın; örneğin orman işletme kayıtları veya sertifika verisi.' },
      { q: 'Hammaddenin üretim ülkesinde, izin ve nakliye belgeleriyle yasal olarak hasat edildiğini gösterebilir misiniz?', gap: 'Her menşe için hasat izinlerini ve yasallık belgelerini toplayın ve partiyle birlikte saklayın.' },
      { q: 'Menşei bilinen kapsam içi malzemeyi, depolama ve üretim boyunca menşei bilinmeyen malzemeden ayrı tutuyor musunuz?', gap: 'Menşei bilinmeyen malzemenin fark edilmeden AB’ye giden ürünlere karışmaması için parti izlenebilirliği kurun.' },
      { q: 'AB ithalatçınızın durum tespiti beyanı için sizden hangi veriyi, hangi biçimde istediğini ve şirketinizde bunu kimin sağlayacağını biliyor musunuz?', gap: 'Ana ithalatçınızla bir veri şablonu üzerinde anlaşın ve her sevkiyat için bunu kimin hazırlayıp göndereceğini belirleyin.' },
      { q: 'Bu bilgileri en az beş yıl boyunca, bir alıcıya veya yetkili makama gösterilmeye hazır şekilde saklıyor musunuz?', gap: 'Menşe, coğrafi konum ve yasallık kayıtlarını sevkiyat bazında en az beş yıl saklayın.' },
    ] as Question[],
  },
};

export type CheckCopy = Omit<typeof cbamCopy.en, 'bands' | 'answers'> & { answers: readonly string[]; bands: readonly (readonly [string, string])[] };
export type CheckConfig = { copy: Record<Lang, CheckCopy>; route: 'cbamCheck' | 'craCheck' | 'eudrCheck'; solution: 'solutionCbam' | 'solutionCra' | 'solutionEudr'; paper?: Record<Lang, string> };

export const checks = {
  cbam: { copy: cbamCopy, route: 'cbamCheck', solution: 'solutionCbam', paper: { en: '/en/insights/report/cbam-actual-or-default-e9f664d8', tr: '/tr/icgoruler/rapor/cbam-gercek-mi-varsayilan-mi-ef31215c' } },
  cra: { copy: craCopy, route: 'craCheck', solution: 'solutionCra', paper: { en: '/en/insights/report/cra-the-24-hour-test-96989394', tr: '/tr/icgoruler/rapor/cra-24-saat-testi-37aca9ad' } },
  eudr: { copy: eudrCopy, route: 'eudrCheck', solution: 'solutionEudr' },
} satisfies Record<string, CheckConfig>;

export type CheckId = keyof typeof checks;
export const isCheckId = (value: unknown): value is CheckId => typeof value === 'string' && Object.prototype.hasOwnProperty.call(checks, value);

/** Score, band and open gaps for a full set of answers (2 = yes, 1 = partly, 0 = no or not sure). */
export function scoreCheck(copy: CheckCopy, answers: readonly (Answer | undefined)[]) {
  const max = copy.questions.length * 2;
  const score = answers.reduce<number>((s, a) => s + (a ?? 0), 0);
  const band = score <= 6 ? 0 : score <= 11 ? 1 : 2;
  const gaps = copy.questions.filter((_, i) => (answers[i] ?? 0) < 2);
  return { score, max, band, gaps };
}
