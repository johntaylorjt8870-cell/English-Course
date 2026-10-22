// مفتاح التصحيح التفصيلي للاختبار النهائي — لا يُحمَّل أثناء التعلّم.
// يُستورد فقط عند التسليم (لحساب النتيجة) أو من خلال مساحة المعلم المحمية.
import { TEST_QUESTIONS_41, answerKey41, type TestAnswers41 } from "./testData41";

export type KeyEntry41 = {
  id: string;
  number: number;
  level: number;
  /** الإجابة المعروضة في الحلول */
  answer: string;
  /** إجابات بديلة مقبولة لكل حقل (الحقل الأول هو المعيار) */
  accept?: string[];
  /** مجموعات كلمات مفتاحية للأسئلة التفسيرية: كل مجموعة تحتاج مطابقة واحدة على الأقل */
  keywords?: string[][];
  reason: string;
};

export const SOLUTIONS_41: KeyEntry41[] = [
  {
    id: "q1",
    number: 1,
    level: 1,
    answer: "Does",
    reason:
      "الفاعل she في Present Simple، وdoes تحمل علامة المفرد الغائب. لذلك يبقى الفعل الرئيسي speak بصيغة V1. Do لا تطابق she، وIs لا يمكن أن يتبعها فعل مجرد speak لأن is يحتاج V-ing.",
  },
  {
    id: "q2",
    number: 2,
    level: 1,
    answer: "Are",
    reason:
      "now وstudying يدلان على Present Continuous: are + they + studying (V-ing). Do يحتاج V1، وHave يحتاج been قبل studying.",
  },
  {
    id: "q3",
    number: 3,
    level: 1,
    answer: "Have",
    reason:
      "completed صيغة V3، وهي علامة Present Perfect: have + you + completed. Do لا يبني التام، وAre يحتاج V-ing.",
  },
  {
    id: "q4",
    number: 4,
    level: 1,
    answer: "Did",
    reason:
      "yesterday تثبت Past Simple. did تحمل الماضي، ويبقى visit بصيغة V1. Does مضارع، وWas لا يتبعها فعل مجرد visit.",
  },
  {
    id: "q5",
    number: 5,
    level: 1,
    answer: "Is",
    reason:
      "ready صفة تصف she، وBE الرابط يكوّن السؤال مباشرة: Is she ready? لا نستخدم does لأن الجملة بلا فعل رئيسي معجمي، ولا has لأنها ليست تامًا.",
  },
  {
    id: "q6",
    number: 6,
    level: 2,
    answer: "She doesn't like coffee.",
    accept: ["doesn't like", "does not like", "she does not like coffee"],
    reason:
      "نفي Present Simple مع she: does + not + V1. لذلك like بلا s. الصيغة الخاطئة doesn't likes تكرر علامة المفرد مرتين.",
  },
  {
    id: "q7",
    number: 7,
    level: 2,
    answer: "They haven't finished the project yet.",
    accept: ["haven't finished", "have not finished", "they have not finished the project yet"],
    reason:
      "yet تدل على Present Perfect: have + not + finished (V3). لا نستخدم didn't لأن الجملة لا تشير إلى زمن ماضٍ منتهٍ.",
  },
  {
    id: "q8",
    number: 8,
    level: 2,
    answer: "Were / watching",
    accept: ["were/watching"],
    reason:
      "at 8:00 yesterday تحدد Past Continuous: was/were + V-ing. مع you نستخدم were، والفعل الرئيسي watching. السؤال كاملًا: Were you watching television at 8:00 yesterday?",
  },
  {
    id: "q9",
    number: 9,
    level: 2,
    answer: "He doesn't have a bicycle.",
    accept: ["doesn't have", "does not have", "he does not have a bicycle"],
    reason:
      "have هنا فعل رئيسي بمعنى الامتلاك، فيأخذ do-support: does + not + have (V1). ملاحظة: الصيغة البريطانية He hasn't a bicycle مستخدمة في بعض الأنواع، لكن الصيغة التعليمية المعتمدة في المصدر هي doesn't have.",
  },
  {
    id: "q10",
    number: 10,
    level: 2,
    answer: "By Friday, we will have completed the report.",
    accept: ["will have completed", "we will have completed the report"],
    reason:
      "Future Perfect: will + have + completed (V3). الحد الزمني by Friday يوضح أن الإنجاز يكتمل قبل الموعد. لا نقول will completed ولا will have complete.",
  },
  {
    id: "q11",
    number: 11,
    level: 3,
    answer: "Does she study English?",
    accept: ["does she study english"],
    reason:
      "الخطأ: studies بعد does. does تحمل علامة المضارع للمفرد الغائب، فيعود الفعل الرئيسي إلى V1: study.",
  },
  {
    id: "q12",
    number: 12,
    level: 3,
    answer: "Did he go home?",
    accept: ["did he go home"],
    reason: "الخطأ: went بعد did. did تحمل الماضي، فيعود الفعل الرئيسي إلى V1: go.",
  },
  {
    id: "q13",
    number: 13,
    level: 3,
    answer: "Are you ready?",
    accept: ["are you ready"],
    reason:
      "الخطأ: إضافة do مع are. BE الرابط يكوّن السؤال مباشرة بتحريك are قبل الفاعل، ولا يحتاج do-support.",
  },
  {
    id: "q14",
    number: 14,
    level: 3,
    answer: "She has finished the assignment.",
    accept: ["she has finished the assignment"],
    reason: "الخطأ: finish بعد has. المساعد has في التام يتطلب V3: finished.",
  },
  {
    id: "q15",
    number: 15,
    level: 3,
    answer: "They will have been working for three hours by noon.",
    accept: ["they will have been working for three hours by noon"],
    reason:
      "الخطأ: being بعد have. Future Perfect Continuous يحتاج will + have + been + V-ing. been هي V3 من BE، وbeing صيغة V-ing لا تأتي بعد have.",
  },
  {
    id: "q16",
    number: 16,
    level: 4,
    answer: "فعل رئيسي بمعنى الامتلاك (main verb of possession).",
    keywords: [["رئيسي", "main"], ["امتلاك", "يملك", "لدى", "possession", "own", "have a laptop"]],
    reason:
      "في I have a laptop يأتي بعد have اسم (a laptop)، ولا يوجد V3 لبناء التام. لذلك have هي الفعل الرئيسي الذي يحمل معنى الامتلاك.",
  },
  {
    id: "q17",
    number: 17,
    level: 4,
    answer: "فعل مساعد يبني Present Perfect، والفعل الرئيسي هو bought.",
    keywords: [["مساعد", "auxiliary"], ["تام", "perfect", "bought", "v3"]],
    reason:
      "في I have bought a laptop يأتي بعد have الفعل bought بصيغة V3، فيكون التركيب have + V3 هو Present Perfect. have هنا مساعد، والرئيسي هو bought.",
  },
  {
    id: "q18",
    number: 18,
    level: 4,
    answer: "لأن does تحمل علامة المضارع والتطابق مع she، فيبقى الفعل الرئيسي work بصيغة V1.",
    keywords: [["does"], ["v1", "study", "work", "أساسية", "المضارع", "التطابق", "agreement", "third"]],
    reason:
      "does تحمل علامة المفرد الغائب في المضارع. لا نضيف العلامة نفسها إلى الفعل الرئيسي، لأن ذلك يكرر التطابق مرتين. لذلك Does she work? صحيحة، وDoes she works? خاطئة.",
  },
  {
    id: "q19",
    number: 19,
    level: 4,
    answer: "الجملة الثانية تستخدم do للتأكيد (Emphatic DO) على أن المتحدث يفهم فعلًا.",
    keywords: [["تأكيد", "emphasis", "emphatic", "emphasize", "emphasise", "do"], ["understand", "يفهم", "أفهم", "فعلًا", "really"]],
    reason:
      "I understand you جملة إثبات محايدة. أما I do understand you! فتضيف do المساعدة للتأكيد على صدق الفهم، والفعل الرئيسي يبقى V1. ليست سؤالًا ولا نفيًا، وفي النطق نشدد على do.",
  },
  {
    id: "q20",
    number: 20,
    level: 4,
    answer: "لأن has هي الفعل المساعد الأول في السلسلة، فنحرّكها وحدها. لا نضيف does مع مساعد موجود.",
    keywords: [["has"], ["المساعد الأول", "أول", "first", "سلسلة", "chain", "been"]],
    reason:
      "في She has been studying يكون has مساعد التام، وbeen مساعد الاستمرار، وstudying هو الفعل الرئيسي. عند السؤال نحرّك المساعد الأول فقط: Has she been studying? وإضافة does تكرر بناءً موجودًا أصلًا.",
  },
  {
    id: "q21",
    number: 21,
    level: 5,
    answer: "Do",
    reason:
      "Present Simple مع you وفعل رئيسي enjoy: Do you enjoy science? والجواب Yes, I do يطابق Do.",
  },
  {
    id: "q22",
    number: 22,
    level: 5,
    answer: "Are",
    reason:
      "Present Continuous: are + you + working (V-ing). الجواب I am preparing a robot يؤكد زمن المضارع المستمر.",
  },
  {
    id: "q23",
    number: 23,
    level: 5,
    answer: "Have",
    reason: "Present Perfect: have + you + finished (V3)، وyet تؤكد معنى «حتى الآن». الجواب Not yet.",
  },
  {
    id: "q24",
    number: 24,
    level: 5,
    answer: "Did",
    reason: "Past Simple مع yesterday: did + you + test (V1). الجواب Yes, I did يطابق Did.",
  },
  {
    id: "q25",
    number: 25,
    level: 5,
    answer: "Will",
    reason: "Future Perfect: will + you + have + completed (V3). will هي المساعد الأول، وتبقى have completed بعدها.",
  },
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.،,!?؟;؛:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keywordHit(answer: string, groups: string[][]): boolean {
  const value = normalize(answer);
  return groups.every((group) => group.some((word) => value.includes(normalize(word))));
}

export type Graded41 = KeyEntry41 & { correct: boolean; response: string };

export function grade41(answers: TestAnswers41): { results: Graded41[]; score: number; total: number } {
  const results = SOLUTIONS_41.map((entry) => {
    const question = TEST_QUESTIONS_41.find((q) => q.id === entry.id)!;
    const responses = question.fields.map((f) => answers[answerKey41(question.id, f.key)] ?? "");
    const response = responses.join(" / ").trim();
    let correct = false;
    if (entry.keywords) {
      correct = responses.length === 1 && keywordHit(responses[0], entry.keywords);
    } else if (responses.length > 1) {
      const pair = responses.map((value) => normalize(value)).join("/");
      const pool = [entry.answer, ...(entry.accept ?? [])].map((value) => normalize(value).replace(/\s*\/\s*/g, "/"));
      correct = pool.includes(pair);
    } else {
      const value = normalize(responses[0]);
      const pool = [entry.answer, ...(entry.accept ?? [])].map(normalize);
      correct = Boolean(value) && pool.includes(value);
    }
    return { ...entry, correct, response };
  });
  return { results, score: results.filter((r) => r.correct).length, total: SOLUTIONS_41.length };
}
