import { NextResponse } from "next/server";
import { sendInquiryAlert } from "../../../../inquiry-notify";
import { grantsTableSql } from "../../../../download-grants";
import { newToken, normaliseEmail } from "../../../../newsletter-core";
import { subscribe } from "../../../../newsletter-server";

export const runtime = "edge";

// Email gate for PDFs with the "email_gated" access model. The visitor's details are stored as a
// "download" inquiry (so the editors are alerted), and a 24-hour link to the document is returned.

type Context = { params: Promise<{ id: string }> };
type AccessInput = { name?: unknown; email?: unknown; organization?: unknown; privacyAcknowledged?: unknown; newsletter?: unknown; language?: unknown; website?: unknown };

const clean = (value: unknown, limit: number) => typeof value === "string" ? value.trim().slice(0, limit) : "";

function reply(language: string, status: number, en: string, tr: string) {
  return NextResponse.json({ ok: false, message: language === "tr" ? tr : en }, { status });
}

async function fingerprint(request: Request) {
  const forwarded = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const agent = request.headers.get("user-agent") ?? "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${forwarded}|${agent}`));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: Request, context: Context) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return reply("en", 415, "Please use the form on the site.", "Lütfen sitedeki formu kullanın.");
  }
  let input: AccessInput;
  try {
    input = await request.json() as AccessInput;
  } catch {
    return reply("en", 400, "The request could not be read.", "Talep okunamadı.");
  }
  const language = input.language === "tr" ? "tr" : "en";
  const { id } = await context.params;
  if (clean(input.website, 200)) return NextResponse.json({ ok: true, url: "" });

  const name = clean(input.name, 120);
  const email = normaliseEmail(input.email);
  const organization = clean(input.organization, 180);
  if (name.length < 2 || !email || !organization || input.privacyAcknowledged !== "yes") {
    return reply(language, 400, "Please complete the required fields and acknowledge the privacy notice.", "Lütfen zorunlu alanları doldurun ve gizlilik bildirimini onaylayın.");
  }

  try {
    const { env } = await import("cloudflare:workers");
    if (!env.DB) return reply(language, 503, "Downloads are temporarily unavailable.", "İndirme geçici olarak kullanılamıyor.");
    const record = await env.DB.prepare("SELECT title, slug, language FROM pdf_insights WHERE id = ? AND status = 'published' AND gating_model = 'email_gated' LIMIT 1")
      .bind(id).first<{ title: string; slug: string; language: string }>();
    if (!record) return reply(language, 404, "This document is not available.", "Bu belge mevcut değil.");

    await env.DB.batch(grantsTableSql.map(sql => env.DB.prepare(sql)));
    const requestFingerprint = await fingerprint(request);
    const now = new Date();
    const recent = await env.DB.prepare("SELECT COUNT(*) AS total FROM inquiries WHERE request_fingerprint = ? AND created_at >= ?")
      .bind(requestFingerprint, new Date(now.getTime() - 60 * 60 * 1000).toISOString()).first<{ total: number }>();
    if (Number(recent?.total ?? 0) >= 10) {
      return reply(language, 429, "Too many recent requests. Please try again later.", "Yakın zamanda çok sayıda talep gönderildi. Lütfen daha sonra tekrar deneyin.");
    }

    const source = (record.language === "tr" ? `/tr/icgoruler/rapor/${record.slug}` : `/en/insights/report/${record.slug}`).slice(0, 100);
    const interest = `PDF: ${record.title}`.slice(0, 140);
    const context = `Downloaded the whitepaper "${record.title}".${input.newsletter === "yes" ? " Asked for regulation updates." : ""}`;
    const marketing = input.newsletter === "yes";
    await env.DB.prepare(`INSERT INTO inquiries (
      id, kind, language, source, name, email, organization, role, region, interest,
      context, decision, contact_method, marketing_consent, privacy_acknowledged,
      request_fingerprint, status, created_at
    ) VALUES (?, 'download', ?, ?, ?, ?, ?, '', '', ?, ?, '', 'email', ?, 1, ?, 'new', ?)`)
      .bind(crypto.randomUUID(), language, source, name, email, organization, interest, context, marketing ? 1 : 0, requestFingerprint, now.toISOString())
      .run();

    const token = newToken();
    await env.DB.prepare("INSERT INTO download_grants (token, insight_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
      .bind(token, id, new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), now.toISOString()).run();

    await sendInquiryAlert(env, { kind: "download", language, source, name, email, organization, role: "", region: "", interest, context, decision: "", contactMethod: "email" });
    if (marketing) await subscribe(env, { email, language, source, requestFingerprint, origin: new URL(request.url).origin });

    return NextResponse.json({ ok: true, url: `/api/pdf-insights/${id}/document?access=${token}` });
  } catch (caught) {
    console.error("PDF access request failed", caught instanceof Error ? caught.name : "unknown");
    return reply(language, 500, "The request could not be completed. Please write to furkangul@ganrichadvisory.com.", "Talep tamamlanamadı. Lütfen furkangul@ganrichadvisory.com adresine yazın.");
  }
}
