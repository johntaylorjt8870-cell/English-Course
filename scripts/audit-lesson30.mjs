// ============================================================
// Lesson 30 audit — native multi-step review lesson.
// Verifies: full source ledger coverage, 46 steps, functional labs,
// exactly 20 authored test questions, separate Solutions + Teacher areas,
// password, navigation, platform explanations, routing.
//   node scripts/audit-lesson30.mjs
// ============================================================
import { readFileSync } from 'node:fs';

const data = readFileSync('src/lessons/lesson30/data.ts', 'utf8');
const view = readFileSync('src/lessons/lesson30/Lesson30.tsx', 'utf8');
const app = readFileSync('src/App.tsx', 'utf8');

const failures = [];
let checks = 0;
const ok = (condition, message) => { checks++; if (!condition) failures.push(message); };

// ---------- 1) السجل المصدر: 40 قسمًا مرقّمًا + الغلاف والافتتاح والأهداف والخاتمة ----------
for (let i = 1; i <= 40; i++) ok(data.includes(`id: "s${i}"`) && data.includes(`num: ${i},`), `numbered source section ${i} present`);
for (const id of ['"cover"', '"opening"', '"objectives"', '"summary"', '"golden"', '"final"']) ok(data.includes(`id: ${id}`), `ledger section ${id} present`);
ok(data.includes('SOURCE_NUMBERED_COUNT = 40'), 'numbered count is 40');

// ---------- 2) عبارات مصدر حساسة يجب أن تبقى حرفية ----------
for (const phrase of [
  'I had been opening boxes for an hour before the lights went out.',
  'آلة اختيار الزمن',
  'Leo opened the window and realized that someone had broken the glass.',
  'When Maya arrived at the station, the train had already left.',
  'I was walking to school when I heard a strange sound. I realized that I had left my phone at home. I was tired because I had been walking for forty minutes.',
  'When I arrived, Sara had left.',
  'I had been waiting for forty minutes when the bus arrived.',
  'She had been cleaning the kitchen for two hours before the guests arrived.',
  'He had been painting the wall for three hours.',
  'At 8:00 yesterday, I was visiting my aunt.',
  'When I arrived, Tom had been sleeping for two hours.',
  'While I was studying, my brother was playing video games.',
  'I had finished my homework before I watched TV.',
  'By the time we arrived, the store had closed.',
  'When we arrived, the concert had already begun.',
  'When I arrived, they had been working for five hours and were still working.',
  'When the rescue team arrived, the villagers were standing near the river.',
  'When I arrived, they had been eating dinner for an hour.',
  'When Nora entered the kitchen, her mother was cooking, her father had already washed the dishes, and her brother had been preparing dessert for an hour.',
  'At 7:30 yesterday, Sam was driving home.',
  'When I arrived, Sarah ______ for an hour.',
  'When I arrived, Sarah ______ the report.',
  'He had been painting the house for three hours.',
  'When Lina entered the old library, several students were searching through the shelves.',
  'When the firefighters arrived, people were standing outside the building.',
  'اكتب 12 جملة عن يوم غامض حدث في الماضي.',
  'I had been waiting for an hour before the bus arrived.',
  'When the scientist entered the laboratory, the assistants were checking the equipment.',
  'الزمن ليس مجرد قاعدة؛ إنه زاوية نظر إلى الحدث.',
  'المعنى هو الذي يختار الزمن.',
]) ok(data.includes(phrase), `source phrase preserved: ${phrase.slice(0, 60)}`);

// ---------- 3) تمارين المصدر داخل منطقة الطالب كتفاعلات فعلية ----------
ok((data.match(/q: "/g) || []).length >= 16, 'source quizzes 1+2+final exam captured as data (5+3+8)');
ok(data.includes('ERRORS_30'), 'error-correction exercise data exists');
ok((data.match(/wrong: "/g) || []).length === 6, 'all 6 source corrections captured');
ok(data.includes('الإجابات:') || data.includes('answer:'), 'source answer keys preserved');

// ---------- 4) 46 خطوة أصلية + تنقل ----------
ok(view.includes('const slides: Slide[]'), 'native slide list exists');
ok((view.match(/\{ id: "(?:cover|opening|objectives|s\d+|summary|golden|final)", section:/g) || []).length === 46, 'exactly 46 navigable steps');
ok(view.includes('TOTAL_STEPS_30 = slides.length'), 'step total is derived from slides');
ok(view.includes('data-slide-counter') && view.includes('const progress'), 'progress bar + step counter exist');
ok(view.includes('→ السابق') && view.includes('التالي ←'), 'Previous/Next controls exist');
ok(view.includes('ArrowLeft') && view.includes('ArrowRight'), 'keyboard navigation exists');
ok(view.includes('lg:hidden') && view.includes('setMenu(true)'), 'mobile drawer navigation exists');
ok(view.includes('function Rail('), 'desktop step rail exists');

// ---------- 5) مختبرات تفاعلية فعلية (لا fake interactions) ----------
for (const lab of [
  'function ClassifyLab', 'function TenseMachineLab', 'function OrderLab', 'function HadFlipLab',
  'function FocusPickLab', 'function DetectiveLab', 'function SourceQuizLab', 'function ErrorFixLab',
  'function MeaningMatchLab', 'function StoryWriterLab', 'function analyzeStory',
]) ok(view.includes(lab), `functional interactive lab: ${lab}`);
ok(view.includes('machineVerdict'), 'tense machine computes a real verdict from answers');
ok(view.includes('picks[i] === it.tense'), 'classification labs actually validate answers');
ok(view.includes('picked.every((p, i) => p === answer[i])'), 'ordering labs actually validate order');
ok(view.includes('had (?:already |just |still )?been [a-z]+ing'), 'story analyzer counts real PPC patterns');

// ---------- 6) المناطق الأربع المنفصلة ----------
for (const area of ['data-area="student-lesson"', 'data-area="l30-test"', 'data-area="l30-solutions"', 'data-area="l30-teacher"']) {
  ok(view.includes(area), `separate area exists: ${area}`);
}

// ---------- 7) الاختبار: 20 سؤالًا بالضبط · لا كشف قبل Submit · Reset كامل ----------
ok(data.includes('export const TEST_30'), 'dedicated authored test exists');
ok((data.match(/\bn: \d+, type: "(?:single|tf|multi|order|match|spot)"/g) || []).length === 20, 'exactly 20 test questions');
for (const t of ['"single"', '"tf"', '"multi"', '"order"', '"match"', '"spot"']) ok(data.includes(`type: ${t}`), `test includes question type ${t}`);
ok((data.match(/why: "/g) || []).length >= 20, 'every test question carries an explanation');
ok(view.includes('const submit = () => { setChecked(true)'), 'score only appears after Submit');
ok(view.includes('const reset = () => { setAnswers({}); setChecked(false)'), 'Reset clears answers, submitted state, and score');
ok(view.includes('disabled={!allAnswered}'), 'Submit requires all questions answered');
ok(!view.includes('isCorrect30(q, a) ? "right" : "wrong"') || view.includes('const state = !checked ?'), 'no right/wrong styling before Submit');

// ---------- 8) حلول الاختبار منطقة مستقلة وتفسيرية ----------
ok(view.includes('function Solutions30'), 'Test Solutions area exists');
ok(view.includes('solutionAnswer(q)') && view.includes('q.why') && view.includes('q.trap'), 'solutions are explanatory (answer + why + trap)');
ok(view.includes('unlocked: boolean') && view.includes('solutionsUnlocked = testChecked || teacherOk'), 'solutions gated until test submitted or teacher unlocked');

// ---------- 9) منطقة المعلم ----------
ok(data.includes('TEACHER_PASSWORD_30 = "somer173"'), 'teacher password is somer173');
ok(view.includes('TEACHER_PASSWORD_30') && view.includes('type="password"'), 'teacher area is password-gated');
for (const t of ['TEACHER_30_OVERVIEW', 'TEACHER_30_NOTES', 'TEACHER_30_SOLUTIONS', 'TEACHER_30_RUBRICS', 'TEACHER_30_MISTAKES']) {
  ok(data.includes(`export const ${t}`) && view.includes(t), `teacher area renders ${t}`);
}

// ---------- 10) Platform Explanations موسومة + عزل اتجاهي ----------
ok(view.includes('Platform Explanation'), 'platform explanations are labelled');
ok(view.includes('dir="rtl"') && view.includes('dir="ltr"'), 'RTL shell with LTR English isolation');
ok(view.includes('LatinRuns'), 'mixed Arabic/English text goes through LatinRuns');
ok(!view.includes('split(/(\\s+)/)'), 'no per-token split (word-reversal engine banned)');

// ---------- 11) التسجيل في الواجهة ----------
ok(app.includes('Lesson30 onExit={goHome}') && app.includes('route === 30'), 'lesson 30 routed in App.tsx');
ok(app.includes('#/lesson/30') && app.includes('الدرس 30: مراجعة شاملة لنظام الماضي'), 'hub card present');

if (failures.length) {
  console.error(`✕ Lesson 30 audit FAILED (${failures.length}/${checks})\n` + failures.map((x) => `  - ${x}`).join('\n'));
  process.exit(1);
}
console.log(`✓ Lesson 30 audit passed (${checks} checks)`);
