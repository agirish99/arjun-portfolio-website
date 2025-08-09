import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          color: "white",
          background: "#0b0f14",
          width: "100%",
          height: "100%",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.7 }}>Portfolio</div>
        <div style={{ fontWeight: 800 }}>Arjun Girish</div>
      </div>
    ),
    { ...size }
  );
}
