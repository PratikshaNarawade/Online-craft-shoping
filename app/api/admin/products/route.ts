import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, uid, writeDb } from "@/lib/db";
import type { Product } from "@/lib/types";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await readDb();
  return NextResponse.json({ products: db.products, collections: db.collections });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as Partial<Product>;
  const db = await readDb();
  const product: Product = {
    id: uid("p"),
    name: body.name || "Untitled",
    slug: (body.slug || body.name || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    description: body.description || "",
    details: body.details || "",
    price: Number(body.price) || 0,
    compareAt: Number(body.compareAt) || 0,
    images: body.images?.length ? body.images : ["/craft/hero-bouquet.png"],
    collectionIds: body.collectionIds || [],
    stock: Number(body.stock) || 0,
    featured: Boolean(body.featured),
    bestseller: Boolean(body.bestseller),
    createdAt: new Date().toISOString(),
  };
  db.products.unshift(product);
  await writeDb(db);
  return NextResponse.json(product);
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as Product;
  const db = await readDb();
  const i = db.products.findIndex((p) => p.id === body.id);
  if (i < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  db.products[i] = { ...db.products[i], ...body };
  await writeDb(db);
  return NextResponse.json(db.products[i]);
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const db = await readDb();
  db.products = db.products.filter((p) => p.id !== id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
