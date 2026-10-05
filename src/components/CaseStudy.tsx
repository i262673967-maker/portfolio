"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor, Smartphone, ArrowRight, ExternalLink, ArrowLeft, Target } from "lucide-react";
import DeviceMockup, { type Device } from "./DeviceMockup";
import { Demo } from "@/demos";
import { cta, type Project } from "@/lib/data";

export default function CaseStudy({ project, prev, next }: { project: Project; prev?: Project; next?: Project }) {
  const [device, setDevice] = useState<Device>("desktop");

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="studio-bg border-b border-line pt-28 pb-14">
        <div className="container-shell">
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-offwhite">
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[12px] text-accent">{project.index} · {project.businessType}</span>
              <h1 className="heading-display mt-2 text-4xl sm:text-5xl">{project.name}</h1>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                Concept project · fictional business
              </span>
            </div>
            <Link href={`/demos/${project.slug}`} className="group inline-flex items-center gap-2 rounded-full bg-offwhite px-5 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-accent">
              <ExternalLink className="h-4 w-4" /> Open Full Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Live preview with device toggle */}
      <div className="container-shell mt-12">
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-line bg-surface p-1">
            {([["desktop", Monitor, "Desktop"], ["mobile", Smartphone, "Mobile"]] as const).map(([id, Icon, label]) => (
              <button
                key={id}
                type="button"
                aria-label={`Preview on ${label.toLowerCase()}`}
                aria-pressed={device === id}
                onClick={() => setDevice(id)}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] transition-colors ${device === id ? "text-ink" : "text-muted hover:text-offwhite"}`}
              >
                {device === id && <motion.span layoutId="cs-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <Icon className="relative z-10 h-4 w-4" /><span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <div key={device} className="reveal">
            <DeviceMockup device={device}>
              <Demo demo={project.demo} project={project} />
            </DeviceMockup>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="container-shell mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Design objective</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.objective}</p>

          <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight">Website strategy</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.strategy}</p>

          <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight">Key sections</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.keySections.map((s) => (
              <span key={s} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-offwhite/85">{s}</span>
            ))}
          </div>

          <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight">Mobile experience</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted">
            {project.mobileNotes.map((m) => (
              <li key={m} className="flex items-start gap-2.5"><Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{m}</li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight">Conversion focus</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted">
            {project.conversionNotes.map((c) => (
              <li key={c} className="flex items-start gap-2.5"><Target className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{c}</li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight">Design details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-surface p-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-faint">Direction</span>
              <ul className="mt-2 space-y-1.5 text-[14px] text-offwhite/85">
                {project.designDirection.map((d) => <li key={d} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" />{d}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-surface p-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-faint">Palette</span>
              <div className="mt-3 flex gap-2">
                {Object.entries(project.palette).map(([k, v]) => (
                  <div key={k} className="flex-1">
                    <div className="h-10 rounded-lg border border-line" style={{ background: v }} />
                    <span className="mt-1 block font-mono text-[9px] uppercase text-faint">{k}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side facts + CTA */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <dl className="space-y-4">
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-faint">Project Type</dt><dd className="mt-1 text-[14px] text-offwhite">{project.businessType}</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-faint">Industry</dt><dd className="mt-1 text-[14px] text-offwhite">{project.industry}</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-faint">Accent</dt><dd className="mt-1 inline-flex items-center gap-2 text-[14px] text-offwhite"><span className="h-3 w-3 rounded-full" style={{ background: project.accent }} />{project.accent}</dd></div>
            </dl>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 text-center">
            <h3 className="font-display text-lg font-semibold tracking-tight">Want a website like this for your business?</h3>
            <Link href="/#contact" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5">
              {cta.primary} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>

      {/* Prev / next */}
      {(prev || next) && (
        <div className="container-shell mt-16 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/40">
              <span className="font-mono text-[10px] uppercase tracking-widest text-faint">← Previous</span>
              <span className="mt-2 block font-display text-lg font-semibold">{prev.name}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/work/${next.slug}`} className="group rounded-2xl border border-line bg-surface p-6 text-right transition-colors hover:border-accent/40">
              <span className="font-mono text-[10px] uppercase tracking-widest text-faint">Next →</span>
              <span className="mt-2 block font-display text-lg font-semibold">{next.name}</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
