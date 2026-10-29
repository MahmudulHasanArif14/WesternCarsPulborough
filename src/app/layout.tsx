import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { MobileContactBar, SiteFooter } from "@/components/site-footer";
import { business } from "@/lib/business";
import { organizationSchema } from "@/lib/schema";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: `${business.name} | ${business.tagline}`,
    template: `%s | ${business.name}`,
  },
  description: `Licensed taxi and private hire in ${business.area}. Fixed-price airport transfers, corporate accounts, wheelchair accessible vehicles, weddings and executive travel — ${business.hours}. Call ${business.phone}.`,
  keywords: [
    "taxi West Sussex",
    "taxi Pulborough",
    "taxi Horsham",
    "taxi Chichester",
    "taxi Worthing",
    "taxi Arundel",
    "Gatwick airport transfer West Sussex",
    "Heathrow transfer West Sussex",
    "wheelchair accessible taxi West Sussex",
    "minibus hire West Sussex",
    "executive chauffeur West Sussex",
    "wedding car hire West Sussex",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: business.url,
    siteName: business.name,
    title: `${business.name} | ${business.tagline}`,
    description: `Fixed-price airport transfers, local taxis and executive travel across ${business.area}. Available ${business.hours}.`,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101F3F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${raleway.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-[76px] lg:pb-0">
        <script
          type="application/ld+json"
          // Static, build-time JSON from our own data — no user input.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent-bright focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-surface"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileContactBar />
      </body>
    </html>
  );
}
