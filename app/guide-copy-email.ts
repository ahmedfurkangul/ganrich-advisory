// Emails a visitor a copy of a guide they asked for: the guide's link, the related PDF whitepaper when there
// is one, and the next steps. Built only from the canonical guide copy, so no free text from the browser
// reaches the email. Uses the same Resend settings as the inquiry alerts; without them nothing is sent.

import type { Lang } from "./content";
import { solutions } from "./solutions-content";

// The PDF whitepaper of a guide's programme, if it has one (same report routes as the solution pages).
export function solutionPaperPath(lang: Lang, solution: string) {
  const paper = solutions[lang].find(s => s.key === solution)?.paper;
  return paper ? (lang === "tr" ? `/tr/icgoruler/rapor/${paper.slug}` : `/en/insights/report/${paper.slug}`) : undefined;
}

type CopyEnv = { RESEND_API_KEY?: string; INQUIRY_NOTIFY_FROM?: string };

export type GuideCopyInput = {
  lang: Lang;
  title: string;
  description: string;
  links: { guide: string; programme: string; paper?: string; check?: string; contact: string };
};

const words = {
  en: {
    subject: (title: string) => `Your copy: ${title}`,
    hello: "Hello,",
    intro: "Here is the guide you asked for on ganrichadvisory.com.",
    read: "Read the guide",
    pdf: "To keep it as a PDF, open the guide and use your browser's Print, then Save as PDF.",
    paper: "Download the related whitepaper (PDF)",
    check: "Take the readiness check",
    programme: "Read about the programme",
    contact: "Ask for a first review",
    reply: "You can reply to this email if you would like to talk it through.",
    why: "You received this email because you asked for a copy of this guide. We do not add you to any mailing list.",
  },
  tr: {
    subject: (title: string) => `Kopyanız: ${title}`,
    hello: "Merhaba,",
    intro: "ganrichadvisory.com üzerinde istediğiniz teknik not aşağıdadır.",
    read: "Teknik notu okuyun",
    pdf: "PDF olarak saklamak için notu açın, tarayıcınızda Yazdır'ı seçip PDF olarak kaydedin.",
    paper: "İlgili teknik raporu indirin (PDF)",
    check: "Hazırlık testini yapın",
    programme: "Program hakkında okuyun",
    contact: "Ön görüşme isteyin",
    reply: "Üzerine konuşmak isterseniz bu e-postayı yanıtlayabilirsiniz.",
    why: "Bu e-postayı, bu teknik notun bir kopyasını istediğiniz için aldınız. Sizi herhangi bir e-posta listesine eklemiyoruz.",
  },
} as const;

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

export function guideCopyMessage({ lang, title, description, links }: GuideCopyInput) {
  const w = words[lang];
  const next: [string, string][] = [
    ...(links.paper ? [[w.paper, links.paper] as [string, string]] : []),
    ...(links.check ? [[w.check, links.check] as [string, string]] : []),
    [w.programme, links.programme],
    [w.contact, links.contact],
  ];
  const text = [
    w.hello, "", w.intro, "",
    title, description, "",
    `${w.read}: ${links.guide}`,
    w.pdf, "",
    ...next.map(([label, href]) => `- ${label}: ${href}`), "",
    w.reply, "",
    "Ganrich Advisory · furkangul@ganrichadvisory.com",
    w.why,
  ].join("\n");
  const p = (s: string, style = "") => `<p style="margin:0 0 14px;${style}">${escapeHtml(s)}</p>`;
  const html = `<!doctype html><html lang="${lang}"><body style="margin:0;padding:24px;background:#f3f0ea;font-family:Georgia,serif;color:#121513">
<div style="max-width:640px;margin:0 auto;background:#fbfaf7;padding:32px;border:1px solid #d9d2c4">
${p(w.hello)}${p(w.intro)}
<h1 style="margin:24px 0 8px;font-size:24px;font-weight:400">${escapeHtml(title)}</h1>
${p(description, "font:15px/1.5 Arial,sans-serif;color:#3c3a35")}
<p style="margin:20px 0"><a href="${escapeHtml(links.guide)}" style="display:inline-block;padding:12px 20px;background:#1f3a2e;color:#fbfaf7;text-decoration:none;font:15px Arial,sans-serif">${escapeHtml(w.read)}</a></p>
${p(w.pdf, "font:13px Arial,sans-serif;color:#6f6a60")}
<ul style="margin:16px 0;padding-left:20px;font:14px/1.6 Arial,sans-serif">${next.map(([label, href]) => `<li><a href="${escapeHtml(href)}" style="color:#1f3a2e">${escapeHtml(label)}</a></li>`).join("")}</ul>
${p(w.reply, "font:14px Arial,sans-serif")}
<p style="margin:24px 0 0;font:12px Arial,sans-serif;color:#6f6a60">Ganrich Advisory · furkangul@ganrichadvisory.com<br>${escapeHtml(w.why)}</p>
</div></body></html>`;
  return { subject: w.subject(title).replace(/[\r\n]+/g, " ").slice(0, 160), text, html };
}

export async function sendGuideCopy(env: CopyEnv, to: string, input: GuideCopyInput, fetcher: typeof fetch = fetch): Promise<"sent" | "skipped" | "failed"> {
  if (!env.RESEND_API_KEY || !env.INQUIRY_NOTIFY_FROM) return "skipped";
  const { subject, text, html } = guideCopyMessage(input);
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ from: env.INQUIRY_NOTIFY_FROM, to: [to], subject, text, html, reply_to: "furkangul@ganrichadvisory.com" }),
    });
    if (!response.ok) { console.error("Guide copy email failed", response.status); return "failed"; }
    return "sent";
  } catch (caught) {
    console.error("Guide copy email failed", caught instanceof Error ? caught.name : "unknown");
    return "failed";
  }
}
