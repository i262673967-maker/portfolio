"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { cta } from "@/lib/data";

/* Fixed bottom action for phones only. It stays out of the way: hidden above
   the fold, hidden while the mobile menu is open (CSS keyed on body[data-nav-open]),
   hidden once the contact form is on screen so it never covers the form, and hidden
   over the footer so it never covers the last content on the page. */
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const visible = new Set<string>();
    let scrolled = false;

    const sync = () => setShow(scrolled && visible.size === 0);

    const onScroll = () => {
      scrolled = window.scrollY > window.innerHeight * 0.75;
      sync();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        sync();
      },
      { rootMargin: "120px 0px" }
    );

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    for (const id of ["contact", "footer"]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div
      className={`sticky-cta fixed inset-x-0 bottom-0 z-40 lg:hidden ${
        show ? "" : "pointer-events-none opacity-0"
      } transition-opacity duration-300`}
      aria-hidden={!show}
    >
      <div className="border-t border-line bg-base/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
        <Link
          href="/#contact"
          tabIndex={show ? undefined : -1}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-[15px] font-semibold text-ink"
        >
          <Search className="h-4 w-4" /> {cta.primary}
        </Link>
      </div>
    </div>
  );
}
