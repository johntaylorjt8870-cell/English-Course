// Real-Chromium audit for Lesson 36 (shared Lesson 1 shell, 36 steps, gated test/key).
// Run `npm run build && npm run preview -- --host 0.0.0.0 --port 4173`, then
// `node scripts/audit-lesson36-browser.mjs` (or set LESSON36_URL).
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const temp = "node_modules/.lesson36-browser";
mkdirSync(temp, { recursive: true });
await esbuild.build({
  absWorkingDir: process.cwd(),
  stdin: {
    contents: 'export { TEST_36 } from "./src/lessons/lesson36/testData36.ts"; export { TEST_SOLUTIONS_36 } from "./src/lessons/lesson36/solutionsData36.ts";',
    resolveDir: process.cwd(),
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: `${temp}/test-data.mjs`,
  packages: "external",
  logLevel: "silent",
});
const { TEST_36, TEST_SOLUTIONS_36 } = await import(pathToFileURL(`${process.cwd()}/${temp}/test-data.mjs`).href);
try {
  writeFileSync(`${temp}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${temp}/al2023.tar`, "-C", temp]);
} catch { /* archive is already extracted */ }
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${temp}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const OUT = "docs/lesson36-rebuild-visual";
mkdirSync(OUT, { recursive: true });
const base = process.env.LESSON36_URL || "http://127.0.0.1:4173/English-Course/#/lesson/36";
const browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
await context.addInitScript(() => { try { localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"); } catch {} });
const page = await context.newPage();
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
const errors = [];
const jsResponses = [];
page.on("pageerror", (error) => errors.push(String(error)));
page.on("console", (message) => { if (message.type() === "error" && !message.text().includes("ERR_FAILED")) errors.push(message.text()); });
page.on("response", async (response) => {
  if (/\.js(?:\?|$)/.test(response.url())) {
    try { jsResponses.push({ url: response.url(), body: await response.text() }); } catch { /* ignore */ }
  }
});

let checks = 0;
const failures = [];
const ok = (condition, message) => { checks++; if (!condition) failures.push(message); };
const overlapArea = (a, b) => {
  if (!a || !b) return 0;
  const w = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const h = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return w > 1 && h > 1 ? Math.round(w * h) : 0;
};
const boxes = () => page.evaluate(() => {
  const rect = (node) => (node ? node.getBoundingClientRect().toJSON() : null);
  const visible = (node) => !!node && getComputedStyle(node).display !== "none" && node.getClientRects().length > 0;
  const root = document.querySelector('[data-lesson="36"]');
  const rail = [...root.querySelectorAll(".w-72")].find(visible);
  const main = root.querySelector("#l36-main");
  const content = root.querySelector('[data-area="l36-lesson"]');
  const lock = [...root.querySelectorAll("[data-site-lock-button='true']")].find(visible);
  const prev = [...root.querySelectorAll("[data-step-nav='prev']")].find(visible);
  const next = [...root.querySelectorAll("[data-step-nav='next']")].find(visible);
  const pill = root.querySelector("[data-lesson-step-nav]");
  return {
    direction: getComputedStyle(root).direction,
    bg: getComputedStyle(root).backgroundColor,
    shellFont: getComputedStyle(root).fontFamily,
    rail: rect(rail), main: rect(main), content: rect(content), lock: rect(lock), prev: rect(prev), next: rect(next), pill: rect(pill),
    step: root.querySelector("[data-step-id]")?.getAttribute("data-step-id"),
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    menuButton: rect([...root.querySelectorAll("button[aria-label='فهرس الدرس']")].find(visible)),
    clipped: [...root.querySelectorAll("[data-area='l36-lesson'] h2, [data-area='l36-lesson'] h3, [data-area='l36-lesson'] p")]
      .filter((node) => node.getClientRects().length && node.scrollWidth > node.clientWidth + 2)
      .map((node) => (node.textContent || "").trim().slice(0, 50)).slice(0, 6),
  };
});
const shot = async (name) => page.screenshot({ path: `${OUT}/${name}.png`, animations: "disabled", timeout: 60000 });

function contrastAudit() {
  return page.evaluate(() => {
    // Tailwind v4 emits oklch(); convert it to sRGB so luminance is measurable.
    const gamma = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
    const oklch = (value) => {
      const m = value.match(/oklch\(([^)]+)\)/i);
      if (!m) return null;
      const parts = m[1].replace("/", " ").trim().split(/\s+/);
      const L = Number.parseFloat(parts[0]);
      const C = Number.parseFloat(parts[1]);
      const h = Number.parseFloat(parts[2] ?? "0") * (Math.PI / 180);
      const a = C * Math.cos(h);
      const b = C * Math.sin(h);
      const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
      const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
      const s_ = L - 0.0894841775 * a - 1.291485548 * b;
      const l3 = l_ ** 3, m3 = m_ ** 3, s3 = s_ ** 3;
      const to255 = (v) => Math.max(0, Math.min(255, Math.round(gamma(v) * 255)));
      return {
        r: to255(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3),
        g: to255(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3),
        b: to255(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3),
        a: parts[3] === undefined ? 1 : Number.parseFloat(parts[3]),
      };
    };
    const rgb = (value) => {
      if (/^oklch\(/i.test(value)) return oklch(value);
      const hex = value.match(/^#([0-9a-f]{3,8})$/i);
      if (hex) {
        let digits = hex[1];
        if (digits.length === 3) digits = digits.split("").map((d) => d + d).join("");
        const int = Number.parseInt(digits.slice(0, 6), 16);
        return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255, a: digits.length === 8 ? Number.parseInt(digits.slice(6), 16) / 255 : 1 };
      }
      const m = value.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const [r, g, b, a = 1] = m[1].split(",").map((x) => Number.parseFloat(x));
      return { r, g, b, a };
    };
    const bg = (el) => {
      for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
        const c = rgb(getComputedStyle(node).backgroundColor);
        if (c && c.a > 0.6) return c;
      }
      return { r: 255, g: 255, b: 255, a: 1 };
    };
    const lum = ({ r, g, b }) => {
      const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const ratio = (a, b) => { const x = lum(a) + 0.05, y = lum(b) + 0.05; return Math.max(x, y) / Math.min(x, y); };
    const nodes = [...document.querySelectorAll("[data-area='l36-lesson'] *")].filter((el) => el.getClientRects().length && (el.textContent || "").trim().length > 8);
    const failuresList = [];
    let worst = { ratio: 99, text: "" };
    for (const el of nodes) {
      const style = getComputedStyle(el);
      const fg = rgb(style.color);
      if (!fg) continue;
      const value = ratio(fg, bg(el));
      const large = Number.parseFloat(style.fontSize) >= 24 || (Number.parseFloat(style.fontSize) >= 18.66 && Number.parseInt(style.fontWeight, 10) >= 700);
      if (value < (large ? 3 : 4.5)) failuresList.push({ ratio: Number(value.toFixed(2)), text: (el.textContent || "").trim().slice(0, 60), color: style.color, background: getComputedStyle(el).backgroundColor, resolved: bg(el) });
      if (value < worst.ratio) worst = { ratio: Number(value.toFixed(2)), text: (el.textContent || "").trim().slice(0, 60) };
    }
    return { sampledTextNodes: nodes.length, failureCount: failuresList.length, failures: failuresList.slice(0, 10), worst };
  });
}

const viewportRecords = [];
for (const viewport of [
  { name: "1920x1080", width: 1920, height: 1080, rail: true },
  { name: "1280x800", width: 1280, height: 800, rail: true },
  { name: "768x900", width: 768, height: 900, rail: false },
  { name: "375x812", width: 375, height: 812, rail: false },
]) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForSelector('[data-step-id="cover"]', { timeout: 30000 });
  await page.waitForTimeout(150);
  const state = await boxes();
  ok(state.direction === "rtl", `${viewport.name}: RTL shell`);
  ok(state.bg === "rgb(244, 246, 251)", `${viewport.name}: shared canvas colour (${state.bg})`);
  ok(state.scrollWidth <= state.width, `${viewport.name}: no horizontal page overflow (${state.scrollWidth}/${state.width})`);
  ok(Boolean(state.rail) === viewport.rail, `${viewport.name}: rail visibility follows the shared shell (${viewport.rail})`);
  ok(Boolean(state.menuButton) === !viewport.rail, `${viewport.name}: mobile index button visibility`);
  ok(!!state.main && !!state.content, `${viewport.name}: lesson region rendered inside the shell`);
  ok((state.clipped ?? []).length === 0, `${viewport.name}: no clipped lesson text (${(state.clipped ?? []).join(" | ")})`);
  if (viewport.rail) {
    ok(Math.abs(state.rail.width - 288) <= 1, `${viewport.name}: rail is 288px (got ${state.rail.width})`);
    ok(state.content.width <= 896, `${viewport.name}: centred content is at most 896px (got ${state.content.width})`);
  }
  ok(overlapArea(state.prev, state.lock) === 0 && overlapArea(state.next, state.lock) === 0, `${viewport.name}: floating step navigation is not covered by the site-lock button`);
  ok(!!state.next, `${viewport.name}: prev/next navigation comes from the shared shell`);
  const contrast = await contrastAudit();
  ok(contrast.failureCount === 0, `${viewport.name}: no AA contrast failures (worst ${contrast.worst.ratio}: ${contrast.worst.text})`);
  await shot(`${viewport.name}-cover`);

  // Navigate to the prediction lab (a step with real controls) through the shell.
  if (viewport.rail) {
    await page.locator("[data-step-nav='s07']").first().click();
  } else {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    await page.locator(".fixed.inset-0.z-50 [data-step-nav='s07']").last().click();
  }
  await page.waitForSelector('[data-step-id="s07"]', { timeout: 15000 });
  ok((await boxes()).step === "s07", `${viewport.name}: the shell navigates to the prediction lab`);
  await page.keyboard.press("Shift");
  const focus = await page.evaluate(() => {
    const node = [...document.querySelectorAll("[data-area='l36-lesson'] button")].find((candidate) => candidate.getClientRects().length);
    if (!node) return { found: false };
    node.focus();
    const style = getComputedStyle(node);
    return { found: true, focusVisible: node.matches(":focus-visible"), shadow: style.boxShadow, outline: style.outlineStyle, tag: node.tagName };
  });
  ok(focus.found && focus.focusVisible && (focus.shadow !== "none" || focus.outline !== "none"), `${viewport.name}: keyboard focus is visible on an in-lesson control (${JSON.stringify(focus)})`);
  await shot(`${viewport.name}-lab`);
  viewportRecords.push({ viewport: viewport.name, shell: state, contrast, focus });

  if (!viewport.rail) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    await page.waitForTimeout(120);
    ok(await page.locator(".fixed.inset-0.z-50").count() === 1, `${viewport.name}: mobile index opens as the shared drawer`);
    await shot(`${viewport.name}-drawer-open`);
    await page.locator(".fixed.inset-0.z-50 [data-step-nav='s12']").last().click();
    await page.waitForTimeout(120);
    ok((await boxes()).step === "s12", `${viewport.name}: choosing a drawer item changes the displayed step`);
    ok(await page.locator(".fixed.inset-0.z-50").count() === 0, `${viewport.name}: choosing a step closes the drawer`);
    await shot(`${viewport.name}-drawer-navigation`);
  }
}

// ---- Answer-key isolation.
// The real Q22 model answer is used purely as an in-memory sentinel: it never
// reaches verification.json, which may store booleans and non-answer metadata only.
const ANSWER_MARKER = TEST_SOLUTIONS_36.find((solution) => solution.n === 22)?.answer ?? "";
const KEY_MODULE_MARKER = "teacher-authored";
const TEACHER_PASSWORD = "somer173";
if (!ANSWER_MARKER) throw new Error("Lesson 36 browser audit could not resolve its Q22 answer sentinel.");
const loadedJs = () => jsResponses.map((response) => response.body).join("\n");
const hasAnswerMarker = () => loadedJs().includes(ANSWER_MARKER);
const hasKeyModuleMarker = () => loadedJs().includes(KEY_MODULE_MARKER);
const hasKeyChunk = () => jsResponses.some((response) => response.url.includes("/solutionsData36-"));
const isolationStages = [];
/** Snapshot of the network state at one stage — booleans and a stage name only. */
const recordIsolation = (stage) => {
  const snapshot = {
    stage,
    answerMarkerInLoadedJs: hasAnswerMarker(),
    keyModuleMarkerInLoadedJs: hasKeyModuleMarker(),
    keyChunkRequested: hasKeyChunk(),
  };
  isolationStages.push(snapshot);
  return snapshot;
};

const initialIsolation = recordIsolation("initial-load-all-four-viewports");
ok(!initialIsolation.answerMarkerInLoadedJs, "the real Q22 model answer is absent from every JavaScript response loaded so far");
ok(!initialIsolation.keyModuleMarkerInLoadedJs, "the answer-key module marker is absent from the initial application JavaScript");
ok(!initialIsolation.keyChunkRequested, "initial student payload excludes the deferred answer-key chunk");

await page.setViewportSize({ width: 1280, height: 800 });
await page.goto("about:blank");
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForSelector('[data-step-id="cover"]');
const lockedTab = page.locator("[data-area-tab='solutions']");
ok((await lockedTab.getAttribute("aria-disabled")) === "true", "the solutions entry is locked before submission");
await lockedTab.click({ force: true });
await page.waitForTimeout(150);
ok(await page.locator("[data-area='l36-solutions']").count() === 0, "the locked solutions entry does not open the key");
const lockedIsolation = recordIsolation("after-locked-solutions-entry");
ok(!lockedIsolation.answerMarkerInLoadedJs && !lockedIsolation.keyModuleMarkerInLoadedJs && !lockedIsolation.keyChunkRequested, "the locked entry loads no answer data and no key chunk");

await page.locator("[data-area-tab='test']").click();
await page.waitForSelector("[data-test-question='25']", { timeout: 30000 });
const preState = await page.evaluate(() => ({
  questions: document.querySelectorAll("[data-test-question]").length,
  feedback: document.querySelectorAll("[data-test-feedback]").length,
  submitDisabled: [...document.querySelectorAll("button")].find((b) => b.textContent?.includes("إرسال الاختبار"))?.disabled,
  text: document.querySelector("[data-area='l36-test']")?.textContent ?? "",
  ltr: document.querySelectorAll("[data-area='l36-test'] [dir='ltr']").length,
}));
ok(preState.questions === 25, "the test renders exactly 25 questions");
ok(preState.feedback === 0 && preState.submitDisabled === true, "unanswered test shows no feedback and blocks submit");
ok(!/§\s*\d+|القسم\s*\d+|Source section|teacher-authored/i.test(preState.text), "student test contains no internal source labels");
ok(preState.ltr >= 25, "English prompts render in LTR islands");
await shot("test-before-submit");

for (const question of TEST_36) {
  const card = page.locator(`[data-test-question='${question.n}']`);
  const solution = TEST_SOLUTIONS_36.find((item) => item.n === question.n);
  if (question.options) {
    await card.locator("label").nth(solution.correctOption ?? 0).click();
  } else if (question.type === "fill" || question.type === "repair") {
    await card.locator("input").fill(solution.accepts?.[0] ?? solution.answer);
  } else {
    await card.locator("textarea").fill("This is my own sentence for the open situation.");
  }
}
ok(await page.locator("[data-test-feedback]").count() === 0, "a fully answered but unsubmitted test still hides all corrections");
ok(await page.locator("[role='progressbar']").getAttribute("aria-valuenow") === "25", "the progress indicator reaches 25 answered questions");
const typedIsolation = recordIsolation("after-answering-without-submitting");
ok(!typedIsolation.answerMarkerInLoadedJs && !typedIsolation.keyModuleMarkerInLoadedJs && !typedIsolation.keyChunkRequested, "answers typed but unsubmitted still load no key chunk");
await page.getByRole("button", { name: "إرسال الاختبار" }).click();
await page.waitForSelector("[data-test-result]", { timeout: 30000 });
await page.waitForTimeout(150);
const resultText = await page.locator("[data-test-result]").innerText();
ok(resultText.includes("15") && resultText.includes("الأسئلة الموضوعية"), "submitted result reports the objective score");
ok(await page.locator("[data-test-feedback]").count() === 25, "submission reveals feedback for all 25 questions");
const submittedIsolation = recordIsolation("after-submission");
ok(submittedIsolation.keyChunkRequested, "the deferred answer-key chunk is requested only after submission");
ok(submittedIsolation.answerMarkerInLoadedJs && submittedIsolation.keyModuleMarkerInLoadedJs, "the submitted page actually fetched the real model answer, so the sentinel proves the chunk is the key");
await shot("test-after-submit");

await page.locator("[data-area-tab='solutions']").click();
await page.waitForSelector("[data-solution]", { timeout: 30000 });
const seenSolutions = new Set();
for (let level = 0; level < 5; level++) {
  await page.locator("nav[aria-label='مستويات الحلول'] button").nth(level).click();
  await page.waitForTimeout(80);
  const numbers = await page.locator("[data-solution]:visible").evaluateAll((nodes) => nodes.map((node) => Number(node.getAttribute("data-solution"))));
  ok(numbers.length === 5, `solutions level ${level + 1} shows its five answers`);
  numbers.forEach((n) => seenSolutions.add(n));
}
ok(seenSolutions.size === 25 && [...seenSolutions].every((n) => n >= 1 && n <= 25), `all 25 detailed answers are reachable through the five level tabs (got ${seenSolutions.size})`);
await shot("solutions-open");

await page.locator("[data-area-tab='teacher']").click();
await page.waitForSelector("#l36-teacher-password", { timeout: 30000 });
ok(await page.locator("[data-teacher-solution]").count() === 0, "teacher key stays hidden behind the password gate");
await shot("teacher-locked");
await page.locator("#l36-teacher-password").fill("wrong-password");
await page.getByRole("button", { name: /دخول المعلم/ }).click();
await page.waitForTimeout(200);
ok(await page.locator("[data-teacher-solution]").count() === 0 && await page.locator("[role='alert']").count() >= 1, "a wrong teacher password keeps the key hidden and shows an alert");
await page.locator("#l36-teacher-password").fill("somer173");
await page.getByRole("button", { name: /دخول المعلم/ }).click();
await page.waitForSelector("nav[aria-label='أقسام دليل المعلم']", { timeout: 30000 }).catch(() => {});
await page.waitForTimeout(400);
const teacherOpened = await page.locator("[data-teacher-solution]").count();
if (teacherOpened === 0) await page.getByRole("button", { name: "حلول الاختبار" }).click();
await page.waitForSelector("[data-teacher-solution]", { timeout: 30000 });
ok(await page.locator("[data-teacher-solution]").count() === 25, "the teacher password reveals all 25 keys");
await page.getByRole("button", { name: "خريطة التغطية" }).click();
await page.waitForTimeout(120);
ok(await page.locator("[data-coverage-section]").count() === 27, "the teacher coverage map lists all 27 source sections");
await shot("teacher-open");

// ---- Keyboard navigation and RTL arrow direction.
await page.locator("[data-area-tab='lesson']").click();
await page.locator("[data-step-nav='cover']").click();
await page.waitForTimeout(80);
await page.keyboard.press("ArrowLeft");
await page.waitForTimeout(100);
ok((await boxes()).step === "s01", "ArrowLeft advances one step in RTL");
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(100);
ok((await boxes()).step === "cover", "ArrowRight returns one step in RTL");
ok(await page.locator("[data-site-lock-button='true']:visible").count() === 1, "exactly one shared site-lock button is visible");

// ---- Student-facing copy: no internal source labels anywhere students can reach.
const studentCopy = await page.evaluate(() => {
  const root = document.querySelector('[data-lesson="36"]') ?? document.body;
  const clone = root.cloneNode(true);
  return [clone.textContent, ...[...root.querySelectorAll("[aria-label], [title], [alt], [placeholder]")].flatMap((node) => [
    node.getAttribute("aria-label"), node.getAttribute("title"), node.getAttribute("alt"), node.getAttribute("placeholder"),
  ])].filter(Boolean).join(" ");
});
ok(!/(?:^|\s)(?:§|\bSource section\b|\bSource file\b|\bمصدر\b|القسم\s*\d+|ledger36|deckA36|lesson36\/)/i.test(studentCopy), "no student-visible internal source labels, filenames or section markers");
ok(errors.length === 0, `no browser or console errors (${errors.join(" | ")})`);

// ---- Evidence artifact: booleans and non-answer metadata only.
// The sentinel answer, any sample solution, and the teacher password are never
// serialized; the assertions below re-read the written file to prove it.
const beforeSubmitStages = isolationStages.filter((stage) => stage.stage !== "after-submission");
const summary = {
  baseUrl: base,
  checks,
  passed: checks - failures.length,
  failures,
  viewports: viewportRecords,
  answerKeyIsolation: {
    markerSource: "solutionsData36.ts · Q22 model answer (value deliberately not stored here)",
    keyChunkPrefix: "solutionsData36-",
    answerMarkerPresentBeforeSubmit: beforeSubmitStages.some((stage) => stage.answerMarkerInLoadedJs),
    keyChunkRequestedBeforeSubmit: beforeSubmitStages.some((stage) => stage.keyChunkRequested),
    keyChunkRequestedAfterSubmit: submittedIsolation.keyChunkRequested,
    answerMarkerPresentAfterSubmit: submittedIsolation.answerMarkerInLoadedJs,
    rawAnswerStoredInArtifact: false,
    teacherPasswordStoredInArtifact: false,
    stages: isolationStages,
  },
  consoleErrors: errors,
  screenshotsDirectory: OUT,
};
const artifactPath = `${OUT}/verification.json`;
const serializeArtifact = () => JSON.stringify({ ...summary, checks, passed: checks - failures.length, failures }, null, 2);

writeFileSync(artifactPath, serializeArtifact());
const writtenArtifact = readFileSync(artifactPath, "utf8");
ok(!writtenArtifact.includes(ANSWER_MARKER), "the generated verification.json does not contain the raw Q22 model answer used as the audit sentinel");
ok(!writtenArtifact.includes(TEACHER_PASSWORD), "the generated verification.json does not contain the teacher password");
ok(!writtenArtifact.includes(KEY_MODULE_MARKER), "the generated verification.json contains no answer-key module marker text");
ok(!writtenArtifact.includes("secretSample") && !/\(solution\)|"answer"\s*:/.test(writtenArtifact), "the generated verification.json has no plaintext answer/sample field");
// Refresh only the counters so the artifact reports the regression checks above.
writeFileSync(artifactPath, serializeArtifact());

await browser.close();
const passed = checks - failures.length;
if (failures.length) {
  console.error(`Lesson 36 browser audit: ${passed}/${checks} passed, ${failures.length} FAILED`);
  for (const failure of failures) console.error(` - ${failure}`);
  process.exit(1);
}
console.log(`Lesson 36 browser audit: ${passed}/${checks} passed across 4 viewports, navigation, gated assessment, deferred key, teacher flow, and direction.`);
