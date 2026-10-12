"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Collection } from "@/lib/types";

export function ProductToolbar({ collections }: { collections: Collection[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("c") ?? "";
  const sort = params.get("sort") ?? "new";

  function set(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/shop?${next.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hot/20 pb-6">
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <button
          type="button"
          onClick={() => set("c", "")}
            className={`text-[11px] tracking-[0.2em] uppercase ${!current ? "text-hot" : "text-muted hover:text-charcoal"}`}
        >
          All
        </button>
        {collections.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => set("c", c.slug)}
            className={`text-[11px] tracking-[0.2em] uppercase ${current === c.slug ? "text-hot" : "text-muted hover:text-charcoal"}`}
          >
            {c.name}
          </button>
        ))}
      </div>
      <select
        value={sort}
        onChange={(e) => set("sort", e.target.value)}
        className="border border-hot/25 bg-transparent px-3 py-2 text-[11px] tracking-[0.16em] uppercase"
      >
        <option value="new">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
