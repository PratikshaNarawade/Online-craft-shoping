import { NextResponse } from "next/server";
import { readDb, uid, writeDb } from "@/lib/db";
import type { CartItem } from "@/lib/types";

export async function POST(req: Request) {
  const { items, customer } = (await req.json()) as {
    items: CartItem[];
    customer: {
      name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      pincode: string;
      notes: string;
    };
  };
  if (!items?.length || !customer?.name || !customer?.phone) {
    return NextResponse.json({ error: "Missing order details" }, { status: 400 });
  }
  const db = await readDb();
  const orderItems = items
    .map((i) => {
      const p = db.products.find((x) => x.id === i.productId);
      if (!p) return null;
      return {
        productId: p.id,
        name: p.name,
        price: p.price,
        qty: i.qty,
        image: p.images[0],
      };
    })
    .filter(Boolean);
  if (!orderItems.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }
  const subtotal = orderItems.reduce((n, i) => n! + i!.price * i!.qty, 0);
  const shipping = subtotal >= db.settings.freeShippingAbove ? 0 : db.settings.shippingFee;
  const number = `PC${String(db.orders.length + 101).padStart(4, "0")}`;
  db.orders.unshift({
    id: uid("o"),
    number,
    status: "pending",
    items: orderItems as NonNullable<(typeof orderItems)[number]>[],
    subtotal,
    shipping,
    total: subtotal + shipping,
    customer,
    createdAt: new Date().toISOString(),
  });
  for (const i of items) {
    const p = db.products.find((x) => x.id === i.productId);
    if (p) p.stock = Math.max(0, p.stock - i.qty);
  }
  await writeDb(db);
  return NextResponse.json({ ok: true, number });
}
