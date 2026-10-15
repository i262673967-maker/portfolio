"use client";

import { useId, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleDashed,
  Zap,
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

/* 03 — VoltWise Electrical: dark, technical, precise.
   One yellow, hairline borders, mono for anything that behaves like a label, and
   a grid behind the hero that drifts one cell every 24 seconds. Its own layout
   rather than a recoloured local-service page: the concept reads like a spec
   sheet, so the services are a numbered list, the credentials question is
   answered by naming what would go there, and the quote helper explains a job
   instead of pricing one.

   Nothing is asserted about the business that a concept cannot know: no
   registration, no insurance, no response guarantee, no price. */

export default function ElectricianDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [job, setJob] = useState(0);
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

  const status = c.status;
  const helper = c.helper;
  const hero = c.hero;
  const chosen = helper?.options[job % (helper?.options.length || 1)];

  const panel = "rounded-2xl border border-[var(--d-line)] bg-[var(--d-soft)]";
  const eyebrow = "font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--d-accent-text)]";

  const navItems: DemoNavItem[] = [
    ["Services", "services"],
    ["Safety", "safety"],
    ...(helper ? [["Quote helper", "quote"] as DemoNavItem] : []),
    ["FAQ", "faq"],
  ];

  /* Which frame a control appears in is a separate question from what it looks
     like, so it lives on a wrapper: a control that is always `inline-flex` and
     sometimes `hidden` would put two display utilities in the same class list,
     where neither can beat the other on specificity. */
  const showIn = (show: string | undefined, node: React.ReactNode) =>
    node && show ? <span className={show}>{node}</span> : node;

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

  /* The emergency action, in three sizes. Yellow on the dark page, near-black
     with yellow text once it sits on the closing block's yellow floor. The dot
     pulses only where there is room for the ring to read. */
  const emergencyButton = (
    children: React.ReactNode,
    {
      className = "",
      onYellow = false,
      dot = true,
      show,
    }: { className?: string; onYellow?: boolean; dot?: boolean; show?: string } = {},
  ) =>
    showIn(
      show,
      asCall(
        `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 font-display text-[14px] font-bold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${
          onYellow
            ? "bg-[var(--d-on-accent)] text-[var(--d-accent)] focus-visible:outline-[var(--d-on-accent)]"
            : "bg-[var(--d-accent)] text-[var(--d-on-accent)] focus-visible:outline-[var(--d-accent-text)]"
        } ${className}`,
        <>
          {dot && (
            <span
              aria-hidden="true"
              className="demo-pulse h-1.5 w-1.5 shrink-0 rounded-full bg-current"
            />
          )}
          {children}
        </>,
      ),
    );

  /* The quieter partner: an outline that picks up the yellow on hover. */
  const outlineLink = (href: string, children: React.ReactNode, className = "") => (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-[var(--d-line-strong)] px-5 font-display text-[14px] font-bold text-[var(--d-fg)] transition-colors duration-200 hover:border-[var(--d-accent)] hover:text-[var(--d-accent-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${className}`}
    >
      {children}
    </a>
  );

  /* The wash follows the pointer inside a service row. Written straight to the
     element rather than through state, because a pointermove at 100Hz must not
     re-render the page. The division puts the coordinate back into the row's own
     space: inside a device frame the whole demo is scaled down, so a client rect
     is in visual pixels while every CSS length here is a layout pixel. */
  const onGlow = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const k = rect.width ? el.offsetWidth / rect.width : 1;
    el.style.setProperty("--glow-x", `${(e.clientX - rect.left) * k}px`);
    el.style.setProperty("--glow-y", `${(e.clientY - rect.top) * k}px`);
  };

  return (
    <DemoVars project={project}>
      <header className="sticky top-0 z-20 border-b border-[var(--d-line)] bg-[var(--d-bg)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 @5xl:px-8">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--d-accent)] text-[var(--d-on-accent)]">
              <Zap className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="truncate font-display text-[15px] font-bold tracking-tight">
              {c.navName}
            </span>
          </div>

          <DemoNav anchor={anchor} items={navItems} className="gap-6" />

          <div className="flex shrink-0 items-center gap-2">
            {/* The number spelled out on the wide frames, a bare dial on the
                narrow ones — the emergency call is never more than a tap away. */}
            {emergencyButton("Emergency Call", { show: "hidden @3xl:inline-flex" })}
            {emergencyButton(<span className="sr-only">{phone?.label}</span>, {
              className: "w-11 px-0",
              dot: false,
              show: "inline-flex @3xl:hidden",
            })}
            <DemoMobileMenu anchor={anchor} items={navItems} action={["Quote helper", "quote"]} />
          </div>
        </div>
      </header>

      {/* The honest reply to a number that cannot be dialled from a frame. */}
      {callNote && (
        <p
          role="status"
          className="border-b border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-2 text-center text-[12px] leading-relaxed text-[var(--d-body)] @5xl:px-8"
        >
          {status?.note ?? "Concept site: this is a fictional business."}
        </p>
      )}

      {/* Hero — the ask and the status board, over a grid that is barely there. */}
      <section className="relative overflow-hidden border-b border-[var(--d-line)]">
        <div
          aria-hidden="true"
          className="demo-circuit pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_28%_18%,black,transparent_72%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(38rem 24rem at 82% -10%, color-mix(in oklab, var(--d-accent) 11%, transparent), transparent 70%)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 @3xl:py-16 @5xl:grid-cols-[1.15fr_1fr] @5xl:items-center @5xl:gap-12 @5xl:px-8 @5xl:py-20">
          <div>
            <DemoBadge />
            <DemoHeading
              preview={preview}
              className="mt-5 font-display text-[2.4rem] leading-[1] font-bold tracking-tight @3xl:text-[3.2rem] @5xl:text-[4rem]"
            >
              {/* The concept's signature: each half of the line closes in
                  sequence, like a circuit settling, and stays lit. */}
              <span className="demo-power-on block">{c.headline}</span>
              <span
                className="demo-power-on block text-[var(--d-accent)]"
                style={{ "--power-delay": "220ms" } as React.CSSProperties}
              >
                {c.headlineAccent}
              </span>
            </DemoHeading>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--d-body)]">
              {c.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 @3xl:flex-row">
              {emergencyButton(`Emergency Call · ${phone?.display ?? ""}`, {
                className: "w-full px-5 @3xl:w-auto",
              })}
              {outlineLink(anchor.href("quote"), c.ctaSecondary, "w-full @3xl:w-auto")}
            </div>
          </div>

          {/* The dashboard card. It is the one place the concept talks about
              itself, so it names what a real board would carry instead of
              carrying it. */}
          {status && (
            <div className={`${panel} p-5 @5xl:p-6`}>
              <div className="flex items-center justify-between gap-3">
                <p className={eyebrow}>{status.eyebrow}</p>
                <CircleDashed className="h-4 w-4 shrink-0 text-[var(--d-muted)]" aria-hidden="true" />
              </div>
              <h2 className="mt-2 font-display text-[1.05rem] leading-snug font-bold tracking-tight">
                {status.title}
              </h2>

              <dl className="mt-5 divide-y divide-[var(--d-line)] border-y border-[var(--d-line)]">
                {status.rows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 py-3">
                    <dt className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--d-muted)]">
                      {row.label}
                    </dt>
                    <dd className="flex items-center justify-end gap-2 text-right text-[13px] font-semibold text-[var(--d-body)]">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          row.tone === "live"
                            ? "demo-pulse bg-[var(--d-accent)]"
                            : "bg-[var(--d-line-strong)]"
                        }`}
                      />
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-[12px] leading-relaxed text-[var(--d-muted)]">{status.note}</p>
            </div>
          )}
        </div>
      </section>

      {/* Photo band — the one photograph, under the page's own black. */}
      {hero && (
        <section className="border-b border-[var(--d-line)]">
          <div className="relative">
            <DemoImage
              src={hero.src}
              alt={hero.alt}
              sizes="100vw"
              className="h-52 w-full @3xl:h-64 @5xl:h-80"
              imgClassName="brightness-[0.85]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to top, var(--d-bg) 3%, color-mix(in oklab, var(--d-bg) 62%, transparent) 55%, color-mix(in oklab, var(--d-bg) 34%, transparent))",
              }}
            />
            {c.imageSource && (
              <div className="absolute inset-x-4 bottom-4 @5xl:inset-x-8 @5xl:bottom-6">
                <p className="max-w-lg rounded-xl bg-[var(--d-bg)] px-4 py-3 text-[12px] leading-relaxed text-[var(--d-body)] ring-1 ring-[var(--d-line)]">
                  {c.imageSource}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Services — a numbered list, not a card grid. The row is the control. */}
      <section
        id={anchor.id("services")}
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 @5xl:px-8 @5xl:py-16"
      >
        <p className={eyebrow}>{c.servicesEyebrow ?? "Services"}</p>
        <h2 className="mt-2 font-display text-[1.7rem] font-bold tracking-tight @3xl:text-[2.1rem]">
          {c.servicesTitle}
        </h2>

        <ul className="mt-8 grid gap-3 @3xl:grid-cols-2 @3xl:gap-4">
          {(c.services ?? []).map((s, i) => (
            <li
              key={s.title}
              onPointerMove={onGlow}
              className="demo-glow rounded-2xl border border-[var(--d-line)] transition-colors duration-200 hover:border-[var(--d-accent)]"
            >
              <a
                href={anchor.href("quote")}
                className="group relative z-10 flex items-start gap-4 px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] @5xl:px-5 @5xl:py-5"
              >
                <span className="pt-1 font-mono text-[12px] text-[var(--d-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.05rem] font-bold tracking-tight">
                    {s.title}
                  </span>
                  <span className="mt-1.5 block text-[14px] leading-relaxed text-[var(--d-body)]">
                    {s.body}
                  </span>
                </span>
                <ArrowRight
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--d-accent-text)] transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Safety — practices described, not qualifications asserted. */}
      <section
        id={anchor.id("safety")}
        className="scroll-mt-24 border-y border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-12 @5xl:px-8 @5xl:py-16"
      >
        <div className="mx-auto grid max-w-6xl gap-8 @5xl:grid-cols-[1fr_1.25fr] @5xl:items-start">
          <div>
            <p className={eyebrow}>Safety first</p>
            <h2 className="mt-2 font-display text-[1.7rem] font-bold leading-tight tracking-tight @3xl:text-[2.1rem]">
              {c.whyTitle}
            </h2>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--d-body)]">
              {c.whyIntro}
            </p>
          </div>

          <ul className="space-y-2.5">
            {(c.whyPoints ?? []).map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl border border-[var(--d-line)] bg-[var(--d-bg)] px-4 py-3.5 text-[14px] leading-relaxed text-[var(--d-fg)]"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[var(--d-accent)]/12 text-[var(--d-accent-text)]">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quote helper — pick a job, read what it actually involves. No prices. */}
      {helper && chosen && (
        <section
          id={anchor.id("quote")}
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 @5xl:px-8 @5xl:py-16"
        >
          <p className={eyebrow}>{helper.eyebrow}</p>
          <h2 className="mt-2 font-display text-[1.7rem] font-bold tracking-tight @3xl:text-[2.1rem]">
            {helper.title}
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--d-body)]">
            {helper.intro}
          </p>

          <div className={`${panel} mt-8 grid @5xl:grid-cols-[1fr_1.5fr]`}>
            <fieldset className="border-b border-[var(--d-line)] p-4 @5xl:border-b-0 @5xl:border-r @5xl:p-5">
              <legend className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--d-muted)]">
                {helper.prompt}
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {helper.options.map((o, i) => (
                  <label key={o.job} className="inline-flex min-h-11">
                    <input
                      type="radio"
                      name={`${uid}-job`}
                      value={i}
                      checked={job === i}
                      onChange={() => {
                        setJob(i);
                        setSent(false);
                      }}
                      className="peer sr-only"
                    />
                    <span className="inline-flex min-h-11 items-center rounded-full border border-[var(--d-line-strong)] px-4 text-[13px] font-semibold text-[var(--d-body)] transition-colors duration-200 peer-checked:border-[var(--d-accent)] peer-checked:bg-[var(--d-accent)]/12 peer-checked:text-[var(--d-fg)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--d-accent)]">
                      {o.job}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Live, because the answer changes under the visitor's hands. */}
            <div aria-live="polite" className="p-4 @5xl:p-6">
              <h3 className="font-display text-[1.15rem] font-bold tracking-tight">{chosen.job}</h3>
              <div className="mt-5 grid gap-5 @md:grid-cols-2">
                <div>
                  <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--d-accent-text)]">
                    {helper.checkLabel}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--d-body)]">
                    {chosen.check}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--d-accent-text)]">
                    {helper.prepareLabel}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--d-body)]">
                    {chosen.prepare}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSent((v) => !v)}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[var(--d-accent)] px-5 font-display text-[14px] font-bold text-[var(--d-on-accent)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent-text)]"
                >
                  {helper.submit}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="text-[12px] leading-relaxed text-[var(--d-muted)]">
                  {helper.note}
                </span>
              </div>

              {sent && (
                <p className="nudge-in mt-4 rounded-xl bg-[var(--d-bg)] p-3 text-[12px] leading-relaxed text-[var(--d-body)] ring-1 ring-[var(--d-line)]">
                  {helper.sendNote}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section
        id={anchor.id("faq")}
        className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-12 @5xl:px-8 @5xl:pb-16"
      >
        <h2 className="font-display text-[1.7rem] font-bold tracking-tight @3xl:text-[2.1rem]">
          {c.faqTitle}
        </h2>
        <div className="mt-4">
          <DemoFaq items={c.faqs ?? []} />
        </div>
      </section>

      {/* Closing call — the yellow floor, and the number at the size it deserves. */}
      <section
        id={anchor.id("contact")}
        className="scroll-mt-24 bg-[var(--d-accent)] px-4 py-12 text-[var(--d-on-accent)] @5xl:px-8 @5xl:py-16"
      >
        <div className="mx-auto grid max-w-6xl gap-8 @5xl:grid-cols-[1.1fr_1fr] @5xl:items-center">
          <div>
            <h2 className="font-display text-[1.6rem] font-bold leading-tight tracking-tight @3xl:text-[2.1rem]">
              {c.ctaTitle}
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed">{c.ctaBody}</p>
            <div className="mt-6">
              <a
                href={anchor.href("quote")}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[var(--d-on-accent)] px-5 font-display text-[14px] font-bold text-[var(--d-accent)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-on-accent)]"
              >
                {c.ctaSecondary}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {phone && (
            <div className="@5xl:text-right">
              <p className="font-mono text-[12px] uppercase tracking-[0.16em]">{c.ctaPrimary}</p>
              {asCall(
                "mt-1 inline-flex min-h-11 items-center font-display text-[2.2rem] leading-none font-bold tracking-tight underline decoration-[var(--d-on-accent)] decoration-2 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-on-accent)] @5xl:text-[3.2rem]",
                phone.display,
              )}
            </div>
          )}
        </div>
      </section>

      {/* Thumb bar: the number and the helper, both reachable from any section. */}
      <DemoStickyCta
        label={c.ctaSecondary ?? ""}
        href={anchor.href("quote")}
        secondary={
          phone
            ? callHref
              ? { label: c.ctaPrimary ?? "", href: callHref }
              : { label: c.ctaPrimary ?? "", onClick: askCall }
            : undefined
        }
      />

      <DemoFooter name={project.name} />
    </DemoVars>
  );
}
