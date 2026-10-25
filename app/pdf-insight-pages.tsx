import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPdfInsight } from "../db/pdf-insights";
import { routeMap, type Lang } from "./content";
import { getEditor, requireEditor } from "./editor-auth";
import { PdfInsightReport, PdfInsightStudio } from "./pdf-insights";
import { SiteLayout } from "./site";
import { absoluteUrl, metaDescription, SITE_NAME, SITE_ORIGIN } from "./site-config";

export async function PdfStudioRoute({ lang }: { lang: Lang }) {
  const user = await requireEditor();
  return <SiteLayout lang={lang} route={routeMap[lang].insights}><PdfInsightStudio lang={lang} editor={user.displayName}/></SiteLayout>;
}

export async function pdfReportMetadata(lang: Lang, slug: string): Promise<Metadata> {
  const insight = await findPdfInsight(slug, lang).catch(() => null);
  const isEn = lang === "en";
  if (!insight) {
    return {
      title: isEn ? "Report unavailable | Ganrich Advisory" : "Rapor kullanılamıyor | Ganrich Advisory",
      robots: { index: false, follow: false },
    };
  }
  const path = lang === "en" ? `/en/insights/report/${insight.slug}` : `/tr/icgoruler/rapor/${insight.slug}`;
  const description = metaDescription(insight.shortSummary || insight.executiveThesis);
  const socialCard = `/og/${lang}/insights.png`;
  const published = insight.status === "published" && insight.gatingModel !== "private";
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: `${insight.title} | Ganrich Advisory`,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": `/${lang}/feed.xml` },
    },
    robots: published ? { index: true, follow: true } : { index: false, follow: false, noarchive: true },
    openGraph: {
      title: insight.title,
      description,
      type: "article",
      url: path,
      siteName: SITE_NAME,
      locale: isEn ? "en_GB" : "tr_TR",
      images: [{ url: socialCard, width: 1200, height: 630, alt: `${insight.title} — Ganrich Advisory` }],
      ...(insight.publicationDate || insight.publishedAt ? { publishedTime: insight.publicationDate || insight.publishedAt || undefined } : {}),
      ...(insight.updatedAt ? { modifiedTime: insight.updatedAt } : {}),
    },
    twitter: { card: "summary_large_image", title: insight.title, description, images: [socialCard] },
  };
}

export async function PdfReportRoute({ lang, slug }: { lang: Lang; slug: string }) {
  const insight = await findPdfInsight(slug, lang);
  if (!insight) notFound();
  const publicPage = insight.status === "published" && insight.gatingModel !== "private";
  if (!publicPage) {
    const user = await getEditor();
    if (!user) notFound();
  }
  const path = lang === "en" ? `/en/insights/report/${insight.slug}` : `/tr/icgoruler/rapor/${insight.slug}`;
  const currentUrl = absoluteUrl(path);
  const organizationId = absoluteUrl("/#organization");
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Report",
        "@id": `${currentUrl}#report`,
        headline: insight.title,
        description: insight.shortSummary || insight.executiveThesis,
        inLanguage: lang === "en" ? "en-GB" : "tr-TR",
        ...(insight.publicationDate ? { datePublished: insight.publicationDate } : {}),
        ...(insight.updatedAt ? { dateModified: insight.updatedAt } : {}),
        ...(insight.author
          ? { author: { "@type": "Person", name: insight.author } }
          : { author: { "@id": organizationId } }),
        publisher: { "@id": organizationId },
        mainEntityOfPage: currentUrl,
        ...(insight.gatingModel === "fully_ungated" ? {
          encoding: {
            "@type": "MediaObject",
            contentUrl: absoluteUrl(`/api/pdf-insights/${insight.id}/document`),
            encodingFormat: "application/pdf",
          },
        } : {}),
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": organizationId,
        name: SITE_NAME,
        url: absoluteUrl("/"),
        logo: { "@type": "ImageObject", url: absoluteUrl("/brand/ganrich-advisory-threshold.png") },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Ana sayfa", item: absoluteUrl(`/${lang}`) },
          { "@type": "ListItem", position: 2, name: lang === "en" ? "Insights" : "İçgörüler", item: absoluteUrl(`/${lang}/${routeMap[lang].insights}`) },
          { "@type": "ListItem", position: 3, name: insight.title, item: currentUrl },
        ],
      },
    ],
  };
  const structuredData = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <SiteLayout lang={lang} route={routeMap[lang].insights}><PdfInsightReport lang={lang} insight={insight}/>{publicPage && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: structuredData}}/>}</SiteLayout>;
}
