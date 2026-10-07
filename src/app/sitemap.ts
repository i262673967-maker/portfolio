import type { MetadataRoute } from "next";
import { absoluteUrl, projects } from "@/lib/data";

/* Sitemap — every URL comes from NEXT_PUBLIC_SITE_URL through absoluteUrl(), the
   same helper the canonical tags use, so the two can never disagree. The build
   cannot run without that env var (see next.config.ts), so these URLs are real. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified },
    { url: absoluteUrl("/projects"), lastModified },
    { url: absoluteUrl("/privacy"), lastModified },
    ...projects.map((p) => ({ url: absoluteUrl(`/work/${p.slug}`), lastModified })),
  ];
}
