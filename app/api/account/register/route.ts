import { NextResponse } from "next/server";
import {
  hashPassword,
  normalizeEmail,
  setCustomerSession,
  toPublicUser,
} from "@/lib/auth";
import { readDb, uid, writeDb } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const name = String(body.name || "").trim();
  const email = normalizeEmail(String(body.email || ""));
  const phone = String(body.phone || "").trim();
  const password = String(body.password || "");

  if (!name || !email.includes("@")) {
    return NextResponse.json({ error: "Please enter your name and a valid email." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  const db = await readDb();
  if (email === db.settings.adminEmail.toLowerCase()) {
    return NextResponse.json({ error: "This email cannot be used here." }, { status: 400 });
  }
  if (db.users.some((u) => u.email.toLowerCase() === email)) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const user = {
    id: uid("u"),
    name,
    email,
    phone,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  await writeDb(db);
  await setCustomerSession(user.email);
  return NextResponse.json({ ok: true, user: toPublicUser(user) });
}
