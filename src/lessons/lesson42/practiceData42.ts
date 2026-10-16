import { numbered42, section42 } from './ledger42';
export const PRACTICE_COUNTS_42: Record<number, number> = {34:8,35:5,36:5,37:5,38:10,39:10};
export type Practice42 = { id: string; section: number; number: number; prompt: string; options: string[]; sourceAnswer: string; parts: string[] };
export const PRACTICE_42: Practice42[] = Object.keys(PRACTICE_COUNTS_42).flatMap(key => {
  const section = Number(key), lines = section42(section).lines;
  if (section === 38) {
    const split = lines.findIndex(line => line.startsWith('الحلول'));
    const questions = numbered42(lines.slice(0, split));
    const keys = numbered42(lines.slice(split + 1));
    return questions.map((item, i) => ({ id:`p38-${item.number}`, section, number:item.number,
      prompt:item.lines[0], options:[], sourceAnswer:keys[i].lines.join('\n'), parts:['repair','reason'] }));
  }
  if (section === 39) {
    const split = lines.indexOf('الحلول');
    const questions = numbered42(lines.slice(0, split));
    const keys = numbered42(lines.slice(split + 1));
    return questions.map((item, i) => ({ id:`p39-${item.number}`, section, number:item.number,
      prompt:item.lines.join('\n'), options:[], sourceAnswer:keys[i].lines.join('\n'), parts:['answer'] }));
  }
  const split = lines.findIndex(line => line.startsWith('الحلول'));
  const questions = numbered42(lines.slice(0, split));
  const keys = numbered42(lines.slice(split + 1));
  return questions.map((item, i) => ({ id:`p${section}-${item.number}`, section, number:item.number,
    prompt:item.lines.filter(line => !/^[ABC]\. /.test(line)).join('\n'),
    options:item.lines.filter(line => /^[ABC]\. /.test(line)), sourceAnswer:keys[i].lines.join('\n'),
    parts: section === 37 ? ['choice','note'] : ['response'] }));
});
export function practices42(section: number) { return PRACTICE_42.filter(item => item.section === section); }
