import { notFound } from "next/navigation";
import Link from "next/link";
import { readDb } from "@/lib/db";
import { ProductDetail } from "@/components/store/product-detail";
import { ProductRail } from "@/components/store/product-rail";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await readDb();
  const product = db.products.find((p) => p.slug === slug);
  if (!product) notFound();
  const related = db.products
    .filter((p) => p.id !== product.id && p.collectionIds.some((id) => product.collectionIds.includes(id)))
    .slice(0, 8);

  return (
    <div className="px-5 py-12 md:px-10 md:py-16">
      <Link href="/shop" className="text-sm text-muted hover:text-hot">
        ← Continue shopping
      </Link>
      <div className="mt-8">
        <ProductDetail product={product} />
      </div>
      {related.length > 0 && (
        <div className="-mx-5 mt-8 md:-mx-10">
          <ProductRail title="You may also like" products={related} />
        </div>
      )}
    </div>
  );
}
