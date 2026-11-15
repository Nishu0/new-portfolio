import { Reveal } from "@/components/reveal";
import { PhotoStrip } from "@/components/photo-strip";
import { InstagramIcon, LinkedInIcon, MailIcon, XIcon } from "@/components/icons";
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
          <nav className="heroLinks" aria-label="Find me elsewhere">
            <a className="heroLink" href={profile.links.x} target="_blank" rel="noreferrer">
              <XIcon size={14} />
              Twitter
            </a>
            <a className="heroLink" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon size={14} />
              LinkedIn
            </a>
            <a className="heroLink" href={profile.links.instagram} target="_blank" rel="noreferrer">
              <InstagramIcon size={15} />
              Instagram
            </a>
            {profile.email && (
              <a className="heroLink" href={`mailto:${profile.email}`}>
                <MailIcon size={15} />
                Email
              </a>
            )}
          </nav>
        </Reveal>
      </div>
      <Reveal delay={220}>
        <PhotoStrip />
      </Reveal>
    </section>
  );
}
