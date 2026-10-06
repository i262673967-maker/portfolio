"use client";

import { useState } from "react";
import type { DemoProps } from "./_shared";
import {
  DemoVars,
  DemoBadge,
  DemoHeading,
  DemoNav,
  Swatch,
  Btn,
  DemoAction,
  DemoFooter,
  DEMO_NOTE,
  useDemoAnchors,
} from "./_shared";

/* 04 — E-commerce Brand: premium lifestyle product store.
   Identity: editorial luxury retail, serif-ish display, image-led grid. */
const PRODUCTS: [name: string, price: string, from: string, to: string][] = [
  ["Ceramic Vase", "$68", "#d9b79a", "#8a6b52"],
  ["Linen Throw", "$120", "#cbb9a4", "#7d6f5c"],
  ["Oak Tray", "$45", "#c79a6b", "#6f5335"],
  ["Stone Diffuser", "$58", "#b9b3a8", "#6b675e"],
];

export default function EcommerceDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [bag, setBag] = useState<Record<string, number>>({});
  const [bagOpen, setBagOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const needle = query.trim().toLowerCase();
  const matched = PRODUCTS.filter(([name]) => name.toLowerCase().includes(needle));
  const visible = expanded ? matched : matched.slice(0, 2);
  const bagItems = Object.entries(bag);
  const bagCount = bagItems.reduce((n, [, qty]) => n + qty, 0);

  return (
    <DemoVars project={project}>
      <div className="border-b border-white/8 bg-[var(--d-bg)]/60 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-current/55">
        Complimentary shipping on orders over $100
      </div>

      <header className="sticky relative top-0 z-20 border-b border-white/8 bg-[var(--d-bg)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 @5xl:px-8">
          <span className="font-display text-[1rem] font-semibold tracking-[0.2em]">MAISON</span>
          <DemoNav
            anchor={anchor}
            items={[
              ["Shop", "shop"],
              ["Collections", "shop"],
              ["Story", "story"],
              ["Contact", "contact"],
            ]}
          />
          <div className="flex items-center gap-3 text-[11px] text-current/70">
            {searchOpen && (
              <input
                type="search"
                name="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search the collection"
                placeholder="Search pieces"
                className="w-24 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] placeholder:text-current/40 focus:border-[var(--d-accent)]/60 @5xl:w-36"
              />
            )}
            <button type="button" onClick={() => setSearchOpen((v) => !v)} aria-expanded={searchOpen} className="inline-flex min-h-6 items-center hover:text-current">
              Search
            </button>
            <button type="button" onClick={() => setBagOpen((v) => !v)} aria-expanded={bagOpen} className="relative inline-flex min-h-6 min-w-6 items-center hover:text-current">
              Bag
              {bagCount > 0 && (
                <span className="absolute -top-2 -right-2.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-[var(--d-accent)] text-[8px] font-bold text-black">
                  {bagCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {bagOpen && (
          <div className="absolute right-4 top-full z-30 mt-1 w-56 rounded-xl border border-white/12 bg-[var(--d-bg)] p-3 text-[11px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] @5xl:right-8">
            {bagItems.length === 0 ? (
              <p className="text-current/50">Your bag is empty.</p>
            ) : (
              <ul className="space-y-1.5">
                {bagItems.map(([name, qty]) => (
                  <li key={name} className="flex justify-between gap-3">
                    <span className="truncate">{name}</span>
                    <span className="text-[var(--d-accent)]">{qty}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-[10px] leading-relaxed text-current/45">{DEMO_NOTE}</p>
          </div>
        )}
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 @5xl:grid-cols-2 @5xl:px-8 @5xl:py-16">
          <div>
            <DemoBadge />
            <DemoHeading preview={preview} className="mt-4 font-display text-3xl leading-[1.1] font-semibold tracking-tight @3xl:text-4xl @5xl:text-[2.9rem]">
              Objects for a <em className="text-[var(--d-accent)] not-italic">considered</em> home.
            </DemoHeading>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-current/65">
              A small-batch collection of ceramics, textiles, and homeware — made to be kept,
              not replaced.
            </p>
            <Btn href={anchor.href("shop")} className="mt-6 px-6 py-2.5">Shop the Collection →</Btn>
          </div>
          <Swatch className="h-56 w-full @5xl:h-72" from="#e0c3a5" to="#8a6b4f" label="Autumn collection" />
        </div>
      </section>

      <section id={anchor.id("shop")} className="mx-auto max-w-6xl scroll-mt-16 px-4 pb-12 @5xl:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight @3xl:text-3xl">
            Featured
            {needle && <span className="ml-2 text-[11px] font-normal text-current/45">matching “{query.trim()}”</span>}
          </h2>
          {matched.length > 2 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex shrink-0 min-h-6 items-center text-[11px] text-[var(--d-accent)] hover:underline"
            >
              {expanded ? "Show less" : "View all →"}
            </button>
          )}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 @5xl:grid-cols-4">
          {visible.map(([name, price, a, b]) => (
            <div key={name} className="group">
              <div className="relative">
                <Swatch className="aspect-[4/5] w-full" from={a} to={b} />
                <button
                  type="button"
                  onClick={() => setBag((prev) => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }))}
                  aria-label={`Add ${name} to bag`}
                  className="absolute bottom-2 left-1/2 inline-flex -translate-x-1/2 min-h-11 items-center justify-center rounded-full bg-black/70 px-3 text-[10px] text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
                >
                  Quick add
                </button>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-[13px]">{name}</span>
                <span className="text-[13px] text-[var(--d-accent)]">{price}</span>
              </div>
            </div>
          ))}
          {matched.length === 0 && (
            <p className="col-span-full py-6 text-center text-xs text-current/45">No pieces match that search.</p>
          )}
        </div>
      </section>

      <section id={anchor.id("story")} className="border-y scroll-mt-16 border-white/8 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 @5xl:grid-cols-2 @5xl:items-center @5xl:px-8 @5xl:py-16">
          <Swatch className="h-48 w-full @5xl:h-64" from="#cbb9a4" to="#6f6353" label="Our story" />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--d-accent)]">Our story</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight @3xl:text-3xl">Made slowly, in small batches</h2>
            <p className="mt-3 text-sm leading-relaxed text-current/60">
              Each piece is produced with independent makers using natural materials. No mass
              production, no throwaway trends — just objects that age well.
            </p>
            <DemoAction variant="ghost" className="mt-5 px-5 py-2.5">
              Read Our Story
            </DemoAction>
          </div>
        </div>
      </section>

      <section id={anchor.id("contact")} className="mx-auto max-w-6xl scroll-mt-16 px-4 py-12 text-center @5xl:px-8 @5xl:py-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight @3xl:text-3xl">Join the list</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-current/60">New collections and restocks, once a month.</p>
        <form
          className="mx-auto mt-5 flex max-w-sm gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setJoined(true);
          }}
        >
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setJoined(false);
            }}
            aria-label="Email address"
            placeholder="Email address"
            className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2.5 text-left text-xs placeholder:text-current/40 focus:border-[var(--d-accent)]/60"
          />
          <Btn type="submit" className="px-5">Subscribe</Btn>
        </form>
        {joined && (
          <p role="status" className="mx-auto mt-3 max-w-sm text-[10px] leading-relaxed text-current/55">
            {DEMO_NOTE}
          </p>
        )}
      </section>

      <DemoFooter name="Maison Objects" />
    </DemoVars>
  );
}
