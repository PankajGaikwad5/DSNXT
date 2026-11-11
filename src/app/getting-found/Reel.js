"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { FONTS, IMAGES, WORK, buildTimeline } from "./anim";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

// "|" breaks a line, *word* is the red italic accent.
// Read together they are one spoken story, carried across the scenes like subtitles.
const CAPTIONS = [
  "Nobody tells|you this about|having a *website.*",
  "Once mine went|live, my phone|kept *buzzing.*",
  "And no, it wasn’t|from *Instagram.*",
  "People found|my *website,*",
  "saw my work,|and just|*reached out.*",
  "Some from the|other side of|the *world.*",
  "So yeah.|Put your work|*online.*",
];

function Caption({ text, end, capRef }) {
  return (
    <div className={end ? "gf-cap gf-cap-end" : "gf-cap"} ref={capRef}>
      {text.split("|").map((line, i) => (
        <span className="gf-line" key={i}>
          {line.split(" ").map((w, j) => (
            <span className={w.startsWith("*") ? "gf-w gf-em" : "gf-w"} key={j}>
              {w.replace(/\*/g, "")}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

export default function Reel() {
  const caps = useRef([]);
  const endBrand = useRef(null);
  const tl = useRef(null);
  const [fontsReady, setFontsReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  // The phone, laptop and cards draw text and project screenshots onto canvases,
  // so the site fonts and the work images must be loaded first.
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    FONTS.sans = css.getPropertyValue("--font-schibsted").trim() || FONTS.sans;
    FONTS.serif = css.getPropertyValue("--font-newsreader").trim() || FONTS.serif;
    FONTS.mono = css.getPropertyValue("--font-geist-mono").trim() || FONTS.mono;
    Promise.all([
      document.fonts.load(`700 60px ${FONTS.sans}`),
      document.fonts.load(`400 60px ${FONTS.sans}`),
      document.fonts.load(`italic 500 60px ${FONTS.serif}`),
      document.fonts.load(`500 40px ${FONTS.mono}`),
      ...WORK.map(
        (name) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              IMAGES[name] = img;
              resolve();
            };
            img.onerror = resolve;
            img.src = `/work/${name}.webp`;
          }),
      ),
    ])
      .catch(() => {})
      .then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    if (!sceneReady) return;
    tl.current = buildTimeline({ caps: caps.current, endBrand: endBrand.current });

    const onKey = (e) => {
      if (e.key === "r" || e.key === "R") tl.current.restart();
      if (e.code === "Space") {
        e.preventDefault();
        tl.current.paused(!tl.current.paused());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      tl.current?.kill();
    };
  }, [sceneReady]);

  return (
    <div className="gf-page">
      <div className="gf-stage">
        <div className="gf-canvas" aria-hidden="true">
          {fontsReady && <Scene onReady={() => setSceneReady(true)} />}
        </div>

        <div className="gf-vignette" aria-hidden="true" />
        <div className="gf-scrim" aria-hidden="true" />

        {CAPTIONS.map((text, i) => (
          <Caption
            key={i}
            text={text}
            end={i === CAPTIONS.length - 1}
            capRef={(el) => void (caps.current[i] = el)}
          />
        ))}
        <p className="gf-end-brand" ref={endBrand}>
          designnext.co
        </p>
      </div>

      <p className="gf-help">
        <kbd>R</kbd> replay <kbd>Space</kbd> pause
      </p>
    </div>
  );
}
