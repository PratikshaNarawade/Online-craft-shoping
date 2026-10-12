"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        body: fd.get("body"),
      }),
    });
    if (!res.ok) {
      setError("Could not send. Please try WhatsApp.");
      return;
    }
    setOk(true);
    e.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-20 md:px-8">
      <p className="text-[11px] tracking-[0.42em] text-hot uppercase">Studio</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Contact</h1>
      <p className="mt-3 text-fog">A note, a custom colour, or a wholesale enquiry — we read every message.</p>
      {ok && <p className="mt-6 text-sm text-blush">Thank you. We will write back soon.</p>}
      {error && <p className="mt-6 text-sm text-blush">{error}</p>}
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input name="name" required placeholder="Name" className="w-full border border-line bg-paper px-4 py-3" />
        <input name="email" type="email" required placeholder="Email" className="w-full border border-line bg-paper px-4 py-3" />
        <input name="phone" placeholder="Phone" className="w-full border border-line bg-paper px-4 py-3" />
        <textarea name="body" required rows={5} placeholder="Message" className="w-full border border-line bg-paper px-4 py-3" />
        <button type="submit" className="btn-hot">
          Send
        </button>
      </form>
    </div>
  );
}
