import { type CSSProperties, type ReactNode } from "react";
import {
  CONTRASTS_49,
  DIALOGUE_49,
  MEANINGS_49,
  READING_49,
  READING_CHALLENGE_49,
  READING_QUESTIONS_49,
  TIMELINE_ITEMS_49,
  MUST_HAVE_EVIDENCE_49,
  type Tone49,
} from "./data";
import {
  DETECTOR_49,
  DETECTOR_FUNCTIONS_49,
  PRACTICE_SETS_49,
  SPEAKING_QUESTIONS_49,
  V3_WORKSHOP_49,
  WRITING_REQUIREMENTS_49,
} from "./practiceData49";
import { gradePractice49, gradeV3_49, PRACTICE_KEYS_49 } from "./practiceKey49";
import { En49, Mixed49, Mode49, Note49, toneClass } from "./kit49";
import type { GradedTestResult49 } from "./testKey49";

export type Workspace49 = {
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  revealed: Record<string, boolean>;
  timeline: Record<string, "a" | "b" | undefined>;
  evidence: Record<string, string>;
  detector: Record<string, string>;
  v3: Record<string, string>;
  v3Checked: Record<string, boolean>;
  mapStructure: string;
  contrastSide: Record<string, number>;
  dialogueAr: boolean;
  showTranslation: boolean;
  readingDrafts: Record<number, string>;
  readingOpen: Record<number, boolean>;
  challenge: Record<string, string>;
  challengeChecked: Record<string, boolean>;
  writing: string;
  writingExplanation: string;
  writingModelOpen: boolean;
};

export const initialWorkspace49 = (): Workspace49 => ({
  answers: {},
  checked: {},
  revealed: {},
  timeline: {},
  evidence: {},
  detector: {},
  v3: {},
  v3Checked: {},
  mapStructure: MEANINGS_49[0].id,
  contrastSide: {},
  dialogueAr: false,
  showTranslation: false,
  readingDrafts: {},
  readingOpen: {},
  challenge: {},
  challengeChecked: {},
  writing: "",
  writingExplanation: "",
  writingModelOpen: false,
});

type SetWorkspace = (update: (previous: Workspace49) => Workspace49) => void;

const isArabic = (value: string) => /[\u0600-\u06ff]/.test(value);

/* ============================================================
   مجموعات التدريب
   ============================================================ */

export function PracticeSet49({
  setId,
  workspace,
  onChange,
}: {
  setId: string;
  workspace: Workspace49;
  onChange: SetWorkspace;
}) {
  const items = PRACTICE_SETS_49[setId] ?? [];
  return (
    <div className="l49-practice-list" data-practice-set={setId}>
      {items.map((item, index) => {
        const value = workspace.answers[item.id] ?? "";
        const checked = Boolean(workspace.checked[item.id]);
        const correct = checked && gradePractice49(item.id, value);
        const key = PRACTICE_KEYS_49[item.id];
        const setValue = (next: string) =>
          onChange((previous) => ({
            ...previous,
            answers: { ...previous.answers, [item.id]: next },
            checked: { ...previous.checked, [item.id]: false },
            revealed: { ...previous.revealed, [item.id]: false },
          }));
        return (
          <section className="l49-practice-card" key={item.id} data-practice-id={item.id}>
            <div className="l49-question-top">
              <span className="l49-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p dir={isArabic(item.prompt) ? "rtl" : "ltr"} lang={isArabic(item.prompt) ? "ar" : "en"}>
                {isArabic(item.prompt) ? <Mixed49 text={item.prompt} /> : item.prompt}
              </p>
            </div>
            {item.instruction && (
              <p className="l49-instruction">
                <Mixed49 text={item.instruction} />
              </p>
            )}
            {item.options ? (
              <div
                className="l49-options"
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
                    <span className="l49-option-letter" aria-hidden="true">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    {isArabic(option) ? (
                      <span dir="rtl" lang="ar">
                        {option}
                      </span>
                    ) : (
                      <En49>{option}</En49>
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
                className="l49-input"
              />
            )}
            <div className="l49-practice-actions">
              <button
                type="button"
                className="l49-button l49-button--dark"
                disabled={!value.trim()}
                onClick={() => onChange((previous) => ({ ...previous, checked: { ...previous.checked, [item.id]: true } }))}
              >
                تحقّق
              </button>
              {checked && !correct && (
                <button
                  type="button"
                  className="l49-button l49-button--outline"
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
              <div role="status" className={`l49-feedback ${correct ? "is-correct" : "is-retry"}`}>
                <strong>{correct ? "✓ إجابة مناسبة" : "↺ راجع الصيغة والمعنى وحاول مجددًا"}</strong>
                <p>
                  <Mixed49 text={key.why} />
                </p>
                {workspace.revealed[item.id] && (
                  <p>
                    <strong>نموذج: </strong>
                    <Mixed49 text={key.model} />
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
   Modal Perfect Timeline
   ============================================================ */

export function TimelineLab49({ workspace, onChange }: { workspace: Workspace49; onChange: SetWorkspace }) {
  const answered = Object.values(workspace.timeline).filter(Boolean).length;
  return (
    <div className="l49-timeline" data-timeline-lab>
      <div className="l49-practice-meta">
        <span className="l49-tag">زمن المعنى</span>
        <span>
          <bdi dir="ltr">
            {answered} / {TIMELINE_ITEMS_49.length}
          </bdi>{" "}
          أزواج تمت الإجابة عنها
        </span>
      </div>
      <div className="l49-timeline-rail" aria-hidden="true">
        <span>الحاضر / المستقبل</span>
        <span>الماضي</span>
      </div>
      {TIMELINE_ITEMS_49.map((item) => {
        const choice = workspace.timeline[item.id];
        const correct = choice === "b";
        return (
          <section className={`l49-timeline-pair ${toneClass(item.tone)}`} key={item.id} data-timeline-pair={item.id}>
            <div className="l49-timeline-sentences">
              <div className={`l49-timeline-sentence ${choice ? (correct ? "" : "is-past") : ""}`}>
                <span className="l49-example-tag">A</span>
                <p className="l49-timeline-sentence-en" dir="ltr" lang="en">
                  {item.present.en}
                </p>
                <p dir="rtl" lang="ar">
                  <Mixed49 text={item.present.ar} />
                </p>
              </div>
              <div className={`l49-timeline-sentence ${choice ? (correct ? "is-past" : "") : ""}`}>
                <span className="l49-example-tag">B</span>
                <p className="l49-timeline-sentence-en" dir="ltr" lang="en">
                  {item.past.en}
                </p>
                <p dir="rtl" lang="ar">
                  <Mixed49 text={item.past.ar} />
                </p>
              </div>
            </div>
            <p className="l49-timeline-q">أي الجملتين تتحدث عن الماضي؟</p>
            <div className="l49-timeline-options" role="group" aria-label="اختر الجملة المتعلقة بالماضي">
              {(["a", "b"] as const).map((side) => (
                <button
                  type="button"
                  key={side}
                  className="l49-timeline-option"
                  aria-pressed={choice === side}
                  onClick={() =>
                    onChange((previous) => ({ ...previous, timeline: { ...previous.timeline, [item.id]: side } }))
                  }
                >
                  الجملة {side.toUpperCase()}
                </button>
              ))}
            </div>
            {choice && (
              <div className={`l49-timeline-verdict ${toneClass(item.tone)}`} role="status">
                <strong>{correct ? "✓ صحيح — B هي الماضي." : "↺ ليست هذه؛ الجملة B هي المتعلقة بالماضي."}</strong>{" "}
                <Mixed49 text={item.verdict} />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   Evidence Investigation
   ============================================================ */

export function Evidence49({ workspace, onChange }: { workspace: Workspace49; onChange: SetWorkspace }) {
  const answered = Object.values(workspace.evidence).filter(Boolean).length;
  return (
    <div className="l49-evidence" data-evidence-lab>
      <div className="l49-practice-meta">
        <span className="l49-tag">تحقيق الأدلة</span>
        <span>
          <bdi dir="ltr">
            {answered} / {MUST_HAVE_EVIDENCE_49.length}
          </bdi>{" "}
          أدلة فُحصت
        </span>
      </div>
      {MUST_HAVE_EVIDENCE_49.map((item, index) => {
        const choice = workspace.evidence[item.id];
        const correct = choice === item.correct;
        const selected = item.options.find((option) => option.id === choice);
        return (
          <section className={`l49-evidence-card ${toneClass(item.tone)}`} key={item.id} data-evidence={item.id}>
            <div className="l49-question-top">
              <span className="l49-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="l49-evidence-clue" dir="ltr" lang="en">
                  {item.clue}
                </p>
                <p className="l49-instruction" dir="rtl" lang="ar">
                  <Mixed49 text={item.clueAr} />
                </p>
              </div>
            </div>
            <div className="l49-evidence-options" role="group" aria-label={`اختر الاستنتاج للدليل ${index + 1}`}>
              {item.options.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className="l49-evidence-option"
                  aria-pressed={choice === option.id}
                  onClick={() =>
                    onChange((previous) => ({ ...previous, evidence: { ...previous.evidence, [item.id]: option.id } }))
                  }
                >
                  <En49>{option.label}</En49>
                  <small className="block">{option.note}</small>
                </button>
              ))}
            </div>
            {choice && selected && (
              <div className={`l49-evidence-feedback ${correct ? "is-correct" : "is-retry"}`} role="status">
                <strong>{correct ? "✓ استنتاج مناسب" : "↺ راجع قوة الدليل"}</strong>
                <span className="l49-evidence-strength" aria-label={`قوة الاستنتاج ${item.strength} من 3`}>
                  {[1, 2, 3].map((bar) => (
                    <i key={bar} className={bar <= item.strength ? "on" : ""} />
                  ))}
                </span>
                <p>
                  <Mixed49 text={item.why} />
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
   Meaning Detector
   ============================================================ */

export function Detector49({ workspace, onChange }: { workspace: Workspace49; onChange: SetWorkspace }) {
  return (
    <div className="l49-detector" data-detector-lab>
      {DETECTOR_49.map((item, index) => {
        const choice = workspace.detector[item.id];
        const correct = choice === item.correct;
        return (
          <section className="l49-detector-card" key={item.id} data-detector={item.id}>
            <div className="l49-question-top">
              <span className="l49-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="l49-detector-sentence" dir="ltr" lang="en">
                {item.sentence}
              </p>
            </div>
            <div className="l49-detector-options" role="group" aria-label={`وظيفة الجملة ${index + 1}`}>
              {DETECTOR_FUNCTIONS_49.map((fn) => (
                <button
                  type="button"
                  key={fn.id}
                  className={`l49-detector-option ${toneClass(fn.tone as Tone49)}`}
                  aria-pressed={choice === fn.id}
                  onClick={() =>
                    onChange((previous) => ({ ...previous, detector: { ...previous.detector, [item.id]: fn.id } }))
                  }
                >
                  <span aria-hidden="true">{fn.glyph}</span>
                  {fn.label}
                </button>
              ))}
            </div>
            {choice && (
              <div className={`l49-detector-feedback ${correct ? "is-correct" : "is-retry"}`} role="status">
                <strong>{correct ? "✓ وظيفة صحيحة" : "↺ وظيفة غير دقيقة"}</strong>{" "}
                <Mixed49 text={item.why} />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   V3 Workshop
   ============================================================ */

export function V3Workshop49({ workspace, onChange }: { workspace: Workspace49; onChange: SetWorkspace }) {
  const checkedCount = Object.values(workspace.v3Checked).filter(Boolean).length;
  return (
    <div className="l49-v3" data-v3-workshop>
      <div className="l49-v3-legend" aria-label="مفتاح التصريفات">
        <span><Mixed49 text="V1 = الفعل الأساسي" /></span>
        <span><Mixed49 text="V2 = الماضي" /></span>
        <span><Mixed49 text="V3 = التصريف الثالث المطلوب بعد HAVE" /></span>
      </div>
      <div className="l49-practice-meta">
        <span className="l49-tag">ورشة V3</span>
        <span>
          <bdi dir="ltr">
            {checkedCount} / {V3_WORKSHOP_49.length}
          </bdi>{" "}
          أفعال فُحصت
        </span>
      </div>
      <div className="l49-v3-grid">
        {V3_WORKSHOP_49.map((item, index) => {
          const value = workspace.v3[item.id] ?? "";
          const checked = Boolean(workspace.v3Checked[item.id]);
          const correct = checked && gradeV3_49(item.v3, value, item.v2);
          return (
            <section
              className={`l49-v3-card ${checked ? (correct ? "is-correct" : "is-wrong") : ""}`}
              key={item.id}
              data-v3-item={item.id}
            >
              <div className="l49-v3-base">
                <En49>
                  {item.base} · {item.v2} · ?
                </En49>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </div>
              <p className="l49-v3-sentence" dir="ltr" lang="en">
                {item.prefix} <b>______</b> {item.suffix}
              </p>
              <div className="l49-v3-row">
                <input
                  type="text"
                  dir="ltr"
                  lang="en"
                  className="l49-input"
                  aria-label={`التصريف الثالث للفعل ${item.base}`}
                  value={value}
                  placeholder="V3…"
                  onChange={(event) =>
                    onChange((previous) => ({
                      ...previous,
                      v3: { ...previous.v3, [item.id]: event.target.value },
                      v3Checked: { ...previous.v3Checked, [item.id]: false },
                    }))
                  }
                />
                <button
                  type="button"
                  className="l49-button l49-button--dark"
                  disabled={!value.trim()}
                  onClick={() =>
                    onChange((previous) => ({
                      ...previous,
                      v3Checked: { ...previous.v3Checked, [item.id]: true },
                    }))
                  }
                >
                  تحقّق
                </button>
              </div>
              {checked && (
                <p className={`l49-v3-verdict ${correct ? "is-correct" : "is-wrong"}`} role="status">
                  {correct
                    ? `✓ ${item.v3} هو V3 الصحيح.`
                    : `✕ المطلوب V3: ${item.v3}. ${item.distractor === item.v2 ? `أما ${item.v2} فهي V2.` : ""}`}
                </p>
              )}
            </section>
          );
        })}
      </div>
      <div className="l49-v3-form-table" role="table" aria-label="جدول التصريفات العشرة">
        {V3_WORKSHOP_49.slice(0, 8).map((item) => (
          <div className="l49-v3-form" key={`form-${item.id}`}>
            <b>{item.base}</b>
            <span>{item.v2}</span>
            <span>{item.v3}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   خريطة المعاني
   ============================================================ */

export function MeaningMap49({ workspace, onChange }: { workspace: Workspace49; onChange: SetWorkspace }) {
  const active = MEANINGS_49.find((item) => item.id === workspace.mapStructure) ?? MEANINGS_49[0];
  return (
    <div className="l49-map" data-map-active={active.id}>
      <div className="l49-map-grid" role="group" aria-label="اختر تركيبًا لعرض وظيفته">
        {MEANINGS_49.map((item) => {
          const on = item.id === active.id;
          return (
            <button
              type="button"
              key={item.id}
              className={`l49-map-key ${toneClass(item.tone)} ${on ? "is-active" : ""}`}
              aria-pressed={on}
              onClick={() => onChange((previous) => ({ ...previous, mapStructure: item.id }))}
            >
              <span className="l49-map-key-top">
                <En49>{item.form.replace(" + V3", "")}</En49>
                <span aria-hidden="true">{item.glyph}</span>
              </span>
              <span className="l49-map-key-ar">{item.arName}</span>
            </button>
          );
        })}
      </div>
      <div className={`l49-map-detail ${toneClass(active.tone)}`} aria-live="polite">
        <div className="l49-map-detail-head">
          <En49 className="l49-map-modal">{active.form}</En49>
          <Mode49 id={active.tone} />
        </div>
        <p className="l49-map-function">
          <En49>{active.fn}</En49>
        </p>
        <p className="l49-map-ar">{active.arMeaning}</p>
        <ul className="l49-map-examples">
          <li>
            <p dir="ltr" lang="en">
              {active.exampleEn}
            </p>
            <span dir="rtl" lang="ar">
              <Mixed49 text={active.exampleAr} />
            </span>
          </li>
        </ul>
        <div className="l49-clue">
          <span>
            <b>دليل سياقي: </b>
            <Mixed49 text={active.clue} />
          </span>
        </div>
        <p className="l49-diff">
          <b>الفرق عن أقرب تركيب: </b>
          <Mixed49 text={active.difference} />
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Contrast Lab
   ============================================================ */

export function ContrastLab49({ workspace, onChange }: { workspace: Workspace49; onChange: SetWorkspace }) {
  return (
    <div className="l49-lab">
      <p className="l49-instruction">بدّل التركيب في كل بطاقة: نفس الموقف تقريبًا، ومعنى مختلف.</p>
      {CONTRASTS_49.map((pair) => {
        const sideIndex = Math.min(workspace.contrastSide[pair.id] ?? 0, pair.sides.length - 1);
        const side = pair.sides[sideIndex];
        return (
          <section className={`l49-contrast ${toneClass(pair.tone)}`} key={pair.id} data-contrast={pair.id}>
            <div className="l49-contrast-head">
              <h3>
                <Mixed49 text={pair.title} />
              </h3>
              <En49>{pair.en}</En49>
            </div>
            <p className="l49-contrast-axis">
              <Mixed49 text={pair.axis} />
            </p>
            <div className="l49-contrast-tabs" role="group" aria-label={`اختر التركيب في ${pair.en}`}>
              {pair.sides.map((option, index) => (
                <button
                  type="button"
                  key={option.modal}
                  aria-pressed={index === sideIndex}
                  onClick={() =>
                    onChange((previous) => ({
                      ...previous,
                      contrastSide: { ...previous.contrastSide, [pair.id]: index },
                    }))
                  }
                >
                  <En49>{option.modal}</En49>
                </button>
              ))}
            </div>
            <div className="l49-contrast-stage" aria-live="polite">
              <p className="l49-contrast-sentence" dir="ltr" lang="en">
                {side.sentence}
              </p>
              <p className="l49-contrast-ar" dir="rtl" lang="ar">
                <Mixed49 text={side.ar} />
              </p>
              <p className="l49-contrast-meaning">{side.meaning}</p>
              {side.caution && (
                <p className="l49-contrast-caution">
                  ⚠ <Mixed49 text={side.caution} />
                </p>
              )}
            </div>
          </section>
        );
      })}
      <div className="l49-lab-quiz">
        <div className="l49-practice-meta">
          <span className="l49-tag">تحقّق من الفهم</span>
          <span>اختر التفسير الدقيق؛ التغذية الراجعة تشرح سبب قبول الإجابة.</span>
        </div>
        <PracticeSet49 setId="contrast" workspace={workspace} onChange={onChange} />
      </div>
    </div>
  );
}

/* ============================================================
   الحوار
   ============================================================ */

const SPEAKER_COLORS = ["#0f6f68", "#9a6a1c", "#4a4fa3", "#a94f32", "#7b3f88", "#5b6b23"];
function speakerStyle(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return { "--speaker": SPEAKER_COLORS[hash % SPEAKER_COLORS.length] } as CSSProperties;
}

export function Dialogue49View({ workspace, onChange }: { workspace: Workspace49; onChange: SetWorkspace }) {
  const dialogue = DIALOGUE_49;
  return (
    <div className={`l49-dialogue ${toneClass(dialogue.tone)}`} data-dialogue="main">
      <div className="l49-dialogue-head">
        <span className="l49-dialogue-label">
          <span aria-hidden="true">◉</span> REAL-LIFE DIALOGUE · <En49>{dialogue.turns.length} TURNS</En49>
        </span>
        <button
          type="button"
          className="l49-text-button"
          aria-expanded={workspace.dialogueAr}
          onClick={() => onChange((previous) => ({ ...previous, dialogueAr: !previous.dialogueAr }))}
        >
          {workspace.dialogueAr ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      <p className="l49-dialogue-setting">{dialogue.setting}</p>
      {dialogue.turns.map((turn, index) => (
        <div className="l49-turn" key={`${turn.speaker}-${index}`}>
          <span className="l49-avatar" style={speakerStyle(turn.speaker)} aria-hidden="true">
            {turn.speaker.slice(0, 1)}
          </span>
          <div className="l49-bubble">
            <span className="l49-speaker">
              <Mixed49 text={`${turn.speaker}${turn.fn ? ` · ${turn.fn}` : ""}`} />
            </span>
            <p dir="ltr" lang="en">
              {turn.en}
            </p>
            {workspace.dialogueAr && (
              <p className="l49-turn-ar" dir="rtl" lang="ar">
                <Mixed49 text={turn.ar} />
              </p>
            )}
          </div>
        </div>
      ))}
      <div className="l49-dialogue-analysis">
        <span className="l49-mini-label">التحليل</span>
        <ul>
          {dialogue.analysis.map((entry) => (
            <li key={entry.modal}>
              <En49>{entry.modal}</En49>
              <span>{entry.ar}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="l49-dialogue-lab">
        <div className="l49-practice-meta">
          <span className="l49-tag">فهم الموقف</span>
          <span>
            <Mixed49 text={dialogue.labPrompt} />
          </span>
        </div>
        <PracticeSet49 setId={dialogue.labId} workspace={workspace} onChange={onChange} />
      </div>
    </div>
  );
}

/* ============================================================
   القراءة
   ============================================================ */

export function Reading49({ workspace, onChange }: { workspace: Workspace49; onChange: SetWorkspace }) {
  return (
    <div className="l49-reading">
      <div className="l49-reading-head">
        <div>
          <span className="l49-mini-label">READING CHALLENGE</span>
          <p dir="ltr" lang="en">
            Evidence, deduction and regret in one short story
          </p>
        </div>
        <button
          type="button"
          className="l49-button l49-button--outline"
          aria-expanded={workspace.showTranslation}
          onClick={() => onChange((previous) => ({ ...previous, showTranslation: !previous.showTranslation }))}
        >
          {workspace.showTranslation ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      <div className="l49-reading-body">
        {READING_49.map((part, index) => (
          <div className="l49-reading-paragraph" key={part.en}>
            <span className="l49-reading-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p dir="ltr" lang="en">
              {part.en}
            </p>
            {workspace.showTranslation && (
              <p className="l49-reading-ar" dir="rtl" lang="ar">
                <Mixed49 text={part.ar} />
              </p>
            )}
          </div>
        ))}
      </div>
      <Note49
        icon="🔍"
        text="حاول قبل قراءة الترجمة أن تحدد: أي جملة استنتاج قوي؟ أي جملة احتمال؟ وأين ظهر الندم؟"
      />
    </div>
  );
}

export function ReadingQuestions49({ workspace, onChange }: { workspace: Workspace49; onChange: SetWorkspace }) {
  const answered = Object.values(workspace.readingDrafts).filter((value) => value.trim()).length;
  return (
    <div className="l49-reading-questions">
      <div className="l49-practice-meta">
        <span className="l49-tag">
          <bdi dir="ltr">
            {answered} / {READING_QUESTIONS_49.length}
          </bdi>{" "}
          إجابات مكتوبة
        </span>
        <span>النماذج لا تُعرض قبل الضغط على «قارن بالإجابة النموذجية».</span>
      </div>
      {READING_QUESTIONS_49.map((item, index) => (
        <section className="l49-reading-q" key={item.q} data-reading-q={index + 1}>
          <div className="l49-reading-q-top">
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <p dir="ltr" lang="en">
              {item.q}
            </p>
          </div>
          <input
            type="text"
            dir="ltr"
            lang="en"
            className="l49-input"
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
          <div className="l49-reading-actions">
            <button
              type="button"
              className="l49-button l49-button--outline"
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
            <div className="l49-answer-model">
              <p dir="ltr" lang="en">
                {item.answer}
              </p>
              <p dir="rtl" lang="ar">
                <Mixed49 text={item.ar} />
              </p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export function ReadingChallenge49({ workspace, onChange }: { workspace: Workspace49; onChange: SetWorkspace }) {
  const checked = Object.values(workspace.challengeChecked).filter(Boolean).length;
  return (
    <div className="l49-challenge" data-reading-challenge>
      <div className="l49-practice-meta">
        <span className="l49-tag">
          <bdi dir="ltr">
            {checked} / {READING_CHALLENGE_49.length}
          </bdi>{" "}
          أسئلة فُحصت
        </span>
        <span>اختر، ثم اضغط «تحقّق» — لا يظهر التفسير قبل المحاولة.</span>
      </div>
      {READING_CHALLENGE_49.map((item, index) => {
        const choice = workspace.challenge[item.id];
        const isChecked = Boolean(workspace.challengeChecked[item.id]);
        const correct = isChecked && choice === String(item.correct);
        return (
          <section className="l49-challenge-q" key={item.id} data-challenge-q={index + 1}>
            <p>
              <strong>{String(index + 1).padStart(2, "0")} · </strong>
              <Mixed49 text={item.q} />
            </p>
            <div className="l49-challenge-options" role="group" aria-label={`خيارات سؤال التحدي ${index + 1}`}>
              {item.options.map((option, optionIndex) => (
                <button
                  type="button"
                  key={option}
                  aria-pressed={choice === String(optionIndex)}
                  onClick={() =>
                    onChange((previous) => ({
                      ...previous,
                      challenge: { ...previous.challenge, [item.id]: String(optionIndex) },
                      challengeChecked: { ...previous.challengeChecked, [item.id]: false },
                    }))
                  }
                >
                  <span dir="rtl" lang="ar">
                    <Mixed49 text={option} />
                  </span>
                </button>
              ))}
            </div>
            <div className="l49-practice-actions">
              <button
                type="button"
                className="l49-button l49-button--dark"
                disabled={!choice}
                onClick={() =>
                  onChange((previous) => ({
                    ...previous,
                    challengeChecked: { ...previous.challengeChecked, [item.id]: true },
                  }))
                }
              >
                تحقّق
              </button>
            </div>
            {isChecked && (
              <p className={`l49-challenge-feedback ${correct ? "is-correct" : "is-retry"}`} role="status">
                <strong>{correct ? "✓ إجابة صحيحة. " : "↺ راجع النص. "}</strong>
                <Mixed49 text={item.why} />
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   الكتابة والتحدث
   ============================================================ */

export const MODEL_49 =
  "Yesterday was a day full of mistakes. " +
  "I must have forgotten to set my alarm, because I woke up late. " +
  "I might have missed the bus when I left home too late. " +
  "I should have prepared my schoolbag the night before. " +
  "I shouldn't have stayed up so late. " +
  "I could have arrived on time if I had left earlier. " +
  "My mother had prepared breakfast, but I didn't have time to eat it. " +
  "I needn't have worried about being hungry, because I had some food in my bag. " +
  "At school, I realised that I could have done better. " +
  "Next time, I will plan my day carefully.";

export function Writing49({ workspace, onChange }: { workspace: Workspace49; onChange: SetWorkspace }) {
  const lower = workspace.writing.toLowerCase().replace(/[’‘]/g, "'");
  const sentences = workspace.writing
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter(Boolean).length;
  const met = WRITING_REQUIREMENTS_49.filter((requirement) => requirement.pattern.test(lower));
  return (
    <div className="l49-writing">
      <div className="l49-writing-head">
        <span className="l49-mini-label">WRITING MISSION</span>
        <span className="l49-tag">
          <bdi dir="ltr">
            {sentences} / 8–10
          </bdi>{" "}
          جملة
        </span>
      </div>
      <p className="l49-instruction">
        اكتب 8 إلى 10 جمل باللغة الإنجليزية، واستخدم ستة تراكيب على الأقل من التراكيب المطلوبة. المدقق أدناه إرشادي: يفحص
        وجود الصيغ الظاهرة وعدد الجمل فقط، ولا يقيّم المعنى ولا التصريف ولا الطلاقة.
      </p>
      <div className="l49-writing-checks">
        {WRITING_REQUIREMENTS_49.map((requirement, index) => {
          const isMet = requirement.pattern.test(lower);
          return (
            <div key={requirement.id} className={isMet ? "is-met" : ""}>
              <span aria-hidden="true">{isMet ? "✓" : String(index + 1).padStart(2, "0")}</span>
              <span className="l49-check-body">
                <span>{requirement.ar}</span>
                <En49 className="l49-check-formula">{requirement.en}</En49>
              </span>
            </div>
          );
        })}
      </div>
      <p className="l49-writing-meta">
        <span className={sentences >= 8 && sentences <= 10 ? "is-ok" : ""}>عدد الجمل المطلوب: 8–10</span>
        <span>
          الصيغ المطلوبة المستوفاة:{" "}
          <bdi dir="ltr">
            {met.length} / {WRITING_REQUIREMENTS_49.length}
          </bdi>
        </span>
      </p>
      <label htmlFor="l49-writing-draft">مسودتك الإنجليزية</label>
      <textarea
        id="l49-writing-draft"
        dir="ltr"
        lang="en"
        rows={8}
        value={workspace.writing}
        placeholder="Write your 8–10 sentence story…"
        onChange={(event) => onChange((previous) => ({ ...previous, writing: event.target.value }))}
      />
      <label htmlFor="l49-writing-explanation">شرحك بالعربية (اختياري)</label>
      <textarea
        id="l49-writing-explanation"
        dir="rtl"
        lang="ar"
        rows={3}
        value={workspace.writingExplanation}
        onChange={(event) => onChange((previous) => ({ ...previous, writingExplanation: event.target.value }))}
      />
      <div className="l49-speaking">
        <h3>مهمة التحدث — دقيقة إلى دقيقتين</h3>
        <p className="l49-instruction">
          تحدث عن موقف أخطأت فيه أو ندمت على شيء فعلته. استخدم Modal Perfect للتعبير الطبيعي، لا لتكوين جمل منعزلة.
        </p>
        <ol>
          {SPEAKING_QUESTIONS_49.map((question, index) => (
            <li key={question}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <En49>{question}</En49>
            </li>
          ))}
        </ol>
      </div>
      <button
        type="button"
        className="l49-button l49-button--outline"
        aria-expanded={workspace.writingModelOpen}
        onClick={() => onChange((previous) => ({ ...previous, writingModelOpen: !previous.writingModelOpen }))}
      >
        {workspace.writingModelOpen ? "إخفاء النموذج الإرشادي" : "عرض نموذج إرشادي"}
      </button>
      {workspace.writingModelOpen && (
        <div className="l49-writing-model">
          <p dir="ltr" lang="en">
            {MODEL_49}
          </p>
          <p className="l49-instruction">
            النموذج استرشادي وليس الإجابة الوحيدة؛ استخدم تجربتك أنت.
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   لوحة الإتقان
   ============================================================ */

export const SKILL_OF_SET_49: Record<string, string> = {
  complete: "إكمال HAVE + V3",
  choose: "اختيار التركيب",
  correct: "تصحيح الأخطاء",
  translate: "الترجمة إلى الإنجليزية",
  detective: "محقق الصيغة",
  dialogue: "فهم الحوار",
  contrast: "الفروق الدلالية",
};

export function Dashboard49({ workspace, result }: { workspace: Workspace49; result: GradedTestResult49 | null }) {
  const rows = new Map<string, { checked: number; correct: number; total: number }>();
  for (const [setId, items] of Object.entries(PRACTICE_SETS_49)) {
    const skill = SKILL_OF_SET_49[setId] ?? "مهارات أخرى";
    const row = rows.get(skill) ?? { checked: 0, correct: 0, total: 0 };
    for (const item of items) {
      row.total += 1;
      if (workspace.checked[item.id]) {
        row.checked += 1;
        if (gradePractice49(item.id, workspace.answers[item.id] ?? "")) row.correct += 1;
      }
    }
    rows.set(skill, row);
  }
  const checkedTotal = [...rows.values()].reduce((sum, row) => sum + row.checked, 0);
  const correctTotal = [...rows.values()].reduce((sum, row) => sum + row.correct, 0);
  const readingAnswered = Object.values(workspace.readingDrafts).filter((value) => value.trim()).length;
  const challengeCorrect = READING_CHALLENGE_49.filter(
    (item) => workspace.challengeChecked[item.id] && workspace.challenge[item.id] === String(item.correct),
  ).length;
  const challengeChecked = Object.values(workspace.challengeChecked).filter(Boolean).length;
  const timelineAnswered = Object.values(workspace.timeline).filter(Boolean).length;
  const timelineCorrect = TIMELINE_ITEMS_49.filter((item) => workspace.timeline[item.id] === "b").length;
  const evidenceChecked = Object.values(workspace.evidence).filter(Boolean).length;
  const evidenceCorrect = MUST_HAVE_EVIDENCE_49.filter((item) => workspace.evidence[item.id] === item.correct).length;
  const detectorChecked = Object.values(workspace.detector).filter(Boolean).length;
  const detectorCorrect = DETECTOR_49.filter((item) => workspace.detector[item.id] === item.correct).length;
  const v3Checked = Object.values(workspace.v3Checked).filter(Boolean).length;
  const v3Correct = V3_WORKSHOP_49.filter((item) => gradeV3_49(item.v3, workspace.v3[item.id] ?? "", item.v2)).length;
  return (
    <div className="l49-dashboard" data-dashboard>
      <div className="l49-dashboard-summary">
        <div>
          <span className="l49-mini-label">إجابات فحصتها</span>
          <bdi dir="ltr" className="l49-dashboard-big">
            {correctTotal} / {checkedTotal}
          </bdi>
          <p>تُحسب فقط البنود التي ضغطت «تحقّق» عليها. البنود غير المفحوصة لا تُحتسب.</p>
        </div>
        <div>
          <span className="l49-mini-label">الاختبار النهائي</span>
          <bdi dir="ltr" className="l49-dashboard-big">
            {result ? `${result.score} / ${result.total}` : "— / 25"}
          </bdi>
          <p>{result ? "النتيجة مبنية على أسئلة الاختبار الخمسة والعشرين." : "لم تُسلّم الاختبار بعد."}</p>
        </div>
        <div>
          <span className="l49-mini-label">أسئلة القراءة المكتوبة</span>
          <bdi dir="ltr" className="l49-dashboard-big">
            {readingAnswered} / {READING_QUESTIONS_49.length}
          </bdi>
          <p>تُعدّ الإجابات المكتوبة فقط؛ والمقارنة بالنموذج اختيارية.</p>
        </div>
      </div>
      <div className="l49-dashboard-skills">
        {[...rows.entries()].map(([skill, row]) => {
          const percent = row.checked ? Math.round((row.correct / row.checked) * 100) : 0;
          return (
            <div className="l49-skill-row" key={skill} data-skill={skill}>
              <div className="l49-skill-head">
                <span>{skill}</span>
                <bdi dir="ltr">
                  {row.checked ? `${row.correct} / ${row.checked}` : "لم يُفحص بعد"}
                </bdi>
              </div>
              <div
                className={`l49-skill-track ${row.checked ? "" : "is-empty"}`}
                role="progressbar"
                aria-label={`${skill}: ${row.checked ? `${row.correct} من ${row.checked}` : "لم يُفحص بعد"}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
              >
                <div style={{ width: `${percent}%` }} />
              </div>
              <p className="l49-skill-note">
                {row.checked
                  ? `${row.correct} إجابة صحيحة من ${row.checked} مفحوصة (من أصل ${row.total} بندًا).`
                  : `${row.total} بندًا متاحًا لم يُفحص منها شيء بعد.`}
              </p>
            </div>
          );
        })}
      </div>
      <div className="l49-dashboard-labs">
        <span className="l49-mini-label">مختبرات تفاعلية فُحصت</span>
        <ul>
          <li>
            Timeline · <bdi dir="ltr">{timelineCorrect} / {timelineAnswered}</bdi> صحيحة من أصل {" "}
            <bdi dir="ltr">{TIMELINE_ITEMS_49.length}</bdi>
          </li>
          <li>
            Evidence · <bdi dir="ltr">{evidenceCorrect} / {evidenceChecked}</bdi> صحيحة من أصل {" "}
            <bdi dir="ltr">{MUST_HAVE_EVIDENCE_49.length}</bdi>
          </li>
          <li>
            Detector · <bdi dir="ltr">{detectorCorrect} / {detectorChecked}</bdi> صحيحة من أصل {" "}
            <bdi dir="ltr">{DETECTOR_49.length}</bdi>
          </li>
          <li>
            V3 · <bdi dir="ltr">{v3Correct} / {v3Checked}</bdi> صحيحة من أصل {" "}
            <bdi dir="ltr">{V3_WORKSHOP_49.length}</bdi>
          </li>
          <li>
            Reading Challenge · <bdi dir="ltr">{challengeCorrect} / {challengeChecked}</bdi> صحيحة من أصل {" "}
            <bdi dir="ltr">{READING_CHALLENGE_49.length}</bdi>
          </li>
        </ul>
        <p className="l49-skill-note">
          هذه أعداد إجابات جرى فحصها فعلًا، وليست نسب إتقان مخترعة. المختبرات تفاعلية للتدريب ولا تدخل في درجة الاختبار.
        </p>
      </div>
      {result && (
        <div className="l49-dashboard-levels">
          <span className="l49-mini-label">الاختبار حسب المجموعة</span>
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
