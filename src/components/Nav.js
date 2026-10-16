"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/data/site";
import Logo from "./Logo";

const EASE = [0.16, 1, 0.3, 1];

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
            <Logo priority className="h-6 w-auto md:h-7" />
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

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <nav className="flex flex-col">
              {[{ label: "Home", href: "/" }, ...NAV, { label: "Start a project", href: "/preview" }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}
                >
                  <Link href={item.href} className="block border-b border-white/10 py-4 text-5xl font-medium tracking-[-0.05em]">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex justify-between text-sm text-mute">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <span>Mumbai</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
