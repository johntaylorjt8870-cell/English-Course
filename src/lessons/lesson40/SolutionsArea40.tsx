import { EnLine40, Rich40, isPureEnglishUnit40, matchesAcceptedAnswer40 } from "./kit40";
import { sourceSection40 as fullSourceSection40 } from "./ledger40";
import { SOLUTIONS_40 } from "./solutionsData40";

export interface SolutionsArea40Props {
  submittedAnswers?: Readonly<Record<string, string>>;
  unlockedBy?: "submission" | "teacher";
  onBackToTest?: () => void;
  onBackToLesson?: () => void;
}

export function SolutionsArea40({
  submittedAnswers = {},
  unlockedBy = "submission",
  onBackToTest,
  onBackToLesson,
}: SolutionsArea40Props) {
  const s26 = fullSourceSection40("s26")!;
  const autoItems = SOLUTIONS_40.filter((item) => item.gradingMode === "auto");
  const reviewItems = SOLUTIONS_40.filter((item) => item.gradingMode === "review");
  const autoMatchedCount = autoItems.filter((item) => {
    const ans = (submittedAnswers[item.id] ?? "").trim();
    return Boolean(ans) && matchesAcceptedAnswer40(ans, item.acceptedNormalized);
  }).length;
  const reviewAnsweredCount = reviewItems.filter((item) =>
    Boolean((submittedAnswers[item.id] ?? "").trim())
  ).length;

  return (
    <section
      id="lesson40-solutions"
      className="tcc-exam-shell"
      data-source-section="s26"
      aria-label="الحلول التفصيلية للاختبار النهائي"
    >
      <header className="tcc-head">
        <div className="tcc-spectrum-bar" aria-hidden="true" />
        <div className="tcc-head-top">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tcc-station-tag">
              {unlockedBy === "teacher" ? "مفتوحة عبر وضع المعلم" : "مفتوحة بعد تسليم الاختبار"}
            </span>
            <span dir="ltr" className="tcc-coord font-en">
              SOLUTIONS // 25 ITEMS
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {onBackToTest ? (
              <button type="button" className="tcc-btn-secondary" onClick={onBackToTest}>
                العودة إلى الاختبار
              </button>
            ) : null}
            {onBackToLesson ? (
              <button type="button" className="tcc-btn-secondary" onClick={onBackToLesson}>
                العودة إلى خطوات الدرس
              </button>
            ) : null}
          </div>
        </div>

        <h1 className="tcc-title">
          <Rich40 text="الحلول التفصيلية والشرح الكامل للأسئلة الخمسة والعشرين" />
        </h1>
        <p className="tcc-purpose">
          قارن إجاباتك المسلمة بالإجابة النموذجية والسبب الموجز والشرح الموسع والبدائل السياقية المقبولة.
        </p>

        <div data-score-summary="40" className="mt-4 tcc-card border-emerald-700">
          <div className="text-sm font-black text-slate-950">
            الأسئلة الموضوعية المطابقة آليًا: {autoMatchedCount} / {autoItems.length}
          </div>
          <p className="mt-1 mb-0 text-xs font-bold text-slate-800">
            أسئلة فهم المعنى المفتوحة (المستوى الرابع: {reviewAnsweredCount} / {reviewItems.length} مجابة) تُراجع دلاليًا مع المعلم ولا تُرفض آليًا عند اختلاف الصياغة.
          </p>
        </div>
      </header>

      <section className="tcc-brief" aria-label="ملخص الحلول المعتمدة">
        <div className="tcc-brief-head">
          <span className="tcc-brief-label">◈ ملخص مفاتيح الحلول المعتمدة</span>
        </div>
        <div className="tcc-units">
          {s26.units.map((line, idx) => {
            const key = `s26-unit-${idx}`;
            return isPureEnglishUnit40(line) ? (
              <div key={key} data-source-unit={key}>
                <EnLine40 tone="right">{line}</EnLine40>
              </div>
            ) : (
              <p key={key} data-source-unit={key} className="tcc-unit-ar">
                <Rich40 text={line} />
              </p>
            );
          })}
        </div>
      </section>

      <section className="tcc-brief flex flex-col gap-4" aria-label="بطاقات التحليل التفصيلي">
        <div className="tcc-brief-head">
          <span className="tcc-brief-label">
            ◈ التحليل التفصيلي ومقارنة إجابتك لكل سؤال (1–25)
          </span>
        </div>

        <div className="flex flex-col gap-3.5">
          {SOLUTIONS_40.map((item) => {
            const studentAns = (submittedAnswers[item.id] ?? "").trim();
            const autoMatch =
              item.gradingMode === "auto" &&
              Boolean(studentAns) &&
              matchesAcceptedAnswer40(studentAns, item.acceptedNormalized);

            return (
              <article
                key={item.id}
                data-solution-item={item.id}
                data-solution-number={item.number}
                className="tcc-card flex flex-col gap-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span dir="ltr" className="tcc-coord font-en">
                    Q{item.number} {item.marker} · LEVEL {item.level}
                  </span>
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-extrabold ${
                      item.gradingMode === "review"
                        ? "bg-blue-950 text-white"
                        : autoMatch
                          ? "bg-emerald-900 text-white"
                          : studentAns
                            ? "bg-amber-900 text-white"
                            : "bg-slate-700 text-white"
                    }`}
                  >
                    {item.gradingMode === "review"
                      ? studentAns
                        ? "سؤال معنوي للمقارنة الدلالية"
                        : "سؤال معنوي غير مُجاب"
                      : autoMatch
                        ? "إجابتك مطابقة ✓"
                        : studentAns
                          ? "راجع الفرق مع النموذج"
                          : "لم تُجب عنه"}
                  </span>
                </div>

                <div className="text-sm font-black text-slate-900">
                  <Rich40 text={item.prompt} />
                </div>

                <div className="rounded-lg border border-slate-300 bg-white p-2.5 text-xs font-bold text-slate-900">
                  <span>إجابتك المسجلة: </span>
                  {studentAns ? (
                    <Rich40 text={studentAns} />
                  ) : (
                    <span className="text-slate-600">— لم تُسجَّل إجابة —</span>
                  )}
                </div>

                <div className="tcc-feedback is-ok">
                  <div className="font-black">
                    <Rich40 text={`الإجابة النموذجية: ${item.sourceAnswer}`} />
                  </div>
                  <div className="mt-1">
                    <Rich40 text={item.sourceReason} />
                  </div>
                  <div className="mt-1.5 border-t border-emerald-800/20 pt-1.5 text-xs">
                    <Rich40 text={item.platformExplanation} />
                  </div>
                  {item.acceptableAlternatives ? (
                    <div className="mt-1 text-xs font-extrabold">
                      <Rich40 text={`البدائل المقبولة: ${item.acceptableAlternatives}`} />
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default SolutionsArea40;
