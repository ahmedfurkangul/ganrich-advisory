import type { MetadataRoute } from "next";
import { absoluteUrl } from "./site-config";

const disallow = ["/api/", "/en/insights/pdf-studio", "/tr/icgoruler/pdf-studyosu"];

// AI search and assistant crawlers are welcome on public pages. They get their own groups so a
// future Cloudflare or CDN default does not silently shut them out of llms.txt and the reports.
const aiCrawlers = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-User", "Claude-SearchBot",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended", "Bingbot", "DuckAssistBot", "MistralAI-User", "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow },
    ],
    sitemap: [absoluteUrl("/sitemap.xml"), absoluteUrl("/reports-sitemap.xml")],
    host: absoluteUrl("/"),
  };
}
