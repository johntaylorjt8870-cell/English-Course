import { useMemo, useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { TEST_LEVELS_38 } from "./testData38";
import { TEST_SOLUTIONS_38 } from "./solutionsData38";
import { ActionButton38, FOCUS_38, FinishLine38, PlatformNote38 } from "./kit38";

const LEVELS_38 = [
  { level: 1 as const, title: "المستوى الأول · الاختيار", range: "1–5" },
  { level: 2 as const, title: "المستوى الثاني · الإكمال", range: "6–10" },
  { level: 3 as const, title: "المستوى الثالث · التصحيح", range: "11–15" },
  { level: 4 as const, title: "المستوى الرابع · المعنى", range: "16–20" },
  { level: 5 as const, title: "المستوى الخامس · IQ200", range: "21–25" },
];

export default function SolutionsArea38({
  unlocked,
  onGoTest,
  onGoTeacher,
}: {
  unlocked: boolean;
  onGoTest: () => void;
  onGoTeacher: () => void;
}) {
  const [level, setLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const visible = useMemo(() => TEST_SOLUTIONS_38.filter((solution) => solution.level === level), [level]);
  const allOpen = visible.every((solution) => open[solution.n]);
  const toggle = (n: number) => setOpen((current) => ({ ...current, [n]: !current[n] }));
  const toggleAll = () =>
    setOpen((current) => {
      const next = { ...current };
      for (const solution of visible) next[solution.n] = !allOpen;
      return next;
    });

  if (!unlocked) {
    return (
      <div data-area="lesson38-solutions" data-solutions-locked className="mt-3">
        <section className="fp38-card">
          <FinishLine38 label="LOCKED" />
          <h2 className="mt-2 text-xl font-black text-[#3f1233]">الحلول تُفتح بعد التسليم</h2>
          <p className="mt-2 text-sm leading-7 text-[#6b4a5e]">ارجع إلى الاختبار وأرسل إجاباتك الـ25، أو ادخل من بوابة المعلم.</p>
          <ActionButton38 className="mt-3" onClick={onGoTest}>العودة إلى الاختبار</ActionButton38>
        </section>
      </div>
    );
  }

  return (
    <div data-area="lesson38-solutions" data-solution-count={TEST_SOLUTIONS_38.length} className="space-y-3">
      <section className="fp38-card">
        <FinishLine38 label="ANSWER KEY" />
        <p dir="ltr" className="fp38-eyebrow font-en mt-2">SOLUTIONS AREA</p>
        <h2 className="mt-1 text-xl font-black text-[#3f1233]">مفتاح تصحيح الاختبار النهائي — 25 سؤالًا</h2>
        <PlatformNote38>
          نص المصدر §34 لا يحمل مفتاحًا فعليًا. كل إجابة وتفسير أدناه إضافة من إعداد المنصة/المعلم، مكتوبة على أساس قواعد الدرس وأمثلته، وتشمل سبب صحة الإجابة وسبب خطأ البدائل عند الحاجة.
        </PlatformNote38>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-[#f3d2d9] bg-white p-3">
            <p className="text-xs font-black text-[#7a5767]">الإجابة النموذجية</p>
            <p className="mt-1 text-sm font-bold text-[#3f1233]">ظاهرة في كل بطاقة قبل فتح الشرح.</p>
          </div>
          <div className="rounded-xl border border-[#f3d2d9] bg-white p-3">
            <p className="text-xs font-black text-[#7a5767]">القاعدة والسبب</p>
            <p className="mt-1 text-sm font-bold text-[#3f1233]">شرح لماذا هذه الصيغة، وأين يقع الخطأ.</p>
          </div>
          <div className="rounded-xl border border-[#f3d2d9] bg-white p-3">
            <p className="text-xs font-black text-[#7a5767]">البدائل والفروق</p>
            <p className="mt-1 text-sm font-bold text-[#3f1233]">أسئلة المقارنة تشرح فرق التركيز لا الصحة فقط.</p>
          </div>
        </div>
      </section>

      <nav aria-label="مستويات حلول الاختبار" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {LEVELS_38.map((item) => (
          <button
            key={item.level}
            type="button"
            aria-pressed={level === item.level}
            onClick={() => setLevel(item.level)}
            className={`fp38-tab ${FOCUS_38} text-right`}
          >
            {item.title}
            <span dir="ltr" className="font-en mt-1 block text-xs text-[#f6e3de]">Q{item.range}</span>
          </button>
        ))}
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-bold text-[#6b4a5e]">افتح الشرح لكل سؤال، أو افتح كل شروح المستوى الحالي.</p>
        <button type="button" aria-pressed={allOpen} onClick={toggleAll} className={`fp38-tab ${FOCUS_38} font-black`}>
          {allOpen ? "طيّ كل الشروح" : "فتح كل الشروح"}
        </button>
      </div>

      <section aria-label={LEVELS_38[level - 1].title} className="space-y-3">
        {visible.map((solution) => {
          const question = TEST_LEVELS_38.flatMap((entry) => entry.questions).find((entry) => entry.n === solution.n);
          return (
            <article key={solution.n} data-solution={solution.n} className="rounded-2xl border border-[#f0d9d2] bg-white p-4 shadow-sm">
              <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f3e2dc] pb-2">
                <h3 className="font-black text-[#3f1233]">
                  السؤال <span dir="ltr" className="font-en">{solution.n}</span>
                  <span className="ms-2 text-xs font-bold text-[#7a5767]">· المستوى {solution.level}</span>
                </h3>
                <span className="rounded-full border border-[#f2c14e] bg-[#fff8e1] px-2.5 py-1 text-[11px] font-black text-[#7c4a03]">
                  {solution.judgment === "open-model"
                    ? "نموذج إجابة مفتوحة"
                    : solution.judgment === "grammatical-repair"
                      ? "تصحيح نحوي"
                      : solution.judgment === "contextual"
                        ? "اختيار سياقي"
                        : "صيغة محددة"}
                </span>
              </header>
              {question ? (
                <div className="mt-2 space-y-1">
                  {question.promptLines.map((line, index) => (
                    <p key={index} dir="auto" className="rounded-lg bg-[#fff8f3] px-3 py-1.5 text-sm font-semibold leading-7 text-[#2b1633]">
                      <Rich text={line} />
                    </p>
                  ))}
                </div>
              ) : null}
              <div className="mt-3 space-y-2 text-base leading-7 text-[#2b1633]">
                <p className="font-black text-[#9f1239]">الإجابة النموذجية:</p>
                <p dir="ltr" className="font-en rounded-lg border border-[#f3c7d1] bg-[#fff1f2] px-3 py-1.5 text-left font-black text-[#9f1239]">
                  {solution.answer}
                </p>
                <button
                  type="button"
                  aria-expanded={open[solution.n] === true}
                  aria-controls={`solution-38-details-${solution.n}`}
                  onClick={() => toggle(solution.n)}
                  className={`fp38-tab ${FOCUS_38} font-black`}
                >
                  {open[solution.n] ? "إخفاء الشرح والبدائل" : "إظهار الشرح والبدائل"}
                </button>
                {open[solution.n] ? (
                  <div id={`solution-38-details-${solution.n}`} className="space-y-2">
                    <p>
                      <strong className="text-[#9f1239]">القاعدة والسبب: </strong>
                      <span dir="auto"><Rich text={solution.explanation} /></span>
                    </p>
                    {solution.alternatives?.length ? (
                      <div className="rounded-xl border border-[#b8ddc5] bg-[#f0faf2] p-3">
                        <h4 className="text-sm font-black text-[#1c6b3c]">لماذا البدائل خطأ أو مختلفة التركيز؟</h4>
                        <ul className="mt-1 list-disc space-y-1 ps-5 text-sm leading-6 text-[#2b1633]">
                          {solution.alternatives.map((line) => (
                            <li key={line} dir="auto"><Rich text={line} /></li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </section>

      <div className="flex flex-wrap gap-2">
        <ActionButton38 variant="secondary" onClick={onGoTest}>العودة إلى الاختبار</ActionButton38>
        <ActionButton38 variant="secondary" onClick={onGoTeacher}>دليل المعلم</ActionButton38>
      </div>
    </div>
  );
}
