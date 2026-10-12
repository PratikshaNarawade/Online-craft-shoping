import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

export async function GET() {
  const db = await readDb();
  return NextResponse.json({
    products: db.products,
    collections: db.collections,
    settings: {
      shippingFee: db.settings.shippingFee,
      freeShippingAbove: db.settings.freeShippingAbove,
    },
  });
}
