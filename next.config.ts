import path from "node:path";
import type { NextConfig } from "next";

/* Canonical URLs use NEXT_PUBLIC_SITE_URL when configured. The site data has
   the actual production-domain fallback, so branch preview builds can succeed
   even when Vercel's Preview environment does not define the variable. */

const nextConfig: NextConfig = {
  /* A stray package-lock.json in the user home directory makes Turbopack infer
     the wrong project root without this. */
  turbopack: { root: path.join(__dirname) },

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
