import Link from "next/link";

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ n?: string }> }) {
  const { n } = await searchParams;
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-[11px] tracking-[0.22em] uppercase text-hot">Thank you</p>
      <h1 className="mt-3 font-serif text-5xl">Order received</h1>
      {n && <p className="mt-4 text-fog">Order {n}. We will confirm on WhatsApp or email shortly.</p>}
      <Link href="/shop" className="btn-hot mt-10">
        Continue shopping
      </Link>
    </div>
  );
}
