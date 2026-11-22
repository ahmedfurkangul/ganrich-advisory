import type { Lang } from "./content";

// A fictional buyer-request response file, shown on the sample work page. Everything here is
// invented: no client, product data or result. It shows the structure of the work only.
const copy = {
  en: {
    kicker: "Buyer request response file",
    heading: "What a response to an EU buyer request looks like.",
    intro: "A fictional example of the file we build when an EU buyer asks for data. The company, request and data are invented; the structure is what we deliver.",
    label: "Illustrative / not client work",
    title: "CBAM data request from an EU importer",
    situation: "A German importer asks a fictional Turkish maker of steel pipe fittings (CN 7307) for the actual embedded emissions of the fittings it bought in 2026, so that it can file its CBAM declaration.",
    askedTitle: "What the buyer is asking for, and what not",
    asked: [
      "Asked: direct and indirect embedded emissions per tonne for each CN code shipped, the installation that made them, the production route and the period covered.",
      "Asked: confirmation that the data can be checked by an accredited verifier.",
      "Not asked: a product carbon footprint under ISO 14067, a sustainability report or a carbon price paid in Türkiye.",
    ],
    mapTitle: "Data map",
    mapHead: ["Data needed", "Source", "Owner", "Status"],
    map: [
      ["Electricity and natural gas use by production line", "Utility invoices and sub-meters", "Plant engineering", "Monthly totals available; split by line is estimated"],
      ["Emissions of the steel tubes bought in", "Declarations from tube mills", "Purchasing", "Missing from two of three mills"],
      ["Output by CN code", "ERP production records", "Production planning", "Available"],
      ["Installation boundary and production route", "Site plan and process flow", "Plant manager", "To be documented"],
    ],
    gapsTitle: "Gaps and interim answer",
    gaps: "Two tube mills have not yet sent emissions data. Until they do, the file marks which values are estimates, and the importer decides whether to use default values for the shipments concerned.",
    replyTitle: "Reply to the buyer, in outline",
    reply: ["What we can send now, and on what basis", "What follows, with a dated plan", "One named contact for follow-up questions"],
    gateTitle: "Next decision gate",
    gate: "Once the mills' data are in, decide whether to have the installation data verified before the importer's next declaration.",
    note: "All names, requests and data in this example are invented. It shows the structure of the file, not a result.",
  },
  tr: {
    kicker: "Alıcı talebi yanıt dosyası",
    heading: "Bir AB alıcısının talebine verilen yanıt nasıl görünür?",
    intro: "Bir AB alıcısı veri istediğinde hazırladığımız dosyanın kurgusal bir örneği. Şirket, talep ve veriler uydurmadır; teslim ettiğimiz şey bu yapıdır.",
    label: "Temsili / müşteri çalışması değildir",
    title: "AB ithalatçısından SKDM (CBAM) veri talebi",
    situation: "Bir Alman ithalatçı, kurgusal bir Türk çelik boru bağlantı parçası üreticisinden (KN 7307), SKDM beyanını verebilmek için 2026'da aldığı parçaların gerçek gömülü emisyonlarını istiyor.",
    askedTitle: "Alıcının istediği ve istemediği",
    asked: [
      "İstenen: sevk edilen her KN kodu için ton başına doğrudan ve dolaylı gömülü emisyon, ürünü üreten tesis, üretim rotası ve kapsanan dönem.",
      "İstenen: verilerin akredite bir doğrulayıcı tarafından kontrol edilebileceğinin teyidi.",
      "İstenmeyen: ISO 14067'ye göre ürün karbon ayak izi, sürdürülebilirlik raporu veya Türkiye'de ödenen karbon fiyatı.",
    ],
    mapTitle: "Veri haritası",
    mapHead: ["Gereken veri", "Kaynak", "Sorumlu", "Durum"],
    map: [
      ["Üretim hattı bazında elektrik ve doğal gaz tüketimi", "Fatura ve alt sayaçlar", "Tesis mühendisliği", "Aylık toplamlar var; hat bazında dağılım tahmini"],
      ["Satın alınan çelik boruların emisyonu", "Boru üreticilerinin beyanları", "Satın alma", "Üç üreticiden ikisinde eksik"],
      ["KN kodu bazında üretim", "ERP üretim kayıtları", "Üretim planlama", "Mevcut"],
      ["Tesis sınırı ve üretim rotası", "Yerleşim planı ve proses akışı", "Tesis müdürü", "Belgelenecek"],
    ],
    gapsTitle: "Eksikler ve ara yanıt",
    gaps: "İki boru üreticisi emisyon verisini henüz göndermedi. Gönderene kadar dosya hangi değerlerin tahmin olduğunu işaretler; ilgili sevkiyatlarda varsayılan değer kullanıp kullanmayacağına ithalatçı karar verir.",
    replyTitle: "Alıcıya yanıtın ana hatları",
    reply: ["Şimdi gönderebileceklerimiz ve dayanağı", "Sonra gelecekler, tarihli bir planla", "Takip soruları için tek ve isimli bir muhatap"],
    gateTitle: "Sonraki karar eşiği",
    gate: "Üreticilerin verisi gelince, ithalatçının bir sonraki beyanından önce tesis verisini doğrulatıp doğrulatmamaya karar verin.",
    note: "Bu örnekteki tüm isimler, talepler ve veriler uydurmadır. Bir sonucu değil, dosyanın yapısını gösterir.",
  },
} as const;

export function SampleResponseFile({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return (
    <section className="advisory-section sample-response" aria-labelledby="sample-response-title">
      <p className="kicker">{c.kicker}</p>
      <h2 id="sample-response-title">{c.heading}</h2>
      <p className="sample-response-intro">{c.intro}</p>
      <article className="sample-memo">
        <header><span>Ganrich Advisory</span><span>{c.label}</span></header>
        <h3>{c.title}</h3>
        <p className="memo-question">{c.situation}</p>
        <section><h4>{c.askedTitle}</h4><ul>{c.asked.map(x => <li key={x}>{x}</li>)}</ul></section>
        <section>
          <h4>{c.mapTitle}</h4>
          <div className="sample-response-table">
            <table>
              <thead><tr>{c.mapHead.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>{c.map.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={cell} data-label={c.mapHead[i]}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </section>
        <section><h4>{c.gapsTitle}</h4><p>{c.gaps}</p></section>
        <section><h4>{c.replyTitle}</h4><ol>{c.reply.map(x => <li key={x}>{x}</li>)}</ol></section>
        <section className="memo-action"><h4>{c.gateTitle}</h4><p>{c.gate}</p></section>
        <p className="contact-small">{c.note}</p>
      </article>
    </section>
  );
}
