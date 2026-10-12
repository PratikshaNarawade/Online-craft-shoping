import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";
import type { Order } from "@/lib/types";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await readDb();
  return NextResponse.json({ orders: db.orders });
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = (await req.json()) as { id: string; status: Order["status"] };
  const db = await readDb();
  const o = db.orders.find((x) => x.id === id);
  if (!o) return NextResponse.json({ error: "Not found" }, { status: 404 });
  o.status = status;
  await writeDb(db);
  return NextResponse.json(o);
}
