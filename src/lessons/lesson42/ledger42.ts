import { SOURCE_TEXT_42 } from './source42';
export const NUMBER_MARKS_42 = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕';
export const SOURCE_SECTIONS_42 = SOURCE_TEXT_42.split('@@').filter(Boolean).map(block => {
  const [heading, ...lines] = block.trim().split('\n');
  const num = Number(heading.split(' ')[0]);
  return { num, id: num ? `s${String(num).padStart(2, '0')}` : 'cover', title: heading.slice(heading.indexOf(' ') + 1), lines,
    units: lines.map((text, index) => ({ id: `s${num}-u${index + 1}`, text })) };
});
export function section42(num: number) { return SOURCE_SECTIONS_42[num]; }
export function numbered42(lines: string[]) {
  const result: { number: number; lines: string[] }[] = [];
  for (const line of lines) {
    const index = NUMBER_MARKS_42.indexOf(line[0]);
    if (index >= 0) result.push({ number: index + 1, lines: [line.slice(1).trim()] });
    else if (result.length) result[result.length - 1].lines.push(line);
  }
  return result;
}
// Ten learning stations inside the Language Control Lab. Section numbers stay
// exactly as supplied; only the grouping is pedagogical.
export const STATIONS_42 = [
  { name: 'الانطلاق', en: 'ORIENTATION', start: 0, end: 5 },
  { name: 'قناة CAN', en: 'PRESENT ABILITY', start: 6, end: 11 },
  { name: 'قناة COULD', en: 'PAST ABILITY', start: 12, end: 16 },
  { name: 'القدرة المحددة', en: 'COULD vs ABLE TO', start: 17, end: 19 },
  { name: 'الاستئذان', en: 'PERMISSION', start: 20, end: 21 },
  { name: 'الطلبات', en: 'REQUESTS', start: 22, end: 25 },
  { name: 'الإمكانية', en: 'POSSIBILITY', start: 26, end: 29 },
  { name: 'التواصل المهذب', en: 'POLITE USE', start: 30, end: 33 },
  { name: 'المعنى والسياق', en: 'MEANING LAB', start: 34, end: 39 },
  { name: 'التقييم والتأمل', en: 'ASSESS & REFLECT', start: 40, end: 44 },
];
/**
 * Source headings such as «CAN vs COULD — مقارنة القدرة» carry an English
 * label and an Arabic title. Callers render the two halves as separate
 * isolated lines so a mixed pair never shares one RTL paragraph (the shared
 * BIDI contract in src/shared/bidi.tsx). Pure-Arabic or pure-English titles
 * come back with an empty first half.
 */
export function splitTitle42(title: string): [string, string] {
  const dash = title.indexOf(' — ');
  if (dash > 0 && !/[\u0600-\u06ff]/.test(title.slice(0, dash))) return [title.slice(0, dash), title.slice(dash + 3)];
  return ['', title];
}
// Lesson 43 is roadmap prose in §44 only — never registered as an implemented lesson.
export const NEXT_LESSON_42 = {
  status: 'planned-not-implemented',
  label: 'Lesson 43 — MAY & MIGHT',
  en: 'Possibility, Probability & Permission',
};
