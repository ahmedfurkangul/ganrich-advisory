import { notes } from './advisory-note-content';
import { listPdfInsights } from "../db/pdf-insights";
import { insightArticles, insightHref, Lang, routeMap } from "./content";
import { absoluteUrl } from "./site-config";

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "\"": "&quot;",
    "'": "&apos;",
  })[character] ?? character);
}

function validDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value.includes("T") ? value : `${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function renderInsightFeed(lang: Lang) {
  const isEn = lang === "en";
  const feedUrl = absoluteUrl(`/${lang}/feed.xml`);
  const insightUrl = absoluteUrl(`/${lang}/${routeMap[lang].insights}`);
  const articles = [...insightArticles[lang]].sort((a, b) => b.date.localeCompare(a.date));
  const articleItems = articles.map((article) => {
    const link = absoluteUrl(insightHref(lang, insightArticles[lang].indexOf(article)));
    const published = validDate(article.date);
    return {
      published,
      xml: `<item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(article.thesis)}</description>
      <author>furkangul@ganrichadvisory.com (${escapeXml(article.author)})</author>
      <category>${escapeXml(article.topic)}</category>
      ${published ? `<pubDate>${published.toUTCString()}</pubDate>` : ""}
      <source url="${feedUrl}">${isEn ? "The Ganrich Brief" : "Ganrich Bülteni"}</source>
    </item>`,
    };
  });
  const reports = await listPdfInsights({ status: "published", language: lang }).catch(() => []);
  const reportItems = reports.filter(report => report.gatingModel !== "private").map(report => {
    const path = lang === "en" ? `/en/insights/report/${report.slug}` : `/tr/icgoruler/rapor/${report.slug}`;
    const link = absoluteUrl(path);
    const published = validDate(report.publicationDate || report.publishedAt || report.updatedAt);
    const category = report.topics[0] || report.contentType;
    return {
      published,
      xml: `<item>
      <title>${escapeXml(report.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(report.shortSummary || report.executiveThesis)}</description>
      ${category ? `<category>${escapeXml(category)}</category>` : ""}
      ${published ? `<pubDate>${published.toUTCString()}</pubDate>` : ""}
      <source url="${feedUrl}">${isEn ? "The Ganrich Brief" : "Ganrich Bülteni"}</source>
    </item>`,
    };
  });
  const noteItems = notes[lang].map(note => {
    const link = absoluteUrl(`/${lang}/${routeMap[lang][note.key]}`);
    const published = validDate('2026-10-22');
    return {published, xml: `<item><title>${escapeXml(note.title)}</title><link>${escapeXml(link)}</link><guid isPermaLink="true">${escapeXml(link)}</guid><description>${escapeXml(note.thesis)}</description><category>Decision notes</category><pubDate>${published!.toUTCString()}</pubDate></item>`};
  });
  const feedItems = [...noteItems, ...articleItems, ...reportItems].sort((a, b) => (b.published?.getTime() ?? 0) - (a.published?.getTime() ?? 0));
  const items = feedItems.map(item => item.xml).join("\n");
  const lastBuildDate = feedItems[0]?.published?.toUTCString() ?? new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${isEn ? "The Ganrich Brief" : "Ganrich Bülteni"}</title>
    <link>${insightUrl}</link>
    <description>${isEn ? "Decision-ready perspectives from Ganrich Advisory." : "Ganrich Advisory’den karara hazır bakışlar."}</description>
    <language>${isEn ? "en-GB" : "tr-TR"}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}
