import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  tab: "Privacy Policy",
  share: `Privacy Policy · ${site.brand}`,
  description:
    "What the free website audit form collects, where it goes, how long it is kept, and how to ask for it to be deleted.",
  path: "/privacy",
});

/* Every statement here is backed by what the code actually does: the fields in
   src/components/ContactForm.tsx and the payload it posts to Web3Forms. No
   analytics provider and no cookie is set by this site today, so that paragraph
   is written conditionally rather than as a claim about a tool that isn't
   installed. */

const collected = [
  ["Your website address", "the link you want audited, or a note that you don't have a site yet"],
  ["Your name", "so the reply is addressed to a person"],
  ["Your email address", "the only way the answer gets back to you"],
  ["Anything you add in the note field", "optional — context about the business or the problem"],
];

export default function PrivacyPage() {
  return (
    <div className="pb-24">
      <div className="studio-bg border-b border-line pt-28 pb-12">
        <div className="container-shell">
          <p className="eyebrow">Legal</p>
          <h1 className="heading-display mt-3 text-4xl sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            The short version: this site has one form, it collects four things, and they exist so I can
            answer you. Nothing is sold, nothing is shared for advertising, and there is no newsletter.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            Last updated: 7 October 2026
          </p>
        </div>
      </div>

      <article className="container-shell max-w-3xl py-14">
        <section>
          <h2 className="font-display text-xl font-semibold tracking-tight text-offwhite">
            What the free audit form collects
          </h2>
          <ul className="mt-4 space-y-3">
            {collected.map(([field, why]) => (
              <li key={field} className="rounded-xl border border-line bg-surface p-4">
                <p className="text-[14px] font-semibold text-offwhite">{field}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{why}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            The form also carries a hidden tick-box that stays empty unless an automated script fills it in.
            It exists only to catch spam submissions.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold tracking-tight text-offwhite">
            Where it goes and who processes it
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            Submissions are sent through <strong className="text-offwhite">Web3Forms</strong>, the form
            service this site uses, which delivers them as email to{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              {site.email}
            </a>
            . Web3Forms acts as a service provider for that delivery step: it processes your submission to
            get it to me, and it rate-limits spam. I don&apos;t pass your details to anyone else, and I
            don&apos;t use them for anything other than replying to you and, if we work together, running
            the project.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold tracking-tight text-offwhite">
            Cookies and analytics
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            This site does not set advertising, tracking or profiling cookies, and as it stands it installs
            no third-party analytics script — which is also why there is no cookie banner asking you to
            accept anything. If a privacy-respecting analytics tool is ever added, this page is updated
            before it goes live, and the traffic it measures stays aggregate rather than personal.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold tracking-tight text-offwhite">
            How long your details are kept
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            Your details are kept only as long as needed to reply to you and deliver the work, and deleted
            on request.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold tracking-tight text-offwhite">
            Seeing, correcting or deleting what you sent
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            You can ask to see, correct or delete the details you have sent me. Write to{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              {site.email}
            </a>{" "}
            and say which enquiry you mean; no account or reference number is needed.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold tracking-tight text-offwhite">
            If anything here changes
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            This page is the current statement, and the date at the top moves whenever it is rewritten.
          </p>
        </section>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-base-2 p-6 sm:flex-row sm:items-center sm:p-7">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-offwhite">
              Still have a question about your data?
            </h2>
            <p className="mt-1.5 text-[14px] text-muted">Email is often faster than a form.</p>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-[14px] font-semibold text-offwhite transition-colors hover:border-line-strong hover:text-accent"
          >
            <Mail className="h-4 w-4 text-accent" />
            {site.email}
          </a>
        </div>

        <p className="mt-10 text-[13px] text-faint">
          <Link
            href="/#contact"
            className="inline-flex min-h-11 items-center gap-1.5 text-accent underline-offset-4 hover:underline"
          >
            Back to the free audit form
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </article>
    </div>
  );
}
