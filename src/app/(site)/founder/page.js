import Image from "next/image";
import InkHeader from "@/components/InkHeader";
import CtaBand from "@/components/CtaBand";
import Arrow from "@/components/Arrow";
import { Lines, Reveal, ScrollWords } from "@/components/Motion";
import { getProject } from "@/data/projects";
import { unsplash } from "@/data/site";
import { JsonLd, breadcrumbs, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Pankaj Gaikwad, Freelance Web Designer & Developer in Mumbai",
  description:
    "Pankaj Gaikwad is the freelance web designer and Next.js developer behind Design Next in Mumbai. Work directly with the person who designs and codes your website, for clients in India and worldwide.",
  path: "/founder",
  keywords: [
    "Pankaj Gaikwad",
    "freelance web designer Mumbai",
    "freelance web developer India",
    "freelance Next.js developer",
    "hire freelance website developer",
  ],
});

const WHY = [
  ["You talk to the maker.", "No account managers, no hand-offs. The person on the call is the person writing the code."],
  ["Nothing gets lost.", "Design decisions and engineering decisions are made by the same head, so the site you approve is the site you get."],
  ["Few projects at a time.", "Working alone means saying no often. The projects I take on get my full attention."],
  ["Accountable, personally.", "If something isn't right, there's exactly one person responsible: me."],
];

export default function FounderPage() {
  const portfolio = getProject("pankaj-gaikwad");
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "About", path: "/about" }, { name: "Founder", path: "/founder" }])} />
      <InkHeader>
        <p className="t-label mb-8 text-ink/60">Founder</p>
        <Lines
          as="h1"
          className="t-mega max-w-[12ch]"
          lines={["One person.", <span key="e"><span className="serif text-signal">Every</span> pixel.</span>]}
        />
        <Reveal delay={0.3} className="mt-12 max-w-xl">
          <p className="t-lead text-ink/70">
            I&apos;m Pankaj Gaikwad, the web designer and developer behind Design Next in Mumbai. You get the directness of
            hiring a freelancer with the process of a studio: you work with me, from the first call to launch day, whether
            you&apos;re in Mumbai, Doha or London.
          </p>
        </Reveal>
      </InkHeader>

      <section data-snap className="bg-ink py-32 md:py-44">
        <div className="wrap grid gap-14 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            {/* Replace with a portrait of Pankaj */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-ink-2">
              <Image src={unsplash("1550439062-609e1531270e", 1200)} alt="The Design Next workspace" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <ScrollWords
              className="t-h3"
              text="I started Design Next because good businesses kept ending up with websites that looked like everyone else's. I'd rather build a *few sites properly than many sites quickly."
            />
            <Reveal delay={0.1} className="mt-12">
              <a
                href={portfolio.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 text-paper transition-colors hover:border-paper"
              >
                See my personal playground <Arrow />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section data-snap className="bg-paper py-32 text-ink md:py-44">
        <div className="wrap">
          <p className="t-label mb-12 text-ink/50">Why one person works in your favour</p>
          <div className="grid gap-px overflow-hidden rounded-[10px] bg-ink/10 md:grid-cols-2">
            {WHY.map(([title, text], i) => (
              <Reveal key={title} delay={(i % 2) * 0.08} className="bg-paper p-8 md:p-12">
                <span className="t-label text-signal">0{i + 1}</span>
                <h2 className="t-h3 mt-10 md:mt-16">{title}</h2>
                <p className="mt-4 max-w-sm text-ink/65">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand kicker="Work with me" lines={["Let's make", <span key="y" className="serif text-signal">yours.</span>]} />
    </>
  );
}
