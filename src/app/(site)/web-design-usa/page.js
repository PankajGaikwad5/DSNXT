import LocationPage from "@/components/LocationPage";
import { pageMeta } from "@/lib/seo";

const PATH = "/web-design-usa";
const DESCRIPTION =
  "Custom web design and Next.js development for US businesses, from an independent studio in Mumbai. Senior, hand-coded websites at a fixed price, with calls in your morning and a free homepage preview before you pay.";

export const metadata = pageMeta({
  title: "Web Design & Next.js Development for US Businesses",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "web design USA",
    "hire web designer from India",
    "offshore web development agency",
    "Next.js development agency",
    "custom website design for small business",
    "outsource web design India",
    "website developer New York",
  ],
});

const FAQS = [
  {
    q: "How do you work across US time zones?",
    a: "Mumbai is 9.5 to 12.5 hours ahead of the US, so a call in your morning is an evening call in Mumbai. Work continues while you sleep, and you wake up to progress on a shared preview link.",
  },
  {
    q: "Why hire a web design studio in India instead of a US agency?",
    a: "You get senior design and hand-written Next.js code at a fixed price, often well below US agency rates, and you work directly with the person building your site instead of an account manager.",
  },
  {
    q: "Do you sell to collectors and clients in the US already?",
    a: "Yes. Timothy Yule Contemporary Art, a site Design Next designed and built, sells directly to collectors in Sydney, London and New York.",
  },
  {
    q: "How is a project priced?",
    a: "Each project has one fixed quote, agreed after a short call and quoted in US dollars if you prefer. There are no hourly surprises or monthly platform fees, and you own the code, domain and content.",
  },
];

export default function UsaPage() {
  return (
    <LocationPage
      path={PATH}
      crumb="Web design USA"
      label="Web design, United States"
      title={["US quality.", <span key="u"><span className="serif text-signal">Fair</span> price.</span>]}
      lead="Design Next designs and hand-codes custom websites for US founders, studios and small businesses, with calls in your morning and progress waiting for you every day."
      service={{ name: "Web design and development for US businesses", description: DESCRIPTION }}
      reasons={[
        ["Work while you sleep", "The time difference works for you: feedback in your evening, progress by your morning."],
        ["Senior, not outsourced", "One designer-developer, start to finish. No juniors, no hand-offs, no account managers."],
        ["Built to rank in the US", "Fast Next.js sites with technical SEO and structured data, served from US edge locations."],
      ]}
      sectorsTitle="Who we work with in the US"
      sectors={[
        "Founders & early-stage startups",
        "Consultants, coaches & agencies",
        "Artists, galleries & creators",
        "Architecture, design & interior studios",
        "Boutique brands & online stores",
      ]}
      projectSlugs={["timothy-yule", "cuddles-by-mia-co"]}
      areasTitle="Available to clients in"
      areas={["New York", "California", "Texas", "Florida", "Illinois", "Washington", "Massachusetts", "Anywhere in the US"]}
      faqs={FAQS}
    />
  );
}
