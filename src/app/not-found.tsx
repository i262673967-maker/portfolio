import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";
import SiteChrome from "@/components/SiteChrome";
import { cta, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/* Root boundary, so it also catches an unknown /work or /demos slug — those
   call notFound() from pages that normally live inside the (site) layout. */
export default function NotFound() {
  return (
    <SiteChrome>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-28 pb-16">
        <div className="container-shell relative">
          <p className="eyebrow">404</p>
          <h1 className="heading-display mt-4 text-[2.25rem] leading-[1.05] text-ink sm:text-5xl">
            That page isn&rsquo;t here.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-muted sm:text-[17px]">
            The link may be out of date, or the page moved. Nothing is lost — the work and the way to
            start a project are both one click away.
          </p>

          <h2 className="eyebrow mt-10">Where to next</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="group inline-flex min-h-11 items-center justify-center gap-2 btn-pop bg-brand px-6 py-3.5 text-[15px] font-semibold text-on-brand"
            >
              <Search className="h-4 w-4" /> Browse concept projects
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 btn-pop bg-paper px-6 py-3.5 text-[15px] font-semibold text-ink"
            >
              <Home className="h-4 w-4" /> {site.brand} home
            </Link>
            <Link
              href="/#contact"
              className="group inline-flex min-h-11 items-center justify-center gap-2 px-2 py-3.5 text-[15px] font-semibold text-brand transition-colors hover:underline"
            >
              {cta.nav}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
