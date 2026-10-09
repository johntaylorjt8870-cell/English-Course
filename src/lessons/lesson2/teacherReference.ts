import { EXERCISES, PRONOUNS } from './data';

// References are derived from the same objects used by the student activities.
// The local ordinal is NOT represented as printed textbook numbering.
export const LESSON2_REFERENCES = EXERCISES.flatMap(ex => ex.questions.map((q, index) => {
  const original = q;
  let prompt: string, answer: string, completed: string;
  if (ex.type === 'mc' && 'prompt' in q) {
    prompt = q.prompt; answer = q.options[q.answer]; completed = `${q.sub} ${answer}`;
  } else if (ex.type === 'fill' && 'before' in q) {
    prompt = `${q.before} … ${q.after}`; answer = q.answer; completed = `${q.before} ${answer} ${q.after}`;
  } else if ('wrong' in q) {
    prompt = q.wrong; answer = q.correct; completed = q.correct;
  } else if ('given' in q) {
    prompt = q.given; answer = q.answer; completed = q.answer;
  } else throw new Error('Unmapped Lesson 2 question');
  const pronoun = PRONOUNS.find(p => p.en === answer.split(' ')[0]);
  return {
    id: `${ex.id}/q${index + 1}`, activityId: ex.id, reference: ex.badge,
    title: ex.title, localOrdinal: index + 1, printedQuestionNumber: null, sourcePage: null,
    sourcePath: `src/lessons/lesson2/data.ts#${ex.id}.questions[${index}]`,
    original, prompt, answer, completed,
    originalHint: 'hint' in q ? q.hint : pronoun?.hint ?? null,
    platformExplanation: ex.type === 'mc' || ex.type === 'transform'
      ? 'حدد الاسم أو مجموعة الأسماء في السؤال، ثم استبدلها بالضمير المبين في الإجابة. أبقِ بقية الجملة كما وردت.'
      : 'حدد الفاعل أولًا: I يأخذ am؛ He / She / It والاسم المفرد تأخذ is؛ You / We / They والأسماء المجموعة تأخذ are. ضع الصيغة المناسبة في موضع فعل الكينونة، مع إبقاء بقية الجملة كما وردت.',
    provenance: 'canonical lesson data; external textbook page/printed question mapping unavailable',
  };
}));
