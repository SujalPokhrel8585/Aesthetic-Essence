// Captures the 3D stethoscope hero as static WebP images for devices that
// skip WebGL entirely (see src/lib/deviceCapability.ts — "low" tier).
//
// Usage: node scripts/capture-stethoscope.mjs
// Requires a locally installed Chrome or Edge (playwright-core drives the
// system browser via channel, nothing is downloaded).
//
// Output: src/assets/stethoscope-light.webp and stethoscope-dark.webp
// (plus temporary .png previews next to them for visual review).

import { chromium } from "playwright-core";
import { createServer } from "vite";
import sharp from "sharp";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(root, "src", "assets");
const PORT = 5199;

async function launchBrowser() {
  for (const channel of ["msedge", "chrome", "msedge-beta", "chrome-canary"]) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch (err) {
      console.log(`channel ${channel} not available: ${err.message.split("\n")[0]}`);
    }
  }
  console.error(
    "No system Chrome/Edge found. Install one, or run `npx playwright install chromium` and switch to chromium.launch() without a channel.",
  );
  process.exit(1);
}

const server = await createServer({
  root,
  server: { port: PORT, strictPort: true },
  logLevel: "silent",
});
await server.listen();
console.log(`vite dev server on http://localhost:${PORT}`);

const browser = await launchBrowser();
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2, // crisp on retina phones
});

// Pre-select the theme via the app's own storage key.
async function capture(theme) {
  await page.addInitScript(
    ([key, value]) => localStorage.setItem(key, value),
    ["lotus-theme", theme],
  );
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });

  // Wait for the R3F canvas, then a beat so the GLB model + environment load
  // and the model settles into its base pose.
  await page.waitForSelector(".canvas-wrapper canvas", { timeout: 30_000 });
  await page.waitForTimeout(4000);

  // Capture just the model: physically remove everything layered around the
  // canvas (glow circles, backdrop blobs, floating badges, status card) so the
  // WebP is a clean transparent cut-out. Removing beats CSS hiding here since
  // motion-driven elements re-apply their inline styles every frame.
  await page.evaluate(() => {
    document
      .querySelectorAll(
        ".badge-icon, .hero-status-card, .model-backdrop-blob, .circle",
      )
      .forEach((el) => el.remove());
    document
      .querySelectorAll(
        "html, body, main, .hero-visual, .canvas-wrapper, .page-gradient-bg",
      )
      .forEach((el) => (el.style.background = "transparent"));
  });

  const canvas = await page.$(".canvas-wrapper canvas");
  const pngPath = path.join(OUT_DIR, `stethoscope-${theme}.png`);
  await canvas.screenshot({ path: pngPath, omitBackground: true });

  const webpPath = path.join(OUT_DIR, `stethoscope-${theme}.webp`);
  await sharp(pngPath).webp({ quality: 85 }).toFile(webpPath);

  const { statSync } = await import("fs");
  console.log(`saved ${webpPath} (${Math.round(statSync(webpPath).size / 1024)} KB)`);
  await page.evaluate(() => localStorage.clear());
}

await capture("light");
await capture("dark");

await browser.close();
await server.close();
console.log("Done.");
