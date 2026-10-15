import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Demo } from "@/demos";
import { DemoBackProvider } from "@/demos/_shared";
import { pageMeta } from "@/lib/metadata";
import { homeDescription, projects, site } from "@/lib/data";

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
      {/* The route used to open with a fixed host bar — a back arrow, a
         "Concept Project" pill and an audit button — stacked above the concept's
         own header, which repeated the badge and cost a quarter of a phone
         screen. The demo now starts at its own first pixel. The way back lives
         in the concept's footer instead, handed down through context so no demo
         file has to know about this route; a preview inside a device frame gets
         no provider and therefore shows no link. */}
      <main>
        <DemoBackProvider value={{ href: "/projects", label: "← All concept projects" }}>
          <Demo demo={project.demo} project={project} preview={false} />
        </DemoBackProvider>
      </main>
    </div>
  );
}
