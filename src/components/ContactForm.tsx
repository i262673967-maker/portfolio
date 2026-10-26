"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Send, Mail, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { cta, formEndpoint, site, web3formsAccessKey } from "@/lib/data";

/* No `outline-none` here: the global :focus-visible ring in globals.css is the
   keyboard indicator, and a 2px navy border clears 3:1 on the white field, so
   the empty input is visible without colour-only cues (WCAG 1.4.11). */
const input =
  "w-full rounded-xl border-2 border-line bg-card px-4 py-3 text-[14px] text-ink placeholder:text-ink-muted transition-colors focus:border-brand";
const label = "mb-1.5 block font-mono text-[12px] uppercase tracking-widest text-ink-muted";
const err = "mt-1.5 text-[12px] font-semibold text-ink";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = { website?: string; email?: string };

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

/* The error block renders this sentence followed by the mailto link, so the
   address is the link and it reads as one line ending in the address. Raw service
   replies never reach a visitor — they go to console.error. */
const SEND_FAILED = "Sorry, your request didn't send. Please try again, or email me directly at";

/* A field's own label, so the summary banner can name the field instead of
   pointing vaguely at "the highlighted field". */
const FIELD_LABEL: Record<keyof FieldErrors, string> = {
  website: "Website URL",
  email: "Email",
};

/* focus() on its own leaves the field at the bottom edge of a phone screen and
   pushes the message underneath it off-screen, so the visitor is told a field is
   wrong with no way to read why. Scrolling to the middle keeps the message visible. */
function revealField(el: HTMLElement | null) {
  if (!el) return;
  el.focus({ preventScroll: true });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
}

export default function ContactForm() {
  const uid = useId();
  const fid = (k: string) => `${uid}-${k}`;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [noSite, setNoSite] = useState(false);
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

  /* A screen reader only hears that something went wrong if we say so out loud,
     so the first invalid field takes focus and the summary is a live region. */
  const websiteRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
  }, [status]);

  const invalidFields = (Object.keys(fieldErrors) as (keyof FieldErrors)[]).filter((k) => fieldErrors[k]);
  const invalidCount = invalidFields.length;

  /* Only two things are ever required: where to look, and where to reply.
     "No website yet" is a valid answer — the note carries the business instead. */
  function validate(): { website: string; errors: FieldErrors } {
    const next: FieldErrors = {};
    const website = noSite ? "" : (normaliseWebsite(form.website) ?? "");
    if (!noSite && !website)
      next.website = "Enter your website link, for example yourbusiness.com — or tick the box below if you don't have one yet.";
    if (!EMAIL.test(form.email.trim())) next.email = "Enter a valid email so I can send the audit";
    return { website, errors: next };
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { website, errors } = validate();
    setFieldErrors(errors);
    if (errors.website) {
      revealField(websiteRef.current);
      return;
    }
    if (errors.email) {
      revealField(emailRef.current);
      return;
    }
    if (keyMissing) {
      setStatus("error");
      setErrorMsg(
        "This form isn't connected yet, so nothing was sent. Please email me directly with your link — I'll get back to you."
      );
      return;
    }
    setStatus("sending");
    const domain = website.replace(/^https?:\/\//i, "").split("/")[0];
    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          subject: `Free website audit request — ${domain || "no website yet"}`,
          from_name: form.name.trim() || form.email.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          website: website || "No website yet",
          note: form.note.trim() || "—",
          botcheck: form.botcheck,
        }),
      });
      /* A reply that isn't JSON means something between here and the service answered
         instead of the service (a captive portal or a blocked request). Every branch
         keeps the visitor-facing sentence generic and logs the detail. */
      const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      if (data?.success) {
        setStatus("sent");
        return;
      }
      console.error(
        "Audit form send failed — HTTP status and raw response:",
        res.status,
        data ?? "unreadable response body"
      );
      setStatus("error");
      setErrorMsg(SEND_FAILED);
    } catch (err) {
      console.error("Audit form request failed — the fetch never reached the service:", err);
      setStatus("error");
      setErrorMsg(SEND_FAILED);
    }
  }

  return (
    <section id="contact" className="border-t-2 border-line py-20 sm:py-28">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Left: reassurance + direct contact */}
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Free Website Audit"
              title="Request your free audit"
              copy="Send me your website link — or your business, if you don't have a site yet — and the email to reply to. I'll tell you exactly what's holding it back. Free, no commitment."
            />
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border-2 border-brand bg-brand/[0.07] p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Search className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-ink">{site.auditTitle}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink-muted">{site.auditOffer}</p>
                </div>
              </div>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-xl border-2 border-line bg-card p-4 transition-colors hover:border-brand"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="text-[14px] text-ink">{site.email}</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={0.08}>
          <div className="card-pop relative p-6 sm:p-8">
            {status === "sent" ? (
              <div
                ref={sentRef}
                role="status"
                tabIndex={-1}
                className="pop-in flex min-h-[360px] flex-col items-center justify-center text-center"
              >
                <CheckCircle2 className="h-12 w-12 text-brand" />
                <h3 className="mt-4 font-display text-xl font-bold text-ink">Audit request received</h3>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink-muted">
                  Thanks.{" "}
                  {noSite
                    ? "I'll put together what your business needs a website to do"
                    : "I'll review your website and identify the biggest areas that could be improved"}
                  , then reply to {form.email.trim() || "your email"}.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setFieldErrors({});
                    setNoSite(false);
                    setForm({ website: "", name: "", email: "", note: "", botcheck: "" });
                  }}
                  className="btn-pop mt-6 bg-paper px-5 py-2.5 text-sm font-semibold text-ink"
                >
                  Request another audit
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-4">
                {invalidCount > 0 && (
                  <p
                    role="alert"
                    className="rounded-xl border-2 border-line bg-ink/[0.05] px-4 py-3 text-[13px] leading-relaxed text-ink"
                  >
                    Please check the{" "}
                    {invalidFields.map((k) => FIELD_LABEL[k]).join(" and ")}{" "}
                    {invalidCount === 1 ? "field" : "fields"} below, then send it again.
                  </p>
                )}

                <div>
                  <label htmlFor={fid("website")} className={label}>
                    Website URL
                  </label>
                  {noSite ? (
                    <p className="rounded-xl border-2 border-dashed border-line px-4 py-3 text-[13px] leading-relaxed text-ink-muted">
                      No website yet — that&apos;s fine. Tell me about the business below instead.
                    </p>
                  ) : (
                    <input
                      id={fid("website")}
                      ref={websiteRef}
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
                  )}
                  {fieldErrors.website && (
                    <p id={fid("website-err")} className={err}>
                      {fieldErrors.website}
                    </p>
                  )}
                  <label
                    htmlFor={fid("nosite")}
                    className="mt-2 flex min-h-11 cursor-pointer select-none items-center gap-2.5 text-[13px] text-ink-muted hover:text-ink"
                  >
                    <input
                      id={fid("nosite")}
                      type="checkbox"
                      name="nosite"
                      checked={noSite}
                      onChange={(e) => {
                        setNoSite(e.target.checked);
                        setFieldErrors((fe) => ({ ...fe, website: undefined }));
                      }}
                      className="h-6 w-6 shrink-0 rounded border-2 border-line bg-card accent-brand"
                    />
                    I don&apos;t have a website yet
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={fid("name")} className={label}>
                      Name (optional)
                    </label>
                    <input
                      id={fid("name")}
                      ref={nameRef}
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={set("name")}
                      className={input}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor={fid("email")} className={label}>
                      Email
                    </label>
                    <input
                      id={fid("email")}
                      ref={emailRef}
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
                    {noSite ? "About your business (optional)" : "Anything I should know? (optional)"}
                  </label>
                  <textarea
                    id={fid("note")}
                    name="note"
                    rows={3}
                    value={form.note}
                    onChange={set("note")}
                    className={input}
                    placeholder={
                      noSite
                        ? "What your business does, and what you'd like a website to do for it…"
                        : "What you want the website to do for your business…"
                    }
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
                  <div
                    role="alert"
                    className="nudge-in flex items-start gap-2.5 rounded-xl border-2 border-line bg-ink/[0.05] p-4"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                    <p className="text-[13px] leading-relaxed text-ink">
                      {errorMsg}{" "}
                      <a
                        href={`mailto:${site.email}?subject=${encodeURIComponent("Free website audit request")}`}
                        className="font-semibold text-brand underline decoration-brand/50 underline-offset-4 hover:decoration-brand"
                      >
                        {site.email}
                      </a>
                      .
                    </p>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    aria-busy={status === "sending" ? true : undefined}
                    className="btn-pop group inline-flex w-full items-center justify-center gap-2 bg-brand px-6 py-3.5 text-[15px] font-semibold text-on-brand disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : cta.primary}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="mt-3 text-center text-[12px] leading-relaxed text-ink-muted">
                    No commitment and no obligation — just an honest read, whether
                    you have a website or not.
                  </p>
                  {/* Consent sits next to the button it applies to. A Next Link, not
                      a raw anchor: this is a client component, and a plain <a> would
                      hard-reload the page and lose a half-filled form. min-h-11 keeps
                      the tap target reachable. */}
                  <p className="mt-1.5 text-center text-[12px] leading-relaxed text-ink-muted">
                    By submitting, you agree to the{" "}
                    <Link
                      href="/privacy"
                      className="inline-flex min-h-11 items-center text-brand underline decoration-brand/50 underline-offset-4 hover:decoration-brand"
                    >
                      Privacy Policy
                    </Link>
                    .
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
