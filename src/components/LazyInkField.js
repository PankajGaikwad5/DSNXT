"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const InkField = dynamic(() => import("./InkField"), { ssr: false });

const EVENTS = ["pointermove", "pointerdown", "touchstart", "scroll", "keydown", "wheel"];

/**
 * InkField pulls in three.js and compiles shaders, so it starts only after the page
 * has loaded and the visitor interacts (or a few quiet seconds pass). Until then the
 * plain paper background shows, so first paint stays fast.
 */
export default function LazyInkField(props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer;
    const go = () => setReady(true);
    const arm = () => {
      EVENTS.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
      timer = setTimeout(go, 3500);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", arm);
      EVENTS.forEach((e) => window.removeEventListener(e, go));
    };
  }, []);

  return ready ? <InkField {...props} /> : <div className="absolute inset-0 bg-paper" aria-hidden="true" />;
}
