# Lesson 42 — source-to-implementation coverage

Source: complete lesson supplied in the conversation. `source42.ts` preserves the text with the normalization documented below. No external missing source was reconstructed as a quotation.

## Mapping rules

- Opening plus §§1–44 are 45 native steps in source order; §40 routes to the independent test, §41 to protected teacher access.
- Each unit below is one normalized source line, not merely a section heading. Ordinary lines render through Steps42/Lines42. Tables combine contiguous pipe-separated lines into rows with headers.
- Numbered practice prompts and options map to PracticeCard42; source keys appear only after the student writes an attempt. TeacherGuide42 includes every prompt, key and platform-authored explanation.
- §39 passage is rendered in full before its ten question cards. §42 criteria are checkbox labels; the original model is a separately labelled optional reference.
- §40 options and question subparts are independently represented in testData42; the test module imports no solution, source-ledger or teacher data.
- §41 is the full 25-key correction list. It is never rendered inside a student step: it lives behind the existing teacher gate and in the post-submission solutions area.
- Ten learning-station markers are attached to the first step of their station, rather than as separate decorative separators.
- Decorative separator bars and heading emoji/GB flags were removed. Blank lines collapsed; table cells joined with ` | `; Arabic question marks at the end of English sentences normalized to `?`. No instructional example or numbered item was removed.
- Source spelling and variety notes are retained. The §42 model is eight sentences, not a fully compliant submission — see the accuracy notes.

## Source inventory

- 45 sections (opening + 44 numbered), 932 normalized units.
- 43 attempt-bound practice items (§§34–39), 25 final-test questions in five levels, 25 detailed keys.
- 10 stations: الانطلاق ORIENTATION (0–5) · قناة CAN PRESENT ABILITY (6–11) · قناة COULD PAST ABILITY (12–16) · القدرة المحددة COULD vs ABLE TO (17–19) · الاستئذان PERMISSION (20–21) · الطلبات REQUESTS (22–25) · الإمكانية POSSIBILITY (26–29) · التواصل المهذب POLITE USE (30–33) · المعنى والسياق MEANING LAB (34–39) · التقييم والتأمل ASSESS & REFLECT (40–44).
- Frozen inventory: `docs/lesson42-source-manifest.json` (per-section unit counts and SHA-256 of the normalized lines).

## Item and subpart coverage

| Source | Items | Implementation | Subparts / solutions |
|---|---:|---|---|
| §34 | 8 | PracticeSet42 | p34-1 [response]; p34-2 [response]; p34-3 [response]; p34-4 [response]; p34-5 [response]; p34-6 [response]; p34-7 [response]; p34-8 [response] → Attempt-bound PracticeCard42 + TeacherGuide42 |
| §35 | 5 | PracticeSet42 | p35-1 [response]; p35-2 [response]; p35-3 [response]; p35-4 [response]; p35-5 [response] → Attempt-bound PracticeCard42 + TeacherGuide42 |
| §36 | 5 | PracticeSet42 | p36-1 [response]; p36-2 [response]; p36-3 [response]; p36-4 [response]; p36-5 [response] → Attempt-bound PracticeCard42 + TeacherGuide42 |
| §37 | 5 | PracticeSet42 | p37-1 [choice, note]; p37-2 [choice, note]; p37-3 [choice, note]; p37-4 [choice, note]; p37-5 [choice, note] → Attempt-bound PracticeCard42 + TeacherGuide42 |
| §38 | 10 | PracticeSet42 | p38-1 [repair, reason]; p38-2 [repair, reason]; p38-3 [repair, reason]; p38-4 [repair, reason]; p38-5 [repair, reason]; p38-6 [repair, reason]; p38-7 [repair, reason]; p38-8 [repair, reason]; p38-9 [repair, reason]; p38-10 [repair, reason] → Attempt-bound PracticeCard42 + TeacherGuide42 |
| §39 | 10 | ReadingChallenge42 + PracticeSet42 | p39-1 [answer]; p39-2 [answer]; p39-3 [answer]; p39-4 [answer]; p39-5 [answer]; p39-6 [answer]; p39-7 [answer]; p39-8 [answer]; p39-9 [answer]; p39-10 [answer] → Attempt-bound PracticeCard42 + TeacherGuide42 |
| §40 | 25 | TestArea42 | q1 [إجابتك]; q2 [إجابتك]; q3 [إجابتك]; q4 [إجابتك]; q5 [إجابتك]; q6 [إجابتك]; q7 [الفعل الناقص, الفعل الرئيسي]; q8 [إجابتك]; q9 [إجابتك]; q10 [إجابتك]; q11 [إجابتك]; q12 [إجابتك]; q13 [إجابتك]; q14 [إجابتك]; q15 [إجابتك]; q16 [إجابتك]; q17 [إجابتك]; q18 [إجابتك]; q19 [إجابتك]; q20 [إجابتك]; q21 [إجابتك]; q22 [إجابتك]; q23 [إجابتك]; q24 [إجابتك]; q25 [إجابتك] → Lazy SolutionsArea42 + TeacherGuide42 |

## Documented source-accuracy notes

- النص كاملًا محفوظ في source42.ts؛ الأقسام 1–44 مرقّمة كما في المصدر، والغلاف قسم 0.
- أُزيلت فقط أشرطة الزينة ━━━ وفواصل الأسطر الفارغة، وحُذفت أعلام الإيموجي من العناوين؛ لا حذف لأي مثال أو بند.
- حُذف علم الإيموجي (زوج regional-indicator) من سطر «الدرس القادم: Lesson 43» لأنه ممنوع في المستودع (check-english-direction)؛ النص محفوظ كما ورد.
- رُقّمت الجداول بفاصل « | » داخل الأسطر لتصييرها جداول HTML حقيقية دون تغيير محتواها.
- علامة الاستفهام العربية (؟) في نهاية الجمل الإنجليزية طُبّعت إلى (?) — تطبيع ترقيمي فقط دون تغيير الكلمات.
- لا تبقى في النص المنشور أي علامة استفهام عربية تلحق جملة إنجليزية تنتهي عند نهاية السطر أو يتبعها لاتيني (تحقّق آلي في audit-lesson42.mjs)؛ أما الجمل العربية التي تستشهد بعبارة إنجليزية فتحتفظ بـ(؟) كما في المصدر.
- عبارة الترجمة العربية «هل يمكنك إعادة السؤال؟» مقابل Could you repeat the question؟ محفوظة كما وردت رغم عدم تطابق الضمير.
- نص §39 وقائمة الأسئلة العشرة محفوظان كما وردا؛ الأسئلة تُعرض كاملة قبل بطاقات المحاولة.
- §40 يحتفظ بالأسئلة الـ25 الخمسة مستويات؛ §41 يحتفظ بكل المفاتيح الـ25 وسبب كل مفتاح.
- نموذج §42 الإرشادي ثماني جمل فقط؛ عُرض بوصفه مرجعًا جزئيًا لا إجابة كاملة.
- خريطة §44 تعرض 42/120 كرقم منهج، لا كعدّاد إتقان شخصي.

## Platform-authored additions (not source text)

- غلاف Language Control Lab ولوحة التحكم Subject + CAN/COULD + V1.
- Modal Meaning Lab (12 جملة) وContext Detective (3 جمل × سياقات).
- Sentence Builder (5 جمل) مع كشف أخطاء cans / to / DO / V2 / V-ing.
- Politeness Studio (6 مواقف) وPast Ability vs Specific Success (6 بنود).
- Error Repair Lab (10 أخطاء من §31 مع تشخيص نوع الخطأ).
- Transform Console للنفي والسؤال، وChoice Labs لمحطات القدرة والإجابة القصيرة وأسئلة WH والإمكانية والاقتراح.
- شرح المنصة تحت كل حل مصدر في التدريبات والقراءة.
- عدّاد الجمل في مهمة الكتابة وقائمة التحقق الذاتية العشرة.
- دليل المعلم وسلم تقييم الكتابة ومصفوفة التغطية.
- لوحة الألوان والهوية البصرية لمختبر التحكم باللغة.

## Every normalized source unit

### cover — الدرس 42: CAN & COULD

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s0-u1 | القدرة، والإمكانية، والاستئذان، والطلبات المهذبة |
| s0-u2 | From Ability to Polite Communication 🚀 |
| s0-u3 | رحلة إتقان الإنجليزية — المنهج الشامل 120 درسًا — IQ200 |
| s0-u4 | تخيّل أنك في المدرسة، وتريد أن تقول لصديقك: |
| s0-u5 | «أستطيع حل هذه المسألة». |
| s0-u6 | ثم تريد أن تسأل معلمك: |
| s0-u7 | «هل يمكنني فتح النافذة؟» |
| s0-u8 | وبعد ذلك تطلب من أحد زملائك: |
| s0-u9 | «هل يمكنك مساعدتي من فضلك؟» |
| s0-u10 | وفي نهاية اليوم، تتحدث عن طفولتك وتقول: |
| s0-u11 | «عندما كنت صغيرًا، كنت أستطيع ركوب الدراجة». |
| s0-u12 | هل نحتاج إلى أربعة أفعال مختلفة للتعبير عن هذه المعاني؟ |
| s0-u13 | ليس بالضرورة! |
| s0-u14 | يمكننا استخدام فعلين صغيرين فقط: |
| s0-u15 | CAN & COULD |
| s0-u16 | لكن لا تدع حجمهما يخدعك؛ فهما من أكثر الأفعال استخدامًا في المحادثات الإنجليزية اليومية. |
| s0-u17 | والأجمل أننا بعد الدرس 41 أصبحنا نفهم الأفعال المساعدة، لذلك لن نحفظ CAN وCOULD بطريقة عشوائية. سنكتشف كيف يعملان، ولماذا يتغير معناهما بحسب الموقف. |
| s0-u18 | اليوم سننتقل من مجرد وصف الأحداث إلى التعبير عن قدراتنا، وطلب المساعدة، والاستئذان، والتحدث بلباقة وثقة. |

### s01 — أهداف الدرس

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s1-u1 | بنهاية الدرس ستكون قادرًا على: |
| s1-u2 | ① استخدام Can للتعبير عن القدرة الحالية. |
| s1-u3 | ② استخدام COULD للتعبير عن القدرة العامة في الماضي. |
| s1-u4 | ③ تكوين الإثبات والنفي والسؤال باستخدام CAN وCOULD. |
| s1-u5 | ④ التمييز بين القدرة والإمكانية والاحتمال. |
| s1-u6 | ⑤ طلب الإذن باستخدام Can I...? وCould I...? |
| s1-u7 | ⑥ تقديم طلبات مهذبة باستخدام Can you...? وCould you...? |
| s1-u8 | ⑦ فهم الفرق بين COULD وWAS/WERE ABLE TO. |
| s1-u9 | ⑧ التعبير عن القدرة المستقبلية باستخدام WILL BE ABLE TO. |
| s1-u10 | ⑨ فهم سبب استخدام V1 بعد CAN وCOULD. |
| s1-u11 | ⑩ تطبيق القواعد في حوارات واقعية واختبار نهائي شامل. |

### s02 — ما العلاقة بين درسنا السابق ودرس اليوم؟

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s2-u1 | في الدرس 41 تعلمنا ثلاثة أفعال مساعدة أساسية: |
| s2-u2 | BE — DO — HAVE |
| s2-u3 | وتعلمنا أن الأفعال المساعدة تؤدي وظائف نحوية مختلفة. |
| s2-u4 | اليوم سنتعرف إلى مجموعة جديدة تُسمّى: |
| s2-u5 | Modal Auxiliary Verbs |
| s2-u6 | أي: |
| s2-u7 | الأفعال المساعدة الناقصة. |
| s2-u8 | من أفراد هذه المجموعة: |
| s2-u9 | can |
| s2-u10 | could |
| s2-u11 | may |
| s2-u12 | might |
| s2-u13 | must |
| s2-u14 | should |
| s2-u15 | would |
| s2-u16 | وسنتعلم بقية المجموعة تدريجيًا في الدروس القادمة. |
| s2-u17 | لماذا تُسمّى Modal Verbs? |
| s2-u18 | لأنها تساعدنا على التعبير عن موقف المتحدث تجاه الفعل، مثل: |
| s2-u19 | القدرة. |
| s2-u20 | الاحتمال. |
| s2-u21 | الضرورة. |
| s2-u22 | الإذن. |
| s2-u23 | النصيحة. |
| s2-u24 | الرغبة. |
| s2-u25 | واليوم سنركز على CAN وCOULD. |

### s03 — القاعدة الأساسية للأفعال الناقصة

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s3-u1 | قبل دراسة المعاني، يجب أن نفهم طريقة بناء الجملة. |
| s3-u2 | الصيغة: |
| s3-u3 | Subject + CAN/COULD + V1 |
| s3-u4 | أي: |
| s3-u5 | الفاعل + CAN أو COULD + الفعل بصيغته الأساسية. |
| s3-u6 | أمثلة: |
| s3-u7 | I can swim. |
| s3-u8 | أستطيع السباحة. |
| s3-u9 | She can speak English. |
| s3-u10 | تستطيع التحدث بالإنجليزية. |
| s3-u11 | They could run fast. |
| s3-u12 | كانوا يستطيعون الركض بسرعة. |
| s3-u13 | He could read when he was five. |
| s3-u14 | كان يستطيع القراءة عندما كان عمره خمس سنوات. |
| s3-u15 | القاعدة الذهبية الأولى |
| s3-u16 | بعد CAN وCOULD نستخدم V1 دون إضافة to. |
| s3-u17 | صحيح: |
| s3-u18 | She can swim. ✅ |
| s3-u19 | خطأ: |
| s3-u20 | She can swims. ❌ |
| s3-u21 | She can to swim. ❌ |
| s3-u22 | She can swimming. ❌ |

### s04 — لماذا لا نضيف S بعد CAN?

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s4-u1 | تذكر من Present Simple: |
| s4-u2 | He plays football. |
| s4-u3 | لكن عندما نستخدم CAN نقول: |
| s4-u4 | He can play football. |
| s4-u5 | وليس: |
| s4-u6 | He cans play football. ❌ |
| s4-u7 | ولا: |
| s4-u8 | He can plays football. ❌ |
| s4-u9 | السبب أن CAN فعل ناقص ثابت الصيغة مع جميع الضمائر، والفعل الرئيسي الذي يأتي بعده يبقى بصيغة V1. |
| s4-u10 | قارن |
| s4-u11 | He speaks English. |
| s4-u12 | He can speak English. |
| s4-u13 | She writes stories. |
| s4-u14 | She can write stories. |
| s4-u15 | Omar solves difficult problems. |
| s4-u16 | Omar can solve difficult problems. |
| s4-u17 | لاحظ أن CAN لا تتغير مع الفاعل. |

### s05 — التصريف مع جميع الضمائر

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s5-u1 | الفاعل \| CAN \| COULD |
| s5-u2 | I \| I can swim. \| I could swim. |
| s5-u3 | You \| You can swim. \| You could swim. |
| s5-u4 | He \| He can swim. \| He could swim. |
| s5-u5 | She \| She can swim. \| She could swim. |
| s5-u6 | It \| It can move. \| It could move. |
| s5-u7 | We \| We can swim. \| We could swim. |
| s5-u8 | They \| They can swim. \| They could swim. |
| s5-u9 | لاحظ: |
| s5-u10 | لا يوجد cans. |
| s5-u11 | ولا يوجد coulds. |
| s5-u12 | ولا نستخدم do أو does أو did لبناء السؤال العادي مع CAN أو COULD. |

### s06 — الاستخدام الأول: القدرة الحالية — Present Ability

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s6-u1 | نستخدم CAN عندما نريد التعبير عن قدرة يمتلكها شخص في الحاضر. |
| s6-u2 | مثال: |
| s6-u3 | I can ride a bicycle. |
| s6-u4 | أستطيع ركوب الدراجة. |
| s6-u5 | She can solve difficult puzzles. |
| s6-u6 | تستطيع حل الألغاز الصعبة. |
| s6-u7 | My brother can play the piano. |
| s6-u8 | يستطيع أخي العزف على البيانو. |
| s6-u9 | We can understand this lesson. |
| s6-u10 | نستطيع فهم هذا الدرس. |
| s6-u11 | ماذا تعني القدرة؟ |
| s6-u12 | القدرة قد تكون: |
| s6-u13 | ① قدرة جسدية. |
| s6-u14 | I can run fast. |
| s6-u15 | ② قدرة عقلية. |
| s6-u16 | She can solve complex problems. |
| s6-u17 | ③ مهارة مكتسبة. |
| s6-u18 | He can play chess. |
| s6-u19 | ④ قدرة لغوية. |
| s6-u20 | They can speak three languages. |
| s6-u21 | إذن CAN لا تعني القوة الجسدية فقط. |

### s07 — موقف تطبيقي: The Talent Show

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s7-u1 | تخيل أن المدرسة تنظم عرضًا للمواهب. |
| s7-u2 | تسأل المعلمة الطلاب: |
| s7-u3 | Teacher: What can you do? |
| s7-u4 | Maya: I can sing. |
| s7-u5 | Omar: I can play the guitar. |
| s7-u6 | Daniel: I can perform magic tricks. |
| s7-u7 | Lena: I can draw portraits. |
| s7-u8 | Teacher: Excellent! You all have different talents. |
| s7-u9 | الترجمة |
| s7-u10 | المعلمة: ماذا تستطيعون أن تفعلوا؟ |
| s7-u11 | مايا: أستطيع الغناء. |
| s7-u12 | عمر: أستطيع العزف على الغيتار. |
| s7-u13 | دانيال: أستطيع أداء الخدع السحرية. |
| s7-u14 | لينا: أستطيع رسم الصور الشخصية. |
| s7-u15 | المعلمة: ممتاز! لديكم جميعًا مواهب مختلفة. |
| s7-u16 | سؤال الفهم |
| s7-u17 | لماذا استخدمنا CAN في جميع الإجابات؟ |
| s7-u18 | لأن الطلاب يتحدثون عن مهارات يستطيعون أداءها حاليًا. |

### s08 — النفي باستخدام CAN'T

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s8-u1 | الصيغة: |
| s8-u2 | Subject + cannot + V1 |
| s8-u3 | أو: |
| s8-u4 | Subject + can't + V1 |
| s8-u5 | لاحظ: |
| s8-u6 | cannot تُكتب عادةً كلمة واحدة. |
| s8-u7 | أما can't فهي الاختصار الشائع. |
| s8-u8 | أمثلة: |
| s8-u9 | I can't swim. |
| s8-u10 | لا أستطيع السباحة. |
| s8-u11 | She can't drive a car. |
| s8-u12 | لا تستطيع قيادة السيارة. |
| s8-u13 | They can't understand the instructions. |
| s8-u14 | لا يستطيعون فهم التعليمات. |
| s8-u15 | My little brother can't read yet. |
| s8-u16 | أخي الصغير لا يستطيع القراءة بعد. |
| s8-u17 | فرق مهم |
| s8-u18 | I can't swim. |
| s8-u19 | تعني أنني لا أمتلك القدرة على السباحة، أو لا أستطيع السباحة في السياق المقصود. |
| s8-u20 | لكنها لا تعني بالضرورة أنني لن أتعلم السباحة مستقبلًا. |

### s09 — السؤال باستخدام CAN

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s9-u1 | تذكر قاعدة الدرس 41: |
| s9-u2 | عندما تحتوي الجملة على فعل مساعد، نستخدمه في بناء السؤال. |
| s9-u3 | الإثبات: |
| s9-u4 | You can swim. |
| s9-u5 | السؤال: |
| s9-u6 | Can you swim? |
| s9-u7 | الصيغة: |
| s9-u8 | Can + Subject + V1? |
| s9-u9 | أمثلة: |
| s9-u10 | Can she speak French? |
| s9-u11 | هل تستطيع التحدث بالفرنسية؟ |
| s9-u12 | Can Omar solve this problem? |
| s9-u13 | هل يستطيع عمر حل هذه المسألة؟ |
| s9-u14 | Can they play basketball? |
| s9-u15 | هل يستطيعون لعب كرة السلة؟ |
| s9-u16 | Can your brother cook? |
| s9-u17 | هل يستطيع أخوك الطبخ؟ |
| s9-u18 | انتبه |
| s9-u19 | Do you can swim? ❌ |
| s9-u20 | Can you swim? ✅ |
| s9-u21 | لأن CAN فعل مساعد، ولا نحتاج إلى DO. |

### s10 — الإجابات القصيرة

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s10-u1 | السؤال: |
| s10-u2 | Can you swim? |
| s10-u3 | الإجابات: |
| s10-u4 | Yes, I can. |
| s10-u5 | No, I can't. |
| s10-u6 | السؤال: |
| s10-u7 | Can she speak English? |
| s10-u8 | الإجابات: |
| s10-u9 | Yes, she can. |
| s10-u10 | No, she can't. |
| s10-u11 | السؤال: |
| s10-u12 | Can they help us? |
| s10-u13 | الإجابات: |
| s10-u14 | Yes, they can. |
| s10-u15 | No, they can't. |
| s10-u16 | لا تقل |
| s10-u17 | Yes, I do. ❌ |
| s10-u18 | إذا كان السؤال يبدأ بـ CAN، فإن الإجابة القصيرة المعتادة تستخدم CAN أيضًا. |

### s11 — أسئلة WH مع CAN

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s11-u1 | يمكننا استخدام أدوات السؤال التي تعلمناها سابقًا. |
| s11-u2 | الصيغة العامة: |
| s11-u3 | WH + CAN + Subject + V1? |
| s11-u4 | أمثلة: |
| s11-u5 | What can you do? |
| s11-u6 | ماذا تستطيع أن تفعل؟ |
| s11-u7 | Where can we find this book? |
| s11-u8 | أين يمكننا العثور على هذا الكتاب؟ |
| s11-u9 | How can I improve my English? |
| s11-u10 | كيف أستطيع تحسين لغتي الإنجليزية؟ |
| s11-u11 | When can you visit us? |
| s11-u12 | متى تستطيع زيارتنا؟ |
| s11-u13 | Why can't he join the team? |
| s11-u14 | لماذا لا يستطيع الانضمام إلى الفريق؟ |
| s11-u15 | سؤال خاص بالفاعل |
| s11-u16 | Who can solve this problem? |
| s11-u17 | من يستطيع حل هذه المسألة؟ |
| s11-u18 | لاحظ أننا لا نحتاج إلى إضافة فاعل آخر بعد Who هنا؛ لأن Who نفسها تسأل عن الفاعل. |

### s12 — الاستخدام الأول: القدرة العامة في الماضي

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s12-u1 | نستخدم COULD للتعبير عن قدرة عامة كان الشخص يمتلكها في الماضي. |
| s12-u2 | مثال: |
| s12-u3 | When I was six, I could ride a bicycle. |
| s12-u4 | عندما كان عمري ست سنوات، كنت أستطيع ركوب الدراجة. |
| s12-u5 | My grandfather could run very fast when he was young. |
| s12-u6 | كان جدي يستطيع الركض بسرعة كبيرة عندما كان شابًا. |
| s12-u7 | She could read English books when she was ten. |
| s12-u8 | كانت تستطيع قراءة الكتب الإنجليزية عندما كان عمرها عشر سنوات. |
| s12-u9 | الفرق الأساسي |
| s12-u10 | I can swim. |
| s12-u11 | أستطيع السباحة الآن. |
| s12-u12 | I could swim when I was younger. |
| s12-u13 | كنت أستطيع السباحة عندما كنت أصغر سنًا. |
| s12-u14 | إذن: |
| s12-u15 | CAN = قدرة حالية. |
| s12-u16 | COULD = قدرة عامة في الماضي، في هذا الاستخدام. |
| s12-u17 | لكن انتبه: COULD ليست مخصصة للماضي فقط، وسنكتشف وظائفها الأخرى بعد قليل. |

### s13 — لا تربط COULD بالماضي دائمًا!

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s13-u1 | هذه واحدة من أهم نقاط الدرس. |
| s13-u2 | تأمل: |
| s13-u3 | Could you help me, please? |
| s13-u4 | هل يمكنك مساعدتي من فضلك؟ |
| s13-u5 | هل نتحدث عن الماضي؟ |
| s13-u6 | لا. |
| s13-u7 | نحن نقدم طلبًا مهذبًا في الحاضر. |
| s13-u8 | ومثال آخر: |
| s13-u9 | It could rain tomorrow. |
| s13-u10 | من الممكن أن تمطر غدًا. |
| s13-u11 | هل نتحدث عن الماضي؟ |
| s13-u12 | أيضًا لا. |
| s13-u13 | هنا COULD تعبّر عن احتمال مستقبلي. |
| s13-u14 | إذن: |
| s13-u15 | COULD قد تعبّر عن قدرة ماضية، أو طلب مهذب، أو احتمال، بحسب السياق. |

### s14 — النفي باستخدام COULDN'T

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s14-u1 | الصيغة: |
| s14-u2 | Subject + could not + V1 |
| s14-u3 | الاختصار: |
| s14-u4 | couldn't |
| s14-u5 | أمثلة: |
| s14-u6 | I couldn't swim when I was four. |
| s14-u7 | لم أكن أستطيع السباحة عندما كان عمري أربع سنوات. |
| s14-u8 | She couldn't understand the question. |
| s14-u9 | لم تستطع فهم السؤال. |
| s14-u10 | We couldn't see the mountains because of the fog. |
| s14-u11 | لم نستطيع رؤية الجبال بسبب الضباب. |
| s14-u12 | He couldn't open the door. |
| s14-u13 | لم يستطع فتح الباب. |
| s14-u14 | ملاحظة |
| s14-u15 | COULDN'T يمكن استخدامها أيضًا للتعبير عن عدم القدرة في موقف ماضٍ محدد. |
| s14-u16 | وهذه نقطة ستساعدنا في المقارنة القادمة. |

### s15 — السؤال باستخدام COULD

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s15-u1 | الصيغة: |
| s15-u2 | Could + Subject + V1? |
| s15-u3 | مثال: |
| s15-u4 | Could you swim when you were five? |
| s15-u5 | هل كنت تستطيع السباحة عندما كان عمرك خمس سنوات؟ |
| s15-u6 | Could your grandfather speak English? |
| s15-u7 | هل كان جدك يستطيع التحدث بالإنجليزية؟ |
| s15-u8 | Could she read before she started school? |
| s15-u9 | هل كانت تستطيع القراءة قبل أن تبدأ المدرسة؟ |
| s15-u10 | الإجابات القصيرة: |
| s15-u11 | Yes, I could. |
| s15-u12 | No, I couldn't. |
| s15-u13 | لكن عندما نستخدم COULD لطلب المساعدة، فقد تكون الإجابات الطبيعية مختلفة، كما سنرى لاحقًا. |

### s16 — CAN vs COULD — مقارنة القدرة

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s16-u1 | CAN \| COULD |
| s16-u2 | I can ride a bicycle. \| I could ride a bicycle when I was six. |
| s16-u3 | She can speak French. \| She could speak French when she was younger. |
| s16-u4 | We can solve these problems. \| We could solve similar problems last year. |
| s16-u5 | He can't swim. \| He couldn't swim when he was little. |
| s16-u6 | تحدي سريع |
| s16-u7 | اختر: |
| s16-u8 | ① My sister ______ play the piano now. |
| s16-u9 | ② When I was five, I ______ count to one hundred. |
| s16-u10 | ③ My grandfather ______ use a computer when he was young, but he can use one now. |
| s16-u11 | الحلول: |
| s16-u12 | ① can |
| s16-u13 | ② could |
| s16-u14 | ③ couldn't |

### s17 — الفرق المتقدم الذي يميز الطالب المتمكن

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s17-u1 | تعلمنا أن COULD تعبّر عن القدرة العامة في الماضي. |
| s17-u2 | لكن ماذا لو أردنا الحديث عن نجاح شخص في أداء فعل محدد في موقف ماضٍ واحد؟ |
| s17-u3 | هنا يظهر التعبير: |
| s17-u4 | WAS/WERE ABLE TO |
| s17-u5 | ومعناه: |
| s17-u6 | تمكن من / استطاع. |
| s17-u7 | المثال الأول: قدرة عامة |
| s17-u8 | When Omar was young, he could swim very well. |
| s17-u9 | عندما كان عمر صغيرًا، كان يستطيع السباحة جيدًا. |
| s17-u10 | نحن نتحدث عن مهارة عامة كان يمتلكها. |
| s17-u11 | المثال الثاني: نجاح في موقف محدد |
| s17-u12 | Yesterday, Omar fell into the water, but he was able to swim to the shore. |
| s17-u13 | أمس سقط عمر في الماء، لكنه تمكن من السباحة إلى الشاطئ. |
| s17-u14 | هنا نركز على نجاحه في أداء فعل محدد. |
| s17-u15 | القاعدة التعليمية |
| s17-u16 | COULD: مناسبة للتعبير عن القدرة العامة في الماضي. |
| s17-u17 | WAS/WERE ABLE TO: مناسبة للتعبير عن النجاح في موقف ماضٍ محدد. |
| s17-u18 | وفي الجمل المثبتة، يُفضَّل عادةً استخدام was/were able to أو managed to عندما نريد إبراز نجاح حدث واحد محدد. |

### s18 — أمثلة إضافية على الفرق

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s18-u1 | ① My father could speak three languages when he was young. |
| s18-u2 | كان والدي يستطيع التحدث بثلاث لغات عندما كان شابًا. |
| s18-u3 | قدرة عامة. |
| s18-u4 | ② Although the exam was difficult, Maya was able to answer every question. |
| s18-u5 | رغم صعوبة الامتحان، تمكنت مايا من الإجابة عن جميع الأسئلة. |
| s18-u6 | نجاح في موقف محدد. |
| s18-u7 | ③ The door was stuck, but Daniel managed to open it. |
| s18-u8 | كان الباب عالقًا، لكن دانيال نجح في فتحه. |
| s18-u9 | نجاح في موقف محدد. |
| s18-u10 | ماذا عن النفي؟ |
| s18-u11 | يمكننا استخدام couldn't للتعبير عن عدم القدرة في موقف ماضٍ محدد. |
| s18-u12 | مثال: |
| s18-u13 | I couldn't open the window yesterday. |
| s18-u14 | لم أستطع فتح النافذة أمس. |
| s18-u15 | هذه جملة طبيعية وصحيحة. |
| s18-u16 | إذن لا نطبق الفرق بصورة آلية على جميع الجمل المثبتة والمنفية. |

### s19 — كيف نعبر عن القدرة في المستقبل؟

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s19-u1 | إذا أردنا التعبير عن قدرة سنمتلكها مستقبلًا، فيمكننا استخدام: |
| s19-u2 | WILL BE ABLE TO + V1 |
| s19-u3 | مثال: |
| s19-u4 | After this course, I will be able to communicate more confidently. |
| s19-u5 | بعد هذه الدورة، سأكون قادرًا على التواصل بثقة أكبر. |
| s19-u6 | She will be able to drive when she gets her licence. |
| s19-u7 | ستكون قادرة على قيادة السيارة عندما تحصل على رخصتها. |
| s19-u8 | We will be able to finish the project next week. |
| s19-u9 | سنتمكن من إنهاء المشروع الأسبوع القادم. |
| s19-u10 | انتبه |
| s19-u11 | I will can swim. ❌ |
| s19-u12 | I will be able to swim. ✅ |
| s19-u13 | لا نجمع WILL وCAN مباشرة بهذه الطريقة؛ لأنهما فعلان ناقصان من المجموعة نفسها. |
| s19-u14 | خريطة القدرة |
| s19-u15 | الزمن \| مثال |
| s19-u16 | الحاضر \| I can swim. |
| s19-u17 | الماضي العام \| I could swim when I was young. |
| s19-u18 | النجاح في موقف ماضٍ محدد \| I was able to finish the race. |
| s19-u19 | المستقبل \| I will be able to swim. |

### s20 — طلب الإذن — Asking for Permission

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s20-u1 | تخيّل أنك داخل الصف وتريد فتح النافذة. |
| s20-u2 | يمكنك أن تسأل: |
| s20-u3 | Can I open the window? |
| s20-u4 | هل يمكنني فتح النافذة؟ |
| s20-u5 | ويمكنك أيضًا أن تقول: |
| s20-u6 | Could I open the window, please? |
| s20-u7 | هل يمكنني فتح النافذة من فضلك؟ |
| s20-u8 | الجملتان صحيحتان. |
| s20-u9 | لكن الثانية تبدو عادةً أكثر لطفًا وتهذيبًا. |
| s20-u10 | أمثلة |
| s20-u11 | Can I use your pen? |
| s20-u12 | هل يمكنني استخدام قلمك؟ |
| s20-u13 | Could I borrow your dictionary, please? |
| s20-u14 | هل يمكنني استعارة قاموسك من فضلك؟ |
| s20-u15 | Can we leave early today? |
| s20-u16 | هل يمكننا المغادرة مبكرًا اليوم؟ |
| s20-u17 | Could I ask you a question? |
| s20-u18 | هل يمكنني أن أطرح عليك سؤالًا؟ |
| s20-u19 | الفرق الأساسي |
| s20-u20 | Can I...? = طلب إذن مباشر وطبيعي. |
| s20-u21 | Could I...? = طلب إذن أكثر لطفًا أو تحفظًا عادةً. |

### s21 — حوار تطبيقي: In the Classroom

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s21-u1 | Student: Excuse me, could I ask a question? |
| s21-u2 | Teacher: Of course. Go ahead. |
| s21-u3 | Student: Can I use a calculator for this exercise? |
| s21-u4 | Teacher: Not for this one. I want you to practise the calculation yourself. |
| s21-u5 | Student: All right. Could I borrow a pencil, then? |
| s21-u6 | Teacher: Certainly. Here you are. |
| s21-u7 | الترجمة |
| s21-u8 | الطالب: عذرًا، هل يمكنني طرح سؤال؟ |
| s21-u9 | المعلم: بالتأكيد، تفضل. |
| s21-u10 | الطالب: هل يمكنني استخدام الآلة الحاسبة في هذا التمرين؟ |
| s21-u11 | المعلم: ليس في هذا التمرين. أريدك أن تتدرب على الحساب بنفسك. |
| s21-u12 | الطالب: حسنًا. هل يمكنني استعارة قلم رصاص إذن؟ |
| s21-u13 | المعلم: بالتأكيد، تفضل. |
| s21-u14 | ملاحظة مهمة |
| s21-u15 | عندما تسأل: |
| s21-u16 | Could I borrow your pencil? |
| s21-u17 | فأنت لا تسأل عن قدرتك الجسدية على حمل القلم! |
| s21-u18 | بل تطلب الإذن باستعارته. |
| s21-u19 | المعنى يحدده السياق. |

### s22 — تقديم الطلبات — Making Requests

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s22-u1 | هذه من أكثر وظائف CAN وCOULD أهمية في المحادثات اليومية. |
| s22-u2 | قارن: |
| s22-u3 | Can you close the door? |
| s22-u4 | هل يمكنك إغلاق الباب؟ |
| s22-u5 | Could you close the door, please? |
| s22-u6 | هل يمكنك إغلاق الباب من فضلك؟ |
| s22-u7 | الجملتان قد تكونان طلبًا. |
| s22-u8 | لكن Could you...? تُستخدم غالبًا لصياغة طلب أكثر لطفًا. |
| s22-u9 | أمثلة حياتية |
| s22-u10 | Can you help me with this exercise? |
| s22-u11 | هل يمكنك مساعدتي في هذا التمرين؟ |
| s22-u12 | Could you speak more slowly, please? |
| s22-u13 | هل يمكنك التحدث ببطء أكثر من فضلك؟ |
| s22-u14 | Could you repeat the question? |
| s22-u15 | هل يمكنك إعادة السؤال؟ |
| s22-u16 | Can you send me the file? |
| s22-u17 | هل يمكنك إرسال الملف إليّ؟ |
| s22-u18 | Could you show me how this works? |
| s22-u19 | هل يمكنك أن تريني كيف يعمل هذا؟ |

### s23 — هل COULD تعني الماضي في الطلبات؟

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s23-u1 | لا. |
| s23-u2 | في الجملة: |
| s23-u3 | Could you help me now? |
| s23-u4 | الطلب يتعلق بالحاضر. |
| s23-u5 | استخدام COULD هنا يجعل السؤال أقل مباشرة عادةً. |
| s23-u6 | إذن لا تترجم COULD دائمًا إلى: |
| s23-u7 | كان يستطيع. |
| s23-u8 | بل اسأل نفسك: |
| s23-u9 | هل المتحدث يتحدث عن قدرة ماضية؟ |
| s23-u10 | أم يقدم طلبًا مهذبًا؟ |
| s23-u11 | قارن |
| s23-u12 | Could you swim when you were six? |
| s23-u13 | قدرة في الماضي. |
| s23-u14 | Could you open the window, please? |
| s23-u15 | طلب مهذب في الحاضر. |

### s24 — كيف نجيب عن الطلبات بصورة طبيعية؟

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s24-u1 | إذا سألك شخص: |
| s24-u2 | Could you help me, please? |
| s24-u3 | يمكنك الإجابة: |
| s24-u4 | Of course! |
| s24-u5 | بالتأكيد! |
| s24-u6 | Certainly! |
| s24-u7 | بكل تأكيد! |
| s24-u8 | Sure! |
| s24-u9 | طبعًا! |
| s24-u10 | No problem. |
| s24-u11 | لا مشكلة. |
| s24-u12 | I'm sorry, but I can't right now. |
| s24-u13 | آسف، لكن لا أستطيع الآن. |
| s24-u14 | انتبه إلى فرق مهم |
| s24-u15 | إذا كان السؤال عن قدرة ماضية: |
| s24-u16 | Could you swim when you were five? |
| s24-u17 | فالإجابة القصيرة: |
| s24-u18 | Yes, I could. |
| s24-u19 | أما إذا كان السؤال طلبًا حاليًا: |
| s24-u20 | Could you help me? |
| s24-u21 | فالإجابة الطبيعية قد تكون: |
| s24-u22 | Of course! |
| s24-u23 | أو: |
| s24-u24 | Sure! |
| s24-u25 | وليس من الضروري أن تكون: |
| s24-u26 | Yes, I could. |
| s24-u27 | لأننا هنا نجيب عن طلب، لا عن سؤال تاريخي حول قدرتنا الماضية. |

### s25 — حوار تطبيقي: At the Library

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s25-u1 | Lena: Excuse me, could you help me find a book? |
| s25-u2 | Librarian: Of course. What kind of book are you looking for? |
| s25-u3 | Lena: I'm looking for a book about space exploration. |
| s25-u4 | Librarian: Certainly. Could you follow me, please? |
| s25-u5 | Lena: Sure. Can I borrow two books at the same time? |
| s25-u6 | Librarian: Yes, you can. |
| s25-u7 | Lena: Great! Could I keep them for two weeks? |
| s25-u8 | Librarian: Yes, that's fine. |
| s25-u9 | تحليل الحوار |
| s25-u10 | Could you help me...? = طلب مساعدة مهذب. |
| s25-u11 | Could you follow me...? = طلب مهذب. |
| s25-u12 | Can I borrow...? = طلب إذن. |
| s25-u13 | Could I keep...? = طلب إذن مهذب. |
| s25-u14 | لاحظ أننا استخدمنا CAN وCOULD للتواصل الحقيقي، وليس للتحدث عن القدرة فقط. |

### s26 — CAN للتعبير عن الإمكانية العامة

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s26-u1 | أحيانًا لا نستخدم CAN بمعنى أن شخصًا يمتلك مهارة معينة. |
| s26-u2 | بل للتعبير عن شيء يمكن أن يحدث عمومًا. |
| s26-u3 | مثال: |
| s26-u4 | Learning a new language can be challenging. |
| s26-u5 | تعلم لغة جديدة قد يكون صعبًا. |
| s26-u6 | The weather can change quickly in the mountains. |
| s26-u7 | يمكن أن يتغير الطقس بسرعة في الجبال. |
| s26-u8 | Too much noise can make studying difficult. |
| s26-u9 | قد تجعل الضوضاء الكثيفة الدراسة صعبة. |
| s26-u10 | التحليل |
| s26-u11 | The weather can change quickly. |
| s26-u12 | لا نتحدث عن مهارة يمتلكها الطقس! |
| s26-u13 | بل عن إمكانية عامة. |
| s26-u14 | إذن CAN قد تعبّر عن: |
| s26-u15 | General Possibility — الإمكانية العامة. |

### s27 — COULD للتعبير عن الاحتمال

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s27-u1 | نستخدم COULD أيضًا عندما نريد القول إن شيئًا ما محتمل الحدوث. |
| s27-u2 | مثال: |
| s27-u3 | It could rain tomorrow. |
| s27-u4 | من الممكن أن تمطر غدًا. |
| s27-u5 | This plan could work. |
| s27-u6 | قد تنجح هذه الخطة. |
| s27-u7 | We could face some difficulties. |
| s27-u8 | قد نواجه بعض الصعوبات. |
| s27-u9 | She could be at the library. |
| s27-u10 | ربما تكون في المكتبة. |
| s27-u11 | هل COULD هنا تعني أن الأمر سيحدث بالتأكيد؟ |
| s27-u12 | لا. |
| s27-u13 | إنها تعبّر عن احتمال، لا عن حقيقة مؤكدة. |
| s27-u14 | وسنوسّع هذه الفكرة في الدرس 43 عندما نتعلم: |
| s27-u15 | MAY & MIGHT. |

### s28 — CAN vs COULD في الإمكانية

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s28-u1 | قارن: |
| s28-u2 | Accidents can happen. |
| s28-u3 | يمكن أن تقع الحوادث. |
| s28-u4 | هنا نتحدث عن إمكانية عامة. |
| s28-u5 | أما: |
| s28-u6 | An accident could happen if we aren't careful. |
| s28-u7 | قد يقع حادث إذا لم نكن حذرين. |
| s28-u8 | هنا نتحدث عن احتمال في موقف محدد. |
| s28-u9 | مثال آخر |
| s28-u10 | Computers can make mistakes. |
| s28-u11 | يمكن للحواسيب أن ترتكب أخطاء. |
| s28-u12 | This computer could make a mistake if the data is incorrect. |
| s28-u13 | قد يرتكب هذا الحاسوب خطأ إذا كانت البيانات غير صحيحة. |
| s28-u14 | قاعدة مفيدة: CAN شائعة في الإمكانية العامة، بينما COULD يمكن أن تعبّر عن احتمال في موقف معين. لكن الاستخدام الحقيقي أوسع من مجرد تقسيم جامد بين الكلمتين. |

### s29 — COULD لتقديم الاقتراحات

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s29-u1 | هناك استخدام جميل آخر لـ COULD. |
| s29-u2 | عندما تريد اقتراح فكرة على شخص، يمكنك أن تقول: |
| s29-u3 | We could visit the museum tomorrow. |
| s29-u4 | يمكننا زيارة المتحف غدًا. |
| s29-u5 | You could try a different method. |
| s29-u6 | يمكنك تجربة طريقة مختلفة. |
| s29-u7 | We could work together on the project. |
| s29-u8 | يمكننا العمل معًا على المشروع. |
| s29-u9 | الفرق في المعنى |
| s29-u10 | We can visit the museum tomorrow. |
| s29-u11 | الزيارة ممكنة أو متاحة. |
| s29-u12 | We could visit the museum tomorrow. |
| s29-u13 | نطرح الزيارة بوصفها اقتراحًا ممكنًا. |
| s29-u14 | حوار قصير |
| s29-u15 | Maya: I'm bored. What should we do? |
| s29-u16 | Omar: We could play chess. |
| s29-u17 | Maya: Good idea! Or we could watch a science documentary. |
| s29-u18 | Omar: Let's do both! |
| s29-u19 | لاحظ أن COULD هنا لا تشير إلى الماضي، بل إلى اقتراحات حاضرة أو مستقبلية. |

### s30 — الفرق بين CAN وBE ABLE TO

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s30-u1 | في كثير من السياقات، يمكن استخدام CAN وBE ABLE TO للتعبير عن القدرة. |
| s30-u2 | مثال: |
| s30-u3 | I can speak English. |
| s30-u4 | I am able to speak English. |
| s30-u5 | كلتاهما صحيحتان. |
| s30-u6 | لكن CAN أكثر شيوعًا وبساطة في المحادثة اليومية للتعبير عن القدرة العامة. |
| s30-u7 | أما BE ABLE TO فمفيدة جدًا عندما نحتاج إلى تركيب زمني لا نستطيع بناءه باستخدام CAN مباشرة. |
| s30-u8 | مثل: |
| s30-u9 | I will be able to drive next year. |
| s30-u10 | I have been able to solve more difficult problems recently. |
| s30-u11 | لماذا لا نقول؟ |
| s30-u12 | I will can drive. ❌ |
| s30-u13 | I have canned solve... ❌ |
| s30-u14 | لأن CAN لا تُصرَّف كفعل عادي ولا تأتي مباشرة بعد WILL بهذه الطريقة. |

### s31 — الأخطاء العشرة الأكثر شيوعًا

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s31-u1 | ① She cans swim. ❌ |
| s31-u2 | She can swim. ✅ |
| s31-u3 | ② He can speaks English. ❌ |
| s31-u4 | He can speak English. ✅ |
| s31-u5 | ③ I can to play chess. ❌ |
| s31-u6 | I can play chess. ✅ |
| s31-u7 | ④ Do you can drive? ❌ |
| s31-u8 | Can you drive? ✅ |
| s31-u9 | ⑤ She doesn't can swim. ❌ |
| s31-u10 | She can't swim. ✅ |
| s31-u11 | ⑥ He could played football. ❌ |
| s31-u12 | He could play football. ✅ |
| s31-u13 | ⑦ I will can speak English. ❌ |
| s31-u14 | I will be able to speak English. ✅ |
| s31-u15 | ⑧ Could you to help me? ❌ |
| s31-u16 | Could you help me? ✅ |
| s31-u17 | ⑨ She couldn't understands the lesson. ❌ |
| s31-u18 | She couldn't understand the lesson. ✅ |
| s31-u19 | ⑩ Can she swimming? ❌ |
| s31-u20 | Can she swim? ✅ |
| s31-u21 | القاعدة التي تمنع معظم هذه الأخطاء |
| s31-u22 | CAN/COULD + V1 |
| s31-u23 | السؤال: |
| s31-u24 | CAN/COULD + Subject + V1? |
| s31-u25 | النفي: |
| s31-u26 | Subject + CAN'T/COULDN'T + V1 |

### s32 — مختبر المعاني: جملة واحدة قد تحمل أكثر من وظيفة

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s32-u1 | تأمل: |
| s32-u2 | Can you open the door? |
| s32-u3 | قد تعني: |
| s32-u4 | هل تستطيع فتح الباب؟ |
| s32-u5 | إذا كان الباب ثقيلًا ونريد معرفة قدرة الشخص. |
| s32-u6 | وقد تعني: |
| s32-u7 | هل يمكنك فتح الباب؟ |
| s32-u8 | إذا كنا نطلب منه فتحه. |
| s32-u9 | إذن كيف نحدد المعنى؟ |
| s32-u10 | من السياق. |
| s32-u11 | مثال ثانٍ |
| s32-u12 | Could you swim? |
| s32-u13 | قد تكون سؤالًا عن قدرة ماضية إذا كنا نتحدث عن الطفولة. |
| s32-u14 | لكن إذا قلنا: |
| s32-u15 | Could you swim across this river if necessary? |
| s32-u16 | فقد نكون نسأل عن قدرة افتراضية. |
| s32-u17 | اللغة ليست مجموعة كلمات دالة فقط؛ إنها معنى وسياق وموقف. |

### s33 — الحوار الشامل: The School Adventure

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s33-u1 | اقرأ الحوار التالي وحاول تحديد وظيفة كل استخدام لـ CAN وCOULD. |
| s33-u2 | Teacher: We're planning a school adventure next month. What activities can you do? |
| s33-u3 | Maya: I can ride a bicycle, but I can't swim very well. |
| s33-u4 | Omar: I can swim. I learned when I was six. |
| s33-u5 | Daniel: When I was younger, I couldn't ride a bicycle, but now I can. |
| s33-u6 | Teacher: Excellent. Could someone help me prepare the equipment list? |
| s33-u7 | Maya: Of course! I can help. |
| s33-u8 | Omar: We could divide the tasks between us. |
| s33-u9 | Teacher: That's a good suggestion. |
| s33-u10 | Daniel: Could I bring my camera? |
| s33-u11 | Teacher: Yes, you can. |
| s33-u12 | Maya: Do you think it could rain on the day of the trip? |
| s33-u13 | Teacher: It could, so we'll check the weather before we leave. |
| s33-u14 | تحليل الاستخدامات |
| s33-u15 | I can ride a bicycle = قدرة حالية. |
| s33-u16 | I can't swim very well = عدم امتلاك قدرة كافية. |
| s33-u17 | I couldn't ride a bicycle = عدم القدرة في الماضي. |
| s33-u18 | Could someone help me...? = طلب مهذب. |
| s33-u19 | We could divide the tasks = اقتراح. |
| s33-u20 | Could I bring my camera? = طلب إذن. |
| s33-u21 | It could rain = احتمال. |
| s33-u22 | لاحظ أننا استخدمنا الفعلين نفسيهما للتعبير عن معانٍ متعددة داخل حوار طبيعي واحد. |

### s34 — التدريب الأول: اختر CAN أو COULD

Destination: **PracticeSet42**. Answer/explanation destination: **Attempt-bound PracticeCard42 + TeacherGuide42**.

| Unit | Source content |
|---|---|
| s34-u1 | أكمل الجمل باستخدام CAN أو COULD بحسب السياق. |
| s34-u2 | ① My sister ______ speak English very well now. |
| s34-u3 | ② When I was seven, I ______ ride a bicycle. |
| s34-u4 | ③ ______ you help me with this exercise, please? |
| s34-u5 | ④ It ______ rain tomorrow. |
| s34-u6 | ⑤ We ______ visit the science museum next weekend. إنها فكرة نقترحها. |
| s34-u7 | ⑥ My grandfather ______ run very fast when he was young. |
| s34-u8 | ⑦ ______ I use your dictionary, please? |
| s34-u9 | ⑧ This machine ______ process large amounts of information. |
| s34-u10 | الحلول |
| s34-u11 | ① can — قدرة حالية. |
| s34-u12 | ② could — قدرة عامة في الماضي. |
| s34-u13 | ③ Could — طلب مهذب. |
| s34-u14 | ④ could — احتمال مستقبلي. |
| s34-u15 | ⑤ could — اقتراح. |
| s34-u16 | ⑥ could — قدرة عامة في الماضي. |
| s34-u17 | ⑦ Could — طلب إذن مهذب. ويمكن استخدام Can أيضًا. |
| s34-u18 | ⑧ can — قدرة أو إمكانية عامة. |

### s35 — التدريب الثاني: حوّل إلى النفي

Destination: **PracticeSet42**. Answer/explanation destination: **Attempt-bound PracticeCard42 + TeacherGuide42**.

| Unit | Source content |
|---|---|
| s35-u1 | ① She can drive a car. |
| s35-u2 | ② They can understand the instructions. |
| s35-u3 | ③ He could swim when he was five. |
| s35-u4 | ④ We can finish the project today. |
| s35-u5 | ⑤ Maya could read English books when she was younger. |
| s35-u6 | الحلول |
| s35-u7 | ① She can't drive a car. |
| s35-u8 | ② They can't understand the instructions. |
| s35-u9 | ③ He couldn't swim when he was five. |
| s35-u10 | ④ We can't finish the project today. |
| s35-u11 | ⑤ Maya couldn't read English books when she was younger. |

### s36 — التدريب الثالث: حوّل إلى السؤال

Destination: **PracticeSet42**. Answer/explanation destination: **Attempt-bound PracticeCard42 + TeacherGuide42**.

| Unit | Source content |
|---|---|
| s36-u1 | ① You can speak French. |
| s36-u2 | ② She can play the piano. |
| s36-u3 | ③ They could swim when they were young. |
| s36-u4 | ④ Omar can solve this problem. |
| s36-u5 | ⑤ Your grandfather could speak three languages. |
| s36-u6 | الحلول |
| s36-u7 | ① Can you speak French? |
| s36-u8 | ② Can she play the piano? |
| s36-u9 | ③ Could they swim when they were young? |
| s36-u10 | ④ Can Omar solve this problem? |
| s36-u11 | ⑤ Could your grandfather speak three languages? |

### s37 — التدريب الرابع: COULD أم WAS/WERE ABLE TO?

Destination: **PracticeSet42**. Answer/explanation destination: **Attempt-bound PracticeCard42 + TeacherGuide42**.

| Unit | Source content |
|---|---|
| s37-u1 | اختر الصيغة الأنسب بحسب المعنى المطلوب. |
| s37-u2 | ① When she was young, Maya ______ speak two languages. |
| s37-u3 | A. could |
| s37-u4 | B. was able to |
| s37-u5 | المطلوب: التعبير الطبيعي عن قدرة عامة في الماضي. |
| s37-u6 | ② The exam was difficult, but Omar ______ answer every question. |
| s37-u7 | A. could |
| s37-u8 | B. was able to |
| s37-u9 | المطلوب: إبراز النجاح في موقف محدد. |
| s37-u10 | ③ My grandfather ______ play the piano when he was a child. |
| s37-u11 | A. could |
| s37-u12 | B. was able to |
| s37-u13 | المطلوب: التعبير الطبيعي عن مهارة عامة في الماضي. |
| s37-u14 | ④ The door was locked, but the firefighters ______ open it. |
| s37-u15 | A. could |
| s37-u16 | B. were able to |
| s37-u17 | المطلوب: إبراز النجاح في موقف محدد. |
| s37-u18 | ⑤ I ______ understand the question yesterday, so I asked the teacher for help. |
| s37-u19 | A. couldn't |
| s37-u20 | B. wasn't able to |
| s37-u21 | هل يمكن استخدام الصيغتين؟ |
| s37-u22 | الحلول |
| s37-u23 | ① A — could. |
| s37-u24 | ② B — was able to. |
| s37-u25 | ③ A — could. |
| s37-u26 | ④ B — were able to. |
| s37-u27 | ⑤ نعم، كلتا الصيغتين صحيحتان. |
| s37-u28 | I couldn't understand the question yesterday. |
| s37-u29 | I wasn't able to understand the question yesterday. |

### s38 — Grammar Detective — اكتشف الأخطاء

Destination: **PracticeSet42**. Answer/explanation destination: **Attempt-bound PracticeCard42 + TeacherGuide42**.

| Unit | Source content |
|---|---|
| s38-u1 | صحح الجمل التالية: |
| s38-u2 | ① She cans play tennis. |
| s38-u3 | ② He can speaks three languages. |
| s38-u4 | ③ Do you can swim? |
| s38-u5 | ④ I can to help you. |
| s38-u6 | ⑤ When I was six, I could rode a bicycle. |
| s38-u7 | ⑥ She doesn't can understand the lesson. |
| s38-u8 | ⑦ I will can drive next year. |
| s38-u9 | ⑧ Could you to open the window? |
| s38-u10 | ⑨ He couldn't understood the instructions. |
| s38-u11 | ⑩ Can she playing the guitar? |
| s38-u12 | الحلول المفصلة |
| s38-u13 | ① She can play tennis. |
| s38-u14 | ② He can speak three languages. |
| s38-u15 | ③ Can you swim? |
| s38-u16 | ④ I can help you. |
| s38-u17 | ⑤ When I was six, I could ride a bicycle. |
| s38-u18 | ⑥ She can't understand the lesson. |
| s38-u19 | ⑦ I will be able to drive next year. |
| s38-u20 | ⑧ Could you open the window? |
| s38-u21 | ⑨ He couldn't understand the instructions. |
| s38-u22 | ⑩ Can she play the guitar? |

### s39 — Reading Challenge — A New Skill

Destination: **ReadingChallenge42 + PracticeSet42**. Answer/explanation destination: **Attempt-bound PracticeCard42 + TeacherGuide42**.

| Unit | Source content |
|---|---|
| s39-u1 | The Young Inventor |
| s39-u2 | Daniel is thirteen years old, and he loves science. |
| s39-u3 | When he was younger, he couldn't understand how electronic devices worked. |
| s39-u4 | However, he was always curious. |
| s39-u5 | At the age of ten, he could build simple models using paper, cardboard, and small motors. |
| s39-u6 | Now he can design basic electronic circuits, and he can explain how they work. |
| s39-u7 | Last month, he entered a school competition. |
| s39-u8 | One of the parts of his robot stopped working during the final test. |
| s39-u9 | Daniel was worried, but he was able to repair it before the judges arrived. |
| s39-u10 | His teacher said: |
| s39-u11 | "You've made excellent progress. Next year, you'll be able to work on even more advanced projects." |
| s39-u12 | Daniel smiled and replied: |
| s39-u13 | "Thank you! Could I show my robot to the younger students tomorrow?" |
| s39-u14 | His teacher answered: |
| s39-u15 | "Of course. That could inspire them to learn more about science." |
| s39-u16 | أسئلة الفهم |
| s39-u17 | ① How old is Daniel? |
| s39-u18 | ② What couldn't he understand when he was younger? |
| s39-u19 | ③ What could he build at the age of ten? |
| s39-u20 | ④ What can he design now? |
| s39-u21 | ⑤ What happened during the final test? |
| s39-u22 | ⑥ Was Daniel able to repair the robot? |
| s39-u23 | ⑦ Why did the writer use was able to instead of could in the repair sentence? |
| s39-u24 | ⑧ What will Daniel be able to do next year? |
| s39-u25 | ⑨ What does Could I show my robot...? express? |
| s39-u26 | ⑩ What does That could inspire them express? |
| s39-u27 | الحلول |
| s39-u28 | ① He is thirteen years old. |
| s39-u29 | ② He couldn't understand how electronic devices worked. |
| s39-u30 | ③ He could build simple models. |
| s39-u31 | ④ He can design basic electronic circuits. |
| s39-u32 | ⑤ One part of his robot stopped working. |
| s39-u33 | ⑥ Yes, he was. |
| s39-u34 | ⑦ Because the sentence highlights success in a specific past situation. |
| s39-u35 | ⑧ He will be able to work on more advanced projects. |
| s39-u36 | ⑨ A polite request for permission. |
| s39-u37 | ⑩ Possibility. |

### s40 — الاختبار النهائي — CAN & COULD Master Test

Destination: **TestArea42**. Answer/explanation destination: **Lazy SolutionsArea42 + TeacherGuide42**.

| Unit | Source content |
|---|---|
| s40-u1 | 25 سؤالًا — خمسة مستويات — اختبار شامل |
| s40-u2 | حاول حل الاختبار كاملًا قبل مراجعة مساحة المعلم. |
| s40-u3 | المستوى الأول: اختر الإجابة الصحيحة |
| s40-u4 | ① She ______ speak English very well now. |
| s40-u5 | A. can |
| s40-u6 | B. cans |
| s40-u7 | C. coulds |
| s40-u8 | ② When I was five, I ______ ride a bicycle. |
| s40-u9 | A. can |
| s40-u10 | B. could |
| s40-u11 | C. will can |
| s40-u12 | ③ ______ you help me, please? |
| s40-u13 | A. Do can |
| s40-u14 | B. Could |
| s40-u15 | C. Does |
| s40-u16 | ④ I ______ swim when I was little, but I can swim now. |
| s40-u17 | A. couldn't |
| s40-u18 | B. can't |
| s40-u19 | C. don't can |
| s40-u20 | ⑤ After more practice, I will ______ solve these problems. |
| s40-u21 | A. can |
| s40-u22 | B. be able to |
| s40-u23 | C. could |
| s40-u24 | المستوى الثاني: أكمل الجمل |
| s40-u25 | ⑥ She ______ (can / not) drive a car. |
| s40-u26 | ⑦ ______ you ______ (can / play) the piano? |
| s40-u27 | ⑧ When my father was young, he ______ (can) run very fast. |
| s40-u28 | ⑨ The task was difficult, but we ______ (be able to) finish it yesterday. |
| s40-u29 | ⑩ Next year, I ______ (be able to) speak English more confidently. |
| s40-u30 | المستوى الثالث: صحح الأخطاء |
| s40-u31 | ⑪ He cans swim very well. |
| s40-u32 | ⑫ Do you can help me? |
| s40-u33 | ⑬ She could played the piano when she was young. |
| s40-u34 | ⑭ I will can finish the project tomorrow. |
| s40-u35 | ⑮ Could you to repeat the question? |
| s40-u36 | المستوى الرابع: فهم المعنى |
| s40-u37 | ⑯ ما الفرق بين: |
| s40-u38 | I can swim. |
| s40-u39 | I could swim when I was six. |
| s40-u40 | ⑰ ما وظيفة COULD في الجملة: |
| s40-u41 | Could you open the door, please? |
| s40-u42 | ⑱ ما وظيفة COULD في الجملة: |
| s40-u43 | It could rain tomorrow. |
| s40-u44 | ⑲ لماذا نستخدم was able to غالبًا في الجملة التالية؟ |
| s40-u45 | Although the problem was difficult, she was able to solve it. |
| s40-u46 | ⑳ هل يمكن أن تعني Can you open the door؟ القدرة أو الطلب بحسب السياق؟ اشرح. |
| s40-u47 | المستوى الخامس: Final IQ200 Boss |
| s40-u48 | أكمل الحوار باستخدام التعبير المناسب. |
| s40-u49 | The School Technology Club |
| s40-u50 | Maya: ______ you design a simple robot? |
| s40-u51 | Omar: Yes, I can. But when I was younger, I ______ understand electronic circuits. |
| s40-u52 | Maya: Interesting! ______ you help me build a small robot, please? |
| s40-u53 | Omar: Of course. We ______ work together after school. That's one idea. |
| s40-u54 | Maya: Great! After a few months of practice, I think I ______ build more advanced robots. |
| s40-u55 | الأسئلة: |
| s40-u56 | ㉑ السؤال الأول عن القدرة الحالية. |
| s40-u57 | ㉒ عدم القدرة في الماضي. |
| s40-u58 | ㉓ طلب المساعدة بصورة مهذبة. |
| s40-u59 | ㉔ تقديم اقتراح. |
| s40-u60 | ㉕ التعبير عن قدرة مستقبلية. |

### s41 — مساحة المعلم — الحلول التفصيلية للاختبار النهائي

Destination: **TeacherArea42 / SolutionsArea42**. Answer/explanation destination: **Lazy SolutionsArea42 + TeacherGuide42**.

| Unit | Source content |
|---|---|
| s41-u1 | مفتاح تصحيح الدرس 42 |
| s41-u2 | يُفضّل عدم عرض هذا القسم للطالب إلا بعد الانتهاء من الاختبار. |
| s41-u3 | حلول المستوى الأول |
| s41-u4 | ① A — can. |
| s41-u5 | السبب: التعبير عن القدرة الحالية. |
| s41-u6 | ② B — could. |
| s41-u7 | السبب: قدرة عامة في الماضي. |
| s41-u8 | ③ B — Could. |
| s41-u9 | السبب: طلب مهذب. |
| s41-u10 | ④ A — couldn't. |
| s41-u11 | السبب: عدم القدرة في الماضي. |
| s41-u12 | ⑤ B — be able to. |
| s41-u13 | السبب: بعد will نستخدم be able to للتعبير عن القدرة المستقبلية. |
| s41-u14 | حلول المستوى الثاني |
| s41-u15 | ⑥ can't. |
| s41-u16 | She can't drive a car. |
| s41-u17 | ⑦ Can you play. |
| s41-u18 | Can you play the piano? |
| s41-u19 | ⑧ could. |
| s41-u20 | When my father was young, he could run very fast. |
| s41-u21 | ⑨ were able to. |
| s41-u22 | The task was difficult, but we were able to finish it yesterday. |
| s41-u23 | السبب: نجاح في موقف ماضٍ محدد. |
| s41-u24 | ⑩ will be able to. |
| s41-u25 | Next year, I will be able to speak English more confidently. |
| s41-u26 | حلول المستوى الثالث |
| s41-u27 | ⑪ He can swim very well. |
| s41-u28 | ⑫ Can you help me? |
| s41-u29 | ⑬ She could play the piano when she was young. |
| s41-u30 | ⑭ I will be able to finish the project tomorrow. |
| s41-u31 | ⑮ Could you repeat the question? |
| s41-u32 | حلول المستوى الرابع |
| s41-u33 | ⑯ الأولى تعبّر عن قدرة حالية، والثانية عن قدرة عامة في الماضي. |
| s41-u34 | ⑰ طلب مهذب. |
| s41-u35 | ⑱ احتمال مستقبلي. |
| s41-u36 | ⑲ لأن الجملة تبرز نجاحها في حل مشكلة محددة في الماضي، وليس مجرد امتلاك قدرة عامة. |
| s41-u37 | ⑳ نعم. قد يكون السؤال عن القدرة إذا كنا نريد معرفة ما إذا كان الشخص يستطيع فتح الباب، وقد يكون طلبًا إذا كنا نريده أن يفتح الباب لنا. السياق هو الذي يحدد المعنى. |
| s41-u38 | حلول المستوى الخامس |
| s41-u39 | ㉑ Can. |
| s41-u40 | Can you design a simple robot? |
| s41-u41 | ㉒ couldn't. |
| s41-u42 | But when I was younger, I couldn't understand electronic circuits. |
| s41-u43 | ㉓ Could. |
| s41-u44 | Could you help me build a small robot, please? |
| s41-u45 | ㉔ could. |
| s41-u46 | We could work together after school. |
| s41-u47 | ㉕ will be able to. |
| s41-u48 | I think I will be able to build more advanced robots. |
| s41-u49 | ملاحظة للمعلم |
| s41-u50 | لا يكفي أن يختار الطالب CAN أو COULD اختيارًا صحيحًا؛ ينبغي أن يستطيع تفسير الوظيفة المقصودة: |
| s41-u51 | هل يتحدث عن قدرة؟ |
| s41-u52 | أم إذن؟ |
| s41-u53 | أم طلب؟ |
| s41-u54 | أم احتمال؟ |
| s41-u55 | أم اقتراح؟ |
| s41-u56 | فهذا هو الهدف الحقيقي من الدرس. |

### s42 — Writing Mission — My Abilities: Past, Present & Future

Destination: **WritingMission42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s42-u1 | اكتب فقرة من 12 إلى 15 جملة باللغة الإنجليزية بعنوان: |
| s42-u2 | My Abilities: Past, Present & Future |
| s42-u3 | تحدث فيها عن مهاراتك في الماضي، وقدراتك الحالية، وما تريد أن تصبح قادرًا على فعله مستقبلًا. |
| s42-u4 | يجب أن تتضمن: |
| s42-u5 | ① ثلاث جمل باستخدام CAN. |
| s42-u6 | ② جملتين باستخدام CAN'T. |
| s42-u7 | ③ جملتين باستخدام COULD للتعبير عن قدرة ماضية. |
| s42-u8 | ④ جملة باستخدام COULDN'T. |
| s42-u9 | ⑤ جملة باستخدام WAS/WERE ABLE TO. |
| s42-u10 | ⑥ جملتين باستخدام WILL BE ABLE TO. |
| s42-u11 | ⑦ طلبًا مهذبًا باستخدام Could you...? |
| s42-u12 | ⑧ طلب إذن باستخدام Could I...? |
| s42-u13 | ⑨ اقتراحًا باستخدام We could... |
| s42-u14 | ⑩ جملة تعبّر عن احتمال باستخدام COULD. |
| s42-u15 | نموذج إرشادي |
| s42-u16 | When I was younger, I couldn't speak English very well. |
| s42-u17 | However, I could read simple words and understand short sentences. |
| s42-u18 | Now I can understand longer texts, and I can write about different topics. |
| s42-u19 | I still can't speak as fluently as I want, but I am improving. |
| s42-u20 | Last month, I was able to complete a difficult English project. |
| s42-u21 | Next year, I will be able to communicate more confidently. |
| s42-u22 | My friends and I could practise speaking together after school. |
| s42-u23 | I think this could help us improve faster. |
| s42-u24 | تحدي إضافي |
| s42-u25 | بعد كتابة الفقرة، حاول تحويل ثلاث جمل منها إلى أسئلة، وثلاث جمل أخرى إلى النفي. |

### s43 — الملخص الذهبي — CAN & COULD

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s43-u1 | CAN |
| s43-u2 | الصيغة: |
| s43-u3 | Subject + can + V1 |
| s43-u4 | أهم الاستخدامات: |
| s43-u5 | ① القدرة الحالية. |
| s43-u6 | I can swim. |
| s43-u7 | ② الإمكانية العامة. |
| s43-u8 | Accidents can happen. |
| s43-u9 | ③ طلب الإذن. |
| s43-u10 | Can I use your pen? |
| s43-u11 | ④ تقديم الطلبات. |
| s43-u12 | Can you help me? |
| s43-u13 | COULD |
| s43-u14 | الصيغة: |
| s43-u15 | Subject + could + V1 |
| s43-u16 | أهم الاستخدامات: |
| s43-u17 | ① القدرة العامة في الماضي. |
| s43-u18 | I could swim when I was six. |
| s43-u19 | ② الطلب المهذب. |
| s43-u20 | Could you help me, please? |
| s43-u21 | ③ طلب الإذن بصورة مهذبة. |
| s43-u22 | Could I ask a question? |
| s43-u23 | ④ الاحتمال. |
| s43-u24 | It could rain tomorrow. |
| s43-u25 | ⑤ الاقتراح. |
| s43-u26 | We could visit the museum. |
| s43-u27 | النفي |
| s43-u28 | cannot / can't |
| s43-u29 | could not / couldn't |
| s43-u30 | السؤال |
| s43-u31 | Can + Subject + V1? |
| s43-u32 | Could + Subject + V1? |
| s43-u33 | التعبير عن القدرة المستقبلية |
| s43-u34 | will be able to + V1 |
| s43-u35 | مثال: |
| s43-u36 | I will be able to drive next year. |
| s43-u37 | الفرق المتقدم |
| s43-u38 | COULD = قدرة عامة في الماضي. |
| s43-u39 | WAS/WERE ABLE TO = مناسبة لإبراز النجاح في موقف ماضٍ محدد. |
| s43-u40 | القاعدة الذهبية |
| s43-u41 | لا تترجم CAN وCOULD بصورة آلية. حدّد أولًا الوظيفة التي تؤديها الكلمة داخل الموقف. |

### s44 — خريطة تقدم المنهج والمحطة القادمة

Destination: **Steps42 / Lines42**. Answer/explanation destination: **Inline source explanation**.

| Unit | Source content |
|---|---|
| s44-u1 | أكملنا الآن الدرس 42 من أصل 120 درسًا. |
| s44-u2 | التقدم الكلي |
| s44-u3 | 42 / 120 |
| s44-u4 | 42 درسًا مكتملًا |
| s44-u5 | 78 درسًا متبقيًا |
| s44-u6 | الدرس القادم: Lesson 43 — MAY & MIGHT |
| s44-u7 | Possibility, Probability & Permission |
| s44-u8 | سنتعلم فيه: |
| s44-u9 | - التعبير عن الاحتمال وعدم اليقين. |
| s44-u10 | - الفرق بين MAY وMIGHT. |
| s44-u11 | - استخدام MAY لطلب الإذن ومنحه. |
| s44-u12 | - المقارنة بين CAN وCOULD وMAY وMIGHT. |
| s44-u13 | - كيف نعبر عن احتمالات الحاضر والمستقبل. |
| s44-u14 | - لماذا لا تعني MIGHT دائمًا أن الاحتمال أضعف من MAY بصورة مطلقة. |
| s44-u15 | - تدريبات واقعية واختبار نهائي شامل. |
| s44-u16 | في الدرس 41 فهمنا كيف تعمل الأفعال المساعدة، وفي الدرس 42 استخدمناها للتعبير عن القدرة والتواصل المهذب. أما الدرس 43 فسينقلنا إلى مهارة جديدة: كيف نتحدث بثقة حتى عندما لا نكون متأكدين مما سيحدث! 🚀 |
