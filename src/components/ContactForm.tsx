"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { formEndpoint, site, web3formsAccessKey, websiteNeeds } from "@/lib/data";

const input =
  "w-full rounded-xl border border-line bg-base-2 px-4 py-3 text-[14px] text-offwhite placeholder:text-faint outline-none transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/15";
const label = "mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const uid = useId();
  const fid = (k: string) => `${uid}-${k}`;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    website: "",
    need: websiteNeeds[0],
    details: "",
    botcheck: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  /* Until a real Web3Forms access key is set in src/lib/data.ts, submissions
     are not sent — the visitor gets an honest error with a mailto fallback. */
  const keyMissing = web3formsAccessKey.trim().toUpperCase().startsWith("TODO");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (keyMissing) {
      setStatus("error");
      setErrorMsg(
        "This form isn't connected yet, so nothing was sent. Please email me directly — I'll get back to you with next steps."
      );
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          subject: `New project request — ${form.business || form.name}`,
          from_name: form.name,
          name: form.name,
          business: form.business,
          email: form.email,
          website: form.website || "—",
          need: form.need,
          details: form.details,
          botcheck: form.botcheck,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong sending your request. Please email me directly instead.");
    }
  }

  return (
    <section id="contact" className="border-t border-line bg-base-2 py-20 sm:py-28">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Left: reassurance + direct contact */}
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Request a Quote"
              copy="Tell me about your business and what you need. I'll review the details and get back to you with the next steps."
            />
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/[0.06] p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Search className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-offwhite">{site.auditTitle}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{site.auditOffer}</p>
                </div>
              </div>
              <div className="rounded-xl border border-line bg-surface p-4">
                <p className="text-[14px] font-semibold text-offwhite">{site.quoteOffer}</p>
              </div>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="text-[14px] text-offwhite">{site.email}</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={0.08}>
          <div className="relative rounded-2xl border border-line bg-surface p-6 sm:p-8">
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <CheckCircle2 className="h-12 w-12 text-accent" />
                <h3 className="mt-4 font-display text-xl font-semibold">Request sent</h3>
                <p className="mt-2 max-w-sm text-[14px] text-muted">
                  Thanks — I&apos;ve got your details and I&apos;ll get back to you with next steps.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm((f) => ({ ...f, details: "" }));
                  }}
                  className="mt-6 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-offwhite transition-colors hover:bg-white/5"
                >
                  Send another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={fid("name")} className={label}>Name</label>
                  <input id={fid("name")} required name="name" autoComplete="name" value={form.name} onChange={set("name")} className={input} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor={fid("business")} className={label}>Business Name</label>
                  <input id={fid("business")} name="business" autoComplete="organization" value={form.business} onChange={set("business")} className={input} placeholder="Company Ltd." />
                </div>
                <div>
                  <label htmlFor={fid("email")} className={label}>Email</label>
                  <input id={fid("email")} required type="email" name="email" autoComplete="email" value={form.email} onChange={set("email")} className={input} placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor={fid("website")} className={label}>Business Website (optional)</label>
                  <input id={fid("website")} name="website" autoComplete="url" value={form.website} onChange={set("website")} className={input} placeholder="https://" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={fid("need")} className={label}>What do you need?</label>
                  <select id={fid("need")} name="need" value={form.need} onChange={set("need")} className={input}>
                    {websiteNeeds.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={fid("details")} className={label}>Project details</label>
                  <textarea
                    id={fid("details")}
                    name="details"
                    required
                    rows={5}
                    value={form.details}
                    onChange={set("details")}
                    className={input}
                    placeholder="Tell me about your business, your customers, and what you want the website to do…"
                  />
                </div>

                {/* Honeypot — hidden from humans, catches bots. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  checked={form.botcheck === "yes"}
                  onChange={(e) => setForm((f) => ({ ...f, botcheck: e.target.checked ? "yes" : "" }))}
                  className="hidden"
                  aria-hidden="true"
                />

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-warm/40 bg-warm/[0.08] p-4 sm:col-span-2"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warm" />
                    <p className="text-[13px] leading-relaxed text-offwhite/90">
                      {errorMsg}{" "}
                      <a href={`mailto:${site.email}`} className="font-semibold text-accent underline-offset-4 hover:underline">
                        {site.email}
                      </a>
                    </p>
                  </motion.div>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[15px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(56,189,248,0.6)] disabled:translate-y-0 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send Project Request"}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
