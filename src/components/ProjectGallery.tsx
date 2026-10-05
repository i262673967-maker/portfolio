"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";

const filters = ["All", "Service", "Trade", "Hospitality", "E-commerce"] as const;
type Filter = (typeof filters)[number];

export default function ProjectGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`min-h-11 rounded-full border px-4 py-1.5 text-[13px] transition-colors ${
              filter === f
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-muted hover:border-line-strong hover:text-offwhite"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length} {list.length === 1 ? "project" : "projects"} shown
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProjectCard key={p.slug} project={p} i={i} detailed />
        ))}
      </div>
    </div>
  );
}
