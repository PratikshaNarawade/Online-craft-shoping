"use client";

import { useEffect, useState } from "react";
import type { Collection } from "@/lib/types";

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("/craft/hero-bouquet.png");

  async function load() {
    const r = await fetch("/api/admin/store");
    const d = await r.json();
    setCollections(d.collections ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function add() {
    await fetch("/api/admin/store", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addCollection: { name, description, image } }),
    });
    setName("");
    setDescription("");
    load();
  }

  async function saveAll() {
    await fetch("/api/admin/store", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collections }),
    });
  }

  return (
    <div>
      <h1 className="admin-h1">Collections</h1>
      <div className="admin-card mt-6 grid gap-3 p-5 md:grid-cols-3">
        <input className="border border-line px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border border-line px-3 py-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className="border border-line px-3 py-2" placeholder="Image path" value={image} onChange={(e) => setImage(e.target.value)} />
        <button type="button" onClick={add} className="admin-btn">
          Add collection
        </button>
      </div>
      <ul className="mt-8 space-y-4">
        {collections.map((c, i) => (
          <li key={c.id} className="admin-card grid gap-2 p-4 md:grid-cols-3">
            <input className="border border-line px-3 py-2" value={c.name} onChange={(e) => setCollections(collections.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
            <input className="border border-line px-3 py-2" value={c.description} onChange={(e) => setCollections(collections.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
            <input className="border border-line px-3 py-2" value={c.image} onChange={(e) => setCollections(collections.map((x, j) => (j === i ? { ...x, image: e.target.value } : x)))} />
          </li>
        ))}
      </ul>
      <button type="button" onClick={saveAll} className="admin-btn mt-6">
        Save collections
      </button>
    </div>
  );
}
