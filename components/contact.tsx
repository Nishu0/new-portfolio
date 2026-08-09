import { CopyEmailButton } from "@/components/copy-email-button";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="contactColumns">
        <div>
          <h2 className="sectionLabel">Contact me</h2>
          <p className="contactIntro">{profile.contactIntro}</p>
        </div>
        <div className="contactActions">
          <a
            className="btn contactCta"
            href={profile.links.x}
            target="_blank"
            rel="noreferrer"
          >
            Get in touch
          </a>
          {profile.email && <CopyEmailButton email={profile.email} />}
          <div className="contactLinks">
            <a href={profile.links.x} target="_blank" rel="noreferrer">
              X
            </a>
            <a href={profile.links.resume} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
