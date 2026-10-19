import { useMemo, useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { FOCUS_35 } from "./kit35";
import {
  TEST_35,
  TEST_35_COUNT,
  TEST_INTRO_35,
  TEST_LEVELS_35,
  answerText35,
  gradeObjective35,
  gradeProduction35,
  isAnswered35,
  type TestQuestion35,
  type TestWrite35,
} from "./testData";

/* The 25-question assessment. Neutral before submission: no verdict, score,
   model answer, or explanation is rendered until the learner submits all 25. */

export default function TestArea35({
  onSubmitted,
  onGoSolutions,
}: {
  onSubmitted: () => void;
  onGoSolutions: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = useMemo(() => TEST_35.filter((question) => isAnswered35(question, answers[question.n])).length, [answers]);
  const ready = answered === TEST_35_COUNT;

  const objective = TEST_35.filter((question) => question.type !== "write");
  const objectiveScore = objective.filter((question) => gradeObjective35(question, answers[question.n]) === true).length;
  const production = TEST_35.filter((question): question is TestWrite35 => question.type === "write");
  const verified = production.filter((question) => gradeProduction35(question, answers[question.n]) === "verified").length;
  const review = production.filter((question) => gradeProduction35(question, answers[question.n]) === "review").length;

  const update = (n: number, value: string | number) => {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [n]: value }));
  };

  const submit = () => {
    if (!ready || submitted) return;
    setSubmitted(true);
    onSubmitted();
  };

  const restart = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div data-area="lesson35-test" className="fg35-body">
      <header className="fg35-testhead">
        <div className="fg35-card__eyebrow">
          <span className="fg35-pill fg35-pill--source">🏆 MASTER TEST · §34</span>
          <span className="fg35-pill">5 مستويات</span>
          <span className="fg35-pill">25 سؤالًا</span>
        </div>
        <h2>اختبار الدرس 35 — Future Plans Master Test</h2>
        <div style={{ marginTop: 7 }}>
          {TEST_INTRO_35.map((line) => <p key={line} className="fg35-prose" style={{ marginTop: 2 }}><Rich text={line} /></p>)}
        </div>
        <div className="fg35-track" aria-label="تقدم الإجابة">
          <div className="fg35-track__bar"><span style={{ width: `${Math.round((answered / TEST_35_COUNT) * 100)}%` }} /></div>
          <span className="fg35-track__num" dir="ltr" aria-live="polite">{answered}/{TEST_35_COUNT}</span>
        </div>
        <p className="fg35-muted" style={{ marginTop: 6 }}>
          لا تظهر أي إجابة أو علامة صحة قبل الإرسال. يمكنك التنقل بين المستويات؛ إجاباتك تُحفظ داخل الجلسة.
        </p>
      </header>

      {submitted ? (
        <section className="fg35-score" role="status" aria-live="polite" data-test-score>
          <div className="fg35-card__eyebrow">النتيجة</div>
          <div className="fg35-score__big" dir="ltr">{objectiveScore + verified} / 25</div>
          <p className="fg35-prose" style={{ marginTop: 4 }}>
            <b>{objectiveScore}/20</b> سؤالًا موضوعيًا صحيحًا · <b>{verified}/5</b> مهمة إنتاج تحققت بنيتها آليًا.
            {review > 0 ? ` · ${review} إجابة كتابية تحتاج مراجعة بشرية (لم تُخصم).` : ""}
          </p>
          <p className="fg35-muted">
            درجات الإنتاج تعتمد على فحص بنيوي (وجود الصيغة المطلوبة في السياق)، وليست حكمًا نهائيًا على جودة اللغة. راجع النماذج في التغذية الراجعة أدناه.
          </p>
          <div className="fg35-inputrow">
            <button type="button" className={`fg35-btn ${FOCUS_35}`} onClick={onGoSolutions}>
              اكشف الحلول التفصيلية
            </button>
            <button type="button" className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`} onClick={restart}>
              إعادة الاختبار
            </button>
          </div>
        </section>
      ) : null}

      {TEST_LEVELS_35.map((level, levelIndex) => (
        <section className="fg35-testlevel" key={level.id} aria-labelledby={`l35-${level.id}`}>
          <header className="fg35-testlevel__head">
            <span className="fg35-testlevel__num">{levelIndex + 1}</span>
            <h3 id={`l35-${level.id}`} style={{ margin: 0, fontSize: "0.98rem", fontWeight: 900 }}>
              <Rich text={level.title} />
            </h3>
            <span className="fg35-pill" dir="ltr">{level.range.replace("الأسئلة", "Q")}</span>
          </header>
          {level.instruction ? <p className="fg35-muted" style={{ marginTop: 0 }}><Rich text={level.instruction} /></p> : null}
          {level.questions.map((question) => (
            <Question35
              key={question.n}
              question={question}
              value={answers[question.n]}
              submitted={submitted}
              onChange={(value) => update(question.n, value)}
            />
          ))}
        </section>
      ))}

      <div className="fg35-card fg35-stickybar">
        {!submitted ? (
          <div className="fg35-row" style={{ justifyContent: "space-between" }}>
            <button type="button" className={`fg35-btn ${FOCUS_35}`} data-test-submit disabled={!ready} onClick={submit}>
              إرسال الاختبار
            </button>
            <span className="fg35-muted" aria-live="polite">
              {ready ? "أجبت عن كل الأسئلة. أرسل مرة واحدة لرؤية النتيجة." : `أكمل ${TEST_35_COUNT - answered} سؤالًا قبل الإرسال.`}
            </span>
          </div>
        ) : (
          <div className="fg35-row" style={{ justifyContent: "space-between" }}>
            <span className="fg35-strong">تم الإرسال — الإجابات محفوظة أدناه.</span>
            <button type="button" className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`} onClick={onGoSolutions}>
              الحلول التفصيلية
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Question35({
  question,
  value,
  submitted,
  onChange,
}: {
  question: TestQuestion35;
  value: string | number | undefined;
  submitted: boolean;
  onChange: (value: string | number) => void;
}) {
  const objective = submitted ? gradeObjective35(question, value) : null;
  const production = submitted && question.type === "write" ? gradeProduction35(question, value) : null;
  const grade = objective === true || production === "verified" ? "correct" : objective === false ? "wrong" : production === "review" ? "review" : undefined;

  return (
    <article className="fg35-q" data-test-q={question.n} data-grade={grade}>
      <div className="fg35-q__prompt">
        <span className="fg35-q__n">{question.n}</span>
        <div className="fg35-wide">
          {question.promptLines.map((line, index) => (
            <div key={index} className="fg35-en" dir={/[A-Za-z]/.test(line) ? "ltr" : "rtl"} style={/[A-Za-z]/.test(line) ? { textAlign: "left" } : { textAlign: "right" }}>
              <Rich text={line} />
            </div>
          ))}
        </div>
        {submitted ? (
          <span className="fg35-pill" aria-hidden>
            {grade === "correct" ? "✓" : grade === "wrong" ? "✕" : grade === "review" ? "…" : ""}
          </span>
        ) : null}
      </div>

      {question.type === "single" ? (
        <div className="fg35-optlist" role="radiogroup" aria-label={`السؤال ${question.n}`}>
          {question.options.map((option, index) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={value === index}
              aria-pressed={value === index}
              disabled={submitted}
              onClick={() => onChange(index)}
              className={`fg35-opt ${FOCUS_35}`}
            >
              <span className="fg35-opt__letter">{String.fromCharCode(65 + index)}.</span>
              <span>{option}</span>
            </button>
          ))}
        </div>
      ) : question.type === "write" ? (
        <>
          <label className="fg35-sr" htmlFor={`l35-q-${question.n}`}>إجابتك عن السؤال {question.n}</label>
          <textarea
            id={`l35-q-${question.n}`}
            className="fg35-textarea"
            dir="ltr"
            rows={2}
            disabled={submitted}
            value={typeof value === "string" ? value : ""}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Write your sentence in English…"
          />
        </>
      ) : (
        <>
          <label className="fg35-sr" htmlFor={`l35-q-${question.n}`}>إجابتك عن السؤال {question.n}</label>
          <input
            id={`l35-q-${question.n}`}
            className="fg35-input"
            type="text"
            dir="ltr"
            autoComplete="off"
            disabled={submitted}
            value={typeof value === "string" ? value : ""}
            onChange={(event) => onChange(event.target.value)}
            placeholder={question.type === "repair" ? "Write the corrected sentence…" : "Type the missing form…"}
            style={{ width: "100%", marginTop: 7 }}
          />
        </>
      )}

      {submitted ? (
        <div className="fg35-feedback" data-test-feedback={question.n} data-ok={grade === "correct"}>
          <div className="fg35-row" style={{ justifyContent: "space-between" }}>
            <span className="fg35-tag fg35-tag--authored">حل من إعداد المنصة/المعلم</span>
            <span className="fg35-muted">{question.concept}</span>
          </div>
          <div style={{ marginTop: 4 }}>
            <b>الإجابة: </b>
            {question.type === "write" ? (
              <span className="fg35-en" dir="ltr">{question.modelAnswers.join(" / ")}</span>
            ) : (
              <span className="fg35-en" dir="ltr">{answerText35(question)}</span>
            )}
          </div>
          {question.type === "write" && production === "review" ? (
            <div style={{ marginTop: 4 }}>
              <b>لم يتحقق الفحص البنيوي بالكامل.</b> راجع أن جملتك تحتوي الصيغة المطلوبة للموقف. النموذج أعلاه للمقارنة، ولا يعني أن إجابتك خاطئة لغويًا.
            </div>
          ) : null}
          <div style={{ marginTop: 4 }}><Rich text={question.why} /></div>
          {question.alternatives?.length ? (
            <div className="fg35-muted" style={{ marginTop: 4 }}>
              بدائل مقبولة: <span className="fg35-en" dir="ltr">{question.alternatives.join(" · ")}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
