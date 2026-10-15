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

/* 06 — Rowanwood Dental: a two-chair general practice, laid out as a printed
   leaflet rather than a brochure.

   The order follows what a patient actually decides on: whether they can be
   seen, what happens in the chair, how the first visit runs, then the request.
   Trust is built entirely out of process — durations, steps, a written number —
   because process is the only thing a concept practice can show without
   inventing a person to vouch for it. There are no names, credentials,
   reviews, ratings or before/after claims anywhere on this page, and the
   absence of a price list is stated with its reason rather than quietly skipped.

   Deliberately not the other three concepts: Newsreader over Public Sans,
   sage on a pale green-white, a narrow left rail against a wide content column,
   and hairline rules instead of cards. Everything visible comes from
   project.content; the practice, the street, the hours and the number are
   invented for the fiction, and the number stays inside the 555 range reserved
   for made-up businesses. */

const navItems: DemoNavItem[] = [
  ["Treatments", "index"],
  ["Nervous patients", "nerves"],
  ["First visit", "visit"],
  ["Questions", "faq"],
];

/* Small caps set wide, the way a leaflet heads a section. */
const label = "font-sans text-[12px] uppercase tracking-[0.28em]";

/* Squared, hairline-bordered actions — neither the plumbing site's pills nor
   the restaurant's ember buttons. */
const action =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
const actionSolid = "bg-[var(--d-accent)] text-[var(--d-on-accent)] hover:opacity-90";
const actionLine =
  "border border-[var(--d-line-strong)] text-[var(--d-fg)] hover:bg-[var(--d-hover)]";

/* Fields on a pale page. Labels are always visible; the boundary is the 3:1
   token rather than a decorative hairline. */
const field =
  "w-full rounded-[2px] border border-[var(--d-line-strong)] bg-[var(--d-field)] px-3.5 py-3 text-[15px] text-[var(--d-fg)] [color-scheme:light] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";

const chip =
  "inline-flex min-h-11 cursor-pointer select-none items-center rounded-[2px] border border-[var(--d-line-strong)] px-3.5 text-[13px] leading-none transition-colors hover:bg-[var(--d-hover)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--d-accent)]";
const chipOn = "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]";

/* What the request form collects, and therefore what the confirmation can read
   back. One object, so the read-out cannot disagree with the inputs. */
type Request = {
  reason: string;
  patient: string;
  day: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

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

/* A tap-answered choice group. Real radios inside the labels, so the group is
   keyboard-navigable with the arrow keys, announces itself as a set of options
   under one legend, and validates natively — a styled row of buttons would do
   none of those three things. */
function Choices({
  legend,
  name,
  options,
  value,
  onSelect,
  hint,
  required = false,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onSelect: (v: string) => void;
  hint?: string;
  required?: boolean;
}) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className={`${label} pb-2 text-[var(--d-muted)]`}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className={`${chip} ${value === o ? chipOn : ""}`}>
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              required={required}
              onChange={() => onSelect(o)}
              className="sr-only"
            />
            {o}
          </label>
        ))}
      </div>
      {hint && <p className="mt-2 text-[12px] leading-relaxed text-[var(--d-muted)]">{hint}</p>}
    </fieldset>
  );
}

/* The section head: eyebrow, title and lead in a narrow rail, the content
   beside it. Every section of this page is built from the same two columns.
   Always an h2 — the page's single h1 is the hero, and it is swapped in and
   out by DemoHeading rather than here. */
function Head({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div>
      <p className={`${label} text-[var(--d-accent-text)]`}>{eyebrow}</p>
      <h2 className="mt-3 font-display text-[1.9rem] leading-[1.12] font-medium tracking-[-0.005em] text-balance @3xl:text-[2.3rem]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-[14px] leading-[1.75] text-[var(--d-body)] @3xl:text-[15px]">{lead}</p>
      )}
    </div>
  );
}

export default function DentalDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const c = project.content;
  const d = c?.dental;

  const [sent, setSent] = useState<Request | null>(null);
  /* A `tel:` link inside a device frame would pull the visitor off the page they
     were looking at, so the number stops being a link there. */
  const [callNote, setCallNote] = useState(false);

  const done = useRef<HTMLHeadingElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  /* Set by "Change it", read by the commit below it. A ref rather than state
     because it must not re-render anything, and the field it asks for only
     exists on the next commit. */
  const editing = useRef(false);

  const [form, setForm] = useState<Request>({
    reason: "",
    patient: d?.booking.patientTypes[0] ?? "",
    day: d?.booking.days[0] ?? "",
    time: d?.booking.times[d.booking.times.length - 1] ?? "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  /* Respect the visitor's motion preference at the moment the page moves them,
     rather than at build time. */
  const scrollBehavior = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  /* The two places this page answers a press by bringing an element into being:
     a submitted form mounting its read-out, and "Change it" re-mounting the
     fields. Neither can be focused from the handler that caused it, so both are
     done on the commit that made them exist — and the effect only reads and
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
    firstInput.current?.focus({ preventScroll: true });
  }, [sent]);

  const set = <K extends keyof Request>(key: K, value: Request[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    /* A change to the request means the read-out no longer describes it. */
    if (sent) setSent(null);
  };

  if (!c || !d) return null;

  const phoneHref = preview ? undefined : d.phone.href;

  /* The read-out prints only what was actually given, so the confirmation cannot
     invent a phone number or a note the visitor never typed. */
  const receipt: { term: string; detail: string }[] = sent
    ? [
        { term: "Reason", detail: sent.reason },
        { term: "Patient", detail: sent.patient },
        { term: "When", detail: `${sent.day} · ${sent.time}` },
        { term: "Name", detail: sent.name },
        { term: "Phone", detail: sent.phone },
        ...(sent.email.trim() ? [{ term: "Email", detail: sent.email.trim() }] : []),
        ...(sent.notes.trim() ? [{ term: "Notes", detail: sent.notes.trim() }] : []),
      ]
    : [];

  return (
    <DemoVars project={project}>
      {/* 1 — The board. Four facts, printed across the top of the page, because
         "can I be seen and can I get in" decides whether anything below matters. */}
      <div className="border-b border-[var(--d-line)] bg-[var(--d-soft)]">
        {/* Hairlines drawn by the grid itself: a 1px gap over a line-coloured
            track, so the rules appear between cells in both axes without any
            per-index border arithmetic to get wrong. */}
        <ul className="mx-auto grid max-w-7xl gap-px bg-[var(--d-line)] @3xl:grid-cols-2 @5xl:grid-cols-4">
          {d.board.map((line, i) => (
            <li
              key={line}
              className="flex items-start gap-3 bg-[var(--d-soft)] px-4 py-2.5 text-[12px] leading-relaxed text-[var(--d-body)] @5xl:px-8"
            >
              <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-[12px] text-[var(--d-accent-text)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      {/* 2 — Top bar: quiet over the fold, solid once the page has moved. */}
      <header className="demo-header-dental sticky top-0 z-30 border-b border-[var(--d-line)] bg-[color-mix(in_oklab,var(--d-bg)_97%,transparent)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 @5xl:px-8">
          <a href={anchor.href("top")} className={`inline-flex min-h-11 items-center ${label} font-display font-semibold`}>
            {c.navName}
          </a>
          <div className="flex items-center gap-3 @5xl:gap-8">
            <DemoNav anchor={anchor} items={navItems} className={label} />
            <span className="hidden @3xl:inline-flex">
              <a href={anchor.href("booking")} className={`${action} ${actionSolid} px-4 @3xl:px-5`}>
                Request
              </a>
            </span>
            <DemoMobileMenu anchor={anchor} items={navItems} action={["Request a visit", "booking"]} />
          </div>
        </div>
      </header>

      {/* 3 — Hero: the argument on the left, the room on the right. Type never
         sits on a photograph here, so nothing has to prove itself against
         whatever a camera happened to expose. */}
      <section id={anchor.id("top")} className="px-4 pt-12 @3xl:pt-16 @5xl:px-8 @5xl:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1.25fr_1fr] @5xl:gap-16">
          <div>
            <DemoBadge />
            <DemoHeading
              preview={preview}
              className="mt-6 font-display text-[2.5rem] leading-[1.06] font-medium tracking-[-0.01em] text-balance @3xl:text-[3.3rem] @5xl:text-[4rem]"
            >
              {d.hero.headline}{" "}
              <span className="italic text-[var(--d-accent-text)]">{d.hero.accent}</span>
            </DemoHeading>
            <p className={`mt-5 ${label} font-normal normal-case tracking-[0.16em] text-[var(--d-muted)]`}>
              {d.hero.eyebrow}
            </p>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-[var(--d-body)] @3xl:text-[16px]">
              {d.hero.lede}
            </p>

            {/* The three facts a patient weighs, as a printed key rather than as
                three feature cards. */}
            <dl className="mt-9 grid gap-px bg-[var(--d-line)] @3xl:grid-cols-3">
              {d.hero.facts.map((f) => (
                <div key={f.label} className="bg-[var(--d-bg)] px-4 py-4">
                  <dt className={`${label} text-[var(--d-muted)]`}>{f.label}</dt>
                  <dd className="mt-2 font-display text-[1.15rem] leading-snug text-[var(--d-fg)]">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-3 @3xl:flex-row @3xl:items-center">
              <a href={anchor.href("booking")} className={`${action} ${actionSolid}`}>
                {d.hero.ctaPrimary}
              </a>
              <a href={anchor.href("urgent")} className={`${action} ${actionLine}`}>
                {d.hero.ctaSecondary}
              </a>
            </div>
            <p className="mt-4 text-[13px] text-[var(--d-muted)]">{d.hero.hoursLine}</p>
          </div>

          <figure className="@5xl:pt-4">
            <DemoImage
              src={d.hero.src}
              alt={d.hero.alt}
              preload
              sizes="(min-width: 64rem) 38vw, 100vw"
              className="aspect-[4/5] w-full rounded-[2px]"
              imgClassName="demo-ken-burns"
            />
            <figcaption className="mt-3 text-[12px] leading-relaxed text-[var(--d-muted)]">
              {d.hero.caption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 4 — Pain. Its own section, above the treatment index and directly after
         the hero, because a person in pain must not scroll to find the phone. */}
      <section
        id={anchor.id("urgent")}
        className="demo-reveal mt-16 border-y border-[var(--d-accent)] bg-[color-mix(in_srgb,var(--d-accent)_7%,var(--d-bg))] px-4 py-12 @3xl:mt-24 @5xl:px-8 @5xl:py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-8 @5xl:grid-cols-[1fr_1.15fr] @5xl:gap-16">
          <div>
            <p className={`${label} text-[var(--d-accent-text)]`}>{d.urgent.eyebrow}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.1] font-medium tracking-tight text-balance @3xl:text-[2.4rem]">
              {d.urgent.title}
            </h2>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* The number is a live link only on the standalone route. Inside a
                 device frame it would pull the visitor off the page they were
                 looking at, so it becomes a button that says why it cannot dial. */}
              {phoneHref ? (
                <a
                  href={phoneHref}
                  aria-label={d.urgent.phoneLabel}
                  className={`${action} ${actionSolid}`}
                >
                  {d.phone.display}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setCallNote((v) => !v)}
                  aria-expanded={callNote}
                  aria-label={d.urgent.phoneLabel}
                  className={`${action} ${actionSolid}`}
                >
                  {d.phone.display}
                </button>
              )}
              {callNote && !phoneHref && (
                <p role="status" className="w-full text-[13px] leading-relaxed text-[var(--d-muted)]">
                  {d.urgent.phoneNote}
                </p>
              )}
              {/* The slower route, offered rather than hidden: it writes the
                  reason into the form before the visitor ever reaches it. */}
              <a
                href={anchor.href("booking")}
                onClick={() => {
                  set("reason", d.urgent.prefillReason);
                  set("notes", d.urgent.prefill);
                }}
                className={`${action} ${actionLine}`}
              >
                {d.urgent.writeInstead}
              </a>
            </div>
          </div>
          <div className="@5xl:border-l @5xl:border-[var(--d-line)] @5xl:pl-12">
            <p className="text-[15px] leading-[1.8] text-[var(--d-body)]">{d.urgent.body}</p>
            <p className="mt-5 border-l-2 border-[var(--d-accent)] pl-4 text-[14px] leading-[1.75] text-[var(--d-body)]">
              {d.urgent.hospital}
            </p>
          </div>
        </div>
      </section>

      {/* 5 — The practice. A statement and its plain-spoken footnote. */}
      <section id={anchor.id("practice")} className="demo-reveal px-4 py-16 @5xl:px-8 @5xl:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1fr_1.1fr] @5xl:gap-16">
          <div>
            <p className={`${label} text-[var(--d-accent-text)]`}>{d.intro.eyebrow}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.12] font-medium tracking-tight text-balance @3xl:text-[2.4rem]">
              {d.intro.title}
            </h2>
          </div>
          <div>
            <p className="text-[15px] leading-[1.85] text-[var(--d-body)] @3xl:text-[17px]">{d.intro.body}</p>
            <p className="mt-6 border-t border-[var(--d-line)] pt-5 text-[14px] leading-[1.75] text-[var(--d-muted)]">
              {d.intro.aside}
            </p>
          </div>
        </div>
        {/* The wide plate: the two rooms the statement is about, at the page's
            own measure rather than inside a column. */}
        <figure className="mx-auto mt-12 max-w-7xl">
          <DemoImage
            src={d.plates.practice.src}
            alt={d.plates.practice.alt}
            sizes="(min-width: 64rem) 80rem, 100vw"
            className="aspect-[16/7] w-full rounded-[2px]"
          />
          <figcaption className="mt-3 text-[12px] leading-relaxed text-[var(--d-muted)]">
            {d.plates.practice.caption}
          </figcaption>
        </figure>
      </section>

      {/* 6 — The index. The page's centrepiece: what is done, how long it takes,
         and what happens in the chair. Rules rather than cards, because a list
         of rows is what a treatment schedule actually is. */}
      <section
        id={anchor.id("index")}
        className="demo-reveal border-t border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-12 @5xl:grid-cols-[19rem_1fr] @5xl:gap-16">
          <div className="@5xl:sticky @5xl:top-24 @5xl:self-start">
            <Head eyebrow={d.index.eyebrow} title={d.index.title} lead={d.index.lead} />
            <figure className="mt-8 hidden @5xl:block">
              <DemoImage
                src={d.plates.index.src}
                alt={d.plates.index.alt}
                sizes="19rem"
                className="aspect-[4/3] w-full rounded-[2px]"
              />
              <figcaption className="mt-3 text-[12px] leading-relaxed text-[var(--d-muted)]">
                {d.plates.index.caption}
              </figcaption>
            </figure>
            <p className="mt-8 border-t-2 border-[var(--d-accent)] pt-4 text-[13px] leading-[1.75] text-[var(--d-body)]">
              {d.index.costNote}
            </p>
          </div>

          <div className="min-w-0">
            {d.index.groups.map((g) => (
              <div key={g.label} className="mt-10 first:mt-0">
                <h3 className={`${label} text-[var(--d-fg)]`}>{g.label}</h3>
                <ul className="mt-3 list-none p-0">
                  {g.rows.map((row) => (
                    <li
                      key={row.name}
                      className="grid gap-x-8 gap-y-1.5 border-t border-[var(--d-line)] py-5 @3xl:grid-cols-[minmax(0,15fr)_8fr_22fr]"
                    >
                      <span className="font-display text-[1.15rem] leading-snug text-[var(--d-fg)]">{row.name}</span>
                      <span className="font-mono text-[12px] leading-relaxed text-[var(--d-accent-text)] @3xl:pt-1.5">
                        {row.time}
                      </span>
                      <p className="text-[14px] leading-[1.75] text-[var(--d-body)] @3xl:pt-1">{row.what}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Nervous patients. Four things that can be checked in the room, and
         no promise about how the visit will feel. */}
      <section id={anchor.id("nerves")} className="demo-reveal border-t border-[var(--d-line)] px-4 py-16 @5xl:px-8 @5xl:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Head eyebrow={d.nerves.eyebrow} title={d.nerves.title} lead={d.nerves.body} />
          </div>
          <ol className="mt-10 grid gap-x-12 gap-y-8 @3xl:grid-cols-2">
            {d.nerves.points.map((p, i) => (
              <li key={p.title} className="border-t border-[var(--d-line)] pt-5">
                <span aria-hidden="true" className="font-mono text-[12px] text-[var(--d-accent-text)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[1.3rem] leading-snug text-[var(--d-fg)]">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.75] text-[var(--d-body)]">{p.body}</p>
              </li>
            ))}
          </ol>
          <a
            href={anchor.href("booking")}
            onClick={() => {
              set("notes", d.nerves.prefill);
            }}
            className={`${action} ${actionSolid} mt-10`}
          >
            {d.nerves.cta}
          </a>
        </div>
      </section>

      {/* 8 — The first appointment, start to finish, and the practical half:
         what to bring and how to get in. */}
      <section
        id={anchor.id("visit")}
        className="demo-reveal border-t border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-12 @5xl:grid-cols-[1fr_20rem] @5xl:gap-16">
          <div className="min-w-0">
            <Head eyebrow={d.visit.eyebrow} title={d.visit.title} lead={d.visit.lead} />

            <ol className="mt-9">
              {d.visit.steps.map((s) => (
                <li key={s.no} className="grid gap-x-6 border-t border-[var(--d-line)] py-6 @3xl:grid-cols-[4rem_1fr]">
                  <span aria-hidden="true" className="font-display text-[1.6rem] leading-none text-[var(--d-accent-text)]">
                    {s.no}
                  </span>
                  <div className="mt-2 @3xl:mt-0">
                    <h3 className="font-display text-[1.25rem] leading-snug text-[var(--d-fg)]">{s.title}</h3>
                    <p className="mt-2 max-w-2xl text-[14px] leading-[1.75] text-[var(--d-body)]">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className={`mt-12 ${label} text-[var(--d-muted)]`}>What to bring</h3>
            <ul className="mt-3 grid gap-x-8 list-none p-0 @3xl:grid-cols-2">
              {d.visit.bring.map((b) => (
                <li key={b.label} className="border-t border-[var(--d-line)] py-4">
                  <span className="block text-[14px] font-semibold text-[var(--d-fg)]">{b.label}</span>
                  <span className="mt-1 block text-[14px] leading-[1.7] text-[var(--d-body)]">{b.body}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <figure>
              <DemoImage
                src={d.plates.visit.src}
                alt={d.plates.visit.alt}
                sizes="(min-width: 64rem) 20rem, 100vw"
                className="aspect-[4/3] w-full rounded-[2px]"
              />
              <figcaption className="mt-3 text-[12px] leading-relaxed text-[var(--d-muted)]">
                {d.plates.visit.caption}
              </figcaption>
            </figure>

            <h3 className={`mt-9 ${label} text-[var(--d-muted)]`}>Getting in</h3>
            <ul className="mt-3 flex flex-col gap-2.5 list-none p-0">
              {d.visit.access.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[14px] leading-[1.7] text-[var(--d-body)]">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--d-accent)]" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 9 — Questions the desk actually answers. */}
      <section id={anchor.id("faq")} className="demo-reveal border-t border-[var(--d-line)] px-4 py-16 @5xl:px-8 @5xl:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1fr_1.3fr] @5xl:gap-16">
          <Head eyebrow={d.faq.eyebrow} title={d.faq.title} lead={d.faq.lead} />
          <DemoFaq items={d.faq.items} />
        </div>
      </section>

      {/* 10 — The request. Chips for the choices a front desk asks over the
         phone, and a read-out that says plainly that no appointment exists yet. */}
      <section
        id={anchor.id("booking")}
        className="demo-reveal border-t border-[var(--d-line)] bg-[var(--d-soft)] px-4 pt-16 pb-28 @3xl:pb-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Head eyebrow={d.booking.eyebrow} title={d.booking.title} lead={d.booking.body} />
          </div>

          <div className="mt-12 @5xl:grid @5xl:grid-cols-[1.3fr_1fr] @5xl:gap-16 @5xl:items-start">
            {sent ? (
              <div className="demo-menu-fade rounded-[2px] border border-[var(--d-accent)] bg-[var(--d-bg)] px-5 py-8 @3xl:px-8">
                <h3
                  ref={done}
                  tabIndex={-1}
                  className="font-display text-[1.7rem] leading-tight font-medium tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)] @3xl:text-[2rem]"
                >
                  {d.booking.confirm.title}
                </h3>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[var(--d-body)]">
                  {d.booking.confirm.lead}
                </p>
                <dl className="mt-7 grid gap-px bg-[var(--d-line)]">
                  {receipt.map((row) => (
                    <div key={row.term} className="grid grid-cols-[7rem_1fr] gap-4 bg-[var(--d-bg)] px-4 py-3 @3xl:grid-cols-[9rem_1fr]">
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
                    /* The field this returns to does not exist yet, so the commit
                       effect above is told to move focus once it does. */
                    editing.current = true;
                    setSent(null);
                  }}
                  className={`${action} ${actionLine} mt-8`}
                >
                  {d.booking.confirm.edit}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(form);
                }}
                className="rounded-[2px] border border-[var(--d-line)] bg-[var(--d-bg)] px-5 py-8 @3xl:px-8"
              >
                <div className="flex flex-col gap-7">
                  <Choices
                    legend={d.booking.legends.reason}
                    name={`${uid}-reason`}
                    options={d.booking.reasons}
                    value={form.reason}
                    onSelect={(v) => set("reason", v)}
                    hint={d.booking.hints.reason}
                    required
                  />
                  <Choices
                    legend={d.booking.legends.patient}
                    name={`${uid}-patient`}
                    options={d.booking.patientTypes}
                    value={form.patient}
                    onSelect={(v) => set("patient", v)}
                  />
                  <div className="grid gap-7 @3xl:grid-cols-2">
                    <Choices
                      legend={d.booking.legends.day}
                      name={`${uid}-day`}
                      options={d.booking.days}
                      value={form.day}
                      onSelect={(v) => set("day", v)}
                      hint={d.booking.hints.when}
                    />
                    <Choices
                      legend={d.booking.legends.time}
                      name={`${uid}-time`}
                      options={d.booking.times}
                      value={form.time}
                      onSelect={(v) => set("time", v)}
                    />
                  </div>

                  <div className="grid gap-6 border-t border-[var(--d-line)] pt-7 @3xl:grid-cols-2">
                    <Field id={`${uid}-name`} name={d.booking.name}>
                      <input
                        ref={firstInput}
                        id={`${uid}-name`}
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={field}
                      />
                    </Field>
                    <Field id={`${uid}-phone`} name={d.booking.phone} hint={d.booking.hints.phone}>
                      <input
                        id={`${uid}-phone`}
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        minLength={7}
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className={field}
                      />
                    </Field>
                    <Field id={`${uid}-email`} name={d.booking.email}>
                      <input
                        id={`${uid}-email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={field}
                      />
                    </Field>
                  </div>

                  <Field id={`${uid}-notes`} name={d.booking.notes} hint={d.booking.hints.notes}>
                    <textarea
                      id={`${uid}-notes`}
                      name="notes"
                      rows={4}
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      className={`${field} resize-y`}
                    />
                  </Field>
                </div>

                <div className="mt-8 flex flex-col gap-4 @3xl:items-center @3xl:justify-between @3xl:flex-row">
                  <button type="submit" className={`${action} ${actionSolid} w-full @3xl:w-auto`}>
                    {d.booking.submit}
                  </button>
                  <p className="text-[13px] leading-relaxed text-[var(--d-body)] @3xl:max-w-[17rem]">
                    {d.booking.note}
                  </p>
                </div>
              </form>
            )}

            {/* The desk's own details, beside the form rather than below it. */}
            <div className="mt-12 @5xl:mt-0">
              <h3 className={`${label} text-[var(--d-muted)]`}>Hours</h3>
              <ul className="mt-3 list-none p-0">
                {d.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between gap-4 border-b border-dotted border-[var(--d-line)] py-2.5 text-[14px]"
                  >
                    <span className="text-[var(--d-body)]">{h.day}</span>
                    <span className="text-[var(--d-fg)]">{h.time}</span>
                  </li>
                ))}
              </ul>

              <h3 className={`mt-9 ${label} text-[var(--d-muted)]`}>Where</h3>
              <address className="mt-3 text-[14px] leading-relaxed not-italic text-[var(--d-body)]">
                {d.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                {phoneHref ? (
                  <a
                    href={phoneHref}
                    className="mt-2 inline-flex min-h-11 items-center text-[var(--d-fg)] underline decoration-[var(--d-accent)] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                  >
                    {d.phone.display}
                  </a>
                ) : (
                  <span className="mt-2 block text-[var(--d-fg)]">{d.phone.display}</span>
                )}
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — Footer. No social row: a name that looks like a link and goes
         nowhere is a dead end, and this concept has no accounts. */}
      <footer className="border-t border-[var(--d-line)] px-4 py-14 @5xl:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 @3xl:grid-cols-2 @5xl:grid-cols-4">
          <div>
            <span className={`block ${label} font-display font-semibold`}>{c.navName}</span>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[var(--d-body)]">{d.positioning}</p>
            <p className="mt-4 max-w-xs text-[12px] leading-relaxed text-[var(--d-muted)]">{DEMO_NOTE}</p>
          </div>
          <div>
            <h3 className={`${label} text-[var(--d-muted)]`}>Hours</h3>
            <ul className="mt-3 list-none p-0">
              {d.hours.map((h) => (
                <li key={h.day} className="text-[13px] leading-relaxed text-[var(--d-body)]">
                  {h.day} — {h.time}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={`${label} text-[var(--d-muted)]`}>Find us</h3>
            <address className="mt-3 text-[13px] leading-relaxed not-italic text-[var(--d-body)]">
              {d.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-1 block text-[var(--d-fg)]">{d.phone.display}</span>
            </address>
          </div>
          <div>
            <h3 className={`${label} text-[var(--d-muted)]`}>On this page</h3>
            <ul className="mt-3 flex flex-col gap-1.5 list-none p-0">
              {[...navItems, ["In pain today", "urgent"], ["Request a visit", "booking"]].map(([text, section]) => (
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
          {/* This concept builds its own footer rather than the shared one, so the
              way back to the project list is placed here too. It only renders on
              the standalone route. */}
          <DemoBackLink />
        </div>
      </footer>
      <DemoStickyCta label="Request a visit" href={anchor.href("booking")} />
    </DemoVars>
  );
}
