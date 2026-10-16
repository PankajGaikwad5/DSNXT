import Image from "next/image";
import { Lines, Parallax, Reveal, ScrollWords } from "@/components/Motion";
import Video from "@/components/Video";
import CtaBand from "@/components/CtaBand";
import InkHeader from "@/components/InkHeader";
import { MEDIA, unsplash } from "@/data/site";

export const metadata = {
  title: "Studio",
  description: "Design Next is a small, senior web studio in Mumbai. We design and hand-code every site we make.",
};

const BELIEFS = [
  ["Distinct beats pretty.", "If a competitor can buy your website, it isn't yours. Every site starts on a blank page."],
  ["Speed is respect.", "A slow site tells clients their time doesn't matter. Ours load in well under a second."],
  ["You own everything.", "Code, domain, content. No subscriptions, no lock-in, no hostage situations."],
  ["Beauty has a job.", "Every layout decision exists to turn a visitor into a conversation."],
];

export default function AboutPage() {
  return (
    <>
      <InkHeader>
        <p className="t-label mb-8 text-ink/60">The studio</p>
        <Lines
          as="h1"
          className="t-mega max-w-[13ch]"
          lines={["Small studio.", <span key="a">Big <span className="serif text-signal">standards.</span></span>]}
        />
      </InkHeader>

      <Parallax className="h-[60svh] md:h-[85svh]" amount={10}>
        <Image
          src={unsplash("1529253355930-ddbe423a2ac7", 2400)}
          alt="Gateway of India, Mumbai"
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-ink/30" />
      </Parallax>

      <section className="wrap grid gap-12 py-32 md:grid-cols-12 md:py-44">
        <p className="t-label text-mute md:col-span-3">Based in Mumbai</p>
        <div className="md:col-span-9">
          <ScrollWords
            className="t-h2"
            text="Design Next is a deliberately small team of designers and engineers. We take on a few projects at a time so every one gets *senior hands from first sketch to launch day."
          />
        </div>
      </section>

      <section className="wrap pb-32 md:pb-44">
        <p className="t-label mb-12 text-mute">What we believe</p>
        <div className="grid gap-px overflow-hidden rounded-[6px] bg-white/10 md:grid-cols-2">
          {BELIEFS.map(([title, text], i) => (
            <Reveal key={title} delay={(i % 2) * 0.08} className="bg-ink p-8 md:p-12">
              <span className="t-label text-signal">0{i + 1}</span>
              <h2 className="t-h3 mt-10 md:mt-16">{title}</h2>
              <p className="mt-4 max-w-sm text-mute">{text}</p>
            </Reveal>
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
