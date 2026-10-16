import { ImageResponse } from "next/og";
import { LOGO } from "@/data/site";

export const alt = "Design Next, web design and development studio in Mumbai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f3f0ea",
          color: "#0a0a0a",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -140,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle at 40% 40%, #e4200f 0%, #b3160a 45%, rgba(228,32,15,0) 70%)",
            display: "flex",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO.black} width={300} height={56} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 0.95, letterSpacing: -4, fontWeight: 600, display: "flex", flexWrap: "wrap" }}>
            Websites that make you the&nbsp;<span style={{ color: "#e4200f", fontStyle: "italic" }}>obvious</span>&nbsp;choice.
          </div>
          <div style={{ marginTop: 32, fontSize: 28, color: "rgba(10,10,10,0.6)", display: "flex" }}>
            Web design &amp; Next.js development · Mumbai &amp; worldwide
          </div>
        </div>
      </div>
    ),
    size
  );
}
