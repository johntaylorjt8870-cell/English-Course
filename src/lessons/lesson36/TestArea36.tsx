import { useMemo, useRef, useState } from "react";
import { TEST_COUNT_36, TEST_INTRO_36, TEST_LEVELS_36, type TestQuestion36 } from "./testData36";
import { U } from "./content36";
import { ActionButton36, Card36, En36, FOCUS_36, MixedText36, SourceText36 } from "./kit36";
import { formatScore36, type Grade36, type QuestionGrade36, type TestSolution36 } from "./grading36";

const TYPE_LABEL: Record<TestQuestion36["type"], string> = {
  "multiple-choice": "اختر الصيغة الأنسب",
  fill: "أكمل الفراغ",
  repair: "اكتب الجملة بعد التصحيح",
  explain: "اكتب تفسيرك",
  open: "اكتب جملة مناسبة للموقف",
};

const STATUS_LABEL: Record<QuestionGrade36["status"], string> = {
  correct: "إجابة صحيحة",
  acceptable: "إجابة مقبولة مع ملاحظة",
  review: "تحتاج مراجعة",
  open: "إجابة مفتوحة — قارن بالنموذج",
};

const STATUS_STYLE: Record<QuestionGrade36["status"], string> = {
  correct: "border-emerald-300 bg-emerald-50 text-emerald-950",
  acceptable: "border-sky-300 bg-sky-50 text-sky-950",
  review: "border-rose-300 bg-rose-50 text-rose-950",
  open: "border-slate-300 bg-slate-50 text-slate-800",
};

const STATUS_ICON: Record<QuestionGrade36["status"], string> = {
  correct: "✓",
  acceptable: "≈",
  review: "✕",
  open: "✎",
};

export default function TestArea36({
  onSubmitted,
  onGoSolutions,
}: {
  onSubmitted: () => void;
  onGoSolutions: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [grading, setGrading] = useState<Grade36 | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);

  const answered = useMemo(() => Object.values(answers).filter((value) => value.trim().length > 0).length, [answers]);
  const ready = answered === TEST_COUNT_36;
  const remaining = TEST_COUNT_36 - answered;
  const gradeOf = (n: number) => grading?.perQuestion.find((item) => item.n === n);

  const submit = async () => {
    if (!ready || submitted || busy) return;
    setBusy(true);
    setError("");
    try {
      const [{ TEST_SOLUTIONS_36 }, { gradeTest36 }] = await Promise.all([import("./solutionsData36"), import("./grading36")]);
      const result = gradeTest36(answers, TEST_SOLUTIONS_36 as TestSolution36[]);
      setGrading(result);
      setSubmitted(true);
      onSubmitted();
      topRef.current?.scrollIntoView?.({ block: "start" });
    } catch {
      setError("تعذّر فتح التصحيح الآن. حاول مرة أخرى.");
    } finally {
      setBusy(false);
    }
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
    setGrading(null);
    setReviewOpen(false);
    setError("");
    topRef.current?.scrollIntoView?.({ block: "start" });
  };

  const jumpTo = (n: number) => {
    const card = document.getElementById(`l36-question-${n}`);
    card?.scrollIntoView?.({ block: "center" });
    const field = card?.querySelector<HTMLElement>("input, textarea");
    field?.focus?.({ preventScroll: true });
  };

  return (
    <div data-area="l36-test" className="space-y-4">
      <div ref={topRef} />
      <Card36 eyebrow="الاختبار النهائي" title="WILL vs BE GOING TO Master Test">
        <div className="space-y-1">
          {TEST_INTRO_36.map((unit) => (
            <p key={unit.sourceUnitIndex} className="text-sm leading-7 text-slate-700">
              <SourceText36 value={U("s22", unit.sourceUnitIndex)} />
            </p>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label="عدد الأسئلة المجابة" aria-valuemin={0} aria-valuemax={TEST_COUNT_36} aria-valuenow={answered}>
            <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${(answered / TEST_COUNT_36) * 100}%` }} />
          </div>
          <span dir="ltr" className="font-en text-sm font-black tabular-nums text-slate-700" aria-live="polite">
            {answered}/{TEST_COUNT_36}
          </span>
        </div>
        {!submitted ? (
          <p className="mt-2 text-xs font-bold text-slate-500">لا يظهر أي تصحيح أو مفتاح إجابة قبل التسليم. يمكنك مراجعة إجاباتك والتنقل بين الأسئلة قبل الإرسال.</p>
        ) : (
          <p className="mt-2 text-xs font-bold text-slate-500">تم التسليم؛ النتيجة والتصحيح ظاهران أدناه، والمفتاح التفصيلي في مساحة الحلول.</p>
        )}
      </Card36>

      {submitted && grading ? (
        <section role="status" aria-live="polite" className="rounded-3xl border border-emerald-300 bg-emerald-50 p-5" data-test-result>
          <h2 className="font-head text-lg font-bold text-emerald-950 sm:text-xl">نتيجتك في الأسئلة الموضوعية</h2>
          <p className="mt-1 text-3xl font-black text-emerald-950">
            <span dir="ltr" className="font-en tabular-nums">{formatScore36(grading.score)}</span>
            <span className="text-lg"> / {grading.maxScore}</span>
          </p>
          <ul className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
            <li className="rounded-full bg-emerald-600 px-3 py-1 text-white">صحيحة: {grading.correct.length}</li>
            <li className="rounded-full bg-sky-700 px-3 py-1 text-white">مقبولة مع ملاحظة: {grading.acceptable.length}</li>
            <li className="rounded-full bg-rose-700 px-3 py-1 text-white">تحتاج مراجعة: {grading.review.length}</li>
            <li className="rounded-full bg-slate-700 px-3 py-1 text-white">مفتوحة للمقارنة: {grading.open.length}</li>
          </ul>
          <p className="mt-2 text-sm leading-7 text-emerald-950">
            الأسئلة 16–25 أسئلة معنى وإنتاج، فلا تُصحَّح آليًا. قارن إجابتك بالنموذج والتفسير، ثم راجع البدائل المقبولة.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <ActionButton36 onClick={onGoSolutions}>عرض الحلول التفصيلية</ActionButton36>
            <ActionButton36 variant="secondary" onClick={retry}>إعادة المحاولة</ActionButton36>
          </div>
        </section>
      ) : null}

      {error ? (
        <p role="alert" className="rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-900">
          {error}
        </p>
      ) : null}

      {TEST_LEVELS_36.map((level) => (
        <section key={level.id} aria-labelledby={`l36-${level.id}`} className="space-y-3">
          <header className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
            <h2 id={`l36-${level.id}`} className="font-head text-lg font-bold text-slate-900">
              <SourceText36 value={U("s22", level.titleUnitIndex)} />
            </h2>
            <span dir="ltr" className="font-en rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
              {level.questions[0].n}–{level.questions.at(-1)?.n}
            </span>
          </header>
          {level.instruction && level.instructionUnitIndex != null ? (
            <p className="text-sm font-bold text-slate-600">
              <SourceText36 value={U("s22", level.instructionUnitIndex)} />
            </p>
          ) : null}
          {level.questions.map((question) => (
            <Question36
              key={question.n}
              question={question}
              value={answers[question.n] ?? ""}
              submitted={submitted}
              grade={gradeOf(question.n)}
              onChange={(value) => setAnswers((current) => ({ ...current, [question.n]: value }))}
            />
          ))}
        </section>
      ))}

      {!submitted ? (
        <div className="sticky bottom-20 z-10 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur md:bottom-24">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <ActionButton36 onClick={submit} disabled={!ready || busy}>
                {busy ? "جارٍ التصحيح…" : "إرسال الاختبار"}
              </ActionButton36>
              <button type="button" aria-expanded={reviewOpen} onClick={() => setReviewOpen((current) => !current)} className={`${FOCUS_36} rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700`}>
                {reviewOpen ? "إخفاء مراجعة الإجابات" : "مراجعة إجاباتي"}
              </button>
            </div>
            <p className={`text-sm font-bold ${ready ? "text-emerald-800" : "text-slate-600"}`} aria-live="polite">
              {ready ? "أكملت الأسئلة الخمسة والعشرين؛ يمكنك التسليم أو المراجعة أولًا." : `لم يُسلَّم الاختبار: أكمل ${remaining} سؤالًا متبقيًا.`}
            </p>
            {reviewOpen ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                <p className="mb-1 text-xs font-black text-slate-600">انتقل إلى أي سؤال لمراجعته</p>
                <ul className="flex flex-wrap gap-1.5">
                  {Array.from({ length: TEST_COUNT_36 }, (_, index) => index + 1).map((n) => {
                    const done = (answers[n] ?? "").trim().length > 0;
                    return (
                      <li key={n}>
                        <button
                          type="button"
                          onClick={() => jumpTo(n)}
                          className={`${FOCUS_36} rounded-lg border px-2 py-1 text-xs font-bold tabular-nums ${done ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-slate-300 bg-white text-slate-600"}`}
                          aria-label={`السؤال ${n}: ${done ? "أُجيب" : "لم يُجب"}`}
                        >
                          <span dir="ltr" className="font-en">{n}</span>
                          <span aria-hidden className="ml-1">{done ? "✓" : "·"}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
          تم التسليم · الأسئلة محفوظة كما أجبتها، والتصحيح ظاهر أسفل كل سؤال.
        </p>
      )}
    </div>
  );
}

function Question36({
  question,
  value,
  submitted,
  grade,
  onChange,
}: {
  question: TestQuestion36;
  value: string;
  submitted: boolean;
  grade?: QuestionGrade36;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset id={`l36-question-${question.n}`} data-test-question={question.n} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <legend className="sr-only">السؤال {question.n}</legend>
      <div className="flex flex-wrap items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-xs font-bold text-white" dir="ltr">
          {question.n}
        </span>
        <span className="text-xs font-bold text-slate-500">{TYPE_LABEL[question.type]}</span>
      </div>
      <div className="mt-2 space-y-1">
        {question.promptLines.map((_, index) => (
          <p key={index} className="text-base leading-7 text-slate-800">
            <SourceText36 value={U("s22", question.promptUnitIndexes[index])} />
          </p>
        ))}
      </div>

      {question.options ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {question.options.map((option, index) => {
            const checked = value === String(index);
            return (
              <label
                key={option.sourceUnitIndex}
                className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 text-sm font-bold transition ${checked ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"} ${submitted ? "cursor-default" : ""}`}
                data-chosen={checked || undefined}
              >
                <input
                  type="radio"
                  name={`l36-q-${question.n}`}
                  value={String(index)}
                  checked={checked}
                  disabled={submitted}
                  onChange={(event) => onChange(event.currentTarget.value)}
                  className={`${FOCUS_36} h-4 w-4 shrink-0 accent-slate-900`}
                />
                <En36 className="text-left">{option.text}</En36>
              </label>
            );
          })}
        </div>
      ) : (
        <label className="mt-3 block">
          <span className="mb-1 block text-xs font-bold text-slate-600">إجابتك</span>
          {question.type === "fill" || question.type === "repair" ? (
            <input
              type="text"
              dir="ltr"
              lang="en"
              value={value}
              disabled={submitted}
              onChange={(event) => onChange(event.currentTarget.value)}
              className={`${FOCUS_36} font-en w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-base text-slate-900`}
              aria-label={`السؤال ${question.n} — الإجابة`}
            />
          ) : (
            <textarea
              rows={question.type === "open" ? 3 : 4}
              dir="auto"
              value={value}
              disabled={submitted}
              onChange={(event) => onChange(event.currentTarget.value)}
              className={`${FOCUS_36} w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-base leading-7 text-slate-900`}
              aria-label={`السؤال ${question.n} — الإجابة`}
            />
          )}
        </label>
      )}

      {submitted && grade ? (
        <div className={`mt-3 rounded-xl border p-3 text-sm leading-7 ${STATUS_STYLE[grade.status]}`} data-test-feedback={grade.status} data-solution={question.n}>
          <p className="font-black">
            <span aria-hidden className="mr-1">{STATUS_ICON[grade.status]}</span>
            {STATUS_LABEL[grade.status]}
          </p>
          <p className="mt-1">
            <span className="font-bold">الإجابة النموذجية: </span>
            <span dir="auto">
              <MixedText36 text={grade.answer} />
            </span>
          </p>
          <p className="mt-0.5">
            <span className="font-bold">التفسير: </span>
            <span dir="auto">
              <MixedText36 text={grade.explanation} />
            </span>
          </p>
          {grade.alternatives?.length ? (
            <ul className="mt-1 list-disc space-y-0.5 ps-5 text-xs leading-6">
              {grade.alternatives.map((line) => (
                <li key={line} dir="auto">
                  <MixedText36 text={line} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </fieldset>
  );
}
