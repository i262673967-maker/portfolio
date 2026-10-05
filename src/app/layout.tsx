import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/ui";
import { site, siteUrl } from "@/lib/data";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.brand} — Websites for Local Businesses`,
    template: `%s · ${site.brand}`,
  },
  description: site.supportingMessage,
  openGraph: {
    title: `${site.brand} — Websites for Local Businesses`,
    description: site.supportingMessage,
    siteName: site.brand,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} — Websites for Local Businesses`,
    description: site.supportingMessage,
  },
};

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-base text-offwhite">
        <MotionProvider>{props.children}</MotionProvider>
      </body>
    </html>
  );
}
