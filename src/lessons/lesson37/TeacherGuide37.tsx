import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { COVERAGE_37, COVERAGE_ACCURACY_NOTES_37, COVERAGE_SECTION_COUNT_37 } from "./coverage37";
import { SOURCE_SECTIONS_37, SOURCE_NUMBERED_COUNT_37 } from "./ledger37";
import { TEST_SOLUTIONS_37 } from "./solutionsData37";
import {
  DETECTIVE30_ITEMS_37,
  DIALOGUE_LINES_37,
  EXERCISE28_ITEMS_37,
  IQ200_ITEMS_37,
  READING32_ANALYSIS_37,
  READING32_QUESTIONS_37,
  TRANSFORM29_ITEMS_37,
  WRITING36_CRITERIA_37,
  WRITING36_MODEL_37,
} from "./practiceData37";
import { ActionButton37, FOCUS_37, PlatformNote37 } from "./kit37";

const TABS_37 = [
  { id: "coverage", label: "خريطة التغطية" },
  { id: "keys", label: "مفاتيح التدريب والقراءة" },
  { id: "solutions", label: "حلول الاختبار Q1–Q25" },
  { id: "rules", label: "القواعد والملاحظات التعليمية" },
] as const;

type TabId37 = (typeof TABS_37)[number]["id"];

export default function TeacherGuide37({ onGoSolutions, onLock }: { onGoSolutions: () => void; onLock: () => void }) {
  const [tab, setTab] = useState<TabId37>("coverage");
  return (
    <div data-area="lesson37-teacher" className="space-y-4">
      <section className="rounded-3xl border border-[#d8d2c5] bg-white p-4 shadow-sm sm:p-5">
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">Teacher Area · Lesson 37</p>
        <h2 className="mt-1 text-xl font-black text-[#17354a]">دليل المعلم — Future Continuous</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {[
            { k: "أقسام المصدر", v: `${SOURCE_NUMBERED_COUNT_37} قسمًا مرقّمًا + المقدمة` },
            { k: "خطوات الطالب", v: "39 خطوة (المقدمة + 38 قسمًا)" },
            { k: "الاختبار الرسمي", v: "25 سؤالًا · 5 مستويات × 5" },
            { k: "الحلول", v: "25 حلًا تفصيليًا موسومًا" },
          ].map((entry) => (
            <div key={entry.k} className="rounded-xl border border-[#d8d2c5] bg-[#fdfcf8] px-3 py-2">
              <p className="text-xs font-black text-[#53676a]">{entry.k}</p>
              <p className="mt-0.5 text-sm font-bold text-[#24343b]">{entry.v}</p>
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
      </section>

      <nav aria-label="أقسام دليل المعلم" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {TABS_37.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`${FOCUS_37} min-h-12 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              tab === item.id ? "border-[#245f62] bg-[#245f62] text-white" : "border-[#cfd8d2] bg-white text-[#24343b] hover:bg-[#eef4f0]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {tab === "coverage" ? (
        <section aria-label="خريطة تغطية أقسام المصدر" className="space-y-3">
          <PlatformNote37>
            كل صف أدناه يربط قسمًا مصدريًا بموضعه في الدرس الجديد، ويبيّن ما نُقل كما هو، وما أُعيد بناء تنسيقه، وما أضافته المنصة، وأي
            ملاحظة دقة على المصدر. الجدول يغطي المقدمة و{COVERAGE_SECTION_COUNT_37} قسمًا مرقّمًا.
          </PlatformNote37>
          <div className="overflow-x-auto rounded-2xl border border-[#d8d2c5] bg-white">
            <table dir="rtl" aria-label="سجل تغطية أقسام المصدر" className="w-full min-w-[46rem] border-collapse text-sm">
              <caption className="sr-only">سجل تغطية المصدر للدرس 37</caption>
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
                {COVERAGE_37.map((row, index) => (
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
                        {row.transfer === "verbatim" ? "منقول كما هو" : row.transfer === "table-rebuilt" ? "تنسيق أُعيد بناؤه" : "مفتاح غير موجود في المصدر"}
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
            <summary className="cursor-pointer font-black text-[#17354a]">§28 · التدريب التأسيسي (6 أسئلة)</summary>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#24343b]">
              {EXERCISE28_ITEMS_37.map((item) => (
                <li key={item.n}>
                  <span dir="ltr" className="font-en">
                    {item.prompt}
                  </span>{" "}
                  → <span dir="ltr" className="font-en font-black">{`${item.answer} — ${item.answerText}`}</span>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">§29 · تدريب التحويلات (5 بنود × نفي + سؤال)</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {TRANSFORM29_ITEMS_37.map((item) => (
                <li key={item.n}>
                  <p dir="ltr" className="font-en text-left font-bold text-[#18333b]">
                    {item.base}
                  </p>
                  <p dir="ltr" className="font-en">
                    ➖ {item.negative}
                  </p>
                  <p dir="ltr" className="font-en">
                    ❓ {item.question}
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">§30 · Grammar Detective (10 جمل)</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {DETECTIVE30_ITEMS_37.map((item) => (
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
            <summary className="cursor-pointer font-black text-[#17354a]">§31 · IQ200 (8 مواقف)</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {IQ200_ITEMS_37.map((item) => (
                <li key={item.n}>
                  <p dir="ltr" className="font-en text-left">
                    {item.lines.join(" / ")}
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
          </details>
          <details className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">
              <Rich text="§32 · Reading — A Busy Saturday (أسئلة وتحليل)" />
            </summary>
            <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm leading-6 text-[#24343b]">
              {READING32_QUESTIONS_37.map((question) => (
                <li key={question}>
                  <span dir="ltr" className="font-en inline-block">
                    {question}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-sm font-bold text-[#28533b]">إجابات المصدر معروضة داخل تسلسل خطوة §32 (بعد محاولة الطالب).</p>
            <h4 className="mt-3 text-sm font-black text-[#17354a]">تحليل الصيغ في النص — إضافة من المنصة</h4>
            <ul className="mt-1 space-y-2 text-sm leading-6 text-[#24343b]">
              {READING32_ANALYSIS_37.map((entry) => (
                <li key={entry.line}>
                  <p dir="ltr" className="font-en text-left text-[#18333b]">
                    {entry.line}
                  </p>
                  <p>
                    <span dir="ltr" className="font-en block w-fit font-black">{entry.form}</span>
                    <Rich text={entry.why} />
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">§14 · تحليل حوار Tomorrow&apos;s Schedule</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {DIALOGUE_LINES_37.map((line) => (
                <li key={line.id}>
                  <p dir="ltr" className="font-en text-left">
                    {line.speaker}: {line.en}
                  </p>
                  <p dir="rtl">
                    <Rich text={line.ar} />
                  </p>
                  <p>
                    <span dir="ltr" className="font-en block w-fit font-black">{line.form}</span>
                    <Rich text={line.analysis} />
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#17354a]">
              <Rich text="§36 · Writing Mission — الشروط والنموذج" />
            </summary>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-6 text-[#24343b]">
              {WRITING36_CRITERIA_37.map((criterion) => (
                <li key={criterion}>
                  <Rich text={criterion} />
                </li>
              ))}
            </ul>
            <h4 className="mt-2 text-sm font-black text-[#17354a]">نموذج المصدر (لا يُنسخ)</h4>
            <ul className="mt-1 space-y-1 text-sm leading-6">
              {WRITING36_MODEL_37.map((line) => (
                <li key={line} dir="ltr" className="font-en text-left text-[#18333b]">
                  {line}
                </li>
              ))}
            </ul>
          </details>
        </section>
      ) : null}

      {tab === "solutions" ? (
        <section aria-label="حلول اختبار الدرس 37" className="space-y-2">
          <PlatformNote37>
            نص المصدر §35 لا يحتوي مفتاحًا فعليًا؛ كل حل أدناه من إعداد المنصة/المعلم، مع نموذج وبدائل مقبولة في الأسئلة المفتوحة.
          </PlatformNote37>
          {TEST_SOLUTIONS_37.map((solution) => (
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
                  {solution.judgment === "open-model" ? "نموذج مفتوح" : solution.judgment === "grammatical-repair" ? "تصحيح نحوي" : solution.judgment === "contextual" ? "سياقي" : "صيغة محددة"}
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
        <section aria-label="مرجع القواعد وملاحظات الدقة" className="space-y-3">
          <div className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <h3 className="font-black text-[#17354a]">مرجع سريع</h3>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#24343b]">
              <li>
                <Rich text="الصيغة: Subject + will + be + V-ing — مع جميع الضمائر بلا تغيير (§3 · §5)." />
              </li>
              <li>
                <Rich text="النفي: Subject + won't (will not) + be + V-ing (§18)." />
              </li>
              <li>
                <Rich text="السؤال: Will + Subject + be + V-ing? (§20)." />
              </li>
              <li>
                <Rich text="الإجابة القصيرة: Yes, I will. / No, I won't. — دون تكرار be + V-ing (§21)." />
              </li>
              <li>
                <Rich text="أسئلة المعلومات: Wh-word + will + Subject + be + V-ing? (§22)." />
              </li>
              <li>
                when الزمنية ← Present Simple، والسؤال المباشر وغير المباشر ← will (§12).
              </li>
              <li>
                while: Present Continuous (أو Present Simple) في جملة while مقابل Future Continuous في الجملة الرئيسية (§13).
              </li>
              <li>
                أفعال الحالة: لا تُستخدم عادةً في الصيغ المستمرة ما دامت بمعنى الحالة (§25).
              </li>
              <li>
                الأزمنة المستمرة الثلاثة: الفكرة واحدة (نشاط جارٍ عند نقطة)، والاختلاف موقع النقطة على الخط الزمني (§26).
              </li>
              <li>
                Future Simple يقدّم الحدث عمومًا، وBE GOING TO يبرز الخطة أو التوقع بدليل، وFuture Continuous يبرز النشاط الجاري خلال فترة أو عند
                نقطة مستقبلية (§9 · §10 · §27 · §33).
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <h3 className="font-black text-[#17354a]">ملاحظات دقة على المصدر (بلا تعديل صامت)</h3>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#24343b]">
              {COVERAGE_ACCURACY_NOTES_37.map((row) => (
                <li key={row.id}>
                  <p className="font-black text-[#17354a]">
                    <span dir="ltr" className="font-en">
                      §{row.num}
                    </span>{" "}
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
              {SOURCE_SECTIONS_37.filter((section) => section.num != null).map((section) => (
                <li key={section.id}>
                  <span className="font-bold">
                    <Rich text={section.title} />
                  </span>{" "}
                  <span className="text-xs text-[#53676a]">
                    · <span dir="ltr" className="font-en">{section.units.length}</span> سطرًا
                    {section.revealUnits?.length ? ` · ${section.revealUnits.length} سطر حل` : ""}
                    {section.tableRows ? " · جدول" : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
    </div>
  );
}
