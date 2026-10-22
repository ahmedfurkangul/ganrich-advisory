"use client";

import { useEffect, useRef, useState } from "react";
import { expertise, insightHref, insights, Lang, routeMap } from "./content";
import { optionalPreferencesEnabled } from "./privacy-controls";

type BriefItem = { id: string; title: string; type: string; href: string };

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

export function BriefingTray({ lang }: { lang: Lang }) {
  const [items, setItems] = useState<BriefItem[]>([]);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);
  const isEn = lang === "en";

  useEffect(() => {
    if (optionalPreferencesEnabled()) {
      const stored = localStorage.getItem("ganrich-briefing-tray");
      if (stored) {
        try {
          queueMicrotask(() => setItems(JSON.parse(stored)));
        } catch {
          localStorage.removeItem("ganrich-briefing-tray");
        }
      }
    }
    const onSave = (event: Event) => {
      const item = (event as CustomEvent<BriefItem>).detail;
      setItems((current) => {
        const next = current.some((saved) => saved.id === item.id) ? current : [...current, item];
        if (optionalPreferencesEnabled()) localStorage.setItem("ganrich-briefing-tray", JSON.stringify(next));
        return next;
      });
    };
    window.addEventListener("ganrich-save", onSave);
    return () => window.removeEventListener("ganrich-save", onSave);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      keepModalFocus(event, drawer.current);
      if (event.key === "Escape") {
        setOpen(false);
        window.setTimeout(() => trigger.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!items.length) return null;

  const closeTray = () => {
    setOpen(false);
    window.setTimeout(() => trigger.current?.focus(), 0);
  };
  const remove = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    if (optionalPreferencesEnabled()) localStorage.setItem("ganrich-briefing-tray", JSON.stringify(next));
    if (!next.length) setOpen(false);
  };

  return <>
    <button ref={trigger} className="tray-trigger" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="briefing-tray">
      <span>{isEn ? "Briefing Tray" : "Brifing Alanı"}</span><strong>{items.length}</strong>
    </button>
    {open && <div className="tray-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeTray()}>
      <aside ref={drawer} id="briefing-tray" className="tray-drawer" role="dialog" aria-modal="true" aria-labelledby="briefing-tray-title">
        <div className="tray-head">
          <div><span className="eyebrow">{isEn ? "PRIVATE WORKSPACE · GUEST MODE" : "ÖZEL ÇALIŞMA ALANI · MİSAFİR MODU"}</span><h2 id="briefing-tray-title">{isEn ? "Briefing Tray" : "Brifing Alanı"}</h2></div>
          <button ref={closeButton} type="button" onClick={closeTray} aria-label={isEn ? "Close tray" : "Alanı kapat"}>×</button>
        </div>
        <p className="tray-intro">{isEn ? "Saved locally on this device. No account or hidden profiling." : "Bu cihazda yerel olarak saklanır. Hesap veya gizli profilleme kullanılmaz."}</p>
        <ol className="tray-list">{items.map((item, index) => <li key={item.id}>
          <span>0{index + 1}</span><div><small>{item.type}</small><a href={item.href}>{item.title}</a></div>
          <button type="button" onClick={() => remove(item.id)} aria-label={`${item.title} — ${isEn ? "remove" : "kaldır"}`}>−</button>
        </li>)}</ol>
        <label className="tray-note">{isEn ? "Working note" : "Çalışma notu"}<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder={isEn ? "Questions, tensions, or evidence to revisit…" : "Yeniden ele alınacak sorular, gerilimler veya kanıtlar…"}/></label>
        <div className="tray-actions">
          <button className="button" type="button" onClick={() => window.print()}>{isEn ? "Export brief" : "Brifingi dışa aktar"}</button>
          <a href={`mailto:?subject=${encodeURIComponent(isEn ? "My Ganrich briefing" : "Ganrich brifingim")}&body=${encodeURIComponent(`${items.map((item, index) => `${index + 1}. ${item.title} — ${item.href}`).join("\n")}${note ? `\n\n${isEn ? "Working note" : "Çalışma notu"}:\n${note}` : ""}`)}`}>{isEn ? "Email this to me" : "Bunu e-posta ile gönder"}</a>
          <a href={`/${lang}/${routeMap[lang].privateBriefing}`}>{isEn ? "Request a private briefing" : "Özel brifing talep edin"} <span aria-hidden="true">↗</span></a>
        </div>
      </aside>
    </div>}
  </>;
}

export function HeaderExplore({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const isEn = lang === "en";
  const m = routeMap[lang];
  const links = [
    { group: isEn ? "Pages" : "Sayfalar", title: "Ganrich Advisory", hint: isEn ? "Strategy, transformation, and applied AI" : "Strateji, dönüşüm ve uygulamalı yapay zekâ", href: `/${lang}` },
    { group: isEn ? "Pages" : "Sayfalar", title: isEn ? "Expertise" : "Uzmanlık", hint: isEn ? "Six connected decision capabilities" : "Birbiriyle bağlantılı altı karar yetkinliği", href: `/${lang}/${m.expertise}` },
    ...expertise[lang].map((area) => ({ group: isEn ? "Expertise" : "Uzmanlık", title: area[0], hint: area[2], href: `/${lang}/${m.expertise}` })),
    { group: isEn ? "Decision tools" : "Karar araçları", title: isEn ? "Decision Atlas" : "Karar Atlası", hint: isEn ? "Explore by the decision on your agenda" : "Gündeminizdeki karara göre keşfedin", href: `/${lang}/${m.decisionAtlas}` },
    { group: isEn ? "Decision tools" : "Karar araçları", title: isEn ? "Decision Framer" : "Karar Çerçeveleyici", hint: isEn ? "Turn a broad issue into a structured brief" : "Geniş bir konuyu yapılandırılmış karar özetine dönüştürün", href: `/${lang}/${m.decisionFramer}` },
    { group: isEn ? "Decision tools" : "Karar araçları", title: isEn ? "Market Entry Compass" : "Pazara Giriş Pusulası", hint: isEn ? "Compare opportunity and readiness" : "Fırsat ve hazırlığı karşılaştırın", href: `/${lang}/${m.marketCompass}` },
    { group: isEn ? "Decision tools" : "Karar araçları", title: isEn ? "Board Brief Builder" : "Yönetim Kurulu Brifingi Oluşturucu", hint: isEn ? "Turn a decision into a one-page board memo" : "Bir kararı tek sayfalık yönetim kurulu notuna dönüştürün", href: `/${lang}/${m.boardBriefBuilder}` },
    { group: isEn ? "Decision tools" : "Karar araçları", title: isEn ? "AI Value Lens" : "Yapay Zekâ Değer Merceği", hint: isEn ? "Assess value, readiness, and responsible adoption" : "Değer, hazırlık ve sorumlu benimsemeyi değerlendirin", href: `/${lang}/${m.aiValueLens}` },
    ...insights[lang].map((insight, index) => ({ group: isEn ? "Insights" : "İçgörüler", title: insight[0], hint: insight[1], href: insightHref(lang, index) })),
    { group: isEn ? "Markets" : "Coğrafyalar", title: isEn ? "Regional perspective" : "Bölgesel bakış", hint: isEn ? "Türkiye, MENA, Europe, and Africa" : "Türkiye, MENA, Avrupa ve Afrika", href: `/${lang}/${m.markets}` },
    { group: isEn ? "Pages" : "Sayfalar", title: isEn ? "About" : "Hakkımızda", hint: isEn ? "Founder, principles, and working model" : "Kurucu, ilkeler ve çalışma modeli", href: `/${lang}/${m.about}` },
    { group: isEn ? "Pages" : "Sayfalar", title: isEn ? "Contact" : "İletişim", hint: isEn ? "Start a prepared conversation" : "Hazırlıklı bir görüşme başlatın", href: `/${lang}/${m.contact}` },
    { group: isEn ? "Trust" : "Güven", title: isEn ? "Privacy + Trust" : "Gizlilik + Güven", hint: isEn ? "Privacy choices, data rights, and AI transparency" : "Gizlilik tercihleri, ilgili kişi hakları ve yapay zekâ şeffaflığı", href: `/${lang}/${m.privacyCenter}` },
  ];
  const locale = lang === "tr" ? "tr-TR" : "en";
  const results = links.filter((item) => `${item.title} ${item.hint} ${item.group}`.toLocaleLowerCase(locale).includes(query.toLocaleLowerCase(locale)));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (open) keepModalFocus(event, dialog.current);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape" && open) {
        setOpen(false);
        window.setTimeout(() => trigger.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
  useEffect(() => { if (open) window.setTimeout(() => input.current?.focus(), 20); }, [open]);

  const closeSearch = () => {
    setOpen(false);
    window.setTimeout(() => trigger.current?.focus(), 0);
  };

  return <>
    <button ref={trigger} className="explore-trigger" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="ganrich-command">{isEn ? "Explore" : "Keşfet"} <kbd>⌘K</kbd></button>
    {open && <div className="command-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeSearch()}>
      <section ref={dialog} id="ganrich-command" className="command-bar" role="dialog" aria-modal="true" aria-label={isEn ? "Strategic command bar" : "Stratejik komut alanı"}>
        <div className="command-input"><span aria-hidden="true">⌕</span><label className="sr-only" htmlFor="command-search">{isEn ? "Search Ganrich" : "Ganrich içinde ara"}</label><input ref={input} id="command-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isEn ? "Search insights, decisions, markets, or tools…" : "İçgörü, karar, pazar veya araç arayın…"}/><button type="button" onClick={closeSearch} aria-label={isEn ? "Close search" : "Aramayı kapat"}>ESC</button></div>
        <div className="command-results">{results.length ? results.map((item) => <a href={item.href} key={`${item.href}-${item.title}`}><small>{item.group}</small><strong>{item.title}</strong><span>{item.hint}</span><i aria-hidden="true">↗</i></a>) : <p>{isEn ? "No matching published content. Try a decision, region, or tool." : "Eşleşen yayımlanmış içerik bulunamadı. Bir karar, coğrafya veya araç deneyin."}</p>}</div>
        <footer>{isEn ? "Try: “Help me frame a market-entry decision”" : "Örnek: “Bir pazara giriş kararını çerçevelememe yardımcı ol”"}</footer>
      </section>
    </div>}
  </>;
}

export function HomeIntelligenceModules({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const m = routeMap[lang];
  const decisions = isEn
    ? ["Where should we grow?", "Which markets should we enter?", "Where can AI create measurable value?", "Why is transformation not delivering?"]
    : ["Nerede büyümeliyiz?", "Hangi pazarlara girmeliyiz?", "Yapay zekâ nerede ölçülebilir değer yaratabilir?", "Dönüşüm neden beklenen sonucu üretmiyor?"];
  return <>
    <section className="decision-entry section">
      <div className="decision-entry-head"><span className="eyebrow">{isEn ? "WHAT LEADERS ARE DECIDING NOW" : "LİDERLERİN ŞİMDİ KARAR VERDİĞİ KONULAR"}</span><h2>{isEn ? "Explore Ganrich through the choice on your agenda." : "Ganrich’i gündeminizdeki tercih üzerinden keşfedin."}</h2><p>{isEn ? "SIGNAL → INTERPRETATION → CHOICE → ACTION" : "SİNYAL → YORUM → TERCİH → UYGULAMA"}</p></div>
      <ol>{decisions.map((decision, index) => <li key={decision}><a data-analytics-event="decision_tool_started" href={`/${lang}/${m.decisionAtlas}?decision=${index}`}><span>0{index + 1}</span><strong>{decision}</strong><i aria-hidden="true">→</i></a></li>)}</ol>
      <a className="button outline" data-analytics-event="decision_tool_started" href={`/${lang}/${m.decisionAtlas}`}>{isEn ? "Explore by decision" : "Karara göre keşfedin"}</a>
    </section>
    <section className="evidence-action section"><span className="eyebrow">{isEn ? "FROM EVIDENCE TO ACTION" : "KANITTAN UYGULAMAYA"}</span><ol>{(isEn ? ["Evidence", "Interpretation", "Choice", "Mobilization", "Value"] : ["Kanıt", "Yorum", "Tercih", "Mobilizasyon", "Değer"]).map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol></section>
  </>;
}
