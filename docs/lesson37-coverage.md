# Lesson 37 — Future Continuous: source-coverage ledger

## Base and provenance

- Planned lesson route: `#/lesson/37`.
- Lesson title: **Lesson 37 — Future Continuous**.
- English subtitle: **What Will You Be Doing Tomorrow?**.
- Arabic subtitle: **رحلة إلى المستقبل — IQ200 🚀**.
- Level: **تأسيسي متقدم — IQ200**.
- Source of truth: the complete Lesson 37 text supplied in the implementation request.
- The supplied material has an unnumbered opening that links the three previous lessons (WILL, BE GOING TO, WILL vs BE GOING TO) and then **38 numbered source sections**. Sections keep their numbers 1–38 and receive IDs `s01`–`s38`; the opening is the separate `cover` step.
- Native student sequence: `cover`, then `s01`–`s38` in source order = **39 steps**. Chapters group them: LAUNCH (cover, s01, s02), FORM (s03–s05), MEANING (s06–s10), TIMECLAUSE (s11–s13), DIALOGUE (s14–s17), QUESTIONS (s18–s23), VERBS (s24–s25), COMPARE (s26–s27), PRACTICE (s28–s31), ASSESSMENT (s32–s35), WRAP (s36–s38).
- Section 34 is the *Future Continuous Master Test*: all **25** questions live once in the dedicated Test Area. Its student step is a launch step that keeps the source section visible and points to the test; it does not duplicate the questions.
- Section 35 (Teacher solutions area) contains only the heading and «عرض الحلول التفصيلية». The source supplies **no** answer key, so all 25 answers and explanations are **platform/teacher additions**, kept in `src/lessons/lesson37/solutionsData37.ts`, marked `platform-authored-teacher-addition`, and shown only in the gated Solutions/Teacher surfaces.

## Pre-implementation source audit notes

1. **§2 timeline** is supplied as broken columns (6:00 · 7:00 · 9:00 next to *بداية الدراسة · أثناء الدراسة · نهاية الدراسة* mixed together). It is rebuilt as a clear two-column table with the same three rows and the same words — nothing is added or reworded.
2. **§5 pronoun table** is supplied without rows. It is rebuilt as a two-column table (الفاعل × الجملة) with the same **seven** pronouns and the same sentences; the note *no -s with he/she/it* and *no am/is/are after will* is preserved.
3. **§8 time expressions** are supplied as consecutive lines; they are rebuilt as a table (التعبير الزمني × المعنى) with all **seven** expressions and their meanings, plus the source caution that `tomorrow` alone does not force the tense.
4. **§24 -ing rules**: the source says "we double the final letter in some verbs" without a condition. The platform adds the precise condition (the final syllable must be stressed and end in consonant-vowel-consonant): `begin → beginning`, `run → running`, but `visit → visiting`, `open → opening`. `travel → travelling` is the British spelling already used in this lesson's own examples. The source lines stay in the card; the condition is shown as a platform accuracy note, not as a rewritten rule.
5. **§13 while**: the source's `While you are studying tomorrow evening…` uses Present Continuous for a future arrangement. Present Simple is also correct in that clause; this is recorded as a precision note (both are acceptable, the source's choice foregrounds the arrangement), never as a grammar error.
6. **§12 when**: the source rule (no `will` after a future time clause) is preserved exactly, including the contrast pair `When you arrive, I will be studying.` / `When will you arrive?`. The platform adds one clearly labelled advanced note: in an indirect question (`I don't know when you will arrive.`) `will` is correct because the clause is not a time clause — this completes the rule instead of contradicting it.
7. **§9**: the source's own caution is kept — `I will study tomorrow.` does **not** necessarily mean the study finishes, and `I will be studying at 7:00` does not tell us the start or end of the activity.
8. No source wording is silently corrected anywhere. Every precision note lives in the `accuracyNote` column below and, where it is student-facing, inside a clearly marked **إضافة تعليمية من المنصة** note.

## Terminology and precision contract

- Tense name used throughout: **Future Continuous (المستقبل المستمر)**; the source example pairs stay in English with their Arabic translations.
- Core form: `Subject + will + be + V-ing`. Negation: `Subject + will not / won't + be + V-ing`. Yes/No question: `Will + Subject + be + V-ing?`. Wh-question: `Wh-word + will + Subject + be + V-ing?`. Short answers: `Yes, she will.` / `No, she won't.` (no repetition of `be + V-ing`).
- The slot after `will` is the base form `be`, not `am / is / are` (§4). `will be` never changes with the subject, and no `-s` is added with he/she/it.
- No keyword-to-tense rule is implemented: `tomorrow` (and the other seven expressions) is evidence of future time, not proof of a specific tense.
- Stative verbs (`know, believe, understand, want, need, own`) are not normally used in the continuous; the source's `think` contrast is kept and the `have` activity use (`having lunch`, source §15) is explained rather than banned.

## Coverage ledger — all 38 numbered sections and the introduction

| Source | Exact native location | Required source units / coverage contract | Transfer, platform additions, and precision notes |
|---|---|---|---|
| المقدمة (غير مرقّمة) — Opening | cover | خطوة الغلاف (Cover) في Student Area + لافتات الكاميرا | العنوان · What Will You Be Doing Tomorrow? · رحلة إلى المستقبل — IQ200 🚀 · ربط WILL وBE GOING TO وWILL vs BE GOING TO · سؤال الصديق الافتتاحي · تعريف الحاجة إلى الزمن الجديد | نقل حرفي كما ورد. إضافة المنصة: غلاف بصري بهوية «الكاميرا داخل المستقبل» وبطاقات تذكّر بمحطات الدروس 34–36. |
| §1 🎯 1. أهداف الدرس | s01 | خطوة §1 (الخطوة 2 من 39) — كل هدف كما ورد | عشرة أهداف مرقّمة ①–⑩ (من فهم المعنى إلى حل اختبار من 25 سؤالًا) | نقل حرفي كما ورد. إضافة المنصة: قائمة مراجعة ذاتية تفاعلية لتحديد الأهداف الواضحة. |
| §2 🧠 2. الفكرة الأساسية: تخيل نفسك داخل المستقبل | s02 | خطوة §2 (الخطوة 3 من 39) | موقف الدراسة (الساعة الرابعة عصرًا) · خطة 6:00–9:00 · سؤال What will you be doing at 7:00 tomorrow? · الإجابة I will be studying. · الخط الزمني PAST/NOW/FUTURE · الجملة المركزية At 7:00 tomorrow, I will be studying. | نُقل المحتوى حرفيًا وأُعيد بناء تنسيق الجدول/الأعمدة. إضافة المنصة: مختبر «اللحظة المستقبلية»: اختيار لحظة على الخط الزمني ثم تحديد أي لحظة تصفها جملة المستقبل المستمر. ملاحظة دقة: الخط الزمني في النسخ المورّد انفصلت أعمدته (6:00 · 7:00 · 9:00 وأمامها «بداية الدراسة · أثناء الدراسة · نهاية الدراسة» مختلطة). أُعيد ترتيبه في جدول واضح دون تغيير النص. |
| §3 ⭐ 3. القاعدة الأساسية | s03 | خطوة §3 (الخطوة 4 من 39) | الصيغة Subject + will + be + V-ing · المقابل العربي · خمسة أمثلة مع ترجماتها · تنبيه ثبات will be مع جميع الضمائر | نقل حرفي كما ورد. إضافة المنصة: بانِي الصيغة: ترتيب عناصر الصيغة بالنقر ثم التحقق من الترتيب. |
| §4 🔬 4. تحليل التركيب خطوة بخطوة | s04 | خطوة §4 (الخطوة 5 من 39) | تحليل She will be preparing dinner. إلى خمسة أدوار · لماذا be وليس is · الجملة الصحيحة ✅ والخطأ ❌ | نقل حرفي كما ورد. إضافة المنصة: تشريح الجملة تفاعليًا (تعيين دور كل جزء) + تحقق سريع من be مقابل is. |
| §5 ⚙️ 5. التصريف مع جميع الضمائر | s05 | خطوة §5 (الخطوة 6 من 39) | جدول I/You/He/She/It/We/They مع جمل كل ضمير · تنبيه: لا s مع He/She/It · لا am/is/are بعد will · الصيغة الثابتة will be + V-ing | نُقل المحتوى حرفيًا وأُعيد بناء تنسيق الجدول/الأعمدة. إضافة المنصة: لوحة تصريف تفاعلية (اختيار الضمير) + ثلاث نقاط شائعة الخطأ. ملاحظة دقة: الجدول في النسخ المورّد بلا خطوط: أُعيد بناؤه جدولًا من عمودين (الفاعل × الجملة) بنفس الصفوف السبعة. |
| §6 🧠 6. الاستخدام الأول: نشاط سيكون جاريًا في لحظة مستقبلية محددة | s06 | خطوة §6 (الخطوة 7 من 39) | أربعة أمثلة مع ترجماتها (الامتحان 10:00 · نوم الأطفال منتصف الليل · السفر إلى إسطنبول · تدريب الأخ الجمعة القادمة) · القاعدة الذهنية What will be happening at that moment? | نقل حرفي كما ورد. إضافة المنصة: مختبر من خمسة بنود: اختيار الجملة التي تصف النشاط الجاري في اللحظة الموصوفة. |
| §7 🎥 7. المستقبل المستمر مثل كاميرا داخل المستقبل | s07 | خطوة §7 (الخطوة 8 من 39) | تشبيه الكاميرا · Past Simple صورة · Past Continuous كاميرا في الماضي · Future Continuous كاميرا داخل المستقبل · الأمثلة الثلاثة (yesterday/now/tomorrow at 8:00) | نقل حرفي كما ورد. إضافة المنصة: مختبر الكاميرا: نقل الكاميرا بين الماضي والحاضر والمستقبل وقراءة الجملة والصيغة في كل موضع. |
| §8 ⭐ 8. التعبيرات الزمنية الشائعة | s08 | خطوة §8 (الخطوة 9 من 39) | سبعة تعبيرات زمنية مع معانيها · مثالان (الشاطئ · ورشة العمل الثالثة) · تنبيه: tomorrow وحدها لا تفرض الزمن | نُقل المحتوى حرفيًا وأُعيد بناء تنسيق الجدول/الأعمدة. إضافة المنصة: مختبر مطابقة التعبير الزمني بالمشهد. ملاحظة دقة: قائمة التعبيرات ومعانيها كانت أسطرًا متتابعة: أُعيد ترتيبها جدولًا (تعبير + معنى) بلا تغيير أي لفظ. |
| §9 🔥 9. Future Simple vs Future Continuous | s09 | خطوة §9 (الخطوة 10 من 39) | المقارنة I will study tomorrow. / I will be studying at 7:00 tomorrow. · مثال cook · سؤال IQ200 حول ما تعنيه كل جملة (لا انتهاء بالضرورة، ولا بداية/نهاية محددة) | نقل حرفي كما ورد. إضافة المنصة: مختبر المعنى: أربعة بنود تربط كل جملة بما تقدّمه. ملاحظة دقة: المصدر دقيق في تنبيهه: لا الجملة الأولى تعني انتهاء الدراسة بالضرورة، ولا الثانية تخبرنا بموعد البداية والنهاية — ونُقل التنبيه كما هو. |
| §10 🧩 10. مختبر المعنى: نفس الفعل، زمن مختلف | s10 | خطوة §10 (الخطوة 11 من 39) | الفعل travel في ثلاث صيغ (will travel · am going to travel · will be travelling) مع معنى كل صيغة · خلاصة أن الجمل الثلاث قد تتحدث عن الرحلة نفسها | نقل حرفي كما ورد. إضافة المنصة: مختبر ثلاثي: مطابقة كل صيغة بالمعنى الذي تقدّمه. |
| §11 🕒 11. الاستخدام الثاني: نشاط مستمر أثناء وقوع حدث مستقبلي آخر | s11 | خطوة §11 (الخطوة 12 من 39) | مثال الأم (الوصول عند الخامسة والعمل من الرابعة إلى السادسة) · الحدثان ① و② · When you call me tonight, I will be studying. · When the guests arrive, we will be preparing dinner. | نقل حرفي كما ورد. إضافة المنصة: مختبر الحدثين: تحديد أي حدث يقع أثناء الآخر وأي صيغة تكمل المثال. |
| §12 🚨 12. قاعدة مهمة جدًا: لا نستخدم WILL عادةً بعد WHEN الزمنية | s12 | خطوة §12 (الخطوة 13 من 39) | المثال الخطأ When you will arrive, I will be studying. ❌ · الصحيح When you arrive, I will be studying. ✅ · التعليل · ثلاثة أمثلة مع ترجماتها · الفرق المتقدم مع When will you arrive? ✅ وWhen you arrive, I'll call you. ✅ | نقل حرفي كما ورد. إضافة المنصة: مختبر تصنيف: جملة زمنية (Present Simple) أم سؤال مباشر (will صحيحة). ملاحظة دقة: أضفنا حالة متقدمة موسومة من المنصة: في السؤال غير المباشر يبقى will صحيحًا (I don't know when you will arrive) لأنه ليس جملة زمنية — وهذه لا تنقض قاعدة المصدر بل تكمّلها. |
| §13 🧠 13. ماذا عن WHILE؟ | s13 | خطوة §13 (الخطوة 14 من 39) | معنى while · مثالان (you are studying / the students are taking the exam) مع ترجمتيهما · شرح أن جملة while جاءت بالحاضر المستمر والجملة الرئيسية بالمستقبل المستمر | نقل حرفي كما ورد. إضافة المنصة: مختبر while: إكمال الفعل المناسب في كل جملة. ملاحظة دقة: استخدام Present Continuous في جملة while للدلالة على ترتيب مستقبلي مقبول في هذا السياق، ويصح كذلك Present Simple — وُضّح ذلك كملاحظة لا كتصحيح. |
| §14 🎭 14. حوار تطبيقي: Tomorrow's Schedule | s14 | خطوة §14 (الخطوة 15 من 39) | سبعة أسطر حوار كاملة · ترجمتها · أربعة عناصر تحليل (I'll be attending · I'll be working · Will you be studying · I'll call you) · ملاحظة جمع المستقبل البسيط والمستمر في حوار واحد | نقل حرفي كما ورد. إضافة المنصة: قارئ حوار تفاعلي: فتح كل سطر لعرض ترجمته وتحليل المصدر لصيغته، مع سؤال فهم. |
| §15 ⭐ 15. الاستخدام الثالث: الحديث عن مجريات مستقبلية متوقعة | s15 | خطوة §15 (الخطوة 16 من 39) | ثلاثة أمثلة مع ترجماتها (غداء المكتب · الاختبار النهائي الاثنين القادم · إصلاح الطريق نهاية الأسبوع) · خلاصة عدم التركيز على قرار لحظي | نقل حرفي كما ورد. إضافة المنصة: مختبر المجريات المتوقعة (ثلاثة بنود) + تنبيه أن have هنا بمعنى يتناول لا يملك، فتصح الصيغة المستمرة. |
| §16 🤝 16. الاستخدام الرابع: السؤال المهذب عن الخطط المستقبلية | s16 | خطوة §16 (الخطوة 17 من 39) | مقارنة Will you use the computer tonight? / Will you be using the computer tonight? · مثالا السوبرماركت والبقاء في المنزل · شرح فكرة السؤال عن البرنامج والمتاح | نقل حرفي كما ورد. إضافة المنصة: مختبر مواقف: اختيار السؤال الأنسب لغرض المتحدث. |
| §17 🔬 17. الفرق بين WILL YOU وWILL YOU BE + ING | s17 | خطوة §17 (الخطوة 18 من 39) | Will you drive me to school? مقابل Will you be driving to school tomorrow? · حوار A/B/A/B القصير · شرح السؤال عن الخطة قبل الطلب | نقل حرفي كما ورد. إضافة المنصة: مختبر الفرق بين سؤال الاستعداد وسؤال البرنامج. |
| §18 🚫 18. النفي — Negative Form | s18 | خطوة §18 (الخطوة 19 من 39) | القاعدة Subject + will not + be + V-ing · الاختصار won't · أربعة أمثلة مع ترجماتها | نقل حرفي كما ورد. إضافة المنصة: بانِي النفي: كتابة نفي كل جملة من جمل المصدر مع فحص العناصر البنيوية. |
| §19 🚨 19. أخطاء النفي الشائعة | s19 | خطوة §19 (الخطوة 20 من 39) | أربعة أزواج خطأ/صواب (won't studying · doesn't will be · will not are · won't be study) · القاعدة won't + be + V-ing · لا تحذف be ولا تستبدلها | نقل حرفي كما ورد. إضافة المنصة: مختبر تشخيص الخطأ في كل زوج. |
| §20 ❓ 20. تكوين السؤال — Yes/No Questions | s20 | خطوة §20 (الخطوة 21 من 39) | الجملة المثبتة ونقل will · القاعدة Will + Subject + be + V-ing? · أربعة أمثلة مع ترجماتها | نقل حرفي كما ورد. إضافة المنصة: بانِي السؤال: خمس جمل لبناء سؤال نعم/لا منها مع فحص العناصر. |
| §21 💬 21. الإجابات القصيرة | s21 | خطوة §21 (الخطوة 22 من 39) | ثلاثة أزواج سؤال/إجابات · تنبيه أن الإجابة القصيرة تستخدم will أو won't ولا تكرر be + V-ing | نقل حرفي كما ورد. إضافة المنصة: مختبر اختيار الإجابة القصيرة الصحيحة. |
| §22 🔍 22. أسئلة Wh مع Future Continuous | s22 | خطوة §22 (الخطوة 23 من 39) | القاعدة Wh-word + will + Subject + be + V-ing? · ستة أمثلة مع ترجماتها (What · Where · When · Why · Who · How long) | نقل حرفي كما ورد. إضافة المنصة: ورشة إعادة بناء أسئلة Wh الستة مع فحص العناصر. |
| §23 🧠 23. WHO عندما تكون الفاعل | s23 | خطوة §23 (الخطوة 24 من 39) | Who will be leading the team? (Who فاعل) مقابل Who will you be meeting? (You فاعل) · شرح اختلاف الترتيب | نقل حرفي كما ورد. إضافة المنصة: لوحة وظيفة who: فاعل أم مفعول به، مع بند ترتيب. |
| §24 ✍️ 24. قواعد إضافة ING — مراجعة تطبيقية | s24 | خطوة §24 (الخطوة 25 من 39) | الحالات الأربع (إضافة مباشرة · حذف e · مضاعفة الحرف الأخير · ie ← ying) مع 12 فعلًا · مثال He will be running. وخطأ He will be runing. ❌ | نقل حرفي كما ورد. إضافة المنصة: ورشة كتابة صيغ -ing (16 فعلًا، منها أفعال إضافية للتدريب) مع العداد والتصحيح الفوري للصيغة. ملاحظة دقة: المصدر يقول «نضاعف الحرف الأخير في بعض الأفعال» بلا شرط؛ أضفنا بيان الشرط الدقيق (المقطع الأخير مُشدَّد وينتهي CVC) لأن visit → visiting وopen → opening بلا مضاعفة. |
| §25 ⚠️ 25. أفعال الحالة مع Future Continuous | s25 | خطوة §25 (الخطوة 26 من 39) | ستة أفعال حالة (know · believe · understand · want · need · own) · I will know the answer tomorrow. ✅ مقابل الصيغة المستمرة ❌ · She will own… ✅ · مثال think بمعنى نشاط التفكير | نقل حرفي كما ورد. إضافة المنصة: مختبر أفعال الحالة (أربعة بنود) + توضيح أن الحكم يعتمد على المعنى في السياق. |
| §26 🔥 26. المقارنة الكبرى: الأزمنة المستمرة الثلاثة | s26 | خطوة §26 (الخطوة 27 من 39) | أمثلة read في الأزمنة الثلاثة · الخريطة الذهنية (الزمن · الصيغة · النقطة المرجعية) · الفكرة المشتركة والاختلاف | نُقل المحتوى حرفيًا وأُعيد بناء تنسيق الجدول/الأعمدة. إضافة المنصة: مختبر تحديد النقطة المرجعية لكل نشاط. ملاحظة دقة: جدول الخريطة الذهنية أُعيد بناؤه بثلاثة أعمدة وثلاثة صفوف كما في المصدر بلا إضافة. |
| §27 ⚔️ 27. Future Simple vs BE GOING TO vs Future Continuous | s27 | خطوة §27 (الخطوة 28 من 39) | ثلاث صيغ للمشروع العلمي مع شرح كل واحدة · قاعدة IQ200 (قرار؟ خطة؟ أم لحظة تصف النشاط الجاري خلالها؟) | نقل حرفي كما ورد. إضافة المنصة: مختبر ثلاثي: اختيار الصيغة بحسب ما يقدّمه المتحدث. |
| §28 🧩 28. تدريب تأسيسي: اختر الصيغة الصحيحة | s28 | خطوة §28 (الخطوة 29 من 39) + مفاتيح في منطقة الحلول والمعلم | ستة أسئلة اختيار من متعدد مع حلولها (B be · C cooking · A will · B be · C using · A will) | نقل حرفي كما ورد. إضافة المنصة: نشاط تفاعلي بستة بنود مع تصحيح فوري لكل بند وكشف حلول المصدر كما وردت. |
| §29 ✍️ 29. تدريب التحويلات | s29 | خطوة §29 (الخطوة 30 من 39) | المثال (She will be reading at 8:00) · خمس جمل · لكل جملة صيغة نفي وصيغة سؤال مع الحلول | نقل حرفي كما ورد. إضافة المنصة: ورشة تحويل: كتابة النفي والسؤال لكل جملة مع فحص العناصر وكشف حلول المصدر. |
| §30 🕵️ 30. Grammar Detective — اكتشف الأخطاء | s30 | خطوة §30 (الخطوة 31 من 39) | عشر جمل خاطئة (كل جملة فيها خطأ واحد على الأقل) مع عشرة تصحيحات مفصلة | نقل حرفي كما ورد. إضافة المنصة: ورشة اكتشاف الأخطاء: كتابة التصحيح ثم عرض تصحيح المصدر مع سبب الخطأ لكل جملة. |
| §31 🚀 31. IQ200 — اختر الزمن المناسب بحسب المعنى | s31 | خطوة §31 (الخطوة 32 من 39) | ثمانية مواقف (الهاتف · المتحف · الامتحان الثامنة · السحب · الوعد · وصول الشخص · السفر · التكنولوجيا) مع مفاتيح المصدر وتعليل كل مفتاح | نقل حرفي كما ورد. إضافة المنصة: مختبر IQ200: اختيار بين ثلاث صيغ لكل موقف مع مفتاح المصدر بعد المحاولة. |
| §32 📖 32. Reading Challenge — A Day in the Future | s32 | خطوة §32 (الخطوة 33 من 39) | نص A Busy Saturday كاملًا (يوم دانيال من الفطور 8:00 إلى استخدام الحاسوب بعد 9:00) · ثمانية أسئلة فهم بالحلول · عناصر be going to and WILL داخل السياق | نقل حرفي كما ورد. إضافة المنصة: تمييز بصري اختياري لصيغ المستقبل + تحليل منصة لصيغ النص العشر مع سبب كل اختيار. |
| §33 🧠 33. تحدي متقدم: هل الزمنان صحيحان؟ | s33 | خطوة §33 (الخطوة 34 من 39) | I will work tomorrow. / I will be working tomorrow. · مثال Will you travel next week? / Will you be travelling next week? · قاعدة أن Future Continuous لا يحتاج ساعة محددة دائمًا | نقل حرفي كما ورد. إضافة المنصة: مختبر حكم: هل الجملتان صحيحتان مع اختلاف التركيز؟ |
| §34 🏆 34. الاختبار النهائي — Future Continuous Master Test | s34 | خطوة §34 + منطقة الاختبار الرسمية (Test Area) بمعرّف lesson37-test | 25 سؤالًا في خمسة مستويات: اختيار الإجابة (①–⑤) · إكمال الجمل (⑥–⑩) · تصحيح الأخطاء (⑪–⑮) · فهم المعنى (⑯–⑳) · فقرة Maya (㉑–㉕) | المفتاح غائب في المصدر — الإجابات إضافة من المنصة. إضافة المنصة: منطقة اختبار مستقلة بلا تصحيح فوري؛ الأسئلة الـ25 مرقّمة Q1–Q25 وموزعة 5 × 5، وكل سطر مصدري في §34 مرتبط بالواجهة. ملاحظة دقة: المصدر يعرض الأسئلة دون مفتاح إجابة؛ لذلك لا يُعرض أي مفتاح داخل الاختبار، وكُتبت الحلول الـ25 في وحدة مستقلة موسومة بأنها من إعداد المنصة. |
| §35 🔐 35. مساحة المعلم — الحلول التفصيلية للاختبار | s35 | خطوة §35 + منطقة Solutions (مقفلة حتى التسليم) + منطقة المعلم (كلمة المرور) | عنوان مفتاح التصحيح · «حاول حل الاختبار كاملًا قبل كشف الإجابات» · «عرض الحلول التفصيلية» | المفتاح غائب في المصدر — الإجابات إضافة من المنصة. إضافة المنصة: حلول تفصيلية للأسئلة الـ25 (25 بطاقة في منطقة الحلول و25 بطاقة في دليل المعلم) بنماذج وبدائل مقبولة، وكلها موسومة بأنها من إعداد المنصة/المعلم. |
| §36 ✍️ 36. مهمة الإنتاج اللغوي — Writing Mission | s36 | خطوة §36 (الخطوة 37 من 39) | العنوان My Life at This Time Tomorrow · فقرة 12–15 جملة · الشروط الثمانية ①–⑧ · النموذج الإرشادي (خمس أسطر) · تنبيه عدم النسخ | نقل حرفي كما ورد. إضافة المنصة: ورشة كتابة: عداد جمل تقريبي، وقائمة الشروط الثمانية، وكشف النموذج بعد كتابة الفقرة. |
| §37 🧠 37. الملخص الذهبي للدرس 37 | s37 | خطوة §37 (الخطوة 38 من 39) | الصيغة والنفي والسؤال والإجابة القصيرة وأسئلة المعلومات مع أمثلتها · أهم الاستخدامات الأربعة · القاعدة الذهبية بين Future Simple وFuture Continuous · تشبيه الكاميرا | نقل حرفي كما ورد. إضافة المنصة: مختبر وصل كل استخدام بمثاله الأصلي. |
| §38 🗺️ 38. خريطة تقدم المنهج | s38 | خطوة §38 (الخطوة 39 من 39) | منظومات الحاضر والماضي والمستقبل (①–⑫) وحالة الإكمال · المحطة القادمة الدرس 38: Future Perfect · المثال التمهيدي By 8:00 tomorrow, I will have finished my homework. · مقارنة الجمل الثلاث · خاتمة الدرس | نقل حرفي كما ورد. إضافة المنصة: اختبار تمهيدي قصير (ثلاثة بنود) على نص الخريطة ومثال الدرس 38. |

## Table reconstruction contracts

**§2 — timeline (three rows, exact source words)**

| الوقت | ما يحدث على الخط الزمني |
|---|---|
| 6:00 | بداية الدراسة |
| 7:00 | أثناء الدراسة |
| 9:00 | نهاية الدراسة |

**§5 — pronoun conjugation (seven rows, exact source sentences)**

| الفاعل | Future Continuous |
|---|---|
| I | I will be studying. |
| You | You will be studying. |
| He | He will be studying. |
| She | She will be studying. |
| It | It will be working. |
| We | We will be studying. |
| They | They will be studying. |

**§8 — time expressions (seven rows, exact source tokens)**

| التعبير الزمني | المعنى |
|---|---|
| at 8:00 tomorrow | غدًا عند الثامنة. |
| this time tomorrow | في مثل هذا الوقت غدًا. |
| at this time next week | في مثل هذا الوقت الأسبوع القادم. |
| tomorrow morning | صباح الغد. |
| all afternoon tomorrow | طوال فترة بعد الظهر غدًا. |
| from 6:00 to 9:00 tomorrow | من السادسة إلى التاسعة غدًا. |
| when you arrive | عندما تصل. |

**§26 — the three continuous tenses (three rows, three columns)**

| الزمن | الصيغة | النقطة المرجعية |
|---|---|---|
| Present Continuous | am/is/are + V-ing | الحاضر |
| Past Continuous | was/were + V-ing | لحظة في الماضي |
| Future Continuous | will be + V-ing | لحظة في المستقبل |

## Test and answer provenance contract

- The source Master Test is exactly **25** questions in five groups of five: Level 1 Q1–5 (choose the correct answer), Level 2 Q6–10 (complete the sentence), Level 3 Q11–15 (correct the error), Level 4 Q16–20 (explain the meaning/choice), Level 5 Q21–25 (Maya paragraph: four verb completions ㉑–㉔ plus the friend's question ㉕).
- `testData37.ts` consumes the 65 source lines of §34 **once each** (a call-time guard throws on a missing or duplicated line), so no question, option, marker, or trailing paragraph line can be lost or duplicated silently.
- The Test Area shows no correctness mark, no score, and no explanation before the final submission, and it never imports the solutions module. The score/answers are not computed in the test surface at all.
- All 25 detailed solutions are platform-authored teacher additions with an explicit `sourceStatus`. Each one states the answer, the reasoning, and — where the context allows more than one grammatical answer — the accepted alternatives and whether the alternative is *wrong*, *possible but less natural*, or *correct with a different focus*.
- Q16–Q20 are semantic/open answers: the key gives models and acceptance criteria, not a single mandatory wording.

## Planned audit contract

`scripts/audit-lesson37.mjs` verifies the ledger (39 sections, 38 numbered, one-to-one step mapping), exact source counts and representative source strings, the rebuilt tables, the §34 line-consumption contract, the 25-question/five-level structure, the 25 platform-authored solutions, per-step rendering and traceability attributes, reveal-after-attempt gating in §28–§32, the interactive labs (timeline, formula builder, parts analysis, conjugation, camera, dialogue, -ing, negative/question builders, detective, IQ30, reading, writing, summary, curriculum preview), Test Area neutrality, Solutions gating, the teacher gate and guide tabs, shell navigation (areas, aria-expanded, keyboard arrows), English-direction isolation (rendered-markup BIDI oracle), WCAG AA contrast pairs, and route/docs registration. It renders and exercises the interactions instead of treating headings alone as proof of coverage.
