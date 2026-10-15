"use client";

import { useId, useState } from "react";
import {
  ArrowRight,
  Bath,
  Check,
  Clock,
  Flame,
  KeyRound,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Siren,
  Waves,
} from "lucide-react";
import type { DemoProps } from "./_shared";
import {
  DemoBadge,
  DemoFaq,
  DemoFooter,
  DemoHeading,
  DemoImage,
  DemoMobileMenu,
  DemoNav,
  DemoStickyCta,
  DemoVars,
  useDemoAnchors,
  type DemoNavItem,
} from "./_shared";

/* 02 — FlowRight Plumbing: bright, bold, call-first.
   One electric blue does the acting, aqua only ever works as a fill, and the
   number is reachable from every scroll position. Its own system rather than a
   recoloured local-service layout: white cards on grey panels, a bento service
   grid, a booking card that floats over the hero photograph and rewrites its own
   "what happens next" panel when the visitor changes what is wrong.

   No rates, no response guarantees and no coverage claim are invented — the three
   sections that would normally carry them each say why they don't. */

/* Service order matches content.services in src/lib/data.ts. */
const SERVICE_ICONS = [Siren, Flame, Search, Bath, Waves, KeyRound];

/* The bento shape, read by position because the shape IS the design: one
   dominant card, two halves, a pair of singles, then two wides. Applied only at
   the desktop frame — below that the cards simply stack. */
const CARD_SPAN = [
  "@5xl:col-span-2 @5xl:row-span-2",
  "@5xl:col-span-2",
  "",
  "",
  "@5xl:col-span-2",
  "@5xl:col-span-2",
];

export default function PlumberDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [service, setService] = useState(0);
  const [time, setTime] = useState(0);
  const [area, setArea] = useState("");
  const [sent, setSent] = useState(false);
  /* Inside a device frame a `tel:` link would pull the visitor off the portfolio
     page they were looking at, so the number stops being a link there and answers
     honestly when it is pressed instead. */
  const [callNote, setCallNote] = useState(false);

  const c = project.content;
  if (!c) return null;

  const phone = c.phone;
  const callHref = preview ? undefined : phone?.href;
  const askCall = () => setCallNote((v) => !v);

  const hero = c.hero;
  const co = c.callout;
  const chips = c.trustChips ?? [];
  const availability = c.availability ?? "";
  const emergency = c.emergency;
  const quoting = c.quoting;
  const areas = c.areas;
  const process = c.process;

  /* The mini-form's live reply. `options` is index-aligned with `services`, so
     picking a different problem changes what the concept says happens next. */
  const options = co?.options ?? [];
  const times = co?.times ?? [];
  const option = options.length ? options[service % options.length] : undefined;
  const chosenTime = times.length ? times[time % times.length] : undefined;

  const card =
    "rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] shadow-[var(--d-shadow)]";
  const field =
    "min-h-11 w-full rounded-xl border border-[var(--d-line-strong)] bg-[var(--d-field)] px-3 text-[14px] text-[var(--d-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
  const fieldLabel = "block text-[12px] font-bold text-[var(--d-fg)]";

  /* Every label points at a section this instance actually renders. */
  const navItems: DemoNavItem[] = [
    ["Services", "services"],
    ...(process ? [["How it works", "process"] as DemoNavItem] : []),
    ...(quoting ? [["Pricing", "prices"] as DemoNavItem] : []),
    ...(areas ? [["Areas", "areas"] as DemoNavItem] : []),
    ["FAQ", "faq"],
  ];

  /* Which frame a control appears in is a separate question from what it looks
     like, so it lives on a wrapper: a control that is always `inline-flex` and
     sometimes `hidden` would put two display utilities in the same class list,
     where neither can beat the other on specificity. */
  const showIn = (show: string | undefined, node: React.ReactNode) =>
    node && show ? <span className={show}>{node}</span> : node;

  /* The header and closing panel's booking action. Not a shared `Btn`: the solid
     variant paints its own accent fill, and both of these need a different one. */
  const bookButton = (className = "", show?: string) =>
    showIn(
      show,
      <a
        href={anchor.href("book")}
        className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[var(--d-fg)] px-4 font-display font-extrabold text-[var(--d-bg)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-fg)] ${className}`}
      >
        {c.ctaPrimary}
      </a>,
    );

  /* One decision, made once: on the concept's own page every number is a live
     dial; inside a device frame it becomes a button that answers honestly,
     because a `tel:` link would pull the visitor off the page they are looking
     at. Everything below is the same link or button wearing different classes. */
  const asCall = (className: string, children: React.ReactNode) => {
    if (!phone) return null;
    return callHref ? (
      <a href={callHref} className={className}>
        {children}
      </a>
    ) : (
      <button type="button" onClick={askCall} className={className}>
        {children}
      </button>
    );
  };

  /* The number appears in the strip, the header, the hero, the emergency band and
     the thumb bar — one control, five sizes. */
  const callButton = (
    children: React.ReactNode,
    {
      className = "",
      tone = "accent",
      icon = true,
      show,
    }: {
      className?: string;
      tone?: "accent" | "ink" | "aqua";
      icon?: boolean;
      show?: string;
    } = {},
  ) =>
    showIn(
      show,
      asCall(
        `inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-display font-extrabold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${
          tone === "ink"
            ? "bg-[var(--d-fg)] text-[var(--d-bg)] focus-visible:outline-[var(--d-bg)]"
            : tone === "aqua"
              ? "bg-[var(--d-accent-2)] text-[var(--d-fg)] focus-visible:outline-[var(--d-bg)]"
              : "bg-[var(--d-accent)] text-[var(--d-on-accent)] focus-visible:outline-[var(--d-accent-text)]"
        } ${className}`,
        <>
          {icon && <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />}
          {children}
        </>,
      ),
    );

  return (
    <DemoVars project={project}>
      {/* Availability strip — the answer to "will anyone actually pick up". */}
      <div className="bg-[var(--d-fg)] px-4 py-2 @5xl:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center @3xl:justify-between @3xl:text-left">
          {availability && (
            <p className="text-[12px] font-bold text-[var(--d-bg)]">{availability}</p>
          )}
          {callButton(phone?.display, { tone: "aqua", className: "px-2.5 text-[13px]" })}
        </div>
      </div>

      <header className="sticky top-0 z-20 border-b border-[var(--d-line)] bg-[var(--d-bg)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 @5xl:px-8">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--d-accent)] font-display text-[13px] font-extrabold text-[var(--d-on-accent)]">
              {c.logoLetter}
            </span>
            <span className="truncate font-display text-[15px] font-extrabold tracking-tight">
              {c.navName}
            </span>
          </div>

          <DemoNav anchor={anchor} items={navItems} className="gap-5" />

          <div className="flex shrink-0 items-center gap-2">
            {/* The number itself on the wide frames, a bare dial button on the
                narrow ones — the call is never more than a tap away. */}
            {callButton(phone?.display, { className: "px-4 text-[14px]", show: "hidden @3xl:inline-flex" })}
            {callButton(<span className="sr-only">{phone?.label}</span>, {
              className: "w-11 px-0",
              show: "inline-flex @3xl:hidden",
            })}
            {bookButton("text-[14px]", "hidden @3xl:inline-flex")}
            <DemoMobileMenu anchor={anchor} items={navItems} action={["Book a callout", "book"]} />
          </div>
        </div>
      </header>

      {/* The honest reply to a number that cannot be dialled from a frame. */}
      {callNote && (
        <p
          role="status"
          className="border-b border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-2 text-center text-[12px] leading-relaxed text-[var(--d-body)] @5xl:px-8"
        >
          {emergency?.note ?? "Concept site: this is a fictional business."}
        </p>
      )}

      {/* Hero — the ask on the left, the proof and the booking card on the right. */}
      <section className="border-b border-[var(--d-line)] bg-[var(--d-soft)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 @3xl:py-14 @5xl:grid-cols-[1.05fr_1fr] @5xl:items-start @5xl:gap-12 @5xl:px-8 @5xl:py-16">
          <div>
            <DemoBadge />
            <DemoHeading
              preview={preview}
              className="mt-4 font-display text-[2rem] leading-[1.03] font-extrabold tracking-tight @3xl:text-[2.6rem] @5xl:text-[3.1rem]"
            >
              {c.headline}{" "}
              <span className="text-[var(--d-accent-text)]">{c.headlineAccent}</span>
            </DemoHeading>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--d-body)]">{c.intro}</p>

            <div className="mt-7 flex flex-col gap-3 @3xl:flex-row">
              {callButton(`Call ${phone?.display ?? ""}`, {
                className: "w-full px-6 text-[15px] @3xl:w-auto",
              })}
              <a
                href={anchor.href("prices")}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-[var(--d-fg)] px-6 font-display text-[15px] font-extrabold text-[var(--d-fg)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-fg)] @3xl:w-auto"
              >
                {c.ctaSecondary}
              </a>
            </div>

            {/* Qualitative chips only — no counts, years or ratings to invent. */}
            {chips.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <li
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--d-line-strong)] bg-[var(--d-card)] px-3 py-1.5 text-[12px] font-semibold text-[var(--d-body)]"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-[var(--d-accent-text)]" aria-hidden="true" />
                    {chip}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative">
            {hero && (
              <DemoImage
                src={hero.src}
                alt={hero.alt}
                preload={!preview}
                sizes="(min-width: 64rem) 34rem, (min-width: 48rem) 46vw, 100vw"
                className="h-[19rem] w-full rounded-3xl shadow-[var(--d-shadow)] @3xl:h-[24rem] @5xl:h-[27rem]"
              />
            )}

            {/* The signature card: it sits over the photograph, and the panel at
                its foot answers back as the choices change. */}
            {co && (
              <div
                id={anchor.id("book")}
                className={`${card} relative z-10 -mt-10 scroll-mt-28 px-4 py-5 @3xl:ml-5 @3xl:-mr-1 @3xl:w-[19.5rem] @3xl:p-5 @3xl:-mt-24`}
              >
                {/* Level 2 on the concept's own page, where the hero headline is
                    the only h1; the sections below the fold are also h2. */}
                <h2 className="font-display text-[17px] font-extrabold tracking-tight">{co.title}</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-[var(--d-body)]">{co.intro}</p>

                <div className="mt-4 space-y-3">
                  <div>
                    <label htmlFor={`${uid}-service`} className={fieldLabel}>
                      {co.serviceLabel}
                    </label>
                    <select
                      id={`${uid}-service`}
                      value={service}
                      onChange={(e) => {
                        setService(Number(e.target.value));
                        setSent(false);
                      }}
                      className={`${field} mt-1.5`}
                    >
                      {(c.services ?? []).map((s, i) => (
                        <option key={s.title} value={i}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`${uid}-area`} className={fieldLabel}>
                      {co.areaLabel}
                    </label>
                    <input
                      id={`${uid}-area`}
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder={co.areaPlaceholder}
                      className={`${field} mt-1.5`}
                    />
                  </div>

                  <div>
                    <label htmlFor={`${uid}-time`} className={fieldLabel}>
                      {co.timeLabel}
                    </label>
                    <select
                      id={`${uid}-time`}
                      value={time}
                      onChange={(e) => {
                        setTime(Number(e.target.value));
                        setSent(false);
                      }}
                      className={`${field} mt-1.5`}
                    >
                      {times.map((t, i) => (
                        <option key={t} value={i}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSent((v) => !v)}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full bg-[var(--d-accent)] px-4 font-display text-[14px] font-extrabold text-[var(--d-on-accent)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent-text)]"
                  >
                    {co.submit}
                  </button>

                  {sent && (
                    <p
                      role="status"
                      className="nudge-in rounded-xl bg-[var(--d-soft)] p-3 text-[12px] leading-relaxed text-[var(--d-body)]"
                    >
                      {co.sendNote}
                    </p>
                  )}
                </div>

                {/* Live preview — the concept's answer, labelled as an illustration
                    rather than a promise. */}
                {option && (
                  <div aria-live="polite" className="mt-4 border-t border-[var(--d-line)] pt-4">
                    <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--d-muted)]">
                      {co.nextTitle}
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--d-accent-2)] px-2.5 py-1.5 font-display text-[12px] font-extrabold text-[var(--d-fg)]">
                        <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {option.window}
                      </span>
                      {chosenTime && (
                        <span className="text-[12px] font-semibold text-[var(--d-body)]">
                          {chosenTime}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--d-body)]">
                      {option.next}
                    </p>
                    <p className="mt-2 text-[12px] leading-relaxed text-[var(--d-muted)]">{co.note}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Emergency band — the one heavy aqua moment, with ink navy on it. */}
      {emergency && (
        <section className="bg-[var(--d-accent-2)] px-4 py-8 @5xl:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-[1.35rem] leading-tight font-extrabold tracking-tight text-[var(--d-fg)] @3xl:text-[1.6rem]">
                {emergency.title}
              </h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--d-fg)]">{emergency.body}</p>
            </div>
            <div className="shrink-0">
              {callButton(emergency.callLabel, {
                tone: "ink",
                className: "w-full px-6 text-[15px] @3xl:w-auto",
              })}
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--d-fg)]">{emergency.note}</p>
            </div>
          </div>
        </section>
      )}

      {/* Services — bento: one dominant card, then varied sizes. */}
      <section
        id={anchor.id("services")}
        className="scroll-mt-28 px-4 py-12 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-16"
      >
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--d-accent-text)]">
          Services
        </p>
        <h2 className="mt-2 font-display text-[1.7rem] font-extrabold tracking-tight @3xl:text-3xl">
          {c.servicesTitle}
        </h2>
        <div className="mt-8 grid gap-4 @md:grid-cols-2 @5xl:grid-cols-4 @5xl:grid-rows-3">
          {(c.services ?? []).map((s, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length] ?? Siren;
            const big = i === 0;
            return (
              <div
                key={s.title}
                className={`${card} demo-reveal flex flex-col p-5 transition-transform duration-200 hover:-translate-y-1 @5xl:p-6 ${CARD_SPAN[i] ?? ""}`}
              >
                <span
                  className={`grid shrink-0 place-items-center rounded-xl bg-[var(--d-accent)]/10 text-[var(--d-accent-text)] ${
                    big ? "h-12 w-12" : "h-10 w-10"
                  }`}
                >
                  <Icon className={big ? "h-6 w-6" : "h-5 w-5"} aria-hidden="true" />
                </span>
                <h3
                  className={`mt-4 font-display font-extrabold tracking-tight ${
                    big ? "text-[1.3rem]" : "text-[1rem]"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`mt-1.5 leading-relaxed text-[var(--d-body)] ${
                    big ? "max-w-sm text-[15px]" : "text-[14px]"
                  }`}
                >
                  {s.body}
                </p>
                {big && (
                  <a
                    href={anchor.href("book")}
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-[13px] font-bold text-[var(--d-accent-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                  >
                    Book this
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* How a callout works — three steps joined by a rail that draws itself. */}
      {process && (
        <section
          id={anchor.id("process")}
          className="scroll-mt-28 border-y border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-12 @5xl:px-8 @5xl:py-16"
        >
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--d-accent-text)]">
              {process.eyebrow}
            </p>
            <h2 className="mt-2 max-w-2xl font-display text-[1.7rem] font-extrabold leading-tight tracking-tight @3xl:text-3xl">
              {process.title}
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--d-body)]">
              {process.intro}
            </p>

            <div className="mt-10">
              {/* Each step but the last carries the segment that joins it to the
                  next: down the stacked list on the narrow frames, across to the
                  next circle on the wide ones. The resting state is the finished
                  line, and the scroll-driven draw only runs where it is allowed. */}
              <ol className="grid gap-8 @3xl:grid-cols-3 @3xl:gap-6">
                {process.steps.map((step, i) => (
                  <li key={step.no} className="relative flex gap-4 @3xl:block">
                    {i < process.steps.length - 1 && (
                      <>
                        <span
                          aria-hidden="true"
                          className="demo-rail-y absolute -bottom-8 left-[21px] top-[46px] w-0.5 origin-top rounded-full bg-[var(--d-accent)]/35 @3xl:hidden"
                        />
                        <span
                          aria-hidden="true"
                          className="demo-rail-x absolute -right-6 left-[46px] top-[21px] hidden h-0.5 origin-left rounded-full bg-[var(--d-accent)]/35 @3xl:block"
                        />
                      </>
                    )}
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[var(--d-accent)] bg-[var(--d-bg)] font-display text-[13px] font-extrabold text-[var(--d-accent-text)]">
                      {step.no}
                    </span>
                    <div className="@3xl:mt-5 @3xl:pr-6">
                      <h3 className="font-display text-[1rem] font-extrabold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--d-body)]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Pricing clarity — the sequence, and no invented rates. */}
      {quoting && (
        <section
          id={anchor.id("prices")}
          className="scroll-mt-28 px-4 py-12 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-16"
        >
          <div className="grid gap-8 @5xl:grid-cols-[1fr_1.2fr] @5xl:items-start">
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--d-accent-text)]">
                {quoting.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight @3xl:text-3xl">
                {quoting.title}
              </h2>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--d-body)]">
                {quoting.intro}
              </p>
              <p className="mt-5 flex max-w-sm items-start gap-2 rounded-xl border border-[var(--d-line)] bg-[var(--d-soft)] p-3 text-[12px] leading-relaxed text-[var(--d-body)]">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-accent-text)]" aria-hidden="true" />
                {quoting.note}
              </p>
            </div>

            <ol className="grid gap-3 @md:grid-cols-2">
              {quoting.steps.map((step, i) => (
                <li key={step.title} className={`${card} p-5`}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-[1.6rem] font-extrabold leading-none text-[var(--d-accent)]">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-[1rem] font-extrabold tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--d-body)]">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Service area — a map-like panel, labelled as a design element. */}
      {areas && (
        <section
          id={anchor.id("areas")}
          className="scroll-mt-28 border-t border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-12 @5xl:px-8 @5xl:py-16"
        >
          <div className="mx-auto grid max-w-6xl gap-8 @5xl:grid-cols-[1fr_1.25fr] @5xl:items-center">
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--d-accent-text)]">
                {areas.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight @3xl:text-3xl">
                {areas.title}
              </h2>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--d-body)]">
                {areas.intro}
              </p>
              <p className="mt-4 max-w-sm text-[12px] leading-relaxed text-[var(--d-muted)]">
                {areas.note}
              </p>
            </div>

            <div className={`${card} overflow-hidden`}>
              {/* Grid lines and a river stroke are decoration; the list under them
                  is what the section exists to carry. */}
              <div
                aria-hidden="true"
                className="relative h-24 border-b border-[var(--d-line)] bg-[var(--d-card)]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, color-mix(in oklab, var(--d-accent) 14%, transparent) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, color-mix(in oklab, var(--d-accent) 14%, transparent) 0 1px, transparent 1px 28px), linear-gradient(115deg, transparent 54%, color-mix(in oklab, var(--d-accent-2) 55%, transparent) 55%, transparent 62%)",
                }}
              >
                <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--d-accent)] text-[var(--d-on-accent)] shadow-[var(--d-shadow)]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <ul className="grid gap-px bg-[var(--d-line)] p-px @md:grid-cols-2">
                {areas.places.map((place) => (
                  <li
                    key={place}
                    className="flex items-center gap-2 bg-[var(--d-card)] px-4 py-3 text-[14px] font-semibold text-[var(--d-fg)]"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-[var(--d-accent-text)]" aria-hidden="true" />
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section
        id={anchor.id("faq")}
        className="scroll-mt-28 px-4 pb-12 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8"
      >
        <h2 className="font-display text-[1.7rem] font-extrabold tracking-tight @3xl:text-3xl">
          {c.faqTitle}
        </h2>
        <div className={`${card} mt-4 p-1.5 @5xl:p-2`}>
          <DemoFaq items={c.faqs ?? []} />
        </div>
      </section>

      {/* Closing call — blue floor, the number at display size. */}
      <section id={anchor.id("contact")} className="scroll-mt-28 px-4 py-12 @5xl:px-8 @5xl:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-3xl bg-[var(--d-accent)] px-5 py-10 text-[var(--d-on-accent)] @3xl:px-10 @5xl:grid-cols-[1.1fr_1fr] @5xl:items-center @5xl:px-14 @5xl:py-14">
          <div>
            <h2 className="font-display text-[1.6rem] font-extrabold leading-tight tracking-tight @3xl:text-[2.1rem]">
              {c.ctaTitle}
            </h2>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed">{c.ctaBody}</p>
            <div className="mt-6">{bookButton("px-6 text-[15px]")}</div>
          </div>

          {phone && (
            <div className="@5xl:text-right">
              {availability && (
                <p className="font-mono text-[12px] uppercase tracking-[0.16em]">{availability}</p>
              )}
              {/* The number at the size it deserves on a call-first site. */}
              {/* The number at the size it deserves on a call-first site. The
                  underline is white, not aqua: aqua on blue is 2.46:1, and a link
                  boundary has to read. */}
              {asCall(
                "mt-1 inline-flex min-h-11 items-center font-display text-[2rem] leading-none font-extrabold tracking-tight underline decoration-[var(--d-bg)] decoration-4 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-bg)] @5xl:text-[2.8rem]",
                phone.display,
              )}
            </div>
          )}
        </div>
      </section>

      {/* Thumb bar: dial and book, both reachable from any section. */}
      <DemoStickyCta
        label={c.ctaPrimary ?? ""}
        href={anchor.href("book")}
        secondary={
          phone
            ? callHref
              ? { label: "Call now", href: callHref }
              : { label: "Call now", onClick: askCall }
            : undefined
        }
      />

      <DemoFooter name={project.name} />
    </DemoVars>
  );
}
