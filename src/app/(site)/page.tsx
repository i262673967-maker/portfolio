import type { Metadata } from "next";
import Hero from "@/components/Hero";
import {
  About,
  BeforeAfter,
  FinalCta,
  Problems,
  Process,
  Services,
  TrustStrip,
  WhyWork,
} from "@/components/Marketing";
import FreeAudit from "@/components/FreeAudit";
import Showcase from "@/components/Showcase";
import { CarePlans, Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import ContactForm from "@/components/ContactForm";
import { pageMeta } from "@/lib/metadata";
import { brandPitch, homeDescription, site } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  tab: { absolute: `${site.brand} — ${brandPitch}` },
  share: `${site.brand} — ${brandPitch}`,
  description: homeDescription,
  path: "/",
});

/* Funnel order: what's wrong → the free look → the work that proves it → what it
   costs and how to keep it running → the questions that stop people asking → how
   it's built → who you're dealing with → the one ask. */
export default function HomePage() {
  return (
    <div>
      <Hero />
      <TrustStrip />
      <Problems />
      <FreeAudit />
      <Showcase />
      <BeforeAfter />
      <Services />
      <Pricing />
      <CarePlans />
      <Faq />
      <Process />
      <WhyWork />
      <About />
      <FinalCta />
      <ContactForm />
    </div>
  );
}
