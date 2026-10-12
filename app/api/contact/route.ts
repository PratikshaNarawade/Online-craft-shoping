import { NextResponse } from "next/server";
import { readDb, uid, writeDb } from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, phone, body } = await req.json();
  if (!name || !email || !body) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const db = await readDb();
  db.messages.unshift({
    id: uid("m"),
    name: String(name),
    email: String(email),
    phone: String(phone || ""),
    body: String(body),
    createdAt: new Date().toISOString(),
    read: false,
  });
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
