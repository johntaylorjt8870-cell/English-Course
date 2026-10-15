import { numbered41, section41 } from './ledger41';
export const PRACTICE_COUNTS_41: Record<number, number> = {23:6,29:10,30:8,31:8,32:8,33:8,34:8,35:10};
export type Practice41 = { id: string; section: number; number: number; prompt: string; options: string[]; sourceAnswer: string; parts: string[] };
export const PRACTICE_41: Practice41[] = Object.keys(PRACTICE_COUNTS_41).flatMap(key => {
  const section = Number(key), lines = section41(section).lines;
  if (section === 29) return numbered41(lines).map(item => ({ id:`p29-${item.number}`, section, number:item.number,
    prompt:item.lines[0], options:[], sourceAnswer:item.lines.slice(1).join('\n'), parts:['repair','reason'] }));
  const split = lines.findIndex(line => line.startsWith('الحلول'));
  const questions = numbered41(lines.slice(0, split));
  const keys = numbered41(lines.slice(split + 1));
  return questions.map((item, i) => ({ id:`p${section}-${item.number}`, section, number:item.number,
    prompt:item.lines.filter(line => !/^[ABC]\. /.test(line)).join('\n'),
    options:item.lines.filter(line => /^[ABC]\. /.test(line)), sourceAnswer:keys[i].lines.join('\n'),
    parts:section===30 ? ['auxiliaries','main'] : section===34 && item.number===7 ? ['DID','DO'] : ['response'] }));
});
export function practices41(section: number) { return PRACTICE_41.filter(item => item.section === section); }
