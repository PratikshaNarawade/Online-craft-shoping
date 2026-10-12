"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { inr } from "@/lib/format";
import { useCart } from "./cart-provider";

export function FeaturedSpotlight({ product, kicker }: { product: Product; kicker?: string }) {
  const { add } = useCart();
  const sale = product.compareAt > product.price;

  return (
    <section className="grid items-center gap-8 bg-white px-5 py-16 md:grid-cols-2 md:gap-12 md:px-10 md:py-20">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-[1.5rem] bg-pink-lite">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="50vw" />
      </div>
      <div className="mx-auto max-w-md text-center md:text-left">
        {kicker && <p className="text-[11px] tracking-[0.28em] text-hot uppercase">{kicker}</p>}
        <h2 className="mt-3 font-serif text-5xl md:text-6xl">{product.name}</h2>
        <p className="mt-5 font-serif text-2xl">
          {sale && <span className="mr-3 text-muted line-through">{inr(product.compareAt)}</span>}
          <span className={sale ? "text-hot" : ""}>{inr(product.price)}</span>
        </p>
        {sale && <p className="mt-2 text-[11px] tracking-[0.18em] text-hot uppercase">Sale</p>}
        <p className="mt-6 text-sm leading-relaxed text-muted">{product.description}</p>
        <p className="mt-3 text-xs text-muted">Taxes included. Discounts applied at checkout.</p>
        <div className="mt-8 flex flex-col items-center gap-3 md:items-start">
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={() => add(product.id)}
            className="btn-hot w-full max-w-xs disabled:opacity-40"
          >
            {product.stock <= 0 ? "Sold out" : "Add to cart"}
          </button>
          <Link href={`/products/${product.slug}`} className="text-sm underline underline-offset-4">
            View full details
          </Link>
        </div>
      </div>
    </section>
  );
}
