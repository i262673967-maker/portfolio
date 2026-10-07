import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { carePlans, cta, packageTerms, pricingPackages } from "@/lib/data";

/* Founding client pricing. The figures in src/lib/data.ts are the only prices
   this site publishes: no struck-through reference price, no "you save" claim,
   no anchor price anywhere — the "first 10 businesses" line is what does the
   discounting. Card styling is the services card pattern, badge included. */
export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Founding Client Pricing"
            copy="Limited to my first 10 businesses. Prices in USD."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPackages.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.06}>
              <div
                className={`relative h-full overflow-hidden rounded-2xl border p-6 transition-colors ${
                  p.featured
                    ? "border-accent/40 bg-surface-2"
                    : "border-line bg-surface hover:border-line-strong"
                }`}
              >
                {p.featured && (
                  <>
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
                    <span className="absolute right-4 top-4 rounded-full bg-accent px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink">
                      Most popular
                    </span>
                  </>
                )}
                <h3 className="font-display text-lg font-semibold tracking-tight text-offwhite">
                  {p.name}
                </h3>
                <p className="mt-2 font-display text-3xl font-bold tracking-tight text-accent">
                  {p.price}
                </p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-muted">
                      <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Terms + the one primary action. A filled pill in the accent colour is
            the site's single primary CTA style (FinalCta uses the same), so this
            reads as the same action rather than a competing one. */}
        <Reveal delay={0.08}>
          <div className="mt-6 rounded-2xl border border-line bg-surface p-8 text-center sm:p-12">
            <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-muted">
              {packageTerms.included}
            </p>
            <p className="mx-auto mt-2 max-w-xl text-[14px] leading-relaxed text-muted">
              {packageTerms.payment} {packageTerms.approval}
            </p>
            <Link
              href="/#contact"
              className="group mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-offwhite"
            >
              {cta.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              Need something different? Ask for a custom quote.
            </p>
          </div>
        </Reveal>

        {/* Care plans are the very next section. A plain underlined text link,
            not a second pill, so the band above keeps the only filled CTA. */}
        <Reveal delay={0.08}>
          <p className="mt-6 text-center">
            <Link
              href="/#care-plans"
              className="group inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              See care plans
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* Monthly care, on the band background the alternating sections use. */
export function CarePlans() {
  return (
    <section id="care-plans" className="border-y border-line bg-base-2 py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Website Care Plans"
            title="Keep your website running, so you can focus on your customers."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {carePlans.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.06}>
              <div
                className={`relative h-full overflow-hidden rounded-2xl border p-6 transition-colors ${
                  p.featured
                    ? "border-accent/40 bg-surface-2"
                    : "border-line bg-surface hover:border-line-strong"
                }`}
              >
                {p.featured && (
                  <>
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
                    <span className="absolute right-4 top-4 rounded-full bg-accent px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink">
                      Most popular
                    </span>
                  </>
                )}
                <h3 className="font-display text-lg font-semibold tracking-tight text-offwhite">
                  {p.name}
                </h3>
                <p className="mt-2 font-display text-3xl font-bold tracking-tight text-accent">
                  {p.price}
                  {p.period && (
                    <span className="font-sans text-[14px] font-normal text-muted">{p.period}</span>
                  )}
                </p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-muted">
                      <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* TODO(Ismail): "No lock-in contracts. Cancel anytime." stays withheld
           until he confirms it as a term he actually offers. */}
        <Reveal delay={0.08}>
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 text-center sm:p-8">
            <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-muted">
              Care plans are optional.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
