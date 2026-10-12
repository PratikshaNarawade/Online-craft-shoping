import Image from "next/image";
import Link from "next/link";
import { Bloom3D } from "./bloom-3d";

export function Hero({
  title,
  image,
  ctaHref = "/shop",
}: {
  title: string;
  image: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-ink text-paper">
      <Image src={image} alt="" fill priority className="object-cover opacity-70" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-transparent" />
      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-4 py-20 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.28em] uppercase text-gold">Handmade crafts</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] md:text-7xl">{title}</h1>
          <p className="mt-5 max-w-md text-paper/80">
            Everlasting bouquets, Shubh Labh hangings, hair clips, flower pots, and festive décor — handmade to last.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={ctaHref}
              className="rounded-full bg-paper px-7 py-3 text-sm tracking-[0.16em] text-ink uppercase"
            >
              Shop Now
            </Link>
            <Link
              href="/collections/chenille-stem-bouquets"
              className="rounded-full border border-paper/40 px-7 py-3 text-sm tracking-[0.16em] uppercase"
            >
              Bouquets
            </Link>
          </div>
        </div>
        <div className="mt-10 hidden animate-float md:block">
          <Bloom3D />
        </div>
      </div>
    </section>
  );
}
