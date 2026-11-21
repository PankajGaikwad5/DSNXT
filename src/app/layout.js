import { Schibsted_Grotesk, Newsreader, Geist_Mono } from "next/font/google";
import Analytics from "@/components/Analytics";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE } from "@/data/site";
import { JsonLd, studioGraph } from "@/lib/seo";

const sans = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

// Only ever used as the italic 500 accent (.serif), so load just that one face.
const serif = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: "italic",
  weight: "500",
  display: "swap",
});

// Small labels only; not preloaded so it doesn't compete with the hero's fonts.
const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const TITLE = "Design Next | Custom Web Design & Shopify Studio, Worldwide";
const DESCRIPTION =
  "Design Next is an independent custom web design studio: websites, Shopify stores, brand direction and SEO for brands and small businesses in the UK, US, the Gulf, Australia and India. Hire us from anywhere and see your new homepage free before you pay.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s | Design Next" },
  description: DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Web design and development",
  keywords: [
    "web design studio",
    "custom web design agency",
    "custom web design services",
    "hire a web design agency",
    "best web design agency for small business",
    "website design for small businesses",
    "brand and website design",
    "creative studio",
    "UI/UX design agency",
    "ecommerce website design",
    "hire a Shopify expert",
    "Shopify designer",
    "custom website design",
    "Next.js development agency",
    "Shopify developer",
    "web design UK",
    "web design USA",
    "web design Australia",
    "luxury website design",
    "website design for architects",
    "website design for interior designers",
    "portfolio website for artists",
    "website redesign",
    "fast SEO-friendly website",
    "AI website builder alternative",
    "Wix alternative custom website",
    "hire web designer",
    "website development company India",
    "web design Qatar",
    "web design Dubai",
    "Design Next",
    "DSNXT",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: { google: "_XiToG1usLWtgAx8lTgOiZclAnZxWPwfeYOjk_yLsNM" },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={studioGraph()} />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics gaId="G-EEV7YN45PX" />
      </body>
    </html>
  );
}
