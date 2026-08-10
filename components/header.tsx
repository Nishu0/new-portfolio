"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "headerScrolled" : ""}`}>
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
