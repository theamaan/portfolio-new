import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { caseStudies, type CaseStudySlug } from "@/lib/case-studies";

export const runtime = "edge";
export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function WorkOGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in caseStudies)) notFound();
  const cs = caseStudies[slug as CaseStudySlug];
  const metrics = (cs as { metrics?: { value: string; label: string }[] }).metrics ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0b0c",
          color: "#edeae3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "serif",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, color: "#8a867e", letterSpacing: 3, textTransform: "uppercase" }}>
          <span>aman · ullah</span>
          <span>case study {cs.number}</span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, lineHeight: 1.02, letterSpacing: -2, maxWidth: 900 }}>
            {cs.title}
          </div>
          <div style={{ fontSize: 24, color: "#8a867e", maxWidth: 760, lineHeight: 1.5 }}>
            {cs.oneLiner}
          </div>
        </div>

        {/* Metrics strip */}
        <div style={{ display: "flex", gap: 48, borderTop: "1px solid #2a2a2d", paddingTop: 32 }}>
          {metrics.slice(0, 3).map((m) => (
            <div key={m.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 32, color: "#b8ff5c" }}>{m.value}</span>
              <span style={{ fontSize: 14, color: "#8a867e", textTransform: "uppercase", letterSpacing: 2 }}>{m.label}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end" }}>
            <span style={{ fontSize: 16, color: "#8a867e" }}>amanullah.dev/work/{slug}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
