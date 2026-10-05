import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Reveal, SectionHeading } from "./ui";
import { featuredProjects } from "@/lib/data";

export default function FeaturedWork() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Concept Projects"
            title="Work that looks like the real thing."
            copy="A sample of the concept projects. Each is a fully-designed website for a fictional local business — clearly labelled as a concept, never presented as a live client."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} i={i} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-offwhite transition-colors hover:bg-white/5"
          >
            View all projects
            <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
