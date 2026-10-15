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
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      <div className="container-shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div>
            <p className="eyebrow">
              Websites for Local Businesses
            </p>

            <h1
              /* Fluid size tuned to this headline's measured wrap points, scaled
                 up for the giant Bricolage display voice (clamp tops ~6rem at the
                 widest desktop). The LCP is this real text and never gated. */
              className="heading-display mt-5 text-balance text-[clamp(2rem,1.4rem_+_2.4vw,3rem)] font-extrabold leading-[1.02] sm:text-5xl lg:text-6xl xl:text-[5.25rem]"
            >
              Your Website Might Be{" "}
              <span className="mark">Costing You Customers.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-muted sm:text-[17px]">
              Fast, mobile-friendly websites for plumbers, electricians, roofers,
              HVAC, renovators, contractors and other local trades — built to make
              it easier for visitors to call or enquire.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {heroPoints.map((o) => (
                <span key={o} className="rounded-full border-2 border-line bg-card px-3 py-1.5 text-[12px] font-medium text-ink-muted">
                  {o}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="btn-pop group inline-flex items-center justify-center gap-2 bg-brand px-6 py-3.5 text-[15px] font-semibold text-on-brand"
              >
                <Search className="h-4 w-4" /> {cta.primary}
              </Link>
              <Link
                href="/#work"
                className="btn-pop group inline-flex items-center justify-center gap-2 bg-paper px-6 py-3.5 text-[15px] font-semibold text-ink"
              >
                {cta.secondary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="mt-5 max-w-md text-[13px] leading-relaxed text-ink-muted">
              {site.auditOffer}
            </p>
          </div>

          <div
            className="peek-host relative mx-auto w-full max-w-[560px] reveal"
            style={staged(0.2, 24)}
            /* Decoration, not a real site to explore: the frames illustrate what the
               work looks like, and their links already exist on the pages they point
               to. `inert` belongs to the inner block below rather than here, because
               an inert element is never hit-testable and the hover drift has to be
               triggered from outside it. `aria-hidden` keeps the whole subtree out of
               the accessibility tree either way. */
            aria-hidden="true"
          >
            <div className="relative" inert>
              {/* Navy block sits behind, offset; the electric-blue block is rotated
                  on top and carries the device frames. Both are transform-only. */}
              <div className="absolute inset-0 hidden translate-x-3 translate-y-3 rotate-3 rounded-[28px] bg-navy sm:block" aria-hidden="true" />
              <div className="relative -rotate-3 overflow-hidden rounded-[28px] border-2 border-line bg-sky p-4 shadow-[6px_6px_0_var(--color-ink)] sm:p-6">
                <div className="relative pb-[6%]">
                  <div className="relative z-10">
                    <DeviceMockup device="desktop" hoverPeek>
                      <LazyDemo demo="renovation" project={byDemo("renovation")} />
                    </DeviceMockup>
                  </div>

                  <div
                    className="absolute -bottom-10 -right-4 z-20 hidden w-[46%] sm:block lg:-right-10"
                  >
                    <DeviceMockup device="tablet" chrome={false} hoverPeek>
                      <LazyDemo idle demo="salon" project={byDemo("salon")} />
                    </DeviceMockup>
                  </div>

                  <div
                    className="absolute -bottom-14 -left-2 z-30 hidden w-[30%] sm:block lg:-left-8"
                  >
                    <DeviceMockup device="mobile" chrome={false} hoverPeek>
                      <LazyDemo idle demo="restaurant" project={byDemo("restaurant")} />
                    </DeviceMockup>
                  </div>
                </div>

                <div className="sticker absolute -left-3 -top-3 z-40 h-20 w-20 text-center text-[12px] leading-tight sm:h-24 sm:w-24 sm:text-[13px]">
                  Free
                  <br />
                  audit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
