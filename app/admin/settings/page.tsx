"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Settings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("/api/admin/store")
      .then((r) => r.json())
      .then((d) => setSettings(d.settings));
  }, []);

  async function save(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/store", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings, password: password || undefined }),
    });
    setPassword("");
    alert("Saved");
  }

  if (!settings) return <p>Loading…</p>;

  return (
    <form onSubmit={save} className="admin-card max-w-xl space-y-3 p-6">
      <h1 className="admin-h1">Settings</h1>
      {(
        [
          ["storeName", "Store name"],
          ["tagline", "Tagline"],
          ["email", "Email"],
          ["phone", "Phone"],
          ["whatsapp", "WhatsApp (with country code)"],
          ["instagram", "Instagram URL"],
          ["address", "Address"],
        ] as const
      ).map(([k, label]) => (
        <label key={k} className="block text-sm">
          {label}
          <input className="mt-1 w-full border border-line px-3 py-2" value={settings[k]} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} />
        </label>
      ))}
      <label className="block text-sm">
        Shipping fee
        <input type="number" className="mt-1 w-full border border-line px-3 py-2" value={settings.shippingFee} onChange={(e) => setSettings({ ...settings, shippingFee: Number(e.target.value) })} />
      </label>
      <label className="block text-sm">
        Free shipping above
        <input type="number" className="mt-1 w-full border border-line px-3 py-2" value={settings.freeShippingAbove} onChange={(e) => setSettings({ ...settings, freeShippingAbove: Number(e.target.value) })} />
      </label>
      <label className="block text-sm">
        New admin password
        <input type="password" className="mt-1 w-full border border-line px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button className="admin-btn">Save</button>
    </form>
  );
}
