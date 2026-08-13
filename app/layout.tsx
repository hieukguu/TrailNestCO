import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/data";
import "./globals.css";

const display = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Independent Gear Reviews, Comparisons and Buying Guides`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      // Raster fallback for browsers that ignore SVG favicons
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.company,
    url: site.url,
    email: site.email,
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: "17224 S. Figueroa Street, #E8917",
      addressLocality: "Gardena",
      addressRegion: "CA",
      postalCode: "90248",
      addressCountry: "US",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ember-500 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

      </body>
    </html>
  );
}
