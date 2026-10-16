# Lesson 43 — source-to-implementation coverage

Source: complete lesson supplied in the conversation. `source43.ts` preserves the text with the normalization documented below. No external missing source was reconstructed as a quotation.

## Mapping rules

- Opening plus §§1–37 are 38 native steps in source order; §33 routes to the independent test, §34 to protected teacher access.
- Each unit below is one normalized source line, not merely a section heading. Ordinary lines render through Steps43/Lines43. Tables combine contiguous pipe-separated lines into rows with headers.
- Numbered practice prompts and options map to the attempt-gated practice engines; source keys appear only after the student writes an attempt. §27 accepts MAY or MIGHT wherever the source allows both. TeacherGuide43 includes every prompt, key and platform-authored explanation.
- §26 dialogue renders turn-by-turn and its eight analyzed uses drive the Context Detective. §32 passage is rendered in full before its ten question cards. §35 criteria are checkbox labels; the model paragraph is a separately labelled platform reference.
- §33 options and question subparts are independently represented in testData43; the test module imports no solution, source-ledger or teacher data.
- §34 is the full 25-key correction list. It is never rendered inside a student step: it lives behind the existing teacher gate and in the post-submission solutions area.
- Eleven learning-station markers are attached to the first step of their station, rather than as separate decorative separators.
- Decorative separator bars and heading emoji/GB flags were removed. Blank lines collapsed; table cells joined with ` | `. No instructional example, dialogue turn or numbered item was removed.
- Source spelling and variety notes are retained, including the §31 ⑧ answer that keeps both the grammatical form and the daily-default rewrite.

## Source inventory

- 38 sections (opening + 37 numbered), 827 normalized units.
- 43 attempt-bound practice items (§§27–32), 25 final-test questions in five levels, 25 detailed keys.
- 11 stations: الانطلاق ORIENTATION (0–4) · قناة MAY MAY CHANNEL (5–7) · قناة MIGHT MIGHT CHANNEL (8–11) · النفي NEGATION (12–14) · الاستئذان PERMISSION (15–17) · مختبر MAYBE MAYBE LAB (18–19) · احتمال الماضي PAST POSSIBILITY (20–23) · الأفعال الأربعة THE FOUR MODALS (24–25) · الحوار والتطبيق DIALOGUE & PRACTICE (26–31) · القراءة والتقييم READING & ASSESSMENT (32–34) · الكتابة والخريطة WRITING & ROADMAP (35–37).
- Frozen inventory: `docs/lesson43-source-manifest.json` (per-section unit counts and SHA-256 of the normalized lines).

## Item and subpart coverage

| Source | Items | Implementation | Subparts / solutions |
|---|---:|---|---|
| §27 | 6 | الخطوة 27 — PracticeSet43(27) | p27-1 [choice, خيارات: 2, مفتاح: MAY أو MIGHT — كلتاهما صحيحة بحسب درجة التحفظ والسياق.]; p27-2 [choice, خيارات: 2, مفتاح: MAY أو MIGHT — كلتاهما صحيحة بحسب درجة التحفظ والسياق.]; p27-3 [choice, خيارات: 2, مفتاح: MAY أو MIGHT — كلتاهما صحيحة بحسب درجة التحفظ والسياق.]; p27-4 [choice, خيارات: 2, مفتاح: MAY أو MIGHT — كلتاهما صحيحة بحسب درجة التحفظ والسياق.]; p27-5 [choice, خيارات: 2, مفتاح: MAY أو MIGHT — كلتاهما صحيحة بحسب درجة التحفظ والسياق.]; p27-6 [choice, خيارات: 2, مفتاح: MAY أو MIGHT — كلتاهما صحيحة بحسب درجة التحفظ والسياق.] → مفتاح §27 بعد المحاولة — MAY أو MIGHT كلاهما مقبول |
| §28 | 6 | الخطوة 28 — PracticeSet43(28) | p28-1 [choice, خيارات: 3, مفتاح: A — may.]; p28-2 [choice, خيارات: 3, مفتاح: B — arrive.]; p28-3 [choice, خيارات: 3, مفتاح: A — May.]; p28-4 [choice, خيارات: 3, مفتاح: C — come.]; p28-5 [choice, خيارات: 3, مفتاح: B — missed.]; p28-6 [choice, خيارات: 3, مفتاح: A — lost.] → مفتاح §28 بعد المحاولة |
| §29 | 6 | الخطوة 29 — PracticeSet43(29) + MaybeLab43 | p29-1 [choice, خيارات: 2, مفتاح: Maybe.]; p29-2 [choice, خيارات: 2, مفتاح: may be.]; p29-3 [choice, خيارات: 2, مفتاح: Maybe.]; p29-4 [choice, خيارات: 2, مفتاح: may be.]; p29-5 [choice, خيارات: 2, مفتاح: Maybe.]; p29-6 [choice, خيارات: 2, مفتاح: may be.] → مفتاح §29 بعد المحاولة |
| §30 | 5 | الخطوة 30 — PracticeSet43(30) | p30-1 [response, كتابة حرة, مفتاح: He may have lost his phone.]; p30-2 [response, كتابة حرة, مفتاح: They might have missed the train.]; p30-3 [response, كتابة حرة, مفتاح: Maya may have misunderstood the instructions.]; p30-4 [response, كتابة حرة, مفتاح: We might have made a mistake.]; p30-5 [response, كتابة حرة, مفتاح: The teacher may have changed the timetable.] → مفتاح §30 بعد المحاولة — MAY وMIGHT قابلان للتبديل |
| §31 | 10 | الخطوة 31 — ErrorRepair43 (تدريب §31 كاملًا) | p31-1 [response, كتابة حرة, مفتاح: She may come tomorrow.]; p31-2 [response, كتابة حرة, مفتاح: He might come late.]; p31-3 [response, كتابة حرة, مفتاح: They may visit us.]; p31-4 [response, كتابة حرة, مفتاح: She may be tired.]; p31-5 [response, كتابة حرة, مفتاح: Maybe she is tired.]; p31-6 [response, كتابة حرة, مفتاح: He may have gone home.]; p31-7 [response, كتابة حرة, مفتاح: They might have forgotten the meeting.]; p31-8 [response, كتابة حرة, مفتاح: May she come? — صياغة ممكنة نحويًا في سياقات معينة، لكن في الاستعمال اليومي يُفضَّل غالبًا إعادة صياغة السؤال بحسب المعنى، مثل: Is she likely to come?]; p31-9 [response, كتابة حرة, مفتاح: She might not come.]; p31-10 [response, كتابة حرة, مفتاح: I may travel tomorrow.] → مفتاح §31 بعد المحاولة |
| §32 | 10 | الخطوة 32 — ReadingChallenge43 (تدريب §32 كاملًا) | p32-1 [answer, كتابة حرة, مفتاح: To a science museum.]; p32-2 [answer, كتابة حرة, مفتاح: No, it isn't.]; p32-3 [answer, كتابة حرة, مفتاح: A future possibility.]; p32-4 [answer, كتابة حرة, مفتاح: A future possibility.]; p32-5 [answer, كتابة حرة, مفتاح: He thought he might have left it at home.]; p32-6 [answer, كتابة حرة, مفتاح: In his other bag.]; p32-7 [answer, كتابة حرة, مفتاح: Perhaps.]; p32-8 [answer, كتابة حرة, مفتاح: A polite, somewhat formal way of introducing a reminder.]; p32-9 [answer, كتابة حرة, مفتاح: Because it may rain.]; p32-10 [answer, كتابة حرة, مفتاح: General possibility.] → مفاتيح §32 بعد المحاولة |
| §33 | 25 | منطقة الاختبار المستقلة — TestArea43 | q1 [إجابتك]; q2 [إجابتك]; q3 [إجابتك]; q4 [إجابتك]; q5 [إجابتك]; q6 [إجابتك]; q7 [إجابتك]; q8 [إجابتك]; q9 [الفعل الناقص, HAVE, V3]; q10 [الفعل الناقص, HAVE, V3]; q11 [إجابتك]; q12 [إجابتك]; q13 [إجابتك]; q14 [إجابتك]; q15 [إجابتك]; q16 [إجابتك]; q17 [إجابتك]; q18 [إجابتك]; q19 [إجابتك]; q20 [إجابتك]; q21 [إجابتك]; q22 [إجابتك]; q23 [إجابتك]; q24 [إجابتك]; q25 [إجابتك] → مفاتيح §34 — لا تُعرض قبل التسليم |

## Documented source-accuracy notes

- نُقلت أقسام المصدر الـ38 (الغلاف + §§1–37) كاملة دون حذف أي قسم أو مثال أو سؤال أو إجابة.
- مفاتيح التدريبات §§27–32 من المصدر حرفيًا: §28 مفاتيح A B A C B A؛ §29 مفاتيح Maybe/may be بالتناوب؛ §30 نماذج إعادة صياغة؛ §31 الإصلاحات العشر بما فيها البند ⑧ المتعدد الحلول؛ §32 إجابات الفهم العشر.
- مفاتيح الاختبار الـ25 من §34 حرفيًا، بما فيها الحقول الثلاثة للسؤالين 9 و10 (الفعل الناقص / HAVE / V3).
- §27 يقرر صراحة قبول MAY أو MIGHT في كل البنود الستة — والمحرك يقبل الصيغتين ولا يرفض أيًّا منهما.
- §31 ⑧ يحتفظ بتعدد الحلول: May she come? صياغة ممكنة نحويًا، والاستخدام اليومي يفضل إعادة صياغة بحسب المعنى مثل Is she likely to come? — لا تُفرض إعادة صياغة واحدة.
- موقف المصدر من النسب محفوظ: لا توجد نسب مئوية ثابتة لـ MAY أو MIGHT، وMAY ليست دائمًا أقوى من MIGHT.
- التطبيعات الموثقة: إزالة الإيموجي وأعلام الأعلام من العناوين، وحذف أشرطة الزينة ━━━، وربط خلايا الجداول بـ | ، وإزالة الأسطر الفارغة الزائدة. لا تغيير في أي نص تعليمي.
- أسئلة §33 الخمسة والعشرون محفوظة في testData43 حرفيًا بما فيها سياق الحوار ذي الأسطر العشرة؛ ومفاتيحها في solutionsData43 مطابقة لـ §34 حرفيًا.

## Platform-authored additions (not source text)

- ProbabilityExplorer43: طيف احتمال كيفي (مؤكد/مرجح/ممكن/بعيد/مستحيل) بلا نسب مئوية — بنود تصنيف من إعداد المنصة.
- BuilderLab43 وDialLab43: أقراص تركيب الجمل — واجهة المنصة، أمثلة من سياق الدرس.
- SwapLab43: اختبار التبديل MAY ↔ MIGHT — بنود المنصة المستندة إلى أمثلة §11.
- NegationLab43 وMustNotCompare43: تصنيف الاحتمال السلبي مقابل المنع — بنود المنصة.
- PermissionStudio43: سلم اللباقة (Can I / Could I / May I / Might I) — ترتيب المنصة التربوي لمحتوى §§15–17.
- MaybeLab43: مصنّف وظيفة الكلمة (ظرف مقابل فعل ناقص + رابط) — يغطي أمثلة §19 وأسئلة §29 معًا.
- PastPossibilityAnalyzer43: فك تركيب MAY HAVE + V3 وخريطة المسار الزمني — واجهة المنصة.
- FourModalMatrix43 وDecisionGuide43: مصفوفة الأفعال الأربعة والأسئلة الستة — أسئلة المنصة المستندة إلى §24–25.
- ContextDetective43: وسم الاستخدامات الثمانية في حوار §26 — أزواج سؤال/جواب من إعداد المنصة.
- practiceNotes43.ts: سبب كل مفتاح تدريب — شرح المنصة، المفتاح نفسه من المصدر.
- solutionsData43.ts: جملة السبب لكل سؤال اختبار — شرح المنصة، المفتاح من §34.
- WritingMission43: نموذج إرشادي موسوم «إضافة المنصة» وقائمة التحقق العشرية.
- دليل المعلم: تسلسل زمني مقترح وتصورات خاطئة وسلم تقييم — كلها من إعداد المنصة.
- الهوية البصرية «مرصد الاحتمالات» وألوان القنوات (teal لـ MAY وamber لـ MIGHT) — تصميم المنصة.

## Every normalized source unit

### cover — الدرس 43: MAY & MIGHT

Destination: **الغلاف — الخطوة 0 (Cover43)**. Answer/explanation destination: **لا مفاتيح — تعريف المقرر**.

| Unit | Source content |
|---|---|
| s0-u1 | الاحتمال، وعدم اليقين، والاستئذان |
| s0-u2 | The Art of Speaking Without Being 100% Sure 🔮 |
| s0-u3 | رحلة إتقان اللغة الإنجليزية — المنهج الشامل 120 درسًا — IQ200 |
| s0-u4 | تخيّل أنك تنظر من النافذة، فترى السماء ملبدة بالغيوم. |
| s0-u5 | يسألك صديقك: |
| s0-u6 | Will it rain tomorrow? |
| s0-u7 | هل ستمطر غدًا؟ |
| s0-u8 | أنت لا تعرف الإجابة بالتأكيد، لكنك تعتقد أن المطر محتمل. |
| s0-u9 | هل يجب أن تجيب بنعم أو لا فقط؟ |
| s0-u10 | بالطبع لا! |
| s0-u11 | يمكنك أن تقول: |
| s0-u12 | It may rain tomorrow. |
| s0-u13 | قد تمطر غدًا. |
| s0-u14 | أو: |
| s0-u15 | It might rain tomorrow. |
| s0-u16 | ربما تمطر غدًا. |
| s0-u17 | لقد استخدمنا كلمتين صغيرتين، لكنهما أضافتا معنى بالغ الأهمية: أنا لا أؤكد وقوع الحدث، بل أراه احتمالًا. |
| s0-u18 | في الدرس 42 تعلمنا CAN وCOULD، واكتشفنا كيف نتحدث عن القدرة والإمكانية والطلبات المهذبة. |
| s0-u19 | واليوم سنضيف إلى أدواتنا اللغوية: |
| s0-u20 | MAY & MIGHT |
| s0-u21 | وسنتعلم كيف نستخدمهما للتعبير عن الاحتمال، والاستئذان، والتوقعات غير المؤكدة، وكيف نميز بينهما وبين CAN وCOULD. |
| s0-u22 | والأهم: سنتعلم أن الإنجليزية الطبيعية لا تقوم دائمًا على إجابات قاطعة؛ أحيانًا تكون الدقة الحقيقية في قدرتنا على التعبير عن عدم اليقين. |

### s01 — أهداف الدرس

Destination: **الخطوة 1 — GoalList43**. Answer/explanation destination: **لا مفاتيح — أهداف المقرر**.

| Unit | Source content |
|---|---|
| s1-u1 | بنهاية الدرس ستكون قادرًا على: |
| s1-u2 | ① استخدام MAY للتعبير عن احتمال في الحاضر أو المستقبل. |
| s1-u3 | ② استخدام MIGHT للتعبير عن احتمال غير مؤكد. |
| s1-u4 | ③ فهم الفرق الحقيقي بين MAY وMIGHT دون الاعتماد على نسب مئوية وهمية. |
| s1-u5 | ④ استخدام MAY في طلب الإذن ومنحه. |
| s1-u6 | ⑤ تكوين الإثبات والنفي والسؤال باستخدام MAY وMIGHT. |
| s1-u7 | ⑥ التمييز بين MAY NOT وMUST NOT. |
| s1-u8 | ⑦ المقارنة بين CAN وCOULD وMAY وMIGHT. |
| s1-u9 | ⑧ استخدام MAY BE وMIGHT BE بطريقة صحيحة. |
| s1-u10 | ⑨ التمييز بين MAY BE وMAYBE. |
| s1-u11 | ⑩ استخدام MAY HAVE + V3 وMIGHT HAVE + V3 للتعبير عن احتمال يتعلق بالماضي. |
| s1-u12 | ⑪ تحليل الاحتمالات داخل الحوارات والنصوص. |
| s1-u13 | ⑫ تطبيق جميع القواعد في اختبار شامل. |

### s02 — ما الذي يجعل MAY وMIGHT مختلفتين؟

Destination: **الخطوة 2 — المصدر + ProbabilityExplorer43**. Answer/explanation destination: **الطيف الكيفي — تغذية راجعة فورية**.

| Unit | Source content |
|---|---|
| s2-u1 | لنبدأ بثلاث جمل: |
| s2-u2 | ① She is at home. |
| s2-u3 | هي في المنزل. |
| s2-u4 | ② She may be at home. |
| s2-u5 | ربما تكون في المنزل. |
| s2-u6 | ③ She might be at home. |
| s2-u7 | قد تكون في المنزل. |
| s2-u8 | في الجملة الأولى، يقدّم المتحدث المعلومة بوصفها حقيقة. |
| s2-u9 | أما الجملتان الثانية والثالثة، فلا تؤكدان وجودها في المنزل. |
| s2-u10 | بل تعبّران عن احتمال. |
| s2-u11 | اكتشاف مهم |
| s2-u12 | MAY وMIGHT لا تخبراننا بالحدث فقط، بل تخبراننا أيضًا بموقف المتحدث من صحة المعلومة. |
| s2-u13 | هل هو متأكد؟ |
| s2-u14 | أم يرى أنها محتملة؟ |
| s2-u15 | وهذه هي إحدى الوظائف الأساسية للأفعال الناقصة Modal Verbs. |

### s03 — القاعدة الأساسية لبناء الجملة

Destination: **الخطوة 3 — المصدر + BuilderLab43**. Answer/explanation destination: **باني الجمل — قراءة فورية**.

| Unit | Source content |
|---|---|
| s3-u1 | تذكر قاعدة الدرس 42: |
| s3-u2 | بعد الفعل الناقص نستخدم V1 دون إضافة to. |
| s3-u3 | الأمر نفسه ينطبق على MAY وMIGHT. |
| s3-u4 | الصيغة: |
| s3-u5 | Subject + may/might + V1 |
| s3-u6 | أمثلة: |
| s3-u7 | I may travel tomorrow. |
| s3-u8 | قد أسافر غدًا. |
| s3-u9 | She might visit her grandmother. |
| s3-u10 | ربما تزور جدتها. |
| s3-u11 | They may arrive late. |
| s3-u12 | قد يصلون متأخرين. |
| s3-u13 | We might need more time. |
| s3-u14 | ربما نحتاج إلى وقت إضافي. |
| s3-u15 | انتبه |
| s3-u16 | She mays travel. ❌ |
| s3-u17 | She may travel. ✅ |
| s3-u18 | He mights come. ❌ |
| s3-u19 | He might come. ✅ |
| s3-u20 | They may to arrive. ❌ |
| s3-u21 | They may arrive. ✅ |

### s04 — هل تتغير MAY وMIGHT مع الضمائر؟

Destination: **الخطوة 4 — المصدر + TransformMay43**. Answer/explanation destination: **تحويل الإثبات إلى نفي وسؤال**.

| Unit | Source content |
|---|---|
| s4-u1 | لا. |
| s4-u2 | مثل CAN وCOULD، تبقى MAY وMIGHT ثابتتين مع جميع الضمائر. |
| s4-u3 | الفاعل \| MAY \| MIGHT |
| s4-u4 | I \| I may travel. \| I might travel. |
| s4-u5 | You \| You may travel. \| You might travel. |
| s4-u6 | He \| He may travel. \| He might travel. |
| s4-u7 | She \| She may travel. \| She might travel. |
| s4-u8 | It \| It may happen. \| It might happen. |
| s4-u9 | We \| We may travel. \| We might travel. |
| s4-u10 | They \| They may travel. \| They might travel. |
| s4-u11 | لا نضيف s أو es. |
| s4-u12 | ولا نستخدم do أو does أو did لتكوين السؤال مع MAY أو MIGHT. |

### s05 — الاستخدام الأول: الاحتمال في المستقبل

Destination: **الخطوة 5 — جدول الضمائر + DialLab43**. Answer/explanation destination: **قراءة فورية من القرص**.

| Unit | Source content |
|---|---|
| s5-u1 | نستخدم MAY عندما نعتقد أن حدثًا ما ممكن الوقوع، لكننا لا نؤكد حدوثه. |
| s5-u2 | مثال: |
| s5-u3 | It may rain tomorrow. |
| s5-u4 | قد تمطر غدًا. |
| s5-u5 | She may join the competition next week. |
| s5-u6 | قد تشارك في المسابقة الأسبوع القادم. |
| s5-u7 | We may visit the museum on Friday. |
| s5-u8 | ربما نزور المتحف يوم الجمعة. |
| s5-u9 | The teacher may give us a short test. |
| s5-u10 | قد يعطينا المعلم اختبارًا قصيرًا. |
| s5-u11 | ما الفرق بين WILL وMAY؟ |
| s5-u12 | قارن: |
| s5-u13 | The team will win. |
| s5-u14 | سيفوز الفريق. |
| s5-u15 | المتحدث يقدم توقعًا مباشرًا. |
| s5-u16 | The team may win. |
| s5-u17 | قد يفوز الفريق. |
| s5-u18 | المتحدث يبرز أن الفوز احتمال، وليس أمرًا مؤكدًا. |
| s5-u19 | نقطة متقدمة |
| s5-u20 | WILL في التوقعات لا تعني دائمًا ضمانًا مطلقًا، لكن MAY تجعل عدم اليقين ظاهرًا بصورة أوضح. |

### s06 — الاستخدام الثاني: الاحتمال في الحاضر

Destination: **الخطوة 6 — المصدر + WILL vs MAY + WillMayCompare43**. Answer/explanation destination: **WILL ليست ضمانًا**.

| Unit | Source content |
|---|---|
| s6-u1 | MAY ليست مخصصة للمستقبل فقط. |
| s6-u2 | يمكن استخدامها للتعبير عن احتمال يتعلق بالحاضر. |
| s6-u3 | مثال: |
| s6-u4 | Omar may be at the library now. |
| s6-u5 | ربما يكون عمر في المكتبة الآن. |
| s6-u6 | She may know the answer. |
| s6-u7 | قد تعرف الإجابة. |
| s6-u8 | They may need some help. |
| s6-u9 | ربما يحتاجون إلى بعض المساعدة. |
| s6-u10 | The children may be tired. |
| s6-u11 | قد يكون الأطفال متعبين. |
| s6-u12 | التحليل |
| s6-u13 | She may know the answer. |
| s6-u14 | لا نؤكد أنها تعرف الإجابة. |
| s6-u15 | بل نقول إن معرفتها للإجابة أمر محتمل. |

### s07 — MAY BE — تركيب مهم جدًا

Destination: **الخطوة 7 — المصدر + MayBeComposer43**. Answer/explanation destination: **مركّب MAY BE**.

| Unit | Source content |
|---|---|
| s7-u1 | الصيغة: |
| s7-u2 | Subject + may + be + Complement |
| s7-u3 | أمثلة: |
| s7-u4 | He may be tired. |
| s7-u5 | ربما يكون متعبًا. |
| s7-u6 | The answer may be correct. |
| s7-u7 | قد تكون الإجابة صحيحة. |
| s7-u8 | This exercise may be difficult. |
| s7-u9 | قد يكون هذا التمرين صعبًا. |
| s7-u10 | She may be our new teacher. |
| s7-u11 | ربما تكون معلمتنا الجديدة. |
| s7-u12 | لماذا استخدمنا BE؟ |
| s7-u13 | لأننا نريد ربط الفاعل بوصف أو حالة أو تعريف. |
| s7-u14 | تذكر من الدرس 41: |
| s7-u15 | BE قد يعمل بوصفه فعلًا رابطًا. |
| s7-u16 | وبعد MAY نستخدم الصيغة الأساسية: |
| s7-u17 | be. |
| s7-u18 | وليس: |
| s7-u19 | is |
| s7-u20 | أو: |
| s7-u21 | are |
| s7-u22 | الخطأ الشائع |
| s7-u23 | She may is tired. ❌ |
| s7-u24 | She may be tired. ✅ |

### s08 — الاستخدام الأول: الاحتمال في المستقبل

Destination: **الخطوة 8 — المصدر + ModalFamily43Intro**. Answer/explanation destination: **لا مفاتيح — تعريف القناة**.

| Unit | Source content |
|---|---|
| s8-u1 | نستخدم MIGHT للتعبير عن احتمال حدوث شيء ما. |
| s8-u2 | أمثلة: |
| s8-u3 | I might buy a new laptop next month. |
| s8-u4 | ربما أشتري حاسوبًا محمولًا جديدًا الشهر القادم. |
| s8-u5 | We might go camping this weekend. |
| s8-u6 | قد نذهب للتخييم في نهاية الأسبوع. |
| s8-u7 | She might change her mind. |
| s8-u8 | ربما تغيّر رأيها. |
| s8-u9 | The match might start late. |
| s8-u10 | قد تبدأ المباراة متأخرة. |
| s8-u11 | حوار قصير |
| s8-u12 | Maya: What are you going to do tomorrow? |
| s8-u13 | Omar: I'm not sure. I might visit my cousin. |
| s8-u14 | Maya: Are you going to stay there all day? |
| s8-u15 | Omar: Maybe. I might come home early. |
| s8-u16 | الترجمة: |
| s8-u17 | مايا: ماذا تنوي أن تفعل غدًا؟ |
| s8-u18 | عمر: لست متأكدًا. ربما أزور ابن عمي. |
| s8-u19 | مايا: هل ستبقى هناك طوال اليوم؟ |
| s8-u20 | عمر: ربما. قد أعود إلى المنزل مبكرًا. |

### s09 — MIGHT للتعبير عن الاحتمال في الحاضر

Destination: **الخطوة 9 — المصدر + فحص قاعدة MIGHT**. Answer/explanation destination: **ChoiceLab مغلق بالمحاولة**.

| Unit | Source content |
|---|---|
| s9-u1 | مثل MAY، يمكن استخدام MIGHT للتعبير عن احتمال يتعلق بالحاضر. |
| s9-u2 | مثال: |
| s9-u3 | She might be asleep. |
| s9-u4 | ربما تكون نائمة. |
| s9-u5 | They might know the answer. |
| s9-u6 | قد يعرفون الإجابة. |
| s9-u7 | The keys might be in your bag. |
| s9-u8 | ربما تكون المفاتيح في حقيبتك. |
| s9-u9 | He might need a break. |
| s9-u10 | ربما يحتاج إلى استراحة. |
| s9-u11 | لاحظ أن الجمل لا تتحدث بالضرورة عن المستقبل. |
| s9-u12 | السياق هو الذي يحدد الزمن المقصود. |

### s10 — MAY vs MIGHT — هل هناك فرق في قوة الاحتمال؟

Destination: **الخطوة 10 — جدول الضمائر + DialLab43**. Answer/explanation destination: **قراءة فورية من القرص**.

| Unit | Source content |
|---|---|
| s10-u1 | هذه من أهم نقاط الدرس. |
| s10-u2 | كثيرًا ما تُشرح MAY وMIGHT بهذه الطريقة: |
| s10-u3 | MAY = احتمال قوي. |
| s10-u4 | MIGHT = احتمال ضعيف. |
| s10-u5 | لكن هذا التبسيط ليس قاعدة دقيقة في جميع السياقات. |
| s10-u6 | في الاستخدام المعاصر، يمكن أن تتداخل الكلمتان كثيرًا، وتكونان قابلتين للتبادل في عدد كبير من الجمل. |
| s10-u7 | قارن: |
| s10-u8 | It may rain tomorrow. |
| s10-u9 | It might rain tomorrow. |
| s10-u10 | كلتاهما صحيحتان. |
| s10-u11 | وقد توحي MIGHT أحيانًا بدرجة أكبر من التحفظ أو التردد، لكن الفرق ليس ثابتًا دائمًا. |
| s10-u12 | هل نستطيع القول إن: |
| s10-u13 | MAY = 70% |
| s10-u14 | MIGHT = 30% |
| s10-u15 | لا. |
| s10-u16 | هذه نسب مصطنعة، وليست قاعدة لغوية. |
| s10-u17 | القاعدة التعليمية الصحيحة |
| s10-u18 | MAY وMIGHT تعبّران عن الاحتمال. |
| s10-u19 | وقد تبدو MIGHT أكثر تحفظًا في بعض السياقات، لكن الاختيار يعتمد على المعنى والموقف والأسلوب. |

### s11 — اختبار الفهم: هل يمكن تبديل MAY وMIGHT؟

Destination: **الخطوة 11 — المصدر + SwapLab43**. Answer/explanation destination: **اختبار التبديل MAY ↔ MIGHT**.

| Unit | Source content |
|---|---|
| s11-u1 | انظر إلى الجمل التالية: |
| s11-u2 | ① She may come later. |
| s11-u3 | ② She might come later. |
| s11-u4 | كلتاهما صحيحتان. |
| s11-u5 | ③ We may need more information. |
| s11-u6 | ④ We might need more information. |
| s11-u7 | كلتاهما صحيحتان. |
| s11-u8 | ⑤ This plan may work. |
| s11-u9 | ⑥ This plan might work. |
| s11-u10 | كلتاهما صحيحتان. |
| s11-u11 | لكن لا يعني هذا أنهما متطابقتان في جميع الاستخدامات. |
| s11-u12 | فمثلًا، MAY تُستخدم في طلب الإذن الرسمي ومنحه، بينما MIGHT ليست البديل الطبيعي المعتاد في جميع هذه المواقف. |
| s11-u13 | وسنشرح ذلك بعد قليل. |

### s12 — MAY NOT — احتمال عدم حدوث الشيء

Destination: **الخطوة 12 — المصدر + TransformMay43**. Answer/explanation destination: **تحويلات MAY NOT**.

| Unit | Source content |
|---|---|
| s12-u1 | الصيغة: |
| s12-u2 | Subject + may not + V1 |
| s12-u3 | مثال: |
| s12-u4 | She may not come tomorrow. |
| s12-u5 | قد لا تأتي غدًا. |
| s12-u6 | We may not finish the project today. |
| s12-u7 | ربما لا ننهي المشروع اليوم. |
| s12-u8 | He may not know the answer. |
| s12-u9 | قد لا يعرف الإجابة. |
| s12-u10 | The shop may not be open. |
| s12-u11 | ربما لا يكون المتجر مفتوحًا. |
| s12-u12 | انتبه إلى المعنى |
| s12-u13 | She may not come. |
| s12-u14 | لا تعني بالضرورة أنها ممنوعة من المجيء. |
| s12-u15 | بل قد تعني أن عدم مجيئها أمر محتمل. |
| s12-u16 | لكن MAY NOT قد تُستخدم أيضًا في بعض السياقات الرسمية للتعبير عن عدم السماح. |
| s12-u17 | إذن السياق مهم جدًا. |

### s13 — MIGHT NOT — احتمال عدم حدوث الشيء

Destination: **الخطوة 13 — المصدر + NegationLab43**. Answer/explanation destination: **احتمال أم منع؟**.

| Unit | Source content |
|---|---|
| s13-u1 | الصيغة: |
| s13-u2 | Subject + might not + V1 |
| s13-u3 | أمثلة: |
| s13-u4 | I might not attend the meeting. |
| s13-u5 | ربما لا أحضر الاجتماع. |
| s13-u6 | She might not understand the instructions. |
| s13-u7 | قد لا تفهم التعليمات. |
| s13-u8 | They might not arrive on time. |
| s13-u9 | ربما لا يصلون في الوقت المحدد. |
| s13-u10 | It might not work. |
| s13-u11 | قد لا ينجح الأمر. |
| s13-u12 | مقارنة |
| s13-u13 | She may come. |
| s13-u14 | قد تأتي. |
| s13-u15 | She may not come. |
| s13-u16 | قد لا تأتي. |
| s13-u17 | She might come. |
| s13-u18 | ربما تأتي. |
| s13-u19 | She might not come. |
| s13-u20 | ربما لا تأتي. |

### s14 — الفرق بين MAY NOT وMUST NOT

Destination: **الخطوة 14 — المصدر + MustNotCompare43**. Answer/explanation destination: **MAY NOT ≠ MUST NOT**.

| Unit | Source content |
|---|---|
| s14-u1 | هذه نقطة سنعود إليها بالتفصيل في الدرس 46، لكن من المهم أن ننتبه إليها الآن. |
| s14-u2 | قارن: |
| s14-u3 | She may not come. |
| s14-u4 | قد لا تأتي. |
| s14-u5 | هنا MAY NOT تعبّر عن احتمال عدم المجيء. |
| s14-u6 | أما: |
| s14-u7 | You must not enter this room. |
| s14-u8 | يُمنع عليك دخول هذه الغرفة. |
| s14-u9 | هنا MUST NOT تعبّر عن المنع. |
| s14-u10 | انتبه |
| s14-u11 | لا تترجم جميع تراكيب النفي مع الأفعال الناقصة إلى المعنى نفسه. |
| s14-u12 | فكل فعل ناقص يضيف معنى مختلفًا. |

### s15 — MAY I...? — طلب الإذن بصورة مهذبة

Destination: **الخطوة 15 — المصدر + PermissionStudio43**. Answer/explanation destination: **سلم اللباقة**.

| Unit | Source content |
|---|---|
| s15-u1 | تعلمنا في الدرس 42: |
| s15-u2 | Can I open the window? |
| s15-u3 | Could I open the window, please? |
| s15-u4 | واليوم سنضيف: |
| s15-u5 | May I open the window? |
| s15-u6 | هل تسمح لي بفتح النافذة؟ |
| s15-u7 | هذه صيغة مهذبة، وقد تبدو أكثر رسمية من CAN I في كثير من السياقات. |
| s15-u8 | أمثلة |
| s15-u9 | May I ask a question? |
| s15-u10 | هل تسمح لي بطرح سؤال؟ |
| s15-u11 | May I leave the classroom? |
| s15-u12 | هل يمكنني مغادرة الصف؟ |
| s15-u13 | May I use your computer? |
| s15-u14 | هل يمكنني استخدام حاسوبك؟ |
| s15-u15 | May I sit here? |
| s15-u16 | هل يمكنني الجلوس هنا؟ |
| s15-u17 | المقارنة |
| s15-u18 | Can I...? = طبيعي وشائع في المحادثة اليومية. |
| s15-u19 | Could I...? = مهذب وأقل مباشرة عادةً. |
| s15-u20 | May I...? = مهذب، وقد يكون أكثر رسمية. |

### s16 — حوار تطبيقي: In the Principal's Office

Destination: **الخطوة 16 — المصدر + أمثلة الاستئذان**. Answer/explanation destination: **ChoiceLab درجات اللباقة**.

| Unit | Source content |
|---|---|
| s16-u1 | Student: Excuse me, may I come in? |
| s16-u2 | Principal: Yes, you may. |
| s16-u3 | Student: May I ask you a question about the school competition? |
| s16-u4 | Principal: Of course. |
| s16-u5 | Student: May I join the competition even though I'm new at this school? |
| s16-u6 | Principal: Certainly. All students are welcome. |
| s16-u7 | Student: Thank you very much. |
| s16-u8 | الترجمة |
| s16-u9 | الطالب: عذرًا، هل تسمح لي بالدخول؟ |
| s16-u10 | المدير: نعم، يمكنك ذلك. |
| s16-u11 | الطالب: هل يمكنني أن أسألك عن المسابقة المدرسية؟ |
| s16-u12 | المدير: بالتأكيد. |
| s16-u13 | الطالب: هل يمكنني المشاركة في المسابقة رغم أنني جديد في هذه المدرسة؟ |
| s16-u14 | المدير: بالتأكيد. جميع الطلاب مرحب بهم. |
| s16-u15 | الطالب: شكرًا جزيلًا. |
| s16-u16 | التحليل |
| s16-u17 | May I...? = طلب إذن. |
| s16-u18 | Yes, you may. = منح الإذن. |

### s17 — هل نستخدم MIGHT لطلب الإذن؟

Destination: **الخطوة 17 — حوار المدير + PermissionStudio43**. Answer/explanation destination: **وسم الأدوار في الحوار**.

| Unit | Source content |
|---|---|
| s17-u1 | قد تصادف في الإنجليزية الرسمية أو القديمة تراكيب مثل: |
| s17-u2 | Might I ask a question? |
| s17-u3 | لكنها ليست الصيغة المعتادة التي يحتاج إليها الطالب في المحادثات اليومية. |
| s17-u4 | لذلك نعتمد عمليًا: |
| s17-u5 | Can I...? |
| s17-u6 | Could I...? |
| s17-u7 | May I...? |
| s17-u8 | أما MIGHT فسنتعامل معها أساسًا بوصفها أداة للتعبير عن الاحتمال. |

### s18 — الفرق الذي يسبب أخطاء كثيرة

Destination: **الخطوة 18 — المصدر + MaybeLab43**. Answer/explanation destination: **مصنّف الوظيفة**.

| Unit | Source content |
|---|---|
| s18-u1 | تأمل: |
| s18-u2 | Maybe she is tired. |
| s18-u3 | ربما تكون متعبة. |
| s18-u4 | She may be tired. |
| s18-u5 | قد تكون متعبة. |
| s18-u6 | المعنى متقارب جدًا، لكن التركيب النحوي مختلف. |
| s18-u7 | MAYBE |
| s18-u8 | كلمة واحدة. |
| s18-u9 | تُستخدم ظرفًا بمعنى: |
| s18-u10 | ربما. |
| s18-u11 | مثال: |
| s18-u12 | Maybe we'll travel tomorrow. |
| s18-u13 | ربما نسافر غدًا. |
| s18-u14 | Maybe he forgot the meeting. |
| s18-u15 | ربما نسي الاجتماع. |
| s18-u16 | MAY BE |
| s18-u17 | كلمتان منفصلتان. |
| s18-u18 | may = فعل ناقص. |
| s18-u19 | be = الصيغة الأساسية من BE. |
| s18-u20 | مثال: |
| s18-u21 | He may be tired. |
| s18-u22 | قد يكون متعبًا. |
| s18-u23 | The answer may be correct. |
| s18-u24 | قد تكون الإجابة صحيحة. |
| s18-u25 | الخطأ الشائع |
| s18-u26 | She maybe tired. ❌ |
| s18-u27 | She may be tired. ✅ |
| s18-u28 | أو: |
| s18-u29 | Maybe she is tired. ✅ |

### s19 — مختبر MAYBE وMAY BE

Destination: **الخطوة 19 — المصدر + MaybeLab43 + تركيب MAYBE/MAY BE**. Answer/explanation destination: **تغطي أمثلة §19 وأسئلة §29**.

| Unit | Source content |
|---|---|
| s19-u1 | اختر التعبير الصحيح. |
| s19-u2 | ① ______ we'll visit the museum tomorrow. |
| s19-u3 | A. Maybe |
| s19-u4 | B. May be |
| s19-u5 | ② She ______ at home now. |
| s19-u6 | A. maybe |
| s19-u7 | B. may be |
| s19-u8 | ③ ______ the answer is correct. |
| s19-u9 | A. Maybe |
| s19-u10 | B. May be |
| s19-u11 | ④ This exercise ______ difficult. |
| s19-u12 | A. maybe |
| s19-u13 | B. may be |
| s19-u14 | الحلول |
| s19-u15 | ① Maybe. |
| s19-u16 | ② may be. |
| s19-u17 | ③ Maybe. |
| s19-u18 | ④ may be. |
| s19-u19 | القاعدة الذهبية |
| s19-u20 | إذا أردت وضع «ربما» في بداية الجملة بوصفها كلمة مستقلة، فاستخدم Maybe. |
| s19-u21 | أما إذا جاء الفاعل أولًا وأردت بناء تركيب باستخدام MAY، فاستخدم may be عند الحاجة إلى الفعل BE. |

### s20 — MAY HAVE + V3

Destination: **الخطوة 20 — المصدر + PastPossibilityAnalyzer43**. Answer/explanation destination: **فك التركيب MAY HAVE + V3**.

| Unit | Source content |
|---|---|
| s20-u1 | حتى الآن استخدمنا MAY للتعبير عن احتمال في الحاضر أو المستقبل. |
| s20-u2 | لكن ماذا لو أردنا التعبير عن احتمال يتعلق بحدث ماضٍ؟ |
| s20-u3 | تخيل أن عمر لم يحضر الاجتماع أمس. |
| s20-u4 | أنت لا تعرف السبب، لكنك تعتقد أنه ربما نسي الموعد. |
| s20-u5 | يمكنك أن تقول: |
| s20-u6 | Omar may have forgotten the meeting. |
| s20-u7 | ربما نسي عمر الاجتماع. |
| s20-u8 | الصيغة |
| s20-u9 | Subject + may + have + V3 |
| s20-u10 | أمثلة: |
| s20-u11 | She may have missed the bus. |
| s20-u12 | ربما فاتتها الحافلة. |
| s20-u13 | They may have arrived early. |
| s20-u14 | ربما وصلوا مبكرًا. |
| s20-u15 | He may have lost his keys. |
| s20-u16 | ربما أضاع مفاتيحه. |
| s20-u17 | The teacher may have changed the schedule. |
| s20-u18 | ربما غيّر المعلم الجدول. |
| s20-u19 | ملاحظة |
| s20-u20 | نحن لا نؤكد أن الحدث وقع. |
| s20-u21 | بل نطرح احتمالًا يتعلق بالماضي. |

### s21 — MIGHT HAVE + V3

Destination: **الخطوة 21 — المصدر + محلل الماضي + أزواج حاضر/ماضٍ**. Answer/explanation destination: **ChoiceLab مغلق بالمحاولة**.

| Unit | Source content |
|---|---|
| s21-u1 | يمكن استخدام MIGHT HAVE + V3 أيضًا للتعبير عن احتمال يتعلق بالماضي. |
| s21-u2 | مثال: |
| s21-u3 | She might have forgotten her homework. |
| s21-u4 | ربما نسيت واجبها. |
| s21-u5 | They might have taken the wrong bus. |
| s21-u6 | ربما استقلوا الحافلة الخطأ. |
| s21-u7 | He might have misunderstood the question. |
| s21-u8 | ربما أساء فهم السؤال. |
| s21-u9 | We might have made a mistake. |
| s21-u10 | ربما ارتكبنا خطأ. |
| s21-u11 | المقارنة |
| s21-u12 | She may have left early. |
| s21-u13 | She might have left early. |
| s21-u14 | كلتاهما تعبّران عن احتمال يتعلق بالماضي. |
| s21-u15 | وقد توحي MIGHT بتحفظ أكبر في بعض السياقات، لكن لا نعتمد على فرق ثابت في النسبة المئوية. |

### s22 — الفرق بين MAY HAVE وPRESENT PERFECT

Destination: **الخطوة 22 — حوار مايا وعمر + الجدول + المحلل**. Answer/explanation destination: **وسم التخمين الماضٍ**.

| Unit | Source content |
|---|---|
| s22-u1 | قارن: |
| s22-u2 | She has finished her homework. |
| s22-u3 | لقد أنهت واجبها. |
| s22-u4 | هذه جملة Present Perfect تقدم الحدث بوصفه واقعًا. |
| s22-u5 | أما: |
| s22-u6 | She may have finished her homework. |
| s22-u7 | ربما تكون قد أنهت واجبها. |
| s22-u8 | فهذه جملة تعبّر عن احتمال. |
| s22-u9 | التحليل |
| s22-u10 | She has finished. |
| s22-u11 | has = فعل مساعد لبناء Present Perfect. |
| s22-u12 | She may have finished. |
| s22-u13 | may = فعل ناقص. |
| s22-u14 | have = جزء من التركيب التام. |
| s22-u15 | finished = V3. |
| s22-u16 | إذن إضافة MAY غيّرت موقف المتحدث من المعلومة. |

### s23 — النفي في احتمال الماضي

Destination: **الخطوة 23 — المصدر + MAY HAVE BEEN**. Answer/explanation destination: **ChoiceLab حالة سابقة**.

| Unit | Source content |
|---|---|
| s23-u1 | الصيغ: |
| s23-u2 | may not have + V3 |
| s23-u3 | might not have + V3 |
| s23-u4 | أمثلة: |
| s23-u5 | She may not have received the message. |
| s23-u6 | ربما لم تتلقَّ الرسالة. |
| s23-u7 | He might not have understood the instructions. |
| s23-u8 | ربما لم يفهم التعليمات. |
| s23-u9 | They may not have seen the announcement. |
| s23-u10 | ربما لم يروا الإعلان. |
| s23-u11 | الفرق |
| s23-u12 | She didn't receive the message. |
| s23-u13 | لم تتلقَّ الرسالة. |
| s23-u14 | الجملة تقدم عدم التلقي بوصفه حقيقة. |
| s23-u15 | She may not have received the message. |
| s23-u16 | ربما لم تتلقَّ الرسالة. |
| s23-u17 | الجملة تقدم عدم التلقي بوصفه احتمالًا. |

### s24 — المقارنة الشاملة بين الأفعال الأربعة

Destination: **الخطوة 24 — جدول الأفعال الأربعة + FourModalMatrix43**. Answer/explanation destination: **مصفوفة المعاني**.

| Unit | Source content |
|---|---|
| s24-u1 | الفعل \| الاستخدامات المهمة |
| s24-u2 | CAN \| القدرة الحالية، الإمكانية العامة، الاستئذان، الطلبات |
| s24-u3 | COULD \| القدرة العامة في الماضي، الاحتمال، الطلبات المهذبة، الاقتراحات |
| s24-u4 | MAY \| الاحتمال، طلب الإذن ومنحه، خصوصًا في الأسلوب الرسمي |
| s24-u5 | MIGHT \| الاحتمال، وقد يُستخدم بصورة أكثر تحفظًا |
| s24-u6 | أمثلة مقارنة |
| s24-u7 | I can swim. |
| s24-u8 | أستطيع السباحة. |
| s24-u9 | I could swim when I was six. |
| s24-u10 | كنت أستطيع السباحة عندما كان عمري ست سنوات. |
| s24-u11 | It can be cold here in winter. |
| s24-u12 | يمكن أن يكون الجو باردًا هنا شتاءً. |
| s24-u13 | It could be cold tomorrow. |
| s24-u14 | قد يكون الجو باردًا غدًا. |
| s24-u15 | It may be cold tomorrow. |
| s24-u16 | قد يكون الجو باردًا غدًا. |
| s24-u17 | It might be cold tomorrow. |
| s24-u18 | ربما يكون الجو باردًا غدًا. |

### s25 — كيف نختار الفعل المناسب؟

Destination: **الخطوة 25 — الأسئلة الستة + DecisionGuide43**. Answer/explanation destination: **دليل القرار قبل الكتابة**.

| Unit | Source content |
|---|---|
| s25-u1 | اسأل نفسك: |
| s25-u2 | ① هل أتحدث عن قدرة حالية؟ |
| s25-u3 | استخدم CAN. |
| s25-u4 | ② هل أتحدث عن قدرة عامة في الماضي؟ |
| s25-u5 | استخدم COULD. |
| s25-u6 | ③ هل أطلب الإذن؟ |
| s25-u7 | يمكن استخدام CAN أو COULD أو MAY بحسب مستوى الرسمية والتهذيب. |
| s25-u8 | ④ هل أتحدث عن إمكانية عامة؟ |
| s25-u9 | غالبًا CAN مناسبة. |
| s25-u10 | ⑤ هل أتحدث عن احتمال غير مؤكد؟ |
| s25-u11 | MAY أو MIGHT أو COULD قد تكون مناسبة بحسب السياق. |
| s25-u12 | ⑥ هل أتحدث عن احتمال يتعلق بالماضي؟ |
| s25-u13 | استخدم: |
| s25-u14 | may have + V3 |
| s25-u15 | أو: |
| s25-u16 | might have + V3 |
| s25-u17 | اكتشاف مهم |
| s25-u18 | ليس المطلوب حفظ كلمة واحدة لكل معنى. |
| s25-u19 | بل فهم العلاقة بين المعنى والسياق والتركيب. |

### s26 — الحوار الشامل: The Missing Science Project

Destination: **الخطوة 26 — الحوار الشامل + ContextDetective43**. Answer/explanation destination: **وسم الاستخدامات الثمانية**.

| Unit | Source content |
|---|---|
| s26-u1 | اقرأ الحوار التالي بعناية. |
| s26-u2 | Maya: Where is our science project? I can't find it. |
| s26-u3 | Omar: It may be in the classroom. |
| s26-u4 | Daniel: Or it might be in the laboratory. |
| s26-u5 | Maya: Could someone have moved it? |
| s26-u6 | Omar: Maybe. The cleaner may have put it in the storage room. |
| s26-u7 | Daniel: We might have left it near the computers yesterday. |
| s26-u8 | Maya: May I check the laboratory first? |
| s26-u9 | Teacher: Of course, you may. |
| s26-u10 | Omar: I'll check the classroom. |
| s26-u11 | Daniel: And I might ask the cleaner if he has seen it. |
| s26-u12 | Maya: Great. Let's work together. |
| s26-u13 | الترجمة |
| s26-u14 | مايا: أين مشروع العلوم الخاص بنا؟ لا أستطيع العثور عليه. |
| s26-u15 | عمر: ربما يكون في الصف. |
| s26-u16 | دانيال: أو ربما يكون في المختبر. |
| s26-u17 | مايا: هل من الممكن أن يكون أحدهم قد نقله؟ |
| s26-u18 | عمر: ربما. قد يكون عامل النظافة قد وضعه في غرفة التخزين. |
| s26-u19 | دانيال: ربما تركناه قرب الحواسيب أمس. |
| s26-u20 | مايا: هل يمكنني تفقد المختبر أولًا؟ |
| s26-u21 | المعلم: بالتأكيد، يمكنك ذلك. |
| s26-u22 | عمر: سأبحث في الصف. |
| s26-u23 | دانيال: وربما أسأل عامل النظافة إن كان قد رآه. |
| s26-u24 | مايا: رائع. لنعمل معًا. |
| s26-u25 | تحليل الاستخدامات |
| s26-u26 | It may be = احتمال في الحاضر. |
| s26-u27 | It might be = احتمال في الحاضر. |
| s26-u28 | Could someone have moved it? = سؤال عن احتمال يتعلق بالماضي. |
| s26-u29 | Maybe = ظرف بمعنى ربما. |
| s26-u30 | may have put = احتمال في الماضي. |
| s26-u31 | might have left = احتمال في الماضي. |
| s26-u32 | May I check...? = طلب إذن. |
| s26-u33 | you may = منح الإذن. |

### s27 — التدريب الأول: اختر MAY أو MIGHT

Destination: **الخطوة 27 — PracticeSet43(27)**. Answer/explanation destination: **مفتاح §27 بعد المحاولة — MAY أو MIGHT كلاهما مقبول**.

| Unit | Source content |
|---|---|
| s27-u1 | أكمل الجمل باستخدام MAY أو MIGHT بحسب السياق. |
| s27-u2 | ملاحظة: بعض الجمل تقبل الإجابتين؛ المطلوب فهم المعنى لا التخمين. |
| s27-u3 | ① It ______ rain tomorrow. |
| s27-u4 | ② She ______ be at home now. |
| s27-u5 | ③ We ______ need more information. |
| s27-u6 | ④ He ______ arrive late. |
| s27-u7 | ⑤ This plan ______ work. |
| s27-u8 | ⑥ They ______ visit us next weekend. |
| s27-u9 | الحلول |
| s27-u10 | جميع الجمل السابقة يمكن أن تقبل MAY أو MIGHT بحسب درجة التحفظ والسياق. |
| s27-u11 | مثلًا: |
| s27-u12 | It may rain tomorrow. |
| s27-u13 | It might rain tomorrow. |
| s27-u14 | كلتاهما صحيحتان. |
| s27-u15 | الهدف من التدريب: أن يدرك الطالب أن اللغة ليست دائمًا اختيارًا آليًا بين احتمال قوي واحتمال ضعيف. |

### s28 — التدريب الثاني: اختر الصيغة الصحيحة

Destination: **الخطوة 28 — PracticeSet43(28)**. Answer/explanation destination: **مفتاح §28 بعد المحاولة**.

| Unit | Source content |
|---|---|
| s28-u1 | ① She ______ be tired. |
| s28-u2 | A. may |
| s28-u3 | B. mays |
| s28-u4 | C. may to |
| s28-u5 | ② He might ______ late. |
| s28-u6 | A. arrives |
| s28-u7 | B. arrive |
| s28-u8 | C. arriving |
| s28-u9 | ③ ______ I ask a question? |
| s28-u10 | A. May |
| s28-u11 | B. Do may |
| s28-u12 | C. Does |
| s28-u13 | ④ They may not ______ tomorrow. |
| s28-u14 | A. comes |
| s28-u15 | B. coming |
| s28-u16 | C. come |
| s28-u17 | ⑤ She may have ______ the bus. |
| s28-u18 | A. miss |
| s28-u19 | B. missed |
| s28-u20 | C. missing |
| s28-u21 | ⑥ He might have ______ his keys. |
| s28-u22 | A. lost |
| s28-u23 | B. lose |
| s28-u24 | C. losing |
| s28-u25 | الحلول |
| s28-u26 | ① A — may. |
| s28-u27 | ② B — arrive. |
| s28-u28 | ③ A — May. |
| s28-u29 | ④ C — come. |
| s28-u30 | ⑤ B — missed. |
| s28-u31 | ⑥ A — lost. |

### s29 — التدريب الثالث: MAYBE أم MAY BE؟

Destination: **الخطوة 29 — PracticeSet43(29) + MaybeLab43**. Answer/explanation destination: **مفتاح §29 بعد المحاولة**.

| Unit | Source content |
|---|---|
| s29-u1 | أكمل الجمل: |
| s29-u2 | ① ______ we'll go to the park tomorrow. |
| s29-u3 | ② She ______ at the library. |
| s29-u4 | ③ ______ the teacher is absent today. |
| s29-u5 | ④ This answer ______ correct. |
| s29-u6 | ⑤ ______ they forgot the meeting. |
| s29-u7 | ⑥ He ______ our new classmate. |
| s29-u8 | الحلول |
| s29-u9 | ① Maybe. |
| s29-u10 | ② may be. |
| s29-u11 | ③ Maybe. |
| s29-u12 | ④ may be. |
| s29-u13 | ⑤ Maybe. |
| s29-u14 | ⑥ may be. |

### s30 — التدريب الرابع: الاحتمال في الماضي

Destination: **الخطوة 30 — PracticeSet43(30)**. Answer/explanation destination: **مفتاح §30 بعد المحاولة — MAY وMIGHT قابلان للتبديل**.

| Unit | Source content |
|---|---|
| s30-u1 | أعد كتابة الجمل باستخدام MAY HAVE أو MIGHT HAVE. |
| s30-u2 | مثال: |
| s30-u3 | Perhaps she forgot the appointment. |
| s30-u4 | She may have forgotten the appointment. |
| s30-u5 | الأسئلة: |
| s30-u6 | ① Perhaps he lost his phone. |
| s30-u7 | ② Perhaps they missed the train. |
| s30-u8 | ③ Perhaps Maya misunderstood the instructions. |
| s30-u9 | ④ Perhaps we made a mistake. |
| s30-u10 | ⑤ Perhaps the teacher changed the timetable. |
| s30-u11 | حلول نموذجية |
| s30-u12 | ① He may have lost his phone. |
| s30-u13 | ② They might have missed the train. |
| s30-u14 | ③ Maya may have misunderstood the instructions. |
| s30-u15 | ④ We might have made a mistake. |
| s30-u16 | ⑤ The teacher may have changed the timetable. |
| s30-u17 | يمكن تبديل MAY وMIGHT في هذه الأمثلة عندما يسمح السياق بذلك. |

### s31 — Grammar Detective — اكتشف الأخطاء

Destination: **الخطوة 31 — ErrorRepair43 (تدريب §31 كاملًا)**. Answer/explanation destination: **مفتاح §31 بعد المحاولة**.

| Unit | Source content |
|---|---|
| s31-u1 | صحح الجمل التالية: |
| s31-u2 | ① She mays come tomorrow. |
| s31-u3 | ② He might comes late. |
| s31-u4 | ③ They may to visit us. |
| s31-u5 | ④ She may is tired. |
| s31-u6 | ⑤ Maybe she tired. |
| s31-u7 | ⑥ He may have went home. |
| s31-u8 | ⑦ They might have forgot the meeting. |
| s31-u9 | ⑧ Does she may come? |
| s31-u10 | ⑨ She might not comes. |
| s31-u11 | ⑩ I may will travel tomorrow. |
| s31-u12 | الحلول |
| s31-u13 | ① She may come tomorrow. |
| s31-u14 | ② He might come late. |
| s31-u15 | ③ They may visit us. |
| s31-u16 | ④ She may be tired. |
| s31-u17 | ⑤ Maybe she is tired. |
| s31-u18 | ⑥ He may have gone home. |
| s31-u19 | ⑦ They might have forgotten the meeting. |
| s31-u20 | ⑧ May she come? — صياغة ممكنة نحويًا في سياقات معينة، لكن في الاستعمال اليومي يُفضَّل غالبًا إعادة صياغة السؤال بحسب المعنى، مثل: Is she likely to come? |
| s31-u21 | ⑨ She might not come. |
| s31-u22 | ⑩ I may travel tomorrow. |

### s32 — Reading Challenge — The Unexpected School Trip

Destination: **الخطوة 32 — ReadingChallenge43 (تدريب §32 كاملًا)**. Answer/explanation destination: **مفاتيح §32 بعد المحاولة**.

| Unit | Source content |
|---|---|
| s32-u1 | A Day Full of Possibilities |
| s32-u2 | The students are preparing for a school trip to a science museum. |
| s32-u3 | Their teacher has already arranged the transportation, but the weather forecast is uncertain. |
| s32-u4 | Maya looks outside and says: |
| s32-u5 | "It may rain tomorrow." |
| s32-u6 | Omar replies: |
| s32-u7 | "It might be sunny in the afternoon. We can't be sure." |
| s32-u8 | Daniel checks his bag. |
| s32-u9 | "I can't find my notebook. I may have left it at home." |
| s32-u10 | Maya says: |
| s32-u11 | "Maybe you put it in your other bag." |
| s32-u12 | Daniel checks again. |
| s32-u13 | "You're right! It was there." |
| s32-u14 | Later, the teacher enters the classroom. |
| s32-u15 | "May I remind everyone to bring a bottle of water?" she asks. |
| s32-u16 | The students smile. |
| s32-u17 | Omar says: |
| s32-u18 | "We might need umbrellas too." |
| s32-u19 | The teacher agrees. |
| s32-u20 | "That's a good idea. The weather can change quickly." |
| s32-u21 | أسئلة الفهم |
| s32-u22 | ① Where are the students going? |
| s32-u23 | ② Is the weather forecast certain? |
| s32-u24 | ③ What does It may rain tomorrow express? |
| s32-u25 | ④ What does It might be sunny express? |
| s32-u26 | ⑤ What did Daniel think had happened to his notebook? |
| s32-u27 | ⑥ Where was the notebook actually found? |
| s32-u28 | ⑦ What does Maybe mean in the story? |
| s32-u29 | ⑧ What does May I remind everyone...? express? |
| s32-u30 | ⑨ Why does Omar suggest bringing umbrellas? |
| s32-u31 | ⑩ What does The weather can change quickly express? |
| s32-u32 | الحلول |
| s32-u33 | ① To a science museum. |
| s32-u34 | ② No, it isn't. |
| s32-u35 | ③ A future possibility. |
| s32-u36 | ④ A future possibility. |
| s32-u37 | ⑤ He thought he might have left it at home. |
| s32-u38 | ⑥ In his other bag. |
| s32-u39 | ⑦ Perhaps. |
| s32-u40 | ⑧ A polite, somewhat formal way of introducing a reminder. |
| s32-u41 | ⑨ Because it may rain. |
| s32-u42 | ⑩ General possibility. |

### s33 — الاختبار النهائي — MAY & MIGHT Master Test

Destination: **منطقة الاختبار المستقلة — TestArea43**. Answer/explanation destination: **مفاتيح §34 — لا تُعرض قبل التسليم**.

| Unit | Source content |
|---|---|
| s33-u1 | 25 سؤالًا — خمسة مستويات — اختبار شامل |
| s33-u2 | حاول حل الاختبار دون الرجوع إلى الشرح. |
| s33-u3 | المستوى الأول: Multiple Choice |
| s33-u4 | ① She ______ come tomorrow. |
| s33-u5 | A. may |
| s33-u6 | B. mays |
| s33-u7 | C. may to |
| s33-u8 | ② He might ______ late. |
| s33-u9 | A. arrives |
| s33-u10 | B. arrive |
| s33-u11 | C. arriving |
| s33-u12 | ③ ______ I use your pen, please? |
| s33-u13 | A. May |
| s33-u14 | B. Do may |
| s33-u15 | C. Does |
| s33-u16 | ④ They may not ______ the answer. |
| s33-u17 | A. knows |
| s33-u18 | B. know |
| s33-u19 | C. knowing |
| s33-u20 | ⑤ She may have ______ the bus. |
| s33-u21 | A. miss |
| s33-u22 | B. missing |
| s33-u23 | C. missed |
| s33-u24 | المستوى الثاني: Complete the Sentences |
| s33-u25 | ⑥ It ______ (may / rain) tomorrow. |
| s33-u26 | ⑦ He ______ (might / be) tired. |
| s33-u27 | ⑧ They ______ (may / not / come) today. |
| s33-u28 | ⑨ She ______ (might / have / forget) the meeting. |
| s33-u29 | ⑩ We ______ (may / have / make) a mistake. |
| s33-u30 | المستوى الثالث: Correct the Mistakes |
| s33-u31 | ⑪ She mays be at home. |
| s33-u32 | ⑫ He might comes tomorrow. |
| s33-u33 | ⑬ They may to visit us. |
| s33-u34 | ⑭ She may have went home. |
| s33-u35 | ⑮ Maybe he tired. |
| s33-u36 | المستوى الرابع: Understand the Meaning |
| s33-u37 | ⑯ ما الفرق بين: |
| s33-u38 | She is at home. |
| s33-u39 | She may be at home. |
| s33-u40 | ⑰ هل تعني MIGHT دائمًا أن الاحتمال أضعف من MAY؟ اشرح. |
| s33-u41 | ⑱ ما الفرق بين: |
| s33-u42 | Maybe she is tired. |
| s33-u43 | She may be tired. |
| s33-u44 | ⑲ ما معنى: |
| s33-u45 | He might have forgotten the appointment. |
| s33-u46 | ⑳ ما وظيفة MAY في الجملة: |
| s33-u47 | May I ask a question? |
| s33-u48 | المستوى الخامس: Final IQ200 Boss |
| s33-u49 | أكمل الحوار باستخدام التعبير المناسب. |
| s33-u50 | The Missing Homework |
| s33-u51 | Maya: Where is Omar? He isn't here yet. |
| s33-u52 | Daniel: He ______ be at the library. |
| s33-u53 | Maya: Or he ______ have missed the bus. |
| s33-u54 | Daniel: That's possible. |
| s33-u55 | Teacher: ______ I ask everyone to take their seats, please? |
| s33-u56 | Maya: Of course. |
| s33-u57 | Daniel: Omar ______ not arrive on time. |
| s33-u58 | Teacher: That's all right. ______ he has a good reason. |
| s33-u59 | الأسئلة: |
| s33-u60 | ㉑ احتمال في الحاضر باستخدام MAY. |
| s33-u61 | ㉒ احتمال يتعلق بالماضي باستخدام MIGHT HAVE. |
| s33-u62 | ㉓ طلب مهذب باستخدام MAY. |
| s33-u63 | ㉔ احتمال عدم حدوث شيء باستخدام MAY. |
| s33-u64 | ㉕ استخدم MAYBE بوصفها كلمة مستقلة. |

### s34 — مساحة المعلم — الحلول التفصيلية للاختبار النهائي

Destination: **بوابة المعلم — TeacherArea43 + SolutionsArea43 (lazy)**. Answer/explanation destination: **مفاتيح §34 كاملة**.

| Unit | Source content |
|---|---|
| s34-u1 | مفتاح تصحيح الدرس 43 |
| s34-u2 | يُفضّل عدم عرض هذا القسم للطالب إلا بعد انتهاء الاختبار. |
| s34-u3 | حلول المستوى الأول |
| s34-u4 | ① A — may. |
| s34-u5 | السبب: MAY فعل ناقص ثابت الصيغة. |
| s34-u6 | ② B — arrive. |
| s34-u7 | السبب: بعد MIGHT نستخدم V1. |
| s34-u8 | ③ A — May. |
| s34-u9 | السبب: طلب إذن مهذب. |
| s34-u10 | ④ B — know. |
| s34-u11 | السبب: بعد MAY NOT نستخدم V1. |
| s34-u12 | ⑤ C — missed. |
| s34-u13 | السبب: MAY HAVE + V3. |
| s34-u14 | حلول المستوى الثاني |
| s34-u15 | ⑥ may rain. |
| s34-u16 | It may rain tomorrow. |
| s34-u17 | ⑦ might be. |
| s34-u18 | He might be tired. |
| s34-u19 | ⑧ may not come. |
| s34-u20 | They may not come today. |
| s34-u21 | ⑨ might have forgotten. |
| s34-u22 | She might have forgotten the meeting. |
| s34-u23 | ⑩ may have made. |
| s34-u24 | We may have made a mistake. |
| s34-u25 | حلول المستوى الثالث |
| s34-u26 | ⑪ She may be at home. |
| s34-u27 | ⑫ He might come tomorrow. |
| s34-u28 | ⑬ They may visit us. |
| s34-u29 | ⑭ She may have gone home. |
| s34-u30 | ⑮ Maybe he is tired. |
| s34-u31 | أو: |
| s34-u32 | He may be tired. |
| s34-u33 | حلول المستوى الرابع |
| s34-u34 | ⑯ الأولى تقدم المعلومة بوصفها حقيقة، والثانية تعبّر عن احتمال. |
| s34-u35 | ⑰ لا. قد تبدو MIGHT أكثر تحفظًا في بعض السياقات، لكن لا توجد قاعدة ثابتة تجعلها دائمًا أضعف من MAY بنسبة محددة. |
| s34-u36 | ⑱ الأولى تستخدم Maybe ظرفًا مستقلًا، والثانية تستخدم may فعلًا ناقصًا يتبعه be. المعنى متقارب، لكن التركيب مختلف. |
| s34-u37 | ⑲ ربما نسي الموعد. الجملة تعبّر عن احتمال يتعلق بالماضي. |
| s34-u38 | ⑳ طلب إذن مهذب. |
| s34-u39 | حلول المستوى الخامس |
| s34-u40 | ㉑ may. |
| s34-u41 | He may be at the library. |
| s34-u42 | ㉒ might. |
| s34-u43 | He might have missed the bus. |
| s34-u44 | ㉓ May. |
| s34-u45 | May I ask everyone to take their seats, please? |
| s34-u46 | ㉔ may. |
| s34-u47 | Omar may not arrive on time. |
| s34-u48 | ㉕ Maybe. |
| s34-u49 | Maybe he has a good reason. |
| s34-u50 | ملاحظة للمعلم |
| s34-u51 | في أسئلة الاحتمال المفتوحة، يمكن قبول MAY أو MIGHT عندما تكون كلتاهما صحيحة في السياق. |
| s34-u52 | أما الأسئلة التي تطلب تركيبًا محددًا أو وظيفة محددة، فيجب الالتزام بالمطلوب. |

### s35 — Writing Mission — A Day of Possibilities

Destination: **الخطوة 35 — WritingMission43**. Answer/explanation destination: **قائمة تحقق من 10 بنود — لا تصحيح آلي للنثر**.

| Unit | Source content |
|---|---|
| s35-u1 | اكتب فقرة إنجليزية من 12 إلى 15 جملة بعنوان: |
| s35-u2 | A Day of Possibilities |
| s35-u3 | تخيل أنك تخطط لرحلة مدرسية، لكن بعض التفاصيل لم تُحسم بعد. |
| s35-u4 | يجب أن تحتوي فقرتك على: |
| s35-u5 | ① ثلاث جمل باستخدام MAY. |
| s35-u6 | ② ثلاث جمل باستخدام MIGHT. |
| s35-u7 | ③ جملتين باستخدام MAY NOT أو MIGHT NOT. |
| s35-u8 | ④ جملة باستخدام MAY BE. |
| s35-u9 | ⑤ جملة تبدأ بكلمة MAYBE. |
| s35-u10 | ⑥ جملتين باستخدام MAY HAVE أو MIGHT HAVE. |
| s35-u11 | ⑦ طلب إذن باستخدام May I...? |
| s35-u12 | ⑧ مقارنة واحدة بين CAN وMAY أو MIGHT. |
| s35-u13 | نموذج إرشادي |
| s35-u14 | Our class is planning a trip next week. |
| s35-u15 | We may visit a science museum, but the final decision hasn't been made yet. |
| s35-u16 | The weather might be sunny, although it may rain in the morning. |
| s35-u17 | Some students might not join us because they have other activities. |
| s35-u18 | Maybe we'll leave early. |
| s35-u19 | Our teacher may have already arranged the transportation. |
| s35-u20 | I might have forgotten to bring my permission form, so I need to check my bag. |
| s35-u21 | May I bring my camera? I want to take some pictures. |
| s35-u22 | The trip could be exciting, and I hope everyone enjoys it. |
| s35-u23 | تحدي إضافي |
| s35-u24 | بعد كتابة الفقرة، حدد وظيفة كل استخدام لـ MAY وMIGHT: |
| s35-u25 | احتمال حاضر؟ |
| s35-u26 | احتمال مستقبلي؟ |
| s35-u27 | احتمال ماضٍ؟ |
| s35-u28 | طلب إذن؟ |

### s36 — الملخص الذهبي — MAY & MIGHT

Destination: **الخطوة 36 — SummaryCards43 + المصدر**. Answer/explanation destination: **بطاقات القواعد الذهبية**.

| Unit | Source content |
|---|---|
| s36-u1 | MAY |
| s36-u2 | الصيغة: |
| s36-u3 | Subject + may + V1 |
| s36-u4 | أهم الاستخدامات: |
| s36-u5 | ① الاحتمال في الحاضر. |
| s36-u6 | She may be at home. |
| s36-u7 | ② الاحتمال في المستقبل. |
| s36-u8 | It may rain tomorrow. |
| s36-u9 | ③ طلب الإذن. |
| s36-u10 | May I ask a question? |
| s36-u11 | ④ منح الإذن. |
| s36-u12 | Yes, you may. |
| s36-u13 | MIGHT |
| s36-u14 | الصيغة: |
| s36-u15 | Subject + might + V1 |
| s36-u16 | أهم الاستخدامات: |
| s36-u17 | ① الاحتمال في الحاضر. |
| s36-u18 | He might be tired. |
| s36-u19 | ② الاحتمال في المستقبل. |
| s36-u20 | We might travel tomorrow. |
| s36-u21 | ③ التعبير عن احتمال بصورة أكثر تحفظًا في بعض السياقات. |
| s36-u22 | النفي |
| s36-u23 | may not + V1 |
| s36-u24 | might not + V1 |
| s36-u25 | احتمال الماضي |
| s36-u26 | may have + V3 |
| s36-u27 | might have + V3 |
| s36-u28 | أمثلة: |
| s36-u29 | She may have forgotten. |
| s36-u30 | He might have left early. |
| s36-u31 | MAYBE vs MAY BE |
| s36-u32 | Maybe = ربما، كلمة واحدة مستقلة. |
| s36-u33 | May be = فعل ناقص + BE. |
| s36-u34 | القاعدة الذهبية الكبرى |
| s36-u35 | MAY وMIGHT لا تعبّران عن حقيقة مؤكدة، بل عن احتمال. |
| s36-u36 | ولا تختَر بينهما اعتمادًا على نسب مئوية ثابتة؛ افهم المعنى والسياق أولًا. |

### s37 — خريطة تقدم المنهج والمحطة القادمة

Destination: **الخطوة 37 — Roadmap43 + المصدر**. Answer/explanation destination: **خريطة المنهج — الدرس 44 مخطط فقط**.

| Unit | Source content |
|---|---|
| s37-u1 | أكملنا الآن الدرس 43 من أصل 120 درسًا. |
| s37-u2 | التقدم الكلي |
| s37-u3 | 43 / 120 |
| s37-u4 | 43 درسًا مكتملًا |
| s37-u5 | 77 درسًا متبقيًا |
| s37-u6 | الدرس القادم: Lesson 44 — MUST & HAVE TO |
| s37-u7 | Necessity, Obligation & Rules |
| s37-u8 | سنتعلم فيه: |
| s37-u9 | - التعبير عن الضرورة والإلزام. |
| s37-u10 | - الفرق بين MUST وHAVE TO. |
| s37-u11 | - كيف نميز بين الالتزام الذي يؤكده المتحدث والالتزام الناتج عن ظروف أو قواعد خارجية. |
| s37-u12 | - استخدام HAVE TO في الحاضر والماضي والمستقبل. |
| s37-u13 | - الفرق المهم بين MUST NOT وDON'T HAVE TO. |
| s37-u14 | - تطبيقات حياتية تتعلق بالمدرسة والمنزل والقوانين والتعليمات. |
| s37-u15 | - تدريبات متدرجة واختبار نهائي شامل. |
| s37-u16 | في الدرس 42 تعلمنا كيف نتحدث عن القدرة والإمكانية، وفي الدرس 43 تعلمنا كيف نعبر عن الاحتمال وعدم اليقين. أما الدرس 44 فسينقلنا إلى مستوى جديد: كيف نعبر عما يجب علينا فعله، وما تفرضه علينا القواعد والظروف، وما نراه نحن ضروريًا. 🚀 |
