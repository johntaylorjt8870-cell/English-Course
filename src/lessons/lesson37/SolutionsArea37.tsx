import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { sourceSection37 } from "./ledger37";
import { TEST_37 } from "./testData37";
import { TEST_SOLUTIONS_37 } from "./solutionsData37";
import { ActionButton37, Card37, FOCUS_37, PlatformNote37, SourceLine37 } from "./kit37";

const LEVELS_37 = [
  { level: 1, title: "المستوى الأول · اختر الإجابة", range: "1–5" },
  { level: 2, title: "المستوى الثاني · أكمل الجمل", range: "6–10" },
  { level: 3, title: "المستوى الثالث · صحح الأخطاء", range: "11–15" },
  { level: 4, title: "المستوى الرابع · فهم المعنى", range: "16–20" },
  { level: 5, title: "المستوى الخامس · Final IQ200 Boss", range: "21–25" },
] as const;

export default function SolutionsArea37({
  unlocked,
  onGoTest,
  onGoTeacher,
}: {
  unlocked: boolean;
  onGoTest: () => void;
  onGoTeacher: () => void;
}) {
  const [level, setLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [openCards, setOpenCards] = useState<Record<number, boolean>>({});
  const section = sourceSection37("s35");

  if (!unlocked) {
    return (
      <div data-area="lesson37-solutions" data-solutions-locked="true">
        <Card37 title="منطقة الحلول مقفلة">
          <p>تُفتح الحلول بعد إرسال الاختبار أو بدخول المعلم. في هذه الحالة لا يظهر أي جواب أو تفسير للأسئلة الرسمية.</p>
          <ActionButton37 onClick={onGoTest}>العودة إلى الاختبار</ActionButton37>
        </Card37>
      </div>
    );
  }

  const visible = TEST_SOLUTIONS_37.filter((solution) => solution.level === level);
  const allOpen = visible.every((solution) => openCards[solution.n]);
  const toggleCard = (n: number) => setOpenCards((current) => ({ ...current, [n]: !current[n] }));
  const toggleAll = () =>
    setOpenCards((current) => {
      const next = { ...current };
      for (const solution of visible) next[solution.n] = !allOpen;
      return next;
    });

  return (
    <div data-area="lesson37-solutions" data-solution-count={TEST_SOLUTIONS_37.length} className="space-y-3">
      <Card37 eyebrow="Solutions Area · منفصلة عن الاختبار" title="مفتاح تصحيح الاختبار النهائي — الدرس 37">
        {section ? (
          <div className="space-y-1.5">
            {section.units.map((text, index) => (
              <SourceLine37 key={index} sectionId="s35" index={index} text={text} />
            ))}
          </div>
        ) : null}
        <PlatformNote37>
          نص المصدر في القسم 35 يعرض عنوان مفتاح التصحيح وعبارة «عرض الحلول التفصيلية» فقط، ولا يحمل مفتاحًا فعليًا. الإجابات والتفسيرات
          أدناه إضافات تعليمية من إعداد المنصة/المعلم، مكتوبة وفق أمثلة المصدر وقواعده (الأقسام 1–33)، وليست نصًا منقولًا من المصدر.
        </PlatformNote37>
        <p className="text-sm leading-7 text-[#1e293b]">
          في الأسئلة السياقية نميّز بين الخطأ النحوي، والاختيار الممكن لكنه أقل ملاءمة في السياق، والبدائل الصحيحة التي تغيّر التركيز. إجابات
          المستوى الرابع نماذج وليست صيغًا وحيدة.
        </p>
      </Card37>

      <nav aria-label="مستويات حلول اختبار الدرس 37" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {LEVELS_37.map((item) => (
          <button
            key={item.level}
            type="button"
            aria-pressed={level === item.level}
            onClick={() => setLevel(item.level)}
            className={`${FOCUS_37} min-h-12 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              level === item.level
                ? "border-[#0f766e] bg-[#0f766e] text-white"
                : "border-[#7dd3fc] bg-white text-[#0c4a6e] hover:bg-[#e0f2fe]"
            }`}
          >
            {item.title}
            <span dir="ltr" className={`font-en mt-1 block text-xs ${level === item.level ? "text-white" : "text-[#0369a1]"}`}>
              Q{item.range}
            </span>
          </button>
        ))}
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-bold text-[#334155]">كل بطاقة تبدأ مختصرة: الإجابة ظاهرة، والشرح والبدائل داخل قسم قابل للفتح.</p>
        <button
          type="button"
          aria-pressed={allOpen}
          onClick={toggleAll}
          className={`${FOCUS_37} min-h-11 rounded-xl border border-[#7dd3fc] bg-white px-3 py-2 text-sm font-black text-[#0c4a6e] transition-colors hover:bg-[#e0f2fe] motion-reduce:transition-none`}
        >
          {allOpen ? "طيّ كل الشروح" : "فتح كل الشروح"}
        </button>
      </div>

      <section aria-label={LEVELS_37[level - 1].title} className="space-y-3">
        {visible.map((solution) => {
          const question = TEST_37.find((entry) => entry.n === solution.n);
          return (
            <article
              key={solution.n}
              data-solution={solution.n}
              data-source-status={solution.sourceStatus}
              className="rounded-2xl border border-[#bae6fd] bg-white p-4 shadow-sm"
            >
              <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#bae6fd] pb-2">
                <h2 className="font-black text-[#0c4a6e]">
                  السؤال <span dir="ltr" className="font-en">{solution.n}</span>
                </h2>
                <span className="rounded-full border border-[#fcd34d] bg-[#fef3c7] px-3 py-1 text-xs font-black text-[#92400e]">
                  {solution.judgment === "open-model" ? "نموذج إجابة مفتوحة — إعداد المنصة/المعلم" : "إضافة معلّمة من إعداد المعلم/المنصة"}
                </span>
              </header>

              {question ? (
                <div className="mt-2 space-y-1">
                  {question.promptLines.map((line, index) => (
                    <p
                      key={index}
                      dir="auto"
                      className="rounded-lg bg-[#f8fbff] px-3 py-1.5 text-sm font-semibold leading-7 text-[#1e293b]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : null}

              <div className="mt-3 space-y-2 text-base leading-7 text-[#1e293b]">
                <p className="font-black text-[#0c4a6e]">الإجابة النموذجية:</p>
                <p dir="ltr" className="font-en rounded-lg border border-[#bae6fd] bg-[#f0f9ff] px-3 py-1.5 text-left font-black text-[#0c4a6e]">
                  {solution.answer}
                </p>
                <button
                  type="button"
                  aria-expanded={openCards[solution.n] === true}
                  aria-controls={`solution-37-details-${solution.n}`}
                  onClick={() => toggleCard(solution.n)}
                  className={`${FOCUS_37} min-h-11 rounded-xl border border-[#7dd3fc] bg-[#f8fbff] px-3 py-2 text-sm font-black text-[#0c4a6e] transition-colors hover:bg-[#e0f2fe] motion-reduce:transition-none`}
                >
                  {openCards[solution.n] ? "إخفاء الشرح والبدائل" : "إظهار الشرح والبدائل"}
                </button>
                {openCards[solution.n] ? (
                  <div id={`solution-37-details-${solution.n}`} data-solution-details={solution.n} className="space-y-2">
                    <p>
                      <strong className="text-[#0c4a6e]">التفسير: </strong>
                      <span dir="auto">
                        <Rich text={solution.explanation} />
                      </span>
                    </p>
                    {solution.alternatives?.length ? (
                      <div className="rounded-xl border border-[#5eead4] bg-[#f0fdfa] p-3">
                        <h3 className="text-sm font-black text-[#115e59]">بدائل مقبولة / توضيح السياق</h3>
                        <ul className="mt-1 list-disc space-y-1 ps-5 text-sm leading-6 text-[#1e293b]">
                          {solution.alternatives.map((line) => (
                            <li key={line} dir="auto">
                              <Rich text={line} />
                            </li>
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
        <ActionButton37 variant="secondary" onClick={onGoTest}>
          العودة إلى الاختبار
        </ActionButton37>
        <ActionButton37 variant="secondary" onClick={onGoTeacher}>
          دليل المعلم
        </ActionButton37>
      </div>
    </div>
  );
}
