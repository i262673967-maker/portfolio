"use client";

import { useEffect } from "react";

/* Everything here is decoration, so it is switched off entirely for a visitor who
   asked for reduced motion. The CSS resting states are the finished look, and
   nothing is left hidden waiting for a trigger that will never come. */
export default function Motion() {
  useEffect(() => {
    const query = window.matchMedia.bind(window);
    if (query("(prefers-reduced-motion: reduce)").matches) return;

    /* Engines with scroll-driven animation arm their own reveals in CSS; this flag
       is only set here when they cannot (see the script in the root layout), so on
       a modern Chromium this loop has no work to do. */
    const reveals =
      document.documentElement.dataset.motion === "io"
        ? [
            ...document.querySelectorAll<HTMLElement>(
              ".reveal, .heading-reveal, .demo-reveal, .demo-rail-x, .demo-rail-y",
            ),
          ].filter((el) => !el.closest(".demo-scroll"))
        : [];
    const loops = [...document.querySelectorAll<HTMLElement>(".marquee")];

    /* ONE observer for the whole page. A reveal is unobserved the moment it has
       played — it only ever happens once — while a looping strip stays watched so
       it can be paused whenever it leaves the screen. */
    let observer: IntersectionObserver | null = null;
    if (reveals.length || loops.length) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target.classList.contains("marquee")) {
              entry.target.classList.toggle("is-out", !entry.isIntersecting);
            } else if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0 },
      );
      for (const el of reveals) observer.observe(el);
      for (const el of loops) observer.observe(el);
    }

    /* The cursor spotlight: one delegated listener for every card, throttled to a
       frame, writing two custom properties the CSS paints with. A card's box is
       measured when the pointer arrives, not on every move. */
    const spotlight = query("(hover: hover) and (pointer: fine)").matches && document.querySelector(".card-spot");
    let card: HTMLElement | null = null;
    let box: DOMRect | null = null;
    let frame = 0;
    let x = 0;
    let y = 0;

    const onMove = (event: PointerEvent) => {
      const next = event.target instanceof Element ? event.target.closest(".card-spot") : null;
      if (!(next instanceof HTMLElement)) {
        card = null;
        box = null;
        return;
      }
      if (next !== card) {
        card = next;
        box = card.getBoundingClientRect();
      }
      if (!box) return;
      x = event.clientX - box.left;
      y = event.clientY - box.top;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (!card) return;
          card.style.setProperty("--spot-x", `${x}px`);
          card.style.setProperty("--spot-y", `${y}px`);
        });
      }
    };

    if (spotlight) document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      observer?.disconnect();
      if (spotlight) document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
