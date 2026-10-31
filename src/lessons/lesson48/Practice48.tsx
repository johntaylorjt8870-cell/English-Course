import { En48, Mixed48, Note48, SignalBars, toneClass } from "./kit48";
import { MODALS_48, CASES_48, CONTRAST_48, DECISION_MAP_48, DIALOGUES_48, READING_48, READING_QUESTIONS_48 } from "./data";
import { PRACTICE_SETS_48, SKILL_OF_SET_48 } from "./practiceData48";
import { gradePractice48, PRACTICE_KEYS_48 } from "./practiceKey48";
import type { GradedTestResult48 } from "./testKey48";

export type Workspace48 = {
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  revealed: Record<string, boolean>;
  mapModal: string;
  caseOpen: number;
  decisionNode: string;
  contrastSide: Record<string, number>;
  readingDrafts: Record<number, string>;
  readingOpen: Record<number, boolean>;
  showTranslation: boolean;
  dialogueAr: Record<string, boolean>;
  writing: string;
  writingExplanation: string;
  writingModelOpen: boolean;
};

export const initialWorkspace48 = (): Workspace48 => ({
  answers: {},
  checked: {},
  revealed: {},
  mapModal: MODALS_48[0].id,
  caseOpen: 0,
  decisionNode: DECISION_MAP_48[0].id,
  contrastSide: {},
  readingDrafts: {},
  readingOpen: {},
  showTranslation: false,
  dialogueAr: {},
  writing: "",
  writingExplanation: "",
  writingModelOpen: false,
});

type SetWorkspace = (update: (previous: Workspace48) => Workspace48) => void;

const isArabic = (value: string) => /[\u0600-\u06ff]/.test(value);

/* ============================================================
   مجموعات التدريب
   ============================================================ */

export function PracticeSet48({
  setId,
  workspace,
  onChange,
}: {
  setId: string;
  workspace: Workspace48;
  onChange: SetWorkspace;
}) {
  const items = PRACTICE_SETS_48[setId] ?? [];
  return (
    <div className="l48-practice-list" data-practice-set={setId}>
      {items.map((item, index) => {
        const value = workspace.answers[item.id] ?? "";
        const checked = Boolean(workspace.checked[item.id]);
        const correct = checked && gradePractice48(item.id, value);
        const key = PRACTICE_KEYS_48[item.id];
        const setValue = (next: string) =>
          onChange((previous) => ({
            ...previous,
            answers: { ...previous.answers, [item.id]: next },
            checked: { ...previous.checked, [item.id]: false },
            revealed: { ...previous.revealed, [item.id]: false },
          }));
        return (
          <section className="l48-practice-card" key={item.id} data-practice-id={item.id}>
            <div className="l48-question-top">
              <span className="l48-question-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p dir="ltr" lang="en">
                {item.prompt}
              </p>
            </div>
            {item.instruction && (
              <p className="l48-instruction">
                <Mixed48 text={item.instruction} />
              </p>
            )}
            {item.options ? (
              <div className="l48-options" role="group" aria-label={`خيارات التمرين ${index + 1}`}>
                {item.options.map((option, optionIndex) => (
                  <button
                    type="button"
                    key={option}
                    aria-pressed={value === option}
                    dir={isArabic(option) ? "rtl" : "ltr"}
                    onClick={() => setValue(option)}
                  >
                    <span className="l48-option-letter" aria-hidden="true">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    {isArabic(option) ? (
                      <span dir="rtl" lang="ar">
                        {option}
                      </span>
                    ) : (
                      <En48>{option}</En48>
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
                className="l48-input"
              />
            )}
            <div className="l48-practice-actions">
              <button
                type="button"
                className="l48-button l48-button--dark"
                disabled={!value.trim()}
                onClick={() => onChange((previous) => ({ ...previous, checked: { ...previous.checked, [item.id]: true } }))}
              >
                تحقّق
              </button>
              {checked && !correct && (
                <button
                  type="button"
                  className="l48-button l48-button--outline"
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
              <div role="status" className={`l48-feedback ${correct ? "is-correct" : "is-retry"}`}>
                <strong>{correct ? "✓ إجابة مناسبة" : "↺ راجع الصيغة والمعنى وحاول مجددًا"}</strong>
                <p>
                  <Mixed48 text={key.why} />
                </p>
                {workspace.revealed[item.id] && (
                  <p>
                    <strong>نموذج: </strong>
                    <Mixed48 text={key.model} />
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
   خريطة الوظائف — كل فعل ومهامه
   ============================================================ */

export function MeaningMap48({ workspace, onChange }: { workspace: Workspace48; onChange: SetWorkspace }) {
  const active = MODALS_48.find((modal) => modal.id === workspace.mapModal) ?? MODALS_48[0];
  return (
    <div className="l48-map" data-map-active={active.id}>
      <div className="l48-map-grid" role="group" aria-label="اختر فعلًا ناقصًا لعرض وظائفه">
        {MODALS_48.map((modal) => {
          const on = modal.id === active.id;
          return (
            <button
              type="button"
              key={modal.id}
              className={`l48-map-key ${toneClass(modal.tone)} ${on ? "is-active" : ""}`}
              aria-pressed={on}
              onClick={() => onChange((previous) => ({ ...previous, mapModal: modal.id }))}
            >
              <span className="l48-map-key-top">
                <En48>{modal.modal}</En48>
                <SignalBars level={modal.tone === "review" ? 1 : 2} tone={modal.tone} />
              </span>
              <span className="l48-map-key-ar">{modal.ar}</span>
            </button>
          );
        })}
      </div>
      <div className={`l48-map-detail ${toneClass(active.tone)}`} aria-live="polite">
        <div className="l48-map-detail-head">
          <En48 className="l48-map-modal">{active.modal}</En48>
          <span className="l48-map-function">
            <En48>{active.function}</En48>
          </span>
        </div>
        <p className="l48-map-formula" dir="ltr" lang="en">
          {active.formula}
        </p>
        <p className="l48-map-ar">{active.ar}</p>
        <ul className="l48-map-examples">
          {active.examples.map((example) => (
            <li key={example.en}>
              <p dir="ltr" lang="en">
                {example.en}
              </p>
              <span dir="rtl" lang="ar">
                <Mixed48 text={example.ar} />
              </span>
            </li>
          ))}
        </ul>
        {active.note && <Note48 text={active.note} />}
      </div>
    </div>
  );
}

/* ============================================================
   المواقف السبعة
   ============================================================ */

export function CaseWall48({ workspace, onChange }: { workspace: Workspace48; onChange: SetWorkspace }) {
  const active = CASES_48[workspace.caseOpen] ?? CASES_48[0];
  return (
    <div className="l48-cases">
      <div className="l48-case-tiles" role="group" aria-label="اختر موقفًا لكشف وظيفته">
        {CASES_48.map((item, index) => (
          <button
            type="button"
            key={item.n}
            className={`l48-case-tile ${toneClass(item.tone)} ${index === workspace.caseOpen ? "is-active" : ""}`}
            aria-pressed={index === workspace.caseOpen}
            onClick={() => onChange((previous) => ({ ...previous, caseOpen: index }))}
          >
            <span className="l48-case-tile-top">
              <span aria-hidden="true">{item.emoji}</span>
              <span className="l48-case-n">{item.n}</span>
            </span>
            <span className="l48-case-situation">{item.situation}</span>
            <En48 className="l48-case-modal">{item.modal}</En48>
          </button>
        ))}
      </div>
      <div className={`l48-case-detail ${toneClass(active.tone)}`} aria-live="polite">
        <span className="l48-case-verdict">{active.meaning}</span>
        <p className="l48-case-en" dir="ltr" lang="en">
          {active.en}
        </p>
        <p className="l48-case-ar" dir="rtl" lang="ar">
          <Mixed48 text={active.ar} />
        </p>
        <p className="l48-case-why">
          <Mixed48 text={`الموقف: ${active.situation} — الوظيفة: ${active.modal} = ${active.meaning}.`} />
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   خريطة القرار
   ============================================================ */

export function DecisionMap48({ workspace, onChange }: { workspace: Workspace48; onChange: SetWorkspace }) {
  const active = DECISION_MAP_48.find((node) => node.id === workspace.decisionNode) ?? DECISION_MAP_48[0];
  return (
    <div className="l48-decision">
      <ol className="l48-decision-steps">
        {DECISION_MAP_48.map((node, index) => {
          const on = node.id === active.id;
          return (
            <li key={node.id}>
              <button
                type="button"
                className={`l48-decision-step ${toneClass(node.tone)} ${on ? "is-active" : ""}`}
                aria-pressed={on}
                onClick={() => onChange((previous) => ({ ...previous, decisionNode: node.id }))}
              >
                <span className="l48-decision-n" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <Mixed48 text={node.question} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className={`l48-decision-panel ${toneClass(active.tone)}`} aria-live="polite">
        <span className="l48-mini-label">المعنى المطلوب</span>
        <h3 className="l48-decision-answer">{active.answer}</h3>
        <div className="l48-decision-modals">
          {active.modals.map((modal) => (
            <En48 key={modal} className="l48-decision-chip">
              {modal}
            </En48>
          ))}
        </div>
        <p className="l48-decision-example" dir="ltr" lang="en">
          {active.example}
        </p>
        <p className="l48-decision-why">
          <Mixed48 text={active.why} />
        </p>
        <div className="l48-decision-paths">
          <span className="l48-mini-label">لماذا؟</span>
          <ul>
            {active.options.map((option) => (
              <li key={option}>
                <Mixed48 text={option} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   مختبر المقارنة
   ============================================================ */

export function ContrastLab48({ workspace, onChange }: { workspace: Workspace48; onChange: SetWorkspace }) {
  return (
    <div className="l48-lab">
      <p className="l48-instruction">بدّل الفعل في كل بطاقة: نفس الموقف، ومعنى مختلف.</p>
      {CONTRAST_48.map((pair) => {
        const sideIndex = Math.min(workspace.contrastSide[pair.id] ?? 0, pair.sides.length - 1);
        const side = pair.sides[sideIndex];
        return (
          <section className={`l48-contrast ${toneClass(pair.tone)}`} key={pair.id} data-contrast={pair.id}>
            <div className="l48-contrast-head">
              <h3>
                <Mixed48 text={pair.title} />
              </h3>
              <En48>{pair.en}</En48>
            </div>
            <p className="l48-contrast-axis">
              <Mixed48 text={pair.axis} />
            </p>
            <div className="l48-contrast-tabs" role="group" aria-label={`اختر الفعل في ${pair.en}`}>
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
                  <En48>{option.modal}</En48>
                </button>
              ))}
            </div>
            <div className="l48-contrast-stage" aria-live="polite">
              <p className="l48-contrast-sentence" dir="ltr" lang="en">
                {side.sentence}
              </p>
              <p className="l48-contrast-ar" dir="rtl" lang="ar">
                <Mixed48 text={side.ar} />
              </p>
              <p className="l48-contrast-meaning">{side.meaning}</p>
              {side.caution && <p className="l48-contrast-caution">⚠ <Mixed48 text={side.caution} /></p>}
            </div>
          </section>
        );
      })}
      <div className="l48-lab-quiz">
        <div className="l48-practice-meta">
          <span className="l48-tag">تحقّق من الفهم</span>
          <span>اختر التفسير الدقيق؛ التغذية الراجعة تشرح سبب قبول الإجابة.</span>
        </div>
        <PracticeSet48 setId="contrast" workspace={workspace} onChange={onChange} />
      </div>
    </div>
  );
}

/* ============================================================
   الحوار
   ============================================================ */

const SPEAKER_COLORS = ["#0f766e", "#b45309", "#1d4ed8", "#be185d", "#4c1d95", "#9a3412"];
function speakerStyle(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return { "--speaker": SPEAKER_COLORS[hash % SPEAKER_COLORS.length] } as React.CSSProperties;
}

export function Dialogue48View({
  id,
  workspace,
  onChange,
}: {
  id: string;
  workspace: Workspace48;
  onChange: SetWorkspace;
}) {
  const dialogue = DIALOGUES_48[id] ?? DIALOGUES_48.school;
  const showAr = Boolean(workspace.dialogueAr[id]);
  return (
    <div className={`l48-dialogue ${toneClass(dialogue.tone)}`}>
      <div className="l48-dialogue-head">
        <span className="l48-dialogue-label">
          <span aria-hidden="true">◉</span> REAL-LIFE DIALOGUE · <En48>{dialogue.title}</En48>
        </span>
        <button
          type="button"
          className="l48-text-button"
          aria-expanded={showAr}
          onClick={() =>
            onChange((previous) => ({
              ...previous,
              dialogueAr: { ...previous.dialogueAr, [id]: !showAr },
            }))
          }
        >
          {showAr ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      <p className="l48-dialogue-setting">{dialogue.setting}</p>
      {dialogue.turns.map((turn, index) => (
        <div className="l48-turn" key={`${turn.speaker}-${index}`}>
          <span className="l48-avatar" style={speakerStyle(turn.speaker)} aria-hidden="true">
            {turn.speaker.slice(0, 1)}
          </span>
          <div className="l48-bubble">
            <span className="l48-speaker">{turn.speaker}</span>
            <p dir="ltr" lang="en">
              {turn.en}
            </p>
            {showAr && turn.ar && (
              <p className="l48-turn-ar" dir="rtl" lang="ar">
                <Mixed48 text={turn.ar} />
              </p>
            )}
          </div>
        </div>
      ))}
      <div className="l48-dialogue-analysis">
        <span className="l48-mini-label">التحليل</span>
        <ul>
          {dialogue.analysis.map((entry) => (
            <li key={entry.modal}>
              <En48>{entry.modal}</En48>
              <span>{entry.ar}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="l48-dialogue-lab">
        <div className="l48-practice-meta">
          <span className="l48-tag">فهم الموقف</span>
          <span>
            <Mixed48 text={dialogue.labPrompt} />
          </span>
        </div>
        <PracticeSet48 setId={dialogue.labId} workspace={workspace} onChange={onChange} />
      </div>
    </div>
  );
}

/* ============================================================
   القراءة
   ============================================================ */

export function Reading48({ workspace, onChange }: { workspace: Workspace48; onChange: SetWorkspace }) {
  return (
    <div className="l48-reading">
      <div className="l48-reading-head">
        <div>
          <span className="l48-mini-label">READING CHALLENGE</span>
          <h2 dir="ltr" lang="en">
            The School Science Competition
          </h2>
          <p dir="ltr" lang="en">
            A Team, A Challenge and Many Decisions
          </p>
        </div>
        <button
          type="button"
          className="l48-button l48-button--outline"
          aria-expanded={workspace.showTranslation}
          onClick={() => onChange((previous) => ({ ...previous, showTranslation: !previous.showTranslation }))}
        >
          {workspace.showTranslation ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      <div className="l48-reading-body">
        {READING_48.map((part, index) => (
          <div className="l48-reading-paragraph" key={part.en}>
            <span className="l48-reading-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p dir="ltr" lang="en">
              {part.en}
            </p>
            {workspace.showTranslation && (
              <p className="l48-reading-ar" dir="rtl" lang="ar">
                <Mixed48 text={part.ar} />
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReadingQuestions48({ workspace, onChange }: { workspace: Workspace48; onChange: SetWorkspace }) {
  const answered = Object.values(workspace.readingDrafts).filter((value) => value.trim()).length;
  return (
    <div className="l48-reading-questions">
      <div className="l48-practice-meta">
        <span className="l48-tag">
          <bdi dir="ltr">
            {answered} / {READING_QUESTIONS_48.length}
          </bdi>{" "}
          إجابات مكتوبة
        </span>
        <span>النماذج لا تُعرض قبل الضغط على «قارن بالإجابة النموذجية».</span>
      </div>
      {READING_QUESTIONS_48.map((item, index) => {
        const arabic = "lang" in item && item.lang === "ar";
        const value = workspace.readingDrafts[index] ?? "";
        return (
          <section className="l48-reading-q" key={item.q} data-reading-q={index + 1}>
            <div className="l48-reading-q-top">
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <p dir={arabic ? "rtl" : "ltr"} lang={arabic ? "ar" : "en"}>
                {item.q}
              </p>
            </div>
            <input
              type="text"
              dir={arabic ? "rtl" : "ltr"}
              lang={arabic ? "ar" : "en"}
              className="l48-input"
              value={value}
              aria-label={`إجابة سؤال القراءة ${index + 1}`}
              placeholder={arabic ? "اكتب إجابتك بالعربية…" : "Write your answer…"}
              onChange={(event) =>
                onChange((previous) => ({
                  ...previous,
                  readingDrafts: { ...previous.readingDrafts, [index]: event.target.value },
                }))
              }
            />
            <div className="l48-reading-actions">
              <button
                type="button"
                className="l48-button l48-button--outline"
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
              <div className="l48-answer-model">
                <p dir={arabic ? "rtl" : "ltr"} lang={arabic ? "ar" : "en"}>
                  {item.answer}
                </p>
                <p dir="rtl" lang="ar">
                  <Mixed48 text={item.ar} />
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
   مهمة الكتابة
   ============================================================ */

export const MODEL_48 =
  "Yesterday was a day full of decisions. " +
  "I can organise my time well, and I could already read English stories when I was nine. " +
  "I had to finish a school project before the weekend, and I must admit that I started late. " +
  "I might visit the library tomorrow because I need two more books. " +
  "Before I left home, I asked my mother, \"May I use your laptop for an hour?\" " +
  "She smiled and said, \"Yes, you may.\" At the library, I mustn't speak loudly. " +
  "I don't have to buy any books because I can borrow them for free. " +
  "My sister told me that I should take a short break, and I think students ought to plan their work carefully. " +
  "My friend asked, \"Would you like to join us for lunch?\" " +
  "I said, \"I'd love to, but I'd rather finish my research first.\" " +
  "I'd rather work in a quiet room than sit in a noisy café. " +
  "I'd like to help my brother with his project tomorrow. " +
  "Then I asked my friend, \"Could you help me find this book?\" " +
  "I also asked the librarian, \"Would you mind showing me the history section?\" " +
  "At the end of the day, I felt proud because I had made good decisions.";

export function Writing48({ workspace, onChange }: { workspace: Workspace48; onChange: SetWorkspace }) {
  const lower = workspace.writing.toLowerCase().replace(/[’‘]/g, "'");
  const count = (pattern: RegExp) => (lower.match(pattern) || []).length;
  const sentences = workspace.writing
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter(Boolean).length;
  const checks: { ar: string; en: string; met: boolean }[] = [
    { ar: "جملة عن القدرة باستخدام", en: "CAN", met: /\bcan\b/.test(lower) },
    { ar: "جملة عن قدرة ماضية باستخدام", en: "COULD", met: /\bcould\b/.test(lower) },
    { ar: "جملة عن الاحتمال باستخدام", en: "MAY / MIGHT", met: /\b(?:may|might)\b/.test(lower) },
    { ar: "جملة استئذان باستخدام", en: "MAY I", met: /\bmay\s+i\b/.test(lower) },
    { ar: "جملة عن الضرورة باستخدام", en: "MUST", met: /\bmust\b/.test(lower) },
    { ar: "جملة عن الالتزام باستخدام", en: "HAVE TO", met: /\b(?:have|has|had)\s+to\b/.test(lower) },
    { ar: "جملة عن المنع باستخدام", en: "MUSTN'T", met: /\bmustn't\b|\bmust not\b/.test(lower) },
    {
      ar: "جملة عن عدم الضرورة باستخدام",
      en: "DON'T HAVE TO / NEEDN'T",
      met: /\b(?:don't|do not|doesn't|does not)\s+have\s+to\b|\bneedn't\b|\bneed not\b/.test(lower),
    },
    { ar: "جملة نصيحة باستخدام", en: "SHOULD", met: /\bshould\b/.test(lower) },
    { ar: "جملة باستخدام", en: "OUGHT TO", met: /\bought\s+to\b/.test(lower) },
    { ar: "جملة رغبة باستخدام", en: "WOULD LIKE", met: /\b(?:i'd|would)\s+like\b/.test(lower) },
    { ar: "جملة تفضيل باستخدام", en: "WOULD RATHER", met: /\b(?:i'd|would)\s+rather\b/.test(lower) },
    {
      ar: "جملة مقارنة باستخدام",
      en: "WOULD RATHER … THAN",
      met: /\b(?:i'd|would)\s+rather\b[^.?!]*\bthan\b/.test(lower),
    },
    { ar: "طلبًا مهذبًا باستخدام", en: "COULD YOU", met: /\bcould\s+you\b/.test(lower) },
    { ar: "طلبًا باستخدام", en: "WOULD YOU MIND + V-ing", met: /\bwould\s+you\s+mind\s+[a-z]+ing\b/.test(lower) },
  ];
  const metCount = checks.filter((check) => check.met).length;
  return (
    <div className="l48-writing">
      <div className="l48-writing-head">
        <p className="l48-writing-title" dir="ltr" lang="en">
          A Day Full of Decisions
        </p>
        <span className="l48-tag">
          <bdi dir="ltr">
            {metCount} / {checks.length}
          </bdi>{" "}
          معايير مستوفاة
        </span>
      </div>
      <div className="l48-writing-checks">
        {checks.map((check, index) => (
          <div key={check.en} className={check.met ? "is-met" : ""}>
            <span aria-hidden="true">{check.met ? "✓" : String(index + 1).padStart(2, "0")}</span>
            <span className="l48-check-body">
              <span>{check.ar}</span>
              <En48 className="l48-check-formula">{check.en}</En48>
            </span>
          </div>
        ))}
      </div>
      <p className="l48-instruction">
        المؤشر إرشادي: يعدّ الصيغ الظاهرة فقط، ولا يقيّم المعنى ولا التصريف. راجع قصتك بنفسك أو مع معلمك.
      </p>
      <label htmlFor="l48-writing-draft">
        مسودتك الإنجليزية <bdi dir="ltr">({sentences} sentences)</bdi>
      </label>
      <textarea
        id="l48-writing-draft"
        dir="ltr"
        lang="en"
        rows={10}
        value={workspace.writing}
        placeholder="Write your 15–20 sentence story…"
        onChange={(event) => onChange((previous) => ({ ...previous, writing: event.target.value }))}
      />
      <div className="l48-writing-meta">
        <span className={sentences >= 15 && sentences <= 20 ? "is-ok" : ""}>
          عدد الجمل المطلوب: 15–20
        </span>
        <span>
          عدد الصيغ المستوفاة: <bdi dir="ltr">{metCount} / 15</bdi>
        </span>
      </div>
      <Note48
        icon="🎤"
        text="مهمة التحدث: اقرأ قصتك بصوت واضح، ثم أجب بجمل كاملة عن: What can you do well? · What must you finish today? · What might happen tomorrow? · What should students do to succeed? · What would you rather do during the weekend?"
      />
      <label htmlFor="l48-writing-explanation">شرحك بالعربية</label>
      <textarea
        id="l48-writing-explanation"
        dir="rtl"
        lang="ar"
        rows={4}
        value={workspace.writingExplanation}
        onChange={(event) => onChange((previous) => ({ ...previous, writingExplanation: event.target.value }))}
      />
      <button
        type="button"
        className="l48-button l48-button--outline"
        aria-expanded={workspace.writingModelOpen}
        onClick={() => onChange((previous) => ({ ...previous, writingModelOpen: !previous.writingModelOpen }))}
      >
        {workspace.writingModelOpen ? "إخفاء النموذج الإرشادي" : "عرض نموذج إرشادي"}
      </button>
      {workspace.writingModelOpen && (
        <div className="l48-writing-model">
          <p dir="ltr" lang="en">
            {MODEL_48}
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   لوحة الإتقان — مبنية على الإجابات الفعلية فقط
   ============================================================ */

export function Dashboard48({ workspace, result }: { workspace: Workspace48; result: GradedTestResult48 | null }) {
  const rows = new Map<string, { checked: number; correct: number; total: number }>();
  for (const [setId, items] of Object.entries(PRACTICE_SETS_48)) {
    const skill = SKILL_OF_SET_48[setId] ?? "مهارات أخرى";
    const row = rows.get(skill) ?? { checked: 0, correct: 0, total: 0 };
    for (const item of items) {
      row.total += 1;
      if (workspace.checked[item.id]) {
        row.checked += 1;
        if (gradePractice48(item.id, workspace.answers[item.id] ?? "")) row.correct += 1;
      }
    }
    rows.set(skill, row);
  }
  const checkedTotal = [...rows.values()].reduce((sum, row) => sum + row.checked, 0);
  const correctTotal = [...rows.values()].reduce((sum, row) => sum + row.correct, 0);
  const readingAnswered = Object.values(workspace.readingDrafts).filter((value) => value.trim()).length;
  return (
    <div className="l48-dashboard">
      <div className="l48-dashboard-summary">
        <div>
          <span className="l48-mini-label">إجابات فحصتها</span>
          <bdi dir="ltr" className="l48-dashboard-big">
            {correctTotal} / {checkedTotal}
          </bdi>
          <p>تُحسب فقط البنود التي ضغطت «تحقّق» عليها. البنود غير المفحوصة لا تُحتسب ولا تُخترع لها نسبة.</p>
        </div>
        <div>
          <span className="l48-mini-label">الاختبار النهائي</span>
          <bdi dir="ltr" className="l48-dashboard-big">
            {result ? `${result.score} / ${result.total}` : "— / 25"}
          </bdi>
          <p>{result ? "النتيجة مبنية على أسئلة الاختبار الخمسة والعشرين." : "لم تُسلّم الاختبار بعد."}</p>
        </div>
        <div>
          <span className="l48-mini-label">أسئلة القراءة المكتوبة</span>
          <bdi dir="ltr" className="l48-dashboard-big">
            {readingAnswered} / 15
          </bdi>
          <p>تُعدّ الإجابات المكتوبة فقط؛ والمقارنة بالنموذج اختيارية.</p>
        </div>
      </div>
      <div className="l48-dashboard-skills">
        {[...rows.entries()].map(([skill, row]) => {
          const percent = row.checked ? Math.round((row.correct / row.checked) * 100) : 0;
          return (
            <div className="l48-skill-row" key={skill} data-skill={skill}>
              <div className="l48-skill-head">
                <span>{skill}</span>
                <bdi dir="ltr">
                  {row.checked ? `${row.correct} / ${row.checked}` : "لم يُفحص بعد"}
                </bdi>
              </div>
              <div
                className={`l48-skill-track ${row.checked ? "" : "is-empty"}`}
                role="progressbar"
                aria-label={`${skill}: ${row.checked ? `${row.correct} من ${row.checked}` : "لم يُفحص بعد"}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
              >
                <div style={{ width: `${percent}%` }} />
              </div>
              <p className="l48-skill-note">
                {row.checked ? `${row.correct} إجابة صحيحة من ${row.checked} مفحوصة (من أصل ${row.total} بندًا).` : `${row.total} بندًا متاحًا لم يُفحص منها شيء بعد.`}
              </p>
            </div>
          );
        })}
      </div>
      {result && (
        <div className="l48-dashboard-levels">
          <span className="l48-mini-label">الاختبار حسب المستوى</span>
          <ul>
            {[1, 2, 3, 4, 5].map((level) => (
              <li key={level}>
                المستوى {level} · <bdi dir="ltr">{result.byLevel[level]?.score ?? 0} / {result.byLevel[level]?.total ?? 5}</bdi>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
