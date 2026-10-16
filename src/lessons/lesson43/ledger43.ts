import { SOURCE_TEXT_43 } from './source43';
export const NUMBER_MARKS_43 = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕';
export const SOURCE_SECTIONS_43 = SOURCE_TEXT_43.split('@@').filter(Boolean).map(block => {
  const [heading, ...lines] = block.trim().split('\n');
  const num = Number(heading.split(' ')[0]);
  return { num, id: num ? `s${String(num).padStart(2, '0')}` : 'cover', title: heading.slice(heading.indexOf(' ') + 1), lines,
    units: lines.map((text, index) => ({ id: `s${num}-u${index + 1}`, text })) };
});
export function section43(num: number) { return SOURCE_SECTIONS_43[num]; }
export function numbered43(lines: string[]) {
  const result: { number: number; lines: string[] }[] = [];
  for (const line of lines) {
    const index = NUMBER_MARKS_43.indexOf(line[0]);
    if (index >= 0) result.push({ number: index + 1, lines: [line.slice(1).trim()] });
    else if (result.length) result[result.length - 1].lines.push(line);
  }
  return result;
}
// Eleven learning stations inside the Probability Observatory. Section
// numbers stay exactly as supplied; only the grouping is pedagogical.
export const STATIONS_43 = [
  { name: 'الانطلاق', en: 'ORIENTATION', start: 0, end: 4 },
  { name: 'قناة MAY', en: 'MAY CHANNEL', start: 5, end: 7 },
  { name: 'قناة MIGHT', en: 'MIGHT CHANNEL', start: 8, end: 11 },
  { name: 'النفي', en: 'NEGATION', start: 12, end: 14 },
  { name: 'الاستئذان', en: 'PERMISSION', start: 15, end: 17 },
  { name: 'مختبر MAYBE', en: 'MAYBE LAB', start: 18, end: 19 },
  { name: 'احتمال الماضي', en: 'PAST POSSIBILITY', start: 20, end: 23 },
  { name: 'الأفعال الأربعة', en: 'THE FOUR MODALS', start: 24, end: 25 },
  { name: 'الحوار والتطبيق', en: 'DIALOGUE & PRACTICE', start: 26, end: 31 },
  { name: 'القراءة والتقييم', en: 'READING & ASSESSMENT', start: 32, end: 34 },
  { name: 'الكتابة والخريطة', en: 'WRITING & ROADMAP', start: 35, end: 37 },
];
/**
 * Source headings such as «MAY vs MIGHT — هل هناك فرق في قوة الاحتمال؟»
 * carry an English label and an Arabic title. Callers render the two
 * halves as separate isolated lines so a mixed pair never shares one
 * RTL paragraph (the shared BIDI contract in src/shared/bidi.tsx).
 * Pure-Arabic or pure-English titles come back with an empty first half.
 */
export function splitTitle43(title: string): [string, string] {
  const dash = title.indexOf(' — ');
  if (dash > 0 && !/[؀-ۿ]/.test(title.slice(0, dash))) return [title.slice(0, dash), title.slice(dash + 3)];
  return ['', title];
}
// Lesson 44 is roadmap prose in §37 only — never registered as an implemented lesson.
export const NEXT_LESSON_43 = {
  status: 'planned-not-implemented',
  label: 'Lesson 44 — MUST & HAVE TO',
  en: 'Necessity, Obligation & Rules',
};
