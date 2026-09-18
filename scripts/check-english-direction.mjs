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
ok(lessons.length === 24, `full-course regression inventory contains 24 lessons (got ${lessons.length})`);
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
  ["lesson23", "Cover"],
  ["lesson23", "SourceLine"],
  ["lesson23", "FormulaStrip"],
  ["lesson23", "CountingMachine"],
  ["lesson23", "MagicTest"],
  ["lesson23", "WaterLab"],
  ["lesson23", "ThereGoldenRule"],
  ["lesson23", "HowManyLab"],
  ["lesson23", "HowMuchLab"],
  ["lesson23", "BigBattle"],
  ["lesson23", "InformationLab"],
  ["lesson23", "MagicTable"],
  ["lesson23", "GoldenSummary"],
  ["lesson23", "Drill"],
  ["lesson23", "FinalBossEx"],
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

// ---------- 10) الدرس 17 — Possessive Pronouns ----------
{
  const d17 = src("lesson17", "data.ts");
  const t17 = src("lesson17", "Lesson17.tsx");

  ok(t17.includes("../../shared/bidi"), "lesson17: must import LatinRuns from shared/bidi");
  ok(!t17.includes("split(/(\\s+)/)"), "lesson17: per-token split must not exist (word-reversal engine)");
  const ltrCount = (t17.match(/dir="ltr"/g) || []).length;
  ok(ltrCount >= 40, `lesson17: English units must be wrapped with dir=ltr throughout (got ${ltrCount})`);
  ok(d17.includes("export const SOURCE_FIDELITY_MARKERS_17"), "lesson17: source-fidelity marker index exists");

  // فهرس أقسام المصدر: 45 قسماً مرقماً + الأهداف + 4 أقسام ختامية
  const secStart = d17.indexOf("export const SOURCE_SECTIONS");
  const secEnd = d17.indexOf("];", secStart);
  const secBlock = d17.slice(secStart, secEnd);
  const secItems = secBlock.match(/\n\s+"/g) || [];
  ok(secItems.length >= 50, `lesson17: SOURCE_SECTIONS must index every source section (got ${secItems.length}, expected 50)`);
  for (let n = 1; n <= 45; n++) {
    ok(new RegExp(`"\\S*\\s*${n}\\.\\s`).test(secBlock) || secBlock.includes(` ${n}. `), `lesson17: source section ${n} must be indexed`);
  }
  for (const heading of [
    "أهداف الدرس",
    "1. تذكير سريع من الدرس 16",
    "2. ما المشكلة التي سنحلها اليوم؟",
    "3. ما هو Possessive Pronoun؟",
    "4. الخريطة الأساسية",
    "5. الفرق الأساسي",
    "6. MY → MINE",
    "7. YOUR → YOURS",
    "8. HIS → HIS",
    "9. HER → HERS",
    "10. OUR → OURS",
    "11. THEIR → THEIRS",
    "12. لاحظ شيئاً مهماً جداً",
    "13. مقارنة كاملة",
    "14. خطأ مشهور جداً",
    "17. حركة التحويل السحرية",
    "18. مثال IQ200",
    "19. ثلاثة أنظمة للملكية",
    "22. السؤال المهم: Whose?",
    "25. الفرق بين MY و MINE",
    "30. خطأ شديد الشيوع",
    "32. his حالة خاصة",
    "33. ماذا عن IT؟",
    "35. الملكية لا تعتمد على عدد الأشياء",
    "36. تمارين المستوى الأول",
    "39. المستوى الرابع — صحح الأخطاء",
    "40. المستوى الخامس — Whose?",
    "41. المستوى السادس — التحويل",
    "42. Grammar Detective",
    "43. IQ200 Challenge",
    "44. IQ200 Challenge 2",
    "45. التحدي النهائي",
    "الخلاصة الكبرى",
    "قاعدة IQ200",
    "أهم 5 أخطاء ممنوعة",
    "خريطة المنهج بعد الدرس 17",
  ]) ok(d17.includes(heading), `lesson17: source section is indexed: ${heading}`);

  // المعادلات محفوظة بترتيبها الإنجليزي
  for (const formula of [
    "Possessive Adjective + Noun",
    "MY + NOUN",
    "MINE = وحدها",
    "my + noun",
    "my → mine",
    "my book → mine",
    "your bag → yours",
    "her phone → hers",
    "our house → ours",
    "their car → theirs",
    "her + noun",
    "its + noun → ???",
    "Whose = لِمَن؟",
    "Whose...?",
  ]) ok(d17.includes(formula), `lesson17: required formula remains verbatim: ${formula}`);

  // الجمل المفتاحية بترتيبها الصحيح
  for (const exact of [
    "This is my book.",
    "This book is mine.",
    "This is my notebook.",
    "This notebook is mine.",
    "This is your jacket.",
    "This jacket is yours.",
    "This is his laptop.",
    "This laptop is his.",
    "This is her camera.",
    "This camera is hers.",
    "This is our classroom.",
    "This classroom is ours.",
    "This is their house.",
    "This house is theirs.",
    "These books are theirs.",
    "Whose phone is this?",
    "Whose book is this?",
    "Whose jacket is that?",
    "It's mine.",
    "It's hers.",
    "It's theirs.",
    "Yes, it is mine.",
    "Yes, it is my backpack.",
    "Is this your backpack?",
    "This is Sara's notebook.",
    "This is Alex's laptop.",
    "Whose laptop is this?",
    "The robot moved its arm.",
    "His car is fast.",
    "The car is his.",
    "Their car is new.",
    "They're happy.",
    "You're happy.",
    "The book is yours.",
    "Emma brought her camera to the competition.",
  ]) ok(d17.includes(exact), `lesson17: supplied sentence remains verbatim: ${exact}`);

  // الأهداف الثمانية
  {
    const objBlock = d17.slice(d17.indexOf("export const OBJECTIVES_17"), d17.indexOf("// -------------------- 1."));
    ok((objBlock.match(/\bn: "[①②③④⑤⑥⑦⑧]"/g) || []).length === 8, "lesson17: all 8 objectives remain");
  }

  // التمارين — العدد ومفاتيح الحل
  const between = (from, to) => {
    const a = d17.indexOf(from);
    const b = to ? d17.indexOf(to, a + 1) : -1;
    return a === -1 ? "" : d17.slice(a, b === -1 ? a + 20000 : b);
  };
  const l1 = between("export const LEVEL1_17", "export const LEVEL2_17:");
  ok((l1.match(/\{ n: "/g) || []).length === 6, "lesson17: level 1 keeps 6 items");
  ok((l1.match(/answer: \d/g) || []).length === 6, "lesson17: level 1 keeps 6 answer keys");
  const l2 = between("export const LEVEL2_17:", "export const LEVEL3_17");
  ok((l2.match(/\{ n: "/g) || []).length === 6, "lesson17: level 2 keeps 6 transforms");
  ok((l2.match(/answer: "/g) || []).length === 6, "lesson17: level 2 keeps 6 answer keys");
  const l3 = between("export const LEVEL3_17", "export const LEVEL4_17");
  ok((l3.match(/\{ n: "/g) || []).length === 6, "lesson17: level 3 keeps 6 items");
  const l4 = between("export const LEVEL4_17", "export const LEVEL5_17:");
  ok((l4.match(/wrong: "/g) || []).length === 6 && (l4.match(/correct: "/g) || []).length === 6, "lesson17: level 4 keeps 6 errors and 6 corrections");
  const l5 = between("export const LEVEL5_17:", "export const LEVEL6_17:");
  ok((l5.match(/\{ n: "/g) || []).length === 5, "lesson17: Whose level keeps 5 items");
  ok((l5.match(/answer: "/g) || []).length === 5, "lesson17: Whose level keeps 5 answer keys");
  const l6 = between("export const LEVEL6_17:", "export const DETECTIVE_PASSAGE_17");
  ok((l6.match(/\{ n: "/g) || []).length === 5, "lesson17: transformation level keeps 5 items");
  ok((d17.match(/\{ n: "①", word: "her"|\{ n: "②", word: "his"|\{ n: "③", word: "their"|\{ n: "④", word: "yours"|\{ n: "⑤", word: "mine"|\{ n: "⑥", word: "hers"/g) || []).length === 6, "lesson17: Grammar Detective keeps all 6 targets");
  ok((between("export const IQ200_CHALLENGE_17", "export const IQ200_CHALLENGE2_17").match(/\{ n: "①"|\{ n: "②"|\{ n: "③"/g) || []).length === 3, "lesson17: IQ200 keeps its 3 transformations");
  ok((d17.match(/\{ n: \d, wrong: "/g) || []).length === 5, "lesson17: the 5 forbidden errors are all kept");
  ok((between("export const ROADMAP_17:", "export const ROADMAP_17_CLOSING").match(/n: \d+/g) || []).length === 17, "lesson17: roadmap lists all 17 lessons");
  ok(d17.includes("Possessive Pronouns — نحن هنا"), "lesson17: roadmap marks the current lesson");
  ok(d17.includes("Irregular Plurals") && d17.includes("the children → the children's"), "lesson17: roadmap keeps the next-step preview");
  ok((d17.match(/my|mine|your|yours|his|her|hers|our|ours|their/g) || []).length > 0 && d17.includes("theirs"), "lesson17: final challenge keeps theirs as the alternative");
  const fin = between("export const FINAL_CHALLENGE_17", "// ============================================================\n// الخاتمة");
  ok((fin.match(/"/g) || []).length > 20 && fin.includes("Whose...?"), "lesson17: final challenge keeps its word list and the Whose requirement");

  // لا ترتيب معكوس للإنجليزية — الأخطاء المقصودة مستثناة
  const wrongBlockStart = d17.indexOf("export const INTENTIONALLY_WRONG_17");
  const wrongBlockEnd = d17.indexOf("];", wrongBlockStart);
  const scannable = d17.slice(0, wrongBlockStart) + d17.slice(wrongBlockEnd === -1 ? d17.length : wrongBlockEnd);
  const PRONOUN_NOUN = /\b(mine|yours|hers|ours|theirs)\s+(book|books|bag|bags|car|cars|house|houses|jacket|jackets|notebook|notebooks|camera|cameras|school|table|project|bicycle|bicycles|seat|idea|backpack|room|team|phone|phones)\b/gi;
  const offenders = [];
  for (const line of scannable.split("\n")) {
    PRONOUN_NOUN.lastIndex = 0;
    const m = PRONOUN_NOUN.exec(line);
    if (m && !line.includes("❌") && !line.includes("wrong:") && !line.includes("stem:") && !line.includes("ok: false")) offenders.push(line.trim());
  }
  ok(offenders.length === 0, `lesson17: possessive pronoun must never precede a noun outside the intentional-error list (${offenders.join(" | ")})`);

  for (const rx of [/\bbook\s+my\b/, /\bbag\s+your\b/, /\bcar\s+their\b/, /\bhouse\s+our\b/, /\bcamera\s+her\b/, /\bmine\s+is\s+book\b/]) {
    ok(!rx.test(d17) && !rx.test(t17), `lesson17: reversed English must not appear (${rx})`);
  }
  const GB = String.fromCodePoint(0x1f1ec, 0x1f1e7);
  ok(!d17.includes(GB) && !t17.includes(GB), "lesson17: no GB flag emoji anywhere in the lesson");
}

// ---------- 11) الدرس 18 — Plural Nouns ----------
{
  const d18 = src("lesson18", "data.ts");
  const t18 = src("lesson18", "Lesson18.tsx");

  ok(t18.includes("../../shared/bidi"), "lesson18: must import LatinRuns from shared/bidi");
  ok(!t18.includes("split(/(\\s+)/)"), "lesson18: per-token split must not exist (word-reversal engine)");
  const ltrCount18 = (t18.match(/dir="ltr"/g) || []).length;
  ok(ltrCount18 >= 40, `lesson18: English units must be wrapped with dir=ltr throughout (got ${ltrCount18})`);
  ok(d18.includes("export const SOURCE_FIDELITY_MARKERS_18"), "lesson18: source-fidelity marker index exists");

  // فهرس أقسام المصدر: 19 قسماً مرقماً + الأهداف + 3 أقسام ختامية
  const secStart18 = d18.indexOf("export const SOURCE_SECTIONS");
  const secEnd18 = d18.indexOf("];", secStart18);
  const secBlock18 = d18.slice(secStart18, secEnd18);
  const secItems18 = secBlock18.match(/\n\s+"/g) || [];
  ok(secItems18.length >= 23, `lesson18: SOURCE_SECTIONS must index every source section (got ${secItems18.length}, expected 23)`);
  for (let n = 1; n <= 19; n++) {
    ok(secBlock18.includes(` ${n}. `), `lesson18: source section ${n} must be indexed`);
  }
  for (const heading of [
    "أهداف الدرس",
    "1. ما معنى Singular و Plural؟",
    "2. الجمع العادي Regular Plural",
    "3. متى نضيف ES بدل S؟",
    "4. الكلمات التي تنتهي بـ Y",
    "5. بعض الكلمات التي تنتهي بـ F أو FE",
    "6. الآن نصل إلى الوحوش الحقيقية",
    "7. لا تحفظ الكلمات منفصلة... احفظها كعائلات",
    "8. الجمع وعلاقته بـ IS / ARE",
    "9. الجمع مع WAS / WERE",
    "10. الجمع وعلاقته بـ Present Simple",
    "11. أخطاء شائعة جدًا",
    "12. Grammar Detective",
    "13. Challenge 1 — حوّل إلى جمع",
    "14. Challenge 2 — اختر الإجابة الصحيحة",
    "15. Challenge 3 — is or are?",
    "16. IQ200 Challenge",
    "17. IQ200 — لماذا؟",
    "18. FINAL BOSS — تحدي المرحلة",
    "19. Mini Game — Singular or Plural?",
    "خلاصة الدرس",
    "أهم قاعدة يجب أن تخرج بها اليوم",
    "أين وصلنا في المنهج؟",
  ]) ok(d18.includes(heading), `lesson18: source section is indexed: ${heading}`);

  // القواعد والمعادلات محفوظة بترتيبها الإنجليزي
  for (const formula of [
    "Noun + s",
    "a / an",
    "y → ies",
    "f / fe → ves",
    "He / She / It → verb + s",
    "They → base verb",
    "is / was",
    "are / were",
    "Singular → Plural",
    "Singular → verb + s",
    "Plural → base verb",
    "S = Singular",
    "P = Plural",
  ]) ok(d18.includes(formula), `lesson18: required formula remains verbatim: ${formula}`);

  // الجمل والأمثلة المفتاحية بترتيبها الصحيح
  for (const exact of [
    "I have a book.",
    "I have two books.",
    "a book",
    "a car",
    "an apple",
    "an orange",
    "a books",
    "an apples",
    "boxs ❌",
    "box → boxes ✅",
    "book → books",
    "car → cars",
    "pen → pens",
    "student → students",
    "robot → robots",
    "window → windows",
    "planet → planets",
    "cat → cats",
    "dog → dogs",
    "chair → chairs",
    "table → tables",
    "phone → phones",
    "computer → computers",
    "river → rivers",
    "star → stars",
    "game → games",
    "friend → friends",
    "bus → buses",
    "class → classes",
    "dish → dishes",
    "brush → brushes",
    "watch → watches",
    "fox → foxes",
    "tomato → tomatoes",
    "potato → potatoes",
    "baby → babies",
    "city → cities",
    "story → stories",
    "family → families",
    "country → countries",
    "library → libraries",
    "boy → boys",
    "toy → toys",
    "day → days",
    "key → keys",
    "monkey → monkeys",
    "knife → knives",
    "wife → wives",
    "life → lives",
    "leaf → leaves",
    "wolf → wolves",
    "shelf → shelves",
    "half → halves",
    "roof → roofs",
    "chief → chiefs",
    "safe → safes",
    "The man is tall.",
    "The men are tall.",
    "The woman is a doctor.",
    "The women are doctors.",
    "The child is happy.",
    "The children are happy.",
    "One person is waiting.",
    "Five people are waiting.",
    "I have one tooth.",
    "I have many teeth.",
    "My foot is cold.",
    "My feet are cold.",
    "I see one mouse.",
    "I see two mice.",
    "one sheep",
    "five sheep",
    "one fish",
    "two fish",
    "I can see three fish.",
    "The boy is happy.",
    "The boys are happy.",
    "The child is tired.",
    "The children are tired.",
    "The woman is busy.",
    "The women are busy.",
    "The children is happy.",
    "The child was tired.",
    "The children were tired.",
    "The man was angry.",
    "The men were angry.",
    "The woman was at home.",
    "The women were at home.",
    "The boy plays football.",
    "The boys play football.",
    "The girl works here.",
    "The girls work here.",
    "The student studies English.",
    "The students study English.",
    "The child plays outside.",
    "The children play outside.",
    "The children play.",
    "The children plays.",
    "two book",
    "a books",
    "three childs",
    "two womans",
    "five tooths",
    "The children is happy.",
    "The boys plays football.",
    "The men works here.",
    "two books",
    "three children",
    "two women",
    "five teeth",
    "The children are happy.",
    "The boys play football.",
    "The men work here.",
    "I have two book.",
    "Three child are playing.",
    "The womans are doctors.",
    "The boys plays chess.",
    "She has five tooths.",
    "The men is outside.",
    "I can see two mouses.",
    "There are three boxs.",
    "I have two books.",
    "Three children are playing.",
    "The women are doctors.",
    "The boys play chess.",
    "She has five teeth.",
    "The men are outside.",
    "I can see two mice.",
    "There are three boxes.",
    "The children plays in the garden.",
    "The child play in the garden.",
    "The men is very strong.",
    "The woman are doctors.",
    "Two mouse are under the table.",
    "A children is waiting outside.",
    "Three person are talking.",
    "The boys studies English.",
    "The children play football.",
    "The child plays football.",
    "children = plural",
    "plural = they",
    "They play.",
    "child = singular",
    "singular = he/she/it",
    "He plays.",
    "Yesterday, a child walked into a park. He saw two mice near some trees. A woman was sitting on a bench, and three children were playing nearby. The children had two balls and the woman had a small box.",
    "The children were playing.",
    "The children was playing.",
    "Ali's book",
    "Sara's phone",
    "the boy's bicycle",
    "the boys' bicycles",
    "the child's toy",
    "the children's toys",
    "Plural Nouns — أنت هنا",
  ]) ok(d18.includes(exact), `lesson18: supplied sentence remains verbatim: ${exact}`);

  // الأهداف التسعة
  ok((d18.match(/n: "[①②③④⑤⑥⑦⑧⑨]"/g) || []).length >= 9, "lesson18: all 9 objectives remain");

  const between18 = (from, to) => {
    const a = d18.indexOf(from);
    const b = to ? d18.indexOf(to, a + 1) : -1;
    return a === -1 ? "" : d18.slice(a, b === -1 ? a + 20000 : b);
  };

  // التمارين — العدد ومفاتيح الحل
  const c1 = between18("export const CHALLENGE1_18", "export const CHALLENGE1_BANK_18");
  ok((c1.match(/\{ n: "/g) || []).length === 10, "lesson18: Challenge 1 keeps 10 words");
  ok((c1.match(/answer: "/g) || []).length === 10, "lesson18: Challenge 1 keeps 10 answer keys");
  const c2 = between18("export const CHALLENGE2_18", "export const CHALLENGE3_18");
  ok((c2.match(/\{ n: "/g) || []).length === 5, "lesson18: Challenge 2 keeps 5 questions");
  ok((c2.match(/options: \[/g) || []).length === 5, "lesson18: Challenge 2 keeps A/B/C choices");
  const c3 = between18("export const CHALLENGE3_18", "export const IQ200_18");
  ok((c3.match(/\{ n: "/g) || []).length === 8, "lesson18: Challenge 3 keeps 8 is/are items");
  const det = between18("export const DETECTIVE_18", "export const CHALLENGE1_18");
  ok((det.match(/wrong: "/g) || []).length === 8, "lesson18: Grammar Detective keeps 8 wrong sentences");
  ok((det.match(/correct: "/g) || []).length === 8, "lesson18: Grammar Detective keeps 8 corrections");
  const iq = between18("export const IQ200_18", "export const IQ200_WHY_18");
  ok((iq.match(/wrong: "/g) || []).length === 8, "lesson18: IQ200 challenge keeps 8 sentences");
  const boss = between18("export const FINAL_BOSS_18", "export const MINI_GAME_18");
  ok((boss.match(/n: "/g) || []).length === 8, "lesson18: Final Boss keeps 8 questions");
  ok((boss.match(/word: "/g) || []).length === 6, "lesson18: Final Boss keeps 6 investigation targets");
  const mg = between18("export const MINI_GAME_18", "// ============================================================\n// الخاتمة");
  ok((mg.match(/\{ n: "/g) || []).length === 12, "lesson18: Mini Game keeps 12 words");
  const monsters = between18("export const MONSTERS_18", "export const SAME_FORM_18");
  ok((monsters.match(/n: "/g) || []).length === 9, "lesson18: monster zone keeps 9 irregular nouns");
  const sf = between18("export const SAME_FORM_18", "export const SAME_FORM_EXTRA_18");
  ok((sf.match(/n: "/g) || []).length === 2, "lesson18: same-form zone keeps sheep + fish");
  ok((between18("export const ROADMAP_18:", "export const ROADMAP_18_CLOSING").match(/n: \d+/g) || []).length === 18, "lesson18: roadmap lists all 18 lessons");

  // لا ترتيب معكوس للإنجليزية — الأخطاء المقصودة مستثناة
  const wrongStart18 = d18.indexOf("export const INTENTIONALLY_WRONG_18");
  const wrongEnd18 = d18.indexOf("];", wrongStart18);
  const scannable18 = d18.slice(0, wrongStart18) + d18.slice(wrongEnd18 === -1 ? d18.length : wrongEnd18);
  for (const rx of [/\bbooks\s+a\b/, /\bapples\s+an\b/, /\bplay\s+boys\s+The\b/, /\bplay\s+children\s+The\b/, /\bwas\s+children\s+The\b/]) {
    const m = scannable18.match(rx);
    ok(!m, `lesson18: reversed English must not appear (${rx})${m ? ` — found: ${m[0]}` : ""}`);
  }

  const GB18 = String.fromCodePoint(0x1f1ec, 0x1f1e7);
  ok(!d18.includes(GB18) && !t18.includes(GB18), "lesson18: no GB flag emoji anywhere in the lesson");
}

// ---------- 11.5) الدرس 19 — Possessive Nouns ----------
{
  const d19 = src("lesson19", "data.ts");
  const t19 = src("lesson19", "Lesson19.tsx");

  ok(t19.includes("../../shared/bidi"), "lesson19: must import LatinRuns from shared/bidi");
  ok(!t19.includes("split(/(\\s+)/)"), "lesson19: per-token split must not exist (word-reversal engine)");
  const ltrCount19 = (t19.match(/dir="ltr"/g) || []).length;
  ok(ltrCount19 >= 40, `lesson19: English units must be wrapped with dir=ltr throughout (got ${ltrCount19})`);
  ok(d19.includes("export const SOURCE_FIDELITY_MARKERS_19"), "lesson19: source-fidelity marker index exists");

  // فهرس أقسام المصدر: 14 قسماً مرقماً + الأهداف + نظام القواعد + 8 أقسام ختامية/تمارين
  const secStart19 = d19.indexOf("export const SOURCE_SECTIONS");
  const secEnd19 = d19.indexOf("];", secStart19);
  const secBlock19 = d19.slice(secStart19, secEnd19);
  const secItems19 = secBlock19.match(/\n\s+"/g) || [];
  ok(secItems19.length >= 26, `lesson19: SOURCE_SECTIONS must index every source section (got ${secItems19.length}, expected 26)`);
  for (let n = 1; n <= 14; n++) {
    ok(secBlock19.includes(` ${n}. `), `lesson19: source section ${n} must be indexed`);
  }
  for (const heading of [
    "أهداف الدرس",
    "1. ما معنى Possessive Noun؟",
    "2. كيف نفكر في 's؟",
    "3. الاسم المفرد + 's",
    "4. ماذا لو كان عندنا أكثر من شخص؟",
    "5. لا تنظر إلى العلامة فقط!",
    "6. ماذا يحدث مع الجمع الشاذ؟",
    "7. الرجل والرجال",
    "8. المرأة والنساء",
    "9. الشخص والأشخاص",
    "10. الأسنان والقدم",
    "نظام القواعد الكامل",
    "11. الملكية لا تعني دائمًا",
    "12. Possessive Noun vs Possessive Adjective",
    "13. النظام الثلاثي للملكية",
    "14. انتبه: apostrophe ليست جمعًا!",
    "Grammar Detective",
    "Challenge 1 — اختر الصحيح",
    "Challenge 2 — حوّل إلى Possessive",
    "IQ200 Challenge",
    "IQ200 — لغز المعنى",
    "FINAL BOSS",
    "اختبار السرعة",
    "الخلاصة الكبرى",
    "قاعدة IQ200 النهائية",
    "خريطة المنهج حتى الآن",
  ]) ok(d19.includes(heading), `lesson19: source section is indexed: ${heading}`);

  // القواعد والمعادلات محفوظة بترتيبها الإنجليزي
  for (const formula of [
    "Singular Noun + 's",
    "boy → boy's",
    "girl → girl's",
    "child → child's",
    "man → man's",
    "woman → woman's",
    "boys → boys'",
    "girls → girls'",
    "students → students'",
    "teachers → teachers'",
    "children → children's",
    "men → men's",
    "women → women's",
    "people → people's",
    "child → children",
    "man → men",
    "woman → women",
    "person → people",
    "tooth → teeth",
    "foot → feet",
    "Singular → Possessive",
    "Plural → Possessive",
  ]) ok(d19.includes(formula), `lesson19: required formula remains verbatim: ${formula}`);

  // الجمل والأمثلة المفتاحية بترتيبها الصحيح
  for (const exact of [
    "Ali's book",
    "The book belongs to Ali.",
    "Ali book ❌",
    "Sara's phone",
    "Omar's bicycle",
    "Lina's notebook",
    "The dog's tail",
    "The teacher's desk",
    "the book of Ali",
    "the camera of Sara",
    "the tail of the dog",
    "Maya's backpack",
    "James's book",
    "James' book",
    "The boy's bag.",
    "The boys' bags.",
    "The girl's bicycle.",
    "The girls' bicycles.",
    "The student's book.",
    "The students' books.",
    "The teacher's room.",
    "The teachers' room.",
    "The students's books ❌",
    "The students' books. ✅",
    "The child's toy.",
    "The children's toys.",
    "childrens' ❌",
    "children's ✅",
    "The man's jacket.",
    "The men's jackets.",
    "The woman's bag.",
    "The women's bags.",
    "The person's name.",
    "The people's opinions.",
    "The tooth's shape.",
    "The teeth's condition.",
    "The man's foot.",
    "The men's feet.",
    "Ali's book",
    "students' books",
    "children's toys",
    "the school's name",
    "the city's center",
    "the company's website",
    "the dog's name",
    "His book",
    "Sara's laptop.",
    "Her laptop.",
    "The laptop is hers.",
    "Omar's phone.",
    "His phone.",
    "The phone is his.",
    "Maya's notebook.",
    "Her notebook.",
    "The notebook is hers.",
    "The students' classroom.",
    "Their classroom.",
    "The classroom is theirs.",
    "The book's cover.",
    "The books are interesting.",
    "one boy's bicycle",
    "two boys' bicycles",
    "The childs toy is broken.",
    "The childrens toys are outside.",
    "The boys's room is large.",
    "The girls bag is red.",
    "The students's books are on the desk.",
    "I like the dogs' tail.",
    "The woman bag is expensive.",
    "The mens shoes are black.",
    "The child's toy is broken.",
    "The children's toys are outside.",
    "The boys' room is large.",
    "The girl's bag is red.",
    "The students' books are on the desk.",
    "I like the dog's tail.",
    "The woman's bag is expensive.",
    "The men's shoes are black.",
    "the boy's bike",
    "the boys bike",
    "the boys' bike",
    "the boy's bikes",
    "the boys' bikes",
    "the boys's bikes",
    "the child's toy",
    "the childrens' toy",
    "the child toy",
    "the childs' toys",
    "the children's toys",
    "the childrens toys",
    "the book of Ali",
    "the bicycle of Sara",
    "the toys of the children",
    "the house of the men",
    "the bags of the students",
    "the car of the woman",
    "Ali's book",
    "Sara's bicycle",
    "the men's house",
    "the students' bags",
    "the woman's car",
    "teacher's",
    "teachers'",
    "child's",
    "children's",
    "man's",
    "men's",
    "girl's",
    "girls'",
    "The boy's shoes are dirty.",
    "The boys' shoes are dirty.",
    "The child's toys.",
    "The children's toys.",
    "Liam has a small dog. The dog's name is Rocket. Liam also has two sisters. The girls' room is next to Liam's room. Their mother keeps the children's toys in a large box.",
    "Liam's room",
    "girls' room",
    "girl's room",
    "His room.",
    "The boy's are playing.",
    "The boys' are playing.",
    "The boys' bags are heavy.",
    "The childrens' books are new.",
    "The children's books are new.",
    "My sister's phone is broken.",
    "My sisters' phones are broken.",
    "My sister's",
    "My sisters'",
    "Sara's book",
    "The book is hers.",
    "Their classroom",
    "The toys are theirs.",
    "my book",
    "her phone",
    "their house",
    "The book is mine.",
    "The phone is hers.",
    "The house is theirs.",
    "Possessive Nouns — 's / s' / Irregular Plurals",
  ]) ok(d19.includes(exact), `lesson19: supplied sentence remains verbatim: ${exact}`);

  const between19 = (from, to) => {
    const a = d19.indexOf(from);
    const b = to ? d19.indexOf(to, a + 1) : -1;
    return a === -1 ? "" : d19.slice(a, b === -1 ? a + 20000 : b);
  };

  // التمارين — العدد ومفاتيح الحل
  const det19 = between19("export const DETECTIVE_19", "export const CHALLENGE1_19");
  ok((det19.match(/wrong: "/g) || []).length === 8, "lesson19: Grammar Detective keeps 8 wrong sentences");
  ok((det19.match(/correct: "/g) || []).length === 8, "lesson19: Grammar Detective keeps 8 corrections");
  const c19_1 = between19("export const CHALLENGE1_19", "export const CHALLENGE2_19");
  ok((c19_1.match(/context: "/g) || []).length === 4, "lesson19: Challenge 1 keeps 4 questions");
  ok((c19_1.match(/answer: \d/g) || []).length === 4, "lesson19: Challenge 1 keeps 4 answer keys");
  ok(c19_1.includes('answer: 0') && c19_1.includes("answer: 1"), "lesson19: Challenge 1 keeps the A/B/A/B key pattern");
  const c19_2 = between19("export const CHALLENGE2_19", "export const IQ200_CHALLENGE_19");
  ok((c19_2.match(/of: "/g) || []).length === 6, "lesson19: Challenge 2 keeps 6 transformations");
  ok((c19_2.match(/answer: "/g) || []).length === 6, "lesson19: Challenge 2 keeps 6 answer keys");
  const iq19 = between19("export const IQ200_CHALLENGE_19", "export const IQ200_MEANING_19");
  ok((iq19.match(/\{ n: "/g) || []).length === 8, "lesson19: IQ200 challenge keeps 8 items");
  ok((iq19.match(/answer: "/g) || []).length === 8, "lesson19: IQ200 challenge keeps 8 answer keys");
  const boss19 = between19("export const FINAL_BOSS_19", "export const SPEED_TEST_19");
  ok(boss19.includes("Liam has a small dog."), "lesson19: Final Boss passage must be kept verbatim");
  ok((boss19.match(/n: "/g) || []).length === 7, "lesson19: Final Boss keeps 7 questions");
  const sp19 = between19("export const SPEED_TEST_19", "export const SUMMARY_19");
  ok((sp19.match(/\{ n: "/g) || []).length === 7, "lesson19: Speed Test keeps 7 sentences");
  ok((between19("export const ROADMAP_19:", "export const ROADMAP_19_CLOSING").match(/n: \d+/g) || []).length === 19, "lesson19: roadmap lists all 19 lessons");
  ok(d19.includes("Possessive Nouns — 's / s' / Irregular Plurals"), "lesson19: roadmap marks the current lesson");
  ok(
    (between19("export const OBJECTIVES_19", "export const S1_DEFINITION_19").match(/n: "[①②③④⑤⑥⑦]"/g) || []).length === 7,
    "lesson19: all 7 objectives remain"
  );

  // لا ترتيب معكوس للإنجليزية — الأخطاء المقصودة مستثناة
  const wrongStart19 = d19.indexOf("export const INTENTIONALLY_WRONG_19");
  const wrongEnd19 = d19.indexOf("];", wrongStart19);
  const scannable19 = d19.slice(0, wrongStart19) + d19.slice(wrongEnd19 === -1 ? d19.length : wrongEnd19);
  for (const rx of [/\bboys\s+The\b/, /\bbooks\s+The\b/, /\btoys\s+The\b/, /book's\s+are\s+playing/]) {
    const m = scannable19.match(rx);
    ok(!m, `lesson19: reversed English must not appear (${rx})${m ? ` — found: ${m[0]}` : ""}`);
  }

  const GB19 = String.fromCodePoint(0x1f1ec, 0x1f1e7);
  ok(!d19.includes(GB19) && !t19.includes(GB19), "lesson19: no GB flag emoji anywhere in the lesson");
}

// ---------- 11.6) الدرس 20 — Demonstratives / This / That / These / Those ----------
{
  const d20 = src("lesson20", "data.ts");
  const t20 = src("lesson20", "Lesson20.tsx");
  const app = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "src", "App.tsx"), "utf8");
  const bank = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "src", "shared", "quizBank.ts"), "utf8");
  const finalQuiz = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "src", "shared", "FinalQuiz.tsx"), "utf8");
  const teachers = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "src", "shared", "TeachersSpace.tsx"), "utf8");

  // واجهة عربية RTL، وكل تشغيل إنجليزي يستخدم العازل المشترك أو حاوية LTR صريحة.
  ok(t20.includes("../../shared/bidi"), "lesson20: must import LatinRuns from shared/bidi");
  ok(!t20.includes("split(/(\\s+)/)"), "lesson20: per-token split must not exist (word-reversal engine)");
  const ltrCount20 = (t20.match(/dir="ltr"/g) || []).length;
  ok(ltrCount20 >= 40, `lesson20: English units must be LTR-isolated throughout (got ${ltrCount20})`);
  ok(t20.includes('dir="rtl"'), "lesson20: Arabic lesson shell must remain RTL");

  // مصدر الدرس: 41 عنوانًا، 41 mapping إلى الشرائح، ثم FinalQuiz وخاتمة.
  ok(d20.includes("export const SOURCE_NUMBERED_COUNT = 41"), "lesson20: source-section count is exactly 41");
  ok(d20.includes("export const SOURCE_FIDELITY_MARKERS_20"), "lesson20: source-fidelity marker index exists");
  const secStart20 = d20.indexOf("export const SOURCE_SECTIONS");
  const secEnd20 = d20.indexOf("];", secStart20);
  const secBlock20 = d20.slice(secStart20, secEnd20);
  const headings20 = secBlock20.match(/\n\s+"/g) || [];
  ok(headings20.length === 41, `lesson20: SOURCE_SECTIONS contains all 41 headings (got ${headings20.length})`);
  for (const heading of [
    "أهداف الدرس",
    "الفكرة الأساسية",
    "النظام السحري",
    "احفظها بهذه الطريقة",
    "مثال بسيط جدًا",
    "الجدول الأساسي",
    "This",
    "That",
    "These",
    "Those",
    "الآن لدينا النظام كاملًا",
    "العلاقة مع درس الجمع",
    "ماذا عن الأشياء غير العاقلة؟",
    "This/That + اسم",
    "This/That كضمير",
    "الأسئلة",
    "الإجابات القصيرة",
    "IQ200 Connection",
    "This + Possessive Adjective",
    "This + Possessive Noun",
    "This vs These",
    "That vs Those",
    "لا تحفظها منفصلة!",
    "كيف تختار الكلمة؟",
    "مثال IQ200",
    String.raw`هل \"بعيد\" يعني فقط المسافة؟`,
    "This يمكن أن تشير إلى الوقت أيضًا",
    "النفي",
    "الأسئلة مع الملكية",
    "Grammar Detective",
    "Challenge 1 — اختر الكلمة",
    "Challenge 2 — أكمل بـ is أو are",
    "IQ200 Challenge",
    "IQ200 Challenge 2",
    "FINAL BOSS",
    "لعبة السرعة",
    "الاختبار الذهبي",
    "تحدي بناء الجمل",
    "الخلاصة",
    "المستوى الذي وصلنا إليه",
    "خريطة المنهج",
  ]) ok(secBlock20.includes(heading), `lesson20: source section is indexed: ${heading}`);
  ok((d20.match(/sourceIndex:/g) || []).length === 41, "lesson20: every source section has one slide mapping");
  ok(d20.includes("{ kind: \"quiz\"") && d20.includes("{ kind: \"closing\""), "lesson20: shared quiz and closing slides are registered");

  // الأمثلة والأخطاء المتعمدة يجب أن تبقى حرفيًا، مع التصحيح المنفصل في البيانات.
  for (const exact of [
    "This books ❌",
    "This children ❌",
    "These child ❌",
    "Those car is red ❌",
    "This are my shoes ❌",
    "That are my friends ❌",
    "These books. ✅",
    "This apple. ✅",
    "These apples. ✅",
    "This child. ✅",
    "These children. ✅",
    "That woman. ✅",
    "Those women. ✅",
    "This man.",
    "These men.",
    "This is Ali's notebook.",
    "That is Sara's bicycle.",
    "These are the boys' shoes.",
    "Those are the children's toys.",
    "It's my new camera.",
    "That's my brother's telescope.",
    "Those ___ the students' bags.",
    "Those are the children's bicycles.",
  ]) ok(d20.includes(exact), `lesson20: supplied unit remains verbatim: ${exact}`);
  ok(d20.includes("export const INTENTIONALLY_WRONG_20"), "lesson20: intentional-error inventory is explicit");

  // كل تفاعل مصدره موجود بعدد عناصره ومفتاح حلّه، وليس نصًا ثابتًا فقط.
  const between20 = (from, to) => {
    const a = d20.indexOf(from);
    const b = to ? d20.indexOf(to, a + 1) : -1;
    return a === -1 ? "" : d20.slice(a, b === -1 ? a + 20000 : b);
  };
  const detective20 = between20("export const GRAMMAR_DETECTIVE_20", "export const CHALLENGE1_20");
  ok((detective20.match(/wrong: "/g) || []).length === 8 && (detective20.match(/correct: "/g) || []).length === 8, "lesson20: Grammar Detective keeps 8 errors and 8 corrections");
  const c1_20 = between20("export const CHALLENGE1_20", "export const CHALLENGE2_20");
  ok((c1_20.match(/stem: "/g) || []).length === 6 && (c1_20.match(/answer: \d/g) || []).length === 6, "lesson20: Challenge 1 keeps 6 choice tasks and keys");
  const c2_20 = between20("export const CHALLENGE2_20", "export const IQ200_CHALLENGE_20");
  ok((c2_20.match(/stem: "/g) || []).length === 8 && (c2_20.match(/answer: "/g) || []).length === 8, "lesson20: Challenge 2 keeps 8 is/are tasks and keys");
  const iq20 = between20("export const IQ200_CHALLENGE_20", "export const IQ200_CHALLENGE2_20");
  ok((iq20.match(/blank: "/g) || []).length === 4 && (iq20.match(/answer: "/g) || []).length === 4, "lesson20: IQ200 Challenge keeps four prompts and keys");
  const iq2_20 = between20("export const IQ200_CHALLENGE2_20", "export const FINAL_BOSS_20");
  ok((iq2_20.match(/wrong: "/g) || []).length === 6 && (iq2_20.match(/correct: "/g) || []).length === 6, "lesson20: IQ200 Challenge 2 keeps 6 corrections");
  const boss20 = between20("export const FINAL_BOSS_20", "export const SPEED_GAME_20");
  ok((boss20.match(/speaker: "/g) || []).length === 8 && (boss20.match(/\{\s*n: "/g) || []).length === 8, "lesson20: Final Boss keeps full 8-line dialogue and 8 questions");
  const speed20 = between20("export const SPEED_GAME_20", "export const GOLDEN_TEST_20");
  ok((speed20.match(/id: "/g) || []).length === 4, "lesson20: Speed Game keeps four demonstrative zones");
  const golden20 = between20("export const GOLDEN_TEST_20", "export const SENTENCE_BUILDER_20");
  ok((golden20.match(/stem: "/g) || []).length === 8, "lesson20: Golden Test keeps eight recall prompts");
  const builder20 = between20("export const SENTENCE_BUILDER_20", "export const SUMMARY_20");
  ok((builder20.match(/tokens: \[/g) || []).length === 6 && (builder20.match(/answer: "/g) || []).length === 6, "lesson20: sentence builder keeps six groups and models");

  // الاختبار النهائي المشترك: لا نسخة مستقلة، 12 سؤالًا يغطي المحاور المطلوبة.
  ok(t20.includes('import FinalQuiz from "../../shared/FinalQuiz"') && t20.includes("<FinalQuiz lesson={20}"), "lesson20: reuses shared FinalQuiz for lesson 20");
  ok(!t20.includes("const QUIZZES") && !t20.includes("TEACHER_PASSWORD"), "lesson20: does not duplicate quiz data or Teacher’s Space gate");
  const q20Start = bank.indexOf("  20: [");
  const q20End = bank.indexOf("  ],\n};", q20Start);
  const q21Start = bank.indexOf("  21: [", q20Start);
  const q20EndEff = Math.min(...[q20End, q21Start].filter((n) => n !== -1), q20Start === -1 ? -1 : Infinity);
  const q20 = q20Start === -1 ? "" : bank.slice(q20Start, q20EndEff === -1 || q20EndEff === Infinity ? q20Start : q20EndEff);
  ok((q20.match(/\{ ar:/g) || []).length === 12, `lesson20: quizBank has 12 new quiz questions (got ${(q20.match(/\{ ar:/g) || []).length})`);
  for (const coverage of ["notebook is on my desk", "far away", "children", "What are those?", "they are", "students' bags", "This books are heavy.", "That are my friends.", "children's bicycles", "my brother's telescopes"]) {
    ok(q20.includes(coverage), `lesson20: shared quiz covers ${coverage}`);
  }
  ok(finalQuiz.includes("disabled={checked}") && finalQuiz.includes("setChecked(true)") && finalQuiz.includes("const reset"), "shared FinalQuiz preserves neutral/check/lock/reset lifecycle");
  ok(teachers.includes('const TEACHER_PASSWORD = "63971"'), "Teacher’s Space gate remains password 63971");

  // التطبيق/المركز: بطاقة واحدة ومسار واحد للدرس الجديد، بلا تعديل مسارات الدروس السابقة.
  ok(app.includes('import Lesson20 from "./lessons/lesson20/Lesson20"'), "App imports Lesson20");
  ok(app.includes('import { SLIDES as L20_SLIDES } from "./lessons/lesson20/data"'), "App reads Lesson20 slide count for hub card");
  ok(app.includes('n: 20,') && app.includes('href: "#/lesson/20"'), "App registers one Lesson 20 hub card");
  ok(app.includes('route === 20') && app.includes('<Lesson20 onExit={goHome} />'), "App registers Lesson 20 hash route");

  const GB20 = String.fromCodePoint(0x1f1ec, 0x1f1e7);
  ok(!d20.includes(GB20) && !t20.includes(GB20), "lesson20: no GB flag emoji anywhere in the lesson");

  // ---------- lesson 22 ----------
  {
    const d22 = src("lesson22", "data.ts");
    const t22 = src("lesson22", "Lesson22.tsx");
    ok(d22.includes('en: "in"') && d22.includes('en: "on"') && d22.includes('en: "under"'), "lesson22: core prepositions in/on/under present");
    ok(d22.includes('en: "in front of"') && d22.includes('en: "next to"') && d22.includes('en: "between"'), "lesson22: multi-word prepositions present");
    ok(d22.includes("GRAMMAR_DETECTIVE_22") && d22.includes("FINAL_BOSS_22_TITLE") && d22.includes("IQ200_1_SCENE"), "lesson22: Grammar Detective, Final Boss, and IQ200 challenge retained");
    ok(t22.includes('import FinalQuiz from "../../shared/FinalQuiz"') && t22.includes("<FinalQuiz lesson={22}"), "lesson22: reuses shared FinalQuiz for lesson 22");
    ok(!t22.includes("const QUIZZES") && !t22.includes("TEACHER_PASSWORD"), "lesson22: does not duplicate quiz data or Teacher’s Space gate");
  }
  ok(app.includes('import Lesson22 from "./lessons/lesson22/Lesson22"'), "App imports Lesson22");
  ok(app.includes('import { SLIDES as L22_SLIDES } from "./lessons/lesson22/data"'), "App reads Lesson22 slide count for hub card");
  ok(app.includes('n: 22,') && app.includes('href: "#/lesson/22"'), "App registers one Lesson 22 hub card");
  ok(app.includes('route === 22') && app.includes('<Lesson22 onExit={goHome} />'), "App registers Lesson 22 hash route");
  const q22Start = bank.indexOf("  22: [");
  ok(q22Start !== -1, "lesson22: quizBank block for lesson 22 exists");
  const q23Start = bank.indexOf("  23: [");
  const q24Start = bank.indexOf("  24: [");
  const q22End = Math.min(...[bank.indexOf("  ],\n};", q22Start), q23Start, q24Start].filter((n) => n !== -1), Infinity);
  const q22 = q22Start === -1 ? "" : bank.slice(q22Start, q22End === Infinity ? q22Start : q22End);
  ok((q22.match(/\{ ar:/g) || []).length === 12, `lesson22: quizBank has 12 new quiz questions (got ${(q22.match(/\{ ar:/g) || []).length})`);

  // ---------- lesson 23 ----------
  {
    const d23 = src("lesson23", "data.ts");
    const t23 = src("lesson23", "Lesson23.tsx");

    // (أ) مفردات المصدر الأساسية موجودة حرفيًا
    for (const word of ["book", "pen", "apple", "car", "student", "teacher", "chair", "table", "dog", "cat", "house", "computer", "phone", "egg", "coin"]) {
      ok(d23.includes(`en: "${word}"`), `lesson23: countable example retained: ${word}`);
    }
    for (const word of ["water", "milk", "juice", "rice", "sugar", "salt", "flour", "bread", "cheese", "money", "information", "advice", "furniture", "homework", "traffic", "air", "sand"]) {
      ok(d23.includes(`en: "${word}"`), `lesson23: must-know uncountable word retained: ${word}`);
    }

    // (ب) الوحدات الإنجليزية الحساسة للاتجاه تبقى بترتيبها الطبيعي
    for (const exact of [
      "Countable",
      "Uncountable",
      "a book",
      "an apple",
      "two books",
      "five cars",
      "some books",
      "some water",
      "a bottle of water",
      "two bottles of water",
      "There is a book on the desk.",
      "There are three books on the desk.",
      "There is some water in the bottle.",
      "How many books do you have?",
      "How much water do you drink?",
      "How many children are in the park?",
      "How much money do you have?",
      "a piece of information",
      "two pieces of information",
      "a piece of advice",
      "three pieces of furniture",
      "There is an apple in the basket.",
      "There are three apples in the basket.",
      "There is some milk in the fridge.",
      "There is a bottle of water next to the fridge.",
      "Are there any books?",
      "There aren't any books.",
      "Is there any water?",
      "There isn't any water.",
      "Two coffees, please.",
      "I drink some coffee.",
      "two cups of coffee",
      "many books",
      "much water",
      "There are some books.",
      "How many chairs are there?",
      "How much money is in the box?",
      "three coins",
      "two banknotes",
      "five dollars",
      "an assignment",
      "three assignments",
    ]) ok(d23.includes(exact), `lesson23: supplied English unit remains verbatim: ${exact}`);

    // (ج) الأخطاء المقصودة في المصدر محفوظة (لا تُصحَّح بصمت)
    for (const wrong of [
      "a water",
      "a milk",
      "a rice",
      "some informations",
      "some advices",
      "some furnitures",
      "two waters",
      "three rices",
      "I have three money.",
      "an information",
      "advices",
      "informations",
      "a furniture",
      "homeworks",
      "How much books do you have?",
      "How many water do you drink?",
      "one water",
      "one rice",
      "two rices",
      "three waters",
      "an advice",
      "a homework",
      "furnitures",
      "There are some water",
      "some book",
      "I have a water.",
      "She gave me an advice.",
      "I need two informations.",
      "There are some milk in the fridge.",
      "There is two apples on the table.",
      "There are some water in the glass.",
      "I need an information.",
      "She bought three bread.",
      "How much chairs are there?",
      "How many rice do we need?",
      "There is some books in my bag.",
      "I have two waters.",
      "He gave me an advice.",
      "I need three informations.",
      "She has a furniture.",
    ]) ok(d23.includes(wrong), `lesson23: intentional teaching error retained: ${wrong}`);
    ok(d23.includes("export const INTENTIONALLY_WRONG_23"), "lesson23: intentional-error inventory is explicit");

    // (د) دفتر أقسام المصدر
    ok(d23.includes("export const SOURCE_SECTIONS"), "lesson23: SOURCE_SECTIONS ledger exists");
    ok(d23.includes("export const SOURCE_NUMBERED_COUNT = 57"), "lesson23: source ledger counts 57 sections");

    // (هـ) كل تفاعل مصدره بيانات بعدد عناصره ومفتاح حلّه
    const between23 = (from, to) => {
      const a = d23.indexOf(from);
      const b = to ? d23.indexOf(to, a + 1) : -1;
      return a === -1 ? "" : d23.slice(a, b === -1 ? a + 20000 : b);
    };
    const t1_23 = between23("export const TRAINING1_23:", "export const TRAINING2_23_INTRO");
    ok((t1_23.match(/stem: "/g) || []).length === 12 && (t1_23.match(/answer: \d/g) || []).length === 12, "lesson23: Training 1 keeps 12 classification words and keys");
    const t2_23 = between23("export const TRAINING2_23:", "export const TRAINING2_23_REMEMBER");
    ok((t2_23.match(/stem: "/g) || []).length === 8 && (t2_23.match(/answer: \d/g) || []).length === 8, "lesson23: Training 2 keeps 8 a/an vs some items and keys");
    const t3_23 = between23("export const TRAINING3_23:", "export const TRAINING4_23_OPTIONS");
    ok((t3_23.match(/stem: "/g) || []).length === 8 && (t3_23.match(/answer: \d/g) || []).length === 8, "lesson23: Training 3 keeps 8 There is/There are items and keys");
    const t4_23 = between23("export const TRAINING4_23:", "export const DETECTIVE_23_INTRO");
    ok((t4_23.match(/stem: "/g) || []).length === 8 && (t4_23.match(/answer: \d/g) || []).length === 8, "lesson23: Training 4 keeps 8 How many/How much items and keys");
    const det23 = between23("export const DETECTIVE_23:", "export const IQ200_23_TASK");
    ok((det23.match(/sentence: "/g) || []).length === 10 && (det23.match(/answer: \d/g) || []).length === 10, "lesson23: Grammar Detective keeps 10 source sentences and verdicts");
    ok((det23.match(/fix: "/g) || []).length === 5, "lesson23: Grammar Detective keeps the 5 corrections for the 5 wrong sentences");
    const iq23 = between23("export const IQ200_23:", "export const THINKING_23_INTRO");
    ok((iq23.match(/sentence: "/g) || []).length === 8 && (iq23.match(/answer: \d/g) || []).length === 8, "lesson23: IQ200 Challenge keeps 8 sentences and verdicts");
    ok((iq23.match(/answer: 1/g) || []).length === 1 && (iq23.match(/fix: "/g) || []).length === 7, "lesson23: IQ200 keeps exactly one correct sentence among 7 wrong ones");
    const think23 = between23("export const THINKING_23:", "export const FINAL_BOSS_23_TITLE");
    ok((think23.match(/item: "/g) || []).length === 6 && (think23.match(/answer: \d/g) || []).length === 6, "lesson23: Thinking Challenge keeps all 6 supplied quantities");
    const boss23 = between23("export const FINAL_BOSS_23_ITEMS", "export const FINAL_BOSS_23_OPTIONS");
    ok((boss23.match(/item: "/g) || []).length === 8 && (boss23.match(/model: "/g) || []).length === 8, "lesson23: Final Boss keeps all 8 room contents and 8 model sentences");
    ok(d23.includes("many: 2, much: 2"), "lesson23: Final Boss keeps the 2 How many + 2 How much quota");
    ok(d23.includes("export const MAGIC_TABLE_23") && d23.includes("export const SEVEN_RULES_23") && d23.includes("export const ROADMAP_23"), "lesson23: magic table, seven rules, and roadmap retained");
    ok((d23.match(/\{ n: \d+, en: "/g) || []).length >= 23, "lesson23: roadmap keeps the full 1-23 curriculum map");

    // (و) السلوك التفاعلي: اختيار محايد ثم «تحقق من الإجابات» (نموذج FinalQuiz)
    ok(t23.includes("تحقق من الإجابات"), "lesson23: source drills keep the neutral → check behaviour");
    ok(t23.includes("aria-pressed") && t23.includes("disabled={checked}"), "lesson23: drills expose neutral selection and lock after checking");
    ok(!t23.includes("TEACHER_PASSWORD"), "lesson23: does not duplicate the Teacher's Space gate");

    // (ز) الاختبار النهائي المشترك
    ok(t23.includes('import FinalQuiz from "../../shared/FinalQuiz"') && t23.includes("<FinalQuiz lesson={23}"), "lesson23: reuses shared FinalQuiz for lesson 23");
    ok(!t23.includes("const QUIZZES"), "lesson23: does not duplicate quiz data");
    ok(t23.includes('import { LatinRuns } from "../../shared/bidi"'), "lesson23: isolates mixed Arabic/English runs through shared bidi");
    ok(t23.includes('dir="rtl"') && t23.includes('dir="ltr"'), "lesson23: keeps the Arabic RTL shell with LTR-isolated English");

    // (ح) العلامة التجارية
    const GB23 = String.fromCodePoint(0x1f1ec, 0x1f1e7);
    ok(!d23.includes(GB23) && !t23.includes(GB23), "lesson23: no GB flag emoji anywhere in the lesson");
  }
  ok(app.includes('import Lesson23 from "./lessons/lesson23/Lesson23"'), "App imports Lesson23");
  ok(app.includes('import { SLIDES as L23_SLIDES } from "./lessons/lesson23/data"'), "App reads Lesson23 slide count for hub card");
  ok(app.includes('n: 23,') && app.includes('href: "#/lesson/23"'), "App registers one Lesson 23 hub card");
  ok(app.includes('route === 23') && app.includes('<Lesson23 onExit={goHome} />'), "App registers Lesson 23 hash route");
  const q23 = q23Start === -1 ? "" : bank.slice(q23Start, bank.indexOf("  ],\n};", q23Start));
  ok(q23Start !== -1, "lesson23: quizBank block for lesson 23 exists");
  ok((q23.match(/\{ ar:/g) || []).length === 12, `lesson23: quizBank has 12 new quiz questions (got ${(q23.match(/\{ ar:/g) || []).length})`);
  for (const coverage of ["furniture", "an egg", "a rice", "Are there ___ books on the shelf?", "There isn't ___ money in the box.", "___ some water in the bottle.", "___ three eggs on the table.", "___ water do you drink?", "___ books are on the shelf?", "much information", "two bottles of water", "a piece of advice"]) {
    ok(q23.includes(coverage), `lesson23: shared quiz covers ${coverage}`);
  }
}

// ---------- 12) lesson 24 — explicit quantifier direction and source coverage ----------
{
  const d24 = src("lesson24", "data.ts");
  const t24 = src("lesson24", "Lesson24.tsx");
  const bank = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "src", "shared", "quizBank.ts"), "utf8");
  ok(t24.includes("../../shared/bidi"), "lesson24: uses shared bidi helper");
  ok(t24.includes("data-source-section") && t24.includes("SOURCE_SECTIONS.map"), "lesson24: source ledger renders at student-facing level");
  for (const phrase of ["many books","much water","a few books","few books","a little water","little water","some books","any books","a lot of books","lots of books","How many apples do you need?","How much water do you drink?","three times","Past Continuous"]) ok(d24.includes(phrase), `lesson24: preserves direction-sensitive source phrase ${phrase}`);
  ok(d24.includes("There are a lot of students in the classroom."), "lesson24: preserves intentionally correct detective sentence");
  const q24Start = bank.indexOf("  24: [");
  ok(q24Start !== -1, "lesson24: quizBank block exists");
  const q24End = bank.indexOf("  23: [", q24Start);
  const q24 = q24Start === -1 ? "" : bank.slice(q24Start, q24End === -1 ? undefined : q24End);
  ok((q24.match(/\{ ar:/g) || []).length === 12, `lesson24: quizBank has 12 questions (got ${(q24.match(/\{ ar:/g) || []).length})`);
}

// ---------- 13) العلامة التجارية ونظافة الأعلام على مستوى المستودع ----------
{
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const skip = new Set(["node_modules", ".git", "dist", ".cache"]);
  const files = [];
  (function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (skip.has(entry.name)) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else files.push(full);
    }
  })(root);
  // تُبنى الإبرتان من نقاط الترميز حتى لا يحتوي هذا الملف نفسه على العلامة
  const GB_FLAG = String.fromCodePoint(0x1f1ec, 0x1f1e7);
  const OLD_BRAND_RX = new RegExp(["Englishwith", "sommer"].join(""), "i");
  const flagged = [];
  const oldBrand = [];
  for (const file of files) {
    let text;
    try {
      text = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    if (text.includes(GB_FLAG)) flagged.push(file.replace(root, ""));
    if (OLD_BRAND_RX.test(text)) oldBrand.push(file.replace(root, ""));
  }
  ok(flagged.length === 0, `repo: no GB flag emoji may remain anywhere (found in: ${flagged.join(", ")})`);
  ok(oldBrand.length === 0, `repo: old branding ${["Englishwith", "sommer"].join("")} must be absent (found in: ${oldBrand.join(", ")})`);
  const indexHtml = readFileSync(join(root, "index.html"), "utf8");
  ok(indexHtml.includes("EnglishwithSomeR"), "repo: index.html keeps the EnglishwithSomeR branding");
  const app = readFileSync(join(root, "src", "App.tsx"), "utf8");
  ok(app.includes("EnglishwithSomeR"), "repo: hub keeps the EnglishwithSomeR branding");
}

// ---------- النتيجة ----------
if (failures.length > 0) {
  console.error(`✕ English-direction check FAILED (${failures.length}/${checks}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ English-direction check passed (${checks} assertions, ${lessons.length} lessons).`);
