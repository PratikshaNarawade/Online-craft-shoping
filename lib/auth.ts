import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { readDb } from "./db";
import type { PublicUser, User } from "./types";

const ADMIN_COOKIE = "pc_session";
const CUSTOMER_COOKIE = "pc_customer";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 14,
};

function secret() {
  return process.env.AUTH_SECRET || "pratiksha-craft-local-secret";
}

export function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export function signSession(email: string) {
  return createHmac("sha256", secret()).update(email).digest("hex");
}

export function signCustomerSession(email: string) {
  return createHmac("sha256", secret()).update(`customer:${email.toLowerCase()}`).digest("hex");
}

function tokensMatch(a: string, b: string) {
  try {
    const left = Buffer.from(a);
    const right = Buffer.from(b);
    if (left.length !== right.length) return false;
    return timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

export function toPublicUser(user: User): PublicUser {
  return { id: user.id, name: user.name, email: user.email, phone: user.phone };
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function isAdmin() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const db = await readDb();
  return tokensMatch(token, signSession(db.settings.adminEmail));
}

export async function setSession(email: string) {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, signSession(email), COOKIE_OPTIONS);
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}

export async function setCustomerSession(email: string) {
  const jar = await cookies();
  jar.set(CUSTOMER_COOKIE, signCustomerSession(email), COOKIE_OPTIONS);
}

export async function clearCustomerSession() {
  const jar = await cookies();
  jar.delete(CUSTOMER_COOKIE);
}

export async function getCustomer(): Promise<PublicUser | null> {
  const jar = await cookies();
  const token = jar.get(CUSTOMER_COOKIE)?.value;
  if (!token) return null;
  const db = await readDb();
  for (const user of db.users) {
    if (tokensMatch(token, signCustomerSession(user.email))) {
      return toPublicUser(user);
    }
  }
  return null;
}
