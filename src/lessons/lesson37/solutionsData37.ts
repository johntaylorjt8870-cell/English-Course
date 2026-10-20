export type TestSolution37 = {
  n: number;
  level: 1 | 2 | 3 | 4 | 5;
  answer: string;
  explanation: string;
  alternatives?: string[];
  judgment: "grammatical-only" | "grammatical-repair" | "contextual" | "open-model";
  sourceStatus: "platform-authored-teacher-addition";
};

/**
 * إضافة من إعداد المنصة/المعلم.
 * نصّ المصدر §34 يعرض أسئلة الاختبار النهائي، و§35 يذكر العنوان وعبارة
 * «عرض الحلول التفصيلية» دون مفتاح فعلي. لذلك كل إجابة وتفسير أدناه من
 * إعداد المنصة، مكتوبة على أساس أمثلة المصدر وقواعده في الأقسام 1–33،
 * وتُميَّز بوضوح داخل واجهتَي الحلول والمعلم. الإجابات المفتوحة نماذج
 * وليست صيغًا وحيدة، والبدائل المقبولة مذكورة صراحةً.
 */
export const TEST_SOLUTIONS_37: TestSolution37[] = [
  {
    n: 1, level: 1, answer: "B. be", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "بعد will يأتي الشكل الأساسي be ثم الفعل بـ -ing: At 7:00 tomorrow, I will be studying.",
    alternatives: ["A. am وC. being مرفوضان بعد will في هذا التركيب؛ الصيغة الثابتة هي will be + V-ing."],
  },
  {
    n: 2, level: 1, answer: "C. preparing", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "بعد will be يأتي الفعل بصيغة -ing: She will be preparing dinner at 6:00.",
    alternatives: ["A. prepare لا يأتي بعد be، وB. prepared صيغة تصريف ثالث لا تُستخدم مع be هنا."],
  },
  {
    n: 3, level: 1, answer: "C. Will", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "سؤال نعم/لا في هذا الزمن يُبنى بنقل will قبل الفاعل: Will they be waiting for us?",
    alternatives: ["Do لا تُستخدم مع will، وAre لا تسبق be waiting في هذا التركيب."],
  },
  {
    n: 4, level: 1, answer: "B. working", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "النفي won't be يتبعه الفعل بصيغة -ing: He won't be working tomorrow morning.",
    alternatives: ["A. work وC. worked لا تصلح بعد won't be؛ الشرط الأساسي هو الفعل مع -ing."],
  },
  {
    n: 5, level: 1, answer: "A. will", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "الصيغة الثابتة مع جميع الضمائر: will be + V-ing — This time next week, we will be travelling.",
    alternatives: ["B. are وC. have لا تصلح قبل be travelling في هذا السياق؛ وهو المثال نفسه الوارد في تدريب §28."],
  },
  {
    n: 6, level: 2, answer: "will be sleeping", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "At midnight نقطة مستقبلية محددة، فالنشاط الجاري عندها يُصاغ بـ will be + V-ing: At midnight, the children will be sleeping.",
    alternatives: ["تقبل «are sleeping» فقط إن تغيّر الإطار الزمني إلى الحاضر، وهو غير المطلوب هنا."],
  },
  {
    n: 7, level: 2, answer: "will be taking", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "This time tomorrow نقطة مستقبلية، والنشاط الجاري فيها: I will be taking my exam. (وهو المثال نفسه في §6.)",
  },
  {
    n: 8, level: 2, answer: "will be preparing", judgment: "contextual", sourceStatus: "platform-authored-teacher-addition",
    explanation: "الجملة الزمنية When you arrive تأخذ Present Simple، والجملة الرئيسية تصف النشاط الجاري عند وصول الشخص: we will be preparing dinner. (مفتاح §31 ⑥)",
    alternatives: ["«will prepare» صحيحة نحويًا كذلك، لكنها تقدّم الفعل كحدث لا كنشاط جارٍ عند الوصول؛ لذلك جواب المصدر هو الصيغة المستمرة."],
  },
  {
    n: 9, level: 2, answer: "won't be working (will not be working)", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "النفي: §18 — Subject + won't (will not) + be + V-ing: She won't be working at 5:00 tomorrow.",
    alternatives: ["لا تقبل «doesn't will» ولا «won't work» في هذا التركيب؛ الصيغة تبقى won't be + V-ing."],
  },
  {
    n: 10, level: 2, answer: "Will they be waiting", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "سؤال نعم/لا: §20 — Will + Subject + be + V-ing? فيكون: Will they be waiting for us at the station?",
    alternatives: ["إضافة «be waiting» هي المطلوبة؛ حذف be يجعل السؤال غير مكتمل."],
  },
  {
    n: 11, level: 3, answer: "I will be studying tomorrow morning.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "الخطأ: غياب be بعد will. الصيغة: will + be + V-ing.",
    alternatives: ["أي تصحيح يحفظ will be studying مقبول، مثل: I will be studying in the morning tomorrow."],
  },
  {
    n: 12, level: 3, answer: "She will be preparing lunch.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "لا تأتي is بعد will؛ المطلوب be: She will be preparing lunch. (تصحيح المصدر في §30 ②)",
    alternatives: ["«She will prepare lunch.» صحيحة نحويًا أيضًا وتُقبل كتصحيح، لأن الخطأ الأصلي هو «will is» لا اختيار الزمن."],
  },
  {
    n: 13, level: 3, answer: "They won't be playing football.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "بعد be يجب أن يأتي الفعل بصيغة -ing لا صيغة الأساس: playing.",
    alternatives: ["«They will not be playing football.» مقبولة بالمقدار نفسه."],
  },
  {
    n: 14, level: 3, answer: "When he arrives, I will be sleeping.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "الجملة الزمنية بـ when تأخذ Present Simple ولا تأخذ will: When he arrives.",
    alternatives: ["يمكن أن يكون الفعل في الجملة الرئيسية «will be sleeping» أو صيغة أخرى صحيحة، لكن موضع التصحيح المطلوب هو جملة when."],
  },
  {
    n: 15, level: 3, answer: "What will you be doing at 8:00 tomorrow?", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "سؤال Wh يحتاج be بين will والفاعل والفعل: Wh-word + will + Subject + be + V-ing?",
  },
  {
    n: 16, level: 4, answer: "الأولى Future Simple تقدّم الحدث المستقبلي عمومًا، والثانية Future Continuous تصف النشاط الذي سيكون جاريًا عند الساعة الثامنة.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "المصدر في §9: «I will study tomorrow.» تخبر المستمع بأن الدراسة ستحدث في المستقبل، و«I will be studying at 7:00 tomorrow.» تصف النشاط الذي سيكون جاريًا في لحظة مستقبلية.",
    alternatives: [
      "نقطة دقيقة من المصدر: الجملة الأولى لا تعني بالضرورة أن الدراسة ستنتهي، والثانية لا تخبرنا بموعد البداية والنهاية.",
      "تقبل صياغات عربية مترادفة تشير إلى «حدث مستقبلي عام» مقابل «نشاط جارٍ عند لحظة محددة».",
    ],
  },
  {
    n: 17, level: 4, answer: "لأننا نصف نشاطًا سيكون جاريًا في لحظة مستقبلية (هذا الوقت من الأسبوع القادم) داخل رحلة جارية.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "«This time next week» نقطة داخل فترة السفر، والصيغة المستمرة تصوّر السفر بوصفه نشاطًا جاريًا عند تلك النقطة.",
    alternatives: ["«we will fly to Paris» صحيحة نحويًا لكنها تقدّم الرحلة كحدث، لا كنشاط جارٍ في تلك اللحظة — وهذا اختلاف في التركيز لا خطأ."],
  },
  {
    n: 18, level: 4, answer: "لا؛ الجملة الزمنية التي تبدأ بـ when تأخذ Present Simple (When you arrive)، ويأتي will في الجملة الرئيسية.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "قاعدة §12: لا نستخدم will عادةً بعد when الزمنية، فالصحيح: When you arrive, I will be waiting.",
    alternatives: [
      "تمييز المصدر: «When will you arrive?» سؤال مباشر وهنا will صحيحة.",
      "ملاحظة من المنصة: في السؤال غير المباشر يبقى will صحيحًا أيضًا، مثل: I don't know when you will arrive. — لأنه ليس جملة زمنية.",
    ],
  },
  {
    n: 19, level: 4, answer: "نعم؛ يمكن وصف نشاط جارٍ خلال فترة مستقبلية دون ساعة محددة. مثال: The workers will be repairing the road throughout the weekend.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "المصدر §33: «Future Continuous لا يحتاج دائمًا إلى ساعة محددة مثل 8:00 أو 9:00»؛ والمثال يحدد فترة كاملة بدل نقطة زمنية واحدة.",
    alternatives: [
      "أمثلة مقبولة من المصدر: «This time next week, I'll be relaxing on the beach.» — «The workers will be repairing the road throughout the weekend.» — «Everyone will be having lunch.»",
      "تقبل أي إجابة تحتوي مثالًا صحيحًا الصيغة (will be + V-ing) مع سياق فترة أو برنامج.",
    ],
  },
  {
    n: 20, level: 4, answer: "الأولى تسأل عن قرار المخاطب أو استعداده، والثانية تسأل عن برنامج متوقع وعن توفّر الحاسوب ضمنه.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "المصدر §16: «Will you be using the computer tonight?» هنا نسأل عن نشاط متوقع ضمن برنامج الشخص، وربما نريد معرفة ما إذا كان الحاسوب سيكون متاحًا.",
    alternatives: ["تقبل صياغة تشير إلى أن كلا السؤالين صحيح نحويًا لكن التركيز مختلف."],
  },
  {
    n: 21, level: 5, answer: "will be attending", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "At 8:00 نقطة مستقبلية محددة داخل الفقرة: she will be attending an online English lesson.",
    alternatives: ["«is attending» غير مناسبة لأن الفقرة تتحدث عن يوم غد."],
  },
  {
    n: 22, level: 5, answer: "will be working", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "At 10:00 نقطة مستقبلية، والنشاط جارٍ عندها: she will be working on her science project.",
    alternatives: ["«will work» صحيحة نحويًا لكنها تخبر بحدث، لا بنشاط جارٍ عند العاشرة."],
  },
  {
    n: 23, level: 5, answer: "will be preparing", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "When her brother arrives جملة زمنية بـ Present Simple، والجملة الرئيسية تصف النشاط الجاري عند الوصول: she will be preparing lunch.",
    alternatives: ["«will prepare» صحيحة نحويًا؛ الصيغة المستمرة هي التي تصوّر الاستمرار عند لحظة الوصول."],
  },
  {
    n: 24, level: 5, answer: "will be reviewing", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "At 7:00 in the evening نقطة مستقبلية في الفقرة: she will be reviewing her notes.",
    alternatives: ["لاحظ بقيّة الفقرة: «she is going to visit her grandmother» خطة/ترتيب مسبق (arranged the visit yesterday)، وهو استعمال BE GOING TO لا Future Continuous."],
  },
  {
    n: 25, level: 5, answer: "What will you be doing at 8:00?", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "سؤال Wh عن نشاط متوقع في لحظة مستقبلية: Wh-word + will + Subject + be + V-ing? فيكون: What will you be doing at 8:00? — ويجيبه المصدر: I'll be watching a documentary.",
    alternatives: [
      "«What will you do at 8:00?» صحيحة نحويًا وتُقبل كبديل، لكنها تسأل عن حدث/قرار لا عن نشاط جارٍ عند الثامنة.",
      "تقبل إجابات تحفظ ترتيب: What + will + you + be + doing.",
    ],
  },
];
