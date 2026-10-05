import type { Project } from "@/lib/data";

/* What a device frame holds before the concept website mounts: the project's
   own palette arranged as a website-shaped skeleton, drawn as one small SVG so
   it looks right at any frame size and costs a few hundred bytes of HTML. */
export default function DemoSkeleton({ project }: { project: Project }) {
  const { bg, fg, accent } = project.palette;
  const bar = (x: number, y: number, w: number, h: number, o: number, rx = 4) => (
    <rect key={`${x}-${y}-${w}`} x={x} y={y} width={w} height={h} rx={rx} fill={fg} fillOpacity={o} />
  );

  return (
    <div aria-hidden="true" className="h-full w-full" style={{ background: bg }}>
      <svg viewBox="0 0 400 250" preserveAspectRatio="none" className="h-full w-full">
        <rect x="0" y="0" width="400" height="250" fill={bg} />
        {/* header */}
        <rect x="0" y="0" width="400" height="26" fill={fg} fillOpacity="0.05" />
        {bar(14, 9, 54, 8, 0.7)}
        {bar(196, 11, 26, 4, 0.22)}
        {bar(232, 11, 26, 4, 0.22)}
        {bar(268, 11, 26, 4, 0.22)}
        <rect x="318" y="7" width="68" height="13" rx="6.5" fill={accent} fillOpacity="0.9" />
        {/* hero */}
        {bar(14, 52, 168, 13, 0.8)}
        {bar(14, 73, 124, 13, 0.8)}
        {bar(14, 98, 190, 5, 0.28)}
        {bar(14, 109, 152, 5, 0.28)}
        <rect x="14" y="128" width="74" height="16" rx="8" fill={accent} />
        <rect x="234" y="46" width="152" height="104" rx="8" fill={accent} fillOpacity="0.28" />
        {/* three cards */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={14 + i * 130} y={172} width={118} height={54} rx={7} fill={fg} fillOpacity={0.06} />
            {bar(24 + i * 130, 184, 44, 6, 0.45)}
            {bar(24 + i * 130, 198, 96, 4, 0.2)}
            {bar(24 + i * 130, 208, 78, 4, 0.2)}
          </g>
        ))}
      </svg>
    </div>
  );
}
