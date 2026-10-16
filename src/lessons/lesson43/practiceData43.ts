import { numbered43, section43 } from './ledger43';
export const PRACTICE_COUNTS_43: Record<number, number> = {27:6,28:6,29:6,30:5,31:10,32:10};
export type Practice43 = { id: string; section: number; number: number; prompt: string; options: string[]; sourceAnswer: string; accepted?: string[]; note?: string; parts: string[] };
export const PRACTICE_43: Practice43[] = Object.keys(PRACTICE_COUNTS_43).flatMap(key => {
  const section = Number(key), lines = section43(section).lines;
  if (section === 27) {
    // Every sentence accepts MAY or MIGHT — the source key says so explicitly.
    const split = lines.findIndex(line => line.startsWith('الحلول'));
    const questions = numbered43(lines.slice(0, split));
    return questions.map((item, i) => ({ id:`p27-${item.number}`, section, number:item.number,
      prompt:item.lines[0], options:['MAY','MIGHT'], sourceAnswer:'MAY أو MIGHT — كلتاهما صحيحة بحسب درجة التحفظ والسياق.', accepted:['MAY','MIGHT'],
      note:'مثلًا: It may rain tomorrow. / It might rain tomorrow. كلتاهما صحيحتان.', parts:['choice'] }));
  }
  if (section === 28) {
    const split = lines.findIndex(line => line.startsWith('الحلول'));
    const questions = numbered43(lines.slice(0, split));
    const keys = numbered43(lines.slice(split + 1));
    return questions.map((item, i) => ({ id:`p28-${item.number}`, section, number:item.number,
      prompt:item.lines.filter(line => !/^[ABC]\. /.test(line)).join('\n'),
      options:item.lines.filter(line => /^[ABC]\. /.test(line)), sourceAnswer:keys[i].lines.join('\n'), parts:['choice'] }));
  }
  if (section === 29) {
    const split = lines.findIndex(line => line.startsWith('الحلول'));
    const questions = numbered43(lines.slice(0, split));
    const keys = numbered43(lines.slice(split + 1));
    return questions.map((item, i) => {
      const answer = keys[i].lines[0].replace(/\.$/, '').trim();
      const options = answer === 'Maybe' ? ['Maybe', 'May be'] : ['maybe', 'may be'];
      return { id:`p29-${item.number}`, section, number:item.number,
        prompt:item.lines[0], options, sourceAnswer:keys[i].lines.join('\n'), accepted:[answer], parts:['choice'] };
    });
  }
  if (section === 30) {
    const qStart = lines.indexOf('الأسئلة:');
    const kStart = lines.indexOf('حلول نموذجية');
    const noteIdx = lines.findIndex(line => line.startsWith('يمكن تبديل'));
    const questions = numbered43(lines.slice(qStart + 1, kStart));
    const keys = numbered43(lines.slice(kStart + 1, noteIdx));
    return questions.map((item, i) => ({ id:`p30-${item.number}`, section, number:item.number,
      prompt:item.lines.join('\n'), options:[], sourceAnswer:keys[i].lines.join('\n'),
      note:'يمكن تبديل MAY وMIGHT في هذه الأمثلة عندما يسمح السياق بذلك.', parts:['response'] }));
  }
  if (section === 31) {
    const split = lines.findIndex(line => line.startsWith('الحلول'));
    const questions = numbered43(lines.slice(0, split));
    const keys = numbered43(lines.slice(split + 1));
    return questions.map((item, i) => ({ id:`p31-${item.number}`, section, number:item.number,
      prompt:item.lines[0], options:[], sourceAnswer:keys[i].lines.join('\n'), parts:['response'] }));
  }
  // section 32 — reading comprehension
  const qStart = lines.indexOf('أسئلة الفهم');
  const split = lines.indexOf('الحلول');
  const questions = numbered43(lines.slice(qStart + 1, split));
  const keys = numbered43(lines.slice(split + 1));
  return questions.map((item, i) => ({ id:`p32-${item.number}`, section, number:item.number,
    prompt:item.lines.join('\n'), options:[], sourceAnswer:keys[i].lines.join('\n'), parts:['answer'] }));
});
export function practices43(section: number) { return PRACTICE_43.filter(item => item.section === section); }
