"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV, SITE } from "@/data/site";
import Logo from "./Logo";

function MumbaiClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "--:--"} IST</span>;
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-24 md:pt-32">
      <div className="wrap">
        <div className="grid gap-14 border-t border-white/10 pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="t-h3 max-w-md">
              Have something worth building? <span className="serif text-mute">Let&apos;s talk.</span>
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="u-link mt-8 inline-block text-lg text-paper md:text-xl"
            >
              {SITE.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 text-[0.95rem] md:col-span-7 md:grid-cols-4">
            <div>
              <p className="t-label mb-5 text-dim">Guides</p>
              <ul className="space-y-2.5">
                {[
                  { label: "Web design in Mumbai", href: "/web-design-mumbai" },
                  { label: "Working worldwide", href: "/web-design-worldwide" },
                  { label: "AI builder vs studio", href: "/ai-website-builder-vs-web-designer" },
                  { label: "FAQ", href: "/faq" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="u-link text-mute transition-colors hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="t-label mb-5 text-dim">Pages</p>
              <ul className="space-y-2.5">
                {[{ label: "Home", href: "/" }, ...NAV, { label: "Free preview", href: "/preview" }].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="u-link text-mute transition-colors hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="t-label mb-5 text-dim">Elsewhere</p>
              <ul className="space-y-2.5">
                <li>
                  <a href={SITE.instagram} target="_blank" rel="noreferrer" className="u-link text-mute hover:text-paper">
                    Instagram
                  </a>
                </li>
                <li>
                  <Link href="/alt-noir" className="u-link text-mute hover:text-paper">
                    Concept: Noir
                  </Link>
                </li>
                <li>
                  <Link href="/alt-editorial" className="u-link text-mute hover:text-paper">
                    Concept: Editorial
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="t-label mb-5 text-dim">Studio</p>
              <p className="text-mute">Mumbai, India</p>
              <p className="text-mute">Working worldwide</p>
              <p className="mt-2 flex items-center gap-2 text-paper">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                </span>
                <MumbaiClock />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2 text-xs text-dim sm:flex-row sm:justify-between">
          <span>© {SITE.name} 2026</span>
          <span>Designed and built in-house.</span>
        </div>
      </div>

      <div className="wrap pointer-events-none mt-16 select-none pb-10 opacity-[0.07]" aria-hidden="true">
        <Logo className="h-auto w-full" />
      </div>
    </footer>
  );
}
