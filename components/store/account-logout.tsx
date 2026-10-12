"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AccountLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/account/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={logout} disabled={loading} className="text-sm text-hot hover:underline">
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
