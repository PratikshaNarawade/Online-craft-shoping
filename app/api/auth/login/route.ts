import { NextResponse } from "next/server";
import { hashPassword, setSession } from "@/lib/auth";
import { readDb } from "@/lib/db";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const db = await readDb();
  if (
    email !== db.settings.adminEmail ||
    hashPassword(String(password || "")) !== db.settings.passwordHash
  ) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  await setSession(db.settings.adminEmail);
  return NextResponse.json({ ok: true });
}
