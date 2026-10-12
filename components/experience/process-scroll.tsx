const STEPS = [
  { n: "01", t: "Pick", b: "A colour. A mood. A person you want to surprise." },
  { n: "02", t: "Bend", b: "The stem follows the hand. Nothing is machine-pressed." },
  { n: "03", t: "Shape", b: "Petals, loops, letters, a Shubh Labh — still yarn on wire." },
  { n: "04", t: "Create", b: "The piece leaves the studio packed with a note." },
  { n: "05", t: "Share", b: "It sits on a shelf, in a braid, on a door — and does not wilt." },
];

export function ProcessScroll() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <p className="text-[11px] tracking-[0.42em] text-hot uppercase">The process</p>
      <h2 className="mt-4 font-sans text-5xl font-extrabold uppercase tracking-[-0.04em] md:text-6xl">
        Idea → bend → shape → create
      </h2>
      <ol className="mt-16">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="group grid items-end gap-4 border-t border-hot/25 py-8 md:grid-cols-[8rem_1fr_1.2fr] md:py-12"
          >
            <span className="font-sans text-5xl font-extrabold text-hot md:text-7xl">{s.n}</span>
            <h3 className="font-serif text-4xl italic md:text-6xl">{s.t}</h3>
            <p className="max-w-md text-sm leading-relaxed text-fog md:justify-self-end">{s.b}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
