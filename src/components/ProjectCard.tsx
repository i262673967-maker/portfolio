import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
      style={{ "--reveal-step": `${Math.min(i, 6)}`, "--reveal-y": "24px" } as React.CSSProperties}
    >
      {/* The card previews a website that contains its own links, so the card
          itself can't be an <a>. A stretched overlay keeps it clickable. */}
      <div className="card-pop card-spot group relative flex h-full flex-col overflow-hidden">
        <div className="relative overflow-hidden border-b-2 border-line bg-paper-2 p-3">
          <div className="transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Real screenshot of the concept's own homepage, captured from the
                built demo at 1280x800. The old drawn stand-in read as an
                unfinished skeleton; this shows the finished work. */}
            <div className="overflow-hidden rounded-xl border border-line bg-card">
              <div
                className="flex items-center gap-2 border-b border-line px-3 py-2"
                aria-hidden="true"
              >
                <span className="flex shrink-0 gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]/70" />
                </span>
                <span className="truncate font-display text-[12px] font-semibold text-ink">
                  {project.name}
                </span>
              </div>
              <Image
                src={`/projects/${project.slug}.webp`}
                alt={`Homepage of the ${project.name} concept website`}
                width={1280}
                height={800}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                className="block aspect-[16/10] w-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[12px] text-ink-muted">{project.index}</span>
            {/* The label lives in the card body, not over the screenshot: as an
                overlay it covered the concept's own header text. */}
            <span className="rounded-full border border-line bg-card px-2.5 py-1 font-mono text-[12px] uppercase tracking-widest text-brand">
              Concept Project
            </span>
          </div>
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
            {project.name}
          </h3>
          {/* Just the industry: the name already carries the trade, so pairing it
              with businessType read as "Rowanwood Dental — Dental Practice". */}
          <p className="mt-0.5 text-[13px] text-ink-muted">{project.industry}</p>

          {detailed ? (
            <>
              <p className="mt-3 text-[13px] leading-relaxed text-ink">{project.objective}</p>
              <p className="mt-5 font-mono text-[12px] uppercase tracking-widest text-ink-muted">Key features</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {project.keySections.map((s) => (
                  <li key={s} className="rounded-full border border-line px-2.5 py-1 text-[12px] text-ink-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.designDirection.slice(0, 3).map((d) => (
                  <span key={d} className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[12px] text-ink-muted">
                    {d}
                  </span>
                ))}
              </div>
            </>
          )}

          <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink">
            View project
            <ArrowUpRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <Link
          href={`/work/${project.slug}`}
          className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          aria-label={`${project.name} — view concept project`}
        />
      </div>
    </div>
  );
}
