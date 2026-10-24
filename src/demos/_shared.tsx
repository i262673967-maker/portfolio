"use client";

import { useId, useRef, useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/data";
import { demoFonts } from "./fonts";

/* Shared building blocks for demo sites. Demos render inside device frames,
   so they adapt via CONTAINER queries (@md/@3xl/@5xl), not viewport queries.
   Base = mobile, @3xl ≈ tablet (768px frame), @5xl ≈ desktop (1024px+).

   Dark and light concept sites share these primitives: DemoVars derives every
   surface, border and label colour from the project palette, so a bright
   concept site needs no second component library — and a dark one keeps the
   exact values it was built with.

   Text colours are DERIVED, not guessed. The same 45% opacity that clears AA on
   a near-black page lands at 2.7:1 on a near-white one, so every palette gets
   its own faintest legal grey instead of a shared fraction. */

function toRgb(hex: string) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full.slice(0, 6), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/* WCAG relative luminance, used to pick the readable side of a fill and to
   measure every derived text colour against the surface it sits on. */
function luminance(hex: string) {
  const c = toRgb(hex);
  const lin = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
}

const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const contrast = (a: string, b: string) => ratio(luminance(a), luminance(b));

/* `a` blended into `b`, where `p` is the share of `a`. Returns a plain hex so
   the result is a real colour the audit can check, not a blend the browser has
   to resolve. */
function blend(a: string, b: string, p: number) {
  const x = toRgb(a);
  const y = toRgb(b);
  const ch = (k: "r" | "g" | "b") => Math.round(Math.max(0, Math.min(255, x[k] * p + y[k] * (1 - p))));
  return `#${((1 << 24) + (ch("r") << 16) + (ch("g") << 8) + ch("b")).toString(16).slice(1)}`;
}

/* The faintest version of `fg` that still clears `target` on every surface it
   will be asked to sit on — the lightest grey this palette is allowed to use for
   text or for a control boundary. */
function faintest(fg: string, bg: string, target: number, surfaces: string[] = [bg]) {
  for (let p = 0.05; p < 1; p += 0.01) {
    const c = blend(fg, bg, p);
    if (surfaces.every((s) => contrast(c, s) >= target)) return c;
  }
  return fg;
}

/* An accent reads as a large button fill long before it reads as 12px text on
   the page behind it. Where it fails, move it toward the foreground until it
   passes — the fill keeps the raw accent, only small text uses this. */
function readable(color: string, toward: string, bg: string, target: number, surfaces: string[] = [bg]) {
  if (surfaces.every((s) => contrast(color, s) >= target)) return color;
  for (let q = 0.02; q <= 1; q += 0.02) {
    const c = blend(color, toward, 1 - q);
    if (surfaces.every((s) => contrast(c, s) >= target)) return c;
  }
  return toward;
}

/* Black or white text on a filled accent — whichever actually reads. */
function onAccent(hex: string) {
  const l = luminance(hex);
  return ratio(l, 0) >= ratio(1, l) ? "#0b0b0b" : "#ffffff";
}

export function DemoVars({ project, children }: { project: Project; children: React.ReactNode }) {
  const { bg, fg, accent, surface, accent2 } = project.palette;
  const light = luminance(bg) > 0.5;
  const fonts = demoFonts[project.demo];
  const mix = (color: string, amount: number) =>
    `color-mix(in oklab, ${color} ${amount}%, transparent)`;

  /* Two text tiers, both AA on this palette: running copy gets `--d-body`, the
     faintest legal label gets `--d-muted`. `--d-accent-text` is the accent only
     when it is carrying small text; fills keep `--d-accent`.

     Measured against every surface the concept actually paints text on, not just
     the page colour: a soft panel, a white card, and the accent washes behind the
     menu, prices and closing CTA bands all sit under the same grey, and a tint
     that moves the surface 10% can cost a token most of its ratio. */
  /* A concept may name its own panel colour instead of accepting the derived
     5% ink wash (`palette.surface`). It then replaces `soft` everywhere,
     including the measured list below, so a second palette colour can never
     quietly sit underneath text that was checked against the page colour only. */
  const card = light ? "#ffffff" : blend("#ffffff", bg, 0.02);
  const soft = surface ?? (light ? blend(fg, bg, 0.05) : blend("#ffffff", bg, 0.02));
  const surfaces = [
    bg,
    soft,
    card,
    blend(accent, bg, 0.1),
    blend(accent, bg, 0.08),
    blend(accent, card, 0.12),
    /* A secondary accent is a fill, not a text colour — but a wash of it can
       still end up behind a paragraph, so it joins the measured set too. */
    ...(accent2 ? [blend(accent2, bg, 0.12), blend(accent2, card, 0.12)] : []),
  ];
  const body = faintest(fg, bg, 7, surfaces);
  const muted = faintest(fg, bg, 4.6, surfaces);
  const accentText = readable(accent, fg, bg, 4.6, surfaces);
  /* A form boundary needs 3:1 against the surface (WCAG 1.4.11); the decorative
     hairlines below it stay hairlines. */
  const lineStrong = faintest(fg, bg, 3, surfaces);

  return (
    <div
      className={`@container relative w-full text-[var(--d-fg)] ${fonts.className}`}
      style={
        {
          "--d-bg": bg,
          "--d-fg": fg,
          "--d-body": body,
          "--d-muted": muted,
          "--d-accent": accent,
          "--d-accent-text": accentText,
          /* A second palette colour is a fill, never small text, so it ships raw
             instead of through readable() — but it still joins the measured
             surfaces above. */
          ...(accent2 ? { "--d-accent-2": accent2 } : null),
          "--font-display": fonts.display,
          "--font-sans": fonts.body,
          "--d-line": light ? mix(fg, 14) : "rgba(255,255,255,0.08)",
          "--d-line-strong": lineStrong,
          "--d-soft":
            surface ?? (light ? `color-mix(in oklab, ${fg} 5%, ${bg})` : "rgba(255,255,255,0.02)"),
          "--d-card": light ? "#ffffff" : "rgba(255,255,255,0.02)",
          "--d-chip": light ? "#ffffff" : "rgba(0,0,0,0.2)",
          "--d-hover": light ? mix(fg, 7) : "rgba(255,255,255,0.05)",
          "--d-field": light ? "#ffffff" : "rgba(0,0,0,0.2)",
          "--d-on-accent": onAccent(accent),
          "--d-shadow": light
            ? `0 16px 40px -26px ${mix(fg, 70)}`
            : "0 0 0 0 transparent",
          background: "var(--d-bg)",
          fontFamily: fonts.body,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}


export type DemoProps = { project: Project; preview?: boolean };

/* Inside a device frame the demo is a preview of someone else's site, so its
   main headline drops to <h2> and the host page keeps a single <h1>. */
export function DemoHeading({
  preview = true,
  className = "",
  children,
}: {
  preview?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = preview ? "h2" : "h1";
  return <Tag className={className}>{children}</Tag>;
}

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-current/20 bg-[var(--d-chip)] px-2.5 py-1 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--d-body)] backdrop-blur">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--d-accent)]" />
      Concept Project
    </span>
  );
}

/* Placeholder imagery: a gradient plate per image slot. Real free-licence photos
   arrive with each concept site and sit in front of this, so the plate is what
   shows while the photo loads. The caption is a solid plate because it can land
   on either end of the gradient, and the darker end can sink white text below AA. */
export function Swatch({
  className = "",
  from,
  to,
  label,
}: {
  className?: string;
  from: string;
  to: string;
  label?: string;
}) {
  /* Gradients are unbounded, so judge the caption against both ends and pick the
     ink that survives the worse one. */
  const score = (c: string) => Math.min(contrast(c, from), contrast(c, to));
  const ink = score("#0b0b0b") >= score("#ffffff") ? "#0b0b0b" : "#ffffff";
  const plate = ink === "#ffffff" ? "#0b0b0b" : "#ffffff";

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
      {label && (
        <span
          className="absolute bottom-2 left-2.5 rounded-md px-1.5 py-0.5 font-mono text-[12px] uppercase tracking-[0.1em]"
          style={{ color: ink, background: plate }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/* A real photograph inside a concept site. `next/image` needs the intrinsic size
   or `fill`, and everything here is an editorial plate that gets cropped to its
   slot, so it is always `fill` and the caller owns the box through `className`.

   The gradient plate is the placeholder: `next/image` leaves the element
   transparent until the file arrives, so a neutral wash of this palette's own
   soft panel and line colour shows through instead of a grey box or a borrowed
   blur — deliberately not the accent, so a saturated brand colour never bleeds
   behind a loading photograph. The space is already reserved by the box, so
   there is no layout shift while it loads.

   `preload` is only ever set on a hero. Next 16 deprecated `priority` in favour
   of it, and it takes precedence over `loading`, which is left at its default
   `lazy` for every plate below the fold.

   `sizes` is required, not optional: without it the browser assumes 100vw and
   downloads the largest candidate in the srcset for a plate that may be a third
   of the window. */
export function DemoImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes,
  preload = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, var(--d-soft), color-mix(in oklab, var(--d-line-strong) 30%, var(--d-soft)))`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        fetchPriority={preload ? "high" : "auto"}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}

export function Btn({
  children,
  variant = "solid",
  className = "",
  href,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
  const styles =
    variant === "solid"
      ? "bg-[var(--d-accent)] text-[var(--d-on-accent)]"
      : "border border-current/20 text-current hover:bg-[var(--d-hover)]";
  const classes = `${base} ${styles} ${className}`;

  /* Anchors are in-page fragments — a demo must never navigate away from the page
     it is embedded on. The one exception a demo is allowed to make is a `tel:`
     link, and only on its own standalone page, where there is no host page to
     tear the visitor away from; the frame previews pass an anchor instead. A
     caller that passes both an anchor and a handler still gets the handler: the
     mobile sheet uses it to close itself once the visitor has picked a
     destination. */
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type={type} onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }
  return <span className={classes}>{children}</span>;
}

export const DEMO_NOTE =
  "Fictional concept website created by Ismail Web Studio to demonstrate design direction and functionality. Not a real client website.";

/* Quote / reserve / subscribe controls on a concept site cannot really submit
   anywhere, so instead of a dead button they answer honestly on click. */
export function DemoAction({
  children,
  variant = "solid",
  className = "",
  note = DEMO_NOTE,
}: {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  note?: string;
}) {
  const [shown, setShown] = useState(false);
  return (
    <>
      <Btn variant={variant} className={className} onClick={() => setShown((v) => !v)}>
        {children}
      </Btn>
      {shown && (
        <p role="status" className="mt-2 basis-full text-[12px] leading-relaxed text-[var(--d-muted)]">
          {note}
        </p>
      )}
    </>
  );
}

/* The header nav of a concept site. Every label points at a section that
   actually exists in this demo instance, so nothing looks clickable but does
   nothing. Real anchors also make the nav keyboard-accessible.

   `items` is the same list the mobile sheet below renders, so the two can never
   disagree about what the concept's navigation offers. */
export function DemoNav({
  anchor,
  items,
  className = "",
}: {
  anchor: ReturnType<typeof useDemoAnchors>;
  items: [label: string, section: string][];
  className?: string;
}) {
  return (
    <nav
      aria-label="Concept website navigation"
      className={`hidden gap-6 text-[12px] text-[var(--d-body)] @5xl:flex ${className}`}
    >
      {items.map(([label, section]) => (
        <a
          key={label}
          href={anchor.href(section)}
          className="inline-flex min-h-11 items-center hover:text-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)]"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

export type DemoNavItem = [label: string, section: string];

/* Below the desktop frame the concept's nav used to simply not exist — every
   demo shipped `hidden … @5xl:flex` and left a phone visitor with the header
   action only. This is the missing half: a real disclosure that scrolls the
   frame to the same sections the desktop nav names.

   It stays inside the concept's own markup on purpose. `position: fixed` would
   pin the sheet to the browser window and break out of the device frame it is
   meant to be living in, so it is absolutely positioned against the demo's
   sticky header instead, and the anchors are the instance-scoped fragments from
   useDemoAnchors. */
export function DemoMobileMenu({
  anchor,
  items,
  action,
}: {
  anchor: ReturnType<typeof useDemoAnchors>;
  items: DemoNavItem[];
  /* The header's primary action, repeated at the foot of the sheet so opening
     the menu is never a dead end. */
  action?: DemoNavItem;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  const focusables = () => Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);

  const show = () => setOpen(true);

  const hide = () => {
    setOpen(false);
    toggle.current?.focus();
  };

  /* Focus moves into the sheet once it is on screen. A rAF callback cannot do
     this reliably: a backgrounded tab never runs one, so the keyboard visitor
     would be left behind the overlay. An effect runs on the commit that renders
     the panel, whatever the tab's state. */
  useEffect(() => {
    if (open) focusables()[0]?.focus();
  }, [open]);

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      hide();
      return;
    }
    if (e.key !== "Tab") return;
    const all = focusables();
    if (all.length === 0) return;
    const first = all[0];
    const last = all[all.length - 1];
    /* While the sheet is open the tab order stays inside it: a keyboard visitor
       who has not dismissed the menu should not be dropped into the page behind
       it. */
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="@5xl:hidden">
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls={`${uid}-sheet`}
        onClick={() => (open ? hide() : show())}
        className="inline-flex min-h-11 w-11 items-center justify-center rounded-lg border border-[var(--d-line-strong)] text-[12px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="flex flex-col gap-1">
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-5 rounded-full bg-current" />
        </span>
      </button>

      {open && (
        <div
          ref={panel}
          id={`${uid}-sheet`}
          onKeyDown={onKey}
          className="absolute inset-x-0 top-full z-30 border-b border-[var(--d-line)] bg-[var(--d-bg)]/97 px-4 pb-4 backdrop-blur"
        >
          <nav aria-label="Concept website navigation" className="flex flex-col divide-y divide-[var(--d-line)]">
            {items.map(([label, section]) => (
              <a
                key={label}
                href={anchor.href(section)}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center text-[14px] text-[var(--d-body)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--d-accent)]"
              >
                {label}
              </a>
            ))}
          </nav>
          {action && (
            <Btn href={anchor.href(action[1])} className="mt-3 w-full" onClick={() => setOpen(false)}>
              {action[0]}
            </Btn>
          )}
        </div>
      )}
    </div>
  );
}

/* The concept's main action, pinned to the bottom of the two smaller frames so
   it stays reachable with one thumb from any scroll position. Sticky rather than
   fixed, for the same reason as the sheet above: the bar must stay inside the
   device frame it is previewing.

   A call-first concept wants two actions on that bar, not one — "Call" and
   "Book" — so `secondary` adds the quieter partner. It takes an href or a
   handler, and the demo decides which: only the demo knows whether a `tel:`
   link is safe to make live from inside a frame. */
export function DemoStickyCta({
  label,
  href,
  secondary,
}: {
  label: string;
  href: string;
  secondary?: { label: string; href?: string; onClick?: () => void };
}) {
  return (
    <div className="sticky bottom-0 z-30 border-t border-[var(--d-line)] bg-[var(--d-bg)]/92 px-4 py-2.5 backdrop-blur @3xl:hidden">
      {secondary ? (
        <div className="grid grid-cols-2 gap-2">
          <Btn href={secondary.href} onClick={secondary.onClick} variant="ghost">
            {secondary.label}
          </Btn>
          <Btn href={href}>{label}</Btn>
        </div>
      ) : (
        <Btn href={href} className="w-full">
          {label}
        </Btn>
      )}
    </div>
  );
}


/* The same concept can be mounted several times on one page (hero frame,
   showcase, work cards), so anchor ids are scoped to each rendered instance. */
export function useDemoAnchors() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return {
    id: (name: string) => `${uid}-${name}`,
    href: (name: string) => `#${uid}-${name}`,
  };
}

/* Real accordion: each question is a button that owns its answer panel, so it
   works with a keyboard and announces itself to screen readers. The first
   answer opens by default so the section never reads as a list of dead rows. */
export function DemoFaq({ items }: { items: { q: string; a: string }[] }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [open, setOpen] = useState<string | null>(items[0]?.q ?? null);
  return (
    <div className="mt-6 divide-y divide-[var(--d-line)] overflow-hidden rounded-2xl border border-[var(--d-line)]">
      {items.map((f, i) => {
        const isOpen = open === f.q;
        const headId = `${uid}-h${i}`;
        return (
          <div key={f.q}>
            <h3 className="m-0">
              <button
                type="button"
                id={headId}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p${i}`}
                onClick={() => setOpen(isOpen ? null : f.q)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium transition-colors hover:bg-[var(--d-hover)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--d-accent)]"
              >
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="grid h-5 w-5 shrink-0 place-items-center text-[var(--d-accent)] transition-transform duration-200"
                  style={{ transform: `rotate(${isOpen ? 45 : 0}deg)` }}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`${uid}-p${i}`}
              role="region"
              aria-labelledby={headId}
              hidden={!isOpen}
              className="px-4 pb-4 text-[14px] leading-relaxed text-[var(--d-body)]"
            >
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* The full-screen route (/demos/[slug]) carries no host bar of its own any
   more: a strip above the concept's header cost a quarter of a phone screen.
   It still needs a way back, and the only place that adds no height at the top
   is the concept's own footer. The link is handed down through context rather
   than a prop because the three demos each close their own page, and a prop
   would have to be threaded through all of them.

   Nothing provides this inside a device frame, so the preview of a concept
   never shows a link to a page it is not on. */
type DemoBack = { href: string; label: string };
const DemoBackContext = createContext<DemoBack | null>(null);

export function DemoBackProvider({
  value,
  children,
}: {
  value: DemoBack;
  children: React.ReactNode;
}) {
  return <DemoBackContext.Provider value={value}>{children}</DemoBackContext.Provider>;
}

export function DemoBackLink({ className = "" }: { className?: string }) {
  const back = useContext(DemoBackContext);
  if (!back) return null;
  return (
    <Link
      href={back.href}
      className={`inline-flex min-h-11 items-center gap-1.5 text-[12px] text-[var(--d-accent-text)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${className}`}
    >
      {back.label}
    </Link>
  );
}

export function DemoFooter({ name }: { name: string }) {
  return (
    <footer className="border-t border-[var(--d-line)] px-4 py-6 @5xl:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-[12px] leading-relaxed text-[var(--d-muted)] @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <div>
          <span className="block font-display text-[14px] text-[var(--d-body)]">{name}</span>
          <span className="mt-1.5 block max-w-md">{DEMO_NOTE}</span>
        </div>
        <div className="flex flex-col gap-1 @3xl:items-end">
          <span className="font-mono uppercase tracking-[0.1em]">Concept project · not a live client</span>
          <DemoBackLink />
        </div>
      </div>
    </footer>
  );
}
