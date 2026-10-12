"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Bloom3D } from "@/components/store/bloom-3d";

export function WorldHero({
  image,
  floatImages,
}: {
  image: string;
  floatImages: string[];
}) {
  const stage = useRef<HTMLElement>(null);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
    el.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
  }

  return (
    <section
      ref={stage}
      onMouseMove={onMove}
      className="relative isolate min-h-[100svh] overflow-hidden [--mx:0] [--my:0]"
    >
      <div className="hero-drift absolute inset-[-10%]">
        <Image src={image} alt="" fill priority className="object-cover opacity-35" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(255,61,138,0.28),transparent_45%),linear-gradient(to_bottom,rgba(22,8,20,0.2),rgba(22,8,20,0.75)_70%,#160814)]" />

      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="particle absolute h-1.5 w-1.5 rounded-full bg-hot"
          style={{
            left: `${8 + ((i * 17) % 84)}%`,
            top: `${12 + ((i * 23) % 70)}%`,
            animationDelay: `${i * 0.35}s`,
            opacity: 0.45,
          }}
        />
      ))}

      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 800" fill="none" aria-hidden>
        <defs>
          <filter id="fuzzy">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
          </filter>
        </defs>
        <path
          d="M-20 520 C 160 480, 220 220, 480 300 S 780 620, 1220 240"
          stroke="#ff3d8a"
          strokeWidth="7"
          strokeLinecap="round"
          className="draw-stem fuzzy-stem opacity-80"
        />
        <path
          d="M-20 540 C 180 500, 240 250, 500 320 S 800 640, 1220 260"
          stroke="#f3c2d0"
          strokeWidth="3"
          strokeLinecap="round"
          className="draw-stem opacity-50"
        />
      </svg>

      {floatImages[0] && (
        <div
          className="absolute top-[18%] right-[8%] hidden h-40 w-28 overflow-hidden rounded-[2rem] opacity-80 shadow-2xl md:block"
          style={{ transform: "translate3d(calc(var(--mx) * -24px), calc(var(--my) * 18px), 0) rotate(8deg)" }}
        >
          <Image src={floatImages[0]} alt="" fill className="object-cover" sizes="120px" />
        </div>
      )}
      {floatImages[1] && (
        <div
          className="absolute bottom-[22%] left-[6%] hidden h-32 w-32 overflow-hidden rounded-full opacity-75 shadow-2xl lg:block"
          style={{ transform: "translate3d(calc(var(--mx) * 20px), calc(var(--my) * -14px), 0)" }}
        >
          <Image src={floatImages[1]} alt="" fill className="object-cover" sizes="128px" />
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-28 md:flex-row md:items-end md:justify-between md:px-10 md:pb-20">
        <div className="max-w-4xl">
          <p className="reveal text-[11px] tracking-[0.42em] text-hot uppercase">Pratiksha&apos;s Craft</p>
          <h1 className="reveal reveal-d1 mt-5 font-sans text-[14vw] font-extrabold leading-[0.78] tracking-[-0.06em] uppercase md:text-[7.4rem]">
            Make
            <br />
            something
            <br />
            <span className="italic text-hot">impossible.</span>
          </h1>
          <p className="reveal reveal-d2 mt-8 max-w-md text-base text-fog">
            Simple pipe cleaners. Infinite possibilities.
          </p>
          <div className="reveal reveal-d3 mt-10 flex flex-wrap items-center gap-6">
            <Link href="/shop" className="btn-hot">
              Explore creations
            </Link>
            <Link href="#create" className="btn-ghost">
              Start creating
            </Link>
          </div>
        </div>
        <div
          className="mt-10 hidden will-change-transform md:block"
          style={{ transform: "translate3d(calc(var(--mx) * 30px), calc(var(--my) * 16px), 0)" }}
        >
          <Bloom3D />
        </div>
      </div>
    </section>
  );
}
