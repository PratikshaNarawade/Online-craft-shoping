"use client";

import { useRef } from "react";

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "rotateX(0) rotateY(0)";
  }

  return (
    <div className="[perspective:800px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={`transition-transform duration-200 will-change-transform ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
