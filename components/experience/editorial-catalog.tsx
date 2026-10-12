import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { inr } from "@/lib/format";
import { AddButton } from "@/components/store/add-button";

export function EditorialCatalog({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
      {products.map((p, i) => {
        const hero = i % 7 === 0;
        const tall = i % 7 === 3;
        return (
          <article
            key={p.id}
            className={
              hero
                ? "col-span-2 md:col-span-4 md:row-span-2"
                : tall
                  ? "col-span-1 md:col-span-2"
                  : "col-span-1 md:col-span-2"
            }
          >
            <Link href={`/products/${p.slug}`} className="group block">
              <div
                className={`relative overflow-hidden ${hero ? "aspect-[4/5] md:aspect-[16/11]" : tall ? "aspect-[3/5]" : "aspect-[3/4]"}`}
              >
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  sizes={hero ? "70vw" : "30vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-80" />
                <div className="absolute right-0 bottom-0 left-0 p-4 text-paper md:p-6">
                  <h3 className={`font-sans font-extrabold uppercase leading-tight tracking-[-0.04em] ${hero ? "text-3xl md:text-5xl" : "text-lg md:text-2xl"}`}>
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-hot">{inr(p.price)}</p>
                </div>
              </div>
            </Link>
            <AddButton productId={p.id} disabled={p.stock <= 0} />
          </article>
        );
      })}
    </div>
  );
}
