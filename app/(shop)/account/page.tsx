import Link from "next/link";
import { redirect } from "next/navigation";
import { getCustomer } from "@/lib/auth";
import { readDb } from "@/lib/db";
import { inr } from "@/lib/format";
import { AccountLogout } from "@/components/store/account-logout";

export const metadata = { title: "My account" };

export default async function AccountPage() {
  const user = await getCustomer();
  if (!user) redirect("/login?next=/account");

  const db = await readDb();
  const orders = db.orders.filter((o) => o.customer.email.toLowerCase() === user.email.toLowerCase());

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.42em] text-hot uppercase">Account</p>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">Hello, {user.name.split(" ")[0]}</h1>
          <p className="mt-3 text-sm text-muted">{user.email}</p>
        </div>
        <AccountLogout />
      </div>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">Orders</h2>
        {orders.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            No orders yet.{" "}
            <Link href="/shop" className="text-hot hover:underline">
              Start shopping
            </Link>
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="border border-line bg-white px-5 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{order.number}</p>
                  <p className="text-sm capitalize text-muted">{order.status}</p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {inr(order.total)}
                </p>
                <ul className="mt-3 space-y-1 text-sm">
                  {order.items.map((item) => (
                    <li key={`${order.id}-${item.productId}`}>
                      {item.name} × {item.qty}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
