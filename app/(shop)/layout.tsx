import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { Announcement } from "@/components/store/announcement";
import { CartDrawer } from "@/components/store/cart-drawer";
import { readDb } from "@/lib/db";
import { getCustomer } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const db = await readDb();
  const customer = await getCustomer();
  return (
    <div className="store-root flex min-h-full flex-col">
      <Announcement
        enabled={db.content.announcement.enabled}
        items={db.content.announcements?.length ? db.content.announcements : [db.content.announcement.text]}
      />
      <Header collections={db.collections} instagram={db.settings.instagram} signedIn={Boolean(customer)} />
      <main className="flex-1">{children}</main>
      <Footer settings={db.settings} collections={db.collections} />
      <CartDrawer whatsapp={db.settings.whatsapp} />
    </div>
  );
}
