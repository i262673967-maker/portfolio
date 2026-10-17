"use client";

import type { ReactNode } from "react";

export function Reveal({
  children,
  step = 0,
  delay = 0,
  y,
  className,
}: {
  children: ReactNode;
  /** Ordinal position among siblings: each one waits one more `--motion-stagger`
   *  (or enters one slice later when the animation is driven by scroll, where
   *  waiting a fraction of a second is not what a stagger means). Capped at 6, so
   *  a long list never keeps the last card waiting. */
  step?: number;
  /** A hand-set offset in seconds, for the one block that is not part of a set. */
  delay?: number;
  y?: number;
  className?: string;
}) {
  const vars = {
    "--reveal-step": `${Math.min(step, 6)}`,
    "--reveal-delay": `${delay}s`,
    ...(y === undefined ? {} : { "--reveal-y": `${y}px` }),
  } as React.CSSProperties;
  return (
    <div className={`reveal ${className ?? ""}`} style={vars}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const a = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`${a} ${className} max-w-2xl`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {/* `heading-reveal` is the short, close arrival: this component is never used
         in the hero, so the page's largest paint keeps arriving with the text
         itself. */}
      <h2 className="heading-reveal heading-display mt-3 text-3xl sm:text-4xl md:text-[2.75rem]">{title}</h2>
      {copy && <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{copy}</p>}
    </div>
  );
}
