# Mixed-direction remaining inventory

Current unchanged full crawl: **48 unresolved findings; zero matching exceptions**. No new waiver. `bidi-review.json` retains all 68 starting findings with stable IDs, exact text, repaired root causes/components, and explicit OPEN dispositions. Component/severity review of the remaining cases is not complete.

| Lesson | At 59ba597 | Current pair | Current row | Current alternatives |
|---|---:|---:|---:|---:|
| 1 | 3 | 0 | 0 | 0 |
| 2 | 1 | 0 | 0 | 0 |
| 3 | 5 | 5 | 0 | 0 |
| 4 | 5 | 1 | 0 | 0 |
| 5 | 0 | 0 | 0 | 0 |
| 6 | 0 | 0 | 0 | 0 |
| 7 | 1 | 1 | 0 | 0 |
| 8 | 2 | 1 | 1 | 0 |
| 9 | 7 | 1 | 0 | 0 |
| 10 | 4 | 4 | 0 | 0 |
| 11 | 0 | 0 | 0 | 0 |
| 12 | 5 | 3 | 0 | 0 |
| 13 | 8 | 6 | 0 | 0 |
| 14 | 0 | 0 | 0 | 0 |
| 15 | 0 | 0 | 0 | 0 |
| 16 | 2 | 2 | 0 | 0 |
| 17 | 1 | 1 | 0 | 0 |
| 18 | 2 | 0 | 2 | 0 |
| 19 | 1 | 1 | 0 | 0 |
| 20 | 6 | 0 | 6 | 0 |
| 21 | 1 | 1 | 0 | 0 |
| 22 | 2 | 0 | 2 | 0 |
| 23 | 2 | 0 | 2 | 0 |
| 24 | 4 | 2 | 0 | 0 |
| 25 | 1 | 1 | 0 | 0 |
| 26 | 5 | 2 | 3 | 0 |
| 27 | 0 | 0 | 0 | 0 |
| 28 | 0 | 0 | 0 | 0 |
| 29 | 0 | 0 | 0 | 0 |
| 30 | 0 | 0 | 0 | 0 |
| 31 | 0 | 0 | 0 | 0 |
| 32 | 0 | 0 | 0 | 0 |

## Exact unresolved cases

- Lesson 3 / pair: I am happy.أنا سعيد.
  - `para:div.`

- Lesson 3 / pair: He is tall.هو طويل.
  - `para:div.`

- Lesson 3 / pair: She is a teacher.هي معلّمة.
  - `para:div.`

- Lesson 3 / pair: We are ready.نحن جاهزون.
  - `para:div.`

- Lesson 3 / pair: They are friends.هم أصدقاء.
  - `para:div.`

- Lesson 4 / pair: اختر…Subject · الفاعلVerb to beArticle · الأداةNoun · الاسم
  - `para:select.mt-2.w-full.rounded-lg`

- Lesson 7 / pair: النفي: don't — السؤال: Do...?
  - `para:div.mt-3.rounded-2xl.p-3`

- Lesson 8 / row: do / does | النفي
  - `row:span.rounded-full.bg-indigo-50.px-4 >> span.rounded-full.bg-indigo-50.px-4 in div.pop.pop-5.mt-8`

- Lesson 8 / pair: 📌 every morning ← علامة قوية على العادة
  - `para:span.rounded-full.bg-indigo-50.px-3`

- Lesson 9 / pair: I ← نستخدم am
  - `para:div.mt-3.text-center.text-sm`

- Lesson 10 / pair: Present Simple أم Continuous؟ — اختر ثم اشرح السبب
  - `para:span.truncate.font-semibold`

- Lesson 10 / pair: Present Simple — عادة / روتين / حقيقة / مستقر
  - `para:`

- Lesson 10 / pair: Present Continuous — الآن / هذه الفترة / مؤقت
  - `para:`

- Lesson 10 / pair: لاحظ أن تغييرًا صغيرًا جدًا غيّر معنى الجملة. plays → عادة / قدرة / نشاط عام · is playing → يحدث الآن
  - `para:span.text-base.font-semibold.leading-relaxed`

- Lesson 12 / pair: في الماضي: I played · You played · He played · She played · It played · We played · They played — الجميع متشابهون!
  - `para:div.mt-3.text-center.text-xs`

- Lesson 12 / pair: إذا انتهى الفعل بـ: حرف ساكن + y — نحوّل y → i ثم نضيف ed.
  - `para:p.mt-2.max-w-[88%].text-lg`

- Lesson 12 / pair: 🛠️ آلة قواعد -ed — اضغط أي فعل لترى القاعدة
  - `para:div.text-center.font-bold.text-orange-800`

- Lesson 13 / pair: did — فعل مساعد
  - `para:span.inline-flex.flex-col.items-center`

- Lesson 13 / pair: didn't — النفي
  - `para:span.inline-flex.flex-col.items-center`

- Lesson 13 / pair: Do / Does → Did — والفعل يبقى Base Verb
  - `para:div.mt-3.rounded-2xl.bg-white`

- Lesson 13 / pair: did = فعل أساسي
  - `para:button.rounded-xl.border-2.px-5`

- Lesson 13 / pair: Did = فعل مساعد
  - `para:button.rounded-xl.border-2.px-5`

- Lesson 13 / pair: DID + Base Verb — فكر بالقاعدة، وليس بالحفظ.
  - `para:div.rounded-3xl.border-2.border-violet-200`

- Lesson 16 / pair: my تحدد أي كتاب. book = الاسم.
  - `para:div.text-base.font-semibold.leading-relaxed`

- Lesson 16 / pair: لاحظ: students' = ملكية مرتبطة بالاسم. their = صفة ملكية مرتبطة بالضمير.
  - `para:div.text-base.font-semibold.leading-relaxed`

- Lesson 17 / pair: THREE-SYSTEM OWNERSHIP MAPاسم + 's ← صفة ملكية ← ضمير ملكية
  - `para:span.ltr-pair.inline-flex.flex-wrap`

- Lesson 18 / row: some / any | الأسماء المعدودة وغير المعدودة
  - `row:span.rounded-lg.bg-white/15.px-2.5 >> span.rounded-lg.bg-white/15.px-2.5 in div.mt-2.flex.flex-wrap`

- Lesson 18 / row: بعض F / FE → VES | مع وجود استثناءات.
  - `row:span.text-lg.font-black.text-slate-800 >> span.text-xs.font-bold.text-slate-400 in div.flex.flex-wrap.items-center`

- Lesson 19 / pair: 🏆 FINAL BOSS — اقرأ:
  - `para:div.text-center.text-sm.font-bold`

- Lesson 20 / row: this | في السؤال الأول؟
  - `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-700 in div.mt-1.flex.flex-wrap`

- Lesson 20 / row: that | في السؤال الثاني؟
  - `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-700 in div.mt-1.flex.flex-wrap`

- Lesson 20 / row: these | مع notebooks؟
  - `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-700 in div.mt-1.flex.flex-wrap`

- Lesson 20 / row: those | مع bicycles؟
  - `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-700 in div.mt-1.flex.flex-wrap`

- Lesson 20 / row: my new camera | و
  - `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-500 in div.mt-1.flex.flex-wrap`

- Lesson 20 / row: children's bicycles | ولم نقل:
  - `row:span.ltr.font-en.rounded-lg >> span.text-sm.font-bold.text-slate-500 in div.mt-1.flex.flex-wrap`

- Lesson 21 / pair: in = في
  - `para:div.mt-3.rounded-2xl.border-2`

- Lesson 22 / row: Adjectives | وحتى الجمل الأطول.
  - `row:span.rounded-lg.bg-white.px-2.5 >> span.rounded-lg.bg-white.px-2.5 in div.mt-2.flex.flex-wrap`

- Lesson 22 / row: on | تخبرنا بالعلاقة بين: book و table.
  - `row:span.ltr.font-en.rounded-xl >> span.text-base.font-bold.text-slate-700 in div.mt-2.flex.flex-wrap`

- Lesson 23 / row: pieces | وليس information نفسها.
  - `row:span.ltr.font-en.rounded-lg >> span. in div.mt-2.flex.flex-wrap`

- Lesson 23 / row: some rice | وليس:
  - `row:span.ltr.font-en.rounded-xl >> span.text-sm.font-bold.text-slate-600 in div.mt-2.flex.flex-wrap`

- Lesson 24 / pair: عدد قليل لكنه موجود وكافٍ نسبيًا. few = عدد قليل جدًا مع إحساس بالنقص.
  - `para:span.text-sm.font-bold.leading-7`

- Lesson 24 / pair: كمية صغيرة لكنها موجودة ومقبولة. little = كمية صغيرة جدًا مع إحساس بالنقص.
  - `para:span.text-sm.font-bold.leading-7`

- Lesson 25 / pair: WH و -ING · صيغة -ING — The -ING Form
  - `para:div.truncate.text-sm.font-bold`

- Lesson 26 / row: Past Continuous | لكن:
  - `row:span.rounded-lg.px-2.py-1 >> span.text-xs.font-black.text-slate-600 in div.mt-3.flex.flex-wrap`

- Lesson 26 / row: when | غالبًا نستخدمه لإدخال حدث وقع أثناء فعل آخر.
  - `row:span.rounded-xl.px-3.py-1.5 >> span.text-sm.font-bold.text-slate-700 in div.flex.flex-wrap.items-center`

- Lesson 26 / row: was/were + ing | و
  - `row:span.ltr.font-en.rounded-xl >> span.self-center.text-xs.font-black in div.flex.flex-wrap.justify-center`

- Lesson 26 / pair: A: عندما نريد التركيز على عملية المشي في سياق معين.
  - `para:div.rounded-xl.bg-sky-50.px-3`

- Lesson 26 / pair: B: عندما نريد ببساطة إخبار الشخص أن المشي إلى المدرسة حدث.
  - `para:div.rounded-xl.bg-sky-50.px-3`
