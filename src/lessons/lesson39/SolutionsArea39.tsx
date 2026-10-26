import { useMemo, useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { TEST_SOLUTIONS_39 } from "./solutionsData39";
import { ActionButton39, PlatformNote39 } from "./kit39";

// ============================================================
// منطقة الحلول — تُركَّب بعد التسليم أو بعد دخول المعلم فقط.
// الملف يستورد الحلول نفسها (solutionsData39) ولا يستورد محرّك القياس.
// ============================================================

const LEVELS_39 = [
  { level: 1 as const, title: "المستوى الأول · Grammar Foundations", range: "1–5" },
  { level: 2 as const, title: "المستوى الثاني · Sentence Construction", range: "6–10" },
  { level: 3 as const, title: "المستوى الثالث · Error Detection", range: "11–15" },
  { level: 4 as const, title: "المستوى الرابع · Meaning & Tense Contrast", range: "16–20" },
  { level: 5 as const, title: "المستوى الخامس · IQ200 Final Challenge", range: "21–25" },
];

export default function SolutionsArea39({
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
  const visible = useMemo(() => TEST_SOLUTIONS_39.filter((item) => item.level === level), [level]);
  const allOpen = visible.every((item) => open[item.n]);

  if (!unlocked) {
    return (
      <div data-area="lesson39-solutions" data-solutions-locked="true" className="obs-panel">
        <h2 className="obs-panel-title">الحلول تُفتح بعد التسليم</h2>
        <p className="obs-nuance leading-7">
          ارجع إلى الاختبار وأرسل إجاباتك الـ25، أو ادخل من بوابة المعلم. لا تُعرض أي إجابة قبل ذلك.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <ActionButton39 onClick={onGoTest}>العودة إلى الاختبار</ActionButton39>
          <ActionButton39 variant="secondary" onClick={onGoTeacher}>
            منطقة المعلم
          </ActionButton39>
        </div>
      </div>
    );
  }

  return (
    <div
      data-area="lesson39-solutions"
      data-solution-count={TEST_SOLUTIONS_39.length}
      className="obs-solutions-shell space-y-3"
    >
      <section className="obs-panel">
        <p className="obs-eyebrow">
          <En>SOLUTIONS AREA</En>
        </p>
        <h2 className="obs-panel-title">مفتاح تصحيح الاختبار النهائي — 25 سؤالًا</h2>
        <PlatformNote39>
          نص المصدر في القسم 36 يعرض عنوان مفتاح التصحيح وعبارة «عرض الحلول التفصيلية» فقط، ولا يحمل مفتاحًا فعليًا.
          الإجابات والتفسيرات أدناه إضافة من إعداد المنصة/المعلم، مكتوبة وفق قواعد الدرس وأمثلته.
        </PlatformNote39>
        <p className="obs-nuance">
          أسئلة المستوى الرابع نماذج إجابة وليست صيغة وحيدة؛ في السؤال 18 تُقبل صياغات متعددة. تُقرأ البدائل بوصفها
          توضيحًا لسبب الخطأ لا كإجابات مطلوبة.
        </p>
      </section>

      <nav aria-label="مستويات الحلول" className="obs-test-tabs">
        {LEVELS_39.map((item) => (
          <button
            key={item.level}
            type="button"
            aria-pressed={level === item.level}
            onClick={() => setLevel(item.level)}
            className={`obs-test-tab ${level === item.level ? "is-active" : ""}`}
          >
            <span className="obs-test-tab-ar">
              <Rich text={item.title} />
            </span>
            <span dir="ltr" className="obs-test-tab-count font-en">
              {item.range}
            </span>
          </button>
        ))}
      </nav>

      <div className="flex flex-wrap gap-2">
        <ActionButton39
          variant="secondary"
          onClick={() =>
            setOpen((current) => {
              const next = { ...current };
              for (const item of visible) next[item.n] = !allOpen;
              return next;
            })
          }
        >
          {allOpen ? "إخفاء كل التفسيرات" : "عرض كل التفسيرات"}
        </ActionButton39>
        <ActionButton39 variant="ghost" onClick={onGoTest}>
          العودة إلى الاختبار
        </ActionButton39>
      </div>

      <ol className="space-y-2">
        {visible.map((solution) => {
          const isOpen = Boolean(open[solution.n]);
          return (
            <li key={solution.n} className="obs-card" data-solution={solution.n}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen((current) => ({ ...current, [solution.n]: !current[solution.n] }))}
                className="flex w-full items-center gap-2 text-right"
              >
                <span dir="ltr" className="obs-q-num font-en">
                  Q{String(solution.n).padStart(2, "0")}
                </span>
                <span dir="ltr" className="obs-readout-en font-en min-w-0 flex-1 text-left">
                  {solution.answer}
                </span>
                <span aria-hidden className="obs-turn-chevron">
                  {isOpen ? "▴" : "▾"}
                </span>
              </button>
              {isOpen ? (
                <div className="mt-2 space-y-1.5">
                  <p className="obs-readout-ar">
                    <Rich text={solution.explanation} />
                  </p>
                  {solution.alternatives?.length ? (
                    <ul className="space-y-0.5">
                      {solution.alternatives.map((alternative) => (
                        <li key={alternative} className="obs-nuance">
                          — <Rich text={alternative} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="obs-nuance">
                    <En>{solution.judgment}</En> ·{" "}
                    {solution.sourceStatus === "platform-authored-teacher-addition"
                      ? "إضافة من إعداد المنصة/المعلم"
                      : "نص المصدر"}
                  </p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
