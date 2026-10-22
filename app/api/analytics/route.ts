const allowedEvents = new Set(["contact_started", "insight_viewed", "decision_tool_started", "private_briefing_started", "language_switched"]);

type AnalyticsEvent = {
  event?: string;
  path?: string;
  language?: string;
  occurredAt?: string;
};

export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_ANALYTICS_MODE !== "cookieless") {
    return new Response(null, { status: 404, headers: { "cache-control": "no-store" } });
  }
  let payload: AnalyticsEvent;
  try {
    payload = await request.json() as AnalyticsEvent;
  } catch {
    return Response.json({ ok: false }, { status: 400, headers: { "cache-control": "no-store" } });
  }
  if (!payload.event || !allowedEvents.has(payload.event) || !payload.path?.startsWith("/") || !["en", "tr"].includes(payload.language ?? "")) {
    return Response.json({ ok: false }, { status: 400, headers: { "cache-control": "no-store" } });
  }
  const endpoint = process.env.ANALYTICS_ENDPOINT;
  if (endpoint) {
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.ANALYTICS_TOKEN ? { authorization: `Bearer ${process.env.ANALYTICS_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        event: payload.event,
        path: payload.path.slice(0, 300),
        language: payload.language,
        occurredAt: payload.occurredAt,
      }),
    });
  }
  return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
}
