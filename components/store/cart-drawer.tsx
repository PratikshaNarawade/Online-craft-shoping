"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./cart-provider";
import type { Product } from "@/lib/types";
import { inr } from "@/lib/format";

export function CartDrawer({ whatsapp }: { whatsapp: string }) {
  const { items, open, setOpen, setQty, remove } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((d) => setProducts(d.products ?? []))
      .catch(() => {});
  }, []);

  const rows = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.productId) }))
    .filter((r) => r.product);
  const subtotal = rows.reduce((n, r) => n + r.product!.price * r.qty, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-charcoal/40" aria-label="Close cart" onClick={() => setOpen(false)} />
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-line bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-serif text-2xl">Your cart</h2>
          <button type="button" onClick={() => setOpen(false)} className="text-sm">
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {rows.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-2xl">Your cart is empty</p>
              <p className="mt-2 text-sm text-muted">Find a bouquet, hair clip, or flower pot to get started.</p>
              <Link href="/shop" onClick={() => setOpen(false)} className="mt-6 inline-block underline">
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {rows.map((r) => (
                <li key={r.productId} className="flex gap-3">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-pink-lite">
                    <Image src={r.product!.images[0]} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-lg">{r.product!.name}</p>
                    <p className="text-sm">{inr(r.product!.price)}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <button type="button" onClick={() => setQty(r.productId, r.qty - 1)}>
                        −
                      </button>
                      <span>{r.qty}</span>
                      <button type="button" onClick={() => setQty(r.productId, r.qty + 1)}>
                        +
                      </button>
                      <button type="button" className="ml-auto text-xs underline" onClick={() => remove(r.productId)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {rows.length > 0 && (
          <div className="border-t border-line p-5">
            <div className="flex justify-between text-sm">
              <span>Estimated total</span>
              <span>{inr(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Taxes included. Shipping calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-full bg-hot py-3 text-center text-sm tracking-[0.16em] text-white uppercase"
            >
              Check out
            </Link>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block text-center text-xs underline"
            >
              Order on WhatsApp
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}
