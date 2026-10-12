import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

export function ProductRail({
  title,
  href,
  products,
}: {
  title: string;
  href?: string;
  products: Product[];
}) {
  if (!products.length) return null;

  return (
    <section className="px-5 py-14 md:px-10 md:py-16">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-serif text-4xl md:text-5xl">{title}</h2>
        {href && (
          <Link href={href} className="text-[11px] tracking-[0.2em] text-hot uppercase">
            View all
          </Link>
        )}
      </div>
      <div className="hide-scrollbar mt-8 flex snap-x gap-4 overflow-x-auto pb-4 md:gap-6">
        {products.map((p) => (
          <div key={p.id} className="w-[68vw] shrink-0 snap-start sm:w-52 md:w-60">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
