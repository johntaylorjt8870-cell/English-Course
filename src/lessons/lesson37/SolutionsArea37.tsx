import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { sourceSection37 } from "./ledger37";
import { TEST_SOLUTIONS_37 } from "./solutionsData37";
import { ActionButton37, Card37, FOCUS_37, PlatformNote37, SourceLine37 } from "./kit37";

const solutionLevels = [
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
      <div data-area="lesson37-solutions" data-solutions-locked>
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
    <div data-area="lesson37-solutions" data-solution-count={TEST_SOLUTIONS_37.length} className="space-y-4">
      <Card37 eyebrow="Solutions Area · separate from test-taking" title="مفتاح تصحيح الاختبار النهائي — الدرس 37">
        {section ? (
          <div className="space-y-1">
            {section.units.map((text, index) => (
              <SourceLine37 key={index} sectionId="s35" index={index} text={text} />
            ))}
          </div>
        ) : null}
        <PlatformNote37>
          نص المصدر في القسم 35 يعرض عنوان مفتاح التصحيح وعبارة «عرض الحلول التفصيلية» فقط، ولا يحمل مفتاحًا فعليًا. الإجابات والتفسيرات
          أدناه إضافات تعليمية من إعداد المنصة/المعلم، مكتوبة وفق أمثلة المصدر وقواعده (الأقسام 1–33)، وليست نصًا منقولًا من المصدر.
        </PlatformNote37>
        <p className="text-sm leading-6 text-[#43575a]">
          في الأسئلة السياقية نميّز بين الخطأ النحوي، والاختيار الممكن لكنه أقل ملاءمة في السياق، والبدائل الصحيحة التي تغيّر التركيز.
          إجابات المستوى الرابع نماذج وليست صيغًا وحيدة.
        </p>
      </Card37>

      <nav aria-label="مستويات حلول اختبار الدرس 37" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {solutionLevels.map((item) => (
          <button
            key={item.level}
            type="button"
            aria-pressed={level === item.level}
            onClick={() => setLevel(item.level)}
            className={`${FOCUS_37} min-h-12 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              level === item.level ? "border-[#245f62] bg-[#245f62] text-white" : "border-[#cfd8d2] bg-white text-[#24343b] hover:bg-[#eef4f0]"
            }`}
          >
            {item.title}
            <span dir="ltr" className={`font-en mt-1 block text-xs ${level === item.level ? "text-white" : "text-[#53676a]"}`}>
              Q{item.range}
            </span>
          </button>
        ))}
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-bold text-[#43575a]">
          كل بطاقة تبدأ مختصرة: الإجابة ظاهرة، والشرح والبدائل داخل قسم قابل للفتح.
        </p>
        <button
          type="button"
          aria-pressed={allOpen}
          onClick={toggleAll}
          className={`${FOCUS_37} min-h-11 rounded-xl border border-[#cfd8d2] bg-white px-3 py-2 text-sm font-black text-[#17354a] transition-colors hover:bg-[#eef4f0] motion-reduce:transition-none`}
        >
          {allOpen ? "طيّ كل الشروح" : "فتح كل الشروح"}
        </button>
      </div>

      <section aria-label={solutionLevels[level - 1].title} className="space-y-3">
        {visible.map((solution) => (
          <article
            key={solution.n}
            data-solution={solution.n}
            data-source-status={solution.sourceStatus}
            className="rounded-2xl border border-[#d8d2c5] bg-white p-4"
          >
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e3e0d7] pb-2">
              <h2 className="font-black text-[#17354a]">
                السؤال{" "}
                <span dir="ltr" className="font-en">
                  {solution.n}
                </span>
              </h2>
              <span className="rounded-full bg-[#fbf6eb] px-3 py-1 text-xs font-bold text-[#76531e]">
                {solution.judgment === "open-model" ? "نموذج إجابة مفتوحة — إعداد المنصة/المعلم" : "إضافة معلّمة من إعداد المعلم/المنصة"}
              </span>
            </header>
            <div className="mt-3 space-y-2 text-base leading-7 text-[#24343b]">
              <p>
                <strong className="text-[#17354a]">الإجابة النموذجية: </strong>
                <span dir="auto">
                  <Rich text={solution.answer} />
                </span>
              </p>
              <button
                type="button"
                aria-expanded={openCards[solution.n] === true}
                aria-controls={`solution-37-details-${solution.n}`}
                onClick={() => toggleCard(solution.n)}
                className={`${FOCUS_37} min-h-11 rounded-xl border border-[#cfd8d2] bg-[#fbfdfc] px-3 py-2 text-sm font-black text-[#17354a] transition-colors hover:bg-[#eef4f0] motion-reduce:transition-none`}
              >
                {openCards[solution.n] ? "إخفاء الشرح والبدائل" : "إظهار الشرح والبدائل"}
              </button>
              {openCards[solution.n] ? (
                <div id={`solution-37-details-${solution.n}`} data-solution-details={solution.n} className="space-y-2">
                  <p>
                    <strong className="text-[#17354a]">التفسير: </strong>
                    <span dir="auto">
                      <Rich text={solution.explanation} />
                    </span>
                  </p>
                  {solution.alternatives?.length ? (
                    <div className="rounded-xl border border-[#dce3dd] bg-[#f7faf8] p-3">
                      <h3 className="text-sm font-black text-[#28533b]">بدائل مقبولة / توضيح السياق</h3>
                      <ul className="mt-1 list-disc space-y-1 ps-5 text-sm leading-6 text-[#24343b]">
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
        ))}
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
