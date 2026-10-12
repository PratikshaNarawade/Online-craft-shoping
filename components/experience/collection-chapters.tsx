import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/types";

const NOTES = [
  "A gift that does not expire.",
  "Worn, not displayed.",
  "Colour that never asks for water.",
  "A doorway, rewritten.",
  "Light for the pooja shelf.",
  "A bloom without a season.",
];

export function CollectionChapters({ collections }: { collections: Collection[] }) {
  const chapters = collections.slice(0, 8);

  return (
    <section className="relative">
      <div className="flex items-end justify-between px-5 pb-6 md:px-10">
        <div>
          <p className="text-[11px] tracking-[0.42em] text-gold uppercase">What we do</p>
          <h2 className="mt-3 font-serif text-5xl md:text-6xl">The atelier</h2>
        </div>
        <p className="hidden max-w-xs text-right text-xs leading-relaxed text-mist md:block">
          Drag sideways. Each room has its own gravity.
        </p>
      </div>

      <div className="chapter-snap hide-scrollbar flex overflow-x-auto pb-8">
        {chapters.map((c, i) => (
          <article
            key={c.id}
            className="relative h-[78vh] min-w-[88vw] overflow-hidden md:min-w-[72vw] lg:min-w-[56vw]"
          >
            <Image
              src={c.image}
              alt=""
              fill
              className={`object-cover ${i % 2 === 0 ? "scale-110" : "scale-100"} opacity-70`}
              sizes="80vw"
            />
            <div
              className={`absolute inset-0 ${
                i % 3 === 0
                  ? "bg-gradient-to-t from-void via-void/40 to-transparent"
                  : i % 3 === 1
                    ? "bg-gradient-to-r from-void via-void/50 to-transparent"
                    : "bg-gradient-to-l from-void via-void/35 to-transparent"
              }`}
            />
            <div
              className={`absolute inset-0 flex flex-col justify-end p-8 text-paper md:p-14 ${
                i % 3 === 2 ? "items-end text-right" : "items-start"
              }`}
            >
              <p className="text-[11px] tracking-[0.32em] text-hot uppercase">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 max-w-lg font-serif text-5xl leading-[0.9] md:text-7xl">{c.name}</h3>
              <p className="mt-5 max-w-sm text-sm text-paper/80">{NOTES[i % NOTES.length]}</p>
              <Link
                href={`/collections/${c.slug}`}
                className="mt-8 text-[11px] tracking-[0.22em] text-paper uppercase underline decoration-blush underline-offset-8"
              >
                Step inside
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
