"use client";

/* eslint-disable @next/next/no-html-link-for-pages */

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="error-page">
    <a className="error-brand" href="/en" aria-label="Ganrich Advisory — Home">GANRICH ADVISORY</a>
    <div><span className="eyebrow">TEMPORARY INTERRUPTION</span><h1>The page could not be prepared.</h1><p>No decision should depend on a broken interface. Try once more, or return to the home page.</p><button className="button" type="button" onClick={reset}>Try again</button></div>
    <div lang="tr"><span className="eyebrow">GEÇİCİ KESİNTİ</span><h2>Sayfa hazırlanamadı.</h2><p>Hiçbir karar, çalışmayan bir arayüze bağlı kalmamalı. Yeniden deneyin veya ana sayfaya dönün.</p><a className="text-link" href="/tr">Türkçe ana sayfaya dönün <span aria-hidden="true">↗</span></a></div>
  </main>;
}
