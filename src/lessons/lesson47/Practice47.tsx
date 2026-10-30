import { En47, Mixed47, Note47 } from "./kit47";
import { WORD_ORDER_47 } from "./data";
import { PRACTICE_SETS_47 } from "./practiceData47";
import { gradePractice47, PRACTICE_KEYS_47 } from "./practiceKey47";

export type Workspace47 = {
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  revealed: Record<string, boolean>;
  lane: number;
  readingDrafts: Record<number, string>;
  readingOpen: Record<number, boolean>;
  showTranslation: boolean;
  dialogueAr: Record<string, boolean>;
  writing: string;
  writingExplanation: string;
  writingModelOpen: boolean;
  wordOrder: Record<string, number[]>;
  wordOrderChecked: Record<string, boolean>;
};
export const initialWorkspace47 = (): Workspace47 => ({
  answers: {}, checked: {}, revealed: {}, lane: 0, readingDrafts: {}, readingOpen: {}, showTranslation: false,
  dialogueAr: {}, writing: "", writingExplanation: "", writingModelOpen: false, wordOrder: {}, wordOrderChecked: {},
});
type SetWorkspace = (update: (previous: Workspace47) => Workspace47) => void;

const isArabic = (value: string) => /[\u0600-\u06ff]/.test(value);

export function PracticeSet47({ setId, workspace, onChange }: { setId: string; workspace: Workspace47; onChange: SetWorkspace }) {
  const items = PRACTICE_SETS_47[setId] ?? [];
  return (
    <div className="l47-practice-list" data-practice-set={setId}>
      {items.map((item, index) => {
        const value = workspace.answers[item.id] ?? "";
        const checked = Boolean(workspace.checked[item.id]);
        const correct = checked && gradePractice47(item.id, value);
        const key = PRACTICE_KEYS_47[item.id];
        const setValue = (next: string) => onChange((previous) => ({
          ...previous, answers: { ...previous.answers, [item.id]: next },
          checked: { ...previous.checked, [item.id]: false }, revealed: { ...previous.revealed, [item.id]: false },
        }));
        return (
          <section className="l47-practice-card" key={item.id} data-practice-id={item.id}>
            <div className="l47-question-top">
              <span className="l47-question-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <p dir="ltr" lang="en">{item.prompt}</p>
            </div>
            {item.instruction && <p className="l47-instruction"><Mixed47 text={item.instruction} /></p>}
            {item.options ? (
              <div className="l47-options" role="group" aria-label={`خيارات التمرين ${index + 1}`}>
                {item.options.map((option, optionIndex) => (
                  <button
                    type="button"
                    key={option}
                    aria-pressed={value === option}
                    dir={isArabic(option) ? "rtl" : "ltr"}
                    onClick={() => setValue(option)}
                  >
                    <span className="l47-option-letter" aria-hidden="true">{String.fromCharCode(65 + optionIndex)}</span>
                    {isArabic(option) ? <span dir="rtl" lang="ar">{option}</span> : <En47>{option}</En47>}
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
                className="l47-input"
              />
            )}
            <div className="l47-practice-actions">
              <button
                type="button"
                className="l47-button l47-button--dark"
                disabled={!value.trim()}
                onClick={() => onChange((previous) => ({ ...previous, checked: { ...previous.checked, [item.id]: true } }))}
              >
                تحقّق
              </button>
              {checked && !correct && (
                <button
                  type="button"
                  className="l47-button l47-button--outline"
                  aria-expanded={Boolean(workspace.revealed[item.id])}
                  onClick={() => onChange((previous) => ({ ...previous, revealed: { ...previous.revealed, [item.id]: !previous.revealed[item.id] } }))}
                >
                  {workspace.revealed[item.id] ? "إخفاء النموذج" : "عرض نموذج"}
                </button>
              )}
            </div>
            {checked && key && (
              <div role="status" className={`l47-feedback ${correct ? "is-correct" : "is-retry"}`}>
                <strong>{correct ? "✓ إجابة مناسبة" : "↺ راجع الصيغة والمعنى وحاول مجددًا"}</strong>
                <p><Mixed47 text={key.why} /></p>
                {workspace.revealed[item.id] && <p><strong>نموذج: </strong><Mixed47 text={key.model} /></p>}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   ترتيب الكلمات — بناء سؤال مهذب
   ============================================================ */

export function WordOrder47({ workspace, onChange }: { workspace: Workspace47; onChange: SetWorkspace }) {
  return (
    <div className="l47-word-order-list">
      {WORD_ORDER_47.map((task, index) => {
        const selected = workspace.wordOrder[task.id] ?? [];
        const used = new Set(selected);
        const checked = Boolean(workspace.wordOrderChecked[task.id]);
        const built = selected.map((tokenIndex) => task.shuffled[tokenIndex]);
        const complete = selected.length === task.answer.length;
        const correct = checked && complete && built.every((token, i) => token === task.answer[i]);
        const toggle = (tokenIndex: number) => onChange((previous) => {
          const current = previous.wordOrder[task.id] ?? [];
          const next = current.includes(tokenIndex) ? current.filter((item) => item !== tokenIndex) : [...current, tokenIndex];
          return {
            ...previous,
            wordOrder: { ...previous.wordOrder, [task.id]: next },
            wordOrderChecked: { ...previous.wordOrderChecked, [task.id]: false },
          };
        });
        return (
          <section className="l47-word-order" key={task.id} data-word-order={task.id}>
            <div className="l47-question-top">
              <span className="l47-question-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <p className="l47-wo-prompt"><Mixed47 text={task.prompt} /></p>
            </div>
            <div className={`l47-wo-answer ${built.length ? "" : "is-empty"}`} dir="ltr" lang="en" aria-live="polite">
              {built.length ? built.join(" ") : "Tap the cards below…"}
            </div>
            <div className="l47-wo-bank" dir="ltr" lang="en" role="group" aria-label={`بطاقات السؤال ${index + 1}`}>
              {task.shuffled.map((token, tokenIndex) => (
                <button
                  type="button"
                  key={`${token}-${tokenIndex}`}
                  className="l47-wo-token"
                  aria-pressed={used.has(tokenIndex)}
                  disabled={used.has(tokenIndex) || checked}
                  onClick={() => toggle(tokenIndex)}
                >
                  {token}
                </button>
              ))}
            </div>
            <div className="l47-practice-actions">
              <button
                type="button"
                className="l47-button l47-button--dark"
                disabled={!complete || checked}
                onClick={() => onChange((previous) => ({ ...previous, wordOrderChecked: { ...previous.wordOrderChecked, [task.id]: true } }))}
              >
                تحقّق
              </button>
              <button
                type="button"
                className="l47-button l47-button--outline"
                onClick={() => onChange((previous) => ({
                  ...previous,
                  wordOrder: { ...previous.wordOrder, [task.id]: [] },
                  wordOrderChecked: { ...previous.wordOrderChecked, [task.id]: false },
                }))}
              >
                إعادة الترتيب
              </button>
            </div>
            {checked && (
              <div role="status" className={`l47-feedback ${correct ? "is-correct" : "is-retry"}`}>
                <strong>{correct ? "✓ سؤال صحيح" : "↺ الترتيب غير صحيح — أعد المحاولة"}</strong>
                <p><Mixed47 text={correct ? "البداية بالفعل المساعد ثم الفاعل، وكل بطاقة في موضعها الصحيح." : task.hint} /></p>
                {correct && <p dir="ltr" lang="en" className="l47-wo-model">{task.answer.join(" ")}</p>}
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

export const MODEL_47 =
  "My perfect weekend would be relaxing and enjoyable. I'd like to wake up early and have breakfast with my family. " +
  "I'd like to visit a beautiful park. I'd rather spend time outdoors than stay inside all day. " +
  "In the afternoon, I'd like to meet my friends. I'd rather play football than watch television. " +
  "However, I'd rather not stay out too late. I'd like my brother to join us. " +
  "I could ask him, \"Would you like to come with us?\" If he agrees, I'd say, \"Great! We'd love to have you with us.\" " +
  "Later, I might ask my father, \"Would you mind driving us to the park?\" " +
  "I'd rather my friends arrived on time so that we could enjoy the whole afternoon together. " +
  "I think a perfect weekend should include fun, rest and time with people we love.";

const PAST_AFTER_RATHER = "(?:stayed|joined|arrived|left|came|went|was|were|studied|played|watched|finished|started|helped|travelled|traveled)";

export function Writing47({ workspace, onChange }: { workspace: Workspace47; onChange: SetWorkspace }) {
  const lower = workspace.writing.toLowerCase().replace(/[’‘]/g, "'");
  const count = (pattern: RegExp) => (lower.match(pattern) || []).length;
  const sentences = workspace.writing.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean).length;
  const checks: { ar: string; en?: string; met: boolean }[] = [
    { ar: "ثلاث جمل باستخدام", en: "WOULD LIKE", met: count(/\b(?:i'd|would|she'd|he'd|we'd|they'd|you'd)\s+like\b/g) >= 3 },
    { ar: "جملتان باستخدام", en: "WOULD RATHER", met: count(/\b(?:i'd|would|she'd|he'd|we'd|they'd|you'd)\s+rather\b/g) >= 2 },
    { ar: "جملة باستخدام", en: "WOULD RATHER … THAN", met: /\b(?:i'd|would|she'd|he'd|we'd|they'd|you'd)\s+rather\b[^.?!]*\bthan\b/.test(lower) },
    { ar: "جملة باستخدام", en: "WOULD RATHER NOT", met: /\b(?:i'd|would|she'd|he'd|we'd|they'd|you'd)\s+rather\s+not\b/.test(lower) },
    { ar: "جملة باستخدام", en: "WOULD LIKE + PERSON + TO + V1", met: /\b(?:i'd|would|she'd|he'd|we'd|they'd)\s+like\s+(?:you|him|her|them|us|me|my\s+\w+|the\s+\w+|[a-z]+)\s+to\s+[a-z]+/.test(lower) },
    { ar: "جملة سؤال باستخدام", en: "WOULD YOU LIKE", met: /\bwould\s+you\s+like\b/.test(lower) },
    { ar: "جملة طلب باستخدام", en: "WOULD YOU MIND + V-ing", met: /\bwould\s+you\s+mind\s+[a-z]+ing\b/.test(lower) },
    { ar: "جملة باستخدام", en: "WOULD RATHER + SUBJECT + PAST SIMPLE", met: new RegExp(`\\b(?:i'd|would|she'd|he'd|we'd|they'd)\\s+rather\\s+(?:you|him|her|them|us|me|my\\s+\\w+|the\\s+\\w+|[a-z]+)\\s+${PAST_AFTER_RATHER}\\b`).test(lower) },
    { ar: "إجابة مهذبة عن عرض أو دعوة", met: /(?:yes,?\s*please|i'd love to|we'd love|no,?\s*thank you|great!)/.test(lower) },
    { ar: "من 12 إلى 15 جملة", met: sentences >= 12 && sentences <= 15 },
  ];
  const metCount = checks.filter((check) => check.met).length;
  return (
    <div className="l47-writing">
      <div className="l47-writing-head">
        <p className="l47-writing-title" dir="ltr" lang="en">My Perfect Weekend</p>
        <span className="l47-tag"><bdi dir="ltr">{metCount} / {checks.length}</bdi> معايير مستوفاة</span>
      </div>
      <div className="l47-writing-checks">
        {checks.map((check, i) => (
          <div key={`${check.ar}-${check.en ?? ""}`} className={check.met ? "is-met" : ""}>
            <span aria-hidden="true">{check.met ? "✓" : String(i + 1).padStart(2, "0")}</span>
            <span className="l47-check-body">
              <span>{check.ar}</span>
              {check.en && <En47 className="l47-check-formula">{check.en}</En47>}
            </span>
          </div>
        ))}
      </div>
      <p className="l47-instruction">المؤشر إرشادي يعدّ الصيغ فقط؛ راجع المعنى وتصريف الفعل بنفسك.</p>
      <label htmlFor="l47-writing-draft">مسودتك الإنجليزية <bdi dir="ltr">({sentences} sentences)</bdi></label>
      <textarea
        id="l47-writing-draft"
        dir="ltr"
        lang="en"
        rows={10}
        value={workspace.writing}
        placeholder="Write your 12–15 sentence paragraph…"
        onChange={(event) => onChange((previous) => ({ ...previous, writing: event.target.value }))}
      />
      <Note47 text="تحدٍ إضافي: اختر ثلاث جمل من فقرتك وفسّر بالعربية سبب استخدام WOULD LIKE وWOULD RATHER وWOULD YOU MIND، ثم اكتب حوارًا قصيرًا من ستة أسطر بين شخصين يخططان لنشاط مشترك." icon="✍️" />
      <label htmlFor="l47-writing-explanation">شرحك بالعربية</label>
      <textarea
        id="l47-writing-explanation"
        dir="rtl"
        lang="ar"
        rows={4}
        value={workspace.writingExplanation}
        onChange={(event) => onChange((previous) => ({ ...previous, writingExplanation: event.target.value }))}
      />
      <button
        type="button"
        className="l47-button l47-button--outline"
        aria-expanded={workspace.writingModelOpen}
        onClick={() => onChange((previous) => ({ ...previous, writingModelOpen: !previous.writingModelOpen }))}
      >
        {workspace.writingModelOpen ? "إخفاء النموذج الإرشادي" : "عرض نموذج إرشادي"}
      </button>
      {workspace.writingModelOpen && (
        <div className="l47-writing-model"><p dir="ltr" lang="en">{MODEL_47}</p></div>
      )}
    </div>
  );
}
