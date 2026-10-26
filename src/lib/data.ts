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

export type DemoKey = "plumber" | "restaurant" | "dental";

/* Content for the concept-site layouts.
   Each fictional business gets its own copy, palette and structure emphasis so
   the demos don't look like one recoloured template.

   The base fields below are OPTIONAL. Every demo owns its own layout
   component, so each concept reads only the fields it actually renders; a
   project carries nothing its demo cannot draw. `navName` is the one field all
   three read (their headers and footers). */
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
     strip, a hero chip row and an urgent band. All OPTIONAL, so the restaurant
     and dental concepts read none of it.

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

     Read only by PlumberDemo, so the other two concepts are untouched. Fields
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
     when it is open, what the meal does course by course, what is on the card,
     how to get a table. So this layout is a board of hours, a tasting journey
     pinned against the page's own scroll, the card as a list you can filter down
     to what you can eat, two forms that assemble a ticket in front of you and
     say plainly that nothing left the page, and a visit block whose open or
     closed line is worked out from the hours printed underneath it and Chicago
     local time instead of asserted.

     All OPTIONAL and read only by RestaurantDemo, so the plumbing and dental
     concepts are untouched. The dishes, the street and the telephone
     are invented for the fiction — the number stays inside the 555-01XX range and
     the page carries the concept note everywhere it is needed.

     What is deliberately NOT here, and why: no reviews, star ratings, diner
     counts or press quotes; no live availability, so nothing can claim a table
     is held; and no map service, because a link to a street that does not exist
     would be a broken promise rather than a placeholder — the visit block draws
     its own labelled map card instead. What IS here, honestly framed: prices are
     printed as bare illustrative numbers, and `noPrices` says so where a diner
     expects the sum to mean something; the photographs are licensed plates that
     stand for a mood, not for this fictional room's actual dining space. */
  restaurant?: {
    /* The service board above the header. A dinner service decides its hours
       before it decides anything else, so the facts a diner needs come first. */
    board: string[];
    /* Machine-readable only: the JSON-LD `servesCuisine`. It is not printed, so
       it gets its own field rather than being scraped back out of `board`. */
    cuisine: string;
    /* The short link labels the header, the phone sheet and the footer all draw
       from one list, so a band can never be named differently in two places.
       Only the bands a visitor is meant to jump to appear here. */
    nav: {
      journey: string;
      menu: string;
      story: string;
      groups: string;
      visit: string;
    };
    /* The computed open/closed line, in the concept's own words. `{time}` and
       `{day}` are filled from the printed hours, so the claim on the page is
       arithmetic on the table underneath it and nothing else. */
    status: {
      open: string;
      opensToday: string;
      opensTomorrow: string;
      opensDay: string;
    };
    header: {
      /* Beside the wordmark, so the fiction is on the fold and not only in the
         colophon. */
      concept: string;
      /* The week's shape, printed before any clock has been read. */
      openLine: string;
      /* The chip's own lead-in, so a computed line never reads as a fact about
         the room: it is arithmetic on the hours printed on this page, read in
         the kitchen's own time zone rather than the visitor's device clock. */
      statusLead: string;
      phoneLabel: string;
      book: string;
    };
    hero: {
      /* The headline is set in two parts so the second can carry the accent —
         the source sets it upright and coloured, not italic. */
      headline: string;
      accent: string;
      eyebrow: string;
      /* The paragraph that does the deciding: what the place is, and the one
         limitation it does not hide. */
      lede: string;
      hoursLine: string;
      /* Three facts set as a hairline row under the actions — covers, seatings,
         how often the card changes. The Marigold source has no such row, so it
         carries none and the layout prints nothing for it. */
      facts: { label: string; value: string }[];
      /* The fire itself — the retired Ember layout's chooser band, kept as data
         the Marigold layout does NOT render. It names the two services from the
         printed hours; nothing on the page reads it. It stays until the
         retirement pass prunes it, so the type and the data never drift. */
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
      /* The plate the photograph used to fill: a labelled slot, not a picture.
         A concept that ships a real licensed photograph (Marigold Kitchen) also
         names it through the optional `src`/`alt`; the layout decides whether it
         draws the label or the image. */
      slot: { kind: string; note: string; src?: string; alt?: string };
    };
    /* The slim band that introduces the journey: an eyebrow and the one line that
       tells a diner what the four courses are for. */
    intro: { eyebrow: string; body: string };
    /* The evening told in stages, one at a time, so a diner reads the shape of the
       meal before reading a card of twenty-four dishes. */
    evening: {
      eyebrow: string;
      title: string;
      body: string;
      stages: {
        label: string;
        line: string;
        note: string;
        slot: { kind: string; note: string; src?: string; alt?: string };
      }[];
      prev: string;
      next: string;
      dots: string;
      /* Reads as "Stage 2 of 4" to a screen reader on every change. */
      of: string;
      hint: string;
      /* Marigold: the standing caption under the desktop plate drawing, which
         the source keeps fixed while the courses change. */
      plateLabel?: string;
      /* Marigold: the desktop journey's third column — an atmosphere
         photograph and the jump into the full card. */
      aside?: { image: { src: string; alt: string }; cta: string };
    };
    menu: {
      eyebrow: string;
      title: string;
      lead: string;
      /* Marigold prints numbers, so this field carries the honesty instead of
         the absence: the figures are illustrative for a fictional room, said in
         the concept's voice and placed where a diner reads the prices. */
      noPrices: string;
      /* The filters, in the source's own vocabulary. `key` is what the layout
         matches dishes against: `all` is the unfiltered view, `vegetarian`,
         `vegan` and `gf` match a dish's diet marks, and `spicy` is the one key
         that is not a mark — it reads the `spice` ladder, so mild (1) counts.
         The labels are the source's button words, the odd one included. */
      filters: { key: string; label: string }[];
      /* The filter row's own accessible name, so the group is labelled by the
         concept rather than by the component. */
      filtersLabel: string;
      /* The card's diet markers, exactly as `menu.note` spells them out. The
         long word a screen reader gets is the filter's own label, so nothing is
         spelled twice. */
      marks: { veg: string; vegan: string; gf: string };
      /* The retired Ember card's legend. The Marigold layout prints the source's
         one-line marker key (`note`) instead, so nothing renders this list any
         more; it stays until the retirement pass prunes it. `mark` was one of
         the keys a dish carried, and the glyph printed for it was the
         component's own business. */
      legend: { mark: string; means: string }[];
      countNoun: string;
      /* No kitchen sharing one fire can promise a dish is free of anything, so the
         page says so instead of implying the opposite. */
      allergy: string;
      /* The card is rewritten weekly: a menu this short cannot promise the dish on
         the day is the dish on the card. */
      note: string;
      /* The word the flame marks are read with, indexed by `spice`: nothing at 0,
         then the source's own three-step ladder. A printed card spells the level
         out beside the flames, so these are visible copy and live here. */
      spiceWords: [string, string, string, string];
      sections: {
        label: string;
        blurb: string;
        slot: { kind: string; note: string; src?: string; alt?: string };
        dishes: {
          name: string;
          desc: string;
          /* Diet marks only. The retired card's transitional heat words
             (`medium`/`hot`) are gone: the source's spicy filter reads the full
             `spice` ladder, so the marks no longer need to duplicate it. */
          marks: ("veg" | "vegan" | "gf")[];
          /* Marigold ships an illustrative price beside each dish — a bare
             number, as the source prints it, with no currency glyph. */
          price?: number;
          /* The source's spice level, 0 (no flame) to 3 (hot). The spicy filter
             is `spice >= 1` so a mild dish is caught with the medium and hot
             ones, and the flame marks the card prints are read from this. */
          spice?: 0 | 1 | 2 | 3;
        }[];
      }[];
    };
    room: {
      eyebrow: string;
      title: string;
      paras: string[];
      quote: string;
      /* Marigold: the attribution drawn under the quote — whose voice it is,
         never a named person the source does not name. */
      quoteCite?: string;
      /* Marigold: the one line that says what the nine photographs on this page
         actually are. They are licensed stock plates of other rooms and other
         food, so the concept names that out loud instead of letting them read as
         pictures of a dining room it does not have. */
      provenance?: string;
      tall: { kind: string; note: string; src?: string; alt?: string };
      small: { kind: string; note: string; src?: string; alt?: string };
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
      /* The size select's own empty option — the question the list answers. */
      sizePrompt: string;
      /* What the enquiry says when the one field it needs is empty. Kept in data
         so a validation message is the concept's voice, not the component's. */
      errors: { size: string; date: string };
      /* Marigold: the enquiry form's own strings — a submit ask, a notes
         placeholder, and the photograph the band stands on. The source form
         takes size, date and notes only; `fields.name`/`fields.contact` stay
         for layouts that still ask them. */
      submit?: string;
      notesPlaceholder?: string;
      image?: { src: string; alt: string };
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
      /* Marigold: the grid's own words for a day the room does not serve, kept
         apart from the "choose a date" empty state the way the source keeps
         them apart. */
      slotClosed?: string;
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
      /* Marigold: three fields rather than a two-line tuple, because the machine-
         readable card has to name the city and the state separately — a locality
         that carries its own state duplicates the region and reads wrong to
         anything that consumes the schema. The page still prints two lines: the
         street, then the city and the state. */
      address: { street: string; locality: string; region: string };
      access: string;
      parking: string;
      /* What the drawn plan stands in for, said out loud. */
      planNote: string;
      /* Marigold: the source offers a directions link beside the phone line,
         and labels its policy panel. */
      directions?: { label: string; href: string };
      policyTitle?: string;
      /* The four questions the reservation cannot be assembled without. The
         ticket only ever reads back what was answered, so an empty answer has to
         be named before anything can be printed. */
      errors: { date: string; time: string; name: string; email: string };
      /* Marigold: the reservation form's own labels and placeholders, so the
         copy lives with the rest of the concept and not in the component. */
      fields?: {
        date: string;
        timeZone: string;
        party: string;
        time: string;
        name: string;
        namePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        notes: string;
        notesOptional: string;
        partyCall: string;
        partyCallAria: string;
      };
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
      confirm: {
        title: string;
        lead: string;
        edit: string;
        /* The ticket is read back as statements, not as the questions the form
           asked: a line that says "Choose a time · 20:00" is the form talking,
           not the receipt. The party count needs the same treatment, and the
           word has to agree with the number, so it is split here rather than
           written into the layout. */
        timeTerm: string;
        guestOne: string;
        guestMany: string;
      };
    };
    /* The transparency band: the things a printed card leaves unsaid, including
       the one that costs the room a sale. */
    how: {
      eyebrow: string;
      title: string;
      body: string;
      points: { title: string; text: string }[];
    };
    /* --- Marigold-only bands ---------------------------------------------------
       Sections the supplied page carries that the Ember layout never had. All
       OPTIONAL and read by nobody until the Marigold layout exists, so the old
       component keeps compiling while every one of the source's remaining
       strings still lives in data rather than in a component. */
    /* The FAQ column's standfirst, printed under the heading. */
    faqLede?: string;
    /* The source gives the FAQ band its own eyebrow above "Before you come", and
       the heading band above it is the transparency section's, so the word here
       keeps the two bands from reading as one. */
    faqEyebrow?: string;
    /* The gold strip under the menu: one sample dish, labelled Example. */
    specials?: { title: string; badge: string; copy: string };
    /* The "Come on over" band: the visit section's own heading row and map
       card. Hours, address, access and phone stay on `booking`, which already
       carries them. */
    visit?: {
      eyebrow: string;
      title: string;
      timezoneLabel: string;
      callLabel: string;
      mapCardName: string;
      mapCardNote: string;
    };
    /* The footer's own strings and the pinned phone bar's labels. */
    footer?: { copy: string; legal: string; badge: string; findTitle: string; hoursTitle: string };
    /* The pinned three-action bar: what the bar IS (`label`, AUTHORED — a bar
       named after one of its three actions strands the other two), and its
       actions named for where each one goes. The middle action jumps to the
       visit band, so it is called `visit`; it never claimed to open a map. */
    mobileBar?: { label: string; call: string; visit: string; reserve: string };
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
      /* The photographic hero stands on one of the three files in `photos`, so the
         new-patient path is one scroll away and the CTA that opens it is named
         here rather than written in the component. */
      photo: "waiting" | "room" | "practice-room";
      newPatientCta: string;
    };
    /* Ruling A, closed 2026-10-23: the concept ships THREE photographs, and they
       are the three files already on disk in public/demos/rowanwood-dental/. Keyed
       by file stem, so a band names its picture without repeating its alt text.
       The alt describes what the frame actually shows and the caption out-louds
       that it is stock: no Rowanwood House was photographed, because there is no
       Rowanwood House. `instruments.webp` is not in this map and must not reach
       the page — DEPPFLEX is molded into all four instrument handles and no crop
       clears it (Ruling 17; the measurement is recorded in public/demos/CREDITS.md). */
    photos: {
      waiting: { alt: string; caption: string };
      room: { alt: string; caption: string };
      "practice-room": { alt: string; caption: string };
    };
    /* The path a first-time visitor is actually on: three cards, each with a
       destination inside the page, and the sentence that keeps the fiction from
       reading as a practice you could register with. */
    newPatient: {
      eyebrow: string;
      title: string;
      lead: string;
      /* `target` is an anchor NAME, not a fragment: the component turns it with
         anchor.href(target), because the ids are scoped per rendered instance. */
      cards: { title: string; body: string; link: string; target: string }[];
      caveat: string;
    };
    /* The image-led services band. A photo key per entry, one row per card, and a
       destination that exists on the page — the harness follows every one. */
    services: {
      eyebrow: string;
      title: string;
      lead: string;
      items: {
        name: string;
        line: string;
        /* The chair time printed in `index`, reused rather than restated. */
        time: string;
        photo: "waiting" | "room" | "practice-room";
        link: string;
        target: string;
      }[];
      cta: string;
      target: string;
    };
    /* What a visit here does differently. Every point is a claim this page
       already prints elsewhere (`board`, `intro`, `visit`, `urgent`), set side by
       side rather than spread over four bands; no new fact is introduced here. */
    differences: {
      eyebrow: string;
      title: string;
      lead: string;
      points: { title: string; body: string }[];
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
      /* Printed under EVERY exit, including the emergency one: however the answers
         fall, nothing on this page has booked a chair. The harness refuses a run
         whose outcome text does not carry it, so the honesty line cannot be
         dropped when the branches are re-skinned. */
      exitNote: string;
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
    slug: "marigold-kitchen",
    index: "02",
    demo: "restaurant",
    name: "Marigold Kitchen",
    businessType: "Restaurant / Hospitality",
    industry: "Local Dining",
    category: "Hospitality",
    summary:
      "A warm, modern South Asian concept site for Chicago's West Loop: live open-now status worked out from the printed hours, a scroll-pinned four-course journey, the full 24-dish card with prices and dietary filters, and demo forms that read their own ticket back while saying plainly that nothing was sent.",
    objective:
      "Answer the diner's practical questions before asking for anything: whether the room is open right now, what the meal does course by course, what is on the card and what it costs, and how to ask for a table or a group — all honestly labelled as a concept demo, with prices and specials framed as illustrative.",
    strategy:
      "The supplied brief drives every band: the hours are computed live in Chicago time, the tasting journey pins four courses against a drawn plate, the menu is typographic with vegetarian, vegan, gluten-free and spice filters over twenty-four priced dishes, and both forms assemble a sample ticket in front of the visitor. Licensed photography appears only at the hero, the story, the group band and the journey atmosphere — never repeated across dish cards.",
    designDirection: ["Marigold & aubergine", "Pinned course journey", "Typographic priced card", "Demo-honest forms"],
    keySections: [
      "Live status header",
      "Hero",
      "Journey intro",
      "The Tasting Journey",
      "The menu",
      "Tonight at Marigold",
      "Story",
      "Group & private dining",
      "Reservations",
      "Visit",
      "How we cook",
      "Before you come",
    ],
    mobileNotes: [
      "Call, Directions and Reserve stay pinned in a bottom bar on the phone frame",
      "The tasting journey turns into a swipeable card carousel with progress dots and arrows",
      "The menu filters sit in a sticky, horizontally scrolling chip row under the heading",
      "The header re-wraps to two rows so the live-status chip keeps its full words",
      "Party and time chips are kept at touch height so the reservation never needs a zoom",
    ],
    conversionNotes: [
      "Reserve sits in the header, the hero, the reservation band itself and the pinned mobile bar — all on one destination",
      "The live status chip answers the first question a diner asks, before they scroll, in Chicago time",
      "The party chips hand nine-or-more straight to the phone number",
      "Group and reservation forms both build a sample ticket from what was typed and state plainly that nothing was sent or held",
    ],
    accent: "#C8321E",
    /* Marigold gold on aubergine ink over warm cream: the source's own four
       values. Chili is the accent that has to clear contrast as small text and
       link ink; the marigold gold is a fill (journey band, reserve band,
       highlights) and rides in accent2, where DemoVars will only ever use it as
       a background, never as text. Paper is the card surface the forms and the
       menu sit on. */
    palette: { bg: "#FFF6E5", fg: "#2A1233", accent: "#C8321E", surface: "#FFFDF8", accent2: "#F2A900" },
    content: {
      navName: "Marigold Kitchen",
      ctaPrimary: "Reserve a table",
      ctaSecondary: "See the menu",
      services: [
        { title: "Chaat", body: "Bright beginnings." },
        { title: "From the grill", body: "Smoky, citrus-bright." },
        { title: "Curries & rice", body: "Slow, fragrant comfort." },
        { title: "Sweet", body: "A little more time at the table." },
      ],
      faqTitle: "Before you come",
      faqs: [
        {
          q: "Do you take walk-ins?",
          a: "We welcome walk-in questions, but this fictional concept has no live seating or availability. Call ahead before making a trip.",
        },
        {
          q: "Can you accommodate allergies?",
          a: "Please call to discuss your needs. Our kitchen handles common allergens, and we can’t promise a dish is free of any allergen or cross-contact.",
        },
        {
          q: "Is there a dress code?",
          a: "There is no formal dress code for this concept. Come in what feels comfortable for dinner.",
        },
        {
          q: "Are kids welcome?",
          a: "Yes, the concept is designed for a shared meal across ages. Call ahead with accessibility or seating questions.",
        },
        {
          q: "Can you host a large group?",
          a: "Use the demo group enquiry above to preview the details you’d share. For a real gathering, call us directly; no enquiry is sent from this page.",
        },
        {
          q: "Do you offer gift cards?",
          a: "Gift cards are a concept only and are not available to buy.",
        },
      ],

      /* Both forms are part of the fiction, so the status line says what
         pressing the button actually did, in the source's own words. */
      formNote:
        "This is a demo form: nothing is sent and no table is held. Your details stay on this page.",

      restaurant: {
        board: [
          "27 Fulton Row, West Loop · Chicago, IL",
          "Dinner Tue–Sat · Sunday lunch & dinner",
          "Modern South Asian",
          "Hours: Tue–Thu 17:00–22:00",
        ],
        /* The JSON-LD `servesCuisine`, in the concept's own words. */
        cuisine: "Modern South Asian",
        /* AUTHORED (not transcribed): the source names these bands in its own
           headings, but its nav links are the three below, kept short. */
        nav: {
          journey: "Journey",
          menu: "Menu",
          story: "Story",
          groups: "Groups",
          visit: "Visit",
        },
        /* The line the clock works out from `booking.week`, read in Chicago time.
           `{time}` is a printed opening or closing minute, `{day}` a printed day
           name — the same strings the hours table shows. AUTHORED to match the
           shape the source's own status script prints. */
        status: {
          open: "Open now · closes {time}",
          opensToday: "Opens {time} today",
          opensTomorrow: "Opens {time} tomorrow",
          opensDay: "Opens {time} {day}",
        },
        header: {
          concept: "Concept demo · Not a live restaurant",
          openLine: "Dinner Tue–Sat · Sunday lunch & dinner",
          /* The chip is arithmetic on the hours printed below, read in Chicago
             time, and the lead-in says so. */
          statusLead: "Chicago local time",
          phoneLabel: "Call",
          book: "Reserve",
        },
        hero: {
          headline: "Modern South Asian cooking in the",
          accent: "West Loop, Chicago.",
          eyebrow: "A table in the West Loop · Chicago",
          lede:
            "Bright, generous plates made for passing around. Start with something crisp, stay for one more spoonful.",
          hoursLine: "Dinner Tue–Sat · Sunday lunch & dinner",
          /* The source's hero meta row is two icon-led lines — the address and
             the dinner shape — which the layout renders from `hoursLine` and
             `booking.address`; there are no labelled facts to invent here. */
          facts: [],
          /* Marigold has no fire to choose; what it has is two services. The
             chooser band is kept, filled strictly from the printed hours, and
             each block hands its opening time to the reservation grid. The
             block times are unique because the old layout keys the chips by
             time — Tuesday and Friday share 17:00, so they are one block. */
          fire: {
            title: "Which service are you after?",
            body:
              "Dinner runs Tuesday through Saturday and lunch into dinner on Sunday. Pick the service you would join and the reservation starts from it.",
            blocks: [
              {
                time: "17:00",
                label: "Dinner · Tue–Sat",
                note: "Tue–Thu until 22:00, Fri–Sat until 23:00.",
                ask: "Ask for a dinner seating",
                slot: "17:00",
              },
              {
                time: "12:00",
                label: "Sunday lunch & dinner",
                note: "Sunday serves 12:00 to 21:00, lunch through dinner.",
                ask: "Ask about Sunday",
                slot: "12:00",
              },
            ],
            live: "Chosen service",
            drawn: "Sample times only — this demo holds no table.",
          },
          slot: {
            kind: "Hero photograph",
            note: "The grill at full height — flame reaching up between the bars as the meat chars.",
            src: "/demos/marigold-kitchen/hero-fire.webp",
            alt: "Steaks cooking over open flames on a grill.",
          },
        },
        /* The slim band above the journey. In the source it carries the eyebrow
           and nothing else — `indexn.html:2329`, the `div.wrap.journey-intro`
           holds a single `p.eyebrow` and closes on 2331 — so this line is
           AUTHORED in the source's voice rather than transcribed. It restates
           only what the page already shows (the four courses and their own
           one-line descriptions) and adds no fact the concept does not have. */
        intro: {
          eyebrow: "Four plates, one very good evening",
          body: "The meal runs in four courses: something bright to begin, something from the grill, a curry to build the plate around, and something sweet to keep the table a little longer.",
        },
        /* The evening told in courses, one at a time: the source's scroll-pinned
           tasting journey, four courses on one drawn plate. */
        evening: {
          eyebrow: "The Tasting Journey",
          title: "A meal that moves",
          body:
            "From a bright first bite to a slow, sweet finish—follow the plates as they arrive.",
          stages: [
            {
              label: "Chaat",
              line: "A bright, crunchy first bite with sweet tamarind, cool yogurt and a little spark.",
              note: "A bright first bite",
              slot: {
                kind: "Course photograph",
                note: "Small plates laid along the table, sharing first.",
                src: "/demos/marigold-kitchen/gal-table.webp",
                alt: "Small dishes laid along a wooden table with evergreen.",
              },
            },
            {
              label: "From the grill",
              line: "Smoky edges, soft centers and a squeeze of citrus while everything is still warm.",
              note: "Straight from the fire",
              slot: {
                kind: "Course photograph",
                note: "Embers glowing under the bars, the grill empty before the food goes on.",
                src: "/demos/marigold-kitchen/gal-grill.webp",
                alt: "Embers glowing beneath empty grill bars.",
              },
            },
            {
              label: "Curry",
              line: "A slow, fragrant centerpiece with saffron rice made for one more scoop.",
              note: "Scoop, share, repeat",
              slot: {
                kind: "Course photograph",
                note: "Food laid low beside the flames, the grate swinging on its chain.",
                src: "/demos/marigold-kitchen/gal-hearth.webp",
                alt: "Sausages and chicken on a chain-hung grill over a hearth fire.",
              },
            },
            {
              label: "Dessert",
              line: "Cardamom, cream and warm syrup: something lovely to finish slowly.",
              note: "A slow, sweet finish",
              slot: {
                kind: "Course photograph",
                note: "The last plate, still dressed for the table.",
                src: "/demos/marigold-kitchen/gal-autumn.webp",
                alt: "Plated dessert beside a cocktail, pumpkins behind.",
              },
            },
          ],
          prev: "Previous course",
          next: "Next course",
          dots: "Go to course",
          of: "of",
          hint: "Swipe through the courses",
          /* The source keeps this caption fixed under the desktop plate while
             the courses change — a standing line about the drawn plate, not a
             per-course one. The mobile cards use each stage's own `note`. */
          plateLabel: "A little of everything",
          aside: {
            image: {
              src: "/demos/marigold-kitchen/gal-candles.webp",
              alt: "Empty tables lit by small table lamps at night.",
            },
            cta: "Explore all 24 dishes",
          },
        },
        menu: {
          eyebrow: "Made to mix, match and pass around",
          title: "The menu",
          lead:
            "Four ways into the meal. Prices are listed as numbers; ask us about ingredients and preparation.",
          /* Marigold does print numbers, so this field carries the opposite
             honesty: the figures are illustrative, as the source itself frames
             them in the footer ("Prices and sample specials are illustrative"). */
          noPrices:
            "The prices on this card are illustrative numbers for a fictional concept — they are a sample menu, not a bill.",
          /* The source's own filter vocabulary. The layout maps each key: the
             three diet keys match a dish's marks (`vegetarian` reads the `veg`
             mark), and `spicy` reads the `spice` ladder at 1 or more, so mild
             plates are caught with the hotter ones. */
          filters: [
            { key: "all", label: "All" },
            { key: "vegetarian", label: "Vegetarian" },
            { key: "vegan", label: "Vegan" },
            { key: "gf", label: "Gluten-free" },
            { key: "spicy", label: "Mild–Medium–Hot" },
          ],
          filtersLabel: "Filter dishes",
          /* The card's markers, spelled out by `menu.note` above: V vegetarian,
             VG vegan, GF gluten-free. */
          marks: { veg: "V", vegan: "VG", gf: "GF" },
          legend: [
            { mark: "veg", means: "vegetarian" },
            { mark: "vegan", means: "vegan" },
            { mark: "gf", means: "gluten-free" },
            { mark: "hot", means: "flame marks show the spice level — one flame mild, two medium, three hot" },
          ],
          countNoun: "dishes",
          allergy:
            "Allergens: Please ask us about ingredients and preparation. Our kitchen handles common allergens, so we can’t promise a dish is free of any allergen.",
          note:
            "Dish markers: V vegetarian · VG vegan · GF gluten-free · flame marks spice level.",
          spiceWords: ["", "Mild", "Medium", "Hot"],
          sections: [
            {
              label: "Chaat",
              blurb: "Bright beginnings",
              slot: {
                kind: "Typographic card",
                note: "The menu is set in type — no photograph repeats across the dish lines.",
              },
              dishes: [
                {
                  name: "Smoky beet & potato papdi chaat",
                  desc: "Crisp wafers, roasted beet, cool yogurt and tamarind-date chutney.",
                  marks: ["veg"],
                  price: 14,
                  spice: 1,
                },
                {
                  name: "Avocado bhel",
                  desc: "Puffed rice, avocado, cucumber, lime and green chutney.",
                  marks: ["veg", "vegan", "gf"],
                  price: 13,
                  spice: 1,
                },
                {
                  name: "Paneer tikka chaat",
                  desc: "Charred paneer, crisp chickpeas, mint and pomegranate.",
                  marks: ["veg", "gf"],
                  price: 16,
                  spice: 2,
                },
                {
                  name: "Crisp chickpea pani puri",
                  desc: "Semolina shells, spiced chickpea, bright mint water and tamarind.",
                  marks: ["veg", "vegan"],
                  price: 12,
                  spice: 3,
                },
                {
                  name: "Charred corn & sev",
                  desc: "Sweet corn, lime, cilantro and crunchy chickpea noodles.",
                  marks: ["veg", "gf"],
                  price: 13,
                  spice: 1,
                },
                {
                  name: "Tamarind sweet potato chaat",
                  desc: "Roasted sweet potato, crisp lentils, tamarind and fresh lime.",
                  marks: ["veg", "vegan", "gf"],
                  price: 14,
                  spice: 2,
                },
              ],
            },
            {
              label: "From the grill",
              blurb: "Smoky, citrus-bright",
              slot: {
                kind: "Typographic card",
                note: "Six names off the grill, set as type — the photographs stay on the journey.",
              },
              dishes: [
                {
                  name: "Tandoori mushroom",
                  desc: "Fire-kissed mushrooms, ginger, citrus and green chutney.",
                  marks: ["veg", "vegan", "gf"],
                  price: 18,
                  spice: 2,
                },
                {
                  name: "Paneer malai skewers",
                  desc: "Creamy paneer, cardamom, charred scallion and lime.",
                  marks: ["veg", "gf"],
                  price: 19,
                  spice: 1,
                },
                {
                  name: "Chicken seekh kebab",
                  desc: "Minced chicken, warming spice, pickled onion and mint.",
                  marks: ["gf"],
                  price: 21,
                  spice: 2,
                },
                {
                  name: "Lamb boti",
                  desc: "Tender lamb, toasted cumin, chili and a bright herb salad.",
                  marks: ["gf"],
                  price: 24,
                  spice: 3,
                },
                {
                  name: "Charred cauliflower",
                  desc: "Whole-roasted cauliflower, lemon, sesame and green chutney.",
                  marks: ["veg", "vegan", "gf"],
                  price: 17,
                  spice: 2,
                },
                {
                  name: "Salmon tikka",
                  desc: "Citrus-marinated salmon, charred edges and dill yogurt.",
                  marks: ["gf"],
                  price: 25,
                  spice: 2,
                },
              ],
            },
            {
              label: "Curries & rice",
              blurb: "Slow, fragrant comfort",
              slot: {
                kind: "Typographic card",
                note: "The slow half of the card, set as type like the rest of it.",
              },
              dishes: [
                {
                  name: "Butter chicken",
                  desc: "Tomato, cream, fenugreek and a gentle finish; served with rice.",
                  marks: ["gf"],
                  price: 25,
                  spice: 1,
                },
                {
                  name: "Dal makhani",
                  desc: "Slow-simmered black lentils, butter and a touch of smoke.",
                  marks: ["veg", "gf"],
                  price: 21,
                  spice: 1,
                },
                {
                  name: "Chana masala",
                  desc: "Chickpeas, tomato, warming spice and fresh cilantro.",
                  marks: ["veg", "vegan", "gf"],
                  price: 20,
                  spice: 2,
                },
                {
                  name: "Goat curry",
                  desc: "A slow-cooked, deeply spiced curry with ginger and coriander.",
                  marks: ["gf"],
                  price: 28,
                  spice: 3,
                },
                {
                  name: "Coconut fish curry",
                  desc: "Fish in coconut, curry leaf and tamarind broth.",
                  marks: ["gf"],
                  price: 26,
                  spice: 2,
                },
                {
                  name: "Saffron basmati rice",
                  desc: "Fragrant long-grain rice with saffron and toasted cumin.",
                  marks: ["veg", "vegan", "gf"],
                  price: 8,
                  spice: 0,
                },
              ],
            },
            {
              label: "Sweet",
              blurb: "A little more time at the table",
              slot: {
                kind: "Typographic card",
                note: "The last of the sixes — nothing here needs a photograph to be ordered.",
              },
              dishes: [
                {
                  name: "Warm gulab jamun",
                  desc: "Soft milk dumplings, rose-cardamom syrup and pistachio.",
                  marks: ["veg"],
                  price: 11,
                  spice: 0,
                },
                {
                  name: "Cardamom panna cotta",
                  desc: "Silky cream, cardamom and seasonal fruit.",
                  marks: ["veg", "gf"],
                  price: 12,
                  spice: 0,
                },
                {
                  name: "Coconut kheer",
                  desc: "Rice pudding, coconut, toasted cashew and a pinch of saffron.",
                  marks: ["veg", "gf"],
                  price: 10,
                  spice: 0,
                },
                {
                  name: "Pistachio kulfi",
                  desc: "Slow-churned cardamom ice cream with roasted pistachio.",
                  marks: ["veg", "gf"],
                  price: 10,
                  spice: 0,
                },
                {
                  name: "Mango-lime sorbet",
                  desc: "Bright mango, fresh lime and a little crunch of fennel.",
                  marks: ["veg", "vegan", "gf"],
                  price: 9,
                  spice: 0,
                },
                {
                  name: "Chocolate chai cake",
                  desc: "Dark chocolate, black tea spice and a spoon of cream.",
                  marks: ["veg"],
                  price: 12,
                  spice: 0,
                },
              ],
            },
          ],
        },
        room: {
          eyebrow: "A little about us",
          title: "Food that makes room for everyone at the table.",
          paras: [
            "Marigold Kitchen is a fictional neighborhood restaurant concept built around the pleasure of sharing. Our cooking draws on South Asian flavors, familiar comforts and the changing seasons—without asking a meal to stand still.",
            "We want the table to feel generous: a little crunch, a spoonful of something slow-cooked, and time to find your favorite bite.",
          ],
          /* The room's own line about itself — the kitchen's stated philosophy,
             not a diner's review and not a press quote. */
          quote:
            "“The best meal is the one that keeps getting passed around.”",
          quoteCite: "Our kitchen philosophy",
          /* AUTHORED (not transcribed): the source credits nothing, and its nine
             photographs are Unsplash plates of rooms this concept does not have.
             `public/demos/CREDITS.md` records the licence; this says the same
             thing where the pictures are. */
          provenance:
            "The photographs here are licensed stock images of real food and real rooms, used to stand for a kitchen that does not exist. They are not pictures of Marigold Kitchen.",
          tall: {
            kind: "Photograph",
            note: "Two hands passing small plates across the table.",
            src: "/demos/marigold-kitchen/story-hands.webp",
            alt: "Two hands passing small plates across a table.",
          },
          small: {
            kind: "Photograph",
            note: "A dessert in a dark glazed bowl.",
            src: "/demos/marigold-kitchen/story-dessert.webp",
            alt: "A plated dessert in a dark glazed bowl.",
          },
        },
        groups: {
          eyebrow: "Good company, good plates",
          title: "Group & private dining",
          body:
            "Planning a birthday, team dinner or a long-overdue catch-up? Share a few details and see them gathered into a demo enquiry ticket.",
          bands: ["9–12", "13–18", "19–24", "25+"],
          callUs:
            "For gatherings of 9 or more, call us so we can talk through the setup.",
          points: [
            "Menu choices, timing and accessibility needs can be discussed together.",
            "This sample form does not send a message or create a booking.",
          ],
          fields: {
            size: "Party size",
            date: "Preferred date",
            name: "Your name",
            contact: "Phone or email",
            notes: "A few notes",
          },
          sizePrompt: "Choose a size",
          errors: {
            size: "Please choose a party size.",
            date: "Please choose a preferred date.",
          },
          submit: "Preview enquiry",
          notesPlaceholder: "Occasion, timing, or anything you’d like us to know",
          image: {
            src: "/demos/marigold-kitchen/events-room.webp",
            alt: "A warm dining room table set for a relaxed group meal.",
          },
          note: "Demo form — nothing sent. Your details stay on this page.",
          ticket: {
            title: "Demo enquiry preview",
            lead: "Tell us what you’re planning",
            empty: "This sample form does not send a message or create a booking.",
          },
        },
        booking: {
          eyebrow: "Save a seat in the story",
          title: "Come hungry. Leave happy.",
          body:
            "Choose a date and a time to see a sample reservation ticket. This is a demo only: it does not check live availability, send a request or hold a table.",
          parties: [1, 2, 3, 4, 5, 6, 7, 8],
          callUs:
            "Parties of nine or more are handled by phone, so the setup can be talked through first.",
          /* The source reservation card has no occasion selector, so nothing is
             invented here — the field stays for layouts that still ask. */
          occasions: [],
          stepMinutes: 30,
          /* Marigold works the book in half-hour steps right up to half an hour
             before close — the last slot is `close − 30`, with no earlier lead
             buffer the way the fire layout had one. */
          lastSeatingMinutes: 30,
          slotAsk: "Sample times for",
          slotNone: "Choose an open date to see sample times.",
          /* The source keeps the closed-day line apart from the "pick a date"
             empty state, so they are separate strings here too. */
          slotClosed: "We’re closed Mondays. Please choose another date.",
          week: [
            { day: "Monday", dow: 1, open: null, close: 1320, shown: "Closed" },
            { day: "Tuesday", dow: 2, open: 1020, close: 1320, shown: "17:00 – 22:00" },
            { day: "Wednesday", dow: 3, open: 1020, close: 1320, shown: "17:00 – 22:00" },
            { day: "Thursday", dow: 4, open: 1020, close: 1320, shown: "17:00 – 22:00" },
            { day: "Friday", dow: 5, open: 1020, close: 1380, shown: "17:00 – 23:00" },
            { day: "Saturday", dow: 6, open: 1020, close: 1380, shown: "17:00 – 23:00" },
            { day: "Sunday", dow: 0, open: 720, close: 1260, shown: "12:00 – 21:00" },
          ],
          hoursTitle: "Hours",
          closedWord: "Closed",
          statusNote:
            "The open line reads against Chicago local time, so it can differ from the clock on your own device.",
          address: { street: "27 Fulton Row, West Loop", locality: "Chicago", region: "IL" },
          access:
            "For step-free access or other accessibility questions, call ahead so we can discuss your needs.",
          parking:
            "Parking and transit details are not confirmed for this fictional location. Please check the route before travelling.",
          planNote:
            "A drawing of the room, not a map. The street is invented with the rest of it, so there is no pin to drop and no route to promise.",
          directions: {
            label: "Get directions",
            href: "https://www.google.com/maps/dir/?api=1&destination=27%20Fulton%20Row%2C%20West%20Loop%2C%20Chicago%2C%20IL",
          },
          policyTitle: "Booking & changes",
          errors: {
            date: "Please choose a date for the table.",
            time: "Please choose one of the sample times.",
            name: "Please give a name for the table.",
            email: "Please enter an email address for the receipt.",
          },
          fields: {
            date: "Date",
            timeZone: "(Chicago time)",
            party: "Party size",
            time: "Choose a time",
            name: "Name",
            namePlaceholder: "Your name",
            email: "Email",
            emailPlaceholder: "you@example.com",
            notes: "Notes",
            notesOptional: "(optional)",
            partyCall: "9+ call us",
            partyCallAria: "Call for parties of nine or more",
          },
          phone: { display: "(312) 555-0129", href: "tel:+13125550129" },
          submit: "Preview reservation ticket",
          note: "Nothing is confirmed until a real restaurant confirms it. This demo has no booking or cancellation service. For changes to a real reservation, contact the restaurant directly.",
          hints: {
            date: "Dates use Chicago time. A day the kitchen has already served cannot be asked for.",
            time: "Built from the hours above — half-hour sample times up to half an hour before close, nothing outside them.",
            party: "For parties of 9 or more, call (312) 555-0129.",
            notes: "Seating preference or anything you’d like to mention.",
          },
          confirm: {
            title: "Sample reservation ticket",
            lead: "Demo form — no table was held.",
            edit: "Change it",
            timeTerm: "Time",
            guestOne: "guest",
            guestMany: "guests",
          },
        },
        how: {
          eyebrow: "No guesswork, just good food",
          title: "How we cook",
          /* The source runs straight from the heading into the four items —
             `indexn.html:2741`, the `div.transparency-heading` holds one child
             with the eyebrow and the `h2`, then closes — so this standfirst is
             AUTHORED in the source's voice rather than transcribed. It only
             lists what the four points below already say. */
          body: "Four things a card cannot say for itself: how the heat is marked, what the kitchen builds around, what it will not promise about allergens, and what a demo booking actually holds.",
          points: [
            {
              title: "Spice, your way",
              text: "Each dish is marked mild, medium or hot. Ask if you’d like guidance before ordering.",
            },
            {
              title: "Ingredients with a season",
              text: "We build around South Asian pantry staples and produce that changes with the season. Sourcing varies.",
            },
            {
              title: "Allergens, honestly",
              text: "Our kitchen handles common allergens, so we can’t promise any dish is allergen-free.",
            },
            {
              title: "Bookings, clearly",
              text: "This demo holds no table. A real booking would need confirmation; please call about any changes.",
            },
          ],
        },
        /* --- Marigold-only bands the Ember layout never carried -------------- */
        faqLede: "Still wondering? Call us at (312) 555-0129.",
        faqEyebrow: "A few useful things",
        specials: {
          title: "Tonight at Marigold",
          badge: "Example",
          copy: "Charred squash with coconut, lime leaf and toasted seeds. A sample daily special for this concept—not a live availability update.",
        },
        visit: {
          eyebrow: "Find your way to us",
          title: "Come on over.",
          timezoneLabel: "Chicago local time",
          callLabel: "Call (312) 555-0129",
          mapCardName: "Marigold Kitchen",
          mapCardNote: "Illustrated map placeholder",
        },
        footer: {
          copy: "Modern South Asian cooking in Chicago’s West Loop. A fictional restaurant concept made for this demo.",
          legal: "© Marigold Kitchen · Fictional concept · Prices and sample specials are illustrative.",
          badge: "Concept demo · Not a live restaurant",
          findTitle: "Find us",
          hoursTitle: "Hours · Chicago time",
        },
        mobileBar: {
          /* AUTHORED (not transcribed): the source's bar has no name of its own;
             this one is named for what it is, so its accessible label does not
             have to borrow one action's word for three actions. */
          label: "Quick actions",
          call: "Call",
          visit: "Visit",
          reserve: "Reserve",
        },
      },
    },
  },
  {
    slug: "rowanwood-dental",
    index: "03",
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
          photo: "room",
          newPatientCta: "New here — start with the hour",
        },
        /* The three files ruling A puts on this page. Each alt says what the frame
           shows and each caption says what it is not: none of these rooms belongs
           to Rowanwood, because Rowanwood has no rooms. Read against
           public/demos/CREDITS.md, which carries the photographer, the licence and
           the reason the fourth file on disk stays off the page. */
        photos: {
          room: {
            alt: "An empty treatment room: a grey-and-white dental chair seen from behind, an operating light on an arm, the delivery unit, and a window with a blind.",
            caption: "Concept photography. A stock room standing in for one at a practice that does not exist — nothing in this frame belongs to Rowanwood.",
          },
          waiting: {
            alt: "An empty waiting area: teal sofas, a plant by the window, a slatted reception desk, and a window looking into a treatment room.",
            caption: "Concept photography. Somebody else's waiting room, used to show the shape of the first ten minutes.",
          },
          "practice-room": {
            alt: "An empty room with a blue-upholstered dental chair and a practitioner's stool, and a yellow-and-blue abstract painting on the wall.",
            caption: "Concept photography. Not this practice's building — there is no such building to photograph.",
          },
        },
        newPatient: {
          eyebrow: "New here",
          title: "What the first visit actually is.",
          lead:
            "It is booked as a full hour of examination and conversation, and nothing is treated on it. You leave with the options written down and nobody waiting for an answer in the chair.",
          cards: [
            {
              title: "Booked as an hour",
              body: "Sixty minutes of looking and talking, with room in it for the questions you have not thought of yet. The day is booked in hours rather than packed in tens.",
              link: "What a visit is like",
              target: "differences",
            },
            {
              title: "A plan, then a figure",
              body: "The options are written down with a figure against each line, and nothing starts while you are still deciding. No figure is quoted before the looking.",
              link: "See the work and the times",
              target: "services",
            },
            {
              title: "Nervous? Say so now",
              body: "Say it at the desk and it changes the appointment: the quietest slot in the day, a hand that stops everything, each step said before it happens.",
              link: "Put it in the slip",
              target: "booking",
            },
          ],
          caveat:
            "Rowanwood is a concept website, not a practice. The hours, the address and the number on this page are invented for the fiction, so nothing here can be booked and nobody is waiting for your call.",
        },
        services: {
          eyebrow: "The work",
          title: "Checks, cleaning, and the first hour.",
          lead:
            "Three of the rows the treatment index carries, each with the chair time it is booked for. The time is roughly how long the chair is occupied, not how long you spend in the building.",
          items: [
            {
              name: "New-patient examination",
              line: "A full look, a conversation about what bothers you, and nothing treated.",
              time: "60 min",
              photo: "room",
              link: "Point at it first",
              target: "planner",
            },
            {
              name: "Check-up",
              line: "Teeth, gums, jaw and soft tissue, then what has changed since last time.",
              time: "25 min",
              photo: "waiting",
              link: "Asked at the desk",
              target: "faq",
            },
            {
              name: "Clean and polish",
              line: "Tartar off the surface, stains off, and the reason they came back.",
              time: "40 min",
              photo: "practice-room",
              link: "Request a visit",
              target: "booking",
            },
          ],
          cta: "Not sure which one it is? Point at the part instead",
          target: "planner",
        },
        differences: {
          eyebrow: "A visit here",
          title: "Four things you can check on the day.",
          lead:
            "Each one is something the room either does or does not do, rather than a line to believe in a brochure. All four are printed elsewhere on this page; this band only puts them together.",
          points: [
            {
              title: "The first hour is an hour",
              body: "Sixty minutes booked as examination and conversation, with nothing treated on that visit.",
            },
            {
              title: "One dentist, start to finish",
              body: "The one who looks at the tooth in March is the one who finishes it in May, so nobody re-explains their own history.",
            },
            {
              title: "Two slots held back for pain",
              body: "Kept for the afternoon and until four o'clock — which is why the advice on pain is to ring rather than fill anything in.",
            },
            {
              title: "Step-free from the lane",
              body: "Step-free entrance from Ashgrove Lane, a lift to the first floor, and two bays outside, one of them accessible.",
            },
          ],
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
          exitNote:
            "Whichever of these you are on: nothing is booked here. No appointment exists, nothing you tapped left this page, and the practice has not been told anything.",
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

