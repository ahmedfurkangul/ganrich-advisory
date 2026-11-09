import { advisoryMeta } from "../../advisory-meta";
import { guideByKey } from "../../guides-content";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Site from "../../site";
import { insightArticles, insightCategoryForKind, insightIndex, Lang, pageKind, routeMap } from "../../content";
import { absoluteUrl, metaDescription, SITE_NAME, SITE_ORIGIN } from "../../site-config";
import { breadcrumbParent, FOUNDER_SAME_AS, founderName, ids, offeringNodes, organizationNode, pageKeywords, webPageNode, websiteNode } from "../../structured-data";

const OG_CARD_VERSION = "2";

type Props = { params: Promise<{ lang: string; slug?: string[] }> };

const metaCopy = {
  en: {
    home: ["CBAM, CRA & EU Readiness for Turkish Industry | Ganrich", "Independent decision partner for Turkish exporters facing CBAM, the Cyber Resilience Act, EUDR and other EU buyer requirements: what to do, when and at what cost."],
    buyerDesk: ["EU Buyer Request Desk | Ganrich Advisory", "One independent desk for the CBAM, EUDR, packaging, forced labour and cyber questions your EU buyers send: sorted, decided with you and answered consistently."],
    toolSelection: ["Compliance Tool and Verifier Selection | Ganrich Advisory", "A short, vendor-neutral sprint to choose CBAM, EUDR or product passport software and a verifier. No vendor fees, no commissions, a written recommendation."],
    incentiveFile: ["Green Transition Incentive and Finance File | Ganrich", "Turn the EU compliance work you must do anyway into a credible application for Turkish green transition support or bank green finance."],
    cohortProgramme: ["Exporter Cohort Programme | Ganrich Advisory", "A group EU readiness programme run with an exporter association, industrial zone or chamber: shared sessions and company-by-company decisions."],
    marketAccessDirector: ["Part-time EU Market Access Director | Ganrich Advisory", "Senior, part-time ownership of EU rules and buyer requirements for mid-sized Turkish exporters: board priorities, partners and contracts."],
    aiDecisions: ["AI Decisions: Independent AI Advisory | Ganrich Advisory", "Independent of AI vendors: we help boards decide where AI is worth doing, choose and govern the partner who builds it, and check that the value arrives."],
    expertise: ["Expertise | Ganrich Advisory", "Decision-led strategy, growth, operating model, AI, organization, and execution expertise."],
    markets: ["Markets | Ganrich Advisory", "Regional perspectives across Türkiye, MENA, Europe, and Africa, grounded in market-specific evidence."],
    insights: ["Technical Notes | Ganrich Advisory", "Whitepapers on CBAM, the Cyber Resilience Act, machinery, batteries, packaging, energy and applied AI, plus strategy articles, in one searchable library."],
    article: ["Decision Quality in the Age of Applied AI | Ganrich Advisory", "A Ganrich perspective on framing AI value around evidence, judgement, and consequential decisions."],
    articleTransformation: ["From Transformation Activity to Value | Ganrich Advisory", "A practical perspective on using decision cadence, ownership, dependencies, and value signals to move transformation forward."],
    articleMarketEntry: ["Market Entry Is a Sequence of Commitments | Ganrich Advisory", "A framework for separating reversible learning from irreversible investment in market-entry decisions."],
    decisionLab: ["EU Readiness Checks | Ganrich Advisory", "Two-minute checks on whether your data is ready for CBAM, the Cyber Resilience Act and EUDR, plus decision tools for strategy and growth."],
    decisionAtlas: ["Decision Atlas | Ganrich Advisory", "Explore Ganrich Advisory through the consequential decision currently on your agenda."],
    decisionFramer: ["Decision Framer | Ganrich Advisory", "Turn a broad executive priority into a structured, editable preliminary decision brief."],
    marketCompass: ["Market Entry Compass | Ganrich Advisory", "Compare market opportunity and organizational readiness using transparent, editable assumptions."],
    boardBriefBuilder: ["Board Brief Builder | Ganrich Advisory", "Turn a framed decision into a disciplined one-page board memorandum that sets out the options, the evidence and the decision required."],
    aiValueLens: ["AI Value Lens | Ganrich Advisory", "Assess an AI use case across value, repeatability, readiness, adoption, and risk control."],
    studio: ["Opportunity Studio | Ganrich Advisory", "Five working tools behind our programmes: emissions records, order approval, incident response, accessibility fixes and product data, with human approval."],
    regulationCalendar: ["EU Regulation Calendar | Ganrich Advisory", "When CBAM, the Cyber Resilience Act, EUDR, PPWR, the Machinery and Battery Regulations and other EU rules apply to Turkish exporters, with official links."],
    newsletter: ["Sunday Brief: EU Regulation Updates | Ganrich Advisory", "A five-minute email every Sunday at 08:00 for Turkish exporters: what changed in CBAM, the CRA, EUDR and other EU rules, and what to check first."],
    eudrCheck: ["EUDR Readiness Check | Ganrich Advisory", "Eight questions on whether your origin, geolocation and legality data is ready for your EU importer’s EUDR due-diligence statement, with an instant result."],
    craCheck: ["CRA Readiness Check | Ganrich Advisory", "Eight questions on whether you could report an actively exploited vulnerability under the Cyber Resilience Act within 24 hours, with an instant result."],
    cbamCheck: ["CBAM Readiness Check | Ganrich Advisory", "Eight questions on whether your CBAM emissions data is ready for an EU buyer, with an instant result and the gaps to close first."],
    decisionLabChangelog: ["Decision Lab Changelog | Ganrich Advisory", "See what is live, what changed, and what remains under evaluation in the Ganrich Decision Lab."],
    privateBriefing: ["Private Executive Briefing | Ganrich Advisory", "Move from a published perspective, signal, or tool to a prepared discussion about your specific decision."],
    about: ["About | Ganrich Advisory", "Ganrich Advisory is the independent decision partner for Turkish manufacturers and exporters facing EU buyer requirements, led by Ahmed Furkan Gul in Istanbul."],
    contact: ["Contact | Ganrich Advisory", "Contact Ganrich Advisory in Istanbul about CBAM and EU readiness, market entry or an AI decision: a founder-led first conversation, started with a short form."],
    legal: ["Legal | Ganrich Advisory", "Who runs the Ganrich Advisory website, terms of use, intellectual property, limits of liability and how AI-assisted content is handled."],
    trust: ["Privacy + Trust | Ganrich Advisory", "Privacy choices, current-site facts, AI transparency, and legal information at Ganrich Advisory."],
  },
  tr: {
    home: ["Ganrich Advisory | Türk Sanayisi için AB Uyumu ve Strateji", "SKDM (CBAM), CRA, EUDR ve diğer AB alıcı talepleriyle karşılaşan Türk ihracatçılar için bağımsız karar ortağı: neyi, ne zaman ve ne kadara yapacağınız."],
    buyerDesk: ["AB Alıcı Talep Masası | Ganrich Advisory", "AB alıcılarınızın gönderdiği SKDM, EUDR, ambalaj, zorla çalıştırma ve siber güvenlik soruları için tek bağımsız masa: sınıflandırılır, sizinle karar verilir."],
    toolSelection: ["Uyum Yazılımı ve Doğrulayıcı Seçimi | Ganrich Advisory", "SKDM, EUDR veya ürün pasaportu yazılımı ve doğrulayıcı seçmek için kısa, tarafsız bir çalışma. Satıcıdan ücret ve komisyon yok, yazılı öneri var."],
    incentiveFile: ["Yeşil Dönüşüm Teşvik ve Finansman Dosyası | Ganrich", "Zaten yapmanız gereken AB uyum çalışmasını yeşil dönüşüm desteği veya banka yeşil finansmanı için güçlü bir başvuru dosyasına dönüştürün."],
    cohortProgramme: ["İhracatçı Kohort Programı | Ganrich Advisory", "İhracatçı birliği, OSB veya oda ile yürütülen grup AB hazırlık programı: ortak oturumlar ve her şirket için ayrı karar oturumları."],
    marketAccessDirector: ["Yarı Zamanlı AB Pazar Erişimi Direktörü | Ganrich", "Orta ölçekli ihracatçılar için AB kuralları ve alıcı taleplerinde yarı zamanlı üst düzey sahiplik: öncelikler, iş ortakları ve sözleşmeler."],
    aiDecisions: ["Yapay Zekâ Kararları: Bağımsız Danışmanlık | Ganrich Advisory", "Tedarikçiden bağımsız yapay zekâ kararları: yapay zekânın nerede değer yarattığına karar verin, onu kuracak ortağı seçin ve değerin gelip gelmediğini izleyin."],
    expertise: ["Uzmanlık | Ganrich Advisory", "Strateji, büyüme, işletim modeli, yapay zekâ, organizasyon ve uygulama için karar odaklı uzmanlık."],
    markets: ["Coğrafyalar | Ganrich Advisory", "Türkiye, Orta Doğu ve Kuzey Afrika, Avrupa ve Afrika için pazara özgü kanıtlara dayalı bölgesel bakışlar."],
    insights: ["Teknik Notlar | Ganrich Advisory", "SKDM (CBAM), Siber Dayanıklılık Yasası, makine, batarya, ambalaj, enerji ve uygulamalı yapay zekâ üzerine teknik notlar ve strateji makaleleri tek kütüphanede."],
    article: ["Uygulamalı Yapay Zekâ Çağında Karar Kalitesi | Ganrich Advisory", "Yapay zekâ değerini kanıt, muhakeme ve kritik kararlar etrafında çerçeveleyen Ganrich bakışı."],
    articleTransformation: ["Dönüşüm Faaliyetinden Değere | Ganrich Advisory", "Dönüşümü ilerletmek için karar ritmini, sahipliği, bağımlılıkları ve değer göstergelerini ele alan uygulamalı bir bakış."],
    articleMarketEntry: ["Pazara Giriş, Taahhütler Dizisidir | Ganrich Advisory", "Pazara giriş kararlarında geri döndürülebilir öğrenmeyi geri döndürülemez yatırımdan ayıran bir çerçeve."],
    decisionLab: ["AB Hazırlık Testleri | Ganrich Advisory", "Verinizin CBAM, Siber Dayanıklılık Yasası ve EUDR için hazır olup olmadığını iki dakikada gösteren testler ile strateji ve büyüme kararları için araçlar."],
    decisionAtlas: ["Karar Atlası | Ganrich Advisory", "Ganrich Advisory’yi gündeminizdeki kritik karar üzerinden keşfedin: durumunuza uyan programları, araçları ve notları görün."],
    decisionFramer: ["Karar Çerçeveleyici | Ganrich Advisory", "Geniş bir yönetici önceliğini yapılandırılmış ve düzenlenebilir bir ön karar özetine dönüştürün."],
    marketCompass: ["Pazara Giriş Pusulası | Ganrich Advisory", "Pazar fırsatını ve kurumsal hazırlığı şeffaf, düzenlenebilir varsayımlarla karşılaştırın."],
    boardBriefBuilder: ["Yönetim Kurulu Brifingi Oluşturucu | Ganrich Advisory", "Çerçevelenmiş bir kararı disiplinli, tek sayfalık yönetim kurulu notuna dönüştürün."],
    aiValueLens: ["Yapay Zekâ Değer Merceği | Ganrich Advisory", "Bir yapay zekâ kullanım alanını değer, tekrarlanabilirlik, hazırlık, benimseme ve risk kontrolü üzerinden değerlendirin."],
    studio: ["Opportunity Studio: Beş Çalışma Aracı | Ganrich Advisory", "Programlarımızın arkasındaki beş çalışma aracı: emisyon kaydı, sipariş onayı, olay müdahalesi, erişilebilirlik ve ürün verisi; insan onayıyla."],
    regulationCalendar: ["AB Mevzuat Takvimi | Ganrich Advisory", "AB Yeşil Mutabakat ve dijital kurallarının Türk ihracatçılara uygulandığı tarihler: SKDM, CRA, EUDR, PPWR, Makine ve Batarya Tüzükleri; resmî kaynaklarla."],
    newsletter: ["Pazar Notu: Haftalık Mevzuat Bülteni | Ganrich Advisory", "Her Pazar 08:00'de ihracatçılar için 5 dakikalık e-posta: SKDM (CBAM), CRA, EUDR ve diğer AB kurallarında ne değişti, önce neye bakmalı."],
    eudrCheck: ["EUDR Hazırlık Testi | Ganrich Advisory", "Menşe, coğrafi konum ve yasallık verinizin AB ithalatçınızın EUDR durum tespiti beyanına hazır olup olmadığını sekiz soruda görün; sonuç hemen ekranda."],
    craCheck: ["CRA Hazırlık Testi | Ganrich Advisory", "Siber Dayanıklılık Yasası kapsamında istismar edilen bir açığı 24 saat içinde bildirebilir misiniz? Sekiz soruda görün; sonuç ve boşluklar hemen ekranda."],
    cbamCheck: ["SKDM (CBAM) Hazırlık Testi | Ganrich Advisory", "SKDM (CBAM) emisyon verinizin AB alıcınız için hazır olup olmadığını sekiz soruda görün; sonuç ve önce kapatılması gereken boşluklar hemen ekranda."],
    decisionLabChangelog: ["Karar Laboratuvarı Değişiklik Günlüğü | Ganrich Advisory", "Ganrich Karar Laboratuvarında nelerin yayında, nelerin değiştiğini ve hangi araçların değerlendirmede olduğunu görün."],
    privateBriefing: ["Özel Yönetici Brifingi | Ganrich Advisory", "Yayımlanmış bir perspektif, sinyal veya araçtan kurumunuza özgü karar hakkında hazırlıklı bir görüşmeye geçin."],
    about: ["Hakkımızda | Ganrich Advisory", "Ganrich Advisory, AB alıcı talepleriyle karşılaşan Türk üretici ve ihracatçılar için bağımsız karar ortağıdır; İstanbul'da Ahmed Furkan Gül liderliğinde çalışır."],
    contact: ["İletişim | Ganrich Advisory", "Gündeminizdeki stratejik karar veya AB uyumu konusu hakkında kıdemli bir ön görüşme başlatın; kısa formu doldurmanız yeterli."],
    legal: ["Hukuki Bilgilendirme | Ganrich Advisory", "Ganrich Advisory internet sitesini kimin işlettiği, kullanım koşulları, fikrî mülkiyet, sorumluluk sınırları ve yapay zekâ destekli içerik hakkında bilgiler."],
    trust: ["Gizlilik + Güven | Ganrich Advisory", "Ganrich Advisory gizlilik tercihleri, mevcut site olguları, yapay zekâ şeffaflığı ve hukuki bilgileri."],
  },
} as const;

// Each trust page gets its own title and description; they used to share one.
const trustMeta = {
  en: {
    privacyCenter: ["Privacy and Trust Centre | Ganrich Advisory", "How Ganrich Advisory handles visitor data, cookies, data-subject rights, AI use and legal terms, in one place."],
    privacy: ["Privacy Notice | Ganrich Advisory", "What personal data the Ganrich Advisory website collects through its forms, newsletter and cookieless visit statistics, and why."],
    kvkk: ["Türkiye Data Protection Notice (KVKK) | Ganrich Advisory", "Ganrich Advisory notice under Türkiye's Personal Data Protection Law No. 6698."],
    cookies: ["Cookie Notice | Ganrich Advisory", "The small set of essential and optional browser storage the Ganrich Advisory website uses; no analytics or advertising cookies."],
    cookiePreferences: ["Cookie Preferences | Ganrich Advisory", "Change or withdraw your optional browser storage choices for the Ganrich Advisory website."],
    dataRights: ["Your Data Rights | Ganrich Advisory", "How to ask Ganrich Advisory about, correct or delete the personal data it holds about you."],
    aiTransparency: ["AI Transparency | Ganrich Advisory", "Where Ganrich Advisory uses AI in its tools and work, and where human judgement stays in charge."],
    terms: ["Terms of Use | Ganrich Advisory", "Plain terms for using the Ganrich Advisory website, its tools and its published notes."],
    vendors: ["Service Providers | Ganrich Advisory", "The service providers involved in running the Ganrich Advisory website."],
    policyUpdates: ["Policy Updates | Ganrich Advisory", "Dated changes to Ganrich Advisory privacy, cookie and legal notices."],
  },
  tr: {
    privacyCenter: ["Gizlilik ve Güven Merkezi | Ganrich Advisory", "Ganrich Advisory ziyaretçi verisini, çerezleri, ilgili kişi haklarını, yapay zekâ kullanımını ve hukuki koşulları tek yerde açıklar."],
    privacy: ["Gizlilik Bildirimi | Ganrich Advisory", "Ganrich Advisory sitesinin formlar, bülten ve çerezsiz ziyaret istatistikleri aracılığıyla hangi kişisel verileri neden topladığı."],
    kvkk: ["KVKK Aydınlatma Metni | Ganrich Advisory", "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Ganrich Advisory aydınlatma metni."],
    cookies: ["Çerez Bildirimi | Ganrich Advisory", "Ganrich Advisory sitesinin kullandığı zorunlu ve isteğe bağlı tarayıcı depolaması; analitik veya reklam çerezi yoktur."],
    cookiePreferences: ["Çerez Tercihleri | Ganrich Advisory", "Ganrich Advisory sitesi için isteğe bağlı tarayıcı depolama tercihlerinizi değiştirin veya geri çekin."],
    dataRights: ["İlgili Kişi Başvurusu | Ganrich Advisory", "Ganrich Advisory'nin hakkınızda tuttuğu kişisel verileri sorma, düzeltme veya silme talebinizi nasıl iletebileceğiniz."],
    aiTransparency: ["Yapay Zekâ Şeffaflığı | Ganrich Advisory", "Ganrich Advisory'nin araçlarında ve çalışmalarında yapay zekâyı nerede kullandığı ve insan muhakemesinin nerede belirleyici kaldığı."],
    terms: ["Kullanım Koşulları | Ganrich Advisory", "Ganrich Advisory sitesini, araçlarını ve yayımlanan notları kullanmaya ilişkin sade koşullar."],
    vendors: ["Hizmet Sağlayıcılar | Ganrich Advisory", "Ganrich Advisory sitesinin işletilmesinde yer alan hizmet sağlayıcılar."],
    policyUpdates: ["Politika Güncellemeleri | Ganrich Advisory", "Ganrich Advisory gizlilik, çerez ve hukuki bildirimlerindeki tarihli değişiklikler."],
  },
} as const;

// Search results cut titles near 60 characters; long article titles drop the brand suffix.
function withBrand(title: string) {
  const full = `${title} | ${SITE_NAME}`;
  return full.length > 65 ? title : full;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  if (p.lang !== "en" && p.lang !== "tr") return { title: "Page not found | Ganrich Advisory", robots: { index: false, follow: false } };
  const lang: Lang = p.lang === "tr" ? "tr" : "en"; const route = p.slug?.join("/") ?? ""; const kind = pageKind(lang, route);
  const trustKinds = ["privacyCenter", "privacy", "kvkk", "cookies", "cookiePreferences", "dataRights", "aiTransparency", "terms", "vendors", "policyUpdates"];
  const metaKind = (trustKinds.includes(kind) ? "trust" : kind) as keyof typeof metaCopy.en;
  const article = kind.startsWith("article") ? insightArticles[lang][insightIndex(kind)] : null;
  const category = kind.startsWith("category") ? insightCategoryForKind(lang, kind) : null;
  const trust = trustMeta[lang][kind as keyof typeof trustMeta.en];
  const [title, fullDescription] = article
    ? [withBrand(article.title), article.thesis]
    : category
      ? [`${lang === "en" ? `${category.label} Insights` : `${category.label} üzerine içgörüler`} | Ganrich Advisory`, category.description]
    : (trust ?? advisoryMeta(lang, kind) ?? metaCopy[lang][metaKind] ?? metaCopy[lang].home);
  const description = metaDescription(fullDescription);
  // Bump OG_CARD_VERSION when cards change: link previews (LinkedIn) cache image URLs, including failed fetches.
  const socialCard = (article
    ? `/og/${lang}/article-${article.slug}.png`
    : `/og/${lang}/${category ? category.key : kind.startsWith("solution") || kind.startsWith("service") || kind.startsWith("guide") || kind === "sampleWork" ? kind : metaKind in metaCopy[lang] ? metaKind : "home"}.png`) + `?v=${OG_CARD_VERSION}`;
  const keywords = pageKeywords(lang, kind);
  const metadataBase = new URL(SITE_ORIGIN);
  const current = `/${lang}${route ? `/${route}` : ""}`; const other: Lang = lang === "en" ? "tr" : "en"; const currentKind = pageKind(lang, route); const translated = currentKind === "home" || currentKind === "notFound" ? `/${other}` : `/${other}/${routeMap[other][currentKind]}`;
  return {
    metadataBase,
    title,
    description,
    ...(keywords ? { keywords } : {}),
    authors: [{ name: founderName(lang), url: absoluteUrl(`/${lang}/${routeMap[lang].about}`) }],
    creator: founderName(lang),
    publisher: SITE_NAME,
    alternates: {
      canonical: current,
      languages: { en: lang === "en" ? current : translated, tr: lang === "tr" ? current : translated, "x-default": lang === "en" ? current : translated },
      types: { "application/rss+xml": `/${lang}/feed.xml` },
    },
    // Category pages only list a few notes each; the insights hub is the page to index.
    robots: kind === "cookiePreferences" || kind === "studio" || category
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      title,
      description,
      type: article ? "article" : "website",
      url: current,
      siteName: SITE_NAME,
      locale: lang === "en" ? "en_GB" : "tr_TR",
      alternateLocale: lang === "en" ? ["tr_TR"] : ["en_GB"],
      images: [{ url: socialCard, width: 1200, height: 630, alt: `${title} — Ganrich Advisory` }],
      ...(article ? { publishedTime: article.date, modifiedTime: article.date, authors: [absoluteUrl(`/${lang}/${routeMap[lang].about}#ahmed-furkan-gul`)] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [socialCard] },
  };
}

export default async function LocalizedPage({ params }: Props) {
  const p = await params;
  // Only /en and /tr exist; any other first segment (e.g. /missing-page) is a 404, not the English home page.
  if (p.lang !== "en" && p.lang !== "tr") notFound();
  const lang: Lang = p.lang === "tr" ? "tr" : "en"; const route = p.slug?.join("/") ?? "";
  const kind = pageKind(lang, route);
  if (kind === "notFound") notFound();
  // Folded into simpler destinations; the old addresses keep working through a permanent redirect.
  if (kind === "expertise" || kind === "markets") permanentRedirect(`/${lang}/${routeMap[lang].solutions}#strategy`);
  // Category pages are folded into the technical-notes library, with the strategy filter selected.
  if (kind.startsWith("category")) permanentRedirect(`/${lang}/${routeMap[lang].insights}#strategy`);
  // The AI Value Diagnostic became the board diagnostic on the AI Decisions page.
  if (kind === "serviceAI") permanentRedirect(`/${lang}/${routeMap[lang].aiDecisions}#aiDiagnostic`);
  if (kind === "privateBriefing") permanentRedirect(`/${lang}/${routeMap[lang].contact}?service=briefing`);
  const trustTarget: Record<string, string> = { privacyCenter: "privacy", cookies: "privacy#cookies", vendors: "privacy#providers", dataRights: "privacy#rights", policyUpdates: "privacy#changes", terms: "legal#terms", aiTransparency: "legal#ai" };
  if (kind in trustTarget) { const [key, hash] = trustTarget[kind].split("#"); permanentRedirect(`/${lang}/${routeMap[lang][key]}${hash ? `#${hash}` : ""}`); }
  const article = kind.startsWith("article") ? insightArticles[lang][insightIndex(kind)] : null;
  const category = kind.startsWith("category") ? insightCategoryForKind(lang, kind) : null;
  const currentUrl = absoluteUrl(`/${lang}${route ? `/${route}` : ""}`);
  const organizationId = ids.organization;
  const personId = ids.person(lang);
  const title = article?.title ?? category?.label ?? trustMeta[lang][kind as keyof typeof trustMeta.en]?.[0]?.split("|")[0].trim() ?? advisoryMeta(lang, kind)?.[0]?.split("|")[0].trim() ?? (metaCopy[lang][kind as keyof typeof metaCopy.en]?.[0]?.split("|")[0].trim() || SITE_NAME);
  const parent = article || category
    ? { name: lang === "en" ? "Insights" : "İçgörüler", url: absoluteUrl(`/${lang}/${routeMap[lang].insights}`) }
    : kind.startsWith("decision") || ["marketCompass", "boardBriefBuilder", "aiValueLens", "cbamCheck", "craCheck", "eudrCheck"].includes(kind)
      ? { name: lang === "en" ? "Decision Lab" : "Karar Laboratuvarı", url: absoluteUrl(`/${lang}/${routeMap[lang].decisionLab}`) }
      : breadcrumbParent(lang, kind);
  const description = article?.thesis ?? category?.description ?? (advisoryMeta(lang, kind) ?? metaCopy[lang][kind as keyof typeof metaCopy.en] ?? metaCopy[lang].home)[1];
  const socialCard = absoluteUrl(article ? `/og/${lang}/article-${article.slug}.png` : `/og/${lang}/${category ? category.key : kind.startsWith("solution") || kind.startsWith("service") || kind.startsWith("guide") || kind === "sampleWork" ? kind : kind in metaCopy[lang] ? kind : "home"}.png`);
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Ana sayfa", item: absoluteUrl(`/${lang}`) },
    ...(parent ? [{ "@type": "ListItem", position: 2, name: parent.name, item: parent.url }] : []),
    ...(kind === "home" ? [] : [{ "@type": "ListItem", position: parent ? 3 : 2, name: title, item: currentUrl }]),
  ];
  const graph: Record<string, unknown>[] = [
    organizationNode(lang, metaCopy[lang].home[1], { catalog: kind === "home" || kind === "solutions" }),
    websiteNode(metaCopy[lang].home[1]),
    webPageNode(lang, currentUrl, title, description, kind === "about" ? "AboutPage" : kind === "contact" ? "ContactPage" : kind === "solutions" || kind === "expertise" || kind === "insights" || category ? "CollectionPage" : "WebPage", { image: socialCard, ...(kind === "home" ? { mainEntity: { "@id": organizationId } } : {}) }),
    {
      "@type": "BreadcrumbList",
      "@id": `${currentUrl}#breadcrumb`,
      itemListElement: breadcrumbItems,
    },
    ...offeringNodes(lang, kind, currentUrl),
  ];
  if (article) graph.push({
    "@type": "Article",
    "@id": `${currentUrl}#article`,
    headline: article.title,
    description: article.thesis,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: lang === "en" ? "en-GB" : "tr-TR",
    articleSection: article.topic,
    author: { "@id": personId },
    publisher: { "@id": organizationId },
    image: absoluteUrl(`/og/${lang}/article-${article.slug}.png`),
    mainEntityOfPage: currentUrl,
  });
  const guide = guideByKey(kind);
  if (guide) {
    const g = guide[lang];
    graph.push({
      "@type": "Article",
      "@id": `${currentUrl}#article`,
      headline: g.h1,
      description: g.description,
      datePublished: guide.date,
      dateModified: guide.date,
      inLanguage: lang === "en" ? "en-GB" : "tr-TR",
      articleSection: guide.topic[lang],
      author: { "@id": personId },
      publisher: { "@id": organizationId },
      image: absoluteUrl(`/og/${lang}/${guide.key}.png`),
      mainEntityOfPage: currentUrl,
    });
    const faq = g.blocks.flatMap(b => b.t === "faq" ? b.items : []);
    if (faq.length) graph.push({
      "@type": "FAQPage",
      "@id": `${currentUrl}#faq`,
      mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*([^*]+)\*/g, "$1") } })),
    });
  }
  if (kind === "about" || article || guide || kind.startsWith("note")) graph.push({
    "@type": "Person",
    "@id": personId,
    name: founderName(lang),
    jobTitle: lang === "en" ? "Founder, Ganrich Advisory" : "Kurucu, Ganrich Advisory",
    worksFor: { "@id": organizationId },
    url: absoluteUrl(`/${lang}/${routeMap[lang].about}`),
    sameAs: FOUNDER_SAME_AS,
  });
  const structuredData = { "@context": "https://schema.org", "@graph": graph };
  const serializedStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");
  return <><Site lang={lang} route={route}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html: serializedStructuredData}}/></>;
}
