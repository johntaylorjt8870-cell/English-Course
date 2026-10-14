import { useMemo, useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { TEST_COUNT_39, TEST_INTRO_39, TEST_LEVELS_39, type TestQuestion39 } from "./testData39";
import { ActionButton39, Card39, FOCUS_39, SourceLine39 } from "./kit39";

export default function TestArea39({ onSubmitted, onGoSolutions }: { onSubmitted: () => void; onGoSolutions: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const answered = useMemo(() => Object.values(answers).filter((value) => value.trim().length > 0).length, [answers]);
  const ready = answered === TEST_COUNT_39;
  const update = (number: number, value: string) => setAnswers((current) => ({ ...current, [number]: value }));
  const submit = () => {
    if (!ready || submitted) return;
    setSubmitted(true);
    onSubmitted();
  };

  return (
    <div data-area="lesson39-test" data-source-section="s35" className="space-y-4">
      <Card39 eyebrow="Formal assessment · source §35" title={<Rich text="Future Perfect Continuous Master Test — المستقبل التام المستمر" />}>
        <div className="space-y-1">
          {TEST_INTRO_39.map((unit) => (
            <SourceLine39 key={unit.sourceUnitIndex} sectionId="s35" index={unit.sourceUnitIndex} text={unit.text} />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3" aria-label="عدد الأسئلة المجابة">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#e8e5dc]">
            <div
              className="h-full bg-[#245f62] transition-[width] motion-reduce:transition-none"
              style={{ width: `${Math.round((answered / TEST_COUNT_39) * 100)}%` }}
            />
          </div>
          <span dir="ltr" className="font-en text-sm font-black tabular-nums text-[#43575a]" aria-live="polite">
            {answered}/{TEST_COUNT_39}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#43575a]">
          مستويات أصلية: خمسة مستويات × خمسة أسئلة = 25 سؤالًا. لا تظهر علامة صحة/خطأ ولا درجة ولا تفسير داخل هذه الصفحة قبل الإرسال.
        </p>
      </Card39>

      {submitted ? (
        <section role="status" aria-live="polite" className="rounded-2xl border border-[#b8d6c0] bg-[#edf5ee] p-4 text-center">
          <p className="font-black text-[#28533b]">تم تسليم الاختبار. لا يوجد تصحيح فوري في هذه الصفحة.</p>
          <p className="mt-1 text-sm leading-6 text-[#28533b]">
            تُفتح الحلول التفصيلية في منطقة منفصلة بعد التسليم، مع نماذج وبدائل مقبولة في الأسئلة المفتوحة.
          </p>
          <ActionButton39 className="mt-3" onClick={onGoSolutions}>
            الانتقال إلى منطقة الحلول
          </ActionButton39>
        </section>
      ) : null}

      {TEST_LEVELS_39.map((level) => (
        <section key={level.id} aria-labelledby={`l39-${level.id}`} className="space-y-3">
          <header className="flex flex-wrap items-center gap-2 border-b border-[#dedbd2] pb-2">
            <h2 id={`l39-${level.id}`} data-source-unit={`s35-unit-${level.titleUnitIndex}`} className="text-lg font-black text-[#17354a]">
              <Rich text={level.title} />
            </h2>
            <span className="rounded-full bg-[#edf2ee] px-3 py-1 text-xs font-bold text-[#43575a]">
              <span dir="ltr" className="font-en">
                Q{level.questions[0].n}–Q{level.questions.at(-1)?.n}
              </span>
            </span>
          </header>
          {level.instruction && level.instructionUnitIndex != null ? (
            <SourceLine39 sectionId="s35" index={level.instructionUnitIndex} text={level.instruction} />
          ) : null}
          {level.questions.map((question) => (
            <Question39
              key={question.n}
              question={question}
              value={answers[question.n] ?? ""}
              submitted={submitted}
              onChange={(value) => update(question.n, value)}
            />
          ))}
          {level.trailing?.length ? (
            <div className="rounded-2xl border border-dashed border-[#c9d6d0] bg-[#f7faf8] p-3">
              <p className="mb-1 text-sm font-black text-[#53676a]">تكملة الفقرة الأصلية:</p>
              <div className="space-y-1">
                {level.trailing.map((line) => (
                  <SourceLine39 key={line.sourceUnitIndex} sectionId="s35" index={line.sourceUnitIndex} text={line.text} />
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ))}

      <div className="sticky bottom-3 z-10 rounded-2xl border border-[#d8d2c5] bg-white/95 p-3 shadow-lg backdrop-blur">
        {!submitted ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ActionButton39 disabled={!ready} onClick={submit}>
              إرسال الاختبار
            </ActionButton39>
            <p className="text-sm font-bold text-[#43575a]" aria-live="polite">
              {ready ? "أصبحت إجاباتك جاهزة للإرسال." : `أكمل ${TEST_COUNT_39 - answered} سؤالًا متبقيًا.`}
            </p>
          </div>
        ) : (
          <div className="text-center text-sm font-bold text-[#43575a]">تم الإرسال · الأسئلة محفوظة · الحلول في المساحة المنفصلة</div>
        )}
      </div>
    </div>
  );
}

function Question39({
  question,
  value,
  submitted,
  onChange,
}: {
  question: TestQuestion39;
  value: string;
  submitted: boolean;
  onChange: (value: string) => void;
}) {
  const promptLabel = `السؤال ${question.n}`;
  return (
    <fieldset className="rounded-2xl border border-[#d8d2c5] bg-white p-3 sm:p-4" data-test-question={question.n}>
      <legend className="sr-only">{promptLabel}</legend>
      <div className="space-y-1">
        {question.promptLines.map((line, index) => (
          <SourceLine39 key={question.promptUnitIndexes[index]} sectionId="s35" index={question.promptUnitIndexes[index]} text={line} />
        ))}
      </div>
      {question.marker ? (
        <div className="mt-2">
          <SourceLine39 sectionId="s35" index={question.marker.sourceUnitIndex} text={question.marker.text} />
        </div>
      ) : null}
      {question.options ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {question.options.map((option) => (
            <label
              key={option.sourceUnitIndex}
              data-source-unit={`s35-unit-${option.sourceUnitIndex}`}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-bold text-[#24343b] ${
                value === option.label ? "border-[#245f62] bg-[#eef4f0]" : "border-[#d8d2c5] bg-white hover:bg-[#f7f8f5]"
              }`}
            >
              <input
                type="radio"
                name={`l39-q-${question.n}`}
                value={option.label}
                checked={value === option.label}
                disabled={submitted}
                onChange={(event) => onChange(event.currentTarget.value)}
                className={`${FOCUS_39} h-4 w-4 accent-[#245f62]`}
              />
              <span dir="ltr" className="font-en text-left">
                {option.text}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <label className="mt-3 block">
          <span className="mb-1 block text-sm font-bold text-[#43575a]">
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
              className={`${FOCUS_39} w-full rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-base text-[#24343b]`}
              aria-label={`${promptLabel} — الإجابة`}
            />
          ) : (
            <textarea
              rows={question.type === "open" ? 3 : 4}
              dir="auto"
              value={value}
              disabled={submitted}
              onChange={(event) => onChange(event.currentTarget.value)}
              className={`${FOCUS_39} w-full resize-y rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-base leading-7 text-[#24343b]`}
              aria-label={`${promptLabel} — الإجابة`}
            />
          )}
        </label>
      )}
    </fieldset>
  );
}
