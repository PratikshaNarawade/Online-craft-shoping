"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Invalid email or password");
      return;
    }
    router.push(params.get("next") || "/admin");
    router.refresh();
  }

  return (
    <div className="admin-root flex min-h-screen items-center justify-center px-4">
      <form onSubmit={onSubmit} className="admin-card w-full max-w-sm space-y-4 p-8">
        <p className="text-[11px] tracking-[0.22em] uppercase text-hot">Pratiksha&apos;s Craft</p>
        <h1 className="admin-h1">Sign in</h1>
        {error && <p className="text-sm font-medium text-hot">{error}</p>}
        <input name="email" type="email" required defaultValue="admin@pratikshascraft.in" className="w-full px-4 py-3" />
        <input name="password" type="password" required placeholder="Password" className="w-full px-4 py-3" />
        <button disabled={loading} className="admin-btn w-full py-3">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
