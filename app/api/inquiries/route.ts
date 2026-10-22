import { NextResponse } from "next/server";
import { sendInquiryAlert } from "../../inquiry-notify";

export const runtime = "edge";

type InquiryInput = {
  kind?: unknown;
  language?: unknown;
  source?: unknown;
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  role?: unknown;
  region?: unknown;
  interest?: unknown;
  context?: unknown;
  decision?: unknown;
  contactMethod?: unknown;
  privacyAcknowledged?: unknown;
  marketing?: unknown;
  website?: unknown;
};

const limits = {
  source: 100,
  name: 120,
  email: 254,
  organization: 180,
  role: 140,
  region: 100,
  interest: 140,
  context: 4000,
  decision: 2500,
} as const;

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function error(language: string, status: number, en: string, tr: string) {
  return NextResponse.json({ ok: false, message: language === "tr" ? tr : en }, { status });
}

async function fingerprint(request: Request) {
  const forwarded = request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "unknown";
  const agent = request.headers.get("user-agent") ?? "unknown";
  const bytes = new TextEncoder().encode(`${forwarded}|${agent}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return error("en", 415, "Please submit the secure form.", "Lütfen güvenli formu kullanın.");
  }

  let input: InquiryInput;
  try {
    input = await request.json() as InquiryInput;
  } catch {
    return error("en", 400, "The inquiry could not be read.", "Talep okunamadı.");
  }

  const language = input.language === "tr" ? "tr" : "en";
  if (clean(input.website, 200)) return NextResponse.json({ ok: true });

  const kind = input.kind === "briefing" ? "briefing" : input.kind === "contact" ? "contact" : "";
  const source = clean(input.source, limits.source);
  const name = clean(input.name, limits.name);
  const email = clean(input.email, limits.email).toLowerCase();
  const organization = clean(input.organization, limits.organization);
  const role = clean(input.role, limits.role);
  const region = clean(input.region, limits.region);
  const interest = clean(input.interest, limits.interest);
  const context = clean(input.context, limits.context);
  const decision = clean(input.decision, limits.decision);
  const contactMethod = ["email", "linkedin", "call"].includes(String(input.contactMethod)) ? String(input.contactMethod) : "email";
  const privacyAcknowledged = input.privacyAcknowledged === "yes";
  const marketingConsent = input.marketing === "yes";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (
    !kind || !source || name.length < 2 || !emailPattern.test(email)
    || context.length < (kind === "contact" ? 15 : 30)
    || (kind === "briefing" && (!organization || !region || !interest))
    || (kind === "briefing" && decision.length < 15) || !privacyAcknowledged
  ) {
    return error(
      language,
      400,
      "Please complete the required fields and acknowledge the privacy notice.",
      "Lütfen zorunlu alanları doldurun ve gizlilik bildirimini onaylayın.",
    );
  }

  try {
    const { env } = await import("cloudflare:workers");
    if (!env.DB) {
      return error(language, 503, "Secure inquiry storage is temporarily unavailable.", "Güvenli talep kaydı geçici olarak kullanılamıyor.");
    }

    await env.DB.batch([
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS inquiries (
        id text PRIMARY KEY NOT NULL,
        kind text NOT NULL,
        language text NOT NULL,
        source text NOT NULL,
        name text NOT NULL,
        email text NOT NULL,
        organization text NOT NULL,
        role text DEFAULT '' NOT NULL,
        region text NOT NULL,
        interest text NOT NULL,
        context text NOT NULL,
        decision text DEFAULT '' NOT NULL,
        contact_method text DEFAULT 'email' NOT NULL,
        marketing_consent integer DEFAULT false NOT NULL,
        privacy_acknowledged integer DEFAULT false NOT NULL,
        request_fingerprint text NOT NULL,
        status text DEFAULT 'new' NOT NULL,
        created_at text NOT NULL
      )`),
      env.DB.prepare("CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at)"),
      env.DB.prepare("CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status)"),
      env.DB.prepare("CREATE INDEX IF NOT EXISTS inquiries_fingerprint_idx ON inquiries (request_fingerprint)"),
    ]);

    const requestFingerprint = await fingerprint(request);
    const windowStart = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recent = await env.DB
      .prepare("SELECT COUNT(*) AS total FROM inquiries WHERE request_fingerprint = ? AND created_at >= ?")
      .bind(requestFingerprint, windowStart)
      .first<{ total: number }>();

    if (Number(recent?.total ?? 0) >= 5) {
      return error(language, 429, "Too many recent inquiries. Please try again later.", "Yakın zamanda çok sayıda talep gönderildi. Lütfen daha sonra tekrar deneyin.");
    }

    await env.DB.prepare(`INSERT INTO inquiries (
      id, kind, language, source, name, email, organization, role, region, interest,
      context, decision, contact_method, marketing_consent, privacy_acknowledged,
      request_fingerprint, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`)
      .bind(
        crypto.randomUUID(),
        kind,
        language,
        source,
        name,
        email,
        organization,
        role,
        region,
        interest,
        context,
        decision,
        contactMethod,
        marketingConsent ? 1 : 0,
        1,
        requestFingerprint,
        new Date().toISOString(),
      )
      .run();

    await sendInquiryAlert(env, {
      kind, language, source, name, email, organization, role, region, interest, context, decision, contactMethod,
    });

    return NextResponse.json({ ok: true });
  } catch (caught) {
    console.error("Inquiry persistence failed", caught instanceof Error ? caught.name : "unknown");
    return error(language, 500, "The inquiry could not be stored securely. Please use the direct email address.", "Talep güvenli şekilde kaydedilemedi. Lütfen doğrudan e-posta adresini kullanın.");
  }
}
