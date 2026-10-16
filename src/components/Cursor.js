"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small dot that trails the pointer. Elements with data-cursor="View"
 * (or any label) expand it into a labelled disc.
 */
export default function Cursor() {
  const dot = useRef(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let x = -100, y = -100, cx = -100, cy = -100, id;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target.closest?.("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : "");
    };
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      id = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    id = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(id);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[70]" aria-hidden="true">
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-signal text-white transition-[width,height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          label ? "h-24 w-24" : "h-2.5 w-2.5"
        }`}
      >
        <span className={`t-label transition-opacity duration-300 ${label ? "opacity-100" : "opacity-0"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
