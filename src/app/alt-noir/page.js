import Link from "next/link";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Video from "@/components/Video";
import Logo from "@/components/Logo";
import Image from "next/image";
import { Reveal } from "@/components/Motion";
import { PROJECTS } from "@/data/projects";
import { MEDIA, SITE } from "@/data/site";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"] });
const sans = Manrope({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = { title: "Concept: Noir", robots: { index: false } };

const GOLD = "#c9b27c";

export default function NoirConcept() {
  return (
    <div className={`${sans.className} min-h-svh bg-[#0b0a09] text-[#ece6da]`} style={{ "--gold": GOLD }}>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 mix-blend-difference md:px-12">
        <Logo className="h-6 w-auto" />
        <nav className="hidden gap-10 text-xs uppercase tracking-[0.3em] md:flex">
          <a href="#work">Work</a>
          <a href="#studio">Studio</a>
          <a href="#contact">Contact</a>
        </nav>
        <Link href="/" className="text-xs uppercase tracking-[0.3em]">
          Main site
        </Link>
      </header>

      {/* Hero */}
      <section className="relative flex h-svh items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0 opacity-60">
          <Video src={MEDIA.smokeTwirlVideo} />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0b0a09_75%)]" />
        <div className="relative px-6">
          <p className="mb-10 text-[0.7rem] uppercase tracking-[0.5em] text-[var(--gold)]">Design Next · Mumbai</p>
          <h1 className={`${serif.className} text-[clamp(3.5rem,11vw,11rem)] font-normal leading-[0.85] tracking-[-0.02em]`}>
            The quiet
            <br />
            <em className="text-[var(--gold)]">luxury</em> of
            <br />a great website.
          </h1>
        </div>
        <p className="absolute bottom-10 text-[0.7rem] uppercase tracking-[0.5em] text-[#ece6da]/50">Scroll</p>
      </section>

      {/* Intro */}
      <section id="studio" className="mx-auto max-w-4xl px-6 py-40 text-center">
        <Reveal>
          <p className={`${serif.className} text-[clamp(1.8rem,3.6vw,3.2rem)] font-normal leading-[1.2]`}>
            We craft digital residences for architects, collectors and makers. Each one composed by hand, each one
            <em className="text-[var(--gold)]"> entirely their own.</em>
          </p>
        </Reveal>
        <div className="mx-auto mt-16 h-24 w-px bg-[var(--gold)]/50" />
      </section>

      {/* Work */}
      <section id="work" className="px-6 pb-40 md:px-12">
        <div className="mb-20 flex items-end justify-between border-b border-[#ece6da]/15 pb-6">
          <h2 className={`${serif.className} text-5xl font-normal md:text-7xl`}>Selected <em>commissions</em></h2>
          <span className="text-xs uppercase tracking-[0.3em] text-[#ece6da]/50">{PROJECTS.length} works</span>
        </div>
        <div className="grid gap-x-10 gap-y-24 md:grid-cols-2">
          {PROJECTS.slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} className={i % 2 ? "md:mt-40" : ""}>
              <Link href={`/work/${p.slug}`} className="group block">
                <div className="relative aspect-[1366/690] overflow-hidden">
                  <Image src={p.image} alt={p.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top transition-transform duration-[1.6s] ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="mt-6 flex items-baseline justify-between">
                  <h3 className={`${serif.className} text-3xl font-normal md:text-4xl`}>{p.title}</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{p.year}</span>
                </div>
                <p className="mt-2 text-sm text-[#ece6da]/55">{p.category}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-[#ece6da]/10 px-6 py-40 text-center">
        <p className="mb-10 text-[0.7rem] uppercase tracking-[0.5em] text-[var(--gold)]">By invitation</p>
        <h2 className={`${serif.className} mx-auto max-w-4xl text-[clamp(3rem,8vw,7.5rem)] font-normal leading-[0.9]`}>
          Your homepage, <em className="text-[var(--gold)]">composed</em> before you commit.
        </h2>
        <Link
          href="/preview"
          className="mt-16 inline-block border border-[var(--gold)] px-10 py-5 text-xs uppercase tracking-[0.35em] text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-[#0b0a09]"
        >
          Request a private preview
        </Link>
        <p className="mt-24 text-xs uppercase tracking-[0.3em] text-[#ece6da]/40">{SITE.email}</p>
      </section>
    </div>
  );
}
