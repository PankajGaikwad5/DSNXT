"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Arrow from "./Arrow";

const InkField = dynamic(() => import("./InkField"), { ssr: false });

const d = (s) => ({ animationDelay: `${s}s` });

export default function Hero() {
  return (
    <section data-snap className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper text-ink">
      <InkField intensity="hero" zone={[0.5, 0.95, 0.5, 0.95]} />

      <div className="wrap pointer-events-none relative z-10 flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-14">
        <div className="flex items-end justify-between gap-6">
          <p className="t-label fade-in mb-8 text-ink/60 md:mb-10" style={d(0.2)}>
            Independent web studio, Mumbai
          </p>
          <p className="t-label fade-in mb-8 hidden text-ink/45 md:mb-10 md:block" style={d(1.6)}>
            Move your cursor. Stir the ink.
          </p>
        </div>

        <h1 className="t-mega max-w-[17ch]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="rise" style={d(0.3)}>Websites that make</span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="rise" style={d(0.42)}>
              you the <span className="serif text-signal">obvious</span> choice.
            </span>
          </span>
        </h1>

        <div className="pointer-events-auto mt-10 grid gap-8 border-t border-ink/15 pt-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p className="t-lead fade-in max-w-md text-ink/70 md:col-span-5" style={d(0.9)}>
            We design and hand-code fast, distinctive websites for architects, artists and brands who refuse to look
            like everyone else.
          </p>
          <div className="fade-in flex flex-wrap items-center gap-3 md:col-span-7 md:justify-end" style={d(1.05)}>
            <Link
              href="/preview"
              className="group inline-flex items-center gap-3 rounded-full bg-signal py-4 pl-7 pr-5 text-[0.95rem] font-medium text-white transition-colors hover:bg-ink"
            >
              Get a free homepage preview
              <Arrow />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 text-[0.95rem] text-ink transition-colors hover:border-ink"
            >
              See the work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
