"use client";

import type { DemoProps } from "./_shared";
import { DemoVars, DemoBadge, DemoHeading, DemoNav, Swatch, Btn, DemoAction, DemoFooter, useDemoAnchors } from "./_shared";

/* 05 — Restaurant / Hospitality: upscale dining.
   Identity: warm, atmospheric, dark, elegant menu layout. */
export default function RestaurantDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  /* Native pickers keep the reservation real without inventing slot data; the
     bounds come from the "Wed-Sun, 6pm-late" and "tables for two to eight" copy. */
  const field =
    "w-full rounded-full border border-white/12 bg-black/20 px-3 py-2 text-xs text-current/70 [color-scheme:dark] @3xl:w-auto";
  return (
    <DemoVars project={project}>
      <header className="sticky top-0 z-20 border-b border-white/8 bg-[var(--d-bg)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 @5xl:px-8">
          <span className="font-display text-base font-semibold tracking-[0.15em]">EMBER <span className="text-[var(--d-accent)]">&</span> OAK</span>
          <DemoNav
            anchor={anchor}
            items={[
              ["Menu", "menu"],
              ["Story", "story"],
              ["Gallery", "story"],
              ["Visit", "contact"],
            ]}
          />
          <Btn href={anchor.href("contact")}>Reserve a Table</Btn>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--d-accent)_25%,transparent),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center @5xl:px-8 @5xl:py-24">
          <DemoBadge />
          <DemoHeading preview={preview} className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-[1.1] font-semibold tracking-tight @3xl:text-4xl @5xl:text-5xl">
            Modern Dining. <span className="text-[var(--d-accent)]">Made Memorable.</span>
          </DemoHeading>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-current/65">
            Fire-led cooking, seasonal produce, and a room designed for lingering. Open
            Wednesday to Sunday, from six until late.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Btn href={anchor.href("contact")} className="px-6 py-2.5">Reserve a Table</Btn>
            <Btn href={anchor.href("menu")} variant="ghost" className="px-6 py-2.5">View Menu</Btn>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id={anchor.id("menu")} className="scroll-mt-16 border-y border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-4 py-12 @5xl:px-8 @5xl:py-16">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--d-accent)]">From the kitchen</p>
          <h2 className="mt-2 text-center font-display text-2xl font-semibold tracking-tight @3xl:text-3xl">The Menu</h2>
          <div className="mt-8 grid gap-x-10 gap-y-5 @3xl:grid-cols-2">
            {[
              ["Ember-roasted beetroot", "Whipped goat curd, hazelnut, dill oil", "14"],
              ["Dry-aged ribeye", "Oak-fired, bone marrow butter, charred allium", "42"],
              ["Seared scallops", "Brown butter, cauliflower, brown crumb", "26"],
              ["Burnt honey tart", "Crème fraîche, thyme ice cream", "12"],
              ["Wild mushroom risotto", "Aged parmesan, truffle, chive", "22"],
              ["Coal-grilled octopus", "Smoked paprika, potato, salsa verde", "24"],
            ].map(([n, d, p]) => (
              <div key={n} className="flex items-baseline gap-3">
                <div className="min-w-0 flex-1">
                  <div className="font-display text-sm font-semibold">{n}</div>
                  <div className="mt-0.5 text-[12px] leading-relaxed text-current/55">{d}</div>
                </div>
                <span className="shrink-0 font-display text-sm text-[var(--d-accent)]">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + gallery */}
      <section id={anchor.id("story")} className="mx-auto max-w-6xl scroll-mt-16 px-4 py-12 @5xl:px-8 @5xl:py-16">
        <div className="grid gap-8 @5xl:grid-cols-2 @5xl:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight @3xl:text-3xl">A room built around fire</h2>
            <p className="mt-3 text-sm leading-relaxed text-current/60">
              Every plate passes over oak and ember. Our open kitchen sits at the heart of the
              dining room, so you can watch the evening come together.
            </p>
            <DemoAction variant="ghost" className="mt-5 px-5 py-2.5" note="Concept build — the written story is added when the real site is made.">Our Story</DemoAction>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Swatch className="col-span-2 h-32" from="#e0a45e" to="#6b4423" label="The pass" />
            <Swatch className="h-24" from="#8a5a3b" to="#3d2819" label="Dining room" />
            <Swatch className="h-24" from="#a9713f" to="#4a3220" label="Cellar" />
          </div>
        </div>
      </section>

      {/* Reservation */}
      <section id={anchor.id("contact")} className="mx-auto max-w-6xl scroll-mt-16 px-4 pb-14 @5xl:px-8">
        <div className="rounded-2xl border border-[var(--d-accent)]/30 bg-[var(--d-accent)]/[0.06] p-8 text-center @5xl:p-12">
          <h3 className="font-display text-2xl font-semibold tracking-tight @3xl:text-3xl">Reserve your evening</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-current/60">Tables for two to eight. For larger parties, contact us directly.</p>
          <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-2">
            <input type="date" aria-label="Reservation date" className={field} />
            <input type="time" aria-label="Reservation time" min="18:00" max="23:30" step={900} className={field} />
            <input type="number" aria-label="Number of guests" min={2} max={8} defaultValue={2} className={field} />
            <DemoAction className="px-5 py-2">Find a Table →</DemoAction>
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-current/45">12 Oak Street · Wed–Sun · 6pm–late</p>
        </div>
      </section>

      <DemoFooter name="Ember & Oak" />
    </DemoVars>
  );
}
