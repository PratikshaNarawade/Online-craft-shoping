import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { readDb } from "@/lib/db";
import { catalogColors, filterProducts } from "@/lib/filter-products";
import { ActiveFilterChips, ShopFilters } from "@/components/store/shop-filters";
import { ProductGrid } from "@/components/store/product-grid";

const HAIR_SLUG_ALIASES = new Set([
  "chenille-stem-hair-clips",
  "chenille-stem-hair-bands",
  "hair-clip-and-band-sets",
]);

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    sort?: string;
    sale?: string;
    bestseller?: string;
    price?: string;
    color?: string;
  }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const db = await readDb();
  if (HAIR_SLUG_ALIASES.has(slug)) redirect("/collections/chenille-stem-hair-accessories");
  if (slug === "ganpati-haar" || slug === "ganpati-har") redirect("/collections/haar-garlands");
  if (slug === "home-decor" || slug === "home-décor") redirect("/collections/wall-decor");
  const collection = db.collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const baseProducts = db.products.filter((p) => p.collectionIds.includes(collection.id));
  const products = filterProducts(baseProducts, db.collections, query);
  const colors = catalogColors(baseProducts).map((c) => c.id);
  const basePath = `/collections/${slug}`;

  return (
    <div>
      <section className="relative isolate min-h-[48vh] overflow-hidden md:min-h-[58vh]">
        <Image src={collection.image} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-charcoal/25" />
        <div className="relative flex min-h-[48vh] flex-col items-center justify-end px-5 py-12 text-center text-white md:min-h-[58vh] md:py-16">
          <h1 className="font-serif text-5xl md:text-7xl">{collection.name}</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90">{collection.description}</p>
        </div>
      </section>
      <div className="px-5 py-14 md:px-10 md:py-16">
        <p className="mb-8 text-center text-sm text-muted">{products.length} pieces in this collection</p>
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <Suspense>
              <ShopFilters collections={db.collections} colors={colors} basePath={basePath} hideCollections />
            </Suspense>
            <div className="min-w-0 flex-1">
              <Suspense>
                <ActiveFilterChips collections={db.collections} colors={colors} basePath={basePath} hideCollections />
              </Suspense>
              <ProductGrid products={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
