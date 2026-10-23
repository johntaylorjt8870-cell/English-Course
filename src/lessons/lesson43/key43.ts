// مفتاح التصحيح التفصيلي للاختبار النهائي (§34) — لا يُحمَّل أثناء التعلّم.
// يُستورد فقط عند التسليم (لحساب النتيجة) أو من خلال مساحة المعلم المحمية.
// عمود `source` هو نص السبب كما ورد حرفيًا في §34، وعمود `reason` شرح المنصة
// للوظيفة النحوية المختبَرة.
import { TEST_QUESTIONS_43, fieldKey43, type TestAnswers43 } from "./testData43";
import { normalize43 } from "./practice43";

export type KeyEntry43 = {
  id: string;
  number: number;
  level: number;
  function: string;
  answer: string;
  accept?: string[];
  keywords?: string[][];
  source: string;
  reason: string;
  provenance: string;
};

const KEY_ENTRIES_43: KeyEntry43[] = [
  // ---------- المستوى الأول ----------
  {
    id: "q1", number: 1, level: 1,
    function: "ثبات الفعل الناقص مع جميع الضمائر · MAY + V1",
    answer: "A — may", accept: ["A. may", "may", "A — may"],
    source: "السبب: MAY فعل ناقص ثابت الصيغة.",
    reason: "MAY فعل ناقص ثابت لا يأخذ -s مع أي فاعل، والفعل الرئيسي come يبقى V1. لا وجود لصيغة mays، ولا to بعد الفعل الناقص.",
  },
  {
    id: "q2", number: 2, level: 1,
    function: "MIGHT + V1",
    answer: "B — arrive", accept: ["B. arrive", "arrive", "B — arrive"],
    source: "السبب: بعد MIGHT نستخدم V1.",
    reason: "بعد MIGHT يأتي الفعل الرئيسي بصيغته الأساسية V1 مباشرة: arrive، لا arrives ولا arriving.",
  },
  {
    id: "q3", number: 3, level: 1,
    function: "طلب الإذن · May I...? بلا do-support",
    answer: "A — May", accept: ["A. May", "May", "A — May"],
    source: "السبب: طلب إذن مهذب.",
    reason: "May I use your pen, please? طلب إذن مهذب يبدأ بالفعل الناقص نفسه؛ لا نستخدم Do أو Does مع MAY.",
  },
  {
    id: "q4", number: 4, level: 1,
    function: "MAY NOT + V1",
    answer: "B — know", accept: ["B. know", "know", "B — know"],
    source: "السبب: بعد MAY NOT نستخدم V1.",
    reason: "النفي يوضع على الفعل الناقص (may not)، ويبقى الفعل الرئيسي بصيغة V1: know لا knows ولا knowing.",
  },
  {
    id: "q5", number: 5, level: 1,
    function: "احتمال الماضي · MAY HAVE + V3",
    answer: "C — missed", accept: ["C. missed", "missed", "C — missed"],
    source: "السبب: MAY HAVE + V3.",
    reason: "MAY HAVE + V3: missed هي صيغة V3 من miss، لا miss ولا missing. الحدث ماضٍ وغير مؤكد.",
  },
  // ---------- المستوى الثاني ----------
  {
    id: "q6", number: 6, level: 2,
    function: "MAY للاحتمال المستقبلي · MAY + V1",
    answer: "It may rain tomorrow.", accept: ["may rain", "it may rain tomorrow"],
    source: "It may rain tomorrow.",
    reason: "MAY + V1 (rain) للاحتمال المستقبلي، ولا تُغيّر الفعل إلى rainy أو raining.",
  },
  {
    id: "q7", number: 7, level: 2,
    function: "MIGHT + الصيغة الأساسية من BE",
    answer: "He might be tired.", accept: ["might be", "he might be tired"],
    source: "He might be tired.",
    reason: "بعد MIGHT نستخدم الصيغة الأساسية من BE: be لا is ولا are.",
  },
  {
    id: "q8", number: 8, level: 2,
    function: "MAY NOT + V1",
    answer: "They may not come today.", accept: ["may not come", "they may not come today"],
    source: "They may not come today.",
    reason: "النفي يوضع بعد الفعل الناقص مباشرة: may not ثم V1 (come).",
  },
  {
    id: "q9", number: 9, level: 2,
    function: "احتمال الماضي · MIGHT HAVE + V3",
    answer: "She might have forgotten the meeting.",
    accept: ["might have forgotten", "she might have forgotten the meeting"],
    source: "She might have forgotten the meeting.",
    reason: "احتمال الماضي: MIGHT + have + V3 — forgotten هي صيغة V3 من forget، لا forgot.",
  },
  {
    id: "q10", number: 10, level: 2,
    function: "احتمال الماضي · MAY HAVE + V3",
    answer: "We may have made a mistake.",
    accept: ["may have made", "we may have made a mistake"],
    source: "We may have made a mistake.",
    reason: "MAY + have + V3 — made هي صيغة V3 من make، لا make ولا making.",
  },
  // ---------- المستوى الثالث ----------
  {
    id: "q11", number: 11, level: 3,
    function: "ثبات الفعل الناقص · لا -s",
    answer: "She may be at home.", accept: ["she may be at home"],
    source: "She may be at home.",
    reason: "MAY ثابتة لا تأخذ -s، وBE تبقى بصيغتها الأساسية be. لا She mays be.",
  },
  {
    id: "q12", number: 12, level: 3,
    function: "MIGHT + V1",
    answer: "He might come tomorrow.", accept: ["he might come tomorrow"],
    source: "He might come tomorrow.",
    reason: "بعد MIGHT يأتي V1: come لا comes.",
  },
  {
    id: "q13", number: 13, level: 3,
    function: "MAY + V1 · لا to",
    answer: "They may visit us.", accept: ["they may visit us"],
    source: "They may visit us.",
    reason: "لا نضع to بعد MAY؛ بعدها V1 مباشرة: may visit.",
  },
  {
    id: "q14", number: 14, level: 3,
    function: "MAY HAVE + V3",
    answer: "She may have gone home.", accept: ["she may have gone home"],
    source: "She may have gone home.",
    reason: "MAY HAVE + V3 — gone هي صيغة V3 من go، لا went.",
  },
  {
    id: "q15", number: 15, level: 3,
    function: "MAYBE ظرف مستقل يحتاج جملة كاملة",
    answer: "Maybe he is tired.", accept: ["maybe he is tired", "he may be tired"],
    source: "Maybe he is tired. أو: He may be tired.",
    reason: "Maybe ظرف مستقل يحتاج جملة كاملة بفعلها: Maybe he is tired. أو البديل النحوي He may be tired.",
  },
  // ---------- المستوى الرابع ----------
  {
    id: "q16", number: 16, level: 4,
    function: "الفرق بين التأكيد وعدمه — دور الفعل الناقص",
    answer: "الأولى تقدم المعلومة بوصفها حقيقة، والثانية تعبّر عن احتمال.",
    keywords: [["حقيقة", "fact", "مؤكد", "certain", "واقع"], ["احتمال", "possibility", "probability", "uncertain"]] ,
    source: "الأولى تقدم المعلومة بوصفها حقيقة، والثانية تعبّر عن احتمال.",
    reason: "She is at home تقرر واقعًا مؤكدًا، أما She may be at home فتجعل وجودها في المنزل احتمالًا — الفعل الناقص يغيّر موقف المتحدث لا الحدث نفسه.",
  },
  {
    id: "q17", number: 17, level: 4,
    function: "MAY ليست دائمًا أقوى من MIGHT · لا نسب مئوية ثابتة",
    answer: "لا. قد تبدو MIGHT أكثر تحفظًا في بعض السياقات، لكن لا توجد قاعدة ثابتة تجعلها دائمًا أضعف من MAY بنسبة محددة.",
    keywords: [["لا", "not", "ليس", "لا دائما", "لا دائمًا"], ["تحفظ", "reserved", "cautious", "tentative", "أكثر", "weaker", "أضعف", "احتمال"]] ,
    source: "لا. قد تبدو MIGHT أكثر تحفظًا في بعض السياقات، لكن لا توجد قاعدة ثابتة تجعلها دائمًا أضعف من MAY بنسبة محددة.",
    reason: "MAY وMIGHT يتداخلان في كثير من الجمل اليومية، وقد توحي MIGHT بدرجة أكبر من التحفظ في سياق معين، لكن لا توجد قاعدة نسبية ثابتة (لا 70%/30%).",
  },
  {
    id: "q18", number: 18, level: 4,
    function: "MAYBE ظرف مستقل مقابل MAY BE (فعل ناقص + BE)",
    answer: "الأولى تستخدم Maybe ظرفًا مستقلًا، والثانية تستخدم may فعلًا ناقصًا يتبعه be.",
    keywords: [["ظرف", "adverb", "كلمة واحدة", "one word", "مستقل"], ["may be", "فعل ناقص", "modal", "كلمتان", "الصيغة الأساسية"]] ,
    source: "الأولى تستخدم Maybe ظرفًا مستقلًا، والثانية تستخدم may فعلًا ناقصًا يتبعه be. المعنى متقارب، لكن التركيب مختلف.",
    reason: "Maybe ظرف مستقل يحتاج جملة كاملة بعده، بينما may be تركيب من فعل ناقص (may) + الصيغة الأساسية من BE.",
  },
  {
    id: "q19", number: 19, level: 4,
    function: "احتمال الماضي · MIGHT HAVE + V3",
    answer: "ربما نسي الموعد. الجملة تعبّر عن احتمال يتعلق بالماضي.",
    keywords: [["نسي", "forgot", "forgotten", "الموعد", "appointment"], ["الماضي", "past", "احتمال", "possibility"]] ,
    source: "ربما نسي الموعد. الجملة تعبّر عن احتمال يتعلق بالماضي.",
    reason: "He might have forgotten the appointment تطرح احتمالًا يتعلق بحدث ماضٍ، ولا تقرر أنه نسي الموعد فعلًا.",
  },
  {
    id: "q20", number: 20, level: 4,
    function: "MAY لطلب الإذن",
    answer: "طلب إذن مهذب.",
    keywords: [["طلب إذن", "permission", "استئذان", "allow"], ["مهذb", "polite", "مهذبة", "رسمية"]] ,
    source: "طلب إذن مهذب.",
    reason: "May I ask a question? تطلب الإذن بصورة مهذبة؛ MAY هنا لا تعبّر عن احتمال بل عن استئذان.",
  },
  // ---------- المستوى الخامس ----------
  {
    id: "q21", number: 21, level: 5,
    function: "MAY للاحتمال في الحاضر",
    answer: "may", accept: ["may", "he may be at the library"],
    source: "may. أو: He may be at the library.",
    reason: "He may be at the library احتمال في الحاضر باستخدام MAY + الصيغة الأساسية من BE.",
  },
  {
    id: "q22", number: 22, level: 5,
    function: "احتمال الماضي · MIGHT HAVE + V3",
    answer: "might", accept: ["might", "he might have missed the bus"],
    source: "might. أو: He might have missed the bus.",
    reason: "He might have missed the bus احتمال يتعلق بالماضي: MIGHT + have + V3 (missed).",
  },
  {
    id: "q23", number: 23, level: 5,
    function: "طلب مهذب باستخدام MAY",
    answer: "May", accept: ["May", "May I ask everyone"],
    source: "May. أو: May I ask everyone to take their seats, please?",
    reason: "May I ask everyone to take their seats, please? طلب إذن مهذب يبدأ بـ May نفسها.",
  },
  {
    id: "q24", number: 24, level: 5,
    function: "MAY NOT لاحتمال عدم الحدوث",
    answer: "may", accept: ["may", "omar may not arrive on time", "may not"],
    source: "may. أو: Omar may not arrive on time.",
    reason: "Omar may not arrive on time تعبّر عن احتمال عدم الوصول — لا عن منع، فلا نستخدم must not.",
  },
  {
    id: "q25", number: 25, level: 5,
    function: "MAYBE بوصفها كلمة مستقلة",
    answer: "Maybe", accept: ["Maybe", "maybe he has a good reason"],
    source: "Maybe. أو: Maybe he has a good reason.",
    reason: "Maybe he has a good reason. MAYBE تقف مستقلة بوصفها ظرفًا في بداية الجملة.",
  },
];

export type Graded43 = {
  id: string;
  number: number;
  level: number;
  correct: boolean;
  answer: string;
  function: string;
  source: string;
  reason: string;
  provenance: string;
};

export type TestResult43 = { results: Graded43[]; score: number; total: number };

function entryFor43(id: string): KeyEntry43 {
  const found = SOLUTIONS_43.find((entry) => entry.id === id);
  if (!found) throw new Error(`No key for test question ${id}`);
  return found;
}

function questionFor43(id: string) {
  const found = TEST_QUESTIONS_43.find((question) => question.id === id);
  if (!found) throw new Error(`No test question ${id}`);
  return found;
}

function fieldCorrect43(questionId: string, fieldKey: string, answers: TestAnswers43, entry: KeyEntry43): boolean {
  const value = normalize43(answers[fieldKey43(questionId, fieldKey)] ?? "");
  if (!value) return false;
  if (entry.keywords) {
    return entry.keywords.every((group) => group.some((keyword) => value.includes(normalize43(keyword))));
  }
  const pool = [entry.answer, ...(entry.accept ?? [])].map(normalize43);
  return pool.includes(value) || pool.some((accepted) => accepted.length > 6 && value.includes(accepted));
}

export function grade43(answers: TestAnswers43): TestResult43 {
  const results = TEST_QUESTIONS_43.map((question) => {
    const entry = entryFor43(question.id);
    const correct = question.fields.every((f) => fieldCorrect43(question.id, f.key, answers, entry));
    return {
      id: question.id,
      number: question.number,
      level: question.level,
      correct,
      answer: entry.answer,
      function: entry.function,
      source: entry.source,
      reason: entry.reason,
    };
  });
  return { results, score: results.filter((r) => r.correct).length, total: results.length };
}

/** نسخة مصدرَة: كل مفتاح يسجّل مصدره الواضح في §34 — لا يُحذف هذا العمود. */
export const SOLUTIONS_43: KeyEntry43[] = KEY_ENTRIES_43.map((entry) => ({ ...entry, provenance: "المصدر: §34" }));
