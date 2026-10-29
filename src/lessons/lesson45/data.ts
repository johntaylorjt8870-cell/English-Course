import type { FormulaPart45, SentenceToken45, Tone45 } from "./design45";
import type { ChoiceDrillItem45, ReadingQuestion45, TextDrillItem45 } from "./practice45";

export type StepKind45 =
  | "cover"
  | "objectives"
  | "lesson"
  | "dialogue"
  | "choicePractice"
  | "textPractice"
  | "reading"
  | "readingQuestions"
  | "writing"
  | "summary"
  | "test"
  | "teacher"
  | "roadmap";

export type Lesson45Step = {
  id: string;
  station: string;
  kind: StepKind45;
  title: string;
  emoji: string;
  tone: Tone45;
  lead: string;
  tip?: string;
  paragraphs?: string[];
  term?: {
    en: string;
    ar: string;
    desc: string;
    tone: Exclude<Tone45, "slate">;
    icon: string;
  };
  formula?: {
    parts: FormulaPart45[];
    suffix?: string;
  };
  sentences?: {
    tokens: SentenceToken45[];
    ar: string;
    punct?: string;
    defaultOpen?: boolean;
    badge?: string;
  }[];
  examples?: {
    en: string;
    ar: string;
    tag?: string;
    tone?: Tone45;
  }[];
  verdicts?: {
    ok: boolean;
    en: string;
    why?: string;
  }[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  note?: {
    emoji?: string;
    title?: string;
    body: string;
  };
  bullets?: string[];
  lab?: "advice" | "meaning" | "past" | "politeness";
  dialogueTurns?: {
    speaker: string;
    en: string;
    ar: string;
    tone?: "violet" | "sky";
  }[];
  dialogueNotes?: {
    expr: string;
    meaning: string;
  }[];
  choiceGroupId?: string;
  choiceItems?: readonly ChoiceDrillItem45[];
  textItems?: readonly TextDrillItem45[];
  readingParagraphs?: { en: string; ar: string }[];
  readingQuestions?: readonly ReadingQuestion45[];
};

export const LESSON_TITLE_45 = "SHOULD & OUGHT TO";
export const LESSON_SUBTITLE_45 =
  "النصيحة، والتوصيات، والتوقعات، والتحدث عن أخطاء الماضي";
export const LESSON_IDENTITY_45 = "The Art of Giving Smart Advice";

export const STATIONS_45 = [
  { name: "بوابة النصيحة", start: 0, end: 6, emoji: "💡" },
  { name: "النفي والأسئلة", start: 7, end: 10, emoji: "❓" },
  { name: "OUGHT TO", start: 11, end: 15, emoji: "⭐" },
  { name: "النصيحة أم الإلزام؟", start: 16, end: 17, emoji: "⚖️" },
  { name: "التوقع المعقول", start: 18, end: 19, emoji: "🔮" },
  { name: "النظر إلى الماضي", start: 20, end: 24, emoji: "⏳" },
  { name: "OUGHT TO HAVE", start: 25, end: 25, emoji: "🕰️" },
  { name: "HAD BETTER", start: 26, end: 27, emoji: "🚨" },
  { name: "النصيحة اللبقة", start: 28, end: 28, emoji: "🤝" },
  { name: "المحقق والتطبيق", start: 29, end: 34, emoji: "🕵️" },
  { name: "القراءة والإنجاز", start: 35, end: 41, emoji: "🏆" },
] as const;

// ---------------- مجموعات التدريبات التفاعلية ----------------

export const DETECTIVE_ITEMS_45: readonly TextDrillItem45[] = [
  {
    id: "det-1",
    promptEn: "She shoulds study harder.",
    hintAr: "اكتشف الخطأ في الفعل الناقص وأعد كتابة الجملة صحيحة",
    modelAnswer: "She should study harder.",
    accepted: ["she should study harder"],
    why: "الفعل الناقص should ثابت مع جميع الضمائر ولا يقبل -s.",
    badgeBroken: true,
  },
  {
    id: "det-2",
    promptEn: "He should to sleep earlier.",
    hintAr: "انتبه لما يأتي مباشرة بعد should",
    modelAnswer: "He should sleep earlier.",
    accepted: ["he should sleep earlier"],
    why: "بعد should يأتي الفعل المجرد V1 مباشرة دون حرف الجر to.",
    badgeBroken: true,
  },
  {
    id: "det-3",
    promptEn: "Do I should call him?",
    hintAr: "صحح طريقة تكوين السؤال",
    modelAnswer: "Should I call him?",
    accepted: ["should i call him"],
    why: "نبني السؤال بتقديم Should قبل الفاعل مباشرة ولا نستخدم Do معه.",
    badgeBroken: true,
  },
  {
    id: "det-4",
    promptEn: "You ought study more.",
    hintAr: "تذكّر العنصر الملازم لـ ought",
    modelAnswer: "You ought to study more.",
    accepted: ["you ought to study more"],
    why: "التركيب الكامل هو ought to + V1، لذا لا يجوز حذف to.",
    badgeBroken: true,
  },
  {
    id: "det-5",
    promptEn: "She ought to studies harder.",
    hintAr: "راقب صيغة الفعل بعد ought to",
    modelAnswer: "She ought to study harder.",
    accepted: ["she ought to study harder"],
    why: "بعد ought to يأتي الفعل بصيغته الأساسية المجردة V1 (study) لا studies.",
    badgeBroken: true,
  },
  {
    id: "det-6",
    promptEn: "I should have went home earlier.",
    hintAr: "انتبه لتصريف الفعل بعد should have",
    modelAnswer: "I should have gone home earlier.",
    accepted: ["i should have gone home earlier", "i should've gone home earlier"],
    why: "بعد should have نستخدم التصريف الثالث V3 (gone) وليس الماضي البسيط (went).",
    badgeBroken: true,
  },
  {
    id: "det-7",
    promptEn: "He shouldn't have ate so much.",
    hintAr: "صحح التصريف الثالث للفعل eat",
    modelAnswer: "He shouldn't have eaten so much.",
    accepted: [
      "he shouldn't have eaten so much",
      "he should not have eaten so much",
    ],
    why: "التصريف الثالث V3 من eat هو eaten وليس ate.",
    badgeBroken: true,
  },
  {
    id: "det-8",
    promptEn: "You had better to leave now.",
    hintAr: "انتبه للتركيب بعد had better",
    modelAnswer: "You had better leave now.",
    accepted: ["you had better leave now", "you'd better leave now"],
    why: "بعد had better يأتي الفعل المجرد V1 مباشرة دون to.",
    badgeBroken: true,
  },
  {
    id: "det-9",
    promptEn: "She doesn't should worry.",
    hintAr: "صحح نفي الفعل الناقص",
    modelAnswer: "She shouldn't worry.",
    accepted: ["she shouldn't worry", "she should not worry"],
    why: "ننفي should بإضافة not بعدها مباشرة (shouldn't) دون doesn't.",
    badgeBroken: true,
  },
  {
    id: "det-10",
    promptEn: "We should have checked the answers yesterday, but we don't.",
    hintAr: "انتبه لتوافق زمن الشق الثاني مع yesterday",
    modelAnswer: "We should have checked the answers yesterday, but we didn't.",
    accepted: [
      "we should have checked the answers yesterday but we didn't",
      "we should have checked the answers yesterday, but we didn't",
      "we should've checked the answers yesterday but we didn't",
      "we should have checked the answers yesterday but we did not",
    ],
    why: "لأن الحدث في الماضي (yesterday)، يكون النفي في الشق الثاني بالماضي didn't لا don't.",
    badgeBroken: true,
  },
] as const;

export const PRACTICE_SHOULD_ITEMS_45: readonly ChoiceDrillItem45[] = [
  {
    id: "p1-1",
    en: "You ___ drink enough water every day.",
    options: ["should", "shouldn't"],
    answer: "should",
    why: "شرب الماء الكافي عادة صحية ننصح بالقيام بها.",
  },
  {
    id: "p1-2",
    en: "Students ___ cheat in exams.",
    options: ["should", "shouldn't"],
    answer: "shouldn't",
    why: "الغش سلوك خاطئ ننصح بتجنبه تمامًا.",
  },
  {
    id: "p1-3",
    en: "We ___ protect the environment.",
    options: ["should", "shouldn't"],
    answer: "should",
    why: "حماية البيئة تصرف إيجابي ومسؤول ينبغي القيام به.",
  },
  {
    id: "p1-4",
    en: "He ___ stay up too late before an exam.",
    options: ["should", "shouldn't"],
    answer: "shouldn't",
    why: "السهر الطويل ليلة الامتحان يضر التركيز فمن الأفضل تجنبه.",
  },
  {
    id: "p1-5",
    en: "She ___ ask her teacher if she doesn't understand.",
    options: ["should", "shouldn't"],
    answer: "should",
    why: "سؤال المعلم عند عدم الفهم نصيحة إيجابية مفيدة.",
  },
  {
    id: "p1-6",
    en: "You ___ waste your time on unimportant things.",
    options: ["should", "shouldn't"],
    answer: "shouldn't",
    why: "إهدار الوقت تصرف غير مناسب ننصح بعدم فعله.",
  },
] as const;

export const PRACTICE_OUGHT_ITEMS_45: readonly TextDrillItem45[] = [
  {
    id: "p2-1",
    promptEn: "You should respect others.",
    hintAr: "أعد كتابة الجملة باستخدام ought to",
    modelAnswer: "You ought to respect others.",
    accepted: ["you ought to respect others"],
    why: "نستبدل should بـ ought to ويبقى الفعل respect بصيغة V1.",
  },
  {
    id: "p2-2",
    promptEn: "She should apologise.",
    hintAr: "أعد كتابة الجملة باستخدام ought to",
    modelAnswer: "She ought to apologise.",
    accepted: ["she ought to apologise", "she ought to apologize"],
    why: "ought to لا تتغير مع الفاعل المفرد She ويتبعها الفعل المجرد.",
  },
  {
    id: "p2-3",
    promptEn: "We should help our neighbours.",
    hintAr: "أعد كتابة الجملة باستخدام ought to",
    modelAnswer: "We ought to help our neighbours.",
    accepted: ["we ought to help our neighbours", "we ought to help our neighbors"],
    why: "نضع ought to قبل الفعل الأساسي help.",
  },
  {
    id: "p2-4",
    promptEn: "He should be more careful.",
    hintAr: "أعد كتابة الجملة باستخدام ought to",
    modelAnswer: "He ought to be more careful.",
    accepted: ["he ought to be more careful"],
    why: "يبقى الفعل be بصيغته الأساسية المجردة بعد ought to.",
  },
  {
    id: "p2-5",
    promptEn: "They should tell the truth.",
    hintAr: "أعد كتابة الجملة باستخدام ought to",
    modelAnswer: "They ought to tell the truth.",
    accepted: ["they ought to tell the truth"],
    why: "They + ought to + tell (V1) للتعبير عن الصواب الأخلاقي.",
  },
] as const;

export const PRACTICE_QUESTION_ITEMS_45: readonly TextDrillItem45[] = [
  {
    id: "p3-1",
    promptEn: "I should call the teacher.",
    hintAr: "حوّل الجملة إلى سؤال يبدأ بـ Should",
    modelAnswer: "Should I call the teacher?",
    accepted: ["should i call the teacher"],
    why: "نقدم Should قبل الفاعل I ويبقى الفعل call بصيغة V1.",
  },
  {
    id: "p3-2",
    promptEn: "We should leave now.",
    hintAr: "حوّل الجملة إلى سؤال يبدأ بـ Should",
    modelAnswer: "Should we leave now?",
    accepted: ["should we leave now"],
    why: "Should + we + leave now? دون استخدام Do.",
  },
  {
    id: "p3-3",
    promptEn: "She should study harder.",
    hintAr: "حوّل الجملة إلى سؤال يبدأ بـ Should",
    modelAnswer: "Should she study harder?",
    accepted: ["should she study harder"],
    why: "نقدم Should قبل الفاعل she ويبقى study مجردًا دون -s.",
  },
  {
    id: "p3-4",
    promptEn: "They should bring their books.",
    hintAr: "حوّل الجملة إلى سؤال يبدأ بـ Should",
    modelAnswer: "Should they bring their books?",
    accepted: ["should they bring their books"],
    why: "Should + they + bring (V1)...?",
  },
  {
    id: "p3-5",
    promptEn: "Omar should apologise.",
    hintAr: "حوّل الجملة إلى سؤال يبدأ بـ Should",
    modelAnswer: "Should Omar apologise?",
    accepted: ["should omar apologise", "should omar apologize"],
    why: "نضع Should قبل الاسم Omar ويبقى الفعل بصيغته المجردة.",
  },
] as const;

export const PRACTICE_PAST_ITEMS_45: readonly TextDrillItem45[] = [
  {
    id: "p4-1",
    promptEn: "I failed because I didn't study enough. I ___ (study) harder.",
    hintAr: "اكتب صيغة الماضي المناسبة (should have / shouldn't have + V3)",
    modelAnswer: "should have studied",
    accepted: [
      "should have studied",
      "should've studied",
      "i should have studied harder",
      "i should've studied harder",
    ],
    why: "الدراسة بجد لم تحدث في الماضي وكان الأفضل حدوثها: should have studied.",
  },
  {
    id: "p4-2",
    promptEn: "She shouted at her friend and regrets it. She ___ (shout) at her friend.",
    hintAr: "فعل وقع وتندم عليه الآن",
    modelAnswer: "shouldn't have shouted",
    accepted: [
      "shouldn't have shouted",
      "should not have shouted",
      "she shouldn't have shouted at her friend",
      "she should not have shouted at her friend",
    ],
    why: "الصراخ وقع فعلًا وكان الأفضل تجنبه: shouldn't have shouted.",
  },
  {
    id: "p4-3",
    promptEn: "We missed the bus because we left late. We ___ (leave) earlier.",
    hintAr: "فعل لم يحدث وكان الأفضل القيام به",
    modelAnswer: "should have left",
    accepted: [
      "should have left",
      "should've left",
      "we should have left earlier",
      "we should've left earlier",
    ],
    why: "المغادرة المبكرة لم تحدث؛ التصريف الثالث من leave هو left: should have left.",
  },
  {
    id: "p4-4",
    promptEn: "He ate too much and feels uncomfortable. He ___ (eat) so much.",
    hintAr: "فعل وقع في الماضي وكان الأفضل عدم فعله",
    modelAnswer: "shouldn't have eaten",
    accepted: [
      "shouldn't have eaten",
      "should not have eaten",
      "he shouldn't have eaten so much",
      "he should not have eaten so much",
    ],
    why: "الأكل المفرط وقع فعلًا، والتصريف الثالث من eat هو eaten: shouldn't have eaten.",
  },
  {
    id: "p4-5",
    promptEn: "They made a mistake because they didn't check. They ___ (check) the information.",
    hintAr: "فعل ماضٍ أُهمل وكان ينبغي القيام به",
    modelAnswer: "should have checked",
    accepted: [
      "should have checked",
      "should've checked",
      "they should have checked the information",
      "they should've checked the information",
    ],
    why: "التحقق من المعلومات لم يحدث في الماضي: should have checked.",
  },
] as const;

export const PRACTICE_EXPECTATION_ITEMS_45: readonly ChoiceDrillItem45[] = [
  {
    id: "p5-1",
    en: "You should practise every day.",
    options: ["نصيحة", "نصيحة بعدم الفعل", "توقع"],
    optionsDir: "rtl",
    answer: "نصيحة",
    why: "الجملة توجه إرشادًا عمليًا للمخاطب بالتدرب يوميًا.",
  },
  {
    id: "p5-2",
    en: "The train should arrive soon.",
    options: ["نصيحة", "نصيحة بعدم الفعل", "توقع"],
    optionsDir: "rtl",
    answer: "توقع",
    why: "القطار لا يتلقى نصيحة؛ الجملة تعبر عن توقع معقول بقرب وصوله.",
  },
  {
    id: "p5-3",
    en: "She should ask for help.",
    options: ["نصيحة", "نصيحة بعدم الفعل", "توقع"],
    optionsDir: "rtl",
    answer: "نصيحة",
    why: "توصية بالتصرف الأنسب لها في هذا الموقف.",
  },
  {
    id: "p5-4",
    en: "The results should be ready tomorrow.",
    options: ["نصيحة", "نصيحة بعدم الفعل", "توقع"],
    optionsDir: "rtl",
    answer: "توقع",
    why: "تقدير منطقي لموعد جهوزية النتائج غدًا.",
  },
  {
    id: "p5-5",
    en: "We shouldn't waste water.",
    options: ["نصيحة", "نصيحة بعدم الفعل", "توقع"],
    optionsDir: "rtl",
    answer: "نصيحة بعدم الفعل",
    why: "توصية بتجنب سلوك غير سليم وهو إهدار الماء.",
  },
  {
    id: "p5-6",
    en: "The package should reach us by Friday.",
    options: ["نصيحة", "نصيحة بعدم الفعل", "توقع"],
    optionsDir: "rtl",
    answer: "توقع",
    why: "توقع معقول لوصول الطرد بحلول يوم الجمعة.",
  },
] as const;

export const READING_QUESTIONS_45: readonly ReadingQuestion45[] = [
  {
    id: "rq-1",
    qEn: "What is Omar preparing for?",
    qAr: "لأي شيء يستعد عمر؟",
    answerEn: "He is preparing for an important science competition.",
    answerAr: "يستعد لمسابقة علمية مهمة.",
  },
  {
    id: "rq-2",
    qEn: "What does his teacher advise him to do?",
    qAr: "بمَ نصحه معلمه قبل أن يبدأ؟",
    answerEn: "To make a clear plan and divide his work into smaller tasks.",
    answerAr: "أن يضع خطة واضحة ويقسّم عمله إلى مهام أصغر.",
  },
  {
    id: "rq-3",
    qEn: "Does Omar follow the advice immediately?",
    qAr: "هل عمل عمر بالنصيحة فورًا؟",
    answerEn: "No, he doesn't. He decides to start without a plan.",
    answerAr: "لا، بل قرر البدء دون خطة.",
  },
  {
    id: "rq-4",
    qEn: "What mistake does he make?",
    qAr: "ما الخطأ الذي وقع فيه؟",
    answerEn: "He starts without a plan and forgets several important details.",
    answerAr: "بدأ بلا خطة واضحة فنسي عدة تفاصيل مهمة.",
  },
  {
    id: "rq-5",
    qEn: "What does “I should have listened to my teacher” express?",
    qAr: "عَمَّ تعبّر جملة I should have listened to my teacher؟",
    answerEn: "Past regret about not following his teacher's advice.",
    answerAr: "ندم على الماضي لأنه لم يستمع لنصيحة معلمه.",
  },
  {
    id: "rq-6",
    qEn: "What does “I shouldn't have wasted so much time” express?",
    qAr: "عَمَّ تعبّر جملة I shouldn't have wasted so much time؟",
    answerEn: "Regret about an action he did in the past (wasting time).",
    answerAr: "ندم على تصرف وقع في الماضي وكان الأفضل تجنبه (إضاعة الوقت).",
  },
  {
    id: "rq-7",
    qEn: "What does Maya advise Omar to do?",
    qAr: "بمَ نصحت مايا صديقها عمر؟",
    answerEn: "To focus on what he can do now, make a checklist, and finish one task at a time.",
    answerAr: "أن يركز على ما يستطيع فعله الآن، ويعدّ قائمة مهام، وينجز مهمة واحدة في كل مرة.",
  },
  {
    id: "rq-8",
    qEn: "What does “The final version should be ready by Monday” express?",
    qAr: "ما المعنى الذي تفيده جملة The final version should be ready by Monday؟",
    answerEn: "A reasonable expectation about the future.",
    answerAr: "توقع منطقي معقول باكتمال النسخة النهائية يوم الإثنين.",
  },
  {
    id: "rq-9",
    qEn: "Extract an example of OUGHT TO from the passage.",
    qAr: "استخرج من القصة جملة تحتوي على OUGHT TO.",
    answerEn: "You ought to divide your work into smaller tasks.",
    answerAr: "الجملة: You ought to divide your work into smaller tasks.",
  },
  {
    id: "rq-10",
    qEn: "What lesson does Omar learn?",
    qAr: "ما الدرس الذي تعلّمه عمر في نهاية القصة؟",
    answerEn: "Good advice can save time and prevent mistakes.",
    answerAr: "أن النصيحة الجيدة توفّر الوقت وتمنع الوقوع في الأخطاء.",
  },
] as const;

// ---------------- خطوات الدرس الـ 42 كاملة ----------------

export const STEPS_45: readonly Lesson45Step[] = [
  // 0 — الغلاف
  {
    id: "cover",
    station: "بوابة النصيحة",
    kind: "cover",
    title: "The Art of Giving Smart Advice",
    emoji: "💡",
    tone: "violet",
    lead: "الدرس 45 · النصيحة، والتوصيات، والتوقعات، والتحدث عن أخطاء الماضي",
    paragraphs: [
      "تخيّل أن صديقك عمر يشعر بالتعب لأنه ينام متأخرًا كل ليلة، فيسألك عن القرار الأفضل.",
      "في هذا الدرس نتعلم كيف نقدّم نصيحة للحاضر أو المستقبل، وكيف نعبّر عن التوقع المعقول، وكيف نراجع قرارات الماضي بدقة ولباقة.",
    ],
    examples: [
      {
        en: "What should I do? — You should go to bed earlier.",
        ar: "ماذا ينبغي أن أفعل؟ — ينبغي أن تنام في وقت أبكر.",
        tag: "نصيحة للحاضر",
        tone: "sky",
      },
      {
        en: "You ought to start revising now.",
        ar: "ينبغي أن تبدأ المراجعة الآن (امتحانك غدًا).",
        tag: "توصية بالصواب",
        tone: "orange",
      },
      {
        en: "You should have studied earlier.",
        ar: "كان ينبغي أن تدرس في وقت أبكر (مراجعة بعد الامتحان).",
        tag: "مراجعة الماضي",
        tone: "emerald",
      },
    ],
  },

  // 1 — الأهداف
  {
    id: "objectives",
    station: "بوابة النصيحة",
    kind: "objectives",
    title: "أهداف الدرس",
    emoji: "🎯",
    tone: "violet",
    lead: "بنهاية هذا الدرس ستستطيع استخدام تراكيب النصيحة والتوقع والنظر إلى الماضي بثقة ودقة:",
    bullets: [
      "استخدام SHOULD لتقديم النصيحة والتوصية بصورة صحيحة.",
      "استخدام SHOULDN'T للتحذير اللطيف من تصرف غير مناسب.",
      "تكوين أسئلة نعم/لا وأسئلة أدوات الاستفهام WH باستخدام SHOULD.",
      "استخدام OUGHT TO ومقارنته بـ SHOULD في المعنى والتركيب.",
      "التمييز الدقيق بين النصيحة (SHOULD) والضرورة والإلزام (MUST / HAVE TO).",
      "استخدام SHOULD و OUGHT TO للتعبير عن التوقعات المعقولة.",
      "فهم صيغتَي SHOULD HAVE + V3 و SHOULDN'T HAVE + V3 لتقييم الماضي.",
      "استخدام HAD BETTER للنصيحة القوية المرتبطة بعاقبة محتملة.",
      "تقديم نصائح طبيعية ومهذبة في مواقف الحياة اليومية.",
    ],
    tip: "لا نكتفي هنا بحفظ الصيغة، بل نتعلّم متى تكون النصيحة هادئة ومتى تكون تحذيرًا عاجلًا ومتى تكون تقييمًا للماضي.",
  },

  // 2 — معنى SHOULD
  {
    id: "meaning",
    station: "بوابة النصيحة",
    kind: "lesson",
    title: "ما معنى SHOULD؟",
    emoji: "🧠",
    tone: "sky",
    lead: "SHOULD فعل مساعد ناقص — Modal Auxiliary Verb.",
    term: {
      en: "SHOULD",
      ar: "ينبغي / من الأفضل",
      desc: "نستخدمه لتقديم النصيحة (Giving Advice)، والتوصية بما نراه التصرف المناسب، والتوقع المعقول.",
      tone: "sky",
      icon: "💡",
    },
    paragraphs: [
      "لا تعني النصيحة بـ SHOULD أن هناك قانونًا صارمًا يجبر الشخص على الفعل؛ بل تعني أننا نرى هذا التصرف مفيدًا أو حكيمًا أو مناسبًا له.",
    ],
    examples: [
      {
        en: "You should drink more water.",
        ar: "ينبغي أن تشرب المزيد من الماء.",
        tag: "Giving Advice",
        tone: "sky",
      },
      {
        en: "You should practise English every day.",
        ar: "ينبغي أن تتدرب على الإنجليزية كل يوم.",
        tag: "Giving Advice",
        tone: "emerald",
      },
    ],
    tip: "تذكّر الفرق الجوهري: الإلزام يفرض الفعل، أما SHOULD فترشد إلى الخيار الأفضل.",
  },

  // 3 — القاعدة الأساسية
  {
    id: "form",
    station: "بوابة النصيحة",
    kind: "lesson",
    title: "القاعدة الأساسية لتركيب الجملة",
    emoji: "⚙️",
    tone: "orange",
    lead: "يأتي الفعل بعد SHOULD بصيغته الأساسية المجردة V1 دون أي إضافات.",
    formula: {
      parts: [
        { en: "Subject", ar: "الفاعل", tone: "sky" },
        { en: "should", ar: "ينبغي", tone: "orange" },
        { en: "V1 (Base Verb)", ar: "الفعل المجرد", tone: "emerald" },
      ],
    },
    verdicts: [
      { ok: true, en: "He should study.", why: "صحيح: should + الفعل المجرد V1" },
      { ok: false, en: "He should studies.", why: "خطأ: لا نضيف -s للفعل بعد should" },
      { ok: false, en: "He should to study.", why: "خطأ: لا نضع to بعد should" },
      { ok: false, en: "He should studying.", why: "خطأ: لا نضيف -ing للفعل بعد should" },
    ],
    examples: [
      { en: "I should study harder.", ar: "ينبغي أن أدرس بجد أكبر.", tone: "sky" },
      { en: "She should sleep earlier.", ar: "ينبغي أن تنام في وقت أبكر.", tone: "violet" },
      { en: "We should protect the environment.", ar: "ينبغي علينا حماية البيئة.", tone: "emerald" },
      { en: "They should listen carefully.", ar: "ينبغي أن يستمعوا بعناية.", tone: "orange" },
    ],
  },

  // 4 — ثبات SHOULD مع الضمائر
  {
    id: "pronouns",
    station: "بوابة النصيحة",
    kind: "lesson",
    title: "هل تتغير SHOULD مع الضمائر؟",
    emoji: "🔬",
    tone: "violet",
    lead: "القاعدة ثابتة تمامًا مع جميع الضمائر — لا توجد صيغة اسمها shoulds!",
    table: {
      headers: ["الضمير / الفاعل", "الفعل الناقص", "الفعل الرئيسي (V1)", "الجملة الكاملة"],
      rows: [
        ["I", "should", "study", "I should study."],
        ["You", "should", "study", "You should study."],
        ["He / She", "should", "study", "He / She should study."],
        ["It", "should", "work", "It should work."],
        ["We / They", "should", "study", "We / They should study."],
      ],
    },
    note: {
      emoji: "⚠️",
      title: "قاعدة ذهبية ثابتة",
      body: "سواء كان الفاعل مفردًا (He / She / It) أو جمعًا (We / They)، تبقى should كما هي تمامًا ويبقى الفعل بعدها مجردًا.",
    },
  },

  // 5 — النصيحة المباشرة + المختبر
  {
    id: "direct-advice",
    station: "بوابة النصيحة",
    kind: "lesson",
    title: "النصيحة المباشرة في المواقف اليومية",
    emoji: "💡",
    tone: "emerald",
    lead: "نستخدم SHOULD لاقتراح التصرف العملي الأنسب في كل موقف دون إجبار:",
    examples: [
      {
        en: "You should ask your teacher for help.",
        ar: "ينبغي أن تطلب المساعدة من معلمك (لصديق لا يفهم درسًا).",
        tag: "دراسة",
        tone: "sky",
      },
      {
        en: "You should take regular breaks.",
        ar: "ينبغي أن تأخذ فترات راحة منتظمة (لأخ يطيل استخدام الهاتف).",
        tag: "صحة",
        tone: "orange",
      },
      {
        en: "You should read short English stories.",
        ar: "ينبغي أن تقرئي قصصًا إنجليزية قصيرة (لتحسين اللغة).",
        tag: "تطوير اللغة",
        tone: "violet",
      },
      {
        en: "You should prepare a clear plan.",
        ar: "ينبغي أن تضع خطة واضحة (للنجاح في مسابقة علمية).",
        tag: "تنظيم",
        tone: "emerald",
      },
    ],
    lab: "advice",
  },

  // 6 — حوار A Friend Needs Advice
  {
    id: "dialogue",
    station: "بوابة النصيحة",
    kind: "dialogue",
    title: "A Friend Needs Advice",
    emoji: "🎭",
    tone: "violet",
    lead: "حوار تطبيقي يوضح كيف نستخدم SHOULD و COULD بسلاسة في الحديث اليومي:",
    dialogueTurns: [
      {
        speaker: "Maya",
        en: "I'm having trouble remembering new English words.",
        ar: "مايا: أواجه صعوبة في تذكّر الكلمات الإنجليزية الجديدة.",
        tone: "violet",
      },
      {
        speaker: "Omar",
        en: "You should revise them regularly.",
        ar: "عمر: ينبغي أن تراجعيها بانتظام.",
        tone: "sky",
      },
      {
        speaker: "Maya",
        en: "I try, but I forget them quickly.",
        ar: "مايا: أحاول ذلك، لكنني أنساها بسرعة.",
        tone: "violet",
      },
      {
        speaker: "Omar",
        en: "You should use each new word in a sentence.",
        ar: "عمر: ينبغي أن تستخدمي كل كلمة جديدة في جملة مفيدة.",
        tone: "sky",
      },
      {
        speaker: "Maya",
        en: "That's a good idea. Should I write the sentences in a notebook?",
        ar: "مايا: هذه فكرة جيدة. هل ينبغي أن أكتب الجمل في دفتر؟",
        tone: "violet",
      },
      {
        speaker: "Omar",
        en: "Yes, you should. You could also read them aloud.",
        ar: "عمر: نعم، ينبغي ذلك. ويمكنكِ أيضًا قراءتها بصوت مرتفع.",
        tone: "sky",
      },
      {
        speaker: "Maya",
        en: "Thanks! I'll try that.",
        ar: "مايا: شكرًا لك! سأجرّب هذه الطريقة.",
        tone: "violet",
      },
    ],
    dialogueNotes: [
      { expr: "You should revise...", meaning: "تقديم نصيحة عملية مباشرة" },
      { expr: "Should I write...?", meaning: "طلب النصيحة والتأكد من الفكرة" },
      { expr: "Yes, you should.", meaning: "إجابة قصيرة طبيعية للتأييد" },
      { expr: "You could also...", meaning: "اقتراح خيار إضافي مرن ولطيف" },
    ],
  },

  // 7 — SHOULDN'T
  {
    id: "shouldnt",
    station: "النفي والأسئلة",
    kind: "lesson",
    title: "SHOULDN'T — النصيحة بعدم الفعل",
    emoji: "🚫",
    tone: "rose",
    lead: "ننفي SHOULD بإضافة not بعدها مباشرة عندما نرى أن الفعل غير مناسب ومن الأفضل تجنبه.",
    formula: {
      parts: [
        { en: "Subject", ar: "الفاعل", tone: "sky" },
        { en: "should not / shouldn't", ar: "لا ينبغي", tone: "rose" },
        { en: "V1", ar: "الفعل المجرد", tone: "emerald" },
      ],
    },
    examples: [
      { en: "You shouldn't stay up too late.", ar: "لا ينبغي أن تسهر كثيرًا.", tone: "rose" },
      { en: "She shouldn't skip breakfast.", ar: "لا ينبغي أن تتجاوز وجبة الفطور.", tone: "orange" },
      { en: "We shouldn't waste water.", ar: "لا ينبغي أن نهدر الماء.", tone: "sky" },
      { en: "They shouldn't make fun of others.", ar: "لا ينبغي أن يسخروا من الآخرين.", tone: "violet" },
      {
        en: "You shouldn't use your phone too much.",
        ar: "من الأفضل ألا تستخدم هاتفك كثيرًا (نصيحة بالتجنب).",
        tag: "نصيحة",
        tone: "amber",
      },
      {
        en: "You mustn't use your phone during the exam.",
        ar: "يُمنع عليك استخدام هاتفك أثناء الامتحان (منع رسمي صارم).",
        tag: "منع قانوني",
        tone: "rose",
      },
    ],
    tip: "انتبه: SHOULDN'T تنصح بعدم الفعل لأنه غير مستحسن، بينما MUSTN'T تمنع الفعل منعًا باتًا.",
  },

  // 8 — السؤال باستخدام SHOULD
  {
    id: "questions",
    station: "النفي والأسئلة",
    kind: "lesson",
    title: "تكوين السؤال باستخدام SHOULD",
    emoji: "❓",
    tone: "violet",
    lead: "لأن SHOULD فعل مساعد ناقص، نضعه مباشرةً قبل الفاعل في السؤال ولا نستخدم معه DO أو DOES.",
    formula: {
      parts: [
        { en: "Should", ar: "هل ينبغي", tone: "violet" },
        { en: "Subject", ar: "الفاعل", tone: "sky" },
        { en: "V1", ar: "الفعل المجرد", tone: "emerald" },
      ],
      suffix: "?",
    },
    verdicts: [
      { ok: true, en: "Should I call him?", why: "تقديم Should قبل الفاعل مباشرة" },
      { ok: false, en: "Do I should call him?", why: "خطأ شائع: لا يجتمع Do مع الفعل الناقص should" },
    ],
    examples: [
      { en: "Should I call the teacher?", ar: "هل ينبغي أن أتصل بالمعلم؟", tone: "violet" },
      { en: "Should we leave now?", ar: "هل ينبغي أن نغادر الآن؟", tone: "sky" },
      { en: "Should she study more?", ar: "هل ينبغي أن تدرس أكثر؟", tone: "emerald" },
      { en: "Should they apologise?", ar: "هل ينبغي أن يعتذروا؟", tone: "orange" },
    ],
  },

  // 9 — الإجابات القصيرة
  {
    id: "short-answers",
    station: "النفي والأسئلة",
    kind: "lesson",
    title: "الإجابات القصيرة على أسئلة SHOULD",
    emoji: "💬",
    tone: "sky",
    lead: "نجيب باختصار باستخدام should أو shouldn't دون تكرار الفعل الرئيسي:",
    examples: [
      {
        en: "Should I study tonight? — Yes, you should. / No, you shouldn't.",
        ar: "هل ينبغي أن أدرس الليلة؟ — نعم، ينبغي ذلك / لا، لا ينبغي ذلك.",
        tone: "sky",
      },
      {
        en: "Should we bring our books? — Yes, you should. / No, you shouldn't.",
        ar: "هل ينبغي أن نحضر كتبنا؟ — نعم، ينبغي ذلك / لا، لا ينبغي ذلك.",
        tone: "emerald",
      },
    ],
    note: {
      emoji: "🔍",
      title: "فرق دقيق ومهم في الإجابة بـ No",
      body: "عبارة No, you shouldn't تعني أننا ننصح بعدم القيام بالفعل، أما عبارة No, you don't have to فتعني أن الفعل غير ضروري ولك حرية الاختيار.",
    },
  },

  // 10 — أسئلة WH
  {
    id: "wh",
    station: "النفي والأسئلة",
    kind: "lesson",
    title: "أسئلة أدوات الاستفهام WH مع SHOULD",
    emoji: "🔍",
    tone: "violet",
    lead: "نضع كلمة الاستفهام WH في البداية، يتبعها should ثم الفاعل ثم الفعل المجرد V1:",
    formula: {
      parts: [
        { en: "Wh-word", ar: "أداة السؤال", tone: "violet" },
        { en: "should", ar: "ينبغي", tone: "orange" },
        { en: "Subject", ar: "الفاعل", tone: "sky" },
        { en: "V1", ar: "الفعل المجرد", tone: "emerald" },
      ],
      suffix: "?",
    },
    examples: [
      { en: "What should I do?", ar: "ماذا ينبغي أن أفعل؟", tone: "violet" },
      { en: "Where should we go?", ar: "إلى أين ينبغي أن نذهب؟", tone: "sky" },
      { en: "When should she start studying?", ar: "متى ينبغي أن تبدأ الدراسة؟", tone: "emerald" },
      { en: "How should I solve this problem?", ar: "كيف ينبغي أن أحل هذه المسألة؟", tone: "orange" },
      { en: "Why should we protect the environment?", ar: "لماذا ينبغي علينا حماية البيئة؟", tone: "sky" },
      {
        en: "Who should lead the team?",
        ar: "مَن ينبغي أن يقود الفريق؟ (هنا Who تسأل عن الفاعل نفسه).",
        tag: "سؤال عن الفاعل",
        tone: "violet",
      },
    ],
  },

  // 11 — معنى OUGHT TO
  {
    id: "ought-meaning",
    station: "OUGHT TO",
    kind: "lesson",
    title: "ما معنى OUGHT TO؟ وكيف نركّبها؟",
    emoji: "⭐",
    tone: "orange",
    lead: "تعبير رديف وقريب جدًا من SHOULD في المعنى والوظيفة.",
    term: {
      en: "OUGHT TO + V1",
      ar: "ينبغي / من الواجب الأخلاقي أو الصواب",
      desc: "يُستخدم للنصيحة، والتصرف السليم، والواجب الأخلاقي أو ما نراه صوابًا، وكذلك للتوقع المعقول.",
      tone: "orange",
      icon: "⭐",
    },
    formula: {
      parts: [
        { en: "Subject", ar: "الفاعل", tone: "sky" },
        { en: "ought to", ar: "ينبغي أن", tone: "orange" },
        { en: "V1", ar: "الفعل المجرد", tone: "emerald" },
      ],
    },
    examples: [
      { en: "You ought to respect your parents.", ar: "ينبغي أن تحترم والديك.", tone: "orange" },
      { en: "She ought to apologise.", ar: "ينبغي أن تعتذر.", tone: "violet" },
      { en: "We ought to help people in need.", ar: "ينبغي علينا مساعدة المحتاجين.", tone: "emerald" },
    ],
    tip: "انتبه للفرق الشكلي الأهم: نقول SHOULD + V1 بدون to، لكن نقول OUGHT TO + V1 بوجود to دائمًا!",
  },

  // 12 — مقارنة تركيب SHOULD و OUGHT TO
  {
    id: "compare-ought",
    station: "OUGHT TO",
    kind: "lesson",
    title: "مقارنة التركيبين: أين نضع TO وأين نحذفها؟",
    emoji: "⚙️",
    tone: "sky",
    lead: "قارن بين الجمل المتقابلة التالية ولاحظ ثبات المعنى واختلاف وجود TO:",
    table: {
      headers: ["باستخدام SHOULD (بدون to)", "باستخدام OUGHT TO (مع to)", "المعنى العربي"],
      rows: [
        ["You should study.", "You ought to study.", "ينبغي أن تدرس."],
        ["She should apologise.", "She ought to apologise.", "ينبغي أن تعتذر."],
        ["We should help others.", "We ought to help others.", "ينبغي أن نساعد الآخرين."],
        ["He should be careful.", "He ought to be careful.", "ينبغي أن يكون حذرًا."],
      ],
    },
    verdicts: [
      { ok: false, en: "You ought study.", why: "خطأ: حُذفت to بعد ought" },
      { ok: true, en: "You ought to study.", why: "صحيح: ought to + V1" },
      { ok: false, en: "You should to study.", why: "خطأ: أُضيفت to بعد should" },
      { ok: true, en: "You should study.", why: "صحيح: should + V1 مباشرة" },
    ],
  },

  // 13 — هل توجد فروق في المعنى؟
  {
    id: "ought-meaning-difference",
    station: "OUGHT TO",
    kind: "lesson",
    title: "هل توجد فروق دقيقة بين SHOULD و OUGHT TO؟",
    emoji: "🧠",
    tone: "violet",
    lead: "في أغلب المواقف اليومية يمكن استخدام SHOULD و OUGHT TO بالتبادل دون تغير جوهري:",
    examples: [
      {
        en: "You should tell the truth. = You ought to tell the truth.",
        ar: "ينبغي أن تقول الحقيقة.",
        tag: "معنى متقارب جدًا",
        tone: "violet",
      },
    ],
    table: {
      headers: ["وجه المقارنة", "SHOULD", "OUGHT TO"],
      rows: [
        ["الشيوع اليومي", "الأكثر شيوعًا في الحديث والكتابة", "صحيحة وطبيعية لكنها أقل تكرارًا"],
        ["النبرة الدلالية", "نصيحة عامة أو رأي أو توقع", "تميل أحيانًا لإبراز الواجب الأخلاقي أو الصواب"],
        ["الأسئلة والنفي", "مرنة وسلسة جدًا (Should I? / shouldn't)", "أقل استخدامًا في الأسئلة والنفي اليومي"],
      ],
    },
    tip: "استعمل OUGHT TO بثقة في الجمل المثبتة، واجعل SHOULD أداتك اليومية الأكثر مرونة.",
  },

  // 14 — نفي OUGHT TO
  {
    id: "ought-negative",
    station: "OUGHT TO",
    kind: "lesson",
    title: "النفي باستخدام OUGHT NOT TO",
    emoji: "🚫",
    tone: "rose",
    lead: "عند نفي OUGHT TO نضع كلمة not بين ought و to:",
    formula: {
      parts: [
        { en: "Subject", ar: "الفاعل", tone: "sky" },
        { en: "ought not to", ar: "لا ينبغي أن", tone: "rose" },
        { en: "V1", ar: "الفعل المجرد", tone: "emerald" },
      ],
    },
    examples: [
      { en: "You ought not to waste your time.", ar: "لا ينبغي أن تهدر وقتك.", tone: "rose" },
      { en: "She ought not to speak rudely.", ar: "لا ينبغي أن تتحدث بوقاحة.", tone: "orange" },
      { en: "We ought not to ignore this problem.", ar: "لا ينبغي علينا تجاهل هذه المشكلة.", tone: "violet" },
    ],
    note: {
      emoji: "📌",
      title: "ملاحظة أسلوبية مفيدة",
      body: "قد تصادف الصيغة المختصرة oughtn't to، لكنها قليلة الشيوع وتبدو رسمية أو مرتبطة بلهجات معينة؛ لذلك يفضّل المتحدثون غالبًا صيغة shouldn't الأبسط والأخف.",
    },
  },

  // 15 — السؤال باستخدام OUGHT TO
  {
    id: "ought-question",
    station: "OUGHT TO",
    kind: "lesson",
    title: "السؤال باستخدام OUGHT TO",
    emoji: "❓",
    tone: "sky",
    lead: "تكوين السؤال بـ Ought ممكن نحويًا، لكنه قليل الشيوع في المحادثات اليومية:",
    examples: [
      {
        en: "Ought I to call him? → (الأشيع يوميًا: Should I call him?)",
        ar: "هل ينبغي أن أتصل به؟",
        tone: "sky",
      },
      {
        en: "Ought we to leave now? → (الأشيع يوميًا: Should we leave now?)",
        ar: "هل ينبغي أن نغادر الآن؟",
        tone: "violet",
      },
    ],
    tip: "القاعدة العملية: استخدم SHOULD في أسئلتك اليومية، وافهم تركيب Ought + Subject + to + V1 حين تقرؤه أو تسمعه.",
  },

  // 16 — مقارنة SHOULD vs MUST vs HAVE TO
  {
    id: "modal-contrast",
    station: "النصيحة أم الإلزام؟",
    kind: "lesson",
    title: "مقارنة محورية: SHOULD مقابل MUST مقابل HAVE TO",
    emoji: "⚔️",
    tone: "orange",
    lead: "ربط متكامل بين النصيحة الهادئة والإلزام القوي والضرورة النظامية:",
    examples: [
      { en: "You should wear a helmet.", ar: "ينبغي أن ترتدي خوذة.", tag: "نصيحة", tone: "sky" },
      {
        en: "You must wear a helmet.",
        ar: "يجب أن ترتدي خوذة.",
        tag: "إلزام قوي / تعليمات مؤكدة",
        tone: "orange",
      },
      {
        en: "You have to wear a helmet.",
        ar: "يجب عليك ارتداء خوذة.",
        tag: "ضرورة أو متطلب خارجي",
        tone: "violet",
      },
      {
        en: "You should revise before the exam.",
        ar: "ينبغي أن تراجع قبل الامتحان (توصية لمصلحتك).",
        tone: "emerald",
      },
      {
        en: "You must not cheat during the exam.",
        ar: "يُمنع عليك الغش أثناء الامتحان (قانون صارم).",
        tone: "rose",
      },
      {
        en: "You have to bring your identification card.",
        ar: "يجب عليك إحضار بطاقة التعريف (شرط تنظيمي).",
        tone: "amber",
      },
    ],
    lab: "meaning",
  },

  // 17 — ثلاث جمل متشابهة ظاهريًا
  {
    id: "three-meanings",
    station: "النصيحة أم الإلزام؟",
    kind: "lesson",
    title: "ثلاث جمل متشابهة ظاهريًا... ومختلفة تمامًا في المعنى!",
    emoji: "🔬",
    tone: "violet",
    lead: "تغيير الفعل المساعد وحده يقلب رسالة الجملة بالكامل:",
    examples: [
      {
        en: "You shouldn't enter this room.",
        ar: "من الأفضل ألا تدخل هذه الغرفة.",
        tag: "نصيحة بعدم الفعل",
        tone: "amber",
      },
      {
        en: "You mustn't enter this room.",
        ar: "يُمنع عليك دخول هذه الغرفة.",
        tag: "منع وحظر",
        tone: "rose",
      },
      {
        en: "You don't have to enter this room.",
        ar: "لست مضطرًا إلى دخول هذه الغرفة.",
        tag: "عدم ضرورة (اختياري)",
        tone: "emerald",
      },
    ],
    table: {
      headers: ["التعبير", "الوظيفة الدلالية الدقيقة"],
      rows: [
        ["SHOULD", "نصيحة أو توصية هادئة"],
        ["OUGHT TO", "توصية أو تصرف نراه صحيحًا وأخلاقيًا"],
        ["MUST", "ضرورة قوية أو إلزام مباشر"],
        ["HAVE TO", "ضرورة خارجية أو متطلب نظامي"],
        ["SHOULDN'T", "نصيحة بعدم الفعل"],
        ["MUSTN'T", "منع باتّ وحظر"],
        ["DON'T HAVE TO", "عدم ضرورة (الأمر اختياري)"],
      ],
    },
  },

  // 18 — التوقع المعقول
  {
    id: "expectation",
    station: "التوقع المعقول",
    kind: "lesson",
    title: "مفاجأة مهمة: SHOULD لا تعني النصيحة دائمًا!",
    emoji: "🔮",
    tone: "sky",
    lead: "تُستخدم SHOULD كذلك للتعبير عن توقع منطقي معقول (Reasonable Expectation) مبني على مؤشرات:",
    examples: [
      {
        en: "The bus should arrive in ten minutes.",
        ar: "من المتوقع أن تصل الحافلة خلال عشر دقائق.",
        tag: "توقع معقول",
        tone: "sky",
      },
      {
        en: "The package should arrive tomorrow.",
        ar: "من المتوقع أن يصل الطرد غدًا.",
        tag: "توقع معقول",
        tone: "violet",
      },
      {
        en: "She should be home by now.",
        ar: "من المفترض أنها وصلت إلى المنزل الآن.",
        tag: "توقع حالي",
        tone: "emerald",
      },
      {
        en: "The exam shouldn't be too difficult.",
        ar: "من المتوقع ألا يكون الامتحان صعبًا جدًا.",
        tag: "توقع منفي",
        tone: "orange",
      },
      {
        en: "Everything should be ready by Friday.",
        ar: "من المتوقع أن يكون كل شيء جاهزًا بحلول الجمعة.",
        tag: "توقع معقول",
        tone: "sky",
      },
    ],
    note: {
      emoji: "🧭",
      title: "كيف أميّز بين النصيحة والتوقع؟ السياق هو الحكم!",
      body: "في جملة You should study harder نخاطب شخصًا بنصيحة، أما في جملة The results should be ready tomorrow فالحديث عن النتائج المتوقعة غدًا.",
    },
  },

  // 19 — SHOULD vs MAY vs MIGHT
  {
    id: "may-might",
    station: "التوقع المعقول",
    kind: "lesson",
    title: "الفرق بين التوقع والاحتمال: SHOULD مقابل MAY و MIGHT",
    emoji: "🌦️",
    tone: "emerald",
    lead: "الاحتمال المجرّد والتوقع المبني على مؤشرات ليسا شيئًا واحدًا:",
    examples: [
      {
        en: "It may rain tomorrow.",
        ar: "قد تمطر غدًا (احتمال وارد دون ترجيح قوي).",
        tag: "MAY · احتمال",
        tone: "sky",
      },
      {
        en: "It might rain tomorrow.",
        ar: "ربما تمطر غدًا (احتمال ممكن بتحفظ أكبر).",
        tag: "MIGHT · احتمال متحفظ",
        tone: "violet",
      },
      {
        en: "The weather should improve tomorrow.",
        ar: "من المتوقع أن يتحسن الطقس غدًا (توقع معقول بناءً على معطيات الأرصاد).",
        tag: "SHOULD · توقع معقول",
        tone: "emerald",
      },
    ],
    tip: "لا نربط هذه الأفعال بنسب مئوية جامدة؛ MAY و MIGHT تطرحان إمكانية الحدوث، بينما SHOULD ترجّح ما نتوقعه منطقيًا.",
  },

  // 20 — SHOULD HAVE + V3
  {
    id: "should-have",
    station: "النظر إلى الماضي",
    kind: "lesson",
    title: "النظر إلى الماضي: SHOULD HAVE + V3",
    emoji: "⏳",
    tone: "orange",
    lead: "كيف نعبّر عن نصيحة فات أوانها أو ندم على أمر لم نفعله في الماضي؟",
    formula: {
      parts: [
        { en: "Subject", ar: "الفاعل", tone: "sky" },
        { en: "should have", ar: "كان ينبغي أن", tone: "orange" },
        { en: "V3 (Past Participle)", ar: "التصريف الثالث", tone: "emerald" },
      ],
    },
    paragraphs: [
      "عندما لم يدرس عمر جيدًا قبل الامتحان وقال: I didn't study enough، علّقنا قائلين: You should have studied harder (كان ينبغي أن تدرس بجد أكبر).",
      "في الاستخدام الشائع للندم أو النقد اللطيف، تعني هذه الصيغة أن الفعل كان القرار الأفضل في الماضي، لكنه لم يحدث.",
    ],
    examples: [
      { en: "I should have listened to my teacher.", ar: "كان ينبغي أن أستمع إلى معلمي (ندم شخصي).", tone: "orange" },
      { en: "She should have left earlier.", ar: "كان ينبغي أن تغادر في وقت أبكر.", tone: "sky" },
      { en: "We should have checked the answers.", ar: "كان ينبغي أن نتحقق من الإجابات.", tone: "violet" },
      { en: "They should have prepared better.", ar: "كان ينبغي أن يستعدوا بصورة أفضل.", tone: "emerald" },
    ],
    verdicts: [
      { ok: true, en: "I should've studied harder.", why: "الاختصار الصحيح لـ should have هو should've" },
      { ok: false, en: "I should of studied harder.", why: "خطأ إملائي شائع جدًا بسبب تشابه النطق؛ لا نكتب should of أبدًا!" },
    ],
    lab: "past",
  },

  // 21 — المعنى الدقيق لـ SHOULD HAVE
  {
    id: "should-have-context",
    station: "النظر إلى الماضي",
    kind: "lesson",
    title: "المعنى الدقيق لـ SHOULD HAVE بحسب السياق",
    emoji: "🔬",
    tone: "violet",
    lead: "لا نربط SHOULD HAVE بمعنى واحد بصورة آلية؛ تأمل الوظيفتين التاليتين:",
    examples: [
      {
        en: "I should have studied.",
        ar: "كان ينبغي أن أدرس (المعنى الواقعي غالبًا: لم أدرس كما ينبغي، وأشعر بالندم).",
        tag: "ندم أو مراجعة للماضي",
        tone: "orange",
      },
      {
        en: "The train should have arrived by now.",
        ar: "من المفترض أن القطار قد وصل بحلول الآن (توقع بشأن حدث يُفترض اكتماله، وليس ندمًا أو لومًا).",
        tag: "توقع متعلق بالماضي",
        tone: "sky",
      },
    ],
    tip: "افهم قصد المتحدث من السياق دائمًا: هل يلوم نفسه على تقصير ماضٍ، أم يقدّر اكتمال حدث وفق الجدول؟",
  },

  // 22 — SHOULDN'T HAVE + V3
  {
    id: "shouldnt-have",
    station: "النظر إلى الماضي",
    kind: "lesson",
    title: "نفي الماضي: SHOULDN'T HAVE + V3",
    emoji: "🚫",
    tone: "rose",
    lead: "تُستخدم للحديث عن فعل وقع في الماضي فعلًا، ونرى الآن أنه كان من الأفضل ألا يحدث!",
    formula: {
      parts: [
        { en: "Subject", ar: "الفاعل", tone: "sky" },
        { en: "shouldn't have", ar: "لم يكن ينبغي أن", tone: "rose" },
        { en: "V3", ar: "التصريف الثالث", tone: "emerald" },
      ],
    },
    examples: [
      { en: "I shouldn't have eaten so much.", ar: "لم يكن ينبغي أن آكل كل هذه الكمية (أكلتُ فعلًا).", tone: "rose" },
      { en: "She shouldn't have spoken rudely.", ar: "لم يكن ينبغي أن تتحدث بوقاحة (تحدثت فعلًا).", tone: "orange" },
      { en: "We shouldn't have wasted so much time.", ar: "لم يكن ينبغي أن نهدر كل هذا الوقت.", tone: "violet" },
      { en: "He shouldn't have ignored the warning.", ar: "لم يكن ينبغي أن يتجاهل التحذير.", tone: "amber" },
    ],
    note: {
      emoji: "⚖️",
      title: "موازنة سريعة للواقع",
      body: "جملة I should have called her تعني غالبًا: لم أتصل بها. أما جملة I shouldn't have called her فتعني غالبًا: اتصلتُ بها وأرى الآن أن ذلك لم يكن مناسبًا.",
    },
  },

  // 23 — مقارنة الماضي المثبت والمنفي
  {
    id: "past-contrast",
    station: "النظر إلى الماضي",
    kind: "lesson",
    title: "موازنة الماضي: SHOULD HAVE مقابل SHOULDN'T HAVE",
    emoji: "⚔️",
    tone: "sky",
    lead: "كلتاهما تنظران إلى حدث انتهى في الماضي من زاوية التقييم الحاضر:",
    table: {
      headers: ["الصيغة", "ماذا حدث في الواقع غالبًا؟", "مثال واضح"],
      rows: [
        ["should have + V3", "الفعل لم يحدث، وكان الأفضل القيام به", "I should have studied."],
        ["shouldn't have + V3", "الفعل حدث فعلًا، وكان الأفضل تجنبه", "I shouldn't have wasted time."],
        ["should have + V3", "تأخرنا في المغادرة والآن نراجع القرار", "We should have left earlier."],
        ["shouldn't have + V3", "انتظرنا طويلًا وكان ذلك خطأً", "We shouldn't have waited so long."],
      ],
    },
    examples: [
      {
        en: "She should have apologised. / She shouldn't have shouted.",
        ar: "كان ينبغي أن تعتذر (لم تعتذر) / لم يكن ينبغي أن تصرخ (صرخت فعلًا).",
        tone: "violet",
      },
    ],
  },

  // 24 — حوار The Missed Competition
  {
    id: "competition-dialogue",
    station: "النظر إلى الماضي",
    kind: "dialogue",
    title: "The Missed Competition",
    emoji: "🎭",
    tone: "orange",
    lead: "حوار واقعي يربط مراجعة أخطاء الماضي بالتعلم الإيجابي للمستقبل:",
    dialogueTurns: [
      {
        speaker: "Maya",
        en: "I missed the science competition yesterday.",
        ar: "مايا: فاتتني مسابقة العلوم يوم أمس.",
        tone: "violet",
      },
      {
        speaker: "Omar",
        en: "What happened?",
        ar: "عمر: ماذا حدث؟",
        tone: "sky",
      },
      {
        speaker: "Maya",
        en: "I woke up late. I should have set an alarm.",
        ar: "مايا: استيقظت متأخرة. كان ينبغي أن أضبط منبّهًا.",
        tone: "violet",
      },
      {
        speaker: "Omar",
        en: "That's unfortunate. You should have prepared everything the night before.",
        ar: "عمر: هذا مؤسف. كان ينبغي أن تجهّزي كل شيء في الليلة السابقة.",
        tone: "sky",
      },
      {
        speaker: "Maya",
        en: "You're right. I shouldn't have stayed up so late.",
        ar: "مايا: معك حق. لم يكن ينبغي أن أسهر إلى ذلك الوقت المتأخر.",
        tone: "violet",
      },
      {
        speaker: "Omar",
        en: "Don't worry. You can learn from this experience.",
        ar: "عمر: لا تقلقي، يمكنكِ التعلم من هذه التجربة.",
        tone: "sky",
      },
      {
        speaker: "Maya",
        en: "I will. Next time, I'll be more organised.",
        ar: "مايا: سأفعل ذلك. في المرة القادمة سأكون أكثر تنظيمًا.",
        tone: "violet",
      },
    ],
    dialogueNotes: [
      { expr: "should have set", meaning: "فعل لم تقم به وكان الأفضل فعله" },
      { expr: "should have prepared", meaning: "توجيه وتقييم لقرار ماضٍ" },
      { expr: "shouldn't have stayed up", meaning: "فعل وقع (السهر) وتندم عليه الآن" },
    ],
  },

  // 25 — OUGHT TO HAVE + V3
  {
    id: "ought-have",
    station: "OUGHT TO HAVE",
    kind: "lesson",
    title: "OUGHT TO HAVE + V3 في الماضي",
    emoji: "🕰️",
    tone: "violet",
    lead: "يمكن استخدام OUGHT TO أيضًا لتقييم الماضي بالمعنى نفسه تقريبًا:",
    formula: {
      parts: [
        { en: "Subject", ar: "الفاعل", tone: "sky" },
        { en: "ought to have", ar: "كان ينبغي أن", tone: "violet" },
        { en: "V3", ar: "التصريف الثالث", tone: "emerald" },
      ],
    },
    examples: [
      { en: "You ought to have told me earlier.", ar: "كان ينبغي أن تخبرني في وقت أبكر.", tone: "violet" },
      { en: "She ought to have apologised.", ar: "كان ينبغي أن تعتذر.", tone: "sky" },
      { en: "We ought to have checked the information.", ar: "كان ينبغي أن نتحقق من المعلومات.", tone: "emerald" },
      {
        en: "You ought not to have ignored the warning.",
        ar: "لم يكن ينبغي أن تتجاهل التحذير (والأشيع يوميًا: You shouldn't have ignored the warning).",
        tag: "النفي في الماضي",
        tone: "rose",
      },
    ],
    tip: "المعنى متقارب جدًا مع SHOULD HAVE + V3، غير أن SHOULD HAVE أكثر شيوعًا وخفة في المحادثة اليومية.",
  },

  // 26 — HAD BETTER
  {
    id: "had-better",
    station: "HAD BETTER",
    kind: "lesson",
    title: "HAD BETTER — نصيحة قوية تحمل تحذيرًا",
    emoji: "🚨",
    tone: "rose",
    lead: "نلجأ إلى HAD BETTER لتقديم نصيحة عاجلة لموقف محدد يترتب على إهماله عاقبة غير مرغوبة:",
    formula: {
      parts: [
        { en: "Subject", ar: "الفاعل", tone: "sky" },
        { en: "had better / 'd better", ar: "من الأفضل جدًا", tone: "orange" },
        { en: "V1", ar: "الفعل المجرد", tone: "emerald" },
      ],
    },
    verdicts: [
      { ok: true, en: "You'd better leave now.", why: "صحيح: had better ('d better) + V1 مباشرة" },
      { ok: true, en: "You'd better not touch that wire.", why: "صحيح في النفي: had better not + V1" },
      { ok: false, en: "You'd better to leave.", why: "خطأ شائع: لا نضع to بعد had better أبدًا" },
    ],
    examples: [
      {
        en: "You had better leave now, or you'll miss the bus.",
        ar: "من الأفضل أن تغادر الآن وإلا ستفوتك الحافلة.",
        tag: "عاقبة محددة",
        tone: "orange",
      },
      { en: "You'd better take an umbrella. It looks like rain.", ar: "من الأفضل أن تأخذ مظلة؛ يبدو أنها ستمطر.", tone: "sky" },
      { en: "We'd better hurry.", ar: "من الأفضل أن نسرع.", tone: "emerald" },
      { en: "He'd better apologise before the situation gets worse.", ar: "من الأفضل أن يعتذر قبل أن يسوء الموقف.", tone: "rose" },
    ],
    note: {
      emoji: "⚡",
      title: "انتبه جيدًا لكلمة HAD هنا!",
      body: "رغم وجود كلمة had في التركيب، فإن HAD BETTER لا يتحدث عن الماضي أبدًا، بل يوجّه نصيحة للحاضر أو المستقبل القريب!",
    },
  },

  // 27 — SHOULD vs HAD BETTER
  {
    id: "should-vs-better",
    station: "HAD BETTER",
    kind: "lesson",
    title: "الفرق الدقيق: SHOULD مقابل HAD BETTER",
    emoji: "⚖️",
    tone: "amber",
    lead: "قارن بين درجة القوة والاستعجال في الجملتين التاليتين:",
    examples: [
      {
        en: "You should study tonight.",
        ar: "ينبغي أن تدرس الليلة — نصيحة عامة هادئة لأن الدراسة مفيدة لك.",
        tag: "SHOULD · نصيحة عامة",
        tone: "sky",
      },
      {
        en: "You'd better study tonight, or you may fail tomorrow's test.",
        ar: "من الأفضل أن تدرس الليلة وإلا فقد ترسب في اختبار الغد — نصيحة أقوى مرتبطة بنتيجة سلبية محتملة.",
        tag: "HAD BETTER · تحذير وعاقبة",
        tone: "rose",
      },
    ],
    table: {
      headers: ["العنصر", "SHOULD", "HAD BETTER"],
      rows: [
        ["درجة القوة", "نصيحة معتدلة وتوصية عامة", "نصيحة أقوى وأكثر إلحاحًا"],
        ["الموقف", "تصلح للعادات والمواقف العامة والخاصة", "مرتبطة بموقف محدد في الحاضر أو المستقبل القريب"],
        ["الأثر عند الإهمال", "لا تشترط وقوع مشكلة فورية", "تحمل غالبًا تحذيرًا من نتيجة سلبية إن لم تُتّبع"],
      ],
    },
  },

  // 28 — النصيحة اللبقة
  {
    id: "polite-advice",
    station: "النصيحة اللبقة",
    kind: "lesson",
    title: "كيف نقدّم النصيحة بلباقة ولطف؟",
    emoji: "🤝",
    tone: "emerald",
    lead: "طريقة صياغة النصيحة لا تقل أهمية عن صحة القاعدة النحوية:",
    examples: [
      {
        en: "I think you should study a little more.",
        ar: "أعتقد أنه ينبغي أن تدرس أكثر قليلًا (ألطف وأقل مباشرة من You should study more).",
        tag: "I think you should...",
        tone: "emerald",
      },
      {
        en: "Maybe you should take a short break.",
        ar: "ربما ينبغي أن تأخذ استراحة قصيرة.",
        tag: "Maybe you should...",
        tone: "sky",
      },
      {
        en: "You could also ask a friend for help.",
        ar: "يمكنك أيضًا أن تطلب المساعدة من صديق.",
        tag: "You could also...",
        tone: "violet",
      },
      {
        en: "If I were you, I'd talk to the teacher.",
        ar: "لو كنت مكانك، لتحدثت مع المعلم (تعبير شائع للنصيحة ستدرسه بتوسع مع الجمل الشرطية).",
        tag: "If I were you, I'd...",
        tone: "orange",
      },
    ],
    lab: "politeness",
  },

  // 29 — محقق القواعد
  {
    id: "detective",
    station: "المحقق والتطبيق",
    kind: "textPractice",
    title: "محقق القواعد · Grammar Detective",
    emoji: "🕵️",
    tone: "rose",
    lead: "كل جملة من الجمل العشر التالية تحتوي على خطأ نحوي واحد — اكتشفه واكتب الجملة الصحيحة ثم اضغط «تحقق ✓»:",
    textItems: DETECTIVE_ITEMS_45,
    tip: "تذكّر القواعد الأربع: بعد SHOULD يأتي V1 · بعد OUGHT TO يأتي V1 · بعد SHOULD HAVE يأتي V3 · بعد HAD BETTER يأتي V1.",
  },

  // 30 — التدريب الأول
  {
    id: "practice-should",
    station: "المحقق والتطبيق",
    kind: "choicePractice",
    title: "التدريب الأول: SHOULD أم SHOULDN'T؟",
    emoji: "✍️",
    tone: "sky",
    lead: "اختر الفعل الأنسب لمعنى كل جملة ثم تحقق من إجاباتك:",
    choiceGroupId: "practice-should-45",
    choiceItems: PRACTICE_SHOULD_ITEMS_45,
  },

  // 31 — التدريب الثاني
  {
    id: "practice-ought",
    station: "المحقق والتطبيق",
    kind: "textPractice",
    title: "التدريب الثاني: التحويل إلى OUGHT TO",
    emoji: "🧩",
    tone: "orange",
    lead: "أعد كتابة كل جملة مستخدمًا OUGHT TO بدل SHOULD مع الحفاظ على الفعل المجرد:",
    textItems: PRACTICE_OUGHT_ITEMS_45,
  },

  // 32 — التدريب الثالث
  {
    id: "practice-questions",
    station: "المحقق والتطبيق",
    kind: "textPractice",
    title: "التدريب الثالث: حوّل الجملة إلى سؤال",
    emoji: "❓",
    tone: "violet",
    lead: "كوّن سؤالًا صحيحًا بتقديم SHOULD قبل الفاعل:",
    textItems: PRACTICE_QUESTION_ITEMS_45,
  },

  // 33 — التدريب الرابع
  {
    id: "practice-past",
    station: "المحقق والتطبيق",
    kind: "textPractice",
    title: "التدريب الرابع: SHOULD HAVE أم SHOULDN'T HAVE؟",
    emoji: "⏳",
    tone: "orange",
    lead: "اقرأ السياق جيدًا واكتب صيغة الماضي المناسبة متبوعةً بالتصريف الثالث V3:",
    textItems: PRACTICE_PAST_ITEMS_45,
  },

  // 34 — التدريب الخامس
  {
    id: "practice-expectation",
    station: "المحقق والتطبيق",
    kind: "choicePractice",
    title: "التدريب الخامس: حدّد وظيفة SHOULD في السياق",
    emoji: "🔮",
    tone: "emerald",
    lead: "هل تفيد الجملة نصيحة، أم نصيحة بعدم الفعل، أم توقعًا معقولًا؟",
    choiceGroupId: "practice-expectation-45",
    choiceItems: PRACTICE_EXPECTATION_ITEMS_45,
  },

  // 35 — نص القراءة
  {
    id: "reading",
    station: "القراءة والإنجاز",
    kind: "reading",
    title: "تحدي القراءة: Learning from Mistakes",
    emoji: "📖",
    tone: "sky",
    lead: "اقرأ قصة عمر واستعداده لمسابقة العلوم، ولاحظ كيف تتكامل تراكيب النصيحة والندم والتوقع في سياق واحد:",
    readingParagraphs: [
      {
        en: "Omar is preparing for an important science competition. He has many ideas, but he sometimes struggles to organise his time.",
        ar: "يستعد عمر لمسابقة علمية مهمة. لديه أفكار كثيرة، لكنه يواجه أحيانًا صعوبة في تنظيم وقته.",
      },
      {
        en: "One afternoon, his teacher says: “You should make a clear plan before you begin. You ought to divide your work into smaller tasks.”",
        ar: "في ظهيرة أحد الأيام قال له معلمه: «ينبغي أن تضع خطة واضحة قبل أن تبدأ، وينبغي أن تقسّم عملك إلى مهام أصغر».",
      },
      {
        en: "Omar agrees, but he decides to start without a plan. A week later, he realises that he has forgotten several important details.",
        ar: "وافق عمر، لكنه قرر البدء دون خطة. وبعد أسبوع أدرك أنه نسي عدة تفاصيل مهمة.",
      },
      {
        en: "“I should have listened to my teacher,” he says. “I shouldn't have wasted so much time.”",
        ar: "فقال لنفسه: «كان ينبغي أن أستمع إلى معلمي، ولم يكن ينبغي أن أهدر كل هذا الوقت».",
      },
      {
        en: "His friend Maya tries to help: “Don't worry. You should focus on what you can do now. You could make a checklist and finish one task at a time.”",
        ar: "حاولت صديقته مايا مساعدته قائلة: «لا تقلق. ينبغي أن تركز على ما تستطيع فعله الآن. يمكنك إعداد قائمة مهام وإنجاز مهمة واحدة في كل مرة».",
      },
      {
        en: "Omar follows her advice. By the end of the week, his project is almost complete. His teacher smiles: “The final version should be ready by Monday.”",
        ar: "أخذ عمر بنصيحتها، وبنهاية الأسبوع أوشك مشروعه على الاكتمال. ابتسم معلمه قائلًا: «من المتوقع أن تكون النسخة النهائية جاهزة بحلول يوم الإثنين».",
      },
      {
        en: "Omar feels more confident. He has learned that good advice can save time and prevent mistakes.",
        ar: "شعر عمر بثقة أكبر، وتعلّم أن النصيحة الجيدة توفّر الوقت وتمنع الوقوع في الأخطاء.",
      },
    ],
  },

  // 36 — أسئلة فهم القراءة
  {
    id: "reading-questions",
    station: "القراءة والإنجاز",
    kind: "readingQuestions",
    title: "أسئلة فهم القراءة والتحليل",
    emoji: "🔎",
    tone: "violet",
    lead: "أجب عن الأسئلة العشرة التالية بناءً على القصة، ثم قارن إجابتك بالإجابة النموذجية:",
    readingQuestions: READING_QUESTIONS_45,
  },

  // 37 — مهمة الكتابة
  {
    id: "writing",
    station: "القراءة والإنجاز",
    kind: "writing",
    title: "مهمة الكتابة: Advice That Changed My Life",
    emoji: "✍️",
    tone: "emerald",
    lead: "اكتب فقرة إنجليزية مترابطة من 12 إلى 15 جملة حول نصيحة مفيدة تلقيتها أو خطأ تعلّمت منه أو قرار مهم اتخذته:",
  },

  // 38 — الملخص الذهبي
  {
    id: "summary",
    station: "القراءة والإنجاز",
    kind: "summary",
    title: "الملخص الذهبي للدرس 45",
    emoji: "🧠",
    tone: "amber",
    lead: "راجع الخريطة الكاملة للصيغ الثماني ووظائفها قبل خوض الاختبار النهائي:",
    examples: [
      { en: "SHOULD + V1 → You should study harder.", ar: "نصيحة أو توصية هادئة للحاضر أو المستقبل.", tag: "نصيحة", tone: "sky" },
      { en: "SHOULDN'T + V1 → You shouldn't waste time.", ar: "نصيحة بعدم القيام بتصرف غير مناسب.", tag: "نفي النصيحة", tone: "rose" },
      { en: "Should + Subject + V1? → What should I do?", ar: "طلب النصيحة أو الرأي دون استخدام Do.", tag: "سؤال", tone: "violet" },
      { en: "SHOULD (Expectation) → The train should arrive soon.", ar: "توقع منطقي معقول مبني على معطيات.", tag: "توقع", tone: "emerald" },
      { en: "OUGHT TO + V1 → You ought to respect others.", ar: "نصيحة أو ما نراه صوابًا وواجبًا أخلاقيًا.", tag: "مع to", tone: "orange" },
      { en: "SHOULD HAVE + V3 → I should have studied earlier.", ar: "كان ينبغي أن يحدث الفعل في الماضي لكنه لم يحدث.", tag: "ندم / مراجعة", tone: "amber" },
      { en: "SHOULDN'T HAVE + V3 → I shouldn't have stayed up so late.", ar: "فعل وقع في الماضي وكان الأفضل تجنبه.", tag: "نفي الماضي", tone: "rose" },
      { en: "HAD BETTER + V1 → You'd better leave now.", ar: "نصيحة أقوى لموقف محدد تحمل تحذيرًا من عاقبة.", tag: "تحذير عاجل", tone: "orange" },
    ],
    tip: "القاعدة الكبرى: SHOULD ليست MUST، و SHOULDN'T ليست MUSTN'T، و SHOULD HAVE ليست نصيحة للحاضر؛ فكل تركيب يمنح كلامك دقة مختلفة.",
  },

  // 39 — الاختبار النهائي الشامل (25 سؤالًا / 5 مستويات)
  {
    id: "test-intro",
    station: "القراءة والإنجاز",
    kind: "test",
    title: "الاختبار النهائي الشامل — الدرس 45",
    emoji: "🏆",
    tone: "violet",
    lead: "اختبر إتقانك الكامل لـ SHOULD و OUGHT TO و HAD BETTER وتراكيب الماضي والتوقع عبر 25 سؤالًا متدرجًا:",
  },

  // 40 — فضاء المعلم
  {
    id: "teacher",
    station: "القراءة والإنجاز",
    kind: "teacher",
    title: "فضاء المعلم — مفتاح التصحيح المعتمد",
    emoji: "🧑‍🏫",
    tone: "slate",
    lead: "بوابة مخصصة للمعلم والمراجعة الصفية تتضمن مفتاح الأسئلة الـ 25 مع القاعدة والتعليل لكل سؤال:",
  },

  // 41 — خريطة التقدم والدرس القادم
  {
    id: "roadmap",
    station: "القراءة والإنجاز",
    kind: "roadmap",
    title: "خريطة التقدم والمحطة القادمة",
    emoji: "🗺️",
    tone: "emerald",
    lead: "أحسنت! أتممت الدرس الخامس والأربعين من منهج إتقان اللغة الإنجليزية (45 / 120).",
    paragraphs: [
      "تعلّمنا في الدرس 44 لغة الضرورة والإلزام (MUST & HAVE TO)، وأتقنّا اليوم في الدرس 45 فن النصيحة الذكية والتوقعات ومراجعة قرارات الماضي (SHOULD & OUGHT TO).",
      "في الدرس القادم (Lesson 46 — MUSTN'T vs DON'T HAVE TO vs NEEDN'T) سنتعلّم التمييز الدقيق بين الممنوع وغير الضروري، واستخدام NEEDN'T، والفرق المتقدم بين DIDN'T NEED TO و NEEDN'T HAVE + V3 في مواقف الحياة والسفر والقوانين.",
    ],
  },
] as const;

export const LESSON_STEP_COUNT_45 = STEPS_45.length;
