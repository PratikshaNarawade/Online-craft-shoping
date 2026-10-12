"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Bloom3D } from "@/components/store/bloom-3d";

export function ImmersiveHero({ image }: { image: string }) {
  const stage = useRef<HTMLElement>(null);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--mx", String(x));
    el.style.setProperty("--my", String(y));
  }

  return (
    <section
      ref={stage}
      onMouseMove={onMove}
      className="relative isolate min-h-[100svh] overflow-hidden [--mx:0] [--my:0]"
    >
      <div className="hero-drift absolute inset-[-8%] will-change-transform">
        <Image src={image} alt="" fill priority className="object-cover opacity-45" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(244,184,200,0.55),transparent_42%),linear-gradient(to_bottom,rgba(61,31,42,0.15),rgba(253,232,238,0.45)_55%,#fde8ee)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(540px circle at calc(50% + var(--mx) * 180px) calc(42% + var(--my) * 120px), rgba(244,184,200,0.45), transparent 55%)",
        }}
      />

      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-50" viewBox="0 0 1200 800" fill="none" aria-hidden>
        <path
          d="M-40 640 C 180 520, 260 220, 520 280 S 860 620, 1240 180"
          stroke="#e891a8"
          strokeWidth="1.2"
          className="draw-stem"
        />
      </svg>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-28 md:flex-row md:items-end md:justify-between md:px-10 md:pb-20">
        <div className="max-w-3xl">
          <p className="reveal text-[11px] tracking-[0.42em] text-gold uppercase">Pratiksha&apos;s Craft</p>
          <h1 className="reveal reveal-d1 mt-5 font-serif text-7xl leading-[0.78] tracking-[-0.04em] text-bone md:text-[8rem]">
            Borders
            <span className="mt-1 block italic text-gold">Redefined.</span>
          </h1>
          <p className="reveal reveal-d2 mt-8 max-w-md text-sm leading-relaxed text-mist md:text-base">
            Fuzzy edges. No season. Handmade blooms that refuse a hard outline — and never ask for water.
          </p>
          <div className="reveal reveal-d3 mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/shop"
              className="rounded-full bg-blush px-8 py-3.5 text-[11px] tracking-[0.22em] text-ink uppercase"
            >
              Enter the atelier
            </Link>
            <Link href="#expertise" className="text-[11px] tracking-[0.22em] text-gold uppercase">
              Follow the stem
            </Link>
          </div>
        </div>

        <div
          className="mt-12 hidden will-change-transform md:block"
          style={{
            transform:
              "translate3d(calc(var(--mx) * 28px), calc(var(--my) * 18px), 0) rotateY(calc(var(--mx) * 12deg))",
          }}
        >
          <Bloom3D />
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[10px] tracking-[0.32em] text-gold/70 uppercase md:block">
        Scroll to unbind
      </p>
    </section>
  );
}
