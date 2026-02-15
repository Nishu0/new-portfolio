import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nisarg Thakkar is a Web3 Developer based out of India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = await readFile(
    join(process.cwd(), "public/font/Articulat_CF_Demi_Bold.ttf")
  );

  const catData = await readFile(
    join(process.cwd(), "public/favicon.png")
  );
  const catBase64 = `data:image/png;base64,${catData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Articulat",
        }}
      >
        <img
          src={catBase64}
          width={64}
          height={64}
          style={{ marginBottom: 32 }}
        />
        <div
          style={{
            fontSize: 48,
            color: "#fff",
            lineHeight: 1.3,
            maxWidth: 700,
          }}
        >
          Nisarg Thakkar is a Web3 Developer based out of India
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Articulat",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
