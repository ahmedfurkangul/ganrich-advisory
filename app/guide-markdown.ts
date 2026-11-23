// Parses the Markdown guide files in content/guides/<slug>/{en,tr}.md into the block list app/guides.tsx renders.
// Deliberately small and strict: each block is one chunk separated by a blank line, and anything the format below
// does not cover throws at build time instead of rendering silently wrong.
//
//   ---                              front matter: path, title, description, h1 (one line each)
//   ## Heading / ### Subheading
//   One paragraph per line.
//   - bullet item                    one list per chunk, one item per line
//   1. numbered item
//   | head | head |                   table: header row, | --- | separator, then rows
//   :::faq                           FAQ: "### question" lines, each followed by one answer line
//   :::sources Sources               sources list with its heading, "- item" lines, closed by :::
//
// Inline text keeps the site's own syntax: [text](/path), *emphasis*, **strong**.
// No imports with runtime effect, so Node scripts and tests can load this file directly.

export type GuideBlock =
  | { t: "h2" | "h3" | "p"; text: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "faq"; items: [string, string][] }
  | { t: "sources"; title: string; items: string[] };

export type GuideFrontMatter = { path: string; title: string; description: string; h1: string };

const FRONT_KEYS = ["path", "title", "description", "h1"] as const;

function fail(file: string, message: string): never {
  throw new Error(`${file}: ${message}`);
}

function splitRow(line: string): string[] {
  return line.slice(1, -1).split("|").map(cell => cell.trim());
}

function chunks(body: string, file: string): string[][] {
  const out: string[][] = [];
  let current: string[] = [];
  let fenced = false;
  const flush = () => {
    if (current.length) out.push(current);
    current = [];
  };
  for (const line of body.split("\n")) {
    if (fenced) {
      if (line.trim() === "") fail(file, "blank line inside a ::: block");
      current.push(line);
      if (line === ":::") {
        fenced = false;
        flush();
      }
    } else if (line.trim() === "") {
      flush();
    } else {
      if (line.startsWith(":::")) {
        if (current.length) fail(file, `a ::: block needs a blank line before it: "${line}"`);
        fenced = true;
      }
      current.push(line);
    }
  }
  if (fenced) fail(file, "unclosed ::: block");
  flush();
  return out;
}

function parseBlock(lines: string[], file: string): GuideBlock {
  const [first] = lines;
  const where = `"${first.slice(0, 60)}"`;
  if (first === ":::faq") {
    if (lines.at(-1) !== ":::") fail(file, `faq block not closed: ${where}`);
    const inner = lines.slice(1, -1);
    if (!inner.length || inner.length % 2) fail(file, `faq needs "### question" and one answer line per item: ${where}`);
    const items: [string, string][] = [];
    for (let i = 0; i < inner.length; i += 2) {
      if (!inner[i].startsWith("### ") || inner[i + 1].startsWith("### ")) fail(file, `faq item malformed near "${inner[i].slice(0, 60)}"`);
      items.push([inner[i].slice(4), inner[i + 1]]);
    }
    return { t: "faq", items };
  }
  if (first.startsWith(":::sources ")) {
    if (lines.at(-1) !== ":::") fail(file, `sources block not closed: ${where}`);
    const inner = lines.slice(1, -1);
    if (inner.some(line => !line.startsWith("- "))) fail(file, `sources items must start with "- ": ${where}`);
    return { t: "sources", title: first.slice(":::sources ".length), items: inner.map(line => line.slice(2)) };
  }
  if (first.startsWith(":::")) fail(file, `unknown block ${where}`);
  if (first.startsWith("## ") || first.startsWith("### ")) {
    if (lines.length > 1) fail(file, `heading must stand alone: ${where}`);
    return first.startsWith("## ") ? { t: "h2", text: first.slice(3) } : { t: "h3", text: first.slice(4) };
  }
  if (first.startsWith("- ")) {
    if (lines.some(line => !line.startsWith("- "))) fail(file, `every bullet line must start with "- ": ${where}`);
    return { t: "ul", items: lines.map(line => line.slice(2)) };
  }
  if (/^\d+\. /.test(first)) {
    if (lines.some(line => !/^\d+\. /.test(line))) fail(file, `every numbered line must start with "1. ": ${where}`);
    return { t: "ol", items: lines.map(line => line.replace(/^\d+\. /, "")) };
  }
  if (first.startsWith("|")) {
    if (lines.length < 2 || !/^\|(\s*:?-{3,}:?\s*\|)+$/.test(lines[1])) fail(file, `table needs a header and a | --- | row: ${where}`);
    if (lines.some(line => !line.startsWith("|") || !line.endsWith("|"))) fail(file, `table rows must start and end with |: ${where}`);
    const head = splitRow(first);
    const rows = lines.slice(2).map(splitRow);
    if (rows.some(row => row.length !== head.length)) fail(file, `table row has a different number of cells: ${where}`);
    return { t: "table", head, rows };
  }
  if (lines.length > 1) fail(file, `a paragraph is one line; add a blank line between paragraphs: ${where}`);
  if (/^(#|>|\* |\+ )/.test(first)) fail(file, `unsupported Markdown: ${where}`);
  // A paragraph that would read as another block is escaped, as in CommonMark: "14\\. madde", "\\- note".
  if (/^\d+\\\. /.test(first)) return { t: "p", text: first.replace("\\.", ".") };
  return { t: "p", text: first.startsWith("\\") ? first.slice(1) : first };
}

export function parseGuideMarkdown(source: string, file = "guide"): GuideFrontMatter & { blocks: GuideBlock[] } {
  const text = source.replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) fail(file, "missing --- front matter");
  const front: Partial<GuideFrontMatter> = {};
  for (const line of match[1].split("\n")) {
    const at = line.indexOf(": ");
    const key = line.slice(0, at) as (typeof FRONT_KEYS)[number];
    if (at < 0 || !FRONT_KEYS.includes(key)) fail(file, `unknown front matter line "${line}"`);
    front[key] = line.slice(at + 2);
  }
  for (const key of FRONT_KEYS) if (!front[key]) fail(file, `front matter needs ${key}`);
  const blocks = chunks(text.slice(match[0].length), file).map(lines => parseBlock(lines, file));
  return { ...(front as GuideFrontMatter), blocks };
}

/** Writes blocks back in the canonical form parseGuideMarkdown reads; used to check the files stay canonical. */
export function formatGuideMarkdown(guide: GuideFrontMatter & { blocks: GuideBlock[] }): string {
  const front = FRONT_KEYS.map(key => `${key}: ${guide[key]}`).join("\n");
  const row = (cells: string[]) => `| ${cells.join(" | ")} |`;
  const body = guide.blocks.map(block => {
    switch (block.t) {
      case "h2": return `## ${block.text}`;
      case "h3": return `### ${block.text}`;
      case "p":
        if (/^\d+\. /.test(block.text)) return block.text.replace(". ", "\\. ");
        return /^(- |#|\||:::|>|\* |\+ |\\)/.test(block.text) ? `\\${block.text}` : block.text;
      case "ul": return block.items.map(item => `- ${item}`).join("\n");
      case "ol": return block.items.map((item, i) => `${i + 1}. ${item}`).join("\n");
      case "table": return [row(block.head), row(block.head.map(() => "---")), ...block.rows.map(row)].join("\n");
      case "faq": return [":::faq", ...block.items.flatMap(([q, a]) => [`### ${q}`, a]), ":::"].join("\n");
      case "sources": return [`:::sources ${block.title}`, ...block.items.map(item => `- ${item}`), ":::"].join("\n");
    }
  });
  return `---\n${front}\n---\n\n${body.join("\n\n")}\n`;
}
