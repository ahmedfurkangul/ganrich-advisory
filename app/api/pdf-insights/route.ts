import { NextResponse } from "next/server";
import { listPdfInsights } from "../../../db/pdf-insights";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 75 * 1024 * 1024;

function editorEmail(request: Request): string | null {
  return request.headers.get("oai-authenticated-user-email");
}

function forbidden() {
  return NextResponse.json({ error: "An authenticated editor is required." }, { status: 401 });
}

function safeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "report.pdf";
}

function titleFromFilename(name: string) {
  return name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

function slugFromTitle(title: string) {
  return title.toLocaleLowerCase("en").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72) || "report";
}

async function checksum(buffer: ArrayBuffer) {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? undefined;
  const languageParam = url.searchParams.get("language");
  const language = languageParam === "tr" ? "tr" : languageParam === "en" ? "en" : undefined;
  if (status !== "published" && !editorEmail(request)) return forbidden();

  try {
    return NextResponse.json({ insights: await listPdfInsights({ status, language }) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load PDF insights." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { env } = await import("cloudflare:workers");
  const email = editorEmail(request);
  if (!email) return forbidden();
  if (!env.DB || !env.DOCUMENTS) return NextResponse.json({ error: "Document storage is unavailable." }, { status: 503 });

  const form = await request.formData();
  const language = form.get("language") === "tr" ? "tr" : "en";
  const files = form.getAll("files").filter((entry): entry is File => entry instanceof File);
  if (!files.length) return NextResponse.json({ error: "Select at least one PDF." }, { status: 400 });

  const uploaded: unknown[] = [];
  const errors: { filename: string; error: string }[] = [];

  for (const file of files) {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      errors.push({ filename: file.name, error: "Only PDF files are accepted." });
      continue;
    }
    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      errors.push({ filename: file.name, error: "PDFs must be between 1 byte and 75 MB." });
      continue;
    }

    const bytes = await file.arrayBuffer();
    const hash = await checksum(bytes);
    const duplicate = await env.DB.prepare("SELECT id, title FROM pdf_insights WHERE checksum = ? LIMIT 1").bind(hash).first<{ id: string; title: string }>();
    if (duplicate) {
      errors.push({ filename: file.name, error: `Duplicate document: ${duplicate.title}` });
      continue;
    }

    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const versionId = crypto.randomUUID();
    const cleanName = safeFilename(file.name);
    const extractedTitle = titleFromFilename(file.name);
    const slug = `${slugFromTitle(extractedTitle)}-${id.slice(0, 8)}`;
    const key = `pdf-insights/${id}/v1/${cleanName}`;

    await env.DOCUMENTS.put(key, bytes, {
      httpMetadata: { contentType: "application/pdf", contentDisposition: `inline; filename="${cleanName}"` },
      customMetadata: { insightId: id, version: "1", uploadedBy: email },
    });

    try {
      await env.DB.batch([
        env.DB.prepare(`INSERT INTO pdf_insights (
          id, slug, language, title, status, pdf_key, original_filename, checksum, mime_type,
          file_size, version, extraction_confidence, created_by, updated_by, created_at, updated_at
        ) VALUES (?, ?, ?, ?, 'review_required', ?, ?, ?, 'application/pdf', ?, 1, 'requires_review', ?, ?, ?, ?)`)
          .bind(id, slug, language, extractedTitle, key, file.name, hash, file.size, email, email, now, now),
        env.DB.prepare(`INSERT INTO pdf_insight_versions (
          id, insight_id, version, r2_key, filename, checksum, file_size, uploaded_by, uploaded_at, status
        ) VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, 'current')`)
          .bind(versionId, id, key, file.name, hash, file.size, email, now),
      ]);
      uploaded.push({ id, slug, title: extractedTitle, filename: file.name, status: "review_required" });
    } catch (error) {
      await env.DOCUMENTS.delete(key);
      errors.push({ filename: file.name, error: error instanceof Error ? error.message : "Metadata could not be stored." });
    }
  }

  return NextResponse.json({ uploaded, errors }, { status: uploaded.length ? 201 : 400 });
}

const editableColumns = {
  language: "language",
  title: "title",
  subtitle: "subtitle",
  shortTitle: "short_title",
  contentType: "content_type",
  status: "status",
  author: "author",
  publicationDate: "publication_date",
  dataPeriod: "data_period",
  pageCount: "page_count",
  readingTime: "reading_time",
  executiveThesis: "executive_thesis",
  shortSummary: "short_summary",
  executiveSummary: "executive_summary",
  keyFindings: "key_findings",
  leadershipImplications: "leadership_implications",
  strategicQuestions: "strategic_questions",
  methodology: "methodology",
  limitations: "limitations",
  regions: "regions",
  topics: "topics",
  expertise: "expertise",
  keywords: "keywords",
  gatingModel: "gating_model",
  aiRetrievalApproved: "ai_retrieval_approved",
  rightsConfirmed: "rights_confirmed",
  confidentialityReviewed: "confidentiality_reviewed",
  personalDataReviewed: "personal_data_reviewed",
  sourcesReviewed: "sources_reviewed",
  translationReviewed: "translation_reviewed",
  finalApproval: "final_approval",
} as const;

const jsonFields = new Set(["keyFindings", "leadershipImplications", "strategicQuestions", "regions", "topics", "expertise", "keywords"]);
const booleanFields = new Set(["aiRetrievalApproved", "rightsConfirmed", "confidentialityReviewed", "personalDataReviewed", "sourcesReviewed", "translationReviewed", "finalApproval"]);

export async function PATCH(request: Request) {
  const { env } = await import("cloudflare:workers");
  const body = await request.json() as Record<string, unknown>;
  const configuredKey = (env as unknown as { PDF_INGEST_KEY?: string }).PDF_INGEST_KEY;
  const batchEditor = configuredKey && body.ingestKey === configuredKey && typeof body.editor === "string" ? body.editor : null;
  const email = editorEmail(request) ?? batchEditor;
  if (!email) return forbidden();
  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "Insight ID is required." }, { status: 400 });

  if (body.status === "published") {
    const findings = Array.isArray(body.keyFindings) ? body.keyFindings : [];
    const requiredText = ["title", "executiveThesis", "executiveSummary"] as const;
    const missingText = requiredText.filter(key => typeof body[key] !== "string" || !String(body[key]).trim());
    const governance = ["rightsConfirmed", "confidentialityReviewed", "personalDataReviewed", "sourcesReviewed", "finalApproval"] as const;
    const missingChecks = governance.filter(key => body[key] !== true);
    if (missingText.length || findings.length < 3 || missingChecks.length) {
      return NextResponse.json({
        error: "Publication requires a title, thesis, executive summary, at least three source-linked findings, and all governance approvals.",
      }, { status: 422 });
    }
  }

  const assignments: string[] = [];
  const values: unknown[] = [];
  for (const [field, column] of Object.entries(editableColumns)) {
    if (!(field in body)) continue;
    assignments.push(`${column} = ?`);
    const raw = body[field];
    values.push(jsonFields.has(field) ? JSON.stringify(raw ?? []) : booleanFields.has(field) ? (raw ? 1 : 0) : raw ?? null);
  }
  if (!assignments.length) return NextResponse.json({ error: "No editable fields were supplied." }, { status: 400 });

  const now = new Date().toISOString();
  assignments.push("updated_by = ?", "updated_at = ?");
  values.push(email, now);
  if (body.status === "published") {
    assignments.push("published_at = COALESCE(published_at, ?)");
    values.push(now);
  }
  values.push(id);

  await env.DB.prepare(`UPDATE pdf_insights SET ${assignments.join(", ")} WHERE id = ?`).bind(...values).run();
  const updated = await env.DB.prepare("SELECT * FROM pdf_insights WHERE id = ? LIMIT 1").bind(id).first();
  return NextResponse.json({ insight: updated });
}
