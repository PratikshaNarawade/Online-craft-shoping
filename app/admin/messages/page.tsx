"use client";

import { useEffect, useState } from "react";
import type { Message } from "@/lib/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  async function load() {
    const r = await fetch("/api/admin/store");
    const d = await r.json();
    setMessages(d.messages ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function mark(id: string) {
    await fetch("/api/admin/store", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markMessageRead: id }),
    });
    load();
  }

  return (
    <div>
      <h1 className="admin-h1">Inbox</h1>
      <div className="mt-8 space-y-4">
        {messages.length === 0 && <p className="text-muted">No messages yet.</p>}
        {messages.map((m) => (
          <article key={m.id} className="admin-card p-5">
            <p className="font-serif text-xl">
              {m.name} <span className="text-sm text-muted">{m.email}</span>
            </p>
            <p className="mt-2 text-sm">{m.body}</p>
            {!m.read && (
              <button type="button" className="mt-3 text-xs font-medium text-hot underline" onClick={() => mark(m.id)}>
                Mark read
              </button>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
