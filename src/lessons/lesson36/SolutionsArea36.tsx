import { useState } from "react";
import { TEST_SOLUTIONS_36 } from "./solutionsData36";
import { ActionButton36, Card36, FOCUS_36, MixedText36, SourceText36 } from "./kit36";
import { U } from "./content36";

const LEVELS = [
  { level: 1 as const, title: "المستوى الأول · اختيار الصيغة", range: "1–5" },
  { level: 2 as const, title: "المستوى الثاني · أكمل الجمل", range: "6–10" },
  { level: 3 as const, title: "المستوى الثالث · تصحيح الأخطاء", range: "11–15" },
  { level: 4 as const, title: "المستوى الرابع · فهم المعنى", range: "16–20" },
  { level: 5 as const, title: "المستوى الخامس · Final IQ200 Boss", range: "21–25" },
];

export default function SolutionsArea36({
  unlocked,
  onGoTest,
  onGoTeacher,
}: {
  unlocked: boolean;
  onGoTest: () => void;
  onGoTeacher: () => void;
}) {
  const [level, setLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  if (!unlocked) {
    return (
      <div data-area="l36-solutions" data-solutions-locked>
        <Card36 title="الحلول التفصيلية مقفلة">
          <p>تُفتح هذه المساحة بعد تسليم الاختبار، أو من بوابة المعلم. لا يظهر هنا أي جواب أو تفسير قبل ذلك.</p>
          <ActionButton36 className="mt-2" onClick={onGoTest}>العودة إلى الاختبار</ActionButton36>
        </Card36>
      </div>
    );
  }
  const visible = TEST_SOLUTIONS_36.filter((solution) => solution.level === level);
  return (
    <div data-area="l36-solutions" data-solution-count={TEST_SOLUTIONS_36.length} className="space-y-4">
      <Card36 eyebrow="مفتاح التصحيح" title={<SourceText36 value={U("s23", 0)} />}>
        <p className="text-sm leading-7 text-slate-700">
          <SourceText36 value={U("s23", 1)} />
        </p>
        <p className="mt-1 text-sm leading-7 text-slate-600">
          الإجابات أدناه مكتوبة لهذا الدرس؛ يشرح كل سؤال سبب الاختيار ويذكر البدائل الصحيحة حين يسمح السياق، ويميّز بين الخطأ النحوي والاختيار الأقل ملاءمة.
        </p>
      </Card36>

      <nav aria-label="مستويات الحلول" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {LEVELS.map((item) => (
          <button
            key={item.level}
            type="button"
            aria-pressed={level === item.level}
            onClick={() => setLevel(item.level)}
            className={`${FOCUS_36} min-h-12 rounded-2xl border px-3 py-2 text-sm font-bold transition ${level === item.level ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
          >
            {item.title}
            <span dir="ltr" className={`font-en mt-1 block text-xs ${level === item.level ? "text-white/80" : "text-slate-500"}`}>Q{item.range}</span>
          </button>
        ))}
      </nav>

      <section aria-label={LEVELS[level - 1].title} className="space-y-3">
        {visible.map((solution) => (
          <article key={solution.n} data-solution={solution.n} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <h2 className="font-head text-lg font-bold text-slate-900">
                السؤال <span dir="ltr" className="font-en">{solution.n}</span>
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
                {solution.judgment === "most-natural" ? "الأنسب للسياق" : solution.judgment === "grammatical-repair" ? "إصلاح نحوي" : solution.judgment === "contextual" ? "سؤال معنى" : "نموذج إجابة مفتوحة"}
              </span>
            </header>
            <div className="mt-2 space-y-1.5 text-sm leading-7 text-slate-700">
              <p>
                <strong className="text-slate-900">الإجابة: </strong>
                <span dir="auto"><MixedText36 text={solution.answer} /></span>
              </p>
              <p>
                <strong className="text-slate-900">التفسير: </strong>
                <span dir="auto"><MixedText36 text={solution.explanation} /></span>
              </p>
              {solution.alternatives?.length ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <h3 className="text-xs font-black text-slate-600">بدائل مقبولة / توضيح الفرق</h3>
                  <ul className="mt-1 list-disc space-y-1 ps-5 text-xs leading-6 text-slate-700">
                    {solution.alternatives.map((line) => (
                      <li key={line} dir="auto"><MixedText36 text={line} /></li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <div className="flex flex-wrap gap-2">
        <ActionButton36 variant="secondary" onClick={onGoTest}>العودة إلى الاختبار</ActionButton36>
        <ActionButton36 variant="secondary" onClick={onGoTeacher}>منطقة المعلم</ActionButton36>
      </div>
    </div>
  );
}
