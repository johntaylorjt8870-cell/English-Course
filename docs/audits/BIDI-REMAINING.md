# Mixed-direction continuation inventory

Initial-state lesson-step crawl only. No new exceptions or weakened thresholds. All 68 after findings remain OPEN; none is silently treated as a false positive. Logical source text, simulated visual order, exact signature and detected English/Arabic segments are preserved in `bidi-after.json`. This report is not character geometry for every state.

| Lesson | Before pair | Before row | Before alternatives | After pair | After row | After alternatives |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 3 | 0 | 0 | 3 | 0 | 0 |
| 2 | 18 | 7 | 3 | 1 | 0 | 0 |
| 3 | 8 | 0 | 0 | 5 | 0 | 0 |
| 4 | 1 | 25 | 2 | 1 | 3 | 1 |
| 5 | 0 | 20 | 1 | 0 | 0 | 0 |
| 6 | 0 | 0 | 0 | 0 | 0 | 0 |
| 7 | 3 | 0 | 2 | 1 | 0 | 0 |
| 8 | 4 | 7 | 1 | 1 | 1 | 0 |
| 9 | 12 | 0 | 1 | 7 | 0 | 0 |
| 10 | 7 | 11 | 1 | 4 | 0 | 0 |
| 11 | 6 | 7 | 0 | 0 | 0 | 0 |
| 12 | 12 | 11 | 2 | 5 | 0 | 0 |
| 13 | 18 | 14 | 1 | 8 | 0 | 0 |
| 14 | 6 | 5 | 0 | 0 | 0 | 0 |
| 15 | 14 | 0 | 1 | 0 | 0 | 0 |
| 16 | 2 | 0 | 0 | 2 | 0 | 0 |
| 17 | 1 | 7 | 0 | 1 | 0 | 0 |
| 18 | 4 | 26 | 1 | 0 | 2 | 0 |
| 19 | 5 | 8 | 0 | 1 | 0 | 0 |
| 20 | 2 | 51 | 1 | 0 | 6 | 0 |
| 21 | 6 | 61 | 0 | 1 | 0 | 0 |
| 22 | 18 | 44 | 0 | 0 | 2 | 0 |
| 23 | 29 | 33 | 4 | 0 | 2 | 0 |
| 24 | 2 | 24 | 0 | 2 | 2 | 0 |
| 25 | 5 | 34 | 0 | 1 | 0 | 0 |
| 26 | 12 | 35 | 0 | 2 | 3 | 0 |
| 27 | 0 | 0 | 0 | 0 | 0 | 0 |
| 28 | 0 | 0 | 0 | 0 | 0 | 0 |
| 29 | 0 | 0 | 0 | 0 | 0 | 0 |
| 30 | 0 | 0 | 0 | 0 | 0 | 0 |
| 31 | 0 | 0 | 0 | 0 | 0 | 0 |
| 32 | 0 | 0 | 0 | 0 | 0 | 0 |

## Remaining exact cases

Each case needs a semantic and real-layout decision. Row warnings may represent English labels with Arabic translations **or** fragments of a larger Arabic sentence; automatically forcing all such siblings LTR would not preserve the latter. Paragraph findings include raw/dynamic render sites and parser-boundary cases. Native selects and deliberately vertical bilingual diagrams require separate browser/source-intent evidence before any exception. No source-order or malformed-source rewrite has been authorized by this inventory.

### Lesson 1 (3)

- **para** — Subject = الفاعل
  - Signature: `para:span.flex.items-center.gap-1.5`

- **para** — Verb = الفعل
  - Signature: `para:span.flex.items-center.gap-1.5`

- **para** — Object = المفعول به
  - Signature: `para:span.flex.items-center.gap-1.5`

### Lesson 2 (1)

- **para** — ثلاث كلمات فقط: am · is · are — ولكل واحدة ضمائر محددة.
  - Signature: `para:p.mt-2.text-xl.text-slate-500`

### Lesson 3 (5)

- **para** — I am happy.أنا سعيد.
  - Signature: `para:div.`

- **para** — He is tall.هو طويل.
  - Signature: `para:div.`

- **para** — She is a teacher.هي معلّمة.
  - Signature: `para:div.`

- **para** — We are ready.نحن جاهزون.
  - Signature: `para:div.`

- **para** — They are friends.هم أصدقاء.
  - Signature: `para:div.`

### Lesson 4 (5)

- **row** — a | قبل اسم مفرد يبدأ بصوت ساكن
  - Signature: `row:span.grid.h-20.w-20 >> div. in div.flex.flex-wrap.items-center`

- **row** — an | قبل اسم مفرد يبدأ بصوت علة
  - Signature: `row:span.grid.h-20.w-20 >> div. in div.flex.flex-wrap.items-center`

- **row** — a | صوت علة ⟵ نستخدم an
  - Signature: `row:span.grid.h-14.w-14 >> span.rounded-full.px-3.py-1 in div.flex.flex-wrap.items-center`

- **para** — اختر الفاعل والاسم، وشاهد الأداة الصحيحة تُختار تلقائيًا (a أو an)، مع النفي والسؤال.
  - Signature: `alts:p.mt-2.max-w-[88%].text-lg`

- **para** — اختر…Subject · الفاعلVerb to beArticle · الأداةNoun · الاسم
  - Signature: `para:select.mt-2.w-full.rounded-lg`

### Lesson 7 (1)

- **para** — النفي: don't — السؤال: Do...?
  - Signature: `para:div.mt-3.rounded-2xl.p-3`

### Lesson 8 (2)

- **row** — do / does | النفي
  - Signature: `row:span.rounded-full.bg-indigo-50.px-4 >> span.rounded-full.bg-indigo-50.px-4 in div.pop.pop-5.mt-8`

- **para** — 📌 every morning ← علامة قوية على العادة
  - Signature: `para:span.rounded-full.bg-indigo-50.px-3`

### Lesson 9 (7)

- **para** — now · الآن
  - Signature: `para:span.rounded-full.bg-violet-50.px-3`

- **para** — right now · في هذه اللحظة
  - Signature: `para:span.rounded-full.bg-violet-50.px-3`

- **para** — at the moment · في الوقت الحالي
  - Signature: `para:span.rounded-full.bg-violet-50.px-3`

- **para** — currently · حاليًا
  - Signature: `para:span.rounded-full.bg-violet-50.px-3`

- **para** — Look! · انظر!
  - Signature: `para:span.rounded-full.bg-violet-50.px-3`

- **para** — Listen! · استمع!
  - Signature: `para:span.rounded-full.bg-violet-50.px-3`

- **para** — I ← نستخدم am
  - Signature: `para:div.mt-3.text-center.text-sm`

### Lesson 10 (4)

- **para** — Present Simple أم Continuous؟ — اختر ثم اشرح السبب
  - Signature: `para:span.truncate.font-semibold`

- **para** — Present Simple — عادة / روتين / حقيقة / مستقر
  - Signature: `para:`

- **para** — Present Continuous — الآن / هذه الفترة / مؤقت
  - Signature: `para:`

- **para** — لاحظ أن تغييرًا صغيرًا جدًا غيّر معنى الجملة. plays → عادة / قدرة / نشاط عام · is playing → يحدث الآن
  - Signature: `para:span.text-base.font-semibold.leading-relaxed`

### Lesson 12 (5)

- **para** — في الماضي: I played · You played · He played · She played · It played · We played · They played — الجميع متشابهون!
  - Signature: `para:div.mt-3.text-center.text-xs`

- **para** — إذا انتهى الفعل بـ: حرف ساكن + y — نحوّل y → i ثم نضيف ed.
  - Signature: `para:p.mt-2.max-w-[88%].text-lg`

- **para** — 🛠️ آلة قواعد -ed — اضغط أي فعل لترى القاعدة
  - Signature: `para:div.text-center.font-bold.text-orange-800`

- **para** — Present: read = ريد
  - Signature: `para:div.mt-2.text-sm.font-bold`

- **para** — vowel + y — نحتفظ بـ y:
  - Signature: `para:div.mt-3.text-sm.font-bold`

### Lesson 13 (8)

- **para** — 🎓 سبعة أهداف — كلها مبنية على فكرة واحدة: DID = الماضي، والفعل بعده يرجع إلى الأساس.
  - Signature: `para:div.rounded-3xl.border-2.border-amber-200`

- **para** — did — فعل مساعد
  - Signature: `para:span.inline-flex.flex-col.items-center`

- **para** — الماضي على الفعل: went = الماضي
  - Signature: `para:span.rounded-full.bg-orange-100.px-3`

- **para** — didn't — النفي
  - Signature: `para:span.inline-flex.flex-col.items-center`

- **para** — Do / Does → Did — والفعل يبقى Base Verb
  - Signature: `para:div.mt-3.rounded-2xl.bg-white`

- **para** — did = فعل أساسي
  - Signature: `para:button.rounded-xl.border-2.px-5`

- **para** — Did = فعل مساعد
  - Signature: `para:button.rounded-xl.border-2.px-5`

- **para** — DID + Base Verb — فكر بالقاعدة، وليس بالحفظ.
  - Signature: `para:div.rounded-3xl.border-2.border-violet-200`

### Lesson 16 (2)

- **para** — my تحدد أي كتاب. book = الاسم.
  - Signature: `para:div.text-base.font-semibold.leading-relaxed`

- **para** — لاحظ: students' = ملكية مرتبطة بالاسم. their = صفة ملكية مرتبطة بالضمير.
  - Signature: `para:div.text-base.font-semibold.leading-relaxed`

### Lesson 17 (1)

- **para** — THREE-SYSTEM OWNERSHIP MAPاسم + 's ← صفة ملكية ← ضمير ملكية
  - Signature: `para:span.ltr-pair.inline-flex.flex-wrap`

### Lesson 18 (2)

- **row** — some / any | الأسماء المعدودة وغير المعدودة
  - Signature: `row:span.rounded-lg.bg-white/15.px-2.5 >> span.rounded-lg.bg-white/15.px-2.5 in div.mt-2.flex.flex-wrap`

- **row** — بعض F / FE → VES | مع وجود استثناءات.
  - Signature: `row:span.text-lg.font-black.text-slate-800 >> span.text-xs.font-bold.text-slate-400 in div.flex.flex-wrap.items-center`

### Lesson 19 (1)

- **para** — 🏆 FINAL BOSS — اقرأ:
  - Signature: `para:div.text-center.text-sm.font-bold`

### Lesson 20 (6)

- **row** — this | في السؤال الأول؟
  - Signature: `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-700 in div.mt-1.flex.flex-wrap`

- **row** — that | في السؤال الثاني؟
  - Signature: `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-700 in div.mt-1.flex.flex-wrap`

- **row** — these | مع notebooks؟
  - Signature: `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-700 in div.mt-1.flex.flex-wrap`

- **row** — those | مع bicycles؟
  - Signature: `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-700 in div.mt-1.flex.flex-wrap`

- **row** — my new camera | و
  - Signature: `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-500 in div.mt-1.flex.flex-wrap`

- **row** — children's bicycles | ولم نقل:
  - Signature: `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-500 in div.mt-1.flex.flex-wrap`

### Lesson 21 (1)

- **para** — in = في
  - Signature: `para:div.mt-3.rounded-2xl.border-2`

### Lesson 22 (2)

- **row** — Adjectives | وحتى الجمل الأطول.
  - Signature: `row:span.rounded-lg.bg-white.px-2.5 >> span.rounded-lg.bg-white.px-2.5 in div.mt-2.flex.flex-wrap`

- **row** — on | تخبرنا بالعلاقة بين: book و table.
  - Signature: `row:span.ltr.font-en.rounded-xl >> span.text-base.font-bold.text-slate-700 in div.mt-2.flex.flex-wrap`

### Lesson 23 (2)

- **row** — pieces | وليس information نفسها.
  - Signature: `row:span.ltr.font-en.rounded-lg >> span. in div.mt-2.flex.flex-wrap`

- **row** — some rice | وليس:
  - Signature: `row:span.ltr.font-en.rounded-xl >> span.text-sm.font-bold.text-slate-600 in div.mt-2.flex.flex-wrap`

### Lesson 24 (4)

- **para** — عدد قليل لكنه موجود وكافٍ نسبيًا. few = عدد قليل جدًا مع إحساس بالنقص.
  - Signature: `para:span.text-sm.font-bold.leading-7`

- **para** — كمية صغيرة لكنها موجودة ومقبولة. little = كمية صغيرة جدًا مع إحساس بالنقص.
  - Signature: `para:span.text-sm.font-bold.leading-7`

- **row** — TIME SENSOR | حالة خاصة: كلمة time لها وجهان
  - Signature: `row:span.ltr.font-en.rounded-lg >> h4.font-head.text-sm.font-black in div.flex.flex-wrap.items-center`

- **row** — Countable Plural | كثير من الأشياء المعدودة.
  - Signature: `row:span.ltr.font-en.rounded-lg >> p.min-w-[12rem].flex-1.text-sm in div.mt-3.flex.flex-wrap`

### Lesson 25 (1)

- **para** — WH و -ING · صيغة -ING — The -ING Form
  - Signature: `para:div.truncate.text-sm.font-bold`

### Lesson 26 (5)

- **row** — Past Continuous | لكن:
  - Signature: `row:span.rounded-lg.px-2.py-1 >> span.text-xs.font-black.text-slate-600 in div.mt-3.flex.flex-wrap`

- **row** — when | غالبًا نستخدمه لإدخال حدث وقع أثناء فعل آخر.
  - Signature: `row:span.rounded-xl.px-3.py-1.5 >> span.text-sm.font-bold.text-slate-700 in div.flex.flex-wrap.items-center`

- **row** — was/were + ing | و
  - Signature: `row:span.ltr.font-en.rounded-xl >> span.self-center.text-xs.font-black in div.flex.flex-wrap.justify-center`

- **para** — A: عندما نريد التركيز على عملية المشي في سياق معين.
  - Signature: `para:div.rounded-xl.bg-sky-50.px-3`

- **para** — B: عندما نريد ببساطة إخبار الشخص أن المشي إلى المدرسة حدث.
  - Signature: `para:div.rounded-xl.bg-sky-50.px-3`
