"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Collection } from "@/lib/types";

const WORLDS = [
  { key: "flowers", label: "Flowers", match: ["c-bouquet", "c-lotus", "c-pot"] },
  { key: "wear", label: "Hair", match: ["c-hair-clip"] },
  { key: "home", label: "Home", match: ["c-wall", "c-curtain", "c-mirror"] },
  { key: "gifts", label: "Gifts", match: ["c-keychain", "c-purse"] },
  { key: "festive", label: "Festive", match: ["c-shubh", "c-diya", "c-haar", "c-asan"] },
];

export function CreateGallery({ collections }: { collections: Collection[] }) {
  const [open, setOpen] = useState<string | null>(null);

  const worlds = WORLDS.map((w) => {
    const items = collections.filter((c) => w.match.includes(c.id));
    return { ...w, items, image: items[0]?.image, href: items[0] ? `/collections/${items[0].slug}` : "/shop" };
  }).filter((w) => w.items.length);

  return (
    <section id="create" className="px-5 py-24 md:px-10 md:py-32">
      <p className="text-[11px] tracking-[0.42em] text-hot uppercase">What can you create?</p>
      <h2 className="mt-4 max-w-4xl font-sans text-5xl font-extrabold leading-[0.88] tracking-[-0.04em] uppercase md:text-7xl">
        A world in
        <span className="block italic text-hot">one fuzzy stem.</span>
      </h2>

      <div className="mt-16 flex flex-col gap-4 md:h-[78vh] md:flex-row">
        {worlds.map((w, i) => (
          <Link
            key={w.key}
            href={w.href}
            onMouseEnter={() => setOpen(w.key)}
            onMouseLeave={() => setOpen(null)}
            className={`group relative min-h-[42vh] overflow-hidden transition-all duration-700 md:min-h-0 ${
              open === w.key || (!open && i === 0) ? "md:flex-[2.4]" : "md:flex-1"
            }`}
          >
            {w.image && (
              <Image
                src={w.image}
                alt={w.label}
                fill
                className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                sizes="50vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-plum via-plum/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <p className="text-[11px] tracking-[0.3em] text-hot uppercase">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-sans text-4xl font-extrabold uppercase md:text-5xl">{w.label}</h3>
              <p className="mt-3 max-w-xs text-sm text-fog opacity-0 transition duration-500 group-hover:opacity-100">
                {w.items.map((c) => c.name).join(" · ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
