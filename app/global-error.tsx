"use client";

/* eslint-disable @next/next/no-html-link-for-pages */

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body><main className="error-page global-error">
    <a className="error-brand" href="/en">GANRICH ADVISORY</a>
    <div><span className="eyebrow">SYSTEM INTERRUPTION</span><h1>The experience could not be loaded.</h1><p>Try again. If the interruption continues, return shortly or contact Ganrich directly.</p><button className="button" type="button" onClick={reset}>Try again</button></div>
    <div lang="tr"><span className="eyebrow">SİSTEM KESİNTİSİ</span><h2>Deneyim yüklenemedi.</h2><p>Yeniden deneyin. Kesinti sürerse kısa süre sonra geri dönün veya Ganrich ile doğrudan iletişime geçin.</p><a className="text-link" href="mailto:furkangul@gmail.com">furkangul@gmail.com <span aria-hidden="true">↗</span></a></div>
  </main></body></html>;
}
