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
  hoverPeek = false,
  previewLabel,
  scrollable = false,
  maxWidth,
}: {
  device: Device;
  children: React.ReactNode;
  chrome?: boolean;
  /** Decorative frames get a hover drift; interactive ones already scroll. */
  hoverPeek?: boolean;
  /** When set, the frame is announced as a single labelled image and its
     rendered website is treated as still decoration — the navigable version
     lives on the demo's own route. Ignored once the frame is `scrollable`. */
  previewLabel?: string;
  /** Keeps the device shell but hands the screen back to the visitor: no
     `inert`, so wheel, touch, taps and Tab all reach the rendered site. The
     screen then holds real content, so it stops being announced as one image
     and becomes a named region a keyboard can enter and scroll. */
  scrollable?: boolean;
  /** Caps the frame narrower than the device's own max. The homepage work
     section uses it to keep the band short — the frame keeps its aspect ratio,
     so a narrower box is a proportionally shorter one. */
  maxWidth?: number;
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
    <div
      className="mx-auto w-full"
      style={{ maxWidth: maxWidth ?? spec.max }}
      role={scrollable || !previewLabel ? undefined : "img"}
      aria-label={scrollable || !previewLabel ? undefined : previewLabel}
    >
      <div
        className={`relative rounded-[1.4rem] border-2 border-line bg-card p-2 shadow-[6px_6px_0_var(--color-ink)] ${
          device === "mobile" ? "rounded-[2rem] p-2.5" : ""
        }`}
      >
        {device === "mobile" && (
          <span className="absolute left-1/2 top-3.5 z-20 h-1 w-14 -translate-x-1/2 rounded-full bg-ink/70" />
        )}
        <div
          ref={screenRef}
          className="relative w-full overflow-hidden rounded-[1rem] bg-paper"
          style={{ aspectRatio: `${spec.ratio}`, marginTop: device === "mobile" ? 8 : 0 }}
        >
          {/* The fake browser bar is an overlay, so it sits on top of the first
             ~34px of the rendered page — which is the concept's own header. That
             costs nothing while the screen is a picture, but a screen you are
             invited to scroll and tap cannot hide the site's navigation under a
             decorative bar, so an interactive frame shows the page from its own
             top. The device shell (border, offset shadow, notch) stays either way. */}
          {chrome && !scrollable && device === "desktop" && (
            <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 border-b-2 border-line bg-paper px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              <span className="ml-2 hidden truncate rounded-full bg-ink/[0.06] px-2 py-0.5 font-mono text-[12px] text-ink-muted sm:block">
                {spec.label.toLowerCase()}-preview.demo
              </span>
            </div>
          )}
          {/* Two modes share this one box. A decorative frame is muted: an inert
              subtree is never hit-testable, so nothing inside can be scrolled or
              tapped and the visitor reads it as a picture. A `scrollable` frame
              hands the screen back — no `inert`, no `aria-hidden`, plus a name and
              a tab stop so the wheel, a tap and the arrow keys all reach it. */}
          <div
            className="demo-scroll absolute inset-0 origin-top-left"
            inert={!scrollable || undefined}
            aria-hidden={scrollable ? undefined : true}
            role={scrollable ? "region" : undefined}
            tabIndex={scrollable ? 0 : undefined}
            aria-label={scrollable ? `${previewLabel ?? `${spec.label} preview`} — scrollable` : undefined}
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
            {hoverPeek ? (
              /* Shifted by a share of the frame's own visible height, so one
                 gesture means the same distance on every device width. */
              <div
                className="demo-peek"
                style={{ "--demo-peek": `${Math.round(innerHeight * 0.55)}px` } as React.CSSProperties}
              >
                {children}
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
