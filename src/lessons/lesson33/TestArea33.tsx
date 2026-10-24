import { useState } from "react";
import { En33, Text33, Note33, Lens33, FOCUS33 } from "./design33";
import { TEST_LEVELS_33, TEST_QUESTIONS_33, TEST_INTRO_33, testComplete33, answeredCount33, answerKey33, type TestAnswers33, type TestQuestion33 } from "./testData33";
import type { Graded33 } from "./key33";

// ============================================================
// منطقة اختبار الدرس 33 — Present Tenses Master Test
// 25 سؤالًا في خمسة مستويات. محايدة تمامًا قبل التسليم:
// لا حكم، ولا درجة، ولا حل، ولا نص مفتاح في DOM.
// المصحّح (key33) يُحمَّل ديناميكيًا عند التسليم فقط.
// ============================================================

export type TestResult33 = { results: Graded33[]; score: number; total: number };

function Question33({
  question,
  answers,
  change,
  disabled,
}: {
  question: TestQuestion33;
  answers: TestAnswers33;
  change: (key: string, value: string) => void;
  disabled: boolean;
}) {
  const optionField = question.options ? question.fields[0].key : null;
  const textFields = question.options ? question.fields.slice(1) : question.fields;
  return (
    <fieldset data-question-id={question.id} disabled={disabled} className="rounded-2xl border border-slate-200 bg-white p-3 md:p-4">
      <legend className="px-1 text-sm font-bold text-slate-500">
        <Text33 text={`السؤال ${question.number}`} />
      </legend>
      <div className="space-y-1">
        {question.lines.map((line, i) => (
          <p
            key={i}
            dir={/[A-Za-z]/.test(line) && !/[\u0600-\u06FF]/.test(line) ? "ltr" : undefined}
            className={`font-en text-lg font-bold leading-8 text-slate-900 ${question.type === "correct" && i === 0 ? "text-rose-900" : ""}`}
          >
            <Text33 text={line} />
          </p>
        ))}
      </div>

      {question.options && optionField && (
        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={`السؤال ${question.number}`}>
          {question.options.map((option) => {
            const key = answerKey33(question.id, optionField);
            const selected = answers[key] === option.id;
            return (
              <label
                key={option.id}
                data-option={`${question.id}-${option.id}`}
                className={`cursor-pointer rounded-xl border-2 px-3.5 py-2 text-sm font-bold transition ${
                  selected ? "border-transparent bg-violet-700 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-300"
                }`}
              >
                <input type="radio" name={`${question.id}-${optionField}`} value={option.id} checked={selected} onChange={() => change(key, option.id)} className="sr-only" />
                {question.type === "meaning" ? <En33>{option.text}</En33> : <Text33 text={option.text} />}
              </label>
            );
          })}
        </div>
      )}

      {textFields.length > 0 && (
        <div className={`mt-2 grid gap-2 ${textFields.length > 1 ? "md:grid-cols-2" : ""}`.trim()}>
          {textFields.map((f) => (
            <label key={f.key} className="block text-sm font-bold text-slate-600">
              <Text33 text={f.label} />
              <textarea
                dir="auto"
                rows={f.rows ?? 2}
                value={answers[answerKey33(question.id, f.key)] ?? ""}
                onChange={(event) => change(answerKey33(question.id, f.key), event.target.value)}
                data-answer={`${question.id}-${f.key}`}
                className="font-en mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-base font-medium text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white"
              />
            </label>
          ))}
        </div>
      )}
    </fieldset>
  );
}

export function TestArea33({
  answers,
  change,
  submitted,
  level,
  itemRange,
  onSubmit,
  onReset,
  showIntro = false,
}: {
  answers: TestAnswers33;
  change: (key: string, value: string) => void;
  submitted: boolean;
  /** مستوى واحد داخل مسار الشرائح، أو undefined لعرض المستويات الخمسة في منطقة الاختبار. */
  level?: number;
  itemRange?: [number, number];
  onSubmit: (result: TestResult33) => void;
  onReset: () => void;
  showIntro?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const complete = testComplete33(answers);
  const answered = answeredCount33(answers);
  const levels = level === undefined ? TEST_LEVELS_33 : TEST_LEVELS_33.filter((item) => item.level === level);
  const lastLevelNumber = TEST_LEVELS_33.length;
  const shownLevels = levels.map((item) => item.level);
  const isLast = shownLevels.includes(lastLevelNumber) && (!itemRange || itemRange[1] === Math.max(...TEST_LEVELS_33.at(-1)!.questions.map((q) => q.number)));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!complete || submitted) return;
    setBusy(true);
    setError("");
    try {
      const { grade33 } = await import("./key33");
      onSubmit(grade33(answers));
    } catch {
      setError("تعذّر تحميل المصحّح. حاول مرة أخرى.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" data-area-test="33">
      {showIntro && (
        <section className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-extrabold tracking-wide text-violet-700">
            <En33>PRESENT TENSES MASTER TEST</En33>
          </p>
          {TEST_INTRO_33.map((line) => (
            <p key={line} className="mt-1 text-base font-semibold leading-8 text-slate-700">
              <Text33 text={line} />
            </p>
          ))}
        </section>
      )}

      {levels.map((current) => {
        const questions = current.questions.filter((q) => !itemRange || (q.number >= itemRange[0] && q.number <= itemRange[1]));
        const [titleArabic, titleEnglish] = current.title.split(/[:：]\s*/);
        return (
          <section key={current.level} className="space-y-3" data-test-level={current.level}>
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p dir="ltr" className="font-en text-xs font-extrabold tracking-wide text-violet-700">
                LEVEL {current.level} / 5{itemRange ? ` · QUESTIONS ${itemRange[0]}-${itemRange[1]}` : ""}
              </p>
              <p className="font-head mt-1 flex flex-wrap items-center gap-2 text-base font-bold text-slate-700">
                <Text33 text={titleArabic} />
                {titleEnglish && (
                  <>
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <En33 className="text-violet-700">{titleEnglish}</En33>
                  </>
                )}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-500">
                <Text33 text="أجبت عن" /> <bdi dir="ltr">{answered} / {TEST_QUESTIONS_33.length}</bdi>
              </p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label="تقدّم الاختبار" aria-valuemin={0} aria-valuemax={TEST_QUESTIONS_33.length} aria-valuenow={answered}>
                <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-amber-400 to-emerald-500 transition-all" style={{ width: `${(answered / TEST_QUESTIONS_33.length) * 100}%` }} />
              </div>
              {current.context && current.context.length > 0 && (
                <div className="mt-3 space-y-1 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  {current.context.map((line, i) => (
                    <p
                      key={i}
                      dir={/[A-Za-z]/.test(line) && !/[\u0600-\u06FF]/.test(line) ? "ltr" : undefined}
                      className={`text-base font-semibold leading-7 text-slate-700 ${/[A-Za-z]/.test(line) && !/[\u0600-\u06FF]/.test(line) ? "font-en" : ""}`}
                    >
                      <Text33 text={line} />
                    </p>
                  ))}
                </div>
              )}
            </div>
            {questions.map((question) => (
              <Question33 key={question.id} question={question} answers={answers} change={change} disabled={submitted} />
            ))}
          </section>
        );
      })}

      {isLast && (
        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
          <button
            type="submit"
            disabled={!complete || submitted || busy}
            data-test-submit="33"
            className={`rounded-xl bg-slate-900 px-5 py-2.5 text-base font-bold text-white shadow transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
          >
            <Text33 text={busy ? "جارٍ التصحيح…" : submitted ? "تم التسليم" : "تسليم الاختبار"} />
          </button>
          {!complete && !submitted && (
            <p className="text-sm font-semibold text-slate-500">
              <Text33 text="أكمل الأسئلة الخمسة والعشرين كلها — بما فيها فراغا السؤال 7 وحقول السؤالين 20 و25 — لتفعيل التسليم." />
            </p>
          )}
          {submitted && (
            <button
              type="button"
              data-test-reset="33"
              onClick={onReset}
              className={`mr-2 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-900 ${FOCUS33}`}
            >
              <Text33 text="إعادة الاختبار ومسح الإجابات" />
            </button>
          )}
          {error && (
            <p role="alert" className="text-sm font-bold text-rose-700">
              <Text33 text={error} />
            </p>
          )}
          <Note33 emoji="🔐">
            <Text33 text="لا تُحمَّل الحلول ولا شروحها مع أسئلة الاختبار. يفتح المصحّح عند التسليم فقط، ثم تُعرض النتيجة والحلول التفصيلية." />
          </Note33>
        </div>
      )}
      {!isLast && (
        <p className="rounded-2xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-500">
          <Text33 text="أكمل بقية الأسئلة في الشريحة التالية. التسليم متاح في نهاية المستوى الخامس." />
        </p>
      )}
    </form>
  );
}

/** شارة زمن تُستعمل في الحلول لعرض الزمن المستخدم لكل سؤال. */
export function TenseBadge33({ tenseId }: { tenseId: "PS" | "PC" | "PP" | "PPC" | "—" }) {
  if (tenseId === "—") return null;
  return <Lens33 tense={tenseId} />;
}

export default TestArea33;
