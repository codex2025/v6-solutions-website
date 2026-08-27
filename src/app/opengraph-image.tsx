import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#070b14",
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #3b82f6, #38d0e0 55%, #22e6a8)",
            }}
          />
          <div style={{ fontSize: 32, color: "#e7ebf3", fontWeight: 600 }}>V6 Solutions</div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 64,
            fontWeight: 600,
            color: "#e7ebf3",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Hardware. Software. Design.
        </div>
        <div style={{ marginTop: 28, fontSize: 28, color: "#97a2b8", maxWidth: 820 }}>
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
