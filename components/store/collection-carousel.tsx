import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/types";

export function CollectionCarousel({ collections }: { collections: Collection[] }) {
  return (
    <section className="px-5 py-16 md:px-10 md:py-20">
      <h2 className="text-center font-serif text-4xl md:text-5xl">Collections</h2>
      <div className="hide-scrollbar mt-10 flex snap-x gap-5 overflow-x-auto pb-4 md:gap-8">
        {collections.map((c) => (
          <Link
            key={c.id}
            href={`/collections/${c.slug}`}
            className="group w-[72vw] shrink-0 snap-start sm:w-64 md:w-72"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-pink-lite">
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="280px"
              />
            </div>
            <h3 className="mt-4 text-center font-serif text-2xl">{c.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
