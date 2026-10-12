import Link from "next/link";
import { Bloom3D } from "@/components/store/bloom-3d";

export function WorldClose() {
  return (
    <section className="relative overflow-hidden px-5 py-32 text-center md:px-10 md:py-40">
      <div className="pointer-events-none absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-40 md:block">
        <Bloom3D />
      </div>
      <p className="relative text-[11px] tracking-[0.42em] text-hot uppercase">The stem continues</p>
      <h2 className="relative mx-auto mt-6 max-w-5xl font-sans text-5xl font-extrabold leading-[0.86] tracking-[-0.05em] uppercase md:text-8xl">
        What will you
        <span className="block italic text-hot">create next?</span>
      </h2>
      <Link href="/shop" className="btn-hot relative mt-12">
        Start creating →
      </Link>
    </section>
  );
}
