# الدرس 33 — تغطية المادة والتحقق (Lesson 33 Coverage)

> وثيقة **مولّدة** من وحدات بيانات الدرس نفسها بواسطة `node scripts/lesson33-coverage-doc.mjs`، فلا يمكن أن تنفصل عن الدرس المنشور. الأرقام في هذه الصفحة هي أرقام `scripts/audit-lesson33.mjs` نفسه.

**الحالة:** أُعيد بناء الدرس وتحقّق منه. المادة = نص الدرس الكامل المقدَّم في المحادثة (الغلاف + 🎯 الأهداف + الأقسام المرقّمة ①–㉔).

- كتل المادة: **26** (الغلاف، الأهداف، و**24** قسمًا مرقّمًا ①–㉔).
- وحدات المادة بعد التطبيع: **454** — كل واحدة تظهر **مرة واحدة بالضبط** (غير مغطاة: **0**، مكرّرة: **0**).
- الشرائح: **71** في **8** محطات تعلّم.
- بنود مقفولة على محاولة الطالب: **48** في ست مجموعات (محقق ⑫، تدريب ⑬، تدريب ⑭، تحليل ⑰، صيد الفقرة ⑱، مواقف ⑲). `COVERAGE_SUMMARY_33.practiceItems` = 40 و`scripts/audit-lesson33.mjs` يعدّ 44 لأنه يجمع `ALL_PRACTICE_33 + DETECTIVE_33 + PARAGRAPH_SPOTS_33 + STORY_ROWS_33` (بلا ⑲).
- مختبرات تفاعلية: **18** على **19** شريحة.
- اختبار الدرس: **25** سؤالًا في **5** مستويات، و**30** حقل إجابة، ومفتاح تفصيلي **25/25**.
- تصحيحات موثّقة على نص المادة: **1** · أخطاء مقصودة محفوظة حرفيًا: **27**.

## قواعد الربط

- **لا يُضغط أي قسم في شريحة واحدة**: كل شريحة تعلن `ranges` صريحة من وحدات المادة، فيزداد عدد الشرائح بدل أن ينقص المحتوى.
- `SOURCE_SECTIONS_33` في `ledger33.ts` تحمل النص حرفيًا (مدخل واحد لكل سطر مُطبَّع). `coveredIndexes33()` تُرجع الوحدات التي ترسمها الشرائح، و`uncoveredUnits33()` و`duplicatedUnits33()` يجب أن تبقيا فارغتين (يفحصهما `scripts/audit-lesson33.mjs`).
- ثلاثة أدوار للوحدات: `ranges` = تظهر مباشرة في الشريحة، `keyRanges` = **حلّ مقترن بمحاولة الطالب** (لا يظهر قبل الضغط)، `headRanges`/`footRanges` = أسطر تمهيدية/ختامية حول مختبر تفاعلي.
- الجداول (①②⑦⑰) والحوارات وأزواج ❌/✅ تحافظ على بنيتها: `SourceLines33` بمتغيّرات `table` / `tenseTable` / `signalTable` / `steps` / `objectives`، و`Panel33`، و`TenseCard33`.
- مفاتيح ⑫⑬⑭⑰⑱⑲ تعيش في `practice33.ts` وتُعرض فقط عبر `AttemptCard` بعد محاولة الطالب، وتُعاد للمعلم خلف بوابته.
- ⑳ يُرسم عبر `TestArea33` وحده؛ المصحّح (`key33.ts`) والحلول (`SolutionsArea33.tsx`) ودليل المعلم (`TeacherGuide33.tsx`) **قطع مؤجَّلة منفصلة** ليست ضمن حزمة الطالب ولا ضمن DOM الدراسة.

## خريطة القسم ← الشرائح

| § | القسم | وحدات ظاهرة / مقفولة / الكل | الشرائح | موضع الإجابات |
|---|---|---|---|---|
| الغلاف | الدرس 33: The Four Present Tenses | 4 + 0 / 4 | `cover`، `s0-why` | داخل الشريحة |
| 🎯 | 🎯 أهداف الدرس | 8 + 0 / 8 | `obj-a`، `obj-b` | داخل الشريحة |
| 1 | 🧠 الخريطة الذهبية لأزمنة الحاضر | 22 + 0 / 22 | `s1-a`، `s1-b`، `s1-c` | داخل الشريحة |
| 2 | ⭐ جدول البناء الأساسي | 11 + 0 / 11 | `s2-a`، `s2-b` | داخل الشريحة |
| 3 | 🔬 مختبر المعنى: الفعل نفسه بأربعة أزمنة | 16 + 0 / 16 | `s3-a`، `s3-b`، `s3-c` | داخل الشريحة |
| 4 | 🧠 السؤال الذي يحدد الزمن | 26 + 0 / 26 | `s4-a`، `s4-b`، `s4-c` | داخل الشريحة |
| 5 | ⚙️ الإثبات والنفي والسؤال في الأزمنة الأربعة | 49 + 0 / 49 | `s5-a`، `s5-b`، `s5-c`، `s5-d`، `s5-e` | داخل الشريحة |
| 6 | 🚨 لا تخلط الأفعال المساعدة | 11 + 0 / 11 | `s6-a`، `s6-b` | داخل الشريحة |
| 7 | ⏰ الكلمات الدالة: أدوات مساعدة وليست قوانين مطلقة | 13 + 0 / 13 | `s7-a`، `s7-b` | داخل الشريحة |
| 8 | 🔥 Present Simple vs Present Continuous | 18 + 3 / 21 | `s8-a`، `s8-b`، `s8-c` | داخل الشريحة |
| 9 | 🔥 Present Continuous vs Present Perfect Continuous | 18 + 0 / 18 | `s9-a`، `s9-b` | داخل الشريحة |
| 10 | 🔥 Present Perfect vs Present Perfect Continuous | 15 + 5 / 20 | `s10-a`، `s10-b` | داخل الشريحة |
| 11 | 🧠 أفعال الحالة — Stative Verbs | 23 + 0 / 23 | `s11-a`، `s11-b`، `s11-c` | داخل الشريحة |
| 12 | 🕵️ Grammar Detective — المستوى الأول | 10 + 10 / 20 | `s12-a`، `s12-b` | بطاقة المحقق بعد المحاولة + TeacherGuide33 |
| 13 | ✍️ التدريب الأول: اختر الزمن المناسب | 13 + 0 / 13 | `s13-a`، `s13-b` | بطاقة التدريب بعد المحاولة + TeacherGuide33 |
| 14 | 🧩 التدريب الثاني: أربع جمل، أربعة أزمنة | 12 + 5 / 17 | `s14-a`، `s14-b`، `s14-c` | بطاقة التدريب بعد المحاولة + TeacherGuide33 |
| 15 | 🧠 مستوى IQ200: متى تكون إجابتان صحيحتين؟ | 12 + 5 / 17 | `s15-a`، `s15-b` | داخل الشريحة |
| 16 | 📖 Reading Challenge — قصة الأزمنة الأربعة | 8 + 0 / 8 | `s16-a`، `s16-b` | داخل الشريحة |
| 17 | 🔍 تحليل القصة | 13 + 0 / 13 | `s17-a`، `s17-b` | بطاقة التحليل بعد الاختيار + TeacherGuide33 |
| 18 | 🕵️ Grammar Detective — المستوى المتقدم | 6 + 12 / 18 | `s18-a`، `s18-b`، `s18-c`، `s18-d` | محقق الفقرة بعد إصلاح كل المواضع + TeacherGuide33 |
| 19 | 🚀 IQ200 — تحدي اختلاف المعنى | 13 + 4 / 17 | `s19-a`، `s19-b` | داخل الشريحة |
| 20 | 🏆 الاختبار النهائي — Present Tenses Master Test | 39 + 0 / 39 | `s20-intro`، `test-l1`، `test-l2`، `test-l3`، `test-l4a`، `test-l4b`، `test-l5a`، `test-l5b`، `test-result` | TestArea33 ثم SolutionsArea33 (بعد التسليم) |
| 21 | 🔐 مساحة الحلول التفصيلية | 3 + 0 / 3 | `s21` | SolutionsArea33 (مقفلة حتى التسليم) |
| 22 | ✍️ مهمة الإنتاج اللغوي — Writing Mission | 13 + 0 / 13 | `s22-a`، `s22-b`، `s22-c` | داخل الشريحة |
| 23 | 🧠 الملخص الذهبي للدرس 33 | 23 + 0 / 23 | `s23-a`، `s23-b`، `s23-c` | داخل الشريحة |
| 24 | 🗺️ خريطة تقدمنا في المنهج | 11 + 0 / 11 | `s24-a`، `s24-b` | داخل الشريحة |

## محطات التعلّم

| المحطة | الشرائح | أقسام المادة |
|---|---:|---|
| 🚀 الانطلاق — Orientation (`start`) | 4 | الغلاف، الأهداف |
| 🗺️ الخريطة الذهبية — The Golden Map (`map`) | 11 | 1، 2، 3، 4 |
| ⚙️ البناء والأدوات — Forms & Signals (`build`) | 9 | 5، 6، 7 |
| ⚔️ المواجهات — Tense Duels (`duel`) | 10 | 8، 9، 10، 11 |
| 🕵️ المحقق والتدريب — Grammar Detective (`detective`) | 9 | 12، 13، 14، 15 |
| 📖 القراءة والتحليل — Reading & Analysis (`reading`) | 10 | 16، 17، 18، 19 |
| 🏆 الاختبار والحلول — Master Test (`master`) | 10 | 20، 21 |
| ✍️ الإنتاج والخاتمة — Writing & Roadmap (`output`) | 8 | 22، 23، 24 |
| **المجموع** | **71** | — |

## أنواع الشرائح

| النوع | الشرائح | المكوّن |
|---|---:|---|
| `lesson` | 45 | `Frame33` + `SourceLines33` / `NumberCards33` / `Panel33` / `TenseCard33` |
| `test` | 7 | `TestArea33` (embedded) — بيانات `testData33.ts` فقط |
| `paragraph` | 4 | `ParagraphDetective33` + `GatedLines33` |
| `practice` | 3 | `PracticeSet33` + `AttemptCard` |
| `writing` | 3 | `WritingEditor33` |
| `detective` | 2 | `DetectiveSet33` + `GatedLines33` |
| `reading` | 2 | `StoryReader33` + `StoryHighlight33` + `highlightPhrases33()` |
| `analysis` | 2 | `AnalysisSet33` |
| `cover` | 1 | `Cover33` + `Lens33` ×4 |
| `testResult` | 1 | `TestResult33View` + lazy `SolutionsArea33` |
| `solutions` | 1 | lazy `SolutionsArea33` |

## متغيّرات العرض

| المتغيّر | الشرائح |
|---|---:|
| `forms` | 4 |
| `objectives` | 2 |
| `tense` | 2 |
| `steps` | 2 |
| `duel` | 2 |
| `tenseTable` | 1 |
| `signalTable` | 1 |

## المختبرات التفاعلية

| المختبر | الشرائح |
|---|---|
| `model-flip` | `s1-c` |
| `form-match` | `s2-b` |
| `nora-sort` | `s3-c` |
| `context-match` | `s4-c` |
| `short-answers` | `s5-e` |
| `pick-correct` | `s6-a` |
| `signal-sort` | `s7-b` |
| `duel-choose` | `s8-c` |
| `question-match` | `s9-b` |
| `focus-lens` | `s10-b` |
| `stative-gate` | `s11-a` |
| `think-split` | `s11-c` |
| `both-correct` | `s15-a` |
| `story-highlight` | `s16-b` |
| `situation-match` | `s19-a`، `s19-b` |
| `golden-flip` | `s23-b` |
| `golden-rule` | `s23-c` |
| `progress-map` | `s24-a` |

## مجموعات التدريب المقفولة على المحاولة

| § | العناصر | ما الذي يُقفل |
|---|---:|---|
| 12 | 8 | Grammar Detective — المستوى الأول: ٨ جمل خاطئة + ٨ حلول من نص المادة حرفيًا |
| 13 | 10 | التدريب الأول: ١٠ فراغات + حلّ مشتقّ موسوم بأنه من المنصة |
| 14 | 4 | التدريب الثاني (design): ٤ جمل + حلولها وسببا «لماذا» من نص المادة حرفيًا |
| 17 | 11 | تحليل القصة: جدول ١١ صفًا (العبارة ← الزمن ← السبب) من نص المادة حرفيًا |
| 18 | 11 | Grammar Detective المتقدم: ١١ موضعًا في فقرة Emma + الفقرة المصحّحة + الأسباب |
| 19 | 4 | تحدي اختلاف المعنى (IQ200): ٤ مواقف + الزمن + السبب |

## صفحات اختبار الدرس (⑳)

| الشريحة | المستوى | عنوان المستوى من المادة | الأسئلة | النوع | الحقول |
|---|---:|---|---|---|---:|
| `test-l1` | 1 | المستوى الأول: اختيار الزمن | 1–5 (5) | `complete` | 5 |
| `test-l2` | 2 | المستوى الثاني: تصريف الفعل | 6–10 (5) | `complete` | 6 |
| `test-l3` | 3 | المستوى الثالث: تصحيح الأخطاء | 11–15 (5) | `correct` | 5 |
| `test-l4a`، `test-l4b` | 4 | المستوى الرابع: فهم المعنى | 16–20 (5) | `meaning+verdict` | 7 |
| `test-l5a`، `test-l5b` | 5 | المستوى الخامس: Final Boss | 21–25 (5) | `boss` | 7 |

شرائح الاختبار والنتيجة والحلول: `test-l1`، `test-l2`، `test-l3`، `test-l4a`، `test-l4b`، `test-l5a`، `test-l5b`، `test-result`، `s21`.

### اكتمال مفتاح الإجابة التفصيلي

| البند | العدد |
|---|---:|
| أسئلة الاختبار | 25 |
| مستويات | 5 |
| حقول إجابة في أسئلة الطالب | 30 |
| مدخلات المفتاح في `key33.ts` | 25 |
| مدخلات تحمل `answer` + `tense` + `reason` | 25 |
| أسئلة متعددة الحقول (`fieldRules`) | 3 |
| بدائل صحيحة موثّقة (`alternatives`) | 4 |
| تفسيرات خطأ للمستوى الثالث (`errorNote`) | 5 |
| مدخلات بقاعدة كلمات مفتاحية على المستوى الأعلى (`keywords`) | 0 |
| حقول داخل `fieldRules` تُصحَّح بالكلمات المفتاحية | 3 |
| مفتاح من نص المادة (`provenance: "source"`) | 5 |
| مفتاح مشتقّ موسوم (`provenance: "platform"`) | 20 |

#### الأسئلة التي لا تُختزل إلى كلمة واحدة

| السؤال | ما يطلبه | كيف نُفِّذ |
|---|---|---|
| ⑳ | هل الجملتان صحيحتان؟ + فرق التركيز | 3 خيارات (كلتاهما/الأولى/الثانية) + `fieldRules` لثلاثة حقول: `verdict` و`focusA` و`focusB` (الأخيرتان تُصحَّحان بالكلمات المفتاحية) |
| ㉕ | فعلان + شرح | `fieldRules` لثلاثة حقول: `rehearse` و`know` و`why` (الشرح يُصحَّح بالكلمات المفتاحية) |

#### فقرة Mia (المستوى الخامس) — 3 جمل مصحّحة

- `Mia is a talented musician. She usually practices the violin after school. This month, she is preparing for an international competition.`
- `She has won three local competitions so far, and she has been training for the international event since July.`
- `Today, she is rehearsing with her teacher, who has known her for eight years.`

## التصحيحات الموثّقة على نص المادة

### 18 · `gd2-count` (مصدر التصحيح: ملاحظة المادة نفسها)

- **كما ورد في المادة:** في الفقرة التالية عشرة أخطاء. حاول اكتشافها:
- **المعتمد في السجل:** في الفقرة التالية أحد عشر موضعًا يحتاج إلى تصحيح. حاول اكتشافها:
- **السبب والدليل:** تناقض عددي داخل المادة نفسها: سطر التعليمات يقول «عشرة أخطاء»، بينما ملاحظة المادة الختامية تقول «يوجد أحد عشر موضعًا يحتاج إلى تصحيح»، وقائمة الحلول المنشورة في المادة مرقّمة ①–⑪. العدّ الحرفي لمواضع الاختلاف بين فقرة Emma الأصلية وفقرة الحل يعطي 11 موضعًا بالضبط: (1) is walking→walks، (2) takes→is taking، (3) has been completed→has completed، (4) is knowing→has known، (5) prepares→is preparing، (6) has worked→has been working، (7) since five hours→for five hours، (8) hasn't finish→hasn't finished، (9) classmates has→have، (10) has been writing→has written، (11) doesn't working→isn't working. لذلك وُحِّد العدد على أحد عشر حتى يتطابق عنوان التحدي مع عدد الأخطاء ومع الحلول المعروضة للطالب.

## الأخطاء المقصودة المحفوظة حرفيًا (27)

تُدرَّس كما هي ولا تُصلح بصمت؛ كل زوج ❌/✅ يبقى ظاهرًا للطالب مع سببه.

| القسم | ❌ | ✅ |
|---|---|---|
| 6 | `Does she practices?` | `Does she practice?` |
| 6 | `Is she practice now?` | `Is she practicing now?` |
| 6 | `Has she practice before?` | `Has she practiced before?` |
| 6 | `Has she been practiced?` | `Has she been practicing?` |
| 7 | `I have been knowing her for seven years.` | `I have known her for seven years.` |
| 11 | `I have been owning this bicycle for four years.` | `I have owned this bicycle for four years.` |
| 11 | `She has been knowing the answer since yesterday.` | `She has known the answer since yesterday.` |
| 8 | `She is drinking tea every morning.` | `She drinks tea every morning.` |
| 12 | `He is usually going to school by bus.` | `He usually goes to school by bus.` |
| 12 | `They have been finish the project.` | `They have finished the project.` |
| 12 | `Does your sister studies French?` | `Does your sister study French?` |
| 12 | `I have been knowing him since 2020.` | `I have known him since 2020.` |
| 12 | `Look! The dog runs across the garden.` | `Look! The dog is running across the garden.` |
| 12 | `She has wrote four articles this month.` | `She has written four articles this month.` |
| 12 | `We are waiting here since 9:00.` | `We have been waiting here since 9:00.` |
| 12 | `Have you ever been visiting Egypt?` | `Have you ever visited Egypt?` |
| 18 | `Emma usually is walking to university` | `Emma usually walks to university` |
| 18 | `this week she takes the train` | `this week she is taking the train` |
| 18 | `She has been completed two research papers so far.` | `She has completed two research papers so far.` |
| 18 | `She is knowing her professor for three years.` | `She has known her professor for three years.` |
| 18 | `At the moment, she prepares a presentation.` | `At the moment, she is preparing a presentation.` |
| 18 | `She has worked on it since five hours` | `She has been working on it for five hours` |
| 18 | `since five hours` | `for five hours` |
| 18 | `hasn't finish it yet` | `hasn't finished it yet` |
| 18 | `Her classmates has already sent their slides` | `Her classmates have already sent their slides` |
| 18 | `Emma has been writing only three slides` | `Emma has written only three slides` |
| 18 | `She doesn't working on anything else today.` | `She isn't working on anything else today.` |

## ملاحظات نُقلت عن المادة كما هي

- **⑬ و⑳/㉑:** المادة تعد بـ«الحلول المفصلة»/«مفتاح التصحيح» لكنها لا تسرد إجابات ⑬ و⑳ نصًا. كل مفتاح مشتقّ في المنصة موسوم `provenance: "platform"` ويظهر للطالب بشارة `PlatformTag33` («شرح المنصة») حتى لا يُنسب إلى المادة.
- **⑦:** تحذير `for/since` مع أفعال الحالة، وملاحظة أن الكلمات الدالة «مساعدات لا قواعد مطلقة»، محفوظتان نصًا؛ وتُنفَّذان في `signal-sort` مع `SIGNAL_AMBIGUOUS_33`.
- **⑮:** قاعدة أن Present Perfect مقبول بجانب Present Perfect Continuous بعد `for/since` هي التي بُنيت عليها `alternatives` في المفتاح (q4 وq8 وq15 وq24).
- **⑱:** الفقرة الخاطئة والفقرة المصحّحة وأسباب التصحيح ①–⑪ كلها من المادة حرفيًا؛ التغيير الوحيد هو توحيد عدد المواضع (انظر أعلاه).
- **㉔:** إحالة الدرس التالي (34 — Future Simple WILL) تُرسم عبر `progress-map` مع `PROGRESS_NEXT_33`.

## ما لا يظهر للطالب

- لا تسميات مصدرية: «المصدر»، «المصدر قسم X»، أسماء الملفات، أعداد الأسطر، أو علامات تحريرية داخلية. يفحص `scripts/lib/student-copy-audit.mjs` النص **المرسوم فعلًا** في 222 سياقًا.
- لا مفتاح إجابة في DOM الطالب ولا في البيانات المحمّلة له قبل السماح: `key33.ts` قطعة مؤجَّلة (`dist/assets/key33-*.js`) تصل فقط عبر `SolutionsArea33` بعد التسليم أو عبر `TeacherArea33` بعد كلمة المرور.
- بوابة المعلم كلمة مرور **في المتصفح فقط** (`somer173`)؛ ليست حماية خادمية ولا تُوصف كذلك.

