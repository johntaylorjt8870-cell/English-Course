// ============================================================
// الدرس 31 — Present Perfect · المضارع التام
// 🌉 THE PRESENT BRIDGE — جسر الحاضر
//
// المصدر المورّد هو المرجع الحرفي: لا اختصار ولا إعادة صياغة ولا حذف.
// كل سطر من المصدر مسجَّل في SOURCE_SECTIONS (45 قسمًا مرقّمًا ①–㊺
// + 5 أقسام غير مرقّمة: الغلاف، الافتتاح، الأهداف، لوحة Past Simple vs
// Present Perfect، وخريطة المنهج) — والسجل مرجع تدقيق فقط ولا يُعرض كنص خام.
//
// العرض الفعلي مبني من مكوّنات دلالية تفاعلية في Lesson31.tsx،
// والفحص الآلي (scripts/audit-lesson31.mjs) يتحقق من التغطية والتفاعل.
// ============================================================

export const LESSON_TITLE_31 = "الدرس 31: Present Perfect — المضارع التام";
export const LESSON_SUBTITLE_31 = "🌉 IQ200 — الماضي المرتبط بالحاضر: الفكرة التي تجعل Present Perfect مختلفًا عن Past Simple";
export const LAB_NAME_31 = "THE PRESENT BRIDGE";
export const LAB_MOTTO_31 = "⏮ Past event → 🌉 bridge → NOW · الماضي + ارتباط بالحاضر = Present Perfect";

export type Tone31 = "neutral" | "en" | "good" | "bad" | "warn" | "head" | "subhead";

// ============================================================
// سجل المصدر (Source Ledger) — كل قسم = عنوانه من المصدر + وحداته الحرفية.
// ============================================================
export type SourceSection31 = {
  id: string;
  num?: number;
  title: string;
  /** وحدات حرفية من المصدر — كل سطر كما هو (بدون **). */
  units: string[];
};

export const SOURCE_SECTIONS: SourceSection31[] = [
  {
    id: "cover",
    title: "الغلاف — الدرس 31: Present Perfect — المضارع التام",
    units: ["الدرس 31: Present Perfect — المضارع التام"],
  },
  {
    id: "opening",
    title: "الافتتاح — نكمل من الدرس 30 ونبني على V3",
    units: [
      "نكمل مباشرة من الدرس 30، وندخل الآن إلى المرحلة الجديدة: المضارع التام.",
      "بما أننا شرحنا V3 في الماضي التام، لن نعيد شرح الأساس من الصفر، بل سنبني عليه ونركز على الفكرة التي تجعل Present Perfect مختلفًا عن Past Simple.",
    ],
  },
  {
    id: "objectives",
    title: "🎯 أهداف الدرس",
    units: [
      "بنهاية الدرس يجب أن تكون قادرًا على:",
      "① فهم معنى Present Perfect الحقيقي، وليس فقط حفظ have/has + V3.",
      "② تكوين الجملة المثبتة والمنفية والاستفهامية.",
      "③ استخدام have و has بشكل صحيح.",
      "④ استخدام V3 بعد have/has.",
      "⑤ فهم كلمات مثل:",
      "ever, never, already, just, yet, recently, lately, so far, since, for",
      "⑥ التمييز بين:",
      "Present Perfect",
      "Past Simple",
      "Past Perfect",
      "⑦ معرفة متى يكون الحدث الماضي مرتبطًا بالحاضر.",
      "⑧ اكتشاف الأخطاء التي تبدو صحيحة للوهلة الأولى.",
      "⑨ التعامل مع جمل IQ200 تجمع أكثر من زمن.",
    ],
  },
  {
    id: "s1",
    num: 1,
    title: "① 🧠 ما هو Present Perfect؟",
    units: [
      "Present Perfect = المضارع التام",
      "الصيغة الأساسية:",
      "Subject + have/has + V3",
      "مثال:",
      "I have finished my homework.",
      "المعنى الأساسي:",
      "لقد أنهيت واجبي.",
      "لكن انتبه!",
      "Present Perfect لا يعني ببساطة:",
      "\"حدث شيء في الماضي.\"",
      "لأن Past Simple أيضًا يتحدث عن الماضي.",
      "الفكرة الأهم هي:",
      "الماضي + ارتباط بالحاضر",
      "أي أن الحدث حدث قبل الآن، لكن نتيجته أو خبرته أو علاقته بالحاضر مهمة الآن.",
    ],
  },
  {
    id: "s2",
    num: 2,
    title: "② ⭐ لماذا اسمه Present Perfect؟",
    units: [
      "لأننا نتحدث عن شيء حدث قبل الآن، ولكننا ننظر إليه من نقطة الحاضر.",
      "تخيل الخط الزمني:",
      "الماضي ─────── X ───────── NOW",
      "X = حدث في الماضي",
      "لكننا الآن نهتم بالنتيجة أو الخبرة أو العلاقة بين X و NOW.",
      "مثال:",
      "I have lost my keys.",
      "المعنى:",
      "لقد أضعت مفاتيحي.",
      "لم أقل متى أضعتها.",
      "لكن المشكلة مهمة الآن:",
      "المفاتيح ليست معي الآن.",
      "لذلك نستخدم Present Perfect.",
    ],
  },
  {
    id: "s3",
    num: 3,
    title: "③ 🧩 have أم has؟",
    units: [
      "هذه نقطة أساسية جدًا.",
      "I → have",
      "You → have",
      "We → have",
      "They → have",
      "He → has",
      "She → has",
      "It → has",
      "إذن:",
      "I have",
      "You have",
      "We have",
      "They have",
      "He has",
      "She has",
      "It has",
      "أمثلة:",
      "I have finished.",
      "You have finished.",
      "We have finished.",
      "They have finished.",
      "He has finished.",
      "She has finished.",
      "It has stopped.",
    ],
  },
  {
    id: "s4",
    num: 4,
    title: "④ 🧠 ماذا يأتي بعد have/has؟",
    units: [
      "بعد have أو has نستخدم:",
      "V3 = Past Participle",
      "وقد تعلمنا V3 في الدرس 27.",
      "مثال:",
      "go → went → gone",
      "eat → ate → eaten",
      "see → saw → seen",
      "write → wrote → written",
      "take → took → taken",
      "break → broke → broken",
      "finish → finished → finished",
      "play → played → played",
      "لذلك:",
      "I have gone.",
      "She has eaten.",
      "They have seen it.",
      "He has written a letter.",
      "We have finished the project.",
      "وليس:",
      "I have went. ❌",
      "She has ate. ❌",
      "They have saw. ❌",
      "He has wrote. ❌",
    ],
  },
  {
    id: "s5",
    num: 5,
    title: "⑤ 🏗️ الجملة المثبتة",
    units: [
      "القاعدة:",
      "Subject + have/has + V3",
      "أمثلة جديدة:",
      "I have cleaned my room.",
      "She has opened the window.",
      "They have built a small robot.",
      "He has forgotten his password.",
      "We have finished the project.",
      "The dog has eaten its food.",
      "لاحظ:",
      "He has forgotten...",
      "وليس:",
      "He has forgot...",
      "لأن بعد has نحتاج V3:",
      "forget → forgot → forgotten",
    ],
  },
  {
    id: "s6",
    num: 6,
    title: "⑥ 🔥 أول استخدام: التجربة في الحياة",
    units: [
      "نستخدم Present Perfect عندما نتحدث عن تجربة حدثت في حياتنا، دون تحديد وقت ماضٍ منتهٍ.",
      "مثال:",
      "I have visited Italy.",
      "المعنى:",
      "لقد زرت إيطاليا.",
      "لا يهمنا متى.",
      "نحن نتحدث عن تجربة في الحياة.",
      "مثال آخر:",
      "She has ridden a horse.",
      "لقد ركبت حصانًا.",
      "They have seen a volcano.",
      "لقد رأوا بركانًا.",
      "He has played chess.",
      "لقد لعب الشطرنج.",
      "We have eaten Japanese food.",
      "لقد أكلنا طعامًا يابانيًا.",
      "لاحظ:",
      "لا نحدد وقتًا معينًا.",
    ],
  },
  {
    id: "s7",
    num: 7,
    title: "⑦ ⚠️ وهنا يظهر الفرق الخطير مع Past Simple",
    units: [
      "قارن:",
      "I visited Italy in 2023.",
      "زرت إيطاليا في عام 2023.",
      "هنا لدينا وقت محدد وانتهى:",
      "in 2023",
      "إذن:",
      "Past Simple",
      "أما:",
      "I have visited Italy.",
      "لقد زرت إيطاليا.",
      "لا يوجد وقت محدد.",
      "نحن نتحدث عن تجربة.",
      "إذن:",
      "Present Perfect",
      "قاعدة ذكية:",
      "وقت ماضٍ محدد ومنتهٍ → Past Simple",
      "تجربة دون وقت محدد → Present Perfect",
    ],
  },
  {
    id: "s8",
    num: 8,
    title: "⑧ 🕵️ Grammar Detective",
    units: [
      "الجملة:",
      "I have visited London in 2022. ❌",
      "لماذا خطأ؟",
      "لأن:",
      "in 2022",
      "وقت ماضٍ محدد ومنتهٍ.",
      "إذن نقول:",
      "I visited London in 2022. ✅",
      "لكن:",
      "I have visited London. ✅",
      "صحيحة لأننا لم نحدد متى.",
    ],
  },
  {
    id: "s9",
    num: 9,
    title: "⑨ ⭐ ever = هل سبق أن...؟",
    units: [
      "ever تعني تقريبًا:",
      "هل سبق أن...؟",
      "وتظهر كثيرًا في الأسئلة.",
      "Have you ever visited Spain?",
      "هل سبق أن زرت إسبانيا؟",
      "Have you ever ridden a horse?",
      "هل سبق أن ركبت حصانًا؟",
      "Has she ever seen snow?",
      "هل سبق أن رأت الثلج؟",
      "Have they ever eaten Korean food?",
      "هل سبق أن أكلوا طعامًا كوريًا؟",
      "النمط:",
      "Have/Has + Subject + ever + V3?",
      "مثال:",
      "Have you ever flown in a helicopter?",
      "Yes, I have.",
      "No, I haven't.",
    ],
  },
  {
    id: "s10",
    num: 10,
    title: "⑩ ⭐ never = لم يسبق أبدًا",
    units: [
      "never تعني:",
      "لم يسبق أبدًا.",
      "مثال:",
      "I have never visited Australia.",
      "لم يسبق لي أن زرت أستراليا.",
      "She has never ridden a motorcycle.",
      "لم يسبق لها أن ركبت دراجة نارية.",
      "He has never eaten sushi.",
      "لم يسبق له أن أكل السوشي.",
      "They have never seen snow.",
      "لم يسبق لهم أن رأوا الثلج.",
      "⚠️ لا نستخدم not مع never.",
      "I have never seen it. ✅",
      "I haven't never seen it. ❌",
      "لأن never تحمل معنى النفي أصلًا.",
    ],
  },
  {
    id: "s11",
    num: 11,
    title: "⑪ 🔥 الاستخدام الثاني: نتيجة موجودة الآن",
    units: [
      "هذا من أهم استخدامات Present Perfect.",
      "مثال:",
      "I have lost my wallet.",
      "لقد أضعت محفظتي.",
      "ما المهم؟",
      "ليس فقط أنني أضعتها.",
      "المهم أن:",
      "المحفظة ليست معي الآن.",
      "مثال آخر:",
      "She has broken her glasses.",
      "لقد كسرت نظارتها.",
      "والنتيجة الآن:",
      "النظارة مكسورة.",
      "مثال:",
      "He has forgotten his keys.",
      "لقد نسي مفاتيحه.",
      "النتيجة الآن:",
      "هو لا يملك مفاتيحه.",
      "مثال:",
      "Someone has opened the door.",
      "لقد فتح شخص ما الباب.",
      "النتيجة:",
      "الباب مفتوح الآن.",
    ],
  },
  {
    id: "pspp",
    title: "📸 Past Simple vs Present Perfect",
    units: [
      "انظر إلى الفرق:",
      "I lost my wallet yesterday.",
      "أضعت محفظتي أمس.",
      "هنا:",
      "yesterday",
      "وقت محدد ومنتهٍ.",
      "Past Simple.",
      "أما:",
      "I have lost my wallet.",
      "لقد أضعت محفظتي.",
      "لا يوجد وقت محدد.",
      "والنتيجة مهمة الآن.",
      "Present Perfect.",
      "احفظ هذا الزوج:",
      "I lost my keys yesterday.",
      "I have lost my keys.",
      "الجملة الأولى تخبرنا:",
      "متى حدث الأمر؟",
      "أمس.",
      "الجملة الثانية تخبرنا:",
      "ما المشكلة الآن؟",
      "المفاتيح مفقودة.",
    ],
  },
  {
    id: "s12",
    num: 12,
    title: "⑫ ⭐ الاستخدام الثالث: شيء حدث مؤخرًا وله علاقة بالحاضر",
    units: [
      "نستخدم Present Perfect مع أحداث حديثة عندما تكون نتيجتها أو علاقتها بالحاضر مهمة.",
      "كلمات مهمة:",
      "just = للتو",
      "already = بالفعل",
      "recently = مؤخرًا",
      "lately = في الآونة الأخيرة",
      "أمثلة:",
      "I have just finished my homework.",
      "لقد أنهيت واجبي للتو.",
      "She has just arrived.",
      "لقد وصلت للتو.",
      "The train has just left.",
      "غادر القطار للتو.",
      "We have recently moved to a new house.",
      "انتقلنا مؤخرًا إلى منزل جديد.",
      "He has recently started a new job.",
      "بدأ مؤخرًا عملًا جديدًا.",
    ],
  },
  {
    id: "s13",
    num: 13,
    title: "⑬ ⭐ already = بالفعل",
    units: [
      "already تعني أن الشيء حدث قبل الوقت المتوقع أو قبل الآن.",
      "مثال:",
      "I have already finished my homework.",
      "لقد أنهيت واجبي بالفعل.",
      "She has already eaten.",
      "لقد أكلت بالفعل.",
      "They have already arrived.",
      "لقد وصلوا بالفعل.",
      "He has already seen the movie.",
      "لقد شاهد الفيلم بالفعل.",
      "غالبًا تأتي:",
      "have/has + already + V3",
      "مثال:",
      "She has already left.",
    ],
  },
  {
    id: "s14",
    num: 14,
    title: "⑭ ⭐ just = للتو",
    units: [
      "النمط الشائع:",
      "have/has + just + V3",
      "مثال:",
      "I have just finished.",
      "She has just arrived.",
      "They have just left.",
      "He has just called me.",
      "The baby has just fallen asleep.",
    ],
  },
  {
    id: "s15",
    num: 15,
    title: "⑮ ⭐ yet = بعد / حتى الآن",
    units: [
      "yet تستخدم كثيرًا في:",
      "الأسئلة",
      "والجمل المنفية.",
      "مثال سؤال:",
      "Have you finished your homework yet?",
      "هل أنهيت واجبك بعد؟",
      "الإجابة:",
      "Yes, I have.",
      "أو:",
      "No, I haven't.",
      "مثال نفي:",
      "I haven't finished my homework yet.",
      "لم أنهِ واجبي بعد.",
      "She hasn't arrived yet.",
      "لم تصل بعد.",
      "They haven't decided yet.",
      "لم يقرروا بعد.",
      "غالبًا تأتي yet في نهاية الجملة.",
    ],
  },
  {
    id: "s16",
    num: 16,
    title: "⑯ 🧠 الفرق بين already و yet",
    units: [
      "already:",
      "حدث الشيء.",
      "I have already eaten.",
      "لقد أكلت بالفعل.",
      "yet:",
      "نسأل هل حدث أم لا، أو نقول إنه لم يحدث حتى الآن.",
      "Have you eaten yet?",
      "هل أكلت بعد؟",
      "I haven't eaten yet.",
      "لم آكل بعد.",
    ],
  },
  {
    id: "s17",
    num: 17,
    title: "⑰ ⭐ الاستخدام الرابع: فترة زمنية لم تنتهِ بعد",
    units: [
      "هذه نقطة مهمة جدًا.",
      "يمكن استخدام Present Perfect مع:",
      "today",
      "this morning",
      "this week",
      "this month",
      "this year",
      "when تكون الفترة الزمنية ما زالت مستمرة.",
      "مثال:",
      "I have drunk three glasses of water today.",
      "شربت ثلاثة أكواب من الماء اليوم.",
      "اليوم لم ينتهِ بعد.",
      "مثال:",
      "She has read two books this month.",
      "لقد قرأت كتابين هذا الشهر.",
      "الشهر ما زال مستمرًا.",
      "مثال:",
      "We have had many tests this year.",
      "لقد أجرينا اختبارات كثيرة هذا العام.",
      "السنة لم تنتهِ بعد.",
      "لكن إذا انتهت الفترة الزمنية، غالبًا نستخدم Past Simple.",
      "مثال:",
      "I visited my uncle last week.",
      "زرت عمي الأسبوع الماضي.",
      "last week انتهت.",
    ],
  },
  {
    id: "s18",
    num: 18,
    title: "⑱ ⚠️ لا تعتمد على كلمة واحدة فقط",
    units: [
      "هذه قاعدة IQ200.",
      "لا تقل:",
      "today = Present Perfect دائمًا.",
      "خطأ.",
      "المعنى والسياق مهمان.",
      "مثلًا:",
      "I have finished two exercises today.",
      "الفترة ما زالت مرتبطة بالحاضر.",
      "لكن يمكن أن نستخدم Past Simple إذا كنا نتحدث عن حدث منتهٍ ضمن سياق محدد:",
      "I finished the test today at 9:00.",
      "هنا نحدد حدثًا معينًا ووقتًا معينًا.",
      "إذن:",
      "الكلمة المساعدة مهمة، لكن المعنى أهم.",
    ],
  },
  {
    id: "s19",
    num: 19,
    title: "⑲ ⭐ for و since مع Present Perfect",
    units: [
      "هنا نصل إلى استخدام مهم جدًا.",
      "for = مدة زمنية",
      "for two hours",
      "for three years",
      "for five days",
      "for a long time",
      "since = نقطة بداية",
      "since Monday",
      "since 2022",
      "since January",
      "since 8:00",
      "قارن:",
      "for three years",
      "منذ ثلاث سنوات / لمدة ثلاث سنوات",
      "since 2023",
      "منذ عام 2023",
    ],
  },
  {
    id: "s20",
    num: 20,
    title: "⑳ 🧩 Present Perfect + for",
    units: [
      "أمثلة:",
      "I have lived here for five years.",
      "أعيش هنا منذ خمس سنوات.",
      "She has studied English for three years.",
      "تدرس الإنجليزية منذ ثلاث سنوات.",
      "They have known each other for a long time.",
      "يعرفون بعضهم منذ وقت طويل.",
      "He has worked here for six months.",
      "يعمل هنا منذ ستة أشهر.",
    ],
  },
  {
    id: "s21",
    num: 21,
    title: "㉑ 🧩 Present Perfect + since",
    units: [
      "أمثلة:",
      "I have lived here since 2021.",
      "أعيش هنا منذ عام 2021.",
      "She has studied English since September.",
      "تدرس الإنجليزية منذ أيلول.",
      "He has worked here since Monday.",
      "يعمل هنا منذ يوم الاثنين.",
      "We have known him since childhood.",
      "نعرفه منذ الطفولة.",
      "لاحظ:",
      "for → مدة",
      "since → نقطة بداية",
    ],
  },
  {
    id: "s22",
    num: 22,
    title: "㉒ 🔥 لماذا نستخدم Present Perfect هنا؟",
    units: [
      "لأن الحالة بدأت في الماضي وما زالت مرتبطة بالحاضر.",
      "مثال:",
      "I have lived here for five years.",
      "البداية:",
      "الماضي",
      "الاستمرار:",
      "──────────────→ NOW",
      "أي:",
      "بدأت في الماضي وما زالت مرتبطة بالحاضر.",
    ],
  },
  {
    id: "s23",
    num: 23,
    title: "㉓ ⭐ النفي",
    units: [
      "القاعدة:",
      "Subject + have/has + not + V3",
      "الاختصارات:",
      "have not → haven't",
      "has not → hasn't",
      "أمثلة:",
      "I haven't finished.",
      "She hasn't arrived.",
      "He hasn't eaten.",
      "We haven't decided.",
      "They haven't seen the movie.",
      "The train hasn't arrived.",
    ],
  },
  {
    id: "s24",
    num: 24,
    title: "㉔ 🧠 الأسئلة Yes/No",
    units: [
      "نضع:",
      "Have/Has",
      "في بداية السؤال.",
      "القاعدة:",
      "Have/Has + Subject + V3?",
      "أمثلة:",
      "Have you finished?",
      "Has she arrived?",
      "Has he eaten?",
      "Have they left?",
      "Have we met before?",
      "Has the teacher arrived?",
    ],
  },
  {
    id: "s25",
    num: 25,
    title: "㉕ ⭐ الإجابات القصيرة",
    units: [
      "Have you finished?",
      "Yes, I have.",
      "No, I haven't.",
      "Has she arrived?",
      "Yes, she has.",
      "No, she hasn't.",
      "Have they eaten?",
      "Yes, they have.",
      "No, they haven't.",
      "Has he seen this movie?",
      "Yes, he has.",
      "No, he hasn't.",
    ],
  },
  {
    id: "s26",
    num: 26,
    title: "㉖ 🧠 Wh Questions",
    units: [
      "يمكننا استخدام:",
      "What",
      "Where",
      "Why",
      "Who",
      "How many",
      "How long",
      "مثال:",
      "What have you done?",
      "ماذا فعلت؟",
      "Where has she gone?",
      "إلى أين ذهبت؟",
      "Why have they left?",
      "لماذا غادروا؟",
      "Who has taken my notebook?",
      "من أخذ دفتري؟",
      "How many books have you read?",
      "كم كتابًا قرأت؟",
      "How long have you lived here?",
      "منذ متى وأنت تعيش هنا؟",
    ],
  },
  {
    id: "s27",
    num: 27,
    title: "㉗ 🔥 السؤال العبقري: How long?",
    units: [
      "How long = منذ متى / كم من الوقت؟",
      "مثال:",
      "How long have you lived here?",
      "منذ متى وأنت تعيش هنا؟",
      "الإجابة:",
      "I have lived here for six years.",
      "أو:",
      "I have lived here since 2020.",
      "لاحظ:",
      "How long + Present Perfect",
      "ثم:",
      "for + مدة",
      "since + بداية",
    ],
  },
  {
    id: "s28",
    num: 28,
    title: "㉘ ⚔️ Present Perfect vs Past Simple",
    units: [
      "هذه أهم مقارنة في الدرس.",
      "① Past Simple",
      "يركز على:",
      "حدث انتهى في الماضي.",
      "وغالبًا نعرف متى حدث.",
      "مثال:",
      "I watched that movie last night.",
      "شاهدت ذلك الفيلم ليلة أمس.",
      "② Present Perfect",
      "يركز على:",
      "التجربة أو النتيجة أو العلاقة بالحاضر.",
      "مثال:",
      "I have watched that movie.",
      "لقد شاهدت ذلك الفيلم.",
      "الفرق:",
      "I watched that movie last night.",
      "متى؟",
      "last night.",
      "I have watched that movie.",
      "هل شاهدته من قبل؟",
      "نعم.",
    ],
  },
  {
    id: "s29",
    num: 29,
    title: "㉙ 🔥 مقارنة ثلاثية: Past Simple / Present Perfect / Past Perfect",
    units: [
      "هنا نرفع المستوى.",
      "I saw the museum yesterday.",
      "رأيت المتحف أمس.",
      "Past Simple",
      "حدث ماضٍ محدد.",
      "I have seen the museum.",
      "لقد رأيت المتحف.",
      "Present Perfect",
      "تجربة مرتبطة بالحاضر.",
      "I had seen the museum before we entered the city.",
      "كنت قد رأيت المتحف قبل أن ندخل المدينة.",
      "Past Perfect",
      "حدث وقع قبل حدث ماضٍ آخر.",
      "إذن:",
      "Past Simple",
      "= حدث ماضٍ",
      "Present Perfect",
      "= ماضٍ مرتبط بالحاضر",
      "Past Perfect",
      "= ماضٍ حدث قبل ماضٍ آخر",
    ],
  },
  {
    id: "s30",
    num: 30,
    title: "㉚ 🧠 خط زمني خارق",
    units: [
      "تخيل:",
      "PAST NOW",
      "Present Perfect",
      "حدث قبل الآن وله علاقة بالحاضر",
      "أما:",
      "PAST NOW",
      "earlier later",
      "past past",
      "X = Past Perfect",
      "Y = Past Simple",
      "مثال:",
      "The movie had started before we arrived.",
      "الفيلم بدأ أولًا.",
      "ثم:",
      "وصلنا.",
    ],
  },
  {
    id: "s31",
    num: 31,
    title: "㉛ 🚨 خطأ شهير جدًا",
    units: [
      "I have seen him yesterday. ❌",
      "لماذا؟",
      "لأن:",
      "yesterday",
      "وقت ماضٍ محدد ومنتهٍ.",
      "الصحيح:",
      "I saw him yesterday. ✅",
      "لكن:",
      "I have seen him before. ✅",
      "لم نحدد وقتًا معينًا.",
    ],
  },
  {
    id: "s32",
    num: 32,
    title: "㉜ 🚨 خطأ آخر",
    units: [
      "She has went home. ❌",
      "بعد has نحتاج V3.",
      "go → went → gone",
      "إذن:",
      "She has gone home. ✅",
    ],
  },
  {
    id: "s33",
    num: 33,
    title: "㉝ 🚨 خطأ ثالث",
    units: [
      "Did you have finished your homework? ❌",
      "لا نستخدم did مع Present Perfect.",
      "الصحيح:",
      "Have you finished your homework? ✅",
    ],
  },
  {
    id: "s34",
    num: 34,
    title: "㉞ 🚨 خطأ رابع",
    units: [
      "He doesn't have finished. ❌",
      "هذه خلط بين Present Simple وPresent Perfect.",
      "الصحيح:",
      "He hasn't finished. ✅",
    ],
  },
  {
    id: "s35",
    num: 35,
    title: "㉟ 🕵️ Grammar Detective",
    units: [
      "اكتشف الخطأ وصححه:",
      "① She has went to school.",
      "② I have seen him yesterday.",
      "③ Did you have eaten breakfast?",
      "④ He hasn't never visited Paris.",
      "⑤ They has finished the project.",
      "⑥ Have she arrived?",
      "⑦ I have lived here since five years.",
      "⑧ She has worked here for 2022.",
      "فكر قبل أن تنظر للحلول.",
      "الحلول:",
      "① She has gone to school.",
      "② I saw him yesterday.",
      "③ Have you eaten breakfast?",
      "④ He has never visited Paris.",
      "⑤ They have finished the project.",
      "⑥ Has she arrived?",
      "⑦ I have lived here for five years.",
      "⑧ She has worked here since 2022.",
    ],
  },
  {
    id: "s36",
    num: 36,
    title: "㊱ 🧠 تحدي الاختيار الذكي",
    units: [
      "اختر Present Perfect أو Past Simple:",
      "① I ______ my homework yesterday.",
      "(finish)",
      "② I ______ my homework already.",
      "(finish)",
      "③ Sara ______ to Turkey in 2024.",
      "(travel)",
      "④ Sara ______ to Turkey before.",
      "(travel)",
      "⑤ We ______ this problem last night.",
      "(solve)",
      "⑥ We ______ this problem already.",
      "(solve)",
      "⑦ He ______ his phone two days ago.",
      "(lose)",
      "⑧ He ______ his phone.",
      "(lose)",
      "الحلول:",
      "① finished",
      "② have finished",
      "③ traveled",
      "④ has traveled",
      "⑤ solved",
      "⑥ have solved",
      "⑦ lost",
      "⑧ has lost",
      "لاحظ كيف تغير المعنى.",
    ],
  },
  {
    id: "s37",
    num: 37,
    title: "㊲ 🔥 IQ200 — هل تستطيع اكتشاف المعنى؟",
    units: [
      "قارن:",
      "A:",
      "Maya lost her passport.",
      "B:",
      "Maya has lost her passport.",
      "ما الفرق؟",
      "A:",
      "نحن نخبر عن حدث في الماضي.",
      "B:",
      "هناك نتيجة مهمة الآن.",
      "ربما جواز السفر ما زال مفقودًا.",
      "الآن:",
      "A:",
      "Daniel went to the library.",
      "B:",
      "Daniel has gone to the library.",
      "لاحظ:",
      "went = ذهب، ونحن نخبر عن حدث ماضٍ.",
      "has gone = ذهب، وهناك علاقة بالحاضر؛ غالبًا هو موجود هناك الآن أو لم يعد بعد.",
      "هذه ليست مجرد قاعدة زمن.",
      "إنها اختلاف في \"زاوية النظر\" إلى الحدث.",
    ],
  },
  {
    id: "s38",
    num: 38,
    title: "㊳ 🧠 تحدي أعمق",
    units: [
      "اختر الجملة الأنسب حسب المعنى:",
      "الموقف:",
      "صديقك يسألك:",
      "\"هل سبق أن ركبت طائرة؟\"",
      "الإجابة:",
      "I have flown on a plane. ✅",
      "لماذا؟",
      "لأننا نتحدث عن تجربة.",
      "أما:",
      "I flew on a plane in 2022. ✅",
      "فهي صحيحة أيضًا، لكننا هنا نتحدث عن حدث محدد في عام 2022.",
      "إذن الجملتان ممكنتان، لكن المعنى مختلف.",
    ],
  },
  {
    id: "s39",
    num: 39,
    title: "㊴ 🏆 Boss Challenge",
    units: [
      "اقرأ النص:",
      "Lina has always loved science. She has visited several science museums, and she has recently started a robotics project at school. Last year, she joined a science club and built a small solar-powered car. This year, she has already completed two robotics projects.",
      "حدد الأزمنة:",
      "has always loved",
      "→ Present Perfect",
      "has visited",
      "→ Present Perfect",
      "has recently started",
      "→ Present Perfect",
      "joined",
      "→ Past Simple",
      "built",
      "→ Past Simple",
      "has already completed",
      "→ Present Perfect",
      "لماذا؟",
      "لأن:",
      "last year",
      "→ فترة ماضية منتهية",
      "أما:",
      "this year",
      "→ الفترة ما زالت مرتبطة بالحاضر",
    ],
  },
  {
    id: "s40",
    num: 40,
    title: "㊵ 🚀 IQ200 — حوّل الجملة",
    units: [
      "الجملة:",
      "I visited Japan in 2021.",
      "حوّلها إلى Present Perfect، مع تغيير المعنى بشكل صحيح.",
      "الإجابة:",
      "I have visited Japan.",
      "لكن لاحظ:",
      "لقد حذفنا:",
      "in 2021",
      "لأن Present Perfect الأساسي لا نستخدمه مع وقت ماضٍ محدد ومنتهٍ مثل:",
      "yesterday",
      "last year",
      "in 2021",
      "two days ago",
    ],
  },
  {
    id: "s41",
    num: 41,
    title: "㊶ 🧩 تحدي for / since",
    units: [
      "اختر:",
      "for أو since",
      "① I have lived here ______ 2020.",
      "② She has studied English ______ four years.",
      "③ We have known him ______ childhood.",
      "④ He has worked there ______ six months.",
      "⑤ They have been friends ______ 2018.",
      "الحلول:",
      "① since",
      "② for",
      "③ since",
      "④ for",
      "⑤ since",
      "قاعدة الذهب:",
      "for + مدة",
      "since + بداية",
    ],
  },
  {
    id: "s42",
    num: 42,
    title: "㊷ 🔥 تحدي نهائي",
    units: [
      "أكمل الجمل:",
      "① I have never ______.",
      "② I have already ______.",
      "③ I have just ______.",
      "④ I haven't ______ yet.",
      "⑤ Have you ever ______?",
      "⑥ I have lived ______ for ______.",
      "⑦ I have studied ______ since ______.",
      "اكتب إجابات حقيقية من عندك.",
      "هنا أنت لا تحفظ القاعدة فقط.",
      "أنت تبدأ باستخدامها.",
    ],
  },
  {
    id: "s43",
    num: 43,
    title: "㊸ 🏆 Final Boss — أربع جمل، أربعة معانٍ",
    units: [
      "قارن:",
      "① I ate the cake.",
      "② I was eating the cake.",
      "③ I had eaten the cake before they arrived.",
      "④ I have eaten the cake.",
      "الفرق:",
      "① Past Simple",
      "أكلت الكعكة. حدث ماضٍ.",
      "② Past Continuous",
      "كنت آكل الكعكة. الفعل كان جاريًا في لحظة ماضية.",
      "③ Past Perfect",
      "كنت قد أكلت الكعكة قبل وصولهم.",
      "④ Present Perfect",
      "لقد أكلت الكعكة، وهناك علاقة بالحاضر.",
      "لاحظ كيف أصبحت الأزمنة الآن نظامًا واحدًا.",
    ],
  },
  {
    id: "s44",
    num: 44,
    title: "㊹ 🧠 الخريطة الكبرى التي يجب أن تحفظها",
    units: [
      "📸 Past Simple",
      "حدث ماضٍ انتهى.",
      "I visited Rome in 2022.",
      "🎥 Past Continuous",
      "شيء كان يحدث في لحظة ماضية.",
      "I was visiting Rome at 5:00.",
      "⏪ Past Perfect",
      "شيء حدث قبل حدث ماضٍ آخر.",
      "I had visited Rome before I moved there.",
      "🌉 Present Perfect",
      "شيء حدث قبل الآن وله علاقة بالحاضر.",
      "I have visited Rome.",
    ],
  },
  {
    id: "s45",
    num: 45,
    title: "㊺ ⭐ ملخص الدرس 31",
    units: [
      "Present Perfect:",
      "Subject + have/has + V3",
      "I/You/We/They → have",
      "He/She/It → has",
      "أهم الاستخدامات:",
      "① التجارب:",
      "I have visited Spain.",
      "② النتيجة الحالية:",
      "I have lost my keys.",
      "③ الأحداث الحديثة:",
      "She has just arrived.",
      "④ فترة لم تنتهِ:",
      "I have studied a lot this week.",
      "⑤ حالة بدأت في الماضي وما زالت مرتبطة بالحاضر:",
      "I have lived here for five years.",
      "الكلمات المهمة:",
      "ever = هل سبق",
      "never = لم يسبق أبدًا",
      "already = بالفعل",
      "just = للتو",
      "yet = بعد / حتى الآن",
      "recently = مؤخرًا",
      "lately = في الآونة الأخيرة",
      "so far = حتى الآن",
      "for = مدة",
      "since = نقطة بداية",
      "والقاعدة الذهبية:",
      "Present Perfect لا نستخدمه عادةً مع وقت ماضٍ محدد ومنتهٍ.",
      "I saw him yesterday. ✅",
      "I have seen him before. ✅",
      "I have seen him yesterday. ❌",
    ],
  },
  {
    id: "map",
    title: "🗺️ خريطة المنهج حتى الآن",
    units: [
      "Present:",
      "① Present Simple",
      "② Present Continuous",
      "③ Present Perfect ← نحن هنا",
      "Past:",
      "④ Past Simple",
      "⑤ Past Continuous",
      "⑥ Past Perfect",
      "⑦ Past Perfect Continuous",
      "وبعد تثبيت Present Perfect سننتقل إلى:",
      "Present Perfect Continuous",
      "ثم نبدأ منظومة المستقبل:",
      "Future Simple",
      "be going to",
      "Future Continuous",
      "Future Perfect",
      "Future Perfect Continuous",
      "🔥 الدرس 31 مهم جدًا لأنه أول مرة نبدأ فيها بفهم فكرة \"الماضي المرتبط بالحاضر\"، وليس مجرد حفظ شكل الزمن.",
    ],
  },
];

export const SOURCE_NUMBERED_COUNT = 45;
export const SOURCE_LEDGER_COUNT = SOURCE_SECTIONS.length;

export const SEC: Record<string, number> = SOURCE_SECTIONS.reduce<Record<string, number>>(
  (acc, s, i) => {
    acc[s.id] = i;
    return acc;
  },
  {}
);

export function unitsOf(id: string): string[] {
  return SOURCE_SECTIONS[SEC[id]].units;
}

// ============================================================
// بوابة الزمن المزدوجة (أداة الدرس البصرية): ماضٍ ← جسر ← NOW
// ============================================================
export const BRIDGE_STEPS_31 = [
  { id: "past", emoji: "⏮", ar: "الحدث وقع قبل الآن", en: "The event happened before now" },
  { id: "link", emoji: "🌉", ar: "ارتباط بالحاضر: نتيجة / خبرة / استمرار", en: "A link to now: result / experience / continuation" },
  { id: "now", emoji: "⏺", ar: "ننظر إليه من نقطة الحاضر", en: "We look at it from NOW" },
] as const;

// ============================================================
// ③ have أم has — الجدول الحرفي من المصدر + أمثلته
// ============================================================
export type HaveHasRow31 = { subj: string; helper: "have" | "has"; example: string; ar: string };
export const HAVE_HAS_31: HaveHasRow31[] = [
  { subj: "I", helper: "have", example: "I have finished.", ar: "لقد أنهيت." },
  { subj: "You", helper: "have", example: "You have finished.", ar: "لقد أنهيتَ." },
  { subj: "We", helper: "have", example: "We have finished.", ar: "لقد أنهينا." },
  { subj: "They", helper: "have", example: "They have finished.", ar: "لقد أنهوا." },
  { subj: "He", helper: "has", example: "He has finished.", ar: "لقد أنهى." },
  { subj: "She", helper: "has", example: "She has finished.", ar: "لقد أنهت." },
  { subj: "It", helper: "has", example: "It has stopped.", ar: "لقد توقف." },
];

// ============================================================
// ④ V3 — سلسلة المصدر (base → V2 → V3) + الأخطاء الأربعة
// ============================================================
export type V3Row31 = { base: string; v2: string; v3: string; ar: string };
export const V3_CHART_31: V3Row31[] = [
  { base: "go", v2: "went", v3: "gone", ar: "يذهب" },
  { base: "eat", v2: "ate", v3: "eaten", ar: "يأكل" },
  { base: "see", v2: "saw", v3: "seen", ar: "يرى" },
  { base: "write", v2: "wrote", v3: "written", ar: "يكتب" },
  { base: "take", v2: "took", v3: "taken", ar: "يأخذ" },
  { base: "break", v2: "broke", v3: "broken", ar: "يكسر" },
  { base: "finish", v2: "finished", v3: "finished", ar: "ينهي" },
  { base: "play", v2: "played", v3: "played", ar: "يلعب" },
];

export const V3_SENTENCES_31 = [
  { en: "I have gone.", ar: "لقد ذهبت." },
  { en: "She has eaten.", ar: "لقد أكلت." },
  { en: "They have seen it.", ar: "لقد رأوه." },
  { en: "He has written a letter.", ar: "لقد كتب رسالة." },
  { en: "We have finished the project.", ar: "لقد أنهينا المشروع." },
];

export const V3_WRONG_31 = [
  { wrong: "I have went.", right: "I have gone.", why: "go → went → gone — بعد have نستخدم V3 لا V2." },
  { wrong: "She has ate.", right: "She has eaten.", why: "eat → ate → eaten — بعد has نستخدم V3 لا V2." },
  { wrong: "They have saw.", right: "They have seen.", why: "see → saw → seen — بعد have نستخدم V3 لا V2." },
  { wrong: "He has wrote.", right: "He has written.", why: "write → wrote → written — بعد has نستخدم V3 لا V2." },
];

// ============================================================
// ⑤ الجملة المثبتة — أمثلة المصدر الجديدة
// ============================================================
export const POSITIVE_31 = [
  { en: "I have cleaned my room.", ar: "لقد نظّفت غرفتي.", chunks: ["I", "have", "cleaned", "my room."] },
  { en: "She has opened the window.", ar: "لقد فتحت النافذة.", chunks: ["She", "has", "opened", "the window."] },
  { en: "They have built a small robot.", ar: "لقد بنوا روبوتًا صغيرًا.", chunks: ["They", "have", "built", "a small robot."] },
  { en: "He has forgotten his password.", ar: "لقد نسي كلمة المرور.", chunks: ["He", "has", "forgotten", "his password."] },
  { en: "We have finished the project.", ar: "لقد أنهينا المشروع.", chunks: ["We", "have", "finished", "the project."] },
  { en: "The dog has eaten its food.", ar: "لقد أكل الكلب طعامه.", chunks: ["The dog", "has", "eaten", "its food."] },
];

// ============================================================
// ⑥ التجربة في الحياة — أمثلة المصدر
// ============================================================
export const EXPERIENCE_31 = [
  { en: "I have visited Italy.", ar: "لقد زرت إيطاليا." },
  { en: "She has ridden a horse.", ar: "لقد ركبت حصانًا." },
  { en: "They have seen a volcano.", ar: "لقد رأوا بركانًا." },
  { en: "He has played chess.", ar: "لقد لعب الشطرنج." },
  { en: "We have eaten Japanese food.", ar: "لقد أكلنا طعامًا يابانيًا." },
];

// ============================================================
// ⑦ الفرق الخطير — زوج المقارنة
// ============================================================
export const CONTRAST_31 = [
  { en: "I visited Italy in 2023.", ar: "زرت إيطاليا في عام 2023.", tense: "Past Simple", cue: "in 2023" },
  { en: "I have visited Italy.", ar: "لقد زرت إيطاليا.", tense: "Present Perfect", cue: "لا يوجد وقت محدد" },
];

// ============================================================
// ⑨ ever — الأسئلة الحرفية
// ============================================================
export const EVER_31 = [
  { en: "Have you ever visited Spain?", ar: "هل سبق أن زرت إسبانيا؟" },
  { en: "Have you ever ridden a horse?", ar: "هل سبق أن ركبت حصانًا؟" },
  { en: "Has she ever seen snow?", ar: "هل سبق أن رأت الثلج؟" },
  { en: "Have they ever eaten Korean food?", ar: "هل سبق أن أكلوا طعامًا كوريًا؟" },
];

export const EVER_EXTRA_31 = {
  en: "Have you ever flown in a helicopter?",
  yes: "Yes, I have.",
  no: "No, I haven't.",
};

// ============================================================
// ⑩ never — الأمثلة الحرفية + فخّ not
// ============================================================
export const NEVER_31 = [
  { en: "I have never visited Australia.", ar: "لم يسبق لي أن زرت أستراليا." },
  { en: "She has never ridden a motorcycle.", ar: "لم يسبق لها أن ركبت دراجة نارية." },
  { en: "He has never eaten sushi.", ar: "لم يسبق له أن أكل السوشي." },
  { en: "They have never seen snow.", ar: "لم يسبق لهم أن رأوا الثلج." },
];

export const NEVER_TRAP_31 = { right: "I have never seen it.", wrong: "I haven't never seen it." };

// ============================================================
// ⑪ النتيجة موجودة الآن — كل جملة ونتيجتها
// ============================================================
export const RESULT_31 = [
  { en: "I have lost my wallet.", ar: "لقد أضعت محفظتي.", result: "المحفظة ليست معي الآن." },
  { en: "She has broken her glasses.", ar: "لقد كسرت نظارتها.", result: "النظارة مكسورة الآن." },
  { en: "He has forgotten his keys.", ar: "لقد نسي مفاتيحه.", result: "هو لا يملك مفاتيحه الآن." },
  { en: "Someone has opened the door.", ar: "لقد فتح شخص ما الباب.", result: "الباب مفتوح الآن." },
];

// ============================================================
// 📸 لوحة Past Simple vs Present Perfect (زوج الحفظ)
// ============================================================
export const PAIR_LOST_31 = [
  { en: "I lost my keys yesterday.", question: "متى حدث الأمر؟", answer: "أمس (yesterday).", tense: "Past Simple" },
  { en: "I have lost my keys.", question: "ما المشكلة الآن؟", answer: "المفاتيح مفقودة.", tense: "Present Perfect" },
];

export const PAIR_WALLET_31 = [
  { en: "I lost my wallet yesterday.", ar: "أضعت محفظتي أمس.", cue: "yesterday", tense: "Past Simple" },
  { en: "I have lost my wallet.", ar: "لقد أضعت محفظتي.", cue: "لا يوجد وقت محدد — والنتيجة مهمة الآن.", tense: "Present Perfect" },
];

// ============================================================
// ⑫ الأحداث الحديثة: just / already / recently / lately
// ============================================================
export const RECENT_WORDS_31 = [
  { word: "just", ar: "للتو" },
  { word: "already", ar: "بالفعل" },
  { word: "recently", ar: "مؤخرًا" },
  { word: "lately", ar: "في الآونة الأخيرة" },
];

export const RECENT_31 = [
  { en: "I have just finished my homework.", ar: "لقد أنهيت واجبي للتو.", word: "just" },
  { en: "She has just arrived.", ar: "لقد وصلت للتو.", word: "just" },
  { en: "The train has just left.", ar: "غادر القطار للتو.", word: "just" },
  { en: "We have recently moved to a new house.", ar: "انتقلنا مؤخرًا إلى منزل جديد.", word: "recently" },
  { en: "He has recently started a new job.", ar: "بدأ مؤخرًا عملًا جديدًا.", word: "recently" },
];

// ============================================================
// ⑬ already — الأمثلة والموضع
// ============================================================
export const ALREADY_31 = [
  { en: "I have already finished my homework.", ar: "لقد أنهيت واجبي بالفعل." },
  { en: "She has already eaten.", ar: "لقد أكلت بالفعل." },
  { en: "They have already arrived.", ar: "لقد وصلوا بالفعل." },
  { en: "He has already seen the movie.", ar: "لقد شاهد الفيلم بالفعل." },
  { en: "She has already left.", ar: "لقد غادرت بالفعل." },
];

// ============================================================
// ⑭ just — الأمثلة الحرفية
// ============================================================
export const JUST_31 = [
  { en: "I have just finished.", ar: "لقد أنهيت للتو." },
  { en: "She has just arrived.", ar: "لقد وصلت للتو." },
  { en: "They have just left.", ar: "لقد غادروا للتو." },
  { en: "He has just called me.", ar: "لقد اتصل بي للتو." },
  { en: "The baby has just fallen asleep.", ar: "لقد نام الطفل للتو." },
];

// ============================================================
// ⑮ yet — الأسئلة والنفي
// ============================================================
export const YET_QUESTION_31 = {
  en: "Have you finished your homework yet?",
  ar: "هل أنهيت واجبك بعد؟",
  yes: "Yes, I have.",
  no: "No, I haven't.",
};

export const YET_NEGATIVE_31 = [
  { en: "I haven't finished my homework yet.", ar: "لم أنهِ واجبي بعد." },
  { en: "She hasn't arrived yet.", ar: "لم تصل بعد." },
  { en: "They haven't decided yet.", ar: "لم يقرروا بعد." },
];

// ============================================================
// ⑯ already أم yet
// ============================================================
export const ALREADY_VS_YET_31 = [
  { id: "a1", en: "I have already eaten.", bucket: "already", ar: "لقد أكلت بالفعل. — حدث الشيء." },
  { id: "y1", en: "Have you eaten yet?", bucket: "yet", ar: "هل أكلت بعد؟ — نسأل هل حدث أم لا." },
  { id: "y2", en: "I haven't eaten yet.", bucket: "yet", ar: "لم آكل بعد. — لم يحدث حتى الآن." },
  { id: "a2", en: "They have already arrived.", bucket: "already", ar: "لقد وصلوا بالفعل. — قبل الوقت المتوقع." },
];

// ============================================================
// ⑰ الفترة الزمنية التي لم تنتهِ بعد
// ============================================================
export const PERIODS_31 = ["today", "this morning", "this week", "this month", "this year"];
export const PERIOD_EXAMPLES_31 = [
  { en: "I have drunk three glasses of water today.", ar: "شربت ثلاثة أكواب من الماء اليوم.", note: "اليوم لم ينتهِ بعد." },
  { en: "She has read two books this month.", ar: "لقد قرأت كتابين هذا الشهر.", note: "الشهر ما زال مستمرًا." },
  { en: "We have had many tests this year.", ar: "لقد أجرينا اختبارات كثيرة هذا العام.", note: "السنة لم تنتهِ بعد." },
];

export const PERIODS_CLOSED_31 = { en: "I visited my uncle last week.", ar: "زرت عمي الأسبوع الماضي.", note: "last week انتهت." };

// ============================================================
// ⑱ لا تعتمد على كلمة واحدة فقط — ثنائية اليوم
// ============================================================
export const TODAY_PAIR_31 = [
  { en: "I have finished two exercises today.", ar: "الفترة ما زالت مرتبطة بالحاضر.", tense: "Present Perfect" },
  { en: "I finished the test today at 9:00.", ar: "هنا نحدد حدثًا معينًا ووقتًا معينًا.", tense: "Past Simple" },
];

// ============================================================
// ⑲ for و since — التصنيف والذخيرة
// ============================================================
export const FOR_LIST_31 = ["for two hours", "for three years", "for five days", "for a long time"];
export const SINCE_LIST_31 = ["since Monday", "since 2022", "since January", "since 8:00"];
export const FORSINCE_CLASSIFY_31 = [
  { item: "for two hours", kind: "for", ar: "مدة زمنية" },
  { item: "since Monday", kind: "since", ar: "نقطة بداية" },
  { item: "since January", kind: "since", ar: "نقطة بداية" },
  { item: "for five days", kind: "for", ar: "مدة زمنية" },
  { item: "for a long time", kind: "for", ar: "مدة زمنية" },
  { item: "since 8:00", kind: "since", ar: "نقطة بداية" },
];

// ============================================================
// ⑳ +for  ·  ㉑ +since
// ============================================================
export const FOR_SENTENCES_31 = [
  { en: "I have lived here for five years.", ar: "أعيش هنا منذ خمس سنوات." },
  { en: "She has studied English for three years.", ar: "تدرس الإنجليزية منذ ثلاث سنوات." },
  { en: "They have known each other for a long time.", ar: "يعرفون بعضهم منذ وقت طويل." },
  { en: "He has worked here for six months.", ar: "يعمل هنا منذ ستة أشهر." },
];

export const SINCE_SENTENCES_31 = [
  { en: "I have lived here since 2021.", ar: "أعيش هنا منذ عام 2021." },
  { en: "She has studied English since September.", ar: "تدرس الإنجليزية منذ أيلول." },
  { en: "He has worked here since Monday.", ar: "يعمل هنا منذ يوم الاثنين." },
  { en: "We have known him since childhood.", ar: "نعرفه منذ الطفولة." },
];

// ============================================================
// ㉒ لماذا Present Perfect؟ — مسار الاستمرار
// ============================================================
export const CONTINUATION_31 = {
  en: "I have lived here for five years.",
  start: "البداية: الماضي",
  keep: "الاستمرار: ──────────────→ NOW",
  why: "بدأت في الماضي وما زالت مرتبطة بالحاضر.",
};

// ============================================================
// ㉓ النفي · ㉔ أسئلة Yes/No · ㉕ الإجابات القصيرة
// ============================================================
export const NEGATIVE_31 = [
  { en: "I haven't finished.", ar: "لم أنهِ." },
  { en: "She hasn't arrived.", ar: "لم تصل." },
  { en: "He hasn't eaten.", ar: "لم يأكل." },
  { en: "We haven't decided.", ar: "لم نقرر." },
  { en: "They haven't seen the movie.", ar: "لم يشاهدوا الفيلم." },
  { en: "The train hasn't arrived.", ar: "لم يصل القطار." },
];

export const YESNO_31 = [
  { en: "Have you finished?", ar: "هل أنهيت؟" },
  { en: "Has she arrived?", ar: "هل وصلت؟" },
  { en: "Has he eaten?", ar: "هل أكل؟" },
  { en: "Have they left?", ar: "هل غادروا؟" },
  { en: "Have we met before?", ar: "هل التقينا من قبل؟" },
  { en: "Has the teacher arrived?", ar: "هل وصل المعلم؟" },
];

export const SHORT_ANSWERS_31 = [
  { q: "Have you finished?", yes: "Yes, I have.", no: "No, I haven't." },
  { q: "Has she arrived?", yes: "Yes, she has.", no: "No, she hasn't." },
  { q: "Have they eaten?", yes: "Yes, they have.", no: "No, they haven't." },
  { q: "Has he seen this movie?", yes: "Yes, he has.", no: "No, he hasn't." },
];

// ============================================================
// ㉖ Wh Questions
// ============================================================
export const WH_31 = [
  { wh: "What", en: "What have you done?", ar: "ماذا فعلت؟" },
  { wh: "Where", en: "Where has she gone?", ar: "إلى أين ذهبت؟" },
  { wh: "Why", en: "Why have they left?", ar: "لماذا غادروا؟" },
  { wh: "Who", en: "Who has taken my notebook?", ar: "من أخذ دفتري؟" },
  { wh: "How many", en: "How many books have you read?", ar: "كم كتابًا قرأت؟" },
  { wh: "How long", en: "How long have you lived here?", ar: "منذ متى وأنت تعيش هنا؟" },
];

// ============================================================
// ㉗ How long?
// ============================================================
export const HOWLONG_31 = {
  en: "How long have you lived here?",
  ar: "منذ متى وأنت تعيش هنا؟",
  forAnswer: "I have lived here for six years.",
  sinceAnswer: "I have lived here since 2020.",
};

// ============================================================
// ㉘ المقارنة الكبرى · ㉙ المقارنة الثلاثية
// ============================================================
export const COMPARE_31 = [
  {
    tense: "Past Simple",
    focus: "حدث انتهى في الماضي.",
    extra: "وغالبًا نعرف متى حدث.",
    en: "I watched that movie last night.",
    ar: "شاهدت ذلك الفيلم ليلة أمس.",
    probe: "متى؟",
    probeAnswer: "last night.",
  },
  {
    tense: "Present Perfect",
    focus: "التجربة أو النتيجة أو العلاقة بالحاضر.",
    extra: "",
    en: "I have watched that movie.",
    ar: "لقد شاهدت ذلك الفيلم.",
    probe: "هل شاهدته من قبل؟",
    probeAnswer: "نعم.",
  },
];

export const TRIPLE_31 = [
  { en: "I saw the museum yesterday.", ar: "رأيت المتحف أمس.", tense: "Past Simple", why: "حدث ماضٍ محدد." },
  { en: "I have seen the museum.", ar: "لقد رأيت المتحف.", tense: "Present Perfect", why: "تجربة مرتبطة بالحاضر." },
  {
    en: "I had seen the museum before we entered the city.",
    ar: "كنت قد رأيت المتحف قبل أن ندخل المدينة.",
    tense: "Past Perfect",
    why: "حدث وقع قبل حدث ماضٍ آخر.",
  },
];

export const TRIPLE_RULES_31 = [
  { tense: "Past Simple", rule: "= حدث ماضٍ" },
  { tense: "Present Perfect", rule: "= ماضٍ مرتبط بالحاضر" },
  { tense: "Past Perfect", rule: "= ماضٍ حدث قبل ماضٍ آخر" },
];

// ============================================================
// ㉚ خط زمني خارق — رسوم المصدر محفوظة كمرجع (See textbook/reference)
// ============================================================
export const DIAGRAMS_31 = [
  {
    id: "pp-diagram",
    label: "خط المصدر الأول — Present Perfect",
    art: ["PAST                          NOW", "          X", "          ↑"],
    caption: "Present Perfect — حدث قبل الآن وله علاقة بالحاضر",
    reference: "See textbook/reference — الرسم كما ورد في المصدر دون تخمين.",
  },
  {
    id: "pp-vs-ps-diagram",
    label: "خط المصدر الثاني — Past Perfect مقابل Past Simple",
    art: ["PAST                          NOW", "X             Y", "↑             ↑", "earlier       later", "past          past"],
    caption: "X = Past Perfect · Y = Past Simple",
    reference: "See textbook/reference — الرسم كما ورد في المصدر دون تخمين.",
  },
];

export const TIMELINE_NODES_31 = [
  { key: "had-started", en: "The movie had started", tense: "Past Perfect", ar: "الفيلم بدأ أولًا (قبل وصولنا)." },
  { key: "arrived", en: "we arrived", tense: "Past Simple", ar: "ثم وصلنا." },
];

// ============================================================
// ㉛–㉞ الأخطاء الأربعة الشهيرة (تصحيح أدقّ من خطوة واحدة)
// ============================================================
export type FamousError31 = {
  n: number;
  wrongSegments: string[];
  bad: number;
  fixOpts: string[];
  fixAnswer: number;
  why: string;
  corrected: string;
  sourceNote: string;
};

export const FAMOUS_ERRORS_31: FamousError31[] = [
  {
    n: 31,
    wrongSegments: ["I", "have seen", "him", "yesterday."],
    bad: 1,
    fixOpts: ["I saw him yesterday.", "I have seen him.", "I have seen him before."],
    fixAnswer: 0,
    why: "yesterday وقت ماضٍ محدد ومنتهٍ — فالفعل يأخذ Past Simple: saw.",
    corrected: "I saw him yesterday.",
    sourceNote: "لكن I have seen him before صحيحة — لأننا لم نحدد وقتًا معينًا.",
  },
  {
    n: 32,
    wrongSegments: ["She", "has", "went", "home."],
    bad: 2,
    fixOpts: ["She has gone home.", "She has go home.", "She went home already."],
    fixAnswer: 0,
    why: "بعد has نحتاج V3: go → went → gone.",
    corrected: "She has gone home.",
    sourceNote: "went هي V2 (الماضي البسيط) — مكانها ليس بعد has.",
  },
  {
    n: 33,
    wrongSegments: ["Did", "you", "have finished", "your homework?"],
    bad: 0,
    fixOpts: ["Have you finished your homework?", "Did you finished your homework?", "Do you have finished your homework?"],
    fixAnswer: 0,
    why: "لا نستخدم did مع Present Perfect — السؤال يبدأ بالمساعد Have.",
    corrected: "Have you finished your homework?",
    sourceNote: "مساعد واحد فقط: Have — ونحذف did تمامًا.",
  },
  {
    n: 34,
    wrongSegments: ["He", "doesn't", "have finished."],
    bad: 1,
    fixOpts: ["He hasn't finished.", "He doesn't finish.", "He hasn't finish."],
    fixAnswer: 0,
    why: "هذه خلط بين Present Simple وPresent Perfect — النفي الصحيح: hasn't + V3.",
    corrected: "He hasn't finished.",
    sourceNote: "doesn't تنتمي إلى المضارع البسيط، لا إلى Present Perfect.",
  },
];

// ============================================================
// ㉟ Grammar Detective — ثمانية أخطاء المصدر وتصحيحاتها
// ============================================================
export type Detective31 = {
  n: number;
  wrong: string;
  segments: string[];
  bad: number;
  fixOpts: string[];
  fixAnswer: number;
  right: string;
  why: string;
};

export const DETECTIVE_31: Detective31[] = [
  {
    n: 1,
    wrong: "She has went to school.",
    segments: ["She", "has", "went", "to school."],
    bad: 2,
    fixOpts: ["She has gone to school.", "She has go to school.", "She went to school."],
    fixAnswer: 0,
    right: "She has gone to school.",
    why: "بعد has نستخدم V3: go → went → gone.",
  },
  {
    n: 2,
    wrong: "I have seen him yesterday.",
    segments: ["I", "have seen", "him", "yesterday."],
    bad: 1,
    fixOpts: ["I saw him yesterday.", "I have seen him before.", "I have saw him yesterday."],
    fixAnswer: 0,
    right: "I saw him yesterday.",
    why: "yesterday وقت ماضٍ محدد ومنتهٍ → Past Simple: saw.",
  },
  {
    n: 3,
    wrong: "Did you have eaten breakfast?",
    segments: ["Did", "you", "have eaten", "breakfast?"],
    bad: 0,
    fixOpts: ["Have you eaten breakfast?", "Did you eaten breakfast?", "Have you ate breakfast?"],
    fixAnswer: 0,
    right: "Have you eaten breakfast?",
    why: "لا نستخدم did مع Present Perfect — نبدأ بـ Have.",
  },
  {
    n: 4,
    wrong: "He hasn't never visited Paris.",
    segments: ["He", "hasn't", "never", "visited Paris."],
    bad: 1,
    fixOpts: ["He has never visited Paris.", "He hasn't visited Paris never.", "He hasn't ever never visited Paris."],
    fixAnswer: 0,
    right: "He has never visited Paris.",
    why: "never تحمل معنى النفي أصلًا — لا نجمع hasn't مع never.",
  },
  {
    n: 5,
    wrong: "They has finished the project.",
    segments: ["They", "has", "finished", "the project."],
    bad: 1,
    fixOpts: ["They have finished the project.", "They has finish the project.", "They are finished the project."],
    fixAnswer: 0,
    right: "They have finished the project.",
    why: "They → have (وليست has).",
  },
  {
    n: 6,
    wrong: "Have she arrived?",
    segments: ["Have", "she", "arrived?"],
    bad: 0,
    fixOpts: ["Has she arrived?", "Have she arrive?", "Did she has arrived?"],
    fixAnswer: 0,
    right: "Has she arrived?",
    why: "She → Has في بداية السؤال.",
  },
  {
    n: 7,
    wrong: "I have lived here since five years.",
    segments: ["I have lived here", "since", "five years."],
    bad: 1,
    fixOpts: ["I have lived here for five years.", "I have lived here since five years ago already.", "I lived here since five years."],
    fixAnswer: 0,
    right: "I have lived here for five years.",
    why: "five years مدة → for؛ since للنقطة (مثل since 2020).",
  },
  {
    n: 8,
    wrong: "She has worked here for 2022.",
    segments: ["She has worked here", "for", "2022."],
    bad: 1,
    fixOpts: ["She has worked here since 2022.", "She has worked here for 2022 years.", "She worked here for 2022."],
    fixAnswer: 0,
    right: "She has worked here since 2022.",
    why: "2022 نقطة بداية → since؛ for للمدة (مثل for six months).",
  },
];

// ============================================================
// ㊱ تحدي الاختيار الذكي — ثمانية أزواج (Past Simple أم Present Perfect)
// ============================================================
export type SmartPick31 = {
  n: number;
  prompt: string;
  ar: string;
  verb: string;
  opts: string[];
  answer: number;
  why: string;
};

export const SMART_31: SmartPick31[] = [
  { n: 1, prompt: "I ______ my homework yesterday.", ar: "حدث منتهٍ مع وقت محدد: yesterday.", verb: "finish", opts: ["finished", "have finished"], answer: 0, why: "yesterday وقت ماضٍ محدد ومنتهٍ → Past Simple: finished." },
  { n: 2, prompt: "I ______ my homework already.", ar: "already تربط النتيجة بالحاضر.", verb: "finish", opts: ["finished", "have finished"], answer: 1, why: "already → Present Perfect: have finished." },
  { n: 3, prompt: "Sara ______ to Turkey in 2024.", ar: "in 2024 وقت ماضٍ محدد ومنتهٍ.", verb: "travel", opts: ["traveled", "has traveled"], answer: 0, why: "in 2024 وقت منتهٍ → Past Simple: traveled." },
  { n: 4, prompt: "Sara ______ to Turkey before.", ar: "before تعني «من قبل» دون تحديد وقت.", verb: "travel", opts: ["traveled", "has traveled"], answer: 1, why: "قبل الآن بلا وقت محدد → Present Perfect: has traveled." },
  { n: 5, prompt: "We ______ this problem last night.", ar: "last night فترة انتهت.", verb: "solve", opts: ["solved", "have solved"], answer: 0, why: "last night انتهت → Past Simple: solved." },
  { n: 6, prompt: "We ______ this problem already.", ar: "النتيجة موجودة الآن.", verb: "solve", opts: ["solved", "have solved"], answer: 1, why: "already + نتيجة قائمة → Present Perfect: have solved." },
  { n: 7, prompt: "He ______ his phone two days ago.", ar: "two days ago وقت محدد ومنتهٍ.", verb: "lose", opts: ["lost", "has lost"], answer: 0, why: "two days ago → Past Simple: lost." },
  { n: 8, prompt: "He ______ his phone.", ar: "لا يوجد وقت محدد — والهاتف مفقود الآن.", verb: "lose", opts: ["lost", "has lost"], answer: 1, why: "نتيجة مهمة الآن → Present Perfect: has lost." },
];

// ============================================================
// ㊲ IQ200 — زوايا النظر: Maya · Daniel
// ============================================================
export const IQ_PAIRS_31 = [
  {
    id: "maya",
    a: { en: "Maya lost her passport.", read: "نحن نخبر عن حدث في الماضي." },
    b: { en: "Maya has lost her passport.", read: "هناك نتيجة مهمة الآن. ربما جواز السفر ما زال مفقودًا." },
  },
  {
    id: "daniel",
    a: { en: "Daniel went to the library.", read: "ذهب، ونحن نخبر عن حدث ماضٍ." },
    b: { en: "Daniel has gone to the library.", read: "هناك علاقة بالحاضر؛ غالبًا هو موجود هناك الآن أو لم يعد بعد." },
  },
];

export const IQ_ANGLE_NOTE_31 =
  "هذه ليست مجرد قاعدة زمن. إنها اختلاف في \"زاوية النظر\" إلى الحدث.";

// ============================================================
// ㊳ تحدي أعمق — الطائرة
// ============================================================
export const DEEPER_31 = {
  situation: "صديقك يسألك: \"هل سبق أن ركبت طائرة؟\"",
  best: { en: "I have flown on a plane.", why: "لأننا نتحدث عن تجربة." },
  also: { en: "I flew on a plane in 2022.", why: "فهي صحيحة أيضًا، لكننا هنا نتحدث عن حدث محدد في عام 2022." },
  close: "إذن الجملتان ممكنتان، لكن المعنى مختلف.",
};

// ============================================================
// ㊴ Boss Challenge — نص Lina وأفعاله
// ============================================================
export const BOSS_LINA_TEXT_31 =
  "Lina has always loved science. She has visited several science museums, and she has recently started a robotics project at school. Last year, she joined a science club and built a small solar-powered car. This year, she has already completed two robotics projects.";

export const BOSS_LINA_VERBS_31 = [
  { verb: "has always loved", tense: "Present Perfect", ar: "حبه للعلم خبرة ممتدة حتى الآن." },
  { verb: "has visited", tense: "Present Perfect", ar: "خبرة في حياتها دون وقت محدد." },
  { verb: "has recently started", tense: "Present Perfect", ar: "حدث حديث له علاقة بالحاضر." },
  { verb: "joined", tense: "Past Simple", ar: "مع last year — فترة ماضية منتهية." },
  { verb: "built", tense: "Past Simple", ar: "نفس الفترة الماضية المنتهية." },
  { verb: "has already completed", tense: "Present Perfect", ar: "مع this year — الفترة ما زالت مرتبطة بالحاضر." },
];

export const BOSS_LINA_REASON_31 = [
  { cue: "last year", note: "→ فترة ماضية منتهية" },
  { cue: "this year", note: "→ الفترة ما زالت مرتبطة بالحاضر" },
];

// ============================================================
// ㊵ IQ200 — حوّل الجملة
// ============================================================
export const TRANSFORM_31 = {
  source: "I visited Japan in 2021.",
  answer: "I have visited Japan.",
  removed: "in 2021",
  banned: ["yesterday", "last year", "in 2021", "two days ago"],
  why: "Present Perfect الأساسي لا نستخدمه مع وقت ماضٍ محدد ومنتهٍ — لذلك نحذف in 2021 ليبقى المعنى «خبرة في الحياة».",
};

// ============================================================
// ㊶ تحدي for / since — خمس جمل المصدر
// ============================================================
export type ForSinceItem31 = { n: number; en: string; answer: "for" | "since"; why: string };
export const FORSINCE_ITEMS_31: ForSinceItem31[] = [
  { n: 1, en: "I have lived here ______ 2020.", answer: "since", why: "2020 نقطة بداية." },
  { n: 2, en: "She has studied English ______ four years.", answer: "for", why: "four years مدة." },
  { n: 3, en: "We have known him ______ childhood.", answer: "since", why: "childhood نقطة بداية." },
  { n: 4, en: "He has worked there ______ six months.", answer: "for", why: "six months مدة." },
  { n: 5, en: "They have been friends ______ 2018.", answer: "since", why: "2018 نقطة بداية." },
];

// ============================================================
// ㊷ التحدي النهائي — سبع بدايات يكتبها الطالب بإجابات حقيقية
// ============================================================
export type Starter31 = {
  n: number;
  text: string;
  hint: string;
  model: string;
  /** يتحقق حيًا من نمط البداية المطلوب */
  check: (value: string) => boolean;
};

export const STARTERS_31: Starter31[] = [
  { n: 1, text: "I have never ______.", hint: "اكتب شيئًا لم تفعله في حياتك.", model: "I have never ridden a horse.", check: (v) => /^i have never\s+\S+/i.test(v.trim()) },
  { n: 2, text: "I have already ______.", hint: "اكتب شيئًا أنجزته قبل الوقت المتوقع.", model: "I have already finished my homework.", check: (v) => /^i have already\s+\S+/i.test(v.trim()) },
  { n: 3, text: "I have just ______.", hint: "اكتب شيئًا حدث للتو.", model: "I have just arrived.", check: (v) => /^i have just\s+\S+/i.test(v.trim()) },
  { n: 4, text: "I haven't ______ yet.", hint: "اكتب شيئًا لم يحدث حتى الآن.", model: "I haven't eaten yet.", check: (v) => /^i haven'?t\s+\S+/i.test(v.trim()) && /yet\.?$/i.test(v.trim()) },
  { n: 5, text: "Have you ever ______?", hint: "اسأل صديقك عن تجربة.", model: "Have you ever visited Turkey?", check: (v) => /^have you ever\s+\S+/i.test(v.trim()) && /\?$/.test(v.trim()) },
  { n: 6, text: "I have lived ______ for ______.", hint: "مدة زمنية في الفراغ الثاني.", model: "I have lived in this city for six years.", check: (v) => /\sfor\s+\S+/i.test(v.trim()) && !/^i have lived\s+for\s/i.test(v.trim()) },
  { n: 7, text: "I have studied ______ since ______.", hint: "نقطة بداية في الفراغ الثاني.", model: "I have studied English since 2019.", check: (v) => /\ssince\s+\S+/i.test(v.trim()) && !/^i have studied\s+since\s/i.test(v.trim()) },
];

// ============================================================
// ㊸ Final Boss — أربع جمل، أربعة معانٍ
// ============================================================
export const FINAL_BOSS_31 = [
  { en: "I ate the cake.", tense: "Past Simple", ar: "أكلت الكعكة. حدث ماضٍ." },
  { en: "I was eating the cake.", tense: "Past Continuous", ar: "كنت آكل الكعكة. الفعل كان جاريًا في لحظة ماضية." },
  { en: "I had eaten the cake before they arrived.", tense: "Past Perfect", ar: "كنت قد أكلت الكعكة قبل وصولهم." },
  { en: "I have eaten the cake.", tense: "Present Perfect", ar: "لقد أكلت الكعكة، وهناك علاقة بالحاضر." },
];

// ============================================================
// ㊹ الخريطة الكبرى — أربع عدسات
// ============================================================
export const BIG_MAP_31 = [
  { id: "ps", emoji: "📸", tense: "Past Simple", ar: "حدث ماضٍ انتهى.", en: "I visited Rome in 2022." },
  { id: "pc", emoji: "🎥", tense: "Past Continuous", ar: "شيء كان يحدث في لحظة ماضية.", en: "I was visiting Rome at 5:00." },
  { id: "pperf", emoji: "⏪", tense: "Past Perfect", ar: "شيء حدث قبل حدث ماضٍ آخر.", en: "I had visited Rome before I moved there." },
  { id: "present", emoji: "🌉", tense: "Present Perfect", ar: "شيء حدث قبل الآن وله علاقة بالحاضر.", en: "I have visited Rome." },
];

// ============================================================
// ㊺ ملخص الدرس
// ============================================================
export const SUMMARY_USES_31 = [
  { n: 1, label: "التجارب", en: "I have visited Spain.", ar: "خبرة في الحياة بلا وقت محدد." },
  { n: 2, label: "النتيجة الحالية", en: "I have lost my keys.", ar: "المفاتيح مفقودة الآن." },
  { n: 3, label: "الأحداث الحديثة", en: "She has just arrived.", ar: "حدث للتو وله علاقة بالحاضر." },
  { n: 4, label: "فترة لم تنتهِ", en: "I have studied a lot this week.", ar: "الأسبوع ما زال مستمرًا." },
  { n: 5, label: "حالة بدأت في الماضي وما زالت مرتبطة بالحاضر", en: "I have lived here for five years.", ar: "بدأت في الماضي → NOW." },
];

export const SUMMARY_WORDS_31 = [
  { en: "ever", ar: "هل سبق" },
  { en: "never", ar: "لم يسبق أبدًا" },
  { en: "already", ar: "بالفعل" },
  { en: "just", ar: "للتو" },
  { en: "yet", ar: "بعد / حتى الآن" },
  { en: "recently", ar: "مؤخرًا" },
  { en: "lately", ar: "في الآونة الأخيرة" },
  { en: "so far", ar: "حتى الآن" },
  { en: "for", ar: "مدة" },
  { en: "since", ar: "نقطة بداية" },
];

export const GOLDEN_31 = {
  rule: "Present Perfect لا نستخدمه عادةً مع وقت ماضٍ محدد ومنتهٍ.",
  ok1: "I saw him yesterday. ✅",
  ok2: "I have seen him before. ✅",
  bad: "I have seen him yesterday. ❌",
  closing: "الدرس 31 مهم جدًا لأنه أول مرة نبدأ فيها بفهم فكرة \"الماضي المرتبط بالحاضر\"، وليس مجرد حفظ شكل الزمن.",
};

// ============================================================
// 🗺️ خريطة المنهج حتى الآن
// ============================================================
export const CURRICULUM_31 = {
  present: [
    { n: 1, label: "Present Simple", here: false },
    { n: 2, label: "Present Continuous", here: false },
    { n: 3, label: "Present Perfect", here: true },
  ],
  past: [
    { n: 4, label: "Past Simple", here: false },
    { n: 5, label: "Past Continuous", here: false },
    { n: 6, label: "Past Perfect", here: false },
    { n: 7, label: "Past Perfect Continuous", here: false },
  ],
  next: ["Present Perfect Continuous"],
  future: ["Future Simple", "be going to", "Future Continuous", "Future Perfect", "Future Perfect Continuous"],
};

// ============================================================
// جمل خاطئة مقصودة — محفوظة حرفيًا من المصدر لأغراض التدريب
// (تُعرض دائمًا موسومة بأنها خاطئة مع تصحيحها — ليست تسريبًا)
// ============================================================
export type IntentionallyWrong31 = { id: string; wrong: string; right: string; note: string };

export const INTENTIONALLY_WRONG_31: IntentionallyWrong31[] = [
  { id: "s4-1", wrong: "I have went.", right: "I have gone.", note: "بعد have نستخدم V3 — القسم ④." },
  { id: "s4-2", wrong: "She has ate.", right: "She has eaten.", note: "بعد has نستخدم V3 — القسم ④." },
  { id: "s4-3", wrong: "They have saw.", right: "They have seen.", note: "بعد have نستخدم V3 — القسم ④." },
  { id: "s4-4", wrong: "He has wrote.", right: "He has written.", note: "بعد has نستخدم V3 — القسم ④." },
  { id: "s5-1", wrong: "He has forgot...", right: "He has forgotten...", note: "forget → forgot → forgotten — القسم ⑤." },
  { id: "s8-1", wrong: "I have visited London in 2022.", right: "I visited London in 2022.", note: "in 2022 وقت ماضٍ محدد ومنتهٍ — القسم ⑧." },
  { id: "s10-1", wrong: "I haven't never seen it.", right: "I have never seen it.", note: "never تحمل معنى النفي — القسم ⑩." },
  { id: "s31-1", wrong: "I have seen him yesterday.", right: "I saw him yesterday.", note: "yesterday وقت منتهٍ — القسم ㉛." },
  { id: "s32-1", wrong: "She has went home.", right: "She has gone home.", note: "go → went → gone — القسم ㉜." },
  { id: "s33-1", wrong: "Did you have finished your homework?", right: "Have you finished your homework?", note: "لا نستخدم did مع Present Perfect — القسم ㉝." },
  { id: "s34-1", wrong: "He doesn't have finished.", right: "He hasn't finished.", note: "خلط Present Simple مع Present Perfect — القسم ㉞." },
  { id: "s35-1", wrong: "She has went to school.", right: "She has gone to school.", note: "القسم ㉟-①." },
  { id: "s35-2", wrong: "I have seen him yesterday.", right: "I saw him yesterday.", note: "القسم ㉟-②." },
  { id: "s35-3", wrong: "Did you have eaten breakfast?", right: "Have you eaten breakfast?", note: "القسم ㉟-③." },
  { id: "s35-4", wrong: "He hasn't never visited Paris.", right: "He has never visited Paris.", note: "القسم ㉟-④." },
  { id: "s35-5", wrong: "They has finished the project.", right: "They have finished the project.", note: "القسم ㉟-⑤." },
  { id: "s35-6", wrong: "Have she arrived?", right: "Has she arrived?", note: "القسم ㉟-⑥." },
  { id: "s35-7", wrong: "I have lived here since five years.", right: "I have lived here for five years.", note: "القسم ㉟-⑦." },
  { id: "s35-8", wrong: "She has worked here for 2022.", right: "She has worked here since 2022.", note: "القسم ㉟-⑧." },
];

// ============================================================
// منطقة الاختبارات — 20 سؤالًا جديدًا مؤلفة خصيصًا لهذا الاختبار
// (ليست منسوخة من تمارين المصدر ولا إعادة صياغة مباشرة لها)
// التوزيع: 6 Basic · 7 Medium · 4 Advanced · 3 Thinking
// ============================================================
export type TestLevel31 = "basic" | "medium" | "advanced" | "thinking";

export type TestQ31 =
  | { n: number; level: TestLevel31; type: "single"; ar: string; en?: string; opts: string[]; answer: number; why: string; trap?: string }
  | { n: number; level: TestLevel31; type: "tf"; ar: string; en?: string; answer: boolean; why: string; trap?: string }
  | { n: number; level: TestLevel31; type: "multi"; ar: string; en?: string; opts: string[]; answer: number[]; why: string; trap?: string }
  | { n: number; level: TestLevel31; type: "order"; ar: string; en?: string; items: string[]; answer: string[]; why: string; trap?: string }
  | { n: number; level: TestLevel31; type: "match"; ar: string; en?: string; left: string[]; right: string[]; answer: number[]; why: string; trap?: string }
  | { n: number; level: TestLevel31; type: "spot"; ar: string; segments: string[]; answer: number; fix: string; why: string; trap?: string };

export const TEST_31: TestQ31[] = [
  {
    n: 1, level: "basic", type: "single",
    ar: "أكمل الجملة بحيث تكون النتيجة مهمة الآن: «لقد أنهت واجبها».",
    en: "She ______ her homework.",
    opts: ["has finished", "have finished", "has finish"],
    answer: 0,
    why: "She تأخذ has، وبعد has نستخدم V3: finished. الصيغة كاملة: She has finished.",
    trap: "have finished صحيحة مع I/You/We/They فقط — أما has finish فتكسر الصيغة لأن بعد has نستخدم V3.",
  },
  {
    n: 2, level: "basic", type: "tf",
    ar: "بعد have / has نستخدم صيغة V2 مثل went و ate.",
    answer: false,
    why: "بعد have/has نستخدم V3 (Past Participle): gone و eaten. أما went و ate فهما V2 ويأتيان في Past Simple.",
    trap: "خلط V2 بـ V3 هو الخطأ رقم واحد في هذا الدرس: I have went ✗ / I have gone ✓.",
  },
  {
    n: 3, level: "basic", type: "single",
    ar: "أي جملة صحيحة نحويًا؟",
    opts: ["They has arrived.", "They have arrived.", "They have arrive."],
    answer: 1,
    why: "They تأخذ have، وبعدها V3 arrived: They have arrived.",
    trap: "has تختص بـ He/She/It، و arrive بدون تصريف ثالث تكسر الصيغة.",
  },
  {
    n: 4, level: "basic", type: "single",
    ar: "أكمل النفي: «لم يقرروا بعد».",
    en: "They ______ decided yet.",
    opts: ["haven't", "hasn't", "not have"],
    answer: 0,
    why: "They مع Present Perfect المنفي: haven't + V3، و yet تأتي في النهاية.",
    trap: "hasn't تختص بالمفرد الغائب، و not have ترتيب غير موجود في الصيغة.",
  },
  {
    n: 5, level: "basic", type: "tf",
    ar: "كلمة never تحمل معنى النفي أصلًا، لذلك لا نضيف not معها.",
    answer: true,
    why: "never = لم يسبق أبدًا، ومعناها نفي كامل: I have never seen it. ✔ وإضافة not تصنع نفيًا مزدوجًا خاطئًا.",
    trap: "I haven't never seen it ✗ — لا نجمع نافيين في الجملة الواحدة.",
  },
  {
    n: 6, level: "basic", type: "match",
    ar: "طابِق كل فعل مع التصريف الثالث V3 الصحيح.",
    left: ["go", "eat", "write", "see"],
    right: ["gone", "eaten", "written", "seen"],
    answer: [0, 1, 2, 3],
    why: "go → went → gone · eat → ate → eaten · write → wrote → written · see → saw → seen — وبعد have/has نستخدم العمود الثالث دائمًا.",
    trap: "went و ate و wrote هي V2 ولا تصلح بعد have/has.",
  },
  {
    n: 7, level: "medium", type: "single",
    ar: "أكمل السؤال: «هل رأيت مفاتيحي في مكان ما؟».",
    en: "Have you ______ my keys anywhere?",
    opts: ["saw", "seen", "see"],
    answer: 1,
    why: "بعد have نستخدم V3: see → saw → seen، فتصبح Have you seen.",
    trap: "saw هي V2 — الجملة تبدو مألوفة للأذن لكنها خطأ في هذه الصيغة.",
  },
  {
    n: 8, level: "medium", type: "single",
    ar: "«هل سبق أن أكلتَ طعامًا مكسيكيًا؟» — اختر السؤال الصحيح.",
    opts: ["Have you ever eaten Mexican food?", "Did you ever ate Mexican food?", "Have you ever ate Mexican food?"],
    answer: 0,
    why: "نمط ever: Have/Has + Subject + ever + V3 → Have you ever eaten.",
    trap: "did تخرجنا من Present Perfect، و ate بعد ever تكسر قاعدة V3.",
  },
  {
    n: 9, level: "medium", type: "spot",
    ar: "اضغط على الجزء الخاطئ في الجملة.",
    segments: ["He", "has", "wrote", "three", "emails", "today."],
    answer: 2,
    fix: "has written — بعد has نستخدم V3: write → wrote → written.",
    why: "wrote هي V2 ولا تأتي بعد has أبدًا؛ الصيغة تحتاج written.",
    trap: "الفعل نفسه صحيح لكن مرحلة التصريف خاطئة — وهذا بالضبط ما تبدو الجملة معه «صحيحة للوهلة الأولى».",
  },
  {
    n: 10, level: "medium", type: "spot",
    ar: "اضغط على الجزء الخاطئ في الجملة.",
    segments: ["They", "haven't", "never", "tried", "sushi."],
    answer: 2,
    fix: "haven't tried — never وحدها تكفي للنفي، فلا نجمع haven't مع never.",
    why: "الجملة تحمل نفيين؛ يكفي أحدهما: They haven't tried sushi. أو They have never tried sushi.",
    trap: "الإبقاء على never مع haven't يجعل الجملة نفيًا مزدوجًا غير مقبول.",
  },
  {
    n: 11, level: "medium", type: "multi",
    ar: "اختر كل الجمل الصحيحة (أكثر من إجابة).",
    opts: ["I have never visited Canada.", "She has already eaten.", "We have saw that film.", "Has he finished his work?"],
    answer: [0, 1, 3],
    why: "never و already يتوافقان مع الصيغة، والسؤال يبدأ بـ Has + فاعل + V3. أما have saw فخطأ لأن المطلوب seen.",
    trap: "الخيار الثالث يبدو مفهومًا لكنه كسر V3 — الفهم لا يعوّض الصيغة.",
  },
  {
    n: 12, level: "medium", type: "order",
    ar: "رتّب الكلمات لبناء سؤال صحيح بمعنى «هل سبق أن ركبت حصانًا؟».",
    items: ["ridden", "Have", "you", "ever", "a horse?"],
    answer: ["Have", "you", "ever", "ridden", "a horse?"],
    why: "النمط: Have/Has + Subject + ever + V3 — و ever مكانها بين الفاعل والفعل الأساسي.",
    trap: "وضع ever في النهاية يغيّر التركيب؛ مكانها ثابت قبل V3.",
  },
  {
    n: 13, level: "medium", type: "match",
    ar: "طابِق كل جملة مع وظيفتها في Present Perfect.",
    left: [
      "I have just finished my homework.",
      "I have visited Italy.",
      "I have lost my keys.",
      "I have studied a lot this week.",
    ],
    right: [
      "الأحداث الحديثة — just",
      "التجربة في الحياة دون وقت محدد",
      "النتيجة موجودة الآن",
      "فترة زمنية لم تنتهِ بعد",
    ],
    answer: [0, 1, 2, 3],
    why: "just للأحداث الحديثة · التجربة بلا وقت محدد · النتيجة قائمة الآن · this week فترة مستمرة.",
    trap: "كل الجمل صحيحة نحويًا — التصنيف يعتمد على الوظيفة لا على الشكل.",
  },
  {
    n: 14, level: "advanced", type: "single",
    ar: "اختر الكلمة الصحيحة: «يعمل والدي في المستشفى منذ عام 2015».",
    en: "My father has worked at the hospital ______ 2015.",
    opts: ["for", "since"],
    answer: 1,
    why: "2015 نقطة بداية محددة → since. أما for فتحتاج مدة مثل for ten years.",
    trap: "قاعدة الذهب: for + مدة · since + نقطة بداية — والعكس يفسد المعنى.",
  },
  {
    n: 15, level: "advanced", type: "single",
    ar: "«زرتُ جدّي الأسبوع الماضي» — اختر الجملة الصحيحة.",
    opts: ["I have visited my grandfather last week.", "I visited my grandfather last week.", "I have visit my grandfather last week."],
    answer: 1,
    why: "last week فترة ماضية منتهية، وهي تمنع Present Perfect في استخدامه الأساسي → Past Simple: visited.",
    trap: "وجود «لقد» في الترجمة العربية يدفع الطالب إلى have visited خطأً — المعنى هو الحكم.",
  },
  {
    n: 16, level: "advanced", type: "multi",
    ar: "اختر كل العناصر التي ترجّح Past Simple وتمنع Present Perfect الأساسي (أكثر من إجابة).",
    opts: ["yesterday", "last year", "in 2021", "so far"],
    answer: [0, 1, 2],
    why: "yesterday و last year و in 2021 كلها أوقات ماضية محددة ومنتهية. أما so far فتعني «حتى الآن» وتتوافق مع Present Perfect.",
    trap: "so far تشبه زمنًا ماضيًا في الترجمة، لكنها تمتد إلى اللحظة الحاضرة.",
  },
  {
    n: 17, level: "advanced", type: "single",
    ar: "«منذ متى وأنت تعمل هنا؟» — ما الرد الأدق لتعبير عن نقطة البداية؟",
    opts: ["I have worked here since 2019.", "I have worked here for 2019.", "I worked here since 2019."],
    answer: 0,
    why: "سؤال How long يُجاب بـ for + مدة أو since + نقطة بداية، و2019 نقطة بداية → since 2019 مع Present Perfect.",
    trap: "for 2019 تخلط بين المدة والنقطة، و worked مع since تكسر الرابط بالحاضر.",
  },
  {
    n: 18, level: "thinking", type: "single",
    ar: "أي الجملتين تخبر أن المحفظة ما زالت مفقودة الآن؟",
    opts: ["A: She lost her wallet.", "B: She has lost her wallet.", "كلتاهما تعطيان نفس المعنى."],
    answer: 1,
    why: "B تستخدم Present Perfect فتربط الحدث بالحاضر: النتيجة قائمة (المحفظة مفقودة الآن). أما A فتخبر عن حدث ماضٍ فقط.",
    trap: "A تشير إلى حدث ماضٍ ربما انتهى أثره — لكنها لا تقول إن المحفظة مفقودة الآن.",
  },
  {
    n: 19, level: "thinking", type: "multi",
    ar: "اختر كل الجمل التي تعطي معنى «النتيجة موجودة الآن» (أكثر من إجابة).",
    opts: ["I have lost my keys.", "I lost my keys yesterday.", "Someone has opened the door.", "I had lost my keys before I left."],
    answer: [0, 2],
    why: "الجملتان الأولى والثالثة تعطيان نتيجة قائمة: المفاتيح مفقودة الآن، والباب مفتوح الآن. الثانية حدث ماضٍ محدد، والرابعة فلاش باك قبل حدث ماضٍ آخر.",
    trap: "لاحظ أن الثانية صحيحة نحويًا — لكنها لا تنقل معنى «النتيجة الآن».",
  },
  {
    n: 20, level: "thinking", type: "order",
    ar: "رتّب الكلمات لبناء الجملة الصحيحة بمعنى «لقد أنهينا المشروع بالفعل».",
    items: ["have", "We", "already", "finished", "the project."],
    answer: ["We", "have", "already", "finished", "the project."],
    why: "الترتيب: Subject + have + already + V3 — و already تقف بين المساعد والفعل الأساسي، لا في النهاية.",
    trap: "We have finished already the project أو وضع already في النهاية يغيّر التركيب المطلوب هنا.",
  },
];

// ============================================================
// حلول الاختبار النهائي (20) — مشتقة من TEST_31، تُعرض بعد التسليم فقط
// ============================================================
export const LEVEL_LABEL_31: Record<TestLevel31, string> = {
  basic: "Basic — أساسي",
  medium: "Medium — متوسط",
  advanced: "Advanced — متقدم",
  thinking: "Thinking — تفكير",
};

export function answerLabel31(q: TestQ31): string {
  switch (q.type) {
    case "single":
      return q.opts[q.answer];
    case "tf":
      return q.answer ? "True — صحيح" : "False — خطأ";
    case "multi":
      return q.answer.map((i) => q.opts[i]).join(" + ");
    case "order":
      return q.answer.join(" ");
    case "match":
      return q.left.map((l, i) => `${l} = ${q.right[q.answer[i]]}`).join(" · ");
    case "spot":
      return `الخطأ: ${q.segments[q.answer]} ← ${q.fix}`;
  }
}

export type TestSolution31 = { n: number; type: TestQ31["type"]; level: TestLevel31; answer: string; why: string; trap?: string };

export const TEST_31_SOLUTIONS: TestSolution31[] = TEST_31.map((q) => ({
  n: q.n,
  type: q.type,
  level: q.level,
  answer: answerLabel31(q),
  why: q.why,
  trap: q.trap,
}));

export const TEST_31_LEVEL_COUNTS: Record<TestLevel31, number> = {
  basic: TEST_31.filter((q) => q.level === "basic").length,
  medium: TEST_31.filter((q) => q.level === "medium").length,
  advanced: TEST_31.filter((q) => q.level === "advanced").length,
  thinking: TEST_31.filter((q) => q.level === "thinking").length,
};

// ============================================================
// منطقة المعلم — خلف كلمة المرور somer173
// ============================================================
export const TEACHER_PASSWORD_31 = "somer173";

export const TEACHER_31_OVERVIEW = {
  title: "Lesson Overview — نظرة عامة",
  objectives: [
    "أن يفهم الطالب معنى Present Perfect الحقيقي، وليس فقط حفظ have/has + V3.",
    "أن يكوّن الجملة المثبتة والمنفية والاستفهامية بثقة.",
    "أن يستخدم have و has بشكل صحيح مع كل الضمائر.",
    "أن يستخدم V3 بعد have/has ويميّزه عن V2.",
    "أن يفهم ever, never, already, just, yet, recently, lately, so far, since, for ويوظفها.",
    "أن يميّز بين Present Perfect وPast Simple وPast Perfect من المعنى لا من الكلمة.",
    "أن يعرف متى يكون الحدث الماضي مرتبطًا بالحاضر.",
    "أن يكتشف الأخطاء التي تبدو صحيحة للوهلة الأولى.",
    "أن يتعامل مع جمل IQ200 التي تجمع أكثر من زمن ويشرح زاوية النظر.",
  ],
  prerequisites: [
    "الدرس 27 — V3 / Past Participle (go → went → gone).",
    "الدرس 30 — نظام الماضي كاملًا (Past Simple · Past Continuous · Past Perfect · Past Perfect Continuous).",
    "Present Simple وPresent Continuous — للتمييز بين have/has كمساعد وكفعل عادي (have breakfast).",
    "Past Simple — الفرق بين حدث منتهٍ بتوقيت محدد وحدث مرتبط بالحاضر.",
  ],
  core: [
    "الفكرة المركزية: Present Perfect = ماضٍ + ارتباط بالحاضر — نتيجته أو خبرته أو استمراره مهم الآن.",
    "الصيغة: Subject + have/has + V3 — وكل الأخطاء الشهيرة في الدرس تنتمي إلى هذه الصيغة: V2 بعد have، وdid مع Present Perfect، وdoesn't have + V3، وnot مع never.",
    "المفتاح العملي: وجود وقت ماضٍ محدد ومنتهٍ (yesterday / last year / in 2021 / two days ago) يمنع Present Perfect في استخدامه الأساسي.",
  ],
} as const;

export type TeacherNote31 = { head: string; lines: string[] };

export const TEACHER_31_NOTES: TeacherNote31[] = [
  {
    head: "بداية الدرس: البناء على V3 من الدرس 27 ونظام الماضي من الدرس 30",
    lines: [
      "لا تبدأ من الصفر: ذكّر الطالب بأن V3 درسها في الدرس 27، وأن had + V3 في الدرس 30 هي نفس المنطق مع مساعد مختلف.",
      "اسأل الطالب سؤالًا واحدًا قبل أي قاعدة: ما الذي يجعل Present Perfect مختلفًا عن Past Simple؟ الإجابة المنتظرة: ارتباط الماضي بالحاضر.",
    ],
  },
  {
    head: "الفكرة التي تجعله مختلفًا (① ②)",
    lines: [
      "استخدم الخط الزمني: الماضي ─── X ─── NOW — وذكّر أن Present Perfect ينظر إلى X من نقطة NOW.",
      "مثال I have lost my keys لا يجيب على «متى؟» بل على «ما المشكلة الآن؟» — المفاتيح ليست معه.",
    ],
  },
  {
    head: "have أم has + سلسلة V3 (③ ④)",
    lines: [
      "اجعل الطالب يسمّع الجدول: I/You/We/They → have · He/She/It → has — بسرعة وبدون تفكير.",
      "أخطاء V2 بعد have/has هي الأكثر تكرارًا (I have went ✗) — اطلب من الطالب تصحيحها شفهيًا فورًا.",
      "اربط السلسلة go → went → gone بالدرس 27، وذكّر أن gone هي العمود الثالث.",
    ],
  },
  {
    head: "الاستخدام الأول: التجربة في الحياة (⑥ ⑦ ⑧)",
    lines: [
      "القاعدة الذكية: وقت ماضٍ محدد ومنتهٍ → Past Simple · تجربة دون وقت محدد → Present Perfect.",
      "استخدم زوج إيطاليا: I visited Italy in 2023 مقابل I have visited Italy — واجعل الطالب يحدد سبب الاختلاف.",
      "في ⑧ اجعل الطالب يكتشف الخطأ بنفسه قبل أن تعرض التصحيح؛ الهدف الإحساس بالخطأ لا حفظه.",
    ],
  },
  {
    head: "ever و never (⑨ ⑩)",
    lines: [
      "نمط ever: Have/Has + Subject + ever + V3 — وever تظهر كثيرًا في الأسئلة عن الخبرات.",
      "never تحمل النفي أصلًا: I have never seen it ✔ · I haven't never seen it ✗ — اشرح فكرة «نفي مزدوج» بالعربية والإنجليزية.",
      "تدريب سريع: حوّل أسئلة ever إلى إجابات قصيرة Yes, I have / No, I haven't.",
    ],
  },
  {
    head: "الاستخدام الثاني: النتيجة موجودة الآن (⑪ + 📸)",
    lines: [
      "لكل جملة اسأل: ما النتيجة الآن؟ المحفظة ليست معي · النظارة مكسورة · المفاتيح ضائعة · الباب مفتوح.",
      "زوج الحفظ: I lost my keys yesterday (متى؟) مقابل I have lost my keys (ما المشكلة الآن؟).",
      "هذا الزوج هو أسرع مقياس لاستيعاب الدرس — اطلب من الطالب توليد زوج مشابه بأنفسهم.",
    ],
  },
  {
    head: "الأحداث الحديثة: just / already / recently / lately (⑫–⑯)",
    lines: [
      "just = للتو · already = بالفعل · recently = مؤخرًا · lately = في الآونة الأخيرة — كلها تربط الحدث الحديث بالحاضر.",
      "already تقف بين المساعد والفعل: have/has + already + V3 — وليست في النهاية.",
      "yet للأسئلة والنفي وتأتي في نهاية الجملة — وقدّم الفرق مع already في جدول مقابلة (حدث · لم يحدث بعد).",
    ],
  },
  {
    head: "الفترة التي لم تنتهِ + الكلمة لا تحسم (⑰ ⑱)",
    lines: [
      "today / this morning / this week / this month / this year — فترات مستمرة تسمح بـ Present Perfect.",
      "إذا انتهت الفترة (last week) عاد Past Simple.",
      "قاعدة IQ200: لا تقل «today = Present Perfect دائمًا» — I finished the test today at 9:00 صحيحة لأننا حددنا حدثًا ووقتًا معينين.",
    ],
  },
  {
    head: "for / since و How long (⑲–㉒ ㉗)",
    lines: [
      "for + مدة (for five years) · since + نقطة بداية (since 2021) — اجعل الطالب يصنّف عشر عبارات شفهيًا.",
      "في ㉒ ارسم المسار: البداية في الماضي → الاستمرار → NOW — لماذا بقي الزمن Present Perfect؟ لأن الحالة ما زالت مرتبطة بالحاضر.",
      "How long يجاب دائمًا بـ for + مدة أو since + بداية.",
    ],
  },
  {
    head: "النفي والسؤال والإجابات القصيرة (㉓–㉖)",
    lines: [
      "النفي: Subject + have/has + not + V3 (haven't / hasn't).",
      "السؤال: Have/Has + Subject + V3? — وتذكّر: لا did مع Present Perfect.",
      "الإجابات القصيرة تعيد المساعد نفسه: Yes, she has. / No, she hasn't.",
      "أسئلة Wh تسبق التركيب نفسه: What have you done? · How many books have you read?",
    ],
  },
  {
    head: "المقارنات الحاسمة: Past Simple / Present Perfect / Past Perfect (㉘–㉚)",
    lines: [
      "لخّص الفروق بثلاث كلمات: حدث ماضٍ · ماضٍ مرتبط بالحاضر · ماضٍ قبل ماضٍ آخر.",
      "استخدم أمثلة المتحف الثلاثة، ثم أعد الطالب إلى الخط الزمني في ㉚ لفهم ترتيب X وY.",
      "اسأل: أي جملة تجيب على «متى؟» وأي جملة تجيب على «هل سبق؟».",
    ],
  },
  {
    head: "الأخطاء الأربعة والمحقق (㉛–㉟)",
    lines: [
      "الأخطاء الأربعة: have + seen + yesterday · has + went · did + have finished · doesn't have finished.",
      "في ㉟ درّب الطالب على خطوتين: حدّد موقع الخلل ثم اختر التصحيح — هذا يعمّق الفهم أكثر من عرض الجواب الصحيح.",
      "اجعل الطالب يشرح سبب الخطأ بكلماته؛ من يشرح الخطأ لا يكرره.",
    ],
  },
  {
    head: "مستوى IQ200: الاختيار الذكي وزوايا النظر (㊱–㊸)",
    lines: [
      "㊱ ثمانية أزواج متقابلة: نفس الفعل مع وقت محدد (Past Simple) ومع كلمة رابطة بالحاضر (Present Perfect).",
      "㊲ و㊳ الهدف ليس إجابة واحدة: maya/Daniel والطائرة تعلّم الطالب أن المعنى هو الذي يختار الزمن — ناقش المعنيين معًا.",
      "㊴ نص Lina نموذج مثالي للدمج: Present Perfect + Past Simple في نص واحد — اطلب من الطالب تعليل كل اختيار.",
    ],
  },
  {
    head: "Boss والكتابة الحرة والخريطة (㊵ ㊷ ㊹ ㊺)",
    lines: [
      "㊵ التحويل يعلّم شرطًا جوهريًا: حذف in 2021 لأن Present Perfect الأساسي لا يقبل وقتًا ماضيًا محددًا ومنتهيًا.",
      "㊷ تحدٍّ شخصي: إجابات حقيقية من حياة الطالب — راقب الصيغ السبع أثناء الكتابة الحية.",
      "㊸ يجمع الأزمنة الأربعة في أربع جمل لنفس الحدث — اطلب من الطالب رسم الخط الزمني لكل جملة.",
      "㊹ و㊺ للمراجعة النهائية وللربط بخريطة المنهج: بعد تثبيت Present Perfect ننتقل إلى Present Perfect Continuous.",
    ],
  },
];

export type TeacherSolution31 = { head: string; lines: string[] };

export const TEACHER_31_SOLUTIONS: TeacherSolution31[] = [
  {
    head: "㉟ المحقق — الحلول الثمانية",
    lines: [
      "① She has gone to school. (V3 بعد has)",
      "② I saw him yesterday. (وقت ماضٍ محدد ومنتهٍ)",
      "③ Have you eaten breakfast? (لا did مع Present Perfect)",
      "④ He has never visited Paris. (لا نفي مزدوج)",
      "⑤ They have finished the project. (They → have)",
      "⑥ Has she arrived? (She → Has في السؤال)",
      "⑦ I have lived here for five years. (مدة → for)",
      "⑧ She has worked here since 2022. (نقطة بداية → since)",
    ],
  },
  {
    head: "㊱ الاختيار الذكي — الحلول الثمانية",
    lines: [
      "① finished · ② have finished · ③ traveled · ④ has traveled",
      "⑤ solved · ⑥ have solved · ⑦ lost · ⑧ has lost",
      "التعليل: الأزواج الأربعة تتبادل بين وقت ماضٍ محدد (yesterday / in 2024 / last night / two days ago) وكلمة رابطة بالحاضر (already / before).",
      "اجعل الطالب يقرأ كل زوج مرة أخرى بصوت عالٍ ويلاحظ تغيّر المعنى — ㊱ يقول: لاحظ كيف تغير المعنى.",
    ],
  },
  {
    head: "㊲ ㊳ IQ200 — قراءة المعنى لا القاعدة",
    lines: [
      "Maya lost her passport → خبر عن حدث في الماضي · Maya has lost her passport → نتيجة مهمة الآن (ربما ما زال مفقودًا).",
      "Daniel went to the library → حدث ماضٍ · Daniel has gone to the library → غالبًا هو موجود هناك الآن أو لم يعد بعد.",
      "الطائرة: I have flown on a plane (تجربة) و I flew on a plane in 2022 (حدث محدد) — كلتاهما صحيحة، والمعنى مختلف.",
      "الخلاصة التي يجب أن ينطقها الطالب: الزمن اختيار زاوية نظر، وليس مجرد قاعدة.",
    ],
  },
  {
    head: "㊴ Boss Challenge — أزمنة نص Lina",
    lines: [
      "has always loved → Present Perfect · has visited → Present Perfect · has recently started → Present Perfect",
      "joined → Past Simple · built → Past Simple · has already completed → Present Perfect",
      "السبب: last year فترة ماضية منتهية (Past Simple) · this year فترة ما زالت مرتبطة بالحاضر (Present Perfect).",
    ],
  },
  {
    head: "㊵ تحويل اليابان",
    lines: [
      "I visited Japan in 2021. → I have visited Japan.",
      "حذفنا in 2021 لأن Present Perfect الأساسي لا يُستخدم مع وقت ماضٍ محدد ومنتهٍ مثل yesterday / last year / in 2021 / two days ago.",
      "اسأل الطالب: ماذا تغيّر في المعنى؟ صار التركيز على الخبرة لا على تاريخ الرحلة.",
    ],
  },
  {
    head: "㊶ for / since — الحلول الخمسة",
    lines: [
      "① since 2020 · ② for four years · ③ since childhood · ④ for six months · ⑤ since 2018",
      "قاعدة الذهب: for + مدة · since + بداية.",
      "تدريب إضافي: اطلب من الطالب تحويل since 2018 → for + عدد سنوات، والعكس.",
    ],
  },
  {
    head: "㊷ التحدي النهائي — إجابات نموذجية (للقياس لا للنسخ)",
    lines: [
      "① I have never ridden a horse. · ② I have already finished my homework. · ③ I have just arrived.",
      "④ I haven't eaten yet. · ⑤ Have you ever visited Turkey? · ⑥ I have lived in this city for six years.",
      "⑦ I have studied English since 2019.",
      "الشرط: إجابات حقيقية من حياة الطالب — الصيغة صحيحة والمعنى شخصي.",
    ],
  },
  {
    head: "㊸ Final Boss — أربع جمل، أربعة معانٍ",
    lines: [
      "① I ate the cake. → Past Simple — أكلت الكعكة. حدث ماضٍ.",
      "② I was eating the cake. → Past Continuous — الفعل كان جاريًا في لحظة ماضية.",
      "③ I had eaten the cake before they arrived. → Past Perfect — كنت قد أكلتها قبل وصولهم.",
      "④ I have eaten the cake. → Present Perfect — هناك علاقة بالحاضر.",
      "اطلب رسم خط زمني صغير لكل جملة — الرسم يكشف الفرق فورًا.",
    ],
  },
  {
    head: "مختبرات الدرس التفاعلية — حلول مختصرة",
    lines: [
      "③ have/has: I/You/We/They → have · He/She/It → has.",
      "④ V3: gone · eaten · seen · written · taken · broken · finished · played.",
      "⑤ المثبتة: cleaned · opened · built · forgotten · finished · eaten (والجذر forgotten من forget → forgot → forgotten).",
      "⑰ on the periods: today/this week/this year = فترات مفتوحة · last week = فترة مغلقة.",
      "㊸ ㊹ الخريطة: 📸 Past Simple · 🎥 Past Continuous · ⏪ Past Perfect · 🌉 Present Perfect.",
    ],
  },
];

export const TEACHER_31_RUBRICS: TeacherNote31[] = [
  {
    head: "㊷ التحدي النهائي — سلّم تقييم الكتابة الحقيقية",
    lines: [
      "المطلوب: سبع جمل شخصية تُكمل فيها البدايات السبع كما وردت في المصدر.",
      "المحلل الحي في الدرس يفحص النمط (never / already / just / yet / ever / for / since) — ومراجعتك للمعنى تبقى الأساس.",
      "معايير التقييم: صحة الصيغة (have/has + V3) · صحة موضع الكلمة الرابطة · صدق الإجابة الشخصية · وضوح المعنى.",
      "خصم مباشر: V2 بعد have/has · did مع Present Perfect · not مع never · for مع نقطة بداية · since مع مدة.",
      "امنح تقديرًا إضافيًا للطالب الذي يشرح لماذا اختار since أو for في جملتيه ⑥ و⑦.",
    ],
  },
  {
    head: "㊴ ㊸ التقييم الشفهي — تفسير زاوية النظر",
    lines: [
      "اطلب من الطالب قراءة نص Lina بصوت عالٍ ثم تعليل كل زمن: لماذا Present Perfect هنا ولماذا Past Simple هناك؟",
      "ثم اطلب منه أن يحوّل جملة من النص إلى الزمن الآخر ويشرح كيف تغيّر المعنى — هذا هو مستوى IQ200 الحقيقي.",
      "معيار الإتقان: يستخدم الطالب عبارات مثل «النتيجة مهمة الآن» و«الفترة انتهت» و«قبل حدث ماضٍ آخر» تلقائيًا.",
    ],
  },
];

export const TEACHER_31_MISTAKES: TeacherNote31[] = [
  { head: "V2 بعد have/has", lines: ["I have went ✗ · She has ate ✗ · He has wrote ✗ → المطلوب دائمًا V3: gone · eaten · written (القسم ④ و㉜)."] },
  { head: "did مع Present Perfect", lines: ["Did you have finished? ✗ → Have you finished? ✔ — مساعد واحد فقط (القسم ㉝)."] },
  { head: "doesn't / don't مع have + V3", lines: ["He doesn't have finished ✗ → He hasn't finished ✔ — لا نخلط Present Simple مع Present Perfect (القسم ㉞)."] },
  { head: "not + never", lines: ["I haven't never seen it ✗ → I have never seen it ✔ — never تحمل النفي (القسم ⑩ و㉟-④)."] },
  { head: "مدة ماضية محددة مع Present Perfect", lines: ["I have seen him yesterday ✗ → I saw him yesterday ✔ — yesterday / last year / in 2021 / two days ago تمنع Present Perfect الأساسي (القسم ㉛)."] },
  { head: "خلط for بـ since", lines: ["since five years ✗ → for five years ✔ · for 2022 ✗ → since 2022 ✔ (القسم ㉟-⑦⑧ و㊶)."] },
  { head: "خلط has مع الجمع", lines: ["They has finished ✗ → They have finished ✔ · Have she arrived? ✗ → Has she arrived? ✔ (القسم ③ و㉟-⑤⑥)."] },
  { head: "الاعتماد على كلمة واحدة", lines: ["today لا تعني Present Perfect دائمًا، و yesterday لا تعني Past Simple في كل سياق — المعنى والسياق هما الحكم (القسم ⑱)."] },
  { head: "ترجمة «لقد» حرفيًا", lines: ["كل «لقد» عربية لا تُترجم Present Perfect: «لقد زرت جدّي الأسبوع الماضي» تصبح I visited my grandfather last week لأن الفترة انتهت."] },
  { head: "استخدام Present Perfect مع سلسلة أحداث ماضية", lines: ["عند سرد قصة ماضية كاملة (حدثًا بعد حدث) يبقى السرد في Past Simple، وPresent Perfect للحالات المرتبطة بالحاضر فقط."] },
];

// ============================================================
// سجل الشرائح الدلالي (Semantic Step Registry) — 50 خطوة
// كل خطوة تُغطي قسمًا واحدًا من SOURCE_SECTIONS (تغطية دقيقة مرة واحدة).
// العرض الفعلي يُبنى من مكوّنات دلالية في Lesson31.tsx، وهذا السجل
// + SOURCE_SECTIONS هما دفتر الأستاذ للتدقيق فقط — لا يُعرض المصدر كنص خام.
// ============================================================
export type Slide31 = {
  id: string;
  section: string;
  mascot: string;
  title: string;
  step?: string;
  lead?: string;
  tip?: string;
  /** معرّفات أقسام المصدر التي تغطيها هذه الخطوة (مرة واحدة بالضبط عبر السجل كله) */
  source: string[];
};

export const SECTIONS_31: { id: string; label: string }[] = [
  { id: "START", label: "🌉 البداية" },
  { id: "FORM", label: "🧱 الصيغة والأساس" },
  { id: "USES", label: "🎯 الاستخدامات الكبرى" },
  { id: "EXP", label: "🧠 التجربة والنتيجة" },
  { id: "WORDS", label: "🔑 كلمات Present Perfect" },
  { id: "TIME", label: "⏳ for · since · How long" },
  { id: "QFORM", label: "❓ النفي والسؤال" },
  { id: "CLASH", label: "⚔️ المقارنات الحاسمة" },
  { id: "FIX", label: "🚨 صيد الأخطاء" },
  { id: "IQ", label: "🧠 مستوى IQ200" },
  { id: "BOSS", label: "🏆 التحديات النهائية" },
  { id: "END", label: "🏁 الخاتمة" },
];

export const SLIDES: Slide31[] = [
  {
    id: "cover", section: "START", mascot: "🌉", title: "جسر الحاضر", step: "الغلاف",
    lead: "المضارع التام: حدث قبل الآن… لكن النظر إليه من هذه اللحظة.",
    tip: "بدّل بين العدسات الثلاث لتشاهد فكرة الدرس كاملة قبل أن نبدأ.",
    source: ["cover"],
  },
  {
    id: "opening", section: "START", mascot: "🚀", title: "نكمل من حيث توقفنا", step: "الافتتاح",
    lead: "لا نعيد شرح الأساس: V3 درسناها في الدرس 27، ونظام الماضي اكتمل في الدرس 30.",
    tip: "المس كل بطاقة لتتذكر ما بنينا عليه قبل أن ندخل إلى الفكرة الجديدة.",
    source: ["opening"],
  },
  {
    id: "objectives", section: "START", mascot: "🎯", title: "أهداف الدرس", step: "الأهداف",
    lead: "تسع قدرات ستتقنها بنهاية الدرس — علّم عليها بنفسك.",
    tip: "اضغط على كل هدف بعد قراءته لتتابع تقدمك.",
    source: ["objectives"],
  },
  {
    id: "s1", section: "FORM", mascot: "🧠", title: "ما هو Present Perfect؟", step: "① التعريف",
    lead: "الصيغة الأساسية + الفكرة التي تجعله أكثر من «حدث في الماضي».",
    tip: "المس كل جزء من الصيغة لتعرف دوره، ثم اكتشف الفكرة الأهم.",
    source: ["s1"],
  },
  {
    id: "s2", section: "FORM", mascot: "⭐", title: "لماذا اسمه Present Perfect؟", step: "② الاسم",
    lead: "لأننا نتحدث عن شيء حدث قبل الآن… وننظر إليه من نقطة الحاضر.",
    tip: "حرّك النقطة X وشاهد متى نحتاج Present Perfect.",
    source: ["s2"],
  },
  {
    id: "s3", section: "FORM", mascot: "🧩", title: "have أم has؟", step: "③ المساعد",
    lead: "سبعة ضمائر… مساعدان فقط — وشتّان بينهما.",
    tip: "المس كل ضمير ليظهر مساعده ومثاله فورًا.",
    source: ["s3"],
  },
  {
    id: "s4", section: "FORM", mascot: "🧠", title: "ماذا يأتي بعد have/has؟", step: "④ V3",
    lead: "بعد have أو has نستخدم V3 = Past Participle — لا V2.",
    tip: "المس كل فعل لتكتمل سلسلته حتى gone / eaten / written، ثم اكتشف الأخطاء الأربعة.",
    source: ["s4"],
  },
  {
    id: "s5", section: "FORM", mascot: "🏗️", title: "الجملة المثبتة", step: "⑤ البناء",
    lead: "Subject + have/has + V3 — ست جمل نبنيها بأنفسنا.",
    tip: "المس أجزاء الجملة بالترتيب — كل لمسة تُصحَّح فورًا.",
    source: ["s5"],
  },
  {
    id: "s6", section: "USES", mascot: "🔥", title: "أول استخدام: التجربة في الحياة", step: "⑥ التجربة",
    lead: "نتحدث عن تجربة حدثت في حياتنا، دون تحديد وقت ماضٍ منتهٍ.",
    tip: "صنّف كل جملة: هل حددنا وقتًا أم نتحدث عن تجربة؟",
    source: ["s6"],
  },
  {
    id: "s7", section: "USES", mascot: "⚠️", title: "الفرق الخطير مع Past Simple", step: "⑦ القاعدة الذكية",
    lead: "I visited Italy in 2023… أم I have visited Italy؟ الفرق كله في كلمة واحدة.",
    tip: "أضف in 2023 وأزلها وشاهد الزمن يتغير لحظيًا.",
    source: ["s7"],
  },
  {
    id: "s8", section: "USES", mascot: "🕵️", title: "Grammar Detective — لندن 2022", step: "⑧ المحقق",
    lead: "جملة تبدو صحيحة تمامًا… وفيها خطأ واحد حاسم.",
    tip: "خطوتان: المس الجزء الخاطئ أولًا، ثم اختر التصحيح.",
    source: ["s8"],
  },
  {
    id: "s9", section: "EXP", mascot: "⭐", title: "ever = هل سبق أن...؟", step: "⑨ ever",
    lead: "السؤال عن الخبرات: Have/Has + Subject + ever + V3?",
    tip: "ابنِ السؤال بلمس الكلمات، ثم تابع الإجابات القصيرة.",
    source: ["s9"],
  },
  {
    id: "s10", section: "EXP", mascot: "⭐", title: "never = لم يسبق أبدًا", step: "⑩ never",
    lead: "never نفي كامل… فما الذي يحدث لو أضفنا not؟",
    tip: "اختر الجملة الصحيحة واكتشف فخّ النفي المزدوج.",
    source: ["s10"],
  },
  {
    id: "s11", section: "EXP", mascot: "🔥", title: "ثاني استخدام: نتيجة موجودة الآن", step: "⑪ النتيجة",
    lead: "أربع جمل… ولكل جملة نتيجة قائمة أمام عينيك الآن.",
    tip: "المس كل جملة لتكشف نتيجتها الحالية.",
    source: ["s11"],
  },
  {
    id: "pspp", section: "EXP", mascot: "📸", title: "Past Simple مقابل Present Perfect", step: "📸 الزوج الحاسم",
    lead: "زوج واحد يجب أن تحفظه: I lost my keys yesterday · I have lost my keys.",
    tip: "لكل جملة سؤال واحد فقط تجيب عنه — اكتشفه.",
    source: ["pspp"],
  },
  {
    id: "s12", section: "EXP", mascot: "⭐", title: "ثالث استخدام: شيء حدث مؤخرًا", step: "⑫ الأحداث الحديثة",
    lead: "just · already · recently · lately — أربع كلمات تربط الحديث بالحاضر.",
    tip: "المس كل جملة لتكشف ترجمتها والكلمة الرابطة فيها.",
    source: ["s12"],
  },
  {
    id: "s13", section: "WORDS", mascot: "⭐", title: "already = بالفعل", step: "⑬ already",
    lead: "الشيء حدث قبل الوقت المتوقع أو قبل الآن.",
    tip: "المس موضع already الصحيح داخل الجملة.",
    source: ["s13"],
  },
  {
    id: "s14", section: "WORDS", mascot: "⭐", title: "just = للتو", step: "⑭ just",
    lead: "have/has + just + V3 — النمط الأشهر في الأحداث الحديثة.",
    tip: "أكمل كل جملة بلمس الجزء الناقص.",
    source: ["s14"],
  },
  {
    id: "s15", section: "WORDS", mascot: "⭐", title: "yet = بعد / حتى الآن", step: "⑮ yet",
    lead: "في الأسئلة والنفي… وغالبًا في نهاية الجملة.",
    tip: "لاحظ موضع yet في كل جملة قبل أن تجيب.",
    source: ["s15"],
  },
  {
    id: "s16", section: "WORDS", mascot: "🧠", title: "الفرق بين already و yet", step: "⑯ المقابلة",
    lead: "already: حدث الشيء · yet: نسأل أو نقول إنه لم يحدث حتى الآن.",
    tip: "صنّف الجمل الأربع إلى سلّتين: already أم yet.",
    source: ["s16"],
  },
  {
    id: "s17", section: "TIME", mascot: "⭐", title: "رابع استخدام: فترة لم تنتهِ بعد", step: "⑰ الفترات",
    lead: "today · this morning · this week · this month · this year — الفترة ما زالت مستمرة.",
    tip: "افتح الفترة وأغلقها وشاهد الزمن يتغير.",
    source: ["s17"],
  },
  {
    id: "s18", section: "TIME", mascot: "⚠️", title: "لا تعتمد على كلمة واحدة فقط", step: "⑱ قاعدة IQ200",
    lead: "today ليست Present Perfect دائمًا — المعنى والسياق هما الحكم.",
    tip: "اقرأ الجملتين المتقابلتين ثم اختر القاعدة الصحيحة.",
    source: ["s18"],
  },
  {
    id: "s19", section: "TIME", mascot: "⭐", title: "for و since", step: "⑲ القاعدتان",
    lead: "for = مدة زمنية · since = نقطة بداية.",
    tip: "صنّف كل عبارة إلى for أم since بلمسة واحدة.",
    source: ["s19"],
  },
  {
    id: "s20", section: "TIME", mascot: "🧩", title: "Present Perfect + for", step: "⑳ for",
    lead: "أربع جمل تقيس مدة زمنية ممتدة حتى الآن.",
    tip: "حدّد المدة داخل كل جملة — وتذكّر أنها مستمرة.",
    source: ["s20"],
  },
  {
    id: "s21", section: "TIME", mascot: "🧩", title: "Present Perfect + since", step: "㉑ since",
    lead: "أربع جمل تبدأ من نقطة محددة في الماضي.",
    tip: "قارن كل جملة بـ for: أين المدة وأين نقطة البداية؟",
    source: ["s21"],
  },
  {
    id: "s22", section: "TIME", mascot: "🔥", title: "لماذا Present Perfect هنا؟", step: "㉒ الاستمرار",
    lead: "لأن الحالة بدأت في الماضي وما زالت مرتبطة بالحاضر.",
    tip: "شاهد المسار: البداية… الاستمرار… NOW.",
    source: ["s22"],
  },
  {
    id: "s23", section: "QFORM", mascot: "⭐", title: "النفي", step: "㉓ haven't / hasn't",
    lead: "Subject + have/has + not + V3 — ست جمل منفية.",
    tip: "أكمل كل جملة بالمساعد الصحيح.",
    source: ["s23"],
  },
  {
    id: "s24", section: "QFORM", mascot: "🧠", title: "الأسئلة Yes/No", step: "㉔ السؤال",
    lead: "Have/Has + Subject + V3? — نبدأ بالمساعد.",
    tip: "ابنِ كل سؤال بلمس الكلمات بالترتيب.",
    source: ["s24"],
  },
  {
    id: "s25", section: "QFORM", mascot: "⭐", title: "الإجابات القصيرة", step: "㉕ Short answers",
    lead: "السؤال يعيد مساعده: Yes, she has. · No, she hasn't.",
    tip: "طابِق كل سؤال مع إجابته القصيرة.",
    source: ["s25"],
  },
  {
    id: "s26", section: "QFORM", mascot: "🧠", title: "Wh Questions", step: "㉖ الأسئلة",
    lead: "What · Where · Why · Who · How many · How long.",
    tip: "اختر أداة السؤال المناسبة لكل معنى.",
    source: ["s26"],
  },
  {
    id: "s27", section: "QFORM", mascot: "🔥", title: "السؤال العبقري: How long?", step: "㉗ How long",
    lead: "منذ متى / كم من الوقت؟ — ويُجاب بـ for + مدة أو since + بداية.",
    tip: "ابنِ إجابتين لنفس السؤال: واحدة بـ for وواحدة بـ since.",
    source: ["s27"],
  },
  {
    id: "s28", section: "CLASH", mascot: "⚔️", title: "المقارنة الأهم في الدرس", step: "㉘ PS vs PP",
    lead: "Past Simple يسأل: متى؟ · Present Perfect يجيب: هل سبق؟",
    tip: "افتح كل جملة لترى السؤال الذي تجيب عنه.",
    source: ["s28"],
  },
  {
    id: "s29", section: "CLASH", mascot: "🔥", title: "مقارنة ثلاثية: PS / PP / Past Perfect", step: "㉙ المستوى الأعلى",
    lead: "المتحف نفسه… ثلاث زوايا نظر مختلفة.",
    tip: "طابِق كل جملة مع زمنها وسببها.",
    source: ["s29"],
  },
  {
    id: "s30", section: "CLASH", mascot: "🧠", title: "خط زمني خارق", step: "㉚ الخط الزمني",
    lead: "X قبل الآن في Present Perfect… وX قبل Y في Past Perfect مقابل Past Simple.",
    tip: "المس كل عقدة على الخط الزمني لتعرف زمنها.",
    source: ["s30"],
  },
  {
    id: "s31", section: "FIX", mascot: "🚨", title: "خطأ شهير جدًا", step: "㉛ الخطأ الأول",
    lead: "I have seen him yesterday — لماذا يرفضها Present Perfect؟",
    tip: "المس الجزء الخاطئ ثم اختر التصحيح.",
    source: ["s31"],
  },
  {
    id: "s32", section: "FIX", mascot: "🚨", title: "خطأ آخر", step: "㉜ الخطأ الثاني",
    lead: "She has went home — كلمة واحدة مكسورة تكفي.",
    tip: "ابحث عن الخطأ وحدّه بدقة قبل التصحيح.",
    source: ["s32"],
  },
  {
    id: "s33", section: "FIX", mascot: "🚨", title: "خطأ ثالث", step: "㉝ الخطأ الثالث",
    lead: "Did you have finished؟ مساعدان في سؤال واحد!",
    tip: "احذف المساعد الزائد وابنِ السؤال الصحيح.",
    source: ["s33"],
  },
  {
    id: "s34", section: "FIX", mascot: "🚨", title: "خطأ رابع", step: "㉞ الخطأ الرابع",
    lead: "He doesn't have finished — خلط بين نظامين.",
    tip: "اختر الصيغة التي تنتمي إلى Present Perfect فقط.",
    source: ["s34"],
  },
  {
    id: "s35", section: "FIX", mascot: "🕵️", title: "Grammar Detective — ثمانية أخطاء", step: "㉟ المحقق",
    lead: "ثماني جمل مكسورة… وثمانية تصحيحات من المصدر نفسه.",
    tip: "لكل جملة خطوتان: أين الخطأ؟ وما التصحيح؟",
    source: ["s35"],
  },
  {
    id: "s36", section: "IQ", mascot: "🧠", title: "تحدي الاختيار الذكي", step: "㊱ الاختيار",
    lead: "ثمانية أزواج: Present Perfect أم Past Simple — المعنى يحسم.",
    tip: "انظر إلى الكلمة الحاسمة في كل جملة قبل أن تختار.",
    source: ["s36"],
  },
  {
    id: "s37", section: "IQ", mascot: "🔥", title: "IQ200 — اكتشف المعنى", step: "㊲ زاوية النظر",
    lead: "Maya lost · Maya has lost · Daniel went · Daniel has gone — ما الفرق؟",
    tip: "اكشف قراءة كل جملة قبل أن تنتقل إلى التالية.",
    source: ["s37"],
  },
  {
    id: "s38", section: "IQ", mascot: "🧠", title: "تحدي أعمق", step: "㊳ الطائرة",
    lead: "«هل سبق أن ركبت طائرة؟» — جملتان صحيحتان، ومعنيان مختلفان.",
    tip: "اختر الجملة الأنسب حسب الموقف ثم اقرأ التعليل.",
    source: ["s38"],
  },
  {
    id: "s39", section: "IQ", mascot: "🏆", title: "Boss Challenge — قصة Lina", step: "㊴ الزعيم",
    lead: "ستة أفعال مرتبطة بالعلم… وثلاثة أزمنة تتبادل داخل نص واحد.",
    tip: "حدّد زمن كل فعل — وانتبه إلى last year و this year.",
    source: ["s39"],
  },
  {
    id: "s40", section: "IQ", mascot: "🚀", title: "IQ200 — حوّل الجملة", step: "㊵ التحويل",
    lead: "I visited Japan in 2021 — كيف تصبح Present Perfect بشكل صحيح؟",
    tip: "جرّب بنفسك: ماذا يجب أن نحذف قبل أن نغيّر الصيغة؟",
    source: ["s40"],
  },
  {
    id: "s41", section: "IQ", mascot: "🧩", title: "تحدي for / since", step: "㊶ الخمسة",
    lead: "خمس جمل… اختر الكلمة الصحيحة في كل واحدة.",
    tip: "اسأل نفسك: مدة أم نقطة بداية؟",
    source: ["s41"],
  },
  {
    id: "s42", section: "BOSS", mascot: "🔥", title: "التحدي النهائي — اكتب عن نفسك", step: "㊷ الكتابة",
    lead: "سبع بدايات… وسبع جمل حقيقية من حياتك.",
    tip: "المحلل الحي يتحقق من النمط أثناء كتابتك — لا تنتظر التصحيح.",
    source: ["s42"],
  },
  {
    id: "s43", section: "BOSS", mascot: "🏆", title: "Final Boss — أربع جمل، أربعة معانٍ", step: "㊸ الزعيم النهائي",
    lead: "الكعكة نفسها… أربع زوايا زمنية مختلفة.",
    tip: "طابِق كل جملة مع زمنها ومعناها.",
    source: ["s43"],
  },
  {
    id: "s44", section: "BOSS", mascot: "🧠", title: "الخريطة الكبرى", step: "㊹ الخريطة",
    lead: "أربع عدسات: 📸 🎥 ⏪ 🌉 — والآن صار Present Perfect جزءًا من النظام.",
    tip: "بدّل العدسات لتراجع كل زمن ومثاله.",
    source: ["s44"],
  },
  {
    id: "s45", section: "END", mascot: "⭐", title: "ملخص الدرس 31", step: "㊺ الملخص",
    lead: "الصيغة · أهم الاستخدامات الخمسة · الكلمات العشر · القاعدة الذهبية.",
    tip: "مرّ على الاستخدامات واحدًا واحدًا وعيّن ما تتقنه وما يحتاج مراجعة.",
    source: ["s45"],
  },
  {
    id: "map", section: "END", mascot: "🗺️", title: "خريطة المنهج حتى الآن", step: "الخريطة",
    lead: "Present: نحن هنا عند Present Perfect · Past: اكتمل نظامه · ثم المستقبل.",
    tip: "المس كل محطة لتعرف موقعها في الرحلة.",
    source: ["map"],
  },
];

export const SLIDE_COUNT = SLIDES.length;
