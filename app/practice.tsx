import { expertise, insightArticles, insightHref, insightIndex, Lang, routeMap } from "./content";
import { corridor, Engagement, engagementByKey, engagements, founder, situations, workingModel } from "./practice-content";
import { External, Go, Label, NextStep, PracticeHero } from "./practice-ui";

export { External, Go, NextStep, PracticeHero } from "./practice-ui";

/*
 * Practice pages: homepage, expertise and engagement detail, how we work, markets, and about.
 * Rendered on the server (no client hooks); shared UI pieces live in practice-ui.tsx.
 * Internal navigation uses →; external destinations use ↗; disclosure controls use +.
 */

const href = (lang: Lang, key: string) => `/${lang}/${routeMap[lang][key]}`;

export function Portrait({ className = "p-portrait", eager = false }: { className?: string; eager?: boolean }) {
  const { webp, jpg, width, height } = founder.portrait;
  return <picture className={className}><source srcSet={webp} type="image/webp"/><img src={jpg} width={width} height={height} alt={founder.name} loading={eager ? "eager" : "lazy"} decoding="async"/></picture>;
}

function FounderSignature({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const isEn = lang === "en";
  const copy = founder[lang];
  return <div className={compact ? "p-founder compact" : "p-founder"}>
    <Portrait/>
    <div>
      <h3>{founder.name}</h3>
      <p className="p-founder-role">{copy.role}</p>
      <p>{copy.short}</p>
      {!compact && <ul className="p-facts">{copy.facts.map(([title, body]) => <li key={title}><strong>{title}</strong><span>{body}</span></li>)}</ul>}
      <div className="p-inline-links"><Go to={`${href(lang, "about")}#founder`}>{isEn ? "Full profile" : "Profilin tamamı"}</Go><External to={founder.linkedin}>LinkedIn</External></div>
    </div>
  </div>;
}

function IllustrativeTag({ lang }: { lang: Lang }) {
  return <span className="p-tag">{lang === "en" ? "Illustrative example · fictional company · not client work" : "Örnek çalışma · kurgusal şirket · müşteri çalışması değildir"}</span>;
}

/* An annotated excerpt of a market-entry decision memo. Every name and value is fictional. */
export function SampleMemo({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const rows = isEn
    ? [["Distributor", "Low", "Low", "Fast", "Limited"], ["Partnership", "Shared", "Medium", "Medium", "Good"], ["Own entity", "High", "High", "Slow", "Strongest"]]
    : [["Distribütör", "Düşük", "Düşük", "Hızlı", "Sınırlı"], ["Ortaklık", "Paylaşılan", "Orta", "Orta", "İyi"], ["Kendi şirketi", "Yüksek", "Yüksek", "Yavaş", "En güçlü"]];
  const heads = isEn ? ["Route", "Control", "Upfront cost", "Speed to customers", "Learning"] : ["Rota", "Kontrol", "İlk maliyet", "Müşteriye ulaşma hızı", "Öğrenme"];
  const assumptions = isEn
    ? [["Two UAE contractors will specify our valves within a year", "Partly evidenced"], ["A distributor will accept performance gates", "Untested"], ["Certification can be obtained without local production", "Evidenced"]]
    : [["İki BAE’li yüklenici bir yıl içinde vanalarımızı projelerine yazacak", "Kısmen kanıtlı"], ["Bir distribütör performans kapılarını kabul edecek", "Sınanmadı"], ["Sertifikasyon yerel üretim olmadan alınabilir", "Kanıtlı"]];
  const stages = isEn
    ? [["Stage 1", "Appoint a UAE distributor with limited exclusivity and quarterly performance gates."], ["Stage 2", "If two project specifications are won, add a technical sales lead in Dubai."], ["Stage 3", "Revisit a Saudi entity only after UAE margins and service costs are known."]]
    : [["1. Aşama", "Sınırlı münhasırlık ve üç aylık performans kapılarıyla bir BAE distribütörü atayın."], ["2. Aşama", "İki proje şartnamesine girilirse Dubai’ye bir teknik satış yöneticisi ekleyin."], ["3. Aşama", "Suudi Arabistan’da şirket kurmayı ancak BAE marjları ve hizmet maliyetleri netleştiğinde yeniden değerlendirin."]];
  return <figure className="p-memo" aria-labelledby="sample-memo-title">
    <IllustrativeTag lang={lang}/>
    <header>
      <small>{isEn ? "Decision memo · excerpt" : "Karar notu · bölüm"}</small>
      <h3 id="sample-memo-title">{isEn ? "First Gulf market for a mid-sized valve manufacturer" : "Orta ölçekli bir vana üreticisi için ilk Körfez pazarı"}</h3>
    </header>
    <dl className="p-memo-lead">
      <div><dt>{isEn ? "Decision" : "Karar"}</dt><dd>{isEn ? "Choose the first Gulf market and the entry route for the industrial valve line." : "Endüstriyel vana grubu için ilk Körfez pazarını ve giriş rotasını seçmek."}</dd></div>
      <div><dt>{isEn ? "Recommendation" : "Öneri"}</dt><dd>{isEn ? "Start in the UAE through a distributor with performance gates; prepare, but do not yet commit to, a Saudi entity." : "BAE’de performans kapılı bir distribütörle başlayın; Suudi Arabistan’da şirket kurmaya hazırlanın ama henüz taahhüt vermeyin."}</dd></div>
    </dl>
    <div className="p-table-wrap" tabIndex={0} role="region" aria-label={isEn ? "Entry alternatives (scrollable)" : "Giriş alternatifleri (kaydırılabilir)"}>
      <table className="p-table">
        <caption>{isEn ? "Entry alternatives for the UAE" : "BAE için giriş alternatifleri"}</caption>
        <thead><tr>{heads.map((head) => <th key={head} scope="col">{head}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
    <div className="p-memo-grid">
      <section><h4>{isEn ? "Assumptions register" : "Varsayım kaydı"}</h4><ul>{assumptions.map(([text, status]) => <li key={text}><span>{text}</span><em>{status}</em></li>)}</ul></section>
      <section><h4>{isEn ? "Sequence of commitments" : "Taahhüt sırası"}</h4><ol>{stages.map(([stage, text]) => <li key={stage}><strong>{stage}</strong><span>{text}</span></li>)}</ol></section>
    </div>
    <figcaption>{isEn ? "A real memo is longer and records sources, owners and dates for each assumption. This excerpt shows the structure, not a finding." : "Gerçek bir not daha uzundur ve her varsayım için kaynakları, sorumluları ve tarihleri içerir. Bu bölüm bir bulgu değil, yapıyı gösterir."}</figcaption>
  </figure>;
}

function DecisionRightsExhibit({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const rows = isEn
    ? [["Approve annual budget", "Founder", "Board"], ["Hire a plant manager", "Founder", "CEO"], ["Discount above 8%", "Founder", "Sales director, within policy"], ["Enter a new country", "Founder", "Board, on CEO proposal"]]
    : [["Yıllık bütçeyi onaylamak", "Kurucu", "Yönetim kurulu"], ["Fabrika müdürü işe almak", "Kurucu", "Genel müdür"], ["%8 üzeri iskonto", "Kurucu", "Satış direktörü, politika dâhilinde"], ["Yeni bir ülkeye girmek", "Kurucu", "Yönetim kurulu, genel müdür önerisiyle"]];
  return <figure className="p-exhibit">
    <IllustrativeTag lang={lang}/>
    <div className="p-table-wrap" tabIndex={0} role="region" aria-label={isEn ? "Decision-rights map (scrollable)" : "Karar hakları haritası (kaydırılabilir)"}>
      <table className="p-table">
        <caption>{isEn ? "Decision-rights map · excerpt" : "Karar hakları haritası · bölüm"}</caption>
        <thead><tr><th scope="col">{isEn ? "Decision" : "Karar"}</th><th scope="col">{isEn ? "Decides today" : "Bugün karar veren"}</th><th scope="col">{isEn ? "Proposed" : "Önerilen"}</th></tr></thead>
        <tbody>{rows.map((row) => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody>
      </table>
    </div>
  </figure>;
}

function AiTriageExhibit({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const columns: Array<[string, string[]]> = isEn
    ? [["Test now", ["Quote pricing for repeat customers", "Production scheduling exceptions"]], ["Fix foundations first", ["Demand forecasting: item master is inconsistent", "Supplier risk: no agreed owner"]], ["Set aside", ["Generic chatbot for the website"]]]
    : [["Şimdi test et", ["Tekrar eden müşteriler için teklif fiyatlama", "Üretim planlaması istisnaları"]], ["Önce temeli düzelt", ["Talep tahmini: ürün ana verisi tutarsız", "Tedarikçi riski: sorumlu belirlenmemiş"]], ["Şimdilik bırak", ["Web sitesi için genel sohbet botu"]]];
  return <figure className="p-exhibit">
    <IllustrativeTag lang={lang}/>
    <figcaption className="p-exhibit-title">{isEn ? "Opportunity triage · excerpt" : "Fırsat ayrıştırması · bölüm"}</figcaption>
    <div className="p-triage">{columns.map(([title, items]) => <section key={title}><h4>{title}</h4><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>
  </figure>;
}

function EngagementCard({ lang, item }: { lang: Lang; item: Engagement }) {
  const isEn = lang === "en";
  return <article className="p-engagement">
    <span className="p-index">{item.index}</span>
    <h3><a href={href(lang, item.key)}>{item.name}</a></h3>
    <p>{item.short}</p>
    <p className="p-engagement-out"><strong>{isEn ? "You receive" : "Size teslim edilenler"}</strong>{item.deliverables.slice(0, 4).map(([title]) => title).join(" · ")}</p>
    <Go to={href(lang, item.key)}>{isEn ? "Scope, process and deliverables" : "Kapsam, süreç ve çıktılar"}</Go>
  </article>;
}

export function HomePage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const featuredIndex = insightIndex("articleCorridor");
  const featured = insightArticles[lang][featuredIndex];
  const proof = isEn
    ? [["Founder-led", "Every engagement is led by Ahmed Furkan Gul personally."], ["Corporate strategy", "Former Chief Strategy and Business Development Officer, Tay Group."], ["Decision research", "Research on what shapes the speed and quality of strategic decisions."], ["Bilingual", "Work and written output in Turkish and English."]]
    : [["Kurucu liderliğinde", "Her çalışmayı Ahmed Furkan Gul bizzat yürütür."], ["Kurumsal strateji", "Tay Group’un eski Strateji ve İş Geliştirme Direktörü."], ["Karar araştırmaları", "Stratejik kararların hızını ve kalitesini neyin belirlediğine dair araştırmalar."], ["İki dilli", "Türkçe ve İngilizce çalışma ve yazılı çıktılar."]];
  return <>
    <section className="p-home-hero">
      <div className="p-home-hero-copy">
        <Label>{isEn ? "Founder-led strategy advisory · Istanbul" : "Kurucu liderliğinde strateji danışmanlığı · İstanbul"}</Label>
        <h1>{isEn ? "Independent strategy advice for the next stage of growth." : "Büyümenin bir sonraki aşaması için bağımsız strateji danışmanlığı."}</h1>
        <p>{isEn ? "Ganrich Advisory works with owners and leadership teams of established companies in Türkiye on three kinds of decision: where to grow beyond Türkiye, how to run a business that has outgrown its founding structure, and where AI is worth the investment." : "Ganrich Advisory, Türkiye’deki köklü şirketlerin sahipleri ve yönetim ekipleriyle üç tür karar üzerinde çalışır: Türkiye dışında nerede büyüneceği, kurulduğu yapının ötesine geçmiş bir şirketin nasıl yönetileceği ve yapay zekânın nerede yatırıma değeceği."}</p>
        <div className="hero-actions"><a className="button" href={href(lang, "contact")} data-analytics-event="contact_started">{isEn ? "Discuss your situation" : "Durumunuzu konuşalım"}</a><Go to={href(lang, "expertise")}>{isEn ? "See the three engagements" : "Üç çalışma biçimini inceleyin"}</Go></div>
      </div>
      <DecisionDiagram lang={lang}/>
    </section>

    <section className="p-proof" aria-label={isEn ? "Why Ganrich" : "Neden Ganrich"}>
      <ul>{proof.map(([title, body]) => <li key={title}><strong>{title}</strong><span>{body}</span></li>)}</ul>
    </section>

    <section className="p-section">
      <div className="p-section-head"><Label>{isEn ? "When clients call" : "Ne zaman arıyorlar"}</Label><h2>{isEn ? "Three situations we work on." : "Üzerinde çalıştığımız üç durum."}</h2><p>{isEn ? "If one of these sounds familiar, the first conversation usually starts here." : "Bunlardan biri tanıdık geliyorsa ilk görüşme genellikle buradan başlar."}</p></div>
      <ol className="p-situations">{situations[lang].map((situation, index) => {
        const engagement = engagementByKey(lang, situation.engagement)!;
        return <li key={situation.title}>
          <span className="p-index">0{index + 1}</span>
          <h3>{situation.title}</h3>
          <p>{situation.body}</p>
          <ul>{situation.signals.map((signal) => <li key={signal}>{signal}</li>)}</ul>
          <Go to={href(lang, engagement.key)}>{engagement.name}</Go>
        </li>;
      })}</ol>
    </section>

    <section className="p-section p-band">
      <div className="p-section-head"><Label>{isEn ? "Engagements" : "Çalışma biçimleri"}</Label><h2>{isEn ? "Defined work with a written result." : "Yazılı bir sonuçla biten, tanımlı çalışmalar."}</h2><p>{isEn ? "Each engagement is organised around one decision and ends in a document your board can act on. Scope and fees are agreed in writing after a first conversation." : "Her çalışma tek bir karar etrafında kurgulanır ve yönetim kurulunuzun üzerine işlem yapabileceği bir belgeyle tamamlanır. Kapsam ve ücret, ilk görüşmeden sonra yazılı olarak belirlenir."}</p></div>
      <div className="p-engagements">{engagements[lang].map((item) => <EngagementCard key={item.key} lang={lang} item={item}/>)}</div>
      <p className="p-more">{isEn ? "Other strategy questions, such as portfolio choices or programme governance, are taken on case by case." : "Portföy tercihleri ya da program yönetişimi gibi diğer strateji soruları duruma göre ele alınır."} <Go to={`${href(lang, "expertise")}#other-areas`}>{isEn ? "Other areas" : "Diğer alanlar"}</Go></p>
    </section>

    <section className="p-section p-sample">
      <div className="p-section-head"><Label>{isEn ? "What the work looks like" : "Çalışmanın çıktısı"}</Label><h2>{isEn ? "A sample of the output." : "Çıktıdan bir örnek."}</h2><p>{isEn ? "Ganrich does not publish client work. This fictional excerpt shows the kind of decision memo a Market Entry Decision Sprint produces: the recommendation, the alternatives, the assumptions it rests on, and the order of commitments." : "Ganrich müşteri çalışmalarını yayımlamaz. Bu kurgusal bölüm, bir Pazara Giriş Karar Sprinti’nin ürettiği karar notunun yapısını gösterir: öneri, alternatifler, dayandığı varsayımlar ve taahhütlerin sırası."}</p><Go to={href(lang, "howWeWork")}>{isEn ? "How we work and more examples" : "Çalışma biçimimiz ve diğer örnekler"}</Go></div>
      <SampleMemo lang={lang}/>
    </section>

    <section className="p-section p-founder-section" id="founder-intro">
      <div className="p-section-head"><Label>{isEn ? "Who you work with" : "Kiminle çalışırsınız"}</Label><h2>{isEn ? "One accountable advisor, from first call to final memo." : "İlk görüşmeden son nota kadar sorumluluğu üstlenen tek danışman."}</h2></div>
      <FounderSignature lang={lang}/>
      <ul className="p-working">{workingModel[lang].slice(0, 3).map(([title, body]) => <li key={title}><strong>{title}</strong><p>{body}</p></li>)}</ul>
    </section>

    <section className="p-section p-pair">
      <article className="p-pair-item">
        <Label>{isEn ? "From the Ganrich Brief" : "Ganrich Bülteni’nden"}</Label>
        <p className="meta">{featured.type} · <time dateTime={featured.date}>{featured.dateLabel}</time> · {featured.readingTime}</p>
        <h2><a href={insightHref(lang, featuredIndex)}>{featured.title}</a></h2>
        <p>{featured.thesis}</p>
        <Go to={insightHref(lang, featuredIndex)} event="insight_viewed">{isEn ? "Read the briefing" : "Bülteni okuyun"}</Go>
      </article>
      <article className="p-pair-item p-pair-tool">
        <Label>{isEn ? "Decision Lab · free tool" : "Karar Laboratuvarı · ücretsiz araç"}</Label>
        <p className="meta">{isEn ? "About 5 minutes · runs in your browser · nothing is sent to Ganrich" : "Yaklaşık 5 dakika · tarayıcınızda çalışır · Ganrich’e hiçbir şey gönderilmez"}</p>
        <h2><a href={href(lang, "marketCompass")}>{isEn ? "Market Entry Compass" : "Pazara Giriş Pusulası"}</a></h2>
        <p>{isEn ? "Compare two candidate markets on attractiveness, fit, readiness and execution risk, using weights you set. The scoring is shown, so you can argue with it." : "İki aday pazarı cazibe, uyum, hazırlık ve uygulama riski açısından, ağırlıkları sizin belirlediğiniz bir puanlamayla karşılaştırın. Hesaplama açıkça gösterilir; itiraz edebilirsiniz."}</p>
        <Go to={href(lang, "marketCompass")} event="decision_tool_started">{isEn ? "Open the Compass" : "Pusulayı açın"}</Go>
      </article>
    </section>

    <NextStep lang={lang}/>
  </>;
}

/* A quiet, static diagram: three situations converging on one decision, then staged commitments. */
function DecisionDiagram({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const inputs = isEn ? ["Expansion", "Operating model", "AI value"] : ["Büyüme", "İşletim modeli", "Yapay zekâ değeri"];
  const stages = isEn ? ["Gate 1", "Gate 2", "Gate 3"] : ["Kapı 1", "Kapı 2", "Kapı 3"];
  return <figure className="p-diagram" aria-hidden="true">
    <svg viewBox="0 0 420 360" role="presentation" focusable="false">
      <g className="d-lines">
        <path d="M60 70 C 170 70, 170 180, 210 180"/><path d="M60 180 L 210 180"/><path d="M60 290 C 170 290, 170 180, 210 180"/>
        <path d="M210 180 L 380 180" className="d-main"/>
      </g>
      <g className="d-nodes"><circle cx="60" cy="70" r="5"/><circle cx="60" cy="180" r="5"/><circle cx="60" cy="290" r="5"/><circle cx="210" cy="180" r="9" className="d-decision"/></g>
      <g className="d-gates">{[270, 320, 370].map((x) => <rect key={x} x={x - 4} y={164} width="8" height="32"/>)}</g>
    </svg>
    <ul className="p-diagram-inputs">{inputs.map((input) => <li key={input}>{input}</li>)}</ul>
    <span className="p-diagram-decision">{isEn ? "One named decision" : "Adı konmuş tek karar"}</span>
    <ul className="p-diagram-gates">{stages.map((stage) => <li key={stage}>{stage}</li>)}</ul>
  </figure>;
}

const otherAreaLinks: Array<string | null> = [null, "serviceMarketEntry", "serviceOperatingModel", "serviceAiValue", "serviceOperatingModel", null];

export function ExpertisePage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  return <>
    <PracticeHero eyebrow={isEn ? "Expertise" : "Uzmanlık"} title={isEn ? "Three engagements, each built around one decision." : "Her biri tek bir karar etrafında kurulu üç çalışma biçimi."} intro={isEn ? "Most clients come to Ganrich with one of three questions: where to expand, how to organise for the next stage, or where AI will pay off. Each has a defined engagement with clear deliverables and boundaries." : "Müşterilerin çoğu Ganrich’e üç sorudan biriyle gelir: nerede büyümeli, bir sonraki aşama için nasıl örgütlenmeli, yapay zekâ nerede karşılığını verir? Her biri için çıktıları ve sınırları belli, tanımlı bir çalışma biçimi var."}/>
    <section className="p-section p-engagement-list">
      {engagements[lang].map((item) => <article key={item.key} className="p-engagement-row">
        <span className="p-index">{item.index}</span>
        <div><h2><a href={href(lang, item.key)}>{item.name}</a></h2><p className="p-lead">{item.short}</p></div>
        <div>
          <p className="p-row-label">{isEn ? "Typical situation" : "Tipik durum"}</p><p>{item.situationTitle}</p>
          <p className="p-row-label">{isEn ? "Main deliverables" : "Başlıca çıktılar"}</p><p>{item.deliverables.map(([title]) => title).join(" · ")}</p>
          <Go to={href(lang, item.key)}>{isEn ? "Read the full scope" : "Kapsamın tamamını okuyun"}</Go>
        </div>
      </article>)}
    </section>
    <section className="p-section p-band" aria-labelledby="approach-title">
      <div className="p-section-head"><Label>{isEn ? "How every engagement runs" : "Her çalışma nasıl ilerler"}</Label><h2 id="approach-title">{isEn ? "Same discipline, different decisions." : "Aynı disiplin, farklı kararlar."}</h2></div>
      <ul className="p-working">{workingModel[lang].map(([title, body]) => <li key={title}><strong>{title}</strong><p>{body}</p></li>)}</ul>
      <Go to={href(lang, "howWeWork")}>{isEn ? "How we work" : "Çalışma biçimimiz"}</Go>
    </section>
    <section className="p-section" id="other-areas" aria-labelledby="other-areas-title">
      <div className="p-section-head"><Label>{isEn ? "Other areas" : "Diğer alanlar"}</Label><h2 id="other-areas-title">{isEn ? "Broader strategy work, taken on selectively." : "Seçici olarak üstlenilen daha geniş strateji çalışmaları."}</h2><p>{isEn ? "These capabilities support the three engagements and are sometimes the subject of work in their own right. Expand a row to see the question it answers." : "Bu yetkinlikler üç çalışma biçimini destekler ve zaman zaman başlı başına bir çalışmanın konusu olur. Hangi soruyu yanıtladığını görmek için bir satırı açın."}</p></div>
      <div className="p-areas">{expertise[lang].map((area, index) => {
        const link = otherAreaLinks[index];
        const related = link ? engagementByKey(lang, link) : null;
        return <details key={area[0]} className="p-area">
          <summary><span className="p-index">0{index + 1}</span><span className="p-area-title">{area[0]}</span><span className="p-plus" aria-hidden="true">+</span></summary>
          <div className="p-area-body">
            <p>{area[1]}</p>
            <p><strong>{isEn ? "Question" : "Soru"}</strong>{area[2]}</p>
            <p><strong>{isEn ? "Typical work" : "Tipik çalışma"}</strong>{area[3]}</p>
            {related ? <Go to={href(lang, related.key)}>{isEn ? `Related: ${related.name}` : `İlgili: ${related.name}`}</Go> : <Go to={href(lang, "contact")}>{isEn ? "Discuss this area" : "Bu alanı konuşalım"}</Go>}
          </div>
        </details>;
      })}</div>
    </section>
    <NextStep lang={lang}/>
  </>;
}

export function EngagementPage({ lang, kind }: { lang: Lang; kind: string }) {
  const isEn = lang === "en";
  const item = engagementByKey(lang, kind);
  if (!item) return null;
  const others = engagements[lang].filter((other) => other.key !== item.key);
  const insightIdx = insightIndex(item.insightKey);
  const sections = isEn
    ? [["situation", "Situation"], ["fit", "Who it is for"], ["questions", "Questions"], ["process", "Process"], ["deliverables", "Deliverables"], ["boundaries", "Boundaries"]]
    : [["situation", "Durum"], ["fit", "Kimler için"], ["questions", "Sorular"], ["process", "Süreç"], ["deliverables", "Çıktılar"], ["boundaries", "Sınırlar"]];
  return <>
    <PracticeHero eyebrow={isEn ? `Engagement ${item.index}` : `Çalışma biçimi ${item.index}`} title={item.name} intro={item.short}>
      <div className="hero-actions"><a className="button" href={`${href(lang, "contact")}?topic=${item.key}`} data-analytics-event="contact_started">{item.contactPrompt}</a><Go to="#deliverables">{isEn ? "See the deliverables" : "Çıktıları görün"}</Go></div>
    </PracticeHero>
    <div className="p-detail">
      <nav className="p-detail-nav" aria-label={isEn ? "On this page" : "Bu sayfada"}><strong>{isEn ? "On this page" : "Bu sayfada"}</strong>{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <div className="p-detail-body">
        <section id="situation"><Label>{isEn ? "The situation" : "Durum"}</Label><h2>{item.situationTitle}</h2>{item.situation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="p-callout"><strong>{isEn ? "The decision this supports" : "Desteklediği karar"}</strong><p>{item.decision}</p></div></section>
        <section id="fit" className="p-two"><div><h3>{isEn ? "A good fit for" : "Kimler için uygun"}</h3><ul className="p-list">{item.forWho.map((entry) => <li key={entry}>{entry}</li>)}</ul></div><div><h3>{isEn ? "Not the right engagement for" : "Kimler için uygun değil"}</h3><ul className="p-list p-list-muted">{item.notFor.map((entry) => <li key={entry}>{entry}</li>)}</ul></div></section>
        <section id="questions"><Label>{isEn ? "Typical questions" : "Tipik sorular"}</Label><ol className="p-questions">{item.questions.map((question) => <li key={question}>{question}</li>)}</ol></section>
        <section id="process"><Label>{isEn ? "Scope and process" : "Kapsam ve süreç"}</Label><h2>{isEn ? "How the work runs" : "Çalışma nasıl ilerler"}</h2><ol className="p-process">{item.process.map(([step, body], index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong><p>{body}</p></li>)}</ol><p className="p-note">{isEn ? "Scope, timing and fees depend on the decision and are agreed in a short written proposal after the first conversation." : "Kapsam, zamanlama ve ücret karara göre değişir; ilk görüşmenin ardından kısa bir yazılı teklifle belirlenir."}</p></section>
        <section><h3>{isEn ? "What we need from you" : "Sizden beklenenler"}</h3><ul className="p-list">{item.participation.map((entry) => <li key={entry}>{entry}</li>)}</ul></section>
        <section id="deliverables"><Label>{isEn ? "Deliverables" : "Çıktılar"}</Label><h2>{isEn ? "What you receive" : "Size teslim edilenler"}</h2><dl className="p-deliverables">{item.deliverables.map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl>
          {item.key === "serviceMarketEntry" && <SampleMemo lang={lang}/>}
          {item.key === "serviceOperatingModel" && <DecisionRightsExhibit lang={lang}/>}
          {item.key === "serviceAiValue" && <AiTriageExhibit lang={lang}/>}
        </section>
        <section id="boundaries" className="p-callout p-callout-quiet"><strong>{isEn ? "Boundaries" : "Sınırlar"}</strong><p>{isEn ? "Ganrich gives strategic advice. It does not provide legal, tax, audit, investment or transaction advice, and will say early when a question needs one of those specialists." : "Ganrich stratejik danışmanlık verir. Hukuki, vergisel, denetim, yatırım veya işlem danışmanlığı sunmaz; bir soru bu uzmanlıklardan birini gerektirdiğinde bunu erkenden söyler."}</p></section>
        <section className="p-founder-inline"><Label>{isEn ? "Who leads it" : "Kim yürütür"}</Label><FounderSignature lang={lang} compact/></section>
        <section className="p-related"><Label>{isEn ? "Related reading and tools" : "İlgili içerik ve araçlar"}</Label>
          <ul>
            <li><small>{isEn ? "Perspective" : "Bakış"}</small><Go to={insightHref(lang, insightIdx)}>{item.insightLabel}</Go></li>
            <li><small>{isEn ? "Decision Lab tool" : "Karar Laboratuvarı aracı"}</small><Go to={href(lang, item.toolKey)}>{item.toolLabel}</Go></li>
            {item.key === "serviceMarketEntry" && <li><small>{isEn ? "Corridor" : "Koridor"}</small><Go to={href(lang, "markets")}>{isEn ? "Türkiye → Gulf: what has changed" : "Türkiye → Körfez: neler değişti"}</Go></li>}
            {others.map((other) => <li key={other.key}><small>{isEn ? "Other engagement" : "Diğer çalışma"}</small><Go to={href(lang, other.key)}>{other.name}</Go></li>)}
          </ul>
        </section>
      </div>
    </div>
    <NextStep lang={lang} title={isEn ? `Considering a ${item.name}?` : `${item.name} mı düşünüyorsunuz?`} prompt={item.contactPrompt}/>
  </>;
}

export function HowWeWorkPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  return <>
    <PracticeHero eyebrow={isEn ? "How we work" : "Çalışma biçimimiz"} title={isEn ? "Senior attention, explicit evidence, a written result." : "Kıdemli ilgi, açık kanıt, yazılı sonuç."} intro={isEn ? "Ganrich is deliberately small. That shapes how an engagement runs, who you speak to, and what you receive at the end." : "Ganrich bilinçli olarak küçük tutulur. Bu; çalışmanın nasıl ilerlediğini, kiminle konuştuğunuzu ve sonunda ne aldığınızı belirler."}/>
    <section className="p-section">
      <div className="p-section-head"><Label>{isEn ? "The working relationship" : "Çalışma ilişkisi"}</Label><h2>{isEn ? "What you can expect." : "Neler bekleyebilirsiniz."}</h2></div>
      <ul className="p-working p-working-full">{workingModel[lang].map(([title, body], index) => <li key={title}><span className="p-index">0{index + 1}</span><strong>{title}</strong><p>{body}</p></li>)}</ul>
    </section>
    <section className="p-section p-band">
      <div className="p-section-head"><Label>{isEn ? "Research and AI" : "Araştırma ve yapay zekâ"}</Label><h2>{isEn ? "How evidence becomes a recommendation." : "Kanıt nasıl öneriye dönüşür."}</h2></div>
      <ol className="p-evidence-flow">
        {(isEn ? [["Your knowledge", "Interviews, internal documents and data you choose to share, inside an agreed confidentiality framework."], ["Public evidence", "Official statistics, regulatory sources, company filings and published research, each dated and cited."], ["AI-assisted analysis", "Used to search, summarise, structure and test scenarios faster. Outputs are checked against sources before they are relied on, and whether AI tools may be used with your information is agreed with you at the start."], ["Judgment", "The founder frames the question, weighs trade-offs, and writes and signs off the recommendation."]] : [["Sizin bilginiz", "Görüşmeler, iç belgeler ve paylaşmayı seçtiğiniz veriler; üzerinde anlaşılan gizlilik çerçevesinde."], ["Kamuya açık kanıt", "Resmî istatistikler, mevzuat kaynakları, şirket açıklamaları ve yayımlanmış araştırmalar; her biri tarihli ve atıflı."], ["Yapay zekâ destekli analiz", "Arama, özetleme, yapılandırma ve senaryo sınamayı hızlandırmak için kullanılır. Çıktılar kullanılmadan önce kaynaklarla karşılaştırılır; bilgilerinizle yapay zekâ araçlarının kullanılıp kullanılmayacağı en başta sizinle birlikte kararlaştırılır."], ["Muhakeme", "Soruyu kurucu çerçeveler, ödünleşimleri tartar, öneriyi yazar ve onaylar."]]).map(([title, body], index) => <li key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{body}</p></li>)}
      </ol>
      <Go to={href(lang, "aiTransparency")}>{isEn ? "AI transparency statement" : "Yapay zekâ şeffaflık beyanı"}</Go>
    </section>
    <section className="p-section p-sample">
      <div className="p-section-head"><Label>{isEn ? "Sample deliverables" : "Örnek çıktılar"}</Label><h2>{isEn ? "The shape of the output." : "Çıktının biçimi."}</h2><p>{isEn ? "Client work is confidential and is not published. These fictional excerpts show the structure of typical deliverables from each engagement." : "Müşteri çalışmaları gizlidir ve yayımlanmaz. Bu kurgusal bölümler, her çalışma biçiminin tipik çıktılarının yapısını gösterir."}</p></div>
      <div className="p-samples">
        <div><h3><a href={href(lang, "serviceMarketEntry")}>{engagementByKey(lang, "serviceMarketEntry")!.name}</a></h3><SampleMemo lang={lang}/></div>
        <div><h3><a href={href(lang, "serviceOperatingModel")}>{engagementByKey(lang, "serviceOperatingModel")!.name}</a></h3><DecisionRightsExhibit lang={lang}/></div>
        <div><h3><a href={href(lang, "serviceAiValue")}>{engagementByKey(lang, "serviceAiValue")!.name}</a></h3><AiTriageExhibit lang={lang}/></div>
      </div>
    </section>
    <section className="p-section p-founder-section">
      <div className="p-section-head"><Label>{isEn ? "Who leads the work" : "Çalışmayı kim yürütür"}</Label></div>
      <FounderSignature lang={lang}/>
    </section>
    <NextStep lang={lang}/>
  </>;
}

export function MarketsPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const data = corridor[lang];
  const articleIdx = insightIndex("articleCorridor");
  return <>
    <PracticeHero eyebrow={isEn ? "Markets · Türkiye → Gulf" : "Coğrafyalar · Türkiye → Körfez"} title={isEn ? "From Türkiye to the Gulf: what has changed, and what it does not settle." : "Türkiye’den Körfez’e: neler değişti, neleri çözmedi?"} intro={isEn ? "Ganrich is based in Istanbul and works mainly with Turkish companies. The corridor we write about most is Türkiye to the Gulf, because it is where many of our clients' expansion questions currently point." : "Ganrich İstanbul merkezlidir ve ağırlıklı olarak Türk şirketleriyle çalışır. En çok yazdığımız koridor Türkiye–Körfez’dir; çünkü bugün pek çok şirketin büyüme sorusu bu yöne işaret ediyor."}/>
    <section className="p-section">
      <div className="p-section-head"><Label>{isEn ? "The client situation" : "Müşteri durumu"}</Label><h2>{isEn ? "Interest is high. The route is rarely obvious." : "İlgi yüksek. Rota nadiren açık."}</h2><p>{isEn ? "A Turkish company sees partners, customers or capital in the Gulf, often prompted by new government-level agreements. The open questions are which country first, through which model, and what must be proven before a larger commitment." : "Türk şirketleri Körfez’de çoğu zaman yeni devletler arası anlaşmaların da etkisiyle ortak, müşteri ya da sermaye fırsatı görüyor. Açık sorular ise önce hangi ülkeye, hangi modelle gidileceği ve büyük bir taahhütten önce neyin kanıtlanması gerektiği."}</p></div>
      <ol className="p-questions">{data.questions.map((question) => <li key={question}>{question}</li>)}</ol>
    </section>
    <section className="p-section p-band" aria-labelledby="observations-title">
      <div className="p-section-head"><Label>{isEn ? "Dated observations" : "Tarihli gözlemler"}</Label><h2 id="observations-title">{isEn ? "The corridor has more formal structure than it did in 2022." : "Koridor, 2022’ye göre çok daha resmî bir yapıya sahip."}</h2><p>{isEn ? "Drawn from official public sources, reviewed 24 July 2026. These are institutional developments, not evidence of demand for any particular company." : "Resmî kamu kaynaklarından derlenmiş ve 24 Temmuz 2026’da gözden geçirilmiştir. Bunlar kurumsal gelişmelerdir; belirli bir şirket için talep kanıtı değildir."}</p></div>
      <ol className="p-timeline">{data.observations.map((item) => <li key={item.dateTime}><time dateTime={item.dateTime}>{item.date}</time><p>{item.text}</p><External to={item.url}>{item.source}</External></li>)}</ol>
    </section>
    <section className="p-section">
      <div className="p-section-head"><Label>{isEn ? "Implications" : "Çıkarımlar"}</Label><h2>{isEn ? "What this means for a Turkish company." : "Bir Türk şirketi için anlamı."}</h2><p className="p-note">{isEn ? "Ganrich's interpretation, not sourced findings." : "Kaynaklı bulgu değil, Ganrich yorumudur."}</p></div>
      <ul className="p-working">{data.implications.map(([title, body]) => <li key={title}><strong>{title}</strong><p>{body}</p></li>)}</ul>
    </section>
    <section className="p-section p-related p-related-wide"><Label>{isEn ? "Go further" : "Daha fazlası"}</Label>
      <ul>
        <li><small>{isEn ? "Full briefing" : "Bültenin tamamı"}</small><Go to={insightHref(lang, articleIdx)}>{insightArticles[lang][articleIdx].title}</Go></li>
        <li><small>{isEn ? "Engagement" : "Çalışma biçimi"}</small><Go to={href(lang, "serviceMarketEntry")}>{engagementByKey(lang, "serviceMarketEntry")!.name}</Go></li>
        <li><small>{isEn ? "Tool" : "Araç"}</small><Go to={href(lang, "marketCompass")}>{isEn ? "Market Entry Compass" : "Pazara Giriş Pusulası"}</Go></li>
      </ul>
    </section>
    <section className="p-section p-other-markets">
      <h2>{isEn ? "Other markets" : "Diğer pazarlar"}</h2>
      <p>{isEn ? "We also support decisions involving Europe, the wider Middle East and North Africa, and Africa when they arise in a client's agenda. We do not publish market commentary on them until we have done the research to say something useful." : "Avrupa, daha geniş Orta Doğu ve Kuzey Afrika ile Afrika’ya ilişkin kararlar bir müşterinin gündemine girdiğinde bunları da destekliyoruz. Ancak söyleyecek faydalı bir şeyimiz olacak kadar araştırma yapmadan bu pazarlar hakkında yorum yayımlamıyoruz."}</p>
    </section>
    <NextStep lang={lang} prompt={isEn ? "Discuss a Gulf expansion question" : "Bir Körfez büyüme sorusunu konuşalım"}/>
  </>;
}

export function AboutPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const copy = founder[lang];
  const principles = isEn
    ? ["Frame the decision before starting the analysis", "Separate evidence from assumption", "Make trade-offs explicit", "Adapt the answer to the context", "Design for execution from the beginning", "Use technology where it improves judgment", "Maintain discretion", "Measure progress through value, not activity"]
    : ["Analize başlamadan önce kararı doğru çerçevelemek", "Kanıtı varsayımdan ayırmak", "Ödünleşimleri görünür kılmak", "Yanıtı bağlama göre şekillendirmek", "Uygulamayı en baştan tasarlamak", "Teknolojiyi muhakemeyi geliştirdiği yerde kullanmak", "Gizliliği ve ölçülülüğü korumak", "İlerlemeyi faaliyetle değil, değerle ölçmek"];
  return <>
    <PracticeHero eyebrow={isEn ? "About" : "Hakkımızda"} title={isEn ? "A founder-led practice, small by design." : "Kurucu liderliğinde, bilinçli olarak küçük bir danışmanlık."} intro={isEn ? "Ganrich Advisory is an independent strategy advisory based in Istanbul. It works with a small number of owners and leadership teams at a time, on decisions where senior attention matters more than team size." : "Ganrich Advisory, İstanbul merkezli bağımsız bir strateji danışmanlığıdır. Aynı anda az sayıda şirket sahibi ve yönetim ekibiyle, ekip büyüklüğünden çok kıdemli ilginin önemli olduğu kararlar üzerinde çalışır."}/>
    <section className="section founder" id="founder">
      <Portrait className="p-portrait p-portrait-large" eager/>
      <div className="founder-profile" id="ahmed-furkan-gul">
        <header><Label>{isEn ? "Founder" : "Kurucu"}</Label><h2>{founder.name}</h2><p>{copy.role}</p></header>
        <div className="founder-bio">
          <p>{isEn ? "Ahmed Furkan Gul works at the intersection of corporate strategy, business development, strategic decision-making and applied technology. Across executive and academic settings, his focus is on helping leaders frame important choices, challenge assumptions and turn evidence into action." : "Ahmed Furkan Gul; kurumsal strateji, iş geliştirme, stratejik karar alma ve uygulamalı teknolojinin kesişiminde çalışır. Yönetici ve akademik ortamlarda, liderlerin önemli tercihleri çerçevelemesine, varsayımları sınamasına ve kanıtı eyleme dönüştürmesine odaklanır."}</p>
          <p>{isEn ? "He previously served as Chief Strategy and Business Development Officer at Tay Group. His research at Yeditepe University examines how leadership styles and advice-seeking behaviour influence strategic decision outcomes. He is also an Assistant Professor at İstanbul Kent University." : "Daha önce Tay Group’ta Chief Strategy and Business Development Officer (Strateji ve İş Geliştirme Direktörü) olarak görev yaptı. Yeditepe Üniversitesindeki araştırmaları, liderlik stilleri ve tavsiye arama davranışının stratejik karar sonuçlarını nasıl etkilediğini inceler. Aynı zamanda İstanbul Kent Üniversitesinde Dr. Öğr. Üyesi olarak görev yapmaktadır."}</p>
          <p>{isEn ? "He founded Ganrich Advisory to give owners and leadership teams direct access to that combination of corporate practice and decision research, without the overhead of a large firm." : "Ganrich Advisory’yi, şirket sahiplerine ve yönetim ekiplerine kurumsal deneyim ile karar araştırmalarının bu birleşimine, büyük bir firmanın yükü olmadan doğrudan erişim sağlamak için kurdu."}</p>
        </div>
        <div className="founder-evidence">{copy.facts.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{body}</p></article>)}</div>
        <div className="founder-links">
          <a className="button outline" href={founder.linkedin} target="_blank" rel="noreferrer">{isEn ? "LinkedIn profile" : "LinkedIn profili"} <span aria-hidden="true">↗</span></a>
          <External to={founder.academic}>{isEn ? "Academic profile" : "Akademik profil"}</External>
        </div>
      </div>
    </section>
    <section className="p-section p-band">
      <div className="p-section-head"><Label>{isEn ? "How clients work with Ganrich" : "Müşteriler Ganrich ile nasıl çalışır"}</Label><h2>{isEn ? "Direct, discreet, and in writing." : "Doğrudan, gizlilik içinde ve yazılı."}</h2></div>
      <ul className="p-working">{workingModel[lang].map(([title, body]) => <li key={title}><strong>{title}</strong><p>{body}</p></li>)}</ul>
    </section>
    <section className="section principles"><div className="p-section-head"><Label>{isEn ? "Working principles" : "Çalışma ilkeleri"}</Label><h2>{isEn ? "Eight habits we hold ourselves to." : "Kendimize uyguladığımız sekiz alışkanlık."}</h2></div><ol>{principles.map((principle, index) => <li key={principle}><span>0{index + 1}</span><p>{principle}</p></li>)}</ol></section>
    <NextStep lang={lang}/>
  </>;
}
