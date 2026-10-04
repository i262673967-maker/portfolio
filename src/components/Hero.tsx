"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import DeviceMockup from "./DeviceMockup";
import { Demo } from "@/demos";
import { projects, site, type DemoKey } from "@/lib/data";

const byDemo = (k: DemoKey) => projects.find((p) => p.demo === k)!;

const ease = [0.22, 1, 0.36, 1] as const;

const offering = ["Web Design", "Development", "Redesigns", "Landing Pages"];

export default function Hero() {
  return (
    <section id="home" className="studio-bg relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container-shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="eyebrow"
            >
              New Websites · Website Fixes · Local Businesses
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease }}
              className="heading-display mt-5 text-[2.5rem] leading-[1.03] sm:text-5xl lg:text-[3.4rem]"
            >
              I Build New Websites. I Fix{" "}
              <span className="relative inline-block text-accent">
                Slow, Outdated
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease }}
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-accent to-warm"
                />
              </span>{" "}
              Ones.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease }}
              className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]"
            >
              {site.supportingMessage}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {offering.map((o) => (
                <span key={o} className="rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] text-muted">
                  {o}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
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
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.34, ease }}
              className="mt-5 max-w-md text-[13px] leading-relaxed text-faint"
            >
              {site.auditOffer}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <div className="relative pb-[6%]">
              <div className="relative z-10">
                <DeviceMockup device="desktop">
                  <Demo demo="renovation" project={byDemo("renovation")} />
                </DeviceMockup>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
                className="absolute -bottom-10 -right-4 z-20 hidden w-[46%] sm:block lg:-right-10"
              >
                <DeviceMockup device="tablet" chrome={false}>
                  <Demo demo="ecommerce" project={byDemo("ecommerce")} />
                </DeviceMockup>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.62, ease }}
                className="absolute -bottom-14 -left-2 z-30 hidden w-[30%] sm:block lg:-left-8"
              >
                <DeviceMockup device="mobile" chrome={false}>
                  <Demo demo="restaurant" project={byDemo("restaurant")} />
                </DeviceMockup>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
