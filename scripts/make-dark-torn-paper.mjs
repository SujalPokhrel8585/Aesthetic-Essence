// Regenerates src/assets/torn-paper-dark.webp by duplicating the light-mode
// torn paper (src/assets/torn-paper.png) exactly — same shape, dimensions and
// alpha mask — with the paper recolored from near-white to the dark theme's
// accent teal so the tear stays visible against the dark backgrounds.
// Run: node scripts/make-dark-torn-paper.mjs
import sharp from "sharp";

const SRC = "src/assets/torn-paper.png";
const OUT = "src/assets/torn-paper-dark.webp";
const TEAL = [17, 48, 45]; // #11302d — the .dark --accent token in src/index.css

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i += 4) {
  out[i] = TEAL[0];
  out[i + 1] = TEAL[1];
  out[i + 2] = TEAL[2];
  out[i + 3] = data[i + 3]; // keep the original alpha (torn edge + soft fringe)
}
await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
  .webp({ quality: 90, alphaQuality: 90 })
  .toFile(OUT);
console.log("written:", OUT);
