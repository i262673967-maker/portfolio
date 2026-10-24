import { Archivo, Fraunces, Manrope, Newsreader, Public_Sans } from "next/font/google";
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

/* The running copy and letterspaced small-caps for Marigold Kitchen. The source
   page sets its labels and buttons in Manrope at 800 and its body at 400–600 —
   a serif cannot hold a 12px label, so the menu carries this clean grotesque.
   Same `preload: false`, wrapper-scoped pattern as every other slot; the CSS
   variable names the family for real, the way every other slot does. */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

/* BlueLine's pairing. Archivo is a wide, flat-sided grotesque that stays readable
   at the heavy 800 the headlines are set in — the voice of a signage lettering
   plate rather than a magazine, and visibly none of the serifs the restaurant
   and dental concepts are built on. Running copy uses Instrument Sans,
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

/* Marigold Kitchen's display serif, exactly as the source page loads it: Fraunces
   variable with its optical-size axis plus the SOFT and WONK axes, so the real
   build can dial in the source's SOFT 30 / WONK 1 character through
   font-variation-settings. Requesting the static weights only would drop SOFT
   and WONK at their defaults and lose the wonk the design is built on. Manrope
   carries the running copy and the 800-weight small-caps labels (declared above;
   read only by this slot). `preload: false`, wrapper-scoped, like every other
   slot.

   Normal only, no italic: the source loads Fraunces upright at weights 500–700
   and sets its one coloured headline line upright as well — a grep of the whole
   supplied page finds no italic Fraunces anywhere. The old slot asked for the
   italic cut because the retired Ember layout set the serif in italic twice;
   with the rewrite gone, the italic slices were pure weight. */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: "variable",
  style: ["normal"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
});

/* Rowanwood's patient-leaflet pairing. Newsreader is a workhorse literary serif
   with real optical sizes — the voice of a printed information sheet you are
   handed in a waiting room, and visibly none of the other serif here: it is not
   Fraunces, whose soft terminals and wonky alternates carry the restaurant.
   Public Sans is the typeface a government health service would choose: designed
   for forms, small print and long strings of numbers, and the most legible thing
   on this site at 13px. Both `preload: false`, scoped to this wrapper, so no
   other page fetches either file. */
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
    className: `${fraunces.variable} ${manrope.variable}`,
    display: "var(--font-fraunces), ui-serif, Georgia, serif",
    body: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
  },
  dental: {
    className: `${newsreader.variable} ${publicSans.variable}`,
    display: "var(--font-newsreader), ui-serif, Georgia, serif",
    body: "var(--font-public-sans), ui-sans-serif, system-ui, sans-serif",
  },
};
