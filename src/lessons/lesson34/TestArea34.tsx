// ============================================================
// TestArea34 — الاختبار النهائي (25 سؤالًا / 5 مستويات)
//   • محايد تمامًا قبل الإرسال: لا ✓ ولا ✕ ولا درجة ولا شرح.
//   • الإرسال لا يعمل إلا بعد الإجابة عن الأسئلة الخمسة والعشرين.
//   • بعد الإرسال: درجة + نطاق + سبب كل سؤال.
//
// Solutions34 — منطقة الحلول المقفلة حتى الإرسال الكامل، وتعرض
// المفتاح التفصيلي المشتق (25 سؤالًا: إجابة + سبب + بنية + نماذج).
// ============================================================

import { useMemo, useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { FOCUS34 } from "./kit34";
import {
  TEST_34,
  TEST_34_TITLE,
  TEST_LEVELS_34,
  gradeOne34,
  isAnswered34,
  answerText34,
  isHumanGraded34,
  type Q34,
} from "./testData";
import DetailedSolutions34 from "./DetailedSolutions34";
import { DETAILED_TEST_SOLUTIONS_34 } from "./solutionsData34";

type Answer34 = string | number | null;

export default function TestArea34({
  onRestart,
  onSubmitted,
}: {
  onRestart: () => void;
  onSubmitted: () => void;
}) {
  const [answers, setAnswers] = useState<Answer34[]>(() => TEST_34.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const total = TEST_34.length;
  const answered = useMemo(() => TEST_34.filter((q, i) => isAnswered34(q, answers[i])).length, [answers]);
  const score = useMemo(
    () => (submitted ? TEST_34.filter((q, i) => gradeOne34(q, answers[i])).length : 0),
    [submitted, answers],
  );

  const setAnswer = (i: number, value: Answer34) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  };

  const reset = () => {
    setAnswers(TEST_34.map(() => null));
    setSubmitted(false);
    onRestart();
  };

  const band =
    score >= 21
      ? { key: "high", label: "إتقان — مستوى IQ200" }
      : score >= 16
        ? { key: "mid", label: "جيد — مراجعة خفيفة ثم أعد المحاولة" }
        : {
            key: "low",
            label: score >= 9 ? "مراجعة — عُد إلى الخطوات والتمارين" : "دعم — أعد قراءة الملخص الذهبي وخريطة الطريق",
          };

  return (
    <div className="l34-test" data-test-area="34">
      <header className="l34-testhero">
        <span className="l34-eyebrow">
          <span aria-hidden>🏆</span>
          <Rich text="MASTER TEST · خمسة مستويات" />
        </span>
        <h2>
          <Rich text={TEST_34_TITLE} />
        </h2>
        <p>
          <Rich text={`${total} سؤالًا: بناء، إكمال، تحديد وظيفة، تصحيح أخطاء، ثم إنتاج حرّ. أجب عن الكل ثم أرسل مرة واحدة — لا تظهر أي إجابة قبل الإرسال.`} />
        </p>
        <div className="l34-testprogress" aria-label="تقدم الإجابة">
          <div role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={answered}>
            <span style={{ width: `${Math.round((answered / total) * 100)}%` }} />
          </div>
          <b>
            <Rich text={`أجبت: ${answered}/${total}`} />
          </b>
        </div>
      </header>

      {submitted ? (
        <section role="status" aria-live="polite" className={`l34-result l34-result--${band.key}`} data-band={band.key}>
          <div className="text-[17px] font-black">
            <Rich text={`النتيجة: ${score} / ${total} — ${band.label}`} />
          </div>
          <p className="mt-1 text-[12px] font-bold leading-6 opacity-80">
            <Rich text="المستوى الخامس كتابة حرّة — قارن نموذجك بالبدائل المقبولة في منطقة الحلول، وراجع السبب والبنية لكل سؤال." />
          </p>
        </section>
      ) : null}

      {TEST_LEVELS_34.map((level, levelIndex) => {
        const start = TEST_LEVELS_34.slice(0, levelIndex).reduce((n, item) => n + item.questions.length, 0);
        return (
          <section key={level.id} className="l34-level" data-level={level.id} aria-label={`${level.n}: ${level.name}`}>
            <div className="l34-level__head">
              <span className="l34-level__badge">{level.n}</span>
              <span className="l34-level__name">
                <Rich text={level.name} />
              </span>
              <span className="l34-level__range">{level.range}</span>
            </div>
            {level.questions.map((q, localIndex) => {
              const index = start + localIndex;
              return (
                <Question34
                  key={level.id + localIndex}
                  q={q}
                  index={index}
                  value={answers[index]}
                  onChange={(value) => setAnswer(index, value)}
                  submitted={submitted}
                  correct={submitted ? gradeOne34(q, answers[index]) : null}
                />
              );
            })}
          </section>
        );
      })}

      <div className="l34-submit-panel">
        {!submitted ? (
          <button
            type="button"
            disabled={answered !== total}
            onClick={() => {
              setSubmitted(true);
              onSubmitted();
            }}
            className={`l34-submit ${FOCUS34}`}
          >
            <span aria-hidden>🚀</span>
            <Rich text="إرسال الاختبار" />
          </button>
        ) : (
          <button type="button" onClick={reset} className={`l34-submit ${FOCUS34}`}>
            <span aria-hidden>↺</span>
            <Rich text="إعادة الاختبار كاملًا" />
          </button>
        )}
        {!submitted && answered < total ? (
          <div className="text-[12px] font-bold text-violet-500">
            <Rich text={`يبقى ${total - answered} سؤالًا — زر الإرسال يعمل بعد إكمال الكل.`} />
          </div>
        ) : null}
        {!submitted && answered === total ? (
          <div className="text-[12px] font-black text-emerald-700">
            <Rich text="اكتملت الإجابات — أرسل الآن لكشف الدرجة والشرح." />
          </div>
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
  value: Answer34;
  onChange: (value: Answer34) => void;
  submitted: boolean;
  correct: boolean | null;
}) {
  return (
    <div className="l34-question" data-test-q={index + 1} data-question-kind={q.type}>
      <div className="l34-question__head">
        <div className="l34-question__prompt" dir="auto">
          <span className="l34-question__num">س{index + 1}.</span>
          <LatinRuns text={q.ar} />
        </div>
        {correct !== null ? (
          <span className="l34-question__status" data-ok={correct ? "true" : "false"}>
            {correct ? "✓ صحيح" : "✕ غير صحيح"}
          </span>
        ) : null}
      </div>

      {q.type === "typed" ? (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5" dir="ltr">
          <span className="text-[13px] font-bold text-violet-950">
            <LatinRuns text={q.before} />
          </span>
          <input
            id={`l34-q${index + 1}`}
            type="text"
            dir="ltr"
            value={typeof value === "string" ? value : ""}
            disabled={submitted}
            onChange={(event) => onChange(event.target.value)}
            placeholder={q.verb}
            data-state={correct === null ? undefined : correct ? "correct" : "wrong"}
            className="l34-answer-input w-44"
            aria-label={`السؤال ${index + 1}`}
          />
          <span className="text-[13px] font-bold text-violet-950">
            <LatinRuns text={q.after} />
          </span>
        </div>
      ) : null}

      {q.type === "write" ? (
        <div className="mt-1.5 grid gap-1" dir="ltr">
          <span className="text-[11px] font-black text-fuchsia-700">
            <Rich text="تلميح:" /> <LatinRuns text={q.hint} />
          </span>
          <input
            id={`l34-q${index + 1}`}
            type="text"
            dir="ltr"
            value={typeof value === "string" ? value : ""}
            disabled={submitted}
            onChange={(event) => onChange(event.target.value)}
            data-state={correct === null ? undefined : correct ? "correct" : "wrong"}
            className="l34-answer-input w-full"
            aria-label={`السؤال ${index + 1} — اكتب جملتك`}
          />
        </div>
      ) : null}

      {q.type === "spot" ? (
        <div className="mt-1.5 flex flex-wrap gap-1.5" dir="ltr" role="radiogroup" aria-label={`السؤال ${index + 1}`}>
          {q.segments.map((segment, segmentIndex) => {
            const isBad = segmentIndex === q.bad;
            const isDrop = segmentIndex === q.drop;
            return (
              <button
                key={segmentIndex}
                type="button"
                data-test-seg={index + 1}
                data-seg-index={segmentIndex}
                disabled={submitted}
                onClick={() => onChange(segmentIndex)}
                aria-pressed={value === segmentIndex}
                data-picked={value === segmentIndex ? "true" : undefined}
                data-state={correct === null ? undefined : isBad ? "correct" : value === segmentIndex ? "wrong" : undefined}
                className="l34-seg"
                style={submitted && (isDrop || (isBad && !q.fix)) ? { opacity: 0.28, textDecoration: "line-through" } : undefined}
              >
                <LatinRuns text={segment} />
              </button>
            );
          })}
        </div>
      ) : null}

      {q.type === "single" ? (
        <div className="mt-1.5 grid gap-1.5" role="radiogroup" aria-label={`السؤال ${index + 1}`}>
          {q.options.map((option, optionIndex) => (
            <label
              key={optionIndex}
              dir="ltr"
              className="l34-choice"
              data-picked={value === optionIndex ? "true" : undefined}
              data-state={correct === null ? undefined : optionIndex === q.answer ? "correct" : value === optionIndex ? "wrong" : undefined}
            >
              <input
                id={`l34-q${index + 1}-opt${optionIndex}`}
                name={`l34-q${index + 1}`}
                type="radio"
                checked={value === optionIndex}
                disabled={submitted}
                onChange={() => onChange(optionIndex)}
              />
              <span dir="ltr">
                <LatinRuns text={option} />
              </span>
            </label>
          ))}
        </div>
      ) : null}

      {submitted ? (
        <div className="l34-sol-row mt-1" data-q-feedback={index + 1}>
          <b>
            <Rich text="الصواب:" />
          </b>{" "}
          <LatinRuns text={answerText34(q)} />{" "}
          <span className="text-violet-500">
            — <Rich text={q.why} />
          </span>
        </div>
      ) : null}

      {submitted && isHumanGraded34(q) ? (
        <div className="mt-1 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-bold leading-5 text-amber-800">
          <Rich text="سؤال كتابة حرّة — راجع نموذج الإجابة والبدائل المقبولة في منطقة الحلول؛ يصحّحه المعلم وفق وظيفة الجملة لا وفق التشابه الحرفي." />
        </div>
      ) : null}
    </div>
  );
}

/* ============================================================
   Solutions34 — مقفلة قبل الإرسال، تفصيلية بعده
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
      <div className="l34-locked" data-locked-solutions="34">
        <span className="l34-locked__icon" aria-hidden>
          🔐
        </span>
        <h2>
          <Rich text="الحلول مقفلة" />
        </h2>
        <p>
          <Rich text="هذه مساحة «الحلول التفصيلية» للاختبار النهائي. أجب عن الأسئلة الخمسة والعشرين كاملة في منطقة الاختبار وأرسلها، ثم يُكشف المفتاح هنا: الإجابة + السبب + البنية." />
        </p>
        <p className="mt-1 text-[11px] font-bold text-violet-400">
          <Rich text="لن تظهر أي إجابة قبل الإرسال — هذا شرط الدرس وشرط التدقيق." />
        </p>
        <button type="button" onClick={onGoTest} className={`l34-submit mt-3 ${FOCUS34}`}>
          <span aria-hidden>🧪</span>
          <Rich text="الذهاب إلى الاختبار" />
        </button>
      </div>
    );
  }

  return (
    <div data-unlocked-solutions="34">
      <header className="l34-testhero">
        <span className="l34-eyebrow">
          <span aria-hidden>🗝️</span>
          <Rich text="SOLUTION BAY · عرض الحلول التفصيلية" />
        </span>
        <h2>
          <Rich text="الحلول التفصيلية — 25 سؤالًا" />
        </h2>
        <p>
          <Rich text="لكل سؤال: الإجابة الصحيحة، السبب، والبنية النحوية. أسئلة المستوى الخامس لها نموذج وبدائل مقبولة. المفتاح مشتق وفق قواعد الدرس نفسه، لأن المصدر يعِد بعرض الحلول دون سردها نصًا." />
        </p>
        <p className="mt-1 text-[11px] font-bold text-violet-500">
          <Rich text="البدائل مقبولة عندما تحقق الوظيفة المطلوبة والبناء نفسه — لا تشترط تطابقًا حرفيًا مع النموذج." />
        </p>
      </header>

      <DetailedSolutions34 />

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={onGoTest} className={`l34-back ${FOCUS34}`}>
          <span aria-hidden>🧪</span>
          <Rich text="إعادة الاختبار كاملًا" />
        </button>
        <button type="button" onClick={onGoTeacher} className={`l34-back ${FOCUS34}`}>
          👩‍🏫 <Rich text="منطقة المعلم" />
        </button>
      </div>
      <p className="mt-2 text-center text-[11px] font-bold text-violet-400">
        <Rich text={`عدد الحلول المعروضة: ${DETAILED_TEST_SOLUTIONS_34.length} / ${TEST_34.length}`} />
      </p>
    </div>
  );
}
