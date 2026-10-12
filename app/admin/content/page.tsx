"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Content, Faq } from "@/lib/types";

export default function AdminContentPage() {
  const [content, setContent] = useState<Content | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    fetch("/api/admin/store")
      .then((r) => r.json())
      .then((d) => {
        setContent(d.content);
        setFaqs(d.faqs ?? []);
      });
  }, []);

  async function save(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/store", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, faqs }),
    });
    alert("Saved");
  }

  if (!content) return <p>Loading…</p>;

  return (
    <form onSubmit={save} className="admin-card max-w-2xl space-y-4 p-6">
      <h1 className="admin-h1">Homepage</h1>
      <label className="block text-sm">
        Hero title
        <input className="mt-1 w-full border border-line px-3 py-2" value={content.heroTitle} onChange={(e) => setContent({ ...content, heroTitle: e.target.value })} />
      </label>
      <label className="block text-sm">
        Hero image
        <input className="mt-1 w-full border border-line px-3 py-2" value={content.heroImage} onChange={(e) => setContent({ ...content, heroImage: e.target.value })} />
      </label>
      <label className="block text-sm">
        Featured product id
        <input className="mt-1 w-full border border-line px-3 py-2" value={content.featuredProductId} onChange={(e) => setContent({ ...content, featuredProductId: e.target.value })} />
      </label>
      <label className="block text-sm">
        Story
        <textarea className="mt-1 w-full border border-line px-3 py-2" rows={5} value={content.story.body} onChange={(e) => setContent({ ...content, story: { ...content.story, body: e.target.value } })} />
      </label>
      <label className="block text-sm">
        Announcements (one per line)
        <textarea
          className="mt-1 w-full border border-line px-3 py-2"
          rows={4}
          value={content.announcements.join("\n")}
          onChange={(e) => setContent({ ...content, announcements: e.target.value.split("\n").filter(Boolean) })}
        />
      </label>
      <h2 className="pt-4 font-serif text-2xl text-charcoal">FAQs</h2>
      {faqs.map((f, i) => (
        <div key={f.id} className="grid gap-2">
          <input className="border border-line px-3 py-2" value={f.question} onChange={(e) => setFaqs(faqs.map((x, j) => (j === i ? { ...x, question: e.target.value } : x)))} />
          <textarea className="border border-line px-3 py-2" value={f.answer} onChange={(e) => setFaqs(faqs.map((x, j) => (j === i ? { ...x, answer: e.target.value } : x)))} />
        </div>
      ))}
      <button className="admin-btn">Save</button>
    </form>
  );
}
