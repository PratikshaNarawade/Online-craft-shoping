"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Collection, Product } from "@/lib/types";
import { inr } from "@/lib/format";

export function HeaderSearch({ inline = false }: { inline?: boolean }) {
  const router = useRouter();
  const box = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products ?? []);
        setCollections(d.collections ?? []);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    return products
      .filter((p) => {
        const colNames = collections
          .filter((c) => p.collectionIds.includes(c.id))
          .map((c) => c.name.toLowerCase())
          .join(" ");
        return (
          p.name.toLowerCase().includes(needle) ||
          p.description.toLowerCase().includes(needle) ||
          colNames.includes(needle)
        );
      })
      .slice(0, 6);
  }, [q, products, collections]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setOpen(false);
    setQ("");
    router.push(`/shop?q=${encodeURIComponent(query)}`);
  }

  const dropdown = (open || (inline && q.trim().length >= 2)) && (
    <div className={`${inline ? "absolute left-0 right-0 top-full z-50 mt-1" : "absolute right-0 top-full z-50 mt-3 w-[min(92vw,22rem)]"} rounded-2xl border border-line bg-white p-3 shadow-xl`}>
      {hits.length > 0 && (
        <ul className="max-h-80 overflow-y-auto">
          {hits.map((p) => (
            <li key={p.id}>
              <Link
                href={`/products/${p.slug}`}
                onClick={() => { setOpen(false); setQ(""); }}
                className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-pink-lite"
              >
                <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md bg-pink-lite">
                  <Image src={p.images[0]} alt="" fill className="object-cover" sizes="40px" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm text-charcoal">{p.name}</span>
                  <span className="text-xs text-muted">{inr(p.price)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {q.trim().length >= 2 && hits.length === 0 && (
        <p className="px-2 py-3 text-sm text-muted">No pieces match that search.</p>
      )}
    </div>
  );

  if (inline) {
    return (
      <div ref={box} className="relative">
        <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16.2 16.2 21 21" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bouquets, haar, pots…"
            className="w-full border-0 bg-transparent text-sm text-charcoal outline-none placeholder:text-muted"
          />
        </form>
        {dropdown}
      </div>
    );
  }

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen((v) => !v)}
        className="hover:text-hot"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16.2 16.2 21 21" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 z-50 mt-3 w-[min(92vw,22rem)] rounded-2xl border border-line bg-white p-3 shadow-xl">
          <form onSubmit={onSubmit}>
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search bouquets, haar, pots…"
              className="w-full rounded-full border border-line px-4 py-2.5 text-sm text-charcoal"
            />
          </form>
          {q.trim().length >= 2 && (
            <>
              {hits.length > 0 ? (
                <ul className="mt-2 max-h-80 overflow-y-auto">
                  {hits.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={() => { setOpen(false); setQ(""); }}
                        className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-pink-lite"
                      >
                        <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md bg-pink-lite">
                          <Image src={p.images[0]} alt="" fill className="object-cover" sizes="40px" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm text-charcoal">{p.name}</span>
                          <span className="text-xs text-muted">{inr(p.price)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 px-2 text-sm text-muted">No pieces match that search.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
