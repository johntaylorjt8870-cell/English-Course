import { SOURCE_TEXT_44 } from './source44';
export const NUMBER_MARKS_44 = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕';
export const SOURCE_SECTIONS_44 = SOURCE_TEXT_44.split('@@').filter(Boolean).map(block => {
  const [heading, ...lines] = block.trim().split('\n');
  const num = Number(heading.split(' ')[0]);
  return {
    num,
    id: num ? `s${String(num).padStart(2, '0')}` : 'cover',
    title: heading.slice(heading.indexOf(' ') + 1),
    lines,
    units: lines.map((text, index) => ({ id: `${num ? `s${String(num).padStart(2, '0')}` : 'cover'}-u${index + 1}`, text })),
  };
});
export function section44(num: number) { return SOURCE_SECTIONS_44[num]; }

/** The canonical id of one rendered source line. Used by the DOM coverage audit. */
export function unitId44(num: number, index: number) {
  const section = SOURCE_SECTIONS_44[num];
  return `${section.id}-u${index + 1}`;
}

export function numbered44(lines: string[]) {
  const result: { number: number; lines: string[] }[] = [];
  for (const line of lines) {
    const index = NUMBER_MARKS_44.indexOf(line[0]);
    if (index >= 0) result.push({ number: index + 1, lines: [line.slice(1).trim()] });
    else if (result.length) result[result.length - 1].lines.push(line);
  }
  return result;
}

/**
 * Learning chapters. They tile the 39 steps exactly once, in source order.
 * Names and English labels are platform-authored navigation labels; the source
 * sequence is untouched.
 */
export const STATIONS_44 = [
  { name: 'الانطلاق', en: 'ORIENTATION', start: 0, end: 1 },
  { name: 'الضرورة مع MUST', en: 'MUST · NECESSITY', start: 2, end: 6 },
  { name: 'المتطلبات مع HAVE TO', en: 'HAVE TO · REQUIREMENTS', start: 7, end: 9 },
  { name: 'المقارنة بينهما', en: 'MUST vs HAVE TO', start: 10, end: 12 },
  { name: 'المنع وعدم الضرورة', en: 'PROHIBITION · NO NECESSITY', start: 13, end: 16 },
  { name: 'السؤال والجواب', en: 'QUESTIONS', start: 17, end: 19 },
  { name: 'الضرورة في الماضي', en: 'PAST · HAD TO', start: 20, end: 22 },
  { name: 'الضرورة في المستقبل', en: 'FUTURE · WILL HAVE TO', start: 23, end: 24 },
  { name: 'الضرورة والنصيحة', en: 'MUST · HAVE TO · SHOULD', start: 25, end: 26 },
  { name: 'الأخطاء الشائعة', en: 'GRAMMAR DETECTIVE', start: 27, end: 27 },
  { name: 'التدريبات', en: 'PRACTICE SETS', start: 28, end: 32 },
  { name: 'القراءة والتقييم', en: 'READING & ASSESSMENT', start: 33, end: 35 },
  { name: 'الكتابة والخريطة', en: 'WRITING & ROADMAP', start: 36, end: 38 },
];

export function station44(step: number) {
  return STATIONS_44.find(s => step >= s.start && step <= s.end) ?? STATIONS_44[0];
}

export function splitTitle44(title: string): [string, string] {
  const dash = title.indexOf(' — ');
  if (dash > 0 && !/[؀-ۿ]/.test(title.slice(0, dash))) return [title.slice(0, dash), title.slice(dash + 3)];
  return ['', title];
}

export const NEXT_LESSON_44 = {
  status: 'planned-not-implemented',
  label: 'Lesson 45 — SHOULD & OUGHT TO',
  en: 'Advice, Recommendations & Expectations',
};
