import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: Context) {
  const { env } = await import("cloudflare:workers");
  const { id } = await context.params;
  const record = await env.DB.prepare("SELECT pdf_key, original_filename, status, gating_model FROM pdf_insights WHERE id = ? LIMIT 1")
    .bind(id)
    .first<{ pdf_key: string; original_filename: string; status: string; gating_model: string }>();
  if (!record) return NextResponse.json({ error: "Document not found." }, { status: 404 });
  const publicDocument = record.status === "published" && record.gating_model === "fully_ungated";
  if (!publicDocument && !request.headers.get("oai-authenticated-user-email")) {
    return NextResponse.json({ error: "An authenticated editor is required." }, { status: 401 });
  }

  const object = await env.DOCUMENTS.get(record.pdf_key);
  if (!object) return NextResponse.json({ error: "The stored PDF is unavailable." }, { status: 404 });
  const attachment = new URL(request.url).searchParams.get("download") === "1";
  const filename = record.original_filename.replace(/["\r\n]/g, "");
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("content-type", "application/pdf");
  headers.set("content-length", String(object.size));
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", publicDocument ? "private, max-age=3600" : "private, no-store");
  headers.set("content-disposition", `${attachment ? "attachment" : "inline"}; filename="${filename}"`);
  headers.set("x-content-type-options", "nosniff");
  return new Response(object.body, { headers });
}
