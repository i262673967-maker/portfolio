import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Gauge,
  History,
  MonitorSmartphone,
  MousePointerClick,
  RefreshCw,
  Target,
  Wrench,
} from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import {
  cta,
  finalCta,
  otherBusinessTypes,
  problems,
  processSteps,
  qualityChecklist,
  services,
  site,
  tradeTypes,
  whyWork,
} from "@/lib/data";

const iconMap: Record<string, typeof Building2> = {
  wrench: Wrench,
  building: Building2,
  target: Target,
  refresh: RefreshCw,
  history: History,
  mobile: MonitorSmartphone,
  gauge: Gauge,
  cursor: MousePointerClick,
};

const isTodo = (v: string) => v.trim().toUpperCase().startsWith("TODO");
const two = (n: number) => String(n).padStart(2, "0");

/* Navy band, the five trades this studio builds for. The visible caption above
   the strip says it plainly — these are the businesses I build for, not past
   clients. The scrolling row is decoration and aria-hidden; the same trade
   names live in the Services relevance line below. CSS-only marquee (globals.css),
   pauses on hover and on reduced motion. */
export function TradeMarquee() {
  const row = [...tradeTypes, ...tradeTypes];
  return (
    <section className="bg-navy py-6 sm:py-8">
      <p className="text-center font-mono text-[12px] uppercase tracking-widest text-mark">
        Websites I build for local businesses
      </p>
      <div className="marquee mt-4" aria-hidden="true">
        <div className="marquee-track items-center gap-8 pr-8">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                {item}
              </span>
              <span className="h-2.5 w-2.5 shrink-0 rotate-45 bg-mark" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Four ways a website quietly stops working, on a full-bleed brand-blue band.
   White-on-brand clears AA (5.23:1); the numbered cards are white card-pop so
   their ink/ink-muted body text keeps its usual contrast. */
export function Problems() {
  return (
    <section id="problems" className="bg-brand py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-widest text-white/90">
            Sound Familiar?
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-[2.75rem]">
            Websites rarely break all at once. They leak in four places.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white">
            Most owners can&apos;t tell which one is costing them enquiries — and
            that&apos;s the point of looking.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => {
            const Icon = iconMap[p.icon] ?? Target;
            return (
              <Reveal key={p.title} delay={(i % 4) * 0.05}>
                <div className="card-pop h-full p-5">
                  <span className="font-display text-3xl font-extrabold text-brand">{two(i + 1)}</span>
                  <span className="mt-3 grid h-10 w-10 place-items-center rounded-lg bg-brand/[0.1] text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[1rem] font-bold tracking-tight text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.06}>
          <p className="mt-8 text-[14px] leading-relaxed text-white">
            Not sure which of these is your website?{" "}
            <Link
              href="/#audit"
              className="font-semibold text-white underline decoration-white/60 underline-offset-4 transition-colors hover:decoration-white"
            >
              That&apos;s exactly what the free audit answers
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* One "Why this works" section: the generic-vs-built comparison, the five
   promises as an indexed list, and the build-standard checklist — the three
   things that used to live in three separate sections, stated on paper. */
export function WhyWorks() {
  const generic = [
    "Looks identical to every competitor",
    "Slow to load, clunky on phones",
    "Visitors can't tell what you actually do",
    "Contact details buried three clicks deep",
  ];
  const built = [
    "Designed around your services and your customers",
    "Fast, mobile-first, easy to navigate",
    "Clear message within seconds of landing",
    "One obvious way to enquire, on every screen",
  ];
  return (
    <section id="why" className="py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Why This Works"
            title="A template looks like a template. A built website looks like a business."
            copy="The same business, two different presences — and the reasons the built one earns the call."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card-pop h-full p-6">
              <p className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">
                Generic website
              </p>
              <ul className="mt-5 space-y-3 text-sm text-ink-muted">
                {generic.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative h-full overflow-hidden rounded-[22px] border-2 border-brand bg-card p-6 shadow-[4px_4px_0_var(--color-brand)]">
              <p className="font-mono text-[12px] uppercase tracking-widest text-brand">
                Website built around the business
              </p>
              <ul className="mt-5 space-y-3 text-sm text-ink">
                {built.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* The five promises, as an indexed list. */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="What You Get"
              title="Five promises you can check during the project."
              copy="No template, no middlemen, and nothing on this page that didn't actually happen."
            />
          </Reveal>
          <Reveal delay={0.06}>
            <ol className="divide-y divide-line border-y border-line">
              {whyWork.map((w, i) => (
                <li key={w.title} className="flex gap-5 py-5">
                  <span className="mt-0.5 font-display text-lg font-extrabold text-brand">
                    {two(i + 1)}
                  </span>
                  <div>
                    <h3 className="font-display text-[1rem] font-bold tracking-tight text-ink">
                      {w.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{w.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* The standard every promise is measured against. */}
        <Reveal delay={0.08}>
          <div className="card-pop mt-12 p-6">
            <h3 className="font-display text-[1rem] font-bold tracking-tight text-ink">
              Every site I ship meets this checklist
            </h3>
            <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {qualityChecklist.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13px] text-ink-muted">
                  <Check className="h-3.5 w-3.5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Services as indexed rows on thick ink dividers. "Fix My Website" is the
   featured row — its title carries the yellow highlight, nothing else changes. */
export function Services() {
  return (
    <section id="services" className="border-t-2 border-line py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Everything your website needs."
            copy="Get the website you don't have yet — or fix the one that's quietly costing you customers."
          />
        </Reveal>

        <div className="mt-10 border-t-2 border-line">
          {services.map((s, i) => {
            const featured = s.featured === true;
            return (
              <Reveal key={s.title} delay={i * 0.04}>
                <div className="grid gap-2 border-b-2 border-line py-7 sm:grid-cols-[4rem_1fr] sm:gap-6">
                  <span className="font-display text-2xl font-extrabold text-brand">{two(i + 1)}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                        {featured ? <span className="mark">{s.title}</span> : s.title}
                      </h3>
                      {featured && (
                        <span className="rounded-full border-2 border-brand px-2.5 py-1 font-mono text-[12px] font-semibold uppercase tracking-widest text-brand">
                          Start Here
                        </span>
                      )}
                    </div>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{s.body}</p>
                    {s.points && (
                      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-[13px] text-ink-muted">
                            <Check className="h-3.5 w-3.5 shrink-0 text-brand" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-ink-muted">
            Also built for: {otherBusinessTypes.join(", ")}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* Six steps on a navy band: a horizontal snap row on phones, a grid on
   desktop. Yellow step numbers clear AA on navy (12.55:1); body text sits at
   white/80 (about 11:1). */
export function Process() {
  return (
    <section id="process" className="bg-navy py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-widest text-mark">Process</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-[2.75rem]">
            A clear process, start to finish.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80">
            You always know what&apos;s happening and what&apos;s next. It starts with a
            free audit — you see the problems before you spend anything.
          </p>
        </Reveal>

        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {processSteps.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.05} className="w-[80%] shrink-0 snap-start sm:w-auto">
              <div className="h-full rounded-[22px] border-2 border-white/15 bg-white/[0.06] p-5">
                <span className="font-display text-2xl font-extrabold text-mark">{p.step}</span>
                <h3 className="mt-3 font-display text-[1rem] font-bold tracking-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/80">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Honest about section — logo in a navy circle instead of a photo, no invented
   facts, and no location or timezone: this studio is contacted through the form
   and email. Studio / Email / Focus sit together on a card-pop. */
export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[2fr_3fr]">
        <Reveal>
          {/* logo.png is a navy disc on a black square with no alpha, so the old
             padding ring showed the file's own black margin as a heavy dark band
             inside the circle. The box clips instead, and the mark is scaled just
             past the clip so the disc — not the black — reaches the edge.
             Capped at 200px on phones, where a 384px circle dominated the fold. */}
          <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-full bg-navy shadow-[6px_6px_0_var(--color-mark)] sm:max-w-[260px]">
            <Image
              src="/logo.png"
              alt={`${site.brand} logo`}
              width={260}
              height={260}
              sizes="(min-width: 640px) 260px, 200px"
              className="size-full scale-[1.06] object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading eyebrow="About" title={site.role} />

          <div className="mt-5 max-w-xl">
            <p className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">
              Who you&apos;re dealing with
            </p>
            <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-muted">
              {site.founderNote.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <dl className="card-pop mt-8 max-w-xl space-y-4 p-6 text-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="w-28 shrink-0 font-mono text-[12px] uppercase tracking-widest text-ink-muted">
                Studio
              </dt>
              <dd className="text-ink">{site.brand}</dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="w-28 shrink-0 font-mono text-[12px] uppercase tracking-widest text-ink-muted">
                Email
              </dt>
              <dd>
                <a href={`mailto:${site.email}`} className="text-brand underline-offset-4 hover:underline">
                  {site.email}
                </a>
              </dd>
            </div>
            {!isTodo(site.experience) && (
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="w-28 shrink-0 font-mono text-[12px] uppercase tracking-widest text-ink-muted">
                  Focus
                </dt>
                <dd className="text-ink">{site.experience}</dd>
              </div>
            )}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* The closing ask, on the yellow band with navy type and one button. The same
   single primary action used at the other conversion points. */
export function FinalCta() {
  return (
    /* The id is the sticky phone bar's cue to stand down over this band — it
       carries the same action, and the band is the last ask on the page. */
    <section id="final-cta" className="bg-mark py-20 sm:py-24">
      <div className="container-shell">
        <Reveal>
          <div className="rounded-[28px] border-2 border-ink p-8 text-center sm:p-14">
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">
              {finalCta.title}
            </h2>
            <p className="mt-4 font-display text-lg font-bold text-ink">{finalCta.lead}</p>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-ink">
              {finalCta.body}
            </p>
            {/* The short form of the action: on the yellow band the long label
                wrapped onto two lines inside a pill button. */}
            <Link
              href="/#contact"
              className="btn-pop group mt-7 inline-flex min-h-11 items-center justify-center gap-2 bg-brand px-7 py-3.5 text-[15px] font-semibold text-on-brand"
            >
              {cta.nav}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-widest text-ink">
              {finalCta.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
