"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
 * Real-time ink-in-water. A small GPU fluid solver (stable fluids:
 * advect → curl/vorticity → divergence → pressure → project) renders red ink
 * on paper. The pointer stirs it; drops fall on their own so it is never still.
 */

const baseVert = /* glsl */ `
uniform vec2 texelSize;
varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
void main(){
  vUv = uv;
  vL = vUv - vec2(texelSize.x, 0.); vR = vUv + vec2(texelSize.x, 0.);
  vT = vUv + vec2(0., texelSize.y); vB = vUv - vec2(0., texelSize.y);
  gl_Position = vec4(position.xy, 0., 1.);
}`;

const head = /* glsl */ `
precision highp float;
varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
`;

const FRAG = {
  splat: `${head}
uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius;
void main(){
  vec2 p = vUv - point; p.x *= aspectRatio;
  vec3 s = exp(-dot(p, p) / radius) * color;
  gl_FragColor = vec4(texture2D(uTarget, vUv).xyz + s, 1.);
}`,
  advect: `${head}
uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 velTexel; uniform float dt; uniform float dissipation;
void main(){
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * velTexel;
  gl_FragColor = texture2D(uSource, coord) / (1. + dissipation * dt);
}`,
  divergence: `${head}
uniform sampler2D uVelocity;
void main(){
  float L = texture2D(uVelocity, vL).x; float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y; float B = texture2D(uVelocity, vB).y;
  vec2 C = texture2D(uVelocity, vUv).xy;
  if (vL.x < 0.) L = -C.x; if (vR.x > 1.) R = -C.x;
  if (vT.y > 1.) T = -C.y; if (vB.y < 0.) B = -C.y;
  gl_FragColor = vec4(.5 * (R - L + T - B), 0., 0., 1.);
}`,
  curl: `${head}
uniform sampler2D uVelocity;
void main(){
  float L = texture2D(uVelocity, vL).y; float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x; float B = texture2D(uVelocity, vB).x;
  gl_FragColor = vec4(.5 * (R - L - T + B), 0., 0., 1.);
}`,
  vorticity: `${head}
uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
void main(){
  float L = texture2D(uCurl, vL).x; float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x; float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 f = .5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  f /= length(f) + .0001; f *= curl * C; f.y *= -1.;
  vec2 v = texture2D(uVelocity, vUv).xy + f * dt;
  gl_FragColor = vec4(clamp(v, -1000., 1000.), 0., 1.);
}`,
  pressure: `${head}
uniform sampler2D uPressure; uniform sampler2D uDivergence;
void main(){
  float L = texture2D(uPressure, vL).x; float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x; float B = texture2D(uPressure, vB).x;
  float d = texture2D(uDivergence, vUv).x;
  gl_FragColor = vec4((L + R + B + T - d) * .25, 0., 0., 1.);
}`,
  gradient: `${head}
uniform sampler2D uPressure; uniform sampler2D uVelocity;
void main(){
  float L = texture2D(uPressure, vL).x; float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x; float B = texture2D(uPressure, vB).x;
  vec2 v = texture2D(uVelocity, vUv).xy - vec2(R - L, T - B);
  gl_FragColor = vec4(v, 0., 1.);
}`,
  clear: `${head}
uniform sampler2D uTexture; uniform float value;
void main(){ gl_FragColor = value * texture2D(uTexture, vUv); }`,
  display: `${head}
uniform sampler2D uDye; uniform vec3 paper; uniform vec3 ink; uniform vec3 wash; uniform vec3 accent; uniform vec3 accentWash; uniform float uTime;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float amt(vec2 uv){ vec2 s = texture2D(uDye, uv).rg; return s.x + s.y; }
void main(){
  // Two pigments: r is the main ink, g the accent ink.
  vec2 s = texture2D(uDye, vUv).rg;
  float d = s.x + s.y;
  float dl = amt(vL); float dr = amt(vR); float dt = amt(vT); float db = amt(vB);
  // Sharpened so where pigments meet they marble instead of mixing to mud.
  float t = smoothstep(.35, .65, s.y / (d + .0001));
  // Matte pigment, not wet liquid: thin areas go to a lighter wash, dense areas
  // stay flat, and only edges darken slightly, like watercolour.
  float a = (1. - exp(-d * 1.1)) * .9;
  vec3 c = mix(mix(wash, accentWash, t), mix(ink, accent, t), smoothstep(.05, .7, a));
  float edge = clamp(length(vec2(dr - dl, dt - db)) * 6., 0., 1.);
  c *= 1. - .12 * edge;
  vec3 col = mix(paper, c, a);
  col += (hash(vUv * 900. + uTime) - .5) * .025;
  gl_FragColor = vec4(col, 1.);
}`,
};

// Shader writes straight to the canvas, so pass sRGB values untouched.
const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

function target(w, h) {
  return new THREE.WebGLRenderTarget(w, h, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    depthBuffer: false,
  });
}

function doubleTarget(w, h) {
  let a = target(w, h);
  let b = target(w, h);
  return {
    get read() { return a; },
    get write() { return b; },
    swap() { [a, b] = [b, a]; },
    texel: new THREE.Vector2(1 / w, 1 / h),
    dispose() { a.dispose(); b.dispose(); },
  };
}

// sumi: indigo-black ink with occasional red drops, like marbled paper. signal: all red.
// The original glossy red/maroon version lives in InkFieldClassic.
const PALETTES = {
  sumi: { ink: "#1d2333", wash: "#6b7387", accent: "#e4200f", accentWash: "#f0603a", accentChance: 0.3 },
  signal: { ink: "#e4200f", wash: "#f0603a", accent: "#e4200f", accentWash: "#f0603a", accentChance: 0 },
};

/**
 * @param intensity "hero" drops often and big; "calm" is gentler for page headers.
 * @param zone where self-falling drops land, in uv space [xMin, xMax, yMin, yMax].
 * @param palette key of PALETTES; a `?ink=` query param overrides it for comparing.
 */
export default function InkField({ intensity = "hero", zone = [0.45, 0.95, 0.45, 0.95], palette = "sumi", className = "" }) {
  const host = useRef(null);
  const zoneKey = zone.join(",");

  useEffect(() => {
    const el = host.current;
    const colors = PALETTES[new URLSearchParams(window.location.search).get("ink")] || PALETTES[palette] || PALETTES.sumi;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the paper background shows instead
    }
    renderer.setPixelRatio(1);
    renderer.autoClear = false;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    scene.add(quad);

    const mat = (frag, uniforms) =>
      new THREE.ShaderMaterial({
        vertexShader: baseVert,
        fragmentShader: frag,
        uniforms: { texelSize: { value: new THREE.Vector2() }, ...uniforms },
        depthTest: false,
        depthWrite: false,
      });

    const M = {
      splat: mat(FRAG.splat, { uTarget: { value: null }, aspectRatio: { value: 1 }, color: { value: new THREE.Vector3() }, point: { value: new THREE.Vector2() }, radius: { value: 0 } }),
      advect: mat(FRAG.advect, { uVelocity: { value: null }, uSource: { value: null }, velTexel: { value: new THREE.Vector2() }, dt: { value: 0 }, dissipation: { value: 0 } }),
      divergence: mat(FRAG.divergence, { uVelocity: { value: null } }),
      curl: mat(FRAG.curl, { uVelocity: { value: null } }),
      vorticity: mat(FRAG.vorticity, { uVelocity: { value: null }, uCurl: { value: null }, curl: { value: 30 }, dt: { value: 0 } }),
      pressure: mat(FRAG.pressure, { uPressure: { value: null }, uDivergence: { value: null } }),
      gradient: mat(FRAG.gradient, { uPressure: { value: null }, uVelocity: { value: null } }),
      clear: mat(FRAG.clear, { uTexture: { value: null }, value: { value: 0.8 } }),
      display: mat(FRAG.display, {
        uDye: { value: null },
        uTime: { value: 0 },
        paper: { value: rgb("#f3f0ea") },
        ink: { value: rgb(colors.ink) },
        wash: { value: rgb(colors.wash) },
        accent: { value: rgb(colors.accent) },
        accentWash: { value: rgb(colors.accentWash) },
      }),
    };

    let width = el.clientWidth;
    let height = el.clientHeight;
    renderer.setSize(width, height, false);

    const simRes = small ? 96 : 128;
    const dyeRes = small ? 384 : 768;
    const dims = (res) => {
      const aspect = width / height;
      return aspect > 1 ? [Math.round(res * aspect), res] : [res, Math.round(res / aspect)];
    };
    const [sw, sh] = dims(simRes);
    const [dw, dh] = dims(dyeRes);
    const velocity = doubleTarget(sw, sh);
    const dye = doubleTarget(dw, dh);
    const pressure = doubleTarget(sw, sh);
    const divergence = target(sw, sh);
    const curl = target(sw, sh);

    const blit = (material, out, texel) => {
      material.uniforms.texelSize.value.copy(texel);
      quad.material = material;
      renderer.setRenderTarget(out);
      renderer.render(scene, camera);
    };

    const splat = (x, y, dx, dy, amount, radius, accent = false) => {
      const aspect = width / height;
      const r = (radius / 100) * (aspect > 1 ? aspect : 1);
      const s = M.splat.uniforms;
      s.aspectRatio.value = aspect;
      s.point.value.set(x, y);
      s.radius.value = r;

      s.uTarget.value = velocity.read.texture;
      s.color.value.set(dx, dy, 0);
      blit(M.splat, velocity.write, velocity.texel);
      velocity.swap();

      s.uTarget.value = dye.read.texture;
      s.color.value.set(accent ? 0 : amount, accent ? amount : 0, 0);
      blit(M.splat, dye.write, dye.texel);
      dye.swap();
    };

    const hero = intensity === "hero";
    const drop = (big = false) => {
      const [x0, x1, y0, y1] = zoneKey.split(",").map(Number);
      const x = x0 + Math.random() * (x1 - x0);
      const y = y0 + Math.random() * (y1 - y0);
      // Any direction, so drops bloom outward instead of reading as drips
      const angle = Math.random() * Math.PI * 2;
      const force = (hero ? 900 : 550) * (big ? 1.4 : 1);
      splat(x, y, Math.cos(angle) * force, Math.sin(angle) * force, big ? 1.5 : 0.9, big ? 0.6 : 0.35, Math.random() < colors.accentChance);
    };

    const step = (dt) => {
      M.curl.uniforms.uVelocity.value = velocity.read.texture;
      blit(M.curl, curl, velocity.texel);

      const v = M.vorticity.uniforms;
      v.uVelocity.value = velocity.read.texture;
      v.uCurl.value = curl.texture;
      v.dt.value = dt;
      blit(M.vorticity, velocity.write, velocity.texel);
      velocity.swap();

      M.divergence.uniforms.uVelocity.value = velocity.read.texture;
      blit(M.divergence, divergence, velocity.texel);

      M.clear.uniforms.uTexture.value = pressure.read.texture;
      blit(M.clear, pressure.write, velocity.texel);
      pressure.swap();

      M.pressure.uniforms.uDivergence.value = divergence.texture;
      for (let i = 0; i < 14; i++) {
        M.pressure.uniforms.uPressure.value = pressure.read.texture;
        blit(M.pressure, pressure.write, velocity.texel);
        pressure.swap();
      }

      const g = M.gradient.uniforms;
      g.uPressure.value = pressure.read.texture;
      g.uVelocity.value = velocity.read.texture;
      blit(M.gradient, velocity.write, velocity.texel);
      velocity.swap();

      const a = M.advect.uniforms;
      a.velTexel.value.copy(velocity.texel);
      a.dt.value = dt;
      a.uVelocity.value = velocity.read.texture;
      a.uSource.value = velocity.read.texture;
      a.dissipation.value = 0.35;
      blit(M.advect, velocity.write, velocity.texel);
      velocity.swap();

      a.uVelocity.value = velocity.read.texture;
      a.uSource.value = dye.read.texture;
      a.dissipation.value = hero ? 0.32 : 0.45;
      blit(M.advect, dye.write, dye.texel);
      dye.swap();
    };

    // Pointer stirs the ink. Listen on window so overlaid text never blocks it.
    const pointer = { x: 0, y: 0, moved: false, inited: false };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      if (!pointer.inited) {
        pointer.x = x;
        pointer.y = y;
        pointer.inited = true;
        return;
      }
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      pointer.x = x;
      pointer.y = y;
      const speed = Math.hypot(dx, dy);
      if (speed < 0.0004) return;
      splat(x, y, dx * 6000, dy * 6000, Math.min(speed * 26, 0.9), 0.32);
    };
    const onTouch = (e) => e.touches[0] && onMove(e.touches[0]);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    const onResize = () => {
      width = el.clientWidth;
      height = el.clientHeight;
      renderer.setSize(width, height, false);
    };
    window.addEventListener("resize", onResize);

    // Opening bloom so the canvas is alive on first paint
    drop(true);
    setTimeout(() => drop(true), 450);
    setTimeout(() => drop(false), 1100);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    let raf;
    let last = performance.now();
    let nextDrop = last + 2200;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 1 / 60);
      last = now;
      if (!reduced && now > nextDrop) {
        drop(Math.random() < 0.3);
        nextDrop = now + (hero ? 1800 : 3200) + Math.random() * 2200;
      }
      step(dt);
      M.display.uniforms.uDye.value = dye.read.texture;
      M.display.uniforms.uTime.value = now * 0.001;
      blit(M.display, null, dye.texel);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      [velocity, dye, pressure].forEach((t) => t.dispose());
      divergence.dispose();
      curl.dispose();
      Object.values(M).forEach((m) => m.dispose());
      quad.geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [intensity, zoneKey, palette]);

  return <div ref={host} className={`absolute inset-0 overflow-hidden bg-paper ${className}`} aria-hidden="true" />;
}
