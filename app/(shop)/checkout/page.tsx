"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/store/cart-provider";
import type { Product } from "@/lib/types";
import { inr } from "@/lib/format";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<{ name: string; email: string; phone: string } | null>(null);

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((d) => setProducts(d.products ?? []));
    fetch("/api/account/me")
      .then((r) => r.json())
      .then((d) => setCustomer(d.user ?? null))
      .catch(() => {});
  }, []);

  const rows = useMemo(
    () =>
      items
        .map((i) => ({ ...i, product: products.find((p) => p.id === i.productId) }))
        .filter((r) => r.product),
    [items, products],
  );
  const subtotal = rows.reduce((n, r) => n + r.product!.price * r.qty, 0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        customer: {
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          address: fd.get("address"),
          city: fd.get("city"),
          pincode: fd.get("pincode"),
          notes: fd.get("notes"),
        },
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Could not place order");
      return;
    }
    clear();
    router.push(`/checkout/thanks?n=${data.number}`);
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-serif text-5xl">Your cart is empty</h1>
        <Link href="/shop" className="btn-hot mt-10">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 md:grid-cols-2 md:px-8">
      <form onSubmit={onSubmit} className="space-y-3">
        <h1 className="font-serif text-4xl">Checkout</h1>
        {customer ? (
          <p className="text-sm text-muted">Signed in as {customer.email}</p>
        ) : (
          <p className="text-sm text-muted">
            Have an account?{" "}
            <Link href="/login?next=/checkout" className="text-hot hover:underline">
              Sign in
            </Link>{" "}
            or{" "}
            <Link href="/register?next=/checkout" className="text-hot hover:underline">
              create one
            </Link>
          </p>
        )}
        {error && <p className="text-sm text-blush">{error}</p>}
        <input
          name="name"
          required
          placeholder="Full name"
          defaultValue={customer?.name ?? ""}
          key={customer ? `name-${customer.email}` : "name"}
          className="w-full border border-line px-4 py-3"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          defaultValue={customer?.email ?? ""}
          key={customer ? `email-${customer.email}` : "email"}
          className="w-full border border-line px-4 py-3"
        />
        <input
          name="phone"
          required
          placeholder="Phone"
          defaultValue={customer?.phone ?? ""}
          key={customer ? `phone-${customer.email}` : "phone"}
          className="w-full border border-line px-4 py-3"
        />
        <textarea name="address" required placeholder="Address" className="w-full border border-line px-4 py-3" />
        <div className="grid grid-cols-2 gap-3">
          <input name="city" required placeholder="City" className="border border-line px-4 py-3" />
          <input name="pincode" required placeholder="PIN code" className="border border-line px-4 py-3" />
        </div>
        <textarea name="notes" placeholder="Order special instructions / gift note" className="w-full border border-line px-4 py-3" />
        <button
          disabled={loading}
          className="w-full rounded-full bg-hot py-3 text-[11px] tracking-[0.2em] text-white uppercase disabled:opacity-50"
        >
          {loading ? "Placing…" : "Place order"}
        </button>
      </form>
      <div>
        <h2 className="font-serif text-2xl">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {rows.map((r) => (
            <li key={r.productId} className="flex justify-between">
              <span>
                {r.product!.name} × {r.qty}
              </span>
              <span>{inr(r.product!.price * r.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex justify-between border-t border-line pt-4 font-sans text-xl font-extrabold">
          <span>Subtotal</span>
          <span>{inr(subtotal)}</span>
        </p>
      </div>
    </div>
  );
}
