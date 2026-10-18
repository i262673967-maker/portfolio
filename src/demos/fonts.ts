import { Archivo, Bodoni_Moda, Cormorant_Garamond, DM_Sans, Jost, Newsreader, Public_Sans } from "next/font/google";
import type { DemoKey } from "@/lib/data";

/* Each concept site gets its own type pairing — display for headings, body for
   running copy — instead of one family for the whole set.

   The next/font family for a slot is imported here and applied to the demo's own
   wrapper element, NOT to <html>, with `preload: false`. That matters: a font
   declared at the root is preloaded on every page of the site even when the
   concept that uses it is nowhere on screen, and these files are self-hosted
   woff2. `preload: false` + a wrapper-scoped class means a family is only fetched
   by a page that actually renders that concept.

   Each slot below names its own concept's real pairing, so a concept pays for
   the two files it declares and nothing else. */
export type DemoFontSlot = {
  /* Classes returned by next/font calls — they carry the @font-face variables. */
  className: string;
  /* CSS font-family values written into --font-display / --font-sans below the
     wrapper, which is what the `font-display` and `font-sans` utilities read. */
  display: string;
  body: string;
};

/* The running copy and letterspaced small-caps for Ember & Oak. A serif cannot
   hold a 12px label, so the menu carries this clean grotesque instead; it is
   `preload: false` and scoped to that slot's wrapper, so no other page fetches
   it. */
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-dm-sans",
});

/* BlueLine's pairing. Archivo is a wide, flat-sided grotesque that stays readable
   at the heavy 800 the headlines are set in — the voice of a signage lettering
   plate rather than a magazine, and visibly none of the serifs the restaurant,
   salon and dental concepts are built on. Running copy uses Instrument Sans,
   which the site root already loads (`--font-instrument`), so this slot ships one
   new file and the concept pays for exactly that: `preload: false`, wrapper-scoped
   like every other slot. */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
});

/* Ember & Oak's hospitality pairing. Cormorant Garamond is a high-contrast,
   light-built serif — the shape that fine-dining menus use because it holds
   elegance at display size without going heavy; italic is requested so the
   accent words can be set in the cursive cut. DM Sans carries the running copy
   and the letterspaced small-caps labels, which a serif cannot do at 12px (the
   file is declared above and read only by this slot). `preload: false`,
   wrapper-scoped, like every other slot. */
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
   visibly distinct from Cormorant (a garamond, already Ember's) and Newsreader
   (the literary serif Rowanwood is built on). Its light weight is the display
   voice, so it needs a clean geometric sans under it; Jost carries the running
   copy and the letterspaced small-caps, which a Bodoni cannot do at 12px. This
   is a second file the site does not
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

/* Rowanwood's patient-leaflet pairing. Newsreader is a workhorse literary serif
   with real optical sizes — the voice of a printed information sheet you are
   handed in a waiting room, and visibly none of the other two serifs here (it
   is not Cormorant's thin garamond or Bodoni's didone contrast). Public Sans is
   the typeface a government health service would choose: designed for forms,
   small print and long strings of numbers, and
   the most legible thing on this site at 13px. Both `preload: false`, scoped to
   this wrapper, so no other page fetches either file. */
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
});

export const demoFonts: Record<DemoKey, DemoFontSlot> = {
  plumber: {
    className: archivo.variable,
    display: "var(--font-archivo), ui-sans-serif, system-ui, sans-serif",
    body: "var(--font-instrument), ui-sans-serif, system-ui, sans-serif",
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
  dental: {
    className: `${newsreader.variable} ${publicSans.variable}`,
    display: "var(--font-newsreader), ui-serif, Georgia, serif",
    body: "var(--font-public-sans), ui-sans-serif, system-ui, sans-serif",
  },
};
