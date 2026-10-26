import { useMemo, useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import {
  TEST_COUNT_39,
  TEST_INTRO_39,
  TEST_LEVELS_39,
  type TestQuestion39,
} from "./testData39";
import { ActionButton39, Feedback39, FOCUS_39 } from "./kit39";
import type { Grade39 } from "./testKey39";

// ============================================================
// منطقة الاختبار — 25 سؤالًا على خمسة مستويات.
// قواعد صارمة:
//   • ملف المفتاح (testKey39) لا يُستورد إلا داخل معالج التسليم (import ديناميكي).
//   • لا تظهر علامة صحة/خطأ ولا درجة ولا تفسير قبل التسليم.
//   • زر التسليم معطّل حتى تُجاب الأسئلة الـ25، ومحمي من النقر المتكرر.
// ============================================================

const LEVEL_TITLES_39 = [
  { level: 1 as const, en: "GRAMMAR FOUNDATIONS", ar: "المستوى الأول: اختر الإجابة الصحيحة", range: "1–5" },
  { level: 2 as const, en: "SENTENCE CONSTRUCTION", ar: "المستوى الثاني: أكمل الجمل", range: "6–10" },
  { level: 3 as const, en: "ERROR DETECTION", ar: "المستوى الثالث: صحح الأخطاء", range: "11–15" },
  { level: 4 as const, en: "MEANING & CONTRAST", ar: "المستوى الرابع: فهم المعنى", range: "16–20" },
  { level: 5 as const, en: "IQ200 FINAL CHALLENGE", ar: "المستوى الخامس: Final IQ200 Boss", range: "21–25" },
];

const FIELD_LABEL_39: Record<string, string> = {
  "multiple-choice": "اختر إجابة واحدة",
  fill: "اكتب الصيغة الكاملة",
  repair: "اكتب الجملة المصححة",
  explain: "اشرح الفرق بلغتك",
  open: "اكتب جوابك ومثالك",
};

function answerKeyOf(question: TestQuestion39) {
  return `q${question.n}`;
}

export default function TestArea39({
  onSubmitted,
  onGoSolutions,
}: {
  onSubmitted: () => void;
  onGoSolutions: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [grading, setGrading] = useState(false);
  const [grade, setGrade] = useState<Grade39 | null>(null);
  const [error, setError] = useState("");
  const [level, setLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [cursor, setCursor] = useState(0);

  const answered = useMemo(
    () => Object.values(answers).filter((value) => value.trim().length > 0).length,
    [answers],
  );
  const ready = answered === TEST_COUNT_39;
  const levelQuestions = useMemo(
    () => TEST_LEVELS_39.find((item) => item.id === `level-${level}`)?.questions ?? [],
    [level],
  );
  const question = levelQuestions[Math.min(cursor, levelQuestions.length - 1)];

  const update = (n: number, value: string) => {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [n]: value }));
  };

  const submit = async () => {
    if (!ready || submitted || grading) return;
    setGrading(true);
    setError("");
    try {
      const { gradeTest39 } = await import("./testKey39");
      setGrade(gradeTest39(answers));
      setSubmitted(true);
      onSubmitted();
    } catch {
      setError("تعذّر تحميل التصحيح. حاول الإرسال مرة أخرى.");
    } finally {
      setGrading(false);
    }
  };

  const reset = () => {
    if (!submitted) {
      setAnswers({});
      setCursor(0);
      setLevel(1);
    }
  };

  const resultOf = (n: number) => grade?.results.find((result) => result.n === n);

  return (
    <div data-area="lesson39-test" className="obs-test-shell space-y-3">
      <section className="obs-panel">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="obs-eyebrow">
            <En>FINAL ORBIT · 25 QUESTIONS</En>
          </p>
          <span dir="ltr" className="obs-pill font-en">
            {TEST_COUNT_39} Q · 5 LEVELS
          </span>
        </div>
        <h2 className="obs-panel-title">
          <Rich text="Future Perfect Continuous Master Test" />
        </h2>
        <div className="mt-2 space-y-1">
          {TEST_INTRO_39.map((unit) => (
            <p key={unit.sourceUnitIndex} className="obs-nuance">
              <Rich text={unit.text} />
            </p>
          ))}
        </div>
        <div className="obs-meter mt-3" aria-label="الأسئلة المجابة">
          <div className="obs-meter-track">
            <div
              className="obs-meter-fill"
              style={{ width: `${Math.round((answered / TEST_COUNT_39) * 100)}%` }}
            />
          </div>
          <span dir="ltr" className="obs-meter-value font-en" aria-live="polite">
            {answered}/{TEST_COUNT_39}
          </span>
        </div>
        <p className="obs-nuance mt-2">
          لا تظهر الدرجة ولا التصحيح ولا التفسيرات في هذه المنطقة قبل التسليم النهائي. يمكنك التنقل بين الأسئلة
          والمستويات، وتبقى إجاباتك محفوظة أثناء بقائك في الدرس.
        </p>
      </section>

      {submitted && grade ? (
        <section className="obs-panel" role="status" aria-live="polite" data-test-result="true">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="obs-panel-title">تم تسليم الاختبار</h2>
            <span dir="ltr" className="obs-pill font-en">
              {grade.correct} / {grade.total}
            </span>
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            <div className="obs-pill-card">
              إجابات مطابقة: <strong dir="ltr">{grade.correct}</strong>
            </div>
            <div className="obs-pill-card">
              تحتاج مراجعة بشرية: <strong dir="ltr">{grade.review}</strong>
            </div>
            <div className="obs-pill-card">
              إجابات غير مطابقة: <strong dir="ltr">{grade.total - grade.correct - grade.review}</strong>
            </div>
          </div>
          <p className="obs-nuance mt-2">
            الأسئلة المفتوحة (المستوى الرابع) تُقيَّم بشريًا؛ النتيجة الرقمية أعلاه ليست درجة نهائية، بل عدد الإجابات
            المطابقة للنموذج. افتح منطقة الحلول لكل تفسير.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <ActionButton39 onClick={onGoSolutions}>منطقة الحلول التفصيلية</ActionButton39>
          </div>
        </section>
      ) : null}

      <nav className="obs-test-tabs" aria-label="مستويات الاختبار">
        {LEVEL_TITLES_39.map((item) => {
          const levelAnswered = TEST_LEVELS_39.find((entry) => entry.id === `level-${item.level}`)?.questions.filter(
            (entry) => (answers[entry.n] ?? "").trim().length > 0,
          ).length ?? 0;
          return (
            <button
              key={item.level}
              type="button"
              aria-pressed={level === item.level}
              onClick={() => {
                setLevel(item.level);
                setCursor(0);
              }}
              className={`obs-test-tab ${level === item.level ? "is-active" : ""}`}
            >
              <span className="obs-test-tab-en font-en" dir="ltr">
                {item.en}
              </span>
              <span className="obs-test-tab-ar">
                <Rich text={item.ar} />
              </span>
              <span dir="ltr" className="obs-test-tab-count font-en">
                {levelAnswered}/5 · {item.range}
              </span>
            </button>
          );
        })}
      </nav>

      {question ? (
        <section className="obs-instrument obs-tone--gold" data-test-question={question.n}>
          <header className="obs-instrument-head">
            <span className="obs-instrument-dot" aria-hidden />
            <div className="min-w-0">
              <p dir="ltr" className="obs-instrument-en font-en">
                QUESTION {String(question.n).padStart(2, "0")} · LEVEL {level}
              </p>
              <h3 className="obs-instrument-title">السؤال {question.n} من {TEST_COUNT_39}</h3>
            </div>
            <span dir="ltr" className="obs-instrument-id font-en">
              {cursor + 1} / {levelQuestions.length}
            </span>
          </header>
          <div className="obs-instrument-body">
            <div className="obs-card">
              {question.promptLines.map((line, index) => {
                const pureEnglish = /[A-Za-z]/.test(line) && !/[\u0600-\u06FF]/.test(line);
                return pureEnglish ? (
                  <p key={`${line}-${index}`} dir="ltr" className="obs-readout-en font-en">
                    {line}
                  </p>
                ) : (
                  <p key={`${line}-${index}`} className="obs-readout-ar">
                    <Rich text={line} />
                  </p>
                );
              })}
            </div>

            {question.type === "multiple-choice" && question.options ? (
              <div className="grid gap-1.5 sm:grid-cols-3" role="group" aria-label={`خيارات السؤال ${question.n}`}>
                {question.options.map((option) => {
                  const letter = option.text.slice(0, 1);
                  const selected = (answers[question.n] ?? "").trim().startsWith(letter);
                  return (
                    <label key={option.text} className={`obs-choice ${selected ? "is-active" : ""}`}>
                      <input
                        type="radio"
                        name={`test-${question.n}`}
                        value={option.text}
                        checked={selected}
                        disabled={submitted}
                        onChange={() => update(question.n, option.text)}
                        className={`${FOCUS_39} mt-1 h-4 w-4 accent-[#f3c979]`}
                      />
                      <span dir="ltr" className="font-en min-w-0">
                        {option.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <label className="obs-field">
                <span>{question.fieldLabel ?? FIELD_LABEL_39[question.type] ?? "إجابتك"}</span>
                <textarea
                  dir="ltr"
                  value={answers[question.n] ?? ""}
                  onChange={(event) => update(question.n, event.currentTarget.value)}
                  disabled={submitted}
                  rows={question.type === "explain" || question.type === "open" ? 4 : 2}
                  className={`${FOCUS_39} obs-textarea font-en`}
                  placeholder="Write your answer…"
                  aria-label={`إجابة السؤال ${question.n}`}
                />
              </label>
            )}

            {submitted && resultOf(question.n) ? (
              <div className="space-y-1.5">
                <Feedback39
                  state={
                    resultOf(question.n)!.status === "correct"
                      ? "ok"
                      : resultOf(question.n)!.status === "review"
                        ? "info"
                        : "review"
                  }
                  title={
                    resultOf(question.n)!.status === "correct"
                      ? "مطابقة للنموذج"
                      : resultOf(question.n)!.status === "review"
                        ? "تحتاج مراجعة بشرية"
                        : "غير مطابقة — اقرأ التفسير"
                  }
                >
                  <p dir="ltr" className="font-en">
                    {resultOf(question.n)!.answer}
                  </p>
                  <p className="mt-1">
                    <Rich text={resultOf(question.n)!.explanation} />
                  </p>
                  {resultOf(question.n)!.alternatives?.length ? (
                    <ul className="mt-1 space-y-0.5">
                      {resultOf(question.n)!.alternatives!.map((alternative) => (
                        <li key={alternative} className="obs-nuance">
                          <Rich text={alternative} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Feedback39>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
              <ActionButton39
                variant="secondary"
                disabled={cursor === 0}
                onClick={() => setCursor((current) => Math.max(0, current - 1))}
              >
                السؤال السابق
              </ActionButton39>
              <ActionButton39
                variant="secondary"
                disabled={cursor >= levelQuestions.length - 1}
                onClick={() => setCursor((current) => Math.min(levelQuestions.length - 1, current + 1))}
              >
                السؤال التالي
              </ActionButton39>
              <span dir="ltr" className="obs-pill font-en">
                {answerKeyOf(question)} · {answers[question.n]?.trim() ? "answered" : "empty"}
              </span>
            </div>
          </div>
        </section>
      ) : null}

      <section className="obs-panel">
        {error ? (
          <p role="alert" className="obs-verdict is-bad">
            {error}
          </p>
        ) : null}
        {submitted ? (
          <p className="obs-nuance">
            تم التسليم. لا يمكن إعادة تصحيح الاختبار في هذه الجلسة؛ راجع منطقة الحلول للمفاتيح والتفسيرات.
          </p>
        ) : (
          <>
            <p className="obs-nuance">
              التسليم متاح بعد الإجابة عن الأسئلة الـ25 كلها. عدد المجاب الآن:{" "}
              <span dir="ltr" className="font-en">
                {answered}
              </span>
              .
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <ActionButton39
                onClick={submit}
                disabled={!ready || grading || submitted}
                className="min-w-40"
              >
                {grading ? "جارٍ التصحيح…" : "تسليم الاختبار"}
              </ActionButton39>
              <ActionButton39 variant="ghost" onClick={reset} disabled={answered === 0}>
                مسح الإجابات
              </ActionButton39>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
