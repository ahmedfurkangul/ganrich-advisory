import type { Channel, TrafficReport } from "../db/traffic";
import type { Lang } from "./content";

// Plain-language reading of a traffic report. Every sentence is computed from the numbers;
// nothing is guessed. Thresholds keep small samples from producing confident-sounding noise.

export const channelLabel: Record<Lang, Record<Channel, string>> = {
  en: { direct: "Direct / unknown", search: "Search engines", ai: "AI assistants", social: "Social", email: "Email", referral: "Other websites", campaign: "Tagged campaigns" },
  tr: { direct: "Doğrudan / bilinmeyen", search: "Arama motorları", ai: "Yapay zekâ asistanları", social: "Sosyal medya", email: "E-posta", referral: "Diğer siteler", campaign: "Etiketli kampanyalar" },
};

function pct(value: number) {
  return `${Math.round(value * 100)}%`;
}

function change(now: number, before: number) {
  if (before === 0) return null;
  return (now - before) / before;
}

export type Insight = { tone: "good" | "watch" | "info"; text: string };

export function trafficInsights(lang: Lang, r: TrafficReport): Insight[] {
  const en = lang === "en";
  const out: Insight[] = [];
  const t = r.totals;
  if (!r.hasData) {
    return [{ tone: "info", text: en
      ? "No traffic has been recorded in this period yet. Logging starts when this version is deployed; the first numbers appear within minutes of the first visit."
      : "Bu dönemde henüz trafik kaydı yok. Kayıt bu sürüm yayına alındığında başlar; ilk ziyaretten birkaç dakika sonra rakamlar görünür." }];
  }

  const visitorChange = change(t.visitors, r.previous.visitors);
  if (visitorChange !== null && r.previous.visitors >= 20) {
    const up = visitorChange >= 0;
    out.push({ tone: up ? "good" : "watch", text: en
      ? `Visitors ${up ? "rose" : "fell"} ${pct(Math.abs(visitorChange))} against the previous ${r.days} days (${t.visitors} vs ${r.previous.visitors}).`
      : `Ziyaretçi sayısı önceki ${r.days} güne göre %${Math.round(Math.abs(visitorChange) * 100)} ${up ? "arttı" : "azaldı"} (${t.visitors} / ${r.previous.visitors}).` });
  } else if (r.previous.visitors < 20) {
    out.push({ tone: "info", text: en
      ? `${t.visitors} visitors and ${t.views} page views in the last ${r.days} days. The previous period is too small for a reliable comparison.`
      : `Son ${r.days} günde ${t.visitors} ziyaretçi ve ${t.views} sayfa görüntülemesi var. Önceki dönem güvenilir bir karşılaştırma için çok küçük.` });
  }

  const totalChannel = r.channels.reduce((s, c) => s + c.visitors, 0);
  const topChannel = r.channels[0];
  if (topChannel && totalChannel >= 10) {
    out.push({ tone: "info", text: en
      ? `${channelLabel.en[topChannel.channel]} bring the largest share of visitors (${pct(topChannel.visitors / totalChannel)}).`
      : `Ziyaretçilerin en büyük kısmı ${channelLabel.tr[topChannel.channel].toLocaleLowerCase("tr-TR")} kanalından geliyor (%${Math.round(topChannel.visitors / totalChannel * 100)}).` });
  }

  if (t.aiReferrals > 0) {
    const top = r.aiReferrers[0]?.label;
    out.push({ tone: "good", text: en
      ? `${t.aiReferrals} visitors arrived from AI assistants${top ? `, most from ${top}` : ""}. The site is being cited in AI answers.`
      : `${t.aiReferrals} ziyaretçi yapay zekâ asistanlarından geldi${top ? `, en çok ${top} üzerinden` : ""}. Site yapay zekâ yanıtlarında kaynak gösteriliyor.` });
  } else if (t.aiBotHits > 0) {
    out.push({ tone: "info", text: en
      ? `AI crawlers read the site ${t.aiBotHits} times, but no visitor has clicked through from an AI assistant yet. That usually follows with a delay of a few weeks.`
      : `Yapay zekâ tarayıcıları siteyi ${t.aiBotHits} kez okudu, ancak henüz bir yapay zekâ asistanından tıklayarak gelen ziyaretçi yok. Bu genellikle birkaç hafta gecikmeyle gelir.` });
  } else {
    out.push({ tone: "watch", text: en
      ? "No AI crawler has visited in this period. Check that Cloudflare's \"Block AI bots\" setting is off."
      : "Bu dönemde hiçbir yapay zekâ tarayıcısı siteyi ziyaret etmedi. Cloudflare'deki \"Block AI bots\" ayarının kapalı olduğunu kontrol edin." });
  }

  const llms = r.discovery.find(d => d.label === "/llms.txt");
  if (llms) out.push({ tone: "good", text: en
    ? `llms.txt was fetched ${llms.views} times (${llms.extra}).`
    : `llms.txt ${llms.views} kez okundu (${llms.extra}).` });

  const topPage = r.pages[0];
  if (topPage && t.views >= 10) out.push({ tone: "info", text: en
    ? `The most visited page is ${topPage.label} with ${topPage.views} views.`
    : `En çok ziyaret edilen sayfa ${topPage.label} (${topPage.views} görüntüleme).` });

  for (const page of r.rising.slice(0, 2)) out.push({ tone: "good", text: page.before === 0
    ? (en ? `${page.label} is new or newly found: ${page.now} views, none in the previous period.` : `${page.label} yeni ilgi görüyor: ${page.now} görüntüleme, önceki dönemde hiç yoktu.`)
    : (en ? `${page.label} is rising: ${page.now} views, up from ${page.before}.` : `${page.label} yükselişte: ${page.before} görüntülemeden ${page.now} görüntülemeye çıktı.`) });

  const mobile = r.devices.find(d => d.label === "mobile");
  const deviceTotal = r.devices.reduce((s, d) => s + (d.visitors ?? 0), 0);
  if (mobile && deviceTotal >= 20) out.push({ tone: "info", text: en
    ? `${pct((mobile.visitors ?? 0) / deviceTotal)} of visitors use a phone.`
    : `Ziyaretçilerin %${Math.round((mobile.visitors ?? 0) / deviceTotal * 100)} kadarı telefondan geliyor.` });

  if (t.visitors >= 30) out.push({ tone: t.inquiries > 0 ? "good" : "watch", text: en
    ? `${t.inquiries} inquiries came in, a conversion rate of ${(t.conversion * 100).toFixed(1)}% of visitors.`
    : `${t.inquiries} talep geldi; ziyaretçilere göre dönüşüm oranı %${(t.conversion * 100).toFixed(1)}.` });

  const f = r.funnel;
  // Only judge once confirmation data exists; earlier days have no "seen" rows at all.
  if (f && f.confirmed > 0 && f.visitors >= 20 && f.confirmed / f.visitors < 0.5) out.push({ tone: "watch", text: en
    ? `Only ${f.confirmed} of ${f.visitors} visitors were confirmed by a browser. The rest are most likely automated clients that pass as people, so read visitor counts with care.`
    : `${f.visitors} ziyaretçiden yalnızca ${f.confirmed} tanesi tarayıcıyla doğrulandı. Geri kalanı büyük olasılıkla insan gibi görünen otomatik istemciler; ziyaretçi sayılarını buna göre okuyun.` });
  if (f && f.checkStart > 0) out.push({ tone: f.checkComplete > 0 ? "good" : "info", text: en
    ? `${f.checkStart} readiness checks were started and ${f.checkComplete} reached a result.`
    : `${f.checkStart} hazırlık testi başlatıldı, ${f.checkComplete} tanesi sonuca ulaştı.` });
  if (f && f.cta > 0) out.push({ tone: f.formSubmit > 0 ? "good" : "info", text: en
    ? `${f.cta} visitors clicked a contact button, ${f.formStart} started the form and ${f.formSubmit} sent it.`
    : `${f.cta} ziyaretçi iletişim düğmesine tıkladı, ${f.formStart} kişi formu doldurmaya başladı ve ${f.formSubmit} kişi gönderdi.` });
  if (f && f.formStart >= 3 && f.formSubmit / f.formStart < 0.5) out.push({ tone: "watch", text: en
    ? `More than half of the people who start the contact form leave without sending it. Worth checking the form on a phone.`
    : `İletişim formunu doldurmaya başlayanların yarısından fazlası göndermeden ayrılıyor. Formu telefonda denemekte fayda var.` });

  if (t.notFound >= 3) out.push({ tone: "watch", text: en
    ? `${t.notFound} visits hit a missing page. The list under "Missing pages" shows which links to fix or redirect.`
    : `${t.notFound} ziyaret bulunamayan bir sayfaya düştü. "Bulunamayan sayfalar" listesi hangi bağlantıların düzeltilmesi gerektiğini gösteriyor.` });

  if (t.pdfDownloads > 0) out.push({ tone: "good", text: en
    ? `Whitepapers were opened ${t.pdfDownloads} times${r.pdfs[0] ? `; the most read is "${r.pdfs[0].label}"` : ""}.`
    : `Teknik notlar ${t.pdfDownloads} kez açıldı${r.pdfs[0] ? `; en çok okunan "${r.pdfs[0].label}"` : ""}.` });

  return out;
}
