import { isToken, newsletterPath, subscribersTableSql } from "../../../newsletter-core";

export const runtime = "edge";

// Opened from the confirmation email. Activates a pending subscription, then sends the visitor to the
// newsletter page with the outcome.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  let lang: "en" | "tr" = "en";
  let status = "invalid";
  if (isToken(token)) {
    try {
      const { env } = await import("cloudflare:workers");
      if (env.DB) {
        await env.DB.batch(subscribersTableSql.map(sql => env.DB.prepare(sql)));
        const row = await env.DB.prepare("SELECT language, status FROM subscribers WHERE token = ?").bind(token).first<{ language: string; status: string }>();
        if (row) {
          lang = row.language === "tr" ? "tr" : "en";
          if (row.status === "pending") {
            await env.DB.prepare("UPDATE subscribers SET status = 'active', confirmed_at = ? WHERE token = ? AND status = 'pending'").bind(new Date().toISOString(), token).run();
          }
          status = row.status === "unsubscribed" ? "invalid" : "confirmed";
        }
      }
    } catch (caught) {
      console.error("Newsletter confirmation failed", caught instanceof Error ? caught.name : "unknown");
    }
  }
  return Response.redirect(`${url.origin}${newsletterPath[lang]}?status=${status}`, 303);
}
