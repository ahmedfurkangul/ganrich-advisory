"use client";
import { lazy, useMemo, useState } from "react";
import { ServiceList, FounderWorking } from "./advisory";
import { EngagementFormats } from "./advisory-details";
import { expertise, insightArticles, insightCategories, insightCategoryForKind, insightHref, insights, Lang, routeMap } from "./content";
import { PdfInsightHubCards } from "./pdf-insight-cards";
import { DecisionNotes } from "./advisory-notes";
const ui = {
 en:{skip:"Skip to content",nav:["Expertise","Sample work","Insights","Decision Lab","About"],cta:"Start a conversation",read:"Read the perspective",finalTitle:"What decision is on your agenda?",finalBody:"Share the context. We will come prepared with the questions that matter."},
 tr:{skip:"İçeriğe geç",nav:["Uzmanlık","Örnek çalışmalar","İçgörüler","Karar Laboratuvarı","Hakkımızda"],cta:"Görüşme başlatın",read:"Bakışı okuyun",finalTitle:"Gündeminizde hangi karar var?",finalBody:"Bağlamı paylaşın. Biz, önem taşıyan sorularla hazırlıklı gelelim."}
} as const;

function A({ href, children, className = "", dataEvent }: { href: string; children: React.ReactNode; className?: string; dataEvent?: string }) {
  return <a href={href} className={className} data-analytics-event={dataEvent}>{children}<span aria-hidden="true" className="arrow">↗</span></a>;
}

function SectionHead({ label, title, body }: { label: string; title: string; body?: string }) {
  return <div className="section-head"><span className="eyebrow">{label}</span><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function ExpertiseRow({ lang, item, index }: { lang: Lang; item: (typeof expertise)[Lang][number]; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `expertise-${lang}-${index + 1}`;
  return <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="expertise-row">
    <summary aria-expanded={open} aria-controls={panelId}><span className="index">0{index + 1}</span><h3>{item[0]}</h3><p>{item[1]}</p><span className="plus" aria-hidden="true">+</span></summary>
    <div id={panelId} className="expertise-detail"><p><strong>{lang === "en" ? "Decision question" : "Karar sorusu"}</strong>{item[2]}</p><p><strong>{lang === "en" ? "Typical work" : "Çalışma alanları"}</strong>{item[3]}</p><A href={`/${lang}/${routeMap[lang][["serviceMarket","serviceMarket","serviceOperating","serviceAI","serviceOperating","serviceOperating"][index]]}`}>{lang === "en" ? "See the related engagement" : "İlgili çalışmayı inceleyin"}</A></div>
  </details>;
}

function ExpertiseMatrix({ lang, limit }: { lang: Lang; limit?: number }) {
  const rows = limit ? expertise[lang].slice(0, limit) : expertise[lang];
  return <div className="expertise-grid">{rows.map((item, index) => <ExpertiseRow key={item[0]} lang={lang} item={item} index={index}/>)}</div>;
}

export function PageHero({ eyebrow, title, intro, aside }: { eyebrow: string; title: string; intro: string; aside?: string }) {
  return <section className="page-hero"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></div><div><p>{intro}</p>{aside && <small>{aside}</small>}</div><div className="threshold-glyph" aria-hidden="true"><i/><span/><b/></div></section>;
}

export function ExpertisePage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  return <><PageHero eyebrow={isEn ? "EXPERTISE" : "UZMANLIK"} title={isEn ? "The decision comes first." : "Önce karar gelir."} intro={isEn ? "We organize the work around the choice leadership needs to make—not a predetermined method or catalogue of services." : "Çalışmayı önceden belirlenmiş bir yöntem veya hizmet listesi etrafında değil, liderliğin vermesi gereken karar etrafında kurguluyoruz."} aside={isEn ? "Three focused engagements, supported by connected strategy and management capabilities." : "Birbiriyle bağlantılı strateji ve yönetim yetkinlikleriyle desteklenen üç odaklı çalışma."}/><section className="advisory-section"><ServiceList lang={lang}/></section><EngagementFormats lang={lang}/><section className="section"><SectionHead label={isEn ? "Supporting capabilities" : "Destekleyici yetkinlikler"} title={isEn ? "The expertise behind the engagement." : "Çalışmanın arkasındaki uzmanlık."}/><ExpertiseMatrix lang={lang}/></section><section className="dark-editorial section"><span className="eyebrow">{isEn ? "HOW WE WORK" : "NASIL ÇALIŞIYORUZ"}</span><h2>{isEn ? "Evidence before assertion. Execution before theatre." : "İddiadan önce kanıt. Gösteriden önce uygulama."}</h2><div className="three-cols">{(isEn ? [["01", "Frame the choice", "Define the decision, constraints, stakeholders, and threshold for action."], ["02", "Build the evidence", "Separate fact from assumption and test the trade-offs that matter."], ["03", "Design for movement", "Translate the recommendation into ownership, cadence, and value tracking."]] : [["01", "Kararı çerçevele", "Kararı, kısıtları, paydaşları ve harekete geçme eşiğini tanımlayın."], ["02", "Kanıtı oluştur", "Gerçeği varsayımdan ayırın; önem taşıyan ödünleşimleri sınayın."], ["03", "İlerlemeyi tasarla", "Öneriyi sahiplik, çalışma ritmi ve değer takibine dönüştürün."]]).map(x => <div key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></section><CTA lang={lang}/></>;
}

export function InsightsPage({ lang }: { lang: Lang }) {
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
  return <><PageHero eyebrow={isEn ? "INSIGHTS" : "İÇGÖRÜLER"} title={isEn ? "Ideas made for use." : "Kullanılmak için geliştirilen fikirler."} intro={isEn ? "Decision notes, research perspectives, and practical frameworks for growth, organization, and applied AI." : "Büyüme, organizasyon ve uygulamalı yapay zekâ için karar notları, araştırma perspektifleri ve pratik çerçeveler."}/>
    <DecisionNotes lang={lang}/><section className="insights-directory section">
      <a href={`/${lang}/${routeMap[lang].article}`}><span>01</span><div><small>{isEn ? "CONTROLLED READING DEPTH" : "KONTROLLÜ OKUMA DERİNLİĞİ"}</small><h2>{isEn ? "Executive reading modes" : "Yönetici okuma modları"}</h2><p>{isEn ? "Move between a 90-second view, executive implications, full analysis, and evidence." : "90 saniyelik bakış, yönetici çıkarımları, tam analiz ve kanıt arasında geçiş yapın."}</p></div><i>↗</i></a>
      <a href={`/${lang}/${routeMap[lang].decisionFramer}`}><span>02</span><div><small>{isEn ? "FROM READING TO ACTION" : "OKUMADAN UYGULAMAYA"}</small><h2>{isEn ? "Decision Framer" : "Karar Çerçeveleyici"}</h2><p>{isEn ? "Turn an insight into a structured decision brief." : "Bir içgörüyü yapılandırılmış karar özetine dönüştürün."}</p></div><i>↗</i></a>
    </section>
    <nav className="insight-taxonomy" aria-label={isEn ? "Insight categories" : "İçgörü kategorileri"}>{insightCategories[lang].map((category) => <a key={category.key} href={`/${lang}/${routeMap[lang][category.key]}`}>{category.label}</a>)}</nav>
    <section className="section filter-row"><div><button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>{isEn ? "All" : "Tümü"}</button>{[...new Set(insights[lang].map(x => x[2]))].map(x => <button className={filter === x ? "active" : ""} key={x} onClick={() => setFilter(x)}>{x}</button>)}</div><label><span>{isEn ? "Search" : "Ara"}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={isEn ? "Search insights" : "İçgörülerde ara"}/></label></section>
    <section className="section publication-list">{list.length ? list.map(({ item: x, index }, displayIndex) => <article key={x[0]}><span>0{displayIndex + 1}</span><div><p className="meta">{x[4]} · {x[3]} · {insightArticles[lang][index].dateLabel} · {insightArticles[lang][index].author}</p><h2>{x[0]}</h2><p>{x[1]}</p><A href={insightHref(lang, index)} dataEvent="insight_viewed">{ui[lang].read}</A></div><div className={`mini-art art-${index}`} aria-hidden="true"><i/><b/></div></article>) : <div className="insight-empty" role="status"><span className="eyebrow">{isEn ? "NO MATCHES" : "EŞLEŞME YOK"}</span><h2>{isEn ? "No perspective matches this search." : "Bu aramayla eşleşen bir perspektif yok."}</h2><button type="button" className="text-link" onClick={() => { setFilter("all"); setQuery(""); }}>{isEn ? "Clear search" : "Aramayı temizleyin"} →</button></div>}</section><PdfInsightHubCards lang={lang}/></>;
}

export function InsightCategoryPage({ lang, kind }: { lang: Lang; kind: string }) {
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

export function AboutPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const principles = isEn ? ["Frame the decision before starting the analysis", "Separate evidence from assumption", "Make trade-offs explicit", "Adapt the answer to the context", "Design for execution from the beginning", "Use technology where it improves judgment", "Maintain discretion", "Measure progress through value, not activity"] : ["Analize başlamadan önce kararı doğru çerçevelemek", "Kanıtı varsayımdan ayırmak", "Ödünleşimleri görünür kılmak", "Yanıtı bağlama göre şekillendirmek", "Uygulamayı en baştan tasarlamak", "Teknolojiyi muhakemeyi geliştirdiği yerde kullanmak", "Gizliliği ve ölçülülüğü korumak", "İlerlemeyi faaliyetle değil, değerle ölçmek"];
  const evidence = isEn ? [
    ["Strategy & business development", "Previously Chief Strategy and Business Development Officer at Tay Group."],
    ["Strategic decision research", "Research explores leadership styles, advice-seeking behavior, and the speed and quality of strategic decisions."],
    ["Academic practice", "Assistant Professor at İstanbul Kent University, connecting management questions with technology and education."],
  ] : [
    ["Strateji ve iş geliştirme", "Daha önce Tay Group’ta Chief Strategy and Business Development Officer olarak görev yaptı."],
    ["Stratejik karar araştırmaları", "Araştırmaları liderlik stilleri, tavsiye arama davranışı ile stratejik kararların hızı ve kalitesini inceler."],
    ["Akademik çalışma", "İstanbul Kent Üniversitesinde Dr. Öğr. Üyesi olarak yönetim sorularını teknoloji ve eğitimle buluşturur."],
  ];
  return <>
    <PageHero eyebrow={isEn ? "ABOUT" : "HAKKIMIZDA"} title={isEn ? "Independent thinking for decisions that do not fit a template." : "Bir şablona sığmayan kararlar için bağımsız düşünce."} intro={isEn ? "Ganrich Advisory is an independent strategy and EU-readiness advisory for Turkish manufacturers and exporters: the firms whose EU buyers now ask for emissions, product and supply-chain data, and whose leadership teams are deciding where to grow next." : "Ganrich Advisory, Türk üretici ve ihracatçılar için bağımsız strateji ve AB uyum danışmanlığıdır: AB alıcıları artık emisyon, ürün ve tedarik zinciri verisi isteyen ve bir sonraki büyüme adımını belirleyen firmalar için."}/>
    <section className="section belief"><span className="eyebrow">{isEn ? "WHAT WE BELIEVE" : "NEYE İNANIYORUZ"}</span><h2>{isEn ? "The best answer is rigorous enough to trust and practical enough to use." : "En iyi yanıt, güvenilecek kadar titiz; kullanılacak kadar uygulanabilirdir."}</h2><p>{isEn ? "Every engagement starts with one question and a first step that produces evidence: a readiness check, a data map or a decision brief that your team can act on before committing to more." : "Her çalışma tek bir soruyla ve kanıt üreten bir ilk adımla başlar: ekibinizin daha fazlasını taahhüt etmeden önce üzerinde çalışabileceği bir hazırlık testi, veri haritası veya karar notu."}</p></section>
    <section className="section founder" id="ahmed-furkan-gul">
      <div className="founder-mark"><picture><source srcSet="/people/ahmed-furkan-gul.webp" type="image/webp"/><img src="/people/ahmed-furkan-gul.jpg" alt={isEn ? "Portrait of Ahmed Furkan Gul" : "Ahmed Furkan Gül portresi"} width={900} height={1125} loading="lazy" decoding="async"/></picture><i aria-hidden="true">01</i><small aria-hidden="true">{isEn ? "FOUNDER" : "KURUCU"}</small></div>
      <div className="founder-profile">
        <header><span className="eyebrow">{isEn ? "FOUNDER" : "KURUCU"}</span><h2>{isEn ? "Ahmed Furkan Gul" : "Ahmed Furkan Gül"}</h2><p>{isEn ? "Founder, Ganrich Advisory · Istanbul, Türkiye" : "Kurucu, Ganrich Advisory · İstanbul, Türkiye"}</p></header>
        <div className="founder-bio">
          <p>{isEn ? "Ahmed Furkan Gul works at the intersection of corporate strategy, business development, strategic decision-making, and applied technology. Across executive and academic settings, his focus is on helping leaders frame consequential choices, challenge assumptions, and translate evidence into action." : "Ahmed Furkan Gül; kurumsal strateji, iş geliştirme, stratejik karar alma ve uygulamalı teknolojinin kesişiminde çalışır. Yönetici ve akademik ortamlarda, liderlerin kritik tercihleri çerçevelemesine, varsayımları sınamasına ve kanıtı eyleme dönüştürmesine odaklanır."}</p>
          <p>{isEn ? "He previously served as Chief Strategy and Business Development Officer at Tay Group. His research at Yeditepe University examines how leadership styles and advice-seeking behavior influence strategic decision outcomes. He also serves as an Assistant Professor at İstanbul Kent University." : "Daha önce Tay Group’ta Chief Strategy and Business Development Officer olarak görev yaptı. Yeditepe Üniversitesindeki araştırmaları, liderlik stilleri ve tavsiye arama davranışının stratejik karar sonuçlarını nasıl etkilediğini inceler. Aynı zamanda İstanbul Kent Üniversitesinde Dr. Öğr. Üyesi olarak görev yapmaktadır."}</p>
        </div>
        <div className="founder-evidence">{evidence.map((item, i) => <article key={item[0]}><span>0{i + 1}</span><strong>{item[0]}</strong><p>{item[1]}</p></article>)}</div>
        <div className="founder-links">
          <a className="button outline" href="https://www.linkedin.com/in/furkangul/" target="_blank" rel="noreferrer">{isEn ? "View LinkedIn profile" : "LinkedIn profilini görüntüleyin"} <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="https://avesis.kent.edu.tr/ahmedfurkan.gul" target="_blank" rel="noreferrer">{isEn ? "Academic profile" : "Akademik profil"} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
    <FounderWorking lang={lang}/>
    <section className="section principles"><SectionHead label={isEn ? "WORKING PRINCIPLES" : "ÇALIŞMA İLKELERİ"} title={isEn ? "A disciplined way of seeing the work." : "Çalışmaya disiplinli bir bakış."}/><ol>{principles.map((p, i) => <li key={p}><span>0{i+1}</span><p>{p}</p></li>)}</ol></section>
    <CTA lang={lang}/>
  </>;
}

function CTA({ lang }: { lang: Lang }) { const t = ui[lang]; return <section className="cta-band compact-band"><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><a className="button light" href={`/${lang}/${routeMap[lang].contact}`}>{t.cta}</a></section>; }
