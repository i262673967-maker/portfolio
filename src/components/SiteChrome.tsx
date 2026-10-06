import Navbar from "./Navbar";
import StickyCta from "./StickyCta";
import Footer from "./Footer";

/* The site shell in one place: the (site) layout uses it for every page, and the
   root not-found page uses it so an unmatched URL still gets the nav, the footer
   and the <main> landmark instead of Next's bare default. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-[14px] focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
}
