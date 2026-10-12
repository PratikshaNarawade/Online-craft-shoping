import { promises as fs } from "node:fs";
import path from "node:path";
import type { Database } from "./types";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export async function readDb(): Promise<Database> {
  const raw = await fs.readFile(DB_PATH, "utf8");
  const db = JSON.parse(raw) as Database;
  if (!Array.isArray(db.users)) db.users = [];
  return db;
}

export async function writeDb(db: Database) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2) + "\n", "utf8");
}

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
