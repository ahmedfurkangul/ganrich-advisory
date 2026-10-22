import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { verifyAccessToken } from "./access-jwt";

// Editor identity for the PDF studio and its APIs.
//
// EDITOR_AUTH selects how an editor is recognised:
// - "access": a Cloudflare Access token, verified against ACCESS_TEAM_DOMAIN and
//   ACCESS_AUD, whose email is listed in EDITOR_EMAILS.
// - "sites": the identity headers set by ChatGPT Sites hosting. Only safe behind
//   that platform, which strips client-supplied copies of these headers.
// Anything else (including unset) recognises no editor, so editing stays closed.

export type Editor = { email: string; displayName: string };

type EditorAuthEnv = {
  EDITOR_AUTH?: string;
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
  EDITOR_EMAILS?: string;
};

const ACCESS_HEADER = "cf-access-jwt-assertion";
const ACCESS_COOKIE = "CF_Authorization";
const SITES_EMAIL_HEADER = "oai-authenticated-user-email";
const SITES_NAME_HEADER = "oai-authenticated-user-full-name";
const SITES_NAME_ENCODING_HEADER = "oai-authenticated-user-full-name-encoding";

async function authEnv(): Promise<EditorAuthEnv> {
  try {
    const { env } = await import("cloudflare:workers");
    return env as unknown as EditorAuthEnv;
  } catch {
    return {};
  }
}

function cookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=") || null;
  }
  return null;
}

function allowedEmails(value: string | undefined): Set<string> {
  return new Set((value ?? "").split(",").map(email => email.trim().toLowerCase()).filter(Boolean));
}

function sitesDisplayName(requestHeaders: Headers, email: string): string {
  const encoded = requestHeaders.get(SITES_NAME_HEADER);
  if (!encoded || requestHeaders.get(SITES_NAME_ENCODING_HEADER) !== "percent-encoded-utf-8") return email;
  try {
    return decodeURIComponent(encoded);
  } catch {
    return email;
  }
}

export async function editorFromHeaders(requestHeaders: Headers): Promise<Editor | null> {
  const env = await authEnv();

  if (env.EDITOR_AUTH === "sites") {
    const email = requestHeaders.get(SITES_EMAIL_HEADER);
    return email ? { email, displayName: sitesDisplayName(requestHeaders, email) } : null;
  }

  if (env.EDITOR_AUTH === "access") {
    const token = requestHeaders.get(ACCESS_HEADER) ?? cookieValue(requestHeaders.get("cookie"), ACCESS_COOKIE);
    if (!token || !env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) return null;
    const email = await verifyAccessToken(token, { teamDomain: env.ACCESS_TEAM_DOMAIN, audience: env.ACCESS_AUD });
    if (!email || !allowedEmails(env.EDITOR_EMAILS).has(email)) return null;
    return { email, displayName: email };
  }

  return null;
}

export function editorFromRequest(request: Request): Promise<Editor | null> {
  return editorFromHeaders(request.headers);
}

export async function getEditor(): Promise<Editor | null> {
  return editorFromHeaders(await headers());
}

/** Editor pages are hidden, not redirected, when no verified editor is present. */
export async function requireEditor(): Promise<Editor> {
  const editor = await getEditor();
  if (!editor) notFound();
  return editor;
}
