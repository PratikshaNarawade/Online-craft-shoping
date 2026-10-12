import Link from "next/link";

export function AtelierClose() {
  return (
    <section className="relative overflow-hidden px-5 py-32 text-center md:px-10 md:py-40">
      <p className="text-[11px] tracking-[0.42em] text-gold uppercase">The border was never the petal</p>
      <h2 className="mx-auto mt-6 max-w-4xl font-serif text-5xl leading-[0.92] md:text-8xl">
        Come closer.
        <span className="block italic text-gold"> The edge is soft.</span>
      </h2>
      <p className="mx-auto mt-8 max-w-md text-sm text-mist">
        Shop the atelier — bouquets, hair, pots, and festive pieces, twisted by hand from chenille stems.
      </p>
      <Link
        href="/shop"
        className="mt-12 inline-block rounded-full bg-blush px-10 py-4 text-[11px] tracking-[0.24em] text-ink uppercase"
      >
        Shop the collection
      </Link>
    </section>
  );
}
