import { listPdfInsights } from "../../db/pdf-insights";
import { absoluteUrl } from "../site-config";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, character => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character] || character);
}

export async function GET() {
  const reports = await listPdfInsights({ status: "published" }).catch(() => []);
  const entries = reports.filter(report => report.gatingModel !== "private").map(report => {
    const path = report.language === "en"
      ? `/en/insights/report/${report.slug}`
      : `/tr/icgoruler/rapor/${report.slug}`;
    const lastModified = report.updatedAt || report.publishedAt || report.publicationDate;
    return [
      "  <url>",
      `    <loc>${escapeXml(absoluteUrl(path))}</loc>`,
      ...(lastModified ? [`    <lastmod>${escapeXml(lastModified.slice(0, 10))}</lastmod>`] : []),
      "    <changefreq>monthly</changefreq>",
      "    <priority>0.7</priority>",
      "  </url>",
    ].join("\n");
  }).join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=3600",
    },
  });
}
