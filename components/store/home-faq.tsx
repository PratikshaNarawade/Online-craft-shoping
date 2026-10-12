"use client";

import { useState } from "react";
import type { Faq } from "@/lib/types";

export function HomeFaq({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <h2 className="text-center font-serif text-4xl md:text-5xl">Frequently asked questions</h2>
      <div className="mt-10">
        {faqs.map((f, i) => {
          const on = open === i;
          return (
            <article key={f.id} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(on ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-serif text-xl md:text-2xl">{f.question}</span>
                <span className="text-hot">{on ? "–" : "+"}</span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="pb-5 text-sm leading-relaxed text-muted">{f.answer}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
