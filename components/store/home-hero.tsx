"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HomeHero({
  slides,
}: {
  slides: { src: string; title: string; href: string }[];
}) {
  const [i, setI] = useState(0);
  const slide = slides[i] ?? slides[0];

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % slides.length), 5200);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (!slide) return null;

  return (
    <section className="relative isolate min-h-[78svh] overflow-hidden bg-pink-lite md:min-h-[88svh]">
      {slides.map((s, n) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-700 ${n === i ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.src}
            alt={s.title}
            fill
            priority={n === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent" />
      <div className="relative flex min-h-[78svh] flex-col items-center justify-end px-5 pb-16 text-center md:min-h-[88svh] md:pb-20">
        <p className="text-[11px] tracking-[0.32em] text-white uppercase">Handmade pipe-cleaner crafts</p>
        <h1 className="mt-3 font-serif text-5xl text-white md:text-7xl">{slide.title}</h1>
        <Link href={slide.href} className="btn-hot mt-8">
          Shop now
        </Link>
        <div className="mt-8 flex gap-2">
          {slides.map((s, n) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Slide ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-white" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
