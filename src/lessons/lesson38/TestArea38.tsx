import { useMemo, useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { TEST_COUNT_38, TEST_INTRO_38, TEST_LEVELS_38, type TestQuestion38 } from "./testData38";
import { ActionButton38, FOCUS_38, FinishLine38, SourceLine38, TenseChip38 } from "./kit38";
import type { GradeResult38, TestGrade38 } from "./testKey38";

/* ============================================================
   منطقة الاختبار الرسمي — 25 سؤالًا / 5 مستويات.
   قبل الإرسال: لا درجة، لا ✓/✕، لا تفسير، لا مفتاح في DOM.
   بعد الإرسال: يُحمَّل مفتاح التصحيح ديناميكيًا وتظهر النتيجة.
   ============================================================ */

export default function TestArea38({
  onSubmitted,
  onGoSolutions,
}: {
  onSubmitted: () => void;
  onGoSolutions: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [grade, setGrade] = useState<TestGrade38 | null>(null);
  const [grading, setGrading] = useState(false);
  const [error, setError] = useState("");

  const answered = useMemo(
    () => TEST_LEVELS_38.flatMap((level) => level.questions).filter((question) => (answers[question.n] ?? "").trim().length > 0).length,
    [answers],
  );
  const ready = answered === TEST_COUNT_38;

  const update = (n: number, value: string) => {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [n]: value }));
  };

  const submit = async () => {
    if (!ready || submitted || grading) return;
    setGrading(true);
    setError("");
    try {
      const { gradeTest38 } = await import("./testKey38");
      const result = gradeTest38(answers);
      setGrade(result);
      setSubmitted(true);
      onSubmitted();
    } catch {
      setError("تعذّر تحميل مفتاح التصحيح. أعد المحاولة بعد لحظات.");
    } finally {
      setGrading(false);
    }
  };

  return (
    <div data-area="lesson38-test" data-source-section="s33" className="space-y-3">
      <section className="fp38-card">
        <FinishLine38 label="MASTER TEST" />
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="fp38-kicker">🏆 25 QUESTIONS</span>
          <span className="fp38-badge">5 مستويات × 5</span>
          <span dir="ltr" className="font-en fp38-badge">
            §33
          </span>
        </div>
        <h2 className="mt-2 text-xl font-black leading-8 text-[#3f1233]">
          <Rich text="Future Perfect Master Test — المستقبل التام" />
        </h2>
        <div className="mt-2 space-y-1 text-sm leading-7 text-[#2b1633]">
          {TEST_INTRO_38.map((unit) => (
            <SourceLine38 key={unit.sourceUnitIndex} sectionId="s33" index={unit.sourceUnitIndex} text={unit.text} />
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3" aria-label="عدد الأسئلة المجابة">
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={TEST_COUNT_38}
            aria-valuenow={answered}
            className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#f6e3de]"
          >
            <div className="h-full bg-[#9f1239] transition-[width] motion-reduce:transition-none" style={{ width: `${Math.round((answered / TEST_COUNT_38) * 100)}%` }} />
          </div>
          <span dir="ltr" className="font-en text-sm font-black tabular-nums text-[#3f1233]" aria-live="polite">
            {answered}/{TEST_COUNT_38}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <TenseChip38 tense="simple" />
          <TenseChip38 tense="continuous" />
          <TenseChip38 tense="perfect" />
        </div>
        <p className="mt-3 rounded-xl border border-dashed border-[#e9b9c6] bg-[#fff8f3] px-3 py-2 text-sm font-bold leading-6 text-[#7a5767]" data-test-locked={submitted ? undefined : "true"}>
          <Rich text="الواجهة محايدة قبل الإرسال: لا تظهر درجة، ولا علامة صحة/خطأ، ولا تفسير، ولا مفتاح إجابة. إجاباتك تبقى محفوظة عند الانتقال إلى منطقة أخرى." />
        </p>
      </section>

      {submitted && grade ? (
        <section role="status" aria-live="polite" data-test-score className="rounded-3xl border border-[#b8ddc5] bg-[#f0faf2] p-4 sm:p-5">
          <FinishLine38 label="FINISHED" />
          <p className="mt-2 text-xs font-black uppercase tracking-[.14em] text-[#1c6b3c]">النتيجة</p>
          <div className="mt-1 flex flex-wrap items-end gap-3">
            <span dir="ltr" className="font-en text-4xl font-black tabular-nums text-[#1c6b3c]">
              {grade.correctCount} / {grade.total}
            </span>
            <span className="rounded-full border border-[#1c6b3c] bg-white px-3 py-1 text-sm font-black text-[#1c6b3c]">
              <span dir="ltr" className="font-en tabular-nums">{grade.percentage}%</span>
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#1c6b3c]">درجة واحدة لكل سؤال</span>
          </div>
          <p className="mt-2 text-sm font-bold leading-6 text-[#1c6b3c]">
            المستويات 1–3 و5 تُقارن بالاختيار أو بالصيغة مع قبول الصيغ المكافئة. المستوى الرابع (16–20) يُقيَّم بمعايير المعنى، ويحتاج مراجعة المعلم عند الاختلاف في الصياغة.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <ActionButton38 onClick={onGoSolutions}>الحلول التفصيلية</ActionButton38>
            <span className="rounded-xl border border-[#b8ddc5] bg-white px-3 py-2 text-sm font-bold text-[#1c6b3c]">
              التصحيح ظاهر أسفل كل سؤال
            </span>
          </div>
        </section>
      ) : null}

      {error ? (
        <p role="alert" className="rounded-xl border border-[#f6c2c9] bg-[#fff1f2] p-3 text-sm font-black text-[#a41c36]">
          {error}
        </p>
      ) : null}

      {TEST_LEVELS_38.map((level, levelIndex) => (
        <section key={level.id} aria-labelledby={`l38-${level.id}`} className="space-y-2">
          <header className="flex flex-wrap items-center gap-2 border-b border-[#f0d9d2] pb-2">
            <span className="fp38-stepnum" dir="ltr">
              {levelIndex + 1}
            </span>
            <h2
              id={`l38-${level.id}`}
              data-source-unit={`s33-unit-${level.titleUnitIndex}`}
              className="text-base font-black text-[#3f1233] sm:text-lg"
            >
              <Rich text={level.title} />
            </h2>
            <span dir="ltr" className="font-en rounded-full bg-[#fff1f2] px-2.5 py-1 text-[11px] font-black text-[#9f1239]">
              Q{level.questions[0].n}–Q{level.questions[level.questions.length - 1].n}
            </span>
          </header>
          {level.instruction && level.instructionUnitIndex != null ? (
            <SourceLine38 sectionId="s33" index={level.instructionUnitIndex} text={level.instruction} />
          ) : null}
          {level.questions.map((question) => (
            <Question38
              key={question.n}
              question={question}
              value={answers[question.n] ?? ""}
              submitted={submitted}
              grade={grade?.results[question.n]}
              onChange={(value) => update(question.n, value)}
            />
          ))}
          {level.trailing?.length ? (
            <div className="rounded-2xl border border-dashed border-[#e9b9c6] bg-[#fff8f3] p-3">
              <p className="mb-1 text-sm font-black text-[#7a5767]">تكملة الفقرة الأصلية:</p>
              <div className="space-y-1">
                {level.trailing.map((line) => (
                  <SourceLine38 key={line.sourceUnitIndex} sectionId="s33" index={line.sourceUnitIndex} text={line.text} />
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ))}

      <div className="sticky bottom-3 z-10 rounded-2xl border border-[#f0d9d2] bg-white/95 p-3 shadow-lg backdrop-blur">
        {!submitted ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ActionButton38 disabled={!ready || grading} onClick={submit}>
              {grading ? "جارٍ التصحيح…" : "إرسال الاختبار"}
            </ActionButton38>
            <p className="text-sm font-bold text-[#6b4a5e]" aria-live="polite">
              {ready ? "أصبحت إجاباتك جاهزة للإرسال." : `أكمل ${TEST_COUNT_38 - answered} سؤالًا متبقيًا.`}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-black text-[#1c6b3c]">
            <span>تم الإرسال · النتيجة ظاهرة أعلاه · التصحيح أسفل كل سؤال</span>
            <ActionButton38 variant="secondary" onClick={onGoSolutions}>
              المفتاح التفصيلي
            </ActionButton38>
          </div>
        )}
      </div>
    </div>
  );
}

function Question38({
  question,
  value,
  submitted,
  grade,
  onChange,
}: {
  question: TestQuestion38;
  value: string;
  submitted: boolean;
  grade?: GradeResult38;
  onChange: (value: string) => void;
}) {
  const promptLabel = `السؤال ${question.n}`;
  return (
    <fieldset
      className={`rounded-2xl border bg-white p-3 shadow-sm sm:p-4 ${
        submitted && grade ? (grade.isCorrect ? "border-[#b8ddc5]" : "border-[#fda4af]") : "border-[#f0d9d2]"
      }`}
      data-test-question={question.n}
      data-graded={submitted ? "true" : undefined}
    >
      <legend className="sr-only">{promptLabel}</legend>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 space-y-1">
          {question.promptLines.map((line, index) => (
            <SourceLine38 key={question.promptUnitIndexes[index]} sectionId="s33" index={question.promptUnitIndexes[index]} text={line} />
          ))}
        </div>
        {submitted && grade ? (
          <span
            aria-hidden
            className={`shrink-0 rounded-full px-2 py-1 text-sm font-black ${grade.isCorrect ? "bg-[#d7f0dc] text-[#1c6b3c]" : "bg-[#ffe4e6] text-[#9f1239]"}`}
          >
            {grade.isCorrect ? "✓" : "✕"}
          </span>
        ) : null}
      </div>

      {question.marker ? (
        <div className="mt-2">
          <SourceLine38 sectionId="s33" index={question.marker.sourceUnitIndex} text={question.marker.text} />
        </div>
      ) : null}

      {question.options ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {question.options.map((option) => {
            const selected = value === option.label;
            const showCorrect = submitted && grade && grade.modelAnswer.startsWith(`${option.label}.`);
            return (
              <label
                key={option.sourceUnitIndex}
                data-source-unit={`s33-unit-${option.sourceUnitIndex}`}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-bold text-[#2b1633] ${
                  showCorrect
                    ? "border-[#1c6b3c] bg-[#f0faf2]"
                    : selected
                      ? "border-[#9f1239] bg-[#fff1f2]"
                      : "border-[#f0d9d2] bg-white hover:bg-[#fff8f3]"
                }`}
              >
                <input
                  type="radio"
                  name={`l38-q-${question.n}`}
                  value={option.label}
                  checked={selected}
                  disabled={submitted}
                  onChange={(event) => onChange(event.currentTarget.value)}
                  className={`${FOCUS_38} h-4 w-4 accent-[#9f1239]`}
                />
                <span dir="ltr" className="font-en text-left">
                  {option.text}
                </span>
              </label>
            );
          })}
        </div>
      ) : (
        <label className="mt-3 block">
          <span className="mb-1 block text-sm font-bold text-[#7a5767]">
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
              className={`${FOCUS_38} w-full rounded-xl border border-[#dfc2c8] bg-white px-3 py-2.5 text-base text-[#2b1633] disabled:bg-[#fff8f3]`}
              aria-label={`${promptLabel} — الإجابة`}
            />
          ) : (
            <textarea
              rows={question.type === "open" ? 3 : 4}
              dir="auto"
              value={value}
              disabled={submitted}
              onChange={(event) => onChange(event.currentTarget.value)}
              className={`${FOCUS_38} w-full resize-y rounded-xl border border-[#dfc2c8] bg-white px-3 py-2.5 text-base leading-7 text-[#2b1633] disabled:bg-[#fff8f3]`}
              aria-label={`${promptLabel} — الإجابة`}
            />
          )}
        </label>
      )}

      {submitted && grade ? (
        <div
          role="status"
          data-test-feedback={question.n}
          className={`mt-3 rounded-xl border p-3 text-sm leading-6 ${
            grade.isCorrect ? "border-[#b8ddc5] bg-[#f0faf2] text-[#1c6b3c]" : "border-[#f2d49a] bg-[#fff8e8] text-[#7c4a03]"
          }`}
        >
          <p className="font-black">{grade.statusLabel}</p>
          <p className="mt-1">
            <strong>الإجابة النموذجية: </strong>
            <span dir="auto" className="font-en font-black">
              {grade.modelAnswer}
            </span>
          </p>
          <p className="mt-1">
            <strong>القاعدة: </strong>
            <Rich text={grade.explanation} />
          </p>
          <p className="mt-1">
            <strong>ملاحظة: </strong>
            <Rich text={grade.acceptedSummary} />
          </p>
          {!grade.isCorrect && grade.userAnswer.trim() ? (
            <p className="mt-1">
              <strong>إجابتك: </strong>
              <span dir="auto">{grade.userAnswer}</span>
            </p>
          ) : null}
        </div>
      ) : null}
    </fieldset>
  );
}
