import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import type { Slide39 } from "./data";
import { ActionButton39, SourceLine39 } from "./kit39";
import { ChoiceLab39, FormulaOrderLab39 } from "./labs39";
import * as P from "./practiceData39";

const choices: Record<string, P.ChoiceItem39[]> = {
  s06: P.FIRST_USE_ITEMS_39,
  s07: P.CONTINUATION_ITEMS_39,
  s08: P.FOR_ITEMS_39,
  s09: P.SINCE_ITEMS_39,
  s10: P.FOR_SINCE_QUESTIONS_39,
  s12: P.BY_ITEMS_39,
  s13: P.BY_THE_TIME_ITEMS_39,
  s14: P.TIME_CLAUSE_ITEMS_39,
  s15: P.DIALOGUE_CHECK_39,
  s16: P.FP_VS_FPC_ITEMS_39,
  s17: P.PAIRED_EXAMPLES_39,
  s18: P.FINISHED_ITEMS_39,
  s20: P.NEGATION_MEANING_ITEMS_39,
  s22: P.SHORT_ANSWER_ITEMS_39,
  s24: P.WH_ITEMS_39,
  s25: P.PERFECT_CONTINUOUS_ITEMS_39,
  s26: P.STATIVE_ITEMS_39,
  s27: P.ERROR_ITEMS_39,
  s28: P.DIALOGUE2_CHECK_39,
  s33: P.IQ33_ITEMS_39,
  s38: P.SUMMARY_MATCH_39,
};
export default function StepView39({
  slide,
  onGoTest,
  onGoSolutions,
}: {
  slide: Slide39;
  onGoTest: () => void;
  onGoSolutions: () => void;
}) {
  const [attempt, setAttempt] = useState("");
  const [checked, setChecked] = useState(false);
  const [draft, setDraft] = useState(
    () => sessionStorage.getItem("l39-writing") || "",
  );
  const [token, setToken] = useState("");
  const { source: s, page } = slide;
  const part = Number(slide.id.split("-").at(-1)) - 1;
  const item = page.table
    ? undefined
    : choices[s.id]?.[part % choices[s.id].length];
  const task =
    page.reveal?.length ||
    (s.id === "s02" && part === 0) ||
    ["s11", "s19", "s21", "s23"].includes(s.id);
  const labels: Record<string, string> = {
    s02: "من 4:00 إلى 8:00: كم ساعة؟",
    s11: [
      "من 3 إلى 7: كم ساعة؟",
      "من 8 صباحًا إلى 2 ظهرًا: كم ساعة؟",
      "من كانون الثاني إلى تموز: كم شهرًا؟",
    ][part],
    s19: "اكتب جملة منفية باستخدام won’t have been + V-ing.",
    s21: "كوّن سؤالًا يبدأ بـ Will you have been…?",
    s23: "كوّن سؤالًا يبدأ بـ How long will you have been…?",
  };
  return (
    <article
      className="tg-step"
      data-step-id={slide.id}
      data-source-section={s.id}
    >
      <header className="tg-step-heading">
        <span dir="ltr">{String(slide.step).padStart(2, "0")} / TIME GRID</span>
        <h2>
          <Rich text={slide.title} />
        </h2>
      </header>
      {s.id === "s02" && part === 1 ? (
        <div className="tg-timeline" dir="ltr" aria-label="Study timeline">
          <span>
            4:00
            <br />
            START
          </span>
          <div>
            studying → → →<strong>4 hours</strong>
          </div>
          <span>
            8:00
            <br />
            REFERENCE
          </span>
        </div>
      ) : null}
      <div className="tg-source">
        {page.units.map((i) => (
          <SourceLine39 key={i} sectionId={s.id} index={i} text={s.units[i]} />
        ))}
      </div>
      {page.table ? (
        <div className="tg-matrix" data-source-table={s.id}>
          {s.tableHeaders?.map((h, i) => (
            <span key={i} className="tg-table-heading">
              <Rich text={h} />
            </span>
          ))}
          {s.tableRows?.map((row, i) => (
            <div key={i} data-source-row={i}>
              {row.map((cell, j) => (
                <span key={j}>
                  <Rich text={cell} />
                </span>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      {page.extraTable ? (
        <div className="tg-matrix">
          {s.extraTableHeaders?.map((h) => (
            <b key={h}>
              <Rich text={h} />
            </b>
          ))}
          {s.extraTableRows?.map((row, i) => (
            <div key={i}>
              {row.map((c, j) => (
                <span key={j}>
                  <Rich text={c} />
                </span>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      {s.id === "s03" && part === 0 ? <FormulaOrderLab39 /> : null}
      {item ? (
        <ChoiceLab39
          id={slide.id}
          eyebrow="Practice"
          title="جرّب الآن"
          items={[item]}
        />
      ) : null}
      {task ? (
        <section className="tg-task">
          <label htmlFor="tg-attempt">
            <Rich
              text={labels[s.id] || "أجب أولًا، ثم قارن إجابتك بمفتاح المصدر."}
            />
          </label>
          <input
            id="tg-attempt"
            dir="auto"
            value={attempt}
            onChange={(e) => {
              setAttempt(e.target.value);
              setChecked(false);
            }}
          />
          <ActionButton39
            disabled={!attempt.trim()}
            onClick={() => setChecked(true)}
          >
            تحقق من المحاولة
          </ActionButton39>
          {checked ? (
            <div role="status" className="tg-feedback">
              {page.reveal?.map((i) => (
                <SourceLine39
                  key={i}
                  sectionId={s.id}
                  kind="reveal"
                  index={i}
                  text={s.revealUnits![i]}
                />
              ))}
              {s.id === "s02" || s.id === "s11" ? (
                <p>
                  {attempt.trim() ===
                  String(s.id === "s02" ? 4 : [4, 6, 6][part])
                    ? "✓ صحيح"
                    : "راجع الفرق بين نقطة البداية والمرجع: " +
                      (s.id === "s02" ? 4 : [4, 6, 6][part])}
                </p>
              ) : null}
              {["s19", "s21", "s23"].includes(s.id) ? (
                <p>
                  {/have been \w+ing/i.test(attempt) &&
                  (s.id === "s19"
                    ? /won['’]t|will not/i.test(attempt)
                    : s.id === "s23"
                      ? /^how long will/i.test(attempt)
                      : /^will/i.test(attempt))
                    ? "✓ ترتيب العناصر الأساسية صحيح. قارن المعنى والأمثلة أعلاه."
                    : "راجع ترتيب will + have + been + V-ing والصيغة المطلوبة أعلاه."}
                </p>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}
      {s.id === "s04" && part === 0 ? (
        <section className="tg-task">
          <label htmlFor="tg-role">اختر الجزء الذي يحدد مدة النشاط</label>
          <select
            id="tg-role"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          >
            <option value="">اختر…</option>
            {[
              "She",
              "will",
              "have",
              "been",
              "studying",
              "for three hours",
              "by 9:00",
            ].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {token ? (
            <p role="status">
              {token === "for three hours"
                ? "✓ المدة: ثلاث ساعات."
                : "هذا جزء آخر من الجملة. ابحث عن مدة زمنية."}
            </p>
          ) : null}
        </section>
      ) : null}
      {s.id === "s35" ? (
        <ActionButton39 onClick={onGoTest}>
          ابدأ الاختبار · 25 سؤالًا
        </ActionButton39>
      ) : null}
      {s.id === "s36" ? (
        <ActionButton39 onClick={onGoSolutions}>
          الحلول بعد التسليم / دخول المعلم
        </ActionButton39>
      ) : null}
      {s.id === "s37" && part === 1 ? (
        <section className="tg-task">
          <label htmlFor="tg-writing">
            مساحة الكتابة · محفوظة في هذه الجلسة
          </label>
          <textarea
            id="tg-writing"
            dir="ltr"
            rows={7}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              sessionStorage.setItem("l39-writing", e.target.value);
            }}
          />
          <p aria-live="polite">
            {draft.split(/[.!?]+/).filter((x) => x.trim()).length} / 12–15 جملة
            · راجع الشروط في الخطوة السابقة.
          </p>
        </section>
      ) : null}
      {s.id === "s39" && part === 2 ? (
        <a href="#/lesson/40">الدرس 40 ← المراجعة الشاملة</a>
      ) : null}
    </article>
  );
}
