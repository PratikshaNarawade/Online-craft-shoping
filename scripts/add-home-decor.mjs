import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = "E:/Pratiksha's Craft";
const SRC = "C:/Users/KAI/.cursor/projects/e-Pratiksha-s-Craft/assets";
const DEST = path.join(ROOT, "public", "craft");
const DB_PATH = path.join(ROOT, "data", "db.json");

const DETAILS =
  "Hand-twisted from chenille stems — the authentic craft name for pipe cleaners. Soft, sculptural, and everlasting. Packed with care from Pratiksha's Craft studio.";

function hashFile(file) {
  return crypto.createHash("sha1").update(fs.readFileSync(file)).digest("hex");
}

function findAsset(part) {
  const files = fs.readdirSync(SRC).filter((n) => n.includes(part) && n.endsWith(".jpg"));
  if (!files.length) throw new Error(`Missing asset: ${part}`);
  files.sort((a, b) => fs.statSync(path.join(SRC, b)).mtimeMs - fs.statSync(path.join(SRC, a)).mtimeMs);
  return path.join(SRC, files[0]);
}

const existingHash = new Map();
for (const name of fs.readdirSync(DEST)) {
  if (!/\.(jpg|jpeg|png|webp)$/i.test(name)) continue;
  existingHash.set(hashFile(path.join(DEST, name)), `/craft/${name}`);
}

const items = [
  { part: "ganpati_har_-4e4a9883", dest: "haar-06.jpg", id: "p-haar-06", name: "Ganpati Haar — Festive Bloom", slug: "haar-06", price: 1099, collections: ["c-haar"], description: "Handmade pipe-cleaner Ganpati haar for pooja and festive gifting." },
  { part: "haar__2_-930966f8", dest: "haar-07.jpg", id: "p-haar-07", name: "Ganpati Haar — Pearl Strand", slug: "haar-07", price: 999, collections: ["c-haar"], description: "A festive Ganpati haar twisted from chenille stems and pearls." },
  { part: "haar__3_-afe70747", dest: "haar-08.jpg", id: "p-haar-08", name: "Ganpati Haar — Temple Bloom", slug: "haar-08", price: 1049, collections: ["c-haar"], description: "Everlasting floral haar for Ganpati, handmade from pipe cleaners." },
  { part: "haar-f40e730d", dest: "haar-09.jpg", id: "p-haar-09", name: "Ganpati Haar — Classic", slug: "haar-09", price: 949, collections: ["c-haar"], description: "Classic handmade Ganpati haar in chenille stems." },
  { part: "haar__4_-086b4b91", dest: "haar-10.jpg", id: "p-haar-10", name: "Ganpati Haar — Garden Bloom", slug: "haar-10", price: 989, collections: ["c-haar"], description: "A garden-style Ganpati haar of pipe-cleaner flowers and pearls." },
  { part: "subh_labh__2_-f55797be", dest: "shubh-labh-08.jpg", id: "p-shubh-labh-08", name: "Shubh Labh — Pink Pearl", slug: "shubh-labh-08", price: 1290, collections: ["c-shubh", "c-wall", "c-curtain"], description: "Pink Shubh hanging with pearls — handmade home décor and curtain accent." },
  { part: "subh_labh-af7e5149", dest: "shubh-labh-09.jpg", id: "p-shubh-labh-09", name: "Shubh Labh — Red Welcome", slug: "shubh-labh-09", price: 1390, collections: ["c-shubh", "c-wall", "c-curtain"], description: "Red Shubh Labh pair to welcome prosperity — wall hanging and festive décor." },
  { part: "subh_labh__4_-e493aac5", dest: "shubh-labh-10.jpg", id: "p-shubh-labh-10", name: "Shubh Labh — Red Gold", slug: "shubh-labh-10", price: 1190, collections: ["c-shubh", "c-wall", "c-curtain"], description: "Red pipe-cleaner flowers with gold centres — Shubh Labh hangings for the home." },
  { part: "subh_labh__5_-a8147039", dest: "shubh-labh-11.jpg", id: "p-shubh-labh-11", name: "Shubh Labh — Pink Pair", slug: "shubh-labh-11", price: 1340, collections: ["c-shubh", "c-wall", "c-curtain"], description: "Pink Shubh Labh pair with pearl drops — handmade for walls or curtains." },
  { part: "subh_labh__6_-6ad7efa7", dest: "shubh-labh-12.jpg", id: "p-shubh-labh-12", name: "Shubh Labh — Magenta Door", slug: "shubh-labh-12", price: 1490, collections: ["c-shubh", "c-wall", "c-curtain"], description: "Magenta Shubh Labh hangings with wooden mounts — festive home décor." },
  { part: "subh_labh__7_-08240ff8", dest: "shubh-labh-13.jpg", id: "p-shubh-labh-13", name: "Shubh Labh — Red Medallion", slug: "shubh-labh-13", price: 1190, collections: ["c-shubh", "c-wall", "c-curtain"], description: "Red flower hangings with gold centres — for walls or as curtain tie-backs." },
  { part: "subh_labh__3_-add3c919", dest: "shubh-labh-14.jpg", id: "p-shubh-labh-14", name: "Shubh Labh — Sunflower", slug: "shubh-labh-14", price: 1290, collections: ["c-shubh", "c-wall", "c-curtain"], description: "Yellow sunflower Shubh Labh pair — handmade chenille-stem wall décor." },
  { part: "wall_decor__2_-90461c42", dest: "wall-decor-10.jpg", id: "p-wall-decor-10", name: "Pink Lotus Strand", slug: "wall-decor-10", price: 1190, collections: ["c-wall", "c-curtain"], description: "Pink lotus strand hanging — for walls, doors, or as a curtain accent." },
  { part: "wall_decor__3_-5feb0c19", dest: "wall-decor-11.jpg", id: "p-wall-decor-11", name: "Blue Lily Wreath", slug: "wall-decor-11", price: 1090, collections: ["c-wall", "c-curtain"], description: "Blue and white lily wreath — wall décor or a floral curtain tie-back." },
  { part: "wall_decor__5_-f7257599", dest: "wall-decor-12.jpg", id: "p-wall-decor-12", name: "Pink Bell Mobile", slug: "wall-decor-12", price: 990, collections: ["c-wall", "c-curtain"], description: "Pink bell flowers on a mint canopy — hanging décor for windows and walls." },
  { part: "wall_decor__6_-21a1e3fa", dest: "wall-decor-13.jpg", id: "p-wall-decor-13", name: "Lotus Ring Hanging", slug: "wall-decor-13", price: 1190, collections: ["c-wall", "c-curtain"], description: "Pink lotus on a white ring — window hanging and home décor." },
  { part: "wall_decor__8_-d393a12c", dest: "wall-decor-14.jpg", id: "p-wall-decor-14", name: "Pink Vine Garland", slug: "wall-decor-14", price: 1290, collections: ["c-wall", "c-curtain"], description: "Cascading pink vine for curtains and walls — everlasting chenille blooms." },
  { part: "wall_decor__7_-3ecddf00", dest: "wall-decor-15.jpg", id: "p-wall-decor-15", name: "Pink Daisy Hanging", slug: "wall-decor-15", price: 890, collections: ["c-wall", "c-curtain"], description: "Pink daisy hanging with pearl strands — home décor and curtain accent." },
  { part: "wall_decor__9_-4d56c5f9", dest: "diya-07.jpg", id: "p-diya-07", name: "Glowing Lotus Lamp", slug: "diya-07", price: 1490, collections: ["c-diya", "c-haar", "c-wall"], description: "Lit pink lotus lamp on a green stem — festive diya and home décor." },
  { part: "wallmirror-4dc7847d", dest: "floral-mirror-04.jpg", id: "p-floral-mirror-04", name: "Heart Mirror 6\"", slug: "floral-mirror-04", price: 1290, collections: ["c-mirror", "c-wall"], description: "Six-inch heart mirror framed with magenta pipe-cleaner flowers and pearls." },
  { part: "wallmirro__2_-a9f51806", dest: "floral-mirror-05.jpg", id: "p-floral-mirror-05", name: "Fairy-Light Flower Mirror", slug: "floral-mirror-05", price: 1390, collections: ["c-mirror", "c-wall"], description: "Round mirror framed with pink flowers, leaves, and warm fairy lights." },
  { part: "wallmirro-e9d52c93", dest: "floral-mirror-06.jpg", id: "p-floral-mirror-06", name: "Sunflower Mirror", slug: "floral-mirror-06", price: 1340, collections: ["c-mirror", "c-wall"], description: "Circular mirror framed with handmade pipe-cleaner sunflowers." },
];

const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
const existingIds = new Set(db.products.map((p) => p.id));
const added = [];
const skipped = [];

for (const item of items) {
  let src;
  try {
    src = findAsset(item.part);
  } catch (err) {
    skipped.push(`${item.dest}: ${err.message}`);
    continue;
  }
  const h = hashFile(src);
  if (existingHash.has(h)) {
    skipped.push(`${item.name} (same photo as ${existingHash.get(h)})`);
    continue;
  }
  if (existingIds.has(item.id)) {
    skipped.push(`${item.id} already in catalog`);
    continue;
  }
  const destPath = path.join(DEST, item.dest);
  fs.copyFileSync(src, destPath);
  existingHash.set(h, `/craft/${item.dest}`);
  db.products.push({
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.description,
    details: DETAILS,
    price: item.price,
    compareAt: 0,
    images: [`/craft/${item.dest}`],
    collectionIds: item.collections,
    stock: 8,
    featured: true,
    bestseller: false,
    createdAt: "2026-09-02T10:00:00.000Z",
  });
  added.push(item.name);
}

for (const p of db.products) {
  if (p.collectionIds.includes("c-diya") && !p.collectionIds.includes("c-haar")) {
    p.collectionIds.push("c-haar");
  }
}

const wall = db.collections.find((c) => c.id === "c-wall");
if (wall) {
  wall.name = "Home Decor";
  wall.description = "Handmade pipe-cleaner wall hangings, wreaths, mirrors, and festive home décor.";
}

const diya = db.collections.find((c) => c.id === "c-diya");
if (diya) diya.featured = false;

const haar = db.collections.find((c) => c.id === "c-haar");
if (haar) {
  haar.description =
    "Handmade Ganpati haar, festive diyas, and pooja décor — everlasting chenille-stem crafts for the season.";
}

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2) + "\n");
console.log("Added:\n" + added.map((n) => "  " + n).join("\n"));
console.log("Skipped:\n" + skipped.map((n) => "  " + n).join("\n"));
