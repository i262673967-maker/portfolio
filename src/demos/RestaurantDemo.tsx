"use client";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import type { FC } from "react";
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

/* 02 — Ember & Oak: a twenty-two-cover, fire-only room, rebuilt around the order
   a diner actually reads a restaurant site in.
   The page opens with the hours, not the mood. Then the fire, which is something
   you choose rather than admire: three blocks, each drawn as the fire at that age,
   each carrying its own ask straight into the reservation. The evening is told in
   four movements before the card is shown at all, because the shape of the meal is
   the question a printed card leaves out. The card itself filters down to what you
   can eat and carries no figures anywhere — an invented room gets no invented sums,
   and it says so where a price would sit. Nothing is photographed: every plate the
   old version borrowed is now a slot that names the picture a real build would put
   there. Both forms build their answer in front of you and say plainly that it
   never left the page, and the one claim the page makes about the world — open or
   closed — is arithmetic on the hours printed underneath it and the clock in the
   visitor's own device.
   All copy comes from project.content.restaurant. The fire drawings, the photo
   slots and the room plan are the only things here that are not, because they are
   pictures rather than claims. */

const navItems: DemoNavItem[] = [
  ["The Evening", "evening"],
  ["The Card", "menu"],
  ["The Long Table", "groups"],
  ["Visit", "visit"],
];

/* Two dark bands sit inside a light palette, so the ink on them is derived the
   other way round: page colour as the heading, and the foreground blended back
   into it to make a legal running-body grey on a near-black brown. */
const ink = "text-[var(--d-bg)]";
const inkBody = "text-[color:color-mix(in_srgb,var(--d-fg)_24%,var(--d-bg))]";
const inkEmber = "text-[color:color-mix(in_srgb,var(--d-bg)_26%,var(--d-accent))]";

const action =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] px-5 py-2.5 font-display text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
const actionSolid = "bg-[var(--d-accent)] text-[var(--d-on-accent)] hover:opacity-90";
const actionLine =
  "border border-[var(--d-line-strong)] text-[var(--d-fg)] hover:bg-[var(--d-hover)]";
/* The evening's turn-by buttons. Written out rather than composed from `action`,
   because `action` already sets a horizontal pad and a competing `px-0` at the
   same breakpoint resolves by stylesheet order, not by the order the classes are
   written in. */
const actionIcon =
  "inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-[var(--d-line-strong)] text-[15px] transition-colors hover:bg-[var(--d-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] @3xl:w-auto @3xl:px-4";
const label = "font-sans text-[12px] uppercase tracking-[0.26em]";

/* Ledger-style fields: a ruled bottom border instead of a box, monospaced data
   entry, and the palette's own colour scheme so the native date and picker
   controls are not dark boxes on a cream page.
   `16px`, not the 15px the rest of the page runs at: a phone browser zooms the
   whole page when a focused input is smaller than that, which throws the visitor
   out of the form and into the middle of the heading above it. */
const ledgerField =
  "w-full border-0 border-b border-[var(--d-line-strong)] bg-transparent px-1 py-3 text-[16px] text-[var(--d-fg)] font-mono [color-scheme:light] focus-visible:border-[var(--d-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] transition-colors placeholder:text-[var(--d-muted)]";

/* A choice is a real radio inside its label, so the group is arrow-key
   navigable, announces itself as one question with a set of answers, and
   validates natively. A styled row of buttons would do none of those. */
const chip =
  "inline-flex min-h-11 cursor-pointer select-none items-center rounded-[3px] border border-[var(--d-line-strong)] px-3.5 text-[13px] leading-none font-mono transition-colors hover:bg-[var(--d-hover)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--d-accent)]";
const chipOn = "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]";

function LedgerField({
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
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={`${label} text-[var(--d-muted)]`}>
        {name}
      </label>
      {children}
      {hint && (
        <span className="font-mono text-[12px] leading-relaxed text-[var(--d-muted)]">{hint}</span>
      )}
    </div>
  );
}

function ChipChoice({
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
            {/* Clipped, not hidden: the input still takes focus, so it carries the
                16px the phone browser needs before it will focus a field without
                zooming the whole page away from the chips. */}
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              required={required}
              onChange={() => onSelect(o)}
              className="sr-only text-[16px]"
            />
            {o}
          </label>
        ))}
      </div>
      {hint && <p className="mt-2 max-w-md text-[12px] leading-relaxed text-[var(--d-muted)]">{hint}</p>}
    </fieldset>
  );
}

/* The plate where a photograph used to sit. Naming the picture a real build
   would shoot is the honest version of a stock image: it holds the composition,
   costs no licence, and credits nobody for a room that does not exist. */
function PhotoSlot({
  kind,
  note,
  className = "",
  children,
}: {
  kind: string;
  note: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <figure
      className={`relative m-0 flex flex-col justify-end gap-2 overflow-hidden rounded-[3px] border border-dashed border-[var(--d-line-strong)] bg-[var(--d-soft)] p-4 @3xl:p-5 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(135deg,var(--d-fg)_0_1px,transparent_1px_10px)]"
      />
      <span className={`relative ${label} text-[var(--d-accent-text)]`}>{kind}</span>
      <span className="relative max-w-xl text-[13px] leading-relaxed text-[var(--d-body)]">{note}</span>
      {children}
    </figure>
  );
}

/* ── The three fires ───────────────────────────────────────────────────────
   Flat fills taken from the palette variables rather than gradients, so nothing
   needs an id in <defs>: the homepage mounts this concept twice and a shared id
   would make the second drawing resolve against the first one's defs. */
function FlameMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true" focusable="false">
      <path
        d="M32 4c3 10 12 14 12 26 0 3-1 6-3 8 1-8-3-12-7-15 1 7-1 11-4 14-2 2-3 4-3 7 0 6 4 10 9 10-9 0-16-6-16-14C20 27 27 17 32 4Z"
        fill="var(--d-accent)"
      />
      <path d="M32 34c2 3 5 5 5 9a5 5 0 1 1-10 0c0-4 3-6 5-9Z" fill="var(--d-fg)" opacity="0.5" />
      <path d="M14 58h36" stroke="var(--d-line-strong)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CoalMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true" focusable="false">
      <circle cx="22" cy="44" r="11" fill="var(--d-accent)" />
      <circle cx="42" cy="46" r="13" fill="var(--d-accent)" opacity="0.85" />
      <circle cx="33" cy="34" r="8" fill="var(--d-accent)" opacity="0.6" />
      <circle cx="26" cy="42" r="4" fill="var(--d-fg)" opacity="0.45" />
      <circle cx="45" cy="44" r="3" fill="var(--d-fg)" opacity="0.4" />
      <path d="M20 16c2 4 1 7-1 9M32 12c2 5 1 8-1 11M44 17c2 3 1 6-1 8" stroke="var(--d-line-strong)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function KindlingMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true" focusable="false">
      <path d="M12 56 34 20M26 56 46 26M40 56 54 34" stroke="var(--d-line-strong)" strokeWidth="4" strokeLinecap="round" />
      <path d="M33 30c1 4 4 6 4 10a5 5 0 1 1-9 1c0-4 3-7 5-11Z" fill="var(--d-accent)" />
    </svg>
  );
}

/* Keyed by the block's own time rather than its position: if the schedule in
   data.ts is re-ordered or a block added, a block still gets the fire it will
   actually meet instead of the drawing that happened to be third. */
const FIRE: Partial<Record<string, FC>> = {
  "18:00": FlameMark,
  "21:00": CoalMark,
  "12:00": KindlingMark,
};

/* The mark beside a dish. The glyph is presentation, so it lives here; the word
   a screen reader gets is the same idea spelled out, because "V" read aloud is
   not an answer. */
const MARK_GLYPH: Record<string, string> = {
  veg: "V",
  vegan: "VG",
  gf: "GF",
  medium: "◐",
  hot: "●",
};
const MARK_SPOKEN: Record<string, string> = {
  veg: "vegetarian",
  vegan: "vegan",
  gf: "no gluten",
  medium: "medium heat",
  hot: "hot",
};

/* The decorative plan of a room that does not exist, drawn as a plan and called
   one. It stands where a map pin would sit on a real site, which is the honest
   substitute for a link to a street that is invented with the rest of it. */
function RoomPlan() {
  return (
    <svg viewBox="0 0 240 150" className="h-auto w-full max-w-[17rem]" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="234" height="144" rx="5" fill="none" stroke="var(--d-line-strong)" strokeWidth="2" />
      <rect x="14" y="14" width="96" height="16" rx="3" fill="var(--d-accent)" />
      <rect x="14" y="40" width="60" height="14" rx="3" fill="var(--d-soft)" stroke="var(--d-line-strong)" strokeWidth="1.5" />
      <circle cx="110" cy="48" r="10" fill="var(--d-soft)" stroke="var(--d-line-strong)" strokeWidth="1.5" />
      <circle cx="150" cy="48" r="10" fill="var(--d-soft)" stroke="var(--d-line-strong)" strokeWidth="1.5" />
      <rect x="184" y="34" width="42" height="30" rx="3" fill="var(--d-soft)" stroke="var(--d-line-strong)" strokeWidth="1.5" />
      <rect x="14" y="74" width="150" height="18" rx="3" fill="var(--d-soft)" stroke="var(--d-line-strong)" strokeWidth="1.5" />
      <circle cx="192" cy="94" r="9" fill="var(--d-soft)" stroke="var(--d-line-strong)" strokeWidth="1.5" />
      <circle cx="214" cy="94" r="9" fill="var(--d-soft)" stroke="var(--d-line-strong)" strokeWidth="1.5" />
      <path d="M20 100h34M20 112h34" stroke="var(--d-line-strong)" strokeWidth="2" strokeLinecap="round" />
      <path d="M120 132h34" stroke="var(--d-accent)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

type Booking = {
  date: string;
  time: string;
  party: string;
  name: string;
  email: string;
  occasion: string;
  notes: string;
};

type Enquiry = {
  size: string;
  date: string;
  name: string;
  contact: string;
  notes: string;
};

type ServiceDay = {
  day: string;
  dow: number;
  open: number | null;
  close: number;
  shown: string;
};

function todayISO() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/* A plain ISO date read as a plain calendar date. `new Date("2026-10-24")` is
   UTC midnight, so its local day number can be the day before; the arithmetic is
   done in UTC here so the day printed is the day typed. */
function dayOf(iso: string) {
  const parts = iso.split("-");
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d) return null;
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function spokenDate(iso: string) {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d) return iso;
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${names[dayOf(iso) ?? 0]} ${d} ${months[m - 1]} ${y}`;
}

function minutesToTime(mins: number) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/* The seating grid for one date, worked out from the same week table the hours
   are printed from. A list of times that cannot be reconciled with the printed
   hours is a lie a diner finds out at the door, so nothing here is hand-listed:
   half-hour steps from the opening until `lastSeating` before the close.
   `before` drops seatings that have already gone on the day being asked about. */
function slotsOn(iso: string, week: ServiceDay[], step: number, lastSeating: number, before: number | null) {
  const dow = dayOf(iso);
  if (dow === null) return [];
  const day = week.find((w) => w.dow === dow);
  if (!day || day.open === null) return [];
  const out: string[] = [];
  for (let m = day.open; m <= day.close - lastSeating; m += step) {
    if (before !== null && m <= before) continue;
    out.push(minutesToTime(m));
  }
  return out;
}

/* Open or closed, computed rather than asserted, from the week table and the
   visitor's own clock. */
function statusAt(now: Date, week: ServiceDay[]) {
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = week.find((w) => w.dow === now.getDay());
  if (today && today.open !== null) {
    if (mins >= today.open && mins < today.close) {
      return { line: `Open now · closes ${minutesToTime(today.close)}`, open: true };
    }
    if (mins < today.open) {
      return { line: `Opens ${minutesToTime(today.open)} today`, open: false };
    }
  }
  for (let ahead = 1; ahead <= 7; ahead++) {
    const next = week.find((w) => w.dow === (now.getDay() + ahead) % 7);
    if (next && next.open !== null) {
      return {
        line: `Opens ${minutesToTime(next.open)} ${ahead === 1 ? "tomorrow" : next.day}`,
        open: false,
      };
    }
  }
  return null;
}

/* The clock, read through the store contract instead of setState in an effect:
   the value only changes once a minute, so the snapshot is stable, and no render
   is scheduled that the page has no use for. The server snapshot is deliberately
   out of range — nothing is claimed about a clock the server cannot see, and the
   chip prints the week's shape until the browser reads its own time. */
function subscribeMinute(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 20000);
  return () => window.clearInterval(id);
}

function readMinute() {
  return Math.floor(Date.now() / 60000);
}

export default function RestaurantDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const c = project.content;
  const r = c?.restaurant;
  const week: ServiceDay[] = r?.booking.week ?? [];

  const [stage, setStage] = useState(0);
  const [filter, setFilter] = useState("all");
  const [activeFire, setActiveFire] = useState(0);
  const [sent, setSent] = useState<Booking | null>(null);
  const [form, setForm] = useState<Booking>({
    date: "",
    time: "",
    party: "2",
    name: "",
    email: "",
    occasion: "No occasion",
    notes: "",
  });
  const [ask, setAsk] = useState<Enquiry>({ size: "", date: "", name: "", contact: "", notes: "" });

  const done = useRef<HTMLHeadingElement>(null);

  const tick = useSyncExternalStore(subscribeMinute, readMinute, () => -1);
  const status = tick < 0 ? null : statusAt(new Date(tick * 60000), week);

  useEffect(() => {
    if (!sent) return;
    const el = done.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [sent]);

  if (!c || !r) return null;

  const set = <K extends keyof Booking>(key: K, value: Booking[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const bookLabel = r.header.book;
  const phoneHref = preview ? undefined : r.booking.phone.href;
  const sections = r.menu.sections;
  const allCount = sections.reduce((n, s) => n + s.dishes.length, 0);
  const matches = (key: string, marks: string[]) =>
    key === "all" || (key === "heat" ? marks.includes("medium") || marks.includes("hot") : marks.includes(key));
  const countFor = (key: string) =>
    sections.reduce((n, s) => n + s.dishes.filter((d) => matches(key, d.marks)).length, 0);

  const nowMins = () => {
    if (tick < 0 || form.date !== todayISO()) return null;
    const now = new Date(tick * 60000);
    return now.getHours() * 60 + now.getMinutes();
  };
  const slots = form.date
    ? slotsOn(form.date, week, r.booking.stepMinutes, r.booking.lastSeatingMinutes, nowMins())
    : [];
  /* A fire chosen in the hero pre-fills a time. If the date the visitor then
     picks does not offer it, the grid simply shows nothing selected rather than
     a radio that cannot be seen. */
  const chosenTime = slots.includes(form.time) ? form.time : "";

  const fire = r.hero.fire.blocks[Math.min(activeFire, r.hero.fire.blocks.length - 1)];
  const evening = r.evening.stages[Math.min(stage, r.evening.stages.length - 1)];
  const eveningStage = r.evening.stages.indexOf(evening);

  const ticketRows = [
    { term: r.groups.fields.size, detail: ask.size },
    { term: r.groups.fields.date, detail: ask.date ? spokenDate(ask.date) : "" },
    { term: r.groups.fields.name, detail: ask.name.trim() },
    { term: r.groups.fields.contact, detail: ask.contact.trim() },
    { term: r.groups.fields.notes, detail: ask.notes.trim() },
  ].filter((row) => row.detail);

  const receipt: { term: string; detail: string }[] = sent
    ? [
        { term: "Date", detail: spokenDate(sent.date) },
        { term: "Time", detail: sent.time },
        { term: "Party", detail: `${sent.party} guests` },
        { term: "Name", detail: sent.name },
        { term: "Email", detail: sent.email },
        { term: "Occasion", detail: sent.occasion },
        ...(sent.notes.trim() ? [{ term: "Notes", detail: sent.notes.trim() }] : []),
      ]
    : [];

  const stepEvening = (delta: number) =>
    setStage((stage + delta + r.evening.stages.length) % r.evening.stages.length);

  const onEveningKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = r.evening.stages.length - 1;
    const next =
      e.key === "ArrowRight" ? Math.min(last, eveningStage + 1)
      : e.key === "ArrowLeft" ? Math.max(0, eveningStage - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setStage(next);
  };

  const ldHours: { "@type": string; dayOfWeek: string; opens: string; closes: string }[] = [];
  for (const d of week) {
    if (d.open === null) continue;
    ldHours.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: d.day,
      opens: minutesToTime(d.open),
      closes: minutesToTime(d.close),
    });
  }
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: c.navName,
    description: `${project.summary} ${DEMO_NOTE}`,
    servesCuisine: "Ash-fired cooking",
    telephone: r.booking.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: r.booking.address.join(", "),
    },
    /* The page asks for a table and never holds one, so it must not describe
       itself to a search engine as a place that takes reservations. */
    acceptsReservations: "False",
    openingHoursSpecification: ldHours,
  };

  return (
    <DemoVars project={project}>
      {/* 1 — The service board. Hours, blocks and the fire's own start time,
         before anything is asked of the visitor. The computed line closes the
         board so the first claim on the page is the one you can check. */}
      <div className="border-b border-[var(--d-line)] bg-[color-mix(in_srgb,var(--d-fg)_4%,var(--d-bg))]">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-1.5 px-4 py-2.5 @5xl:px-8">
          {r.board.map((line) => (
            <li key={line} className="flex items-center gap-2.5 text-[12px] leading-relaxed text-[var(--d-body)]">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-[var(--d-accent)]" />
              {line}
            </li>
          ))}
          <li className="flex items-center gap-2.5 text-[12px] leading-relaxed text-[var(--d-body)]">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${status?.open ? "bg-[var(--d-accent)]" : "bg-[var(--d-line-strong)]"}`}
            />
            <span role="status">{status ? status.line : r.header.openLine}</span>
          </li>
        </ul>
      </div>

      {/* 2 — Top bar */}
      <header className="demo-header-fire sticky top-0 z-30 border-b border-[var(--d-line)] bg-[color-mix(in_oklab,var(--d-bg)_97%,transparent)] backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 @5xl:px-8">
          <div className="flex items-center justify-between gap-4 py-3">
            <a href={anchor.href("top")} className={`inline-flex min-h-11 items-center ${label} font-display font-semibold`}>
              {c.navName}
            </a>
            <div className="flex items-center gap-3 @5xl:gap-8">
              <DemoNav anchor={anchor} items={navItems} className={label} />
              <span className="hidden @3xl:inline-flex">
                <a href={anchor.href("visit")} className={`${action} ${actionSolid} px-4 tracking-[0.16em] @3xl:px-5`}>
                  {bookLabel}
                </a>
              </span>
              <DemoMobileMenu anchor={anchor} items={navItems} action={[bookLabel, "visit"]} />
            </div>
          </div>
          {/* The fiction sits on the fold rather than only in the colophon. */}
          <p className={`hidden border-t border-[var(--d-line)] py-1.5 text-[12px] text-[var(--d-muted)] @5xl:block ${label} font-normal normal-case tracking-[0.12em]`}>
            {r.header.concept}
          </p>
        </div>
      </header>

      {/* 3 — Hero: the room's line, then the fire as a decision. */}
      <section
        id={anchor.id("top")}
        className={`px-4 pt-12 @3xl:pt-16 @5xl:px-8 @5xl:pt-20 ${preview ? "" : "flex min-h-[88svh] flex-col justify-center"}`}
      >
        <div className="mx-auto grid max-w-7xl gap-10 @5xl:grid-cols-[1.3fr_1fr] @5xl:gap-16">
          <div>
            <DemoBadge />
            <DemoHeading
              preview={preview}
              className="mt-6 font-display text-[2.6rem] leading-[1.02] font-medium tracking-[-0.01em] text-balance @3xl:text-[3.5rem] @5xl:text-[4.4rem]"
            >
              {r.hero.headline}{" "}
              <span className="italic text-[var(--d-accent-text)]">{r.hero.accent}</span>
            </DemoHeading>
            <p className={`mt-5 max-w-xl text-[15px] leading-[1.8] text-[var(--d-body)] first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.4rem] first-letter:leading-[0.76] first-letter:font-medium first-letter:text-[var(--d-fg)] @3xl:text-[17px]`}>
              {r.hero.lede}
            </p>
            <div className="mt-7 flex flex-col gap-3 @3xl:flex-row @3xl:items-center">
              <a href={anchor.href("visit")} className={`${action} ${actionSolid}`}>
                {bookLabel}
              </a>
              <a href={anchor.href("menu")} className={`${action} ${actionLine}`}>
                {c.ctaSecondary}
              </a>
            </div>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--d-line)] pt-6">
              {r.hero.facts.map((f) => (
                <div key={f.label}>
                  <dt className={`${label} text-[var(--d-muted)]`}>{f.label}</dt>
                  <dd className="mt-1.5 font-display text-[1.15rem] text-[var(--d-fg)]">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className={`mt-6 ${label} font-normal normal-case tracking-[0.12em] text-[var(--d-muted)]`}>
              {r.hero.eyebrow} · {r.hero.hoursLine}
            </p>
          </div>

          {/* The fire, chosen here rather than admired further down. Each block
              answers with its own drawing, and the chosen one warms. */}
          <div className="rounded-[4px] border border-[var(--d-line)] bg-[color-mix(in_srgb,var(--d-accent)_4%,var(--d-bg))] p-5 @3xl:p-6">
            <h2 className="font-display text-[1.45rem] leading-tight font-medium tracking-tight text-balance @3xl:text-[1.7rem]">
              {r.hero.fire.title}
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--d-body)]">{r.hero.fire.body}</p>
            <div
              role="group"
              aria-label={r.hero.fire.title}
              className="mt-5 grid gap-3 @3xl:grid-cols-3"
            >
              {r.hero.fire.blocks.map((b, i) => {
                const isActive = activeFire === i;
                const Fire = FIRE[b.time] ?? FlameMark;
                return (
                  <button
                    key={b.time}
                    type="button"
                    onClick={() => setActiveFire(i)}
                    aria-pressed={isActive}
                    className={`relative flex min-h-11 flex-col items-start rounded-[3px] border p-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                      isActive
                        ? "border-[var(--d-accent)] bg-[var(--d-bg)]"
                        : "border-[var(--d-line-strong)] bg-transparent hover:bg-[var(--d-hover)]"
                    }`}
                  >
                    {isActive && <span aria-hidden="true" className="er-glow" />}
                    <span className="relative mb-3 block h-12 w-12 shrink-0">
                      <Fire />
                    </span>
                    <span className="relative font-display text-[1.9rem] leading-none font-medium tracking-tight text-[var(--d-fg)]">
                      {b.time}
                    </span>
                    <span className={`relative mt-2.5 ${label} ${isActive ? "text-[var(--d-accent-text)]" : "text-[var(--d-muted)]"}`}>
                      {b.label}
                    </span>
                    <span className="relative mt-2 text-[13px] leading-relaxed text-[var(--d-body)]">{b.note}</span>
                  </button>
                );
              })}
            </div>
            <p role="status" className={`mt-5 ${label} text-[var(--d-accent-text)]`}>
              {r.hero.fire.live}: {fire.time} — {fire.label}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-[var(--d-muted)]">{r.hero.fire.drawn}</p>
            {/* The block's own ask. A Sunday lunch has no slot in the dinner grid,
                so it writes the request into the ledger note instead of quietly
                filing the diner under a table that does not exist for them. */}
            <a
              href={anchor.href("visit")}
              onClick={() => {
                if (fire.slot) set("time", fire.slot);
                if (fire.preset) set("notes", fire.preset);
              }}
              className={`${action} ${actionSolid} mt-5 w-full @3xl:w-auto`}
            >
              {fire.ask}
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl">
          <PhotoSlot kind={r.hero.slot.kind} note={r.hero.slot.note} className="aspect-[4/3] w-full @3xl:aspect-[16/9] @5xl:aspect-[21/9]">
            <span aria-hidden="true" className="er-steam">
              <span />
              <span />
              <span />
            </span>
          </PhotoSlot>
        </div>
      </section>

      {/* 4 — The kitchen */}
      <section className="demo-reveal px-4 py-16 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-24">
        <div className="@5xl:grid @5xl:grid-cols-[1.5fr_1fr] @5xl:gap-16">
          <div>
            <p className={`${label} text-[var(--d-accent-text)]`}>{r.intro.eyebrow}</p>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-[var(--d-body)] @3xl:text-[17px]">
              {r.intro.body}
            </p>
          </div>
          <ul className="mt-10 list-none p-0 @5xl:mt-1">
            {(c.services ?? []).map((s, i) => (
              <li key={s.title} className="border-t border-[var(--d-line)] py-4 last:border-b">
                <h3 className="font-display text-[1.3rem] leading-tight font-medium tracking-tight">
                  <span className="mr-2 font-sans text-[12px] tracking-[0.16em] text-[var(--d-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--d-body)]">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — The evening, one movement at a time. A carousel rather than four
         cards, because the order is the point: a visitor is reading when things
         land, not comparing features. It turns on buttons and arrow keys, so
         nobody has to guess whether a swipe has an end. */}
      <section
        id={anchor.id("evening")}
        className="demo-reveal border-y border-[var(--d-line)] bg-[var(--d-soft)] px-4 py-14 @5xl:px-8 @5xl:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-5 @3xl:flex-row @3xl:items-end @3xl:justify-between @3xl:gap-10">
            <div className="max-w-2xl">
              <p className={`${label} text-[var(--d-accent-text)]`}>{r.evening.eyebrow}</p>
              <h2 className="mt-4 font-display text-[1.7rem] leading-[1.15] font-medium tracking-tight text-balance @3xl:text-[2.1rem]">
                {r.evening.title}
              </h2>
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-[var(--d-body)]">{r.evening.body}</p>
          </div>

          {/* Focusable, because the hint underneath promises it: "once a stage
              has focus, the arrow keys turn them". A group nobody can tab into
              makes that sentence a lie, so the region itself takes focus and the
              keys are read from inside it. */}
          <div
            role="group"
            aria-label={r.evening.title}
            onKeyDown={onEveningKey}
            tabIndex={0}
            className="rounded-[3px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)] @5xl:grid @5xl:grid-cols-[1fr_20rem] @5xl:items-start @5xl:gap-14"
          >
            <div key={eveningStage} className="demo-menu-fade">
              <h3 className="font-display text-[1.6rem] leading-tight font-medium tracking-tight @3xl:text-[2rem]">
                {evening.label}
              </h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.8] text-[var(--d-body)] @3xl:text-[17px]">
                {evening.line}
              </p>
              <p className="mt-5 max-w-xl border-l-2 border-[var(--d-accent)] pl-4 text-[14px] leading-relaxed text-[var(--d-fg)]">
                {evening.note}
              </p>
            </div>
            <PhotoSlot kind={evening.slot.kind} note={evening.slot.note} className="mt-8 aspect-[4/3] w-full @5xl:mt-1 @5xl:aspect-[4/5]" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--d-line)] pt-5">
            <button
              type="button"
              onClick={() => stepEvening(-1)}
              aria-label={r.evening.prev}
              className={`${actionIcon} ${actionLine}`}
            >
              <span aria-hidden="true">←</span>
              <span className="sr-only @3xl:not-sr-only">{r.evening.prev}</span>
            </button>
            <button
              type="button"
              onClick={() => stepEvening(1)}
              aria-label={r.evening.next}
              className={`${actionIcon} ${actionLine}`}
            >
              <span aria-hidden="true">→</span>
              <span className="sr-only @3xl:not-sr-only">{r.evening.next}</span>
            </button>
            <div role="group" aria-label={r.evening.dots} className="flex items-center gap-1.5">
              {r.evening.stages.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setStage(i)}
                  aria-label={`${r.evening.dots} ${i + 1}`}
                  aria-current={i === eveningStage ? "step" : undefined}
                  className={`inline-flex h-11 w-8 items-center justify-center rounded-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]`}
                >
                  <span
                    aria-hidden="true"
                    className={`block h-1.5 w-1.5 rounded-full transition-colors ${
                      i === eveningStage ? "bg-[var(--d-accent)]" : "bg-[var(--d-line-strong)]"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p role="status" className={`text-[var(--d-muted)] ${label}`}>
              {eveningStage + 1} {r.evening.of} {r.evening.stages.length}
            </p>
            <p className="ml-auto max-w-xs text-[12px] leading-relaxed text-[var(--d-muted)]">{r.evening.hint}</p>
          </div>
        </div>
      </section>

      {/* 6 — The card. Filterable, marked, and with nowhere for a number to sit. */}
      <section
        id={anchor.id("menu")}
        className="demo-reveal px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-5 @3xl:flex-row @3xl:items-end @3xl:justify-between @3xl:gap-10">
            <div>
              <p className={`${label} text-[var(--d-accent-text)]`}>{r.menu.eyebrow}</p>
              <h2 className="mt-3 font-display text-[2rem] leading-tight font-medium tracking-tight @3xl:text-[2.6rem]">
                {r.menu.title}
              </h2>
            </div>
            <p className="max-w-sm text-[13px] leading-relaxed text-[var(--d-body)]">{r.menu.lead}</p>
          </div>

          {/* An honest reason, printed once, where a diner expects the prices. */}
          <p className="mt-6 max-w-2xl border-l-2 border-[var(--d-accent)] pl-4 text-[14px] leading-relaxed text-[var(--d-fg)]">
            {r.menu.noPrices}
          </p>

          <div role="group" aria-label={r.menu.title} className="mt-8 flex flex-wrap gap-2">
            {r.menu.filters.map((f) => {
              const on = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={on}
                  className={`inline-flex min-h-11 cursor-pointer select-none items-center gap-2 rounded-[3px] border px-3.5 font-mono text-[13px] leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                    on
                      ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)]"
                      : "border-[var(--d-line-strong)] hover:bg-[var(--d-hover)]"
                  }`}
                >
                  {f.label}
                  {/* Every filter answers with a number it counted from the card,
                      so a filter can never look like a dead button. */}
                  <span className={on ? "opacity-70" : "text-[var(--d-muted)]"}>{countFor(f.key)}</span>
                </button>
              );
            })}
          </div>
          <p role="status" className="mt-4 font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--d-muted)]">
            {countFor(filter)} / {allCount} {r.menu.countNoun}
          </p>

          <div key={filter} className="demo-menu-fade">
            {sections.map((s) => {
              const dishes = s.dishes.filter((d) => matches(filter, d.marks));
              if (dishes.length === 0) return null;
              return (
                <div key={s.label} className="mt-12 first:mt-10">
                  <div className="@5xl:grid @5xl:grid-cols-[13rem_1fr] @5xl:gap-14">
                    <div>
                      <h3 className="font-display text-[1.3rem] leading-tight font-medium tracking-tight @3xl:text-[1.5rem]">
                        {s.label}
                      </h3>
                      <p className="mt-2 border-l-2 border-[var(--d-accent)] pl-3 text-[13px] leading-relaxed italic text-[var(--d-body)]">
                        {s.blurb}
                      </p>
                      {/* One plate per course, named rather than shot. In the
                          filtered view it steps aside: at three dishes the list is
                          the answer and the picture is noise. */}
                      {filter === "all" && (
                        <PhotoSlot kind={s.slot.kind} note={s.slot.note} className="mt-5 aspect-[4/3] w-full" />
                      )}
                    </div>
                    <ul className="mt-6 list-none p-0 @5xl:mt-0">
                      {dishes.map((d) => (
                        <li key={d.name} className="border-b border-dotted border-[var(--d-line-strong)] py-4 last:border-b-0">
                          <div className="flex items-baseline gap-3">
                            <h4 className="font-display text-[1.15rem] leading-snug font-medium tracking-tight @3xl:text-[1.3rem]">
                              {d.name}
                            </h4>
                            <span
                              aria-hidden="true"
                              className="min-w-6 flex-1 -translate-y-[3px] border-b border-dotted border-[var(--d-line-strong)]"
                            />
                            <span className="flex shrink-0 gap-1.5">
                              {d.marks.map((m) => (
                                <span
                                  key={m}
                                  className="inline-flex min-w-6 items-center justify-center rounded-[2px] border border-[var(--d-line-strong)] px-1 py-0.5 font-mono text-[12px] leading-none text-[var(--d-body)]"
                                >
                                  <span aria-hidden="true">{MARK_GLYPH[m] ?? m}</span>
                                  <span className="sr-only">{MARK_SPOKEN[m] ?? m}</span>
                                </span>
                              ))}
                            </span>
                          </div>
                          <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-[var(--d-body)]">{d.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <dl className="mt-12 grid gap-x-8 gap-y-3 border-t border-[var(--d-line)] pt-6 @3xl:grid-cols-2">
            {r.menu.legend.map((l) => (
              <div key={l.mark} className="flex items-baseline gap-3">
                <dt className="shrink-0 font-mono text-[12px] text-[var(--d-fg)]">
                  <span aria-hidden="true">{MARK_GLYPH[l.mark] ?? l.mark}</span>
                  <span className="sr-only">{MARK_SPOKEN[l.mark] ?? l.mark}</span>
                </dt>
                <dd className="text-[13px] leading-relaxed text-[var(--d-body)]">{l.means}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 border border-[var(--d-line-strong)] px-5 py-5">
            <p className={`${label} text-[var(--d-muted)]`}>One kitchen, one fire</p>
            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-[var(--d-body)]">{r.menu.allergy}</p>
          </div>
          <p className="mt-8 max-w-xl text-[13px] leading-relaxed text-[var(--d-muted)]">{r.menu.note}</p>
        </div>
      </section>

      {/* 7 — The room */}
      <section
        id={anchor.id("room")}
        className="demo-reveal bg-[var(--d-fg)] px-4 py-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-12 @5xl:grid-cols-[1.1fr_1fr] @5xl:items-start @5xl:gap-20">
          <div>
            <span aria-hidden="true" className="block h-px w-16 bg-[var(--d-accent-2)]" />
            <p className={`mt-6 ${label} ${inkEmber}`}>{r.room.eyebrow}</p>
            <h2 className={`mt-4 font-display text-[1.9rem] leading-[1.1] font-medium tracking-tight text-balance @3xl:text-[2.5rem] ${ink}`}>
              {r.room.title}
            </h2>
            {r.room.paras.map((p) => (
              <p key={p} className={`mt-5 max-w-lg text-[15px] leading-[1.8] ${inkBody} @5xl:text-[17px]`}>
                {p}
              </p>
            ))}
            {/* The room describing itself. Not a diner's words, not a press
                quote, and not a review the concept did not earn. */}
            <p className={`mt-8 max-w-lg font-display text-[1.3rem] leading-snug italic ${ink}`}>
              <span aria-hidden="true" className="mr-2 text-[var(--d-accent)]">“</span>
              {r.room.quote}
            </p>
          </div>
          <div className="@3xl:grid @3xl:grid-cols-[1.4fr_1fr] @3xl:items-end @3xl:gap-4">
            <PhotoSlot kind={r.room.tall.kind} note={r.room.tall.note} className="aspect-[3/4] w-full" />
            <PhotoSlot kind={r.room.small.kind} note={r.room.small.note} className="mt-4 aspect-[4/5] w-full @3xl:mt-0" />
          </div>
        </div>
      </section>

      {/* 8 — The long table. No submit button: a group is a conversation, so the
         ticket assembles itself as the fields change and the page never repeats
         the same "nothing was sent" answer twice. */}
      <section
        id={anchor.id("groups")}
        className="demo-reveal border-t border-[var(--d-line)] px-4 py-16 @5xl:mx-auto @5xl:max-w-7xl @5xl:px-8 @5xl:py-24"
      >
        <div className="@5xl:grid @5xl:grid-cols-[1fr_1.1fr] @5xl:gap-16">
          <div>
            <p className={`${label} text-[var(--d-accent-text)]`}>{r.groups.eyebrow}</p>
            <h2 className="mt-3 font-display text-[1.9rem] leading-tight font-medium tracking-tight text-balance @3xl:text-[2.4rem]">
              {r.groups.title}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-[var(--d-body)]">{r.groups.body}</p>
            <ul className="mt-7 list-none p-0">
              {r.groups.points.map((p) => (
                <li key={p} className="flex items-baseline gap-3 border-t border-[var(--d-line)] py-3.5 last:border-b">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--d-accent)]" />
                  <span className="text-[14px] leading-relaxed text-[var(--d-body)]">{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-lg text-[13px] leading-relaxed text-[var(--d-muted)]">{r.groups.callUs}</p>
            <div className="mt-4">
              {phoneHref ? (
                <a
                  href={phoneHref}
                  className="inline-flex min-h-11 items-center font-display text-[1.3rem] text-[var(--d-fg)] underline decoration-[var(--d-accent)] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                >
                  {r.header.phoneLabel}: {r.booking.phone.display}
                </a>
              ) : (
                <p className="font-display text-[1.3rem] text-[var(--d-fg)]">
                  {r.header.phoneLabel}: {r.booking.phone.display}
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 @5xl:mt-0">
            <div className="rounded-[4px] border border-[var(--d-line)] bg-[color-mix(in_srgb,var(--d-accent)_4%,var(--d-bg))] px-5 py-7 @3xl:px-7">
              <h3 className="font-display text-[1.5rem] leading-tight font-medium tracking-tight">
                {r.groups.title}
              </h3>
              <div className="mt-6 flex flex-col gap-6">
                <ChipChoice
                  legend={r.groups.fields.size}
                  name={`${uid}-band`}
                  options={r.groups.bands}
                  value={ask.size}
                  onSelect={(v) => setAsk((a) => ({ ...a, size: v }))}
                  hint={r.groups.points[0]}
                />
                <LedgerField id={`${uid}-gdate`} name={r.groups.fields.date}>
                  <input
                    ref={(el) => {
                      if (el && !el.min) el.min = todayISO();
                    }}
                    id={`${uid}-gdate`}
                    name="group-date"
                    type="date"
                    value={ask.date}
                    onChange={(e) => setAsk((a) => ({ ...a, date: e.target.value }))}
                    className={ledgerField}
                  />
                </LedgerField>
                <LedgerField id={`${uid}-gname`} name={r.groups.fields.name}>
                  <input
                    id={`${uid}-gname`}
                    name="group-name"
                    type="text"
                    autoComplete="name"
                    value={ask.name}
                    onChange={(e) => setAsk((a) => ({ ...a, name: e.target.value }))}
                    className={ledgerField}
                  />
                </LedgerField>
                <LedgerField id={`${uid}-gcontact`} name={r.groups.fields.contact}>
                  <input
                    id={`${uid}-gcontact`}
                    name="group-contact"
                    type="text"
                    autoComplete="email"
                    value={ask.contact}
                    onChange={(e) => setAsk((a) => ({ ...a, contact: e.target.value }))}
                    className={ledgerField}
                  />
                </LedgerField>
                <LedgerField id={`${uid}-gnotes`} name={r.groups.fields.notes}>
                  <textarea
                    id={`${uid}-gnotes`}
                    name="group-notes"
                    rows={3}
                    value={ask.notes}
                    onChange={(e) => setAsk((a) => ({ ...a, notes: e.target.value }))}
                    className={`${ledgerField} resize-y`}
                  />
                </LedgerField>
              </div>
            </div>

            {/* The ticket, written as the booking writes itself. */}
            <div className="mt-6 rounded-[4px] border border-[var(--d-line-strong)] bg-[var(--d-bg)] px-5 py-5 @3xl:px-6">
              <p className={`${label} text-[var(--d-accent-text)]`}>{r.groups.ticket.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--d-body)]">{r.groups.ticket.lead}</p>
              {ticketRows.length > 0 ? (
                <dl className="demo-menu-fade mt-4 border-t border-[var(--d-line)] font-mono text-[14px]">
                  {ticketRows.map((row) => (
                    <div
                      key={row.term}
                      className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-dotted border-[var(--d-line-strong)] py-2.5 @3xl:grid-cols-[9rem_1fr]"
                    >
                      <dt className={`${label} leading-relaxed text-[var(--d-muted)]`}>{row.term}</dt>
                      <dd className="leading-relaxed text-[var(--d-fg)] [overflow-wrap:anywhere]">{row.detail}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-4 border-t border-[var(--d-line)] pt-4 text-[13px] leading-relaxed text-[var(--d-muted)]">
                  {r.groups.ticket.empty}
                </p>
              )}
              <p className="mt-5 border-l-2 border-[var(--d-accent)] pl-4 text-[13px] leading-relaxed text-[var(--d-body)]">
                {r.groups.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9 — Reservations and the visit, one block: the last doubts live beside
         the last question. */}
      <section
        id={anchor.id("visit")}
        className="demo-reveal border-t border-[var(--d-line)] px-4 pt-16 pb-28 @3xl:pb-16 @5xl:px-8 @5xl:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className={`${label} text-[var(--d-accent-text)]`}>{r.booking.eyebrow}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-tight font-medium tracking-tight text-balance @3xl:text-[2.6rem]">
              {r.booking.title}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--d-body)] @3xl:text-[15px]">{r.booking.body}</p>
          </div>

          <div className="mt-12 @5xl:grid @5xl:grid-cols-[1.25fr_1fr] @5xl:items-start @5xl:gap-14">
            {sent ? (
              <div className="demo-menu-fade rounded-[4px] border border-[var(--d-accent)] bg-[color-mix(in_srgb,var(--d-accent)_6%,var(--d-bg))] px-5 py-8 @3xl:px-8">
                <h3
                  ref={done}
                  tabIndex={-1}
                  className="font-display text-[1.7rem] leading-tight font-medium tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--d-accent)] @3xl:text-[2rem]"
                >
                  {r.booking.confirm.title}
                </h3>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[var(--d-body)]">{r.booking.confirm.lead}</p>
                <dl className="mt-7 grid gap-px bg-[var(--d-line)] font-mono text-[14px]">
                  {receipt.map((row) => (
                    <div key={row.term} className="grid grid-cols-[7rem_1fr] gap-4 bg-[var(--d-bg)] px-4 py-3 @3xl:grid-cols-[10rem_1fr]">
                      <dt className={`${label} leading-relaxed text-[var(--d-muted)]`}>{row.term}</dt>
                      <dd className="leading-relaxed text-[var(--d-fg)] [overflow-wrap:anywhere]">{row.detail}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-7 border-l-2 border-[var(--d-accent)] pl-4 text-[14px] leading-relaxed text-[var(--d-body)]">
                  {c.formNote ?? DEMO_NOTE}
                </p>
                <button
                  type="button"
                  onClick={() => setSent(null)}
                  className={`${action} ${actionLine} mt-8`}
                >
                  {r.booking.confirm.edit}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(form);
                }}
                className="rounded-[4px] border border-[var(--d-line)] bg-[color-mix(in_srgb,var(--d-accent)_4%,var(--d-bg))] px-5 py-8 @3xl:px-8"
              >
                <div className="flex flex-col gap-7 @3xl:grid @3xl:grid-cols-2 @3xl:gap-x-8">
                  <LedgerField id={`${uid}-date`} name="Date" hint={r.booking.hints.date}>
                    <input
                      /* The floor is the visitor's own today. Read during render
                         it would differ between the server's clock and a browser
                         several hours ahead of it, so the attribute is set once the
                         element exists instead. */
                      ref={(el) => {
                        if (el && !el.min) el.min = todayISO();
                      }}
                      id={`${uid}-date`}
                      name="date"
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      className={ledgerField}
                    />
                  </LedgerField>

                  {form.date === "" ? (
                    <fieldset className="min-w-0 border-0 p-0">
                      <legend className={`${label} pb-2 text-[var(--d-muted)]`}>{r.booking.slotAsk}</legend>
                      <p className="max-w-md text-[13px] leading-relaxed text-[var(--d-body)]">{r.booking.hints.time}</p>
                    </fieldset>
                  ) : slots.length === 0 ? (
                    <fieldset className="min-w-0 border-0 p-0">
                      <legend className={`${label} pb-2 text-[var(--d-muted)]`}>
                        {r.booking.slotAsk} {spokenDate(form.date)}
                      </legend>
                      <p role="status" className="max-w-md text-[13px] leading-relaxed text-[var(--d-body)]">
                        {r.booking.slotNone}
                      </p>
                    </fieldset>
                  ) : (
                    <ChipChoice
                      legend={`${r.booking.slotAsk} ${spokenDate(form.date)}`}
                      name={`${uid}-time`}
                      options={slots}
                      value={chosenTime}
                      onSelect={(v) => set("time", v)}
                      required
                    />
                  )}

                  <div className="@3xl:col-span-2">
                    <ChipChoice
                      legend="Party"
                      name={`${uid}-party`}
                      options={r.booking.parties.map(String)}
                      value={form.party}
                      onSelect={(v) => set("party", v)}
                      hint={r.booking.hints.party}
                      required
                    />
                  </div>

                  <LedgerField id={`${uid}-name`} name="Name">
                    <input
                      id={`${uid}-name`}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={ledgerField}
                    />
                  </LedgerField>
                  <LedgerField id={`${uid}-email`} name="Email">
                    <input
                      id={`${uid}-email`}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={ledgerField}
                    />
                  </LedgerField>

                  <div className="@3xl:col-span-2">
                    <LedgerField id={`${uid}-occasion`} name="Occasion">
                      <select
                        id={`${uid}-occasion`}
                        name="occasion"
                        value={form.occasion}
                        onChange={(e) => set("occasion", e.target.value)}
                        className={`${ledgerField} cursor-pointer`}
                      >
                        {r.booking.occasions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </LedgerField>
                  </div>

                  <div className="@3xl:col-span-2">
                    <LedgerField id={`${uid}-notes`} name="Anything we should know" hint={r.booking.hints.notes}>
                      <textarea
                        id={`${uid}-notes`}
                        name="notes"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        className={`${ledgerField} resize-y`}
                      />
                    </LedgerField>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-[var(--d-line)] pt-6 @3xl:flex-row @3xl:items-center @3xl:justify-between">
                  <button type="submit" className={`${action} ${actionSolid} w-full @3xl:w-auto`}>
                    {r.booking.submit}
                  </button>
                  <p className="text-[13px] leading-relaxed text-[var(--d-body)] @3xl:max-w-[16rem]">{r.booking.note}</p>
                </div>
                <p className="mt-5 text-[12px] leading-relaxed text-[var(--d-muted)]">{r.booking.callUs}</p>
              </form>
            )}

            {/* The rail: the answers a form cannot give. */}
            <div className="mt-12 @5xl:mt-0">
              <h3 className={`${label} text-[var(--d-muted)]`}>{r.booking.hoursTitle}</h3>
              <ul className="mt-3 list-none p-0 font-mono text-[14px]">
                {week.map((d) => (
                  <li key={d.day} className="flex items-baseline justify-between gap-4 border-b border-dotted border-[var(--d-line)] py-2.5">
                    <span className="text-[var(--d-body)]">{d.day}</span>
                    <span className={d.open === null ? "text-[var(--d-muted)]" : "text-[var(--d-fg)]"}>{d.shown}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-[4px] border border-[var(--d-line-strong)] px-4 py-4">
                <p className={`${label} text-[var(--d-muted)]`}>{r.header.statusLead}</p>
                <p className={`mt-2 font-display text-[1.35rem] leading-snug ${status?.open ? "text-[var(--d-accent-text)]" : "text-[var(--d-fg)]"}`}>
                  {status ? status.line : r.header.openLine}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--d-muted)]">{r.booking.statusNote}</p>
              </div>

              <h3 className={`mt-9 ${label} text-[var(--d-muted)]`}>Where</h3>
              <address className="mt-3 text-[14px] leading-relaxed not-italic text-[var(--d-body)]">
                {r.booking.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                {phoneHref ? (
                  <a
                    href={phoneHref}
                    className="mt-2 inline-flex min-h-11 items-center text-[var(--d-fg)] underline decoration-[var(--d-accent)] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                  >
                    {r.booking.phone.display}
                  </a>
                ) : (
                  <span className="mt-2 block text-[var(--d-fg)]">{r.booking.phone.display}</span>
                )}
              </address>
              <dl className="mt-5 grid gap-4">
                <div>
                  <dt className={`${label} text-[var(--d-muted)]`}>Getting in</dt>
                  <dd className="mt-1.5 text-[13px] leading-relaxed text-[var(--d-body)]">{r.booking.access}</dd>
                </div>
                <div>
                  <dt className={`${label} text-[var(--d-muted)]`}>Parking</dt>
                  <dd className="mt-1.5 text-[13px] leading-relaxed text-[var(--d-body)]">{r.booking.parking}</dd>
                </div>
              </dl>

              <div className="mt-9 border-t border-[var(--d-line)] pt-6">
                <RoomPlan />
                <p className="mt-4 max-w-sm text-[12px] leading-relaxed text-[var(--d-muted)]">{r.booking.planNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — The transparency band: the questions a printed card cannot ask,
          including the one that costs the room a sale. */}
      <section
        id={anchor.id("how")}
        className="demo-reveal bg-[var(--d-fg)] px-4 py-16 @5xl:px-8 @5xl:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className={`${label} ${inkEmber}`}>{r.how.eyebrow}</p>
            <h2 className={`mt-3 font-display text-[1.8rem] leading-tight font-medium tracking-tight text-balance @3xl:text-[2.2rem] ${ink}`}>
              {r.how.title}
            </h2>
            <p className={`mt-4 text-[14px] leading-relaxed ${inkBody}`}>{r.how.body}</p>
          </div>
          <ul className="mt-10 list-none p-0 @3xl:grid @3xl:grid-cols-2 @3xl:gap-x-12 @3xl:gap-y-8">
            {r.how.points.map((p, i) => (
              <li key={p.title} className={`border-t ${i === r.how.points.length - 1 ? "border-b" : ""} py-5 @3xl:border-b-0`}>
                <h3 className={`font-display text-[1.3rem] leading-tight font-medium tracking-tight ${ink}`}>
                  {/* The band's own ember ink, not `--d-accent-2`: that olive is a
                      fill, and measured at 4.39:1 as 12px text on this brown it is
                      just under AA. */}
                  <span className={`mr-2 font-sans text-[12px] tracking-[0.16em] ${inkEmber}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.title}
                </h3>
                <p className={`mt-2.5 max-w-xl text-[14px] leading-relaxed ${inkBody}`}>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11 — Before you book */}
      <section className="demo-reveal px-4 py-16 @5xl:mx-auto @5xl:max-w-5xl @5xl:px-8 @5xl:py-20">
        <p className={`${label} text-[var(--d-accent-text)]`}>{c.faqTitle}</p>
        <DemoFaq items={c.faqs ?? []} />
      </section>

      {/* 12 — Colophon */}
      <footer className="border-t border-[var(--d-line)] px-4 py-14 @5xl:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 @3xl:grid-cols-2 @5xl:grid-cols-4">
          <div>
            <span className={`${label} block font-display font-semibold`}>{c.navName}</span>
            <p className="mt-4 max-w-xs text-[12px] leading-relaxed text-[var(--d-muted)]">{DEMO_NOTE}</p>
          </div>
          <div>
            <h3 className={`${label} text-[var(--d-muted)]`}>{r.booking.hoursTitle}</h3>
            <ul className="mt-3 list-none p-0">
              {week.map((d) => (
                <li key={d.day} className="text-[13px] leading-relaxed text-[var(--d-body)]">
                  {d.day} — {d.shown}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={`${label} text-[var(--d-muted)]`}>Find us</h3>
            <address className="mt-3 text-[13px] leading-relaxed not-italic text-[var(--d-body)]">
              {r.booking.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-1 block text-[var(--d-fg)]">{r.booking.phone.display}</span>
            </address>
            <p className="mt-3 text-[12px] leading-relaxed text-[var(--d-muted)]">
              {status ? status.line : r.header.openLine}
            </p>
          </div>
          <div>
            <h3 className={`${label} text-[var(--d-muted)]`}>On this page</h3>
            <ul className="mt-3 flex flex-col gap-1.5 list-none p-0">
              {[...navItems, ["The Room", "room"], ["How We Cook", "how"]].map(([text, section]) => (
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
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--d-muted)]">
            {r.header.concept}
          </p>
          <DemoBackLink />
        </div>
      </footer>

      <DemoStickyCta
        label={bookLabel}
        href={anchor.href("visit")}
        secondary={
          phoneHref
            ? { label: r.header.phoneLabel, href: phoneHref }
            : undefined
        }
      />

      {/* Machine-readable hours, on the concept's own full-page route only: the
          homepage mounts this demo twice and a fictional restaurant should not be
          described to a crawler three times over. */}
      {!preview && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </DemoVars>
  );
}
