import { Lang, routeMap } from "./content";
import { Conversation } from "./advisory";
import { Arrow } from "./arrow-icon";
import { buyerQuestionGroups, buyerQuestionsCopy } from "./buyer-questions-content";

const url = (l: Lang, k: string) => "/" + l + "/" + routeMap[l][k];

// EU Buyer Question Bank: short, sourced answers grouped by rule, each linking to its hub or guide.
export function BuyerQuestionsPage({ lang }: { lang: Lang }) {
  const c = buyerQuestionsCopy[lang];
  return <>
    <section className="advisory-hero guide-hero"><p className="kicker">{c.label}</p><h1>{c.h1}</h1><p className="advisory-lead">{c.lead}</p></section>
    <article className="decision-note-body guide-body question-bank">
      <nav className="qb-jump" aria-label={c.jump}><span>{c.jump}</span><ul>{buyerQuestionGroups.map(g => <li key={g.key}><a href={`#${g.key}`}>{g[lang]} · {g.items.length}</a></li>)}</ul></nav>
      {buyerQuestionGroups.map(g => <section key={g.key} id={g.key} className="qb-group">
        <h2>{g[lang]}</h2>
        {g.items.map(item => { const t = item[lang]; return <div key={item.id} id={item.id} className="qb-item">
          <h3>{t.q}</h3>
          <p>{t.a}</p>
          <p className="qb-prepare"><strong>{c.prepare}:</strong> {t.prepare}</p>
          <p className="qb-links">
            <a className="text-link" href={url(lang, item.more)}>{c.more} <Arrow/></a>
            {item.sources.map(([label, href]) => <span key={href}>{c.sources}: <a href={href} rel="noopener" target="_blank">{label}</a></span>)}
          </p>
        </div>; })}
      </section>)}
      <aside className="guide-next-step" aria-label={c.ask}>
        <p className="kicker">{c.ask}</p>
        <p>{c.askBody}</p>
        <p><a className="button light" data-analytics-event="contact_started" href={url(lang, "buyerDesk")}>{c.askCta}</a></p>
      </aside>
      <p className="note-status">{c.checked}</p>
    </article>
    <Conversation lang={lang}/>
  </>;
}
