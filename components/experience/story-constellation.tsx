"use client";

import { useState } from "react";
import type { Review } from "@/lib/types";

const HOMES = [
  { x: "18%", y: "28%", place: "A pooja shelf" },
  { x: "62%", y: "22%", place: "A niece's braid" },
  { x: "78%", y: "58%", place: "A night window" },
  { x: "34%", y: "72%", place: "A work desk" },
];

export function StoryConstellation({ reviews }: { reviews: Review[] }) {
  const [active, setActive] = useState(0);
  const stories = reviews.slice(0, 4);

  return (
    <section className="relative overflow-hidden px-5 py-28 md:px-10">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-[11px] tracking-[0.42em] text-gold uppercase">Success stories</p>
          <h2 className="mt-4 font-serif text-5xl leading-[0.95] md:text-6xl">
            Not a globe.
            <span className="block italic text-gold">A constellation of homes.</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-mist">
            Cross-border, here, is the distance from the studio to a shelf. Movement is a bloom that never wilts.
          </p>
        </div>
        {stories[active] && (
          <blockquote className="max-w-md border-l border-gold/40 pl-6">
            <p className="font-serif text-2xl leading-snug md:text-3xl">&ldquo;{stories[active].body}&rdquo;</p>
            <footer className="mt-4 text-[11px] tracking-[0.22em] text-gold uppercase">{stories[active].name}</footer>
          </blockquote>
        )}
      </div>

      <div className="relative mt-16 h-[420px] overflow-hidden rounded-[2.5rem] border border-gold/30 bg-[radial-gradient(circle_at_center,rgba(244,184,200,0.45),transparent_55%)]">
        <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 800 420" fill="none" aria-hidden>
          <path d="M 80 180 C 220 40, 360 320, 520 140 S 720 80, 760 240" stroke="#e891a8" strokeWidth="1" />
          <path d="M 40 300 C 200 260, 280 80, 480 260 S 640 360, 780 120" stroke="#f4b8c8" strokeWidth="0.6" opacity="0.8" />
        </svg>
        {stories.map((r, i) => (
          <button
            key={r.id}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
            style={{ left: HOMES[i]?.x, top: HOMES[i]?.y }}
          >
            <span
              className={`block h-3 w-3 rounded-full ${active === i ? "bg-gold shadow-[0_0_22px_rgba(232,145,164,1)]" : "bg-blush"}`}
            />
            <span className={`mt-2 block text-[10px] tracking-[0.2em] uppercase ${active === i ? "text-gold" : "text-mist"}`}>
              {HOMES[i]?.place}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
