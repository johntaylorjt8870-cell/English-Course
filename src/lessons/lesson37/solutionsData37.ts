import { normAr37, normEn37, type AnswerSpec37 } from "./grading37";

/**
 * مفتاح تصحيح الاختبار النهائي — 25 سؤالًا موزّعة على خمسة مستويات.
 *
 * المصدر المرفق يحمل عنوان مفتاح التصحيح وعبارة «عرض الحلول التفصيلية» فقط
 * دون مفتاح فعلي؛ لذلك كل إجابة وشرح أدناه من إعداد المنصة/المعلم، مكتوبة
 * على أساس أمثلة الدرس وقواعده. الأسئلة 16–20 نماذج تُقيَّم بالمعنى لا
 * بمطابقة حرفية، والبدائل المقبولة مذكورة صراحةً.
 *
 * عزل الإجابات: هذا الملف لا يُستورد استيرادًا ثابتًا في أي مكوّن طالب.
 * `TestArea37` يفتحه بـ dynamic import بعد التسليم فقط، و`SolutionsArea37`
 * و`TeacherGuide37` يُحمَّلان lazy بعد التسليم أو كلمة مرور المعلم.
 */

export type Judgment37 = "grammatical-only" | "grammatical-repair" | "contextual" | "open-model";

export type TestSolution37 = {
  n: number;
  level: 1 | 2 | 3 | 4 | 5;
  answer: string;
  acceptedSummary: string;
  explanation: string;
  example?: string;
  alternatives?: string[];
  judgment: Judgment37;
  sourceStatus: "platform-authored-teacher-addition";
  check: (raw: string) => boolean;
};

/**
 * ملاحظات المعلم (بدائل وطبيعة الحكم) — لا تكرّر الإجابة ولا الشرح،
 * فالمصدر الوحيد للإجابة هو ANSWER_SPECS_37 أدناه.
 */
const SOLUTION_NOTES_37: Record<number, { alternatives?: string[]; judgment: Judgment37 }> = {
  1: {
    alternatives: [
      "A. am وC. being مرفوضان بعد will في هذا التركيب؛ الصيغة الثابتة هي will be + V-ing.",
    ],
    judgment: "grammatical-only",
  },
  2: {
    alternatives: [
      "A. prepare لا يأتي بعد be، وB. prepared صيغة تصريف ثالث لا تُستخدم مع be هنا.",
    ],
    judgment: "grammatical-only",
  },
  3: {
    alternatives: [
      "Do لا تُستخدم مع will، وAre لا تسبق be waiting في هذا التركيب.",
    ],
    judgment: "grammatical-only",
  },
  4: {
    alternatives: [
      "A. work وC. worked لا تصلح بعد won't be؛ الشرط الأساسي هو الفعل مع -ing.",
    ],
    judgment: "grammatical-only",
  },
  5: {
    alternatives: [
      "B. are وC. have لا تصلح قبل be travelling في هذا السياق؛ وهو المثال نفسه الوارد في تدريب §28.",
    ],
    judgment: "grammatical-only",
  },
  6: {
    alternatives: [
      "تقبل «are sleeping» فقط إن تغيّر الإطار الزمني إلى الحاضر، وهو غير المطلوب هنا.",
    ],
    judgment: "grammatical-only",
  },
  7: {
    judgment: "grammatical-only",
  },
  8: {
    alternatives: [
      "«will prepare» صحيحة نحويًا كذلك، لكنها تقدّم الفعل كحدث لا كنشاط جارٍ عند الوصول؛ لذلك جواب المصدر هو الصيغة المستمرة.",
    ],
    judgment: "contextual",
  },
  9: {
    alternatives: [
      "لا تقبل «doesn't will» ولا «won't work» في هذا التركيب؛ الصيغة تبقى won't be + V-ing.",
    ],
    judgment: "grammatical-only",
  },
  10: {
    alternatives: [
      "إضافة «be waiting» هي المطلوبة؛ حذف be يجعل السؤال غير مكتمل.",
    ],
    judgment: "grammatical-only",
  },
  11: {
    alternatives: [
      "أي تصحيح يحفظ will be studying مقبول، مثل: I will be studying in the morning tomorrow.",
    ],
    judgment: "grammatical-repair",
  },
  12: {
    alternatives: [
      "«She will prepare lunch.» صحيحة نحويًا أيضًا وتُقبل كتصحيح، لأن الخطأ الأصلي هو «will is» لا اختيار الزمن.",
    ],
    judgment: "grammatical-repair",
  },
  13: {
    alternatives: [
      "«They will not be playing football.» مقبولة بالمقدار نفسه.",
    ],
    judgment: "grammatical-repair",
  },
  14: {
    alternatives: [
      "يمكن أن يكون الفعل في الجملة الرئيسية «will be sleeping» أو صيغة أخرى صحيحة، لكن موضع التصحيح المطلوب هو جملة when.",
    ],
    judgment: "grammatical-repair",
  },
  15: {
    judgment: "grammatical-repair",
  },
  16: {
    alternatives: [
      "نقطة دقيقة من المصدر: الجملة الأولى لا تعني بالضرورة أن الدراسة ستنتهي، والثانية لا تخبرنا بموعد البداية والنهاية.",
      "تقبل صياغات عربية مترادفة تشير إلى «حدث مستقبلي عام» مقابل «نشاط جارٍ عند لحظة محددة».",
    ],
    judgment: "open-model",
  },
  17: {
    alternatives: [
      "«we will fly to Paris» صحيحة نحويًا لكنها تقدّم الرحلة كحدث، لا كنشاط جارٍ في تلك اللحظة — وهذا اختلاف في التركيز لا خطأ.",
    ],
    judgment: "open-model",
  },
  18: {
    alternatives: [
      "تمييز المصدر: «When will you arrive?» سؤال مباشر وهنا will صحيحة.",
      "ملاحظة من المنصة: في السؤال غير المباشر يبقى will صحيحًا أيضًا، مثل: I don't know when you will arrive. — لأنه ليس جملة زمنية.",
    ],
    judgment: "open-model",
  },
  19: {
    alternatives: [
      "أمثلة مقبولة من المصدر: «This time next week, I'll be relaxing on the beach.» — «The workers will be repairing the road throughout the weekend.» — «Everyone will be having lunch.»",
      "تقبل أي إجابة تحتوي مثالًا صحيحًا الصيغة (will be + V-ing) مع سياق فترة أو برنامج.",
    ],
    judgment: "open-model",
  },
  20: {
    alternatives: [
      "تقبل صياغة تشير إلى أن كلا السؤالين صحيح نحويًا لكن التركيز مختلف.",
    ],
    judgment: "open-model",
  },
  21: {
    alternatives: [
      "«is attending» غير مناسبة لأن الفقرة تتحدث عن يوم غد.",
    ],
    judgment: "grammatical-only",
  },
  22: {
    alternatives: [
      "«will work» صحيحة نحويًا لكنها تخبر بحدث، لا بنشاط جارٍ عند العاشرة.",
    ],
    judgment: "grammatical-only",
  },
  23: {
    alternatives: [
      "«will prepare» صحيحة نحويًا؛ الصيغة المستمرة هي التي تصوّر الاستمرار عند لحظة الوصول.",
    ],
    judgment: "grammatical-only",
  },
  24: {
    alternatives: [
      "لاحظ بقيّة الفقرة: «she is going to visit her grandmother» خطة/ترتيب مسبق (arranged the visit yesterday)، وهو استعمال BE GOING TO لا Future Continuous.",
    ],
    judgment: "grammatical-only",
  },
  25: {
    alternatives: [
      "«What will you do at 8:00?» صحيحة نحويًا وتُقبل كبديل، لكنها تسأل عن حدث/قرار لا عن نشاط جارٍ عند الثامنة.",
      "تقبل إجابات تحفظ ترتيب: What + will + you + be + doing.",
    ],
    judgment: "open-model",
  },
};

/** المفتاح الكامل: إجابة + مفتاح قبول + تفسير + مثال لكل سؤال من 25. */
export const ANSWER_SPECS_37: Record<number, AnswerSpec37> = {
  1: {
    modelAnswer: "B. be",
    acceptedSummary: "B · be",
    explanation: "بعد will يأتي الشكل الأساسي be ثم الفعل مع ing، ولا نستخدم am ولا being في هذا الموضع.",
    example: "At 7:00 tomorrow, I will be studying.",
    check: (raw) => ["b", "be", "b be"].includes(normEn37(raw)),
  },
  2: {
    modelAnswer: "C. preparing",
    acceptedSummary: "C · preparing (حذف e الصامتة من prepare)",
    explanation: "بعد will be يأتي الفعل بصيغة ing، وتُحذف e الصامتة من prepare فتصبح preparing.",
    example: "She will be preparing dinner at 6:00.",
    check: (raw) => ["c", "preparing", "c preparing"].includes(normEn37(raw)),
  },
  3: {
    modelAnswer: "C. Will",
    acceptedSummary: "C · Will",
    explanation: "يبدأ سؤال نعم/لا في المستقبل المستمر بـ will قبل الفاعل، ثم be والفعل مع ing.",
    example: "Will they be waiting for us?",
    check: (raw) => ["c", "will", "c will"].includes(normEn37(raw)),
  },
  4: {
    modelAnswer: "B. working",
    acceptedSummary: "B · working",
    explanation: "في النفي يأتي الفعل بصيغة ing بعد won't be، فلا نختار work ولا worked.",
    example: "He won't be working tomorrow morning.",
    check: (raw) => ["b", "working", "b working"].includes(normEn37(raw)),
  },
  5: {
    modelAnswer: "A. will",
    acceptedSummary: "A · will",
    explanation: "وجود be travelling بعد الفراغ يكتمل بـ will فقط، فتكون الصيغة will be travelling.",
    example: "This time next week, we will be travelling.",
    check: (raw) => ["a", "will", "a will"].includes(normEn37(raw)),
  },
  6: {
    modelAnswer: "will be sleeping",
    acceptedSummary: "will be sleeping · 'll be sleeping · الجملة كاملة",
    explanation: "منتصف الليل لحظة مستقبلية محددة، والنشاط الجاري فيها يُصاغ بـ will be والفعل مع ing.",
    example: "At midnight, the children will be sleeping.",
    check: (raw) => normEn37(raw).includes("will be sleeping"),
  },
  7: {
    modelAnswer: "will be taking",
    acceptedSummary: "will be taking · 'll be taking",
    explanation: "في مثل هذا الوقت غدًا ننظر إلى الامتحان كنشاط جارٍ، فالصيغة هي will be taking مع حذف e من take.",
    example: "This time tomorrow, I will be taking my exam.",
    check: (raw) => normEn37(raw).includes("will be taking"),
  },
  8: {
    modelAnswer: "will be preparing",
    acceptedSummary: "will be preparing · 'll be preparing · will prepare (تركيز مختلف)",
    explanation: "جملة when الزمنية تأخذ المضارع البسيط arrive، والجملة الرئيسية تصف تحضير العشاء الجاري عند الوصول.",
    example: "When you arrive, we will be preparing dinner.",
    check: (raw) => ["will be preparing", "will prepare", "are going to prepare"].some((value) => normEn37(raw).includes(value)),
  },
  9: {
    modelAnswer: "won't be working",
    acceptedSummary: "won't be working · will not be working",
    explanation: "النفي يُبنى بـ will not أو won't، ثم be، ثم الفعل مع ing. لا نستخدم doesn't ولا won't work.",
    example: "She won't be working at 5:00 tomorrow.",
    check: (raw) => normEn37(raw).includes("won't be working"),
  },
  10: {
    modelAnswer: "Will … be waiting",
    acceptedSummary: "Will · be waiting · Will they be waiting for us at the station?",
    explanation: "سؤال نعم/لا يضع will قبل الفاعل they، ثم be waiting، وينتهي بعلامة استفهام.",
    example: "Will they be waiting for us at the station?",
    check: (raw) => {
      const c = normEn37(raw);
      return c === "will be waiting" || c.includes("will they be waiting") || (c.includes("will") && c.includes("be waiting"));
    },
  },
  11: {
    modelAnswer: "I will be studying tomorrow morning.",
    acceptedSummary: "I will be studying tomorrow morning. · أو تصحيح مختصر: will study",
    explanation: "الخطأ هو غياب be بعد will. التصحيح يضيف be ويُبقي الفعل بصيغة ing، أو يعيد الجملة إلى Future Simple سليمة.",
    example: "I will be studying tomorrow morning.",
    check: (raw) => ["will be studying", "will study"].some((value) => normEn37(raw).includes(value)),
  },
  12: {
    modelAnswer: "She will be preparing lunch.",
    acceptedSummary: "She will be preparing lunch. · 'll be preparing",
    explanation: "بعد will لا يأتي is؛ المطلوب الشكل الأساسي be دائمًا مهما كان الفاعل.",
    example: "She will be preparing lunch.",
    check: (raw) => {
      const c = normEn37(raw);
      return (c.includes("will be preparing") || c === "be preparing" || c === "be") && !c.includes("will is");
    },
  },
  13: {
    modelAnswer: "They won't be playing football.",
    acceptedSummary: "They won't be playing football. · will not be playing · won't play",
    explanation: "بعد be يجب أن يأتي الفعل بصيغة ing، فتصبح play ← playing.",
    example: "They won't be playing football.",
    check: (raw) => {
      const c = normEn37(raw);
      return c.includes("won't be playing") || c.includes("won't play") || c === "playing" || c === "be playing";
    },
  },
  14: {
    modelAnswer: "When he arrives, I will be sleeping.",
    acceptedSummary: "When he arrives… · arrives",
    explanation: "جملة when الزمنية المستقبلية تأخذ المضارع البسيط مع إضافة s للفاعل المفرد، ولا تأخذ will.",
    example: "When he arrives, I will be sleeping.",
    check: (raw) => {
      const c = normEn37(raw);
      return (c.includes("when he arrives") || c === "arrives" || c === "he arrives") && !c.includes("when he will");
    },
  },
  15: {
    modelAnswer: "What will you be doing at 8:00 tomorrow?",
    acceptedSummary: "will you be doing · be doing · السؤال كاملًا",
    explanation: "سؤال Wh يحتاج be بين الفاعل you والفعل doing: أداة الاستفهام ثم will ثم الفاعل ثم be ثم الفعل مع ing.",
    example: "What will you be doing at 8:00 tomorrow?",
    check: (raw) => {
      const c = normEn37(raw);
      return c.includes("will you be doing") || c === "be doing" || c === "will be doing";
    },
  },
  16: {
    modelAnswer: "الأولى تحدث عن حدث مستقبلي عام، والثانية تصف نشاطًا جاريًا عند الساعة الثامنة.",
    acceptedSummary: "أي صياغة تفرّق بين حدث مستقبلي عام ونشاط جارٍ عند لحظة محددة.",
    explanation: "Future Simple يقدّم الحدث كحقيقة مستقبلية، وFuture Continuous يضع الكاميرا داخل الثامنة ليصف الدراسة الجارية حينها.",
    example: "I will study tomorrow. / I will be studying at 8:00 tomorrow.",
    check: (raw) => {
      const ar = normAr37(raw);
      const en = normEn37(raw);
      return (
        /(مستمر|جار|لحظه|8|كاميرا|اثناء|وقت محدد)/.test(ar) ||
        /(حدث|عام|بسيط|حقيقه)/.test(ar) ||
        /(in progress|ongoing|continuous|moment|general|simple|event)/.test(en)
      );
    },
  },
  17: {
    modelAnswer: "لأن التعبير this time next week يحدد لحظة سيجري فيها الطيران كنشاط مستمر.",
    acceptedSummary: "أي صياغة تذكر أن الطيران سيكون نشاطًا جاريًا في تلك اللحظة.",
    explanation: "العبارة الزمنية تفتح نافذة في الأسبوع القادم، والصيغة المستمرة تصوّرنا داخل الرحلة في منتصفها.",
    example: "This time next week, we will be flying to Paris.",
    check: (raw) => {
      const ar = normAr37(raw);
      const en = normEn37(raw);
      return (
        /(مستمر|جار|لحظه|هذا الوقت|الاسبوع القادم|طيران|رحله|اثناء)/.test(ar) ||
        /(in progress|ongoing|this time|moment|flying|middle)/.test(en)
      );
    },
  },
  18: {
    modelAnswer: "لا؛ نستخدم المضارع البسيط arrive بعد when الزمنية، ويبقى will في الجملة الرئيسية.",
    acceptedSummary: "لا · المضارع البسيط بعد when · will في الجملة الرئيسية",
    explanation: "القاعدة: جملة when الزمنية المستقبلية تأخذ Present Simple، ولا تأخذ will إلا في السؤال المباشر أو السؤال غير المباشر.",
    example: "When you arrive, I will be waiting.",
    check: (raw) => {
      const ar = normAr37(raw);
      const en = normEn37(raw);
      return (
        /(لا|مضارع|بسيط|زمنيه|بدون will|لا نستخدم)/.test(ar) ||
        /\b(no|present simple|time clause|do not use will|don't use will)\b/.test(en)
      );
    },
  },
  19: {
    modelAnswer: "نعم؛ يكفي وجود حدث متقاطع أو فترة مستقبلية أو سؤال مهذب عن الخطة دون ساعة رقمية.",
    acceptedSummary: "نعم + مثال صحيح بصيغة will be + V-ing دون ساعة.",
    explanation: "لا يشترط الزمن المستمر ذكر الساعة؛ فحدث مثل When you call me أو فترة مثل all weekend تكفي لتصوّر النشاط الجاري.",
    example: "When you call me tonight, I will be studying.",
    check: (raw) => {
      const ar = normAr37(raw);
      const en = normEn37(raw);
      return /\b(will|won't)\s+(?:\w+\s+)?be\s+[a-z]+ing\b/.test(en) || /(نعم|يمكن|حدث اخر|when|سؤال مهذب|فتره)/.test(ar);
    },
  },
  20: {
    modelAnswer: "الأولى سؤال مباشر عن القرار أو طلب، والثانية سؤال مهذب عن الخطة أو الجدول دون إلحاح.",
    acceptedSummary: "الأولى قرار/طلب · الثانية خطة/سؤال مهذب.",
    explanation: "صيغة will you be + V-ing تُستخدم للسؤال اللطيف عن برنامج المخاطب قبل طلب شيء منه، وهي أشيع في هذا الموقف من السؤال المباشر.",
    example: "Will you be using the computer tonight?",
    check: (raw) => {
      const ar = normAr37(raw);
      const en = normEn37(raw);
      return /(مهذب|لطيف|ادب|خطه|خطط|جدول|طلب|قرار|مباشر)/.test(ar) || /(polite|plan|schedule|request|decision|direct)/.test(en);
    },
  },
  21: {
    modelAnswer: "will be attending",
    acceptedSummary: "will be attending · 'll be attending",
    explanation: "الساعة الثامنة صباحًا نقطة محددة في جدول مايا، والحضور سيكون جاريًا فيها.",
    example: "At 8:00, she will be attending an online English lesson.",
    check: (raw) => normEn37(raw).includes("will be attending"),
  },
  22: {
    modelAnswer: "will be working",
    acceptedSummary: "will be working · 'll be working",
    explanation: "عند العاشرة ستكون مايا في منتصف العمل على مشروع العلوم، لا في بدايته ولا في نهايته.",
    example: "At 10:00, she will be working on her science project.",
    check: (raw) => normEn37(raw).includes("will be working"),
  },
  23: {
    modelAnswer: "will be preparing",
    acceptedSummary: "will be preparing · 'll be preparing · will prepare (تركيز مختلف)",
    explanation: "جملة when brother arrives تأخذ المضارع البسيط، وتحضير الغداء نشاط جارٍ عند لحظة الوصول.",
    example: "When her brother arrives, she will be preparing lunch.",
    check: (raw) => ["will be preparing", "will prepare", "is going to prepare"].some((value) => normEn37(raw).includes(value)),
  },
  24: {
    modelAnswer: "will be reviewing",
    acceptedSummary: "will be reviewing · 'll be reviewing",
    explanation: "السابعة مساءً لحظة محددة، ومراجعة الملاحظات ستكون جارية فيها.",
    example: "At 7:00 in the evening, she will be reviewing her notes.",
    check: (raw) => normEn37(raw).includes("will be reviewing"),
  },
  25: {
    modelAnswer: "will … be doing",
    acceptedSummary: "will · be doing · What will you be doing at 8:00?",
    explanation: "سؤال الصديقة يبدأ بأداة الاستفهام What ثم will ثم الفاعل you ثم be ثم doing، وتؤكده إجابة مايا.",
    example: "What will you be doing at 8:00?",
    check: (raw) => {
      const c = normEn37(raw);
      return c === "will be doing" || c.includes("will you be doing") || (c.includes("will") && c.includes("be doing"));
    },
  },
};

const LEVEL_OF_37 = (n: number): 1 | 2 | 3 | 4 | 5 => Math.min(5, Math.max(1, Math.ceil(n / 5))) as 1 | 2 | 3 | 4 | 5;

/** عرض موحّد لمفتاح المعلم/الحلول، مشتق من المفتاح الوحيد أعلاه. */
export const TEST_SOLUTIONS_37: TestSolution37[] = Object.keys(ANSWER_SPECS_37)
  .map(Number)
  .sort((a, b) => a - b)
  .map((n) => {
    const spec = ANSWER_SPECS_37[n];
    const note = SOLUTION_NOTES_37[n] ?? { judgment: "grammatical-only" as Judgment37 };
    return {
      n,
      level: LEVEL_OF_37(n),
      answer: spec.modelAnswer,
      acceptedSummary: spec.acceptedSummary,
      explanation: spec.explanation,
      example: spec.example,
      alternatives: note.alternatives,
      judgment: note.judgment,
      sourceStatus: "platform-authored-teacher-addition" as const,
      check: spec.check,
    };
  });
