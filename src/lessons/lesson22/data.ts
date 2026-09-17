// ============================================================
// الدرس 22 — Prepositions of Place
// المصدر المورّد هو المرجع الحرفي: لا اختصار ولا إعادة صياغة ولا حذف.
// كل وحدة إنجليزية ستُعرض داخل عازل LTR في Lesson22.tsx.
// ============================================================

// -------------------- فهرس المصدر الكامل (28 قسماً + الأقسام الداخلية) --------------------
export const SOURCE_SECTIONS: string[] = [
  "الافتتاح — ربط مع الدرس السابق",
  "🎯 أهداف الدرس",
  "🧠 1. ما هو Preposition؟",
  "🧠 2. IN = في / داخل",
  "🧠 3. ON = على سطح",
  "🧠 4. UNDER = تحت",
  "🧠 5. ABOVE = فوق / أعلى من",
  "🧠 6. BELOW = أسفل / تحت مستوى شيء",
  "🧠 7. BEHIND = خلف",
  "🧠 8. IN FRONT OF = أمام",
  "🧠 9. NEXT TO = بجانب",
  "🧠 10. NEAR = بالقرب من",
  "🧠 11. BETWEEN = بين شيئين",
  "🧠 12. OPPOSITE = مقابل",
  "🧠 13. INSIDE = داخل",
  "🧠 14. OUTSIDE = خارج",
  "🧠 15. أهم الكلمات في خريطة واحدة",
  "🧠 16. الآن نربطها بـ There is",
  "🧠 17. مع الجمع (There are)",
  "🧠 18. الأسئلة: Where?",
  "🧠 19. الإجابة",
  "🧠 20. سؤال وجواب كامل",
  "🧠 21. ربط Prepositions بالضمائر",
  "🧠 22. ربطها بالملكية",
  "🧠 23. أكثر من حرف جر في جملة واحدة",
  "🧠 24. Prepositions مع الأشخاص",
  "🧠 25. Above / Over",
  "🧠 26. Under / Below",
  "🧠 27. BETWEEN vs AMONG",
  "🧠 28. وصف غرفة كاملة",
  "🕵️ Grammar Detective",
  "🧩 Challenge 1 — أكمل",
  "🧩 Challenge 2 — اختر الكلمة الصحيحة",
  "🧩 Challenge 3 — Where?",
  "🚀 IQ200 Challenge",
  "🧠 IQ200 Challenge 2",
  "🏆 FINAL BOSS",
  "🎮 تحدي \"صح أم خطأ؟\"",
  "🧠 نقطة مهمة جدًا",
  "🏆 الخلاصة الذهبية",
  "🔥 أمثلة نهائية مركبة",
  "🗺️ خريطة المنهج حتى الآن",
];

export const SOURCE_NUMBERED_COUNT = 42;

export const LESSON_TITLE_22 = "الدرس 22: Prepositions of Place";
export const LESSON_SUBTITLE_22 = "Prepositions of Place";
export const LESSON_ARABIC_TITLE_22 = "حروف الجر للمكان — in / on / under / next to / behind / in front of / between / وغيرها";
export const LAB_NAME_22 = "THE POSITION LAB";
export const LAB_MOTTO_22 = "SEE the spatial relationship. Don't memorize translations — visualize the scene.";

// Opening
export const OPENING_RECALL = "في الدرس السابق تعلمنا كيف نقول:";
export const OPENING_EXAMPLES: { en: string }[] = [
  { en: "There is a book on the table." },
  { en: "There are three chairs in the room." },
];
export const OPENING_QUESTION = "لكن لاحظ شيئًا مهمًا جدًا:";
export const OPENING_QUESTIONS: string[] = [
  "كيف عرفنا أين يوجد الكتاب؟",
  "كيف عرفنا أين توجد الكراسي؟",
];
export const OPENING_KEYS: { en: string }[] = [
  { en: "on the table" },
  { en: "in the room" },
];
export const OPENING_SO = "إذن اليوم سنبني نظامًا أساسيًا جدًا لوصف الأماكن والمواقع.";
export const OPENING_NOTE = "اليوم لن نحفظ قائمة كلمات فقط.";
export const OPENING_NOTE_DETAIL = "سنفهم العلاقة المكانية بين الأشياء، ثم نستخدمها مع:";
export const OPENING_CONNECTIONS: string[] = [
  "There is / There are",
  "This / That / These / Those",
  "Possessive Nouns",
  "Adjectives",
  "وحتى الجمل الأطول.",
];

// Objectives
export const OBJECTIVES_22 = [
  { n: "①", text: "وصف مكان شيء بدقة." },
  { n: "②", text: "استخدام: ", items: ["in", "on", "under", "above", "below", "behind", "in front of", "next to", "near", "between", "opposite", "inside", "outside"] },
  { n: "③", text: "التمييز بين الكلمات المتشابهة." },
  { n: "④", text: "استخدام حروف الجر مع There is / There are." },
  { n: "⑤", text: "وصف غرفة أو صورة كاملة." },
  { n: "⑥", text: "فهم الفرق بين:", items: ["in / on", "under / below", "behind / in front of", "next to / near", "between / among"] },
  { n: "⑦", text: "تكوين أسئلة مثل: ", items: ["Where is...?", "Where are...?"] },
  { n: "⑧", text: "إعطاء إجابات كاملة." },
  { n: "⑨", text: "استخدام أكثر من حرف جر في جملة واحدة." },
  { n: "⑩", text: "الوصول إلى مستوى IQ200 في وصف المواقع." },
] as const;

// Section 1: What is Preposition?
export const PREP_INTRO = "Preposition هو كلمة تساعدنا على تحديد العلاقة بين شيء وشيء آخر.";
export const PREP_SIMPLE = "ببساطة:";
export const PREP_SIMPLE_Q = "أين يوجد الشيء؟";
export const PREP_EXAMPLE = { en: "The book is on the table.", ar: "الكتاب على الطاولة." };
export const PREP_KEY_WORD = { en: "on" };
export const PREP_KEY_REL = "تخبرنا بالعلاقة بين: book و table.";
export const PREP_STAR = "⭐ الفكرة الأساسية";
export const PREP_DONT_MEMORIZE = "لا تحفظ: on = على فقط. بل تخيل العلاقة.";
export const PREP_VISUAL_BOOK = "📖 ⬇️ TABLE";
export const PREP_VISUAL_DESC = "الكتاب فوق سطح الطاولة ويلامسه. إذن: on";

// Section 2: IN
export const IN_LEAD = "نستخدم in عندما يكون الشيء داخل مكان أو مساحة.";
export const IN_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The book is in the bag.", ar: "الكتاب داخل الحقيبة." },
  { en: "The keys are in the drawer.", ar: "المفاتيح داخل الدرج." },
  { en: "The children are in the classroom.", ar: "الأطفال داخل الصف." },
  { en: "There is a cat in the box.", ar: "يوجد قط داخل الصندوق." },
];
export const IN_MORE_LABEL = "🎯 أمثلة أكثر";
export const IN_MORE: { en: string; ar: string }[] = [
  { en: "in the room", ar: "في الغرفة" },
  { en: "in the house", ar: "في المنزل" },
  { en: "in the car", ar: "في السيارة" },
  { en: "in the garden", ar: "في الحديقة" },
  { en: "in the kitchen", ar: "في المطبخ" },
  { en: "in the city", ar: "في المدينة" },
  { en: "in the country", ar: "في البلد" },
];
export const IN_VISUAL = "📦 شيء موجود داخل حدود المكان.";
export const IN_VISUAL_EX = { en: "The ball is in the box." };

// Section 3: ON
export const ON_LEAD = "نستخدم on عندما يكون الشيء على سطح شيء آخر.";
export const ON_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The phone is on the table.", ar: "الهاتف على الطاولة." },
  { en: "The book is on the desk.", ar: "الكتاب على المكتب." },
  { en: "The picture is on the wall.", ar: "الصورة على الجدار." },
  { en: "The cup is on the shelf.", ar: "الكوب على الرف." },
];
export const IN_ON_COMPARE_TITLE = "🔥 فرق مهم جدًا";
export const IN_ON_COMPARE: { inEn: string; inAr: string; onEn: string; onAr: string } = {
  inEn: "The toy is in the box.",
  inAr: "اللعبة داخل الصندوق.",
  onEn: "The toy is on the box.",
  onAr: "اللعبة فوق الصندوق.",
};
export const IN_ON_CHANGED = "المعنى تغير بالكامل.";

// Section 4: UNDER
export const UNDER_LEAD = "نستخدم under لشيء موجود أسفل شيء آخر.";
export const UNDER_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The cat is under the table.", ar: "القطة تحت الطاولة." },
  { en: "The shoes are under the bed.", ar: "الأحذية تحت السرير." },
  { en: "The bag is under the chair.", ar: "الحقيبة تحت الكرسي." },
  { en: "There is a box under the desk.", ar: "يوجد صندوق تحت المكتب." },
];

// Section 5: ABOVE
export const ABOVE_LEAD = "above تعني أن شيئًا في موضع أعلى من شيء آخر.";
export const ABOVE_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The clock is above the door.", ar: "الساعة فوق الباب." },
  { en: "The picture is above the sofa.", ar: "الصورة فوق الأريكة." },
  { en: "The lamp is above the table.", ar: "المصباح فوق الطاولة." },
];
export const ABOVE_VS_ON_TITLE = "🧠 ABOVE vs ON";
export const ABOVE_VS_ON_NOTE = "هذه نقطة مهمة.";
export const ABOVE_VS_ON_ABOVE = { en: "The picture is above the sofa.", ar: "الصورة فوق الأريكة." };
export const ABOVE_VS_ON_ABOVE_NOTE = "قد تكون الصورة على الجدار فوق الأريكة، لكن التركيز هنا على الموقع الأعلى.";
export const ABOVE_VS_ON_ON = { en: "The book is on the table." };
export const ABOVE_VS_ON_RULE = "إذن: on = على سطح شيء ، above = في موضع أعلى من شيء";

// Section 6: BELOW
export const BELOW_LEAD = "below تعني: في مستوى أقل من شيء آخر.";
export const BELOW_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The temperature is below zero.", ar: "درجة الحرارة تحت الصفر." },
  { en: "The picture is below the clock.", ar: "الصورة أسفل الساعة." },
  { en: "The shelf is below the window.", ar: "الرف أسفل النافذة." },
];
export const ABOVE_BELOW_PAIR = {
  above: "above = أعلى",
  below: "below = أسفل",
  exampleA: { en: "The clock is above the picture." },
  exampleB: { en: "The picture is below the clock." },
  note: "الجملتان تصفان العلاقة نفسها من زاويتين مختلفتين.",
};

// Section 7: BEHIND
export const BEHIND_LEAD = "نستخدم behind عندما يكون شيء خلف شيء آخر.";
export const BEHIND_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The car is behind the house.", ar: "السيارة خلف المنزل." },
  { en: "The boy is behind the door.", ar: "الولد خلف الباب." },
  { en: "The garden is behind the school.", ar: "الحديقة خلف المدرسة." },
  { en: "There is a bicycle behind the garage.", ar: "توجد دراجة خلف المرآب." },
];

// Section 8: IN FRONT OF
export const INFRONT_LEAD = "عكس behind هو: in front of";
export const INFRONT_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The car is in front of the house.", ar: "السيارة أمام المنزل." },
  { en: "The teacher is in front of the students.", ar: "المعلم أمام الطلاب." },
  { en: "The bus is in front of the school.", ar: "الحافلة أمام المدرسة." },
];
export const BEHIND_INFRONT_COMPARE_TITLE = "🔥 قارن";
export const BEHIND_INFRONT_COMPARE: { behind: { en: string; ar: string }; infront: { en: string; ar: string } } = {
  behind: { en: "The cat is behind the sofa.", ar: "القطة خلف الأريكة." },
  infront: { en: "The cat is in front of the sofa.", ar: "القطة أمام الأريكة." },
};
export const BEHIND_INFRONT_CHANGED = "تغير حرف الجر، فتغير الموقع بالكامل.";

// Section 9: NEXT TO
export const NEXTTO_LEAD = "next to تعني: بجانب / ملاصق تقريبًا.";
export const NEXTTO_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The chair is next to the table.", ar: "الكرسي بجانب الطاولة." },
  { en: "The school is next to the park.", ar: "المدرسة بجانب الحديقة." },
  { en: "Sara is sitting next to Lina.", ar: "سارة تجلس بجانب لينا." },
  { en: "There is a lamp next to the bed.", ar: "يوجد مصباح بجانب السرير." },
];

// Section 10: NEAR
export const NEAR_LEAD = "near تعني: قريب من. لكنها لا تعني بالضرورة أنه ملاصق.";
export const NEAR_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The school is near my house.", ar: "المدرسة قريبة من منزلي." },
  { en: "There is a supermarket near the station.", ar: "يوجد متجر قريب من المحطة." },
  { en: "The park is near the river.", ar: "الحديقة قريبة من النهر." },
];
export const NEXTTO_NEAR_TITLE = "⭐ NEXT TO vs NEAR";
export const NEXTTO_NEAR_NOTE = "هذه نقطة مهمة.";
export const NEXTTO_DESC = "next to: بجانب مباشرة تقريبًا.";
export const NEAR_DESC = "near: قريب، لكن قد توجد مسافة بينهما.";
export const NEXTTO_NEAR_EXAMPLES: { nextto: { en: string; ar: string }; near: { en: string; ar: string } } = {
  nextto: { en: "The chair is next to the table.", ar: "الكرسي بجانب الطاولة." },
  near: { en: "The chair is near the table.", ar: "الكرسي قريب من الطاولة." },
};
export const NEXTTO_NEAR_CLOSE = "الجملتان ممكنتان، لكن next to أقوى في التعبير عن القرب المباشر.";

// Section 11: BETWEEN
export const BETWEEN_LEAD = "between تعني: بين شيئين محددين.";
export const BETWEEN_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The ball is between the boxes.", ar: "الكرة بين الصندوقين." },
  { en: "The school is between the bank and the library.", ar: "المدرسة بين البنك والمكتبة." },
  { en: "Sara is sitting between Ali and Omar.", ar: "سارة تجلس بين علي وعمر." },
];
export const BETWEEN_RULE_TITLE = "⭐ قاعدة مهمة";
export const BETWEEN_RULE = "between غالبًا تستخدم عندما نتحدث عن شيئين محددين:";
export const BETWEEN_FORMULA = "between A and B";
export const BETWEEN_EXAMPLE = { en: "between the chair and the table", ar: "بين الكرسي والطاولة." };

// Section 12: OPPOSITE
export const OPPOSITE_LEAD = "opposite تعني: مقابل / في الجهة المقابلة.";
export const OPPOSITE_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The bank is opposite the school.", ar: "المصرف مقابل المدرسة." },
  { en: "The restaurant is opposite the hotel.", ar: "المطعم مقابل الفندق." },
  { en: "The library is opposite the park.", ar: "المكتبة مقابل الحديقة." },
];

// Section 13: INSIDE
export const INSIDE_LEAD = "inside قريبة من in لكنها تؤكد فكرة الداخل.";
export const INSIDE_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The children are inside the house.", ar: "الأطفال داخل المنزل." },
  { en: "The keys are inside the bag.", ar: "المفاتيح داخل الحقيبة." },
];

// Section 14: OUTSIDE
export const OUTSIDE_LEAD = "outside = خارج.";
export const OUTSIDE_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The children are outside the house.", ar: "الأطفال خارج المنزل." },
  { en: "There is a car outside the garage.", ar: "توجد سيارة خارج المرآب." },
  { en: "The students are waiting outside the classroom.", ar: "الطلاب ينتظرون خارج الصف." },
];
export const INSIDE_OUTSIDE_TITLE = "🔥 IN ↔ OUTSIDE";
export const INSIDE_OUTSIDE_PAIR: { inside: { en: string }; outside: { en: string } } = {
  inside: { en: "The dog is inside the house." },
  outside: { en: "The cat is outside the house." },
};

// Section 15: Map
export const PREP_MAP_TITLE = "🧠 15. أهم الكلمات في خريطة واحدة";
export const PREP_MAP_INTRO = "احفظ المعنى المكاني:";
export const PREP_MAP: { en: string; ar: string }[] = [
  { en: "in", ar: "داخل" },
  { en: "on", ar: "على سطح" },
  { en: "under", ar: "تحت" },
  { en: "above", ar: "أعلى من" },
  { en: "below", ar: "أسفل من" },
  { en: "behind", ar: "خلف" },
  { en: "in front of", ar: "أمام" },
  { en: "next to", ar: "بجانب" },
  { en: "near", ar: "قريب من" },
  { en: "between", ar: "بين" },
  { en: "opposite", ar: "مقابل" },
  { en: "inside", ar: "داخل" },
  { en: "outside", ar: "خارج" },
];

// Section 16: There is connection
export const THEREIS_CONN_TITLE = "🧠 16. الآن نربطها بـ There is";
export const THEREIS_CONN_INTRO = "هذه أهم خطوة في الدرس.";
export const THEREIS_CONN_FROM = { en: "The book is on the table." };
export const THEREIS_CONN_TO = { en: "There is a book on the table.", ar: "يوجد كتاب على الطاولة." };
export const THEREIS_CONN_EXAMPLES: { en: string }[] = [
  { en: "There is a cat under the chair." },
  { en: "There is a lamp next to the bed." },
  { en: "There is a picture above the sofa." },
  { en: "There is a bicycle behind the house." },
  { en: "There is a car in front of the school." },
];

// Section 17: There are (plural)
export const THEREARE_TITLE = "🧠 17. مع الجمع";
export const THEREARE_EXAMPLES: { en: string }[] = [
  { en: "There are two books on the desk." },
  { en: "There are three boxes under the table." },
  { en: "There are four students in the classroom." },
  { en: "There are some shoes next to the door." },
  { en: "There are two trees behind the house." },
];
export const THEREARE_FORMULA_TITLE = "🔥 لاحظ البنية";
export const THEREARE_FORMULA_PARTS = ["There are", "number", "noun", "preposition", "place."];
export const THEREARE_EXAMPLE = { en: "There are three books on the table." };

// Section 18: Where questions
export const WHERE_TITLE = "🧠 18. الأسئلة: Where?";
export const WHERE_PREV = "تعلمنا سابقًا:";
export const WH_WORDS = [
  { en: "What", ar: "ماذا" },
  { en: "Where", ar: "أين" },
  { en: "When", ar: "متى" },
  { en: "Why", ar: "لماذا" },
];
export const WHERE_TODAY = "واليوم سنستخدم Where? للسؤال عن المكان.";
export const WHERE_RULE_TITLE = "⭐ السؤال الأساسي";
export const WHERE_RULES = [
  { form: "Where is...?", note: "للمفرد." },
  { form: "Where are...?", note: "للجمع." },
];
export const WHERE_EXAMPLES: { en: string; ar: string }[] = [
  { en: "Where is the book?", ar: "أين الكتاب؟" },
  { en: "Where is the cat?", ar: "أين القطة؟" },
  { en: "Where are the keys?", ar: "أين المفاتيح؟" },
  { en: "Where are the children?", ar: "أين الأطفال؟" },
];

// Section 19: Answers
export const ANSWER_TITLE = "🧠 19. الإجابة";
export const ANSWER_EXAMPLES: { q: { en: string; ar: string }; a: { en: string; ar: string } }[] = [
  { q: { en: "Where is the book?", ar: "أين الكتاب؟" }, a: { en: "The book is on the table.", ar: "الكتاب على الطاولة." } },
  { q: { en: "Where is the cat?", ar: "أين القطة؟" }, a: { en: "The cat is under the chair.", ar: "القطة تحت الكرسي." } },
  { q: { en: "Where are the keys?", ar: "أين المفاتيح؟" }, a: { en: "The keys are in the drawer.", ar: "المفاتيح في الدرج." } },
  { q: { en: "Where are the children?", ar: "أين الأطفال؟" }, a: { en: "The children are in the garden.", ar: "الأطفال في الحديقة." } },
];
export const ANSWER_SHORT_TITLE = "🔥 إجابة أكثر طبيعية";
export const ANSWER_SHORT_NOTE = "يمكننا أحيانًا أن نجيب باختصار:";
export const ANSWER_SHORT_EXAMPLES: { q: { en: string }; a: { en: string } }[] = [
  { q: { en: "Where is the book?" }, a: { en: "On the table." } },
  { q: { en: "Where is the cat?" }, a: { en: "Under the chair." } },
  { q: { en: "Where are the children?" }, a: { en: "In the garden." } },
];
export const ANSWER_SHORT_NOTE2 = "لكن عندما نتعلم بشكل أكاديمي، من الأفضل أن نعرف الجملة الكاملة أيضًا.";

// Section 20: Full Q&A
export const FULL_QA_TITLE = "🧠 20. سؤال وجواب كامل";
export const FULL_QA: { a: string; b: string }[] = [
  { a: "A: Where is Sara?", b: "B: She is in the kitchen." },
  { a: "A: Where is Omar?", b: "B: He is next to the window." },
  { a: "A: Where are the children?", b: "B: They are in the garden." },
  { a: "A: Where is the dog?", b: "B: It is behind the sofa." },
];

// Section 21: Pronouns
export const PRONOUNS_TITLE = "🧠 21. ربط Prepositions بالضمائر";
export const PRONOUNS_REMEMBER_TITLE = "تذكر:";
export const PRONOUNS_MAP: { noun: string; pronoun: string }[] = [
  { noun: "Ali", pronoun: "He" },
  { noun: "Sara", pronoun: "She" },
  { noun: "The dog", pronoun: "It" },
  { noun: "The children", pronoun: "They" },
];
export const PRONOUNS_EXAMPLES: { q: { en: string }; a: { en: string } }[] = [
  { q: { en: "Where is Ali?" }, a: { en: "He is in the classroom." } },
  { q: { en: "Where is Sara?" }, a: { en: "She is near the door." } },
  { q: { en: "Where is the dog?" }, a: { en: "It is under the table." } },
  { q: { en: "Where are the children?" }, a: { en: "They are outside." } },
];

// Section 22: Possessive nouns
export const POSS_TITLE = "🧠 22. ربطها بالملكية";
export const POSS_EXAMPLES: { q: { en: string }; a: { en: string } }[] = [
  { q: { en: "Where is Omar's bag?" }, a: { en: "It is under the desk." } },
  { q: { en: "Where is Sara's phone?" }, a: { en: "It is on the table." } },
  { q: { en: "Where are the children's shoes?" }, a: { en: "They are near the door." } },
  { q: { en: "Where are the students' books?" }, a: { en: "They are inside the classroom." } },
];
export const POSS_CHAIN_TITLE = "🔥 الآن أصبح لدينا سلسلة:";
export const POSS_CHAIN = "Possessive Noun + Question + Pronoun + Preposition.";

// Section 23: Multiple prepositions
export const MULTI_TITLE = "🧠 23. أكثر من حرف جر في جملة واحدة";
export const MULTI_INTRO = "هنا يبدأ المستوى الحقيقي.";
export const MULTI_EXAMPLES: { en: string; ar: string; parts?: { label: string; en: string }[] }[] = [
  {
    en: "There is a small box under the table next to the door.",
    ar: "يوجد صندوق صغير تحت الطاولة بجانب الباب.",
    parts: [
      { label: "", en: "There is" },
      { label: "", en: "a small box" },
      { label: "", en: "under the table" },
      { label: "", en: "next to the door." },
    ],
  },
  { en: "There are two chairs in front of the desk near the window.", ar: "يوجد كرسيان أمام المكتب قرب النافذة." },
  { en: "The cat is under the table next to the chair.", ar: "القطة تحت الطاولة بجانب الكرسي." },
];
export const MULTI_IQ_TITLE = "🚀 IQ200: لا تحفظ... ارسم في رأسك";
export const MULTI_IQ_EXAMPLE = { en: "The ball is under the chair next to the table." };
export const MULTI_IQ_NOTE = "لا تحفظ الكلمات. تخيل:";
export const MULTI_IQ_VISUAL = "TABLE → CHAIR → BALL";
export const MULTI_IQ_RELATIONS: { obj: string; rel: string; ref: string }[] = [
  { obj: "ball", rel: "under", ref: "chair" },
  { obj: "chair", rel: "next to", ref: "table" },
];

// Section 24: People prepositions
export const PEOPLE_TITLE = "🧠 24. Prepositions مع الأشخاص";
export const PEOPLE_INTRO = "ليست فقط للأشياء.";
export const PEOPLE_EXAMPLES: { en: string; ar: string }[] = [
  { en: "Ali is behind Sara.", ar: "علي خلف سارة." },
  { en: "Lina is next to Omar.", ar: "لينا بجانب عمر." },
  { en: "The teacher is in front of the students.", ar: "المعلم أمام الطلاب." },
  { en: "The child is between his parents.", ar: "الطفل بين والديه." },
];

// Section 25: Above / Over
export const OVER_TITLE = "🧠 25. Above / Over";
export const OVER_INTRO = "في الاستخدامات الأساسية قد تسمع: above و over وكلاهما قد يدل على شيء أعلى من شيء آخر.";
export const OVER_EXAMPLES: { en: string }[] = [
  { en: "The lamp is above the table." },
  { en: "The lamp is over the table." },
];
export const OVER_NOTE = "لكن لا نحتاج الآن إلى الدخول في كل الفروق الدقيقة بينهما.";
export const OVER_SAFE = "في هذه المرحلة: above = أعلى من ، وهي كلمة ممتازة وآمنة للتعبير عن الموقع.";

// Section 26: Under / Below
export const UNDER_BELOW_TITLE = "🧠 26. Under / Below";
export const UNDER_BELOW_INTRO = "أيضًا: under و below ليستا متطابقتين في كل السياقات.";
export const UNDER_BELOW_RULE = "لكن للمستوى الأساسي:";
export const UNDER_BELOW_PAIR = [
  { word: "under", meaning: "تحت شيء مكانيًا", example: { en: "The cat is under the table." } },
  { word: "below", meaning: "أسفل مستوى شيء", example: { en: "The temperature is below zero." } },
];
export const UNDER_BELOW_CLEAR = "وهذا الفرق سيصبح أكثر وضوحًا مع تقدمنا.";

// Section 27: Between / Among
export const AMONG_TITLE = "🧠 27. BETWEEN vs AMONG";
export const AMONG_INTRO = "سنضيف كلمة مهمة حتى لا تختلط علينا لاحقًا.";
export const AMONG_PAIR = [
  { word: "between", meaning: "بين أشخاص أو أشياء محددة، وغالبًا بين اثنين." },
  { word: "among", meaning: "وسط مجموعة." },
];
export const AMONG_EXAMPLES: { en: string; ar: string }[] = [
  { en: "The ball is between Ali and Omar.", ar: "الكرة بين علي وعمر." },
  { en: "The teacher is among the students.", ar: "المعلم بين الطلاب / وسط الطلاب." },
];
export const AMONG_LATER = "سنعود إلى among لاحقًا بتفصيل أكبر.";

// Section 28: Full room description
export const ROOM_TITLE = "🧠 28. وصف غرفة كاملة";
export const ROOM_INTRO = "الآن سنستخدم كل ما تعلمناه. تخيل غرفة نوم:";
export const ROOM_SENTENCES: { en: string }[] = [
  { en: "There is a bed in the room." },
  { en: "There is a lamp next to the bed." },
  { en: "There is a small table beside the lamp." },
  { en: "There are two books on the table." },
  { en: "There is a bag under the table." },
  { en: "There is a picture above the bed." },
  { en: "There are two shoes near the door." },
  { en: "There is a window behind the bed." },
];
export const ROOM_NOTICE_TITLE = "لاحظ كم قاعدة استخدمنا:";
export const ROOM_NOTICE_ITEMS = ["There is", "There are", "Adjectives", "Plural", "Prepositions", "Articles", "Nouns"];

// Grammar Detective
export const GRAMMAR_DETECTIVE_22_TITLE = "🕵️ Grammar Detective";
export const GRAMMAR_DETECTIVE_22_INTRO = "صحح الأخطاء:";
export const GRAMMAR_DETECTIVE_22: { n: string; wrong: string; wrongNote?: string; correct?: string; solutionText?: string }[] = [
  { n: "①", wrong: "The book is in the table.", solutionText: "① إذا كان الكتاب داخل الطاولة/الدرج: The book is in the table. لكن إذا كان على سطح الطاولة: The book is on the table. 🔥 السياق هو الذي يحدد." },
  { n: "②", wrong: "The cat is on the box.", wrongNote: "إذا كان المقصود \"داخل الصندوق\"، ما الصحيح؟", solutionText: "The cat is in the box." },
  { n: "③", wrong: "There is two books under the desk.", solutionText: "There are two books under the desk." },
  { n: "④", wrong: "Where are the phone?", solutionText: "Where is the phone?" },
  { n: "⑤", wrong: "Where is the keys?", solutionText: "Where are the keys?" },
  { n: "⑥", wrong: "The children are behind the classroom.", wrongNote: "إذا كان المقصود \"داخل الصف\"، صحح الجملة.", solutionText: "The children are inside the classroom. أو: The children are in the classroom." },
  { n: "⑦", wrong: "There are a lamp on the desk.", solutionText: "There is a lamp on the desk." },
  { n: "⑧", wrong: "The bag is next the chair.", solutionText: "The bag is next to the chair." },
  { n: "⑨", wrong: "The school is between the park.", solutionText: "The school is between the park and the library. لأن between تحتاج العلاقة الكاملة." },
  { n: "⑩", wrong: "The teacher is front of the students.", solutionText: "The teacher is in front of the students." },
];

// Solutions keyed by number
export const SOLUTIONS_22: string[] = [
  "① إذا كان الكتاب داخل الطاولة/الدرج: The book is in the table. لكن إذا كان على سطح الطاولة: The book is on the table. 🔥 السياق هو الذي يحدد.",
  "The cat is in the box.",
  "There are two books under the desk.",
  "Where is the phone?",
  "Where are the keys?",
  "The children are inside the classroom. أو: The children are in the classroom.",
  "There is a lamp on the desk.",
  "The bag is next to the chair.",
  "The school is between the park and the library. لأن between تحتاج العلاقة الكاملة.",
  "The teacher is in front of the students.",
];

// Challenge 1
export const CHALLENGE1_22_TITLE = "🧩 Challenge 1 — أكمل";
export const CHALLENGE1_22_INTRO = "اختر:";
export const CHALLENGE1_22_WORDS = ["in", "on", "under", "behind", "next to"];
export const CHALLENGE1_22_OPTIONS = ["in", "on", "under", "behind", "next to"];
export const CHALLENGE1_22: { n: string; stem: string; answer: number }[] = [
  { n: "①", stem: "The book is ___ the desk.", answer: 1 },
  { n: "②", stem: "The cat is ___ the bed.", answer: 2 },
  { n: "③", stem: "The children are ___ the classroom.", answer: 0 },
  { n: "④", stem: "The car is ___ the house.", answer: 3 },
  { n: "⑤", stem: "The lamp is ___ the sofa.", answer: 4 },
];

// Challenge 2
export const CHALLENGE2_22_TITLE = "🧩 Challenge 2 — اختر الكلمة الصحيحة";
export const CHALLENGE2_22: { n: string; stem: string; a: string; b: string; answer: number }[] = [
  { n: "①", stem: "The picture is ___ the wall.", a: "in", b: "on", answer: 1 },
  { n: "②", stem: "The shoes are ___ the bed.", a: "under", b: "on", answer: 0 },
  { n: "③", stem: "The teacher is ___ the students.", a: "in front of", b: "inside", answer: 0 },
  { n: "④", stem: "The bicycle is ___ the garage.", a: "inside", b: "above", answer: 0 },
  { n: "⑤", stem: "Sara is ___ Ali.", a: "next to", b: "on", answer: 0 },
];

// Challenge 3
export const CHALLENGE3_22_TITLE = "🧩 Challenge 3 — Where?";
export const CHALLENGE3_22_INTRO = "أجب بجملة كاملة.";
export const CHALLENGE3_22: { n: string; q: string; hint: string; answers: string[] }[] = [
  { n: "①", q: "Where is the book?", hint: "book → on the table", answers: ["The book is on the table."] },
  { n: "②", q: "Where is the cat?", hint: "cat → under the chair", answers: ["The cat is under the chair."] },
  { n: "③", q: "Where are the children?", hint: "children → in the garden", answers: ["The children are in the garden."] },
  { n: "④", q: "Where is the bicycle?", hint: "bicycle → behind the house", answers: ["The bicycle is behind the house."] },
  { n: "⑤", q: "Where are the shoes?", hint: "shoes → near the door", answers: ["The shoes are near the door."] },
];

// IQ200 Challenge 1
export const IQ200_1_TITLE = "🚀 IQ200 Challenge";
export const IQ200_1_INTRO = "اقرأ المشهد:";
export const IQ200_1_SCENE: { en: string }[] = [
  { en: "There is a large desk near the window." },
  { en: "There is a computer on the desk." },
  { en: "There are two books next to the computer." },
  { en: "There is a small box under the desk." },
  { en: "There are three pencils inside the box." },
  { en: "There is a chair in front of the desk." },
  { en: "There is a backpack behind the chair." },
  { en: "There are two pictures above the desk." },
];
export const IQ200_1_QUESTIONS: { n: string; q: string; answer: string }[] = [
  { n: "①", q: "Where is the computer?", answer: "It is on the desk." },
  { n: "②", q: "Where are the books?", answer: "They are next to the computer." },
  { n: "③", q: "Where is the box?", answer: "It is under the desk." },
  { n: "④", q: "Where are the pencils?", answer: "They are inside the box." },
  { n: "⑤", q: "Where is the chair?", answer: "It is in front of the desk." },
  { n: "⑥", q: "Where is the backpack?", answer: "It is behind the chair." },
  { n: "⑦", q: "Where are the pictures?", answer: "They are above the desk." },
];

// IQ200 Challenge 2
export const IQ200_2_TITLE = "🧠 IQ200 Challenge 2";
export const IQ200_2_INTRO = "الآن سأعطيك المكان، وأنت يجب أن تعرف حرف الجر المناسب.";
export const IQ200_2: { n: string; ar: string; stem: string; answer: string; options: string[] }[] = [
  { n: "①", ar: "الكرة موجودة داخل الصندوق.", stem: "The ball is ______ the box.", answer: "in", options: ["in", "on", "under", "behind"] },
  { n: "②", ar: "الكتاب موجود على الطاولة.", stem: "The book is ______ the table.", answer: "on", options: ["in", "on", "under", "behind"] },
  { n: "③", ar: "الحذاء موجود تحت السرير.", stem: "The shoe is ______ the bed.", answer: "under", options: ["in", "on", "under", "next to"] },
  { n: "④", ar: "السيارة موجودة خلف المنزل.", stem: "The car is ______ the house.", answer: "behind", options: ["in", "on", "under", "behind"] },
  { n: "⑤", ar: "المعلم أمام الطلاب.", stem: "The teacher is ______ the students.", answer: "in front of", options: ["behind", "in front of", "next to", "between"] },
  { n: "⑥", ar: "سارة بجانب لينا.", stem: "Sara is ______ Lina.", answer: "next to", options: ["next to", "in", "on", "under"] },
  { n: "⑦", ar: "المدرسة بين البنك والمكتبة.", stem: "The school is ______ the bank and the library.", answer: "between", options: ["between", "opposite", "near", "under"] },
  { n: "⑧", ar: "المتجر مقابل المدرسة.", stem: "The store is ______ the school.", answer: "opposite", options: ["near", "opposite", "behind", "next to"] },
];

// Final Boss
export const FINAL_BOSS_22_TITLE = "🏆 FINAL BOSS";
export const FINAL_BOSS_22_INTRO = "تخيل أنك دخلت إلى مختبر علوم.";
export const FINAL_BOSS_22_CLUES_AR: string[] = [
  "يوجد مكتب كبير قرب النافذة.",
  "يوجد حاسوب على المكتب.",
  "توجد ثلاثة كتب بجانب الحاسوب.",
  "توجد حقيبة تحت المكتب.",
  "يوجد صندوق صغير داخل الحقيبة.",
  "توجد ثلاثة أقلام داخل الصندوق.",
  "توجد خريطة على الجدار.",
  "توجد ساعة فوق الخريطة.",
  "يوجد كرسي أمام المكتب.",
  "يوجد طالبان بجانب الكرسي.",
  "يوجد معلم خلف الطالبين.",
];
export const FINAL_BOSS_22_TASK = "مهمتك:";
export const FINAL_BOSS_22_TASK_DESC = "اكتب فقرة إنجليزية من 10 إلى 12 جملة تصف المختبر.";
export const FINAL_BOSS_22_MUST_USE_TITLE = "يجب أن تستخدم:";
export const FINAL_BOSS_22_REQUIREMENTS: { n: string; text: string; english?: boolean }[] = [
  { n: "①", text: "There is", english: true },
  { n: "②", text: "There are", english: true },
  { n: "③", text: "in", english: true },
  { n: "④", text: "on", english: true },
  { n: "⑤", text: "under", english: true },
  { n: "⑥", text: "next to", english: true },
  { n: "⑦", text: "behind", english: true },
  { n: "⑧", text: "in front of", english: true },
  { n: "⑨", text: "above", english: true },
  { n: "⑩", text: "صفة واحدة على الأقل" },
  { n: "⑪", text: "جمعًا عاديًا" },
  { n: "⑫", text: "جمعًا شاذًا إن استطعت." },
];

// True/False challenge
export const TF_TITLE = "🎮 تحدي \"صح أم خطأ؟\"";
export const TF_READ_TITLE = "اقرأ:";
export const TF_SCENE: { en: string }[] = [
  { en: "There is a book on the table." },
  { en: "There are two books on the table." },
  { en: "There is a cat under the chair." },
  { en: "There are three children in the garden." },
  { en: "The children are behind the house." },
  { en: "The teacher is in front of the children." },
];
export const TF_QUESTIONS_TITLE = "الآن:";
export const TF_QUESTIONS: { n: string; q: string; a: string }[] = [
  { n: "①", q: "هل يوجد كتاب؟", a: "نعم، يوجد كتاب واحد على الطاولة. (Yes, there is a book on the table.)" },
  { n: "②", q: "كم كتابًا؟", a: "كتابان. (There are two books on the table.)" },
  { n: "③", q: "أين القطة؟", a: "تحت الكرسي. (The cat is under the chair.)" },
  { n: "④", q: "كم طفلًا؟", a: "ثلاثة أطفال. (There are three children in the garden.)" },
  { n: "⑤", q: "أين الأطفال؟", a: "خلف المنزل. (The children are behind the house.)" },
  { n: "⑥", q: "أين المعلم؟", a: "أمام الأطفال. (The teacher is in front of the children.)" },
];

// Important note
export const IMPORTANT_NOTE_TITLE = "🧠 نقطة مهمة جدًا";
export const IMPORTANT_NOTE_TEXT = "لا تحفظ حروف الجر كترجمة عربية فقط. لأن اللغة الإنجليزية أحيانًا تستخدم حرف الجر بطريقة لا تطابق الترجمة الحرفية تمامًا.";
export const IMPORTANT_NOTE_BEST = "لذلك أفضل طريقة هي حفظ: الكلمة + المشهد + مثال.";
export const IMPORTANT_NOTE_EXAMPLE_TITLE = "مثلاً لا تحفظ:";
export const IMPORTANT_NOTE_EXAMPLE_DONT = { en: "under = تحت", extra: "فقط." };
export const IMPORTANT_NOTE_EXAMPLE_DO = "احفظ:";
export const IMPORTANT_NOTE_EXAMPLE = { en: "The cat is under the table." };
export const IMPORTANT_NOTE_RESULT = "وهكذا يصبح دماغك قادرًا على استخدام الكلمة تلقائيًا.";

// Golden Summary
export const GOLDEN_SUMMARY_22_TITLE = "🏆 الخلاصة الذهبية";
export const GOLDEN_SUMMARY_22_WORDS_TITLE = "أهم كلمات اليوم:";
export const GOLDEN_SUMMARY_22_WORDS: { en: string; ar: string }[] = [
  { en: "in", ar: "داخل" },
  { en: "on", ar: "على سطح" },
  { en: "under", ar: "تحت" },
  { en: "above", ar: "أعلى من" },
  { en: "below", ar: "أسفل من" },
  { en: "behind", ar: "خلف" },
  { en: "in front of", ar: "أمام" },
  { en: "next to", ar: "بجانب" },
  { en: "near", ar: "بالقرب من" },
  { en: "between", ar: "بين" },
  { en: "opposite", ar: "مقابل" },
  { en: "inside", ar: "داخل" },
  { en: "outside", ar: "خارج" },
];
export const GOLDEN_SUMMARY_22_Q_TITLE = "⭐ أهم سؤالين";
export const GOLDEN_SUMMARY_22_QUESTIONS = [
  { form: "Where is...?", note: "للمفرد." },
  { form: "Where are...?", note: "للجمع." },
];
export const GOLDEN_SUMMARY_22_FORMULA_TITLE = "⭐ أهم تركيبين";
export const GOLDEN_SUMMARY_22_FORMULAS = [
  { form: "There is + singular + place.", note: "" },
  { form: "There are + plural + place.", note: "" },
];

// Final compound examples
export const FINAL_EXAMPLES_TITLE = "🔥 أمثلة نهائية مركبة";
export const FINAL_EXAMPLES: { en: string }[] = [
  { en: "There is a small cat under the table." },
  { en: "There are two children in the garden." },
  { en: "The children's shoes are near the door." },
  { en: "This book is on the desk." },
  { en: "Those bags are behind the chairs." },
  { en: "Sara's phone is inside her bag." },
  { en: "The teacher is in front of the students." },
  { en: "The school is between the library and the park." },
];
export const FINAL_EXAMPLES_NOTE = "لاحظ أن الطالب الآن يستطيع دمج عشرات القواعد التي تعلمها سابقًا في جملة واحدة طبيعية.";

// Roadmap
export const ROADMAP_22_TITLE = "🗺️ خريطة المنهج حتى الآن";
export const ROADMAP_22: { n: string; en: string; here?: boolean }[] = [
  { n: "①", en: "Sentence Structure" },
  { n: "②", en: "Pronouns" },
  { n: "③", en: "Verb to be" },
  { n: "④", en: "Nouns + Articles" },
  { n: "⑤", en: "Adjectives" },
  { n: "⑥", en: "Present Simple" },
  { n: "⑦", en: "Present Simple — Negative & Questions" },
  { n: "⑧", en: "Present Simple Review" },
  { n: "⑨", en: "Present Continuous" },
  { n: "⑩", en: "Present Continuous Advanced" },
  { n: "⑪", en: "Present Simple vs Present Continuous" },
  { n: "⑫", en: "Past Simple" },
  { n: "⑬", en: "Past Simple — Negative & Questions" },
  { n: "⑭", en: "Past Simple — Wh Questions" },
  { n: "⑮", en: "Was / Were" },
  { n: "⑯", en: "Possessive Adjectives" },
  { n: "⑰", en: "Possessive Pronouns" },
  { n: "⑱", en: "Plural Nouns" },
  { n: "⑲", en: "Possessive Nouns" },
  { n: "⑳", en: "Demonstratives — This / That / These / Those" },
  { n: "㉑", en: "There is / There are" },
  { n: "㉒", en: "Prepositions of Place — حروف الجر للمكان", here: true },
];
export const ROADMAP_CLOSING_22 = "الآن أصبح عندنا أساس قوي جدًا لوصف الأشخاص والأشياء والأماكن. والخطوة التالية لن تكون مجرد حفظ كلمات جديدة؛ سنبدأ بتوسيع قدرة الطالب على وصف الكمية والعدد وربطها بالأسماء المعدودة وغير المعدودة، وهذا سيهيئه لاحقًا لـ some / any / much / many / a lot of / few / little بشكل منطقي.";

// ============================================================
// Types for Lesson22 slide/block/exercise system
// ============================================================
export type Tone22 = "neutral" | "good" | "bad" | "focus" | "warn";

export type Block22 =
  | { type: "text"; text: string }
  | { type: "english"; en: string; ar?: string; tone?: Tone22 }
  | { type: "mixed"; text: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "formulaStrip"; items: readonly string[]; tone?: "emerald" | "teal" | "amber" | "rose" }
  | { type: "openingRecall" }
  | { type: "positionOverview" }
  | { type: "inLab" }
  | { type: "onLab" }
  | { type: "inOnCompare" }
  | { type: "underLab" }
  | { type: "aboveLab" }
  | { type: "belowLab" }
  | { type: "behindLab" }
  | { type: "inFrontLab" }
  | { type: "nextToLab" }
  | { type: "nearLab" }
  | { type: "betweenLab" }
  | { type: "oppositeLab" }
  | { type: "insideOutsideLab" }
  | { type: "prepositionMap" }
  | { type: "thereIsConnection" }
  | { type: "thereAreConnection" }
  | { type: "whereQuestions" }
  | { type: "answersBoard" }
  | { type: "fullQA" }
  | { type: "pronounsBoard" }
  | { type: "possessiveBoard" }
  | { type: "multiPrepBuilder" }
  | { type: "peoplePositionLab" }
  | { type: "aboveOverExplainer" }
  | { type: "underBelowExplainer" }
  | { type: "betweenAmongLab" }
  | { type: "roomSceneBuilder" };

export type Exercise22 =
  | { type: "detective" }
  | { type: "challenge1" }
  | { type: "challenge2" }
  | { type: "challenge3" }
  | { type: "iq200a" }
  | { type: "iq200b" }
  | { type: "finalBoss" }
  | { type: "trueFalse" };

export type Slide22 = { section: string; mascot: string; sourceIndex?: number } & (
  | { kind: "cover"; title: string }
  | { kind: "objectives"; title: string }
  | { kind: "lesson"; step: string; title: string; lead?: string; blocks: Block22[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle?: string; ex: Exercise22 }
  | { kind: "importantNote"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "finalExamples"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

// Section groupings for rail
const START = "البداية";
const CORE = "حروف الجر الأساسية";
const VERTICAL = "المواقع الرأسية";
const HORIZONTAL = "المواقع الأفقية والنسبية";
const BOUNDARY = "الداخل والخارج";
const CONNECT = "الربط بالمنظومة";
const PEOPLE = "الأشخاص والتمييزات";
const FULL_SCENE = "المشهد الكامل";
const PRACTICE = "المحقق والتحديات";
const FINAL = "التحديات النهائية";
const END = "الخاتمة";

// ============================================================
// Slide sequence — source-faithful order
// ============================================================
export const SLIDES: Slide22[] = [
  { kind: "cover", section: START, mascot: "🗺️", title: LESSON_TITLE_22 },

  // Opening connection + Objectives
  {
    kind: "lesson",
    section: START,
    mascot: "🔗",
    sourceIndex: 0,
    step: "0",
    title: "من درس 21 إلى درس 22 — ربط البداية",
    blocks: [{ type: "openingRecall" }],
  },
  { kind: "objectives", section: START, mascot: "🎯", sourceIndex: 1, title: "أهداف الدرس" },

  // 1. Preposition definition
  {
    kind: "lesson",
    section: CORE,
    mascot: "🧠",
    sourceIndex: 2,
    step: "1",
    title: "ما هو Preposition؟",
    blocks: [{ type: "text", text: PREP_INTRO }, { type: "positionOverview" }],
  },

  // 2. IN
  {
    kind: "lesson",
    section: CORE,
    mascot: "📦",
    sourceIndex: 3,
    step: "2",
    title: "IN = في / داخل",
    lead: IN_LEAD,
    blocks: [{ type: "inLab" }],
  },

  // 3. ON + in/on compare
  {
    kind: "lesson",
    section: CORE,
    mascot: "📖",
    sourceIndex: 4,
    step: "3",
    title: "ON = على سطح",
    lead: ON_LEAD,
    blocks: [{ type: "onLab" }, { type: "inOnCompare" }],
  },

  // 4. UNDER
  {
    kind: "lesson",
    section: CORE,
    mascot: "🐱",
    sourceIndex: 5,
    step: "4",
    title: "UNDER = تحت",
    lead: UNDER_LEAD,
    blocks: [{ type: "underLab" }],
  },

  // 5. ABOVE
  {
    kind: "lesson",
    section: VERTICAL,
    mascot: "⏰",
    sourceIndex: 6,
    step: "5",
    title: "ABOVE = فوق / أعلى من",
    lead: ABOVE_LEAD,
    blocks: [{ type: "aboveLab" }],
  },

  // 6. BELOW
  {
    kind: "lesson",
    section: VERTICAL,
    mascot: "⬇️",
    sourceIndex: 7,
    step: "6",
    title: "BELOW = أسفل / تحت مستوى شيء",
    lead: BELOW_LEAD,
    blocks: [{ type: "belowLab" }],
  },

  // 7. BEHIND
  {
    kind: "lesson",
    section: HORIZONTAL,
    mascot: "🚗",
    sourceIndex: 8,
    step: "7",
    title: "BEHIND = خلف",
    lead: BEHIND_LEAD,
    blocks: [{ type: "behindLab" }],
  },

  // 8. IN FRONT OF
  {
    kind: "lesson",
    section: HORIZONTAL,
    mascot: "👨‍🏫",
    sourceIndex: 9,
    step: "8",
    title: "IN FRONT OF = أمام",
    lead: INFRONT_LEAD,
    blocks: [{ type: "inFrontLab" }],
  },

  // 9. NEXT TO
  {
    kind: "lesson",
    section: HORIZONTAL,
    mascot: "🪑",
    sourceIndex: 10,
    step: "9",
    title: "NEXT TO = بجانب",
    lead: NEXTTO_LEAD,
    blocks: [{ type: "nextToLab" }],
  },

  // 10. NEAR
  {
    kind: "lesson",
    section: HORIZONTAL,
    mascot: "🏫",
    sourceIndex: 11,
    step: "10",
    title: "NEAR = بالقرب من",
    lead: NEAR_LEAD,
    blocks: [{ type: "nearLab" }],
  },

  // 11. BETWEEN
  {
    kind: "lesson",
    section: HORIZONTAL,
    mascot: "⚽",
    sourceIndex: 12,
    step: "11",
    title: "BETWEEN = بين شيئين",
    lead: BETWEEN_LEAD,
    blocks: [{ type: "betweenLab" }],
  },

  // 12. OPPOSITE
  {
    kind: "lesson",
    section: HORIZONTAL,
    mascot: "🏦",
    sourceIndex: 13,
    step: "12",
    title: "OPPOSITE = مقابل",
    lead: OPPOSITE_LEAD,
    blocks: [{ type: "oppositeLab" }],
  },

  // 13/14. INSIDE / OUTSIDE
  {
    kind: "lesson",
    section: BOUNDARY,
    mascot: "🏠",
    sourceIndex: 14,
    step: "13",
    title: "INSIDE و OUTSIDE = داخل / خارج",
    blocks: [{ type: "insideOutsideLab" }],
  },

  // 15. Preposition Map
  {
    kind: "lesson",
    section: BOUNDARY,
    mascot: "🗺️",
    sourceIndex: 16,
    step: "14",
    title: "أهم الكلمات في خريطة واحدة",
    blocks: [{ type: "prepositionMap" }],
  },

  // 16. There is connection
  {
    kind: "lesson",
    section: CONNECT,
    mascot: "🔗",
    sourceIndex: 17,
    step: "15",
    title: "الآن نربطها بـ There is",
    lead: "هذه أهم خطوة في الدرس.",
    blocks: [{ type: "thereIsConnection" }],
  },

  // 17. There are
  {
    kind: "lesson",
    section: CONNECT,
    mascot: "🔢",
    sourceIndex: 18,
    step: "16",
    title: "مع الجمع — There are",
    blocks: [{ type: "thereAreConnection" }],
  },

  // 18. Where questions
  {
    kind: "lesson",
    section: CONNECT,
    mascot: "❓",
    sourceIndex: 19,
    step: "17",
    title: "الأسئلة: Where?",
    blocks: [{ type: "whereQuestions" }],
  },

  // 19. Answers
  {
    kind: "lesson",
    section: CONNECT,
    mascot: "💬",
    sourceIndex: 20,
    step: "18",
    title: "الإجابة",
    blocks: [{ type: "answersBoard" }],
  },

  // 20. Full Q&A
  {
    kind: "lesson",
    section: CONNECT,
    mascot: "🗣️",
    sourceIndex: 21,
    step: "19",
    title: "سؤال وجواب كامل",
    blocks: [{ type: "fullQA" }],
  },

  // 21. Pronouns
  {
    kind: "lesson",
    section: CONNECT,
    mascot: "👥",
    sourceIndex: 22,
    step: "20",
    title: "ربط Prepositions بالضمائر",
    blocks: [{ type: "pronounsBoard" }],
  },

  // 22. Possessive nouns
  {
    kind: "lesson",
    section: CONNECT,
    mascot: "🎒",
    sourceIndex: 23,
    step: "21",
    title: "ربطها بالملكية (Possessive Nouns)",
    blocks: [{ type: "possessiveBoard" }],
  },

  // 23. Multiple prepositions
  {
    kind: "lesson",
    section: CONNECT,
    mascot: "🧩",
    sourceIndex: 24,
    step: "22",
    title: "أكثر من حرف جر في جملة واحدة",
    lead: "هنا يبدأ المستوى الحقيقي.",
    blocks: [{ type: "multiPrepBuilder" }],
    tip: "لا تحفظ الجملة كاملة. ارسم العلاقات في رأسك: شيء ← حرف جر ← مكان، وهذا المكان قد يكون مرتبطًا بمكان آخر."
  },

  // 24. People
  {
    kind: "lesson",
    section: PEOPLE,
    mascot: "🧑‍🤝‍🧑",
    sourceIndex: 25,
    step: "23",
    title: "Prepositions مع الأشخاص",
    lead: "ليست فقط للأشياء.",
    blocks: [{ type: "peoplePositionLab" }],
  },

  // 25. Above / Over
  {
    kind: "lesson",
    section: PEOPLE,
    mascot: "💡",
    sourceIndex: 26,
    step: "24",
    title: "Above / Over",
    blocks: [{ type: "aboveOverExplainer" }],
  },

  // 26. Under / Below
  {
    kind: "lesson",
    section: PEOPLE,
    mascot: "🌡️",
    sourceIndex: 27,
    step: "25",
    title: "Under / Below",
    blocks: [{ type: "underBelowExplainer" }],
  },

  // 27. Between / Among
  {
    kind: "lesson",
    section: PEOPLE,
    mascot: "👨‍🏫",
    sourceIndex: 28,
    step: "26",
    title: "BETWEEN vs AMONG",
    blocks: [{ type: "betweenAmongLab" }],
  },

  // 28. Room description
  {
    kind: "lesson",
    section: FULL_SCENE,
    mascot: "🛏️",
    sourceIndex: 29,
    step: "27",
    title: "وصف غرفة كاملة",
    lead: "الآن سنستخدم كل ما تعلمناه.",
    blocks: [{ type: "roomSceneBuilder" }],
  },

  // Grammar Detective
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🕵️",
    sourceIndex: 30,
    badge: "🕵️",
    title: "Grammar Detective",
    subtitle: "صحح الأخطاء العشرة — كل خطأ ورد في المصدر، مع التصحيح الكامل.",
    ex: { type: "detective" },
  },

  // Challenge 1
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧩",
    sourceIndex: 31,
    badge: "🧩 1",
    title: "Challenge 1 — أكمل",
    ex: { type: "challenge1" },
  },

  // Challenge 2
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧩",
    sourceIndex: 32,
    badge: "🧩 2",
    title: "Challenge 2 — اختر الكلمة الصحيحة",
    ex: { type: "challenge2" },
  },

  // Challenge 3
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧩",
    sourceIndex: 33,
    badge: "🧩 3",
    title: "Challenge 3 — Where?",
    subtitle: "أجب بجملة كاملة.",
    ex: { type: "challenge3" },
  },

  // IQ200 1
  {
    kind: "ex",
    section: FINAL,
    mascot: "🚀",
    sourceIndex: 34,
    badge: "🚀",
    title: "IQ200 Challenge",
    subtitle: "اقرأ المشهد ثم أجب عن الأسئلة السبعة.",
    ex: { type: "iq200a" },
  },

  // IQ200 2
  {
    kind: "ex",
    section: FINAL,
    mascot: "🧠",
    sourceIndex: 35,
    badge: "🧠",
    title: "IQ200 Challenge 2",
    subtitle: "سأعطيك المكان، وأنت تعرف حرف الجر المناسب.",
    ex: { type: "iq200b" },
  },

  // FINAL BOSS
  {
    kind: "ex",
    section: FINAL,
    mascot: "🏆",
    sourceIndex: 36,
    badge: "🏆",
    title: "FINAL BOSS — Science Lab",
    subtitle: "اكتب فقرة إنجليزية من 10 إلى 12 جملة تصف مختبر العلوم.",
    ex: { type: "finalBoss" },
  },

  // True/False
  {
    kind: "ex",
    section: FINAL,
    mascot: "🎮",
    sourceIndex: 37,
    badge: "🎮",
    title: "تحدي \"صح أم خطأ؟\"",
    ex: { type: "trueFalse" },
  },

  // Important note
  {
    kind: "importantNote",
    section: END,
    mascot: "🧠",
    sourceIndex: 38,
    title: "نقطة مهمة جدًا — لا تحفظ الترجمة فقط",
  },

  // Golden Summary
  { kind: "summary", section: END, mascot: "🏆", sourceIndex: 39, title: "الخلاصة الذهبية" },

  // Final examples
  {
    kind: "finalExamples",
    section: END,
    mascot: "🔥",
    sourceIndex: 40,
    title: "أمثلة نهائية مركبة",
  },

  // Roadmap
  { kind: "roadmap", section: END, mascot: "🗺️", sourceIndex: 41, title: "خريطة المنهج حتى الآن" },

  // Final quiz
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي — الدرس 22" },

  // Closing
  { kind: "closing", section: END, mascot: "🏆", title: "أحسنت!" },
];

// Intentional errors preserved
export const INTENTIONALLY_WRONG_22: string[] = [
  "The book is in the table.",
  "The cat is on the box.",
  "There is two books under the desk.",
  "Where are the phone?",
  "Where is the keys?",
  "The children are behind the classroom.",
  "There are a lamp on the desk.",
  "The bag is next the chair.",
  "The school is between the park.",
  "The teacher is front of the students.",
];
