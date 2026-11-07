// ============================================================
// Lesson 57 — تدقيق الأزرار والخيارات بصريًا (تباين + تسميات)
//
// يفتح الدرس في Chromium، ويمرّ على كل خطوة، ويقيس لكل زر/خيار:
//   • هل النص موجود فعليًا وله صندوق مرئي (لا اختفاء بسبب grid/span/display)؟
//   • تباين لون النص مع الخلفية الفعلية (WCAG ≥ 4.5:1 للنص العادي).
// ثم يفحص الحالات: hover · focus-visible · disabled · aria-pressed / is-on.
//
// node scripts/audit-lesson57-buttons.mjs
// ============================================================
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson57-browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const dist = join(process.cwd(), "dist");
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  const raw = (req.url || "/").split("?")[0];
  const rel = raw.startsWith("/English-Course/") ? raw.slice(16) : raw.replace(/^\/+/, "");
  const path = normalize(join(dist, rel || "index.html"));
  const file = path.startsWith(dist) && existsSync(path) && statSync(path).isFile() ? path : join(dist, "index.html");
  res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}/English-Course/`;

/** مقارنة الألوان داخل الصفحة (تُحقن في كل صفحة). */
const MEASURE = () => {
  // بعض ألوان Tailwind 4 تُحسب بـ oklch، لذا نحوّلها عبر canvas إلى rgb.
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });
  const lum = (c) => {
    const f = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (a, b) => {
    const l1 = lum(a);
    const l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const cache = new Map();
  // بعض ألوان Tailwind 4 تصل بصيغة oklch/oklab؛ نحوّلها عبر canvas إلى rgba.
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx2d = canvas.getContext("2d", { willReadFrequently: true });
  const parse = (value) => {
    if (!value) return null;
    if (cache.has(value)) return cache.get(value);
    let out = null;
    const m = /rgba?\(([^)]+)\)/.exec(value);
    if (m) {
      const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
      out = { r: parts[0], g: parts[1], b: parts[2], a: parts[3] === undefined ? 1 : parts[3] };
    } else if (/^(transparent|none)$/i.test(value)) {
      out = { r: 0, g: 0, b: 0, a: 0 };
    } else {
      ctx2d.clearRect(0, 0, 1, 1);
      ctx2d.fillStyle = "#010203";
      ctx2d.fillStyle = value; // متصفح غير عارف بالصيغة يُبقي القيمة السابقة
      const resolved = ctx2d.fillStyle;
      if (resolved !== "#010203") {
        ctx2d.clearRect(0, 0, 1, 1);
        ctx2d.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = ctx2d.getImageData(0, 0, 1, 1).data;
        out = { r, g, b, a: a / 255 };
      }
    }
    cache.set(value, out);
    return out;
  };
  /** الخلفية المعتمة الأقرب: الطبقات الشفافة تُغيّر الدرجة قليلًا فقط،
      والقياس عليها ينتج أرقامًا مضلّلة، لذا نأخذ أول سطح معتم فعلًا. */
  const opaqueBackdrop = (el) => {
    let node = el;
    while (node && node !== document.documentElement) {
      const cs = getComputedStyle(node);
      const bg = parse(cs.backgroundColor);
      if (bg && bg.a >= 0.999) return bg;
      const surface = gradientSurface(cs.backgroundImage);
      if (surface) return surface;
      node = node.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };

  /** آخر لون داخل background-image (تقريب لسطح التدرّج). */
  const gradientSurface = (image) => {
    if (!image || image === "none") return null;
    const colors = image.match(/(rgba?\([^)]+\)|oklch\([^)]+\)|oklab\([^)]+\)|#[0-9a-f]{3,8})/gi);
    if (!colors || !colors.length) return null;
    const last = parse(colors[colors.length - 1]);
    return last ? { ...last, a: Math.max(last.a, 0.98) } : null;
  };

  /** لون الخلفية الفعلي تحت النص: يتراكب من الشفاف إلى المعتم. */
  const background = (el) => {
    let node = el;
    const stack = [];
    while (node && node !== document.documentElement) {
      const cs = getComputedStyle(node);
      const bg = parse(cs.backgroundColor);
      if (bg && bg.a > 0) {
        stack.push(bg);
        if (bg.a >= 1) break;
      }
      // خلفية مرسومة بتدرّج: background-color شفاف لكن السطح المرئي معتم.
      // تُفحص دائمًا (لا في فرع else) لأن شفافية اللون لا تُلغي وجود التدرّج.
      const surface = bg && bg.a >= 1 ? null : gradientSurface(cs.backgroundImage);
      if (surface) {
        stack.push(surface);
        break;
      }
      node = node.parentElement;
    }
    // stack مُرتّب من الأقرب إلى الأبعد: نبدأ من الأسفل (أعلى الصفحة) ونركّب صعودًا.
    let acc = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = stack.length - 1; i >= 0; i--) acc = over(stack[i], acc);
    return acc;
  };
  const label = (el) =>
    (el.getAttribute("aria-label") || el.innerText || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 42);
  const describe = (el) => {
    const cls = Array.from(el.classList).filter((c) => c.startsWith("l57-") || c.startsWith("bg-") || c.startsWith("text-")).join(".");
    return `${el.tagName.toLowerCase()}${el.dataset.stepNav ? `[nav=${el.dataset.stepNav}]` : ""}${cls ? "." + cls : ""}`;
  };

  /** نص مباشر داخل العنصر (خارج العناصر الفرعية) — يُرسم بلون العنصر نفسه. */
  const ownText = (el) =>
    [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

  const results = [];
  const buttons = [...document.querySelectorAll("#l57-main button, .lesson57 button")];
  const seen = new Set();
  for (const el of buttons) {
    if (seen.has(el)) continue;
    seen.add(el);
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    // العناصر المخفية عبر أصل hidden (مثل الاختبار النهائي المُركَّب دائمًا) لا تُحسب
    if (el.checkVisibility && !el.checkVisibility({ checkOpacity: false, checkVisibilityCSS: true })) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) continue;
    const direct = ownText(el);
    const text = direct || label(el);
    const bg = background(el);
    const fgRaw = parse(cs.color) || { r: 0, g: 0, b: 0, a: 1 };
    const fg = over(fgRaw, bg);
    const contrast = ratio(fg, bg);
    const opacity = Number(cs.opacity);
    const disabled = el.disabled;
    // النص داخل الزر قد يكون في عناصر فرعية بلون مختلف
    // نص مرسوم فعلًا داخل العنصر: عقد نصية مباشرة في الشجرة الفرعية (لا حاويات فارغة)
    const childColors = [...el.querySelectorAll("span, em, b, bdi, strong, small, i")]
      .filter((c) => c.checkVisibility ? c.checkVisibility({ checkOpacity: false, checkVisibilityCSS: true }) : true)
      .filter((c) => c.getBoundingClientRect().height > 0)
      .filter((c) =>
        [...c.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 0),
      )
      .map((c) => {
        const ccs = getComputedStyle(c);
        const cbg = opaqueBackdrop(c); // السطح المعتم الذي يُرسم عليه النص فعليًا
        const cAlpha = parse(ccs.color) || { r: 0, g: 0, b: 0, a: 1 };
        const cfg = over({ ...cAlpha, a: 1 }, cbg);
        return {
          color: ccs.color,
          contrast: ratio(cfg, cbg),
          bg: `rgb(${Math.round(cbg.r)}, ${Math.round(cbg.g)}, ${Math.round(cbg.b)})`,
          text: c.textContent.trim().slice(0, 30),
        };
      });
    results.push({
      where: describe(el),
      text,
      direct,
      hasText: text.length > 0,
      visible: rect.width > 1 && rect.height > 1,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      color: cs.color,
      bg: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
      contrast: Math.round(contrast * 100) / 100,
      opacity,
      disabled,
      pressed: el.getAttribute("aria-pressed"),
      childColors,
      inlineKids: [...el.children].map((c) => {
        const ccs = getComputedStyle(c);
        const r = c.getBoundingClientRect();
        return { display: ccs.display, h: Math.round(r.height), w: Math.round(r.width), text: c.textContent.trim().slice(0, 20) };
      }),
    });
  }
  return results;
};

const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) failures.push(msg);
};

const browser = await playwright.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
// Chromium هنا يعمل بـ --single-process: إغلاق آخر صفحة يقتل المتصفح كله،
// لذلك نستخدم صفحة واحدة دائمة ونغيّر مقاس العرض بالتبديل لا بإعادة الفتح.
const page = await browser.newPage();
await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
const consoleErrors = [];
page.on("pageerror", (e) => consoleErrors.push(String(e).slice(0, 200)));
page.on("console", (m) => {
  if (m.type() === "error" && !/ERR_CONNECTION|favicon|net::/i.test(m.text())) consoleErrors.push(m.text().slice(0, 200));
});
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(`${base}#/lesson/57`, { waitUntil: "networkidle" });
const stepIds = await page.evaluate(() => [...document.querySelectorAll("aside nav button[data-step-nav]")].map((b) => b.dataset.stepNav));
ok(stepIds.length >= 45, `rail exposes every step (${stepIds.length})`);

const totals = { buttons: 0, worst: { contrast: 99, where: "" }, perStep: [] };

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
]) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(180);

  for (const id of stepIds) {
    let nav = page.locator(`button[data-step-nav="${id}"]:visible`);
    if (!(await nav.count())) {
      const menu = page.getByRole("button", { name: "فهرس الدرس" });
      if (await menu.count()) await menu.first().click();
      nav = page.locator(`button[data-step-nav="${id}"]:visible`);
    }
    if (!(await nav.count())) continue;
    if (id === "teacher") {
      await nav.first().click();
      const gate = page.getByLabel("كلمة مرور فضاء المعلم");
      if (await gate.count()) {
        await gate.fill("somer173");
        await page.getByRole("button", { name: "فتح المساحة" }).click();
        await page.waitForTimeout(200);
      }
    } else {
      await nav.first().click();
    }
    // ننتظر انتهاء انتقالات CSS (خلفية زر الفهرس المتحرك مثلًا)، وإلا قِسنا
    // لونًا وسط الحركة وهو نصف شفاف فيسقط القياس على خلفية الشريط الداكنة.
    await page.waitForTimeout(120);
    await page
      .waitForFunction(() => document.getAnimations().every((a) => a.playState !== "running"), null, { timeout: 3000 })
      .catch(() => {});

    const rows = await page.evaluate(MEASURE);
    totals.buttons += rows.length;
    for (const r of rows) {
      const tag = `${viewport.name} · ${id} · ${r.where} · "${r.text}"`;
      ok(r.hasText, `${tag}: has an accessible text label`);
      ok(r.visible, `${tag}: has a visible box (${r.width}x${r.height})`);
      if (!r.hasText) continue;
      {
        const min = r.disabled ? 3 : 4.5;
        if (r.direct) {
          ok(
            r.contrast >= min,
            `${tag}: contrast ${r.contrast} ≥ ${min} on ${r.bg} (text ${r.color})`,
          );
          if (!r.disabled && r.contrast < totals.worst.contrast) totals.worst = { contrast: r.contrast, where: tag };
        } else {
          ok(r.childColors.some((c) => c.text), `${tag}: label is rendered by a child with text`);
        }
      }
      for (const c of r.childColors) {
        if (!c.text) continue;
        const min = r.disabled ? 3 : 4.5;
        ok(
          c.contrast >= min,
          `${tag}: child "${c.text}" contrast ${Math.round(c.contrast * 100) / 100} ≥ ${min} (text ${c.color} on ${c.bg})`,
        );
      }
      // لا عنصر نصي داخل الزر بصندوق صفري (سبب «الزر الفارغ»)
      for (const k of r.inlineKids) {
        if (!k.text) continue;
        ok(k.h > 0 && k.w > 0, `${tag}: inner element "${k.text}" is not collapsed (${k.w}x${k.h})`);
      }
    }
    if (viewport.name === "desktop") totals.perStep.push({ id, buttons: rows.length });
  }
}

// ---------- حالات تفاعلية: hover · focus · pressed · disabled ----------
{
  await page.setViewportSize({ width: 1440, height: 1000 });
  const go = async (id) => {
    await page.locator(`aside nav button[data-step-nav="${id}"]`).click();
    await page.waitForTimeout(200);
  };

  // خيار واحد في تمرين الاختيار: قبل/بعد الاختيار/بعد التحقق
  await go("practice-1");
  const option = page.locator("#l57-main .l57-practice-card .l57-options button").first();
  const card = page.locator("#l57-main .l57-practice-card").first();
  const readOption = async () =>
    option.evaluate((b) => {
      const cs = getComputedStyle(b);
      const bg = getComputedStyle(b).backgroundColor;
      return { color: cs.color, bg, pressed: b.getAttribute("aria-pressed"), disabled: b.disabled, text: b.innerText.trim() };
    });
  const rest = await readOption();
  ok(rest.pressed === "false" || rest.pressed === null, "option starts unpressed");
  await option.hover();
  await page.waitForTimeout(120);
  const hovered = await readOption();
  ok(hovered.text.length > 0, "option keeps its label on hover");
  await option.click();
  await page.waitForTimeout(120);
  const pressed = await readOption();
  ok(pressed.pressed === "true", "option becomes aria-pressed after a click");
  ok(pressed.text.length > 0, "option keeps its label when pressed");
  ok(pressed.color !== pressed.bg, `pressed option text ${pressed.color} differs from its background ${pressed.bg}`);
  const pressedContrast = await option.evaluate((b) => {
    const parse = (v) => (/rgba?\(([^)]+)\)/.exec(v)[1].split(/[,\s/]+/).map(Number));
    const f = parse(getComputedStyle(b).color);
    const g = parse(getComputedStyle(b).backgroundColor);
    const lum = (c) => c.slice(0, 3).map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
    const [l1, l2] = [lum(f), lum(g)].sort((a, b) => b - a);
    return Math.round(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100;
  });
  ok(pressedContrast >= 4.5, `pressed option contrast ${pressedContrast} ≥ 4.5`);

  // focus-visible: حلقة تركيز مرئية
  await page.keyboard.press("Tab");
  const focusRing = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el.tagName !== "BUTTON") return null;
    const cs = getComputedStyle(el);
    return { outline: cs.outlineWidth, style: cs.outlineStyle, color: cs.outlineColor, text: el.innerText.trim().slice(0, 20) };
  });
  ok(!!focusRing, "Tab moves focus to a button");
  if (focusRing) ok(focusRing.style !== "none" && parseFloat(focusRing.outline) >= 2, `focused button shows an outline (${focusRing.outline} ${focusRing.style})`);

  // تحقّق: الزر الداكن بعد التفعيل + زر معطّل
  await card.getByRole("button", { name: "تحقّق" }).click();
  await page.waitForTimeout(200);
  const checkBtn = card.getByRole("button", { name: "تحقّق" });
  const checkState = await checkBtn.evaluate((b) => ({
    color: getComputedStyle(b).color,
    bg: getComputedStyle(b).backgroundColor,
    disabled: b.disabled,
    opacity: getComputedStyle(b).opacity,
  }));
  ok(checkState.disabled, "check button locks after verifying");
  ok(checkState.color !== checkState.bg, "disabled dark button text is not the same colour as its background");
  ok((await page.locator("#l57-main .l57-practice-feedback").count()) >= 1, "verdict appears after checking");

  // أزرار التنقل المشتركة: النص أبيض على خلفية داكنة
  const nextBtn = page.locator('button[data-step-nav="next"]');
  const nextState = await nextBtn.evaluate((b) => ({ color: getComputedStyle(b).color, bg: getComputedStyle(b).backgroundColor }));
  ok(/255, 255, 255/.test(nextState.color), `floating next button text is white (${nextState.color})`);

  // الاختبار النهائي: زر التصحيح
  await go("test");
  const submit = page.locator("[data-ft-submit]");
  const submitState = await submit.evaluate((b) => ({ color: getComputedStyle(b).color, bg: getComputedStyle(b).backgroundColor }));
  ok(/255, 255, 255/.test(submitState.color), `test submit button text is white (${submitState.color})`);
}

// ---------- تخطيط عمودين على الشاشات الواسعة ----------
{
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.waitForTimeout(200);
  for (const id of ["practice-1", "v3-lab", "be-choose"]) {
    await page.locator(`aside nav button[data-step-nav="${id}"]`).click();
    await page.waitForTimeout(200);
    const info = await page.evaluate(() => {
      const out = [];
      for (const grid of document.querySelectorAll("#l57-main .l57-options")) {
        const cs = getComputedStyle(grid);
        const cols = cs.gridTemplateColumns.split(" ").filter(Boolean).map((v) => Math.round(parseFloat(v)));
        const kids = [...grid.children].map((k) => {
          const r = k.getBoundingClientRect();
          return { w: Math.round(r.width), h: Math.round(r.height), text: k.innerText.trim().slice(0, 18) };
        });
        // صفوف فارغة = عناصر ذات ارتفاع صفري أو أعمدة بلا محتوى
        const empties = kids.filter((k) => k.w < 4 || k.h < 4).length;
        const sameRow = kids.length > 1 && Math.abs(grid.children[0].getBoundingClientRect().top - grid.children[1].getBoundingClientRect().top) < 2;
        out.push({ cols, count: kids.length, empties, sameRow, widths: kids.map((k) => k.w), rows: kids.map((k) => k.h) });
      }
      return out;
    });
    for (const g of info) {
      ok(g.empties === 0, `${id} @1600: no collapsed option cells (${JSON.stringify(g)})`);
      ok(g.widths.every((w) => w >= 120), `${id} @1600: every option cell is wide enough (${JSON.stringify(g.widths)})`);
    }
  }
}

// ---------- رموز الواجهة: لا مربّعات فارغة (tofu) في أي خط ----------
{
  await page.setViewportSize({ width: 1440, height: 1000 });
  const glyphSet = new Set();
  for (const id of stepIds) {
    await page.locator(`aside nav button[data-step-nav="${id}"]`).click();
    await page.waitForTimeout(90);
    const found = await page.evaluate(() => {
      const out = new Set();
      const walk = document.createTreeWalker(document.querySelector("#l57-main") || document.body, NodeFilter.SHOW_TEXT);
      for (let n = walk.nextNode(); n; n = walk.nextNode()) {
        if (!n.parentElement || !n.parentElement.getClientRects().length) continue;
        // الرموز التعبيرية الملوّنة (emoji) تعتمد على خط النظام كما في بقية الموقع،
        // وهذه الفئة لا تُقاس على Canvas (تُختزل عند غياب خط الرموز). نفحص رموز
        // الهوية الأحادية (الفراغات الهندسية والأسهم والعلامات) وهي ما يعتمد عليه التصميم.
        for (const ch of n.textContent) {
          const cp = ch.codePointAt(0);
          if (cp <= 0x2000) continue;
          if ((cp >= 0x1f000 && cp <= 0x1faff) || cp === 0xfe0f || (cp >= 0x2600 && cp <= 0x27bf)) continue;
          out.add(ch);
        }
      }
      return [...out];
    });
    for (const g of found) glyphSet.add(g);
  }
  const glyphs = [...glyphSet];
  const missing = await page.evaluate(async (list) => {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    const render = (ch, font) => {
      c.width = 40;
      c.height = 40;
      ctx.clearRect(0, 0, 40, 40);
      ctx.font = `28px ${font}`;
      ctx.fillStyle = "#000";
      ctx.textBaseline = "middle";
      ctx.fillText(ch, 4, 20);
      const d = ctx.getImageData(0, 0, 40, 40).data;
      let hash = 0;
      for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 0) hash = (hash * 33 + i + d[i + 3] * 7) >>> 0;
      return hash;
    };
    const tofuHash = render("\u{10FFFD}", "serif");
    const fonts = ["serif", "sans-serif", "Voice57Arabic, Tajawal, Rubik, sans-serif", "Voice57Latin, Rubik, sans-serif"];
    return list.filter((g) => fonts.every((f) => render(g, f) === tofuHash));
  }, glyphs);
  ok(glyphs.length >= 12, `collects the interface glyph set (${glyphs.length})`);
  ok(missing.length === 0, `no interface glyph renders as a missing-character box (${missing.join(" ")})`);
  console.log(`glyph coverage: ${glyphs.length} symbols, ${missing.length} missing`);
}

ok(consoleErrors.length === 0, `no console errors (${[...new Set(consoleErrors)].slice(0, 3).join(" | ")})`);
await browser.close();
server.close();

console.log(`Lesson 57 button audit: ${checks - failures.length}/${checks} checks passed`);
console.log(`measured: ${totals.buttons} button states across ${stepIds.length} steps × 3 viewports`);
console.log(`lowest enabled contrast: ${totals.worst.contrast} — ${totals.worst.where || "n/a"}`);
if (failures.length) {
  console.error(`\n${failures.length} failures:`);
  console.error(failures.slice(0, 40).join("\n"));
  process.exitCode = 1;
}
