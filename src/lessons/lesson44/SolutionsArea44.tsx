import { En44, Glyph44, Label44, Text44 } from "./kit44";
import { TEST_SOLUTIONS_44 } from "./solutionsData44";
import { TEST_LEVELS_44, type TestAnswers44 } from "./testData44";
import type { TestGradeReport44 } from "./testKey44";

const SOLUTION_MAP = new Map(TEST_SOLUTIONS_44.map((s) => [s.id, s]));

export default function SolutionsArea44({
  answers = {},
  gradeReport = null,
  teacher = false,
  onBackToTest,
  onBackToLearn,
}: {
  answers?: TestAnswers44;
  gradeReport?: TestGradeReport44 | null;
  teacher?: boolean;
  onBackToTest?: () => void;
  onBackToLearn?: () => void;
}) {
  return (
    <section
      className={teacher ? "solutions44 solutions44--embed" : "solutions44"}
      data-solutions-area="44"
    >
      {!teacher && (
        <header className="occ-exam-hero">
          <div className="occ-spectrum-strip" aria-hidden="true" />
          <div className="occ-head-badges">
            <span className="occ-station-pill">مرجع التصحيح والتعليل الكامل</span>
            <span dir="ltr" className="occ-coord font-en">
              25 SOLUTIONS · LEVELS 1–5
            </span>
          </div>
          <h2 className="solutionsTitle44">الحلول التفصيلية للاختبار النهائي</h2>
          <p className="solutionsIntro44">
            راجع الإجابة النموذجية والتفسير النحوي والدلالي لكل سؤال من الأسئلة الخمسة والعشرين، وقارنها بإجابتك المسجلة.
          </p>
          <div className="taskActions44 mt-3">
            {onBackToTest && (
              <button type="button" className="btn44 btn44--solid" onClick={onBackToTest}>
                العودة إلى ورقة الاختبار والنتيجة
              </button>
            )}
            {onBackToLearn && (
              <button type="button" className="btn44 btn44--ghost" onClick={onBackToLearn}>
                العودة إلى خطوات الدرس
              </button>
            )}
          </div>
        </header>
      )}

      {TEST_LEVELS_44.map((level) => (
        <section
          key={level.level}
          className="solLevel44"
          aria-labelledby={`sol-level-${level.level}`}
        >
          <header className="levelHead44 levelHead44--solutions">
            <span className="levelNo44 font-en" aria-hidden="true">
              L{level.level}
            </span>
            <h3 id={`sol-level-${level.level}`}>
              <Label44 text={level.title} />
            </h3>
            <span className="levelCount44">
              <bdi dir="ltr">{level.questions.length}</bdi> حلول
            </span>
          </header>

          <div className="solCards44">
            {level.questions.map((q) => {
              const sol = SOLUTION_MAP.get(q.id)!;
              const given = q.fields
                .map((_, i) => answers[`${q.id}-${i}`]?.trim())
                .filter(Boolean)
                .join(" / ");
              const itemGrade = gradeReport?.items[q.id];

              return (
                <article
                  key={q.id}
                  className="solCard44"
                  data-solution-card={q.id}
                >
                  <div className="solTop44">
                    <span className="qNo44 font-en" aria-hidden="true">
                      {String(q.number).padStart(2, "0")}
                    </span>
                    <span className="solLabel44">السؤال {q.number}</span>
                    {!teacher && itemGrade && (
                      <span
                        className={
                          itemGrade.correct
                            ? "answerTag44"
                            : "answerTag44 answerTag44--no"
                        }
                      >
                        <Glyph44 name={itemGrade.correct ? "check" : "cross"} />{" "}
                        {itemGrade.correct ? "صحيحة" : "تحتاج مراجعة"}
                      </span>
                    )}
                  </div>

                  <div className="solQuestion44">
                    {q.lines.map((line, k) => (
                      <p key={k}>
                        <Text44 text={line} />
                      </p>
                    ))}
                  </div>

                  {!teacher && given && (
                    <div className="solGiven44">
                      <span>إجابتك المسجلة</span>
                      <p>
                        <Text44 text={given} />
                      </p>
                    </div>
                  )}

                  <div className="solAnswer44">
                    <span>الإجابة النموذجية</span>
                    <p>
                      <En44 text={sol.answer} />
                    </p>
                  </div>

                  <div className="solReason44">
                    <p>
                      <span className="solWhy44">التعليل: </span>
                      <Text44 text={sol.reason} />
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}
