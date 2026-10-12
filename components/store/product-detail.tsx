"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { inr } from "@/lib/format";
import { useCart } from "./cart-provider";

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [idx, setIdx] = useState(0);
  const sale = product.compareAt > product.price;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-pink-lite">
          <Image
            src={product.images[idx] ?? product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className="mt-4 flex gap-2">
            {product.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIdx(i)}
                className={`relative h-16 w-14 overflow-hidden rounded-lg ${i === idx ? "ring-2 ring-hot" : "opacity-60"}`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        {sale && <p className="text-[11px] tracking-[0.28em] text-hot uppercase">Sale</p>}
        <h1 className="font-serif text-5xl md:text-6xl">{product.name}</h1>
        <p className="mt-5 font-serif text-2xl">
          {sale && <span className="mr-3 text-muted line-through">{inr(product.compareAt)}</span>}
          {inr(product.price)}
        </p>
        <p className="mt-2 text-xs text-muted">Taxes included. Shipping calculated at checkout.</p>
        <p className="mt-8 max-w-md leading-relaxed text-muted">{product.description}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{product.details}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4 rounded-full border border-line px-5 py-2">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={() => add(product.id, qty)}
            className="rounded-full bg-hot px-8 py-3 text-[11px] tracking-[0.2em] text-white uppercase disabled:opacity-40"
          >
            {product.stock <= 0 ? "Sold out" : "Add to cart"}
          </button>
        </div>
        <p className="mt-4 text-[11px] tracking-[0.16em] text-muted uppercase">
          {product.stock > 0 ? `${product.stock} in the studio` : "Currently unavailable"}
        </p>
      </div>
    </div>
  );
}
