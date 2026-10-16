// Practice exercises derived from the source (sections 28-32).
export type Practice44 = { id: string; section: number; number: number; prompt: string; options: string[]; sourceAnswer: string; parts: string[] };
export const PRACTICE_44: Practice44[] = [
  // §28 Exercise 1
  { id: 'p28-1', section: 28, number: 1, prompt: 'I ______ improve my English. I really want to become fluent.', options: ['A. must', 'B. has to'], sourceAnswer: 'A — must', parts: ['إجابة واحدة'] },
  { id: 'p28-2', section: 28, number: 2, prompt: 'She ______ wear a uniform because it\'s a school rule.', options: ['A. have to', 'B. has to'], sourceAnswer: 'B — has to', parts: ['إجابة واحدة'] },
  { id: 'p28-3', section: 28, number: 3, prompt: 'We ______ protect the environment.', options: ['A. must', 'B. musts'], sourceAnswer: 'A — must', parts: ['إجابة واحدة'] },
  { id: 'p28-4', section: 28, number: 4, prompt: 'My father ______ leave early because his meeting starts at seven.', options: ['A. has to', 'B. have to'], sourceAnswer: 'A — has to', parts: ['إجابة واحدة'] },
  { id: 'p28-5', section: 28, number: 5, prompt: 'Students ______ follow the safety instructions.', options: ['A. must', 'B. musts'], sourceAnswer: 'A — must', parts: ['إجابة واحدة'] },
  // §29 Exercise 2
  { id: 'p29-1', section: 29, number: 1, prompt: 'يُمنع عليك لمس هذا الجهاز. You ______ touch this machine.', options: [], sourceAnswer: "mustn't", parts: ['إكمال'] },
  { id: 'p29-2', section: 29, number: 2, prompt: 'لست مضطرًا إلى الحضور غدًا. You ______ come tomorrow.', options: [], sourceAnswer: "don't have to", parts: ['إكمال'] },
  { id: 'p29-3', section: 29, number: 3, prompt: 'يُمنع على الطلاب الغش. Students ______ cheat.', options: [], sourceAnswer: "mustn't", parts: ['إكمال'] },
  { id: 'p29-4', section: 29, number: 4, prompt: 'ليس علينا دفع ثمن التذاكر. We ______ pay for the tickets.', options: [], sourceAnswer: "don't have to", parts: ['إكمال'] },
  { id: 'p29-5', section: 29, number: 5, prompt: 'لا يُسمح لك باستخدام الهاتف أثناء الامتحان. You ______ use your phone during the exam.', options: [], sourceAnswer: "mustn't", parts: ['إكمال'] },
  // §30 Exercise 3
  { id: 'p30-1', section: 30, number: 1, prompt: 'Yesterday, I ______ (have to) wake up early.', options: [], sourceAnswer: 'had to', parts: ['إكمال'] },
  { id: 'p30-2', section: 30, number: 2, prompt: 'She ______ (not / have to) work last weekend.', options: [], sourceAnswer: "didn't have to", parts: ['إكمال'] },
  { id: 'p30-3', section: 30, number: 3, prompt: '______ you ______ (have to) finish the project yesterday?', options: [], sourceAnswer: 'Did you have to', parts: ['إكمال'] },
  { id: 'p30-4', section: 30, number: 4, prompt: 'Tomorrow, we ______ (have to) leave at six.', options: [], sourceAnswer: 'will have to', parts: ['إكمال'] },
  { id: 'p30-5', section: 30, number: 5, prompt: "They ______ (not / have to) bring their books next week.", options: [], sourceAnswer: "won't have to", parts: ['إكمال'] },
  // §31 Exercise 4
  { id: 'p31-1', section: 31, number: 1, prompt: 'She has to study tonight. → حوّل إلى السؤال.', options: [], sourceAnswer: 'Does she have to study tonight?', parts: ['تحويل'] },
  { id: 'p31-2', section: 31, number: 2, prompt: 'They have to arrive early. → حوّل إلى السؤال.', options: [], sourceAnswer: 'Do they have to arrive early?', parts: ['تحويل'] },
  { id: 'p31-3', section: 31, number: 3, prompt: 'Omar had to finish the report yesterday. → حوّل إلى السؤال.', options: [], sourceAnswer: 'Did Omar have to finish the report yesterday?', parts: ['تحويل'] },
  { id: 'p31-4', section: 31, number: 4, prompt: 'We will have to buy new equipment. → حوّل إلى السؤال.', options: [], sourceAnswer: 'Will we have to buy new equipment?', parts: ['تحويل'] },
  { id: 'p31-5', section: 31, number: 5, prompt: 'You must follow the rules. → حوّل إلى السؤال.', options: [], sourceAnswer: 'Must you follow the rules? أو Do you have to follow the rules?', parts: ['تحويل'] },
  // §32 Exercise 5
  { id: 'p32-1', section: 32, number: 1, prompt: 'She has to work tomorrow. المطلوب: ليس من الضروري.', options: [], sourceAnswer: "She doesn't have to work tomorrow.", parts: ['تحويل'] },
  { id: 'p32-2', section: 32, number: 2, prompt: 'They had to pay yesterday. المطلوب: لم يكن الدفع ضروريًا.', options: [], sourceAnswer: "They didn't have to pay yesterday.", parts: ['تحويل'] },
  { id: 'p32-3', section: 32, number: 3, prompt: 'We will have to arrive early. المطلوب: لن يكون ضروريًا.', options: [], sourceAnswer: "We won't have to arrive early.", parts: ['تحويل'] },
  { id: 'p32-4', section: 32, number: 4, prompt: 'You must enter this room. المطلوب: الدخول ممنوع.', options: [], sourceAnswer: "You mustn't enter this room.", parts: ['تحويل'] },
  { id: 'p32-5', section: 32, number: 5, prompt: 'Students have to bring their books. المطلوب: غير ضروري.', options: [], sourceAnswer: "Students don't have to bring their books.", parts: ['تحويل'] },
];
export function practices44(section: number): Practice44[] { return PRACTICE_44.filter(p => p.section === section); }
