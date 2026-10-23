// Real Chromium verification for the rebuilt Lesson 43 (MAY & MIGHT — Possibility,
// Uncertainty & Permission).
//
// Provision (not committed):
//   npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
//
// Run with the dev server up:
//   node scripts/audit-lesson43-browser.mjs
//   (LESSON43_URL overrides the default http://127.0.0.1:5173/English-Course/#/lesson/43)
//
// Colour handling is inherited from audit-lesson41/42-browser.mjs. Tailwind v4
// compiles its palette to `oklch()`, the app CSS also uses hex/rgb/rgba/hsl, and
// Chromium may serialise anything as `color(srgb …)`. Parsing digits out of
// those strings is wrong — oklch digits are not sRGB. Every colour is therefore
// rasterised by Chromium itself: the same colour is painted over black and over
// white and the two samples solve both alpha and the underlying sRGB triplet.
// `runColorSelfTest()` validates the resolver against known values before any
// slide is measured.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";
import { build } from "esbuild";

const work = "node_modules/.lesson43-browser";
mkdirSync(work, { recursive: true });
// The sandbox has no NSS/NSPR; use the libraries shipped inside the npm Chromium package.
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

// Slide ids come from the lesson data so the browser flow cannot drift from the build.
await build({
  stdin: {
    contents: [
      "export { SLIDES_43, STATIONS_43 } from './src/lessons/lesson43/slides43';",
      "export { NEXT_LESSON_43 } from './src/lessons/lesson43/ledger43';",
    ].join("\n"),
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  outfile: `${work}/slides.mjs`,
  bundle: true,
  format: "esm",
  platform: "node",
  packages: "external",
  jsx: "automatic",
  loader: { ".css": "empty" },
});
const { SLIDES_43, STATIONS_43, NEXT_LESSON_43 } = await import(`../${work}/slides.mjs?${Date.now()}`);
const TOTAL = SLIDES_43.length;

const CONTRAST_LIB = String.raw`(() => {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const cache = new Map();
  const formats = { oklch: 0, oklab: 0, lab: 0, lch: 0, rgb: 0, rgba: 0, hsl: 0, hsla: 0, hex: 0, colorFn: 0, named: 0, other: 0 };
  const paint = (background) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, 1, 1);
  };
  const sample = (color) => {
    const key = String(color || "").trim();
    if (cache.has(key)) return cache.get(key);
    const record = (value) => {
      cache.set(key, value);
      return value;
    };
    if (!key || key === "transparent" || key === "none") return record([0, 0, 0, 0]);
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function" && !CSS.supports("color", key)) return record([0, 0, 0, 0]);
    if (/^oklch\(/i.test(key)) formats.oklch += 1;
    else if (/^oklab\(/i.test(key)) formats.oklab += 1;
    else if (/^lab\(/i.test(key)) formats.lab += 1;
    else if (/^lch\(/i.test(key)) formats.lch += 1;
    else if (/^rgb\(/i.test(key)) formats.rgb += 1;
    else if (/^rgba\(/i.test(key)) formats.rgba += 1;
    else if (/^hsl\(/i.test(key)) formats.hsl += 1;
    else if (/^hsla\(/i.test(key)) formats.hsla += 1;
    else if (/^#/.test(key)) formats.hex += 1;
    else if (/^color\(/i.test(key)) formats.colorFn += 1;
    else if (/^[a-z]+$/i.test(key)) formats.named += 1;
    else formats.other += 1;

    paint("#000000");
    ctx.fillStyle = key;
    ctx.fillRect(0, 0, 1, 1);
    const onBlack = [...ctx.getImageData(0, 0, 1, 1).data];
    paint("#ffffff");
    ctx.fillStyle = key;
    ctx.fillRect(0, 0, 1, 1);
    const onWhite = [...ctx.getImageData(0, 0, 1, 1).data];
    const deltas = [0, 1, 2].map((i) => onWhite[i] - onBlack[i]);
    const alpha = Math.min(1, Math.max(0, 1 - (deltas[0] + deltas[1] + deltas[2]) / (3 * 255)));
    if (alpha <= 0.002) return record([0, 0, 0, 0]);
    return record([...[0, 1, 2].map((i) => Math.min(255, Math.max(0, onBlack[i] / alpha))), alpha]);
  };
  const blend = (front, behind) => {
    const alpha = front[3];
    if (alpha <= 0) return behind.slice(0, 3);
    if (alpha >= 0.999) return front.slice(0, 3);
    return [0, 1, 2].map((i) => front[i] * alpha + behind[i] * (1 - alpha));
  };
  const luminance = (rgb) => {
    const [r, g, b] = rgb.slice(0, 3).map((value) => {
      const v = value / 255;
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (a, b) => {
    const la = luminance(a);
    const lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };
  const backdropOf = (element) => {
    const layers = [];
    let backgroundImage = false;
    for (let node = element; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.backgroundImage && style.backgroundImage !== "none") backgroundImage = true;
      const color = sample(style.backgroundColor);
      if (color[3] > 0) layers.push(color);
    }
    let backdrop = [255, 255, 255];
    for (let i = layers.length - 1; i >= 0; i -= 1) backdrop = blend(layers[i], backdrop);
    return { backdrop, backgroundImage };
  };
  const opacityOf = (element) => {
    let value = 1;
    for (let node = element; node; node = node.parentElement) {
      const opacity = Number.parseFloat(getComputedStyle(node).opacity);
      if (Number.isFinite(opacity)) value *= opacity;
      if (value === 0) break;
    }
    return value;
  };
  const isInactive = (element) =>
    Boolean(element.closest("button:disabled,[aria-disabled='true'],input:disabled,textarea:disabled,select:disabled,fieldset:disabled")) ||
    element.getAttribute("aria-disabled") === "true";
  const inspect = (element) => {
    const style = getComputedStyle(element);
    const { backdrop, backgroundImage } = backdropOf(element);
    const text = sample(style.color);
    const opacity = opacityOf(element);
    const foreground = blend([text[0], text[1], text[2], text[3] * opacity], backdrop);
    const ratio = contrast(foreground, backdrop);
    const size = Number.parseFloat(style.fontSize);
    const weight = Number.parseInt(style.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    return {
      ratio: Number(ratio.toFixed(2)),
      threshold: large ? 3 : 4.5,
      color: style.color,
      textRgb: foreground.map((value) => Math.round(value)),
      backdrop: backdrop.map((value) => Math.round(value)),
      size,
      weight,
      backgroundImage,
      inactive: isInactive(element),
    };
  };
  window.__l43 = { sample, blend, contrast, luminance, backdropOf, opacityOf, inspect, isInactive, formats };
})();`;

const checks = [];
const failures = [];
const errors = [];
const external = [];
const heights = [];
const screenshots = [];
const scriptUrls = [];
const contrastIssues = [];
let colorSelfTest = null;
let inactiveExemptions = 0;
let backgroundImageBehindText = 0;
let contrastTests = 0;
let ratioHistogram = [];

const ok = (condition, message) => {
  checks.push(message);
  if (!condition) failures.push(message);
};

const base = process.env.LESSON43_URL || "http://127.0.0.1:5173/English-Course/#/lesson/43";
const exePath = process.env.CHROMIUM_PATH || (await chromium.executablePath());
const launchBrowser = () => playwright.launch({ args: chromium.args, executablePath: exePath, headless: true });

async function newPage(browser, width, height) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
  page.on("pageerror", (error) => errors.push(`${width}x${height} ${error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const url = message.location().url || "";
    if (/fonts\.(googleapis|gstatic)\.com/.test(url)) external.push({ url, message: message.text() });
    else errors.push(`${width}x${height} ${message.text()} ${url}`);
  });
  page.on("request", (request) => {
    if (request.resourceType() === "script") scriptUrls.push(request.url());
  });
  await page.addInitScript({ content: CONTRAST_LIB });
  await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.locator('[data-lesson="43"]').waitFor({ timeout: 30000 });
  await page.locator("#l43-main .font-en").first().waitFor();
  // Freeze entrance animations so measurements reflect the settled UI.
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
  return page;
}

const output = "docs/lesson43-visual";
mkdirSync(output, { recursive: true });
for (const file of readdirSync(output)) if (file.endsWith(".png")) rmSync(`${output}/${file}`);

async function shot(page, name) {
  const path = `${output}/${name}.png`;
  await page.screenshot({ path, fullPage: false });
  screenshots.push(path);
}

async function runColorSelfTest(page) {
  return page.evaluate(() => {
    const lib = window.__l43;
    const close = (a, b, tolerance = 1.5) => Math.abs(a - b) <= tolerance;
    const cases = [
      { name: "oklch slate-500 (Tailwind v4)", color: "oklch(0.554 0.046 257.417)", expect: [98, 116, 142], alpha: 1 },
      { name: "oklch slate-400", color: "oklch(0.704 0.04 256.788)", expect: [144, 161, 185], alpha: 1 },
      { name: "oklab", color: "oklab(0.7 0.05 -0.03)", expect: null, alpha: 1 },
      { name: "hex", color: "#aabbcc", expect: [170, 187, 204], alpha: 1 },
      { name: "hsl", color: "hsl(200 50% 40%)", expect: [51, 119, 153], alpha: 1 },
      { name: "rgb", color: "rgb(255, 255, 255)", expect: [255, 255, 255], alpha: 1 },
      { name: "rgb space-slash alpha", color: "rgb(0 0 0 / 25%)", expect: [0, 0, 0], alpha: 0.25 },
      { name: "rgba numeric alpha", color: "rgba(255, 255, 255, 0.5)", expect: [255, 255, 255], alpha: 0.5 },
      { name: "color(srgb)", color: "color(srgb 0.2 0.4 0.6)", expect: [51, 102, 153], alpha: 1 },
      { name: "transparent keyword", color: "transparent", expect: [0, 0, 0], alpha: 0 },
    ];
    const results = cases.map((item) => {
      const [r, g, b, alpha] = lib.sample(item.color);
      const got = [Math.round(r), Math.round(g), Math.round(b), Number(alpha.toFixed(3))];
      const channelsOk = item.expect ? close(r, item.expect[0]) && close(g, item.expect[1]) && close(b, item.expect[2]) : r >= 0 && r <= 255;
      return {
        name: item.name,
        got,
        expected: item.expect ? [...item.expect, item.alpha] : `alpha ${item.alpha} (channels unchecked)`,
        ok: channelsOk && Math.abs(alpha - item.alpha) <= 0.02,
      };
    });
    return { results, reference: Number(lib.contrast([255, 255, 255], [0, 0, 0]).toFixed(2)) };
  });
}

// Per-slide measurement: layout, contrast, ARIA, navigation overlap.
async function measure(page) {
  return page.evaluate(() => {
    const lib = window.__l43;
    const main = document.querySelector("#l43-main");
    const root = document.querySelector('[data-lesson="43"]');
    const rect = (element) => (element ? element.getBoundingClientRect().toJSON() : null);
    const overlaps = (a, b) => Boolean(a && b) && a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    const pill = [...document.querySelectorAll("button")].find((button) => button.textContent.includes("التالي"))?.closest("div.rounded-full");

    const restoreScroll = main.scrollTop;
    const maxScroll = main.scrollHeight - main.clientHeight;
    const label = (element) => (element.getAttribute("aria-label") || element.textContent || element.tagName).trim().replace(/\s+/g, " ").slice(0, 40);
    const controls = [...document.querySelectorAll("button,input,textarea,select,a")]
      .filter((element) => !(pill && (element === pill || pill.contains(element))))
      .filter((element) => !element.closest("[aria-hidden='true']"));

    const geometric = [];
    const occluded = [];
    for (const position of [maxScroll, 0]) {
      main.scrollTop = position;
      const pillRect = rect(pill);
      const where = position === maxScroll ? "max-scroll" : "top";
      if (position !== maxScroll) continue;
      for (const element of controls) {
        const box = rect(element);
        if (!box || box.width < 2 || box.height < 2) continue;
        if (overlaps(box, pillRect)) geometric.push(label(element));
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;
        if (cx < 0 || cy < 0 || cx > innerWidth || cy > innerHeight) continue;
        const hit = document.elementFromPoint(cx, cy);
        if (!hit || hit === element || element.contains(hit)) continue;
        if (hit === pill || (pill && pill.contains(hit))) occluded.push(label(element));
      }
    }
    main.scrollTop = restoreScroll;

    // Tallest card: the slide body itself (Frame43's section). A dense slide is
    // split when this grows past the ~1200px budget.
    const card = main.querySelector("section");
    const tallest = { scrollHeight: card ? card.scrollHeight : 0 };

    // Clipped readable content.
    const clipped = [...main.querySelectorAll("*")]
      .filter((element) => {
        if (element.clientWidth <= 0) return false;
        if (element.scrollWidth <= element.clientWidth + 2) return false;
        const box = element.getBoundingClientRect();
        return [...element.querySelectorAll("*")].some((child) => {
          if (!(child.textContent || "").trim()) return false;
          if (child.closest('[aria-hidden="true"]')) return false;
          return child.getBoundingClientRect().right > box.right + 2 || child.getBoundingClientRect().left < box.left - 2;
        });
      })
      .map((element) => `${element.tagName}.${(element.getAttribute("class") || "").slice(0, 40)}`);

    // Text contrast.
    const lowContrast = [];
    let sampled = 0;
    let inactiveExemptions = 0;
    let backgroundImages = 0;
    const ratios = [];
    for (const element of main.querySelectorAll("*")) {
      if (element.closest("[aria-hidden='true']")) continue;
      const own = [...element.childNodes].filter((node) => node.nodeType === 3 && (node.textContent || "").trim());
      if (!own.length) continue;
      const info = lib.inspect(element);
      if (info.backgroundImage) backgroundImages += 1;
      if (info.ratio < info.threshold) {
        if (info.inactive) {
          inactiveExemptions += 1;
          continue;
        }
        lowContrast.push({
          text: own.map((node) => node.textContent.trim()).join(" ").slice(0, 40),
          where: `${element.tagName}.${(element.getAttribute("class") || "").slice(0, 60)}`,
          ratio: info.ratio,
          threshold: info.threshold,
          color: info.color,
          size: info.size,
          weight: info.weight,
        });
      }
      sampled += 1;
      ratios.push(info.ratio);
    }

    // BIDI isolation.
    const ltrSpans = [...main.querySelectorAll('[dir="ltr"]')].length;
    const enSpans = [...main.querySelectorAll('[lang="en"]')].length;
    const bidiControls = ((document.documentElement.outerHTML.match(/[‪‭‮‬‬]/g) || []).length);
    const rtlRoot = root ? root.getAttribute("dir") : null;

    return {
      mainScrollHeight: main.scrollHeight,
      mainClientHeight: main.clientHeight,
      tallestCard: tallest.scrollHeight,
      cardHeight: card ? Math.round(card.getBoundingClientRect().height) : 0,
      geometric,
      occluded,
      clipped,
      lowContrast,
      contrastSamples: ratios.slice(-400),
      sampled,
      inactiveExemptions,
      backgroundImages,
      ltrSpans,
      enSpans,
      bidiControls,
      rtlRoot,
      hasCard: tallest.scrollHeight > 0,
    };
  });
}

// ---------------------------------------------------------------------------
// 1) Full walk at the primary desktop viewport.
// ---------------------------------------------------------------------------
const browser = await launchBrowser();
const page = await newPage(browser, 1280, 800);

colorSelfTest = await runColorSelfTest(page);
ok(colorSelfTest.results.every((result) => result.ok), `colour resolver self-test (${colorSelfTest.results.filter((r) => r.ok).length}/${colorSelfTest.results.length})`);
ok(colorSelfTest.reference === 21, `contrast reference white/black is 21:1 (got ${colorSelfTest.reference})`);

await shot(page, "cover-1280");
ok(await page.locator("#l43-main").count() === 1, "the slide shell owns a scroll region");

// Walk the whole deck with the keyboard.
let current = await page.locator("[data-slide-id]").first().getAttribute("data-slide-id");
ok(current === SLIDES_43[0].id, `the deck opens on ${SLIDES_43[0].id}`);
const walked = [current];
for (let i = 1; i < TOTAL; i += 1) {
  await page.keyboard.press("ArrowLeft");
  await page.waitForFunction(
    (expected) => document.querySelector("[data-slide-id]")?.dataset.slideId === expected,
    SLIDES_43[i].id,
    { timeout: 8000 },
  );
  walked.push(SLIDES_43[i].id);
}
ok(walked.length === TOTAL, `all ${TOTAL} slides reachable with ArrowLeft`);
ok(walked.every((id, i) => id === SLIDES_43[i].id), "keyboard order matches the slide data");

// Measure every slide for layout, contrast and BIDI.
for (let i = 0; i < TOTAL; i += 1) {
  const target = SLIDES_43[i].id;
  await page.evaluate((id) => {
    document.querySelector('nav[aria-label="محطات الدرس"] > div > button').click();
  }, target);
  await page.evaluate((index) => {
    for (let k = 0; k < index; k += 1) window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
  }, i);
  await page.waitForFunction(
    (expected) => document.querySelector("[data-slide-id]")?.dataset.slideId === expected,
    target,
    { timeout: 8000 },
  );
  const info = await measure(page);
  for (const issue of info.lowContrast) contrastIssues.push({ slide: target, ...issue });
  ok(info.rtlRoot === "rtl", `${target}: shell stays RTL`);
  const hasLatin = /[A-Za-z]/.test(
    await page.evaluate(() => {
      const root = document.querySelector("[data-slide-id]");
      return [...root.querySelectorAll("*")].filter((el) => !el.closest("[aria-hidden='true']")).map((el) => el.textContent || "").join(" ");
    }),
  );
  if (hasLatin) ok(info.ltrSpans > 0 && info.enSpans > 0, `${target}: English runs isolated LTR (${info.ltrSpans} dir=ltr, ${info.enSpans} lang=en)`);
  ok(info.bidiControls === 0, `${target}: no injected bidi control characters`);
  ok(info.tallestCard <= 1200, `${target}: tallest card ${info.tallestCard}px stays within the 1200px split budget`);
  ok(info.clipped.length === 0, `${target}: no horizontally clipped text (${info.clipped.slice(0, 3).join(", ")})`);
  ok(info.geometric.length === 0, `${target}: no control overlaps the navigation pill`);
  ok(info.occluded.length === 0, `${target}: no control centre is covered by the navigation pill`);
  ok(info.lowContrast.length === 0, `${target}: readable contrast on every text run (${info.lowContrast.slice(0, 2).map((c) => `${c.text}=${c.ratio}:${c.threshold}`).join(", ")})`);
  heights.push({ id: target, card: info.tallestCard, main: info.mainScrollHeight, viewport: info.mainClientHeight });
  if (i % 12 === 0 || target === SLIDES_43[TOTAL - 1].id) await shot(page, `slide-${i + 1}-${target}`);
}
const worstCard = Math.max(...heights.map((h) => h.card));
const splitSlides = heights.filter((h) => h.card > 1200).map((h) => h.id);
ok(splitSlides.length === 0, `no slide exceeds the card budget (worst ${worstCard}px)`);
ok(heights.some((h) => h.main > h.viewport), "at least one slide scrolls inside the lesson region");
const tallest = [...heights].sort((a, b) => b.card - a.card).slice(0, 6);
console.log(`· walked ${TOTAL} slides; worst card ${worstCard}px; ${failures.length} failure(s) so far.`);
console.log(`  tallest: ${tallest.map((h) => `${h.id}=${h.card}px`).join(", ")}`);
console.log(`  over budget: ${heights.filter((h) => h.card > 1200).map((h) => `${h.id}=${h.card}`).join(", ") || "none"}`);
const tally = new Map();
for (const failure of failures) {
  const key = failure.replace(/\(got [^)]*\)/, "").replace(/\d+/g, "N").slice(0, 90);
  tally.set(key, (tally.get(key) || 0) + 1);
}
console.log(`  failing: ${[...tally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, n]) => `${n}× ${k}`).join("\n           ")}`);
for (const issue of contrastIssues.slice(0, 8)) {
  console.log(`    contrast ${issue.slide}: "${issue.text}" ${issue.ratio} (need ${issue.threshold}) color=${issue.color} ${issue.size}px/${issue.weight}`);
}
const ltrIssues = failures.filter((f) => f.includes("English runs isolated LTR")).slice(0, 6);
if (ltrIssues.length) console.log(`    ltr:\n      ${ltrIssues.join("\n      ")}`);

// The rail jumps straight to a station's first slide.
await page.evaluate(() => document.querySelector('nav[aria-label="محطات الدرس"] > div > button').click());
await page.waitForFunction((id) => document.querySelector("[data-slide-id]")?.dataset.slideId === id, SLIDES_43[0].id, { timeout: 8000 });
const stationButtons = await page.locator('nav[aria-label="محطات الدرس"] > div > button').count();
ok(stationButtons === STATIONS_43.length, `rail exposes ${STATIONS_43.length} stations (${stationButtons} buttons)`);
for (const station of STATIONS_43) {
  const index = SLIDES_43.findIndex((slide) => slide.station === station.id);
  await page.evaluate((id) => {
    [...document.querySelectorAll('nav[aria-label="محطات الدرس"] > div > button')].find((button) => button.dataset.station === id).click();
  }, station.id);
  await page.waitForFunction(
    (expected) => document.querySelector("[data-slide-id]")?.dataset.slideId === expected,
    SLIDES_43[index].id,
    { timeout: 8000 },
  );
}
ok(true, `rail jump reaches the first slide of every station`);
await page.keyboard.press("ArrowRight");
ok((await page.locator("[data-slide-id]").first().getAttribute("data-slide-id")) !== SLIDES_43[0].id, "ArrowRight walks backwards");

// Progress indicator.
const progress = await page.locator('[role="progressbar"]').first();
ok(await progress.count() === 1, "a progressbar announces the deck position");
ok((await progress.getAttribute("aria-valuemax")) === "100", "progressbar reports a full deck");
const pct = Number(await progress.getAttribute("aria-valuenow"));
ok(pct > 0 && pct <= 100, `progressbar percentage is within range (got ${pct})`);

console.log(`· rail + progress checks done; ${failures.length} failure(s) so far.`);

// ---------------------------------------------------------------------------
// 2) Interaction contract before any submission.
// ---------------------------------------------------------------------------
async function gotoSlide(id) {
  await page.evaluate((target) => {
    document.querySelector('nav[aria-label="محطات الدرس"] > div > button').click();
  }, id);
  const index = SLIDES_43.findIndex((slide) => slide.id === id);
  await page.evaluate((n) => {
    for (let k = 0; k < n; k += 1) window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
  }, index);
  await page.waitForFunction((expected) => document.querySelector("[data-slide-id]")?.dataset.slideId === expected, id, { timeout: 8000 });
}

await gotoSlide("practice-27");
ok((await page.locator("[data-practice-item]").count()) === 3, "§27 practice slide offers its first three items");
ok((await page.locator("[data-practice-check]").count()) === 3, "§27 practice offers a check per item");
ok(await page.locator("[data-practice-check]").first().isDisabled(), "a practice check stays locked until the item is answered");
// Answer one practice item: pick the first option, or type into the field.
async function answerItem(item) {
  const choices = item.locator("button[aria-pressed]");
  if ((await choices.count()) > 0) await choices.first().click();
  else await item.locator("textarea").first().fill("may");
}
for (const item of await page.locator("[data-practice-item]").all()) await answerItem(item);
ok(await page.locator("[data-practice-check]").first().isEnabled(), "answering an item unlocks its comparison");
await page.locator("[data-practice-check]").first().click();
await page.waitForTimeout(150);
const practiceText = await page.locator("[data-slide-id='practice-27']").innerText();
ok(/الإجابة/.test(practiceText), "practice comparison reveals the model answer");
ok(!/مفتاح تصحيح الدرس 43/.test(practiceText), "practice feedback renders without the §34 answer key");
await shot(page, "practice-27-1280");

// §29 asks the student to compose a sentence with Maybe / may be — text entry.
await gotoSlide("practice-29");
const maybeItems = page.locator("[data-practice-item]");
ok((await maybeItems.count()) === 3, "§29 practice slide offers its first three items");
for (const item of await maybeItems.all()) await answerItem(item);
await page.locator("[data-practice-check]").first().click();
await page.waitForTimeout(150);
ok(/الإجابة/.test(await page.locator("[data-slide-id='practice-29']").innerText()), "§29 accepts the Maybe / may be comparison");

await gotoSlide("writing-criteria");
const writingBoxes = await page.locator("input[type='checkbox']").count();
ok(writingBoxes === 8, `§35 writing slide lists eight criteria (${writingBoxes})`);
await page.locator("input[type='checkbox']").first().check();
ok((await page.locator("[data-slide-id='writing-criteria']").innerText()).includes("1 / 8"), "writing checklist counts completed criteria");

await gotoSlide("test-l1");
ok((await page.locator("[data-question-id]").count()) === 2, "level 1 test slide shows two questions");

// ---------------------------------------------------------------------------
// 3) The answer key must not reach the browser before a recorded attempt.
// ---------------------------------------------------------------------------
const beforeSubmitHtml = await page.content();
ok(!beforeSubmitHtml.includes("مفتاح تصحيح الدرس 43"), "the §34 key string is absent from the pre-submit DOM");
ok(!scriptUrls.some((url) => /key43|SolutionsArea43|TeacherGuide43|teacherSource43/.test(url)), "no grader/teacher chunk is fetched before the attempt");

console.log(`· practice + writing checks done; ${failures.length} failure(s) so far.`);

// ---------------------------------------------------------------------------
// 4) Complete the test, submit, and read the graded result + solutions.
// ---------------------------------------------------------------------------
const TEST_SLIDES = SLIDES_43.filter((slide) => slide.kind === "test").map((slide) => slide.id);
let questions = 0;
for (const id of TEST_SLIDES) {
  await gotoSlide(id);
  questions += await page.locator("[data-question-id]").count();
  for (const question of await page.locator("[data-question-id]").all()) {
    const choices = question.locator("button[aria-pressed]");
    if ((await choices.count()) > 0) await choices.first().click();
    const boxes = question.locator("textarea");
    for (let k = 0; k < (await boxes.count()); k += 1) await boxes.nth(k).fill("My attempt");
  }
}
ok(questions === 25, `the ten test slides together expose 25 questions (${questions})`);
await gotoSlide(TEST_SLIDES[TEST_SLIDES.length - 1]);
ok(await page.locator("[data-test-submit]").isEnabled(), "submit is enabled once every question is answered");
await page.locator("[data-test-submit]").click();
await page.waitForFunction(() => document.querySelector("[data-slide-id='test-result']"), null, { timeout: 15000 });
const resultText = await page.locator("[data-slide-id='test-result']").innerText();
ok(/نتيجة الاختبار/.test(resultText), "the result slide renders");
ok(/\b25\b/.test(resultText), "the result slide shows the 25-question total");
await page.waitForFunction(() => document.body.textContent.includes("A — may"), null, { timeout: 15000 });
ok(/A — may/.test(await page.locator("[data-slide-id='test-result']").innerText()), "the graded solutions render the detailed key after the attempt");
await shot(page, "test-result-1280");

// Reset returns to a locked, answer-free attempt.
await gotoSlide(TEST_SLIDES[0]);
ok(await page.locator("button:has-text('reset')").first().isVisible(), "the graded attempt offers a reset control");
await page.locator("button:has-text('reset')").first().click();
await page.waitForTimeout(250);
ok(await page.locator("[data-test-submit]").first().isDisabled(), "reset clears the answers and relocks submission");
ok(!/A — may/.test(await page.locator("[data-slide-id]").first().innerText()), "reset hides the graded solutions again");

// ---------------------------------------------------------------------------
// 5) Teacher gate.
// ---------------------------------------------------------------------------
await gotoSlide("teacher");
await page.locator("input[type='password']").fill("not-the-password");
await page.locator("button").filter({ hasText: "فتح المساحة" }).first().click();
ok(await page.locator("[role='alert']").count() === 1, "a wrong teacher password is rejected");
ok(!/مفتاح تصحيح الدرس 43/.test(await page.content()), "the key stays out of the DOM while the teacher gate is closed");
await page.locator("input[type='password']").fill("somer173");
await page.locator("button").filter({ hasText: "فتح المساحة" }).first().click();
await page.waitForFunction(() => document.body.textContent.includes("مفتاح تصحيح الدرس 43"), null, { timeout: 15000 });
const guideText = await page.locator("[data-slide-id='teacher']").innerText();
ok(/دليل المعلم/.test(guideText), "the teacher guide renders after the password check");
ok(guideText.includes(NEXT_LESSON_43.label), "the teacher guide points at Lesson 44");
await shot(page, "teacher-gate-1280");

console.log(`· test submission + teacher gate done; ${failures.length} failure(s) so far.`);

// ---------------------------------------------------------------------------
// 6) Wider and narrow viewports.
// ---------------------------------------------------------------------------
const wide = await newPage(browser, 1920, 1080);
await wide.goto(base, { waitUntil: "domcontentloaded" });
await wide.locator('[data-lesson="43"]').waitFor({ timeout: 30000 });
await wide.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
await shot(wide, "cover-1920");
let wideInfo = await measure(wide);
ok(wideInfo.clipped.length === 0, "1920×1080: no horizontally clipped text");
ok(wideInfo.geometric.length === 0 && wideInfo.occluded.length === 0, "1920×1080: no navigation overlap");
ok(wideInfo.lowContrast.length === 0, "1920×1080: readable contrast on the cover");

await wide.evaluate((index) => {
  for (let k = 0; k < index; k += 1) window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
}, SLIDES_43.findIndex((slide) => slide.id === "lab-may-builder"));
await wide.waitForFunction((id) => document.querySelector("[data-slide-id]")?.dataset.slideId === id, "lab-may-builder", { timeout: 8000 });
wideInfo = await measure(wide);
ok(wideInfo.lowContrast.length === 0, "1920×1080: readable contrast on the builder slide");
ok(wideInfo.clipped.length === 0, "1920×1080: builder slide has no clipped text");
await shot(wide, "lab-may-builder-1920");

const phone = await newPage(browser, 375, 812);
await phone.goto(base, { waitUntil: "domcontentloaded" });
await phone.locator('[data-lesson="43"]').waitFor({ timeout: 30000 });
await phone.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
await shot(phone, "cover-375");
const phoneInfo = await measure(phone);
ok(phoneInfo.clipped.length === 0, `375×812: no horizontally clipped text (${phoneInfo.clipped.slice(0, 3).join(", ")})`);
ok(phoneInfo.lowContrast.length === 0, `375×812: readable contrast on the cover (${phoneInfo.lowContrast.slice(0, 2).map((c) => `${c.text}=${c.ratio}:${c.threshold}`).join(", ")})`);
const railHidden = await phone.evaluate(() => {
  const rail = document.querySelector('nav[aria-label="محطات الدرس"]');
  if (!rail) return true;
  for (let node = rail; node; node = node.parentElement) {
    if (getComputedStyle(node).display === "none") return true;
  }
  return rail.getClientRects().length === 0;
});
ok(railHidden, "375×812: the station rail hides below lg and the deck stays usable");
await phone.keyboard.press("ArrowLeft");
await phone.waitForFunction((id) => document.querySelector("[data-slide-id]")?.dataset.slideId === id, SLIDES_43[1].id, { timeout: 8000 });
ok(true, "375×812: keyboard navigation works with the rail hidden");
await shot(phone, "slide-2-375");

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
function report() {
  const failed = failures.length;
  console.log(`Lesson 43 browser audit: ${checks.length - failed}/${checks.length} checks passed`);
  if (failed) {
    console.log("Failures:");
    for (const failure of failures) console.log(`  ✕ ${failure}`);
  }
  if (errors.length) {
    console.log(`Console/page errors (${errors.length}):`);
    for (const error of errors.slice(0, 12)) console.log(`  ✕ ${error}`);
  }
  if (external.length) console.log(`External font failures (${external.length}) — sandbox network, not an app defect.`);
  console.log(`Screenshots: ${screenshots.length} written to ${output}/`);
  console.log(`Deck: ${TOTAL} slides, ${STATIONS_43.length} stations, worst card ${worstCard}px.`);
}

await browser.close();
report();
if (failures.length || errors.length) process.exit(1);
