import { Schibsted_Grotesk, Newsreader, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE } from "@/data/site";
import { JsonLd, studioGraph } from "@/lib/seo";

const sans = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const serif = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["italic", "normal"],
  axes: ["opsz"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Design Next | Web Design & Development Studio in Mumbai";
const DESCRIPTION =
  "Custom website design and Next.js development from Mumbai. Design Next builds fast, distinctive, SEO-ready websites for architects, interior designers, artists and premium brands in India and worldwide. See your homepage free before you pay.";

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
    "web design company in Mumbai",
    "website design agency Mumbai",
    "website development company Mumbai",
    "custom website design India",
    "Next.js development agency",
    "Next.js developer Mumbai",
    "luxury website design",
    "website design for architects",
    "website design for interior designers",
    "portfolio website for artists",
    "website redesign",
    "fast SEO-friendly website",
    "AI website builder alternative",
    "Wix alternative custom website",
    "hire web designer",
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
  icons: {
    icon: "https://res.cloudinary.com/dfpxvbkwt/image/upload/v1782369682/dsnxticon_rxjq5i.png",
    apple: "https://res.cloudinary.com/dfpxvbkwt/image/upload/v1782369682/dsnxticon_rxjq5i.png",
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Mumbai",
    "geo.position": "19.0760;72.8777",
    ICBM: "19.0760, 72.8777",
  },
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
      </body>
    </html>
  );
}
