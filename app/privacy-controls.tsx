"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "./content";

const STORAGE_KEY = "ganrich-privacy-choice-v1";
const OPEN_EVENT = "ganrich:open-cookie-preferences";
const OPTIONAL_STORAGE = ["ganrich-briefing-tray", "ganrich-framer-en", "ganrich-framer-tr", "ganrich-reading-mode"];

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
    bannerBody: "This site currently uses only essential technology and optional first-party preferences. No analytics, advertising cookies, or third-party media are active.",
    accept: "Accept optional", reject: "Essential only", manage: "Manage choices", dialogTitle: "Cookie preferences",
    dialogIntro: "Choose whether this site may remember optional interface settings. Your choice can be changed at any time.",
    save: "Save preferences", close: "Close", necessary: "Essential",
    necessaryBody: "Required for security, delivery, language choice, and remembering this consent decision. Always active.",
    functional: "Functional preferences", functionalBody: "Remembers saved reading tools, briefing items, and Decision Lab drafts on this device.",
    unavailable: "Not currently in use", unavailableBody: "Analytics, advertising, and third-party embedded media are not enabled in the current build.",
    saved: "Preferences saved", on: "On", off: "Off",
  },
  tr: {
    bannerTitle: "Gösterişsiz, açık gizlilik.",
    bannerBody: "Bu site şu anda yalnızca zorunlu teknolojileri ve isteğe bağlı birinci taraf tercihlerini kullanır. Analitik, reklam çerezleri veya üçüncü taraf medya etkin değildir.",
    accept: "İsteğe bağlıları kabul et", reject: "Yalnızca zorunlu", manage: "Tercihleri yönet", dialogTitle: "Çerez tercihleri",
    dialogIntro: "Sitenin isteğe bağlı arayüz ayarlarını hatırlayıp hatırlamayacağını seçin. Tercihinizi dilediğiniz zaman değiştirebilirsiniz.",
    save: "Tercihleri kaydet", close: "Kapat", necessary: "Zorunlu",
    necessaryBody: "Güvenlik, sunum, dil seçimi ve bu tercih kararının hatırlanması için gereklidir. Her zaman etkindir.",
    functional: "İşlevsel tercihler", functionalBody: "Kaydedilen okuma araçlarını, brifing öğelerini ve Karar Laboratuvarı taslaklarını bu cihazda hatırlar.",
    unavailable: "Şu anda kullanılmıyor", unavailableBody: "Analitik, reklam ve üçüncü taraf gömülü medya mevcut sürümde etkin değildir.",
    saved: "Tercihler kaydedildi", on: "Açık", off: "Kapalı",
  },
} as const;

function keepModalFocus(event: KeyboardEvent, container: HTMLElement | null) {
  if (event.key !== "Tab" || !container) return;
  const controls = [...container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  if (!controls.length) return;
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

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
    version: "1.0", necessary: true, functional, analytics: false, marketing: false, embedded: false,
    timestamp: new Date().toISOString(), language: lang,
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
  const dialog = useRef<HTMLElement>(null);

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
      keepModalFocus(event, dialog.current);
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
      <section ref={dialog} className="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-dialog-title">
        <button ref={closeButton} className="privacy-close" type="button" onClick={closeDialog} aria-label={t.close}>×</button>
        <span className="eyebrow">{lang === "en" ? "PRIVACY CONTROL" : "GİZLİLİK KONTROLÜ"}</span>
        <h2 id="privacy-dialog-title">{t.dialogTitle}</h2><p>{t.dialogIntro}</p>
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
