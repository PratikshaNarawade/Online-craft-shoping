export function Announcement({ enabled, items }: { enabled: boolean; items: string[] }) {
  if (!enabled || !items.length) return null;
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-hot text-white">
      <div className="animate-marquee flex w-max gap-10 py-2 text-[11px] tracking-[0.18em] uppercase">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>{t}</span>
            <span className="opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
