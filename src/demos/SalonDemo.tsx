"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { DemoProps } from "./_shared";
import {
  DEMO_NOTE,
  Btn,
  DemoBadge,
  DemoFooter,
  DemoHeading,
  DemoImage,
  DemoMobileMenu,
  DemoStickyCta,
  DemoVars,
  useDemoAnchors,
  type DemoNavItem,
} from "./_shared";

/* 05 — Maison Lune: a small hair & beauty studio, laid out like the room.

   The organising shape is the ARCH, because that is the shape of the mirrors in
   the photographs: arched gold looking-glasses down one wall and a round
   standing mirror in the alcove. It is used only where a plate is taller than it
   is wide, since a semicircle cap on a landscape photograph eats three quarters
   of the picture. Everywhere else the corners are merely soft.

   Deliberately none of the other three concepts. BlueLine is a bright one-page
   trade site with navy bands, a before/after slider and a hard call-first edge;
   Ember & Oak is a dark fire-lit menu; Rowanwood is a printed patient leaflet
   with a numbered board and a hairline index. This one
   is a light studio's own price card: a centred wordmark with the nav split
   either side of it, one continuous ruled list instead of a grid of service
   cards, a roster of stylists written as rows rather than portrait tiles, and a
   four-step booking whose summary is handed over like the stub of an
   appointment card.

   Every line of copy and every plate comes from `project.content.salon`. The
   service names, durations, from-prices, stylist first names, hours, street and
   telephone are invented for the fiction, and the page says so wherever it
   matters. No review, star rating, before/after, "since <year>", client count,
   award or certification appears anywhere: a studio this quiet has none of those
   to show, and inventing them is exactly what the honesty rule forbids. Staff
   are monogram plates, never stock portraits bolted onto invented people.

   It is a LIGHT theme, so DemoVars already derives white cards, a real shadow
   and the faintest legal grey for this palette — nothing here hard-codes colour. */

const navLeft: DemoNavItem[] = [
  ["Menu", "menu"],
  ["Book", "book"],
];
const navRight: DemoNavItem[] = [
  ["Studio", "team"],
  ["Gallery", "gallery"],
  ["Visit", "visit"],
];
/* The sheet and the desktop nav must never disagree, so the mobile list is the
   two desktop halves laid end to end. */
const navItems: DemoNavItem[] = [...navLeft, ...navRight];

const label = "font-sans text-[12px] uppercase tracking-[0.22em]";

/* Soft, thin pills for the studio — the shared Btn carries the pill shape, the
   minimum target and the focus ring; this only adds the letterspaced label. */
const pill = "font-sans uppercase tracking-[0.14em]";

/* The arch, and its lesser cousin. `arch` is for a plate that stands taller than
   it is wide; `soft` keeps a wide photograph readable. */
const arch = "rounded-t-full";
const soft = "rounded-[2rem]";

/* Which plate sits where in the desktop collage: four plates in two rows of a
   twelve-column grid, with the odd cells dropped a little so the four edges do
   not line up into a table. Read with a wrap, so adding or removing a plate in
   the data lays out instead of producing an undefined class.

   `px` is the width the plate is drawn at on the standalone route: 660px for a
   seven-column plate, 470px for a five-column one. Every stage of every `sizes`
   list in this file names a measured box in pixels rather than a `vw` share,
   because these columns stop growing with the window and `vw` is read against
   the viewport — which is a guess inside a device frame and wrong under
   emulation. A pixel box makes the requested candidate reproducible. */
const collage = [
  { at: "@5xl:col-span-7", px: 660 },
  { at: "@5xl:col-span-5 @5xl:mt-10", px: 470 },
  { at: "@5xl:col-span-5 @5xl:mt-4", px: 470 },
  { at: "@5xl:col-span-7", px: 660 },
];

/* Whether a plate's own ratio stands taller than it is wide, measured from the
   string the data carries rather than from which index it happens to sit at. */
const isTall = (ratio: string) => {
  const [w, h] = ratio.split("/").map(Number);
  return w < h;
};

export default function SalonDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const c = project.content;
  const s = c?.salon;

  /* null means "every family", which is also what the count line has to say. */
  const [family, setFamily] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [stylist, setStylist] = useState<string | null>(null);
  const [slot, setSlot] = useState<{ day: string; time: string } | null>(null);
  const [sent, setSent] = useState(false);
  const receipt = useRef<HTMLDivElement>(null);

  /* Focus follows the request, the way it would after a real page changed. The
     effect reads and focuses a ref only — it never sets state, which the lint
     rules forbid here. */
  useEffect(() => {
    if (sent) receipt.current?.focus();
  }, [sent]);

  if (!c || !s) return null;

  /* One continuous list, filtered — not a panel of cards behind a tab. A visitor
     scanning prices wants the whole card at once; the chips are there for the
     one who knows which chair they need. */
  const shown = family
    ? s.menu.families.filter((f) => f.label === family)
    : s.menu.families;
  const count = shown.reduce((n, f) => n + f.items.length, 0);

  /* Step 1 is a flat list of every treatment, each tagged with the family it came
     from, so a twelve-row card still says which chair it belongs to. Read off the
     family rather than copied into the item, so the two cannot disagree. */
  const services = s.menu.families.flatMap((t) =>
    t.items.map((it) => ({ ...it, family: t.label }))
  );

  /* Each step is complete only once its choice exists, so Continue can't advance
     to an empty summary. The review step has no choice of its own. */
  const complete = [Boolean(service), Boolean(stylist), Boolean(slot), true];
  const isLast = step === s.booking.steps.length - 1;

  const summary: [string, string][] = [
    ["Service", service ?? ""],
    ["Stylist", stylist ?? ""],
    ["When", slot ? `${slot.day} · ${slot.time}` : ""],
  ];

  return (
    <DemoVars project={project}>
      {/* 1 — The book is open. One line, above the header rather than inside it,
         so the wordmark keeps its own air. It scrolls away on its own. */}
      <p
        className={`${label} bg-[var(--d-soft)] px-4 py-2.5 text-center text-[var(--d-accent-text)] @5xl:px-8`}
      >
        {s.announcement}
      </p>

      {/* 2 — Header: the wordmark centred with the concept's nav split either
         side of it on a tablet/desktop frame, a Book pill and a hamburger sheet
         below that. `sticky` is what the sheet positions itself against. Solid
         cream is its resting state; the scroll-driven solidify only firms the
         edge once the hero has moved. */}
      <header className="demo-header-lune sticky top-0 z-30 border-b border-[var(--d-line)] bg-[color-mix(in_oklab,var(--d-bg)_96%,transparent)] backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 @5xl:px-8">
          <div className="flex items-center justify-between gap-4 @5xl:grid @5xl:grid-cols-[1fr_auto_1fr] @5xl:items-center">
            <nav
              aria-label="Maison Lune sections"
              className="hidden @5xl:flex @5xl:justify-self-start"
            >
              {navLeft.map(([text, id]) => (
                <a
                  key={id}
                  href={anchor.href(id)}
                  className={`${label} inline-flex min-h-11 items-center px-1 text-[var(--d-body)] transition-colors hover:text-[var(--d-fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)]`}
                >
                  {text}
                </a>
              ))}
            </nav>

            <a
              href={anchor.href("top")}
              className={`${label} inline-flex min-h-11 items-center font-display text-[1.1rem] tracking-[0.32em] text-[var(--d-fg)] @5xl:justify-self-center`}
            >
              {c.navName}
            </a>

            <div className="flex items-center justify-end gap-3 @5xl:justify-self-end @5xl:gap-6">
              <nav aria-label="Maison Lune sections" className="hidden @5xl:flex">
                {navRight.map(([text, id]) => (
                  <a
                    key={id}
                    href={anchor.href(id)}
                    className={`${label} inline-flex min-h-11 items-center px-1 text-[var(--d-body)] transition-colors hover:text-[var(--d-fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)]`}
                  >
                    {text}
                  </a>
                ))}
              </nav>
              <span className="hidden @3xl:inline-flex">
                <Btn href={anchor.href("book")} className={pill}>
                  Book Now
                </Btn>
              </span>
              <DemoMobileMenu anchor={anchor} items={navItems} action={["Book Now", "book"]} />
            </div>
          </div>
        </div>
      </header>

      {/* 3 — Hero: an oversized light-serif statement beside a single tall arch.
         At desktop a second, shorter arch rides over the first's lower corner —
         the only overlap in the composition, and the only one the column has
         room for: the inset is pulled inward with a negative margin, so it can
         never cross the frame's padding. Below desktop it is simply not there,
         because two arches in a 340px column are two thumbnails.
         The copy never sits on a photograph, so its contrast is proved against
         the page colour, not guessed at unknowable pixels. */}
      <section
        id={anchor.id("top")}
        className="demo-reveal px-4 pt-10 pb-16 @3xl:grid @3xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] @3xl:items-center @3xl:gap-10 @5xl:mx-auto @5xl:max-w-7xl @5xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_auto] @5xl:gap-14 @5xl:px-8 @5xl:py-20"
      >
        <div className="order-2 @3xl:order-1">
          <DemoBadge />
          <p className={`${label} mt-6 text-[var(--d-accent-text)]`}>{s.hero.eyebrow}</p>
          <DemoHeading
            preview={preview}
            className="mt-3 font-display text-[2.9rem] leading-[1.03] font-normal tracking-[-0.015em] text-[var(--d-fg)] @3xl:text-[3.3rem] @5xl:text-[4.2rem]"
          >
            {s.hero.headline}{" "}
            <span className="italic text-[var(--d-accent-text)]">{s.hero.accent}</span>
          </DemoHeading>
          <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.8] text-[var(--d-body)] @3xl:text-[16px]">
            {s.hero.sub}
          </p>
          <p className={`mt-6 inline-flex items-center gap-2 ${label} text-[var(--d-muted)]`}>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" />
            {s.hero.note}
          </p>
          <div className="mt-8 flex flex-col gap-3 @3xl:flex-row @3xl:items-center">
            <Btn href={anchor.href("book")} className={pill}>
              {s.hero.ctaPrimary}
            </Btn>
            <Btn href={anchor.href("menu")} variant="ghost" className={pill}>
              {s.hero.ctaSecondary}
            </Btn>
          </div>
        </div>

        <figure className="order-1 m-0 @3xl:order-2">
          {/* Two arches side by side at desktop: the tall plate and a shorter one
              overlapping its edge. The column split is 1.4fr/1fr of a figure that
              never exceeds ~525px on the standalone route, which is why `sizes`
              below names 310px and 220px — the widths these plates are actually
              drawn at, not the width of the figure that holds them. */}
          <div className="@5xl:grid @5xl:grid-cols-[1.4fr_1fr] @5xl:items-end">
            <DemoImage
              src={s.hero.src}
              alt={s.hero.alt}
              sizes="(min-width: 64rem) 310px, (min-width: 48rem) 360px, 348px"
              preload={!preview}
              imgClassName="demo-lune-parallax"
              className={`${arch} aspect-[2/3] w-full`}
            />
            <DemoImage
              src={s.hero.inset.src}
              alt={s.hero.inset.alt}
              sizes="(min-width: 64rem) 220px, 0px"
              className={`hidden @5xl:-ml-8 @5xl:mb-6 @5xl:block ${arch} aspect-[2/3] w-full ring-[10px] ring-[var(--d-bg)]`}
            />
          </div>
        </figure>

        {/* The trade spelled down the window, the way a studio does in glass. It
             is a third column only where the grid has one, and it is ordered
             last: an un-ordered grid item sorts ahead of the two that name their
             order, so without this the spine lands in the first track and the
             photograph is pushed into the auto-sized third, where a plate built
             on percentages and `fr` collapses to nothing. */}
        <p
          aria-hidden="true"
          className={`hidden @5xl:block @5xl:order-3 [writing-mode:vertical-rl] ${label} self-stretch text-[var(--d-muted)]`}
        >
          {s.hero.spine}
        </p>
      </section>

      {/* 4 — The studio's one large statement, set beside its three house rules
         on the sand surface, and the new-client note closed underneath them.
         Two columns of type, no cards: this is the section the room is sold on,
         and it reads as a page rather than as a feature grid. */}
      <section className="demo-reveal bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 @3xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] @3xl:gap-16">
          <blockquote className="m-0">
            <p className={`${label} text-[var(--d-accent-text)]`}>{s.statementSign}</p>
            <p className="mt-5 font-display text-[1.55rem] leading-[1.45] font-normal tracking-[-0.005em] text-[var(--d-fg)] text-balance @3xl:text-[1.95rem]">
              {s.statement}
            </p>
          </blockquote>

          <div>
            <h2 className={`${label} font-normal text-[var(--d-muted)]`}>
              {s.studio.eyebrow} — {s.studio.title}
            </h2>
            <ul className="mt-4 list-none border-y border-[var(--d-line)] p-0">
              {s.studio.points.map((p) => (
                <li key={p.title} className="border-b border-[var(--d-line)] py-4 last:border-b-0">
                  <h3 className="font-display text-[1.2rem] leading-snug font-normal tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--d-body)]">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The first-visit note closes the block instead of standing in its own
             boxed band with its own button — one less panel, one less call to
             action, and the booking above it still does the work. */}
        <div className="mx-auto mt-12 max-w-6xl border-t border-[var(--d-line-strong)] pt-6 @3xl:flex @3xl:items-baseline @3xl:justify-between @3xl:gap-12">
          <h3 className="font-display text-[1.3rem] leading-snug font-normal tracking-tight">
            {s.offer.title}
          </h3>
          <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-[var(--d-body)] @3xl:mt-0 @3xl:text-right">
            {s.offer.body}
          </p>
        </div>
      </section>

      {/* 5 — The price card. One continuous ruled list of every treatment,
         grouped by family with a hairline between rows, exactly as it would be
         printed and propped at the chair. The chips narrow that same list; they
         never hide a second panel behind them. The count is read off the list,
         so it cannot go stale when a treatment is added. */}
      <section
        id={anchor.id("menu")}
        className="demo-reveal px-4 py-16 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-24"
      >
        <div className="@5xl:grid @5xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @5xl:items-end @5xl:gap-14">
          <div>
            <p className={`${label} text-[var(--d-accent-text)]`}>{s.menu.eyebrow}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.08] font-normal tracking-[-0.01em] @3xl:text-[2.5rem]">
              {s.menu.title}
            </h2>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[var(--d-body)] @3xl:text-[15px]">
              {s.menu.lead}
            </p>
          </div>

          <figure className="mt-10 m-0 @5xl:mt-0">
            <div style={{ aspectRatio: s.menu.plate.ratio }}>
              <DemoImage
                src={s.menu.plate.src}
                alt={s.menu.plate.alt}
                sizes="(min-width: 64rem) 516px, (min-width: 48rem) 778px, 348px"
                className={`${soft} h-full w-full`}
              />
            </div>
            <figcaption className={`mt-3 ${label} text-[var(--d-muted)]`}>
              {s.menu.plate.caption}
            </figcaption>
          </figure>
        </div>

        <div
          role="group"
          aria-label="Narrow the menu by treatment family"
          className="mt-12 flex flex-wrap gap-2 @3xl:gap-3"
        >
          {[null, ...s.menu.families.map((f) => f.label)].map((chip) => {
            const selected = family === chip;
            return (
              <button
                key={chip ?? s.menu.all}
                type="button"
                aria-pressed={selected}
                onClick={() => setFamily(chip)}
                className={`${pill} inline-flex min-h-11 items-center rounded-full border px-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                  selected
                    ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]"
                    : "border-[var(--d-line-strong)] text-[var(--d-body)] hover:bg-[var(--d-hover)]"
                }`}
              >
                {chip ?? s.menu.all}
              </button>
            );
          })}
        </div>
        <p role="status" className={`mt-4 ${label} text-[var(--d-muted)]`}>
          {count} {s.menu.countNoun}
        </p>

        <div className="mt-6">
          {shown.map((fam) => (
            <div key={fam.label}>
              <h3 className={`${label} pt-10 text-[var(--d-accent-text)]`}>{fam.label}</h3>
              <ul className="mt-2 list-none p-0">
                {fam.items.map((it) => (
                  <li
                    key={it.name}
                    className="flex items-start gap-6 border-b border-dotted border-[var(--d-line-strong)] py-4"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="block font-display text-[1.15rem] leading-snug tracking-tight">
                        {it.name}
                      </span>
                      <span className="mt-1 block text-[13.5px] leading-relaxed text-[var(--d-body)]">
                        {it.desc}
                      </span>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="block font-display text-[1.05rem] text-[var(--d-accent-text)]">
                        {it.price}
                      </span>
                      <span className={`mt-1 block ${label} text-[var(--d-muted)]`}>
                        {it.duration}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* What a printed card leaves unsaid and a website has to say. */}
        <div className="mt-10 grid gap-4 border-t border-[var(--d-line)] pt-6 @3xl:grid-cols-2 @3xl:gap-10">
          {s.menu.footnotes.map((n) => (
            <p key={n} className="text-[12.5px] leading-relaxed text-[var(--d-muted)]">
              {n}
            </p>
          ))}
        </div>
      </section>

      {/* 6 — The roster. Three stylists as rows, each with a monogram in a small
         arch, the services they actually take lifted verbatim off the price card
         above, and an action that carries the name down into the booking stub —
         so the choice made here is visible there before anything is confirmed.
         No face photographs: a monogram plate cannot put a real person behind an
         invented name. */}
      <section
        id={anchor.id("team")}
        className="demo-reveal border-t border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-24"
      >
        <p className={`${label} text-[var(--d-accent-text)]`}>{s.team.eyebrow}</p>
        <h2 className="mt-3 max-w-3xl font-display text-[2rem] leading-[1.08] font-normal tracking-[-0.01em] @3xl:text-[2.5rem]">
          {s.team.title}
        </h2>
        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[var(--d-body)] @3xl:text-[15px]">
          {s.team.intro}
        </p>

        <ul className="mt-10 list-none border-y border-[var(--d-line-strong)] p-0">
          {s.team.members.map((m) => (
            <li
              key={m.name}
              className="grid gap-x-6 gap-y-3 border-b border-[var(--d-line)] py-6 last:border-b-0 @3xl:grid-cols-[4rem_minmax(0,1fr)_auto] @3xl:items-center"
            >
              <span
                aria-hidden="true"
                className={`${arch} grid h-[5.5rem] w-16 place-items-center bg-[var(--d-bg)] font-display text-[1.7rem] leading-none text-[var(--d-accent-text)] ring-1 ring-[var(--d-line-strong)]`}
              >
                {m.initials}
              </span>

              <div className="@3xl:col-start-2">
                <h3 className="font-display text-[1.35rem] leading-snug font-normal tracking-tight">
                  {m.name}
                </h3>
                <p className={`mt-1 ${label} text-[var(--d-muted)]`}>{m.role}</p>
                <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-[var(--d-body)]">
                  {m.focus}
                </p>
                <p className="mt-2 max-w-lg text-[12.5px] leading-relaxed text-[var(--d-muted)]">
                  {s.team.takes}: {m.sees.join(", ")}.
                </p>
              </div>

              <a
                href={anchor.href("book")}
                onClick={() => setStylist(m.name)}
                aria-label={`${s.team.bookWith} ${m.name} — ${s.booking.ui.bookWithAria}`}
                className={`${label} inline-flex min-h-11 items-center justify-start gap-2 text-[var(--d-accent-text)] underline decoration-[var(--d-accent)] decoration-1 underline-offset-4 @3xl:justify-end focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)]`}
              >
                {s.team.bookWith} {m.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* 7 — The booking flow: the concept's centrepiece, and the only part of
         the page with a state of its own. Four steps, choices held in state, and
         a stub that rewrites itself as they are made. Nothing submits to a
         server: the review step answers honestly, and the receipt that replaces
         it reads back what was asked for and says in the same breath that no
         chair is held. */}
      <section
        id={anchor.id("book")}
        className="demo-reveal px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className={`${label} text-[var(--d-accent-text)]`}>{s.booking.eyebrow}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.08] font-normal tracking-[-0.01em] @3xl:text-[2.5rem]">
              {s.booking.title}
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--d-body)] @3xl:text-[15px]">
              {s.booking.body}
            </p>
          </div>

          {/* The rail: four steps on a hairline that runs between them, so the
              line itself is the progress, not four circles fighting for
              attention. It stacks without the rule below the tablet frame. */}
          <ol className="mt-10 flex list-none flex-col gap-3 p-0 @3xl:flex-row @3xl:items-center @3xl:gap-0">
            {s.booking.steps.map((name, i) => (
              <li
                key={name}
                aria-current={i === step ? "step" : undefined}
                className="flex items-center gap-3 @3xl:flex-1"
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[12px] tracking-normal ${
                    i < step
                      ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]"
                      : i === step
                        ? "border-[var(--d-accent)] text-[var(--d-accent-text)]"
                        : "border-[var(--d-line-strong)] text-[var(--d-muted)]"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </span>
                <span
                  className={`${label} whitespace-nowrap ${
                    i === step ? "text-[var(--d-accent-text)]" : "text-[var(--d-muted)]"
                  }`}
                >
                  {name}
                </span>
                {i < s.booking.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-4 hidden h-px flex-1 bg-[var(--d-line-strong)] @3xl:block"
                  />
                )}
              </li>
            ))}
          </ol>

          <p role="status" className="sr-only">
            Step {step + 1} of {s.booking.steps.length}: {s.booking.steps[step]}
          </p>

          <div className="mt-8 @3xl:grid @3xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] @3xl:items-start @3xl:gap-10">
            {/* The stub first in the reading order, so on a phone the summary is
                above the choice that changes it rather than below the button
                that confirms it. */}
            <aside
              aria-live="polite"
              aria-label={s.booking.ui.summary}
              className={`order-1 border border-[var(--d-line-strong)] bg-[var(--d-bg)] p-5 @3xl:order-2 ${soft} @5xl:sticky @5xl:top-24`}
            >
              <h3 className={`${label} text-[var(--d-accent-text)]`}>{s.booking.ui.summary}</h3>
              <dl className="mt-4 grid gap-1.5">
                {summary.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-3 border-b border-dotted border-[var(--d-line-strong)] py-2 last:border-b-0"
                  >
                    <dt className="text-[13px] text-[var(--d-muted)]">{k}</dt>
                    <dd className="text-right text-[14px] text-[var(--d-fg)]">
                      {v || s.booking.ui.unchosen}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>

            {/* The live step panel, keyed so it rises into place on each change. */}
            <div
              key={`${step}-${sent}`}
              aria-live="polite"
              className={`order-2 @3xl:order-1 ${sent ? "" : "demo-lune-step"}`}
            >
              {sent ? (
                <div
                  ref={receipt}
                  tabIndex={-1}
                  className={`${soft} border border-[var(--d-line-strong)] bg-[var(--d-card)] p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]`}
                >
                  <h3 className="font-display text-[1.5rem] leading-snug font-normal tracking-tight">
                    {s.booking.confirm.title}
                  </h3>
                  <dl className="mt-5 grid gap-x-6 gap-y-3 @3xl:grid-cols-[auto_1fr]">
                    {summary.map(([k, v]) => (
                      <div key={k} className="contents">
                        <dt className={`text-[12px] uppercase tracking-[0.12em] text-[var(--d-muted)]`}>
                          {k}
                        </dt>
                        <dd className="text-[15px] text-[var(--d-fg)]">{v || s.booking.ui.unchosen}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 text-[13.5px] leading-relaxed text-[var(--d-body)]">
                    {s.booking.confirm.lead}
                  </p>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--d-muted)]">
                    {c.formNote ?? DEMO_NOTE}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className={`${pill} mt-6 inline-flex min-h-11 items-center rounded-full border border-[var(--d-line-strong)] px-5 text-[var(--d-body)] transition-colors hover:bg-[var(--d-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]`}
                  >
                    {s.booking.confirm.edit}
                  </button>
                </div>
              ) : (
                <>
                  {step === 0 && (
                    <fieldset className="border-0 p-0">
                      <legend className={`${label} text-[var(--d-muted)]`}>
                        {s.booking.ui.legends.service}
                      </legend>
                      <div className="mt-4 grid gap-2 @3xl:grid-cols-2">
                        {services.map((it) => (
                          <label
                            key={it.name}
                            className={`flex cursor-pointer items-baseline gap-3 rounded-[1.25rem] border p-4 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--d-accent)] ${
                              service === it.name
                                ? "border-[var(--d-accent)] bg-[var(--d-card)]"
                                : "border-[var(--d-line)] hover:bg-[var(--d-hover)]"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`${uid}-service`}
                              value={it.name}
                              checked={service === it.name}
                              onChange={() => setService(it.name)}
                              className="mt-1 shrink-0 accent-[var(--d-accent)]"
                            />
                            <span className="flex-1">
                              <span className="block font-display text-[1.05rem]">{it.name}</span>
                              <span className={`block ${label} text-[var(--d-muted)]`}>
                                {it.family} · {it.duration} · {it.price}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {step === 1 && (
                    <fieldset className="border-0 p-0">
                      <legend className={`${label} text-[var(--d-muted)]`}>
                        {s.booking.ui.legends.stylist}
                      </legend>
                      <div className="mt-4 grid gap-3 @3xl:grid-cols-3">
                        {s.team.members.map((m) => (
                          <label
                            key={m.name}
                            className={`flex cursor-pointer flex-col items-start gap-2 rounded-[1.25rem] border p-4 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--d-accent)] ${
                              stylist === m.name
                                ? "border-[var(--d-accent)] bg-[var(--d-card)]"
                                : "border-[var(--d-line)] hover:bg-[var(--d-hover)]"
                            }`}
                          >
                            <span className="flex w-full items-center gap-3">
                              <input
                                type="radio"
                                name={`${uid}-stylist`}
                                value={m.name}
                                checked={stylist === m.name}
                                onChange={() => setStylist(m.name)}
                                className="accent-[var(--d-accent)]"
                              />
                              <span
                                aria-hidden="true"
                                className="grid h-9 w-9 place-items-center rounded-full bg-[var(--d-accent)]/15 font-display text-[15px] text-[var(--d-accent-text)]"
                              >
                                {m.initials}
                              </span>
                              <span className="font-display text-[1.1rem]">{m.name}</span>
                            </span>
                            <span className="text-[13px] leading-relaxed text-[var(--d-body)]">
                              {m.role}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {step === 2 && (
                    <fieldset className="border-0 p-0">
                      <legend className={`${label} text-[var(--d-muted)]`}>
                        {s.booking.ui.legends.time}
                      </legend>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.booking.days.map((d) => (
                          <button
                            key={d}
                            type="button"
                            aria-pressed={slot?.day === d}
                            onClick={() => setSlot({ day: d, time: s.booking.times[0] })}
                            className={`${pill} inline-flex min-h-11 items-center rounded-full border px-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                              slot?.day === d
                                ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]"
                                : "border-[var(--d-line-strong)] text-[var(--d-body)] hover:bg-[var(--d-hover)]"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      {slot && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {s.booking.times.map((t) => (
                            <button
                              key={t}
                              type="button"
                              aria-pressed={slot.time === t}
                              onClick={() => setSlot({ day: slot.day, time: t })}
                              className="inline-flex min-h-11 items-center rounded-[1rem] border px-4 font-sans text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      )}
                      <p className="mt-4 text-[12.5px] leading-relaxed text-[var(--d-muted)]">
                        {s.booking.ui.slotsNote}
                      </p>
                    </fieldset>
                  )}

                  {step === 3 && (
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                      <button
                        type="button"
                        onClick={() => setSent(true)}
                        className={`${pill} inline-flex min-h-11 items-center rounded-full bg-[var(--d-accent)] px-5 font-sans text-[12px] font-semibold text-[var(--d-on-accent)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]`}
                      >
                        {s.booking.submit}
                      </button>
                      <p className="max-w-xs text-[12.5px] leading-relaxed text-[var(--d-muted)]">
                        {s.booking.note}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Step controls sit under both columns, not inside either, so they
              never move when the panel's height changes. Back disappears at the
              first step rather than sitting there dead, and Continue only
              advances once the current step has a choice — with a visible hint
              saying why it will not. */}
          {!sent && (
            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 0 ? (
                <Btn
                  variant="ghost"
                  className={pill}
                  onClick={() => setStep((n) => Math.max(0, n - 1))}
                >
                  {s.booking.ui.back}
                </Btn>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-3">
                {!isLast && !complete[step] && (
                  <span className={`${label} text-[var(--d-muted)]`}>
                    {s.booking.ui.needChoice}
                  </span>
                )}
                {!isLast && (
                  <Btn className={pill} onClick={() => complete[step] && setStep((n) => n + 1)}>
                    {s.booking.ui.next}
                  </Btn>
                )}
              </div>
            </div>
          )}

          {/* The two questions a studio is asked before anyone books. */}
          <dl className="mt-12 grid gap-6 border-t border-[var(--d-line)] pt-8 @3xl:grid-cols-2 @3xl:gap-12">
            {s.booking.terms.map((t) => (
              <div key={t.label}>
                <dt className={`${label} text-[var(--d-accent-text)]`}>{t.label}</dt>
                <dd className="mt-2 text-[13.5px] leading-relaxed text-[var(--d-body)]">
                  {t.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 8 — The collage. Each plate keeps its own measured ratio, so nothing is
         cropped and the space is reserved before the file arrives; the tall ones
         are arched because that is the shape of the mirrors in them, and the wide
         ones are only softened, because a semicircle cap on a landscape frame
         would eat the picture. Rows are twelve columns with deliberately unequal
         spans and a few dropped cells, so the edges do not line up into a table.
         Hover lifts a plate; a phone has no hover, so it never sees one stuck up. */}
      <section
        id={anchor.id("gallery")}
        className="demo-reveal border-t border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 @3xl:flex-row @3xl:items-end @3xl:justify-between @3xl:gap-10">
            <h2 className="font-display text-[1.9rem] leading-[1.08] font-normal tracking-[-0.01em] @3xl:text-[2.3rem]">
              <span className={`mr-3 ${label} align-middle text-[var(--d-accent-text)]`}>
                {s.gallery.eyebrow}
              </span>
              {s.gallery.title}
            </h2>
            <p className="max-w-sm text-[13px] leading-relaxed text-[var(--d-body)]">
              {s.gallery.lead}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-start gap-6 @3xl:grid-cols-2 @5xl:grid-cols-12 @5xl:gap-x-6 @5xl:gap-y-2">
            {s.gallery.items.map((it, i) => {
              const tall = isTall(it.ratio);
              return (
                <figure
                  key={it.src}
                  className={`demo-lune-lift m-0 ${collage[i % collage.length].at}`}
                >
                  <div
                    className={`${tall ? arch : soft} overflow-hidden`}
                    style={{ aspectRatio: it.ratio }}
                  >
                    <DemoImage
                      src={it.src}
                      alt={it.alt}
                      sizes={`(min-width: 64rem) ${collage[i % collage.length].px}px, (min-width: 48rem) 377px, 348px`}
                      className="h-full w-full rounded-none"
                    />
                  </div>
                  <figcaption className={`mt-3 ${label} text-[var(--d-muted)]`}>
                    {it.caption}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* The credit line belongs at the foot of the photographs, which is the
              one place on the page that lists every file. */}
          {c.imageSource && (
            <p className="mt-10 max-w-2xl text-[12px] leading-relaxed text-[var(--d-muted)]">
              {c.imageSource}
            </p>
          )}
        </div>
      </section>

      {/* 9 — Visit: an address, the week drawn as a strip, the telephone, and the
         directions a first visitor actually needs. The map panel that used to sit
         here could only ever be a grid of lines pretending to be a place, so it is
         gone and the sentence that replaces it is true. The number is only a live
         `tel:` link on the standalone route, never inside a device frame. */}
      <section
        id={anchor.id("visit")}
        className="demo-reveal px-4 py-16 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto grid gap-12 @5xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] @5xl:gap-16">
          <div>
            <p className={`${label} text-[var(--d-accent-text)]`}>{s.visit.eyebrow}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.08] font-normal tracking-[-0.01em] @3xl:text-[2.5rem]">
              {s.visit.title}
            </h2>
            <address className="mt-6 text-[15px] leading-relaxed not-italic text-[var(--d-body)]">
              {s.visit.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={preview ? anchor.href("book") : s.visit.phone.href}
              className="mt-4 inline-flex min-h-11 items-center font-display text-[1.3rem] text-[var(--d-fg)] underline decoration-[var(--d-accent)] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
            >
              {s.visit.phone.display}
            </a>
            <p className="mt-6 max-w-md text-[13.5px] leading-relaxed text-[var(--d-body)]">
              {s.visit.arriving}
            </p>
          </div>

          <ul className="grid list-none grid-cols-1 border-y border-[var(--d-line-strong)] p-0 @3xl:grid-cols-7 @3xl:divide-x @3xl:divide-[var(--d-line)]">
            {s.visit.hours.map((h) => (
              <li
                key={h.day}
                className="border-b border-[var(--d-line)] py-4 last:border-b-0 @3xl:border-b-0 @3xl:px-3 @3xl:text-center"
              >
                <span className={`block ${label} text-[var(--d-muted)]`}>{h.day}</span>
                <span className="mt-2 block font-display text-[13.5px] leading-snug text-[var(--d-fg)]">
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DemoFooter name={c.navName} />
      <DemoStickyCta label="Book" href={anchor.href("book")} />
    </DemoVars>
  );
}
