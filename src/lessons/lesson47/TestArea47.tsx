import { useRef, useState } from "react";
import { En47, Mixed47 } from "./kit47";
import { retryModuleUrl47 } from "./retry47";
import { answeredCount47, testComplete47, TEST_LEVELS_47, TEST_QUESTIONS_47, TEST_QUESTION_COUNT_47 } from "./testData47";
import type { GradedTestResult47 } from "./testKey47";

type KeyModule47 = typeof import("./testKey47");
type KeyLoader47 = (retry: boolean, previousError?: unknown, attempt?: number) => Promise<KeyModule47>;
// A separate Vite module URL makes a transient failed import retryable in browsers
// that cache failed module fetches. Neither URL is requested before submission.
// Browsers keep a failed module resolution for the life of the page, even after
// the test area unmounts. Remember which retry entry actually worked so a retake
// (or a return to this slide) never re-requests the poisoned primary module.
let recoveredKey47: { url: string } | "retry-entry" | null = null;
const defaultKeyLoader47: KeyLoader47 = async (retry, previousError, attempt = 0) => {
  if (recoveredKey47 === "retry-entry") return import("./testKey47?retry") as unknown as Promise<KeyModule47>;
  if (recoveredKey47) {
    try {
      return await import(/* @vite-ignore */ recoveredKey47.url) as KeyModule47;
    } catch {
      recoveredKey47 = null;
    }
  }
  if (!retry) return import("./testKey47");
  const url = retryModuleUrl47(previousError, "testKey47", attempt);
  if (url) {
    const key = await import(/* @vite-ignore */ url) as KeyModule47;
    recoveredKey47 = { url };
    return key;
  }
  const key = await import("./testKey47?retry") as unknown as KeyModule47;
  recoveredKey47 = "retry-entry";
  return key;
};

export default function TestArea47({ answers, result, onChangeAnswer, onSubmitResult, onReset, keyLoader = defaultKeyLoader47 }: {
  answers: Record<string, string>;
  result: GradedTestResult47 | null;
  onChangeAnswer: (id: string, value: string) => void;
  onSubmitResult: (result: GradedTestResult47) => void;
  onReset: () => void;
  keyLoader?: KeyLoader47;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const busy = useRef(false);
  const failed = useRef(false);
  const lastError = useRef<unknown>(null);
  const attempts = useRef(0);
  const answered = answeredCount47(answers);
  const complete = testComplete47(answers);
  const submitted = result !== null;
  const progress = Math.round((answered / TEST_QUESTION_COUNT_47) * 100);

  async function submit() {
    if (busy.current || submitted || !complete) return;
    busy.current = true;
    setLoading(true);
    setError(false);
    try {
      const key = await keyLoader(failed.current, lastError.current, attempts.current);
      onSubmitResult(key.gradeTest47(answers));
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
    // A browser can cache a failed dynamic import for the rest of the page
    // session, so once the retry URL has succeeded we keep using that path on
    // later attempts instead of re-requesting the poisoned primary URL.
    attempts.current = 0;
    setError(false);
    onReset();
  }

  return (
    <section className="l47-test" data-area="lesson47-test" data-final-test>
      <div className="l47-test-intro">
        <div>
          <strong>25 سؤالًا · 5 مستويات</strong>
          <p>أجب عن جميع الأسئلة قبل التسليم؛ لا يُعرض التصحيح أثناء الإجابة.</p>
        </div>
        <span className="l47-test-counter" role="status" aria-live="polite">
          <span aria-hidden="true">✓</span>
          <bdi dir="ltr">{answered} / {TEST_QUESTION_COUNT_47}</bdi>
        </span>
        <div className="l47-test-progress" role="progressbar" aria-label="تقدم الاختبار" aria-valuemin={0} aria-valuemax={TEST_QUESTION_COUNT_47} aria-valuenow={answered}>
          <div style={{ width: `${progress}%` }} />
        </div>
      </div>

      {result && (
        <div className="l47-result" data-test-result role="status" aria-live="polite">
          <div>
            <span className="l47-result-kicker">MISSION COMPLETE</span>
            <h2>نتيجتك: <bdi dir="ltr">{result.score} / {result.total}</bdi></h2>
            <p>راجع تفسير كل إجابة، ثم حاول مجددًا متى شئت.</p>
          </div>
          <button type="button" className="l47-button l47-button--light" data-test-reset onClick={reset}>إعادة الاختبار ↺</button>
          <div className="l47-level-scores">
            {TEST_LEVELS_47.map((level) => (
              <span key={level.level}>
                المستوى {level.level} · <bdi dir="ltr">{result.byLevel[level.level]?.score ?? 0} / {result.byLevel[level.level]?.total ?? 5}</bdi>
              </span>
            ))}
          </div>
        </div>
      )}

      {TEST_LEVELS_47.map((level) => (
        <section className="l47-test-level" data-test-level={level.level} key={level.level}>
          <div className="l47-level-header">
            <span className="l47-level-badge" aria-hidden="true">{String(level.level).padStart(2, "0")}</span>
            <div>
              <En47>{level.en}</En47>
              <h2>{level.title}</h2>
            </div>
            <p>{level.instruction}</p>
          </div>
          {TEST_QUESTIONS_47.filter((q) => q.level === level.level).map((question) => {
            const value = answers[question.id] ?? "";
            const correct = result?.byQuestion[question.id];
            const solution = result?.solutions[question.id];
            return (
              <article
                key={question.id}
                data-test-q={question.number}
                data-question-id={question.id}
                className={`l47-test-question l47-practice-card ${submitted ? (correct ? "is-correct" : "is-wrong") : ""}`}
              >
                <div className="l47-question-top">
                  <span className="l47-question-number">{String(question.number).padStart(2, "0")}</span>
                  <p dir="ltr" lang="en">{question.prompt}</p>
                </div>
                {question.contextAr && <p className="l47-instruction"><Mixed47 text={question.contextAr} /></p>}
                {question.type === "choice" ? (
                  <div className="l47-options l47-test-options" role="group" aria-label={`خيارات السؤال ${question.number}`}>
                    {question.options?.map((option, i) => (
                      <button
                        type="button"
                        key={option.id}
                        aria-pressed={value === option.id}
                        disabled={submitted || loading}
                        dir={option.lang === "en" ? "ltr" : "rtl"}
                        onClick={() => onChangeAnswer(question.id, option.id)}
                      >
                        <span className="l47-option-letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                        {option.lang === "en" ? <En47>{option.text}</En47> : <span dir="rtl">{option.text}</span>}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    dir="ltr"
                    lang="en"
                    className="l47-input"
                    aria-label={`إجابة السؤال ${question.number}`}
                    value={value}
                    disabled={submitted || loading}
                    placeholder="Write in English…"
                    onChange={(event) => onChangeAnswer(question.id, event.target.value)}
                  />
                )}
                {submitted && solution && (
                  <div className={`l47-feedback ${correct ? "is-correct" : "is-retry"}`} data-question-feedback={question.id}>
                    <strong>{correct ? "✓ إجابة صحيحة" : "✕ تحتاج إلى مراجعة"}</strong>
                    <p><strong>الإجابة النموذجية: </strong><Mixed47 text={solution.model} /></p>
                    <p><Mixed47 text={solution.why} /></p>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      ))}

      {!submitted && (
        <div className="l47-submit-bar">
          <button type="button" data-test-submit className="l47-button l47-button--dark" disabled={!complete || loading} onClick={submit}>
            {loading ? "جارٍ التسليم…" : "تسليم الاختبار وتصحيحه"}
          </button>
          {complete ? <span>كل الأسئلة مكتملة — يمكنك التسليم.</span> : <span>أجب عن الأسئلة المتبقية أولًا: <bdi dir="ltr">{TEST_QUESTION_COUNT_47 - answered}</bdi></span>}
          {loading && <p role="status">جارٍ تحميل التصحيح…</p>}
          {error && <p role="alert" data-test-error>تعذّر تحميل التصحيح مؤقتًا. إجاباتك محفوظة؛ اضغط التسليم لإعادة المحاولة.</p>}
        </div>
      )}
    </section>
  );
}
