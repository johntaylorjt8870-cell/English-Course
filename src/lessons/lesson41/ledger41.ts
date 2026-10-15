import { SOURCE_TEXT_41 } from './source41';
export const NUMBER_MARKS_41 = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕';
export const SOURCE_SECTIONS_41 = SOURCE_TEXT_41.split('@@').filter(Boolean).map(block => {
  const [heading, ...lines] = block.trim().split('\n');
  const num = Number(heading.split(' ')[0]);
  return { num, id: num ? `s${String(num).padStart(2, '0')}` : 'cover', title: heading.slice(heading.indexOf(' ') + 1), lines,
    units: lines.map((text, index) => ({ id: `s${num}-u${index + 1}`, text })) };
});
export function section41(num: number) { return SOURCE_SECTIONS_41[num]; }
export function numbered41(lines: string[]) {
  const result: { number: number; lines: string[] }[] = [];
  for (const line of lines) {
    const index = NUMBER_MARKS_41.indexOf(line[0]);
    if (index >= 0) result.push({ number: index + 1, lines: [line.slice(1).trim()] });
    else if (result.length) result[result.length - 1].lines.push(line);
  }
  return result;
}
export const STATIONS_41 = [
  { name: 'الانطلاق', en: 'ORIENTATION', start: 0, end: 4 },
  { name: 'محرك BE', en: 'STRUCTURE', start: 5, end: 10 },
  { name: 'محرك DO', en: 'QUESTIONS', start: 11, end: 17 },
  { name: 'محرك HAVE', en: 'PERFECT FORMS', start: 18, end: 23 },
  { name: 'السلسلة', en: 'FIRST AUXILIARY', start: 24, end: 29 },
  { name: 'التطبيق', en: 'PUT IT TO WORK', start: 30, end: 35 },
  { name: 'الإتقان', en: 'ASSESS & REFLECT', start: 36, end: 40 },
];
