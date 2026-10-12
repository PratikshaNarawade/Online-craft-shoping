import fs from "node:fs";

const DB_PATH = "E:/Pratiksha's Craft/data/db.json";
const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

function addCol(p, id) {
  if (!p.collectionIds.includes(id)) p.collectionIds.push(id);
}

const names = {
  "p-floral-mirror-01": "Sunflower Mirror",
  "p-floral-mirror-02": "Heart Mirror 6\"",
  "p-floral-mirror-03": "Fairy-Light Flower Mirror",
  "p-wall-decor-09": "Glowing Lotus Lamp",
  "p-wall-decor-02": "Pink Lotus Strand",
  "p-wall-decor-03": "Blue Lily Wreath",
  "p-wall-decor-05": "Pink Bell Mobile",
  "p-wall-decor-06": "Lotus Ring Hanging",
  "p-wall-decor-07": "Pink Daisy Hanging",
  "p-wall-decor-08": "Pink Vine Garland",
  "p-shubh-labh-01": "Shubh Labh — Red Welcome",
  "p-shubh-labh-02": "Shubh Labh — Pink Pearl",
  "p-shubh-labh-03": "Shubh Labh — Sunflower",
  "p-shubh-labh-04": "Shubh Labh — Red Gold",
  "p-shubh-labh-05": "Shubh Labh — Pink Pair",
  "p-shubh-labh-06": "Shubh Labh — Magenta Door",
  "p-shubh-labh-07": "Shubh Labh — Red Medallion",
};

for (const p of db.products) {
  if (names[p.id]) p.name = names[p.id];
  if (p.collectionIds.includes("c-shubh")) {
    addCol(p, "c-wall");
    addCol(p, "c-curtain");
  }
  if (p.collectionIds.includes("c-wall")) addCol(p, "c-curtain");
  if (p.collectionIds.includes("c-mirror")) {
    addCol(p, "c-wall");
    addCol(p, "c-curtain");
  }
  if (p.id === "p-wall-decor-09") {
    addCol(p, "c-diya");
    addCol(p, "c-haar");
  }
}

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2) + "\n");
console.log("updated products", db.products.length);
