// ============================================================
// TestArea33 — منطقة اختبار الدرس 33 + منطقة الحلول
// - الاختبار (TEST_33 من المصدر ⑳): 25 سؤالًا في 5 مستويات،
//   محايد حتى «إرسال الاختبار» — لا ✓ ولا درجة ولا تلميح ألوان قبلها.
// - الحلول (قسم المصدر ㉑): مقفلة حتى الإرسال الكامل، ثم تُعرض
//   «الحلول التفصيلية» مجموعاتٍ من خمسة أسئلة.
// ============================================================

import { useMemo, useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import {
  TEST_33_TITLE,
  TEST_LEVELS_33,
  TEST_33,
  type Q33,
  gradeOne33,
  isAnswered33,
  answerText33,
} from "./testData";

const RING33 =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

type Ans33 = string | number | (string | null)[] | null;

function levelOf33(index: number) {
  let acc = 0;
  for (const lv of TEST_LEVELS_33) {
    if (index < acc + lv.questions.length) return { lv, local: index - acc };
    acc += lv.questions.length;
  }
  return { lv: TEST_LEVELS_33[TEST_LEVELS_33.length - 1], local: 0 };
}

export default function TestArea33({ onRestart, onSubmitted }: { onRestart: () => void; onSubmitted: () => void }) {
  const [answers, setAnswers] = useState<Ans33[]>(() => TEST_33.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const total = TEST_33.length;
  const answered = useMemo(() => TEST_33.filter((q, i) => isAnswered33(q, answers[i])).length, [answers]);
  const score = useMemo(() => (submitted ? TEST_33.filter((q, i) => gradeOne33(q, answers[i])).length : 0), [submitted, answers]);

  const setAns = (i: number, v: Ans33) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  };

  const canSubmit = answered === total && !submitted;

  const resetAll = () => {
    setAnswers(TEST_33.map(() => null));
    setSubmitted(false);
    onRestart();
  };

  const band =
    score >= 21
      ? { label: "إتقان — مستوى IQ200", cls: "border-emerald-300 bg-emerald-50 text-emerald-900" }
      : score >= 16
        ? { label: "جيد — مراجعة خفيفة ثم أعد المحاولة", cls: "border-amber-300 bg-amber-50 text-amber-900" }
        : score >= 9
          ? { label: "مراجعة — عُد إلى المواجهات الثلاث والتدريبين", cls: "border-rose-300 bg-rose-50 text-rose-900" }
          : { label: "دعم — أعد قراءة الخريطة الذهبية والجدول الشامل", cls: "border-rose-400 bg-rose-50 text-rose-900" };

  return (
    <div className="space-y-4">
      {/* رأس الاختبار */}
      <div className="rounded-3xl border border-amber-200 bg-gradient-to-b from-amber-50/80 via-white to-rose-50/50 p-4 sm:p-6">
        <div className="text-center">
          <h2 className="text-lg font-black text-amber-900">{TEST_33_TITLE}</h2>
          <p className="mt-1 text-[12px] leading-6 text-amber-800">
            {total} سؤالًا · خمسة مستويات · أجب عن الكل ثم أرسل دفعة واحدة — لا تُكشف الإجابات ولا الدرجة قبل الإرسال.
          </p>
          <div className="mx-auto mt-3 flex max-w-md items-center gap-2" aria-label="تقدم الإجابة">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-amber-100">
              <div className="h-full rounded-full bg-gradient-to-l from-amber-600 to-rose-500 transition-all" style={{ width: `${Math.round((answered / total) * 100)}%` }} />
            </div>
            <span className="text-[12px] font-black tabular-nums text-amber-800">أجبت: {answered}/{total}</span>
          </div>
        </div>
      </div>

      {/* لوحة النتيجة — بعد الإرسال فقط */}
      {submitted ? (
        <section role="status" aria-live="polite" className={`rounded-3xl border-2 p-4 ${band.cls}`}>
          <div className="text-center text-[16px] font-black">
            <Rich text={`النتيجة: ${score} / ${total} — ${band.label}`} />
          </div>
        </section>
      ) : null}

      {/* المستويات والأسئلة */}
      {TEST_LEVELS_33.map((lv) => {
        const start = TEST_LEVELS_33.slice(0, TEST_LEVELS_33.indexOf(lv)).reduce((n, l) => n + l.questions.length, 0);
        return (
          <section key={lv.id} className="space-y-3" aria-label={`${lv.n}: ${lv.name}`}>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-[11px] font-black text-white ${lv.cls}`}>{lv.n}</span>
              <span className="text-[12px] font-black text-amber-900">{lv.name}</span>
              <span className="text-[11px] text-amber-600">{lv.range} — {lv.blurb}</span>
            </div>
            {lv.questions.map((q, li) => (
              <Question33
                key={li}
                q={q}
                index={start + li}
                value={answers[start + li]}
                onChange={(v) => setAns(start + li, v)}
                submitted={submitted}
                correct={submitted ? gradeOne33(q, answers[start + li]) : null}
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
            className={`${RING33} rounded-full px-8 py-3 text-[15px] font-black shadow-lg transition ${
              canSubmit ? "bg-amber-600 text-white shadow-amber-200 hover:bg-amber-700" : "cursor-not-allowed bg-amber-100 text-amber-400"
            }`}
          >
            إرسال الاختبار
          </button>
        ) : (
          <button
            type="button"
            onClick={resetAll}
            className={`${RING33} rounded-full border-2 border-amber-600 bg-white px-8 py-3 text-[15px] font-black text-amber-800 shadow-lg shadow-amber-100 hover:bg-amber-50`}
          >
            إعادة الاختبار كاملًا
          </button>
        )}
        {!submitted && answered < total ? (
          <div className="text-[11px] text-amber-600">يبقى {total - answered} سؤالًا — زر الإرسال يعمل بعد إكمال الكل.</div>
        ) : null}
      </div>
    </div>
  );
}

function Question33({
  q,
  index,
  value,
  onChange,
  submitted,
  correct,
}: {
  q: Q33;
  index: number;
  value: Ans33;
  onChange: (v: Ans33) => void;
  submitted: boolean;
  correct: boolean | null;
}) {
  return (
    <div data-test-q={index + 1} className="rounded-2xl border border-amber-200 bg-white p-3">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <div className="text-[13px] font-bold leading-6 text-amber-950" dir="auto">
          <span className="ml-1 font-black text-amber-600">س{index + 1}.</span>
          <LatinRuns text={q.ar} />
        </div>
        {correct !== null ? (
          <span aria-hidden className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black ${correct ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-700"}`}>
            {correct ? "✓ صحيح" : "✕ غير صحيح"}
          </span>
        ) : null}
      </div>

      {q.type === "typed" ? (
        <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
          <span className="text-[13px] font-bold text-amber-950">
            <LatinRuns text={q.before} />
          </span>
          <input
            id={`l33-q${index + 1}`}
            type="text"
            value={typeof value === "string" ? value : ""}
            disabled={submitted}
            onChange={(e) => onChange(e.target.value)}
            className={`${RING33} w-44 rounded-lg border-2 px-2 py-1 text-[13px] font-bold text-amber-950 ${
              correct === null ? "border-amber-300 bg-white" : correct ? "border-emerald-500 bg-emerald-50" : "border-rose-400 bg-rose-50"
            }`}
            aria-label={`السؤال ${index + 1}`}
          />
          <span className="text-[13px] font-bold text-amber-950">
            <LatinRuns text={q.after} />
          </span>
        </div>
      ) : null}

      {q.type === "spot" ? (
        <div className="flex flex-wrap gap-1.5" dir="ltr" role="radiogroup" aria-label={`السؤال ${index + 1}`}>
          {q.segments.map((seg, si) => (
            <button
              key={si}
              type="button"
              data-test-seg={index + 1}
              data-seg-index={si}
              disabled={submitted}
              onClick={() => onChange(si)}
              aria-pressed={value === si}
              className={`${RING33} rounded-lg border-2 px-2 py-1.5 text-[13px] font-bold transition ${
                correct === null
                  ? value === si
                    ? "border-amber-500 bg-amber-100 text-amber-900"
                    : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"
                  : si === q.bad
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : value === si
                      ? "border-rose-400 bg-rose-50 text-rose-700"
                      : "border-amber-100 bg-white text-amber-700"
              }`}
            >
              <LatinRuns text={submitted && si === q.bad ? q.fix : seg} />
            </button>
          ))}
        </div>
      ) : null}

      {q.type === "match" ? (
        <MatchQ33 q={q} index={index} value={Array.isArray(value) ? value : null} onChange={onChange} submitted={submitted} correct={correct} />
      ) : null}

      {q.type === "single" ? (
        <div className="grid gap-1.5" role="radiogroup" aria-label={`السؤال ${index + 1}`}>
          {q.options.map((opt, oi) => (
            <label
              key={oi}
              className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-[13px] font-bold transition ${
                correct === null
                  ? value === oi
                    ? "border-amber-500 bg-amber-50 text-amber-900"
                    : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"
                  : oi === q.answer
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : value === oi
                      ? "border-rose-400 bg-rose-50 text-rose-700"
                      : "border-amber-100 bg-white text-amber-700"
              }`}
            >
              <input
                id={`l33-q${index + 1}-opt${oi}`}
                name={`l33-q${index + 1}`}
                type="radio"
                className="h-4 w-4 accent-amber-700"
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
    </div>
  );
}

/* سؤال التوصيل (match): كل زوج له قائمة اختيار؛ الخيارات معروضة بترتيب معكوس ثابت */
function MatchQ33({
  q,
  index,
  value,
  onChange,
  submitted,
  correct,
}: {
  q: Extract<Q33, { type: "match" }>;
  index: number;
  value: (string | null)[] | null;
  onChange: (v: (string | null)[]) => void;
  submitted: boolean;
  correct: boolean | null;
}) {
  const shown = useMemo(() => [...q.pairs].map((p) => p.right).reverse(), [q.pairs]);
  const vals = value ?? q.pairs.map(() => null);
  return (
    <div className="space-y-2">
      {q.pairs.map((p, pi) => {
        const v = vals[pi];
        const rightNow = submitted && v === p.right;
        const wrongNow = submitted && v !== p.right;
        return (
          <div key={pi} className="flex flex-wrap items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/40 px-2 py-1.5">
            <span className="rounded-lg bg-white px-2 py-1 text-[13px] font-black text-amber-900" dir="ltr">
              ({p.left})
            </span>
            <span aria-hidden className="text-amber-400">←</span>
            <select
              value={v ?? ""}
              disabled={submitted}
              onChange={(e) => {
                const next = [...vals];
                next[pi] = e.target.value || null;
                onChange(next);
              }}
              aria-label={`السؤال ${index + 1} — التوصيلة ${pi + 1}`}
              className={`${RING33} rounded-lg border-2 px-2 py-1.5 text-[13px] font-bold text-amber-950 ${
                rightNow ? "border-emerald-500 bg-emerald-50" : wrongNow ? "border-rose-400 bg-rose-50" : "border-amber-300 bg-white"
              }`}
              dir="ltr"
            >
              <option value="">اختر الصيغة…</option>
              {shown.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {submitted && wrongNow ? (
              <span className="text-[12px] font-black text-emerald-800" dir="ltr">
                ✓ {p.right}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   منطقة الحلول — مقفلة حتى الإرسال الكامل (قسم المصدر ㉑)
   ============================================================ */
export function Solutions33({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest: () => void; onGoTeacher: () => void }) {
  if (!unlocked) {
    return (
      <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-8 text-center">
        <div aria-hidden className="text-4xl">🔐</div>
        <h2 className="mt-2 text-lg font-black text-amber-900">الحلول مقفلة</h2>
        <p className="mx-auto mt-1 max-w-lg text-[13px] leading-7 text-amber-800">
          هذه «مساحة الحلول التفصيلية» — مفتاح تصحيح الاختبار النهائي. حاول حل الاختبار كاملًا قبل كشف الإجابات:
          أجب عن الأسئلة الخمسة والعشرين في منطقة الاختبار وأرسلها دفعة واحدة، ثم يُكشف «كشف الحلول التفصيلية» هنا.
        </p>
        <button
          type="button"
          onClick={onGoTest}
          className={`${RING33} mt-4 rounded-full border-2 border-amber-600 bg-amber-600 px-6 py-2.5 text-[14px] font-black text-white shadow-md shadow-amber-200 hover:bg-amber-700`}
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
          <Rich text="توثيق: المصدر يعد بـ«مفتاح تصحيح» دون أن يسرد الإجابات نصًا ← الحلول التالية مشتقة وفق قواعد الدرس نفسه (خاصة ⑮ الذي يجيز التام بجانب التام المستمر بعد for/since)." />
        </p>
      </div>
      {TEST_LEVELS_33.map((lv) => {
        const start = TEST_LEVELS_33.slice(0, TEST_LEVELS_33.indexOf(lv)).reduce((n, l) => n + l.questions.length, 0);
        return (
          <section key={lv.id} className="space-y-2" aria-label={`حلول ${lv.n}: ${lv.name}`}>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-[11px] font-black text-white ${lv.cls}`}>{lv.n}</span>
              <span className="text-[12px] font-black text-emerald-900">حلول {lv.name}</span>
              <span className="text-[11px] text-emerald-700">{lv.range}</span>
            </div>
            {lv.questions.map((q, li) => (
              <div key={li} className="rounded-2xl border border-emerald-200 bg-white p-3">
                <div className="mb-1 text-[13px] font-bold leading-6 text-emerald-950" dir="auto">
                  <span className="ml-1 font-black text-emerald-700">س{start + li + 1}.</span>
                  <LatinRuns text={q.ar} />
                </div>
                <div className="rounded-lg bg-emerald-50 px-2 py-1.5 text-[13px] font-black text-emerald-900" dir="auto">
                  ✓ الإجابة: <LatinRuns text={answerText33(q)} />
                </div>
                <div className="mt-1 text-[12px] leading-6 text-emerald-900">
                  <span className="font-black">Platform Explanation — السبب: </span>
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
          className={`${RING33} rounded-full border-2 border-amber-600 bg-white px-5 py-2 text-[13px] font-black text-amber-800 hover:bg-amber-50`}
        >
          🧪 إعادة الاختبار كاملًا
        </button>
        <button
          type="button"
          onClick={onGoTeacher}
          className={`${RING33} rounded-full border-2 border-violet-500 bg-white px-5 py-2 text-[13px] font-black text-violet-800 hover:bg-violet-50`}
        >
          👩‍🏫 منطقة المعلم
        </button>
      </div>
    </div>
  );
}
