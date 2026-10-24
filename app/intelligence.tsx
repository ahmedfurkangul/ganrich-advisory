"use client";

import { useEffect, useRef, useState } from "react";
import { HandoffLink, ToolIntro, takeHandoff } from "./decision-handoff";
import { expertise, insightArticles, insightHref, insights, Lang, markets, routeMap } from "./content";
import { optionalPreferencesEnabled } from "./privacy-center";

type BriefItem = { id: string; title: string; type: string; href: string };

function moveTab(event: React.KeyboardEvent<HTMLButtonElement>, current: number, count: number, select: (index: number) => void) {
  let next = current;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % count;
  else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + count) % count;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = count - 1;
  else return;
  event.preventDefault();
  select(next);
  const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  window.requestAnimationFrame(() => tabs?.[next]?.focus());
}

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

function emitSave(item: BriefItem) {
  window.dispatchEvent(new CustomEvent("ganrich-save", { detail: item }));
}


function ToolScopeNote({ lang }: { lang: Lang }) {
  return <p className="disclaimer">{lang === "en"
    ? "This is a preliminary framework based on your inputs, not a validated diagnostic. Inputs stay in the current page unless you explicitly save, export, email, or carry them into a review request. A review can help challenge assumptions, identify missing evidence, and define the next decision."
    : "Bu, girdilerinize dayanan bir ön çerçevedir; doğrulanmış bir tanı aracı değildir. Kaydetme, dışa aktarma, e-posta veya değerlendirme talebine aktarma işlemini seçmedikçe girdiler bu sayfada kalır. Değerlendirme, varsayımları sınamaya ve eksik kanıtı belirlemeye yardımcı olabilir."}</p>;
}

export function SaveControl({ lang, item }: { lang: Lang; item: BriefItem }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      className="save-control"
      type="button"
      onClick={() => {
        emitSave(item);
        setSaved(true);
      }}
    >
      <span aria-hidden="true">{saved ? "✓" : "+"}</span>
      {saved ? (lang === "en" ? "Saved" : "Kaydedildi") : lang === "en" ? "Save to briefing" : "Brifinge kaydet"}
    </button>
  );
}

export function BriefingTray({ lang }: { lang: Lang }) {
  const [items, setItems] = useState<BriefItem[]>([]);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const isEn = lang === "en";

  useEffect(() => {
    if (!optionalPreferencesEnabled()) return;
    const stored = localStorage.getItem("ganrich-briefing-tray");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        queueMicrotask(() => setItems(parsed));
      } catch {
        localStorage.removeItem("ganrich-briefing-tray");
      }
    }
    const onSave = (event: Event) => {
      const item = (event as CustomEvent<BriefItem>).detail;
      setItems((current) => {
        const next = current.some((x) => x.id === item.id) ? current : [...current, item];
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

  return (
    <>
      <button ref={trigger} className="tray-trigger" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="briefing-tray">
        <span>{isEn ? "Briefing Tray" : "Brifing Alanı"}</span>
        <strong>{items.length}</strong>
      </button>
      {open && (
        <div className="tray-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && closeTray()}>
          <aside id="briefing-tray" className="tray-drawer" role="dialog" aria-modal="true" aria-labelledby="briefing-tray-title">
            <div className="tray-head">
              <div>
                <span className="eyebrow">{isEn ? "PRIVATE WORKSPACE · GUEST MODE" : "ÖZEL ÇALIŞMA ALANI · MİSAFİR MODU"}</span>
                <h2 id="briefing-tray-title">{isEn ? "Briefing Tray" : "Brifing Alanı"}</h2>
              </div>
              <button ref={closeButton} type="button" onClick={closeTray} aria-label={isEn ? "Close tray" : "Alanı kapat"}>×</button>
            </div>
            <p className="tray-intro">
              {isEn
                ? "Saved locally on this device. No account or hidden profiling."
                : "Bu cihazda yerel olarak saklanır. Hesap veya gizli profilleme kullanılmaz."}
            </p>
            <ol className="tray-list">
              {items.map((item, i) => (
                <li key={item.id}>
                  <span>0{i + 1}</span>
                  <div><small>{item.type}</small><a href={item.href}>{item.title}</a></div>
                  <button type="button" onClick={() => remove(item.id)} aria-label={`${item.title} — ${isEn ? "remove" : "kaldır"}`}>−</button>
                </li>
              ))}
            </ol>
            <label className="tray-note">
              {isEn ? "Working note" : "Çalışma notu"}
              <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={isEn ? "Questions, tensions, or evidence to revisit…" : "Yeniden ele alınacak sorular, gerilimler veya kanıtlar…"}/>
            </label>
            <div className="tray-actions">
              <button className="button" type="button" onClick={() => window.print()}>{isEn ? "Export brief" : "Brifingi dışa aktar"}</button>
              <a href={`mailto:?subject=${encodeURIComponent(isEn ? "My Ganrich briefing" : "Ganrich brifingim")}&body=${encodeURIComponent(`${items.map((item, index) => `${index + 1}. ${item.title} — ${item.href}`).join("\n")}${note ? `\n\n${isEn ? "Working note" : "Çalışma notu"}:\n${note}` : ""}`)}`}>{isEn ? "Email this to me" : "Bunu e-posta ile gönder"}</a>
              <a href={`/${lang}/${routeMap[lang].contact}?service=briefing`}>{isEn ? "Request a private briefing" : "Özel brifing talep edin"} <span aria-hidden="true">↗</span></a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export function HeaderExplore({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const isEn = lang === "en";
  const m = routeMap[lang];
  const links = [
    { group: isEn ? "Pages" : "Sayfalar", title: isEn ? "Ganrich Advisory" : "Ganrich Advisory", hint: isEn ? "Strategy, transformation, and applied AI" : "Strateji, dönüşüm ve uygulamalı yapay zekâ", href: `/${lang}` },
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
  const results = links.filter((item) => `${item.title} ${item.hint} ${item.group}`.toLocaleLowerCase(lang === "tr" ? "tr-TR" : "en").includes(query.toLocaleLowerCase(lang === "tr" ? "tr-TR" : "en")));

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape" && open) {
        setOpen(false);
        window.setTimeout(() => trigger.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);
  useEffect(() => { if (open) window.setTimeout(() => input.current?.focus(), 20); }, [open]);

  const closeSearch = () => {
    setOpen(false);
    window.setTimeout(() => trigger.current?.focus(), 0);
  };

  return (
    <>
      <button ref={trigger} className="explore-trigger" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="ganrich-command">
        {isEn ? "Explore" : "Keşfet"} <kbd>⌘K</kbd>
      </button>
      {open && (
        <div className="command-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && closeSearch()}>
          <section id="ganrich-command" className="command-bar" role="dialog" aria-modal="true" aria-label={isEn ? "Strategic command bar" : "Stratejik komut alanı"}>
            <div className="command-input">
              <span aria-hidden="true">⌕</span>
              <label className="sr-only" htmlFor="command-search">{isEn ? "Search Ganrich" : "Ganrich içinde ara"}</label>
              <input ref={input} id="command-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={isEn ? "Search insights, decisions, markets, or tools…" : "İçgörü, karar, pazar veya araç arayın…"} />
              <button type="button" onClick={closeSearch} aria-label={isEn ? "Close search" : "Aramayı kapat"}>ESC</button>
            </div>
            <div className="command-results">
              {results.length ? results.map((item) => (
                <a href={item.href} key={`${item.href}-${item.title}`}>
                  <small>{item.group}</small><strong>{item.title}</strong><span>{item.hint}</span><i aria-hidden="true">↗</i>
                </a>
              )) : <p>{isEn ? "No matching published content. Try a decision, region, or tool." : "Eşleşen yayımlanmış içerik bulunamadı. Bir karar, coğrafya veya araç deneyin."}</p>}
            </div>
            <footer>{isEn ? "Try: “Help me frame a market-entry decision”" : "Örnek: “Bir pazara giriş kararını çerçevelememe yardımcı ol”"}</footer>
          </section>
        </div>
      )}
    </>
  );
}

export function HomeIntelligenceModules({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const m = routeMap[lang];
  const decisions = isEn
    ? ["Where should we grow?", "Which markets should we enter?", "Where can AI create measurable value?", "Why is transformation not delivering?"]
    : ["Nerede büyümeliyiz?", "Hangi pazarlara girmeliyiz?", "Yapay zekâ nerede ölçülebilir değer yaratabilir?", "Dönüşüm neden beklenen sonucu üretmiyor?"];
  return (
    <>
      <section className="decision-entry section">
        <div className="decision-entry-head">
          <span className="eyebrow">{isEn ? "WHAT LEADERS ARE DECIDING NOW" : "LİDERLERİN ŞİMDİ KARAR VERDİĞİ KONULAR"}</span>
          <h2>{isEn ? "Explore Ganrich through the choice on your agenda." : "Ganrich’i gündeminizdeki tercih üzerinden keşfedin."}</h2>
          <p>{isEn ? "SIGNAL → INTERPRETATION → CHOICE → ACTION" : "SİNYAL → YORUM → TERCİH → UYGULAMA"}</p>
        </div>
        <ol>
          {decisions.map((decision, i) => (
            <li key={decision}>
              <a href={`/${lang}/${m.decisionAtlas}?decision=${i}`}>
                <span>0{i + 1}</span><strong>{decision}</strong><i aria-hidden="true">→</i>
              </a>
            </li>
          ))}
        </ol>
        <a className="button outline" href={`/${lang}/${m.decisionAtlas}`}>{isEn ? "Explore by decision" : "Karara göre keşfedin"}</a>
      </section>
      <section className="evidence-action section">
        <span className="eyebrow">{isEn ? "FROM EVIDENCE TO ACTION" : "KANITTAN UYGULAMAYA"}</span>
        <ol>
          {(isEn ? ["Evidence", "Interpretation", "Choice", "Mobilization", "Value"] : ["Kanıt", "Yorum", "Tercih", "Mobilizasyon", "Değer"]).map((step, i) => <li key={step}><span>0{i + 1}</span><strong>{step}</strong></li>)}
        </ol>
      </section>
    </>
  );
}

const decisionThemes = {
  en: [
    ["Where should we grow?", "Growth and Portfolio Strategy", "Decision Framer"],
    ["Which markets should we enter?", "Market Entry and Regional Expansion", "Market Entry Compass"],
    ["What should we prioritize?", "Strategic Execution", "Portfolio Prioritizer"],
    ["How should our operating model change?", "Operating Model and Transformation", "Operating Model Lens"],
    ["Where can AI create measurable value?", "AI, Data and Digital Strategy", "AI Value Lens"],
    ["Why is our transformation not delivering?", "Operating Model and Transformation", "Transformation Pulse"],
    ["How should we prepare for uncertainty?", "Growth and Portfolio Strategy", "Scenario Studio"],
  ],
  tr: [
    ["Nerede büyümeliyiz?", "Büyüme ve Portföy Stratejisi", "Karar Çerçeveleyici"],
    ["Hangi pazarlara girmeliyiz?", "Pazara Giriş ve Bölgesel Büyüme", "Pazara Giriş Pusulası"],
    ["Neleri önceliklendirmeliyiz?", "Stratejik Uygulama", "Portföy Önceliklendirme Aracı"],
    ["İşletim modelimiz nasıl değişmeli?", "İşletim Modeli ve Dönüşüm", "İşletim Modeli Merceği"],
    ["Yapay zekâ nerede ölçülebilir değer yaratabilir?", "Yapay Zekâ, Veri ve Dijital Strateji", "Yapay Zekâ Değer Merceği"],
    ["Dönüşümümüz neden beklenen sonucu üretmiyor?", "İşletim Modeli ve Dönüşüm", "Dönüşüm Nabzı"],
    ["Belirsizliğe nasıl hazırlanmalıyız?", "Büyüme ve Portföy Stratejisi", "Senaryo Stüdyosu"],
  ],
} as const;

function IntelligenceHero({ label, title, intro }: { label: string; title: string; intro: string }) {
  return <section className="intelligence-hero"><span className="eyebrow">{label}</span><h1>{title}</h1><p>{intro}</p><div className="signal-sequence"><span>SIGNAL</span><i/><span>INTERPRETATION</span><i/><span>CHOICE</span><i/><span>ACTION</span></div></section>;
}

export function DecisionLabPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const checks = [
    [isEn ? "CBAM Readiness Check" : "CBAM Hazırlık Testi", isEn ? "Is your emissions data ready for your EU buyer, and are actual values worth the effort?" : "Emisyon veriniz AB alıcınız için hazır mı, gerçek değerler emeğe değer mi?", m.cbamCheck],
    [isEn ? "CRA Readiness Check" : "CRA Hazırlık Testi", isEn ? "Could you report an actively exploited vulnerability within 24 hours under the Cyber Resilience Act?" : "Siber Dayanıklılık Yasası kapsamında istismar edilen bir açığı 24 saat içinde bildirebilir misiniz?", m.craCheck],
    [isEn ? "EUDR Readiness Check" : "EUDR Hazırlık Testi", isEn ? "Would your origin, geolocation and legality data let your EU importer file its due-diligence statement?" : "Menşe, coğrafi konum ve yasallık veriniz AB ithalatçınızın durum tespiti beyanı için yeterli mi?", m.eudrCheck],
  ];
  const tools = [
    [isEn ? "Decision Framer" : "Karar Çerçeveleyici", isEn ? "Turn a broad priority into an editable decision brief." : "Geniş bir önceliği düzenlenebilir bir karar özetine dönüştürün.", m.decisionFramer],
    [isEn ? "Market Entry Compass" : "Pazara Giriş Pusulası", isEn ? "Compare opportunity and readiness with assumptions you control." : "Kendi varsayımlarınızla fırsat ve hazırlığı karşılaştırın.", m.marketCompass],
    [isEn ? "Board Brief Builder" : "Yönetim Kurulu Brifingi Oluşturucu", isEn ? "Turn a framed decision into a one-page board memo." : "Çerçevelenmiş bir kararı tek sayfalık yönetim kurulu notuna dönüştürün.", m.boardBriefBuilder],
    [isEn ? "AI Value Lens" : "Yapay Zekâ Değer Merceği", isEn ? "Assess an AI use case for value, readiness and risk." : "Bir yapay zekâ kullanım alanını değer, hazırlık ve risk açısından değerlendirin.", m.aiValueLens],
    [isEn ? "Decision Atlas" : "Karar Atlası", isEn ? "Start from the decision on your agenda." : "Gündeminizdeki karardan başlayın.", m.decisionAtlas],
  ];
  return (
    <>
      <IntelligenceHero label={isEn ? "READINESS CHECKS" : "HAZIRLIK TESTLERİ"} title={isEn ? "See in two minutes where you stand on an EU rule." : "Bir AB kuralı karşısında nerede durduğunuzu iki dakikada görün."} intro={isEn ? "Eight questions each, an instant result on screen and the gaps to close first. No account or email is needed to see your result." : "Her biri sekiz soru; sonuç hemen ekranda, önce kapatılması gereken boşluklarla birlikte. Sonucu görmek için hesap veya e-posta gerekmez."}/>
      <section className="available-tools section">
        <div className="section-head-compact"><span className="eyebrow">{isEn ? "START HERE" : "BURADAN BAŞLAYIN"}</span><h2>{isEn ? "Three checks for the rules EU buyers already enforce." : "AB alıcılarının şimdiden uyguladığı kurallar için üç test."}</h2></div>
        <div className="tool-cards">{checks.map((tool, i) => <article key={tool[0]}><span>0{i + 1}</span><h3>{tool[0]}</h3><p>{tool[1]}</p><p className="tool-meta">{isEn ? "8 questions · about 2 min · instant result" : "8 soru · yaklaşık 2 dk · anında sonuç"}</p><a href={`/${lang}/${tool[2]}`}>{isEn ? "Start the check" : "Teste başlayın"} <i aria-hidden="true">↗</i></a></article>)}</div>
      </section>
      <section className="section lab-tools-archive">
        <div className="section-head-compact"><span className="eyebrow">{isEn ? "DECISION TOOLS" : "KARAR ARAÇLARI"}</span><h2>{isEn ? "For strategy and growth decisions." : "Strateji ve büyüme kararları için."}</h2></div>
        <ul>{tools.map(tool => <li key={tool[0]}><a href={`/${lang}/${tool[2]}`}>{tool[0]}</a><span>{tool[1]}</span></li>)}</ul>
        <a className="lab-changelog-link" href={`/${lang}/${m.decisionLabChangelog}`}><span>{isEn ? "CHANGELOG" : "DEĞİŞİKLİK GÜNLÜĞÜ"}</span><strong>{isEn ? "See what is live, what changed, and what remains under evaluation." : "Nelerin yayında, nelerin değiştiğini ve hangi araçların değerlendirmede olduğunu görün."}</strong><i aria-hidden="true">↗</i></a>
      </section>
      <section className="limitations-band"><strong>{isEn ? "What these tools do not do" : "Bu araçların yapmadığı şeyler"}</strong><p>{isEn ? "They structure exploration. They do not replace professional judgment, verified evidence, legal review, investment advice, or a decision owner." : "Keşif sürecini yapılandırırlar. Profesyonel muhakemenin, doğrulanmış kanıtın, hukuk incelemesinin, yatırım tavsiyesinin veya karar sahibinin yerine geçmezler."}</p></section>
    </>
  );
}

export function DecisionAtlasPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const [decision, setDecision] = useState(0);
  const [region, setRegion] = useState(0);
  const [urgency, setUrgency] = useState("important");
  const [maturity, setMaturity] = useState("developing");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const decisionValue = Number(params.get("decision"));
    const regionValue = Number(params.get("region"));
    queueMicrotask(() => {
      if (Number.isInteger(decisionValue) && decisionValue >= 0 && decisionValue < decisionThemes[lang].length) setDecision(decisionValue);
      if (Number.isInteger(regionValue) && regionValue >= 0 && regionValue < markets[lang].length) setRegion(regionValue);
      if (["important", "urgent", "exploratory"].includes(params.get("urgency") ?? "")) setUrgency(params.get("urgency")!);
      if (["developing", "established", "reset"].includes(params.get("maturity") ?? "")) setMaturity(params.get("maturity")!);
      setHydrated(true);
    });
  }, [lang]);
  useEffect(() => {
    if (!hydrated) return;
    const params = new URLSearchParams();
    params.set("decision", String(decision)); params.set("region", String(region)); params.set("urgency", urgency); params.set("maturity", maturity);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [decision, region, urgency, maturity, hydrated]);
  const selected = decisionThemes[lang][decision];
  const toolHref = decision === 1 ? m.marketCompass : decision === 4 ? m.aiValueLens : m.decisionFramer;
  return (
    <>
      <IntelligenceHero label={isEn ? "DECISION ATLAS" : "KARAR ATLASI"} title={isEn ? "Begin with the decision." : "Karardan başlayın."} intro={isEn ? "Strategies, transformations, and investments become clearer when the underlying decision is framed precisely. Explore Ganrich Advisory through the choices currently on your agenda." : "Stratejiler, dönüşümler ve yatırımlar, temeldeki karar doğru biçimde çerçevelendiğinde netleşir. Ganrich Advisory’i gündeminizdeki tercihler üzerinden keşfedin."}/>
      <section className="atlas section">
        <div className="atlas-controls">
          <fieldset><legend>{isEn ? "1. Select a decision" : "1. Bir karar seçin"}</legend>{decisionThemes[lang].map((item, i) => <label key={item[0]} className={decision === i ? "selected" : ""}><input type="radio" name="decision" checked={decision === i} onChange={() => setDecision(i)}/><span>0{i + 1}</span>{item[0]}</label>)}</fieldset>
          <div className="atlas-context">
            <label>{isEn ? "2. Region" : "2. Coğrafya"}<select value={region} onChange={(e) => setRegion(Number(e.target.value))}>{markets[lang].map((market, i) => <option key={market[0]} value={i}>{market[0]}</option>)}</select></label>
            <label>{isEn ? "3. Strategic urgency" : "3. Stratejik aciliyet"}<select value={urgency} onChange={(e) => setUrgency(e.target.value)}><option value="important">{isEn ? "Important, not immediate" : "Önemli, acil değil"}</option><option value="urgent">{isEn ? "Decision required soon" : "Yakında karar gerekli"}</option><option value="exploratory">{isEn ? "Exploratory" : "Keşif aşamasında"}</option></select></label>
            <label>{isEn ? "4. Organizational maturity" : "4. Kurumsal olgunluk"}<select value={maturity} onChange={(e) => setMaturity(e.target.value)}><option value="developing">{isEn ? "Developing" : "Gelişiyor"}</option><option value="established">{isEn ? "Established" : "Yerleşik"}</option><option value="reset">{isEn ? "Requires reset" : "Yeniden odaklanmalı"}</option></select></label>
          </div>
        </div>
        <div className="atlas-result" aria-live="polite">
          <div className="atlas-network" aria-hidden="true"><span className="node primary">DECISION</span><span className="node expertise">EXPERTISE</span><span className="node evidence">EVIDENCE</span><span className="node tool">TOOL</span><i/><i/><i/></div>
          <span className="eyebrow">{isEn ? "YOUR DECISION PATHWAY" : "KARAR YOLUNUZ"}</span>
          <h2>{selected[0]}</h2>
          <dl>
            <div><dt>{isEn ? "Relevant expertise" : "İlgili uzmanlık"}</dt><dd>{selected[1]}</dd></div>
            <div><dt>{isEn ? "Regional lens" : "Bölgesel mercek"}</dt><dd>{markets[lang][region][0]}</dd></div>
            <div><dt>{isEn ? "Recommended tool" : "Önerilen araç"}</dt><dd>{selected[2]}</dd></div>
            <div><dt>{isEn ? "Question to resolve next" : "Sonraki adımda yanıtlanacak soru"}</dt><dd>{isEn ? "What evidence would cause leadership to choose a different path?" : "Hangi kanıt liderliğin farklı bir yol seçmesine neden olur?"}</dd></div>
          </dl>
          <div className="atlas-actions">
            <a className="button" href={`/${lang}/${toolHref}`}>{isEn ? "Continue analysis" : "Analize devam et"}</a>
            <SaveControl lang={lang} item={{ id: `atlas-${decision}-${region}`, title: selected[0], type: isEn ? "Decision pathway" : "Karar yolu", href: `/${lang}/${m.decisionAtlas}?decision=${decision}&region=${region}` }}/>
            <button type="button" onClick={() => window.print()}>{isEn ? "Export / print" : "Dışa aktar / yazdır"}</button>
            <HandoffLink lang={lang} data={{tool:"Decision Atlas",decision:selected[0],context:`${markets[lang][region][0]} · ${urgency} · ${maturity}`}}>{isEn ? "Review this decision with Ganrich" : "Bu kararı Ganrich ile değerlendirin"}</HandoffLink>
          </div>
          <small>{isEn ? "Shareable pathway · selections only · no confidential data" : "Paylaşılabilir yol · yalnızca seçimler · gizli veri içermez"}</small>
          <ToolScopeNote lang={lang}/>
        </div>
      </section>
    </>
  );
}

const framerQuestions = {
  en: [
    ["What decision needs to be made?", "Why does it matter now?"],
    ["What outcome matters most?", "What alternatives are currently being considered?"],
    ["What constraints are non-negotiable?", "What assumptions are shaping the discussion?"],
    ["Where is the greatest uncertainty?", "Who must support or execute the decision?"],
    ["What is the cost of delay?", "What evidence is currently missing?"],
  ],
  tr: [
    ["Hangi kararın verilmesi gerekiyor?", "Bu karar neden şimdi önem taşıyor?"],
    ["En önemli sonuç nedir?", "Şu anda hangi alternatifler değerlendiriliyor?"],
    ["Hangi kısıtlar tartışmaya açık değil?", "Görüşmeyi hangi varsayımlar şekillendiriyor?"],
    ["En büyük belirsizlik nerede?", "Kararı kimlerin desteklemesi veya uygulaması gerekiyor?"],
    ["Gecikmenin maliyeti nedir?", "Şu anda hangi kanıt eksik?"],
  ],
} as const;

export function DecisionFramerPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(""));
  const [done, setDone] = useState(false);
  const [statement, setStatement] = useState("");
  useEffect(() => {
    window.history.replaceState(null, "", window.location.pathname);
    let initial = Array(10).fill("") as string[];
    if (optionalPreferencesEnabled()) {
      const stored = localStorage.getItem(`ganrich-framer-${lang}`);
      if (stored) try { const parsed = JSON.parse(stored); if (Array.isArray(parsed) && parsed.length === 10 && parsed.every(x => typeof x === "string")) initial = parsed.map(x=>x.slice(0,700)); } catch { /* ignore invalid local draft */ }
    }
    queueMicrotask(() => { setAnswers(initial); });
  }, [lang]);

  const update = (index: number, value: string) => {
    const next = answers.map((answer, i) => i === index ? value : answer);
    setAnswers(next); if (optionalPreferencesEnabled()) localStorage.setItem(`ganrich-framer-${lang}`, JSON.stringify(next));
  };
  const complete = () => {
    setStatement(isEn ? `Leadership must decide ${answers[0] || "[decision]"} in order to achieve ${answers[2] || "[desired outcome]"}, while testing the assumptions and evidence that could change the choice.` : `Liderliğin, ${answers[2] || "[istenen sonuç]"} sonucuna ulaşmak için ${answers[0] || "[karar]"} konusunda tercih yapması; bu tercihi değiştirebilecek varsayım ve kanıtları sınaması gerekiyor.`);
    setDone(true);
  };
  return (
    <>
      <IntelligenceHero label={isEn ? "DECISION FRAMER" : "KARAR ÇERÇEVELEYİCİ"} title={isEn ? "A better answer begins with a better-framed decision." : "Daha iyi bir yanıt, daha doğru çerçevelenmiş bir kararla başlar."} intro={isEn ? "Create a meaningful on-screen result before deciding whether to export, share, or request a Ganrich review." : "Dışa aktarma, paylaşma veya Ganrich değerlendirmesi talep etmeden önce ekranda anlamlı bir sonuç oluşturun."}/>
<ToolIntro lang={lang} time={isEn ? "About 5–8 minutes" : "Yaklaşık 5–8 dakika"} output={isEn ? "An editable decision brief" : "Düzenlenebilir karar özeti"} onExample={()=>{setAnswers(isEn ? ["Delegate routine pricing decisions to sales managers", "Approvals are delaying customer responses", "Faster responses within agreed margin limits", "Delegate within limits or retain central approval", "Protect minimum margin and contract requirements", "Managers can apply clear rules consistently", "Which exceptions need founder review", "Founder, commercial lead, finance lead", "Delayed quotes and management attention", "Recent pricing cases and margin exceptions"] : ["Rutin fiyat kararlarını satış yöneticilerine devretmek", "Onaylar müşteriye yanıtı geciktiriyor", "Marj sınırları içinde daha hızlı yanıt", "Sınırlı yetki devri veya merkezî onay", "Asgari marjı ve sözleşme koşullarını korumak", "Yöneticiler açık kuralları tutarlı uygular", "Hangi istisnalar kurucu onayı gerektiriyor", "Kurucu, ticari lider ve finans lideri", "Geciken teklifler ve yönetim zamanı", "Yakın dönem fiyat ve marj istisnaları"]);setDone(false);setStep(0);}} onClear={()=>{setAnswers(Array(10).fill(""));setStatement("");setStep(0);setDone(false);try{localStorage.removeItem(`ganrich-framer-${lang}`);}catch{}}}/>
      <section className="framer section">
        {!done ? (
          <div className="framer-workspace">
            <aside><span className="eyebrow">{isEn ? "PROGRESS" : "İLERLEME"}</span><strong>{step + 1} / 5</strong><ol>{framerQuestions[lang].map((_, i) => <li key={i} className={i === step ? "active" : i < step ? "complete" : ""}><button type="button" onClick={() => setStep(i)}><span>{i < step ? "✓" : `0${i + 1}`}</span>{isEn ? ["Decision", "Outcome", "Boundaries", "Alignment", "Evidence"][i] : ["Karar", "Sonuç", "Sınırlar", "Uyum", "Kanıt"][i]}</button></li>)}</ol><small>{isEn ? "Saved on this device only when functional preferences are enabled." : "Yalnızca işlevsel tercihler etkinse bu cihazda kaydedilir."}</small></aside>
            <form onSubmit={(e) => { e.preventDefault(); if (step < 4) setStep(step + 1); else complete(); }}>
              <span className="eyebrow">{isEn ? `STEP ${step + 1}` : `${step + 1}. ADIM`}</span>
              {framerQuestions[lang][step].map((question, offset) => {
                const index = step * 2 + offset;
                return <label key={question}>{question}<textarea required minLength={8} maxLength={700} value={answers[index]} onChange={(e) => update(index, e.target.value)} placeholder={isEn ? "Use concise, non-confidential language…" : "Kısa ve gizli bilgi içermeyen bir ifade kullanın…"}/></label>;
              })}
              <div className="step-actions"><button type="button" disabled={!step} onClick={() => setStep(step - 1)}>{isEn ? "Back" : "Geri"}</button><button className="button" type="submit">{step < 4 ? (isEn ? "Continue analysis" : "Analize devam et") : (isEn ? "Create decision brief" : "Karar özeti oluştur")}</button></div>
            </form>
          </div>
        ) : (
          <div className="framer-result" aria-live="polite">
            <header><span className="eyebrow">{isEn ? "PRELIMINARY · DIRECTIONAL · REQUIRES VALIDATION" : "ÖN DEĞERLENDİRME · YÖN GÖSTERİCİ · DOĞRULAMA GEREKLİ"}</span><h2>{isEn ? "Decision Brief" : "Karar Özeti"}</h2></header>
            <label>{isEn ? "Refined decision statement" : "Netleştirilmiş karar ifadesi"}<textarea value={statement} onChange={(e) => setStatement(e.target.value)}/></label>
            <div className="brief-grid">
              <section><span>{isEn ? "DESIRED OUTCOME" : "İSTENEN SONUÇ"}</span><p>{answers[2] || (isEn ? "Requires definition." : "Tanımlanması gerekiyor.")}</p></section>
              <section><span>{isEn ? "STRATEGIC ALTERNATIVES" : "STRATEJİK ALTERNATİFLER"}</span><p>{answers[3] || (isEn ? "Requires definition." : "Tanımlanması gerekiyor.")}</p></section>
              <section><span>{isEn ? "CRITICAL ASSUMPTIONS" : "KRİTİK VARSAYIMLAR"}</span><p>{answers[5] || (isEn ? "Requires validation." : "Doğrulanması gerekiyor.")}</p></section>
              <section><span>{isEn ? "REQUIRED EVIDENCE" : "GEREKLİ KANIT"}</span><p>{answers[9] || (isEn ? "Evidence gap not yet stated." : "Kanıt açığı henüz belirtilmedi.")}</p></section>
              <section><span>{isEn ? "STAKEHOLDERS" : "PAYDAŞLAR"}</span><p>{answers[7] || (isEn ? "Requires identification." : "Belirlenmesi gerekiyor.")}</p></section>
              <section><span>{isEn ? "RISK OF DELAY" : "GECİKME RİSKİ"}</span><p>{answers[8] || (isEn ? "Requires assessment." : "Değerlendirilmesi gerekiyor.")}</p></section>
            </div>
            <div className="classification"><span>{isEn ? "Classification" : "Sınıflandırma"}</span><strong>{isEn ? "Strategic · evidence-constrained · reversibility to be assessed" : "Stratejik · kanıtla kısıtlı · geri döndürülebilirlik değerlendirilmeli"}</strong></div>
            <div className="result-actions">
              <SaveControl lang={lang} item={{ id: "decision-framer-result", title: statement, type: isEn ? "Decision brief" : "Karar özeti", href: `/${lang}/${m.decisionFramer}` }}/>
              <button type="button" onClick={() => window.print()}>{isEn ? "Export brief" : "Brifingi dışa aktar"}</button>
              <a href={`mailto:?subject=${encodeURIComponent(isEn ? "My preliminary decision brief" : "Ön karar özetim")}&body=${encodeURIComponent(statement)}`}>{isEn ? "Email to myself" : "Kendime e-posta gönder"}</a>
              <HandoffLink lang={lang} target="boardBriefBuilder" data={{decision:statement,recommendation:answers[3],evidence:answers[9]}}>{isEn ? "Build a board brief" : "Yönetim kurulu brifingi oluştur"}</HandoffLink>
              <HandoffLink lang={lang} data={{tool:"Decision Framer",decision:statement,context:answers[9]}}>{isEn ? "Review this decision with Ganrich" : "Bu kararı Ganrich ile değerlendirin"}</HandoffLink>
              <button type="button" onClick={() => { setDone(false); setStep(0); }}>{isEn ? "Start again" : "Yeniden başla"}</button>
            </div>
            <ToolScopeNote lang={lang}/>
          </div>
        )}
      </section>
    </>
  );
}

type MarketScore = { name: string; scores: number[] };

export function MarketCompassPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const dimensions = isEn ? ["Market attractiveness", "Strategic fit", "Capability readiness", "Execution risk"] : ["Pazar cazibesi", "Stratejik uyum", "Yetkinlik hazırlığı", "Uygulama riski"];
  const [marketsInput, setMarketsInput] = useState<MarketScore[]>([{ name: "", scores: [50, 50, 50, 50] }, { name: "", scores: [50, 50, 50, 50] }]);
  const [weights, setWeights] = useState([25, 25, 25, 25]);
  const [result, setResult] = useState(false);
  const weightTotal = weights.reduce((a, b) => a + b, 0);
  const score = (market: MarketScore) => weightTotal ? Math.round(market.scores.reduce((sum, value, i) => sum + (i === 3 ? 100 - value : value) * weights[i], 0) / weightTotal) : 0;
  const updateScore = (marketIndex: number, dimension: number, value: number) => setMarketsInput(marketsInput.map((market, i) => i === marketIndex ? { ...market, scores: market.scores.map((scoreValue, j) => j === dimension ? value : scoreValue) } : market));
  useEffect(() => { window.history.replaceState(null, "", window.location.pathname); }, []);
  return (
    <>
      <IntelligenceHero label={isEn ? "MARKET ENTRY COMPASS" : "PAZARA GİRİŞ PUSULASI"} title={isEn ? "Market attractiveness is only one part of the decision." : "Pazarın cazibesi, kararın yalnızca bir boyutudur."} intro={isEn ? "Compare opportunity and organisational readiness using assumptions you control. No unsupported country data is inserted." : "Fırsat ve kurumsal hazırlığı, kontrol ettiğiniz varsayımlarla karşılaştırın. Desteklenmeyen ülke verileri eklenmez."}/>
<ToolIntro lang={lang} time={isEn ? "About 4–6 minutes" : "Yaklaşık 4–6 dakika"} output={isEn ? "A weighted comparison of two markets" : "İki pazarın ağırlıklı karşılaştırması"} onExample={()=>{setMarketsInput([{name:isEn?"Illustrative market A":"Temsili pazar A",scores:[75,70,40,60]},{name:isEn?"Illustrative market B":"Temsili pazar B",scores:[60,80,75,35]}]);setWeights([25,25,25,25]);setResult(true);}} onClear={()=>{setMarketsInput([{name:"",scores:[50,50,50,50]},{name:"",scores:[50,50,50,50]}]);setWeights([25,25,25,25]);setResult(false);}}/>
      <section className="compass section">
        <div className="source-key"><span><i className="user"/> {isEn ? "User-entered assumption" : "Kullanıcı varsayımı"}</span><span><i className="ganrich"/> {isEn ? "Ganrich research: not included" : "Ganrich araştırması: dâhil değil"}</span><span><i className="external"/> {isEn ? "External data: not included" : "Haricî veri: dâhil değil"}</span></div>
        <div className="weight-editor">
          <header><div><span className="eyebrow">{isEn ? "EDITABLE WEIGHTS" : "DÜZENLENEBİLİR AĞIRLIKLAR"}</span><h2>{isEn ? "Define what matters for this decision." : "Bu karar için neyin önemli olduğunu tanımlayın."}</h2></div><p>{isEn ? "The starting weights are editable working assumptions—not a universal methodology." : "Başlangıç ağırlıkları düzenlenebilir çalışma varsayımlarıdır; evrensel bir yöntem değildir."}</p></header>
          <div>{dimensions.map((dimension, i) => <label key={dimension}><span>{dimension}</span><input type="range" min="0" max="100" value={weights[i]} onChange={(e) => setWeights(weights.map((w, j) => j === i ? Number(e.target.value) : w))}/><output>{weights[i]}</output></label>)}</div>
        </div>
        <div className="market-inputs">
          {marketsInput.map((market, marketIndex) => <section key={marketIndex}><label className="market-name">{isEn ? `Market ${marketIndex + 1}` : `Pazar ${marketIndex + 1}`}<input required minLength={2} maxLength={80} value={market.name} onChange={(e) => setMarketsInput(marketsInput.map((item, i) => i === marketIndex ? { ...item, name: e.target.value } : item))} placeholder={isEn ? "Enter a country or market" : "Ülke veya pazar girin"}/></label>{dimensions.map((dimension, dimensionIndex) => <label key={dimension}><span>{dimension}</span><input type="range" min="0" max="100" value={market.scores[dimensionIndex]} onChange={(e) => updateScore(marketIndex, dimensionIndex, Number(e.target.value))}/><output>{market.scores[dimensionIndex]}</output></label>)}</section>)}
        </div>
        {!weightTotal && <p className="form-error" role="alert">{isEn ? "At least one weighting must be greater than zero." : "En az bir ağırlık sıfırdan büyük olmalıdır."}</p>}
        <button className="button" type="button" disabled={!weightTotal || marketsInput.some((market) => market.name.trim().length < 2)} onClick={() => setResult(true)}>{isEn ? "Compare markets" : "Pazarları karşılaştır"}</button>
        {result && <div className="compass-result" aria-live="polite"><header><span className="eyebrow">{isEn ? "DIRECTIONAL · USER-ENTERED ASSUMPTIONS" : "YÖN GÖSTERİCİ · KULLANICI VARSAYIMLARI"}</span><h2>{isEn ? "Opportunity–readiness comparison" : "Fırsat–hazırlık karşılaştırması"}</h2></header><div className="score-bars">{marketsInput.map((market) => <div key={market.name}><strong>{market.name}</strong><i><span style={{ width: `${score(market)}%` }}/></i><output>{score(market)} / 100</output></div>)}</div><table><caption className="sr-only">{isEn ? "Market comparison scores" : "Pazar karşılaştırma puanları"}</caption><thead><tr><th>{isEn ? "Dimension" : "Boyut"}</th>{marketsInput.map((market) => <th key={market.name}>{market.name}</th>)}</tr></thead><tbody>{dimensions.map((dimension, i) => <tr key={dimension}><th>{dimension}</th>{marketsInput.map((market) => <td key={market.name}>{market.scores[i]}</td>)}</tr>)}</tbody></table><div className="compass-interpretation"><section><span>{isEn ? "WHAT THIS SUGGESTS" : "SONUCUN GÖSTERDİĞİ"}</span><p>{isEn ? "The current assumptions create a relative comparison. They do not establish market attractiveness or readiness as fact." : "Mevcut varsayımlar göreli bir karşılaştırma oluşturur. Pazar cazibesini veya hazırlığı gerçek olarak ortaya koymaz."}</p></section><section><span>{isEn ? "EVIDENCE GAP" : "KANIT AÇIĞI"}</span><p>{isEn ? "Validate each input with dated, market-specific research and internal capability evidence." : "Her girdiyi tarihli, pazara özgü araştırma ve iç yetkinlik kanıtıyla doğrulayın."}</p></section></div><div className="result-actions"><SaveControl lang={lang} item={{ id: "market-compass-result", title: `${marketsInput[0].name} / ${marketsInput[1].name}`, type: isEn ? "Market comparison" : "Pazar karşılaştırması", href: `/${lang}/${m.marketCompass}` }}/><button type="button" onClick={() => window.print()}>{isEn ? "Export / print" : "Dışa aktar / yazdır"}</button><HandoffLink lang={lang} data={{tool:"Market Entry Compass",decision:`${marketsInput[0].name} / ${marketsInput[1].name}`,context:dimensions.map((d,i)=>`${d}: ${marketsInput[0].scores[i]} / ${marketsInput[1].scores[i]}`).join("; "),interest:expertise[lang][1][0]}}>{isEn ? "Review this decision with Ganrich" : "Bu kararı Ganrich ile değerlendirin"}</HandoffLink></div><ToolScopeNote lang={lang}/></div>}
      </section>
    </>
  );
}

type BoardBrief = {
  decision: string;
  recommendation: string;
  rationale: string;
  alternatives: string;
  evidence: string;
  risks: string;
  action: string;
  owner: string;
};

const emptyBoardBrief: BoardBrief = { decision: "", recommendation: "", rationale: "", alternatives: "", evidence: "", risks: "", action: "", owner: "" };

export function BoardBriefBuilderPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const [brief, setBrief] = useState<BoardBrief>(emptyBoardBrief);
  const [generated, setGenerated] = useState(false);
  const labels: Array<[keyof BoardBrief, string, string]> = isEn ? [
    ["decision", "Decision required", "State the choice the board is being asked to make."],
    ["recommendation", "Management recommendation", "State the recommended path in one direct sentence."],
    ["rationale", "Why now", "Explain the timing, strategic relevance, and cost of delay."],
    ["alternatives", "Alternatives considered", "Name credible alternatives and why they were not preferred."],
    ["evidence", "Evidence and uncertainty", "Separate established evidence, assumptions, and unresolved questions."],
    ["risks", "Principal risks and controls", "Name material risks, leading indicators, and proposed controls."],
    ["action", "Decision and next action", "Specify approval, resource, gate, or mandate required."],
    ["owner", "Accountable owner and timing", "Name the role accountable and the next review point."],
  ] : [
    ["decision", "Gerekli karar", "Yönetim kurulundan istenen tercihi açık biçimde belirtin."],
    ["recommendation", "Yönetim önerisi", "Önerilen yolu tek ve doğrudan bir cümleyle ifade edin."],
    ["rationale", "Neden şimdi", "Zamanlamayı, stratejik önemi ve gecikmenin maliyetini açıklayın."],
    ["alternatives", "Değerlendirilen alternatifler", "İnandırıcı alternatifleri ve neden tercih edilmediklerini belirtin."],
    ["evidence", "Kanıt ve belirsizlik", "Yerleşik kanıtı, varsayımları ve açık soruları birbirinden ayırın."],
    ["risks", "Başlıca riskler ve kontroller", "Önemli riskleri, öncü göstergeleri ve önerilen kontrolleri belirtin."],
    ["action", "Karar ve sonraki eylem", "Gerekli onayı, kaynağı, kapıyı veya yetkiyi tanımlayın."],
    ["owner", "Sorumlu sahip ve zamanlama", "Sorumlu rolü ve bir sonraki gözden geçirme noktasını belirtin."],
  ];

  useEffect(() => { window.history.replaceState(null, "", window.location.pathname); const handoff=takeHandoff("boardBriefBuilder"); if(handoff)queueMicrotask(()=>setBrief({...emptyBoardBrief,decision:handoff.decision||"",recommendation:handoff.recommendation||"",evidence:handoff.evidence||""})); }, []);
  const update = (key: keyof BoardBrief, value: string) => setBrief((current) => ({ ...current, [key]: value }));
  const complete = generated || [brief.decision, brief.recommendation, brief.evidence, brief.action].every((value) => value.trim().length >= 10);
  const emailBody = labels.map(([key, label]) => `${label.toUpperCase()}\n${brief[key] || "—"}`).join("\n\n");

  return <>
    <IntelligenceHero label={isEn ? "BOARD BRIEF BUILDER" : "YÖNETİM KURULU BRİFİNGİ OLUŞTURUCU"} title={isEn ? "Make the decision visible on one page." : "Kararı tek sayfada görünür kılın."} intro={isEn ? "Convert a framed choice into a concise board memo that distinguishes recommendation, evidence, uncertainty, risk, and required action." : "Çerçevelenmiş bir tercihi; öneri, kanıt, belirsizlik, risk ve gerekli eylemi birbirinden ayıran özlü bir yönetim kurulu notuna dönüştürün."}/>
<ToolIntro lang={lang} time={isEn ? "About 5–10 minutes" : "Yaklaşık 5–10 dakika"} output={isEn ? "A printable board decision memo" : "Yazdırılabilir yönetim kurulu karar notu"} onExample={()=>{setBrief(isEn?{decision:"Approve a bounded distributor evaluation",recommendation:"Test one channel before committing to a local team",rationale:"Customer interest needs commercial validation",alternatives:"Direct entry or defer expansion",evidence:"Illustrative only: demand, partner economics, and service requirements still need validation",risks:"Partner dependence; retain customer feedback and review rights",action:"Authorize research and set the next investment gate",owner:"Commercial lead; review after evidence is collected"}:{decision:"Sınırlı bir distribütör değerlendirmesini onaylamak",recommendation:"Yerel ekip kurmadan önce tek bir kanalı sınamak",rationale:"Müşteri ilgisi ticari doğrulama gerektiriyor",alternatives:"Doğrudan giriş veya genişlemeyi erteleme",evidence:"Temsili örnek: talep, ortak ekonomisi ve hizmet gereksinimleri doğrulanmalı",risks:"Ortak bağımlılığı; müşteri geri bildirimi ve inceleme hakkını korumak",action:"Araştırmayı yetkilendirmek ve sonraki yatırım eşiğini belirlemek",owner:"Ticari lider; kanıt toplandıktan sonra değerlendirme"});setGenerated(true);}} onClear={()=>{setBrief(emptyBoardBrief);setGenerated(false);}}/>
    <section className="board-builder section">
      {!generated ? <form className="board-form" onSubmit={(event) => { event.preventDefault(); setGenerated(true); }}>
        <header><span className="eyebrow">{isEn ? "ONE-PAGE INPUT DISCIPLINE" : "TEK SAYFALIK GİRDİ DİSİPLİNİ"}</span><h2>{isEn ? "Write for the decision, not the archive." : "Arşiv için değil, karar için yazın."}</h2><p>{isEn ? "Use concise, non-confidential language. Four core fields are required; the remainder make the board discussion stronger." : "Kısa ve gizli bilgi içermeyen bir dil kullanın. Dört temel alan zorunludur; diğer alanlar yönetim kurulu görüşmesini güçlendirir."}</p></header>
        <div>{labels.map(([key, label, hint], index) => <label key={key}><span>0{index + 1} · {label}</span><small>{hint}</small><textarea value={brief[key]} onChange={(event) => update(key, event.target.value)} minLength={["decision", "recommendation", "evidence", "action"].includes(key) ? 10 : undefined} maxLength={1200} required={["decision", "recommendation", "evidence", "action"].includes(key)}/></label>)}</div>
        <button className="button" type="submit">{isEn ? "Build the board brief" : "Yönetim kurulu brifingini oluştur"}</button>
        <ToolScopeNote lang={lang}/>
      </form> : <article className="board-memo" aria-live="polite">
        <header><div><span className="eyebrow">{isEn ? "PRELIMINARY BOARD MEMO · USER-ENTERED" : "ÖN YÖNETİM KURULU NOTU · KULLANICI GİRDİSİ"}</span><h2>{isEn ? "Decision memorandum" : "Karar notu"}</h2></div><small>{isEn ? "Prepared for structured discussion" : "Yapılandırılmış görüşme için hazırlandı"}</small></header>
        <section className="board-decision"><span>{isEn ? "DECISION REQUIRED" : "GEREKLİ KARAR"}</span><h3>{brief.decision}</h3></section>
        <section className="board-recommendation"><span>{isEn ? "MANAGEMENT RECOMMENDATION" : "YÖNETİM ÖNERİSİ"}</span><p>{brief.recommendation}</p></section>
        <div className="board-memo-grid">{labels.slice(2).map(([key, label]) => <section key={key}><span>{label}</span><p>{brief[key] || (isEn ? "Not yet stated." : "Henüz belirtilmedi.")}</p></section>)}</div>
        <div className="result-actions">
          <SaveControl lang={lang} item={{ id: "board-brief-result", title: brief.decision, type: isEn ? "Board brief" : "Yönetim kurulu brifingi", href: `/${lang}/${m.boardBriefBuilder}` }}/>
          <button type="button" onClick={() => window.print()}>{isEn ? "Export / print PDF" : "Dışa aktar / PDF yazdır"}</button>
          <a href={`mailto:?subject=${encodeURIComponent(isEn ? "Preliminary board decision memo" : "Ön yönetim kurulu karar notu")}&body=${encodeURIComponent(emailBody)}`}>{isEn ? "Email to myself" : "Kendime e-posta gönder"}</a>
          <HandoffLink lang={lang} data={{tool:"Board Brief Builder",decision:brief.decision,context:brief.recommendation+"\n"+brief.evidence}}>{isEn ? "Review this decision with Ganrich" : "Bu kararı Ganrich ile değerlendirin"}</HandoffLink>
          <button type="button" onClick={() => setGenerated(false)}>{isEn ? "Edit inputs" : "Girdileri düzenle"}</button>
        </div>
        {complete && <ToolScopeNote lang={lang}/>}
      </article>}
    </section>
  </>;
}

export function AIValueLensPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const dimensions = isEn ? [
    ["Decision value", "How materially could a better decision or workflow improve performance?"],
    ["Repeatability", "How frequently does this decision or workflow recur?"],
    ["Data readiness", "How usable, governed, and representative is the required data?"],
    ["Adoption readiness", "How ready are process owners and users to change the work?"],
    ["Risk controllability", "How well can error, bias, security, and accountability risks be controlled?"],
  ] : [
    ["Karar değeri", "Daha iyi bir karar veya iş akışı performansı ne ölçüde geliştirebilir?"],
    ["Tekrarlanabilirlik", "Bu karar veya iş akışı ne sıklıkta tekrar ediyor?"],
    ["Veri hazırlığı", "Gerekli veri ne ölçüde kullanılabilir, yönetişim altında ve temsil edici?"],
    ["Benimseme hazırlığı", "Süreç sahipleri ve kullanıcılar çalışma biçimini değiştirmeye ne kadar hazır?"],
    ["Risk kontrolü", "Hata, önyargı, güvenlik ve hesap verebilirlik riskleri ne ölçüde kontrol edilebilir?"],
  ];
  const [useCase, setUseCase] = useState("");
  const [scores, setScores] = useState([50, 50, 50, 50, 50]);
  const [result, setResult] = useState(false);
  const weights = [30, 20, 20, 15, 15];
  const total = Math.round(scores.reduce((sum, value, index) => sum + value * weights[index], 0) / 100);
  const interpretation = total >= 70
    ? (isEn ? ["PRIORITIZE A CONTROLLED TEST", "The assumptions indicate a credible candidate for a bounded test with an explicit baseline, decision owner, and stopping rule."] : ["KONTROLLÜ TESTİ ÖNCELİKLENDİRİN", "Varsayımlar; açık bir başlangıç ölçümü, karar sahibi ve durdurma kuralıyla sınırlı bir test için güvenilir bir aday olduğunu gösteriyor."])
    : total >= 50
      ? (isEn ? ["VALIDATE THE VALUE CASE", "Potential is visible, but one or more readiness conditions should be strengthened before committing to scale."] : ["DEĞER VAKASINI DOĞRULAYIN", "Potansiyel görünür durumda; ancak ölçek kararından önce bir veya daha fazla hazırlık koşulu güçlendirilmeli."])
      : (isEn ? ["STRENGTHEN THE FOUNDATIONS", "The current assumptions do not yet support prioritization. Clarify the decision, data, operating change, or risk controls first."] : ["TEMELLERİ GÜÇLENDİRİN", "Mevcut varsayımlar henüz önceliklendirmeyi desteklemiyor. Önce kararı, veriyi, işletim değişikliğini veya risk kontrollerini netleştirin."]);

  useEffect(() => { window.history.replaceState(null, "", window.location.pathname); }, []);
  return <>
    <IntelligenceHero label={isEn ? "AI VALUE LENS" : "YAPAY ZEKÂ DEĞER MERCEĞİ"} title={isEn ? "Begin with value. Test readiness. Keep judgment accountable." : "Değerle başlayın. Hazırlığı sınayın. Muhakemeyi sorumlu tutun."} intro={isEn ? "Assess one use case as an operating decision—not as a technology demonstration. The result is directional and based only on your assumptions." : "Bir kullanım alanını teknoloji gösterisi olarak değil, işletim kararı olarak değerlendirin. Sonuç yön göstericidir ve yalnızca sizin varsayımlarınıza dayanır."}/>
<ToolIntro lang={lang} time={isEn ? "About 3–5 minutes" : "Yaklaşık 3–5 dakika"} output={isEn ? "A directional value and readiness profile" : "Yön gösterici değer ve hazırlık profili"} onExample={()=>{setUseCase(isEn?"Illustrative production exception triage":"Temsili üretim istisnası değerlendirmesi");setScores([80,75,40,55,60]);setResult(true);}} onClear={()=>{setUseCase("");setScores([50,50,50,50,50]);setResult(false);}}/>
    <section className="ai-lens section">
      <div className="ai-lens-input">
        <header><span className="eyebrow">{isEn ? "USE-CASE ASSESSMENT" : "KULLANIM ALANI DEĞERLENDİRMESİ"}</span><h2>{isEn ? "Make the value logic explicit." : "Değer mantığını görünür kılın."}</h2></header>
        <label className="use-case-name">{isEn ? "Decision or workflow to assess" : "Değerlendirilecek karar veya iş akışı"}<input value={useCase} onChange={(event) => setUseCase(event.target.value)} minLength={3} maxLength={160} placeholder={isEn ? "e.g. production scheduling exception decisions" : "ör. üretim planlaması istisna kararları"}/></label>
        <p className="tool-meta">{isEn ? "Illustrative weighted index: value 30%, repeatability 20%, data 20%, adoption 15%, risk control 15%. Thresholds of 50 and 70 organize discussion; they are not a validated diagnostic." : "Temsili ağırlıklı endeks: değer %30, tekrarlanabilirlik %20, veri %20, benimseme %15, risk kontrolü %15. 50 ve 70 eşikleri görüşmeyi yapılandırır; doğrulanmış tanı ölçütü değildir."}</p><div className="lens-dimensions">{dimensions.map(([label, hint], index) => <label key={label}><span>{label}</span><small>{hint}</small><input type="range" min="0" max="100" value={scores[index]} onChange={(event) => setScores(scores.map((score, scoreIndex) => scoreIndex === index ? Number(event.target.value) : score))}/><output>{scores[index]}</output></label>)}</div>
        <button className="button" type="button" disabled={useCase.trim().length < 3} onClick={() => setResult(true)}>{isEn ? "Assess the use case" : "Kullanım alanını değerlendir"}</button>
      </div>
      {result && <div className="ai-lens-result" aria-live="polite">
        <header><div><span className="eyebrow">{isEn ? "DIRECTIONAL · USER-ENTERED ASSUMPTIONS" : "YÖN GÖSTERİCİ · KULLANICI VARSAYIMLARI"}</span><h2>{useCase}</h2></div><output>{total}<small>/ 100</small></output></header>
        <section className="lens-interpretation"><span>{interpretation[0]}</span><p>{interpretation[1]}</p></section>
        <div className="lens-profile">{dimensions.map(([label], index) => <div key={label}><strong>{label}</strong><i><span style={{ width: `${scores[index]}%` }}/></i><output>{scores[index]}</output></div>)}</div>
        <section className="lens-next"><span>{isEn ? "NEXT EVIDENCE TO BUILD" : "OLUŞTURULACAK SONRAKİ KANIT"}</span><p>{isEn ? "Define the baseline, denominator, decision owner, affected workflow, adoption requirement, risk controls, and a stopping rule before any scale decision." : "Herhangi bir ölçek kararından önce başlangıç ölçümünü, paydayı, karar sahibini, etkilenen iş akışını, benimseme gereksinimini, risk kontrollerini ve durdurma kuralını tanımlayın."}</p></section>
        <div className="result-actions">
          <SaveControl lang={lang} item={{ id: "ai-value-lens-result", title: useCase, type: isEn ? "AI value assessment" : "Yapay zekâ değer değerlendirmesi", href: `/${lang}/${m.aiValueLens}` }}/>
          <button type="button" onClick={() => window.print()}>{isEn ? "Export / print" : "Dışa aktar / yazdır"}</button>
          <HandoffLink lang={lang} data={{tool:"AI Value Lens",decision:useCase,context:`${interpretation[0]} · ${total}/100`,interest:expertise[lang][3][0]}}>{isEn ? "Review this decision with Ganrich" : "Bu kararı Ganrich ile değerlendirin"}</HandoffLink>
        </div>
        <ToolScopeNote lang={lang}/>
      </div>}
    </section>
  </>;
}

export function DecisionLabChangelogPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const live = isEn ? [
    ["Decision Atlas", "URL-persistent decision, region, urgency, and maturity pathway."],
    ["Decision Framer", "Validated five-step framing, private inputs, print export, and explicit board-brief handoff."],
    ["Market Entry Compass", "Validated weights, private assumptions, comparison export, and contextual handoff."],
    ["Board Brief Builder", "One-page decision memorandum with export, save, and email actions."],
    ["AI Value Lens", "Directional value-readiness profile with an explicit evidence-building next step."],
  ] : [
    ["Karar Atlası", "URL üzerinden kalıcı karar, coğrafya, aciliyet ve olgunluk yolu."],
    ["Karar Çerçeveleyici", "Doğrulamalı beş adım, özel girdiler, yazdırma ve yönetim kurulu brifingi aktarımı."],
    ["Pazara Giriş Pusulası", "Doğrulamalı ağırlıklar, özel varsayımlar, karşılaştırma çıktısı ve bağlamsal aktarım."],
    ["Yönetim Kurulu Brifingi Oluşturucu", "Dışa aktarma, kaydetme ve e-posta eylemleriyle tek sayfalık karar notu."],
    ["Yapay Zekâ Değer Merceği", "Açık kanıt oluşturma adımıyla yön gösterici değer-hazırlık profili."],
  ];
  const evaluating = isEn ? ["Scenario Studio", "Transformation Pulse", "Operating Model Lens", "Portfolio Prioritizer"] : ["Senaryo Stüdyosu", "Dönüşüm Nabzı", "İşletim Modeli Merceği", "Portföy Önceliklendirme Aracı"];
  return <>
    <IntelligenceHero label={isEn ? "DECISION LAB CHANGELOG" : "KARAR LABORATUVARI DEĞİŞİKLİK GÜNLÜĞÜ"} title={isEn ? "What is live. What changed. What remains under evaluation." : "Neler yayında. Neler değişti. Neler değerlendirmede."} intro={isEn ? "A plain record of the Decision Lab’s current capabilities and limits." : "Karar Laboratuvarının mevcut yetkinlikleri ve sınırlarına ilişkin açık kayıt."}/>
    <section className="lab-changelog section">
      <header><span className="eyebrow">{isEn ? "CURRENT RELEASE · 24 JULY 2026" : "MEVCUT SÜRÜM · 24 TEMMUZ 2026"}</span><h2>{isEn ? "Five live tools, connected to one decision pathway." : "Tek karar yoluna bağlı beş canlı araç."}</h2></header>
      <ol>{live.map(([title, body], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
      <div className="roadmap-record"><span className="eyebrow">{isEn ? "UNDER EVALUATION · NO COMMITTED RELEASE DATE" : "DEĞERLENDİRMEDE · TAAHHÜT EDİLMİŞ TARİH YOK"}</span>{evaluating.map((item) => <p key={item}>{item}<small>{isEn ? "Scope and evidence standard under review" : "Kapsam ve kanıt standardı inceleniyor"}</small></p>)}</div>
      <a className="button outline" href={`/${lang}/${m.decisionLab}`}>{isEn ? "Return to Decision Lab" : "Karar Laboratuvarına dön"}</a>
    </section>
  </>;
}

export function InsightExperiencePage({ lang, index = 0 }: { lang: Lang; index?: number }) {
  const isEn = lang === "en";
  const article = insightArticles[lang][index] ?? insightArticles[lang][0];
  const href = insightHref(lang, index);
  const m = routeMap[lang];
  const [mode, setMode] = useState("executive");
  const [challenge, setChallenge] = useState(false);
  const [region, setRegion] = useState(0);
  const [sources, setSources] = useState(false);
  const sourceDrawer = useRef<HTMLElement>(null);
  const sourceCloseButton = useRef<HTMLButtonElement>(null);
  const sourceInvoker = useRef<HTMLElement | null>(null);
  useEffect(() => { if (!optionalPreferencesEnabled()) return; const saved = localStorage.getItem("ganrich-reading-mode"); if (saved) queueMicrotask(() => setMode(saved)); }, []);
  useEffect(() => {
    if (!sources) return;
    sourceCloseButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      keepModalFocus(event, sourceDrawer.current);
      if (event.key === "Escape") {
        setSources(false);
        window.setTimeout(() => sourceInvoker.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sources]);
  const changeMode = (next: string) => { setMode(next); if (optionalPreferencesEnabled()) localStorage.setItem("ganrich-reading-mode", next); };
  const openSources = (event: React.MouseEvent<HTMLElement>) => {
    sourceInvoker.current = event.currentTarget;
    setSources(true);
  };
  const closeSources = () => {
    setSources(false);
    window.setTimeout(() => sourceInvoker.current?.focus(), 0);
  };
  const modes = isEn ? [["brief", "90-Second View"], ["executive", "Executive View"], ["full", "Full Analysis"], ["evidence", "Evidence View"]] : [["brief", "90 Saniyelik Bakış"], ["executive", "Yönetici Görünümü"], ["full", "Tam Analiz"], ["evidence", "Kanıt Görünümü"]];
  return (
    <article className={`article intelligence-article mode-${mode}`}>
      <header><p className="meta">{article.type} · {article.region} · <time dateTime={article.date}>{article.dateLabel}</time> · {article.author}</p><h1>{article.title}</h1><p>{article.thesis}</p><div><span>{article.readingTime}</span><span>{isEn ? "English and Turkish" : "Türkçe ve İngilizce"}</span></div><SaveControl lang={lang} item={{ id: `insight-${article.slug}`, title: article.title, type: isEn ? "Insight" : "İçgörü", href }}/></header>
      <nav className="reading-modes" aria-label={isEn ? "Reading modes" : "Okuma modları"}>{modes.map((item) => <button className={mode === item[0] ? "active" : ""} key={item[0]} onClick={() => changeMode(item[0])}>{item[1]}</button>)}</nav>
      <div className="article-body"><aside><strong>{isEn ? "In this perspective" : "Bu bakışta"}</strong><a href="#thesis">{isEn ? "Executive thesis" : "Yönetici tezi"}</a><a href="#findings">{isEn ? "Key findings" : "Temel bulgular"}</a><a href="#analysis">{isEn ? "Full analysis" : "Tam analiz"}</a><a href="#leaders">{isEn ? "Board questions" : "Yönetim kurulu soruları"}</a><a href="#method">{isEn ? "Sources and method" : "Kaynaklar ve yöntem"}</a></aside><div>
        <section className="method"><strong>{isEn ? "Use this when…" : "Şu durumda kullanın…"}</strong><p>{article.applicability}</p></section>
        <section id="thesis"><span className="eyebrow">{isEn ? "EXECUTIVE THESIS" : "YÖNETİCİ TEZİ"}</span><h2>{article.thesis}</h2>{article.analysis.slice(0, mode === "brief" ? 1 : mode === "executive" ? 2 : article.analysis.length).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
        {mode !== "brief" && <section id="findings"><span className="eyebrow">{isEn ? "THREE DISTINCTIONS" : "ÜÇ AYRIM"}</span>{article.findings.map((finding, findingIndex) => <div className="finding" key={finding[0]}><span>0{findingIndex + 1}</span><h3>{finding[0]}</h3><p>{finding[1]}</p></div>)}</section>}
        {(mode === "full" || mode === "evidence") && <figure className="evidence-chart"><figcaption><strong>{article.frameworkTitle}</strong><span>{isEn ? "Illustrative framework · no external data" : "Açıklayıcı çerçeve · haricî veri içermez"}</span></figcaption><div>{article.framework.map((step, stepIndex) => <span key={step}>0{stepIndex + 1} {step}</span>)}</div><button type="button" className="source-link" onClick={openSources}>{isEn ? "Sources and methodology" : "Kaynaklar ve yöntem"}</button><SaveControl lang={lang} item={{ id: `framework-${article.slug}`, title: article.frameworkTitle, type: isEn ? "Framework" : "Çerçeve", href: `${href}#method` }}/></figure>}
        {(mode === "full" || mode === "evidence") && <section id="analysis" className="article-sections"><span className="eyebrow">{isEn ? "FULL ANALYSIS" : "TAM ANALİZ"}</span>{article.sections.map((section, sectionIndex) => <section key={section.title}><span>0{sectionIndex + 1}</span><div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</section>}
        <section id="leaders" className="leader-meaning"><span className="eyebrow">{isEn ? "QUESTIONS THIS RAISES FOR YOUR BOARD" : "YÖNETİM KURULUNUZ İÇİN ORTAYA ÇIKAN SORULAR"}</span><h2>{isEn ? "Make the next leadership choice explicit." : "Bir sonraki liderlik tercihini açık hâle getirin."}</h2><ul>{article.boardQuestions.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section className="related-tool"><span className="eyebrow">{isEn ? "RELATED DECISION TOOL" : "İLGİLİ KARAR ARACI"}</span><h2>{article.relatedToolLabel}.</h2><a href={`/${lang}/${m[article.relatedTool]}`}>{isEn ? "Open the tool" : "Aracı açın"} <span aria-hidden="true">↗</span></a></section>
        <section className="critical-review"><button type="button" onClick={() => setChallenge(!challenge)} aria-expanded={challenge}><span>{isEn ? "CRITICAL REVIEW" : "ELEŞTİREL İNCELEME"}</span><strong>{isEn ? "Challenge this view" : "Bu görüşü sorgula"}</strong><i>{challenge ? "−" : "+"}</i></button>{challenge && <div><section><span>{isEn ? "STRONGEST COUNTERARGUMENT" : "EN GÜÇLÜ KARŞI GÖRÜŞ"}</span><p>{article.counterargument}</p></section><section><span>{isEn ? "EVIDENCE THAT WOULD WEAKEN THE THESIS" : "TEZİ ZAYIFLATACAK KANIT"}</span><p>{article.weakeningEvidence}</p></section></div>}</section>
        <section className="region-lens"><span className="eyebrow">{isEn ? "VIEW IMPLICATIONS BY REGION" : "BÖLGESEL ÇIKARIMLARI GÖRÜNTÜLEYİN"}</span><div role="tablist" aria-label={isEn ? "Regional implications" : "Bölgesel çıkarımlar"}>{markets[lang].map((market, i) => <button id={`article-region-tab-${i}`} role="tab" aria-selected={region === i} aria-controls="article-region-panel" tabIndex={region === i ? 0 : -1} onKeyDown={(event) => moveTab(event, i, markets[lang].length, setRegion)} onClick={() => setRegion(i)} key={market[0]}>{market[0]}</button>)}</div><div id="article-region-panel" role="tabpanel" aria-labelledby={`article-region-tab-${region}`} tabIndex={0}><p>{isEn ? "The relevant operating context, institutional constraints, data availability, and adoption capacity may differ. No region-specific conclusion is asserted without approved supporting content." : "İlgili işletim bağlamı, kurumsal kısıtlar, veri kullanılabilirliği ve benimseme kapasitesi farklılaşabilir. Onaylı destekleyici içerik olmadan bölgeye özgü sonuç ileri sürülmez."}</p><strong>{isEn ? "Question for local validation" : "Yerel doğrulama sorusu"}</strong><p>{isEn ? `Which assumptions about decision rights and data readiness do not transfer cleanly to ${markets[lang][region][0]}?` : `Karar hakları ve veri hazırlığına ilişkin hangi varsayımlar ${markets[lang][region][0]} bağlamına doğrudan taşınamaz?`}</p></div></section>
        <section id="method" className="method"><strong>{isEn ? "Method and content status" : "Yöntem ve içerik durumu"}</strong><p>{article.methodology}</p><button className="source-link" type="button" onClick={openSources}>{isEn ? "Sources and methodology" : "Kaynaklar ve yöntem"}</button></section>
      </div></div>
      {sources && <div className="provenance-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && closeSources()}><aside ref={sourceDrawer} className="provenance-drawer" role="dialog" aria-modal="true" aria-labelledby="provenance-title"><button ref={sourceCloseButton} type="button" onClick={closeSources} aria-label={isEn ? "Close sources" : "Kaynakları kapat"}>×</button><span className="eyebrow">{isEn ? "SOURCES AND METHODOLOGY" : "KAYNAKLAR VE YÖNTEM"}</span><h2 id="provenance-title">{isEn ? "Provenance record" : "Kaynak kaydı"}</h2><dl><div><dt>{isEn ? "Source basis" : "Kaynak temeli"}</dt><dd>{article.source}</dd></div>{article.sources.map((source) => <div key={source.label}><dt>{source.label}</dt><dd>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.note} <span aria-hidden="true">↗</span></a> : source.note}</dd></div>)}<div><dt>{isEn ? "Data period" : "Veri dönemi"}</dt><dd>{article.dataPeriod}</dd></div><div><dt>{isEn ? "Definition" : "Tanım"}</dt><dd>{article.frameworkTitle}</dd></div><div><dt>{isEn ? "Method" : "Yöntem"}</dt><dd>{article.methodology}</dd></div><div><dt>{isEn ? "Confidence" : "Güven düzeyi"}</dt><dd>{article.confidence}</dd></div><div><dt>{isEn ? "Last review" : "Son inceleme"}</dt><dd>{article.dateLabel}</dd></div></dl></aside></div>}
      <section className="cta-band compact-band"><h2>{isEn ? "Move from this perspective to your specific decision." : "Bu perspektiften kurumunuza özgü karara geçin."}</h2><p>{isEn ? "A prepared conversation grounded in the issue, evidence, and choice on your agenda." : "Gündeminizdeki konuya, kanıta ve tercihe dayalı hazırlıklı bir görüşme."}</p><a className="button light" href={`/${lang}/${m.contact}?service=briefing`}>{isEn ? "Request a private briefing" : "Özel brifing talep edin"}</a></section>
    </article>
  );
}

export function PrivateBriefingPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const formats = isEn ? ["Executive call", "Leadership-team briefing", "Board discussion", "Private roundtable", "Strategy workshop", "Market-entry review", "AI value workshop", "Transformation pulse review"] : ["Yönetici görüşmesi", "Liderlik ekibi brifingi", "Yönetim kurulu görüşmesi", "Özel yuvarlak masa", "Strateji çalıştayı", "Pazara giriş değerlendirmesi", "Yapay zekâ değer çalıştayı", "Dönüşüm nabzı değerlendirmesi"];
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, kind: "briefing", language: lang, source: `/${lang}/${routeMap[lang].privateBriefing}` }),
      });
      const result = await response.json() as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Submission failed");
      setStatus("sent");
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : (isEn ? "The request could not be sent." : "Talep gönderilemedi."));
      setStatus("error");
    }
  };
  return (
    <>
      <IntelligenceHero label={isEn ? "PRIVATE EXECUTIVE BRIEFING" : "ÖZEL YÖNETİCİ BRİFİNGİ"} title={isEn ? "Move from a published perspective to your specific decision." : "Yayımlanmış bir perspektiften kurumunuza özgü karara geçin."} intro={isEn ? "A serious, prepared executive discussion—not a promotional consultation." : "Promosyon amaçlı bir danışmanlık görüşmesi değil; ciddi ve hazırlıklı bir yönetici görüşmesi."}/>
      <section className="briefing-request">
        <div><span className="eyebrow">{isEn ? "HOW THE CONVERSATION BEGINS" : "GÖRÜŞME NASIL BAŞLAR"}</span><h2>{isEn ? "Bring the decision, the evidence, and the tension." : "Kararı, kanıtı ve gerilimi birlikte ele alalım."}</h2><ol><li><span>01</span>{isEn ? "You share the context without restricted material." : "Kısıtlı materyal paylaşmadan bağlamı aktarırsınız."}</li><li><span>02</span>{isEn ? "Ganrich reviews the decision and prepares the relevant questions." : "Ganrich kararı inceler ve ilgili sorulara hazırlanır."}</li><li><span>03</span>{isEn ? "The discussion focuses on choices, evidence, and next action." : "Görüşme tercihlere, kanıta ve sonraki uygulamaya odaklanır."}</li></ol></div>
        {status === "sent" ? <div className="form-success" role="status"><span>✓</span><h2>{isEn ? "Your briefing request has been received." : "Brifing talebiniz alındı."}</h2><p>{isEn ? "We will review the decision context before responding. Please do not send confidential material by email at this stage." : "Yanıt vermeden önce karar bağlamını inceleyeceğiz. Bu aşamada e-posta ile gizli materyal göndermeyin."}</p></div> : <form onSubmit={submit}><label>{isEn ? "What decision is being considered?" : "Hangi karar değerlendiriliyor?"}<textarea name="decision" minLength={15} required/></label><label>{isEn ? "Why is it on the agenda now?" : "Bu karar neden şimdi gündemde?"}<textarea name="context" minLength={30} required/></label><label>{isEn ? "Organization" : "Kurum"}<input name="organization" autoComplete="organization" required/></label><label>{isEn ? "Region" : "Coğrafya"}<select name="region" defaultValue="" required><option value="" disabled>{isEn ? "Select a region" : "Bir coğrafya seçin"}</option>{markets[lang].map((market) => <option key={market[0]}>{market[0]}</option>)}</select></label><label>{isEn ? "Preferred discussion format" : "Tercih edilen görüşme biçimi"}<select name="interest" defaultValue="" required><option value="" disabled>{isEn ? "Select a format" : "Bir format seçin"}</option>{formats.map((format) => <option key={format}>{format}</option>)}</select></label><label>{isEn ? "Which stakeholders are involved?" : "Hangi paydaşlar sürece dahil?"}<input name="role"/></label><label>{isEn ? "Name" : "Ad Soyad"}<input name="name" autoComplete="name" minLength={2} required/></label><label>{isEn ? "Work email" : "İş e-postası"}<input name="email" type="email" autoComplete="email" required/></label><label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label><label className="marketing-choice"><input name="privacyAcknowledged" type="checkbox" value="yes" required/><span>{isEn ? "I have read the privacy notice and understand how this request will be handled." : "Gizlilik bildirimini okudum ve bu talebin nasıl işleneceğini anladım."}</span></label><p className="jit-notice">{isEn ? "Your details are stored securely to review and respond to this request. Do not include confidential, restricted, or sensitive data." : "Bilgileriniz bu talebi incelemek ve yanıtlamak amacıyla güvenli biçimde saklanır. Gizli, kısıtlı veya hassas bilgi eklemeyin."} <a href={`/${lang}/${routeMap[lang].privacy}`}>{isEn ? "Privacy notice" : "Gizlilik bildirimi"}</a></p>{status === "error" && <p className="form-error" role="alert">{message} <a href="mailto:furkangul@ganrichadvisory.com">{isEn ? "Use direct email." : "Doğrudan e-posta kullanın."}</a></p>}<button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? (isEn ? "Sending…" : "Gönderiliyor…") : (isEn ? "Request the briefing" : "Brifing talep edin")}</button></form>}
      </section>
    </>
  );
}
