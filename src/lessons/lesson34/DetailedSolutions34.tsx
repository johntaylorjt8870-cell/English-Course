// ============================================================
// DetailedSolutions34 — مفتاح تفصيلي للأسئلة الخمسة والعشرين.
// يُستعمل في منطقتَي الحلول (بعد الإرسال) والمعلم (بعد كلمة المرور)
// فقط، ولا يُستورد في خطوات الطالب ولا قبل الإرسال.
// ============================================================

import { Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { DETAILED_TEST_SOLUTIONS_34, SOLUTION_LEVELS_34 } from "./solutionsData34";

export default function DetailedSolutions34({ showLevelRanges = true }: { showLevelRanges?: boolean }) {
  return (
    <div className="l34-solutions" data-detailed-solutions="34">
      {SOLUTION_LEVELS_34.map((level) => (
        <section key={level.n} className="l34-sol-level" aria-label={`المستوى ${level.n}: ${level.title}`}>
          <header>
            <span>
              <Rich text={`المستوى ${level.n}`} />
            </span>
            <h3>
              <Rich text={level.title} />
            </h3>
            {showLevelRanges ? <span style={{ marginInlineStart: "auto" }}>{level.range}</span> : null}
          </header>

          {level.items.map((item) => (
            <article key={item.n} className="l34-sol-item" data-solution-q={item.n}>
              <div className="l34-sol-q">
                <span>س{item.n}.</span>
                <div>
                  <Rich text={item.prompt} />
                </div>
              </div>

              <div className="l34-sol-row">
                <b>
                  <Rich text="✓ الإجابة الصحيحة:" />
                </b>{" "}
                <span className="l34-sol-answer">
                  <LatinRuns text={item.answer} />
                </span>
              </div>

              <div className="l34-sol-row">
                <b>
                  <Rich text="السبب" />
                </b>{" "}
                <span className="text-[11px] font-bold text-violet-500">
                  <Rich text="Platform Explanation" />
                </span>
                <b>
                  <Rich text=":" />
                </b>{" "}
                <Rich text={item.why} />
              </div>

              <div className="l34-sol-row">
                <b>
                  <Rich text="البنية النحوية:" />
                </b>{" "}
                <LatinRuns text={item.structure} />
              </div>

              {item.model ? (
                <div className="l34-sol-model">
                  <b>
                    <Rich text="نموذج الإجابة:" />
                  </b>{" "}
                  <LatinRuns text={item.model} />
                  {item.alternatives?.length ? (
                    <>
                      <br />
                      <b>
                        <Rich text="بدائل مقبولة:" />
                      </b>{" "}
                      {item.alternatives.map((alt, i) => (
                        <span key={alt}>
                          {i > 0 ? " · " : ""}
                          <LatinRuns text={alt} />
                        </span>
                      ))}
                    </>
                  ) : null}
                </div>
              ) : null}

              {item.teacherNote ? (
                <div className="l34-sol-row text-[11px] text-amber-800">
                  <b>
                    <Rich text="ملاحظة معلم:" />
                  </b>{" "}
                  <Rich text={item.teacherNote} />
                </div>
              ) : null}
            </article>
          ))}
        </section>
      ))}

      <p className="text-center text-[11px] font-bold text-violet-400">
        <Rich text={`عدد الحلول التفصيلية: ${DETAILED_TEST_SOLUTIONS_34.length} / 25 — الإجابات البديلة مقبولة عندما تحقق الوظيفة المطلوبة نفسها.`} />
      </p>
    </div>
  );
}
