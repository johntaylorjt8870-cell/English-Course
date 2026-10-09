# الدرس 32 — تغطية المصدر والتحقق (Lesson 32 Coverage)

> وثيقة مولّدة جزئيًا من بيانات الدرس (`data.ts`، `testData.ts`، `ledger32.ts`، `teacherData.ts`). الجداول تعكس الملفات الحالية.

## 1. البنية (Architecture)

Native multi-step، على نمط الدروس 27–31، لا سجل مصدر خام:

- **الدرس (Student Lesson):** 40 خطوة، كل خطوة = تفاعل → اكتشاف → شرح (Platform Explanation عند الحاجة) → تدريب → إتقان، وتُختَم بشارة إتمام التفاعل (`data-gate-done`). واجهة الطالب لا تكشف النص الحرفي للمصدر ولا يوجد فيها أي عنصر «اضغط للعرض»: مكان المصدر يُتتبَّع بشارة القسم المصدري (`data-source-section` في الإطار)، ويبقى النص الحرفي في سجل المصدر (`ledger32.ts`) وفهرس المعلم.
- **منطقة الاختبار (Test Area):** 20 سؤالًا جديدًا (لا نسخ ولا إعادة صياغة)، محايدة قبل الإرسال، درجة بعد الإرسال، إعادة كاملة.
- **الاختبار النهائي (Final Test):** 15 سؤالًا من تأليف المنصة (`finalTestBank.ts` → `LESSON_32`) في آخر خطوة من الدرس، بكل الأنواع السبعة. محايد تمامًا أثناء الإجابة — بلا صح/خطأ ولا درجة ولا شرح ولا تلميح — حتى إجراء «تصحيح الاختبار» الواحد، وبعده تظهر الدرجة والتصحيح والإجابات الصحيحة والشرح مع إعادة تعيين كاملة. طبقة نهاية الدرس، لا منطقة اختبار علوية، ولا تحلّ محل منطقة الاختبار (20 سؤالًا).
- **حلول الاختبار (Test Solutions):** 20 حلًا مجمّعة كل 5، مقفلة قبل الإرسال.
- **منطقة المعلم (Teacher Area):** كلمة مرور `somer173` (لا تُغيَّر)، ودعم تدريسي حقيقي: نظرة عامة، توزيع الحصة، ملاحظات، حلول تمارين المصدر، rubrics، الأخطاء الشائعة، الأخطاء المتعمدة (12)، دليل الاختبار، خطة المعالجة، فهرس المصدر الحرفي، ومفتاح الاختبار النهائي (15 إجابة بصيغة تدريسية: الإجابة · السبب · المفهوم · الفخ الشائع).

الهوية البصرية: زمرّدي/كهرماني (شريط النشاط)، مختلفة عن أزرق/تركوازي الدرس 31.

## 2. التمثيل بالمصدر (Source coverage — exact once)

- الوحدات الحرفية في السجل: **40** = الغلاف (1) + الأهداف (1) + الأقسام المرقّمة ①–㊱ (**36**) + الملخص (1) + الخاتمة (1).
- الخطوات: **40**، كل وحدة مصدرية تُغطّى بخطوة واحدة بالضبط (تحقّقه السكربت `audit-lesson32.mjs`).
- الاستثناء الوحيد: علم المملكة المتحدة الديكوري في عنوان الغلاف أُزيل وفق قاعدة المستودع (لا رموز علم GB). النص مكتوب حرفيًا.
- ملف المصدر الكامل: `docs/lesson32-source.md` (مولَّد من السجل).
- الأخطاء المتعمدة في المصدر (E1–E12) محفوظة كما وردت، وتُدرَّس كتصحيح في الخطوات ⑪ و㉗ و㉛ وفي منطقة المعلم.

### 2.1 جدول الخطوات

| # | Ledger id | Step (section) | Verbatim source unit | Interaction / native mechanic |
|---|---|---|---|---|
| 1 | `cover` | الغلاف تتبّع الأثر المستمر _(🌿 البداية)_ | الدرس 32: Present Perfect Continuous — المضارع التام المستمر | Animated activity ribbon + key-word chips (static) |
| 2 | `objectives` | الأهداف أهداف الدرس _(🌿 البداية)_ | 🎯 أهداف الدرس | Objectives checklist (9 items, toggles) |
| 3 | `s1` | ① التعريف ما هو Present Perfect Continuous؟ _(🧱 الصيغة والأساس)_ | 🧠 1. ما هو Present Perfect Continuous؟ | Block builder: tap tokens in order (have/has · been · V-ing) |
| 4 | `s2` | ② الأجزاء لماذا have + been + ing؟ _(🧱 الصيغة والأساس)_ | 🔥 2. لماذا لدينا have + been + ing؟ | Flip cards: reveal each part's role |
| 5 | `s3` | ③ الفاعل have أم has؟ _(🧱 الصيغة والأساس)_ | ⭐ 3. have أم has؟ | Sort: subject → have / has |
| 6 | `s4` | ④ الاستخدام الأول متى نستخدمه؟ — شريط النشاط _(🧱 الصيغة والأساس)_ | 🧠 4. متى نستخدم Present Perfect Continuous؟ | Activity ribbon maker: duration slider, activity radios, still-running toggle |
| 7 | `s5` | ⑤ for for مع المدة _(⏳ for · since · How long)_ | ⭐ 5. for مع Present Perfect Continuous | Slot pick (ruler): for + duration (3 rounds) |
| 8 | `s6` | ⑥ since since مع نقطة البداية _(⏳ for · since · How long)_ | ⭐ 6. since مع Present Perfect Continuous | Slot pick (flag): since + start point (3 rounds) |
| 9 | `s7` | ⑦ القرار for أم since؟ _(⏳ for · since · How long)_ | 🧠 7. for أم since؟ | Sort: for vs since (8 phrases) |
| 10 | `s8` | ⑧ How long السؤال الأقوى: How long؟ _(⏳ for · since · How long)_ | 🔥 8. السؤال الأقوى: How long? | How-long builder + 2 answer rows (for / since) |
| 11 | `s9` | ⑨ النفي النفي _(❓ النفي والسؤال)_ | ⭐ 9. النفي | Block builder: negative sentence |
| 12 | `s10` | ⑩ الأسئلة الأسئلة _(❓ النفي والسؤال)_ | ⭐ 10. الأسئلة | Block builder: questions (2 rounds) |
| 13 | `s11` | ⑪ الجواب الإجابات القصيرة _(❓ النفي والسؤال)_ | ⭐ 11. الإجابات القصيرة | Rows: short answers with the source trap |
| 14 | `s12` | ⑫ أسئلة بأداة Wh Questions _(❓ النفي والسؤال)_ | 🧩 12. Wh Questions | Rows: Wh-word matching (5 items) |
| 15 | `s13` | ⑬ الأثر نشاط انتهى للتو… والأثر باقٍ _(🔍 الأثر والنتيجة)_ | 🔥 13. الاستخدام الثاني: نشاط انتهى للتو وآثاره واضحة الآن | Evidence scenes: collect clues → explain (3 scenes) |
| 16 | `s14` | ⑭ المقارنة الكبرى Present Perfect أم PPC؟ — النتيجة والنشاط _(🔍 الأثر والنتيجة)_ | 🧠 14. Present Perfect vs Present Perfect Continuous | Canvas lenses (result / activity) + 2 rows |
| 17 | `s15` | ⑮ القرار النتيجة أم النشاط؟ _(🔍 الأثر والنتيجة)_ | 🎯 15. النتيجة أم النشاط؟ | Two doors sort: result (PP) / activity (PPC) |
| 18 | `s16` | ⑯ زاويتان مثال IQ200 — شخصان _(🔍 الأثر والنتيجة)_ | 🔥 16. مثال IQ200 | Speaker rows (A/B) |
| 19 | `s17` | ⑰ العدد أم المدة مثال آخر — لوحات وبعد الظهر _(🔍 الأثر والنتيجة)_ | ⭐ 17. مثال آخر | Two-row comparison |
| 20 | `s18` | ⑱ الدقة هل يعني دائمًا أنه ما زال مستمرًا؟ _(🔍 الأثر والنتيجة)_ | 🧠 18. هل Present Perfect Continuous يعني دائمًا أن الفعل ما زال مستمرًا؟ | Still-running toggle (same sentence, two realities) |
| 21 | `s19` | ⑲ الكلمات كلمات شائعة مع PPC _(🔑 الكلمات والأفعال)_ | ⭐ 19. كلمات شائعة مع Present Perfect Continuous | Keyword cards (reveal examples; platform examples labelled) |
| 22 | `s20` | ⑳ الكلمة والسياق لا تعتمد على كلمة واحدة _(🔑 الكلمات والأفعال)_ | ⚠️ 20. لا تعتمد على كلمة واحدة | Cue-word rows (today / all morning / recently) |
| 23 | `s21` | ㉑ الأزواج PP أم PPC؟ — ثلاثة أزواج _(🔑 الكلمات والأفعال)_ | 🔥 21. Present Perfect أم Present Perfect Continuous؟ | Pair rows (focus → sentence) |
| 24 | `s22` | ㉒ العدد هل نستخدم PPC مع عدد؟ _(🔑 الكلمات والأفعال)_ | 🧠 22. هل يمكن استخدام Present Perfect Continuous مع عدد؟ | Rows: complete count vs activity |
| 25 | `s23` | ㉓ البوابة أفعال لا نستخدمها عادةً في Continuous _(🔑 الكلمات والأفعال)_ | ⭐ 23. بعض الأفعال لا نستخدمها عادةً في Continuous | Stative gate (9 verbs: blocked vs passes) |
| 26 | `s24` | ㉔ نقطة المرجع مقارنة مع Past Continuous _(🧭 نقطة المرجع)_ | 🔥 24. مقارنة مع Past Continuous | Reference-point rail (Past Continuous) |
| 27 | `s25` | ㉕ نقطة المرجع مقارنة مع Past Perfect Continuous _(🧭 نقطة المرجع)_ | 🔥 25. مقارنة مع Past Perfect Continuous | Reference-point rail (Past Perfect Continuous) |
| 28 | `s26` | ㉖ الخريطة الخريطة الزمنية الكبرى _(🧭 نقطة المرجع)_ | 🧠 26. الخريطة الزمنية الكبرى | Big timeline rail (3 snaps, keyboard + drag) |
| 29 | `s27` | ㉗ المحقق Grammar Detective _(🕵️ صيد الأخطاء)_ | 🕵️ 27. Grammar Detective | Grammar Detective: tap wrong segment → choose fix (8 sentences) |
| 30 | `s28` | ㉘ الاختيار تحدي الاختيار _(🕵️ صيد الأخطاء)_ | 🚀 28. تحدي الاختيار | Typed choice challenge (6 typed answers) |
| 31 | `s29` | ㉙ IQ200 IQ200 — نفس الفعل، معنى مختلف _(🕵️ صيد الأخطاء)_ | 🔥 29. IQ200 — نفس الفعل، زمن مختلف، معنى مختلف | IQ200 rows: finished or not? |
| 32 | `s30` | ㉚ المشهد تحدي المعنى _(🕵️ صيد الأخطاء)_ | 🧠 30. تحدي المعنى | Meaning scenes (2 scenes) |
| 33 | `s31` | ㉛ مستوى أعلى since و for — مستوى أعلى _(🕵️ صيد الأخطاء)_ | ⭐ 31. since و for — مستوى أعلى | Fix-it (tap-fix) + for/since rows |
| 34 | `s32` | ㉜ الزعيم Boss Challenge — اختر الزمن الصحيح _(🏆 التحديات النهائية)_ | 🏆 32. Boss Challenge — اختر الزمن الصحيح | Boss challenge: HP bar, 8 strikes, 4 tense gears |
| 35 | `s33` | ㉝ تحليل الفقرة Final IQ200 Challenge _(🏆 التحديات النهائية)_ | 🔥 33. Final IQ200 Challenge | Adam text: tap each verb phrase and tag its tense |
| 36 | `s34` | ㉞ النهائي Final Boss — قصة Maya _(🏆 التحديات النهائية)_ | 🏆 34. Final Boss | Final boss (Maya): typed fill (5 items) |
| 37 | `s35` | ㉟ القاعدة قاعدة الذهب _(🏁 الخاتمة)_ | 🧠 35. قاعدة الذهب | Golden rule sort (6 sentences) |
| 38 | `s36` | ㊱ الخريطة الخريطة التي أصبحت عندك _(🏁 الخاتمة)_ | 🗺️ 36. الخريطة التي أصبحت عندك الآن | Gear map: 4 present-tense gears (all must be opened) |
| 39 | `summary` | الملخص ملخص الدرس 32 _(🏁 الخاتمة)_ | ⭐ ملخص الدرس 32 | Platform recap (labelled) + source open |
| 40 | `closing` | الخاتمة الخطوة التالية _(🏁 الخاتمة)_ | الخاتمة — الخطوة التالية | Next-step button to Test Area |


## 3. جرد التفاعلات (Interaction inventory)

- **17 مكوّنًا تفاعليًا قابلًا لإعادة الاستخدام** في `kit32.tsx`: BlockBuilder32، FlipParts32، SortBuckets32، SlotPick32، PerRow32، TapFix32، TypedFill32، EvidenceCases32، RibbonMaker32، ExploreGrid32، StativeGate32، ReferenceRail32، StillRunning32، Boss32، VerbTap32، GearMap32، ObjectivesChecklist32. ويُضاف إليها عناصر العرض: Lab32، Frame، Verdict32، Platform32، Progress32. (مكوّن `SourceReveal32` حُذف: لا كشف لنص المصدر في واجهة الطالب.)
- **إشارتان مميّزتان (signature mechanics):**
  1. **شريط النشاط (Activity Ribbon)**: طول الشريط = المدة، ومؤشر NOW، وزر «ما زال مستمرًا؟» يبيّن أن الجملة نفسها تبقى مع اختلاف الواقع (الخطوات ④ و⑱).
  2. **مؤشر نقطة المرجع (Reference Point Rail)**: مؤشر قابل للسحب والنقر ولوحة المفاتيح (←/→) يُظهر كيف تتغيّر الصيغة مع نقطة المرجع (الخطوات ㉔–㉖).
  3. **معركة الزعيم (Boss HP)**: شريط صحة يقل مع كل ضربة صحيحة، وكل ضربة خاطئة تُفسَّر (الخطوة ㉜).
- **الإتمام والكشف:** كل خطوة تفاعلية تُخفي نص المصدر حتى تُتمّ التفاعل. الخطوات الشارحة (الغلاف، الأهداف، الملخص، الخاتمة) تعرض المصدر فورًا.

## 4. الاختبار (Test Area — 20 original questions)

- التوزيع: **6 Basic · 7 Medium · 4 Advanced · 3 Thinking** (`TEST_32_LEVEL_COUNTS`).
- الأنواع: اختيار واحد · صح/خطأ · متعدد · ترتيب · مطابقة · حدّد الخطأ · كتابة (7 أنواع).
- محايدة قبل الإرسال: لا ✓/✕ ولا درجة ولا حلول. بعد الإرسال: الدرجة وتوزيعها حسب المستوى وحالة كل سؤال، ثم فتح الحلول. «إعادة الاختبار كاملًا» تمسح الإجابات والدرجة وتقفل الحلول.
- الأسئلة الجديدة (لا نسخ حرفية ولا إعادة صياغة خفيفة لأسئلة المصدر — يتحقق منه السكربت):

| # | المستوى | النوع | نص السؤال |
|---|---|---|---|
| 1 | Basic | single | She ______ in the library since 8:00. — أكمل الجملة: «هي تدرس في المكتبة منذ الثامنة». |
| 2 | Basic | tf | في الجملة «They have been waiting for an hour»: been هي V3 من be، وwaiting تعطي معنى الاستمرار. |
| 3 | Basic | single | أي جملة صحيحة نحويًا؟ |
| 4 | Basic | tf | الجملة «It has been raining since morning» يمكن أن تصف مطرًا توقف الآن، وبقيت الأرض مبللة. |
| 5 | Basic | single | She ______ well lately. — أكمل النفي: «هي لم تنم جيدًا مؤخرًا». |
| 6 | Basic | typed | أجب بالجواب القصير: «Have you been studying?» — «Yes, I ______.» (اكتب الكلمة الناقصة) |
| 7 | Medium | multi | اختر كل الجمل الصحيحة التي تُستعمل فيها الصيغة لوصف مدة أو نشاط ممتد: |
| 8 | Medium | order | رتّب القطع لتكوين الجملة: «هي تنتظر منذ يوم الاثنين». |
| 9 | Medium | match | طابق كل عبارة زمنية مع دورها في الجملة. |
| 10 | Medium | single | أي جواب مناسب لـ «How long has he been waiting?» |
| 11 | Medium | spot | اضغط الجزء الخطأ في الجملة. |
| 12 | Medium | tf | «Yes, I have been.» جواب قصير صحيح عن السؤال «Have you been studying?» |
| 13 | Medium | single | الجدار أصبح مطليًا والطلاء جفّ. أي جملة تركّز على النتيجة؟ |
| 14 | Advanced | spot | اضغط الخطأ الوحيد في الجملة. |
| 15 | Advanced | single | طالبان: A: «I have written five pages.» — B: «I have been writing for three hours.» أي عبارة صحيحة؟ |
| 16 | Advanced | match | طابق كل جملة بزمنها الصحيح. |
| 17 | Advanced | typed | صحّح الجملة كتابةً: «I have been knowing him for ten years.» |
| 18 | Thinking | single | أي جملة تُظهر أن النشاط ربما توقف، لكن أثره واضح الآن؟ |
| 19 | Thinking | multi | اختر كل الجمل التي تكون فيها Present Perfect أفضل من Continuous لأن التركيز على عدد مكتمل أو نتيجة: |
| 20 | Thinking | order | رتّب ردًّا يفسّر تعبك: «أنا متعب لأنني أعمل طوال اليوم». |


## 5. حلول الاختبار (Test Solutions)

- 20 حلًا مجمّعة في أربع مجموعات: 1–5، 6–10، 11–15، 16–20.
- كل حل: الإجابة + سبب (Platform Explanation) + فخّ محتمل عند وجوده.
- مقفلة قبل الإرسال؛ تُفتح بعد الإرسال أو بعد دخول منطقة المعلم.

## 6. منطقة المعلم (Teacher coverage)

| القسم | المحتوى |
|---|---|
| نظرة عامة | أهداف الدرس (9)، المتطلبات السابقة، المحاور الثلاثة الأساسية |
| توزيع الحصة | 9 مراحل مع توقيتات تقريبية وأسئلة حوار |
| ملاحظات التدريس | 10 ملاحظات (الفكرة الأم، المدة/النقطة، نقطة المرجع، الأفعال الحالية، تصنيف مُتنازَع فيه، …) |
| حلول تمارين المصدر | 11 مجموعة مرجعية من حلول تمارين المصدر (§11–§34) |
| rubrics | rubric إنتاج الجملة، rubric تفسير الزاوية (النتيجة مقابل النشاط) |
| الأخطاء الشائعة | 10 أخطاء مع علاج كل منها |
| الأخطاء المتعمدة في المصدر | جدول E1–E12 (الخطأ · التصحيح · الموضع) |
| دليل الاختبار | قبل/بعد الاختبار، سؤال الإعادة |
| خطة المعالجة | 3 حالات علاجية |
| فهرس المصدر | السجل الحرفي كاملًا (40 وحدة)، قابل للطي |

### 6.1 الأخطاء المتعمدة في المصدر (E1–E12)

| الرقم | الموضع | الخطأ كما ورد | التصحيح | ملاحظة |
|---|---|---|---|---|
| E1 | §11 | `Yes, I have been. ❌` | `Yes, I have. ✅` | جواب قصير بـ been |
| E2 | §23 | `I have been knowing him for ten years. ❌` | `I have known him for ten years. ✅` | فعل حالة |
| E3 | §23 | `She has been understanding the problem. ❌` | `She has understood the problem. ✅` | فعل حالة (المصدر: عادةً) |
| E4 | §27 ① | `She has been study for two hours.` | `She has been studying for two hours.` | verb-ing بعد been |
| E5 | §27 ② | `I have been working since three hours.` | `I have been working for three hours.` | مدة مع since |
| E6 | §27 ③ | `He has been knowing her for years.` | `He has known her for years.` | فعل حالة |
| E7 | §27 ④ | `Have you been wait long?` | `Have you been waiting long?` | verb-ing بعد been |
| E8 | §27 ⑤ | `They has been playing all afternoon.` | `They have been playing all afternoon.` | they ← have |
| E9 | §27 ⑥ | `She hasn't been sleep well.` | `She hasn't been sleeping well.` | verb-ing بعد been |
| E10 | §27 ⑦ | `How long has he been work here?` | `How long has he been working here?` | verb-ing بعد been |
| E11 | §27 ⑧ | `I have been written five emails.` | `I have written five emails.` | عدد مكتمل ← PP |
| E12 | §31 | `I have been studying since three hours. ❌` | `I have been studying for three hours. ✅` | مدة مع since |

- ملاحظة التصنيف المتنازع فيه (`has studied for three years`، §33): الإجابة المعتمدة هي إجابة المصدر (Present Perfect)، مع نقاش موسوم للمعلم، ولم يُغيَّر النص.

## 7. التحقق (Validation)

| الأمر | النتيجة |
|---|---|
| `npm run build` | ✅ ينجح (يظهر تحذير حجم الحزمة المعتاد > 500 kB) |
| `npx tsc --noEmit` (على وحدات lesson32 بصرامة) | ✅ بلا أخطاء |
| `npm run check:english-direction` | ✅ (43/43 BIDI rendering assertions) |
| `npm run audit:english-direction` | ✅ (يشمل audit-lesson32، audit-lesson31، 24/26–30، render، bidi) |
| `node scripts/audit-lesson32.mjs` | ✅ 305/305 |
| `node scripts/audit-bidi-mixed.mjs` | ✅ (الدرس 32: 0 مخالفات، ضمن الدروس الصارمة) |
| `node scripts/interaction-test.mjs` | ✅ 558/558 |
| `npm run audit:lesson-navigation` | ✅ 90/90 (حُدّثت توقعات النافذة الأخيرة إلى 23–32) |

### 7.1 ما يغطيه `audit-lesson32.mjs`

1. الجرد الحرفي: 40 وحدة، 36 عنوانًا مرقّمًا، معرّفات فريدة.
2. السجل: 40 خطوة، كل وحدة مرة واحدة، والترتيب يطابق ترتيب المصدر.
3. عرض حقيقي (SSR) لكل الخطوات الـ40: بلا أخطاء، بشارة قسم المصدر، ولا تسرّب إجابة قبل المحاولة.
4. بوابة الكشف: المصدر مخفي قبل التفاعل ومعروض بعد إتمامه (36 خطوة تفاعلية + 4 شارحة).
5. اختبار الاختبار: 20 سؤالًا، 6/7/4/3، 7 أنواع، لا نسخ، الدرجات (صحيح/خطأ)، محايدة قبل الإرسال، إعادة كاملة.
6. الحلول: مقفلة قبل الإرسال، 4 مجموعات، لا تسرّب.
7. المعلم: كلمة المرور الصحيحة، رفض الخطأ، كل الأقسام.
8. المصدر: الأخطاء المتعمدة E1–E12 موجودة حرفيًا في السجل.
9. الصحة الثنائية (bidi): لا أحرف تحكم Unicode، LatinRuns/En/Rich، لا per-token splitting.
10. الإمكانية (a11y): لا tooltips بـ `title=`، لا hover-only، أزرار بـ `type`، تركيز مرئي (FOCUS32).
11. الهيكل الرئيسي بأربع مناطق، والتوجيه في `App.tsx`، وبطاقة الفهرس، وعدم إضافة تبعيات تشغيل جديدة.

## 8. BIDI و LTR

- كل نص إنجليزي يمر عبر `En` أو `Rich`/`LatinRuns` أو `EnAr`، وما تبقّى عربي.
- لا أحرف تحكم bidi خام في أي ملف من `src/lessons/lesson32/` (يتحقق منه السكربت).
- الفهرس الجانبي يعرض الجزء قبل « — » من عنوان الخطوة (للاختصار فقط)، والعنوان الكامل في إطار الخطوة.

## 9. قيود معروفة (Limitations)

- لا يوجد متصفح بدون واجهة في البيئة، لذلك لم تُجرَ مراجعة بصرية في متصفح حقيقي؛ التحقق بالعرض الخادمي وJSDOM والبناء.
- الأمثلة المولّدة للمنصة (غير المصدر) موسومة في الواجهة («مثال تدريبي للمنصة — ليس من المصدر») ومُعلَّمة في البيانات `src:false`.
- التصنيف المتنازع فيه في المصدر (§33) يُعرض كما هو مع ملاحظة للمعلم.
