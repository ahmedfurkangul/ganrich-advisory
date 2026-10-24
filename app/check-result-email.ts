// Emails a visitor a one-page copy of their readiness-check result through Resend.
//
// The message is rebuilt from the canonical check copy and the visitor's answers (0, 1 or 2 per question),
// so no free text from the browser reaches the email. Uses the same RESEND_API_KEY and INQUIRY_NOTIFY_FROM
// as the inquiry alerts; without them nothing is sent. A failed copy never fails the visitor's submission.

import type { Lang } from "./content";
import type { Answer, CheckCopy } from "./readiness-check-content";

type ResultEnv = { RESEND_API_KEY?: string; INQUIRY_NOTIFY_FROM?: string };

export type CheckResultInput = {
  lang: Lang;
  copy: CheckCopy;
  answers: readonly Answer[];
  links: { check: string; programme: string; paper?: string; contact: string };
};

const words = {
  en: {
    subject: (label: string, score: number, max: number, band: string) => `Your ${label} result: ${score}/${max} (${band})`,
    hello: "Hello,",
    intro: "Here is the copy of your result you asked for on ganrichadvisory.com.",
    answers: "Your answers",
    next: "Useful next steps",
    retake: "Take the check again",
    programme: "Read about the programme",
    paper: "Read the whitepaper",
    contact: "Ask for a first review",
    reply: "You can reply to this email if you would like to talk it through.",
    why: "You received this email because you asked for a copy of your result. We do not add you to any mailing list.",
  },
  tr: {
    subject: (label: string, score: number, max: number, band: string) => `${label} sonucunuz: ${score}/${max} (${band})`,
    hello: "Merhaba,",
    intro: "ganrichadvisory.com üzerinde istediğiniz sonuç kopyanız aşağıdadır.",
    answers: "Cevaplarınız",
    next: "Faydalı sonraki adımlar",
    retake: "Testi yeniden yapın",
    programme: "Program hakkında okuyun",
    paper: "Teknik notu okuyun",
    contact: "Ön görüşme isteyin",
    reply: "Üzerine konuşmak isterseniz bu e-postayı yanıtlayabilirsiniz.",
    why: "Bu e-postayı, sonucunuzun bir kopyasını istediğiniz için aldınız. Sizi herhangi bir e-posta listesine eklemiyoruz.",
  },
} as const;

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

export function checkResultMessage({ lang, copy, answers, links }: CheckResultInput) {
  const w = words[lang];
  const max = copy.questions.length * 2;
  const score = answers.reduce<number>((s, a) => s + a, 0);
  const band = copy.bands[score <= 6 ? 0 : score <= 11 ? 1 : 2];
  const gaps = copy.questions.filter((_, i) => answers[i] < 2);
  const rows = copy.questions.map((q, i) => [copy.answers[2 - answers[i]], q.q] as const);
  const linkList: [string, string][] = [[w.programme, links.programme], ...(links.paper ? [[w.paper, links.paper] as [string, string]] : []), [w.retake, links.check], [w.contact, links.contact]];

  const text = [
    w.hello, "", w.intro, "",
    `${copy.label}`,
    `${copy.score}: ${score}/${max}`,
    `${band[0]}. ${band[1]}`, "",
    `${copy.gaps}:`,
    ...(gaps.length ? gaps.map(g => `- ${g.gap}`) : [copy.noGaps]), "",
    `${w.answers}:`,
    ...rows.map(([answer, question], i) => `${i + 1}. ${answer}: ${question}`), "",
    `${w.next}:`,
    ...linkList.map(([label, href]) => `- ${label}: ${href}`), "",
    copy.disclaimer, "",
    w.reply, "",
    "Ganrich Advisory · furkangul@ganrichadvisory.com",
    w.why,
  ].join("\n");

  const p = (s: string, style = "") => `<p style="margin:0 0 14px;${style}">${escapeHtml(s)}</p>`;
  const html = `<!doctype html><html lang="${lang}"><body style="margin:0;padding:24px;background:#f3f0ea;font-family:Georgia,serif;color:#121513">
<div style="max-width:640px;margin:0 auto;background:#fbfaf7;padding:32px;border:1px solid #d9d2c4">
${p(w.hello)}${p(w.intro)}
<p style="margin:24px 0 4px;font:12px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6f6a60">${escapeHtml(copy.label)}</p>
<p style="margin:0 0 8px;font-size:40px">${score}<span style="font-size:18px;color:#6f6a60">/${max}</span></p>
<p style="margin:0 0 6px;font-size:20px">${escapeHtml(band[0])}</p>
${p(band[1], "font:15px/1.5 Arial,sans-serif")}
<h2 style="margin:24px 0 8px;font-size:18px">${escapeHtml(copy.gaps)}</h2>
${gaps.length ? `<ul style="margin:0 0 16px;padding-left:20px;font:14px/1.5 Arial,sans-serif">${gaps.map(g => `<li style="margin-bottom:6px">${escapeHtml(g.gap)}</li>`).join("")}</ul>` : p(copy.noGaps, "font:14px Arial,sans-serif")}
<h2 style="margin:24px 0 8px;font-size:18px">${escapeHtml(w.answers)}</h2>
<ol style="margin:0 0 16px;padding-left:20px;font:13px/1.5 Arial,sans-serif;color:#3c3a35">${rows.map(([answer, question]) => `<li style="margin-bottom:6px"><strong>${escapeHtml(answer)}</strong>: ${escapeHtml(question)}</li>`).join("")}</ol>
<h2 style="margin:24px 0 8px;font-size:18px">${escapeHtml(w.next)}</h2>
<ul style="margin:0 0 16px;padding-left:20px;font:14px/1.6 Arial,sans-serif">${linkList.map(([label, href]) => `<li><a href="${escapeHtml(href)}" style="color:#1f3a2e">${escapeHtml(label)}</a></li>`).join("")}</ul>
${p(copy.disclaimer, "font:12px Arial,sans-serif;color:#6f6a60")}
${p(w.reply, "font:14px Arial,sans-serif")}
<p style="margin:24px 0 0;font:12px Arial,sans-serif;color:#6f6a60">Ganrich Advisory · furkangul@ganrichadvisory.com<br>${escapeHtml(w.why)}</p>
</div></body></html>`;

  return { subject: w.subject(copy.label, score, max, band[0]).replace(/[\r\n]+/g, " ").slice(0, 160), text, html };
}

export async function sendCheckResult(env: ResultEnv, to: string, input: CheckResultInput, fetcher: typeof fetch = fetch): Promise<"sent" | "skipped" | "failed"> {
  if (!env.RESEND_API_KEY || !env.INQUIRY_NOTIFY_FROM) return "skipped";
  const { subject, text, html } = checkResultMessage(input);
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ from: env.INQUIRY_NOTIFY_FROM, to: [to], subject, text, html, reply_to: "furkangul@ganrichadvisory.com" }),
    });
    if (!response.ok) {
      console.error("Check result email failed", response.status);
      return "failed";
    }
    return "sent";
  } catch (caught) {
    console.error("Check result email failed", caught instanceof Error ? caught.name : "unknown");
    return "failed";
  }
}
