"use client";

import { useEffect } from "react";

const EVENTS = ["pointerdown", "touchstart", "scroll", "keydown", "wheel"];

/**
 * Google Analytics, loaded on the visitor's first interaction. gtag.js is ~180KB and
 * blocks the main thread for ~400ms on a phone, so it stays out of the first load.
 * Calls made before then queue in dataLayer and are sent once it arrives.
 */
export default function Analytics({ gaId }) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId);

    const load = () => {
      EVENTS.forEach((e) => window.removeEventListener(e, load));
      const s = document.createElement("script");
      s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      s.async = true;
      document.head.appendChild(s);
    };
    EVENTS.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    return () => EVENTS.forEach((e) => window.removeEventListener(e, load));
  }, [gaId]);

  return null;
}
