# Lesson 39 — Future Perfect Continuous: source-coverage ledger

## Base and provenance

- Implemented route: `#/lesson/39` (hub card `n: 39`, gradient `from-[#17354a] to-[#245f62]`).
- Lesson title: **الدرس 39: Future Perfect Continuous — المستقبل التام المستمر**.
- Source opening title: **How Long Will You Have Been Learning?** — kept verbatim as the cover headline (the GB flag emoji at the start of the source line is stripped per the repository rule "no flag emoji in lesson UI or ledger text").
- Arabic subtitle (`LESSON_ARABIC_SUBTITLE_39`): **من معرفة المستقبل إلى قياس مدة النشاط في المستقبل — IQ200 🚀**; level (`LESSON_LEVEL_39`): **تأسيسي متقدم — IQ200**.
- Source of truth: the complete Lesson 39 text supplied in the implementation request. No PDF, scan, page image, or official answer key was available; nothing was verified against an external textbook.
- The supplied material has an unnumbered opening (cover) plus **39 numbered source sections**. Sections keep their numbers 1–39 and receive IDs `s01`–`s39`; the opening is the separate `cover` step.
- Native student sequence: `cover`, then `s01`–`s39` in source order = **40 steps** (`STEP_COUNT_39 = 40`, `NUMBERED_STEP_COUNT_39 = 39`, `COVERAGE_SECTION_COUNT_39 = 39`, 688 ledger source lines).
- Chapters (13): LAUNCH (cover, s01, s02) · FORM (s03–s05) · USE (s06, s07) · DURATION (s08–s11) · REFERENCE (s12–s14) · DIALOGUE (s15) · COMPARE (s16–s18) · NEGATION (s19, s20) · QUESTIONS (s21–s24) · TENSES (s25–s27) · PRACTICE (s28–s33) · ASSESSMENT (s34–s36) · WRAP (s37–s39).
- §35 is the *Future Perfect Continuous Master Test*: all **25** questions live once in the dedicated Test Area (`lesson39-test`). Its student step is a launch step that keeps the source section visible and points to the test; it does not duplicate the questions.
- §36 (Teacher solutions area) contains only the heading and «عرض الحلول التفصيلية». The source supplies **no** answer key for §35, so all 25 answers and explanations are **platform/teacher additions**, kept in `src/lessons/lesson39/solutionsData39.ts`, marked `data-source-status="platform-authored-teacher-addition"`, and shown only in the gated Solutions/Teacher surfaces.
- §39 (curriculum map) ends the future-tense sequence and names **Lesson 40 — Future Tenses Master Review** as *planned*. Lesson 40 is **not implemented** in this PR: the map renders `[data-next-lesson="planned-not-implemented"]`, no route or hub card exists for it, and no navigation depends on it.

## Pre-implementation source audit notes

See `docs/lesson39-source-audit.md` (exercise inventory = **62** numbered items, provenance split, grammar qualifications, unverifiable items). Summary:

1. **No PDFs, page images, scans, or official keys** were in the repository or in the request. The authority is the supplied 39-section text.
2. Five tables lost their column rules in the dump and were rebuilt without adding or rewording cells: **§2** timeline, **§5** pronouns, **§10** for/since, **§16** FP-vs-FPC question table, **§25** three perfect continuous tenses.
3. **§35** has 25 questions and **no key**; **§36** is a stub («عرض الحلول التفصيلية»); **§37** gives criteria and a guidance model but no scored rubric.
4. **§34** supplies its own seven answers (kept verbatim). Its key names one Future Perfect Continuous sentence while the passage contains **two**; this is recorded as a fidelity nuance (`READING34_CHECK_39` id `two-fpc-sentences`) instead of silently rewriting the source key.
5. **§29 units 0–7 overlap §35 units 3–10** (Q1 and Q2 of the Master Test repeat two §29 items verbatim). Both occurrences are kept in source order; the duplication is documented rather than edited away, and the audit asserts exactly two overlapping prompts.

## Terminology and precision contract

- Tense name: **Future Perfect Continuous (المستقبل التام المستمر)**.
- Core form: `Subject + will + have + been + V-ing`. `have` never becomes `has` after `will`; `been` never becomes `being`.
- Negation: `Subject + will not / won't + have + been + V-ing`. Yes/No: `Will + Subject + have + been + V-ing?`. Wh: `Wh-word + will + Subject + have + been + V-ing?`. `How long` is the signature question. Short answers: `Yes, I will.` / `No, I won't.`
- The lesson measures **duration up to a future reference point**, not completion. It explicitly refuses the "FP = finished / FPC = not finished" shortcut (§18) and the "for forces FPC" claim (§33).
- `for + duration` (for five years / two hours / three months / ten minutes) vs `since + starting point` (since 2021 / 6:00 / January / 9:30).
- `by` marks the reference point; `by the time` introduces a time clause in **Present Simple**: `By the time + present simple, ... will have been V-ing`.
- Stative verbs (know, believe, understand, want, need, own) prefer the simple form: `will have known`, not `will have been knowing`.
- Three-way comparison: PPC `have/has been + V-ing` (الحاضر) · PaPC `had been + V-ing` (نقطة ماضية) · FPC `will have been + V-ing` (نقطة مستقبلية).

## Coverage ledger — all 39 numbered sections and the introduction

The in-app ledger is `src/lessons/lesson39/coverage39.ts` (40 rows). A compact copy:

| Source | Native location | Transfer | Platform addition |
|---|---|---|---|
| المقدمة (cover) | خطوة الغلاف (Cover) في Student Area + لافتات مقياس المدة | verbatim | غلاف بصري بهوية Duration Lab وبطاقة تذكّر بجسر الدرس 38 دون استبدال نص المصدر. |
| §1 أهداف الدرس | خطوة §1 (الخطوة 2 من 40) — كل هدف كما ورد | verbatim | قائمة مراجعة ذاتية تفاعلية للأهداف العشرة. |
| §2 الفكرة الأساسية: نحن لا نقيس الإنجاز، بل المدة | خطوة §2 (الخطوة 3 من 40) | table-rebuilt | مختبر الخط الزمني التفاعلي: ست نقاط قابلة للنقر مع قراءة مدة لكل نقطة (4:00 → 8:00 = 4 ساعات)، ثم سؤال يحدد نقطة المرجع. |
| §3 القاعدة الأساسية | خطوة §3 (الخطوة 4 من 40) | verbatim | بانِي الصيغة: ترتيب Subject → will → have → been → V-ing بالنقر ثم التحقق. |
| §4 تحليل التركيب خطوة بخطوة | خطوة §4 (الخطوة 5 من 40) | verbatim | تشريح الجملة تفاعليًا (تعيين دور كل جزء) + تحقق سريع من have مقابل has. |
| §5 التصريف مع جميع الضمائر | خطوة §5 (الخطوة 6 من 40) | table-rebuilt | لوحة تصريف تفاعلية (اختيار الضمير) + مختبر أخطاء شائعة (has بعد will · being بدل been). |
| §6 الاستخدام الأول: نشاط يستمر حتى نقطة مستقبلية | خطوة §6 (الخطوة 7 من 40) | verbatim | مختبر من خمسة بنود: اختيار الجملة التي تقيس المدة حتى نقطة مستقبلية + بند السؤال الذهبي. |
| §7 هل يجب أن يستمر النشاط بعد النقطة المستقبلية؟ | خطوة §7 (الخطوة 8 من 40) | verbatim | مختبر بندَين يثبّت أن الاستمرار بعد نقطة المرجع غير مضمون. |
| §8 FOR — للتعبير عن المدة | خطوة §8 (الخطوة 9 من 40) | verbatim | مختبر من ثلاثة بنود حول معنى for واختيارها في الفراغ. |
| §9 SINCE — للتعبير عن نقطة البداية | خطوة §9 (الخطوة 10 من 40) | verbatim | مختبر من أربعة بنود، أحدها يوضّح أن since تحدد البداية وأن المدة تُقال بـ for. |
| §10 FOR vs SINCE — المقارنة الذهبية | خطوة §10 (الخطوة 11 من 40) | table-rebuilt | لوحة فرز ثمانية تعبيرات بين عمودَي FOR وSINCE + ثلاثة بنود مفهومية. |
| §11 مختبر حساب المدة | خطوة §11 (الخطوة 12 من 40) | verbatim | مختبر حساب المدة: اختيار نقطة البداية ونقطة المرجع لكل مثال، فيُحسب الفرق ويُعرض مع جملة المصدر. |
| §12 BY — النقطة المستقبلية المرجعية | خطوة §12 (الخطوة 13 من 40) | verbatim | مختبر من أربعة بنود: إنجاز أم مدة؟ |
| §13 BY THE TIME — بحلول الوقت الذي | خطوة §13 (الخطوة 14 من 40) | verbatim | مختبر من أربعة بنود يحدد نقطة القياس والمدة المقاسة في كل مثال. |
| §14 لا تستخدم WILL بعد BY THE TIME الزمنية | خطوة §14 (الخطوة 15 من 40) | verbatim | مختبر تصنيف من أربعة بنود، أحدها (إضافة منصة) جملة ماضية By the time he arrived, I had been waiting for an hour. لتحديد مجال القاعدة. |
| §15 حوار تطبيقي: The Long Study Day | خطوة §15 (الخطوة 16 من 40) | verbatim | قارئ حوار تفاعلي: فتح كل دور لعرض ترجمته وتحليله، مع بندَي فهم (لماذا الزمنان؟ والتحقق من حساب 3:00→8:00 = 5 ساعات). |
| §16 Future Perfect vs Future Perfect Continuous | خطوة §16 (الخطوة 17 من 40) | table-rebuilt | مختبر من خمسة بنود: أي زمن يناسب أي سؤال، وبند يثبّت أن «النموذجي» لا يعني اختيارًا آليًا. |
| §17 النتيجة vs المدة — أمثلة متقابلة | خطوة §17 (الخطوة 18 من 40) | verbatim | مختبر الأزواج: اختيار الجملة التي تبرز المدة أو الإنجاز داخل كل زوج، مع تغذية راجعة تذكر التركيزين. |
| §18 هل Future Perfect Continuous يعني أن العمل لم ينتهِ؟ | خطوة §18 (الخطوة 19 من 40) | verbatim | مختبر من ثلاثة بنود يرفض صراحة قاعدة «انتهى / لم ينتهِ» المبسّطة. |
| §19 النفي — Negative Form | خطوة §19 (الخطوة 20 من 40) | verbatim | بانِي النفي: كتابة نفي كل مثال من أمثلة المصدر الثلاثة مع فحص العناصر (won't/will not · have been · V-ing). |
| §20 معنى النفي في المستقبل التام المستمر | خطوة §20 (الخطوة 21 من 40) | verbatim | مختبر بندَين يشمل التحقق من حساب 5:00→8:00 = ثلاث ساعات. |
| §21 تكوين السؤال — Yes/No Questions | خطوة §21 (الخطوة 22 من 40) | verbatim | بانِي السؤال: تحويل ثلاث جمل مثبتة إلى أسئلة المصدر مع فحص الترتيب وعلامة السؤال. |
| §22 الإجابات القصيرة | خطوة §22 (الخطوة 23 من 40) | verbatim | مختبر من أربعة بنود لاختيار الإجابة القصيرة الصحيحة وقاعدتها. |
| §23 HOW LONG — السؤال الأهم في هذا الزمن | خطوة §23 (الخطوة 24 من 40) | verbatim | بانِي أسئلة How long الثلاثة مع فحص الترتيب (How long → will → الفاعل → have been → V-ing) وعرض إجابة المصدر بعد المحاولة. |
| §24 أسئلة Wh الأخرى | خطوة §24 (الخطوة 25 من 40) | verbatim | مختبر من أربعة بنود يربط كل سؤال بما يسأل عنه. |
| §25 المقارنة الكبرى: الأزمنة التامة المستمرة الثلاثة | خطوة §25 (الخطوة 26 من 40) | table-rebuilt | مختبر من ستة بنود: مطابقة كل زمن بصيغته ونقطة مرجعه. |
| §26 أفعال الحالة مع Future Perfect Continuous | خطوة §26 (الخطوة 27 من 40) | verbatim | لوحة الأفعال الستة + مختبر حكم من ثلاثة بنود (including both-correct for live). |
| §27 أخطاء شائعة جدًا | خطوة §27 (الخطوة 28 من 40) | verbatim | مختبر تشخيص الأخطاء السبعة: اختيار التصحيح مع تسمية نوع الخطأ لكل بند. |
| §28 حوار تطبيقي: The Marathon Training | خطوة §28 (الخطوة 29 من 40) | verbatim | قارئ حوار تفاعلي + ثلاثة بنود فهم (حساب 3+1 = 4 أشهر · الزمن غير المستخدم · صيغة الجملة الزمنية). |
| §29 التدريب الأول: اختر الصيغة الصحيحة | خطوة §29 (الخطوة 30 من 40) + المفتاح في بطاقة المصدر بعد المحاولة وفي دليل المعلم | verbatim | نشاط تفاعلي بستة بنود مع تصحيح فوري وكشف مفتاح المصدر بعد إتمام البنود الستة. |
| §30 التدريب الثاني: أكمل باستخدام Future Perfect Continuous | خطوة §30 (الخطوة 31 من 40) | verbatim | ورشة إكمال كتابية مع قبول will not/won't وكشف مفتاح المصدر بعد المحاولة. |
| §31 التدريب الثالث: Future Perfect أم Future Perfect Continuous؟ | خطوة §31 (الخطوة 32 من 40) | verbatim | مختبر اختيار الزمن بثمانية بنود مع سبب المصدر لكل بند وكشف المفتاح بعد المحاولة. |
| §32 Grammar Detective — اكتشف الأخطاء | خطوة §32 (الخطوة 33 من 40) | verbatim | ورشة اكتشاف الأخطاء: كتابة التصحيح ثم عرض تصحيح المصدر مع سبب الخطأ (إضافة منصة) لكل جملة. |
| §33 IQ200 — هل الزمنان صحيحان؟ | خطوة §33 (الخطوة 34 من 40) | verbatim | مختبر حكم من ثلاثة بنود يثبّت أن الكلمات الدالة ليست محددات آلية للزمن. |
| §34 Reading Challenge — The Long Journey | خطوة §34 (الخطوة 35 من 40) | verbatim | ساعة رحلة تفاعلية (6:00 a.m. · 11:00 · noon · 6:00 p.m.) + سبعة حقول إجابة + تمييز بصري اختياري للصيغ + تحليل ست صيغ (إضافة منصة) + ثلاثة بنود تحقق من الحساب. |
| §35 الاختبار النهائي — Future Perfect Continuous Master Test | خطوة §35 (خطوة إطلاق) + منطقة الاختبار الرسمية (Test Area) بمعرّف lesson39-test | key-missing-in-source | منطقة اختبار مستقلة بلا تصحيح فوري؛ الأسئلة الـ25 مرقّمة Q1–Q25 وموزعة 5 × 5، وكل سطر من أسطر §35 (58 سطرًا) مرتبط بالواجهة مرة واحدة. |
| §36 مساحة المعلم — الحلول التفصيلية للاختبار | خطوة §36 + منطقة Solutions (مقفلة حتى التسليم) + منطقة المعلم (كلمة المرور) | key-missing-in-source | حلول تفصيلية للأسئلة الـ25 (25 بطاقة في منطقة الحلول و25 بطاقة في دليل المعلم) بنماذج وبدائل مقبولة، وكلها موسومة بأنها من إعداد المنصة/المعلم. |
| §37 مهمة الإنتاج اللغوي — Writing Mission | خطوة §37 (الخطوة 38 من 40) | verbatim | ورشة كتابة: عداد جمل تقريبي، قائمة الشروط الثمانية، كشف النموذج بعد كتابة 12 جملة، وجدول يربط كل سطر من النموذج بصيغته (إضافة منصة). |
| §38 الملخص الذهبي للدرس 39 | خطوة §38 (الخطوة 39 من 40) | verbatim | مختبر وصل من سبعة بنود (كل صيغة بمثالها الأصلي) + بطاقة الاستخدامات الثلاثة. |
| §39 خريطة تقدم المنهج | خطوة §39 (الخطوة 40 من 40) | verbatim | خريطة تفاعلية للصيغ الست مع دروسها المنفَّذة (34–39) ونمط كل صيغة، وبطاقة «المحطة القادمة» موسومة بأنها مخططة وغير منفَّذة. |

### Source-accuracy and fidelity notes kept in the app ledger

- **cover** — علم المملكة المتحدة (إيموجي GB) في بداية سطر العنوان حُذف وفق قاعدة المستودع (لا أعلام إيموجي في واجهة الدروس)؛ بقية السطر محفوظ حرفيًا.
- **§2** — سطر الخط الزمني ورد في النسخ بلا أعمدة (NOW ─ 4:00 … ─ 8:00) وتحته ثلاثة أوصاف (بداية الدراسة ← استمرار الدراسة ← نقطة المرجع المستقبلية). أُعيد بناؤه جدولًا من ست نقاط بالنقاط الزمنية والأوصاف الثلاثة نفسها، ووُسم NOW بأنه لحظة الكلام لأن المصدر لم يحدد له دورًا؛ والحساب المعروض (4 ساعات) مطابق لحساب المصدر.
- **§5** — الجدول في النسخ المورّد بلا خطوط أعمدة: أُعيد بناؤه جدولًا من عمودين (الفاعل × الجملة) بالصفوف السبعة نفسها دون تغيير أي خلية.
- **§7** — هذا القسم هو الذي يمنع تدريس القاعدة المبسّطة الخاطئة (التام = توقف، التام المستمر = لم يتوقف)؛ حُفظ نصه كاملًا ورُبط بـ§18.
- **§9** — مثال المصدر By noon, I will have been working since 7:00. صحيح لكنه يذكر نقطة البداية فقط دون المدة؛ أُضيفت ملاحظة منصة مؤهلة (لا تعديل على النص) تبيّن أن الصيغة الأوضح لذكر المدة هي for five hours، وأن الجمع بين by + since أقل شيوعًا.
- **§10** — «أمثلة مقارنة» وردت ثمانية أسطر متتالية بلا أعمدة؛ أُعيد بناؤها جدولًا من أربعة صفوف (for × since) بالنص نفسه. وجملة I will have been studying since 5:00. بلا نقطة مرجع مستقبلية صريحة، فأُضيفت ملاحظة منصة تؤهل المثال (المرجع يُفهم من السياق) دون تغيير النص.
- **§11** — الحسابات الثلاثة تحققت عدديًا (4 · 6 · 6) وهي متفقة مع جمل المصدر المعروضة؛ ملاحظة المصدر عن افتراض التاريخ نفسه من الشهرين محفوظة كما وردت.
- **§14** — قاعدة المصدر تخص الجملة الزمنية المستقبلية؛ أُضيفت ملاحظة صريحة بأنها لا تُطبَّق آليًا على كل استعمال لكلمات by the time (السرد الماضي يأخذ صيغًا ماضية).
- **§15** — تحليل الأدوار الثلاثة الرئيسية من نص المصدر؛ وتحليل بقية الأدوار إضافة منصة موسومة. جملة even if I haven't finished everything محكية طبيعيًا ويفهم منها by then ضمناً، فلم تُعدَّل.
- **§16** — جدول المقارنة الذهبية ورد أربعة أسطر بلا أعمدة؛ أُعيد بناؤه جدولًا (السؤال × الزمن الأنسب غالبًا) بالنص نفسه. كلمة «غالبًا» في عنوان العمود محفوظة لأنها تمنع التحويل الآلي للكلمات الدالة.
- **§19** — الجمل المثبتة المستخدمة كنقطة انطلاق في الباني مشتقة من أمثلة المصدر نفسها (حذف won't)، وموسومة بأنها تدريب من إعداد المنصة؛ أما الإجابات المتوقعة فهي أمثلة المصدر النافية حرفيًا.
- **§23** — ترتيب الفاعل والمساعد في أسئلة المصدر الثلاثة تحقّق حرفيًا: How long will you/she/they have been …؟ ولا يوجد تقديم للفاعل على will.
- **§25** — الجدول الذهبي ورد بلا أعمدة؛ أُعيد بناؤه بثلاثة أعمدة وثلاثة صفوف كما في المصدر بلا إضافة.
- **§26** — نص المصدر يوسم الصيغة المستمرة مع know/own بـ«❌ في الاستعمال المعتاد» لا بالخطأ المطلق؛ حُفظ هذا التأهيل حرفيًا لأنه دقيق لغويًا.
- **§28** — المصدر لم يقدّم ترجمة عربية لهذا الحوار؛ الترجمات المعروضة إضافة منصة موسومة (origin: platform) وليست نصًا مصدريًا. التحليل الرباعي من نص المصدر.
- **§29** — تكرار من المصدر نفسه: البندان ① و② من تدريب §29 يردان حرفيًا في المستوى الأول من اختبار §35 (البنود ① و②). حُفظ الموضعان كما وردا في المصدر دون حذف أو تعديل، وأُشير إلى التكرار داخل خطوة §29 حتى لا يظن الطالب أنه خطأ في المنصة. بقية بنود التدريب (③–⑥) مختلفة عن بنود الاختبار (③–⑤).
- **§32** — تصحيح المصدر للبند ⑥ يحذف will من الجملة الزمنية دون إضافة for/since، وتصحيح ⑦ يحوّل worked إلى working؛ كِلا التصحيحين مطابق لقواعد الدرس (§14 · §27).
- **§34** — الحسابات تحققت: 6:00 صباحًا → الظهر = 6 ساعات، و6:00 صباحًا → 6:00 مساءً = 12 ساعة، و11:00 تقع قبل الظهر فلا تعارض. ملاحظة فيدلية: مفتاح المصدر للسؤال ⑦ يذكر جملة واحدة (By noon, we will have been travelling for six hours.) بينما يتضمن النص جملتين بـ Future Perfect Continuous؛ أُضيفت ملاحظة توضح ذلك دون تعديل المفتاح.
- **§35** — المصدر يعرض الأسئلة دون مفتاح؛ لذلك لا يُعرض أي مفتاح داخل الاختبار. تحقّق آلي: أسطر §35 الثمانية والخمسون مرتبطة بواجهة الاختبار مرة واحدة لكل سطر وبترتيب المصدر (0…57) دون تكرار أو حذف. البندان Q1 وQ2 يكرران حرفيًا بندَي تدريب §29 ① و② — تكرار وارد في المصدر نفسه وموثّق في صف §29.
- **§39** — ربط كل صيغة بأداة التعبير المقابلة (الحدث المستقبلي · الخطة · القرار اللحظي · النشاط الجاري · الإنجاز المكتمل · المدة) قراءة منصة لترتيب المصدر المتوازي، وليست نصًا صريحًا فيه. الدرس 40 لم يُنفَّذ ولا رابط تنقّل إليه.

## Table reconstruction contracts

**§2 — timeline** (`TIMELINE_ROWS_39`, headers `["النقطة على الخط", "ما تمثّله"]`, inserted after source line 13)

| النقطة على الخط | ما تمثّله |
|---|---|
| NOW | لحظة الكلام — قبل نقطة المرجع |
| 4:00 | بداية الدراسة |
| 5:00 | استمرار الدراسة |
| 6:00 | استمرار الدراسة |
| 7:00 | استمرار الدراسة |
| 8:00 | نقطة المرجع المستقبلية |

**§5 — pronouns** (`PRONOUN_ROWS_39`, headers `["الفاعل", "Future Perfect Continuous"]`, appended at the end)

I / You / He / She / We / They → `will have been studying.` · It → `It will have been working.` (the source's own `It` row keeps `working`, not `studying`).

**§10 — FOR vs SINCE** (`FOR_SINCE_ROWS_39`, headers `["FOR — مدة", "SINCE — نقطة بداية"]`, after line 13): for five years / since 2021 · for two hours / since 6:00 · for three months / since January · for ten minutes / since 9:30.

**§16 — which tense fits the question** (`GOLDEN_COMPARE_ROWS_39`, headers `["السؤال", "الزمن الأنسب غالبًا"]`, after line 17): كم مقالًا ستكون قد كتبت؟ → Future Perfect · كم ساعة ستكون قد أمضيت في الكتابة؟ → Future Perfect Continuous · هل سيكون المشروع قد اكتمل؟ → Future Perfect · منذ متى ستكون تعمل على المشروع؟ → Future Perfect Continuous. The header keeps the source's qualifier **غالبًا** ("usually"), so the table stays a tendency, not a mechanical rule.

**§25 — the three perfect continuous tenses** (`PERFECT_CONTINUOUS_ROWS_39`, headers `["الزمن", "الصيغة", "النقطة المرجعية"]`, after line 14): Present Perfect Continuous / `have/has been + V-ing` / الحاضر · Past Perfect Continuous / `had been + V-ing` / نقطة ماضية · Future Perfect Continuous / `will have been + V-ing` / نقطة مستقبلية.

## Test and answer provenance contract

- Source Master Test (§35) = **25** questions in five groups of five: ①–⑤ multiple choice, ⑥–⑩ completion, ⑪–⑮ error correction, ⑯–⑳ conceptual meaning, ㉑–㉕ Final IQ200 Boss passage.
- `testData39.ts` consumes every source line of §35 **once**: `TEST_SOURCE_UNIT_TOTAL_39 = 58` and `TEST_SOURCE_UNIT_INDEXES_39` covers indexes 0–57 with no gaps and no repeats.
- Level 4 contains four explain-type items plus **Q18**, an open-model item (`judgment: "open-model"`); the model answer is teacher-facing only.
- Boss answers (Level 5): **21** `will have been working` · **22** `will have completed` · **23** `will be presenting` · **24** `will have been preparing` · **25** `How long will you have been developing these projects by next month?` — subject/auxiliary order verified (`will you have been developing`, not `you will have been …`).
- The Test Area shows no correctness mark, score, or explanation before submission, and never imports `solutionsData39`. Answers are locked until the student submits or a teacher unlocks them.
- All 25 solutions are platform-authored teacher additions (the source gives no key). Each carries `data-source-status="platform-authored-teacher-addition"`; 16–20 explain tense logic, 21–25 explain passage fit.
- Solution tabs are grouped in five levels under `nav[aria-label="مستويات حلول اختبار الدرس 39"]`, with per-card `solution-39-details-N` / `aria-controls` wiring.
- Student practice (§29–§34, §37) is separate from the Master Test: the practice steps keep their own reveal keys and are not recycled into the 25 test items (except the two documented §29/§35 source overlaps).
- Source-supplied keys kept verbatim: §29 (6), §30 (6), §31 (8), §32 (10), §34 (7). §36 is a stub.

## Exercise inventory — 62 numbered items

| Source | Items | Type |
|---|---|---|
| §29 | 6 | multiple choice (choose the correct form) |
| §30 | 6 | completion with Future Perfect Continuous |
| §31 | 8 | tense choice: Future Perfect or FPC |
| §32 | 10 | Grammar Detective (find and correct the error) |
| §34 | 7 | reading comprehension (The Long Journey) |
| §35 | 25 | Master Test (five levels of five) |
| **Total** | **62** | |

§37 (Writing Mission) adds 8 requirements plus a guidance model; it is a production task, not a numbered item.

## الاتجاه والتباين

English examples, formulas, and tables go through `Rich` / `LatinRuns`, through the shared `EnAr` pair wrapper (English label + Arabic gloss as one LTR unit), or through `dir="ltr"` + `font-en`. No Unicode bidi control characters, no blanket `direction: rtl !important`. Contrast is computed on rendered markup inside `scripts/audit-lesson39.mjs` (the same oracle used for Lesson 38): 7019 rendered text elements, 0 below 4.5:1 across default/hover/focus/selected/disabled/correct/incorrect/locked/revealed states. The rendered markup also passes the shared BIDI oracle with zero violations (`ONLY=39 node scripts/audit-bidi-mixed.mjs` reports `{"L39":0}` for the pair oracle and `{"alts":{"L39":0}}` for the alternatives oracle), so no "English = عربي" pair can render reversed.

## File list

| Path | Role |
|---|---|
| `src/lessons/lesson39/ledger39.ts` | Verbatim source ledger (cover + §1–§39, 688 lines) + rebuilt tables |
| `src/lessons/lesson39/data.ts` | Titles, 13 chapters, 40 native steps |
| `src/lessons/lesson39/coverage39.ts` | In-app coverage ledger + accuracy notes |
| `src/lessons/lesson39/practiceData39.ts` | Interactive lab items, source keys, dialogues, writing mission |
| `src/lessons/lesson39/kit39.tsx` | Duration Lab chrome, SourceCard, tables, action buttons, focus ring |
| `src/lessons/lesson39/labs39.tsx` | Student-area labs (timeline, formula, duration, sort, builder, dialogue, stative, reading, writing, curriculum) |
| `src/lessons/lesson39/Steps39.tsx` | Native step renderer (cover + s01–s39) |
| `src/lessons/lesson39/Lesson39.tsx` | Four-area shell, prev/next nav, progress, keyboard support |
| `src/lessons/lesson39/testData39.ts` | 25-question Master Test (source §35) |
| `src/lessons/lesson39/TestArea39.tsx` | Formal test; no key before or after submit |
| `src/lessons/lesson39/solutionsData39.ts` | 25 platform-authored solutions (lazy chunk) |
| `src/lessons/lesson39/SolutionsArea39.tsx` | Gated solutions (lazy chunk) |
| `src/lessons/lesson39/TeacherArea39.tsx` | Existing teacher mechanism (password `somer173`, no new secret) |
| `src/lessons/lesson39/TeacherGuide39.tsx` | Coverage / objectives / practice keys / 25 solutions / misconceptions / provenance / writing-mission grading (lazy chunk) |
| `docs/lesson39-source-audit.md` | Pre-implementation source audit |
| `docs/lesson39-coverage.md` | This ledger |
| `scripts/audit-lesson39.mjs` | Lesson 39 audit (`npm run audit:lesson39`) |

## Validation (jsdom / Node — not a visual browser)

- `npm run audit:lesson39` — 353 assertions: source coverage, 25×5 test, 25 solutions, labs, BIDI, contrast, CSS utilities, registration, and a clean console (no React/jsdom warnings while every area is rendered and driven).
- `npm run build` — production Vite build (lazy chunks `solutionsData39`, `TeacherGuide39`).
- `node scripts/check-english-direction.mjs` — 39 lessons.
- `node scripts/audit-render-direction.mjs` — 39 lesson folders.
- `node scripts/audit-lesson-navigation.mjs` — hub window 30–39, Lesson 39 route.
- `node scripts/audit-final-test.mjs` — dedicated Lesson 39 Master Test.
- `ONLY=39 node scripts/audit-bidi-mixed.mjs` — 0 violations.
- `npm run audit:english-direction` — full chain including `audit-lesson39.mjs`.

No real-browser visual review was performed in this environment: build success, HTTP 200, and jsdom rendering are **not** visual verification, and no screenshots were produced.
