"use client";

import { useState } from "react";
import type { DemoProps } from "./_shared";
import {
  DemoVars,
  DemoBadge,
  DemoHeading,
  DemoNav,
  DemoFaq,
  Swatch,
  Btn,
  DemoAction,
  DemoFooter,
  useDemoAnchors,
} from "./_shared";

/* Local-service layout shared by the renovation and electrician concepts.
   Every string comes from project.content so each fictional business reads as
   its own site, not a recoloured template. FlowRight has its own bright layout
   (PlumberDemo) because a light palette needs a different composition. */
export default function LocalServiceDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const [showAllWork, setShowAllWork] = useState(false);
  const c = project.content;
  if (!c) return null;

  /* Two projects show by default so the "View all" control does real work. */
  const gallery = showAllWork ? c.gallery : c.gallery.slice(0, 2);

  const secondaryHref = /project/i.test(c.ctaSecondary) ? anchor.href("projects") : anchor.href("services");

  return (
    <DemoVars project={project}>
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-[var(--d-line)] bg-[var(--d-bg)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 @5xl:px-8">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[var(--d-accent)] font-display text-[11px] font-bold text-[var(--d-on-accent)]">{c.logoLetter}</span>
            <span className="font-display text-sm font-semibold tracking-tight">{c.navName}</span>
          </div>
          <DemoNav
            anchor={anchor}
            items={[
              ["Services", "services"],
              ["Projects", "projects"],
              ["About", "about"],
              ["FAQ", "contact"],
            ]}
          />
          <Btn href={anchor.href("contact")}>Get a Quote</Btn>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 @3xl:py-16 @5xl:grid-cols-2 @5xl:gap-12 @5xl:px-8 @5xl:py-20">
          <div>
            <DemoBadge />
            <DemoHeading preview={preview} className="mt-4 font-display text-3xl leading-[1.08] font-semibold tracking-tight @3xl:text-4xl @5xl:text-5xl">
              {c.headline} <span className="text-[var(--d-accent)]">{c.headlineAccent}</span>
            </DemoHeading>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-current/65">{c.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn href={anchor.href("contact")} className="px-5 py-2.5">{c.ctaPrimary}</Btn>
              <Btn href={secondaryHref} variant="ghost" className="px-5 py-2.5">{c.ctaSecondary}</Btn>
            </div>
            <div className="mt-8 flex gap-6 text-[11px] text-current/55">
              {c.stats.map((s) => (
                <div key={s.label}>
                  <span className="block font-display text-lg text-current">{s.value}</span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {c.heroImages.map((img, i) => (
              <Swatch
                key={img.label}
                className={i === 0 ? "col-span-2 h-40 @5xl:h-52" : "h-28"}
                from={img.from}
                to={img.to}
                label={img.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id={anchor.id("services")} className="scroll-mt-16 border-y border-[var(--d-line)] bg-[var(--d-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-12 @5xl:px-8 @5xl:py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--d-accent)]">What we do</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight @3xl:text-3xl">{c.servicesTitle}</h2>
          <div className="mt-8 grid gap-4 @md:grid-cols-2 @5xl:grid-cols-3">
            {c.services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-soft)] p-5 transition-colors hover:border-[var(--d-accent)]/40">
                <h3 className="font-display text-[1rem] font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-current/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects gallery */}
      <section id={anchor.id("projects")} className="mx-auto max-w-6xl scroll-mt-16 px-4 py-12 @5xl:px-8 @5xl:py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight @3xl:text-3xl">{c.galleryTitle}</h2>
          {c.gallery.length > 2 && (
            <button
              type="button"
              onClick={() => setShowAllWork((v) => !v)}
              className="hidden min-h-6 items-center text-[11px] text-[var(--d-accent)] hover:underline @5xl:inline-flex"
            >
              {showAllWork ? "Show less" : "View all →"}
            </button>
          )}
        </div>
        <div className="mt-6 grid gap-4 @md:grid-cols-2 @5xl:grid-cols-3">
          {gallery.map((g) => (
            <figure key={g.title} className="group">
              <Swatch className="h-44 w-full @5xl:h-52" from={g.from} to={g.to} />
              <figcaption className="mt-2 text-[13px] text-current/70">{g.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section id={anchor.id("about")} className="border-y scroll-mt-16 border-[var(--d-line)] bg-[var(--d-soft)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 @5xl:grid-cols-[1fr_1.1fr] @5xl:px-8 @5xl:py-16">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight @3xl:text-3xl">{c.whyTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-current/60">{c.whyIntro}</p>
          </div>
          <ul className="space-y-3">
            {c.whyPoints.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-xl border border-[var(--d-line)] bg-[var(--d-bg)] px-4 py-3 text-sm">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--d-accent)] text-[10px] font-bold text-[var(--d-on-accent)]">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section id={anchor.id("contact")} className="mx-auto max-w-6xl scroll-mt-16 px-4 py-12 @5xl:px-8 @5xl:py-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight @3xl:text-3xl">{c.faqTitle}</h2>
        <DemoFaq items={c.faqs} />
        <div className="mt-8 rounded-2xl border border-[var(--d-accent)]/30 bg-[var(--d-accent)]/8 p-6 text-center @5xl:p-8">
          <h3 className="font-display text-xl font-semibold @3xl:text-2xl">{c.ctaTitle}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-current/65">{c.ctaBody}</p>
          <DemoAction className="mt-5 px-6 py-2.5">{c.ctaPrimary}</DemoAction>
        </div>
      </section>

      <DemoFooter name={project.name} />
    </DemoVars>
  );
}
