"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Video from "./Video";
import ServiceArt from "./ServiceArt";

/**
 * Large rows; on desktop a media preview floats beside the cursor for the
 * hovered row. On touch screens each row shows its media inline.
 */
export default function ServiceList({ items, tone = "dark" }) {
  const line = tone === "light" ? "border-ink/15" : "border-white/10";
  const [active, setActive] = useState(null);
  const box = useRef(null);
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 });

  useEffect(() => {
    let id;
    const tick = () => {
      const p = pos.current;
      p.cx += (p.x - p.cx) * 0.12;
      p.cy += (p.y - p.cy) * 0.12;
      if (box.current) box.current.style.transform = `translate3d(${p.cx}px, ${p.cy}px, 0)`;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const onMove = (e) => {
    pos.current.x = e.clientX + 32;
    pos.current.y = e.clientY - 120;
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setActive(null)} className="relative">
      <ul className={`border-t ${line}`}>
        {items.map((s, i) => (
          <li
            key={s.title}
            onPointerEnter={() => setActive(i)}
            className={`group grid cursor-default gap-4 border-b ${line} py-8 transition-colors md:grid-cols-12 md:items-baseline md:py-12`}
          >
            <span className="t-label text-signal md:col-span-1">0{i + 1}</span>
            <h3
              className={`t-h2 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-6 ${
                active === null || active === i ? "" : "opacity-25"
              } ${active === i ? "md:translate-x-4" : ""}`}
            >
              {s.title}
            </h3>
            <div className="md:col-span-5">
              <p className="max-w-sm opacity-65">{s.text}</p>
              <p className="t-label mt-4 opacity-40">{s.tags.join(" · ")}</p>
            </div>
            <div className="relative mt-2 aspect-[16/10] overflow-hidden rounded-[4px] md:pointer-fine:hidden">
              {s.art ? (
                <ServiceArt kind={s.art} />
              ) : s.video ? (
                <Video src={s.video} poster={s.poster} />
              ) : (
                <Image src={s.image} alt="" fill sizes="100vw" className="object-cover" />
              )}
            </div>
          </li>
        ))}
      </ul>

      <div ref={box} className="pointer-events-none fixed left-0 top-0 z-30 hidden md:pointer-fine:block" aria-hidden="true">
        <motion.div
          className="absolute h-[17rem] w-[25rem] overflow-hidden rounded-[10px] bg-paper shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]"
          initial={false}
          animate={active === null ? { opacity: 0, scale: 0.85, rotate: -4 } : { opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {items.map((it, i) => (
            <div key={it.title} className={`absolute inset-0 transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}>
              {it.art ? (
                <ServiceArt kind={it.art} paused={active !== i} />
              ) : it.video ? (
                <Video src={it.video} poster={it.poster} />
              ) : (
                <Image src={it.image} alt="" fill sizes="25rem" className="object-cover" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
