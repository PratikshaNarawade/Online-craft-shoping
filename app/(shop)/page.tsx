import { readDb } from "@/lib/db";
import { HomeHero } from "@/components/store/home-hero";
import { CollectionCarousel } from "@/components/store/collection-carousel";
import { FeaturedSpotlight } from "@/components/store/featured-spotlight";
import { ProductRail } from "@/components/store/product-rail";
import { WhyChoose } from "@/components/store/why-choose";
import { TrustRow } from "@/components/store/trust-row";
import { HomeFaq } from "@/components/store/home-faq";
import type { Product } from "@/lib/types";

function inCollection(products: Product[], id: string, take = 12) {
  return products.filter((p) => p.collectionIds.includes(id)).slice(0, take);
}

export default async function HomePage() {
  const db = await readDb();
  const featured =
    db.products.find((p) => p.id === db.content.featuredProductId) || db.products.find((p) => p.featured);
  const second =
    db.products.find((p) => p.collectionIds.includes("c-wall") && p.id !== featured?.id) ||
    db.products.find((p) => p.collectionIds.includes("c-hair-clip") && p.id !== featured?.id);
  const budget = [...db.products].sort((a, b) => a.price - b.price).slice(0, 12);

  const slides = [
    { src: "/craft/hero-bouquet.png", title: "Forever blooms", href: "/collections/chenille-stem-bouquets" },
    { src: db.content.heroImage, title: "Handmade to gift", href: "/shop" },
    { src: "/craft/forever-flowers.png", title: "Pipe-cleaner bouquets", href: "/collections/chenille-stem-bouquets" },
    { src: "/craft/hair-clip-01.jpg", title: "Hair accessories", href: "/collections/chenille-stem-hair-accessories" },
    { src: "/craft/home-decor.png", title: "Home décor", href: "/collections/wall-decor" },
    { src: "/craft/flower-pot-01.jpg", title: "Potted flowers", href: "/collections/chenille-stem-flower-pots" },
  ];

  const bouquetCol = db.collections.find((c) => c.id === "c-bouquet");
  const hairCol = db.collections.find((c) => c.id === "c-hair-clip");
  const wallCol = db.collections.find((c) => c.id === "c-wall");
  const curtainCol = db.collections.find((c) => c.id === "c-curtain");
  const haarCol = db.collections.find((c) => c.id === "c-haar");

  return (
    <div>
      <HomeHero slides={slides} />
      <CollectionCarousel collections={db.collections} />
      {featured && <FeaturedSpotlight product={featured} kicker="Studio favourite" />}
      <ProductRail title="Budget buys" href="/shop?sort=price-asc" products={budget} />
      {second && <FeaturedSpotlight product={second} kicker="Handmade for home" />}
      {hairCol && (
        <ProductRail
          title={hairCol.name}
          href={`/collections/${hairCol.slug}`}
          products={inCollection(db.products, hairCol.id)}
        />
      )}
      <WhyChoose title="Why choose Pratiksha's Craft?" body={db.content.story.body} image={db.content.story.image} />
      {bouquetCol && (
        <ProductRail
          title={bouquetCol.name}
          href={`/collections/${bouquetCol.slug}`}
          products={inCollection(db.products, bouquetCol.id)}
        />
      )}
      {haarCol && (
        <ProductRail
          title={haarCol.name}
          href={`/collections/${haarCol.slug}`}
          products={inCollection(db.products, haarCol.id)}
        />
      )}
      {wallCol && (
        <ProductRail
          title={wallCol.name}
          href={`/collections/${wallCol.slug}`}
          products={inCollection(db.products, wallCol.id)}
        />
      )}
      {curtainCol && (
        <ProductRail
          title={curtainCol.name}
          href={`/collections/${curtainCol.slug}`}
          products={inCollection(db.products, curtainCol.id)}
        />
      )}
      <TrustRow items={db.content.why} />
      <HomeFaq faqs={db.faqs} />
    </div>
  );
}
