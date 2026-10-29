import { useRef, useState } from "react";
import { En46, Mixed46 } from "./kit46";
import { retryModuleUrl46 } from "./retry46";
import { answeredCount46, testComplete46, TEST_LEVELS_46, TEST_QUESTIONS_46, TEST_QUESTION_COUNT_46 } from "./testData46";
import type { GradedTestResult46 } from "./testKey46";

type KeyModule46 = typeof import("./testKey46");
type KeyLoader46 = (retry: boolean, previousError?: unknown, attempt?: number) => Promise<KeyModule46>;
// A separate Vite module URL makes a transient failed import retryable in browsers
// that cache failed module fetches. Neither URL is requested before submission.
const defaultKeyLoader46: KeyLoader46 = (retry, previousError, attempt = 0) => {
  if (!retry) return import("./testKey46");
  const url = retryModuleUrl46(previousError, "testKey46", attempt);
  return url ? import(/* @vite-ignore */ url) as Promise<KeyModule46>
    : import("./testKey46?retry") as unknown as Promise<KeyModule46>;
};

export default function TestArea46({ answers, result, onChangeAnswer, onSubmitResult, onReset, keyLoader = defaultKeyLoader46 }: {
  answers: Record<string, string>;
  result: GradedTestResult46 | null;
  onChangeAnswer: (id: string, value: string) => void;
  onSubmitResult: (result: GradedTestResult46) => void;
  onReset: () => void;
  keyLoader?: KeyLoader46;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const busy = useRef(false);
  const failed = useRef(false);
  const lastError = useRef<unknown>(null);
  const attempts = useRef(0);
  const answered = answeredCount46(answers);
  const complete = testComplete46(answers);
  const submitted = result !== null;

  async function submit() {
    if (busy.current || submitted || !complete) return;
    busy.current = true;
    setLoading(true);
    setError(false);
    try {
      const key = await keyLoader(failed.current, lastError.current, attempts.current);
      onSubmitResult(key.gradeTest46(answers));
    } catch (error) {
      lastError.current = error;
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
    failed.current = false;
    lastError.current = null;
    attempts.current = 0;
    setError(false);
    onReset();
  }

  return (
    <section className="l46-test" data-area="lesson46-test" data-final-test>
      <div className="l46-test-intro">
        <div><strong>25 سؤالًا · 5 مستويات</strong><p>أجب عن جميع الأسئلة قبل التسليم؛ لا يُعرض التصحيح أثناء الإجابة.</p></div>
        <span role="status" aria-live="polite">تمت الإجابة عن <bdi dir="ltr">{answered} / {TEST_QUESTION_COUNT_46}</bdi></span>
      </div>
      {result && (
        <div className="l46-result" data-test-result role="status" aria-live="polite">
          <div><span className="l46-result-kicker">MISSION COMPLETE</span><h2>نتيجتك: <bdi dir="ltr">{result.score} / {result.total}</bdi></h2><p>راجع تفسير كل إجابة، ثم حاول مجددًا متى شئت.</p></div>
          <button type="button" className="l46-button l46-button--light" data-test-reset onClick={reset}>إعادة الاختبار ↺</button>
          <div className="l46-level-scores">{TEST_LEVELS_46.map((level) => <span key={level.level}>المستوى {level.level} · <bdi dir="ltr">{result.byLevel[level.level]?.score ?? 0} / {result.byLevel[level.level]?.total ?? 5}</bdi></span>)}</div>
        </div>
      )}
      {TEST_LEVELS_46.map((level) => (
        <section className="l46-test-level" data-test-level={level.level} key={level.level}>
          <div className="l46-level-header"><div><En46>{level.en}</En46><h2>{level.title}</h2></div><p>{level.instruction}</p></div>
          {TEST_QUESTIONS_46.filter((q) => q.level === level.level).map((question) => {
            const value = answers[question.id] ?? "";
            const correct = result?.byQuestion[question.id];
            const solution = result?.solutions[question.id];
            return (
              <article key={question.id} data-test-q={question.number} data-question-id={question.id} className={`l46-test-question ${submitted ? (correct ? "is-correct" : "is-wrong") : ""}`}>
                <div className="l46-question-top"><span className="l46-question-number">{String(question.number).padStart(2, "0")}</span><p dir="ltr" lang="en">{question.prompt}</p></div>
                {question.contextAr && <p className="l46-instruction"><Mixed46 text={question.contextAr} /></p>}
                {question.type === "choice" ? (
                  <div className="l46-options l46-test-options" role="group" aria-label={`خيارات السؤال ${question.number}`}>
                    {question.options?.map((option, i) => (
                      <button type="button" key={option.id} aria-pressed={value === option.id} disabled={submitted || loading} onClick={() => onChangeAnswer(question.id, option.id)}>
                        <span className="l46-option-letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                        {option.lang === "en" ? <En46>{option.text}</En46> : <span dir="rtl">{option.text}</span>}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input type="text" dir="ltr" lang="en" className="l46-input" aria-label={`إجابة السؤال ${question.number}`} value={value} disabled={submitted || loading}
                    placeholder="Write in English…" onChange={(event) => onChangeAnswer(question.id, event.target.value)} />
                )}
                {submitted && solution && (
                  <div className={`l46-feedback ${correct ? "is-correct" : "is-retry"}`} data-question-feedback={question.id}>
                    <strong>{correct ? "✓ إجابة صحيحة" : "✕ تحتاج إلى مراجعة"}</strong>
                    <p>الإجابة النموذجية: <Mixed46 text={solution.model} /></p>
                    <p><Mixed46 text={solution.why} /></p>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      ))}
      {!submitted && (
        <div className="l46-submit-bar">
          {error && <p role="alert" data-test-error>تعذّر تحميل التصحيح مؤقتًا. إجاباتك محفوظة؛ اضغط التسليم لإعادة المحاولة.</p>}
          {loading && <p role="status">جارٍ تحميل التصحيح…</p>}
          <button type="button" data-test-submit className="l46-button l46-button--dark" disabled={!complete || loading} onClick={submit}>{loading ? "جارٍ التسليم…" : "تسليم الاختبار وتصحيحه"}</button>
          {!complete && <span>أجب عن الأسئلة المتبقية أولًا: <bdi dir="ltr">{TEST_QUESTION_COUNT_46 - answered}</bdi></span>}
        </div>
      )}
    </section>
  );
}
