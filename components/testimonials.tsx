"use client";

import Image from "next/image";
import { useState } from "react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];
  const move = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);

  return (
    <section className="section">
      <h2 className="sectionLabel">What people say</h2>

      <blockquote className="bubble">
        <p className="quote" key={index}>
          {current.quote}
        </p>
      </blockquote>

      <div className="testimonialFooterRow">
        <div className="controls">
          <button
            className="navButton"
            aria-label="Previous testimonial"
            onClick={() => move(-1)}
          >
            ←
          </button>
          <div className="dots">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                className={`dot ${i === index ? "dotActive" : ""}`}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            className="navButton"
            aria-label="Next testimonial"
            onClick={() => move(1)}
          >
            →
          </button>
        </div>

        <footer className="person">
          <div className="personText">
            <div className="personName">{current.name}</div>
            <div className="personRole">{current.role}</div>
            {current.source && (
              <a
                className="personRole"
                href={current.source}
                target="_blank"
                rel="noreferrer"
              >
                Verified ↗
              </a>
            )}
          </div>
          {current.avatar && (
            <Image
              className="personAvatar"
              src={current.avatar}
              alt=""
              width={56}
              height={56}
            />
          )}
        </footer>
      </div>
    </section>
  );
}
