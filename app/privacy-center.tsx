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
      status: "Publication status · Current-site facts verified 23 July 2026. The statutory controller identity and formal contact channels are not presented as final until verified.",
      sections: [
        ["What the public site handles", "Language choice, consent choice, and optional interface preferences may be stored locally on your device. Contact and briefing details are transmitted securely and stored to review and respond to your request."],
        ["Why these technologies exist", "Essential technologies support secure delivery and remember the choice you make in the privacy control. Optional first-party storage remembers reading tools and drafts only when you allow it."],
        ["Cookieless visit statistics", "When a page is requested, the server records the page, the referring website, any campaign tags in the link, an approximate location derived from the network (country and city), the network operator, device type, browser, and operating system. No cookie is set and no IP address is stored. A pseudonymous code that changes every day lets us count unique visits per day without following anyone across days. The same log counts three steps toward contacting us: a click on a contact button, starting the contact form, and sending it. Only the step and the page are recorded, never what is typed. These records are kept for 13 months and are used only to understand how the site is used."],
        ["Regulation updates by email", "If you sign up for regulation updates, we store your email address, the language and page you signed up from, and when you confirmed. You join the list only after opening the link in the confirmation email. The address is used only to send these updates, through our email provider, and is never shared or sold. Every email has an unsubscribe link; after unsubscribing we keep only a record that you opted out."],
        ["What is not active", "The current build does not set analytics or advertising cookies and does not run behavioural profiling, cross-site tracking, third-party media embeds, or external AI prompt processing."],
        ["Retention and recipients", "No public retention schedule, service-provider register, or transfer statement is asserted here until the underlying operational records and contracts are verified."],
        ["Your choices", "Use Cookie preferences at any time to withdraw optional local storage. Clearing browser storage also removes locally saved choices and drafts."],
      ],
    },
    kvkk: {
      label: "TÜRKİYE DATA PROTECTION",
      title: "Türkiye data-protection information.",
      intro: "The notice obligation and any consent request are treated as separate experiences.",
      status: "A final Article 10 notice cannot be responsibly published until the exact data controller, formal application channel, purposes, legal bases, recipients, and retention framework are verified.",
      sections: [
        ["What is already separated", "Informational privacy text is not presented as a box that visitors must accept. Optional technology choices are requested independently and are off by default."],
        ["Current public forms", "Contact and briefing forms display a just-in-time explanation and transmit the details you choose to provide for the purpose of reviewing and responding to your request."],
        ["What the final notice must contain", "Verified controller identity; processing purposes; recipients and transfer purposes; collection method and precise legal basis; and Article 11 rights."],
        ["Publication gate", "No entity name, KEP address, postal address, representative, retention period, vendor, or international-transfer mechanism will be invented to complete this page."],
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
      title: "A rights channel should be secure before it is public.",
      intro: "This site does not ask visitors to upload identity documents or sensitive information through an unsecured public form.",
      status: "The formal controller application channel is not yet published because the required legal identity and delivery coordinates have not been verified.",
      sections: [
        ["Before submitting a request", "Do not send identity documents, special-category data, client-confidential material, or passwords through the public contact form. Use the direct email address to request an appropriate rights channel."],
        ["Request scope", "A verified process should support access, correction, deletion or destruction where applicable, objection, portability where applicable, and information about processing."],
        ["Identity verification", "Verification should be proportionate to the request and the risk. The final operating procedure must define secure intake, authentication, logging, escalation, and response."],
        ["Timing", "Applicable response deadlines depend on the governing regime. The final channel will state the relevant process and escalation route without combining it with marketing consent."],
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
      status: "Corporate registration details, registered address, governing law, and formal legal contact are withheld from this notice until verified for publication.",
      sections: [
        ["No professional engagement", "Using this website, reading an insight, or submitting an inquiry does not create a client, adviser, fiduciary, or other professional relationship."],
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
        ["23 July 2026 · Privacy center v1.0", "Introduced bilingual privacy controls, a current-site technology inventory, separate notice and preference experiences, AI transparency, data-rights readiness, and publication gates for unverified legal facts."],
        ["Change discipline", "Future entries should identify what changed, why it changed, when it takes effect, and whether a renewed choice is required."],
      ],
    },
    vendors: {
      label: "SERVICE PROVIDERS",
      title: "No unverifiable vendor list.",
      intro: "A public register should match live contracts and data flows, not assumptions drawn from interface code.",
      status: "The provider and transfer register is not published until owners, services, locations, processing roles, and transfer safeguards have been verified and assigned a maintenance owner.",
      sections: [
        ["Publication standard", "Each future entry should identify the service, purpose, data category, role, relevant location, transfer basis where applicable, and last review date."],
        ["Current assurance", "No vendor, subprocessor, data location, adequacy decision, or contractual transfer mechanism is asserted on this page without an approved operational record."],
      ],
    },
  },
  tr: {
    privacy: {
      label: "GİZLİLİK BİLDİRİMİ",
      title: "Gizlilik, açık bir dille.",
      intro: "Kamuya açık sitenin sınırlı veri yüzeyini ve ziyaretçilere sunulan tercihleri olgulara dayalı olarak açıklar.",
      status: "Yayın durumu · Mevcut siteye ilişkin olgular 23 Temmuz 2026 tarihinde doğrulanmıştır. Kanuni veri sorumlusu kimliği ve resmî iletişim kanalları doğrulanmadan nihai olarak sunulmamaktadır.",
      sections: [
        ["Kamuya açık sitede işlenenler", "Dil seçimi, gizlilik tercihi ve isteğe bağlı arayüz ayarları cihazınızda yerel olarak saklanabilir. İletişim ve brifing bilgileri, talebinizi incelemek ve yanıtlamak amacıyla güvenli biçimde iletilir ve saklanır."],
        ["Teknolojilerin amacı", "Zorunlu teknolojiler güvenli sunumu sağlar ve gizlilik kontrolündeki kararınızı hatırlar. İsteğe bağlı birinci taraf depolama, yalnızca izin verdiğinizde okuma araçlarını ve taslakları hatırlar."],
        ["Çerezsiz ziyaret istatistikleri", "Bir sayfa istendiğinde sunucu; sayfayı, yönlendiren siteyi, bağlantıdaki kampanya etiketlerini, ağdan türetilen yaklaşık konumu (ülke ve şehir), ağ işletmecisini, cihaz türünü, tarayıcıyı ve işletim sistemini kaydeder. Çerez kullanılmaz ve IP adresi saklanmaz. Her gün değişen takma bir kod, kimseyi günler arasında izlemeden günlük tekil ziyaretleri saymamızı sağlar. Aynı kayıt, bize ulaşmaya giden üç adımı da sayar: bir iletişim düğmesine tıklama, iletişim formunu doldurmaya başlama ve formu gönderme. Yalnızca adım ve sayfa kaydedilir, yazılan hiçbir şey kaydedilmez. Bu kayıtlar 13 ay saklanır ve yalnızca sitenin nasıl kullanıldığını anlamak için kullanılır."],
        ["E-postayla mevzuat bülteni", "Mevzuat bültenine kaydolursanız e-posta adresinizi, kaydolduğunuz dili ve sayfayı ve onay zamanını saklarız. Listeye ancak onay e-postasındaki bağlantıyı açtığınızda katılırsınız. Adresiniz yalnızca bu bülteni e-posta hizmet sağlayıcımız aracılığıyla göndermek için kullanılır; paylaşılmaz veya satılmaz. Her e-postada kayıt iptal bağlantısı bulunur; iptalden sonra yalnızca vazgeçtiğinize dair kaydı tutarız."],
        ["Etkin olmayanlar", "Mevcut sürüm analitik veya reklam çerezi kullanmaz; davranışsal profilleme, siteler arası izleme, üçüncü taraf medya gömme veya haricî yapay zekâ istem işleme faaliyeti yürütmez."],
        ["Saklama ve alıcılar", "Operasyonel kayıtlar ve sözleşmeler doğrulanana kadar burada bir saklama takvimi, hizmet sağlayıcı listesi veya aktarım beyanı ileri sürülmez."],
        ["Tercihleriniz", "İsteğe bağlı yerel depolama iznini dilediğiniz zaman Çerez tercihleri üzerinden geri çekebilirsiniz. Tarayıcı verilerini temizlemek de yerel tercih ve taslakları kaldırır."],
      ],
    },
    kvkk: {
      label: "KVKK AYDINLATMA",
      title: "Türkiye veri koruma bilgilendirmesi.",
      intro: "Aydınlatma yükümlülüğü ile açık rıza talebi ayrı deneyimler olarak ele alınır.",
      status: "Kesin veri sorumlusu, resmî başvuru kanalı, amaçlar, hukuki sebepler, alıcılar ve saklama çerçevesi doğrulanmadan nihai bir 10. madde aydınlatma metni sorumlu biçimde yayımlanamaz.",
      sections: [
        ["Ayrı tutulan unsurlar", "Bilgilendirici gizlilik metni, ziyaretçinin kabul etmesi gereken bir kutu olarak sunulmaz. İsteğe bağlı teknoloji tercihleri ayrı istenir ve varsayılan olarak kapalıdır."],
        ["Mevcut kamu formları", "İletişim ve brifing formları bağlamsal açıklama gösterir; paylaşmayı seçtiğiniz bilgileri talebinizi incelemek ve yanıtlamak amacıyla iletir."],
        ["Nihai metnin içeriği", "Doğrulanmış veri sorumlusu kimliği; işleme amaçları; alıcılar ve aktarım amaçları; toplama yöntemi ve kesin hukuki sebep; 11. madde hakları."],
        ["Yayın kapısı", "Bu sayfayı tamamlamak için tüzel kişilik, KEP adresi, posta adresi, temsilci, saklama süresi, hizmet sağlayıcı veya yurt dışı aktarım mekanizması uydurulmayacaktır."],
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
      title: "Hak başvuru kanalı, yayımlanmadan önce güvenli olmalıdır.",
      intro: "Bu site, ziyaretçilerden güvensiz bir kamu formu üzerinden kimlik belgesi veya hassas bilgi yüklemelerini istemez.",
      status: "Gerekli hukuki kimlik ve teslim kanalları doğrulanmadığı için resmî veri sorumlusu başvuru kanalı henüz yayımlanmamaktadır.",
      sections: [
        ["Başvuru öncesi", "Kamuya açık iletişim formu üzerinden kimlik belgesi, özel nitelikli veri, müşteri sırrı, parola veya kısıtlı materyal göndermeyin. Uygun hak başvurusu kanalını istemek için doğrudan e-posta adresini kullanın."],
        ["Talebin kapsamı", "Doğrulanmış süreç; bilgi edinme, düzeltme, uygun olduğunda silme veya yok etme, itiraz ve uygulanabildiğinde veri taşınabilirliği haklarını desteklemelidir."],
        ["Kimlik doğrulama", "Doğrulama, talep ve riskle orantılı olmalıdır. Nihai prosedür güvenli kabul, doğrulama, kayıt, eskalasyon ve yanıt adımlarını tanımlamalıdır."],
        ["Süreler", "Uygulanacak yanıt süreleri ilgili mevzuata bağlıdır. Nihai kanal, geçerli süreci ve başvuru yolunu pazarlama izniyle birleştirmeden açıklayacaktır."],
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
      status: "Kurumsal sicil bilgileri, kayıtlı adres, uygulanacak hukuk ve resmî hukuk iletişim kanalı yayın için doğrulanana kadar bu bildirime dahil edilmemektedir.",
      sections: [
        ["Profesyonel ilişki doğmaz", "Bu siteyi kullanmak, bir içgörüyü okumak veya bir talep göndermek; müşteri, danışman, güven ilişkisi ya da başka bir profesyonel ilişki kurmaz."],
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
        ["23 Temmuz 2026 · Gizlilik merkezi v1.0", "İki dilli gizlilik kontrolleri, mevcut site teknoloji envanteri, ayrıştırılmış aydınlatma ve tercih deneyimleri, yapay zekâ şeffaflığı, ilgili kişi hakları hazırlığı ve doğrulanmamış hukuki olgular için yayın kapıları eklendi."],
        ["Değişiklik disiplini", "Gelecekteki kayıtlar neyin, neden ve ne zaman değiştiğini ve yeni bir tercih gerekip gerekmediğini belirtmelidir."],
      ],
    },
    vendors: {
      label: "HİZMET SAĞLAYICILAR",
      title: "Doğrulanamayan sağlayıcı listesine yer yok.",
      intro: "Kamuya açık bir kayıt, arayüz kodundan çıkarılan varsayımları değil canlı sözleşmeleri ve veri akışlarını yansıtmalıdır.",
      status: "Sağlayıcı ve aktarım kaydı; sahiplik, hizmet, konum, işleme rolü ve aktarım güvenceleri doğrulanıp bakım sorumlusu atanmadan yayımlanmaz.",
      sections: [
        ["Yayın standardı", "Gelecekteki her kayıt hizmeti, amacı, veri kategorisini, rolü, ilgili konumu, uygulanıyorsa aktarım dayanağını ve son inceleme tarihini belirtmelidir."],
        ["Mevcut güvence", "Onaylı bir operasyon kaydı olmadan bu sayfada sağlayıcı, alt işleyen, veri konumu, yeterlilik kararı veya sözleşmesel aktarım mekanizması ileri sürülmez."],
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
    <p className="policy-version">{lang === "en" ? "Version 1.0 · Reviewed 23 July 2026" : "Sürüm 1.0 · İnceleme tarihi 23 Temmuz 2026"}</p>
  </TrustShell>;
}

export function PrivacyCenterPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const m = routeMap[lang];
  const cards = isEn ? [
    ["Privacy notice", "What this public site handles—and what it does not.", m.privacy],
    ["Türkiye / KVKK", "Data-protection information and the facts required for a formal rights process.", m.kvkk],
    ["Cookies", "A small, first-party technology footprint.", m.cookies],
    ["Data rights", "How a secure rights process is being prepared.", m.dataRights],
    ["AI transparency", "Tool status, data behaviour, and human accountability.", m.aiTransparency],
    ["Legal notice", "The limits of website content and interactive tools.", m.legal],
  ] : [
    ["Gizlilik bildirimi", "Kamuya açık sitenin işlediği ve işlemediği unsurlar.", m.privacy],
    ["KVKK", "Veri koruma bilgileri ve resmî hak süreci için gerekli olgular.", m.kvkk],
    ["Çerezler", "Küçük ve birinci taraf bir teknoloji izi.", m.cookies],
    ["İlgili kişi hakları", "Güvenli hak sürecinin hazırlık biçimi.", m.dataRights],
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
