import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { EnAr } from "../../shared/bidi";
import { COVERAGE_39, COVERAGE_ACCURACY_NOTES_39, COVERAGE_PLATFORM_ADDITIONS_39, COVERAGE_SECTION_COUNT_39 } from "./coverage39";
import { SOURCE_NUMBERED_COUNT_39, SOURCE_SECTIONS_39, sourceSection39 } from "./ledger39";
import { TEST_COUNT_39, TEST_LEVEL_COUNT_39 } from "./testData39";
import { TEST_SOLUTIONS_39 } from "./solutionsData39";
import {
  DETECTIVE32_ITEMS_39,
  DIALOGUE2_LINES_39,
  DIALOGUE_LINES_39,
  EXERCISE29_ITEMS_39,
  FILL30_ITEMS_39,
  OBJECTIVES_39,
  READING34_ANALYSIS_39,
  READING34_JOURNEY_39,
  READING34_QUESTIONS_39,
  TENSE31_ITEMS_39,
  WRITING37_CRITERIA_39,
  WRITING37_MODEL_39,
  WRITING37_MODEL_FORMS_39,
} from "./practiceData39";
import { ActionButton39, FOCUS_39, PlatformNote39 } from "./kit39";

const TABS_39 = [
  { id: "coverage", label: "خريطة التغطية والفحص" },
  { id: "keys", label: "مفاتيح التدريب والقراءة" },
  { id: "solutions", label: "حلول الاختبار Q1–Q25" },
  { id: "rules", label: "القواعد والمفاهيم الخاطئة" },
  { id: "grading", label: "تصحيح مهمة الكتابة" },
] as const;

type TabId39 = (typeof TABS_39)[number]["id"];

/** إحصاءات تُحسب من بيانات الدرس نفسها (لا أرقام مكتوبة يدويًا). */
const SOURCE_LINE_TOTAL_39 = SOURCE_SECTIONS_39.reduce((total, section) => total + section.units.length, 0);
const REVEAL_LINE_TOTAL_39 = SOURCE_SECTIONS_39.reduce((total, section) => total + (section.revealUnits?.length ?? 0), 0);
const TABLE_TOTAL_39 = SOURCE_SECTIONS_39.reduce(
  (total, section) => total + (section.tableRows ? 1 : 0) + (section.extraTableRows ? 1 : 0),
  0,
);
const EXERCISE_INVENTORY_39 = [
  { id: "s29", label: "§29 · اختيار الصيغة", count: EXERCISE29_ITEMS_39.length },
  { id: "s30", label: "§30 · الإكمال", count: FILL30_ITEMS_39.length },
  { id: "s31", label: "§31 · اختيار الزمن", count: TENSE31_ITEMS_39.length },
  { id: "s32", label: "§32 · Grammar Detective", count: DETECTIVE32_ITEMS_39.length },
  { id: "s34", label: "§34 · أسئلة القراءة", count: READING34_QUESTIONS_39.length },
  { id: "s35", label: "§35 · الاختبار النهائي", count: TEST_COUNT_39 },
];
const EXERCISE_TOTAL_39 = EXERCISE_INVENTORY_39.reduce((total, entry) => total + entry.count, 0);

/** المفاهيم الخاطئة الشائعة في هذا الزمن — إعداد المنصة/المعلم. */
const MISCONCEPTIONS_39 = [
  {
    id: "has-after-will",
    wrong: "She will has been working…",
    right: "She will have been working…",
    note: "بعد will يأتي الفعل الأساسي have مع جميع الضمائر بما فيها He/She/It. (§3 · §5 · §27 ②)",
  },
  {
    id: "being-instead-of-been",
    wrong: "I will have being studying…",
    right: "I will have been studying…",
    note: "been هي التصريف الثالث من be، ولا تتحول إلى being في هذا التركيب. (§3 · §27 ①)",
  },
  {
    id: "finished-vs-unfinished",
    wrong: "Future Perfect = انتهى العمل، Future Perfect Continuous = لم ينتهِ.",
    right: "Future Perfect يبرز إنجازًا مكتملًا، وFuture Perfect Continuous يبرز مدة نشاط ممتدة حتى النقطة.",
    note: "هذا التقسيم غير صحيح ولا يُدرَّس في الدرس؛ الفرق زاوية التركيز لا حالة التوقف. (§18)",
  },
  {
    id: "for-forces-fpc",
    wrong: "وجود for يفرض Future Perfect Continuous.",
    right: "for تعمل مع Future Perfect أيضًا: By next year, I will have worked here for ten years.",
    note: "المدة تُذكر مع الزمنين؛ الاختيار يعتمد على إبراز الإنجاز أو إبراز الامتداد. (§16 · §33)",
  },
  {
    id: "will-after-by-the-time",
    wrong: "By the time you will arrive, I will have been studying.",
    right: "By the time you arrive, I will have been studying.",
    note: "الجملة الزمنية المستقبلية بعد by the time / when تأتي بـ Present Simple. (§13 · §14 · §27)",
  },
  {
    id: "since-duration",
    wrong: "since + مدة (since three hours).",
    right: "since + نقطة بداية (since 6:00) وfor + مدة (for three hours).",
    note: "مثال المصدر §9 يستعمل since 5:00 مع نقطة مرجع مستقبلية؛ الصياغة الطبيعية عند نقطة مستقبلية هي for + مدة، وقد وُثّقت الملاحظة دون تعديل النص. (§9 · §10)",
  },
  {
    id: "stative-fpc",
    wrong: "We will have been knowing each other for ten years.",
    right: "We will have known each other for ten years.",
    note: "أفعال الحالة (know · believe · understand · want · need · own) لا تُستخدم في الصيغة المستمرة في الاستعمال المعتاد. (§26 · §32 ⑥)",
  },
  {
    id: "short-answer-repeats",
    wrong: "Yes, I will have been.",
    right: "Yes, I will. / No, I won't.",
    note: "الإجابة القصيرة تستخدم will أو won't فقط. (§22)",
  },
  {
    id: "how-long-word-order",
    wrong: "How long you will have been studying…?",
    right: "How long will you have been studying…?",
    note: "في السؤال عن المدة تأتي will قبل الفاعل. (§23 · §32 ⑧)",
  },
  {
    id: "v3-after-been",
    wrong: "He will have been worked for six hours.",
    right: "He will have been working for six hours.",
    note: "بعد been يأتي الفعل مع ing لا التصريف الثالث. (§27 · §32 ⑦)",
  },
] as const;

/** إرشاد تصحيح مهمة الكتابة §37 — إعداد المنصة/المعلم (لا تصحيح آلي في النظام). */
const WRITING_RUBRIC_39 = [
  {
    band: "ممتاز (90–100%)",
    criteria: "12–15 جملة · الشروط الثمانية كلها محققة · لا خطأ في have been أو V-ing · تعبيرات زمنية متنوعة · مدة النشاط متسقة مع نقطة المرجع.",
  },
  {
    band: "جيد (75–89%)",
    criteria: "الشروط الثمانية محققة مع خطأ أو خطأين شكليين (مثل ing ناقصة أو تعبير زمني مكرر)، والمعنى واضح.",
  },
  {
    band: "مقبول (60–74%)",
    criteria: "ثلاثة شروط ناقصة على الأكثر، أو أخطاء متكررة في الصيغة لا تمنع الفهم.",
  },
  {
    band: "يحتاج دعم (أقل من 60%)",
    criteria: "أكثر من ثلاثة شروط ناقصة، أو خلط منهجي بين Future Perfect وFuture Perfect Continuous، أو جمل دون نقطة مرجع مستقبلية.",
  },
] as const;

const WRITING_TEACHER_STEPS_39 = [
  "① عدّ الجمل: المطلوب 12–15 جملة. العدّاد داخل مساحة الكتابة مساعد فقط ولا يُعدّ تصحيحًا.",
  "② تحقق من الشروط الثمانية بندًا بندًا كما وردت في المصدر (§37)، وخصوصًا: خمس جمل FPC، وجملتا FP، وجملتا Future Continuous، وجملة Future Simple، وجملة منفية، وسؤال How long، وجملة فيها by the time، وثلاثة تعبيرات زمنية مختلفة.",
  "③ افحص الثوابت النحوية: will + have + been + V-ing (لا has، لا being، لا V3 بعد been).",
  "④ افحص اتساق الحساب الزمني: هل المدة المذكورة (for …) معقولة بالنسبة إلى نقطة المرجع (by … / by the time …)؟",
  "⑤ افحص أفعال الحالة: إن وردت know/believe/understand/want/need/own في صيغة مستمرة فاطلب تحويلها إلى Future Perfect.",
  "⑥ تحقق من عدم نسخ النموذج الإرشادي؛ المطلوب أفكار الطالب ومفرداته.",
  "⑦ سجّل الملاحظة التصحيحية على شكل: الخطأ ← الصواب ← سبب القاعدة (§ المرجع)، ليتدرّب الطالب على التعليل لا على الحفظ.",
] as const;

export default function TeacherGuide39({ onGoSolutions, onLock }: { onGoSolutions: () => void; onLock: () => void }) {
  const [tab, setTab] = useState<TabId39>("coverage");
  return (
    <div data-area="lesson39-teacher" className="space-y-4">
      <section className="rounded-3xl border border-[#d8d2c5] bg-white p-4 shadow-sm sm:p-5">
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">Teacher Area · Lesson 39</p>
        <h2 className="mt-1 text-xl font-black text-[#17354a]">دليل المعلم — Future Perfect Continuous</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {[
            { k: "أقسام المصدر", v: `${SOURCE_NUMBERED_COUNT_39} قسمًا مرقّمًا + المقدمة` },
            { k: "خطوات الطالب", v: `${SOURCE_SECTIONS_39.length} خطوة (المقدمة + ${SOURCE_NUMBERED_COUNT_39} قسمًا)` },
            { k: "الاختبار الرسمي", v: `${TEST_COUNT_39} سؤالًا · ${TEST_LEVEL_COUNT_39} مستويات × 5` },
            { k: "الحلول", v: `${TEST_SOLUTIONS_39.length} حلًا تفصيليًا موسومًا` },
          ].map((entry) => (
            <div key={entry.k} className="rounded-xl border border-[#d8d2c5] bg-[#fdfcf8] px-3 py-2">
              <p className="text-xs font-black text-[#53676a]">{entry.k}</p>
              <p className="mt-0.5 text-sm font-bold text-[#24343b]">{entry.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <ActionButton39 variant="secondary" onClick={onGoSolutions}>
            فتح منطقة الحلول
          </ActionButton39>
          <ActionButton39 variant="secondary" onClick={onLock}>
            قفل منطقة المعلم
          </ActionButton39>
        </div>
      </section>

      <nav aria-label="أقسام دليل المعلم" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {TABS_39.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`${FOCUS_39} min-h-12 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              tab === item.id ? "border-[#245f62] bg-[#245f62] text-white" : "border-[#cfd8d2] bg-white text-[#24343b] hover:bg-[#eef4f0]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {tab === "coverage" ? (
        <section aria-label="خريطة تغطية أقسام المصدر" className="space-y-3">
          <div data-teacher-audit-summary className="rounded-2xl border border-[#d8d2c5] bg-[#fdfcf8] p-3">
            <h3 className="font-black text-[#17354a]">ملخص الفحص الآلي (يُحسب من بيانات الدرس)</h3>
            <dl className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: "أسطر المصدر المنقولة", v: `${SOURCE_LINE_TOTAL_39} سطرًا` },
                { k: "أسطر مفاتيح المصدر", v: `${REVEAL_LINE_TOTAL_39} سطرًا (§29 · §30 · §31 · §32 · §34)` },
                { k: "جداول أُعيد بناؤها", v: `${TABLE_TOTAL_39} جداول` },
                { k: "صفوف تغطية مسجّلة", v: `${COVERAGE_39.length} صفًا (المقدمة + ${COVERAGE_SECTION_COUNT_39} قسمًا)` },
                { k: "إضافات منصة موثّقة", v: `${COVERAGE_PLATFORM_ADDITIONS_39.length} صفًا` },
                { k: "ملاحظات دقة على المصدر", v: `${COVERAGE_ACCURACY_NOTES_39.length} ملاحظة` },
                { k: "بنود التدريب والاختبار", v: `${EXERCISE_TOTAL_39} بندًا مرقّمًا` },
                { k: "أهداف الدرس", v: `${OBJECTIVES_39.length} أهداف` },
              ].map((entry) => (
                <div key={entry.k} className="rounded-xl border border-[#d8d2c5] bg-white px-3 py-2">
                  <dt className="text-xs font-black text-[#53676a]">{entry.k}</dt>
                  <dd className="mt-0.5 text-sm font-bold text-[#24343b]">{entry.v}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#24343b]">
              {EXERCISE_INVENTORY_39.map((entry) => (
                <li key={entry.id}>
                  <Rich text={entry.label} /> — <span className="font-en font-black tabular-nums">{entry.count}</span> بندًا.
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm leading-6 text-[#43575a]">
              يتحقق الفحص الآلي <span dir="ltr" className="font-en">npm run audit:lesson39</span> من ربط كل سطر مصدري بواجهة الدرس، ومن تغطية
              التدريبات والاختبار، ومن عدم تضمين مفتاح الاختبار في المسار الأولي للطالب.
            </p>
          </div>
          <PlatformNote39>
            كل صف أدناه يربط قسمًا مصدريًا بموضعه في الدرس الجديد، ويبيّن ما نُقل كما هو، وما أُعيد بناء تنسيقه، وما أضافته المنصة، وأي
            ملاحظة دقة على المصدر. الجدول يغطي المقدمة و{COVERAGE_SECTION_COUNT_39} قسمًا مرقّمًا.
          </PlatformNote39>
          <div className="overflow-x-auto rounded-2xl border border-[#d8d2c5] bg-white">
            <table dir="rtl" aria-label="سجل تغطية أقسام المصدر" className="w-full min-w-[46rem] border-collapse text-sm">
              <caption className="sr-only">سجل تغطية المصدر للدرس 39</caption>
              <thead>
                <tr className="bg-[#17354a] text-white">
                  {["القسم", "المحتوى المطلوب", "الموضع في الدرس", "حالة النقل", "إضافة المنصة", "ملاحظة دقة"].map((header) => (
                    <th key={header} scope="col" className="px-3 py-2 text-right font-black">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COVERAGE_39.map((row, index) => (
                  <tr key={row.id} data-coverage-section={row.num ?? "cover"} className={index % 2 === 0 ? "bg-white" : "bg-[#f3f5f2]"}>
                    <th scope="row" className="border-t border-[#e2e4de] px-3 py-2 text-right align-top font-black text-[#17354a]">
                      <span dir="ltr" className="font-en">
                        {row.num == null ? "COVER" : `§${row.num}`}
                      </span>
                      <span className="mt-1 block text-xs font-bold text-[#43575a]">
                        <Rich text={row.title} />
                      </span>
                    </th>
                    <td className="border-t border-[#e2e4de] px-3 py-2 align-top leading-6 text-[#24343b]">
                      <Rich text={row.elements} />
                    </td>
                    <td className="border-t border-[#e2e4de] px-3 py-2 align-top leading-6 text-[#24343b]">
                      <Rich text={row.location} />
                    </td>
                    <td className="border-t border-[#e2e4de] px-3 py-2 align-top leading-6">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-black ${
                          row.transfer === "verbatim"
                            ? "bg-[#edf5ee] text-[#28533b]"
                            : row.transfer === "table-rebuilt"
                              ? "bg-[#fbf6eb] text-[#76531e]"
                              : "bg-[#eef2f6] text-[#17354a]"
                        }`}
                      >
                        {row.transfer === "verbatim"
                          ? "منقول كما هو"
                          : row.transfer === "table-rebuilt"
                            ? "تنسيق أُعيد بناؤه"
                            : "مفتاح غير موجود في المصدر"}
                      </span>
                    </td>
                    <td className="border-t border-[#e2e4de] px-3 py-2 align-top leading-6 text-[#24343b]">
                      {row.platformAddition ? <Rich text={row.platformAddition} /> : <span className="text-[#53676a]">—</span>}
                    </td>
                    <td className="border-t border-[#e2e4de] px-3 py-2 align-top leading-6 text-[#24343b]">
                      {row.accuracyNote ? <Rich text={row.accuracyNote} /> : <span className="text-[#53676a]">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {tab === "keys" ? (
        <section aria-label="مفاتيح تدريبات الدرس والقراءة" className="space-y-4">
          <details open className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">§29 · التدريب الأول (6 أسئلة)</summary>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#24343b]">
              {EXERCISE29_ITEMS_39.map((item) => (
                <li key={item.n}>
                  <span dir="ltr" className="font-en">
                    {item.prompt}
                  </span>{" "}
                  →{" "}
                  <span dir="ltr" className="font-en font-black">
                    {`${item.answer} — ${item.answerText}`}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm leading-6 text-[#76531e]">
              <Rich text="مفتاح المصدر حرفيًا:" />
            </p>
            <ul className="mt-1 space-y-1 text-sm leading-6 text-[#28533b]">
              {(sourceSection39("s29")?.revealUnits ?? []).map((line) => (
                <li key={line}>
                  <Rich text={line} />
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">§30 · التدريب الثاني (6 إكمالات)</summary>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#24343b]">
              {FILL30_ITEMS_39.map((item) => (
                <li key={item.n}>
                  <span dir="ltr" className="font-en">
                    {item.prompt}
                  </span>{" "}
                  →{" "}
                  <span dir="ltr" className="font-en font-black">
                    {item.answer}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#28533b]">
              {(sourceSection39("s30")?.revealUnits ?? []).map((line) => (
                <li key={line}>
                  <Rich text={line} />
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">§31 · اختيار الزمن (8 مواقف)</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {TENSE31_ITEMS_39.map((item) => (
                <li key={item.n}>
                  <p dir="ltr" className="font-en text-left">
                    {item.prompt}
                  </p>
                  <p>
                    <span dir="ltr" className="font-en block font-black">
                      {item.answerText}
                    </span>
                    <Rich text={item.why} />
                  </p>
                </li>
              ))}
            </ul>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#28533b]">
              {(sourceSection39("s31")?.revealUnits ?? []).map((line) => (
                <li key={line}>
                  <Rich text={line} />
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">§32 · Grammar Detective (10 جمل)</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {DETECTIVE32_ITEMS_39.map((item) => (
                <li key={item.n}>
                  <p dir="ltr" className="font-en text-left text-[#8d3832]">
                    {`${item.n}. ${item.prompt}`}
                  </p>
                  <p dir="ltr" className="font-en text-left font-black text-[#28533b]">
                    {item.answer}
                  </p>
                  <p>
                    <Rich text={item.why} />
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">
              <Rich text="§34 · Reading — A Journey Across the Country" />
            </summary>
            <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm leading-6 text-[#24343b]">
              {READING34_QUESTIONS_39.map((question) => (
                <li key={question}>
                  <span dir="ltr" className="font-en inline-block">
                    {question}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-sm font-bold text-[#28533b]">إجابات المصدر:</p>
            <ul className="mt-1 space-y-1 text-sm leading-6 text-[#28533b]">
              {(sourceSection39("s34")?.revealUnits ?? []).map((line) => (
                <li key={line}>
                  <Rich text={line} />
                </li>
              ))}
            </ul>
            <h3 className="mt-3 text-sm font-black text-[#17354a]">ساعة الرحلة — تحقق من الحساب</h3>
            <ul className="mt-1 space-y-1 text-sm leading-6 text-[#24343b]">
              {READING34_JOURNEY_39.map((stop) => (
                <li key={stop.clock}>
                  <EnAr
                    en={<span className="font-black tabular-nums">{stop.clock}</span>}
                    sep="·"
                    ar={`${stop.label} · المدة المنقضية ${stop.hours} ساعة`}
                  />
                </li>
              ))}
            </ul>
            <h3 className="mt-3 text-sm font-black text-[#17354a]">تحليل الصيغ في النص — إضافة من المنصة</h3>
            <ul className="mt-1 space-y-2 text-sm leading-6 text-[#24343b]">
              {READING34_ANALYSIS_39.map((entry) => (
                <li key={entry.line}>
                  <p dir="ltr" className="font-en text-left text-[#18333b]">
                    {entry.line}
                  </p>
                  <p>
                    <span dir="ltr" className="font-en block w-fit font-black">
                      {entry.form}
                    </span>
                    <Rich text={entry.why} />
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">§15 · تحليل حوار The Long Study Day</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {DIALOGUE_LINES_39.map((line) => (
                <li key={line.id}>
                  <p dir="ltr" className="font-en text-left">
                    <span dir="auto">{line.speaker}</span>: {line.en}
                  </p>
                  <p dir="rtl">
                    <Rich text={line.ar} />
                  </p>
                  <p>
                    <span dir="ltr" className="font-en block w-fit font-black">
                      {line.form}
                    </span>
                    <Rich text={line.analysis} />
                  </p>
                  <p className="text-xs font-black text-[#53676a]">
                    الترجمة العربية في §15 من نص المصدر (الأسطر 10–17).{" "}
                    {line.analysisOrigin === "platform" ? "التحليل إضافة من المنصة." : "التحليل من المصدر."}
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">§28 · تحليل حوار The Marathon Training</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {DIALOGUE2_LINES_39.map((line) => (
                <li key={line.id}>
                  <p dir="ltr" className="font-en text-left">
                    <span dir="auto">{line.speaker}</span>: {line.en}
                  </p>
                  <p dir="rtl">
                    <Rich text={line.ar} />
                  </p>
                  <p>
                    <span dir="ltr" className="font-en block w-fit font-black">
                      {line.form}
                    </span>
                    <Rich text={line.analysis} />
                  </p>
                  <p className="text-xs font-black text-[#53676a]">
                    {line.origin === "platform" ? "الترجمة إضافة من المنصة (المصدر لم يترجم هذا الحوار)." : "الترجمة من المصدر."}{" "}
                    {line.analysisOrigin === "platform" ? "التحليل إضافة من المنصة." : "التحليل من المصدر."}
                  </p>
                </li>
              ))}
            </ul>
          </details>
        </section>
      ) : null}

      {tab === "solutions" ? (
        <section aria-label="حلول اختبار الدرس 39" className="space-y-2">
          <PlatformNote39>
            نص المصدر §36 لا يحتوي مفتاحًا فعليًا؛ كل حل أدناه من إعداد المنصة/المعلم، مع نموذج وبدائل مقبولة في الأسئلة المفتوحة
            (والسؤال 18 مفتوح).
          </PlatformNote39>
          {TEST_SOLUTIONS_39.map((solution) => (
            <article key={solution.n} data-teacher-solution={solution.n} className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
              <header className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-black text-[#17354a]">
                  السؤال{" "}
                  <span dir="ltr" className="font-en">
                    {solution.n}
                  </span>{" "}
                  <span className="text-xs font-bold text-[#53676a]">(المستوى {solution.level})</span>
                </h3>
                <span className="rounded-full bg-[#fbf6eb] px-2.5 py-1 text-xs font-bold text-[#76531e]">
                  {solution.judgment === "open-model"
                    ? "نموذج مفتوح"
                    : solution.judgment === "grammatical-repair"
                      ? "تصحيح نحوي"
                      : solution.judgment === "contextual"
                        ? "سياقي"
                        : "صيغة محددة"}
                </span>
              </header>
              <p className="mt-2 text-sm leading-6 text-[#24343b]">
                <strong className="text-[#17354a]">الإجابة: </strong>
                <span dir="auto">
                  <Rich text={solution.answer} />
                </span>
              </p>
              <p className="mt-1 text-sm leading-6 text-[#24343b]">
                <strong className="text-[#17354a]">التفسير: </strong>
                <span dir="auto">
                  <Rich text={solution.explanation} />
                </span>
              </p>
              {solution.alternatives?.length ? (
                <ul className="mt-1 list-disc space-y-1 ps-5 text-sm leading-6 text-[#28533b]">
                  {solution.alternatives.map((line) => (
                    <li key={line} dir="auto">
                      <Rich text={line} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </section>
      ) : null}

      {tab === "rules" ? (
        <section aria-label="مرجع القواعد والمفاهيم الخاطئة" className="space-y-3">
          <div className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <h3 className="font-black text-[#17354a]">أهداف الدرس كما وردت في §1</h3>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#24343b]">
              {OBJECTIVES_39.map((objective) => (
                <li key={objective}>
                  <Rich text={objective} />
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <h3 className="font-black text-[#17354a]">مرجع سريع</h3>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#24343b]">
              <li>
                <Rich text="الصيغة: Subject + will + have + been + V-ing — ثابتة مع جميع الضمائر (§3 · §5)." />
              </li>
              <li>
                <Rich text="المعنى: مدة نشاط بدأت قبل نقطة مستقبلية وتكون ممتدة حتى تلك النقطة (§2 · §6 · §7)." />
              </li>
              <li>
                <Rich text="for + مدة (تجيب عن How long?) وsince + نقطة بداية (تجيب عن Since when?) (§8 · §9 · §10)." />
              </li>
              <li>
                <Rich text="by + نقطة مرجع، وby the time + جملة زمنية بـ Present Simple (§12 · §13 · §14)." />
              </li>
              <li>
                <Rich text="النفي: Subject + won't (will not) + have + been + V-ing (§19)، ومعناه مرتبط بالنقطة المستقبلية (§20)." />
              </li>
              <li>
                <Rich text="السؤال: Will + Subject + have + been + V-ing? (§21)، والإجابة القصيرة Yes, I will. / No, I won't. (§22)." />
              </li>
              <li>
                <Rich text="السؤال عن المدة: How long + will + Subject + have + been + V-ing? (§23)، وأسئلة Wh الأخرى (§24)." />
              </li>
              <li>
                <Rich text="Future Perfect يبرز الإنجاز المكتمل، وFuture Perfect Continuous يبرز مدة النشاط (§16 · §17 · §18)." />
              </li>
              <li>
                <Rich text="الأزمنة التامة المستمرة الثلاثة تشترك في been + V-ing وتختلف في المساعد والنقطة المرجعية (§25)." />
              </li>
              <li>
                <Rich text="أفعال الحالة تأخذ Future Perfect عادةً: will have known (§26). الأخطاء الشائعة في §27." />
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <h3 className="font-black text-[#17354a]">المفاهيم الخاطئة — إعداد المنصة/المعلم</h3>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {MISCONCEPTIONS_39.map((item) => (
                <li key={item.id} data-misconception={item.id} className="rounded-xl border border-[#e2e4de] bg-[#fdfcf8] p-3">
                  <p dir="auto" className="font-black text-[#8d3832]">
                    ✗ <Rich text={item.wrong} />
                  </p>
                  <p dir="auto" className="mt-1 font-black text-[#28533b]">
                    <Rich text={item.right} />
                  </p>
                  <p className="mt-1">
                    <Rich text={item.note} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <h3 className="font-black text-[#17354a]">ملاحظات دقة على المصدر (بلا تعديل صامت)</h3>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {COVERAGE_ACCURACY_NOTES_39.map((row) => (
                <li key={row.id}>
                  <p className="font-black text-[#17354a]">
                    {row.num == null ? (
                      "المقدمة"
                    ) : (
                      <span dir="ltr" className="font-en">
                        §{row.num}
                      </span>
                    )}{" "}
                    — <Rich text={row.title} />
                  </p>
                  <p dir="auto">
                    <Rich text={row.accuracyNote ?? ""} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <h3 className="font-black text-[#17354a]">فهرس المصدر (للمعلم)</h3>
            <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm leading-6 text-[#24343b]">
              {SOURCE_SECTIONS_39.filter((section) => section.num != null).map((section) => (
                <li key={section.id}>
                  <span className="font-bold">
                    <Rich text={section.title} />
                  </span>{" "}
                  <span className="text-xs text-[#53676a]">
                    · <span dir="ltr" className="font-en">{section.units.length}</span> سطرًا
                    {section.revealUnits?.length ? ` · ${section.revealUnits.length} سطر حل` : ""}
                    {section.tableRows ? " · جدول" : ""}
                    {section.extraTableRows ? " · جدول إضافي" : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {tab === "grading" ? (
        <section aria-label="إرشاد تصحيح مهمة الكتابة" className="space-y-3">
          <PlatformNote39>
            النظام لا يصحّح مهمة الكتابة آليًا ولا يُصدر حكمًا على جودة الفقرة؛ العدّاد وقائمة المراجعة أداتان للمراجعة الذاتية، والتصحيح
            الفعلي من المعلم وفق الإرشاد أدناه.
          </PlatformNote39>
          <div className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <h3 className="font-black text-[#17354a]">
              <Rich text="§37 · Writing Mission — الشروط الثمانية الأصلية" />
            </h3>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-6 text-[#24343b]">
              {WRITING37_CRITERIA_39.map((criterion) => (
                <li key={criterion}>
                  <Rich text={criterion} />
                </li>
              ))}
            </ul>
            <h4 className="mt-2 text-sm font-black text-[#17354a]">نموذج المصدر الإرشادي (لا يُنسخ) مع صيغة كل سطر</h4>
            <ul className="mt-1 space-y-2 text-sm leading-6">
              {WRITING37_MODEL_39.map((line, index) => (
                <li key={line}>
                  <span dir="ltr" className="font-en block text-left text-[#18333b]">
                    {line}
                  </span>
                  <span className="text-xs font-black text-[#53676a]">
                    <Rich text={`الصيغة: ${WRITING37_MODEL_FORMS_39[index]} — إضافة من المنصة.`} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <h3 className="font-black text-[#17354a]">سلم التقدير المقترح — إعداد المنصة/المعلم</h3>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {WRITING_RUBRIC_39.map((band) => (
                <li key={band.band} className="rounded-xl border border-[#e2e4de] bg-[#fdfcf8] p-3">
                  <p className="font-black text-[#17354a]">{band.band}</p>
                  <p className="mt-1">
                    <Rich text={band.criteria} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <h3 className="font-black text-[#17354a]">خطوات التصحيح المقترحة</h3>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#24343b]">
              {WRITING_TEACHER_STEPS_39.map((step) => (
                <li key={step}>
                  <Rich text={step} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </div>
  );
}
