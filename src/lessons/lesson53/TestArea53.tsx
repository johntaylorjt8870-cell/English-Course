import { useState } from "react";
import { TEST_LEVELS_53, TEST_QUESTIONS_53 } from "./testData53";
import type { gradeTest53 } from "./testKey53";

export type TestResult53 = ReturnType<typeof gradeTest53>;

type Props = {
  answers: Record<string, string>;
  onAnswersChange: (answers: Record<string, string>) => void;
  result: TestResult53 | null;
  onResult: (result: TestResult53 | null) => void;
};

/** State is owned by the lesson so leaving the slide does not discard answers. */
export function TestArea53({ answers, onAnswersChange, result, onResult }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pending = result?.results.filter((entry) => entry.needsReview && !entry.reviewed).length ?? 0;
  const answered = TEST_QUESTIONS_53.filter((q) => (answers[q.id] ?? "").trim()).length;

  async function submit() {
    if (busy || result || answered !== TEST_QUESTIONS_53.length) return;
    setBusy(true);
    setError("");
    try {
      const key = await import("./testKey53");
      onResult(key.gradeTest53(answers));
    } catch {
      setError("تعذّر تحميل التصحيح. إجاباتك محفوظة، يرجى المحاولة مجددًا.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="grid gap-5" data-test-area="53">
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-500" aria-live="polite">
      أُجيب عن <bdi dir="ltr">{answered} / {TEST_QUESTIONS_53.length}</bdi> — أجب عن جميع الأسئلة قبل التسليم.
    </div>
    {TEST_LEVELS_53.map((level) => <section key={level.level} className="space-y-4">
      <h3 className="font-head text-2xl font-bold text-slate-900">{level.title}</h3>
      <p className="text-slate-600">{level.instruction}</p>
      {TEST_QUESTIONS_53.filter((q) => q.level === level.level).map((question) => {
        const feedback = result?.results.find((entry) => entry.question.id === question.id);
        return <div key={question.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" data-question={question.id}>
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{question.number}</span>
            <p dir={question.level === 5 ? "rtl" : "ltr"} lang={question.level === 5 ? "ar" : "en"} className={`min-w-0 text-lg font-semibold ${question.level === 5 ? "text-right" : "font-en text-left"}`}>{question.prompt}</p>
          </div>
          {question.type === "choice" ? <div className="mt-3 grid gap-2 sm:grid-cols-2" dir="ltr" role="group" aria-label={`خيارات السؤال ${question.number}`}>
            {question.options?.map((option) => <button type="button" key={option.id} aria-pressed={answers[question.id] === option.id} disabled={Boolean(result)} onClick={() => onAnswersChange({ ...answers, [question.id]: option.id })} className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-left font-bold transition ${answers[question.id] === option.id ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-slate-100 text-xs text-slate-700">{option.id.toUpperCase()}</span><span className="font-en" lang="en">{option.text}</span>
            </button>)}
          </div> : <input aria-label={`إجابة السؤال ${question.number}`} dir="ltr" lang="en" value={answers[question.id] ?? ""} disabled={Boolean(result)} onChange={(event) => onAnswersChange({ ...answers, [question.id]: event.target.value })} className="font-en mt-3 w-full min-w-0 rounded-xl border-2 border-slate-200 bg-white p-3 text-left text-slate-900" />}
          {feedback && <div data-question-feedback={question.id} className={`mt-3 rounded-2xl p-4 ${feedback.correct ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"}`}>
            <strong>{feedback.needsReview && !feedback.reviewed ? "صياغة تحتاج إلى مراجعة" : feedback.correct ? "صحيح ✓" : "غير صحيح"}</strong>
            {feedback.needsReview && <div className="mt-3 space-y-2"><p>لم يتعرف التصحيح الآلي على صياغتك؛ قد تكون صحيحة. قارنها بالنموذج، ثم قيّمها مع المعلم أو بنفسك:</p><div className="flex flex-wrap gap-2">{[true, false].map((accepted) => <button type="button" key={String(accepted)} aria-pressed={feedback.reviewed && feedback.correct === accepted} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white" onClick={() => { if (!result) return; const results = result.results.map((entry) => entry.question.id === question.id ? { ...entry, correct: accepted, reviewed: true } : entry); onResult({ ...result, results, score: results.filter((entry) => entry.correct).length }); }}>{accepted ? "إجابتي صحيحة" : "إجابتي غير صحيحة"}</button>)}</div></div>}
            <p dir="ltr" lang="en" className="font-en mt-2 text-left">{feedback.solution.model}</p>
            <p className="mt-2">{feedback.solution.why}</p>
          </div>}
        </div>;
      })}
    </section>)}
    {error && <p role="alert" className="rounded-2xl bg-rose-50 p-4 text-rose-800">{error}</p>}
    {result ? <div className="rounded-3xl bg-slate-900 p-5 text-white" aria-live="polite">
      <p className="font-head text-2xl font-bold">النتيجة: <bdi dir="ltr">{result.score} / {result.total}</bdi></p>{pending > 0 && <p className="mt-2">هناك {pending} إجابة نصية بانتظار المراجعة؛ النتيجة مؤقتة حتى تقييمها.</p>}
      <button type="button" className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-900" onClick={() => { onAnswersChange({}); onResult(null); }}>محاولة جديدة</button>
    </div> : <button type="button" disabled={busy || answered !== TEST_QUESTIONS_53.length} onClick={submit} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white transition disabled:opacity-50">{busy ? "جارٍ التصحيح..." : "تسليم الاختبار"}</button>}
  </div>;
}
