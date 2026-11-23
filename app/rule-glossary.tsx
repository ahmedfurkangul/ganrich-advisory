import { Lang, routeMap } from "./content";
import { Conversation } from "./advisory";
import { Arrow } from "./arrow-icon";
import { ruleHubs } from "./rule-hubs-content";

const url = (l: Lang, k: string) => "/" + l + "/" + routeMap[l][k];

export const ruleGlossaryCopy = {
  en: {
    title: "EU rule terms in English and Turkish | Ganrich Advisory",
    description: "The English and Turkish terms for CBAM, EUDR, the Cyber Resilience Act, PPWR and Türkiye ETS on one page, as used in EU buyer requests and Turkish rules.",
    label: "Insights · Terms",
    h1: "EU rule terms in English and Turkish",
    lead: "The words EU buyers use in their requests and the Turkish terms used in Turkish rules and in our guides, side by side. Each rule links to its page.",
    en: "English", tr: "Turkish", rule: "Everything on this rule",
  },
  tr: {
    title: "AB kural terimleri: Türkçe ve İngilizce | Ganrich Advisory",
    description: "SKDM, EUDR, Siber Dayanıklılık Yasası, PPWR ve Türkiye ETS terimlerinin Türkçe ve İngilizce karşılıkları tek sayfada; AB alıcı taleplerinde ve mevzuatta geçtiği şekliyle.",
    label: "İçgörüler · Terimler",
    h1: "AB kural terimleri, Türkçe ve İngilizce",
    lead: "AB alıcılarının taleplerinde kullandığı kelimeler ile Türk mevzuatında ve rehberlerimizde geçen Türkçe karşılıkları yan yana. Her kural kendi sayfasına bağlanıyor.",
    en: "İngilizce", tr: "Türkçe", rule: "Bu kural hakkında her şey",
  },
} as const;

// One table per rule hub, built from the hub glossaries so the terms stay in one place.
export function RuleGlossaryPage({ lang }: { lang: Lang }) {
  const c = ruleGlossaryCopy[lang];
  const en = lang === "en";
  return <>
    <section className="advisory-hero guide-hero"><p className="kicker">{c.label}</p><h1>{c.h1}</h1><p className="advisory-lead">{c.lead}</p></section>
    <article className="decision-note-body guide-body rule-glossary">
      {ruleHubs.map(h => <section key={h.key} id={h.key.slice(3).toLowerCase()}>
        <h2>{h[lang].label}</h2>
        <div className="guide-table"><table><thead><tr><th>{en ? c.en : c.tr}</th><th>{en ? c.tr : c.en}</th></tr></thead>
          <tbody>{h[lang].glossary.map(([a, b]) => <tr key={a}><td>{a}</td><td lang={en ? "tr" : "en"}>{b}</td></tr>)}</tbody></table></div>
        <p><a className="text-link" href={url(lang, h.key)}>{c.rule} <Arrow/></a></p>
      </section>)}
    </article>
    <Conversation lang={lang}/>
  </>;
}
