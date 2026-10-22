"use client";

import { useState } from "react";

export default function Faq({ items, tone = "dark" }) {
  const [open, setOpen] = useState(0);
  const line = tone === "dark" ? "border-white/10" : "border-ink/15";
  const muted = tone === "dark" ? "text-mute" : "text-ink/65";

  return (
    <ul className={`border-t ${line}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className={`border-b ${line}`}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
              aria-expanded={isOpen}
            >
              <span className="text-xl tracking-[-0.025em] md:text-2xl">{item.q}</span>
              <span className="relative h-4 w-4 shrink-0" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                <span
                  className={`absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-500 ${
                    isOpen ? "scale-y-0" : ""
                  }`}
                />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <p className={`max-w-2xl pb-8 text-[1.05rem] leading-relaxed ${muted}`}>{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
