"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { DemoProps } from "./_shared";
import {
  DEMO_NOTE,
  DemoBadge,
  DemoFaq,
  DemoHeading,
  DemoImage,
  DemoMobileMenu,
  DemoNav,
  DemoStickyCta,
  DemoVars,
  useDemoAnchors,
  type DemoNavItem,
} from "./_shared";

/* 04 — Ember & Oak: fire-led hospitality, built the way a dining room is set.
   One full-bleed photograph you drift through, a printed card you read by tab,
   a cream band in the middle of a dark page, and a booking panel that answers
   honestly instead of pretending to hold a table.

   Deliberately not the other four concepts: serif display over sans labels,
   square-cornered actions, hairlines instead of cards, and a photograph in
   every section. All copy and every plate comes from project.content — the
   dishes, prices, hours, street and telephone are invented for the fiction and
   the page says so wherever it matters.

   Two things are set here rather than in the palette, because they are this
   layout's own surfaces:
   · the cream band's inks (measured on #F3EBDD, not on the page colour), and
   · the hero's text, which sits on an opaque plate of the page colour laid over
     the bottom of the photograph rather than on the photograph itself. The
     pixels are unknowable at build time, so the type never depends on them. */

const navItems: DemoNavItem[] = [
  ["Menu", "menu"],
  ["Story", "story"],
  ["Gallery", "gallery"],
  ["Visit", "visit"],
];

/* Inks for the inverted (cream) band. `inkBody` and `inkMuted` are the page
   colour mixed toward the cream foreground by a fixed share, so they move with
   the palette instead of being two hard-coded greys. */
const ink = "text-[var(--d-bg)]";
const inkBody = "text-[color:color-mix(in_srgb,var(--d-fg)_24%,var(--d-bg))]";
const inkMuted = "text-[color:color-mix(in_srgb,var(--d-fg)_36%,var(--d-bg))]";
const inkEmber = "text-[color:color-mix(in_srgb,var(--d-bg)_26%,var(--d-accent))]";

/* Square, letterspaced actions — the opposite of the plumbing site's pills. */
const action =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] px-5 py-2.5 font-display text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
const actionSolid = "bg-[var(--d-accent)] text-[var(--d-on-accent)] hover:opacity-90";
const actionLine =
  "border border-[var(--d-line-strong)] text-[var(--d-fg)] hover:bg-[var(--d-hover)]";

/* Each gallery plate's own pixel ratio and a display width that keeps the tall
   ones inside a phone frame. The ratios are the downloaded crops', so nothing is
   cropped in the grid and nothing reflows when the file arrives. */
const PLATE = [
  { box: "aspect-[1100/733]", wide: "max-w-[40rem]" },
  { box: "aspect-[1100/700]", wide: "max-w-[40rem]" },
  { box: "aspect-[800/1200]", wide: "max-w-[22rem]" },
  { box: "aspect-[1100/750]", wide: "max-w-[40rem]" },
  { box: "aspect-[1000/1000]", wide: "max-w-[30rem]" },
];

const label = "font-sans text-[12px] uppercase tracking-[0.26em]";

/* Fields on the dark page. Labels are always visible, and the native pickers get
   this palette's colour scheme so their calendar and clock pop-ups are not white
   boxes on a near-black room. */
const field =
  "w-full rounded-[3px] border border-[var(--d-line-strong)] bg-[var(--d-card)] px-3.5 py-3 text-[15px] text-[var(--d-fg)] [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";

function Field({
  id,
  name,
  hint,
  children,
}: {
  id: string;
  name: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={`${label} text-[var(--d-muted)]`}>
        {name}
      </label>
      {children}
      {hint && <span className="text-[12px] leading-relaxed text-[var(--d-muted)]">{hint}</span>}
    </div>
  );
}

export default function RestaurantDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const c = project.content;
  const r = c?.restaurant;

  const [tab, setTab] = useState(0);
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  /* A `tel:` link inside a device frame would pull the visitor off the portfolio
     page they were looking at, so the number stops being a link there. */
  const [callNote, setCallNote] = useState(false);

  const grid = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  /* Which plate opened the viewer, and whether the viewer is mid-session. */
  const cameFrom = useRef<number | null>(null);
  const shown = useRef(false);

  /* Focus is moved on the commit, not from the click handler: the rest of the
     page is inert while the viewer is up, and a synchronous `.focus()` would run
     while the plate is still inert — which the browser ignores, leaving the
     keyboard visitor at the top of the document. A rAF callback cannot do it
     either, because a backgrounded tab never runs one. */
  useEffect(() => {
    if (open !== null) {
      cameFrom.current = open;
      if (!shown.current) {
        shown.current = true;
        closeBtn.current?.focus();
      }
      return;
    }
    if (!shown.current) return;
    shown.current = false;
    if (cameFrom.current !== null) {
      grid.current?.querySelector<HTMLButtonElement>(`[data-plate="${cameFrom.current}"]`)?.focus();
    }
  }, [open]);

  const dismiss = () => setOpen(null);

  const step = (delta: number) => {
    if (open === null || !r) return;
    const n = r.gallery.items.length;
    setOpen((open + delta + n) % n);
  };

  if (!c || !r) return null;

  const bookLabel = (c.ctaPrimary ?? "").replace(" →", "");
  const phoneHref = preview ? undefined : r.booking.phone.href;
  const items = r.gallery.items;

  /* One tablist, roving tabindex, arrows and Home/End — the panel is a single
     element labelled by the tab that is selected. */
  const onTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = r.menu.tabs.length - 1;
    const next =
      e.key === "ArrowRight" ? Math.min(last, tab + 1)
      : e.key === "ArrowLeft" ? Math.max(0, tab - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setTab(next);
    tabs.current[next]?.focus();
  };

  return (
    <DemoVars project={project}>
      {/* The page behind the viewer is made inert while it is open, so the tab
          order and the accessibility tree stay inside the dialog. */}
      <div inert={open !== null}>
        {/* 1 — Top bar: quiet over the hero, solid under everything else. */}
        <header className="demo-header-fire sticky top-0 z-30 border-b border-[var(--d-line)] bg-[color-mix(in_oklab,var(--d-bg)_97%,transparent)] backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 @5xl:px-8">
            <a
              href={anchor.href("top")}
              className={`inline-flex min-h-11 items-center ${label} font-display font-semibold`}
            >
              {c.navName}
            </a>
            <div className="flex items-center gap-3 @5xl:gap-8">
              <DemoNav anchor={anchor} items={navItems} className={label} />
              {/* Wrapped rather than given `hidden` itself: Btn already carries a
                  display utility and the two would collide. */}
              <span className="hidden @3xl:inline-flex">
                <a
                  href={anchor.href("visit")}
                  className={`${action} ${actionSolid} tracking-[0.16em] px-4 @3xl:px-5`}
                >
                  Reserve
                </a>
              </span>
              <DemoMobileMenu anchor={anchor} items={navItems} action={[bookLabel, "visit"]} />
            </div>
          </div>
        </header>

        {/* 2 — Hero: the room, drifting. The type sits on an opaque plate that
           overlaps the bottom edge of the photograph, not on the photograph
           itself. A fire-lit room can be anywhere between near-black and a
           blown-out ember, and nothing at build time says which, so contrast is
           proved against the plate rather than guessed at the pixels. */}
        <section id={anchor.id("top")} className="relative">
          <DemoImage
            src={r.hero.src}
            alt={r.hero.alt}
            sizes="100vw"
            preload={!preview}
            imgClassName="demo-ken-burns"
            className="h-[26rem] w-full @3xl:h-[34rem] @5xl:h-[42rem]"
          />
          <div className="relative z-10 -mt-20 px-4 @3xl:-mt-24 @3xl:px-6 @5xl:px-8">
            <div className="mx-auto max-w-2xl rounded-[4px] border border-[var(--d-line)] bg-[var(--d-bg)] px-5 py-7 text-center @3xl:px-8 @3xl:py-9">
              <DemoBadge />
              <DemoHeading
                preview={preview}
                className="mt-5 font-display text-[2.6rem] leading-[1.02] font-medium tracking-[-0.01em] @3xl:text-[3.4rem] @5xl:text-[4.4rem]"
              >
                {r.hero.headline}{" "}
                <span className="italic text-[var(--d-accent-text)]">{r.hero.accent}</span>
              </DemoHeading>
              <p className="mt-4 text-[14px] leading-relaxed text-[var(--d-body)] @3xl:text-[15px]">
                {r.hero.hoursLine}
              </p>
              <div className="mt-7 flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:justify-center">
                <a href={anchor.href("visit")} className={`${action} ${actionSolid}`}>
                  {c.ctaPrimary}
                </a>
                <a href={anchor.href("menu")} className={`${action} ${actionLine}`}>
                  {c.ctaSecondary}
                </a>
              </div>
              <p className={`mt-6 ${label} font-normal text-[var(--d-body)]`}>{r.hero.caption}</p>
            </div>
          </div>
        </section>

        {/* 3 — The kitchen, set as a drop-styled opening line and the four
           stations that make it up. */}
        <section className="demo-reveal px-4 py-16 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-24">
          <div className="@5xl:grid @5xl:grid-cols-[1.5fr_1fr] @5xl:gap-16">
            <div>
              {/* The only heading this section has, so the four station titles
                  below are h3 children of it rather than an h1 → h3 jump. */}
              <h2 className={`${label} text-[var(--d-accent-text)]`}>{r.intro.eyebrow}</h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-[var(--d-body)] first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.4rem] first-letter:leading-[0.76] first-letter:font-medium first-letter:text-[var(--d-fg)] @3xl:text-[17px]">
                {r.intro.body}
              </p>
            </div>
            <ul className="mt-10 list-none p-0 @5xl:mt-1">
              {(c.services ?? []).map((s, i) => (
                <li key={s.title} className="border-t border-[var(--d-line)] py-4 last:border-b">
                  <h3 className="font-display text-[1.3rem] leading-tight font-medium tracking-tight">
                    <span className="mr-2 font-sans text-[12px] tracking-[0.16em] text-[var(--d-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--d-body)]">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 — The card: one tab per course, a printed ledger with dotted leaders.
           The band is a 6% wash of the accent into the page colour — lighter than
           the two accent washes every derived token is already measured against. */}
        <section
          id={anchor.id("menu")}
          className="demo-reveal border-y border-[var(--d-line)] bg-[color-mix(in_srgb,var(--d-accent)_6%,var(--d-bg))] px-4 py-16 @5xl:px-8 @5xl:py-24"
        >
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className={`${label} text-[var(--d-accent-text)]`}>{r.menu.eyebrow}</p>
              <h2 className="mt-3 font-display text-[2rem] leading-tight font-medium tracking-tight @3xl:text-[2.6rem]">
                {r.menu.title}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-[var(--d-body)]">
                {r.menu.lead}
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Menu courses"
              onKeyDown={onTabKey}
              className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 border-b border-[var(--d-line)] pb-0 @3xl:gap-x-10"
            >
              {r.menu.tabs.map((t, i) => {
                const selected = i === tab;
                return (
                  <button
                    key={t.label}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${uid}-tab-${i}`}
                    aria-selected={selected}
                    aria-controls={`${uid}-card`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(i)}
                    className={`-mb-px inline-flex min-h-11 items-center border-b-2 px-1 font-display text-[1.15rem] font-medium tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                      selected
                        ? "border-[var(--d-accent)] text-[var(--d-fg)]"
                        : "border-transparent text-[var(--d-body)] hover:text-[var(--d-fg)]"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div
              key={tab}
              role="tabpanel"
              id={`${uid}-card`}
              aria-labelledby={`${uid}-tab-${tab}`}
              tabIndex={0}
              className="demo-menu-fade pt-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)]"
            >
              <p className="font-display text-[1.15rem] italic leading-snug text-[var(--d-body)]">
                {r.menu.tabs[tab].blurb}
              </p>
              <ul className="mt-6 list-none p-0">
                {r.menu.tabs[tab].dishes.map((d) => (
                  <li key={d.name} className="border-b border-dotted border-[var(--d-line-strong)] py-4 last:border-b-0">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-[1.2rem] leading-snug font-medium tracking-tight @3xl:text-[1.35rem]">
                        {d.name}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="min-w-6 flex-1 -translate-y-[3px] border-b border-dotted border-[var(--d-line-strong)]"
                      />
                      <span className="font-display text-[1.2rem] font-medium text-[var(--d-accent-text)] @3xl:text-[1.35rem]">
                        {d.price}
                      </span>
                    </div>
                    <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-[var(--d-body)]">
                      {d.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mx-auto mt-10 max-w-xl text-center text-[13px] leading-relaxed text-[var(--d-body)]">
              {r.menu.note}
            </p>
          </div>
        </section>

        {/* 5 — Story: the cream band. One tall plate, one small one laid over its
           corner, ink mixed back from cream toward the page colour. */}
        <section
          id={anchor.id("story")}
          className={`demo-reveal bg-[var(--d-fg)] px-4 py-16 @5xl:px-8 @5xl:py-24`}
        >
          <div className="mx-auto grid max-w-6xl gap-12 @5xl:grid-cols-[1.1fr_1fr] @5xl:items-center @5xl:gap-20">
            <div>
              <span aria-hidden="true" className="block h-px w-16 bg-[var(--d-accent-2)]" />
              <p className={`mt-6 ${label} ${inkEmber}`}>{r.story.eyebrow}</p>
              <h2 className={`mt-4 font-display text-[1.9rem] leading-[1.1] font-medium tracking-tight @3xl:text-[2.5rem] ${ink}`}>
                {r.story.title}
              </h2>
              {r.story.paras.map((p) => (
                <p key={p} className={`mt-5 max-w-lg text-[15px] leading-[1.8] ${inkBody} @5xl:text-[17px]`}>
                  {p}
                </p>
              ))}
            </div>

            <figure className="relative m-0 pb-10 pr-10">
              <DemoImage
                src={r.story.tall.src}
                alt={r.story.tall.alt}
                sizes="(min-width: 64rem) 46vw, 100vw"
                className="aspect-[3/4] w-full @3xl:aspect-[4/5]"
              />
              <DemoImage
                src={r.story.small.src}
                alt={r.story.small.alt}
                sizes="(min-width: 64rem) 22vw, 55vw"
                className="absolute bottom-0 right-0 aspect-[900/650] w-[46%] ring-4 ring-[var(--d-fg)] @3xl:w-[42%]"
              />
              <figcaption className={`mt-4 max-w-sm text-[13px] leading-relaxed ${inkMuted}`}>
                {r.story.caption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 6 — Photographs: a masonry column set, every plate a button that opens
           the viewer below. */}
        <section
          id={anchor.id("gallery")}
          className="demo-reveal px-4 py-16 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-24"
        >
          <div className="flex flex-col gap-2 @3xl:flex-row @3xl:items-end @3xl:justify-between">
            <h2 className="font-display text-[1.9rem] leading-tight font-medium tracking-tight @3xl:text-[2.4rem]">
              <span className={`mr-3 ${label} align-middle text-[var(--d-accent-text)]`}>
                {r.gallery.eyebrow}
              </span>
              {r.gallery.title}
            </h2>
            <p className="max-w-xs text-[13px] leading-relaxed text-[var(--d-body)]">
              {r.gallery.lead}
            </p>
          </div>

          <div ref={grid} className="mt-10 columns-2 gap-3 @3xl:gap-5 [&>*]:mb-4 @3xl:[&>*]:mb-6">
            {items.map((it, i) => (
              <figure key={it.src} className="m-0 break-inside-avoid">
                <button
                  type="button"
                  data-plate={i}
                  aria-label={`View larger: ${it.caption}`}
                  onClick={() => setOpen(i)}
                  className="block w-full overflow-hidden rounded-[3px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                >
                  <DemoImage
                    src={it.src}
                    alt={it.alt}
                    sizes="(min-width: 48rem) 31vw, 48vw"
                    className={`${PLATE[i % PLATE.length].box} w-full`}
                  />
                </button>
                <figcaption className="mt-2 text-[12px] leading-relaxed text-[var(--d-muted)]">
                  {it.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {c.imageSource && (
            <p className="mt-10 max-w-2xl text-[12px] leading-relaxed text-[var(--d-muted)]">
              {c.imageSource}
            </p>
          )}
        </section>

        {/* 7 — The banquet room. */}
        <section
          id={anchor.id("events")}
          className="demo-reveal border-t border-[var(--d-line)] px-4 py-16 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-24"
        >
          <div className="@5xl:grid @5xl:grid-cols-[1fr_1.2fr] @5xl:items-center @5xl:gap-16">
            <figure className="m-0">
              <DemoImage
                src={r.events.src}
                alt={r.events.alt}
                sizes="(min-width: 64rem) 46vw, 100vw"
                className="aspect-[1300/850] w-full"
              />
            </figure>
            <div className="mt-8 @5xl:mt-0">
              <p className={`${label} text-[var(--d-accent-text)]`}>{r.events.eyebrow}</p>
              <h2 className="mt-3 font-display text-[1.8rem] leading-tight font-medium tracking-tight @3xl:text-[2.3rem]">
                {r.events.title}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-[var(--d-body)]">
                {r.events.body}
              </p>
              <ul className="mt-6 flex flex-col gap-2 p-0">
                {r.events.points.map((p) => (
                  <li key={p} className="flex items-baseline gap-3 text-[14px] text-[var(--d-body)]">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--d-accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 @3xl:flex-row @3xl:items-center">
                <a href={anchor.href("visit")} className={`${action} ${actionSolid}`}>
                  {r.events.cta}
                </a>
                {phoneHref ? (
                  <a href={phoneHref} className={`${action} ${actionLine}`}>
                    {r.booking.phone.display}
                  </a>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setCallNote((v) => !v)}
                      className={`${action} ${actionLine}`}
                    >
                      {r.booking.phone.display}
                    </button>
                    {callNote && (
                      <p role="status" className="text-[12px] leading-relaxed text-[var(--d-muted)]">
                        {DEMO_NOTE}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 8 — Reservations: the form, and everything a person checks before
           filling it in. */}
        <section
          id={anchor.id("visit")}
          className="demo-reveal border-t border-[var(--d-line)] px-4 py-16 @5xl:px-8 @5xl:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className={`${label} text-[var(--d-accent-text)]`}>{r.booking.eyebrow}</p>
              <h2 className="mt-3 font-display text-[2rem] leading-tight font-medium tracking-tight @3xl:text-[2.6rem]">
                {r.booking.title}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-[var(--d-body)]">
                {r.booking.body}
              </p>
            </div>

            <div className="mt-12 @5xl:grid @5xl:grid-cols-[1.25fr_1fr] @5xl:gap-14 @5xl:items-start">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="rounded-[4px] border border-[var(--d-line)] bg-[color-mix(in_srgb,var(--d-accent)_6%,var(--d-bg))] px-5 py-8 @3xl:px-8"
              >
                <div className="flex flex-col gap-5 @3xl:grid @3xl:grid-cols-2 @3xl:gap-6">
                  <Field id={`${uid}-date`} name="Date">
                    <input id={`${uid}-date`} name="date" type="date" required className={field} />
                  </Field>
                  <Field id={`${uid}-time`} name="Time">
                    <select id={`${uid}-time`} name="time" required defaultValue={r.booking.times[0]} className={field}>
                      {r.booking.times.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id={`${uid}-guests`} name="Guests" hint="Two to eight online. Anything larger goes through the phone.">
                    <input
                      id={`${uid}-guests`}
                      name="guests"
                      type="number"
                      min={2}
                      max={8}
                      defaultValue={2}
                      required
                      className={field}
                    />
                  </Field>
                  <Field id={`${uid}-name`} name="Name">
                    <input
                      id={`${uid}-name`}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={field}
                    />
                  </Field>
                  <div className="@3xl:col-span-2">
                    <Field id={`${uid}-email`} name="Email">
                      <input
                        id={`${uid}-email`}
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={field}
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between">
                  <button type="submit" className={`${action} ${actionSolid} w-full @3xl:w-auto`}>
                    {r.booking.submit}
                  </button>
                  <p className="text-[13px] leading-relaxed text-[var(--d-body)] @3xl:max-w-[16rem]">
                    {r.booking.note}
                  </p>
                </div>

                {sent && (
                  <p role="status" className="mt-6 text-[12px] leading-relaxed text-[var(--d-muted)]">
                    {c.formNote ?? DEMO_NOTE}
                  </p>
                )}
              </form>

              <div className="mt-12 @5xl:mt-0">
                <h3 className={`${label} text-[var(--d-muted)]`}>Hours</h3>
                <ul className="mt-3 list-none p-0">
                  {r.booking.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-baseline justify-between gap-4 border-b border-dotted border-[var(--d-line)] py-2.5 text-[14px]"
                    >
                      <span className="text-[var(--d-body)]">{h.day}</span>
                      <span className="text-[var(--d-fg)]">{h.time}</span>
                    </li>
                  ))}
                </ul>

                <h3 className={`mt-8 ${label} text-[var(--d-muted)]`}>Where</h3>
                <address className="mt-3 text-[14px] leading-relaxed not-italic text-[var(--d-body)]">
                  {r.booking.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  {phoneHref ? (
                    <a
                      href={phoneHref}
                      className="mt-2 inline-flex min-h-11 items-center text-[var(--d-fg)] underline decoration-[var(--d-accent)] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                    >
                      {r.booking.phone.display}
                    </a>
                  ) : (
                    <span className="mt-2 block text-[var(--d-fg)]">{r.booking.phone.display}</span>
                  )}
                </address>

                <div className="mt-10">
                  <h3 className={`mb-3 ${label} text-[var(--d-muted)]`}>{c.faqTitle}</h3>
                  <DemoFaq items={c.faqs ?? []} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9 — Footer: hours, address, and the social row as plain text, because a
           placeholder that looked like a link would be a dead end. */}
        <footer className="border-t border-[var(--d-line)] px-4 py-14 @5xl:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 @3xl:grid-cols-2 @5xl:grid-cols-4">
            <div>
              <span className={`${label} block font-display font-semibold`}>{c.navName}</span>
              <p className="mt-4 max-w-xs text-[12px] leading-relaxed text-[var(--d-muted)]">
                {DEMO_NOTE}
              </p>
            </div>
            <div>
              <h3 className={`${label} text-[var(--d-muted)]`}>Hours</h3>
              <ul className="mt-3 list-none p-0">
                {r.booking.hours.map((h) => (
                  <li key={h.day} className="text-[13px] leading-relaxed text-[var(--d-body)]">
                    {h.day} — {h.time}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={`${label} text-[var(--d-muted)]`}>Find us</h3>
              <address className="mt-3 text-[13px] leading-relaxed not-italic text-[var(--d-body)]">
                {r.booking.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="mt-1 block text-[var(--d-fg)]">{r.booking.phone.display}</span>
              </address>
            </div>
            <div>
              <h3 className={`${label} text-[var(--d-muted)]`}>Elsewhere</h3>
              <ul className="mt-3 flex flex-col gap-1.5 list-none p-0">
                {["Instagram", "The list", "Newsletter"].map((s) => (
                  <li key={s} className="text-[13px] text-[var(--d-body)]">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[12px] leading-relaxed text-[var(--d-muted)]">
                Names only — this concept has no accounts to visit.
              </p>
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-7xl font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--d-muted)]">
            Concept project · not a live client
          </p>
        </footer>
        <DemoStickyCta label="Reserve" href={anchor.href("visit")} />
      </div>

      {/* The viewer. It lives in the concept's own markup and is pinned to the top
          of whatever is scrolling, so it stays inside the device frame it belongs
          to instead of escaping to the browser window. */}
      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              dismiss();
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              step(1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              step(-1);
            }
          }}
          onClick={(e) => {
            /* Clicks on the dim area outside the plate close it; the plate itself
               never receives this branch because the event target is a child. */
            if (e.target === e.currentTarget) dismiss();
          }}
          className="absolute inset-0 z-40 bg-[color-mix(in_oklab,var(--d-bg)_96%,transparent)] px-4 py-6 @5xl:px-8"
        >
          <div className="sticky top-0 mx-auto flex max-w-5xl flex-col">
            <div className="flex items-center justify-between gap-4">
              <p className={`${label} text-[var(--d-muted)]`}>
                {open + 1} / {items.length}
              </p>
              <button
                ref={closeBtn}
                type="button"
                onClick={dismiss}
                className={`${action} ${actionLine} px-4`}
              >
                Close
              </button>
            </div>

            <DemoImage
              key={items[open].src}
              src={items[open].src}
              alt={items[open].alt}
              sizes="(min-width: 64rem) 60rem, 100vw"
              className={`${PLATE[open % PLATE.length].box} mx-auto mt-5 w-full ${PLATE[open % PLATE.length].wide}`}
            />

            <div className="mt-4 flex items-start justify-between gap-6 border-t border-[var(--d-line)] pt-4">
              <p className="text-[14px] leading-relaxed text-[var(--d-body)]">{items[open].caption}</p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photograph"
                  className={`${action} ${actionLine} px-3`}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photograph"
                  className={`${action} ${actionLine} px-3`}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DemoVars>
  );
}
