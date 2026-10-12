const HELPS = [
  {
    k: "How we help",
    t: "Gift without a calendar",
    b: "Everlasting blooms cross the border between occasion and everyday. A birthday that stays on the shelf.",
  },
  {
    k: "Programs",
    t: "Colour, made to order",
    b: "Send a swatch or a photograph. Handmade pieces can often be twisted in the palette you need.",
  },
  {
    k: "Initiatives",
    t: "Festive rooms, rewritten",
    b: "Shubh Labh, haar, diyas — objects for the doorway and the pooja shelf, built to return every year.",
  },
  {
    k: "From the studio",
    t: "A note in the parcel",
    b: "Commerce with a handwriting. We tuck a personal line into every box that leaves the atelier.",
  },
];

export function HelpSpine() {
  return (
    <section className="relative px-5 py-28 md:px-10">
      <p className="text-[11px] tracking-[0.42em] text-gold uppercase">How we help</p>
      <h2 className="mt-4 max-w-4xl font-serif text-5xl md:text-6xl">
        Opportunity is a <span className="italic text-gold">thread</span>, not a border.
      </h2>

      <ol className="relative mx-auto mt-20 max-w-3xl">
        <span className="absolute top-3 bottom-3 left-[0.4rem] w-px bg-gradient-to-b from-gold via-gold/40 to-transparent md:left-[1.35rem]" />
        {HELPS.map((h, i) => (
          <li key={h.t} className="relative mb-16 pl-10 md:pl-16">
            <span className="absolute top-2 left-0 h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_18px_rgba(232,145,164,0.9)] md:left-4" />
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
              {String(i + 1).padStart(2, "0")} · {h.k}
            </p>
            <h3 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{h.t}</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">{h.b}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
