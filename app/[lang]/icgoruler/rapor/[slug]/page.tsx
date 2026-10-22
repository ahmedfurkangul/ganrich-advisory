import { PdfReportRoute, pdfReportMetadata } from "../../../../pdf-insight-pages";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return pdfReportMetadata("tr", slug);
}

export default async function TurkishPdfReport({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PdfReportRoute lang="tr" slug={slug}/>;
}
