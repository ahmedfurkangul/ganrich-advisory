import { Lang, routeMap } from "./content";
import { buyerDesk } from "./buyer-desk-content";
import { Arrow } from "./arrow-icon";

// EU Buyer Request Desk page. Plain markup so the full text is in the first HTML response; the FAQ uses
// <details>, so no client state is needed. Reuses the AI Decisions page styles.
const url = (l: Lang, k: string) => "/" + l + "/" + routeMap[l][k];

export function BuyerDeskPage({ lang }: { lang: Lang }) {
  const c = buyerDesk[lang], en = lang === "en";
  const contact = url(lang, "contact") + "?service=buyerDesk";
  return <>
    <section className="advisory-hero"><p className="kicker">{c.kicker}</p><h1>{c.h1}</h1><p className="advisory-lead">{c.lead}</p></section>
    <nav className="advisory-subnav" aria-label={en ? "On this page" : "Bu sayfada"}>
      {[["what", c.doTitle], ["how", c.stepsTitle], ["rules", c.rulesTitle], ["faq", en ? "Questions" : "Sorular"]].map(([id, t]) => <a key={id} href={"#" + id}>{t}</a>)}
    </nav>
    <section className="advisory-section service-overview ai-decisions-scope" id="why">
      <div><p className="kicker">{c.problemTitle}</p><h2>{en ? "Requests without an owner cost time and margin." : "Sahipsiz talepler zaman ve marj kaybettirir."}</h2><p>{c.problem}</p></div>
      <div><h3>{c.audienceTitle}</h3><p>{c.audience}</p></div>
    </section>
    <section className="advisory-section service-overview ai-decisions-scope" id="what">
      <div><p className="kicker">{en ? "Independent of tools and verifiers" : "Araçlardan ve doğrulayıcılardan bağımsız"}</p><h2>{c.doTitle}</h2></div>
      <div>
        <ol className="deliverables ai-do-list">{c.doItems.map(([t, d]) => <li key={t}><strong>{t}</strong><span>{d}</span></li>)}</ol>
        <h3>{c.dontTitle}</h3>
        <ul className="deliverables ai-dont-list">{c.dontItems.map(x => <li key={x}>{x}</li>)}</ul>
      </div>
    </section>
    <section className="advisory-section" id="how">
      <div className="editorial-heading"><p className="kicker">{en ? "Three steps" : "Üç adım"}</p><h2>{c.stepsTitle}</h2></div>
      <div className="decision-exhibit steps buyer-desk-steps">{c.steps.map(([t, d], i) => <div key={t}><span>{i + 1}</span><strong>{t}</strong><p>{d}</p></div>)}</div>
    </section>
    <section className="advisory-section ai-regulation" id="rules">
      <div className="editorial-heading"><p className="kicker">{en ? "Rules" : "Kurallar"}</p><h2>{c.rulesTitle}</h2><p>{c.rulesBody}</p></div>
      <ul className="ai-regulation-links">{c.ruleLinks.map(l => <li key={l.key}><a className="text-link" href={url(lang, l.key)}>{l.label} <Arrow/></a></li>)}</ul>
    </section>
    <section className="advisory-section" id="faq">
      <div className="editorial-heading"><p className="kicker">FAQ</p><h2>{c.faqTitle}</h2></div>
      <div className="guide-faq ai-faq">{c.faq.map(([q, a]) => <details key={q}><summary>{q}<span className="plus" aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>
    </section>
    <section className="advisory-conversation"><div><p className="kicker">{en ? "A useful first conversation" : "Verimli bir ilk görüşme"}</p><h2>{c.ctaTitle}</h2><p>{c.ctaBody}</p></div><a className="button light" data-analytics-event="contact_started" href={contact}>{c.ctaButton} <Arrow/></a></section>
  </>;
}
