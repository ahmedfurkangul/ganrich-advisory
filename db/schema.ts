import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const pdfInsights = sqliteTable("pdf_insights", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  language: text("language").notNull().default("en"),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  shortTitle: text("short_title").notNull().default(""),
  contentType: text("content_type").notNull().default("Report"),
  status: text("status").notNull().default("review_required"),
  author: text("author").notNull().default(""),
  publicationDate: text("publication_date"),
  dataPeriod: text("data_period").notNull().default(""),
  pageCount: integer("page_count"),
  readingTime: integer("reading_time"),
  executiveThesis: text("executive_thesis").notNull().default(""),
  shortSummary: text("short_summary").notNull().default(""),
  executiveSummary: text("executive_summary").notNull().default(""),
  keyFindings: text("key_findings").notNull().default("[]"),
  leadershipImplications: text("leadership_implications").notNull().default("[]"),
  strategicQuestions: text("strategic_questions").notNull().default("[]"),
  methodology: text("methodology").notNull().default(""),
  limitations: text("limitations").notNull().default(""),
  regions: text("regions").notNull().default("[]"),
  topics: text("topics").notNull().default("[]"),
  expertise: text("expertise").notNull().default("[]"),
  keywords: text("keywords").notNull().default("[]"),
  gatingModel: text("gating_model").notNull().default("fully_ungated"),
  aiRetrievalApproved: integer("ai_retrieval_approved", { mode: "boolean" }).notNull().default(false),
  rightsConfirmed: integer("rights_confirmed", { mode: "boolean" }).notNull().default(false),
  confidentialityReviewed: integer("confidentiality_reviewed", { mode: "boolean" }).notNull().default(false),
  personalDataReviewed: integer("personal_data_reviewed", { mode: "boolean" }).notNull().default(false),
  sourcesReviewed: integer("sources_reviewed", { mode: "boolean" }).notNull().default(false),
  translationReviewed: integer("translation_reviewed", { mode: "boolean" }).notNull().default(false),
  finalApproval: integer("final_approval", { mode: "boolean" }).notNull().default(false),
  pdfKey: text("pdf_key").notNull(),
  originalFilename: text("original_filename").notNull(),
  checksum: text("checksum").notNull(),
  mimeType: text("mime_type").notNull().default("application/pdf"),
  fileSize: integer("file_size").notNull(),
  version: integer("version").notNull().default(1),
  extractionConfidence: text("extraction_confidence").notNull().default("requires_review"),
  createdBy: text("created_by").notNull(),
  updatedBy: text("updated_by").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  publishedAt: text("published_at"),
}, (table) => [
  uniqueIndex("pdf_insights_slug_language_unique").on(table.slug, table.language),
  uniqueIndex("pdf_insights_checksum_unique").on(table.checksum),
  index("pdf_insights_status_idx").on(table.status),
  index("pdf_insights_language_idx").on(table.language),
]);

export const pdfInsightVersions = sqliteTable("pdf_insight_versions", {
  id: text("id").primaryKey(),
  insightId: text("insight_id").notNull().references(() => pdfInsights.id),
  version: integer("version").notNull(),
  r2Key: text("r2_key").notNull(),
  filename: text("filename").notNull(),
  checksum: text("checksum").notNull(),
  fileSize: integer("file_size").notNull(),
  changeSummary: text("change_summary").notNull().default("Initial upload"),
  uploadedBy: text("uploaded_by").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
  status: text("status").notNull().default("current"),
}, (table) => [
  uniqueIndex("pdf_versions_insight_version_unique").on(table.insightId, table.version),
  index("pdf_versions_insight_idx").on(table.insightId),
]);

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  kind: text("kind").notNull(),
  language: text("language").notNull(),
  source: text("source").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organization: text("organization").notNull(),
  role: text("role").notNull().default(""),
  region: text("region").notNull(),
  interest: text("interest").notNull(),
  context: text("context").notNull(),
  decision: text("decision").notNull().default(""),
  contactMethod: text("contact_method").notNull().default("email"),
  marketingConsent: integer("marketing_consent", { mode: "boolean" }).notNull().default(false),
  privacyAcknowledged: integer("privacy_acknowledged", { mode: "boolean" }).notNull().default(false),
  requestFingerprint: text("request_fingerprint").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull(),
}, (table) => [
  index("inquiries_created_at_idx").on(table.createdAt),
  index("inquiries_status_idx").on(table.status),
  index("inquiries_fingerprint_idx").on(table.requestFingerprint),
]);

// First-party, cookieless traffic log written by the Worker. No IP address, no cookie and no
// full user agent is stored: a visitor is a hash of IP + user agent + a random salt that is
// replaced every day, so the same person cannot be linked across days.
export const pageViews = sqliteTable("page_views", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ts: text("ts").notNull(),
  day: text("day").notNull(),
  path: text("path").notNull(),
  lang: text("lang").notNull().default(""),
  kind: text("kind").notNull().default("page"),
  status: integer("status").notNull().default(200),
  referrerHost: text("referrer_host").notNull().default(""),
  utmSource: text("utm_source").notNull().default(""),
  utmMedium: text("utm_medium").notNull().default(""),
  utmCampaign: text("utm_campaign").notNull().default(""),
  country: text("country").notNull().default(""),
  city: text("city").notNull().default(""),
  network: text("network").notNull().default(""),
  device: text("device").notNull().default(""),
  browser: text("browser").notNull().default(""),
  os: text("os").notNull().default(""),
  botName: text("bot_name").notNull().default(""),
  botCategory: text("bot_category").notNull().default(""),
  visitor: text("visitor").notNull().default(""),
  durationMs: integer("duration_ms").notNull().default(0),
}, (table) => [
  index("page_views_day_idx").on(table.day),
  index("page_views_day_bot_idx").on(table.day, table.botCategory),
  index("page_views_path_idx").on(table.path),
]);

export const analyticsSalts = sqliteTable("analytics_salts", {
  day: text("day").primaryKey(),
  salt: text("salt").notNull(),
});

// Regulation-update subscribers. Double opt-in: a row starts as 'pending' and becomes 'active' only
// when the confirmation link is opened. The token confirms and unsubscribes; it is never shown publicly.
export const subscribers = sqliteTable("subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  language: text("language").notNull(),
  source: text("source").notNull().default(""),
  status: text("status").notNull().default("pending"),
  token: text("token").notNull(),
  requestFingerprint: text("request_fingerprint").notNull(),
  createdAt: text("created_at").notNull(),
  confirmedAt: text("confirmed_at"),
  unsubscribedAt: text("unsubscribed_at"),
}, (table) => [
  uniqueIndex("subscribers_email_idx").on(table.email),
  uniqueIndex("subscribers_token_idx").on(table.token),
  index("subscribers_status_idx").on(table.status),
]);

// Short-lived access to an email-gated PDF, issued after the visitor leaves their details.
export const downloadGrants = sqliteTable("download_grants", {
  token: text("token").primaryKey(),
  insightId: text("insight_id").notNull(),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [
  index("download_grants_expires_idx").on(table.expiresAt),
]);
