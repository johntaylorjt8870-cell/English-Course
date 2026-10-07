// Lesson 29 source ledger. The supplied Arabic source is authoritative; English examples are
// deliberately kept in LTR strings and are never rewritten by the renderer.
export type SourceSection29 = { id:string; num?:number; title:string; units:string[] };
const s=(num:number,title:string,...units:string[]):SourceSection29=>({id:`s${num}`,num,title,units});
export const SOURCE_SECTIONS:SourceSection29[]=[
{id:'cover',title:'الدرس 29: Past Perfect Continuous — الماضي التام المستمر',units:['الدرس 29: Past Perfect Continuous — الماضي التام المستمر','🧠 IQ200 — كيف نصف شيئًا كان مستمرًا قبل حدث ماضٍ آخر؟']},
{id:'objectives',title:'🎯 أهداف الدرس',units:['① فهم فكرة Past Perfect Continuous.','② تكوين الجملة المثبتة.','③ تكوين النفي والأسئلة والإجابات القصيرة.','④ فهم العلاقة بين had been و verb-ing.','⑤ استخدام for و since.','⑥ التمييز بين Past Perfect و Past Perfect Continuous.','⑦ التمييز بين Past Continuous و Past Perfect Continuous.','⑧ فهم متى نركز على النتيجة ومتى نركز على المدة والنشاط.','⑨ استخدام الزمن في القصص.','⑩ اكتشاف الأخطاء المتقدمة.']},
 s(1,'① 🧠 ما هو Past Perfect Continuous؟','Past Perfect Continuous = الماضي التام المستمر','الفكرة: نشاط بدأ في الماضي، واستمر لفترة، ثم وصلنا إلى نقطة ماضية أخرى.','I had been studying for three hours when my friend called.','① بدأت الدراسة. ② استمرت الدراسة. ③ بعد ثلاث ساعات اتصل صديقي.','had been studying يدل على نشاط بدأ قبل نقطة ماضية واستمر لفترة.'),
 s(2,'② 🕰️ خط الزمن','بدأت الدراسة ↓ 📚📚📚📚📚 ↓ اتصال صديقي ↓ الآن','I had been studying for three hours when my friend called.','بدأ قبل الحدث · استمر لفترة · كان مرتبطًا بنقطة ماضية.'),
 s(3,'③ ⭐ القاعدة الذهبية','Subject + had been + verb-ing','had + been + verb-ing','I had been waiting.','She had been studying.','He had been working.','We had been talking.','They had been playing.'),
 s(4,'④ 🔥 أهم شيء: had لا تتغير','I had been · You had been · He had been · She had been · It had been · We had been · They had been','He has been... ❌','He had been... ✅'),
 s(5,'⑤ 🧩 لماذا نستخدم been؟','had → جزء الماضي التام','been → الشكل الثالث من be','studying → النشاط المستمر','had + been + studying'),
 s(6,'⑥ 🧠 قارن','I had studied.','I had been studying.','Past Perfect يركز أكثر على اكتمال الفعل أو النتيجة.','Past Perfect Continuous يركز أكثر على النشاط والمدة والاستمرار.','هذا فرق دلالي مفيد وليس قاعدة آلية مطلقة.'),
 s(7,'⑦ 🎯 مثال واضح جدًا','I had cleaned the room before my parents arrived.','التركيز: الغرفة أصبحت نظيفة / النتيجة المكتملة.','I had been cleaning the room for two hours before my parents arrived.','التركيز: النشاط + مدة ساعتين.'),
 s(8,'⑧ ⏱️ for','for = لمدة','for two hours · for three days · for five weeks · for a long time','She had been waiting for two hours when the bus arrived.'),
 s(9,'⑨ 🕰️ since','since = منذ','since 8:00 · since Monday · since January · since morning','He had been working since early morning when his manager called.'),
 s(10,'⑩ 🚨 الفرق بين for و since','for + مدة: for two hours · for three years · for ten minutes','since + نقطة بداية: since Monday · since 2020 · since 7:30','FOR = كم مدة؟','SINCE = منذ متى؟'),
 s(11,'⑪ 🧠 مثال IQ200','I had been studying for four hours.','How long? Four hours. Therefore: for four hours.','I had been studying since 6:00.','Since when? 6:00. Therefore: since 6:00.'),
 s(12,'⑫ 🔥 أمثلة متنوعة','She had been reading for an hour when the lights went out.','They had been traveling for two days when they reached the village.','He had been practicing the piano since morning when his neighbor complained.','We had been waiting for thirty minutes when the doctor finally arrived.'),
 s(13,'⑬ 🎥 Past Continuous أم Past Perfect Continuous؟','Past Continuous: I was studying when Ali called.','Past Perfect Continuous: I had been studying for three hours when Ali called.','الأول: ماذا كنت أفعل في تلك اللحظة؟ الثاني: منذ متى كنت أدرس قبل الاتصال؟'),
 s(14,'⑭ 🧠 الفرق في الصورة','Past Continuous: 📞 Ali calls ↑ 📚 I was studying','Past Perfect Continuous: بدأت الدراسة ↓ 📚📚📚📚 ↓ 📞 Ali called','النشاط عند لحظة الاتصال مقابل مدة النشاط قبل الاتصال.'),
 s(15,'⑮ 🔥 Past Perfect أم Past Perfect Continuous؟','I had repaired the bicycle before my brother arrived.','I had been repairing the bicycle for two hours before my brother arrived.','الأولى تركّز على النتيجة، والثانية على عملية الإصلاح والمدة.'),
 s(16,'⑯ 🧠 ليس دائمًا الفرق "نتيجة مقابل مدة" فقط','Past Perfect Continuous قد يبرز نشاطًا مستمرًا أو متكررًا أو نشاطًا أدى إلى أثر ظاهر.','He was tired because he had been running.','المعنى أولًا، ثم الاختيار؛ ليست نتيجة مقابل مدة قاعدة مطلقة.'),
 s(17,'⑰ 💡 الأثر الظاهر','Her clothes were wet because she had been walking in the rain.','Result: Her clothes were wet. Cause/activity: She had been walking in the rain.','The ground was muddy because it had been raining.','النشاط المستمر يفسر الحالة أو النتيجة.'),
 s(18,'⑱ 🧠 لا يعني أن الفعل يجب أن يستمر حتى الحدث الثاني','He had been working all morning, so he was exhausted.','لا يعني بالضرورة أنه كان لا يزال يعمل في لحظة الإرهاق؛ النشاط السابق ساهم في الحالة.'),
 s(19,'⑲ 🚨 الأفعال التي لا نستخدمها عادةً في Continuous','know · believe · understand · want · need · remember · like · love · hate','I had known him for years. ✅','I had been knowing him for years. ❌','She had known the answer for a long time before she told us.','هذه قاعدة تعليمية أساسية وليست حكمًا مطلقًا على كل تنوعات الإنجليزية.'),
 s(20,'⑳ ⭐ Past Perfect Continuous مع الأفعال المنتظمة','work → working · play → playing · study → studying · clean → cleaning · wait → waiting','They had been working all afternoon.'),
 s(21,'㉑ 🔤 قواعد -ing','Most verbs: work → working · read → reading · play → playing','Final e: make → making · write → writing · drive → driving · take → taking','Short verbs / consonant doubling: run → running · sit → sitting · swim → swimming · stop → stopping'),
 s(22,'㉒ ❌ النفي','Subject + had not been + verb-ing','Subject + hadn\'t been + verb-ing','I hadn\'t been sleeping.','She hadn\'t been studying.','They hadn\'t been waiting.','He hadn\'t been working.','We hadn\'t been talking.'),
 s(23,'㉓ ❓ الأسئلة','Had + subject + been + verb-ing?','Had you been waiting long?','Had she been studying?','Had they been playing football?','Had he been working all day?'),
 s(24,'㉔ 🗣️ الإجابات القصيرة','Had you been waiting? Yes, I had. No, I hadn\'t.','Had she been studying? Yes, she had. No, she hadn\'t.','Had they been traveling? Yes, they had. No, they hadn\'t.','Short answer uses had, not been.'),
 s(25,'㉕ 🧠 Wh Questions','What had you been doing?','Where had they been staying?','Why had she been crying?','How long had he been working there?','How long is particularly important because it asks about duration.'),
 s(26,'㉖ ⭐ How long','How long had you been waiting when the bus arrived?','I had been waiting for forty minutes.'),
 s(27,'㉗ 🔥 for + Past Perfect Continuous','She had been studying for three hours when her brother interrupted her.','بدأت الدراسة ↓ استمرت 3 ساعات ↓ brother interrupted'),
 s(28,'㉘ 🔥 since + Past Perfect Continuous','They had been living there since 2018 when they decided to move.'),
 s(29,'㉙ 🧠 مقارنة شاملة','Past Simple: I studied. → past event','Past Continuous: I was studying. → activity in progress at a past moment','Past Perfect: I had studied. → event completed before another past event','Past Perfect Continuous: I had been studying. → activity continuing/recurring for a period before another past point'),
 s(30,'㉚ 🎯 مثال واحد يجمع الأربعة','I studied English yesterday.','I was studying English at 8:00.','I had studied English before I moved abroad.','I had been studying English for three years before I moved abroad.'),
 s(31,'㉛ 🕵️ Grammar Detective','When Daniel arrived at the gym, his friends had already been training for two hours.','arrived → Past Simple','had already been training → Past Perfect Continuous','training began ↓ two hours passed ↓ Daniel arrived'),
 s(32,'㉜ 🔥 Past Perfect vs Past Perfect Continuous','The scientists had completed the experiment before the visitors arrived.','The scientists had been conducting the experiment for six hours before the visitors arrived.','same broad past-before-past relationship, different viewpoint.'),
 s(33,'㉝ 🧠 سؤال IQ200','Her eyes were red because she had cried.','Her eyes were red because she had been crying.','Source answer: B. B better foregrounds the activity leading to the visible effect; A is not grammatically impossible.'),
 s(34,'㉞ 🧠 سؤال أصعب','I had repaired the car before my father arrived.','I had been repairing the car before my father arrived.','Both can be possible. A focuses on completion/result; B focuses on repair activity/process, possibly duration.'),
 s(35,'㉟ 🚨 لا تستخدمه فقط لأن هناك for','I had known Sarah for ten years before we moved.','I had been knowing Sarah for ten years. ❌','for does not automatically require Past Perfect Continuous. Meaning first, then rule.'),
 s(36,'㊱ 🧪 تمرين 1','I ______ for two hours when my friend called. A) studied B) was studying C) had been studying','She was tired because she ______ all morning. A) had been running B) ran C) was run','They ______ the project before the manager arrived. A) had completed B) had been completing C) were complete','We ______ for thirty minutes when the bus finally arrived. A) had been waiting B) waited C) had wait','His clothes were wet because he ______ in the rain. A) had been walking B) had walked C) was walk','Answers: ① C ② A ③ A ④ A ⑤ A'),
 s(37,'㊲ 🧪 تمرين 2 — for أم since؟','She had been studying ______ three hours. A) for B) since','They had been living there ______ 2019. A) for B) since','I had been waiting ______ twenty minutes. A) for B) since','He had been working there ______ Monday. A) for B) since','We had been traveling ______ two weeks. A) for B) since','Answers: for, since, for, since, for.'),
 s(38,'㊳ 🧪 تمرين 3 — صحح الخطأ','She had been study for two hours. → She had been studying for two hours.','They had been waited for the bus. → They had been waiting for the bus.','He had been knowing her for years. → He had known her for years.','Had you been wait long? → Had you been waiting long?','I hadn\'t been sleep well. → I hadn\'t been sleeping well.'),
 s(39,'㊴ 🚀 IQ200 — اختر الزمن من المعنى','عندما وصلت، كان سامر يقرأ. → He was reading when I arrived.','عندما وصلت، كان سامر قد قرأ الكتاب. → He had read the book when I arrived.','عندما وصلت، كان سامر يقرأ الكتاب منذ ساعتين. → He had been reading the book for two hours when I arrived.','meaning: moment · completion · duration/activity.'),
 s(40,'㊵ 🧠 تحدي الزمن الذكي','When the coach arrived, the players had been practicing for an hour.','Did practice begin before the coach arrived? Yes.','Was there ongoing activity? Yes.','Is duration stated? Yes.','Therefore: Past Perfect Continuous.'),
 s(41,'㊶ 🎬 قصة متقدمة','When Mia arrived at the science lab, the students had been working for nearly three hours. Some students were testing a small robot, while others were writing notes. The teacher had already checked the first experiment, but the students were still preparing the second one. Mia was tired because she had been walking quickly from the library.','had been working → activity continued before Mia\'s arrival','were testing / were writing → ongoing at that moment','had already checked → completed earlier event','were still preparing → ongoing activity','was tired → past state','had been walking → earlier continuous activity contributing to tiredness'),
 s(42,'㊷ 🧠 خريطة القصة','Students: started working ↓ worked for nearly three hours ↓ Mia arrived ↓ students were still working','Mia: started walking ↓ continued walking quickly ↓ arrived ↓ was tired','This must be read as a meaningful visual timeline.'),
 s(43,'㊸ 🏆 Boss Battle','The ground was wet because it had rained. OR The ground was wet because it had been raining. Preferred: B.','I had finished the report before the meeting. OR I had been finishing the report before the meeting. Preferred: A.','I had finished the report for four hours. OR I had been working on the report for four hours before the meeting. Preferred: B.'),
 s(44,'㊹ 🧠 قاعدة IQ200 النهائية','When you see Past Perfect Continuous, do not think only had been + ing.','1. What is the activity? 2. Did it begin before a past point? 3. Did it continue for a period? 4. Are we emphasizing continuity/activity/duration or its effect?','If appropriate: Past Perfect Continuous.'),
{id:'summary',title:'🏆 الملخص النهائي',units:['Past Perfect Continuous: Subject + had been + verb-ing','I had been studying.','Negative: I hadn\'t been studying.','Question: Had you been studying?','Duration: for two hours','Starting point: since 7:00']},
{id:'four-tense',title:'⚔️ الفرق النهائي بين الأزمنة الأربعة',units:['Past Simple: I studied. → past event','Past Continuous: I was studying. → activity in progress at a past moment','Past Perfect: I had studied. → event before another past event','Past Perfect Continuous: I had been studying. → activity continuing/recurring for a period before another past point']},
{id:'final',title:'🚀 FINAL IQ200 CHALLENGE',units:['When the rescue team arrived, the villagers had been waiting for several hours, the rain was still falling, and the river had already flooded the main road.','arrived → Past Simple → rescue team arrival','had been waiting → Past Perfect Continuous → began before arrival and continued for several hours','was falling → Past Continuous → ongoing at that point','had already flooded → Past Perfect → flooding happened before arrival','The student can now construct a complete timeline using four past tenses rather than memorizing four isolated rules.']}
];
export const SOURCE_NUMBERED_COUNT=44;
export const SOURCE_LEDGER_COUNT=SOURCE_SECTIONS.length;

// ============================================================
// فهرس سجل المصدر — id ← index (المرجع الوحيد للوحدات الحرفية)
// ============================================================
export const SEC29: Record<string, number> = Object.fromEntries(SOURCE_SECTIONS.map((s, i) => [s.id, i]));

/** وحدات قسم مصدري بالمعرّف — تُستهلك داخل المكوّنات المصممة، لا كـ dump. */
export function U29(id: string): string[] {
  return SOURCE_SECTIONS[SEC29[id]].units;
}

// ============================================================
// بيانات التدريبات التفاعلية — المحتوى من المصدر حرفيًا،
// و«السبب» العربي بعد كل إجابة شرح منصة (Platform Explanation).
// الإجابات الواردة في المصدر (Answers: …) لا تُعرض إلا بعد المحاولة.
// ============================================================

export type Mcq29 = { stem: string; ar?: string; opts: string[]; answer: number; why: string };

// ㊱ تمرين 1 — اختر الصيغة الصحيحة (الجمل والخيارات من المصدر حرفيًا)
export const EX29_FILL: Mcq29[] = [
  {
    stem: "I ______ for two hours when my friend called.",
    opts: ["studied", "was studying", "had been studying"],
    answer: 2,
    why: "مدة (for two hours) + نقطة ماضية لاحقة (when my friend called) ← had been studying.",
  },
  {
    stem: "She was tired because she ______ all morning.",
    opts: ["had been running", "ran", "was run"],
    answer: 0,
    why: "نشاط مستمر سابق يفسّر الأثر الظاهر (التعب) ← had been running.",
  },
  {
    stem: "They ______ the project before the manager arrived.",
    opts: ["had completed", "had been completing", "were complete"],
    answer: 0,
    why: "التركيز هنا على الاكتمال قبل حدث ماضٍ ← Past Perfect: had completed.",
  },
  {
    stem: "We ______ for thirty minutes when the bus finally arrived.",
    opts: ["had been waiting", "waited", "had wait"],
    answer: 0,
    why: "انتظار استمر مدة (for thirty minutes) قبل وصول الباص ← had been waiting.",
  },
  {
    stem: "His clothes were wet because he ______ in the rain.",
    opts: ["had been walking", "had walked", "was walk"],
    answer: 0,
    why: "نشاط مستمر سابق ترك أثرًا ظاهرًا (الملابس المبللة) ← had been walking.",
  },
];

// ㊲ تمرين 2 — for أم since؟ (الجمل من المصدر حرفيًا)
export const EX29_FORSINCE: Mcq29[] = [
  { stem: "She had been studying ______ three hours.", opts: ["for", "since"], answer: 0, why: "three hours مدة ← for." },
  { stem: "They had been living there ______ 2019.", opts: ["for", "since"], answer: 1, why: "2019 نقطة بداية ← since." },
  { stem: "I had been waiting ______ twenty minutes.", opts: ["for", "since"], answer: 0, why: "twenty minutes مدة ← for." },
  { stem: "He had been working there ______ Monday.", opts: ["for", "since"], answer: 1, why: "Monday نقطة بداية ← since." },
  { stem: "We had been traveling ______ two weeks.", opts: ["for", "since"], answer: 0, why: "two weeks مدة ← for." },
];

// ㊳ تمرين 3 — المس الجزء الخاطئ ثم اكشف التصحيح (من المصدر حرفيًا)
export type Fix29 = { segs: string[]; bad: number; correct: string; why: string };
export const EX29_FIX: Fix29[] = [
  { segs: ["She had been", "study", "for two hours."], bad: 1, correct: "She had been studying for two hours.", why: "بعد been يأتي الفعل بصيغة verb-ing." },
  { segs: ["They had been", "waited", "for the bus."], bad: 1, correct: "They had been waiting for the bus.", why: "بعد been نستخدم verb-ing وليس V2." },
  { segs: ["He", "had been knowing", "her for years."], bad: 1, correct: "He had known her for years.", why: "know فعل حالة — لا يُستخدم عادةً في الصيغ المستمرة." },
  { segs: ["Had you", "been wait", "long?"], bad: 1, correct: "Had you been waiting long?", why: "السؤال أيضًا يحتاج verb-ing بعد been." },
  { segs: ["I hadn't been", "sleep", "well."], bad: 1, correct: "I hadn't been sleeping well.", why: "النفي لا يغيّر القاعدة: hadn't been + verb-ing." },
];

// ㊴ IQ200 — اختر الجملة من المعنى العربي (المعاني والجمل من المصدر)
export const EX29_MEANING: { ar: string; answer: number; why: string }[] = [
  { ar: "عندما وصلت، كان سامر يقرأ.", answer: 0, why: "نشاط جارٍ في لحظة ماضية ← Past Continuous." },
  { ar: "عندما وصلت، كان سامر قد قرأ الكتاب.", answer: 1, why: "اكتمال قبل حدث ماضٍ ← Past Perfect." },
  { ar: "عندما وصلت، كان سامر يقرأ الكتاب منذ ساعتين.", answer: 2, why: "مدة + نشاط مستمر قبل نقطة ماضية ← Past Perfect Continuous." },
];
export const EX29_MEANING_OPTS = [
  "He was reading when I arrived.",
  "He had read the book when I arrived.",
  "He had been reading the book for two hours when I arrived.",
];

// ㉝ / ㉞ / ㉟ — أسئلة IQ200 (الجمل من المصدر؛ حكم المصدر يُكشف بعد المحاولة)
export type Iq29 = { title: string; lead: string; opts: string[]; answer: number; why: string; sourceVerdict: string };
export const IQ29_33: Iq29 = {
  title: "سؤال IQ200 — العيون الحمراء",
  lead: "أي جملة تُبرز النشاط الذي أدى إلى الأثر الظاهر؟",
  opts: ["Her eyes were red because she had cried.", "Her eyes were red because she had been crying."],
  answer: 1,
  why: "الجملة B تُبرز نشاط البكاء المستمر الذي أدى إلى الأثر الظاهر — وA ليست مستحيلة نحويًا.",
  sourceVerdict: "Source answer: B. B better foregrounds the activity leading to the visible effect; A is not grammatically impossible.",
};
export const IQ29_34: Iq29 = {
  title: "سؤال أصعب — إصلاح السيارة",
  lead: "أي جملة تُبرز عملية الإصلاح نفسها (النشاط وربما المدة)؟",
  opts: ["I had repaired the car before my father arrived.", "I had been repairing the car before my father arrived."],
  answer: 1,
  why: "A تركّز على الاكتمال/النتيجة، وB على النشاط والعملية — وكلتاهما ممكنة بحسب المقصود.",
  sourceVerdict: "Both can be possible. A focuses on completion/result; B focuses on repair activity/process, possibly duration.",
};
export const IQ29_35: Iq29 = {
  title: "لا تستخدمه فقط لأن هناك for",
  lead: "اختر الجملة الطبيعية:",
  opts: ["I had known Sarah for ten years before we moved.", "I had been knowing Sarah for ten years."],
  answer: 0,
  why: "know فعل حالة — وجود for لا يفرض الصيغة المستمرة. المعنى أولًا ثم القاعدة.",
  sourceVerdict: "for does not automatically require Past Perfect Continuous. Meaning first, then rule.",
};

// ㊸ Boss Battle — ثلاث معارك (الجمل وحكم المصدر Preferred حرفيًا)
export type Boss29 = { a: string; b: string; preferred: 0 | 1; why: string; source: string };
export const BOSS29: Boss29[] = [
  {
    a: "The ground was wet because it had rained.",
    b: "The ground was wet because it had been raining.",
    preferred: 1,
    why: "النشاط المستمر (المطر) يفسّر الأثر الظاهر (الأرض المبللة) بشكل أوضح — وA ليست خطأً نحويًا.",
    source: "Preferred: B.",
  },
  {
    a: "I had finished the report before the meeting.",
    b: "I had been finishing the report before the meeting.",
    preferred: 0,
    why: "المعنى هنا اكتمال قبل حدث ماضٍ — finish بالصيغة المستمرة غير طبيعية في هذا السياق.",
    source: "Preferred: A.",
  },
  {
    a: "I had finished the report for four hours.",
    b: "I had been working on the report for four hours before the meeting.",
    preferred: 1,
    why: "for مدة تحتاج نشاطًا مستمرًا — الجملة A غير منطقية لأن finish لحظة لا مدة.",
    source: "Preferred: B.",
  },
];

// ㊶ قصة Mia — الأفعال السبعة وتحليل المصدر لكل فعل
export type TenseId29 = "ps" | "pc" | "pp" | "ppc";
export type StoryVerb29 = { v: string; t: TenseId29; srcWhy: string };
export const MIA29_VERBS: StoryVerb29[] = [
  { v: "had been working", t: "ppc", srcWhy: "had been working → activity continued before Mia's arrival" },
  { v: "were testing", t: "pc", srcWhy: "were testing / were writing → ongoing at that moment" },
  { v: "were writing", t: "pc", srcWhy: "were testing / were writing → ongoing at that moment" },
  { v: "had already checked", t: "pp", srcWhy: "had already checked → completed earlier event" },
  { v: "were still preparing", t: "pc", srcWhy: "were still preparing → ongoing activity" },
  { v: "was tired", t: "ps", srcWhy: "was tired → past state" },
  { v: "had been walking", t: "ppc", srcWhy: "had been walking → earlier continuous activity contributing to tiredness" },
];

// ㉛ المحقق — جملة Daniel
export const DANIEL29_VERBS: StoryVerb29[] = [
  { v: "arrived", t: "ps", srcWhy: "arrived → Past Simple" },
  { v: "had already been training", t: "ppc", srcWhy: "had already been training → Past Perfect Continuous" },
];

// 🚀 التحدي النهائي — جملة فريق الإنقاذ
export const RESCUE29_VERBS: StoryVerb29[] = [
  { v: "arrived", t: "ps", srcWhy: "arrived → Past Simple → rescue team arrival" },
  { v: "had been waiting", t: "ppc", srcWhy: "had been waiting → Past Perfect Continuous → began before arrival and continued for several hours" },
  { v: "was falling", t: "pc", srcWhy: "was falling → Past Continuous → ongoing at that point" },
  { v: "had already flooded", t: "pp", srcWhy: "had already flooded → Past Perfect → flooding happened before arrival" },
];

// ============================================================
// منطقة الاختبارات — 20 سؤالًا جديدة من خارج أمثلة الشرح قدر الإمكان،
// مع شرح وفخ شائع لكل سؤال (تظهر في «حلول الاختبارات» فقط).
// لا تصحيح قبل Submit — الاختيار ≠ التصحيح.
// ============================================================
export type TestQ29 =
  | ["single", string, string[], number, string, string]
  | ["tf", string, string[], number, string, string]
  | ["multi", string, string[], number[], string, string]
  | ["order", string, string[], number[], string, string]
  | ["match", string, { l: string[]; r: string[] }, number[], string, string];

export const TEST_29=[
  ['single', "أي جملة تُبرز المدة قبل حدثٍ ماضٍ آخر؟",
    ["I cooked dinner.", "I was cooking dinner.", "I had been cooking for an hour when the guests arrived."], 2,
    "الجملة الثالثة وحدها تجمع المدة (for an hour) مع نقطة ماضية لاحقة (when the guests arrived) — وهذا جوهر Past Perfect Continuous.",
    "الاكتفاء بوجود فعل ماضٍ دون البحث عن المدة والنقطة الماضية اللاحقة."],
  ['tf', "في Past Perfect Continuous تتغيّر had حسب الفاعل.",
    ["صحيح", "خطأ"], 1,
    "had ثابتة مع كل الضمائر: I had been / She had been / They had been.",
    "القياس على has/have في المضارع التام — هنا لا يوجد إلا had."],
  ['multi', "اختر مكوّنات الصيغة المثبتة لـ Past Perfect Continuous.",
    ["had", "been", "verb-ing", "did"], [0, 1, 2],
    "الصيغة: Subject + had + been + verb-ing — ولا مكان لـ did فيها.",
    "إقحام did من أسئلة الماضي البسيط."],
  ['single', "أكمل: They had been driving ______ six hours.",
    ["for", "since"], 0,
    "six hours مدة — والمدة تأخذ for.",
    "الخلط بين المدة ونقطة البداية."],
  ['single', "أكمل: She had been teaching here ______ 2015.",
    ["for", "since"], 1,
    "2015 نقطة بداية — ونقطة البداية تأخذ since.",
    "اعتبار كل ما بعد الفراغ مدة تلقائيًا."],
  ['order', "رتّب أحداث الجملة من الأقدم إلى الأحدث: I had been studying for three hours when my friend called.",
    ["اتصل صديقي", "بدأت الدراسة", "استمرت الدراسة ثلاث ساعات"], [1, 2, 0],
    "النشاط بدأ، ثم استمر ثلاث ساعات، ثم جاءت النقطة الماضية (الاتصال).",
    "البدء بالحدث المذكور آخرًا في الجملة بدل الأقدم زمنيًا."],
  ['single', "أي جملة تركّز على الاكتمال والنتيجة؟",
    ["I had painted the wall.", "I had been painting the wall for two hours."], 0,
    "Past Perfect يبرز الاكتمال/النتيجة، والمستمر يبرز النشاط والمدة — فرق دلالي مفيد وليس قاعدة آلية.",
    "الظن أن إحدى الجملتين «خطأ» — كلتاهما صحيحة والفرق في التركيز."],
  ['tf', "يجب أن يكون النشاط مستمرًا حتى لحظة الحدث الثاني نفسها.",
    ["صحيح", "خطأ"], 1,
    "قد يتوقف النشاط قبل الحدث الثاني ويبقى أثره: He had been working all morning, so he was exhausted.",
    "تحويل الفكرة الدلالية إلى شرط إلزامي."],
  ['single', "اختر الجملة الطبيعية مع فعل الحالة believe:",
    ["She had believed his story for years.", "She had been believing his story for years."], 0,
    "أفعال الحالة (know / believe / want…) لا تُستخدم عادةً في الصيغ المستمرة.",
    "اعتبار for دليلًا إلزاميًا على الصيغة المستمرة."],
  ['single', "ما النفي الصحيح؟",
    ["They hadn't been listening.", "They hadn't been listen.", "They had not listening."], 0,
    "النفي: hadn't been + verb-ing — القاعدة لا تتغير مع النفي.",
    "إسقاط been أو ترك الفعل بلا -ing."],
  ['single', "ما السؤال الصحيح؟",
    ["Had she been practicing before the concert?", "Had she practicing been before the concert?", "Did she had been practicing?"], 0,
    "السؤال بتقديم Had فقط: Had + Subject + been + verb-ing?",
    "إقحام Did مع had في سؤال واحد."],
  ['single', "الإجابة القصيرة الصحيحة عن: Had they been traveling?",
    ["Yes, they been.", "Yes, they had.", "Yes, they did."], 1,
    "الإجابة القصيرة تكون بـ had لا بـ been ولا بـ did.",
    "استخدام been في الإجابة القصيرة."],
  ['match', "طابق كل زمن مع سؤاله.",
    { l: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"],
      r: ["What had happened before another past event?", "What happened?", "What had been happening for a period?", "What was happening at that moment?"] },
    [1, 3, 0, 2],
    "📸 حدث ماضٍ ← Past Simple · 🎥 نشاط في لحظة ماضية ← Past Continuous · ⏪ اكتمال قبل حدث ماضٍ ← Past Perfect · ⏳ مدة/نشاط قبل نقطة ماضية ← Past Perfect Continuous.",
    "الخلط بين سؤالي Past Perfect و Past Perfect Continuous."],
  ['single', "The road was muddy because it ______ all night.",
    ["had been raining", "had been rain", "was rain"], 0,
    "نشاط مستمر سابق فسّر الأثر الظاهر (الطين) — had been + verb-ing.",
    "نسيان صيغة -ing بعد been."],
  ['tf', "since تأتي قبل المدة مثل: since two hours.",
    ["صحيح", "خطأ"], 1,
    "since لنقطة البداية (since Monday / since 2020)، أما المدة فتأخذ for: for two hours.",
    "ترجمة «منذ ساعتين» حرفيًا إلى since two hours."],
  ['single', "ما صيغة -ing الصحيحة؟",
    ["swim → swiming", "swim → swimming", "swim → swimeing"], 1,
    "فعل قصير بساكن بعد حرف علة ← نضاعف الساكن: swim → swimming.",
    "نسيان مضاعفة الساكن في الأفعال القصيرة."],
  ['multi', "أي الأدلة تدعم اختيار Past Perfect Continuous؟",
    ["نقطة ماضية لاحقة", "مدة أو نشاط متكرر", "نشاط كان جاريًا قبل تلك النقطة", "نتيجة واحدة منتهية فقط"], [0, 1, 2],
    "نحتاج: نشاطًا بدأ قبل نقطة ماضية + استمر لفترة — أما «نتيجة واحدة منتهية فقط» فتشير إلى Past Perfect.",
    "اختيار الزمن من كلمة واحدة بدل تجميع الأدلة."],
  ['single', "اختر الجملة المناسبة لمعنى: «عندما وصلتُ، كانت ليلى تطبخ منذ الصباح».",
    ["Layla was cooking when I arrived.", "Layla had cooked when I arrived.", "Layla had been cooking since morning when I arrived."], 2,
    "المعنى يحمل نقطة بداية (منذ الصباح) ونشاطًا مستمرًا قبل الوصول ← had been cooking since morning.",
    "اختيار Past Continuous لأن المشهد «أثناء» — مع إهمال المدة."],
  ['single', "في جملة: When Daniel arrived at the gym, his friends had already been training for two hours. — الفعل arrived زمنه:",
    ["Past Simple", "Past Continuous", "Past Perfect Continuous"], 0,
    "arrived هو الحدث الماضي الرئيسي (النقطة المرجعية) ← Past Simple.",
    "افتراض أن كل الأفعال في جملة PPC تصبح مستمرة."],
  ['order', "رتّب أفكار جملة فريق الإنقاذ من الأقدم إلى الحدث الرئيسي.",
    ["وصل فريق الإنقاذ", "كان النهر قد غمر الطريق", "كان القرويون ينتظرون منذ ساعات", "كان المطر لا يزال يهطل"], [1, 2, 3, 0],
    "الفيضان اكتمل قبل الوصول (had already flooded)، والانتظار بدأ قبله واستمر (had been waiting)، والمطر كان جاريًا لحظة الوصول (was falling)، ثم الحدث الرئيسي: وصول الفريق.",
    "ترتيب الأفكار حسب ظهورها في الجملة بدل ترتيبها الزمني."],
] satisfies TestQ29[] as TestQ29[];

/** نص الإجابة الصحيحة بصيغة قابلة للعرض في الحلول. */
export function answerLabel29(q: TestQ29): string {
  const type = q[0];
  if (type === "multi") return (q[3] as number[]).map((n) => (q[2] as string[])[n]).join("  +  ");
  if (type === "order") return (q[3] as number[]).map((n) => (q[2] as string[])[n]).join(" ثم ");
  if (type === "match") {
    const m = q[2] as { l: string[]; r: string[] };
    return m.l.map((left, i) => `${left} → ${m.r[(q[3] as number[])[i]]}`).join(" · ");
  }
  return (q[2] as string[])[q[3] as number];
}

export const TEST_29_SOLUTIONS=TEST_29.map((q) => ({ answer: answerLabel29(q), explanation: q[4], trap: q[5] }));

export const OBJECTIVES_29 = SOURCE_SECTIONS[1].units;
export const TEACHER_PASSWORD_29 = "somer173";

// ============================================================
// منطقة المعلم — محتوى عربي كامل
// ============================================================
export const TEACHER_29_OVERVIEW: string[] = [
  "الدرس 29 يوسّع نظام الماضي من «الحدث» إلى «النشاط والمدة» قبل نقطة ماضية: Past Perfect Continuous = had been + verb-ing.",
  "البنية: 48 خطوة تغطي الأقسام ①–㊹ بالترتيب، ثم الملخص والمقارنة الرباعية والتحدي النهائي، ثم اختبار من 20 سؤالًا بحلول مفصلة.",
  "كل خطوة فكرة واحدة + تفاعل يشرحها — والتدريبات تعطي تصحيحًا فوريًا مع السبب، بينما الاختبار النهائي لا يصحّح قبل التسليم.",
];
export const TEACHER_29_NOTES: string[] = [
  "راجع Past Simple و Past Continuous و Past Perfect قبل تقديم وجهة النظر الجديدة (القسمان ㉙ و㉚).",
  "لا تُدرّس أن Past Perfect Continuous يجب أن يستمر حتى الحدث الثاني — قد يتوقف ويبقى أثره (القسم ⑱).",
  "لا تُدرّس أن for تعني دائمًا Past Perfect Continuous؛ أفعال الحالة تستخدم Past Perfect: I had known him for years. (القسمان ⑲ و㉟).",
  "فرّق «نتيجة مقابل مدة» فرقٌ دلالي مفيد وليس قاعدة آلية مطلقة (الأقسام ⑥ و⑯ و㉞).",
  "القرار دائمًا من المعنى: الترتيب الزمني، الأثر الظاهر، النشاط، المدة، for/since، ثم المقارنة الرباعية (القسم ㊹).",
  "وظّف التدريبات ㊱–㊳ وقصة Mia ㊶ وخريطتها ㊷ وBoss Battle ㊸ والتحدي النهائي في التقييم التكويني قبل فتح الاختبار.",
];
