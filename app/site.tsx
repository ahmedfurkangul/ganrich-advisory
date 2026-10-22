"use client";

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnalyticsBridge } from "./analytics";
import { expertise, insightArticles, insightCategories, insightCategoryForKind, insightHref, insightIndex, insights, Lang, markets, pageKind, routeMap, switchHref } from "./content";
import { BriefingTray, HeaderExplore, HomeIntelligenceModules } from "./intelligence-shell";
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
    skip: "Skip to content", nav: ["Expertise", "Markets", "Insights", "Decision Lab", "About"], cta: "Start a conversation",
    eyebrow: "STRATEGY · TRANSFORMATION · APPLIED AI", title: "Clarity for consequential decisions.",
    hero: "Ganrich Advisory helps leadership teams translate complexity into focused choices, executable transformation, and measurable performance across Türkiye, MENA, Europe, and Africa.",
    primary: "Explore our expertise", secondary: "Discuss a priority", proof: "Independent thinking. Regional fluency. AI-enabled delivery.",
    introTitle: "Strategic clarity, built for execution.", intro: "We work with leadership teams on the choices that shape growth, operating models, and long-term value. Our work combines rigorous analysis, regional fluency, and practical execution—supported by AI where it materially improves the quality or speed of the answer.",
    expLabel: "What we help decide", expTitle: "Focused expertise for decisions that shape value.", explore: "Explore this expertise",
    aiTitle: "AI accelerates the work. Judgment determines the answer.", ai: "We use AI to expand research coverage, identify patterns, test scenarios, structure complex evidence, and improve the speed of iteration. Senior judgment remains responsible for framing the decision, interpreting context, managing trade-offs, and shaping recommendations.",
    process: ["Frame", "Investigate", "Synthesize", "Challenge", "Decide", "Mobilize"],
    marketTitle: "Regional depth. Perspective beyond borders.", marketBody: "Our regional lens is designed around contexts, corridors, and decision environments—not stereotypes. Each engagement starts with the market-specific evidence required.",
    insightTitle: "Perspectives designed to be used, not merely read.", read: "Read the perspective", request: "Request the full briefing",
    questionsTitle: "Questions we help leadership teams answer", questions: ["Which growth opportunities deserve capital—and which do not?", "What operating model will support the next stage of scale?", "Where can AI create measurable strategic or operational value?", "Which markets should be entered, sequenced, or deprioritized?", "How should a transformation be governed to move from activity to value?", "What decisions are delayed because accountability is unclear?"],
    finalTitle: "What decision is on your agenda?", finalBody: "Share the context. We will come prepared with the questions that matter.", insightsCta: "Explore our insights",
  },
  tr: {
    skip: "İçeriğe geç", nav: ["Uzmanlık", "Coğrafyalar", "İçgörüler", "Karar Laboratuvarı", "Hakkımızda"], cta: "Görüşme başlatın",
    eyebrow: "STRATEJİ · DÖNÜŞÜM · UYGULAMALI YAPAY ZEKÂ", title: "Kritik kararlar için netlik.",
    hero: "Ganrich Advisory, Türkiye, Orta Doğu ve Kuzey Afrika, Avrupa ve Afrika’daki liderlik ekiplerinin karmaşıklığı odaklı tercihlere, uygulanabilir dönüşüme ve ölçülebilir performansa dönüştürmesine yardımcı olur.",
    primary: "Uzmanlığımızı keşfedin", secondary: "Önceliğinizi konuşalım", proof: "Bağımsız düşünce. Bölgesel derinlik. Yapay zekâ destekli çalışma.",
    introTitle: "Uygulamaya dönüşen stratejik netlik.", intro: "Liderlik ekipleriyle büyümeyi, işletim modelini ve uzun vadeli değeri şekillendiren tercihler üzerinde çalışıyoruz. Yaklaşımımız; titiz analizi, bölgesel derinliği ve uygulanabilirliği, yanıtın kalitesini veya hızını anlamlı biçimde artırdığı noktalarda yapay zekâ ile bir araya getirir.",
    expLabel: "Netleştirdiğimiz kararlar", expTitle: "Değeri şekillendiren kararlar için odaklı uzmanlık.", explore: "Bu uzmanlığı inceleyin",
    aiTitle: "Yapay zekâ çalışmayı hızlandırır. Yanıtı ise muhakeme belirler.", ai: "Yapay zekâyı araştırma kapsamını genişletmek, örüntüleri belirlemek, senaryoları sınamak, karmaşık kanıtları yapılandırmak ve yineleme hızını artırmak için kullanıyoruz. Kararın doğru çerçevelenmesi, bağlamın yorumlanması, ödünleşimlerin yönetilmesi ve önerilerin şekillendirilmesi ise kıdemli muhakemenin sorumluluğundadır.",
    process: ["Çerçevele", "Araştır", "Sentezle", "Sına", "Karar Ver", "Harekete Geçir"],
    marketTitle: "Bölgesel derinlik. Sınırların ötesinde bakış.", marketBody: "Bölgesel yaklaşımımız basmakalıp tanımlara değil; bağlama, ekonomik koridorlara ve karar ortamlarına dayanır. Her çalışma, pazara özgü kanıtlarla başlar.",
    insightTitle: "Yalnızca okunmak için değil, kullanılmak için geliştirilen içgörüler.", read: "Bakışı okuyun", request: "Detaylı bilgilendirme talep edin",
    questionsTitle: "Liderlik ekiplerinin yanıtlamasına yardımcı olduğumuz sorular", questions: ["Hangi büyüme fırsatları sermaye tahsisini hak ediyor, hangileri etmiyor?", "Bir sonraki ölçeklenme aşamasını hangi işletim modeli destekleyecek?", "Yapay zekâ nerede ölçülebilir stratejik veya operasyonel değer yaratabilir?", "Hangi pazarlara girilmeli, hangi sırayla ilerlenmeli veya hangileri ertelenmeli?", "Bir dönüşüm, faaliyet yerine değer yaratacak şekilde nasıl yönetilmeli?", "Yetki ve sorumlulukların belirsizliği nedeniyle hangi kararlar gecikiyor?"],
    finalTitle: "Gündeminizde hangi karar var?", finalBody: "Bağlamı paylaşın. Biz, önem taşıyan sorularla hazırlıklı gelelim.", insightsCta: "İçgörülerimizi keşfedin",
  },
} as const;

function A({ href, children, className = "", dataEvent }: { href: string; children: React.ReactNode; className?: string; dataEvent?: string }) {
  return <a href={href} className={className} data-analytics-event={dataEvent}>{children}<span aria-hidden="true" className="arrow">↗</span></a>;
}

function Wordmark() {
  return <span className="wordmark"><Image src="/brand/ganrich-advisory-threshold.png" width={1260} height={260} alt="Ganrich Advisory" priority unoptimized/></span>;
}

function ThresholdField() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box || !ref.current) return;
    ref.current.style.setProperty("--mx", `${((e.clientX - box.left) / box.width - .5) * 12}px`);
    ref.current.style.setProperty("--my", `${((e.clientY - box.top) / box.height - .5) * 12}px`);
  };
  return <div className="threshold-field" ref={ref} onPointerMove={onMove} aria-hidden="true">
    <div className="threshold-plane">
      <i className="threshold-arc outer"/><i className="threshold-arc inner"/>
      <span className="threshold-axis"/><span className="threshold-baseline"/><b className="threshold-gate"/>
      <em className="threshold-node top"/><em className="threshold-node left"/><em className="threshold-node right"/><em className="threshold-node base"/>
      <small className="threshold-caption signal-label">Signal</small><small className="threshold-caption choice-label">Choice</small>
    </div>
  </div>;
}

function Header({ lang, route }: SiteProps) {
  const [open, setOpen] = useState(false); const t = ui[lang]; const m = routeMap[lang];
  const hrefs = [m.expertise, m.markets, m.insights, m.decisionLab, m.about];
  return <header className="header">
    <a className="brand" href={`/${lang}`} aria-label="Ganrich Advisory — Home"><Wordmark/></a>
    <button className="menu" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
    <nav id="primary-nav" className={open ? "nav open" : "nav"} aria-label="Primary navigation">
      {t.nav.map((item, i) => <a key={item} href={`/${lang}/${hrefs[i]}`}>{item}</a>)}
    </nav>
    <div className="header-actions">
      <HeaderExplore lang={lang}/>
      <a className="language" data-analytics-event="language_switched" href={switchHref(lang, route)} onClick={() => localStorage.setItem("ganrich-language", lang === "en" ? "tr" : "en")} aria-label={lang === "en" ? "Türkçe sürüme geç" : "Switch to English"}><span className={lang === "en" ? "active" : ""}>EN</span><i>/</i><span className={lang === "tr" ? "active" : ""}>TR</span></a>
      <a className="button compact" data-analytics-event="contact_started" href={`/${lang}/${m.contact}`}>{t.cta}</a>
    </div>
  </header>;
}

function TopSectionNav({ lang }: { lang: Lang }) {
  const t = ui[lang]; const m = routeMap[lang];
  const hrefs = [m.expertise, m.markets, m.insights, m.decisionLab, m.about];
  return <nav className="top-section-nav" aria-label={lang === "en" ? "Key sections" : "Ana bölümler"}>
    {t.nav.map((item, index) => <a key={item} href={`/${lang}/${hrefs[index]}`}>{item}</a>)}
  </nav>;
}

function Footer({ lang }: { lang: Lang }) {
  const t = ui[lang]; const m = routeMap[lang];
  return <footer className="footer">
    <div className="footer-lead"><Wordmark/><p>{lang === "en" ? "Strategic judgment, regional fluency, and applied AI for consequential decisions." : "Kritik kararlar için stratejik muhakeme, bölgesel derinlik ve uygulamalı yapay zekâ."}</p></div>
    <div className="footer-links">
      <div><span>{lang === "en" ? "Navigate" : "Gezinin"}</span><a href={`/${lang}/${m.expertise}`}>{t.nav[0]}</a><a href={`/${lang}/${m.markets}`}>{t.nav[1]}</a><a href={`/${lang}/${m.insights}`}>{t.nav[2]}</a><a href={`/${lang}/${m.decisionLab}`}>{t.nav[3]}</a><a href={`/${lang}/${m.about}`}>{t.nav[4]}</a></div>
      <div><span>{lang === "en" ? "Contact" : "İletişim"}</span><a href={`/${lang}/${m.contact}`}>{t.cta}</a><a href="mailto:furkangul@gmail.com">furkangul@gmail.com</a><a href="https://www.linkedin.com/in/furkangul/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
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

function SectionHead({ label, title, body }: { label: string; title: string; body?: string }) {
  return <div className="section-head"><span className="eyebrow">{label}</span><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function ExpertiseRow({ lang, item, index }: { lang: Lang; item: (typeof expertise)[Lang][number]; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `expertise-${lang}-${index + 1}`;
  return <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="expertise-row">
    <summary aria-expanded={open} aria-controls={panelId}><span className="index">0{index + 1}</span><h3>{item[0]}</h3><p>{item[1]}</p><span className="plus" aria-hidden="true">+</span></summary>
    <div id={panelId} className="expertise-detail"><p><strong>{lang === "en" ? "Decision question" : "Karar sorusu"}</strong>{item[2]}</p><p><strong>{lang === "en" ? "Typical work" : "Çalışma alanları"}</strong>{item[3]}</p><A href={`/${lang}/${routeMap[lang].expertise}#area-${index+1}`}>{ui[lang].explore}</A></div>
  </details>;
}

function ExpertiseMatrix({ lang, limit }: { lang: Lang; limit?: number }) {
  const rows = limit ? expertise[lang].slice(0, limit) : expertise[lang];
  return <div className="expertise-grid">{rows.map((item, index) => <ExpertiseRow key={item[0]} lang={lang} item={item} index={index}/>)}</div>;
}

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

function Home({ lang }: { lang: Lang }) {
  const t = ui[lang]; const m = routeMap[lang]; const [region, setRegion] = useState(0);
  return <>
    <section className="hero"><div className="hero-copy"><span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1><p>{t.hero}</p><div className="hero-actions"><a className="button" href={`/${lang}/${m.expertise}`}>{t.primary}</a><A href={`/${lang}/${m.contact}`} className="text-link">{t.secondary}</A></div><small>{t.proof}</small></div><ThresholdField/><div className="scroll-cue"><span>01</span><i/><span>06</span></div></section>
    <section className="intro section"><span className="eyebrow">{lang === "en" ? "OUR PERSPECTIVE" : "BAKIŞIMIZ"}</span><h2>{t.introTitle}</h2><p>{t.intro}</p></section>
    <HomeIntelligenceModules lang={lang}/>
    <section className="section expertise"><SectionHead label={t.expLabel} title={t.expTitle}/><ExpertiseMatrix lang={lang}/></section>
    <section className="ai-section section"><div><span className="eyebrow">{lang === "en" ? "AI + HUMAN JUDGMENT" : "YAPAY ZEKÂ + İNSAN MUHAKEMESİ"}</span><h2>{t.aiTitle}</h2><p>{t.ai}</p></div><ol className="process">{t.process.map((p, i) => <li key={p}><span>0{i+1}</span><strong>{p}</strong></li>)}</ol></section>
    <section className="section markets"><SectionHead label={lang === "en" ? "REGIONAL PERSPECTIVE" : "BÖLGESEL BAKIŞ"} title={t.marketTitle} body={t.marketBody}/><div className="market-module"><div role="tablist" aria-label={lang === "en" ? "Regions" : "Coğrafyalar"}>{markets[lang].map((r, i) => <button id={`home-market-tab-${i}`} key={r[0]} role="tab" aria-selected={region === i} aria-controls="home-market-panel" tabIndex={region === i ? 0 : -1} onKeyDown={(event) => moveTab(event, i, markets[lang].length, setRegion)} onClick={() => setRegion(i)}><span>0{i+1}</span>{r[0]}</button>)}</div><div id="home-market-panel" className="market-view" role="tabpanel" aria-labelledby={`home-market-tab-${region}`} tabIndex={0}><div className={`market-shape shape-${region}`} aria-hidden="true"><i/><i/><i/><i/></div><p>{markets[lang][region][1]}</p><A href={`/${lang}/${m.markets}`}>{lang === "en" ? "Explore the regional perspective" : "Bölgesel bakışı inceleyin"}</A></div></div></section>
    <section className="section insights"><SectionHead label={lang === "en" ? "INSIGHTS" : "İÇGÖRÜLER"} title={t.insightTitle}/><div className="insight-layout">{insights[lang].slice(0, 3).map((item, i) => <article className={i === 0 ? "insight-card lead" : "insight-card"} key={item[0]}><div className={`insight-art art-${i}`} aria-hidden="true"><span/><i/><b/></div><div><p className="meta">{item[4]} · {item[3]}</p><h3>{item[0]}</h3><p>{item[1]}</p><small>{insightArticles[lang][i].dateLabel} · {insightArticles[lang][i].author}</small><A href={insightHref(lang, i)} dataEvent="insight_viewed">{t.read}</A></div></article>)}</div><a className="button outline" href={`/${lang}/${m.insights}`}>{t.insightsCta}</a></section>
    <section className="section questions"><span className="eyebrow">{lang === "en" ? "REPRESENTATIVE QUESTIONS" : "TEMSİLÎ SORULAR"}</span><h2>{t.questionsTitle}</h2><ol>{t.questions.map((q, i) => <li key={q}><span>0{i+1}</span><p>{q}</p></li>)}</ol></section>
    <section className="cta-band"><span className="eyebrow">{lang === "en" ? "START A CONVERSATION" : "GÖRÜŞME BAŞLATIN"}</span><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><div><a className="button light" href={`/${lang}/${m.contact}`}>{t.cta}</a><A href={`/${lang}/${m.insights}`}>{t.insightsCta}</A></div></section>
  </>;
}

function PageHero({ eyebrow, title, intro, aside }: { eyebrow: string; title: string; intro: string; aside?: string }) {
  return <section className="page-hero"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></div><div><p>{intro}</p>{aside && <small>{aside}</small>}</div><div className="threshold-glyph" aria-hidden="true"><i/><span/><b/></div></section>;
}

function ExpertisePage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  return <><PageHero eyebrow={isEn ? "EXPERTISE" : "UZMANLIK"} title={isEn ? "The decision comes first." : "Önce karar gelir."} intro={isEn ? "We organize the work around the choice leadership needs to make—not a predetermined method or catalogue of services." : "Çalışmayı önceden belirlenmiş bir yöntem veya hizmet listesi etrafında değil, liderliğin vermesi gereken karar etrafında kurguluyoruz."} aside={isEn ? "Six connected capabilities. One standard: clarity that can be executed." : "Birbiriyle bağlantılı altı yetkinlik. Tek standart: uygulanabilir netlik."}/><section className="section"><ExpertiseMatrix lang={lang}/></section><section className="dark-editorial section"><span className="eyebrow">{isEn ? "HOW WE WORK" : "NASIL ÇALIŞIYORUZ"}</span><h2>{isEn ? "Evidence before assertion. Execution before theatre." : "İddiadan önce kanıt. Gösteriden önce uygulama."}</h2><div className="three-cols">{(isEn ? [["01", "Frame the choice", "Define the decision, constraints, stakeholders, and threshold for action."], ["02", "Build the evidence", "Separate fact from assumption and test the trade-offs that matter."], ["03", "Design for movement", "Translate the recommendation into ownership, cadence, and value tracking."]] : [["01", "Kararı çerçevele", "Kararı, kısıtları, paydaşları ve harekete geçme eşiğini tanımlayın."], ["02", "Kanıtı oluştur", "Gerçeği varsayımdan ayırın; önem taşıyan ödünleşimleri sınayın."], ["03", "İlerlemeyi tasarla", "Öneriyi sahiplik, çalışma ritmi ve değer takibine dönüştürün."]]).map(x => <div key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></section><CTA lang={lang}/></>;
}

function MarketsPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  return <><PageHero eyebrow={isEn ? "MARKETS" : "COĞRAFYALAR"} title={isEn ? "Context changes the answer." : "Bağlam, yanıtı değiştirir."} intro={isEn ? "Cross-border perspective is useful only when it sharpens—not flattens—local understanding. We structure regional work around country, subregion, corridor, and decision context." : "Sınır ötesi bakış, yerel anlayışı yüzeyselleştirmediği; aksine keskinleştirdiği ölçüde değerlidir. Bölgesel çalışmaları ülke, alt bölge, ekonomik koridor ve karar bağlamı etrafında yapılandırıyoruz."}/><section className="section region-list">{markets[lang].map((r, i) => <article key={r[0]}><span>0{i+1}</span><h2>{r[0]}</h2><p>{r[1]}</p><div><strong>{isEn ? "Content architecture" : "İçerik mimarisi"}</strong><small>{isEn ? "Country and subregion tags · Related expertise · Dated sources · Verified experience only" : "Ülke ve alt bölge etiketleri · İlgili uzmanlık · Tarihli kaynaklar · Yalnızca doğrulanmış deneyim"}</small></div></article>)}</section><section className="evidence-note"><strong>{isEn ? "A note on regional evidence" : "Bölgesel kanıt hakkında not"}</strong><p>{isEn ? "Macroeconomic observations, market claims, languages, offices, and engagement experience will be published only with a source, date, and internal verification." : "Makroekonomik gözlemler, pazar iddiaları, dil yetkinlikleri, ofisler ve çalışma deneyimi yalnızca kaynak, tarih ve iç doğrulama ile yayımlanacaktır."}</p></section><CTA lang={lang}/></>;
}

function InsightsPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const indexed = useMemo(() => insights[lang].map((item, index) => ({ item, index })), [lang]);
  const list = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(lang === "en" ? "en-GB" : "tr-TR");
    return indexed.filter(({ item }) => {
      const matchesFilter = filter === "all" || item[2] === filter;
      const searchable = item.join(" · ").toLocaleLowerCase(lang === "en" ? "en-GB" : "tr-TR");
      return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [filter, indexed, lang, query]);
  return <><PageHero eyebrow={isEn ? "INSIGHTS" : "İÇGÖRÜLER"} title={isEn ? "Ideas made for use." : "Kullanılmak için geliştirilen fikirler."} intro={isEn ? "A strategic intelligence environment for signals, executive briefings, reports, evidence, and decision-ready synthesis." : "Sinyaller, yönetici brifingleri, raporlar, kanıt ve karara hazır sentezler için stratejik bir içgörü ortamı."}/>
    <section className="insights-directory section">
      <a href={`/${lang}/${routeMap[lang].article}`}><span>01</span><div><small>{isEn ? "CONTROLLED READING DEPTH" : "KONTROLLÜ OKUMA DERİNLİĞİ"}</small><h2>{isEn ? "Executive reading modes" : "Yönetici okuma modları"}</h2><p>{isEn ? "Move between a 90-second view, executive implications, full analysis, and evidence." : "90 saniyelik bakış, yönetici çıkarımları, tam analiz ve kanıt arasında geçiş yapın."}</p></div><i>↗</i></a>
      <a href={`/${lang}/${routeMap[lang].decisionFramer}`}><span>02</span><div><small>{isEn ? "FROM READING TO ACTION" : "OKUMADAN UYGULAMAYA"}</small><h2>{isEn ? "Decision Framer" : "Karar Çerçeveleyici"}</h2><p>{isEn ? "Turn an insight into a structured decision brief." : "Bir içgörüyü yapılandırılmış karar özetine dönüştürün."}</p></div><i>↗</i></a>
    </section>
    <nav className="insight-taxonomy" aria-label={isEn ? "Insight categories" : "İçgörü kategorileri"}>{insightCategories[lang].map((category) => <a key={category.key} href={`/${lang}/${routeMap[lang][category.key]}`}>{category.label}</a>)}</nav>
    <section className="section filter-row"><div><button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>{isEn ? "All" : "Tümü"}</button>{[...new Set(insights[lang].map(x => x[2]))].map(x => <button className={filter === x ? "active" : ""} key={x} onClick={() => setFilter(x)}>{x}</button>)}</div><label><span>{isEn ? "Search" : "Ara"}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={isEn ? "Search insights" : "İçgörülerde ara"}/></label></section>
    <section className="section publication-list">{list.length ? list.map(({ item: x, index }, displayIndex) => <article key={x[0]}><span>0{displayIndex + 1}</span><div><p className="meta">{x[4]} · {x[3]} · {insightArticles[lang][index].dateLabel} · {insightArticles[lang][index].author}</p><h2>{x[0]}</h2><p>{x[1]}</p><A href={insightHref(lang, index)} dataEvent="insight_viewed">{ui[lang].read}</A></div><div className={`mini-art art-${index}`} aria-hidden="true"><i/><b/></div></article>) : <div className="insight-empty" role="status"><span className="eyebrow">{isEn ? "NO MATCHES" : "EŞLEŞME YOK"}</span><h2>{isEn ? "No perspective matches this search." : "Bu aramayla eşleşen bir perspektif yok."}</h2><button type="button" className="text-link" onClick={() => { setFilter("all"); setQuery(""); }}>{isEn ? "Clear search" : "Aramayı temizleyin"} →</button></div>}</section><PdfInsightHubCards lang={lang}/></>;
}

function InsightCategoryPage({ lang, kind }: { lang: Lang; kind: string }) {
  const isEn = lang === "en";
  const category = insightCategoryForKind(lang, kind);
  if (!category) return null;
  const articles = insightArticles[lang].map((article, index) => ({ article, index })).filter(({ article }) => article.topic === category.topic);
  return <>
    <PageHero eyebrow={isEn ? "INSIGHTS · CATEGORY" : "İÇGÖRÜLER · KATEGORİ"} title={`${category.label}.`} intro={category.description}/>
    <nav className="insight-taxonomy category-page" aria-label={isEn ? "Insight categories" : "İçgörü kategorileri"}>
      <a href={`/${lang}/${routeMap[lang].insights}`}>{isEn ? "All insights" : "Tüm içgörüler"}</a>
      {insightCategories[lang].map((item) => <a className={item.key === category.key ? "active" : ""} aria-current={item.key === category.key ? "page" : undefined} key={item.key} href={`/${lang}/${routeMap[lang][item.key]}`}>{item.label}</a>)}
    </nav>
    <section className="section publication-list category-publications">{articles.map(({ article, index }, displayIndex) => <article key={article.slug}><span>0{displayIndex + 1}</span><div><p className="meta">{article.type} · {article.region} · {article.dateLabel} · {article.author}</p><h2>{article.title}</h2><p>{article.thesis}</p><A href={insightHref(lang, index)} dataEvent="insight_viewed">{ui[lang].read}</A></div><div className={`mini-art art-${index}`} aria-hidden="true"><i/><b/></div></article>)}</section>
    <CTA lang={lang}/>
  </>;
}

function AboutPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const principles = isEn ? ["Frame the decision before starting the analysis", "Separate evidence from assumption", "Make trade-offs explicit", "Adapt the answer to the context", "Design for execution from the beginning", "Use technology where it improves judgment", "Maintain discretion", "Measure progress through value, not activity"] : ["Analize başlamadan önce kararı doğru çerçevelemek", "Kanıtı varsayımdan ayırmak", "Ödünleşimleri görünür kılmak", "Yanıtı bağlama göre şekillendirmek", "Uygulamayı en baştan tasarlamak", "Teknolojiyi muhakemeyi geliştirdiği yerde kullanmak", "Gizliliği ve ölçülülüğü korumak", "İlerlemeyi faaliyetle değil, değerle ölçmek"];
  const evidence = isEn ? [
    ["Strategy & business development", "Experience includes strategy and business development leadership at Tay Group."],
    ["Strategic decision research", "Research explores leadership styles, advice-seeking behavior, and the speed and quality of strategic decisions."],
    ["Academic practice", "Assistant Professor at İstanbul Kent University, connecting management questions with technology and education."],
  ] : [
    ["Strateji ve iş geliştirme", "Deneyimi, Tay Group’ta strateji ve iş geliştirme liderliğini kapsar."],
    ["Stratejik karar araştırmaları", "Araştırmaları liderlik stilleri, tavsiye arama davranışı ile stratejik kararların hızı ve kalitesini inceler."],
    ["Akademik çalışma", "İstanbul Kent Üniversitesinde Dr. Öğr. Üyesi olarak yönetim sorularını teknoloji ve eğitimle buluşturur."],
  ];
  return <>
    <PageHero eyebrow={isEn ? "ABOUT" : "HAKKIMIZDA"} title={isEn ? "Independent thinking for decisions that do not fit a template." : "Bir şablona sığmayan kararlar için bağımsız düşünce."} intro={isEn ? "Ganrich Advisory is an independent strategy, transformation, and applied-AI advisory for leaders working across complex regional and organisational contexts." : "Ganrich Advisory, karmaşık bölgesel ve kurumsal bağlamlarda çalışan liderler için bağımsız strateji, dönüşüm ve uygulamalı yapay zekâ danışmanlığı sunar."}/>
    <section className="section belief"><span className="eyebrow">{isEn ? "WHAT WE BELIEVE" : "NEYE İNANIYORUZ"}</span><h2>{isEn ? "The best answer is rigorous enough to trust and practical enough to use." : "En iyi yanıt, güvenilecek kadar titiz; kullanılacak kadar uygulanabilirdir."}</h2><p>{isEn ? "We combine strategic judgment, regional fluency, and applied AI to help leaders make consequential choices and translate them into execution." : "Liderlerin kritik tercihleri netleştirmesine ve bu tercihleri uygulamaya dönüştürmesine yardımcı olmak için stratejik muhakemeyi, bölgesel içgörüyü ve uygulamalı yapay zekâyı bir araya getiriyoruz."}</p></section>
    <section className="section founder">
      <div className="founder-mark" aria-hidden="true"><span>AFG</span><i>01</i><small>{isEn ? "FOUNDER" : "KURUCU"}</small></div>
      <div className="founder-profile">
        <header><span className="eyebrow">{isEn ? "FOUNDER" : "KURUCU"}</span><h2>Ahmed Furkan Gul</h2><p>{isEn ? "Founder, Ganrich Advisory · Istanbul, Türkiye" : "Kurucu, Ganrich Advisory · İstanbul, Türkiye"}</p></header>
        <div className="founder-bio">
          <p>{isEn ? "Ahmed Furkan Gul works at the intersection of corporate strategy, business development, strategic decision-making, and applied technology. Across executive and academic settings, his focus is on helping leaders frame consequential choices, challenge assumptions, and translate evidence into action." : "Ahmed Furkan Gul; kurumsal strateji, iş geliştirme, stratejik karar alma ve uygulamalı teknolojinin kesişiminde çalışır. Yönetici ve akademik ortamlarda, liderlerin kritik tercihleri çerçevelemesine, varsayımları sınamasına ve kanıtı eyleme dönüştürmesine odaklanır."}</p>
          <p>{isEn ? "His professional experience includes leading strategy and business development at Tay Group. His research at Yeditepe University examines how leadership styles and advice-seeking behavior influence strategic decision outcomes. He also serves as an Assistant Professor at İstanbul Kent University." : "Profesyonel deneyimi Tay Group’ta strateji ve iş geliştirme liderliğini kapsar. Yeditepe Üniversitesindeki araştırmaları, liderlik stilleri ve tavsiye arama davranışının stratejik karar sonuçlarını nasıl etkilediğini inceler. Aynı zamanda İstanbul Kent Üniversitesinde Dr. Öğr. Üyesi olarak görev yapmaktadır."}</p>
        </div>
        <div className="founder-evidence">{evidence.map((item, i) => <article key={item[0]}><span>0{i + 1}</span><strong>{item[0]}</strong><p>{item[1]}</p></article>)}</div>
        <div className="founder-links">
          <a className="button outline" href="https://www.linkedin.com/in/furkangul/" target="_blank" rel="noreferrer">{isEn ? "View LinkedIn profile" : "LinkedIn profilini görüntüleyin"} <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="https://avesis.kent.edu.tr/ahmedfurkan.gul" target="_blank" rel="noreferrer">{isEn ? "Academic profile" : "Akademik profil"} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
    <section className="section principles"><SectionHead label={isEn ? "WORKING PRINCIPLES" : "ÇALIŞMA İLKELERİ"} title={isEn ? "A disciplined way of seeing the work." : "Çalışmaya disiplinli bir bakış."}/><ol>{principles.map((p, i) => <li key={p}><span>0{i+1}</span><p>{p}</p></li>)}</ol></section>
    <CTA lang={lang}/>
  </>;
}

function ContactPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [prefill, setPrefill] = useState({ context: "", interest: "", ready: false });
  const privacyHref = `/${lang}/${routeMap[lang].privacy}`;
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const decision = (params.get("decision") ?? "").slice(0, 1200);
    const context = (params.get("context") ?? "").slice(0, 1800);
    const tool = (params.get("tool") ?? "").slice(0, 120);
    const interest = params.get("interest") ?? "";
    const validInterest = expertise[lang].some((item) => item[0] === interest) ? interest : "";
    const combined = [tool && `${isEn ? "Tool context" : "Araç bağlamı"}: ${tool}`, decision && `${isEn ? "Decision" : "Karar"}: ${decision}`, context].filter(Boolean).join("\n\n");
    queueMicrotask(() => setPrefill({ context: combined, interest: validInterest, ready: true }));
  }, [isEn, lang]);
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
        body: JSON.stringify({ ...payload, kind: "contact", language: lang, source: `/${lang}/${routeMap[lang].contact}` }),
      });
      const result = await response.json() as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Submission failed");
      setStatus("sent");
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : (isEn ? "The inquiry could not be sent." : "Talep gönderilemedi."));
      setStatus("error");
    }
  };
  const preparation = isEn
    ? ["The decision that needs to be made.", "Why it is on the agenda now.", "The evidence, constraints, and stakeholders already known."]
    : ["Verilmesi gereken karar.", "Kararın neden şimdi gündemde olduğu.", "Bilinen kanıtlar, kısıtlar ve paydaşlar."];
  return <><PageHero eyebrow={isEn ? "CONTACT" : "İLETİŞİM"} title={isEn ? "Bring us the decision that matters." : "Önem taşıyan kararı birlikte ele alalım."} intro={isEn ? "Share enough context for a useful first conversation. Please do not send confidential or restricted material before an engagement framework is established." : "Verimli bir ilk görüşme için yeterli bağlamı paylaşın. Bir çalışma çerçevesi oluşturulmadan önce gizli veya kısıtlı materyal göndermeyin."}/><section className="contact-section"><div><h2>{isEn ? "A considered first exchange." : "Özenli bir ilk temas."}</h2><p>{isEn ? "Share the context. We will come prepared with the questions that matter." : "Bağlamı paylaşın. Biz, önem taşıyan sorularla hazırlıklı gelelim."}</p><div className="contact-preparation"><span className="eyebrow">{isEn ? "WHAT TO PREPARE" : "NE HAZIRLAMALI"}</span><ol>{preparation.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></div><a className="text-link" href="mailto:furkangul@gmail.com">furkangul@gmail.com <span aria-hidden="true">↗</span></a><a className="text-link" href="https://www.linkedin.com/in/furkangul/" target="_blank" rel="noreferrer">{isEn ? "Connect with Ahmed Furkan Gul on LinkedIn" : "Ahmed Furkan Gul ile LinkedIn üzerinden bağlantı kurun"} <span aria-hidden="true">↗</span></a></div>{status === "sent" ? <div className="form-success" role="status"><span>✓</span><h2>{isEn ? "Your inquiry has been received." : "Talebiniz alındı."}</h2><p>{isEn ? "We will review the context before responding. Please do not send confidential material by email at this stage." : "Yanıt vermeden önce paylaştığınız bağlamı inceleyeceğiz. Bu aşamada e-posta ile gizli materyal göndermeyin."}</p></div> : <form key={prefill.ready ? `${prefill.interest}-${prefill.context}` : "blank"} className="contact-form" onSubmit={submit}><label>{isEn ? "Name" : "Ad Soyad"}<input name="name" autoComplete="name" minLength={2} required/></label><label>{isEn ? "Work email" : "İş e-postası"}<input name="email" type="email" autoComplete="email" required/></label><label>{isEn ? "Organization" : "Kurum"}<input name="organization" autoComplete="organization" required/></label><label>{isEn ? "Role" : "Görev"}<input name="role" autoComplete="organization-title"/></label><label>{isEn ? "Region" : "Coğrafya"}<select name="region" required defaultValue=""><option value="" disabled>{isEn ? "Select" : "Seçin"}</option>{markets[lang].map(x => <option key={x[0]}>{x[0]}</option>)}</select></label><label>{isEn ? "Area of interest" : "İlgi alanı"}<select name="interest" required defaultValue={prefill.interest}><option value="" disabled>{isEn ? "Select" : "Seçin"}</option>{expertise[lang].map(x => <option key={x[0]}>{x[0]}</option>)}</select></label><label className="full">{isEn ? "Briefly describe the priority" : "Önceliği kısaca açıklayın"}<textarea name="context" minLength={30} defaultValue={prefill.context} required/></label><label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label><label className="marketing-choice full"><input name="privacyAcknowledged" type="checkbox" value="yes" required/><span>{isEn ? "I have read the privacy notice and understand how my inquiry will be handled." : "Gizlilik bildirimini okudum ve talebimin nasıl işleneceğini anladım."}</span></label><p className="jit-notice full">{isEn ? "Your details are stored securely to review and respond to this inquiry. Do not include confidential or sensitive information." : "Bilgileriniz bu talebi incelemek ve yanıtlamak amacıyla güvenli biçimde saklanır. Gizli veya hassas bilgi eklemeyin."} <a href={privacyHref}>{isEn ? "Read the privacy notice." : "Gizlilik bildirimini okuyun."}</a></p>{status === "error" && <p className="form-error full" role="alert">{message} <a href="mailto:furkangul@gmail.com">{isEn ? "Use direct email." : "Doğrudan e-posta kullanın."}</a></p>}<button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? (isEn ? "Sending…" : "Gönderiliyor…") : (isEn ? "Send the inquiry" : "Talebi gönderin")}</button></form>}</section></>;
}

function CTA({ lang }: { lang: Lang }) { const t = ui[lang]; return <section className="cta-band compact-band"><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><a className="button light" href={`/${lang}/${routeMap[lang].contact}`}>{t.cta}</a></section>; }

export default function Site({ lang, route }: SiteProps) {
  const kind = pageKind(lang, route);
  let page: React.ReactNode = <Home lang={lang}/>;
  if (kind === "expertise") page = <ExpertisePage lang={lang}/>;
  if (kind === "markets") page = <MarketsPage lang={lang}/>;
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
  if (kind === "contact") page = <ContactPage lang={lang}/>;
  if (kind === "privacyCenter") page = <PrivacyCenterPage lang={lang}/>;
  if (kind === "cookiePreferences") page = <CookiePreferencesPage lang={lang}/>;
  if (["privacy", "kvkk", "cookies", "dataRights", "aiTransparency", "legal", "terms", "policyUpdates", "vendors"].includes(kind)) page = <TrustContentPage lang={lang} kind={kind as "privacy" | "kvkk" | "cookies" | "dataRights" | "aiTransparency" | "legal" | "terms" | "policyUpdates" | "vendors"}/>;
  if (kind === "notFound") page = <PageHero eyebrow="404" title={lang === "en" ? "This page is not available." : "Bu sayfa mevcut değil."} intro={lang === "en" ? "Return to the Ganrich Advisory home page." : "Ganrich Advisory ana sayfasına dönün."}/>;
  return <SiteLayout lang={lang} route={route}><Suspense fallback={<div className="route-loading" role="status">{lang === "en" ? "Preparing the workspace…" : "Çalışma alanı hazırlanıyor…"}</div>}>{page}</Suspense></SiteLayout>;
}
