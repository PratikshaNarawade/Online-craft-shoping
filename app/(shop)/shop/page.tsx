import { Suspense } from "react";
import { readDb } from "@/lib/db";
import { catalogColors, filterProducts } from "@/lib/filter-products";
import { ActiveFilterChips, ShopFilters } from "@/components/store/shop-filters";
import { ProductGrid } from "@/components/store/product-grid";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    c?: string;
    sort?: string;
    q?: string;
    sale?: string;
    bestseller?: string;
    price?: string;
    color?: string;
  }>;
}) {
  const query = await searchParams;
  const db = await readDb();
  const products = filterProducts(db.products, db.collections, query);
  const colors = catalogColors(db.products).map((c) => c.id);

  return (
    <div className="px-5 py-14 md:px-10 md:py-16">
      <h1 className="text-center font-serif text-5xl md:text-6xl">
        {query.q?.trim() ? `Search: ${query.q.trim()}` : "Shop"}
      </h1>
      <p className="mt-3 text-center text-sm text-muted">{products.length} handmade pieces</p>

      <div className="mx-auto mt-10 max-w-[1400px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <Suspense>
            <ShopFilters collections={db.collections} colors={colors} />
          </Suspense>
          <div className="min-w-0 flex-1">
            <Suspense>
              <ActiveFilterChips collections={db.collections} colors={colors} />
            </Suspense>
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
