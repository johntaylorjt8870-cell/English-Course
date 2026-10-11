// ============================================================
// TestArea34 — منطقة اختبار الدرس 34 + منطقة الحلول
// - الاختبار (TEST_34 من قسم المصدر ㉞): 25 سؤالًا في 5 مستويات،
//   محايد حتى «إرسال الاختبار» — لا ✓ ولا درجة ولا تلميح ألوان قبلها.
// - الحلول (قسم المصدر ㉟ المساحة): مقفلة حتى الإرسال الكامل، ثم
//   تُعرض الإجابة + السبب لكل سؤال.
// ============================================================

import { useMemo, useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import {
  TEST_34_TITLE,
  TEST_LEVELS_34,
  TEST_34,
  type Q34,
  gradeOne34,
  isAnswered34,
  answerText34,
  isHumanGraded34,
} from "./testData";

const RING34 =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

type Ans34 = string | number | (string | null)[] | null;

export default function TestArea34({
  onRestart,
  onSubmitted,
}: {
  onRestart: () => void;
  onSubmitted: () => void;
}) {
  const [answers, setAnswers] = useState<Ans34[]>(() => TEST_34.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const total = TEST_34.length;
  const answered = useMemo(() => TEST_34.filter((q, i) => isAnswered34(q, answers[i])).length, [answers]);
  const score = useMemo(
    () => (submitted ? TEST_34.filter((q, i) => gradeOne34(q, answers[i])).length : 0),
    [submitted, answers],
  );

  const setAns = (i: number, v: Ans34) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  };

  const canSubmit = answered === total && !submitted;

  const resetAll = () => {
    setAnswers(TEST_34.map(() => null));
    setSubmitted(false);
    onRestart();
  };

  const band =
    score >= 21
      ? { label: "إتقان — مستوى IQ200", cls: "border-emerald-300 bg-emerald-50 text-emerald-900" }
      : score >= 16
        ? { label: "جيد — مراجعة خفيفة ثم أعد المحاولة", cls: "border-amber-300 bg-amber-50 text-amber-900" }
        : score >= 9
          ? { label: "مراجعة — عُد إلى الخطوات والتمارين", cls: "border-rose-300 bg-rose-50 text-rose-900" }
          : { label: "دعم — أعد قراءة الملخص الذهبي والخريطة", cls: "border-rose-400 bg-rose-50 text-rose-900" };

  return (
    <div className="space-y-4">
      {/* رأس الاختبار */}
      <div className="rounded-3xl border border-teal-200 bg-gradient-to-b from-teal-50/80 via-white to-sky-50/50 p-4 sm:p-6">
        <div className="text-center">
          <h2 className="text-lg font-black text-teal-900">
            <Rich text={TEST_34_TITLE} />
          </h2>
          <p className="mt-1 text-[12px] leading-6 text-teal-800">
            {total} سؤالًا · خمسة مستويات · أجب عن الكل ثم أرسل دفعة واحدة — لا تُكشف الإجابات ولا الدرجة قبل الإرسال.
          </p>
          <div className="mx-auto mt-3 flex max-w-md items-center gap-2" aria-label="تقدم الإجابة">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-teal-100">
              <div
                className="h-full rounded-full bg-teal-600 transition-all"
                style={{ width: `${Math.round((answered / total) * 100)}%` }}
              />
            </div>
            <span className="text-[12px] font-black tabular-nums text-teal-800">أجبت: {answered}/{total}</span>
          </div>
        </div>
      </div>

      {/* لوحة النتيجة — بعد الإرسال فقط */}
      {submitted ? (
        <section role="status" aria-live="polite" className={`rounded-3xl border-2 p-4 ${band.cls}`}>
          <div className="text-center text-[16px] font-black">
            <Rich text={`النتيجة: ${score} / ${total} — ${band.label}`} />
          </div>
          <p className="mt-1 text-center text-[11px] leading-6 opacity-80">
            <Rich text="المستوى الخامس (21–25) كتابة حرّة — راجع مفتاحها الكامل في منطقة المعلم." />
          </p>
        </section>
      ) : null}

      {/* المستويات والأسئلة */}
      {TEST_LEVELS_34.map((lv) => {
        const start = TEST_LEVELS_34.slice(0, TEST_LEVELS_34.indexOf(lv)).reduce((n, l) => n + l.questions.length, 0);
        return (
          <section key={lv.id} className="space-y-3" aria-label={`${lv.n}: ${lv.name}`}>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-[11px] font-black text-white ${lv.cls}`}>{lv.n}</span>
              <span className="text-[12px] font-black text-teal-900">
                <Rich text={lv.name} />
              </span>
              <span className="text-[11px] text-teal-600">
                {lv.range} — <Rich text={lv.blurb} />
              </span>
            </div>
            {lv.questions.map((q, li) => (
              <Question34
                key={li}
                q={q}
                index={start + li}
                value={answers[start + li]}
                onChange={(v) => setAns(start + li, v)}
                submitted={submitted}
                correct={submitted ? gradeOne34(q, answers[start + li]) : null}
              />
            ))}
          </section>
        );
      })}

      {/* أزرار الإرسال */}
      <div className="sticky bottom-3 z-10 flex flex-col items-center gap-2">
        {!submitted ? (
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => {
              setSubmitted(true);
              onSubmitted();
            }}
            className={`${RING34} rounded-full px-8 py-3 text-[15px] font-black shadow-lg transition ${
              canSubmit ? "bg-teal-600 text-white shadow-teal-200 hover:bg-teal-700" : "cursor-not-allowed bg-teal-100 text-teal-400"
            }`}
          >
            إرسال الاختبار
          </button>
        ) : (
          <button
            type="button"
            onClick={resetAll}
            className={`${RING34} rounded-full border-2 border-teal-600 bg-white px-8 py-3 text-[15px] font-black text-teal-800 shadow-lg shadow-teal-100 hover:bg-teal-50`}
          >
            إعادة الاختبار كاملًا
          </button>
        )}
        {!submitted && answered < total ? (
          <div className="text-[11px] text-teal-600">يبقى {total - answered} سؤالًا — زر الإرسال يعمل بعد إكمال الكل.</div>
        ) : null}
      </div>
    </div>
  );
}

function Question34({
  q,
  index,
  value,
  onChange,
  submitted,
  correct,
}: {
  q: Q34;
  index: number;
  value: Ans34;
  onChange: (v: Ans34) => void;
  submitted: boolean;
  correct: boolean | null;
}) {
  return (
    <div data-test-q={index + 1} className="rounded-2xl border border-teal-200 bg-white p-3">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <div className="text-[13px] font-bold leading-6 text-teal-950" dir="auto">
          <span className="ml-1 font-black text-teal-600">س{index + 1}.</span>
          <LatinRuns text={q.ar} />
        </div>
        {correct !== null ? (
          <span
            aria-hidden
            className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black ${
              correct ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-700"
            }`}
          >
            {correct ? "✓ صحيح" : "✕ غير صحيح"}
          </span>
        ) : null}
      </div>

      {q.type === "typed" || q.type === "write" ? (
        <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
          {q.type === "typed" ? (
            <>
              <span className="text-[13px] font-bold text-teal-950">
                <LatinRuns text={q.before} />
              </span>
              <input
                id={`l34-q${index + 1}`}
                type="text"
                value={typeof value === "string" ? value : ""}
                disabled={submitted}
                onChange={(e) => onChange(e.target.value)}
                className={`${RING34} w-44 rounded-lg border-2 px-2 py-1 text-[13px] font-bold text-teal-950 ${
                  correct === null ? "border-teal-300 bg-white" : correct ? "border-emerald-500 bg-emerald-50" : "border-rose-400 bg-rose-50"
                }`}
                aria-label={`السؤال ${index + 1}`}
              />
              <span className="text-[13px] font-bold text-teal-950">
                <LatinRuns text={q.after} />
              </span>
            </>
          ) : (
            <>
              <span className="text-[11px] font-black text-violet-700">
                تلميح: <LatinRuns text={q.hint} />
              </span>
              <input
                id={`l34-q${index + 1}`}
                type="text"
                value={typeof value === "string" ? value : ""}
                disabled={submitted}
                onChange={(e) => onChange(e.target.value)}
                className={`${RING34} w-full rounded-lg border-2 px-2 py-1 text-[13px] font-bold text-teal-950 ${
                  correct === null ? "border-teal-300 bg-white" : correct ? "border-emerald-500 bg-emerald-50" : "border-rose-400 bg-rose-50"
                }`}
                aria-label={`السؤال ${index + 1} — جملتك`}
              />
            </>
          )}
          {q.type === "write" ? (
            <span className="text-[11px] text-stone-500">اكتب جملة كاملة بالإنجليزية.</span>
          ) : null}
        </div>
      ) : null}

      {q.type === "spot" ? (
        <div className="flex flex-wrap gap-1.5" dir="ltr" role="radiogroup" aria-label={`السؤال ${index + 1}`}>
          {q.segments.map((seg, si) => {
            // بعد الإرسال: المقطع الخاطئ يُستبدل بالتصحيح، والمقطع المحذوف يُخفى
            const removed = submitted && (si === q.drop || (si === q.bad && !q.fix));
            const label = submitted && si === q.bad ? q.fix : seg;
            return (
              <button
                key={si}
                type="button"
                data-test-seg={index + 1}
                data-seg-index={si}
                disabled={submitted}
                onClick={() => onChange(si)}
                aria-pressed={value === si}
                className={`${RING34} rounded-lg border-2 px-2 py-1.5 text-[13px] font-bold transition ${
                  removed
                    ? "border-stone-100 bg-white text-transparent line-through"
                    : correct === null
                      ? value === si
                        ? "border-teal-500 bg-teal-100 text-teal-900"
                        : "border-teal-200 bg-white text-teal-900 hover:border-teal-400"
                      : si === q.bad
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : value === si
                          ? "border-rose-400 bg-rose-50 text-rose-700"
                          : "border-teal-100 bg-white text-teal-700"
                }`}
              >
                <LatinRuns text={label} />
              </button>
            );
          })}
        </div>
      ) : null}

      {q.type === "single" ? (
        <div className="grid gap-1.5" role="radiogroup" aria-label={`السؤال ${index + 1}`}>
          {q.options.map((opt, oi) => (
            <label
              key={oi}
              className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-[13px] font-bold transition ${
                correct === null
                  ? value === oi
                    ? "border-teal-500 bg-teal-50 text-teal-900"
                    : "border-teal-200 bg-white text-teal-900 hover:border-teal-400"
                  : oi === q.answer
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : value === oi
                      ? "border-rose-400 bg-rose-50 text-rose-700"
                      : "border-teal-100 bg-white text-teal-700"
              }`}
            >
              <input
                id={`l34-q${index + 1}-opt${oi}`}
                name={`l34-q${index + 1}`}
                type="radio"
                className="h-4 w-4 accent-teal-700"
                checked={value === oi}
                disabled={submitted}
                onChange={() => onChange(oi)}
              />
              <span dir="auto">
                <LatinRuns text={opt} />
              </span>
            </label>
          ))}
        </div>
      ) : null}

      {submitted && isHumanGraded34(q) ? (
        <div className="mt-1 text-[11px] leading-5 text-violet-700">
          <Rich text="سؤال كتابة حرّة — صحّحه معلمك وفق مفتاح مستوى IQ200 في منطقة المعلم." />
        </div>
      ) : null}
    </div>
  );
}

/* ============================================================
   منطقة الحلول — مقفلة حتى الإرسال الكامل (قسم المصدر ㉟)
   ============================================================ */
export function Solutions34({
  unlocked,
  onGoTest,
  onGoTeacher,
}: {
  unlocked: boolean;
  onGoTest: () => void;
  onGoTeacher: () => void;
}) {
  if (!unlocked) {
    return (
      <div className="rounded-3xl border-2 border-teal-300 bg-teal-50 p-8 text-center">
        <div aria-hidden className="text-4xl">
          🔐
        </div>
        <h2 className="mt-2 text-lg font-black text-teal-900">الحلول مقفلة</h2>
        <p className="mx-auto mt-1 max-w-lg text-[13px] leading-7 text-teal-800">
          هذه «مساحة المعلم — عرض الحلول التفصيلية» — مفتاح تصحيح الاختبار النهائي. حاول حل الاختبار كاملًا قبل كشف
          الإجابات: أجب عن الأسئلة الخمسة والعشرين في منطقة الاختبار وأرسلها دفعة واحدة، ثم يُكشف كشف الحلول هنا.
        </p>
        <button
          type="button"
          onClick={onGoTest}
          className={`${RING34} mt-4 rounded-full border-2 border-teal-600 bg-teal-600 px-6 py-2.5 text-[14px] font-black text-white shadow-md shadow-teal-200 hover:bg-teal-700`}
        >
          🧪 الذهاب إلى الاختبار
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
        <h2 className="text-lg font-black text-emerald-900">🗝️ الحلول التفصيلية — مفتاح تصحيح الاختبار النهائي</h2>
        <p className="mt-1 text-[12px] leading-6 text-emerald-800">
          <Rich text="لكل سؤال: الإجابة الصحيحة + السبب القاعدي. راجع أخطاءك ثم أعد الاختبار كاملًا لتثبيت المهارة." />
        </p>
        <p className="mt-1 text-[11px] leading-5 text-emerald-700">
          <Rich text="توثيق: المصدر يعد بـ«عرض الحلول التفصيلية» دون أن يسرد الإجابات نصًا ⇒ المفتاح التالي مشتق وفق قواعد الدرس نفسه، والمستوى الخامس (21–25) كتابة حرّة له إجابات ممكنة متعددة." />
        </p>
      </div>
      {TEST_LEVELS_34.map((lv) => {
        const start = TEST_LEVELS_34.slice(0, TEST_LEVELS_34.indexOf(lv)).reduce((n, l) => n + l.questions.length, 0);
        return (
          <section key={lv.id} className="space-y-2" aria-label={`حلول ${lv.n}: ${lv.name}`}>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-[11px] font-black text-white ${lv.cls}`}>{lv.n}</span>
              <span className="text-[12px] font-black text-emerald-900">
                حلول <Rich text={lv.name} />
              </span>
              <span className="text-[11px] text-emerald-700">{lv.range}</span>
            </div>
            {lv.questions.map((q, li) => (
              <div key={li} className="rounded-2xl border border-emerald-200 bg-white p-3">
                <div className="mb-1 text-[13px] font-bold leading-6 text-emerald-950" dir="auto">
                  <span className="ml-1 font-black text-emerald-700">س{start + li + 1}.</span>
                  <LatinRuns text={q.ar} />
                </div>
                <div className="rounded-lg bg-emerald-50 px-2 py-1.5 text-[13px] font-black text-emerald-900" dir="auto">
                  ✓ الإجابة:{" "}
                  {q.type === "write" ? (
                    <>
                      <LatinRuns text={answerText34(q)} /> (وإجابات ممكنة أخرى — انظر منطقة المعلم)
                    </>
                  ) : (
                    <LatinRuns text={answerText34(q)} />
                  )}
                </div>
                <div className="mt-1 text-[12px] leading-6 text-emerald-900">
                  <span className="font-black">
                    <En>Platform Explanation</En> — السبب:{" "}
                  </span>
                  <Rich text={q.why} />
                </div>
              </div>
            ))}
          </section>
        );
      })}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={onGoTest}
          className={`${RING34} rounded-full border-2 border-teal-600 bg-white px-5 py-2 text-[13px] font-black text-teal-800 hover:bg-teal-50`}
        >
          🧪 إعادة الاختبار كاملًا
        </button>
        <button
          type="button"
          onClick={onGoTeacher}
          className={`${RING34} rounded-full border-2 border-violet-500 bg-white px-5 py-2 text-[13px] font-black text-violet-800 hover:bg-violet-50`}
        >
          👩‍🏫 منطقة المعلم
        </button>
      </div>
    </div>
  );
}
