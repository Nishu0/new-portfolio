import { CatSprite } from "@/components/cat-sprite";
import { LocalTime } from "@/components/local-time";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footerLinks">
        <a href={profile.links.x} target="_blank" rel="noreferrer">
          X
        </a>
        <a href={profile.links.resume} target="_blank" rel="noreferrer">
          Resume
        </a>
      </div>
      <p className="copyright">
        Made with <span aria-hidden="true">❤️</span> &amp;{" "}
        <span aria-hidden="true">🤖</span> in Bangalore{" "}
        <span aria-hidden="true">🇮🇳</span> · <LocalTime />
        <CatSprite />
      </p>
    </footer>
  );
}
