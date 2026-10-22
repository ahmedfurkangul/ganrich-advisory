// Sends a short email alert for a stored inquiry through Resend.
//
// Configuration (all optional; without them nothing is sent):
// - RESEND_API_KEY (secret)
// - INQUIRY_NOTIFY_TO: comma-separated recipients
// - INQUIRY_NOTIFY_FROM: verified sender, e.g. "Ganrich Advisory <notifications@ganrichadvisory.com>"
//
// The inquiry is already in D1 when this runs, so a failed alert never fails
// the visitor's submission.

export type InquiryAlert = {
  kind: string;
  language: string;
  source: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  region: string;
  interest: string;
  context: string;
  decision: string;
  contactMethod: string;
};

type NotifyEnv = {
  RESEND_API_KEY?: string;
  INQUIRY_NOTIFY_TO?: string;
  INQUIRY_NOTIFY_FROM?: string;
};

export function inquiryAlertMessage(inquiry: InquiryAlert) {
  const label = inquiry.kind === "briefing" ? "Private briefing request" : "New inquiry";
  const lines = [
    `${label} from ${inquiry.name} <${inquiry.email}>`,
    "",
    ["Organization", inquiry.organization],
    ["Role", inquiry.role],
    ["Region", inquiry.region],
    ["Interest", inquiry.interest],
    ["Preferred contact", inquiry.contactMethod],
    ["Language", inquiry.language],
    ["Source", inquiry.source],
  ].map(line => typeof line === "string" ? line : line[1] ? `${line[0]}: ${line[1]}` : null).filter(line => line !== null);
  lines.push("", "Context:", inquiry.context);
  if (inquiry.decision) lines.push("", "Decision:", inquiry.decision);
  lines.push("", "Stored in the inquiries table. Reply directly to this email to answer.");
  return {
    subject: `${label}: ${inquiry.name}${inquiry.organization ? ` (${inquiry.organization})` : ""}`.replace(/[\r\n]+/g, " ").slice(0, 160),
    text: lines.join("\n"),
  };
}

export async function sendInquiryAlert(env: NotifyEnv, inquiry: InquiryAlert, fetcher: typeof fetch = fetch): Promise<"sent" | "skipped" | "failed"> {
  const to = (env.INQUIRY_NOTIFY_TO ?? "").split(",").map(address => address.trim()).filter(Boolean);
  if (!env.RESEND_API_KEY || !env.INQUIRY_NOTIFY_FROM || to.length === 0) return "skipped";

  const { subject, text } = inquiryAlertMessage(inquiry);
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ from: env.INQUIRY_NOTIFY_FROM, to, subject, text, reply_to: inquiry.email }),
    });
    if (!response.ok) {
      console.error("Inquiry alert failed", response.status);
      return "failed";
    }
    return "sent";
  } catch (caught) {
    console.error("Inquiry alert failed", caught instanceof Error ? caught.name : "unknown");
    return "failed";
  }
}
