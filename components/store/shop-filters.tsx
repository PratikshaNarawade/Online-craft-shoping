"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Collection } from "@/lib/types";
import { COLOR_PALETTE, PRICE_BUCKETS } from "@/lib/filter-products";

function colorLabel(id: string) {
  return COLOR_PALETTE.find((c) => c.id === id)?.label ?? id;
}

const HIDDEN_COLLECTIONS = new Set(["c-curtain"]);

type FilterState = {
  sort: string;
  q: string;
  sale: boolean;
  bestseller: boolean;
  price: string;
  selectedCollections: string[];
  selectedColors: string[];
  activeCount: number;
};

function useFilterState(collections: Collection[], hideCollections: boolean): FilterState {
  const params = useSearchParams();
  const sort = params.get("sort") ?? "new";
  const q = params.get("q") ?? "";
  const sale = params.get("sale") === "1";
  const bestseller = params.get("bestseller") === "1";
  const price = params.get("price") ?? "";
  const selectedCollections = useMemo(() => {
    const raw = params.get("c") ?? "";
    return raw ? raw.split(",").filter(Boolean) : [];
  }, [params]);

  const selectedColors = useMemo(() => {
    const raw = params.get("color") ?? "";
    return raw ? raw.split(",").filter(Boolean) : [];
  }, [params]);

  const activeCount =
    (hideCollections ? 0 : selectedCollections.length) +
    selectedColors.length +
    (sale ? 1 : 0) +
    (bestseller ? 1 : 0) +
    (price ? 1 : 0);

  return { sort, q, sale, bestseller, price, selectedCollections, selectedColors, activeCount };
}

function useFilterActions(basePath: string) {
  const router = useRouter();
  const params = useSearchParams();

  function push(next: URLSearchParams) {
    const query = next.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
  }

  function baseParams() {
    return new URLSearchParams(params.toString());
  }

  const selectedCollections = useMemo(() => {
    const raw = params.get("c") ?? "";
    return raw ? raw.split(",").filter(Boolean) : [];
  }, [params]);

  const q = params.get("q") ?? "";
  const price = params.get("price") ?? "";

  const selectedColors = useMemo(() => {
    const raw = params.get("color") ?? "";
    return raw ? raw.split(",").filter(Boolean) : [];
  }, [params]);

  return {
    setSort(value: string) {
      const next = baseParams();
      if (value && value !== "new") next.set("sort", value);
      else next.delete("sort");
      push(next);
    },
    toggleCollection(slug: string) {
      const next = baseParams();
      const set = new Set(selectedCollections);
      if (set.has(slug)) set.delete(slug);
      else set.add(slug);
      const value = [...set].join(",");
      if (value) next.set("c", value);
      else next.delete("c");
      push(next);
    },
    toggleColor(color: string) {
      const next = baseParams();
      const set = new Set(selectedColors);
      if (set.has(color)) set.delete(color);
      else set.add(color);
      const value = [...set].join(",");
      if (value) next.set("color", value);
      else next.delete("color");
      push(next);
    },
    toggleFlag(key: "sale" | "bestseller") {
      const next = baseParams();
      const on = params.get(key) === "1";
      if (on) next.delete(key);
      else next.set(key, "1");
      push(next);
    },
    setPrice(id: string) {
      const next = baseParams();
      if (price === id) next.delete("price");
      else next.set("price", id);
      push(next);
    },
    clearAll() {
      const next = new URLSearchParams();
      if (q) next.set("q", q);
      push(next);
    },
    removeChip(type: "sale" | "bestseller" | "price" | "collection" | "color", value?: string) {
      const next = baseParams();
      if (type === "sale") next.delete("sale");
      else if (type === "bestseller") next.delete("bestseller");
      else if (type === "price") next.delete("price");
      else if (type === "collection" && value) {
        const set = new Set(selectedCollections);
        set.delete(value);
        const joined = [...set].join(",");
        if (joined) next.set("c", joined);
        else next.delete("c");
      }
      else if (type === "color" && value) {
        const set = new Set(selectedColors);
        set.delete(value);
        const joined = [...set].join(",");
        if (joined) next.set("color", joined);
        else next.delete("color");
      }
      push(next);
    },
  };
}

type ShopFiltersProps = {
  collections: Collection[];
  colors: string[];
  basePath?: string;
  hideCollections?: boolean;
};

export function ActiveFilterChips({ collections, colors, basePath = "/shop", hideCollections = false }: ShopFiltersProps) {
  const { sale, bestseller, price, selectedCollections, selectedColors } = useFilterState(collections, hideCollections);
  const { removeChip, clearAll } = useFilterActions(basePath);

  const chips = [
    ...(hideCollections ? [] : selectedCollections.map((slug) => {
      const col = collections.find((c) => c.slug === slug);
      return col
        ? { key: `c-${slug}`, label: col.name, onRemove: () => removeChip("collection", slug) }
        : null;
    })),
    ...(selectedColors.map((key) => {
      const label = colorLabel(key);
      return { key: `color-${key}`, label, onRemove: () => removeChip("color", key) };
    })),
    sale ? { key: "sale", label: "On sale", onRemove: () => removeChip("sale") } : null,
    bestseller ? { key: "bestseller", label: "Bestsellers", onRemove: () => removeChip("bestseller") } : null,
    price
      ? {
          key: "price",
          label: PRICE_BUCKETS.find((b) => b.id === price)?.label ?? "Price",
          onRemove: () => removeChip("price"),
        }
      : null,
  ].filter(Boolean) as { key: string; label: string; onRemove: () => void }[];

  if (!chips.length) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs text-charcoal hover:border-hot hover:text-hot"
        >
          {chip.label}
          <span aria-hidden className="text-muted">×</span>
        </button>
      ))}
      <button type="button" onClick={clearAll} className="text-xs text-hot hover:underline">
        Clear all
      </button>
    </div>
  );
}

export function ShopFilters({ collections, colors, basePath = "/shop", hideCollections = false }: ShopFiltersProps) {
  const [open, setOpen] = useState(false);
  const { sort, activeCount, sale, bestseller, price, selectedCollections, selectedColors } = useFilterState(collections, hideCollections);
  const { setSort, toggleCollection, toggleColor, toggleFlag, setPrice, clearAll } = useFilterActions(basePath);

  const visibleCollections = collections.filter((c) => !HIDDEN_COLLECTIONS.has(c.id));

  const panel = (
    <div className="space-y-8">
      {!hideCollections && (
        <div>
          <h2 className="text-[11px] font-semibold tracking-[0.2em] text-charcoal uppercase">Collection</h2>
          <ul className="mt-3 space-y-2">
            {visibleCollections.map((c) => (
              <li key={c.id}>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
                  <input
                    type="checkbox"
                    checked={selectedCollections.includes(c.slug)}
                    onChange={() => toggleCollection(c.slug)}
                    className="h-4 w-4 rounded border-line accent-hot"
                  />
                  {c.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="text-[11px] font-semibold tracking-[0.2em] text-charcoal uppercase">Price</h2>
        <ul className="mt-3 space-y-2">
          {PRICE_BUCKETS.map((bucket) => (
            <li key={bucket.id}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
                <input
                  type="radio"
                  name="price"
                  checked={price === bucket.id}
                  onChange={() => setPrice(bucket.id)}
                  className="h-4 w-4 border-line accent-hot"
                />
                {bucket.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-[11px] font-semibold tracking-[0.2em] text-charcoal uppercase">Color</h2>
        <ul className="mt-3 space-y-2">
          {colors.map((c) => (
            <li key={c}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(c)}
                  onChange={() => toggleColor(c)}
                  className="h-4 w-4 rounded border-line accent-hot"
                />
                {colorLabel(c)}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-[11px] font-semibold tracking-[0.2em] text-charcoal uppercase">More filters</h2>
        <ul className="mt-3 space-y-2">
          <li>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={sale}
                onChange={() => toggleFlag("sale")}
                className="h-4 w-4 rounded border-line accent-hot"
              />
              On sale
            </label>
          </li>
          <li>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={() => toggleFlag("bestseller")}
                className="h-4 w-4 rounded border-line accent-hot"
              />
              Bestsellers
            </label>
          </li>
        </ul>
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => { clearAll(); setOpen(false); }}
          className="text-[11px] tracking-[0.16em] text-hot uppercase hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[11px] tracking-[0.16em] uppercase"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
          </svg>
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-line bg-white px-4 py-2 text-[11px] tracking-[0.12em] uppercase"
        >
          <option value="new">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-28">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-charcoal">Filters</h2>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-line bg-white px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase"
            >
              <option value="new">Newest</option>
              <option value="price-asc">Low → High</option>
              <option value="price-desc">High → Low</option>
            </select>
          </div>
          {panel}
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-charcoal/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 flex h-full w-[min(92vw,20rem)] flex-col bg-paper shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-serif text-2xl">Filters</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-muted">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">{panel}</div>
            <div className="border-t border-line p-5">
              <button type="button" onClick={() => setOpen(false)} className="btn-hot w-full">
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
