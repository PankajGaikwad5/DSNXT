import LocationPage from "@/components/LocationPage";
import { AREAS, pageMeta } from "@/lib/seo";

const PATH = "/website-development-company";
const DESCRIPTION =
  "Design Next is a website design and development company in Mumbai, India. Custom websites, Next.js development, Shopify stores and SEO for businesses in India and worldwide, with a free homepage preview before you pay.";

export const metadata = pageMeta({
  title: "Website Design & Development Company in India",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "website development company",
    "website development company in India",
    "web design agency",
    "web development agency Mumbai",
    "website developer",
    "website designer",
    "custom website development",
    "business website development",
    "Shopify development company India",
  ],
});

const FAQS = [
  {
    q: "What does a website development company do?",
    a: "It plans, designs, builds and launches your website, and sets it up to be found on Google. At Design Next that means custom design, hand-coded Next.js or Shopify development, content structure, technical SEO, hosting and launch, all from one studio.",
  },
  {
    q: "How do I choose a web design company?",
    a: "Look at real sites they have built, check how fast those sites load on a phone, ask who will actually do the work, and make sure you will own the code and domain. Design Next shows you a free working homepage before you pay, so you judge the work itself rather than a pitch.",
  },
  {
    q: "Do you build ecommerce websites?",
    a: "Yes. Design Next builds custom Shopify storefronts without off-the-shelf themes, as well as catalogue and enquiry-led sites for brands that sell through conversations.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Yes. Design Next works with clients in Qatar, the UAE, Saudi Arabia, the UK, the US, Australia and Singapore, with calls and previews arranged around your time zone.",
  },
  {
    q: "How much does website development cost?",
    a: "Each project gets one fixed quote after a short call, based on the pages and features you need. There are no monthly page-builder fees, and you see a free homepage preview before committing.",
  },
];

export default function CompanyPage() {
  return (
    <LocationPage
      path={PATH}
      crumb="Website development company"
      label="Website design & development"
      title={["Websites,", <span key="c">designed and <span className="serif text-signal">built.</span></span>]}
      lead="Design Next is a website design and development company in Mumbai. We plan, design, code and launch custom websites that load fast, rank well and win clients, for businesses in India and around the world."
      service={{ name: "Website design and development", description: DESCRIPTION }}
      reasons={[
        ["Custom, never templated", "Every site starts on a blank page, designed around your business and the clients you want."],
        ["Engineered for speed and search", "Hand-written Next.js, sub-second loading, technical SEO and structured data as standard."],
        ["You own all of it", "Your code, your domain, your content. No lock-in and no monthly platform fees."],
      ]}
      sectorsTitle="What we build"
      sectors={[
        "Business and company websites",
        "Portfolio and studio websites",
        "Custom Shopify stores",
        "Landing pages and campaign sites",
        "Website redesigns and rebuilds",
      ]}
      projectSlugs={["cuddles-by-mia-co", "jivamaitridham"]}
      areasTitle="Serving clients in"
      areas={["Mumbai", "Pune", "Bengaluru", "Delhi NCR", ...AREAS.world]}
      faqs={FAQS}
    />
  );
}
