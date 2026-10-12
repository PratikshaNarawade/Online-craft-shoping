import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/types";
import { TiltCard } from "./tilt-card";

export function CollectionRail({ collections }: { collections: Collection[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <h2 className="font-serif text-4xl md:text-5xl">Collections</h2>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {collections.map((c) => (
          <TiltCard key={c.id}>
            <Link href={`/collections/${c.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                <Image src={c.image} alt={c.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="25vw" />
              </div>
              <h3 className="mt-3 font-serif text-xl md:text-2xl">{c.name}</h3>
              <p className="mt-1 text-sm text-muted">{c.description}</p>
            </Link>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
