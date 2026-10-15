"use client";

import { useState } from "react";
import type { DemoProps } from "./_shared";
import {
  Btn,
  DemoBadge,
  DemoFaq,
  DemoFooter,
  DemoHeading,
  DemoImage,
  DemoMobileMenu,
  DemoNav,
  DemoStickyCta,
  DemoVars,
  DEMO_NOTE,
  useDemoAnchors,
  type DemoNavItem,
} from "./_shared";

/* 01 — Atlas Renovation Co.: an editorial architecture studio, not a service
   brochure. Whitespace instead of panels, oversized serif instead of a banner,
   photographs instead of gradient tiles, and asymmetric rows instead of a card
   grid. There are no borders around content, no shadows, and no stats.

   The signature motion is the hero photograph settling from a slight overzoom
   into its frame; every other section uses the shared scroll-driven reveal. The
   before/after drag slider this layout was first sketched with was dropped: the
   imagery rule allows only a genuine pair of the same space from a licence-
   verifiable source, and no such pair exists, and a "before" faked with a filter
   or a crop of one photo would be a lie about work nobody did.

   All copy is read from project.content. The fields this layout needs that the
   shared local-service template does not (hero, statement, work, process,
   contact) are optional there, so the plumber and the electrician are untouched.
 */

const navItems: DemoNavItem[] = [
  ["Work", "work"],
  ["Process", "process"],
  ["Services", "services"],
];

/* On the charcoal closing surface the only legible inks are the page colour
   itself and a deliberate blend of it back into charcoal. The bronze stays a
   fill there: at 12px it measures 3.7:1 on charcoal, which fails, so small text
   on that band is paper, never accent. */
const paper = "text-[var(--d-bg)]";
const paperSoft = "text-[color:color-mix(in_oklab,var(--d-bg)_78%,var(--d-fg))]";

export default function RenovationDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const [sent, setSent] = useState(false);
  /* Which service row is being read, or nothing at all until one is. */
  const [active, setActive] = useState<number | null>(null);

  const c = project.content;
  if (!c) return null;

  const hero = c.hero;
  const work = c.work;
  const process = c.process;
  const contact = c.contact;
  const previews = c.servicePreviews ?? [];

  /* Reuse the content's own call to action, minus the arrow it carries for the
     hero button — a nav bar and a sticky bar have no room for it. */
  const bookLabel = (c.ctaPrimary ?? "").replace(" →", "");

  return (
    <DemoVars project={project}>
      {/* 1 — Top bar: a wordmark, three links, one action. */}
      <header className="sticky top-0 z-30 border-b border-[var(--d-line)] bg-[var(--d-bg)]/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 @5xl:px-8">
          <a
            href={anchor.href("top")}
            className="inline-flex min-h-11 items-center font-display text-[15px] font-semibold tracking-[0.14em] uppercase @3xl:text-base"
          >
            {c.navName}
          </a>
          <div className="flex items-center gap-3 @5xl:gap-8">
            <DemoNav anchor={anchor} items={navItems} />
            {/* The bar's action appears with the inline links. It is wrapped rather
                than given `hidden` itself, because Btn already carries a display
                utility and the two would collide at the same specificity. */}
            <span className="hidden @3xl:inline-flex">
              <Btn href={anchor.href("contact")}>{bookLabel}</Btn>
            </span>
            <DemoMobileMenu anchor={anchor} items={navItems} action={[bookLabel, "contact"]} />
          </div>
        </div>
      </header>

      {/* 2 — Hero: a full-bleed photograph, then a headline that breaks out of it.
         The headline sits on its own plate of the page colour and only overlaps
         the bottom edge of the image, so its contrast is the page's contrast —
         charcoal on warm paper — rather than a bet on how bright the room in the
         photograph happens to be. */}
      <section id={anchor.id("top")} className="relative">
        {hero ? (
          <DemoImage
            src={hero.src}
            alt={hero.alt}
            sizes="100vw"
            preload={!preview}
            imgClassName="hero-settle"
            className="h-[19rem] w-full @3xl:h-[24rem] @5xl:h-[32rem]"
          />
        ) : (
          <div className="h-56 w-full bg-[var(--d-soft)]" />
        )}

        <div className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 @3xl:-mt-16 @5xl:-mt-24 @5xl:mr-[12%] @5xl:px-8">
          <div className="max-w-4xl bg-[var(--d-bg)] py-6 pr-4 @3xl:py-8 @5xl:pr-10">
            <DemoHeading
              preview={preview}
              className="font-display text-[2.75rem] leading-[0.94] font-semibold tracking-[-0.02em] @3xl:text-[4rem] @5xl:text-[5.5rem]"
            >
              {hero?.headline ?? c.headline}{" "}
              <span className="font-normal italic text-[var(--d-accent-text)]">
                {hero?.accent ?? c.headlineAccent}
              </span>
            </DemoHeading>
          </div>

          <div className="mt-6 flex flex-col gap-6 border-t border-[var(--d-line)] pt-5 @3xl:flex-row @3xl:items-end @3xl:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--d-body)] @5xl:text-base">
              {c.intro}
            </p>
            <div className="flex items-center gap-4 @3xl:flex-col @3xl:items-end @3xl:gap-3">
              <DemoBadge />
              {hero && (
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--d-muted)]">
                  {hero.caption}
                </p>
              )}
              {/* 3 — the scroll cue, a real link to the section below. */}
              <a
                href={anchor.href("work")}
                className="inline-flex min-h-11 items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--d-accent-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
              >
                Scroll
                <span aria-hidden="true" className="block h-px w-8 bg-current" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Statement strip: one sentence, no columns, nothing beside it. */}
      <section className="demo-reveal px-4 py-16 @3xl:py-20 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-28">
        <p className="max-w-4xl font-display text-[1.6rem] leading-[1.25] font-normal tracking-[-0.01em] @3xl:text-[2.1rem] @5xl:text-[2.6rem]">
          {c.statement ?? c.whyIntro}
        </p>
      </section>

      {/* 5 — Work: three projects as alternating image/text rows, 60/40, flipped
         each time. Type and scope rather than numbers: the honesty rule allows no
         invented results, and a renovation studio's case for itself is the rooms. */}
      <section
        id={anchor.id("work")}
        className="demo-reveal border-t border-[var(--d-line)] px-4 py-14 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-20"
      >
        <div className="flex flex-col gap-2 @3xl:flex-row @3xl:items-end @3xl:justify-between">
          <h2 className="font-display text-[1.75rem] leading-tight font-semibold tracking-tight @3xl:text-3xl">
            {work?.eyebrow ?? c.galleryTitle}
          </h2>
          {work?.lead && (
            <p className="max-w-sm text-[14px] leading-relaxed text-[var(--d-body)]">{work.lead}</p>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-14 @5xl:gap-20">
          {(work?.items ?? []).map((item, i) => (
            <div
              key={item.title}
              className={`demo-reveal flex flex-col gap-5 @5xl:grid @5xl:grid-cols-[1.5fr_1fr] @5xl:items-center @5xl:gap-12 ${
                i % 2 === 1 ? "@5xl:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="m-0">
                <DemoImage
                  src={item.src}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 57vw, 100vw"
                  className="aspect-[4/3] w-full @3xl:aspect-[16/10]"
                />
                <figcaption className="mt-3 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--d-muted)]">
                  {item.type}
                </figcaption>
              </figure>
              <div>
                <h3 className="font-display text-[1.6rem] leading-tight font-semibold tracking-tight @5xl:text-[2rem]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--d-body)]">
                  {item.scope}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Standing rule for the photography, stated where the photographs are. */}
        {c.imageSource && (
          <p className="mt-12 max-w-lg text-[12px] leading-relaxed text-[var(--d-muted)]">
            {c.imageSource}
          </p>
        )}
      </section>

      {/* 6 — Process: four numbered stages in a row, held apart by hairlines only.
         The line above each step is the connector; on a phone the row becomes a
         column and the connector moves to the left edge. */}
      {process && (
        <section
          id={anchor.id("process")}
          className="demo-reveal border-t border-[var(--d-line)] px-4 py-14 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-20"
        >
          <div className="flex flex-col gap-2 @3xl:flex-row @3xl:items-end @3xl:justify-between">
            <h2 className="font-display text-[1.75rem] leading-tight font-semibold tracking-tight @3xl:text-3xl">
              {process.title}
            </h2>
            <p className="max-w-sm text-[14px] leading-relaxed text-[var(--d-body)]">{process.intro}</p>
          </div>
          <ol className="mt-10 flex flex-col gap-0 @5xl:grid @5xl:grid-cols-4 @5xl:gap-0">
            {process.steps.map((step, i) => (
              <li
                key={step.no}
                className={`border-t border-[var(--d-line)] py-5 @5xl:border-t-0 @5xl:border-l @5xl:py-0 @5xl:pr-6 ${
                  i === 0 ? "@5xl:border-l-0 @5xl:pl-0" : "@5xl:pl-6"
                }`}
              >
                <span className="font-mono text-[12px] tracking-[0.1em] text-[var(--d-accent-text)]">
                  {step.no}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--d-body)]">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 7 — Services as an indexed list: rules, not cards. On a pointer device
         the row being read previews a room of that kind in the column beside it;
         the list itself always carries every word, so nothing is hover-only. */}
      <section
        id={anchor.id("services")}
        className="demo-reveal border-t border-[var(--d-line)] px-4 py-14 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-20"
      >
        <div className="@5xl:grid @5xl:grid-cols-[1.35fr_1fr] @5xl:gap-14">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--d-accent-text)]">
              {c.servicesEyebrow}
            </p>
            <h2 className="mt-2 font-display text-[1.75rem] leading-tight font-semibold tracking-tight @3xl:text-3xl">
              {c.servicesTitle}
            </h2>
            {c.servicesLead && (
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[var(--d-body)]">
                {c.servicesLead}
              </p>
            )}

            <ul className="mt-8 list-none p-0">
              {(c.services ?? []).map((s, i) => (
                <li key={s.title} className="border-t border-[var(--d-line)] last:border-b">
                  <a
                    href={anchor.href("contact")}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="flex min-h-11 items-baseline gap-4 py-4 transition-colors hover:text-current focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                  >
                    <span className="font-mono text-[12px] tracking-[0.1em] text-[var(--d-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.05rem] font-semibold tracking-tight @3xl:text-xl">
                      {s.title}
                    </span>
                    <span className="ml-auto hidden max-w-[16rem] text-right text-[13px] leading-snug text-[var(--d-body)] @3xl:block">
                      {s.body}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* The preview column. Purely decorative — the same six services are
              named and described in the list — so it is hidden from assistive tech
              and never appears on a touch device. The column always holds its
              width so a plate arriving is not a layout shift, but the image itself
              is only mounted once a row has been read, so a visitor who never
              hovers never downloads it. */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative hidden @5xl:pointer-fine:block"
          >
            <div className="sticky top-28 h-[19rem] w-full">
              {active !== null && previews[active] && (
                <DemoImage
                  key={previews[active]}
                  src={previews[active]}
                  alt=""
                  sizes="28vw"
                  className="pop-in h-[19rem] w-full"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8 — FAQ. */}
      <section
        id={anchor.id("faq")}
        className="demo-reveal border-t border-[var(--d-line)] px-4 py-14 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-20"
      >
        <div className="@5xl:grid @5xl:grid-cols-[1fr_1.6fr] @5xl:gap-14">
          <h2 className="font-display text-[1.75rem] leading-tight font-semibold tracking-tight @3xl:text-3xl">
            {c.faqTitle}
          </h2>
          <DemoFaq items={c.faqs ?? []} />
        </div>
      </section>

      {/* 9 — Closing: the one dark surface on the page, holding the form. Charcoal
         carries warm-paper text, so the fields, their labels and the note are all
         measured against #1B1B1A rather than the page colour. */}
      <section
        id={anchor.id("contact")}
        /* The extra bottom padding below @3xl is the sticky action bar's own
           height: the bar is 44px of button plus its padding and hairline, and
           without it the submit button sits under the bar at every scroll
           position short of the very end. */
        className="demo-reveal bg-[var(--d-fg)] px-4 pt-16 pb-28 text-[var(--d-bg)] @3xl:pb-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-7xl @5xl:grid @5xl:grid-cols-[1fr_1.15fr] @5xl:gap-16">
          <div>
            <p className={`font-mono text-[12px] uppercase tracking-[0.1em] ${paperSoft}`}>
              {contact?.eyebrow}
            </p>
            <h2 className={`mt-3 font-display text-[1.9rem] leading-[1.1] font-semibold tracking-tight @3xl:text-[2.4rem] ${paper}`}>
              {c.ctaTitle}
            </h2>
            <p className={`mt-4 max-w-sm text-[15px] leading-relaxed ${paper}`}>{c.ctaBody}</p>
            <p className={`mt-6 max-w-sm text-[12px] leading-relaxed ${paperSoft}`}>
              A concept form: nothing typed here is sent anywhere. On a live site it would open a
              consultation request.
            </p>
          </div>

          {/* The note above and this form are siblings that only become columns at
             @5xl, so below that they stacked with no gap at all and the first
             field label sat directly under the note. */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-8 flex flex-col gap-4 @5xl:mt-0"
          >
            <Field id={anchor.id("name")} label={contact?.name ?? "Name"}>
                <input
                  id={anchor.id("name")}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </Field>
              <Field id={anchor.id("email")} label={contact?.email ?? "Email"}>
                <input
                  id={anchor.id("email")}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>
              <Field id={anchor.id("type")} label={contact?.projectType ?? "Project type"}>
                <select id={anchor.id("type")} name="projectType" className={inputClass}>
                  {(contact?.projectOptions ?? []).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id={anchor.id("message")} label={contact?.message ?? "Message"}>
                <textarea
                  id={anchor.id("message")}
                  name="message"
                  rows={4}
                  required
                  className={`${inputClass} resize-y`}
                />
              </Field>
              <div>
                <button
                  type="submit"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--d-accent)] px-6 py-3 text-[13px] font-semibold text-[var(--d-on-accent)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-bg)] @3xl:w-auto"
                >
                  {contact?.submit ?? bookLabel}
                </button>
              </div>
              {sent && (
                <p role="status" className={`text-[12px] leading-relaxed ${paperSoft}`}>
                  {c.formNote ?? DEMO_NOTE}
                </p>
              )}
            </form>
        </div>
      </section>

      <DemoStickyCta label={bookLabel} href={anchor.href("contact")} />

      <DemoFooter name={project.name} />
    </DemoVars>
  );
}

/* Fields on the charcoal closing surface. Labels are always visible rather than
   placeholders, because a placeholder fades the moment typing starts and this
   palette's faint grey is only certified against the page colour, not charcoal. */
const inputClass =
  "w-full rounded-lg border border-[color:color-mix(in_oklab,var(--d-bg)_45%,var(--d-fg))] bg-transparent px-3.5 py-3 text-[15px] text-[var(--d-bg)] outline-none transition-colors focus-visible:border-[var(--d-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={`font-mono text-[12px] uppercase tracking-[0.1em] ${paperSoft}`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
