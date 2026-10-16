import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import WorkStack from "@/components/WorkStack";
import InkFilm from "@/components/InkFilm";
import ServiceList from "@/components/ServiceList";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Video from "@/components/Video";
import Arrow from "@/components/Arrow";
import { Lines, Reveal, ScrollWords } from "@/components/Motion";
import { PROJECTS } from "@/data/projects";
import { SERVICES, PROCESS, STATS } from "@/data/services";
import { FAQS } from "@/data/faqs";
import { JsonLd, faqPage } from "@/lib/seo";

function SectionHead({ index, title, aside }) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="t-label mb-6 opacity-50">({index})</p>
        <Lines as="h2" className="t-display" lines={title} />
      </div>
      {aside}
    </div>
  );
}

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <JsonLd data={faqPage(FAQS)} />
      <Hero />

      {/* Statement */}
      <section data-snap className="bg-paper text-ink">
       <div className="wrap py-32 md:py-48">
        <p className="t-label mb-10 opacity-50">(01) The studio</p>
        <ScrollWords
          className="t-h2 max-w-[22ch]"
          text="Most websites are bought off a shelf. Ours are drawn, written and coded from a blank page, one *business at a time."
        />
        <Reveal className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-6">
          <Link href="/contact" className="group inline-flex items-center gap-3">
            <span className="u-link">Get in touch</span>
            <Arrow />
          </Link>
          <span className="opacity-60">Designed and built, start to finish. Mumbai, working worldwide.</span>
        </Reveal>
       </div>
      </section>

      {/* Work */}
      <section data-snap className="pt-8">
        <div className="wrap">
          <SectionHead
            index="02"
            title={["Selected work"]}
            aside={
              <Link href="/work" className="group inline-flex items-center gap-3 text-paper">
                <span className="u-link">All projects ({PROJECTS.length})</span>
                <Arrow />
              </Link>
            }
          />
        </div>
        <WorkStack projects={PROJECTS.slice(0, 4)} />
      </section>

      <InkFilm />

      {/* Services */}
      <section data-snap className="bg-paper text-ink">
       <div className="wrap py-32 md:py-44">
        <SectionHead
          index="04"
          title={["What we do"]}
          aside={<p className="max-w-xs opacity-60">Three disciplines, one desk, nothing outsourced.</p>}
        />
        <ServiceList items={SERVICES} tone="light" />
       </div>
      </section>

      {/* Numbers */}
      <section data-snap className="wrap py-32 md:py-44">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[6px] bg-white/10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex aspect-square flex-col justify-between bg-ink p-5 md:aspect-[4/5] md:p-8">
              <span className="t-label text-dim">0{i + 1}</span>
              <div>
                <p className="text-[clamp(3.5rem,8vw,7.5rem)] font-medium leading-none tracking-[-0.06em]">
                  {s.value}
                  <span className="serif text-signal">{s.unit}</span>
                </p>
                <p className="mt-3 text-sm text-mute">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process, light */}
      <section data-snap className="bg-paper py-32 text-ink md:py-44">
        <div className="wrap">
          <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="t-label mb-6 text-ink/50">(05) Process</p>
              <Lines
                as="h2"
                className="t-display"
                lines={["Love it before", <span key="l2">you <span className="serif text-signal">pay</span> for it.</span>]}
              />
            </div>
            <p className="t-lead text-ink/65 md:col-span-4">
              We earn the project by showing you the work first. No pitch decks, no guesswork.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-6">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1} className={i === 1 ? "md:mt-24" : i === 2 ? "md:mt-48" : ""}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[4px] bg-paper-2">
                  {p.video ? (
                    <Video src={p.video} poster={p.poster} className="grade is-live" />
                  ) : (
                    <Image src={p.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="grade object-cover" />
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1.5 text-xs font-medium">{p.time}</span>
                </div>
                <div className="mt-6 flex gap-5">
                  <span className="t-label pt-2 text-signal">{p.step}</span>
                  <div>
                    <h3 className="t-h3">{p.title}</h3>
                    <p className="mt-3 max-w-xs text-ink/65">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section data-snap className="wrap grid gap-12 py-32 md:grid-cols-12 md:py-44">
        <div className="md:col-span-4">
          <p className="t-label mb-6 text-mute">(06) FAQ</p>
          <Lines as="h2" className="t-h2" lines={["Questions,", <span key="a" className="serif">answered.</span>]} />
        </div>
        <div className="md:col-span-8">
          <Faq items={FAQS} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
