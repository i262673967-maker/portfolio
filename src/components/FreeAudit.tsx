import Link from "next/link";
import { Check, X, TriangleAlert, ArrowRight, ClipboardList } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { auditChecks, cta, sampleAudit } from "@/lib/data";

const statusStyle = {
  good: { row: "border-accent/35 bg-accent/[0.07]", icon: "text-accent", mark: <Check className="h-3.5 w-3.5" /> },
  warn: { row: "border-warm/35 bg-warm/[0.07]", icon: "text-warm", mark: <TriangleAlert className="h-3.5 w-3.5" /> },
  bad: { row: "border-warm/50 bg-warm/[0.12]", icon: "text-warm", mark: <X className="h-3.5 w-3.5" /> },
} as const;

export default function FreeAudit() {
  return (
    <section id="audit" className="border-t border-line py-20 sm:py-28">
      <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="Free Website Audit"
            title="I'll show you what's wrong with your website — free."
          />
          <p className="mt-6 text-[14px] leading-relaxed text-muted">
            Send me your link and I look at it the way a customer would, on the device they
            actually use. You get an honest read on what is helping your business and what is
            quietly getting in the way — no obligation, and no promises about rankings or
            revenue.
          </p>
          <ul className="mt-7 grid gap-2 sm:grid-cols-2">
            {auditChecks.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[13px] text-offwhite/90"
              >
                <ClipboardList className="h-3.5 w-3.5 shrink-0 text-accent" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Website Health
                </p>
                <p className="mt-2 font-display text-4xl font-bold text-offwhite">
                  {sampleAudit.score}
                  <span className="text-[16px] font-semibold text-faint">/100</span>
                </p>
              </div>
              <span className="rounded-full border border-warm/40 bg-warm/[0.1] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-warm">
                Sample Audit
              </span>
            </div>

            <ul className="mt-6 space-y-2.5">
              {sampleAudit.rows.map((r) => {
                const s = statusStyle[r.status];
                return (
                  <li key={r.label} className={`rounded-xl border px-3.5 py-2.5 ${s.row}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[13px] text-offwhite/90">{r.label}</span>
                      <span className={`shrink-0 ${s.icon}`}>{s.mark}</span>
                    </div>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted">{r.note}</p>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted">
              What I would fix first
            </p>
            <ol className="mt-3 space-y-2">
              {sampleAudit.fixes.map((f, i) => (
                <li key={f} className="flex items-baseline gap-3 text-[13px] text-offwhite/90">
                  <span className="font-display text-[13px] font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f}
                </li>
              ))}
            </ol>

            <p className="mt-5 rounded-xl border border-dashed border-line-strong px-3.5 py-3 text-[12px] leading-relaxed text-faint">
              Illustrative example of the report format on a fictional site. Not a real client,
              and not a measured result.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-2">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-base-2 p-6 sm:flex-row sm:items-center sm:p-7">
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-offwhite">
                Want me to check yours?
              </h3>
              <p className="mt-1.5 text-[14px] text-muted">
                No commitment. Just an honest audit of what could be improved.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-ink transition-all hover:-translate-y-0.5"
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
