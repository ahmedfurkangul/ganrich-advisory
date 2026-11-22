import { Lang, routeMap } from "./content";
import { Conversation } from "./advisory";
import { Arrow } from "./arrow-icon";
import { guideIndex } from "./guides-index";
import { ruleHubByKey } from "./rule-hubs-content";

const url = (l: Lang, k: string) => "/" + l + "/" + routeMap[l][k];
// Rule hubs with their own section in the EU Buyer Question Bank (section id = key without "hub", lower case).
const bankSections = new Set(["hubCbam", "hubEudr", "hubCra", "hubTrEts"]);
const reportUrl = (l: Lang, slug: string) => (l === "en" ? "/en/insights/report/" : "/tr/icgoruler/rapor/") + slug;

// A rule hub: the short answer, the dates, what the buyer asks for, first steps, and every related page.
export function RuleHubPage({ lang, kind }: { lang: Lang; kind: string }) {
  const hub = ruleHubByKey(kind);
  if (!hub) return null;
  const t = hub[lang];
  const en = lang === "en";
  const guides = hub.guides.map(k => guideIndex.find(g => g.key === k)).filter(g => g !== undefined);
  return <>
    <section className="advisory-hero guide-hero"><p className="kicker">{t.label}</p><h1>{t.h1}</h1><p className="advisory-lead">{t.lead}</p></section>
    <article className="decision-note-body guide-body rule-hub">
      <aside className="guide-short-answer" aria-label={en ? "Short answer" : "Kısa cevap"}><p className="kicker">{en ? "Short answer" : "Kısa cevap"}</p><p>{t.shortAnswer}</p></aside>
      <h2>{t.datesTitle}</h2>
      <ol className="hub-dates">{t.dates.map(([iso, label, what]) => <li key={iso}><time dateTime={iso}>{label}</time><span>{what}</span></li>)}</ol>
      <p className="hub-calendar-link"><a className="text-link" href={url(lang, "regulationCalendar")}>{en ? "All EU rule dates" : "Tüm AB kural tarihleri"} <Arrow/></a></p>
      <h2>{t.asksTitle}</h2>
      <ul>{t.asks.map(a => <li key={a}>{a}</li>)}</ul>
      <h2>{t.stepsTitle}</h2>
      <ol>{t.steps.map(s => <li key={s}>{s}</li>)}</ol>
      <aside className="guide-next-step hub-next" aria-label={en ? "Where to go next" : "Sonraki adım"}>
        <p className="kicker">{en ? "Go deeper" : "Ayrıntıya inin"}</p>
        <ul className="hub-resources">
          {guides.map(g => <li key={g.key}><span>{en ? "Guide" : "Rehber"}</span><a href={url(lang, g.key)}>{g[lang].h1}</a></li>)}
          {hub.check && <li><span>{en ? "Readiness check" : "Hazırlık testi"}</span><a href={url(lang, hub.check)}>{en ? "See where you stand in eight questions" : "Sekiz soruda nerede durduğunuzu görün"}</a></li>}
          {hub.reports[lang].map(r => <li key={r.slug}><span>{en ? "Whitepaper" : "Teknik not"}</span><a href={reportUrl(lang, r.slug)}>{r.title}</a></li>)}
          <li><span>{en ? "Programme" : "Program"}</span><a href={url(lang, hub.solution)}>{en ? "How we work on this with you" : "Bu konuda sizinle nasıl çalışıyoruz"}</a></li>
          {bankSections.has(hub.key) && <li><span>{en ? "Buyer questions" : "Alıcı soruları"}</span><a href={`${url(lang, "buyerQuestions")}#${hub.key.slice(3).toLowerCase()}`}>{en ? "What EU buyers ask on this rule, answered" : "AB alıcılarının bu kural hakkında sorduğu sorular ve cevapları"}</a></li>}
          <li><span>{en ? "Buyer requests" : "Alıcı talepleri"}</span><a href={url(lang, "buyerDesk")}>{en ? "EU Buyer Request Desk" : "AB Alıcı Talep Masası"}</a></li>
        </ul>
        <p><a className="button light" data-analytics-event="contact_started" href={`${url(lang, "contact")}?service=${hub.solution}`}>{en ? "Ask about this" : "Bunu sorun"}</a></p>
      </aside>
      <h2>{en ? "Frequently asked questions" : "Sıkça sorulan sorular"}</h2>
      <div className="guide-faq">{t.faq.map(([q, a]) => <details key={q}><summary>{q}<span className="plus" aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>
      <h2>{en ? "Terms in English and Turkish" : "Türkçe ve İngilizce terimler"}</h2>
      <p><a className="text-link" href={url(lang, "ruleGlossary")}>{en ? "All EU rule terms" : "Tüm AB kural terimleri"} <Arrow/></a></p>
      <div className="guide-table"><table><thead><tr><th>{en ? "English" : "Türkçe"}</th><th>{en ? "Turkish" : "İngilizce"}</th></tr></thead><tbody>{t.glossary.map(([a, b]) => <tr key={a}><td>{a}</td><td lang={en ? "tr" : "en"}>{b}</td></tr>)}</tbody></table></div>
      <p className="note-status">{t.checked}</p>
    </article>
    <Conversation lang={lang}/>
  </>;
}
