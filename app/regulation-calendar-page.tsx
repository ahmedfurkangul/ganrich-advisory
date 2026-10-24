"use client";
import { Lang, routeMap } from './content';
import { EditorialHero } from './advisory';
import { NewsletterSignup } from './newsletter';
import { CALENDAR_CHECKED, RuleDate, ruleCalendar, ruleDateLabel } from './regulation-calendar';

// EU rule dates with the official source for each, split into what already applies and what is coming.

const url = (l: Lang, k: string) => '/' + l + '/' + routeMap[l][k];

const copy = {
  en: {
    label: 'EU regulation calendar',
    title: 'The EU rule dates your buyers are working to.',
    intro: 'The dates from which EU rules apply to products that Turkish manufacturers and exporters sell into the EU, each with a link to the official text. Your buyer may ask for data well before the date.',
    checked: 'Dates last checked against the official texts on',
    disclaimer: 'This calendar is a summary for planning, not legal advice. Scope, exemptions and later amendments are in the official text.',
    upcoming: 'Coming up', inForce: 'Already applies',
    programme: 'The programme', check: 'Readiness check', source: 'Official text',
  },
  tr: {
    label: 'AB mevzuat takvimi',
    title: 'AB alıcılarınızın çalıştığı kural tarihleri.',
    intro: 'Türk üretici ve ihracatçıların AB’ye sattığı ürünlere AB kurallarının uygulanmaya başladığı tarihler; her biri resmî metnin bağlantısıyla. Alıcınız veriyi bu tarihten çok önce isteyebilir.',
    checked: 'Tarihler resmî metinlerle en son şu tarihte karşılaştırıldı:',
    disclaimer: 'Bu takvim planlama için bir özettir, hukuki görüş değildir. Kapsam, istisnalar ve sonraki değişiklikler resmî metindedir.',
    upcoming: 'Yaklaşanlar', inForce: 'Uygulanmakta olanlar',
    programme: 'İlgili program', check: 'Hazırlık testi', source: 'Resmî metin',
  },
};

function RuleItem({ lang, r }: { lang: Lang; r: RuleDate }) {
  const c = copy[lang];
  const [headline, detail] = r[lang];
  return <li id={r.id} className="calendar-item">
    <time dateTime={r.date}>{ruleDateLabel(lang, r.date)}</time>
    <div>
      <p className="calendar-rule">{r.rule[lang]}</p>
      <h3>{headline}</h3>
      <p>{detail}</p>
      <p className="calendar-links">
        <a href={url(lang, r.key)}>{c.programme} ↗</a>
        {r.check && <a href={url(lang, r.check)}>{c.check} ↗</a>}
        <a href={r.source.url} rel="noopener noreferrer" target="_blank">{`${c.source}: ${r.source.act} ↗`}</a>
      </p>
    </div>
  </li>;
}

export function RegulationCalendarPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const today = new Date().toISOString().slice(0, 10);
  const sorted = [...ruleCalendar].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter(r => r.date > today);
  const inForce = sorted.filter(r => r.date <= today).reverse();
  return <>
    <EditorialHero label={c.label} title={c.title} intro={c.intro}/>
    <section className="advisory-section regulation-calendar">
      <p className="calendar-checked">{c.checked} <time dateTime={CALENDAR_CHECKED.date}>{CALENDAR_CHECKED[lang]}</time>. {c.disclaimer}</p>
      {upcoming.length > 0 && <><h2>{c.upcoming}</h2><ol>{upcoming.map(r => <RuleItem key={r.id} lang={lang} r={r}/>)}</ol></>}
      {inForce.length > 0 && <><h2>{c.inForce}</h2><ol>{inForce.map(r => <RuleItem key={r.id} lang={lang} r={r}/>)}</ol></>}
    </section>
    <NewsletterSignup lang={lang} source={url(lang, 'regulationCalendar')} compact/>
  </>;
}
