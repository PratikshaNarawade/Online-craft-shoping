"use client";

import { useState } from "react";
import type { Faq } from "@/lib/types";

export function InsightQa({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="px-5 py-28 md:px-10">
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.42em] text-gold uppercase">Insights & Q&A</p>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl">Ask the studio</h2>
        </div>
        <p className="max-w-sm text-sm text-mist">One question at a time. The rest wait in a softer light.</p>
      </div>

      <div className="space-y-2">
        {faqs.map((f, i) => {
          const active = open === i;
          return (
            <article key={f.id} className={`border-t border-gold/20 ${active ? "bg-night/80" : ""}`}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="flex w-full items-start justify-between gap-6 px-1 py-7 text-left md:px-6"
              >
                <span className="font-serif text-2xl text-gold/40 md:text-4xl">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`flex-1 font-serif leading-tight ${active ? "text-3xl text-ink md:text-5xl" : "text-xl text-mist md:text-2xl"}`}
                >
                  {f.question}
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl px-1 pb-10 text-sm leading-relaxed text-mist md:px-6 md:pl-28">{f.answer}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
