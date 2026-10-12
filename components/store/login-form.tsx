"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function LoginFormInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Invalid email or password");
      return;
    }
    const next = params.get("next") || "/account";
    router.push(next.startsWith("/") ? next : "/account");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <p className="text-sm text-hot">{error}</p>}
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="w-full border border-line bg-white px-4 py-3"
      />
      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        className="w-full border border-line bg-white px-4 py-3"
      />
      <button disabled={loading} className="btn-hot w-full">
        {loading ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-center text-sm text-muted">
        New here?{" "}
        <Link
          href={params.get("next") ? `/register?next=${encodeURIComponent(params.get("next")!)}` : "/register"}
          className="text-hot hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}

export function LoginForm() {
  return (
    <Suspense>
      <LoginFormInner />
    </Suspense>
  );
}
