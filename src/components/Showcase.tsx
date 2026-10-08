"use client";

import { useState } from "react";
import Link from "next/link";
import { Monitor, Tablet, Smartphone, ExternalLink, ArrowRight } from "lucide-react";
import DeviceMockup, { type Device } from "./DeviceMockup";
import LazyDemo from "./LazyDemo";
import { featuredProjects, projects } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

const devices: { id: Device; label: string; icon: typeof Monitor }[] = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];

/* The homepage work section: the three strongest concepts, each previewable
   the way a customer would see it. The other projects live on /projects. */
export default function Showcase() {
  const [active, setActive] = useState(0);
  const [device, setDevice] = useState<Device>("desktop");
  const project = featuredProjects[active];

  return (
    <section id="work" className="relative border-y border-line bg-base-2 py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Concept Projects · Live Preview"
            title={<>See The Websites From Your Customer&apos;s Perspective.</>}
            copy="Each of these is a fully-designed website for a fictional local business — labelled as a concept, never presented as a live client. Pick one, then switch between desktop, tablet, and mobile. The same site reflows exactly as it would on a real device."
            align="center"
          />
        </Reveal>

        {/* Project selector */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {featuredProjects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`min-h-11 rounded-full border px-4 py-2 text-[13px] transition-all ${
                  i === active
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-line text-muted hover:border-line-strong hover:text-offwhite"
                }`}
              >
                {/* 80% is the floor: below that the numeral falls under 4.5:1 on
                    both the surface and footer backgrounds. */}
                <span className="font-mono text-[11px] opacity-80">{p.index}</span>{" "}
                {p.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Device toggle */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border border-line bg-surface p-1">
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
                      device === d.id ? "text-ink" : "text-muted hover:text-offwhite"
                    }`}
                  >
                    {/* Always mounted, faded by opacity: the highlight leaves the
                        old button as it enters the new one, which is what a
                        shared-layout pill looked like, without the library. */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 rounded-full bg-accent transition-opacity duration-200 ${
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
          <span className="absolute -top-3 left-4 z-30 rounded-full border border-line-strong bg-base/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-accent backdrop-blur">
            Concept Project
          </span>
          <div key={`${project.slug}-${device}`} className="reveal">
            <DeviceMockup device={device}>
              <LazyDemo eager demo={project.demo} project={project} />
            </DeviceMockup>
          </div>
        </div>

        {/* Actions */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={`/demos/${project.slug}`}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-offwhite px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-accent"
            >
              <ExternalLink className="h-4 w-4" />
              Open Full Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-offwhite transition-colors hover:bg-white/5"
            >
              View case study
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 px-2 text-sm font-semibold text-muted transition-colors hover:text-offwhite"
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
