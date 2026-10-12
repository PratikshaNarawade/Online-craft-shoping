import fs from "node:fs";

const DB_PATH = "E:/Pratiksha's Craft/data/db.json";
const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
let n = 0;
for (const p of db.products) {
  if (p.collectionIds.includes("c-curtain") && !p.collectionIds.includes("c-wall")) {
    p.collectionIds.push("c-wall");
    n++;
  }
}
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2) + "\n");
console.log(`Added Home Decor to ${n} curtain products`);
