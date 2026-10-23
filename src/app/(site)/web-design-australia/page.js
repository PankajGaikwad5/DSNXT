import LocationPage from "@/components/LocationPage";
import { pageMeta } from "@/lib/seo";

const PATH = "/web-design-australia";
const DESCRIPTION =
  "Custom web design and development for Australian businesses, artists and brands. Design Next designed and built timyule.au for Timothy Yule Contemporary Art and works remotely with clients in Sydney, Melbourne, Brisbane and Perth. Free homepage preview.";

export const metadata = pageMeta({
  title: "Web Design for Australian Businesses & Artists",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "web design Australia",
    "website designer Sydney",
    "web design Melbourne",
    "website for artists Australia",
    "Aboriginal artist website",
    "affordable custom web design Australia",
    "hire web developer offshore Australia",
  ],
});

const FAQS = [
  {
    q: "Have you built websites for clients in Australia?",
    a: "Yes. Design Next designed and built timyule.au for Timothy Yule Contemporary Art, an acclaimed Aboriginal artist selling to collectors in Sydney, London and New York, with faithful colour, an exhibition timeline and direct private sales.",
  },
  {
    q: "How do time zones work between Mumbai and Australia?",
    a: "Sydney is 4.5 to 5.5 hours ahead of Mumbai, so an Australian afternoon overlaps with the Mumbai working day. Calls are easy to arrange and feedback happens on shared links.",
  },
  {
    q: "Can you work with a .au domain and Australian hosting?",
    a: "Yes. Your .au domain stays registered in your name, and the site is served from global edge servers with locations in Australia, so it loads fast for local visitors.",
  },
  {
    q: "How does the free homepage preview work from overseas?",
    a: "You send a short brief, and within 48 to 72 hours you receive a private link to a working homepage designed for your business. If you love it, the project continues; if not, you owe nothing.",
  },
];

export default function AustraliaPage() {
  return (
    <LocationPage
      path={PATH}
      crumb="Web design Australia"
      label="Web design, Australia"
      title={["Web design for", <span key="a" className="serif text-signal">Australia.</span>]}
      lead="Design Next designs and hand-codes custom websites for Australian artists, studios and businesses, working remotely from Mumbai with a working day that overlaps yours."
      service={{ name: "Web design and development for Australian clients", description: DESCRIPTION }}
      reasons={[
        ["Proven in Australia", "We built timyule.au for Timothy Yule, an Aboriginal artist selling to collectors worldwide."],
        ["Fast from Perth to Sydney", "Served from edge locations in Australia, so pages load in well under a second."],
        ["Studio quality, fair price", "Senior, hand-coded work at one fixed quote, after a free homepage preview."],
      ]}
      sectorsTitle="Who we work with in Australia"
      sectors={[
        "Artists, galleries & art centres",
        "Design, architecture & interior studios",
        "Founders, consultants & creators",
        "Boutique brands & online stores",
        "Not-for-profits & cultural organisations",
      ]}
      projectSlugs={["timothy-yule", "karan-desai"]}
      areasTitle="Working with clients in"
      areas={["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra", "Darwin", "Hobart"]}
      faqs={FAQS}
    />
  );
}
