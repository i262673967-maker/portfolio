import type { Metadata } from "next";
import Hero from "@/components/Hero";
import {
  About,
  BeforeAfter,
  FinalCta,
  Problems,
  Process,
  Services,
  Standards,
  TrustStrip,
  WhyWork,
} from "@/components/Marketing";
import FeaturedWork from "@/components/FeaturedWork";
import FreeAudit from "@/components/FreeAudit";
import Showcase from "@/components/Showcase";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: `${site.brand} — Websites for Local Businesses` },
  description: site.supportingMessage,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div>
      <Hero />
      <TrustStrip />
      <FeaturedWork />
      <Problems />
      <FreeAudit />
      <Showcase />
      <BeforeAfter />
      <Services />
      <Process />
      <Standards />
      <About />
      <WhyWork />
      <FinalCta />
      <ContactForm />
    </div>
  );
}
