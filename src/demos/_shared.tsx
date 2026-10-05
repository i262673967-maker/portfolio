"use client";

import { useId, useState } from "react";
import type { Project } from "@/lib/data";

/* Shared building blocks for demo sites. Demos render inside device frames,
   so they adapt via CONTAINER queries (@md/@3xl/@5xl), not viewport queries.
   Base = mobile, @3xl ≈ tablet (768px frame), @5xl ≈ desktop (1024px+).

   Dark and light concept sites share these primitives: DemoVars derives every
   surface, border and label colour from the project palette, so a bright
   concept site needs no second component library — and a dark one keeps the
   exact values it was built with. */

function toRgb(hex: string) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full.slice(0, 6), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/* WCAG relative luminance, used only to pick the readable side of a fill. */
function luminance(hex: string) {
  const c = toRgb(hex);
  const lin = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
}

const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/* Black or white text on a filled accent — whichever actually reads. */
function onAccent(hex: string) {
  const l = luminance(hex);
  return ratio(l, 0) >= ratio(1, l) ? "#0b0b0b" : "#ffffff";
}

export function DemoVars({ project, children }: { project: Project; children: React.ReactNode }) {
  const { bg, fg, accent } = project.palette;
  const light = luminance(bg) > 0.5;
  const mix = (color: string, amount: number) =>
    `color-mix(in oklab, ${color} ${amount}%, transparent)`;

  return (
    <div
      className="@container relative w-full text-[var(--d-fg)]"
      style={
        {
          "--d-bg": bg,
          "--d-fg": fg,
          "--d-accent": accent,
          "--d-line": light ? mix(fg, 14) : "rgba(255,255,255,0.08)",
          "--d-line-strong": light ? mix(fg, 26) : "rgba(255,255,255,0.14)",
          "--d-soft": light ? `color-mix(in oklab, ${fg} 5%, ${bg})` : "rgba(255,255,255,0.02)",
          "--d-card": light ? "#ffffff" : "rgba(255,255,255,0.02)",
          "--d-chip": light ? "#ffffff" : "rgba(0,0,0,0.2)",
          "--d-hover": light ? mix(fg, 7) : "rgba(255,255,255,0.05)",
          "--d-field": light ? "#ffffff" : "rgba(0,0,0,0.2)",
          "--d-on-accent": onAccent(accent),
          "--d-shadow": light
            ? `0 16px 40px -26px ${mix(fg, 70)}`
            : "0 0 0 0 transparent",
          background: "var(--d-bg)",
          fontFamily: "var(--font-inter), sans-serif",
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
    <span className="inline-flex items-center gap-1.5 rounded-full border border-current/20 bg-[var(--d-chip)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-current/70 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" />
      Concept Project
    </span>
  );
}

/* Fictional placeholder imagery via CSS gradients — no stock photos, no fake logos. */
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
  const mid = (luminance(from) + luminance(to)) / 2;
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
      {label && (
        <span
          className="absolute bottom-2 left-2.5 font-mono text-[9px] uppercase tracking-widest"
          style={{ color: mid > 0.45 ? "rgba(24,32,42,0.72)" : "rgba(255,255,255,0.7)" }}
        >
          {label}
        </span>
      )}
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
    "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
  const styles =
    variant === "solid"
      ? "bg-[var(--d-accent)] text-[var(--d-on-accent)]"
      : "border border-current/20 text-current hover:bg-[var(--d-hover)]";
  const classes = `${base} ${styles} ${className}`;

  /* Only ever used with in-page fragment anchors — a demo must never navigate
     away from the page it is embedded on. */
  if (href) {
    return (
      <a href={href} className={classes}>
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
        <p role="status" className="mt-2 basis-full text-[10px] leading-relaxed text-current/55">
          {note}
        </p>
      )}
    </>
  );
}

/* The header nav of a concept site. Every label points at a section that
   actually exists in this demo instance, so nothing looks clickable but does
   nothing. Real anchors also make the nav keyboard-accessible. */
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
      className={`hidden gap-6 text-[11px] text-current/70 @5xl:flex ${className}`}
    >
      {items.map(([label, section]) => (
        <a
          key={label}
          href={anchor.href(section)}
          className="hover:text-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)]"
        >
          {label}
        </a>
      ))}
    </nav>
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
              className="px-4 pb-4 text-[13px] leading-relaxed text-current/60"
            >
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function DemoFooter({ name }: { name: string }) {
  return (
    <footer className="border-t border-[var(--d-line)] px-4 py-6 @5xl:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-[10px] text-current/50 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <div>
          <span className="block font-display text-current/80">{name}</span>
          <span className="mt-1.5 block max-w-md leading-relaxed">{DEMO_NOTE}</span>
        </div>
        <span className="font-mono uppercase tracking-widest">Concept project · not a live client</span>
      </div>
    </footer>
  );
}
