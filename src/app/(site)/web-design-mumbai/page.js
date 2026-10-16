import LocationPage from "@/components/LocationPage";
import { AREAS, pageMeta } from "@/lib/seo";

const PATH = "/web-design-mumbai";
const DESCRIPTION =
  "Design Next is a web design and development company in Mumbai building fast, custom, SEO-ready websites for architects, interior designers, artists and premium brands. Free homepage preview before you pay.";

export const metadata = pageMeta({
  title: "Web Design Company in Mumbai | Custom Websites",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "web design company in Mumbai",
    "website design Mumbai",
    "website development company Mumbai",
    "web designer in Mumbai",
    "custom website design Mumbai",
    "Next.js developer Mumbai",
    "website design for architects Mumbai",
    "interior designer website Mumbai",
  ],
});

const FAQS = [
  {
    q: "How much does website design cost in Mumbai?",
    a: "It depends on the number of pages and features. Design Next gives every Mumbai business one fixed quote after a short call, with no monthly page-builder fees, and you see a free working homepage preview before committing.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Your homepage preview is ready in 48 to 72 hours. Once approved, most websites go live in 7 to 10 days, and larger builds take two to three weeks.",
  },
  {
    q: "Can we meet in person in Mumbai?",
    a: "Most projects run online, which keeps them quick. If you are in Mumbai and would rather meet, just ask when you get in touch.",
  },
  {
    q: "Will my website rank on Google in Mumbai?",
    a: "Every site launches with local SEO foundations: location-aware metadata, structured data, a sitemap, fast loading and Google Search Console set up, giving you the strongest possible footing in local search.",
  },
];

export default function MumbaiPage() {
  return (
    <LocationPage
      path={PATH}
      crumb="Web design in Mumbai"
      label="Web design, Mumbai"
      title={["Web design in", <span key="m" className="serif text-signal">Mumbai.</span>]}
      lead="Design Next is an independent web design and development studio in Mumbai. We design and hand-code fast, custom websites for the city's architects, interior designers, artists and brands."
      service={{ name: "Web design and development in Mumbai", description: DESCRIPTION }}
      reasons={[
        ["Stand out in a crowded city", "Mumbai has no shortage of talent. A site designed around your work, not a template, makes you the obvious choice."],
        ["Built for Mumbai phones", "Most visitors arrive on mobile data. Our sites load in well under a second, even on a busy network."],
        ["Found in local search", "Local SEO is set up from day one, so people searching nearby can find you."],
      ]}
      sectorsTitle="Who we build for in Mumbai"
      sectors={[
        "Architects & interior designers",
        "Furniture, décor & collectible design",
        "Artists, photographers & galleries",
        "Podcasts, creators & media",
        "Clinics, studios & consultants",
        "Trusts & non-profits",
      ]}
      projectSlugs={["karan-desai", "pkd-studio", "shu-khabar", "jivamaitridham"]}
      areasTitle="Serving businesses across Mumbai and Maharashtra"
      areas={[...AREAS.mumbai, "Pune", "Goa"]}
      faqs={FAQS}
    />
  );
}
