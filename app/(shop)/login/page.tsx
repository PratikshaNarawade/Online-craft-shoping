import { redirect } from "next/navigation";
import { getCustomer } from "@/lib/auth";
import { LoginForm } from "@/components/store/login-form";

export const metadata = { title: "Sign in" };

function safeNext(next?: string) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/account";
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const user = await getCustomer();
  if (user) redirect(safeNext(next));

  return (
    <div className="mx-auto max-w-md px-5 py-20 md:px-8 md:py-28">
      <p className="text-[11px] tracking-[0.42em] text-hot uppercase">Account</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Sign in</h1>
      <p className="mt-3 text-sm text-muted">Welcome back. Sign in to see your orders and checkout faster.</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
