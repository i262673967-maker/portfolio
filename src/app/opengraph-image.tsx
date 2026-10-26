import { ImageResponse } from "next/og";
import { brandPitch, heroPoints, site } from "@/lib/data";

/* Social sharing card. ImageResponse ignores external CSS and cannot fetch web
   fonts here, so every value is inline and uses the same palette as globals.css
   (paper #F6F4EF, ink #07133F, brand #1A5CFF, mark #FFD43B). Typographic only —
   no stock art, no photos, and no invented results. */
export const alt = `${site.brand} — ${brandPitch}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const paper = "#F6F4EF";
const card = "#FFFFFF";
const ink = "#07133F";
const inkMuted = "#4A5272";
const brand = "#1A5CFF";
const mark = "#FFD43B";

const sans = "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: paper,
        padding: "68px 72px",
        display: "flex",
        flexDirection: "row",
        gap: 56,
        fontFamily: sans,
        color: ink,
      }}
    >
      {/* Left: identity, headline, points */}
      <div
        style={{
          flex: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 18, height: 18, borderRadius: 999, background: brand, display: "flex" }} />
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", fontWeight: 700, color: ink }}>
            {site.brand}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 80, lineHeight: 1.05, fontWeight: 800, letterSpacing: -2 }}>
            <span>Modern websites for</span>
            <span
              style={{
                display: "flex",
                alignSelf: "flex-start",
                background: mark,
                color: ink,
                padding: "0 12px",
                borderRadius: 10,
              }}
            >
              local businesses.
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 26, lineHeight: 1.45, color: inkMuted, maxWidth: 720 }}>
            {site.supportingMessage}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {heroPoints.map((p) => (
            <div
              key={p}
              style={{
                fontSize: 22,
                color: ink,
                border: `2px solid ${ink}`,
                background: card,
                borderRadius: 999,
                padding: "10px 22px",
                display: "flex",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Right: the brand-blue block with a navy offset behind it */}
      <div style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 260, height: 380, display: "flex" }}>
          <div
            style={{
              position: "absolute",
              left: 16,
              top: 16,
              width: 260,
              height: 380,
              borderRadius: 28,
              background: ink,
              transform: "rotate(6deg)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 260,
              height: 380,
              borderRadius: 28,
              border: `2px solid ${ink}`,
              background: brand,
              transform: "rotate(-4deg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 26,
            }}
          >
            <div style={{ display: "flex", fontSize: 22, lineHeight: 1.2, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: card }}>
              {site.auditTitle}
            </div>
          </div>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
