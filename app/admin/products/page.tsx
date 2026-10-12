"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Collection, Product } from "@/lib/types";
import { inr } from "@/lib/format";

const empty = (collectionIds: string[] = []): Partial<Product> => ({
  name: "",
  slug: "",
  description: "",
  details: "",
  price: 0,
  compareAt: 0,
  images: [""],
  collectionIds,
  stock: 0,
  featured: false,
  bestseller: false,
});

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [edit, setEdit] = useState<Partial<Product> | null>(null);
  const [collectionId, setCollectionId] = useState("all");

  async function load() {
    const r = await fetch("/api/admin/products");
    const d = await r.json();
    setProducts(d.products ?? []);
    setCollections(d.collections ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!edit) return;
    const images = String(edit.images?.[0] || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const payload = { ...edit, images, price: Number(edit.price), compareAt: Number(edit.compareAt), stock: Number(edit.stock) };
    await fetch("/api/admin/products", {
      method: edit.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setEdit(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of collections) {
      map.set(c.id, products.filter((p) => p.collectionIds.includes(c.id)).length);
    }
    return map;
  }, [collections, products]);

  const groups = useMemo(() => {
    const selected = collectionId === "all" ? collections : collections.filter((c) => c.id === collectionId);
    const sections = selected
      .map((c) => ({
        collection: c,
        items:
          collectionId === "all"
            ? products.filter((p) => p.collectionIds[0] === c.id)
            : products.filter((p) => p.collectionIds.includes(c.id)),
      }))
      .filter((g) => g.items.length);

    if (collectionId === "all") {
      const uncategorized = products.filter((p) => !p.collectionIds.length);
      if (uncategorized.length) {
        sections.push({
          collection: {
            id: "uncategorized",
            name: "Uncategorized",
            slug: "",
            description: "",
            image: "",
            featured: false,
          },
          items: uncategorized,
        });
      }
    }
    return sections;
  }, [collectionId, collections, products]);

  function collectionLabel(p: Product) {
    const names = collections.filter((c) => p.collectionIds.includes(c.id)).map((c) => c.name);
    return names.join(", ") || "—";
  }

  function productRows(items: Product[]) {
    return items.map((p) => (
      <tr key={p.id} className="border-b border-line">
        <td className="px-4 py-3">{p.name}</td>
        <td className="hidden md:table-cell">{collectionLabel(p)}</td>
        <td>{inr(p.price)}</td>
        <td>{p.stock}</td>
        <td className="space-x-3 px-4 text-right">
          <button type="button" className="text-hot underline" onClick={() => setEdit(p)}>
            Edit
          </button>
          <button type="button" className="text-muted underline hover:text-hot" onClick={() => remove(p.id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="admin-h1">Products</h1>
        <button
          type="button"
          onClick={() => setEdit(empty(collectionId === "all" ? [] : [collectionId]))}
          className="admin-btn"
        >
          New
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCollectionId("all")}
          className={`rounded-full border px-3 py-1.5 text-xs ${
            collectionId === "all" ? "border-hot bg-hot text-white" : "border-line bg-white text-charcoal hover:border-hot"
          }`}
        >
          All ({products.length})
        </button>
        {collections.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCollectionId(c.id)}
            className={`rounded-full border px-3 py-1.5 text-xs ${
              collectionId === c.id ? "border-hot bg-hot text-white" : "border-line bg-white text-charcoal hover:border-hot"
            }`}
          >
            {c.name} ({counts.get(c.id) ?? 0})
          </button>
        ))}
      </div>

      {edit && (
        <form onSubmit={save} className="admin-card mt-6 grid gap-3 p-5 md:grid-cols-2">
          <input className="border border-line px-3 py-2" placeholder="Name" value={edit.name || ""} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
          <input className="border border-line px-3 py-2" placeholder="Slug" value={edit.slug || ""} onChange={(e) => setEdit({ ...edit, slug: e.target.value })} />
          <input className="border border-line px-3 py-2" type="number" placeholder="Price" value={edit.price ?? 0} onChange={(e) => setEdit({ ...edit, price: Number(e.target.value) })} />
          <input className="border border-line px-3 py-2" type="number" placeholder="Compare at" value={edit.compareAt ?? 0} onChange={(e) => setEdit({ ...edit, compareAt: Number(e.target.value) })} />
          <input className="border border-line px-3 py-2" type="number" placeholder="Stock" value={edit.stock ?? 0} onChange={(e) => setEdit({ ...edit, stock: Number(e.target.value) })} />
          <input className="border border-line px-3 py-2 md:col-span-2" placeholder="Image URLs, comma separated" value={(edit.images || []).join(", ")} onChange={(e) => setEdit({ ...edit, images: [e.target.value] })} />
          <textarea className="border border-line px-3 py-2 md:col-span-2" placeholder="Description" value={edit.description || ""} onChange={(e) => setEdit({ ...edit, description: e.target.value })} />
          <div className="flex flex-wrap gap-3 text-sm md:col-span-2">
            {collections.map((c) => (
              <label key={c.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={edit.collectionIds?.includes(c.id)}
                  onChange={(e) => {
                    const ids = new Set(edit.collectionIds || []);
                    if (e.target.checked) ids.add(c.id);
                    else ids.delete(c.id);
                    setEdit({ ...edit, collectionIds: [...ids] });
                  }}
                />
                {c.name}
              </label>
            ))}
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={!!edit.featured} onChange={(e) => setEdit({ ...edit, featured: e.target.checked })} />
              Featured
            </label>
          </div>
          <div className="flex gap-2 md:col-span-2">
            <button className="admin-btn">Save</button>
            <button type="button" onClick={() => setEdit(null)} className="text-xs text-muted underline hover:text-hot">
              Cancel
            </button>
          </div>
        </form>
      )}

      {groups.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No products in this collection yet.</p>
      ) : (
        groups.map((group) => (
          <section key={group.collection.id} className="mt-8">
            <h2 className="mb-3 font-serif text-2xl">
              {group.collection.name}
              <span className="ml-2 text-sm text-muted">({group.items.length})</span>
            </h2>
            <table className="admin-card w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs tracking-widest uppercase text-hot">
                  <th className="px-4 py-3">Name</th>
                  <th className="hidden md:table-cell">Collection</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th />
                </tr>
              </thead>
              <tbody>{productRows(group.items)}</tbody>
            </table>
          </section>
        ))
      )}
    </div>
  );
}
