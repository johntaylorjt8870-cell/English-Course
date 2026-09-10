import { useMemo, useState } from "react";
import { QUIZZES } from "./quizBank";

/**
 * الاختبار النهائي لكل درس — أسئلة جديدة كليًا مع تصحيح فوري وشرح.
 */
export default function FinalQuiz({ lesson, accent = "bg-slate-900" }: { lesson: number; accent?: string }) {
  const questions = QUIZZES[lesson] ?? [];
  const [pick, setPick] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);

  const answered = Object.keys(pick).length;
  const score = useMemo(
    () => questions.reduce((s, q, i) => s + (pick[i] === q.answer ? 1 : 0), 0),
    [pick, questions]
  );
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;

  const msg =
    pct === 100 ? "🏆 ممتاز! علامة كاملة — أنت جاهز للدرس التالي."
    : pct >= 80 ? "🌟 رائع جدًا! راجع الأسئلة الخاطئة فقط."
    : pct >= 60 ? "👍 جيد! أعد قراءة الشرح ثم حاول مجددًا."
    : "💪 لا بأس — راجع الدرس من البداية ثم أعد الاختبار.";

  const reset = () => {
    setPick({});
    setDone(false);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/70 p-4">
        <span className="text-2xl">📝</span>
        <span className="font-bold text-slate-700">
          {questions.length} سؤالًا جديدًا — أجب عنها كلها ثم اضغط «عرض النتيجة»
        </span>
        <span className="mr-auto rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
          أجبت عن {answered} / {questions.length}
        </span>
      </div>

      <div className="grid gap-3">
        {questions.map((q, i) => {
          const c = pick[i];
          const right = c === q.answer;
          return (
            <div
              key={i}
              className={`rounded-3xl border-2 p-4 transition ${
                c !== undefined
                  ? right
                    ? "border-emerald-300 bg-emerald-50/50"
                    : "border-rose-300 bg-rose-50/50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-wrap items-start gap-3">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${accent}`}>
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-slate-800">{q.ar}</div>
                  {q.en && (
                    <div dir="ltr" className="font-en mt-1 text-left text-xl font-extrabold text-slate-900">
                      {q.en}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 grid gap-2 pr-11 sm:grid-cols-2">
                {q.opts.map((o, oi) => {
                  const isA = oi === q.answer;
                  let cls = "border-slate-200 bg-white text-slate-700 hover:border-slate-400";
                  if (c !== undefined) {
                    if (isA) cls = "border-transparent bg-emerald-600 text-white";
                    else if (c === oi) cls = "border-transparent bg-rose-600 text-white";
                    else cls = "border-slate-200 bg-white text-slate-300";
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                      dir="ltr"
                      className={`rounded-xl border-2 px-3 py-2 text-left font-en text-base font-bold transition active:scale-[0.98] ${cls}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
              {c !== undefined && (
                <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>
                  {right ? "✓ صحيح! " : "✕ "}💡 {q.why}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-4 z-10 mt-5">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-4 shadow-xl backdrop-blur">
          {!done ? (
            <>
              <button
                onClick={() => setDone(true)}
                disabled={answered < questions.length}
                className={`rounded-xl px-5 py-2.5 font-bold text-white shadow transition ${accent} enabled:hover:brightness-110 disabled:opacity-30`}
              >
                عرض النتيجة ({answered}/{questions.length})
              </button>
              <button onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-200">
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className={`grid h-14 w-14 place-items-center rounded-2xl text-xl font-extrabold text-white ${accent}`}>
                {pct}%
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-slate-800">
                  نتيجتك: {score} / {questions.length}
                </div>
                <div className="text-sm font-semibold text-slate-500">{msg}</div>
              </div>
              <button onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-200">
                ↺ أعد الاختبار
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
