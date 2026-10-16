import Link from "next/link";
import Video from "./Video";
import Arrow from "./Arrow";
import { Lines, Reveal } from "./Motion";
import { MEDIA } from "@/data/site";

export default function CtaBand({
  kicker = "Start here",
  lines = ["See your new", <span key="l2">homepage <span className="serif text-signal">first</span>.</span>],
  text = "Tell us about your business. In 72 hours you'll have a working homepage designed for you. Love it, or walk away owing nothing.",
}) {
  return (
    <section data-snap className="relative overflow-hidden bg-paper text-ink">
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%]">
        <Video src={MEDIA.blackInkVideo} poster={MEDIA.blackInkPoster} className="mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/70 to-transparent md:via-paper/20" />
      </div>
      <div className="wrap relative flex min-h-[90svh] flex-col justify-center py-32">
        <p className="t-label mb-10 opacity-60">
          {kicker}
        </p>
        <Lines as="h2" className="t-mega max-w-[12ch]" lines={lines} />
        <Reveal delay={0.3} className="mt-12 flex max-w-xl flex-col gap-10">
          <p className="t-lead text-ink/70">{text}</p>
          <Link
            href="/preview"
            className="group inline-flex w-fit items-center gap-4 rounded-full bg-signal py-5 pl-8 pr-6 text-lg font-medium text-white transition-colors hover:bg-ink"
          >
            Claim your free preview
            <Arrow className="h-5 w-5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
