import Image from "next/image";
import Link from "next/link";

export function WhyChoose({
  title,
  body,
  image,
}: {
  title: string;
  body: string;
  image: string;
}) {
  return (
    <section className="surface-blush grid items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] md:aspect-[5/6]">
        <Image src={image} alt="" fill className="object-cover" sizes="50vw" />
      </div>
      <div className="max-w-lg">
        <h2 className="font-serif text-4xl md:text-5xl">{title}</h2>
        <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">{body}</p>
        <Link href="/shop" className="btn-hot mt-8">
          Shop now
        </Link>
      </div>
    </section>
  );
}
