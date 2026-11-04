import { Lang, routeMap } from "./content";
import { aiDecisions } from "./ai-decisions-content";
import { Arrow } from "./arrow-icon";

// AI Decisions page: the independent decision layer above AI deployment. Plain markup so the full
// text is in the first HTML response; the FAQ uses <details>, so no client state is needed.
const url = (l: Lang, k: string) => "/" + l + "/" + routeMap[l][k];

export function AiDecisionsPage({ lang }: { lang: Lang }) {
  const c = aiDecisions[lang], en = lang === "en";
  const contact = (service: string) => url(lang, "contact") + "?service=" + service;
  return <>
    <section className="advisory-hero"><p className="kicker">{c.kicker}</p><h1>{c.h1}</h1><p className="advisory-lead">{c.lead}</p></section>
    <nav className="advisory-subnav" aria-label={en ? "On this page" : "Bu sayfada"}>
      {[["what", c.doTitle], ["offers", en ? "Offers" : "Çalışmalar"], ["regulation", c.regulationTitle], ["faq", en ? "Questions" : "Sorular"]].map(([id, t]) => <a key={id} href={"#" + id}>{t}</a>)}
    </nav>
    <section className="advisory-section service-overview ai-decisions-scope" id="what">
      <div><p className="kicker">{en ? "Independent of the build" : "Kurulumdan bağımsız"}</p><h2>{c.doTitle}</h2><p>{c.positioning}</p></div>
      <div>
        <ol className="deliverables ai-do-list">{c.doItems.map(([t, d]) => <li key={t}><strong>{t}</strong><span>{d}</span></li>)}</ol>
        <h3>{c.dontTitle}</h3>
        <ul className="deliverables ai-dont-list">{c.dontItems.map(x => <li key={x}>{x}</li>)}</ul>
      </div>
    </section>
    <section className="advisory-section" id="offers">
      <div className="editorial-heading"><p className="kicker">{en ? "Offers" : "Çalışmalar"}</p><h2>{c.offersTitle}</h2><p>{c.offersIntro}</p></div>
      <div className="ai-offers">{c.offers.map(o => <article key={o.key} id={o.key}>
        <p className="kicker">{o.audience} · {o.duration}</p>
        <h3>{o.title}</h3>
        <h4>{en ? "What you receive" : "Elde edeceğiniz çıktılar"}</h4>
        <ul className="deliverables">{o.deliverables.map(x => <li key={x}>{x}</li>)}</ul>
        <a className="text-link" data-analytics-event="contact_started" href={contact(o.key)}>{en ? "Ask about this offer" : "Bu çalışma hakkında sorun"} <Arrow/></a>
      </article>)}</div>
    </section>
    <section className="advisory-section ai-regulation" id="regulation">
      <div className="editorial-heading"><p className="kicker">{en ? "Regulation" : "Mevzuat"}</p><h2>{c.regulationTitle}</h2><p>{c.regulationBody}</p></div>
      <ul className="ai-regulation-links">{c.regulationLinks.map(l => <li key={l.key}><a className="text-link" href={url(lang, l.key)}>{l.label} <Arrow/></a></li>)}</ul>
    </section>
    <section className="advisory-section" id="faq">
      <div className="editorial-heading"><p className="kicker">FAQ</p><h2>{c.faqTitle}</h2></div>
      <div className="guide-faq ai-faq">{c.faq.map(([q, a]) => <details key={q}><summary>{q}<span className="plus" aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>
    </section>
    <section className="advisory-conversation"><div><p className="kicker">{en ? "A useful first conversation" : "Verimli bir ilk görüşme"}</p><h2>{c.ctaTitle}</h2><p>{c.ctaBody}</p></div><a className="button light" data-analytics-event="contact_started" href={contact("aiDiagnostic")}>{c.ctaButton} <Arrow/></a></section>
  </>;
}
