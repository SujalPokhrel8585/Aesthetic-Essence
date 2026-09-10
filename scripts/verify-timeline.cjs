/* Visual + state verification for the M1-M5 scroll reveal timeline.
 * Run: node scripts/verify-timeline.cjs  (dev server on :5199 must be running)
 * Outputs screenshots to .timeline-shots/ and a pass/fail line per scenario.
 */
const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", ".timeline-shots");
fs.mkdirSync(OUT, { recursive: true });

const URL = "http://localhost:5199/";

// Reads the lit/unlit state of the 5 timeline icon circles (M1..M5 only).
async function getIconStates(page) {
  return page.evaluate(() => {
    const out = [];
    for (let i = 1; i <= 5; i++) {
      const span = Array.from(document.querySelectorAll("h4 span")).find(
        (s) => s.textContent.trim() === `M${i}`,
      );
      if (!span) {
        out.push(null);
        continue;
      }
      const row = span.closest("h4").parentElement.parentElement;
      const icon = row.querySelector("div.w-12.h-12");
      out.push(icon ? icon.className.includes("bg-primary") : null);
    }
    return out;
  });
}

async function shot(page, name) {
  // Viewport-only capture: element screenshots scroll the page and would
  // trigger the reveal we're measuring.
  await page.screenshot({ path: path.join(OUT, name) });
}

async function runScenario(browser, { name, theme, viewport, mobile }) {
  const ctx = await browser.newContext({
    viewport,
    ...(mobile ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
  });
  await ctx.addInitScript(
    (t) => localStorage.setItem("ae-theme", t),
    theme,
  );
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);

  const heading = page.locator("text=Rejuvenation Package").first();
  await heading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);

  const states = [];
  let shotIdx = 0;
  states.push(await getIconStates(page));
  await shot(page, `${name}-${shotIdx++}.png`);

  if (mobile) {
    // Scroll down in small steps; each milestone should light up as it enters.
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 220);
      await page.waitForTimeout(600);
      states.push(await getIconStates(page));
      await shot(page, `${name}-${shotIdx++}.png`);
      if (states[states.length - 1].every(Boolean)) break;
    }
    const downStates = [...states];
    // Scroll back up; the lit steps should reverse.
    for (let i = 0; i < 4; i++) {
      await page.mouse.wheel(0, -220);
      await page.waitForTimeout(600);
      states.push(await getIconStates(page));
    }
    const downLit = downStates.map((s) => s.filter(Boolean).length);
    const upLit = states.slice(downStates.length).map((s) => s.filter(Boolean).length);
    const reversed = upLit[upLit.length - 1] < downLit[downLit.length - 1];
    // Lit steps must always form a prefix (no gaps).
    const prefixOk = states.every(
      (s) => s.slice(s.filter(Boolean).length).every((v) => !v),
    );
    const pass =
      states[downStates.length - 1].every(Boolean) &&
      downLit.some((n, i) => i > 0 && n > downLit[0]) &&
      reversed &&
      prefixOk &&
      errors.length === 0;
    console.log(
      `${pass ? "PASS" : "FAIL"} ${name} | down=${downLit.join("->")} up=${upLit.join("->")} errors=${errors.length ? errors.join(";") : "none"}`,
    );
    await ctx.close();
    return pass;
  }

  // Desktop: everything visible -> staggered activation right after load.
  await page.waitForTimeout(1800);
  states.push(await getIconStates(page));
  await shot(page, `${name}-${shotIdx++}.png`);

  const final = states[states.length - 1];
  const allLit = final.length === 5 && final.every(Boolean);
  const pass = allLit && errors.length === 0;

  console.log(
    `${pass ? "PASS" : "FAIL"} ${name} | final=[${final}] steps=${states.length} lit-progression=${states.map((s) => s.filter(Boolean).length).join("->")} errors=${errors.length ? errors.join(";") : "none"}`,
  );
  await ctx.close();
  return pass;
}

(async () => {
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });
  const results = [];
  results.push(
    await runScenario(browser, {
      name: "mobile-light",
      theme: "light",
      viewport: { width: 390, height: 844 },
      mobile: true,
    }),
  );
  results.push(
    await runScenario(browser, {
      name: "mobile-dark",
      theme: "dark",
      viewport: { width: 390, height: 844 },
      mobile: true,
    }),
  );
  results.push(
    await runScenario(browser, {
      name: "desktop-light",
      theme: "light",
      viewport: { width: 1440, height: 900 },
      mobile: false,
    }),
  );
  results.push(
    await runScenario(browser, {
      name: "desktop-dark",
      theme: "dark",
      viewport: { width: 1440, height: 900 },
      mobile: false,
    }),
  );
  await browser.close();
  console.log(results.every(Boolean) ? "ALL PASS" : "SOME FAILED");
  process.exit(results.every(Boolean) ? 0 : 1);
})();
