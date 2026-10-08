"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import DeviceMockup from "./DeviceMockup";
import LazyDemo from "./LazyDemo";
import { cta, heroPoints, projects, site, type DemoKey } from "@/lib/data";

const byDemo = (k: DemoKey) => projects.find((p) => p.demo === k)!;

/* Entrance staging lives in CSS (see globals.css .reveal) so the copy is visible
   even when the client bundle never runs. */
const staged = (delay: number, y = 14) =>
  ({ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` }) as React.CSSProperties;

/* The hero's own text carries no `reveal`: its animation starts from opacity 0
   with fill-mode `both`, which makes the first line of copy unpaintable until the
   delay elapses — and it is the page's largest contentful paint. */

export default function Hero() {
  return (
    <section id="home" className="studio-bg relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container-shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <div>
            <p className="eyebrow">
              Websites for Local Businesses
            </p>

            <h1
              /* Fluid size tuned to this headline's measured wrap points: 4 text
                 lines at 320 and 360, 3 at 390 (was 4 at 36px). The fixed sm:/lg:
                 steps from 640px up are untouched. */
              className="heading-display mt-5 text-balance text-[clamp(1.875rem,1.5rem_+_1.1vw,2.15rem)] leading-[1.04] sm:text-5xl lg:text-[3.4rem]"
            >
              Your Website Might Be{" "}
              <span className="relative inline-block text-accent">
                Costing You Customers.
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-accent to-warm"
                  style={{ animation: "underline-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both" }}
                />
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
              Fast, mobile-friendly websites for plumbers, electricians, roofers,
              HVAC, renovators, contractors and other local trades — built to make
              it easier for visitors to call or enquire.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {heroPoints.map((o) => (
                <span key={o} className="rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] text-muted">
                  {o}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(56,189,248,0.6)]"
              >
                <Search className="h-4 w-4" /> {cta.primary}
              </Link>
              <Link
                href="/#work"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-[15px] font-semibold text-offwhite transition-colors hover:bg-white/5"
              >
                {cta.secondary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="mt-5 max-w-md text-[13px] leading-relaxed text-faint">
              {site.auditOffer}
            </p>
          </div>

          <div
            className="peek-host relative mx-auto w-full max-w-[560px] reveal"
            style={staged(0.2, 24)}
            /* Decoration, not a real site to explore: the three frames illustrate what the
               work looks like, and their links already exist on the pages they point to.
               `inert` belongs to the inner block below rather than here, because an inert
               element is never hit-testable and the hover drift has to be triggered from
               outside it. `aria-hidden` on this wrapper keeps the whole subtree out of the
               accessibility tree either way — aria-hidden alone would leave focusable
               controls hidden from a screen reader. */
            aria-hidden="true"
          >
            <div className="relative pb-[6%]" inert>
              <div className="relative z-10">
                <DeviceMockup device="desktop" hoverPeek>
                  <LazyDemo demo="renovation" project={byDemo("renovation")} />
                </DeviceMockup>
              </div>

              <div
                className="absolute -bottom-10 -right-4 z-20 hidden w-[46%] sm:block lg:-right-10 reveal"
                style={staged(0.5, 20)}
              >
                <DeviceMockup device="tablet" chrome={false} hoverPeek>
                  <LazyDemo demo="ecommerce" project={byDemo("ecommerce")} />
                </DeviceMockup>
              </div>

              <div
                className="absolute -bottom-14 -left-2 z-30 hidden w-[30%] sm:block lg:-left-8 reveal"
                style={staged(0.62, 20)}
              >
                <DeviceMockup device="mobile" chrome={false} hoverPeek>
                  <LazyDemo demo="restaurant" project={byDemo("restaurant")} />
                </DeviceMockup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
