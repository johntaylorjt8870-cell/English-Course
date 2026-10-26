import { useState } from "react";
import { Glyph44, Label44, Plate44, Text44 } from "./kit44";
import {
  TEST_LEVELS_44,
  TEST_QUESTIONS_44,
  TEST_QUESTION_COUNT_44,
  isQuestionAnswered44,
  testComplete44,
  type TestAnswers44,
} from "./testData44";
import type { TestGradeReport44 } from "./testKey44";

export default function TestArea44({
  answers,
  submitted,
  gradeReport,
  onAnswer,
  onSubmitted,
  onReset,
  onSolutions,
  onBack,
}: {
  answers: TestAnswers44;
  submitted: boolean;
  gradeReport: TestGradeReport44 | null;
  onAnswer: (key: string, value: string) => void;
  onSubmitted: (report: TestGradeReport44) => void;
  onReset: () => void;
  onSolutions: () => void;
  onBack: () => void;
}) {
  const [grading, setGrading] = useState(false);
  const [filterWrongOnly, setFilterWrongOnly] = useState(false);

  const answered = TEST_QUESTIONS_44.filter((q) =>
    isQuestionAnswered44(q.id, q.fields.length, answers)
  ).length;
  const complete = testComplete44(answers);

  const handleSubmit = async () => {
    if (!complete || grading) return;
    setGrading(true);
    try {
      const mod = await import("./testKey44");
      const report = mod.gradeTest44(answers);
      onSubmitted(report);
    } finally {
      setGrading(false);
    }
  };

  const handleReset = () => {
    setFilterWrongOnly(false);
    onReset();
  };

  const scrollToQuestion = (id: string) => {
    const el = document.querySelector(`[data-test-question="${id}"]`);
    if (el && "scrollIntoView" in el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="testArea44" data-test-area="44">
      <header className="occ-exam-hero">
        <div className="occ-spectrum-strip" aria-hidden="true" />
        <div className="occ-head-badges">
          <span className="occ-station-pill">التقييم الختامي الشامل</span>
          <span dir="ltr" className="occ-coord font-en">
            MASTER TEST · 25 QUESTIONS
          </span>
        </div>
        <h2 className="testTitle44 font-en" dir="ltr" lang="en">
          MUST &amp; HAVE TO — Master Test
        </h2>
        <p className="testSub44">
          خمسة مستويات متدرجة تغطي الصيغ، والنفي، والاستفهام، والماضي، والمستقبل، وفهم المعنى الدقيق. تبقى الإجابات والتفسيرات محجوبة تمامًا حتى تسليم الاختبار كاملًا.
        </p>

        <div className="testMeter44">
          <p className="testCount44" aria-live="polite">
            <b className="font-en" dir="ltr">
              {answered} / {TEST_QUESTION_COUNT_44}
            </b>
            <span>سؤالًا مُجابًا</span>
            {complete && !submitted && <em>جاهز للتسليم والتصحيح الفوري</em>}
            {submitted && gradeReport && (
              <em>
                النتيجة: <bdi dir="ltr">{gradeReport.score} / {gradeReport.total}</bdi> (
                <bdi dir="ltr">{gradeReport.percent}%</bdi>)
              </em>
            )}
          </p>
          <progress
            max={TEST_QUESTION_COUNT_44}
            value={answered}
            aria-label="تقدم الإجابة في الاختبار النهائي"
          />
        </div>

        <div
          className="occ-q-dots"
          dir="ltr"
          role="navigation"
          aria-label="انتقال سريع إلى أسئلة الاختبار"
        >
          {TEST_QUESTIONS_44.map((q) => {
            const done = isQuestionAnswered44(q.id, q.fields.length, answers);
            const itemGrade = submitted ? gradeReport?.items[q.id] : undefined;
            const cls = itemGrade
              ? itemGrade.correct
                ? "is-right"
                : "is-wrong"
              : done
                ? "is-answered"
                : "";
            return (
              <button
                key={q.id}
                type="button"
                className={`occ-q-dot font-en ${cls}`.trim()}
                onClick={() => scrollToQuestion(q.id)}
                aria-label={`السؤال ${q.number}`}
              >
                {q.number}
              </button>
            );
          })}
        </div>
      </header>

      {submitted && gradeReport && (
        <Plate44
          kicker="تقرير التصحيح التفصيلي"
          title={`الدرجة النهائية: ${gradeReport.score} من ${gradeReport.total} (${gradeReport.percent}%)`}
          channel={gradeReport.score >= 20 ? "must" : "prohibit"}
          status={
            gradeReport.score === 25
              ? "إتقان كامل — ممتاز"
              : gradeReport.score >= 20
                ? "أداء متقدم"
                : "فرصة للمراجعة المركّزة"
          }
        >
          <div className="occ-level-scores">
            {gradeReport.byLevel.map((lv) => (
              <div key={lv.level} className="occ-level-score-chip">
                <span>المستوى {lv.level}</span>
                <strong className="font-en" dir="ltr">
                  {lv.correct} / {lv.total}
                </strong>
              </div>
            ))}
          </div>

          <div className="taskActions44 mt-3">
            {gradeReport.wrongIds.length > 0 && (
              <button
                type="button"
                className="btn44 btn44--ghost"
                aria-pressed={filterWrongOnly}
                onClick={() => setFilterWrongOnly((v) => !v)}
              >
                {filterWrongOnly
                  ? `عرض جميع الأسئلة (${gradeReport.total})`
                  : `مراجعة الإجابات الخاطئة فقط (${gradeReport.wrongIds.length})`}
              </button>
            )}
            <button type="button" className="btn44 btn44--solid" onClick={onSolutions}>
              فتح منطقة الحلول الكاملة <Glyph44 name="arrow" />
            </button>
            <button type="button" className="btn44 btn44--ghost" onClick={handleReset}>
              <Glyph44 name="refresh" /> إعادة الاختبار من جديد
            </button>
          </div>
        </Plate44>
      )}

      {TEST_LEVELS_44.map((level) => {
        const visibleQuestions =
          submitted && filterWrongOnly && gradeReport
            ? level.questions.filter((q) => !gradeReport.items[q.id]?.correct)
            : level.questions;

        if (visibleQuestions.length === 0) return null;

        return (
          <section
            key={level.level}
            className="testLevel44"
            aria-labelledby={`test-level-${level.level}`}
          >
            <header className="levelHead44">
              <span className="levelNo44 font-en" aria-hidden="true">
                L{level.level}
              </span>
              <h3 id={`test-level-${level.level}`}>
                <Label44 text={level.title} />
              </h3>
              <span className="levelCount44">
                <bdi dir="ltr">{visibleQuestions.length}</bdi> أسئلة
              </span>
            </header>

            {level.context.length > 0 && (
              <div className="testBrief44">
                {level.context.map((line, i) => (
                  <p
                    key={i}
                    className={
                      i === 1
                        ? "testBriefTitle44 font-en"
                        : /^[A-Za-z]+:/.test(line)
                          ? "testBriefTurn44 font-en"
                          : ""
                    }
                    dir={i === 0 ? "rtl" : "ltr"}
                  >
                    <Text44 text={line} />
                  </p>
                ))}
              </div>
            )}

            <div className="testQuestions44">
              {visibleQuestions.map((q) => {
                const itemGrade = submitted ? gradeReport?.items[q.id] : undefined;
                return (
                  <fieldset
                    key={q.id}
                    className={`qField44 ${
                      itemGrade
                        ? itemGrade.correct
                          ? "qField44--right"
                          : "qField44--wrong"
                        : ""
                    }`.trim()}
                    data-test-question={q.id}
                    disabled={submitted}
                  >
                    <legend className="qLegend44">
                      <span className="qNo44 font-en" aria-hidden="true">
                        {String(q.number).padStart(2, "0")}
                      </span>
                      <span>السؤال {q.number}</span>
                      {itemGrade && (
                        <span
                          className={
                            itemGrade.correct
                              ? "answerTag44"
                              : "answerTag44 answerTag44--no"
                          }
                        >
                          {itemGrade.correct ? "✓ إجابة صحيحة" : "✕ تحتاج مراجعة"}
                        </span>
                      )}
                    </legend>

                    <div className="qLines44">
                      {q.lines.map((line, k) => (
                        <p key={k}>
                          <Text44 text={line} />
                        </p>
                      ))}
                    </div>

                    {q.options.length > 0 ? (
                      <div className="options44">
                        {q.options.map((opt, idx) => {
                          const picked = answers[`${q.id}-0`] === opt;
                          const letter =
                            opt.match(/^([A-E])\./)?.[1] ?? ["A", "B", "C"][idx];
                          return (
                            <label key={opt} className="option44">
                              <input
                                type="radio"
                                name={`l44-${q.id}`}
                                value={opt}
                                checked={picked}
                                onChange={() => onAnswer(`${q.id}-0`, opt)}
                              />
                              <span className="optionLetter44 font-en" aria-hidden="true">
                                {letter}
                              </span>
                              <span className="optionText44 font-en" dir="ltr" lang="en">
                                {opt.replace(/^[A-E]\.\s*/, "")}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      q.fields.map((label, idx) => (
                        <label key={idx} className="field44 field44--test">
                          <span className="fieldLabel44">{label}</span>
                          {level.level === 4 ? (
                            <textarea
                              rows={3}
                              dir="auto"
                              placeholder="اكتب شرحك بوضوح..."
                              value={answers[`${q.id}-${idx}`] ?? ""}
                              onChange={(e) => onAnswer(`${q.id}-${idx}`, e.target.value)}
                            />
                          ) : (
                            <input
                              type="text"
                              dir="ltr"
                              placeholder="Write your English answer..."
                              value={answers[`${q.id}-${idx}`] ?? ""}
                              onChange={(e) => onAnswer(`${q.id}-${idx}`, e.target.value)}
                            />
                          )}
                        </label>
                      ))
                    )}

                    {submitted && itemGrade && (
                      <div
                        className={`fb44 ${
                          itemGrade.correct ? "fb44--ok" : "fb44--no"
                        } mt-3`}
                        role="status"
                      >
                        <p className="fbTitle44">
                          <Glyph44 name={itemGrade.correct ? "check" : "cross"} />
                          <span>
                            {itemGrade.correct
                              ? "إجابة سليمة"
                              : "مراجعة الإجابة والتعليل"}
                          </span>
                        </p>
                        <div className="fbBody44">
                          <p>
                            <strong>إجابتك المسجلة:</strong>{" "}
                            <Text44 text={itemGrade.studentAnswer || "—"} />
                          </p>
                          <p className="fbKey44">
                            <strong>الإجابة النموذجية:</strong>{" "}
                            <Text44 text={itemGrade.canonicalAnswer} />
                          </p>
                          <p>
                            <Text44 text={itemGrade.explanation} />
                          </p>
                        </div>
                      </div>
                    )}
                  </fieldset>
                );
              })}
            </div>
          </section>
        );
      })}

      <footer className="testBar44">
        <div className="testBarMeta44" aria-live="polite">
          <p>
            {submitted && gradeReport
              ? `تم تسليم الاختبار · نتيجتك ${gradeReport.score} من ${gradeReport.total}`
              : complete
                ? "أكملت الأسئلة الخمسة والعشرين — اضغط تسليم الاختبار لإظهار الدرجة والتصحيح."
                : `أجب عن الأسئلة المتبقية (${TEST_QUESTION_COUNT_44 - answered}) لتفعيل زر التسليم.`}
          </p>
          <span className="testBarHint44">
            {submitted
              ? "يمكنك تصفح منطقة الحلول أو إعادة المحاولة بدرجة جديدة نظيفة."
              : "لا تُعرض أي مفاتيح أو تلميحات قبل التسليم."}
          </span>
        </div>

        <div className="testBarActions44">
          {!submitted ? (
            <button
              type="button"
              className="btn44 btn44--solid"
              disabled={!complete || grading}
              onClick={handleSubmit}
            >
              {grading ? "جاري التصحيح..." : "تسليم الاختبار وإظهار النتيجة"}
            </button>
          ) : (
            <button type="button" className="btn44 btn44--solid" onClick={onSolutions}>
              منطقة الحلول التفصيلية <Glyph44 name="arrow" />
            </button>
          )}

          {answered > 0 && (
            <button type="button" className="btn44 btn44--ghost" onClick={handleReset}>
              <Glyph44 name="refresh" /> {submitted ? "إعادة الاختبار" : "مسح الإجابات"}
            </button>
          )}

          <button type="button" className="btn44 btn44--quiet" onClick={onBack}>
            العودة إلى خطوات التعلّم
          </button>
        </div>
      </footer>
    </section>
  );
}
