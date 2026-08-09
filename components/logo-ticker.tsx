import Image from "next/image";
import { logos } from "@/lib/data";

export function LogoTicker() {
  const items = [...logos, ...logos];

  return (
    <section className="logosSection">
      <p className="logosLabel">
        Building with these teams, ecosystems, and communities
      </p>
      <div className="tickerWrapper">
        <div className="tickerTrack">
          {items.map((logo, i) =>
            logo.src ? (
              <Image
                key={i}
                className="tickerImage"
                src={logo.src}
                alt={logo.name}
                width={logo.width ?? 200}
                height={logo.height ?? 60}
                style={{ height: logo.display ?? 38 }}
              />
            ) : (
              <span className="tickerItem" key={i}>
                {logo.name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
