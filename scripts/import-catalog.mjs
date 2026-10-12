import fs from "node:fs";
import path from "node:path";

const SRC = "C:/Users/KAI/.cursor/projects/e-Pratiksha-s-Craft/assets";
const ROOT = "E:/Pratiksha's Craft";
const DEST = path.join(ROOT, "public", "craft");
const DB_PATH = path.join(ROOT, "data", "db.json");

const COLLECTIONS = [
  {
    id: "c-bouquet",
    name: "Bouquets",
    slug: "chenille-stem-bouquets",
    dest: "bouquet",
    featured: true,
    price: [690, 2490],
    item: "Bouquet",
    description:
      "Everlasting chenille-stem bouquets — the authentic craft name for pipe-cleaner blooms. Handmade to gift or keep.",
  },
  {
    id: "c-hair-clip",
    name: "Hair Accessories",
    slug: "chenille-stem-hair-accessories",
    dest: "hair-clip",
    featured: true,
    price: [199, 799],
    item: "Hair Accessory",
    description:
      "Handmade chenille-stem hair clips, bands, and matching sets — fuzzy, light, and made to last.",
  },
  {
    id: "c-pot",
    name: "Flower Pots",
    slug: "chenille-stem-flower-pots",
    dest: "flower-pot",
    featured: true,
    price: [449, 899],
    item: "Flower Pot",
    description: "Miniature potted chenille-stem blooms for desks and windowsills — no watering, just colour.",
  },
  {
    id: "c-curtain",
    name: "Curtain Tie-Backs",
    slug: "curtain-tie-backs",
    dest: "curtain",
    featured: true,
    price: [399, 799],
    item: "Curtain Tie-Back",
    description: "Floral chenille-stem curtain holdbacks for windows and festive rooms.",
  },
  {
    id: "c-diya",
    name: "Diyas",
    slug: "chenille-stem-diyas",
    dest: "diya",
    featured: true,
    price: [249, 549],
    item: "Diya",
    description: "Festive chenille-stem diyas — everlasting glow for pooja and Diwali décor.",
  },
  {
    id: "c-lotus",
    name: "Lotus Blooms",
    slug: "lotus-blooms",
    dest: "lotus",
    featured: false,
    price: [399, 899],
    item: "Lotus",
    description: "Hand-twisted lotus blooms from chenille stems (pipe cleaners).",
  },
  {
    id: "c-asan",
    name: "Ganpati Asan",
    slug: "ganpati-asan",
    dest: "ganpati-asan",
    featured: true,
    price: [799, 1490],
    item: "Ganpati Asan",
    description: "Handmade chenille-stem asan for Ganpati — festive, auspicious seating décor.",
  },
  {
    id: "c-haar",
    name: "Ganpati Haar",
    slug: "haar-garlands",
    dest: "haar",
    featured: true,
    price: [599, 1290],
    item: "Ganpati Haar",
    description: "Handmade pipe-cleaner Ganpati haar — everlasting floral garlands for idols, pooja, and festive gifting.",
  },
  {
    id: "c-keychain",
    name: "Keychains",
    slug: "chenille-stem-keychains",
    dest: "keychain",
    featured: true,
    price: [149, 349],
    item: "Keychain",
    description: "Tiny chenille-stem charms on keyrings — handmade keepsakes.",
  },
  {
    id: "c-purse",
    name: "Mini Purse",
    slug: "mini-purse",
    dest: "purse",
    featured: false,
    price: [499, 899],
    item: "Mini Purse",
    description: "A handmade chenille-stem mini purse — sculptural and giftable.",
  },
  {
    id: "c-shubh",
    name: "Shubh Labh",
    slug: "shubh-labh",
    dest: "shubh-labh",
    featured: true,
    price: [799, 1590],
    item: "Shubh Labh Wall Hanging",
    description: "Traditional Shubh Labh hangings twisted from chenille stems with pearl accents.",
  },
  {
    id: "c-wall",
    name: "Wall Decor",
    slug: "wall-decor",
    dest: "wall-decor",
    featured: true,
    price: [899, 1890],
    item: "Wall Decor",
    description: "Cascading chenille-stem wall hangings, wreaths, and floral mobiles.",
  },
  {
    id: "c-mirror",
    name: "Floral Mirrors",
    slug: "floral-mirrors",
    dest: "floral-mirror",
    featured: true,
    price: [699, 1490],
    item: "Floral Mirror",
    description: "Mirrors framed with handmade chenille-stem flowers — room décor that lasts.",
  },
];

const PREFIXES = [
  ["hair_clip._and_band", "c-hair-clip"],
  ["hair_clip._and", "c-hair-clip"],
  ["ganpati_asan", "c-asan"],
  ["ganpati_har", "c-haar"],
  ["curtain_band", "c-curtain"],
  ["flower_pot", "c-pot"],
  ["subh_labh", "c-shubh"],
  ["wall_decor", "c-wall"],
  ["wallmirror", "c-mirror"],
  ["wallmirro", "c-mirror"],
  ["hair_clip.", "c-hair-clip"],
  ["haircclip", "c-hair-clip"],
  ["hairclip", "c-hair-clip"],
  ["hair_clip", "c-hair-clip"],
  ["hair_band", "c-hair-clip"],
  ["keychain", "c-keychain"],
  ["bouquet", "c-bouquet"],
  ["diya", "c-diya"],
  ["haar", "c-haar"],
  ["purse", "c-purse"],
  ["ltus", "c-lotus"],
  ["flower", "c-lotus"],
];

function hash(s) {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

function classify(filename) {
  const marker = "_images_";
  const i = filename.indexOf(marker);
  if (i < 0) return null;
  const rest = filename.slice(i + marker.length);
  const ext = path.extname(rest).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return null;
  const stem = rest.slice(0, -ext.length);
  const uuidRe = /-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const label = stem.replace(uuidRe, "").replace(/_+$/, "");
  const lower = label.toLowerCase();
  if (lower === "images" || lower.startsWith("images__")) return null;
  for (const [prefix, id] of PREFIXES) {
    if (lower === prefix || lower.startsWith(prefix + "__") || lower.startsWith(prefix + "_")) {
      const numMatch = lower.match(/__(\d+)$/);
      return { id, num: numMatch ? Number(numMatch[1]) : 0, ext };
    }
  }
  return null;
}

function priceIn(min, max, seed) {
  const step = 10;
  const steps = Math.floor((max - min) / step);
  return min + (hash(seed) % (steps + 1)) * step;
}

fs.mkdirSync(DEST, { recursive: true });

const files = fs.readdirSync(SRC);
const grouped = new Map(COLLECTIONS.map((c) => [c.id, []]));
const skipped = [];

for (const file of files) {
  const info = classify(file);
  if (!info) {
    skipped.push(file);
    continue;
  }
  grouped.get(info.id).push({ file, ...info });
}

const collections = [];
const products = [];
let dateOffset = 0;

for (const col of COLLECTIONS) {
  const items = grouped.get(col.id) ?? [];
  items.sort((a, b) => a.num - b.num || a.file.localeCompare(b.file));
  if (!items.length) continue;

  items.forEach((item, idx) => {
    const n = String(idx + 1).padStart(2, "0");
    const destName = `${col.dest}-${n}${item.ext}`;
    fs.copyFileSync(path.join(SRC, item.file), path.join(DEST, destName));
    item.publicPath = `/craft/${destName}`;
    item.n = n;
  });

  collections.push({
    id: col.id,
    name: col.name,
    slug: col.slug,
    description: col.description,
    image: items[0].publicPath,
    featured: col.featured,
  });

  for (const [idx, item] of items.entries()) {
    const n = item.n;
    const seed = `${col.id}-${n}`;
    const price = priceIn(col.price[0], col.price[1], seed);
    const compareAt = hash(seed + "c") % 3 === 0 ? price + 100 + (hash(seed) % 10) * 10 : 0;
    const created = new Date(Date.UTC(2026, 6, 1 + (dateOffset % 28), 10, 0, 0));
    dateOffset += 1;
    products.push({
      id: `p-${col.dest}-${n}`,
      name: `${col.item} ${n}`,
      slug: `${col.dest}-${n}`,
      description: col.description,
      details:
        "Hand-twisted from chenille stems — the authentic craft name for pipe cleaners. Soft, sculptural, and everlasting. Packed with care from Pratiksha's Craft studio.",
      price,
      compareAt,
      images: [item.publicPath],
      collectionIds: [col.id],
      stock: 4 + (hash(seed) % 16),
      featured: idx < 2 && col.featured,
      bestseller: idx === 0,
      createdAt: created.toISOString(),
    });
  }
}

const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
const hero = collections.find((c) => c.id === "c-bouquet")?.image ?? collections[0].image;
const featured = products.find((p) => p.id.startsWith("p-bouquet-")) ?? products[0];
const reelSources = [
  ["c-bouquet", "Bouquet"],
  ["c-hair-clip", "Hair accessories"],
  ["c-pot", "Flower pots"],
  ["c-shubh", "Shubh Labh"],
  ["c-wall", "Wall decor"],
  ["c-diya", "Diyas"],
];

db.settings.tagline = "Because handmade is lasting.";
db.content = {
  ...db.content,
  announcement: {
    enabled: true,
    text: "Handmade pipe-cleaner blooms that last.",
    link: "/shop",
  },
  announcements: [
    "Handmade pipe-cleaner art that lasts",
    "Partial COD is now available",
    "Free shipping on prepaid orders above ₹999",
    "Shubh Labh, Haar, Diyas, and everlasting bouquets",
  ],
  heroTitle: "Handmade crafts, made to last",
  heroImage: hero,
  featuredProductId: featured.id,
  story: {
    eyebrow: "Our story",
    title: "Welcome to Pratiksha's Craft",
    body: "Pratiksha's Craft is a studio of chenille stem crafts — the authentic name for pipe-cleaner art. Every bouquet, flower pot, hair clip, Shubh Labh hanging, and festive piece is twisted by hand from fuzzy chenille stems. Soft, sculptural, and made to last for years without water.",
    image: collections.find((c) => c.id === "c-wall")?.image ?? hero,
  },
  why: [
    { title: "Handcrafted", body: "Every bloom is twisted by hand from chenille stems — no machines, no shortcuts." },
    { title: "Everlasting", body: "These flowers never need water. They stay as they were gifted, for years." },
    {
      title: "Pipe-cleaner art",
      body: "The authentic craft name for pipe cleaners: soft, sculptural yarn wrapped on wire, colourfast and lasting.",
    },
    { title: "Personal note", body: "Add a handwritten message at checkout. We tuck it into every parcel." },
  ],
  reels: reelSources
    .map(([id, caption], i) => {
      const col = collections.find((c) => c.id === id);
      if (!col) return null;
      return { id: `r${i + 1}`, image: col.image, caption, url: db.settings.instagram };
    })
    .filter(Boolean),
};

db.collections = collections;
db.products = products;
db.faqs = [
  {
    id: "f1",
    question: "What are chenille stems?",
    answer:
      "Chenille stems are the authentic craft name for pipe cleaners — soft, fuzzy yarn wrapped around a flexible wire. We twist them by hand into flowers, décor, and accessories that last.",
  },
  {
    id: "f2",
    question: "Are the flowers completely handmade?",
    answer: "Yes. Every piece is twisted by hand from chenille stems. No machines, no shortcuts — just time and craft.",
  },
  {
    id: "f3",
    question: "Do they need water?",
    answer: "No. These blooms are everlasting. Dust them gently if needed. They will not wilt.",
  },
  {
    id: "f4",
    question: "Can I request a custom colour or size?",
    answer: "Yes. Message us on WhatsApp with a photo or colour preference. Handmade pieces can often be made to order.",
  },
  {
    id: "f5",
    question: "How long does delivery take?",
    answer: "Within India, deliveries usually take 5–8 business days. Each piece is packed with care and shipped securely.",
  },
  {
    id: "f6",
    question: "What is the return policy?",
    answer:
      "Returns are accepted for in-transit damage reported within 24 hours of delivery with an uncut unboxing video. Write to us on Instagram or email.",
  },
];

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2) + "\n");

const counts = collections.map((c) => `${c.name}: ${products.filter((p) => p.collectionIds.includes(c.id)).length}`);
console.log(`Imported ${products.length} products in ${collections.length} collections`);
console.log(counts.join("\n"));
console.log(`Skipped ${skipped.length} unrelated files`);
console.log(`Wrote ${DB_PATH}`);
console.log(`Hero ${hero} featured ${featured.id}`);
