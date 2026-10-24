import { NextResponse } from "next/server";
import { isToken, normaliseEmail, subscribersTableSql } from "../../newsletter-core";
import { subscribe } from "../../newsletter-server";

export const runtime = "edge";

type NewsletterInput = { action?: unknown; email?: unknown; language?: unknown; source?: unknown; consent?: unknown; token?: unknown; website?: unknown };

function reply(language: string, status: number, en: string, tr: string) {
  return NextResponse.json({ ok: status < 400, message: language === "tr" ? tr : en }, { status });
}

async function fingerprint(request: Request) {
  const forwarded = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const agent = request.headers.get("user-agent") ?? "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`newsletter|${forwarded}|${agent}`));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return reply("en", 415, "Please use the form on the site.", "Lütfen sitedeki formu kullanın.");
  }
  let input: NewsletterInput;
  try {
    input = await request.json() as NewsletterInput;
  } catch {
    return reply("en", 400, "The request could not be read.", "Talep okunamadı.");
  }
  const language = input.language === "tr" ? "tr" : "en";
  if (typeof input.website === "string" && input.website.trim()) return NextResponse.json({ ok: true });

  const unsubscribing = input.action === "unsubscribe";
  const email = normaliseEmail(input.email);
  if (unsubscribing ? !isToken(input.token) : !email || input.consent !== "yes") {
    return reply(language, 400, "Please enter a valid email address and tick the consent box.", "Lütfen geçerli bir e-posta adresi girin ve onay kutusunu işaretleyin.");
  }

  try {
    const { env } = await import("cloudflare:workers");
    if (!env.DB) return reply(language, 503, "Sign-up is temporarily unavailable.", "Kayıt geçici olarak kullanılamıyor.");
    await env.DB.batch(subscribersTableSql.map(sql => env.DB.prepare(sql)));
    const now = new Date().toISOString();

    if (unsubscribing) {
      await env.DB.prepare("UPDATE subscribers SET status = 'unsubscribed', unsubscribed_at = ? WHERE token = ? AND status != 'unsubscribed'").bind(now, input.token).run();
      return reply(language, 200, "You are unsubscribed and will receive no further updates.", "Kaydınız iptal edildi; size artık bülten gönderilmeyecek.");
    }

    const requestFingerprint = await fingerprint(request);
    const recent = await env.DB
      .prepare("SELECT COUNT(*) AS total FROM subscribers WHERE request_fingerprint = ? AND created_at >= ?")
      .bind(requestFingerprint, new Date(Date.now() - 60 * 60 * 1000).toISOString())
      .first<{ total: number }>();
    if (Number(recent?.total ?? 0) >= 5) {
      return reply(language, 429, "Too many sign-ups from this connection. Please try again later.", "Bu bağlantıdan çok sayıda kayıt yapıldı. Lütfen daha sonra tekrar deneyin.");
    }

    const source = typeof input.source === "string" ? input.source.trim().slice(0, 100) : "";
    await subscribe(env, { email, language, source, requestFingerprint, origin: new URL(request.url).origin });
    return reply(language, 200, "Almost done: check your inbox and open the confirmation link.", "Neredeyse tamam: e-postanızı kontrol edin ve onay bağlantısını açın.");
  } catch (caught) {
    console.error("Newsletter sign-up failed", caught instanceof Error ? caught.name : "unknown");
    return reply(language, 500, "Sign-up failed. Please try again later.", "Kayıt yapılamadı. Lütfen daha sonra tekrar deneyin.");
  }
}
