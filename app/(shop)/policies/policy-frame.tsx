export function PolicyFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
      <p className="text-[11px] tracking-[0.42em] text-hot uppercase">Studio notes</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">{title}</h1>
      <div className="mt-10 space-y-4 text-sm leading-relaxed text-fog">{children}</div>
    </div>
  );
}
