import { useRef, useState } from "react";
import {
  TEST_LEVELS_49,
  TEST_QUESTIONS_49,
  TEST_QUESTION_COUNT_49,
  answeredCount49,
  testComplete49,
  type TestQuestion49,
} from "./testData49";
import type { GradedTestResult49 } from "./testKey49";
import { retryModuleUrl49 } from "./retry49";
import { En49, Mixed49 } from "./kit49";


function Feedback49({ text }: { text: string }) {
  const lines = text.split(/\s*[؛;]\s*/).filter(Boolean);
  return (
    <>
      {lines.map((line, index) => (
        <span className="l49-feedback-line" key={index}>
          <Mixed49 text={line} />
        </span>
      ))}
    </>
  );
}

type KeyModule49 = typeof import("./testKey49");
// A separate module URL makes a transient failed import retryable in browsers
// that cache failed module fetches. Neither URL is requested before submission.
let recoveredKey49: { url: string } | "retry-entry" | null = null;
async function defaultKeyLoader49(
  retry: boolean,
  previousError?: unknown,
  attempt = 0,
): Promise<KeyModule49> {
  if (recoveredKey49 === "retry-entry") return import("./testKey49?retry") as unknown as Promise<KeyModule49>;
  if (recoveredKey49) {
    try {
      return (await import(/* @vite-ignore */ recoveredKey49.url)) as KeyModule49;
    } catch {
      recoveredKey49 = null;
    }
  }
  if (!retry) return import("./testKey49");
  const url = retryModuleUrl49(previousError, "testKey49", attempt);
  if (url) {
    const key = (await import(/* @vite-ignore */ url)) as KeyModule49;
    recoveredKey49 = { url };
    return key;
  }
  const key = (await import("./testKey49?retry")) as unknown as KeyModule49;
  recoveredKey49 = "retry-entry";
  return key;
}

type Props = {
  answers: Record<string, string>;
  onAnswersChange: (answers: Record<string, string>) => void;
  result: GradedTestResult49 | null;
  onResult: (result: GradedTestResult49 | null) => void;
  /** Test hook: audits inject a failing/succeeding key loader. */
  keyLoader?: () => Promise<typeof import("./testKey49")>;
};

const isArabic = (value: string) => /[\u0600-\u06ff]/.test(value);

function ChoiceField({
  question,
  value,
  onChange,
  disabled,
}: {
  question: TestQuestion49;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="l49-test-options" dir="ltr" role="group" aria-label={`خيارات السؤال ${question.number}`}>
      {question.options?.map((option) => (
        <button
          type="button"
          key={option.id}
          className="l49-test-option"
          aria-pressed={value === option.id}
          disabled={disabled}
          onClick={() => onChange(option.id)}
        >
          <span className="l49-option-letter" aria-hidden="true">
            {option.id.toUpperCase()}
          </span>
          <En49>{option.text}</En49>
        </button>
      ))}
    </div>
  );
}

export function TestArea49({ answers, onAnswersChange, result, onResult, keyLoader }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(false);
  const answered = answeredCount49(answers);
  const complete = testComplete49(answers);

  async function loadKey() {
    let lastError: unknown = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        return await defaultKeyLoader49(attempt > 1, lastError, attempt);
      } catch (loadError) {
        lastError = loadError;
      }
    }
    throw lastError;
  }

  async function submit() {
    if (inFlight.current || !complete || result) return;
    inFlight.current = true;
    setBusy(true);
    setError(null);
    try {
      const key = keyLoader ? await keyLoader() : await loadKey();
      onResult(key.gradeTest49(answers));
      window.setTimeout(() => document.getElementById("l49-test-result")?.scrollIntoView({ behavior: "smooth" }), 60);
    } catch {
      setError("تعذّر تحميل مفتاح التصحيح. إجاباتك محفوظة كما هي — أعد المحاولة بعد لحظات.");
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  function reset() {
    setError(null);
    onResult(null);
    onAnswersChange({});
    document.getElementById("l49-test-top")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="l49-test" id="l49-test-top">
      <div className="l49-test-status" aria-live="polite">
        <span>
          <bdi dir="ltr">
            {answered} / {TEST_QUESTION_COUNT_49}
          </bdi>{" "}
          سؤالًا تمت الإجابة عنه
        </span>
        <span>25 سؤالًا · 4 مجموعات · لا تُعرض الإجابات قبل التسليم</span>
      </div>

      {TEST_LEVELS_49.map((level) => {
        const questions = TEST_QUESTIONS_49.filter((question) => question.level === level.level);
        const levelResult = result?.byLevel[level.level];
        const levelStart = questions[0]?.number ?? 1;
        return (
          <section className="l49-test-level" key={level.level} data-test-level={level.level}>
            <header className="l49-test-level-head">
              <div>
                <span className="l49-test-level-no">{String(level.level).padStart(2, "0")}</span>
                <h3>{level.title}</h3>
                <p>{level.instruction}</p>
              </div>
              <div className="l49-test-level-meta">
                <En49>{level.en}</En49>
                <span>
                  الأسئلة <bdi dir="ltr">{levelStart}–{levelStart + questions.length - 1}</bdi>
                </span>
                {levelResult && (
                  <bdi dir="ltr">
                    {levelResult.score} / {levelResult.total}
                  </bdi>
                )}
              </div>
            </header>
            {questions.map((question) => {
              const value = answers[question.id] ?? "";
              const graded = result?.byQuestion[question.id];
              const solution = result?.solutions[question.id];
              return (
                <div
                  className={`l49-test-q ${result ? (graded ? "is-correct" : "is-wrong") : ""}`}
                  key={question.id}
                  data-test-q={question.id}
                >
                  <div className="l49-question-top">
                    <span className="l49-question-number" aria-hidden="true">
                      {String(question.number).padStart(2, "0")}
                    </span>
                    <p dir={isArabic(question.prompt) ? "rtl" : "ltr"} lang={isArabic(question.prompt) ? "ar" : "en"}>
                      {question.prompt}
                    </p>
                  </div>
                  {question.contextAr && (
                    <p className="l49-test-hint">
                      <Mixed49 text={question.contextAr} />
                    </p>
                  )}
                  {question.type === "choice" ? (
                    <ChoiceField
                      question={question}
                      value={value}
                      disabled={Boolean(result)}
                      onChange={(next) => onAnswersChange({ ...answers, [question.id]: next })}
                    />
                  ) : (
                    <input
                      type="text"
                      dir="ltr"
                      lang="en"
                      className="l49-input"
                      value={value}
                      disabled={Boolean(result)}
                      placeholder={question.placeholder ?? "Write the full corrected sentence…"}
                      aria-label={`إجابة السؤال ${question.number}`}
                      onChange={(event) => onAnswersChange({ ...answers, [question.id]: event.target.value })}
                    />
                  )}
                  {result && solution && (
                    <div className="l49-test-feedback" data-question-feedback>
                      <p className={`l49-test-verdict ${graded ? "is-correct" : "is-wrong"}`}>
                        {graded ? "✓ إجابة صحيحة" : "✕ إجابة غير صحيحة"}
                      </p>
                      <p>
                        <strong>الإجابة: </strong>
                        <En49>{solution.model}</En49>
                      </p>
                      <p>
                        <strong>لماذا: </strong>
                        <Feedback49 text={solution.why} />
                      </p>
                      {solution.alternatives && (
                        <p>
                          <strong>بدائل مقبولة: </strong>
                          <Mixed49 text={solution.alternatives} />
                        </p>
                      )}
                      {solution.rejected && (
                        <p>
                          <strong>مرفوض: </strong>
                          <Feedback49 text={solution.rejected} />
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        );
      })}

      {error && (
        <p className="l49-test-error" role="alert" data-test-error>
          {error}{" "}
          <button type="button" className="l49-text-button" onClick={submit} disabled={busy}>
            أعد المحاولة
          </button>
        </p>
      )}

      <div className="l49-test-actions">
        {!result ? (
          <button
            type="button"
            className="l49-button l49-button--dark"
            disabled={!complete || busy}
            onClick={submit}
            data-test-submit
          >
            {busy ? "جارٍ التصحيح…" : `سلّم الاختبار (${answered}/${TEST_QUESTION_COUNT_49})`}
          </button>
        ) : (
          <button type="button" className="l49-button l49-button--outline" onClick={reset} data-test-reset>
            حالات إعادة المحاولة — أعد الاختبار
          </button>
        )}
        {!complete && !result && <p className="l49-test-note">أجب عن جميع الأسئلة الخمسة والعشرين قبل التسليم.</p>}
      </div>

      {result && (
        <div className="l49-test-result" id="l49-test-result" data-test-result>
          <div className="l49-test-score">
            <span className="l49-mini-label">النتيجة النهائية</span>
            <bdi dir="ltr" className="l49-test-score-value" data-test-score>
              {result.score} / {result.total}
            </bdi>
            <div className="l49-score-track" aria-hidden="true">
              <div style={{ width: `${Math.round((result.score / result.total) * 100)}%` }} />
            </div>
            <p>المراجعة أدناه تشرح كل سؤال، وتفرّق بين البديل المقبول والخطأ الشائع.</p>
          </div>
          <div className="l49-test-levels">
            {TEST_LEVELS_49.map((level) => {
              const data = result.byLevel[level.level];
              return (
                <div key={level.level}>
                  <span>{level.title}</span>
                  <bdi dir="ltr">
                    {data?.score ?? 0} / {data?.total ?? 0}
                  </bdi>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
