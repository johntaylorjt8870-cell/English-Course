import { En46, Mixed46, Note46 } from "./kit46";
import { PRACTICE_SETS_46 } from "./practiceData46";
import { gradePractice46, PRACTICE_KEYS_46 } from "./practiceKey46";

export type Workspace46 = {
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  revealed: Record<string, boolean>;
  door: number;
  readingDrafts: Record<number, string>;
  readingOpen: Record<number, boolean>;
  showTranslation: boolean;
  writing: string;
  writingExplanation: string;
  writingModelOpen: boolean;
};
export const initialWorkspace46 = (): Workspace46 => ({
  answers: {}, checked: {}, revealed: {}, door: 0, readingDrafts: {}, readingOpen: {}, showTranslation: false,
  writing: "", writingExplanation: "", writingModelOpen: false,
});
type SetWorkspace = (update: (previous: Workspace46) => Workspace46) => void;

export function PracticeSet46({ setId, workspace, onChange }: { setId: string; workspace: Workspace46; onChange: SetWorkspace }) {
  const items = PRACTICE_SETS_46[setId] ?? [];
  return (
    <div className="l46-practice-list" data-practice-set={setId}>
      {items.map((item, index) => {
        const value = workspace.answers[item.id] ?? "";
        const checked = Boolean(workspace.checked[item.id]);
        const correct = checked && gradePractice46(item.id, value);
        const key = PRACTICE_KEYS_46[item.id];
        const setValue = (next: string) => onChange((prev) => ({
          ...prev, answers: { ...prev.answers, [item.id]: next },
          checked: { ...prev.checked, [item.id]: false }, revealed: { ...prev.revealed, [item.id]: false },
        }));
        return (
          <section className="l46-practice-card" key={item.id} data-practice-id={item.id}>
            <div className="l46-question-top"><span className="l46-question-number">{String(index + 1).padStart(2, "0")}</span><p dir="ltr" lang="en">{item.prompt}</p></div>
            {item.instruction && <p className="l46-instruction"><Mixed46 text={item.instruction} /></p>}
            {item.options ? (
              <div className="l46-options" role="group" aria-label={`خيارات التمرين ${index + 1}`}>
                {item.options.map((option) => (
                  <button type="button" key={option} aria-pressed={value === option} onClick={() => setValue(option)}>
                    {/[\u0600-\u06ff]/.test(option) ? <span dir="rtl">{option}</span> : <En46>{option}</En46>}
                  </button>
                ))}
              </div>
            ) : (
              <input dir="ltr" lang="en" type="text" value={value} onChange={(event) => setValue(event.target.value)}
                placeholder="Write your answer in English…" aria-label={`إجابة التمرين ${index + 1}`} className="l46-input" />
            )}
            <div className="l46-practice-actions">
              <button type="button" className="l46-button l46-button--dark" disabled={!value.trim()} onClick={() => onChange((prev) => ({ ...prev, checked: { ...prev.checked, [item.id]: true } }))}>تحقّق</button>
              {checked && !correct && <button type="button" className="l46-button l46-button--outline" onClick={() => onChange((prev) => ({ ...prev, revealed: { ...prev.revealed, [item.id]: !prev.revealed[item.id] } }))}>{workspace.revealed[item.id] ? "إخفاء النموذج" : "عرض نموذج"}</button>}
            </div>
            {checked && key && (
              <div role="status" className={`l46-feedback ${correct ? "is-correct" : "is-retry"}`}>
                <strong>{correct ? "✓ إجابة مناسبة" : "↺ راجع الصيغة والمعنى وحاول مجددًا"}</strong>
                <p><Mixed46 text={key.why} /></p>
                {workspace.revealed[item.id] && <p><span>نموذج: </span><Mixed46 text={key.model} /></p>}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export const MODEL_46 = "We mustn't touch the exhibits without permission. We mustn't eat in the laboratory. We don't have to wear uniforms today. Our teacher doesn't have to carry the worksheets. We needn't bring laptops. She needn't worry about lunch. We don't need to print our projects. Maya doesn't need to buy a notebook. Yesterday we didn't have to attend the extra class. I didn't need to buy a ticket, but I bought one anyway. I needn't have bought the ticket. Daniel needn't have brought his heavy laptop. Next week we won't have to pay for entry. We won't need to leave early.";

export function Writing46({ workspace, onChange }: { workspace: Workspace46; onChange: SetWorkspace }) {
  const lower = workspace.writing.toLowerCase().replace(/[’‘]/g, "'");
  const count = (pattern: RegExp) => (lower.match(pattern) || []).length;
  const sentences = workspace.writing.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean).length;
  const checks = [
    { label: "جملتان باستخدام MUSTN'T", met: count(/\b(?:mustn't|must not)\b/g) >= 2 },
    { label: "جملتان باستخدام DON'T / DOESN'T HAVE TO", met: count(/\b(?:don't|doesn't|do not|does not) have to\b/g) >= 2 },
    { label: "جملتان باستخدام NEEDN'T للحاضر", met: count(/\b(?:needn't|need not)\b(?!\s+have\b)/g) >= 2 },
    { label: "جملتان باستخدام DON'T / DOESN'T NEED TO", met: count(/\b(?:don't|doesn't|do not|does not) need to\b/g) >= 2 },
    { label: "جملة باستخدام DIDN'T HAVE TO", met: count(/\b(?:didn't|did not) have to\b/g) >= 1 },
    { label: "جملة باستخدام DIDN'T NEED TO", met: count(/\b(?:didn't|did not) need to\b/g) >= 1 },
    { label: "جملتان باستخدام NEEDN'T HAVE + V3", met: count(/\b(?:needn't|need not) have\s+[a-z]+/g) >= 2 },
    { label: "جملة باستخدام WON'T HAVE TO", met: count(/\b(?:won't|will not) have to\b/g) >= 1 },
    { label: "جملة باستخدام WON'T NEED TO", met: count(/\b(?:won't|will not) need to\b/g) >= 1 },
    { label: "من 12 إلى 15 جملة", met: sentences >= 12 && sentences <= 15 },
  ];
  return (
    <div className="l46-writing">
      <p className="l46-writing-title" dir="ltr" lang="en">A Day of Rules and Choices</p>
      <div className="l46-writing-checks">
        {checks.map((check, i) => <div key={check.label} className={check.met ? "is-met" : ""}><span aria-hidden="true">{check.met ? "✓" : String(i + 1).padStart(2, "0")}</span><Mixed46 text={check.label} /></div>)}
      </div>
      <p className="l46-instruction">المؤشر إرشادي يعدّ الصيغ فقط؛ راجع المعنى وتصريف الفعل بنفسك.</p>
      <label htmlFor="l46-writing-draft">مسودتك الإنجليزية <bdi dir="ltr">({sentences} sentences)</bdi></label>
      <textarea id="l46-writing-draft" dir="ltr" lang="en" rows={9} value={workspace.writing} placeholder="Write your 12–15 sentence paragraph…" onChange={(event) => onChange((prev) => ({ ...prev, writing: event.target.value }))} />
      <Note46 text="تحدٍ إضافي: اختر جملة بـ DIDN'T NEED TO وأخرى بـ NEEDN'T HAVE، واشرح الفرق بينهما بالعربية." />
      <label htmlFor="l46-writing-explanation">شرح الفرق بالعربية</label>
      <textarea id="l46-writing-explanation" dir="rtl" lang="ar" rows={3} value={workspace.writingExplanation} onChange={(event) => onChange((prev) => ({ ...prev, writingExplanation: event.target.value }))} />
      <button type="button" className="l46-button l46-button--outline" aria-expanded={workspace.writingModelOpen} onClick={() => onChange((prev) => ({ ...prev, writingModelOpen: !prev.writingModelOpen }))}>{workspace.writingModelOpen ? "إخفاء النموذج الإرشادي" : "عرض نموذج إرشادي"}</button>
      {workspace.writingModelOpen && <div className="l46-writing-model"><p dir="ltr" lang="en">{MODEL_46}</p></div>}
    </div>
  );
}
