"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav, site } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  /* Only real pages get a current state — the rest of the nav jumps to anchors
     on the homepage, which are never "the current page". */
  const isCurrent = (href: string) => !href.includes("#") && pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.dataset.navOpen = open ? "true" : "false";
    return () => {
      document.body.style.overflow = "";
      document.body.dataset.navOpen = "false";
    };
  }, [open]);

  /* Escape closes the menu and hands focus back to the button it came from. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b-2 border-line bg-paper"
          : "border-b-2 border-transparent bg-transparent"
      }`}
    >
      <div className="container-shell flex h-16 items-center justify-between gap-2.5 xl:gap-4">
        <Link href="/#home" className="group flex min-h-11 items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt={`${site.brand} logo`}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-display text-[1rem] font-bold tracking-tight text-ink">
            {site.brand}
          </span>
        </Link>

        {/* Five links at `lg`. `whitespace-nowrap` keeps each on one line; the
           tighter 1024–1279 padding plus a small row gap buys breathing room, and
           from `xl` the wider spacing returns. No link is dropped at any width. */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 whitespace-nowrap lg:flex xl:gap-1">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={`rounded-full px-2.5 py-2 text-[14px] font-medium transition-colors hover:bg-ink/[0.06] hover:text-ink xl:px-3.5 ${
                isCurrent(item.href) ? "text-ink" : "text-ink-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#audit"
            className="btn-pop hidden min-h-11 items-center gap-1.5 whitespace-nowrap bg-brand px-4 py-2 text-[14px] font-semibold text-on-brand sm:inline-flex"
          >
            Free Audit
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            ref={menuButton}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-lg border-2 border-line text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Always mounted and animated by CSS (see .menu-panel in globals.css): the
          open state already lives on body[data-nav-open], so the panel reads it
          from there and no animation library is needed. Closed means visibility
          hidden plus inert, which takes the duplicate links out of the tab order
          and the accessibility tree without hiding them mid-transition. */}
      <div className="menu-panel border-t-2 border-line bg-paper lg:hidden" inert={!open}>
        <div>
          <nav id="mobile-menu" aria-label="Site sections" className="container-shell flex flex-col gap-1 py-4">
            {nav.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                style={{ "--i": i } as React.CSSProperties}
                className={`menu-item block rounded-lg px-3 py-3 text-[1rem] transition-colors hover:bg-ink/[0.06] ${
                  isCurrent(item.href) ? "text-ink" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#audit"
              onClick={() => setOpen(false)}
              style={{ "--i": nav.length } as React.CSSProperties}
              className="menu-item btn-pop mt-2 flex w-full items-center justify-center gap-1.5 bg-brand px-4 py-3.5 text-[15px] font-semibold text-on-brand"
            >
              Free Audit <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
