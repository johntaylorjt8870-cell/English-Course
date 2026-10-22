import { useState } from "react";
import { En41, Text41, Note41 } from "./design";
import { TEST_LEVELS_41, TEST_QUESTIONS_41, testComplete41, answeredCount41, answerKey41, type TestAnswers41 } from "./testData41";
import type { Graded41 } from "./key41";

export type TestResult41 = { results: Graded41[]; score: number; total: number };

function Question41({
  question,
  answers,
  change,
  disabled,
}: {
  question: (typeof TEST_QUESTIONS_41)[number];
  answers: TestAnswers41;
  change: (key: string, value: string) => void;
  disabled: boolean;
}) {
  return (
    <fieldset data-question-id={question.id} disabled={disabled} className="rounded-2xl border border-slate-200 bg-white p-3 md:p-4">
      <legend className="px-1 text-sm font-bold text-slate-500">
        <Text41 text={`السؤال ${question.number}`} />
      </legend>
      <div className="space-y-1">
        {question.lines.map((line, i) => (
          <p key={i} dir={/[A-Za-z]/.test(line) && !/[\u0600-\u06FF]/.test(line) ? "ltr" : undefined} className="font-en text-lg font-bold leading-8 text-slate-900">
            <Text41 text={line} />
          </p>
        ))}
      </div>
      {question.options && (
        <div className="mt-2 flex flex-wrap gap-2">
          {question.options.map((option, optionIndex) => {
            const key = answerKey41(question.id, "answer");
            const selected = answers[key] === option;
            return (
              <label
                key={`${option}-${optionIndex}`}
                className={`cursor-pointer rounded-xl border-2 px-3.5 py-2 text-base font-bold transition ${
                  selected ? "border-violet-500 bg-violet-600 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-300"
                }`}
              >
                <input type="radio" name={question.id} value={option} checked={selected} onChange={() => change(key, option)} className="sr-only" />
                <En41>{option}</En41>
              </label>
            );
          })}
        </div>
      )}
      {!question.options && (
        <div className={`mt-2 grid gap-2 ${question.fields.length > 1 ? "md:grid-cols-2" : ""}`}>
          {question.fields.map((f) => (
            <label key={f.key} className="block text-sm font-bold text-slate-600">
              {f.label}
              <textarea
                dir="auto"
                rows={question.rows ?? 2}
                value={answers[answerKey41(question.id, f.key)] ?? ""}
                onChange={(event) => change(answerKey41(question.id, f.key), event.target.value)}
                placeholder={f.placeholder}
                className="font-en mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-base font-medium text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white"
              />
            </label>
          ))}
        </div>
      )}
    </fieldset>
  );
}

export function TestArea41({
  answers,
  change,
  submitted,
  level,
  itemRange,
  onSubmit,
}: {
  answers: TestAnswers41;
  change: (key: string, value: string) => void;
  submitted: boolean;
  level: number;
  itemRange?: [number, number];
  onSubmit: (result: TestResult41) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const complete = testComplete41(answers);
  const answered = answeredCount41(answers);
  const current = TEST_LEVELS_41.find((item) => item.level === level)!;
  const levelLastNumber = Math.max(...current.questions.map((question) => question.number));
  const last = level === TEST_LEVELS_41.length && (!itemRange || itemRange[1] === levelLastNumber);
  const questions = current.questions.filter((q) => !itemRange || (q.number >= itemRange[0] && q.number <= itemRange[1]));
  const [levelTitleArabic, levelTitleEnglish = ""] = current.title.split(/[:：]\s*/);
  const partLabel = itemRange ? ` · QUESTIONS ${itemRange[0]}–${itemRange[1]}` : "";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!complete || submitted) return;
    setBusy(true);
    setError("");
    try {
      const { grade41 } = await import("./key41");
      onSubmit(grade41(answers));
    } catch {
      setError("تعذّر تحميل المصحّح. حاول مرة أخرى.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold tracking-wide text-violet-700">
              FINAL TEST · LEVEL <bdi dir="ltr">{level}</bdi> / 5{partLabel}
            </p>
            <p className="font-head mt-1 flex flex-wrap items-center gap-2 text-base font-bold text-slate-700">
              <Text41 text={levelTitleArabic} />
              {levelTitleEnglish && (
                <>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span dir="ltr" className="font-en text-violet-700">
                    {levelTitleEnglish}
                  </span>
                </>
              )}
            </p>
          </div>
          <p className="text-sm font-bold text-slate-500">
            <Text41 text="أجبت عن" /> <bdi dir="ltr">{answered} / {TEST_QUESTIONS_41.length}</bdi>
          </p>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-orange-400 to-emerald-500 transition-all" style={{ width: `${(answered / TEST_QUESTIONS_41.length) * 100}%` }} />
        </div>
        {current.context && current.context.length > 0 && !itemRange && (
          <div className="mt-3 space-y-1 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            {current.context.map((line, i) => (
              <p key={i} dir={/[A-Za-z]/.test(line) && !/[\u0600-\u06FF]/.test(line) ? "ltr" : undefined} className="font-en text-base font-semibold leading-7 text-slate-700">
                <Text41 text={line} />
              </p>
            ))}
          </div>
        )}
      </section>

      <div className="space-y-3">
        {questions.map((question) => (
          <Question41 key={question.id} question={question} answers={answers} change={change} disabled={submitted} />
        ))}
      </div>

      {last && (
        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
          <button
            type="submit"
            disabled={!complete || submitted || busy}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-base font-bold text-white shadow transition enabled:hover:bg-slate-700 disabled:opacity-40"
          >
            <Text41 text={busy ? "جارٍ التصحيح…" : "تسليم الاختبار النهائي"} />
          </button>
          {!complete && (
            <p className="text-sm font-semibold text-slate-500">
              <Text41 text="أكمل كل الأسئلة — بما فيها فراغا السؤال 8 — لتفعيل التسليم." />
            </p>
          )}
          {error && (
            <p role="alert" className="text-sm font-bold text-rose-700">
              <Text41 text={error} />
            </p>
          )}
          <Note41 emoji="🔐">
            <Text41 text="لا تُحمَّل الحلول ولا شروحها مع أسئلة الاختبار. يفتح ملف التصحيح عند التسليم فقط، ثم تُعرض النتيجة والحلول التفصيلية." />
          </Note41>
        </div>
      )}
      {!last && (
        <p className="rounded-2xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-500">
          <Text41 text="أكمل بقية الأسئلة في الشريحة التالية. التسليم متاح في نهاية المستوى الخامس." />
        </p>
      )}
    </form>
  );
}
