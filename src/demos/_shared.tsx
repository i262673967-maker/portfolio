"use client";

import { useId, useState } from "react";
import type { Project } from "@/lib/data";

/* Shared building blocks for demo sites. Demos render inside device frames,
   so they adapt via CONTAINER queries (@md/@3xl/@5xl), not viewport queries.
   Base = mobile, @3xl ≈ tablet (768px frame), @5xl ≈ desktop (1024px+). */

export function DemoVars({ project, children }: { project: Project; children: React.ReactNode }) {
  return (
    <div
      className="@container relative w-full text-[var(--d-fg)]"
      style={
        {
          "--d-bg": project.palette.bg,
          "--d-fg": project.palette.fg,
          "--d-accent": project.palette.accent,
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
    <span className="inline-flex items-center gap-1.5 rounded-full border border-current/20 bg-black/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-current/70 backdrop-blur">
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
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
      {label && (
        <span className="absolute bottom-2 left-2.5 font-mono text-[9px] uppercase tracking-widest text-white/70">
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
    "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-transform duration-200 hover:-translate-y-0.5";
  const styles =
    variant === "solid"
      ? "bg-[var(--d-accent)] text-[#0b0b0b]"
      : "border border-current/20 text-current hover:bg-white/5";
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

export const DEMO_NOTE = "Concept build — this demo has no backend, so nothing was sent.";

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
}: {
  anchor: ReturnType<typeof useDemoAnchors>;
  items: [label: string, section: string][];
}) {
  return (
    <nav className="hidden gap-6 text-[11px] text-current/70 @5xl:flex">
      {items.map(([label, section]) => (
        <a key={label} href={anchor.href(section)} className="hover:text-current">
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

export function DemoFooter({ name }: { name: string }) {
  return (
    <footer className="border-t border-white/8 px-4 py-6 @5xl:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-[10px] text-current/50 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <span className="font-display text-current/80">{name}</span>
        <span className="font-mono uppercase tracking-widest">Concept project · not a live client</span>
      </div>
    </footer>
  );
}
