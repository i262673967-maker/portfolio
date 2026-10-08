import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { brandPitch, homeDescription, site, siteUrl } from "@/lib/data";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

/* Routes that need their own share copy use pageMeta() from src/lib/metadata.ts.
   This is the fallback for everything else (the 404 page, /demos/*). */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.brand} — ${brandPitch}`,
    template: `%s · ${site.brand}`,
  },
  description: homeDescription,
  openGraph: {
    title: `${site.brand} — ${brandPitch}`,
    description: homeDescription,
    siteName: site.brand,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} — ${brandPitch}`,
    description: homeDescription,
  },
};

/* Only facts the site already states publicly: name, URL, email. No address,
   no ratings, no reviews, no founding year — nothing here is invented. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.brand,
  url: siteUrl,
  email: site.email,
  description: homeDescription,
};

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-base text-offwhite">
        {props.children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
