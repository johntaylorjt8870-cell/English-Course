import { useMemo, useRef, useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { ActionButton37, FOCUS_37, Feedback37, SourceLine37 } from "./kit37";
import { TEST_COUNT_37, TEST_37, TEST_INTRO_37, TEST_LEVELS_37, type TestQuestion37 } from "./testData37";
import { formatScore37, type AnswerSpec37, type QuestionGrade37, type TestGradeSummary37 } from "./grading37";

/* ============================================================
   منطقة الاختبار الرسمي — 25 سؤالًا / 5 مستويات / الدرس 37
   محايدة تمامًا قبل الإرسال: لا ✓ ولا ✕ ولا درجة ولا شرح.
   بعد الإرسال: نتيجة + تصحيح لكل سؤال + سبب الإجابة.
   المفتاح الكامل متاح في منطقة الحلول ومنطقة المعلم.
   ============================================================ */

export default function TestArea37({
  onSubmitted,
  onGoSolutions,
}: {
  onSubmitted: () => void;
  onGoSolutions: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState<TestGradeSummary37 | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const topRef = useRef<HTMLDivElement | null>(null);

  const answered = useMemo(
    () => TEST_LEVELS_37.flatMap((level) => level.questions).filter((question) => (answers[question.n] ?? "").trim().length > 0).length,
    [answers],
  );
  const ready = answered === TEST_COUNT_37;
  const remaining = TEST_COUNT_37 - answered;

  const update = (n: number, value: string) => {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [n]: value }));
  };

  /**
   * الإرسال: المفتاح والتصحيح يُطلبان هنا فقط (dynamic import).
   * قبل هذه اللحظة لا توجد إجابة أو تفسير في أي حزمة محمّلة.
   */
  const submit = async () => {
    if (!ready || submitted || busy) return;
    setBusy(true);
    setError("");
    try {
      const [{ ANSWER_SPECS_37 }, { gradeTest37 }] = await Promise.all([import("./solutionsData37"), import("./grading37")]);
      const result = gradeTest37(TEST_37, answers, ANSWER_SPECS_37 as Record<number, AnswerSpec37>);
      setSummary(result);
      setSubmitted(true);
      onSubmitted();
      topRef.current?.scrollIntoView?.({ block: "start" });
    } catch {
      setError("تعذّر فتح التصحيح الآن. تحقّق من الاتصال ثم أعد المحاولة.");
    } finally {
      setBusy(false);
    }
  };

  /** إعادة الاختبار: تمسح الإجابات والتصحيح معًا وتعيد الحالة المحايدة. */
  const restart = () => {
    setAnswers({});
    setSubmitted(false);
    setSummary(null);
    setError("");
    topRef.current?.scrollIntoView?.({ block: "start" });
  };

  return (
    <div ref={topRef} data-area="lesson37-test" data-source-section="s34" className="space-y-3">
      <section className="overflow-hidden rounded-3xl border border-[#bae6fd] bg-white shadow-sm">
        <div className="fh37-header__beam" />
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#fcd34d] bg-[#fef3c7] px-2.5 py-1 text-[11px] font-black text-[#92400e]">
              🏆 MASTER TEST
            </span>
            <span className="rounded-full border border-[#7dd3fc] bg-[#e0f2fe] px-2.5 py-1 text-[11px] font-black text-[#0c4a6e]">
              <Rich text="5 مستويات" />
            </span>
            <span className="rounded-full border border-[#5eead4] bg-[#ccfbf1] px-2.5 py-1 text-[11px] font-black text-[#115e59]">
              <Rich text="25 سؤالًا" />
            </span>
          </div>
          <h2 className="mt-2 text-lg font-black leading-8 text-[#0f172a] sm:text-xl">
            <Rich text="Future Continuous Master Test — المستقبل المستمر" />
          </h2>
          <div className="mt-2 space-y-1">
            {TEST_INTRO_37.map((unit) => (
              <SourceLine37 key={unit.sourceUnitIndex} sectionId="s34" index={unit.sourceUnitIndex} text={unit.text} />
            ))}
          </div>

          <div className="mt-3 flex items-center gap-3" aria-label="عدد الأسئلة المجابة">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={TEST_COUNT_37}
              aria-valuenow={answered}
              className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#e2e8f0]"
            >
              <div
                className="h-full bg-[#0f766e] transition-[width] motion-reduce:transition-none"
                style={{ width: `${Math.round((answered / TEST_COUNT_37) * 100)}%` }}
              />
            </div>
            <span dir="ltr" className="font-en text-sm font-black tabular-nums text-[#0f172a]" aria-live="polite">
              {answered}/{TEST_COUNT_37}
            </span>
          </div>
          <p className="mt-2 text-sm font-bold leading-6 text-[#334155]">
            خمسة مستويات × خمسة أسئلة. لا تظهر علامة صحة/خطأ ولا درجة ولا تفسير قبل الإرسال. إجاباتك محفوظة أثناء تنقلك بين المناطق.
          </p>
        </div>
      </section>

      {summary ? (
        <section role="status" aria-live="polite" data-test-score className="rounded-3xl border border-[#5eead4] bg-[#f0fdfa] p-4 sm:p-5">
          <p className="text-xs font-black uppercase tracking-[.14em] text-[#115e59]">النتيجة</p>
          <div className="mt-1 flex flex-wrap items-end gap-3">
            <span dir="ltr" className="font-en text-4xl font-black tabular-nums text-[#115e59]">
              {formatScore37(summary)}
            </span>
            <span className="rounded-full border border-[#0f766e] bg-white px-3 py-1 text-sm font-black text-[#115e59]">
              <span dir="ltr" className="font-en tabular-nums">{summary.percentage}%</span>
            </span>
          </div>
          <p className="mt-2 text-sm font-bold leading-6 text-[#115e59]">
            المستويات 1 و2 و3 و5 تُقارَن بالاختيار أو بالصيغة الصحيحة، وتقبل كل الصيغ المكافئة المسجلة في مفتاح التصحيح.
            أما أسئلة فهم المعنى (16–20) فتُقيَّم بمعايير المعنى لا بمطابقة حرفية — راجع النموذج والسبب لكل سؤال.
          </p>
          <p className="mt-1 text-xs font-bold leading-5 text-[#115e59]">
            التقييم على 25 سؤالًا: سؤال واحد = علامة واحدة. الأسئلة المفتوحة تحتاج مراجعة المعلم/الطالب للنموذج، والدرجة الظاهرة هي مؤشر لا حكم نهائي على جودة التعبير.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <ActionButton37 onClick={onGoSolutions}>الحلول التفصيلية</ActionButton37>
            <ActionButton37 variant="secondary" onClick={restart}>
              إعادة الاختبار
            </ActionButton37>
          </div>
        </section>
      ) : null}

      {TEST_LEVELS_37.map((level, levelIndex) => (
        <section key={level.id} aria-labelledby={`l37-${level.id}`} className="space-y-2">
          <header className="flex flex-wrap items-center gap-2 border-b border-[#bae6fd] pb-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#0c4a6e] text-sm font-black text-white">
              {levelIndex + 1}
            </span>
            <h2 id={`l37-${level.id}`} className="text-base font-black text-[#0f172a] sm:text-lg">
              <Rich text={level.title} />
            </h2>
            <span className="font-en rounded-full bg-[#e0f2fe] px-2.5 py-1 text-[11px] font-black text-[#0c4a6e]" dir="ltr">
              Q{level.questions[0].n}–Q{level.questions[level.questions.length - 1].n}
            </span>
          </header>
          {level.instruction ? (
            <SourceLine37 sectionId="s34" index={level.instructionUnitIndex ?? 0} text={level.instruction} />
          ) : null}
          {level.questions.map((question) => (
            <Question37
              key={question.n}
              question={question}
              value={answers[question.n] ?? ""}
              submitted={submitted}
              grade={summary?.results[question.n]}
              onChange={(value) => update(question.n, value)}
            />
          ))}
          {level.trailing?.length ? (
            <div className="rounded-2xl border border-dashed border-[#7dd3fc] bg-[#f8fbff] p-3">
              <p className="mb-1 text-sm font-black text-[#0c4a6e]">تكملة الفقرة الأصلية:</p>
              <div className="space-y-1">
                {level.trailing.map((line) => (
                  <SourceLine37 key={line.sourceUnitIndex} sectionId="s34" index={line.sourceUnitIndex} text={line.text} />
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ))}

      <div className="rounded-2xl border border-[#bae6fd] bg-white p-3 shadow-sm">
        {!submitted ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ActionButton37 disabled={!ready || busy} onClick={submit} testId="true">
              {busy ? "جارٍ التصحيح…" : "إرسال الاختبار"}
            </ActionButton37>
            <p className="text-sm font-bold text-[#334155]" aria-live="polite">
              {ready
                ? "أصبحت إجاباتك جاهزة للإرسال."
                : `لا يمكن الإرسال الآن: أكمل ${remaining} ${remaining === 1 ? "سؤالًا متبقيًا" : "أسئلة متبقية"} من 25.`}
            </p>
            {remaining > 0 ? (
              <p className="text-xs font-bold text-[#9a3412]">
                الأسئلة غير المجابة:{" "}
                <span dir="ltr" className="font-en tabular-nums">
                  {TEST_37.filter((question) => (answers[question.n] ?? "").trim().length === 0)
                    .map((question) => question.n)
                    .join(", ")}
                </span>
              </p>
            ) : null}
            {error ? (
              <p role="alert" className="text-sm font-black text-[#9f1239]">
                {error}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-black text-[#115e59]">
            <span>تم الإرسال · التصحيح ظاهر أعلاه وأسفل كل سؤال</span>
            <ActionButton37 variant="secondary" onClick={onGoSolutions}>
              المفتاح التفصيلي
            </ActionButton37>
          </div>
        )}
      </div>
    </div>
  );
}

function Question37({
  question,
  value,
  submitted,
  grade,
  onChange,
}: {
  question: TestQuestion37;
  value: string;
  submitted: boolean;
  grade?: { isCorrect: boolean; statusLabel: string; modelAnswer: string; acceptedSummary: string; explanation: string; example?: string };
  onChange: (value: string) => void;
}) {
  const promptLabel = `السؤال ${question.n}`;
  return (
    <fieldset
      className={`rounded-2xl border bg-white p-3 shadow-sm sm:p-4 ${
        submitted && grade ? (grade.isCorrect ? "border-[#5eead4]" : "border-[#fda4af]") : "border-[#bae6fd]"
      }`}
      data-test-question={question.n}
    >
      <legend className="sr-only">{promptLabel}</legend>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 space-y-1">
          {question.promptLines.map((line, index) => (
            <SourceLine37 key={question.promptUnitIndexes[index]} sectionId="s34" index={question.promptUnitIndexes[index]} text={line} />
          ))}
        </div>
        {submitted && grade ? (
          <span
            aria-hidden
            className={`shrink-0 rounded-full px-2 py-1 text-sm font-black ${
              grade.isCorrect ? "bg-[#ccfbf1] text-[#115e59]" : "bg-[#ffe4e6] text-[#9f1239]"
            }`}
          >
            {grade.isCorrect ? "✓" : "✕"}
          </span>
        ) : null}
      </div>

      {question.marker ? (
        <div className="mt-2">
          <SourceLine37 sectionId="s34" index={question.marker.sourceUnitIndex} text={question.marker.text} />
        </div>
      ) : null}

      {question.options ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {question.options.map((option) => {
            const active = value === option.label;
            return (
              <label
                key={option.sourceUnitIndex}
                data-source-unit={`s34-unit-${option.sourceUnitIndex}`}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-bold text-[#0f172a] ${
                  active ? "border-[#0f766e] bg-[#ccfbf1]" : "border-[#bae6fd] bg-white hover:bg-[#f0f9ff]"
                } ${submitted ? "cursor-default" : ""}`}
              >
                <input
                  type="radio"
                  name={`l37-q-${question.n}`}
                  value={option.label}
                  checked={active}
                  disabled={submitted}
                  onChange={(event) => onChange(event.currentTarget.value)}
                  className={`${FOCUS_37} h-4 w-4 shrink-0 accent-[#0f766e]`}
                />
                <span dir="ltr" className="font-en text-left">{option.text}</span>
              </label>
            );
          })}
        </div>
      ) : (
        <label className="mt-3 block">
          <span className="mb-1 block text-sm font-bold text-[#334155]">
            {question.fieldLabel ??
              (question.type === "fill"
                ? "أكمل الفراغ"
                : question.type === "repair"
                  ? "اكتب التصحيح"
                  : question.type === "explain"
                    ? "اكتب تفسيرك"
                    : "اكتب جملة مناسبة")}
          </span>
          {question.type === "fill" || question.type === "repair" ? (
            <input
              type="text"
              dir="auto"
              value={value}
              disabled={submitted}
              onChange={(event) => onChange(event.currentTarget.value)}
              className={`${FOCUS_37} w-full rounded-xl border border-[#7dd3fc] bg-white px-3 py-2.5 text-base text-[#0f172a]`}
              aria-label={`${promptLabel} — الإجابة`}
            />
          ) : (
            <textarea
              rows={question.type === "open" ? 3 : 4}
              dir="auto"
              value={value}
              disabled={submitted}
              onChange={(event) => onChange(event.currentTarget.value)}
              className={`${FOCUS_37} w-full resize-y rounded-xl border border-[#7dd3fc] bg-white px-3 py-2.5 text-base leading-7 text-[#0f172a]`}
              aria-label={`${promptLabel} — الإجابة`}
            />
          )}
        </label>
      )}

      {submitted && grade ? (
        <div className="mt-3" data-test-feedback={question.n}>
          <Feedback37 state={grade.isCorrect ? "ok" : "review"} title={grade.statusLabel}>
            <p className="font-black text-[#0f172a]">الإجابة النموذجية:</p>
            <p dir="ltr" className="font-en mt-1 rounded-lg border border-[#bae6fd] bg-white px-3 py-1.5 text-left font-black text-[#0c4a6e]">
              {grade.modelAnswer}
            </p>
            <p className="mt-2 text-[#1e293b]">
              <span className="font-black">السبب: </span>
              <Rich text={grade.explanation} />
            </p>
            {grade.example ? (
              <p dir="ltr" className="font-en mt-1.5 rounded-lg bg-white px-3 py-1.5 text-left font-semibold text-[#0f172a]">
                {grade.example}
              </p>
            ) : null}
            <p className="mt-1.5 text-xs leading-5">
              <span className="font-black">صيغ مقبولة: </span>
              <span dir="auto"><Rich text={grade.acceptedSummary} /></span>
            </p>
          </Feedback37>
          <p className="mt-1 text-xs font-bold text-[#334155]">
            هذا التصحيح من إعداد المنصة/المعلم اعتمادًا على قواعد الدرس وسياق السؤال؛ الأسئلة المفتوحة تُقيَّم بالمعنى لا بمطابقة حرفية.
          </p>
        </div>
      ) : null}
    </fieldset>
  );
}
