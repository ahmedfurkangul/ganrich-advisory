"use client";
import { useEffect, useState } from 'react';
import { Lang, routeMap } from './content';
import { EditorialHero } from './advisory';

// Sign-up for short regulation updates. Double opt-in: the visitor only joins the list after opening
// the link in the confirmation email. The page also shows the outcome of that link and handles unsubscribing.

const copy = {
  en: {
    label: 'Sunday Brief · Regulation updates',
    title: 'The EU rules your buyers will ask about, every Sunday morning.',
    intro: 'Sunday Brief is a five-minute email for Turkish manufacturers and exporters, sent every Sunday at 08:00 Istanbul time. It covers CBAM, the Cyber Resilience Act, EUDR, packaging, batteries and other EU rules: what changed, who it affects, what an EU buyer may ask next and which dates are coming up. Every item links to its official source.',
    points: ['What changed this week, each item with its official source', 'One question your EU buyer may ask, with how to answer it', 'Dates for the next 90 days and one number worth knowing', 'Free, one email a week, unsubscribe in one click'],
    heading: 'Sign up', compactHeading: 'Get the Sunday Brief by email',
    compactIntro: 'Five minutes every Sunday morning: what changed in EU rules like this one and what to check first.',
    email: 'Work email', consent: 'I agree to receive the weekly Sunday Brief on EU regulation from Ganrich Advisory by email. I can unsubscribe at any time.',
    privacyLink: 'Privacy notice', send: 'Sign up', sending: 'Sending…',
    error: 'Sign-up failed. Please try again or write to furkangul@ganrichadvisory.com.',
    confirmed: 'Thank you. Your subscription is confirmed.',
    invalid: 'This confirmation link is no longer valid. Please sign up again.',
    unsubscribeTitle: 'Unsubscribe from regulation updates', unsubscribe: 'Unsubscribe',
    note: 'One email address is all we ask for. It is used only for the Sunday Brief and is never shared or sold.',
  },
  tr: {
    label: 'Pazar Notu · Mevzuat bülteni',
    title: 'AB alıcınızın soracağı kurallar, her Pazar sabahı.',
    intro: 'Pazar Notu, Türk üretici ve ihracatçılar için her Pazar 08:00\'de gönderilen 5 dakikalık bir e-posta. SKDM (CBAM), Siber Dayanıklılık Yasası, EUDR, ambalaj, batarya ve diğer AB kurallarında ne değişti, kimi etkiliyor, AB alıcınız ne sorabilir ve hangi tarihler yaklaşıyor. Her maddede resmî kaynağın bağlantısı bulunur.',
    points: ['Bu hafta ne değişti; her madde resmî kaynağıyla', 'AB alıcınızın sorabileceği bir soru ve nasıl yanıtlanacağı', 'Önümüzdeki 90 günün tarihleri ve bilinmeye değer bir rakam', 'Ücretsiz, haftada bir e-posta, tek tıkla iptal'],
    heading: 'Kaydolun', compactHeading: 'Pazar Notu\'nu e-postayla alın',
    compactIntro: 'Her Pazar sabahı 5 dakika: bunun gibi AB kurallarında ne değişti, önce neye bakmalı.',
    email: 'İş e-postası', consent: 'Ganrich Advisory’den AB mevzuatı üzerine haftalık Pazar Notu bültenini e-postayla almayı kabul ediyorum. Dilediğim zaman kaydımı iptal edebilirim.',
    privacyLink: 'Gizlilik bildirimi', send: 'Kaydolun', sending: 'Gönderiliyor…',
    error: 'Kayıt yapılamadı. Lütfen tekrar deneyin veya furkangul@ganrichadvisory.com adresine yazın.',
    confirmed: 'Teşekkürler. Kaydınız onaylandı.',
    invalid: 'Bu onay bağlantısı artık geçerli değil. Lütfen yeniden kaydolun.',
    unsubscribeTitle: 'Mevzuat bülteni kaydını iptal edin', unsubscribe: 'Kaydı iptal edin',
    note: 'Yalnızca bir e-posta adresi istiyoruz. Adresiniz sadece Pazar Notu için kullanılır; paylaşılmaz veya satılmaz.',
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
    <section className="advisory-section updates-page" id="sign-up">
      {outcome === 'confirmed' && <p role="status" className="updates-outcome">{c.confirmed}</p>}
      {outcome === 'invalid' && <p role="alert" className="updates-outcome">{c.invalid}</p>}
      {token ? <div className="updates-signup">
        <h3>{c.unsubscribeTitle}</h3>
        {unsubscribed ? <p role="status">{unsubscribed}</p> : <button type="button" className="button" onClick={unsubscribe}>{c.unsubscribe}</button>}
      </div> : <>
        {/* The form comes first so it is on the first screen on a phone; the points explain it below. */}
        <NewsletterSignup lang={lang} source={`/${lang}/${routeMap[lang].newsletter}`}/>
        <p className="contact-small">{c.note}</p>
        <ul className="updates-points">{c.points.map(p => <li key={p}>{p}</li>)}</ul>
      </>}
    </section>
  </>;
}
