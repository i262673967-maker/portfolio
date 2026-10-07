import type { Project } from "@/lib/data";

/* Stand-in for the framed demo inside a project card. Rendering the real
   concept websites in five cards meant five whole sites in the page HTML —
   ~170 KB of markup and dozens of borrowed section headings. This draws the
   same idea from the project's own palette, name and industry in a few hundred
   bytes, with no headings and no invented copy. */
export default function ConceptThumb({ project }: { project: Project }) {
  const { bg, fg, accent } = project.palette;
  /* The chip stands in for the concept's own hero button, so it takes that
     button's label. keySections are internal structure names: reading one as a
     button put "Services" under the "Electrical Services" industry. */
  const action =
    project.content?.ctaPrimary.replace(/\s*→\s*$/, "") ||
    project.keySections[1] ||
    project.keySections[0];

  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[16/10] w-full flex-col overflow-hidden rounded-xl border border-line"
      style={{ background: bg, color: fg }}
    >
      <div className="flex items-center gap-2 border-b px-3 py-2" style={{ borderColor: `${fg}1f` }}>
        <span className="flex shrink-0 gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]/70" />
        </span>
        <span className="truncate font-display text-[11px] font-semibold">{project.name}</span>
        <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
      </div>

      <div className="grid flex-1 grid-cols-[1.4fr_1fr] gap-3 px-3 py-3">
        <div className="flex flex-col justify-center gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: accent }}>
            {project.industry}
          </span>
          <span className="block h-2 rounded-full" style={{ width: "88%", background: fg, opacity: 0.85 }} />
          <span className="block h-2 rounded-full" style={{ width: "62%", background: fg, opacity: 0.45 }} />
          <span className="block h-2 w-[38%] rounded-full" style={{ background: fg, opacity: 0.25 }} />
          {action && (
            <span
              className="mt-2 inline-block self-start rounded-full px-3 py-1 text-[10px] font-semibold"
              style={{ background: accent, color: bg }}
            >
              {action}
            </span>
          )}
        </div>
        <div
          className="hidden rounded-lg sm:block"
          style={{ background: `linear-gradient(140deg, ${accent}66, ${fg}14)` }}
        />
      </div>
    </div>
  );
}
