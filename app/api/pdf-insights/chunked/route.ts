import { NextResponse } from "next/server";
import { editorFromRequest } from "../../../editor-auth";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 75 * 1024 * 1024;
const MAX_CHUNK_SIZE = 384 * 1024;
const MAX_CHUNKS = 220;

type Manifest = {
  uploadId: string;
  filename: string;
  language: "en" | "tr";
  fileSize: number;
  chunkCount: number;
  editor: string;
  createdAt: string;
};

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

function validUploadId(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9-]{16,64}$/.test(value);
}

function stagingPrefix(editor: string, uploadId: string) {
  return `pdf-staging/${safeFilename(editor)}/${uploadId}`;
}

function decodeBase64(value: unknown): Uint8Array | null {
  if (typeof value !== "string" || value.length > Math.ceil(MAX_CHUNK_SIZE / 3) * 4 + 8) return null;
  try {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  } catch {
    return null;
  }
}

async function checksum(buffer: ArrayBuffer) {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

async function readManifest(bucket: R2Bucket, editor: string, uploadId: string): Promise<Manifest | null> {
  const object = await bucket.get(`${stagingPrefix(editor, uploadId)}/manifest.json`);
  if (!object) return null;
  try {
    return JSON.parse(await object.text()) as Manifest;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const { env } = await import("cloudflare:workers");
  const body = await request.json() as Record<string, unknown>;
  const configuredKey = (env as unknown as { PDF_INGEST_KEY?: string }).PDF_INGEST_KEY;
  const batchEditor = configuredKey && body.ingestKey === configuredKey && typeof body.editor === "string" ? body.editor : null;
  const editor = (await editorFromRequest(request))?.email ?? batchEditor;
  if (!editor) return forbidden();
  if (!env.DB || !env.DOCUMENTS) return NextResponse.json({ error: "Document storage is unavailable." }, { status: 503 });

  const action = body.action;
  const uploadId = body.uploadId;
  if (!validUploadId(uploadId)) return NextResponse.json({ error: "A valid upload ID is required." }, { status: 400 });
  const prefix = stagingPrefix(editor, uploadId);

  if (action === "init") {
    const filename = typeof body.filename === "string" ? body.filename : "";
    const fileSize = typeof body.fileSize === "number" ? body.fileSize : 0;
    const chunkCount = typeof body.chunkCount === "number" ? body.chunkCount : 0;
    if (!filename.toLowerCase().endsWith(".pdf")) return NextResponse.json({ error: "Only PDF files are accepted." }, { status: 400 });
    if (fileSize <= 0 || fileSize > MAX_FILE_SIZE) return NextResponse.json({ error: "PDFs must be between 1 byte and 75 MB." }, { status: 400 });
    if (!Number.isInteger(chunkCount) || chunkCount <= 0 || chunkCount > MAX_CHUNKS) return NextResponse.json({ error: "Invalid chunk count." }, { status: 400 });
    const manifest: Manifest = {
      uploadId,
      filename,
      language: body.language === "tr" ? "tr" : "en",
      fileSize,
      chunkCount,
      editor,
      createdAt: new Date().toISOString(),
    };
    await env.DOCUMENTS.put(`${prefix}/manifest.json`, JSON.stringify(manifest), { httpMetadata: { contentType: "application/json" } });
    return NextResponse.json({ uploadId, status: "initialized" }, { status: 201 });
  }

  const manifest = await readManifest(env.DOCUMENTS, editor, uploadId);
  if (!manifest) return NextResponse.json({ error: "Upload session not found." }, { status: 404 });

  if (action === "chunk") {
    const index = typeof body.index === "number" ? body.index : -1;
    const bytes = decodeBase64(body.data);
    if (!Number.isInteger(index) || index < 0 || index >= manifest.chunkCount || !bytes || bytes.byteLength > MAX_CHUNK_SIZE) {
      return NextResponse.json({ error: "Invalid upload chunk." }, { status: 400 });
    }
    await env.DOCUMENTS.put(`${prefix}/chunk-${String(index).padStart(4, "0")}`, bytes);
    return NextResponse.json({ uploadId, index, status: "stored" });
  }

  if (action !== "complete") return NextResponse.json({ error: "Unknown chunked upload action." }, { status: 400 });

  const chunks: Uint8Array[] = [];
  let total = 0;
  for (let index = 0; index < manifest.chunkCount; index += 1) {
    const object = await env.DOCUMENTS.get(`${prefix}/chunk-${String(index).padStart(4, "0")}`);
    if (!object) return NextResponse.json({ error: `Upload chunk ${index} is missing.` }, { status: 409 });
    const bytes = new Uint8Array(await object.arrayBuffer());
    chunks.push(bytes);
    total += bytes.byteLength;
  }
  if (total !== manifest.fileSize) return NextResponse.json({ error: "Uploaded file size does not match the source." }, { status: 409 });

  const combined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const hash = await checksum(combined.buffer);
  const duplicate = await env.DB.prepare("SELECT id, title FROM pdf_insights WHERE checksum = ? LIMIT 1").bind(hash).first<{ id: string; title: string }>();
  if (duplicate) return NextResponse.json({ error: `Duplicate document: ${duplicate.title}`, duplicate }, { status: 409 });

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const versionId = crypto.randomUUID();
  const cleanName = safeFilename(manifest.filename);
  const extractedTitle = titleFromFilename(manifest.filename);
  const slug = `${slugFromTitle(extractedTitle)}-${id.slice(0, 8)}`;
  const key = `pdf-insights/${id}/v1/${cleanName}`;

  await env.DOCUMENTS.put(key, combined, {
    httpMetadata: { contentType: "application/pdf", contentDisposition: `inline; filename="${cleanName}"` },
    customMetadata: { insightId: id, version: "1", uploadedBy: editor },
  });

  try {
    await env.DB.batch([
      env.DB.prepare(`INSERT INTO pdf_insights (
        id, slug, language, title, status, pdf_key, original_filename, checksum, mime_type,
        file_size, version, extraction_confidence, created_by, updated_by, created_at, updated_at
      ) VALUES (?, ?, ?, ?, 'review_required', ?, ?, ?, 'application/pdf', ?, 1, 'requires_review', ?, ?, ?, ?)`)
        .bind(id, slug, manifest.language, extractedTitle, key, manifest.filename, hash, total, editor, editor, now, now),
      env.DB.prepare(`INSERT INTO pdf_insight_versions (
        id, insight_id, version, r2_key, filename, checksum, file_size, uploaded_by, uploaded_at, status
      ) VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, 'current')`)
        .bind(versionId, id, key, manifest.filename, hash, total, editor, now),
    ]);
  } catch (error) {
    await env.DOCUMENTS.delete(key);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Metadata could not be stored." }, { status: 500 });
  }

  await Promise.all([
    env.DOCUMENTS.delete(`${prefix}/manifest.json`),
    ...Array.from({ length: manifest.chunkCount }, (_, index) => env.DOCUMENTS.delete(`${prefix}/chunk-${String(index).padStart(4, "0")}`)),
  ]);
  return NextResponse.json({ uploaded: [{ id, slug, title: extractedTitle, filename: manifest.filename, status: "review_required" }] }, { status: 201 });
}
