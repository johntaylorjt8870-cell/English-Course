// Real Chromium verification for Lesson 41 (master auxiliary verbs).
// Provision (not committed): npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
// Run with the dev server up: node scripts/audit-lesson41-browser.mjs
import { mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";
import { build } from "esbuild";

const work = "node_modules/.lesson41-browser";
mkdirSync(work, { recursive: true });
// The sandbox has no NSS/NSPR; use the libraries shipped inside the npm Chromium package.
writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
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

// One browser per viewport: keeps each headless session short-lived in the sandbox.
const exePath = process.env.CHROMIUM_PATH || (await chromium.executablePath());
const launchBrowser = () => playwright.launch({ args: chromium.args, executablePath: exePath, headless: true });
const output = "docs/lesson41-visual";
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

const checks = [];
const failures = [];
const errors = [];
const external = [];
const heights = [];
const screenshots = [];
const ok = (condition, message) => {
  checks.push(message);
  if (!condition) failures.push(message);
};
const base = process.env.LESSON41_URL || "http://127.0.0.1:5173/English-Course/#/lesson/41";
const TOTAL = SLIDES_41.length;

async function newPage(browser, width, height) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
  page.on("pageerror", (error) => errors.push(`${width}x${height} ${error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const url = message.location().url || "";
    if (/fonts\.(googleapis|gstatic)\.com/.test(url)) external.push({ url, message: message.text() });
    else errors.push(`${width}x${height} ${message.text()} ${url}`);
  });
  await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.locator('[data-lesson="41"]').waitFor({ timeout: 30000 });
  await page.locator(".font-en").first().waitFor();
  // Freeze the `pop` / `anim-drift` entrance animations so screenshots and
  // contrast measurements reflect the settled UI, not a mid-animation frame.
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
  return page;
}

// Measurement payload: layout overflow, contrast, unresolved ARIA, nav overlap.
async function measure(page) {
  return page.evaluate(() => {
    const root = document.querySelector('[data-lesson="41"]');
    const main = document.querySelector("#l41-main");
    const card = main.querySelector("section");
    const rect = (element) => (element ? element.getBoundingClientRect().toJSON() : null);
    const pill = [...document.querySelectorAll("button")].find((button) => button.textContent.includes("التالي"))?.closest("div.rounded-full");
    const lock = document.querySelector("[data-site-lock-button]");
    const overlaps = (a, b) => Boolean(a && b) && a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    // Judge overlap where it matters: at maximum scroll the reserved bottom space
    // must keep every control clear of the floating step-navigation pill.
    main.scrollTop = main.scrollHeight;
    const pillRect = rect(pill);
    const lockRect = rect(lock);
    const blocked = pillRect
      ? [...document.querySelectorAll("button,input,textarea,select,a")]
          .filter((element) => element !== pill && !pill.contains(element) && !element.closest("[aria-hidden='true']"))
          .filter((element) => overlaps(rect(element), pillRect))
          .map((element) => (element.textContent || element.getAttribute("aria-label") || element.tagName).trim().slice(0, 40))
      : [];
    // A real clip = overflowing box that actually hides readable content.
    // Decorative blobs (`aria-hidden` / pointer-events-none) are clipped on purpose.
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

    // Tailwind v4 emits oklch(); resolve every colour through a canvas so the
    // comparison happens in real sRGB instead of parsed digits.
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const rgb = (color) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "#000000";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b, a / 255];
    };
    const lum = (color) => {
      const channels = color.slice(0, 3).map((value) => {
        const v = value / 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const lowContrast = [];
    let contrastTests = 0;
    for (const element of main.querySelectorAll("*")) {
      if (!element.getClientRects().length) continue;
      const style = getComputedStyle(element);
      if (style.visibility === "hidden" || style.opacity === "0") continue;
      if (![...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim())) continue;
      // Decorative separators and icon glyphs are aria-hidden or punctuation only.
      if (element.closest('[aria-hidden="true"]')) continue;
      if (!/[\p{L}\p{N}]/u.test(element.textContent || "")) continue;
      const fg = rgb(style.color);
      let node = element;
      let bg;
      while (node) {
        const color = rgb(getComputedStyle(node).backgroundColor);
        if (color.length >= 3 && (color[3] === undefined || color[3] >= 0.99)) {
          bg = color;
          break;
        }
        node = node.parentElement;
      }
      bg ??= [255, 255, 255];
      const a = lum(fg);
      const b = lum(bg);
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      contrastTests += 1;
      const size = parseFloat(style.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700);
      if (ratio < (large ? 3 : 4.5)) lowContrast.push({ text: (element.textContent || "").trim().slice(0, 60), ratio: Number(ratio.toFixed(2)) });
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
      contrastTests,
      missingAria,
      pillBlocked: blocked,
      pillLockOverlap: overlaps(pillRect, lockRect),
      lockVisible: Boolean(lockRect && lockRect.width > 0),
    };
  });
}

async function shot(page, name) {
  const path = `${output}/${name}.png`;
  await page.screenshot({ path, fullPage: false });
  screenshots.push(path);
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
      ok(!data.pillLockOverlap, `${label} slide ${index} floating step nav does not overlap the site lock`);
      ok(data.pillBlocked.length === 0, `${label} slide ${index} step nav covers no control (${data.pillBlocked.join(", ")})`);
      ok(data.missingAria.length === 0, `${label} slide ${index} ARIA references resolve (${data.missingAria.join(", ")})`);
      ok(data.lowContrast.length === 0, `${label} slide ${index} contrast >= 4.5 (${JSON.stringify(data.lowContrast)})`);
      heights.push({ viewport: label, slide: index, card: data.cardHeight, scroll: data.slideOverflow });
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

const desktopBrowser = await launchBrowser();
const desktop = await newPage(desktopBrowser, 1280, 800);
await shot(desktop, "1280-cover");
await stage("walk 1280x800", () => walk(desktop, 1280, 800));

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
  await shot(desktop, "1280-teacher-guide");
});
await desktop.close();
await desktopBrowser.close();

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
  cardsOver1200: tall,
  reservedBottomSpacePx: 128,
  cardsTallerThanViewport: tallerThanViewport.length,
  screenshots,
};
writeFileSync(`${output}/verification.json`, `${JSON.stringify(report, null, 2)}\n`);

console.log(`Lesson 41 browser audit: ${checks.length} checks · ${failures.length} failures · ${errors.length} page errors`);
console.log(`tallest card ${tallest.card}px (${tallest.viewport} slide ${tallest.slide}) · cards over 1200px: ${tall.map((entry) => `${entry.slide}@${entry.card}`).join(", ") || "none"}`);
console.log(`cards taller than the viewport (normal reading scroll, 128px reserved under the nav pill): ${tallerThanViewport.length} of ${heights.length} measurements`);
if (failures.length) console.log(`FAILURES:\n${failures.slice(0, 40).join("\n")}`);
if (errors.length) console.log(`ERRORS:\n${errors.slice(0, 20).join("\n")}`);
console.log(`screenshots: ${readdirSync(output).length} files in ${output}`);
process.exitCode = failures.length || errors.length ? 1 : 0;
