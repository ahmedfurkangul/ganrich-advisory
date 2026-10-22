import type { Metadata } from "next";
import { PdfStudioRoute } from "../../../pdf-insight-pages";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "PDF İçgörüsü Ekle | Ganrich Advisory",
  description: "Yetkili PDF yayınlarını incelenmiş Ganrich içgörü sayfalarına dönüştürmek için güvenli editoryal iş akışı.",
  robots: { index: false, follow: false },
};

export default function TurkishPdfStudio() {
  return <PdfStudioRoute lang="tr"/>;
}
