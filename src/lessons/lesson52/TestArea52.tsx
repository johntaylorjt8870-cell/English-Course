import { useRef, useState } from "react";
import {
  TEST_LEVELS_52,
  TEST_QUESTIONS_52,
  TEST_QUESTION_COUNT_52,
  answeredCount52,
  testComplete52,
  type TestQuestion52,
} from "./testData52";
import type { GradedTestResult52 } from "./testKey52";
import { retryModuleUrl52 } from "./retry52";
import { En52, Mixed52 } from "./kit52";

function Feedback52({ text }: { text: string }) {
  const lines = text.split(/\s*[؛;]\s*/).filter(Boolean);
  return (
    <>
      {lines.map((line, index) => (
        <span key={index} className="mt-1 block">
          <Mixed52 text={line} />
        </span>
      ))}
    </>
  );
}

type KeyModule52 = typeof import("./testKey52");
// A separate module URL makes a transient failed import retryable in browsers
// that cache failed module fetches. Neither URL is requested before submission.
let recoveredKey52: { url: string } | "retry-entry" | null = null;
async function defaultKeyLoader52(
  retry: boolean,
  previousError?: unknown,
  attempt = 0,
): Promise<KeyModule52> {
  if (recoveredKey52 === "retry-entry") return import("./testKey52?retry") as unknown as Promise<KeyModule52>;
  if (recoveredKey52) {
    try {
      return (await import(/* @vite-ignore */ recoveredKey52.url)) as KeyModule52;
    } catch {
      recoveredKey52 = null;
    }
  }
  if (!retry) return import("./testKey52");
  const url = retryModuleUrl52(previousError, "testKey52", attempt);
  if (url) {
    const key = (await import(/* @vite-ignore */ url)) as KeyModule52;
    recoveredKey52 = { url };
    return key;
  }
  const key = (await import("./testKey52?retry")) as unknown as KeyModule52;
  recoveredKey52 = "retry-entry";
  return key;
}

type Props = {
  answers: Record<string, string>;
  onAnswersChange: (answers: Record<string, string>) => void;
  result: GradedTestResult52 | null;
  onResult: (result: GradedTestResult52 | null) => void;
  /** Test hook: audits inject a failing/succeeding key loader. */
  keyLoader?: () => Promise<typeof import("./testKey52")>;
};

const isArabic = (value: string) => /[\u0600-\u06ff]/.test(value);

function ChoiceField({
  question,
  value,
  onChange,
  disabled,
}: {
  question: TestQuestion52;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <div
      className={`mt-3 grid gap-2 ${question.level === 4 ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}
      dir="ltr"
      role="group"
      aria-label={`خيارات السؤال ${question.number}`}
    >
      {question.options?.map((option) => (
        <button
          type="button"
          key={option.id}
          aria-pressed={value === option.id}
          disabled={disabled}
          onClick={() => onChange(option.id)}
          className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-left text-base font-bold transition disabled:cursor-not-allowed ${
            value === option.id
              ? "border-transparent bg-slate-900 text-white shadow"
              : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
          }`}
        >
          <span
            className={`grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs font-black ${
              value === option.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
            }`}
            aria-hidden="true"
          >
            {option.id.toUpperCase()}
          </span>
          <En52>{option.text}</En52>
        </button>
      ))}
    </div>
  );
}

export function TestArea52({ answers, onAnswersChange, result, onResult, keyLoader }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(false);
  const answered = answeredCount52(answers);
  const complete = testComplete52(answers);

  async function loadKey() {
    let lastError: unknown = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        return await defaultKeyLoader52(attempt > 1, lastError, attempt);
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
      onResult(key.gradeTest52(answers));
      window.setTimeout(() => document.getElementById("l52-test-result")?.scrollIntoView({ behavior: "smooth" }), 60);
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
    document.getElementById("l52-test-top")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="grid gap-5" id="l52-test-top" data-test-area="52">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-500">
        <span aria-live="polite">
          <bdi dir="ltr" className="text-slate-900">
            {answered} / {TEST_QUESTION_COUNT_52}
          </bdi>{" "}
          سؤالًا تمت الإجابة عنه
        </span>
        <span>25 سؤالًا · 5 أقسام · لا تُعرض الإجابات قبل التسليم</span>
      </div>

      {TEST_LEVELS_52.map((level) => {
        const questions = TEST_QUESTIONS_52.filter((question) => question.level === level.level);
        const levelResult = result?.byLevel[level.level];
        const levelStart = questions[0]?.number ?? 1;
        return (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6" key={level.level} data-test-level={level.level}>
            <header className="mb-4 border-b border-slate-100 pb-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="font-head grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-900 text-lg font-bold text-white shadow">
                    {level.level}
                  </span>
                  <div>
                    <h3 className="font-head text-xl font-bold text-slate-900">{level.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{level.instruction}</p>
                  </div>
                </div>
                <div className="text-left text-xs font-bold text-slate-400">
                  <En52>{level.en}</En52>
                  <span className="mt-1 block">
                    الأسئلة <bdi dir="ltr">{levelStart}–{levelStart + questions.length - 1}</bdi>
                  </span>
                  {levelResult && (
                    <bdi dir="ltr" className="mt-1 block text-slate-700">
                      {levelResult.score} / {levelResult.total}
                    </bdi>
                  )}
                </div>
              </div>
            </header>

            <div className="grid gap-3">
              {questions.map((question) => {
                const value = answers[question.id] ?? "";
                const graded = result?.byQuestion[question.id];
                const solution = result?.solutions[question.id];
                return (
                  <div
                    className={`rounded-3xl border-2 p-4 ${
                      result
                        ? graded
                          ? "border-emerald-300 bg-emerald-50/50"
                          : "border-rose-300 bg-rose-50/40"
                        : "border-slate-200 bg-white"
                    }`}
                    key={question.id}
                    data-test-q={question.id}
                  >
                    <div className="flex flex-wrap items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                        {question.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          dir={isArabic(question.prompt) ? "rtl" : "ltr"}
                          lang={isArabic(question.prompt) ? "ar" : "en"}
                          className={isArabic(question.prompt) ? "font-head text-lg font-bold text-slate-800" : "font-en text-lg font-bold text-slate-800"}
                        >
                          {question.prompt}
                        </p>
                        {question.contextAr && (
                          <p className="mt-1 text-xs font-semibold text-slate-500">
                            <Mixed52 text={question.contextAr} />
                          </p>
                        )}
                      </div>
                    </div>

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
                        className="font-en mt-3 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-sky-400 disabled:bg-slate-50"
                        value={value}
                        disabled={Boolean(result)}
                        placeholder={question.placeholder ?? "Write the full sentence…"}
                        aria-label={`إجابة السؤال ${question.number}`}
                        onChange={(event) => onAnswersChange({ ...answers, [question.id]: event.target.value })}
                      />
                    )}

                    {result && solution && (
                      <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm" data-question-feedback>
                        <p className={`font-bold ${graded ? "text-emerald-700" : "text-rose-600"}`}>
                          {graded ? "✓ إجابة صحيحة" : "✕ إجابة غير صحيحة"}
                        </p>
                        <p className="mt-1 text-slate-700">
                          <strong>الإجابة: </strong>
                          <En52 className="font-bold">{solution.model}</En52>
                        </p>
                        <p className="mt-1 text-slate-600">
                          <strong>لماذا: </strong>
                          <Feedback52 text={solution.why} />
                        </p>
                        {solution.alternatives && (
                          <p className="mt-1 text-slate-500">
                            <strong>بدائل مقبولة: </strong>
                            <Mixed52 text={solution.alternatives} />
                          </p>
                        )}
                        {solution.rejected && (
                          <p className="mt-1 text-slate-500">
                            <strong>مرفوض: </strong>
                            <Feedback52 text={solution.rejected} />
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {error && (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700" role="alert" data-test-error>
          {error}{" "}
          <button type="button" className="rounded-lg bg-slate-900 px-3 py-1 text-white" onClick={submit} disabled={busy}>
            أعد المحاولة
          </button>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {!result ? (
          <button
            type="button"
            className="rounded-xl bg-slate-900 px-5 py-2.5 font-bold text-white shadow transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!complete || busy}
            onClick={submit}
            data-test-submit
          >
            {busy ? "جارٍ التصحيح…" : `سلّم الاختبار (${answered}/${TEST_QUESTION_COUNT_52})`}
          </button>
        ) : (
          <button
            type="button"
            className="rounded-xl bg-slate-100 px-5 py-2.5 font-bold text-slate-700 transition hover:bg-slate-200"
            onClick={reset}
            data-test-reset
          >
            إعادة الاختبار من جديد
          </button>
        )}
        {!complete && !result && <p className="text-sm font-semibold text-slate-500">أجب عن جميع الأسئلة الخمسة والعشرين قبل التسليم.</p>}
      </div>

      {result && (
        <div className="rounded-[2rem] border-2 border-emerald-200 bg-emerald-50/60 p-6" id="l52-test-result" data-test-result>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700">النتيجة النهائية</span>
              <bdi dir="ltr" className="font-head mt-1 block text-5xl font-bold text-slate-900" data-test-score>
                {result.score} / {result.total}
              </bdi>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                راجع كل سؤال أعلاه: التفسير يربط إجابتك بالقاعدة والتصريف، ويفرّق بين البديل المقبول والخطأ الشائع.
              </p>
            </div>
            <div className="grid gap-2 text-sm">
              {TEST_LEVELS_52.map((level) => {
                const data = result.byLevel[level.level];
                return (
                  <div key={level.level} className="flex min-w-48 items-center justify-between gap-4 rounded-xl bg-white px-3 py-2">
                    <span className="font-semibold text-slate-600">{level.title}</span>
                    <bdi dir="ltr" className="font-bold text-slate-900">
                      {data?.score ?? 0} / {data?.total ?? 0}
                    </bdi>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
