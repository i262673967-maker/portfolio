import { ImageResponse } from "next/og";
import { heroPoints, site } from "@/lib/data";

/* Social sharing card. ImageResponse ignores external CSS, so every value here
   is inline and mirrors the tokens in globals.css (base #08090c, accent #38bdf8).
   Typographic only — no stock art and no invented results. */
export const alt = `${site.brand} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const base = "#08090c";
const surface = "#12141b";
const offwhite = "#f4f3ef";
const muted = "#9aa0ad";
const accent = "#38bdf8";
const line = "#ffffff1f";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `radial-gradient(1100px 620px at 82% -12%, ${accent}26, ${base} 62%)`,
        padding: "68px 72px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: offwhite,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 14, height: 14, borderRadius: 999, background: accent, display: "flex" }} />
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: muted }}>
          {site.brand}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            lineHeight: 1.06,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          <span>Websites for local</span>
          <span style={{ color: accent }}>businesses.</span>
        </div>
        <div style={{ display: "flex", fontSize: 27, lineHeight: 1.45, color: muted, maxWidth: 940 }}>
          {site.supportingMessage}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {heroPoints.map((p) => (
            <div
              key={p}
              style={{
                fontSize: 24,
                color: offwhite,
                border: `1px solid ${line}`,
                background: surface,
                borderRadius: 999,
                padding: "12px 24px",
                display: "flex",
              }}
            >
              {p}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: accent }}>
          {site.auditTitle}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
