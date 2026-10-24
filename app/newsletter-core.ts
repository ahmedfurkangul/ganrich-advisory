// Shared logic for the regulation-update list: validation, the double opt-in email and its sending.
// The route stores subscribers in D1; nothing here touches storage.

export type NewsletterLang = "en" | "tr";

export const subscribersTableSql = [
  `CREATE TABLE IF NOT EXISTS subscribers (
    id text PRIMARY KEY NOT NULL,
    email text NOT NULL,
    language text NOT NULL,
    source text DEFAULT '' NOT NULL,
    status text DEFAULT 'pending' NOT NULL,
    token text NOT NULL,
    request_fingerprint text NOT NULL,
    created_at text NOT NULL,
    confirmed_at text,
    unsubscribed_at text
  )`,
  "CREATE UNIQUE INDEX IF NOT EXISTS subscribers_email_idx ON subscribers (email)",
  "CREATE UNIQUE INDEX IF NOT EXISTS subscribers_token_idx ON subscribers (token)",
  "CREATE INDEX IF NOT EXISTS subscribers_status_idx ON subscribers (status)",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normaliseEmail(value: unknown) {
  const email = typeof value === "string" ? value.trim().toLowerCase().slice(0, 254) : "";
  return emailPattern.test(email) ? email : "";
}

export function isToken(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{48}$/.test(value);
}

export function newToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(24)), byte => byte.toString(16).padStart(2, "0")).join("");
}

export const newsletterPath = { en: "/en/insights/regulation-updates", tr: "/tr/icgoruler/mevzuat-bulteni" } as const;

export function confirmationMessage(lang: NewsletterLang, origin: string, token: string) {
  const confirm = `${origin}/api/newsletter/confirm?token=${token}`;
  const unsubscribe = `${origin}${newsletterPath[lang]}?unsubscribe=${token}`;
  return lang === "tr" ? {
    subject: "Ganrich Advisory mevzuat bülteni: kaydınızı onaylayın",
    text: [
      "Merhaba,",
      "",
      "Ganrich Advisory mevzuat bültenine kaydolmak için bu adres kullanıldı. Kaydı onaylamak için aşağıdaki bağlantıyı açın:",
      "",
      confirm,
      "",
      "Bu talebi siz yapmadıysanız bu e-postayı yok sayabilirsiniz; onay olmadan size bülten gönderilmez.",
      "",
      `Kaydınızı dilediğiniz zaman iptal edebilirsiniz: ${unsubscribe}`,
      "",
      "Ganrich Advisory · ganrichadvisory.com",
    ].join("\n"),
  } : {
    subject: "Ganrich Advisory regulation updates: please confirm",
    text: [
      "Hello,",
      "",
      "This address was used to sign up for regulation updates from Ganrich Advisory. To confirm, open this link:",
      "",
      confirm,
      "",
      "If you did not ask for this, you can ignore this email; nothing will be sent without confirmation.",
      "",
      `You can unsubscribe at any time: ${unsubscribe}`,
      "",
      "Ganrich Advisory · ganrichadvisory.com",
    ].join("\n"),
  };
}

type MailEnv = { RESEND_API_KEY?: string; INQUIRY_NOTIFY_FROM?: string };

export async function sendConfirmation(env: MailEnv, to: string, lang: NewsletterLang, origin: string, token: string, fetcher: typeof fetch = fetch): Promise<"sent" | "skipped" | "failed"> {
  if (!env.RESEND_API_KEY || !env.INQUIRY_NOTIFY_FROM) return "skipped";
  const { subject, text } = confirmationMessage(lang, origin, token);
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ from: env.INQUIRY_NOTIFY_FROM, to: [to], subject, text }),
    });
    if (!response.ok) {
      console.error("Newsletter confirmation failed", response.status);
      return "failed";
    }
    return "sent";
  } catch (caught) {
    console.error("Newsletter confirmation failed", caught instanceof Error ? caught.name : "unknown");
    return "failed";
  }
}
