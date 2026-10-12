"use client";

import { useEffect, useRef } from "react";

const BEATS = [
  { n: "01", title: "The hand", body: "Every bloom is twisted by hand. No moulds. No shortcuts. Time, colour, and wire." },
  { n: "02", title: "The last", body: "These flowers never wilt. Gift them once — they stay as they were given." },
  { n: "03", title: "The gift", body: "A handwritten note tucks into every parcel. The object is only half the offering." },
  { n: "04", title: "The rite", body: "Shubh Labh, diyas, haar, asan — festive pieces made to live on a pooja shelf, not a landfill." },
];

export function ExpertiseThread() {
  const ref = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = ref.current;
    const p = path.current;
    if (!el || !p) return;
    const length = p.getTotalLength();
    p.style.strokeDasharray = `${length}`;
    p.style.strokeDashoffset = `${length}`;

    function onScroll() {
      if (!el || !p) return;
      const r = el.getBoundingClientRect();
      const view = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (view - r.top) / (r.height + view * 0.4)));
      p.style.strokeDashoffset = `${length * (1 - progress)}`;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="expertise" ref={ref} className="relative overflow-hidden px-5 py-28 md:px-10 md:py-36">
      <p className="text-[11px] tracking-[0.42em] text-gold uppercase">Our core expertise</p>
      <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl">
        A stem has no border.
        <span className="italic text-gold"> Only direction.</span>
      </h2>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-mist">
        Connectivity here is not a map. It is a single baby-pink thread — the wire inside every chenille stem — running from
        the studio to a shelf, a braid, a doorway.
      </p>

      <svg className="pointer-events-none absolute top-24 right-[-10%] hidden h-[70%] w-[55%] lg:block" viewBox="0 0 600 700" fill="none" aria-hidden>
        <path
          ref={path}
          d="M 80 40 C 220 80, 40 180, 260 240 S 80 380, 340 430 S 180 560, 480 640"
          stroke="#e891a8"
          strokeWidth="1.4"
        />
      </svg>

      <div className="mt-20 grid gap-16 md:grid-cols-2 lg:grid-cols-4">
        {BEATS.map((b) => (
          <article key={b.n} className="relative border-t border-gold/25 pt-6">
            <p className="font-serif text-4xl text-gold/50">{b.n}</p>
            <h3 className="mt-4 font-serif text-3xl italic">{b.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-mist">{b.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
