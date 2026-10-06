import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { pageMeta } from "@/lib/metadata";
import { homeDescription, projects, site } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  /* An unmatched slug never renders (the page calls notFound), but its metadata
     still has to be valid, so it falls back to the brand copy. */
  const name = project?.name ?? site.brand;
  return pageMeta({
    tab: project ? `${project.name} — Concept Project` : "Concept Project",
    share: `${name} — Concept Project · ${site.brand}`,
    description: project?.summary ?? homeDescription,
    path: `/work/${slug}`,
  });
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const project = projects[i];

  return (
    <CaseStudy
      project={project}
      prev={i > 0 ? projects[i - 1] : undefined}
      next={i < projects.length - 1 ? projects[i + 1] : undefined}
    />
  );
}
