import { PdfReportRoute, pdfReportMetadata } from "../../../../pdf-insight-pages";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return pdfReportMetadata("en", slug);
}

export default async function EnglishPdfReport({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PdfReportRoute lang="en" slug={slug}/>;
}
