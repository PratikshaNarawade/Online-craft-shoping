import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-charcoal hover:text-hot">
      <span className="relative grid h-10 w-10 shrink-0 place-items-center" aria-hidden>
        <svg viewBox="0 0 40 40" className="h-10 w-10">
          <circle cx="20" cy="20" r="19" fill="#fceef3" />
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="20"
              cy="10"
              rx="4.2"
              ry="8"
              fill={i % 2 ? "#ff3d8a" : "#d61a7a"}
              transform={`rotate(${i * 45} 20 20)`}
            />
          ))}
          <circle cx="20" cy="20" r="4.5" fill="#fff4c8" />
        </svg>
      </span>
      <span className={compact ? "font-serif text-xl leading-none" : "font-serif text-lg leading-none sm:text-2xl md:text-[1.7rem]"}>
        Pratiksha&apos;s Craft
      </span>
    </Link>
  );
}
