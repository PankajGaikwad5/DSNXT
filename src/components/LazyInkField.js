"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const InkField = dynamic(() => import("./InkField"), { ssr: false });

/**
 * InkField pulls in three.js and compiles shaders, so it starts once the page has
 * loaded and the browser is idle. Until then the plain paper background shows, so
 * first paint stays fast. A bottom fade blends the ink into the next section.
 */
export default function LazyInkField(props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idle;
    const go = () => setReady(true);
    const arm = () => {
      idle = window.requestIdleCallback ? requestIdleCallback(go, { timeout: 600 }) : setTimeout(go, 200);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      if (window.cancelIdleCallback) cancelIdleCallback(idle);
      else clearTimeout(idle);
      window.removeEventListener("load", arm);
    };
  }, []);

  return (
    <>
      {ready ? <InkField {...props} /> : <div className="absolute inset-0 bg-paper" aria-hidden="true" />}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper via-paper/70 to-transparent md:h-28"
        aria-hidden="true"
      />
    </>
  );
}
