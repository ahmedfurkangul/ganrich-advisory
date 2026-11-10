import { subscribersTableSql } from "../../../newsletter-core";
import { unsubscribedEmailFrom, verifyResendWebhook } from "../../../newsletter-resend";

export const runtime = "edge";

// Resend calls this when a contact unsubscribes through the link in a Broadcast (or is deleted there),
// so the subscribers table, our record of consent, shows the same status. Only signed requests count.
export async function POST(request: Request) {
  const body = await request.text();
  try {
    const { env } = await import("cloudflare:workers");
    const secret = (env as { RESEND_WEBHOOK_SECRET?: string }).RESEND_WEBHOOK_SECRET;
    if (!(await verifyResendWebhook(secret, request.headers, body))) return new Response("Invalid signature", { status: 401 });
    let event: unknown;
    try { event = JSON.parse(body); } catch { return new Response("Bad request", { status: 400 }); }
    const email = unsubscribedEmailFrom(event);
    if (email && env.DB) {
      await env.DB.batch(subscribersTableSql.map(sql => env.DB.prepare(sql)));
      await env.DB.prepare("UPDATE subscribers SET status = 'unsubscribed', unsubscribed_at = ? WHERE email = ? AND status != 'unsubscribed'")
        .bind(new Date().toISOString(), email).run();
    }
    return new Response(null, { status: 204 });
  } catch (caught) {
    console.error("Resend webhook failed", caught instanceof Error ? caught.name : "unknown");
    return new Response("Error", { status: 500 });
  }
}
