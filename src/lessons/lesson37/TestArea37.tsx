import { useMemo, useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { TEST_COUNT_37, TEST_INTRO_37, TEST_LEVELS_37, type TestQuestion37 } from "./testData37";
import type { TestGrade37 } from "./grading37";
import { ActionButton37, Card37, FOCUS_37, SourceLine37 } from "./kit37";

export default function TestArea37({ onSubmitted, onGoSolutions }: { onSubmitted: () => void; onGoSolutions: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [grade, setGrade] = useState<TestGrade37 | null>(null);
  const [grading, setGrading] = useState(false);
  const answered = useMemo(() => Object.values(answers).filter((value) => value.trim().length > 0).length, [answers]);
  const ready = answered === TEST_COUNT_37;
  const update = (number: number, value: string) => setAnswers((current) => ({ ...current, [number]: value }));
  const submit = async () => {
    if (!ready || submitted || grading) return;
    setGrading(true);
    try {
      const { gradeLesson37 } = await import("./grading37");
      setGrade(gradeLesson37(TEST_LEVELS_37.flatMap((level) => level.questions), answers));
      setSubmitted(true);
      onSubmitted();
    } finally {
      setGrading(false);
    }
  };

  return (
    <div data-area="lesson37-test" data-source-section="s34" className="space-y-4">
      <Card37 eyebrow="Formal assessment · source §34" title={<Rich text="Future Continuous Master Test — المستقبل المستمر" />}>
        <div className="space-y-1">
          {TEST_INTRO_37.map((unit) => (
            <SourceLine37 key={unit.sourceUnitIndex} sectionId="s34" index={unit.sourceUnitIndex} text={unit.text} />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3" aria-label="عدد الأسئلة المجابة">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#e1f0f6]">
            <div
              className="h-full bg-[#007b83] transition-[width] motion-reduce:transition-none"
              style={{ width: `${Math.round((answered / TEST_COUNT_37) * 100)}%` }}
            />
          </div>
          <span dir="ltr" className="font-en text-sm font-black tabular-nums text-[#3e5d70]" aria-live="polite">
            {answered}/{TEST_COUNT_37}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#3e5d70]">
          مستويات أصلية: خمسة مستويات × خمسة أسئلة = 25 سؤالًا. لا تظهر علامة صحة/خطأ ولا درجة ولا تفسير داخل هذه الصفحة قبل الإرسال.
        </p>
      </Card37>

      {submitted && grade ? (
        <section data-test-result role="status" aria-live="polite" className="rounded-3xl border border-[#8fdcd4] bg-[#e4f8f5] p-4 text-center sm:p-5">
          <p className="text-xs font-black uppercase tracking-[.12em] text-[#1f613d]">نتيجة الاختبار · 25 سؤالًا</p>
          <p className="mt-1 text-3xl font-black tabular-nums text-[#084765]" dir="ltr">{grade.score} / {grade.total}</p>
          <p className="mt-1 text-sm leading-6 text-[#1f613d]">
            تم تصحيح إجاباتك. راجع تفسير كل إجابة أدناه، أو افتح منطقة الحلول للاطلاع على الإجابات النموذجية والبدائل المقبولة.
          </p>
          <ActionButton37 className="mt-3" onClick={onGoSolutions}>الانتقال إلى منطقة الحلول التفصيلية</ActionButton37>
        </section>
      ) : null}

      {TEST_LEVELS_37.map((level) => (
        <section key={level.id} aria-labelledby={`l37-${level.id}`} className="space-y-3">
          <header className="flex flex-wrap items-center gap-2 border-b border-[#cde8f2] pb-2">
            <h2 id={`l37-${level.id}`} data-source-unit={`s34-unit-${level.titleUnitIndex}`} className="text-lg font-black text-[#084765]">
              <Rich text={level.title} />
            </h2>
            <span className="rounded-full bg-[#e8f5f8] px-3 py-1 text-xs font-bold text-[#3e5d70]">
              <span dir="ltr" className="font-en">
                Q{level.questions[0].n}–Q{level.questions.at(-1)?.n}
              </span>
            </span>
          </header>
          {level.instruction && level.instructionUnitIndex != null ? (
            <SourceLine37 sectionId="s34" index={level.instructionUnitIndex} text={level.instruction} />
          ) : null}
          {level.questions.map((question) => (
            <Question37
              key={question.n}
              question={question}
              value={answers[question.n] ?? ""}
              submitted={submitted}
              grade={grade?.records.find((record) => record.n === question.n)}
              onChange={(value) => update(question.n, value)}
            />
          ))}
          {level.trailing?.length ? (
            <div className="rounded-2xl border border-dashed border-[#9ed7df] bg-[#eff9fd] p-3">
              <p className="mb-1 text-sm font-black text-[#4b6a7d]">تكملة الفقرة الأصلية:</p>
              <div className="space-y-1">
                {level.trailing.map((line) => (
                  <SourceLine37 key={line.sourceUnitIndex} sectionId="s34" index={line.sourceUnitIndex} text={line.text} />
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ))}

      <div className="sticky bottom-3 z-10 rounded-2xl border border-[#b8dff0] bg-white/95 p-3 shadow-lg backdrop-blur">
        {!submitted ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ActionButton37 disabled={!ready || grading} onClick={submit}>
              {grading ? "جارٍ تصحيح الإجابات…" : "إرسال الاختبار"}
            </ActionButton37>
            <p className="text-sm font-bold text-[#3e5d70]" aria-live="polite">
              {grading ? "يجري تصحيح إجابات الأسئلة الخمسة والعشرين." : ready ? "أصبحت إجاباتك جاهزة للإرسال." : `أكمل ${TEST_COUNT_37 - answered} سؤالًا متبقيًا.`}
            </p>
          </div>
        ) : (
          <div className="text-center text-sm font-bold text-[#3e5d70]">تم الإرسال · الأسئلة محفوظة · الحلول في المساحة المنفصلة</div>
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
  grade?: { n: number; correct: boolean; answer: string; feedback: string };
  onChange: (value: string) => void;
}) {
  const promptLabel = `السؤال ${question.n}`;
  return (
    <fieldset className="rounded-2xl border border-[#b8dff0] bg-white p-3 sm:p-4" data-test-question={question.n}>
      <legend className="sr-only">{promptLabel}</legend>
      <div className="space-y-1">
        {question.promptLines.map((line, index) => (
          <SourceLine37 key={question.promptUnitIndexes[index]} sectionId="s34" index={question.promptUnitIndexes[index]} text={line} />
        ))}
      </div>
      {question.marker ? (
        <div className="mt-2">
          <SourceLine37 sectionId="s34" index={question.marker.sourceUnitIndex} text={question.marker.text} />
        </div>
      ) : null}
      {question.options ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {question.options.map((option) => (
            <label
              key={option.sourceUnitIndex}
              data-source-unit={`s34-unit-${option.sourceUnitIndex}`}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-bold text-[#17384a] ${
                value === option.label ? "border-[#007b83] bg-[#e4f8f5]" : "border-[#b8dff0] bg-white hover:bg-[#edf8ff]"
              }`}
            >
              <input
                type="radio"
                name={`l37-q-${question.n}`}
                value={option.label}
                checked={value === option.label}
                disabled={submitted}
                onChange={(event) => onChange(event.currentTarget.value)}
                className={`${FOCUS_37} h-4 w-4 accent-[#007b83]`}
              />
              <span dir="ltr" className="font-en text-left">
                {option.text}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <label className="mt-3 block">
          <span className="mb-1 block text-sm font-bold text-[#3e5d70]">
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
              className={`${FOCUS_37} w-full rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-base text-[#17384a]`}
              aria-label={`${promptLabel} — الإجابة`}
            />
          ) : (
            <textarea
              rows={question.type === "open" ? 3 : 4}
              dir="auto"
              value={value}
              disabled={submitted}
              onChange={(event) => onChange(event.currentTarget.value)}
              className={`${FOCUS_37} w-full resize-y rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-base leading-7 text-[#17384a]`}
              aria-label={`${promptLabel} — الإجابة`}
            />
          )}
        </label>
      )}
      {submitted && grade ? (
        <div
          data-test-feedback={question.n}
          className={`mt-3 rounded-2xl border p-3 text-sm leading-6 ${grade.correct ? "border-[#8fdcd4] bg-[#e4f8f5] text-[#1f613d]" : "border-[#f0b8aa] bg-[#fff0ec] text-[#943c31]"}`}
          aria-live="polite"
        >
          <p className="font-black">{grade.correct ? "✓ إجابة صحيحة" : "↺ تحتاج مراجعة"}</p>
          <p className="mt-1"><strong>الإجابة المقترحة: </strong><span dir="auto"><Rich text={grade.answer} /></span></p>
          <p className="mt-1"><strong>السبب: </strong><span dir="auto"><Rich text={grade.feedback} /></span></p>
        </div>
      ) : null}
    </fieldset>
  );
}
