import { advisoryMeta } from "../../advisory-meta";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Site from "../../site";
import { insightArticles, insightCategoryForKind, insightIndex, Lang, pageKind, routeMap } from "../../content";
import { absoluteUrl, SITE_NAME, SITE_ORIGIN } from "../../site-config";
import { breadcrumbParent, FOUNDER_SAME_AS, ids, offeringNodes, organizationNode, pageKeywords, webPageNode, websiteNode } from "../../structured-data";

type Props = { params: Promise<{ lang: string; slug?: string[] }> };

const metaCopy = {
  en: {
    home: ["Ganrich Advisory | EU Readiness and Strategy for Turkish Industry", "Independent advisory for Turkish manufacturers and exporters facing CBAM, the Cyber Resilience Act and other EU rules, and for leadership teams deciding where to grow next."],
    expertise: ["Expertise | Ganrich Advisory", "Decision-led strategy, growth, operating model, AI, organization, and execution expertise."],
    markets: ["Markets | Ganrich Advisory", "Regional perspectives across Türkiye, MENA, Europe, and Africa, grounded in market-specific evidence."],
    insights: ["Insights | Ganrich Advisory", "Strategic perspectives, executive briefings, reports, frameworks, and data notes designed to be used."],
    article: ["Decision Quality in the Age of Applied AI | Ganrich Advisory", "A Ganrich perspective on framing AI value around evidence, judgement, and consequential decisions."],
    articleTransformation: ["From Transformation Activity to Value | Ganrich Advisory", "A practical perspective on using decision cadence, ownership, dependencies, and value signals to move transformation forward."],
    articleMarketEntry: ["Market Entry Is a Sequence of Commitments | Ganrich Advisory", "A framework for separating reversible learning from irreversible investment in market-entry decisions."],
    decisionLab: ["Decision Lab | Ganrich Advisory", "Executive tools for framing decisions, testing assumptions, comparing alternatives, and preparing action."],
    decisionAtlas: ["Decision Atlas | Ganrich Advisory", "Explore Ganrich Advisory through the consequential decision currently on your agenda."],
    decisionFramer: ["Decision Framer | Ganrich Advisory", "Turn a broad executive priority into a structured, editable preliminary decision brief."],
    marketCompass: ["Market Entry Compass | Ganrich Advisory", "Compare market opportunity and organizational readiness using transparent, editable assumptions."],
    boardBriefBuilder: ["Board Brief Builder | Ganrich Advisory", "Turn a framed decision into a disciplined one-page board memorandum."],
    aiValueLens: ["AI Value Lens | Ganrich Advisory", "Assess an AI use case across value, repeatability, readiness, adoption, and risk control."],
    studio: ["Opportunity Studio | Ganrich Advisory", "Five working tools behind our programmes: emissions records, order approval, incident response, accessibility remediation and product data, with human approval and private workspaces."],
    newsletter: ["Regulation Updates | Ganrich Advisory", "Short email notes for Turkish manufacturers and exporters when an EU rule such as CBAM, the Cyber Resilience Act or EUDR changes: what changed, who it affects and what to check first."],
    eudrCheck: ["EUDR Readiness Check | Ganrich Advisory", "Eight questions on whether your origin, geolocation and legality data is ready for your EU importer’s EUDR due-diligence statement, with an instant result and the gaps to close first."],
    craCheck: ["CRA Readiness Check | Ganrich Advisory", "Eight questions on whether you could report an actively exploited vulnerability under the Cyber Resilience Act within 24 hours, with an instant result and the gaps to close first."],
    cbamCheck: ["CBAM Readiness Check | Ganrich Advisory", "Eight questions on whether your CBAM emissions data is ready for an EU buyer, with an instant result and the gaps to close first."],
    decisionLabChangelog: ["Decision Lab Changelog | Ganrich Advisory", "See what is live, what changed, and what remains under evaluation in the Ganrich Decision Lab."],
    privateBriefing: ["Private Executive Briefing | Ganrich Advisory", "Move from a published perspective, signal, or tool to a prepared discussion about your specific decision."],
    about: ["About | Ganrich Advisory", "Independent thinking, regional fluency, and applied AI for decisions that do not fit a template."],
    contact: ["Contact | Ganrich Advisory", "Start a senior conversation about the strategic decision on your agenda."],
    legal: ["Legal | Ganrich Advisory", "Ganrich Advisory website legal information."],
    trust: ["Privacy + Trust | Ganrich Advisory", "Privacy choices, current-site facts, AI transparency, and legal information at Ganrich Advisory."],
  },
  tr: {
    home: ["Ganrich Advisory | Türk Sanayisi için AB Uyumu ve Strateji", "CBAM, Siber Dayanıklılık Yasası ve diğer AB kurallarıyla karşı karşıya olan Türk üreticiler ve ihracatçılar ile bir sonraki büyüme adımını belirleyen yönetim ekipleri için bağımsız danışmanlık."],
    expertise: ["Uzmanlık | Ganrich Advisory", "Strateji, büyüme, işletim modeli, yapay zekâ, organizasyon ve uygulama için karar odaklı uzmanlık."],
    markets: ["Coğrafyalar | Ganrich Advisory", "Türkiye, Orta Doğu ve Kuzey Afrika, Avrupa ve Afrika için pazara özgü kanıtlara dayalı bölgesel bakışlar."],
    insights: ["İçgörüler | Ganrich Advisory", "Kullanılmak için geliştirilen stratejik bakışlar, yönetici bilgilendirmeleri, raporlar, çerçeveler ve veri notları."],
    article: ["Uygulamalı Yapay Zekâ Çağında Karar Kalitesi | Ganrich Advisory", "Yapay zekâ değerini kanıt, muhakeme ve kritik kararlar etrafında çerçeveleyen Ganrich bakışı."],
    articleTransformation: ["Dönüşüm Faaliyetinden Değere | Ganrich Advisory", "Dönüşümü ilerletmek için karar ritmini, sahipliği, bağımlılıkları ve değer göstergelerini ele alan uygulamalı bir bakış."],
    articleMarketEntry: ["Pazara Giriş, Taahhütler Dizisidir | Ganrich Advisory", "Pazara giriş kararlarında geri döndürülebilir öğrenmeyi geri döndürülemez yatırımdan ayıran bir çerçeve."],
    decisionLab: ["Karar Laboratuvarı | Ganrich Advisory", "Kararları çerçevelemek, varsayımları sınamak, alternatifleri karşılaştırmak ve uygulamaya hazırlanmak için yönetici araçları."],
    decisionAtlas: ["Karar Atlası | Ganrich Advisory", "Ganrich Advisory’i gündeminizdeki kritik karar üzerinden keşfedin."],
    decisionFramer: ["Karar Çerçeveleyici | Ganrich Advisory", "Geniş bir yönetici önceliğini yapılandırılmış ve düzenlenebilir bir ön karar özetine dönüştürün."],
    marketCompass: ["Pazara Giriş Pusulası | Ganrich Advisory", "Pazar fırsatını ve kurumsal hazırlığı şeffaf, düzenlenebilir varsayımlarla karşılaştırın."],
    boardBriefBuilder: ["Yönetim Kurulu Brifingi Oluşturucu | Ganrich Advisory", "Çerçevelenmiş bir kararı disiplinli, tek sayfalık yönetim kurulu notuna dönüştürün."],
    aiValueLens: ["Yapay Zekâ Değer Merceği | Ganrich Advisory", "Bir yapay zekâ kullanım alanını değer, tekrarlanabilirlik, hazırlık, benimseme ve risk kontrolü üzerinden değerlendirin."],
    studio: ["Opportunity Studio | Ganrich Advisory", "Programlarımızın arkasındaki beş çalışma aracı: emisyon kaydı, sipariş onayı, olay müdahalesi, erişilebilirlik iyileştirmesi ve ürün verisi; insan onayı ve özel çalışma alanlarıyla."],
    newsletter: ["Mevzuat Bülteni | Ganrich Advisory", "CBAM, Siber Dayanıklılık Yasası veya EUDR gibi bir AB kuralı değiştiğinde Türk üretici ve ihracatçılara kısa e-posta notları: ne değişti, kimi etkiliyor ve önce neye bakmalı."],
    eudrCheck: ["EUDR Hazırlık Testi | Ganrich Advisory", "Menşe, coğrafi konum ve yasallık verinizin AB ithalatçınızın EUDR durum tespiti beyanı için hazır olup olmadığını sekiz soruda görün; sonuç ve önce kapatılması gereken boşluklar hemen ekranda."],
    craCheck: ["CRA Hazırlık Testi | Ganrich Advisory", "Siber Dayanıklılık Yasası kapsamında aktif olarak istismar edilen bir açığı 24 saat içinde bildirip bildiremeyeceğinizi sekiz soruda görün; sonuç ve önce kapatılması gereken boşluklar hemen ekranda."],
    cbamCheck: ["CBAM Hazırlık Testi | Ganrich Advisory", "CBAM emisyon verinizin AB alıcınız için hazır olup olmadığını sekiz soruda görün; sonuç ve önce kapatılması gereken boşluklar hemen ekranda."],
    decisionLabChangelog: ["Karar Laboratuvarı Değişiklik Günlüğü | Ganrich Advisory", "Ganrich Karar Laboratuvarında nelerin yayında, nelerin değiştiğini ve hangi araçların değerlendirmede olduğunu görün."],
    privateBriefing: ["Özel Yönetici Brifingi | Ganrich Advisory", "Yayımlanmış bir perspektif, sinyal veya araçtan kurumunuza özgü karar hakkında hazırlıklı bir görüşmeye geçin."],
    about: ["Hakkımızda | Ganrich Advisory", "Bir şablona sığmayan kararlar için bağımsız düşünce, bölgesel derinlik ve uygulamalı yapay zekâ."],
    contact: ["İletişim | Ganrich Advisory", "Gündeminizdeki stratejik karar hakkında kıdemli bir görüşme başlatın."],
    legal: ["Hukuki Bilgilendirme | Ganrich Advisory", "Ganrich Advisory internet sitesi hukuki bilgileri."],
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
  const [title, description] = article
    ? [withBrand(article.title), article.thesis]
    : category
      ? [`${category.label} ${lang === "en" ? "Insights" : "İçgörüleri"} | Ganrich Advisory`, category.description]
    : (trust ?? advisoryMeta(lang, kind) ?? metaCopy[lang][metaKind] ?? metaCopy[lang].home);
  const socialCard = article
    ? `/og/${lang}/article-${article.slug}.png`
    : `/og/${lang}/${category ? category.key : kind.startsWith("solution") || kind.startsWith("service") || kind === "sampleWork" ? kind : metaKind in metaCopy[lang] ? metaKind : "home"}.png`;
  const keywords = pageKeywords(lang, kind);
  const metadataBase = new URL(SITE_ORIGIN);
  const current = `/${lang}${route ? `/${route}` : ""}`; const other: Lang = lang === "en" ? "tr" : "en"; const currentKind = pageKind(lang, route); const translated = currentKind === "home" || currentKind === "notFound" ? `/${other}` : `/${other}/${routeMap[other][currentKind]}`;
  return {
    metadataBase,
    title,
    description,
    ...(keywords ? { keywords } : {}),
    authors: [{ name: "Ahmed Furkan Gul", url: absoluteUrl(`/${lang}/${routeMap[lang].about}`) }],
    creator: "Ahmed Furkan Gul",
    publisher: SITE_NAME,
    alternates: {
      canonical: current,
      languages: { en: lang === "en" ? current : translated, tr: lang === "tr" ? current : translated, "x-default": "/en" },
      types: { "application/rss+xml": `/${lang}/feed.xml` },
    },
    // Category pages only list a few notes each; the insights hub is the page to index.
    robots: kind === "cookiePreferences" || category
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
  if (kind === "privateBriefing") permanentRedirect(`/${lang}/${routeMap[lang].contact}?service=briefing`);
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
  const socialCard = absoluteUrl(article ? `/og/${lang}/article-${article.slug}.png` : `/og/${lang}/${category ? category.key : kind.startsWith("solution") || kind.startsWith("service") || kind === "sampleWork" ? kind : kind in metaCopy[lang] ? kind : "home"}.png`);
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
  if (kind === "about" || article || kind.startsWith("note")) graph.push({
    "@type": "Person",
    "@id": personId,
    name: "Ahmed Furkan Gul",
    jobTitle: lang === "en" ? "Founder, Ganrich Advisory" : "Kurucu, Ganrich Advisory",
    worksFor: { "@id": organizationId },
    url: absoluteUrl(`/${lang}/${routeMap[lang].about}`),
    sameAs: FOUNDER_SAME_AS,
  });
  const structuredData = { "@context": "https://schema.org", "@graph": graph };
  const serializedStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");
  return <><Site lang={lang} route={route}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html: serializedStructuredData}}/></>;
}
