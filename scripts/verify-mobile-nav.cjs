/* Mobile nav regression check.
 * 1. Touch taps in the whitespace BETWEEN menu links (and on the panel
 *    label) must do NOTHING - no navigation, menu stays open.
 *    Regression test for the Chromium touch hit-testing retarget bug:
 *    gap taps used to activate the nearest link and, while the lazy
 *    route chunk loaded, the page rendered blank.
 * 2. Every menu link must navigate to a non-blank page.
 * 3. No console or page errors.
 * Run: node scripts/verify-mobile-nav.cjs   (server on :5199 or TEST_URL)
 * Screenshots land in .nav-shots/
 */
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright-core");

const OUT = path.join(__dirname, "..", ".nav-shots");
fs.mkdirSync(OUT, { recursive: true });
const URL = process.env.TEST_URL || "http://localhost:5199/";

async function openMenu(page) {
  if (!(await page.locator("#mobile-nav").count())) {
    await page.getByRole("button", { name: "Toggle navigation" }).click();
    await page.waitForTimeout(400);
  }
}

async function assertInert(page, name, x, y, failures) {
  await page.touchscreen.tap(x, y);
  await page.waitForTimeout(700);
  const st = await page.evaluate(function () { return {
    url: location.href,
    navOpen: !!document.getElementById("mobile-nav")
  }; });
  const base = URL.replace(/\/$/, "");
  const bad = st.url.replace(/\/$/, "") !== base || !st.navOpen;
  if (bad) failures.push(name);
  console.log(name + " inert=" + !bad + " url=" + st.url + " navOpen=" + st.navOpen);
  return bad;
}

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const errors = [];
  const failures = [];
  page.on("pageerror", function (e) { errors.push("pageerror: " + e.message); });
  page.on("console", function (m) { if (m.type() === "error") { errors.push("console: " + m.text()); } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await openMenu(page);
  const links = page.locator("#mobile-nav a");
  const count = await links.count();
  console.log("menu link count: " + count);
  await page.screenshot({ path: path.join(OUT, "1-menu-open.png") });

  // 1. Gap taps must be inert. Fonts can reflow while the menu is open,
  // so re-measure the two adjacent links FRESH before every tap and
  // skip when the layout resolves the point onto a link (not a gap).
  for (let i = 0; i - 1 < Math.min(count - 1, 6) - 1; i++) {
    await openMenu(page);
    const a = await links.nth(i).boundingBox();
    const b = await links.nth(i + 1).boundingBox();
    const gapY = (a.y + a.height + b.y) / 2;
    const gapX = a.x + a.width / 2;
    const la = (await links.nth(i).textContent()).trim();
    const lb = (await links.nth(i + 1).textContent()).trim();
    const pre = await page.evaluate(function (pt) {
      const el = document.elementFromPoint(pt.x, pt.y);
      const link = el ? el.closest("a") : null;
      return { isLink: !!link };
    }, { x: gapX, y: gapY });
    if (pre.isLink) {
      console.log("GAP [" + la + " TO " + lb + "] SKIP - point resolves to a link in this layout");
      continue;
    }
    await assertInert(page, "GAP [" + la + " TO " + lb + "]", gapX, gapY, failures);
    await page.screenshot({ path: path.join(OUT, "2-gap-" + i + ".png") });
  }

  // 2. The menu label is a dead zone: tapping it must do nothing.
  await openMenu(page);
  const label = await page.locator("#mobile-nav div", { hasText: "Browse by treatment" }).first().boundingBox();
  if (label) {
    await assertInert(page, "LABEL", label.x + label.width / 2, label.y + label.height / 2, failures);
  }

  // 3. Every link navigates to a non-blank page (force: the Book CTA
  // pulses forever, so Playwright would wait for stability forever).
  for (let i = 0; i < count; i++) {
    await openMenu(page);
    const text = (await links.nth(i).textContent()).trim();
    await links.nth(i).click({ force: true });
    await page.waitForTimeout(1500);
    const st = await page.evaluate(function () { return {
      url: location.href,
      rootChildren: document.getElementById("root") ? document.getElementById("root").children.length : -1
    }; });
    const blank = st.rootChildren === 0;
    if (blank) failures.push("LINK " + text + " blank");
    console.log("LINK [" + text + "] TO " + st.url + " root=" + st.rootChildren + " blank=" + blank);
    await page.screenshot({ path: path.join(OUT, "3-link-" + i + ".png") });
  }

  if (errors.length) failures.push("console/page errors: " + errors.join(" || "));
  console.log("errors: " + (errors.length ? errors.join(" || ") : "none"));
  console.log(failures.length === 0 ? "ALL PASS" : "FAILURES: " + failures.join(" ; "));
  await browser.close();
  process.exit(failures.length === 0 ? 0 : 1);
})().catch(function (e) { console.error("SCRIPT-FAIL: " + e.message); process.exit(2); });