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
     The fire-led dining layout is a menu, a room and a booking panel rather than
     a service brochure, so it reads a course list, photography for a story split
     and a lightbox gallery, and the hours an address a diner actually needs.

     All OPTIONAL and read only by RestaurantDemo, so the three service concepts
     and the storefront are untouched. Dishes, prices, the street and the phone
     are invented for the fiction — the number stays inside the 555-01XX range and
     the page carries the concept note everywhere it is needed. */
  restaurant?: {
    /* The service board above the header. A fire restaurant decides its evening
       hours before it decides anything else, so the facts a diner needs come
       before the photograph of the room. */
    board: string[];
    hero: {
      src: string;
      alt: string;
      /* The headline is set in two parts so the second can carry the italic. */
      headline: string;
      accent: string;
      eyebrow: string;
      /* The paragraph that does the deciding: what the place is, and the one
         limitation it does not hide. */
      lede: string;
      /* The line a deciding diner looks for first: when the room is open. */
      hoursLine: string;
      /* Three facts set as a hairline row under the actions — covers, seatings,
         how often the card changes. */
      facts: { label: string; value: string }[];
      caption: string;
    };
    intro: { eyebrow: string; body: string };
    /* The two blocks service runs in, and why. Written as a schedule rather than
       a gallery because a twenty-two-cover room with one grill is a constraint
       the visitor has to plan around. */
    seatings: {
      eyebrow: string;
      title: string;
      body: string;
      blocks: { time: string; label: string; note: string }[];
    };
    menu: {
      eyebrow: string;
      title: string;
      lead: string;
      /* Explains the bare numbers on the card, and states the one thing every
         printed card leaves unsaid. */
      priceNote: string;
      /* Sits under the ledger. No kitchen sharing one fire can promise a dish is
         free of anything, so the page says so instead of implying it. */
      allergy: string;
      /* Sits under the ledger: a menu this short cannot promise the dish on the
         day is the dish on the card. */
      note: string;
      courses: {
        label: string;
        blurb: string;
        dishes: { name: string; desc: string; price: string }[];
      }[];
    };
    story: {
      eyebrow: string;
      title: string;
      paras: string[];
      /* The asymmetric split: one tall plate, one smaller one offset over it. */
      tall: { src: string; alt: string };
      small: { src: string; alt: string };
      caption: string;
    };
    gallery: {
      eyebrow: string;
      title: string;
      lead: string;
      /* `ratio` is the file's own measured pixel ratio, held per plate rather
         than looked up by position: the box then matches the photograph whatever
         order the list is in, and nothing reflows when the file arrives. */
      items: { src: string; alt: string; caption: string; ratio: string }[];
    };
    events: {
      eyebrow: string;
      title: string;
      body: string;
      /* Stated as facts a host would confirm on the phone, not as a package. */
      points: string[];
      cta: string;
      /* Written into the booking note when the room enquiry is pressed, so the
         form the visitor arrives at already says what they are asking for. */
      preset: string;
      src: string;
      alt: string;
    };
    booking: {
      eyebrow: string;
      title: string;
      body: string;
      /* The slots offered by the side, not a free clock: a restaurant releases
         tables in services, and a grid of times says so more honestly than a
         time picker that will accept 03:47. */
      times: string[];
      /* Party sizes the form will take. Larger than this goes to the phone, and
         the chips say so instead of a validation error after the fact. */
      parties: number[];
      /* Optional context a reservation book actually records. */
      occasions: string[];
      hours: { day: string; time: string }[];
      address: string[];
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
  };

  /* --- Dental-concept fields ---------------------------------------------------
     A practice earns or loses the visit in the same two places every other local
     business does: what it costs, and whether anyone will explain it to you. So
     this layout is built as a printed patient leaflet — a status board, an index
     of what happens and how long it takes, and a request form — rather than a
     brochure of promises.

     All OPTIONAL and read only by DentalDemo, so the other concepts are
     untouched. The practice name, street, hours and number are invented for the
     fiction; the number stays inside the 555-01XX range reserved for made-up
     businesses.

     What is deliberately NOT here, and why: no practitioner names, credentials,
     registrations or years of practice (a qualification attached to an invented
     person is a fabricated credential, and the concept has no real dentist to
     credit); no patient testimonials, star ratings, review counts or
     before/after claims; no success rates or outcomes; and no price list. The
     last one is the honest position rather than a dodge — the number depends on
     what the examination finds, so the page says where the number appears
     instead of inventing one. */
  dental?: {
    /* The board above the header: the four facts that decide whether to call. */
    board: string[];
    hero: {
      src: string;
      alt: string;
      /* Split so the second line can carry the italic accent. */
      headline: string;
      accent: string;
      eyebrow: string;
      /* The paragraph that does the deciding, including the limitation the
         practice does not hide. */
      lede: string;
      hoursLine: string;
      facts: { label: string; value: string }[];
      ctaPrimary: string;
      ctaSecondary: string;
      caption: string;
    };
    /* Three plates below the fold: a wide band for the practice statement, and
       one in each of the two side rails. Without them the page is a single
       photograph and a wall of text. */
    plates: {
      practice: { src: string; alt: string; caption: string };
      index: { src: string; alt: string; caption: string };
      visit: { src: string; alt: string; caption: string };
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
    /* The examination-first promise, set as the page's opening argument. */
    intro: { eyebrow: string; title: string; body: string; aside: string };
    /* Two groups of rows, each with what happens and how long it takes. No
       prices, and the note underneath says why. */
    index: {
      eyebrow: string;
      title: string;
      lead: string;
      groups: {
        label: string;
        rows: { name: string; time: string; what: string }[];
      }[];
      costNote: string;
    };
    /* The section that wins the nervous patient: four things the practice does,
       each concrete enough to check. */
    nerves: {
      eyebrow: string;
      title: string;
      body: string;
      points: { title: string; body: string }[];
      cta: string;
      prefill: string;
    };
    /* The practical half: what to bring, how long, how to get in. */
    visit: {
      eyebrow: string;
      title: string;
      lead: string;
      /* A short numbered run so the first appointment is predictable. */
      steps: { no: string; title: string; body: string }[];
      bring: { label: string; body: string }[];
      access: string[];
    };
    faq: { eyebrow: string; title: string; lead: string; items: { q: string; a: string }[] };
    booking: {
      eyebrow: string;
      title: string;
      body: string;
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
      confirm: { title: string; lead: string; edit: string };
    };
    hours: { day: string; time: string }[];
    address: string[];
    phone: { display: string; href: string };
    /* Says what the practice is, in the footer's own voice — the line that keeps
       the fiction from reading as a real clinic. */
    positioning: string;
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
      "A fire-led restaurant site that answers the diner's first questions before it shows the room: when it is open, how it seats, and what is on the card.",
    objective:
      "Convey the atmosphere of the room, then remove every practical reason not to book a table.",
    strategy:
      "Facts first, photograph second. A deciding diner wants the service, the card and the constraints before the mood, so the hours board sits above the fold, the menu is the second section, and the booking form asks what a reservation book actually records — including the honest answer about one shared kitchen.",
    designDirection: ["Printed card", "Fire ink", "Asymmetric editorial", "Image-led"],
    keySections: [
      "Service board",
      "Hero",
      "The kitchen",
      "Seatings",
      "The card",
      "The room",
      "Photographs",
      "Banquet room",
      "Reservations",
    ],
    mobileNotes: [
      "Menu reflows to a single column with prices aligned right so it stays scannable",
      "Party sizes are chips rather than a number box, so a thumb can set them",
      "Reserve stays in the sticky header and in the pinned action bar",
      "Photographs open in a viewer pinned inside the frame, not the browser window",
    ],
    conversionNotes: [
      "Reserve call to action in the header, the hero, the banquet room, and the booking panel",
      "Hours, address and the walk-in counter policy printed beside the form, where the last doubts live",
      "The confirmation reads the request back and states plainly that no table is held",
    ],
    accent: "#C8642B",
    /* Dark ember theme: near-black brown room, warm cream ink, burnt orange fire,
       and an olive that only ever appears at large sizes because it cannot clear
       4.5:1 as small text on this background. DemoVars derives every grey and
       both boundary colours from these four at render time. */
    palette: { bg: "#16100C", fg: "#F3EBDD", accent: "#C8642B", accent2: "#7C8460" },
    content: {
      navName: "Ember & Oak",
      ctaPrimary: "Reserve a Table →",
      ctaSecondary: "See the Menu",
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
          a: "A few seats at the counter are held back for people who arrive without a booking. Everything else goes out through the reservation book.",
        },
        {
          q: "Can you cook around an allergy?",
          a: "Usually, if we know in advance. Add it to the booking note and we will tell you honestly whether the kitchen can do it properly that night.",
        },
        {
          q: "Is there a set menu?",
          a: "No. The card changes with the week, so you choose course by course and nobody is committed to a long dinner they did not ask for.",
        },
        {
          q: "Do you take large groups?",
          a: "The banquet room seats up to fourteen and is enquired about rather than booked online. Use the number on this page.",
        },
      ],

      imageSource:
        "Photography: Sebastian Alvarado Rojas, Ruben Mavarez, Vitalii Kyktov, Janay Peters, Sergio Arteaga, Bence Balla-Schottner, Madeline Liu, Anita Austvika and Ivan Benets — all used under the Unsplash License. This is a fictional restaurant; the food shown is not the food on this menu.",

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
        hero: {
          src: "/demos/ember-restaurant/hero-fire.webp",
          alt: "Steaks cooking over an open flame on a barred grill, a tall tongue of fire behind them.",
          headline: "Everything Here",
          accent: "Has Met A Flame.",
          eyebrow: "Ash-fired kitchen · Twenty-two covers",
          lede:
            "One fire, two seatings, and a card that is rewritten on Monday. The room is small and the grill is at the back of it, so the kitchen is part of the evening rather than something happening elsewhere. If a dish is not working, we will tell you at the table instead of waiting for you to notice.",
          hoursLine: "Dinner Wednesday to Sunday · from 18:00",
          facts: [
            { label: "Covers", value: "22" },
            { label: "Seatings", value: "18:00 / 21:00" },
            { label: "The card", value: "Rewritten Mondays" },
          ],
          caption: "Oak and beech, burned down since four o'clock",
        },
        intro: {
          eyebrow: "The Kitchen",
          body: "There is one fire in this building and it does most of the work. Meat and fish go straight onto the bars. Vegetables go into the ash under a foil hood, where they cook slower and taste of somewhere else. Bread arrives still ticking from the heat, and the butter is cultured in-house because it takes four days and we have them.",
        },
        seatings: {
          eyebrow: "Service",
          title: "Two Blocks, Because One Grill Cannot Be In Two Places At Once",
          body:
            "The room is seated in blocks so the fire can keep up with it. Tables are held for the block you book, not for the whole evening, and nobody is rushed out between the two.",
          blocks: [
            {
              time: "18:00",
              label: "First block",
              note: "The fire is fresh. This is the block to take if you want the grill's attention.",
            },
            {
              time: "21:00",
              label: "Second block",
              note: "Coals by then, which is what the hearth vegetables want anyway.",
            },
            {
              time: "12:00",
              label: "Sunday only",
              note: "One continuous lunch to 17:00, shorter card, no second block.",
            },
          ],
        },
        menu: {
          eyebrow: "The Card",
          title: "This Week",
          lead:
            "The card changes with the week, so this is what is on it right now. Everything is cooked to order — a full dinner in the first block takes about two hours.",
          priceNote:
            "The card is printed with numbers only, so it is reproduced that way here. No service charge is added to the table.",
          allergy:
            "Everything is cooked in one kitchen, over one fire, beside flour and nuts. We cannot promise a dish is free of anything, and we would rather say that than imply the opposite. Tell us when you book and we will be straight with you about what the kitchen can do that night.",
          note: "The card is rewritten on Monday. If a dish matters to you, say so when you book and we will tell you whether it is still on.",
          courses: [
            {
              label: "Starters",
              blurb: "Small, salted, and meant to be eaten while the grill is still settling.",
              dishes: [
                {
                  name: "Ember Leeks",
                  desc: "Buried in the ash, hazelnut, aged sheep's cheese",
                  price: "12",
                },
                {
                  name: "Grilled Sourdough",
                  desc: "Cultured butter, smoked salt, thyme oil",
                  price: "8",
                },
                {
                  name: "Charred Hispi",
                  desc: "Brown butter, lemon, toasted caraway",
                  price: "11",
                },
                {
                  name: "Smoked Beetroot",
                  desc: "Goat curd, walnut, honey vinegar",
                  price: "10",
                },
                {
                  name: "Cured Trout",
                  desc: "Buttermilk, cucumber, dill oil",
                  price: "13",
                },
              ],
            },
            {
              label: "Mains",
              blurb: "Cooked on the bars, rested by the fire, never under a lamp.",
              dishes: [
                {
                  name: "Dry-Aged Ribeye",
                  desc: "Bone marrow, watercress, burnt onion",
                  price: "42",
                },
                {
                  name: "Whole Plaice",
                  desc: "Brown butter, capers, sea herbs",
                  price: "29",
                },
                {
                  name: "Coal-Roast Chicken",
                  desc: "Morels, tarragon, pan gravy",
                  price: "26",
                },
                {
                  name: "Aged Pork Chop",
                  desc: "Quince, fennel, mustard greens",
                  price: "28",
                },
                {
                  name: "Smoked Haddock",
                  desc: "Crab, cauliflower, brown shrimp butter",
                  price: "27",
                },
              ],
            },
            {
              label: "Dessert",
              blurb: "Three puddings and a cheese board, made in the afternoon.",
              dishes: [
                {
                  name: "Burnt Honey Custard",
                  desc: "Oat crumble, crème fraîche",
                  price: "9",
                },
                {
                  name: "Chocolate and Olive Oil",
                  desc: "Sea salt, bay leaf ice cream",
                  price: "10",
                },
                {
                  name: "Baked Pear",
                  desc: "Sourdough ice cream, walnut praline",
                  price: "9",
                },
                {
                  name: "Cheese, Two",
                  desc: "Oatcakes, quince from the pot",
                  price: "12",
                },
              ],
            },
            {
              label: "Drinks",
              blurb: "The short list. The cellar card has more and is on the table.",
              dishes: [
                {
                  name: "Barrel-Aged Negroni",
                  desc: "Orange peel, bitter wine",
                  price: "13",
                },
                {
                  name: "Smoked Old Fashioned",
                  desc: "Maple, black walnut bitters",
                  price: "14",
                },
                {
                  name: "Wine, By The Glass",
                  desc: "Three whites, three reds, one orange",
                  price: "9–14",
                },
                {
                  name: "Spruce and Honey Soda",
                  desc: "No alcohol, made in the kitchen",
                  price: "6",
                },
              ],
            },
          ],
        },
        story: {
          eyebrow: "The Room",
          title: "Twenty-Two Covers, One Fire",
          paras: [
            "The room seats twenty-two and the tables are close enough that you can hear the kitchen deciding things. It is not a quiet restaurant and it does not pretend to be.",
            "Service runs in two blocks so the grill can keep up with the room. The first table is seated at six, the last at nine, and nobody is rushed out in between.",
          ],
          tall: {
            src: "/demos/ember-restaurant/story-hands.webp",
            alt: "Two hands passing small plates across a dark wooden table, in black and white.",
          },
          small: {
            src: "/demos/ember-restaurant/story-dessert.webp",
            alt: "Hands either side of a small dessert in a dark glazed bowl, topped with a yellow flower.",
          },
          caption: "Plates go over the pass by hand. There is no till at the front.",
        },
        gallery: {
          eyebrow: "Photographs",
          title: "Fire, Tables, Plates",
          lead:
            "Five photographs from the room, each licence-checked and credited at the foot of this section. Open one and the arrows or the left and right keys move through the set.",
          items: [
            {
              src: "/demos/ember-restaurant/gal-hearth.webp",
              alt: "Sausages and a split chicken on a chain-hung grill in front of a hearth fire.",
              caption: "The chain, lowered onto the coals",
              ratio: "1100/733",
            },
            {
              src: "/demos/ember-restaurant/gal-grill.webp",
              alt: "Close view of empty iron grill bars with embers glowing underneath.",
              caption: "Bars, cleaned and hot",
              ratio: "1100/700",
            },
            {
              src: "/demos/ember-restaurant/gal-table.webp",
              alt: "A row of small dishes laid along a wooden table over evergreen branches.",
              caption: "A long table, laid for nobody yet",
              ratio: "800/1200",
            },
            {
              src: "/demos/ember-restaurant/gal-autumn.webp",
              alt: "A glazed purple dessert on a white plate beside an amber cocktail, with pale pumpkins behind.",
              caption: "Pudding and a digestif",
              ratio: "1100/750",
            },
            {
              src: "/demos/ember-restaurant/gal-candles.webp",
              alt: "Empty restaurant tables lit by small battery lamps at night.",
              caption: "Nine o'clock, second service",
              ratio: "1000/1000",
            },
          ],
        },
        events: {
          eyebrow: "Private Dining",
          title: "The Banquet Room",
          body:
            "A door closes, the candles come down the table, and fourteen people eat the same menu at the same time. It is cooked the same way as everything else in the building — on the fire, in front of you.",
          points: [
            "Seats up to fourteen",
            "One menu, chosen in advance",
            "The grill is fired for your table only",
          ],
          cta: "Enquire About The Room",
          preset: "Banquet room — up to 14, one menu agreed in advance",
          src: "/demos/ember-restaurant/events-room.webp",
          alt: "A long dark dining room set for a banquet, with tall candles in glass holders down the centre.",
        },
        booking: {
          eyebrow: "Reservations",
          title: "Find A Table",
          body:
            "Parties of two to eight are held here; anything larger goes through the phone so we can check the room will take you. The form asks the questions a reservation book actually records.",
          times: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
          parties: [2, 3, 4, 5, 6, 7, 8],
          occasions: ["No occasion", "Birthday", "Anniversary", "Business dinner", "Just because"],
          hours: [
            { day: "Wednesday – Saturday", time: "18:00 – 23:30" },
            { day: "Sunday", time: "12:00 – 17:00" },
            { day: "Monday – Tuesday", time: "Closed" },
          ],
          address: ["14 Ashgrove Lane", "Old Foundry Quarter"],
          phone: { display: "(555) 555-0166", href: "tel:+15555550166" },
          submit: "Find a Table",
          note: "Tables are held for the block you book, not for the evening. Running late is worth a call.",
          hints: {
            date: "Tonight onwards. A day the room has already served cannot be booked.",
            time: "Dinner slots. Sunday lunch is one continuous service, so it goes through the phone.",
            party: "Two to eight online. Anything larger is checked against the room first.",
            notes: "Allergies, a wheelchair, a pram, a table you would rather not sit beside the grill. Say it here.",
          },
          confirm: {
            title: "Asked for, not booked",
            lead:
              "This is what the form received. Nothing left this page, so the table is not held and nobody has been told to expect you.",
            edit: "Change it",
          },
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
      "A quiet cream studio site built around an arch-shaped price card, a stylist roster that drops you into the booking already filled, and an honest four-step request.",
    objective:
      "Make a small studio feel calm and premium, and turn a visitor into an appointment without a heavy storefront.",
    strategy:
      "Restraint, and one shape. A beauty studio sells on atmosphere and trust, so the room's arches carry the layout — an arched hero plate, arched portrait plates, an arched booking stub — while everything a studio usually pads with cards and stock claims is set as ruled type instead: one continuous dotted-leader menu that filters by family, a roster you can book from directly, and a request that stops short of pretending to send.",
    designDirection: ["Soft luxury", "Arch motif", "Didone editorial", "Calm"],
    keySections: ["Hero", "Statement", "Price Card", "Roster", "Booking", "Gallery", "Visit"],
    mobileNotes: [
      "Nav collapses to a hamburger sheet below the tablet frame",
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
        announcement: "Now booking spring appointments",
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
      "A dental practice site that answers cost and fear before it asks for the appointment.",
    objective:
      "Make a nervous new patient trust the practice enough to book — without a single review, rating, before/after or credential on the page.",
    strategy:
      "Leaflet, not brochure. The page order follows what a patient actually decides on: whether they can be seen this week, what will happen in the chair, and what it will cost. Everything is stated as process — durations, steps, a written number handed over before treatment — because process is the only trust a practice can show without borrowing somebody else's testimonials.",
    designDirection: ["Printed leaflet", "Clinical sage", "Hairline index", "Reassuring, not slick"],
    keySections: [
      "Status board",
      "Hero",
      "In pain today",
      "The practice",
      "Treatments index",
      "Nervous patients",
      "First appointment",
      "FAQ",
      "Request a visit",
    ],
    mobileNotes: [
      "The pain band and its call action sit above the treatment index, not below it",
      "Reason, day and part-of-day are chips, so the request form is answered with taps",
      "The number is a button inside a device frame and explains why it cannot dial",
      "A sticky Request bar keeps the form reachable, with the last section padded clear of it",
    ],
    conversionNotes: [
      "Two routes, split honestly: call for pain, request for everything else",
      "The no-price stance arrives with a reason and a promise, so it reads as honesty and not evasion",
      "The confirmation reads the request back and says plainly that no appointment exists yet",
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
          "Monday to Thursday 08:00 – 17:30 · Friday to 17:00",
          "Saturday morning 09:00 – 13:00 · Closed Sunday",
          "Two urgent slots held back every afternoon, until 16:00",
          "Step-free entrance · Rowanwood House, 4 Ashgrove Lane",
        ],
        hero: {
          src: "/demos/rowanwood-dental/room.webp",
          alt: "An empty dental treatment room: a chair under an operating light, an instrument cart beside it, daylight from a window on the far wall, no people.",
          headline: "An Examination First,",
          accent: "A Written Number After.",
          eyebrow: "General & family dentistry · Two chairs",
          lede:
            "A first visit is an examination and a conversation. We look, we tell you what we found, and you leave with a plan in writing with a number against every item on it. Nothing is started while you are still deciding. What we will not do is quote you before the examination, because the honest figure depends on what the examination finds.",
          hoursLine: "Open Monday to Saturday · Urgent slots until 16:00",
          facts: [
            { label: "First visit", value: "60 minutes" },
            { label: "The room", value: "Two chairs" },
            { label: "The plan", value: "Written, before anything starts" },
          ],
          ctaPrimary: "Request a visit",
          ctaSecondary: "In pain today?",
          caption: "Room two, laid out for the first appointment of the day",
        },
        plates: {
          practice: {
            src: "/demos/rowanwood-dental/practice-room.webp",
            alt: "An empty treatment room: a blue-upholstered dental chair with its instrument arm and delivery unit, a practising stool beside it, a window with blinds behind, and a yellow and blue abstract painting on the wall. No people.",
            caption: "Room one, between appointments",
          },
          index: {
            src: "/demos/rowanwood-dental/instruments.webp",
            alt: "Five periodontal probes laid in a row on a white tray — two orange handles, one purple, two black — with their hooked tips pointing the same way.",
            caption: "What a check-up is made of",
          },
          visit: {
            src: "/demos/rowanwood-dental/waiting.webp",
            alt: "An empty waiting area: teal sofas along two walls, a low table with magazines, a plant in the corner, a window looking into a treatment room, and a slatted reception desk on the right. No people.",
            caption: "The waiting room, before the first patient",
          },
        },
        urgent: {
          eyebrow: "Pain",
          title: "In Pain Today?",
          body:
            "Ring the practice rather than filling the form in. Two slots every afternoon are held back for pain and swelling, and the line is answered by whoever is at the front desk — not a call centre. Say when it started and where it is. That is enough to book one.",
          hospital:
            "A knocked-out tooth, a swelling in the face or jaw, difficulty swallowing, an injury you cannot see the shape of, or bleeding that will not stop: that is an emergency department, not a dental practice, and we would rather you went there now.",
          phoneLabel: "Call the practice",
          phoneNote: "This number belongs to a concept website and does not connect.",
          writeInstead: "Write instead of calling",
          prefill: "In pain today — please call me back.",
          /* Must match one of booking.reasons exactly — see DentalDemo. */
          prefillReason: "Pain or swelling",
        },
        intro: {
          eyebrow: "The practice",
          title: "Two Chairs, One Plan",
          body:
            "Rowanwood is a small general practice. One dentist takes a patient from the first appointment to the last, so nobody re-explains their history at every visit, and the room is quiet enough to hear what is being explained. Most of the work is the ordinary kind — checks, cleanings, fillings, and the crowns that come after them.",
          aside:
            "We are not a hospital and we do not keep every case. When something needs a specialist, we say so, write the referral, and tell you who to ring.",
        },
        index: {
          eyebrow: "What happens",
          title: "The Work, Listed",
          lead:
            "Every row below is an appointment you can ask about. The time is roughly how long the chair is occupied, not how long you spend in the building.",
          groups: [
            {
              label: "Routine",
              rows: [
                {
                  name: "New-patient examination",
                  time: "60 min",
                  what: "A full look, a conversation about what bothers you, and X-rays only if the examination calls for them. No treatment is started on this visit.",
                },
                {
                  name: "Check-up",
                  time: "25 min",
                  what: "Teeth, gums, jaw and the soft tissues looked at, then what has changed since last time explained at the chair rather than at the door.",
                },
                {
                  name: "Clean and polish",
                  time: "40 min",
                  what: "Scale, polish, and the two minutes of instruction that actually make the difference at home.",
                },
                {
                  name: "A child's first visit",
                  time: "30 min",
                  what: "A look round, a count of teeth, and the chair tilted for practice if the child wants it. Treatment waits for a second visit.",
                },
              ],
            },
            {
              label: "When something is wrong",
              rows: [
                {
                  name: "Filling",
                  time: "45 min",
                  what: "Numb, out, filled. Which tooth, and what caused it, is said before anything is picked up.",
                },
                {
                  name: "Crown",
                  time: "2 visits · 60 + 45 min",
                  what: "Prepared and worn as a temporary from the first visit, cemented at the second once the lab has sent the real one back.",
                },
                {
                  name: "Root treatment",
                  time: "60 – 90 min",
                  what: "Done to save a tooth that would otherwise come out. Some need a second appointment to finish.",
                },
                {
                  name: "Extraction",
                  time: "30 – 45 min",
                  what: "Straightforward ones in this chair. Anything surgical — a lower wisdom tooth, a root that has broken down — goes to a referral instead.",
                },
                {
                  name: "Denture and bridge repairs",
                  time: "30 min",
                  what: "Re-fitted, re-lined or sent away. A same-day repair is not always possible, and the desk tells you which it is when you ring.",
                },
              ],
            },
          ],
          costNote:
            "There is no price list on this page, on purpose. The number depends on what the examination finds, so it is written down and handed over at the end of it — before anything is started, and before anything is charged.",
        },
        nerves: {
          eyebrow: "Nervous patients",
          title: "Say So When You Book",
          body:
            "It is the single most useful thing to tell the front desk, and it changes how the appointment is built. It is offered rather than assumed — plenty of people would rather not talk about it, and that is fine too.",
          points: [
            {
              title: "The quietest slot in the day",
              body: "Booked away from the corridor and the children's hour, with enough time in it that nobody is hurried out of the chair.",
            },
            {
              title: "A hand up stops everything",
              body: "Agreed before anything is picked up, honoured without a discussion about it afterwards, and repeated as often as you need.",
            },
            {
              title: "Each step, before it happens",
              body: "What is about to happen and what it will feel like. Ask us to skip the descriptions and we will do that too.",
            },
            {
              title: "A first visit can be a look round",
              body: "Come, sit in the chair, see the room, leave. No instruments and no examination, and it is not billed as treatment.",
            },
          ],
          cta: "Tell us when you book",
          prefill:
            "I get anxious in the chair — please book the quietest slot you have and go slowly.",
        },
        visit: {
          eyebrow: "Before you come",
          title: "The First Appointment",
          lead: "Sixty minutes, and most of it is looking and talking.",
          steps: [
            {
              no: "01",
              title: "You arrive",
              body: "Front desk, a form on a tablet or a clipboard, and a short wait — the day is booked in sixty-minute blocks rather than packed in tens.",
            },
            {
              no: "02",
              title: "The examination",
              body: "Teeth, gums, jaw and soft tissues, with X-rays only if what we find calls for them. Anything you ask gets answered at the chair.",
            },
            {
              no: "03",
              title: "The plan",
              body: "What we found, what it means, and the options where there is more than one — written down with a number against each item before you leave.",
            },
          ],
          bring: [
            {
              label: "Identification",
              body: "Photo ID for the file. Nothing else is needed in order to be seen.",
            },
            {
              label: "What you take",
              body: "Medicines, inhalers and supplements included. It changes what is safe to do in the chair.",
            },
            {
              label: "Old X-rays",
              body: "From another practice, on a disc or a printout. They save taking the same picture twice.",
            },
            {
              label: "Your questions",
              body: "Written down is fine. Half of them are worth asking before you sit down.",
            },
          ],
          access: [
            "Step-free entrance from Ashgrove Lane and a lift to the first floor.",
            "Two parking bays outside, one of them accessible.",
            "A carer or a family member can sit in on any appointment.",
            "Under sixteen, a parent stays in the room for the whole visit.",
          ],
        },
        faq: {
          eyebrow: "Questions",
          title: "Asked At The Desk",
          lead: "The questions the front desk answers most often, in the words it answers them in.",
          items: [
            {
              q: "Do I need to be registered to be seen?",
              a: "No. A new patient books the same sixty-minute examination as anyone else, and registration is offered after it if the practice turns out to be the right fit.",
            },
            {
              q: "How soon can I get in?",
              a: "Routine appointments are usually booked two to three weeks out. Pain is different: two slots each afternoon are held for it, and ringing before 16:00 usually means being seen the same day.",
            },
            {
              q: "Will I be told off about my teeth?",
              a: "No. A lecture is not treatment. The state of your mouth at a first visit is information for us, not a verdict on you.",
            },
            {
              q: "Do you take insurance?",
              a: "No plans are handled here. You get the written number at the end of the examination and pay after treatment — and if you would rather claim it back from an insurer, the paperwork supports that.",
            },
            {
              q: "My tooth hurts only when I bite. Is that an emergency?",
              a: "Usually not that night. Take something simple for the pain and ring in the morning. If your face or jaw starts to swell, or swallowing becomes difficult, stop reading and call immediately.",
            },
            {
              q: "Can I bring the children?",
              a: "Yes. The first visit is deliberately short, a parent stays in the room for anyone under sixteen, and a child who will not open their mouth today is not forced to.",
            },
          ],
        },
        booking: {
          eyebrow: "Appointments",
          title: "Request A Visit",
          body:
            "The form goes to the front desk, which rings you back to fix an actual time. It is the slower route, and the right one for anything that is not pain.",
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
          patientTypes: ["New patient", "Existing patient"],
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
              "Anxiety, a wheelchair, a carer coming with you, a tooth already treated, an old X-ray to bring.",
          },
          submit: "Request A Visit",
          note: "No time is held until the practice rings you back.",
          confirm: {
            title: "Asked for, not booked",
            lead:
              "This is what the form received. Nothing left this page, so there is no appointment yet and nobody at the practice has been told to expect you.",
            edit: "Change it",
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
          "General and family dentistry. Two chairs, one plan, and a number before anything starts.",
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

