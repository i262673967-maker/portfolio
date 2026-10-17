"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { DemoProps } from "./_shared";
import {
  DEMO_NOTE,
  DemoBackLink,
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

/* 04 — Ember & Oak: a twenty-two-cover, fire-only restaurant, laid out in the
   order a deciding diner actually asks things.

   The service board comes before the photograph, because "when is it open and
   how does it seat" is the question that decides whether the mood is even
   relevant. The card is the second section, the room the third, and the
   booking form asks what a reservation book records — then answers honestly,
   because nothing on this page can hold a table.

   Deliberately not the other concepts: Cormorant over DM Sans, square-cornered
   actions, hairlines instead of cards, and type that never sits on a
   photograph. All copy and every plate comes from project.content; the dishes,
   prices, street and telephone are invented for the fiction and the page says
   so wherever it matters.

   Two things are set here rather than in the palette, because they are this
   layout's own surfaces:
   · the cream band's inks (measured on #F3EBDD, not on the page colour), and
   · the board strip's ink, which is the page colour deepened so the first row
     of the page reads as a printed board rather than as the site's own chrome. */

const navItems: DemoNavItem[] = [
  ["The Card", "menu"],
  ["The Room", "story"],
  ["Photographs", "gallery"],
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

const label = "font-sans text-[12px] uppercase tracking-[0.26em]";

/* Fields on the dark page. Labels are always visible, and the native pickers get
   this palette's colour scheme so their calendar and clock pop-ups are not white
   boxes on a near-black room. */
const field =
  "w-full rounded-[3px] border border-[var(--d-line-strong)] bg-[var(--d-field)] px-3.5 py-3 text-[15px] text-[var(--d-fg)] [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";

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

/* What the reservation form collects, and therefore what the confirmation can
   read back. Held in one object so the read-out cannot disagree with the inputs. */
type Booking = {
  date: string;
  time: string;
  party: number;
  name: string;
  email: string;
  occasion: string;
  notes: string;
};

/* A date the browser will accept as today, computed after mount so the
   server-rendered markup and the first client render cannot disagree. */
function todayISO() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/* Read the submitted date back the way a reservation book writes it. Split from
   the ISO string rather than parsed through Date, so a browser in another
   timezone cannot move the evening by a day. */
function spokenDate(iso: string) {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d) return iso;
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${names[day]} ${d} ${months[m - 1]} ${y}`;
}

export default function RestaurantDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const c = project.content;
  const r = c?.restaurant;

  const [course, setCourse] = useState(0);
  const [sent, setSent] = useState<Booking | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  /* A `tel:` link inside a device frame would pull the visitor off the portfolio
     page they were looking at, so the number stops being a link there. */
  const [callNote, setCallNote] = useState(false);

  const grid = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const done = useRef<HTMLHeadingElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);
  /* Set by the "Change it" button, read by the commit below it. A ref rather
     than state because it must not re-render anything, and the focus it asks for
     belongs to a form that only exists on the next commit. */
  const editing = useRef(false);
  /* Which plate opened the viewer, and whether the viewer is mid-session. */
  const cameFrom = useRef<number | null>(null);
  const shown = useRef(false);

  /* The form's own values, so the confirmation can repeat them and the banquet
     enquiry can write into the note field before the visitor arrives there. */
  const [form, setForm] = useState<Booking>({
    date: "",
    time: "",
    party: 2,
    name: "",
    email: "",
    occasion: "No occasion",
    notes: "",
  });

  /* Respect the visitor's motion preference at the moment the page moves them,
     rather than at build time. */
  const scrollBehavior = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

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

  /* The two places this page answers a press by bringing an element into being:
     a submitted form mounting its read-out, and "Change it" re-mounting the
     fields. Neither can be focused from the handler that caused it, so both are
     done on the commit that made them exist — and the effect only ever reads and
     clears a ref, never state, so it cannot loop. */
  useEffect(() => {
    if (sent) {
      const el = done.current;
      if (!el) return;
      el.focus({ preventScroll: true });
      el.scrollIntoView({ block: "start", behavior: scrollBehavior() });
      return;
    }
    if (!editing.current) return;
    editing.current = false;
    dateInput.current?.focus({ preventScroll: true });
  }, [sent]);

  const dismiss = () => setOpen(null);

  const step = (delta: number) => {
    if (open === null || !r) return;
    const n = r.gallery.items.length;
    setOpen((open + delta + n) % n);
  };

  const set = <K extends keyof Booking>(key: K, value: Booking[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    /* A change to the request means the read-out no longer describes it. */
    if (sent) setSent(null);
  };

  if (!c || !r) return null;

  const bookLabel = (c.ctaPrimary ?? "").replace(" →", "");
  const phoneHref = preview ? undefined : r.booking.phone.href;
  const items = r.gallery.items;
  const courses = r.menu.courses;
  const active = courses[Math.min(course, courses.length - 1)];

  /* One tablist, roving tabindex, arrows and Home/End — the panel is a single
     element labelled by the tab that is selected. */
  const onTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = courses.length - 1;
    const next =
      e.key === "ArrowRight" ? Math.min(last, course + 1)
      : e.key === "ArrowLeft" ? Math.max(0, course - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setCourse(next);
    tabs.current[next]?.focus();
  };

  /* The read-out rows only print what was actually given, so the confirmation
     cannot invent a name or a note the visitor never typed. */
  const receipt: { term: string; detail: string }[] = sent
    ? [
        { term: "Date", detail: spokenDate(sent.date) },
        { term: "Time", detail: sent.time },
        { term: "Party", detail: `${sent.party} ${sent.party === 1 ? "guest" : "guests"}` },
        { term: "Name", detail: sent.name },
        { term: "Email", detail: sent.email },
        { term: "Occasion", detail: sent.occasion },
        ...(sent.notes.trim() ? [{ term: "Notes", detail: sent.notes.trim() }] : []),
      ]
    : [];

  return (
    <DemoVars project={project}>
      {/* The page behind the viewer is made inert while it is open, so the tab
          order and the accessibility tree stay inside the dialog. */}
      <div inert={open !== null}>
        {/* 1 — The service board. Printed facts, above everything, because a
           diner decides on hours and seatings before they decide on a mood. */}
        <div className="border-b border-[var(--d-line)] bg-[color-mix(in_srgb,var(--d-fg)_4%,var(--d-bg))]">
          <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-1.5 px-4 py-2.5 @5xl:px-8">
            {r.board.map((line) => (
              <li
                key={line}
                className="flex items-center gap-2.5 text-[12px] leading-relaxed text-[var(--d-body)]"
              >
                <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-[var(--d-accent)]" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* 2 — Top bar: quiet over the fold, solid once the page has moved. */}
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

        {/* 3 — Hero: the words on ink, the fire underneath them at its own wide
           ratio. Nothing here is a card sitting on a photograph — a fire-lit room
           can be anywhere between near-black and a blown-out ember, and no type
           is asked to prove itself against pixels chosen by a camera. */}
        {/* Ruling K: on the standalone route the hero owns the fold — a floor of
            88% of the viewport with the block centred inside it. `svh` rather than
            `vh` because a phone collapses its address bar on scroll, and a floor
            measured against the tall viewport would push the first plate below the
            fold instead of framing it. The device frames already dictate their own
            height, so this applies only when `preview` is false. */}
        <section
          id={anchor.id("top")}
          className={`px-4 pt-12 @3xl:pt-16 @5xl:px-8 @5xl:pt-20 ${
            preview ? "" : "flex min-h-[88svh] flex-col justify-center"
          }`}
        >
          <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1.35fr_1fr] @5xl:gap-16">
            <div>
              <DemoBadge />
              <DemoHeading
                preview={preview}
                className="mt-6 font-display text-[2.7rem] leading-[1.02] font-medium tracking-[-0.01em] text-balance @3xl:text-[3.6rem] @5xl:text-[4.5rem]"
              >
                {r.hero.headline}{" "}
                <span className="italic text-[var(--d-accent-text)]">{r.hero.accent}</span>
              </DemoHeading>
              <p className={`mt-5 max-w-xl ${label} font-normal normal-case tracking-[0.14em] text-[var(--d-muted)]`}>
                {r.hero.eyebrow}
              </p>
            </div>

            {/* The right column is the practical half of the fold: when the room
               is open and what it can hold. */}
            <div className="@5xl:pt-2">
              <p className="font-display text-[1.35rem] leading-snug text-[var(--d-fg)] @3xl:text-[1.5rem]">
                {r.hero.hoursLine}
              </p>
              <p className="mt-4 max-w-md text-[14px] leading-[1.75] text-[var(--d-body)]">
                {r.hero.lede}
              </p>
              <div className="mt-7 flex flex-col gap-3 @3xl:flex-row @3xl:items-center">
                <a href={anchor.href("visit")} className={`${action} ${actionSolid}`}>
                  {bookLabel}
                </a>
                <a href={anchor.href("menu")} className={`${action} ${actionLine}`}>
                  {c.ctaSecondary}
                </a>
              </div>
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--d-line)] pt-6">
                {r.hero.facts.map((f) => (
                  <div key={f.label}>
                    <dt className={`${label} text-[var(--d-muted)]`}>{f.label}</dt>
                    <dd className="mt-1.5 font-display text-[1.15rem] text-[var(--d-fg)]">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <figure className="mx-auto mt-12 max-w-7xl">
            <DemoImage
              src={r.hero.src}
              alt={r.hero.alt}
              /* The plate is capped by the page's own max width, so 100vw would
                 over-ask for a candidate the element can never show. */
              sizes="(min-width: 80rem) 80rem, 100vw"
              preload={!preview}
              imgClassName="demo-ken-burns"
              className="aspect-[4/3] w-full @3xl:aspect-[16/9] @5xl:aspect-[21/9]"
            />
            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-[var(--d-line)] pt-3">
              <span className={`${label} font-normal normal-case tracking-[0.12em] text-[var(--d-muted)]`}>
                {r.hero.caption}
              </span>
              <span className="text-[12px] leading-relaxed text-[var(--d-muted)]">
                Licensed photography · full credits below the gallery
              </span>
            </figcaption>
          </figure>
        </section>

        {/* 4 — The kitchen, set as a drop-styled opening line and the four
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

        {/* 5 — The two blocks. A schedule, not a gallery: the constraint a
           twenty-two-cover room with one grill puts on the visitor. */}
        <section className="demo-reveal border-y border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-14 @5xl:px-8 @5xl:py-18">
          <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1fr_1.35fr] @5xl:gap-16">
            <div>
              <p className={`${label} text-[var(--d-accent-text)]`}>{r.seatings.eyebrow}</p>
              <h2 className="mt-4 max-w-md font-display text-[1.7rem] leading-[1.15] font-medium tracking-tight text-balance @3xl:text-[2.1rem]">
                {r.seatings.title}
              </h2>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[var(--d-body)]">
                {r.seatings.body}
              </p>
            </div>
            <ul className="grid list-none gap-px bg-[var(--d-line)] p-0 @3xl:grid-cols-3">
              {r.seatings.blocks.map((b) => (
                <li key={b.label} className="bg-[var(--d-bg)] px-4 py-5">
                  <p className="font-display text-[2.2rem] leading-none font-medium tracking-tight text-[var(--d-fg)]">
                    {b.time}
                  </p>
                  <p className={`mt-3 ${label} text-[var(--d-muted)]`}>{b.label}</p>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--d-body)]">{b.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6 — The card: one tab per course, a printed ledger with dotted leaders
           and the course's own note in the margin.
           The band is a 6% wash of the accent into the page colour — lighter than
           the two accent washes every derived token is already measured against. */}
        <section
          id={anchor.id("menu")}
          className="demo-reveal bg-[color-mix(in_srgb,var(--d-accent)_6%,var(--d-bg))] px-4 py-16 @5xl:px-8 @5xl:py-24"
        >
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-5 @3xl:flex-row @3xl:items-end @3xl:justify-between @3xl:gap-10">
              <div>
                <p className={`${label} text-[var(--d-accent-text)]`}>{r.menu.eyebrow}</p>
                <h2 className="mt-3 font-display text-[2rem] leading-tight font-medium tracking-tight @3xl:text-[2.6rem]">
                  {r.menu.title}
                </h2>
              </div>
              <p className="max-w-sm text-[13px] leading-relaxed text-[var(--d-body)]">{r.menu.lead}</p>
            </div>

            <div
              role="tablist"
              aria-label="Menu courses"
              onKeyDown={onTabKey}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-[var(--d-line)] @3xl:gap-x-10"
            >
              {courses.map((t, i) => {
                const selected = i === course;
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
                    onClick={() => setCourse(i)}
                    className={`-mb-px inline-flex min-h-11 items-center gap-2 border-b-2 px-1 font-display text-[1.15rem] font-medium tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                      selected
                        ? "border-[var(--d-accent)] text-[var(--d-fg)]"
                        : "border-transparent text-[var(--d-body)] hover:text-[var(--d-fg)]"
                    }`}
                  >
                    {t.label}
                    <span
                      className={`font-sans text-[12px] tracking-[0.12em] ${
                        selected ? "text-[var(--d-accent-text)]" : "text-[var(--d-muted)]"
                      }`}
                    >
                      {t.dishes.length}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              key={course}
              role="tabpanel"
              id={`${uid}-card`}
              aria-labelledby={`${uid}-tab-${course}`}
              tabIndex={0}
              className="demo-menu-fade pt-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)] @5xl:grid @5xl:grid-cols-[13rem_1fr] @5xl:gap-14"
            >
              {/* The course note lives in the margin, the way a printed card sets
                  a course heading beside its dishes. */}
              <p className="border-l-2 border-[var(--d-accent)] pl-4 font-display text-[1.15rem] italic leading-snug text-[var(--d-body)] @5xl:sticky @5xl:top-24 @5xl:border-l-0 @5xl:border-t @5xl:pt-4 @5xl:pl-0">
                {active.blurb}
              </p>
              <ul className="mt-6 list-none p-0 @5xl:mt-0">
                {active.dishes.map((d) => (
                  <li
                    key={d.name}
                    className="border-b border-dotted border-[var(--d-line-strong)] py-4 last:border-b-0"
                  >
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

            <p className="mt-10 max-w-xl text-[13px] leading-relaxed text-[var(--d-body)]">
              {r.menu.priceNote}
            </p>

            {/* The one thing a fire kitchen must say out loud. */}
            <div className="mt-8 border border-[var(--d-line-strong)] px-5 py-5">
              <p className={`${label} text-[var(--d-muted)]`}>One kitchen, one fire</p>
              <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-[var(--d-body)]">
                {r.menu.allergy}
              </p>
            </div>

            <p className="mt-8 max-w-xl text-[13px] leading-relaxed text-[var(--d-muted)]">
              {r.menu.note}
            </p>
          </div>
        </section>

        {/* 7 — Story: the cream band. One tall plate, one small one laid over its
           corner, ink mixed back from cream toward the page colour. */}
        <section
          id={anchor.id("story")}
          className="demo-reveal bg-[var(--d-fg)] px-4 py-16 @5xl:px-8 @5xl:py-24"
        >
          <div className="mx-auto grid max-w-6xl gap-12 @5xl:grid-cols-[1.1fr_1fr] @5xl:items-center @5xl:gap-20">
            <div>
              <span aria-hidden="true" className="block h-px w-16 bg-[var(--d-accent-2)]" />
              <p className={`mt-6 ${label} ${inkEmber}`}>{r.story.eyebrow}</p>
              <h2 className={`mt-4 font-display text-[1.9rem] leading-[1.1] font-medium tracking-tight text-balance @3xl:text-[2.5rem] ${ink}`}>
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

        {/* 8 — Photographs: a masonry column set, every plate a button that opens
           the viewer below. */}
        <section
          id={anchor.id("gallery")}
          className="demo-reveal px-4 py-16 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-24"
        >
          <div className="flex flex-col gap-3 @3xl:flex-row @3xl:items-end @3xl:justify-between @3xl:gap-10">
            <h2 className="font-display text-[1.9rem] leading-tight font-medium tracking-tight @3xl:text-[2.4rem]">
              <span className={`mr-3 ${label} align-middle text-[var(--d-accent-text)]`}>
                {r.gallery.eyebrow}
              </span>
              {r.gallery.title}
            </h2>
            <p className="max-w-sm text-[13px] leading-relaxed text-[var(--d-body)]">{r.gallery.lead}</p>
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
                  {/* The plate keeps the file's own ratio, read from the data
                      rather than looked up by position: nothing is cropped here,
                      and the space is reserved before the file arrives. */}
                  <div className="w-full" style={{ aspectRatio: it.ratio }}>
                    <DemoImage
                      src={it.src}
                      alt={it.alt}
                      sizes="(min-width: 48rem) 31vw, 48vw"
                      className="h-full w-full"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-[12px] leading-relaxed text-[var(--d-muted)]">
                  {it.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* The credit line belongs at the foot of the photographs, which is the
              one place on the page that lists all nine files. */}
          {c.imageSource && (
            <p className="mt-10 max-w-2xl text-[12px] leading-relaxed text-[var(--d-muted)]">
              {c.imageSource}
            </p>
          )}
        </section>

        {/* 9 — The banquet room. */}
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
              <h2 className="mt-3 font-display text-[1.8rem] leading-tight font-medium tracking-tight text-balance @3xl:text-[2.3rem]">
                {r.events.title}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-[var(--d-body)]">
                {r.events.body}
              </p>
              <dl className="mt-6 grid gap-x-8 gap-y-3 @3xl:grid-cols-2">
                {r.events.points.map((p) => (
                  <div key={p} className="flex items-baseline gap-3 border-t border-[var(--d-line)] pt-3">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--d-accent)]" />
                    <dt className="sr-only">Banquet room</dt>
                    <dd className="text-[14px] leading-relaxed text-[var(--d-body)]">{p}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 @3xl:flex-row @3xl:items-center">
                {/* An anchor, not a button that teleports focus: it writes the
                    room into the note field and lets the browser do the moving,
                    so the visitor arrives at the form with the question already
                    filled in and the tab order where they can see it. */}
                <a
                  href={anchor.href("visit")}
                  onClick={() => set("notes", r.events.preset)}
                  className={`${action} ${actionSolid}`}
                >
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

        {/* 10 — Reservations: the form, its honest read-out, and everything a
           person checks before filling it in. */}
        <section
          id={anchor.id("visit")}
          className="demo-reveal border-t border-[var(--d-line)] px-4 pt-16 pb-28 @3xl:pb-16 @5xl:px-8 @5xl:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className={`${label} text-[var(--d-accent-text)]`}>{r.booking.eyebrow}</p>
              <h2 className="mt-3 font-display text-[2rem] leading-tight font-medium tracking-tight text-balance @3xl:text-[2.6rem]">
                {r.booking.title}
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--d-body)] @3xl:text-[15px]">
                {r.booking.body}
              </p>
            </div>

            <div className="mt-12 @5xl:grid @5xl:grid-cols-[1.25fr_1fr] @5xl:gap-14 @5xl:items-start">
              {sent ? (
                /* The request, read back and labelled as exactly what it is:
                   collected here, sent nowhere. */
                <div
                  className="demo-menu-fade rounded-[4px] border border-[var(--d-accent)] bg-[color-mix(in_srgb,var(--d-accent)_6%,var(--d-bg))] px-5 py-8 @3xl:px-8"
                >
                  <h3
                    ref={done}
                    tabIndex={-1}
                    className="font-display text-[1.7rem] leading-tight font-medium tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)] @3xl:text-[2rem]"
                  >
                    {r.booking.confirm.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[var(--d-body)]">
                    {r.booking.confirm.lead}
                  </p>
                  <dl className="mt-7 grid gap-px bg-[var(--d-line)]">
                    {receipt.map((row) => (
                      <div
                        key={row.term}
                        className="grid grid-cols-[7.5rem_1fr] gap-4 bg-[var(--d-bg)] px-4 py-3 @3xl:grid-cols-[10rem_1fr]"
                      >
                        <dt className={`${label} leading-relaxed text-[var(--d-muted)]`}>{row.term}</dt>
                        <dd className="text-[14px] leading-relaxed text-[var(--d-fg)] [overflow-wrap:anywhere]">
                          {row.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-7 border-l-2 border-[var(--d-accent)] pl-4 text-[14px] leading-relaxed text-[var(--d-body)]">
                    {c.formNote ?? DEMO_NOTE}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      /* The field this returns to does not exist yet, so the
                         commit effect below is told to move focus once it does. */
                      editing.current = true;
                      setSent(null);
                    }}
                    className={`${action} ${actionLine} mt-8`}
                  >
                    {r.booking.confirm.edit}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(form);
                  }}
                  className="rounded-[4px] border border-[var(--d-line)] bg-[color-mix(in_srgb,var(--d-accent)_6%,var(--d-bg))] px-5 py-8 @3xl:px-8"
                >
                  <div className="flex flex-col gap-5 @3xl:grid @3xl:grid-cols-2 @3xl:gap-6">
                    <Field id={`${uid}-date`} name="Date" hint={r.booking.hints.date}>
                      <input
                        /* `min` is written onto the node when it mounts, not
                           rendered into the markup: a build-time date would go
                           stale, and a render-time one would differ between the
                           server and the client. */
                        ref={(el) => {
                          dateInput.current = el;
                          if (el && !el.min) el.min = todayISO();
                        }}
                        id={`${uid}-date`}
                        name="date"
                        type="date"
                        required
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        className={field}
                      />
                    </Field>
                    <Field id={`${uid}-time`} name="Time" hint={r.booking.hints.time}>
                      <select
                        id={`${uid}-time`}
                        name="time"
                        required
                        value={form.time}
                        onChange={(e) => set("time", e.target.value)}
                        className={field}
                      >
                        <option value="" disabled>
                          Pick a slot
                        </option>
                        {r.booking.times.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>

                    {/* Party size as chips: a thumb sets it in one press, and the
                       range the form will take is visible before it is broken. */}
                    <div className="@3xl:col-span-2">
                      <p id={`${uid}-party`} className={`${label} text-[var(--d-muted)]`}>
                        Guests
                      </p>
                      <div
                        role="group"
                        aria-labelledby={`${uid}-party`}
                        className="mt-2.5 flex flex-wrap gap-2"
                      >
                        {r.booking.parties.map((n) => {
                          const on = form.party === n;
                          return (
                            <button
                              key={n}
                              type="button"
                              aria-pressed={on}
                              onClick={() => set("party", n)}
                              className={`inline-flex h-11 w-11 items-center justify-center rounded-[3px] border font-display text-[1.05rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                                on
                                  ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]"
                                  : "border-[var(--d-line-strong)] text-[var(--d-fg)] hover:bg-[var(--d-hover)]"
                              }`}
                            >
                              {n}
                            </button>
                          );
                        })}
                        <span className="inline-flex min-h-11 items-center pl-1 text-[12px] leading-relaxed text-[var(--d-muted)]">
                          {r.booking.hints.party}
                        </span>
                      </div>
                    </div>

                    <Field id={`${uid}-name`} name="Name">
                      <input
                        id={`${uid}-name`}
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={field}
                      />
                    </Field>
                    <Field id={`${uid}-email`} name="Email">
                      <input
                        id={`${uid}-email`}
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={field}
                      />
                    </Field>
                    <div className="@3xl:col-span-2">
                      <Field id={`${uid}-occasion`} name="Occasion">
                        <select
                          id={`${uid}-occasion`}
                          name="occasion"
                          value={form.occasion}
                          onChange={(e) => set("occasion", e.target.value)}
                          className={field}
                        >
                          {r.booking.occasions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <div className="@3xl:col-span-2">
                      <Field id={`${uid}-notes`} name="Anything we should know" hint={r.booking.hints.notes}>
                    <textarea
                      id={`${uid}-notes`}
                      name="notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      className={`${field} resize-y`}
                    />
                      </Field>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 @3xl:items-center @3xl:justify-between @3xl:flex-row">
                    <button type="submit" className={`${action} ${actionSolid} w-full @3xl:w-auto`}>
                      {r.booking.submit}
                    </button>
                    <p className="text-[13px] leading-relaxed text-[var(--d-body)] @3xl:max-w-[16rem]">
                      {r.booking.note}
                    </p>
                  </div>
                </form>
              )}

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

        {/* 11 — Footer: the practical half of the room, repeated once, and the
           way back. No placeholder social row — a name that looks like a link and
           goes nowhere is a dead end, and this concept has no accounts. */}
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
              <h3 className={`${label} text-[var(--d-muted)]`}>On this page</h3>
              <ul className="mt-3 flex flex-col gap-1.5 list-none p-0">
                {[...navItems, ["Banquet room", "events"]].map(([text, section]) => (
                  <li key={section}>
                    <a
                      href={anchor.href(section)}
                      className="inline-flex min-h-11 items-center text-[13px] text-[var(--d-body)] hover:text-[var(--d-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-1">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--d-muted)]">
              Concept project · not a live client
            </p>
            {/* This concept builds its own footer rather than the shared one, so
                the way back to the project list has to be placed here too. It only
                renders on the standalone route. */}
            <DemoBackLink />
          </div>
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

            <div
              className="mx-auto mt-5 w-full"
              style={{
                /* The file's own ratio, and a display width that keeps the tall
                   plate inside a phone frame without cropping it. */
                aspectRatio: items[open].ratio,
                maxWidth: Number(items[open].ratio.split("/")[0]) /
                  Number(items[open].ratio.split("/")[1]) < 1 ? "22rem" : "40rem",
              }}
            >
              <DemoImage
                key={items[open].src}
                src={items[open].src}
                alt={items[open].alt}
                sizes="(min-width: 64rem) 60rem, 100vw"
                className="h-full w-full"
              />
            </div>

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
