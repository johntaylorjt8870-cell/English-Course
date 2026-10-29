import { useRef, useState } from "react";
import { En45, Text45 } from "./design45";
import {
  TEST_LEVELS_45,
  TEST_QUESTIONS_45,
  TEST_QUESTION_COUNT_45,
  answeredCount45,
  firstUnansweredId45,
  testComplete45,
} from "./testData45";
import type { GradedTestResult45 } from "./testKey45";

const LETTERS = ["A", "B", "C", "D"] as const;

const LEVEL_BADGE_CLASSES = {
  sky: "bg-sky-100 text-sky-800 border-sky-200",
  violet: "bg-violet-100 text-violet-800 border-violet-200",
  orange: "bg-orange-100 text-orange-800 border-orange-200",
  emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rose: "bg-rose-100 text-rose-800 border-rose-200",
} as const;

export type TestArea45Props = {
  answers: Record<string, string>;
  result: GradedTestResult45 | null;
  onChangeAnswer: (id: string, value: string) => void;
  onSubmitResult: (graded: GradedTestResult45) => void;
  onResetTest: () => void;
};

export default function TestArea45({
  answers,
  result,
  onChangeAnswer,
  onSubmitResult,
  onResetTest,
}: TestArea45Props) {
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  const submitted = result !== null;
  const answered = answeredCount45(answers);
  const complete = testComplete45(answers);
  const remaining = TEST_QUESTION_COUNT_45 - answered;

  const focusFirstUnanswered = () => {
    const missingId = firstUnansweredId45(answers);
    if (!missingId) return;
    const card = document.querySelector<HTMLElement>(`[data-question-id="${missingId}"]`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      const field = card.querySelector<HTMLElement>("input, textarea, button");
      field?.focus();
    }
  };

  const handleSubmit = async () => {
    if (submittingRef.current || submitted || !complete) return;
    submittingRef.current = true;
    setLoading(true);
    try {
      const { gradeTest45 } = await import("./testKey45");
      const graded = gradeTest45(answers);
      onSubmitResult(graded);
      requestAnimationFrame(() => {
        bannerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  const handleReset = () => {
    submittingRef.current = false;
    setLoading(false);
    onResetTest();
  };

  const pct = result ? Math.round((result.score / result.total) * 100) : 0;

  return (
    <div data-area="lesson45-test" className="space-y-6">
      {/* شريط التعليمات والتقدم قبل التسليم */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5">
        <div className="text-base font-bold text-slate-700">
          25 سؤالًا متدرجة في 5 مستويات — أجب عنها جميعًا ثم اضغط زر التسليم للتصحيح الفوري.
        </div>
        <span
          role="status"
          aria-live="polite"
          className={`rounded-full px-3.5 py-1 text-sm font-bold shadow-xs ${
            complete ? "bg-emerald-600 text-white" : "bg-white text-slate-700"
          }`}
        >
          تمت الإجابة عن {answered} من {TEST_QUESTION_COUNT_45}
        </span>
      </div>

      {/* بطاقة النتيجة الإجمالية بعد التسليم (مطابقة لتجربة الدرس الأول) */}
      {submitted && result && (
        <div
          ref={bannerRef}
          data-test-result
          role="status"
          aria-live="polite"
          className="pop space-y-4 rounded-3xl border-2 border-violet-300 bg-gradient-to-l from-violet-50 via-white to-sky-50 p-5 shadow-sm md:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="text-5xl" aria-hidden="true">
                {pct >= 85 ? "🏆" : pct >= 60 ? "🌟" : "💪"}
              </span>
              <div>
                <div className="font-head text-2xl font-bold text-slate-900 md:text-3xl">
                  نتيجتك: <bdi dir="ltr">{result.score} / {result.total}</bdi>{" "}
                  <span className="text-violet-700">(<bdi dir="ltr">{pct}%</bdi>)</span>
                </div>
                <p className="mt-1 text-base font-semibold text-slate-600">
                  {pct >= 88
                    ? "إتقان ممتاز! استوعبت فروق النصيحة والتوقع ومراجعة الماضي بدقة عالية."
                    : pct >= 68
                      ? "أداء جيد جدًا! راجع الأسئلة المعلّمة باللون الأحمر لتثبيت الفروق الدقيقة."
                      : "بداية طيبة! اقرأ الشرح النموذجي لكل سؤال بالأسفل ثم أعد المحاولة."}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              data-test-reset
              className="rounded-2xl bg-slate-900 px-5 py-3 text-base font-bold text-white shadow transition hover:bg-slate-700"
            >
              🔄 إعادة الاختبار
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 sm:grid-cols-5">
            {TEST_LEVELS_45.map((lv) => {
              const stat = result.byLevel[lv.level] ?? { score: 0, total: 5 };
              const full = stat.score === stat.total;
              return (
                <div
                  key={lv.level}
                  className={`rounded-2xl border px-3 py-2 text-center text-sm font-bold ${
                    full
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <div>المستوى {lv.level}</div>
                  <div dir="ltr" className="font-en mt-0.5 text-base font-extrabold">
                    {stat.score} / {stat.total}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* المستويات الخمسة (1 ← 5) */}
      <div className="space-y-8">
        {TEST_LEVELS_45.map((levelMeta) => {
          const questions = TEST_QUESTIONS_45.filter((q) => q.level === levelMeta.level);
          const levelAnswered = questions.filter((q) => Boolean(answers[q.id]?.trim())).length;

          return (
            <section
              key={levelMeta.level}
              data-test-level={levelMeta.level}
              className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/60 p-4 md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200/80 pb-3.5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-0.5 text-xs font-extrabold ${
                        LEVEL_BADGE_CLASSES[levelMeta.badgeTone]
                      }`}
                    >
                      <En45>{levelMeta.titleEn}</En45>
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {levelAnswered} / {questions.length} مُجاب
                    </span>
                  </div>
                  <h3 className="font-head mt-1.5 text-xl font-bold text-slate-900 md:text-2xl">
                    {levelMeta.titleAr}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-slate-600 md:text-base">
                    <Text45 text={levelMeta.instructionAr} />
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {questions.map((q) => {
                  const val = answers[q.id] ?? "";
                  const isCorrect = submitted ? Boolean(result?.byQuestion[q.id]) : false;
                  const sol = submitted ? result?.solutions[q.id] : undefined;

                  const isLatinTyped =
                    q.inputMode === "en" ||
                    (/[A-Za-z]/.test(val) && !/[\u0600-\u06FF]/.test(val));

                  return (
                    <article
                      key={q.id}
                      data-question-id={q.id}
                      data-test-q={q.number}
                      className={`rounded-3xl border-2 p-4 transition md:p-5 ${
                        !submitted
                          ? "border-slate-200 bg-white"
                          : isCorrect
                            ? "border-emerald-300 bg-emerald-50/50"
                            : "border-rose-300 bg-rose-50/50"
                      }`}
                    >
                      {/* رأس السؤال */}
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                          <span
                            className={`font-head grid h-9 w-9 shrink-0 place-items-center rounded-xl text-base font-bold text-white ${
                              !submitted
                                ? "bg-slate-900"
                                : isCorrect
                                  ? "bg-emerald-600"
                                  : "bg-rose-600"
                            }`}
                          >
                            {q.number}
                          </span>
                          <div className="min-w-0 flex-1">
                            {q.hintAr && (
                              <div className="mb-1 text-sm font-bold text-slate-500">
                                <Text45 text={q.hintAr} />
                              </div>
                            )}
                            <div
                              dir="ltr"
                              lang="en"
                              className="font-en text-left text-lg font-extrabold leading-relaxed text-slate-900 md:text-xl"
                            >
                              {q.level === 3 ? (
                                <span>
                                  <span className="mr-2 rounded-md bg-rose-100 px-2 py-0.5 text-xs font-extrabold text-rose-800">
                                    FIX
                                  </span>
                                  {q.prompt}
                                </span>
                              ) : (
                                q.prompt
                              )}
                            </div>
                          </div>
                        </div>

                        {submitted && (
                          <span
                            data-test-verdict={isCorrect ? "ok" : "bad"}
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-extrabold ${
                              isCorrect
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-rose-100 text-rose-900"
                            }`}
                          >
                            {isCorrect ? "✓ إجابة صحيحة" : "✕ إجابة غير صحيحة"}
                          </span>
                        )}
                      </div>

                      {/* عنصر الإدخال أو الاختيار */}
                      {q.type === "choice" ? (
                        <div className="mt-4 grid gap-2.5 sm:grid-cols-3" role="group" aria-label={`خيارات السؤال ${q.number}`}>
                          {q.options?.map((opt, oi) => {
                            const picked = val === opt;
                            const isModelOpt =
                              submitted &&
                              sol &&
                              opt.toLowerCase() === sol.modelAnswer.toLowerCase();

                            let btnStyle =
                              "border-slate-200 bg-white text-slate-800 hover:border-violet-300";
                            if (!submitted && picked) {
                              btnStyle =
                                "border-violet-600 bg-violet-50 text-violet-950 ring-2 ring-violet-200";
                            } else if (submitted) {
                              if (isModelOpt) {
                                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-950";
                              } else if (picked && !isModelOpt) {
                                btnStyle = "border-rose-400 bg-rose-50 text-rose-950";
                              } else {
                                btnStyle = "border-slate-200 bg-white/70 text-slate-500";
                              }
                            }

                            return (
                              <button
                                key={opt}
                                type="button"
                                disabled={submitted}
                                aria-pressed={picked}
                                onClick={() => onChangeAnswer(q.id, opt)}
                                dir="ltr"
                                className={`flex items-center justify-between gap-2 rounded-2xl border-2 px-4 py-3 text-left font-en text-lg font-bold transition ${btnStyle}`}
                              >
                                <span>
                                  <span className="mr-1.5 text-slate-400">{LETTERS[oi]})</span>
                                  {opt}
                                </span>
                                {submitted && isModelOpt && (
                                  <span className="text-emerald-700" aria-hidden="true">
                                    ✓
                                  </span>
                                )}
                                {submitted && picked && !isModelOpt && (
                                  <span className="text-rose-700" aria-hidden="true">
                                    ✕
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ) : q.inputMode === "bilingual" ? (
                        <div className="mt-3.5">
                          <textarea
                            rows={2}
                            disabled={submitted}
                            dir={val.trim() === "" ? "rtl" : isLatinTyped ? "ltr" : "rtl"}
                            value={val}
                            onChange={(e) => onChangeAnswer(q.id, e.target.value)}
                            placeholder="اكتب شرحك باختصار هنا..."
                            aria-label={`الإجابة عن السؤال ${q.number}`}
                            className={`w-full rounded-2xl border-2 border-slate-200 bg-slate-50/70 px-4 py-3 text-base font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white disabled:opacity-80 ${
                              val.trim() !== "" && isLatinTyped
                                ? "font-en text-left"
                                : "text-right"
                            }`}
                          />
                        </div>
                      ) : (
                        <div className="mt-3.5">
                          <input
                            type="text"
                            disabled={submitted}
                            dir="ltr"
                            lang="en"
                            value={val}
                            onChange={(e) => onChangeAnswer(q.id, e.target.value)}
                            placeholder="Write your answer..."
                            aria-label={`الإجابة عن السؤال ${q.number}`}
                            className="font-en w-full rounded-2xl border-2 border-slate-200 bg-slate-50/70 px-4 py-3 text-left text-lg font-bold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-violet-500 focus:bg-white disabled:opacity-80"
                          />
                        </div>
                      )}

                      {/* التصحيح الفردي والإجابة النموذجية والشرح بعد التسليم فقط */}
                      {submitted && sol && (
                        <div className="mt-4 space-y-2 rounded-2xl border border-slate-200/90 bg-white p-3.5 text-sm md:text-base">
                          <div className="flex flex-wrap items-baseline gap-2 font-bold text-slate-800">
                            <span className="text-emerald-800">الإجابة النموذجية:</span>
                            <Text45
                              text={sol.modelAnswer}
                              className="font-extrabold text-emerald-950"
                            />
                          </div>
                          <div className="text-xs font-bold text-violet-800">
                            <Text45 text={`القاعدة: ${sol.concept}`} />
                          </div>
                          <p className="font-medium leading-relaxed text-slate-600">
                            💡 <Text45 text={sol.why} />
                          </p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* أزرار التسليم أو الإعادة أسفل الاختبار */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-5">
        {!submitted ? (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                data-test-submit
                disabled={!complete || loading}
                onClick={() => void handleSubmit()}
                className="rounded-2xl bg-emerald-600 px-6 py-3.5 text-lg font-bold text-white shadow-lg transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
              >
                {loading ? "جارٍ تصحيح الإجابات..." : "✅ تسليم الاختبار وتصحيح الإجابات"}
              </button>
              {!complete && (
                <button
                  type="button"
                  onClick={focusFirstUnanswered}
                  className="rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-950 transition hover:bg-amber-100"
                >
                  بقي {remaining} سؤال — انتقل إلى أول سؤال غير مُجاب ↵
                </button>
              )}
            </div>
            <span className="text-sm font-bold text-slate-500">
              لا تُكشف الإجابات أو الدرجات قبل التسليم الكامل.
            </span>
          </>
        ) : (
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <span className="text-base font-bold text-emerald-800">
              ✓ اكتمل التصحيح — راجع ملاحظات كل سؤال أعلاه أو أعد الاختبار للتدرب من جديد.
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-base font-bold text-white shadow transition hover:bg-slate-700"
            >
              🔄 إعادة الاختبار من جديد
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
