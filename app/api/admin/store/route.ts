import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, uid, writeDb } from "@/lib/db";
import type { Collection, Content, Faq, Review, Settings } from "@/lib/types";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await readDb());
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const db = await readDb();
  if (body.settings) db.settings = { ...db.settings, ...body.settings } as Settings;
  if (body.content) db.content = { ...db.content, ...body.content } as Content;
  if (body.collections) db.collections = body.collections as Collection[];
  if (body.faqs) db.faqs = body.faqs as Faq[];
  if (body.reviews) db.reviews = body.reviews as Review[];
  if (body.password) {
    const { hashPassword } = await import("@/lib/auth");
    db.settings.passwordHash = hashPassword(body.password);
  }
  if (body.markMessageRead) {
    const m = db.messages.find((x) => x.id === body.markMessageRead);
    if (m) m.read = true;
  }
  if (body.addCollection) {
    db.collections.push({
      id: uid("c"),
      name: body.addCollection.name,
      slug: String(body.addCollection.name).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: body.addCollection.description || "",
      image: body.addCollection.image || "/craft/hero-bouquet.png",
      featured: true,
    });
  }
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
