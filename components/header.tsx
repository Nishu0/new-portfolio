import Image from "next/image";
import { profile } from "@/lib/data";

export function Header() {
  return (
    <header className="header">
      <div className="headerIdentity">
        <Image
          className="headerAvatar"
          src={profile.avatar}
          alt={profile.name}
          width={34}
          height={34}
        />
        <div>
          <div className="headerName">{profile.name}</div>
          <div className="headerTitle">{profile.title}</div>
        </div>
      </div>
      <a className="btn" href="#contact">
        Get in touch
      </a>
    </header>
  );
}
