// One-off image optimization for hosting: converts heavy photo PNGs to WebP
// (max 1600px wide, quality 80) and deletes the originals. Run:
//   node scripts/compress-images.mjs
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const DIRS = ["public/gallery", "public/services", "public/clinic", "public/doctors"];
const FILES = ["src/assets/before.png", "src/assets/after.png"];
const MAX_WIDTH = 1600;
const QUALITY = 80;

async function toWebp(input, output) {
  const img = sharp(input).rotate();
  const meta = await img.metadata();
  if (meta.width > MAX_WIDTH) img.resize({ width: MAX_WIDTH });
  const info = await img.webp({ quality: QUALITY }).toFile(output);
  const beforeKb = Math.round(statSync(input).size / 1024);
  const afterKb = Math.round(info.size / 1024);
  console.log(`${input} -> ${output}  ${beforeKb} KB -> ${afterKb} KB`);
}

for (const dir of DIRS) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (!statSync(file).isFile()) continue;
    if (![".png", ".jpg", ".jpeg"].includes(extname(name).toLowerCase())) continue;
    const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
    await toWebp(file, out);
    unlinkSync(file);
  }
}

for (const file of FILES) {
  try {
    statSync(file);
  } catch {
    console.log(`skip (missing): ${file}`);
    continue;
  }
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
  await toWebp(file, out);
  unlinkSync(file);
}
