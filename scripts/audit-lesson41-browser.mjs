// Real Chromium verification for Lesson 41 (master auxiliary verbs).
// Provision (not committed): npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
// Run with the dev server up: node scripts/audit-lesson41-browser.mjs
//
// Colour formats: Tailwind v4 compiles its palette to `oklch()`, the app CSS
// uses hex/rgb/rgba/hsl, and Chromium may serialise anything as
// `color(srgb …)`. Parsing digits out of those strings is wrong — `oklch`
// digits are not sRGB, and percentages/alpha get misread (which is why the
// previous numeric parser reported 269 phantom failures). Every colour is
// therefore rasterised by Chromium itself: the same colour is painted over
// black and over white and the two samples solve both alpha and the
// underlying sRGB triplet:
//   P(black) = a·C ,  P(white) = a·C + (1−a)·255  ⇒  a = 1 − (Pw − Pb)/255.
// That is exact for every format the browser can parse, transparent values
// included. `runColorSelfTest()` validates it against known values before any
// slide is measured.
import { mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";
import { build } from "esbuild";

const work = "node_modules/.lesson41-browser";
mkdirSync(work, { recursive: true });
// The sandbox has no NSS/NSPR; use the libraries shipped inside the npm Chromium package.
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

// Slide ids come from the lesson data so the browser flow cannot drift from the build.
await build({
  stdin: { contents: `export { SLIDES_41 } from "./src/lessons/lesson41/slides41";`, resolveDir: process.cwd(), loader: "tsx" },
  outfile: `${work}/slides.mjs`,
  bundle: true,
  format: "esm",
  platform: "node",
  packages: "external",
  jsx: "automatic",
  loader: { ".css": "empty" },
});
const { SLIDES_41 } = await import(`../${work}/slides.mjs?${Date.now()}`);
const slideNumber = (id) => {
  const index = SLIDES_41.findIndex((slide) => slide.id === id);
  if (index < 0) throw new Error(`unknown slide ${id}`);
  return index + 1;
};

// ---------------------------------------------------------------------------
// Colour + contrast library, injected into every page before the app boots.
// ---------------------------------------------------------------------------
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
  /** Resolve any CSS colour to { r, g, b, a } in sRGB, alpha included. */
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
    // The black/white delta is independent of the colour's own channels.
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
  /** White page → outermost ancestor → … → element, alpha composited. */
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
  /** Inactive UI is exempt from WCAG 1.4.3, but it is still recorded. */
  const isInactive = (element) =>
    Boolean(element.closest("button:disabled,[aria-disabled='true'],input:disabled,textarea:disabled,select:disabled,fieldset:disabled")) ||
    element.getAttribute("aria-disabled") === "true";
  /** Full contrast decision for one element: text colour over its real backdrop. */
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
  window.__l41 = { sample, blend, contrast, luminance, backdropOf, opacityOf, inspect, isInactive, formats };
})();`;

const checks = [];
const failures = [];
const errors = [];
const external = [];
const heights = [];
const screenshots = [];
const colorFormats = {};
let contrastTests = 0;
let inactiveExemptions = 0;
let backgroundImageBehindText = 0;
let colorSelfTest = null;

const ok = (condition, message) => {
  checks.push(message);
  if (!condition) failures.push(message);
};
const base = process.env.LESSON41_URL || "http://127.0.0.1:5173/English-Course/#/lesson/41";
const TOTAL = SLIDES_41.length;
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
  await page.addInitScript({ content: CONTRAST_LIB });
  await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.locator('[data-lesson="41"]').waitFor({ timeout: 30000 });
  await page.locator(".font-en").first().waitFor();
  // Freeze the `pop` / `anim-drift` entrance animations so screenshots and
  // contrast measurements reflect the settled UI, not a mid-animation frame.
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
  return page;
}

const output = "docs/lesson41-visual";
mkdirSync(output, { recursive: true });
// Drop screenshots from previous runs so the committed evidence always matches
// the current build.
for (const file of readdirSync(output)) if (file.endsWith(".png")) rmSync(`${output}/${file}`);

async function shot(page, name) {
  const path = `${output}/${name}.png`;
  await page.screenshot({ path, fullPage: false });
  screenshots.push(path);
}
// ---------------------------------------------------------------------------
// Colour resolver self-test — runs before any slide is measured.
// ---------------------------------------------------------------------------
async function runColorSelfTest(page) {
  return page.evaluate(() => {
    const lib = window.__l41;
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
        color: item.color,
        got,
        expected: item.expect ? [...item.expect, item.alpha] : `alpha ${item.alpha} (channels unchecked)`,
        ok: channelsOk && Math.abs(alpha - item.alpha) <= 0.02,
      };
    });
    // White on black is the 21:1 reference; also check a known mid grey pair.
    const reference = lib.contrast([255, 255, 255], [0, 0, 0]);
    const midGrey = lib.contrast([255, 255, 255], [119, 119, 119]); // #777 → 4.48:1
    return { results, reference: Number(reference.toFixed(2)), midGrey: Number(midGrey.toFixed(2)) };
  });
}

// ---------------------------------------------------------------------------
// Per-slide measurement: layout, contrast, ARIA, navigation overlap.
// ---------------------------------------------------------------------------
async function measure(page) {
  return page.evaluate(() => {
    const lib = window.__l41;
    const root = document.querySelector('[data-lesson="41"]');
    const main = document.querySelector("#l41-main");
    const card = main.querySelector("section");
    const rect = (element) => (element ? element.getBoundingClientRect().toJSON() : null);
    const overlaps = (a, b) => Boolean(a && b) && a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;

    // ---- layout / navigation overlap ------------------------------------
    const pill = [...document.querySelectorAll("button")].find((button) => button.textContent.includes("التالي"))?.closest("div.rounded-full");
    const lock = document.querySelector("[data-site-lock-button]");
    const restoreScroll = main.scrollTop;
    const maxScroll = main.scrollHeight - main.clientHeight;
    const label = (element) => (element.getAttribute("aria-label") || element.textContent || element.tagName).trim().replace(/\s+/g, " ").slice(0, 40);
    const controls = [...document.querySelectorAll("button,input,textarea,select,a")]
      .filter((element) => !(pill && (element === pill || pill.contains(element))))
      .filter((element) => !element.closest("[aria-hidden='true']"));

    const geometric = [];
    const occluded = [];
    const lockClashes = [];
    for (const position of [maxScroll, 0]) {
      main.scrollTop = position;
      const pillRect = rect(pill);
      const lockRect = rect(lock);
      const where = position === maxScroll ? "max-scroll" : "top";
      if (overlaps(pillRect, lockRect)) lockClashes.push(where);
      if (position !== maxScroll) continue;
      for (const element of controls) {
        const box = rect(element);
        if (!box || box.width < 2 || box.height < 2) continue;
        if (overlaps(box, pillRect)) geometric.push(label(element));
        // Hit-test the control's own centre: if the pointer would land on the
        // pill the control is genuinely unusable there.
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;
        if (cx < 0 || cy < 0 || cx > innerWidth || cy > innerHeight) continue;
        const hit = document.elementFromPoint(cx, cy);
        if (!hit || hit === element || element.contains(hit)) continue;
        if (hit === pill || (pill && pill.contains(hit))) occluded.push(label(element));
      }
    }
    main.scrollTop = restoreScroll;

    // ---- clipped readable content ---------------------------------------
    const wide = [...main.querySelectorAll("*")]
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

    // ---- text contrast ---------------------------------------------------
    const lowContrast = [];
    const inactiveLowContrast = [];
    let sampled = 0;
    let withBackgroundImage = 0;
    for (const element of main.querySelectorAll("*")) {
      if (!element.getClientRects().length) continue;
      const style = getComputedStyle(element);
      if (style.visibility === "hidden") continue;
      if (![...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim())) continue;
      if (element.closest('[aria-hidden="true"]')) continue;
      if (!/[\p{L}\p{N}]/u.test(element.textContent || "")) continue;
      const result = lib.inspect(element);
      sampled += 1;
      if (result.backgroundImage) withBackgroundImage += 1;
      if (result.ratio >= result.threshold) continue;
      const record = {
        text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60),
        ratio: result.ratio,
        threshold: result.threshold,
        color: result.color,
        backdrop: result.backdrop.join(","),
        size: result.size,
        inactive: result.inactive,
      };
      // WCAG 1.4.3 exempts inactive controls (they are also visibly faded via
      // `disabled:opacity-40`); their enabled state is asserted separately.
      (result.inactive ? inactiveLowContrast : lowContrast).push(record);
    }

    const missingAria = [...root.querySelectorAll("[aria-labelledby],[aria-describedby],[aria-controls]")]
      .flatMap((element) => ["aria-labelledby", "aria-describedby", "aria-controls"].flatMap((attribute) => (element.getAttribute(attribute) || "").split(/\s+/).filter(Boolean)))
      .filter((id) => !document.getElementById(id));

    return {
      counter: [...document.querySelectorAll("header span")].at(-1)?.textContent?.replace(/\s/g, "") ?? "",
      viewport: { width: innerWidth, height: innerHeight },
      docOverflowX: document.documentElement.scrollWidth - innerWidth,
      mainScroll: main.scrollHeight,
      mainClient: main.clientHeight,
      slideOverflow: main.scrollHeight - main.clientHeight,
      cardHeight: card ? Math.round(card.getBoundingClientRect().height) : 0,
      wide: [...new Set(wide)],
      lowContrast,
      inactiveLowContrast,
      contrastTests: sampled,
      backgroundImageBehindText: withBackgroundImage,
      colorFormats: { ...lib.formats },
      missingAria,
      pillBlocked: [...new Set([...geometric, ...occluded])],
      geometryBlocked: [...new Set(geometric)],
      occluded: [...new Set(occluded)],
      pillLockOverlap: lockClashes.length > 0,
      lockVisible: Boolean(lock && lock.getBoundingClientRect().width > 0),
      scrollChecked: { max: maxScroll, top: 0 },
    };
  });
}

async function stage(name, fn) {
  try {
    await fn();
  } catch (error) {
    failures.push(`stage ${name}: ${String(error.message).split("\n")[0]}`);
  }
}

async function goToSlide(page, index) {
  for (let guard = 0; guard < TOTAL + 2; guard += 1) {
    const now = Number((await page.locator("header span").last().textContent()).split("/")[0].trim());
    if (now === index) return;
    await page.locator("button", { hasText: now < index ? "التالي" : "السابق" }).first().click();
    await page
      .waitForFunction((expected) => Number(([...document.querySelectorAll("header span")].at(-1)?.textContent || "").split("/")[0].trim()) === expected, index, { timeout: 5000 })
      .catch(() => {});
  }
}

// Walk every slide and record layout + accessibility state.
async function walk(page, width, height) {
  const label = `${width}x${height}`;
  for (let index = 1; index <= TOTAL; index += 1) {
    try {
      const data = await measure(page);
      ok(data.counter === `${index}/${TOTAL}`, `${label} slide ${index} counter (${data.counter})`);
      ok(data.docOverflowX <= 1, `${label} slide ${index} no horizontal page overflow (${data.docOverflowX}px)`);
      ok(data.wide.length === 0, `${label} slide ${index} no clipped element (${data.wide.join(", ")})`);
      ok(!data.pillLockOverlap, `${label} slide ${index} floating step nav does not overlap the site lock (top and max scroll)`);
      ok(data.occluded.length === 0, `${label} slide ${index} step nav occludes no control (hit test: ${data.occluded.join(", ")})`);
      ok(data.geometryBlocked.length === 0, `${label} slide ${index} step nav overlaps no control box (${data.geometryBlocked.join(", ")})`);
      ok(data.missingAria.length === 0, `${label} slide ${index} ARIA references resolve (${data.missingAria.join(", ")})`);
      ok(data.lowContrast.length === 0, `${label} slide ${index} contrast meets WCAG AA (${JSON.stringify(data.lowContrast)})`);
      ok(data.contrastTests > 0, `${label} slide ${index} contrast sampled at least one text node (${data.contrastTests})`);
      contrastTests += data.contrastTests;
      inactiveExemptions += data.inactiveLowContrast.length;
      backgroundImageBehindText += data.backgroundImageBehindText;
      for (const [format, count] of Object.entries(data.colorFormats)) colorFormats[format] = (colorFormats[format] ?? 0) + count;
      heights.push({
        viewport: label,
        slide: index,
        card: data.cardHeight,
        scroll: data.slideOverflow,
        inactiveFaded: data.inactiveLowContrast.map((entry) => entry.text),
      });
    } catch (error) {
      failures.push(`${label} slide ${index} measurement failed: ${String(error.message).split("\n")[0]}`);
    }
    if (index < TOTAL) {
      await page.locator("button", { hasText: "التالي" }).first().click();
      try {
        await page.waitForFunction(
          ({ expected, total }) => [...document.querySelectorAll("header span")].at(-1)?.textContent?.replace(/\s/g, "") === `${expected}/${total}`,
          { expected: index + 1, total: TOTAL },
          { timeout: 8000 },
        );
      } catch {
        failures.push(`${label} navigation to slide ${index + 1} timed out`);
        break;
      }
    }
  }
  ok(true, `${label} walked ${heights.filter((entry) => entry.viewport === label).length} slides`);
}

async function answerTest(page) {
  for (const id of ["test-l1", "test-l2-a", "test-l2-b", "test-l3-a", "test-l3-b", "test-l4-a", "test-l4-b", "test-l4-c", "test-l5-a", "test-l5-b"]) {
    await goToSlide(page, slideNumber(id));
    const fieldsets = page.locator("[data-question-id]");
    const count = await fieldsets.count();
    for (let i = 0; i < count; i += 1) {
      const fieldset = fieldsets.nth(i);
      const radio = fieldset.locator('input[type="radio"]').first();
      if (await radio.count()) await radio.check({ force: true });
      else {
        const areas = fieldset.locator("textarea");
        for (let j = 0; j < (await areas.count()); j += 1) await areas.nth(j).fill("Attempt");
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 1) desktop 1280x800
// ---------------------------------------------------------------------------
const desktopBrowser = await launchBrowser();
const desktop = await newPage(desktopBrowser, 1280, 800);

colorSelfTest = await runColorSelfTest(desktop);
for (const item of colorSelfTest.results) ok(item.ok, `colour resolver: ${item.name} → ${JSON.stringify(item.got)} (expected ${JSON.stringify(item.expected)})`);
ok(Math.abs(colorSelfTest.reference - 21) < 0.1, `colour resolver: white/black reference ratio is 21:1 (got ${colorSelfTest.reference})`);
ok(Math.abs(colorSelfTest.midGrey - 4.48) < 0.05, `colour resolver: #fff on #777 is 4.48:1 (got ${colorSelfTest.midGrey})`);

// Design-origin check on the hub: the Lesson 41 card must use the same gradient
// family as Lesson 1 instead of a lesson-specific identity.
await stage("hub card 1280x800", async () => {
  // The sandbox Chromium is single-process, so each extra page gets its own browser.
  const hubBrowser = await launchBrowser();
  const page = await hubBrowser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
  await page.goto(base.split("#")[0], { waitUntil: "domcontentloaded" });
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
  const cardText = page.locator("a", { hasText: "Master Auxiliary Verbs" }).first();
  await cardText.waitFor({ timeout: 20000 });
  const gradients = await page.evaluate(() => {
    const cards = [...document.querySelectorAll("a")];
    const badgeOf = (card) => card.querySelector(".h-12.w-12");
    const find = (num) => cards.find((card) => (badgeOf(card)?.textContent || "").trim() === String(num));
    const read = (card) => {
      if (!card) return "";
      const bar = card.querySelector(".h-2");
      return bar ? getComputedStyle(bar).backgroundImage : "";
    };
    const one = find(1);
    const fortyOne = find(41);
    return {
      lesson1: read(one),
      lesson41: read(fortyOne),
      found: Boolean(fortyOne),
      badgeMatches: Boolean(one && fortyOne) && badgeOf(one).className === badgeOf(fortyOne).className,
    };
  });
  ok(gradients.found, "Lesson 41 hub card exists");
  ok(gradients.lesson41 === gradients.lesson1, `Lesson 41 hub card reuses the Lesson 1 gradient family (${gradients.lesson41.slice(0, 52)})`);
  ok(gradients.badgeMatches, "Lesson 41 number badge uses the same gradient treatment as Lesson 1");
  await cardText.scrollIntoViewIfNeeded();
  await shot(page, "1280-hub-card");
  await page.close();
  await hubBrowser.close();
});

await shot(desktop, "1280-cover");
await stage("walk 1280x800", () => walk(desktop, 1280, 800));

await stage("keyboard navigation 1280x800", async () => {
  await goToSlide(desktop, slideNumber("p30-1"));
  const before = Number((await desktop.locator("header span").last().textContent()).split("/")[0].trim());
  await desktop.locator("#l41-main").click({ position: { x: 4, y: 4 } });
  await desktop.keyboard.press("ArrowLeft");
  await desktop.waitForFunction((expected) => Number(([...document.querySelectorAll("header span")].at(-1)?.textContent || "").split("/")[0].trim()) === expected, before + 1, { timeout: 5000 });
  ok(true, "ArrowLeft advances one slide (RTL reading direction)");
  await desktop.keyboard.press("ArrowRight");
  await desktop.waitForFunction((expected) => Number(([...document.querySelectorAll("header span")].at(-1)?.textContent || "").split("/")[0].trim()) === expected, before, { timeout: 5000 });
  ok(true, "ArrowRight returns one slide");
  const counterByButton = Number((await desktop.locator("header span").last().textContent()).split("/")[0].trim());
  ok(counterByButton === before, `keyboard navigation returns to the same slide (${counterByButton})`);
  const skipInTextField = desktop.locator("textarea").first();
  await skipInTextField.fill("typing");
  await skipInTextField.press("ArrowLeft");
  await desktop.waitForTimeout(150);
  ok(Number((await desktop.locator("header span").last().textContent()).split("/")[0].trim()) === before, "arrows do not navigate while typing in a field");
});

await stage("practice interaction 1280x800", async () => {
  await goToSlide(desktop, slideNumber("p30-1"));
  await shot(desktop, "1280-practice-before-attempt");
  const compare = desktop.locator("button", { hasText: "قارن إجابتي بالحل" }).first();
  ok(await compare.isDisabled(), "compare disabled before an attempt");
  const card = desktop.locator("article", { hasText: "She is reading a novel." }).first();
  ok((await card.count()) === 1, "practice item renders");
  await card.locator("textarea").nth(0).fill("is");
  await card.locator("textarea").nth(1).fill("reading");
  ok(await compare.isEnabled(), "compare enabled after typing both fields");
  const practiceContrast = await desktop.evaluate(() => {
    const button = [...document.querySelectorAll("button")].find((item) => item.textContent.includes("قارن إجابتي بالحل") && !item.disabled);
    return button ? window.__l41.inspect(button) : null;
  });
  ok(Boolean(practiceContrast), "enabled compare button found");
  ok(practiceContrast && practiceContrast.ratio >= 4.5, `enabled compare button meets AA (${practiceContrast && practiceContrast.ratio}:1)`);
  await compare.click();
  ok(await card.locator("text=is → reading").first().isVisible(), "answer revealed after the attempt");
  await shot(desktop, "1280-practice-revealed");
});

await stage("lab interaction 1280x800", async () => {
  await goToSlide(desktop, slideNumber("lab-chain"));
  await shot(desktop, "1280-lab");
  const builder = desktop.locator("button", { hasText: "كوّن سؤالًا" }).first();
  ok(await builder.isDisabled(), "chain builder locked before the first auxiliary is chosen");
  await desktop.locator("select").first().selectOption("3");
  await desktop.locator("button", { hasText: /^لا يوجد$/ }).first().click();
  ok(await builder.isEnabled(), "chain builder unlocks after the correct first auxiliary");
  const builderContrast = await desktop.evaluate(() => {
    const button = [...document.querySelectorAll("button")].find((item) => item.textContent.includes("كوّن سؤالًا") && !item.disabled);
    return button ? window.__l41.inspect(button) : null;
  });
  ok(builderContrast && builderContrast.ratio >= 4.5, `enabled chain builder meets AA (${builderContrast && builderContrast.ratio}:1)`);
  await builder.click();
  ok((await desktop.locator("body").innerText()).includes("Does she study?"), "do-support question built from the chain");
});

await stage("final test 1280x800", async () => {
  await goToSlide(desktop, slideNumber("test-l1"));
  await shot(desktop, "1280-test-level1");
  ok((await desktop.locator("[data-question-id]").count()) === 5, "level 1 renders five questions");
  ok(!(await desktop.locator("body").innerText()).includes("الإجابة الصحيحة"), "no answer text on the test slides");
  ok((await desktop.locator("[data-solution-id]").count()) === 0, "no solutions in the DOM during the test");
  await answerTest(desktop);
  const submit = desktop.locator('button[type="submit"]', { hasText: "تسليم الاختبار النهائي" });
  ok(await submit.isVisible(), "submit visible on the last test page");
  ok(await submit.isEnabled(), "submit enabled with all 25 answers");
  const submitContrast = await desktop.evaluate(() => {
    const button = [...document.querySelectorAll('button[type="submit"]')].find((item) => item.textContent.includes("تسليم الاختبار النهائي"));
    return button ? window.__l41.inspect(button) : null;
  });
  ok(submitContrast && submitContrast.ratio >= 4.5, `enabled submit button meets AA (${submitContrast && submitContrast.ratio}:1)`);
  await submit.click();
  await desktop.waitForSelector("[data-solution-id]", { timeout: 15000 });
  ok((await desktop.locator("[data-solution-id]").count()) === 25, "25 solutions after submission");
  ok((await desktop.locator("body").innerText()).includes("نتيجتك"), "score rendered after submission");
  await shot(desktop, "1280-solutions");
});

await stage("teacher gate 1280x800", async () => {
  await goToSlide(desktop, slideNumber("teacher"));
  ok((await desktop.locator("[data-teacher-guide]").count()) === 0, "teacher guide absent before the password");
  await desktop.locator('input[type="password"]').fill("wrong-password");
  await desktop.locator('button[type="submit"]').click();
  ok(await desktop.locator('[role="alert"]').isVisible(), "wrong teacher password rejected");
  await desktop.locator('input[type="password"]').fill("somer173");
  await desktop.locator('button[type="submit"]').click();
  await desktop.waitForSelector("[data-teacher-guide]", { timeout: 15000 });
  ok((await desktop.locator("[data-teacher-answer]").count()) === 66, "teacher guide lists 66 practice keys");
  ok((await desktop.locator("[data-solution-id]").count()) === 25, "teacher area renders all 25 detailed test solutions");
  const teacherDetails = await desktop.evaluate(() => {
    const blocks = [...document.querySelectorAll("[data-solution-id]")];
    return {
      total: blocks.length,
      withAnswer: blocks.filter((block) => block.textContent.includes("الإجابة الصحيحة")).length,
      withExplanation: blocks.filter((block) => block.textContent.includes("التفسير التعليمي")).length,
    };
  });
  ok(teacherDetails.withAnswer === 25, `every teacher solution states the correct answer (${teacherDetails.withAnswer}/25)`);
  ok(teacherDetails.withExplanation === 25, `every teacher solution has a teaching explanation (${teacherDetails.withExplanation}/25)`);
  await shot(desktop, "1280-teacher-guide");
});
await desktop.close();
await desktopBrowser.close();

// ---------------------------------------------------------------------------
// 2) desktop 1920x1080
// ---------------------------------------------------------------------------
const wideBrowser = await launchBrowser();
const wide = await newPage(wideBrowser, 1920, 1080);
await shot(wide, "1920-cover");
await stage("walk 1920x1080", () => walk(wide, 1920, 1080));
await stage("screenshots 1920x1080", async () => {
  await goToSlide(wide, slideNumber("test-l1"));
  await shot(wide, "1920-test-level1");
  await goToSlide(wide, slideNumber("p30-1"));
  await shot(wide, "1920-practice");
  await goToSlide(wide, slideNumber("read-passage"));
  await shot(wide, "1920-reading");
});
await wide.close();
await wideBrowser.close();

// The lesson is a scrolling reading surface: a card taller than the viewport is
// expected, but it must stay under the 1200px target and never clip horizontally.
const tall = heights.filter((entry) => entry.card > 1200);
const tallest = heights.reduce((worst, entry) => (entry.card > worst.card ? entry : worst), heights[0]);
const tallerThanViewport = heights.filter((entry) => entry.scroll > 4);
ok(tall.length === 0, `no slide card exceeds the 1200px target (${tall.map((entry) => `${entry.slide}@${entry.viewport}=${entry.card}`).join(", ")})`);
ok(errors.length === 0, `no page errors in Chromium (${errors.slice(0, 3).join(" | ")})`);

const report = {
  url: base,
  browser: "chromium (playwright-core + @sparticuz/chromium)",
  viewports: [
    { width: 1280, height: 800 },
    { width: 1920, height: 1080 },
  ],
  slides: TOTAL,
  checks: checks.length,
  failures,
  errors,
  externalNetworkErrors: external,
  tallestCard: tallest,
  reservedBottomSpacePx: 128,
  cardsTallerThanViewport: tallerThanViewport.length,
  colorSelfTest,
  contrastMethod: "canvas black/white alpha solve → sRGB, composited over the full ancestor backdrop (oklch, oklab, lab, lch, rgb, rgba, hsl, hsla, hex, color(), named, transparent)",
  colorFormatsSeen: colorFormats,
  contrastSamples: contrastTests,
  inactiveContrastExemptions: inactiveExemptions,
  textOverBackgroundImages: backgroundImageBehindText,
  screenshots,
};
writeFileSync(`${output}/verification.json`, `${JSON.stringify(report, null, 2)}\n`);

console.log(`Lesson 41 browser audit: ${checks.length} checks · ${failures.length} failures · ${errors.length} page errors`);
console.log(`colour resolver self-test ${colorSelfTest.results.filter((item) => item.ok).length}/${colorSelfTest.results.length} · white/black ${colorSelfTest.reference}:1 · mid-grey ${colorSelfTest.midGrey}:1`);
console.log(`contrast: ${contrastTests} text samples · formats ${JSON.stringify(colorFormats)} · ${inactiveExemptions} faded disabled-control exemptions`);
console.log(`tallest card ${tallest.card}px (${tallest.viewport} slide ${tallest.slide}) · cards over 1200px: ${tall.map((entry) => `${entry.slide}@${entry.card}`).join(", ") || "none"}`);
console.log(`cards taller than the viewport (normal reading scroll, 128px reserved under the nav pill): ${tallerThanViewport.length} of ${heights.length} measurements`);
if (failures.length) console.log(`FAILURES:\n${failures.slice(0, 40).join("\n")}`);
if (errors.length) console.log(`ERRORS:\n${errors.slice(0, 20).join("\n")}`);
console.log(`screenshots: ${readdirSync(output).length} files in ${output}`);
process.exitCode = failures.length || errors.length ? 1 : 0;
