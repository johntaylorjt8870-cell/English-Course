import { useState } from "react";
import { EnLine40, Rich40, isPureEnglishUnit40 } from "./kit40";
import {
  TEST_HEADER_LINES_40,
  TEST_LEVELS_40,
  TEST_QUESTIONS_40,
  TEST_QUESTION_COUNT_40,
  type TestQuestion40,
} from "./testData40";
import type { GradeSummary40 } from "./testKey40";

export interface TestArea40Props {
  submitted?: boolean;
  submittedAnswers?: Readonly<Record<string, string>>;
  gradeSummary?: GradeSummary40 | null;
  onSubmitted?: (
    frozenAnswers: Readonly<Record<string, string>>,
    summary: GradeSummary40
  ) => void;
  onResetAttempt?: () => void;
  onOpenSolutions?: () => void;
  onBackToLesson?: () => void;
}

export function TestArea40({
  submitted: externalSubmitted,
  submittedAnswers,
  gradeSummary: externalGrade,
  onSubmitted,
  onResetAttempt,
  onOpenSolutions,
  onBackToLesson,
}: TestArea40Props) {
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});
  const [localSubmitted, setLocalSubmitted] = useState(false);
  const [localFrozenAnswers, setLocalFrozenAnswers] = useState<Readonly<
    Record<string, string>
  > | null>(null);
  const [localGrade, setLocalGrade] = useState<GradeSummary40 | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeLevel, setActiveLevel] = useState<"all" | 1 | 2 | 3 | 4 | 5>("all");

  const isSubmitted = Boolean(externalSubmitted ?? localSubmitted);
  const activeAnswers: Readonly<Record<string, string>> = isSubmitted
    ? submittedAnswers ?? localFrozenAnswers ?? {}
    : draftAnswers;
  const grade = externalGrade ?? localGrade;

  const answeredCount = TEST_QUESTIONS_40.filter((q) =>
    Boolean((activeAnswers[q.id] ?? "").trim())
  ).length;

  const updateAnswer = (qId: string, value: string) => {
    if (isSubmitted) return;
    setDraftAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    if (isSubmitted || submitting) return;
    setSubmitting(true);
    try {
      const frozen = Object.freeze({ ...draftAnswers });
      const { gradeTest40 } = await import("./testKey40");
      const summary = gradeTest40(frozen);
      setLocalFrozenAnswers(frozen);
      setLocalGrade(summary);
      setLocalSubmitted(true);
      onSubmitted?.(frozen, summary);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartNewAttempt = () => {
    setDraftAnswers({});
    setLocalFrozenAnswers(null);
    setLocalGrade(null);
    setLocalSubmitted(false);
    onResetAttempt?.();
  };

  const renderUnitLine = (unit: { lineIndex: number; text: string }) => {
    const key = `s25-unit-${unit.lineIndex}`;
    return isPureEnglishUnit40(unit.text) ? (
      <div key={key} data-source-unit={key}>
        <EnLine40>{unit.text}</EnLine40>
      </div>
    ) : (
      <p key={key} data-source-unit={key} className="tcc-unit-ar">
        <Rich40 text={unit.text} />
      </p>
    );
  };

  const renderQuestionControl = (q: TestQuestion40) => {
    const val = activeAnswers[q.id] ?? "";
    if (q.kind === "mcq" && q.options) {
      return (
        <div className="tcc-grid-3 mt-2" dir="ltr" role="radiogroup" aria-label={`Question ${q.number}`}>
          {q.options.map((opt) => {
            const selected = val === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={isSubmitted}
                data-source-unit={`s25-unit-${opt.lineIndex}`}
                className={`tcc-choice-btn font-en ${selected ? "is-selected" : ""}`}
                onClick={() => updateAnswer(q.id, opt.value)}
              >
                <span>{opt.text}</span>
                <span>{selected ? "●" : "○"}</span>
              </button>
            );
          })}
        </div>
      );
    }

    if (q.kind === "meaning") {
      return (
        <textarea
          rows={3}
          dir="auto"
          disabled={isSubmitted}
          aria-label={`إجابة السؤال ${q.number}`}
          placeholder={q.placeholder ?? "اكتب شرحك هنا..."}
          className="tcc-input mt-2 leading-relaxed"
          value={val}
          onChange={(e) => updateAnswer(q.id, e.target.value)}
        />
      );
    }

    return (
      <input
        type="text"
        dir="ltr"
        disabled={isSubmitted}
        aria-label={`Answer for question ${q.number}`}
        placeholder={q.placeholder ?? "Write your answer..."}
        className="tcc-input font-en mt-2"
        value={val}
        onChange={(e) => updateAnswer(q.id, e.target.value)}
      />
    );
  };

  const visibleLevels =
    activeLevel === "all"
      ? TEST_LEVELS_40
      : TEST_LEVELS_40.filter((lv) => lv.level === activeLevel);

  return (
    <section
      id="lesson40-test"
      className="tcc-exam-shell"
      data-source-section="s25"
      aria-label="الاختبار النهائي الشامل للدرس 40"
    >
      <header className="tcc-head">
        <div className="tcc-spectrum-bar" aria-hidden="true" />
        <div className="tcc-head-top">
          <div className="tcc-badges">
            <span dir="ltr" className="tcc-coord font-en">
              GRAND EXAM // {TEST_QUESTION_COUNT_40} QUESTIONS
            </span>
            <span className="tcc-station-tag">
              {isSubmitted
                ? "تم تجميد المحاولة المسلمة"
                : `تمت الإجابة عن ${answeredCount} من ${TEST_QUESTION_COUNT_40}`}
            </span>
          </div>
          {onBackToLesson ? (
            <button type="button" className="tcc-btn-secondary" onClick={onBackToLesson}>
              العودة إلى خطوات الدرس
            </button>
          ) : null}
        </div>

        <h1 className="tcc-title">
          <Rich40 text="الاختبار النهائي الشامل — Future Tenses Grand Exam" />
        </h1>
        <div className="mt-3 flex flex-col gap-2">
          {TEST_HEADER_LINES_40.map((line) => renderUnitLine(line))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="تصفية مستويات الاختبار">
          <button
            type="button"
            role="tab"
            aria-selected={activeLevel === "all"}
            className={`tcc-tab-btn ${activeLevel === "all" ? "is-active" : ""}`}
            onClick={() => setActiveLevel("all")}
          >
            عرض المستويات الخمسة ({TEST_QUESTION_COUNT_40})
          </button>
          {TEST_LEVELS_40.map((lv) => (
            <button
              key={lv.level}
              type="button"
              role="tab"
              aria-selected={activeLevel === lv.level}
              className={`tcc-tab-btn ${activeLevel === lv.level ? "is-active" : ""}`}
              onClick={() => setActiveLevel(lv.level)}
            >
              المستوى {lv.level}
            </button>
          ))}
        </div>
      </header>

      {isSubmitted && grade ? (
        <section
          className="tcc-brief border-emerald-700"
          data-test-submitted="true"
          aria-live="polite"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="m-0 text-lg font-black text-slate-950">
                نتيجة المحاولة المسلمة (محفوظة ومقفلة ضد التعديل)
              </h2>
              <p className="mt-1 mb-0 text-sm font-bold text-slate-800">
                الأسئلة الموضوعية المصححة آليًا (المستويات 1–3 و5):{" "}
                <strong>
                  {grade.autoCorrect} / {grade.autoTotal}
                </strong>{" "}
                · أسئلة فهم المعنى المفتوحة للمراجعة الذاتية والمعلم (المستوى 4):{" "}
                <strong>
                  {grade.reviewSubmitted} / {grade.reviewTotal}
                </strong>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {onOpenSolutions ? (
                <button type="button" className="tcc-btn-primary" onClick={onOpenSolutions}>
                  عرض الحلول التفصيلية الكاملة
                </button>
              ) : null}
              <button
                type="button"
                className="tcc-btn-secondary"
                onClick={handleStartNewAttempt}
              >
                بدء محاولة جديدة
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {visibleLevels.map((block) => (
        <section
          key={block.level}
          className="tcc-brief flex flex-col gap-4"
          data-exam-level={block.level}
        >
          <div
            data-source-unit={`s25-unit-${block.titleLine.lineIndex}`}
            className="border-b border-slate-200 pb-2.5"
          >
            <h2 className="m-0 text-base font-black text-slate-950">
              <Rich40 text={block.titleLine.text} />
            </h2>
          </div>

          {block.introLines?.length ? (
            <div className="tcc-card flex flex-col gap-2">
              {block.introLines.map((ln) => renderUnitLine(ln))}
            </div>
          ) : null}

          <div className="flex flex-col gap-4">
            {block.questions.map((q) => {
              const itemEval = isSubmitted && grade ? grade.byQuestionId[q.id] : undefined;
              return (
                <article
                  key={q.id}
                  id={`exam40-${q.id}`}
                  data-test-question={q.number}
                  data-question-number={q.number}
                  className="tcc-card flex flex-col gap-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="tcc-coord font-en" dir="ltr">
                      Q{q.number} {q.marker}
                    </span>
                    {itemEval ? (
                      <span
                        data-test-result={itemEval.status}
                        className={`rounded-full px-3 py-0.5 text-xs font-extrabold ${
                          itemEval.status === "correct"
                            ? "bg-emerald-900 text-white"
                            : itemEval.status === "review"
                              ? "bg-blue-950 text-white"
                              : "bg-red-900 text-white"
                        }`}
                      >
                        {itemEval.status === "correct"
                          ? "إجابة مطابقة ✓"
                          : itemEval.status === "review"
                            ? "مسجلة للمراجعة الدلالية"
                            : itemEval.status === "empty"
                              ? "لم تُجب عنها"
                              : "تحتاج مراجعة"}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    {q.promptLines.map((ln) => renderUnitLine(ln))}
                  </div>

                  {renderQuestionControl(q)}

                  {itemEval ? (
                    <div
                      className={`tcc-feedback mt-2 ${
                        itemEval.status === "correct"
                          ? "is-ok"
                          : itemEval.status === "review"
                            ? "is-info"
                            : "is-warn"
                      }`}
                    >
                      <div>
                        <Rich40 text={`النموذج المرجعي: ${itemEval.modelAnswer}`} />
                      </div>
                      <div className="mt-1 text-xs">
                        <Rich40 text={itemEval.conciseReason} />
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      ))}

      {!isSubmitted ? (
        <footer className="tcc-brief flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-bold text-slate-900">
            تمت الإجابة عن <strong>{answeredCount}</strong> من{" "}
            <strong>{TEST_QUESTION_COUNT_40}</strong> سؤالًا. ستُقفل المحاولة وتُفتح الحلول التفصيلية فور الضغط على زر التسليم.
          </div>
          <button
            type="button"
            className="tcc-btn-primary"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? "جاري تدقيق المحاولة..." : "تسليم الاختبار النهائي"}
          </button>
        </footer>
      ) : null}
    </section>
  );
}

export default TestArea40;
