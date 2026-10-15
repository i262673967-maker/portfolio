import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Demo } from "@/demos";
import { pageMeta } from "@/lib/metadata";
import { cta, homeDescription, projects, site } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  const name = project?.name ?? site.brand;
  return {
    ...pageMeta({
      tab: project ? `${project.name} — Concept Demo` : "Concept Demo",
      share: `${name} — Concept Demo · ${site.brand}`,
      description: project?.summary ?? homeDescription,
      path: `/demos/${slug}`,
    }),
    /* The full-screen preview is a tool, not a page a prospect should land on
       from search — the /work case study is that. Crawlers still follow its links. */
    robots: { index: false, follow: true },
  };
}

export default async function DemoPage(props: PageProps<"/demos/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-paper">
      {/* Floating control bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-line bg-paper">
        <div className="container-shell flex h-14 items-center justify-between gap-3">
          {/* The label collapses to just the arrow below sm, so the name has to be carried explicitly. */}
          <Link href="/projects" aria-label="All projects" className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 px-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">All projects</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-full border-2 border-line bg-card px-2.5 py-1 font-mono text-[12px] uppercase tracking-widest text-brand">
              Concept Project
            </span>
            <span className="hidden font-display text-sm font-semibold text-ink sm:block">{project.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/work/${project.slug}`} className="hidden min-h-11 items-center rounded-full border-2 border-line bg-card px-3.5 text-[12px] text-ink transition-colors hover:border-brand sm:inline-flex">
              Project Breakdown
            </Link>
            <Link href="/#contact" className="group inline-flex min-h-11 items-center gap-1.5 btn-pop bg-brand px-3.5 text-[12px] font-semibold text-on-brand">
              {cta.nav} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* The demo website, rendered natively (fully responsive) */}
        <div className="pt-14">
          <Demo demo={project.demo} project={project} preview={false} />
        </div>

        {/* End-of-demo CTA */}
        <div className="border-t-2 border-line">
          <div className="container-shell flex flex-col items-center gap-4 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Want a website like this for your business?
              </h2>
              <p className="mt-1 text-sm text-ink-muted">This is a concept project for a fictional business — yours would be built around yours.</p>
            </div>
            <Link href="/#contact" className="group inline-flex min-h-11 shrink-0 items-center gap-2 btn-pop bg-brand px-6 py-3 text-sm font-semibold text-on-brand">
              <Search className="h-4 w-4" /> {cta.primary} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
