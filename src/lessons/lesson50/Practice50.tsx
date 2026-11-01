import { type CSSProperties, type ReactNode } from "react";
import {
  AHMAD_ROWS_50,
  BOOKS_ROWS_50,
  CASE_TASKS_50,
  CERTAINTY_CASES_50,
  COULD_LAB_50,
  COULD_USES_50,
  DIALOGUE_50,
  ERRORS_50,
  FIVE_SENTENCES_50,
  LENS_PAIRS_50,
  READING_50,
  READING_HUNT_50,
  READING_QUESTIONS_50,
  ROOM_CLUES_50,
  SUMMARY_TABLE_50,
  type CertaintyCase50,
  type Tone50,
} from "./data";
import {
  PRACTICE_SETS_50,
  SPEAKING_CONNECTORS_50,
  SPEAKING_SITUATIONS_50,
  SPEAKING_STARTERS_50,
  WRITING_REQUIREMENTS_50,
} from "./practiceData50";
import { gradePractice50, PRACTICE_KEYS_50 } from "./practiceKey50";
import { En50, Gauge50, Mixed50, Mode50, Note50, Table50View, toneClass } from "./kit50";
import type { GradedTestResult50 } from "./testKey50";

export type Workspace50 = {
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  revealed: Record<string, boolean>;
  certainty: Record<string, string>;
  certaintyChecked: Record<string, boolean>;
  cases: Record<string, string>;
  casesChecked: Record<string, boolean>;
  lens: Record<string, "now" | "past" | undefined>;
  could: Record<string, string>;
  couldChecked: Record<string, boolean>;
  decision: { time?: "now" | "past"; certainty?: "strong" | "possible" | "negative"; aspect?: "state" | "event" | "ongoing" };
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

export const initialWorkspace50 = (): Workspace50 => ({
  answers: {},
  checked: {},
  revealed: {},
  certainty: {},
  certaintyChecked: {},
  cases: {},
  casesChecked: {},
  lens: {},
  could: {},
  couldChecked: {},
  decision: {},
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

type SetWorkspace = (update: (previous: Workspace50) => Workspace50) => void;

const isArabic = (value: string) => /[\u0600-\u06ff]/.test(value);

/* ============================================================
   مجموعات التدريب
   ============================================================ */

export function PracticeSet50({
  setId,
  workspace,
  onChange,
}: {
  setId: string;
  workspace: Workspace50;
  onChange: SetWorkspace;
}) {
  const items = PRACTICE_SETS_50[setId] ?? [];
  return (
    <div className="l50-practice-list" data-practice-set={setId}>
      {items.map((item, index) => {
        const value = workspace.answers[item.id] ?? "";
        const checked = Boolean(workspace.checked[item.id]);
        const correct = checked && gradePractice50(item.id, value);
        const key = PRACTICE_KEYS_50[item.id];
        const setValue = (next: string) =>
          onChange((previous) => ({
            ...previous,
            answers: { ...previous.answers, [item.id]: next },
            checked: { ...previous.checked, [item.id]: false },
            revealed: { ...previous.revealed, [item.id]: false },
          }));
        return (
          <section className="l50-practice-card" key={item.id} data-practice-id={item.id}>
            <div className="l50-question-top">
              <span className="l50-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p dir={isArabic(item.prompt) ? "rtl" : "ltr"} lang={isArabic(item.prompt) ? "ar" : "en"}>
                {isArabic(item.prompt) ? <Mixed50 text={item.prompt} /> : item.prompt}
              </p>
            </div>
            {item.instruction && (
              <p className="l50-instruction">
                <Mixed50 text={item.instruction} />
              </p>
            )}
            {item.options ? (
              <div
                className="l50-options"
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
                    <span className="l50-option-letter" aria-hidden="true">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    {isArabic(option) ? (
                      <span dir="rtl" lang="ar">
                        {option}
                      </span>
                    ) : (
                      <En50>{option}</En50>
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
                className="l50-input"
              />
            )}
            <div className="l50-practice-actions">
              <button
                type="button"
                className="l50-button l50-button--dark"
                disabled={!value.trim()}
                onClick={() => onChange((previous) => ({ ...previous, checked: { ...previous.checked, [item.id]: true } }))}
              >
                تحقّق
              </button>
              {checked && !correct && (
                <button
                  type="button"
                  className="l50-button l50-button--outline"
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
              <div role="status" className={`l50-feedback ${correct ? "is-correct" : "is-retry"}`}>
                <strong>{correct ? "✓ إجابة مناسبة" : "↺ راجع الدليل والصيغة وحاول مجددًا"}</strong>
                <p>
                  <Mixed50 text={key.why} />
                </p>
                {workspace.revealed[item.id] && (
                  <p>
                    <strong>نموذج: </strong>
                    <Mixed50 text={key.model} />
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
   غرفة الأدلة (المدخل)
   ============================================================ */

export function IntroRoom50() {
  return (
    <div className="l50-room" data-room>
      <div className="l50-room-clues" aria-label="أدلة الغرفة">
        <span className="l50-clue-pin">🪟 النافذة مفتوحة</span>
        <span className="l50-clue-pin">🌬️ الستائر تتحرك</span>
        <span className="l50-clue-pin">❄️ الهواء بارد</span>
      </div>
      <div className="l50-room-verdicts">
        {ROOM_CLUES_50.map((row) => (
          <article className={`l50-room-card ${toneClass(row.tone)}`} key={row.en}>
            <Mode50 id={row.tone === "strong" ? "strong" : row.tone === "negative" ? "negative" : "possible"} />
            <p dir="ltr" lang="en">
              {row.en}
            </p>
            <p dir="rtl" lang="ar">
              {row.ar}
            </p>
            <span>{row.fn}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   مختبر مقياس الثقة + لوحة الحالات (بطاقة تحقق واحدة مشتركة)
   ============================================================ */

function CaseCard50({
  task,
  index,
  choice,
  isChecked,
  onPick,
  onCheck,
}: {
  task: CertaintyCase50;
  index: number;
  choice?: string;
  isChecked: boolean;
  onPick: (id: string) => void;
  onCheck: () => void;
}) {
  const correct = isChecked && choice === task.correct;
  return (
    <section className={`l50-case-card ${toneClass(task.tone)}`} data-case-id={task.id}>
      <div className="l50-case-scene">
        <span className="l50-case-no" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p dir="ltr" lang="en">
            {task.sceneEn}
          </p>
          <p dir="rtl" lang="ar">
            {task.sceneAr}
          </p>
        </div>
      </div>
      <p className="l50-case-ask">{task.ask}</p>
      <div className="l50-case-options" dir="ltr" role="group" aria-label={`استنتاجات المشهد ${index + 1}`}>
        {task.options.map((option) => (
          <button type="button" key={option.id} aria-pressed={choice === option.id} onClick={() => onPick(option.id)}>
            <En50>{option.en}</En50>
            <span dir="rtl" lang="ar">
              {option.note}
            </span>
          </button>
        ))}
      </div>
      <div className="l50-practice-actions">
        <button type="button" className="l50-button l50-button--dark" disabled={!choice} onClick={onCheck}>
          تحقّق من الدرجة
        </button>
      </div>
      {isChecked && (
        <div role="status" className={`l50-feedback ${correct ? "is-correct" : "is-retry"}`}>
          <strong>{correct ? "✓ درجة مطابقة للدليل. " : "↺ الدرجة لا تطابق قوة الأدلة. "}</strong>
          <p>
            <Mixed50 text={task.why} />
          </p>
          <Gauge50 active={task.correct === "cant" ? "cant" : task.correct === "must" ? "must" : "might"} />
        </div>
      )}
    </section>
  );
}

export function CertaintyLab50({ workspace, onChange }: { workspace: Workspace50; onChange: SetWorkspace }) {
  const done = Object.values(workspace.certaintyChecked).filter(Boolean).length;
  return (
    <div className="l50-certainty-lab" data-certainty-lab>
      <Gauge50 />
      <div className="l50-practice-meta">
        <span className="l50-tag">
          <bdi dir="ltr">
            {done} / {CERTAINTY_CASES_50.length}
          </bdi>{" "}
          مشاهد فُحصت
        </span>
        <span>التفسير لا يظهر قبل الضغط على «تحقّق من الدرجة».</span>
      </div>
      {CERTAINTY_CASES_50.map((task, index) => (
        <CaseCard50
          key={task.id}
          task={task}
          index={index}
          choice={workspace.certainty[task.id]}
          isChecked={Boolean(workspace.certaintyChecked[task.id])}
          onPick={(id) =>
            onChange((previous) => ({
              ...previous,
              certainty: { ...previous.certainty, [task.id]: id },
              certaintyChecked: { ...previous.certaintyChecked, [task.id]: false },
            }))
          }
          onCheck={() =>
            onChange((previous) => ({
              ...previous,
              certaintyChecked: { ...previous.certaintyChecked, [task.id]: true },
            }))
          }
        />
      ))}
    </div>
  );
}

export function CaseBoard50({
  group,
  workspace,
  onChange,
}: {
  group: "ahmad" | "books";
  workspace: Workspace50;
  onChange: SetWorkspace;
}) {
  const rows = group === "ahmad" ? AHMAD_ROWS_50 : BOOKS_ROWS_50;
  const tasks = CASE_TASKS_50.filter((task) => task.id.startsWith(group === "ahmad" ? "ah" : "bk"));
  return (
    <div className="l50-case-board" data-case-board={group}>
      <div className="l50-board-pins" aria-label={group === "ahmad" ? "درجات التعبير عن غياب أحمد" : "استنتاجات حول حامل الكتب"}>
        {rows.map((row) => (
          <article className={`l50-pin-card ${toneClass(row.tone)}`} key={row.en}>
            <span className="l50-pin" aria-hidden="true" />
            <Mode50 id={row.tone === "strong" ? "strong" : row.tone === "negative" ? "negative" : "possible"} />
            <p dir="ltr" lang="en">
              {row.en}
            </p>
            <p dir="rtl" lang="ar">
              {row.ar}
            </p>
          </article>
        ))}
      </div>
      <p className="l50-instruction">الآن نفّذ المهمتين بنفسك: اقرأ المطلوب بدقة، ثم اختر الجملة التي تطابقه.</p>
      {tasks.map((task, index) => (
        <CaseCard50
          key={task.id}
          task={task}
          index={index}
          choice={workspace.cases[task.id]}
          isChecked={Boolean(workspace.casesChecked[task.id])}
          onPick={(id) =>
            onChange((previous) => ({
              ...previous,
              cases: { ...previous.cases, [task.id]: id },
              casesChecked: { ...previous.casesChecked, [task.id]: false },
            }))
          }
          onCheck={() =>
            onChange((previous) => ({
              ...previous,
              casesChecked: { ...previous.casesChecked, [task.id]: true },
            }))
          }
        />
      ))}
    </div>
  );
}

/* ============================================================
   عدستا الزمن
   ============================================================ */

export function LensLab50({ workspace, onChange }: { workspace: Workspace50; onChange: SetWorkspace }) {
  const explored = LENS_PAIRS_50.filter((pair) => workspace.lens[pair.id] === "past").length;
  return (
    <div className="l50-lens-lab" data-lens-lab>
      <div className="l50-practice-meta">
        <span className="l50-tag">
          <bdi dir="ltr">
            {explored} / {LENS_PAIRS_50.length}
          </bdi>{" "}
          أزواج نظرت إليها بعدسة الماضي
        </span>
        <span>بدّل العدسة في كل زوج، ولاحظ تغيّر الزمن دون تغيّر درجة التأكد.</span>
      </div>
      {LENS_PAIRS_50.map((pair, index) => {
        const side = workspace.lens[pair.id] ?? "now";
        const active = side === "past" ? pair.past : pair.now;
        return (
          <section className={`l50-lens-pair ${toneClass(pair.tone)}`} key={pair.id} data-lens-pair={pair.id}>
            <div className="l50-lens-switch" role="group" aria-label={`عدسة الزوج ${index + 1}`}>
              <button
                type="button"
                aria-pressed={side === "now"}
                onClick={() => onChange((previous) => ({ ...previous, lens: { ...previous.lens, [pair.id]: "now" } }))}
              >
                🔵 عدسة الآن
              </button>
              <button
                type="button"
                aria-pressed={side === "past"}
                onClick={() => onChange((previous) => ({ ...previous, lens: { ...previous.lens, [pair.id]: "past" } }))}
              >
                🟠 عدسة الماضي
              </button>
            </div>
            <div className="l50-lens-sentence">
              <span className="l50-lens-badge" aria-hidden="true">
                {side === "past" ? "PAST" : "NOW"}
              </span>
              <p dir="ltr" lang="en">
                {active.en}
              </p>
              <p dir="rtl" lang="ar">
                {active.ar}
              </p>
            </div>
            <p className="l50-lens-other">
              <span>{side === "past" ? "بالعدسة الأخرى:" : "جرّب العدسة الأخرى لترى:"}</span>{" "}
              <En50>{side === "past" ? pair.now.en : pair.past.en}</En50>
            </p>
          </section>
        );
      })}
      <Note50 icon="👓" text="في عدسة الماضي تظهر HAVE، وإذا كان الفعل الأصلي BE تظهر بعده BEEN. درجة التأكد نفسها لا تتغير." />
    </div>
  );
}

/* ============================================================
   وجوه COULD + مختبرها
   ============================================================ */

export function CouldUses50() {
  return (
    <div className="l50-could-uses" data-could-uses>
      {COULD_USES_50.map((use) => (
        <article className={`l50-could-card ${toneClass(use.tone)}`} key={use.id} data-could-use={use.id}>
          <span className="l50-could-n" aria-hidden="true">
            {use.n}
          </span>
          <h3>{use.title}</h3>
          <p dir="ltr" lang="en">
            {use.en}
          </p>
          <p dir="rtl" lang="ar">
            {use.ar}
          </p>
          <span>{use.cue}</span>
        </article>
      ))}
    </div>
  );
}

export function CouldLab50({ workspace, onChange }: { workspace: Workspace50; onChange: SetWorkspace }) {
  const done = Object.values(workspace.couldChecked).filter(Boolean).length;
  return (
    <div className="l50-could-lab" data-could-lab>
      <div className="l50-practice-meta">
        <span className="l50-tag">
          <bdi dir="ltr">
            {done} / {COULD_LAB_50.length}
          </bdi>{" "}
          جمل صُنّفت
        </span>
        <span>اختر الوظيفة، ثم تحقق. دليل السياق مذكور في التفسير.</span>
      </div>
      {COULD_LAB_50.map((item, index) => {
        const choice = workspace.could[item.id];
        const isChecked = Boolean(workspace.couldChecked[item.id]);
        const correct = isChecked && choice === item.correct;
        return (
          <section className="l50-could-item" key={item.id} data-could-item={item.id}>
            <div className="l50-question-top">
              <span className="l50-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p dir="ltr" lang="en">
                {item.en}
              </p>
            </div>
            <div className="l50-could-options" role="group" aria-label={`وظيفة COULD في الجملة ${index + 1}`}>
              {COULD_USES_50.map((use) => (
                <button
                  type="button"
                  key={use.id}
                  aria-pressed={choice === use.id}
                  onClick={() =>
                    onChange((previous) => ({
                      ...previous,
                      could: { ...previous.could, [item.id]: use.id },
                      couldChecked: { ...previous.couldChecked, [item.id]: false },
                    }))
                  }
                >
                  <span aria-hidden="true">{use.n}</span> {use.title}
                </button>
              ))}
            </div>
            <div className="l50-practice-actions">
              <button
                type="button"
                className="l50-button l50-button--dark"
                disabled={!choice}
                onClick={() =>
                  onChange((previous) => ({
                    ...previous,
                    couldChecked: { ...previous.couldChecked, [item.id]: true },
                  }))
                }
              >
                تحقّق
              </button>
            </div>
            {isChecked && (
              <div role="status" className={`l50-feedback ${correct ? "is-correct" : "is-retry"}`}>
                <strong>{correct ? "✓ تصنيف صحيح. " : "↺ ليست هذه الوظيفة هنا. "}</strong>
                <p>
                  <Mixed50 text={item.why} />
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
   صانع القرار
   ============================================================ */

type DecisionKey = `${"now" | "past"}-${"strong" | "possible" | "negative"}-${"state" | "event" | "ongoing"}`;

const DECISION_EXAMPLES_50: Record<DecisionKey, { en: string; ar: string }> = {
  "now-strong-state": { en: "She must be tired.", ar: "لا بد أنها متعبة." },
  "now-strong-event": { en: "He must know the answer.", ar: "لا بد أنه يعرف الإجابة." },
  "now-strong-ongoing": { en: "He must be sleeping.", ar: "لا بد أنه نائم الآن." },
  "now-possible-state": { en: "She might be at home.", ar: "ربما تكون في المنزل." },
  "now-possible-event": { en: "He might come later.", ar: "ربما يأتي لاحقًا." },
  "now-possible-ongoing": { en: "She might be talking to her teacher.", ar: "ربما تتحدث مع معلمتها." },
  "now-negative-state": { en: "He can't be at home.", ar: "لا يمكن أن يكون في المنزل." },
  "now-negative-event": { en: "They can't know the answer.", ar: "لا يمكن أنهم يعرفون الإجابة." },
  "now-negative-ongoing": { en: "He can't be sleeping.", ar: "لا يمكن أن يكون نائمًا." },
  "past-strong-state": { en: "He must have been busy.", ar: "لا بد أنه كان مشغولًا." },
  "past-strong-event": { en: "It must have rained last night.", ar: "لا بد أن المطر هطل الليلة الماضية." },
  "past-strong-ongoing": { en: "He must have been sleeping when I called.", ar: "لا بد أنه كان نائمًا عندما اتصلت." },
  "past-possible-state": { en: "They may have been busy.", ar: "ربما كانوا مشغولين." },
  "past-possible-event": { en: "She may have forgotten her appointment.", ar: "ربما نسيت موعدها." },
  "past-possible-ongoing": { en: "She might have been studying at the library.", ar: "ربما كانت تدرس في المكتبة." },
  "past-negative-state": { en: "He can't have been serious.", ar: "لا يمكن أنه كان جادًا." },
  "past-negative-event": { en: "He can't have stolen the car.", ar: "لا يمكن أنه سرق السيارة." },
  "past-negative-ongoing": { en: "He can't have been driving at that time.", ar: "لا يمكن أنه كان يقود في ذلك الوقت." },
};

function decisionFormula(time: "now" | "past", certainty: "strong" | "possible" | "negative", aspect: "state" | "event" | "ongoing"): string {
  const modal = certainty === "strong" ? "MUST" : certainty === "negative" ? "CAN'T" : "MIGHT";
  if (time === "now") {
    if (aspect === "state") return `${modal} + BE + adjective`;
    if (aspect === "event") return `${modal} + V1`;
    return `${modal} + BE + V-ing`;
  }
  if (aspect === "state") return `${modal} + HAVE BEEN + adjective`;
  if (aspect === "event") return `${modal} + HAVE + V3`;
  return `${modal} + HAVE BEEN + V-ing`;
}

export function DecisionLab50({ workspace, onChange }: { workspace: Workspace50; onChange: SetWorkspace }) {
  const { time, certainty, aspect } = workspace.decision;
  const set = (patch: Partial<Workspace50["decision"]>) =>
    onChange((previous) => ({ ...previous, decision: { ...previous.decision, ...patch } }));
  const complete = Boolean(time && certainty && aspect);
  const example = complete ? DECISION_EXAMPLES_50[`${time}-${certainty}-${aspect}` as DecisionKey] : null;
  const tone: Tone50 = certainty === "strong" ? "strong" : certainty === "negative" ? "negative" : "possible";
  return (
    <div className="l50-decision" data-decision-lab>
      <section className="l50-decision-step">
        <h3>
          <span aria-hidden="true">①</span> هل تتحدث عن الحاضر أم الماضي؟
        </h3>
        <div className="l50-decision-options" role="group" aria-label="اختر الزمن">
          <button type="button" aria-pressed={time === "now"} onClick={() => set({ time: "now" })}>
            🔵 الآن — <En50>BE / V1</En50>
          </button>
          <button type="button" aria-pressed={time === "past"} onClick={() => set({ time: "past" })}>
            🟠 الماضي — <En50>HAVE + V3</En50>
          </button>
        </div>
      </section>
      <section className="l50-decision-step">
        <h3>
          <span aria-hidden="true">②</span> ما درجة تأكدك؟
        </h3>
        <div className="l50-decision-options" role="group" aria-label="اختر درجة التأكد">
          <button type="button" aria-pressed={certainty === "strong"} onClick={() => set({ certainty: "strong" })}>
            ● دليل قوي مع الفكرة — <En50>MUST</En50>
          </button>
          <button type="button" aria-pressed={certainty === "possible"} onClick={() => set({ certainty: "possible" })}>
            ◐ احتمال — <En50>MAY / MIGHT / COULD</En50>
          </button>
          <button type="button" aria-pressed={certainty === "negative"} onClick={() => set({ certainty: "negative" })}>
            ✕ دليل قوي ضد الفكرة — <En50>CAN'T</En50>
          </button>
        </div>
      </section>
      <section className="l50-decision-step">
        <h3>
          <span aria-hidden="true">③</span> هل الحدث مستمر أم منتهٍ؟
        </h3>
        <div className="l50-decision-options" role="group" aria-label="اختر طبيعة الحدث">
          <button type="button" aria-pressed={aspect === "state"} onClick={() => set({ aspect: "state" })}>
            حالة أو صفة — <En50>BE + adjective</En50>
          </button>
          <button type="button" aria-pressed={aspect === "event"} onClick={() => set({ aspect: "event" })}>
            حدث — <En50>V1 / V3</En50>
          </button>
          <button type="button" aria-pressed={aspect === "ongoing"} onClick={() => set({ aspect: "ongoing" })}>
            نشاط مستمر — <En50>BE + V-ing</En50>
          </button>
        </div>
      </section>
      <div className={`l50-decision-result ${toneClass(tone)}`} data-decision-result aria-live="polite">
        {complete && example && time && certainty && aspect ? (
          <>
            <span className="l50-mini-label">التركيب المناسب لقراراتك</span>
            <p className="l50-decision-formula" dir="ltr" lang="en">
              {decisionFormula(time, certainty, aspect)}
            </p>
            <p dir="ltr" lang="en" className="l50-decision-example">
              {example.en}
            </p>
            <p dir="rtl" lang="ar">
              {example.ar}
            </p>
            <Mode50 id={certainty} />
          </>
        ) : (
          <p>أكمل الأسئلة الثلاثة، وسيظهر التركيب هنا فورًا مع مثال من الدرس.</p>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   جدار الأخطاء
   ============================================================ */

export function ErrorsWall50() {
  return (
    <div className="l50-errors" data-errors-wall>
      {ERRORS_50.map((error) => (
        <article className={`l50-error-card ${toneClass(error.tone)}`} key={error.n} data-error={error.n}>
          <header>
            <span aria-hidden="true">{error.n}</span>
            <h3>{error.title}</h3>
          </header>
          <p className="l50-error-bad" dir="ltr" lang="en">
            {error.bad}
          </p>
          <p className="l50-error-good" dir="ltr" lang="en">
            {error.good}
          </p>
          <p dir="rtl" lang="ar">
            <Mixed50 text={error.why} />
          </p>
        </article>
      ))}
    </div>
  );
}

/* ============================================================
   الحوار
   ============================================================ */

const SPEAKER_COLORS_50 = ["#0e7c5b", "#5b4cc4"];

function speakerStyle50(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return { "--speaker": SPEAKER_COLORS_50[hash % SPEAKER_COLORS_50.length] } as CSSProperties;
}

export function Dialogue50View({ workspace, onChange }: { workspace: Workspace50; onChange: SetWorkspace }) {
  const dialogue = DIALOGUE_50;
  return (
    <div className={`l50-dialogue ${toneClass(dialogue.tone)}`} data-dialogue="main">
      <div className="l50-dialogue-head">
        <span className="l50-dialogue-label">
          <span aria-hidden="true">◉</span> REAL-LIFE DIALOGUE · <En50>{dialogue.turns.length} TURNS</En50>
        </span>
        <button
          type="button"
          className="l50-text-button"
          aria-expanded={workspace.dialogueAr}
          onClick={() => onChange((previous) => ({ ...previous, dialogueAr: !previous.dialogueAr }))}
        >
          {workspace.dialogueAr ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      <p className="l50-dialogue-setting">
        <En50>{dialogue.title}</En50> — <Mixed50 text={dialogue.setting} />
      </p>
      {dialogue.turns.map((turn, index) => (
        <div className="l50-turn" key={`${turn.speaker}-${index}`}>
          <span className="l50-avatar" style={speakerStyle50(turn.speaker)} aria-hidden="true">
            {turn.speaker.slice(0, 1)}
          </span>
          <div className="l50-bubble">
            <span className="l50-speaker">
              <Mixed50 text={`${turn.speaker}${turn.fn ? ` · ${turn.fn}` : ""}`} />
            </span>
            <p dir="ltr" lang="en">
              {turn.en}
            </p>
            {workspace.dialogueAr && (
              <p className="l50-turn-ar" dir="rtl" lang="ar">
                <Mixed50 text={turn.ar} />
              </p>
            )}
          </div>
        </div>
      ))}
      <div className="l50-dialogue-analysis">
        <span className="l50-mini-label">تحليل التراكيب</span>
        <ul>
          {dialogue.analysis.map((entry) => (
            <li key={entry.modal}>
              <En50>{entry.modal}</En50>
              <span>{entry.ar}</span>
              <En50 className="l50-analysis-fn">{entry.fn}</En50>
            </li>
          ))}
        </ul>
      </div>
      <div className="l50-dialogue-lab">
        <div className="l50-practice-meta">
          <span className="l50-tag">حلل بنفسك</span>
          <span>
            <Mixed50 text={dialogue.labPrompt} />
          </span>
        </div>
        <PracticeSet50 setId={dialogue.labId} workspace={workspace} onChange={onChange} />
      </div>
    </div>
  );
}

/* ============================================================
   القراءة
   ============================================================ */

export function Reading50View({ workspace, onChange }: { workspace: Workspace50; onChange: SetWorkspace }) {
  return (
    <div className="l50-reading" data-reading>
      <div className="l50-reading-head">
        <div>
          <span className="l50-mini-label">READING</span>
          <p dir="ltr" lang="en">
            The Strange Noise — deduction after deduction, one small cat
          </p>
        </div>
        <button
          type="button"
          className="l50-button l50-button--outline"
          aria-expanded={workspace.showTranslation}
          onClick={() => onChange((previous) => ({ ...previous, showTranslation: !previous.showTranslation }))}
        >
          {workspace.showTranslation ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      <div className="l50-reading-body">
        {READING_50.map((part, index) => (
          <div className="l50-reading-paragraph" key={part.en}>
            <span className="l50-reading-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p dir="ltr" lang="en">
              {part.en}
            </p>
            {workspace.showTranslation && (
              <p className="l50-reading-ar" dir="rtl" lang="ar">
                <Mixed50 text={part.ar} />
              </p>
            )}
          </div>
        ))}
      </div>
      <Note50 icon="🔍" text="قبل الترجمة، جرّب أن تعثر بنفسك على جمل الاستنتاج القوي والاحتمال والنفي القوي داخل القصة." />
    </div>
  );
}

export function ReadingQuestions50({ workspace, onChange }: { workspace: Workspace50; onChange: SetWorkspace }) {
  const answered = Object.values(workspace.readingDrafts).filter((value) => value.trim()).length;
  return (
    <div className="l50-reading-questions">
      <div className="l50-practice-meta">
        <span className="l50-tag">
          <bdi dir="ltr">
            {answered} / {READING_QUESTIONS_50.length}
          </bdi>{" "}
          إجابات مكتوبة
        </span>
        <span>النماذج لا تُعرض قبل الضغط على «قارن بالإجابة النموذجية».</span>
      </div>
      {READING_QUESTIONS_50.map((item, index) => (
        <section className="l50-reading-q" key={item.q} data-reading-q={index + 1}>
          <div className="l50-reading-q-top">
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <p dir="ltr" lang="en">
              {item.q}
            </p>
          </div>
          <input
            type="text"
            dir="ltr"
            lang="en"
            className="l50-input"
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
          <div className="l50-reading-actions">
            <button
              type="button"
              className="l50-button l50-button--outline"
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
            <div className="l50-answer-model">
              <p dir="ltr" lang="en">
                {item.answer}
              </p>
              <p dir="rtl" lang="ar">
                <Mixed50 text={item.ar} />
              </p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export function ReadingHunt50({ workspace, onChange }: { workspace: Workspace50; onChange: SetWorkspace }) {
  const checked = Object.values(workspace.huntChecked).filter(Boolean).length;
  return (
    <div className="l50-hunt" data-reading-hunt>
      <div className="l50-practice-meta">
        <span className="l50-tag">
          <bdi dir="ltr">
            {checked} / {READING_HUNT_50.length}
          </bdi>{" "}
          أسئلة فُحصت
        </span>
        <span>اختر، ثم اضغط «تحقّق» — لا يظهر التفسير قبل المحاولة.</span>
      </div>
      {READING_HUNT_50.map((item, index) => {
        const choice = workspace.hunt[item.id];
        const isChecked = Boolean(workspace.huntChecked[item.id]);
        const correct = isChecked && choice === String(item.correct);
        return (
          <section className="l50-hunt-q" key={item.id} data-hunt-q={index + 1}>
            <p>
              <strong>{String(index + 1).padStart(2, "0")} · </strong>
              <Mixed50 text={item.q} />
            </p>
            <div className="l50-hunt-options" role="group" aria-label={`خيارات سؤال الصيد ${index + 1}`}>
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
                    <Mixed50 text={option} />
                  </span>
                </button>
              ))}
            </div>
            <div className="l50-practice-actions">
              <button
                type="button"
                className="l50-button l50-button--dark"
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
              <p className={`l50-hunt-feedback ${correct ? "is-correct" : "is-retry"}`} role="status">
                <strong>{correct ? "✓ إجابة صحيحة. " : "↺ عد إلى القصة. "}</strong>
                <Mixed50 text={item.why} />
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

export function Review50() {
  return (
    <div className="l50-review" data-review>
      <Table50View table={SUMMARY_TABLE_50} />
      <div className="l50-five">
        <span className="l50-mini-label">خمس جمل إذا فهمتها فقد فهمت قلب الدرس</span>
        {FIVE_SENTENCES_50.map((item) => (
          <article className="l50-five-row" key={item.n}>
            <span aria-hidden="true">{item.n}</span>
            <div>
              <p dir="ltr" lang="en">
                {item.en}
              </p>
              <p dir="rtl" lang="ar">
                {item.ar}
              </p>
            </div>
            <span className="l50-five-fn">{item.fn}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   الكتابة والتحدث
   ============================================================ */

export const MODEL_50 =
  "When I arrived at school, the classroom was empty. " +
  "The students must be in the playground. " +
  "The teacher might be in the teachers' room. " +
  "The window is open, so someone could have opened it earlier. " +
  "The books are on the floor. " +
  "Someone must have dropped them. " +
  "A student's bag is missing, but he can't have taken it home because I saw him carrying it yesterday. " +
  "Perhaps he might have forgotten it somewhere.";

function countMatches(text: string, pattern: RegExp): number {
  const matches = text.match(new RegExp(pattern.source, "gi"));
  return matches ? matches.length : 0;
}

export function Writing50({ workspace, onChange }: { workspace: Workspace50; onChange: SetWorkspace }) {
  const text = workspace.writing;
  const lower = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean).length;
  const counts = WRITING_REQUIREMENTS_50.map((requirement) => countMatches(lower, requirement.pattern));
  const met = WRITING_REQUIREMENTS_50.filter((requirement, index) => counts[index] >= requirement.min);
  const connectorsUsed = SPEAKING_CONNECTORS_50.filter((word) => new RegExp(`\\b${word}\\b`, "i").test(workspace.speakingNotes));
  return (
    <div className="l50-writing">
      <div className="l50-writing-head">
        <span className="l50-mini-label">WRITING MISSION</span>
        <span className="l50-tag">
          <bdi dir="ltr">
            {sentences} / 10–12
          </bdi>{" "}
          جملة
        </span>
      </div>
      <div className="l50-scene-board" aria-label="أدلة مشهد الكتابة">
        <span>🚪 الفصل فارغ</span>
        <span>📚 الكتب على الأرض</span>
        <span>🪟 النافذة مفتوحة</span>
        <span>🎒 حقيبة أحد الطلاب مفقودة</span>
        <span>🧑‍🏫 المعلم غير موجود</span>
      </div>
      <p className="l50-instruction">
        اكتب فقرة من 10 إلى 12 جملة بعنوان <En50>What Might Have Happened?</En50> تفسّر فيها الأدلة الخمسة. الفاحص أدناه
        إرشادي: يعدّ الجمل ويبحث عن الصيغ المطلوبة الظاهرة فقط، ولا يقيّم المعنى ولا التصريف ولا جودة التفسير.
      </p>
      <div className="l50-writing-checks">
        {WRITING_REQUIREMENTS_50.map((requirement, index) => {
          const isMet = counts[index] >= requirement.min;
          return (
            <div key={requirement.id} className={isMet ? "is-met" : ""}>
              <span aria-hidden="true">{isMet ? "✓" : String(index + 1).padStart(2, "0")}</span>
              <span className="l50-check-body">
                <span>{requirement.ar}</span>
                <En50 className="l50-check-formula">{requirement.en}</En50>
                <span className="l50-check-count">
                  <bdi dir="ltr">
                    {counts[index]} / {requirement.min}+
                  </bdi>
                </span>
              </span>
            </div>
          );
        })}
      </div>
      <p className="l50-writing-meta">
        <span className={sentences >= 10 && sentences <= 12 ? "is-ok" : ""}>الهدف: 10–12 جملة</span>
        <span>
          الشروط المستوفاة:{" "}
          <bdi dir="ltr">
            {met.length} / {WRITING_REQUIREMENTS_50.length}
          </bdi>
        </span>
      </p>
      <label htmlFor="l50-writing-draft">مسودتك الإنجليزية</label>
      <textarea
        id="l50-writing-draft"
        dir="ltr"
        lang="en"
        rows={9}
        value={workspace.writing}
        placeholder="What might have happened? When I arrived…"
        onChange={(event) => onChange((previous) => ({ ...previous, writing: event.target.value }))}
      />
      <div className="l50-speaking">
        <h3>مهمة التحدث — دقيقتان</h3>
        <p className="l50-instruction">
          تحدث عن موقف غامض وحاول أن تفسر ما حدث. التطبيق لا يقيّم صوتك آليًا؛ حضّر أفكارك كتابيًا هنا، ثم تحدث بصوت
          مرتفع دقيقتين كاملتين دون الوقوف عند جمل قصيرة منفصلة.
        </p>
        <div className="l50-speaking-situations" role="group" aria-label="اختر موقف التحدث">
          {SPEAKING_SITUATIONS_50.map((situation, index) => (
            <button
              type="button"
              key={situation}
              aria-pressed={workspace.speakingSituation === index}
              onClick={() => onChange((previous) => ({ ...previous, speakingSituation: index }))}
            >
              {situation}
            </button>
          ))}
        </div>
        <p className="l50-speaking-chosen">
          موقفك المختار: <strong>{SPEAKING_SITUATIONS_50[workspace.speakingSituation]}</strong>
        </p>
        <span className="l50-mini-label">عبارات انطلاق</span>
        <ol className="l50-speaking-starters">
          {SPEAKING_STARTERS_50.map((starter) => (
            <li key={starter}>
              <En50>{starter}</En50>
            </li>
          ))}
        </ol>
        <p className="l50-instruction">
          اربط أفكارك باستخدام <En50>because</En50> و<En50>so</En50> و<En50>but</En50> و<En50>although</En50>.
        </p>
        <label htmlFor="l50-speaking-notes">ملاحظات تحضير التحدث (بالإنجليزية)</label>
        <textarea
          id="l50-speaking-notes"
          dir="ltr"
          lang="en"
          rows={5}
          value={workspace.speakingNotes}
          placeholder="Prepare your two-minute explanation here…"
          onChange={(event) => onChange((previous) => ({ ...previous, speakingNotes: event.target.value }))}
        />
        <p className="l50-writing-meta" aria-live="polite">
          <span>
            روابط استخدمتها في التحضير:{" "}
            <bdi dir="ltr">
              {connectorsUsed.length} / {SPEAKING_CONNECTORS_50.length}
            </bdi>
          </span>
          {connectorsUsed.length > 0 && <En50>{connectorsUsed.join(", ")}</En50>}
        </p>
      </div>
      <button
        type="button"
        className="l50-button l50-button--outline"
        aria-expanded={workspace.writingModelOpen}
        onClick={() => onChange((previous) => ({ ...previous, writingModelOpen: !previous.writingModelOpen }))}
      >
        {workspace.writingModelOpen ? "إخفاء النموذج الإرشادي" : "عرض نموذج إرشادي"}
      </button>
      {workspace.writingModelOpen && (
        <div className="l50-writing-model">
          <p dir="ltr" lang="en">
            {MODEL_50}
          </p>
          <p className="l50-instruction">النموذج استرشادي لتتعلم منه البناء، وليس الإجابة الوحيدة المقبولة. اكتب تفسيرك أنت للأدلة.</p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   لوحة الإتقان
   ============================================================ */

export const SKILL_OF_SET_50: Record<string, string> = {
  choose: "اختيار الكلمة المناسبة",
  complete: "إكمال التركيب",
  classify: "تحديد الزمن والمعنى",
  correct: "تصحيح الأخطاء",
  translate: "الترجمة إلى الإنجليزية",
  detective: "محقق الأخطاء",
  dialogue: "تحليل الحوار",
};

export function Dashboard50({ workspace, result }: { workspace: Workspace50; result: GradedTestResult50 | null }) {
  const rows = new Map<string, { checked: number; correct: number; total: number }>();
  for (const [setId, items] of Object.entries(PRACTICE_SETS_50)) {
    const skill = SKILL_OF_SET_50[setId] ?? "مهارات أخرى";
    const row = rows.get(skill) ?? { checked: 0, correct: 0, total: 0 };
    for (const item of items) {
      row.total += 1;
      if (workspace.checked[item.id]) {
        row.checked += 1;
        if (gradePractice50(item.id, workspace.answers[item.id] ?? "")) row.correct += 1;
      }
    }
    rows.set(skill, row);
  }
  const checkedTotal = [...rows.values()].reduce((sum, row) => sum + row.checked, 0);
  const correctTotal = [...rows.values()].reduce((sum, row) => sum + row.correct, 0);
  const readingAnswered = Object.values(workspace.readingDrafts).filter((value) => value.trim()).length;
  const certaintyChecked = Object.values(workspace.certaintyChecked).filter(Boolean).length;
  const certaintyCorrect = CERTAINTY_CASES_50.filter(
    (task) => workspace.certaintyChecked[task.id] && workspace.certainty[task.id] === task.correct,
  ).length;
  const casesChecked = Object.values(workspace.casesChecked).filter(Boolean).length;
  const casesCorrect = CASE_TASKS_50.filter(
    (task) => workspace.casesChecked[task.id] && workspace.cases[task.id] === task.correct,
  ).length;
  const couldChecked = Object.values(workspace.couldChecked).filter(Boolean).length;
  const couldCorrect = COULD_LAB_50.filter(
    (item) => workspace.couldChecked[item.id] && workspace.could[item.id] === item.correct,
  ).length;
  const huntChecked = Object.values(workspace.huntChecked).filter(Boolean).length;
  const huntCorrect = READING_HUNT_50.filter(
    (item) => workspace.huntChecked[item.id] && workspace.hunt[item.id] === String(item.correct),
  ).length;
  const lensExplored = LENS_PAIRS_50.filter((pair) => workspace.lens[pair.id] === "past").length;
  const writingSentences = workspace.writing.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean).length;
  return (
    <div className="l50-dashboard" data-dashboard>
      <div className="l50-dashboard-summary">
        <div>
          <span className="l50-mini-label">إجابات فحصتها</span>
          <bdi dir="ltr" className="l50-dashboard-big">
            {correctTotal} / {checkedTotal}
          </bdi>
          <p>تُحسب فقط البنود التي ضغطت «تحقّق» عليها. البنود غير المفحوصة لا تُحتسب.</p>
        </div>
        <div>
          <span className="l50-mini-label">الاختبار النهائي</span>
          <bdi dir="ltr" className="l50-dashboard-big">
            {result ? `${result.score} / ${result.total}` : "— / 25"}
          </bdi>
          <p>{result ? "النتيجة مبنية على أسئلة الاختبار الخمسة والعشرين." : "لم تُسلّم الاختبار بعد. عرض الشرائح وحده لا يُكمل الدرس."}</p>
        </div>
        <div>
          <span className="l50-mini-label">الكتابة وأسئلة القراءة</span>
          <bdi dir="ltr" className="l50-dashboard-big">
            {writingSentences} · {readingAnswered} / {READING_QUESTIONS_50.length}
          </bdi>
          <p>جمل كتبتها في مهمة الكتابة، وأسئلة فهم أجبت عنها كتابةً.</p>
        </div>
      </div>
      <div className="l50-dashboard-skills">
        {[...rows.entries()].map(([skill, row]) => {
          const percent = row.checked ? Math.round((row.correct / row.checked) * 100) : 0;
          return (
            <div className="l50-skill-row" key={skill} data-skill={skill}>
              <div className="l50-skill-head">
                <span>{skill}</span>
                <bdi dir="ltr">{row.checked ? `${row.correct} / ${row.checked}` : "لم يُفحص بعد"}</bdi>
              </div>
              <div
                className={`l50-skill-track ${row.checked ? "" : "is-empty"}`}
                role="progressbar"
                aria-label={`${skill}: ${row.checked ? `${row.correct} من ${row.checked}` : "لم يُفحص بعد"}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
              >
                <div style={{ width: `${percent}%` }} />
              </div>
              <p className="l50-skill-note">
                {row.checked
                  ? `${row.correct} إجابة صحيحة من ${row.checked} مفحوصة (من أصل ${row.total} بندًا).`
                  : `${row.total} بندًا متاحًا لم يُفحص منها شيء بعد.`}
              </p>
            </div>
          );
        })}
      </div>
      <div className="l50-dashboard-labs">
        <span className="l50-mini-label">مختبرات تفاعلية فُحصت</span>
        <ul>
          <li>
            Certainty Gauge · <bdi dir="ltr">{certaintyCorrect} / {certaintyChecked}</bdi> صحيحة من أصل{" "}
            <bdi dir="ltr">{CERTAINTY_CASES_50.length}</bdi>
          </li>
          <li>
            Evidence Cases · <bdi dir="ltr">{casesCorrect} / {casesChecked}</bdi> صحيحة من أصل{" "}
            <bdi dir="ltr">{CASE_TASKS_50.length}</bdi>
          </li>
          <li>
            Time Lenses · نظرت بعدسة الماضي إلى <bdi dir="ltr">{lensExplored} / {LENS_PAIRS_50.length}</bdi> أزواج
          </li>
          <li>
            COULD Lab · <bdi dir="ltr">{couldCorrect} / {couldChecked}</bdi> صحيحة من أصل{" "}
            <bdi dir="ltr">{COULD_LAB_50.length}</bdi>
          </li>
          <li>
            Reading Hunt · <bdi dir="ltr">{huntCorrect} / {huntChecked}</bdi> صحيحة من أصل{" "}
            <bdi dir="ltr">{READING_HUNT_50.length}</bdi>
          </li>
        </ul>
        <p className="l50-skill-note">
          هذه أعداد إجابات جرى فحصها فعلًا، وليست نسب إتقان مخترعة. المختبرات للتدريب ولا تدخل في درجة الاختبار.
        </p>
      </div>
      {result && (
        <div className="l50-dashboard-levels">
          <span className="l50-mini-label">الاختبار حسب المجموعة</span>
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
