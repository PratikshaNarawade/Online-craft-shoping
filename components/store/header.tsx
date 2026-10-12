"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { BrandMark } from "./brand-mark";
import { HeaderSearch } from "./header-search";
import type { Collection } from "@/lib/types";

export function Header({
  collections,
  instagram,
  signedIn,
}: {
  collections: Collection[];
  instagram: string;
  signedIn: boolean;
}) {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const navIds = ["c-bouquet", "c-pot", "c-wall", "c-haar"];
  const nav = navIds.map((id) => collections.find((c) => c.id === id)).filter((c): c is Collection => Boolean(c));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      {/* Top bar: brand left, search centre, icons right */}
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-5 py-3 md:px-10">
        {/* Hamburger (mobile) */}
        <button type="button" className="md:hidden" aria-label="Menu" onClick={() => setMenu((v) => !v)}>
          <span className="block h-px w-6 bg-charcoal" />
          <span className="mt-1.5 block h-px w-6 bg-charcoal" />
        </button>

        {/* Brand */}
        <BrandMark />

        {/* Always-visible search bar */}
        <div className="mx-4 hidden flex-1 md:block">
          <HeaderSearch inline />
        </div>

        {/* Right icons */}
        <div className="ml-auto flex items-center gap-4 md:ml-0">
          {/* Search icon on mobile */}
          <span className="md:hidden">
            <HeaderSearch />
          </span>

          {/* Profile */}
          <Link href={signedIn ? "/account" : "/login"} aria-label={signedIn ? "Account" : "Sign in"} className="hover:text-hot">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" />
            </svg>
          </Link>

          {/* Wishlist (heart) */}
          <Link href="/shop" aria-label="Wishlist" className="hover:text-hot">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 21C12 21 4 14.5 4 8.5 4 5.5 6.5 3 9.5 3c1.74 0 3.41.81 4.5 2.09A5.99 5.99 0 0118.5 3C21.5 3 24 5.5 24 8.5c0 6-8 12.5-8 12.5" transform="translate(-2 0)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Cart */}
          <button type="button" onClick={() => setOpen(true)} className="relative hover:text-hot" aria-label="Cart">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-hot text-[9px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop nav below */}
      <nav className="hidden border-t border-line lg:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-2 text-[12px] tracking-[0.08em] md:px-10">
          <div className="flex items-center gap-8">
            {nav.map((c) => (
              <Link key={c.id} href={`/collections/${c.slug}`} className="hover:text-hot">
                {c.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <Link href="/shop" className="hover:text-hot">Shop</Link>
            <a href={instagram} target="_blank" rel="noreferrer" className="hover:text-hot">Instagram</a>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menu && (
        <div className="border-t border-line px-5 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {collections
              .filter((c) => c.id !== "c-curtain")
              .map((c) => (
              <Link key={c.id} href={`/collections/${c.slug}`} onClick={() => setMenu(false)} className="font-serif text-2xl">
                {c.name}
              </Link>
            ))}
            <Link href="/shop" onClick={() => setMenu(false)} className="text-[12px] tracking-[0.16em] uppercase text-hot">
              Shop all
            </Link>
            <Link href={signedIn ? "/account" : "/login"} onClick={() => setMenu(false)}>
              {signedIn ? "My account" : "Sign in"}
            </Link>
            {!signedIn && (
              <Link href="/register" onClick={() => setMenu(false)}>
                Create account
              </Link>
            )}
            <Link href="/about" onClick={() => setMenu(false)}>
              Our story
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
