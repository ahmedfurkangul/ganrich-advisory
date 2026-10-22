import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Site from "../../site";
import { AboutPage, EngagementPage, ExpertisePage, HomePage, HowWeWorkPage, MarketsPage } from "../../practice";
import { insightArticles, insightCategoryForKind, insightIndex, Lang, pageKind, routeMap } from "../../content";
import { absoluteUrl, SITE_NAME, SITE_ORIGIN } from "../../site-config";

type Props = { params: Promise<{ lang: string; slug?: string[] }> };

const metaCopy = {
  en: {
    home: ["Ganrich Advisory | Independent Strategy Advice for Turkish Companies", "Founder-led strategy advice for owners and leadership teams of established Turkish companies: expansion beyond Türkiye, operating-model change as the business outgrows its founding structure, and where AI creates measurable value."],
    serviceMarketEntry: ["Market Entry Decision Sprint | Ganrich Advisory", "Decide where to expand beyond Türkiye, through which entry model, and how much to commit before the evidence is in."],
    serviceOperatingModel: ["Operating Model Review | Ganrich Advisory", "Make clear who decides what as a Turkish company outgrows the way it was founded."],
    serviceAiValue: ["AI Value Diagnostic | Ganrich Advisory", "Find the few operating decisions and workflows where AI would create measurable value, and what must be true first."],
    howWeWork: ["How We Work | Ganrich Advisory", "Founder-led engagements with explicit evidence and a written result. What the first conversation covers and what you receive."],
    expertise: ["Expertise | Ganrich Advisory", "Three engagements, each built around one decision: market entry, operating model and AI value."],
    markets: ["Türkiye → Gulf | Ganrich Advisory", "Dated, sourced observations on the Türkiye–Gulf corridor and the questions they leave open for Turkish companies."],
    insights: ["Insights | Ganrich Advisory", "Signed perspectives on market entry, operating models and applied AI, each with sources, a counterargument and questions for the board."],
    article: ["Decision Quality in the Age of Applied AI | Ganrich Advisory", "A Ganrich perspective on framing AI value around evidence, judgement, and consequential decisions."],
    articleTransformation: ["From Transformation Activity to Value | Ganrich Advisory", "A practical perspective on using decision cadence, ownership, dependencies, and value signals to move transformation forward."],
    articleMarketEntry: ["Market Entry Is a Sequence of Commitments | Ganrich Advisory", "A framework for separating reversible learning from irreversible investment in market-entry decisions."],
    decisionLab: ["Decision Lab | Ganrich Advisory", "Five free tools to structure a decision before you discuss it. They run in your browser and need no account or email."],
    decisionAtlas: ["Decision Atlas | Ganrich Advisory", "Explore Ganrich Advisory through the consequential decision currently on your agenda."],
    decisionFramer: ["Decision Framer | Ganrich Advisory", "Turn a broad executive priority into a structured, editable preliminary decision brief."],
    marketCompass: ["Market Entry Compass | Ganrich Advisory", "Compare market opportunity and organizational readiness using transparent, editable assumptions."],
    boardBriefBuilder: ["Board Brief Builder | Ganrich Advisory", "Turn a framed decision into a disciplined one-page board memorandum."],
    aiValueLens: ["AI Value Lens | Ganrich Advisory", "Assess an AI use case across value, repeatability, readiness, adoption, and risk control."],
    decisionLabChangelog: ["Decision Lab Changelog | Ganrich Advisory", "See what is live, what changed, and what remains under evaluation in the Ganrich Decision Lab."],
    privateBriefing: ["Private Executive Briefing | Ganrich Advisory", "Move from a published perspective, signal, or tool to a prepared discussion about your specific decision."],
    about: ["About | Ganrich Advisory", "Ganrich Advisory is a founder-led practice. Ahmed Furkan Gul: former Chief Strategy and Business Development Officer at Tay Group and Assistant Professor at İstanbul Kent University."],
    contact: ["Contact | Ganrich Advisory", "Describe the decision in a few sentences. Only your name, email and a short description are required."],
    legal: ["Legal | Ganrich Advisory", "Ganrich Advisory website legal information."],
    trust: ["Privacy + Trust | Ganrich Advisory", "Privacy choices, current-site facts, AI transparency, and legal information at Ganrich Advisory."],
  },
  tr: {
    home: ["Ganrich Advisory | Türk Şirketleri için Bağımsız Strateji Danışmanlığı", "Köklü Türk şirketlerinin sahiplerine ve yönetim ekiplerine kurucu liderliğinde strateji danışmanlığı: Türkiye dışına açılma, şirket kuruluş yapısını aştığında işletim modeli ve yapay zekânın ölçülebilir değer yarattığı alanlar."],
    serviceMarketEntry: ["Pazara Giriş Karar Sprinti | Ganrich Advisory", "Türkiye dışında nereye, hangi giriş modeliyle açılacağınıza ve kanıt oluşmadan ne kadar taahhüt vereceğinize karar verin."],
    serviceOperatingModel: ["İşletim Modeli İncelemesi | Ganrich Advisory", "Bir Türk şirketi kuruluş biçiminin ötesine geçerken hangi kararı kimin vereceğini netleştirin."],
    serviceAiValue: ["Yapay Zekâ Değer Teşhisi | Ganrich Advisory", "Yapay zekânın ölçülebilir değer yaratacağı birkaç işletim kararını ve iş akışını, öncesinde nelerin doğru olması gerektiğiyle birlikte belirleyin."],
    howWeWork: ["Çalışma Biçimimiz | Ganrich Advisory", "Kurucu liderliğinde, açık kanıtla ve yazılı sonuçla yürüyen çalışmalar. İlk görüşmede neler konuşulur, sonunda ne alırsınız."],
    expertise: ["Uzmanlık | Ganrich Advisory", "Her biri tek bir karar etrafında kurulu üç çalışma biçimi: pazara giriş, işletim modeli ve yapay zekâ değeri."],
    markets: ["Türkiye → Körfez | Ganrich Advisory", "Türkiye–Körfez koridoruna ilişkin tarihli ve kaynaklı gözlemler ve Türk şirketleri için açık bıraktıkları sorular."],
    insights: ["İçgörüler | Ganrich Advisory", "Pazara giriş, işletim modeli ve uygulamalı yapay zekâ üzerine kaynaklı, karşı görüşü ve yönetim kurulu sorularını içeren imzalı bakışlar."],
    article: ["Uygulamalı Yapay Zekâ Çağında Karar Kalitesi | Ganrich Advisory", "Yapay zekâ değerini kanıt, muhakeme ve kritik kararlar etrafında çerçeveleyen Ganrich bakışı."],
    articleTransformation: ["Dönüşüm Faaliyetinden Değere | Ganrich Advisory", "Dönüşümü ilerletmek için karar ritmini, sahipliği, bağımlılıkları ve değer göstergelerini ele alan uygulamalı bir bakış."],
    articleMarketEntry: ["Pazara Giriş, Taahhütler Dizisidir | Ganrich Advisory", "Pazara giriş kararlarında geri döndürülebilir öğrenmeyi geri döndürülemez yatırımdan ayıran bir çerçeve."],
    decisionLab: ["Karar Laboratuvarı | Ganrich Advisory", "Bir kararı konuşmadan önce yapılandırmak için beş ücretsiz araç. Tarayıcınızda çalışır; hesap ya da e-posta gerektirmez."],
    decisionAtlas: ["Karar Atlası | Ganrich Advisory", "Ganrich Advisory’i gündeminizdeki kritik karar üzerinden keşfedin."],
    decisionFramer: ["Karar Çerçeveleyici | Ganrich Advisory", "Geniş bir yönetici önceliğini yapılandırılmış ve düzenlenebilir bir ön karar özetine dönüştürün."],
    marketCompass: ["Pazara Giriş Pusulası | Ganrich Advisory", "Pazar fırsatını ve kurumsal hazırlığı şeffaf, düzenlenebilir varsayımlarla karşılaştırın."],
    boardBriefBuilder: ["Yönetim Kurulu Brifingi Oluşturucu | Ganrich Advisory", "Çerçevelenmiş bir kararı disiplinli, tek sayfalık yönetim kurulu notuna dönüştürün."],
    aiValueLens: ["Yapay Zekâ Değer Merceği | Ganrich Advisory", "Bir yapay zekâ kullanım alanını değer, tekrarlanabilirlik, hazırlık, benimseme ve risk kontrolü üzerinden değerlendirin."],
    decisionLabChangelog: ["Karar Laboratuvarı Değişiklik Günlüğü | Ganrich Advisory", "Ganrich Karar Laboratuvarında nelerin yayında, nelerin değiştiğini ve hangi araçların değerlendirmede olduğunu görün."],
    privateBriefing: ["Özel Yönetici Brifingi | Ganrich Advisory", "Yayımlanmış bir perspektif, sinyal veya araçtan kurumunuza özgü karar hakkında hazırlıklı bir görüşmeye geçin."],
    about: ["Hakkımızda | Ganrich Advisory", "Ganrich Advisory kurucu liderliğinde bir danışmanlıktır. Ahmed Furkan Gul: Tay Group eski Strateji ve İş Geliştirme Direktörü (CSO), İstanbul Kent Üniversitesi Dr. Öğretim Üyesi."],
    contact: ["İletişim | Ganrich Advisory", "Kararı birkaç cümleyle anlatın. Yalnızca adınız, e-postanız ve kısa bir açıklama zorunludur."],
    legal: ["Hukuki Bilgilendirme | Ganrich Advisory", "Ganrich Advisory internet sitesi hukuki bilgileri."],
    trust: ["Gizlilik + Güven | Ganrich Advisory", "Ganrich Advisory gizlilik tercihleri, mevcut site olguları, yapay zekâ şeffaflığı ve hukuki bilgileri."],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params; const lang: Lang = p.lang === "tr" ? "tr" : "en"; const route = p.slug?.join("/") ?? ""; const kind = pageKind(lang, route);
  const trustKinds = ["privacyCenter", "privacy", "kvkk", "cookies", "cookiePreferences", "dataRights", "aiTransparency", "terms", "vendors", "policyUpdates"];
  const metaKind = (trustKinds.includes(kind) ? "trust" : kind) as keyof typeof metaCopy.en;
  const article = kind.startsWith("article") ? insightArticles[lang][insightIndex(kind)] : null;
  const category = kind.startsWith("category") ? insightCategoryForKind(lang, kind) : null;
  const [title, description] = article
    ? [`${article.title} | Ganrich Advisory`, article.thesis]
    : category
      ? [`${category.label} ${lang === "en" ? "Insights" : "İçgörüleri"} | Ganrich Advisory`, category.description]
    : (metaCopy[lang][metaKind] ?? metaCopy[lang].home);
  const socialCard = article
    ? `/og/${lang}/article-${article.slug}.png`
    : `/og/${lang}/${category ? category.key : metaKind in metaCopy[lang] ? metaKind : "home"}.png`;
  const metadataBase = new URL(SITE_ORIGIN);
  const current = `/${lang}${route ? `/${route}` : ""}`; const other: Lang = lang === "en" ? "tr" : "en"; const currentKind = pageKind(lang, route); const translated = currentKind === "home" || currentKind === "notFound" ? `/${other}` : `/${other}/${routeMap[other][currentKind]}`;
  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical: current,
      languages: { en: lang === "en" ? current : translated, tr: lang === "tr" ? current : translated, "x-default": "/en" },
      types: { "application/rss+xml": `/${lang}/feed.xml` },
    },
    robots: kind === "cookiePreferences" ? { index: false, follow: true } : { index: true, follow: true },
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
  const p = await params; const lang: Lang = p.lang === "tr" ? "tr" : "en"; const route = p.slug?.join("/") ?? "";
  const kind = pageKind(lang, route);
  if (kind === "notFound") notFound();
  const article = kind.startsWith("article") ? insightArticles[lang][insightIndex(kind)] : null;
  const category = kind.startsWith("category") ? insightCategoryForKind(lang, kind) : null;
  const currentUrl = absoluteUrl(`/${lang}${route ? `/${route}` : ""}`);
  const organizationId = absoluteUrl("/#organization");
  const personId = absoluteUrl(`/${lang}/${routeMap[lang].about}#ahmed-furkan-gul`);
  const title = article?.title ?? category?.label ?? (metaCopy[lang][kind as keyof typeof metaCopy.en]?.[0]?.split("|")[0].trim() || SITE_NAME);
  const parent = article || category
    ? { name: lang === "en" ? "Insights" : "İçgörüler", url: absoluteUrl(`/${lang}/${routeMap[lang].insights}`) }
    : kind.startsWith("decision") || ["marketCompass", "boardBriefBuilder", "aiValueLens"].includes(kind)
      ? { name: lang === "en" ? "Decision Lab" : "Karar Laboratuvarı", url: absoluteUrl(`/${lang}/${routeMap[lang].decisionLab}`) }
      : null;
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Ana sayfa", item: absoluteUrl(`/${lang}`) },
    ...(parent ? [{ "@type": "ListItem", position: 2, name: parent.name, item: parent.url }] : []),
    ...(kind === "home" ? [] : [{ "@type": "ListItem", position: parent ? 3 : 2, name: title, item: currentUrl }]),
  ];
  const graph: Record<string, unknown>[] = [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": organizationId,
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/brand/ganrich-advisory-threshold.png") },
      description: metaCopy[lang].home[1],
      founder: { "@id": personId },
      areaServed: ["Türkiye", "Gulf Cooperation Council"],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${currentUrl}#breadcrumb`,
      itemListElement: breadcrumbItems,
    },
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
  if (kind === "about" || article) graph.push({
    "@type": "Person",
    "@id": personId,
    name: "Ahmed Furkan Gul",
    jobTitle: lang === "en" ? "Founder, Ganrich Advisory" : "Kurucu, Ganrich Advisory",
    worksFor: { "@id": organizationId },
    url: absoluteUrl(`/${lang}/${routeMap[lang].about}`),
    sameAs: ["https://www.linkedin.com/in/furkangul/", "https://avesis.kent.edu.tr/ahmedfurkan.gul"],
  });
  const structuredData = { "@context": "https://schema.org", "@graph": graph };
  const serializedStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");
  const practicePage = kind === "home" ? <HomePage lang={lang}/>
    : kind === "expertise" ? <ExpertisePage lang={lang}/>
      : kind.startsWith("service") ? <EngagementPage lang={lang} kind={kind}/>
        : kind === "howWeWork" ? <HowWeWorkPage lang={lang}/>
          : kind === "markets" ? <MarketsPage lang={lang}/>
            : kind === "about" ? <AboutPage lang={lang}/>
              : null;
  return <><Site lang={lang} route={route}>{practicePage}</Site><script type="application/ld+json" dangerouslySetInnerHTML={{__html: serializedStructuredData}}/></>;
}
