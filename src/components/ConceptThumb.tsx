import type { Project } from "@/lib/data";

/* Photo-led concept thumbnail: each project is presented like a real browser
   preview, while the overlay makes the brand and industry legible at a glance.
   The label stays clear that this is a concept, not commissioned client work. */
export default function ConceptThumb({ project }: { project: Project }) {
  const { bg, fg, accent } = project.palette;

  return (
    <div
      aria-hidden="true"
      className="relative isolate flex aspect-[16/10] w-full flex-col overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_12px_32px_rgba(23,26,31,0.12)]"
      style={{
        backgroundColor: bg,
        backgroundImage: `linear-gradient(0deg, rgba(14,17,20,0.92) 0%, rgba(14,17,20,0.25) 54%, rgba(14,17,20,0.02) 100%), url("${project.coverImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 flex items-center gap-1.5 border-b border-white/15 bg-[#171a1f]/70 px-3 py-2 backdrop-blur-sm">
        <span className="flex shrink-0 gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="truncate font-display text-[11px] font-semibold text-white">{project.name}</span>
        <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
      </div>

      <div className="relative z-10 mt-auto p-4 sm:p-5">
        <span
          className="inline-flex rounded-md border border-white/20 bg-[#171a1f]/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm"
        >
          {project.category} · Concept
        </span>
        <h3 className="mt-2 max-w-[24rem] font-display text-lg font-semibold leading-tight text-white sm:text-xl">
          {project.content?.headline ?? project.name}
        </h3>
        <p className="mt-1 max-w-lg text-[11px] leading-relaxed text-white/80 sm:text-xs">
          {project.industry} · Design concept by Ismail Web Studio
        </p>
      </div>
    </div>
  );
}
