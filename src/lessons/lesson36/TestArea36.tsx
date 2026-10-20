import { useMemo, useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { TEST_COUNT_36, TEST_INTRO_36, TEST_LEVELS_36, type TestQuestion36 } from "./testData36";
import { ActionButton36, Card36, FOCUS_36, SourceLine36 } from "./kit36";

export default function TestArea36({ onSubmitted, onGoSolutions }: { onSubmitted: () => void; onGoSolutions: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const answered = useMemo(() => Object.values(answers).filter((value) => value.trim().length > 0).length, [answers]);
  const ready = answered === TEST_COUNT_36;
  const submit = () => {
    if (!ready || submitted) return;
    setSubmitted(true);
    onSubmitted();
  };
  const update = (number: number, value: string) => setAnswers((current) => ({ ...current, [number]: value }));

  return (
    <div data-area="lesson36-test" data-source-section="s22" className="space-y-4">
      <Card36 eyebrow="Formal assessment · source §22" title="WILL vs BE GOING TO Master Test">
        <div className="space-y-1">
          {TEST_INTRO_36.map((unit) => <SourceLine36 key={unit.sourceUnitIndex} sectionId="s22" index={unit.sourceUnitIndex} text={unit.text} />)}
        </div>
        <div className="mt-4 flex items-center gap-3" aria-label="عدد الأسئلة المجابة">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#e8e5dc]"><div className="h-full bg-[#0d9488] transition-[width] motion-reduce:transition-none" style={{ width: `${Math.round((answered / TEST_COUNT_36) * 100)}%` }} /></div>
          <span className="font-en text-sm font-black tabular-nums text-[#475569]" aria-live="polite">{answered}/{TEST_COUNT_36}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#475569]">أكمل الأسئلة كلها ثم أرسلها. لا تظهر علامة صحة/خطأ أو إجابات نموذجية داخل الاختبار.</p>
      </Card36>

      {submitted ? (
        <section role="status" aria-live="polite" className="rounded-2xl border border-[#5eead4] bg-[#ccfbf1] p-4 text-center">
          <p className="font-black text-[#0f766e]">تم تسليم الاختبار. لا يوجد تصحيح فوري في هذه الصفحة.</p>
          <p className="mt-1 text-sm leading-6 text-[#0f766e]">تُفتح الحلول التفصيلية المنفصلة بعد التسليم، مع قبول البدائل المناسبة حيث يسمح السياق.</p>
          <ActionButton36 className="mt-3" onClick={onGoSolutions}>الانتقال إلى منطقة الحلول</ActionButton36>
        </section>
      ) : null}

      {TEST_LEVELS_36.map((level) => (
        <section key={level.id} aria-labelledby={`l36-${level.id}`} className="space-y-3">
          <header className="flex flex-wrap items-center gap-2 border-b border-[#dedbd2] pb-2">
            <h2 id={`l36-${level.id}`} data-source-unit={`s22-unit-${level.titleUnitIndex}`} className="text-lg font-black text-[#0d9488]"><Rich text={level.title} /></h2>
            <span className="rounded-full bg-[#edf2ee] px-3 py-1 text-xs font-bold text-[#475569]">{level.questions[0].n}–{level.questions.at(-1)?.n}</span>
          </header>
          {level.instruction && level.instructionUnitIndex != null ? <SourceLine36 sectionId="s22" index={level.instructionUnitIndex} text={level.instruction} /> : null}
          {level.questions.map((question) => (
            <Question36 key={question.n} question={question} value={answers[question.n] ?? ""} submitted={submitted} onChange={(value) => update(question.n, value)} />
          ))}
        </section>
      ))}

      <div className="sticky bottom-3 z-10 rounded-2xl border border-[#e2e8f0] bg-white/95 p-3 shadow-lg backdrop-blur">
        {!submitted ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ActionButton36 disabled={!ready} onClick={submit}>إرسال الاختبار</ActionButton36>
            <p className="text-sm font-bold text-[#475569]" aria-live="polite">{ready ? "أصبحت إجاباتك جاهزة للإرسال." : `أكمل ${TEST_COUNT_36 - answered} سؤالًا متبقيًا.`}</p>
          </div>
        ) : (
          <div className="text-center text-sm font-bold text-[#475569]">تم الإرسال · الأسئلة محفوظة · الحلول في المساحة المنفصلة</div>
        )}
      </div>
    </div>
  );
}

function Question36({ question, value, submitted, onChange }: { question: TestQuestion36; value: string; submitted: boolean; onChange: (value: string) => void }) {
  const promptLabel = `السؤال ${question.n}`;
  return (
    <fieldset className="rounded-2xl border border-[#e2e8f0] bg-white p-3 sm:p-4" data-test-question={question.n}>
      <legend className="sr-only">{promptLabel}</legend>
      <div className="space-y-1">
        {question.promptLines.map((line, index) => <SourceLine36 key={question.promptUnitIndexes[index]} sectionId="s22" index={question.promptUnitIndexes[index]} text={line} />)}
      </div>
      {question.options ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {question.options.map((option, index) => (
            <label key={option.sourceUnitIndex} data-source-unit={`s22-unit-${option.sourceUnitIndex}`} className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-bold text-[#334155] ${value === String(index) ? "border-[#0d9488] bg-[#ccfbf1]" : "border-[#e2e8f0] bg-white hover:bg-[#f8fafc]"}`}>
              <input type="radio" name={`l36-q-${question.n}`} value={String(index)} checked={value === String(index)} disabled={submitted} onChange={(event) => onChange(event.currentTarget.value)} className={`${FOCUS_36} h-4 w-4 accent-[#0d9488]`} />
              <span dir="ltr" className="font-en text-left">{option.text}</span>
            </label>
          ))}
        </div>
      ) : (
        <label className="mt-3 block">
          <span className="mb-1 block text-sm font-bold text-[#475569]">{question.type === "fill" ? "أكمل الفراغ" : question.type === "repair" ? "اكتب التصحيح" : question.type === "explain" ? "اكتب تفسيرك" : "اكتب جملة مناسبة"}</span>
          {question.type === "fill" || question.type === "repair" ? (
            <input type="text" dir="auto" value={value} disabled={submitted} onChange={(event) => onChange(event.currentTarget.value)} className={`${FOCUS_36} w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2.5 text-base text-[#334155]`} aria-label={`${promptLabel} — الإجابة`} />
          ) : (
            <textarea rows={question.type === "open" ? 3 : 4} dir="auto" value={value} disabled={submitted} onChange={(event) => onChange(event.currentTarget.value)} className={`${FOCUS_36} w-full resize-y rounded-xl border border-[#cbd5e1] bg-white px-3 py-2.5 text-base leading-7 text-[#334155]`} aria-label={`${promptLabel} — الإجابة`} />
          )}
        </label>
      )}
    </fieldset>
  );
}
