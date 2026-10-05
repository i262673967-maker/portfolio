"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { cta, formEndpoint, site, web3formsAccessKey } from "@/lib/data";

const input =
  "w-full rounded-xl border border-line bg-base-2 px-4 py-3 text-[14px] text-offwhite placeholder:text-faint outline-none transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/15";
const label = "mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted";
const err = "mt-1.5 text-[12px] text-warm";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = { website?: string; name?: string; email?: string };

/* Accepts what a business owner actually types — "joesplumbing.com", "www.joe.com/Contact",
   or a full URL — and normalises it to something verifiable. */
function normaliseWebsite(raw: string): string | null {
  const value = raw.trim().replace(/\s+/g, "");
  if (!value) return null;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  let url: URL;
  try {
    url = new URL(withProtocol);
  } catch {
    return null;
  }
  if (!url.hostname.includes(".") || url.hostname.endsWith(".")) return null;
  return url.toString();
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const uid = useId();
  const fid = (k: string) => `${uid}-${k}`;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState({
    website: "",
    name: "",
    email: "",
    note: "",
    botcheck: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      setFieldErrors((fe) => ({ ...fe, [k]: undefined }));
    };

  /* Until a real Web3Forms access key is set in src/lib/data.ts, submissions
     are not sent — the visitor gets an honest error with a mailto fallback. */
  const keyMissing = web3formsAccessKey.trim().toUpperCase().startsWith("TODO");

  function validate(): { website: string } | null {
    const next: FieldErrors = {};
    const website = normaliseWebsite(form.website);
    if (!website) next.website = "Enter your website link, for example yourbusiness.com";
    if (!form.name.trim()) next.name = "Please add your name so I know who to reply to";
    if (!EMAIL.test(form.email.trim())) next.email = "Enter a valid email so I can send the audit";
    setFieldErrors(next);
    if (website && Object.keys(next).length === 0) return { website };
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = validate();
    if (!parsed) return;
    if (keyMissing) {
      setStatus("error");
      setErrorMsg(
        "This form isn't connected yet, so nothing was sent. Please email me directly with your link — I'll get back to you."
      );
      return;
    }
    setStatus("sending");
    const domain = parsed.website.replace(/^https?:\/\//i, "").split("/")[0];
    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          subject: `Free website audit request — ${domain}`,
          from_name: form.name.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          website: parsed.website,
          note: form.note.trim() || "—",
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
              eyebrow="Free Website Audit"
              title="Request your free audit"
              copy="Send me your link and your best contact. I'll review your website and tell you exactly what's holding it back — free, no commitment."
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
                className="flex min-h-[360px] flex-col items-center justify-center text-center"
              >
                <CheckCircle2 className="h-12 w-12 text-accent" />
                <h3 className="mt-4 font-display text-xl font-semibold">Audit request received</h3>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
                  Thanks. I&apos;ll review your website and identify the biggest areas that could be
                  improved, then reply to {form.email.trim() || "your email"}.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ website: "", name: "", email: "", note: "", botcheck: "" });
                  }}
                  className="mt-6 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-offwhite transition-colors hover:bg-white/5"
                >
                  Request another audit
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-4">
                <div>
                  <label htmlFor={fid("website")} className={label}>
                    Website URL
                  </label>
                  <input
                    id={fid("website")}
                    required
                    type="url"
                    inputMode="url"
                    name="website"
                    autoComplete="url"
                    value={form.website}
                    onChange={set("website")}
                    aria-invalid={fieldErrors.website ? true : undefined}
                    aria-describedby={fieldErrors.website ? fid("website-err") : undefined}
                    className={input}
                    placeholder="yourbusiness.com"
                  />
                  {fieldErrors.website && (
                    <p id={fid("website-err")} className={err}>
                      {fieldErrors.website}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={fid("name")} className={label}>
                      Name
                    </label>
                    <input
                      id={fid("name")}
                      required
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={set("name")}
                      aria-invalid={fieldErrors.name ? true : undefined}
                      aria-describedby={fieldErrors.name ? fid("name-err") : undefined}
                      className={input}
                      placeholder="Your name"
                    />
                    {fieldErrors.name && (
                      <p id={fid("name-err")} className={err}>
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor={fid("email")} className={label}>
                      Email
                    </label>
                    <input
                      id={fid("email")}
                      required
                      type="email"
                      inputMode="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={set("email")}
                      aria-invalid={fieldErrors.email ? true : undefined}
                      aria-describedby={fieldErrors.email ? fid("email-err") : undefined}
                      className={input}
                      placeholder="you@company.com"
                    />
                    {fieldErrors.email && (
                      <p id={fid("email-err")} className={err}>
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor={fid("note")} className={label}>
                    Anything I should know? (optional)
                  </label>
                  <textarea
                    id={fid("note")}
                    name="note"
                    rows={3}
                    value={form.note}
                    onChange={set("note")}
                    className={input}
                    placeholder="What you want the website to do for your business…"
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
                    className="flex items-start gap-2.5 rounded-xl border border-warm/40 bg-warm/[0.08] p-4"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warm" />
                    <p className="text-[13px] leading-relaxed text-offwhite/90">
                      {errorMsg}{" "}
                      <a
                        href={`mailto:${site.email}?subject=${encodeURIComponent("Free website audit request")}`}
                        className="font-semibold text-accent underline-offset-4 hover:underline"
                      >
                        {site.email}
                      </a>
                    </p>
                  </motion.div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    aria-busy={status === "sending" ? true : undefined}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[15px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(56,189,248,0.6)] disabled:translate-y-0 disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : cta.primary}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="mt-3 text-center text-[12px] leading-relaxed text-faint">
                    No commitment and no obligation — you just get an honest look at your website.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
