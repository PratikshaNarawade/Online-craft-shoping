"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function RegisterFormInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");
    if (password !== confirm) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }
    const res = await fetch("/api/account/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        password,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Could not create account");
      return;
    }
    const next = params.get("next") || "/account";
    router.push(next.startsWith("/") ? next : "/account");
    router.refresh();
  }

  const next = params.get("next");
  const loginHref = next ? `/login?next=${encodeURIComponent(next)}` : "/login";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <p className="text-sm text-hot">{error}</p>}
      <input name="name" required placeholder="Full name" className="w-full border border-line bg-white px-4 py-3" />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="w-full border border-line bg-white px-4 py-3"
      />
      <input name="phone" placeholder="Phone (optional)" className="w-full border border-line bg-white px-4 py-3" />
      <input
        name="password"
        type="password"
        required
        minLength={6}
        placeholder="Password (min 6 characters)"
        className="w-full border border-line bg-white px-4 py-3"
      />
      <input
        name="confirm"
        type="password"
        required
        minLength={6}
        placeholder="Confirm password"
        className="w-full border border-line bg-white px-4 py-3"
      />
      <button disabled={loading} className="btn-hot w-full">
        {loading ? "Creating…" : "Create account"}
      </button>
      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href={loginHref} className="text-hot hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  return (
    <Suspense>
      <RegisterFormInner />
    </Suspense>
  );
}
