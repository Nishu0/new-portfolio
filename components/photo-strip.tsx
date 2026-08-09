import Image from "next/image";
import { photos } from "@/lib/data";

export function PhotoStrip() {
  // Duplicated once so the -50% marquee loops seamlessly.
  const frames = [...photos, ...photos];

  return (
    <div className="stripWrapper">
      <div className="strip">
        {frames.map((photo, i) => (
          <div
            key={i}
            className="stripFrame"
            style={{
              width: photo.width,
              height: photo.height,
              transform: `rotate(${photo.rotate}deg)`,
            }}
          >
            <Image
              className="stripImage"
              src={photo.src}
              alt=""
              fill
              sizes={`${photo.width}px`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
