import Link from "next/link";
import type { Collection, Settings } from "@/lib/types";
import { BrandMark } from "./brand-mark";

export function Footer({ settings, collections }: { settings: Settings; collections: Collection[] }) {
  return (
    <footer className="border-t border-line bg-white">
      <div className="px-5 py-16 text-center md:px-10 md:py-20">
        <p className="font-serif text-3xl md:text-5xl">Because handmade is lasting.</p>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">{settings.tagline}</p>
        <Link href="/shop" className="btn-hot mt-8">
          Shop now
        </Link>
      </div>
      <div className="grid gap-10 border-t border-line px-5 py-12 md:grid-cols-3 md:px-10">
        <div>
          <BrandMark compact />
          <p className="mt-3 max-w-xs text-sm text-muted">Handmade pipe-cleaner blooms, hair pieces, and home décor from the studio.</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase">Shop</p>
          <nav className="mt-4 flex flex-col gap-2 text-sm">
            {collections.slice(0, 6).map((c) => (
              <Link key={c.id} href={`/collections/${c.slug}`} className="hover:text-hot">
                {c.name}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase">Information</p>
          <nav className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/account" className="hover:text-hot">
              Account
            </Link>
            <Link href="/about" className="hover:text-hot">
              Our story
            </Link>
            <Link href="/contact" className="hover:text-hot">
              Contact
            </Link>
            <Link href="/policies/shipping" className="hover:text-hot">
              Shipping
            </Link>
            <Link href="/policies/returns" className="hover:text-hot">
              Returns
            </Link>
            <Link href="/policies/privacy" className="hover:text-hot">
              Privacy
            </Link>
            <Link href="/policies/terms" className="hover:text-hot">
              Terms
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-5 text-[10px] tracking-[0.16em] text-muted uppercase md:px-10">
        <span>
          © {new Date().getFullYear()} {settings.storeName}
        </span>
        <a href={settings.instagram} target="_blank" rel="noreferrer" className="hover:text-hot">
          Instagram
        </a>
      </div>
    </footer>
  );
}
