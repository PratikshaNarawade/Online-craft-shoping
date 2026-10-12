export function TrustRow({ items }: { items: { title: string; body: string }[] }) {
  return (
    <section className="grid gap-8 border-y border-line px-5 py-14 md:grid-cols-4 md:px-10">
      {items.map((item) => (
        <div key={item.title} className="text-center">
          <p className="text-[11px] tracking-[0.28em] text-hot uppercase">{item.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
        </div>
      ))}
    </section>
  );
}
