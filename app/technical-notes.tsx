"use client";
import { useEffect, useMemo, useState } from "react";
import { insightArticles, insightHref, Lang, routeMap } from "./content";
import { notes } from "./advisory-note-content";
import { solutions } from "./solutions-content";
import { PdfInsightHubCards } from "./pdf-insight-cards";

// The insights hub as one library: whitepapers, articles and decision notes in a single list,
// filtered by area (EU rules, industry, AI, strategy) and searchable. The old category pages
// redirect here with the strategy filter selected.

type Group = "eu" | "industry" | "ai" | "strategy";
type Entry = { id: string; group: Group; type: string; topic: string; title: string; summary: string; href: string; extra?: { label: string; href: string } };

const url = (l: Lang, k: string) => "/" + l + "/" + routeMap[l][k];
const groups: Group[] = ["eu", "industry", "ai", "strategy"];

const copy = {
  en: {
    eyebrow: "TECHNICAL NOTES", title: "Notes you can use before the first call.",
    intro: "Whitepapers on EU rules, energy and applied AI, plus articles and decision notes on strategy and growth, in one place. Every whitepaper is free to read in the browser.",
    all: "All", groups: { eu: "EU rules", industry: "Energy and industry", ai: "Applied AI", strategy: "Strategy and growth" },
    search: "Search", placeholder: "Search the notes", paper: "Whitepaper (PDF)", article: "Article", note: "Decision note",
    read: "Read", programme: "The programme", empty: "No note matches this search.", clear: "Clear search", count: (n: number) => `${n} notes`,
  },
  tr: {
    eyebrow: "TEKNİK NOTLAR", title: "İlk görüşmeden önce işinize yarayacak notlar.",
    intro: "AB kuralları, enerji ve uygulamalı yapay zekâ üzerine teknik notlar; strateji ve büyüme üzerine makaleler ve karar notları, tek yerde. Teknik notların tamamı tarayıcıda ücretsiz okunabilir.",
    all: "Tümü", groups: { eu: "AB kuralları", industry: "Enerji ve sanayi", ai: "Uygulamalı yapay zekâ", strategy: "Strateji ve büyüme" },
    search: "Ara", placeholder: "Notlarda arayın", paper: "Teknik not (PDF)", article: "Makale", note: "Karar notu",
    read: "Okuyun", programme: "İlgili program", empty: "Bu aramayla eşleşen bir not yok.", clear: "Aramayı temizleyin", count: (n: number) => `${n} not`,
  },
};

export function libraryEntries(lang: Lang): Entry[] {
  const c = copy[lang];
  const reportBase = lang === "en" ? "/en/insights/report/" : "/tr/icgoruler/rapor/";
  const papers: Entry[] = solutions[lang].flatMap(s => [s.update, s.paper].filter(p => !!p).map(p => ({
    id: p!.slug, group: s.theme, type: c.paper, topic: s.title, title: p!.title, summary: s.tagline,
    href: reportBase + p!.slug, extra: { label: c.programme, href: url(lang, s.key) },
  })));
  const articles: Entry[] = insightArticles[lang].map((a, i) => ({
    id: a.slug, group: "strategy", type: c.article, topic: a.topic, title: a.title, summary: a.thesis, href: insightHref(lang, i),
  }));
  const decisionNotes: Entry[] = notes[lang].map(n => ({
    id: n.key, group: "strategy", type: c.note, topic: c.groups.strategy, title: n.title, summary: n.thesis, href: url(lang, n.key),
  }));
  return [...papers, ...articles, ...decisionNotes];
}

export function TechnicalNotesLibrary({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const locale = lang === "en" ? "en-GB" : "tr-TR";
  const entries = useMemo(() => libraryEntries(lang), [lang]);
  const [filter, setFilter] = useState<"all" | Group>("all");
  const [query, setQuery] = useState("");
  // A link such as #strategy (used by the old category pages) opens the library with that filter.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if ((groups as string[]).includes(hash)) setFilter(hash as Group);
  }, []);
  const list = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(locale);
    return entries.filter(e => (filter === "all" || e.group === filter)
      && (!q || [e.title, e.summary, e.topic, e.type].join(" ").toLocaleLowerCase(locale).includes(q)));
  }, [entries, filter, query, locale]);
  const knownSlugs = useMemo(() => entries.map(e => e.id), [entries]);
  return <>
    <section className="advisory-hero"><p className="kicker">{c.eyebrow}</p><h1>{c.title}</h1><p className="advisory-lead">{c.intro}</p></section>
    <section className="section filter-row notes-filter">
      <div role="group" aria-label={c.eyebrow}>
        <button type="button" aria-pressed={filter === "all"} className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>{c.all} · {entries.length}</button>
        {groups.map(g => <button type="button" key={g} aria-pressed={filter === g} className={filter === g ? "active" : ""} onClick={() => setFilter(g)}>{c.groups[g]} · {entries.filter(e => e.group === g).length}</button>)}
      </div>
      <label><span>{c.search}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={c.placeholder}/></label>
    </section>
    <section className="section notes-library" aria-live="polite">
      <p className="notes-count">{c.count(list.length)}</p>
      {list.length ? <ol>{list.map(e => <li key={e.id}>
        <p className="meta">{e.type} · {e.topic}</p>
        <h2><a href={e.href} data-analytics-event={e.type === c.paper ? undefined : "insight_viewed"}>{e.title}</a></h2>
        <p>{e.summary}</p>
        <p className="notes-links"><a href={e.href}>{c.read} ↗</a>{e.extra && <a href={e.extra.href}>{e.extra.label} ↗</a>}</p>
      </li>)}</ol> : <div className="insight-empty" role="status"><h2>{c.empty}</h2><button type="button" className="text-link" onClick={() => { setFilter("all"); setQuery(""); }}>{c.clear} →</button></div>}
    </section>
    <PdfInsightHubCards lang={lang} exclude={knownSlugs}/>
  </>;
}
