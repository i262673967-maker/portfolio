import path from "node:path";
import type { NextConfig } from "next";

/* The site's canonical URLs, Open Graph tags, sitemap and robots are all built
   from NEXT_PUBLIC_SITE_URL, and a placeholder domain is worse than no build:
   crawlers would index URLs that do not exist. So the build fails here, before
   anything is compiled, with the fix spelled out.
   Local: put it in .env.local. Vercel: Project Settings → Environment Variables
   (Production + Preview), then redeploy. */
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is missing — build aborted so no placeholder domain can ship.\n" +
      '  .env.local            → NEXT_PUBLIC_SITE_URL="https://your-production-domain"\n' +
      "  Vercel                → Project Settings → Environment Variables → Production",
  );
}

const nextConfig: NextConfig = {
  /* A stray package-lock.json in the user home directory makes Turbopack infer
     the wrong project root without this. */
  turbopack: { root: path.join(__dirname) },

  /* Two concepts were dropped from the showcase — the renovation studio and the
     electrician — and one was renamed when the e-commerce site became a beauty
     salon. Their URLs were published before, so they are permanently redirected
     rather than left to 404: the renamed pair to its new address, the removed
     four to the gallery, where the remaining concepts live. A redirect beats a
     dead end for anyone who bookmarked or linked one, and it keeps a removed
     concept unreachable through an old route. `permanent: true` is a 308, which
     keeps the request method and tells a crawler the address has moved for good. */
  async redirects() {
    return [
      { source: "/work/maison-lifestyle", destination: "/work/maison-lune", permanent: true },
      { source: "/demos/maison-lifestyle", destination: "/demos/maison-lune", permanent: true },
      { source: "/work/atlas-renovation", destination: "/projects", permanent: true },
      { source: "/demos/atlas-renovation", destination: "/projects", permanent: true },
      { source: "/work/voltwise-electrical", destination: "/projects", permanent: true },
      { source: "/demos/voltwise-electrical", destination: "/projects", permanent: true },
    ];
  },

  /* Baseline response headers on every route, including the prerendered pages
     and /_next assets. Deliberately minimal: the CSP carries frame-ancestors
     only, so nothing restricts the inline styles the device frames and the
     reveal animations rely on, and the concept demos (which render inside this
     document, never in an iframe) are untouched. */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;
