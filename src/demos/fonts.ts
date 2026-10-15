import { Bodoni_Moda, Cormorant_Garamond, DM_Sans, Fraunces, Inter, Jost, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import type { DemoKey } from "@/lib/data";

/* Each concept site gets its own type pairing — display for headings, body for
   running copy — instead of one family for the whole set.

   The next/font family for a slot is imported here and applied to the demo's own
   wrapper element, NOT to <html>, with `preload: false`. That matters: a font
   declared at the root is preloaded on every page of the site even when the
   concept that uses it is nowhere on screen, and these files are self-hosted
   woff2. `preload: false` + a wrapper-scoped class means a family is only fetched
   by a page that actually renders that concept.

   Every slot currently resolves to the pair the site already loads (Sora +
   Inter), so wiring this up costs nothing; building a concept replaces its own
   slot with a real pairing in one place. */
export type DemoFontSlot = {
  /* Classes returned by next/font calls — they carry the @font-face variables. */
  className: string;
  /* CSS font-family values written into --font-display / --font-sans below the
     wrapper, which is what the `font-display` and `font-sans` utilities read. */
  display: string;
  body: string;
};

/* Atlas Renovation's editorial pairing. Fraunces is a variable optical-size
   serif, which is what the oversized hero headline wants; DM Sans carries the
   running copy. Both are `preload: false` and scoped to this slot's wrapper, so
   neither file is fetched by the plumber, the electrician, or any page that does
   not render this concept. */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-fraunces",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-dm-sans",
});

/* FlowRight's single-family pairing. Plus Jakarta Sans carries both the display
   weight (700–800 for the headline and the phone number) and the running copy,
   which is what the brief asks for and keeps the concept at one file rather
   than two. Manrope was the other candidate; it loses its shape at 800 where
   this one stays open, and Sora already occupies the geometric-grotesque slot
   site-wide. Same rule as above: `preload: false`, wrapper-scoped, so no other
   page fetches it. */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

/* VoltWise's technical pairing. Space Grotesk carries the headline and every
   number that has to hold its own at display size; the running copy is Inter, a
   plain workhorse under the one distinctive display face. Inter is loaded here,
   scoped to this slot with `preload: false`, rather than at the site root, so the
   host ships only Bricolage, Instrument Sans and JetBrains Mono and Inter is
   fetched by no page that doesn't render this concept. Mono labels are the
   site's existing JetBrains Mono. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-inter",
});

/* Ember & Oak's hospitality pairing. Cormorant Garamond is a high-contrast,
   light-built serif — the shape that fine-dining menus use because it holds
   elegance at display size without going heavy; italic is requested so the
   accent words can be set in the cursive cut. DM Sans carries the running copy
   and the letterspaced small-caps labels, which a serif cannot do at 12px. The
   body slot reuses the same DM Sans instance as Atlas, so this concept pays for
   one new file. `preload: false`, wrapper-scoped, like every other slot. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

/* Maison Lune's soft-luxury pairing. Bodoni Moda is a high-contrast didone kept
   deliberately light — the airy, elegant serif a beauty studio reaches for, and
   visibly distinct from Fraunces (wonky, softer) and Cormorant (a garamond, already
   Ember's). Its light weight is the display voice, so it needs a clean geometric
   sans under it; Jost carries the running copy and the letterspaced small-caps,
   which a Bodoni cannot do at 12px. This is a second file the site does not
   already load, so the concept pays for both — `preload: false`, wrapper-scoped,
   like every other slot. */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

export const demoFonts: Record<DemoKey, DemoFontSlot> = {
  renovation: {
    className: `${fraunces.variable} ${dmSans.variable}`,
    display: "var(--font-fraunces), ui-serif, Georgia, serif",
    body: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif",
  },
  plumber: {
    className: plusJakarta.variable,
    display: "var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif",
    body: "var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif",
  },
  electrician: {
    className: `${spaceGrotesk.variable} ${inter.variable}`,
    display: "var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif",
    /* The body slot uses this slot's own Inter (declared above, scoped to this
       wrapper), so the host carries no Inter at all. */
    body: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  },
  restaurant: {
    className: `${cormorant.variable} ${dmSans.variable}`,
    display: "var(--font-cormorant), ui-serif, Georgia, serif",
    body: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif",
  },
  salon: {
    className: `${bodoni.variable} ${jost.variable}`,
    display: "var(--font-bodoni), ui-serif, Georgia, serif",
    body: "var(--font-jost), ui-sans-serif, system-ui, sans-serif",
  },
};
