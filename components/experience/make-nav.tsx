"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Collection } from "@/lib/types";

export function MakeNav({ collections }: { collections: Collection[] }) {
  const [active, setActive] = useState(0);
  const current = collections[active] ?? collections[0];
  if (!current) return null;

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <Image
        src={current.image}
        alt=""
        fill
        className="object-cover opacity-40 transition duration-700"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-plum/70" />
      <div className="relative z-10 grid min-h-[90vh] items-center gap-10 px-5 py-24 md:grid-cols-[0.7fr_1.3fr] md:px-10">
        <p className="font-sans text-[18vw] font-extrabold leading-none tracking-[-0.08em] text-hot uppercase md:text-[8rem]">
          Make
        </p>
        <ul>
          {collections.map((c, i) => (
            <li key={c.id}>
              <Link
                href={`/collections/${c.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`block border-b border-white/10 py-3 font-sans text-3xl font-extrabold uppercase tracking-[-0.04em] transition md:text-5xl ${
                  i === active ? "text-hot" : "text-cream/45 hover:text-cream"
                }`}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
