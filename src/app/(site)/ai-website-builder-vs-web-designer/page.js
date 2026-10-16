import Link from "next/link";
import InkHeader from "@/components/InkHeader";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { Lines, Reveal } from "@/components/Motion";
import { FAQ_GROUPS } from "@/data/faqs";
import { SITE } from "@/data/site";
import { JsonLd, ORG_ID, breadcrumbs, faqPage, pageMeta } from "@/lib/seo";

const PATH = "/ai-website-builder-vs-web-designer";
const TITLE = "AI Website Builder vs a Professional Web Designer: Which Is Right for Your Business?";
const SUMMARY =
  "AI website builders are fast and cheap, and good enough for a hobby or a placeholder. For a business that wins clients on trust, quality and Google visibility, a professionally designed and hand-coded website is the better investment: it looks distinct, loads faster, ranks better and is fully yours.";

export const metadata = pageMeta({
  title: "AI Website Builder vs Professional Web Designer",
  description: SUMMARY,
  path: PATH,
  keywords: [
    "AI website builder vs web designer",
    "should I build my website with AI",
    "AI generated website SEO",
    "Wix vs custom website",
    "Framer vs custom website",
    "hire a web designer",
    "professional website design",
  ],
});

const ROWS = [
  ["Design", "Template-based layouts shared by thousands of sites", "Designed from a blank page around your brand and clients"],
  ["Speed", "Heavy platform scripts, often slow on phones", "Hand-written code, pages load in well under a second"],
  ["SEO", "Basic settings, generic copy, limited control", "Technical SEO, structured data and Core Web Vitals built in"],
  ["Ownership", "Locked to the platform and its monthly plan", "You own the code, domain and content outright"],
  ["Customisation", "Limited to what the builder allows", "Anything the business needs, including 3D and motion"],
  ["Cost over time", "Low to start, subscriptions forever", "One fixed quote, no page-builder fees"],
  ["Best for", "Hobby projects, tests and placeholders", "Businesses whose website wins or loses clients"],
];

const QA = FAQ_GROUPS.find((g) => g.title.startsWith("AI")).items;

export default function Guide() {
  return (
    <article className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: SUMMARY,
          inLanguage: "en-IN",
          datePublished: "2026-10-01",
          dateModified: "2026-10-17",
          mainEntityOfPage: `${SITE.url}${PATH}`,
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
        }}
      />
      <JsonLd data={faqPage(QA)} />
      <JsonLd data={breadcrumbs([{ name: "AI website builder vs web designer", path: PATH }])} />

      <InkHeader>
        <p className="t-label mb-8 text-ink/60">Guide</p>
        <Lines
          as="h1"
          className="t-display max-w-[18ch]"
          lines={["AI website builder", <span key="v">or a <span className="serif text-signal">professional?</span></span>]}
        />
      </InkHeader>

      <section className="wrap grid gap-14 pb-24 md:grid-cols-12 md:pb-32">
        <div className="md:col-span-8">
          <p className="t-label mb-6 text-signal">The short answer</p>
          <p className="t-h3">{SUMMARY}</p>
        </div>
      </section>

      <section className="wrap pb-24 md:pb-32">
        <h2 className="t-h2 mb-12">Side by side</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink">
                <th className="t-label py-4 pr-6 font-normal text-ink/50">
                  <span className="sr-only">Factor</span>
                </th>
                <th className="t-label py-4 pr-6 font-normal text-ink/50">AI website builder</th>
                <th className="t-label py-4 font-normal text-signal">Design Next</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([k, ai, us]) => (
                <tr key={k} className="border-b border-ink/15 align-top">
                  <th className="py-6 pr-6 text-lg font-medium">{k}</th>
                  <td className="py-6 pr-6 text-ink/60">{ai}</td>
                  <td className="py-6">{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap grid gap-16 pb-24 md:grid-cols-2 md:pb-32">
        <Reveal>
          <h2 className="t-h3">When an AI builder is enough</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            If you need something online today for a side project, an event or a test of an idea, an AI builder is quick
            and inexpensive. Nobody is comparing you with a competitor, and speed matters more than distinction.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="t-h3">When to hire a professional</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            If clients judge your quality from your website, find you on Google, or compare you with others before
            calling, the site is part of how you earn. That is where custom design, real performance and proper SEO pay
            for themselves.
          </p>
        </Reveal>
      </section>

      <section className="wrap grid gap-10 pb-32 md:grid-cols-12 md:pb-44">
        <h2 className="t-h3 md:col-span-4">Common questions</h2>
        <div className="md:col-span-8">
          <Faq items={QA} tone="light" />
          <p className="mt-10 text-ink/65">
            Started with an AI tool already?{" "}
            <Link href="/preview" className="u-link text-ink">
              Get a free homepage preview
            </Link>{" "}
            and compare.
          </p>
        </div>
      </section>

      <CtaBand kicker="See the difference" />
    </article>
  );
}
