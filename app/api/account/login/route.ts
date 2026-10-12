import { NextResponse } from "next/server";
import {
  hashPassword,
  normalizeEmail,
  setCustomerSession,
  toPublicUser,
} from "@/lib/auth";
import { readDb } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const email = normalizeEmail(String(body.email || ""));
  const password = String(body.password || "");
  const db = await readDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email);
  if (!user || user.passwordHash !== hashPassword(password)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }
  await setCustomerSession(user.email);
  return NextResponse.json({ ok: true, user: toPublicUser(user) });
}
