import { useRef, useState } from "react";
import {
  TEST_LEVELS_50,
  TEST_QUESTIONS_50,
  TEST_QUESTION_COUNT_50,
  answeredCount50,
  testComplete50,
  type TestQuestion50,
} from "./testData50";
import type { GradedTestResult50 } from "./testKey50";
import { retryModuleUrl50 } from "./retry50";
import { En50, Mixed50 } from "./kit50";

function Feedback50({ text }: { text: string }) {
  const lines = text.split(/\s*[؛;]\s*/).filter(Boolean);
  return (
    <>
      {lines.map((line, index) => (
        <span className="l50-feedback-line" key={index}>
          <Mixed50 text={line} />
        </span>
      ))}
    </>
  );
}

type KeyModule50 = typeof import("./testKey50");
// A separate module URL makes a transient failed import retryable in browsers
// that cache failed module fetches. Neither URL is requested before submission.
let recoveredKey50: { url: string } | "retry-entry" | null = null;
async function defaultKeyLoader50(
  retry: boolean,
  previousError?: unknown,
  attempt = 0,
): Promise<KeyModule50> {
  if (recoveredKey50 === "retry-entry") return import("./testKey50?retry") as unknown as Promise<KeyModule50>;
  if (recoveredKey50) {
    try {
      return (await import(/* @vite-ignore */ recoveredKey50.url)) as KeyModule50;
    } catch {
      recoveredKey50 = null;
    }
  }
  if (!retry) return import("./testKey50");
  const url = retryModuleUrl50(previousError, "testKey50", attempt);
  if (url) {
    const key = (await import(/* @vite-ignore */ url)) as KeyModule50;
    recoveredKey50 = { url };
    return key;
  }
  const key = (await import("./testKey50?retry")) as unknown as KeyModule50;
  recoveredKey50 = "retry-entry";
  return key;
}

type Props = {
  answers: Record<string, string>;
  onAnswersChange: (answers: Record<string, string>) => void;
  result: GradedTestResult50 | null;
  onResult: (result: GradedTestResult50 | null) => void;
  /** Test hook: audits inject a failing/succeeding key loader. */
  keyLoader?: () => Promise<typeof import("./testKey50")>;
};

const isArabic = (value: string) => /[\u0600-\u06ff]/.test(value);

function ChoiceField({
  question,
  value,
  onChange,
  disabled,
}: {
  question: TestQuestion50;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="l50-test-options" dir="ltr" role="group" aria-label={`خيارات السؤال ${question.number}`}>
      {question.options?.map((option) => (
        <button
          type="button"
          key={option.id}
          className="l50-test-option"
          aria-pressed={value === option.id}
          disabled={disabled}
          onClick={() => onChange(option.id)}
        >
          <span className="l50-option-letter" aria-hidden="true">
            {option.id.toUpperCase()}
          </span>
          <En50>{option.text}</En50>
        </button>
      ))}
    </div>
  );
}

export function TestArea50({ answers, onAnswersChange, result, onResult, keyLoader }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(false);
  const answered = answeredCount50(answers);
  const complete = testComplete50(answers);

  async function loadKey() {
    let lastError: unknown = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        return await defaultKeyLoader50(attempt > 1, lastError, attempt);
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
      onResult(key.gradeTest50(answers));
      window.setTimeout(() => document.getElementById("l50-test-result")?.scrollIntoView({ behavior: "smooth" }), 60);
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
    document.getElementById("l50-test-top")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="l50-test" id="l50-test-top">
      <div className="l50-test-status" aria-live="polite">
        <span>
          <bdi dir="ltr">
            {answered} / {TEST_QUESTION_COUNT_50}
          </bdi>{" "}
          سؤالًا تمت الإجابة عنه
        </span>
        <span>25 سؤالًا · 4 مجموعات · لا تُعرض الإجابات قبل التسليم</span>
      </div>

      {TEST_LEVELS_50.map((level) => {
        const questions = TEST_QUESTIONS_50.filter((question) => question.level === level.level);
        const levelResult = result?.byLevel[level.level];
        const levelStart = questions[0]?.number ?? 1;
        return (
          <section className="l50-test-level" key={level.level} data-test-level={level.level}>
            <header className="l50-test-level-head">
              <div>
                <span className="l50-test-level-no">{String(level.level).padStart(2, "0")}</span>
                <h3>{level.title}</h3>
                <p>{level.instruction}</p>
              </div>
              <div className="l50-test-level-meta">
                <En50>{level.en}</En50>
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
                  className={`l50-test-q ${result ? (graded ? "is-correct" : "is-wrong") : ""}`}
                  key={question.id}
                  data-test-q={question.id}
                >
                  <div className="l50-question-top">
                    <span className="l50-question-number" aria-hidden="true">
                      {String(question.number).padStart(2, "0")}
                    </span>
                    <p dir={isArabic(question.prompt) ? "rtl" : "ltr"} lang={isArabic(question.prompt) ? "ar" : "en"}>
                      {question.prompt}
                    </p>
                  </div>
                  {question.contextAr && (
                    <p className="l50-test-hint">
                      <Mixed50 text={question.contextAr} />
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
                      className="l50-input"
                      value={value}
                      disabled={Boolean(result)}
                      placeholder={question.placeholder ?? "Write the full corrected sentence…"}
                      aria-label={`إجابة السؤال ${question.number}`}
                      onChange={(event) => onAnswersChange({ ...answers, [question.id]: event.target.value })}
                    />
                  )}
                  {result && solution && (
                    <div className="l50-test-feedback" data-question-feedback>
                      <p className={`l50-test-verdict ${graded ? "is-correct" : "is-wrong"}`}>
                        {graded ? "✓ إجابة صحيحة" : "✕ إجابة غير صحيحة"}
                      </p>
                      <p>
                        <strong>الإجابة: </strong>
                        <En50>{solution.model}</En50>
                      </p>
                      <p>
                        <strong>لماذا: </strong>
                        <Feedback50 text={solution.why} />
                      </p>
                      {solution.alternatives && (
                        <p>
                          <strong>بدائل مقبولة: </strong>
                          <Mixed50 text={solution.alternatives} />
                        </p>
                      )}
                      {solution.rejected && (
                        <p>
                          <strong>مرفوض: </strong>
                          <Feedback50 text={solution.rejected} />
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
        <p className="l50-test-error" role="alert" data-test-error>
          {error}{" "}
          <button type="button" className="l50-text-button" onClick={submit} disabled={busy}>
            أعد المحاولة
          </button>
        </p>
      )}

      <div className="l50-test-actions">
        {!result ? (
          <button
            type="button"
            className="l50-button l50-button--dark"
            disabled={!complete || busy}
            onClick={submit}
            data-test-submit
          >
            {busy ? "جارٍ التصحيح…" : `سلّم الاختبار (${answered}/${TEST_QUESTION_COUNT_50})`}
          </button>
        ) : (
          <button type="button" className="l50-button l50-button--outline" onClick={reset} data-test-reset>
            إعادة الاختبار من جديد
          </button>
        )}
        {!complete && !result && <p className="l50-test-note">أجب عن جميع الأسئلة الخمسة والعشرين قبل التسليم.</p>}
      </div>

      {result && (
        <div className="l50-test-result" id="l50-test-result" data-test-result>
          <div className="l50-test-score">
            <span className="l50-mini-label">النتيجة النهائية</span>
            <bdi dir="ltr" className="l50-test-score-value" data-test-score>
              {result.score} / {result.total}
            </bdi>
            <div className="l50-score-track" aria-hidden="true">
              <div style={{ width: `${Math.round((result.score / result.total) * 100)}%` }} />
            </div>
            <p>راجع كل سؤال أعلاه: التفسير يربط إجابتك بالدليل والزمن ودرجة التأكد، ويفرّق بين البديل المقبول والخطأ الشائع.</p>
          </div>
          <div className="l50-test-levels">
            {TEST_LEVELS_50.map((level) => {
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
