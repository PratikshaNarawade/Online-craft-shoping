import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { inr } from "@/lib/format";
import { TiltCard } from "@/components/store/tilt-card";

export function FeaturedStage({ product }: { product: Product }) {
  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
      <p className="text-[11px] tracking-[0.42em] text-gold uppercase">Always glowing</p>
      <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-script text-4xl text-blush md:text-5xl">a single piece, held in space</p>
          <h2 className="mt-4 font-serif text-6xl leading-[0.88] md:text-8xl">{product.name}</h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-mist">{product.description}</p>
          <p className="mt-6 font-serif text-3xl text-gold">{inr(product.price)}</p>
          <Link
            href={`/products/${product.slug}`}
            className="mt-10 inline-block rounded-full border border-gold/40 px-8 py-3.5 text-[11px] tracking-[0.22em] uppercase"
          >
            View the piece
          </Link>
        </div>
        <TiltCard>
          <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.55)]">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40vw" />
            <div className="absolute inset-0 ring-1 ring-gold/30 ring-inset" />
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
