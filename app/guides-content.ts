/// <reference types="vite/client" />
import type { Lang } from "./content";
import { parseGuideMarkdown, type GuideBlock } from "./guide-markdown";
import guideOrder from "../content/guides/order.json";

export type { GuideBlock };

// Long-form guides (EUDR, steel DPP, CBAM, CRA, UK CBAM, Gulf entry, supplier data...). Each guide is a folder in
// content/guides/<slug>/: meta.json (dates, image, topic) plus en.md and tr.md. The Markdown format is described in
// app/guide-markdown.ts; inline links use [text](/path) and emphasis uses *text*, rendered by app/guides.tsx.
export type GuideText = { path: string; title: string; description: string; h1: string; blocks: GuideBlock[] };
type GuideMeta = { key: string; solution: string; date: string; dateModified?: string; checked: Record<Lang, string>; image: string; readingTime: Record<Lang, string>; topic: Record<Lang, string> };
export type Guide = GuideMeta & Record<Lang, GuideText>;

// Display order (newest first) lives in content/guides/order.json; add a new guide's folder name there.

const metaFiles = import.meta.glob<GuideMeta>("../content/guides/*/meta.json", { eager: true, import: "default" });
const textFiles = import.meta.glob<string>("../content/guides/*/*.md", { eager: true, query: "?raw", import: "default" });

function load(slug: string): Guide {
  const dir = `../content/guides/${slug}`;
  const meta = metaFiles[`${dir}/meta.json`];
  const en = textFiles[`${dir}/en.md`];
  const tr = textFiles[`${dir}/tr.md`];
  if (!meta || en === undefined || tr === undefined) throw new Error(`content/guides/${slug} needs meta.json, en.md and tr.md`);
  return { ...meta, en: parseGuideMarkdown(en, `${slug}/en.md`), tr: parseGuideMarkdown(tr, `${slug}/tr.md`) };
}

export const guides: Guide[] = (guideOrder as string[]).map(load);

export const guideByKey = (key: string) => guides.find(g => g.key === key);

/** Publication date, or a later content-revision date when one was set. Never `checked` or the build clock. */
export function guideLastmod(guide: Guide): string {
  return guide.dateModified ?? guide.date;
}
