"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { BoutiqueHome } from "./advisory";
const ServicePage = lazy(() => import("./advisory-details").then(m => ({default:m.ServicePage})));
const SampleWorkPage = lazy(() => import("./advisory-details").then(m => ({default:m.SampleWorkPage})));
const RegionalPage = lazy(() => import("./advisory-details").then(m => ({default:m.RegionalPage})));
const ExpertisePage = lazy(() => import("./marketing-pages").then(m => ({default:m.ExpertisePage})));
const InsightsPage = lazy(() => import("./marketing-pages").then(m => ({default:m.InsightsPage})));
const InsightCategoryPage = lazy(() => import("./marketing-pages").then(m => ({default:m.InsightCategoryPage})));
const AboutPage = lazy(() => import("./marketing-pages").then(m => ({default:m.AboutPage})));
const ContactExperience = lazy(() => import("./contact-experience").then(m => ({default:m.ContactExperience})));
const NotePage = lazy(() => import("./advisory-notes").then(m => ({default:m.NotePage})));
import { AnalyticsBridge } from "./analytics";
import { insightIndex, Lang, pageKind, routeMap, switchHref } from "./content";
import { BriefingTray, HeaderExplore } from "./intelligence-shell";
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
 en:{skip:"Skip to content",nav:["Expertise","Sample work","Insights","Decision Lab","About"],cta:"Start a conversation",read:"Read the perspective",finalTitle:"What decision is on your agenda?",finalBody:"Share the context. We will come prepared with the questions that matter."},
 tr:{skip:"İçeriğe geç",nav:["Uzmanlık","Örnek çalışmalar","İçgörüler","Karar Laboratuvarı","Hakkımızda"],cta:"Görüşme başlatın",read:"Bakışı okuyun",finalTitle:"Gündeminizde hangi karar var?",finalBody:"Bağlamı paylaşın. Biz, önem taşıyan sorularla hazırlıklı gelelim."}
} as const;

function A({ href, children, className = "", dataEvent }: { href: string; children: React.ReactNode; className?: string; dataEvent?: string }) {
  return <a href={href} className={className} data-analytics-event={dataEvent}>{children}<span aria-hidden="true" className="arrow">↗</span></a>;
}

function Wordmark() {
  return <span className="wordmark"><Image src="/brand/ganrich-advisory-threshold.png" width={1260} height={260} alt="Ganrich Advisory" priority unoptimized/></span>;
}

function Header({ lang, route }: SiteProps) {
  const [open, setOpen] = useState(false); const t = ui[lang]; const m = routeMap[lang];
  const hrefs = [m.expertise, m.sampleWork, m.insights, m.decisionLab, m.about];
  return <header className="header">
    <a className="brand" href={`/${lang}`} aria-label="Ganrich Advisory — Home"><Wordmark/></a>
    <button className="menu" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? (lang === "en" ? "Close" : "Kapat") : (lang === "en" ? "Menu" : "Menü")}</button>
    <nav id="primary-nav" className={open ? "nav open" : "nav"} aria-label="Primary navigation">
      {t.nav.map((item, i) => <a key={item} href={`/${lang}/${hrefs[i]}`} aria-current={route === hrefs[i] ? "page" : undefined}>{item}</a>)}
    </nav>
    <div className="header-actions">
      <HeaderExplore lang={lang}/>
      <a className="language" data-analytics-event="language_switched" href={switchHref(lang, route)} onClick={() => localStorage.setItem("ganrich-language", lang === "en" ? "tr" : "en")} aria-label={lang === "en" ? "Türkçe sürüme geç" : "Switch to English"}><span className={lang === "en" ? "active" : ""}>EN</span><i>/</i><span className={lang === "tr" ? "active" : ""}>TR</span></a>
      <a className="button compact" data-analytics-event="contact_started" href={`/${lang}/${m.contact}`}><span className="desktop-cta">{t.cta}</span><span className="mobile-cta">{lang === "en" ? "Contact" : "İletişim"}</span></a>
    </div>
  </header>;
}

function TopSectionNav({ lang }: { lang: Lang }) {
  const t = ui[lang]; const m = routeMap[lang];
  const hrefs = [m.expertise, m.sampleWork, m.insights, m.decisionLab, m.about];
  return <nav className="top-section-nav" aria-label={lang === "en" ? "Key sections" : "Ana bölümler"}>
    {t.nav.map((item, index) => <a key={item} href={`/${lang}/${hrefs[index]}`}>{item}</a>)}
  </nav>;
}

function Footer({ lang }: { lang: Lang }) {
  const t = ui[lang]; const m = routeMap[lang];
  return <footer className="footer">
    <div className="footer-lead"><Wordmark/><p>{lang === "en" ? "Strategic judgment, regional fluency, and applied AI for consequential decisions." : "Kritik kararlar için stratejik muhakeme, bölgesel derinlik ve uygulamalı yapay zekâ."}</p></div>
    <div className="footer-links">
      <div><span>{lang === "en" ? "Navigate" : "Gezinin"}</span><a href={`/${lang}/${m.expertise}`}>{t.nav[0]}</a><a href={`/${lang}/${m.sampleWork}`}>{t.nav[1]}</a><a href={`/${lang}/${m.insights}`}>{t.nav[2]}</a><a href={`/${lang}/${m.decisionLab}`}>{t.nav[3]}</a><a href={`/${lang}/${m.about}`}>{t.nav[4]}</a><a href={`/${lang}/${m.markets}`}>{lang === "en" ? "Markets" : "Coğrafyalar"}</a></div>
      <div><span>{lang === "en" ? "Contact" : "İletişim"}</span><a href={`/${lang}/${m.contact}`}>{t.cta}</a><a href="mailto:furkangul@ganrichadvisory.com">furkangul@ganrichadvisory.com</a><a href="https://www.linkedin.com/in/furkangul/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
    </div>
    <nav className="footer-trust-links" aria-label={lang === "en" ? "Privacy and legal" : "Gizlilik ve hukuk"}>
      <a href={`/${lang}/${m.privacyCenter}`}>{lang === "en" ? "Privacy center" : "Gizlilik merkezi"}</a>
      <a href={`/${lang}/${m.privacy}`}>{lang === "en" ? "Privacy" : "Gizlilik"}</a>
      <a href={`/${lang}/${m.kvkk}`}>KVKK</a>
      <a href={`/${lang}/${m.cookies}`}>{lang === "en" ? "Cookies" : "Çerezler"}</a>
      <button type="button" onClick={openCookiePreferences}>{lang === "en" ? "Cookie preferences" : "Çerez tercihleri"}</button>
      <a href={`/${lang}/${m.dataRights}`}>{lang === "en" ? "Data rights" : "İlgili kişi hakları"}</a>
      <a href={`/${lang}/${m.legal}`}>{lang === "en" ? "Legal notice" : "Yasal bildirim"}</a>
      <a href={`/${lang}/feed.xml`}>RSS ↗</a>
    </nav>
    <div className="footer-base"><p>© {new Date().getFullYear()} Ganrich Advisory</p><p>{lang === "en" ? "Privacy controls · v1.0" : "Gizlilik kontrolleri · v1.0"}</p></div>
  </footer>;
}

export function SiteLayout({ lang, route, children }: SiteProps & { children: React.ReactNode }) {
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <><a className="skip" href="#content">{ui[lang].skip}</a><Header lang={lang} route={route}/><TopSectionNav lang={lang}/><main id="content">{children}</main><BriefingTray lang={lang}/><Footer lang={lang}/><PrivacyControls lang={lang}/><AnalyticsBridge/></>;
}


export default function Site({ lang, route }: SiteProps) {
  const kind = pageKind(lang, route);
  let page: React.ReactNode = <BoutiqueHome lang={lang}/>;
  if (kind.startsWith("service")) page = <ServicePage lang={lang} kind={kind}/>;
  if (kind === "sampleWork") page = <SampleWorkPage lang={lang}/>;
  if (kind.startsWith("note")) page = <NotePage lang={lang} kind={kind}/>;
  if (kind === "expertise") page = <ExpertisePage lang={lang}/>;
  if (kind === "markets") page = <RegionalPage lang={lang}/>;
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
  if (kind === "about") page = <AboutPage lang={lang}/>;
  if (kind === "contact") page = <ContactExperience lang={lang}/>;
  if (kind === "privacyCenter") page = <PrivacyCenterPage lang={lang}/>;
  if (kind === "cookiePreferences") page = <CookiePreferencesPage lang={lang}/>;
  if (["privacy", "kvkk", "cookies", "dataRights", "aiTransparency", "legal", "terms", "policyUpdates", "vendors"].includes(kind)) page = <TrustContentPage lang={lang} kind={kind as "privacy" | "kvkk" | "cookies" | "dataRights" | "aiTransparency" | "legal" | "terms" | "policyUpdates" | "vendors"}/>;
  if (kind === "notFound") page = <PageHero eyebrow="404" title={lang === "en" ? "This page is not available." : "Bu sayfa mevcut değil."} intro={lang === "en" ? "Return to the Ganrich Advisory home page." : "Ganrich Advisory ana sayfasına dönün."}/>;
  return <SiteLayout lang={lang} route={route}><Suspense fallback={<div className="route-loading" role="status">{lang === "en" ? "Preparing the workspace…" : "Çalışma alanı hazırlanıyor…"}</div>}>{page}</Suspense></SiteLayout>;
}
