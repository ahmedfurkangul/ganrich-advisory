import { newToken, sendConfirmation, subscribersTableSql, type NewsletterLang } from "./newsletter-core";

type SubscribeEnv = { DB: D1Database; RESEND_API_KEY?: string; INQUIRY_NOTIFY_FROM?: string };

// Adds an address to the regulation-update list as pending and sends the confirmation email.
// An address that is already active is left as it is, so callers can give the same answer either way.
export async function subscribe(env: SubscribeEnv, input: { email: string; language: NewsletterLang; source: string; requestFingerprint: string; origin: string }) {
  await env.DB.batch(subscribersTableSql.map(sql => env.DB.prepare(sql)));
  const { email, language, source, requestFingerprint, origin } = input;
  const existing = await env.DB.prepare("SELECT status FROM subscribers WHERE email = ?").bind(email).first<{ status: string }>();
  if (existing?.status === "active") return;
  const token = newToken();
  const now = new Date().toISOString();
  if (existing) {
    await env.DB.prepare("UPDATE subscribers SET status = 'pending', token = ?, language = ?, source = ?, request_fingerprint = ?, created_at = ?, unsubscribed_at = NULL WHERE email = ?")
      .bind(token, language, source, requestFingerprint, now, email).run();
  } else {
    await env.DB.prepare("INSERT INTO subscribers (id, email, language, source, status, token, request_fingerprint, created_at) VALUES (?, ?, ?, ?, 'pending', ?, ?, ?)")
      .bind(crypto.randomUUID(), email, language, source, token, requestFingerprint, now).run();
  }
  await sendConfirmation(env, email, language, origin, token);
}
