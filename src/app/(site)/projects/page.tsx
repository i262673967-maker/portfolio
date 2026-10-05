import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import ProjectGallery from "@/components/ProjectGallery";
import { cta, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Concept Projects",
  description:
    "Fully-designed concept websites for local businesses — renovation, plumbing, electrical, dining and retail. Each has a case study with its objective, strategy and live preview.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="pb-24">
      <div className="studio-bg border-b border-line pt-28 pb-12">
        <div className="container-shell">
          <p className="eyebrow">Portfolio</p>
          <h1 className="heading-display mt-3 text-4xl sm:text-5xl">Concept projects</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            {projects.length} fully-designed websites for fictional local businesses, each with its own
            palette, structure and copy. Every card opens a case study: the objective, the strategy, and a
            preview at desktop and mobile widths. They are concepts, not client work — no business here is
            real and no results are claimed.
          </p>
        </div>
      </div>

      <section aria-label="All concept projects" className="container-shell py-14">
        <ProjectGallery />
      </section>

      <section className="container-shell">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-base-2 p-6 sm:flex-row sm:items-center sm:p-7">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-offwhite">
              See one the way a customer would
            </h2>
            <p className="mt-1.5 text-[14px] text-muted">
              The live preview mode on the homepage reflows a concept across desktop, tablet and mobile.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/#websites"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-offwhite transition-colors hover:bg-white/5"
            >
              <ExternalLink className="h-4 w-4" /> Live preview
            </Link>
            <Link
              href="/#contact"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-2"
            >
              {cta.nav}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
