"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import DeviceMockup from "./DeviceMockup";
import { Demo } from "@/demos";
import { projects, site, type DemoKey } from "@/lib/data";

const byDemo = (k: DemoKey) => projects.find((p) => p.demo === k)!;

const offering = ["Web Design", "Development", "Redesigns", "Landing Pages"];

/* Entrance staging lives in CSS (see globals.css .reveal) so the copy is visible
   even when the client bundle never runs. */
const staged = (delay: number, y = 14) =>
  ({ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="home" className="studio-bg relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container-shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <div>
            <p className="eyebrow reveal" style={staged(0, 12)}>
              New Websites · Website Fixes · Local Businesses
            </p>

            <h1
              className="heading-display mt-5 text-[2.5rem] leading-[1.03] sm:text-5xl lg:text-[3.4rem] reveal"
              style={staged(0.06, 18)}
            >
              I Build New Websites. I Fix{" "}
              <span className="relative inline-block text-accent">
                Slow, Outdated
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-accent to-warm"
                  style={{ animation: "underline-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both" }}
                />
              </span>{" "}
              Ones.
            </h1>

            <p
              className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px] reveal"
              style={staged(0.14)}
            >
              {site.supportingMessage}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 reveal" style={staged(0.2)}>
              {offering.map((o) => (
                <span key={o} className="rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] text-muted">
                  {o}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row reveal" style={staged(0.26)}>
              <Link
                href="/#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(56,189,248,0.6)]"
              >
                <Search className="h-4 w-4" /> Get My Free Website Audit
              </Link>
              <Link
                href="/#work"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-[15px] font-semibold text-offwhite transition-colors hover:bg-white/5"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="mt-5 max-w-md text-[13px] leading-relaxed text-faint reveal" style={staged(0.34)}>
              {site.auditOffer}
            </p>
          </div>

          <div
            className="relative mx-auto w-full max-w-[560px] reveal"
            style={staged(0.2, 24)}
          >
            <div className="relative pb-[6%]">
              <div className="relative z-10">
                <DeviceMockup device="desktop">
                  <Demo demo="renovation" project={byDemo("renovation")} />
                </DeviceMockup>
              </div>

              <div
                className="absolute -bottom-10 -right-4 z-20 hidden w-[46%] sm:block lg:-right-10 reveal"
                style={staged(0.5, 20)}
              >
                <DeviceMockup device="tablet" chrome={false}>
                  <Demo demo="ecommerce" project={byDemo("ecommerce")} />
                </DeviceMockup>
              </div>

              <div
                className="absolute -bottom-14 -left-2 z-30 hidden w-[30%] sm:block lg:-left-8 reveal"
                style={staged(0.62, 20)}
              >
                <DeviceMockup device="mobile" chrome={false}>
                  <Demo demo="restaurant" project={byDemo("restaurant")} />
                </DeviceMockup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
