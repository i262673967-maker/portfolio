import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Mail,
  RefreshCw,
  ShoppingCart,
  Smartphone,
  Target,
  Wrench,
} from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { clientTypes, cta, principles, processSteps, qualityChecklist, services, site } from "@/lib/data";

const iconMap: Record<string, typeof Building2> = {
  wrench: Wrench,
  building: Building2,
  target: Target,
  cart: ShoppingCart,
  refresh: RefreshCw,
  smartphone: Smartphone,
};

const isTodo = (v: string) => v.trim().toUpperCase().startsWith("TODO");

/* Scrolling strip of what the studio does. */
export function TrustStrip() {
  const items = [
    "Web Design",
    "Website Development",
    "Redesigns",
    "Landing Pages",
    "Website Fixes",
    "E-commerce",
  ];
  const row = [...items, ...items];
  return (
    <section className="border-y border-line bg-base-2 py-5">
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-sm font-medium uppercase tracking-[0.2em] text-muted">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
        Modern websites for local businesses.
      </p>
    </section>
  );
}

/* Generic vs custom website comparison, plus an honest reserved slot for
   real measured results once they exist. */
export function BeforeAfter() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="The Difference"
            title="A template looks like a template. A built website looks like a business."
            copy="The same business, two different presences. Only one of them makes a visitor pick up the phone."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <div className="h-full rounded-2xl border border-line bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                Generic website
              </p>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                {[
                  "Looks identical to every competitor",
                  "Slow to load, clunky on phones",
                  "Visitors can't tell what you actually do",
                  "Contact details buried three clicks deep",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-faint" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-1">
            <div className="relative h-full overflow-hidden rounded-2xl border border-accent/40 bg-surface-2 p-6">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Website built around the business
              </p>
              <ul className="mt-5 space-y-3 text-sm text-offwhite/90">
                {[
                  "Designed around your services and your customers",
                  "Fast, mobile-first, easy to navigate",
                  "Clear message within seconds of landing",
                  "One obvious way to enquire, on every screen",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* TODO(Ismail): replace this honest placeholder card with real
              before/after measurements once you have a launched client site
              and their permission. Until then no numbers are shown. */}
          <Reveal delay={0.12} className="lg:col-span-1">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-line-strong p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                Reserved for real results
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Measured before-and-after results from real client projects will
                be published in this slot. No numbers, no testimonials, and no
                client names are invented here in the meantime.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Services, ending with the no-pricing quote band. */
export function Services() {
  return (
    <section id="services" className="border-y border-line bg-base-2 py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Everything your website needs."
            copy="Get the website you don't have yet — or fix the one that's quietly costing you customers."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Building2;
            const featured = s.featured === true;
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.06}>
                <div
                  className={`relative h-full overflow-hidden rounded-2xl border p-6 transition-colors ${
                    featured
                      ? "border-accent/40 bg-surface-2"
                      : "border-line bg-surface hover:border-line-strong"
                  }`}
                >
                  {featured && (
                    <>
                      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
                      <span className="absolute right-4 top-4 rounded-full bg-accent px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink">
                        Start Here
                      </span>
                    </>
                  )}
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-lg ${
                      featured ? "bg-accent text-ink" : "bg-white/5 text-accent"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-offwhite">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                  {s.points && (
                    <ul className="mt-4 space-y-2 border-t border-line pt-4">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-[13px] text-muted">
                          <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Replaces the old pricing section — no published prices. */}
        <Reveal delay={0.05}>
          <div className="mt-14 rounded-2xl border border-line bg-surface p-8 text-center sm:p-12">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-offwhite sm:text-3xl">
              {site.quoteOffer}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Every business needs something different, so every quote is scoped
              with you rather than picked off a price list.
            </p>
            <Link
              href="/#contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-offwhite px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-accent"
            >
              {cta.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Six steps, start to finish. */
export function Process() {
  return (
    <section id="process" className="py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="A clear process, start to finish."
            copy="You always know what's happening and what's next. It starts with a free audit — you see the problems before you spend anything."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-line bg-surface p-5">
                <span className="font-display text-2xl font-bold text-accent">{p.step}</span>
                <h3 className="mt-3 font-display text-base font-semibold tracking-tight text-offwhite">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Merged "Principles + Checklist + Industries" section. */
export function Standards() {
  return (
    <section className="border-y border-line bg-base-2 py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Why Ismail Web Studio"
            title="What Every Website Is Built Around"
            copy="Four principles hold up every project, whatever the industry. Below them is the exact checklist each site is checked against before it ships."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.06}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 font-display text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-offwhite">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-base font-semibold tracking-tight text-offwhite">
                Every site I ship meets this checklist
              </h3>
              <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {qualityChecklist.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-muted">
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-base font-semibold tracking-tight text-offwhite">
                Who I Work With
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {clientTypes.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-line px-3 py-1.5 text-[12px] text-muted"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Honest about section — logo instead of a photo, no invented facts. */
export function About() {
  const tools = isTodo(site.tools)
    ? ["Web Design", "Website Development", "Redesigns", "Landing Pages", "Website Fixes"]
    : site.tools.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[2fr_3fr]">
        <Reveal>
          <div className="studio-bg relative mx-auto grid aspect-square w-full max-w-sm place-items-center overflow-hidden rounded-3xl border border-line">
            <Image
              src="/logo.png"
              alt={`${site.brand} logo`}
              width={400}
              height={400}
              className="h-auto w-full max-w-[15rem] rounded-full object-contain"
              priority
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading eyebrow="About" title={site.role} />
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">{site.bio}</p>

          <dl className="mt-8 space-y-4 border-t border-line pt-8 text-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                Studio
              </dt>
              <dd className="text-offwhite/90">{site.brand}</dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                Email
              </dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            {!isTodo(site.experience) && (
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                  Focus
                </dt>
                <dd className="text-offwhite/90">{site.experience}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {isTodo(site.tools) ? "What I do" : "Tools"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {tools.map((t) => (
                <span key={t} className="rounded-full bg-white/5 px-3 py-1.5 text-[12px] text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {site.socials.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-offwhite"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}

          <a
            href={`mailto:${site.email}`}
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-offwhite transition-colors hover:bg-white/5"
          >
            <Mail className="h-4 w-4 text-accent" />
            Email me directly
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
