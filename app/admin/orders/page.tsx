"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/lib/types";
import { inr } from "@/lib/format";

const statuses: Order["status"][] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function load() {
    const r = await fetch("/api/admin/orders");
    const d = await r.json();
    setOrders(d.orders ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: string, status: Order["status"]) {
    await fetch("/api/admin/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  return (
    <div>
      <h1 className="admin-h1">Orders</h1>
      <div className="mt-8 space-y-4">
        {orders.length === 0 && <p className="text-muted">No orders yet.</p>}
        {orders.map((o) => (
          <article key={o.id} className="admin-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-serif text-2xl">{o.number}</p>
                <p className="text-sm text-muted">
                  {o.customer.name} · {o.customer.phone}
                </p>
              </div>
              <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value as Order["status"])} className="border border-line px-3 py-2">
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <ul className="mt-3 text-sm">
              {o.items.map((i) => (
                <li key={i.productId}>
                  {i.name} × {i.qty} — {inr(i.price * i.qty)}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm">Total {inr(o.total)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
