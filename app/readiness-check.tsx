"use client";
import { useState } from 'react';
import { Lang, routeMap } from './content';
import { EditorialHero } from './advisory';
import { leadEvent } from './analytics';

// A short self-assessment that ends in a result and an optional request for a review. Answers stay in the
// browser unless the visitor sends the request, which goes through the normal inquiry API.

type Answer = 2 | 1 | 0;
type Question = { q: string; gap: string };

const copy = {
  en: {
    label: 'CBAM readiness check',
    title: 'How ready is your CBAM data for an EU buyer?',
    intro: 'Eight questions, about two minutes. You see the result straight away. Nothing is stored unless you ask for a review.',
    answers: ['Yes', 'Partly', 'No or not sure'] as const,
    progress: (n: number, total: number) => `${n} of ${total} answered`,
    see: 'See the result',
    score: 'Readiness score',
    bands: [
      ['Early stage', 'Start with scoping: which products are in scope, and which EU buyers need what, by when. Until then, buyers will rely on default values.'],
      ['Data exists, not yet decision-ready', 'The building blocks are there. The next step is an installation-level emissions file and an honest comparison of actual and default values for one product.'],
      ['Well advanced', 'You are ready to test actual values against defaults with one buyer and to plan verification. The question now is whether a recurring data routine pays off.'],
    ] as const,
    gaps: 'Gaps to close first',
    noGaps: 'No major gaps in these eight areas.',
    disclaimer: 'This is an indicative self-assessment, not a compliance opinion or a verification.',
    ask: 'Ask for a CBAM readiness review',
    askIntro: 'Send the result and we will reply by email with what we would look at first, for one product and one EU buyer.',
    name: 'Name', email: 'Work email', company: 'Company',
    privacy: 'I have read the privacy notice and understand how my request will be handled.', privacyLink: 'Privacy notice',
    send: 'Send the result', sending: 'Sending…',
    sent: 'Thank you. Your result has reached Ganrich Advisory and we will reply by email.',
    error: 'Unable to send. Please try again or write to furkangul@ganrichadvisory.com.',
    paper: 'Read the whitepaper: Actual or default?',
    programme: 'See the CBAM Data Readiness programme',
    restart: 'Start again',
    questions: [
      { q: 'Do you know which of your products sold into the EU are covered by CBAM (iron and steel, aluminium, cement, fertilisers, hydrogen, electricity)?', gap: 'Map products to CN codes and confirm which EU shipments are in scope.' },
      { q: 'Has an EU buyer asked you for emissions data, or for a supplier communication template?', gap: 'Ask your main EU buyers what they need, in which format and by when.' },
      { q: 'Can you measure fuel, electricity and key inputs per installation over a full reporting period?', gap: 'Set up installation-level records for fuels, electricity and inputs.' },
      { q: 'Do you know your direct and indirect emissions per tonne of product?', gap: 'Calculate specific embedded emissions for at least one product.' },
      { q: 'Do you have emissions data for precursors you buy, such as pig iron, ferro-alloys or unwrought aluminium?', gap: 'Request precursor emissions data from your suppliers.' },
      { q: 'Have you compared what actual values and default values would mean for your buyer’s CBAM cost?', gap: 'Run an actual-versus-default comparison before the next price talk.' },
      { q: 'Is one named person responsible for CBAM data and buyer communication?', gap: 'Name an owner for CBAM data and buyer requests.' },
      { q: 'Have you planned how actual emissions data would be verified by an accredited verifier?', gap: 'Plan verification well ahead of your buyer’s reporting deadline.' },
    ] as Question[],
  },
  tr: {
    label: 'CBAM hazırlık testi',
    title: 'CBAM veriniz AB alıcınız için ne kadar hazır?',
    intro: 'Sekiz soru, yaklaşık iki dakika. Sonucu hemen görürsünüz. Değerlendirme istemediğiniz sürece hiçbir şey kaydedilmez.',
    answers: ['Evet', 'Kısmen', 'Hayır veya emin değilim'] as const,
    progress: (n: number, total: number) => `${total} sorudan ${n} tanesi yanıtlandı`,
    see: 'Sonucu görün',
    score: 'Hazırlık puanı',
    bands: [
      ['Başlangıç aşaması', 'Kapsamı netleştirerek başlayın: hangi ürünler kapsamda, hangi AB alıcısı neyi ne zamana kadar istiyor. O zamana kadar alıcılarınız varsayılan değerleri kullanır.'],
      ['Veri var, karar için henüz hazır değil', 'Temel parçalar mevcut. Sonraki adım, tesis düzeyinde bir emisyon dosyası ve tek bir ürün için gerçek ile varsayılan değerlerin dürüst bir karşılaştırması.'],
      ['İleri aşama', 'Gerçek değerleri tek bir alıcıyla varsayılan değerlere karşı sınamaya ve doğrulamayı planlamaya hazırsınız. Artık soru, düzenli bir veri rutininin kendini amorti edip etmediği.'],
    ] as const,
    gaps: 'Önce kapatılması gereken boşluklar',
    noGaps: 'Bu sekiz alanda belirgin bir boşluk yok.',
    disclaimer: 'Bu, yol gösterici bir öz değerlendirmedir; uyum görüşü veya doğrulama değildir.',
    ask: 'CBAM hazırlık değerlendirmesi isteyin',
    askIntro: 'Sonucu gönderin; tek bir ürün ve tek bir AB alıcısı için önce neye bakacağımızı e-postayla yazalım.',
    name: 'Ad soyad', email: 'İş e-postası', company: 'Şirket',
    privacy: 'Gizlilik bildirimini okudum ve talebimin nasıl işleneceğini anladım.', privacyLink: 'Gizlilik bildirimi',
    send: 'Sonucu gönderin', sending: 'Gönderiliyor…',
    sent: 'Teşekkürler. Sonucunuz Ganrich Advisory’ye ulaştı; e-postayla dönüş yapacağız.',
    error: 'Gönderilemedi. Lütfen tekrar deneyin veya furkangul@ganrichadvisory.com adresine yazın.',
    paper: 'Teknik notu okuyun: Gerçek mi, varsayılan mı?',
    programme: 'CBAM Veri Hazırlığı programını inceleyin',
    restart: 'Baştan başlayın',
    questions: [
      { q: 'AB’ye sattığınız ürünlerden hangilerinin CBAM kapsamında olduğunu biliyor musunuz (demir-çelik, alüminyum, çimento, gübre, hidrojen, elektrik)?', gap: 'Ürünleri GTİP/KN kodlarıyla eşleştirin ve hangi AB sevkiyatlarının kapsamda olduğunu netleştirin.' },
      { q: 'Bir AB alıcısı sizden emisyon verisi veya tedarikçi bildirim şablonu istedi mi?', gap: 'Ana AB alıcılarınıza neyi, hangi formatta ve ne zamana kadar istediklerini sorun.' },
      { q: 'Yakıt, elektrik ve temel girdileri tesis bazında ve tam bir raporlama dönemi boyunca ölçebiliyor musunuz?', gap: 'Yakıt, elektrik ve girdiler için tesis düzeyinde kayıt düzeni kurun.' },
      { q: 'Ton ürün başına doğrudan ve dolaylı emisyonlarınızı biliyor musunuz?', gap: 'En az bir ürün için gömülü emisyonları hesaplayın.' },
      { q: 'Satın aldığınız ara ürünlerin (pik demir, ferro alaşımlar, işlenmemiş alüminyum gibi) emisyon verisi elinizde mi?', gap: 'Tedarikçilerinizden ara ürün emisyon verisi isteyin.' },
      { q: 'Gerçek değerler ile varsayılan değerlerin alıcınızın CBAM maliyetine etkisini karşılaştırdınız mı?', gap: 'Bir sonraki fiyat görüşmesinden önce gerçek–varsayılan değer karşılaştırması yapın.' },
      { q: 'CBAM verisinden ve alıcı iletişiminden sorumlu, adı belli bir kişi var mı?', gap: 'CBAM verisi ve alıcı talepleri için bir sorumlu belirleyin.' },
      { q: 'Gerçek emisyon verisinin akredite bir doğrulayıcı tarafından nasıl doğrulanacağını planladınız mı?', gap: 'Doğrulamayı alıcınızın bildirim tarihinden epey önce planlayın.' },
    ] as Question[],
  },
};

export function CbamReadinessCheck({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const total = c.questions.length;
  const [answers, setAnswers] = useState<(Answer | undefined)[]>(() => Array(total).fill(undefined));
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const answered = answers.filter(a => a !== undefined).length;
  const score = answers.reduce<number>((s, a) => s + (a ?? 0), 0);
  const max = total * 2;
  const band = score <= 6 ? 0 : score <= 11 ? 1 : 2;
  const gaps = c.questions.filter((_, i) => (answers[i] ?? 0) < 2);
  const solutionHref = `/${lang}/${routeMap[lang].solutionCbam}`;
  const paperHref = lang === 'en' ? '/en/insights/report/cbam-actual-or-default-e9f664d8' : '/tr/icgoruler/rapor/cbam-gercek-mi-varsayilan-mi-ef31215c';

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
          ...data, kind: 'contact', language: lang,
          interest: `${c.label}: ${score}/${max}`,
          context: `${c.score}: ${score}/${max} (${c.bands[band][0]})\n\n${summary}`,
          source: `/${lang}/${routeMap[lang].cbamCheck}?service=solutionCbam`.slice(0, 100),
        }),
      });
      const result = await response.json() as { ok?: boolean };
      if (!response.ok || !result.ok) throw new Error();
      leadEvent('form_submit');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return <>
    <EditorialHero label={c.label} title={c.title} intro={c.intro}/>
    <section className="advisory-section readiness-check">
      {!done ? <form onSubmit={e => { e.preventDefault(); setDone(true); }}>
        <ol className="readiness-questions">{c.questions.map((q, i) => <li key={i}>
          <fieldset>
            <legend>{q.q}</legend>
            <div className="readiness-options">{c.answers.map((label, j) => {
              const value = (2 - j) as Answer;
              return <label key={j}><input type="radio" name={`q${i}`} checked={answers[i] === value} onChange={() => setAnswers(a => a.map((v, k) => k === i ? value : v))} required/><span>{label}</span></label>;
            })}</div>
          </fieldset>
        </li>)}</ol>
        <p className="readiness-progress" aria-live="polite">{c.progress(answered, total)}</p>
        <button className="button" disabled={answered < total}>{c.see}</button>
      </form> : <div className="readiness-result">
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
          <p className="readiness-links"><a className="text-link" href={paperHref}>{c.paper} ↗</a><a className="text-link" href={solutionHref}>{c.programme} ↗</a><button type="button" className="text-link" onClick={() => { setDone(false); setStatus('idle'); }}>{c.restart}</button></p>
        </div>
        <section className="readiness-ask">
          <h3>{c.ask}</h3>
          {status === 'sent' ? <p role="status">{c.sent}</p> : <form className="contact-form simplified-contact" onSubmit={submit}>
            <p className="full">{c.askIntro}</p>
            <label>{c.name}<input name="name" autoComplete="name" minLength={2} maxLength={120} required/></label>
            <label>{c.email}<input name="email" type="email" autoComplete="email" maxLength={254} required/></label>
            <label>{c.company}<input name="organization" autoComplete="organization" maxLength={180} required/></label>
            <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
            <label className="marketing-choice full"><input type="checkbox" name="privacyAcknowledged" value="yes" required/><span>{c.privacy} <a href={`/${lang}/${routeMap[lang].privacy}`}>{c.privacyLink}</a></span></label>
            {status === 'error' && <p role="alert" className="form-error full">{c.error}</p>}
            <button className="button" disabled={status === 'sending'}>{status === 'sending' ? c.sending : c.send}</button>
          </form>}
        </section>
      </div>}
    </section>
  </>;
}
