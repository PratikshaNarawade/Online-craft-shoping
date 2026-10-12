import Image from "next/image";
import type { Review } from "@/lib/types";

export function CommunityWall({
  reviews,
  images,
}: {
  reviews: Review[];
  images: string[];
}) {
  const stories = reviews.slice(0, 4);

  return (
    <section className="surface-cream px-5 py-24 md:px-10 md:py-32">
      <p className="text-[11px] tracking-[0.42em] text-magenta uppercase">Community</p>
      <h2 className="mt-4 max-w-3xl font-sans text-5xl font-extrabold uppercase tracking-[-0.04em] text-charcoal md:text-6xl">
        What people make
        <span className="italic text-magenta"> with a stem.</span>
      </h2>
      <div className="mt-14 grid gap-4 md:grid-cols-12 md:grid-rows-2">
        {stories.map((r, i) => (
          <figure
            key={r.id}
            className={`relative min-h-[280px] overflow-hidden ${
              i === 0 ? "md:col-span-7 md:row-span-2 md:min-h-[560px]" : "md:col-span-5"
            }`}
          >
            {images[i] && (
              <Image src={images[i]} alt="" fill className="object-cover" sizes="50vw" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/20 to-transparent" />
            <figcaption className="absolute right-0 bottom-0 left-0 p-6 text-cream md:p-8">
              <blockquote className="font-serif text-2xl leading-snug md:text-3xl">&ldquo;{r.body}&rdquo;</blockquote>
              <p className="mt-3 text-[11px] tracking-[0.22em] text-hot uppercase">{r.name}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
