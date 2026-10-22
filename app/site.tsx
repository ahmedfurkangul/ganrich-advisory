"use client";

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnalyticsBridge } from "./analytics";
import { insightArticles, insightCategories, insightCategoryForKind, insightHref, insightIndex, insights, Lang, pageKind, routeMap, switchHref } from "./content";
import { BriefingTray, HeaderExplore } from "./intelligence-shell";
import { engagementSummaries as engagements, firstConversation, founder } from "./practice-core";
import { External, Go, NextStep, PracticeHero } from "./practice-ui";
import { PdfInsightHubCards } from "./pdf-insight-cards";
import { openCookiePreferences, PrivacyControls } from "./privacy-controls";

type SiteProps = { lang: Lang; route: string };

const DecisionLabPage = lazy(() => import("./intelligence").then((module) => ({ default: module.DecisionLabPage })));
const DecisionAtlasPage = lazy(() => import("./intelligence").then((module) => ({ default: module.DecisionAtlasPage })));
const DecisionFramerPage = lazy(() => import("./intelligence").then((module) => ({ default: module.DecisionFramerPage })));
const MarketCompassPage = lazy(() => import("./intelligence").then((module) => ({ default: module.MarketCompassPage })));
const BoardBriefBuilderPage = lazy(() => import("./intelligence").then((module) => ({ default: module.BoardBriefBuilderPage })));
const AIValueLensPage = lazy(() => import("./intelligence").then((module) => ({ default: module.AIValueLensPage })));
const DecisionLabChangelogPage = lazy(() => import("./intelligence").then((module) => ({ default: module.DecisionLabChangelogPage })));
const InsightExperiencePage = lazy(() => import("./intelligence").then((module) => ({ default: module.InsightExperiencePage })));
const PrivateBriefingPage = lazy(() => import("./intelligence").then((module) => ({ default: module.PrivateBriefingPage })));
const PrivacyCenterPage = lazy(() => import("./privacy-center").then((module) => ({ default: module.PrivacyCenterPage })));
const CookiePreferencesPage = lazy(() => import("./privacy-center").then((module) => ({ default: module.CookiePreferencesPage })));
const TrustContentPage = lazy(() => import("./privacy-center").then((module) => ({ default: module.TrustContentPage })));

const ui = {
  en: {
    skip: "Skip to content", cta: "Start a conversation", read: "Read the perspective",
    nav: [["expertise", "Expertise"], ["howWeWork", "How we work"], ["insights", "Insights"], ["decisionLab", "Decision Lab"], ["about", "About"]] as Array<[string, string]>,
  },
  tr: {
    skip: "İçeriğe geç", cta: "Görüşme başlatın", read: "Bakışı okuyun",
    nav: [["expertise", "Uzmanlık"], ["howWeWork", "Çalışma biçimimiz"], ["insights", "İçgörüler"], ["decisionLab", "Karar Laboratuvarı"], ["about", "Hakkımızda"]] as Array<[string, string]>,
  },
} as const;

function Wordmark() {
  return <span className="wordmark"><Image src="/brand/ganrich-advisory-threshold.png" width={1260} height={260} alt="Ganrich Advisory" priority unoptimized/></span>;
}

function navKindFor(kind: string) {
  if (kind.startsWith("service") || kind === "expertise") return "expertise";
  if (kind.startsWith("article") || kind.startsWith("category") || kind === "insights") return "insights";
  if (kind.startsWith("decision") || ["marketCompass", "boardBriefBuilder", "aiValueLens"].includes(kind)) return "decisionLab";
  return kind;
}

function Header({ lang, route }: SiteProps) {
  const [open, setOpen] = useState(false);
  const t = ui[lang]; const m = routeMap[lang];
  const current = navKindFor(pageKind(lang, route));
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    document.querySelector<HTMLAnchorElement>("#primary-nav a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
  return <header className="gh">
    <a className="gh-brand" href={`/${lang}`} aria-label={lang === "en" ? "Ganrich Advisory — home" : "Ganrich Advisory — ana sayfa"}><Wordmark/></a>
    <nav id="primary-nav" className={open ? "gh-nav open" : "gh-nav"} aria-label={lang === "en" ? "Primary" : "Ana menü"}>
      {t.nav.map(([key, label]) => <a key={key} href={`/${lang}/${m[key]}`} aria-current={current === key ? "page" : undefined}>{label}</a>)}
      <a className="gh-nav-contact" href={`/${lang}/${m.contact}`}>{t.cta}</a>
    </nav>
    <div className="gh-actions">
      <HeaderExplore lang={lang}/>
      <a className="gh-language" data-analytics-event="language_switched" href={switchHref(lang, route)} hrefLang={lang === "en" ? "tr" : "en"} onClick={() => { try { localStorage.setItem("ganrich-language", lang === "en" ? "tr" : "en"); } catch { /* storage unavailable */ } }} aria-label={lang === "en" ? "Türkçe sürüme geç" : "Switch to English"}><span className={lang === "en" ? "active" : ""}>EN</span><i aria-hidden="true">/</i><span className={lang === "tr" ? "active" : ""}>TR</span></a>
      <a className="button compact gh-cta" data-analytics-event="contact_started" href={`/${lang}/${m.contact}`}>{lang === "en" ? "Contact" : "İletişim"}</a>
      <button ref={menuButton} className="gh-menu" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? (lang === "en" ? "Close" : "Kapat") : (lang === "en" ? "Menu" : "Menü")}</button>
    </div>
  </header>;
}

function Footer({ lang }: { lang: Lang }) {
  const t = ui[lang]; const m = routeMap[lang]; const isEn = lang === "en";
  return <footer className="footer">
    <div className="footer-lead"><Wordmark/><p>{isEn ? "Founder-led strategy advice for established companies in Türkiye: expansion, operating models and AI value." : "Türkiye’deki köklü şirketler için kurucu liderliğinde strateji danışmanlığı: büyüme, işletim modeli ve yapay zekâ değeri."}</p></div>
    <div className="footer-links">
      <div><span>{isEn ? "Engagements" : "Çalışma biçimleri"}</span>{engagements[lang].map((item) => <a key={item.key} href={`/${lang}/${m[item.key]}`}>{item.name}</a>)}</div>
      <div><span>{isEn ? "Practice" : "Danışmanlık"}</span>{t.nav.map(([key, label]) => <a key={key} href={`/${lang}/${m[key]}`}>{label}</a>)}<a href={`/${lang}/${m.markets}`}>{isEn ? "Türkiye → Gulf" : "Türkiye → Körfez"}</a></div>
      <div><span>{isEn ? "Contact" : "İletişim"}</span><a href={`/${lang}/${m.contact}`}>{t.cta}</a><a href={`mailto:${founder.email}`}>{founder.email}</a><a href={founder.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></div>
    </div>
    <nav className="footer-trust-links" aria-label={isEn ? "Privacy and legal" : "Gizlilik ve hukuk"}>
      <a href={`/${lang}/${m.privacyCenter}`}>{isEn ? "Privacy center" : "Gizlilik merkezi"}</a>
      <a href={`/${lang}/${m.privacy}`}>{isEn ? "Privacy" : "Gizlilik"}</a>
      <a href={`/${lang}/${m.kvkk}`}>KVKK</a>
      <a href={`/${lang}/${m.cookies}`}>{isEn ? "Cookies" : "Çerezler"}</a>
      <button type="button" onClick={openCookiePreferences}>{isEn ? "Cookie preferences" : "Çerez tercihleri"}</button>
      <a href={`/${lang}/${m.dataRights}`}>{isEn ? "Data rights" : "İlgili kişi hakları"}</a>
      <a href={`/${lang}/${m.aiTransparency}`}>{isEn ? "AI transparency" : "Yapay zekâ şeffaflığı"}</a>
      <a href={`/${lang}/${m.legal}`}>{isEn ? "Legal notice" : "Yasal bildirim"}</a>
      <a href={`/${lang}/feed.xml`}>RSS</a>
    </nav>
    <div className="footer-base"><p>© {new Date().getFullYear()} Ganrich Advisory</p><p>{isEn ? "Istanbul, Türkiye" : "İstanbul, Türkiye"}</p></div>
  </footer>;
}

export function SiteLayout({ lang, route, children }: SiteProps & { children: React.ReactNode }) {
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <><a className="skip" href="#content">{ui[lang].skip}</a><Header lang={lang} route={route}/><main id="content">{children}</main><BriefingTray lang={lang}/><Footer lang={lang}/><PrivacyControls lang={lang}/><AnalyticsBridge/></>;
}

function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <PracticeHero eyebrow={eyebrow} title={title} intro={intro}/>;
}

function InsightRow({ lang, index, number }: { lang: Lang; index: number; number: number }) {
  const article = insightArticles[lang][index];
  return <article className="p-pub">
    <span className="p-index">{String(number).padStart(2, "0")}</span>
    <div>
      <p className="meta">{article.type} · {article.topic} · <time dateTime={article.date}>{article.dateLabel}</time> · {article.readingTime}</p>
      <h2><a href={insightHref(lang, index)} data-analytics-event="insight_viewed">{article.title}</a></h2>
      <p>{article.thesis}</p>
      <p className="p-pub-for"><strong>{lang === "en" ? "Useful when" : "Ne zaman işe yarar"}</strong>{article.applicability}</p>
    </div>
  </article>;
}

function InsightsPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const indexed = useMemo(() => insights[lang].map((item, index) => ({ item, index })), [lang]);
  const list = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(lang === "en" ? "en-GB" : "tr-TR");
    return indexed.filter(({ item, index }) => {
      const matchesFilter = filter === "all" || item[2] === filter;
      const searchable = [...item, insightArticles[lang][index].applicability].join(" · ").toLocaleLowerCase(lang === "en" ? "en-GB" : "tr-TR");
      return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [filter, indexed, lang, query]);
  const featuredIndex = insightIndex("articleCorridor");
  const featured = insightArticles[lang][featuredIndex];
  const stance = isEn
    ? [["A point of view", "Each note takes a position on a decision leaders actually face, and says what would weaken it."], ["Opinion and evidence kept apart", "Founder judgment is labelled as such. Factual claims carry dated, linked sources."], ["Written to be used", "Every note ends with questions for your board and a tool or engagement to take it further."]]
    : [["Bir bakış açısı", "Her not, liderlerin gerçekten karşılaştığı bir karar hakkında görüş bildirir ve bu görüşü neyin zayıflatacağını söyler."], ["Görüş ve kanıt ayrı", "Kurucu yorumu açıkça belirtilir. Olgusal iddialar tarihli ve bağlantılı kaynaklarla verilir."], ["Kullanılmak için yazılır", "Her not yönetim kurulunuz için sorularla, ilerlemek için bir araç ya da çalışma biçimiyle biter."]];
  return <>
    <PageHero eyebrow={isEn ? "Insights · The Ganrich Brief" : "İçgörüler · Ganrich Bülteni"} title={isEn ? "Practice notes on expansion, operating models and AI value." : "Büyüme, işletim modeli ve yapay zekâ değeri üzerine notlar."} intro={isEn ? "Short, argued pieces by Ahmed Furkan Gul, written for owners and leadership teams who need to decide, not just stay informed. Published in English and Turkish." : "Ahmed Furkan Gul’un, yalnızca bilgilenmek değil karar vermek durumunda olan şirket sahipleri ve yönetim ekipleri için yazdığı kısa ve gerekçeli yazılar. Türkçe ve İngilizce yayımlanır."}/>
    <section className="p-section p-stance" aria-label={isEn ? "Editorial standards" : "Yayın ilkeleri"}><ul>{stance.map(([title, body]) => <li key={title}><strong>{title}</strong><p>{body}</p></li>)}</ul></section>
    <section className="p-section p-featured">
      <Label>{isEn ? "Featured briefing" : "Öne çıkan bülten"}</Label>
      <div><p className="meta">{featured.type} · {featured.region} · <time dateTime={featured.date}>{featured.dateLabel}</time></p><h2><a href={insightHref(lang, featuredIndex)}>{featured.title}</a></h2><p>{featured.thesis}</p><Go to={insightHref(lang, featuredIndex)} event="insight_viewed">{isEn ? "Read the briefing" : "Bülteni okuyun"}</Go></div>
    </section>
    <nav className="insight-taxonomy" aria-label={isEn ? "Insight categories" : "İçgörü kategorileri"}>{insightCategories[lang].map((category) => <a key={category.key} href={`/${lang}/${routeMap[lang][category.key]}`}>{category.label}</a>)}</nav>
    <section className="section filter-row" aria-label={isEn ? "Filter and search" : "Filtre ve arama"}><div role="group" aria-label={isEn ? "Filter by topic" : "Konuya göre filtrele"}><button type="button" aria-pressed={filter === "all"} className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>{isEn ? "All" : "Tümü"}</button>{[...new Set(insights[lang].map(x => x[2]))].map(x => <button type="button" aria-pressed={filter === x} className={filter === x ? "active" : ""} key={x} onClick={() => setFilter(x)}>{x}</button>)}</div><label><span>{isEn ? "Search" : "Ara"}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={isEn ? "Search insights" : "İçgörülerde ara"}/></label></section>
    <section className="p-section p-pubs" aria-live="polite">{list.length ? list.map(({ index }, displayIndex) => <InsightRow key={index} lang={lang} index={index} number={displayIndex + 1}/>) : <div className="insight-empty" role="status"><span className="eyebrow">{isEn ? "No matches" : "Eşleşme yok"}</span><h2>{isEn ? "No perspective matches this search." : "Bu aramayla eşleşen bir perspektif yok."}</h2><button type="button" className="text-link" onClick={() => { setFilter("all"); setQuery(""); }}>{isEn ? "Clear search" : "Aramayı temizleyin"}</button></div>}</section>
    <PdfInsightHubCards lang={lang}/>
    <NextStep lang={lang} title={isEn ? "Want to discuss one of these questions for your company?" : "Bu sorulardan birini şirketiniz için konuşmak ister misiniz?"}/>
  </>;
}

function InsightCategoryPage({ lang, kind }: { lang: Lang; kind: string }) {
  const isEn = lang === "en";
  const category = insightCategoryForKind(lang, kind);
  if (!category) return null;
  const articles = insightArticles[lang].map((article, index) => ({ article, index })).filter(({ article }) => article.topic === category.topic);
  return <>
    <PageHero eyebrow={isEn ? "Insights · Category" : "İçgörüler · Kategori"} title={`${category.label}.`} intro={category.description}/>
    <nav className="insight-taxonomy category-page" aria-label={isEn ? "Insight categories" : "İçgörü kategorileri"}>
      <a href={`/${lang}/${routeMap[lang].insights}`}>{isEn ? "All insights" : "Tüm içgörüler"}</a>
      {insightCategories[lang].map((item) => <a className={item.key === category.key ? "active" : ""} aria-current={item.key === category.key ? "page" : undefined} key={item.key} href={`/${lang}/${routeMap[lang][item.key]}`}>{item.label}</a>)}
    </nav>
    <section className="p-section p-pubs">{articles.length ? articles.map(({ index }, displayIndex) => <InsightRow key={index} lang={lang} index={index} number={displayIndex + 1}/>) : <p className="p-note">{isEn ? "No notes in this category yet." : "Bu kategoride henüz not yok."} <Go to={`/${lang}/${routeMap[lang].insights}`}>{isEn ? "All insights" : "Tüm içgörüler"}</Go></p>}</section>
    <NextStep lang={lang}/>
  </>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

type Handoff = { tool: string; summary: string };
export const HANDOFF_KEY = "ganrich-inquiry-handoff";

function ContactPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");
  const [handoff, setHandoff] = useState<Handoff | null>(null);
  const [details, setDetails] = useState(false);
  const privacyHref = `/${lang}/${routeMap[lang].privacy}`;
  const topics = [...engagements[lang].map((item) => [item.key, item.name]), ["other", isEn ? "Something else" : "Başka bir konu"]];
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("topic") ?? "";
    let stored: Handoff | null = null;
    try { const raw = sessionStorage.getItem(HANDOFF_KEY); if (raw) stored = JSON.parse(raw) as Handoff; } catch { stored = null; }
    queueMicrotask(() => {
      if (topics.some(([key]) => key === requested)) { setTopic(requested); setDetails(true); }
      if (stored?.summary) setHandoff({ tool: String(stored.tool).slice(0, 80), summary: String(stored.summary).slice(0, 1800) });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  const discardHandoff = () => { setHandoff(null); try { sessionStorage.removeItem(HANDOFF_KEY); } catch { /* storage unavailable */ } };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries()) as Record<string, string>;
    const topicName = topics.find(([key]) => key === payload.topic)?.[1] ?? "";
    const context = [payload.context, handoff && `${isEn ? "Context from" : "Bağlam"} ${handoff.tool}:\n${handoff.summary}`].filter(Boolean).join("\n\n");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, context, interest: topicName, kind: "contact", language: lang, source: `/${lang}/${routeMap[lang].contact}` }),
      });
      const result = await response.json().catch(() => ({})) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || (isEn ? "The message could not be sent." : "Mesaj gönderilemedi."));
      setStatus("sent");
      discardHandoff();
    } catch (caught) {
      setMessage(caught instanceof Error && caught.message !== "Failed to fetch" ? caught.message : (isEn ? "The message could not be sent. Your text is still here." : "Mesaj gönderilemedi. Yazdıklarınız silinmedi."));
      setStatus("error");
    }
  };
  return <>
    <PageHero eyebrow={isEn ? "Contact" : "İletişim"} title={isEn ? "Tell us what you are deciding." : "Ne üzerine karar verdiğinizi anlatın."} intro={isEn ? "A few lines are enough to start. Ahmed Furkan Gul reads every message and replies personally." : "Başlamak için birkaç satır yeterli. Ahmed Furkan Gul her mesajı okur ve bizzat yanıtlar."}/>
    <section className="p-contact">
      <div className="p-contact-side">
        <h2>{isEn ? "What happens next" : "Sonra ne olur"}</h2>
        <ol className="p-next-steps">{firstConversation[lang].map(([title, body], index) => <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol>
        <div className="p-contact-direct"><p>{isEn ? "Prefer email?" : "E-posta mı tercih edersiniz?"}</p><a className="text-link" href={`mailto:${founder.email}`}>{founder.email}</a><External to={founder.linkedin}>{isEn ? "Ahmed Furkan Gul on LinkedIn" : "LinkedIn’de Ahmed Furkan Gul"}</External></div>
      </div>
      {status === "sent" ? <div className="form-success" role="status" tabIndex={-1} ref={(node) => node?.focus()}><span aria-hidden="true">✓</span><h2>{isEn ? "Thank you. Your message has arrived." : "Teşekkürler. Mesajınız ulaştı."}</h2><p>{isEn ? "Ahmed Furkan Gul will read it and reply by email. Please do not send confidential documents until an engagement framework has been agreed." : "Ahmed Furkan Gul mesajınızı okuyup e-posta ile yanıtlayacak. Bir çalışma çerçevesi üzerinde anlaşılana kadar lütfen gizli belge göndermeyin."}</p><Go to={`/${lang}/${routeMap[lang].insights}`}>{isEn ? "Meanwhile, read the Ganrich Brief" : "Bu arada Ganrich Bülteni’ni okuyun"}</Go></div> : <form className="p-form" onSubmit={submit} noValidate={false}>
        <p className="p-form-note">{isEn ? "Required fields are marked *." : "Zorunlu alanlar * ile işaretlidir."}</p>
        <label>{isEn ? "Name *" : "Ad Soyad *"}<input name="name" autoComplete="name" minLength={2} maxLength={120} required/></label>
        <label>{isEn ? "Email *" : "E-posta *"}<input name="email" type="email" autoComplete="email" maxLength={254} required/></label>
        <label className="full">{isEn ? "What would you like to discuss? *" : "Neyi konuşmak istersiniz? *"}<span className="p-hint" id="context-hint">{isEn ? "Two or three sentences: the decision, and why it matters now. Leave out confidential detail." : "İki üç cümle: karar ve neden şimdi önemli olduğu. Gizli ayrıntıları eklemeyin."}</span><textarea name="context" minLength={20} maxLength={4000} required aria-describedby="context-hint"/></label>
        {handoff && <div className="p-handoff full" role="group" aria-label={isEn ? "Context carried from the tool" : "Araçtan aktarılan bağlam"}><div><strong>{isEn ? `Will be included: your ${handoff.tool} summary` : `Eklenecek: ${handoff.tool} özetiniz`}</strong><pre>{handoff.summary}</pre><small>{isEn ? "Kept only in this browser tab until you send or remove it." : "Gönderene ya da kaldırana kadar yalnızca bu tarayıcı sekmesinde tutulur."}</small></div><button type="button" onClick={discardHandoff}>{isEn ? "Remove" : "Kaldır"}</button></div>}
        <details className="p-optional full" open={details} onToggle={(event) => setDetails(event.currentTarget.open)}>
          <summary>{isEn ? "Add context (optional)" : "Bağlam ekleyin (isteğe bağlı)"}<span className="p-plus" aria-hidden="true">+</span></summary>
          <div className="p-optional-grid">
            <label>{isEn ? "Organisation" : "Kurum"}<input name="organization" autoComplete="organization" maxLength={180}/></label>
            <label>{isEn ? "Role" : "Görev"}<input name="role" autoComplete="organization-title" maxLength={140}/></label>
            <label>{isEn ? "Topic" : "Konu"}<select name="topic" value={topic} onChange={(event) => setTopic(event.target.value)}><option value="">{isEn ? "Not sure yet" : "Henüz emin değilim"}</option>{topics.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
            <label>{isEn ? "Markets involved" : "İlgili pazarlar"}<input name="region" maxLength={100} placeholder={isEn ? "e.g. Türkiye, UAE" : "ör. Türkiye, BAE"}/></label>
          </div>
        </details>
        <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
        <label className="marketing-choice full"><input name="privacyAcknowledged" type="checkbox" value="yes" required/><span>{isEn ? "I have read the privacy notice and understand how my inquiry will be handled. *" : "Gizlilik bildirimini okudum ve talebimin nasıl işleneceğini anladım. *"}</span></label>
        <p className="jit-notice full">{isEn ? "Your details are stored securely to review and respond to this inquiry, and are not used for marketing." : "Bilgileriniz bu talebi incelemek ve yanıtlamak amacıyla güvenli biçimde saklanır; pazarlama amacıyla kullanılmaz."} <a href={privacyHref}>{isEn ? "Read the privacy notice." : "Gizlilik bildirimini okuyun."}</a></p>
        {status === "error" && <p className="form-error full" role="alert">{message} <a href={`mailto:${founder.email}`}>{isEn ? "You can also email directly." : "Doğrudan e-posta da gönderebilirsiniz."}</a></p>}
        <button className="button" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>{status === "sending" ? (isEn ? "Sending…" : "Gönderiliyor…") : (isEn ? "Send message" : "Mesajı gönderin")}</button>
      </form>}
    </section>
  </>;
}

/* Practice pages (home, expertise, engagements, how we work, markets, about) are server-rendered and passed in as children. */
export default function Site({ lang, route, children }: SiteProps & { children?: React.ReactNode }) {
  const kind = pageKind(lang, route);
  let page: React.ReactNode = children ?? null;
  if (kind === "insights") page = <InsightsPage lang={lang}/>;
  if (kind.startsWith("category")) page = <InsightCategoryPage lang={lang} kind={kind}/>;
  if (kind.startsWith("article")) page = <InsightExperiencePage lang={lang} index={insightIndex(kind)}/>;
  if (kind === "decisionLab") page = <DecisionLabPage lang={lang}/>;
  if (kind === "decisionAtlas") page = <DecisionAtlasPage lang={lang}/>;
  if (kind === "decisionFramer") page = <DecisionFramerPage lang={lang}/>;
  if (kind === "marketCompass") page = <MarketCompassPage lang={lang}/>;
  if (kind === "boardBriefBuilder") page = <BoardBriefBuilderPage lang={lang}/>;
  if (kind === "aiValueLens") page = <AIValueLensPage lang={lang}/>;
  if (kind === "decisionLabChangelog") page = <DecisionLabChangelogPage lang={lang}/>;
  if (kind === "privateBriefing") page = <PrivateBriefingPage lang={lang}/>;
  if (kind === "contact") page = <ContactPage lang={lang}/>;
  if (kind === "privacyCenter") page = <PrivacyCenterPage lang={lang}/>;
  if (kind === "cookiePreferences") page = <CookiePreferencesPage lang={lang}/>;
  if (["privacy", "kvkk", "cookies", "dataRights", "aiTransparency", "legal", "terms", "policyUpdates", "vendors"].includes(kind)) page = <TrustContentPage lang={lang} kind={kind as "privacy" | "kvkk" | "cookies" | "dataRights" | "aiTransparency" | "legal" | "terms" | "policyUpdates" | "vendors"}/>;
  if (kind === "notFound") page = <PageHero eyebrow="404" title={lang === "en" ? "This page is not available." : "Bu sayfa mevcut değil."} intro={lang === "en" ? "Return to the Ganrich Advisory home page." : "Ganrich Advisory ana sayfasına dönün."}/>;
  return <SiteLayout lang={lang} route={route}><Suspense fallback={<div className="route-loading" role="status">{lang === "en" ? "Loading…" : "Yükleniyor…"}</div>}>{page}</Suspense></SiteLayout>;
}
