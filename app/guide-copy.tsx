"use client";
import { useState } from 'react';
import { Lang, routeMap } from './content';
import { leadEvent } from './analytics';

// End-of-guide offer: the visitor leaves one email address and gets the guide and its related PDF by email.
// "Save as PDF" prints the guide through the browser instead.
const copy = {
  en: { heading: 'Keep this guide', intro: 'Get the link and the related PDF in your inbox, to read later or forward to a colleague.', introNoPdf: 'Get the link in your inbox, to read later or forward to a colleague.', email: 'Work email', privacy: 'I have read the privacy notice.', privacyLink: 'Privacy notice', send: 'Email me this guide', sending: 'Sending…', sent: 'Sent. Check your inbox in a minute.', error: 'It could not be sent. Please try again or write to furkangul@ganrichadvisory.com.', pdf: 'Save as PDF' },
  tr: { heading: 'Bu notu saklayın', intro: 'Bağlantıyı ve ilgili PDF’i e-postanıza gönderelim; sonra okuyun veya bir iş arkadaşınıza iletin.', introNoPdf: 'Bağlantıyı e-postanıza gönderelim; sonra okuyun veya bir iş arkadaşınıza iletin.', email: 'İş e-postası', privacy: 'Gizlilik bildirimini okudum.', privacyLink: 'Gizlilik bildirimi', send: 'Bu notu e-postama gönder', sending: 'Gönderiliyor…', sent: 'Gönderildi. Birkaç dakika içinde gelen kutunuza bakın.', error: 'Gönderilemedi. Lütfen tekrar deneyin veya furkangul@ganrichadvisory.com adresine yazın.', pdf: 'PDF olarak kaydet' },
} as const;

export function GuideCopy({ lang, guide, hasPdf }: { lang: Lang; guide: string; hasPdf: boolean }) {
  const c = copy[lang];
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const response = await fetch('/api/guide-copy', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...data, guide, language: lang }) });
      const result = await response.json() as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message);
      leadEvent('form_submit');
      setStatus('sent');
    } catch (caught) {
      setMessage(caught instanceof Error && caught.message ? caught.message : c.error);
      setStatus('error');
    }
  };
  return <section className="guide-copy" aria-labelledby="guide-copy-h">
    <h2 id="guide-copy-h">{c.heading}</h2>
    <p>{hasPdf ? c.intro : c.introNoPdf}</p>
    {status === 'sent' ? <p role="status">{c.sent}</p> : <form className="contact-form simplified-contact" onSubmit={submit}>
      <label>{c.email}<input name="email" type="email" autoComplete="email" maxLength={254} required/></label>
      <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
      <label className="marketing-choice full"><input type="checkbox" name="privacyAcknowledged" value="yes" required/><span>{c.privacy} <a href={`/${lang}/${routeMap[lang].privacy}`}>{c.privacyLink}</a></span></label>
      {status === 'error' && <p role="alert" className="form-error full">{message}</p>}
      <button className="button" disabled={status === 'sending'}>{status === 'sending' ? c.sending : c.send}</button>
    </form>}
    <button type="button" className="text-link guide-print" onClick={() => window.print()}>{c.pdf}</button>
  </section>;
}
