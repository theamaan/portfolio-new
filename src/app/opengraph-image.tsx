import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aman Ullah — AI / LLM Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#8a867e", letterSpacing: 2, textTransform: "uppercase" }}>
          <span>aman · ullah</span>
          <span>ai / llm engineer</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 88, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>
            Most AI demos break in production.
          </div>
          <div style={{ fontSize: 88, lineHeight: 1.02, letterSpacing: -2, color: "#8a867e", maxWidth: 980 }}>
            I build the ones that don’t.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#8a867e" }}>
          <span>amanullah.dev</span>
          <span style={{ color: "#b8ff5c" }}>● chennai · open to roles</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
