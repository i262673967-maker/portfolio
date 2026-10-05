import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ConceptThumb from "./ConceptThumb";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  project,
  i,
  detailed = false,
}: {
  project: Project;
  i: number;
  detailed?: boolean;
}) {
  return (
    <div
      className="reveal"
      style={{ "--reveal-delay": `${(i % 3) * 0.08}s`, "--reveal-y": "24px" } as React.CSSProperties}
    >
      {/* The card previews a website that contains its own links, so the card
          itself can't be an <a>. A stretched overlay keeps it clickable. */}
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
        <div className="relative overflow-hidden border-b border-line bg-base-2 p-3">
          <span className="absolute left-4 top-4 z-20 rounded-full border border-line-strong bg-base/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-accent backdrop-blur">
            Concept Project
          </span>
          <div className="transition-transform duration-500 group-hover:scale-[1.02]">
            <ConceptThumb project={project} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <span className="font-mono text-[11px] text-faint">{project.index}</span>
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-offwhite">
            {project.name}
          </h3>
          <p className="mt-0.5 text-[13px] text-muted">
            {project.businessType} · {project.industry}
          </p>

          {detailed ? (
            <>
              <p className="mt-3 text-[13px] leading-relaxed text-offwhite/85">{project.objective}</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-faint">Key features</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {project.keySections.map((s) => (
                  <li key={s} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.designDirection.slice(0, 3).map((d) => (
                  <span key={d} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-muted">
                    {d}
                  </span>
                ))}
              </div>
            </>
          )}

          <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-offwhite">
            View project
            <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <Link
          href={`/work/${project.slug}`}
          className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={`${project.name} — view concept project`}
        />
      </div>
    </div>
  );
}
