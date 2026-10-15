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

export type DemoKey =
  | "renovation"
  | "plumber"
  | "electrician"
  | "restaurant"
  | "salon";

/* Content for the local-service demo layout (renovation / plumber / electrician).
   Each fictional business gets its own copy, palette and structure emphasis so
   the demos don't look like one recoloured template.

   The base fields below are OPTIONAL. Every demo now owns its own layout
   component, so each concept reads only the fields it actually renders; a
   project carries nothing its demo cannot draw. `navName` is the one field all
   five read (their headers and footers). */
export type ServiceDemoContent = {
  logoLetter?: string;
  navName: string;
  headline?: string;
  headlineAccent?: string;
  intro?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  servicesTitle?: string;
  services?: { title: string; body: string }[];
  galleryTitle?: string;
  whyTitle?: string;
  whyIntro?: string;
  whyPoints?: string[];
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

  /* --- Renovation-concept fields -------------------------------------------
     The editorial renovation layout needs a little more than the shared
     local-service template reads: full-bleed photography, an opening statement,
     project rows with scope instead of stats, and a named process. They live
     here so the copy stays in one place with the rest of the fictional
     business, and every one is OPTIONAL — the plumber and electrician concepts
     read none of them and need no new content. */
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
  work?: { eyebrow: string; lead: string; items: { title: string; type: string; scope: string; src: string; alt: string }[] };
  process?: { eyebrow: string; title: string; intro: string; steps: { no: string; title: string; body: string }[] };
  servicesEyebrow?: string;
  servicesLead?: string;
  servicePreviews?: string[]; // one decorative preview plate per service, by index
  contact?: { eyebrow: string; name: string; email: string; projectType: string; message: string; submit: string; projectOptions: string[] };

  /* --- Plumber-concept fields ------------------------------------------------
     The call-first plumbing layout is built around a phone number, an urgent
     band, a quoting explanation and a coverage panel. All OPTIONAL, so the
     renovation, restaurant and salon concepts read none of it.

     `phone` is the fictional business's number, never the studio's: the site's
     own contact rules (see the studio config at the top of this file) still hold
     — no phone, WhatsApp or location for Ismail Web Studio anywhere. Fictional
     numbers stay inside the 555-01XX range reserved for made-up businesses. */
  phone?: { display: string; href: string; label: string };
  availability?: string;
  trustChips?: string[];
  emergency?: { title: string; body: string; callLabel: string; note: string };
  quoting?: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
    note: string;
  };
  /* Coverage is grouped by how long it takes someone to arrive, which is the only
     grouping a homeowner can act on. The flat list the area checker tests against
     is derived from these, so a place can never be listed and unfindable. */
  areas?: {
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
    zones: { name: string; travel: string; places: string[] }[];
  };

  /* --- FlowRight's home-services layout ---------------------------------------
     The call-first redesign reads the fields below. All of it is read only by
     PlumberDemo, so the renovation, restaurant and salon concepts are untouched.

     `groups` replaces a grid of equal service cards: nine services in three
     kinds of call, because what decides who you phone is whether it is urgent,
     planned, or part of a build. `quickPicks[].job` must match a service title
     exactly — pressing a hero chip writes it into the quote form's job field, and
     the form's options are derived from `groups`, so a mismatch is a broken
     control rather than a typo. */
  home?: {
    heroKicker: string;
    quickPicks: { label: string; detail: string; job: string }[];
    groups: {
      name: string;
      when: string;
      items: { title: string; body: string; tags: string[] }[];
    }[];
    heating: {
      eyebrow: string;
      title: string;
      body: string;
      points: { title: string; body: string }[];
      image: { src: string; alt: string; caption: string };
    };
    installs: {
      eyebrow: string;
      title: string;
      body: string;
      points: string[];
      image: { src: string; alt: string; caption: string };
    };
    areaCheck: {
      label: string;
      placeholder: string;
      submit: string;
      /* `{place}` is replaced with what the visitor typed, so the answer always
         names the place they asked about. */
      hit: string;
      miss: string;
      blank: string;
      note: string;
    };
    quote: {
      eyebrow: string;
      title: string;
      intro: string;
      labels: {
        name: string;
        phone: string;
        area: string;
        job: string;
        urgency: string;
        details: string;
      };
      placeholders: { name: string; phone: string; area: string; details: string };
      urgencies: { value: string; hint: string }[];
      submit: string;
      /* The confirmation is the whole point of the form: it repeats what was
         asked for and says plainly that nothing left the browser. */
      successTitle: string;
      successLead: string;
      note: string;
    };
    closing: { eyebrow: string; hours: { day: string; time: string }[] };
  };

  /* --- Electrician-concept fields ---------------------------------------------
     The dark technical layout reads a dashboard-style status panel and a quote
     helper that explains a job instead of pricing it. `phone` above is reused
     here; everything below is OPTIONAL and read only by ElectricianDemo, so the
     other concepts are untouched. */
  status?: {
    eyebrow: string;
    title: string;
    /* `tone: "live"` draws a pulsing dot, `note` a static one. A concept cannot
       claim to be staffed right now, so only the invented rows get "live". */
    rows: { label: string; value: string; tone: "live" | "note" }[];
    note: string;
  };
  helper?: {
    eyebrow: string;
    title: string;
    intro: string;
    prompt: string;
    checkLabel: string;
    prepareLabel: string;
    submit: string;
    sendNote: string;
    /* Index-aligned with nothing: each option carries its own two answers, so a
       job type can never be paired with the wrong preparation note. */
    options: { job: string; check: string; prepare: string }[];
    note: string;
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
    hero: {
      src: string;
      alt: string;
      /* The headline is set in two parts so the second can carry the italic. */
      headline: string;
      accent: string;
      /* The line a deciding diner looks for first: when the room is open. */
      hoursLine: string;
      caption: string;
    };
    intro: { eyebrow: string; body: string };
    menu: {
      eyebrow: string;
      title: string;
      lead: string;
      /* Sits under the ledger: a menu this short cannot promise the dish on the
         day is the dish on the card. */
      note: string;
      tabs: {
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
      items: { src: string; alt: string; caption: string }[];
    };
    events: {
      eyebrow: string;
      title: string;
      body: string;
      points: string[];
      cta: string;
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
      hours: { day: string; time: string }[];
      address: string[];
      phone: { display: string; href: string };
      /* The submit ask itself — a restaurant books a table, so the button says
         what pressing it does rather than reusing the page's generic CTA. */
      submit: string;
      /* Repeated beside the submit button: the last question before booking. */
      note: string;
    };
  };

  /* --- Salon-concept fields ----------------------------------------------------
     Maison Lune is a soft, minimal beauty studio, so its layout is a service
     menu, a booking flow, a small team and a room — not a product grid or a
     service brochure. It reads the fields below; all OPTIONAL and read only by
     SalonDemo, so the four other concepts are untouched.

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
    };
    /* The single large statement below the hero. */
    statement: string;
    menu: {
      eyebrow: string;
      title: string;
      lead: string;
      /* Each tab is a treatment family; items carry a duration and a "from $"
         floor price, never a fixed quote. */
      tabs: {
        label: string;
        items: { name: string; desc: string; duration: string; price: string }[];
      }[];
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
    };
    team: {
      eyebrow: string;
      title: string;
      intro: string;
      /* Initials, never face photographs — a monogram plate stands in. */
      members: { name: string; initials: string; role: string; focus: string }[];
    };
    gallery: {
      eyebrow: string;
      title: string;
      lead: string;
      items: { src: string; alt: string; caption: string }[];
    };
    studio: {
      eyebrow: string;
      title: string;
      points: { title: string; body: string }[];
    };
    offer: { title: string; body: string };
    visit: {
      eyebrow: string;
      title: string;
      address: string[];
      hours: { day: string; time: string }[];
      phone: { display: string; href: string };
      /* The map panel cannot show a real place, so it names what it is. */
      mapNote: string;
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
     more than one colour in it — FlowRight's aqua and grey panels. DemoVars
     emits them as --d-surface / --d-accent-2 and measures its text tokens
     against the surface, so an extra colour can never quietly break contrast. */
  palette: { bg: string; fg: string; accent: string; surface?: string; accent2?: string };
  content?: ServiceDemoContent; // required for the local-service demo layout
};

/* Concept projects. Fictional businesses, always labelled "Concept project" —
   never presented as real clients. */
export const projects: Project[] = [
  {
    slug: "atlas-renovation",
    index: "01",
    demo: "renovation",
    name: "Atlas Renovation Co.",
    businessType: "Local Service Business",
    industry: "Home Renovation",
    category: "Service",
    summary:
      "A premium home-renovation site built to earn trust before the first phone call.",
    objective:
      "Create a premium online presence that makes homeowners trust the company before contacting them.",
    strategy:
      "Trust-led. The page order follows how a homeowner actually decides: what you do, proof it's been done, who's doing it, then the questions that stop them calling. Nothing decorative sits above the booking action.",
    designDirection: ["Minimal", "Premium", "Trust-focused", "Conversion-oriented"],
    keySections: ["Hero", "Services", "Projects", "About", "FAQ", "Contact"],
    mobileNotes: [
      "One-column layout so nothing needs horizontal scrolling",
      "Full-width tap targets for the consultation button",
      "Project gallery stacks instead of shrinking into unreadable tiles",
    ],
    conversionNotes: [
      "Primary call to action repeated in the nav, after the gallery, and at the end",
      "Fixed-quote promise stated twice to remove the price anxiety that stops enquiries",
    ],
    accent: "#9A6B3F",
    /* Light editorial theme: warm off-white paper, charcoal ink, muted bronze.
       Every text colour the concept uses is derived from these three at render
       time (see _shared.tsx), so the bronze only has to work as a fill. */
    palette: { bg: "#F4F1EC", fg: "#1B1B1A", accent: "#9A6B3F" },
    content: {
      navName: "Atlas Renovation",
      headline: "Premium Local Service,",
      headlineAccent: "Without The Generic Website.",
      intro:
        "Full-home renovation crafted around how you actually live. Kitchens, bathrooms, and extensions — designed, managed, and finished to a standard you can point to.",
      ctaPrimary: "Book a Consultation →",
      servicesTitle: "Services built around your home",
      services: [
        { title: "Kitchens", body: "Custom cabinetry, worktops, and layouts designed for how you cook." },
        { title: "Bathrooms", body: "Wet rooms, tiling, and fixtures with a spa-like finish." },
        { title: "Extensions", body: "Added space that feels original to the property." },
        { title: "Full Renovation", body: "One team from strip-out to final clean." },
        { title: "Interiors", body: "Colour, lighting, and materials that hold together." },
        { title: "Project Management", body: "A single point of contact, on schedule." },
      ],
      galleryTitle: "Recent Projects",
      whyIntro:
        "We treat your home like our own. Clear quotes, honest timelines, and a finish that stands up close.",
      faqTitle: "Questions, answered",
      faqs: [
        {
          q: "How long does a typical renovation take?",
          a: "It depends on the size and scope of the project. After a consultation and review of the work involved, we can give you a clearer estimated timeline.",
        },
        {
          q: "Do you handle permits?",
          a: "Where approvals or permits are required, they should be identified during the planning stage and factored into the project before work begins.",
        },
        {
          q: "Can I live at home during the work?",
          a: "Sometimes. It depends on which areas of the home are being renovated and how much of the property is affected. We discuss the practical options before the project starts.",
        },
      ],
      ctaTitle: "Ready to talk about your project?",
      ctaBody: "Book a free consultation and get a clear, fixed quote.",

      /* The consultation form cannot really reach a business, so the status line
         says plainly what happened when it was pressed. */
      formNote:
        "This form is part of a concept website: nothing has been sent and no consultation is booked. A real business site would confirm the enquiry here.",

      /* Renovation-concept layout content. Scope is composed from the service
         descriptions above rather than written fresh, and the process steps
         restate the promises already made in the services — no new claims. */
      imageSource:
        "Interior photography here stands in for project imagery. It is concept material, not a record of completed work.",
      hero: {
        src: "/demos/atlas-renovation/hero-kitchen.webp",
        alt: "A renovated kitchen with pale cabinets and a timber-topped island, lit from the side.",
        caption: "Kitchens · Bathrooms · Extensions",
        headline: "Spaces that feel",
        accent: "inevitable.",
      },
      statement:
        "We treat your home like our own. Clear quotes, honest timelines, and a finish that stands up close.",
      work: {
        eyebrow: "Selected work",
        lead: "A kitchen, a bathroom, and an extension — the three rooms people most often start with.",
        items: [
          {
            title: "Hillside Kitchen",
            type: "Kitchen",
            scope: "Custom cabinetry, worktops, and layouts designed for how you cook.",
            src: "/demos/atlas-renovation/work-kitchen.webp",
            alt: "A bright kitchen with pale cabinets and a patterned tile backsplash behind the counter.",
          },
          {
            title: "Marble Bath",
            type: "Bathroom",
            scope: "Wet rooms, tiling, and fixtures with a spa-like finish.",
            src: "/demos/atlas-renovation/work-bathroom.webp",
            alt: "A modern bathroom with two basins set into a long counter and a large mirror.",
          },
          {
            title: "Garden Extension",
            type: "Extension",
            scope: "Added space that feels original to the property.",
            src: "/demos/atlas-renovation/living-openplan.webp",
            alt: "An open-plan living and dining space under a high pitched ceiling with tall windows.",
          },
        ],
      },
      process: {
        eyebrow: "How we work",
        title: "Four stages, one lead",
        intro:
          "The same route on every project, so you always know which stage the work is in and who to ask about it.",
        steps: [
          {
            no: "01",
            title: "Consult",
            body: "We walk the space with you and talk through what the home has to do for you.",
          },
          {
            no: "02",
            title: "Design",
            body: "Layout, materials and finishes are settled on drawings you can read before anything starts.",
          },
          {
            no: "03",
            title: "Build",
            body: "One dedicated project lead runs the works and keeps the site dust-controlled.",
          },
          {
            no: "04",
            title: "Handover",
            body: "We go through the finished work with you, backed by the workmanship guarantee.",
          },
        ],
      },
      servicesEyebrow: "Services",
      servicesLead: "Six ways we take a house from plans to a finish.",
      servicePreviews: [
        "/demos/atlas-renovation/work-kitchen.webp",
        "/demos/atlas-renovation/work-bathroom.webp",
        "/demos/atlas-renovation/living-openplan.webp",
        "/demos/atlas-renovation/hero-kitchen.webp",
        "/demos/atlas-renovation/hero-kitchen.webp",
        "/demos/atlas-renovation/living-openplan.webp",
      ],
      contact: {
        eyebrow: "Start a project",
        name: "Your name",
        email: "Email",
        projectType: "Project type",
        message: "What are you thinking of?",
        submit: "Request a consultation",
        projectOptions: [
          "Kitchen",
          "Bathroom",
          "Extension",
          "Full renovation",
          "Interiors",
          "Not sure yet",
        ],
      },
    },
  },
  {
    slug: "flowright-plumbing",
    index: "02",
    demo: "plumber",
    name: "FlowRight Plumbing",
    businessType: "Home Services",
    industry: "Plumbing & Heating",
    category: "Trade",
    summary:
      "A call-first plumbing and heating site: the number at display size, a quote request that validates what it asks for, and a coverage list you can check yourself.",
    objective:
      "Carry two very different visitors on one page — the person standing over a burst pipe at 9pm, and the homeowner planning a bathroom or a boiler for next spring.",
    strategy:
      "Two doors, one page. The emergency door is a phone number you cannot miss and three quick picks that write the job into the form for you. The planning door is a service ledger grouped by the kind of call, a heating section, and a quote request that checks itself before it claims anything. Rates, insurance, response times and coverage are the four things a concept site cannot invent, so each is explained rather than claimed.",
    designDirection: ["Trade signage", "Call-first", "Cold-water blue", "Warm heat accent"],
    keySections: [
      "Hero",
      "Quick picks",
      "Service ledger",
      "Heating",
      "Bathroom refits",
      "Quote request",
      "Service areas",
      "FAQ",
      "Contact",
    ],
    mobileNotes: [
      "The number is the first large tap target on the screen and stays in the thumb bar",
      "The quote form runs one column, validates before it confirms, and never fakes a send",
      "Service areas are grouped by travel time instead of a map nobody can read at 390px",
    ],
    conversionNotes: [
      "Three routes into the same quote form: the hero's quick picks, every ledger row, and the sticky bar",
      "The confirmation repeats the job, area and urgency that were asked for, then says plainly that nothing was sent",
    ],
    accent: "#0b57d0",
    /* Cold water, warm heat. White page, deep ink-navy text and one signal blue
       for every action; the second colour is a warm amber reserved for the heating
       material, so the two halves of the trade read apart without a new palette.
       Text tokens are derived against all three surfaces. */
    palette: {
      bg: "#ffffff",
      fg: "#071a2c",
      accent: "#0b57d0",
      surface: "#eef3f9",
      accent2: "#f5b942",
    },
    content: {
      logoLetter: "F",
      navName: "FlowRight",
      headline: "Burst Pipe, Cold House,",
      headlineAccent: "One Number Fixes Both.",
      intro:
        "Emergency plumbing, boilers, heating and bathroom work under one number. Someone picks up, and the price is written down before a tool comes out of the van.",
      ctaPrimary: "Request a quote",
      ctaSecondary: "See what we cover",

      faqTitle: "Before you call",
      faqs: [
        {
          q: "How fast can you get here?",
          a: "Emergency jobs are prioritised, but arrival time depends on availability, location, and the current workload. We confirm the expected arrival time when the callout is booked.",
        },
        {
          q: "Do you do heating as well as plumbing?",
          a: "Yes. Boilers, radiators, controls and underfloor loops are most of the work, so a cold house comes to the same number as a burst pipe and gets the same person looking at it.",
        },
        {
          q: "Can you give me a price over the phone?",
          a: "Not for the job itself. A price for work nobody has seen is a guess, and the guess becomes your bill. What a phone call can do is establish what we need to look at, and what the visit costs.",
        },
        {
          q: "Do you charge for a quote?",
          a: "Ask for a quote and the work can be discussed before anything begins. The final scope and price should be clear before work starts.",
        },
        {
          /* The insurance question deliberately shows no claim: on a real site it
             can only be answered once the business confirms its actual cover. */
          q: "Are you insured?",
          a: "This is a concept website, so no specific insurance claim is displayed. On a real business website, this should only be stated once the business has confirmed its actual insurance details.",
        },
        {
          q: "Which areas do you cover?",
          a: "The list under 'Where we work' is grouped by how long it takes someone to arrive. If your street is not on it, ask anyway — a short call is cheaper than a wrong assumption.",
        },
      ],
      ctaTitle: "Water won't wait. Neither do we.",
      ctaBody: "Tell us what is wrong and get a written price before any work starts.",

      /* The honest line under a submit that cannot submit. It is the concept's own
         wording so it can answer the ask in the visitor's terms. */
      formNote:
        "Concept site: nothing was sent, stored or booked. This confirmation is the only thing the button does.",

      /* --- FlowRight's own layout content. The number is the fictional
         business's, in the range reserved for invented phone numbers; the studio's
         own contact rules are unaffected. --- */
      phone: {
        display: "(555) 555-0142",
        href: "tel:+15555550142",
        label: "Call FlowRight",
      },
      availability: "Emergencies answered any hour. Same number, day or night.",
      trustChips: [
        "Plumbing and heating under one number",
        "Price written before work starts",
        "Clean, tidy work",
      ],
      servicesEyebrow: "What we get called for",
      servicesTitle: "Grouped by the kind of call, because that decides who you phone.",
      imageSource:
        "Photography here is licensed stock standing in for the trade's own site pictures. It is concept material, not a record of completed work.",
      hero: {
        src: "/demos/flowright-plumbing/hero-pipes.webp",
        alt: "A plumber seen from behind, head down inside a kitchen cabinet, both hands on the white pipework under a sink while a work light throws cold blue across the cupboard.",
      },
      emergency: {
        title: "Water where it shouldn't be?",
        body: "Shut the valve under the sink or at the stopcock, then call. We stay on the line while you find it.",
        callLabel: "Call the emergency line",
        note: "Concept site: this is a fictional number and it reaches no one.",
      },
      process: {
        eyebrow: "How a callout works",
        title: "Three steps, and you approve the price in the middle.",
        intro: "No mystery visits. You know what is happening at every point.",
        steps: [
          {
            no: "01",
            title: "You tell us what is wrong",
            body: "A sentence is enough. We ask the two or three questions that decide which van to send.",
          },
          {
            no: "02",
            title: "We look, then write the price",
            body: "The plumber finds the cause and gives you a fixed price for the work before touching a tool.",
          },
          {
            no: "03",
            title: "You say go, we fix it",
            body: "If you approve, the work happens there and then where it can. If not, you pay for the look, not the job.",
          },
        ],
      },
      quoting: {
        eyebrow: "Pricing, plainly",
        title: "You hear the number before the work, not after it.",
        intro: "This is the part most people worry about, so it is the part we are clearest about.",
        steps: [
          { title: "Assess", body: "We find the actual cause, not just the symptom you can see." },
          { title: "Fixed quote first", body: "One price for the job, written down, before anything starts." },
          { title: "You approve", body: "Nothing happens until you say the price is fine. Saying no costs you the visit only." },
          { title: "We fix it", body: "The work is done, tested in front of you, and the area is left clean." },
        ],
        note: "No rates are listed here. This is a concept business with no real price list to publish, and inventing figures would be a claim about money rather than a design decision.",
      },
      areas: {
        eyebrow: "Where we work",
        title: "Grouped by how long it takes someone to reach you.",
        intro:
          "Distance decides how fast a van can be outside, so the area is stated up front instead of hidden behind a contact form.",
        zones: [
          {
            name: "Inner ring",
            travel: "Emergency slots the same day",
            places: ["Northgate", "Ashvale", "Kingsley Row", "Cedar Flats"],
          },
          {
            name: "Outer suburbs",
            travel: "Same or next day",
            places: ["Old Foundry", "Marlow Bend", "Riverside Wharf", "Fern Hill"],
          },
          {
            name: "Further afield",
            travel: "Ask, and we say yes or no on the phone",
            places: ["Hollowmere", "Bracken Ridge", "Wexley Fields"],
          },
        ],
        note: "Concept: these neighbourhoods are invented for the design and the travel times are illustrative. A live site would publish the firm's actual coverage.",
      },

      home: {
        heroKicker: "Plumbing & heating · 24/7 callouts",
        /* Each pick writes its job into the quote form and moves you there, so the
           fastest path from a symptom to a request is one tap. `job` must match a
           service title in `groups` exactly. */
        quickPicks: [
          { label: "Burst or leaking", detail: "Water where it should not be", job: "Emergency plumbing" },
          { label: "No hot water", detail: "Boiler or heating fault", job: "Boilers & heating" },
          { label: "Blocked drain", detail: "Sink, toilet or outside drain", job: "Drains & toilets" },
        ],
        groups: [
          {
            name: "Urgent",
            when: "Answered today",
            items: [
              {
                title: "Emergency plumbing",
                body: "Bursts, major leaks and no water. The first thing we do on the phone is find your stopcock with you.",
                tags: ["Burst pipe", "No water", "Overflowing tank"],
              },
              {
                title: "Leak detection",
                body: "Acoustic and thermal tracing, so the repair opens one floorboard instead of six.",
                tags: ["Hidden leak", "Damp patch", "Meter running"],
              },
              {
                title: "Drains & toilets",
                body: "Sinks, toilets and outside drains cleared, then shown what came out and what caused it.",
                tags: ["Blocked drain", "Toilet not flushing", "Sewage smell"],
              },
            ],
          },
          {
            name: "Heating",
            when: "Booked this week",
            items: [
              {
                title: "Boilers & heating",
                body: "Repairs, servicing and like-for-like replacements, quoted after someone has actually seen the unit.",
                tags: ["No hot water", "Boiler locking out", "Pilot keeps going out"],
              },
              {
                title: "Radiators & controls",
                body: "Cold tops, balancing, room thermostats and smart controls fitted to the system you already have.",
                tags: ["Cold radiators", "Noisy system", "Thermostat upgrade"],
              },
              {
                title: "Underfloor & heat pumps",
                body: "Loops laid with the floor, and low-flow systems sized room by room from drawings you can read.",
                tags: ["Underfloor loop", "Heat pump", "New build"],
              },
            ],
          },
          {
            name: "Installed",
            when: "Scheduled around the build",
            items: [
              {
                title: "Bathroom refits",
                body: "Suites, showers and wet rooms: first fix before finish, pressure-tested before the panels go on.",
                tags: ["Full bathroom", "Shower room", "Wet room"],
              },
              {
                title: "Kitchen & utility plumbing",
                body: "Sinks, dishwashers and washing-machine runs moved or replaced alongside the units.",
                tags: ["Move a sink", "Appliance feeds", "Utility room"],
              },
              {
                title: "Landlord & rental work",
                body: "Repairs and annual checks booked around the tenant, with the paperwork listed before the visit.",
                tags: ["Rental repair", "Annual check", "Tenant access"],
              },
            ],
          },
        ],
        heating: {
          eyebrow: "Heating",
          title: "A cold radiator is usually a water problem wearing a heating coat.",
          body: "Most heat complaints are flow, controls or a boiler asked to do more than the system can carry. The same people fit both sides of it, so nobody gets sent twice.",
          points: [
            {
              title: "Seen before it is quoted",
              body: "A boiler price written without looking at the flue, the filter and the system size is a guess with a logo on it.",
            },
            {
              title: "Balanced, not just bled",
              body: "Cold tops and noisy pipes normally mean flow, not a failed part. The whole circuit gets checked before anything is replaced.",
            },
            {
              title: "Sized room by room",
              body: "Underfloor loops and low-flow emitters are worked out from the rooms they heat, so the controls can actually hold a temperature.",
            },
          ],
          image: {
            src: "/demos/flowright-plumbing/warm-room.webp",
            alt: "A vaulted timber living and dining room with a lit stove behind a glass screen, chairs pulled up to it, and nobody in the room.",
            caption: "Stock photograph of a warm room — concept material, not a FlowRight installation.",
          },
        },
        installs: {
          eyebrow: "Bathrooms & kitchens",
          title: "The suite is the easy half. What sits behind the tile decides how long it lasts.",
          body: "A refit is pipework, falls, pressure and access, finished in the order that lets someone get back in in ten years without cutting the room apart.",
          points: [
            "First fix before finish, so nothing is buried untested.",
            "Pressure-tested in front of you before a single panel goes up.",
            "Left clean at the end of every day on site, not just the last one.",
          ],
          image: {
            src: "/demos/flowright-plumbing/bathroom.webp",
            alt: "A bright bathroom with twin basins on a long vanity, a freestanding tub under a shuttered window, and a glass shower with black brassware.",
            caption: "Stock photograph of a finished bathroom — concept material, not a FlowRight job.",
          },
        },
        areaCheck: {
          label: "Type your area",
          placeholder: "Northgate, or a postcode",
          submit: "Check",
          hit: "“{place}” is on the list — we cover it.",
          miss: "“{place}” is not on the list. Ask anyway; a short call is cheaper than a wrong assumption.",
          blank: "Type an area and it is checked against the list above.",
          note: "Concept: this checks against an invented list. On a live site it would answer from the firm's real coverage.",
        },
        quote: {
          eyebrow: "Request a quote",
          title: "Tell us what is wrong. We tell you what we need to see.",
          intro:
            "Two minutes. A real person reads it before anyone is given a number, and the job comes out of the list above.",
          labels: {
            name: "Your name",
            phone: "Number to ring back",
            area: "Area or postcode",
            job: "What is the job?",
            urgency: "How soon?",
            details: "Anything we should know?",
          },
          placeholders: {
            name: "Jordan Avery",
            phone: "(555) 555-0199",
            area: "Northgate",
            details: "Boiler model, how long it has been doing it, whether you can get under the stairs.",
          },
          urgencies: [
            { value: "Today", hint: "Emergency slot" },
            { value: "This week", hint: "Routine repair" },
            { value: "Next month", hint: "Planned work" },
            { value: "Just planning", hint: "No dates yet" },
          ],
          submit: "Send request",
          successTitle: "Understood. Nothing left this browser.",
          successLead: "Here is what the form read back to you:",
          note: "Concept site with no backend: pressing send validates the fields and shows this confirmation. No request is made, stored or booked.",
        },
        closing: {
          eyebrow: "FlowRight Plumbing · Plumbing & heating",
          hours: [
            { day: "Emergencies", time: "Any hour, every day" },
            { day: "Mon–Fri", time: "07:30 – 18:00" },
            { day: "Saturday", time: "09:00 – 14:00" },
            { day: "Sunday", time: "Emergency line only" },
          ],
        },
      },
    },
  },
  {
    slug: "voltwise-electrical",
    index: "03",
    demo: "electrician",
    name: "VoltWise Electrical",
    businessType: "Local Trade",
    industry: "Electrical Services",
    category: "Trade",
    summary:
      "A technical, safety-led electrician site that answers questions before the customer has to ask.",
    objective:
      "Make a cautious homeowner feel the work is careful and clearly explained before they enquire.",
    strategy:
      "Safety-clarity. Electrical work makes people nervous, so the page leads with what actually happens on a job and plain-language explanations instead of jargon, and puts a quote helper beside the services rather than a form at the bottom. Credentials are the one thing a concept site cannot claim, so the status panel says a real one would go there instead of inventing a badge.",
    designDirection: ["Technical", "Sharp", "Safety-led", "Plain-language"],
    keySections: ["Hero", "Services", "Safety practices", "Quote helper", "FAQ", "Contact"],
    mobileNotes: [
      "Service rows stack into a single column with full-width tap areas",
      "Quote helper usable one-handed while standing in front of a consumer unit",
      "The emergency number stays reachable from every scroll position",
    ],
    conversionNotes: [
      "Emergency call in the nav, the hero, the status panel and the closing block",
      "The quote helper explains a job before anyone has to describe it in a form",
    ],
    accent: "#FFD400",
    /* Dark technical theme: a near-black page, one raised surface, hairline
       borders, and a single electric yellow doing all the acting. Text colours
       are still derived at render time (see _shared.tsx), so the yellow only has
       to survive as a fill — at this lightness it clears AA as small text too. */
    palette: { bg: "#07090D", fg: "#E8ECF2", accent: "#FFD400", surface: "#0F131A" },
    content: {
      logoLetter: "V",
      navName: "VoltWise Electrical",
      /* The two halves also drive the hero's one-time "power on": each word
         group flickers to lit in sequence, so the accent half has to be able to
         stand alone as a line. */
      headline: "Careful Wiring.",
      headlineAccent: "Explained Plainly.",
      intro:
        "Domestic and light-commercial electrical work: fault finding, board upgrades, charging points, lighting and rewires. You are told what is being checked, what the result means, and what the work involves — before anything is taken apart.",
      ctaPrimary: "Emergency Call",
      ctaSecondary: "Request a quote",
      phone: {
        display: "(555) 555-0173",
        href: "tel:+15555550173",
        label: "Call VoltWise Electrical",
      },
      imageSource:
        "The board photograph is concept material, licensed stock — not a record of a VoltWise installation.",
      hero: {
        src: "/demos/voltwise-electrical/panel-band.webp",
        alt: "An open board with rows of breakers and colour-coded wiring, shot from above.",
      },
      status: {
        eyebrow: "Service status",
        title: "Where a real board would show its credentials",
        rows: [
          { label: "Emergency line", value: "Answered by an electrician", tone: "live" },
          { label: "Quote replies", value: "Same day, illustrative", tone: "live" },
          { label: "Licensed & insured", value: "Concept: credentials would appear here", tone: "note" },
        ],
        note: "Concept site: a live business would list its registration and insurance details here. Inventing them would be a claim, not a design decision.",
      },
      servicesTitle: "Work we take on",
      servicesEyebrow: "Services",
      services: [
        {
          title: "Fault Finding",
          body: "Tripping circuits, dead sockets, burning smells — traced to the cause instead of the nearest part being replaced.",
        },
        {
          title: "Consumer Units",
          body: "Boards replaced with protection matched to how the property is actually used, and every circuit named.",
        },
        {
          title: "EV Charging Points",
          body: "Home charging with the circuit, the cable route and the remaining load thought through first.",
        },
        {
          title: "Lighting",
          body: "Indoor, external and controlled lighting, wired so it can still be serviced in five years.",
        },
        {
          title: "Rewires",
          body: "Planned room by room, so the house stays livable while the work is happening.",
        },
        {
          title: "Inspection And Reporting",
          body: "A written record of what a property's wiring is doing, what it fails, and what it needs.",
        },
      ],
      galleryTitle: "Recent Work",
      /* The safety section. These are practices described in the moment a job is
         being done, not qualifications asserted about the business. */
      whyTitle: "What safety means on an actual job",
      whyIntro:
        "Anyone can call themselves safety-led. These are the specific things that happen on a visit, in this order.",
      whyPoints: [
        "Isolation confirmed and proved dead before a single screw comes out.",
        "The existing installation is looked at before new work is added to it.",
        "Every circuit is tested and clearly named when the job is finished.",
        "Anything dangerous spotted while we are there is written down and shown to you.",
        "The area is left as it was found, with no loose ends in the loft or the board.",
      ],
      faqTitle: "Common questions",
      faqs: [
        {
          q: "Do I actually need a full rewire?",
          a: "Not always. It depends on the age, condition and layout of what is already there, and on what has been added to it since. An inspection is what settles it, and the reason for each recommendation should be shown to you, not just asserted.",
        },
        {
          q: "Can any circuit take a charging point?",
          a: "Not automatically. The board, the remaining capacity, the cable route and the earthing arrangement all get looked at first. If the answer is no, that should be said before a date is booked rather than discovered on the day.",
        },
        {
          q: "Why does a socket dead on one side of the house affect the other?",
          a: "Circuits are often looped through more rooms than they are named for, so one fault can take out a run of sockets or lights. Tracing which circuit a socket sits on is most of the work, and it is done with the board open rather than by guessing.",
        },
        {
          q: "What should I have ready before a visit?",
          a: "The age of the property if you know it, what changed before the problem appeared, and clear access to the board and to wherever the work is. A photo of the board with the cover off answers most of the rest before anyone arrives.",
        },
      ],
      helper: {
        eyebrow: "Quote helper",
        title: "Pick the job. See what it involves.",
        intro:
          "No prices here — a figure written before anyone has seen the board would be a guess dressed up as a quote.",
        prompt: "What needs doing?",
        checkLabel: "What we check first",
        prepareLabel: "What helps you prepare",
        submit: "Request this quote",
        sendNote: "Concept site: this form has no backend, so nothing is sent and nothing is stored.",
        options: [
          {
            job: "Panel upgrade",
            check: "The incoming supply, the earthing and bonding arrangement, the condition of the existing cables, and which circuits actually exist once the cover is off.",
            prepare: "Clear access to the board and a note of what each switch does today, even if you are sure some of them do nothing.",
          },
          {
            job: "EV charger",
            check: "Spare capacity in the board, the circuit length and route, the earthing arrangement, and whether the consumer unit needs work before a charger is added to it.",
            prepare: "Where the car parks in relation to the board, and a photo of the outside wall you would want the unit on.",
          },
          {
            job: "Lighting",
            check: "Where the existing cable runs, whether the switch legs and neutrals are where the plan assumes they are, and what the fitting needs to be serviceable later.",
            prepare: "Which rooms, and whether you want them controlled from more than one place — that decides most of the cabling.",
          },
          {
            job: "Rewiring",
            check: "What is installed now, what condition it is in, what has been added on top of it over the years, and which rooms can stay in use while the work runs.",
            prepare: "Which rooms you can clear for how long, and where the loft or cupboard access is.",
          },
          {
            job: "Fault finding",
            check: "Which circuit the symptom actually sits on, whether the fault is in the board, the cable, or a connection somewhere along the run, and whether it is safe to leave until tomorrow.",
            prepare: "When it happens and what was in use at the time. A ten-second video of the switch failing saves an hour of guessing.",
          },
        ],
        note: "Concept: the helper explains the work. It stores nothing and sends nothing.",
      },
      ctaTitle: "Something not right with your electrics?",
      ctaBody:
        "Describe what is happening, or send a photo of the board. You will hear what needs checking and what that means before anyone quotes a price.",
    },
  },
  {
    slug: "ember-restaurant",
    index: "04",
    demo: "restaurant",
    name: "Ember & Oak",
    businessType: "Restaurant / Hospitality",
    industry: "Local Dining",
    category: "Hospitality",
    summary:
      "A restaurant site focused on atmosphere, menu, and getting the table booked.",
    objective:
      "Convey the atmosphere of the room and turn visitors into reservations.",
    strategy:
      "Atmosphere-led. People choose a restaurant on feel before they look at the food, so the hero sets the mood and the menu sits close to the top where a deciding visitor expects to find it.",
    designDirection: ["Warm", "Atmospheric", "Elegant", "Image-led"],
    keySections: ["Hero", "Menu", "Story", "Gallery", "Reservations"],
    mobileNotes: [
      "Menu reflows to a single column with prices aligned right so it stays scannable",
      "Reservation button stays in the sticky header on every scroll position",
      "Navigation collapses on small screens while the reserve action stays visible",
    ],
    conversionNotes: [
      "Reserve call to action in the header, the hero, and the dedicated booking panel",
      "Opening days and hours repeated next to the booking form to remove the last question",
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
        hero: {
          src: "/demos/ember-restaurant/hero-fire.webp",
          alt: "Steaks cooking over an open flame on a barred grill, a tall tongue of fire behind them.",
          headline: "Everything Here",
          accent: "Has Met A Flame.",
          hoursLine: "Dinner Wednesday to Sunday · from 18:00",
          caption: "Oak and beech, burned down since four o'clock",
        },
        intro: {
          eyebrow: "The Kitchen",
          body: "There is one fire in this building and it does most of the work. Meat and fish go straight onto the bars. Vegetables go into the ash under a foil hood, where they cook slower and taste of somewhere else. Bread arrives still ticking from the heat, and the butter is cultured in-house because it takes four days and we have them.",
        },
        menu: {
          eyebrow: "The Card",
          title: "This Week",
          lead:
            "Nine things on the grill, four puddings, and a cellar list we keep short on purpose.",
          note: "The card is rewritten on Monday. If a dish matters to you, say so when you book and we will tell you whether it is still on.",
          tabs: [
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
          lead: "Tap any photograph to see it larger. Escape or the arrow keys move through them.",
          items: [
            {
              src: "/demos/ember-restaurant/gal-hearth.webp",
              alt: "Sausages and a split chicken on a chain-hung grill in front of a hearth fire.",
              caption: "The chain, lowered onto the coals",
            },
            {
              src: "/demos/ember-restaurant/gal-grill.webp",
              alt: "Close view of empty iron grill bars with embers glowing underneath.",
              caption: "Bars, cleaned and hot",
            },
            {
              src: "/demos/ember-restaurant/gal-table.webp",
              alt: "A row of small dishes laid along a wooden table over evergreen branches.",
              caption: "A long table, laid for nobody yet",
            },
            {
              src: "/demos/ember-restaurant/gal-autumn.webp",
              alt: "A glazed purple dessert on a white plate beside an amber cocktail, with pale pumpkins behind.",
              caption: "Pudding and a digestif",
            },
            {
              src: "/demos/ember-restaurant/gal-candles.webp",
              alt: "Empty restaurant tables lit by small battery lamps at night.",
              caption: "Nine o'clock, second service",
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
          src: "/demos/ember-restaurant/events-room.webp",
          alt: "A long dark dining room set for a banquet, with tall candles in glass holders down the centre.",
        },
        booking: {
          eyebrow: "Reservations",
          title: "Find A Table",
          body:
            "Dinner service, Wednesday to Sunday. Parties of two to eight are held here; anything larger goes through the phone so we can check the room will take you.",
          times: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
          hours: [
            { day: "Wednesday – Saturday", time: "18:00 – 23:30" },
            { day: "Sunday", time: "12:00 – 17:00" },
            { day: "Monday – Tuesday", time: "Closed" },
          ],
          address: ["14 Ashgrove Lane", "Old Foundry Quarter"],
          phone: { display: "(555) 014-0166", href: "tel:+15550140166" },
          submit: "Find a Table",
          note: "Tables are held for the block you book, not for the evening. Running late is worth a call.",
        },
      },
    },
  },
  {
    slug: "maison-lune",
    index: "05",
    demo: "salon",
    name: "Maison Lune",
    businessType: "Beauty Studio",
    industry: "Hair & Beauty",
    category: "Hospitality",
    summary:
      "A soft, minimal beauty studio site built around a service menu and a booking flow.",
    objective:
      "Make a small studio feel calm and premium, and turn a visitor into an appointment without a heavy storefront.",
    strategy:
      "Restraint. A beauty studio sells on atmosphere and trust, so the layout behaves like the room itself — generous cream space, a light serif, one muted rose accent, and a booking flow that walks a visitor from service to time in four quiet steps.",
    designDirection: ["Minimal", "Soft luxury", "Editorial serif", "Calm"],
    keySections: ["Hero", "Service Menu", "Booking", "Team", "Gallery"],
    mobileNotes: [
      "Nav collapses to a hamburger sheet below the tablet frame",
      "The four-step booking stays one column so a choice never crowds the next",
      "A sticky Book bar keeps the appointment reachable with one thumb",
    ],
    conversionNotes: [
      "Book Now appears in the header, the hero, and the sticky mobile bar",
      "Service menu leads with durations and a from-price so a visitor can self-select",
      "The booking summary updates live, so the choice is visible before it is confirmed",
    ],
    accent: "#B5776A",
    palette: { bg: "#F7F2EC", fg: "#2B221D", accent: "#B5776A", surface: "#E9DFD3" },
    content: {
      /* The salon layout renders nothing from the shared local-service base
         except `navName`, which its header and footer both draw. Everything else
         it shows lives under `salon` below. See ruling H. */
      navName: "Maison Lune",
      formNote:
        "This book is part of a concept website: the appointment has not been taken and nothing was sent. A real studio would confirm it here.",
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
        },
        statement:
          "We are a small studio. We would rather do fewer people well than fill a calendar — so a haircut is not squeezed between the appointments on either side of it.",
        menu: {
          eyebrow: "The Menu",
          title: "What we do",
          lead: "Four families of treatment. Prices are a starting point; the studio confirms the final figure at your consultation.",
          tabs: [
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
        },
        booking: {
          eyebrow: "Appointments",
          title: "Book in four steps",
          body: "Pick what you would like, who you would like to see, and a time. Nothing here really reserves a chair — it is a concept demonstration of how a booking could feel.",
          steps: ["Service", "Stylist", "Time", "Review"],
          days: ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16", "Sat 17"],
          times: ["09:30", "11:00", "13:15", "15:00", "16:30"],
          submit: "Request Appointment",
          note: "Concept site — this booking does not send anywhere and no chair is held.",
        },
        team: {
          eyebrow: "The Studio",
          title: "Who you'll see",
          intro: "Three stylists share the room. You can ask for a favourite, or let the studio pair you with whoever suits the service.",
          members: [
            { name: "Noor", initials: "N", role: "Senior Stylist", focus: "Cuts, curl re-shaping and colour correction." },
            { name: "Elise", initials: "E", role: "Colour Specialist", focus: "Balayage, lived-in blonde and toning." },
            { name: "Priya", initials: "P", role: "Skin & Nails", focus: "Facials, brow shaping and gel finishes." },
          ],
        },
        gallery: {
          eyebrow: "The Room",
          title: "Inside the studio",
          lead: "A working room, photographed between appointments. No faces and no products posed as endorsements.",
          items: [
            { src: "/demos/maison-lune/stations.webp", alt: "A row of tan styling chairs and arched gold mirrors along a cream wall.", caption: "The styling floor" },
            { src: "/demos/maison-lune/corner.webp", alt: "A white lounge chair and a round standing mirror in a cream alcove.", caption: "The quiet corner" },
            { src: "/demos/maison-lune/braid.webp", alt: "Fresh cornrow braids seen from behind, mid-style.", caption: "Braiding & texture" },
            { src: "/demos/maison-lune/tools.webp", alt: "Nail scissors, files and wooden sticks laid on a soft grey towel.", caption: "The tools" },
            { src: "/demos/maison-lune/towels.webp", alt: "A stack of rolled white towels warming in sunlight on a wooden bench.", caption: "Fresh from the wash" },
            { src: "/demos/maison-lune/marble.webp", alt: "Two tan styling chairs on a polished marble floor.", caption: "Between appointments" },
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
            { day: "Tue – Fri", time: "9:00 – 18:00" },
            { day: "Saturday", time: "9:00 – 16:00" },
            { day: "Sun – Mon", time: "Closed" },
          ],
          phone: { display: "(555) 018-0142", href: "tel:+15550180142" },
          mapNote: "Illustrative map — not a real location.",
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

