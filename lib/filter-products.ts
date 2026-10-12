import type { Collection, Product } from "@/lib/types";

export const PRICE_BUCKETS = [
  { id: "under-500", label: "Under ₹500", min: 0, max: 500 },
  { id: "500-1000", label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { id: "1000-2000", label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { id: "over-2000", label: "Above ₹2,000", min: 2000, max: Infinity },
] as const;

export const COLOR_PALETTE = [
  { id: "pink", label: "Pink", hex: "#ff6ba9", keywords: ["pink", "blush"] },
  { id: "red", label: "Red", hex: "#e23d3d", keywords: ["red"] },
  { id: "orange", label: "Orange", hex: "#f77f00", keywords: ["orange"] },
  { id: "yellow", label: "Yellow", hex: "#f4c430", keywords: ["yellow", "sunflower", "mustard"] },
  { id: "green", label: "Green", hex: "#3d7a4a", keywords: ["green"] },
  { id: "blue", label: "Blue", hex: "#3a7bd5", keywords: ["blue"] },
  { id: "purple", label: "Purple", hex: "#7b5ea7", keywords: ["purple", "lavender", "lilac", "violet"] },
  { id: "magenta", label: "Magenta", hex: "#d61a7a", keywords: ["magenta", "fuchsia"] },
  { id: "white", label: "White", hex: "#f7f4f0", keywords: ["white", "pearl", "ivory"] },
  { id: "cream", label: "Cream", hex: "#f3e0c8", keywords: ["cream", "beige"] },
  { id: "gold", label: "Gold", hex: "#c9a227", keywords: ["gold", "golden"] },
  { id: "peach", label: "Peach", hex: "#f4b183", keywords: ["peach", "coral"] },
  { id: "maroon", label: "Maroon", hex: "#7a1f2b", keywords: ["maroon", "wine"] },
  { id: "brown", label: "Brown", hex: "#8b5a2b", keywords: ["brown"] },
] as const;

export type ColorOption = {
  id: string;
  label: string;
  hex: string;
};

export type ShopQuery = {
  c?: string;
  sort?: string;
  q?: string;
  sale?: string;
  bestseller?: string;
  price?: string;
  color?: string;
};

function hasKeyword(haystack: string, keyword: string) {
  return new RegExp(`(?:^|[^a-z])${keyword}(?:[^a-z]|$)`, "i").test(haystack);
}

export function productColorIds(product: Product): string[] {
  if (product.colors?.length) {
    const allowed = new Set(COLOR_PALETTE.map((c) => c.id));
    return [...new Set(product.colors.map((c) => c.toLowerCase()).filter((c) => allowed.has(c)))];
  }

  const haystack = [product.name, product.slug, product.description, ...(product.images ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return COLOR_PALETTE.filter((color) => color.keywords.some((word) => hasKeyword(haystack, word))).map(
    (color) => color.id,
  );
}

export function catalogColors(products: Product[]): ColorOption[] {
  const present = new Set(products.flatMap(productColorIds));
  return COLOR_PALETTE.filter((c) => present.has(c.id)).map(({ id, label, hex }) => ({ id, label, hex }));
}

export function matchesPriceBucket(price: number, bucketId: string) {
  const bucket = PRICE_BUCKETS.find((b) => b.id === bucketId);
  if (!bucket) return true;
  if (bucket.id === "under-500") return price < 500;
  if (bucket.id === "over-2000") return price > 2000;
  return price >= bucket.min && price <= bucket.max;
}

export function filterProducts(
  products: Product[],
  collections: Collection[],
  query: ShopQuery,
) {
  let result = products;

  if (query.c) {
    const slugs = query.c.split(",").filter(Boolean);
    const colIds = slugs
      .map((slug) => collections.find((x) => x.slug === slug)?.id)
      .filter(Boolean) as string[];
    if (colIds.length) {
      result = result.filter((p) => colIds.some((id) => p.collectionIds.includes(id)));
    }
  }

  if (query.q?.trim()) {
    const needle = query.q.trim().toLowerCase();
    result = result.filter((p) => {
      const colNames = collections
        .filter((col) => p.collectionIds.includes(col.id))
        .map((col) => col.name.toLowerCase())
        .join(" ");
      return (
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        colNames.includes(needle)
      );
    });
  }

  if (query.sale === "1") {
    result = result.filter((p) => p.compareAt > p.price);
  }

  if (query.bestseller === "1") {
    result = result.filter((p) => p.bestseller);
  }

  if (query.price) {
    result = result.filter((p) => matchesPriceBucket(p.price, query.price!));
  }

  if (query.color) {
    const selected = query.color.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    if (selected.length) {
      result = result.filter((p) => productColorIds(p).some((id) => selected.includes(id)));
    }
  }

  if (query.sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
  else if (query.sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
  else result = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return result;
}
