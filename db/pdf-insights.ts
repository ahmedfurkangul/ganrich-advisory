export type KeyFinding = {
  title: string;
  explanation: string;
  page?: number;
};

export type PdfInsight = {
  id: string;
  slug: string;
  language: "en" | "tr";
  title: string;
  subtitle: string;
  shortTitle: string;
  contentType: string;
  status: string;
  author: string;
  publicationDate: string | null;
  dataPeriod: string;
  pageCount: number | null;
  readingTime: number | null;
  executiveThesis: string;
  shortSummary: string;
  executiveSummary: string;
  keyFindings: KeyFinding[];
  leadershipImplications: string[];
  strategicQuestions: string[];
  methodology: string;
  limitations: string;
  regions: string[];
  topics: string[];
  expertise: string[];
  keywords: string[];
  gatingModel: string;
  aiRetrievalApproved: boolean;
  rightsConfirmed: boolean;
  confidentialityReviewed: boolean;
  personalDataReviewed: boolean;
  sourcesReviewed: boolean;
  translationReviewed: boolean;
  finalApproval: boolean;
  originalFilename: string;
  checksum: string;
  mimeType: string;
  fileSize: number;
  version: number;
  extractionConfidence: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

type RawInsight = Record<string, unknown>;

async function database(): Promise<D1Database> {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) throw new Error("PDF Insight database is unavailable.");
  return env.DB;
}

function parseArray<T>(value: unknown): T[] {
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toBoolean(value: unknown): boolean {
  return value === true || value === 1;
}

export function mapPdfInsight(row: RawInsight): PdfInsight {
  return {
    id: String(row.id),
    slug: String(row.slug),
    language: row.language === "tr" ? "tr" : "en",
    title: String(row.title ?? ""),
    subtitle: String(row.subtitle ?? ""),
    shortTitle: String(row.short_title ?? ""),
    contentType: String(row.content_type ?? "Report"),
    status: String(row.status ?? "review_required"),
    author: String(row.author ?? ""),
    publicationDate: row.publication_date ? String(row.publication_date) : null,
    dataPeriod: String(row.data_period ?? ""),
    pageCount: typeof row.page_count === "number" ? row.page_count : null,
    readingTime: typeof row.reading_time === "number" ? row.reading_time : null,
    executiveThesis: String(row.executive_thesis ?? ""),
    shortSummary: String(row.short_summary ?? ""),
    executiveSummary: String(row.executive_summary ?? ""),
    keyFindings: parseArray<KeyFinding>(row.key_findings),
    leadershipImplications: parseArray<string>(row.leadership_implications),
    strategicQuestions: parseArray<string>(row.strategic_questions),
    methodology: String(row.methodology ?? ""),
    limitations: String(row.limitations ?? ""),
    regions: parseArray<string>(row.regions),
    topics: parseArray<string>(row.topics),
    expertise: parseArray<string>(row.expertise),
    keywords: parseArray<string>(row.keywords),
    gatingModel: String(row.gating_model ?? "fully_ungated"),
    aiRetrievalApproved: toBoolean(row.ai_retrieval_approved),
    rightsConfirmed: toBoolean(row.rights_confirmed),
    confidentialityReviewed: toBoolean(row.confidentiality_reviewed),
    personalDataReviewed: toBoolean(row.personal_data_reviewed),
    sourcesReviewed: toBoolean(row.sources_reviewed),
    translationReviewed: toBoolean(row.translation_reviewed),
    finalApproval: toBoolean(row.final_approval),
    originalFilename: String(row.original_filename ?? ""),
    checksum: String(row.checksum ?? ""),
    mimeType: String(row.mime_type ?? "application/pdf"),
    fileSize: Number(row.file_size ?? 0),
    version: Number(row.version ?? 1),
    extractionConfidence: String(row.extraction_confidence ?? "requires_review"),
    createdBy: String(row.created_by ?? ""),
    updatedBy: String(row.updated_by ?? ""),
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
    publishedAt: row.published_at ? String(row.published_at) : null,
  };
}

export async function listPdfInsights(options?: {
  status?: string;
  language?: "en" | "tr";
}): Promise<PdfInsight[]> {
  const clauses: string[] = [];
  const bindings: unknown[] = [];
  if (options?.status) {
    clauses.push("status = ?");
    bindings.push(options.status);
  }
  if (options?.language) {
    clauses.push("language = ?");
    bindings.push(options.language);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const db = await database();
  const result = await db
    .prepare(`SELECT * FROM pdf_insights ${where} ORDER BY updated_at DESC LIMIT 100`)
    .bind(...bindings)
    .all<RawInsight>();
  return result.results.map(mapPdfInsight);
}

export async function findPdfInsight(idOrSlug: string, language?: "en" | "tr"): Promise<PdfInsight | null> {
  const db = await database();
  const result = language
    ? await db.prepare("SELECT * FROM pdf_insights WHERE (id = ? OR slug = ?) AND language = ? LIMIT 1").bind(idOrSlug, idOrSlug, language).first<RawInsight>()
    : await db.prepare("SELECT * FROM pdf_insights WHERE id = ? OR slug = ? LIMIT 1").bind(idOrSlug, idOrSlug).first<RawInsight>();
  return result ? mapPdfInsight(result) : null;
}
