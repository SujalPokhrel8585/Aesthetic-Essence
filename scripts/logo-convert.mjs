// One-off: convert New images/logo.jpg into site logo assets.
// - public/logo.webp + public/logo-dark.webp: gold-on-transparent (white removed)
// - public/logo.png: white-background OG/schema image
// - public/favicon.png / favicon-192.png / favicon.jpeg: square crops
import sharp from "sharp";
import path from "path";

const SRC = path.resolve("New images/logo.jpg");
const OUT = (n) => path.resolve("public", n);

async function logoTransparent(outFile) {
  const { data, info } = await sharp(SRC)
    .resize(1200, null, { fit: "inside", withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const px = info.width * info.height;
  for (let i = 0; i < px; i++) {
    const o = i * info.channels;
    const r = data[o], g = data[o + 1], b = data[o + 2];
    // near-white → transparent, with a soft falloff so gold edges survive
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const sat = max - min;
    const lum = (r + g + b) / 3;
    if (lum > 225 && sat < 40) data[o + 3] = 0;
    else if (lum > 195 && sat < 45) data[o + 3] = Math.round(255 * (225 - lum) / 30);
  }
  await sharp(data, { raw: info }).png().toFile(outFile);
  await sharp(await sharp(data, { raw: info }).png().toBuffer()).webp({ quality: 92 }).toFile(outFile.replace(".png", ".webp"));
}

await logoTransparent(OUT("logo.png")); // writes logo.png + logo.webp
await logoTransparent(OUT("logo-dark.png")); // same gold, used on dark (reads on ink)
await sharp(OUT("logo-dark.png")).toFile(OUT("logo-dark.webp")).catch(() => {});

// square favicons from the gold-on-transparent master
const master = await sharp(OUT("logo.webp")).resize(512, 512, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
await sharp(master).toFile(OUT("favicon.png"));
await sharp(master).resize(192, 192).png().toFile(OUT("favicon-192.png"));
await sharp(master).flatten({ background: "#ffffff" }).jpeg({ quality: 92 }).toFile(OUT("favicon.jpeg"));
console.log("logo assets written");
