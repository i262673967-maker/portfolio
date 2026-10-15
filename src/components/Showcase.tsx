"use client";

import { useState } from "react";
import Link from "next/link";
import { Monitor, Tablet, Smartphone, ExternalLink, ArrowRight } from "lucide-react";
import DeviceMockup, { type Device } from "./DeviceMockup";
import LazyDemo from "./LazyDemo";
import { projects } from "@/lib/data";
import { Reveal } from "./ui";

const devices: { id: Device; label: string; icon: typeof Monitor }[] = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];

/* The homepage work section: every concept, each previewable the way a customer
   would see it. The names stacked into a column ate a third of a phone screen,
   so below `sm` the selector is one snap-scrolling row instead. */
export default function Showcase() {
  const [active, setActive] = useState(0);
  const [device, setDevice] = useState<Device>("desktop");
  const project = projects[active];

  return (
    <section id="work" className="relative border-y-2 border-line bg-paper-2 py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          {/* On the paper-2 band every text token is ink/ink-muted — the brand
              eyebrow and link are dropped here because brand blue sits at 4.27:1
              on paper-2. The heading block is built by hand rather than through
              SectionHeading so the eyebrow can go ink-muted. */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">
              Concept Projects · Live Preview
            </p>
            <h2 className="heading-display mt-3 text-3xl sm:text-4xl md:text-[2.75rem]">
              See The Websites From Your Customer&apos;s Perspective.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              Each of these is a fully-designed website for a fictional local business —
              labelled as a concept, never presented as a live client. Pick one, then switch
              between desktop, tablet, and mobile. The same site reflows exactly as it would
              on a real device.
            </p>
          </div>
        </Reveal>

        {/* Project selector */}
        <Reveal delay={0.05}>
          {/* Below `sm` this is one snap-scrolling row rather than a wrap: the
              pills stacked vertically pushed the preview off a phone screen.
              `shrink-0` keeps each pill at its own width inside the scroller. */}
          <div className="pill-row mt-10 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`min-h-11 shrink-0 rounded-full border-2 px-4 py-2 text-[13px] whitespace-nowrap transition-all ${
                  i === active
                    ? "border-brand bg-brand text-on-brand"
                    : "border-line text-ink-muted hover:border-brand hover:text-ink"
                }`}
              >
                {/* Full-strength numeral: on the solid brand fill any opacity would
                    pull the white toward blue and drop it under 4.5:1. */}
                <span className="font-mono text-[12px]">{p.index}</span>{" "}
                {p.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Device toggle */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border-2 border-line bg-card p-1">
              {devices.map((d) => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.id}
                    type="button"
                    aria-label={`Preview on ${d.label.toLowerCase()}`}
                    aria-pressed={device === d.id}
                    onClick={() => setDevice(d.id)}
                    className={`relative inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 text-[13px] transition-colors ${
                      device === d.id ? "text-on-brand" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {/* Always mounted, faded by opacity: the highlight leaves the
                        old button as it enters the new one, which is what a
                        shared-layout pill looked like, without the library. */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 rounded-full bg-brand transition-opacity duration-200 ${
                        device === d.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <Icon className="relative z-10 h-4 w-4" />
                    <span className="relative z-10 hidden sm:inline">{d.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Preview */}
        <div className="relative mt-10">
          <span className="absolute -top-3 left-4 z-30 rounded-full border-2 border-line bg-card px-2.5 py-1 font-mono text-[12px] uppercase tracking-widest text-brand">
            Concept Project
          </span>
          <div key={`${project.slug}-${device}`} className="reveal">
            <DeviceMockup
              device={device}
              /* The desktop frame's own max is 960, which made this band taller
                 than most phone screens; 720 keeps the same 16:10 preview at a
                 height the visitor can see all of. */
              maxWidth={device === "desktop" ? 720 : undefined}
              previewLabel={`${project.name} — ${device} preview`}
            >
              <LazyDemo eager demo={project.demo} project={project} />
            </DeviceMockup>
          </div>
        </div>

        {/* Actions */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={`/demos/${project.slug}`}
              className="group inline-flex min-h-11 items-center justify-center gap-2 btn-pop bg-brand px-6 py-3 text-sm font-semibold text-on-brand"
            >
              <ExternalLink className="h-4 w-4" />
              Open Full Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full btn-pop bg-paper px-6 py-3 text-sm font-semibold text-ink"
            >
              View case study
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 px-2 text-sm font-semibold text-ink underline decoration-ink/40 underline-offset-4 transition-colors hover:decoration-ink"
            >
              All {projects.length} concept projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
