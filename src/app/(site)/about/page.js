import { Lines, Reveal, ScrollWords } from "@/components/Motion";
import Video from "@/components/Video";
import CtaBand from "@/components/CtaBand";
import InkHeader from "@/components/InkHeader";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import { MEDIA } from "@/data/site";
import { JsonLd, breadcrumbs, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Design Next, an Independent Web Design Studio in Mumbai",
  description:
    "Design Next is a small, senior web design and development studio in Mumbai, led by Pankaj Gaikwad. We design and hand-code every site we make, for clients in India, Qatar, the UAE, the UK, Australia and beyond.",
  path: "/about",
  keywords: ["web design studio Mumbai", "about Design Next", "independent web design agency India", "boutique web design agency"],
});

const BELIEFS = [
  ["Distinct beats pretty.", "If a competitor can buy your website, it isn't yours. Every site starts on a blank page."],
  ["Speed is respect.", "A slow site tells clients their time doesn't matter. Ours load in well under a second."],
  ["You own everything.", "Code, domain, content. No subscriptions, no lock-in, no hostage situations."],
  ["Beauty has a job.", "Every layout decision exists to turn a visitor into a conversation."],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "About", path: "/about" }])} />
      <InkHeader>
        <p className="t-label mb-8 text-ink/60">The studio</p>
        <Lines
          as="h1"
          className="t-mega max-w-[13ch]"
          lines={["Small studio.", <span key="a">Big <span className="serif text-signal">standards.</span></span>]}
        />
      </InkHeader>

      <section className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <p className="t-label text-mute md:col-span-3">Based in Mumbai</p>
        <div className="md:col-span-9">
          <ScrollWords
            className="t-h2"
            text="Design Next is a deliberately small studio, led by designer-developer Pankaj Gaikwad. We take on a few projects at a time so every one gets *senior hands from first sketch to launch day."
          />
          <Link href="/founder" className="group mt-12 inline-flex items-center gap-3 text-paper">
            <span className="u-link">Meet the founder</span>
            <Arrow />
          </Link>
        </div>
      </section>

      <section className="wrap pb-24 md:pb-32">
        <p className="t-label mb-12 text-mute">What we believe</p>
        <div className="grid gap-4 md:grid-cols-2">
          {BELIEFS.map(([title, text], i) => (
            <div key={title} className="rounded-[10px] border border-white/10 p-8 md:p-12">
              <span className="t-label text-signal">0{i + 1}</span>
              <h2 className="t-h3 mt-6 md:mt-10">{title}</h2>
              <p className="mt-4 max-w-sm text-mute">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative h-[80svh] overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-80">
          <Video src={MEDIA.smokeTwirlVideo} />
        </div>
        <div className="wrap relative flex h-full items-end pb-16 md:pb-24">
          <Reveal>
            <p className="t-display max-w-[16ch]">
              We&apos;d rather do <span className="serif text-signal">fewer</span> things, better.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand kicker="Work with us" lines={["Let's make", <span key="y" className="serif text-signal">yours.</span>]} />
    </>
  );
}
