"use client";

import { useState } from "react";
import { Bath, Flame, KeyRound, Search, Siren, Waves } from "lucide-react";
import type { DemoProps } from "./_shared";
import {
  Btn,
  DemoBadge,
  DemoFaq,
  DemoFooter,
  DemoHeading,
  DemoNav,
  DemoVars,
  DEMO_NOTE,
  Swatch,
  useDemoAnchors,
} from "./_shared";

/* 02 — FlowRight Plumbing: bright, practical, call-first.
   A deliberately different system from the dark local-service layout — light
   surfaces, white cards, one strong blue, and the booking action always in
   reach. All copy still comes from project.content. */

/* Service order matches content.services in src/lib/data.ts. */
const SERVICE_ICONS = [Siren, Flame, Search, Bath, Waves, KeyRound];

export default function PlumberDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const [ctaShown, setCtaShown] = useState(false);
  const c = project.content;
  if (!c) return null;

  const [availability, pricePromise] = c.stats;
  const cards =
    "rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] shadow-[var(--d-shadow)]";

  return (
    <DemoVars project={project}>
      {/* Availability strip — the two facts that decide the call. */}
      <div className="bg-[var(--d-accent)]/10 px-4 py-2 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-current @5xl:px-8">
        {availability.value} {availability.label.toLowerCase()} · {pricePromise.value.toLowerCase()}{" "}
        {pricePromise.label.toLowerCase()}
      </div>

      <header className="sticky top-0 z-20 border-b border-[var(--d-line)] bg-[var(--d-bg)]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 @5xl:px-8">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--d-accent)] font-display text-xs font-bold text-[var(--d-on-accent)]">
              {c.logoLetter}
            </span>
            <span className="font-display text-sm font-bold tracking-tight">{c.navName}</span>
          </div>
          <DemoNav
            anchor={anchor}
            className="text-current/65"
            items={[
              ["Services", "services"],
              ["Prices", "prices"],
              ["Work", "projects"],
              ["FAQ", "faq"],
            ]}
          />
          <Btn href={anchor.href("contact")} className="min-h-11 px-4 @5xl:px-5">
            Book a Callout
          </Btn>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[color-mix(in_oklab,var(--d-accent)_7%,var(--d-bg))]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 @3xl:py-16 @5xl:grid-cols-[1.05fr_1fr] @5xl:px-8 @5xl:py-20">
          <div>
            <DemoBadge />
            <DemoHeading
              preview={preview}
              className="mt-4 font-display text-[2rem] leading-[1.05] font-bold tracking-tight @3xl:text-4xl @5xl:text-[3.1rem]"
            >
              {c.headline}{" "}
              <span className="text-[var(--d-accent)]">{c.headlineAccent}</span>
            </DemoHeading>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-current/70">{c.intro}</p>
            <div className="mt-7 flex flex-col gap-3 @3xl:flex-row">
              <Btn href={anchor.href("contact")} className="min-h-12 px-6 py-3.5 text-sm">
                {c.ctaPrimary}
              </Btn>
              <Btn href={anchor.href("prices")} variant="ghost" className="min-h-12 px-6 py-3.5 text-sm">
                {c.ctaSecondary}
              </Btn>
            </div>
            <div className="mt-8 grid gap-3 @3xl:grid-cols-2">
              {c.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-xl border border-[var(--d-line)] bg-[var(--d-card)] px-4 py-3"
                >
                  <span className="font-display text-xl font-bold text-[var(--d-accent)]">{s.value}</span>
                  <span className="text-[12px] leading-tight text-current/65">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual: one dominant tile, two supporting, in a white frame. */}
          <div className={`${cards} p-3 @5xl:p-4`}>
            <Swatch className="h-40 w-full @5xl:h-56" from={c.heroImages[0].from} to={c.heroImages[0].to} label={c.heroImages[0].label} />
            <div className="mt-3 grid grid-cols-2 gap-3">
              {c.heroImages.slice(1).map((img) => (
                <Swatch key={img.label} className="h-24 @5xl:h-28" from={img.from} to={img.to} label={img.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id={anchor.id("services")} className="scroll-mt-24 px-4 py-12 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--d-accent)]">Call us for</p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight @3xl:text-3xl">{c.servicesTitle}</h2>
        <div className="mt-8 grid gap-4 @md:grid-cols-2 @5xl:grid-cols-3">
          {c.services.map((s, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
            return (
              <div
                key={s.title}
                className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] p-5 shadow-[var(--d-shadow)] transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--d-accent)]/12 text-[var(--d-accent)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-[1rem] font-bold">{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-current/65">{s.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Price / coverage — scannable, and no rates are invented. */}
      <section
        id={anchor.id("prices")}
        className="scroll-mt-24 border-y border-[var(--d-line)] bg-[color-mix(in_oklab,var(--d-accent)_6%,var(--d-bg))] px-4 py-12 @5xl:px-8 @5xl:py-16"
      >
        <div className="mx-auto grid max-w-6xl gap-8 @5xl:grid-cols-[1fr_1.15fr] @5xl:items-start">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight @3xl:text-3xl">
              {pricePromise.label}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-current/70">
              {c.whyIntro}
            </p>
            <p className="mt-4 max-w-sm text-[11px] leading-relaxed text-current/50">
              A real business website would list its callout rates in this section once they are
              confirmed. This concept site publishes none.
            </p>
          </div>
          <ol className="space-y-3">
            {[
              ["You tell us what is wrong", c.ctaBody],
              ["The price is set first", `${pricePromise.value} ${pricePromise.label.toLowerCase()} — ${c.whyPoints[1].toLowerCase()}`],
              ["We come when we said", c.whyPoints[0]],
            ].map(([title, body], i) => (
              <li key={title} className={`${cards} flex gap-4 p-4`}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--d-accent)] font-display text-sm font-bold text-[var(--d-on-accent)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-current/65">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery — varied block sizes instead of a repeated tile row. */}
      <section id={anchor.id("projects")} className="scroll-mt-24 px-4 py-12 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight @3xl:text-3xl">{c.galleryTitle}</h2>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-current/45 @3xl:block">
            {c.whyPoints[3]}
          </span>
        </div>
        <div className="mt-6 grid gap-4 @md:grid-cols-2 @5xl:grid-cols-[1.4fr_1fr] @5xl:grid-rows-2">
          {c.gallery.map((g, i) => (
            <figure key={g.title} className={`group ${i === 0 ? "@5xl:row-span-2" : ""}`}>
              <Swatch
                className={`w-full shadow-[var(--d-shadow)] transition-transform duration-300 group-hover:-translate-y-1 ${
                  i === 0 ? "h-52 @5xl:h-full @5xl:min-h-[22rem]" : "h-28 @3xl:h-32"
                }`}
                from={g.from}
                to={g.to}
              />
              <figcaption className="mt-2 text-[13px] font-medium text-current/70">{g.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id={anchor.id("faq")} className="scroll-mt-24 px-4 pb-12 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight @3xl:text-3xl">{c.faqTitle}</h2>
        <div className={`${cards} mt-4 p-1.5 @5xl:p-2`}>
          <DemoFaq items={c.faqs} />
        </div>
      </section>

      {/* Closing CTA — the one heavy colour moment, still on a bright page. */}
      <section id={anchor.id("contact")} className="scroll-mt-24 px-4 pb-14 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8">
        <div className="rounded-3xl bg-[var(--d-accent)] px-6 py-10 text-center text-[var(--d-on-accent)] @5xl:px-12 @5xl:py-14">
          <h2 className="font-display text-2xl font-bold tracking-tight @3xl:text-3xl">{c.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed opacity-90">{c.ctaBody}</p>
          <button
            type="button"
            onClick={() => setCtaShown((v) => !v)}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-[var(--d-accent)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {c.ctaPrimary}
          </button>
          {ctaShown && (
            <p role="status" className="mx-auto mt-4 max-w-md text-[11px] leading-relaxed opacity-85">
              {DEMO_NOTE}
            </p>
          )}
        </div>
      </section>

      <DemoFooter name={project.name} />
    </DemoVars>
  );
}
