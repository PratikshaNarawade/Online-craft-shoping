"use client";

import { useState } from "react";
import type { Faq } from "@/lib/types";

export function FaqType({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <p className="text-[11px] tracking-[0.42em] text-hot uppercase">Ask</p>
      <h2 className="mt-4 font-sans text-5xl font-extrabold uppercase tracking-[-0.04em] md:text-6xl">
        Where do I start?
      </h2>
      <div className="mt-14">
        {faqs.map((f, i) => {
          const on = open === i;
          return (
            <article key={f.id} className="border-t border-hot/20">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="flex w-full items-baseline gap-6 py-7 text-left"
              >
                <span className="font-sans text-sm text-hot">{String(i + 1).padStart(2, "0")}</span>
                <span className={`font-sans font-extrabold uppercase tracking-[-0.04em] ${on ? "text-2xl text-hot md:text-5xl" : "text-xl text-cream/50 md:text-3xl"}`}>
                  {f.question}
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-10 pl-12 text-sm leading-relaxed text-fog md:pl-16">{f.answer}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
