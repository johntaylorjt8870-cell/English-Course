// ============================================================
// Regression tests for the corrected BIDI oracle rules (C1–C5) and the
// Chromium visual contracts that justify each correction.
//
// The 24 findings classified in docs/audits/bidi-open-classification.json were
// oracle misattributions, not rendering defects. This file proves both halves:
//
//   Phase A  Detection power retained. Every one of the 24 findings that were
//            repaired in source (immutable pre-repair DOM in
//            docs/audits/bidi-scenes-before.json.gz) must STILL be flagged by
//            the corrected oracle, and every one of the 24 misattributions must
//            no longer be flagged. If a rule is widened into a blanket waiver,
//            the repaired negative controls fail here.
//   Phase B  Rule-level controls. Each corrected rule gets a minimal must-flag
//            and must-not-flag fixture, so the rule cannot be reverted or
//            broadened silently.
//   Phase C  Visual evidence. Chromium + production CSS re-measures each
//            resolved case and asserts the contract that makes the corrected
//            reading order correct on screen.
//
// Requires `npm run build` (production CSS) and
// docs/audits/bidi-scene-geometry-after.json (from scripts/audit-bidi-scenes.mjs).
//
//   node scripts/test-bidi-oracle-corrections.mjs
//   node scripts/test-bidi-oracle-corrections.mjs --no-browser
// ============================================================
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { analyzeHtml } from "./lib/bidi-sim.mjs";

const CLASSIFICATION = "docs/audits/bidi-open-classification.json";
const SCENES = "docs/audits/bidi-scenes-before.json.gz";
const OUT = "docs/audits/bidi-oracle-corrections.json";
// Same case id scripts/measure-bidi-scenes.mjs derives, so this test is
// self-contained and does not depend on a report it is itself feeding.
const caseId = (s) => createHash("sha256").update(JSON.stringify([s.lesson, s.kind, s.latin, s.arabic])).digest("hex").slice(0, 16);
const WIDTHS = [1180, 390];

const classification = JSON.parse(readFileSync(CLASSIFICATION, "utf8"));
const scenes = JSON.parse(gunzipSync(readFileSync(SCENES)).toString());
const openItems = classification.items;
const openIds = new Set(openItems.map((i) => i.id));
assert.equal(openItems.length, 24, "the original 24 case records must be retained");

// Map each scene fixture to its case id.
const byScene = new Map(scenes.map((s) => [caseId(s), s]));
assert.equal(byScene.size, scenes.length, "every scene fixture must map to a distinct case id");
const repairedIds = new Set([...byScene.keys()].filter((id) => !openIds.has(id)));

const norm = (t) => (t || "").replace(/\s+/g, "");
const flaggedBy = (html, latin, arabic) =>
  analyzeHtml(html).some((r) => r.violations.some((v) => norm(v.latin) === norm(latin) && norm(v.arabic) === norm(arabic)));
const elementOf = (scene) => `<div dir="rtl">${scene.element}</div>`;

let checks = 0;
const failures = [];
function ok(cond, msg) {
  checks++;
  if (!cond) { failures.push(msg); console.error(`✕ ${msg}`); }
}

// ============================================================
// Phase A — detection power retained on the immutable pre-repair DOM
// ============================================================
console.log("Phase A: oracle detection on the immutable pre-repair fixtures");
const phaseA = { stillFlagged: [], noLongerFlagged: [] };
for (const [id, scene] of byScene) {
  const flagged = flaggedBy(elementOf(scene), scene.latin, scene.arabic);
  if (openIds.has(id)) {
    ok(!flagged, `C-case ${id} (L${scene.lesson}) no longer flagged: ${JSON.stringify(scene.latin)} / ${JSON.stringify(scene.arabic)}`);
    if (!flagged) phaseA.noLongerFlagged.push(id);
  } else {
    ok(flagged, `repaired negative control ${id} (L${scene.lesson}) STILL flagged: ${JSON.stringify(scene.latin)} / ${JSON.stringify(scene.arabic)}`);
    if (flagged) phaseA.stillFlagged.push(id);
  }
}
assert.equal(repairedIds.size, 24, "expected 24 source-repaired records among the 48 scene fixtures");
ok(phaseA.stillFlagged.length === 24, `all 24 source-repaired defects still detected (got ${phaseA.stillFlagged.length})`);
ok(phaseA.noLongerFlagged.length === 24, `all 24 oracle misattributions cleared (got ${phaseA.noLongerFlagged.length})`);

// ============================================================
// Phase B — rule-level controls (must-flag / must-not-flag)
// ============================================================
console.log("Phase B: rule-level controls");
const en = (t) => `<span dir="ltr" class="font-en">${t}</span>`;
const pairRow = (a, b) => `<div dir="rtl"><div class="flex flex-wrap items-center gap-2">${a}${b}</div></div>`;
const para = (t) => `<div dir="rtl"><p>${t}</p></div>`;
const phaseB = [];
// Each control states exactly what the oracle must report. `latin` pins the run
// attribution, so a rule that is widened into a blanket waiver (or reverted)
// fails here rather than silently changing what is measured.
function rule(name, controls) {
  const detail = [];
  for (const c of controls) {
    const viol = analyzeHtml(c.html).flatMap((r) => r.violations);
    if (c.expect === "clean") {
      ok(viol.length === 0, `${name}: not flagged — ${c.why} (got ${JSON.stringify(viol)})`);
    } else {
      ok(viol.length >= 1, `${name}: still flagged — ${c.why}`);
      if (c.latin !== undefined) ok(viol.some((v) => v.latin === c.latin), `${name}: Latin run attributed as ${JSON.stringify(c.latin)} — ${c.why} (got ${JSON.stringify(viol.map((v) => v.latin))})`);
    }
    detail.push({ why: c.why, expect: c.expect, latin: c.latin ?? null, flagged: viol.length >= 1, reported: viol.map((v) => ({ latin: v.latin, arabic: v.arabic })) });
  }
  phaseB.push({ rule: name, controls: detail });
}

// R1 — a Latin run starts at a Latin letter/digit or at a suffix mark attached
// to one. Sentence punctuation and expression operators that precede the token
// belong to the surrounding RTL context (mirrors tryPair in src/shared/bidi.tsx).
// Detection is retained: the reversed pair is still flagged, only the run
// boundary moves.
rule("R1 latin-run start (C1: sentence period is not part of the English run)", [
  { html: para(`لاحظ أن تغييرًا صغيرًا جدًا غيّر معنى الجملة. ${en("plays")} → <span dir="rtl">عادة</span>`), why: "reversed pair still detected, and the period of the preceding Arabic sentence is no longer glued to «plays»", expect: "flag", latin: "plays" },
  { html: para(`${en("plays")} → <span dir="rtl">عادة</span>`), why: "the same pair without a preceding sentence is unchanged", expect: "flag", latin: "plays" },
]);
rule("R1 latin-run start (C1: expression operator is not part of the English run)", [
  { html: para(`حرف ساكن ${en("+ y")} — <span dir="rtl">نحوّل</span>`), why: "«+» joins the Arabic operand to y; the measured run is «y»", expect: "flag", latin: "y" },
  { html: para(`اسم ${en("+ 's")} ← <span dir="rtl">صفة ملكية</span>`), why: "«+» is the operator; the measured run is the suffix «'s»", expect: "flag", latin: "'s" },
]);
rule("R1 latin-run start (C1: attached suffix hyphen stays inside the token)", [
  { html: para(`الأفعال ${en("-ed")} → <span dir="rtl">اضغط أي فعل لترى القاعدة</span>`), why: "a leading hyphen attached to a letter is part of the English token, not preceding punctuation", expect: "flag", latin: "-ed" },
  { html: para(`صيغة ${en("-ING")} → <span dir="rtl">اضغط</span>`), why: "same for -ING", expect: "flag", latin: "-ING" },
]);

// R2 — the character a pair separator attaches to must be Latin. Arabic script
// (including ؟ U+061F) belongs to the RTL flow.
rule("R2 separator must attach to a Latin run (C4: Arabic ؟ before the dash)", [
  { html: para(`${en("Continuous")} — <span dir="rtl">اختر ثم اشرح السبب</span>`), why: "an English run before the dash is still checked", expect: "flag", latin: "Continuous" },
  { html: para(`<span dir="ltr" class="ltr-pair">${en("Present Simple")} <span dir="rtl">أم</span> ${en("Continuous")}<span dir="rtl">؟</span></span> — <span dir="rtl">اختر ثم اشرح السبب</span>`), why: "؟ closes the alternatives group, so what precedes the dash is Arabic punctuation, not an English run", expect: "clean" },
]);

// R3 — an Arabic run that is itself a label («label: English value») is a clause
// of its own, not the gloss of the Latin run across the dash. Sentence
// terminators do not trigger the rule.
rule("R3 label clause (C5: «النفي: don't — السؤال: Do...?»)", [
  { html: para(`${en("don't")} — <span dir="rtl">النفي</span>`), why: "a real «English — Arabic» gloss is still checked", expect: "flag", latin: "don't" },
  { html: para(`النفي: ${en("don't")} — السؤال: ${en("Do...?")}`), why: "السؤال is a label with its own value Do...?, so don't is not its gloss", expect: "clean" },
]);
rule("R3 label clause does not swallow a pair that follows a sentence period", [
  { html: para(`ملكية مرتبطة بالاسم. ${en("their")} = <span dir="rtl">صفة ملكية مرتبطة بالضمير</span>.`), why: "a period closes a clause; «their = صفة ملكية…» is still measured as a pair", expect: "flag", latin: "their" },
]);

// R4 — a native <select> contributes only its selected <option>.
rule("R4 native select (C2: hidden options are not rendered text)", [
  { html: para(`${en("Article")} · <span dir="rtl">الأداة</span>`), why: "mixed text that really is on screen is still checked", expect: "flag" },
  { html: `<div dir="rtl"><select><option value="">اختر…</option><option value="s" dir="ltr">Subject · الفاعل</option><option value="be">Verb to be</option><option value="art" dir="ltr">Article · الأداة</option><option value="noun" dir="ltr">Noun · الاسم</option></select></div>`, why: "only «اختر…» is displayed; the concatenation «Verb to beArticle» never exists on screen", expect: "clean" },
  { html: `<div dir="rtl"><select><option value="">اختر…</option><option value="art" dir="ltr" selected>Article · الأداة</option></select></div>`, why: "when the dir=ltr option really is selected, its own LTR isolate orders «Article · الأداة» correctly", expect: "clean" },
  { html: `<div dir="rtl"><select><option value="">اختر…</option><option selected>Article · الأداة</option></select></div>`, why: "the selected option is still measured: without dir=ltr it renders reversed", expect: "flag" },
]);

// R5 — a row that repeats one chip template is a list of independent tags.
rule("R5 independent tag list (C3)", [
  { html: pairRow(en("on"), `<span class="text-base font-bold">تخبرنا بالعلاقة بين: ${en("book")} و ${en("table")}.</span>`), why: "a two-child label/gloss row is still checked", expect: "flag" },
  { html: `<div dir="rtl"><div class="flex flex-wrap justify-center gap-2">${["العادات", "s / es / ies", "do / does", "النفي", "السؤال", "every day"].map((t) => `<span class="rounded-full bg-indigo-50 px-4 py-1.5">${t}</span>`).join("")}</div></div>`, why: "six chips of one template are independent topics, not pairs", expect: "clean" },
]);

// R6 — an English token inside an Arabic sentence flow reads RTL.
rule("R6 Arabic sentence flow (C4: connective sibling)", [
  { html: pairRow(`<span class="rounded-xl px-3 py-1.5">${en("when")}</span>`, `<span class="text-sm font-bold">غالبًا نستخدمه لإدخال حدث وقع أثناء فعل آخر.</span>`), why: "a real gloss sibling is still checked", expect: "flag" },
  { html: pairRow(en("some rice"), `<span class="text-sm font-bold">وليس:</span>`), why: "«وليس:» continues the contrast sentence", expect: "clean" },
]);
rule("R6 Arabic sentence flow (C4: interrogative tail)", [
  { html: pairRow(en("between"), `<span class="text-sm font-bold">بين شيئين</span>`), why: "a plain gloss sibling is still checked", expect: "flag" },
  { html: pairRow(en("this"), `<span class="text-sm font-bold">في السؤال الأول؟</span>`), why: "the token sits inside an Arabic question", expect: "clean" },
]);
rule("R6 Arabic sentence flow (C4: Arabic-led sibling)", [
  { html: pairRow(en("Possessive Nouns"), `<span class="text-sm font-bold">ملكية الاسم</span>`), why: "an English tag with an Arabic gloss is still checked", expect: "flag" },
  { html: pairRow(`<span class="text-lg font-black">بعض ${en("F / FE → VES")}</span>`, `<span class="text-xs font-bold">مع وجود استثناءات.</span>`), why: "the first item is Arabic-led, not an English tag", expect: "clean" },
]);

// ============================================================
// Phase C — Chromium visual contracts for the 24 resolved cases
// ============================================================
// Per-case needles and the contract that makes the corrected reading correct.
// lead  = the character the oracle used to glue onto the English run (C1)
// en    = the English run actually rendered
// ar    = the Arabic side
const CONTRACTS = {
  // C1 — neutral attribution
  "1f1841687ac3c5ed": { cls: "C1", kind: "lead-outside-en", lead: ".", en: "plays", ar: "عادة" },
  "562538031bc27572": { cls: "C1", kind: "lead-outside-en", lead: ".", en: "book", ar: "الاسم" },
  "f9237450d963f0c6": { cls: "C1", kind: "lead-outside-en", lead: ".", en: "their", ar: "صفة ملكية" },
  "db0737a7ecea1a9a": { cls: "C1", kind: "lead-outside-en", lead: ".", en: "few", ar: "عدد قليل" },
  "d77b545c7e96f088": { cls: "C1", kind: "lead-outside-en", lead: ".", en: "little", ar: "كمية صغيرة" },
  "5d2600af3fc51a3a": { cls: "C1", kind: "lead-outside-en", lead: "+", en: "y", ar: "نحوّل", single: true },
  "4eb0b06b0eb57373": { cls: "C1", kind: "lead-outside-en", lead: "+", en: "'s", ar: "صفة ملكية" },
  // C4 — Arabic connective / contrast flow inside one RTL sentence
  "831dc6b412dd91e2": { cls: "C4", kind: "alts-group-then-instruction", en: "Continuous", tail: "؟", ar: "اختر ثم اشرح السبب", hiddenAtNarrow: true },
  "b54105dc01804489": { cls: "C4", kind: "rtl-row-flow", en: "F / FE → VES", ar: "مع وجود استثناءات", arabicLead: "بعض" },
  "60de322313989b5f": { cls: "C4", kind: "rtl-row-flow", en: "this", ar: "في السؤال الأول" },
  "021f190787ad1406": { cls: "C4", kind: "rtl-row-flow", en: "that", ar: "في السؤال الثاني" },
  "0331e606d113e795": { cls: "C4", kind: "rtl-row-flow", en: "these", ar: "مع notebooks" },
  "54248a7bcad27bbd": { cls: "C4", kind: "rtl-row-flow", en: "those", ar: "مع bicycles" },
  "1dce6f6e34d28783": { cls: "C4", kind: "rtl-row-flow", en: "my new camera", ar: "و", single: true },
  "773a481a0b1af9c6": { cls: "C4", kind: "rtl-row-flow", en: "children's bicycles", ar: "ولم نقل" },
  "18a83403b0994ab2": { cls: "C4", kind: "rtl-row-flow", en: "Adjectives", ar: "وحتى الجمل الأطول" },
  "99286d6e998604cf": { cls: "C4", kind: "rtl-row-flow", en: "pieces", ar: "وليس information نفسها" },
  "0d4d768034b4d07e": { cls: "C4", kind: "rtl-row-flow", en: "some rice", ar: "وليس" },
  "63dd1e6803e58088": { cls: "C4", kind: "rtl-row-flow", en: "Past Continuous", ar: "لكن" },
  "5115d4dba8ae89f4": { cls: "C4", kind: "rtl-row-flow", en: "was/were + ing", ar: "و", single: true },
  // C3 — independent tag lists
  "079db2a35ac08a74": { cls: "C3", kind: "rtl-row-flow", en: "do / does", ar: "النفي", minSameTemplate: 3 },
  "ad2b68b306713fc6": { cls: "C3", kind: "rtl-row-flow", en: "some / any", ar: "الأسماء المعدودة وغير المعدودة", minSameTemplate: 3 },
  // C2 — native select
  "96ed9167e8093a85": { cls: "C2", kind: "native-select", displayed: "اختر…", phantom: "Verb to beArticle" },
  // C5 — cross-clause dash
  "915a29c9e3a772cb": { cls: "C5", kind: "clause-association", neg: "النفي", negEn: "don't", q: "السؤال", qEn: "Do...?" },
};
for (const id of openIds) assert(CONTRACTS[id], `missing visual contract for ${id}`);
// Which corrected rule discharges each contract kind. C3 lists are excluded by
// R5 alone: «النفي» / «الأسماء المعدودة وغير المعدودة» begin with no connective.
const RULES_FOR = {
  "lead-outside-en": ["R1"],
  "native-select": ["R4"],
  "rtl-row-flow": ["R6"],
  "alts-group-then-instruction": ["R2"],
  "clause-association": ["R3"],
};
// A repeated-chip list is discharged by R5 alone: its Arabic siblings
// («النفي», «الأسماء المعدودة وغير المعدودة») begin with no connective.
const rulesFor = (id) => (CONTRACTS[id].minSameTemplate ? ["R5"] : RULES_FOR[CONTRACTS[id].kind]);

const phaseC = [];
if (!process.argv.includes("--no-browser")) {
  console.log("Phase C: Chromium visual contracts (production CSS)");
  assert(existsSync("dist/assets"), "run `npm run build` first");
  const css = readdirSync("dist/assets").filter((f) => f.endsWith(".css")).map((f) => readFileSync("dist/assets/" + f, "utf8")).join("\n");
  const { browser } = await import("./lib/browser.mjs");
  const b = await browser();
  try {
    const page = await b.newPage();
    const measure = async (html, needles, width) => {
      await page.setViewportSize({ width, height: 900 });
      await page.setContent(`<style>${css}\n*,*::before,*::after{animation:none!important;transition:none!important}.pop{opacity:1!important;transform:none!important}</style>${html}`);
      return page.evaluate((needles) => {
        const host = document.querySelector("[data-probe]") || document.body;
        const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
        let node; const chars = [];
        while ((node = walker.nextNode())) for (let i = 0; i < node.length; i++) {
          const r = new Range(); r.setStart(node, i); r.setEnd(node, i + 1); const box = r.getBoundingClientRect();
          chars.push({ c: node.data[i], x: box.x, y: box.y, w: box.width, h: box.height });
        }
        const laid = chars.filter((c) => c.w > 0 && c.h > 0);
        // Whitespace carries no glyph box of its own here, so the searchable
        // string and the char array must both exclude it.
        const glyphs = laid.filter((c) => !/\s/.test(c.c));
        const text = glyphs.map((c) => c.c).join("");
        const out = {};
        for (const [name, needle] of Object.entries(needles)) {
          const n = needle.replace(/\s/g, "");
          const at = text.indexOf(n);
          out[name] = at < 0 ? null : { text: needle, chars: glyphs.slice(at, at + n.length) };
        }
        return { laidOutChars: laid.length, totalChars: chars.length, direction: getComputedStyle(host).direction, out };
      }, needles);
    };
    const xs = (m) => m.chars.map((c) => c.x);
    const lineOf = (m) => m.chars[0].y + m.chars[0].h / 2;
    const sameLine = (a, b2) => Math.min(a.chars[0].y + a.chars[0].h, b2.chars[0].y + b2.chars[0].h) > Math.max(a.chars[0].y, b2.chars[0].y);
    // Only letters/digits prove a run's direction: trailing neutral punctuation
    // is mirrored by the UBA («Do...?» parks its ? on the far side), which is
    // correct rendering, not a reversal of the run.
    const contiguousLtr = (m) => {
      const cs = m.chars.filter((c) => /[A-Za-z0-9]/.test(c.c));
      return cs.length > 0 && cs.every((c, i) => i === 0 || c.x > cs[i - 1].x);
    };
    const box = (m) => [Math.min(...m.chars.map((c) => c.x)), Math.max(...m.chars.map((c) => c.x))];
    const gap = (a, b) => Math.max(0, Math.max(box(a)[0], box(b)[0]) - Math.min(box(a)[1], box(b)[1]));

    for (const item of openItems) {
      const c = CONTRACTS[item.id];
      const scene = byScene.get(item.id);
      assert(scene, `scene fixture missing for ${item.id}`);
      const record = { id: item.id, lesson: item.lesson, class: c.cls, kind: c.kind, widths: {} };

      if (c.kind === "native-select") {
        await page.setViewportSize({ width: 1180, height: 900 });
        await page.setContent(`<div dir="rtl" data-probe>${scene.element}</div>`);
        const probe = await page.evaluate(() => {
          const s = document.querySelector("select");
          const rect = s.getBoundingClientRect();
          const walker = document.createTreeWalker(s, NodeFilter.SHOW_TEXT);
          let n; const chars = [];
          while ((n = walker.nextNode())) for (let i = 0; i < n.length; i++) { const r = new Range(); r.setStart(n, i); r.setEnd(n, i + 1); const bx = r.getBoundingClientRect(); chars.push({ w: bx.width, h: bx.height }); }
          const shown = s.options[s.selectedIndex];
          return { options: s.options.length, selectedIndex: s.selectedIndex, displayed: shown.textContent, displayedLatin: /[A-Za-z]/.test(shown.textContent), concatenated: s.textContent.replace(/\s+/g, " "), box: { w: rect.width, h: rect.height }, laidOutOptionChars: chars.filter((x) => x.w > 0 && x.h > 0).length, totalOptionChars: chars.length };
        });
        ok(probe.selectedIndex === 0 && probe.displayed === c.displayed, `${item.id}: the select displays only the selected option ${JSON.stringify(probe.displayed)}`);
        ok(!probe.displayedLatin, `${item.id}: the displayed value contains no Latin letters, so no mixed pair exists on screen`);
        ok(probe.box.w > 0 && probe.box.h > 0, `${item.id}: the select box itself is laid out (${Math.round(probe.box.w)}×${Math.round(probe.box.h)})`);
        ok(probe.laidOutOptionChars === 0 && probe.totalOptionChars > 0, `${item.id}: no option glyph range is laid out (${probe.laidOutOptionChars}/${probe.totalOptionChars}) — char geometry is not evidence here; selectedIndex is`);
        ok(probe.concatenated.includes("Verb to be") && probe.concatenated.includes("Article"), `${item.id}: the phantom string the old oracle measured is a textContent concatenation of mutually exclusive options`);
        // State change: selecting a Latin option must display that option alone.
        const changed = await page.evaluate(() => {
          const s = document.querySelector("select"); s.selectedIndex = 3;
          return { displayed: s.options[s.selectedIndex].textContent, value: s.value };
        });
        ok(changed.displayed === "Article · الأداة", `${item.id}: after a selection the display is exactly one option (${JSON.stringify(changed.displayed)}), never a concatenation`);
        record.probe = probe;
        record.selectionChange = changed;
        phaseC.push(record);
        continue;
      }

      for (const width of WIDTHS) {
        const needles = {};
        if (c.kind === "lead-outside-en") { Object.assign(needles, { lead: c.lead, en: c.en, ar: c.ar }); }
        if (c.kind === "rtl-row-flow") { Object.assign(needles, { en: c.en, ar: c.ar }); if (c.arabicLead) needles.lead = c.arabicLead; }
        if (c.kind === "alts-group-then-instruction") { Object.assign(needles, { en: c.en, tail: c.tail, ar: c.ar }); }
        if (c.kind === "clause-association") { Object.assign(needles, { neg: c.neg, negEn: c.negEn, q: c.q, qEn: c.qEn }); }
        const m = await measure(`<div dir="rtl" data-probe>${scene.element}</div>`, needles, width);
        const got = m.out;
        const rec = { width, direction: m.direction, laidOutChars: m.laidOutChars, totalChars: m.totalChars };

        if (m.laidOutChars === 0) {
          // The rail is display:none below the desktop breakpoint: no mobile claim.
          ok(!!c.hiddenAtNarrow, `${item.id}@${width}: element is not laid out, which is only acceptable for the hidden rail`);
          rec.skipped = "element not rendered at this width (hidden rail); no visual claim made";
          record.widths[width] = rec;
          continue;
        }
        for (const [k, v] of Object.entries(got)) ok(!!v, `${item.id}@${width}: needle ${JSON.stringify(k)} found in the laid-out text`);
        if (Object.values(got).some((v) => !v)) {
          rec.skipped = `missing needle(s): ${Object.entries(got).filter(([, v]) => !v).map(([k]) => k).join(", ")}`;
          record.widths[width] = rec;
          continue;
        }

        if (c.kind === "lead-outside-en") {
          ok(contiguousLtr(got.en), `${item.id}@${width}: the English run ${JSON.stringify(c.en)} is one contiguous LTR run`);
          // The claim is that the character is NOT a prefix of the English run
          // (which is what the old oracle assumed). Where the paragraph wrapped,
          // the character is on another line and no x comparison is meaningful.
          const prefixed = sameLine(got.lead, got.en) && Math.min(...xs(got.lead)) < Math.min(...xs(got.en));
          ok(!prefixed, `${item.id}@${width}: ${JSON.stringify(c.lead)} is not rendered as a prefix of ${JSON.stringify(c.en)} — it stays in the RTL context (lead x=${Math.round(Math.min(...xs(got.lead)))}, en x=${Math.round(Math.min(...xs(got.en)))}–${Math.round(Math.max(...xs(got.en)))}, lead y=${Math.round(lineOf(got.lead))}, en y=${Math.round(lineOf(got.en))})`);
          if (sameLine(got.en, got.ar)) ok(Math.max(...xs(got.en)) < Math.min(...xs(got.ar)), `${item.id}@${width}: English is left of its Arabic gloss on the same line`);
          else ok(lineOf(got.en) < lineOf(got.ar), `${item.id}@${width}: English is on an earlier line than its Arabic gloss`);
          rec.en = { x: xs(got.en).map(Math.round), y: Math.round(lineOf(got.en)) };
          rec.lead = { x: xs(got.lead).map(Math.round), y: Math.round(lineOf(got.lead)) };
          rec.ar = { x: xs(got.ar).map(Math.round), y: Math.round(lineOf(got.ar)) };
          rec.sameLine = sameLine(got.en, got.ar);
          rec.leadSameLineAsEn = sameLine(got.lead, got.en);
        }

        if (c.kind === "rtl-row-flow") {
          ok(contiguousLtr(got.en), `${item.id}@${width}: the English item ${JSON.stringify(c.en)} is one contiguous LTR run`);
          ok(m.direction === "rtl", `${item.id}@${width}: the row's computed direction is rtl, so logical child order reads right-to-left`);
          if (sameLine(got.en, got.ar)) {
            ok(Math.min(...xs(got.en)) > Math.max(...xs(got.ar)), `${item.id}@${width}: RTL row order — the English item is read first (right of the Arabic continuation)`);
            rec.sameLine = true;
          } else {
            ok(lineOf(got.en) < lineOf(got.ar), `${item.id}@${width}: the row wrapped; the English item keeps its logical position on the earlier line`);
            rec.sameLine = false;
          }
          if (c.arabicLead) ok(Math.max(...xs(got.lead)) > Math.max(...xs(got.en)), `${item.id}@${width}: the Arabic lead ${JSON.stringify(c.arabicLead)} is rightmost, confirming the item is Arabic-led`);
          if (c.minSameTemplate) {
            const templates = await page.evaluate(() => {
              const host = document.querySelector("[data-probe]");
              const rows = [...host.querySelectorAll("div")].filter((d) => /(^|\s)(flex|inline-flex)(\s|$)/.test(d.className) && !/(^|\s)flex-col(\s|$)/.test(d.className));
              const sig = (el) => el.tagName.toLowerCase() + "." + String(el.className || "").split(" ").slice(0, 3).join(".");
              return rows.map((r) => { const kids = [...r.children]; const counts = {}; for (const k of kids) counts[sig(k)] = (counts[sig(k)] || 0) + 1; return Math.max(0, ...Object.values(counts)); });
            });
            ok(Math.max(0, ...templates) >= c.minSameTemplate, `${item.id}@${width}: the row repeats one chip template ${Math.max(0, ...templates)}× (≥${c.minSameTemplate}) — independent tags, not a pair`);
            rec.sameTemplateCount = Math.max(0, ...templates);
          }
          rec.en = { x: xs(got.en).map(Math.round), y: Math.round(lineOf(got.en)) };
          rec.ar = { x: xs(got.ar).map(Math.round), y: Math.round(lineOf(got.ar)) };
        }

        if (c.kind === "alts-group-then-instruction") {
          ok(contiguousLtr(got.en), `${item.id}@${width}: ${JSON.stringify(c.en)} is one contiguous LTR run`);
          ok(sameLine(got.tail, got.ar) && Math.min(...xs(got.tail)) > Math.max(...xs(got.ar)), `${item.id}@${width}: ؟ stays at the right edge of the alternatives group, ahead of the Arabic instruction in RTL order`);
          ok(lineOf(got.en) <= lineOf(got.tail), `${item.id}@${width}: the alternatives group precedes the instruction`);
          rec.en = { x: xs(got.en).map(Math.round), y: Math.round(lineOf(got.en)) };
          rec.tail = { x: xs(got.tail).map(Math.round), y: Math.round(lineOf(got.tail)) };
          rec.ar = { x: xs(got.ar).map(Math.round), y: Math.round(lineOf(got.ar)) };
        }

        if (c.kind === "clause-association") {
          const { neg, negEn, q, qEn } = got;
          ok(contiguousLtr(negEn) && contiguousLtr(qEn), `${item.id}@${width}: both English markers are contiguous LTR runs`);
          // Reading right-to-left the caption must be: النفي → don't → السؤال → Do...?
          ok(Math.min(...xs(neg)) > Math.max(...xs(negEn)), `${item.id}@${width}: النفي is right of don't (RTL label then value)`);
          ok(Math.min(...xs(negEn)) > Math.max(...xs(q)), `${item.id}@${width}: don't is right of السؤال (clause order preserved)`);
          ok(Math.min(...xs(q)) > Math.max(...xs(qEn)), `${item.id}@${width}: السؤال is right of Do...? (RTL label then value)`);
          // Each marker stays with its OWN label: the association is not regrouped.
          ok(gap(neg, negEn) < gap(q, negEn), `${item.id}@${width}: don't stays adjacent to النفي (${gap(neg, negEn)}px) rather than to السؤال (${gap(q, negEn)}px)`);
          ok(gap(q, qEn) < gap(negEn, qEn), `${item.id}@${width}: Do...? stays adjacent to السؤال (${gap(q, qEn)}px) rather than beside don't (${gap(negEn, qEn)}px)`);
          rec.neg = xs(neg).map(Math.round); rec.negEn = xs(negEn).map(Math.round); rec.q = xs(q).map(Math.round); rec.qEn = xs(qEn).map(Math.round);
          rec.gaps = { dontToNeg: gap(neg, negEn), dontToQuestion: gap(q, negEn), doToQuestion: gap(q, qEn), doToDont: gap(negEn, qEn) };
        }
        record.widths[width] = rec;
      }
      phaseC.push(record);
    }
  } finally { await b.close(); }
} else {
  console.log("Phase C: skipped (--no-browser)");
}

// ============================================================
const ruleIndex = {};
for (const item of openItems) {
  const c = CONTRACTS[item.id];
  (ruleIndex[c.cls] ??= []).push({ id: item.id, lesson: item.lesson, latin: item.latin, arabic: item.arabic, originalClass: item.classId, contract: c.kind, rules: rulesFor(item.id), sourceChanged: false, visualEvidence: phaseC.find((p) => p.id === item.id) ?? "not measured in this run" });
}
const report = {
  base: classification.base,
  oracle: "scripts/lib/bidi-sim.mjs",
  scope: "Regression proof for the six corrected oracle rules and the Chromium visual contract of each of the 24 previously-open findings. The 24 original case records are retained with their original classification.",
  rules: [
    { id: "R1", fixes: "C1-neutral-attribution", statement: "A Latin run starts at a Latin letter/digit or at a suffix/quote mark attached to one; a preceding sentence period or expression operator belongs to the RTL context. Mirrors tryPair in src/shared/bidi.tsx.", cases: ruleIndex.C1?.length ?? 0 },
    { id: "R2", fixes: "C4 (Arabic punctuation before the separator)", statement: "The character a pair separator attaches to must not be Arabic script (؟ U+061F closes an alternatives group).", cases: 1 },
    { id: "R3", fixes: "C5-cross-clause-dash", statement: "An Arabic run followed by a label separator (: = – —) and a Latin run is a clause label with its own value, not the gloss of the Latin run across the dash. Sentence terminators (. ! ؟) do not trigger it.", cases: ruleIndex.C5?.length ?? 0 },
    { id: "R4", fixes: "C2-native-select-hidden-options", statement: "A native <select> contributes only its selected <option>; unselected options are not rendered text.", cases: ruleIndex.C2?.length ?? 0 },
    { id: "R5", fixes: "C3-independent-tags", statement: "A flex row repeating one chip template three or more times is a list of independent tags, not a set of label/gloss pairs.", cases: ruleIndex.C3?.length ?? 0 },
    { id: "R6", fixes: "C4-arabic-connective-flow", statement: "An English row sibling followed by an Arabic continuation (leading connective particle, interrogative tail, or an Arabic-led sibling) is inside an RTL sentence; its right-to-left row order is the correct reading order.", cases: (ruleIndex.C4?.length ?? 0) + (ruleIndex.C3?.length ?? 0) },
  ],
  detectionRetained: { sourceRepairedFixturesStillFlagged: phaseA.stillFlagged.length, expected: 24, ids: phaseA.stillFlagged },
  misattributionsCleared: { count: phaseA.noLongerFlagged.length, expected: 24, ids: phaseA.noLongerFlagged },
  ruleControls: phaseB,
  resolved: ruleIndex,
  checks,
  failures,
};
// --no-browser measures no visual contracts; writing then would strip the
// committed Chromium evidence from the artifact, so it is left untouched.
if (!process.argv.includes("--no-browser")) writeFileSync(OUT, JSON.stringify(report, null, 2) + "\n");
else console.log(`${OUT} not rewritten: --no-browser carries no visual evidence to record`);
console.log(JSON.stringify({ checks, failures: failures.length, sourceRepairedStillFlagged: phaseA.stillFlagged.length, misattributionsCleared: phaseA.noLongerFlagged.length, visualContracts: phaseC.length }));
assert.equal(failures.length, 0, `${failures.length} oracle-correction regression failures`);
console.log("BIDI oracle-correction regressions passed");
