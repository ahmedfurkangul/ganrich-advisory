"use client";
import { useState } from 'react';
import { Lang, routeMap } from './content';
import { EditorialHero } from './advisory';
import { leadEvent } from './analytics';
import { checks, scoreCheck, type Answer, type CheckConfig, type CheckId } from './readiness-check-content';

// A short self-assessment that ends in a result and an optional request for a review. Answers stay in the
// browser unless the visitor sends the request, which goes through the normal inquiry API. The visitor can ask
// for a copy of the result by email, or save it as a one-page PDF through the browser's print dialog.

const extra = {
  en: { copy: 'Email me a copy of my result', pdf: 'Save as PDF', sentCopy: 'We have also emailed you a copy of your result.' },
  tr: { copy: 'Sonucumun bir kopyasını e-postayla gönder', pdf: 'PDF olarak kaydet', sentCopy: 'Sonucunuzun bir kopyasını e-postanıza da gönderdik.' },
} as const;

export function CbamReadinessCheck({ lang }: { lang: Lang }) { return <ReadinessCheck lang={lang} id="cbam"/>; }
export function CraReadinessCheck({ lang }: { lang: Lang }) { return <ReadinessCheck lang={lang} id="cra"/>; }
export function EudrReadinessCheck({ lang }: { lang: Lang }) { return <ReadinessCheck lang={lang} id="eudr"/>; }

function ReadinessCheck({ lang, id }: { lang: Lang; id: CheckId }) {
  const config: CheckConfig = checks[id];
  const c = config.copy[lang], x = extra[lang];
  const total = c.questions.length;
  const [answers, setAnswers] = useState<(Answer | undefined)[]>(() => Array(total).fill(undefined));
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const answered = answers.filter(a => a !== undefined).length;
  const { score, max, band, gaps } = scoreCheck(c, answers);
  const [copySent, setCopySent] = useState(false);
  const solutionHref = `/${lang}/${routeMap[lang][config.solution]}`;
  const paperHref = config.paper?.[lang];

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const summary = c.questions.map((q, i) => `${i + 1}. ${c.answers[2 - (answers[i] ?? 0)]}: ${q.q}`).join('\n');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...data, kind: 'contact', language: lang, check: id, answers,
          interest: `${c.label}: ${score}/${max}`,
          context: `${c.score}: ${score}/${max} (${c.bands[band][0]})\n\n${summary}`,
          source: `/${lang}/${routeMap[lang][config.route]}?service=${config.solution}`.slice(0, 100),
        }),
      });
      const result = await response.json() as { ok?: boolean; resultCopy?: string };
      if (!response.ok || !result.ok) throw new Error();
      setCopySent(result.resultCopy === 'sent');
      leadEvent('form_submit');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return <>
    <EditorialHero label={c.label} title={c.title} intro={c.intro}/>
    <section className="advisory-section readiness-check">
      {!done ? <form onSubmit={e => { e.preventDefault(); leadEvent('check_complete'); setDone(true); }}>
        <ol className="readiness-questions">{c.questions.map((q, i) => <li key={i}>
          <fieldset>
            <legend>{q.q}</legend>
            <div className="readiness-options">{c.answers.map((label, j) => {
              const value = (2 - j) as Answer;
              return <label key={j}><input type="radio" name={`q${i}`} checked={answers[i] === value} onChange={() => { if (answered === 0) leadEvent('check_start'); setAnswers(a => a.map((v, k) => k === i ? value : v)); }} required/><span>{label}</span></label>;
            })}</div>
          </fieldset>
        </li>)}</ol>
        <p className="readiness-progress" aria-live="polite">{c.progress(answered, total)}</p>
        <button className="button" disabled={answered < total}>{c.see}</button>
      </form> : <div className="readiness-result">
        <p className="print-only readiness-print-head">{c.label} · ganrichadvisory.com · {new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB')}</p>
        <div className="readiness-score" role="status">
          <p className="kicker">{c.score}</p>
          <strong>{score}<small>/{max}</small></strong>
          <meter min={0} max={max} value={score} aria-label={c.score}/>
          <h2>{c.bands[band][0]}</h2>
          <p>{c.bands[band][1]}</p>
          <p className="contact-small">{c.disclaimer}</p>
        </div>
        <div>
          <h3>{c.gaps}</h3>
          {gaps.length ? <ul className="readiness-gaps">{gaps.map(g => <li key={g.q}>{g.gap}</li>)}</ul> : <p>{c.noGaps}</p>}
          <p className="readiness-links">{paperHref && <a className="text-link" href={paperHref}>{c.paper} ↗</a>}<a className="text-link" href={solutionHref}>{c.programme} ↗</a><button type="button" className="text-link readiness-print" onClick={() => window.print()}>{x.pdf}</button><button type="button" className="text-link" onClick={() => { setDone(false); setStatus('idle'); }}>{c.restart}</button></p>
        </div>
        <section className="readiness-ask">
          <h3>{c.ask}</h3>
          {status === 'sent' ? <p role="status">{c.sent}{copySent && <> {x.sentCopy}</>}</p> : <form className="contact-form simplified-contact" onSubmit={submit}>
            <p className="full">{c.askIntro}</p>
            <label>{c.name}<input name="name" autoComplete="name" minLength={2} maxLength={120} required/></label>
            <label>{c.email}<input name="email" type="email" autoComplete="email" maxLength={254} required/></label>
            <label>{c.company}<input name="organization" autoComplete="organization" maxLength={180} required/></label>
            <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
            <label className="marketing-choice full"><input type="checkbox" name="resultCopy" value="yes" defaultChecked/><span>{x.copy}</span></label>
            <label className="marketing-choice full"><input type="checkbox" name="privacyAcknowledged" value="yes" required/><span>{c.privacy} <a href={`/${lang}/${routeMap[lang].privacy}`}>{c.privacyLink}</a></span></label>
            {status === 'error' && <p role="alert" className="form-error full">{c.error}</p>}
            <button className="button" disabled={status === 'sending'}>{status === 'sending' ? c.sending : c.send}</button>
          </form>}
        </section>
      </div>}
    </section>
  </>;
}
