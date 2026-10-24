"use client";
import { useEffect, useState } from 'react';
import { Lang, routeMap } from './content';
import { EditorialHero } from './advisory';

// Sign-up for short regulation updates. Double opt-in: the visitor only joins the list after opening
// the link in the confirmation email. The page also shows the outcome of that link and handles unsubscribing.

const copy = {
  en: {
    label: 'Regulation updates',
    title: 'Know when an EU rule that affects your exports changes.',
    intro: 'Short notes for Turkish manufacturers and exporters on CBAM, the Cyber Resilience Act, EUDR, packaging, batteries and other EU rules: what changed, who it affects and what to check first. Sent only when there is something worth knowing.',
    points: ['Dates and scope changes, in plain language', 'What it means for an exporter, not a summary of the law', 'Links to the related readiness check or whitepaper'],
    heading: 'Sign up', compactHeading: 'Get regulation updates by email',
    compactIntro: 'Short notes when a date or rule like this one changes.',
    email: 'Work email', consent: 'I agree to receive regulation updates from Ganrich Advisory by email. I can unsubscribe at any time.',
    privacyLink: 'Privacy notice', send: 'Sign up', sending: 'Sending…',
    error: 'Sign-up failed. Please try again or write to furkangul@ganrichadvisory.com.',
    confirmed: 'Thank you. Your subscription is confirmed.',
    invalid: 'This confirmation link is no longer valid. Please sign up again.',
    unsubscribeTitle: 'Unsubscribe from regulation updates', unsubscribe: 'Unsubscribe',
    note: 'One email address is all we ask for. It is used only for these updates and is never shared or sold.',
  },
  tr: {
    label: 'Mevzuat bülteni',
    title: 'İhracatınızı etkileyen bir AB kuralı değiştiğinde haberiniz olsun.',
    intro: 'Türk üretici ve ihracatçılar için CBAM, Siber Dayanıklılık Yasası, EUDR, ambalaj, batarya ve diğer AB kuralları üzerine kısa notlar: ne değişti, kimi etkiliyor ve önce neye bakmalı. Yalnızca bilinmeye değer bir gelişme olduğunda gönderilir.',
    points: ['Tarih ve kapsam değişiklikleri, sade bir dille', 'Mevzuat özeti değil, ihracatçı için ne anlama geldiği', 'İlgili hazırlık testi veya teknik nota bağlantı'],
    heading: 'Kaydolun', compactHeading: 'Mevzuat güncellemelerini e-postayla alın',
    compactIntro: 'Bunun gibi bir tarih veya kural değiştiğinde kısa notlar.',
    email: 'İş e-postası', consent: 'Ganrich Advisory’den e-postayla mevzuat bülteni almayı kabul ediyorum. Dilediğim zaman kaydımı iptal edebilirim.',
    privacyLink: 'Gizlilik bildirimi', send: 'Kaydolun', sending: 'Gönderiliyor…',
    error: 'Kayıt yapılamadı. Lütfen tekrar deneyin veya furkangul@ganrichadvisory.com adresine yazın.',
    confirmed: 'Teşekkürler. Kaydınız onaylandı.',
    invalid: 'Bu onay bağlantısı artık geçerli değil. Lütfen yeniden kaydolun.',
    unsubscribeTitle: 'Mevzuat bülteni kaydını iptal edin', unsubscribe: 'Kaydı iptal edin',
    note: 'Yalnızca bir e-posta adresi istiyoruz. Adresiniz sadece bu bülten için kullanılır; paylaşılmaz veya satılmaz.',
  },
};

async function post(body: Record<string, unknown>) {
  const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const result = await response.json() as { ok?: boolean; message?: string };
  if (!response.ok || !result.ok) throw new Error(result.message);
  return result.message ?? '';
}

export function NewsletterSignup({ lang, source, compact = false }: { lang: Lang; source: string; compact?: boolean }) {
  const c = copy[lang];
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      setMessage(await post({ ...data, language: lang, source: source.slice(0, 100) }));
      setStatus('sent');
    } catch (caught) {
      setMessage(caught instanceof Error && caught.message ? caught.message : c.error);
      setStatus('error');
    }
  };
  return <section className={compact ? 'advisory-section updates-signup compact' : 'updates-signup'}>
    <h3>{compact ? c.compactHeading : c.heading}</h3>
    {compact && <p>{c.compactIntro}</p>}
    {status === 'sent' ? <p role="status">{message}</p> : <form className="contact-form simplified-contact" onSubmit={submit}>
      <label>{c.email}<input name="email" type="email" autoComplete="email" maxLength={254} required/></label>
      <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
      <label className="marketing-choice full"><input type="checkbox" name="consent" value="yes" required/><span>{c.consent} <a href={`/${lang}/${routeMap[lang].privacy}`}>{c.privacyLink}</a></span></label>
      {status === 'error' && <p role="alert" className="form-error full">{message}</p>}
      <button className="button" disabled={status === 'sending'}>{status === 'sending' ? c.sending : c.send}</button>
    </form>}
  </section>;
}

export function NewsletterPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const [outcome, setOutcome] = useState('');
  const [token, setToken] = useState('');
  const [unsubscribed, setUnsubscribed] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOutcome(params.get('status') ?? '');
    setToken(params.get('unsubscribe') ?? '');
  }, []);
  const unsubscribe = async () => {
    try { setUnsubscribed(await post({ action: 'unsubscribe', token, language: lang })); }
    catch (caught) { setUnsubscribed(caught instanceof Error && caught.message ? caught.message : c.error); }
  };
  return <>
    <EditorialHero label={c.label} title={c.title} intro={c.intro}/>
    <section className="advisory-section updates-page">
      {outcome === 'confirmed' && <p role="status" className="updates-outcome">{c.confirmed}</p>}
      {outcome === 'invalid' && <p role="alert" className="updates-outcome">{c.invalid}</p>}
      {token ? <div className="updates-signup">
        <h3>{c.unsubscribeTitle}</h3>
        {unsubscribed ? <p role="status">{unsubscribed}</p> : <button type="button" className="button" onClick={unsubscribe}>{c.unsubscribe}</button>}
      </div> : <>
        <ul className="updates-points">{c.points.map(p => <li key={p}>{p}</li>)}</ul>
        <NewsletterSignup lang={lang} source={`/${lang}/${routeMap[lang].newsletter}`}/>
        <p className="contact-small">{c.note}</p>
      </>}
    </section>
  </>;
}
