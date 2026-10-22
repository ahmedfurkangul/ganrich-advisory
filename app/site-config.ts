export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://ganrichadvisory.com").replace(/\/+$/, "");
export const SITE_NAME = "Ganrich Advisory";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_ORIGIN}/`).toString();
}
