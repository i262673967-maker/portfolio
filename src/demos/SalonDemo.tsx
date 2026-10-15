"use client";

import { useId, useState } from "react";
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

/* 05 — Maison Lune: a small hair & beauty studio, built the way the room feels.
   Cream space, a light didone for the headline, one muted rose-clay accent, and a
   booking flow that walks a visitor from service to time in four quiet steps.

   Deliberately not the other four concepts: a centered wordmark with the nav
   split either side of it, pill actions, soft rounded plates rather than Ember's
   square hairlines, and a working multi-step form as its centrepiece. Every line
   of copy and every plate comes from `project.content.salon` — the service names,
   durations, from-prices, stylist first names, hours, street and telephone are
   invented for the fiction, and the page says so wherever it matters. No review,
   rating, before/after, "since <year>" or client count appears: the honesty rule
   forbids inventing them, and a studio this quiet has none to show.

   It is a LIGHT theme, so DemoVars already derives white cards, a real shadow and
   the faintest legal grey for this palette — nothing here hard-codes a colour. */

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

const label = "font-sans text-[12px] uppercase tracking-[0.24em]";

/* Soft, thin pills for the studio — the shared Btn carries the pill shape, the
   minimum target and the focus ring; this only adds the letterspaced label. */
const pill = "font-sans uppercase tracking-[0.14em]";

export default function SalonDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const c = project.content;
  const s = c?.salon;

  const [tab, setTab] = useState(0);
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [stylist, setStylist] = useState<string | null>(null);
  const [slot, setSlot] = useState<{ day: string; time: string } | null>(null);
  const [sent, setSent] = useState(false);

  if (!c || !s) return null;

  /* Booking step 1 is a flat list of every treatment, tagged with its family, so
     a visitor chooses a service directly instead of guessing a tab first. */
  const services = s.menu.tabs.flatMap((t) =>
    t.items.map((it) => ({ ...it, family: t.label }))
  );

  const onTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = s.menu.tabs.length - 1;
    const next =
      e.key === "ArrowRight" ? Math.min(last, tab + 1)
      : e.key === "ArrowLeft" ? Math.max(0, tab - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setTab(next);
  };

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
      {/* 1 — Header: the wordmark centred with the concept's nav split either
         side of it on a tablet/desktop frame, a Book pill and a hamburger sheet
         below that. Solid cream is its resting state; the scroll-driven
         solidify only firms the edge once the hero has moved. */}
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
              className={`${label} font-display text-[1.1rem] tracking-[0.32em] text-[var(--d-fg)] @5xl:justify-self-center`}
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

      {/* 2 — Hero: a split. Large light-serif statement on the left, one tall
         photograph on the right that drifts gently as the section scrolls. The
         copy never sits on the photograph, so its contrast is proved against the
         page colour, not guessed at unknowable pixels. */}
      <section id={anchor.id("top")} className="demo-reveal px-4 pt-10 pb-16 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-20">
        <div className="@5xl:grid @5xl:grid-cols-[1.05fr_1fr] @5xl:items-center @5xl:gap-16">
          <div className="order-2 @5xl:order-1">
            <DemoBadge />
            <DemoHeading
              preview={preview}
              className="mt-5 font-display text-[2.7rem] leading-[1.04] font-normal tracking-[-0.01em] text-[var(--d-fg)] @3xl:text-[3.4rem] @5xl:text-[4.1rem]"
            >
              {s.hero.headline}{" "}
              <span className="italic text-[var(--d-accent-text)]">{s.hero.accent}</span>
            </DemoHeading>
            <p className="mt-5 max-w-md text-[15px] leading-[1.8] text-[var(--d-body)] @3xl:text-[16px]">
              {s.hero.sub}
            </p>
            <p className={`mt-6 inline-flex items-center gap-2 ${label} text-[var(--d-accent-text)]`}>
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

          <figure className="order-1 m-0 @5xl:order-2">
            <DemoImage
              src={s.hero.src}
              alt={s.hero.alt}
              sizes="(min-width: 64rem) 46vw, 100vw"
              preload={!preview}
              imgClassName="demo-lune-parallax"
              className="aspect-[4/5] w-full rounded-2xl @3xl:aspect-[5/6]"
            />
          </figure>
        </div>
      </section>

      {/* 3 — One large light-serif statement, set on the sand surface so it reads
         as its own quiet plate. */}
      <section className="demo-reveal bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24">
        <p className="mx-auto max-w-3xl text-center font-display text-[1.5rem] leading-[1.5] font-normal text-[var(--d-fg)] @3xl:text-[2rem] @5xl:text-[2.3rem]">
          {s.statement}
        </p>
      </section>

      {/* 4 — The service menu: one tab per treatment family, each item carrying a
         duration and a from-price. A single tablist, roving tabindex, arrows and
         Home/End; one panel, labelled by the selected tab. */}
      <section id={anchor.id("menu")} className="demo-reveal px-4 py-16 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-24">
        <div className="text-center">
          <p className={`${label} text-[var(--d-accent-text)]`}>{s.menu.eyebrow}</p>
          <h2 className="mt-3 font-display text-[2rem] leading-tight font-normal tracking-tight @3xl:text-[2.5rem]">
            {s.menu.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-[var(--d-body)]">
            {s.menu.lead}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Treatment families"
          onKeyDown={onTabKey}
          className="mt-10 flex flex-wrap justify-center gap-2 @3xl:gap-3"
        >
          {s.menu.tabs.map((t, i) => {
            const selected = i === tab;
            return (
              <button
                key={t.label}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setTab(i)}
                className={`${pill} inline-flex min-h-11 items-center rounded-full border px-5 text-[var(--d-body)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                  selected
                    ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]"
                    : "border-[var(--d-line-strong)] hover:bg-[var(--d-hover)]"
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
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${tab}`}
          tabIndex={0}
          className="demo-menu-fade mt-8 grid gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)] @3xl:grid-cols-2"
        >
          {s.menu.tabs[tab].items.map((it) => (
            <div
              key={it.name}
              className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] p-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[1.25rem] leading-snug font-normal tracking-tight">
                  {it.name}
                </h3>
                <span className="shrink-0 font-sans text-[14px] text-[var(--d-accent-text)]">
                  {it.price}
                </span>
              </div>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--d-body)]">{it.desc}</p>
              <p className={`mt-3 ${label} text-[var(--d-muted)]`}>{it.duration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — The booking flow: the concept's centrepiece. Four steps, choices held
         in state, a summary that rewrites itself live. Nothing submits; the review
         step answers honestly. Each choice is a real radio group, so a keyboard
         visitor and a screen reader get the same structure a pointer user sees. */}
      <section
        id={anchor.id("book")}
        className="demo-reveal border-y border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className={`${label} text-[var(--d-accent-text)]`}>{s.booking.eyebrow}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-tight font-normal tracking-tight @3xl:text-[2.5rem]">
              {s.booking.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-[var(--d-body)]">
              {s.booking.body}
            </p>
          </div>

          {/* Step rail: the four names, with the current one marked. */}
          <ol className="mt-10 flex list-none flex-wrap justify-center gap-x-6 gap-y-2 p-0">
            {s.booking.steps.map((name, i) => (
              <li
                key={name}
                aria-current={i === step ? "step" : undefined}
                className={`${label} inline-flex items-center gap-2 ${
                  i === step ? "text-[var(--d-accent-text)]" : "text-[var(--d-muted)]"
                }`}
              >
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full border text-[12px] tracking-normal ${
                    i < step
                      ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]"
                      : i === step
                        ? "border-[var(--d-accent)] text-[var(--d-accent-text)]"
                        : "border-[var(--d-line-strong)]"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </span>
                {name}
              </li>
            ))}
          </ol>

          <p role="status" className="sr-only">
            Step {step + 1} of {s.booking.steps.length}: {s.booking.steps[step]}
          </p>

          <div className="mt-8 grid gap-8 @5xl:grid-cols-[1.4fr_1fr] @5xl:items-start">
            {/* The live step panel, keyed so it fades in on each change. */}
            <div key={step} className="demo-lune-step">
              {step === 0 && (
                <fieldset className="border-0 p-0">
                  <legend className={`${label} text-[var(--d-muted)]`}>Choose a service</legend>
                  <div className="mt-4 grid gap-2 @3xl:grid-cols-2">
                    {services.map((it) => (
                      <label
                        key={it.name}
                        className={`flex cursor-pointer items-baseline gap-3 rounded-xl border p-4 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--d-accent)] ${
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
                  <legend className={`${label} text-[var(--d-muted)]`}>Choose a stylist</legend>
                  <div className="mt-4 grid gap-3 @3xl:grid-cols-3">
                    {s.team.members.map((m) => (
                      <label
                        key={m.name}
                        className={`flex cursor-pointer flex-col items-start gap-2 rounded-2xl border p-4 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--d-accent)] ${
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
                  <legend className={`${label} text-[var(--d-muted)]`}>Pick a time</legend>
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
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.booking.times.map((t) => (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={slot.time === t}
                          onClick={() => setSlot({ day: slot.day, time: t })}
                          className={`inline-flex min-h-11 items-center rounded-xl border px-4 font-sans text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                            slot.time === t
                              ? "border-[var(--d-accent)] bg-[var(--d-card)] text-[var(--d-fg)]"
                              : "border-[var(--d-line)] text-[var(--d-body)] hover:bg-[var(--d-hover)]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="mt-4 text-[12px] leading-relaxed text-[var(--d-muted)]">
                    These slots are placeholders for the concept, not real availability.
                  </p>
                </fieldset>
              )}

              {step === 3 && (
                <div className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] p-5">
                  <h3 className={`${label} text-[var(--d-muted)]`}>Your appointment</h3>
                  <dl className="mt-4 grid gap-x-6 gap-y-3 @3xl:grid-cols-[auto_1fr]">
                    {summary.map(([k, v]) => (
                      <div key={k} className="contents">
                        <dt className="text-[13px] uppercase tracking-[0.12em] text-[var(--d-muted)]">
                          {k}
                        </dt>
                        <dd className="text-[15px] text-[var(--d-fg)]">{v || "Not chosen yet"}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:justify-between">
                    <button
                      type="button"
                      onClick={() => setSent(true)}
                      className={`${pill} inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--d-accent)] px-5 font-sans text-[12px] font-semibold text-[var(--d-on-accent)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]`}
                    >
                      {s.booking.submit}
                    </button>
                    <p className="text-[12px] leading-relaxed text-[var(--d-muted)] @3xl:max-w-[15rem]">
                      {s.booking.note}
                    </p>
                  </div>
                  {sent && (
                    <p role="status" className="mt-4 text-[12px] leading-relaxed text-[var(--d-body)]">
                      {c?.formNote ?? DEMO_NOTE}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* The live summary side panel: it rewrites as choices are made, so the
                consequence of each tap is visible before the visitor confirms. */}
            <aside
              aria-live="polite"
              aria-label="Booking summary"
              className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-bg)] p-5 @5xl:sticky @5xl:top-24"
            >
              <h3 className={`${label} text-[var(--d-accent-text)]`}>Summary</h3>
              <dl className="mt-4 grid gap-1.5">
                {summary.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3 border-b border-dotted border-[var(--d-line)] py-2 last:border-b-0">
                    <dt className="text-[13px] text-[var(--d-muted)]">{k}</dt>
                    <dd className="text-right text-[14px] text-[var(--d-fg)]">{v || "—"}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          {/* Step controls sit under the panel, not inside it, so they never move
             when the content height changes. Back disappears at the first step
             rather than sitting there dead, and Continue only advances once the
             current step has a choice — with a visible hint saying so. */}
          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <Btn variant="ghost" className={pill} onClick={() => setStep((n) => Math.max(0, n - 1))}>
                Back
              </Btn>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-3">
              {!isLast && !complete[step] && (
                <span className={`${label} text-[var(--d-muted)]`}>Make a choice to continue</span>
              )}
              {!isLast && (
                <Btn className={pill} onClick={() => complete[step] && setStep((n) => n + 1)}>
                  Continue
                </Btn>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6 — The team: three stylists as monogram plates, never face photographs,
         so no person is implied behind a made-up name. */}
      <section id={anchor.id("team")} className="demo-reveal px-4 py-16 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-24">
        <div className="text-center">
          <p className={`${label} text-[var(--d-accent-text)]`}>{s.team.eyebrow}</p>
          <h2 className="mt-3 font-display text-[2rem] leading-tight font-normal tracking-tight @3xl:text-[2.5rem]">
            {s.team.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-[var(--d-body)]">
            {s.team.intro}
          </p>
        </div>
        <ul className="mt-10 grid list-none gap-4 p-0 @3xl:grid-cols-3">
          {s.team.members.map((m) => (
            <li key={m.name} className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] p-6 text-center">
              <span
                aria-hidden="true"
                className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--d-accent)]/15 font-display text-[1.6rem] text-[var(--d-accent-text)]"
              >
                {m.initials}
              </span>
              <h3 className="mt-4 font-display text-[1.3rem] font-normal tracking-tight">{m.name}</h3>
              <p className={`mt-1 ${label} text-[var(--d-muted)]`}>{m.role}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--d-body)]">{m.focus}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 7 — Gallery: the room, photographed between appointments. Each plate is a
         card that lifts a few pixels on hover (a transform + shadow, gated behind
         hover:hover and reduced-motion), with its caption always legible beneath
         it rather than only revealed on hover. */}
      <section id={anchor.id("gallery")} className="demo-reveal bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-2 @3xl:flex-row @3xl:items-end @3xl:justify-between">
            <h2 className="font-display text-[1.9rem] leading-tight font-normal tracking-tight @3xl:text-[2.3rem]">
              <span className={`mr-3 ${label} align-middle text-[var(--d-accent-text)]`}>
                {s.gallery.eyebrow}
              </span>
              {s.gallery.title}
            </h2>
            <p className="max-w-sm text-[13px] leading-relaxed text-[var(--d-body)]">
              {s.gallery.lead}
            </p>
          </div>
          <ul className="mt-10 grid list-none gap-4 p-0 @3xl:grid-cols-2 @5xl:grid-cols-3">
            {s.gallery.items.map((it) => (
              <li key={it.src} className="demo-lune-lift rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] p-2">
                <DemoImage
                  src={it.src}
                  alt={it.alt}
                  sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 46vw, 100vw"
                  className="aspect-[4/3] w-full rounded-xl"
                />
                <figcaption className="px-2 py-2.5 text-[13px] leading-relaxed text-[var(--d-body)]">
                  {it.caption}
                </figcaption>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — The studio's three values, then the new-client offer as a clearly
         labelled concept strip. */}
      <section className="demo-reveal px-4 py-16 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-24">
        <p className={`${label} text-center text-[var(--d-accent-text)]`}>{s.studio.eyebrow}</p>
        <h2 className="mt-3 text-center font-display text-[2rem] leading-tight font-normal tracking-tight @3xl:text-[2.5rem]">
          {s.studio.title}
        </h2>
        <ul className="mt-10 grid list-none gap-6 p-0 @3xl:grid-cols-3">
          {s.studio.points.map((p) => (
            <li key={p.title} className="text-center @3xl:text-left">
              <h3 className="font-display text-[1.3rem] font-normal tracking-tight">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--d-body)]">{p.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-[var(--d-line-strong)] bg-[color-mix(in_srgb,var(--d-accent)_8%,var(--d-bg))] p-6 text-center @3xl:p-8">
          <span className={`${label} text-[var(--d-accent-text)]`}>Concept offer</span>
          <h3 className="mt-2 font-display text-[1.6rem] font-normal tracking-tight @3xl:text-[2rem]">
            {s.offer.title}
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-[14px] leading-relaxed text-[var(--d-body)]">
            {s.offer.body}
          </p>
          <div className="mt-6">
            <Btn href={anchor.href("book")} className={pill}>
              {s.hero.ctaPrimary}
            </Btn>
          </div>
        </div>
      </section>

      {/* 9 — Visit: an address, the week's hours, a phone, and a map panel that
         names itself as illustrative rather than showing a place it is not. The
         number is only a live `tel:` link on the standalone route, never inside a
         device frame. */}
      <section
        id={anchor.id("visit")}
        className="demo-reveal border-t border-[var(--d-line)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-10 @5xl:grid-cols-2 @5xl:gap-16">
          <div>
            <p className={`${label} text-[var(--d-accent-text)]`}>{s.visit.eyebrow}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-tight font-normal tracking-tight @3xl:text-[2.5rem]">
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
              className="mt-3 inline-flex min-h-11 items-center font-display text-[1.3rem] text-[var(--d-fg)] underline decoration-[var(--d-accent)] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
            >
              {s.visit.phone.display}
            </a>
            <div className="mt-8">
              <h3 className={`${label} text-[var(--d-muted)]`}>Hours</h3>
              <ul className="mt-3 list-none p-0">
                {s.visit.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between gap-4 border-b border-dotted border-[var(--d-line)] py-2.5 text-[14px]"
                  >
                    <span className="text-[var(--d-body)]">{h.day}</span>
                    <span className="text-[var(--d-fg)]">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The map stand-in: no real location can be shown, so the panel is
             honest about being illustrative and offers the one action that works. */}
          <div className="relative overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-soft)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--d-line)_1px,transparent_1px),linear-gradient(90deg,var(--d-line)_1px,transparent_1px)] [background-size:34px_34px]"
            />
            <div className="relative flex h-full min-h-[16rem] flex-col items-center justify-center gap-4 p-6 text-center">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--d-accent)] text-[var(--d-on-accent)]">
                <span aria-hidden="true" className="text-[18px]">◎</span>
              </span>
              <p className={`${label} text-[var(--d-muted)]`}>{s.visit.mapNote}</p>
              <Btn href={anchor.href("book")} className={pill}>
                {s.hero.ctaPrimary}
              </Btn>
            </div>
          </div>
        </div>
      </section>

      <DemoFooter name={c.navName} />
      <DemoStickyCta label="Book" href={anchor.href("book")} />
    </DemoVars>
  );
}
