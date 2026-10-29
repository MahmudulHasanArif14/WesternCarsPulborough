import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { business } from "@/lib/business";

export const alt = `${business.name} — ${business.tagline} across ${business.region}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Cache only the disk read, not the ImageResponse — an ImageResponse is not
 * serialisable, so `"use cache"` has to sit on something that returns a plain
 * string. With the read cached there is no uncached IO left in the route, so
 * Cache Components can prerender it instead of serving it per request.
 *
 * Satori (which renders this) supports a subset of CSS: every element needs an
 * explicit `display`, and there is no cascade, so each style is set inline.
 */
async function logoDataUrl() {
  "use cache";
  const logo = await readFile(join(process.cwd(), "public", "logo.png"));
  return `data:image/png;base64,${logo.toString("base64")}`;
}

const col = { display: "flex", flexDirection: "column" } as const;
const row = { display: "flex", alignItems: "center" } as const;

export default async function OpengraphImage() {
  const logoSrc = await logoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          ...col,
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#101F3F",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, #2E4C86 0%, #1C3463 45%, #101F3F 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ ...row, gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={104} height={104} alt="" />
          <div style={col}>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
              Western Cars
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: "#C6CBD2",
                marginTop: 8,
              }}
            >
              {business.tagline} · {business.region}
            </div>
          </div>
        </div>

        <div style={col}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Taxi &amp; private hire
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginTop: 8,
            }}
          >
            across West Sussex
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#C6CBD2",
              marginTop: 24,
            }}
          >
            Fixed-price airport transfers · Available {business.hours}
          </div>
        </div>

        <div style={{ ...row, gap: 20 }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#1864DC",
              color: "#FFFFFF",
              fontSize: 30,
              fontWeight: 700,
              padding: "16px 28px",
              borderRadius: 4,
            }}
          >
            {business.phone}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#C6CBD2" }}>
            westerncarspulborough.co.uk
          </div>
        </div>
      </div>
    ),
    size,
  );
}
