import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { cta, site } from "@/lib/data";

const cols = [
  { title: "Navigate", links: [["Projects", "/projects"], ["Free Audit", "/#audit"], ["Services", "/#services"], ["Process", "/#process"]] },
  { title: "Studio", links: [["About", "/#about"], ["Contact", "/#contact"], [site.auditTitle, "/#audit"]] },
];

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-line bg-base-2">
      <div className="container-shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt={`${site.brand} logo`}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-contain"
              />
              <span className="font-display text-base font-semibold tracking-tight">{site.brand}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.coreMessage}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-accent underline-offset-4 hover:underline"
            >
              <Mail className="h-4 w-4" />
              {site.email}
            </a>
            <div>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-offwhite"
              >
                {cta.nav}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-muted transition-colors hover:text-offwhite">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.brand}. All rights reserved.</span>
          <span className="font-mono uppercase tracking-widest">Concept projects shown are fictional · not live clients</span>
        </div>
      </div>
    </footer>
  );
}
