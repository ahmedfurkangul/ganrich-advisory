import type { ReactNode } from "react";
import { Lang, routeMap } from "./content";
import { Conversation } from "./advisory";
import { guideByKey, type GuideBlock } from "./guides-content";
import { Arrow } from "./arrow-icon";

// Long-form guides, rendered on the server: the full text is in the first HTML response.
const url = (l: Lang, k: string) => "/" + l + "/" + routeMap[l][k];

// Inline markup used in the article text: [label](href) links, **strong**, *emphasis*. Bare URLs in source lists become links.
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*([^*]+)\*|(https:\/\/[^\s)]+)|\*\*([^*]+)\*\*/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<a key={i++} href={m[2]}>{m[1]}</a>);
    else if (m[3]) out.push(<em key={i++}>{m[3]}</em>);
    else if (m[5]) out.push(<strong key={i++}>{m[5]}</strong>);
    else if (m[4]) out.push(<a key={i++} href={m[4]} rel="noopener noreferrer" target="_blank">{m[4].replace(/^https:\/\//, "").replace(/\/$/, "")}</a>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Block({ b }: { b: GuideBlock }) {
  switch (b.t) {
    case "h2": return <h2>{b.text}</h2>;
    case "h3": return <h3>{b.text}</h3>;
    case "p": return <p>{inline(b.text)}</p>;
    case "ul": return <ul>{b.items.map(x => <li key={x}>{inline(x)}</li>)}</ul>;
    case "ol": return <ol>{b.items.map(x => <li key={x}>{inline(x)}</li>)}</ol>;
    case "table": return <div className="guide-table"><table><thead><tr>{b.head.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{b.rows.map(r => <tr key={r.join("|")}>{r.map((c, j) => <td key={j}>{inline(c)}</td>)}</tr>)}</tbody></table></div>;
    case "faq": return <div className="guide-faq">{b.items.map(([q, a]) => <details key={q}><summary>{q}<span className="plus" aria-hidden="true">+</span></summary><p>{inline(a)}</p></details>)}</div>;
    case "sources": return <section className="guide-sources"><h3>{b.title}</h3><ul>{b.items.map(x => <li key={x}>{inline(x)}</li>)}</ul></section>;
  }
}

export function GuidePage({ lang, kind }: { lang: Lang; kind: string }) {
  const g = guideByKey(kind)!, t = g[lang], en = lang === "en";
  const published = new Date(g.date + "T12:00:00Z").toLocaleDateString(en ? "en-GB" : "tr-TR", { day: "numeric", month: "long", year: "numeric" });
  return <>
    <section className="advisory-hero guide-hero"><p className="kicker">{en ? "Technical note" : "Teknik not"} · {g.topic[lang]}</p><h1>{t.h1}</h1><p className="advisory-lead">{t.description}</p></section>
    <article className="decision-note-body guide-body">
      <p className="note-byline">{en ? "Ahmed Furkan Gul" : "Ahmed Furkan Gül"} · Ganrich Advisory · <time dateTime={g.date}>{published}</time> · {g.readingTime[lang]}</p>
      <figure className="guide-cover"><img src={`/guides/${g.image}-${lang}.webp`} width={1600} height={900} alt={t.h1} decoding="async"/></figure>
      {t.blocks.map((b, i) => <Block key={i} b={b}/>)}
      <p className="note-status">{en ? `Dates and sources last checked ${g.checked.en}. General information, not legal advice.` : `Tarihler ve kaynaklar en son ${g.checked.tr} tarihinde kontrol edildi. Genel bilgidir, hukuki görüş değildir.`}</p>
      <p className="notes-links"><a className="text-link" href={url(lang, g.solution)}>{en ? "The related programme" : "İlgili program"} <Arrow/></a> <a className="text-link" href={url(lang, "insights")}>← {en ? "All technical notes" : "Tüm teknik notlar"}</a></p>
    </article>
    <Conversation lang={lang}/>
  </>;
}
