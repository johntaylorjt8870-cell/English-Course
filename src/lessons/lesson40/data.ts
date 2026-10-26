import {
  sourceSection40 as findStudentSection40,
  type StudentSourceSection40,
} from "./studentLedger40";

export type SourceSectionId40 =
  | "cover"
  | "s01"
  | "s02"
  | "s03"
  | "s04"
  | "s05"
  | "s06"
  | "s07"
  | "s08"
  | "s09"
  | "s10"
  | "s11"
  | "s12"
  | "s13"
  | "s14"
  | "s15"
  | "s16"
  | "s17"
  | "s18"
  | "s19"
  | "s20"
  | "s21"
  | "s22"
  | "s23"
  | "s24"
  | "s25"
  | "s26"
  | "s27"
  | "s28"
  | "s29";

export function sourceSection40(id: string): StudentSourceSection40 {
  const found = findStudentSection40(id);
  if (!found) throw new Error(`Missing Lesson 40 student source section: ${id}`);
  return found;
}

export const LESSON_40_META = {
  lessonNumber: 40,
  titleEn: "Future Tenses Master Review",
  titleAr: "المراجعة الشاملة وإتقان أزمنة المستقبل",
  subtitleEn: "The Future Tenses Grand Challenge 🚀",
  levelAr: "تأسيسي متقدم — IQ200",
  themeAr: "مركز القيادة الزمنية",
  themeEn: "The Temporal Command Center",
} as const;

export type StationId40 =
  | "command-launch"
  | "six-questions"
  | "four-rounds"
  | "adam-core"
  | "signals-clauses"
  | "formula-foundry"
  | "live-dialogues"
  | "formative-drills"
  | "reading-centre"
  | "exam-launchpad"
  | "writing-synthesis";

export interface Station40 {
  id: StationId40;
  title: string;
  subtitle: string;
}

export const STATIONS_40: readonly Station40[] = [
  {
    id: "command-launch",
    title: "بوابة القيادة الزمنية والأهداف",
    subtitle: "الدروس 34–39 في منظومة واحدة وعشرة أهداف إتقان",
  },
  {
    id: "six-questions",
    title: "الأسئلة الستة والزوايا الخمس",
    subtitle: "البوصلة التشخيصية والجدول الذهبي وزوايا الفعل الواحد",
  },
  {
    id: "four-rounds",
    title: "الجولات التخصصية الأربع",
    subtitle: "تمييز القرار والخطة والنشاط الجاري والإنجاز والمدة",
  },
  {
    id: "adam-core",
    title: "مختبر آدم والفهم العميق",
    subtitle: "المقارنة الثلاثية الفاصلة وحقيقة التركيز على المدة",
  },
  {
    id: "signals-clauses",
    title: "الإشارات والجمل الزمنية والمدة",
    subtitle: "دور الكلمات الزمنية وقاعدة المضارع البسيط والفرق بين أدوات الربط",
  },
  {
    id: "formula-foundry",
    title: "ورشة بناء الصيغ دون خلط",
    subtitle: "تركيب الصيغ الخمس وتصحيح الأخطاء البنيوية الشائعة",
  },
  {
    id: "live-dialogues",
    title: "الحوارات التطبيقية ومختبر المواقف",
    subtitle: "تحليل حوارين كاملين واختيار الزمن من السياق وحده",
  },
  {
    id: "formative-drills",
    title: "التدريبات المتدرجة وتحدي المرونة",
    subtitle: "الاختيار والإكمال وتصحيح الأخطاء وتعدد الإجابات الصحيحة",
  },
  {
    id: "reading-centre",
    title: "تحدي القراءة والتحليل النحوي",
    subtitle: "قصة مركز التعلم المستقبلي وأسئلة الفهم ودوافع اختيار الزمن",
  },
  {
    id: "exam-launchpad",
    title: "بوابة الاختبار الشامل والحلول",
    subtitle: "الانطلاق إلى التحدي المكون من 25 سؤالًا عبر 5 مستويات",
  },
  {
    id: "writing-synthesis",
    title: "مهمة الكتابة والملخص وخريطة المنهج",
    subtitle: "الإنتاج الكتابي والقاعدة الذهبية والجسر نحو الدرس 41",
  },
];

export type StepLabKind40 =
  | "cover-horizon"
  | "cover-intent"
  | "objectives-part1"
  | "objectives-part2"
  | "six-q-console"
  | "six-q-router"
  | "golden-table-lab"
  | "five-angles-study"
  | "five-angles-shift"
  | "will-going-decisions"
  | "will-going-overlap"
  | "fc-window"
  | "fc-polite"
  | "fp-deadline"
  | "fp-checkpoint"
  | "fpc-duration"
  | "fpc-anchors"
  | "adam-timeline"
  | "adam-matcher"
  | "deep-mythbuster"
  | "deep-focus"
  | "signals-nuance"
  | "signals-dual"
  | "time-clause-builder"
  | "time-clause-vs-question"
  | "when-vs-bythetime"
  | "for-since-sorter"
  | "know-stative"
  | "formula-builder"
  | "formula-trap-repair"
  | "dialogue-science"
  | "dialogue-science-roles"
  | "dialogue-trip-read"
  | "dialogue-trip-classify"
  | "scenarios-1-3"
  | "scenarios-4-5"
  | "practice19-part1"
  | "practice19-full"
  | "practice20-fill"
  | "detective21-repair"
  | "iq22-multivalid"
  | "reading23-passage"
  | "reading23-questions"
  | "story24-analysis"
  | "story24-intent"
  | "exam25-gateway"
  | "solutions26-gateway"
  | "writing27-planner"
  | "writing27-studio"
  | "summary28-part1"
  | "summary28-part2"
  | "summary28-rule"
  | "roadmap29-tenses"
  | "roadmap29-lesson41";

export interface StepSlide40 {
  id: string;
  stepNumber: number;
  station: StationId40;
  rail: string;
  title: string;
  purpose: string;
  sectionId: SourceSectionId40;
  source: StudentSourceSection40;
  unitIndexes: readonly number[];
  includeTable?: boolean;
  revealSection?: SourceSectionId40;
  lab: StepLabKind40;
}

interface RawStepSpec40 {
  id: string;
  station: StationId40;
  rail: string;
  title: string;
  purpose: string;
  sectionId: SourceSectionId40;
  units: readonly number[];
  includeTable?: boolean;
  revealSection?: SourceSectionId40;
  lab: StepLabKind40;
}

const range = (start: number, endInclusive: number): number[] => {
  const out: number[] = [];
  for (let i = start; i <= endInclusive; i += 1) out.push(i);
  return out;
};

const RAW_STEPS_40: readonly RawStepSpec40[] = [
  // Station 1: command-launch (cover + s01)
  {
    id: "cover-01",
    station: "command-launch",
    rail: "انطلاق التحدي والمحطات الست",
    title: "مركز القيادة الزمنية: جمع محطات المستقبل الست في منظومة واحدة",
    purpose: "ربط محطات الدروس 34–39 على خط أفق زمني واحد لفهم موقع كل صيغة قبل المقارنة التطبيقية.",
    sectionId: "cover",
    units: range(0, 10),
    lab: "cover-horizon",
  },
  {
    id: "cover-02",
    station: "command-launch",
    rail: "من معرفة القاعدة إلى التحكم بالمعنى",
    title: "الانتقال من حفظ القواعد المنفصلة إلى قيادة المعنى المستقبلي",
    purpose: "استكشاف كيف يتغير اختيار الصيغة بتغير زاوية نظر المتحدث للحدث المستقبلي.",
    sectionId: "cover",
    units: range(11, 14),
    lab: "cover-intent",
  },
  {
    id: "s01-01",
    station: "command-launch",
    rail: "أهداف الإتقان (1–5)",
    title: "أهداف الإتقان الخمسة الأولى: القرار والخطة واللحظة الجارية والإنجاز",
    purpose: "تحديد معايير التمكن من اختيار الصيغة من المعنى والتمييز بين القرار اللحظي والخطة والنشاط الجاري والحدث المكتمل.",
    sectionId: "s01",
    units: range(0, 5),
    lab: "objectives-part1",
  },
  {
    id: "s01-02",
    station: "command-launch",
    rail: "أهداف الإتقان (6–10)",
    title: "أهداف الإتقان المتقدمة: المدة والجمل الزمنية وتحليل النصوص والكتابة",
    purpose: "استكمال خارطة الأهداف العشرة من قياس المدة والجمل الزمنية إلى القراءة التحليلية والإنتاج الكتابي.",
    sectionId: "s01",
    units: range(6, 10),
    lab: "objectives-part2",
  },

  // Station 2: six-questions (s02 + s03 + s04)
  {
    id: "s02-01",
    station: "six-questions",
    rail: "البوصلة التشخيصية: الأسئلة (1–3)",
    title: "الخريطة الكبرى (1–3): قرار الآن أم خطة مسبقة أم نشاط جارٍ؟",
    purpose: "تطبيق الأسئلة التشخيصية الثلاثة الأولى للتمييز الفوري بين WILL وBE GOING TO وFuture Continuous.",
    sectionId: "s02",
    units: range(0, 15),
    lab: "six-q-console",
  },
  {
    id: "s02-02",
    station: "six-questions",
    rail: "البوصلة التشخيصية: الأسئلة (4–6)",
    title: "الخريطة الكبرى (4–6): إنجاز مكتمل أم مدة ممتدة أم وعد وتوقع؟",
    purpose: "إتمام البوصلة التشخيصية ذات الأسئلة الستة وربط كل موقف بسؤاله الحاكم وصيغته النموذجية.",
    sectionId: "s02",
    units: range(16, 31),
    lab: "six-q-router",
  },
  {
    id: "s03-01",
    station: "six-questions",
    rail: "الجدول الذهبي الشامل للصيغ الخمس",
    title: "الجدول الذهبي الشامل: البنية والاستخدام النموذجي للصيغ الخمس",
    purpose: "مقارنة التراكيب الخمسة الرئيسية جنبًا إلى جنب وفهم موقع الدرس 36 ضمن المنظومة.",
    sectionId: "s03",
    units: [0],
    includeTable: true,
    lab: "golden-table-lab",
  },
  {
    id: "s04-01",
    station: "six-questions",
    rail: "فعل واحد من زوايا متعددة (1–3)",
    title: "حدث واحد وخمس زوايا: الفعل study بين القرار والخطة والنشاط الجاري",
    purpose: "ملاحظة تغير الرسالة الدلالية للفعل study عبر الصيغ الثلاث الأولى على الخط الزمني.",
    sectionId: "s04",
    units: range(0, 9),
    lab: "five-angles-study",
  },
  {
    id: "s04-02",
    station: "six-questions",
    rail: "فعل واحد من زوايا متعددة (4–5)",
    title: "إتمام الزوايا الخمس للفعل study والاكتشاف الجوهري للدرس",
    purpose: "المقارنة بين اكتمال الدراسة عند العاشرة وامتدادها لأربع ساعات واستخلاص قاعدة زاوية الإبراز.",
    sectionId: "s04",
    units: range(10, 19),
    lab: "five-angles-shift",
  },

  // Station 3: four-rounds (s05 + s06 + s07 + s08)
  {
    id: "s05-01",
    station: "four-rounds",
    rail: "الجولة الأولى: قرار لحظي أم خطة مسبقة",
    title: "الجولة الأولى: WILL مقابل BE GOING TO في القرارات والخطط",
    purpose: "التمييز التطبيقي بين القرار اللحظي أو عرض المساعدة وبين النية المقررة سلفًا.",
    sectionId: "s05",
    units: range(0, 14),
    lab: "will-going-decisions",
  },
  {
    id: "s05-02",
    station: "four-rounds",
    rail: "التوقع العام والدليل الحاضر والتداخل",
    title: "التوقعات المستقبلية: الاعتقاد العام والدليل الحاضر ومنطقة التداخل",
    purpose: "تحليل التوقع العام مقابل التوقع المبني على مشهد حاضر مع استيعاب مرونة التداخل الطبيعي بين الصيغتين.",
    sectionId: "s05",
    units: range(15, 26),
    lab: "will-going-overlap",
  },
  {
    id: "s06-01",
    station: "four-rounds",
    rail: "الجولة الثانية: نافذة النشاط الجاري",
    title: "الجولة الثانية: متى نستخدم Future Continuous؟",
    purpose: "تصوير الحدث المستمر داخل لحظة مستقبلية محددة كما في درس السادسة إلى السابعة والنصف.",
    sectionId: "s06",
    units: range(0, 10),
    lab: "fc-window",
  },
  {
    id: "s06-02",
    station: "four-rounds",
    rail: "أمثلة الاستمرار والسؤال المهذب",
    title: "تطبيقات Future Continuous والسؤال الطبيعي عن التفرغ والبرنامج",
    purpose: "استيعاب أمثلة الاستمرار المستقبلي واستخدام Will you be using...? للاستفسار اللطيف غير الضاغط.",
    sectionId: "s06",
    units: range(11, 18),
    lab: "fc-polite",
  },
  {
    id: "s07-01",
    station: "four-rounds",
    rail: "الجولة الثالثة: نقطة الاكتمال المستقبلي",
    title: "الجولة الثالثة: متى نستخدم Future Perfect؟",
    purpose: "تمثيل إنجاز يكتمل قبل حلول موعد مستقبلي محدد كما في إنهاء المشروع قبل يوم الجمعة.",
    sectionId: "s07",
    units: range(0, 7),
    lab: "fp-deadline",
  },
  {
    id: "s07-02",
    station: "four-rounds",
    rail: "أمثلة الإنجاز المكتمل بحلول الموعد",
    title: "تطبيقات Future Perfect والتركيز على الاكتمال قبل النقطة المرجعية",
    purpose: "ترسيخ كيف ينظر Future Perfect إلى الخلف من نقطة مستقبلية ليرصد تمام الإنجاز.",
    sectionId: "s07",
    units: range(8, 16),
    lab: "fp-checkpoint",
  },
  {
    id: "s08-01",
    station: "four-rounds",
    rail: "الجولة الرابعة: قياس المدة الممتدة",
    title: "الجولة الرابعة: متى نستخدم Future Perfect Continuous؟",
    purpose: "حساب امتداد النشاط من نقطة بدايته حتى اللحظة المستقبلية في مثال تدريب سارة من 2:00 إلى 6:00.",
    sectionId: "s08",
    units: range(0, 9),
    lab: "fpc-duration",
  },
  {
    id: "s08-02",
    station: "four-rounds",
    rail: "أمثلة امتداد النشاط حتى النقطة المرجعية",
    title: "تطبيقات Future Perfect Continuous عبر الساعات والشهور والسنوات",
    purpose: "ربط طول المدة الزمنية بالنقطة المستقبلية المرجعية في سياقات التعلم والانتظار والسفر.",
    sectionId: "s08",
    units: range(10, 16),
    lab: "fpc-anchors",
  },

  // Station 4: adam-core (s09 + s10)
  {
    id: "s09-01",
    station: "adam-core",
    rail: "قلب الدرس: مشروع آدم (4:00–8:00)",
    title: "المقارنة الثلاثية الفاصلة على خط عمل آدم من الرابعة حتى الثامنة",
    purpose: "اختبار الفرق الدقيق بين النشاط الجاري عند السادسة والإنجاز المكتمل والمدة الممتدة بحلول الثامنة.",
    sectionId: "s09",
    units: range(0, 14),
    lab: "adam-timeline",
  },
  {
    id: "s09-02",
    station: "adam-core",
    rail: "جدول المقارنة الثلاثية والأسئلة الحاكمة",
    title: "ملخص المقارنة الثلاثية: ربط كل زمن بسؤاله التوجيهي الدقيق",
    purpose: "تثبيت التطابق المباشر بين السؤال المقصود في ذهن المتحدث والصيغة النحوية المقابلة.",
    sectionId: "s09",
    units: [15],
    includeTable: true,
    lab: "adam-matcher",
  },
  {
    id: "s10-01",
    station: "adam-core",
    rail: "فحص المفهوم: هل تعني المدة عدم الاكتمال؟",
    title: "اختبار الفهم العميق: هل Future Perfect Continuous يعني أن العمل لم ينتهِ؟",
    purpose: "تصحيح التصور الخاطئ الشائع وإثبات أن الجملة تبرز طول المدة دون الجزم بالتوقف أو الاستمرار بعدها.",
    sectionId: "s10",
    units: range(0, 7),
    lab: "deep-mythbuster",
  },
  {
    id: "s10-02",
    station: "adam-core",
    rail: "النتيجة المكتملة مقابل امتداد المدة",
    title: "المعيار الصحيح للتمييز: إبراز النتيجة مقابل إبراز المدة",
    purpose: "ترسيخ المعادلة الدقيقة بين Future Perfect للنتيجة وFuture Perfect Continuous لامتداد النشاط.",
    sectionId: "s10",
    units: range(8, 13),
    lab: "deep-focus",
  },

  // Station 5: signals-clauses (s11 + s12 + s13 + s14)
  {
    id: "s11-01",
    station: "signals-clauses",
    rail: "الإشارات الزمنية تساعد ولا تقرر وحدها",
    title: "الكلمات الزمنية: مؤشرات مساعدة لا قوالب آلية جامدة",
    purpose: "إدراك لماذا تصح will finish وwill have finished مع by Friday تبعًا للمعنى المقصود.",
    sectionId: "s11",
    units: range(0, 17),
    lab: "signals-nuance",
  },
  {
    id: "s11-02",
    station: "signals-clauses",
    rail: "المعنى فوق الكلمة المفتاحية",
    title: "تعدد الصيغ الصحيحة مع العبارة الزمنية الواحدة باختلاف التركيز",
    purpose: "المقارنة بين will have worked وwill have been working مع for ten years لفهم أولوية المعنى.",
    sectionId: "s11",
    units: range(18, 22),
    lab: "signals-dual",
  },
  {
    id: "s12-01",
    station: "signals-clauses",
    rail: "قاعدة الجمل الزمنية المستقبلية",
    title: "قاعدة الجمل الزمنية المستقبلية: المضارع البسيط بعد أدوات الربط",
    purpose: "تركيب الجمل الزمنية مع when وbefore وafter وas soon as وuntil وby the time مع أزمنة جواب الشرط المختلفة.",
    sectionId: "s12",
    units: range(0, 17),
    lab: "time-clause-builder",
  },
  {
    id: "s12-02",
    station: "signals-clauses",
    rail: "الجملة التابعة مقابل سؤال When المباشر",
    title: "تجنب will داخل الجملة الزمنية والتمييز عن السؤال المباشر When will you arrive?",
    purpose: "التفريق الحاسم بين When كرابط زمني يأخذ المضارع البسيط وبين When كأداة استفهام مباشر تقبل will.",
    sectionId: "s12",
    units: range(18, 25),
    lab: "time-clause-vs-question",
  },
  {
    id: "s13-01",
    station: "signals-clauses",
    rail: "زاوية النظر مع WHEN وBY THE TIME معًا",
    title: "الفرق بين WHEN وBY THE TIME حول حدث مرجعي واحد",
    purpose: "رؤية كيف يظل وصول الضيف حدثًا مرجعيًا ثابتًا بينما تتغير الصيغة بين الاستمرار والاكتمال والمدة.",
    sectionId: "s13",
    units: range(0, 14),
    lab: "when-vs-bythetime",
  },
  {
    id: "s14-01",
    station: "signals-clauses",
    rail: "التمييز بين FOR للمدة وSINCE للبداية",
    title: "FOR مقابل SINCE داخل منظومة المستقبل",
    purpose: "فرز تعبيرات طول المدة الزمنية مقابل نقاط انطلاق الحدث في جمل المستقبل التام المستمر.",
    sectionId: "s14",
    units: range(0, 12),
    lab: "for-since-sorter",
  },
  {
    id: "s14-02",
    station: "signals-clauses",
    rail: "استخدام FOR مع فعل الحالة know بالمستقبل",
    title: "استخدام FOR مع Future Perfect وقيد أفعال الحالة مثل know",
    purpose: "تفسير لماذا نقول I'll have known her for ten years ونتجنب صيغة الاستمرار مع فعل الحالة know.",
    sectionId: "s14",
    units: range(13, 20),
    lab: "know-stative",
  },

  // Station 6: formula-foundry (s15)
  {
    id: "s15-01",
    station: "formula-foundry",
    rail: "مصفوفة بناء الفعل write في الصيغ الخمس",
    title: "مختبر البناء: تركيب الصيغ الخمس للفعل write بدقة",
    purpose: "تجميع الأفعال المساعدة وتصريفات الفعل الرئيسي دون خلط بين V1 وV-ing وV3.",
    sectionId: "s15",
    units: [0],
    includeTable: true,
    lab: "formula-builder",
  },
  {
    id: "s15-02",
    station: "formula-foundry",
    rail: "إصلاح الخلط البنيوي في التراكيب الخمسة",
    title: "الأخطاء التركيبية الخمسة الشائعة ومقابلاتها الصحيحة",
    purpose: "رصد الخلط في will writing وwill be write وwill have wrote وتصويبه فورًا.",
    sectionId: "s15",
    units: range(1, 12),
    lab: "formula-trap-repair",
  },

  // Station 7: live-dialogues (s16 + s17 + s18)
  {
    id: "s16-01",
    station: "live-dialogues",
    rail: "الحوار الأول: مسابقة العلوم",
    title: "الحوار الشامل الأول: The Science Competition",
    purpose: "قراءة حوار طبيعي يوظف الصيغ المستقبلية الخمس جميعًا في سياق مشروع روبوت مدرسي.",
    sectionId: "s16",
    units: range(0, 11),
    lab: "dialogue-science",
  },
  {
    id: "s16-02",
    station: "live-dialogues",
    rail: "التحليل الدلالي لحوار مسابقة العلوم",
    title: "تحليل حوار مسابقة العلوم: لماذا أضافت كل صيغة معلومة مستقلة؟",
    purpose: "ربط كل جملة في الحوار بوظيفتها التواصلية الدقيقة دون تكرار أو زخرفة.",
    sectionId: "s16",
    units: range(12, 27),
    lab: "dialogue-science-roles",
  },
  {
    id: "s17-01",
    station: "live-dialogues",
    rail: "الحوار الثاني: رحلة العائلة",
    title: "الحوار الشامل الثاني: A Family Trip",
    purpose: "تتبع تسلسل الأحداث والخطط والأدلة الحاضرة والمدد الزمنية في حوار رحلة عائلية.",
    sectionId: "s17",
    units: range(0, 7),
    lab: "dialogue-trip-read",
  },
  {
    id: "s17-02",
    station: "live-dialogues",
    rail: "تحدي تصنيف جمل رحلة العائلة",
    title: "تحدي التصنيف النحوي والدلالي لجمل حوار A Family Trip الست",
    purpose: "تصنيف الاستخدامات الستة بنفسك ثم مطابقة إجابتك مع الحلول التفصيلية بعد المحاولة.",
    sectionId: "s17",
    units: range(8, 16),
    revealSection: "s17",
    lab: "dialogue-trip-classify",
  },
  {
    id: "s18-01",
    station: "live-dialogues",
    rail: "مختبر المواقف بلا إشارات جاهزة (1–3)",
    title: "مختبر المواقف (1–3): اختيار الزمن من فهم الموقف وحده",
    purpose: "استنتاج الصيغة المناسبة لعرض المساعدة والخطة المسبقة والانشغال أثناء الامتحان دون كلمات مفتاحية مباشرة.",
    sectionId: "s18",
    units: range(0, 18),
    lab: "scenarios-1-3",
  },
  {
    id: "s18-02",
    station: "live-dialogues",
    rail: "مختبر المواقف بلا إشارات جاهزة (4–5)",
    title: "مختبر المواقف (4–5): الإنجاز قبل الموعد وقياس مدة المشروع الطويل",
    purpose: "إكمال تدريب الاستدلال السياقي بالتمييز بين جاهزية المشروع قبل التسليم وحساب مدة الأشهر الستة.",
    sectionId: "s18",
    units: range(19, 30),
    lab: "scenarios-4-5",
  },

  // Station 8: formative-drills (s19 + s20 + s21 + s22)
  {
    id: "s19-01",
    station: "formative-drills",
    rail: "التدريب الأول: اختيار الصيغة (1–3)",
    title: "التدريب الأول (1–3): اختر الصيغة الأنسب للسياق",
    purpose: "التدرب التفاعلي على الأسئلة الثلاثة الأولى مع تغذية راجعة فورية تشرح سبب الاختيار.",
    sectionId: "s19",
    units: range(0, 13),
    lab: "practice19-part1",
  },
  {
    id: "s19-02",
    station: "formative-drills",
    rail: "التدريب الأول: إكمال المجموعة (4–6)",
    title: "التدريب الأول (4–6): استكمال الاختيارات الستة ومراجعة الحلول",
    purpose: "إنجاز جميع فقرات التدريب الأول الست لفتح بطاقة المراجعة الكاملة.",
    sectionId: "s19",
    units: range(14, 26),
    revealSection: "s19",
    lab: "practice19-full",
  },
  {
    id: "s20-01",
    station: "formative-drills",
    rail: "التدريب الثاني: إكمال الفراغات الثمانية",
    title: "التدريب الثاني: أكمل الجمل الثماني بالصيغة المناسبة للمعنى",
    purpose: "كتابة الصيغ الفعلية الكاملة عبر الجمل الثماني مع قبول الاختصارات والبدائل السياقية السليمة.",
    sectionId: "s20",
    units: range(0, 9),
    revealSection: "s20",
    lab: "practice20-fill",
  },
  {
    id: "s21-01",
    station: "formative-drills",
    rail: "تحدي محقق القواعد: تصحيح 10 أخطاء",
    title: "Grammar Detective — التحدي الشامل لتصحيح الأخطاء العشرة",
    purpose: "اكتشاف موطن الخلل التركيبي أو الدلالي في عشر جمل وإعادة كتابتها بصورة صحيحة.",
    sectionId: "s21",
    units: range(0, 11),
    revealSection: "s21",
    lab: "detective21-repair",
  },
  {
    id: "s22-01",
    station: "formative-drills",
    rail: "تحدي المرونة الدلالية وتعدد الصواب",
    title: "تحدي IQ200: متى تكون أكثر من إجابة صحيحة؟",
    purpose: "فهم كيف تسمح اللغة الحقيقية بأكثر من صيغة صحيحة عندما يختلف التركيز أو زاوية العرض.",
    sectionId: "s22",
    units: range(0, 15),
    lab: "iq22-multivalid",
  },

  // Station 9: reading-centre (s23 + s24)
  {
    id: "s23-01",
    station: "reading-centre",
    rail: "نص القراءة: مركز التعلم المستقبلي",
    title: "Reading Challenge — Building the Future Learning Centre",
    purpose: "قراءة القصة المتكاملة وتتبع الصيغ المستقبلية الموظفة داخل سياق مدرسي واقعي.",
    sectionId: "s23",
    units: range(0, 19),
    lab: "reading23-passage",
  },
  {
    id: "s23-02",
    station: "reading-centre",
    rail: "أسئلة الفهم الثمانية للنص القرائي",
    title: "أسئلة الفهم الثمانية لقصة Building the Future Learning Centre",
    purpose: "الإجابة التفاعلية عن أسئلة الفهم الثمانية استنادًا إلى أدلة النص وفتح الحلول النموذجية بعد المحاولة.",
    sectionId: "s23",
    units: range(20, 29),
    revealSection: "s23",
    lab: "reading23-questions",
  },
  {
    id: "s24-01",
    station: "reading-centre",
    rail: "التحليل النحوي لجمل القصة الست",
    title: "التحليل النحوي الكامل لأهم جمل القصة",
    purpose: "ربط كل صيغة وردت في القصة بسببها الدلالي الدقيق من الخطة المسبقة إلى التوقع الختامي.",
    sectionId: "s24",
    units: range(0, 12),
    lab: "story24-analysis",
  },
  {
    id: "s24-02",
    station: "reading-centre",
    rail: "الدرس المستفاد: لماذا اختار الكاتب هذا الزمن؟",
    title: "مهارة القارئ المتقدم: السؤال عن قصد الكاتب من اختيار الزمن",
    purpose: "الانتقال من مجرد تسمية الزمن أثناء القراءة إلى تفسير سبب اختياره في السياق.",
    sectionId: "s24",
    units: range(13, 17),
    lab: "story24-intent",
  },

  // Station 10: exam-launchpad (s25 + s26)
  {
    id: "s25-01",
    station: "exam-launchpad",
    rail: "بوابة الاختبار النهائي الشامل (25 سؤالًا)",
    title: "الاختبار النهائي الشامل — Future Tenses Grand Exam",
    purpose: "التعرف على المستويات الخمسة للاختبار والانتقال المباشر إلى منطقة الاختبار المستقلة.",
    sectionId: "s25",
    units: [0, 1],
    lab: "exam25-gateway",
  },
  {
    id: "s26-01",
    station: "exam-launchpad",
    rail: "بوابة الحلول التفصيلية بعد التسليم",
    title: "نظام الحلول التفصيلية ومراجعة الإجابات بعد إنهاء الاختبار",
    purpose: "توضيح آلية حجب مفاتيح الإجابة أثناء المحاولة وفتح الشرح الكامل بعد التسليم الفعلي.",
    sectionId: "s26",
    units: [0, 1],
    lab: "solutions26-gateway",
  },

  // Station 11: writing-synthesis (s27 + s28 + s29)
  {
    id: "s27-01",
    station: "writing-synthesis",
    rail: "مهمة الكتابة الكبرى والشروط العشرة",
    title: "مهمة الإنتاج اللغوي الكبرى: My Future Learning Journey",
    purpose: "استيعاب شروط الفقرة المطلوبة (15–18 جملة) وتوزيع الصيغ والأسئلة والروابط الزمنية قبل الكتابة.",
    sectionId: "s27",
    units: range(0, 12),
    lab: "writing27-planner",
  },
  {
    id: "s27-02",
    station: "writing-synthesis",
    rail: "النموذج الإرشادي واستوديو الكتابة الذاتية",
    title: "النموذج الافتتاحي الإرشادي واستوديو كتابة فقرتك الخاصة",
    purpose: "تحليل الجمل الإرشادية الست ثم كتابة فقرتك المستقلة مع عداد الجمل وقائمة المراجعة الذاتية.",
    sectionId: "s27",
    units: range(13, 20),
    lab: "writing27-studio",
  },
  {
    id: "s28-01",
    station: "writing-synthesis",
    rail: "الملخص الذهبي: الصيغ الثلاث الأولى",
    title: "الملخص الذهبي النهائي (1–3): WILL وBE GOING TO وFuture Continuous",
    purpose: "مراجعة البنية والاستخدام النموذجي والمثال المرجعي للصيغ الثلاث الأولى.",
    sectionId: "s28",
    units: range(0, 20),
    lab: "summary28-part1",
  },
  {
    id: "s28-02",
    station: "writing-synthesis",
    rail: "الملخص الذهبي: صيغتا التام والتام المستمر",
    title: "الملخص الذهبي النهائي (4–5): Future Perfect وFuture Perfect Continuous",
    purpose: "مراجعة صيغتي الإنجاز المكتمل والمدة الممتدة وتثبيت الفارق بينهما.",
    sectionId: "s28",
    units: range(21, 34),
    lab: "summary28-part2",
  },
  {
    id: "s28-03",
    station: "writing-synthesis",
    rail: "القاعدة الذهبية الكبرى لمنظومة المستقبل",
    title: "القاعدة الذهبية الكبرى: اسأل عن المعنى قبل الكلمة الزمنية",
    purpose: "تتويج الدرس بالمعيار الحاكم الذي يقود المتحدث من قصده الدلالي إلى الصيغة الأدق.",
    sectionId: "s28",
    units: range(35, 44),
    lab: "summary28-rule",
  },
  {
    id: "s29-01",
    station: "writing-synthesis",
    rail: "خريطة المنهج: إتمام منظومات الأزمنة الثلاث",
    title: "خريطة تقدم المنهج بعد الدرس 40: الحاضر والماضي والمستقبل مكتملة",
    purpose: "استعراض الإنجاز الكامل عبر خمس عشرة محطة زمنية مترابطة من المضارع البسيط حتى إتقان المستقبل.",
    sectionId: "s29",
    units: range(0, 18),
    lab: "roadmap29-tenses",
  },
  {
    id: "s29-02",
    station: "writing-synthesis",
    rail: "المحطة القادمة: الدرس 41 والأفعال المساعدة",
    title: "الجسر نحو الدرس 41: Master Auxiliary Verbs — الإتقان الشامل للأفعال المساعدة",
    purpose: "التعرف على دور BE وDO وHAVE والأفعال الناقصة والانتقال المباشر إلى الدرس 41.",
    sectionId: "s29",
    units: range(19, 31),
    lab: "roadmap29-lesson41",
  },
];

export const SLIDES_40: readonly StepSlide40[] = RAW_STEPS_40.map((spec, idx) => ({
  id: spec.id,
  stepNumber: idx + 1,
  station: spec.station,
  rail: spec.rail,
  title: spec.title,
  purpose: spec.purpose,
  sectionId: spec.sectionId,
  source: sourceSection40(spec.sectionId),
  unitIndexes: spec.units,
  includeTable: spec.includeTable,
  revealSection: spec.revealSection,
  lab: spec.lab,
}));

export const STEP_COUNT_40 = SLIDES_40.length;

export const STATION_BY_ID_40: Record<StationId40, Station40> = Object.fromEntries(
  STATIONS_40.map((s) => [s.id, s])
) as Record<StationId40, Station40>;
