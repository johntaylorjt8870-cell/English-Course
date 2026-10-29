import { En46, Mixed46 } from "./kit46";
import { TEST_LEVELS_46, TEST_QUESTIONS_46 } from "./testData46";
import type { GradedTestResult46 } from "./testKey46";

/** Receives the already-submitted result; it never independently imports the key. */
export default function TeacherGuide46({ result }: { result: GradedTestResult46 }) {
  return (
    <div data-teacher-guide="46" className="l46-teacher-guide">
      {TEST_LEVELS_46.map((level) => (
        <section key={level.level}>
          <div className="l46-level-header">
            <span className="l46-level-badge" aria-hidden="true">{String(level.level).padStart(2, "0")}</span>
            <div>
              <En46>{level.en}</En46>
              <h2>{level.title}</h2>
            </div>
          </div>
          {TEST_QUESTIONS_46.filter((q) => q.level === level.level).map((question) => {
            const solution = result.solutions[question.id];
            const correct = result.byQuestion[question.id];
            return solution ? (
              <article className="l46-practice-card" data-teacher-q={question.number} key={question.id}>
                <div className="l46-question-top">
                  <span className="l46-question-number">{String(question.number).padStart(2, "0")}</span>
                  <p dir="ltr" lang="en">{question.prompt}</p>
                </div>
                <p className={`l46-teacher-mark ${correct ? "is-correct" : "is-wrong"}`}>
                  {correct ? "✓ إجابة الطالب صحيحة" : "✕ إجابة الطالب تحتاج إلى مراجعة"}
                </p>
                <p><strong>الإجابة النموذجية: </strong><Mixed46 text={solution.model} /></p>
                <p><strong>التعليل: </strong><Mixed46 text={solution.why} /></p>
              </article>
            ) : null;
          })}
        </section>
      ))}
    </div>
  );
}
