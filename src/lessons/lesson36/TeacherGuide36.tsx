import { useState } from "react";
import { ActionButton36, Callout36, Card36, FOCUS_36, MixedText36 } from "./kit36";
import { deckCoverage36, revealCoverage36, SLIDES_36, STAGES_36, STEP_COUNT_36 } from "./deck36";
import { SOURCE_SECTIONS_36 } from "./ledger36";
import { TEST_SOLUTIONS_36 } from "./solutionsData36";

type Tab36 = "overview" | "coverage" | "test" | "keys" | "notes";

const TABS: { id: Tab36; label: string }[] = [
  { id: "overview", label: "نظرة عامة" },
  { id: "coverage", label: "خريطة التغطية" },
  { id: "test", label: "حلول الاختبار" },
  { id: "keys", label: "مفاتيح التدريب والقراءة" },
  { id: "notes", label: "ملاحظات الدقة" },
];

const KEY_SECTIONS = [
  { id: "s17", label: "Grammar Detective" },
  { id: "s18", label: "اختر الصيغة الأنسب" },
  { id: "s19", label: "أكمل الحوار" },
  { id: "s21", label: "Reading Challenge" },
];

export default function TeacherGuide36({ onGoSolutions, onLock }: { onGoSolutions: () => void; onLock: () => void }) {
  const [tab, setTab] = useState<Tab36>("overview");
  const coverage = deckCoverage36();
  const reveal = revealCoverage36();
  const numbered = coverage.filter((row) => row.numeric != null);
  const slidesOf = (id: string) => SLIDES_36.filter((slide) => slide.sections.includes(id)).map((slide) => slide.title);

  return (
    <div data-area="l36-teacher-guide" className="space-y-4">
      <Card36 eyebrow="دليل المعلم" title="الدرس 36 — WILL vs BE GOING TO">
        <p className="text-sm leading-7 text-slate-700">
          تجربة الدرس مبنية على غلاف الدرس الأول نفسه: شريط جانبي، شريط تقدم، أزرار تنقل عائمة، ودرج فهرس على الهاتف. المحتوى التعليمي كامل بترتيبه الأصلي:
          <span className="font-bold"> {STEP_COUNT_36} خطوة</span> موزعة على <span className="font-bold">{STAGES_36.length} مراحل</span>، مع أربعة أنواع من المساحات: خطوات الطالب، الاختبار، الحلول، والمعلم.
        </p>
        <div className="flex flex-wrap gap-2">
          <ActionButton36 variant="secondary" onClick={onGoSolutions}>الحلول التفصيلية</ActionButton36>
          <ActionButton36 variant="ghost" onClick={onLock}>قفل منطقة المعلم</ActionButton36>
        </div>
      </Card36>

      <nav aria-label="أقسام دليل المعلم" className="flex flex-wrap gap-2">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`${FOCUS_36} min-h-11 rounded-xl border px-3 py-2 text-sm font-bold transition ${tab === item.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {tab === "overview" ? (
        <Card36 title="كيف يتحقق الدرس من الفهم؟">
          <ul className="list-disc space-y-1.5 ps-5 text-sm leading-7 text-slate-700">
            <li>كل مثال إنجليزي معزول LTR، والعربية تبقى RTL بلا انقلاب في الجمل المختلطة.</li>
            <li>مختبر القرار (cook / study) يطلب وصف الاستخدام قبل كشف التفسير.</li>
            <li>مختبر المواقف (travel) يطلب الصيغة وسبب الاختيار معًا.</li>
            <li>عدسة التوقع تقارن الرأي العام بالدليل الحاضر، وتؤكد أن الدليل لا يمنع WILL.</li>
            <li>Grammar Detective: عشر جمل، وتصحيح مقبول واحد على الأقل لكل جملة، مع بدائل موثّقة.</li>
            <li>الاختبار: 25 سؤالًا، لا نتيجة قبل التسليم، وتصحيح موضوعي للأسئلة 1–15 ونماذج للأسئلة 16–25.</li>
            <li>مهمة الكتابة: عداد جمل 12–15، وثمانية متطلبات، ونموذج افتتاحي ظاهر للمقارنة.</li>
          </ul>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            ملاحظة تصميمية: أُبقيت كل الجمل والأمثلة بترتيبها؛ وما أُضيف هو تنظيم العرض والتفاعل فقط، لا محتوى بديل.
          </p>
        </Card36>
      ) : null}

      {tab === "coverage" ? (
        <Card36 title={`خريطة التغطية — ${numbered.length} وحدة مرقّمة`}>
          <div className="space-y-2">
            {numbered.map((row) => (
              <article key={row.section} data-coverage-section={row.section} className="rounded-2xl border border-slate-200 bg-white p-3">
                <header className="flex flex-wrap items-center gap-2">
                  <span dir="ltr" className="font-en rounded-lg bg-slate-900 px-2 py-0.5 text-xs font-bold text-white tabular-nums">
                    {String(row.numeric).padStart(2, "0")}
                  </span>
                  <h3 className="min-w-0 flex-1 text-sm font-bold text-slate-900">
                    <MixedText36 text={row.title} />
                  </h3>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${row.missing.length === 0 && row.duplicates.length === 0 && !row.outOfOrder ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
                    {row.missing.length === 0 && row.duplicates.length === 0 && !row.outOfOrder ? "مغطى كاملًا" : "يحتاج مراجعة"}
                  </span>
                </header>
                <p className="mt-1 text-xs leading-6 text-slate-600">
                  الأسطر: <span dir="ltr" className="font-en tabular-nums">{row.covered.length}/{row.expected}</span> · الخطوات: {slidesOf(row.section).join(" · ") || "—"}
                </p>
              </article>
            ))}
            {coverage.filter((row) => row.numeric == null).map((row) => (
              <article key={row.section} data-coverage-section={row.section} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <h3 className="text-sm font-bold text-slate-900">المقدمة الافتتاحية</h3>
                <p className="mt-1 text-xs text-slate-600">
                  الأسطر: <span dir="ltr" className="font-en">{row.covered.length}/{row.expected}</span> · الخطوات: {slidesOf(row.section).join(" · ")}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600">
            أسطر مفاتيح التدريبات والقراءة المغطاة: {reveal.map((row) => `${row.section}: ${row.expected - row.missing.length}/${row.expected}`).join(" · ")}. تُعرض هذه المفاتيح بعد محاولة المتعلم داخل الأنشطة.
          </div>
        </Card36>
      ) : null}

      {tab === "test" ? (
        <Card36 title="حلول الاختبار النهائي — 25 سؤالًا">
          <div className="space-y-2">
            {TEST_SOLUTIONS_36.map((solution) => (
              <article key={solution.n} data-teacher-solution={solution.n} className="rounded-2xl border border-slate-200 bg-white p-3">
                <header className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    السؤال <span dir="ltr" className="font-en">{solution.n}</span>
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                    {solution.judgment === "open-model" ? "نموذج مفتوح" : solution.judgment === "grammatical-repair" ? "إصلاح نحوي" : solution.judgment === "contextual" ? "فهم معنى" : "الأنسب للسياق"}
                  </span>
                </header>
                <p className="mt-1 text-sm leading-7 text-slate-800">
                  <span className="font-bold">الإجابة: </span>
                  <span dir="auto"><MixedText36 text={solution.answer} /></span>
                </p>
                <p className="text-xs leading-6 text-slate-600">
                  <span className="font-bold">التفسير: </span>
                  <span dir="auto"><MixedText36 text={solution.explanation} /></span>
                </p>
                {solution.alternatives?.length ? (
                  <ul className="mt-1 list-disc space-y-0.5 ps-5 text-xs leading-6 text-slate-600">
                    {solution.alternatives.map((line) => (
                      <li key={line} dir="auto"><MixedText36 text={line} /></li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </Card36>
      ) : null}

      {tab === "keys" ? (
        <div className="space-y-3">
          {KEY_SECTIONS.map((entry) => {
            const section = SOURCE_SECTIONS_36.find((candidate) => candidate.id === entry.id);
            if (!section?.revealUnits) return null;
            return (
              <Card36 key={entry.id} title={entry.label}>
                <ol className="space-y-1">
                  {section.revealUnits.map((line, index) => (
                    <li key={`${entry.id}-${index}`} className="text-sm leading-7 text-slate-700">
                      <MixedText36 text={line} />
                    </li>
                  ))}
                </ol>
              </Card36>
            );
          })}
          <Card36 title="تحليل قراءة الروبوت">
            <ol className="space-y-1">
              {(SOURCE_SECTIONS_36.find((section) => section.id === "s21")?.revealUnits ?? []).slice(9).map((line, index) => (
                <li key={`analysis-${index}`} className="text-sm leading-7 text-slate-700">
                  <MixedText36 text={line} />
                </li>
              ))}
            </ol>
          </Card36>
        </div>
      ) : null}

      {tab === "notes" ? (
        <div className="space-y-3">
          <Callout36 tone="warn" title="إعادة بناء الجدول">
            جدول الوحدة الثالثة وصل مفكوك الأعمدة في النص الأصلي. أُعيد بناؤه كجدول دلالي بالعناوين الثمانية الأصلية نفسها دون إضافة صفوف.
          </Callout36>
          <Callout36 tone="note" title="مفتاح الاختبار">
            القسم 23 يذكر عنوان الحلول وعبارة كشفها فقط، ولا يتضمن مفتاحًا فعليًا. الحلول الخمسة والعشرون في هذا الدليل مكتوبة للمنصة، ومصنّفة بحسب الحكم: الأنسب للسياق، أو إصلاح نحوي، أو سؤال معنى، أو نموذج مفتوح.
          </Callout36>
          <Callout36 tone="neutral" title="الترميز في العنوان الإنجليزي">
            ورد العنوان الإنجليزي بصيغة `&amp;` في النص المورّد؛ يُعرض في الواجهة بعلامة `&` الطبيعية، مع بقاء النص كما هو في السجل.
          </Callout36>
          <Callout36 tone="success" title="الدقة التعليمية">
            الدرس يعرض التداخل بين الصيغتين، ويقبل البديل الصحيح نحويًا حين يسمح السياق. الأسئلة المفتوحة (16–25) لا تُصحَّح آليًا، ويُعرض لكل منها نموذج وتفسير.
          </Callout36>
        </div>
      ) : null}
    </div>
  );
}
