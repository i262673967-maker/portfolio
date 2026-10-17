"use client";

import Link from "next/link";
import { Smartphone, ArrowRight, ExternalLink, ArrowLeft, Target } from "lucide-react";
import DeviceMockup from "./DeviceMockup";
import LazyDemo from "./LazyDemo";
import { cta, type Project } from "@/lib/data";

/* The palette keys are code shorthand (bg/fg); a visitor needs the role each
   colour plays, stated in the words a client would use. */
const PALETTE_ROLE: Record<string, string> = { bg: "Background", fg: "Text", accent: "Accent" };

export default function CaseStudy({ project, prev, next }: { project: Project; prev?: Project; next?: Project }) {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="border-b-2 border-line pt-28 pb-14">
        <div className="container-shell">
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[12px] text-brand">{project.index} · {project.businessType}</span>
              <h1 className="heading-display mt-2 text-4xl text-ink sm:text-5xl">{project.name}</h1>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border-2 border-line bg-card px-3 py-1 font-mono text-[12px] uppercase tracking-widest text-ink-muted">
                Concept project · fictional business
              </span>
            </div>
            <Link href={`/demos/${project.slug}`} className="group inline-flex min-h-11 items-center justify-center gap-2 btn-pop bg-brand px-5 py-3 text-sm font-semibold text-on-brand">
              <ExternalLink className="h-4 w-4" /> Open Full Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Ruling C: the concept is embedded at this page's own width instead of
          behind a device shell. A framed preview cannot be scrolled or tapped —
          its subtree is `inert`, which is what holds accessibility at 100 — and a
          visitor who came here to look at the work reads that as a broken page.
          Inline it runs top to bottom in the case study's own scroll, picks its
          desktop layout above 1024px through container queries, and drops to its
          phone layout on a phone. `preview` stays true, so the concept keeps its
          headings at <h2> and this page keeps a single <h1>. */}
      <div className="container-shell mt-12">
        <p className="max-w-prose text-[15px] leading-relaxed text-ink-muted">
          The full concept at this page&apos;s own width — scroll it the way a visitor
          would read it. Its menu and forms are live, and a request entered here is
          never sent anywhere.
        </p>
        <div className="demo-embed relative mt-8">
          <LazyDemo eager demo={project.demo} project={project} />
        </div>
      </div>

      {/* The responsive story still gets told, and a small frame plainly reads as
          a picture of the site rather than a site to explore — so this one keeps
          the shell, stays inert, and mounts only once it is near the viewport. */}
      <div className="container-shell mt-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          The same page on a phone
        </h2>
        <div className="mt-6">
          <DeviceMockup device="mobile" previewLabel={`${project.name} — mobile preview`}>
            <LazyDemo demo={project.demo} project={project} />
          </DeviceMockup>
        </div>
      </div>

      {/* Details */}
      <div className="container-shell mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Design objective</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{project.objective}</p>

          <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight text-ink">Website strategy</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{project.strategy}</p>

          <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight text-ink">Key sections</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.keySections.map((s) => (
              <span key={s} className="rounded-full border-2 border-line bg-card px-3.5 py-1.5 text-[13px] text-ink">{s}</span>
            ))}
          </div>

          <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight text-ink">Mobile experience</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink-muted">
            {project.mobileNotes.map((m) => (
              <li key={m} className="flex items-start gap-2.5"><Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{m}</li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight text-ink">Conversion focus</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink-muted">
            {project.conversionNotes.map((c) => (
              <li key={c} className="flex items-start gap-2.5"><Target className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{c}</li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight text-ink">Design details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-line bg-card p-5">
              <span className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">Direction</span>
              <ul className="mt-2 space-y-1.5 text-[14px] text-ink">
                {project.designDirection.map((d) => <li key={d} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-brand" />{d}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-line bg-card p-5">
              <span className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">Palette</span>
              <div className="mt-3 flex gap-2">
                {Object.entries(project.palette).map(([k, v]) => (
                  <div key={k} className="flex-1">
                    <div className="h-10 rounded-lg border-2 border-line" style={{ background: v }} />
                    <span className="mt-1 block font-mono text-[12px] uppercase text-ink-muted">
                      {PALETTE_ROLE[k] ?? k}
                    </span>
                    <span className="block font-mono text-[12px] text-ink-muted">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side facts + CTA */}
        <aside className="space-y-4">
          <div className="rounded-2xl border-2 border-line bg-card p-6">
            <dl className="space-y-4">
              <div><dt className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">Project Type</dt><dd className="mt-1 text-[14px] text-ink">{project.businessType}</dd></div>
              <div><dt className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">Industry</dt><dd className="mt-1 text-[14px] text-ink">{project.industry}</dd></div>
              <div><dt className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">Accent</dt><dd className="mt-1 inline-flex items-center gap-2 text-[14px] text-ink"><span className="h-3 w-3 rounded-full" style={{ background: project.accent }} />{project.accent}</dd></div>
            </dl>
          </div>
          <div className="rounded-2xl border-2 border-brand bg-brand/[0.07] p-6 text-center">
            <h3 className="font-display text-lg font-semibold tracking-tight text-ink">Want a website like this for your business?</h3>
            <Link href="/#contact" className="mt-4 inline-flex w-full min-h-11 items-center justify-center gap-2 btn-pop bg-brand px-5 py-3 text-sm font-semibold text-on-brand">
              {cta.nav} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>

      {/* Prev / next */}
      {(prev || next) && (
        <div className="container-shell mt-16 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="group rounded-2xl border-2 border-line bg-card p-6 transition-colors hover:border-brand">
              <span className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">← Previous</span>
              <span className="mt-2 block font-display text-lg font-semibold text-ink">{prev.name}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/work/${next.slug}`} className="group rounded-2xl border-2 border-line bg-card p-6 text-right transition-colors hover:border-brand">
              <span className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">Next →</span>
              <span className="mt-2 block font-display text-lg font-semibold text-ink">{next.name}</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
