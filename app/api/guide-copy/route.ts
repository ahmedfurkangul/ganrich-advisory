import { NextResponse } from "next/server";
import { sendInquiryAlert } from "../../inquiry-notify";
import { sendGuideCopy } from "../../guide-copy-email";
import { guideByKey } from "../../guides-content";
import { routeMap } from "../../content";
import { checks } from "../../readiness-check-content";
import { solutionPaperPath } from "../../guide-copy-email";
import { normaliseEmail } from "../../newsletter-core";
import { absoluteUrl } from "../../site-config";

export const runtime = "edge";

// "Email me this guide": stores the request as a "download" inquiry (so the editors are alerted and the
// 24-month retention applies) and emails the visitor the guide link and related PDF. Email is the only field.

type CopyInput = { guide?: unknown; email?: unknown; privacyAcknowledged?: unknown; language?: unknown; website?: unknown };

function reply(language: string, status: number, en: string, tr: string) {
  return NextResponse.json({ ok: false, message: language === "tr" ? tr : en }, { status });
}

async function fingerprint(request: Request) {
  const forwarded = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const agent = request.headers.get("user-agent") ?? "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${forwarded}|${agent}`));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

const checkFor: Record<string, keyof typeof checks> = { solutionCbam: "cbam", solutionCra: "cra", solutionEudr: "eudr" };

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return reply("en", 415, "Please use the form on the site.", "Lütfen sitedeki formu kullanın.");
  }
  let input: CopyInput;
  try {
    input = await request.json() as CopyInput;
  } catch {
    return reply("en", 400, "The request could not be read.", "Talep okunamadı.");
  }
  const language = input.language === "tr" ? "tr" : "en";
  if (typeof input.website === "string" && input.website.trim()) return NextResponse.json({ ok: true });
  const guide = typeof input.guide === "string" ? guideByKey(input.guide) : undefined;
  const email = normaliseEmail(input.email);
  if (!guide) return reply(language, 404, "This guide is not available.", "Bu teknik not mevcut değil.");
  if (!email || input.privacyAcknowledged !== "yes") {
    return reply(language, 400, "Please enter your email and acknowledge the privacy notice.", "Lütfen e-postanızı girin ve gizlilik bildirimini onaylayın.");
  }

  try {
    const { env } = await import("cloudflare:workers");
    if (!env.DB) return reply(language, 503, "This is temporarily unavailable.", "Bu işlem geçici olarak kullanılamıyor.");
    const requestFingerprint = await fingerprint(request);
    const now = new Date();
    const recent = await env.DB.prepare("SELECT COUNT(*) AS total FROM inquiries WHERE request_fingerprint = ? AND created_at >= ?")
      .bind(requestFingerprint, new Date(now.getTime() - 60 * 60 * 1000).toISOString()).first<{ total: number }>();
    if (Number(recent?.total ?? 0) >= 10) {
      return reply(language, 429, "Too many recent requests. Please try again later.", "Yakın zamanda çok sayıda talep gönderildi. Lütfen daha sonra tekrar deneyin.");
    }

    const t = guide[language];
    const source = `/${language}/${t.path}`.slice(0, 100);
    const interest = `Guide: ${t.h1}`.slice(0, 140);
    const context = `Asked for an emailed copy of the guide "${t.h1}".`;
    await env.DB.prepare(`INSERT INTO inquiries (
      id, kind, language, source, name, email, organization, role, region, interest,
      context, decision, contact_method, marketing_consent, privacy_acknowledged,
      request_fingerprint, status, created_at
    ) VALUES (?, 'download', ?, ?, '', ?, '', '', '', ?, ?, '', 'email', 0, 1, ?, 'new', ?)`)
      .bind(crypto.randomUUID(), language, source, email, interest, context, requestFingerprint, now.toISOString())
      .run();

    await sendInquiryAlert(env, { kind: "download", language, source, name: email, email, organization: "", role: "", region: "", interest, context, decision: "", contactMethod: "email" });

    const page = (key: string) => absoluteUrl(`/${language}/${routeMap[language][key]}`);
    const check = checkFor[guide.solution] ? checks[checkFor[guide.solution]] : undefined;
    const copy = await sendGuideCopy(env, email, {
      lang: language, title: t.h1, description: t.description,
      links: {
        guide: absoluteUrl(`/${language}/${t.path}`),
        programme: page(guide.solution),
        paper: solutionPaperPath(language, guide.solution) ? absoluteUrl(solutionPaperPath(language, guide.solution)!) : undefined,
        check: check ? page(check.route) : undefined,
        contact: `${page("contact")}?service=${guide.solution}`,
      },
    });
    return NextResponse.json({ ok: true, copy });
  } catch (caught) {
    console.error("Guide copy request failed", caught instanceof Error ? caught.name : "unknown");
    return reply(language, 500, "The request could not be completed. Please write to furkangul@ganrichadvisory.com.", "Talep tamamlanamadı. Lütfen furkangul@ganrichadvisory.com adresine yazın.");
  }
}
