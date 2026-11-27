import type { Metadata, Viewport } from "next";
import { Figtree, IBM_Plex_Mono } from "next/font/google";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { site } from "@/lib/site";
import "./globals.css";

// Figtree for the interface; IBM Plex Mono for times and registration
// numbers, the "printed schedule" detail used across the site.
const sans = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const TITLE ="Himal Health Clinic & Pharmacy in Katunje, Bhaktapur";
const DESCRIPTION =
  "Local clinic and pharmacy in Katunje, Bhaktapur, near Srijananagar and Sallaghari.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: "%s | Himal Health Clinic",
  },
  description: DESCRIPTION,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Health",
  keywords: [
    "clinic in Bhaktapur",
    "clinic in Katunje",
    "pharmacy in Bhaktapur",
    "pharmacy in Katunje",
    "doctor near Sallaghari",
    "clinic near Srijananagar",
    "health clinic Suryabinayak",
    "medical store Katunje",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "Himal Health Clinic & Pharmacy in Katunje, Bhaktapur",
    description:
      "Clinic services and in-house pharmacy support near Srijananagar and Sallaghari, Bhaktapur.",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — clinic and pharmacy in Katunje, Bhaktapur`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: DESCRIPTION,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // `format-detection` off: Safari otherwise rewrites the NMC registration
  // numbers on the doctors page into phone links.
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/icon.png",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1b3a5f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions (Grammarly, ColorZilla, …)
    // inject attributes on <html>/<body> before hydration. This only ignores
    // attribute mismatches on these two elements, not their children.
    <html
      lang={site.language}
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
