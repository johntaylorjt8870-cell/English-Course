import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { COVERAGE_38, COVERAGE_ACCURACY_NOTES_38, COVERAGE_SECTION_COUNT_38 } from "./coverage38";
import { SOURCE_SECTIONS_38, SOURCE_NUMBERED_COUNT_38 } from "./ledger38";
import { TEST_SOLUTIONS_38 } from "./solutionsData38";
import {
  DETECTIVE30_ITEMS_38,
  DIALOGUE2_LINES_38,
  DIALOGUE_LINES_38,
  EXERCISE27_ITEMS_38,
  FILL28_ITEMS_38,
  READING32_ANALYSIS_38,
  READING32_QUESTIONS_38,
  TENSE29_ITEMS_38,
  WRITING35_CRITERIA_38,
  WRITING35_MODEL_38,
} from "./practiceData38";
import { ActionButton38, FOCUS_38, FinishLine38, PlatformNote38, Table38 } from "./kit38";
import { STEP_COUNT_38 } from "./data";

const TABS_38 = [
  { id: "coverage", label: "خريطة التغطية" },
  { id: "keys", label: "مفاتيح التدريب والقراءة" },
  { id: "solutions", label: "حلول الاختبار Q1–Q25" },
  { id: "rules", label: "القواعد والدقة" },
] as const;

type TabId38 = (typeof TABS_38)[number]["id"];

export default function TeacherGuide38({ onGoSolutions, onLock }: { onGoSolutions: () => void; onLock: () => void }) {
  const [tab, setTab] = useState<TabId38>("coverage");
  return (
    <div data-area="lesson38-teacher" className="space-y-4">
      <section className="fp38-card">
        <FinishLine38 label="TEACHER" />
        <p className="fp38-eyebrow mt-2">Teacher Area · Lesson 38</p>
        <h2 className="mt-1 text-xl font-black text-[#122033]">دليل المعلم — Future Perfect</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {[
            { k: "أقسام المصدر", v: `${SOURCE_NUMBERED_COUNT_38} قسمًا مرقّمًا + المقدمة` },
            { k: "خطوات الطالب", v: `${STEP_COUNT_38} خطوة قصيرة` },
            { k: "الاختبار الرسمي", v: "25 سؤالًا · 5 مستويات × 5" },
            { k: "الحلول", v: "25 حلًا تفصيليًا موسومًا" },
          ].map((entry) => (
            <div key={entry.k} className="rounded-xl border border-[#d9cbb0] bg-[#fffdf6] px-3 py-2">
              <p className="text-xs font-black text-[#4a5568]">{entry.k}</p>
              <p className="mt-0.5 text-sm font-bold text-[#122033]">{entry.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <ActionButton38 variant="secondary" onClick={onGoSolutions}>
            فتح منطقة الحلول
          </ActionButton38>
          <ActionButton38 variant="secondary" onClick={onLock}>
            قفل منطقة المعلم
          </ActionButton38>
        </div>
      </section>

      <nav aria-label="أقسام دليل المعلم" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {TABS_38.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`fp38-tab ${FOCUS_38} font-black`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {tab === "coverage" ? (
        <section aria-label="خريطة تغطية أقسام المصدر" className="space-y-3">
          <PlatformNote38>
            كل صف يربط قسمًا مصدريًا بموضعه في الخطوات الجديدة، ويبيّن ما نُقل كما هو، وما أُعيد بناء تنسيقه، وما أضافته المنصة، وأي ملاحظة دقة
            على المصدر. يغطي الجدول المقدمة و{COVERAGE_SECTION_COUNT_38} قسمًا مرقّمًا.
          </PlatformNote38>
          <div className="fp38-tablewrap">
            <table dir="rtl" aria-label="سجل تغطية أقسام المصدر" className="w-full min-w-[46rem] border-collapse text-sm">
              <caption className="sr-only">سجل تغطية المصدر للدرس 38</caption>
              <thead>
                <tr className="bg-[#1b3a5c] text-white">
                  {["القسم", "المحتوى المطلوب", "الموضع", "حالة النقل", "إضافة المنصة", "ملاحظة دقة"].map((header) => (
                    <th key={header} scope="col" className="px-3 py-2 text-right font-black">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COVERAGE_38.map((row, index) => (
                  <tr key={row.id} data-coverage-section={row.id} className={index % 2 === 0 ? "bg-white" : "bg-[#f7f2e4]"}>
                    <th scope="row" className="border-t border-[#ebe3d0] px-3 py-2 text-right align-top font-black text-[#1b3a5c]">
                      <span dir="ltr" className="font-en">
                        {row.id === "roadmap" ? "MAP" : row.num == null ? "COVER" : `§${row.num}`}
                      </span>
                      <span className="mt-1 block text-xs font-bold text-[#3d4a5c]">
                        <Rich text={row.title} />
                      </span>
                    </th>
                    <td className="border-t border-[#ebe3d0] px-3 py-2 align-top leading-6 text-[#1a2433]"><Rich text={row.elements} /></td>
                    <td className="border-t border-[#ebe3d0] px-3 py-2 align-top leading-6 text-[#1a2433]"><Rich text={row.location} /></td>
                    <td className="border-t border-[#ebe3d0] px-3 py-2 align-top leading-6">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-black ${row.transfer === "verbatim" ? "bg-[#f0faf2] text-[#1c6b3c]" : row.transfer === "table-rebuilt" ? "bg-[#fff8e1] text-[#7c4a03]" : "bg-[#f5f3ff] text-[#5b21b6]"}`}>
                        {row.transfer === "verbatim" ? "منقول كما هو" : row.transfer === "table-rebuilt" ? "تنسيق أُعيد بناؤه" : "مفتاح غير موجود في المصدر"}
                      </span>
                    </td>
                    <td className="border-t border-[#ebe3d0] px-3 py-2 align-top leading-6 text-[#1a2433]">{row.platformAddition ? <Rich text={row.platformAddition} /> : <span className="text-[#4a5568]">—</span>}</td>
                    <td className="border-t border-[#ebe3d0] px-3 py-2 align-top leading-6 text-[#1a2433]">{row.accuracyNote ? <Rich text={row.accuracyNote} /> : <span className="text-[#4a5568]">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {tab === "keys" ? (
        <section aria-label="مفاتيح تدريبات الدرس والقراءة" className="space-y-3">
          <details open className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#1b3a5c]">§27 · التدريب الأول (6 أسئلة)</summary>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#1a2433]">
              {EXERCISE27_ITEMS_38.map((item) => (
                <li key={item.n}>
                  <span dir="ltr" className="font-en">{item.prompt}</span> →{" "}
                  <span dir="ltr" className="font-en font-black">{`${item.answer} — ${item.answerText}`}</span>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#1b3a5c]">§28 · التدريب الثاني (6 إكمالات)</summary>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#1a2433]">
              {FILL28_ITEMS_38.map((item) => (
                <li key={item.n}>
                  <span dir="ltr" className="font-en">{item.prompt}</span> →{" "}
                  <span dir="ltr" className="font-en font-black">{item.answer}</span>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#1b3a5c]">§29 · اختيار الزمن (8 مواقف)</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#1a2433]">
              {TENSE29_ITEMS_38.map((item) => (
                <li key={item.n}>
                  <p dir="ltr" className="font-en text-left">{item.prompt}</p>
                  <p>
                    <span dir="ltr" className="font-en block font-black">{item.answerText}</span>
                    <Rich text={item.why} />
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#1b3a5c]">§30 · Grammar Detective (10 جمل)</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#1a2433]">
              {DETECTIVE30_ITEMS_38.map((item) => (
                <li key={item.n}>
                  <p dir="ltr" className="font-en text-left text-[#a41c36]">{`${item.n}. ${item.prompt}`}</p>
                  <p dir="ltr" className="font-en text-left font-black text-[#1c6b3c]">{item.answer}</p>
                  <p><Rich text={item.why} /></p>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#1b3a5c]">
              <Rich text="§32 · Reading — Building a Smarter City" />
            </summary>
            <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm leading-6 text-[#1a2433]">
              {READING32_QUESTIONS_38.map((question) => (
                <li key={question} dir="ltr" className="font-en text-left">{question}</li>
              ))}
            </ol>
            <p className="mt-2 text-sm font-bold text-[#1c6b3c]">إجابات المصدر تظهر داخل خطوة §32ب بعد إكمال المحاولة.</p>
            <h4 className="mt-3 text-sm font-black text-[#1b3a5c]">تحليل الصيغ في النص — إضافة من المنصة</h4>
            <ul className="mt-1 space-y-2 text-sm leading-6 text-[#1a2433]">
              {READING32_ANALYSIS_38.map((entry) => (
                <li key={entry.line}>
                  <p dir="ltr" className="font-en text-left text-[#122033]">{entry.line}</p>
                  <p>
                    <span dir="ltr" className="font-en block w-fit font-black">{entry.form}</span>
                    <Rich text={entry.why} />
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#1b3a5c]">§13 · The School Exhibition — الترجمة والتحليل</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#1a2433]">
              {DIALOGUE_LINES_38.map((line) => (
                <li key={line.id}>
                  <p dir="ltr" className="font-en text-left">{line.speaker}: {line.en}</p>
                  <p><Rich text={line.ar} /></p>
                  <p>
                    <span dir="ltr" className="font-en block w-fit font-black">{line.form}</span>
                    <Rich text={line.analysis} />
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#1b3a5c]">§26 · Planning a Big Event — الترجمة والتحليل</summary>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#1a2433]">
              {DIALOGUE2_LINES_38.map((line) => (
                <li key={line.id}>
                  <p dir="ltr" className="font-en text-left">{line.speaker}: {line.en}</p>
                  <p><Rich text={line.ar} /></p>
                  <p>
                    <span dir="ltr" className="font-en block w-fit font-black">{line.form}</span>
                    <Rich text={line.analysis} />
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <summary className="cursor-pointer font-black text-[#1b3a5c]">
              <Rich text="§35 · Writing Mission — الشروط والنموذج" />
            </summary>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-6 text-[#1a2433]">
              {WRITING35_CRITERIA_38.map((criterion) => (
                <li key={criterion}><Rich text={criterion} /></li>
              ))}
            </ul>
            <h4 className="mt-2 text-sm font-black text-[#1b3a5c]">نموذج المصدر (لا يُنسخ)</h4>
            <ul className="mt-1 space-y-1 text-sm leading-6">
              {WRITING35_MODEL_38.map((line) => (
                <li key={line} dir="ltr" className="font-en text-left text-[#122033]">{line}</li>
              ))}
            </ul>
          </details>
        </section>
      ) : null}

      {tab === "solutions" ? (
        <section aria-label="حلول اختبار الدرس 38" className="space-y-2">
          <PlatformNote38>
            نص المصدر §34 لا يحتوي مفتاحًا فعليًا؛ كل حل أدناه من إعداد المنصة/المعلم، مع نموذج وبدائل مقبولة في الأسئلة المفتوحة، وسبب خطأ
            البدائل في أسئلة الاختيار.
          </PlatformNote38>
          {TEST_SOLUTIONS_38.map((solution) => (
            <article key={solution.n} data-teacher-solution={solution.n} className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
              <header className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-black text-[#1b3a5c]">
                  السؤال <span dir="ltr" className="font-en">{solution.n}</span>
                  <span className="ms-2 text-xs font-bold text-[#4a5568]">(المستوى {solution.level})</span>
                </h3>
                <span className="rounded-full bg-[#fff8e1] px-2.5 py-1 text-xs font-bold text-[#7c4a03]">
                  {solution.judgment === "open-model" ? "نموذج مفتوح" : solution.judgment === "grammatical-repair" ? "تصحيح نحوي" : solution.judgment === "contextual" ? "سياقي" : "صيغة محددة"}
                </span>
              </header>
              <p className="mt-2 text-sm leading-6 text-[#1a2433]">
                <strong className="text-[#1b3a5c]">الإجابة: </strong>
                <span dir="auto"><Rich text={solution.answer} /></span>
              </p>
              <p className="mt-1 text-sm leading-6 text-[#1a2433]">
                <strong className="text-[#1b3a5c]">القاعدة والسبب: </strong>
                <span dir="auto"><Rich text={solution.explanation} /></span>
              </p>
              {solution.alternatives?.length ? (
                <ul className="mt-1 list-disc space-y-1 ps-5 text-sm leading-6 text-[#1c6b3c]">
                  {solution.alternatives.map((line) => (
                    <li key={line} dir="auto"><Rich text={line} /></li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </section>
      ) : null}

      {tab === "rules" ? (
        <section aria-label="مرجع القواعد وملاحظات الدقة" className="space-y-3">
          <div className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <h3 className="font-black text-[#1b3a5c]">مرجع سريع</h3>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#1a2433]">
              <li><Rich text="الصيغة: Subject + will + have + V3 — مع جميع الضمائر بلا has بعد will (§3 · §5)." /></li>
              <li><Rich text="النفي: Subject + won't (will not) + have + V3 (§14). النفي مرتبط بالموعد لا بـ«أبدًا» (§15)." /></li>
              <li><Rich text="السؤال: Will + Subject + have + V3? (§16)." /></li>
              <li><Rich text="الإجابة القصيرة: Yes, I will. / No, I won't. — دون تكرار have + V3 (§17)." /></li>
              <li><Rich text="أسئلة المعلومات: Wh-word + will + Subject + have + V3? (§18)." /></li>
              <li>by the time ← Present Simple في الجملة الزمنية، وFuture Perfect في الجملة الرئيسية (§11).</li>
              <li>by تسمح بالاكتمال في الموعد نفسه؛ before تعني قبل الموعد (§12). by لا تعني الانتهاء في اللحظة تمامًا (§7).</li>
              <li>Future Simple يقدّم الحدث، Future Continuous يقدّم الجريان، Future Perfect يقدّم الاكتمال بحلول نقطة (§20–§23).</li>
              <li>الأزمنة التامة الثلاثة تشترك في V3 وتختلف في الفعل المساعد والنقطة المرجعية (§24).</li>
              <li>وجود by لا يجعل Future Simple خطأً آليًا (§31).</li>
              <li>will be ready تصف حالة مستقبلية، وwill have finished تصف إنجازًا مكتملًا (§25).</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <h3 className="font-black text-[#1b3a5c]">ملاحظات دقة على المصدر (بلا تعديل صامت)</h3>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#1a2433]">
              {COVERAGE_ACCURACY_NOTES_38.map((row) => (
                <li key={row.id}>
                  <p className="font-black text-[#1b3a5c]">
                    <span dir="ltr" className="font-en">§{row.num}</span> — <Rich text={row.title} />
                  </p>
                  <p dir="auto"><Rich text={row.accuracyNote ?? ""} /></p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <h3 className="font-black text-[#1b3a5c]">فهرس المصدر (للمعلم)</h3>
            <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm leading-6 text-[#1a2433]">
              {SOURCE_SECTIONS_38.filter((section) => section.num != null).map((section) => (
                <li key={section.id}>
                  <span className="font-bold"><Rich text={section.title} /></span>{" "}
                  <span className="text-xs text-[#4a5568]">
                    · <span dir="ltr" className="font-en">{section.units.length}</span> سطرًا
                    {section.revealUnits?.length ? ` · ${section.revealUnits.length} سطر حل` : ""}
                    {section.tableRows ? " · جدول" : ""}
                    {section.extraTableRows ? " · جدول إضافي" : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <Table38
            headers={["المصطلح", "الصيغة", "التركيز"]}
            rows={[
              ["Future Simple", "will + V1", "وقوع الحدث"],
              ["Future Continuous", "will be + V-ing", "نشاط جارٍ عند لحظة"],
              ["Future Perfect", "will have + V3", "اكتمال بحلول نقطة"],
            ]}
            label="مرجع الأزمنة المستقبلية الثلاثة"
            idPrefix="teacher-rules"
          />
        </section>
      ) : null}
    </div>
  );
}
