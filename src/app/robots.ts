import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data";

/* Robots uses the same env-derived domain as the sitemap, so the two can never
   disagree about where the site lives. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl.replace(/^https?:\/\//, ""),
  };
}
