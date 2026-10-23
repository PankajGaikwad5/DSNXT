import { ImageResponse } from "next/og";
import { LOGO } from "@/data/site";
import { getGuide, getGuides } from "@/lib/guides";

const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

/**
 * Share card for each guide, with its own title, so links on WhatsApp and LinkedIn read clearly.
 * A route (not opengraph-image.js) so the URL is fixed and can be named in metadata and schema.
 */
export async function GET(_req, { params }) {
  const { slug } = await params;
  const g = getGuide(slug);
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
            right: -260,
            bottom: -300,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle at 40% 40%, #e4200f 0%, #b3160a 45%, rgba(228,32,15,0) 70%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO.black} width={260} height={48} alt="" />
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#e4200f", display: "flex" }}>GUIDE</div>
        </div>
        <div style={{ fontSize: 68, lineHeight: 1.02, letterSpacing: -3, fontWeight: 600, display: "flex", maxWidth: 820 }}>
          {g?.title ?? "Design Next guides"}
        </div>
        <div style={{ fontSize: 26, color: "rgba(10,10,10,0.6)", display: "flex" }}>designnext.co/guides</div>
      </div>
    ),
    size
  );
}
