export function StemThread() {
  return (
    <div className="pointer-events-none overflow-hidden px-5 md:px-10" aria-hidden>
      <svg className="h-16 w-full text-hot md:h-24" viewBox="0 0 1200 80" fill="none" preserveAspectRatio="none">
        <path
          d="M-20 48 C 180 8, 340 78, 560 36 S 900 8, 1220 52"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          className="opacity-80"
        />
        <path
          d="M-20 56 C 200 18, 360 86, 580 44 S 920 16, 1220 60"
          stroke="#f3c2d0"
          strokeWidth="3"
          strokeLinecap="round"
          className="opacity-50"
        />
      </svg>
    </div>
  );
}
