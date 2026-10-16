"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import Snap from "lenis/snap";

let lenis = null;
let snap = null;

const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

/** Registers every [data-snap] element on the page as a soft snap point. */
function registerSnaps() {
  if (!snap) return () => {};
  const els = Array.from(document.querySelectorAll("[data-snap]"));
  return snap.addElements(els, { align: "start" });
}

export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.85,
      smoothWheel: true,
    });

    // Proximity: only settles when you stop close to a section start, never mid-flow.
    snap = new Snap(lenis, {
      type: "proximity",
      distanceThreshold: "22%",
      debounce: 380,
      duration: 1.15,
      easing: easeOutQuint,
    });

    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      snap.destroy();
      lenis.destroy();
      snap = null;
      lenis = null;
    };
  }, []);

  useEffect(() => {
    scrollToTop();
    // wait for the new page to lay out before collecting its snap points
    let remove = () => {};
    const t = setTimeout(() => (remove = registerSnaps()), 400);
    return () => {
      clearTimeout(t);
      remove();
    };
  }, [pathname]);

  return children;
}
