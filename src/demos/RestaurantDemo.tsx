"use client";

import { useState } from "react";
import type { DemoProps } from "./_shared";
import {
  DEMO_NOTE,
  DemoBadge,
  DemoFooter,
  DemoHeading,
  DemoNav,
  DemoVars,
  Swatch,
  useDemoAnchors,
} from "./_shared";

/* 04 — Ember & Oak: bright, warm, editorial hospitality.
   A deliberately different system from the blue local-trade concept: ivory
   paper, letterspaced small caps, hairline rules instead of cards, a menu
   ledger with priced leaders, and image blocks at varied proportions. The
   restaurant's copy is the same fictional content this concept already used —
   no new claims, no invented dishes, hours, or address. */

const MENU: [dish: string, description: string, price: string][] = [
  ["Ember-roasted beetroot", "Whipped goat curd, hazelnut, dill oil", "14"],
  ["Coal-grilled octopus", "Smoked paprika, potato, salsa verde", "24"],
  ["Seared scallops", "Brown butter, cauliflower, brown crumb", "26"],
  ["Wild mushroom risotto", "Aged parmesan, truffle, chive", "22"],
  ["Dry-aged ribeye", "Oak-fired, bone marrow butter, charred allium", "42"],
  ["Burnt honey tart", "Crème fraîche, thyme ice cream", "12"],
];

/* Fictional placeholder imagery: gradients with captions, never stock photos. */
const HERO_IMAGE: [label: string, from: string, to: string] = ["Evening service", "#c98a4f", "#4a2f1c"];
const GALLERY: [label: string, from: string, to: string][] = [
  ["Dining room", "#8a5a3b", "#3d2819"],
  ["Cellar", "#a9713f", "#4a3220"],
  ["The pass", "#e0a45e", "#6b4423"],
];

/* The story section's own frame, so it doesn't repeat a gallery caption. */
const STORY_IMAGE = { label: "The open kitchen", from: "#a9713f", to: "#3a2418" };

const OLIVE = "#7c8460";

const actionBase =
  "inline-flex min-h-11 items-center justify-center rounded-[3px] px-6 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
const actionTone = (tone: "solid" | "line") =>
  tone === "solid"
    ? "bg-[var(--d-accent)] text-[var(--d-on-accent)] hover:opacity-90"
    : "border border-current/25 text-current hover:border-current/50";

/* Square-cornered, letterspaced actions — the opposite of the plumbing site's
   rounded pills. */
function Action({
  children,
  tone = "solid",
  href,
}: {
  children: React.ReactNode;
  tone?: "solid" | "line";
  href: string;
}) {
  return (
    <a href={href} className={`${actionBase} ${actionTone(tone)}`}>
      {children}
    </a>
  );
}

/* Same honest click-to-explain behaviour as the shared DemoAction, but with
   this concept's squared action style. */
function NoteAction({
  children,
  tone = "solid",
}: {
  children: React.ReactNode;
  tone?: "solid" | "line";
}) {
  const [shown, setShown] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setShown((v) => !v)} className={`${actionBase} ${actionTone(tone)}`}>
        {children}
      </button>
      {shown && (
        <p role="status" className="mt-2 basis-full text-[10px] leading-relaxed text-current/55">
          {DEMO_NOTE}
        </p>
      )}
    </>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-current/45">
      {children}
    </figcaption>
  );
}

export default function RestaurantDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  /* Native pickers keep the reservation real without inventing slot data; the
     bounds come from the "Wed-Sun, 6pm-late" and "tables for two to eight" copy. */
  const field =
    "w-full rounded-[3px] border border-[var(--d-line-strong)] bg-[var(--d-card)] px-4 py-3 text-[13px] text-current [color-scheme:light] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] @3xl:w-auto @3xl:px-3 @3xl:text-xs";

  return (
    <DemoVars project={project}>
      <header className="sticky top-0 z-20 border-b border-[var(--d-line)] bg-[var(--d-bg)]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 @5xl:px-8">
          <span className="font-display text-sm font-semibold tracking-[0.28em]">
            EMBER <span className="text-[var(--d-accent)]">&</span> OAK
          </span>
          <DemoNav
            anchor={anchor}
            className="uppercase tracking-[0.14em]"
            items={[
              ["Menu", "menu"],
              ["Story", "story"],
              ["Gallery", "gallery"],
              ["Visit", "contact"],
            ]}
          />
          <a
            href={anchor.href("contact")}
            className="inline-flex min-h-11 items-center rounded-[3px] bg-[var(--d-accent)] px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--d-on-accent)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] @3xl:px-5"
          >
            Reserve
          </a>
        </div>
      </header>

      {/* Masthead — image-led, centred, unhurried. */}
      <section className="px-4 pb-16 pt-14 text-center @5xl:px-8 @5xl:pb-24 @5xl:pt-20">
        <div className="mx-auto max-w-3xl">
          <DemoBadge />
          <DemoHeading
            preview={preview}
            className="mt-6 font-display text-[2.1rem] leading-[1.06] font-medium tracking-tight @3xl:text-5xl @5xl:text-[3.6rem]"
          >
            Modern Dining. <span className="italic text-[var(--d-accent)]">Made Memorable.</span>
          </DemoHeading>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-current/70 @5xl:text-base">
            Fire-led cooking, seasonal produce, and a room designed for lingering. Open Wednesday to
            Sunday, from six until late.
          </p>
          <div className="mt-8 flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:justify-center">
            <Action href={anchor.href("contact")}>Reserve a Table</Action>
            <Action href={anchor.href("menu")} tone="line">View Menu</Action>
          </div>
        </div>

        <figure className="mx-auto mt-12 max-w-5xl @5xl:mt-16">
          <Swatch
            className="h-56 w-full rounded-[3px] @3xl:h-72 @5xl:h-[26rem]"
            from={HERO_IMAGE[1]}
            to={HERO_IMAGE[2]}
          />
          <Caption>{HERO_IMAGE[0]}</Caption>
        </figure>
      </section>

      {/* Menu — a printed ledger on cream, not a card grid. */}
      <section
        id={anchor.id("menu")}
        className="scroll-mt-24 border-y border-[var(--d-line)] bg-[color-mix(in_oklab,var(--d-accent)_6%,var(--d-bg))] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: OLIVE }}>
            From the kitchen
          </p>
          <h2 className="mt-3 text-center font-display text-3xl font-medium tracking-tight @3xl:text-4xl">
            The Menu
          </h2>
          <div className="mt-12 grid gap-x-14 @3xl:grid-cols-2">
            {MENU.map(([name, desc, price]) => (
              <div key={name} className="border-b border-[var(--d-line)] py-5">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-[15px] font-semibold tracking-tight @3xl:text-base">{name}</h3>
                  <span
                    aria-hidden="true"
                    className="min-w-6 flex-1 -translate-y-[3px] border-b border-dotted border-current/25"
                  />
                  <span className="font-display text-[15px] font-semibold text-[var(--d-accent)] @3xl:text-base">
                    {price}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-current/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story — asymmetric editorial split, large type, no marketing cards. */}
      <section id={anchor.id("story")} className="scroll-mt-24 px-4 py-16 @5xl:px-8 @5xl:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 @5xl:grid-cols-[1.15fr_1fr] @5xl:items-end @5xl:gap-16">
          <div>
            <span className="block h-px w-16" style={{ background: OLIVE }} />
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: OLIVE }}>
              Our story
            </p>
            <h2 className="mt-4 font-display text-[1.75rem] leading-[1.15] font-medium tracking-tight @3xl:text-4xl @5xl:text-[2.9rem]">
              A room built around fire
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-current/70 @5xl:text-[17px]">
              Every plate passes over oak and ember. Our open kitchen sits at the heart of the dining
              room, so you can watch the evening come together.
            </p>
            <div className="mt-7 flex flex-wrap">
              <NoteAction tone="line">Our Story</NoteAction>
            </div>
          </div>
          <figure>
            <Swatch className="h-64 w-full rounded-[3px] @5xl:h-[30rem]" from={STORY_IMAGE.from} to={STORY_IMAGE.to} />
            <Caption>{STORY_IMAGE.label}</Caption>
          </figure>
        </div>
      </section>

      {/* Gallery — one dominant frame, two supporting, varied proportions. */}
      <section id={anchor.id("gallery")} className="scroll-mt-24 px-4 pb-16 @5xl:px-8 @5xl:pb-24">
        <div className="mx-auto grid max-w-6xl gap-4 @3xl:grid-cols-3 @3xl:grid-rows-2 @5xl:gap-6">
          <figure className="@3xl:col-span-2 @3xl:row-span-2">
            <Swatch
              className="h-52 w-full rounded-[3px] transition-transform duration-500 hover:scale-[1.015] @3xl:h-full @3xl:min-h-[24rem]"
              from={GALLERY[2][1]}
              to={GALLERY[2][2]}
            />
            <Caption>{GALLERY[2][0]}</Caption>
          </figure>
          {GALLERY.slice(0, 2).map(([label, from, to]) => (
            <figure key={label}>
              <Swatch
                className="h-36 w-full rounded-[3px] transition-transform duration-500 hover:scale-[1.015] @3xl:h-[11.2rem]"
                from={from}
                to={to}
              />
              <Caption>{label}</Caption>
            </figure>
          ))}
        </div>
      </section>

      {/* Reservation — the closing priority, warm and legible on a phone. */}
      <section id={anchor.id("contact")} className="scroll-mt-24 px-4 pb-16 @5xl:px-8 @5xl:pb-24">
        <div className="mx-auto max-w-5xl rounded-[4px] border border-[var(--d-line)] bg-[color-mix(in_oklab,var(--d-accent)_8%,var(--d-bg))] px-6 py-12 text-center @5xl:px-16 @5xl:py-16">
          <span className="mx-auto block h-px w-16" style={{ background: OLIVE }} />
          <h2 className="mt-6 font-display text-[1.7rem] font-medium tracking-tight @3xl:text-4xl">
            Reserve your evening
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-current/70">
            Tables for two to eight. For larger parties, contact us directly.
          </p>
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 @3xl:flex-row @3xl:flex-wrap @3xl:items-end @3xl:justify-center">
            <label className="flex flex-col gap-1.5 text-left @3xl:flex-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-current/50">Date</span>
              <input type="date" name="date" className={field} />
            </label>
            <label className="flex flex-col gap-1.5 text-left @3xl:flex-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-current/50">Time</span>
              <input type="time" name="time" min="18:00" max="23:30" step={900} className={field} />
            </label>
            <label className="flex flex-col gap-1.5 text-left @3xl:w-28">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-current/50">Guests</span>
              <input type="number" name="guests" min={2} max={8} defaultValue={2} className={field} />
            </label>
            <NoteAction>Find a Table</NoteAction>
          </div>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-current/50">
            12 Oak Street · Wed–Sun · 6pm–late
          </p>
        </div>
      </section>

      <DemoFooter name="Ember & Oak" />
    </DemoVars>
  );
}
