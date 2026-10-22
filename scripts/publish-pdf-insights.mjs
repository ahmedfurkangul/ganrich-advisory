import { readFile } from "node:fs/promises";
import { join } from "node:path";

const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
const token = process.env.SITE_BYPASS_TOKEN;
const editorEmail = process.env.EDITOR_EMAIL;
const sourceDir = process.env.PDF_SOURCE_DIR;
const ingestKey = process.env.PDF_INGEST_KEY;

if (!siteUrl || !token || !editorEmail || !sourceDir || !ingestKey) {
  throw new Error("SITE_URL, SITE_BYPASS_TOKEN, EDITOR_EMAIL, PDF_SOURCE_DIR, and PDF_INGEST_KEY are required.");
}

const publications = [
  {
    filename: "SaMD_Gelecegi_Infografik_Sunum.pdf",
    title: "Tıbbi Cihaz Olarak Yazılımın Geleceği",
    subtitle: "SaMD teslimatından kalite sistemlerine, çevik yapay zekâdan regülasyona",
    dataPeriod: "2024–2030",
    pages: 10,
    regions: ["Küresel"],
    topics: ["SaMD", "Sağlık teknolojileri", "Yapay zekâ", "Regülasyon"],
    thesis: "SaMD’de rekabet avantajı yalnızca yazılım geliştirme hızından değil; klinik güven, sürekli doğrulama, kalite yönetimi ve siber güvenliği tek bir ürün işletim modelinde birleştirmekten doğuyor.",
    summary: "Seri, tıbbi cihaz olarak yazılımın sağlık teknolojilerindeki büyüyen rolünü ve bu ürünlerin neden klasik yazılım yaklaşımlarıyla yönetilemediğini inceliyor. Teslimat darboğazları klinik doğrulama, entegrasyon, değişiklik kontrolü, regülasyon ve güvenlik boyunca ele alınıyor. Yüksek performanslı model; klinik yönetişimi, ürün yönetimini, kaliteyi, mühendisliği ve güvenliği ortak bir çalışma ritminde buluşturuyor. İçerik ayrıca kalite faaliyetlerinin geliştirme sonuna bırakılması yerine sprintlere gömülmesini, ajan tabanlı yapay zekânın kanıt üretimi ve kontrol süreçlerine destek vermesini ve dönüşümün 90 günlük bir yol haritasıyla başlatılmasını öneriyor. PDF, web özetindeki her bulgunun doğrulanabileceği yetkili kaynaktır.",
    findings: [
      ["SaMD teslimatı çok katmanlıdır", "Klinik doğrulama, sistem entegrasyonu, değişiklik yönetimi, regülasyon ve güvenlik aynı teslimat zincirinde yönetilmelidir.", 3],
      ["İşletim modeli işlevler arası olmalıdır", "Yüksek performanslı model klinik, kalite, ürün, mühendislik ve güvenlik rollerini ortak yönetişim altında birleştirir.", 4],
      ["Kalite erkene taşınmalıdır", "Kalite kontrollerinin geliştirme sonuna bırakılması yerine gereksinim, tasarım ve sprint akışına yerleştirilmesi savunulur.", 5],
      ["Çevik kalite sprint içine gömülebilir", "Seri, geliştirme ritmi içinde uygulanabilecek yedi kalite ve doğrulama pratiğini bir araya getirir.", 6],
      ["Ajanik yapay zekâ bir kalite motoru olarak konumlanır", "Yapay zekâ ajanları kanıt toplama, izlenebilirlik ve sürekli doğrulama görevlerinde destekleyici rol üstlenir.", 8],
    ],
    implications: ["SaMD portföylerini yalnızca ürün yol haritasıyla değil, klinik kanıt ve kalite kapasitesiyle birlikte planlayın.", "Regülasyon, siber güvenlik ve doğrulamayı teslimat öncesi kapılar yerine sürekli çalışma akışları olarak tasarlayın."],
    methodology: "On sayfalık Türkçe infografik serisinin başlıkları, görsel çerçeveleri ve sayfa içi kaynak notları editoryal olarak incelenmiştir.",
    limitations: "İnfografik biçimi ayrıntılı teknik yöntem veya mevzuat görüşü yerine yönetici düzeyinde sentez sunar; uygulama kararları özgün PDF ve ilgili güncel düzenlemelerle doğrulanmalıdır.",
  },
  {
    filename: "turkiye_elektrik_fiyatlari_infografik_serisi.pdf",
    title: "Türkiye’de Elektrik Fiyatları",
    subtitle: "Avrupa karşılaştırması, 2022 enerji krizi ve sanayi rekabeti",
    dataPeriod: "2022–2027",
    pages: 10,
    regions: ["Türkiye", "Avrupa"],
    topics: ["Elektrik fiyatları", "Enerji", "Sanayi", "Rekabetçilik"],
    thesis: "Türkiye’nin görece düşük toptan elektrik fiyatları; enerji karması, fiyat oluşum mekanizması ve kur dinamiklerinin birlikte okunmasını gerektiriyor. Avantaj kalıcı bir sabit değil, maliyet ve sistem risklerine bağlı bir rekabet değişkenidir.",
    summary: "Seri, Türkiye’nin elektrik fiyatlarını Avrupa ile karşılaştırırken yalnızca seviye farkına değil, farkın hangi dönemde ve hangi mekanizmalarla oluştuğuna odaklanıyor. 2022 enerji krizinde Avrupa piyasalarındaki ayrışma, 2024–2027 dönemindeki yeni denge, üretim maliyetleri ile piyasa takas fiyatı arasındaki ilişki ve Türkiye’nin enerji karmasının rolü ayrı sayfalarda ele alınıyor. Düşük fiyatın yapısal nedenleri sanayi rekabeti açısından yorumlanırken kur, yakıt, yatırım ve sistem esnekliği kaynaklı kırılganlıklar da görünür kılınıyor. Son bölüm, fiyat avantajının korunması için enerji karması, şebeke ve piyasa tasarımını birlikte izleyen bir yönetim gündemi sunuyor.",
    findings: [
      ["Karşılaştırma dönem ve bant üzerinden yapılmalıdır", "Türkiye–Avrupa fiyat farkı tek bir ortalama yerine fiyat bantları ve zaman içindeki dalgalanmayla okunur.", 2],
      ["2022 krizi piyasa ayrışmasını hızlandırdı", "Enerji şoku, ülkelerin yakıt karması ve fiyat oluşum yapısına göre farklı maliyet patikaları üretmiştir.", 3],
      ["Üretim maliyeti ile piyasa fiyatı aynı şey değildir", "Yakıt maliyetleri, marjinal fiyatlama ve piyasa mekanizması arasındaki fark ayrıca değerlendirilir.", 5],
      ["Enerji karması görece avantaj yaratıyor", "Yerli ve yenilenebilir kaynakların bileşimi fiyat seviyesi ve oynaklık üzerinde belirleyicidir.", 6],
      ["Düşük fiyat sanayi için koşullu bir rekabet avantajıdır", "Avantajın sürdürülebilirliği şebeke yatırımı, arz güvenliği ve maliyet geçişkenliğine bağlıdır.", 8],
    ],
    implications: ["Enerji maliyet avantajını bütçelerde sabit varsayım olarak değil, senaryolu bir rekabet girdisi olarak yönetin.", "Şebeke, üretim karması ve piyasa tasarımı kararlarını sanayi politikasıyla birlikte değerlendirin."],
    methodology: "Karşılaştırmalı fiyat grafikleri, piyasa mekanizması şemaları ve sayfa içi kaynak notlarından oluşan on sayfalık infografik seri incelenmiştir.",
    limitations: "Fiyat karşılaştırmaları dönem, kur, vergi ve piyasa tanımı farklılıklarına duyarlıdır; özgün grafikteki kapsam notları sonuçlarla birlikte okunmalıdır.",
  },
  {
    filename: "uretkken_yapay_zeka_ekonomisi_10_infografik.pdf",
    title: "Üretken Yapay Zekânın Ekonomisi",
    subtitle: "İlk dalgadan sonra değer zinciri, sermaye ve hesaplama kapasitesi",
    dataPeriod: "2024–2035",
    pages: 10,
    regions: ["Küresel"],
    topics: ["Üretken yapay zekâ", "Yarı iletkenler", "Bulut", "Sermaye"],
    thesis: "Üretken yapay zekâ pazarı hızla büyürken ekonomik değer eşit dağılmıyor: kâr ve pazarlık gücü hâlâ yarı iletken, bulut, enerji ve hesaplama kapasitesine yakın katmanlarda yoğunlaşıyor.",
    summary: "Seri, üretken yapay zekâ ekonomisini uygulamalar, modeller, bulut, altyapı ve yarı iletkenlerden oluşan bir değer zinciri olarak ele alıyor. Uygulama katmanının kullanıcı ve şirket sayısı hızla büyürken kârlılık ve değer yakalama gücünün daha alt katmanlarda yoğunlaşabildiğini gösteriyor. Yarı iletkenlerde yüksek yoğunlaşma, altyapı katmanındaki rekabet, uygulama katmanının hızlı giriş ve çıkış dinamikleri, hiper ölçekleyicilerin sermaye harcamaları ve hesaplama kapasitesi fabrikaları ayrı başlıklarda inceleniyor. Son sayfa, önümüzdeki on yılda değer zincirinin yeniden şekillenebileceği senaryoları çerçeveliyor.",
    findings: [
      ["Değer zinciri büyüme ile kârı farklı katmanlarda topluyor", "Uygulama sayısı artarken ekonomik değerin önemli bölümü altyapı ve yarı iletken katmanlarında kalabiliyor.", 2],
      ["Büyüme hızı değer yakalamayı garanti etmiyor", "Uygulama katmanındaki hızlı genişleme, kalıcı marj ve savunulabilir konumla aynı anlama gelmiyor.", 3],
      ["Kâr ağırlık merkezi çiplere yakın", "Yarı iletken katmanındaki yoğunlaşma ve ölçek avantajı değer zincirinin kâr dağılımını etkiliyor.", 4],
      ["Uygulama katmanında seçenek çok, savunma zor", "Düşük giriş bariyerleri hızlı ürünleşme sağlarken farklılaşma ve müşteri tutma baskısını artırıyor.", 7],
      ["Hesaplama kapasitesi stratejik üretim altyapısına dönüşüyor", "Veri merkezi ve hızlandırıcı yatırımları, yapay zekâ kapasitesinin ölçeğini ve maliyetini belirliyor.", 9],
    ],
    implications: ["Yapay zekâ yatırımlarını yalnızca kullanıcı büyümesiyle değil, değer zincirindeki pazarlık gücü ve altyapı bağımlılığıyla değerlendirin.", "Uygulama stratejisinde veri avantajı, dağıtım, iş akışı entegrasyonu ve maliyet disiplini gibi savunulabilir unsurları öne çıkarın."],
    methodology: "On sayfalık infografik serideki değer zinciri şemaları, pazar karşılaştırmaları, sermaye harcaması grafikleri ve kaynak notları incelenmiştir.",
    limitations: "Hızla değişen pazar tahminleri ve şirket verileri zaman içinde güncellenebilir; ileriye dönük rakamlar senaryo olarak okunmalıdır.",
  },
  {
    filename: "kredi_uretim_sektorel_analiz_infografikleri.pdf",
    title: "Kredi Büyüyor, Üretim Aynı Yöne Gitmiyor",
    subtitle: "Kredi ile sektörel üretim arasındaki ayrışmalar",
    dataPeriod: "Raporda belirtilen dönem",
    pages: 10,
    regions: ["Türkiye"],
    topics: ["Kredi", "Sanayi üretimi", "Sektörel analiz", "Finansman"],
    thesis: "Kredi hacmindeki artış üretime otomatik olarak yansımıyor. Sektör bazında yön, zamanlama ve bilanço koşulları ayrıştığı için kredi büyümesi tek başına reel kapasite artışının güvenilir göstergesi değildir.",
    summary: "Seri, kredi ve üretim göstergelerini aynı eksende izleyerek sektörler arasındaki farklı hikâyeleri görünür kılıyor. Deri, tekstil ve giyimde kredi ile üretimin birlikte daralması; bazı sektörlerde kredi düşerken üretimin artması; ulaştırma araçları ve elektrikli teçhizat gibi alanlarda her iki göstergenin güçlenmesi; makine ve teçhizattaki belirgin ayrışma ayrı sayfalarda ele alınıyor. Takipteki alacakların dağılımı ve korelasyonun neden nedensellik anlamına gelmediği de analizin risk katmanını oluşturuyor. Sonuç, finansman kararlarında toplam kredi büyümesi yerine sektör, vade, kullanım amacı ve üretim çıktısının birlikte izlenmesi gerektiğidir.",
    findings: [
      ["Aynı kredi büyümesi farklı sektörel sonuçlar yaratıyor", "Sektörler kredi ve üretim yönü bakımından dört farklı kümeye ayrışıyor.", 3],
      ["Bazı sektörlerde kredi ve üretim birlikte daralıyor", "Deri ile tekstil-giyim örnekleri finansman ve faaliyet zayıflığının eşzamanlı görülebildiğini gösteriyor.", 4],
      ["Kredi azalırken üretim artabilir", "Bazı sektörler daha az krediyle üretimi artırarak bilanço ve verimlilik dinamiklerinin önemini ortaya koyuyor.", 5],
      ["Makine-teçhizat belirgin bir ayrışma sunuyor", "Üretim artışı ile kredi yönünün ayrılması, finansman göstergelerinin tek başına yorumlanmaması gerektiğini gösteriyor.", 7],
      ["Korelasyon nedensellik değildir", "Kredi, üretim, talep, maliyet ve bilanço koşulları arasındaki etkileşim için gecikme ve ters nedensellik riski dikkate alınmalıdır.", 9],
    ],
    implications: ["Kredi tahsisini toplam hacim hedefi yerine sektör bazlı üretim ve verimlilik göstergeleriyle yönetin.", "Erken uyarı sistemlerinde takipteki alacak, üretim ivmesi ve finansman kullanım amacını aynı görünümde birleştirin."],
    methodology: "On sayfalık sektörel infografik seride kredi ve üretim yönleri, sektör kümeleri, takipteki alacaklar ve korelasyon notları incelenmiştir.",
    limitations: "Korelasyonlar nedensellik göstermez; dönem tanımları, gecikmeler ve sektör sınıflamaları özgün PDF’deki kapsamla birlikte değerlendirilmelidir.",
  },
  {
    filename: "faizin_700_yillik_yolculugu_1310_2024_infografikler.pdf",
    title: "Faizin 700 Yıllık Yolculuğu",
    subtitle: "1310’dan 2024’e küresel faiz rejimleri",
    dataPeriod: "1310–2024",
    pages: 10,
    regions: ["Küresel", "Türkiye"],
    topics: ["Faiz", "Finans tarihi", "Para politikası", "Sermaye"],
    thesis: "Yedi yüzyıllık görünüm, faiz oranlarının uzun vadede gerilemesine rağmen savaş, enflasyon, finansal baskılama ve rejim kırılmalarının bu eğilimi defalarca tersine çevirdiğini gösteriyor.",
    summary: "Seri, nominal ve reel faiz oranlarının 1310–2024 arasındaki uzun dönemli yolculuğunu tarihsel kırılmalar üzerinden anlatıyor. Orta Çağ ticaret merkezlerinden finansal devrime, sanayileşmeden yirminci yüzyıl savaş ve enflasyon dönemlerine, yirmi birinci yüzyıl düşük reel faiz ortamından 2020 sonrası tersine dönüşe uzanan bir çerçeve kuruluyor. Kurumsal güven, sermaye derinliği, devlet borçlanması, para rejimleri ve demografi gibi etkenlerin faiz oluşumuyla ilişkisi vurgulanıyor. Son sayfa, uzun vadede düşük faizin kesin bir kural olmadığı ve Türkiye gibi yüksek enflasyon deneyimi olan ekonomilerde reel faiz, kur ve güven unsurlarının birlikte izlenmesi gerektiği sonucuna varıyor.",
    findings: [
      ["Uzun dönem eğilimi aşağı, yolculuk doğrusal değil", "Yüzyıllar boyunca faizler gerilerken kriz ve rejim değişimleri keskin sapmalar yaratmıştır.", 1],
      ["Finansal devrim borçlanma maliyetlerini değiştirdi", "1500–1700 döneminde kurumsallaşma ve finans merkezlerinin yükselişi faiz dinamiklerinde belirleyici oldu.", 4],
      ["Savaş, enflasyon ve finansal baskılama kırılma yarattı", "Yirminci yüzyılın jeopolitik ve parasal şokları uzun dönemli düşüş eğilimini bozdu.", 6],
      ["Yirmi birinci yüzyılda reel faizleri çoklu faktörler aşağı çekti", "Demografi, tasarruf, büyüme, güvenli varlık talebi ve para politikası birlikte ele alınıyor.", 7],
      ["2020 sonrasında yön yeniden değişti", "Enflasyon şoku ve politika sıkılaşması, uzun süreli düşük faiz anlatısına karşı yeni bir rejim ihtimalini gündeme getirdi.", 9],
    ],
    implications: ["Sermaye maliyeti varsayımlarını tek bir tarihsel ortalamaya değil, farklı enflasyon ve güven rejimlerine göre stres testine tabi tutun.", "Uzun vadeli yatırım kararlarında nominal faiz kadar reel faiz, kur oynaklığı ve finansman erişimini birlikte izleyin."],
    methodology: "Tarihsel faiz serilerini dönemsel anlatı, kurumsal gelişmeler ve makroekonomik kırılmalarla birleştiren on sayfalık infografik seri incelenmiştir.",
    limitations: "Yedi yüzyıllık karşılaştırmalar farklı piyasa, borçlu, vade ve veri kalitesi tanımlarını bir araya getirir; doğrudan dönemler arası kıyas temkinle yapılmalıdır.",
  },
  {
    filename: "turkiye_is_gucu_piyasasinda_buyuk_makas_infografikler.pdf",
    title: "Türkiye İş Gücü Piyasasında Büyük Makas",
    subtitle: "Kaybolan ve oluşan işlerin sektörel, bölgesel ve beceri haritası",
    dataPeriod: "2022–2024",
    pages: 10,
    regions: ["Türkiye"],
    topics: ["İş gücü", "İstihdam", "Beceriler", "Bölgesel ekonomi"],
    thesis: "Türkiye’de istihdam dönüşümü toplam iş sayısından daha derin bir mesele: kaybolan ve oluşan işler sektör, bölge ve beceri bakımından örtüşmediği için büyüme aynı anda hem açık pozisyon hem işsizlik üretebilir.",
    summary: "Seri, 2022–2024 döneminde istihdam kaybeden ve kazanan sektörler arasındaki makası analiz ediyor. Kayıpların ve kazanımların sektör haritası çıkarılıyor; çalışanların hangi sektörlere yöneldiği, dönüşümü tetikleyen teknoloji, talep, maliyet ve demografi unsurları ele alınıyor. Temel bulgu, kaybolan işlerle oluşan işlerin aynı nitelikte olmadığıdır. Bölgesel yoğunlaşma ve hareketlilik sınırlamaları uyumsuzluğu büyütürken verimlilik, ücretler, yatırım kompozisyonu ve sosyal denge üzerinden makroekonomik etkiler oluşuyor. Üç senaryo ve stratejik gündem, beceri dönüşümü ile bölgesel istihdam politikalarının birlikte tasarlanmasını öneriyor.",
    findings: [
      ["İstihdam kayıpları belirli sektörlerde yoğunlaşıyor", "Kayıp haritası dönüşümün sektörler arasında eşit dağılmadığını gösteriyor.", 2],
      ["Kazanan sektörler farklı bir beceri bileşimi talep ediyor", "İstihdam artışı görülen alanlar, kayıp yaşayan sektörlerdeki deneyimi doğrudan ikame etmiyor.", 3],
      ["Sektörler arası rota sessiz ama yapısal", "Çalışan geçişleri talep, teknoloji, maliyet ve beceri uyumu tarafından şekilleniyor.", 4],
      ["Kaybolan işler ile oluşan işler aynı değil", "Meslek, beceri, ücret ve konum farkları toplam istihdam artışının altında uyumsuzluk yaratıyor.", 6],
      ["Bölgesel etki dönüşüm maliyetini büyütüyor", "İş kaybı ve iş yaratımının farklı bölgelerde yoğunlaşması hareketlilik ve eğitim kapasitesini kritik hâle getiriyor.", 7],
    ],
    implications: ["İstihdam politikalarını net iş sayısı yerine meslek, beceri, ücret ve bölge eşleşmesi üzerinden yönetin.", "Şirketlerin işe alım planlarını yeniden beceri kazandırma, bölgesel yetenek havuzları ve üretkenlik hedefleriyle bağlayın."],
    methodology: "On sayfalık seri; sektörel istihdam kayıp ve kazanımları, hareket rotaları, bölgesel dağılım, makro yansımalar ve senaryolar üzerinden incelenmiştir.",
    limitations: "İstihdam dönüşümü veri revizyonlarına, sektör sınıflamasına ve incelenen döneme duyarlıdır; toplam değişim bireysel geçişleri bire bir izlemeyebilir.",
  },
  {
    filename: "genc_yazilimcilar_is_piyasasi_infografik_serisi.pdf",
    title: "Genç Yazılımcılar İçin Zor Bir İş Piyasası",
    subtitle: "Deneyim primi, yapay zekâ ve giriş seviyesi yetenek hattı",
    dataPeriod: "2019–2026",
    pages: 10,
    regions: ["Küresel"],
    topics: ["Yazılım", "İş gücü", "Yapay zekâ", "Beceriler"],
    thesis: "Yapay zekâ yazılım işlerini ortadan kaldırmaktan çok görevleri yeniden dağıtırken deneyim primini yükseltiyor. Giriş seviyesi istihdamın daralması, şirketlerin gelecekteki kıdemli yetenek hattını da zayıflatabilir.",
    summary: "Seri, yazılım iş piyasasındaki yaş ve deneyim bazlı ayrışmayı inceliyor. Genç geliştiricilerin işe girişte daha fazla zorlanması; kıdemli yeteneklere yönelik talebin ve ücret priminin güçlenmesi; yapay zekânın kod yazma, test, dokümantasyon ve problem çözme görevlerini farklı biçimlerde yeniden dağıtması ele alınıyor. Giriş seviyesi işe alım hunisinin daralması kısa vadeli verimlilik sağlasa da gelecekte kıdemli çalışan yetiştirme kapasitesini azaltabilir. Öneriler, beceri kombinasyonları, on iki aylık gelişim planı ve şirketler, üniversiteler ile kamu için ortak çözüm seti etrafında yapılandırılıyor.",
    findings: [
      ["Yaş ve deneyim bazlı sert ayrışma var", "İstihdam ve talep eğilimleri genç çalışanlarla deneyimli geliştiriciler arasında farklılaşıyor.", 2],
      ["Deneyim primi yükseliyor", "Şirketler belirsizlik ve yapay zekâ dönüşümü altında mimari, bağlam ve karar deneyimine daha fazla değer veriyor.", 4],
      ["Yapay zekâ görevleri yeniden dağıtıyor", "Rutin kod üretimi ile yüksek bağlam, doğrulama ve sistem tasarımı gerektiren işler farklı etkileniyor.", 5],
      ["Giriş seviyesi işe alım hunisi daralıyor", "Daha az başlangıç rolü, uzun vadede kıdemli yetenek yetiştiren organizasyonel hattı zayıflatabilir.", 6],
      ["Teknik ve tamamlayıcı becerilerin kombinasyonu yükseliyor", "Alan bilgisi, ürün düşüncesi, iletişim, veri ve yapay zekâ araçlarını birlikte kullanma kapasitesi öne çıkıyor.", 7],
    ],
    implications: ["Kısa vadeli otomasyon kazancını, genç yeteneğin yetişme hattını koruyacak çıraklık ve mentorluk modelleriyle dengeleyin.", "İşe alım ve gelişim ölçütlerini yalnızca kod üretim hızından sistem düşüncesi, doğrulama ve iş bağlamına doğru genişletin."],
    methodology: "On sayfalık infografik seride iş gücü trendleri, deneyim primi, görev dönüşümü, işe alım hunisi ve politika önerileri incelenmiştir.",
    limitations: "Yazılım iş piyasası bölge, uzmanlık ve şirket ölçeğine göre önemli farklılıklar gösterir; ileriye dönük senaryolar kesin tahmin değildir.",
  },
  {
    filename: "Turkiye_Sanayi_Dinamikleri_2014_2026_Infografik_Serisi.pdf",
    title: "Türkiye Sanayi Dinamikleri 2014–2026",
    subtitle: "Üretim grupları, 2020 kırılması ve stratejik ayrışmalar",
    dataPeriod: "2014–2026",
    pages: 10,
    regions: ["Türkiye"],
    topics: ["Sanayi", "Üretim", "Yatırım malları", "Ulaştırma"],
    thesis: "Türkiye sanayisinin toplam görünümü, alt gruplar arasındaki belirgin ayrışmayı gizliyor. Tüketim, ara, yatırım ve ulaştırma malları farklı hızlarda ilerlediği için strateji endeks seviyesinden sektör yapısına inmelidir.",
    summary: "Seri, 2014–2026 döneminde Türkiye sanayi üretimini kullanım amacı ve sektör grupları üzerinden karşılaştırıyor. Tüketim, yatırım ve ara mallarının eğilimleri; ana metal, motorlu kara taşıtları ve diğer ulaşım araçlarının ayrı performansları inceleniyor. 2020 kırılması tüm serilerde ortak bir şok yaratmış olsa da toparlanma biçimleri aynı değil. Özellikle diğer ulaşım araçlarındaki belirgin yükseliş ile daha sınırlı veya dalgalı kalan gruplar, sanayi politikasının tek bir toplam endekse dayanamayacağını gösteriyor. Son sayfa, sektör seçimi, yatırım, tedarik zinciri ve dayanıklılık için stratejik çıkarımları bir araya getiriyor.",
    findings: [
      ["Toplam endeks alt sektör ayrışmasını gizliyor", "Tüketim, ara ve yatırım malları aynı dönemde farklı ivme ve oynaklık sergiliyor.", 2],
      ["Yatırım malları kapasite sinyali taşıyor", "Yatırım mallarının seyri gelecekteki üretim kapasitesi ve sermaye iştahı açısından ayrı izleniyor.", 4],
      ["Ana metal döngüsel ve dış etkenlere duyarlı", "Ana metal üretimindeki dalgalanma maliyet, talep ve küresel çevrimle birlikte ele alınıyor.", 6],
      ["Diğer ulaşım araçları belirgin biçimde ayrışıyor", "Seri, bu grubun uzun dönem içinde en güçlü yukarı yönlü performanslardan birini gösterdiğini vurguluyor.", 8],
      ["2020 ortak şok, farklı toparlanmalar yarattı", "Kırılma sonrasında alt sektörlerin hız ve dayanıklılık bakımından farklı patikalara girdiği görülüyor.", 9],
    ],
    implications: ["Sermaye tahsisini toplam sanayi büyümesi yerine alt sektör ivmesi, ihracat bağlantısı ve tedarik zinciri kapasitesiyle yönetin.", "2020 sonrası dayanıklılık farklarını yeni kapasite, yerelleşme ve portföy kararlarında açık bir seçim ölçütüne dönüştürün."],
    methodology: "On sayfalık seride 2014–2026 endeks grafikleri kullanım amacı ve seçili sektör grupları bazında karşılaştırılmıştır.",
    limitations: "Endeks serileri düzey yerine göreli değişimi gösterir; baz yılı, mevsimsellik ve veri revizyonları özgün kaynak notlarıyla birlikte okunmalıdır.",
  },
  {
    filename: "Uzay_Rekabeti_ve_Yeni_Uzay_Ekonomisi_10_Infografik.pdf",
    title: "Uzay Rekabeti ve Yeni Uzay Ekonomisi",
    subtitle: "Fırlatma, uydu, savunma, veri ve 2035 senaryoları",
    dataPeriod: "2024–2035",
    pages: 10,
    regions: ["Küresel"],
    topics: ["Uzay ekonomisi", "Uydu", "Savunma", "Yatırım"],
    thesis: "Yeni uzay ekonomisi, fırlatma maliyetlerinin ötesinde uydu verisi, bağlantı, savunma, ay görevleri ve özel sermayenin birleştiği stratejik bir altyapı yarışına dönüşüyor.",
    summary: "Seri, yeni uzay ekonomisini on katmanda inceliyor: küresel rekabet, fırlatma pazarı, uydu ekonomisi, savunma ve çift kullanım, Ay ve derin uzay, özel şirketler, veri ve hizmet ekonomisi, yatırım finansmanı, risk ve düzenleme ile 2035 senaryoları. Değerin yalnızca roket üretiminde değil, veri, bağlantı ve aşağı akış hizmetlerinde oluştuğu vurgulanıyor. Kamu talebi ile özel sermaye birbirini güçlendirirken jeopolitik, enkaz, siber güvenlik ve düzenleme riskleri yatırım tezinin ayrılmaz parçası hâline geliyor. Son sayfa, 2035’e uzanan farklı büyüme ve rekabet senaryolarını stratejik yol haritasına bağlıyor.",
    findings: [
      ["Fırlatma pazarı yeni oyuncularla yeniden şekilleniyor", "Yeniden kullanılabilirlik, kapasite ve maliyet rekabeti pazara giriş ve ölçek dinamiklerini değiştiriyor.", 2],
      ["Uydu ekonomisinin değeri hizmet katmanında genişliyor", "Bağlantı, gözlem ve veri hizmetleri donanımın ötesinde sürekli gelir modelleri yaratıyor.", 3],
      ["Savunma ve çift kullanım merkezi bir talep kaynağıdır", "Uzay altyapısı güvenlik, haberleşme ve gözlem amaçları arasında giderek daha fazla ortaklaşmaktadır.", 4],
      ["Özel şirketler yeni aktör ekosistemi kuruyor", "Girişimler ve ölçeklenen şirketler kamu programlarının yanında yeni uzmanlık ve sermaye kanalları oluşturuyor.", 6],
      ["Risk ve düzenleme büyümenin ayrılmaz parçasıdır", "Enkaz, siber güvenlik, spektrum, lisanslama ve jeopolitik bağımlılıklar birlikte yönetilmelidir.", 9],
    ],
    implications: ["Uzay stratejisini yalnızca donanım üretimiyle değil, veri hakları, hizmet katmanı ve kamu talebi üzerinden tasarlayın.", "Yatırım portföylerinde teknoloji riski kadar düzenleme, sigorta, siber güvenlik ve jeopolitik bağımlılıkları değerlendirin."],
    methodology: "On sayfalık infografik seri; pazar haritaları, aktör karşılaştırmaları, yatırım görünümü, risk çerçevesi ve 2035 senaryoları üzerinden incelenmiştir.",
    limitations: "Uzay pazarı tahminleri hızlı teknolojik değişime ve kamu programlarına duyarlıdır; ileriye dönük büyüklükler senaryo olarak değerlendirilmelidir.",
  },
  {
    filename: "Powering_Intelligence_2026_TR_Infografik_Serisi.pdf",
    title: "Powering Intelligence 2026",
    subtitle: "ABD veri merkezlerinin yeni enerji çağı",
    dataPeriod: "2021–2030",
    pages: 27,
    regions: ["ABD"],
    topics: ["Veri merkezleri", "Elektrik", "Yapay zekâ", "Şebeke"],
    thesis: "Yapay zekâ veri merkezleri elektrik talebini yalnızca büyütmüyor; talebin konumunu, pik profilini ve şebekeye bağlanma hızını değiştiriyor. Enerji stratejisi artık yapay zekâ kapasite stratejisinin bir parçasıdır.",
    summary: "Yirmi yedi sayfalık seri, ABD veri merkezlerinin elektrik sistemine etkisini talep tahmini, verimlilik, coğrafya, şebeke kuyruğu ve yatırım seçenekleri üzerinden inceliyor. Veri merkezi gücünün nasıl ölçüldüğü ve PUE gibi verimlilik ölçütleri açıklanıyor; proje talebinin şebeke tahminlerine nasıl çevrildiği gösteriliyor. 2021–2030 kapasite artışı, elektrik tüketimindeki çok katlı büyüme, pik yük ve iş modeline göre değişen tüketim profilleri ele alınıyor. Eyalet bazlı paylar, beş büyüme arketipi, kurum tahminlerindeki farklar, bağlantı bekleme süreleri ve kampüs yatırım yükleri talebin nerede sıkışabileceğini ortaya koyuyor. Son bölüm, arzın nasıl karşılanacağı, beş stratejik güç erişimi yolu ve 2026–2030 erken uyarı kontrol kulesini sunuyor.",
    findings: [
      ["Veri merkezi gücü tek bir sayı değildir", "Nominal kapasite, gerçek yük, kullanım ve verimlilik ölçütleri birlikte ele alınmadan talep doğru okunamaz.", 3],
      ["Kapasite 2021–2030 döneminde keskin biçimde artıyor", "Yeni kampüsler ve yapay zekâ iş yükleri veri merkezi kapasitesinde çok katlı büyüme yaratıyor.", 7],
      ["Elektrik tüketimi iki ila dört kat artabilir", "Senaryolar, yapay zekâ benimsemesi ve verimlilik varsayımlarına bağlı geniş bir talep aralığı gösteriyor.", 8],
      ["Coğrafya ve iş modeli yük profilini değiştiriyor", "Eyalet karması, kampüs ölçeği ve iş yükü türü toplam tüketim kadar pik ve süreklilik ihtiyacını da belirliyor.", 10],
      ["Bağlantı kuyruğu büyümenin gerçek engelidir", "Şebeke bağlantı süreleri, ekipman ve izin süreçleri hazır hesaplama kapasitesini geciktirebilir.", 23],
      ["Erken uyarı göstergeleri birlikte izlenmelidir", "Proje kuyruğu, bağlantı süresi, ekipman, fiyat ve politika sinyalleri 2026–2030 kontrol kulesinde birleştirilir.", 26],
    ],
    implications: ["Yapay zekâ kapasite planını enerji tedariki, bağlantı takvimi ve coğrafi portföyle aynı yatırım komitesinde yönetin.", "Talep tahminlerini nominal kapasite yerine kullanım, PUE, pik profil ve proje gerçekleşme olasılığıyla düzeltin."],
    methodology: "Yirmi yedi sayfalık infografik seri; kapasite, tüketim, eyalet dağılımı, tahmin karşılaştırması, bağlantı bekleme süreleri ve stratejik seçenekleri bir araya getirir.",
    limitations: "2030 tahminleri kurum, veri merkezi tanımı, kullanım ve verimlilik varsayımlarına göre değişir; senaryo aralıkları kesin sonuç değildir.",
  },
  {
    filename: "Bilim_Yeni_Bir_Altin_Cag_Infografik_Serisi_25_Sayfa.pdf",
    title: "Bilim: Yeni Bir Altın Çağ",
    subtitle: "Finansman, kurumlar, yapay zekâ ve yeni bilim ekonomisi",
    dataPeriod: "2000–2026",
    pages: 25,
    regions: ["Küresel", "ABD"],
    topics: ["Bilim politikası", "Ar-Ge", "Yapay zekâ", "İnovasyon"],
    thesis: "Bilimde yeni bir altın çağ ihtimali daha fazla harcamadan ibaret değil; finansman, yetenek, ulusal laboratuvarlar, veri altyapısı, yapay zekâ doğrulaması ve yayın teşviklerinin birlikte yeniden tasarlanmasına bağlı.",
    summary: "Yirmi beş sayfalık seri, bilim sisteminin finansman ve üretkenlik açmazlarından başlayarak kurumsal reform gündemine ilerliyor. Ar-Ge finansmanının yeni haritası, küresel rekabet, bilim makinesindeki yavaşlama ve yetenek darboğazları ele alınıyor. Teknoloji liderliği keşif, ölçekleme ve üretim arasındaki bağla açıklanırken çıktı sayısı yerine etki odaklı inovasyon savunuluyor. Ulusal laboratuvarlar, görev odaklı programlar, ön-rekabetçi konsorsiyumlar, şehir ve eyalet laboratuvarları, sanat-bilim ilişkisi, otonom laboratuvarlar ve veri omurgası yeni kurum modelleri olarak inceleniyor. Son bölümde altın standart bilim, yapay zekâ ile sürekli doğrulama, ispat yardımcıları, bilimsel yayının yeniden tasarımı ve yeni bilim ekonomisi birlikte çerçeveleniyor.",
    findings: [
      ["Ar-Ge finansmanı büyürken harita değişiyor", "Kamu, üniversite ve özel sektör finansmanı arasındaki denge ile coğrafi rekabet birlikte dönüşüyor.", 3],
      ["Bilim makinesi darboğazlarla karşılaşıyor", "Finansman hacmi tek başına araştırma üretkenliği, hız ve etki sorunlarını çözmüyor.", 5],
      ["Teknoloji liderliği keşif, ölçekleme ve üretim bağlantısıdır", "Bilimsel sonuçların ekonomik ve stratejik değere dönüşmesi kurumlar arası geçiş kapasitesine bağlıdır.", 7],
      ["Veri omurgası bilim bulutuna dönüşüyor", "Ortak veri, hesaplama, standart ve erişim katmanları araştırma sisteminin temel altyapısı olarak ele alınıyor.", 19],
      ["Otonom laboratuvarlar deney döngüsünü hızlandırabilir", "Robotik, yapay zekâ ve kapalı döngü deney tasarımı bilimsel keşif sürecini yeniden biçimlendiriyor.", 20],
      ["Bilimsel yayın teşvikleri yeniden tasarlanmalıdır", "Doğrulama, veri paylaşımı, yeniden üretilebilirlik ve etki ölçütleri yayın sisteminin merkezine taşınıyor.", 24],
    ],
    implications: ["Bilim ve inovasyon portföylerini yalnızca bütçe büyüklüğüyle değil, keşiften ölçeğe geçiş süresi ve doğrulama kalitesiyle yönetin.", "Yapay zekâ yatırımlarını ortak veri altyapısı, laboratuvar otomasyonu ve açık doğrulama standartlarıyla destekleyin."],
    methodology: "Yirmi beş sayfalık infografik seri; finansman grafikleri, kurum modelleri, yetenek ve coğrafya çerçeveleri ile yapay zekâ destekli bilim araçlarını sentezler.",
    limitations: "Kurum örnekleri farklı ülke ve disiplin bağlamlarından gelir; öneriler yerel düzenleme, araştırma etiği ve alan gereksinimlerine uyarlanmalıdır.",
  },
  {
    filename: "Haziran_2026_Ekonomik_Gorunum_10_Infografik.pdf",
    title: "Haziran 2026 Ekonomik Görünüm",
    subtitle: "Küresel belirsizlik, enerji şoku ve şirket dayanıklılığı",
    dataPeriod: "Haziran 2026",
    pages: 10,
    regions: ["Küresel", "Türkiye"],
    topics: ["Ekonomik görünüm", "Enerji", "Jeopolitik risk", "Dayanıklılık"],
    thesis: "Haziran 2026 görünümü, enerji ve jeopolitik risklerin kırılgan beklentilerle birleştiği bir ortam tarif ediyor. Şirketler için öncelik büyüme tahmininden önce operasyonel dayanıklılık ve senaryo disiplinidir.",
    summary: "Seri, Haziran 2026 ekonomik görünümünü küresel belirsizlik, enerji fiyatları ve güven göstergeleri üzerinden özetliyor. Mevcut durum ekonomik algının sert biçimde bozulduğunu; önümüzdeki altı aya ilişkin beklentilerin dengeli görünse de kırılgan kaldığını gösteriyor. İki yıllık senaryo çerçevesi enerji şoku, jeopolitik parçalanma ve politika tepkilerinin farklı büyüme yolları yaratabileceğini ele alıyor. Bölgesel risk haritası Hürmüz ve Orta Doğu kaynaklı aktarım kanallarını; şirket etkileri ise maliyet, tedarik, talep ve finansman baskılarını görünür kılıyor. Son üç sayfa operasyonel dayanıklılık, savunma ağırlıklı yatırım davranışı ve 2026’nın ikinci yarısı için izleme gündemi sunuyor.",
    findings: [
      ["Ekonomik algı sert biçimde bozuldu", "Mevcut durum göstergeleri, belirsizlik ve risk algısındaki belirgin artışı yansıtıyor.", 2],
      ["Altı aylık beklentiler dengeli ama kırılgan", "Beklentiler tek yönlü bir çöküşten çok, şoklara açık dar bir dengeye işaret ediyor.", 3],
      ["Enerji şoku iki yıllık senaryoları ayrıştırıyor", "Enerji maliyeti, jeopolitik parçalanma ve politika tepkileri farklı büyüme patikaları oluşturuyor.", 4],
      ["Bölgesel risk küresel operasyonlara taşınıyor", "Hürmüz ve Orta Doğu kaynaklı riskler enerji, navlun, tedarik ve güven kanalları üzerinden yayılıyor.", 6],
      ["Yatırım davranışı büyümeden önce savunmaya dönüyor", "Likidite, dayanıklılık ve seçici kapasite yatırımları belirsizlik ortamında öne çıkıyor.", 9],
    ],
    implications: ["2026’nın ikinci yarısı için bütçe ve nakit planlarını enerji, tedarik ve finansman şoklarını içeren en az üç senaryoyla yönetin.", "Dayanıklılık yatırımlarını maliyet kalemi değil, hizmet sürekliliği ve stratejik opsiyon değeri olarak değerlendirin."],
    methodology: "On sayfalık görünüm; ekonomik algı ve beklenti göstergelerini senaryo, bölgesel risk, şirket etkileri ve operasyonel yanıt çerçeveleriyle birleştirir.",
    limitations: "Haziran 2026 görünümü hızlı değişen enerji, jeopolitik ve politika koşullarına duyarlıdır; göstergeler yayımlandıkları dönem bağlamında okunmalıdır.",
  },
  {
    filename: "Kentlesen_Dunya_10_Infografik.pdf",
    title: "Kentleşen Dünya",
    subtitle: "Yüz yıllık dönüşümden 2050 stratejik gündemine",
    dataPeriod: "1950–2050",
    pages: 10,
    regions: ["Küresel", "Türkiye"],
    topics: ["Kentleşme", "Altyapı", "Konut", "İklim"],
    thesis: "Kentleşme ekonomik yoğunluk ve yenilik üretirken konut, altyapı, eşitsizlik ve iklim baskılarını da büyütüyor. 2050’ye giden yol, nüfus artışından çok kentlerin nasıl yönetildiğiyle belirlenecek.",
    summary: "Seri, 1950’den 2050’ye kentleşmenin küresel ölçeğini ve bölgesel farklılıklarını ele alıyor. Bir yüzyıllık dönüşüm, mega kentlerin yükselişi ve kentleşme ile ekonomik güç arasındaki ilişki açıklandıktan sonra konut, altyapı ve sosyal eşitsizlik baskıları inceleniyor. İklim, dayanıklılık ve yaşanabilirlik ayrı bir stratejik katman oluşturuyor. Türkiye bölümü kentleşme oranı, nüfusun mekânsal dağılımı ve büyükşehir yapısını özetliyor. Son sayfa, 2030–2050 döneminde altyapı yatırımı, uygun fiyatlı konut, erişim, dijital kapasite ve iklim dayanıklılığını aynı kentsel gündemde birleştiriyor.",
    findings: [
      ["Kentleşme yüz yıllık yapısal bir dönüşümdür", "Kentsel nüfusun payı ve ölçeği 1950’den 2050’ye belirgin biçimde yükseliyor.", 2],
      ["Bölgesel kentleşme patikaları ayrışıyor", "Olgun kent sistemleri ile hızlı büyüyen bölgeler farklı altyapı ve finansman ihtiyaçları taşıyor.", 3],
      ["Mega kentler ekonomik ve yönetsel ölçeği büyütüyor", "Büyük kentsel yığılmalar üretkenlik fırsatı yaratırken hizmet, ulaşım ve risk yönetimini zorlaştırıyor.", 4],
      ["Konut ve altyapı baskısı birlikte artıyor", "Uygun fiyat, erişim, ulaşım, su ve temel hizmet kapasitesi ortak bir yatırım sorunu hâline geliyor.", 6],
      ["İklim dayanıklılığı yaşanabilirliğin parçasıdır", "Aşırı sıcak, sel, hava kalitesi ve yeşil alan kent stratejisinde bütünleşik biçimde ele alınmalıdır.", 8],
      ["Türkiye’de kentleşme büyükşehir yoğunlaşmasıyla ilerliyor", "Nüfusun metropollerde toplanması üretkenlik fırsatları kadar bölgesel denge ve altyapı baskısı yaratıyor.", 9],
    ],
    implications: ["Kentsel yatırım kararlarını arazi, konut, ulaşım, su, enerji ve dijital altyapıyı tek portföyde ele alarak yönetin.", "2050 planlarında nüfus projeksiyonlarının yanına erişilebilirlik, dayanıklılık ve hizmet kalitesi göstergelerini ekleyin."],
    methodology: "On sayfalık infografik seri; tarihsel kentleşme, bölgesel görünüm, mega kentler, ekonomik güç, altyapı, eşitsizlik, iklim ve Türkiye verilerini birleştirir.",
    limitations: "2050 değerleri projeksiyondur; kent tanımları ve idari sınırlar ülkeler arasında farklılaşabilir.",
  },
];

const headers = {
  "OAI-Sites-Authorization": `Bearer ${token}`,
};

async function responseJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Expected JSON from ${response.url}, received ${response.status} ${response.statusText}.`);
  }
}

async function fetchWithRetry(url, options, attempts = 4) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (response.status < 500 || attempt === attempts) return response;
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise(resolve => setTimeout(resolve, attempt * 750));
  }
  throw lastError;
}

const publishedResponse = await fetchWithRetry(`${siteUrl}/api/pdf-insights?status=published`, { headers });
const publishedData = await responseJson(publishedResponse);
if (!publishedResponse.ok) throw new Error(`Could not read the publication library: ${JSON.stringify(publishedData)}`);
const publishedTitles = new Set((publishedData.insights ?? []).map(insight => insight.title));

for (const publication of publications) {
  if (publishedTitles.has(publication.title)) {
    console.log(`SKIP ${publication.title}: already published`);
    continue;
  }
  const bytes = await readFile(join(sourceDir, publication.filename));
  const uploadId = crypto.randomUUID();
  const chunkSize = 300 * 1024;
  const chunkCount = Math.ceil(bytes.byteLength / chunkSize);
  const requestChunked = async (payload) => {
    const response = await fetchWithRetry(`${siteUrl}/api/pdf-insights/chunked`, {
      method: "POST",
      headers: { ...headers, "content-type": "application/json" },
      body: JSON.stringify({ uploadId, editor: editorEmail, ingestKey, ...payload }),
    });
    const data = await responseJson(response);
    return { response, data };
  };
  let step = await requestChunked({
    action: "init",
    filename: publication.filename,
    language: "tr",
    fileSize: bytes.byteLength,
    chunkCount,
  });
  if (!step.response.ok) throw new Error(`Upload initialization failed for ${publication.filename}: ${JSON.stringify(step.data)}`);
  for (let index = 0; index < chunkCount; index += 1) {
    const start = index * chunkSize;
    const data = bytes.subarray(start, Math.min(start + chunkSize, bytes.byteLength)).toString("base64");
    step = await requestChunked({ action: "chunk", index, data });
    if (!step.response.ok) throw new Error(`Chunk ${index} failed for ${publication.filename}: ${JSON.stringify(step.data)}`);
  }
  step = await requestChunked({ action: "complete" });
  const uploadResponse = step.response;
  const upload = step.data;
  if (!uploadResponse.ok) {
    if (String(upload.error).startsWith("Duplicate document:")) {
      console.log(`SKIP ${publication.filename}: ${upload.error}`);
      continue;
    }
    throw new Error(`Upload failed for ${publication.filename}: ${JSON.stringify(upload)}`);
  }

  const id = upload.uploaded[0].id;
  const body = {
    id,
    editor: editorEmail,
    ingestKey,
    language: "tr",
    title: publication.title,
    subtitle: publication.subtitle,
    shortTitle: publication.title,
    contentType: "Infographic Series",
    status: "published",
    author: "",
    publicationDate: null,
    dataPeriod: publication.dataPeriod,
    pageCount: publication.pages,
    readingTime: Math.max(4, Math.round(publication.pages * 0.8)),
    executiveThesis: publication.thesis,
    shortSummary: publication.thesis,
    executiveSummary: publication.summary,
    keyFindings: publication.findings.map(([title, explanation, page]) => ({ title, explanation, page })),
    leadershipImplications: publication.implications,
    strategicQuestions: [],
    methodology: publication.methodology,
    limitations: publication.limitations,
    regions: publication.regions,
    topics: publication.topics,
    expertise: ["Strategic Intelligence"],
    keywords: publication.topics,
    gatingModel: "fully_ungated",
    aiRetrievalApproved: false,
    rightsConfirmed: true,
    confidentialityReviewed: true,
    personalDataReviewed: true,
    sourcesReviewed: true,
    translationReviewed: true,
    finalApproval: true,
  };
  const patchResponse = await fetchWithRetry(`${siteUrl}/api/pdf-insights`, {
    method: "PATCH",
    headers: { ...headers, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const patch = await responseJson(patchResponse);
  if (!patchResponse.ok) {
    throw new Error(`Publish failed for ${publication.filename}: ${JSON.stringify(patch)}`);
  }
  console.log(`PUBLISHED ${publication.title} (${id})`);
  publishedTitles.add(publication.title);
}
