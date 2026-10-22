"use client";
import { useEffect, useId, useRef, useState } from "react";
import type { DemoProps } from "./_shared";
import {
  DEMO_NOTE,
  DemoBackLink,
  DemoBadge,
  DemoFaq,
  DemoHeading,
  DemoMobileMenu,
  DemoNav,
  DemoStickyCta,
  DemoVars,
  useDemoAnchors,
  type DemoNavItem,
} from "./_shared";

/* 04 — Rowanwood Dental: a two-chair general practice, laid out as a printed
   patient leaflet that answers back.

   The page IS a leaflet you're holding. A faint fold line down the middle, the
   treatment index as a printed table with column heads, the request as a
   tear-off slip at the bottom with a reference number that appears on submit.
   What a real leaflet cannot do, this one does: you point at the part of your
   mouth and at the words that fit, and it tells you what that visit usually
   involves and how long to allow; six questions asked one at a time in the
   order of danger tell you whether today is an emergency-department day or a
   Monday one; and nine of the words on a practice's letter are said again in
   ordinary English.

   Trust is built out of process — durations, steps, a written number handed
   over before treatment — because process is the only thing a concept practice
   can show without borrowing somebody else's testimonials. There are no names,
   credentials, reviews, ratings, before/after claims, prices or photographs
   anywhere on this page. Where a real build would need evidence that does not
   exist yet — the rooms, the street, the reviews — the page shows a labelled
   empty slot and says what goes there, rather than inventing something to fill
   it. The absence of a price list is stated with its reason, and the section
   that replaces the missing figure gives the questions that make any number you
   are later handed make sense.

   Everything visible comes from project.content. The practice, the street, the
   hours and the number are invented for the fiction, and the number stays
   inside the 555 range reserved for made-up businesses.

   Motion: one ambient loop — the breathing disc, which the visitor can stop and
   which stops by itself on a device that asks for less motion — plus the
   scroll-driven header and section reveals shared with the other concepts.
   Everything else answers a press: a folded row, a tapped region of the diagram,
   a torn slip. All of it lives in globals.css under `dw-` and is held at its
   finished state inside a device frame. */

const navItems: DemoNavItem[] = [
  ["Point at it", "planner"],
  ["Treatments", "index"],
  ["Can this wait", "triage"],
  ["First visit", "visit"],
];

/* Small caps set wide, the way a leaflet heads a section. */
const label = "font-sans text-[12px] uppercase tracking-[0.28em]";

/* Squared, hairline-bordered actions — neither the plumbing site's pills nor
   the restaurant's ember buttons. */
const action =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
const actionSolid = "bg-[var(--d-accent)] text-[var(--d-on-accent)] hover:opacity-90";
const actionLine =
  "border border-[var(--d-line-strong)] text-[var(--d-fg)] hover:bg-[var(--d-hover)]";

/* The same two actions on the dark band, where the derived ink tokens were
   measured against light surfaces and cannot be trusted: mint carries the label,
   the band's own grey-sage carries the outline. Both literals live in
   globals.css with their measured ratios beside them. */
const bandSolid = "dw-fill-mint hover:opacity-90";
const bandLine =
  "border border-[#a9bdb5] dw-ink-hi hover:bg-[color-mix(in_srgb,#a9bdb5_14%,transparent)]";

/* Fields on a pale page. Labels are always visible; the boundary is the 3:1
   token rather than a decorative hairline. Sixteen pixels is not a size
   preference: iOS Safari zooms the whole page to fit a smaller box when a field
   is focused, and that jump is what a phone visitor feels. */
const field =
  "w-full rounded-[2px] border border-[var(--d-line-strong)] bg-[var(--d-field)] px-3.5 py-3 text-[16px] text-[var(--d-fg)] [color-scheme:light] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";

const chip =
  "inline-flex min-h-11 cursor-pointer select-none items-center rounded-[2px] border border-[var(--d-line-strong)] px-3.5 text-[13px] leading-none transition-colors hover:bg-[var(--d-hover)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--d-accent)]";
const chipOn = "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]";

/* What the request form collects, and therefore what the confirmation can read
   back. One object, so the read-out cannot disagree with the inputs. The
   planner's picks ride into the slip as their own row rather than being pushed
   into the notes box, so pressing the carry button twice can never overwrite
   what somebody typed there. */
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

/* A tap-answered choice group. Real radios inside the labels, so the group is
   keyboard-navigable with the arrow keys, announces itself as a set of options
   under one legend, and validates natively — a styled row of buttons would do
   none of those three things. */
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

/* The section head: eyebrow, title and lead in a narrow rail, the content
   beside it. Every section of this page is built from the same two columns.
   Always an h2 — the page's single h1 is the hero, and it is swapped in and out
   by DemoHeading rather than here. */
function Head({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div>
      <p className={`${label} text-[var(--d-accent-text)]`}>{eyebrow}</p>
      <h2 className="mt-3 font-display text-[1.9rem] leading-[1.12] font-medium tracking-[-0.005em] text-balance @3xl:text-[2.3rem]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-[14px] leading-[1.75] text-[var(--d-body)] @3xl:text-[15px]">{lead}</p>
      )}
    </div>
  );
}

/* A panel that opens and shuts by animating its own height. The closed state
   stays in the document so the transition has something to animate, and
   `inert` is what takes it out of the tab order and the accessibility tree
   meanwhile. `DemoFaq` gets away with `hidden` because it has no height to
   animate. */
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

/* One of the pictures this concept needs and cannot have: every photograph of
   Rowanwood would be of a building that does not exist. So the frame is drawn,
   labelled and left empty, and the caption says what a real build drops into
   it. Nothing here pretends to be a record of something. */
function Slot({
  kind,
  note,
  ratio,
  className = "",
}: {
  kind: string;
  note: string;
  ratio: string;
  className?: string;
}) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <div
        className="relative overflow-hidden rounded-[2px] border border-dashed border-[var(--d-line-strong)] bg-[var(--d-soft)]"
        style={{ aspectRatio: ratio }}
      >
        {/* Corner registration marks, the kind a print studio puts where a
            photograph is meant to sit. */}
        <span aria-hidden="true" className="absolute inset-4">
          {[
            "left-0 top-0 border-l border-t",
            "right-0 top-0 border-r border-t",
            "left-0 bottom-0 border-l border-b",
            "right-0 bottom-0 border-r border-b",
          ].map((pos) => (
            <span key={pos} className={`absolute h-4 w-4 border-[var(--d-line-strong)] ${pos}`} />
          ))}
        </span>
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <span className={`${label} text-[var(--d-accent-text)]`}>{kind}</span>
        </div>
      </div>
      <figcaption className="mt-3 text-[12px] leading-relaxed text-[var(--d-muted)]">{note}</figcaption>
    </figure>
  );
}

/* --- The diagram -------------------------------------------------------------
   Our own drawing rather than the reference's: one charted arch, hairline like
   everything else on this leaflet. The geometry is generated from the ellipse
   the teeth actually sit on, so a change to the count, the spread or the radii
   moves the teeth, the gum band and the hit areas together instead of leaving
   them behind. */

const ARCH = { cx: 130, cy: 104, rx: 96, ry: 84 };
/* The "all of it" outline is drawn around the arch's ink, not around the centre
   the arch was generated from: a horseshoe only occupies the top of its own
   ellipse, so an outline on that centre leaves the lower half of the frame empty
   and reads as a circle with teeth stuck on its rim. */
const WHOLE = { cx: 130, cy: 60, rx: 122, ry: 56 };
const SPREAD: [number, number] = [210, 330];
const TEETH = 14;

const rad = (deg: number) => (Math.PI / 180) * deg;
const at = (deg: number, k: number) => ({
  x: ARCH.cx + ARCH.rx * k * Math.cos(rad(deg)),
  y: ARCH.cy + ARCH.ry * k * Math.sin(rad(deg)),
});

/* 210° to 330° through 270° traces the horseshoe: the front teeth land at the
   top of the chart, where a mirror shows them, and the arms sweep down to the
   molars at the back. */
const arc = Array.from({ length: TEETH }, (_, i) => {
  const deg = SPREAD[0] + ((SPREAD[1] - SPREAD[0]) * i) / (TEETH - 1);
  const off = Math.abs(i - (TEETH - 1) / 2);
  const p = at(deg, 1);
  return {
    deg,
    x: p.x,
    y: p.y,
    /* Incisors narrow and tall, molars wide and short — the same measurement
       that decides which region a tooth belongs to. */
    w: 12.5 + off * 2.1,
    h: 26 - off * 0.9,
    region: off <= 1.5 ? "front" : "back",
  };
});

/* A sampled path, so the gum band and the outline curve on the same ellipse as
   the teeth instead of approximating it by hand. */
const archPath = (k: number, from = SPREAD[0] - 8, to = SPREAD[1] + 8) =>
  Array.from({ length: Math.round(to - from) + 1 }, (_, i) => {
    const p = at(from + i, k);
    return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(" ");

/* The drawn ink is hairline-thin, so every zone carries an invisible band of
   its own to be tapped on. 36 viewBox units is the width that still measures at
   least 44 CSS pixels across a 320px screen (260 * 1.23 = 320), and the bands
   are laid end to end along the arch instead of stacked on top of each other:
   front teeth between the two back segments, gums on their own radius below.
   The whole-mouth ellipse underneath stays the catch-all, because it is drawn
   first and every band takes its area out of it. */
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

/* Every region is drawn twice: the line the visitor reads, and a solid highlight
   over the top of it. Only the highlight's opacity and the group's translate
   change, so a tap costs two composited properties and no repaint of the
   drawing underneath. */
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

/* The four zones are also four real buttons below the drawing: a region of an
   SVG is not a control, so the diagram is a pointer shortcut and never the only
   way to answer the question. */
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
      {/* The outer ellipse is the "all of it" target. It is drawn first, so its
          wash sits under the arch, and its transparent fill only receives the
          taps that fall between the teeth. */}
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

      {/* A midline tick and one word, so the chart has a front to it. They sit in
          the middle of the arch, under the incisors and clear of the gum band,
          because the front of this chart is the top of the drawing. Nothing here
          takes a tap: the word is a label, not a fifth region. */}
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

/* Generate a deterministic reference number from the form data. No Math.random,
   so server and client cannot disagree. */
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

  /* The planner: a region of the mouth, then one or more of the words that fit. */
  const [area, setArea] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [carried, setCarried] = useState(false);

  /* The self-check: one question on screen, and the first YES ends it, because
     the questions are ordered by danger rather than by frequency. */
  const [step, setStep] = useState(0);
  const [outcome, setOutcome] = useState<"emergency" | "today" | "routine" | "none" | null>(null);

  const [openRow, setOpenRow] = useState<string | null>(null);
  const [word, setWord] = useState<string | null>(null);

  const done = useRef<HTMLHeadingElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);

  /* Set by "Change it", read by the commit below it. A ref rather than state
     because it must not re-render anything, and the field it asks for only
     exists on the next commit. */
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

  /* Respect the visitor's motion preference at the moment the page moves them,
     rather than at build time. */
  const scrollBehavior = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  /* The two places this page answers a press by bringing an element into being:
     a submitted form mounting its read-out, and "Change it" re-mounting the
     fields. Neither can be focused from the handler that caused it, so both are
     done on the commit that made them exist — and the effect only reads and
     clears a ref, never state, so it cannot loop. */
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
    /* A change to the request means the read-out no longer describes it. */
    if (sent) setSent(null);
  };

  if (!c || !d) return null;

  /* A `tel:` link inside a device frame would pull the visitor off the page they
     were looking at, so the number stops being a link there and says why. */
  const phoneHref = preview ? undefined : d.phone.href;

  /* Add a line to the notes box rather than replacing it: the visitor may have
     already written the thing that actually matters. */
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

  /* The reason chip a concern maps to, but only if that reason really exists in
     the slip: a mismatch would silently pick nothing, so it fails open. */
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

  /* The read-out prints only what was actually given, so the confirmation cannot
     invent a phone number or a note the visitor never typed. */
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

  /* Printed across the tear-off edge of both the slip and its read-out. */
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
        {/* Twelve pixels, not ten: the floor the whole portfolio was set to, and
            this tab is the leaflet's signature. */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-[var(--d-accent)] px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-[var(--d-on-accent)]">
          {d.booking.tear}
        </div>
      </>
    );
  };

  /* The number, as either a live call or the button that explains why it is not.
     A function rather than a component: it holds no state, and a component
     declared here would be a new type on every render, which would throw away
     the focus of the control the visitor has just pressed. */
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

  return (
    <DemoVars project={project}>
      {/* Faint fold line down the middle — like a bi-fold leaflet. `absolute`,
          not `fixed`: DemoVars is the positioned block, so the crease stops at
          the concept's own edges. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-px -translate-x-1/2 @5xl:block"
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, var(--d-line) 0, var(--d-line) 4px, transparent 4px, transparent 8px)`,
          opacity: 0.15,
        }}
        aria-hidden="true"
      />

      {/* 1 — The board. Four facts across the top of the page, each filed under
          the small head it answers, because "can I be seen, and can I get in"
          decides whether anything below it matters. */}
      <div className="border-b border-[var(--d-line)] bg-[var(--d-soft)]">
        {/* Hairlines drawn by the grid itself: a 1px gap over a line-coloured
            track, so the rules appear between cells in both axes without any
            per-index border arithmetic to get wrong. */}
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

      {/* 2 — Top bar: quiet over the fold, solid once the page has moved. */}
      <header className="demo-header-dental sticky top-0 z-30 border-b border-[var(--d-line)] bg-[color-mix(in_oklab,var(--d-bg)_97%,transparent)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 @5xl:flex-nowrap @5xl:px-8">
          <div className="flex min-w-0 items-baseline gap-3">
            <a
              href={anchor.href("top")}
              className={`inline-flex min-h-11 items-center ${label} font-display font-semibold`}
            >
              {c.navName}
            </a>
            {/* The week's shape rather than a live open/closed light: a chip that
                claims to know the time is one clock-sync away from lying.
                `--d-body`, not `--d-muted`: the header sits on a blurred surface
                that is a shade darker than the page, and on it the faintest legal
                label measured 3.98:1 at 12px — under AA. */}
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

      {/* 3 — Hero: the argument on the left, the room that does not exist and the
          breathing disc on the right. Type never sits on a photograph here, so
          nothing has to prove itself against whatever a camera exposed. */}
      <section id={anchor.id("top")} className="px-4 pt-12 @3xl:pt-16 @5xl:px-8 @5xl:pt-20">
        {/* The fiction belongs on the fold, not only in the colophon. Where the
            header has room for it the week's line is there; on a phone the
            concept marker gets its own row. */}
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
            {/* The three facts a patient weighs, as a printed key rather than as
                three feature cards. */}
            <dl className="mt-9 grid gap-px bg-[var(--d-line)] @3xl:grid-cols-3">
              {d.hero.facts.map((f) => (
                <div key={f.label} className="bg-[var(--d-bg)] px-4 py-4">
                  <dt className={`${label} text-[var(--d-muted)]`}>{f.label}</dt>
                  <dd className="mt-2 font-display text-[1.15rem] leading-snug text-[var(--d-fg)]">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-col gap-3 @3xl:flex-row @3xl:items-center">
              <a href={anchor.href("booking")} className={`${action} ${actionSolid}`}>
                {d.hero.ctaPrimary}
              </a>
              <a href={anchor.href("urgent")} className={`${action} ${actionLine}`}>
                {d.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="min-w-0 @5xl:pt-4">
            <Slot kind={d.slots.kind} note={d.slots.hero.note} ratio={d.slots.hero.ratio} />
            <p className="mt-4 text-[12px] leading-relaxed text-[var(--d-muted)]">{d.hero.caption}</p>

            {/* The hero's own widget. One cycle is the sum of the counts, so the
                disc, the ring and the three words share the fourteen seconds the
                copy names, and the stops in globals.css sit at the same
                fractions of it. */}
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
                  {/* The three words stack in one box and take turns. On a device
                      that asked for less motion, and inside a preview frame, this
                      block is replaced by the pace written out in words. */}
                  <span aria-hidden="true" className="dw-words relative grid h-full w-full place-items-center">
                    {d.calm.phases.map((p, i) => (
                      <span
                        key={p.word}
                        className={`dw-word-${i + 1} absolute font-display text-[1.2rem] text-[var(--d-accent-text)]`}
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

      {/* 4 — Pain. Its own band, above every figure of this page's own work,
          because a person in pain must not scroll to find the phone. It inverts
          for the same reason: this is the one thing on the leaflet that should
          read as an alarm rather than as print. */}
      <section id={anchor.id("urgent")} className="dw-band demo-reveal mt-16 px-4 py-12 @3xl:mt-24 @5xl:px-8 @5xl:py-16">
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
              {/* The slower route, offered rather than hidden: it writes the
                  reason and the sentence into the slip before the visitor ever
                  reaches it. */}
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

      {/* 5 — 01, the planner. The thing a printed leaflet can never do: it asks,
          and it answers with the length of the visit rather than a diagnosis. */}
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

              {/* The answer panel. `polite` so a pick reads out what changed
                  without the visitor having to go and find the panel first. */}
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

      {/* 6 — The self-check. Six questions, one at a time, asked in the order of
          danger, so a swollen jaw can never be talked out of the emergency
          department by a later answer about a chipped tooth. */}
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
              <div className="demo-menu-fade rounded-[2px] border-2 border-[var(--d-accent)] bg-[var(--d-bg)] px-5 py-6 @3xl:px-7">
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

                {/* The emergency answer is a sentence, not a button: this page
                    must not send anybody anywhere by a tap, and it never prints
                    an emergency-services number it cannot stand behind. */}
                {result?.key === "emergency" ? (
                  <p className="mt-6 border-l-2 border-[var(--d-accent)] pl-4 font-display text-[1.15rem] leading-snug text-[var(--d-fg)]">
                    {result.cta}
                  </p>
                ) : (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {result?.key === "today" ? (
                      phoneButton(result.cta, d.urgent.phoneLabel, "page")
                    ) : (
                      <a
                        href={anchor.href("booking")}
                        onClick={() => appendNote(selfCheckNote)}
                        className={`${action} ${actionSolid}`}
                      >
                        {result ? result.cta : d.triage.slipLabel}
                      </a>
                    )}
                    {result && result.key !== "today" && (
                      <a
                        href={anchor.href("booking")}
                        onClick={() => appendNote(selfCheckNote)}
                        className={`${action} ${actionLine}`}
                      >
                        {d.triage.slipLabel}
                      </a>
                    )}
                  </div>
                )}

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

      {/* 7 — The practice. A statement and its plain-spoken footnote. */}
      <section id={anchor.id("practice")} className="demo-reveal px-4 py-16 @5xl:px-8 @5xl:py-24">
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
          </div>
        </div>
      </section>

      {/* 8 — 02, the index. A printed table with real column heads; below that
          measure the rows stack and each cell prints its own head again, from the
          same data, so the two copies cannot drift apart. */}
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

          {/* The no-price stance, arriving with its reason rather than skipped. */}
          <p className="mt-12 max-w-3xl border-l-2 border-[var(--d-accent)] pl-4 text-[14px] leading-[1.75] text-[var(--d-body)]">
            {d.index.costNote}
          </p>
          <p className="mt-6 text-[13px] leading-relaxed text-[var(--d-muted)]">{d.index.footNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={anchor.href("planner")} className={`${action} ${actionLine}`}>
              {d.index.ctaPlanner}
            </a>
            <a href={anchor.href("visit")} className={`${action} ${actionLine}`}>
              {d.index.ctaVisit}
            </a>
          </div>
        </div>
      </section>

      {/* 9 — Money, without the numbers. The reference has no section like this:
          a page that cannot publish a price instead hands the visitor the
          questions that make any price they are later handed make sense. */}
      <section id={anchor.id("cost")} className="demo-reveal px-4 py-16 @5xl:px-8 @5xl:py-24">
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
                    <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-[12px] text-[var(--d-accent-text)]">
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
          <p className="mt-12 max-w-3xl border border-[var(--d-line-strong)] bg-[var(--d-soft)] px-5 py-4 text-[13px] leading-[1.75] text-[var(--d-body)]">
            {d.cost.honest}
          </p>
        </div>
      </section>

      {/* 10 — 03, nervous patients. Four things that can be checked in the room
          rather than believed in a brochure, and two quiet ways into the slip. */}
      <section
        id={anchor.id("nerves")}
        className="demo-reveal border-y border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
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
                  <span aria-hidden="true" className="mt-1 shrink-0 font-mono text-[12px] text-[var(--d-accent-text)]">
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
        <div className="mx-auto mt-12 max-w-7xl">
          <Slot kind={d.slots.kind} note={d.slots.nerves.note} ratio={d.slots.nerves.ratio} />
        </div>
      </section>

      {/* 11 — 04, the first hour. Marked in minutes rather than numbered, because
          what a patient is weighing is how long each part takes. The connector
          draws itself as the steps arrive and is a finished line for anybody
          whose engine cannot do that. */}
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
            <Slot kind={d.slots.kind} note={d.slots.visit.note} ratio={d.slots.visit.ratio} className="mt-12" />
          </div>

          <div className="min-w-0">
            <ol className="relative ml-1 border-l border-[var(--d-line-strong)] pl-6">
              <span
                aria-hidden="true"
                className="demo-rail-y absolute -left-px top-0 h-full w-px origin-top bg-[var(--d-accent)]"
              />
              {d.visit.steps.map((s) => (
                <li key={s.mark} className="relative pb-9 last:pb-0">
                  <span aria-hidden="true" className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--d-accent)]" />
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

      {/* 12 — The decoder. The page promises plain language several times, and
          this is the section that has to prove it. */}
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

      {/* 13 — 05, proof. An empty frame labelled as one, and the questions the
          desk answers most. The frame is the honest version of a testimonial
          strip: it shows where the evidence goes and says why nothing is in it. */}
      <section id={anchor.id("faq")} className="demo-reveal px-4 py-16 @5xl:px-8 @5xl:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1fr_1.3fr] @5xl:gap-16">
          <div className="min-w-0">
            <Head eyebrow={d.proof.eyebrow} title={d.proof.title} lead={d.proof.lead} />
            <div className="mt-8 border border-dashed border-[var(--d-line-strong)] bg-[var(--d-soft)] px-5 py-6">
              <p className={`${label} text-[var(--d-accent-text)]`}>{d.proof.slotLabel}</p>
              <h3 className="mt-3 font-display text-[1.25rem] leading-snug font-medium">{d.proof.headline}</h3>
              <p className="mt-3 text-[14px] leading-[1.75] text-[var(--d-body)]">{d.proof.body}</p>
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-[var(--d-muted)]">{d.proof.foot}</p>
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

      {/* 14 — 06, the slip. A tear-off edge, a reference number on submit, and the
          read-out that says plainly that no appointment exists. */}
      <section
        id={anchor.id("booking")}
        className="demo-reveal border-t border-[var(--d-line)] bg-[var(--d-soft)] px-4 pt-16 pb-28 @3xl:pb-16 @5xl:px-8 @5xl:py-24"
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

                {/* The reference number, and the sentence that keeps it from being
                    read as a book entry. Mono at 500, not bold: the loaded mono
                    weight stops there, and a synthetic bold would smear the
                    characters the visitor is meant to read digit by digit. */}
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
                      <dd className="text-[14px] leading-relaxed text-[var(--d-fg)] [overflow-wrap:anywhere]">
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
                    /* The field this returns to does not exist yet, so the commit
                       effect above is told to move focus once it does. */
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
                  <div className="demo-menu-fade mb-7 border border-[var(--d-accent)] bg-[color-mix(in_srgb,var(--d-accent)_8%,var(--d-bg))] px-4 py-3">
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

                {/* The scheduler this concept cannot wire up. It stays on the page
                    because a real build would have it, and it names itself rather
                    than pointing at nothing. */}
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

            {/* The desk's own details, beside the slip rather than below it. */}
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

      {/* 15 — Footer. No social row: a name that looks like a link and goes
          nowhere is a dead end, and this concept has no accounts. */}
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
            <Slot kind={d.slots.kind} note={d.slots.map.note} ratio={d.slots.map.ratio} className="mt-5" />
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
          {/* This concept builds its own footer rather than the shared one, so the
              way back to the project list is placed here too. It only renders on
              the standalone route. */}
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
