"use client";

import { useEffect, useRef, useState } from "react";

export type Device = "desktop" | "tablet" | "mobile";

/* Layout width (CSS px) each device simulates, and its width:height ratio.
   The demo inside adapts to LAYOUT via container queries, so it reflows
   exactly as it would on a real device of that width. */
const SPEC: Record<Device, { layout: number; ratio: number; max: number; label: string }> = {
  desktop: { layout: 1280, ratio: 16 / 10, max: 960, label: "Desktop" },
  tablet: { layout: 834, ratio: 3 / 4, max: 520, label: "Tablet" },
  mobile: { layout: 390, ratio: 9 / 17.5, max: 288, label: "Mobile" },
};

export default function DeviceMockup({
  device,
  children,
  chrome = true,
}: {
  device: Device;
  children: React.ReactNode;
  chrome?: boolean;
}) {
  const spec = SPEC[device];
  const screenRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const scale = w ? w / spec.layout : 0;
  const innerHeight = scale ? w / spec.ratio / scale : spec.layout / spec.ratio;

  return (
    <div className="mx-auto w-full" style={{ maxWidth: spec.max }}>
      <div
        className={`relative rounded-[1.4rem] border border-line-strong bg-surface-2 p-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ${
          device === "mobile" ? "rounded-[2rem] p-2.5" : ""
        }`}
      >
        {device === "mobile" && (
          <span className="absolute left-1/2 top-3.5 z-20 h-1 w-14 -translate-x-1/2 rounded-full bg-black/60" />
        )}
        <div
          ref={screenRef}
          className="relative w-full overflow-hidden rounded-[1rem] bg-base"
          style={{ aspectRatio: `${spec.ratio}`, marginTop: device === "mobile" ? 8 : 0 }}
        >
          {chrome && device === "desktop" && (
            <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 border-b border-white/8 bg-surface/90 px-3 py-1.5 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              <span className="ml-2 hidden truncate rounded-full bg-white/5 px-2 py-0.5 font-mono text-[9px] text-muted sm:block">
                {spec.label.toLowerCase()}-preview.demo
              </span>
            </div>
          )}
          <div
            className="demo-scroll absolute inset-0 origin-top-left"
            style={
              scale
                ? {
                    inset: "auto",
                    left: 0,
                    top: 0,
                    width: spec.layout,
                    height: innerHeight,
                    transform: `scale(${scale})`,
                  }
                : /* Before the frame has been measured (and forever, if the client
                     bundle never runs) the demo renders at the frame's own width.
                     Its container queries pick a layout that fits, so nothing is blank. */
                  { width: "100%", height: "100%" }
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
