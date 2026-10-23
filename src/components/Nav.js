"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/data/site";
import { Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import { WhatsAppIcon } from "./Icons";

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 300 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-white mix-blend-difference transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="relative z-10" aria-label="Design Next, home">
            <Logo className="h-6 w-auto md:h-7" />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[0.9rem] transition-colors ${active ? "text-white" : "text-white/60 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/preview"
              className="group hidden items-center gap-2.5 rounded-full bg-white py-2.5 pl-5 pr-4 text-[0.85rem] font-medium text-black transition-opacity hover:opacity-80 sm:inline-flex"
            >
              Start a project
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={`h-px w-6 bg-white transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-6 bg-white transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between gap-10 overflow-y-auto bg-ink px-5 pb-10 pt-24 transition-[clip-path,visibility] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open ? "visible [clip-path:inset(0_0_0%_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
        inert={!open}
      >
        <nav className="flex flex-col">
          {[{ label: "Home", href: "/" }, ...NAV, { label: "Start a project", href: "/preview" }].map((item, i) => (
            <div
              key={item.href}
              // Items rise in after the panel opens; on close they wait for the panel to finish.
              className={`transition-[opacity,transform] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDuration: open ? "0.8s" : "0s", transitionDelay: open ? `${0.15 + i * 0.06}s` : "0.8s" }}
            >
              <Link href={item.href} className="block border-b border-white/10 py-3 text-4xl font-medium tracking-[-0.05em]">
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
        <div className="flex flex-wrap gap-3 text-sm text-paper">
          <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5">
            <Mail className="h-4 w-4" /> Email
          </a>
          <a href={`tel:${SITE.tel}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5">
            <Phone className="h-4 w-4" /> Call
          </a>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 font-medium text-white">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
