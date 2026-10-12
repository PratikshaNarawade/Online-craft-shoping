"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  { n: "01", t: "Straight", b: "A chenille stem is yarn wrapped on wire. Soft. Fuzzy. Ready." },
  { n: "02", t: "Bend", b: "The wire remembers your hand. A curve becomes a petal." },
  { n: "03", t: "Twist", b: "Two stems meet. Colour locks. A bloom starts to exist." },
  { n: "04", t: "Shape", b: "Leaves, loops, a face, a doorway hanging — still one material." },
  { n: "05", t: "Create", b: "No water. No season. The form stays as you left it." },
];

export function MaterialStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onMq = () => setReduce(mq.matches);
    mq.addEventListener("change", onMq);
    const el = ref.current;
    if (!el) return () => mq.removeEventListener("change", onMq);
    function onScroll() {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(0.999, Math.max(0, -r.top / (r.height - window.innerHeight)));
      setI(Math.min(STAGES.length - 1, Math.floor(p * STAGES.length)));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const stage = STAGES[i];
  const bend = reduce ? 0 : i * 18;

  return (
    <section className="surface-cream">
      <div ref={ref} className="relative h-[220vh]">
        <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center px-5 py-20 md:px-10">
          <p className="text-[11px] tracking-[0.42em] text-magenta uppercase">The material</p>
          <h2 className="mt-4 max-w-4xl font-sans text-5xl font-extrabold leading-[0.88] tracking-[-0.04em] text-charcoal uppercase md:text-7xl">
            One simple material.
            <span className="block italic text-magenta">Endless forms.</span>
          </h2>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative h-40 overflow-hidden md:h-56">
              <span
                className="absolute top-1/2 left-[8%] h-7 w-[84%] origin-left rounded-full bg-[linear-gradient(90deg,#f3c2d0,#ff3d8a_40%,#d61a7a_70%,#f3c2d0)] shadow-[0_12px_30px_rgba(214,26,122,0.35)] transition-transform duration-500"
                style={{ transform: `translateY(-50%) rotate(${bend - 20}deg) scaleX(${1 - i * 0.06})` }}
              />
              <span
                className="absolute top-1/2 left-[18%] h-7 w-[70%] origin-left rounded-full bg-[linear-gradient(90deg,#ff3d8a,#f3c2d0,#d61a7a)] opacity-80 transition-transform duration-500"
                style={{ transform: `translateY(-30%) rotate(${-bend}deg)` }}
              />
            </div>
            <div>
              <p className="font-sans text-6xl font-extrabold text-hot">{stage.n}</p>
              <h3 className="mt-2 font-serif text-5xl text-charcoal">{stage.t}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal/70">{stage.b}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
