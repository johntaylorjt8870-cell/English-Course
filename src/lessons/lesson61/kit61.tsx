import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";
import type { Pair61 } from "./content61";
import type { AttemptItem61 } from "./practice61";

export function En61({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span dir="ltr" lang="en" className={`l61-en ${className}`.trim()}>{children}</span>;
}
export function Mixed61({ text }: { text: string }) { return <span className="l61-mixed"><LatinRuns text={text} /></span>; }
export function Scene61({ kicker, title, lead, children }: { kicker: string; title: string; lead?: string; children: ReactNode }) {
  return <section className="l61-scene"><header className="l61-scene-head"><div className="l61-kicker" dir="ltr">{kicker}</div><h2><Mixed61 text={title} /></h2>{lead && <p><Mixed61 text={lead} /></p>}</header>{children}</section>;
}
export function PairView61({ pair, index }: { pair: Pair61; index?: number }) {
  return <article className="l61-transfer" data-l61-pair>
    {index !== undefined && <div className="l61-transfer-index" dir="ltr">{String(index).padStart(2, "0")}</div>}
    <div className="l61-transfer-track">
      <div className="l61-transfer-line"><span className="l61-port" dir="ltr">IN</span><div><div className="l61-sentence"><En61>{pair.direct}</En61></div>{pair.directAr && <p>{pair.directAr}</p>}</div></div>
      <div className="l61-transfer-line l61-transfer-line--out"><span className="l61-port" dir="ltr">OUT</span><div><div className="l61-sentence"><En61>{pair.reported}</En61></div>{pair.alternative && <div className="l61-alternative"><En61>{pair.alternative}</En61></div>}{pair.ar && <p>{pair.ar}</p>}</div></div>
      {pair.note && <div className="l61-transfer-note"><Mixed61 text={pair.note} /></div>}
    </div>
  </article>;
}

// Lesson-scoped memory lives above the keyed scenes. It preserves drafts, checked
// items and lab progress while the learner navigates, without changing shared APIs.
type Memory61 = { values: Record<string, unknown>; setValue: (key: string, next: unknown) => void };
const MemoryContext61 = createContext<Memory61 | null>(null);
export function MemoryProvider61({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const setValue = useCallback((key: string, next: unknown) => setValues((old) => ({ ...old, [key]: next })), []);
  const value = useMemo(() => ({ values, setValue }), [values, setValue]);
  return <MemoryContext61.Provider value={value}>{children}</MemoryContext61.Provider>;
}
export function useMemory61<T>(key: string, initial: T): [T, (next: T) => void] {
  const memory = useContext(MemoryContext61);
  if (!memory) throw new Error("Lesson 61 memory provider is missing");
  return [Object.prototype.hasOwnProperty.call(memory.values, key) ? memory.values[key] as T : initial, (next: T) => memory.setValue(key, next)];
}
export function useMemorySnapshot61() {
  const memory = useContext(MemoryContext61);
  if (!memory) throw new Error("Lesson 61 memory provider is missing");
  return memory.values;
}

// if/whether are equivalent in these Yes/No models (none uses adjacent "or not").
// Punctuation and case do not determine whether a full-sentence answer matches.
export function normalize61(value: string): string {
  return value.toLowerCase().replace(/[’‘]/g, "'")
    // Only interchange the reporting-question linker, never a conditional if.
    .replace(/(\basked(?:\s+(?:me|him|her|us|them|the students|the teacher))?\s+)whether\b/g, "$1if")
    .replace(/[“”"«»]/g, "").replace(/[.,!?;:،؟]+/g, " ").replace(/\s+/g, " ").trim();
}
export function matches61(value: string, answer: string, accept: string[] = []) {
  const normalized = normalize61(value);
  return normalized.length > 0 && [answer, ...accept].some((candidate) => normalize61(candidate) === normalized);
}
export type AttemptMemory61 = { value: string; checked: boolean };
export function Attempt61({ item, index, memoryKey }: { item: AttemptItem61; index: number; memoryKey: string }) {
  const [state, setState] = useMemory61<AttemptMemory61>(memoryKey, { value: "", checked: false });
  const right = matches61(state.value, item.answer, item.accept);
  const arabicPrompt = /[\u0600-\u06ff]/.test(item.prompt);
  return <article className="l61-attempt" data-l61-attempt={index}>
    <div className="l61-attempt-number" dir="ltr">{String(index).padStart(2, "0")}</div>
    <div className="l61-attempt-body">
      <div className="l61-prompt" dir={arabicPrompt ? "rtl" : "ltr"}>{arabicPrompt ? <Mixed61 text={item.prompt} /> : <En61>{item.prompt}</En61>}</div>
      {item.hint && <p className="l61-hint"><Mixed61 text={item.hint} /></p>}
      {item.options ? <div className="l61-options" role="group" aria-label={`اختيارات السؤال ${index}`} dir="ltr">
        {item.options.map((option) => <button type="button" key={option} aria-pressed={state.value === option} className={state.value === option ? "is-selected" : ""} onClick={() => setState({ value: option, checked: false })}><En61>{option}</En61></button>)}
      </div> : <label className="l61-input-label"><span>إجابتك بالإنجليزية</span><input type="text" dir="ltr" lang="en" value={state.value} aria-label={`إجابة السؤال ${index}`} placeholder="Write your answer..." onChange={(event) => setState({ value: event.target.value, checked: false })} onKeyDown={(event) => { if (event.key === "Enter" && state.value.trim()) setState({ ...state, checked: true }); }} /></label>}
      <div className="l61-actions"><button type="button" className="l61-button" disabled={!state.value.trim()} onClick={() => setState({ ...state, checked: true })}>تحقّق من الإجابة</button>{state.checked && <button type="button" className="l61-button l61-button--quiet" onClick={() => setState({ value: "", checked: false })}>إعادة المحاولة</button>}</div>
      {state.checked && <div className={`l61-feedback ${right ? "is-right" : "is-wrong"}`} role="status" data-l61-feedback>
        <strong>{right ? "إجابة صحيحة" : "لا تطابق النموذج؛ راجع إجابتك"}</strong>
        <div>النموذج: <En61>{item.answer}</En61></div>
        {item.accept && item.accept.length > 0 && <div className="l61-accept">صيغة أخرى مقبولة: <En61>{item.accept[0]}</En61></div>}
        <div><Mixed61 text={item.why} /></div>{item.ar && <div>{item.ar}</div>}
      </div>}
    </div>
  </article>;
}
