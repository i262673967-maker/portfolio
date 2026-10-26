import type { Metadata } from "next";
import Hero from "@/components/Hero";
import {
  About,
  FinalCta,
  Problems,
  Process,
  Services,
  TradeMarquee,
  WhyWorks,
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

/* M2 order with a colour-blocked rhythm (navy → blue → paper → paper-2 → paper →
   navy → paper → yellow): who I build for → what's wrong → the free look → the
   work → why it works → the services → what it costs → how it runs → how it's
   built → the questions → who you're dealing with → the one ask. */
export default function HomePage() {
  return (
    <div>
      <Hero />
      <TradeMarquee />
      <Problems />
      <FreeAudit />
      <Showcase />
      <WhyWorks />
      <Services />
      <Pricing />
      <CarePlans />
      <Process />
      <Faq />
      <About />
      <FinalCta />
      <ContactForm />
    </div>
  );
}
