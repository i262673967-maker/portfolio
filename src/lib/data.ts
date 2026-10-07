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

  /* No phone, WhatsApp or location is collected or shown anywhere on this site. */
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
  { label: "Projects", href: "/projects" },
  { label: "Free Audit", href: "/#audit" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Process", href: "/#process" },
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
  | "ecommerce";

/* Content for the local-service demo layout (renovation / plumber / electrician).
   Each fictional business gets its own copy, palette and structure emphasis so
   the demos don't look like one recoloured template. */
export type ServiceDemoContent = {
  logoLetter: string;
  navName: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];
  heroImages: { from: string; to: string; label: string }[];
  servicesTitle: string;
  services: { title: string; body: string }[];
  galleryTitle: string;
  gallery: { title: string; from: string; to: string }[];
  whyTitle: string;
  whyIntro: string;
  whyPoints: string[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
};

export type Project = {
  slug: string;
  index: string; // "01"
  demo: DemoKey;
  name: string;
  businessType: string;
  industry: string;
  category: "Service" | "Trade" | "Hospitality" | "E-commerce";
  summary: string;
  objective: string;
  strategy: string;
  designDirection: string[];
  keySections: string[];
  mobileNotes: string[];
  conversionNotes: string[];
  accent: string; // hex used to tint the case study
  palette: { bg: string; fg: string; accent: string };
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
    accent: "#c8a27a",
    palette: { bg: "#0f0d0b", fg: "#f6f1ea", accent: "#c8a27a" },
    content: {
      logoLetter: "A",
      navName: "Atlas Renovation",
      headline: "Premium Local Service,",
      headlineAccent: "Without The Generic Website.",
      intro:
        "Full-home renovation crafted around how you actually live. Kitchens, bathrooms, and extensions — designed, managed, and finished to a standard you can point to.",
      ctaPrimary: "Book a Consultation →",
      ctaSecondary: "View Projects",
      stats: [
        { value: "Fixed", label: "Transparent quotes" },
        { value: "One", label: "Dedicated project lead" },
      ],
      heroImages: [
        { from: "#b98f63", to: "#6f5137", label: "Kitchen remodel" },
        { from: "#8a9a7b", to: "#4d5a44", label: "Bath" },
        { from: "#c9b79c", to: "#8a7a63", label: "Extension" },
      ],
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
      gallery: [
        { title: "Hillside Kitchen", from: "#b98f63", to: "#5f452e" },
        { title: "Marble Bath", from: "#9aa7ad", to: "#4c585e" },
        { title: "Garden Extension", from: "#8a9a7b", to: "#414f39" },
      ],
      whyTitle: "Why homeowners choose Atlas",
      whyIntro:
        "We treat your home like our own. Clear quotes, honest timelines, and a finish that stands up close.",
      whyPoints: [
        "Fixed, transparent quotes",
        "Dust-controlled worksites",
        "One dedicated project lead",
        "Workmanship guarantee",
      ],
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
    },
  },
  {
    slug: "flowright-plumbing",
    index: "02",
    demo: "plumber",
    name: "FlowRight Plumbing",
    businessType: "Local Trade",
    industry: "Plumbing & Heating",
    category: "Trade",
    summary:
      "An urgent, call-first plumbing site built so a homeowner can book a callout in seconds.",
    objective:
      "Turn a panicked visitor into a booked callout fast — clear prices, clear coverage area, one obvious action.",
    strategy:
      "Emergency-first. Someone searching this has a problem right now, so the page answers three things before anything else: can you help, how fast, what will it cost. Everything after that is reassurance.",
    designDirection: ["Bold", "Urgent", "Call-first", "High-contrast"],
    keySections: ["Hero", "Emergency callouts", "Services", "Prices", "Coverage", "FAQ", "Contact"],
    mobileNotes: [
      "Built for the phone screen first — most callouts are searched on mobile",
      "Booking action stays reachable with one thumb from every section",
      "Prices and coverage shown as stacked blocks rather than a table",
    ],
    conversionNotes: [
      "The booking call to action appears above the fold, mid-page, and again at the end",
      "\"Fixed price before we start\" is the single objection the page is built to answer",
    ],
    accent: "#0b6bcb",
    /* Bright theme: cool white surfaces, deep navy text, professional blue. */
    palette: { bg: "#f4f8fb", fg: "#0f2337", accent: "#0b6bcb" },
    content: {
      logoLetter: "F",
      navName: "FlowRight Plumbing",
      headline: "Blocked, Burst, Or Leaking?",
      headlineAccent: "Fixed Today, Not Next Week.",
      intro:
        "Local plumbers for emergencies, boiler services, and bathroom installs. You get a fixed price before we start, and a van on the road fast.",
      ctaPrimary: "Book a Callout →",
      ctaSecondary: "See Our Prices",
      stats: [
        { value: "24/7", label: "Emergency callouts" },
        { value: "Fixed", label: "Price before we start" },
      ],
      heroImages: [
        { from: "#a9cfee", to: "#3f7bb5", label: "Boiler service" },
        { from: "#dbeaf7", to: "#87b3d8", label: "Bathroom" },
        { from: "#84bade", to: "#2f628f", label: "Leak trace" },
      ],
      servicesTitle: "What we get called for",
      services: [
        { title: "Emergency Plumbing", body: "Bursts, leaks, and no-water callouts, day or night." },
        { title: "Boilers", body: "Servicing, repairs, and full replacements with a clear quote." },
        { title: "Leak Detection", body: "Finding the source without tearing your house apart." },
        { title: "Bathroom Installs", body: "Full refits, or swapping out the bits that are failing." },
        { title: "Drain Unblocking", body: "Sinks, toilets, and outside drains cleared properly." },
        { title: "Landlord Work", body: "Certification and repairs for rental properties." },
      ],
      galleryTitle: "Jobs From This Month",
      gallery: [
        { title: "Boiler swap", from: "#bcd9f0", to: "#4a80b6" },
        { title: "Bathroom refit", from: "#dcecf8", to: "#7cadd6" },
        { title: "Leak trace", from: "#95c6e6", to: "#33688f" },
      ],
      whyTitle: "Why locals call FlowRight",
      whyIntro:
        "We turn up when we say we will, quote before we work, and leave the place cleaner than we found it.",
      whyPoints: [
        "Arrive inside the booked window",
        "No surprise add-ons",
        "Guaranteed workmanship",
        "Tidy, respectful work",
      ],
      faqTitle: "Before you call",
      faqs: [
        {
          q: "How fast can you get here?",
          a: "Emergency jobs are prioritised, but arrival time depends on availability, location, and the current workload. We confirm the expected arrival time when the callout is booked.",
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
      ],
      ctaTitle: "Water won't wait. Neither do we.",
      ctaBody: "Tell us what's wrong and get a fixed price before any work starts.",
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
      "Make a cautious homeowner feel the work is safe, certified, and clearly priced before they enquire.",
    strategy:
      "Safety-clarity. Electrical work makes people nervous, so the page leads with certification and plain-language explanations instead of jargon, and puts the quote request next to every service rather than at the bottom.",
    designDirection: ["Technical", "Sharp", "Safety-led", "Plain-language"],
    keySections: ["Hero", "Services", "Certifications", "Process", "Gallery", "FAQ", "Contact"],
    mobileNotes: [
      "Service cards stack into a single column with full-width tap areas",
      "Quote request usable one-handed while standing in front of a consumer unit",
      "Certification badges stay legible at small widths",
    ],
    conversionNotes: [
      "Quote call to action in the nav, the hero, the service grid, and the closing panel",
      "\"Send a photo of the problem\" lowers the effort needed to make first contact",
    ],
    accent: "#f5b942",
    palette: { bg: "#0d0c0a", fg: "#f6f2e9", accent: "#f5b942" },
    content: {
      logoLetter: "V",
      navName: "VoltWise Electrical",
      headline: "Safe Wiring. Clear Quotes.",
      headlineAccent: "No Mess Left Behind.",
      intro:
        "Domestic and light-commercial electricians. Fault finding, consumer unit upgrades, EV chargers, and full rewires — every job tested and certified.",
      ctaPrimary: "Get a Free Quote →",
      ctaSecondary: "Our Services",
      stats: [
        { value: "Same day", label: "Fault finding" },
        { value: "Certified", label: "Every job tested" },
      ],
      heroImages: [
        { from: "#c08a2a", to: "#4a3410", label: "Consumer unit" },
        { from: "#8f9094", to: "#3b3c40", label: "EV charger" },
        { from: "#d8b469", to: "#6b5325", label: "Rewire" },
      ],
      servicesTitle: "Electrical work we do",
      services: [
        { title: "Fault Finding", body: "Tripping, dead circuits, and burning smells diagnosed properly." },
        { title: "Consumer Units", body: "Modern boards with the right protection for your property." },
        { title: "EV Chargers", body: "Home charging points, installed and certified." },
        { title: "Full Rewires", body: "Planned room by room, with minimal disruption." },
        { title: "Lighting", body: "Indoor, outdoor, and smart lighting that's wired to last." },
        { title: "Commercial Testing", body: "Inspection and testing for shops and small offices." },
      ],
      galleryTitle: "Recent Work",
      gallery: [
        { title: "Consumer unit upgrade", from: "#c08a2a", to: "#4a3410" },
        { title: "EV charger install", from: "#8f9094", to: "#3b3c40" },
        { title: "Kitchen rewire", from: "#d8b469", to: "#6b5325" },
      ],
      whyTitle: "Why people choose VoltWise",
      whyIntro:
        "We explain the problem in plain English, quote it in writing, and leave the cables tidier than we found them.",
      whyPoints: [
        "Written quote before work starts",
        "Certified & insured",
        "Clean, cable-tidy installs",
        "Explained in plain English",
      ],
      faqTitle: "Common questions",
      faqs: [
        {
          q: "Do I actually need a full rewire?",
          a: "Not always. It depends on the age, condition, safety, and existing layout of the wiring. A proper inspection is the best way to determine what needs to be replaced.",
        },
        {
          q: "How long does an EV charger install take?",
          a: "Installation time depends on the property, cable route, charger, and existing electrical setup. The required work can be confirmed after the installation requirements are assessed.",
        },
        {
          q: "Can you work around my hours?",
          a: "Visit times can be discussed around the customer's availability. The actual appointment windows should be confirmed with the business.",
        },
      ],
      ctaTitle: "Something not right with your electrics?",
      ctaBody: "Send a photo of the problem and get a clear, fixed quote back.",
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
    accent: "#b5522f",
    /* Bright theme: ivory/cream surfaces, warm charcoal text, terracotta accent. */
    palette: { bg: "#f8f2e9", fg: "#2f2724", accent: "#b5522f" },
  },
  {
    slug: "maison-lifestyle",
    index: "05",
    demo: "ecommerce",
    name: "Maison Objects",
    businessType: "Local Retail / E-commerce",
    industry: "Premium Lifestyle",
    category: "E-commerce",
    summary:
      "A product-focused storefront with an editorial, premium retail feel.",
    objective:
      "Present a product line as desirable and premium, and drive online purchases.",
    strategy:
      "Editorial credibility. Premium retail sells on presentation, so the layout behaves like a magazine spread — large imagery, restrained type, and a product grid where the price never has to be hunted for.",
    designDirection: ["Editorial", "Luxury retail", "Image-led", "Elegant"],
    keySections: ["Hero", "Featured Products", "Story", "Newsletter"],
    mobileNotes: [
      "Product grid drops from four columns to two so images stay large enough to judge",
      "Hero stacks text above image instead of shrinking them side by side",
      "Bag and search stay in the sticky header at every width",
    ],
    conversionNotes: [
      "Add-to-bag action available on every product card without leaving the grid",
      "Featured collection placed directly under the hero, ahead of the brand story",
      "Shipping threshold announced at the very top to lift basket size",
    ],
    accent: "#d98a5f",
    palette: { bg: "#12100e", fg: "#f7f2ec", accent: "#d98a5f" },
  },
];

/* The homepage previews three concepts; the full set lives on /projects. */
export const featuredProjects = ["atlas-renovation", "flowright-plumbing", "voltwise-electrical"]
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => p !== undefined);

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
    title: "E-commerce Websites",
    body: "A modern storefront for local shops that want to sell online as well as in person.",
    icon: "cart",
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
  payment: "50% to start, 50% before launch, by bank transfer or Payoneer.",
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
    a: "50% to start, 50% before launch. I send an invoice and you pay securely through Payoneer by bank transfer or card. Nothing goes live until final payment is received.",
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

