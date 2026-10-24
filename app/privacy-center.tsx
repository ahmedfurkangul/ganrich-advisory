"use client";

import { useEffect, useRef, useState } from "react";
import { Lang, routeMap } from "./content";

const STORAGE_KEY = "ganrich-privacy-choice-v1";
const OPEN_EVENT = "ganrich:open-cookie-preferences";
const OPTIONAL_STORAGE = [
  "ganrich-briefing-tray",
  "ganrich-framer-en",
  "ganrich-framer-tr",
  "ganrich-reading-mode",
];

type PreferenceState = {
  version: "1.0";
  necessary: true;
  functional: boolean;
  analytics: false;
  marketing: false;
  embedded: false;
  timestamp: string;
  language: Lang;
};

const copy = {
  en: {
    bannerTitle: "Your privacy, without the theatre.",
    bannerBody: "This site uses essential technology, optional first-party preferences, and a cookieless count of visits and contact steps that stores no IP address. No advertising cookies, cross-site tracking, or third-party media are active.",
    accept: "Accept optional",
    reject: "Essential only",
    manage: "Manage choices",
    dialogTitle: "Cookie preferences",
    dialogIntro: "Choose whether this site may remember optional interface settings. Your choice can be changed at any time.",
    save: "Save preferences",
    close: "Close",
    necessary: "Essential",
    necessaryBody: "Required for security, delivery, language choice, and remembering this consent decision. Always active.",
    functional: "Functional preferences",
    functionalBody: "Remembers saved reading tools, briefing items, and Decision Lab drafts on this device.",
    unavailable: "Not currently in use",
    unavailableBody: "Analytics cookies, advertising, and third-party embedded media are not enabled in the current build.",
    current: "Current choice",
    saved: "Preferences saved",
    notSet: "No choice recorded",
    on: "On",
    off: "Off",
    updated: "Last updated",
  },
  tr: {
    bannerTitle: "Gösterişsiz, açık gizlilik.",
    bannerBody: "Bu site zorunlu teknolojileri, isteğe bağlı birinci taraf tercihlerini ve IP adresi saklamayan çerezsiz bir ziyaret ve iletişim adımı sayımını kullanır. Reklam çerezleri, siteler arası izleme veya üçüncü taraf medya etkin değildir.",
    accept: "İsteğe bağlıları kabul et",
    reject: "Yalnızca zorunlu",
    manage: "Tercihleri yönet",
    dialogTitle: "Çerez tercihleri",
    dialogIntro: "Sitenin isteğe bağlı arayüz ayarlarını hatırlayıp hatırlamayacağını seçin. Tercihinizi dilediğiniz zaman değiştirebilirsiniz.",
    save: "Tercihleri kaydet",
    close: "Kapat",
    necessary: "Zorunlu",
    necessaryBody: "Güvenlik, sunum, dil seçimi ve bu tercih kararının hatırlanması için gereklidir. Her zaman etkindir.",
    functional: "İşlevsel tercihler",
    functionalBody: "Kaydedilen okuma araçlarını, brifing öğelerini ve Karar Laboratuvarı taslaklarını bu cihazda hatırlar.",
    unavailable: "Şu anda kullanılmıyor",
    unavailableBody: "Analitik çerezleri, reklam ve üçüncü taraf gömülü medya mevcut sürümde etkin değildir.",
    current: "Mevcut tercih",
    saved: "Tercihler kaydedildi",
    notSet: "Kayıtlı tercih yok",
    on: "Açık",
    off: "Kapalı",
    updated: "Son güncelleme",
  },
} as const;

function readPreference(): PreferenceState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PreferenceState;
    return parsed.version === "1.0" ? parsed : null;
  } catch {
    return null;
  }
}

export function optionalPreferencesEnabled() {
  return Boolean(readPreference()?.functional);
}

function storePreference(lang: Lang, functional: boolean) {
  const next: PreferenceState = {
    version: "1.0",
    necessary: true,
    functional,
    analytics: false,
    marketing: false,
    embedded: false,
    timestamp: new Date().toISOString(),
    language: lang,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  if (!functional) OPTIONAL_STORAGE.forEach((key) => localStorage.removeItem(key));
  return next;
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function PrivacyControls({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [preference, setPreference] = useState<PreferenceState | null>(null);
  const [functional, setFunctional] = useState(false);
  const [status, setStatus] = useState("");
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const current = readPreference();
    queueMicrotask(() => {
      setPreference(current);
      setFunctional(Boolean(current?.functional));
      setReady(true);
    });
    const show = () => {
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const latest = readPreference();
      setPreference(latest);
      setFunctional(Boolean(latest?.functional));
      setStatus("");
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.setTimeout(() => previousFocus.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeDialog = () => {
    setOpen(false);
    window.setTimeout(() => previousFocus.current?.focus(), 0);
  };

  const choose = (value: boolean) => {
    const next = storePreference(lang, value);
    setPreference(next);
    setFunctional(value);
    setStatus(t.saved);
    closeDialog();
  };

  return <>
    {ready && !preference && !open && <section className="privacy-banner" aria-labelledby="privacy-banner-title">
      <div><strong id="privacy-banner-title">{t.bannerTitle}</strong><p>{t.bannerBody}</p></div>
      <div className="privacy-banner-actions">
        <button type="button" onClick={() => choose(true)}>{t.accept}</button>
        <button type="button" onClick={() => choose(false)}>{t.reject}</button>
        <button type="button" onClick={(event) => { previousFocus.current = event.currentTarget; setOpen(true); }}>{t.manage}</button>
      </div>
    </section>}
    {open && <div className="privacy-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeDialog()}>
      <section className="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-dialog-title">
        <button ref={closeButton} className="privacy-close" type="button" onClick={closeDialog} aria-label={t.close}>×</button>
        <span className="eyebrow">{lang === "en" ? "PRIVACY CONTROL" : "GİZLİLİK KONTROLÜ"}</span>
        <h2 id="privacy-dialog-title">{t.dialogTitle}</h2>
        <p>{t.dialogIntro}</p>
        <div className="preference-list">
          <div><span><strong>{t.necessary}</strong><small>{t.necessaryBody}</small></span><b>{t.on}</b></div>
          <label><span><strong>{t.functional}</strong><small>{t.functionalBody}</small></span><input type="checkbox" checked={functional} onChange={(event) => setFunctional(event.target.checked)}/></label>
          <div className="preference-muted"><span><strong>{t.unavailable}</strong><small>{t.unavailableBody}</small></span><b>{t.off}</b></div>
        </div>
        <footer><button className="button" type="button" onClick={() => choose(functional)}>{t.save}</button><button type="button" onClick={closeDialog}>{t.close}</button></footer>
        <span className="sr-status" aria-live="polite">{status}</span>
      </section>
    </div>}
  </>;
}

export function CookiePreferencesPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [preference, setPreference] = useState<PreferenceState | null>(null);
  const [functional, setFunctional] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const current = readPreference();
    queueMicrotask(() => {
      setPreference(current);
      setFunctional(Boolean(current?.functional));
    });
  }, []);

  const save = () => {
    const next = storePreference(lang, functional);
    setPreference(next);
    setSaved(true);
  };

  return <TrustShell lang={lang} label={lang === "en" ? "COOKIE CONTROL" : "ÇEREZ KONTROLÜ"} title={t.dialogTitle} intro={t.dialogIntro}>
    <section className="trust-status">
      <span>{t.current}</span>
      <strong>{preference ? `${t.necessary}: ${t.on} · ${t.functional}: ${functional ? t.on : t.off}` : t.notSet}</strong>
      {preference && <small>{t.updated}: {new Date(preference.timestamp).toLocaleString(lang === "en" ? "en-GB" : "tr-TR")}</small>}
    </section>
    <section className="preference-page-list">
      <article><div><span>01</span><h2>{t.necessary}</h2><p>{t.necessaryBody}</p></div><strong>{t.on}</strong></article>
      <article><div><span>02</span><h2>{t.functional}</h2><p>{t.functionalBody}</p></div><label className="switch-control"><input type="checkbox" checked={functional} onChange={(event) => setFunctional(event.target.checked)}/><span>{functional ? t.on : t.off}</span></label></article>
      <article className="muted"><div><span>03</span><h2>{t.unavailable}</h2><p>{t.unavailableBody}</p></div><strong>{t.off}</strong></article>
    </section>
    <div className="preference-save"><button className="button" type="button" onClick={save}>{t.save}</button>{saved && <span role="status">{t.saved}</span>}</div>
  </TrustShell>;
}

type TrustKind = "privacy" | "kvkk" | "cookies" | "dataRights" | "aiTransparency" | "legal" | "terms" | "policyUpdates" | "vendors";

const pages: Record<Lang, Record<TrustKind, {
  label: string;
  title: string;
  intro: string;
  status?: string;
  sections: Array<[string, string, string[]?]>;
}>> = {
  en: {
    privacy: {
      label: "PRIVACY NOTICE",
      title: "Privacy, explained in plain language.",
      intro: "A factual account of the public website, its limited data surface, and the choices available to visitors.",
      status: "Controller: Ahmed Furkan Gül (Ganrich Advisory) · furkangul@ganrichadvisory.com · Last updated 24 October 2026.",
      sections: [
        ["Who is responsible", "Ahmed Furkan Gül publishes this site and offers advisory work under the name Ganrich Advisory, and is the controller of the personal data described here. Ganrich Advisory is not yet a registered company; this notice will be updated when one is formed. Contact: furkangul@ganrichadvisory.com."],
        ["What the public site handles", "Language choice, consent choice, and optional interface preferences may be stored locally on your device. Contact, briefing and whitepaper download details are transmitted securely and stored to review and respond to your request. What we receive is what you type: usually your name, email address, organisation and message, and for a check result or document request also the check or document concerned."],
        ["Why these technologies exist", "Essential technologies support secure delivery and remember the choice you make in the privacy control. Optional first-party storage remembers reading tools and drafts only when you allow it."],
        ["Cookieless visit statistics", "When a page is requested, the server records the page, the referring website, any campaign tags in the link, an approximate location derived from the network (country and city), the network operator, device type, browser, and operating system. No cookie is set and no IP address is stored. A pseudonymous code that changes every day lets us count unique visits per day without following anyone across days. Once a page has loaded, your browser sends a short signal that it displayed the page, which lets us tell real visits from automated clients. The same log counts the steps toward contacting us (a click on a contact button, starting the contact form, sending it) and whether a readiness check was started and reached its result. Only the step and the page are recorded, never what is typed or which answers you chose. These records are kept for 13 months and are used only to understand how the site is used."],
        ["Regulation updates by email", "If you sign up for regulation updates, we store your email address, the language and page you signed up from, and when you confirmed. You join the list only after opening the link in the confirmation email. The address is used only to send these updates, through our email provider, and is never shared or sold. Every email has an unsubscribe link; after unsubscribing we keep only a record that you opted out."],
        ["Protection against misuse", "To stop repeated or automated form submissions, each submission is stored with a one-way code calculated from your network address and browser. The network address itself is not stored."],
        ["What is not active", "The current build does not set analytics or advertising cookies and does not run behavioural profiling, cross-site tracking, third-party media embeds, or external AI prompt processing."],
        ["Who receives the data", "Form submissions reach Ahmed Furkan Gül as email alerts. The site and its data run on service providers that act on our instructions: Cloudflare (hosting, database, file storage and security), Resend (sending confirmation and alert emails), Microsoft (the furkangul@ganrichadvisory.com mailbox) and Google (a Gmail mailbox that receives form alerts). Their servers are in the United States and other countries, so your data is transferred abroad. Data is never sold or used for anyone else's marketing, and is given to public authorities only when the law requires it."],
        ["How long it is kept", "Each type of data is deleted when its period ends:", ["Contact, check-result and download requests: 24 months from receipt, then deleted automatically. Copies in our mailbox are deleted on the same schedule. If an engagement follows, the related correspondence is kept with that engagement's records for as long as the law requires.", "Regulation updates: for as long as you are subscribed. Sign-ups that are never confirmed are deleted after 30 days. After you unsubscribe we keep only your address and the date, so that you are not added again.", "Download links: valid for 24 hours and deleted shortly after they expire.", "Visit statistics: 13 months."]],
        ["Your choices and rights", "Use Cookie preferences at any time to withdraw optional local storage. Clearing browser storage also removes locally saved choices and drafts. To ask what we hold about you, or to have it corrected or deleted, see Data rights."],
      ],
    },
    kvkk: {
      label: "TÜRKİYE DATA PROTECTION",
      title: "Türkiye data-protection information.",
      intro: "The notice required by Article 10 of Türkiye's Personal Data Protection Law No. 6698: who processes your personal data on this site, why, and how.",
      status: "Last updated 24 October 2026.",
      sections: [
        ["Data controller", "The controller is Ahmed Furkan Gül, an individual who publishes this site under the name Ganrich Advisory. Ganrich Advisory is not yet a registered company; this notice will be updated when one is formed. Contact: furkangul@ganrichadvisory.com."],
        ["Data processed and how it is collected", "Personal data is collected electronically, partly by automated means, through the forms on this site and server records:", ["Contact form: name, email, organisation, topic and your message; for a briefing request also role, region and the decision you are weighing.", "Readiness-check result and whitepaper requests: name, email, organisation and the check result or document concerned.", "Regulation updates: email address, language, sign-up page, and when you signed up, confirmed or unsubscribed.", "Visit statistics: the page viewed, referring site, campaign tags, approximate location derived from the network, network operator, device, browser and operating system type, and a pseudonymous code that changes every day. No IP address is stored.", "Protection against misuse: a one-way code calculated from the network address and browser when a form is sent."]],
        ["Purposes and legal bases", "Your data is processed only for these purposes and on these legal bases:", ["Reviewing your request, replying and discussing a possible engagement: necessary to enter into a contract (Art. 5/2-c) and our legitimate interest (Art. 5/2-f).", "Sending the document or check result you asked for: necessary for the request you made (Art. 5/2-c).", "Sending regulation updates: your explicit consent (Art. 5/1), given through the link in the confirmation email and withdrawable at any time through the unsubscribe link in every email.", "Keeping the site secure, preventing misuse and measuring its use without cookies: our legitimate interest (Art. 5/2-f).", "Establishing, exercising or defending legal claims if a dispute arises (Art. 5/2-e)."]],
        ["Transfers", "Within these purposes only, data is transferred to service providers acting on our instructions: Cloudflare (hosting, database, file storage and security), Resend (sending confirmation and alert emails), Microsoft (the furkangul@ganrichadvisory.com mailbox) and Google (a Gmail mailbox that receives form alerts). Their servers are in the United States and other countries, so your data is transferred abroad. Data is never sold or used for anyone else's marketing, and is given to public authorities only on a request they are legally entitled to make."],
        ["Retention", "Data is deleted when its period ends:", ["Contact, check-result and download requests: 24 months from receipt, then deleted automatically. Copies in our mailbox are deleted on the same schedule. If an engagement follows, the related correspondence is kept with that engagement's records for as long as the law requires.", "Regulation updates: for as long as you are subscribed. Sign-ups that are never confirmed are deleted after 30 days. After you unsubscribe we keep only your address and the date, so that you are not added again.", "Download links: valid for 24 hours and deleted shortly after they expire.", "Visit statistics: 13 months."]],
        ["Your rights under Article 11", "By applying to the controller you can:", ["Learn whether your personal data is processed and, if so, request information about it", "Learn the purpose of processing and whether data is used accordingly", "Know the third parties in Türkiye or abroad to whom it is transferred", "Ask for correction if it is incomplete or inaccurate", "Ask for deletion or destruction under Article 7 of the Law", "Ask that corrections or deletions be notified to the third parties who received the data", "Object to an outcome against you that results solely from automated analysis", "Claim compensation for damage caused by unlawful processing"]],
        ["How to apply", "Send your request to furkangul@ganrichadvisory.com from the email address you gave us and that is on our records. If you prefer to apply in writing, you can ask for a postal address at the same address. Include your full name, your Turkish ID number if you are a Turkish citizen, an address or email where we can reach you, and what you are asking for. Requests are answered free of charge within 30 days. If you are not satisfied with the answer, you can complain to the Turkish Personal Data Protection Board (KVKK)."],
      ],
    },
    cookies: {
      label: "COOKIE NOTICE",
      title: "A deliberately small technology footprint.",
      intro: "The site is designed to work without analytics cookies or advertising technologies.",
      sections: [
        ["Essential", "Security and delivery technologies, the requested language choice, and the record of your privacy preference. These cannot be switched off through this interface."],
        ["Optional functional", "Saved briefing items, reading mode, and Decision Lab drafts stored in your browser. These are off unless you enable them."],
        ["Not deployed", "Analytics cookies, advertising, cross-site tracking, and third-party embedded media are not active in the current build. Visit statistics are counted on the server without cookies, as described in the privacy notice."],
        ["How to change your mind", "Open Cookie preferences from the footer. Choosing Essential only removes the optional local preference keys used by this site."],
      ],
    },
    dataRights: {
      label: "DATA RIGHTS",
      title: "Your data rights, through a secure channel.",
      intro: "How to ask what we hold about you, and to have it corrected or deleted.",
      sections: [
        ["Data controller", "Ahmed Furkan Gül, who publishes this site under the name Ganrich Advisory · furkangul@ganrichadvisory.com"],
        ["How to apply", "Send your request to furkangul@ganrichadvisory.com from the email address you gave us and that is on our records. If you prefer to apply in writing, you can ask for a postal address at the same address. Include your full name, your Turkish ID number if you are a Turkish citizen, an address or email where we can reach you, and what you are asking for. Requests are answered free of charge within 30 days. If you are not satisfied with the answer, you can complain to the Turkish Personal Data Protection Board (KVKK)."],
        ["What you can ask for", "Under Türkiye's data-protection law you can:", ["Learn whether your personal data is processed and, if so, request information about it", "Learn the purpose of processing and whether data is used accordingly", "Know the third parties in Türkiye or abroad to whom it is transferred", "Ask for correction if it is incomplete or inaccurate", "Ask for deletion or destruction under Article 7 of the Law", "Ask that corrections or deletions be notified to the third parties who received the data", "Object to an outcome against you that results solely from automated analysis", "Claim compensation for damage caused by unlawful processing"]],
        ["Before submitting a request", "Do not send identity documents, special-category data, client-confidential material, or passwords through the public contact form. Writing from the email address you used with us is normally enough for us to recognise you; we ask for more only if a request carries risk."],
        ["Newsletter", "To stop regulation updates, use the unsubscribe link in any email; it works at once and needs no request."],
      ],
    },
    aiTransparency: {
      label: "AI TRANSPARENCY",
      title: "AI assists the work. People remain accountable.",
      intro: "The public tools make their scope, limitations, and data behaviour visible at the point of use.",
      sections: [
        ["Current interactive tools", "Decision Lab tools run in the visitor’s browser. They structure user-entered assumptions and do not present the output as a Ganrich-authored recommendation."],
        ["Human responsibility", "AI-assisted research or synthesis does not replace source verification, professional judgment, legal review, investment advice, or a named decision owner."],
        ["Input discipline", "Do not enter personal, confidential, privileged, restricted, or client-identifying material into public tools."],
        ["Content labelling", "AI-assisted content should disclose its status where material, preserve source provenance, and remain subject to human editorial review and accountability."],
      ],
    },
    legal: {
      label: "LEGAL NOTICE",
      title: "Website information, with clear limits.",
      intro: "Ganrich publishes strategic perspectives and interactive decision tools for general informational purposes.",
      sections: [
        ["Who runs this site", "This site is published by Ahmed Furkan Gül under the name Ganrich Advisory. Ganrich Advisory is a trade name and not yet a registered company. Contact: furkangul@ganrichadvisory.com."],
        ["No professional engagement", "Using this website, reading an insight, or submitting an inquiry does not create a client, adviser, fiduciary, or other professional relationship. Any engagement is agreed in writing, and that agreement names the contracting party."],
        ["No tailored advice", "Content is not legal, tax, accounting, investment, or other regulated advice. Decisions should be based on verified facts and appropriate professional review."],
        ["Editorial status", "Dates, sources, assumptions, and evidence limitations are shown where relevant. Directional tools remain distinct from professional recommendations."],
        ["Intellectual property", "Original Ganrich editorial content and interface materials may not be republished as another party’s work. Third-party rights remain with their respective owners."],
      ],
    },
    terms: {
      label: "WEBSITE TERMS",
      title: "Simple terms for a focused site.",
      intro: "Use the website lawfully, do not misuse its tools, and independently verify consequential decisions.",
      sections: [
        ["Permitted use", "You may browse, link to, and use the site for legitimate informational and internal evaluation purposes."],
        ["Prohibited use", "Do not attempt unauthorized access, interfere with service, introduce malicious code, scrape restricted areas, misrepresent output, or use the site to process unlawful content."],
        ["Availability", "Pages, tools, and publications may change or be withdrawn. The site is provided without a promise of uninterrupted availability."],
        ["Relationship to engagements", "Any professional engagement requires a separate written agreement. Those engagement terms take precedence for the work they govern."],
      ],
    },
    policyUpdates: {
      label: "POLICY UPDATES",
      title: "A visible record of meaningful changes.",
      intro: "Material changes will be dated and summarized here rather than silently folded into long text.",
      sections: [
        ["24 October 2026 · Version 1.1", "Named the data controller (Ahmed Furkan Gül, Ganrich Advisory), published the KVKK notice with purposes, legal bases, transfers and rights, listed the service providers, and set retention periods that the site now enforces automatically."],
        ["23 July 2026 · Privacy center v1.0", "Introduced bilingual privacy controls, a current-site technology inventory, separate notice and preference experiences, AI transparency, data-rights readiness, and publication gates for unverified legal facts."],
        ["Change discipline", "Future entries should identify what changed, why it changed, when it takes effect, and whether a renewed choice is required."],
      ],
    },
    vendors: {
      label: "SERVICE PROVIDERS",
      title: "The services that run this site.",
      intro: "Each provider processes personal data only to deliver its service to us, on our instructions.",
      status: "Last reviewed 24 October 2026.",
      sections: [
        ["Cloudflare, Inc. (United States)", "Hosting, the database that stores form and newsletter records, file storage for whitepapers, security and access control for the editor area. Processes all data described in the privacy notice; servers worldwide."],
        ["Resend, Inc. (United States)", "Sends newsletter confirmation emails and form alerts to us. Processes email addresses and the content of those emails; sending is configured in its EU (Ireland) region."],
        ["Microsoft Corporation (United States)", "Hosts the furkangul@ganrichadvisory.com mailbox, which receives form alerts and your direct emails."],
        ["Google LLC (United States)", "Hosts a Gmail mailbox that also receives form alerts."],
        ["Not used", "No advertising network, data broker, analytics cookie provider or external AI service receives visitor data."],
      ],
    },
  },
  tr: {
    privacy: {
      label: "GİZLİLİK BİLDİRİMİ",
      title: "Gizlilik, açık bir dille.",
      intro: "Kamuya açık sitenin sınırlı veri yüzeyini ve ziyaretçilere sunulan tercihleri olgulara dayalı olarak açıklar.",
      status: "Veri sorumlusu: Ahmed Furkan Gül (Ganrich Advisory) · furkangul@ganrichadvisory.com · Son güncelleme 24 Ekim 2026.",
      sections: [
        ["Sorumlu kişi", "Bu siteyi Ganrich Advisory adıyla yayımlayan ve bu adla danışmanlık hizmeti sunan Ahmed Furkan Gül, burada açıklanan kişisel verilerin veri sorumlusudur. Ganrich Advisory henüz tescilli bir şirket değildir; şirket kurulduğunda bu bildirim güncellenecektir. İletişim: furkangul@ganrichadvisory.com."],
        ["Kamuya açık sitede işlenenler", "Dil seçimi, gizlilik tercihi ve isteğe bağlı arayüz ayarları cihazınızda yerel olarak saklanabilir. İletişim, brifing ve teknik not indirme bilgileri, talebinizi incelemek ve yanıtlamak amacıyla güvenli biçimde iletilir ve saklanır. Bize ulaşan bilgiler yazdıklarınızdır: genellikle adınız, e-posta adresiniz, kurumunuz ve mesajınız; test sonucu veya belge talebinde ayrıca ilgili test ya da belge."],
        ["Teknolojilerin amacı", "Zorunlu teknolojiler güvenli sunumu sağlar ve gizlilik kontrolündeki kararınızı hatırlar. İsteğe bağlı birinci taraf depolama, yalnızca izin verdiğinizde okuma araçlarını ve taslakları hatırlar."],
        ["Çerezsiz ziyaret istatistikleri", "Bir sayfa istendiğinde sunucu; sayfayı, yönlendiren siteyi, bağlantıdaki kampanya etiketlerini, ağdan türetilen yaklaşık konumu (ülke ve şehir), ağ işletmecisini, cihaz türünü, tarayıcıyı ve işletim sistemini kaydeder. Çerez kullanılmaz ve IP adresi saklanmaz. Her gün değişen takma bir kod, kimseyi günler arasında izlemeden günlük tekil ziyaretleri saymamızı sağlar. Sayfa yüklendiğinde tarayıcınız sayfayı gösterdiğine dair kısa bir sinyal gönderir; bu, gerçek ziyaretleri otomatik istemcilerden ayırmamızı sağlar. Aynı kayıt, bize ulaşmaya giden adımları (iletişim düğmesine tıklama, iletişim formunu doldurmaya başlama, formu gönderme) ve bir hazırlık testinin başlatılıp sonuca ulaşıp ulaşmadığını da sayar. Yalnızca adım ve sayfa kaydedilir; yazılanlar ve seçtiğiniz cevaplar kaydedilmez. Bu kayıtlar 13 ay saklanır ve yalnızca sitenin nasıl kullanıldığını anlamak için kullanılır."],
        ["E-postayla mevzuat bülteni", "Mevzuat bültenine kaydolursanız e-posta adresinizi, kaydolduğunuz dili ve sayfayı ve onay zamanını saklarız. Listeye ancak onay e-postasındaki bağlantıyı açtığınızda katılırsınız. Adresiniz yalnızca bu bülteni e-posta hizmet sağlayıcımız aracılığıyla göndermek için kullanılır; paylaşılmaz veya satılmaz. Her e-postada kayıt iptal bağlantısı bulunur; iptalden sonra yalnızca vazgeçtiğinize dair kaydı tutarız."],
        ["Kötüye kullanıma karşı koruma", "Tekrarlanan veya otomatik form gönderimlerini önlemek için her gönderim, ağ adresiniz ve tarayıcınızdan hesaplanan tek yönlü bir kodla birlikte saklanır. Ağ adresinin kendisi saklanmaz."],
        ["Etkin olmayanlar", "Mevcut sürüm analitik veya reklam çerezi kullanmaz; davranışsal profilleme, siteler arası izleme, üçüncü taraf medya gömme veya haricî yapay zekâ istem işleme faaliyeti yürütmez."],
        ["Verilerin aktarıldığı taraflar", "Form gönderimleri Ahmed Furkan Gül'e e-posta bildirimi olarak ulaşır. Site ve veriler, talimatlarımız doğrultusunda çalışan şu hizmet sağlayıcılar üzerinde işletilir: Cloudflare (barındırma, veritabanı, dosya depolama ve güvenlik), Resend (onay ve bildirim e-postalarının gönderimi), Microsoft (furkangul@ganrichadvisory.com e-posta kutusu) ve Google (form bildirimlerini alan Gmail kutusu). Bu sağlayıcıların sunucuları ABD ve diğer ülkelerde bulunduğundan verileriniz yurt dışına aktarılır. Veriler satılmaz, başkalarının pazarlamasında kullanılmaz; kamu kurumlarına yalnızca kanunen zorunlu olduğunda verilir."],
        ["Saklama süreleri", "Her veri türü, süresi dolduğunda silinir:", ["İletişim, test sonucu ve belge talepleri: alındığı tarihten itibaren 24 ay, ardından otomatik olarak silinir. E-posta kutumuzdaki kopyaları da aynı takvimle silinir. Bir danışmanlık çalışması başlarsa ilgili yazışmalar, mevzuatın öngördüğü süre boyunca o çalışmanın kayıtlarıyla birlikte saklanır.", "Mevzuat bülteni: kayıtlı olduğunuz sürece. Onaylanmayan kayıtlar 30 gün sonra silinir. Kaydınızı iptal ettiğinizde, sizi yeniden listeye eklememek için yalnızca adresinizi ve iptal tarihini saklarız.", "İndirme bağlantıları: 24 saat geçerlidir ve süresi dolduktan kısa süre sonra silinir.", "Ziyaret istatistikleri: 13 ay."]],
        ["Tercihleriniz ve haklarınız", "İsteğe bağlı yerel depolama iznini dilediğiniz zaman Çerez tercihleri üzerinden geri çekebilirsiniz. Tarayıcı verilerini temizlemek de yerel tercih ve taslakları kaldırır. Hakkınızda tuttuğumuz verileri öğrenmek, düzeltilmesini veya silinmesini istemek için İlgili kişi hakları sayfasına bakın."],
      ],
    },
    kvkk: {
      label: "KVKK AYDINLATMA",
      title: "Türkiye veri koruma bilgilendirmesi.",
      intro: "6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca hazırlanan Aydınlatma metni: bu sitede kişisel verilerinizi kimin, neden ve nasıl işlediği.",
      status: "Son güncelleme 24 Ekim 2026.",
      sections: [
        ["Veri sorumlusu", "Veri sorumlusu, bu siteyi Ganrich Advisory adıyla yayımlayan Ahmed Furkan Gül'dür (gerçek kişi). Ganrich Advisory henüz tescilli bir şirket değildir; şirket kurulduğunda bu metin güncellenecektir. İletişim: furkangul@ganrichadvisory.com."],
        ["İşlenen veriler ve toplama yöntemi", "Kişisel veriler, bu sitedeki formlar ve sunucu kayıtları aracılığıyla elektronik ortamda, kısmen otomatik yollarla toplanır:", ["İletişim formu: ad, e-posta, kurum, konu ve mesajınız; brifing talebinde ayrıca görev, bölge ve değerlendirdiğiniz karar.", "Hazırlık testi sonucu ve teknik not talebi: ad, e-posta, kurum ile ilgili test sonucu veya belge.", "Mevzuat bülteni: e-posta adresi, dil, kaydolunan sayfa, kayıt, onay ve iptal zamanları.", "Ziyaret istatistikleri: görüntülenen sayfa, yönlendiren site, kampanya etiketleri, ağdan türetilen yaklaşık konum, ağ işletmecisi, cihaz, tarayıcı ve işletim sistemi türü ile her gün değişen takma bir kod. IP adresi saklanmaz.", "Kötüye kullanım koruması: form gönderiminde ağ adresi ve tarayıcıdan hesaplanan tek yönlü kod."]],
        ["Amaçlar ve hukuki sebepler", "Verileriniz yalnızca aşağıdaki amaçlarla ve belirtilen hukuki sebeplere dayanarak işlenir:", ["Talebinizi incelemek, size dönüş yapmak ve olası bir danışmanlık çalışmasını görüşmek: bir sözleşmenin kurulmasıyla doğrudan ilgili olması (m. 5/2-c) ve meşru menfaatimiz (m. 5/2-f).", "İstediğiniz belgeyi veya test sonucunu iletmek: talebinizle kurulan ilişkinin gereği (m. 5/2-c).", "Mevzuat bülteni göndermek: açık rızanız (m. 5/1). Rıza, onay e-postasındaki bağlantıyla verilir ve her e-postadaki iptal bağlantısıyla dilediğiniz an geri alınabilir.", "Sitenin güvenliğini sağlamak, kötüye kullanımı önlemek ve kullanımını çerezsiz olarak ölçmek: meşru menfaatimiz (m. 5/2-f).", "Olası bir uyuşmazlıkta hakların tesisi, kullanılması veya korunması (m. 5/2-e)."]],
        ["Aktarım", "Verileriniz bu amaçlarla sınırlı olarak, talimatlarımız doğrultusunda hizmet veren şu sağlayıcılara aktarılır: Cloudflare (barındırma, veritabanı, dosya depolama ve güvenlik), Resend (onay ve bildirim e-postalarının gönderimi), Microsoft (furkangul@ganrichadvisory.com e-posta kutusu) ve Google (form bildirimlerini alan Gmail kutusu). Bu sağlayıcıların sunucuları ABD ve diğer ülkelerde bulunduğundan verileriniz yurt dışına aktarılmaktadır. Veriler satılmaz ve başkalarının pazarlamasında kullanılmaz; kamu kurum ve kuruluşlarına yalnızca kanunen yetkili oldukları bir talep hâlinde verilir."],
        ["Saklama süreleri", "Süresi dolan veriler silinir:", ["İletişim, test sonucu ve belge talepleri: alındığı tarihten itibaren 24 ay, ardından otomatik olarak silinir. E-posta kutumuzdaki kopyaları da aynı takvimle silinir. Bir danışmanlık çalışması başlarsa ilgili yazışmalar, mevzuatın öngördüğü süre boyunca o çalışmanın kayıtlarıyla birlikte saklanır.", "Mevzuat bülteni: kayıtlı olduğunuz sürece. Onaylanmayan kayıtlar 30 gün sonra silinir. Kaydınızı iptal ettiğinizde, sizi yeniden listeye eklememek için yalnızca adresinizi ve iptal tarihini saklarız.", "İndirme bağlantıları: 24 saat geçerlidir ve süresi dolduktan kısa süre sonra silinir.", "Ziyaret istatistikleri: 13 ay."]],
        ["Kanunun 11. maddesindeki haklarınız", "Veri sorumlusuna başvurarak şu haklarınızı kullanabilirsiniz:", ["Kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse bilgi talep etme", "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme", "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme", "Eksik veya yanlış işlenmişse düzeltilmesini isteme", "Kanunun 7. maddesi çerçevesinde silinmesini veya yok edilmesini isteme", "Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme", "Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme", "Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme"]],
        ["Başvuru", "Başvurunuzu, bize daha önce bildirdiğiniz ve kayıtlarımızda bulunan e-posta adresinizden furkangul@ganrichadvisory.com adresine gönderebilirsiniz. Yazılı başvuru yapmak isterseniz posta adresini aynı adresten isteyebilirsiniz. Başvuruda adınız ve soyadınız, T.C. vatandaşıysanız T.C. kimlik numaranız, size ulaşabileceğimiz adres veya e-posta ve talebiniz yer almalıdır. Başvurunuz en geç 30 gün içinde ücretsiz olarak sonuçlandırılır. Yanıtı yeterli bulmazsanız Kişisel Verileri Koruma Kurulu'na şikâyette bulunabilirsiniz."],
      ],
    },
    cookies: {
      label: "ÇEREZ BİLDİRİMİ",
      title: "Bilinçli biçimde küçük bir teknoloji izi.",
      intro: "Site, analitik çerezleri veya reklam teknolojileri olmadan çalışacak şekilde tasarlanmıştır.",
      sections: [
        ["Zorunlu", "Güvenlik ve sunum teknolojileri, talep edilen dil seçimi ve gizlilik tercihinizin kaydı. Bunlar bu arayüzden kapatılamaz."],
        ["İsteğe bağlı işlevsel", "Tarayıcınızda saklanan brifing öğeleri, okuma modu ve Karar Laboratuvarı taslakları. İzin vermediğiniz sürece kapalıdır."],
        ["Kullanılmayanlar", "Analitik çerezleri, reklam, siteler arası izleme ve üçüncü taraf gömülü medya mevcut sürümde etkin değildir. Ziyaret istatistikleri, gizlilik bildiriminde açıklandığı gibi sunucuda çerezsiz olarak sayılır."],
        ["Tercih değişikliği", "Alt bilgiden Çerez tercihlerini açın. Yalnızca zorunlu seçimi, bu sitenin kullandığı isteğe bağlı yerel tercih anahtarlarını kaldırır."],
      ],
    },
    dataRights: {
      label: "İLGİLİ KİŞİ HAKLARI",
      title: "Haklarınız, güvenli bir kanaldan.",
      intro: "Hakkınızda tuttuğumuz verileri öğrenmek, düzeltilmesini veya silinmesini istemek için yapmanız gerekenler.",
      sections: [
        ["Veri sorumlusu", "Bu siteyi Ganrich Advisory adıyla yayımlayan Ahmed Furkan Gül · furkangul@ganrichadvisory.com"],
        ["Nasıl başvurulur", "Başvurunuzu, bize daha önce bildirdiğiniz ve kayıtlarımızda bulunan e-posta adresinizden furkangul@ganrichadvisory.com adresine gönderebilirsiniz. Yazılı başvuru yapmak isterseniz posta adresini aynı adresten isteyebilirsiniz. Başvuruda adınız ve soyadınız, T.C. vatandaşıysanız T.C. kimlik numaranız, size ulaşabileceğimiz adres veya e-posta ve talebiniz yer almalıdır. Başvurunuz en geç 30 gün içinde ücretsiz olarak sonuçlandırılır. Yanıtı yeterli bulmazsanız Kişisel Verileri Koruma Kurulu'na şikâyette bulunabilirsiniz."],
        ["Neler isteyebilirsiniz", "6698 sayılı Kanun'un 11. maddesi uyarınca:", ["Kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse bilgi talep etme", "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme", "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme", "Eksik veya yanlış işlenmişse düzeltilmesini isteme", "Kanunun 7. maddesi çerçevesinde silinmesini veya yok edilmesini isteme", "Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme", "Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme", "Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme"]],
        ["Başvuru öncesi", "Kamuya açık iletişim formu üzerinden kimlik belgesi, özel nitelikli veri, müşteri sırrı, parola veya kısıtlı materyal göndermeyin. Bizimle kullandığınız e-posta adresinden yazmanız sizi tanımamız için genellikle yeterlidir; yalnızca risk taşıyan taleplerde ek bilgi isteriz."],
        ["Bülten", "Mevzuat bültenini durdurmak için herhangi bir e-postadaki iptal bağlantısını kullanın; hemen geçerli olur ve ayrıca başvuru gerektirmez."],
      ],
    },
    aiTransparency: {
      label: "YAPAY ZEKÂ ŞEFFAFLIĞI",
      title: "Yapay zekâ çalışmaya destek olur. Sorumluluk insandadır.",
      intro: "Kamu araçları kapsamlarını, sınırlamalarını ve veri davranışlarını kullanım noktasında görünür kılar.",
      sections: [
        ["Mevcut etkileşimli araçlar", "Karar Laboratuvarı araçları ziyaretçinin tarayıcısında çalışır. Kullanıcının girdiği varsayımları yapılandırır ve çıktıyı Ganrich tarafından hazırlanmış bir öneri olarak sunmaz."],
        ["İnsan sorumluluğu", "Yapay zekâ destekli araştırma veya sentez; kaynak doğrulamanın, profesyonel muhakemenin, hukuk incelemesinin, yatırım tavsiyesinin veya açık karar sahipliğinin yerini almaz."],
        ["Girdi disiplini", "Kamuya açık araçlara kişisel, gizli, imtiyazlı, kısıtlı veya müşteriyi tanımlayan bilgi girmeyin."],
        ["İçerik etiketleme", "Yapay zekâ destekli içerik, önemli olduğu ölçüde statüsünü açıklamalı, kaynak izini korumalı ve insan editoryal incelemesi ile sorumluluğuna tabi olmalıdır."],
      ],
    },
    legal: {
      label: "YASAL BİLDİRİM",
      title: "Sınırları açık internet sitesi bilgileri.",
      intro: "Ganrich, genel bilgilendirme amacıyla stratejik perspektifler ve etkileşimli karar araçları yayımlar.",
      sections: [
        ["Siteyi yayımlayan", "Bu site, Ahmed Furkan Gül tarafından Ganrich Advisory adıyla yayımlanır. Ganrich Advisory bir ticari addır ve henüz tescilli bir şirket değildir. İletişim: furkangul@ganrichadvisory.com."],
        ["Profesyonel ilişki doğmaz", "Bu siteyi kullanmak, bir içgörüyü okumak veya bir talep göndermek; müşteri, danışman, güven ilişkisi ya da başka bir profesyonel ilişki kurmaz. Her çalışma yazılı olarak kararlaştırılır ve sözleşme tarafını o sözleşme belirtir."],
        ["Özel tavsiye değildir", "İçerik hukuk, vergi, muhasebe, yatırım veya başka bir düzenlenmiş tavsiye değildir. Kararlar doğrulanmış olgulara ve uygun profesyonel incelemeye dayanmalıdır."],
        ["Editoryal durum", "İlgili yerlerde tarihler, kaynaklar, varsayımlar ve kanıt sınırlamaları gösterilir. Yön gösterici araçlar profesyonel önerilerden ayrı tutulur."],
        ["Fikrî haklar", "Ganrich’e ait özgün editoryal içerik ve arayüz materyalleri başka bir tarafın eseri gibi yeniden yayımlanamaz. Üçüncü taraf hakları sahiplerine aittir."],
      ],
    },
    terms: {
      label: "KULLANIM KOŞULLARI",
      title: "Odaklı bir site için sade koşullar.",
      intro: "Siteyi hukuka uygun kullanın, araçları kötüye kullanmayın ve önemli kararları bağımsız olarak doğrulayın.",
      sections: [
        ["İzin verilen kullanım", "Siteyi meşru bilgilendirme ve kurum içi değerlendirme amaçlarıyla inceleyebilir, bağlantı verebilir ve kullanabilirsiniz."],
        ["Yasak kullanım", "Yetkisiz erişim denemeyin; hizmeti engellemeyin; zararlı kod eklemeyin; kısıtlı alanları kazımayın; çıktıları yanlış tanıtmayın veya siteyi hukuka aykırı içerik işlemek için kullanmayın."],
        ["Kullanılabilirlik", "Sayfalar, araçlar ve yayınlar değiştirilebilir veya kaldırılabilir. Kesintisiz kullanılabilirlik taahhüt edilmez."],
        ["Çalışmalarla ilişkisi", "Her profesyonel çalışma ayrı bir yazılı sözleşme gerektirir. İlgili çalışma bakımından bu sözleşme hükümleri önceliklidir."],
      ],
    },
    policyUpdates: {
      label: "POLİTİKA GÜNCELLEMELERİ",
      title: "Önemli değişiklikler için görünür kayıt.",
      intro: "Esaslı değişiklikler uzun metinlerin içine sessizce eklenmek yerine burada tarih ve özetle yayımlanır.",
      sections: [
        ["24 Ekim 2026 · Sürüm 1.1", "Veri sorumlusu (Ahmed Furkan Gül, Ganrich Advisory) belirtildi; amaçları, hukuki sebepleri, aktarımları ve hakları içeren KVKK aydınlatma metni yayımlandı; hizmet sağlayıcılar listelendi ve sitenin artık otomatik uyguladığı saklama süreleri belirlendi."],
        ["23 Temmuz 2026 · Gizlilik merkezi v1.0", "İki dilli gizlilik kontrolleri, mevcut site teknoloji envanteri, ayrıştırılmış aydınlatma ve tercih deneyimleri, yapay zekâ şeffaflığı, ilgili kişi hakları hazırlığı ve doğrulanmamış hukuki olgular için yayın kapıları eklendi."],
        ["Değişiklik disiplini", "Gelecekteki kayıtlar neyin, neden ve ne zaman değiştiğini ve yeni bir tercih gerekip gerekmediğini belirtmelidir."],
      ],
    },
    vendors: {
      label: "HİZMET SAĞLAYICILAR",
      title: "Bu siteyi işleten hizmetler.",
      intro: "Her sağlayıcı kişisel verileri yalnızca bize hizmetini sunmak için ve talimatlarımız doğrultusunda işler.",
      status: "Son inceleme 24 Ekim 2026.",
      sections: [
        ["Cloudflare, Inc. (ABD)", "Barındırma, form ve bülten kayıtlarını tutan veritabanı, teknik notların dosya depolaması, editör alanının güvenliği ve erişim kontrolü. Gizlilik bildirimindeki tüm verileri işler; sunucuları dünya geneline yayılıdır."],
        ["Resend, Inc. (ABD)", "Bülten onay e-postalarını ve bize gelen form bildirimlerini gönderir. E-posta adreslerini ve bu e-postaların içeriğini işler; gönderim AB (İrlanda) bölgesinden yapılandırılmıştır."],
        ["Microsoft Corporation (ABD)", "Form bildirimlerini ve doğrudan e-postalarınızı alan furkangul@ganrichadvisory.com e-posta kutusunu barındırır."],
        ["Google LLC (ABD)", "Form bildirimlerini de alan bir Gmail e-posta kutusunu barındırır."],
        ["Kullanılmayanlar", "Hiçbir reklam ağı, veri simsarı, analitik çerez sağlayıcısı veya haricî yapay zekâ hizmeti ziyaretçi verisi almaz."],
      ],
    },
  },
};

export function TrustShell({ lang, label, title, intro, children }: { lang: Lang; label: string; title: string; intro: string; children: React.ReactNode }) {
  const m = routeMap[lang];
  const nav = lang === "en"
    ? [["Overview", m.privacyCenter], ["Privacy", m.privacy], ["Cookies", m.cookies], ["Data rights", m.dataRights], ["AI", m.aiTransparency]]
    : [["Genel bakış", m.privacyCenter], ["Gizlilik", m.privacy], ["Çerezler", m.cookies], ["Haklar", m.dataRights], ["Yapay zekâ", m.aiTransparency]];
  return <article className="trust-page">
    <header className="trust-hero"><span className="eyebrow">{label}</span><h1>{title}</h1><p>{intro}</p></header>
    <nav className="trust-subnav" aria-label={lang === "en" ? "Privacy center" : "Gizlilik merkezi"}>{nav.map(([text, href]) => <a key={href} href={`/${lang}/${href}`}>{text}</a>)}</nav>
    <div className="trust-content">{children}</div>
  </article>;
}

export function TrustContentPage({ lang, kind }: { lang: Lang; kind: TrustKind }) {
  const page = pages[lang][kind];
  return <TrustShell lang={lang} label={page.label} title={page.title} intro={page.intro}>
    <section className="trust-sections">{page.sections.map(([title, body, list], index) => <article key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{body}</p>{list && <ul>{list.map((item) => <li key={item}>{item}</li>)}</ul>}</div></article>)}</section>
    <p className="policy-version">{lang === "en" ? "Version 1.1 · Reviewed 24 October 2026" : "Sürüm 1.1 · İnceleme tarihi 24 Ekim 2026"}</p>
  </TrustShell>;
}

export function PrivacyCenterPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const m = routeMap[lang];
  const cards = isEn ? [
    ["Privacy notice", "What this public site handles—and what it does not.", m.privacy],
    ["Türkiye / KVKK", "Who controls your data, why it is processed, and your rights under Law No. 6698.", m.kvkk],
    ["Cookies", "A small, first-party technology footprint.", m.cookies],
    ["Data rights", "How to ask what we hold, or have it corrected or deleted.", m.dataRights],
    ["AI transparency", "Tool status, data behaviour, and human accountability.", m.aiTransparency],
    ["Legal notice", "The limits of website content and interactive tools.", m.legal],
  ] : [
    ["Gizlilik bildirimi", "Kamuya açık sitenin işlediği ve işlemediği unsurlar.", m.privacy],
    ["KVKK", "Verilerinizin sorumlusu, işlenme amaçları ve 6698 sayılı Kanun kapsamındaki haklarınız.", m.kvkk],
    ["Çerezler", "Küçük ve birinci taraf bir teknoloji izi.", m.cookies],
    ["İlgili kişi hakları", "Hakkınızdaki verileri öğrenme, düzeltme veya silme başvurusu.", m.dataRights],
    ["Yapay zekâ şeffaflığı", "Araç statüsü, veri davranışı ve insan sorumluluğu.", m.aiTransparency],
    ["Yasal bildirim", "Site içeriği ve etkileşimli araçların sınırları.", m.legal],
  ];
  return <TrustShell lang={lang} label={isEn ? "PRIVACY + TRUST" : "GİZLİLİK + GÜVEN"} title={isEn ? "Trust should be designed into the experience." : "Güven, deneyimin içine tasarlanmalıdır."} intro={isEn ? "A concise, bilingual centre for privacy choices, current-site facts, AI transparency, and legal information." : "Gizlilik tercihleri, mevcut site olguları, yapay zekâ şeffaflığı ve hukuki bilgiler için özlü, iki dilli merkez."}>
    <section className="trust-current">
      <span>{isEn ? "CURRENT SITE CONFIGURATION" : "MEVCUT SİTE YAPILANDIRMASI"}</span>
      <div><strong>{isEn ? "No analytics cookies or advertising trackers" : "Analitik çerezi veya reklam izleyicisi yok"}</strong><strong>{isEn ? "Optional preferences off by default" : "İsteğe bağlı tercihler varsayılan olarak kapalı"}</strong><strong>{isEn ? "Secure inquiry storage" : "Güvenli talep kaydı"}</strong></div>
    </section>
    <section className="trust-card-grid">{cards.map(([title, body, href], index) => <a key={href} href={`/${lang}/${href}`}><span>0{index + 1}</span><h2>{title}</h2><p>{body}</p><i aria-hidden="true">↗</i></a>)}</section>
    <section className="trust-utility">
      <a href={`/${lang}/${m.cookiePreferences}`}>{isEn ? "Manage cookie preferences" : "Çerez tercihlerini yönetin"} <span aria-hidden="true">↗</span></a>
      <a href={`/${lang}/${m.policyUpdates}`}>{isEn ? "Policy updates" : "Politika güncellemeleri"} <span aria-hidden="true">↗</span></a>
      <a href={`/${lang}/${m.terms}`}>{isEn ? "Website terms" : "Kullanım koşulları"} <span aria-hidden="true">↗</span></a>
    </section>
  </TrustShell>;
}
