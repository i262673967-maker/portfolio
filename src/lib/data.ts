/* -------------------------------------------------------------------------
   CENTRAL SITE CONFIG — Ismail Web Studio
   Everything editable lives here. Add / remove projects, services, etc.
   without touching components.

   Nothing in here is invented: the prices, care plans and FAQ answers are the
   only published figures and come from Ismail directly. The site domain comes
   from NEXT_PUBLIC_SITE_URL.
   ----------------------------------------------------------------------- */

/* Site domain — ONE source of truth, one env var.
   NEXT_PUBLIC_SITE_URL is required: next.config.ts aborts the build when it is
   missing, so there is no fallback domain here that could silently ship a
   placeholder into canonicals, Open Graph tags, sitemap or robots.
   Set it in .env.local for local builds and in the Vercel project's
   Environment Variables for production. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/+$/, "");

/* Every absolute URL on this site is derived from siteUrl in one place, so one
   env var updates metadata, Open Graph, canonicals, sitemap and robots at once. */
/* The site root is returned without a trailing slash because that is the form
   Next writes into the canonical tag — so the sitemap entry and the canonical
   for "/" stay byte-identical instead of differing by one character. */
export const absoluteUrl = (path = "/") => {
  const p = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return p ? `${siteUrl}/${p}` : siteUrl;
};

/* Web3Forms access key — public by design: it only lets a visitor send a message
   to the inbox you configured at web3forms.com, and they rate-limit submissions.
   Replace it any time you rotate the form. */
export const web3formsAccessKey = "7b769c0d-dedf-43ab-83ed-07a8475a0b84";
export const formEndpoint = "https://api.web3forms.com/submit";

export const site = {
  brand: "Ismail Web Studio",
  role: "Web Designer & Developer",
  tagline: "New Websites & Website Fixes for Local Businesses",
  coreMessage:
    "I build new websites and fix slow, outdated ones for local businesses.",
  supportingMessage:
    "You get a fast, mobile-friendly website that makes your business look credible — or the one you already have properly fixed.",
  email: "ismail.webstudio@gmail.com",

  /* This studio shows no phone, WhatsApp or location of its own anywhere — the
     rule is about the studio, not about the fictional businesses in the concept
     demos, which carry invented contact details on purpose. */
  /* Free website audit — the main call to action across the site. */
  auditOffer: "Send me your link and I'll tell you exactly what's wrong — free.",
  auditTitle: "Free Website Audit",

  /* The promise behind every project — what the visitor judges the work on,
     not the framework it was built with. */
  customerQualities: [
    "Fast",
    "Responsive",
    "Clear",
    "Professional",
    "Reliable",
    "Easy to use",
  ],

  /* The headline of the band that closes the services section. It hands off to
     the pricing and care plan sections, which follow it on the page. */
  quoteOffer: "Not sure what your website needs? Start with a free audit.",

  /* The founder note in the about section — three lines, no photo, and nothing
     that isn't already stated elsewhere on the site: what kind of business this
     is for, how a project starts, and who actually does the work. */
  founderNote: [
    "This studio exists for local businesses — the kind whose customers search, compare, and then phone.",
    "Every project starts the same way: a free look at what's wrong or missing, before anything is designed.",
    "One person does the work, so what you asked for is what gets built.",
  ],

  /* Paired with the "You work directly with me." heading in the about
     section — stated as a fact about how the work is delivered, never as a
     client count, year count or certification. */
  directWork:
    "There is no account manager in the middle and no handover to someone else — the person you brief is the person who designs and builds the site.",

  /* Shown under the "Focus" label, never as years or client counts — no
     experience figure, client count or award is claimed anywhere on this site. */
  experience:
    "Independent web designer & developer focused on modern websites for local businesses.",

  bio: "I build new websites and fix slow, outdated ones for local businesses. I start with a free website audit, so you see exactly what's wrong before you pay anything.",

  /* Empty on purpose — the socials UI hides itself when this is []. */
  socials: [] as { label: string; href: string }[],
};

/* One brand line, three uses: the homepage tab title, the social-card headline
   and the Open Graph image. Kept as a constant so they cannot drift apart. */
export const brandPitch = "Modern websites for local businesses";

/* The homepage's meta / Open Graph / Twitter description, verbatim. */
export const homeDescription =
  "Modern, mobile-first websites for local businesses, plus a free website audit that shows you what's costing you customers.";

export const nav = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

/* One conversion path: a single primary action everywhere it appears. `nav`
   exists only because the header pill cannot fit the full sentence. */
export const cta = {
  primary: "Get My Free Website Audit",
  nav: "Free Website Audit",
  secondary: "See My Work",
};

export const heroPoints = ["Mobile-first", "Fast", "Business-focused"];

/* What a free audit looks at. Nothing here promises rankings or revenue. */
export const auditChecks = [
  "Mobile experience",
  "Usability",
  "Speed and performance",
  "Navigation",
  "Calls-to-action",
  "Trust and credibility",
  "Website structure",
  "Obvious conversion problems",
  "Basic technical issues",
];

/* A demonstration of the output format. Fictional numbers on a fictional site —
   the UI labels it SAMPLE and states it is not a client result. */
export const sampleAudit = {
  score: 62,
  rows: [
    { label: "Mobile experience", status: "warn", note: "Needs improvement" },
    { label: "Page speed", status: "warn", note: "Slow" },
    { label: "HTTPS", status: "good", note: "Good" },
    { label: "Navigation", status: "warn", note: "Confusing" },
    { label: "Call-to-action", status: "bad", note: "Weak" },
    { label: "Trust signals", status: "warn", note: "Limited" },
  ] as { label: string; status: "good" | "warn" | "bad"; note: string }[],
  fixes: [
    "Improve mobile layout",
    "Make the main CTA obvious",
    "Simplify navigation",
    "Improve loading performance",
  ],
};

export type DemoKey = "plumber" | "restaurant" | "salon" | "dental";

/* Content for the concept-site layouts.
   Each fictional business gets its own copy, palette and structure emphasis so
   the demos don't look like one recoloured template.

   The base fields below are OPTIONAL. Every demo owns its own layout
   component, so each concept reads only the fields it actually renders; a
   project carries nothing its demo cannot draw. `navName` is the one field all
   four read (their headers and footers). */
export type ServiceDemoContent = {
  navName: string;
  headline?: string;
  headlineAccent?: string;
  intro?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  servicesTitle?: string;
  services?: { title: string; body: string }[];
  faqTitle?: string;
  faqs?: { q: string; a: string }[];
  ctaTitle?: string;
  ctaBody?: string;

  /* Shown where a concept paints a form-status note: the honest line a visitor
     gets after pressing a submit that cannot really submit. It lives per concept
     so the wording can match the ask ("that's a request, not a booking"), and it
     falls back to the shared site-wide DEMO_NOTE when a concept leaves it unset.
     The footer disclaimer is separate and stays shared on every page. */
  formNote?: string;

  /* --- Shared editorial fields ---------------------------------------------
     The pieces more than one layout draws: full-bleed photography, an opening
     statement, a named process, a form's labels. They live here so the copy
     stays in one place with the rest of the fictional business, and every one is
     OPTIONAL — a concept supplies only what its own layout reads. */
  imageSource?: string; // licence and photographer, shown where photos appear
  hero?: {
    src: string;
    alt: string;
    /* Every field below falls back, so a concept that only needs the
       photograph — the plumber's hero — can supply just src and alt. */
    caption?: string;
    headline?: string;
    accent?: string;
  };
  statement?: string;
  servicesEyebrow?: string;
  contact?: { eyebrow: string; name: string; email: string; projectType: string; message: string; submit: string; projectOptions: string[] };

  /* --- Plumbing-concept fields -----------------------------------------------
     The call-first plumbing layout is built around a phone number, an hours
     strip, a hero chip row and an urgent band. All OPTIONAL, so the restaurant,
     salon and dental concepts read none of it.

     `phone` is the fictional business's number, never the studio's: the site's
     own contact rules (see the studio config at the top of this file) still hold
     — no phone, WhatsApp or location for Ismail Web Studio anywhere. Fictional
     numbers stay inside the 555-01XX range reserved for made-up businesses. */
  phone?: { display: string; href: string; label: string };
  availability?: string;
  trustChips?: string[];
  /* `callLabel` is the verb only — the band writes `{callLabel} {phone.display}`,
     so a number can never be edited into one of the two places and left in the
     other. */
  emergency?: { title: string; body: string; callLabel: string; note: string };

  /* --- BlueLine's residential one-pager --------------------------------------
     The reference is a five-view site (home, services, about, areas, contact)
     behind a hash router. A demo must not navigate away from the page it is
     embedded on, so the five views become anchored bands of one scrolling page
     and every word they draw lives here.

     Read only by PlumberDemo, so the other three concepts are untouched. Fields
     the shared base already covers — hero photo, services grid, FAQ pairs,
     closing call — are not repeated here.

     `serviceDetails[].title` is what the form's service select offers, so the
     "Request this service" buttons can only ever name a real option. */
  blueline?: {
    /* The wordmark is two tones plus a trade label, so it is stored in pieces
       rather than split by the component counting characters. */
    brand: { lead: string; accent: string; sub: string };
    topbarNote: string;
    heroEyebrow: string;
    heroPhoneNote: string;
    heroBadge: string;
    heroStatus: { title: string; body: string };
    /* The band of service names that scrolls under the hero. */
    ticker: string[];
    trust: { title: string; body: string }[];
    servicesIntro: string;
    viewAll: string;
    /* The heading the service-detail stack runs under. The reference keeps it on
       its own page, so it has to be read from somewhere once the five views
       become bands of one page. */
    detailsHead: { eyebrow: string; title: string; intro: string };
    /* The base fields carry the FAQ's own title and pairs; this is the line under
       the heading, and the number the closing band prints before the digits. */
    faqIntro: string;
    finalPhone: string;
    serviceDetails: {
      kicker: string;
      title: string;
      body: string;
      benefits: string[];
      image: { src: string; alt: string };
      request: string;
      call: string;
    }[];
    helpCard: { title: string; body: string };
    hoursCard: { title: string; rows: { label: string; value: string }[]; status: string };
    why: {
      eyebrow: string;
      title: string;
      intro: string;
      link: string;
      items: { title: string; body: string }[];
    };
    emergencyStatus: string;
    beforeAfter: {
      eyebrow: string;
      title: string;
      intro: string;
      note: string;
      pairs: {
        after: string;
        afterAlt: string;
        before: string;
        beforeAlt: string;
        caption: string;
        /* The slider is a real range input, so it needs its own accessible name. */
        slider: string;
      }[];
    };
    reviews: {
      eyebrow: string;
      title: string;
      intro: string;
      note: string;
      items: { quote: string; name: string; place: string; initials: string }[];
    };
    /* One list of places serves the coverage chips, the per-city cards and the
       map's dots, so a town cannot be listed in one and missing from another.
       `dot` holds the artwork's own coordinates: the circle, and where its label
       sits. */
    areas: {
      eyebrow: string;
      title: string;
      /* The one-line standfirst, then the paragraph that sits beside the map. */
      head: string;
      intro: string;
      cta: string;
      note: string;
      mapNote: string;
      mapAria: string;
      mapPlate: string;
      /* Heading over the per-city cards. */
      cardsTitle: string;
      places: {
        name: string;
        note: string;
        hub?: boolean;
        dot: { x: number; y: number; tx: number; ty: number; anchor: "start" | "middle" };
      }[];
    };
    /* Second paragraph of the coverage band, run under `areas.cardsTitle` so the
       per-city cards have a lede. */
    areasIntro: string;
    about: { eyebrow: string; title: string; paras: string[]; list: string[]; cta: string };
    story: { title: string; paras: string[] };
    values: { eyebrow: string; title: string; items: { no: string; title: string; body: string }[] };
    steps: { eyebrow: string; title: string; items: { no: string; title: string; body: string }[] };
    contactHead: { eyebrow: string; title: string; intro: string };
    form: {
      name: string;
      namePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      service: string;
      /* The empty option, taken from the reference's own markup so the form's
         copy still lives only in this file. */
      serviceOption: string;
      otherOption: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      fine: string;
      successTitle: string;
      /* `{name}` and `{service}` are filled from what the visitor typed, so the
         confirmation repeats the request instead of a generic thank-you. */
      successLead: string;
      /* `{phone}` keeps the number in one place — see `phone.display`. */
      successDemo: string;
      reset: string;
    };
    contactCards: { title: string; lines: string[]; phone?: boolean; dark?: boolean }[];
    fictionalNote: string;
    footer: {
      tag: string;
      explore: string;
      servicesTitle: string;
      contactTitle: string;
      address: string;
      legal: string;
      demo: string;
    };
    dialogs: {
      privacy: { title: string; paras: string[] };
      terms: { title: string; paras: string[] };
    };
  };

  /* --- Restaurant-concept fields ------------------------------------------------
     A diner reads a restaurant site in the order the evening actually happens:
     when it is open, what the room is like, what is on the card, how to get a
     table. So this layout is a board of hours, a fire that is chosen rather than
     admired, the card as a list you can filter down to what you can eat, two
     forms that assemble a ticket in front of you and say plainly that nothing
     left the page, and a visit block whose open or closed line is worked out from
     the hours printed underneath it instead of asserted.

     All OPTIONAL and read only by RestaurantDemo, so the three service concepts
     and the storefront are untouched. The dishes, the street and the telephone
     are invented for the fiction — the number stays inside the 555-01XX range and
     the page carries the concept note everywhere it is needed.

     What is deliberately NOT here, and why: no prices, so no figure on this page
     can be read as a sum a fictional room charges (`noPrices` says why in the
     concept's own voice); no reviews, star ratings, diner counts or press quotes;
     no photographs — every `slot` names the picture a real build would put there
     instead of borrowing somebody else's room; no live availability, so nothing
     can claim a table is held; and no map service, because a link to a street that
     does not exist would be a broken promise rather than a placeholder. */
  restaurant?: {
    /* The service board above the header. A fire restaurant decides its evening
       hours before it decides anything else, so the facts a diner needs come
       before the drawing of the fire. */
    board: string[];
    header: {
      /* Beside the wordmark, so the fiction is on the fold and not only in the
         colophon. */
      concept: string;
      /* The week's shape, printed before any clock has been read. */
      openLine: string;
      /* The chip's own lead-in, so a computed line never reads as a fact about
         the room: it is arithmetic on the hours on this page and the clock in the
         visitor's own device. */
      statusLead: string;
      phoneLabel: string;
      book: string;
    };
    hero: {
      /* The headline is set in two parts so the second can carry the italic. */
      headline: string;
      accent: string;
      eyebrow: string;
      /* The paragraph that does the deciding: what the place is, and the one
         limitation it does not hide. */
      lede: string;
      hoursLine: string;
      /* Three facts set as a hairline row under the actions — covers, seatings,
         how often the card changes. */
      facts: { label: string; value: string }[];
      /* The fire itself. The room's three seating blocks, each drawn as the fire
         at that age, selectable, and each carrying its own ask into the ledger.
         This is the idea the page is built around, so it sits in the hero rather
         than in a band of cards further down the page. */
      fire: {
        title: string;
        body: string;
        blocks: {
          time: string;
          label: string;
          note: string;
          ask: string;
          /* Pre-fills the ledger's slot only where the generated grid offers it;
             a Sunday lunch writes the request into the note instead. */
          slot?: string;
          preset?: string;
        }[];
        /* Said once per block state, so pressing a chip answers. */
        live: string;
        drawn: string;
      };
      /* The plate the photograph used to fill: a labelled slot, not a picture. */
      slot: { kind: string; note: string };
    };
    intro: { eyebrow: string; body: string };
    /* The evening told in stages, one at a time, so a diner reads the shape of the
       meal before reading a card of eighteen dishes. */
    evening: {
      eyebrow: string;
      title: string;
      body: string;
      stages: { label: string; line: string; note: string; slot: { kind: string; note: string } }[];
      prev: string;
      next: string;
      dots: string;
      /* Reads as "Stage 2 of 4" to a screen reader on every change. */
      of: string;
      hint: string;
    };
    menu: {
      eyebrow: string;
      title: string;
      lead: string;
      /* Why there are no numbers on this card — the honest answer, in the
         concept's voice, placed where a diner expects a price. */
      noPrices: string;
      /* The filters. `key` is what a dish's `marks` are matched against; the
         first entry is the unfiltered view, and `heat` is the one key that is not
         a mark of its own — it looks for a dish carrying either heat word. */
      filters: { key: string; label: string }[];
      /* Sits under the card: a legend, so a mark is not a mystery. `mark` is one
         of the keys a dish actually carries, and the glyph printed for it is the
         component's own business. */
      legend: { mark: string; means: string }[];
      countNoun: string;
      /* No kitchen sharing one fire can promise a dish is free of anything, so the
         page says so instead of implying the opposite. */
      allergy: string;
      /* The card is rewritten weekly: a menu this short cannot promise the dish on
         the day is the dish on the card. */
      note: string;
      sections: {
        label: string;
        blurb: string;
        slot: { kind: string; note: string };
        dishes: {
          name: string;
          desc: string;
          /* Dietary and heat marks. `veg`, `vegan` and `gf` filter on themselves;
             either heat word is what the `heat` filter looks for. */
          marks: ("veg" | "vegan" | "gf" | "medium" | "hot")[];
        }[];
      }[];
    };
    room: {
      eyebrow: string;
      title: string;
      paras: string[];
      quote: string;
      tall: { kind: string; note: string };
      small: { kind: string; note: string };
    };
    /* The long table. A separate form from the reservation, because a group is
       enquired about rather than taken, and the two answers a host gives are
       different: one is a table, the other is a conversation. */
    groups: {
      eyebrow: string;
      title: string;
      body: string;
      bands: string[];
      /* Above the size chips: what a party this page cannot take has to do. */
      callUs: string;
      points: string[];
      fields: { size: string; date: string; name: string; contact: string; notes: string };
      /* Read beside the ticket. */
      note: string;
      /* There is no submit button on this form. A group goes through a
         conversation, so the ticket assembles itself as the fields change and the
         page avoids repeating the same "nothing was sent" answer twice. */
      ticket: { title: string; lead: string; empty: string };
    };
    booking: {
      eyebrow: string;
      title: string;
      body: string;
      /* Party sizes the form will take. Larger than this goes to the phone, and
         the chips say so instead of a validation error after the fact. */
      parties: number[];
      callUs: string;
      /* Optional context a reservation book actually records. */
      occasions: string[];
      /* The slots are generated from `week`, not listed: a grid of times that
         cannot be reconciled with the printed hours is a lie a diner finds out at
         the door. `stepMinutes` is the gap the book works in and
         `lastSeatingMinutes` is how long before close the final table sits. */
      stepMinutes: number;
      lastSeatingMinutes: number;
      slotAsk: string;
      slotNone: string;
      /* `dow` matches JavaScript's own day number — Monday is 1, Sunday is 0 — so
         the live status and the slot grid read the same table. `open` and `close`
         are minutes from midnight; a null `open` is a day the room does not serve.
         `shown` is the string printed in the table, so the clock and the prose can
         never disagree by being edited separately. */
      week: { day: string; dow: number; open: number | null; close: number; shown: string }[];
      hoursTitle: string;
      closedWord: string;
      /* The qualification under the computed status line. */
      statusNote: string;
      address: string[];
      access: string;
      parking: string;
      /* What the drawn plan stands in for, said out loud. */
      planNote: string;
      phone: { display: string; href: string };
      /* The submit ask itself — a restaurant books a table, so the button says
         what pressing it does rather than reusing the page's generic CTA. */
      submit: string;
      /* Repeated beside the submit button: the last question before booking. */
      note: string;
      /* The four questions a diner hesitates on, answered before they ask. */
      hints: { date: string; time: string; party: string; notes: string };
      /* The panel that replaces the form once it is submitted. It reads back
         what was asked for and says, in the same breath, that none of it is
         held — the request cannot reach a book from this page. */
      confirm: { title: string; lead: string; edit: string };
    };
    /* The transparency band: the things a printed card leaves unsaid, including
       the one that costs the room a sale. */
    how: {
      eyebrow: string;
      title: string;
      body: string;
      points: { title: string; text: string }[];
    };
  };

  /* --- Dental-concept fields ---------------------------------------------------
     A practice earns or loses the visit in the same two places every other local
     business does: what it costs, and whether anyone will explain it to you. So
     this layout keeps a leaflet's bones — a board of facts, an index of what
     happens and how long it takes, a tear-off request slip at the foot — and
     adds the three things a leaflet can never do: it answers back when you point
     at the part of your mouth that hurts, it talks you through whether what you
     have can wait until Monday, and it translates the words on your letter from
     the practice.

     All OPTIONAL and read only by DentalDemo, so the other concepts are
     untouched. The practice name, street, hours and number are invented for the
     fiction; the number stays inside the 555-01XX range reserved for made-up
     businesses.

     What is deliberately NOT here, and why: no practitioner names, credentials,
     registrations or years of practice (a qualification attached to an invented
     person is a fabricated credential, and the concept has no real dentist to
     credit); no patient testimonials, star ratings, review counts or
     before/after claims — the reviews block below is an empty, labelled slot
     that says so out loud; no success rates or outcomes; no price list or price
     range (a number for a practice that does not exist would be an invented
     price, and a real one depends on what the examination finds); no live
     scheduler, so nothing on the page can claim a time has been booked; and no
     photographs, because the pictures this concept would need are of a building
     that is not there — `slots` labels each one as a placeholder instead. */
  dental?: {
    /* The board above the header: the four facts that decide whether to call,
       each filed under the small head it answers. */
    board: { tag: string; text: string }[];
    header: {
      /* Beside the practice name, so the fiction is on the fold and not only in
         the colophon. */
      concept: string;
      /* The week's shape rather than a live open/closed light: a chip that
         claims to know the time is one clock-sync away from lying. */
      openLine: string;
      phoneLabel: string;
      book: string;
    };
    /* The hero's own widget: a paced breath. It runs on a timer the visitor can
       stop, and it stops by itself for anyone whose device asks for less motion. */
    calm: {
      label: string;
      /* The three counts, in seconds, in the order the disc walks them. */
      phases: { word: string; seconds: number }[];
      /* The line under the disc, where the pattern is named in words. */
      pattern: string;
      pause: string;
      resume: string;
      note: string;
    };
    hero: {
      eyebrow: string;
      /* Split so the second line can carry the italic accent. */
      headline: string;
      accent: string;
      /* The paragraph that does the deciding, including the limitation the
         practice does not hide. */
      lede: string;
      facts: { label: string; value: string }[];
      ctaPrimary: string;
      ctaSecondary: string;
      caption: string;
    };
    /* Every picture this concept would want is of a building that does not
       exist, so each one is a labelled slot that says what a real build puts
       there. Nothing pretends to be a photograph of Rowanwood House. */
    slots: {
      kind: string;
      hero: { note: string; ratio: string };
      nerves: { note: string; ratio: string };
      visit: { note: string; ratio: string };
      map: { note: string; ratio: string };
    };
    /* 01 — The planner: point at the part of the mouth, then at the words that
       sound like yours. The picks are carried into the request slip, so the
       visitor never types twice what they already answered by tapping. */
    planner: {
      eyebrow: string;
      title: string;
      lead: string;
      /* Four tappable zones on the drawn diagram. */
      areasHead: string;
      areas: { key: string; name: string; hint: string }[];
      /* The one word drawn inside the diagram, so the chart says which end is
         which. Lowercase on purpose: it is set in letterspaced caps by the CSS. */
      chartFront: string;
      unsure: string;
      concernHead: string;
      concerns: {
        key: string;
        label: string;
        /* What a visit for this usually involves, in the plain words the page
           promises. Held as a list so a phone reads it as steps, not a block. */
        involves: string[];
        time: string;
        /* The reason chip this concern selects in the slip — it has to be one
           of `booking.reasons`, checked at compile time by the read in DentalDemo. */
        reason: string;
      }[];
      /* Shown before anything is picked, so the panel is never an empty box. */
      empty: string;
      /* The sentence that keeps a diagram from reading as a diagnosis. */
      disclaimer: string;
      areaNote: string;
      carry: string;
      carryBtn: string;
      clear: string;
      skip: { text: string; link: string };
    };
    /* The band a person in pain lands on. It sends them to the phone and names
       the one thing this kind of practice is not for. */
    urgent: {
      eyebrow: string;
      title: string;
      body: string;
      hospital: string;
      phoneLabel: string;
      phoneNote: string;
      /* The label on the slower route out of this band. */
      writeInstead: string;
      /* Pressed from this band into the form's notes field, so the reason for
         the call is already written when the form appears. */
      prefill: string;
      /* …and into the reason chips, which is why it has to be one of them. */
      prefillReason: string;
    };
    /* The self-check. Three outcomes, and the order the questions are asked in
       is the order of danger: the first YES that matches decides, so a swollen
       jaw can never be talked out of the emergency department by a later answer
       about a chipped tooth. */
    triage: {
      eyebrow: string;
      title: string;
      lead: string;
      yes: string;
      no: string;
      again: string;
      /* Each question names the outcome a YES points at. */
      questions: { text: string; out: "emergency" | "today" | "routine" }[];
      outcomes: {
        emergency: { title: string; body: string; list: string[]; cta: string };
        today: { title: string; body: string; list: string[]; cta: string };
        routine: { title: string; body: string; list: string[]; cta: string };
      };
      noneTitle: string;
      noneBody: string;
      /* Under the result, always: a page cannot see the tooth. */
      disclaimer: string;
      slipLabel: string;
    };
    /* The examination-first promise, set as the page's opening argument. */
    intro: { eyebrow: string; title: string; body: string; aside: string };
    /* 02 — Two groups of rows, each expandable to what happens in the chair. No
       prices, and the note underneath says why. */
    index: {
      eyebrow: string;
      title: string;
      lead: string;
      /* The index is a real table, so its column heads are data rather than
         markup: below the point where the rows stack, each cell prints its own
         head again, and the two copies cannot drift apart. */
      columns: { treatment: string; duration: string; what: string };
      groups: {
        label: string;
        rows: {
          name: string;
          time: string;
          what: string;
          /* The plain-language version, behind the row head. */
          detail: string[];
        }[];
      }[];
      expand: string;
      collapse: string;
      costNote: string;
      /* The line under the whole index, and the two ways out of it. */
      footNote: string;
      ctaPlanner: string;
      ctaVisit: string;
    };
    /* What a written plan is made of. The one thing this page will not do is put
       a number against it, so instead it gives the visitor the four questions
       that make any number they are later handed make sense. */
    cost: {
      eyebrow: string;
      title: string;
      lead: string;
      partsHead: string;
      parts: { name: string; body: string }[];
      driversHead: string;
      drivers: { name: string; body: string }[];
      askHead: string;
      ask: string[];
      /* Why there is no price list, said once and plainly. */
      honest: string;
      cta: string;
    };
    /* The section that wins the nervous patient: four things the practice does,
       each concrete enough to check. */
    nerves: {
      eyebrow: string;
      title: string;
      lead: string;
      points: { title: string; body: string }[];
      cta: string;
      /* The quieter offer beside the main one: a visit that is only a look round. */
      ctaQuiet: string;
      quietPrefill: string;
      prefill: string;
    };
    /* The practical half: how the hour actually runs, what to bring, how to get in. */
    visit: {
      eyebrow: string;
      title: string;
      lead: string;
      /* The chip that says what the hour is booked as. */
      badge: string;
      /* Minute marks rather than step numbers: what a patient is really weighing
         is how long each part takes. */
      steps: { mark: string; title: string; body: string }[];
      bringTitle: string;
      bring: string[];
      accessTitle: string;
      access: string[];
      cta: string;
    };
    /* The decoder. The page promises plain language four times, and this is the
       one place it has to prove it: the words a letter from a practice is made
       of, said again in the words you would use at the kitchen table. */
    words: {
      eyebrow: string;
      title: string;
      lead: string;
      prompt: string;
      terms: { term: string; plain: string; where: string }[];
      foot: string;
    };
    /* Reviews. There is no practice yet, so there is nothing to quote, and the
       honest move is to show the empty frame and label it. */
    proof: {
      eyebrow: string;
      title: string;
      lead: string;
      slotLabel: string;
      headline: string;
      body: string;
      foot: string;
      faqHead: string;
      items: { q: string; a: string }[];
      ask: { text: string; link: string };
    };
    booking: {
      eyebrow: string;
      title: string;
      lead: string;
      /* Why the visit, so the form asks for the right thing. */
      reasons: string[];
      /* A grid of days and parts of day, not a time picker: a request cannot
         promise 14:07 on a Tuesday, and a chip that admits that is more
         credible than a field that pretends otherwise. */
      days: string[];
      times: string[];
      /* Existing or new — the practice books them differently. */
      patientTypes: string[];
      /* One legend per chip group, in the desk's own words. They are content
         rather than markup because the phrasing is part of the fiction: a
         practice that asks "Are you on our books?" and one that asks "Are you
         registered here?" are not the same practice. */
      legends: { reason: string; patient: string; day: string; time: string };
      name: string;
      phone: string;
      email: string;
      notes: string;
      hints: { reason: string; when: string; phone: string; notes: string };
      submit: string;
      /* Beside the submit button: the last question before pressing it. */
      note: string;
      /* Printed across the tear-off edge of both the form and its read-out. */
      tear: string;
      /* The two routes for someone who would rather not type at all. */
      talkHead: string;
      talkBody: string;
      backHead: string;
      backBody: string;
      /* The live-scheduler link, which this concept has no way to wire up. It
         stays on the page because a real build would have it, and it says what
         it is rather than pointing at nothing. */
      online: { label: string; note: string };
      /* The line that names whatever the planner left behind, above the reason
         chips, so a carried pick is visible rather than silently filled in. */
      carried: string;
      confirm: {
        title: string;
        lead: string;
        edit: string;
        refLabel: string;
        /* The number is what makes a leaflet feel physical, and it is also the
           one thing on this page that could be misread as a book entry — so it
           arrives with the sentence that says what it is not. */
        refNote: string;
      };
    };
    hours: { day: string; time: string }[];
    address: string[];
    phone: { display: string; href: string };
    /* Says what the practice is, in the footer's own voice — the line that keeps
       the fiction from reading as a real clinic. */
    positioning: string;
    /* The leaflet's own colophons: the four heads it rules across the foot of the
       page and beside the form, and the line that keeps the fiction from reading
       as a real clinic. */
    footer: { hours: string; where: string; find: string; onPage: string; concept: string };
  };

  /* --- Salon-concept fields ----------------------------------------------------
     Maison Lune is a soft, minimal beauty studio, so its layout is a service
     menu, a booking flow, a small team and a room — not a product grid or a
     service brochure. It reads the fields below; all OPTIONAL and read only by
     SalonDemo, so the other concepts are untouched.

     Service names, durations, "from $" prices, stylist first names, the street,
     the hours and the phone are invented for the fiction (as the dishes and the
     product prices were). The number stays inside the 555-01XX range reserved
     for made-up businesses and the page carries the concept note everywhere it
     is needed. No review, star rating, before/after claim, "since <year>",
     client count, award or certification is written anywhere — a studio this
     quiet has none of those to show, and inventing them is exactly what the
     honesty rule forbids. */
  salon?: {
    announcement: string;
    hero: {
      src: string;
      alt: string;
      eyebrow: string;
      /* Split so the second part can carry the light-serif accent. */
      headline: string;
      accent: string;
      sub: string;
      /* The deciding line: whether the book is open. */
      note: string;
      ctaPrimary: string;
      ctaSecondary: string;
      /* The shorter arch that rides over the tall plate at desktop width. Held
         per slot rather than looked up by position, so the collage is a decision
         the copy makes and not a side effect of array order. */
      inset: { src: string; alt: string };
      /* Set down the hero's right edge at desktop, the way a studio spells its
         trade along a window. */
      spine: string;
    };
    /* The single large statement, set beside the three house rules. */
    statement: string;
    /* The line the quote is signed with. Deliberately not a founding year, an
         award or a client count — none of those are ours to invent. */
    statementSign: string;
    menu: {
      eyebrow: string;
      title: string;
      lead: string;
      /* The chip that shows every family. */
      all: string;
      /* The noun in the count line under the chips. The number itself is read
         off the list, so this never drifts when a treatment is added. */
      countNoun: string;
      /* Each family is a ruled section of ONE continuous price card, not a
         panel of cards behind a tab. Items carry a duration and a "from $"
         floor price, never a fixed quote. */
      families: {
        label: string;
        items: { name: string; desc: string; duration: string; price: string }[];
      }[];
      /* What a printed card leaves unsaid and a website has to say: where the
         figure on the card stops being the figure you pay. */
      footnotes: string[];
      /* The still-life plate that sits beside the card's heading. */
      plate: { src: string; alt: string; caption: string; ratio: string };
    };
    booking: {
      eyebrow: string;
      title: string;
      body: string;
      /* Four step labels; the flow walks service → stylist → time → review. */
      steps: [string, string, string, string];
      /* Placeholder calendar slots the concept generates — deliberately generic,
         no fabricated availability. */
      days: string[];
      times: string[];
      submit: string;
      /* Repeated beside the final step: nothing here really books. */
      note: string;
      /* The two questions a studio is asked before anyone books, answered on the
         page rather than left to a validation message. */
      terms: { label: string; body: string }[];
      /* The panel that replaces the wizard once it is requested. It reads back
         what was asked for and says, in the same breath, that no chair is held. */
      confirm: { title: string; lead: string; edit: string };
      /* Words the step controls and the live stub need. They live here so the
         component carries no English of its own. */
      ui: {
        summary: string;
        back: string;
        next: string;
        unchosen: string;
        needChoice: string;
        legends: { service: string; stylist: string; time: string };
        /* Under the calendar: the slots are the concept's, not the studio's. */
        slotsNote: string;
        /* Named so a screen reader hears a sentence, not "Noor" on its own. */
        bookWithAria: string;
      };
    };
    team: {
      eyebrow: string;
      title: string;
      intro: string;
      /* Prefix for the row action that carries the name into the booking stub. */
      bookWith: string;
      /* Lead-in to the plain sentence that lists what each chair takes. */
      takes: string;
      members: {
        name: string;
        initials: string;
        role: string;
        focus: string;
        /* Service names lifted from `menu.families` verbatim, so a stylist can
           never advertise a treatment the card does not sell. */
        sees: string[];
      }[];
    };
    gallery: {
      eyebrow: string;
      title: string;
      lead: string;
      /* `ratio` is the file's own measured pixel ratio, held per plate rather
         than looked up by position: the box then matches the photograph whatever
         order the list is in, and nothing reflows when the file arrives. A plate
         taller than it is wide is arched, because that is the shape of the
         mirrors in the room; a wide plate is only softened. */
      items: { src: string; alt: string; caption: string; ratio: string }[];
    };
    studio: {
      eyebrow: string;
      title: string;
      points: { title: string; body: string }[];
    };
    /* The new-client note. It rides at the foot of the statement block rather
       than standing in its own boxed band, so the page has one fewer panel and
       one fewer button. */
    offer: { title: string; body: string };
    visit: {
      eyebrow: string;
      title: string;
      address: string[];
      /* One row per day. The week is drawn as a strip, so a grouped "Tue – Fri"
         label would have to be unpicked to build it — better to keep the data
         at the grain the layout needs. */
      hours: { day: string; time: string }[];
      phone: { display: string; href: string };
      /* Practical directions in place of the map panel that could only ever
         pretend to be a map. */
      arriving: string;
    };
  };
};

export type Project = {
  slug: string;
  index: string; // "01"
  demo: DemoKey;
  name: string;
  businessType: string;
  industry: string;
  category: "Service" | "Trade" | "Hospitality";
  summary: string;
  objective: string;
  strategy: string;
  designDirection: string[];
  keySections: string[];
  mobileNotes: string[];
  conversionNotes: string[];
  accent: string; // hex used to tint the case study
  /* `surface` and `accent2` are optional extras for a concept whose palette has
     more than one colour in it — BlueLine's copper accent and pale panel. DemoVars
     emits them as --d-surface / --d-accent-2 and measures its text tokens
     against the surface, so an extra colour can never quietly break contrast. */
  palette: { bg: string; fg: string; accent: string; surface?: string; accent2?: string };
  content?: ServiceDemoContent; // required for the local-service demo layout
};

/* Concept projects. Fictional businesses, always labelled "Concept project" —
   never presented as real clients. */
export const projects: Project[] = [
  {
    slug: "blueline-plumbing",
    index: "01",
    demo: "plumber",
    name: "BlueLine Plumbing",
    businessType: "Home Services",
    industry: "Residential Plumbing",
    category: "Trade",
    summary:
      "A residential plumbing one-pager built from a supplied design: the number in the strip, the header, the hero and every service row, nine services explained twice, and a coverage map drawn rather than embedded.",
    objective:
      "Carry the two visitors a plumbing site gets on one page — the person with water spreading across a floor right now, and the homeowner comparing who to let into the house next week.",
    strategy:
      "Call-first from the top strip to the thumb bar, so there is no scroll depth at which phoning is work. Everything else on the page is a reason the call is worth making: nine services given twice, once as a grid and once in full with what each one includes; before-and-after sliders; coverage on a drawn map with a card per town; and a form that reads its own fields back and then says plainly that nothing was sent.",
    designDirection: ["Trade signage", "Call-first", "Cold-water blue", "Copper accent"],
    keySections: [
      "Hero",
      "Trust strip",
      "Services",
      "Why BlueLine",
      "Emergency",
      "Before & after",
      "Testimonials",
      "Service areas",
      "About",
      "Service details",
      "FAQ",
      "Contact",
    ],
    mobileNotes: [
      "Call and request stay pinned to the bottom of the frame until it reaches tablet width",
      "The coverage map is a drawn illustration, so it reads at 390px where a real map would not",
      "Every band runs one column until the frame is wide enough for the two-column split",
    ],
    conversionNotes: [
      "The number appears in the top strip, the header, the hero, the emergency band, every service row, the contact cards and the thumb bar",
      "Each service's request button writes its own name into the form's select, so a click never promises more than a pre-filled field",
      "The confirmation repeats the name and the service that were typed, then states that nothing left the browser",
    ],
    accent: "#1160c9",
    /* Blue water on a pale page, copper for the things that are hot or urgent.
       The navy of the emergency band and the footer is painted by the demo
       itself, since DemoVars only derives text tokens for the light surfaces —
       inside a navy band the component uses its own light ink instead. */
    palette: {
      bg: "#f5f8fb",
      fg: "#0e1c2b",
      accent: "#1160c9",
      surface: "#ebf1f7",
      accent2: "#c2672e",
    },
    content: {
      navName: "BlueLine",
      headline: "Reliable Plumbing",
      headlineAccent: "Services in Austin, TX",
      intro:
        "Fast, professional plumbing solutions for homeowners throughout Austin and surrounding areas.",
      ctaPrimary: "Request Service",
      ctaSecondary: "Call Now",

      imageSource:
        "Photography on this concept is generated artwork made for the design, not documentary photographs of a real job.",
      hero: {
        src: "/demos/blueline-plumbing/hero-pipes.webp",
        alt: "Technician servicing copper water pipes in a home utility room",
      },

      servicesEyebrow: "What We Do",
      servicesTitle: "Complete Residential Plumbing Services",
      services: [
        {
          title: "Emergency Plumbing",
          body: "Burst pipes, major leaks, and backups handled fast — day or night.",
        },
        {
          title: "Drain Cleaning",
          body: "Slow and clogged drains cleared at the source, not just patched.",
        },
        {
          title: "Water Heater Repair",
          body: "No hot water, strange noises, or leaks diagnosed and fixed.",
        },
        {
          title: "Water Heater Installation",
          body: "Right-sized replacements installed cleanly and correctly.",
        },
        {
          title: "Leak Detection",
          body: "Hidden leaks located precisely — without guesswork demolition.",
        },
        {
          title: "Sewer Line Repair",
          body: "Main line backups, odors, and root intrusion addressed properly.",
        },
        {
          title: "Faucet & Fixture Repair",
          body: "Drips, low pressure, and dated fixtures repaired or upgraded.",
        },
        {
          title: "Toilet Repair",
          body: "Running, clogging, or leaking toilets fixed — or replaced.",
        },
        {
          title: "Pipe Repair",
          body: "Corroded, leaking, or damaged pipes repaired with lasting materials.",
        },
      ],

      faqTitle: "Common Plumbing Questions",
      faqs: [
        {
          q: "What plumbing services do you offer?",
          a: "We handle emergency plumbing, drain cleaning, water heater repair and installation, leak detection, sewer line repair, faucet and fixture repair, toilet repair, and pipe repair for homes throughout the Austin area.",
        },
        {
          q: "Do you offer emergency plumbing in Austin?",
          a: "Yes. Burst pipes, active leaks, and sewage backups are treated as priorities. Call (512) 555-0147 any time and we'll dispatch the nearest available plumber.",
        },
        {
          q: "How quickly can a plumber get to my home?",
          a: "It depends on your location and our current schedule. Emergencies are prioritized, and we always give you an expected arrival window when you call or request service.",
        },
        {
          q: "Do you provide upfront pricing?",
          a: "Yes. We assess the problem, explain what we found, and provide a clear estimate before any work begins — so you can decide with the full picture.",
        },
        {
          q: "What areas do you serve?",
          a: "Austin and surrounding communities including Round Rock, Cedar Park, Pflugerville, Georgetown, Leander, Kyle, and Buda. Not sure if you're covered? Send a request and we'll confirm.",
        },
        {
          q: "How do I request service?",
          a: "Call us at (512) 555-0147 or use the contact form on this site. Tell us what's going on and a good time to reach you, and we'll take it from there.",
        },
      ],

      ctaTitle: "Have a Plumbing Problem? Let's Fix It.",
      ctaBody:
        "One call gets a professional plumber on the way to your Austin home — with upfront pricing and workmanship we stand behind.",
      formNote: "Demo form — submissions are not sent or stored.",

      phone: {
        display: "(512) 555-0147",
        href: "tel:+15125550147",
        label: "Call Now",
      },
      availability: "Mon–Sat 7 AM – 7 PM · 24/7 Emergency Dispatch",
      trustChips: ["Licensed & Insured", "Fast Response", "Upfront Pricing", "Satisfaction Guaranteed"],
      emergency: {
        title: "Burst Pipe? Backed-Up Drain? Don't Wait.",
        body: "Water damage gets worse by the minute. Call BlueLine Plumbing and we'll dispatch the nearest available plumber to your Austin home.",
        callLabel: "Call",
        note: "If water is actively spreading, shut off your main valve first — then call us.",
      },

      blueline: {
        brand: { lead: "Blue", accent: "Line", sub: "Plumbing" },
        topbarNote: "Residential Plumbing · Austin, TX & Surrounding Areas",
        heroEyebrow: "Residential Plumbing · Austin, Texas",
        heroPhoneNote: "24/7 emergency plumbing dispatch",
        heroBadge: "Austin, TX · Locally Focused",
        heroStatus: {
          title: "Emergency line open",
          body: "Plumbers on call across Austin today.",
        },
        ticker: [
          "Emergency Plumbing",
          "Drain Cleaning",
          "Water Heaters",
          "Leak Detection",
          "Sewer Line Repair",
          "Faucets & Fixtures",
          "Toilet Repair",
          "Pipe Repair",
          "Serving Austin, TX",
        ],
        trust: [
          {
            title: "Licensed & Insured",
            body: "Professional work from an accountable, covered team.",
          },
          {
            title: "Fast Response",
            body: "Quick dispatch for leaks, clogs, and no-hot-water emergencies.",
          },
          {
            title: "Upfront Pricing",
            body: "Clear estimates explained before any work begins.",
          },
          {
            title: "Satisfaction Guaranteed",
            body: "We stand behind every repair and installation we complete.",
          },
        ],
        servicesIntro:
          "From dripping faucets to full sewer line repairs, one call covers your whole home.",
        viewAll: "View All Services",
        detailsHead: {
          eyebrow: "Our Services",
          title: "Plumbing Services in Austin, TX",
          intro:
            "Professional residential plumbing from a local team — every job explained clearly, priced upfront, and finished right.",
        },
        faqIntro: "Quick answers for Austin homeowners.",
        finalPhone: "Or call directly:",
        serviceDetails: [
          {
            kicker: "Urgent Care",
            title: "Emergency Plumbing",
            body: "Burst pipes, active leaks, sewage backups, and sudden loss of water. When water is moving where it shouldn't, speed matters — call and we'll dispatch the nearest available plumber.",
            benefits: [
              "Priority dispatch for urgent calls, day or night",
              "Guidance on shutoffs and damage control while we're en route",
              "Clear explanation of the fix and the price before work begins",
            ],
            image: {
              src: "/demos/blueline-plumbing/service-emergency.webp",
              alt: "Technician shutting off a water valve during an emergency plumbing call",
            },
            request: "Request This Service",
            call: "Call for emergencies",
          },
          {
            kicker: "Clogs & Flow",
            title: "Drain Cleaning",
            body: "Slow drains, recurring clogs, and gurgling lines in sinks, tubs, showers, and main drains. We clear the blockage at its source instead of just punching a hole through it.",
            benefits: [
              "Blockages cleared at the source, not temporarily patched",
              "Careful methods that respect your pipes",
              "Practical tips to prevent repeat clogs",
            ],
            image: {
              src: "/demos/blueline-plumbing/service-drain.webp",
              alt: "Plumber feeding a drain auger cable into a sink drain",
            },
            request: "Request This Service",
            call: "Call us",
          },
          {
            kicker: "Hot Water",
            title: "Water Heater Repair",
            body: "No hot water, water that runs out too fast, odd noises, or pooling around the tank. We diagnose gas and electric tank heaters and give you a straight answer on repair versus replacement.",
            benefits: [
              "Thorough diagnosis of heating elements, valves, and thermostats",
              "Honest repair-vs-replace guidance",
              "Fast turnaround to get hot water back",
            ],
            image: {
              src: "/demos/blueline-plumbing/service-heater-repair.webp",
              alt: "Technician diagnosing a residential water heater with a multimeter",
            },
            request: "Request This Service",
            call: "Call us",
          },
          {
            kicker: "Hot Water",
            title: "Water Heater Installation",
            body: "When a repair no longer makes sense, we help you choose the right replacement for your household and install it cleanly — new connections, drain pan, and a tidy finish.",
            benefits: [
              "Sizing and selection help for your household's needs",
              "Old unit removed and hauled away",
              "Clean, careful installation with new copper connections",
            ],
            image: {
              src: "/demos/blueline-plumbing/service-heater-install.webp",
              alt: "Newly installed water heater with clean copper connections",
            },
            request: "Request This Service",
            call: "Call us",
          },
          {
            kicker: "Find It First",
            title: "Leak Detection",
            body: "Unexplained water bills, damp spots, or the sound of running water with everything off. We use systematic detection methods to pinpoint hidden leaks behind walls and under slabs.",
            benefits: [
              "Precise location of hidden leaks — no guesswork demolition",
              "Clear report of what we found and what it means",
              "Repair plan before any walls are opened",
            ],
            image: {
              src: "/demos/blueline-plumbing/service-leak-detection.webp",
              alt: "Technician using an electronic leak detection device along a bathroom wall",
            },
            request: "Request This Service",
            call: "Call us",
          },
          {
            kicker: "Main Line",
            title: "Sewer Line Repair",
            body: "Multiple drains backing up, sewer odors, or soggy patches in the yard point to the main line. We assess the problem and lay out your repair or replacement options plainly.",
            benefits: [
              "Assessment that identifies the real cause — roots, age, or bellied lines",
              "Repair and replacement options explained side by side",
              "Work planned to minimize disruption to your yard",
            ],
            image: {
              src: "/demos/blueline-plumbing/service-sewer.webp",
              alt: "Plumber working at a residential sewer cleanout pipe in a lawn",
            },
            request: "Request This Service",
            call: "Call us",
          },
          {
            kicker: "Fixtures",
            title: "Faucet and Fixture Repair",
            body: "Dripping faucets, low pressure, worn cartridges, and dated fixtures. We repair what's worth repairing and install beautiful new fixtures when it's time for an upgrade.",
            benefits: [
              "Drips and leaks stopped at the component level",
              "Modern fixture upgrades installed carefully",
              "Counters and finishes protected throughout",
            ],
            image: {
              src: "/demos/blueline-plumbing/service-faucet.webp",
              alt: "Gloved hands installing a modern brushed nickel kitchen faucet",
            },
            request: "Request This Service",
            call: "Call us",
          },
          {
            kicker: "Fixtures",
            title: "Toilet Repair",
            body: "Running toilets, constant clogs, leaks at the base, or slow refills. We repair components and seals — or install a new, efficient toilet when replacement makes more sense.",
            benefits: [
              "Running and wasting water stopped fast",
              "Seals, flappers, and fill valves replaced properly",
              "New toilet installation, leveled and sealed",
            ],
            image: {
              src: "/demos/blueline-plumbing/service-toilet.webp",
              alt: "Plumber installing a new toilet in a bright bathroom",
            },
            request: "Request This Service",
            call: "Call us",
          },
          {
            kicker: "Pipework",
            title: "Pipe Repair",
            body: "Corroded, leaking, or damaged supply pipes — including pinhole leaks common in older Austin homes. We repair or replace sections with durable materials and clean fittings.",
            benefits: [
              "Damaged sections repaired or replaced — not just clamped",
              "Quality copper and brass materials built to last",
              "System pressure-tested before we leave",
            ],
            image: {
              src: "/demos/blueline-plumbing/service-pipe-repair.webp",
              alt: "Neatly repaired copper pipe with clean brass fittings",
            },
            request: "Request This Service",
            call: "Call us",
          },
        ],
        helpCard: {
          title: "Not Sure What You Need?",
          body: "Describe the symptom — a drip, a clog, no hot water — and we'll point you in the right direction.",
        },
        hoursCard: {
          title: "Hours & Availability",
          rows: [
            { label: "Mon – Sat", value: "7:00 AM – 7:00 PM" },
            { label: "Sunday", value: "Emergency dispatch" },
            { label: "Emergencies", value: "24/7" },
          ],
          status: "Emergency line open now",
        },
        why: {
          eyebrow: "Why BlueLine",
          title: "Why Choose BlueLine Plumbing",
          intro:
            "Plumbing problems are stressful enough. Working with your plumber shouldn't be. Here's what Austin homeowners can expect from our team.",
          link: "Request service today",
          items: [
            {
              title: "Local Austin Expertise",
              body: "We know Austin homes — from older central-city bungalows to new builds across the suburbs — and the plumbing issues that come with them.",
            },
            {
              title: "Fast, On-Time Response",
              body: "We dispatch quickly for urgent calls and keep you informed about arrival times, so you're never left wondering.",
            },
            {
              title: "Upfront, Straightforward Pricing",
              body: "You'll understand the problem and the price before we pick up a tool. No surprises on the invoice.",
            },
            {
              title: "Respect for Your Home",
              body: "Floor protection, tidy work areas, and a full walkthrough before we leave — your home treated like our own.",
            },
          ],
        },
        emergencyStatus: "24/7 emergency dispatch available",
        beforeAfter: {
          eyebrow: "Before & After",
          title: "The Difference a Professional Makes",
          intro:
            "Drag the slider on each photo to compare worn-out plumbing with a clean, professional BlueLine result.",
          note: "Illustrative before/after images shown for this portfolio demonstration.",
          pairs: [
            {
              after: "/demos/blueline-plumbing/pipes-after.webp",
              afterAlt: "New gleaming copper pipes installed under a kitchen sink",
              before: "/demos/blueline-plumbing/pipes-before.webp",
              beforeAlt: "Old corroded leaking copper pipe before repair",
              caption: "Corroded supply pipes replaced with new copper",
              slider: "Compare before and after pipe repair",
            },
            {
              after: "/demos/blueline-plumbing/heater-after.webp",
              afterAlt: "New white water heater with clean copper connections",
              before: "/demos/blueline-plumbing/heater-before.webp",
              beforeAlt: "Old rusty corroded water heater tank before replacement",
              caption: "Failing water heater swapped for a new, properly drained install",
              slider: "Compare before and after water heater replacement",
            },
            {
              after: "/demos/blueline-plumbing/faucet-after.webp",
              afterAlt: "New matte black bathroom faucet on a clean white sink",
              before: "/demos/blueline-plumbing/faucet-before.webp",
              beforeAlt: "Old stained dripping faucet on a worn sink before replacement",
              caption: "Worn, dripping faucet upgraded to a modern fixture",
              slider: "Compare before and after faucet replacement",
            },
          ],
        },
        reviews: {
          eyebrow: "Testimonials",
          title: "What Austin Homeowners Say",
          intro: "Straightforward feedback from residential service calls.",
          note: "Sample testimonials written for this portfolio demonstration.",
          items: [
            {
              quote: "They found a slab leak fast and explained every step before touching a thing.",
              name: "Marcus H.",
              place: "Round Rock, TX",
              initials: "MH",
            },
            {
              quote: "Called about a water heater in the morning and had hot water again the same day.",
              name: "Elena G.",
              place: "South Austin, TX",
              initials: "EG",
            },
            {
              quote: "Upfront pricing, clean work, and they left the utility room spotless.",
              name: "Tommy W.",
              place: "Cedar Park, TX",
              initials: "TW",
            },
          ],
        },
        areas: {
          eyebrow: "Service Areas",
          title: "Serving Austin & Surrounding Areas",
          head: "One local team, covering the Austin metro — north to Georgetown, south to Kyle, and everywhere in between.",
          intro:
            "Based in Austin and working throughout the metro — from central neighborhoods to fast-growing communities north and south of the city.",
          cta: "Check Service Availability",
          note: "Don't see your neighborhood? Send a request and we'll confirm availability.",
          mapNote: "Map is a stylized illustration for this demo website.",
          mapAria: "Stylized demo map of the Austin metro service area",
          mapPlate: "AUSTIN METRO · DEMO MAP",
          cardsTitle: "Local to Austin, at Home Across the Metro",
          places: [
            {
              name: "Austin",
              note: "Our home base — central neighborhoods to new suburbs, all residential plumbing services.",
              hub: true,
              dot: { x: 320, y: 298, tx: 320, ty: 328, anchor: "middle" },
            },
            {
              name: "Round Rock",
              note: "Water heaters, drains, and fixture work for homes across Round Rock.",
              dot: { x: 352, y: 168, tx: 368, ty: 173, anchor: "start" },
            },
            {
              name: "Cedar Park",
              note: "Fast response for leaks, clogs, and urgent plumbing needs.",
              dot: { x: 236, y: 152, tx: 138, ty: 157, anchor: "start" },
            },
            {
              name: "Pflugerville",
              note: "Residential repairs and installations throughout Pflugerville.",
              dot: { x: 432, y: 192, tx: 448, ty: 197, anchor: "start" },
            },
            {
              name: "Georgetown",
              note: "Full-service plumbing for Georgetown homes and new builds.",
              dot: { x: 300, y: 88, tx: 316, ty: 93, anchor: "start" },
            },
            {
              name: "Leander",
              note: "Drain cleaning, pipe repair, and water heater service in Leander.",
              dot: { x: 182, y: 96, tx: 112, ty: 101, anchor: "start" },
            },
            {
              name: "Kyle",
              note: "South metro coverage for repairs and scheduled installations.",
              dot: { x: 300, y: 432, tx: 316, ty: 437, anchor: "start" },
            },
            {
              name: "Buda",
              note: "Reliable residential plumbing service across Buda.",
              dot: { x: 248, y: 474, tx: 196, ty: 479, anchor: "start" },
            },
          ],
        },
        areasIntro:
          "Our plumbers live and work in the same communities we serve. That means we understand the housing stock, the soil, and the water conditions that shape plumbing problems in Central Texas.",
        about: {
          eyebrow: "About BlueLine",
          title: "Your Neighborhood Austin Plumbing Team",
          paras: [
            "BlueLine Plumbing exists for one reason: to make home plumbing problems disappear — quickly, honestly, and without the runaround.",
            "BlueLine Plumbing was built on a simple idea: treat every home like it's our own. That means showing up when we say we will, explaining the problem in plain language, and fixing it right the first time.",
            "From quick fixture repairs to water heater replacements and sewer line work, we focus on doing residential plumbing the way it should be done.",
          ],
          list: [
            "Residential plumbing specialists",
            "Clear estimates before work begins",
            "Clean, careful workmanship in every home",
          ],
          cta: "More About This Concept",
        },
        story: {
          title: "Built Around Respect — for Homes and for Homeowners",
          paras: [
            "Plumbing is personal. We're invited into your home, often on a stressful day, and asked to fix something essential. We take that seriously.",
            "That's why every BlueLine visit follows the same rhythm: listen first, explain clearly, price upfront, work carefully, and leave the space cleaner than we found it. Whether it's a five-minute cartridge swap or a full water heater replacement, the standard doesn't change.",
            "We focus on residential plumbing across the Austin metro because homes are what we know — from vintage bungalows with original pipework to brand-new builds in the suburbs.",
          ],
        },
        values: {
          eyebrow: "Our Values",
          title: "The BlueLine Way",
          items: [
            {
              no: "01",
              title: "Show Up on Time",
              body: "Your day is planned around us. We commit to arrival windows and communicate if anything shifts.",
            },
            {
              no: "02",
              title: "Explain Before We Work",
              body: "You'll see what we see, understand the options, and approve the price before a single tool comes out.",
            },
            {
              no: "03",
              title: "Leave It Better",
              body: "Protected floors, tidy work, and a walkthrough at the end. Your home should feel better than before we arrived.",
            },
          ],
        },
        steps: {
          eyebrow: "The Process",
          title: "How a Service Call Works",
          items: [
            {
              no: "01",
              title: "Call or Request Online",
              body: "Tell us what's happening and when you're available. Emergencies get priority dispatch.",
            },
            {
              no: "02",
              title: "Assess & Quote",
              body: "We diagnose the problem, show you what we found, and provide a clear upfront estimate.",
            },
            {
              no: "03",
              title: "Fix It Right",
              body: "Approved work is completed carefully, tested, and walked through with you before we leave.",
            },
          ],
        },
        contactHead: {
          eyebrow: "Contact",
          title: "Request a Plumber in Austin, TX",
          intro:
            "Tell us what's going on and we'll take it from there. For active leaks or flooding, call us first so we can prioritize your visit.",
        },
        form: {
          name: "Name",
          namePlaceholder: "Your full name",
          phone: "Phone",
          phonePlaceholder: "(512) 555-0000",
          email: "Email",
          emailPlaceholder: "you@example.com",
          service: "Service Needed",
          serviceOption: "Select a service…",
          otherOption: "Other / Not Sure",
          message: "Message",
          messagePlaceholder:
            "Briefly describe the issue — e.g., 'Kitchen sink won't drain since last night.'",
          submit: "Request Service",
          fine: "Demo form — submissions are not sent or stored.",
          successTitle: "Request Received",
          successLead:
            "Thanks, {name} — we've noted your request for {service}. In a live deployment, our team would reach out to confirm your visit.",
          successDemo:
            "This is a demonstration form; nothing was transmitted. For immediate help, call {phone}.",
          reset: "Submit Another Request",
        },
        contactCards: [
          {
            title: "Call or Text",
            lines: ["Fastest way to schedule or get emergency help."],
            phone: true,
          },
          {
            title: "Business Hours",
            lines: [
              "Monday – Saturday: 7:00 AM – 7:00 PM",
              "Sunday: Emergency dispatch only",
            ],
          },
          {
            title: "Service Area",
            lines: [
              "Austin, TX and surrounding communities — Round Rock, Cedar Park, Pflugerville, Georgetown, Leander, Kyle, and Buda.",
            ],
          },
          {
            title: "24/7 Emergency Service",
            lines: [
              "Burst pipes and active leaks don't wait for business hours. Emergency dispatch is available around the clock.",
            ],
            dark: true,
          },
        ],
        fictionalNote:
          "BlueLine Plumbing is a fictional company. Contact details shown here are for demonstration only.",
        footer: {
          tag: "Residential plumbing services in Austin, Texas. Fast response, upfront pricing, and professional workmanship.",
          explore: "Explore",
          servicesTitle: "Services",
          contactTitle: "Contact",
          address: "Austin, TX & surrounding areas",
          legal: "© 2026 BlueLine Plumbing. All rights reserved.",
          demo: "BlueLine Plumbing is a fictional business created for a web design portfolio demonstration. All names, reviews, images, and contact details are illustrative.",
        },
        dialogs: {
          privacy: {
            title: "Privacy Policy",
            paras: [
              "This is a demonstration website for a fictional company. No personal information is collected, stored, or transmitted. Forms on this site are for visual demonstration only.",
              "In a production deployment, this section would describe data collection, cookie usage, and contact-data handling in plain language.",
            ],
          },
          terms: {
            title: "Terms of Service",
            paras: [
              "This website is a portfolio demonstration featuring a fictional business, BlueLine Plumbing. Content is illustrative and does not constitute an offer of real services.",
              "In a production deployment, this section would outline the terms governing use of the website and scheduling of services.",
            ],
          },
        },
      },
    },
  },
  {
    slug: "ember-restaurant",
    index: "02",
    demo: "restaurant",
    name: "Ember & Oak",
    businessType: "Restaurant / Hospitality",
    industry: "Local Dining",
    category: "Hospitality",
    summary:
      "A bright, print-led restaurant concept that answers a diner's practical questions first — when it serves, what the fire is doing at each seating, what is on the card — then names the room it deliberately does not photograph.",
    objective:
      "Convey the atmosphere of a small fire-only room without borrowing a single photograph, and remove every practical reason not to ask for a table.",
    strategy:
      "Facts first, mood second, no stock imagery. The hours board opens the page, the fire is something you choose rather than admire, the card filters down to what you can actually eat, and both forms build their answer in front of you while saying plainly that nothing left the page. The open-or-closed line is worked out from the hours printed underneath it and the visitor's own clock, so the one claim the page makes about the room is a claim you can check.",
    designDirection: ["Printed card", "Fire ink", "Asymmetric editorial", "Named photo slots"],
    keySections: [
      "Service board",
      "Hero",
      "The kitchen",
      "The evening",
      "The card",
      "The room",
      "The long table",
      "Reservations",
      "Visit",
      "How we cook",
      "Before you book",
    ],
    mobileNotes: [
      "Call and Find a table stay pinned to the bottom of the phone frame, where a diner actually needs them",
      "The card's filters are wrapping chips, so a thumb can narrow the whole card down to what you can actually eat",
      "Every entry is 16px, so focusing a field never zooms the page away from the form",
      "Seatings are generated from the printed hours, so a phone is never offered a time the room does not serve",
      "The evening stages turn with buttons and arrow keys, not a swipe a visitor cannot see the end of",
    ],
    conversionNotes: [
      "Find a table sits in the header, the hero, each fire block, the room, the reservation itself and the pinned bar — all on one destination",
      "The live status line answers the first question a diner asks, in the header, before they scroll",
      "Choosing a seating carries straight into the reservation, so the page finishes the sentence the hero started",
      "The read-back repeats the request and states plainly that no table is held",
    ],
    accent: "#C8642B",
    /* Fire ink on paper: a warm cream room, near-black brown ink, burnt orange and
       an olive that only ever appears as a fill because it cannot clear 4.5:1 as
       small text. DemoVars derives every grey, both boundary colours and the
       button ink from these four at render time, so this concept has no second
       stylesheet and no dark-mode branch. */
    palette: { bg: "#F4EBDD", fg: "#241811", accent: "#C8642B", accent2: "#7C8460" },
    content: {
      navName: "Ember & Oak",
      ctaPrimary: "Reserve a Table →",
      ctaSecondary: "See the Card",
      services: [
        { title: "The Grill", body: "Dry-aged beef and whole fish over oak and beech." },
        { title: "The Hearth", body: "Roots and alliums buried in the ash." },
        { title: "The Cold Room", body: "Cured fish and things we keep for later." },
        { title: "The Cellar", body: "Low-intervention wine, poured by the glass." },
      ],
      faqTitle: "Before You Book",
      faqs: [
        {
          q: "Do you take walk-ins?",
          a: "A few seats at the counter are held back for people who arrive without asking. Everything else goes out through the reservation book.",
        },
        {
          q: "Can you cook around an allergy?",
          a: "Usually, if we hear it in advance. Put it in the booking note and the kitchen will tell you honestly whether it can do the job properly that night.",
        },
        {
          q: "Is there a set menu?",
          a: "No. The card changes with the week, so you choose course by course and nobody is locked into a long dinner they did not ask for.",
        },
        {
          q: "Do you take large groups?",
          a: "The long table seats fourteen and is enquired about rather than taken online. The form there builds the enquiry so you can read it back, and the number on this page finishes the conversation.",
        },
        {
          q: "Why are there no prices on the card?",
          a: "Because the restaurant is invented. Any figure printed here would be a made-up number for a room that does not exist, and a number set beside a dish reads as a price even when it is a sample. A real card would carry real numbers, with no service charge added to the table.",
        },
        {
          q: "Is Ember & Oak a real restaurant?",
          a: "No. It is a concept website — a design and functionality demonstration for a fictional fire-led kitchen. The photographs are named instead of borrowed, the street and the telephone number are invented, and nothing entered on this page reaches anybody.",
        },
      ],

      /* The reservation cannot really hold a table, so the status line says what
         pressing the button did in a diner's own words. */
      formNote:
        "This form is part of a concept website: nothing has been booked and no request was sent. A real reservation book would confirm the table here.",

      restaurant: {
        board: [
          "Dinner Wednesday – Saturday, from 18:00",
          "Sunday lunch 12:00 – 17:00",
          "Closed Monday and Tuesday",
          "Fire lit at 16:00 · oak and beech",
        ],
        header: {
          concept: "Concept site, not a real restaurant",
          openLine: "Dinner Wed–Sat from 18:00 · Sunday lunch 12:00",
          /* The chip is arithmetic on the hours printed below and the clock in the
             visitor's own device, and the lead-in says so. */
          statusLead: "From the hours below and your own clock:",
          phoneLabel: "Call the room",
          book: "Find a table",
        },
        hero: {
          headline: "Everything Here",
          accent: "Has Met A Flame.",
          eyebrow: "Ash-fired kitchen · Twenty-two covers",
          lede:
            "One fire, two blocks, and a card rewritten on Monday. The room is small and the grill sits at the back of it, so the kitchen is part of the evening rather than something happening behind a wall. If a dish is not going well, we say so at the table instead of waiting for you to notice.",
          hoursLine: "Dinner Wednesday to Sunday · from 18:00",
          facts: [
            { label: "Covers", value: "22" },
            { label: "Blocks", value: "18:00 / 21:00" },
            { label: "The card", value: "Rewritten Mondays" },
          ],
          /* The fire is the deciding fact of the evening, so it is something the
             visitor chooses here rather than a band of cards further down the
             page. Each block answers with its own drawing. */
          fire: {
            title: "Choose The Fire You Will Eat",
            body:
              "It is the same grill all evening and not the same fire at six and at nine. Pick a block and the page tells you what the kitchen does best while that one burns.",
            blocks: [
              {
                time: "18:00",
                label: "First block",
                note: "Flame, still tall. Take this one if you want the grill's full attention.",
                ask: "Ask For The First Block",
                slot: "18:00",
              },
              {
                time: "21:00",
                label: "Second block",
                note: "Coals by then, which is what the hearth roots were waiting for.",
                ask: "Ask For The Second Block",
                slot: "21:00",
              },
              {
                time: "12:00",
                label: "Sunday only",
                note: "One continuous lunch until 17:00. Shorter card, no second block.",
                ask: "Ask About Sunday Lunch",
                preset: "Sunday lunch — the 12:00 service. There is no second block that day.",
              },
            ],
            live: "Chosen fire",
            drawn: "A drawing of the fire at that age. This concept ships no photograph.",
          },
          slot: {
            kind: "Photo slot",
            note:
              "The chain, lowered onto the coals, with a tall tongue of fire behind it. A real build would put its own room picture here; this one names it instead of borrowing somebody else's.",
          },
        },
        intro: {
          eyebrow: "The Kitchen",
          body:
            "There is one fire in this building and it does almost all the work. Meat and fish go straight onto the bars. Roots and alliums go into the ash under a foil hood, where they cook slower and taste of somewhere else. Bread arrives still ticking from the heat, and the butter is cultured here because it takes four days and we have them.",
        },
        /* The evening as four movements, one at a time — the shape of the meal
           before eighteen names on a card. */
        evening: {
          eyebrow: "The Evening",
          title: "Two Hours, Four Movements",
          body:
            "A full dinner in the first block runs to about two hours, and it lands in a rough order. Here is that order, so nothing surprises you when it arrives at the table.",
          stages: [
            {
              label: "Bread before six",
              line:
                "Sourdough goes over the bars and the butter is made here, so both arrive still ticking while the fire is being built around the room. Nobody orders them; they simply come.",
              note: "The only part of the evening that happens the same way at every block.",
              slot: {
                kind: "Photo slot",
                note: "Torn sourdough and a dish of cultured butter on a board at the table's edge.",
              },
            },
            {
              label: "Small plates",
              line:
                "Starters are salted and small, meant to be eaten while the kitchen is still settling. Two between four people is the right ask.",
              note: "Order as few or as many as you like — nothing here is a set menu holding the grill back.",
              slot: {
                kind: "Photo slot",
                note: "Three small plates laid along a wooden table, no cutlery beside them yet.",
              },
            },
            {
              label: "What the fire does",
              line:
                "Mains come off the bars and rest beside the flame rather than under a lamp, which is why the age of the fire matters more than the time on your booking.",
              note: "A whole fish and a ribeye are not the same wait. The kitchen will tell you which is which.",
              slot: {
                kind: "Photo slot",
                note: "Steaks on the bars, embers glowing under them, smoke leaving frame to the right.",
              },
            },
            {
              label: "Puddings, then the cellar",
              line:
                "Dessert is made in the afternoon, so it stops when the afternoon stops. After that the list is short and the cellar card is on the table.",
              note: "Nobody is rushed out between blocks, and the room does not turn your table over.",
              slot: {
                kind: "Photo slot",
                note: "A glazed pudding in a dark bowl at the far end of a candle-lit table.",
              },
            },
          ],
          prev: "Previous stage",
          next: "Next stage",
          dots: "Go to stage",
          of: "of",
          hint: "Once a stage has focus, the left and right arrow keys turn them.",
        },
        menu: {
          eyebrow: "The Card",
          title: "This Week, Without Numbers",
          lead:
            "The card changes with the week, so this is what is on it now. Everything is cooked to order, over one fire, in one kitchen.",
          noPrices:
            "There are no prices on this card. This is a concept site, and a figure beside a dish reads as a price even when it is a sample — so an invented room gets no invented sums. A real card would be printed with numbers only and would add no service charge to the table.",
          filters: [
            { key: "all", label: "Everything" },
            { key: "veg", label: "Vegetarian" },
            { key: "vegan", label: "Vegan" },
            { key: "gf", label: "No gluten" },
            { key: "heat", label: "With heat" },
          ],
          legend: [
            { mark: "veg", means: "No meat or fish" },
            { mark: "vegan", means: "Nothing from an animal, in the pan or on the plate" },
            { mark: "gf", means: "Ordered without gluten — one kitchen, so never a guarantee" },
            { mark: "medium", means: "Noticeable heat" },
            { mark: "hot", means: "Properly hot" },
          ],
          countNoun: "dishes",
          allergy:
            "Everything is cooked in one kitchen, over one fire, beside flour and nuts. We cannot promise a dish is free of anything, and we would rather say that than imply the opposite. Tell us when you ask for a table and we will be straight with you about what the kitchen can do that night.",
          note:
            "The card is rewritten on Monday. If a dish matters to you, say so when you ask for a table and we will tell you whether it is still on.",
          sections: [
            {
              label: "Starters",
              blurb: "Small, salted, and meant to be eaten while the grill is still settling.",
              slot: {
                kind: "Photo slot",
                note: "A hand-built starter board on the pass, seen from the diner's side of it.",
              },
              dishes: [
                {
                  name: "Ember Leeks",
                  desc: "Buried in the ash, hazelnut, aged sheep's cheese",
                  marks: ["veg"],
                },
                {
                  name: "Grilled Sourdough",
                  desc: "Cultured butter, smoked salt, thyme oil",
                  marks: ["veg"],
                },
                {
                  name: "Charred Hispi",
                  desc: "Olive oil, lemon, toasted chilli",
                  marks: ["veg", "vegan", "gf", "medium"],
                },
                {
                  name: "Smoked Beetroot",
                  desc: "Goat curd, walnut, honey vinegar",
                  marks: ["veg", "gf"],
                },
                {
                  name: "Cured Trout",
                  desc: "Buttermilk, cucumber, dill oil",
                  marks: [],
                },
              ],
            },
            {
              label: "Mains",
              blurb: "Off the bars, rested by the fire, never held under a lamp.",
              slot: {
                kind: "Photo slot",
                note: "The whole fish on its bars, a spoon of brown butter going over it.",
              },
              dishes: [
                {
                  name: "Dry-Aged Ribeye",
                  desc: "Bone marrow, watercress, burnt onion",
                  marks: ["gf"],
                },
                {
                  name: "Whole Plaice",
                  desc: "Brown butter, capers, sea herbs",
                  marks: ["gf"],
                },
                {
                  name: "Coal-Roast Chicken",
                  desc: "Morels, tarragon, pan gravy",
                  marks: ["gf"],
                },
                {
                  name: "Aged Pork Chop",
                  desc: "Quince, fennel, mustard greens",
                  marks: ["gf", "medium"],
                },
                {
                  name: "Smoked Haddock",
                  desc: "Crab, cauliflower, brown shrimp butter",
                  marks: [],
                },
                {
                  name: "Fire-Roast Celeriac",
                  desc: "Black garlic, hazelnut, buried whole for four hours",
                  marks: ["veg", "vegan", "gf", "hot"],
                },
              ],
            },
            {
              label: "Dessert",
              blurb: "Three puddings and a cheese board, all made in the afternoon.",
              slot: {
                kind: "Photo slot",
                note: "A pudding spooned into a warmed bowl at the end of the service.",
              },
              dishes: [
                {
                  name: "Burnt Honey Custard",
                  desc: "Oat crumble, crème fraîche",
                  marks: ["veg"],
                },
                {
                  name: "Chocolate and Olive Oil",
                  desc: "Sea salt, bay leaf ice cream",
                  marks: ["veg", "gf"],
                },
                {
                  name: "Baked Pear",
                  desc: "Sourdough ice cream, walnut praline",
                  marks: ["veg"],
                },
                {
                  name: "Cheese, Two",
                  desc: "Oatcakes, quince out of the pot",
                  marks: ["veg"],
                },
              ],
            },
            {
              label: "Drinks",
              blurb: "The short list. The cellar card is longer and comes to the table.",
              slot: {
                kind: "Photo slot",
                note: "Two glasses on a dark bar top, the bottle label out of frame.",
              },
              dishes: [
                {
                  name: "Barrel-Aged Negroni",
                  desc: "Orange peel, bitter wine",
                  marks: [],
                },
                {
                  name: "Smoked Old Fashioned",
                  desc: "Maple, black walnut bitters",
                  marks: [],
                },
                {
                  name: "Wine, By The Glass",
                  desc: "Three whites, three reds, one orange",
                  marks: [],
                },
                {
                  name: "Spruce and Honey Soda",
                  desc: "No alcohol, made in the kitchen",
                  marks: [],
                },
              ],
            },
          ],
        },
        room: {
          eyebrow: "The Room",
          title: "Twenty-Two Covers, One Fire",
          paras: [
            "The tables are close enough that you can hear the kitchen deciding things. It is not a quiet restaurant and it does not pretend to be one.",
            "Service runs in two blocks so the grill can keep up with the room. The first table is seated at six, the last at nine, and nobody is turned out in between.",
          ],
          /* The room's own line about itself — not a diner's, not a press quote,
             and nothing here is a review. */
          quote:
            "We have no fryer, no combi oven and no second hob. Everything on your table has been within a metre of that fire.",
          tall: {
            kind: "Photo slot",
            note: "Two hands passing small plates over the pass, in low light.",
          },
          small: {
            kind: "Photo slot",
            note: "A pudding in a dark glazed bowl, a flower from the window box on top.",
          },
        },
        groups: {
          eyebrow: "Private Dining",
          title: "The Long Table",
          body:
            "A door closes, the candles come down the table, and fourteen people eat the same menu at the same time. It is cooked the same way as everything else in the building — on the fire, in front of you.",
          bands: ["6 – 8", "9 – 11", "12 – 14", "15 and up"],
          callUs:
            "One table takes fourteen. Anything larger is a conversation on the telephone rather than a form, because the room has to be checked against the fire first.",
          points: [
            "Seats up to fourteen",
            "One menu, agreed in advance",
            "The grill is fired for your table only",
            "No booking is made from this page",
          ],
          fields: {
            size: "Party",
            date: "Preferred date",
            name: "Your name",
            contact: "Phone or email",
            notes: "What the room should know",
          },
          note:
            "Nothing is held here. This ticket is a record of what you would ask for, and it stays in your browser.",
          ticket: {
            title: "Enquiry ticket",
            lead: "Fill it and read it back in the same hand as the reservation. Nothing has been sent and no date is held.",
            empty: "Change a field and the line appears here, written the way the booking reads itself.",
          },
        },
        booking: {
          eyebrow: "Reservations",
          title: "Find A Table",
          body:
            "Two to eight are asked for here; anything larger goes through the telephone so the room can check it will take you. The form asks the questions a reservation book actually records.",
          parties: [2, 3, 4, 5, 6, 7, 8],
          callUs: "A table for nine or more is checked against the room before it is promised. Use the number below.",
          occasions: ["No occasion", "Birthday", "Anniversary", "Business dinner", "Just because"],
          stepMinutes: 30,
          lastSeatingMinutes: 90,
          slotAsk: "Seatings for",
          /* Covers both empty cases the grid can reach: a day the room does not
             serve, and a day whose remaining seatings have already gone. */
          slotNone:
            "Nothing left to ask for on that day — the room either does not serve then, or its last seating has already gone.",
          week: [
            { day: "Monday", dow: 1, open: null, close: 1410, shown: "Closed" },
            { day: "Tuesday", dow: 2, open: null, close: 1410, shown: "Closed" },
            { day: "Wednesday", dow: 3, open: 1080, close: 1410, shown: "18:00 – 23:30" },
            { day: "Thursday", dow: 4, open: 1080, close: 1410, shown: "18:00 – 23:30" },
            { day: "Friday", dow: 5, open: 1080, close: 1410, shown: "18:00 – 23:30" },
            { day: "Saturday", dow: 6, open: 1080, close: 1410, shown: "18:00 – 23:30" },
            { day: "Sunday", dow: 0, open: 720, close: 1020, shown: "12:00 – 17:00" },
          ],
          hoursTitle: "Service hours",
          closedWord: "Closed",
          statusNote:
            "The room cannot check a clock for you. This line is the hours above set against the time on your own device, in your own timezone.",
          address: ["14 Ashgrove Lane", "Old Foundry Quarter"],
          access:
            "Step-free from the pavement as far as two tables; the pass itself is one step up.",
          parking:
            "No car park of its own. The nearest bays are a short walk, and this concept cannot confirm what they charge.",
          planNote:
            "A drawing of the room, not a map. The street is invented with the rest of it, so there is no pin to drop and no route to promise.",
          phone: { display: "(555) 555-0166", href: "tel:+15555550166" },
          submit: "Find a Table",
          note: "Tables are held for the block you ask for, not for the whole evening. Running late is worth a call.",
          hints: {
            date: "Tonight onwards. A day the room has already served cannot be asked for.",
            time: "Built from the hours above — half-hour steps up to the last seating, nothing outside them.",
            party: "Two to eight here. Anything larger is checked against the room first.",
            notes: "Allergies, a wheelchair, a pram, a table you would rather not sit beside the grill. Say it here.",
          },
          confirm: {
            title: "Asked for, not booked",
            lead:
              "This is what the form received. Nothing left this page, so the table is not held and nobody has been told to expect you.",
            edit: "Change it",
          },
        },
        how: {
          eyebrow: "How We Cook",
          title: "Four Things A Printed Card Leaves Out",
          body:
            "A menu is a promise that only goes one way. These are the honest answers to the questions a card cannot ask.",
          points: [
            {
              title: "One fire",
              text: "Everything is cooked on the same bars, in the same draught, at the same speed. A dish can be late because another dish is in front of it.",
            },
            {
              title: "One kitchen",
              text: "Flour, nuts, fish and dairy share a metre of worktop. We can move things around; we cannot promise a plate is free of anything.",
            },
            {
              title: "A card that moves",
              text: "The menu is rewritten on Monday, so a dish read here last week may already be gone. Say so when you ask for a table.",
            },
            {
              title: "And one thing about this page",
              text: "Ember & Oak is a concept site. The room, the street and the number are invented, so nothing on it is a reservation, a price or an opening hour you can rely on.",
            },
          ],
        },
      },
    },
  },
  {
    slug: "maison-lune",
    index: "03",
    demo: "salon",
    name: "Maison Lune",
    businessType: "Beauty Studio",
    industry: "Hair & Beauty",
    category: "Hospitality",
    summary:
      "A quiet cream studio site built around one continuous price list kept in rule and type, a stylist roster that drops you into the booking with that name already chosen, and an honest four-step request.",
    objective:
      "Make a small studio feel calm and premium, and turn a visitor into an appointment without a heavy storefront.",
    strategy:
      "Restraint, and one shape used only where it earns its place. A beauty studio sells on atmosphere and trust, so the room's arches carry the plates that stand taller than they are wide — the arch that opens the page and its shorter companion on a wide screen, the stylist monograms, the one upright photograph — while every wide photograph keeps soft corners instead, because a semicircle cap on a landscape shot eats the picture. Everything a studio usually pads with cards and stock claims is set as ruled type: one continuous dotted-leader menu that filters by family, a roster you can book from directly, and a request that stops short of pretending to send.",
    designDirection: ["Soft luxury", "Arch motif", "Didone editorial", "Calm"],
    keySections: ["Hero", "Statement", "Price Card", "Roster", "Booking", "Gallery", "Visit"],
    mobileNotes: [
      "The header nav is a hamburger sheet on the phone and tablet frames and only splits around the wordmark at the desktop frame",
      "The live appointment stub moves above the choices, so a phone reads its own summary first",
      "A sticky Book bar keeps the appointment reachable with one thumb",
      "Each gallery plate keeps the ratio measured from its file, so no photograph is cropped and no line jumps as it loads",
    ],
    conversionNotes: [
      "One booking destination — the header pill, the hero, the sheet, and the sticky bar all land on the same section",
      "The roster's Book with links fill the stylist step before the flow even opens",
      "Menu chips filter and recount in place, so a visitor finds their service without hunting a tab",
      "The receipt repeats what was chosen and says plainly that no chair is held",
    ],
    accent: "#B5776A",
    palette: { bg: "#F7F2EC", fg: "#2B221D", accent: "#B5776A", surface: "#E9DFD3" },
    content: {
      /* The salon layout renders nothing from the shared local-service base
         except `navName`, which its header and footer both draw. Everything else
         it shows lives under `salon` below. See ruling H. */
      navName: "Maison Lune",
      formNote:
        "This page is part of a concept website. Nothing was sent and no chair was held — the request stopped in your browser.",
      imageSource:
        "Photography: Tile Merchant Ireland, Franco Debartolo, Mohamed B., Ksenia Pixelesse and iridial — all used under the Unsplash License. This is a fictional studio; the rooms shown are not this studio's.",

      salon: {
        announcement: "Now booking, Tuesday to Saturday",
        hero: {
          src: "/demos/maison-lune/hero.webp",
          alt: "The studio floor: tan styling chairs beneath arched gold mirrors, a wash basin in the foreground, no people.",
          eyebrow: "Hair & Beauty Studio",
          headline: "A quiet room for",
          accent: "slow appointments.",
          sub: "Few chairs, unhurried appointments, and a menu kept short so each one gets the time it needs.",
          note: "Appointments open",
          ctaPrimary: "Book an Appointment",
          ctaSecondary: "See the Menu",
          inset: {
            src: "/demos/maison-lune/marble.webp",
            alt: "Two tan styling chairs on a polished marble floor, seen from behind.",
          },
          spine: "Hair · Colour · Skin · Nails",
        },
        statement:
          "We are a small studio. We would rather do fewer people well than fill a calendar — so a haircut is not squeezed between the appointments on either side of it.",
        statementSign: "The rule the room is kept by",
        menu: {
          eyebrow: "The Menu",
          title: "What we do",
          lead: "A short menu, kept short on purpose. Every treatment is priced from a floor figure and timed so it does not have to be rushed.",
          all: "Everything",
          countNoun: "treatments shown",
          families: [
            {
              label: "Hair",
              items: [
                { name: "Cut & Style", desc: "A consultation, a wash, and a cut you can live with.", duration: "60 min", price: "from $65" },
                { name: "Blow-dry", desc: "Prepped, dried and finished to leave the chair ready.", duration: "40 min", price: "from $45" },
                { name: "Keratin smoothing", desc: "A frizz-taming finish that settles over the next few washes.", duration: "150 min", price: "from $180" },
              ],
            },
            {
              label: "Colour",
              items: [
                { name: "Root retouch", desc: "A grown-out root line, blended back into the length.", duration: "75 min", price: "from $85" },
                { name: "Balayage", desc: "Hand-painted, sun-kissed ends with no hard line.", duration: "180 min", price: "from $210" },
                { name: "Gloss & tone", desc: "A sheer colour bath that brings back shine.", duration: "45 min", price: "from $55" },
              ],
            },
            {
              label: "Skin",
              items: [
                { name: "Express facial", desc: "Cleanse, exfoliate and hydrate in half an hour.", duration: "30 min", price: "from $50" },
                { name: "Signature facial", desc: "A longer treatment built around what your skin needs.", duration: "75 min", price: "from $95" },
                { name: "Brow shape", desc: "Waxed or threaded, and tidied to suit your face.", duration: "20 min", price: "from $24" },
              ],
            },
            {
              label: "Nails",
              items: [
                { name: "Classic manicure", desc: "Shape, cuticle care and a coat of polish.", duration: "45 min", price: "from $38" },
                { name: "Gel overlay", desc: "A longer-wearing finish that cures under a lamp.", duration: "60 min", price: "from $55" },
                { name: "Spa pedicure", desc: "A soak, an exfoliation and a clean finish.", duration: "60 min", price: "from $60" },
              ],
            },
          ],
          footnotes: [
            "A colour service is quoted after a look at your hair's history. The figure on this card is where that conversation starts, not where it ends.",
            "A longer treatment runs over its listed time when a correction turns up. The studio tells you before it begins, never after.",
          ],
          plate: {
            src: "/demos/maison-lune/tools.webp",
            alt: "Nail scissors, files and wooden sticks laid out on a soft grey towel.",
            caption: "The tools, laid out before the first client",
            /* Measured from the file, not chosen for the layout. */
            ratio: "800/531",
          },
        },
        booking: {
          eyebrow: "Appointments",
          title: "Book in four steps",
          body: "Pick what you would like, who you would like to see, and when. Four steps, and a summary that fills itself in as you go.",
          steps: ["Service", "Stylist", "Time", "Review"],
          /* Tuesday to Saturday: the studio is shut on Mondays, so a Monday chip
             would offer a day the room is closed. The last slot ends before the
             earliest closing time on the board. */
          days: ["Tue 13", "Wed 14", "Thu 15", "Fri 16", "Sat 17"],
          times: ["09:30", "11:00", "13:15", "15:00"],
          submit: "Request Appointment",
          note: "Concept site — this booking does not send anywhere and no chair is held.",
          terms: [
            {
              label: "Deposit",
              body: "Colour and keratin bookings ask for a deposit ahead of the appointment. The studio confirms the amount when it replies, before anything is taken.",
            },
            {
              label: "Running late",
              body: "A treatment needs the time it was given. Past a quarter of an hour the chair is usually shortened rather than pushed back into the next appointment.",
            },
          ],
          confirm: {
            title: "Request noted",
            lead: "This is the request as the page has it — the service, the stylist and the time picked in the three steps above.",
            edit: "Change it",
          },
          ui: {
            summary: "Your appointment",
            back: "Back",
            next: "Continue",
            unchosen: "Not chosen yet",
            needChoice: "Make a choice to continue",
            legends: {
              service: "What are you coming in for?",
              stylist: "Anyone in particular?",
              time: "When suits you?",
            },
            slotsNote:
              "These days and slots belong to the concept, not to a diary. A real studio would show only the times its chairs are actually free.",
            bookWithAria: "Request this stylist",
          },
        },
        team: {
          eyebrow: "The Studio",
          title: "Who you'll see",
          intro: "Three stylists share the room. You can ask for a favourite, or let the studio pair you with whoever suits the service.",
          bookWith: "Book with",
          takes: "Takes",
          members: [
            {
              name: "Noor",
              initials: "N",
              role: "Senior Stylist",
              focus: "Cuts, curl re-shaping and colour correction.",
              sees: ["Cut & Style", "Blow-dry", "Keratin smoothing"],
            },
            {
              name: "Elise",
              initials: "E",
              role: "Colour Specialist",
              focus: "Balayage, lived-in blonde and toning.",
              sees: ["Root retouch", "Balayage", "Gloss & tone"],
            },
            {
              name: "Priya",
              initials: "P",
              role: "Skin & Nails",
              focus: "Facials, brow shaping and gel finishes.",
              sees: ["Signature facial", "Brow shape", "Gel overlay"],
            },
          ],
        },
        gallery: {
          eyebrow: "The Room",
          title: "Inside the studio",
          lead: "A working room, photographed between appointments. No faces and no products posed as endorsements.",
          items: [
            { src: "/demos/maison-lune/stations.webp", alt: "A row of tan styling chairs and arched gold mirrors along a cream wall.", caption: "The styling floor", ratio: "1200/800" },
            { src: "/demos/maison-lune/braid.webp", alt: "Fresh cornrow braids seen from behind, mid-style.", caption: "Braiding & texture", ratio: "880/1100" },
            { src: "/demos/maison-lune/corner.webp", alt: "A white lounge chair and a round standing mirror in a cream alcove.", caption: "The quiet corner", ratio: "1200/800" },
            { src: "/demos/maison-lune/towels.webp", alt: "A stack of rolled white towels warming in sunlight on a wooden bench.", caption: "Fresh from the wash", ratio: "1200/802" },
          ],
        },
        studio: {
          eyebrow: "How we work",
          title: "A few things we keep to",
          points: [
            { title: "Quality products", body: "We use the same lines on our own hair and skin, and we only stock what we would recommend to a friend." },
            { title: "A calm space", body: "Low music, daylight, and no two appointments scheduled back-to-back on the same chair." },
            { title: "Consultation first", body: "Colour and longer treatments start with a short talk about your hair, so nothing begins before you agree to it." },
          ],
        },
        offer: {
          title: "New here?",
          body: "Your first visit includes a short consultation and a take-home sample, chosen at the chair.",
        },
        visit: {
          eyebrow: "Visit",
          title: "Finding the studio",
          address: ["Maison Lune", "142 Alder Street", "Springfield"],
          hours: [
            { day: "Mon", time: "Closed" },
            { day: "Tue", time: "09:00 – 18:00" },
            { day: "Wed", time: "09:00 – 18:00" },
            { day: "Thu", time: "09:00 – 18:00" },
            { day: "Fri", time: "09:00 – 18:00" },
            { day: "Sat", time: "09:00 – 16:00" },
            { day: "Sun", time: "Closed" },
          ],
          phone: { display: "(555) 555-0187", href: "tel:+15555550187" },
          arriving:
            "There is no reception desk, so the door stays unlocked through the hours above and the stylist comes out to meet you. Alder Street is one-way from the corner, which puts the entrance on the far side of the building.",
        },
      },
    },
  },
  {
    slug: "rowanwood-dental",
    index: "04",
    demo: "dental",
    name: "Rowanwood Dental",
    businessType: "Dental Practice",
    industry: "Dental Care",
    category: "Service",
    summary:
      "A dental practice site that lets you point at the problem, tells you whether it can wait, and translates the letter — without a price, a review or a photograph it cannot stand behind.",
    objective:
      "Make a nervous new patient trust the practice enough to book — without a single review, rating, before/after, credential, price or photograph of a building that does not exist.",
    strategy:
      "A leaflet that answers back. The page order still follows what a patient decides on — can I be seen, what happens in the chair, what will it cost — but where a printed leaflet can only state, this one asks: point at the part of the mouth and the words that fit, and the page tells you what that visit usually involves and how long to allow, then writes your answers into the request slip so nothing is typed twice. A six-question self-check does the same for the more urgent question of whether today is an emergency-department day or a Monday morning one. Trust is still built entirely out of process, because process is the only thing a concept practice can show without borrowing somebody else's testimonials — and every place a real build would need evidence that does not exist yet is left as a labelled empty slot rather than filled with an invention.",
    designDirection: [
      "Printed leaflet, interactive",
      "Clinical sage",
      "Hairline index",
      "Drawn diagram, not a stock photo",
      "Reassuring, not slick",
    ],
    keySections: [
      "Status board",
      "Hero with a paced-breathing widget",
      "Smile planner",
      "In pain today",
      "Can this wait? self-check",
      "The practice",
      "Treatments index",
      "What a written plan is made of",
      "Nervous patients",
      "The first hour",
      "Nine terms in ordinary English",
      "Reviews slot and questions",
      "Request slip",
    ],
    mobileNotes: [
      "The pain band and its call action sit above the treatment index, not below it",
      "Reason, day and part-of-day are chips, so the request form is answered with taps",
      "The number is a button inside a device frame and explains why it cannot dial",
      "A sticky Request bar keeps the form reachable, with the last section padded clear of it",
      "The mouth diagram is drawn to scale from its own viewBox, so it fills a 320px screen and keeps every region at least 44px of tap area",
      "The treatment table stacks to one row per card below the leaflet's own measure, and each stacked cell reprints its column head",
      "The self-check is one question at a time, so the answer is never a wall of six yeses",
    ],
    conversionNotes: [
      "Two routes, split honestly: call for pain, request for everything else",
      "The no-price stance arrives with a reason and a promise, so it reads as honesty and not evasion — and the cost section replaces the missing figure with the five questions that make any figure make sense",
      "The confirmation reads the request back and says plainly that no appointment exists yet",
      "The planner is the top of the funnel: an anxious visitor who has tapped a diagram is already half-way through telling somebody what is wrong",
      "The scheduler link stays on the page and names itself as unwired, so the honest route is the obvious one rather than a dead button",
    ],
    accent: "#2E6F5E",
    /* Cool clinical sage on a pale green-white — the one family of colours a
       dental site reaches for is blue and white, and that is the look every
       other concept here is already avoiding. */
    palette: { bg: "#F4F6F3", fg: "#10201A", accent: "#2E6F5E", surface: "#E7EDE7" },
    content: {
      /* The dental layout renders nothing from the shared local-service base
         except `navName`. Everything else it shows lives under `dental`. */
      navName: "Rowanwood",
      formNote:
        "This form is part of a concept website. Nothing was sent and no appointment exists — a real practice would confirm the time by phone.",
      dental: {
        board: [
          { tag: "Hours", text: "Mon – Thu 08:00 – 17:30 · Fri to 17:00 · Sat 09:00 – 13:00" },
          { tag: "Pain", text: "Two slots held back each afternoon, until four o'clock" },
          { tag: "Getting in", text: "Step-free from the lane, and a lift to the first floor" },
          { tag: "First", text: "A written plan, handed over, before you agree to anything" },
        ],
        header: {
          concept: "Concept practice — nothing here is real",
          openLine: "Open Monday to Saturday",
          phoneLabel: "Call Rowanwood",
          book: "Request a visit",
        },
        calm: {
          label: "Breathe with it",
          phases: [
            { word: "In", seconds: 4 },
            { word: "Hold", seconds: 4 },
            { word: "Out", seconds: 6 },
          ],
          pattern: "Four counts in, four held, six out — the pace a chair-side nurse counts at.",
          pause: "Pause",
          resume: "Start again",
          note: "It keeps running while you read the rest. Nothing on this page expects you to be calm before you book.",
        },
        hero: {
          eyebrow: "General & family dentistry · two chairs · Meadowbank",
          headline: "An hour of looking,",
          accent: "and a plan you can take home.",
          lede:
            "A first appointment is an examination and a conversation, in that order. We say what we found in the words we would use at the kitchen table, write the options down with a figure against each, and let you leave holding the paper. What we will not do is quote you before looking, because the honest figure depends on what the looking finds.",
          facts: [
            { label: "The first visit", value: "Sixty minutes" },
            { label: "Who does it", value: "One dentist, start to finish" },
            { label: "What you leave with", value: "Paper, and time to read it" },
          ],
          ctaPrimary: "Request a visit",
          ctaSecondary: "I'm in pain today",
          caption: "The appointment that works is the one nobody in it is late for.",
        },
        slots: {
          kind: "Image slot",
          hero: {
            note: "Room two laid out for the first appointment of the day: chair, operating light, instrument trolley, daylight in the far window. Nobody in it.",
            ratio: "4 / 5",
          },
          nerves: {
            note: "The quiet end of the waiting room — a low armchair, a lamp on a side table, a plant by the window, afternoon light. Nobody in it.",
            ratio: "4 / 3",
          },
          visit: {
            note: "The front desk seen from the corridor, with both treatment-room doors behind it and no patient in the building.",
            ratio: "4 / 3",
          },
          map: {
            note: "A street map centred on Rowanwood House, 4 Ashgrove Lane, with the two bays marked. Replaced by the live embed in a real build.",
            ratio: "16 / 9",
          },
        },
        planner: {
          eyebrow: "01 — Point at it",
          title: "Where is it, and what does it feel like?",
          lead:
            "Tap the part of the mouth, then the words that sound like yours. The page tells you what that usually means for the appointment — how long to allow, and what happens in the chair — before you have to say any of it out loud at a reception desk.",
          areasHead: "Which part of the mouth?",
          areas: [
            { key: "front", name: "Front teeth", hint: "The ones other people can see." },
            { key: "back", name: "Back teeth", hint: "The flat chewing ones, deep in." },
            { key: "gums", name: "Gums & jaw", hint: "The soft parts, and the hinge." },
            { key: "whole", name: "All of it", hint: "You cannot point at one thing." },
          ],
          chartFront: "front",
          unsure:
            "Cannot tell which? Start on All of it — sorting that out is what the examination is for.",
          concernHead: "What does it feel like?",
          concerns: [
            {
              key: "pain",
              label: "Pain or an ache",
              involves: [
                "Which tooth it is, and what put it there, said out loud before anything is picked up.",
                "Numbing and the work on the same visit where it is straightforward.",
                "Where it is not, you hear why, and what the second appointment is for.",
              ],
              time: "30 – 45 min, sometimes two visits",
              reason: "Pain or swelling",
            },
            {
              key: "broken",
              label: "Chipped, cracked or worn flat",
              involves: [
                "A piece gone from an edge, or a surface worn down over years.",
                "Rebuilt in tooth colour in this chair while there is enough sound edge left to hold it.",
                "A cap over the tooth when there is not — and we say which one you are on before starting.",
              ],
              time: "30 – 60 min",
              reason: "Something broke or fell out",
            },
            {
              key: "loose",
              label: "A tooth out of its socket, or loose",
              involves: [
                "A tooth that has come clean out is an hour-old problem, not a tomorrow one.",
                "Hold it by the crown, keep it in milk, do not scrub the root, and get to a chair.",
                "One that only wobbles is looked at the same day wherever the day allows it.",
              ],
              time: "30 – 45 min, plus getting here",
              reason: "Something broke or fell out",
            },
            {
              key: "dull",
              label: "Stained, dull, or breath that won't shift",
              involves: [
                "Colour sitting on the surface comes off with a scale and a polish.",
                "Colour inside the tooth is a different conversation, and you are told which one you are having.",
                "Half of what fixes persistent breath happens at home, and we show you which half.",
              ],
              time: "40 min",
              reason: "Clean and polish",
            },
            {
              key: "gumbs",
              label: "Bleeding or sore gums",
              involves: [
                "Gums that bleed when you brush are usually inflamed, not brushed too hard.",
                "How far below the gum line that has gone decides what it needs, and we look before we say.",
                "Taken deeper than a clean reaches is two longer visits rather than one short one.",
              ],
              time: "40 – 60 min, often across two visits",
              reason: "A question about my teeth",
            },
            {
              key: "missing",
              label: "A gap where a tooth was",
              involves: [
                "Three ways to close a gap — a bridge, an implant, or a plate — and they are not interchangeable.",
                "Which one fits depends on the teeth either side of it, which is only visible on the day.",
                "Nothing is chosen on this visit. You leave with all three written down.",
              ],
              time: "60 min to plan, then separate visits to do",
              reason: "Replacement teeth",
            },
            {
              key: "checkup",
              label: "Nothing — it's just due",
              involves: [
                "Teeth, gums, jaw, and the soft tissue under the tongue looked at.",
                "Photographs or X-rays only where what we find calls for one.",
                "What has changed since last time said at the chair, where you can ask about it.",
              ],
              time: "25 – 30 min",
              reason: "Check-up",
            },
            {
              key: "dread",
              label: "I dread sitting in that chair",
              involves: [
                "Say it at the desk and the appointment is built differently around it, at no different price.",
                "The first visit can be a look round with no instruments in the room at all.",
                "A hand raised stops the work, without a discussion about it afterwards.",
              ],
              time: "60 min, unhurried",
              reason: "A question about my teeth",
            },
          ],
          empty:
            "Pick one or more of these and this panel fills in with what the visit usually involves, and how long to allow for it.",
          disclaimer:
            "A drawing is not a diagnosis. Nobody on this page can tell you what you have until somebody looks at you — including this one.",
          areaNote: "The area changes which of these is most likely, not what we end up doing.",
          carry: "Whatever you tap here is written into the slip at the bottom of the page.",
          carryBtn: "Put my answers in the slip",
          clear: "Start over",
          skip: { text: "Would rather not be guided?", link: "Go straight to the slip" },
        },
        urgent: {
          eyebrow: "Pain, today",
          title: "Two chairs, two slots, until four o'clock.",
          body:
            "Ring rather than fill anything in. The line is picked up by whoever is standing at the front desk, not a call centre, and the two afternoon slots are held back for exactly this. Say when it started and where it is — that is the whole of what we need in order to book one.",
          hospital:
            "A tooth that has come clean out of the mouth, swelling in the face or jaw, trouble swallowing or breathing, an injury you cannot see the shape of, or bleeding that is still going after twenty minutes of pressure on a clean cloth: that is an emergency department, and we would much rather you went now than waited for us.",
          phoneLabel: "Call the practice",
          phoneNote: "This number belongs to a concept website and does not connect.",
          writeInstead: "Write instead of calling",
          prefill: "In pain today — please call me back.",
          /* Must match one of booking.reasons exactly — see DentalDemo. */
          prefillReason: "Pain or swelling",
        },
        triage: {
          eyebrow: "Can this wait?",
          title: "Six questions, then something you can act on.",
          lead:
            "Work down them and be blunt with yourself. The first yes is the one that decides, because they are asked in the order of danger rather than the order of how common they are.",
          yes: "Yes",
          no: "No",
          again: "Start again",
          questions: [
            {
              text: "Is your face or jaw swollen, or is swallowing or breathing harder than it was this morning?",
              out: "emergency",
            },
            {
              text: "Did a tooth come clean out of your mouth, or did your jaw or teeth take a knock?",
              out: "emergency",
            },
            {
              text: "Is there bleeding that has not stopped after twenty minutes of firm pressure on a clean cloth?",
              out: "emergency",
            },
            {
              text: "Is the pain stopping you sleep, or untouched by ordinary painkillers?",
              out: "today",
            },
            {
              text: "Do you have a fever with it, a taste that will not go away, or a tooth that hurts to bite down on?",
              out: "today",
            },
            {
              text: "Has a filling or crown come off, or a tooth chipped, with no real pain behind it?",
              out: "routine",
            },
          ],
          outcomes: {
            emergency: {
              title: "This one is not ours to treat",
              body:
                "A two-chair practice cannot help with this, and waiting makes it worse rather than no worse. Go now and tell us the next day — we will fit you in then.",
              list: [
                "Emergency department, or ring for an ambulance if breathing or swallowing is getting harder.",
                "A tooth that came out whole: in milk, root unscrubbed, seen within the hour.",
                "Take the tooth, the packaging of everything you take, and somebody who can speak for you.",
              ],
              cta: "Go in now. Tell us tomorrow and the chair is yours.",
            },
            today: {
              title: "Ring before four today",
              body:
                "That is what one of the two held afternoon slots exists for. It is not a favour and it does not need an apology.",
              list: [
                "Say when it started and where it is. That is enough to book the slot.",
                "If both have gone, the desk says so and points you somewhere that can take it on today.",
                "Take something for it before you come. Nothing you swallow hides what we need to see.",
              ],
              cta: "Call the practice",
            },
            routine: {
              title: "This can wait for an appointment",
              body:
                "Not an emergency, and not nothing. Book it rather than watch it — a chip and a crack look identical from where you are sitting, and only one of them can wait.",
              list: [
                "Keep it clean, and chew on the other side until the visit.",
                "If it starts waking you up, or the jaw swells, it moves up the list the same day.",
                "Bring the piece if you still have it. It says how it came off.",
              ],
              cta: "Fill in the slip",
            },
          },
          noneTitle: "No yes at all — which is useful",
          noneBody:
            "Then this is an appointment rather than a race. If you have been putting one of those off, the slip is at the bottom of this page and takes about a minute to fill in.",
          disclaimer:
            "This is a page reading your words, not a clinician reading your mouth. If you are not sure which answer you are on, take the more urgent one and ring.",
          slipLabel: "Say so in the slip",
        },
        intro: {
          eyebrow: "The practice",
          title: "Two chairs, one dentist, no rotating cast.",
          body:
            "Rowanwood is a small general practice. The dentist who looks at your tooth in March is the one who finishes it in May, so nobody has to re-explain their own history at every visit, and the room is quiet enough to hear what is being explained. Most of the work here is the ordinary kind — checks, cleanings, fillings, and the crowns that come after them.",
          aside:
            "We are not a hospital and we do not keep every case. When something needs a specialist, we say so, write the referral, and tell you who to ring.",
        },
        index: {
          eyebrow: "02 — What happens",
          title: "The work, and how long it takes.",
          lead:
            "Open any row for the plain-language version of it. The time is roughly how long the chair is occupied, not how long you spend in the building.",
          columns: {
            treatment: "Treatment",
            duration: "Chair time",
            what: "In one line",
          },
          groups: [
            {
              label: "Routine",
              rows: [
                {
                  name: "New-patient examination",
                  time: "60 min",
                  what: "A full look, a conversation about what bothers you, and nothing treated.",
                  detail: [
                    "Sixty minutes of looking and talking. X-rays only where what we find calls for one.",
                    "You leave with a plan in writing and a figure against every line on it.",
                    "A second appointment is booked only if you ask for one.",
                  ],
                },
                {
                  name: "Check-up",
                  time: "25 min",
                  what: "Teeth, gums, jaw and soft tissue, then what has changed since last time.",
                  detail: [
                    "Said at the chair rather than at the door, so you can ask about it there and then.",
                    "Photographs of the teeth only with your say-so.",
                    "Two minutes at the end on the one thing worth changing at home.",
                  ],
                },
                {
                  name: "Clean and polish",
                  time: "40 min",
                  what: "Tartar off the surface, stains off, and the reason they came back.",
                  detail: [
                    "Scaling above the gum line. Below it is a different appointment, and you are told which you need.",
                    "Numbing only if you ask for it — most people do not need it for this.",
                    "The polish is what stops stains clinging back within a fortnight.",
                  ],
                },
                {
                  name: "A child's first visit",
                  time: "30 min",
                  what: "A look round, a count of teeth, and the chair tilted for practice.",
                  detail: [
                    "Deliberately no treatment on the first visit.",
                    "A child who will not open their mouth today is not persuaded to.",
                    "The parent stays in the room for the whole thing.",
                  ],
                },
              ],
            },
            {
              label: "When something is wrong",
              rows: [
                {
                  name: "Filling",
                  time: "45 min",
                  what: "Numb, out, filled, in a colour that matches.",
                  detail: [
                    "Which tooth, and what caused it, said before anything is picked up.",
                    "A large one may take two visits so the tooth can settle underneath it.",
                    "You can drive yourself home; nothing here puts you to sleep.",
                  ],
                },
                {
                  name: "Crown",
                  time: "2 visits · 60 + 45 min",
                  what: "A cap that holds a weakened tooth together.",
                  detail: [
                    "Prepared at the first visit, worn as a temporary while the lab makes the real one.",
                    "The colour chosen with you in daylight, not under a chair light.",
                    "If the tooth turns out to need root treatment first, you hear that before the second visit is booked.",
                  ],
                },
                {
                  name: "Root treatment",
                  time: "60 – 90 min",
                  what: "Done to keep a tooth that would otherwise come out.",
                  detail: [
                    "Some need a second appointment to finish; the desk says which before you book.",
                    "For most people it is no more painful than a filling, and the numbness lasts longer afterwards.",
                    "A crown usually follows it, because a treated tooth is a brittle one.",
                  ],
                },
                {
                  name: "Extraction",
                  time: "30 – 45 min",
                  what: "Only when keeping the tooth is the worse option.",
                  detail: [
                    "Straightforward ones in this chair.",
                    "A lower wisdom tooth, or a root that has broken down, goes to a referral instead.",
                    "You hear what to do for the next forty-eight hours before you stand up.",
                  ],
                },
                {
                  name: "Denture and bridge repairs",
                  time: "30 min",
                  what: "Re-fitted, re-lined, or sent away.",
                  detail: [
                    "Same-day is possible more often than people expect, and not always possible.",
                    "The desk tells you which it is when you ring, so you are not travelling for nothing.",
                    "A plate that has snapped twice is usually the fit rather than the plate.",
                  ],
                },
              ],
            },
          ],
          expand: "Open this row",
          collapse: "Close this row",
          costNote:
            "There is no price list on this page, on purpose. The figure depends on what the examination finds, so it is written down and handed over at the end of it — before anything is started, and before anything is charged.",
          footNote: "Not sure which row you are on? That is exactly what the examination is for.",
          ctaPlanner: "Go back to the planner",
          ctaVisit: "Ask about the first visit",
        },
        cost: {
          eyebrow: "Money, without the numbers",
          title: "What a written plan is made of.",
          lead:
            "Every practice hands you a figure. Fewer explain what the figure is standing on. This is the shape of one, and the five questions that make any number you are later handed make sense.",
          partsHead: "The five lines on the paper",
          parts: [
            {
              name: "The examination",
              body: "The looking and the writing, before any work. Its own appointment and its own line, and the only one of the five you can be quoted in advance.",
            },
            {
              name: "The materials",
              body: "What goes into the tooth, and what the lab charges to make the cap or the plate. A crown made down the road and one made across it are not the same figure.",
            },
            {
              name: "The chair time",
              body: "How long somebody is with you. This is why a large filling and a small one cost differently under the same name.",
            },
            {
              name: "The pictures",
              body: "X-rays and photographs, taken where they change what is done and not taken where they do not. Each one is a line you can ask about.",
            },
            {
              name: "The follow-up",
              body: "A review after the work is part of the plan rather than something added on afterwards. If it is not on your paper, ask for it.",
            },
          ],
          driversHead: "Four things that move a number",
          drivers: [
            {
              name: "How much tooth is left",
              body: "A small hole and a tooth broken below the gum line are different jobs with the same name on the letter.",
            },
            {
              name: "Whether the gum is involved",
              body: "Work on the tooth is one thing. Work on what holds the tooth in the jaw is another, and usually longer.",
            },
            {
              name: "One visit or two",
              body: "Anything a lab makes is two appointments with a temporary in between, and both of them are inside the figure.",
            },
            {
              name: "When you come in",
              body: "A crack caught this month is a filling. The same crack in six months is a root treatment and a crown. Waiting is not free, it is only unbilled.",
            },
          ],
          askHead: "Ask these when you get the figure",
          ask: [
            "What is included in that number, and what would be charged again?",
            "How long does the quote stand for?",
            "If you find more once you are in there, do you stop and ask me?",
            "Can it be paid in parts, and what does that do to the total?",
            "What does it cost me — in teeth, not money — to leave this alone for a year?",
          ],
          honest:
            "There is no price list here for a second reason besides the one above: this practice is a concept website, and a figure against a treatment that nobody performs would simply be an invented one. A real build puts the practice's own published fees in this section, in the same shape.",
          cta: "Ask for the plan in writing",
        },
        nerves: {
          eyebrow: "03 — If you dread it",
          title: "Say it at the desk. It changes the appointment, not the price.",
          lead:
            "This is the part the practice cares about most. Four things that can be checked in the room rather than believed in a brochure.",
          points: [
            {
              title: "The quietest slot in the day",
              body: "Booked away from the corridor and the school run, with enough time in it that nobody is hurried out of the chair.",
            },
            {
              title: "A hand up stops everything",
              body: "Agreed before anything is picked up, honoured without a discussion about it afterwards, and used as often as you need it.",
            },
            {
              title: "Each step, before it happens",
              body: "What is about to happen and what it will feel like. Ask us to skip the descriptions and we will do that instead.",
            },
            {
              title: "A first visit can be a look round",
              body: "Come, sit in the chair, see the room, leave. No instruments and no examination, and it is not billed as treatment.",
            },
          ],
          cta: "Tell us when you book",
          ctaQuiet: "Book a look-round visit only",
          quietPrefill:
            "I would like a look-round visit first — no instruments and no examination, just to see the room.",
          prefill:
            "I get anxious in the chair — please book the quietest slot you have and go slowly.",
        },
        visit: {
          eyebrow: "04 — The first hour",
          title: "Sixty minutes, and most of it is looking and talking.",
          lead:
            "The first appointment is booked as an hour rather than a ten-minute slot, so there is room in it for the questions you have not thought of yet.",
          badge: "60 minutes · nothing treated on this visit",
          steps: [
            {
              mark: "0 – 10 min",
              title: "You arrive",
              body: "Front desk, a form on a tablet or a clipboard, and a short wait. The day is booked in hours rather than packed in tens.",
            },
            {
              mark: "10 – 35 min",
              title: "The looking",
              body: "Teeth, gums, jaw and the soft tissue under the tongue, with X-rays only where what we find calls for them. Anything you ask gets answered at the chair.",
            },
            {
              mark: "35 – 50 min",
              title: "The conversation",
              body: "What we found, what it means, and the options where there is more than one — including doing nothing for now, and what that would cost you later.",
            },
            {
              mark: "50 – 60 min",
              title: "The paper",
              body: "The plan written down with a figure against each line, and time to read it here or take it away. Nothing starts while you are still deciding.",
            },
          ],
          bringTitle: "What to bring",
          bring: [
            "Photo ID if you have it with you. Nobody is turned away for not having it.",
            "Everything you take, including inhalers and anything bought over the counter. It changes what is safe in the chair.",
            "X-rays another practice took, on a disc or a printout, so we are not taking the same picture twice.",
            "The questions you have been putting off. Written down is fine, and half of them are worth asking before you sit.",
          ],
          accessTitle: "Getting in",
          access: [
            "Step-free entrance from Ashgrove Lane and a lift to the first floor.",
            "Two bays outside, one of them accessible, and a dropped kerb at the corner.",
            "A carer or a family member can sit in on any appointment.",
            "Under sixteen, a parent stays in the room for the whole visit.",
          ],
          cta: "Ask for the 60-minute visit",
        },
        words: {
          eyebrow: "The words on the letter",
          title: "Nine terms, said again in ordinary English.",
          lead:
            "A letter from a dental practice is written in a shorthand its readers were never taught. This is the same nine words the desk hears most, without the Greek in them.",
          prompt: "Tap a word.",
          terms: [
            {
              term: "Scale and polish",
              plain: "Tartar taken off the outside of the teeth, then the surface smoothed so stains stop clinging to it.",
              where: "On a hygiene appointment.",
            },
            {
              term: "Scaling below the gum",
              plain: "The same job done further down the root, where a brush cannot reach. Usually two longer visits, with numbing.",
              where: "When the gums have started to come away from the teeth.",
            },
            {
              term: "Composite",
              plain: "Tooth-coloured filling material, built in layers and set hard with a light.",
              where: "Nearly every filling quoted these days.",
            },
            {
              term: "Crown",
              plain: "A cap made to fit over a tooth that is too weakened to hold a filling.",
              where: "After root treatment, or on a tooth broken at the gum line.",
            },
            {
              term: "Root treatment",
              plain: "The nerve taken out from inside a tooth so that the tooth itself can stay in your mouth.",
              where: "When an ache has gone into the tooth rather than sitting under a filling.",
            },
            {
              term: "Radiograph",
              plain: "An X-ray. A small one inside the mouth for a single tooth, a larger one for the whole jaw.",
              where: "Only where the picture changes what is done.",
            },
            {
              term: "Occlusion",
              plain: "How the top and bottom teeth meet when you close. An uneven one is why a new filling sometimes feels too high.",
              where: "Checked at every visit, and after any new work.",
            },
            {
              term: "Periodontal",
              plain: "Anything to do with the gum and the bone holding the tooth, rather than the tooth itself.",
              where: "On a referral letter — and it means the tooth is not the problem.",
            },
            {
              term: "Fissure sealant",
              plain: "A thin painted coating in the grooves of a back tooth, so the grooves cannot hold food.",
              where: "Offered to children mostly, and painless to have done.",
            },
          ],
          foot:
            "A word we have not translated? Put it in the notes box on the slip and the desk answers it in the same plain way.",
        },
        proof: {
          eyebrow: "05 — Proof",
          title: "What people say, and what this page refuses to make up.",
          lead:
            "There is no practice yet, so there is nobody to quote. Here is the frame the reviews go in, and the questions the desk answers most often.",
          slotLabel: "Reviews slot",
          headline: "Verified reviews would sit inside this frame.",
          body:
            "Built for a real practice, this box is fed by reviews the practice did not choose and cannot edit. Until then it stays empty on purpose. An invented quote, a rating out of five, or a before-and-after pair would be the only evidence on this page, and every one of them would be false.",
          foot: "No testimonials, no star ratings, no case photographs, no credentials anywhere on this page.",
          faqHead: "Asked at the desk",
          items: [
            {
              q: "Do I need to be registered to be seen?",
              a: "No. A new patient books the same sixty-minute examination as anyone else, and registration is offered after it if the practice turns out to suit you.",
            },
            {
              q: "How soon can I get in?",
              a: "Routine appointments usually run two to three weeks ahead. Pain is different: two slots each afternoon are held for it, and ringing before four normally means being seen the same day.",
            },
            {
              q: "Will I be told off about my teeth?",
              a: "No. A lecture is not treatment. What your mouth looks like on the day you finally come in is information for us, not a verdict on you.",
            },
            {
              q: "Do you deal with my insurer?",
              a: "No plans are handled at this desk. You get the written figure at the end of the examination and pay after the work — and if you would rather claim it back, the paperwork supports that.",
            },
            {
              q: "My tooth only hurts when I bite on it. Is that an emergency?",
              a: "Usually not that night. Take something simple and ring in the morning. If your face or jaw starts to swell, or swallowing becomes difficult, stop reading this and go now.",
            },
            {
              q: "Can the children come with me?",
              a: "Yes. The first visit is deliberately short, a parent stays in the room for anyone under sixteen, and a child who will not open their mouth today is not forced to.",
            },
            {
              q: "Is this practice on the health service?",
              a: "This is a concept website, so it is on nothing at all. A real build replaces this answer with the practice's own — which is the only honest way for you to find it out, and the reason the question is here.",
            },
          ],
          ask: { text: "Something we have not answered?", link: "Put it in the slip" },
        },
        booking: {
          eyebrow: "06 — The slip",
          title: "Leave us the note. The desk will ring you back.",
          lead:
            "The slip goes to the front desk, which rings to fix an actual time. It is the slower route, and the right one for anything that is not pain.",
          reasons: [
            "Check-up",
            "Pain or swelling",
            "Clean and polish",
            "Something broke or fell out",
            "Replacement teeth",
            "A question about my teeth",
          ],
          days: [
            "Any weekday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday morning",
          ],
          times: ["Morning", "Afternoon", "Late Thursday", "No preference"],
          patientTypes: ["New patient", "Already on our books"],
          legends: {
            reason: "What is the visit for?",
            patient: "Are you already on our books?",
            day: "Which day suits?",
            time: "Morning or afternoon?",
          },
          name: "Name",
          phone: "Phone",
          email: "Email",
          notes: "Anything we should know",
          hints: {
            reason:
              "Pick the closest one. It decides how long the appointment is booked for.",
            when:
              "A preference, not a confirmation — the desk rings to fix the actual time.",
            phone:
              "The number the desk calls back on. Digits, spaces or brackets are all fine.",
            notes:
              "Anxiety, a wheelchair, a carer coming with you, a tooth already treated, an old X-ray to bring, a word from the letter you could not parse.",
          },
          submit: "Send the slip",
          note: "No time is held until somebody at the desk rings you.",
          tear: "Tear here",
          talkHead: "Rather talk to a person?",
          talkBody:
            "The number is answered by whoever is standing at the front desk, Monday to Thursday until half past five. If nobody can pick up, leave a message and the call comes back the same working day.",
          backHead: "Hate the phone?",
          backBody:
            "Write 'please call me back' in the notes box and pick a part of the day. The desk rings you instead of the other way round — which is the same appointment, arrived at quietly.",
          online: {
            label: "Pick a time yourself",
            note: "A real build puts the practice's live scheduler behind this. Nothing is wired up in a concept website, so a time chosen here would be a time that never existed. The slip and the phone are the only two routes on this page, and both of them say so.",
          },
          carried: "From the planner above",
          confirm: {
            title: "Asked for, not booked",
            lead:
              "This is what the slip received. Nothing left this page, so there is no appointment and nobody at the practice is expecting you.",
            edit: "Change it",
            refLabel: "Reference",
            /* The number is what makes a leaflet feel physical, and it is also the
               one thing on this page that could be misread as a book entry — so it
               arrives with the sentence that says what it is not. */
            refNote:
              "Made up by this page out of what you typed. It is not in the practice's book, because nothing was sent.",
          },
        },
        hours: [
          { day: "Monday – Thursday", time: "08:00 – 17:30" },
          { day: "Friday", time: "08:00 – 17:00" },
          { day: "Saturday", time: "09:00 – 13:00" },
          { day: "Sunday", time: "Closed" },
        ],
        address: [
          "Rowanwood Dental",
          "Rowanwood House, 4 Ashgrove Lane",
          "Meadowbank",
        ],
        phone: { display: "(555) 555-0164", href: "tel:+15555550164" },
        positioning:
          "General and family dentistry. Two chairs, one dentist, and a figure before anything starts.",
        footer: {
          hours: "Hours",
          where: "Where",
          find: "Find us",
          onPage: "On this page",
          concept: "Concept project · not a live client",
        },
      },
    },
  },
];

export type Service = {
  title: string;
  body: string;
  icon: string;
  points?: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    title: "Fix My Website",
    body: "Your website already exists — it just doesn't work properly. I find the problems, fix them, and show you what changed.",
    icon: "wrench",
    featured: true,
    points: [
      "Slow loading speed",
      "Broken mobile layout",
      "Forms that don't send",
      "Outdated design",
      "Basic on-page SEO",
    ],
  },
  {
    title: "New Business Websites",
    body: "A professional website for a local business that needs to look credible and get enquiries.",
    icon: "building",
  },
  {
    title: "Website Redesigns",
    body: "Turn an outdated website into a modern one without losing your content or your search listings.",
    icon: "refresh",
  },
  {
    title: "Landing Pages",
    body: "One focused page built around a single offer — for ads, promotions, or a new service.",
    icon: "target",
  },
  {
    title: "Booking & Enquiry Forms",
    body: "Turn your website into a way to get enquiries — a form that actually reaches you, with a clear next step for the visitor.",
    icon: "cursor",
  },
];

/* Mobile-first is a standard applied to every service above, not a service a
   visitor has to know to ask for — it lives in whyWork and qualityChecklist. */

/* What a prospect recognises about their own site before they read anything
   about mine. Symptom-first, one line each — no invented statistics. */
export const problems = [
  {
    title: "Outdated Design",
    body: "Your business has evolved, but your website hasn't.",
    icon: "history",
  },
  {
    title: "Bad Mobile Experience",
    body: "Customers shouldn't have to pinch, zoom, or hunt for your phone number.",
    icon: "mobile",
  },
  {
    title: "Slow Experience",
    body: "Visitors shouldn't have to wait for the page to become usable.",
    icon: "gauge",
  },
  {
    title: "Unclear Action",
    body: "Customers should immediately understand what to do next.",
    icon: "cursor",
  },
];

/* Why the working relationship is different — five points, confident rather
   than boastful. Every line is verifiable by the visitor during a project. */
export const whyWork = [
  {
    title: "Built Around Your Business",
    body: "Your website is designed around your services, customers, and goals rather than being dropped into a generic template.",
  },
  {
    title: "Mobile-First",
    body: "Most local customers browse on their phones, so the experience is designed to work properly across phones, tablets, and desktops.",
  },
  {
    title: "Business-Focused",
    body: "A website should not only look good. It should make it easier for customers to understand your business and take action.",
  },
  {
    title: "Direct Communication",
    body: "Clients work directly with me rather than going through layers of salespeople or account managers.",
  },
  {
    title: "No Fake Promises",
    body: "Concept projects are clearly labelled. No fake testimonials, fake clients, fake traffic numbers, or invented results.",
  },
];

/* The closing objection: the visitor agrees something is wrong but can't say
   what. This answers it and routes to the one primary action. */
export const finalCta = {
  title: "Not sure what's wrong with your website?",
  lead: "I'll take a look for free.",
  body: "Send me your website and I'll identify the biggest areas that could be improved.",
  note: "No commitment. Just an honest audit.",
};

export const processSteps = [
  { step: "01", title: "Free Audit", body: "You send me your website link (or your business details) and I tell you exactly what's wrong or what's missing." },
  { step: "02", title: "Plan", body: "We agree the structure, the pages, and the visual direction before anything is built." },
  { step: "03", title: "Design", body: "The look and layout is designed around your business, your services, and your customers." },
  { step: "04", title: "Build", body: "The design becomes a real, responsive website — new build, or your existing site fixed properly." },
  { step: "05", title: "Test", body: "Phone, tablet and desktop, plus links, forms, responsiveness and performance." },
  { step: "06", title: "Launch", body: "Polished, verified, and handed over." },
];

export const qualityChecklist = [
  "Responsive design",
  "Mobile optimized",
  "Clear navigation",
  "Strong visual hierarchy",
  "Fast loading structure",
  "Working contact forms",
  "Clear calls to action",
  "Professional typography",
  "Easy-to-understand content",
  "Conversion-focused structure",
];

/* The trades the site leads with — confirmed 2026-10-07 as the five names to
   put in front of a visitor. Rendered as chips in the services band. */
export const tradeTypes = [
  "Plumbers",
  "Electricians",
  "Roofers",
  "HVAC",
  "Builders & Contractors",
];

/* Everything else the section covers, kept as one plain line under the chips so
   the trades stay the loudest thing in the band. Labels carried over from the
   previous nine-chip list; "Home Services" was approved as part of that list. */
export const otherBusinessTypes = [
  "Restaurants & Cafés",
  "Salons & Barbers",
  "Gyms & Fitness",
  "Garages & Auto",
  "Home Services",
  "Local Shops & Retail",
];

/* -------------------------------------------------------------------------
   FOUNDING CLIENT PRICING — Ismail's own rates, confirmed 2026-10-07.
   These are the only prices published anywhere on the site. There is
   deliberately no higher "standard" price shown beside them, struck through
   or otherwise: no anchor price, no savings figure, in this file, in the
   components, or in any meta description.
   ----------------------------------------------------------------------- */
export type Package = {
  name: string;
  price: string;
  /** The recommended tier, rendered with the accent border and "Most popular" badge. */
  featured?: boolean;
  features: string[];
};

export const pricingPackages: Package[] = [
  {
    name: "Starter",
    price: "$500",
    features: [
      "3 pages",
      "Mobile-first design",
      "Contact form",
      "Click-to-call button",
      "Basic local SEO setup",
    ],
  },
  {
    name: "Business",
    price: "$900",
    featured: true,
    features: [
      "5–8 pages",
      "Service-area pages",
      "Reviews section",
      "Google Business Profile link-up",
      "Speed optimization",
      "Analytics setup",
    ],
  },
  {
    name: "Premium",
    price: "$1,500",
    features: [
      "Everything in Business",
      "Up to 12 pages",
      "Quote-request form with email alerts",
      "Advanced conversion layout",
    ],
  },
];

/* One source for the package terms the pricing band publishes. */
export const packageTerms = {
  included: "Every package includes 2 rounds of revisions and 30 days of free bug fixes.",
  payment: "50% to start, 50% before launch — paid through Payoneer, by bank transfer or card.",
  approval: "Nothing goes live until you approve it.",
};

export type CarePlan = {
  name: string;
  price: string;
  /** Rendered after the price, e.g. "/mo". */
  period?: string;
  featured?: boolean;
  features: string[];
};

export const carePlans: CarePlan[] = [
  {
    name: "Essential",
    price: "$59",
    period: "/mo",
    features: [
      "Hosting",
      "SSL",
      "Uptime monitoring",
      "Security checks",
      "Up to 30 minutes of edits",
    ],
  },
  {
    name: "Growth",
    price: "$99",
    period: "/mo",
    featured: true,
    features: ["Everything in Essential", "Up to 1 hour of edits", "Speed check", "Monthly report"],
  },
  {
    name: "Premium",
    price: "$149",
    period: "/mo",
    features: ["Everything in Growth", "Up to 2 hours of edits", "Priority support"],
  },
];

/* The questions a local business owner actually asks, answered with what Ismail
   confirmed on 2026-10-07 and with what this site's code actually does. The
   FAQPage JSON-LD in src/components/Faq.tsx is generated from this array, so the
   markup can never claim an answer the page doesn't show. */
export const faqItems = [
  {
    q: "How long does a website take?",
    a: "Usually 1–2 weeks once I have your logo, photos and business details.",
  },
  {
    q: "Who owns the website and domain?",
    a: "You own your domain, registered in your name, and the final site once it's paid in full. I keep my own tools and templates. If you leave the care plan, I hand over the site files.",
  },
  {
    q: "How does payment work?",
    a: "50% to start, 50% before launch. I send an invoice and you pay through Payoneer, by bank transfer or card. Nothing goes live until final payment is received.",
  },
  {
    q: "Do you handle hosting and the domain?",
    a: "Hosting is included in the care plans. Without a care plan, I hand over the site files and you host it yourself (free options exist). A new domain costs about $12–20 a year, registered in your name and paid by you. If you already have a domain, it stays where it is.",
  },
  {
    q: "Will this get me to number one on Google?",
    a: "No. A specific ranking can't be promised by anyone, and I won't quote you a figure I can't stand behind. What is in my control is a fast, clear, mobile-first website with proper structure, real content and obvious ways to contact you — which is what makes search listings and enquiries possible in the first place.",
  },
  {
    q: "How many changes can I ask for?",
    a: "Two rounds of revisions, plus 30 days of free bug fixes. It works best if you gather the full list of what you'd like changed before each round rather than sending it piecemeal.",
  },
  {
    q: "I already have a website. Can you fix it instead of rebuilding?",
    a: "Yes. Fixing an existing site is its own service: slow loading, broken mobile layout, forms that don't send, outdated design and basic on-page work. Send me the link and the free audit tells you what's wrong before you commit to anything.",
  },
  {
    q: "What do you need from me to start?",
    a: "Your logo if you have one, your photos if you have them, a list of the services you offer, your contact details, the areas you cover, and any reviews you're able to share. Missing pieces aren't a blocker — the audit shows what's needed.",
  },
  {
    q: "Can I edit the site myself?",
    a: "Yes. I can show you how to make small edits and provide a simple step-by-step guide. Or I handle small changes under your care plan.",
  },
  {
    q: "Do you build online shops or larger sites?",
    a: "Yes. These are quoted individually after a short brief.",
  },
  {
    q: "Do I have to take a care plan?",
    a: "No. The care plans are optional — take one only if you want edits, monitoring and hosting handled for you rather than asked for each time.",
  },
];

