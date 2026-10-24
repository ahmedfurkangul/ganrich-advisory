import type { Row, TrafficReport } from "../db/traffic";
import type { Lang } from "./content";
import { channelLabel, trafficInsights } from "./traffic-insights";
import { services } from "./advisory-content";
import { solutions } from "./solutions-content";

// Editor-only traffic dashboard. Server-rendered HTML and SVG: no client JavaScript, no third-party script.

const RANGES = [7, 30, 90, 365];
const number = (lang: Lang, value: number) => value.toLocaleString(lang === "en" ? "en-GB" : "tr-TR");

function Delta({ lang, now, before }: { lang: Lang; now: number; before: number }) {
  if (!before) return <small className="traffic-delta">{lang === "en" ? "no earlier data" : "önceki veri yok"}</small>;
  const change = Math.round((now - before) / before * 100);
  return <small className={`traffic-delta ${change >= 0 ? "up" : "down"}`}><span aria-hidden="true">{change >= 0 ? "▲" : "▼"}</span> {Math.abs(change)}% {lang === "en" ? "vs previous period" : "önceki döneme göre"}</small>;
}

function Tile({ label, value, children }: { label: string; value: string; children?: React.ReactNode }) {
  return <div className="traffic-tile"><span>{label}</span><strong>{value}</strong>{children}</div>;
}

function BarTable({ lang, title, rows, empty, valueLabel, showVisitors = true, note }: { lang: Lang; title: string; rows: Row[]; empty?: string; valueLabel?: string; showVisitors?: boolean; note?: string }) {
  const en = lang === "en";
  const max = Math.max(1, ...rows.map(r => showVisitors ? r.visitors ?? r.views : r.views));
  return <section className="traffic-card">
    <h3>{title}</h3>
    {note && <p className="traffic-note">{note}</p>}
    {rows.length === 0 ? <p className="traffic-empty">{empty ?? (en ? "Nothing recorded yet." : "Henüz kayıt yok.")}</p> :
      <table className="traffic-table">
        <thead><tr><th scope="col">{en ? "Item" : "Öğe"}</th>{showVisitors && <th scope="col">{en ? "Visitors" : "Ziyaretçi"}</th>}<th scope="col">{valueLabel ?? (en ? "Views" : "Görüntüleme")}</th></tr></thead>
        <tbody>{rows.map(r => {
          const value = showVisitors ? r.visitors ?? r.views : r.views;
          return <tr key={r.label}>
            <th scope="row"><span className="traffic-bar" style={{ width: `${Math.max(2, value / max * 100)}%` }} aria-hidden="true"/><span className="traffic-label" title={r.label}>{r.label}</span>{r.extra && <small>{r.extra}</small>}</th>
            {showVisitors && <td>{number(lang, r.visitors ?? 0)}</td>}
            <td>{number(lang, r.views)}</td>
          </tr>;
        })}</tbody>
      </table>}
  </section>;
}

function LineChart({ lang, report }: { lang: Lang; report: TrafficReport }) {
  const en = lang === "en";
  const width = 960, height = 240, pad = { l: 40, r: 12, t: 16, b: 28 };
  const points = report.daily;
  const max = Math.max(4, ...points.map(p => p.visitors));
  const step = Math.ceil(max / 4);
  const top = step * 4;
  const x = (i: number) => pad.l + (points.length === 1 ? 0 : i / (points.length - 1) * (width - pad.l - pad.r));
  const y = (v: number) => pad.t + (1 - v / top) * (height - pad.t - pad.b);
  const line = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.visitors).toFixed(1)}`).join("");
  const area = `${line}L${x(points.length - 1).toFixed(1)},${y(0)}L${x(0).toFixed(1)},${y(0)}Z`;
  const labelEvery = Math.max(1, Math.ceil(points.length / 8));
  const format = (day: string) => new Date(`${day}T12:00:00Z`).toLocaleDateString(en ? "en-GB" : "tr-TR", { day: "numeric", month: "short" });
  return <figure className="traffic-chart">
    <figcaption>{en ? "Daily visitors" : "Günlük ziyaretçi"}</figcaption>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={en ? `Daily visitors, ${report.from} to ${report.to}` : `Günlük ziyaretçi, ${report.from} – ${report.to}`}>
      {[0, 1, 2, 3, 4].map(i => <g key={i}><line x1={pad.l} x2={width - pad.r} y1={y(step * i)} y2={y(step * i)} className="grid"/><text x={pad.l - 8} y={y(step * i) + 4} textAnchor="end">{step * i}</text></g>)}
      <path d={area} className="area"/>
      <path d={line} className="line"/>
      {points.map((p, i) => <g key={p.day} className="point">
        <rect x={x(i) - (width - pad.l - pad.r) / points.length / 2} y={pad.t} width={(width - pad.l - pad.r) / points.length} height={height - pad.t - pad.b} className="hit"><title>{`${format(p.day)}: ${p.visitors} ${en ? "visitors" : "ziyaretçi"}, ${p.views} ${en ? "views" : "görüntüleme"}, ${p.aiBots} ${en ? "AI crawler reads" : "yapay zekâ tarayıcı okuması"}`}</title></rect>
        {points.length <= 31 && <circle cx={x(i)} cy={y(p.visitors)} r={3}/>}
        {i % labelEvery === 0 && <text x={x(i)} y={height - 8} textAnchor="middle">{format(p.day)}</text>}
      </g>)}
    </svg>
  </figure>;
}

function Columns({ lang, title, values, labels, unit }: { lang: Lang; title: string; values: number[]; labels: string[]; unit: string }) {
  const width = 960, height = 160, pad = { l: 8, r: 8, t: 12, b: 24 };
  const max = Math.max(1, ...values);
  const slot = (width - pad.l - pad.r) / values.length;
  const every = Math.max(1, Math.ceil(values.length / 12));
  return <figure className="traffic-chart">
    <figcaption>{title}</figcaption>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
      <line x1={pad.l} x2={width - pad.r} y1={height - pad.b} y2={height - pad.b} className="grid"/>
      {values.map((v, i) => {
        const h = v / max * (height - pad.t - pad.b);
        return <g key={i}>
          <rect x={pad.l + i * slot + 2} y={height - pad.b - h} width={Math.max(1, slot - 4)} height={h} rx={Math.min(4, h / 2)} className="column"/>
          <rect x={pad.l + i * slot} y={pad.t} width={slot} height={height - pad.t - pad.b} className="hit"><title>{`${labels[i]}: ${number(lang, v)} ${unit}`}</title></rect>
          {i % every === 0 && <text x={pad.l + i * slot + slot / 2} y={height - 6} textAnchor="middle">{labels[i]}</text>}
        </g>;
      })}
    </svg>
  </figure>;
}

function Funnel({ lang, report }: { lang: Lang; report: TrafficReport }) {
  const en = lang === "en";
  const f = report.funnel;
  const stages: Array<[string, number]> = [
    [en ? "Visitors" : "Ziyaretçi", f.visitors],
    [en ? "Confirmed by a browser" : "Tarayıcıyla doğrulanan", f.confirmed],
    [en ? "Clicked a contact button" : "İletişim düğmesine tıkladı", f.cta],
    [en ? "Started the form" : "Formu doldurmaya başladı", f.formStart],
    [en ? "Sent the form" : "Formu gönderdi", f.formSubmit],
  ];
  const max = Math.max(1, f.visitors);
  return <section className="traffic-card">
    <h3>{en ? "From visit to request" : "Ziyaretten talebe"}</h3>
    <ol className="traffic-funnel">{stages.map(([label, value], i) => {
      const prev = i ? stages[i - 1][1] : 0;
      return <li key={label}>
        <span>{label}</span>
        <span className="traffic-bar" style={{ width: `${Math.max(value ? 1 : 0, value / max * 100)}%` }} aria-hidden="true"/>
        <strong>{number(lang, value)}{i > 0 && prev > 0 && <small> · {Math.round(value / prev * 100)}%</small>}</strong>
      </li>;
    })}</ol>
    <p className="traffic-note">{en
      ? `Unique visitors per day at each step; the percentage compares with the step before. "Confirmed by a browser" counts visitors whose browser ran the page; most scanners and crawlers that pass as people never do. ${f.inquiries} requests reached the inbox in this period. Contact steps are counted from 23 October 2026, browser confirmation from the deploy of this version.`
      : `Her adımda günlük tekil ziyaretçi; yüzde bir önceki adıma göredir. "Tarayıcıyla doğrulanan", sayfayı gerçekten bir tarayıcıda çalıştıran ziyaretçileri sayar; insan gibi görünen tarayıcı botlarının çoğu bunu yapmaz. Bu dönemde gelen kutusuna ${f.inquiries} talep düştü. İletişim adımları 23 Ekim 2026'dan, tarayıcı doğrulaması bu sürümün yayına alınmasından itibaren sayılıyor.`}</p>
  </section>;
}

function Checks({ lang, report }: { lang: Lang; report: TrafficReport }) {
  const en = lang === "en";
  const f = report.funnel;
  return <section className="traffic-card">
    <h3>{en ? "Readiness checks" : "Hazırlık testleri"}</h3>
    <ol className="traffic-funnel">
      <li><span>{en ? "Started a check" : "Teste başladı"}</span><span className="traffic-bar" style={{ width: f.checkStart ? "100%" : "0%" }} aria-hidden="true"/><strong>{number(lang, f.checkStart)}</strong></li>
      <li><span>{en ? "Saw the result" : "Sonucu gördü"}</span><span className="traffic-bar" style={{ width: `${f.checkStart ? f.checkComplete / f.checkStart * 100 : 0}%` }} aria-hidden="true"/><strong>{number(lang, f.checkComplete)}{f.checkStart > 0 && <small> · {Math.round(f.checkComplete / f.checkStart * 100)}%</small>}</strong></li>
    </ol>
    {report.checkPages.length > 0 && <table className="traffic-table">
      <thead><tr><th scope="col">{en ? "Check" : "Test"}</th><th scope="col">{en ? "Results seen" : "Görülen sonuç"}</th></tr></thead>
      <tbody>{report.checkPages.map(r => <tr key={r.label}><th scope="row"><span className="traffic-label" title={r.label}>{r.label}</span></th><td>{number(lang, r.views)}</td></tr>)}</tbody>
    </table>}
    <p className="traffic-note">{en ? "Counted from the deploy of this version. Answers are never sent; only the step and the page." : "Bu sürümün yayına alınmasından itibaren sayılır. Cevaplar gönderilmez; yalnızca adım ve sayfa kaydedilir."}</p>
  </section>;
}

function FunnelChannels({ lang, report }: { lang: Lang; report: TrafficReport }) {
  const en = lang === "en";
  return <section className="traffic-card">
    <h3>{en ? "Requests by channel" : "Kanala göre talep"}</h3>
    {report.funnelChannels.length === 0 ? <p className="traffic-empty">{en ? "Nothing recorded yet." : "Henüz kayıt yok."}</p> :
      <table className="traffic-table">
        <thead><tr><th scope="col">{en ? "Channel" : "Kanal"}</th><th scope="col">{en ? "Visitors" : "Ziyaretçi"}</th><th scope="col">{en ? "Contact clicks" : "Düğme tıklaması"}</th><th scope="col">{en ? "Forms sent" : "Gönderilen form"}</th></tr></thead>
        <tbody>{report.funnelChannels.map(c => <tr key={c.channel}>
          <th scope="row"><span className="traffic-label">{channelLabel[lang][c.channel]}</span></th>
          <td>{number(lang, c.visitors)}</td><td>{number(lang, c.cta)}</td><td>{number(lang, c.submits)}</td>
        </tr>)}</tbody>
      </table>}
    <p className="traffic-note">{en ? "A visitor's channel is where their first page of the day came from." : "Ziyaretçinin kanalı, o günkü ilk sayfasının geldiği yerdir."}</p>
  </section>;
}

function topicTitle(lang: Lang, key: string) {
  if (key === "briefing") return lang === "en" ? "Executive briefing" : "Yönetim brifingi";
  if (key === "other") return lang === "en" ? "Something else" : "Başka bir konu";
  return solutions[lang].find(s => s.key === key)?.title ?? services[lang].find(s => s.key === key)?.title ?? key;
}

export function TrafficDashboard({ lang, report, studioHref, selfHref }: { lang: Lang; report: TrafficReport; studioHref: string; selfHref: string }) {
  const en = lang === "en";
  const t = report.totals;
  const insights = trafficInsights(lang, report);
  const channelTotal = Math.max(1, report.channels.reduce((s, c) => s + c.visitors, 0));
  const dateFormat = (iso: string) => new Date(iso).toLocaleString(en ? "en-GB" : "tr-TR", { timeZone: "Europe/Istanbul", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const categoryLabel: Record<string, string> = en
    ? { ai: "AI", search: "Search", seo: "SEO tool", social: "Link preview", monitor: "Monitor", other: "Other" }
    : { ai: "Yapay zekâ", search: "Arama", seo: "SEO aracı", social: "Bağlantı önizleme", monitor: "İzleme", other: "Diğer" };

  return <div className="traffic-dashboard">
    <header className="traffic-head">
      <div>
        <p className="kicker">{en ? "Editors only" : "Yalnızca editörler"}</p>
        <h1>{en ? "Traffic and analysis" : "Trafik ve analiz"}</h1>
        <p>{en ? `${report.from} to ${report.to} · first-party, cookieless log` : `${report.from} – ${report.to} · birinci taraf, çerezsiz kayıt`}</p>
      </div>
      <nav aria-label={en ? "Period" : "Dönem"} className="traffic-ranges">
        {RANGES.map(d => <a key={d} href={`${selfHref}?days=${d}`} aria-current={d === report.days ? "page" : undefined}>{en ? `${d} days` : `${d} gün`}</a>)}
        <a href={studioHref}>{en ? "PDF studio" : "PDF stüdyosu"} ↗</a>
        <a href={`https://studio.ganrichadvisory.com/?lang=${lang}`} target="_blank" rel="noopener noreferrer">{en ? "Open Opportunity Studio" : "Opportunity Studio’yu aç"} ↗</a>
      </nav>
    </header>

    <section className="traffic-tiles" aria-label={en ? "Key figures" : "Temel göstergeler"}>
      <Tile label={en ? "Visitors" : "Ziyaretçi"} value={number(lang, t.visitors)}><Delta lang={lang} now={t.visitors} before={report.previous.visitors}/></Tile>
      <Tile label={en ? "Page views" : "Sayfa görüntüleme"} value={number(lang, t.views)}><Delta lang={lang} now={t.views} before={report.previous.views}/></Tile>
      <Tile label={en ? "Pages per visitor" : "Ziyaretçi başına sayfa"} value={t.pagesPerVisitor.toFixed(1)}/>
      <Tile label={en ? "Inquiries" : "Talepler"} value={number(lang, t.inquiries)}><small className="traffic-delta">{en ? "conversion" : "dönüşüm"} {(t.conversion * 100).toFixed(1)}%</small></Tile>
      <Tile label={en ? "Visits from AI assistants" : "Yapay zekâdan gelen ziyaret"} value={number(lang, t.aiReferrals)}><Delta lang={lang} now={t.aiReferrals} before={report.previous.aiReferrals}/></Tile>
      <Tile label={en ? "AI crawler reads" : "Yapay zekâ tarayıcı okuması"} value={number(lang, t.aiBotHits)}/>
      <Tile label={en ? "Whitepaper opens" : "Teknik not açılışı"} value={number(lang, t.pdfDownloads)}/>
      <Tile label={en ? "All bot requests" : "Tüm bot istekleri"} value={number(lang, t.botHits)}/>
    </section>

    <section className="traffic-card traffic-analysis">
      <h2>{en ? "Analysis" : "Analiz"}</h2>
      <ul>{insights.map((i, n) => <li key={n} className={i.tone}><span className="sr-only">{i.tone === "watch" ? (en ? "Needs attention: " : "Dikkat: ") : ""}</span>{i.text}</li>)}</ul>
    </section>

    <section className="traffic-card"><LineChart lang={lang} report={report}/></section>

    <section className="traffic-card">
      <h3>{en ? "Where visitors come from" : "Ziyaretçiler nereden geliyor?"}</h3>
      {report.channels.length === 0 ? <p className="traffic-empty">{en ? "Nothing recorded yet." : "Henüz kayıt yok."}</p> :
        <ul className="traffic-channels">{report.channels.map(c => <li key={c.channel}><span>{channelLabel[lang][c.channel]}</span><span className="traffic-bar" style={{ width: `${c.visitors / channelTotal * 100}%` }} aria-hidden="true"/><strong>{number(lang, c.visitors)} · {Math.round(c.visitors / channelTotal * 100)}%</strong></li>)}</ul>}
      <p className="traffic-note">{en ? "AI assistants include ChatGPT, Perplexity, Claude, Gemini and Copilot, recognised by referrer or by utm_source." : "Yapay zekâ asistanları ChatGPT, Perplexity, Claude, Gemini ve Copilot'u kapsar; yönlendiren siteden veya utm_source'tan tanınır."}</p>
    </section>

    <Funnel lang={lang} report={report}/>

    <div className="traffic-grid">
      <Checks lang={lang} report={report}/>
      <FunnelChannels lang={lang} report={report}/>
      <BarTable lang={lang} title={en ? "Pages where contact buttons were clicked" : "İletişim düğmesine tıklanan sayfalar"} rows={report.ctaPages} valueLabel={en ? "Clicks" : "Tıklama"}/>
      <BarTable lang={lang} title={en ? "Requests by topic" : "Konuya göre talepler"} rows={report.inquiryTopics.map(r => ({ ...r, label: topicTitle(lang, r.label) }))} showVisitors={false} valueLabel={en ? "Requests" : "Talep"}/>
    </div>

    <div className="traffic-grid">
      <BarTable lang={lang} title={en ? "Top pages" : "En çok ziyaret edilen sayfalar"} rows={report.pages}/>
      <BarTable lang={lang} title={en ? "Landing pages from other sites" : "Dış kaynaklardan giriş sayfaları"} rows={report.entryPages}/>
      <BarTable lang={lang} title={en ? "Referring websites" : "Yönlendiren siteler"} rows={report.referrers}/>
      <BarTable lang={lang} title={en ? "AI assistants sending visitors" : "Ziyaretçi gönderen yapay zekâ asistanları"} rows={report.aiReferrers}/>
      <BarTable lang={lang} title={en ? "Campaigns (UTM)" : "Kampanyalar (UTM)"} rows={report.campaigns} note={en ? "Add ?utm_source=linkedin&utm_campaign=… to links you share to see them here." : "Paylaştığınız bağlantılara ?utm_source=linkedin&utm_campaign=… ekleyin, burada görünsün."}/>
      <BarTable lang={lang} title={en ? "Whitepapers opened" : "Açılan teknik notlar"} rows={report.pdfs}/>
      <BarTable lang={lang} title={en ? "Countries" : "Ülkeler"} rows={report.countries}/>
      <BarTable lang={lang} title={en ? "Cities" : "Şehirler"} rows={report.cities}/>
      <BarTable lang={lang} title={en ? "Networks" : "Ağlar"} rows={report.networks} note={en ? "The visitor's internet provider or company network, as reported by Cloudflare." : "Ziyaretçinin internet sağlayıcısı veya şirket ağı (Cloudflare verisi)."}/>
      <BarTable lang={lang} title={en ? "Devices" : "Cihazlar"} rows={report.devices}/>
      <BarTable lang={lang} title={en ? "Browsers" : "Tarayıcılar"} rows={report.browsers}/>
      <BarTable lang={lang} title={en ? "Operating systems" : "İşletim sistemleri"} rows={report.systems}/>
      <BarTable lang={lang} title={en ? "Site language" : "Site dili"} rows={report.languages}/>
      <BarTable lang={lang} title={en ? "Missing pages (404)" : "Bulunamayan sayfalar (404)"} rows={report.notFound} empty={en ? "No missing pages. Good." : "Bulunamayan sayfa yok."}/>
    </div>

    <section className="traffic-card"><Columns lang={lang} title={en ? "Page views by hour (Istanbul time)" : "Saate göre sayfa görüntüleme (İstanbul saati)"} values={report.hours} labels={report.hours.map((_, h) => `${String(h).padStart(2, "0")}:00`)} unit={en ? "views" : "görüntüleme"}/></section>
    <section className="traffic-card"><Columns lang={lang} title={en ? "AI crawler reads per day" : "Günlük yapay zekâ tarayıcı okuması"} values={report.daily.map(d => d.aiBots)} labels={report.daily.map(d => d.day.slice(5))} unit={en ? "reads" : "okuma"}/></section>

    <div className="traffic-grid">
      <section className="traffic-card">
        <h3>{en ? "Crawlers and bots" : "Tarayıcılar ve botlar"}</h3>
        {report.bots.length === 0 ? <p className="traffic-empty">{en ? "Nothing recorded yet." : "Henüz kayıt yok."}</p> :
          <table className="traffic-table"><thead><tr><th scope="col">Bot</th><th scope="col">{en ? "Type" : "Tür"}</th><th scope="col">{en ? "Requests" : "İstek"}</th><th scope="col">{en ? "Last seen" : "Son görülme"}</th></tr></thead>
            <tbody>{report.bots.map(b => <tr key={b.name}><th scope="row">{b.name}</th><td>{categoryLabel[b.category] ?? b.category}</td><td>{number(lang, b.hits)}</td><td>{dateFormat(b.lastSeen)}</td></tr>)}</tbody></table>}
      </section>
      <BarTable lang={lang} title={en ? "What AI crawlers read" : "Yapay zekâ tarayıcılarının okuduğu sayfalar"} rows={report.aiBotPaths} showVisitors={false} valueLabel={en ? "Reads" : "Okuma"}/>
      <BarTable lang={lang} title={en ? "Discovery files (robots, llms.txt, sitemaps)" : "Keşif dosyaları (robots, llms.txt, site haritaları)"} rows={report.discovery} showVisitors={false} valueLabel={en ? "Fetches" : "Okuma"}/>
    </div>

    <section className="traffic-card">
      <h3>{en ? "Latest visits" : "Son ziyaretler"}</h3>
      {report.recent.length === 0 ? <p className="traffic-empty">{en ? "Nothing recorded yet." : "Henüz kayıt yok."}</p> :
        <div className="traffic-scroll"><table className="traffic-table traffic-recent"><thead><tr><th scope="col">{en ? "Time" : "Zaman"}</th><th scope="col">{en ? "Page" : "Sayfa"}</th><th scope="col">{en ? "From" : "Kaynak"}</th><th scope="col">{en ? "Location" : "Konum"}</th><th scope="col">{en ? "Device" : "Cihaz"}</th></tr></thead>
          <tbody>{report.recent.map((v, i) => <tr key={i}><td>{dateFormat(v.ts)}</td><th scope="row">{v.path}</th><td>{v.referrer || (en ? "direct" : "doğrudan")}</td><td>{[v.city, v.country].filter(Boolean).join(", ")}</td><td>{v.device} · {v.browser}</td></tr>)}</tbody></table></div>}
    </section>

    <footer className="traffic-note traffic-method">
      {en
        ? "Method: the Worker logs each page view after the response is sent. No cookie is set and no IP address is stored. A visitor is a hash of IP address, browser and a random salt that is replaced every day, so the same person is counted once per day and cannot be followed across days. Visitor totals therefore add up daily unique visitors. Bots are recognised by user agent and kept separate from people. Data is kept for 13 months."
        : "Yöntem: Worker her sayfa görüntülemesini yanıt gönderildikten sonra kaydeder. Çerez kullanılmaz, IP adresi saklanmaz. Ziyaretçi; IP adresi, tarayıcı ve her gün değişen rastgele bir değerden üretilen bir özetle tanınır. Böylece aynı kişi günde bir kez sayılır ve günler arasında izlenemez. Bu yüzden ziyaretçi toplamları günlük tekil ziyaretçilerin toplamıdır. Botlar kullanıcı aracısından tanınır ve insanlardan ayrı tutulur. Veriler 13 ay saklanır."}
    </footer>
  </div>;
}
