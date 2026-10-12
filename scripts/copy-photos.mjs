import fs from "node:fs";
import path from "node:path";

const src = "C:/Users/KAI/.cursor/projects/e-Pratiksha-s-Craft/assets";
const dest = path.join(process.cwd(), "public", "craft");
fs.mkdirSync(dest, { recursive: true });
const files = fs.readdirSync(src).filter((f) => f.toLowerCase().endsWith(".png"));
for (const f of files) {
  fs.copyFileSync(path.join(src, f), path.join(dest, f));
}
console.log(`copied ${files.length} files to ${dest}`);
console.log(files.map((f) => `${f} ${fs.statSync(path.join(dest, f)).size}`).join("\n"));
