import type { MetadataRoute } from "next";
import { hasRealDomain, projects, siteBase } from "@/lib/data";

/* Sitemap — every URL is built from siteUrl in data.ts, so connecting a real
   domain and redeploying updates this file automatically. With no domain
   resolved it stays empty rather than listing placeholder URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!hasRealDomain) return [];
  const lastModified = new Date();
  return [
    { url: `${siteBase}/`, lastModified },
    { url: `${siteBase}/projects`, lastModified },
    ...projects.map((p) => ({ url: `${siteBase}/work/${p.slug}`, lastModified })),
    ...projects.map((p) => ({ url: `${siteBase}/demos/${p.slug}`, lastModified })),
  ];
}
