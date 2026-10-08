import { readFileSync } from 'node:fs';
const data = readFileSync('src/lessons/lesson29/data.ts', 'utf8');
const view = readFileSync('src/lessons/lesson29/Lesson29.tsx', 'utf8');
const failures = []; let checks = 0;
const ok = (condition, message) => { checks++; if (!condition) failures.push(message); };
ok((data.match(/s\((\d+),/g) || []).length === 44, 'all 44 numbered source sections indexed');
for (let i = 1; i <= 44; i++) ok(data.includes(`s(${i},`), `source section ${i} present`);
for (const phrase of ['I had been studying for three hours when my friend called.', 'I had cleaned the room before my parents arrived.', 'Her clothes were wet because she had been walking in the rain.', 'I had known him for years.', 'When Mia arrived at the science lab', 'When the rescue team arrived']) ok(data.includes(phrase), `source phrase preserved: ${phrase}`);
ok(data.includes('export const TEST_29='), 'dedicated test exists');
ok((data.match(/\['(?:single|tf|multi|order|match)'/g) || []).length === 20, 'exactly 20 test questions');
ok(data.includes('TEST_29_SOLUTIONS=TEST_29.map'), '20 solution set derives from test data');
for (const lab of ['Four-Tense Timeline Lab', 'Formula Builder', 'FOR vs SINCE Lab', 'Four-Tense Comparator', 'Result vs Duration Lab', 'Stative Verb Trap', 'Mia Story Timeline', 'Boss Battle', 'Final IQ200 Challenge']) ok(view.includes(lab), `interactive experience: ${lab}`);
for (const area of ['data-area="student-lesson"', 'data-area="lesson29-test"', 'data-area="lesson29-solutions"', 'data-area="lesson29-teacher"', 'Test Area', 'Test Solutions', 'Teacher Area', 'TEACHER_PASSWORD_29']) ok(view.includes(area), `lesson area/authentication: ${area}`);
ok(view.includes('const slides: Slide[]'), 'native slide data exists');
ok(view.includes('48 خطوة') && view.includes('const total = slides.length'), '48-step navigation is declared');
ok(view.includes('data-slide-counter') && view.includes('const progress'), 'progress counter exists');
ok(view.includes('Platform Explanation'), 'platform explanations are labelled');
// لا لوحة «نص المصدر الحرفي — اضغط للعرض» — مع بقاء أسطر المصدر نفسها
// (محتوى الكتاب، يظهر تلقائيًا بعد إتمام المحاولة، لا بزر يُفتَح بالضغط)
ok(!/اضغط\s+للعرض|نص\s+المصدر\s+الحرفي|SourceReveal32/.test(view), 'no press-to-show literal-source panel in the student UI');
ok(!/<details|<summary/.test(view), 'no collapsible source panel in the student UI');
ok((view.match(/<SourceReveal /g) || []).length === 7, 'the 7 gated source lines (textbook content) are preserved');
{
  const comp = /function SourceReveal\(\{ text \}: \{ text: string \}\) \{([\s\S]*?)\n\}/.exec(view);
  ok(!!comp, 'the source-line component is preserved');
  ok(!!comp && !/<button|<details|<summary|onClick|useState/.test(comp[1]), 'the source line is passive content, not a toggle');
  ok(!!comp && /📜\s*من\s+المصدر/.test(comp[1]), 'the source line is badged 📜 من المصدر');
  // كل سطر مقرون بشرط: لا مكوّن SourceReveal يُركَّب دون عدّاد محاولة في دالته
  ok(/done && sourceAnswersLine && <SourceReveal/.test(view), 'McqSet source line stays gated behind every item being attempted');
  ok(/solved === items\.length &&/.test(view) && /answered >= EX29_MEANING\.length && <SourceReveal/.test(view), 'lab/meaning source lines stay gated behind a full attempt');
  ok(/U29\("s38"\)|U29\("s39"\)|U29\("s43"\)|U29\("s36"\)/.test(view), 'source lines still read from the lesson source index (U29)');
}
if (failures.length) { console.error(`✕ Lesson 29 audit FAILED (${failures.length}/${checks})\n` + failures.map((x) => `  - ${x}`).join('\n')); process.exit(1); }
console.log(`✓ Lesson 29 audit passed (${checks} checks)`);
