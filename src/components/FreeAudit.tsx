import Link from "next/link";
import { Check, X, TriangleAlert, ArrowRight, ClipboardList } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { auditChecks, cta, sampleAudit } from "@/lib/data";

/* Status colours stay inside the brand palette and AA-safe: `good` uses brand
   blue on a card (5.23:1); `warn`/`bad` use neutral ink rather than a colour
   that can't clear contrast on white — the icon glyph (tick / alert / cross)
   carries the meaning, so colour is never the only signal. */
const statusStyle = {
  good: { row: "border-brand/40 bg-brand/[0.07]", icon: "text-brand", mark: <Check className="h-3.5 w-3.5" /> },
  warn: { row: "border-line bg-ink/[0.04]", icon: "text-ink-muted", mark: <TriangleAlert className="h-3.5 w-3.5" /> },
  bad: { row: "border-line bg-ink/[0.06]", icon: "text-ink", mark: <X className="h-3.5 w-3.5" /> },
} as const;

/* The extra top padding is breathing room after the full-bleed blue band above
   it; the hairline alone let the two sections collide. */
export default function FreeAudit() {
  return (
    <section id="audit" className="border-t-2 border-line pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="Free Website Audit"
            title="I'll show you what's wrong with your website — free."
          />
          <p className="mt-6 text-[14px] leading-relaxed text-ink-muted">
            Send me your link and I look at it the way a customer would, on the device they
            actually use. You get an honest read on what is helping your business and what is
            quietly getting in the way — no obligation, and no promises about rankings or
            revenue.
          </p>
          <ul className="mt-7 grid gap-2 sm:grid-cols-2">
            {auditChecks.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2.5 rounded-xl border-2 border-line bg-card px-3.5 py-2.5 text-[13px] text-ink"
              >
                <ClipboardList className="h-3.5 w-3.5 shrink-0 text-brand" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card-pop relative p-6 sm:p-8">
            {/* A tilted "Sample" sticker — the pill and the note below each say
                the same thing in words; the sticker carries it at a glance. */}
            <span className="sticker absolute -right-3 -top-3 z-10 h-16 w-16 text-center text-[12px] leading-tight">
              Sample
            </span>
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
              <div>
                <p className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">
                  Website Health
                </p>
                <p className="mt-2 font-display text-4xl font-extrabold text-ink">
                  {sampleAudit.score}
                  <span className="text-[16px] font-semibold text-ink-muted">/100</span>
                </p>
              </div>
              <span className="rounded-full border-2 border-line bg-mark px-3 py-1.5 text-right font-mono text-[12px] font-semibold uppercase leading-[1.5] tracking-widest text-ink">
                Sample audit · illustrative example
              </span>
            </div>

            <ul className="mt-6 space-y-2.5">
              {sampleAudit.rows.map((r) => {
                const s = statusStyle[r.status];
                return (
                  <li key={r.label} className={`rounded-xl border px-3.5 py-2.5 ${s.row}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[13px] text-ink">{r.label}</span>
                      <span className={`shrink-0 ${s.icon}`}>{s.mark}</span>
                    </div>
                    <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">{r.note}</p>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 font-mono text-[12px] uppercase tracking-widest text-ink-muted">
              What I would fix first
            </p>
            <ol className="mt-3 space-y-2">
              {sampleAudit.fixes.map((f, i) => (
                <li key={f} className="flex items-baseline gap-3 text-[13px] text-ink">
                  <span className="font-display text-[13px] font-extrabold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f}
                </li>
              ))}
            </ol>

            <p className="mt-5 rounded-xl border-2 border-dashed border-line px-3.5 py-3 text-[12px] leading-relaxed text-ink-muted">
              The report format, shown on a fictional site. Not a real client,
              and not a measured result.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-2">
          <div className="card-pop flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                Want me to check yours?
              </h3>
              <p className="mt-1.5 text-[14px] text-ink-muted">
                No commitment. Just an honest audit of what could be improved.
              </p>
            </div>
            <Link
              href="/#contact"
              className="btn-pop group inline-flex shrink-0 items-center justify-center gap-2 bg-brand px-6 py-3.5 text-[15px] font-semibold text-on-brand"
            >
              {cta.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
