"use client";

import { useEffect, useState } from "react";
import type { PdfInsight } from "../db/pdf-insights";
import type { Lang } from "./content";

function reportHref(lang: Lang, insight: Pick<PdfInsight, "slug"> & Partial<Pick<PdfInsight, "language">>) {
  const documentLanguage = insight.language ?? lang;
  return documentLanguage === "en" ? `/en/insights/report/${insight.slug}` : `/tr/icgoruler/rapor/${insight.slug}`;
}

// Lists published reports from the PDF studio. `exclude` drops reports the page already lists from static content.
export function PdfInsightHubCards({ lang, exclude = [] }: { lang: Lang; exclude?: string[] }) {
  const [items, setItems] = useState<PdfInsight[]>([]);

  useEffect(() => {
    const languageFilter = lang === "tr" ? "&language=tr" : "";
    fetch(`/api/pdf-insights?status=published${languageFilter}`)
      .then(async (response) => response.ok ? await response.json() as { insights?: PdfInsight[] } : { insights: [] })
      .then((data) => setItems(data.insights ?? []))
      .catch(() => setItems([]));
  }, [lang]);

  const shown = items.filter(item => !exclude.includes(item.slug));
  if (!shown.length) return null;

  return (
    <section className="section publication-list pdf-publications">
      {shown.map((item, index) => (
        <article key={item.id}>
          <span>{String(index + 4).padStart(2, "0")}</span>
          <div>
            <p className="meta">
              {item.contentType} · {item.regions.join(", ") || (lang === "en" ? "Cross-regional" : "Bölgeler arası")} · {item.language === "tr" && lang === "en" ? "Turkish original · English translation pending" : item.publicationDate ?? (lang === "en" ? "Source date shown in report" : "Kaynak tarihi raporda gösterilir")}
            </p>
            <h2>{item.title}</h2>
            <p>{item.shortSummary || item.executiveThesis}</p>
            <a href={reportHref(lang, item)}>
              {lang === "en" && item.language === "tr" ? "Explore the Turkish report" : lang === "en" ? "Explore the report" : "Raporu inceleyin"} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="mini-art report-art" aria-hidden="true"><span>PDF</span><i/><b/></div>
        </article>
      ))}
    </section>
  );
}
