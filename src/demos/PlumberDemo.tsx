"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, Droplets, Flame, MapPin, Phone } from "lucide-react";
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

/* 02 — FlowRight Plumbing: plumbing AND heating, on one page, for two entirely
   different visitors.

   The composition follows that split rather than a template. Someone with water
   where it should not be gets the number at signage size and three quick picks
   that write the job into the form for them; someone planning a bathroom or a
   boiler gets a service ledger grouped by the kind of call, a heating section in
   the palette's warm colour, and a quote request that validates what it asks for
   before it claims anything.

   Type is Barlow Condensed over Barlow — van lettering, not a serif — and the
   only two colours doing work are cold-water blue for action and amber for heat.
   No rates, insurance claims, response guarantees or coverage promises are
   invented; the four sections that would normally carry them each say why they
   do not. */

export default function PlumberDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [callNote, setCallNote] = useState(false);
  const [job, setJob] = useState("");
  const [quote, setQuote] = useState<Record<string, string> | null>(null);
  const [areaQuery, setAreaQuery] = useState("");
  const [areaAnswer, setAreaAnswer] = useState<string | null>(null);
  const success = useRef<HTMLHeadingElement>(null);

  const c = project.content;
  const h = c?.home;
  const phone = c?.phone;
  const callHref = preview ? undefined : phone?.href;
  const askCall = () => setCallNote((v) => !v);

  /* The confirmation is moved to, not just shown: a keyboard or screen-reader
     visitor who pressed send should land on the answer, not stay on the button
     they just pressed. An effect runs on the commit that renders it, so a
     backgrounded tab still gets the focus. */
  useEffect(() => {
    if (quote) success.current?.focus();
  }, [quote]);

  /* A quick pick writes the job and moves the form into view. It deliberately does
     not move focus: the select is one control inside a section the visitor needs to
     see whole, and focusing it would scroll somewhere other than the heading. */
  const pickJob = (title: string) => {
    setJob(title);
    setQuote(null);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(anchor.id("quote"))?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  const card = "rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] shadow-[var(--d-shadow)]";
  const label = "font-mono text-[12px] uppercase tracking-[0.14em]";
  const field =
    "min-h-11 w-full rounded-xl border border-[var(--d-line-strong)] bg-[var(--d-field)] px-3 text-[14px] text-[var(--d-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
  const solid =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--d-accent)] px-5 font-display text-[15px] font-extrabold text-[var(--d-on-accent)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-fg)]";
  const quiet =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-[var(--d-fg)] px-5 font-display text-[15px] font-extrabold text-[var(--d-fg)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";

  if (!c || !h) return null;

  const areas = c.areas;
  const places = areas?.zones.flatMap((z) => z.places) ?? [];
  const jobs = h.groups.flatMap((g) => g.items.map((i) => i.title));
  const proc = c.process;
  const procSteps = proc?.steps ?? [];

  const navItems: DemoNavItem[] = [
    ["Services", "services"],
    ["Heating", "heating"],
    ["Get a quote", "quote"],
    ["Areas", "areas"],
    ["FAQ", "faq"],
  ];

  /* One decision, made once: on the concept's own page every number is a live
     dial; inside a device frame it becomes a button that answers honestly, because
     a `tel:` link would pull the visitor off the page they are looking at. */
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

  const callButton = (children: React.ReactNode, className = "", tone: "accent" | "amber" | "ink" = "accent") =>
    asCall(
      `inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-display font-extrabold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        tone === "ink"
          ? "bg-[var(--d-fg)] text-[var(--d-bg)] focus-visible:outline-[var(--d-accent)]"
          : tone === "amber"
            ? "bg-[var(--d-accent-2)] text-[var(--d-fg)] focus-visible:outline-[var(--d-bg)]"
            : "bg-[var(--d-accent)] text-[var(--d-on-accent)] focus-visible:outline-[var(--d-bg)]"
      } ${className}`,
      <>
        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
        {children}
      </>,
    );

  const checkArea = () => {
    const q = areaQuery.trim().toLowerCase();
    if (!q) {
      setAreaAnswer(h.areaCheck.blank);
      return;
    }
    const found =
      places.find((p) => p.toLowerCase() === q) ??
      places.find((p) => {
        const n = p.toLowerCase();
        return n.includes(q) || q.includes(n);
      });
    setAreaAnswer(
      (found ? h.areaCheck.hit : h.areaCheck.miss).replace("{place}", found ?? areaQuery.trim()),
    );
  };

  return (
    <DemoVars project={project}>
      {/* Availability strip — the answer to "will anyone actually pick up". */}
      <div className="bg-[var(--d-fg)] px-4 py-2 @5xl:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-center @3xl:justify-between @3xl:text-left">
          <p className="flex items-center gap-2 text-[12px] font-semibold text-[var(--d-bg)]">
            <span
              aria-hidden="true"
              className="demo-pulse h-2 w-2 shrink-0 rounded-full bg-[var(--d-accent-2)]"
            />
            {c.availability}
          </p>
          {phone && callButton(phone.display, "px-3 text-[13px]", "amber")}
        </div>
      </div>

      <header className="sticky top-0 z-20 border-b border-[var(--d-line)] bg-[var(--d-bg)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 @5xl:px-8">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-[var(--d-fg)] font-display text-[16px] font-extrabold text-[var(--d-bg)]">
              {c.logoLetter}
            </span>
            <span className="min-w-0 leading-none">
              <span className="block truncate font-display text-[19px] font-extrabold uppercase tracking-tight">
                {c.navName}
              </span>
              <span className={`${label} mt-1 block truncate text-[var(--d-muted)]`}>
                Plumbing &amp; heating
              </span>
            </span>
          </div>

          <DemoNav
            anchor={anchor}
            items={navItems}
            className="gap-5 font-display font-bold uppercase tracking-wide"
          />

          <div className="flex shrink-0 items-center gap-2">
            {phone && (
              <span className="hidden @3xl:inline-flex">
                {callButton(phone.display, "px-4 text-[14px]", "ink")}
              </span>
            )}
            {phone && (
              <span className="inline-flex @3xl:hidden">
                {callButton(<span className="sr-only">{phone.label}</span>, "w-11 px-0", "ink")}
              </span>
            )}
            <a
              href={anchor.href("quote")}
              className={`${solid} hidden text-[14px] @3xl:inline-flex`}
            >
              {c.ctaPrimary}
            </a>
            <DemoMobileMenu
              anchor={anchor}
              items={navItems}
              action={[c.ctaPrimary ?? "", "quote"]}
            />
          </div>
        </div>
      </header>

      {/* The honest reply to a number that cannot be dialled from a frame. */}
      {callNote && (
        <p
          role="status"
          className="border-b border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-2 text-center text-[12px] leading-relaxed text-[var(--d-body)] @5xl:px-8"
        >
          {c.emergency?.note ?? "Concept site: this is a fictional business."}
        </p>
      )}

      {/* Hero — the ask and the number on the left, the work on the right. */}
      <section className="border-b border-[var(--d-line)] bg-[var(--d-soft)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-12 @3xl:pt-14 @3xl:pb-16 @5xl:grid-cols-[1.12fr_0.88fr] @5xl:items-end @5xl:gap-14 @5xl:px-8 @5xl:pt-16 @5xl:pb-20">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <DemoBadge />
              <span className={`${label} text-[var(--d-muted)]`}>{h.heroKicker}</span>
            </div>

            <DemoHeading
              preview={preview}
              className="mt-5 font-display text-[2.5rem] leading-[0.98] font-extrabold tracking-tight @3xl:text-[3.25rem] @5xl:text-[3.9rem]"
            >
              {c.headline}{" "}
              <span className="text-[var(--d-accent-text)]">{c.headlineAccent}</span>
            </DemoHeading>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--d-body)] @3xl:text-[16px]">
              {c.intro}
            </p>

            {/* The number is the hero's real call to action on a call-first site, so
                it is set as one instead of hidden inside a button. */}
            {phone && (
              <div className="mt-8 border-l-4 border-[var(--d-accent-2)] pl-4">
                <p className={`${label} text-[var(--d-muted)]`}>Emergency line</p>
                {asCall(
                  "mt-1 inline-flex min-h-11 items-center font-display text-[2.15rem] leading-none font-extrabold tracking-tight text-[var(--d-fg)] underline decoration-[var(--d-accent)] decoration-4 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)] @5xl:text-[2.7rem]",
                  phone.display,
                )}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 @3xl:flex-row">
              <a href={anchor.href("quote")} className={`${solid} w-full @3xl:w-auto`}>
                {c.ctaPrimary}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={anchor.href("services")} className={`${quiet} w-full @3xl:w-auto`}>
                {c.ctaSecondary}
              </a>
            </div>

            {/* Qualitative facts, set as a rule-separated line rather than a row of
                pills: nothing here is a count, year or rating to invent. */}
            {c.trustChips && c.trustChips.length > 0 && (
              <ul className="mt-8 flex flex-col gap-2 border-t border-[var(--d-line)] pt-5 text-[13px] font-semibold text-[var(--d-body)] @3xl:flex-row @3xl:flex-wrap @3xl:gap-x-6">
                {c.trustChips.map((chip) => (
                  <li key={chip} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-accent-text)]" aria-hidden="true" />
                    {chip}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {c.hero && (
            <figure className="relative mx-auto w-full max-w-md @5xl:max-w-none">
              <DemoImage
                src={c.hero.src}
                alt={c.hero.alt}
                preload={!preview}
                sizes="(min-width: 64rem) 34rem, (min-width: 48rem) 46vw, 100vw"
                className="aspect-[4/5] w-full rounded-[22px] shadow-[var(--d-shadow)] @5xl:aspect-[4/4.4]"
              />
              {c.imageSource && (
                <figcaption className={`mt-3 text-[12px] leading-relaxed text-[var(--d-muted)]`}>
                  {c.imageSource}
                </figcaption>
              )}
            </figure>
          )}
        </div>

        {/* Quick picks — the fastest route from a symptom to a filled form. */}
        <div className="border-t border-[var(--d-line)] bg-[var(--d-bg)]">
          <div className="mx-auto max-w-6xl px-4 py-5 @5xl:px-8">
            <p className={`${label} text-[var(--d-muted)]`}>Already know what is wrong?</p>
            <div className="mt-3 grid gap-px overflow-hidden rounded-2xl bg-[var(--d-line)] @3xl:grid-cols-3">
              {h.quickPicks.map((pick) => (
                <button
                  key={pick.label}
                  type="button"
                  onClick={() => pickJob(pick.job)}
                  className="group flex min-h-11 flex-col items-start gap-0.5 bg-[var(--d-bg)] px-4 py-4 text-left transition-colors hover:bg-[var(--d-hover)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--d-accent)] @3xl:px-5"
                >
                  <span className="font-display text-[17px] font-extrabold tracking-tight">
                    {pick.label}
                  </span>
                  <span className="text-[13px] text-[var(--d-body)]">{pick.detail}</span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--d-accent-text)]">
                    Start a quote
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency band — ink ground, amber rule, one blue action. */}
      {c.emergency && (
        <section className="border-y-4 border-[var(--d-accent-2)] bg-[var(--d-fg)] px-4 py-10 @5xl:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 @3xl:flex-row @3xl:items-center @3xl:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-[1.5rem] leading-tight font-extrabold tracking-tight text-[var(--d-bg)] @3xl:text-[1.85rem]">
                {c.emergency.title}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--d-bg)]">{c.emergency.body}</p>
            </div>
            <div className="shrink-0">
              {phone && callButton(c.emergency.callLabel, "w-full px-6 text-[15px] @3xl:w-auto")}
              <p className="mt-2 max-w-[19rem] text-[12px] leading-relaxed text-[var(--d-bg)] @3xl:text-right">
                {c.emergency.note}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Services — a ledger in three kinds of call, not a grid of equal cards. */}
      <section
        id={anchor.id("services")}
        className="scroll-mt-28 px-4 py-14 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-20"
      >
        <div className="max-w-2xl">
          <p className={`${label} text-[var(--d-accent-text)]`}>{c.servicesEyebrow}</p>
          <h2 className="mt-3 font-display text-[1.9rem] leading-tight font-extrabold tracking-tight @3xl:text-[2.3rem]">
            {c.servicesTitle}
          </h2>
        </div>

        <div className="mt-10 space-y-12 @5xl:space-y-14">
          {h.groups.map((group, gi) => (
            <div key={group.name} className="demo-reveal @5xl:grid @5xl:grid-cols-[13rem_1fr] @5xl:gap-10">
              <div className="@5xl:sticky @5xl:top-[7.5rem] @5xl:self-start">
                <h3 className="flex items-center gap-2 font-display text-[1.35rem] font-extrabold uppercase tracking-tight">
                  {gi === 1 ? (
                    <Flame className="h-5 w-5 shrink-0 text-[var(--d-accent-text)]" aria-hidden="true" />
                  ) : (
                    <Droplets className="h-5 w-5 shrink-0 text-[var(--d-accent-text)]" aria-hidden="true" />
                  )}
                  {group.name}
                </h3>
                <p className="mt-1 text-[13px] text-[var(--d-muted)]">{group.when}</p>
              </div>

              <ul className="mt-4 border-t border-[var(--d-line)] @5xl:mt-0">
                {group.items.map((item) => (
                  <li key={item.title} className="border-b border-[var(--d-line)]">
                    <div className="flex flex-col gap-4 py-6 @5xl:flex-row @5xl:items-start @5xl:gap-8">
                      <div className="min-w-0 flex-1">
                        <p className="flex items-baseline gap-3">
                          <span className={`${label} shrink-0 text-[var(--d-muted)]`}>
                            {String(jobs.indexOf(item.title) + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-[1.2rem] font-extrabold tracking-tight @3xl:text-[1.35rem]">
                            {item.title}
                          </span>
                        </p>
                        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[var(--d-body)]">
                          {item.body}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 text-[12px] text-[var(--d-muted)]">
                          {item.tags.map((tag) => (
                            <li key={tag} className="border-l border-[var(--d-line-strong)] pl-2">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        type="button"
                        onClick={() => pickJob(item.title)}
                        className="inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start rounded-full border border-[var(--d-line-strong)] px-4 text-[13px] font-bold text-[var(--d-fg)] transition-colors hover:border-[var(--d-accent)] hover:bg-[var(--d-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] @5xl:self-center"
                      >
                        Get a quote
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Heating — the one full amber band, so the warm half of the trade reads
          apart from the cold-water half without a second palette. Every word on
          this ground is `--d-fg`: the derived body and muted greys were measured
          against a 12% wash of this colour, not the fill itself. */}
      <section
        id={anchor.id("heating")}
        className="scroll-mt-28 bg-[var(--d-accent-2)] px-4 py-14 @5xl:px-8 @5xl:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 @5xl:grid-cols-[1fr_1.05fr] @5xl:items-center">
          <div>
            <p className={`${label} text-[var(--d-fg)]`}>{h.heating.eyebrow}</p>
            <h2 className="mt-3 font-display text-[1.9rem] leading-[1.05] font-extrabold tracking-tight text-[var(--d-fg)] @3xl:text-[2.3rem]">
              {h.heating.title}
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--d-fg)]">
              {h.heating.body}
            </p>
            <dl className="mt-8 space-y-5 border-t border-[var(--d-fg)]/25 pt-6">
              {h.heating.points.map((point) => (
                <div key={point.title}>
                  <dt className="font-display text-[1.05rem] font-extrabold tracking-tight text-[var(--d-fg)]">
                    {point.title}
                  </dt>
                  <dd className="mt-1 max-w-md text-[14px] leading-relaxed text-[var(--d-fg)]">
                    {point.body}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col gap-3 @3xl:flex-row">
              <button
                type="button"
                onClick={() => pickJob("Boilers & heating")}
                className={`${solid} w-full bg-[var(--d-fg)] text-[var(--d-bg)] focus-visible:outline-[var(--d-bg)] @3xl:w-auto`}
              >
                Quote my heating
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={anchor.href("areas")}
                className={`${quiet} w-full border-[var(--d-fg)] text-[var(--d-fg)] @3xl:w-auto`}
              >
                Check we reach you
              </a>
            </div>
          </div>

          <figure>
            <DemoImage
              src={h.heating.image.src}
              alt={h.heating.image.alt}
              sizes="(min-width: 64rem) 38rem, 100vw"
              className="aspect-[4/3] w-full rounded-[22px] ring-1 ring-[var(--d-fg)]/20"
            />
            <figcaption className="mt-3 text-[12px] leading-relaxed text-[var(--d-fg)]">
              {h.heating.image.caption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Installs — the bathroom plate, and what a refit actually involves. */}
      <section
        id={anchor.id("refits")}
        className="scroll-mt-28 bg-[var(--d-soft)] px-4 py-14 @5xl:px-8 @5xl:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 @5xl:grid-cols-[1.05fr_1fr] @5xl:items-center">
          <figure className="@5xl:order-2">
            <DemoImage
              src={h.installs.image.src}
              alt={h.installs.image.alt}
              sizes="(min-width: 64rem) 38rem, 100vw"
              className="aspect-[4/3] w-full rounded-[22px] shadow-[var(--d-shadow)]"
            />
            <figcaption className="mt-3 text-[12px] leading-relaxed text-[var(--d-muted)]">
              {h.installs.image.caption}
            </figcaption>
          </figure>

          <div className="@5xl:order-1">
            <p className={`${label} text-[var(--d-accent-text)]`}>{h.installs.eyebrow}</p>
            <h2 className="mt-3 font-display text-[1.9rem] leading-[1.08] font-extrabold tracking-tight @3xl:text-[2.2rem]">
              {h.installs.title}
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--d-body)]">
              {h.installs.body}
            </p>
            <ul className="mt-7 space-y-3">
              {h.installs.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[14px] leading-relaxed text-[var(--d-fg)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-accent-text)]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => pickJob("Bathroom refits")}
                className={`${quiet} w-full @3xl:w-auto`}
              >
                Plan a bathroom
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How a callout works — three steps on a rail that draws itself. */}
      {proc && (
        <section
          id={anchor.id("process")}
          className="scroll-mt-28 border-y border-[var(--d-line)] px-4 py-14 @5xl:px-8 @5xl:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 @5xl:grid-cols-[1fr_1.1fr] @5xl:items-end">
              <div>
                <p className={`${label} text-[var(--d-accent-text)]`}>{proc.eyebrow}</p>
                <h2 className="mt-3 font-display text-[1.9rem] leading-tight font-extrabold tracking-tight @3xl:text-[2.2rem]">
                  {proc.title}
                </h2>
              </div>
              <p className="max-w-lg text-[15px] leading-relaxed text-[var(--d-body)] @5xl:pb-1">
                {proc.intro}
              </p>
            </div>

            {/* Each step but the last carries the segment joining it to the next:
                down the stacked list on the narrow frames, across to the next
                marker on the wide ones. The resting state is the finished line, so
                the scroll-driven draw is decoration, never a dependency. */}
            <ol className="mt-10 grid gap-8 @3xl:grid-cols-3 @3xl:gap-6">
              {procSteps.map((step, i) => (
                <li key={step.no} className="relative flex gap-4 @3xl:block">
                  {i < procSteps.length - 1 && (
                    <>
                      <span
                        aria-hidden="true"
                        className="demo-rail-y absolute -bottom-8 left-[27px] top-[60px] w-0.5 origin-top rounded-full bg-[var(--d-accent)]/35 @3xl:hidden"
                      />
                      <span
                        aria-hidden="true"
                        className="demo-rail-x absolute -right-6 left-[60px] top-[27px] hidden h-0.5 origin-left rounded-full bg-[var(--d-accent)]/35 @3xl:block"
                      />
                    </>
                  )}
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[var(--d-accent)] bg-[var(--d-bg)] font-display text-[17px] font-extrabold text-[var(--d-accent-text)]">
                    {step.no}
                  </span>
                  <div className="@3xl:mt-6 @3xl:pr-6">
                    <h3 className="font-display text-[1.15rem] font-extrabold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--d-body)]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Quote request — the form and the pricing honesty beside it. */}
      <section
        id={anchor.id("quote")}
        className="scroll-mt-28 bg-[var(--d-soft)] px-4 py-14 @5xl:px-8 @5xl:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 @5xl:grid-cols-[1.25fr_1fr] @5xl:items-start">
          <div className={card}>
            <p className={`${label} px-5 pt-5 text-[var(--d-accent-text)] @3xl:px-8 @3xl:pt-8`}>
              {h.quote.eyebrow}
            </p>
            <h2 className="mt-3 px-5 font-display text-[1.7rem] leading-tight font-extrabold tracking-tight @3xl:px-8 @3xl:text-[2rem]">
              {h.quote.title}
            </h2>
            <p className="mt-2 px-5 text-[14px] leading-relaxed text-[var(--d-body)] @3xl:px-8">
              {h.quote.intro}
            </p>

            {quote ? (
              <div className="mx-5 mt-6 rounded-2xl border border-[var(--d-accent)]/40 bg-[var(--d-bg)] p-5 @3xl:mx-8">
                <h3
                  ref={success}
                  tabIndex={-1}
                  className="font-display text-[1.25rem] font-extrabold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                >
                  {h.quote.successTitle}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--d-body)]">
                  {h.quote.successLead}
                </p>
                <dl className="mt-4 divide-y divide-[var(--d-line)] border-y border-[var(--d-line)] text-[14px]">
                  {[
                    ["Name", quote.name],
                    ["Number", quote.phone],
                    ["Area", quote.area],
                    ["Job", quote.job],
                    ["How soon", quote.urgency],
                    ["Notes", quote.details],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-4 py-2.5">
                      <dt className={`${label} w-24 shrink-0 self-center text-[var(--d-muted)]`}>{k}</dt>
                      <dd className="min-w-0 flex-1 break-words text-[var(--d-fg)]">{v || "—"}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[12px] leading-relaxed text-[var(--d-muted)]">{h.quote.note}</p>
                <button
                  type="button"
                  onClick={() => setQuote(null)}
                  className={`${quiet} mt-5 w-full text-[14px] @3xl:w-auto`}
                >
                  Edit the request
                </button>
              </div>
            ) : (
              /* Native validation runs first: this handler only fires once every
                 required field, the phone pattern and the job choice pass, so the
                 confirmation can never be shown for an incomplete request. */
              <form
                className="mt-6 px-5 pb-6 @3xl:px-8 @3xl:pb-8"
                onChange={() => setQuote(null)}
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  setQuote(
                    Object.fromEntries(
                      ["name", "phone", "area", "job", "urgency", "details"].map((k) => [
                        k,
                        String(fd.get(k) ?? ""),
                      ]),
                    ),
                  );
                }}
              >
                <div className="grid gap-4 @3xl:grid-cols-2">
                  <div>
                    <label htmlFor={`${uid}-name`} className="block text-[12px] font-bold">
                      {h.quote.labels.name}
                    </label>
                    <input
                      id={`${uid}-name`}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={h.quote.placeholders.name}
                      className={`${field} mt-1.5`}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-phone`} className="block text-[12px] font-bold">
                      {h.quote.labels.phone}
                    </label>
                    <input
                      id={`${uid}-phone`}
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      pattern="[\d+\s\(\)\-]{7,}"
                      title="Digits, spaces and + ( ) - only, at least 7 of them"
                      placeholder={h.quote.placeholders.phone}
                      className={`${field} mt-1.5`}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-area`} className="block text-[12px] font-bold">
                      {h.quote.labels.area}
                    </label>
                    <input
                      id={`${uid}-area`}
                      name="area"
                      type="text"
                      required
                      autoComplete="postal-code"
                      placeholder={h.quote.placeholders.area}
                      className={`${field} mt-1.5`}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-job`} className="block text-[12px] font-bold">
                      {h.quote.labels.job}
                    </label>
                    <select
                      id={`${uid}-job`}
                      name="job"
                      required
                      value={job}
                      onChange={(e) => setJob(e.target.value)}
                      className={`${field} mt-1.5`}
                    >
                      <option value="">Choose the job</option>
                      {jobs.map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <fieldset className="@3xl:col-span-2">
                    <legend className={`${label} text-[var(--d-muted)]`}>{h.quote.labels.urgency}</legend>
                    <div className="mt-2.5 grid gap-2 @3xl:grid-cols-4">
                      {h.quote.urgencies.map((u, i) => (
                        <div key={u.value}>
                          <input
                            id={`${uid}-u${i}`}
                            type="radio"
                            name="urgency"
                            value={u.value}
                            required
                            defaultChecked={i === 1}
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={`${uid}-u${i}`}
                            className="flex min-h-11 cursor-pointer flex-col justify-center rounded-xl border border-[var(--d-line-strong)] bg-[var(--d-field)] px-3 text-[13px] font-bold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--d-accent)] peer-checked:border-[var(--d-accent)] peer-checked:bg-[var(--d-accent)]/10 peer-checked:text-[var(--d-accent-text)]"
                          >
                            {u.value}
                            <span className="text-[12px] font-normal text-[var(--d-muted)]">{u.hint}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                  <div className="@3xl:col-span-2">
                    <label htmlFor={`${uid}-details`} className="block text-[12px] font-bold">
                      {h.quote.labels.details}
                    </label>
                    <textarea
                      id={`${uid}-details`}
                      name="details"
                      rows={3}
                      placeholder={h.quote.placeholders.details}
                      className={`${field} mt-1.5 py-2.5`}
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between">
                  <button type="submit" className={`${solid} w-full @3xl:w-auto`}>
                    {h.quote.submit}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <p className="max-w-sm text-[12px] leading-relaxed text-[var(--d-muted)]">
                    {h.quote.note}
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Pricing honesty, as a numbered sequence rather than four cards. */}
          {c.quoting && (
            <div>
              <p className={`${label} text-[var(--d-accent-text)]`}>{c.quoting.eyebrow}</p>
              <h3 className="mt-3 font-display text-[1.6rem] leading-tight font-extrabold tracking-tight @3xl:text-[1.9rem]">
                {c.quoting.title}
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--d-body)]">
                {c.quoting.intro}
              </p>
              <ol className="mt-7 divide-y divide-[var(--d-line)] border-y border-[var(--d-line)]">
                {c.quoting.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4 py-4">
                    <span className="font-display text-[1.6rem] leading-none font-extrabold text-[var(--d-accent)]">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[1.05rem] font-extrabold tracking-tight">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-[14px] leading-relaxed text-[var(--d-body)]">
                        {step.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 max-w-md text-[12px] leading-relaxed text-[var(--d-muted)]">
                {c.quoting.note}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Service areas — grouped by travel time, with a checker that really checks. */}
      {areas && (
        <section
          id={anchor.id("areas")}
          className="scroll-mt-28 px-4 py-14 @5xl:mx-auto @5xl:max-w-6xl @5xl:px-8 @5xl:py-20"
        >
          <div className="grid gap-10 @5xl:grid-cols-[1fr_1.25fr] @5xl:items-start">
            <div>
              <p className={`${label} text-[var(--d-accent-text)]`}>{areas.eyebrow}</p>
              <h2 className="mt-3 font-display text-[1.9rem] leading-tight font-extrabold tracking-tight @3xl:text-[2.2rem]">
                {areas.title}
              </h2>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--d-body)]">
                {areas.intro}
              </p>

              <form
                className="mt-7 max-w-sm"
                onSubmit={(e) => {
                  e.preventDefault();
                  checkArea();
                }}
              >
                <label htmlFor={`${uid}-check`} className="block text-[12px] font-bold">
                  {h.areaCheck.label}
                </label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    id={`${uid}-check`}
                    type="text"
                    value={areaQuery}
                    onChange={(e) => {
                      setAreaQuery(e.target.value);
                      setAreaAnswer(null);
                    }}
                    placeholder={h.areaCheck.placeholder}
                    className={field}
                  />
                  <button type="submit" className={`${solid} shrink-0 px-4 text-[14px]`}>
                    {h.areaCheck.submit}
                  </button>
                </div>
                <p
                  role="status"
                  className={`mt-3 min-h-[1.25rem] text-[13px] leading-relaxed ${
                    areaAnswer ? "font-semibold text-[var(--d-fg)]" : "text-[var(--d-muted)]"
                  }`}
                >
                  {areaAnswer ?? areas.note}
                </p>
              </form>
              <p className="mt-4 max-w-sm text-[12px] leading-relaxed text-[var(--d-muted)]">
                {h.areaCheck.note}
              </p>
            </div>

            <ul className="divide-y divide-[var(--d-line)] border-y border-[var(--d-line)]">
              {areas.zones.map((zone) => (
                <li key={zone.name} className="py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-[1.2rem] font-extrabold uppercase tracking-tight">
                      {zone.name}
                    </h3>
                    <p className={`${label} text-[var(--d-accent-text)]`}>{zone.travel}</p>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                    {zone.places.map((place) => (
                      <li
                        key={place}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--d-line-strong)] px-3 py-1.5 text-[13px] font-semibold text-[var(--d-body)]"
                      >
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--d-accent-text)]" aria-hidden="true" />
                        {place}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ — heading in its own column so the accordion never reads as a wall. */}
      <section
        id={anchor.id("faq")}
        className="scroll-mt-28 border-t border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-14 @5xl:px-8 @5xl:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-8 @5xl:grid-cols-[0.8fr_1.2fr] @5xl:items-start">
          <div>
            <h2 className="font-display text-[1.9rem] font-extrabold tracking-tight @3xl:text-[2.2rem]">
              {c.faqTitle}
            </h2>
            {phone && (
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--d-body)]">
                Not answered?{" "}
                {callHref ? (
                  <a
                    href={callHref}
                    className="font-bold text-[var(--d-accent-text)] underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                  >
                    Ask on the phone
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={askCall}
                    className="font-bold text-[var(--d-accent-text)] underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                  >
                    Ask on the phone
                  </button>
                )}
                .
              </p>
            )}
          </div>
          <DemoFaq items={c.faqs ?? []} />
        </div>
      </section>

      {/* Closing call — blue floor, the number at its largest. */}
      {/* pb-28 below @3xl clears the sticky action bar, which otherwise floats over
          the last 65px of the viewport at every scroll position. */}
      <section
        id={anchor.id("contact")}
        className="scroll-mt-28 bg-[var(--d-accent)] px-4 pt-14 pb-28 text-[var(--d-on-accent)] @3xl:pb-14 @5xl:px-8 @5xl:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 @5xl:grid-cols-[1.15fr_1fr] @5xl:items-end">
          <div>
            <p className={`${label} opacity-90`}>{h.closing.eyebrow}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.05] font-extrabold tracking-tight @3xl:text-[2.6rem]">
              {c.ctaTitle}
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed">{c.ctaBody}</p>
            <div className="mt-7 flex flex-col gap-3 @3xl:flex-row">
              {phone &&
                asCall(
                  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--d-fg)] px-6 font-display text-[15px] font-extrabold text-[var(--d-bg)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-bg)]",
                  <>
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {phone.display}
                  </>,
                )}
              <a
                href={anchor.href("quote")}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-[var(--d-bg)] px-6 font-display text-[15px] font-extrabold text-[var(--d-bg)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-fg)]"
              >
                {c.ctaPrimary}
              </a>
            </div>
          </div>

          <dl className="grid gap-x-6 gap-y-3 border-t border-current/25 pt-6 @3xl:grid-cols-2 @5xl:border-t-0 @5xl:pt-0">
            {h.closing.hours.map((hour) => (
              <div key={hour.day}>
                <dt className={`${label} opacity-90`}>{hour.day}</dt>
                <dd className="mt-1 font-display text-[1.05rem] font-extrabold tracking-tight">
                  {hour.time}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Thumb bar: dial and request, both reachable from any section. */}
      <DemoStickyCta
        label={c.ctaPrimary ?? ""}
        href={anchor.href("quote")}
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
