"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

let lenis = null;
let snap = null;

const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

const listeners = new Set();

/** Calls fn(lenis, snap) once smooth scrolling is running; fn may return a cleanup. Returns an unsubscribe. */
export function onLenis(fn) {
  const entry = { fn, cleanup: null };
  listeners.add(entry);
  if (lenis) entry.cleanup = fn(lenis, snap);
  return () => {
    listeners.delete(entry);
    entry.cleanup?.();
  };
}

let removeSnaps = () => {};

/** Registers every [data-snap] element on the page as a soft snap point, replacing the last set. */
function registerSnaps() {
  removeSnaps();
  removeSnaps = () => {};
  if (!snap) return;
  const els = Array.from(document.querySelectorAll("[data-snap]"));
  removeSnaps = snap.addElements(els, { align: "start" });
}

export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Imported here so phones, which never use it, don't download it.
    let id;
    let cancelled = false;
    Promise.all([import("lenis"), import("lenis/snap")]).then(([{ default: Lenis }, { default: Snap }]) => {
      if (cancelled) return;
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
      registerSnaps();
      listeners.forEach((l) => (l.cleanup = l.fn(lenis, snap)));

      const raf = (t) => {
        lenis.raf(t);
        id = requestAnimationFrame(raf);
      };
      id = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
      removeSnaps = () => {};
      listeners.forEach((l) => {
        l.cleanup?.();
        l.cleanup = null;
      });
      snap?.destroy();
      lenis?.destroy();
      snap = null;
      lenis = null;
    };
  }, []);

  useEffect(() => {
    scrollToTop();
    // wait for the new page to lay out before collecting its snap points
    const t = setTimeout(registerSnaps, 400);
    return () => {
      clearTimeout(t);
      removeSnaps();
      removeSnaps = () => {};
    };
  }, [pathname]);

  return children;
}
