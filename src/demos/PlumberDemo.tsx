"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Check,
  ChevronsLeftRight,
  Clock,
  Droplet,
  Gauge,
  House,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  ShowerHead,
  Siren,
  Tag,
  ThermometerSun,
  Toilet,
  Waves,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/lib/data";
import {
  DEMO_NOTE,
  DemoBadge,
  DemoBackLink,
  DemoFaq,
  DemoHeading,
  DemoImage,
  DemoMobileMenu,
  DemoNav,
  DemoVars,
  useDemoAnchors,
  type DemoNavItem,
  type DemoProps,
} from "./_shared";

/* 01 — BlueLine Plumbing: Austin residential plumbing, one scrolling page.

   The design, the layout and the copy of this concept were supplied as a finished
   reference site, so this file rebuilds that reference rather than inventing a
   direction: the navy strip and sticky header, a split hero with the number under
   it, a service ticker, four trust tiles, the nine services twice (once as a grid,
   once in full beside a sticky hours card), before/after plates you can drag, a
   coverage map drawn as artwork instead of an embedded tile layer, and a form that
   reads back what was typed and then says plainly that nothing left the browser.

   The reference is five views behind a hash router. A demo must never navigate
   away from the page it is embedded on, so those five views became five anchored
   bands of one page and each view's heading was carried into the data as the
   standfirst over its band. Nothing was dropped — only reached by scrolling
   instead of by routing.

   Copper marks heat and urgency, blue does the asking. Where a literal colour is
   painted it is the concept's own from the reference (`#0b2135`, `#9e4f1b`,
   `#4da3ff`), never one invented here; everything else reads a `--d-*` token. */

type Blueline = NonNullable<NonNullable<Project["content"]>["blueline"]>;
type BaPair = Blueline["beforeAfter"]["pairs"][number];
type Place = Blueline["areas"]["places"][number];

/* Icons are held by position, not by name, so a service renamed in the data
   cannot quietly borrow another service's tool. Every call site falls back to the
   wrench rather than rendering nothing. */
const SERVICE_ICONS: LucideIcon[] = [
  Siren, // Emergency Plumbing
  Waves, // Drain Cleaning
  ThermometerSun, // Water Heater Repair
  Gauge, // Water Heater Installation
  Search, // Leak Detection
  Wrench, // Sewer Line Repair
  ShowerHead, // Faucet and Fixture Repair
  Toilet, // Toilet Repair
  Droplet, // Pipe Repair
];
const TRUST_ICONS: LucideIcon[] = [ShieldCheck, Zap, Tag, Award];
const WHY_ICONS: LucideIcon[] = [MapPin, Clock, Tag, House];
const CONTACT_ICONS: LucideIcon[] = [Phone, Clock, MapPin, Siren];

const container = "mx-auto w-full max-w-[1224px] px-[22px]";
const btn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-[22px] text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
const blueBtn = `${btn} bg-[var(--d-accent)] text-white hover:bg-[#0c4a9e]`;
const copperBtn = `${btn} bl-fill-copper hover:bg-[#8a4416]`;
const outlineBtn = `${btn} border-[1.5px] border-[var(--d-line-strong)] text-[var(--d-fg)] hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]`;
const lightBtn = `${btn} border-[1.5px] border-white/40 text-white hover:bg-white/10`;
const smallBtn = "min-h-11 gap-1.5 rounded-lg px-4 text-[14px] font-semibold";
const card = "rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)]";
const field =
  "min-h-11 w-full rounded-[10px] border border-[var(--d-line-strong)] bg-[var(--d-field)] px-3.5 text-[15px] text-[var(--d-fg)] placeholder:text-[var(--d-muted)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--d-accent)]";
const fieldLabel = "mb-1.5 block text-[13px] font-semibold text-[var(--d-body)]";
const bandTitle =
  "mt-4 font-display text-[clamp(1.7rem,5cqi,2.6rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-[var(--d-fg)]";

function Eyebrow({
  children,
  center = false,
  tone = "light",
}: {
  children: React.ReactNode;
  center?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[12.5px] font-bold uppercase tracking-[0.16em] ${
        tone === "dark" ? "text-[#7fbdf5]" : "text-[var(--d-accent)]"
      } ${center ? "justify-center" : ""}`}
    >
      <span
        aria-hidden="true"
        className={`h-0.5 w-[26px] shrink-0 rounded-full bg-[var(--d-accent-2)] ${center ? "invisible" : ""}`}
      />
      {children}
    </span>
  );
}

/* The live dot beside "Emergency line open". Its resting state is the plain dot
   the ping grows out of, so a visitor who asked for no motion sees the same mark. */
function PulseDot() {
  return (
    <span
      aria-hidden="true"
      className="bl-pulse relative inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[#4cc38a]"
    />
  );
}

/* A draggable before/after plate: one number, `--p`, drives the clipped
   photograph, the white rule and the grip (see `.bl-ba` in globals.css), so the
   three can never disagree about where the cut lands.

   Each photograph goes into its own absolutely-positioned box rather than taking
   `absolute inset-0` on `DemoImage` directly, because that component already sets
   `relative` on its wrapper and two position utilities on one element are settled
   by stylesheet order, not by the order the classes were written.

   The reference pinned the plate against vertical scrolling while you dragged
   (`touch-action: none`). Inside a scrollable device frame that would trap the
   page, so a finger can still scroll away here; the slider answers horizontal
   drags and the arrow keys answer everyone else. */
function BaPlate({ pair, sizes }: { pair: BaPair; sizes: string }) {
  const [pos, setPos] = useState(55);
  return (
    <figure className="m-0">
      <div
        className="bl-ba aspect-[4/3.4] w-full overflow-hidden rounded-2xl border border-[var(--d-line)]"
        style={{ "--p": pos / 100 } as React.CSSProperties}
      >
        <div className="absolute inset-0">
          <DemoImage src={pair.after} alt={pair.afterAlt} sizes={sizes} className="h-full w-full" />
        </div>
        <div className="bl-ba-before absolute inset-0">
          <DemoImage
            src={pair.before}
            alt={pair.beforeAlt}
            sizes={sizes}
            className="h-full w-full"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-md bg-[#0b2135]/85 px-2 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-white">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-md bg-[var(--d-accent)] px-2 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-white">
          After
        </span>
        <span className="bl-ba-line" aria-hidden="true" />
        <input
          className="bl-ba-range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={pair.slider}
        />
        <span className="bl-ba-grip" aria-hidden="true">
          <ChevronsLeftRight className="h-5 w-5" strokeWidth={2.4} />
        </span>
      </div>
      <figcaption className="mt-3 text-[14px] leading-relaxed text-[var(--d-body)]">
        {pair.caption}
      </figcaption>
    </figure>
  );
}

/* The coverage map is drawn, not embedded: a real tile layer would need a network
   call, a consent notice and a viewport it does not have inside a device frame.
   The dots, the labels and the pulse all read the same `areas.places` list that
   feeds the chips and the per-city cards, so a town cannot be on the map and
   missing from the page.

   Type is set large in the artwork's own units because the 640-unit-wide drawing
   is scaled to the container: at 390px the SVG renders at 0.59x, and a 24-unit
   label still lands above 12 real pixels. */
function AreaMap({ places, aria, uid }: { places: Place[]; aria: string; uid: string }) {
  const roads = ["M126 6v548", "M470 6v548", "M6 132h628", "M6 430h628"];
  return (
    <svg
      viewBox="0 0 640 560"
      role="img"
      aria-label={aria}
      className="h-auto w-full rounded-2xl border border-[var(--d-line)]"
      style={{ background: "#eef4fa" }}
    >
      <defs>
        <pattern id={`${uid}-grid`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0v32" fill="none" stroke="#dbe6f1" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="640" height="560" fill={`url(#${uid}-grid)`} />
      <ellipse
        cx="312"
        cy="272"
        rx="188"
        ry="242"
        style={{ fill: "var(--d-accent)" }}
        opacity="0.07"
      />
      {roads.map((d) => (
        <path key={d} d={d} fill="none" stroke="#d3e0ee" strokeWidth="2" strokeDasharray="10 12" />
      ))}
      <path
        d="M244 0c16 96-26 146-9 226 13 70 60 102 47 178-9 56-36 92-24 156"
        fill="none"
        stroke="#bcd8f0"
        strokeWidth="11"
        strokeLinecap="round"
      />
      {places.map((p) =>
        p.hub ? (
          <circle
            key={`ring-${p.name}`}
            className="bl-map-pulse"
            cx={p.dot.x}
            cy={p.dot.y}
            r="30"
            fill="none"
            strokeWidth="3"
            style={{ stroke: "var(--d-accent)" }}
            opacity="0.5"
          />
        ) : null,
      )}
      {places.map((p) => (
        <circle
          key={`dot-${p.name}`}
          cx={p.dot.x}
          cy={p.dot.y}
          r={p.hub ? 12 : 8}
          fill="#fff"
          strokeWidth={p.hub ? 5 : 4}
          style={{ stroke: "var(--d-accent)" }}
        />
      ))}
      {places.map((p) => (
        <text
          key={`label-${p.name}`}
          x={p.dot.tx}
          y={p.dot.ty}
          textAnchor={p.dot.anchor}
          fontSize={p.hub ? 32 : 24}
          fontWeight={p.hub ? 800 : 600}
          fill="#0e1c2b"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {p.name}
        </text>
      ))}
      <g transform="translate(578 54)" aria-hidden="true">
        <circle r="22" fill="#fff" stroke="#d3e0ee" strokeWidth="2" />
        <path d="M0-14 5 2 0-2-5 2Z" fill="#c2672e" />
        <text y="18" textAnchor="middle" fontSize="16" fontWeight="700" fill="#5c6f83">
          N
        </text>
      </g>
    </svg>
  );
}

/* The wordmark is the reference's own: a rounded plate, a W from one rounded
   stroke, a copper dot. It runs on the page's light header and on the navy
   footer, which need opposite plate and stroke colours, so `tone` picks between
   the two pairs the reference ships. */
function BrandMark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="h-11 w-11 shrink-0">
      <rect width="40" height="40" rx="9" fill={tone === "light" ? "#0b2135" : "#1160c9"} />
      <path
        d="M11 8h8a6 6 0 0 1 6 6 6 6 0 0 1-6 6h-3v12h-5z"
        fill="none"
        stroke={tone === "light" ? "#4da3ff" : "#ffffff"}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="27" cy="27" r="4" className="fill-[var(--d-accent-2)]" />
    </svg>
  );
}

function Wordmark({ b, tone = "light" }: { b: Blueline["brand"]; tone?: "light" | "dark" }) {
  return (
    <span className="font-display leading-[1.04]">
      <strong
        className={`block text-[20px] font-extrabold tracking-[-0.015em] ${
          tone === "light" ? "text-[var(--d-fg)]" : "bl-ink-hi"
        }`}
      >
        {b.lead}
        <span className={tone === "light" ? "text-[var(--d-accent)]" : "text-[#7fbdf5]"}>
          {b.accent}
        </span>
      </strong>
      <small
        className={`mt-0.5 block text-[12.5px] font-semibold uppercase tracking-[0.18em] ${
          tone === "light" ? "text-[var(--d-accent-text)]" : "text-[#e8a06a]"
        }`}
      >
        {b.sub}
      </small>
    </span>
  );
}

export default function PlumberDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const c = project.content;
  const b = c?.blueline;

  const [callNote, setCallNote] = useState(false);
  const [legal, setLegal] = useState<null | "privacy" | "terms">(null);
  const [name, setName] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [problem, setProblem] = useState<string[]>([]);
  const [sent, setSent] = useState<{ name: string; service: string } | null>(null);
  const okRef = useRef<HTMLDivElement>(null);
  const legalRef = useRef<HTMLDivElement>(null);

  /* Focus follows the result, the way it would after a real page changed. Both
     effects read and move focus only — neither sets state, which the lint rules
     forbid inside an effect body here. */
  useEffect(() => {
    if (sent) okRef.current?.focus();
  }, [sent]);

  useEffect(() => {
    if (legal) legalRef.current?.focus();
  }, [legal]);

  /* This layout IS the BlueLine one-pager: without its copy block, its number, its
     main ask or its emergency band there is nothing on screen to draw. */
  if (!c || !b || !c.phone || !c.emergency || !c.hero || !c.ctaPrimary) return null;

  const phone = c.phone;
  const emergency = c.emergency;
  const hero = c.hero;
  const f = b.form;
  const services = c.services ?? [];
  const details = b.serviceDetails;
  const places = b.areas.places;
  const trust = c.trustChips ?? [];
  const faqs = c.faqs ?? [];
  const jobOptions = [...details.map((d) => d.title), f.otherOption];
  const missingLabels: Record<string, string> = {
    name: f.name,
    phone: f.phone,
    service: f.service,
  };

  /* A dialling link is only safe once the visitor is on the concept's own page.
     Inside a device frame it would tear the visitor off the portfolio, so the very
     same control becomes a button that answers honestly instead. */
  const callHref = preview ? undefined : phone.href;
  const askCall = () => setCallNote(true);

  const asCall = (className: string, children: React.ReactNode) =>
    callHref ? (
      <a href={callHref} className={className}>
        {children}
      </a>
    ) : (
      <button type="button" onClick={askCall} className={className}>
        {children}
      </button>
    );

  const goTo = (section: string) => {
    const el = document.getElementById(anchor.id(section));
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = [
      !name.trim() && "name",
      !phoneValue.trim() && "phone",
      !service && "service",
    ].filter((key): key is string => typeof key === "string");
    setProblem(missing);
    if (missing.length > 0) return;
    setSent({ name: name.trim(), service });
  };

  const reset = () => {
    setSent(null);
    setName("");
    setPhoneValue("");
    setEmail("");
    setService("");
    setMessage("");
    setProblem([]);
  };

  /* "Request this service" can only ever name a real option, because the select is
     built from the same list these buttons take their labels from. It writes the
     field and scrolls the form into view; it does not claim a booking. */
  const requestService = (title: string) => {
    setService(title);
    setSent(null);
    setProblem((p) => p.filter((k) => k !== "service"));
    goTo("contact");
  };

  const navItems: DemoNavItem[] = [
    ["Home", "top"],
    ["Services", "details"],
    ["About", "about"],
    ["Service Areas", "areas"],
    ["Contact", "contact"],
  ];

  const lead = sent
    ? f.successLead.replace("{name}", sent.name).replace("{service}", sent.service)
    : "";
  const demoLine = sent ? f.successDemo.replace("{phone}", phone.display) : "";

  return (
    <DemoVars project={project}>
      <div id={anchor.id("top")} className="font-sans text-[15.5px] leading-[1.65]">
        {/* --- Top strip: the coverage line and the number, before anything --- */}
        <div className="bl-band hidden @4xl:block">
          <div
            className={`${container} flex min-h-10 items-center justify-between gap-4 text-[13px]`}
          >
            <span className="bl-ink inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-[#4da3ff]" aria-hidden="true" />
              {b.topbarNote}
            </span>
            <span className="bl-ink inline-flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-[#4da3ff]" aria-hidden="true" />
              <span className="hidden @5xl:inline">{c.availability} · </span>
              {asCall(
                "inline-flex min-h-11 items-center font-semibold text-[#eaf2f9] underline-offset-4 hover:underline",
                phone.display,
              )}
            </span>
          </div>
        </div>

        {/* --- Header --- */}
        <header className="sticky top-0 z-30 border-b border-[var(--d-line)] bg-[var(--d-bg)]/94 backdrop-blur">
          <div className={`${container} flex min-h-[78px] items-center justify-between gap-6`}>
            <span className="flex items-center gap-3">
              <BrandMark />
              <Wordmark b={b.brand} />
            </span>
            <DemoNav anchor={anchor} items={navItems} className="text-[15px] font-semibold" />
            <span className="flex items-center gap-3">
              {asCall(
                `${blueBtn} shrink-0 gap-2 px-[16px] @5xl:px-5`,
                <>
                  <Phone className="h-[17px] w-[17px]" aria-hidden="true" />
                  <span className="hidden @5xl:inline">{phone.display}</span>
                  <span className="sr-only">{phone.label}</span>
                </>,
              )}
              <DemoMobileMenu
                anchor={anchor}
                items={navItems}
                action={[c.ctaPrimary, "contact"]}
              />
            </span>
          </div>
        </header>

        {/* The honest reply to a number that cannot be dialled from a frame. */}
        {callNote && !callHref && (
          <p
            role="status"
            className={`${container} mt-3 rounded-xl border border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-3 text-[13px] leading-relaxed text-[var(--d-body)]`}
          >
            {DEMO_NOTE}
          </p>
        )}

        <main>
          {/* --- Hero: the ask, the number, the proof --- */}
          <section className={`${container} demo-reveal py-12 @3xl:py-16 @5xl:py-20`}>
            <div className="grid items-center gap-10 @5xl:grid-cols-[1.04fr_0.96fr] @5xl:gap-12">
              <div>
                <Eyebrow>{b.heroEyebrow}</Eyebrow>
                <DemoHeading
                  preview={preview}
                  className="mt-4 font-display text-[clamp(2.1rem,7.6cqi,4.05rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-balance text-[var(--d-fg)]"
                >
                  {c.headline} <span className="text-[var(--d-accent)]">{c.headlineAccent}</span>
                </DemoHeading>
                <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-[var(--d-body)]">
                  {c.intro}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button type="button" className={blueBtn} onClick={() => goTo("contact")}>
                    {c.ctaPrimary}
                    <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
                  </button>
                  {asCall(
                    outlineBtn,
                    <>
                      <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                      {c.ctaSecondary}
                    </>,
                  )}
                </div>
                <div className="mt-8 border-t border-[var(--d-line)] pt-6">
                  <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[var(--d-muted)]">
                    {b.heroPhoneNote}
                  </p>
                  {asCall(
                    "mt-1 inline-flex min-h-11 items-center font-display text-[clamp(1.6rem,4.4cqi,2.15rem)] font-extrabold tracking-[-0.02em] text-[var(--d-accent-text)] underline decoration-[var(--d-accent)]/40 decoration-2 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)]",
                    phone.display,
                  )}
                  <p className="mt-1 text-[14px] text-[var(--d-body)]">{c.availability}</p>
                </div>
                {trust.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {trust.map((t) => (
                      <li
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--d-line)] bg-[var(--d-card)] px-3 py-1.5 text-[13px] font-semibold text-[var(--d-body)]"
                      >
                        <Check className="h-4 w-4 shrink-0 text-[var(--d-accent)]" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-[20px] border border-[var(--d-line)]">
                  <DemoImage
                    src={hero.src}
                    alt={hero.alt}
                    sizes="(min-width: 1024px) 620px, 92vw"
                    preload={!preview}
                    className="aspect-[4/3.3] w-full @5xl:aspect-[4/4.3]"
                    imgClassName="demo-ken-burns"
                  />
                  <span className="absolute left-4 top-4 rounded-lg bg-[#0b2135]/85 px-3 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-white">
                    {b.heroBadge}
                  </span>
                </div>
                <div
                  className={`${card} mt-4 p-5 shadow-[var(--d-shadow)] @5xl:absolute @5xl:bottom-8 @5xl:-left-8 @5xl:mt-0 @5xl:max-w-[330px]`}
                >
                  <p className="inline-flex items-center gap-2.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#2e7d5b]">
                    <PulseDot />
                    {b.hoursCard.status}
                  </p>
                  <p className="mt-2 font-display text-[19px] font-bold leading-snug text-[var(--d-fg)]">
                    {b.heroStatus.title}
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed text-[var(--d-body)]">
                    {b.heroStatus.body}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* --- Ticker: the same services, kept moving under the hero --- */}
          <div
            className="marquee border-y border-[var(--d-line)] bg-[var(--d-soft)] py-3.5"
            aria-hidden="true"
          >
            <div className="marquee-track">
              {[...b.ticker, ...b.ticker].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="flex items-center gap-8 whitespace-nowrap pr-8 text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--d-body)]"
                >
                  {t}
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--d-accent-2)]" />
                </span>
              ))}
            </div>
          </div>

          {/* --- Four reasons, each one cell of a single ruled block --- */}
          <section className={`${container} demo-reveal py-14 @4xl:py-20`}>
            <div className="grid border-l border-t border-[var(--d-line)] @xl:grid-cols-2 @4xl:grid-cols-4">
              {b.trust.map((t, i) => {
                const Icon = TRUST_ICONS[i] ?? ShieldCheck;
                return (
                  <div key={t.title} className="border-b border-r border-[var(--d-line)] p-6 @4xl:p-7">
                    <span
                      aria-hidden="true"
                      className="inline-grid h-12 w-12 place-items-center rounded-xl bg-[#0b2135] text-[#4da3ff]"
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    {/* No band heading sits above this grid, so the tiles are the
                        section's own headings — an h3 here would skip a level on the
                        concept's standalone page. */}
                    <h2 className="mt-4 font-display text-[19px] font-bold tracking-[-0.01em] text-[var(--d-fg)]">
                      {t.title}
                    </h2>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--d-body)]">{t.body}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* --- Services, the short version --- */}
          <section
            id={anchor.id("services")}
            className="scroll-mt-[96px] bg-[var(--d-soft)] py-14 @4xl:py-20"
          >
            <div className={`${container} demo-reveal`}>
              <div className="max-w-[680px]">
                <Eyebrow>{c.servicesEyebrow}</Eyebrow>
                <h2 className={bandTitle}>{c.servicesTitle}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-[var(--d-body)]">{b.servicesIntro}</p>
              </div>
              <div className="mt-10 grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-3">
                {services.map((s, i) => {
                  const Icon = SERVICE_ICONS[i] ?? Wrench;
                  return (
                    <article key={s.title} className={`${card} flex flex-col p-6`}>
                      <span
                        aria-hidden="true"
                        className="inline-grid h-[50px] w-[50px] place-items-center rounded-xl bg-[#0b2135] text-[#4da3ff]"
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="mt-4 font-display text-[19px] font-bold tracking-[-0.01em] text-[var(--d-fg)]">
                        {s.title}
                      </h3>
                      <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-[var(--d-body)]">{s.body}</p>
                      <button
                        type="button"
                        onClick={() => goTo(`detail-${i}`)}
                        className={`${outlineBtn} ${smallBtn} mt-4 self-start`}
                      >
                        Details
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </article>
                  );
                })}
              </div>
              <div className="mt-8">
                <button type="button" className={blueBtn} onClick={() => goTo("details")}>
                  {b.viewAll}
                  <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>

          {/* --- Why: the ask holds still while the reasons scroll past it --- */}
          <section className={`${container} demo-reveal py-14 @4xl:py-20`}>
            <div className="grid gap-10 @4xl:grid-cols-[0.92fr_1.08fr] @4xl:gap-14">
              <div className="@4xl:sticky @4xl:top-28 @4xl:self-start">
                <Eyebrow>{b.why.eyebrow}</Eyebrow>
                <h2 className={bandTitle}>{b.why.title}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-[var(--d-body)]">{b.why.intro}</p>
                <button type="button" className={`${blueBtn} mt-6`} onClick={() => goTo("contact")}>
                  {b.why.link}
                  <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
                </button>
              </div>
              <ul className="grid gap-4">
                {b.why.items.map((w, i) => {
                  const Icon = WHY_ICONS[i] ?? Check;
                  return (
                    <li key={w.title} className={`${card} flex gap-4 p-6`}>
                      <span
                        aria-hidden="true"
                        className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--d-soft)] text-[var(--d-accent-text)]"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <h3 className="font-display text-[18px] font-bold tracking-[-0.01em] text-[var(--d-fg)]">
                          {w.title}
                        </h3>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--d-body)]">{w.body}</p>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* --- The urgent band: one navy block, one job --- */}
          <section className="bl-band bl-band-em py-14 @4xl:py-20">
            <div className={`${container} grid items-center gap-9 @4xl:grid-cols-[1.15fr_0.85fr]`}>
              <div>
                <p className="bl-ink-ok mb-5 inline-flex items-center gap-2.5 text-[13.5px] font-semibold">
                  <PulseDot />
                  {b.emergencyStatus}
                </p>
                <h2 className="bl-ink-hi font-display text-[clamp(1.9rem,5.6cqi,3.2rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-balance">
                  {emergency.title}
                </h2>
                <p className="mt-4 max-w-[560px] text-[17px] leading-relaxed bl-ink">{emergency.body}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {asCall(
                    copperBtn,
                    <>
                      <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                      {emergency.callLabel} {phone.display}
                    </>,
                  )}
                  <button type="button" className={lightBtn} onClick={() => goTo("contact")}>
                    {c.ctaPrimary}
                  </button>
                </div>
                <p className="bl-ink-lo mt-5 text-[13.5px] leading-relaxed">{emergency.note}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
                <h3 className="bl-ink-hi font-display text-[19px] font-bold">{b.hoursCard.title}</h3>
                <dl className="mt-4 divide-y divide-white/10">
                  {b.hoursCard.rows.map((r) => (
                    <div key={r.label} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-[14px] bl-ink">{r.label}</dt>
                      <dd className="text-right text-[15px] font-semibold bl-ink-hi">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* --- Before and after, each plate draggable --- */}
          <section className={`${container} demo-reveal py-14 @4xl:py-20`}>
            <div className="max-w-[680px]">
              <Eyebrow>{b.beforeAfter.eyebrow}</Eyebrow>
              <h2 className={bandTitle}>{b.beforeAfter.title}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-[var(--d-body)]">{b.beforeAfter.intro}</p>
            </div>
            <div className="mt-10 grid gap-6 @4xl:grid-cols-3">
              {b.beforeAfter.pairs.map((pair) => (
                <BaPlate key={pair.caption} pair={pair} sizes="(min-width: 1100px) 380px, 92vw" />
              ))}
            </div>
            <p className="mt-6 text-[13.5px] leading-relaxed text-[var(--d-muted)]">{b.beforeAfter.note}</p>
          </section>

          {/* --- What the fiction says people say --- */}
          <section className="bg-[var(--d-soft)] py-14 @4xl:py-20">
            <div className={`${container} demo-reveal`}>
              <div className="max-w-[680px]">
                <Eyebrow>{b.reviews.eyebrow}</Eyebrow>
                <h2 className={bandTitle}>{b.reviews.title}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-[var(--d-body)]">{b.reviews.intro}</p>
              </div>
              <div className="mt-10 grid gap-5 @4xl:grid-cols-3">
                {b.reviews.items.map((r) => (
                  <figure key={r.name} className={`${card} m-0 flex flex-col p-6`}>
                    <span className="flex gap-0.5 text-[15px] leading-none text-[var(--d-accent-2)]" aria-hidden="true">
                      {"★★★★★"}
                    </span>
                    <blockquote className="mt-3 flex-1 text-[15.5px] leading-relaxed text-[var(--d-fg)]">
                      “{r.quote}”
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3 border-t border-[var(--d-line)] pt-4">
                      <span
                        aria-hidden="true"
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0b2135] font-display text-[13px] font-bold text-white"
                      >
                        {r.initials}
                      </span>
                      <span>
                        <span className="block text-[14.5px] font-semibold text-[var(--d-fg)]">{r.name}</span>
                        <span className="block text-[13px] text-[var(--d-muted)]">{r.place}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-6 text-[13.5px] leading-relaxed text-[var(--d-muted)]">{b.reviews.note}</p>
            </div>
          </section>

          {/* --- Coverage: a drawn map, then a card per town --- */}
          <section
            id={anchor.id("areas")}
            className="scroll-mt-[96px] py-14 @4xl:py-20"
          >
            <div className={`${container} demo-reveal`}>
              <div className="max-w-[760px]">
                <Eyebrow>{b.areas.eyebrow}</Eyebrow>
                <h2 className={bandTitle}>{b.areas.title}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-[var(--d-body)]">{b.areas.head}</p>
              </div>
              <div className="mt-10 grid items-start gap-8 @4xl:grid-cols-[1.02fr_0.98fr] @4xl:gap-12">
                <div>
                  <AreaMap places={places} aria={b.areas.mapAria} uid={uid} />
                  <p className="mt-3 flex flex-wrap items-center gap-2 text-[13px] leading-relaxed text-[var(--d-muted)]">
                    <span className="rounded-md border border-[var(--d-line)] bg-[var(--d-card)] px-2 py-1 font-mono uppercase tracking-[0.1em]">
                      {b.areas.mapPlate}
                    </span>
                    {b.areas.mapNote}
                  </p>
                </div>
                <div>
                  <p className="text-[16.5px] leading-relaxed text-[var(--d-body)]">{b.areas.intro}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {places.map((p, i) => (
                      <li key={p.name}>
                        <button
                          type="button"
                          onClick={() => goTo(`city-${i}`)}
                          className={`${outlineBtn} ${smallBtn}`}
                        >
                          {p.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className={`${blueBtn} mt-6`} onClick={() => goTo("contact")}>
                    {b.areas.cta}
                    <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
                  </button>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-[var(--d-muted)]">{b.areas.note}</p>
                </div>
              </div>

              <h3 className="mt-14 font-display text-[clamp(1.5rem,4.2cqi,2.1rem)] font-extrabold tracking-[-0.02em] text-balance text-[var(--d-fg)]">
                {b.areas.cardsTitle}
              </h3>
              <p className="mt-3 max-w-[680px] text-[16.5px] leading-relaxed text-[var(--d-body)]">
                {b.areasIntro}
              </p>
              <div className="mt-6 grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-4">
                {places.map((p, i) => (
                  <article
                    key={p.name}
                    id={anchor.id(`city-${i}`)}
                    className={`${card} scroll-mt-[96px] p-5`}
                  >
                    <h4 className="flex items-center gap-2 font-display text-[17px] font-bold text-[var(--d-fg)]">
                      <MapPin className="h-4 w-4 shrink-0 text-[var(--d-accent)]" aria-hidden="true" />
                      {p.name}
                      {p.hub && (
                        <span className="rounded-full bg-[var(--d-soft)] px-2 py-0.5 text-[12px] font-semibold text-[var(--d-body)]">
                          Home base
                        </span>
                      )}
                    </h4>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--d-body)]">{p.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* --- About, and the longer story under it --- */}
          <section
            id={anchor.id("about")}
            className="scroll-mt-[96px] bg-[var(--d-soft)] py-14 @4xl:py-20"
          >
            <div
              className={`${container} demo-reveal grid gap-10 @4xl:grid-cols-[0.95fr_1.05fr] @4xl:gap-14`}
            >
              <div>
                <Eyebrow>{b.about.eyebrow}</Eyebrow>
                <h2 className={bandTitle}>{b.about.title}</h2>
              </div>
              <div>
                <p className="text-[17px] font-semibold leading-relaxed text-[var(--d-fg)]">
                  {b.about.paras[0]}
                </p>
                <p className="mt-4 text-[16px] leading-relaxed text-[var(--d-body)]">{b.about.paras[1]}</p>
                <p className="mt-4 text-[16px] leading-relaxed text-[var(--d-body)]">{b.about.paras[2]}</p>
                <ul className="mt-6 space-y-2">
                  {b.about.list.map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-[15.5px] text-[var(--d-fg)]">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--d-accent)]" aria-hidden="true" />
                      {line}
                    </li>
                  ))}
                </ul>
                <button type="button" className={`${outlineBtn} mt-7`} onClick={() => goTo("story")}>
                  {b.about.cta}
                  <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>

          <section
            id={anchor.id("story")}
            className="scroll-mt-[96px] py-14 @4xl:py-20"
          >
            <div className={`${container} demo-reveal`}>
              <div className="grid gap-10 @4xl:grid-cols-[0.95fr_1.05fr] @4xl:gap-14">
                <div className="relative overflow-hidden rounded-[20px] border border-[var(--d-line)]">
                  <DemoImage
                    src="/demos/blueline-plumbing/service-van.webp"
                    alt="BlueLine Plumbing service van parked at a home"
                    sizes="(min-width: 1100px) 560px, 92vw"
                    className="aspect-[4/3] w-full"
                    imgClassName="demo-ken-burns"
                  />
                </div>
                <div>
                  <h2 className={bandTitle}>{b.story.title}</h2>
                  {b.story.paras.map((p) => (
                    <p key={p} className="mt-4 text-[16px] leading-relaxed text-[var(--d-body)]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <Eyebrow>{b.values.eyebrow}</Eyebrow>
                <h3 className="mt-4 font-display text-[clamp(1.5rem,4.2cqi,2.1rem)] font-extrabold tracking-[-0.02em] text-balance text-[var(--d-fg)]">
                  {b.values.title}
                </h3>
                <div className="mt-6 grid gap-5 @4xl:grid-cols-3">
                  {b.values.items.map((v) => (
                    <article key={v.no} className={`${card} p-6`}>
                      <span className="font-display text-[15px] font-extrabold tracking-[0.1em] text-[var(--d-accent-2)]">
                        {v.no}
                      </span>
                      <h4 className="mt-2 font-display text-[19px] font-bold tracking-[-0.01em] text-[var(--d-fg)]">
                        {v.title}
                      </h4>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--d-body)]">{v.body}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <Eyebrow>{b.steps.eyebrow}</Eyebrow>
                <h3 className="mt-4 font-display text-[clamp(1.5rem,4.2cqi,2.1rem)] font-extrabold tracking-[-0.02em] text-balance text-[var(--d-fg)]">
                  {b.steps.title}
                </h3>
                <ol className="mt-6 grid gap-5 @4xl:grid-cols-3">
                  {b.steps.items.map((s) => (
                    <li key={s.no} className={`${card} p-6`}>
                      <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[var(--d-accent)] font-display text-[17px] font-extrabold text-white">
                        {s.no}
                      </span>
                      <h4 className="mt-4 font-display text-[18px] font-bold tracking-[-0.01em] text-[var(--d-fg)]">
                        {s.title}
                      </h4>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--d-body)]">{s.body}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-10 text-[13px] leading-relaxed text-[var(--d-muted)]">{c.imageSource}</p>
            </div>
          </section>

          {/* --- The same nine services, this time in full --- */}
          <section
            id={anchor.id("details")}
            className="scroll-mt-[96px] bg-[var(--d-soft)] py-14 @4xl:py-20"
          >
            <div className={`${container} demo-reveal`}>
              <div className="max-w-[680px]">
                <Eyebrow>{b.detailsHead.eyebrow}</Eyebrow>
                <h2 className={bandTitle}>{b.detailsHead.title}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-[var(--d-body)]">{b.detailsHead.intro}</p>
              </div>

              <div className="mt-10 grid items-start gap-8 @5xl:grid-cols-[330px_1fr] @5xl:gap-10">
                <aside className="flex flex-col gap-4 @5xl:sticky @5xl:top-28">
                  <div className={`${card} p-6`}>
                    <h3 className="font-display text-[18px] font-bold text-[var(--d-fg)]">
                      {b.helpCard.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--d-body)]">{b.helpCard.body}</p>
                    <button
                      type="button"
                      className={`${blueBtn} ${smallBtn} mt-4 w-full`}
                      onClick={() => goTo("contact")}
                    >
                      {c.ctaPrimary}
                    </button>
                  </div>
                  <div className="bl-band rounded-2xl p-6">
                    <h3 className="bl-ink-hi font-display text-[18px] font-bold">{b.hoursCard.title}</h3>
                    <dl className="mt-3 divide-y divide-white/10">
                      {b.hoursCard.rows.map((r) => (
                        <div key={r.label} className="flex items-baseline justify-between gap-3 py-2.5">
                          <dt className="text-[13.5px] bl-ink">{r.label}</dt>
                          <dd className="text-right text-[14px] font-semibold bl-ink-hi">{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="bl-ink-ok mt-3 inline-flex items-center gap-2 text-[13px] font-semibold">
                      <PulseDot />
                      {b.hoursCard.status}
                    </p>
                  </div>
                </aside>

                <div className="space-y-6">
                  {details.map((d, i) => {
                    const Icon = SERVICE_ICONS[i] ?? Wrench;
                    return (
                      <article
                        key={d.title}
                        id={anchor.id(`detail-${i}`)}
                        className={`${card} scroll-mt-[96px] overflow-hidden @3xl:grid @3xl:grid-cols-[0.88fr_1.12fr]`}
                      >
                        <DemoImage
                          src={d.image.src}
                          alt={d.image.alt}
                          sizes="(min-width: 1100px) 420px, 92vw"
                          className="aspect-[4/3] w-full @3xl:aspect-auto @3xl:h-full"
                        />
                        <div className="p-6 @4xl:p-8">
                          <p className="flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.16em] text-[var(--d-accent-2)]">
                            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                            {d.kicker}
                          </p>
                          <h3 className="mt-3 font-display text-[clamp(1.35rem,3.2cqi,1.85rem)] font-extrabold leading-[1.15] tracking-[-0.015em] text-balance text-[var(--d-fg)]">
                            {d.title}
                          </h3>
                          <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--d-body)]">{d.body}</p>
                          <ul className="mt-4 space-y-2">
                            {d.benefits.map((line) => (
                              <li key={line} className="flex items-start gap-2.5 text-[14.5px] text-[var(--d-body)]">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-accent)]" aria-hidden="true" />
                                {line}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => requestService(d.title)}
                              className={`${blueBtn} ${smallBtn}`}
                            >
                              {d.request}
                            </button>
                            {asCall(
                              `${outlineBtn} ${smallBtn}`,
                              <>
                                <Phone className="h-4 w-4" aria-hidden="true" />
                                {d.call} {phone.display}
                              </>,
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* --- Questions, then the last ask --- */}
          <section id={anchor.id("faq")} className="scroll-mt-[96px] bg-[var(--d-soft)] py-14 @4xl:py-20">
            <div className={`${container} demo-reveal`}>
              <div className="mx-auto max-w-[680px] text-center">
                <Eyebrow center>FAQ</Eyebrow>
                <h2 className={bandTitle}>{c.faqTitle}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-[var(--d-body)]">{b.faqIntro}</p>
              </div>
              <div className="mx-auto mt-8 max-w-[820px]">
                <DemoFaq items={faqs} />
              </div>
            </div>
          </section>

          <section className="bl-band bl-band-final py-16 @4xl:py-24">
            <div className={`${container} text-center`}>
              <h2 className="bl-ink-hi mx-auto max-w-[760px] font-display text-[clamp(1.9rem,5.6cqi,3rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-balance">
                {c.ctaTitle}
              </h2>
              <p className="bl-ink mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed">{c.ctaBody}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {asCall(
                  copperBtn,
                  <>
                    <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                    {emergency.callLabel} {phone.display}
                  </>,
                )}
                <button type="button" className={lightBtn} onClick={() => goTo("contact")}>
                  {c.ctaPrimary}
                </button>
              </div>
              <p className="bl-ink-lo mt-6 text-[14px]">
                {b.finalPhone} <span className="bl-ink-hi font-semibold">{phone.display}</span> ·{" "}
                {c.availability}
              </p>
            </div>
          </section>

          {/* --- Contact: the form reads back what was typed, then says plainly
              that nothing left the browser --- */}
          <section
            id={anchor.id("contact")}
            className="scroll-mt-[96px] bg-[var(--d-soft)] py-14 @4xl:py-20"
          >
            <div className={`${container} demo-reveal`}>
              <div className="max-w-[680px]">
                <Eyebrow>{b.contactHead.eyebrow}</Eyebrow>
                <h2 className={bandTitle}>{b.contactHead.title}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-[var(--d-body)]">{b.contactHead.intro}</p>
              </div>

              <div className="mt-10 grid items-start gap-8 @4xl:grid-cols-[1.12fr_0.88fr] @4xl:gap-10">
                <div className={`${card} p-6 @4xl:p-8`}>
                  {sent ? (
                    <div
                      ref={okRef}
                      tabIndex={-1}
                      className="pop-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-14 w-14 place-items-center rounded-full bg-[var(--d-accent)] text-white"
                      >
                        <Check className="h-7 w-7" />
                      </span>
                      <h3 className="mt-4 font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--d-fg)]">
                        {f.successTitle}
                      </h3>
                      <p className="mt-3 text-[16px] leading-relaxed text-[var(--d-body)]">{lead}</p>
                      <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--d-muted)]">{demoLine}</p>
                      <button type="button" className={`${outlineBtn} mt-6`} onClick={reset}>
                        {f.reset}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={submit} noValidate className="space-y-5">
                      <div>
                        <label className={fieldLabel} htmlFor={anchor.id("name")}>
                          {f.name}
                        </label>
                        <input
                          id={anchor.id("name")}
                          className={field}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={f.namePlaceholder}
                          autoComplete="name"
                          aria-invalid={problem.includes("name") || undefined}
                        />
                      </div>
                      <div className="grid gap-5 @xl:grid-cols-2">
                        <div>
                          <label className={fieldLabel} htmlFor={anchor.id("tel")}>
                            {f.phone}
                          </label>
                          <input
                            id={anchor.id("tel")}
                            className={field}
                            type="tel"
                            inputMode="tel"
                            value={phoneValue}
                            onChange={(e) => setPhoneValue(e.target.value)}
                            placeholder={f.phonePlaceholder}
                            autoComplete="tel"
                            aria-invalid={problem.includes("phone") || undefined}
                          />
                        </div>
                        <div>
                          <label className={fieldLabel} htmlFor={anchor.id("email")}>
                            {f.email}
                          </label>
                          <input
                            id={anchor.id("email")}
                            className={field}
                            type="email"
                            inputMode="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={f.emailPlaceholder}
                            autoComplete="email"
                          />
                        </div>
                      </div>
                      <div>
                        <label className={fieldLabel} htmlFor={anchor.id("job")}>
                          {f.service}
                        </label>
                        <select
                          id={anchor.id("job")}
                          className={field}
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          aria-invalid={problem.includes("service") || undefined}
                        >
                          <option value="">{f.serviceOption}</option>
                          {jobOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={fieldLabel} htmlFor={anchor.id("message")}>
                          {f.message}
                        </label>
                        <textarea
                          id={anchor.id("message")}
                          className={`${field} min-h-[120px] py-3`}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={f.messagePlaceholder}
                          rows={4}
                        />
                      </div>
                      {problem.length > 0 && (
                        <p role="alert" className="text-[14px] font-semibold text-[#96302a]">
                          Please complete: {problem.map((k) => missingLabels[k] ?? k).join(", ")}.
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4">
                        <button type="submit" className={blueBtn}>
                          {f.submit}
                          <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
                        </button>
                        <p className="text-[13px] leading-relaxed text-[var(--d-muted)]">{f.fine}</p>
                      </div>
                    </form>
                  )}
                </div>

                <div className="grid gap-4">
                  {b.contactCards.map((item, i) => {
                    const Icon = CONTACT_ICONS[i] ?? Phone;
                    return (
                      <div key={item.title} className={item.dark ? "bl-band rounded-2xl p-6" : `${card} p-6`}>
                        <h3
                          className={`flex items-center gap-2.5 font-display text-[17px] font-bold ${
                            item.dark ? "bl-ink-hi" : "text-[var(--d-fg)]"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 shrink-0 ${
                              item.dark ? "text-[#4da3ff]" : "text-[var(--d-accent)]"
                            }`}
                            aria-hidden="true"
                          />
                          {item.title}
                        </h3>
                        {item.phone &&
                          asCall(
                            "mt-2 inline-flex min-h-11 items-center font-display text-[22px] font-extrabold tracking-[-0.02em] text-[var(--d-accent-text)]",
                            phone.display,
                          )}
                        <ul className="mt-2 space-y-1.5">
                          {item.lines.map((line) => (
                            <li
                              key={line}
                              className={`text-[14.5px] leading-relaxed ${
                                item.dark ? "bl-ink" : "text-[var(--d-body)]"
                              }`}
                            >
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                  <p className="text-[13px] leading-relaxed text-[var(--d-muted)]">{b.fictionalNote}</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* --- Footer --- */}
        <footer className="bl-band">
          <div className={`${container} grid gap-9 py-14 @4xl:grid-cols-[1.3fr_0.7fr_0.9fr_0.9fr]`}>
            <div>
              <span className="flex items-center gap-3">
                <BrandMark tone="dark" />
                <Wordmark b={b.brand} tone="dark" />
              </span>
              <p className="bl-ink mt-4 max-w-[330px] text-[14.5px] leading-relaxed">{b.footer.tag}</p>
            </div>
            <div>
              <h3 className="bl-ink-hi font-display text-[15px] font-bold uppercase tracking-[0.12em]">
                {b.footer.explore}
              </h3>
              <ul className="mt-2 space-y-1">
                {navItems.map(([text, section]) => (
                  <li key={section}>
                    <button
                      type="button"
                      onClick={() => goTo(section)}
                      className="bl-ink inline-flex min-h-11 items-center text-left text-[14.5px] hover:text-white hover:underline hover:underline-offset-4"
                    >
                      {text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="bl-ink-hi font-display text-[15px] font-bold uppercase tracking-[0.12em]">
                {b.footer.servicesTitle}
              </h3>
              {/* Five of the nine, each jumping to the detail band that names it, so
                  no link here can point at a service the page does not explain. */}
              <ul className="mt-2 space-y-1">
                {[0, 1, 2, 4, 5].map((i) => details[i]).map((d) => (
                  <li key={d.title}>
                    <button
                      type="button"
                      onClick={() => goTo(`detail-${details.indexOf(d)}`)}
                      className="bl-ink inline-flex min-h-11 items-center text-left text-[14.5px] hover:text-white hover:underline hover:underline-offset-4"
                    >
                      {d.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="bl-ink-hi font-display text-[15px] font-bold uppercase tracking-[0.12em]">
                {b.footer.contactTitle}
              </h3>
              <ul className="mt-2 space-y-1.5">
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-[#4da3ff]" aria-hidden="true" />
                  {asCall(
                    "bl-ink-hi inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline",
                    phone.display,
                  )}
                </li>
                <li className="bl-ink flex items-start gap-2.5 text-[14.5px]">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#4da3ff]" aria-hidden="true" />
                  {b.footer.address}
                </li>
                <li className="bl-ink flex items-start gap-2.5 text-[14.5px]">
                  <Clock className="mt-1 h-4 w-4 shrink-0 text-[#4da3ff]" aria-hidden="true" />
                  {c.availability}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className={`${container} flex flex-wrap items-center justify-between gap-4 py-6 text-[13px]`}>
              <span className="bl-ink-lo">{b.footer.legal}</span>
              <span className="flex flex-wrap items-center gap-5">
                <DemoBadge />
                {(["privacy", "terms"] as const).map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    aria-expanded={legal === kind}
                    aria-controls={`${anchor.id("legal")}-${kind}`}
                    onClick={() => setLegal((current) => (current === kind ? null : kind))}
                    className="bl-ink-lo inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline"
                  >
                    {b.dialogs[kind].title}
                  </button>
                ))}
                <DemoBackLink />
              </span>
            </div>
            {/* A real <dialog> opens in the browser's top layer and would escape the
                device frame this concept is previewed inside, so the text is
                disclosed in place instead. */}
            {legal && (
              <div
                ref={legalRef}
                id={`${anchor.id("legal")}-${legal}`}
                tabIndex={-1}
                className="pop-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
              >
                <div className={`${container} pb-6`}>
                  <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
                    <h3 className="bl-ink-hi font-display text-[16px] font-bold">
                      {b.dialogs[legal].title}
                    </h3>
                    {b.dialogs[legal].paras.map((p) => (
                      <p key={p} className="bl-ink mt-2 text-[14px] leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className={`${container} pb-6`}>
              <p className="bl-ink-lo text-[13px] leading-relaxed">{b.footer.demo}</p>
            </div>
          </div>
        </footer>

        {/* --- Thumb bar: the two asks, reachable from any scroll position until
            the frame is wide enough for the header --- */}
        <div className="sticky bottom-0 z-30 grid grid-cols-[1.2fr_1fr] gap-2 border-t border-[var(--d-line)] bg-[var(--d-bg)]/95 p-2.5 backdrop-blur @3xl:hidden">
          {asCall(
            `${copperBtn} w-full`,
            <>
              <Phone className="h-[17px] w-[17px]" aria-hidden="true" />
              {phone.display}
            </>,
          )}
          <button type="button" className={`${outlineBtn} w-full`} onClick={() => goTo("contact")}>
            {c.ctaPrimary}
          </button>
        </div>
      </div>
    </DemoVars>
  );
}
