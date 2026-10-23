import { useState } from "react";
import { En42, Text42, Note42 } from "./design42";
import { TEST_LEVELS_42, TEST_QUESTIONS_42, testComplete42, answeredCount42, answerKey42, type TestAnswers42 } from "./testData42";
import type { Graded42 } from "./key42";

export type TestResult42 = { results: Graded42[]; score: number; total: number };

function Question42({
  question,
  answers,
  change,
  disabled,
}: {
  question: (typeof TEST_QUESTIONS_42)[number];
  answers: TestAnswers42;
  change: (key: string, value: string) => void;
  disabled: boolean;
}) {
  return (
    <fieldset data-question-id={question.id} disabled={disabled} className="rounded-2xl border border-slate-200 bg-white p-3 md:p-4">
      <legend className="px-1 text-sm font-bold text-slate-500">
        <Text42 text={`السؤال ${question.number}`} />
      </legend>
      <div className="space-y-1">
        {question.lines.map((line, i) => (
          <p key={i} dir={/[A-Za-z]/.test(line) && !/[\u0600-\u06FF]/.test(line) ? "ltr" : undefined} className="font-en text-lg font-bold leading-8 text-slate-900">
            <Text42 text={line} />
          </p>
        ))}
      </div>
      {question.options && (
        <div className="mt-2 flex flex-wrap gap-2">
          {question.options.map((option, optionIndex) => {
            const key = answerKey42(question.id, "answer");
            const selected = answers[key] === option;
            return (
              <label
                key={`${option}-${optionIndex}`}
                className={`cursor-pointer rounded-xl border-2 px-3.5 py-2 text-base font-bold transition ${
                  selected ? "border-violet-500 bg-violet-600 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-300"
                }`}
              >
                <input type="radio" name={question.id} value={option} checked={selected} onChange={() => change(key, option)} className="sr-only" />
                <En42>{option}</En42>
              </label>
            );
          })}
        </div>
      )}
      {!question.options && (
        <div className={`mt-2 grid gap-2 ${question.fields.length > 1 ? "md:grid-cols-2" : ""}`}>
          {question.fields.map((f) => (
            <label key={f.key} className="block text-sm font-bold text-slate-600">
              <Text42 text={f.label} />
              <textarea
                dir="auto"
                rows={question.rows ?? 2}
                value={answers[answerKey42(question.id, f.key)] ?? ""}
                onChange={(event) => change(answerKey42(question.id, f.key), event.target.value)}
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

export function TestArea42({
  answers,
  change,
  submitted,
  level,
  itemRange,
  onSubmit,
}: {
  answers: TestAnswers42;
  change: (key: string, value: string) => void;
  submitted: boolean;
  level: number;
  itemRange?: [number, number];
  onSubmit: (result: TestResult42) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const complete = testComplete42(answers);
  const answered = answeredCount42(answers);
  const current = TEST_LEVELS_42.find((item) => item.level === level)!;
  const levelLastNumber = Math.max(...current.questions.map((question) => question.number));
  const last = level === TEST_LEVELS_42.length && (!itemRange || itemRange[1] === levelLastNumber);
  const questions = current.questions.filter((q) => !itemRange || (q.number >= itemRange[0] && q.number <= itemRange[1]));
  const [levelTitleArabic, levelTitleEnglish = ""] = current.title.split(/[:：]\s*/);
  const partLabel = itemRange ? ` · QUESTIONS ${itemRange[0]}–${itemRange[1]}` : "";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!complete || submitted) return;
    setBusy(true);
    setError("");
    try {
      // ملف المصحّح ومفاتيحه لا يُحمَّل إلا في هذه اللحظة.
      const { grade42 } = await import("./key42");
      onSubmit(grade42(answers));
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
              <Text42 text={levelTitleArabic} />
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
          {/* عدّاد التقدّم صندوق مستقل: يأخذ سطره كاملًا على الشاشات الصغيرة. */}
          <p className="basis-full text-sm font-bold text-slate-500 sm:basis-auto">
            <Text42 text="أجبت عن" /> <bdi dir="ltr">{answered}</bdi> <Text42 text="من" /> <bdi dir="ltr">{TEST_QUESTIONS_42.length}</bdi>
          </p>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-orange-400 to-emerald-500 transition-all" style={{ width: `${(answered / TEST_QUESTIONS_42.length) * 100}%` }} />
        </div>
        {current.context && current.context.length > 0 && (
          <div className="mt-3 space-y-1 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            {current.context.map((line, i) => (
              <p key={i} dir={/[A-Za-z]/.test(line) && !/[\u0600-\u06FF]/.test(line) ? "ltr" : undefined} className="font-en text-base font-semibold leading-7 text-slate-700">
                <Text42 text={line} />
              </p>
            ))}
          </div>
        )}
      </section>

      <div className="space-y-3">
        {questions.map((question) => (
          <Question42 key={question.id} question={question} answers={answers} change={change} disabled={submitted} />
        ))}
      </div>

      {last && (
        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
          <button
            type="submit"
            disabled={!complete || submitted || busy}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-base font-bold text-white shadow transition enabled:hover:bg-slate-700 disabled:opacity-40"
          >
            <Text42 text={busy ? "جارٍ التصحيح…" : "تسليم الاختبار النهائي"} />
          </button>
          {!complete && (
            <p className="text-sm font-semibold text-slate-500">
              <Text42 text="أكمل كل الأسئلة — بما فيها فراغا السؤال 7 — لتفعيل التسليم." />
            </p>
          )}
          {error && (
            <p role="alert" className="text-sm font-bold text-rose-700">
              <Text42 text={error} />
            </p>
          )}
          <Note42 emoji="🔐">
            <Text42 text="لا تُحمَّل الحلول ولا شروحها مع أسئلة الاختبار. يفتح ملف التصحيح عند التسليم فقط، ثم تُعرض النتيجة والحلول التفصيلية." />
          </Note42>
        </div>
      )}
      {!last && (
        <p className="rounded-2xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-500">
          <Text42 text="أكمل بقية الأسئلة في الشريحة التالية. التسليم متاح في نهاية المستوى الخامس." />
        </p>
      )}
    </form>
  );
}
