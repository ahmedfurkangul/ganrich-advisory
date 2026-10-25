export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://ganrichadvisory.com").replace(/\/+$/, "");
export const SITE_NAME = "Ganrich Advisory";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_ORIGIN}/`).toString();
}

// Search results show about 155–160 characters of a description. Longer text (report summaries come
// straight from the PDF studio) is cut at the last full sentence that fits, or at a word with an ellipsis.
export function metaDescription(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const head = clean.slice(0, max);
  const sentence = Math.max(head.lastIndexOf(". "), head.lastIndexOf("? "), head.lastIndexOf("! "));
  if (sentence >= 90) return head.slice(0, sentence + 1);
  return `${head.slice(0, head.lastIndexOf(" ", max - 1)).replace(/[\s,;:–—-]+$/, "")}…`;
}
