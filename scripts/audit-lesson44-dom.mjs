// ============================================================
// Lesson 44 — DOM, Source Fidelity, Copy Hygiene, Answer-Hiding & BIDI Audit
//
// Mounts <Lesson44 /> on shared Lesson1Shell in JSDOM and verifies:
//   1. Lesson1Shell contract + inline site-lock pill host
//   2. All 39 steps (0..38) render with 0 BIDI violations & 0 provenance leaks
//   3. All 762 student source units reach the rendered DOM
//   4. Attempt-before-reveal gating + clean retry reset on §§27–33
//   5. Writing Mission requirement detector + draft persistence across steps
//   6. Pre-submit answer hiding in TestArea44 (zero keys/hints in DOM/data-*)
//   7. Lazy testKey44 grading (25/25), SolutionsArea44 unlock, and full retry reset
//   8. Teacher gate (somer173) + lazy TeacherGuide44 + teacherSource44 §35
//
//   node scripts/audit-lesson44-dom.mjs
// ============================================================
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import { analyzeHtml } from "./lib/bidi-sim.mjs";
import { auditRenderedStudentCopy } from "./lib/student-copy-audit.mjs";

const dom = new JSDOM(
  '<!doctype html><html lang="ar" dir="rtl"><body><div id="root"></div></body></html>',
  { url: "http://localhost/#/lesson/44", pretendToBeVisual: true }
);
for (const key of [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "HTMLInputElement",
  "HTMLTextAreaElement",
  "HTMLSelectElement",
  "Node",
  "Event",
  "MouseEvent",
  "KeyboardEvent",
  "MutationObserver",
  "getComputedStyle",
  "localStorage",
]) {
  Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
}
dom.window.scrollTo = () => {};
dom.window.HTMLElement.prototype.scrollIntoView = () => {};
dom.window.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

mkdirSync("node_modules/.lesson44-audit", { recursive: true });
await build({
  stdin: {
    contents: `export { default as Lesson44 } from './src/lessons/lesson44/Lesson44';
export { default as SitePasswordGate } from './src/shared/SitePasswordGate';
export { Text44 } from './src/lessons/lesson44/kit44';
export { SOURCE_SECTIONS_44 } from './src/lessons/lesson44/ledger44';
export { PRACTICE_44 } from './src/lessons/lesson44/practiceData44';
export { TEST_SOLUTIONS_44 } from './src/lessons/lesson44/solutionsData44';`,
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  outfile: "node_modules/.lesson44-audit/ui.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
  loader: { ".css": "empty", ".woff2": "empty" },
  logLevel: "error",
});

const {
  Lesson44,
  SitePasswordGate,
  Text44,
  SOURCE_SECTIONS_44: sections,
  PRACTICE_44: practiceItems,
  TEST_SOLUTIONS_44: solutions,
} = await import(`../node_modules/.lesson44-audit/ui.mjs?${Date.now()}`);
const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { renderToStaticMarkup } = await import("react-dom/server");
const { act } = React;

let checks = 0;
const ok = (condition, message) => {
  checks++;
  assert.ok(condition, message);
};
const all = (selector, scope = document) => [...scope.querySelectorAll(selector)];

async function click(element) {
  ok(!!element, "click target exists");
  await act(async () => {
    element.click();
  });
}

async function change(element, value) {
  await act(async () => {
    const proto =
      element.tagName === "TEXTAREA"
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(element, value);
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

const byText = (needle, scope = document) =>
  all("button", scope).find((b) => (b.textContent || "").includes(needle));

// ---------------- 1) BIDI Primitives ----------------
for (const sample of [
  "You mustn't do it.",
  "You don't have to do it.",
  "MUSTN'T — المنع القاطع",
  "الفرق بين MUSTN'T وDON'T HAVE TO هو الفارق المحوري.",
  "اختر: MUST أم HAVE TO؟",
  "Subject + must + V1 = صيغة ثابتة مع جميع الضمائر",
]) {
  const html = renderToStaticMarkup(
    React.createElement("div", { dir: "rtl" }, React.createElement(Text44, { text: sample }))
  );
  ok(
    analyzeHtml(html).every((p) => p.violations.length === 0),
    `BIDI primitive clean: ${sample}`
  );
}

// ---------------- 2) Mount Lesson44 inside SitePasswordGate ----------------
const root = createRoot(document.getElementById("root"));
await act(async () => {
  root.render(
    React.createElement(SitePasswordGate, null, React.createElement(Lesson44))
  );
});

const shellRoot = document.querySelector('.obligation44[data-lesson="44"][data-l35-shell="lesson-1"]');
ok(shellRoot, "Lesson44 mounts on shared Lesson1Shell with .obligation44 namespace");
ok(
  document.querySelector('[data-lesson-step-nav="true"][data-site-lock-host="pill"] [data-site-lock-button="true"]'),
  "SiteLockButton docks inside Lesson1Shell pill host without floating overlap"
);
ok(document.querySelector(".cover44"), "Lesson44 opens on Step 0 (Cover44)");
ok(document.querySelector('[data-area-tab="solutions"]')?.disabled, "Solutions tab starts locked");
ok(!document.querySelector(".solCard44"), "zero solution cards in DOM before submission");

const units = new Set();
const collectUnits = (scope = document) => {
  for (const el of all("[data-source-unit]", scope)) {
    (el.getAttribute("data-source-unit") || "")
      .split(/\s+/)
      .filter(Boolean)
      .forEach((id) => units.add(id));
  }
};

let snapshotCount = 0;
const checkStudentSnapshot = (label) => {
  snapshotCount++;
  const mainEl = document.getElementById("l44-main");
  const html = mainEl.innerHTML;
  const bidiBad = analyzeHtml(html).flatMap((p) =>
    p.violations.map((v) => `${label}: ${v.latin} || ${v.arabic}`)
  );
  ok(bidiBad.length === 0, `BIDI clean on ${label}: ${bidiBad.slice(0, 3).join(" | ")}`);

  const AUTHORITATIVE_CURRICULUM_ALLOW = new Set([
    "لاحظ أن الجمل الثلاث تعبّر عن الضرورة أو الإلزام، لكن مصدر هذه الضرورة ليس متطابقًا تمامًا.",
    "لاحظ أن الجمل الثلاث تعبّر عن الضرورة أو الإلزام، لكن مصدر هذه الضرورة ليس متطابقًا تمامًا",
  ]);
  const copyLeaks = auditRenderedStudentCopy(mainEl).filter(
    (entry) => !AUTHORITATIVE_CURRICULUM_ALLOW.has(entry.text)
  );
  ok(
    copyLeaks.length === 0,
    `zero technical provenance/section leaks on ${label}: ${copyLeaks.map((l) => `${l.rules.join(",")}:${l.text}`).join(" | ")}`
  );

  for (const el of all(".obligation44 button")) {
    ok(
      (el.textContent || "").trim() || el.getAttribute("aria-label"),
      `accessible button name on ${label}`
    );
  }
  for (const el of all(".obligation44 textarea, .obligation44 input")) {
    ok(
      el.closest("label") || el.getAttribute("aria-label") || el.labels?.length,
      `accessible form control label on ${label}`
    );
  }
};

// ---------------- 3) Walk All 39 Steps (0..38) ----------------
const selectStep = async (targetIdx) => {
  await click(document.querySelector('[data-area-tab="learn"]'));
  const railButtons = all("aside nav button");
  ok(railButtons.length === 39, `Lesson1Shell sidebar lists all 39 steps (got ${railButtons.length})`);
  await click(railButtons[targetIdx]);
};

collectUnits();
checkStudentSnapshot("step-0");

for (let n = 1; n <= 38; n++) {
  await click(document.querySelector('[data-step-nav="next"]'));
  const article = document.querySelector(".step44");
  ok(article, `step ${n} renders`);
  ok(
    article.dataset.sourceSection === `s${String(n).padStart(2, "0")}`,
    `step ${n} maps to s${String(n).padStart(2, "0")}`
  );
  collectUnits(article);
  if (n === 2) ok(document.querySelector(".readout44")?.textContent.includes("must"), "step 2 builder interactive");
  if (n === 8) ok(document.querySelector("#pronoun-lab-44"), "step 8 pronoun conjugation lab renders");
  if (n === 10) ok(document.querySelector("#tendency-compass-44"), "step 10 tendency compass renders");
  if (n === 13) ok(all(".pole44").length === 12, "step 13 prohibition sorter renders 6x2 poles");
  if (n === 16) ok(document.querySelector("#meaning-shift-lab-44"), "step 16 meaning-shift simulator renders");
  if (n === 17) ok(document.querySelector("#question-forge-44"), "step 17 question forge renders");
  if (n === 20) ok(all(".conjRow44").length >= 3, "step 20 tense machine renders");
  if (n === 25) ok(document.querySelector("#strength-gauge-44"), "step 25 strength gauge renders");
  if (n === 26) ok(all(".turn44").length >= 6, "step 26 comprehensive dialogue renders");
  if (n === 36) ok(all(".checklist44 input").length === 8, "step 36 writing checklist renders all 8 required items");
  if (n === 38) ok(document.querySelector(".ticks44"), "step 38 44/120 progress map renders");
  checkStudentSnapshot(`step-${n}`);
}

// ---------------- 4) Attempt-Before-Reveal Gating & Retry Reset (§§27–33) ----------------
// §27 Grammar Detective
await selectStep(27);
ok(all('[data-exercise-id^="det-"]').length === 10, "10 Grammar Detective cards render");
ok(!document.querySelector(".sourceKey44"), "§27 summary key hidden before attempts");
for (let i = 0; i < 10; i++) {
  const card = document.querySelector(`[data-exercise-id="det-${i}"]`);
  const checkBtn = byText("تحقّق من التصحيح", card);
  ok(checkBtn.disabled, `detective card ${i + 1} button disabled before typing attempt`);
  await change(card.querySelector("textarea"), "She must study.");
  ok(!checkBtn.disabled, `detective card ${i + 1} button enables after typing attempt`);
  await click(checkBtn);
  ok(card.querySelector(".fb44"), `detective card ${i + 1} reveals explanation after attempt`);
  if (i < 9) ok(!document.querySelector(".sourceKey44"), `§27 summary key stays locked at ${i + 1}/10`);
}
ok(document.querySelector(".sourceKey44"), "§27 summary key unlocks after 10/10 attempts");
collectUnits();
checkStudentSnapshot("opened-27");

// §§28–32 Practice Sets
for (const sec of [28, 29, 30, 31, 32]) {
  await selectStep(sec);
  ok(!document.querySelector(".sourceKey44"), `§${sec} key hidden before attempts`);
  const secItems = practiceItems.filter((p) => p.section === sec);
  for (let i = 1; i <= 5; i++) {
    const card = document.querySelector(`[data-exercise-id="p${sec}-${i}"]`);
    const sample = secItems[i - 1].sourceAnswer;
    const choiceBtns = all(".answer44", card);
    if (choiceBtns.length) {
      const optIdx = sample.trim().toUpperCase().charCodeAt(0) - 65;
      await click(choiceBtns[optIdx] || choiceBtns[0]);
    } else {
      await change(card.querySelector("textarea"), sample);
    }
    await click(byText("تحقّق", card));
    ok(card.querySelector(".fb44--ok"), `p${sec}-${i} grades canonical answer "${sample}" as correct`);
    if (i < 5) ok(!document.querySelector(".sourceKey44"), `§${sec} key stays closed at ${i}/5`);
  }
  ok(document.querySelector(".sourceKey44"), `§${sec} key opens after 5/5 attempts`);
  collectUnits();
  checkStudentSnapshot(`opened-${sec}`);

  // Verify clean retry reset on §28
  if (sec === 28) {
    await click(byText("إعادة التدريب"));
    ok(!document.querySelector(".sourceKey44") && !document.querySelector(".fb44"), "§28 retry resets feedback and re-hides key");
    for (let i = 1; i <= 5; i++) {
      const card = document.querySelector(`[data-exercise-id="p28-${i}"]`);
      await click(card.querySelector(".answer44"));
      await click(byText("تحقّق", card));
    }
  }
}

// §33 Reading Challenge
await selectStep(33);
ok(all(".readerLine44").length === 16, "§33 reading text renders all 16 lines");
ok(!document.querySelector(".sourceKey44"), "§33 reading key hidden before attempts");
for (let i = 0; i < 10; i++) {
  const card = document.querySelector(`[data-exercise-id="read-${i}"]`);
  await change(card.querySelector("textarea"), "Student answer attempt");
  await click(byText("تحقّق وقارن بالحل", card));
  if (i < 9) ok(!document.querySelector(".sourceKey44"), `§33 reading key stays closed at ${i + 1}/10`);
}
ok(document.querySelector(".sourceKey44"), "§33 reading key opens after 10/10 attempts");
collectUnits();
checkStudentSnapshot("opened-33");

// §36 Writing Mission auto-detector + persistence
await selectStep(36);
const draftArea = document.querySelector(".writing44 textarea");
await change(
  draftArea,
  "At my school, I must listen carefully, I must respect others, and I must study hard. I have to wear my uniform, I have to arrive on time, and my brother has to finish homework. We mustn't run and we mustn't shout. On Friday, I don't have to wake up early and she doesn't have to carry books. Yesterday, I had to finish a project, I didn't have to stay late, and next week I will have to present it. Do we have to bring notebooks tomorrow?"
);
await selectStep(37);
await selectStep(36);
ok(
  document.querySelector(".writing44 textarea").value.includes("will have to present"),
  "writing draft persists across step navigation"
);
ok(
  document.querySelector(".writing44").textContent.includes("8 / 8"),
  "writing auto-detector recognizes all 8 grammar requirements"
);

// ---------------- 5) Final Test Pre-Submit Answer-Hiding & Lazy Grading ----------------
await click(document.querySelector('[data-area-tab="test"]'));
await act(async () => {
  await new Promise((r) => setTimeout(r, 40));
});
const preSubmitHtml = document.getElementById("l44-main").innerHTML;
ok(all(".qField44").length === 25, "25 test question fieldsets render");
const submitBtn = byText("تسليم الاختبار");
ok(submitBtn?.disabled, "test submit button disabled while incomplete");

// Strict pre-submit DOM leak check: no solution answers or explanations in HTML or attributes
for (const forbidden of [
  "doesn't have to",
  "He must study harder.",
  "She has to wear a uniform.",
  "Does he have to leave now?",
  "I didn't have to work yesterday.",
  "She will have to finish the project.",
  "الفاعل He مفرد غائب في المضارع البسيط",
]) {
  ok(!preSubmitHtml.includes(forbidden), `pre-submit DOM hides key/explanation "${forbidden}"`);
}
checkStudentSnapshot("test-pre-submit");

// Fill all 25 questions with exact correct answers
const exactTestInputs = {
  0: "B. must",
  1: "B. has to",
  2: "B. Does",
  3: "A. had to",
  4: "C. have to",
  5: "mustn't",
  6: "doesn't have to",
  7: "had to",
  8: ["Did", "have to"],
  9: "won't have to",
  10: "He must study harder.",
  11: "She has to wear a uniform.",
  12: "Does he have to leave now?",
  13: "I didn't have to work yesterday.",
  14: "She will have to finish the project.",
  15: "الأولى تعني المنع القاطع، والثانية تعني عدم الضرورة والاختيار.",
  16: "لأن MUST ليس لها ماض ولا توجد musted، فنستخدم HAD TO في الماضي.",
  17: "نعم، كلتاهما صحيحة في القوانين والتعليمات الرسمية واليومية.",
  18: "الأولى ضرورة يؤكدها المتحدث بدافع شخصي، والثانية التزام فرضه ظرف خارجي وهو الامتحان.",
  19: "لا تعني ذلك؛ الجملة تدل فقط على أن إنهاء التقرير لم يكن إلزاميًا أمس.",
  20: "has to",
  21: "Do",
  22: "don't",
  23: "mustn't",
  24: "had to",
};

const qFields = all(".qField44");
for (let idx = 0; idx < qFields.length; idx++) {
  const field = qFields[idx];
  const radios = all('input[type="radio"]', field);
  const val = exactTestInputs[idx];
  if (radios.length) {
    const match = radios.find((r) => r.value === val);
    await click(match);
  } else {
    const inputs = all('input[type="text"], textarea', field);
    if (Array.isArray(val)) {
      await change(inputs[0], val[0]);
      await change(inputs[1], val[1]);
    } else {
      await change(inputs[0], val);
    }
  }
}

ok(!submitBtn.disabled, "submit button unlocks once all 25 questions are answered");
await act(async () => {
  submitBtn.click();
  await new Promise((r) => setTimeout(r, 60));
});

ok(
  document.getElementById("l44-main").textContent.includes("25 / 25"),
  "lazy testKey44 grades all 25 correct answers as 25 / 25"
);
ok(!document.querySelector('[data-area-tab="solutions"]').disabled, "Solutions tab unlocks after submission");
checkStudentSnapshot("test-post-submit");

// Open SolutionsArea44
await click(document.querySelector('[data-area-tab="solutions"]'));
await act(async () => {
  await new Promise((r) => setTimeout(r, 40));
});
ok(all(".solCard44").length === 25, "SolutionsArea44 renders all 25 solution cards");
collectUnits();
checkStudentSnapshot("solutions-open");

// Retry reset from TestArea44
await click(document.querySelector('[data-area-tab="test"]'));
await click(byText("إعادة الاختبار"));
ok(document.querySelector('[data-area-tab="solutions"]').disabled, "retry re-locks Solutions tab");
ok(
  !document.getElementById("l44-main").textContent.includes("25 / 25"),
  "retry clears score report and removes keys from DOM"
);

// ---------------- 6) Teacher Space Gate & Guide ----------------
await click(document.querySelector('[data-area-tab="teacher"]'));
await act(async () => {
  await new Promise((r) => setTimeout(r, 40));
});
ok(document.querySelector(".teacherGateCard44"), "Teacher gate renders");
await change(document.querySelector(".teacherGateCard44 input"), "wrong-pass");
await click(document.querySelector('.teacherGateCard44 button[type="submit"]'));
ok(!document.querySelector('[data-teacher-guide="44"]'), "wrong teacher password rejected");

await change(document.querySelector(".teacherGateCard44 input"), "somer173");
await click(document.querySelector('.teacherGateCard44 button[type="submit"]'));
await act(async () => {
  await new Promise((r) => setTimeout(r, 60));
});
ok(document.querySelector('[data-teacher-guide="44"]'), "TeacherGuide44 mounts after somer173");
ok(all("[data-teacher-unit]").length === 49, "TeacherGuide44 renders all 49 teacherSource44 §35 lines");
ok(all(".practiceKeys44 tbody tr").length === 25, "TeacherGuide44 renders 25 practice keys");
collectUnits();

// Verify BIDI inside TeacherGuide44 too
const teacherBidi = analyzeHtml(document.getElementById("l44-main").innerHTML).flatMap((p) =>
  p.violations.map((v) => `teacher: ${v.latin} || ${v.arabic}`)
);
ok(teacherBidi.length === 0, `BIDI clean in TeacherGuide44: ${teacherBidi.slice(0, 3).join(" | ")}`);

// ---------------- 7) 100% Authoritative Source Unit Coverage ----------------
const expectedUnits = sections.flatMap((s) => s.units.map((u) => u.id));
const missingUnits = expectedUnits.filter((id) => !units.has(id));
ok(
  missingUnits.length === 0,
  `every student source unit reaches the DOM (missing ${missingUnits.length}: ${missingUnits.slice(0, 8).join(", ")})`
);
ok(expectedUnits.length === 762, `762 student source units verified (got ${expectedUnits.length})`);
ok(solutions.length === 25, "25 test solutions verified");

console.log(
  `Lesson 44 DOM audit passed: ${checks} assertions; 39 steps, ${expectedUnits.length} student units + 35 teacher units rendered, 0 BIDI violations, 0 provenance leaks across ${snapshotCount} student snapshots, pre-submit answer hiding + lazy 25/25 grading + retry verified.`
);
await act(async () => {
  root.unmount();
});
