"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Reveal, SectionHeading } from "./ui";
import { projects } from "@/lib/data";

const filters = ["All", "Service", "Trade", "Hospitality", "E-commerce"] as const;
type Filter = (typeof filters)[number];

export default function FeaturedWork() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Concept Projects"
            title="Work that looks like the real thing."
            copy="Five polished concept projects across different industries. Each is a fully-designed website for a fictional business — clearly labelled as a concept, never presented as a live client."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-1.5 text-[13px] transition-all ${
                  filter === f
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-line text-muted hover:border-line-strong hover:text-offwhite"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
