import type { Metadata } from "next";
import { absoluteUrl, brandPitch, site } from "@/lib/data";

/* Next 16.3.8 replaces the root layout's openGraph object with a page's own
   instead of merging it — setting a single key there dropped og:image,
   og:site_name, og:locale and og:type from that page. So a route that wants its
   own share copy has to repeat the whole block, which this does from the page's
   own title and description. The share card itself is the one brand image,
   served at the stable /opengraph-image route. */

const shareImage = {
  url: absoluteUrl("/opengraph-image"),
  alt: `${site.brand} — ${brandPitch}`,
  width: 1200,
  height: 630,
};

export function pageMeta(opts: {
  /** Tab title. Pass a string for the brand template, or { absolute } for the homepage. */
  tab: string | { absolute: string };
  /** og:title / twitter:title — always names this page, never the homepage. */
  share: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(opts.path);
  return {
    title: opts.tab,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.share,
      description: opts.description,
      url,
      siteName: site.brand,
      type: "website",
      locale: "en_US",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.share,
      description: opts.description,
      images: [shareImage],
    },
  };
}
