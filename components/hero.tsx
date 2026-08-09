import { Reveal } from "@/components/reveal";
import { PhotoStrip } from "@/components/photo-strip";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section className="hero">
      <div className="heroInner">
        <Reveal>
          <h1 className="heroHeadline">{profile.headline}</h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="heroSubhead">{profile.subhead}</p>
        </Reveal>
        <Reveal delay={160}>
          <div className="heroCtaRow">
            <a className="btn" href="#contact">
              Get in touch
            </a>
            <p className="heroMeta">
              <svg
                className="heroMetaIcon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {profile.location}
            </p>
          </div>
        </Reveal>
      </div>
      <Reveal delay={220}>
        <PhotoStrip />
      </Reveal>
    </section>
  );
}
