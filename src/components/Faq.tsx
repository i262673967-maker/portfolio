import { faqItems, site } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

/* Questions and answers accordion.

   Deliberately a native <details>/<summary> pair rather than a JavaScript
   disclosure widget: the page's first paint has to work with scripts disabled
   (see the no-client-JS rule in this folder), and the browser gives keyboard,
   focus and the expanded state for free. Zero client JS, zero ARIA to get wrong.

   The FAQPage JSON-LD below is generated from the same faqItems array, so the
   structured data can never describe a question the page doesn't actually show.
   Note for expectations: Google now limits FAQ rich results to established
   government and health-publisher sites, so this markup earns no dropdown under
   a search result. It is here because it describes the page accurately, not
   because it will change the listing. */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      {/* Sanitise "<" so a quote or angle bracket in an answer can never break
          out of the script element. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            copy={`Short answers, no jargon. If something isn't covered here, ask me directly at ${site.email}.`}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {faqItems.map((item, i) => (
            <Reveal key={item.q} delay={(i % 2) * 0.06}>
              <details className="group h-full rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:border-line-strong open:border-line-strong">
                <summary className="-mx-1 flex min-h-11 cursor-pointer list-none items-start gap-3 rounded-lg pr-1 text-[15px] font-semibold text-offwhite marker:content-none">
                  <span
                    aria-hidden
                    className="mt-1 font-mono text-[11px] leading-none text-accent transition-transform group-open:rotate-90"
                  >
                    ▸
                  </span>
                  {item.q}
                </summary>
                <p className="mt-3 pl-6 text-[14px] leading-relaxed text-muted">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
