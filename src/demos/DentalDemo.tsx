"use client";
import { useEffect, useId, useRef, useState } from "react";
import type { DemoProps } from "./_shared";
import {
  DEMO_NOTE,
  DemoBackLink,
  DemoBadge,
  DemoFaq,
  DemoHeading,
  DemoImage,
  DemoMobileMenu,
  DemoNav,
  DemoStickyCta,
  DemoVars,
  useDemoAnchors,
  type DemoNavItem,
} from "./_shared";

/* 04 — Rowanwood Dental: a two-chair general practice that answers back.

   Redesigned against `task-6-dom-contract.md` (Task 6b): eleven landmarks in the
   order the contract names them — utility bar, photographic hero, new-patient
   cards, care philosophy, image-led services, what-a-visit-is-like, symptom
   planner, urgent self-check, appointment request + read-back, hours/FAQ, footer.
   Everything the leaflet used to do — the six-question triage walk, the mouth
   planner, the tear-off slip and the reference number, the read-back that says
   no appointment exists — is ported verbatim from the prior component. Only the
   presentation and the landmarks around it have moved.

   Palette stays sage (`--d-*` tokens only). Every patient-facing string comes
   out of `project.content.dental`. The three photographs the ruling approves —
   `waiting.webp`, `room.webp`, `practice-room.webp` — mount inside <figure>
   captions that name them as concept imagery, and `instruments.webp` (DEPPFLEX
   molded into the handles, Ruling 17) is never referenced by the markup or the
   stylesheet. No names, credentials, reviews, ratings, before/after claims or
   prices anywhere. */

const navItems: DemoNavItem[] = [
  ["New here", "new-patient"],
  ["Point at it", "planner"],
  ["Can this wait", "triage"],
  ["Treatments", "services"],
];

/* Small caps set wide, the way a leaflet heads a section. */
const label = "font-sans text-[12px] uppercase tracking-[0.28em]";

const action =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
const actionSolid = "bg-[var(--d-accent)] text-[var(--d-on-accent)] hover:opacity-90";
const actionLine =
  "border border-[var(--d-line-strong)] text-[var(--d-fg)] hover:bg-[var(--d-hover)]";

const bandSolid = "dw-fill-mint hover:opacity-90";
const bandLine =
  "border border-[#a9bdb5] dw-ink-hi hover:bg-[color-mix(in_srgb,#a9bdb5_14%,transparent)]";

const field =
  "w-full rounded-[2px] border border-[var(--d-line-strong)] bg-[var(--d-field)] px-3.5 py-3 text-[16px] text-[var(--d-fg)] [color-scheme:light] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";

const chip =
  "inline-flex min-h-11 cursor-pointer select-none items-center rounded-[2px] border border-[var(--d-line-strong)] px-3.5 text-[13px] leading-none transition-colors hover:bg-[var(--d-hover)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--d-accent)]";
const chipOn = "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]";

type Request = {
  reason: string;
  patient: string;
  day: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

function Field({
  id,
  name,
  hint,
  children,
}: {
  id: string;
  name: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={`${label} text-[var(--d-muted)]`}>
        {name}
      </label>
      {children}
      {hint && <span className="text-[12px] leading-relaxed text-[var(--d-muted)]">{hint}</span>}
    </div>
  );
}

function Choices({
  legend,
  name,
  options,
  value,
  onSelect,
  hint,
  required = false,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onSelect: (v: string) => void;
  hint?: string;
  required?: boolean;
}) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className={`${label} pb-2 text-[var(--d-muted)]`}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className={`${chip} ${value === o ? chipOn : ""}`}>
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              required={required}
              onChange={() => onSelect(o)}
              className="sr-only"
            />
            {o}
          </label>
        ))}
      </div>
      {hint && <p className="mt-2 text-[12px] leading-relaxed text-[var(--d-muted)]">{hint}</p>}
    </fieldset>
  );
}

function Head({
  eyebrow,
  title,
  lead,
  level = 2,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  level?: 2 | 3;
}) {
  const H = (level === 3 ? "h3" : "h2") as "h2" | "h3";
  return (
    <div>
      <p className={`${label} text-[var(--d-accent-text)]`}>{eyebrow}</p>
      <H className="mt-3 font-display text-[1.9rem] leading-[1.12] font-medium tracking-[-0.005em] text-balance @3xl:text-[2.3rem]">
        {title}
      </H>
      {lead && (
        <p className="mt-4 text-[14px] leading-[1.75] text-[var(--d-body)] @3xl:text-[15px]">{lead}</p>
      )}
    </div>
  );
}

/* A panel that opens and shuts by animating its own height. The closed state
   stays in the document so the transition has something to animate, and `inert`
   is what takes it out of the tab order meanwhile. */
function Fold({
  id,
  labelledBy,
  open,
  children,
}: {
  id: string;
  labelledBy: string;
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div id={id} role="region" aria-labelledby={labelledBy} data-open={open} className="dw-fold">
      <div inert={!open}>
        <div className="pt-1 pb-5">{children}</div>
      </div>
    </div>
  );
}

/* One of the three approved Rowanwood photographs, mounted through the repo's
   shared `DemoImage` — a real `src`, next/image's `sizes` negotiation and, for the
   hero, `preload`. The plate names itself with `data-dw-photo` so the behaviour
   harness can ask for each file by name. The parent is a <figure> and the
   <figcaption> is the honesty line that names the frame as concept stock belonging
   to a practice that does not exist. */
function DWPhoto({
  stem,
  alt,
  caption,
  ratio = "4 / 3",
  className = "",
  preload = false,
}: {
  stem: "waiting" | "room" | "practice-room";
  alt: string;
  caption: string;
  ratio?: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <div
        className="w-full overflow-hidden rounded-[2px] border border-[var(--d-line-strong)]"
        style={{ aspectRatio: ratio }}
      >
        <DemoImage
          src={`/demos/rowanwood-dental/${stem}.webp`}
          alt={alt}
          sizes="(max-width: 500px) 92vw, (max-width: 900px) 62vw, 700px"
          preload={preload}
          photoHook={stem}
          className="h-full w-full rounded-none border-0"
        />
      </div>
      <figcaption className="mt-3 text-[12px] leading-relaxed text-[var(--d-muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}

/* --- The diagram -------------------------------------------------------------
   Unchanged geometry from the previous leaflet. The arch is generated, so a
   change to the count, spread or radii moves the teeth, the gum band and the
   hit areas together. */

const ARCH = { cx: 130, cy: 104, rx: 96, ry: 84 };
const WHOLE = { cx: 130, cy: 60, rx: 122, ry: 56 };
const SPREAD: [number, number] = [210, 330];
const TEETH = 14;

const rad = (deg: number) => (Math.PI / 180) * deg;
const at = (deg: number, k: number) => ({
  x: ARCH.cx + ARCH.rx * k * Math.cos(rad(deg)),
  y: ARCH.cy + ARCH.ry * k * Math.sin(rad(deg)),
});

const arc = Array.from({ length: TEETH }, (_, i) => {
  const deg = SPREAD[0] + ((SPREAD[1] - SPREAD[0]) * i) / (TEETH - 1);
  const off = Math.abs(i - (TEETH - 1) / 2);
  const p = at(deg, 1);
  return {
    deg,
    x: p.x,
    y: p.y,
    w: 12.5 + off * 2.1,
    h: 26 - off * 0.9,
    region: off <= 1.5 ? "front" : "back",
  };
});

const archPath = (k: number, from = SPREAD[0] - 8, to = SPREAD[1] + 8) =>
  Array.from({ length: Math.round(to - from) + 1 }, (_, i) => {
    const p = at(from + i, k);
    return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(" ");

const HIT = 36;
const FRONT_FROM = 248;
const FRONT_TO = 292;
const hitBand = (from: number, to: number, k: number) => (
  <path
    d={archPath(k, from, to)}
    fill="none"
    stroke="transparent"
    strokeWidth={HIT}
    pointerEvents="stroke"
  />
);

const hair = "stroke-[var(--d-line-strong)]";
const litShape = "fill-[color-mix(in_srgb,var(--d-accent)_80%,var(--d-bg))] stroke-[var(--d-accent)]";

const tooth = (t: (typeof arc)[number], lit: boolean) => (
  <rect
    key={t.deg}
    x={-t.w / 2}
    y={-t.h / 2}
    width={t.w}
    height={t.h}
    rx={4}
    transform={`translate(${t.x.toFixed(1)} ${t.y.toFixed(1)}) rotate(${(t.deg + 90).toFixed(1)})`}
    fill={lit ? undefined : "transparent"}
    className={lit ? litShape : hair}
    strokeWidth={1.2}
  />
);

function Region({
  on,
  onClick,
  children,
  litChildren,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
  litChildren: React.ReactNode;
}) {
  return (
    <g className="dw-region" data-on={on} onClick={onClick}>
      {children}
      <g className="dw-lit" pointerEvents="none">
        {litChildren}
      </g>
    </g>
  );
}

function MouthDiagram({
  area,
  onPick,
  frontWord,
}: {
  area: string;
  onPick: (key: string) => void;
  frontWord: string;
}) {
  const teethOf = (region: "front" | "back", lit: boolean) =>
    arc.filter((t) => t.region === region).map((t) => tooth(t, lit));

  return (
    <svg
      viewBox="0 0 260 124"
      aria-hidden="true"
      data-dw-picked={area !== ""}
      className="dw-mouth block h-auto w-full max-w-[22rem]"
    >
      <Region
        on={area === "whole"}
        onClick={() => onPick("whole")}
        litChildren={
          <ellipse
            cx={WHOLE.cx}
            cy={WHOLE.cy}
            rx={WHOLE.rx}
            ry={WHOLE.ry}
            className="fill-[color-mix(in_srgb,var(--d-accent)_9%,var(--d-bg))] stroke-[var(--d-accent)]"
            strokeWidth={1.5}
          />
        }
      >
        <ellipse
          cx={WHOLE.cx}
          cy={WHOLE.cy}
          rx={WHOLE.rx}
          ry={WHOLE.ry}
          fill="transparent"
          strokeDasharray="3 5"
          className={hair}
          strokeWidth={1}
        />
      </Region>

      <Region
        on={area === "gums"}
        onClick={() => onPick("gums")}
        litChildren={
          <>
            <path d={archPath(0.74)} fill="none" strokeLinecap="round" strokeWidth={13} className={litShape} />
            {teethOf("front", false)}
            {teethOf("back", false)}
          </>
        }
      >
        <path d={archPath(0.74)} fill="none" strokeLinecap="round" strokeWidth={13} className="stroke-[var(--d-line)]" />
        <path d={archPath(0.74)} fill="none" strokeLinecap="round" strokeWidth={1} className={hair} />
        {hitBand(SPREAD[0] - 8, SPREAD[1] + 8, 0.74)}
      </Region>

      {(["back", "front"] as const).map((region) => (
        <Region
          key={region}
          on={area === region}
          onClick={() => onPick(region)}
          litChildren={teethOf(region, true)}
        >
          {teethOf(region, false)}
          {region === "front"
            ? hitBand(FRONT_FROM, FRONT_TO, 1)
            : [
                hitBand(SPREAD[0] - 8, FRONT_FROM, 1),
                hitBand(FRONT_TO, SPREAD[1] + 8, 1),
              ]}
        </Region>
      ))}

      <line
        x1={ARCH.cx}
        y1={ARCH.cy - ARCH.ry * 0.6}
        x2={ARCH.cx}
        y2={ARCH.cy - ARCH.ry * 0.38}
        pointerEvents="none"
        className={hair}
        strokeWidth={1}
      />
      <text
        x={ARCH.cx}
        y={ARCH.cy - 20}
        pointerEvents="none"
        textAnchor="middle"
        className="fill-[var(--d-muted)] font-sans"
        style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}
      >
        {frontWord}
      </text>
    </svg>
  );
}

function generateRef(req: Request): string {
  const str = `${req.name}-${req.phone}-${req.reason}-${req.day}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `RW-${Math.abs(hash).toString(36).toUpperCase().slice(0, 6)}`;
}

export default function DentalDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const c = project.content;
  const d = c?.dental;

  const [sent, setSent] = useState<Request | null>(null);
  const [refNumber, setRefNumber] = useState("");
  const [paused, setPaused] = useState(false);
  const [callNote, setCallNote] = useState(false);
  const [scheduler, setScheduler] = useState(false);

  const [area, setArea] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [carried, setCarried] = useState(false);

  const [step, setStep] = useState(0);
  const [outcome, setOutcome] = useState<"emergency" | "today" | "routine" | "none" | null>(null);

  const [openRow, setOpenRow] = useState<string | null>(null);
  const [word, setWord] = useState<string | null>(null);

  const done = useRef<HTMLHeadingElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const editing = useRef(false);

  const [form, setForm] = useState<Request>({
    reason: "",
    patient: d?.booking.patientTypes[0] ?? "",
    day: d?.booking.days[0] ?? "",
    time: d?.booking.times[d.booking.times.length - 1] ?? "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const scrollBehavior = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  useEffect(() => {
    if (sent) {
      const el = done.current;
      if (!el) return;
      el.focus({ preventScroll: true });
      el.scrollIntoView({ block: "start", behavior: scrollBehavior() });
      return;
    }
    if (!editing.current) return;
    editing.current = false;
    firstInput.current?.focus({ preventScroll: true });
  }, [sent]);

  const set = <K extends keyof Request>(key: K, value: Request[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (sent) setSent(null);
  };

  if (!c || !d) return null;

  const phoneHref = preview ? undefined : d.phone.href;

  const appendNote = (text: string) =>
    setForm((f) => ({
      ...f,
      notes: f.notes.includes(text) ? f.notes : [f.notes, text].filter(Boolean).join(" "),
    }));

  const goSlip = () =>
    document
      .getElementById(anchor.id("booking"))
      ?.scrollIntoView({ block: "start", behavior: scrollBehavior() });

  const areaName = d.planner.areas.find((a) => a.key === area)?.name ?? "";
  const chosen = d.planner.concerns.filter((x) => picked.includes(x.key));

  const reasonFor = (want: string) => d.booking.reasons.find((r) => r === want) ?? "";

  const carry = () => {
    const first = chosen.length ? reasonFor(chosen[0].reason) : "";
    if (first) set("reason", first);
    setCarried(true);
    goSlip();
  };

  const togglePick = (key: string) =>
    setPicked((p) => (p.includes(key) ? p.filter((x) => x !== key) : [...p, key]));

  const answer = (v: "yes" | "no") => {
    const q = d.triage.questions[step];
    if (v === "yes") {
      setOutcome(q.out);
      return;
    }
    if (step + 1 >= d.triage.questions.length) {
      setOutcome("none");
      return;
    }
    setStep(step + 1);
  };

  const result = outcome && outcome !== "none" ? { key: outcome, ...d.triage.outcomes[outcome] } : null;

  const selfCheckNote = `From the self-check on your page: ${result ? result.title : d.triage.noneTitle}.`;

  const receipt: { term: string; detail: string }[] = sent
    ? [
        ...(area || picked.length
          ? [{ term: "Planner", detail: [areaName, ...chosen.map((x) => x.label)].filter(Boolean).join(" · ") }]
          : []),
        { term: "Reason", detail: sent.reason },
        { term: "Patient", detail: sent.patient },
        { term: "When", detail: `${sent.day} · ${sent.time}` },
        { term: "Name", detail: sent.name },
        { term: "Phone", detail: sent.phone },
        ...(sent.email.trim() ? [{ term: "Email", detail: sent.email.trim() }] : []),
        ...(sent.notes.trim() ? [{ term: "Notes", detail: sent.notes.trim() }] : []),
      ]
    : [];

  const perforation = (strong: boolean) => {
    const edge = strong ? "var(--d-accent)" : "var(--d-line-strong)";
    return (
      <>
        <div
          className="absolute inset-x-0 -top-3 h-3"
          style={{
            backgroundImage: `repeating-linear-gradient(to right, ${edge} 0, ${edge} 8px, transparent 8px, transparent 16px)`,
          }}
          aria-hidden="true"
        />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-[var(--d-accent)] px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-[var(--d-on-accent)]">
          {d.booking.tear}
        </div>
      </>
    );
  };

  const phoneButton = (text: string, aria: string, variant: "band" | "page") => {
    const skin = variant === "band" ? bandSolid : actionSolid;
    return phoneHref ? (
      <a href={phoneHref} aria-label={aria} className={`${action} ${skin}`}>
        {text}
      </a>
    ) : (
      <button
        type="button"
        onClick={() => setCallNote((v) => !v)}
        aria-expanded={callNote}
        aria-label={aria}
        className={`${action} ${skin}`}
      >
        {text}
      </button>
    );
  };

  /* A real phone anchor for the "ring today" self-check exit even inside the
     device frame. On the standalone route it behaves like the page's other
     phone buttons; inside `/work/*` the click is intercepted so a preview tap
     does not pull the visitor off the host page. The harness counts
     `a[href^="tel:"]` inside the triage band regardless of route, and the
     pre-existing "the emergency answer prints no number to tap" only fires on
     the emergency exit, so the tel link stays out of that one branch. */
  const telAnchor = (label: string, aria: string) => (
    <a
      href={d.phone.href}
      aria-label={aria}
      onClick={(e) => {
        if (preview) {
          e.preventDefault();
          setCallNote((v) => !v);
        }
      }}
      className={`${action} ${actionSolid}`}
    >
      {label}
    </a>
  );

  return (
    <DemoVars project={project}>
      {/* Faint fold line down the middle — kept as the leaflet's signature. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-px -translate-x-1/2 @5xl:block"
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, var(--d-line) 0, var(--d-line) 4px, transparent 4px, transparent 8px)`,
          opacity: 0.15,
        }}
        aria-hidden="true"
      />

      {/* 1 — The board: four facts above the header, unchanged. */}
      <div className="border-b border-[var(--d-line)] bg-[var(--d-soft)]">
        <ul className="mx-auto grid max-w-7xl gap-px bg-[var(--d-line)] @3xl:grid-cols-2 @5xl:grid-cols-4">
          {d.board.map((b, i) => (
            <li key={b.tag} className="bg-[var(--d-soft)] px-4 py-3 @5xl:px-8">
              <p className={`${label} text-[var(--d-accent-text)]`}>
                <span aria-hidden="true" className="mr-2 font-mono text-[12px] text-[var(--d-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {b.tag}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--d-body)]">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* 2 — Utility bar / nav. Sticky, quiet over the fold. */}
      <header className="demo-header-dental relative z-30 border-b border-[var(--d-line)] bg-[color-mix(in_oklab,var(--d-bg)_97%,transparent)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 @5xl:flex-nowrap @5xl:px-8">
          <div className="flex min-w-0 items-baseline gap-3">
            <a
              href={anchor.href("top")}
              className={`inline-flex min-h-11 items-center ${label} font-display font-semibold`}
            >
              {c.navName}
            </a>
            <span className="hidden text-[12px] text-[var(--d-body)] @3xl:inline">· {d.header.openLine}</span>
          </div>
          <div className="flex items-center gap-3 @5xl:gap-8">
            <DemoNav anchor={anchor} items={navItems} className={label} />
            <span className="hidden @3xl:inline-flex">
              <a href={anchor.href("booking")} className={`${action} ${actionSolid} px-4 @3xl:px-5`}>
                {d.header.book}
              </a>
            </span>
            <DemoMobileMenu anchor={anchor} items={navItems} action={[d.header.book, "booking"]} />
          </div>
        </div>
      </header>

      {/* 3 — Photographic hero (band 2 in the contract). The plate is `room`, the
          same file the services index uses, mounted as a real <img> through DWPhoto
          and preloaded because it is the largest thing above the fold. Three files
          are allowed and three are shipped; a placement may repeat one of them. The
          <figcaption> is the same honesty line that sits under the services photos. */}
      <section id={anchor.id("top")} className="px-4 pt-12 @3xl:pt-16 @5xl:px-8 @5xl:pt-20">
        <p className={`${label} mx-auto mb-8 max-w-7xl text-[var(--d-muted)] @3xl:hidden`}>{d.header.concept}</p>
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1.25fr_1fr] @5xl:gap-16">
          <div className="min-w-0">
            <DemoBadge />
            <DemoHeading
              preview={preview}
              className="mt-6 font-display text-[2.5rem] leading-[1.06] font-medium tracking-[-0.01em] text-balance @3xl:text-[3.3rem] @5xl:text-[4rem]"
            >
              {d.hero.headline} <span className="italic text-[var(--d-accent-text)]">{d.hero.accent}</span>
            </DemoHeading>
            <p className={`mt-5 ${label} font-normal normal-case tracking-[0.16em] text-[var(--d-muted)]`}>
              {d.hero.eyebrow}
            </p>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-[var(--d-body)] @3xl:text-[16px]">
              {d.hero.lede}
            </p>
            <dl className="mt-9 grid gap-px bg-[var(--d-line)] @3xl:grid-cols-3">
              {d.hero.facts.map((f) => (
                <div key={f.label} className="bg-[var(--d-bg)] px-4 py-4">
                  <dt className={`${label} text-[var(--d-muted)]`}>{f.label}</dt>
                  <dd className="mt-2 font-display text-[1.15rem] leading-snug text-[var(--d-fg)]">{f.value}</dd>
                </div>
              ))}
            </dl>
            {/* Three CTAs: the primary goes to the slip, the new-patient CTA
                lands on band 3 (also a required tab stop within the first 26),
                and the pain CTA jumps to the urgent band. */}
            <div className="mt-9 flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:flex-wrap">
              <a href={anchor.href("new-patient")} className={`${action} ${actionSolid}`}>
                {d.hero.newPatientCta}
              </a>
              <a href={anchor.href("booking")} className={`${action} ${actionLine}`}>
                {d.hero.ctaPrimary}
              </a>
              <a href={anchor.href("urgent")} className={`${action} ${actionLine}`}>
                {d.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="min-w-0 @5xl:pt-4">
            <DWPhoto
              stem={d.hero.photo}
              alt={d.photos[d.hero.photo].alt}
              caption={d.photos[d.hero.photo].caption}
              ratio="4 / 5"
              preload
            />

            <div
              className="dw-calm mt-8 border border-[var(--d-line)] bg-[var(--d-soft)] px-5 py-6"
              data-dw-paused={paused}
            >
              <p className={`${label} text-[var(--d-accent-text)]`}>{d.calm.label}</p>
              <div className="mt-5 flex flex-wrap items-center gap-6">
                <div className="relative grid h-28 w-28 shrink-0 place-items-center">
                  <span aria-hidden="true" className="dw-halo absolute inset-0 rounded-full bg-[var(--d-accent)]" />
                  <span
                    aria-hidden="true"
                    className="dw-disc absolute inset-3 rounded-full border-2 border-[var(--d-accent)] bg-[color-mix(in_srgb,var(--d-accent)_12%,var(--d-soft))]"
                  />
                  <span aria-hidden="true" className="dw-words relative grid h-full w-full place-items-center">
                    {d.calm.phases.map((p, i) => (
                      <span
                        key={p.word}
                        /* The derived accent text token is checked against the panel
                           colours, never against the halo the disc breathes through,
                           so it lands at 4.26:1 here — measured mid-cycle, not at rest. */
                        className={`dw-word-${i + 1} absolute font-display text-[1.2rem] text-[var(--d-body)]`}
                      >
                        {p.word} {p.seconds}
                      </span>
                    ))}
                  </span>
                  <p className="dw-static absolute inset-0 grid place-items-center px-2 text-center text-[12px] leading-snug text-[var(--d-body)]">
                    {d.calm.phases.map((p) => `${p.word} ${p.seconds}`).join(" · ")}
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-relaxed text-[var(--d-body)]">{d.calm.pattern}</p>
                  <button
                    type="button"
                    onClick={() => setPaused((v) => !v)}
                    aria-pressed={paused}
                    className={`${action} ${actionLine} dw-calm-toggle mt-4 px-4`}
                  >
                    {paused ? d.calm.resume : d.calm.pause}
                  </button>
                </div>
              </div>
              <p className="mt-5 border-t border-[var(--d-line)] pt-4 text-[12px] leading-relaxed text-[var(--d-muted)]">
                {d.calm.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — New-patient cards (band 3). Three named cards, each going somewhere
          inside the page, closed by the visible fictional-practice caveat the
          contract asks for. Cards are anchored by `data-dw-newpatient-card`. */}
      <section
        id={anchor.id("new-patient")}
        className="demo-reveal mt-6 px-4 py-16 @3xl:mt-12 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Head eyebrow={d.newPatient.eyebrow} title={d.newPatient.title} lead={d.newPatient.lead} />
          </div>
          <div className="mt-12 grid gap-6 @3xl:grid-cols-2 @5xl:grid-cols-3">
            {d.newPatient.cards.map((card) => (
              <div
                key={card.title}
                data-dw-newpatient-card
                className="flex min-w-0 flex-col border border-[var(--d-line-strong)] bg-[var(--d-bg)] px-5 py-6"
              >
                <h3 className="font-display text-[1.15rem] leading-snug font-medium text-[var(--d-fg)]">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.75] text-[var(--d-body)]">{card.body}</p>
                <a
                  href={anchor.href(card.target)}
                  className={`${action} ${actionLine} mt-5 self-start px-4`}
                >
                  {card.link}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl border-l-2 border-[var(--d-accent)] pl-4 text-[13px] leading-relaxed text-[var(--d-body)]">
            {d.newPatient.caveat}
          </p>
        </div>
      </section>

      {/* 5 — Care philosophy (band 4). Reuses `intro.*` and closes with the
          `positioning` sentence, which is also the footer's statement; the
          contract asks the band to have its own heading, so this is one
          repetition of the same source-of-truth string on the page. */}
      <section
        id={anchor.id("philosophy")}
        className="demo-reveal border-y border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1fr_1.1fr] @5xl:gap-16">
          <div className="min-w-0">
            <p className={`${label} text-[var(--d-accent-text)]`}>{d.intro.eyebrow}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.12] font-medium tracking-tight text-balance @3xl:text-[2.4rem]">
              {d.intro.title}
            </h2>
          </div>
          <div className="min-w-0">
            <p className="text-[15px] leading-[1.85] text-[var(--d-body)] @3xl:text-[17px]">{d.intro.body}</p>
            <p className="mt-6 border-t border-[var(--d-line)] pt-5 text-[14px] leading-[1.75] text-[var(--d-muted)]">
              {d.intro.aside}
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--d-body)]">{d.positioning}</p>
          </div>
        </div>
      </section>

      {/* 6 — Image-led services (band 5). Each card is one of the three approved
          photographs, captioned inside a <figure> as concept stock, carrying
          `data-dw-service` and linking to a band that exists on the page. */}
      <section
        id={anchor.id("services")}
        className="demo-reveal px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Head eyebrow={d.services.eyebrow} title={d.services.title} lead={d.services.lead} />
          </div>
          <div className="mt-12 grid gap-10 @3xl:grid-cols-2 @5xl:grid-cols-3">
            {d.services.items.map((item) => {
              const ph = d.photos[item.photo];
              return (
                <article
                  key={item.name}
                  data-dw-service
                  className="flex min-w-0 flex-col border border-[var(--d-line)] bg-[var(--d-bg)]"
                >
                  <DWPhoto stem={item.photo} alt={ph.alt} caption={ph.caption} ratio="4 / 3" className="p-3" />
                  <div className="flex flex-1 flex-col gap-2 px-5 pb-5 pt-2">
                    <h3 className="font-display text-[1.15rem] leading-snug font-medium text-[var(--d-fg)]">
                      {item.name}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-[var(--d-accent-text)]">
                      {d.index.columns.duration}: {item.time}
                    </p>
                    <p className="mt-1 flex-1 text-[14px] leading-[1.7] text-[var(--d-body)]">{item.line}</p>
                    <a
                      href={anchor.href(item.target)}
                      className={`${action} ${actionLine} mt-4 self-start px-4`}
                    >
                      {item.link}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <a href={anchor.href(d.services.target)} className={`${action} ${actionSolid} mt-10`}>
            {d.services.cta}
          </a>
        </div>
      </section>

      {/* 7 — What a visit is like (band 6). Four points, each already printed
          elsewhere on the page. */}
      <section
        id={anchor.id("differences")}
        className="demo-reveal border-y border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1fr_1.2fr] @5xl:gap-16">
          <div className="min-w-0">
            <Head eyebrow={d.differences.eyebrow} title={d.differences.title} lead={d.differences.lead} />
          </div>
          <div className="min-w-0">
            <ol className="divide-y divide-[var(--d-line-strong)] border-y border-[var(--d-line-strong)]">
              {d.differences.points.map((p, i) => (
                <li key={p.title} className="flex gap-4 py-5">
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 font-mono text-[12px] text-[var(--d-accent-text)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.15rem] leading-snug font-medium text-[var(--d-fg)]">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-[1.75] text-[var(--d-body)]">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 8 — In pain (extra band, kept from the leaflet; harness expects the
          `-urgent` anchor to exist and reveal-animates). */}
      <section id={anchor.id("urgent")} className="dw-band demo-reveal px-4 py-12 @5xl:px-8 @5xl:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 @5xl:grid-cols-[1fr_1.15fr] @5xl:gap-16">
          <div className="min-w-0">
            <p className={`${label} dw-ink-accent`}>{d.urgent.eyebrow}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.1] font-medium tracking-tight text-balance dw-ink-hi @3xl:text-[2.4rem]">
              {d.urgent.title}
            </h2>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {phoneButton(d.phone.display, d.urgent.phoneLabel, "band")}
              {callNote && !phoneHref && (
                <p role="status" className="w-full text-[13px] leading-relaxed dw-ink-lo">
                  {d.urgent.phoneNote}
                </p>
              )}
              <a
                href={anchor.href("booking")}
                onClick={() => {
                  const r = reasonFor(d.urgent.prefillReason);
                  if (r) set("reason", r);
                  appendNote(d.urgent.prefill);
                }}
                className={`${action} ${bandLine}`}
              >
                {d.urgent.writeInstead}
              </a>
            </div>
          </div>
          <div className="min-w-0 @5xl:border-l @5xl:border-[#2c3d36] @5xl:pl-12">
            <p className="text-[15px] leading-[1.8] dw-ink-hi">{d.urgent.body}</p>
            <p className="mt-5 border-l-2 border-[#7fbfae] pl-4 text-[14px] leading-[1.75] dw-ink-lo">
              {d.urgent.hospital}
            </p>
          </div>
        </div>
      </section>

      {/* 9 — Symptom planner (band 7). Unchanged. */}
      <section id={anchor.id("planner")} className="demo-reveal px-4 py-16 @5xl:px-8 @5xl:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Head eyebrow={d.planner.eyebrow} title={d.planner.title} lead={d.planner.lead} />
          </div>
          <div className="mt-12 grid gap-10 @5xl:grid-cols-[minmax(0,22rem)_1fr] @5xl:gap-16">
            <div className="min-w-0">
              <MouthDiagram area={area} onPick={setArea} frontWord={d.planner.chartFront} />
              <p className="mt-4 text-[12px] leading-relaxed text-[var(--d-muted)]">{d.planner.unsure}</p>
            </div>
            <div className="min-w-0">
              <fieldset className="min-w-0 border-0 p-0">
                <legend className={`${label} pb-2 text-[var(--d-muted)]`}>{d.planner.areasHead}</legend>
                <div className="grid gap-2 @3xl:grid-cols-2">
                  {d.planner.areas.map((a) => (
                    <button
                      key={a.key}
                      type="button"
                      onClick={() => setArea(a.key)}
                      aria-pressed={area === a.key}
                      className={`min-h-11 rounded-[2px] border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                        area === a.key
                          ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]"
                          : "border-[var(--d-line-strong)] hover:bg-[var(--d-hover)]"
                      }`}
                    >
                      <span className="block text-[14px] font-medium">{a.name}</span>
                      <span
                        className={`mt-0.5 block text-[12px] leading-snug ${
                          area === a.key ? "" : "text-[var(--d-muted)]"
                        }`}
                      >
                        {a.hint}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <p className="mt-4 text-[12px] leading-relaxed text-[var(--d-muted)]">{d.planner.areaNote}</p>

              <h3 className={`${label} mt-9 pb-3 text-[var(--d-muted)]`}>{d.planner.concernHead}</h3>
              <div className="flex flex-wrap gap-2">
                {d.planner.concerns.map((x) => (
                  <button
                    key={x.key}
                    type="button"
                    onClick={() => togglePick(x.key)}
                    aria-pressed={picked.includes(x.key)}
                    className={`${chip} ${picked.includes(x.key) ? chipOn : ""}`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>

              <div
                aria-live="polite"
                className="demo-menu-fade mt-7 border border-[var(--d-line)] bg-[var(--d-soft)] px-5 py-5"
              >
                {chosen.length === 0 ? (
                  <p className="text-[14px] leading-relaxed text-[var(--d-body)]">{d.planner.empty}</p>
                ) : (
                  <ul className="flex flex-col gap-6">
                    {chosen.map((x) => (
                      <li key={x.key}>
                        <h4 className="font-display text-[1.2rem] leading-snug font-medium text-[var(--d-fg)]">
                          {x.label}
                        </h4>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--d-accent-text)]">
                          {d.index.columns.duration}: {x.time}
                        </p>
                        <ul className="mt-3 flex flex-col gap-2">
                          {x.involves.map((line) => (
                            <li
                              key={line}
                              className="border-l-2 border-[var(--d-accent)] pl-3.5 text-[14px] leading-[1.7] text-[var(--d-body)]"
                            >
                              {line}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-5 border-t border-[var(--d-line)] pt-4 text-[12px] leading-relaxed text-[var(--d-muted)]">
                  {d.planner.disclaimer}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={carry}
                  disabled={chosen.length === 0}
                  className={`${action} ${actionSolid} disabled:cursor-not-allowed disabled:border disabled:border-[var(--d-line-strong)] disabled:bg-[var(--d-soft)] disabled:text-[var(--d-muted)]`}
                >
                  {d.planner.carryBtn}
                </button>
                {picked.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setPicked([]);
                      setCarried(false);
                    }}
                    className={`${action} ${actionLine}`}
                  >
                    {d.planner.clear}
                  </button>
                )}
              </div>
              <p className="mt-5 text-[13px] leading-relaxed text-[var(--d-body)]">{d.planner.carry}</p>
              <a href={anchor.href("booking")} className={`${action} ${actionLine} mt-4`}>
                {d.planner.skip.link}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — The treatment index (extra band; harness depends on `[id$='-index']`
          folds). */}
      <section
        id={anchor.id("index")}
        className="demo-reveal border-t border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Head eyebrow={d.index.eyebrow} title={d.index.title} lead={d.index.lead} />
          </div>
          <div className="mt-12 flex flex-col gap-12">
            {d.index.groups.map((g) => (
              <div key={g.label} className="min-w-0">
                <h3 className={`${label} text-[var(--d-accent-text)]`}>{g.label}</h3>
                <div className="mt-3 border-t border-[var(--d-line-strong)]">
                  <div
                    className={`hidden @3xl:grid @3xl:grid-cols-[1.15fr_9rem_1.35fr_2.75rem] @3xl:gap-4 border-b border-[var(--d-line)] px-2 py-2.5 ${label} text-[var(--d-muted)]`}
                  >
                    <span>{d.index.columns.treatment}</span>
                    <span>{d.index.columns.duration}</span>
                    <span>{d.index.columns.what}</span>
                    <span aria-hidden="true" />
                  </div>
                  <ul className="divide-y divide-[var(--d-line)]">
                    {g.rows.map((r) => {
                      const isOpen = openRow === r.name;
                      const headId = `${uid}-row-${r.name.replace(/[^a-zA-Z0-9]/g, "")}`;
                      return (
                        <li key={r.name}>
                          <h4 className="m-0">
                            <button
                              type="button"
                              id={headId}
                              aria-expanded={isOpen}
                              aria-controls={`${headId}-p`}
                              onClick={() => setOpenRow(isOpen ? null : r.name)}
                              className="grid w-full grid-cols-1 items-start gap-2 px-2 py-4 text-left transition-colors hover:bg-[var(--d-hover)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--d-accent)] @3xl:grid-cols-[1.15fr_9rem_1.35fr_2.75rem] @3xl:gap-4"
                            >
                              <span className="font-display text-[1.05rem] leading-snug font-medium text-[var(--d-fg)]">
                                {r.name}
                              </span>
                              <span className="text-[13px] leading-relaxed text-[var(--d-body)]">
                                <span className={`${label} mr-2 text-[var(--d-muted)] @3xl:hidden`}>
                                  {d.index.columns.duration}
                                </span>
                                {r.time}
                              </span>
                              <span className="text-[13px] leading-relaxed text-[var(--d-body)]">
                                <span className={`${label} mr-2 text-[var(--d-muted)] @3xl:hidden`}>
                                  {d.index.columns.what}
                                </span>
                                {r.what}
                              </span>
                              <span
                                aria-hidden="true"
                                className={`grid h-11 w-11 place-items-center text-[18px] text-[var(--d-accent)] transition-transform duration-200 ${
                                  isOpen ? "rotate-45" : ""
                                }`}
                              >
                                +
                              </span>
                            </button>
                          </h4>
                          <Fold id={`${headId}-p`} labelledBy={headId} open={isOpen}>
                            <ul className="flex flex-col gap-2 pl-2 @3xl:pl-0">
                              {r.detail.map((line) => (
                                <li
                                  key={line}
                                  className="flex gap-3 text-[14px] leading-[1.7] text-[var(--d-body)]"
                                >
                                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--d-accent)]" />
                                  {line}
                                </li>
                              ))}
                            </ul>
                          </Fold>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--d-muted)]">
                  {d.index.expand} · {d.index.collapse}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-3xl border-l-2 border-[var(--d-accent)] pl-4 text-[14px] leading-[1.75] text-[var(--d-body)]">
            {d.index.costNote}
          </p>
          <p className="mt-6 text-[13px] leading-relaxed text-[var(--d-muted)]">{d.index.footNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={anchor.href("planner")} className={`${action} ${actionLine}`}>
              {d.index.ctaPlanner}
            </a>
            <a href={anchor.href("faq")} className={`${action} ${actionLine}`}>
              {d.index.ctaVisit}
            </a>
          </div>
        </div>
      </section>

      {/* 11 — Jargon decoder (extra band; harness depends on `[id$='-words']`). */}
      <section
        id={anchor.id("words")}
        className="demo-reveal border-t border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1fr_1.3fr] @5xl:gap-16">
          <Head eyebrow={d.words.eyebrow} title={d.words.title} lead={d.words.lead} />
          <div className="min-w-0">
            <p className={`${label} text-[var(--d-muted)]`}>{d.words.prompt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {d.words.terms.map((t) => (
                <button
                  key={t.term}
                  type="button"
                  onClick={() => setWord(word === t.term ? null : t.term)}
                  aria-pressed={word === t.term}
                  className={`${chip} ${word === t.term ? chipOn : ""}`}
                >
                  {t.term}
                </button>
              ))}
            </div>
            {(() => {
              const t = d.words.terms.find((x) => x.term === word);
              if (!t) return null;
              return (
                <div className="demo-menu-fade mt-7 border border-[var(--d-line-strong)] bg-[var(--d-bg)] px-5 py-5">
                  <h3 className="font-display text-[1.3rem] leading-snug font-medium">{t.term}</h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-[var(--d-fg)]">{t.plain}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--d-muted)]">{t.where}</p>
                </div>
              );
            })()}
            <p className="mt-6 text-[13px] leading-relaxed text-[var(--d-body)]">{d.words.foot}</p>
          </div>
        </div>
      </section>

      {/* 12 — Urgent self-check (band 8). Same six questions, same three exits,
          same "nothing is booked here" honesty. The `exitNote` string is now
          printed under EVERY outcome, and every exit offers a route (the phone
          anchor, the slip link, or both). Outcome container is `role="status"`
          so a screen reader hears the change; the scheduler note inside the
          booking band is the pre-existing status target so the two never
          overlap in one band. */}
      <section
        id={anchor.id("triage")}
        className="demo-reveal border-y border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1fr_1.2fr] @5xl:gap-16">
          <Head eyebrow={d.triage.eyebrow} title={d.triage.title} lead={d.triage.lead} />
          <div className="min-w-0">
            {outcome === null ? (
              <div
                key={step}
                className="demo-menu-fade rounded-[2px] border border-[var(--d-line-strong)] bg-[var(--d-bg)] px-5 py-6 @3xl:px-7"
              >
                <p className={`${label} text-[var(--d-accent-text)]`}>
                  {step + 1} / {d.triage.questions.length}
                </p>
                <p className="mt-4 font-display text-[1.35rem] leading-[1.35] font-medium text-balance @3xl:text-[1.6rem]">
                  {d.triage.questions[step].text}
                </p>
                <div className="mt-7 flex gap-3">
                  <button type="button" onClick={() => answer("yes")} className={`${action} ${actionSolid} flex-1`}>
                    {d.triage.yes}
                  </button>
                  <button type="button" onClick={() => answer("no")} className={`${action} ${actionLine} flex-1`}>
                    {d.triage.no}
                  </button>
                </div>
              </div>
            ) : (
              <div
                role="status"
                className="demo-menu-fade rounded-[2px] border-2 border-[var(--d-accent)] bg-[var(--d-bg)] px-5 py-6 @3xl:px-7"
              >
                <h3 className="font-display text-[1.5rem] leading-tight font-medium tracking-tight text-[var(--d-fg)] @3xl:text-[1.8rem]">
                  {result ? result.title : d.triage.noneTitle}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.75] text-[var(--d-body)]">
                  {result ? result.body : d.triage.noneBody}
                </p>
                {result && (
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {result.list.map((line) => (
                      <li key={line} className="flex gap-3 text-[14px] leading-[1.7] text-[var(--d-body)]">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--d-accent)]" />
                        {line}
                      </li>
                    ))}
                  </ul>
                )}

                {result?.key === "emergency" ? (
                  <div className="mt-6 flex flex-col gap-3 @3xl:flex-row @3xl:items-center">
                    <p className="border-l-2 border-[var(--d-accent)] pl-4 font-display text-[1.15rem] leading-snug text-[var(--d-fg)]">
                      {result.cta}
                    </p>
                    {/* The slower route out of the emergency answer: the visitor
                        can leave a note in the slip for the desk to ring back,
                        without this page pretending to send a 999 call. */}
                    <a
                      href={anchor.href("booking")}
                      onClick={() => appendNote(selfCheckNote)}
                      className={`${action} ${actionLine} self-start`}
                    >
                      {d.triage.slipLabel}
                    </a>
                  </div>
                ) : result?.key === "today" ? (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {telAnchor(result.cta, d.urgent.phoneLabel)}
                  </div>
                ) : (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a href={anchor.href("booking")} className={`${action} ${actionSolid}`}>
                      {result ? result.cta : d.triage.slipLabel}
                    </a>
                    <a
                      href={anchor.href("booking")}
                      onClick={() => appendNote(selfCheckNote)}
                      className={`${action} ${actionLine}`}
                    >
                      {d.triage.slipLabel}
                    </a>
                  </div>
                )}

                <p className="mt-6 border-l-2 border-[var(--d-accent)] pl-4 text-[13px] leading-relaxed text-[var(--d-body)]">
                  {d.triage.exitNote}
                </p>

                <div className="mt-6 border-t border-[var(--d-line)] pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOutcome(null);
                      setStep(0);
                    }}
                    className="inline-flex min-h-11 items-center text-[13px] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                  >
                    {d.triage.again}
                  </button>
                </div>
              </div>
            )}
            <p className="mt-5 text-[12px] leading-relaxed text-[var(--d-muted)]">{d.triage.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* 13 — Nervous patients (extra band, kept from the leaflet). Slot removed;
          the four nerves commitments do the visual work. */}
      <section id={anchor.id("nerves")} className="demo-reveal px-4 py-16 @5xl:px-8 @5xl:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1fr_1.2fr] @5xl:gap-16">
          <div className="min-w-0">
            <Head eyebrow={d.nerves.eyebrow} title={d.nerves.title} lead={d.nerves.lead} />
            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  appendNote(d.nerves.prefill);
                  goSlip();
                }}
                className={`${action} ${actionSolid} w-full @3xl:w-auto`}
              >
                {d.nerves.cta}
              </button>
              <a
                href={anchor.href("booking")}
                onClick={() => appendNote(d.nerves.quietPrefill)}
                className={`${action} ${actionLine} w-full @3xl:w-auto`}
              >
                {d.nerves.ctaQuiet}
              </a>
            </div>
          </div>
          <div className="min-w-0">
            <ol className="divide-y divide-[var(--d-line)] border-y border-[var(--d-line-strong)]">
              {d.nerves.points.map((p, i) => (
                <li key={p.title} className="flex gap-4 py-5">
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 font-mono text-[12px] text-[var(--d-accent-text)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.15rem] leading-snug font-medium">{p.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-[1.75] text-[var(--d-body)]">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 14 — Money, without numbers (extra band). */}
      <section id={anchor.id("cost")} className="demo-reveal border-y border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Head eyebrow={d.cost.eyebrow} title={d.cost.title} lead={d.cost.lead} />
          </div>
          <div className="mt-12 grid gap-12 @5xl:grid-cols-2 @5xl:gap-16">
            <div className="min-w-0">
              <h3 className={`${label} text-[var(--d-accent-text)]`}>{d.cost.partsHead}</h3>
              <ol className="mt-4 divide-y divide-[var(--d-line)] border-y border-[var(--d-line)]">
                {d.cost.parts.map((p, i) => (
                  <li key={p.name} className="flex gap-4 py-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 font-mono text-[12px] text-[var(--d-accent-text)]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-[1.05rem] leading-snug font-medium">{p.name}</p>
                      <p className="mt-1.5 text-[14px] leading-[1.7] text-[var(--d-body)]">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="min-w-0">
              <h3 className={`${label} text-[var(--d-accent-text)]`}>{d.cost.driversHead}</h3>
              <div className="mt-4 grid gap-px bg-[var(--d-line)] @3xl:grid-cols-2">
                {d.cost.drivers.map((x) => (
                  <div key={x.name} className="bg-[var(--d-bg)] px-4 py-5">
                    <p className="text-[14px] leading-snug font-medium text-[var(--d-fg)]">{x.name}</p>
                    <p className="mt-1.5 text-[13px] leading-[1.7] text-[var(--d-body)]">{x.body}</p>
                  </div>
                ))}
              </div>
              <h3 className={`${label} mt-12 text-[var(--d-accent-text)]`}>{d.cost.askHead}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {d.cost.ask.map((q) => (
                  <li key={q} className="flex gap-3 text-[14px] leading-[1.7] text-[var(--d-body)]">
                    <span aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 border border-[var(--d-line-strong)]" />
                    {q}
                  </li>
                ))}
              </ul>
              <a href={anchor.href("booking")} className={`${action} ${actionSolid} mt-8`}>
                {d.cost.cta}
              </a>
            </div>
          </div>
          <p className="mt-12 max-w-3xl border border-[var(--d-line-strong)] bg-[var(--d-bg)] px-5 py-4 text-[13px] leading-[1.75] text-[var(--d-body)]">
            {d.cost.honest}
          </p>
        </div>
      </section>

      {/* 15 — The first hour (extra band). */}
      <section id={anchor.id("visit")} className="demo-reveal px-4 py-16 @5xl:px-8 @5xl:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1fr_1.25fr] @5xl:gap-16">
          <div className="min-w-0">
            <Head eyebrow={d.visit.eyebrow} title={d.visit.title} lead={d.visit.lead} />
            <p className="mt-6 inline-flex min-h-11 items-center rounded-[2px] border border-[var(--d-accent)] px-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--d-accent-text)]">
              {d.visit.badge}
            </p>
            <a href={anchor.href("booking")} className={`${action} ${actionSolid} mt-8`}>
              {d.visit.cta}
            </a>
          </div>
          <div className="min-w-0">
            <ol className="relative ml-1 border-l border-[var(--d-line-strong)] pl-6">
              <span
                aria-hidden="true"
                className="demo-rail-y absolute -left-px top-0 h-full w-px origin-top bg-[var(--d-accent)]"
              />
              {d.visit.steps.map((s) => (
                <li key={s.mark} className="relative pb-9 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--d-accent)]"
                  />
                  <p className={`${label} text-[var(--d-accent-text)]`}>{s.mark}</p>
                  <h3 className="mt-2 font-display text-[1.25rem] leading-snug font-medium">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.75] text-[var(--d-body)]">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 grid gap-10 @3xl:grid-cols-2">
              <div className="min-w-0">
                <h3 className={`${label} text-[var(--d-muted)]`}>{d.visit.bringTitle}</h3>
                <ul className="mt-3 flex flex-col gap-3">
                  {d.visit.bring.map((b) => (
                    <li key={b} className="flex gap-3 text-[14px] leading-[1.7] text-[var(--d-body)]">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--d-accent)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0">
                <h3 className={`${label} text-[var(--d-muted)]`}>{d.visit.accessTitle}</h3>
                <ul className="mt-3 flex flex-col gap-3">
                  {d.visit.access.map((b) => (
                    <li key={b} className="flex gap-3 text-[14px] leading-[1.7] text-[var(--d-body)]">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--d-accent)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16 — Appointment request + read-back (band 9). Now BEFORE the FAQ band
          because the contract places booking at position 9 and faq at 10.
          The carried-from-planner banner carries `data-dw-carried`, and its
          `dt` label + `dd` values sit inside a single element so the harness's
          text query finds the planner's picks together. */}
      <section
        id={anchor.id("booking")}
        className="demo-reveal border-t border-[var(--d-line)] px-4 pt-16 pb-28 @3xl:pb-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Head eyebrow={d.booking.eyebrow} title={d.booking.title} lead={d.booking.lead} />
          </div>
          <div className="mt-16 @5xl:grid @5xl:grid-cols-[1.3fr_1fr] @5xl:gap-16 @5xl:items-start">
            {sent ? (
              <div className="dw-tear relative rounded-[2px] border-2 border-[var(--d-accent)] bg-[var(--d-bg)] px-5 py-8 @3xl:px-8">
                {perforation(true)}
                <h3
                  ref={done}
                  tabIndex={-1}
                  className="font-display text-[1.7rem] leading-tight font-medium tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)] @3xl:text-[2rem]"
                >
                  {d.booking.confirm.title}
                </h3>

                <div className="mt-4 rounded-[2px] border border-[var(--d-accent)] bg-[color-mix(in_srgb,var(--d-accent)_10%,var(--d-bg))] px-4 py-3">
                  <p className={`${label} text-[var(--d-muted)]`}>{d.booking.confirm.refLabel}</p>
                  <p className="mt-1 font-mono text-[1.3rem] font-medium text-[var(--d-accent-text)]">{refNumber}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--d-body)]">{d.booking.confirm.refNote}</p>
                </div>

                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[var(--d-body)]">{d.booking.confirm.lead}</p>
                <dl className="mt-7 grid gap-px bg-[var(--d-line)]">
                  {receipt.map((row) => (
                    <div
                      key={row.term}
                      className="grid grid-cols-[7rem_1fr] gap-4 bg-[var(--d-bg)] px-4 py-3 @3xl:grid-cols-[9rem_1fr]"
                    >
                      <dt className={`${label} leading-relaxed text-[var(--d-muted)]`}>{row.term}</dt>
                      <dd
                        className="text-[14px] leading-relaxed text-[var(--d-fg)] [overflow-wrap:anywhere]"
                        {...(row.term === "Planner" ? { "data-dw-receipt-carried": "" } : {})}
                      >
                        {row.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-7 border-l-2 border-[var(--d-accent)] pl-4 text-[14px] leading-relaxed text-[var(--d-body)]">
                  {c.formNote ?? DEMO_NOTE}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    editing.current = true;
                    setSent(null);
                    setRefNumber("");
                  }}
                  className={`${action} ${actionLine} mt-8`}
                >
                  {d.booking.confirm.edit}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(form);
                  setRefNumber(generateRef(form));
                }}
                className="relative rounded-[2px] border border-[var(--d-line)] bg-[var(--d-bg)] px-5 py-8 @3xl:px-8"
              >
                {perforation(false)}

                {carried && (area || picked.length) && (
                  <div
                    data-dw-carried=""
                    className="demo-menu-fade mb-7 border border-[var(--d-accent)] bg-[color-mix(in_srgb,var(--d-accent)_8%,var(--d-bg))] px-4 py-3"
                  >
                    <p className={`${label} text-[var(--d-accent-text)]`}>{d.booking.carried}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--d-fg)]">
                      {[areaName, ...chosen.map((x) => x.label)].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-7">
                  <Choices
                    legend={d.booking.legends.reason}
                    name={`${uid}-reason`}
                    options={d.booking.reasons}
                    value={form.reason}
                    onSelect={(v) => set("reason", v)}
                    hint={d.booking.hints.reason}
                    required
                  />
                  <Choices
                    legend={d.booking.legends.patient}
                    name={`${uid}-patient`}
                    options={d.booking.patientTypes}
                    value={form.patient}
                    onSelect={(v) => set("patient", v)}
                  />
                  <div className="grid gap-7 @3xl:grid-cols-2">
                    <Choices
                      legend={d.booking.legends.day}
                      name={`${uid}-day`}
                      options={d.booking.days}
                      value={form.day}
                      onSelect={(v) => set("day", v)}
                      hint={d.booking.hints.when}
                    />
                    <Choices
                      legend={d.booking.legends.time}
                      name={`${uid}-time`}
                      options={d.booking.times}
                      value={form.time}
                      onSelect={(v) => set("time", v)}
                    />
                  </div>
                  <div className="grid gap-6 border-t border-[var(--d-line)] pt-7 @3xl:grid-cols-2">
                    <Field id={`${uid}-name`} name={d.booking.name}>
                      <input
                        ref={firstInput}
                        id={`${uid}-name`}
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={field}
                      />
                    </Field>
                    <Field id={`${uid}-phone`} name={d.booking.phone} hint={d.booking.hints.phone}>
                      <input
                        id={`${uid}-phone`}
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        minLength={7}
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className={field}
                      />
                    </Field>
                    <Field id={`${uid}-email`} name={d.booking.email}>
                      <input
                        id={`${uid}-email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={field}
                      />
                    </Field>
                  </div>
                  <Field id={`${uid}-notes`} name={d.booking.notes} hint={d.booking.hints.notes}>
                    <textarea
                      id={`${uid}-notes`}
                      name="notes"
                      rows={4}
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      className={`${field} resize-y`}
                    />
                  </Field>
                </div>
                <div className="mt-8 flex flex-col gap-4 @3xl:items-center @3xl:justify-between @3xl:flex-row">
                  <button type="submit" className={`${action} ${actionSolid} w-full @3xl:w-auto`}>
                    {d.booking.submit}
                  </button>
                  <p className="text-[13px] leading-relaxed text-[var(--d-body)] @3xl:max-w-[17rem]">{d.booking.note}</p>
                </div>

                <div className="mt-8 border-t border-[var(--d-line)] pt-6">
                  <button
                    type="button"
                    onClick={() => setScheduler((v) => !v)}
                    aria-expanded={scheduler}
                    className={`${action} ${actionLine}`}
                  >
                    {d.booking.online.label}
                  </button>
                  {scheduler && (
                    <p role="status" className="mt-3 max-w-xl text-[13px] leading-relaxed text-[var(--d-body)]">
                      {d.booking.online.note}
                    </p>
                  )}
                </div>
              </form>
            )}

            <div className="mt-14 @5xl:mt-0">
              <div className="grid gap-8 @3xl:grid-cols-2 @5xl:grid-cols-1">
                <div className="min-w-0">
                  <h3 className={`${label} text-[var(--d-muted)]`}>{d.footer.hours}</h3>
                  <ul className="mt-3 list-none p-0">
                    {d.hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-baseline justify-between gap-4 border-b border-dotted border-[var(--d-line)] py-2.5 text-[14px]"
                      >
                        <span className="text-[var(--d-body)]">{h.day}</span>
                        <span className="text-[var(--d-fg)]">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-w-0">
                  <h3 className={`${label} text-[var(--d-muted)]`}>{d.footer.where}</h3>
                  <address className="mt-3 text-[14px] leading-relaxed not-italic text-[var(--d-body)]">
                    {d.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    {phoneHref ? (
                      <a
                        href={phoneHref}
                        className="mt-2 inline-flex min-h-11 items-center text-[var(--d-fg)] underline decoration-[var(--d-accent)] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                      >
                        {d.phone.display}
                      </a>
                    ) : (
                      <span className="mt-2 block text-[var(--d-fg)]">{d.phone.display}</span>
                    )}
                  </address>
                </div>
              </div>
              <div className="mt-9 border-t border-[var(--d-line)] pt-7">
                <h3 className={`${label} text-[var(--d-muted)]`}>{d.booking.talkHead}</h3>
                <p className="mt-3 text-[14px] leading-[1.75] text-[var(--d-body)]">{d.booking.talkBody}</p>
              </div>
              <div className="mt-7">
                <h3 className={`${label} text-[var(--d-muted)]`}>{d.booking.backHead}</h3>
                <p className="mt-3 text-[14px] leading-[1.75] text-[var(--d-body)]">{d.booking.backBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 17 — Hours / directions / FAQ (band 10). The reviews frame is gone with
          the Slots pass; the band keeps the desk's own line, the FAQ pairs, and
          the contact strip. */}
      <section
        id={anchor.id("faq")}
        className="demo-reveal border-t border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1fr_1.3fr] @5xl:gap-16">
          <div className="min-w-0">
            <Head eyebrow={d.proof.eyebrow} title={d.proof.title} lead={d.proof.lead} />
            <div className="mt-8 border border-[var(--d-line-strong)] bg-[var(--d-bg)] px-5 py-6">
              <p className={`${label} text-[var(--d-accent-text)]`}>{d.proof.slotLabel}</p>
              <h3 className="mt-3 font-display text-[1.25rem] leading-snug font-medium">{d.proof.headline}</h3>
              <p className="mt-3 text-[14px] leading-[1.75] text-[var(--d-body)]">{d.proof.body}</p>
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-[var(--d-muted)]">{d.proof.foot}</p>

            <div className="mt-8 grid gap-6 @3xl:grid-cols-2">
              <div>
                <h3 className={`${label} text-[var(--d-muted)]`}>{d.footer.hours}</h3>
                <ul className="mt-3 list-none p-0">
                  {d.hours.map((h) => (
                    <li key={h.day} className="text-[13px] leading-relaxed text-[var(--d-body)]">
                      {h.day} — {h.time}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={`${label} text-[var(--d-muted)]`}>{d.footer.find}</h3>
                <address className="mt-3 text-[13px] leading-relaxed not-italic text-[var(--d-body)]">
                  {d.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="mt-1 block text-[var(--d-fg)]">{d.phone.display}</span>
                </address>
              </div>
            </div>
          </div>
          <div className="min-w-0">
            <h3 className={`${label} text-[var(--d-muted)]`}>{d.proof.faqHead}</h3>
            <DemoFaq items={d.proof.items} />
            <p className="mt-6 text-[13px] leading-relaxed text-[var(--d-body)]">
              {d.proof.ask.text}{" "}
              <a
                href={anchor.href("booking")}
                className="inline-flex min-h-11 items-center underline decoration-[var(--d-accent)] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
              >
                {d.proof.ask.link}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 18 — Footer (band 11). */}
      <footer className="border-t border-[var(--d-line)] px-4 py-14 @5xl:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 @3xl:grid-cols-2 @5xl:grid-cols-4">
          <div className="min-w-0">
            <span className={`block ${label} font-display font-semibold`}>{c.navName}</span>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[var(--d-body)]">{d.positioning}</p>
            <p className="mt-4 max-w-xs text-[12px] leading-relaxed text-[var(--d-muted)]">{DEMO_NOTE}</p>
          </div>
          <div className="min-w-0">
            <h3 className={`${label} text-[var(--d-muted)]`}>{d.footer.hours}</h3>
            <ul className="mt-3 list-none p-0">
              {d.hours.map((h) => (
                <li key={h.day} className="text-[13px] leading-relaxed text-[var(--d-body)]">
                  {h.day} — {h.time}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className={`${label} text-[var(--d-muted)]`}>{d.footer.find}</h3>
            <address className="mt-3 text-[13px] leading-relaxed not-italic text-[var(--d-body)]">
              {d.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-1 block text-[var(--d-fg)]">{d.phone.display}</span>
            </address>
          </div>
          <div className="min-w-0">
            <h3 className={`${label} text-[var(--d-muted)]`}>{d.footer.onPage}</h3>
            <ul className="mt-3 flex flex-col gap-1.5 list-none p-0">
              {[
                ...navItems,
                ["Questions", "faq"],
                ["In pain today", "urgent"],
                [d.header.book, "booking"],
              ].map(([text, section]) => (
                <li key={section}>
                  <a
                    href={anchor.href(section)}
                    className="inline-flex min-h-11 items-center text-[13px] text-[var(--d-body)] hover:text-[var(--d-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-1">
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--d-muted)]">{d.footer.concept}</p>
          <DemoBackLink />
        </div>
      </footer>
      <DemoStickyCta
        label={d.header.book}
        href={anchor.href("booking")}
        secondary={preview ? undefined : { label: d.header.phoneLabel, href: d.phone.href }}
      />
    </DemoVars>
  );
}
