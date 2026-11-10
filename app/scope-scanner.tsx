"use client";
import { useState } from 'react';
import { Lang, routeMap } from './content';
import { EditorialHero } from './advisory';
import { leadEvent } from './analytics';
import { Arrow } from './arrow-icon';
import { CALENDAR_CHECKED, ruleCalendar } from './regulation-calendar';
import { scopeCopy, scopeExtras, scopeQuestions, scopeRuleIds } from './scope-scanner-content';

// EU rule scope scanner: five questions in the browser, a list of rules worth a closer look. Nothing is sent
// anywhere except the anonymous check_start / check_complete counts that the readiness checks also use.

type Hit = { id: string; name: string; line: string; date?: string; key: string; check?: string };

function hits(lang: Lang, ids: string[]): Hit[] {
  const out: Hit[] = [];
  for (const id of ids) {
    const r = ruleCalendar.find(x => x.id === id);
    if (r) { out.push({ id, name: r.rule[lang], line: r[lang][1], date: r.date, key: r.key, check: r.check }); continue; }
    const e = scopeExtras.find(x => x.id === id);
    if (e) out.push({ id, name: e.rule[lang], line: e[lang], key: e.key });
  }
  // Dated rules first, oldest first; then the topics without a single date.
  return out.sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999'));
}

export function ScopeScanner({ lang }: { lang: Lang }) {
  const c = scopeCopy[lang], m = routeMap[lang];
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [done, setDone] = useState(false);
  const answered = scopeQuestions.filter(q => (answers[q.id] ?? []).length > 0).length;
  const total = scopeQuestions.length;

  const choose = (qid: string, oid: string, multi: boolean) => {
    if (answered === 0) leadEvent('check_start');
    setAnswers(a => {
      const cur = a[qid] ?? [];
      if (!multi) return { ...a, [qid]: [oid] };
      if (oid === 'none') return { ...a, [qid]: cur.includes('none') ? [] : ['none'] };
      const next = cur.includes(oid) ? cur.filter(x => x !== oid) : [...cur.filter(x => x !== 'none'), oid];
      return { ...a, [qid]: next };
    });
  };

  const list = hits(lang, scopeRuleIds(answers));
  const today = new Date().toISOString().slice(0, 10);
  const fmt = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

  return <>
    <EditorialHero label={c.label} title={c.title} intro={c.intro}/>
    <section className="advisory-section readiness-check scope-scanner">
      {!done ? <form onSubmit={e => { e.preventDefault(); leadEvent('check_complete'); setDone(true); window.scrollTo({ top: 0 }); }}>
        <ol className="readiness-questions">{scopeQuestions.map(q => <li key={q.id}>
          <fieldset>
            <legend>{q[lang]}</legend>
            <div className="readiness-options">{q.options.map(o => <label key={o.id}>
              <input type={q.multi ? 'checkbox' : 'radio'} name={q.id} checked={(answers[q.id] ?? []).includes(o.id)} onChange={() => choose(q.id, o.id, q.multi)}/>
              <span>{o[lang]}</span>
            </label>)}</div>
          </fieldset>
        </li>)}</ol>
        <p className="readiness-progress" aria-live="polite">{c.progress(answered, total)}</p>
        <button className="button" disabled={answered < total}>{c.see}</button>
      </form> : <div className="scope-result">
        <p className="print-only readiness-print-head">{c.label} · ganrichadvisory.com · {new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB')}</p>
        <h2 role="status">{list.length ? c.resultTitle(list.length) : c.none}</h2>
        {list.length > 0 && <ol className="scope-rules">{list.map(h => <li key={h.id}>
          <p className="kicker">{h.date ? `${h.date <= today ? c.applies : c.from} ${fmt(h.date)}` : c.noDate}</p>
          <h3>{h.name}</h3>
          <p>{h.line}</p>
          <p className="readiness-links"><a className="text-link" href={`/${lang}/${m[h.key]}`}>{c.programme} <Arrow/></a>{h.check && <a className="text-link" href={`/${lang}/${m[h.check]}`}>{c.check} <Arrow/></a>}</p>
        </li>)}</ol>}
        <p className="contact-small">{c.disclaimer} {c.checked(CALENDAR_CHECKED[lang])}</p>
        <p className="readiness-links"><a className="text-link" href={`/${lang}/${m.regulationCalendar}`}>{c.calendar} <Arrow/></a><button type="button" className="text-link readiness-print" onClick={() => window.print()}>{c.pdf}</button><button type="button" className="text-link" onClick={() => setDone(false)}>{c.restart}</button></p>
        <section className="readiness-ask scope-next">
          <h3>{c.nextTitle}</h3>
          <p>{c.next}</p>
          <p className="readiness-links"><a className="button" href={`/${lang}/${m.buyerDesk}`}>{c.desk}</a><a className="text-link" href={`/${lang}/${m.contact}`}>{c.contact} <Arrow/></a><a className="text-link" href={`/${lang}/${m.newsletter}`}>{c.newsletter} <Arrow/></a></p>
        </section>
      </div>}
    </section>
  </>;
}
