import { isToken } from "./newsletter-core";

// Short-lived access to email-gated PDFs. See app/api/pdf-insights/[id]/access.

export const grantsTableSql = [
  `CREATE TABLE IF NOT EXISTS download_grants (
    token text PRIMARY KEY NOT NULL,
    insight_id text NOT NULL,
    expires_at text NOT NULL,
    created_at text NOT NULL
  )`,
  "CREATE INDEX IF NOT EXISTS download_grants_expires_idx ON download_grants (expires_at)",
];

export async function validGrant(db: D1Database, id: string, token: string | null) {
  if (!isToken(token)) return false;
  const grant = await db.prepare("SELECT expires_at FROM download_grants WHERE token = ? AND insight_id = ? LIMIT 1")
    .bind(token, id).first<{ expires_at: string }>().catch(() => null);
  return Boolean(grant && grant.expires_at > new Date().toISOString());
}
