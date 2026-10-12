import { readDb } from "@/lib/db";
import { inr } from "@/lib/format";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const db = await readDb();
  const pending = db.orders.filter((o) => o.status === "pending").length;
  const unread = db.messages.filter((m) => !m.read).length;
  const revenue = db.orders.reduce((n, o) => n + o.total, 0);

  return (
    <div>
      <h1 className="admin-h1">Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          ["Products", String(db.products.length), "/admin/products"],
          ["Orders", String(db.orders.length), "/admin/orders"],
          ["Pending", String(pending), "/admin/orders"],
          ["Inbox", String(unread), "/admin/messages"],
        ].map(([l, v, href]) => (
          <Link key={l} href={href} className="admin-card p-6 transition hover:border-hot">
            <p className="text-[11px] tracking-widest uppercase text-hot">{l}</p>
            <p className="mt-2 font-serif text-4xl text-charcoal">{v}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">Revenue recorded: {inr(revenue)}</p>
    </div>
  );
}
