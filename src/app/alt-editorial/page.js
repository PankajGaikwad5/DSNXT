import Image from "next/image";
import Link from "next/link";
import { Newsreader, Instrument_Sans } from "next/font/google";
import { Reveal } from "@/components/Motion";
import Logo from "@/components/Logo";
import { PROJECTS } from "@/data/projects";
import { FAQS } from "@/data/faqs";
import { SITE, unsplash } from "@/data/site";

const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"] });
const sans = Instrument_Sans({ subsets: ["latin"] });

export const metadata = { title: "Concept: Editorial", robots: { index: false } };

const BLUE = "#1f2bff";

export default function EditorialConcept() {
  const [lead, ...rest] = PROJECTS;
  return (
    <div className={`${sans.className} min-h-svh bg-[#f2eee6] text-[#141414] [color-scheme:light]`}>
      {/* Masthead */}
      <header className="border-b border-[#141414] px-5 md:px-10">
        <div className="flex items-center justify-between py-3 text-xs uppercase tracking-[0.15em]">
          <span className="flex items-center gap-4"><Logo tone="black" className="h-4 w-auto" /> Issue No. 07 · Autumn 2026</span>
          <Link href="/" className="underline-offset-4 hover:underline">
            ← Main site
          </Link>
        </div>
        <h1 className={`${serif.className} border-t border-[#141414] py-4 text-center text-[17vw] font-medium leading-[0.8] tracking-[-0.05em] md:text-[15vw]`}>
          Design Next
        </h1>
        <div className="flex justify-between border-t border-[#141414] py-3 text-xs uppercase tracking-[0.15em]">
          <span>Websites, made by hand</span>
          <span className="hidden md:inline">Mumbai · Worldwide</span>
          <span style={{ color: BLUE }}>Free preview inside</span>
        </div>
      </header>

      {/* Cover story */}
      <section className="grid gap-10 border-b border-[#141414] px-5 py-12 md:grid-cols-12 md:px-10 md:py-16">
        <div className="md:col-span-4">
          <p className="mb-6 text-xs uppercase tracking-[0.15em]" style={{ color: BLUE }}>
            The cover story
          </p>
          <h2 className={`${serif.className} text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl`}>
            Why the best firms <em>stopped</em> buying templates.
          </h2>
          <p className={`${serif.className} mt-8 text-xl leading-snug text-[#141414]/75`}>
            <span className="float-left mr-2 text-7xl leading-[0.8]" style={{ color: BLUE }}>
              A
            </span>
            website is the first room a client walks into. Ours are drawn and coded from a blank page, so that room could only
            ever be yours.
          </p>
          <Link
            href="/preview"
            className="mt-10 inline-block px-7 py-4 text-sm text-white transition-opacity hover:opacity-85"
            style={{ background: BLUE }}
          >
            See your homepage first →
          </Link>
        </div>
        <Link href={`/work/${lead.slug}`} className="group md:col-span-8">
          <div className="relative aspect-[1366/690] overflow-hidden">
            <Image src={lead.image} alt={lead.title} fill priority sizes="(min-width: 768px) 66vw, 100vw" className="object-cover object-top" />
          </div>
          <p className="mt-3 text-sm">
            <em className={serif.className}>Fig. 1</em>: {lead.title}. {lead.summary}
          </p>
        </Link>
      </section>

      {/* Index */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className={`${serif.className} text-5xl italic md:text-7xl`}>In this issue</h2>
          <span className="text-xs uppercase tracking-[0.15em]">{PROJECTS.length} features</span>
        </div>
        <ol className="border-t border-[#141414]">
          {rest.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group grid grid-cols-12 items-center gap-4 border-b border-[#141414] py-5 transition-colors hover:bg-[#1f2bff] hover:text-white md:py-6"
              >
                <span className="col-span-2 text-sm md:col-span-1">p. {String((i + 2) * 8).padStart(2, "0")}</span>
                <span className={`${serif.className} col-span-10 text-3xl tracking-[-0.02em] md:col-span-6 md:text-5xl`}>{p.title}</span>
                <span className="col-span-6 hidden text-sm md:col-span-3 md:block">{p.category}</span>
                <span className="col-span-12 text-sm md:col-span-2 md:text-right">
                  {p.location}, {p.year}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Letters */}
      <section className="grid gap-10 border-t border-[#141414] px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="relative aspect-[4/5] overflow-hidden md:col-span-4">
          <Image src={unsplash("1494438639946-1ebd1d20bf85", 1200)} alt="" fill sizes="33vw" className="object-cover" />
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="mb-6 text-xs uppercase tracking-[0.15em]" style={{ color: BLUE }}>
            Letters to the studio
          </p>
          <div className="columns-1 gap-10 md:columns-2">
            {FAQS.map((f) => (
              <Reveal key={f.q} className="mb-8 break-inside-avoid">
                <h3 className={`${serif.className} text-2xl italic leading-tight`}>“{f.q}”</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[#141414]/75">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-5 py-20 text-white md:px-10" style={{ background: BLUE }}>
        <h2 className={`${serif.className} text-[13vw] leading-[0.85] tracking-[-0.04em]`}>
          Next issue: <em>yours.</em>
        </h2>
        <div className="mt-12 flex flex-wrap justify-between gap-6 text-sm">
          <Link href="/preview" className="underline underline-offset-4">
            Claim your free homepage preview
          </Link>
          <span>{SITE.email}</span>
        </div>
      </footer>
    </div>
  );
}
