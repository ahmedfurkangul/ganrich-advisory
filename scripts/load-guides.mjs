// Node-side loader for the guides in content/guides/, for scripts and tests that run outside Vite
// (app/guides-content.ts uses import.meta.glob, which only Vite understands). Same parser, same order.
import { readFileSync } from "node:fs";
import { parseGuideMarkdown } from "../app/guide-markdown.ts";

const root = new URL("../content/guides/", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");

export const guideOrder = JSON.parse(read("order.json"));
export const guides = guideOrder.map(slug => ({
  ...JSON.parse(read(`${slug}/meta.json`)),
  en: parseGuideMarkdown(read(`${slug}/en.md`), `${slug}/en.md`),
  tr: parseGuideMarkdown(read(`${slug}/tr.md`), `${slug}/tr.md`),
}));
export const guideLastmod = guide => guide.dateModified ?? guide.date;
