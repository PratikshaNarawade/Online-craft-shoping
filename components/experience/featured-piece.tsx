import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { inr } from "@/lib/format";
import { TiltCard } from "@/components/store/tilt-card";

export function FeaturedPiece({ product }: { product: Product }) {
  return (
    <section className="grid items-center gap-10 px-5 py-24 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-32">
      <div>
        <p className="text-[11px] tracking-[0.42em] text-hot uppercase">A piece from the studio</p>
        <h2 className="mt-4 font-sans text-5xl font-extrabold uppercase tracking-[-0.04em] md:text-7xl">{product.name}</h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-fog">{product.description}</p>
        <p className="mt-6 font-serif text-3xl text-hot">{inr(product.price)}</p>
        <Link href={`/products/${product.slug}`} className="btn-hot mt-10">
          View this creation
        </Link>
      </div>
      <TiltCard>
        <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40vw" />
        </div>
      </TiltCard>
    </section>
  );
}
