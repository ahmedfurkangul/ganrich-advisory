import type { Metadata } from "next";
import { PdfStudioRoute } from "../../../pdf-insight-pages";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Add PDF Insight | Ganrich Advisory",
  description: "Secure editorial workflow for converting authoritative PDF publications into reviewed Ganrich insight pages.",
  robots: { index: false, follow: false },
};

export default function EnglishPdfStudio() {
  return <PdfStudioRoute lang="en"/>;
}
