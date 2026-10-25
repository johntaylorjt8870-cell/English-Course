import { useEffect, useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { FOCUS_35 } from "./kit35";
import { TEST_LEVELS_35 } from "./testData";
import type * as AnswerKey35 from "./testKey35";

export default function SolutionsArea35({
  unlocked,
  onGoTest,
  onGoTeacher,
}: {
  unlocked: boolean;
  onGoTest: () => void;
  onGoTeacher: () => void;
}) {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [keyData, setKeyData] = useState<typeof AnswerKey35 | null>(null);

  useEffect(() => {
    if (!unlocked || keyData) return;
    let active = true;
    import("./testKey35").then((module) => { if (active) setKeyData(module); });
    return () => { active = false; };
  }, [keyData, unlocked]);

  if (!unlocked) {
    return (
      <div className="fg35-gate" data-area="lesson35-solutions" data-solutions-locked="true">
        <div style={{ fontSize: "2rem" }} aria-hidden>🔒</div>
        <h2>منطقة الحلول مقفلة</h2>
        <p className="fg35-prose">
          الحلول التفصيلية لا تُعرض قبل تقديم الاختبار كاملًا. قدّم الاختبار أولًا (25 سؤالًا)، ثم عُد إلى هنا.
        </p>
        <div className="fg35-inputrow">
          <button type="button" className={`fg35-btn ${FOCUS_35}`} onClick={onGoTest}>العودة إلى الاختبار</button>
          <button type="button" className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`} onClick={onGoTeacher}>منطقة المعلم</button>
        </div>
        <p className="fg35-muted" style={{ marginTop: 8 }}>
          يمكن للمعلم فتح الحلول من منطقة المعلم المحمية بكلمة مرور، دون تقديم الاختبار.
        </p>
      </div>
    );
  }

  return (
    <div className="fg35-body" data-area="lesson35-solutions">
      <header className="fg35-testhead">
        <div className="fg35-card__eyebrow">
          <span className="fg35-pill fg35-pill--source">🔑 SOLUTIONS · </span>
          <span className="fg35-pill">25 حلًا</span>
          <span className="fg35-pill">5 مستويات</span>
        </div>
        <h2>الحلول التفصيلية — 25 سؤالًا</h2>
        <p className="fg35-prose">
          هذا مفتاح كامل أعدّته المنصة/المعلم بالاستناد إلى قواعد الدرس وسياق الأسئلة؛ وقد تُقبل صيغ بديلة صحيحة، خصوصًا في مهام الإنتاج المفتوحة.
        </p>
        <div className="fg35-inputrow">
          <button
            type="button"
            className={`fg35-btn ${FOCUS_35}`}
            onClick={() => setOpen(Object.fromEntries((keyData?.TEST_SOLUTIONS_35 ?? []).map((solution) => [solution.n, true])))}
          >
            اعرض كل الشروح
          </button>
          <button type="button" className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`} onClick={() => setOpen({})}>
            اطوِ الشروح
          </button>
        </div>
      </header>

      {!keyData ? <p className="fg35-muted" role="status">جارٍ إعداد الحلول التفصيلية…</p> : null}
      {TEST_LEVELS_35.map((level, levelIndex) => (
        <section className="fg35-card" key={level.id} data-tone="mint">
          <div className="fg35-card__eyebrow">
            <span className="fg35-pill fg35-pill--stage">المستوى {levelIndex + 1}</span>
            <span className="fg35-pill" dir="ltr">{level.range.replace("الأسئلة", "Q")}</span>
          </div>
          <h3><Rich text={level.title} /></h3>
          <div className="fg35-stack" style={{ marginTop: 8 }}>
            {(keyData?.TEST_SOLUTIONS_35 ?? []).filter((solution) => level.questions.some((question) => question.n === solution.n)).map((solution) => {
              const expanded = open[solution.n] ?? false;
              return (
                <article key={solution.n} className="fg35-solution" data-solution={solution.n}>
                  <div className="fg35-solution__head">
                    <span className="fg35-q__n">{solution.n}</span>
                    <span className="fg35-tag fg35-tag--authored">حل مستنتج · Platform-derived</span>
                    <span className="fg35-muted">{solution.concept}</span>
                    <button
                      type="button"
                      className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`}
                      style={{ marginInlineStart: "auto", padding: "4px 10px", fontSize: "0.72rem" }}
                      aria-expanded={expanded}
                      onClick={() => setOpen((current) => ({ ...current, [solution.n]: !expanded }))}
                    >
                      {expanded ? "اطوِ الشرح" : "اشرح"}
                    </button>
                  </div>
                  <p className="fg35-muted" style={{ marginTop: 5 }}><Rich text={solution.prompt} /></p>
                  <div className="fg35-en" dir="ltr" style={{ marginTop: 4 }}>{solution.answer}</div>
                  {solution.alternatives.length ? (
                    <p className="fg35-muted" style={{ marginTop: 3 }}>
                      بدائل صحيحة: <span className="fg35-en" dir="ltr">{solution.alternatives.join(" · ")}</span>
                    </p>
                  ) : null}
                  {expanded ? (
                    <div className="fg35-feedback" data-ok="true" style={{ marginTop: 6 }}>
                      <div><b>لماذا؟ </b><Rich text={solution.explanation} /></div>
                      <div style={{ marginTop: 4 }}><b>الفخ الشائع: </b><Rich text={solution.trap} /></div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
