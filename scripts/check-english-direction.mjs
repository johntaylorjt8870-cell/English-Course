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
for (const l of ["lesson2", "lesson3", "lesson4", "lesson5", "lesson6", "lesson7", "lesson9"]) {
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
];
for (const [l, fn] of LTR_SPOTS) {
  const body = fnBody(src(l, tsxName(l)), fn);
  ok(body !== null, `${l}: function ${fn} not found`);
  ok(body !== null && body.includes('dir="ltr"'), `${l}/${fn}: English unit must be wrapped with dir="ltr"`);
}

// ---------- 6) حراس المعنى: الافتراضيات المعقولة + جمع آلة الدرس 4 ----------
{
  const m4 = fnBody(src("lesson4", tsxName("lesson4")), "Machine");
  ok(m4.includes("setNi] = useState(1)"), "lesson4/Machine: default noun must be student (I am a student.)");
  ok(m4.includes("n.plural"), "lesson4/Machine: plural subjects (We/They) must use the plural noun without a/an");
  const b9 = fnBody(src("lesson9", tsxName("lesson9")), "Builder");
  ok(b9.includes("setOi] = useState(2)"), "lesson9/Builder: default object must be dinner (I am cooking dinner.)");
  const d9 = src("lesson9", "data.ts");
  ok(!d9.includes('P("not", "o")'), 'lesson9: "not" must use the nt role, not the object role');
}

// ---------- النتيجة ----------
if (failures.length > 0) {
  console.error(`✕ English-direction check FAILED (${failures.length}/${checks}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ English-direction check passed (${checks} assertions, ${lessons.length} lessons).`);
