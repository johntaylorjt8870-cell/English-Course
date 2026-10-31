import { useRef, useState } from "react";
import { En48, Mixed48 } from "./kit48";
import { retryModuleUrl48 } from "./retry48";
import {
  answeredCount48,
  testComplete48,
  TEST_LEVELS_48,
  TEST_QUESTIONS_48,
  TEST_QUESTION_COUNT_48,
} from "./testData48";
import type { GradedTestResult48 } from "./testKey48";

type KeyModule48 = typeof import("./testKey48");
type KeyLoader48 = (retry: boolean, previousError?: unknown, attempt?: number) => Promise<KeyModule48>;
// A separate module URL makes a transient failed import retryable in browsers
// that cache failed module fetches. Neither URL is requested before submission.
let recoveredKey48: { url: string } | "retry-entry" | null = null;
const defaultKeyLoader48: KeyLoader48 = async (retry, previousError, attempt = 0) => {
  if (recoveredKey48 === "retry-entry") return import("./testKey48?retry") as unknown as Promise<KeyModule48>;
  if (recoveredKey48) {
    try {
      return (await import(/* @vite-ignore */ recoveredKey48.url)) as KeyModule48;
    } catch {
      recoveredKey48 = null;
    }
  }
  if (!retry) return import("./testKey48");
  const url = retryModuleUrl48(previousError, "testKey48", attempt);
  if (url) {
    const key = (await import(/* @vite-ignore */ url)) as KeyModule48;
    recoveredKey48 = { url };
    return key;
  }
  const key = (await import("./testKey48?retry")) as unknown as KeyModule48;
  recoveredKey48 = "retry-entry";
  return key;
};

export default function TestArea48({
  answers,
  result,
  onChangeAnswer,
  onSubmitResult,
  onReset,
  keyLoader = defaultKeyLoader48,
}: {
  answers: Record<string, string>;
  result: GradedTestResult48 | null;
  onChangeAnswer: (id: string, value: string) => void;
  onSubmitResult: (result: GradedTestResult48) => void;
  onReset: () => void;
  keyLoader?: KeyLoader48;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const busy = useRef(false);
  const failed = useRef(false);
  const lastError = useRef<unknown>(null);
  const attempts = useRef(0);
  const answered = answeredCount48(answers);
  const complete = testComplete48(answers);
  const submitted = result !== null;
  const progress = Math.round((answered / TEST_QUESTION_COUNT_48) * 100);

  async function submit() {
    if (busy.current || submitted || !complete) return;
    busy.current = true;
    setLoading(true);
    setError(false);
    try {
      // The key is imported only here — after a complete, explicit submission.
      const key = await keyLoader(failed.current, lastError.current, attempts.current);
      onSubmitResult(key.gradeTest48(answers));
    } catch (submitError) {
      lastError.current = submitError;
      attempts.current += 1;
      failed.current = true;
      setError(true);
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }

  function reset() {
    if (busy.current) return;
    attempts.current = 0;
    setError(false);
    onReset();
  }

  return (
    <section className="l48-test" data-area="lesson48-test" data-final-test>
      <div className="l48-test-intro">
        <div>
          <strong>25 سؤالًا · 5 مستويات</strong>
          <p>أجب عن جميع الأسئلة قبل التسليم؛ لا يُعرض التصحيح ولا الدرجة قبل التسليم.</p>
        </div>
        <span className="l48-test-counter" role="status" aria-live="polite">
          <span aria-hidden="true">✓</span>
          <bdi dir="ltr">
            {answered} / {TEST_QUESTION_COUNT_48}
          </bdi>
        </span>
        <div
          className="l48-test-progress"
          role="progressbar"
          aria-label="تقدم الاختبار"
          aria-valuemin={0}
          aria-valuemax={TEST_QUESTION_COUNT_48}
          aria-valuenow={answered}
        >
          <div style={{ width: `${progress}%` }} />
        </div>
      </div>

      {result && (
        <div className="l48-result" data-test-result role="status" aria-live="polite">
          <div>
            <span className="l48-result-kicker">MISSION COMPLETE</span>
            <h2>
              نتيجتك:{" "}
              <bdi dir="ltr">
                {result.score} / {result.total}
              </bdi>
            </h2>
            <p>راجع تفسير كل إجابة، ثم حاول مجددًا متى شئت.</p>
          </div>
          <button type="button" className="l48-button l48-button--light" data-test-reset onClick={reset}>
            إعادة الاختبار ↺
          </button>
          <div className="l48-level-scores">
            {TEST_LEVELS_48.map((level) => (
              <span key={level.level}>
                المستوى {level.level} ·{" "}
                <bdi dir="ltr">
                  {result.byLevel[level.level]?.score ?? 0} / {result.byLevel[level.level]?.total ?? 5}
                </bdi>
              </span>
            ))}
          </div>
        </div>
      )}

      {TEST_LEVELS_48.map((level) => (
        <section className="l48-test-level" data-test-level={level.level} key={level.level}>
          <div className="l48-level-header">
            <span className="l48-level-badge" aria-hidden="true">
              {String(level.level).padStart(2, "0")}
            </span>
            <div>
              <En48>{level.en}</En48>
              <h2>{level.title}</h2>
            </div>
            <p>{level.instruction}</p>
          </div>
          {TEST_QUESTIONS_48.filter((q) => q.level === level.level).map((question) => {
            const value = answers[question.id] ?? "";
            const correct = result?.byQuestion[question.id];
            const solution = result?.solutions[question.id];
            return (
              <article
                key={question.id}
                data-test-q={question.number}
                data-question-id={question.id}
                className={`l48-test-question l48-practice-card ${submitted ? (correct ? "is-correct" : "is-wrong") : ""}`}
              >
                <div className="l48-question-top">
                  <span className="l48-question-number">{String(question.number).padStart(2, "0")}</span>
                  <p dir="ltr" lang="en">
                    {question.prompt}
                  </p>
                </div>
                {question.contextAr && (
                  <p className="l48-instruction">
                    <Mixed48 text={question.contextAr} />
                  </p>
                )}
                {question.type === "choice" ? (
                  <div className="l48-options l48-test-options" role="group" aria-label={`خيارات السؤال ${question.number}`}>
                    {question.options?.map((option, i) => (
                      <button
                        type="button"
                        key={option.id}
                        aria-pressed={value === option.id}
                        disabled={submitted || loading}
                        dir={option.lang === "en" ? "ltr" : "rtl"}
                        onClick={() => onChangeAnswer(question.id, option.id)}
                      >
                        <span className="l48-option-letter" aria-hidden="true">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {option.lang === "en" ? (
                          <En48>{option.text}</En48>
                        ) : (
                          <span dir="rtl" lang="ar">
                            {option.text}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    dir="ltr"
                    lang="en"
                    className="l48-input"
                    aria-label={`إجابة السؤال ${question.number}`}
                    value={value}
                    disabled={submitted || loading}
                    placeholder={question.placeholder ?? "Write in English…"}
                    onChange={(event) => onChangeAnswer(question.id, event.target.value)}
                  />
                )}
                {submitted && solution && (
                  <div className={`l48-feedback ${correct ? "is-correct" : "is-retry"}`} data-question-feedback={question.id}>
                    <strong>{correct ? "✓ إجابة صحيحة" : "✕ تحتاج إلى مراجعة"}</strong>
                    <p>
                      <strong>الإجابة النموذجية: </strong>
                      <Mixed48 text={solution.model} />
                    </p>
                    <p>
                      <Mixed48 text={solution.why} />
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      ))}

      {!submitted && (
        <div className="l48-submit-bar">
          <button
            type="button"
            data-test-submit
            className="l48-button l48-button--dark"
            disabled={!complete || loading}
            onClick={submit}
          >
            {loading ? "جارٍ التسليم…" : "تسليم الاختبار وتصحيحه"}
          </button>
          {complete ? (
            <span>كل الأسئلة مكتملة — يمكنك التسليم.</span>
          ) : (
            <span>
              أجب عن الأسئلة المتبقية أولًا: <bdi dir="ltr">{TEST_QUESTION_COUNT_48 - answered}</bdi>
            </span>
          )}
          {loading && <p role="status">جارٍ تحميل التصحيح…</p>}
          {error && (
            <p role="alert" data-test-error>
              تعذّر تحميل التصحيح مؤقتًا. إجاباتك محفوظة؛ اضغط التسليم لإعادة المحاولة.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
