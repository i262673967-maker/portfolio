import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/lib/data";

/* Sitemap — URLs use the TODO domain placeholder from data.ts until a real
   domain is connected. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/+$/, "");
  const lastModified = new Date();
  return [
    { url: `${base}/`, lastModified },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, lastModified })),
    ...projects.map((p) => ({ url: `${base}/demos/${p.slug}`, lastModified })),
  ];
}
