import { NextResponse } from "next/server";
import { getCustomer } from "@/lib/auth";

export async function GET() {
  const user = await getCustomer();
  return NextResponse.json({ user });
}
