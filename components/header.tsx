"use client";

import Image from "next/image";
import Link from "next/link";
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
      <Link className="headerIdentity" href="/">
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
      </Link>
      <nav className="headerNav">
        <Link className="headerLink" href="/writing">
          Writing
        </Link>
        <Link className="btn" href="/#contact">
          Get in touch
        </Link>
      </nav>
    </header>
  );
}
