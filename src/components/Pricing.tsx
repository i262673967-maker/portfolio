import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { carePlans, cta, packageTerms, pricingPackages } from "@/lib/data";

const cardBase = "relative h-full overflow-hidden p-6";
const featuredCard = `${cardBase} rounded-[22px] border-2 border-brand bg-card shadow-[4px_4px_0_var(--color-brand)]`;
/* The pricing Business tier is filled brand-blue with a yellow sticker. White
   text on brand clears AA (5.23:1); the sticker uses ink on the yellow mark
   (12.55:1). Care-plan tiers keep the lighter brand-bordered `featuredCard`. */
const filledCard = `${cardBase} rounded-[22px] border-2 border-brand bg-brand text-on-brand shadow-[4px_4px_0_var(--color-ink)]`;

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
            <Reveal key={p.name} step={i}>
              <div className={p.featured ? filledCard : `${cardBase} card-pop card-spot`}>
                {p.featured && (
                  <span className="absolute right-4 top-4 rotate-3 rounded-full bg-mark px-2.5 py-1 font-mono text-[12px] font-semibold uppercase tracking-widest text-ink">
                    Most popular
                  </span>
                )}
                {/* `on-brand` is white, so it may only be used on the filled
                    brand card. On the white card-pop tiers it has to be ink and
                    brand, or the name and price vanish into the background. */}
                <h3
                  className={`font-display text-lg font-bold tracking-tight ${
                    p.featured ? "text-on-brand" : "text-ink"
                  }`}
                >
                  {p.name}
                </h3>
                <p
                  className={`mt-2 font-display text-3xl font-extrabold tracking-tight ${
                    p.featured ? "text-on-brand" : "text-brand"
                  }`}
                >
                  {p.price}
                </p>
                <ul className={`mt-5 space-y-2 border-t pt-5 ${p.featured ? "border-white/25" : "border-line"}`}>
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 text-[13px] ${
                        p.featured ? "text-on-brand" : "text-ink-muted"
                      }`}
                    >
                      <Check className={`h-3.5 w-3.5 shrink-0 ${p.featured ? "text-mark" : "text-brand"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Terms + the one primary action. */}
        <Reveal delay={0.08}>
          <div className="card-pop card-spot mt-6 p-6 text-center sm:p-8">
            <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-ink-muted">
              {packageTerms.included}
            </p>
            <p className="mx-auto mt-2 max-w-xl text-[14px] leading-relaxed text-ink-muted">
              {packageTerms.payment} {packageTerms.approval}
            </p>
            <Link
              href="/#contact"
              className="btn-pop group mt-7 inline-flex min-h-11 items-center justify-center gap-2 bg-brand px-7 py-3.5 text-[15px] font-semibold text-on-brand"
            >
              {cta.nav}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-widest text-ink-muted">
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
              className="group inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-brand underline decoration-brand/50 underline-offset-4 transition-colors hover:decoration-brand"
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

/* Monthly care. */
export function CarePlans() {
  return (
    <section id="care-plans" className="border-y-2 border-line py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Website Care Plans"
            title="Keep your website running, so you can focus on your customers."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {carePlans.map((p, i) => (
            <Reveal key={p.name} step={i}>
              <div className={p.featured ? featuredCard : `${cardBase} card-pop card-spot`}>
                {p.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-brand px-2.5 py-1 font-mono text-[12px] font-semibold uppercase tracking-widest text-on-brand">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                  {p.name}
                </h3>
                <p className="mt-2 font-display text-3xl font-extrabold tracking-tight text-brand">
                  {p.price}
                  {p.period && (
                    <span className="font-sans text-[14px] font-normal text-ink-muted">{p.period}</span>
                  )}
                </p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-ink-muted">
                      <Check className="h-3.5 w-3.5 shrink-0 text-brand" />
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
          <div className="card-pop card-spot mt-6 p-6 text-center sm:p-8">
            <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-ink-muted">
              Care plans are optional.
            </p>
            {/* A plain text link, not a second filled button: the pricing band
                above already carries this section's call to action. */}
            <Link
              href="/#contact"
              className="group mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand underline decoration-brand/50 underline-offset-4 transition-colors hover:decoration-brand"
            >
              Start with a free audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
