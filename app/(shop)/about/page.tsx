import Image from "next/image";
import { readDb } from "@/lib/db";

export default async function AboutPage() {
  const db = await readDb();
  return (
    <div>
      <section className="relative isolate min-h-[50vh] overflow-hidden md:min-h-[60vh]">
        <Image src={db.content.story.image} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-charcoal/30" />
        <div className="relative flex min-h-[50vh] flex-col items-center justify-end px-5 py-12 text-center text-white md:min-h-[60vh] md:py-16">
          <p className="text-[11px] tracking-[0.28em] uppercase">{db.content.story.eyebrow}</p>
          <h1 className="mt-3 font-serif text-5xl md:text-7xl">{db.content.story.title}</h1>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-5 py-16 text-center md:py-24">
        <p className="font-serif text-2xl leading-snug md:text-3xl">{db.content.story.body}</p>
        <p className="mt-8 leading-relaxed text-muted">
          Every bouquet, hair clip, flower pot, and festive piece is twisted by hand from pipe cleaners — chenille stems
          that stay colourful for years without water.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pb-16 md:grid-cols-4 md:px-10">
        {db.content.reels.map((r) => (
          <div key={r.id} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-pink-lite">
            <Image src={r.image} alt={r.caption} fill className="object-cover" sizes="25vw" />
          </div>
        ))}
      </div>
    </div>
  );
}
