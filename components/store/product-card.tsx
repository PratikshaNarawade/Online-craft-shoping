import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { inr } from "@/lib/format";
import { AddButton } from "./add-button";

export function ProductCard({ product }: { product: Product }) {
  const sale = product.compareAt > product.price;
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-pink-lite">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {sale && (
          <span className="absolute top-3 left-3 rounded-full bg-hot px-2.5 py-1 text-[10px] tracking-widest text-white uppercase">
            Sale
          </span>
        )}
        {product.stock <= 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] tracking-widest uppercase">
            Sold out
          </span>
        )}
      </Link>
      <div className="mt-3 text-center">
        <Link href={`/products/${product.slug}`} className="font-serif text-lg leading-snug">
          {product.name}
        </Link>
        <p className="mt-1 text-sm">
          {sale && <span className="mr-2 text-muted line-through">{inr(product.compareAt)}</span>}
          <span>{inr(product.price)}</span>
        </p>
        <AddButton productId={product.id} disabled={product.stock <= 0} />
      </div>
    </article>
  );
}
