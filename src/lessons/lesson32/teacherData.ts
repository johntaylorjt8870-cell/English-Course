// ============================================================
// منطقة المعلم — دعم تدريسي حقيقي (ليس مفتاح إجابات فقط).
// كلمة المرور: somer173 (لا تُغيَّر).
// كل ما هنا «شرح/توجيه للمعلم» = Platform Explanation، إلا الاقتباسات الموسومة «المصدر».
// ============================================================

export const TEACHER_PASSWORD_32 = "somer173";

export const TEACHER_32_OVERVIEW = {
  title: "نظرة عامة للمعلم — الدرس 32: Present Perfect Continuous",
  objectives: [
    "فهم معنى Present Perfect Continuous (نشاط بدأ في الماضي وامتد إلى الحاضر أو انتهى قريبًا وله أثر الآن).",
    "تكوين الجملة: Subject + have/has + been + V-ing، والنفي والسؤال والإجابة القصيرة.",
    "استخدام for مع المدة وsince مع نقطة البداية، وأسئلة How long.",
    "التمييز بين Present Perfect (النتيجة) وPresent Perfect Continuous (النشاط والمدة).",
    "فهم متى نهتم بالنتيجة ومتى نهتم بالنشاط والمدة.",
    "استعمال الزمن في الأسئلة والنفي.",
    "فهم كلمات مثل: for, since, all day, recently, lately, how long.",
    "التمييز بين PPC وPast Continuous وPast Perfect Continuous عبر نقطة المرجع.",
    "حل أسئلة IQ200 تجمع عدة أزمنة.",
  ],
  prerequisites: [
    "Present Perfect (الدرس 31): have/has + V3، وإدراك أن الماضي المرتبط بالحاضر مختلف عن Past Simple.",
    "V3 والأفعال غير المنتظمة (الدرس 27) — لأن been هي V3 من be وتحتاج الطلاب إلى الثلاثي.",
    "Present Continuous (الدرس 9) — لأن verb-ing ومعنى الاستمرار مألوفان من هناك.",
    "Past Continuous (الدرس 25) والماضي التام المستمر (الدرس 29) — للمقارنة بنقطة المرجع.",
  ],
  core: [
    "المحور الأول: النتيجة أم النشاط؟ (Present Perfect ↔ PPC) — هذا محور الدرس كله.",
    "المحور الثاني: for = مدة (كم؟) · since = نقطة بداية (منذ متى؟).",
    "المحور الثالث: نقطة المرجع — NOW تُنتج PPC، وحدث ماضٍ يُنتج Past Continuous أو Past Perfect Continuous.",
  ],
};

export const TEACHER_32_TIMING = [
  "الغلاف والأهداف (≈ 3 دقائق) — اطلب من الطلاب توقّع الفرق قبل شرح أي قاعدة.",
  "التعريف والبناء (الخطوات 3–6): شريط النشاط + have/has + been + V-ing.",
  "for وsince وHow long (الخطوات 7–10): اكتب الجملة بـ for أو since قبل كشف النص.",
  "النفي والأسئلة والإجابة القصيرة (الخطوات 11–14): اجعل الطلاب يقرؤون الفخ المصدري (Yes, I have been ❌) بصوت عالٍ.",
  "الأثر والنتيجة (الخطوات 15–20): أعمال مقارنة بين الجمل المتقاربة — النتيجة مقابل النشاط.",
  "الكلمات والأفعال (الخطوات 21–25): أعمال الفرز والبوابة لتثبيت الفكرة.",
  "نقطة المرجع (الخطوات 26–28): حرّك النقطة أمام الطلاب وسمّ كل زمن قبل أن يسمّيه الطالب.",
  "صيد الأخطاء (الخطوات 29–35): أخطاء المصدر كلها موجودة هنا بنصها — دعهم يكتشفون قبل التصحيح.",
  "التحديات النهائية (الخطوات 36–39) والخاتمة (الخطوة 40): الزعيم وقصة Maya، ثم الاختبار.",
];

export type TeacherNote32 = { head: string; lines: string[] };

export const TEACHER_32_NOTES: TeacherNote32[] = [
  { head: "الفكرة الأم للدرس", lines: [
    "Platform Explanation: الطالب يعتقد أن الزمن يتحدد بالماضي أو الحاضر فقط. الدرس يقول: الزمن يتحدد بزاوية النظر — هل أهتم بالنتيجة، أم بالنشاط والمدة؟",
    "المصدر (§14، §35): «هل أهتم بما تم إنجازه؟ ← PP · هل أهتم بالنشاط أو المدة؟ ← PPC».",
  ] },
  { head: "المدة مقابل نقطة البداية", lines: [
    "اختبار سريع للطلاب: هل الكلمة المتبعة «مسافة» أم «علامة على الطريق»؟ three hours = مسافة (for) · Monday = علامة (since).",
    "المصدر (§7): for + مدة · since + بداية. لا تشرح القاعدة قبل أن يصنّفوا 8 عبارات بأنفسهم (شريط الخطوة ⑦).",
  ] },
  { head: "لماذا يُعتبر التركيز على النشاط أصعب؟", lines: [
    "Platform Explanation: في PP يكون الإنجاز واضحًا في الجملة؛ في PPC يحتاج الطالب إلى «رؤية» النشاط. استخدم الأدلة المرئية (اللهاث، اليدان المتسختان، الأرض المبللة) لتجسيد النشاط.",
  ] },
  { head: "نقطة المرجع (Reference Point)", lines: [
    "Platform Explanation: حرّك نقطة المرجع أمام الطلاب من 8:00 إلى NOW ثم إلى «حدث ماضٍ آخر». الطالب الذي يرى الزمن يتغيّر مع النقطة يفهم الفرق بين PPC وPast Continuous وPast Perfect Continuous.",
    "المصدر (§25–§26): «لاحظ كيف تغيرت نقطة المرجع».",
  ] },
  { head: "الأفعال الحالية (Stative verbs)", lines: [
    "المصدر (§23): know, believe, understand, want, need, remember, like, love, hate — مع كلمة «عادةً» في أمثلة المصدر. درّس الحذر من التعميم؛ لا تقل «ممنوع» بشكل مطلق دون الإشارة إلى أن المصدر يقول «عادةً».",
  ] },
  { head: "لا تعتمد على كلمة واحدة", lines: [
    "المصدر (§20): today قد تأتي مع PP («I have studied three chapters today»)، وrecently قد تأتي مع PPC. المعنى هو الذي يحدد الزمن.",
    "أعد الطلاب إلى السؤال: هل أتحدث عن ماذا أُنجز أم عن كم استمر؟",
  ] },
  { head: "تصنيف مُتنازَع فيه في المصدر (تنبيه للمعلم)", lines: [
    "المصدر (§33): «Adam has studied robotics for three years» مصنّفة Present Perfect، مع سبب «المدة والتجربة المرتبطة بالحاضر».",
    "Platform Explanation: الجملة تحوي مدة (for three years)، وفي الاستعمال الإنجليزي يُقبل أيضًا has been studying في سياق مشابه، لأن الدرس يفرّق بين التجربة/الإنجاز والنشاط الممتد. الإجابة المعتمدة هي إجابة المصدر، ويُنصح بعرض التصنيف كما هو مع النقاش، لا تغييره بصمت.",
  ] },
  { head: "أخطاء المصدر المتعمدة", lines: [
    "المصدر يحتوي 12 جملة خاطئة متعمدة (انظر القائمة أدناه). لا تُصححها للطالب قبل أن يحاول: اطلب منه أن يمسّ الجزء الخاطئ أولًا.",
  ] },
  { head: "الإجابات القصيرة", lines: [
    "المصدر (§11): Yes, I have. ✅ · Yes, I have been. ❌ — المعلم يشرح أن الإجابة القصيرة تستعمل have/has، وأن been لا تُعاد.",
  ] },
  { head: "الاحتفاظ بالمصطلحات الإنجليزية", lines: [
    "Platform Explanation: كل صيغة إنجليزية تُعرض LTR معزولة. عند الشرح بالعربية، اكتب الجملة الإنجليزية أولًا ثم الترجمة (مثال: I have been studying ← لقد كنت أدرس).",
  ] },
];

export type TeacherSolution32 = { head: string; lines: string[] };

/** حلول تمارين المصدر — مع المرجع «المصدر §X» في كل مجموعة */
export const TEACHER_32_SOLUTIONS: TeacherSolution32[] = [
  { head: "§11 · الإجابات القصيرة (المصدر)", lines: [
    "Have you been studying? → Yes, I have. ✅ / No, I haven't. · Has she been working? → Yes, she has. / No, she hasn't. · Have they been waiting? → Yes, they have. / No, they haven't.",
    "Yes, I have been. ❌ — خطأ متعمد في المصدر.",
  ] },
  { head: "§12 · Wh Questions (المصدر)", lines: [
    "What have you been doing? · Where have they been staying? · Why has she been crying? · How long have you been waiting? · Who has been using my computer?",
    "Platform Explanation: في Who has been using my computer؟ الكلمة who هي الفاعل، لذلك لا يأتي has قبلها.",
  ] },
  { head: "§16 · مثال IQ200 (المصدر)", lines: [
    "A: I have written five pages. ← التركيز على النتيجة والكمية. B: I have been writing for three hours. ← التركيز على النشاط والمدة.",
  ] },
  { head: "§23 · الأفعال الحالية (المصدر)", lines: [
    "I have known him for ten years. ✅ · She has understood the problem. ✅",
    "I have been knowing him for ten years. ❌ · She has been understanding the problem. ❌ (عادةً).",
  ] },
  { head: "§27 · Grammar Detective (المصدر — 8 أخطاء)", lines: [
    "① She has been studying for two hours. ② I have been working for three hours. ③ He has known her for years. ④ Have you been waiting long? ⑤ They have been playing all afternoon. ⑥ She hasn't been sleeping well. ⑦ How long has he been working here? ⑧ I have written five emails.",
    "⑧: نركز على عدد مكتمل (five emails) ← have written، وليس have been written.",
  ] },
  { head: "§28 · تحدي الاختيار (المصدر)", lines: [
    "① have read · ② have been reading · ③ has made · ④ has been making · ⑤ have cleaned · ⑥ have been cleaning.",
    "الشرح: العدد أو الإنجاز الواضح ← Present Perfect؛ النشاط والمدة ← Present Perfect Continuous.",
  ] },
  { head: "§29 · IQ200 — نفس الفعل (المصدر)", lines: [
    "I have repaired my bicycle → الدراجة أصبحت مُصلحة (نتيجة) · I have been repairing my bicycle → كنت أعمل على إصلاحها، وقد لا أكون انتهيت (نشاط).",
    "المعلم يسأل الطالب: «ما الذي أريد أن أُبرزه؟» قبل «أي زمن أصعب؟».",
  ] },
  { head: "§32 · Boss Challenge (المصدر — 8 جمل)", lines: [
    "① play — Present Simple · ② are playing — Present Continuous · ③ have read — Present Perfect · ④ have been studying — Present Perfect Continuous · ⑤ studies — Present Simple · ⑥ is studying — Present Continuous · ⑦ has been studying — Present Perfect Continuous · ⑧ has read — Present Perfect.",
    "المصدر: «لاحظ كيف أصبح لدينا الآن أربع درجات مختلفة من الزمن في الحاضر».",
  ] },
  { head: "§33 · Final IQ200 (المصدر — فقرة Adam)", lines: [
    "has studied → Present Perfect · has built → Present Perfect (six robots) · has been working → Present Perfect Continuous (since January) · has been testing → Present Perfect Continuous (every afternoon).",
    "انظر ملاحظة التصنيف في قسم الملاحظات: has studied for three years.",
  ] },
  { head: "§34 · Final Boss (المصدر — قصة Maya)", lines: [
    "She has been studying science for several months. · She has read eight books so far. · She has been working on her project since January. · She has completed most of the experiments. · She is tired because she has been working all day.",
  ] },
  { head: "§31 · since و for (المصدر)", lines: [
    "المصدر: I have been studying since three hours. ❌ ← الصحيح: I have been studying for three hours. ✅ · since 5:00 نقطة بداية.",
  ] },
];

export type RubricRow32 = { level: string; desc: string };
export type TeacherRubric32 = { head: string; rows: RubricRow32[] };
export const TEACHER_32_RUBRICS: TeacherRubric32[] = [
  { head: "rubric · إنتاج جملة (Sentence construction)", rows: [
    { level: "4 · متقن", desc: "يبني الصيغة بالترتيب الصحيح، ويختار for/since بدقة، ويكتب النفي والسؤال والإجابة القصيرة بلا أخطاء." },
    { level: "3 · جيد", desc: "خطأ واحد في الترتيب أو الشكل (مثل V2 بدل V3)، ويصححه بعد التنبيه." },
    { level: "2 · متوسط", desc: "يخلط بين have/has أو يستعمل been بعد الإجابة القصيرة، ويحتاج إلى نموذج مكتوب." },
    { level: "1 · يحتاج دعمًا", desc: "لا يميّز بين PP وPPC، ولا يعرف لماذا تأتي for قبل المدة." },
  ] },
  { head: "rubric · تفسير الزاوية (النتيجة مقابل النشاط)", rows: [
    { level: "4 · متقن", desc: "يشرح بجملة عربية وإنجليزية متى تكون النتيجة هي المهمة ومتى يكون النشاط أو المدة هو المهم، ويستشهد بمثال من الدرس." },
    { level: "2 · متوسط", desc: "يعرف القاعدة لكنه يحتاج إلى مساعدة في تبرير الاختيار." },
    { level: "1 · يحتاج دعمًا", desc: "يرى الزمن كأنه مسألة حفظ، لا معنى." },
  ] },
];

export const TEACHER_32_MISTAKES: TeacherNote32[] = [
  { head: "١. been + V-ing بعد Yes/No", lines: ["Yes, I have been. ❌ — المصدر (§11). العلاج: اطلب الجواب القصير بعد كل سؤال وتصحيح اللفظ بصوت عالٍ."] },
  { head: "٢. verb-ing بعد been مع أفعال الحالة", lines: ["I have been knowing him. ❌ — المصدر (§23). العلاج: كوّن قائمة بأفعال الحالة قبل الدرس ولاحظ V3 لكل فعل."] },
  { head: "٣. since مع مدة", lines: ["since three hours ❌ — المصدر (§31). العلاج: قاعدة «مدة = for · بداية = since»، وتصنيف سريع."] },
  { head: "٤. V2 بعد been", lines: ["been went / been ate ❌. العلاج: بعد been دائمًا verb-ing، وبعد have/has V3."] },
  { head: "٥. نسيان been", lines: ["She has studying ❌. العلاج: اعتبر been «المفتاح» بين have/has وverb-ing، وقطّعها بصوت."] },
  { head: "٦. استخدام PPC مع عدد مكتمل", lines: ["I have been writing five emails ❌ (إذا كان التركيز على العدد). العلاج: five emails = PP."] },
  { head: "٧. تطبيق «لاحظ الكلمة» بلا فكر", lines: ["today تفرض PP؟ recently تفرض PPC؟ ❌ — المعنى هو الذي يحدد (§20)."] },
  { head: "٨. الخلط بين PPC وPast Continuous", lines: ["I have been studying at 8:00 ✗ للحدث الماضي المحدد. العلاج: حرّك نقطة المرجع أمام الطلاب."] },
  { head: "٩. الخلط بين PPC وPast Perfect Continuous", lines: ["I have been studying when she called ✗ — النقطة المرجعية حدث ماضٍ آخر ← had been."] },
  { head: "١٠. تأكيد الانتهاء من PPC", lines: ["I have been reading the book ⇒ «انتهيت» ✗. المصدر (§21): «قد لا أكون انتهيت منه»."] },
];

/** الأخطاء المتعمدة المحفوظة في المصدر — تُعرض في منطقة المعلم كقائمة تدقيق */
export const INTENTIONALLY_WRONG_32: { id: string; wrong: string; right: string; note: string; section: string }[] = [
  { id: "E1", wrong: "Yes, I have been. ❌", right: "Yes, I have. ✅", note: "جواب قصير بـ been", section: "§11" },
  { id: "E2", wrong: "I have been knowing him for ten years. ❌", right: "I have known him for ten years. ✅", note: "فعل حالة", section: "§23" },
  { id: "E3", wrong: "She has been understanding the problem. ❌", right: "She has understood the problem. ✅", note: "فعل حالة (المصدر: عادةً)", section: "§23" },
  { id: "E4", wrong: "She has been study for two hours.", right: "She has been studying for two hours.", note: "verb-ing بعد been", section: "§27 ①" },
  { id: "E5", wrong: "I have been working since three hours.", right: "I have been working for three hours.", note: "مدة مع since", section: "§27 ②" },
  { id: "E6", wrong: "He has been knowing her for years.", right: "He has known her for years.", note: "فعل حالة", section: "§27 ③" },
  { id: "E7", wrong: "Have you been wait long?", right: "Have you been waiting long?", note: "verb-ing بعد been", section: "§27 ④" },
  { id: "E8", wrong: "They has been playing all afternoon.", right: "They have been playing all afternoon.", note: "they ← have", section: "§27 ⑤" },
  { id: "E9", wrong: "She hasn't been sleep well.", right: "She hasn't been sleeping well.", note: "verb-ing بعد been", section: "§27 ⑥" },
  { id: "E10", wrong: "How long has he been work here?", right: "How long has he been working here?", note: "verb-ing بعد been", section: "§27 ⑦" },
  { id: "E11", wrong: "I have been written five emails.", right: "I have written five emails.", note: "عدد مكتمل ← PP", section: "§27 ⑧" },
  { id: "E12", wrong: "I have been studying since three hours. ❌", right: "I have been studying for three hours. ✅", note: "مدة مع since", section: "§31" },
];

/** مؤشرات التدقيق للمعلم حول مفاتيح الأسئلة الصعبة */
export const TEACHER_32_TEST_GUIDE: TeacherNote32[] = [
  { head: "قبل الاختبار", lines: ["اعرض على الطلاب قائمة الأخطاء الاثني عشر، واطلب منهم أن يصنّفوا كل خطأ (verb-ing بعد been، since مع مدة، فعل حالة، ...) قبل أن يشاهدوا التصحيح."] },
  { head: "بعد الاختبار", lines: ["راجع الأسئلة التي اختار فيها الطلاب الجواب الخاطئ بصوت عالٍ، وابدأ بسؤال «هل أهتم بالنتيجة أم بالنشاط؟»."] },
  { head: "سؤال الإعادة", lines: ["إذا كانت الدرجة أقل من 14/20 ابدأ بالخطوات ⑦ و⑮ و㉖ قبل إعادة الاختبار."] },
];

export const TEACHER_32_REMEDIATION: TeacherNote32[] = [
  { head: "إذا خلط الطالب بين PP وPPC", lines: ["اعرض جملتين متشابهتين: «I have painted the room» و«I have been painting the room». اسأل: ما الذي أراه في الأولى؟ وما الذي أراه في الثانية؟"] },
  { head: "إذا لم يفهم for/since", lines: ["ورقة من مسطرة ونقطة: for = طول المسطرة · since = علامة البداية. ضع كل عبارة على الورقة."] },
  { head: "إذا نسي been أو verb-ing", lines: ["اكتب الصيغة على الورق بأربعة مربعات (الفاعل · have/has · been · V-ing) وطلب منه أن يملأها بصوت عالٍ قبل كل جملة."] },
];

/** فهرس المصدر للمعلم: كل قسم مع رقم الخطوة (تُملأ من SLIDES في الواجهة) */
export const TEACHER_32_SOURCE_NOTE = "سجل المصدر الحرفي كامل أدناه — 40 وحدة، منقولة كما وردت. هذا السجل للتدقيق، ولا يُعرض للطالب كنص خام.";
