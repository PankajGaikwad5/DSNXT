"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Video from "./Video";

// three.js is heavy; load it only when a scene is actually shown.
const ServiceArt = dynamic(() => import("./ServiceArt"), { ssr: false });

/** Renders children only once the box is about to scroll into view. */
function WhenNear({ children }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "800px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return near ? children : <div ref={ref} className="absolute inset-0 bg-paper" />;
}

/**
 * Large rows; on desktop a media preview floats beside the cursor for the
 * hovered row. On touch screens each row shows its media inline.
 */
export default function ServiceList({ items, tone = "dark" }) {
  const line = tone === "light" ? "border-ink/15" : "border-white/10";
  const [active, setActive] = useState(null);
  // Hover previews mount on first hover, so hidden scenes never build up front.
  const [seen, setSeen] = useState(() => new Set());
  const box = useRef(null);
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 });

  // Load three.js and compile the scenes while the visitor is still up the page,
  // so reaching this section (or hovering a row) never stalls scrolling.
  useEffect(() => {
    if (!items.some((it) => it.art)) return;
    const start = () => import("./ServiceArt").then((m) => m.warm()).catch(() => {});
    const id = window.requestIdleCallback ? requestIdleCallback(start, { timeout: 3000 }) : setTimeout(start, 1500);
    return () => (window.cancelIdleCallback ? cancelIdleCallback(id) : clearTimeout(id));
  }, [items]);

  useEffect(() => {
    let id;
    const tick = () => {
      const p = pos.current;
      id = requestAnimationFrame(tick);
      // Settled: skip the style write so idle frames cost nothing while scrolling.
      if (Math.abs(p.x - p.cx) < 0.1 && Math.abs(p.y - p.cy) < 0.1) return;
      p.cx += (p.x - p.cx) * 0.12;
      p.cy += (p.y - p.cy) * 0.12;
      if (box.current) box.current.style.transform = `translate3d(${p.cx}px, ${p.cy}px, 0)`;
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
            onPointerEnter={() => {
              setActive(i);
              setSeen((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
            }}
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
                <WhenNear>
                  <ServiceArt kind={s.art} />
                </WhenNear>
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
        <div
          className={`absolute h-[17rem] w-[25rem] overflow-hidden rounded-[10px] bg-paper shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active === null ? "-rotate-4 scale-[0.85] opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        >
          {items.map((it, i) => (
            <div key={it.title} className={`absolute inset-0 transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}>
              {!seen.has(i) ? null : it.art ? (
                <ServiceArt kind={it.art} paused={active !== i} />
              ) : it.video ? (
                <Video src={it.video} poster={it.poster} />
              ) : (
                <Image src={it.image} alt="" fill sizes="25rem" className="object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
