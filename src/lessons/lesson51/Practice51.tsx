import { type CSSProperties, type ReactNode } from "react";
import {
  CAUSE_CASES_51,
  DIALOGUE_51,
  ERRORS_51,
  FIVE_SENTENCES_51,
  MODAL_CASES_51,
  MODAL_USES_51,
  NEG_CASES_51,
  ORDER_TASKS_51,
  READING_51,
  READING_HUNT_51,
  READING_QUESTIONS_51,
  SUMMARY_TABLE_51,
  USES_51,
  WHEN_CASES_51,
  ZERO_FIRST_PAIRS_51,
} from "./data";
import {
  PRACTICE_SETS_51,
  SPEAKING_CONNECTORS_51,
  SPEAKING_SITUATIONS_51,
  SPEAKING_STARTERS_51,
  WRITING_REQUIREMENTS_51,
} from "./practiceData51";
import { gradePractice51, PRACTICE_KEYS_51 } from "./practiceKey51";
import { En51, FlowChain51, Mixed51, Note51, RepetitionMeter51, Table51View, toneClass } from "./kit51";
import type { GradedTestResult51 } from "./testKey51";

export type Workspace51 = {
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  revealed: Record<string, boolean>;
  cause: Record<string, string>;
  causeChecked: Record<string, boolean>;
  fact: Record<string, string>;
  factChecked: Record<string, boolean>;
  verb: Record<string, string>;
  verbChecked: Record<string, boolean>;
  neg: Record<string, string>;
  negChecked: Record<string, boolean>;
  order: Record<string, string>;
  orderChecked: Record<string, boolean>;
  when: Record<string, string>;
  whenChecked: Record<string, boolean>;
  modal: Record<string, string>;
  modalChecked: Record<string, boolean>;
  dialogueAr: boolean;
  showTranslation: boolean;
  readingDrafts: Record<number, string>;
  readingOpen: Record<number, boolean>;
  hunt: Record<string, string>;
  huntChecked: Record<string, boolean>;
  writing: string;
  speakingSituation: number;
  speakingNotes: string;
  writingModelOpen: boolean;
};

export const initialWorkspace51 = (): Workspace51 => ({
  answers: {},
  checked: {},
  revealed: {},
  cause: {},
  causeChecked: {},
  fact: {},
  factChecked: {},
  verb: {},
  verbChecked: {},
  neg: {},
  negChecked: {},
  order: {},
  orderChecked: {},
  when: {},
  whenChecked: {},
  modal: {},
  modalChecked: {},
  dialogueAr: false,
  showTranslation: false,
  readingDrafts: {},
  readingOpen: {},
  hunt: {},
  huntChecked: {},
  writing: "",
  speakingSituation: 0,
  speakingNotes: "",
  writingModelOpen: false,
});

type SetWorkspace = (update: (previous: Workspace51) => Workspace51) => void;

const isArabic = (value: string) => /[\u0600-\u06ff]/.test(value);

/* ============================================================
   مجموعات التدريب
   ============================================================ */

export function PracticeSet51({
  setId,
  workspace,
  onChange,
}: {
  setId: string;
  workspace: Workspace51;
  onChange: SetWorkspace;
}) {
  const items = PRACTICE_SETS_51[setId] ?? [];
  return (
    <div className="l51-practice-list" data-practice-set={setId}>
      {items.map((item, index) => {
        const value = workspace.answers[item.id] ?? "";
        const checked = Boolean(workspace.checked[item.id]);
        const correct = checked && gradePractice51(item.id, value);
        const key = PRACTICE_KEYS_51[item.id];
        const setValue = (next: string) =>
          onChange((previous) => ({
            ...previous,
            answers: { ...previous.answers, [item.id]: next },
            checked: { ...previous.checked, [item.id]: false },
            revealed: { ...previous.revealed, [item.id]: false },
          }));
        return (
          <section className="l51-practice-card" key={item.id} data-practice-id={item.id}>
            <div className="l51-question-top">
              <span className="l51-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p dir={isArabic(item.prompt) ? "rtl" : "ltr"} lang={isArabic(item.prompt) ? "ar" : "en"}>
                {isArabic(item.prompt) ? <Mixed51 text={item.prompt} /> : item.prompt}
              </p>
            </div>
            {item.instruction && (
              <p className="l51-instruction">
                <Mixed51 text={item.instruction} />
              </p>
            )}
            {item.options ? (
              <div
                className="l51-options"
                dir={item.options.some((option) => isArabic(option)) ? "rtl" : "ltr"}
                role="group"
                aria-label={`خيارات التمرين ${index + 1}`}
              >
                {item.options.map((option, optionIndex) => (
                  <button
                    type="button"
                    key={option}
                    aria-pressed={value === option}
                    dir={isArabic(option) ? "rtl" : "ltr"}
                    onClick={() => setValue(option)}
                  >
                    <span className="l51-option-letter" aria-hidden="true">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    {isArabic(option) ? (
                      <span dir="rtl" lang="ar">
                        <Mixed51 text={option} />
                      </span>
                    ) : (
                      <En51>{option}</En51>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <input
                dir="ltr"
                lang="en"
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Write your answer in English…"
                aria-label={`إجابة التمرين ${index + 1}`}
                className="l51-input"
              />
            )}
            <div className="l51-practice-actions">
              <button
                type="button"
                className="l51-button l51-button--dark"
                disabled={!value.trim()}
                onClick={() => onChange((previous) => ({ ...previous, checked: { ...previous.checked, [item.id]: true } }))}
              >
                تحقّق
              </button>
              {checked && !correct && (
                <button
                  type="button"
                  className="l51-button l51-button--outline"
                  aria-expanded={Boolean(workspace.revealed[item.id])}
                  onClick={() =>
                    onChange((previous) => ({
                      ...previous,
                      revealed: { ...previous.revealed, [item.id]: !previous.revealed[item.id] },
                    }))
                  }
                >
                  {workspace.revealed[item.id] ? "إخفاء النموذج" : "عرض نموذج"}
                </button>
              )}
            </div>
            {checked && key && (
              <div role="status" className={`l51-feedback ${correct ? "is-correct" : "is-retry"}`}>
                <strong>{correct ? "✓ إجابة مناسبة" : "↺ راجع القاعدة وحاول مجددًا"}</strong>
                <p>
                  <Mixed51 text={key.why} />
                </p>
                {workspace.revealed[item.id] && (
                  <p>
                    <strong>نموذج: </strong>
                    <Mixed51 text={key.model} />
                  </p>
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   المدخل: سلسلة السبب والنتيجة
   ============================================================ */

export function IntroChain51() {
  return (
    <div className="l51-intro-chain" data-intro-chain>
      <FlowChain51
        condition="If you study"
        conditionAr="إذا درست (الشرط)"
        result="You learn."
        resultAr="فإنك تتعلم (النتيجة)"
        active="law"
      />
      <p className="l51-instruction">
        إذا تحقق الشرط، تحدث نتيجة معينة. لكن ليس كل شرط مثله: هناك شروط لمرة واحدة في المستقبل، وشروط لحقائق ثابتة تتكرر
        دائمًا — وهذه هي أرضية درسنا اليوم.
      </p>
    </div>
  );
}

/* ============================================================
   مختبر السبب والنتيجة
   ============================================================ */

export function CauseEffectLab51({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  const done = Object.values(workspace.causeChecked).filter(Boolean).length;
  return (
    <div className="l51-lab" data-cause-lab>
      <RepetitionMeter51 active="law" />
      <div className="l51-practice-meta">
        <span className="l51-tag">
          <bdi dir="ltr">
            {done} / {CAUSE_CASES_51.length}
          </bdi>{" "}
          تجارب فُحصت
        </span>
        <span>التفسير والسلسلة الكاملة لا يظهران قبل الضغط على «تحقّق».</span>
      </div>
      {CAUSE_CASES_51.map((task, index) => {
        const choice = workspace.cause[task.id];
        const isChecked = Boolean(workspace.causeChecked[task.id]);
        const correct = isChecked && choice === task.correct;
        return (
          <section className={`l51-lab-card ${toneClass(task.tone)}`} key={task.id} data-cause-case={task.id}>
            <div className="l51-lab-scene">
              <span className="l51-lab-no" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p dir="ltr" lang="en">
                  {task.condition}
                </p>
                <p dir="rtl" lang="ar">
                  {task.conditionAr}
                </p>
              </div>
            </div>
            <div className="l51-lab-options" dir="ltr" role="group" aria-label={`نتائج التجربة ${index + 1}`}>
              {task.options.map((option) => (
                <button type="button" key={option.id} aria-pressed={choice === option.id} onClick={() =>
                  onChange((previous) => ({
                    ...previous,
                    cause: { ...previous.cause, [task.id]: option.id },
                    causeChecked: { ...previous.causeChecked, [task.id]: false },
                  }))
                }>
                  <En51>{option.en}</En51>
                  <span dir="rtl" lang="ar">
                    {option.note}
                  </span>
                </button>
              ))}
            </div>
            <div className="l51-practice-actions">
              <button
                type="button"
                className="l51-button l51-button--dark"
                disabled={!choice}
                onClick={() =>
                  onChange((previous) => ({ ...previous, causeChecked: { ...previous.causeChecked, [task.id]: true } }))
                }
              >
                تحقّق من النتيجة
              </button>
            </div>
            {isChecked && (
              <div role="status" className={`l51-feedback ${correct ? "is-correct" : "is-retry"}`}>
                <strong>{correct ? "✓ النتيجة صحيحة. " : "↺ النتيجة لا تكمل العلاقة الصحيحة. "}</strong>
                <p>
                  <Mixed51 text={task.why} />
                </p>
                <FlowChain51
                  condition={task.condition.replace("…", "")}
                  conditionAr={task.conditionAr.replace("…", "")}
                  result={task.options.find((option) => option.id === task.correct)?.en.replace("…", "") ?? ""}
                  resultAr="النتيجة الصحيحة"
                  active={task.tone}
                />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   مختبر التصريف — Verb Laboratory
   ============================================================ */

const VERB_LAB_51 = [
  { id: "v1", sentence: "If he ________ (eat) too much, he feels sick.", options: ["eat", "eats", "eating"], correct: "eats", why: "الفاعل HE مفرد غائب في جزء الشرط: eats." },
  { id: "v2", sentence: "If they ________ (exercise), they feel better.", options: ["exercises", "exercise", "exercising"], correct: "exercise", why: "الفاعل THEY جمع: الفعل الأساسي دون S." },
  { id: "v3", sentence: "If water ________ (reach) 100°C, it boils.", options: ["reach", "reaches", "reaching"], correct: "reaches", why: "الفاعل WATER مفرد (it): reaches." },
  { id: "v4", sentence: "If she ________ (study) regularly, she improves.", options: ["study", "studys", "studies"], correct: "studies", why: "مع SHE نضيف ES إلى study: studies — في الطرفين." },
  { id: "v5", sentence: "If you ________ (mix) red and blue, you get purple.", options: ["mix", "mixes", "mixing"], correct: "mix", why: "مع YOU يبقى الفعل الأساسي كما هو." },
  { id: "v6", sentence: "If it ________ (get) dark, we go home.", options: ["get", "gets", "getting"], correct: "gets", why: "الفاعل IT مفرد: gets — حتى في جزء IF." },
] as const;

export function VerbLab51({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  const done = Object.values(workspace.verbChecked).filter(Boolean).length;
  return (
    <div className="l51-lab" data-verb-lab>
      <div className="l51-practice-meta">
        <span className="l51-tag">
          <bdi dir="ltr">
            {done} / {VERB_LAB_51.length}
          </bdi>{" "}
          تصريفات فُحصت
        </span>
        <span>ركز على الفاعل: He / She / It تأخذ S أو ES — في الشرط والنتيجة.</span>
      </div>
      {VERB_LAB_51.map((item, index) => {
        const choice = workspace.verb[item.id];
        const isChecked = Boolean(workspace.verbChecked[item.id]);
        const correct = isChecked && choice === item.correct;
        return (
          <section className="l51-lab-card" key={item.id} data-verb-case={item.id}>
            <div className="l51-question-top">
              <span className="l51-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p dir="ltr" lang="en">
                {item.sentence}
              </p>
            </div>
            <div className="l51-lab-options" dir="ltr" role="group" aria-label={`خيارات التصريف ${index + 1}`}>
              {item.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  aria-pressed={choice === option}
                  onClick={() =>
                    onChange((previous) => ({
                      ...previous,
                      verb: { ...previous.verb, [item.id]: option },
                      verbChecked: { ...previous.verbChecked, [item.id]: false },
                    }))
                  }
                >
                  <En51>{option}</En51>
                </button>
              ))}
            </div>
            <div className="l51-practice-actions">
              <button
                type="button"
                className="l51-button l51-button--dark"
                disabled={!choice}
                onClick={() =>
                  onChange((previous) => ({ ...previous, verbChecked: { ...previous.verbChecked, [item.id]: true } }))
                }
              >
                تحقّق
              </button>
            </div>
            {isChecked && (
              <p className={`l51-hunt-feedback ${correct ? "is-correct" : "is-retry"}`} role="status">
                <strong>{correct ? "✓ تصريف صحيح. " : "↺ التصريف لا يناسب الفاعل. "}</strong>
                <Mixed51 text={item.why} />
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   حقيقة عامة أم حدث مستقبلي؟
   ============================================================ */

const FACT_LAB_51 = ZERO_FIRST_PAIRS_51.flatMap((pair) => [
  { id: `${pair.id}-z`, en: pair.zero.en, ar: pair.zero.ar, correct: "Zero", why: `${pair.zeroFn}: المضارع البسيط في الطرفين دون زمن مستقبلي.` },
  { id: `${pair.id}-f`, en: pair.first.en, ar: pair.first.ar, correct: "First", why: `${pair.firstFn}: وجود زمن مستقبلي (مثل tomorrow أو tonight) مع WILL ينقل الجملة إلى الشرط الأول.` },
]);

export function FactLab51({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  const done = Object.values(workspace.factChecked).filter(Boolean).length;
  return (
    <div className="l51-lab" data-fact-lab>
      <RepetitionMeter51 />
      <div className="l51-practice-meta">
        <span className="l51-tag">
          <bdi dir="ltr">
            {done} / {FACT_LAB_51.length}
          </bdi>{" "}
          جمل فُحصت
        </span>
        <span>ابحث عن الكلمات المحددة للزمن: tomorrow / tonight / tomorrow تكشف الحدث المستقبلي المحدد.</span>
      </div>
      {FACT_LAB_51.map((item, index) => {
        const choice = workspace.fact[item.id];
        const isChecked = Boolean(workspace.factChecked[item.id]);
        const correct = isChecked && choice === item.correct;
        return (
          <section className="l51-lab-card" key={item.id} data-fact-case={item.id}>
            <div className="l51-question-top">
              <span className="l51-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p dir="ltr" lang="en">
                {item.en}
              </p>
            </div>
            <p className="l51-instruction">
              <Mixed51 text={item.ar} />
            </p>
            <div className="l51-lab-options" dir="rtl" role="group" aria-label={`تصنيف الجملة ${index + 1}`}>
              {["Zero", "First"].map((option) => (
                <button
                  type="button"
                  key={option}
                  aria-pressed={choice === option}
                  onClick={() =>
                    onChange((previous) => ({
                      ...previous,
                      fact: { ...previous.fact, [item.id]: option },
                      factChecked: { ...previous.factChecked, [item.id]: false },
                    }))
                  }
                >
                  <span dir="rtl" lang="ar">
                    {option === "Zero" ? "حقيقة عامة — Zero Conditional" : "احتمال مستقبلي — First Conditional"}
                  </span>
                </button>
              ))}
            </div>
            <div className="l51-practice-actions">
              <button
                type="button"
                className="l51-button l51-button--dark"
                disabled={!choice}
                onClick={() =>
                  onChange((previous) => ({ ...previous, factChecked: { ...previous.factChecked, [item.id]: true } }))
                }
              >
                تحقّق
              </button>
            </div>
            {isChecked && (
              <p className={`l51-hunt-feedback ${correct ? "is-correct" : "is-retry"}`} role="status">
                <strong>{correct ? "✓ تصنيف صحيح. " : "↺ أعد قراءة الجملة وابحث عن زمن النتيجة. "}</strong>
                <Mixed51 text={item.why} />
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   باني الجمل المنفية
   ============================================================ */

export function NegLab51({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  const done = Object.values(workspace.negChecked).filter(Boolean).length;
  return (
    <div className="l51-lab" data-neg-lab>
      <div className="l51-practice-meta">
        <span className="l51-tag">
          <bdi dir="ltr">
            {done} / {NEG_CASES_51.length}
          </bdi>{" "}
          تركيبات فُحصت
        </span>
        <span>القاعدة: DON'T مع الجمع وI وYou · DOESN'T مع He / She / It · ثم V1 دائمًا.</span>
      </div>
      {NEG_CASES_51.map((item, index) => {
        const choice = workspace.neg[item.id];
        const isChecked = Boolean(workspace.negChecked[item.id]);
        const correct = isChecked && choice === item.correct;
        return (
          <section className={`l51-lab-card l51-tone--negative`} key={item.id} data-neg-case={item.id}>
            <div className="l51-question-top">
              <span className="l51-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p dir="ltr" lang="en">
                {item.prompt}
              </p>
            </div>
            <p className="l51-instruction">
              <Mixed51 text={item.promptAr} />
            </p>
            <div className="l51-lab-options" dir="ltr" role="group" aria-label={`خيارات النفي ${index + 1}`}>
              {item.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  aria-pressed={choice === option}
                  onClick={() =>
                    onChange((previous) => ({
                      ...previous,
                      neg: { ...previous.neg, [item.id]: option },
                      negChecked: { ...previous.negChecked, [item.id]: false },
                    }))
                  }
                >
                  <En51>{option}</En51>
                </button>
              ))}
            </div>
            <div className="l51-practice-actions">
              <button
                type="button"
                className="l51-button l51-button--dark"
                disabled={!choice}
                onClick={() =>
                  onChange((previous) => ({ ...previous, negChecked: { ...previous.negChecked, [item.id]: true } }))
                }
              >
                تحقّق
              </button>
            </div>
            {isChecked && (
              <p className={`l51-hunt-feedback ${correct ? "is-correct" : "is-retry"}`} role="status">
                <strong>{correct ? "✓ النفي صحيح. " : "↺ راجع الفاعل ثم DON'T / DOESN'T. "}</strong>
                <Mixed51 text={item.why} />
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   مختبر إعادة البناء — ترتيب الجملة
   ============================================================ */

export function OrderLab51({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  const done = Object.values(workspace.orderChecked).filter(Boolean).length;
  return (
    <div className="l51-lab" data-order-lab>
      <div className="l51-practice-meta">
        <span className="l51-tag">
          <bdi dir="ltr">
            {done} / {ORDER_TASKS_51.length}
          </bdi>{" "}
          جمل أُعيد بناؤها
        </span>
        <span>اضغط الكلمات بالترتيب. زر «مسح» يعيد المحاولة من الصفر.</span>
      </div>
      {ORDER_TASKS_51.map((task, index) => {
        const built = workspace.order[task.id] ?? "";
        const isChecked = Boolean(workspace.orderChecked[task.id]);
        const tokens = built ? built.split(" | ") : [];
        const correct =
          isChecked &&
          [task.correct, task.alternative]
            .filter(Boolean)
            .some((target) => tokens.join(" ").replace(/\s+/g, " ").trim() === target);
        return (
          <section className="l51-lab-card l51-tone--law" key={task.id} data-order-case={task.id}>
            <div className="l51-question-top">
              <span className="l51-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>اضغط الكلمات بالترتيب الصحيح لبناء الجملة:</p>
            </div>
            <div className="l51-order-words" dir="ltr" role="group" aria-label={`كلمات الجملة ${index + 1}`}>
              {task.words.map((word) => {
                const used = tokens.includes(word);
                return (
                  <button
                    type="button"
                    key={word}
                    disabled={used || isChecked}
                    onClick={() =>
                      onChange((previous) => ({
                        ...previous,
                        order: { ...previous.order, [task.id]: [...tokens, word].join(" | ") },
                        orderChecked: { ...previous.orderChecked, [task.id]: false },
                      }))
                    }
                  >
                    <En51>{word}</En51>
                  </button>
                );
              })}
            </div>
            <p className="l51-order-built" dir="ltr" lang="en" aria-live="polite">
              {tokens.join(" ") || "…"}
            </p>
            <div className="l51-practice-actions">
              <button
                type="button"
                className="l51-button l51-button--dark"
                disabled={tokens.length !== task.words.length || isChecked}
                onClick={() =>
                  onChange((previous) => ({ ...previous, orderChecked: { ...previous.orderChecked, [task.id]: true } }))
                }
              >
                تحقّق من الترتيب
              </button>
              <button
                type="button"
                className="l51-button l51-button--outline"
                disabled={isChecked && correct}
                onClick={() =>
                  onChange((previous) => ({
                    ...previous,
                    order: { ...previous.order, [task.id]: "" },
                    orderChecked: { ...previous.orderChecked, [task.id]: false },
                  }))
                }
              >
                مسح وإعادة المحاولة
              </button>
            </div>
            {isChecked && (
              <div role="status" className={`l51-feedback ${correct ? "is-correct" : "is-retry"}`}>
                <strong>{correct ? "✓ ترتيب صحيح. " : "↺ الترتيب أو الفاصلة تحتاج مراجعة. "}</strong>
                <p>
                  <Mixed51 text={task.why} />
                </p>
                <p>
                  <strong>النموذج: </strong>
                  <En51>{task.correct}</En51>
                  {task.alternative && (
                    <>
                      {" · "}
                      <En51>{task.alternative}</En51>
                    </>
                  )}
                </p>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   IF أم WHEN؟
   ============================================================ */

export function WhenLab51({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  const done = Object.values(workspace.whenChecked).filter(Boolean).length;
  return (
    <div className="l51-lab" data-when-lab>
      <div className="l51-practice-meta">
        <span className="l51-tag">
          <bdi dir="ltr">
            {done} / {WHEN_CASES_51.length}
          </bdi>{" "}
          مواقف فُحصت
        </span>
        <span>في بعض المواقين تصلح الكلمتان، والفارق في التركيز — سيوضح التفسير ذلك.</span>
      </div>
      {WHEN_CASES_51.map((item, index) => {
        const choice = workspace.when[item.id];
        const isChecked = Boolean(workspace.whenChecked[item.id]);
        const correct = isChecked && choice === item.correct;
        return (
          <section className="l51-lab-card l51-tone--future" key={item.id} data-when-case={item.id}>
            <div className="l51-question-top">
              <span className="l51-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>
                <Mixed51 text={item.scene} />
              </p>
            </div>
            <p className="l51-instruction">
              <Mixed51 text={item.sceneAr} />
            </p>
            <div className="l51-lab-options" dir="ltr" role="group" aria-label={`خيارات IF وWHEN ${index + 1}`}>
              {item.options.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  aria-pressed={choice === option.id}
                  onClick={() =>
                    onChange((previous) => ({
                      ...previous,
                      when: { ...previous.when, [item.id]: option.id },
                      whenChecked: { ...previous.whenChecked, [item.id]: false },
                    }))
                  }
                >
                  <En51>{option.en}</En51>
                  <span dir="rtl" lang="ar">
                    {option.note}
                  </span>
                </button>
              ))}
            </div>
            <div className="l51-practice-actions">
              <button
                type="button"
                className="l51-button l51-button--dark"
                disabled={!choice}
                onClick={() =>
                  onChange((previous) => ({ ...previous, whenChecked: { ...previous.whenChecked, [item.id]: true } }))
                }
              >
                تحقّق
              </button>
            </div>
            {isChecked && (
              <p className={`l51-hunt-feedback ${correct ? "is-correct" : "is-retry"}`} role="status">
                <strong>{correct ? "✓ الاختيار يناسب التركيز المطلوب. " : "🔄 فكّر في التركيز: شرط أم توقيت متوقع. "}</strong>
                <Mixed51 text={item.why} />
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   مختبر الأفعال الناقصة
   ============================================================ */

export function ModalLab51({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  const done = Object.values(workspace.modalChecked).filter(Boolean).length;
  return (
    <div className="l51-lab" data-modal-lab>
      <div className="l51-practice-meta">
        <span className="l51-tag">
          <bdi dir="ltr">
            {done} / {MODAL_CASES_51.length}
          </bdi>{" "}
          نتائج فُحصت
        </span>
        <span>الفعل الناقص يضيف معنى إلى النتيجة: قدرة، إلزام، نصيحة، أو احتمال.</span>
      </div>
      <div className="l51-modal-strip" aria-label="معاني الأفعال الناقصة">
        {MODAL_USES_51.map((use) => (
          <span key={use.id} className="l51-modal-chip">
            <En51>{use.modal}</En51>
            <span>{use.title}</span>
          </span>
        ))}
      </div>
      {MODAL_CASES_51.map((item, index) => {
        const choice = workspace.modal[item.id];
        const isChecked = Boolean(workspace.modalChecked[item.id]);
        const correct = isChecked && choice === item.correct;
        return (
          <section className="l51-lab-card l51-tone--modal" key={item.id} data-modal-case={item.id}>
            <div className="l51-question-top">
              <span className="l51-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p dir="ltr" lang="en">
                {item.prompt}
              </p>
            </div>
            <p className="l51-instruction">
              <Mixed51 text={item.promptAr} />
            </p>
            <div className="l51-lab-options" dir="ltr" role="group" aria-label={`خيارات الفعل الناقص ${index + 1}`}>
              {item.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  aria-pressed={choice === option}
                  onClick={() =>
                    onChange((previous) => ({
                      ...previous,
                      modal: { ...previous.modal, [item.id]: option },
                      modalChecked: { ...previous.modalChecked, [item.id]: false },
                    }))
                  }
                >
                  <En51>{option}</En51>
                </button>
              ))}
            </div>
            <div className="l51-practice-actions">
              <button
                type="button"
                className="l51-button l51-button--dark"
                disabled={!choice}
                onClick={() =>
                  onChange((previous) => ({ ...previous, modalChecked: { ...previous.modalChecked, [item.id]: true } }))
                }
              >
                تحقّق
              </button>
            </div>
            {isChecked && (
              <p className={`l51-hunt-feedback ${correct ? "is-correct" : "is-retry"}`} role="status">
                <strong>{correct ? "✓ المعنى مطابق للموقف. " : "↺ المعنى لا يناسب الموقف. "}</strong>
                <Mixed51 text={item.why} />
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   جدار الأخطاء
   ============================================================ */

export function ErrorsWall51() {
  return (
    <div className="l51-errors" data-errors-wall>
      {ERRORS_51.map((error) => (
        <article className={`l51-error-card ${toneClass(error.tone)}`} key={error.n} data-error={error.n}>
          <header>
            <span aria-hidden="true">{error.n}</span>
            <h3>{error.title}</h3>
          </header>
          <p className="l51-error-bad" dir="ltr" lang="en">
            {error.bad}
          </p>
          <p className="l51-error-good" dir="ltr" lang="en">
            {error.good}
          </p>
          <p dir="rtl" lang="ar">
            <Mixed51 text={error.why} />
          </p>
        </article>
      ))}
    </div>
  );
}

/* ============================================================
   الحوار
   ============================================================ */

const SPEAKER_COLORS_51 = ["#0e7c5b", "#4f46e5"];

function speakerStyle51(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return { "--speaker": SPEAKER_COLORS_51[hash % SPEAKER_COLORS_51.length] } as CSSProperties;
}

export function Dialogue51View({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  const dialogue = DIALOGUE_51;
  return (
    <div className={`l51-dialogue ${toneClass(dialogue.tone)}`} data-dialogue="main">
      <div className="l51-dialogue-head">
        <span className="l51-dialogue-label">
          <span aria-hidden="true">◉</span> HEALTHY HABITS · <En51>{dialogue.turns.length} TURNS</En51>
        </span>
        <button
          type="button"
          className="l51-text-button"
          aria-expanded={workspace.dialogueAr}
          onClick={() => onChange((previous) => ({ ...previous, dialogueAr: !previous.dialogueAr }))}
        >
          {workspace.dialogueAr ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      <p className="l51-dialogue-setting">
        <En51>{dialogue.title}</En51> — <Mixed51 text={dialogue.setting} />
      </p>
      {dialogue.turns.map((turn, index) => (
        <div className="l51-turn" key={`${turn.speaker}-${index}`}>
          <span className="l51-avatar" style={speakerStyle51(turn.speaker)} aria-hidden="true">
            {turn.speaker.slice(0, 1)}
          </span>
          <div className="l51-bubble">
            <span className="l51-speaker">
              <Mixed51 text={`${turn.speaker}${turn.fn ? ` · ${turn.fn}` : ""}`} />
            </span>
            <p dir="ltr" lang="en">
              {turn.en}
            </p>
            {workspace.dialogueAr && (
              <p className="l51-turn-ar" dir="rtl" lang="ar">
                <Mixed51 text={turn.ar} />
              </p>
            )}
          </div>
        </div>
      ))}
      <div className="l51-dialogue-analysis">
        <span className="l51-mini-label">تحليل التراكيب</span>
        <ul>
          {dialogue.analysis.map((entry) => (
            <li key={entry.form}>
              <En51>{entry.form}</En51>
              <span>{entry.ar}</span>
              <En51 className="l51-analysis-fn">{entry.fn}</En51>
            </li>
          ))}
        </ul>
      </div>
      <div className="l51-dialogue-lab">
        <div className="l51-practice-meta">
          <span className="l51-tag">حلل بنفسك</span>
          <span>
            <Mixed51 text={dialogue.labPrompt} />
          </span>
        </div>
        <PracticeSet51 setId={dialogue.labId} workspace={workspace} onChange={onChange} />
      </div>
    </div>
  );
}

/* ============================================================
   القراءة
   ============================================================ */

export function Reading51View({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  return (
    <div className="l51-reading" data-reading>
      <div className="l51-reading-head">
        <div>
          <span className="l51-mini-label">READING</span>
          <p dir="ltr" lang="en">
            The Science Club Experiment — one experiment, many general facts
          </p>
        </div>
        <button
          type="button"
          className="l51-button l51-button--outline"
          aria-expanded={workspace.showTranslation}
          onClick={() => onChange((previous) => ({ ...previous, showTranslation: !previous.showTranslation }))}
        >
          {workspace.showTranslation ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      <div className="l51-reading-body">
        {READING_51.map((part, index) => (
          <div className="l51-reading-paragraph" key={part.en}>
            <span className="l51-reading-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p dir="ltr" lang="en">
              {part.en}
            </p>
            {workspace.showTranslation && (
              <p className="l51-reading-ar" dir="rtl" lang="ar">
                <Mixed51 text={part.ar} />
              </p>
            )}
          </div>
        ))}
      </div>
      <Note51 icon="🔍" text="قبل الترجمة، جرّب أن تعثر بنفسك على جمل الشرط الصفري داخل النص: أين الشرط؟ وأين النتيجة؟" />
    </div>
  );
}

export function ReadingQuestions51({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  const answered = Object.values(workspace.readingDrafts).filter((value) => value.trim()).length;
  return (
    <div className="l51-reading-questions">
      <div className="l51-practice-meta">
        <span className="l51-tag">
          <bdi dir="ltr">
            {answered} / {READING_QUESTIONS_51.length}
          </bdi>{" "}
          إجابات مكتوبة
        </span>
        <span>النماذج لا تُعرض قبل الضغط على «قارن بالإجابة النموذجية».</span>
      </div>
      {READING_QUESTIONS_51.map((item, index) => (
        <section className="l51-reading-q" key={item.q} data-reading-q={index + 1}>
          <div className="l51-reading-q-top">
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <p dir="ltr" lang="en">
              {item.q}
            </p>
          </div>
          <input
            type="text"
            dir="ltr"
            lang="en"
            className="l51-input"
            value={workspace.readingDrafts[index] ?? ""}
            aria-label={`إجابة سؤال القراءة ${index + 1}`}
            placeholder="Write your answer…"
            onChange={(event) =>
              onChange((previous) => ({
                ...previous,
                readingDrafts: { ...previous.readingDrafts, [index]: event.target.value },
              }))
            }
          />
          <div className="l51-reading-actions">
            <button
              type="button"
              className="l51-button l51-button--outline"
              aria-expanded={Boolean(workspace.readingOpen[index])}
              onClick={() =>
                onChange((previous) => ({
                  ...previous,
                  readingOpen: { ...previous.readingOpen, [index]: !previous.readingOpen[index] },
                }))
              }
            >
              {workspace.readingOpen[index] ? "إخفاء النموذج" : "قارن بالإجابة النموذجية"}
            </button>
          </div>
          {workspace.readingOpen[index] && (
            <div className="l51-answer-model">
              <p dir="ltr" lang="en">
                {item.answer}
              </p>
              <p dir="rtl" lang="ar">
                <Mixed51 text={item.ar} />
              </p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export function ReadingHunt51({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  const checked = Object.values(workspace.huntChecked).filter(Boolean).length;
  return (
    <div className="l51-hunt" data-reading-hunt>
      <div className="l51-practice-meta">
        <span className="l51-tag">
          <bdi dir="ltr">
            {checked} / {READING_HUNT_51.length}
          </bdi>{" "}
          أسئلة فُحصت
        </span>
        <span>اختر، ثم اضغط «تحقّق» — لا يظهر التفسير قبل المحاولة.</span>
      </div>
      {READING_HUNT_51.map((item, index) => {
        const choice = workspace.hunt[item.id];
        const isChecked = Boolean(workspace.huntChecked[item.id]);
        const correct = isChecked && choice === String(item.correct);
        return (
          <section className="l51-hunt-q" key={item.id} data-hunt-q={index + 1}>
            <p>
              <strong>{String(index + 1).padStart(2, "0")} · </strong>
              <Mixed51 text={item.q} />
            </p>
            <div className="l51-hunt-options" role="group" aria-label={`خيارات سؤال الصيد ${index + 1}`}>
              {item.options.map((option, optionIndex) => (
                <button
                  type="button"
                  key={option}
                  aria-pressed={choice === String(optionIndex)}
                  onClick={() =>
                    onChange((previous) => ({
                      ...previous,
                      hunt: { ...previous.hunt, [item.id]: String(optionIndex) },
                      huntChecked: { ...previous.huntChecked, [item.id]: false },
                    }))
                  }
                >
                  <span dir="rtl" lang="ar">
                    <Mixed51 text={option} />
                  </span>
                </button>
              ))}
            </div>
            <div className="l51-practice-actions">
              <button
                type="button"
                className="l51-button l51-button--dark"
                disabled={!choice}
                onClick={() =>
                  onChange((previous) => ({
                    ...previous,
                    huntChecked: { ...previous.huntChecked, [item.id]: true },
                  }))
                }
              >
                تحقّق
              </button>
            </div>
            {isChecked && (
              <p className={`l51-hunt-feedback ${correct ? "is-correct" : "is-retry"}`} role="status">
                <strong>{correct ? "✓ إجابة صحيحة. " : "↺ عد إلى النص. "}</strong>
                <Mixed51 text={item.why} />
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   المراجعة الذكية
   ============================================================ */

export function Review51() {
  return (
    <div className="l51-review" data-review>
      <Table51View table={SUMMARY_TABLE_51} />
      <div className="l51-five">
        <span className="l51-mini-label">خمس جمل إذا فهمتها فقد فهمت قلب الدرس</span>
        {FIVE_SENTENCES_51.map((item) => (
          <article className="l51-five-row" key={item.n}>
            <span aria-hidden="true">{item.n}</span>
            <div>
              <p dir="ltr" lang="en">
                {item.en}
              </p>
              <p dir="rtl" lang="ar">
                {item.ar}
              </p>
            </div>
            <span className="l51-five-fn">{item.fn}</span>
          </article>
        ))}
      </div>
      <div className="l51-uses-strip" aria-label="استخدامات الشرط الصفري الخمسة">
        {USES_51.map((use) => (
          <span key={use.n} className="l51-use-chip">
            <b aria-hidden="true">{use.n}</b>
            {use.title}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   الكتابة والتحدث
   ============================================================ */

export const MODEL_51 =
  "I have several habits that affect my daily life. " +
  "If I wake up early, I feel more energetic. " +
  "If I skip breakfast, I get hungry before lunchtime. " +
  "If I feel stressed, I listen to music. " +
  "I also know some important scientific facts. " +
  "If water freezes, it turns into ice. " +
  "If you heat ice, it melts. " +
  "If plants don't receive enough sunlight, they grow poorly. " +
  "At school, if students practise regularly, they improve their skills. " +
  "If a student doesn't pay attention, he misses important information. " +
  "If people exercise regularly, they become healthier.";

function countMatches(text: string, pattern: RegExp): number {
  const matches = text.match(new RegExp(pattern.source, "gi"));
  return matches ? matches.length : 0;
}

export function Writing51({ workspace, onChange }: { workspace: Workspace51; onChange: SetWorkspace }) {
  const text = workspace.writing;
  const lower = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean).length;
  const counts = WRITING_REQUIREMENTS_51.map((requirement) => countMatches(lower, requirement.pattern));
  const met = WRITING_REQUIREMENTS_51.filter((requirement, index) => counts[index] >= requirement.min);
  const connectorsUsed = SPEAKING_CONNECTORS_51.filter((word) => new RegExp(`\\b${word.replace(/ /g, "\\s+")}\\b`, "i").test(workspace.speakingNotes));
  return (
    <div className="l51-writing">
      <div className="l51-writing-head">
        <span className="l51-mini-label">WRITING MISSION</span>
        <span className="l51-tag">
          <bdi dir="ltr">
            {sentences} / 10–12
          </bdi>{" "}
          جملة
        </span>
      </div>
      <p className="l51-instruction">
        اكتب فقرة باللغة الإنجليزية بعنوان <En51>My Everyday Habits and General Facts</En51> من 10 إلى 12 جملة. الفاحص
        أدناه إرشادي: يعدّ الجمل ويبحث عن الصيغ المطلوبة الظاهرة فقط، ولا يقيّم المعنى ولا التصريف ولا جودة الأسلوب.
      </p>
      <div className="l51-writing-checks">
        {WRITING_REQUIREMENTS_51.map((requirement, index) => {
          const isMet = counts[index] >= requirement.min;
          return (
            <div key={requirement.id} className={isMet ? "is-met" : ""}>
              <span aria-hidden="true">{isMet ? "✓" : String(index + 1).padStart(2, "0")}</span>
              <span className="l51-check-body">
                <span>{requirement.ar}</span>
                <En51 className="l51-check-formula">{requirement.en}</En51>
                <span className="l51-check-count">
                  <bdi dir="ltr">
                    {counts[index]} / {requirement.min}+
                  </bdi>
                </span>
              </span>
            </div>
          );
        })}
      </div>
      <p className="l51-writing-meta">
        <span className={sentences >= 10 && sentences <= 12 ? "is-ok" : ""}>الهدف: 10–12 جملة</span>
        <span>
          الشروط المستوفاة:{" "}
          <bdi dir="ltr">
            {met.length} / {WRITING_REQUIREMENTS_51.length}
          </bdi>
        </span>
      </p>
      <label htmlFor="l51-writing-draft">مسودتك الإنجليزية</label>
      <textarea
        id="l51-writing-draft"
        dir="ltr"
        lang="en"
        rows={9}
        value={workspace.writing}
        placeholder="My Everyday Habits and General Facts — If I wake up early…"
        onChange={(event) => onChange((previous) => ({ ...previous, writing: event.target.value }))}
      />
      <div className="l51-speaking">
        <h3>مهمة التحدث — What Happens If...?</h3>
        <p className="l51-instruction">
          تحدث لمدة دقيقة إلى دقيقتين. التطبيق لا يقيّم صوتك آليًا؛ حضّر أفكارك كتابيًا هنا، ثم تحدث بصوت مرتفع دون
          الوقوف عند جمل قصيرة منفصلة. حاول أن تستخدم الشرط الصفري داخل كلام مترابط وطبيعي.
        </p>
        <div className="l51-speaking-situations" role="group" aria-label="اختر موقف التحدث">
          {SPEAKING_SITUATIONS_51.map((situation, index) => (
            <button
              type="button"
              key={situation}
              aria-pressed={workspace.speakingSituation === index}
              onClick={() => onChange((previous) => ({ ...previous, speakingSituation: index }))}
            >
              <En51>{situation}</En51>
            </button>
          ))}
        </div>
        <p className="l51-speaking-chosen">
          موقفك المختار:{" "}
          <strong>
            <En51>{SPEAKING_SITUATIONS_51[workspace.speakingSituation]}</En51>
          </strong>
        </p>
        <p className="l51-instruction">
          لا تكتفِ بإجابة قصيرة مثل <En51>They get tired.</En51> بل وسّع:{" "}
          <En51>
            If people don't sleep enough, they feel tired. They may also find it difficult to concentrate. If this happens
            regularly, their daily performance can become worse.
          </En51>
        </p>
        <span className="l51-mini-label">عبارات انطلاق</span>
        <ol className="l51-speaking-starters">
          {SPEAKING_STARTERS_51.map((starter) => (
            <li key={starter}>
              <En51>{starter}</En51>
            </li>
          ))}
        </ol>
        <p className="l51-instruction">
          اربط أفكارك باستخدام <En51>because</En51> و<En51>so</En51> و<En51>as a result</En51> و<En51>usually</En51>.
        </p>
        <label htmlFor="l51-speaking-notes">ملاحظات تحضير التحدث (بالإنجليزية)</label>
        <textarea
          id="l51-speaking-notes"
          dir="ltr"
          lang="en"
          rows={5}
          value={workspace.speakingNotes}
          placeholder="Prepare your one-to-two-minute talk here…"
          onChange={(event) => onChange((previous) => ({ ...previous, speakingNotes: event.target.value }))}
        />
        <p className="l51-writing-meta" aria-live="polite">
          <span>
            روابط استخدمتها في التحضير:{" "}
            <bdi dir="ltr">
              {connectorsUsed.length} / {SPEAKING_CONNECTORS_51.length}
            </bdi>
          </span>
          {connectorsUsed.length > 0 && <En51>{connectorsUsed.join(", ")}</En51>}
        </p>
      </div>
      <button
        type="button"
        className="l51-button l51-button--outline"
        aria-expanded={workspace.writingModelOpen}
        onClick={() => onChange((previous) => ({ ...previous, writingModelOpen: !previous.writingModelOpen }))}
      >
        {workspace.writingModelOpen ? "إخفاء النموذج الإرشادي" : "عرض نموذج إرشادي"}
      </button>
      {workspace.writingModelOpen && (
        <div className="l51-writing-model">
          <p dir="ltr" lang="en">
            {MODEL_51}
          </p>
          <p className="l51-instruction">
            النموذج استرشادي لتتعلم منه البناء، وليس الإجابة الوحيدة المقبولة. اكتب فقرتك أنت بنفسك.
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   لوحة الإتقان
   ============================================================ */

export const SKILL_OF_SET_51: Record<string, string> = {
  complete: "إكمال الفعل بالشكل الصحيح",
  choose: "اختيار الإجابة الصحيحة",
  classify: "تمييز Zero عن First",
  correct: "تصحيح الأخطاء",
  translate: "الترجمة إلى الإنجليزية",
  detective: "كاشف الأخطاء",
  dialogue: "تحليل الحوار",
};

export function Dashboard51({ workspace, result }: { workspace: Workspace51; result: GradedTestResult51 | null }) {
  const rows = new Map<string, { checked: number; correct: number; total: number }>();
  for (const [setId, items] of Object.entries(PRACTICE_SETS_51)) {
    const skill = SKILL_OF_SET_51[setId] ?? "مهارات أخرى";
    const row = rows.get(skill) ?? { checked: 0, correct: 0, total: 0 };
    for (const item of items) {
      row.total += 1;
      if (workspace.checked[item.id]) {
        row.checked += 1;
        if (gradePractice51(item.id, workspace.answers[item.id] ?? "")) row.correct += 1;
      }
    }
    rows.set(skill, row);
  }
  const checkedTotal = [...rows.values()].reduce((sum, row) => sum + row.checked, 0);
  const correctTotal = [...rows.values()].reduce((sum, row) => sum + row.correct, 0);
  const readingAnswered = Object.values(workspace.readingDrafts).filter((value) => value.trim()).length;
  const causeChecked = Object.values(workspace.causeChecked).filter(Boolean).length;
  const causeCorrect = CAUSE_CASES_51.filter((task) => workspace.causeChecked[task.id] && workspace.cause[task.id] === task.correct).length;
  const factChecked = Object.values(workspace.factChecked).filter(Boolean).length;
  const factCorrect = ZERO_FIRST_PAIRS_51.flatMap((pair) => [`${pair.id}-z`, `${pair.id}-f`]).filter((id) => {
    const expected = id.endsWith("-z") ? "Zero" : "First";
    return workspace.factChecked[id] && workspace.fact[id] === expected;
  }).length;
  const verbChecked = Object.values(workspace.verbChecked).filter(Boolean).length;
  const negChecked = Object.values(workspace.negChecked).filter(Boolean).length;
  const orderChecked = Object.values(workspace.orderChecked).filter(Boolean).length;
  const whenChecked = Object.values(workspace.whenChecked).filter(Boolean).length;
  const modalChecked = Object.values(workspace.modalChecked).filter(Boolean).length;
  const huntChecked = Object.values(workspace.huntChecked).filter(Boolean).length;
  const huntCorrect = READING_HUNT_51.filter((item) => workspace.huntChecked[item.id] && workspace.hunt[item.id] === String(item.correct)).length;
  const writingSentences = workspace.writing.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean).length;
  return (
    <div className="l51-dashboard" data-dashboard>
      <div className="l51-dashboard-summary">
        <div>
          <span className="l51-mini-label">إجابات فحصتها</span>
          <bdi dir="ltr" className="l51-dashboard-big">
            {correctTotal} / {checkedTotal}
          </bdi>
          <p>تُحسب فقط البنود التي ضغطت «تحقّق» عليها. البنود غير المفحوصة لا تُحتسب.</p>
        </div>
        <div>
          <span className="l51-mini-label">الاختبار النهائي</span>
          <bdi dir="ltr" className="l51-dashboard-big">
            {result ? `${result.score} / ${result.total}` : "— / 25"}
          </bdi>
          <p>{result ? "النتيجة مبنية على أسئلة الاختبار الخمسة والعشرين." : "لم تُسلّم الاختبار بعد. عرض الشرائح وحده لا يُكمل الدرس."}</p>
        </div>
        <div>
          <span className="l51-mini-label">الكتابة وأسئلة القراءة</span>
          <bdi dir="ltr" className="l51-dashboard-big">
            {writingSentences} · {readingAnswered} / {READING_QUESTIONS_51.length}
          </bdi>
          <p>جمل كتبتها في مهمة الكتابة، وأسئلة فهم أجبت عنها كتابةً.</p>
        </div>
      </div>
      <div className="l51-dashboard-skills">
        {[...rows.entries()].map(([skill, row]) => {
          const percent = row.checked ? Math.round((row.correct / row.checked) * 100) : 0;
          return (
            <div className="l51-skill-row" key={skill} data-skill={skill}>
              <div className="l51-skill-head">
                <span>{skill}</span>
                <bdi dir="ltr">{row.checked ? `${row.correct} / ${row.checked}` : "لم يُفحص بعد"}</bdi>
              </div>
              <div
                className={`l51-skill-track ${row.checked ? "" : "is-empty"}`}
                role="progressbar"
                aria-label={`${skill}: ${row.checked ? `${row.correct} من ${row.checked}` : "لم يُفحص بعد"}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
              >
                <div style={{ width: `${percent}%` }} />
              </div>
              <p className="l51-skill-note">
                {row.checked
                  ? `${row.correct} إجابة صحيحة من ${row.checked} مفحوصة (من أصل ${row.total} بندًا).`
                  : `${row.total} بندًا متاحًا لم يُفحص منها شيء بعد.`}
              </p>
            </div>
          );
        })}
      </div>
      <div className="l51-dashboard-labs">
        <span className="l51-mini-label">مختبرات تفاعلية فُحصت</span>
        <ul>
          <li>
            مختبر السبب والنتيجة · <bdi dir="ltr">{causeCorrect} / {causeChecked}</bdi> صحيحة من أصل{" "}
            <bdi dir="ltr">{CAUSE_CASES_51.length}</bdi>
          </li>
          <li>
            حقيقة أم مستقبل؟ · <bdi dir="ltr">{factCorrect} / {factChecked}</bdi> صحيحة من أصل{" "}
            <bdi dir="ltr">{ZERO_FIRST_PAIRS_51.length * 2}</bdi>
          </li>
          <li>
            مختبر التصريف · <bdi dir="ltr">{verbChecked}</bdi> تصريفات فُحصت من أصل <bdi dir="ltr">6</bdi>
          </li>
          <li>
            باني النفي · <bdi dir="ltr">{negChecked}</bdi> تركيبات فُحصت من أصل <bdi dir="ltr">{NEG_CASES_51.length}</bdi>
          </li>
          <li>
            إعادة البناء · <bdi dir="ltr">{orderChecked}</bdi> جمل فُحصت من أصل <bdi dir="ltr">{ORDER_TASKS_51.length}</bdi>
          </li>
          <li>
            IF وWHEN · <bdi dir="ltr">{whenChecked}</bdi> مواقف فُحصت من أصل <bdi dir="ltr">{WHEN_CASES_51.length}</bdi>
          </li>
          <li>
            مختبر النتائج · <bdi dir="ltr">{modalChecked}</bdi> نتائج فُحصت من أصل <bdi dir="ltr">{MODAL_CASES_51.length}</bdi>
          </li>
          <li>
            صيد التراكيب · <bdi dir="ltr">{huntCorrect} / {huntChecked}</bdi> صحيحة من أصل{" "}
            <bdi dir="ltr">{READING_HUNT_51.length}</bdi>
          </li>
        </ul>
        <p className="l51-skill-note">
          هذه أعداد إجابات جرى فحصها فعلًا، وليست نسب إتقان مخترعة. المختبرات للتدريب ولا تدخل في درجة الاختبار.
        </p>
      </div>
      {result && (
        <div className="l51-dashboard-levels">
          <span className="l51-mini-label">الاختبار حسب المجموعة</span>
          <ul>
            {[1, 2, 3, 4].map((level) => (
              <li key={level}>
                المجموعة {level} · <bdi dir="ltr">{result.byLevel[level]?.score ?? 0} / {result.byLevel[level]?.total ?? 5}</bdi>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export type { ReactNode };
