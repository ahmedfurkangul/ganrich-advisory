/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Ganrich Advisory",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <main className="error-page">
    <a className="error-brand" href="/en" aria-label="Ganrich Advisory — Home">GANRICH ADVISORY</a>
    <div><span className="eyebrow">404 · NOT FOUND</span><h1>The page is not here.</h1><p>The address may have changed. Return to the decision, perspective, or conversation you intended to open.</p><a className="button" href="/en">Return to Ganrich Advisory</a></div>
    <div lang="tr"><span className="eyebrow">404 · SAYFA BULUNAMADI</span><h2>Bu sayfa burada değil.</h2><p>Adres değişmiş olabilir. Açmak istediğiniz karara, bakışa veya görüşmeye geri dönün.</p><a className="text-link" href="/tr">Türkçe ana sayfaya dönün <span aria-hidden="true">↗</span></a></div>
  </main>;
}
