"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV, SITE } from "@/data/site";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { InstagramIcon, WhatsAppIcon } from "./Icons";

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
            <ul className="mt-8 space-y-3 text-lg text-paper md:text-xl">
              {[
                { href: `mailto:${SITE.email}`, label: SITE.email, Icon: Mail },
                { href: `tel:${SITE.tel}`, label: SITE.phone, Icon: Phone },
                { href: SITE.whatsapp, label: "Chat on WhatsApp", Icon: WhatsAppIcon, external: true },
              ].map(({ href, label, Icon, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group inline-flex items-center gap-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-signal group-hover:bg-signal">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="u-link">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 text-[0.95rem] md:col-span-7 md:grid-cols-4">
            <div>
              <p className="t-label mb-5 text-dim">Guides</p>
              <ul className="space-y-2.5">
                {[
                  { label: "Web design in Mumbai", href: "/web-design-mumbai" },
                  { label: "Dubai, Qatar & Gulf", href: "/web-design-dubai-qatar" },
                  { label: "United States", href: "/web-design-usa" },
                  { label: "Australia", href: "/web-design-australia" },
                  { label: "Working worldwide", href: "/web-design-worldwide" },
                  { label: "Website development", href: "/website-development-company" },
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
                  <a href={SITE.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-mute transition-colors hover:text-paper">
                    <InstagramIcon className="h-4 w-4" />
                    <span className="u-link">Instagram</span>
                  </a>
                </li>
                <li>
                  <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-mute transition-colors hover:text-paper">
                    <WhatsAppIcon className="h-4 w-4" />
                    <span className="u-link">WhatsApp</span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="t-label mb-5 text-dim">Studio</p>
              <p className="flex items-center gap-2 text-mute">
                <MapPin className="h-4 w-4" /> Mumbai, India
              </p>
              <p className="flex items-center gap-2 text-mute">
                <Globe className="h-4 w-4" /> Working worldwide
              </p>
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
