import type { Lang } from "./content";
import { routeMap } from "./content";
import { services } from "./advisory-content";
import { notes } from "./advisory-note-content";
import { solutionByKey, solutions, solutionTagList, solutionTags, solutionThemes } from "./solutions-content";
import { absoluteUrl, SITE_NAME } from "./site-config";
import { faqFor } from "./solution-faq";

// Schema.org nodes shared by every page. Everything here repeats facts that are visible on the site,
// so search engines and LLM crawlers get the same story as human readers.

export const CONTACT_EMAIL = "furkangul@ganrichadvisory.com";
export const COMPANY_LINKEDIN = "https://www.linkedin.com/company/135278307/";
export const FOUNDER_SAME_AS = ["https://www.linkedin.com/in/furkangul/", "https://avesis.kent.edu.tr/ahmedfurkan.gul"];
/** The founder's name: Turkish pages use the Turkish spelling, English pages the ASCII form. */
export const founderName = (lang: "en" | "tr") => (lang === "tr" ? "Ahmed Furkan Gül" : "Ahmed Furkan Gul");

const inLanguage = (lang: Lang) => lang === "en" ? "en-GB" : "tr-TR";
const pageUrl = (lang: Lang, key: string) => absoluteUrl(`/${lang}/${routeMap[lang][key]}`);

export const ids = {
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
  person: (lang: Lang) => absoluteUrl(`/${lang}/${routeMap[lang].about}#ahmed-furkan-gul`),
};

const expertiseTopics: Record<Lang, string[]> = {
  en: ["EU regulatory readiness", "Corporate strategy", "Market entry", "Operating model design", "Applied artificial intelligence", "Decision quality", "Türkiye", "European Union"],
  tr: ["AB mevzuatına uyum", "Kurumsal strateji", "Pazara giriş", "İşletim modeli tasarımı", "Uygulamalı yapay zekâ", "Karar kalitesi", "Türkiye", "Avrupa Birliği"],
};

export function organizationNode(lang: Lang, description: string, { catalog = true }: { catalog?: boolean } = {}) {
  const en = lang === "en";
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ids.organization,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/ganrich-advisory-threshold.png") },
    image: absoluteUrl(`/og/${lang}/home.png`),
    description,
    email: CONTACT_EMAIL,
    founder: { "@id": ids.person(lang) },
    sameAs: [COMPANY_LINKEDIN],
    areaServed: ["Türkiye", "European Union"],
    knowsLanguage: ["en", "tr"],
    knowsAbout: [...new Set([...expertiseTopics[lang], ...solutionTagList(lang)])],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: en ? "New business enquiries" : "Yeni iş talepleri",
      email: CONTACT_EMAIL,
      url: pageUrl(lang, "contact"),
      availableLanguage: ["English", "Turkish"],
    },
    // The full catalogue is listed on the home and solutions pages only, not repeated on every page.
    ...(catalog ? { hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: en ? "Advisory services and programmes" : "Danışmanlık hizmetleri ve programlar",
      itemListElement: [
        ...services[lang].map(s => ({ "@type": "Offer", itemOffered: { "@type": "Service", "@id": `${pageUrl(lang, s.key)}#service`, name: s.title, url: pageUrl(lang, s.key) } })),
        ...solutions[lang].map(s => ({ "@type": "Offer", itemOffered: { "@type": "Service", "@id": `${pageUrl(lang, s.key)}#service`, name: s.title, url: pageUrl(lang, s.key) } })),
      ],
    } } : {}),
  };
}

export function websiteNode(description: string) {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description,
    inLanguage: ["en-GB", "tr-TR"],
    publisher: { "@id": ids.organization },
  };
}

export function webPageNode(lang: Lang, url: string, name: string, description: string, type = "WebPage", extra: Record<string, unknown> = {}) {
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: inLanguage(lang),
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.organization },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    primaryImageOfPage: extra.image ? { "@type": "ImageObject", url: extra.image } : undefined,
    ...Object.fromEntries(Object.entries(extra).filter(([k]) => k !== "image")),
  };
}

/** Parent breadcrumb for pages that sit under a hub. */
export function breadcrumbParent(lang: Lang, kind: string) {
  const en = lang === "en";
  if (kind.startsWith("solution") && kind !== "solutions") return { name: en ? "Solutions" : "Çözümler", url: pageUrl(lang, "solutions") };
  if (kind.startsWith("service") || kind === "studio") return { name: en ? "Solutions" : "Çözümler", url: pageUrl(lang, "solutions") };
  if (kind.startsWith("note")) return { name: en ? "Insights" : "İçgörüler", url: pageUrl(lang, "insights") };
  return null;
}

/** Service, FAQ and list nodes for the services, solutions and notes. Returns [] for other pages. */
export function offeringNodes(lang: Lang, kind: string, url: string) {
  const en = lang === "en";
  const provider = { "@id": ids.organization };
  const solution = solutionByKey(lang, kind);
  if (solution) {
    const theme = solutionThemes[lang].find(t => t.key === solution.theme);
    const faq = [
      [solution.question, solution.trigger],
      [en ? "Who is this programme for?" : "Bu program kimler için?", solution.audience],
      [en ? "How does the programme start?" : "Program nasıl başlar?", solution.firstStep],
      [en ? "What is outside the scope?" : "Kapsamın dışında neler var?", solution.boundaries],
      ...(faqFor(lang, solution.key) ?? []),
    ];
    return [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: solution.title,
        description: solution.tagline,
        serviceType: theme?.label,
        category: theme?.label,
        keywords: solutionTags[lang][solution.key].join(", "),
        provider,
        areaServed: ["Türkiye", "European Union"],
        audience: { "@type": "BusinessAudience", audienceType: solution.audience },
        availableLanguage: ["English", "Turkish"],
        url,
        mainEntityOfPage: `${url}#webpage`,
        ...(solution.paper ? { subjectOf: { "@type": "Report", name: solution.paper.title, url: absoluteUrl(lang === "en" ? `/en/insights/report/${solution.paper.slug}` : `/tr/icgoruler/rapor/${solution.paper.slug}`) } } : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: inLanguage(lang),
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ];
  }
  if (kind === "solutions") return [{
    "@type": "ItemList",
    "@id": `${url}#programmes`,
    name: en ? "Ganrich Advisory programmes" : "Ganrich Advisory programları",
    numberOfItems: solutions[lang].length,
    itemListElement: solutions[lang].map((s, i) => ({ "@type": "ListItem", position: i + 1, url: pageUrl(lang, s.key), name: s.title })),
  }];
  const service = services[lang].find(s => s.key === kind);
  if (service) return [{
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    description: service.intro,
    serviceType: en ? "Management consulting" : "Yönetim danışmanlığı",
    provider,
    areaServed: ["Türkiye", "European Union"],
    audience: { "@type": "BusinessAudience", audienceType: service.when },
    availableLanguage: ["English", "Turkish"],
    url,
    mainEntityOfPage: `${url}#webpage`,
  }, {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: inLanguage(lang),
    isPartOf: { "@id": `${url}#webpage` },
    mainEntity: [
      [service.question, service.intro],
      [en ? "Who is it for?" : "Kimler için?", service.when],
      [en ? "What is outside the scope?" : "Kapsamın dışında neler var?", service.boundaries],
    ].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  }];
  if (kind === "expertise") return [{
    "@type": "ItemList",
    "@id": `${url}#services`,
    name: en ? "Advisory services" : "Danışmanlık hizmetleri",
    itemListElement: services[lang].map((s, i) => ({ "@type": "ListItem", position: i + 1, url: pageUrl(lang, s.key), name: s.title })),
  }];
  const note = notes[lang].find(n => n.key === kind);
  if (note) return [{
    "@type": "Article",
    "@id": `${url}#article`,
    headline: note.title,
    description: note.thesis,
    inLanguage: inLanguage(lang),
    author: { "@id": ids.person(lang) },
    publisher: provider,
    mainEntityOfPage: `${url}#webpage`,
    about: services[lang].find(s => s.key === note.service)?.title,
  }];
  return [];
}

/** Keywords for the meta tag, where a page has a natural topic list. */
export function pageKeywords(lang: Lang, kind: string) {
  const solution = solutionByKey(lang, kind);
  if (solution) return solutionTags[lang][solution.key];
  if (kind === "solutions") return solutionTagList(lang);
  return undefined;
}
