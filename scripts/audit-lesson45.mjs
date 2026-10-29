// ============================================================
// Lesson 45 comprehensive deterministic audit:
//   1) Student-copy & anti-leakage checks (source + rendered HTML)
//   2) Full 42-step / 11-station pedagogical coverage checks
//   3) Exhaustive Q1–Q25 positive, negative, contraction, stem-aware,
//      and semantic/anti-inversion grading unit tests
// ============================================================
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { auditRenderedStudentCopy } from "./lib/student-copy-audit.mjs";

const req = createRequire(import.meta.url);
const esbuild = req("esbuild");
const { JSDOM } = req("jsdom");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const l45Dir = join(root, "src/lessons/lesson45");

let passed = 0;
const failures = [];
function ok(cond, msg) {
  if (cond) {
    passed++;
  } else {
    failures.push(msg);
    console.error(`  ✕ ${msg}`);
  }
}

async function loadLesson45Bundle() {
  const tmpDir = join(root, "node_modules", ".l45-audit");
  mkdirSync(tmpDir, { recursive: true });
  const outfile = join(tmpDir, `l45-${process.pid}.mjs`);
  await esbuild.build({
    absWorkingDir: root,
    stdin: {
      contents: `
        import React from "react";
        export { React };
        export { createRoot } from "react-dom/client";
        export { flushSync } from "react-dom";
        export { default as Lesson45 } from "./src/lessons/lesson45/Lesson45.tsx";
        export * from "./src/lessons/lesson45/data.ts";
        export * from "./src/lessons/lesson45/testData45.ts";
        export * from "./src/lessons/lesson45/testKey45.ts";
        export { default as TestArea45 } from "./src/lessons/lesson45/TestArea45.tsx";
        export * from "./src/lessons/lesson45/TestArea45.tsx";
      `,
      resolveDir: root,
      loader: "tsx",
    },
    bundle: true,
    platform: "node",
    format: "esm",
    jsx: "automatic",
    packages: "external",
    outfile,
    logLevel: "error",
  });
  const mod = await import(pathToFileURL(outfile).href);
  rmSync(outfile, { force: true });
  return mod;
}

async function main() {
  // 1) File hygiene & anti-leakage source checks
  ok(!existsSync(join(l45Dir, "lesson45.css")), "Legacy bespoke lesson45.css removed in favor of Lesson 1 style-b");

  const studentFiles = [
    "Lesson45.tsx",
    "design45.tsx",
    "practice45.tsx",
    "data.ts",
    "testData45.ts",
    "TestArea45.tsx",
    "TeacherArea45.tsx",
  ];
  for (const f of studentFiles) {
    const p = join(l45Dir, f);
    ok(existsSync(p), `File exists: ${f}`);
    const content = readFileSync(p, "utf8");
    ok(!content.includes("\uFFFD"), `${f}: zero U+FFFD replacement chars`);
    ok(!/[\u202A-\u202E\u2066-\u2069]/.test(content), `${f}: zero raw Unicode BIDI control chars`);
    ok(!/<details[\s>]|<summary[\s>]/i.test(content), `${f}: zero <details>/<summary> disclosure tags`);
  }

  const testDataSrc = readFileSync(join(l45Dir, "testData45.ts"), "utf8");
  const testAreaSrc = readFileSync(join(l45Dir, "TestArea45.tsx"), "utf8");
  ok(!testDataSrc.includes("TEST_SOLUTIONS_45") && !testDataSrc.includes("modelAnswer"), "testData45.ts holds zero answer keys");
  ok(
    testAreaSrc.includes('import("./testKey45")') &&
      !testAreaSrc.includes('from "./testKey45"\n') &&
      !/import\s+\{[^}]*gradeTest45/.test(testAreaSrc),
    "TestArea45.tsx loads testKey45 only via dynamic import on submission"
  );

  // 2) Load compiled Lesson 45 + data + grading engine
  const dom = new JSDOM("<!doctype html><html lang='ar' dir='rtl'><body></body></html>", {
    url: "http://localhost/#/lesson/45",
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  Object.defineProperty(globalThis, "navigator", {
    value: dom.window.navigator,
    configurable: true,
  });
  globalThis.HTMLElement = dom.window.HTMLElement;
  globalThis.localStorage = dom.window.localStorage;
  globalThis.Element = dom.window.Element;
  winScrollPolyfill(dom.window);

  const M = await loadLesson45Bundle();

  ok(M.LESSON_STEP_COUNT_45 === 42 && M.STEPS_45.length === 42, `Lesson 45 has 42 steps (got ${M.STEPS_45.length})`);
  ok(M.STATIONS_45.length === 11, `Lesson 45 has 11 stations (got ${M.STATIONS_45.length})`);
  ok(M.TEST_QUESTIONS_45.length === 25, `Final test has 25 questions (got ${M.TEST_QUESTIONS_45.length})`);
  ok(M.TEST_LEVELS_45.length === 5, `Final test has 5 levels (got ${M.TEST_LEVELS_45.length})`);
  for (let lv = 1; lv <= 5; lv++) {
    const count = M.TEST_QUESTIONS_45.filter((q) => q.level === lv).length;
    ok(count === 5, `Level ${lv} has exactly 5 questions (got ${count})`);
  }

  // 3) Render every single one of the 42 steps and audit student HTML
  const host = dom.window.document.createElement("div");
  dom.window.document.body.appendChild(host);
  const rootReact = M.createRoot(host);
  M.flushSync(() => {
    rootReact.render(M.React.createElement(M.Lesson45, { onExit: () => {} }));
  });

  let bidiBoundaryViolations = 0;
  for (let i = 0; i < M.LESSON_STEP_COUNT_45; i++) {
    const counterText = host.textContent || "";
    ok(counterText.includes(`${i + 1} / 42`), `Step ${i + 1}/42 counter rendered`);
    const htmlIssues = auditRenderedStudentCopy(host);
    ok(
      htmlIssues.length === 0,
      `Step ${i + 1} (${M.STEPS_45[i].id}): zero editorial-label violations (${htmlIssues.map((x) => `${x.rules.join(",")}: "${x.text}"`).join("; ")})`
    );

    // Check inline <span dir="ltr"> across the ENTIRE Lesson 45 shell (sidebar + header + slide)
    const ltrSpans = host.querySelectorAll('span[dir="ltr"]');
    for (const sp of ltrSpans) {
      const txt = sp.textContent || "";
      const prevNode = sp.previousSibling;
      const nextNode = sp.nextSibling;
      const hasNeighborText =
        (prevNode && prevNode.nodeType === 3 && prevNode.nodeValue) ||
        (nextNode && nextNode.nodeType === 3 && nextNode.nodeValue);
      if (hasNeighborText && (/^[\s:—–·،؛]/.test(txt) || /[\s،؛]$/.test(txt))) {
        bidiBoundaryViolations++;
      }
      if (prevNode && prevNode.nodeType === 3 && /[\u0621-\u064A]$/.test(prevNode.nodeValue || "")) {
        bidiBoundaryViolations++;
      }
      if (nextNode && nextNode.nodeType === 3 && /^[\u0621-\u064A]/.test(nextNode.nodeValue || "")) {
        bidiBoundaryViolations++;
      }
    }

    if (M.STEPS_45[i].kind === "test") {
      ok(!host.textContent.includes("الإجابة النموذجية:"), "Test step hides model answers before submission");
      ok(!host.textContent.includes("التقدير:"), "Test step hides score banner before submission");
    }
    if (i < M.LESSON_STEP_COUNT_45 - 1) {
      const nextBtn = host.querySelector('[data-step-nav="next"]');
      ok(!!nextBtn && !nextBtn.disabled, `Step ${i + 1}: Next button enabled`);
      M.flushSync(() => {
        nextBtn.click();
      });
    } else {
      const nextBtn = host.querySelector('[data-step-nav="next"]');
      ok(!!nextBtn && nextBtn.disabled, "Final step 42: Next button disabled");
      ok(host.textContent.includes("45 / 120") && host.textContent.includes("Lesson 46"), "Final step 42 renders 45/120 progress and Lesson 46 preview");
    }
  }
  ok(
    bidiBoundaryViolations === 0,
    `All 42 steps have clean RTL/LTR span boundaries with zero punctuation reversal or word collisions (got ${bidiBoundaryViolations})`
  );
  rootReact.unmount();
  host.remove();

  // 4) Question-by-question grading verification (Q1–Q25)
  const qById = Object.fromEntries(M.TEST_QUESTIONS_45.map((q) => [q.id, q]));
  ok(M.TEST_SOLUTIONS_45.length === 25, `TEST_SOLUTIONS_45 has 25 entries (got ${M.TEST_SOLUTIONS_45.length})`);

  // Canonical student answers across all 25 questions must score 25/25
  const canonicalSubmission = {
    q1: "should",
    q2: "to",
    q3: "Should",
    q4: "sleep",
    q5: "leave",
    q6: "shouldn't",
    q7: "ought",
    q8: "should",
    q9: "shouldn't",
    q10: "should",
    q11: "She should study more.",
    q12: "You ought to study harder.",
    q13: "Should I leave now?",
    q14: "He should have gone home earlier.",
    q15: "You had better take an umbrella.",
    q16: "You should study تفيد النصيحة، بينما You must study تفيد الإلزام القوي.",
    q17: "shouldn't نصيحة بعدم الدخول، أما mustn't فهي منع باتّ وحظر.",
    q18: "ندم أو لوم الذات على عدم الاستماع إلى المعلم في الماضي.",
    q19: "توقع منطقي معقول بأن النتائج ستكون جاهزة غدًا.",
    q20: "had better أقوى وأكثر إلحاحًا من should وتحمل تحذيرًا من نتيجة سلبية إن لم تُتّبع.",
    q21: "should",
    q22: "should",
    q23: "should",
    q24: "shouldn't",
    q25: "should",
  };
  const perfect = M.gradeTest45(canonicalSubmission);
  ok(perfect.score === 25 && perfect.total === 25, `Canonical answers score 25/25 (got ${perfect.score}/${perfect.total})`);

  // Blank submission must score 0/25
  const blank = M.gradeTest45({});
  ok(blank.score === 0 && blank.total === 25, `Empty answers score 0/25 (got ${blank.score}/${blank.total})`);

  const positiveCases = {
    q1: ["should", "SHOULD", " should "],
    q2: ["to", "TO"],
    q3: ["Should", "should"],
    q4: ["sleep", "SLEEP"],
    q5: ["leave", "LEAVE"],
    q6: [
      "shouldn't",
      "should not",
      "shouldn't waste",
      "should not waste",
      "shouldn’t waste water",
      "You shouldn't waste water.",
      "you should not waste water",
    ],
    q7: [
      "ought",
      "ought to",
      "ought to apologise",
      "ought to apologize",
      "ought to apologise to her friend",
      "She ought to apologise to her friend.",
      "she ought to apologize to her friend",
    ],
    q8: [
      "should",
      "should have",
      "should have left",
      "should've left",
      "should’ve left",
      "should have left earlier",
      "should've left earlier yesterday",
      "We should have left earlier yesterday.",
      "We should have left earlier yesterday, but we didn't.",
      "We should've left earlier yesterday, but we did not.",
    ],
    q9: [
      "shouldn't",
      "should not",
      "shouldn't have",
      "should not have",
      "shouldn't have eaten",
      "shouldn't've eaten",
      "shouldn't have eaten so much",
      "should not have eaten so much yesterday",
      "He shouldn't have eaten so much yesterday.",
      "he should not have eaten so much yesterday",
    ],
    q10: [
      "should",
      "ought to",
      "should arrive",
      "ought to arrive",
      "should arrive tomorrow",
      "ought to arrive tomorrow",
      "The package should arrive tomorrow.",
      "the package ought to arrive tomorrow",
    ],
    q11: ["She should study more.", "she should study more", "She should study more!"],
    q12: ["You ought to study harder.", "you ought to study harder"],
    q13: ["Should I leave now?", "should i leave now"],
    q14: [
      "He should have gone home earlier.",
      "He should've gone home earlier.",
      "he should’ve gone home earlier",
    ],
    q15: [
      "You had better take an umbrella.",
      "You'd better take an umbrella.",
      "you’d better take an umbrella",
    ],
    q16: [
      "should تفيد النصيحة والتوجيه، بينما must تفيد الإلزام القوي والضرورة.",
      "should تفيد النصيحة بينما must تفيد الإلزام القوي.",
      "Should gives advice or recommendation, whereas must expresses strong obligation.",
      "Should gives advice while must expresses strong obligation.",
      "Must expresses strong obligation, while should gives gentle advice.",
      "You should study means advice (not obligation), whereas You must study means strong obligation.",
      "الأولى للنصيحة والثانية للإلزام والواجب القوي",
    ],
    q17: [
      "shouldn't نصيحة بعدم الدخول، أما mustn't فهي منع بات وحظر.",
      "shouldn't نصيحة بعدم الدخول بينما mustn't منع بات وحظر.",
      "Shouldn't advises against entering, while mustn't means it is strictly forbidden.",
      "Shouldn't advises against entering while mustn't means strictly forbidden.",
      "Should not means it is not a good idea to enter; must not means prohibition.",
      "الأولى تحذير ونصيحة بالتجنب والثانية ممنوع تماما",
    ],
    q18: [
      "تعني الندم على الماضي لأن المتحدث لم يستمع إلى معلمه.",
      "Past regret / self-criticism: the speaker did not listen to the teacher in the past.",
      "كان ينبغي أن أستمع إلى معلمي لكنني لم أفعل ذلك في الماضي",
      "لوم الذات على عدم الاستماع في الماضي",
    ],
    q19: [
      "تعبر عن توقع منطقي بأن النتائج ستكون جاهزة غدًا، وليست نصيحة.",
      "Reasonable expectation that the results will be ready tomorrow, not advice.",
      "احتمال وتوقع طبيعي بجهوزية النتائج غدًا",
      "Logical expectation (not obligation or advice).",
    ],
    q20: [
      "had better أقوى وأكثر إلحاحًا من should وتحمل تحذيرًا من نتيجة سلبية إذا تُركت النصيحة.",
      "Had better is more urgent and warns of a negative consequence if ignored.",
      "تحذير عاجل من عاقبة سلبية في موقف محدد",
      "had better نصيحة قوية لموقف محدد وليست للماضي",
    ],
    q21: ["should", "Should", "What should I do?"],
    q22: [
      "should",
      "ought to",
      "should revise",
      "ought to revise",
      "should revise the most important topics first",
      "You should revise the most important topics first.",
      "You ought to revise the most important topics first.",
    ],
    q23: [
      "should",
      "ought to",
      "should have",
      "should have started",
      "should've started",
      "ought to have started",
      "should have started earlier",
      "You should have started earlier.",
    ],
    q24: [
      "shouldn't",
      "should not",
      "shouldn't have",
      "shouldn't have stayed",
      "shouldn't have stayed up",
      "shouldn't've stayed up",
      "shouldn't have stayed up so late",
      "ought not to",
      "You shouldn't have stayed up so late.",
    ],
    q25: [
      "should",
      "should be",
      "ought to",
      "ought to be",
      "It should be manageable",
      "It should be manageable if we've prepared well.",
      "It ought to be manageable if we have prepared well.",
    ],
  };

  const negativeCases = {
    q1: ["shoulds", "should to", "musts", ""],
    q2: ["for", "at", "should", ""],
    q3: ["Do should", "Does", "Did", "Are"],
    q4: ["sleeps", "sleeping", "to sleep"],
    q5: ["to leave", "leaving", "left"],
    q6: ["should waste", "shouldn't to waste", "don't should", "ought not to"],
    q7: ["should", "ought apologise", "ought for", "had better"],
    q8: ["should left", "should of left", "should to have left", "ought"],
    q9: ["should", "should have eaten", "shouldn't ate", "shouldn't of eaten", "didn't should"],
    q10: ["should arrives", "should to arrive", "ought arrive", "should arriving"],
    q11: ["She shoulds study more.", "She should studies more.", "She should to study more.", "study more"],
    q12: ["You ought study harder.", "You ought to studies harder.", "study harder"],
    q13: ["Do I should leave now?", "I should leave now?", "Should I to leave now?"],
    q14: ["He should have went home earlier.", "He should went home earlier.", "He should of gone home earlier."],
    q15: ["You had better to take an umbrella.", "You better take an umbrella.", "You had better taking an umbrella."],
    q16: [
      "advice",
      "obligation",
      "should تفيد الإلزام القوي والفرض، بينما must تفيد النصيحة الخفيفة.",
      "Should expresses strong obligation whereas must gives mild advice.",
      "Strong obligation is expressed by should, while advice is expressed by must.",
      "الإلزام يكون بـ should، والنصيحة تكون بـ must.",
      "You should study means advice, not obligation.",
      "should is not advice and must is not obligation.",
      "Both should and must mean strong obligation, not advice.",
      "كلاهما للإلزام وليس للنصيحة",
      "لا يوجد فرق بينهما",
    ],
    q17: [
      "prohibition",
      "shouldn't تعني ممنوع ومحظور، بينما mustn't تعني نصيحة فقط.",
      "Shouldn't means strictly prohibited while mustn't is friendly advice.",
      "Prohibition is shouldn't, and advice is mustn't.",
      "المنع البات في shouldn't والنصيحة في mustn't",
      "shouldn't ليست منعًا",
      "You shouldn't enter is advice, not prohibition.",
      "shouldn't is not advice and mustn't is not prohibition.",
      "Both shouldn't and mustn't mean prohibition, not advice.",
      "تعني أنه ليس مضطرًا للدخول فقط",
    ],
    q18: [
      "نصيحة للمستقبل لكي أستمع غدًا",
      "Future advice to listen tomorrow",
      "لا تعني الندم بل تعني أنني استمعت للمعلم فعلًا",
      "It does not mean regret; I listened to my teacher.",
      "Regret for listening to my teacher.",
      "ندم على الاستماع إلى المعلم",
      "ندم لأنه استمع إلى معلمه",
    ],
    q19: [
      "تعني نصيحة للنتائج أن تكون جاهزة",
      "It gives advice to the results.",
      "It does not express expectation.",
      "ليست التوقع بل الإلزام",
      "Expectation and strong obligation.",
      "توقع وإلزام قانوني معًا",
      "إلزام قوي وفرض",
      "ندم على الماضي",
    ],
    q20: [
      "had better للزمن الماضي فقط",
      "had better is past tense of should",
      "had better أضعف وألطف من should",
      "had better is weaker and softer than should",
      "should carries a warning of a bad consequence, while had better is mild.",
      "should تحمل تحذيرًا من عاقبة سلبية",
      "had better ليست أقوى من should وبلا تحذير",
      "had better is not stronger and has no warning",
      "problem",
      "strong",
      "مشكلة",
      "قوية",
      "لا فرق بينهما أبدًا",
    ],
    q21: ["do", "ought", "must to", "did"],
    q22: ["ought", "should to", "had better to", "shouldn't"],
    q23: ["should started", "should of", "shouldn't", "must to"],
    q24: ["should", "should have", "ought to", "didn't should"],
    q25: ["ought", "should to", "should been", "shouldn't"],
  };

  for (let n = 1; n <= 25; n++) {
    const id = `q${n}`;
    const q = qById[id];
    for (const good of positiveCases[id]) {
      ok(M.gradeQuestion45(q, good) === true, `${id.toUpperCase()} accepts valid answer: "${good}"`);
    }
    for (const bad of negativeCases[id]) {
      ok(M.gradeQuestion45(q, bad) === false, `${id.toUpperCase()} rejects invalid answer: "${bad}"`);
    }
  }

  // 5) Async grading chunk failure & retry recovery verification
  {
    const errHost = dom.window.document.createElement("div");
    dom.window.document.body.appendChild(errHost);
    let attempts = 0;
    const flakyLoader = async () => {
      attempts++;
      if (attempts === 1) throw new Error("Simulated chunk network failure");
      return { gradeTest45: M.gradeTest45 };
    };

    function Harness() {
      const [answers, setAnswers] = M.React.useState({ ...canonicalSubmission });
      const [result, setResult] = M.React.useState(null);
      return M.React.createElement(M.TestArea45, {
        answers,
        result,
        onChangeAnswer: (qid, val) => setAnswers((prev) => ({ ...prev, [qid]: val })),
        onSubmitResult: setResult,
        onResetTest: () => {
          setAnswers({});
          setResult(null);
        },
        keyLoader: flakyLoader,
      });
    }

    const r = M.createRoot(errHost);
    M.flushSync(() => {
      r.render(M.React.createElement(Harness));
    });

    const submitBtn = errHost.querySelector("[data-test-submit]");
    ok(!!submitBtn && !submitBtn.disabled, "Retry harness: submit enabled when 25/25 answered");

    // 1st click fails -> alert rendered, answers preserved, not submitted
    submitBtn.click();
    await new Promise((res) => setTimeout(res, 30));
    M.flushSync(() => {});
    const errBanner = errHost.querySelector("[data-test-error]");
    ok(!!errBanner, "Chunk load failure displays retryable [data-test-error] alert");
    ok(!errHost.querySelector("[data-test-result]"), "Chunk load failure keeps test unsubmitted");
    ok(!errHost.querySelector("[data-test-submit]").disabled, "Chunk load failure re-enables submit button for retry");

    // 2nd click succeeds -> error cleared, result banner shows 25 / 25
    errHost.querySelector("[data-test-submit]").click();
    await new Promise((res) => setTimeout(res, 30));
    M.flushSync(() => {});
    ok(!errHost.querySelector("[data-test-error]"), "Retry clears error alert upon success");
    ok(
      (errHost.querySelector("[data-test-result]")?.textContent || "").includes("25 / 25"),
      "Retry after chunk failure grades preserved answers to 25 / 25"
    );

    r.unmount();
    errHost.remove();
  }

  if (failures.length > 0) {
    console.error(`\n✕ Lesson 45 audit FAILED (${failures.length} failures, ${passed} passed).`);
    process.exit(1);
  }
  console.log(`\n✓ Lesson 45 audit passed (${passed} assertions, 0 failures).`);
}

function winScrollPolyfill(win) {
  win.HTMLElement.prototype.scrollTo = function () {};
  win.HTMLElement.prototype.scrollIntoView = function () {};
  win.scrollTo = function () {};
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
