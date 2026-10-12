export function Bloom3D({ className = "" }: { className?: string }) {
  return (
    <div className={`[perspective:1200px] ${className}`} aria-hidden>
      <div className="bloom-spin relative mx-auto h-64 w-64 md:h-80 md:w-80">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-1/2 left-1/2 h-28 w-12 -translate-x-1/2 -translate-y-full rounded-[50%] opacity-95 md:h-36 md:w-14"
            style={{
              background:
                i % 2
                  ? "linear-gradient(to bottom, #fceef3, #ff3d8a 50%, #d61a7a)"
                  : "linear-gradient(to bottom, #f3c2d0, #ff3d8a 45%, #8a1048)",
              transform: `rotate(${i * 36}deg) translateZ(${10 + (i % 3) * 8}px)`,
              transformOrigin: "bottom center",
              boxShadow: "0 12px 28px rgba(255, 61, 138, 0.4)",
            }}
          />
        ))}
        <span className="absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#fceef3] via-[#ff3d8a] to-[#d61a7a] shadow-[0_0_40px_rgba(255,61,138,0.75)] md:h-16 md:w-16" />
      </div>
    </div>
  );
}
