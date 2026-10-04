"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav, site } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-base/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/#home" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt={`${site.brand} logo`}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-display text-sm font-semibold tracking-tight text-offwhite">
            {site.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[13px] text-muted transition-colors hover:bg-white/5 hover:text-offwhite"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="group hidden items-center gap-1.5 rounded-full bg-offwhite px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-accent sm:inline-flex"
          >
            Request a Quote
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-offwhite lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line bg-base/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="container-shell flex flex-col gap-1 py-4">
              {nav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-offwhite/90 transition-colors hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-ink"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
