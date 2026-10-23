import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "public/og/ganrich-advisory-master.png");
const outputRoot = path.join(root, "public/og");
const paper = "#f3f0e9";
const ink = "#121513";
const forest = "#21302a";
const bronze = "#765f4d";

const cards = {
  en: [
    ["home", "STRATEGIC ADVISORY", "The next move. Thought through."],
    ["expertise", "EXPERTISE", "The decision comes first."],
    ["markets", "MARKETS", "Context changes the answer."],
    ["insights", "INSIGHTS", "Ideas made for use."],
    ["decisionLab", "DECISION LAB", "Work on the decision."],
    ["decisionAtlas", "DECISION ATLAS", "Begin with the decision."],
    ["decisionFramer", "DECISION FRAMER", "Turn ambiguity into a decision brief."],
    ["marketCompass", "MARKET ENTRY COMPASS", "Compare opportunity with readiness."],
    ["boardBriefBuilder", "BOARD BRIEF BUILDER", "Make the decision visible on one page."],
    ["aiValueLens", "AI VALUE LENS", "Begin with value. Keep judgment accountable."],
    ["decisionLabChangelog", "DECISION LAB CHANGELOG", "What is live. What changed. What comes next."],
    ["privateBriefing", "PRIVATE EXECUTIVE BRIEFING", "Move from perspective to a prepared discussion."],
    ["about", "ABOUT", "Independent thinking for decisions that do not fit a template."],
    ["contact", "CONTACT", "Share the context. We will come prepared."],
    ["trust", "PRIVACY + TRUST", "Trust should be designed into the experience."],
    ["legal", "LEGAL", "Clear terms for a professional relationship."],
    ["article-decision-quality-applied-ai", "APPLIED AI · DECISION QUALITY", "Decision quality in the age of applied AI"],
    ["article-transformation-activity-to-value", "TRANSFORMATION · VALUE", "From transformation activity to transformation value"],
    ["article-market-entry-sequence-of-commitments", "MARKET ENTRY · STRATEGY", "Market entry is a sequence of commitments"],
    ["article-turkiye-gulf-capital-corridor", "REGIONAL STRATEGY · CORRIDORS", "The Türkiye–Gulf capital corridor"],
    ["article-family-holdings-operating-model-transition", "OPERATING MODEL · GOVERNANCE", "Family holdings and the operating-model transition"],
    ["article-ai-value-mid-market-industrials", "APPLIED AI · INDUSTRIALS", "Where AI creates measurable value in mid-market industrials"],
    ["categoryAppliedAi", "INSIGHTS · APPLIED AI", "Applied AI."],
    ["categoryTransformation", "INSIGHTS · TRANSFORMATION", "Transformation."],
    ["categoryGrowth", "INSIGHTS · GROWTH", "Growth."],
    ["categoryRegionalExpansion", "INSIGHTS · REGIONAL EXPANSION", "Regional expansion."],
    ["categoryOperatingModel", "INSIGHTS · OPERATING MODEL", "Operating model."],
    ["solutions", "SOLUTIONS", "Focused programmes for decisions new rules force."],
    ["serviceMarket", "EXPERTISE · MARKET ENTRY", "Market Entry Decision Sprint"],
    ["serviceOperating", "EXPERTISE · OPERATING MODEL", "Operating Model Review"],
    ["serviceAI", "EXPERTISE · APPLIED AI", "AI Value Diagnostic"],
    ["sampleWork", "SAMPLE WORK", "Illustrative decision memos."],
    ["solutionCbam", "SOLUTIONS · EU MARKET ACCESS", "CBAM Data Readiness"],
    ["solutionCra", "SOLUTIONS · EU MARKET ACCESS", "CRA Incident Readiness"],
    ["solutionEudr", "SOLUTIONS · EU MARKET ACCESS", "EUDR Traceability File"],
    ["solutionPfas", "SOLUTIONS · EU MARKET ACCESS", "PFAS Substitution Programme"],
    ["solutionEexport", "SOLUTIONS · EU MARKET ACCESS", "EU E-Export Product Data"],
    ["solutionAccessibility", "SOLUTIONS · EU MARKET ACCESS", "EU Accessibility Remediation"],
    ["solutionEnergy", "SOLUTIONS · INDUSTRIAL EFFICIENCY", "Measured Energy Retrofit"],
    ["solutionStorage", "SOLUTIONS · INDUSTRIAL EFFICIENCY", "Solar and Storage Decision"],
    ["solutionWater", "SOLUTIONS · INDUSTRIAL EFFICIENCY", "Industrial Water Balance"],
    ["solutionOrderDesk", "SOLUTIONS · AI IN COMMERCIAL OPERATIONS", "AI Order Desk Assistant"],
    ["solutionMargin", "SOLUTIONS · AI IN COMMERCIAL OPERATIONS", "E-commerce Margin Clarity"],
  ],
  tr: [
    ["home", "STRATEJİK DANIŞMANLIK", "Sonraki adım. Sağlam bir kararla."],
    ["expertise", "UZMANLIK", "Önce karar gelir."],
    ["markets", "COĞRAFYALAR", "Bağlam, yanıtı değiştirir."],
    ["insights", "İÇGÖRÜLER", "Kullanılmak için geliştirilen fikirler."],
    ["decisionLab", "KARAR LABORATUVARI", "Karar üzerinde çalışın."],
    ["decisionAtlas", "KARAR ATLASI", "Karardan başlayın."],
    ["decisionFramer", "KARAR ÇERÇEVELEYİCİ", "Belirsizliği karar özetine dönüştürün."],
    ["marketCompass", "PAZARA GİRİŞ PUSULASI", "Fırsatı hazırlıkla karşılaştırın."],
    ["boardBriefBuilder", "YÖNETİM KURULU BRİFİNGİ", "Kararı tek sayfada görünür kılın."],
    ["aiValueLens", "YAPAY ZEKÂ DEĞER MERCEĞİ", "Değerle başlayın. Muhakemeyi sorumlu tutun."],
    ["decisionLabChangelog", "KARAR LABORATUVARI", "Neler yayında. Neler değişti. Sırada ne var."],
    ["privateBriefing", "ÖZEL YÖNETİCİ BRİFİNGİ", "Bakıştan hazırlıklı görüşmeye geçin."],
    ["about", "HAKKIMIZDA", "Bir şablona sığmayan kararlar için bağımsız düşünce."],
    ["contact", "İLETİŞİM", "Bağlamı paylaşın. Biz hazırlıklı gelelim."],
    ["trust", "GİZLİLİK + GÜVEN", "Güven, deneyimin içine tasarlanmalıdır."],
    ["legal", "HUKUKİ BİLGİLENDİRME", "Profesyonel ilişki için açık koşullar."],
    ["article-uygulamali-yapay-zeka-karar-kalitesi", "UYGULAMALI YAPAY ZEKÂ · KARAR KALİTESİ", "Uygulamalı yapay zekâ çağında karar kalitesi"],
    ["article-donusum-faaliyetinden-degere", "DÖNÜŞÜM · DEĞER", "Dönüşüm faaliyetinden dönüşüm değerine"],
    ["article-pazara-giris-taahhutler-dizisidir", "PAZARA GİRİŞ · STRATEJİ", "Pazara giriş, birbirini izleyen taahhütlerdir"],
    ["article-turkiye-korfez-sermaye-koridoru", "BÖLGESEL STRATEJİ · KORİDORLAR", "Türkiye–Körfez sermaye koridoru"],
    ["article-aile-holdingleri-isletim-modeli-gecisi", "İŞLETİM MODELİ · YÖNETİŞİM", "Aile holdingleri ve işletim modeli geçişi"],
    ["article-orta-olcekli-sanayide-yapay-zeka-degeri", "UYGULAMALI YAPAY ZEKÂ · SANAYİ", "Orta ölçekli sanayi şirketlerinde yapay zekâ nerede ölçülebilir değer yaratır?"],
    ["categoryAppliedAi", "İÇGÖRÜLER · UYGULAMALI YAPAY ZEKÂ", "Uygulamalı Yapay Zekâ."],
    ["categoryTransformation", "İÇGÖRÜLER · DÖNÜŞÜM", "Dönüşüm."],
    ["categoryGrowth", "İÇGÖRÜLER · BÜYÜME", "Büyüme."],
    ["categoryRegionalExpansion", "İÇGÖRÜLER · BÖLGESEL BÜYÜME", "Bölgesel büyüme."],
    ["categoryOperatingModel", "İÇGÖRÜLER · İŞLETİM MODELİ", "İşletim modeli."],
    ["solutions", "ÇÖZÜMLER", "Yeni kuralların dayattığı kararlar için odaklı programlar."],
    ["serviceMarket", "UZMANLIK · PAZARA GİRİŞ", "Pazara Giriş Karar Çalışması"],
    ["serviceOperating", "UZMANLIK · İŞLETİM MODELİ", "İşletim Modeli İncelemesi"],
    ["serviceAI", "UZMANLIK · UYGULAMALI YAPAY ZEKÂ", "Yapay Zekâ Değer Analizi"],
    ["sampleWork", "ÖRNEK ÇALIŞMALAR", "Temsili karar notları."],
    ["solutionCbam", "ÇÖZÜMLER · AB PAZARINA ERİŞİM", "CBAM Veri Hazırlığı"],
    ["solutionCra", "ÇÖZÜMLER · AB PAZARINA ERİŞİM", "CRA Olay Hazırlığı"],
    ["solutionEudr", "ÇÖZÜMLER · AB PAZARINA ERİŞİM", "EUDR İzlenebilirlik Dosyası"],
    ["solutionPfas", "ÇÖZÜMLER · AB PAZARINA ERİŞİM", "PFAS İkame Programı"],
    ["solutionEexport", "ÇÖZÜMLER · AB PAZARINA ERİŞİM", "AB E-İhracat Ürün Verisi"],
    ["solutionAccessibility", "ÇÖZÜMLER · AB PAZARINA ERİŞİM", "AB Erişilebilirlik İyileştirmesi"],
    ["solutionEnergy", "ÇÖZÜMLER · SANAYİDE VERİMLİLİK", "Ölçüme Dayalı Enerji İyileştirmesi"],
    ["solutionStorage", "ÇÖZÜMLER · SANAYİDE VERİMLİLİK", "Güneş ve Depolama Kararı"],
    ["solutionWater", "ÇÖZÜMLER · SANAYİDE VERİMLİLİK", "Sanayide Su Dengesi"],
    ["solutionOrderDesk", "ÇÖZÜMLER · TİCARİ OPERASYONLARDA YAPAY ZEKÂ", "Yapay Zekâ Sipariş Masası Asistanı"],
    ["solutionMargin", "ÇÖZÜMLER · TİCARİ OPERASYONLARDA YAPAY ZEKÂ", "E-Ticarette Katkı Kârı Netliği"],
  ],
};

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrap(value, max = 31) {
  const words = value.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (!line || `${line} ${word}`.length <= max) line = line ? `${line} ${word}` : word;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function overlay(eyebrow, title, lang) {
  const lines = wrap(title, title.length > 67 ? 29 : 33);
  const size = lines.length > 3 ? 45 : lines.length > 2 ? 50 : 56;
  const lineHeight = Math.round(size * 1.02);
  const firstY = lines.length > 3 ? 229 : 248;
  const spine = lang === "en"
    ? "SIGNAL  ·  INTERPRETATION  ·  CHOICE  ·  ACTION"
    : "SİNYAL  ·  YORUM  ·  TERCİH  ·  UYGULAMA";

  return Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f7f4ed"/>
          <stop offset=".52" stop-color="${paper}"/>
          <stop offset="1" stop-color="#eee9df"/>
        </linearGradient>
        <pattern id="grain" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="4" r=".55" fill="#21302a" opacity=".035"/>
          <circle cx="18" cy="15" r=".45" fill="#987d66" opacity=".04"/>
          <path d="M1 21L8 20M15 5L22 4" stroke="#121513" stroke-width=".35" opacity=".025"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#paper)"/>
      <rect width="1200" height="630" fill="url(#grain)"/>
      <text x="62" y="84" fill="${forest}" font-family="Arial, Helvetica, sans-serif"
        font-size="20" font-weight="700" letter-spacing="5">GANRICH ADVISORY</text>
      <text x="62" y="168" fill="${bronze}" font-family="Arial, Helvetica, sans-serif"
        font-size="14" font-weight="700" letter-spacing="3">${escapeXml(eyebrow)}</text>
      <text x="62" y="${firstY}" fill="${ink}" font-family="Georgia, 'Times New Roman', serif"
        font-size="${size}" font-weight="400" letter-spacing="-1.5">
        ${lines.map((line, index) => `<tspan x="62" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`).join("")}
      </text>
      <line x1="62" y1="558" x2="318" y2="558" stroke="${forest}" stroke-width="1"/>
      <text x="62" y="590" fill="${forest}" font-family="Arial, Helvetica, sans-serif"
        font-size="12" font-weight="600" letter-spacing="1.7">${escapeXml(spine)}</text>
    </svg>
  `);
}

await Promise.all(Object.keys(cards).map((lang) => mkdir(path.join(outputRoot, lang), { recursive: true })));

const scaledSource = await sharp(source)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .toBuffer();

const motifExtract = await sharp(scaledSource)
  .extract({ left: 650, top: 65, width: 550, height: 520 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let index = 0; index < motifExtract.data.length; index += 4) {
  const minimum = Math.min(motifExtract.data[index], motifExtract.data[index + 1], motifExtract.data[index + 2]);
  motifExtract.data[index + 3] = Math.max(0, Math.min(255, (243 - minimum - 10) * 5.4));
}

const motif = await sharp(motifExtract.data, { raw: motifExtract.info }).png().toBuffer();

for (const [lang, entries] of Object.entries(cards)) {
  for (const [key, eyebrow, title] of entries) {
    const result = await sharp(overlay(eyebrow, title, lang))
      .composite([{ input: motif, top: 65, left: 650 }])
      .png({ compressionLevel: 9, quality: 100 })
      .toBuffer();
    await sharp(result).toFile(path.join(outputRoot, lang, `${key}.png`));
    if (lang === "en" && key === "home") await sharp(result).toFile(path.join(root, "public/og.png"));
  }
}

console.log(`Generated ${Object.values(cards).flat().length} page-specific social cards.`);
