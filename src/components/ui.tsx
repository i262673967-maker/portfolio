"use client";

import { motion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/* Respects the user's prefers-reduced-motion setting for all Framer Motion animations. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
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
      <h2 className="heading-display mt-3 text-3xl sm:text-4xl md:text-[2.75rem]">{title}</h2>
      {copy && <p className="mt-4 text-[15px] leading-relaxed text-muted">{copy}</p>}
    </div>
  );
}
