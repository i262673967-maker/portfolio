"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { DemoProps } from "./_shared";
import {
  DEMO_NOTE,
  Btn,
  DemoAction,
  DemoBackLink,
  DemoFaq,
  DemoHeading,
  DemoImage,
  DemoMobileMenu,
  DemoNav,
  DemoVars,
  useDemoAnchors,
  type DemoNavItem,
} from "./_shared";

/* 02 — Marigold Kitchen: modern South Asian cooking in the West Loop, built in
   the order the supplied page reads a restaurant in.

   The page opens on the hours, because the first question a diner asks is
   whether the room is serving. The one claim it makes about the world — open or
   closed — is arithmetic on the hours table printed further down this page, read
   in America/Chicago rather than on the visitor's device clock, so a diner in
   Berlin and a host in Chicago read the same chip. Then the meal is told in four
   courses before the card is shown at all: a pinned plate that answers the
   scroll on the wide layout, and a real snap carousel with dots, arrows and a
   live count on the narrow one. The card is typographic, priced in bare numbers,
   and filters five ways over all twenty-four dishes — with the spice filter
   catching mild as well as medium and hot, because that is what the source's own
   button says. Both forms validate, read their own answers back as statements,
   and say in the same breath that nothing left the page.

   All copy comes from project.content.restaurant. The plate drawings, the map
   card and the flame marks are the only things here that are not, because they
   are pictures rather than claims — and the nine photographs are licensed plates
   that the story band itself names as stand-ins. */

/* The source's nav is short: five bands a visitor is meant to jump to, drawn
   from `restaurant.nav` so the header, the phone sheet and the footer can never
   name a band differently. */
const wrap = "mx-auto w-full max-w-6xl px-4 @3xl:px-8";

const eyebrow =
  "font-display text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--d-accent-text)]";
const bandTitle =
  "font-display text-[28px] leading-[1.06] tracking-[-0.015em] @3xl:text-[42px] @5xl:text-[50px]";
const bandLead = "text-[15px] leading-[1.7] text-[var(--d-body)] @3xl:text-[17px]";
const running = "text-[15px] leading-[1.75] text-[var(--d-body)]";
const faint = "text-[13px] leading-[1.6] text-[var(--d-muted)]";
const cardBox =
  "rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] p-4 @3xl:p-6";
const hairline = "border-[var(--d-line)]";

const actionBase =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-[12px] font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
const solid = `bg-[var(--d-accent)] text-[var(--d-on-accent)] ${actionBase}`;
const quiet = `border border-[var(--d-line-strong)] text-[var(--d-body)] hover:bg-[var(--d-hover)] ${actionBase}`;

/* Every control in both forms is 44px tall and 16px on the input: below either
   one a phone zooms to type, which is the defect these floors exist to prevent. */
const field =
  "w-full min-h-11 rounded-xl border border-[var(--d-line-strong)] bg-[var(--d-field)] px-3.5 py-2.5 text-[16px] leading-normal text-[var(--d-fg)] [color-scheme:light] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]";
const fieldLabel =
  "flex min-h-11 items-center gap-1 font-display text-[14px] font-semibold text-[var(--d-body)]";
const chipLabel =
  "inline-flex min-h-11 min-w-11 cursor-pointer select-none items-center justify-center rounded-full border border-[var(--d-line-strong)] px-4 text-[14px] font-semibold transition-colors hover:bg-[var(--d-hover)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--d-accent)]";
const chipOn =
  "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-accent)] hover:bg-[var(--d-accent)]";

/* The filter keys are the source's vocabulary; `DIET_KEY` is the only place that
   knows which of them is a dish mark and which one is the spice ladder. */
const DIET_KEY: Record<string, "veg" | "vegan" | "gf"> = {
  vegetarian: "veg",
  vegan: "vegan",
  gf: "gf",
};

type ServiceDay = {
  day: string;
  dow: number;
  open: number | null;
  close: number;
  shown: string;
};

type Booking = { date: string; time: string; party: string; name: string; email: string; notes: string };

type Enquiry = { size: string; date: string; notes: string };

/* Minutes from midnight to the printed 24-hour form — the same arithmetic the
   hours table is written in, so a slot and a printed range can never disagree. */
function minutesToTime(mins: number) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
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

/* --- the weekday join, and the rule that keeps it honest ---------------------
   `booking.week` gives every day a display name and a number, and no third field
   to join on. A lookup that starts from what the clock says HAS to go through the
   name: the pinned clock spells Saturday "Sat", the printed table spells it
   "Saturday", and the first three letters are the only form the two share. A
   lookup that starts from a calendar date already holds the number and uses it.

   Both are only safe while no two rows answer to the same three letters — which
   is a fact about the authored copy, not about this file, so it is checked here
   rather than assumed. `assertWeekPrefixes` runs over the table the first time
   either lookup asks it a question and throws if the prefixes collide; the thing
   to fix is `booking.week`, never the lookup. `weekRow` is the only path either
   lookup takes, and a miss throws instead of returning a default: the alternative
   was a chip confidently naming the wrong day, or a ticket printing a date with no
   weekday in it — both of which read as answers while being neither. */
const WEEK_PREFIX = 3;

const assertedWeeks = new WeakSet<ServiceDay[]>();

function assertWeekPrefixes(week: ServiceDay[]) {
  if (assertedWeeks.has(week)) return week;
  const seen = new Map<string, string>();
  for (const day of week) {
    const prefix = day.day.slice(0, WEEK_PREFIX);
    const clash = seen.get(prefix);
    if (clash !== undefined) {
      throw new Error(
        `booking.week: "${clash}" and "${day.day}" share their first ${WEEK_PREFIX} letters, ` +
          `so a weekday looked up by prefix cannot name one day unambiguously. Fix the row in ` +
          "booking.week (src/lib/data.ts); this component keeps no name list of its own to paper over it.",
      );
    }
    seen.set(prefix, day.day);
  }
  assertedWeeks.add(week);
  return week;
}

function weekRow(
  week: ServiceDay[],
  matches: (day: ServiceDay) => boolean,
  wanted: string,
): ServiceDay {
  assertWeekPrefixes(week);
  const row = week.find(matches);
  if (!row) {
    throw new Error(
      `booking.week has no row for ${wanted}, so the open/closed chip and the reservation ticket ` +
        "would have no printed weekday to agree with. Add or correct the row in booking.week.",
    );
  }
  return row;
}

/* The date said out loud, in the order a printed card would say it: the harness
   reads "Wednesday" off the ticket and off the slot legend, so the weekday has
   to be in the string rather than implied by a number. Both words come from
   outside the component: the weekday is the hours table's own word for that day
   — the seven names the page prints — and the month is the same Chicago-pinned
   formatter the clock is read with. Nothing here holds a private list of names,
   so the ticket cannot say a day the printed table disagrees with; and because
   the row comes out of `weekRow`, a date the table cannot answer is an error
   rather than a bare "24 October 2026" with the weekday quietly missing. */
function spokenDate(iso: string, week: ServiceDay[]) {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d) return iso;
  const weekday = weekRow(week, (w) => w.dow === dayOf(iso), `the weekday of ${iso}`).day;
  /* Noon UTC: a plain ISO date parses as midnight, and read back in Chicago that
     is the evening before, which would name the wrong month at a boundary. */
  const month = ZONED_MONTH.format(new Date(Date.UTC(y, m - 1, d, 12)));
  return `${weekday} ${d} ${month} ${y}`.trim();
}

/* The address as the page prints it: the street on one line, the city and the
   state on the next — the two lines the concept has always shown, now read off
   the three named fields the machine-readable card is assembled from rather
   than a tuple whose second entry quietly held both. */
const addressLines = (a: { street: string; locality: string; region: string }) => [
  a.street,
  `${a.locality}, ${a.region}`,
];

/* --- the clock, read in the kitchen's time zone -------------------------------
   The old chip read the visitor's device clock and called it the room's status:
   a diner two time zones away was told the kitchen was open at an hour it was
   shut. These two formatters pin the reading to America/Chicago, so the chip,
   the hours card, the footer and the reservation grid all answer to the same
   clock regardless of whose machine the page is sitting on. */
const CHICAGO = "America/Chicago";

const ZONED_CLOCK = new Intl.DateTimeFormat("en-US", {
  timeZone: CHICAGO,
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const ZONED_DATE = new Intl.DateTimeFormat("en-US", {
  timeZone: CHICAGO,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/* The month spelled out, on the same pinned clock as everything else, so the
   ticket's date is read with the room's calendar rather than a name list the
   component keeps for itself. */
const ZONED_MONTH = new Intl.DateTimeFormat("en-US", {
  timeZone: CHICAGO,
  month: "long",
});

const part = (
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes,
) => parts.find((p) => p.type === type)?.value ?? "";

function chicagoNow(now: Date, week: ServiceDay[]) {
  const clock = ZONED_CLOCK.formatToParts(now);
  const short = part(clock, "weekday");
  return {
    /* The day NUMBER is taken from the printed table's own row, matched on the
       first three letters of the name it shows — the abbreviated form the footer
       prints — because that prefix is all `Intl`'s short weekday and the authored
       name share. `assertWeekPrefixes` is what makes that safe rather than merely
       true today: no two rows may answer to the same three letters, and a short
       weekday the table cannot answer throws here instead of returning `-1`, which
       the chip would have rendered as a quiet "closed". */
    dow: weekRow(week, (d) => d.day.slice(0, WEEK_PREFIX) === short, `a weekday spelled "${short}"`).dow,
    mins: Number(part(clock, "hour")) * 60 + Number(part(clock, "minute")),
  };
}

/* Chicago's own today, which is what the date field may be filled with. Using
   the device's date instead would close off a lunch the room has not served
   yet, or offer a dinner it already cleared. */
function chicagoTodayISO(now: Date) {
  const p = ZONED_DATE.formatToParts(now);
  return `${part(p, "year")}-${part(p, "month")}-${part(p, "day")}`;
}

type StatusWords = {
  open: string;
  opensToday: string;
  opensTomorrow: string;
  opensDay: string;
};

const templated = (tpl: string, time: string, day?: string) =>
  tpl.replace("{time}", time).replace("{day}", day ?? "");

/* Open or closed — computed, never asserted. `{time}` and `{day}` are filled
   from the printed hours table, so the claim on the chip is arithmetic on the
   table underneath it and nothing else. */
function statusAt(now: Date, week: ServiceDay[], words: StatusWords) {
  const { dow, mins } = chicagoNow(now, week);
  const today = week.find((w) => w.dow === dow);
  if (today && today.open !== null) {
    if (mins >= today.open && mins < today.close) {
      return templated(words.open, minutesToTime(today.close));
    }
    if (mins < today.open) return templated(words.opensToday, minutesToTime(today.open));
  }
  for (let ahead = 1; ahead <= 7; ahead++) {
    const next = week.find((w) => w.dow === (dow + ahead) % 7);
    if (next && next.open !== null) {
      return ahead === 1
        ? templated(words.opensTomorrow, minutesToTime(next.open))
        : templated(words.opensDay, minutesToTime(next.open), next.day);
    }
  }
  return null;
}

/* The seating grid for one date, counted out of the same week table the hours
   are printed from: half-hour steps from the opening until the last seating
   before the close. A list of times that cannot be reconciled with the printed
   hours is a lie a diner finds out at the door, so nothing here is hand-listed.
   `after` drops the seatings Chicago has already served today. */
function slotsOn(
  iso: string,
  week: ServiceDay[],
  step: number,
  lastSeating: number,
  after: number | null,
) {
  const dow = dayOf(iso);
  if (dow === null) return [];
  const day = week.find((w) => w.dow === dow);
  if (!day || day.open === null) return [];
  const out: string[] = [];
  for (let m = day.open; m <= day.close - lastSeating; m += step) {
    if (after !== null && m <= after) continue;
    out.push(minutesToTime(m));
  }
  return out;
}

/* The clock only changes once a minute, so the tick is read through the store
   contract rather than setState in an effect: the snapshot is stable, and no
   render is scheduled the page has no use for. The server snapshot is
   deliberately out of range — nothing is claimed about a clock the server
   cannot see, and the chip prints the week's shape until the browser reads one. */
function subscribeMinute(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 20000);
  return () => window.clearInterval(id);
}

function readMinute() {
  return Math.floor(Date.now() / 60000);
}

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* The journey has to follow the scroll that is actually moving, and inside a
   device frame that is not the window: it is the frame's own scroll box. This
   walks up for the first element that can scroll vertically and hands back
   `null` when the document itself is the scroller. */
function scrollHost(el: HTMLElement) {
  let node = el.parentElement;
  while (node) {
    const style = getComputedStyle(node);
    if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

/* --- drawings -----------------------------------------------------------------
   None of these are claims about the room; they are the parts of a restaurant
   page a concept can draw rather than photograph, and each holds still at rest
   so a visitor who asked for no motion sees the finished thing. */

function Flame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 16" aria-hidden="true" className={`marigold-flame h-4 w-3 shrink-0 ${className}`}>
      <path
        d="M6 0.8c1.5 1.9 2.7 2.9 3.5 4.4a5.4 5.4 0 0 1-1.2 6.4c-.7.6-1.6.9-2.4.7.6-.9.8-1.9.5-2.9-.3-.9-1-1.6-1.6-2.3-.4.5-.6 1.1-.6 1.8 0 .8.3 1.6.9 2.2-.9 0-1.8-.4-2.4-1.1A5.3 5.3 0 0 1 1.5 7C2.4 4.6 4.3 3.1 6 0.8Z"
        fill="var(--d-accent)"
      />
    </svg>
  );
}

/* The four courses drawn on one plate. Each group is a course and only the
   chosen one is inked; the crossfade is opacity alone, so the drawing at rest is
   a plate with a course on it rather than a half-faded ghost. */
function PlateCourses({ count, active }: { count: number; active: number }) {
  return (
    <svg viewBox="0 0 240 240" aria-hidden="true" className="h-full w-full">
      <circle cx="120" cy="120" r="104" fill="var(--d-soft)" stroke="var(--d-line-strong)" strokeWidth="1.5" />
      <circle cx="120" cy="120" r="78" fill="none" stroke="var(--d-line)" strokeWidth="1.5" />
      {Array.from({ length: count }, (_, i) => (
        <g
          key={i}
          className="plate-course transition-opacity duration-500"
          opacity={i === active ? 1 : 0}
          fill="none"
          stroke="var(--d-accent)"
          strokeWidth="4"
          strokeLinecap="round"
        >
          {i === 0 && (
            <>
              <path d="M84 108c12-10 26-12 38-6" />
              <circle cx="138" cy="98" r="9" fill="var(--d-accent-2, var(--d-accent))" stroke="none" />
              <path d="M96 138c14 8 30 8 44 0" />
            </>
          )}
          {i === 1 && (
            <>
              <path d="M78 132h84" />
              <path d="M92 118v28M120 112v34M148 118v28" />
            </>
          )}
          {i === 2 && (
            <>
              <path d="M88 112a34 34 0 0 1 64 0" />
              <path d="M80 128h80" />
              <path d="M104 100c8-6 18-6 26 0" />
            </>
          )}
          {i === 3 && (
            <>
              <path d="M100 132c0-18 8-30 20-30s20 12 20 30Z" />
              <path d="M92 140h56" />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

/* The map card: the source shows a map, and there is no map to show for a street
   that is invented. So the drawing is labelled as a placeholder and says so in
   the card's own words rather than faking a pin. */
function MapCard({ name, note }: { name: string; note: string }) {
  return (
    <div className={`marigold-map relative overflow-hidden rounded-2xl border ${hairline} bg-[var(--d-soft)]`}>
      <svg viewBox="0 0 320 200" aria-hidden="true" className="h-[200px] w-full @5xl:h-[240px]">
        <rect width="320" height="200" fill="var(--d-soft)" />
        <path d="M0 62h320M0 138h320" stroke="var(--d-line-strong)" strokeWidth="6" opacity="0.5" />
        <path d="M96 0v200M228 0v200" stroke="var(--d-line-strong)" strokeWidth="6" opacity="0.5" />
        <rect x="120" y="76" width="82" height="46" rx="4" fill="var(--d-card)" stroke="var(--d-line-strong)" />
        <path className="marigold-pin" d="M161 96c-6 0-11 5-11 11 0 8 11 19 11 19s11-11 11-19c0-6-5-11-11-11Z" fill="var(--d-accent)" />
        <circle cx="161" cy="107" r="4" fill="var(--d-on-accent)" />
      </svg>
      <p className="absolute inset-x-0 bottom-0 bg-[var(--d-card)] px-3 py-2 text-[12px] leading-relaxed text-[var(--d-muted)]">
        <span className="font-display font-semibold text-[var(--d-body)]">{name}</span> — {note}
      </p>
    </div>
  );
}

/* A dish's diet marker: the letter the printed card carries, with the filter's
   own label spoken to a screen reader, so nothing is spelled twice in prose. */
function MarigoldMark({
  mark,
  glyph,
  word,
}: {
  mark: string;
  glyph: string;
  word: string;
}) {
  return (
    <span
      className="marigold-spice inline-flex items-center rounded-full border border-[var(--d-line-strong)] px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--d-body)]"
      data-mark={mark}
    >
      <span aria-hidden="true">{glyph}</span>
      <span className="sr-only">{word}</span>
    </span>
  );
}

function BandHead({
  band,
  lead,
  title,
  body,
}: {
  band: string;
  lead?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className={eyebrow}>{band}</p>
      <DemoHeading className={`mt-2 ${bandTitle} text-[var(--d-fg)]`}>{title}</DemoHeading>
      {lead && <p className={`mt-3 ${bandLead}`}>{lead}</p>}
      {body && <p className={`mt-3 ${running}`}>{body}</p>}
    </div>
  );
}

/* A picture slot, or the label that stands in for one. Marigold is shipped with
   nine licensed plates, so every slot it fills today is filled; the labelled
   drawing is what a concept with no photograph of a room it does not have gets,
   and it keeps `next/image` from ever being handed an empty src. */
function Slot({
  slot,
  sizes,
  className,
  preload = false,
  imgClassName = "",
}: {
  slot: { kind: string; note: string; src?: string; alt?: string };
  sizes: string;
  className: string;
  preload?: boolean;
  imgClassName?: string;
}) {
  if (!slot.src || !slot.alt) {
    return (
      <div
        className={`flex flex-col justify-end gap-1 border border-[var(--d-line-strong)] bg-[var(--d-soft)] p-3 ${className}`}
      >
        <span className="font-display text-[14px] text-[var(--d-body)]">{slot.kind}</span>
        <span className={`text-[12px] leading-relaxed ${faint}`}>{slot.note}</span>
      </div>
    );
  }
  return (
    <DemoImage
      src={slot.src}
      alt={slot.alt}
      sizes={sizes}
      preload={preload}
      imgClassName={imgClassName}
      className={className}
    />
  );
}

export default function RestaurantDemo({ project, preview }: DemoProps) {
  const anchor = useDemoAnchors();

  /* Everything the Marigold layout needs from `restaurant`, pulled out before the
     hooks so the hooks can read them, and checked once below: a concept instance
     without these bands renders nothing rather than half a page. */
  const c = project.content;
  const r = c?.restaurant;
  const stages = r?.evening.stages ?? [];
  const week: ServiceDay[] = r?.booking.week ?? [];
  const visit = r?.visit;
  const footer = r?.footer;
  const bar = r?.mobileBar;
  const specials = r?.specials;
  const faqLede = r?.faqLede;
  const faqEyebrow = r?.faqEyebrow;
  const bFields = r?.booking.fields;
  const slotClosed = r?.booking.slotClosed;
  const directions = r?.booking.directions;
  const policyTitle = r?.booking.policyTitle;
  const gSubmit = r?.groups.submit;
  const gNotes = r?.groups.notesPlaceholder;
  const gImage = r?.groups.image;
  const plateLabel = r?.evening.plateLabel;
  const aside = r?.evening.aside;
  const quoteCite = r?.room.quoteCite;
  const provenance = r?.room.provenance;

  const [course, setCourse] = useState(0);
  const [filter, setFilter] = useState("all");
  const [sent, setSent] = useState<Booking | null>(null);
  const [form, setForm] = useState<Booking>({
    date: "",
    time: "",
    party: "2",
    name: "",
    email: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof Booking, string>>>({});
  const [ask, setAsk] = useState<Enquiry>({ size: "", date: "", notes: "" });
  const [askErrors, setAskErrors] = useState<Partial<Record<keyof Enquiry, string>>>({});
  const [askSent, setAskSent] = useState<Enquiry | null>(null);

  const journeyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const ticketRef = useRef<HTMLHeadingElement>(null);
  const slipRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const slotsRef = useRef<HTMLFieldSetElement>(null);
  const sizeRef = useRef<HTMLSelectElement>(null);
  const gDateRef = useRef<HTMLInputElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const tick = useSyncExternalStore(subscribeMinute, readMinute, () => -1);

  /* The wide layout pins the plate against its own scroll: the section is four
     courses tall, so where the visitor has got to is which course they are on.
     The narrow layout has no stage to move and the carousel answers its own
     scroll instead, so each reader steps aside for the other. */
  useEffect(() => {
    const sect = journeyRef.current;
    if (!sect || stages.length < 2) return;
    const host = scrollHost(sect);
    let frame = 0;

    const measure = () => {
      frame = 0;
      const stage = stageRef.current;
      if (!stage || stage.offsetWidth === 0) return;
      const view = host ? host.clientHeight : window.innerHeight;
      const range = sect.offsetHeight - view;
      if (range <= 0) return;
      const progress = -sect.getBoundingClientRect().top / range;
      const next = Math.max(0, Math.min(stages.length - 1, Math.floor(progress * stages.length)));
      setCourse((cur) => (cur === next ? cur : next));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const target: EventTarget = host ?? window;
    measure();
    target.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [stages.length]);

  /* The ticket replaces the form, so the heading it appears under is where a
     keyboard visitor has to be put — an effect runs on the commit that renders
     it, which a callback frame cannot promise. */
  useEffect(() => {
    if (!sent) return;
    const el = ticketRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: "start", behavior: prefersReduced() ? "auto" : "smooth" });
  }, [sent]);

  useEffect(() => {
    if (!askSent) return;
    const el = slipRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: "start", behavior: prefersReduced() ? "auto" : "smooth" });
  }, [askSent]);

  /* How tall the sticky header actually is, published for the pinned filter rail
     to sit under. The rail's offset used to be two magic numbers, and they drifted
     apart from the header the first time the hours board wrapped: at 834 the rail
     lost 26px to the header, at 1280 5px, and on a phone the header is 294px of
     two wrapping bands, which is why the rail does not pin there at all.
     The measurement is live rather than one-shot because the header's height is
     the thing that changes — the nav wrapping, the status chip wrapping, the board
     reflowing. It is written on the shell, not on `document.documentElement`:
     inside a device frame several concepts share one document, and a var on the
     root would let the tallest of them aim the rail of all the others. */
  useEffect(() => {
    const header = headerRef.current;
    const shell = shellRef.current;
    if (!header || !shell || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      shell.style.setProperty(
        "--marigold-header-h",
        `${Math.round(header.getBoundingClientRect().height)}px`,
      );
    });
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  if (!c || !r || !visit || !footer || !bar || !specials || !faqLede || !faqEyebrow) return null;
  if (!bFields || !slotClosed || !directions || !policyTitle) return null;
  if (!gSubmit || !gNotes || !gImage || !plateLabel || !aside || !quoteCite || !provenance) {
    return null;
  }

  const b = r.booking;
  const g = r.groups;
  const navItems: DemoNavItem[] = [
    [r.nav.journey, "journey"],
    [r.nav.menu, "menu"],
    [r.nav.story, "story"],
    [r.nav.groups, "groups"],
    [r.nav.visit, "visit"],
  ];

  const phoneHref = preview ? undefined : b.phone.href;
  const status = tick < 0 ? null : statusAt(new Date(tick * 60000), week, r.status);
  /* The dot in the chip needs the plain yes/no underneath the sentence, because
     the CSS ring is only honest while the room is actually open. Same printed
     week table, same Chicago clock as the line above it; `undefined` while the
     browser has not read a clock yet, which is also the hydration snapshot, so
     the attribute can never appear out of step with the server HTML. */
  const openState =
    tick < 0
      ? undefined
      : (() => {
          const { dow, mins } = chicagoNow(new Date(tick * 60000), week);
          const today = week.find((w) => w.dow === dow);
          return !!today && today.open !== null && mins >= today.open && mins < today.close;
        })();
  /* Before the browser has read a clock the chip says nothing about one: the
     week's shape is the honest placeholder, and it is a string the concept owns. */
  const statusLine = status ?? r.header.openLine;

  const todayISO = tick < 0 ? "" : chicagoTodayISO(new Date(tick * 60000));
  /* Which row of the printed hours table is today, on the same Chicago clock as
     everything else on this list. `null` while the browser has not read a clock
     — the server snapshot and the hydration pass both render no mark at all, so
     this cannot put the page out of step with its own HTML, exactly the discipline
     `data-open` above follows. */
  const todayDow = todayISO ? dayOf(todayISO) : null;
  /* A seating that Chicago has already served cannot be asked for; later days
     keep the whole grid. */
  const servedMinutes =
    tick >= 0 && todayISO && form.date === todayISO ? chicagoNow(new Date(tick * 60000), week).mins : null;
  const dayClosed = form.date ? week.find((w) => w.dow === dayOf(form.date))?.open === null : false;
  const slots = slotsOn(form.date, week, b.stepMinutes, b.lastSeatingMinutes, servedMinutes);
  const chosenTime = slots.includes(form.time) ? form.time : "";

  const partyWord = (p: string) => (Number(p) === 1 ? b.confirm.guestOne : b.confirm.guestMany);

  const sections = r.menu.sections;
  const markLabel = (mark: string) => {
    const key = Object.keys(DIET_KEY).find((k) => DIET_KEY[k] === mark);
    return r.menu.filters.find((f) => f.key === key)?.label ?? mark;
  };
  const matches = (dish: { marks: string[]; spice?: number }) => {
    if (filter === "all") return true;
    if (filter === "spicy") return (dish.spice ?? 0) >= 1;
    return dish.marks.includes(DIET_KEY[filter] ?? filter);
  };
  const groups = sections
    .map((s) => ({ ...s, dishes: s.dishes.filter(matches) }))
    .filter((s) => s.dishes.length > 0);
  const shownCount = groups.reduce((n, s) => n + s.dishes.length, 0);

  const courseStage = stages[Math.min(course, stages.length - 1)];

  const goCourse = (next: number) => {
    if (stages.length === 0) return;
    const i = (next + stages.length) % stages.length;
    setCourse(i);
    const track = trackRef.current;
    const card = cardRefs.current[i];
    /* The carousel only moves when it is the layout being shown; on the wide
       layout the plate is already the answer to the arrow. */
    if (track && card && track.offsetWidth > 0) {
      track.scrollTo({ left: card.offsetLeft, behavior: prefersReduced() ? "auto" : "smooth" });
    }
  };

  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track || track.offsetWidth === 0 || stages.length < 2) return;
    const span = track.scrollWidth - track.clientWidth;
    if (span <= 0) return;
    const i = Math.round((track.scrollLeft / span) * (stages.length - 1));
    const next = Math.max(0, Math.min(stages.length - 1, i));
    setCourse((cur) => (cur === next ? cur : next));
  };

  const onCourseKey = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goCourse(course + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goCourse(course - 1);
    }
  };

  const set = <K extends keyof Booking>(key: K, value: Booking[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setFormErrors((e) => ({ ...e, [key]: undefined }));
  };

  const setAskField = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setAsk((a) => ({ ...a, [key]: value }));
    setAskErrors((e) => ({ ...e, [key]: undefined }));
  };

  /* The receipt is the form's own questions, answered in the concept's words
     rather than echoed as the labels they were asked with. */
  const receipt: { term: string; detail: string }[] = sent
    ? [
        { term: bFields.date, detail: spokenDate(sent.date, week) },
        { term: b.confirm.timeTerm, detail: sent.time },
        { term: bFields.party, detail: `${sent.party} ${partyWord(sent.party)}` },
        { term: bFields.name, detail: sent.name.trim() },
        { term: bFields.email, detail: sent.email.trim() },
        ...(sent.notes.trim() ? [{ term: bFields.notes, detail: sent.notes.trim() }] : []),
      ]
    : [];

  const slipRows = askSent
    ? [
        { term: g.fields.size, detail: askSent.size },
        { term: g.fields.date, detail: spokenDate(askSent.date, week) },
        ...(askSent.notes.trim() ? [{ term: g.fields.notes, detail: askSent.notes.trim() }] : []),
      ]
    : [];

  /* The enquiry assembles itself as it is filled, which is the source's own
     behaviour — but nothing is tabbable in the preview, so focus only lands on a
     heading the visitor asked for. */
  const previewRows = [
    { term: g.fields.size, detail: ask.size },
    { term: g.fields.date, detail: ask.date ? spokenDate(ask.date, week) : "" },
    { term: g.fields.notes, detail: ask.notes.trim() },
  ].filter((row) => row.detail);

  const submitBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found: Partial<Record<keyof Booking, string>> = {};
    if (!form.date) found.date = b.errors.date;
    if (!chosenTime) found.time = b.errors.time;
    if (!form.name.trim()) found.name = b.errors.name;
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(form.email.trim())) found.email = b.errors.email;
    setFormErrors(found);
    if (Object.keys(found).length > 0) {
      if (found.date) dateRef.current?.focus();
      else if (found.time) slotsRef.current?.querySelector("input")?.focus();
      else if (found.name) nameRef.current?.focus();
      else emailRef.current?.focus();
      return;
    }
    setSent({ ...form, time: chosenTime });
  };

  const submitEnquiry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found: Partial<Record<keyof Enquiry, string>> = {};
    if (!ask.size) found.size = g.errors.size;
    if (!ask.date) found.date = g.errors.date;
    setAskErrors(found);
    if (Object.keys(found).length > 0) {
      if (found.size) sizeRef.current?.focus();
      else gDateRef.current?.focus();
      return;
    }
    setAskSent({ ...ask });
  };

  /* The machine-readable room. It takes reservations in exactly one field, and
     that field says it does not: `acceptsReservations: "False"`, because a page
     that cannot hold a table must not tell a search engine it can. The hours are
     the printed hours, day for day. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: project.name,
    servesCuisine: r.cuisine,
    description: `${footer.copy} ${c.formNote ?? ""}`.trim(),
    telephone: b.phone.href.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.street,
      addressLocality: b.address.locality,
      addressRegion: b.address.region,
    },
    openingHoursSpecification: week
      .filter((d) => d.open !== null)
      .map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: d.day,
        opens: minutesToTime(d.open as number),
        closes: minutesToTime(d.close),
      })),
    acceptsReservations: "False",
  };

  /* The hours list is printed in the visit rail, and the same seven rows answer
     to the chip above it: the footer repeats the one computed line so the claim
     is never only in a chip a visitor could scroll past. Today's row carries
     `aria-current="time"` and the weight the status chip gives its own line, so
     the rail answers the question a printed table cannot — which of these seven
     is the one being read right now. Two spans per row, in both states: the
     hours are read back off exactly that shape. */
  const hoursRows = (
    <ul className="mt-4 divide-y divide-[var(--d-line)]">
      {week.map((d) => {
        const isToday = todayDow !== null && d.dow === todayDow;
        return (
          <li key={d.day} aria-current={isToday ? "time" : undefined} className="flex min-h-11 items-center justify-between gap-4 text-[14px]">
            <span
              className={isToday ? "font-semibold text-[var(--d-accent-text)]" : "text-[var(--d-body)]"}
            >
              {d.day}
            </span>
            <span className="font-mono text-[13px] text-[var(--d-muted)]">{d.shown}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <DemoVars project={project}>
      <div ref={shellRef} className="marigold-shell min-h-full font-sans">
        {/* --- header: the hours first, the mood second --------------------- */}
        <header
          ref={headerRef}
          className={`marigold-header sticky top-0 z-40 border-b ${hairline} bg-[var(--d-bg)]/94 backdrop-blur`}
        >
          <div className={`border-b ${hairline} bg-[var(--d-soft)]`}>
            <div className={`${wrap} flex flex-wrap items-center gap-x-4 gap-y-1 py-2`}>
              {r.board.map((line) => (
                <span
                  key={line}
                  className="text-[11px] uppercase tracking-[0.14em] text-[var(--d-muted)]"
                >
                  {line}
                </span>
              ))}
            </div>
          </div>

          <div className={`${wrap} flex flex-wrap items-center gap-x-4 gap-y-2 py-3`}>
            <a
              href={anchor.href("top")}
              className="inline-flex min-h-11 items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
            >
              <span className="font-display text-[20px] font-semibold tracking-[-0.01em] text-[var(--d-fg)]">
                {c.navName}
              </span>
              <span className="rounded-full border border-[var(--d-line-strong)] px-2 py-0.5 text-[11px] uppercase tracking-[0.1em] text-[var(--d-muted)]">
                {r.header.concept}
              </span>
            </a>

            <span
              className="marigold-status ml-auto inline-flex items-center gap-2 rounded-full border border-[var(--d-line-strong)] bg-[var(--d-card)] px-3 py-1.5"
              data-open={openState === undefined ? undefined : String(openState)}
            >
              <span
                aria-hidden="true"
                className="marigold-status-dot h-2 w-2 shrink-0 rounded-full bg-[var(--d-accent)]"
              />
              <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--d-muted)]">
                {r.header.statusLead}
              </span>
              <span role="status" className="text-[13px] font-semibold text-[var(--d-body)]">
                {statusLine}
              </span>
            </span>

            <div className="ml-auto flex items-center gap-2">
              <Btn variant="ghost" href={phoneHref}>
                {r.header.phoneLabel}
              </Btn>
              <Btn href={anchor.href("reserve")}>{r.header.book}</Btn>
              <DemoMobileMenu
                anchor={anchor}
                items={navItems}
                action={[c.ctaPrimary ?? r.header.book, "reserve"]}
              />
            </div>

            {/* `min-w-11` on each link: the concept's nav labels include a
                four-letter word, and at 1280 the shared `DemoNav` renders links
                with no inline padding, so the tap box was 24px wide. Constraint 9
                asks for 44px in both axes; the fix is scoped to this demo instead
                of `_shared.tsx`, which the other two concepts verify against. */}
            <DemoNav
              anchor={anchor}
              items={navItems}
              className="ml-auto [&_a]:min-w-11 [&_a]:justify-center"
            />
          </div>
        </header>

        {/* --- hero ---------------------------------------------------------- */}
        <section id={anchor.id("top")} className={`${wrap} py-10 @3xl:py-16`}>
          <div className="grid items-start gap-8 @3xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] @3xl:gap-10">
            <div className="demo-reveal">
              <p className={eyebrow}>{r.hero.eyebrow}</p>
              <DemoHeading
                preview={preview}
                className="mt-3 font-display text-[34px] leading-[1.03] tracking-[-0.02em] text-[var(--d-fg)] @3xl:text-[54px] @5xl:text-[64px]"
              >
                {r.hero.headline}{" "}
                <span className="text-[var(--d-accent-text)]">{r.hero.accent}</span>
              </DemoHeading>
              <p className={`mt-4 max-w-xl ${bandLead}`}>{r.hero.lede}</p>
              <p className={`mt-4 ${running}`}>{r.hero.hoursLine}</p>
              <p className={`mt-1 ${faint}`}>{addressLines(r.booking.address).join(", ")}</p>

              {r.hero.facts.length > 0 && (
                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--d-line)] pt-4">
                  {r.hero.facts.map((f) => (
                    <div key={f.label}>
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-[var(--d-muted)]">
                        {f.label}
                      </dt>
                      <dd className="font-display text-[18px] text-[var(--d-fg)]">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Btn href={anchor.href("reserve")}>{c.ctaPrimary ?? r.header.book}</Btn>
                <Btn variant="ghost" href={anchor.href("menu")}>
                  {c.ctaSecondary ?? r.nav.menu}
                </Btn>
              </div>
            </div>

            <div className="relative">
              <Slot
                slot={r.hero.slot}
                preload
                sizes="(min-width: 1280px) 46vw, 92vw"
                className="marigold-hero aspect-[4/3] w-full rounded-3xl"
                imgClassName="demo-ken-burns"
              />
            </div>
          </div>
        </section>

        {/* --- the tasting journey ------------------------------------------- */}
        <section
          id={anchor.id("journey")}
          ref={journeyRef}
          className={`border-t ${hairline} py-10 @3xl:py-14`}
        >
          <div className={wrap}>
            <p className={eyebrow}>{r.intro.eyebrow}</p>
            <div className="mt-6 grid gap-8 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] @3xl:gap-10">
              {/* `min-w-0` breaks the min-content chain: the carousel's cards are
                  `shrink-0` and hold licensed photos, so without it a grid item's
                  automatic minimum size (488px) widened the page at every phone
                  width and produced horizontal overflow. */}
              <div className="min-w-0">
                <BandHead band={r.evening.eyebrow} title={r.evening.title} body={r.evening.body} />

                {/* The narrow layout: a real snap carousel, controls first so a
                    tap in reading order hits the control that is on screen. */}
                <div className="@3xl:hidden">
                  <ul
                    ref={trackRef}
                    aria-label={`${r.evening.eyebrow} — ${r.evening.hint}`}
                    tabIndex={0}
                    onScroll={onTrackScroll}
                    onKeyDown={onCourseKey}
                    className="mk-journey-track relative -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                  >
                    {stages.map((s, i) => (
                      <li
                        key={s.label}
                        ref={(el) => {
                          cardRefs.current[i] = el;
                        }}
                        className="mk-journey-card m-0 w-[84%] shrink-0 list-none snap-start"
                      >
                        <div className="marigold-course-card overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)]">
                          <Slot
                            slot={s.slot}
                            sizes="(min-width: 768px) 60vw, 84vw"
                            className="aspect-[4/3] w-full rounded-t-2xl"
                          />
                          <div className="p-4">
                            <h3 className="font-display text-[22px] text-[var(--d-fg)]">{s.label}</h3>
                            <p className={`mt-2 ${running}`}>{s.line}</p>
                            <p className="mt-2 text-[12px] uppercase tracking-[0.14em] text-[var(--d-accent-text)]">
                              {s.note}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Btn variant="ghost" onClick={() => goCourse(course - 1)}>
                      {r.evening.prev}
                    </Btn>
                    <Btn variant="ghost" onClick={() => goCourse(course + 1)}>
                      {r.evening.next}
                    </Btn>
                    <span role="status" className="ml-auto font-mono text-[13px] text-[var(--d-body)]">
                      {course + 1} {r.evening.of} {stages.length}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2" role="group" aria-label={r.evening.dots}>
                    {stages.map((s, i) => (
                      <button
                        key={s.label}
                        type="button"
                        aria-label={`${r.evening.dots} ${i + 1}`}
                        aria-current={i === course ? "step" : undefined}
                        onClick={() => goCourse(i)}
                        className={`marigold-dot min-h-11 w-11 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                          i === course
                            ? "border-[var(--d-accent)] bg-[var(--d-accent)]"
                            : "border-[var(--d-line-strong)] bg-[var(--d-card)] hover:bg-[var(--d-hover)]"
                        }`}
                      >
                        <span className="sr-only">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tall on the wide layout so the pinned plate beside it has a
                    scroll to answer; the stacked courses are the reading itself,
                    not padding, and the phone gets them inside the carousel. */}
                <ol className="mt-8 hidden @3xl:block">
                  {stages.map((s, i) => (
                    <li key={s.label} className="min-h-[70vh] border-t border-[var(--d-line)] py-8">
                      <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--d-accent-text)]">
                        {i + 1} {r.evening.of} {stages.length}
                      </p>
                      <h3 className="mt-2 font-display text-[30px] text-[var(--d-fg)]">{s.label}</h3>
                      <p className={`mt-2 max-w-xl ${bandLead}`}>{s.line}</p>
                      <p className={`mt-2 ${faint}`}>{s.note}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* The wide layout: the plate holds still while the courses pass. */}
              <div className="marigold-stage hidden @3xl:block" ref={stageRef} data-course={course}>
                <div className="sticky top-28">
                  <div className={cardBox}>
                    <div className="marigold-plate mx-auto h-[240px] w-[240px] @5xl:h-[300px] @5xl:w-[300px]">
                      <PlateCourses count={stages.length} active={course} />
                    </div>
                    <p className="mt-3 text-center font-display text-[14px] text-[var(--d-muted)]">
                      {plateLabel}
                    </p>
                    <h3 className="mt-4 text-center font-display text-[26px] text-[var(--d-fg)]">
                      {courseStage?.label}
                    </h3>
                    <p className={`mt-2 text-center ${running}`}>{courseStage?.line}</p>

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                      <Btn variant="ghost" onClick={() => goCourse(course - 1)}>
                        {r.evening.prev}
                      </Btn>
                      <Btn variant="ghost" onClick={() => goCourse(course + 1)}>
                        {r.evening.next}
                      </Btn>
                      <span role="status" className="font-mono text-[13px] text-[var(--d-body)]">
                        {course + 1} {r.evening.of} {stages.length}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-center gap-2">
                      {stages.map((s, i) => (
                        <button
                          key={s.label}
                          type="button"
                          aria-label={`${r.evening.dots} ${i + 1}`}
                          aria-current={i === course ? "step" : undefined}
                          onClick={() => goCourse(i)}
                          className={`marigold-dot min-h-11 w-11 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)] ${
                            i === course
                              ? "border-[var(--d-accent)] bg-[var(--d-accent)]"
                              : "border-[var(--d-line-strong)] bg-[var(--d-chip)] hover:bg-[var(--d-hover)]"
                          }`}
                        >
                          <span className="sr-only">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <DemoImage
                      src={aside.image.src}
                      alt={aside.image.alt}
                      sizes="(min-width: 1280px) 38vw, 90vw"
                      className="aspect-[3/2] w-full rounded-2xl"
                    />
                    <Btn variant="ghost" href={anchor.href("menu")} className="mt-3">
                      {aside.cta}
                    </Btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- the card ------------------------------------------------------ */}
        <section id={anchor.id("menu")} className={`border-t ${hairline} py-10 @3xl:py-14`}>
          <div className={wrap}>
            <BandHead band={r.menu.eyebrow} title={r.menu.title} lead={r.menu.lead} />

            {/* The filter rail. On phones it is `relative` — it scrolls with the
                menu heading above it, exactly as the reference page behaves there.
                It used to be pinned at a hand-picked offset, and a phone header is
                two wrapping bands tall (294px at 320), so the pin put the whole
                three-row rail behind the header and no diet filter could be tapped
                while reading the menu. Pinning it lower would not help either: a
                178px bar under a 294px header leaves nothing to read.
                From the pill breakpoint up it does pin, and its offset is the
                header's measured height (`--marigold-header-h`, set from the real
                element below) rather than a number that went stale the moment the
                hours board wrapped. `backdrop-blur` only earns its cost once the
                bar actually overlaps content, so it is a `@3xl` property too. */}
            <div className={`relative z-20 -mx-4 mt-6 border-y ${hairline} bg-[var(--d-bg)]/94 px-4 py-3 @3xl:sticky @3xl:top-[var(--marigold-header-h,176px)] @3xl:backdrop-blur @3xl:mx-0 @3xl:rounded-full @3xl:border @3xl:px-3`}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <span role="status" className="font-display text-[15px] text-[var(--d-fg)]">
                  {shownCount} {r.menu.countNoun}
                </span>
                <div
                  role="group"
                  aria-label={r.menu.filtersLabel}
                  /* Below the pill breakpoint these chips wrap instead of
                     sliding into a scroller: five diet filters, three of which
                     were off the right edge of a 320px screen with nothing on
                     the row to say so. At and above it the single-line rail is
                     the design and the scroller stays. */
                  className="flex min-w-0 flex-1 flex-wrap gap-2 pb-1 @3xl:flex-nowrap @3xl:overflow-x-auto"
                >
                  {r.menu.filters.map((f) => {
                    const on = filter === f.key;
                    return (
                      <button
                        key={f.key}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setFilter(f.key)}
                        className={`${chipLabel} shrink-0 ${on ? chipOn : ""}`}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div key={filter} className="demo-menu-fade mt-8 space-y-10">
              {groups.map((s) => (
                <div key={s.label} className="mk-menu-group" data-menu-group>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[var(--d-line)] pb-2">
                    <h3 className="font-display text-[24px] text-[var(--d-fg)]">{s.label}</h3>
                    <p className={`text-[13px] uppercase tracking-[0.14em] text-[var(--d-muted)]`}>
                      {s.blurb}
                    </p>
                  </div>
                  <ul className="mt-4 grid gap-x-10 gap-y-5 @5xl:grid-cols-2">
                    {s.dishes.map((d) => (
                      <li
                        key={d.name}
                        data-menu-item
                        data-marks={d.marks.join(" ")}
                        data-spice={d.spice ?? 0}
                        data-price={d.price}
                        className={`flex flex-col gap-1 border-b ${hairline} pb-4`}
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="font-display text-[18px] text-[var(--d-fg)]">{d.name}</h4>
                          <span className="font-mono text-[15px] text-[var(--d-body)]">{d.price}</span>
                        </div>
                        <p className={`text-[14px] leading-relaxed text-[var(--d-body)]`}>{d.desc}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          {d.marks.map((m) => (
                            <MarigoldMark
                              key={m}
                              mark={m}
                              glyph={r.menu.marks[m]}
                              word={markLabel(m)}
                            />
                          ))}
                          {(d.spice ?? 0) > 0 && (
                            <span className="inline-flex items-center gap-1">
                              {Array.from({ length: d.spice ?? 0 }, (_, i) => (
                                <Flame key={i} />
                              ))}
                              <span className="ml-1 text-[12px] uppercase tracking-[0.1em] text-[var(--d-muted)]">
                                {r.menu.spiceWords[d.spice ?? 0]}
                              </span>
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className={`mt-8 space-y-2 rounded-2xl border ${hairline} bg-[var(--d-soft)] p-4`}>
              <p className={`text-[14px] leading-relaxed text-[var(--d-body)]`}>{r.menu.noPrices}</p>
              <p className={faint}>{r.menu.note}</p>
              <p className={faint}>{r.menu.allergy}</p>
            </div>
          </div>
        </section>

        {/* --- tonight ------------------------------------------------------- */}
        <section id={anchor.id("specials")} className="border-t border-[var(--d-line)] py-8 @3xl:py-10">
          <div className={wrap}>
            <aside className="marigold-specials rounded-2xl bg-[var(--d-accent-2)] p-4 text-[var(--d-fg)] @3xl:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-[22px] @3xl:text-[26px]">{specials.title}</h2>
                <span className="rounded-full bg-[var(--d-fg)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--d-bg)]">
                  {specials.badge}
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-[15px] leading-relaxed">{specials.copy}</p>
            </aside>
          </div>
        </section>

        {/* --- the room ------------------------------------------------------ */}
        <section id={anchor.id("story")} className={`border-t ${hairline} py-10 @3xl:py-14`}>
          <div className={wrap}>
            <div className="grid gap-8 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] @3xl:gap-10">
              <div className="demo-reveal">
                <BandHead band={r.room.eyebrow} title={r.room.title} />
                {r.room.paras.map((p) => (
                  <p key={p} className={`mt-4 max-w-2xl ${running}`}>
                    {p}
                  </p>
                ))}
                <blockquote className={`mt-6 border-l-4 border-[var(--d-accent)] pl-4`}>
                  <p className="font-display text-[22px] leading-snug text-[var(--d-fg)] @3xl:text-[26px]">
                    {r.room.quote}
                  </p>
                  <cite className={`mt-1 block text-[12px] uppercase tracking-[0.14em] not-italic text-[var(--d-muted)]`}>
                    {quoteCite}
                  </cite>
                </blockquote>
                <p className={`mt-6 max-w-2xl ${faint}`}>{provenance}</p>
              </div>
              <div className="grid gap-4">
                <DemoImage
                  src={r.room.tall.src ?? ""}
                  alt={r.room.tall.alt ?? ""}
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  className="aspect-[3/4] w-full rounded-2xl"
                />
                <DemoImage
                  src={r.room.small.src ?? ""}
                  alt={r.room.small.alt ?? ""}
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  className="aspect-[4/3] w-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- the long table: an enquiry, not a booking --------------------- */}
        <section id={anchor.id("groups")} className={`border-t ${hairline} py-10 @3xl:py-14`}>
          <div className={wrap}>
            <div className="grid gap-8 @3xl:grid-cols-2 @3xl:gap-10">
              <div>
                <BandHead band={g.eyebrow} title={g.title} body={g.body} />
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.bands.map((band) => (
                    <span
                      key={band}
                      className="inline-flex min-h-11 items-center rounded-full border border-[var(--d-line-strong)] px-4 font-display text-[15px] text-[var(--d-body)]"
                    >
                      {band}
                    </span>
                  ))}
                </div>
                <p className={`mt-4 ${running}`}>{g.callUs}</p>
                <ul className="mt-4 space-y-2">
                  {g.points.map((p) => (
                    <li key={p} className={`flex gap-2 text-[14px] leading-relaxed text-[var(--d-body)]`}>
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--d-accent)]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <DemoImage
                    src={gImage.src}
                    alt={gImage.alt}
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="aspect-[16/10] w-full rounded-2xl"
                  />
                </div>
              </div>

              <div className={cardBox}>
                {!askSent ? (
                  <form noValidate onSubmit={submitEnquiry} className="space-y-4">
                    <p className={eyebrow}>{g.ticket.lead}</p>

                    <div>
                      <label htmlFor={anchor.id("g-size")} className={fieldLabel}>
                        {g.fields.size}
                      </label>
                      <select
                        id={anchor.id("g-size")}
                        name="group-size"
                        ref={sizeRef}
                        value={ask.size}
                        aria-invalid={askErrors.size ? "true" : undefined}
                        aria-describedby={askErrors.size ? anchor.id("g-size-err") : undefined}
                        onChange={(e) => setAskField("size", e.target.value)}
                        className={field}
                      >
                        <option value="">{g.sizePrompt}</option>
                        {g.bands.map((band) => (
                          <option key={band} value={band}>
                            {band}
                          </option>
                        ))}
                      </select>
                      {askErrors.size && (
                        <p id={anchor.id("g-size-err")} role="alert" className="mt-1 text-[13px] text-[var(--d-accent-text)]">
                          {askErrors.size}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={anchor.id("g-date")} className={fieldLabel}>
                        {g.fields.date}
                      </label>
                      <input
                        id={anchor.id("g-date")}
                        name="group-date"
                        ref={gDateRef}
                        type="date"
                        min={todayISO || undefined}
                        value={ask.date}
                        aria-invalid={askErrors.date ? "true" : undefined}
                        aria-describedby={askErrors.date ? anchor.id("g-date-err") : undefined}
                        onChange={(e) => setAskField("date", e.target.value)}
                        className={field}
                      />
                      {askErrors.date && (
                        <p id={anchor.id("g-date-err")} role="alert" className="mt-1 text-[13px] text-[var(--d-accent-text)]">
                          {askErrors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={anchor.id("g-notes")} className={fieldLabel}>
                        {g.fields.notes}
                      </label>
                      <textarea
                        id={anchor.id("g-notes")}
                        name="group-notes"
                        rows={3}
                        placeholder={gNotes}
                        value={ask.notes}
                        onChange={(e) => setAskField("notes", e.target.value)}
                        className={`${field} resize-y`}
                      />
                    </div>

                    <button type="submit" className={solid}>
                      {gSubmit}
                    </button>
                    <p className={faint}>{g.note}</p>
                  </form>
                ) : (
                  <div>
                    <h4
                      ref={slipRef}
                      tabIndex={-1}
                      className="font-display text-[22px] text-[var(--d-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                    >
                      {g.ticket.title}
                    </h4>
                    <dl className="mt-4 divide-y divide-[var(--d-line)]">
                      {slipRows.map((row) => (
                        <div key={row.term} className="py-2">
                          <dt className="text-[11px] uppercase tracking-[0.14em] text-[var(--d-muted)]">
                            {row.term}
                          </dt>
                          <dd className="mt-0.5 text-[15px] break-words text-[var(--d-body)]">
                            {row.detail}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 text-[14px] leading-relaxed text-[var(--d-body)]">{g.note}</p>
                    <Btn variant="ghost" className="mt-4" onClick={() => setAskSent(null)}>
                      {b.confirm.edit}
                    </Btn>
                  </div>
                )}

                {!askSent && (
                  <div className={`mt-5 border-t ${hairline} pt-4`}>
                    <p className={eyebrow}>{g.ticket.title}</p>
                    {previewRows.length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {previewRows.map((row) => (
                          <li key={row.term} className="text-[14px] text-[var(--d-body)]">
                            <span className="uppercase tracking-[0.1em] text-[var(--d-muted)]">
                              {row.term}:{" "}
                            </span>
                            {row.detail}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={`mt-2 ${faint}`}>{g.ticket.empty}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* --- the reservation ------------------------------------------------ */}
        <section
          id={anchor.id("reserve")}
          className={`border-t ${hairline} bg-[color-mix(in_oklab,var(--d-accent-2)_12%,var(--d-bg))] py-10 @3xl:py-14`}
        >
          <div className={wrap}>
            <BandHead band={b.eyebrow} title={b.title} body={b.body} />

            <div className="mt-8 grid gap-8 @3xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] @3xl:gap-10">
              <div className={cardBox}>
                {!sent ? (
                  <form noValidate onSubmit={submitBooking} className="space-y-5">
                    <div>
                      <label htmlFor={anchor.id("b-date")} className={fieldLabel}>
                        {bFields.date}
                        <span className="text-[12px] font-normal text-[var(--d-muted)]">
                          {bFields.timeZone}
                        </span>
                      </label>
                      <input
                        id={anchor.id("b-date")}
                        name="date"
                        ref={dateRef}
                        type="date"
                        min={todayISO || undefined}
                        value={form.date}
                        aria-invalid={formErrors.date ? "true" : undefined}
                        aria-describedby={anchor.id("b-date-help")}
                        onChange={(e) => set("date", e.target.value)}
                        className={field}
                      />
                      {formErrors.date ? (
                        <p role="alert" className="mt-1 text-[13px] text-[var(--d-accent-text)]">
                          {formErrors.date}
                        </p>
                      ) : (
                        <p id={anchor.id("b-date-help")} className={`mt-1 ${faint}`}>
                          {b.hints.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className={fieldLabel}>{bFields.party}</span>
                      <div
                        role="radiogroup"
                        aria-label={bFields.party}
                        className="mt-1 flex flex-wrap gap-2"
                      >
                        {b.parties.map((n) => (
                          <label key={n} className={`${chipLabel} ${form.party === String(n) ? chipOn : ""}`}>
                            <input
                              type="radio"
                              name={anchor.id("party")}
                              value={String(n)}
                              checked={form.party === String(n)}
                              onChange={() => set("party", String(n))}
                              /* Clipped by `sr-only`, but still the focused input:
                                 iOS reads its font-size before it decides to zoom,
                                 so the floor is set here too. */
                              className="sr-only text-[16px]"
                            />
                            {n}
                          </label>
                        ))}
                        {preview ? (
                          <span className={`${quiet} shrink-0`}>{bFields.partyCall}</span>
                        ) : (
                          <a href={b.phone.href} aria-label={bFields.partyCallAria} className={`${quiet} shrink-0`}>
                            {bFields.partyCall}
                          </a>
                        )}
                      </div>
                      <p className={`mt-2 ${faint}`}>{b.hints.party}</p>
                    </div>

                    <fieldset ref={slotsRef} className="border-0 p-0">
                      <legend className={`mb-2 font-display text-[15px] text-[var(--d-fg)]`}>
                        {form.date ? `${b.slotAsk} ${spokenDate(form.date, week)}` : b.slotAsk}
                      </legend>
                      {slots.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {slots.map((t) => (
                            <label
                              key={t}
                              className={`${chipLabel} font-mono ${chosenTime === t ? chipOn : ""}`}
                            >
                              <input
                                type="radio"
                                name={anchor.id("time")}
                                value={t}
                                checked={chosenTime === t}
                                onChange={() => {
                                  set("time", t);
                                }}
                                className="sr-only text-[16px]"
                              />
                              {t}
                            </label>
                          ))}
                        </div>
                      ) : (
                        <p role="status" className="text-[14px] text-[var(--d-body)]">
                          {form.date && dayClosed ? slotClosed : b.slotNone}
                        </p>
                      )}
                      {formErrors.time && (
                        <p role="alert" className="mt-2 text-[13px] text-[var(--d-accent-text)]">
                          {formErrors.time}
                        </p>
                      )}
                      <p className={`mt-2 ${faint}`}>{b.hints.time}</p>
                    </fieldset>

                    <div className="grid gap-4 @5xl:grid-cols-2">
                      <div>
                        <label htmlFor={anchor.id("b-name")} className={fieldLabel}>
                          {bFields.name}
                        </label>
                        <input
                          id={anchor.id("b-name")}
                          name="name"
                          ref={nameRef}
                          type="text"
                          autoComplete="name"
                          placeholder={bFields.namePlaceholder}
                          value={form.name}
                          aria-invalid={formErrors.name ? "true" : undefined}
                          onChange={(e) => set("name", e.target.value)}
                          className={field}
                        />
                        {formErrors.name && (
                          <p role="alert" className="mt-1 text-[13px] text-[var(--d-accent-text)]">
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor={anchor.id("b-email")} className={fieldLabel}>
                          {bFields.email}
                        </label>
                        <input
                          id={anchor.id("b-email")}
                          name="email"
                          ref={emailRef}
                          type="email"
                          autoComplete="email"
                          placeholder={bFields.emailPlaceholder}
                          value={form.email}
                          aria-invalid={formErrors.email ? "true" : undefined}
                          onChange={(e) => set("email", e.target.value)}
                          className={field}
                        />
                        {formErrors.email && (
                          <p role="alert" className="mt-1 text-[13px] text-[var(--d-accent-text)]">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor={anchor.id("b-notes")} className={fieldLabel}>
                        {bFields.notes}
                        <span className="text-[12px] font-normal text-[var(--d-muted)]">
                          {bFields.notesOptional}
                        </span>
                      </label>
                      <textarea
                        id={anchor.id("b-notes")}
                        name="notes"
                        rows={3}
                        placeholder={b.hints.notes}
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        className={`${field} resize-y`}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <button type="submit" className={solid}>
                        {b.submit}
                      </button>
                      <p className={`max-w-md text-[13px] leading-relaxed text-[var(--d-muted)]`}>
                        {b.note}
                      </p>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h3
                      ref={ticketRef}
                      tabIndex={-1}
                      className="font-display text-[24px] text-[var(--d-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
                    >
                      {b.confirm.title}
                    </h3>
                    <p className="mt-2 text-[15px] font-semibold text-[var(--d-accent-text)]">
                      {b.confirm.lead}
                    </p>
                    <dl className="mt-4 divide-y divide-[var(--d-line)]">
                      {receipt.map((row) => (
                        <div key={row.term} className="py-2">
                          <dt className="text-[11px] uppercase tracking-[0.14em] text-[var(--d-muted)]">
                            {row.term}
                          </dt>
                          <dd className="mt-0.5 text-[15px] break-words text-[var(--d-body)]">
                            {row.detail}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    {c.formNote && (
                      <p className="mt-4 text-[14px] leading-relaxed text-[var(--d-body)]">
                        {c.formNote}
                      </p>
                    )}
                    <p className={`mt-3 ${faint}`}>{b.statusNote}</p>
                    <Btn variant="ghost" className="mt-4" onClick={() => setSent(null)}>
                      {b.confirm.edit}
                    </Btn>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className={`${cardBox}`}>
                  <p className={eyebrow}>{policyTitle}</p>
                  <ul className="mt-3 space-y-3">
                    {[b.statusNote, b.access, b.parking].map((line) => (
                      <li key={line} className="text-[14px] leading-relaxed text-[var(--d-body)]">
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-3 text-[14px] leading-relaxed text-[var(--d-body)]`}>{b.callUs}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Btn href={phoneHref}>{r.header.phoneLabel}</Btn>
                    <Btn variant="ghost" href={anchor.href("visit")}>
                      {r.nav.visit}
                    </Btn>
                  </div>
                </div>
                <div className={`${cardBox} marigold-status-card`}>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--d-muted)]">
                    {visit.timezoneLabel}
                  </p>
                  {/* Plain text, deliberately. The computed line is printed five
                      times down the page and announced once, by the chip in the
                      header — four live regions saying the same sentence on every
                      minute tick is four announcements of one fact. */}
                  <p className="mt-1 font-display text-[18px] text-[var(--d-fg)]">
                    {statusLine}
                  </p>
                  <p className={`mt-2 ${faint}`}>{b.statusNote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- visit ---------------------------------------------------------- */}
        <section id={anchor.id("visit")} className={`border-t ${hairline} py-10 @3xl:py-14`}>
          <div className={wrap}>
            <BandHead band={visit.eyebrow} title={visit.title} />
            <div className="mt-8 grid gap-8 @3xl:grid-cols-2 @3xl:gap-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--d-muted)]">
                  {footer.hoursTitle}
                </p>
                {hoursRows}
                <p className="mt-4 font-display text-[17px] text-[var(--d-fg)]">
                  {statusLine}
                </p>
                <p className={`mt-1 ${faint}`}>{visit.timezoneLabel} · {b.statusNote}</p>
              </div>
              <div className="space-y-4">
                <MapCard name={visit.mapCardName} note={visit.mapCardNote} />
                <p className="text-[14px] leading-relaxed text-[var(--d-body)]">
                  {b.planNote}
                </p>
                <address className="not-italic">
                  {addressLines(b.address).map((line) => (
                    <span key={line} className={`block ${running}`}>
                      {line}
                    </span>
                  ))}
                </address>
                <div className="flex flex-wrap gap-3">
                  <Btn href={phoneHref}>{visit.callLabel}</Btn>
                  <DemoAction variant="ghost" note={b.parking}>
                    {directions.label}
                  </DemoAction>
                  <Btn variant="ghost" href={anchor.href("reserve")}>
                    {r.header.book}
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- what a card cannot say ---------------------------------------- */}
        <section id={anchor.id("how")} className={`border-t ${hairline} py-10 @3xl:py-14`}>
          <div className={wrap}>
            <BandHead band={r.how.eyebrow} title={r.how.title} body={r.how.body} />
            <ul className="mt-8 grid gap-4 @3xl:grid-cols-2 @5xl:grid-cols-4">
              {r.how.points.map((p) => (
                <li key={p.title} className={`${cardBox} demo-reveal`}>
                  <h3 className="font-display text-[18px] text-[var(--d-fg)]">{p.title}</h3>
                  <p className={`mt-2 text-[14px] leading-relaxed text-[var(--d-body)]`}>{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- before you come ------------------------------------------------ */}
        <section id={anchor.id("faq")} className={`border-t ${hairline} py-10 @3xl:py-14`}>
          <div className={wrap}>
            <div className="grid gap-8 @3xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] @3xl:gap-10">
              <div>
                <p className={eyebrow}>{faqEyebrow}</p>
                <h2 className={`mt-2 ${bandTitle} text-[var(--d-fg)]`}>{c.faqTitle}</h2>
                <p className={`mt-3 ${bandLead}`}>{faqLede}</p>
              </div>
              {c.faqs && <DemoFaq items={c.faqs} />}
            </div>
          </div>
        </section>

        {/* --- footer --------------------------------------------------------- */}
        <footer className={`border-t ${hairline} bg-[var(--d-soft)] py-10`}>
          <div className={`${wrap} grid gap-8 @3xl:grid-cols-3`}>
            <div>
              <p className="font-display text-[22px] text-[var(--d-fg)]">{c.navName}</p>
              <p className={`mt-2 max-w-sm ${running}`}>{footer.copy}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--d-line-strong)] bg-[var(--d-chip)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--d-body)]">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--d-accent)]" />
                {footer.badge}
              </span>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--d-muted)]">
                {footer.findTitle}
              </p>
              <address className="mt-2 not-italic">
                {addressLines(b.address).map((line) => (
                  <span key={line} className={`block ${running}`}>
                    {line}
                  </span>
                ))}
              </address>
              <p className={`mt-3 ${running}`}>
                {statusLine}
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Btn href={phoneHref}>{r.header.phoneLabel}</Btn>
                <Btn variant="ghost" href={anchor.href("reserve")}>
                  {r.header.book}
                </Btn>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--d-muted)]">
                {footer.hoursTitle}
              </p>
              <p className="mt-2 font-display text-[17px] text-[var(--d-fg)]">{statusLine}</p>
              <ul className="mt-3 space-y-1">
                {week.map((d) => (
                  <li key={d.day} className="flex justify-between gap-4 text-[13px] text-[var(--d-body)]">
                    <span>{d.day.slice(0, 3)}</span>
                    <span className="font-mono text-[var(--d-muted)]">{d.shown}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`${wrap} mt-8 space-y-2 border-t border-[var(--d-line)] pt-4`}>
            <p className={faint}>{footer.legal}</p>
            <p className={faint}>{DEMO_NOTE}</p>
            <DemoBackLink />
          </div>
        </footer>

        {/* The thumb bar: three actions, and the primitive that ships these only
            takes two, so the band's own third — the jump to the visit card — is
            drawn here rather than dropped. Sticky, not fixed: inside a device
            frame it has to stay inside the frame it is previewing. */}
        <nav
          aria-label={bar.label}
          className={`marigold-bar sticky bottom-0 z-30 flex items-center gap-2 border-t ${hairline} bg-[var(--d-bg)]/94 px-4 py-2.5 backdrop-blur @3xl:hidden`}
        >
          <Btn variant="ghost" href={phoneHref} className="flex-1">
            {bar.call}
          </Btn>
          <Btn variant="ghost" href={anchor.href("visit")} className="flex-1">
            {bar.visit}
          </Btn>
          <Btn href={anchor.href("reserve")} className="flex-1">
            {bar.reserve}
          </Btn>
        </nav>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>
    </DemoVars>
  );
}
