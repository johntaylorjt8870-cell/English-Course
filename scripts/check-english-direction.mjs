// ============================================================
// فحص اتجاه الإنجليزية داخل الدروس (npm run check:english-direction)
// English-direction regression check: English must always render
// LTR-isolated inside the Arabic RTL UI — never word-reversed.
// ============================================================
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "lessons");
const lessons = readdirSync(ROOT).filter((d) => d.startsWith("lesson")).sort();

const failures = [];
let checks = 0;
function ok(cond, msg) {
  checks++;
  if (!cond) failures.push(msg);
}
function src(lesson, file) {
  return readFileSync(join(ROOT, lesson, file), "utf8");
}
// يقتطع جسم دالة بالاسم: من تعريفها حتى بداية الدالة التالية
function fnBody(code, name) {
  const start = code.search(new RegExp(`function ${name}\\s*\\(`));
  if (start === -1) return null;
  const rest = code.slice(start);
  const next = rest.slice(30).search(/\n(function |export default )/);
  return next === -1 ? rest : rest.slice(0, 30 + next);
}

// ---------- 1) محرك الانعكاس ممنوع: تقسيم الإنجليزية إلى كلمات معزولة ----------
for (const l of lessons) {
  const tsx = src(l, tsxName(l));
  ok(!tsx.includes("split(/(\\s+)/)"), `${l}: per-token split still present (word-reversal engine)`);
}
// ملاحظة: تقسيم [[...]] مسموح (فصل العبارات المميزة)، الممنوع تقسيم المسافات.
function tsxName(l) {
  const n = l.replace("lesson", "");
  return `Lesson${n}.tsx`;
}

// ---------- 2) الدروس التي فيها نص مختلط يجب أن تستخدم LatinRuns ----------
for (const l of ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5", "lesson6", "lesson7", "lesson9"]) {
  const tsx = src(l, tsxName(l));
  ok(tsx.includes("../../shared/bidi"), `${l}: must import LatinRuns from shared/bidi`);
}
{
  const bidi = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "src", "shared", "bidi.tsx"),
    "utf8"
  );
  ok(bidi.includes('dir="ltr"'), "shared/bidi: LatinRuns must wrap English runs with dir=ltr");
}

// ---------- 3) محتوى الدرس الرابع المطلوب (an + ... و It/She/He) ----------
{
  const d4 = src("lesson4", "data.ts");
  ok(d4.includes('"apple", "egg", "orange", "engineer", "actor"'), "lesson4: an-examples must list apple/egg/orange/engineer/actor");
  for (const s of ["an apple", "an egg", "an engineer"]) {
    ok(d4.includes(`"${s}"`), `lesson4: data must show "${s}"`);
  }
  for (const w of ["teacher", "student", "book"]) {
    ok(d4.includes(`en: "${w}"`), `lesson4: NOUNS must include "${w}"`);
  }
  for (const p of ["He", "She", "It"]) {
    ok(d4.includes(`en: "${p}"`), `lesson4: PRONOUN_BE must include "${p}"`);
  }
}

// ---------- 4) أنماط معكوسة ممنوعة حرفيًا (article بعد الاسم) ----------
// ملاحظة: "a apple" وأمثالها مقصودة كأمثلة خاطئة للتصحيح — لا نمنعها.
// الممنوع هو الترتيب المعكوس (الاسم قبل الأداة) فهو لا يظهر أبدًا عن قصد.
const REVERSED = [
  /\b(orange|egg|apple|actor|engineer)\s+an\b/,
  /\b(book|teacher|student|car|pen|dog|cat|bird|house|school|boy|girl|table|room|city)\s+a\b/,
  /\b(books|teachers|students)\s+are\s+(a|an)\b/i,
];
for (const l of lessons) {
  for (const f of [tsxName(l), "data.ts"]) {
    let code;
    try {
      code = src(l, f);
    } catch {
      continue;
    }
    for (const rx of REVERSED) {
      const m = code.match(rx);
      ok(!m, `${l}/${f}: reversed pattern "${m?.[0]}" must not appear`);
    }
  }
}

// ---------- 5) تجميعات LTR الهيكلية (كل وحدة إنجليزية داخل عازل LTR) ----------
const LTR_SPOTS = [
  ["lesson1", "Cover"],
  ["lesson1", "RolesRow"],
  ["lesson1", "Formula"],
  ["lesson1", "SentenceBlocks"],
  ["lesson1", "BuilderSlide"],
  ["lesson1", "Steps"],
  ["lesson1", "Patterns"],
  ["lesson2", "Cover"],
  ["lesson3", "PronounFlipRow"],
  ["lesson4", "Cover"],
  ["lesson4", "ArtBlock"],
  ["lesson4", "AAnEx"],
  ["lesson4", "Machine"],
  ["lesson5", "Cover"],
  ["lesson6", "Groups"],
  ["lesson7", "Cover"],
  ["lesson8", "ConjTabs"],
  ["lesson8", "VowelY"],
  ["lesson13", "FormulaBoard"],
  ["lesson13", "PartsLine"],
  ["lesson13", "DidHero"],
  ["lesson13", "GoldenMachine"],
  ["lesson13", "WhMeanings"],
  ["lesson13", "Summary"],
  ["lesson13", "KeyRule"],
  ["lesson13", "ChangedLine"],
  ["lesson14", "FormulaBoard14"],
  ["lesson14", "PartsLine"],
  ["lesson14", "WhMeanings"],
  ["lesson14", "ControlTable"],
  ["lesson14", "FinalChallengeEx"],
];
for (const [l, fn] of LTR_SPOTS) {
  const body = fnBody(src(l, tsxName(l)), fn);
  ok(body !== null, `${l}: function ${fn} not found`);
  ok(body !== null && body.includes('dir="ltr"'), `${l}/${fn}: English unit must be wrapped with dir="ltr"`);
}

// ---------- 6) محتوى الدرس 1: SVO + العبارات المختلطة تبقى كما هي ----------
{
  const d1 = src("lesson1", "data.ts");
  const t1 = src("lesson1", tsxName("lesson1"));
  ok(d1.includes('en: "Subject"'), "lesson1: ROLE_INFO must keep Subject");
  ok(d1.includes('en: "Verb"'), "lesson1: ROLE_INFO must keep Verb");
  ok(d1.includes('en: "Object"'), "lesson1: ROLE_INFO must keep Object");
  ok(d1.includes("Subject · Verb · Object"), "lesson1: exercise subtitle must keep Subject · Verb · Object");
  ok(t1.includes("function En") && t1.includes('dir="ltr"'), 'lesson1: En must isolate English with dir="ltr"');
}

// ---------- 7) حراس المعنى: الافتراضيات المعقولة + جمع آلة الدرس 4 ----------
{
  const m4 = fnBody(src("lesson4", tsxName("lesson4")), "Machine");
  ok(m4.includes("setNi] = useState(1)"), "lesson4/Machine: default noun must be student (I am a student.)");
  ok(m4.includes("n.plural"), "lesson4/Machine: plural subjects (We/They) must use the plural noun without a/an");
  const b9 = fnBody(src("lesson9", tsxName("lesson9")), "Builder");
  ok(b9.includes("setOi] = useState(2)"), "lesson9/Builder: default object must be dinner (I am cooking dinner.)");
  const d9 = src("lesson9", "data.ts");
  ok(!d9.includes('P("not", "o")'), 'lesson9: "not" must use the nt role, not the object role');
}

// ---------- 8) الدرس 13 — did / didn't: الصيغ الأربع بترتيب إنجليزي ----------
{
  const d13 = src("lesson13", "data.ts");
  const t13 = src("lesson13", "Lesson13.tsx");

  ok(!t13.includes("split(/(\\s+)/)"), "lesson13: per-token split must not exist (word-reversal engine)");
  ok(t13.includes("../../shared/bidi"), "lesson13: must import LatinRuns from shared/bidi");
  ok(
    (t13.match(/dir="ltr"/g) || []).length >= 20,
    `lesson13: English units must be wrapped with dir=ltr throughout (got ${(t13.match(/dir="ltr"/g) || []).length})`
  );

  // الصيغ الأربع المطلوبة — نصًا حرفيًا
  for (const f of [
    "Subject + Past Verb",
    "Subject + didn't + Base Verb",
    "Did + Subject + Base Verb?",
    "Wh-word + did + Subject + Base Verb?",
  ]) {
    ok(d13.includes(f), `lesson13: required formula must appear verbatim: ${f}`);
  }
  ok(d13.includes('"Subject + did not + base verb"'), 'lesson13: must keep "Subject + did not + base verb"');
  ok(d13.includes('"Subject + didn\'t + base verb"'), 'lesson13: must keep "Subject + didn\'t + base verb"');

  // ترتيب الصيغ داخل FORMULAS: مثبت → نفي كامل → نفي → سؤال → Wh
  const fOrder = ["aff", "negFull", "neg", "q", "wh"].map((k) => d13.indexOf(`key: "${k}",`));
  ok(
    fOrder.every((v) => v >= 0) && fOrder.every((v, i) => i === 0 || v > fOrder[i - 1]),
    "lesson13: FORMULAS order must be aff → negFull → neg → q → wh"
  );

  // ممنوع أي ترتيب معكوس للصيغ
  for (const rx of [
    /Base Verb\s*\+\s*did\s*\+\s*Subject/,
    /Base Verb\s*\+\s*didn't\s*\+\s*Subject/,
    /Past Verb\s*\+\s*Subject/,
    /Subject\s*\+\s*Did\s*\+/,
  ]) {
    ok(!rx.test(d13) && !rx.test(t13), `lesson13: reversed formula must not appear (${rx})`);
  }

  const between = (from, to) => {
    const a = d13.indexOf(from);
    const b = d13.indexOf(to);
    return a === -1 ? "" : d13.slice(a, b === -1 ? a + 20000 : b);
  };

  // فهرس أقسام المصدر (34 عنوانًا)
  const secBlock = between("export const SOURCE_SECTIONS", "// -------------------- أدوار الكلمات");
  const secItems = secBlock.match(/\n\s+(?:"[^"]*"|'[^']*'),/g) || [];
  ok(secItems.length >= 34, `lesson13: SOURCE_SECTIONS must index all source sections (got ${secItems.length}, expected 34)`);
  for (const key of [
    "1. تذكير سريع",
    "2. ما هو DID",
    "3. القاعدة الذهبية",
    "5. أمثلة مع جميع الضمائر",
    "10. الإجابات القصيرة",
    "16. أسئلة Wh في الماضي",
    "20. DID كفعل أساسي",
    "21. لعبة",
    "25. المستوى الرابع",
    "27. المستوى السادس",
    "29. Grammar Detective",
    "30. التحدي النهائي",
    "خريطة الدروس حتى الآن",
  ]) {
    ok(d13.includes(key), `lesson13: source section must be indexed: ${key}`);
  }

  // الأهداف السبعة
  ok((between("export const OBJECTIVES_13", "// -------------------- ملخص الدرس").match(/\bn: "/g) || []).length === 7, "lesson13: objectives must keep 7 items");

  // التمارين — العدد ومفاتيح الإجابات
  const l1 = between("export const LEVEL1_NEG", "export const LEVEL2_Q");
  ok((l1.match(/aff: "/g) || []).length === 5, "lesson13: level 1 must keep 5 sentences");
  ok(l1.includes('neg: "I didn\'t visit the science center."'), "lesson13: level 1 answer keys must exist");
  const l2 = between("export const LEVEL2_Q", "export const LEVEL3_CHOOSE");
  ok((l2.match(/aff: "/g) || []).length === 5, "lesson13: level 2 must keep 5 sentences");
  ok(l2.includes('q: "Did you finish the experiment?"'), "lesson13: level 2 answer keys must exist");
  const l3 = between("export const LEVEL3_CHOOSE", "export const LEVEL4_FILL");
  ok((l3.match(/source: "/g) || []).length === 5, "lesson13: level 3 must keep 5 items");
  ok((l3.match(/answer: 0/g) || []).length === 5, "lesson13: level 3 must keep 5 answer keys");
  const l4 = between("export const LEVEL4_FILL", "export const TRIPLE_TRANSFORM");
  ok((l4.match(/stem: "/g) || []).length === 5, "lesson13: level 4 must keep 5 items");
  ok((l4.match(/answer: "/g) || []).length === 5, "lesson13: level 4 must keep 5 answer keys");
  const eh = between("export const ERROR_HUNTER", "export const LEVEL1_NEG");
  ok((eh.match(/wrong: "/g) || []).length === 5, "lesson13: error-hunter game must keep 5 wrong sentences");
  ok((eh.match(/correct: "/g) || []).length === 5, "lesson13: error-hunter game must keep 5 fixes");

  // المستوى الخامس + IQ200 + اكتشف النظام + المحقق
  const triple = between("export const TRIPLE_TRANSFORM", "export const IQ200_TASK");
  for (const lb of ["① مثبتة", "② منفية", "③ سؤال"]) {
    ok(triple.includes(lb), `lesson13: level 5 must keep the form ${lb}`);
  }
  const iq = between("export const IQ200_TASK", "export const PATTERN_SETS");
  for (const tk of ["① سؤال Yes/No", "② إجابة قصيرة بـ Yes", "③ إجابة قصيرة بـ No", "④ سؤال باستخدام Where", "⑤ سؤال باستخدام When"]) {
    ok(iq.includes(tk), `lesson13: IQ200 must keep task ${tk}`);
  }
  ok(iq.includes("فكر بالقاعدة، وليس بالحفظ."), "lesson13: IQ200 must keep its instruction");
  const pat = between("export const PATTERN_SETS", "export const PATTERN =");
  ok((pat.match(/\["/g) || []).length === 3, "lesson13: pattern discovery must keep 3 sets");
  const det = between("export const DETECTIVE_Q", "export const DETECTIVE_NOTE");
  ok((det.match(/q: "/g) || []).length === 6, "lesson13: Grammar Detective must keep 6 questions");
  ok((det.match(/a: "/g) || []).length === 6, "lesson13: Grammar Detective must keep 6 extracted answers");
  ok(d13.includes("Yesterday, Noah visited an old railway station."), "lesson13: detective passage must be kept verbatim");
  const fin = between("export const FINAL_CHALLENGE ", "// ============================================================\n// أنواع الكتل");
  ok(fin.includes("3 جمل مثبتة"), "lesson13: final challenge must keep condition 1");
  ok(fin.includes("2 جمل منفية باستخدام didn't"), "lesson13: final challenge must keep condition 2");
  ok(fin.includes("2 أسئلة باستخدام Did"), "lesson13: final challenge must keep condition 3");
  ok(fin.includes("Yes, ... did.") && fin.includes("No, ... didn't."), "lesson13: final challenge must keep the short-answer requirement");
  ok((fin.match(/"(discover|find|build|meet|take|bring|write|see|buy|leave)"/g) || []).length === 10, "lesson13: final challenge must keep the 10 suggested verbs");

  // الملخص + القاعدة الذهبية + خريطة الدروس
  ok((between("export const SUMMARY_13", "// -------------------- القاعدة الذهبية").match(/formula: "/g) || []).length === 5, "lesson13: summary must keep 5 structures");
  ok((between("export const KEY_RULE_13", "// -------------------- خريطة الدروس").match(/ok: "/g) || []).length === 4, "lesson13: golden rule must keep its 4 ✅/❌ pairs");
  ok((between("export const ROADMAP_13", "export const ROADMAP_13_NEXT").match(/n: \d+/g) || []).length === 13, "lesson13: roadmap must list 13 lessons");
  ok(d13.includes("Past Simple — did / didn't والأسئلة"), "lesson13: roadmap must mark the current lesson");
  ok(d13.includes("ثم الانتقال إلى **was / were**"), "lesson13: roadmap must keep the next-step sentence");
}


// ---------- 9) الدرس 14 — Wh Questions والتطبيق الشامل ----------
{
  const d14 = src("lesson14", "data.ts");
  const t14 = src("lesson14", "Lesson14.tsx");

  ok(t14.includes("../../shared/bidi"), "lesson14: must import LatinRuns from shared/bidi");
  ok(!t14.includes("split(/(\\s+)/)"), "lesson14: per-token split must not exist (word-reversal engine)");
  ok((t14.match(/dir="ltr"/g) || []).length >= 15, `lesson14: LTR isolation must be used throughout (got ${(t14.match(/dir="ltr"/g) || []).length})`);
  ok(d14.includes("export const SOURCE_FIDELITY_MARKERS_14"), "lesson14: source-fidelity marker index exists");

  const sectionStart = d14.indexOf("export const SOURCE_SECTIONS");
  const sectionEnd = d14.indexOf("];", sectionStart);
  const sectionBlock = d14.slice(sectionStart, sectionEnd);
  ok((sectionBlock.match(/^\s+"/gm) || []).length >= 33, "lesson14: SOURCE_SECTIONS indexes every supplied section heading");
  for (const heading of [
    "1. قبل أن نبدأ",
    "2. ما هي Wh Questions",
    "3. القاعدة الأساسية",
    "9. Who",
    "12. انتبه إلى الفرق",
    "16. جدول التحكم",
    "19. لعبة تحويل الزمن",
    "20. تمارين المستوى الأول",
    "23. المستوى الرابع",
    "24. Grammar Detective",
    "25. IQ200 Challenge",
    "26. تحدي أصعب",
    "27. Mini Conversation",
    "28. التحدي النهائي",
    "خلاصة الدرس 14",
    "القاعدة الذهبية",
    "مكاننا في المنهج",
  ]) ok(d14.includes(heading), `lesson14: source section is indexed: ${heading}`);

  for (const formula of [
    "Subject + Past Verb",
    "Subject + didn't + Base Verb",
    "Did + Subject + Base Verb?",
    "Wh-word + did + Subject + Base Verb?",
    "Wh + did + Subject + Base Verb?",
  ]) ok(d14.includes(formula), `lesson14: required formula remains verbatim: ${formula}`);

  for (const exact of [
    "What did she buy?",
    "Where did Nora go?",
    "When did Lina arrive?",
    "Why did he leave early?",
    "How did she solve the puzzle?",
    "Who did Sara meet?",
    "Who visited the science museum?",
    "Who did Emma visit?",
    "Where did Emma go?",
    "What did Daniel find?",
    "When did Daniel find the key?",
    "To Canada.",
    "Noah traveled to Canada.",
    "She did go to the park.",
    "She went to the park.",
    "He didn't discover a hidden room.",
    "What did he discover?",
    "What did he take?",
    "did + Base Verb",
    "Where did she go?",
    "What did she write?",
    "What did he buy?",
    "Where did he went?",
    "What did she bought?",
    "Why did they left?",
    "How did he solved the problem?",
    "Who discovered an old map?",
    "Last Sunday, Maya traveled to a small coastal town with her family.",
    "The young scientist discovered a strange signal near the mountain three days ago.",
    "The explorers found an ancient door behind the waterfall last night.",
    "What did you do last weekend?",
    "We returned late in the evening.",
    "Wh + did + Subject + Base Verb?",
    "Past Simple — Wh Questions + تطبيق شامل",
  ]) ok(d14.includes(exact), `lesson14: supplied example/content remains: ${exact}`);

  ok((d14.match(/n: "[①②③④⑤⑥⑦]"/g) || []).length >= 7, "lesson14: all 7 objectives remain");
  ok((d14.match(/export const LEVEL1_14/) || []).length === 1 && (d14.match(/options:/g) || []).length >= 5, "lesson14: Level 1 keeps five option pairs and answer keys");
  ok((d14.match(/export const LEVEL2_14/) || []).length === 1 && (d14.match(/wh: "/g) || []).length >= 5, "lesson14: Level 2 keeps five Wh prompts and answer keys");
  ok((d14.match(/export const LEVEL3_14/) || []).length === 1 && (d14.match(/wrong: "/g) || []).length >= 5 && (d14.match(/correct: "/g) || []).length >= 5, "lesson14: Level 3 keeps five intentional errors and five corrections");
  ok((d14.match(/export const DETECTIVE_Q_14/) || []).length === 1 && (d14.match(/answer: "/g) || []).length >= 7, "lesson14: Grammar Detective keeps seven questions and answer keys");
  ok(d14.includes("أريد منك استخراج أكبر عدد ممكن من الأسئلة الصحيحة.") && d14.includes("بل يجب أن يكون تركيبه النحوي صحيحاً."), "lesson14: IQ200 instructions remain complete");
  ok((d14.match(/speaker: "/g) || []).length === 8, "lesson14: Mini Conversation keeps all eight lines");
  ok((d14.match(/\"(go|see|find|take|meet|bring|build|write|leave|discover)\"/g) || []).length >= 10, "lesson14: final challenge keeps all ten suggested verbs");
  ok((d14.match(/n: \d+, en:/g) || []).length === 14, "lesson14: roadmap keeps all 14 lessons");
  ok(d14.includes("التالي منطقياً: الدرس 15 = Past Simple مع was / were"), "lesson14: Lesson 15 preview remains complete");

  for (const rx of [
    /Base Verb\s*\+\s*did\s*\+\s*Subject/,
    /Past Verb\s*\+\s*Subject/,
    /Subject\s*\+\s*Did\s*\+/,
  ]) ok(!rx.test(d14) && !rx.test(t14), `lesson14: reversed formula is forbidden (${rx})`);
}

// ---------- النتيجة ----------
if (failures.length > 0) {
  console.error(`✕ English-direction check FAILED (${failures.length}/${checks}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ English-direction check passed (${checks} assertions, ${lessons.length} lessons).`);
