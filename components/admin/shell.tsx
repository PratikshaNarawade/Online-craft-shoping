"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Collections", "/admin/collections"],
  ["Orders", "/admin/orders"],
  ["Homepage", "/admin/content"],
  ["Inbox", "/admin/messages"],
  ["Settings", "/admin/settings"],
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="admin-root flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-[#f0d5de] bg-white px-5 py-8 text-charcoal md:flex md:flex-col">
        <p className="font-serif text-2xl">Pratiksha&apos;s Craft</p>
        <p className="mt-1 text-[11px] tracking-[0.22em] text-hot uppercase">Admin</p>
        <nav className="mt-10 flex flex-col gap-1 text-sm">
          {links.map(([label, href]) => {
            const on = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2.5 ${on ? "bg-hot font-semibold text-white" : "text-charcoal hover:bg-pink-lite hover:text-hot"}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <button type="button" onClick={logout} className="mt-auto pt-10 text-left text-xs text-muted underline hover:text-hot">
          Sign out
        </button>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex gap-2 overflow-x-auto border-b border-[#f0d5de] bg-white px-4 py-3 text-xs md:hidden">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`shrink-0 rounded-full px-3 py-1.5 ${isActive(pathname, href) ? "bg-hot font-semibold text-white" : "text-charcoal"}`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex-1 p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
