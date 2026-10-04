import type { MetadataRoute } from "next";
import { hasRealDomain, siteBase } from "@/lib/data";

/* Robots is derived from the same siteUrl as the sitemap. The sitemap and host
   lines are only published once a real domain is set in src/lib/data.ts —
   pointing crawlers at the TODO placeholder would be worse than omitting them. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(hasRealDomain ? { sitemap: `${siteBase}/sitemap.xml` } : {}),
    ...(hasRealDomain ? { host: siteBase.replace(/^https?:\/\//, "") } : {}),
  };
}
