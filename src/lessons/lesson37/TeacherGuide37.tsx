import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { COVERAGE_37, COVERAGE_ACCURACY_NOTES_37, COVERAGE_SECTION_COUNT_37 } from "./coverage37";
import { SOURCE_NUMBERED_COUNT_37 } from "./ledger37";
import { TEST_37 } from "./testData37";
import { TEST_SOLUTIONS_37 } from "./solutionsData37";
import {
  ADVANCED33_ITEMS_37,
  DETECTIVE30_ITEMS_37,
  DIALOGUE_LINES_37,
  EXERCISE28_ITEMS_37,
  IQ200_ITEMS_37,
  READING32_ANALYSIS_37,
  READING32_QUESTIONS_37,
  TRANSFORM29_ITEMS_37,
  WRITING36_CRITERIA_37,
  WRITING36_MODEL_37,
  OBJECTIVES_37,
} from "./practiceData37";
import { STEP_COUNT_37 } from "./data";
import { ActionButton37, FOCUS_37, PlatformNote37 } from "./kit37";

const TABS_37 = [
  { id: "coverage", label: "خريطة التغطية" },
  { id: "keys", label: "مفاتيح التدريب والقراءة" },
  { id: "solutions", label: "حلول الاختبار Q1–Q25" },
  { id: "rules", label: "القواعد وملاحظات المعلم" },
] as const;

type TabId37 = (typeof TABS_37)[number]["id"];

const EXPECTED_ERRORS_37 = [
  "حذف be بعد will: «I will studying» بدل «I will be studying».",
  "استخدام is/am/are بعد will: «She will is working» بدل «She will be working».",
  "إبقاء الفعل بالمصدر بعد be: «They won't be play» بدل «playing».",
  "إدخال will في جملة when الزمنية: «When you will arrive» بدل «When you arrive».",
  "بناء السؤال بـ Do/Does: «Does she will be working?» بدل «Will she be working?».",
  "استخدام الصيغة المستمرة مع أفعال الحالة: «He will be knowing» بدل «He will know».",
  "نسيان علامة الاستفهام أو تقديم be على الفاعل في أسئلة Wh: «What will you doing?».",
  "الاعتقاد أن Future Continuous يحتاج دائمًا إلى ساعة رقمية، أو أنه يعني انتهاء الفعل في تلك اللحظة.",
];

const TEACHING_NOTES_37 = [
  {
    head: "المعنى قبل الصيغة",
    lines: [
      "ابدأ كل مثال بسؤال: هل ننظر إلى النشاط من خارج الحدث (حدث مستقبلي) أم من داخله (كاميرا داخل اللحظة)؟",
      "لا تعلّم will be + V-ing كصيغة حفظ فقط؛ اربطها دائمًا بلحظة مرجعية أو حدث متقاطع أو برنامج متوقع.",
      "ذكّر الطالب أن will be لا يتغير مع الضمائر، وأن الفعل بعد be يكون دائمًا بصيغة -ing.",
    ],
  },
  {
    head: "when وwhile ليستا حظرًا مطلقًا",
    lines: [
      "بعد when الزمنية نستخدم المضارع البسيط للدلالة على المستقبل: When you arrive…",
      "في السؤال المباشر (When will you arrive?) والسؤال غير المباشر (I don't know when you will arrive) يبقى will صحيحًا لأن الجملة ليست جملة زمنية.",
      "في while يمكن أن تأتي الجملة المصاحبة بالمضارع المستمر (كما في المصدر) أو بالمضارع البسيط، وكلتاهما مقبولة بحسب ما يبرزه المتحدث.",
    ],
  },
  {
    head: "فروق الأزمنة تداولية لا حظرية",
    lines: [
      "Future Simple وBE GOING TO وFuture Continuous قد تصف الحدث نفسه بزوايا نظر مختلفة؛ لا تصحح جملة صحيحة نحويًا على أنها «خطأ».",
      "اسأل: هل أقدّمه كقرار؟ كخطة؟ أم أتخيل لحظة وأصف نشاطًا جاريًا فيها؟",
      "تعبير زمني مثل tomorrow لا يفرض زمنًا بحد ذاته.",
    ],
  },
  {
    head: "الاختبار والكتابة",
    lines: [
      "الاختبار الرسمي 25 سؤالًا: 5 اختيار، 5 إكمال، 5 تصحيح، 5 فهم معنى، 5 فقرة Maya.",
      "الأسئلة 16–20 تقبل صياغات متعددة؛ صحّح على المعنى لا على التطابق اللفظي (المعايير في تبويب الحلول).",
      "في مهمة الكتابة راجع الشروط الثمانية بندًا بندًا، ولا تخصم لأن الطالب استخدم أفكارًا مختلفة عن النموذج.",
    ],
  },
];

export default function TeacherGuide37({ onGoSolutions, onLock }: { onGoSolutions: () => void; onLock: () => void }) {
  const [tab, setTab] = useState<TabId37>("coverage");
  return (
    <div data-area="lesson37-teacher" className="space-y-3">
      <section className="overflow-hidden rounded-3xl border border-[#bae6fd] bg-white shadow-sm">
        <div className="fh37-header__beam" />
        <div className="p-4 sm:p-5">
          <p className="font-en text-[11px] font-black uppercase tracking-[.16em] text-[#0369a1]" dir="ltr">
            Teacher Area · Lesson 37 · Future Horizon
          </p>
          <h2 className="mt-1 text-xl font-black text-[#0c4a6e]">دليل المعلم — Future Continuous</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-4">
            {[
              { k: "أقسام المصدر", v: `${SOURCE_NUMBERED_COUNT_37} قسمًا مرقّمًا + المقدمة` },
              { k: "خطوات الطالب", v: `${STEP_COUNT_37} خطوة قصيرة` },
              { k: "الاختبار الرسمي", v: "25 سؤالًا · 5 مستويات × 5" },
              { k: "الحلول", v: "25 حلًا تفصيليًا موسومًا" },
            ].map((entry) => (
              <div key={entry.k} className="rounded-xl border border-[#bae6fd] bg-[#f8fbff] px-3 py-2">
                <p className="text-[11px] font-black text-[#0369a1]">{entry.k}</p>
                <p className="mt-0.5 text-sm font-bold text-[#0f172a]">{entry.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <ActionButton37 variant="secondary" onClick={onGoSolutions}>
              فتح منطقة الحلول
            </ActionButton37>
            <ActionButton37 variant="secondary" onClick={onLock}>
              قفل منطقة المعلم
            </ActionButton37>
          </div>
        </div>
      </section>

      <nav aria-label="أقسام دليل المعلم" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {TABS_37.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`${FOCUS_37} min-h-12 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              tab === item.id
                ? "border-[#0f766e] bg-[#0f766e] text-white"
                : "border-[#7dd3fc] bg-white text-[#0c4a6e] hover:bg-[#e0f2fe]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {tab === "coverage" ? (
        <section aria-label="خريطة تغطية أقسام المصدر" className="space-y-3">
          <PlatformNote37>
            كل صف أدناه يربط قسمًا مصدريًا بموضعه في الدرس الجديد، ويبيّن ما نُقل كما هو، وما أُعيد بناء تنسيقه، وما أضافته المنصة، وأي ملاحظة
            دقة على المصدر. الجدول يغطي المقدمة و{COVERAGE_SECTION_COUNT_37} قسمًا مرقّمًا.
          </PlatformNote37>
          <div className="overflow-x-auto rounded-2xl border border-[#bae6fd] bg-white">
            <table dir="rtl" aria-label="سجل تغطية أقسام المصدر" className="w-full min-w-[46rem] border-collapse text-sm">
              <caption className="sr-only">سجل تغطية المصدر للدرس 37</caption>
              <thead>
                <tr className="bg-[#0c4a6e] text-white">
                  {["القسم", "المحتوى المطلوب", "الموضع في الدرس", "حالة النقل", "إضافة المنصة", "ملاحظة دقة"].map((header) => (
                    <th key={header} scope="col" className="px-3 py-2 text-right font-black">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COVERAGE_37.map((row, index) => (
                  <tr key={row.id} data-coverage-section={row.num ?? "cover"} className={index % 2 === 0 ? "bg-white" : "bg-[#f8fbff]"}>
                    <th scope="row" className="border-t border-[#bae6fd] px-3 py-2 text-right align-top font-black text-[#0c4a6e]">
                      <span dir="ltr" className="font-en">{row.num == null ? "COVER" : `§${row.num}`}</span>
                      <span className="mt-1 block text-xs font-bold text-[#334155]">
                        <Rich text={row.title} />
                      </span>
                    </th>
                    <td className="border-t border-[#bae6fd] px-3 py-2 align-top leading-6 text-[#1e293b]">
                      <Rich text={row.elements} />
                    </td>
                    <td className="border-t border-[#bae6fd] px-3 py-2 align-top leading-6 text-[#1e293b]">
                      <Rich text={row.location} />
                    </td>
                    <td className="border-t border-[#bae6fd] px-3 py-2 align-top leading-6">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-black ${
                          row.transfer === "verbatim"
                            ? "bg-[#ccfbf1] text-[#115e59]"
                            : row.transfer === "table-rebuilt"
                              ? "bg-[#fef3c7] text-[#92400e]"
                              : "bg-[#dbeafe] text-[#1e40af]"
                        }`}
                      >
                        {row.transfer === "verbatim"
                          ? "منقول كما هو"
                          : row.transfer === "table-rebuilt"
                            ? "تنسيق أُعيد بناؤه"
                            : "مفتاح غير موجود في المصدر"}
                      </span>
                    </td>
                    <td className="border-t border-[#bae6fd] px-3 py-2 align-top leading-6 text-[#1e293b]">
                      {row.platformAddition ? <Rich text={row.platformAddition} /> : <span className="text-[#334155]">—</span>}
                    </td>
                    <td className="border-t border-[#bae6fd] px-3 py-2 align-top leading-6 text-[#1e293b]">
                      {row.accuracyNote ? <Rich text={row.accuracyNote} /> : <span className="text-[#334155]">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {tab === "keys" ? (
        <section aria-label="مفاتيح التدريبات والقراءة" className="space-y-3">
          <details open className="rounded-2xl border border-[#bae6fd] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#0c4a6e]">§28 · التدريب التأسيسي (6 أسئلة)</summary>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#1e293b]">
              {EXERCISE28_ITEMS_37.map((item) => (
                <li key={item.n}>
                  <span dir="ltr" className="font-en">{item.prompt}</span> →{" "}
                  <span dir="ltr" className="font-en font-black text-[#115e59]">{`${item.answer} — ${item.answerText}`}</span>
                </li>
              ))}
            </ul>
          </details>

          <details className="rounded-2xl border border-[#bae6fd] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#0c4a6e]">§29 · تدريب التحويلات (5 بنود × نفي + سؤال)</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#1e293b]">
              {TRANSFORM29_ITEMS_37.map((item) => (
                <li key={item.n}>
                  <p dir="ltr" className="font-en text-left font-bold text-[#0f172a]">{item.base}</p>
                  <p dir="ltr" className="font-en text-[#115e59]">➖ {item.negative}</p>
                  <p dir="ltr" className="font-en text-[#115e59]">❓ {item.question}</p>
                </li>
              ))}
            </ul>
          </details>

          <details className="rounded-2xl border border-[#bae6fd] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#0c4a6e]">§30 · Grammar Detective (10 جمل + سبب الخطأ)</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#1e293b]">
              {DETECTIVE30_ITEMS_37.map((item) => (
                <li key={item.n}>
                  <p dir="ltr" className="font-en text-left text-[#9f1239]">{`${item.n}. ${item.prompt}`}</p>
                  <p dir="ltr" className="font-en text-left font-black text-[#115e59]">{item.answer}</p>
                  <p>
                    <Rich text={item.why} />
                  </p>
                </li>
              ))}
            </ul>
          </details>

          <details className="rounded-2xl border border-[#bae6fd] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#0c4a6e]">§31 · IQ200 (8 مواقف + تبرير الزمن)</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#1e293b]">
              {IQ200_ITEMS_37.map((item) => (
                <li key={item.n}>
                  <p dir="ltr" className="font-en text-left">{item.lines.join(" / ")}</p>
                  <p className="font-black text-[#115e59]" dir="ltr">{item.answerText}</p>
                  <p>
                    <Rich text={item.why} />
                  </p>
                </li>
              ))}
            </ul>
          </details>

          <details className="rounded-2xl border border-[#bae6fd] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#0c4a6e]">
              <Rich text="§32 · Reading — A Busy Saturday (الأسئلة والإجابات)" />
            </summary>
            <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm leading-6 text-[#1e293b]">
              {READING32_QUESTIONS_37.map((question, index) => (
                <li key={question}>
                  <span dir="ltr" className="font-en inline-block text-left">{question}</span>
                  <span className="mt-0.5 block rounded bg-[#f0fdfa] px-2 py-1 text-xs font-bold text-[#115e59]" dir="ltr">
                    {["He will be having breakfast with his family.",
                      "He will be attending a robotics workshop.",
                      "Because Daniel will be learning how to program a small robot.",
                      "He will be travelling back home.",
                      "He is going to visit his grandparents.",
                      "Because he arranged the visit earlier in the week.",
                      "He will be preparing his school presentation.",
                      "Because she wants to know whether the computer will be available."][index]}
                  </span>
                </li>
              ))}
            </ol>
            <h4 className="mt-3 text-sm font-black text-[#0c4a6e]">تحليل صيغ النص — إضافة من المنصة</h4>
            <ul className="mt-1 space-y-2 text-sm leading-6 text-[#1e293b]">
              {READING32_ANALYSIS_37.map((entry) => (
                <li key={entry.line}>
                  <p dir="ltr" className="font-en text-left font-semibold text-[#0f172a]">{entry.line}</p>
                  <span dir="ltr" className="font-en block w-fit rounded bg-[#e0f2fe] px-2 font-black text-[#0c4a6e]">{entry.form}</span>
                  <Rich text={entry.why} />
                </li>
              ))}
            </ul>
          </details>

          <details className="rounded-2xl border border-[#bae6fd] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#0c4a6e]">§33 · التحدي المتقدم (هل الزمنان صحيحان؟)</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#1e293b]">
              {ADVANCED33_ITEMS_37.map((item) => (
                <li key={item.id}>
                  <p className="font-bold">
                    <Rich text={item.prompt} />
                  </p>
                  <p className="rounded bg-[#f0fdfa] px-2 py-1 text-xs font-bold text-[#115e59]">
                    <Rich text={item.feedback} />
                  </p>
                </li>
              ))}
            </ul>
          </details>

          <details className="rounded-2xl border border-[#bae6fd] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#0c4a6e]">§14 · تحليل حوار Tomorrow’s Schedule</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#1e293b]">
              {DIALOGUE_LINES_37.map((line) => (
                <li key={line.id}>
                  <p dir="ltr" className="font-en text-left font-semibold text-[#0f172a]">
                    {line.speaker}: {line.en}
                  </p>
                  <p dir="rtl">
                    <Rich text={line.ar} />
                  </p>
                  <span dir="ltr" className="font-en block w-fit rounded bg-[#e0f2fe] px-2 font-black text-[#0c4a6e]">{line.form}</span>
                  <Rich text={line.analysis} />
                </li>
              ))}
            </ul>
          </details>
        </section>
      ) : null}

      {tab === "solutions" ? (
        <section aria-label="حلول الاختبار النهائي" className="space-y-3">
          <PlatformNote37>
            المصدر §35 لا يقدّم مفتاحًا؛ الحلول أدناه من إعداد المنصة/المعلم، وكل بطاقة تحمل: السؤال، الإجابة، البدائل المقبولة، وسبب الاختيار.
          </PlatformNote37>
          <ol className="space-y-2">
            {TEST_SOLUTIONS_37.map((solution) => {
              const question = TEST_37.find((entry) => entry.n === solution.n);
              return (
                <li key={solution.n} data-teacher-solution={solution.n} className="rounded-2xl border border-[#bae6fd] bg-white p-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-black text-[#0c4a6e]">
                      السؤال <span dir="ltr" className="font-en">{solution.n}</span>
                    </p>
                    <span className="rounded-full border border-[#7dd3fc] bg-[#e0f2fe] px-2.5 py-0.5 text-[11px] font-black text-[#0c4a6e]">
                      المستوى {solution.level}
                    </span>
                  </div>
                  {question ? (
                    <p dir="auto" className="mt-1 rounded bg-[#f8fbff] px-2 py-1 text-sm font-semibold leading-6 text-[#1e293b]">
                      {question.promptLines.join(" / ")}
                    </p>
                  ) : null}
                  <p className="mt-1.5 text-sm">
                    <span className="font-black text-[#0c4a6e]">الإجابة: </span>
                    <span dir="auto" className="font-en font-black text-[#115e59]">{solution.answer}</span>
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#1e293b]">
                    <span className="font-black text-[#0c4a6e]">السبب: </span>
                    <Rich text={solution.explanation} />
                  </p>
                  {solution.alternatives?.length ? (
                    <ul className="mt-1 list-disc space-y-0.5 ps-5 text-xs leading-6 text-[#334155]">
                      {solution.alternatives.map((line) => (
                        <li key={line}>
                          <Rich text={line} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </section>
      ) : null}

      {tab === "rules" ? (
        <section aria-label="ملاحظات المعلم والقواعد" className="space-y-3">
          <details open className="rounded-2xl border border-[#bae6fd] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#0c4a6e]">ملاحظات دقة على المصدر</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#1e293b]">
              {COVERAGE_ACCURACY_NOTES_37.map((row) => (
                <li key={`note-${row.id}`}>
                  <span dir="ltr" className="font-en mr-1 font-black text-[#0369a1]">§{row.num}</span>
                  <Rich text={row.accuracyNote ?? ""} />
                </li>
              ))}
            </ul>
          </details>

          <details open className="rounded-2xl border border-[#bae6fd] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#0c4a6e]">الأهداف وأكثر الأخطاء المتوقعة</summary>
            <div className="mt-2 grid gap-3 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-black text-[#0c4a6e]">أهداف الدرس العشرة (كما وردت)</h4>
                <ol className="mt-1 space-y-1 text-sm leading-6 text-[#1e293b]">
                  {OBJECTIVES_37.map((objective) => (
                    <li key={objective}>
                      <Rich text={objective} />
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="text-sm font-black text-[#0c4a6e]">أخطاء يُتوقع تكرارها</h4>
                <ul className="mt-1 list-disc space-y-1 ps-5 text-sm leading-6 text-[#1e293b]">
                  {EXPECTED_ERRORS_37.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </details>

          <details className="rounded-2xl border border-[#bae6fd] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#0c4a6e]">ملاحظات تدريسية</summary>
            <div className="mt-2 space-y-3">
              {TEACHING_NOTES_37.map((note) => (
                <div key={note.head}>
                  <h4 className="text-sm font-black text-[#0c4a6e]">{note.head}</h4>
                  <ul className="mt-1 list-disc space-y-1 ps-5 text-sm leading-6 text-[#1e293b]">
                    {note.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>

          <details className="rounded-2xl border border-[#bae6fd] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#0c4a6e]">§36 · نموذج الكتابة ومعايير المراجعة</summary>
            <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm leading-6 text-[#1e293b]">
              {WRITING36_CRITERIA_37.map((criterion) => (
                <li key={criterion}>
                  <Rich text={criterion} />
                </li>
              ))}
            </ol>
            <h4 className="mt-2 text-sm font-black text-[#0c4a6e]">النموذج الإرشادي من المصدر</h4>
            {WRITING36_MODEL_37.map((line) => (
              <p key={line} dir="ltr" className="font-en mt-1 rounded bg-[#f8fbff] px-2 py-1 text-left text-sm leading-6 text-[#0f172a]">
                {line}
              </p>
            ))}
            <div className="mt-2 rounded-xl border border-[#fcd34d] bg-[#fef3c7] p-2.5 text-sm leading-6 text-[#92400e]">
              <p className="font-black">معايير مراجعة إنتاج الطالب (20 نقطة · اقتراح من المنصة)</p>
              <ul className="mt-1 list-disc space-y-0.5 ps-5">
                <li>اكتمال الشروط الثمانية: 8 نقاط.</li>
                <li>دقة الصيغة (will be + V-ing) والنفي والسؤال: 4 نقاط.</li>
                <li>استخدام when مع Future Continuous بشكل صحيح: 2 نقطة.</li>
                <li>الطول 12–15 جملة وترابط الفقرة: 3 نقاط.</li>
                <li>تنوع التعبيرات الزمنية وطبيعية السياق: 3 نقاط.</li>
              </ul>
            </div>
          </details>
        </section>
      ) : null}
    </div>
  );
}
