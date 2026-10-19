// ============================================================
// Real-DOM contrast audit for Lesson 34 (FUTURE LAUNCHPAD).
// Walks every step plus the test / solutions / teacher areas and checks
// every visible text node against its effective background:
//   • WCAG AA: 4.5:1 for normal text, 3:1 for large text;
//   • gradients are checked against every colour stop (worst case);
//   • ancestor opacity is folded into the effective colour;
//   • disabled controls are exempt (WCAG 1.4.3), as are aria-hidden copies.
//
// Provision the browser once:
//   npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
// Serve the build first:
//   npm run build && npm run preview -- --host 0.0.0.0 --port 4173
// Then run:
//   npm run audit:lesson34-contrast
// ============================================================
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson34-browser";
mkdirSync(work, { recursive: true });
try {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
} catch {
  /* already extracted by a previous run */
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const base = process.env.LESSON34_URL || "http://127.0.0.1:4173/English-Course/#/lesson/34";
const browser = await playwright.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: true,
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => {
  try {
    localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  } catch {
    /* about:blank has no storage access */
  }
});
const page = await ctx.newPage();
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
await page.goto(base, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".l34-hero", { timeout: 30000 });
// Freeze reveal animations so computed colours are the settled ones.
await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });

const probe = () =>
  page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const cx = canvas.getContext("2d", { willReadFrequently: true });
    const cache = new Map();
    const resolve = (str) => {
      if (!str || str === "transparent" || str === "none") return null;
      if (cache.has(str)) return cache.get(str);
      let out = null;
      try {
        cx.clearRect(0, 0, 1, 1);
        cx.fillStyle = "#010203";
        cx.fillStyle = str;
        cx.clearRect(0, 0, 1, 1);
        cx.fillRect(0, 0, 1, 1);
        const d = cx.getImageData(0, 0, 1, 1).data;
        out = { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
        if (out.r === 1 && out.g === 2 && out.b === 3) out = null;
      } catch {
        out = null;
      }
      cache.set(str, out);
      return out;
    };
    const lum = (c) => {
      const f = (v) => {
        v /= 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
    };
    const ratio = (a, b) => {
      const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };
    const blend = (top, bottom) => ({
      r: top.r * top.a + bottom.r * (1 - top.a),
      g: top.g * top.a + bottom.g * (1 - top.a),
      b: top.b * top.a + bottom.b * (1 - top.a),
      a: 1,
    });
    const stopsOf = (image) => {
      if (!image || image === "none") return [];
      const tokens = image.match(/(?:rgba?|oklch|oklab|hsla?|lab|lch|color)\([^)]*\)|#[0-9a-fA-F]{3,8}/g) || [];
      return tokens.map(resolve).filter((c) => c && c.a > 0.85);
    };
    const bgCandidates = (el) => {
      let node = el;
      while (node && node !== document.documentElement) {
        for (const pseudo of [null, "::before", "::after"]) {
          const stops = stopsOf(getComputedStyle(node, pseudo).backgroundImage);
          if (stops.length) return stops;
        }
        const bg = resolve(getComputedStyle(node).backgroundColor);
        if (bg && bg.a > 0.99) return [bg];
        node = node.parentElement;
      }
      return [{ r: 255, g: 255, b: 255, a: 1 }];
    };
    const out = [];
    let tested = 0;
    for (const el of document.querySelectorAll(".l34-app *")) {
      if (!el.getClientRects().length) continue;
      if (el.closest("[aria-hidden='true']")) continue;
      if (el.closest("button:disabled, [disabled], [aria-disabled='true']")) continue;
      const st = getComputedStyle(el);
      if (st.visibility === "hidden" || st.opacity === "0") continue;
      const own = [...el.childNodes]
        .filter((n) => n.nodeType === 3 && n.textContent.trim())
        .map((n) => n.textContent.trim())
        .join(" ");
      if (!own) continue;
      const fg = resolve(st.color);
      if (!fg) continue;
      let opacity = 1;
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const o = parseFloat(getComputedStyle(n).opacity);
        if (!Number.isNaN(o)) opacity *= o;
      }
      const bgs = bgCandidates(el);
      tested++;
      const size = parseFloat(st.fontSize);
      const weight = Number(st.fontWeight) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const need = large ? 3 : 4.5;
      const worst = Math.min(...bgs.map((bg) => ratio(blend({ ...fg, a: fg.a * opacity }, bg), bg)));
      if (worst < need - 0.01) {
        out.push({
          text: own.slice(0, 60),
          cls: (el.className || "").toString().slice(0, 90),
          color: st.color,
          bg: bgs.map((b) => `rgb(${Math.round(b.r)},${Math.round(b.g)},${Math.round(b.b)})`).join(" | "),
          size: Math.round(size),
          ratio: Math.round(worst * 100) / 100,
          need,
        });
      }
    }
    return { tested, out };
  });

const scopes = [];
const stepId = () =>
  page.evaluate(() => document.querySelector("[data-l34-step-view]")?.getAttribute("data-l34-step-view"));

for (let i = 0; i < 40; i++) {
  await page.waitForTimeout(180);
  const { tested, out } = await probe();
  scopes.push({ scope: `step:${await stepId()}`, tested, out });
  const advanced = await page.evaluate(() => {
    const btn = [...document.querySelectorAll("[data-step-nav='next']")].find((el) => el.offsetParent !== null);
    if (!btn || btn.disabled) return false;
    btn.click();
    return true;
  });
  if (!advanced) break;
}

for (const area of ["test", "solutions", "teacher"]) {
  await page.click(`[data-area-tab='${area}']`);
  await page.waitForTimeout(500);
  const { tested, out } = await probe();
  scopes.push({ scope: `area:${area}`, tested, out });
}

const failures = scopes.flatMap((s) => s.out.map((f) => ({ ...f, scope: s.scope })));
const tested = scopes.reduce((sum, s) => sum + s.tested, 0);
if (failures.length) {
  console.error(`Lesson 34 contrast audit: ${failures.length} failures`);
  for (const f of failures) console.error(JSON.stringify(f));
  await browser.close();
  process.exit(1);
}
console.log(
  `Lesson 34 contrast audit: ${tested} text nodes checked across ${scopes.length} screens, 0 failed (AA 4.5:1 / 3:1 large).`,
);
await browser.close();
