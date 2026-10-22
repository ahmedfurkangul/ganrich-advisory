import type { MetadataRoute } from "next";
import { absoluteUrl } from "./site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/en/insights/pdf-studio", "/tr/icgoruler/pdf-studyosu"],
    },
    sitemap: [absoluteUrl("/sitemap.xml"), absoluteUrl("/reports-sitemap.xml")],
    host: absoluteUrl("/"),
  };
}
