import { useId, useState, type ReactNode } from "react";
import { En, PlatformTag, Rich } from "../../shared/lessonKit";

export const FOCUS_35 = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0f8f7d]/35";

/** Normalise learner typing before comparing it with an accepted answer. */
export function normalize35(value: string) {
  return value
    .replace(/[\u200e\u200f\u202a-\u202e]/g, "")
    .replace(/[’‘`]/g, "'")
    .replace(/[.,!?؟:;]+/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function matches35(value: string, accepted: string[]) {
  const normalized = normalize35(value);
  if (!normalized) return false;
  return accepted.some((candidate) => normalize35(candidate) === normalized);
}

export function Card35({
  eyebrow,
  title,
  tone = "mint",
  children,
  className = "",
  id,
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  tone?: "mint" | "plan" | "predict" | "sun" | "sky" | "plain";
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`fg35-card ${className}`.trim()} data-tone={tone === "plain" ? undefined : tone}>
      {eyebrow ? <div className="fg35-card__eyebrow">{eyebrow}</div> : null}
      {title ? <h3>{title}</h3> : null}
      {children}
    </section>
  );
}

export function SourceLine35({
  text,
  emphasis = false,
  ok,
  bad,
  label,
}: {
  text: string;
  emphasis?: boolean;
  ok?: boolean;
  bad?: boolean;
  label?: string;
}) {
  return (
    <span className="fg35-source" data-emphasis={emphasis || undefined} data-ok={ok || undefined} data-bad={bad || undefined}>
      {label ? <span className="fg35-source__label">{label}</span> : null}
      <Rich text={text} />
    </span>
  );
}

export function SourceGroup35({
  lines,
  label,
  offset,
}: {
  lines: string[];
  label?: string;
  offset?: number;
}) {
  return (
    <div data-source-block data-source-offset={offset}>
      {label ? <div className="fg35-source__label">{label}</div> : null}
      <div className="fg35-sourcegroup">
        {lines.map((line, index) => (
          <SourceLine35 key={`${index}-${line}`} text={line} />
        ))}
      </div>
    </div>
  );
}

/** Clearly-marked platform addition, never presented as textbook wording. */
export function PlatformNote35({ children, title = "إضافة تعليمية من المنصة" }: { children: ReactNode; title?: string }) {
  return (
    <div className="fg35-platform">
      <span className="fg35-platform__tag">🧩 {title}</span>
      <div>{children}</div>
    </div>
  );
}

/** Bilingual example: English is LTR-isolated, Arabic stays in the RTL flow. */
export function Example35({
  en,
  ar,
  note,
  tone,
  status,
}: {
  en: string;
  ar?: ReactNode;
  note?: ReactNode;
  tone?: "predict" | "sun" | "sky" | "mint";
  status?: "ok" | "bad";
}) {
  return (
    <div className={`fg35-ex${status === "ok" ? " fg35-ex--ok" : status === "bad" ? " fg35-ex--bad" : ""}`} data-tone={tone}>
      <span className="fg35-en" dir="ltr">
        {status === "ok" ? <span className="fg35-ex__mark" aria-hidden>✓ </span> : null}
        {status === "bad" ? <span className="fg35-ex__mark" aria-hidden>✕ </span> : null}
        {en}
      </span>
      {ar ? <span className="fg35-ar">{ar}</span> : null}
      {note ? <span className="fg35-muted">{note}</span> : null}
    </div>
  );
}

export type FormulaPart35 = { text: string; role?: "subject" | "aux" | "going" | "verb" | "rest"; hint?: string };

/** Colour-coded sentence frame: Subject + am/is/are + going to + V1 + Rest. */
export function Formula35({ label, parts }: { label?: string; parts: FormulaPart35[] }) {
  return (
    <div className="fg35-formula" role="group" aria-label={label || parts.map((part) => part.text).join(" + ")} dir="ltr">
      {parts.map((part, index) => (
        <span key={`${part.text}-${index}`} style={{ display: "contents" }}>
          {index > 0 ? <span className="fg35-formula__plus" aria-hidden>+</span> : null}
          <span className="fg35-formula__part" data-role={part.role}>
            {part.text}
            {part.hint ? <small>{part.hint}</small> : null}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Two-speaker dialogue with Arabic glosses under each English turn. */
export function Dialog35({ turns }: { turns: { who: string; en: ReactNode; ar?: ReactNode }[] }) {
  return (
    <div className="fg35-stack" style={{ marginTop: 6 }}>
      {turns.map((turn, index) => {
        const adam = /^adam/i.test(turn.who);
        return (
          <div className="fg35-turn" data-who={adam ? "adam" : "nora"} key={`${turn.who}-${index}`}>
            <span className="fg35-turn__who">{turn.who}</span>
            <div className="fg35-turn__body">
              <span className="fg35-en" dir="ltr">{turn.en}</span>
              {turn.ar ? <span className="fg35-ar">{turn.ar}</span> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Compact two-column table for the lesson's comparison and auxiliary grids. */
export function Table35({ ariaLabel, headers, rows }: { ariaLabel: string; headers: [string, string] | string[]; rows: { a: string; b: string }[] }) {
  return (
    <div className="fg35-tablewrap">
      <table className="fg35-table" aria-label={ariaLabel}>
        <thead>
          <tr>
            {headers.map((header) => <th key={header} scope="col">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.a}-${row.b}`}>
              <th scope="row"><Rich text={row.a} /></th>
              <td><Rich text={row.b} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type ChoiceOption35 = { text: ReactNode; ar?: ReactNode; correct?: boolean; note?: ReactNode };

/** Immediate, explanatory single-choice check. Retrying is always allowed. */
export function Choice35({
  question,
  options,
  explanation,
  columns = false,
  correctText,
}: {
  question: ReactNode;
  options: ChoiceOption35[];
  explanation: ReactNode;
  columns?: boolean;
  correctText?: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const correctIndex = options.findIndex((option) => option.correct);
  const isRight = picked !== null && picked === correctIndex;
  return (
    <div data-choice-check>
      <p className="fg35-prose" style={{ marginTop: 0, fontWeight: 800 }}>{question}</p>
      <div className={`fg35-choices ${columns ? "fg35-choices--inline" : ""}`} role="group">
        {options.map((option, index) => {
          const state = picked === null ? undefined : index === correctIndex ? "correct" : picked === index ? "wrong" : "picked";
          return (
            <button
              key={index}
              type="button"
              className={`fg35-choice ${FOCUS_35}`}
              data-state={state}
              aria-pressed={picked === index}
              onClick={() => setPicked(index)}
            >
              <span style={{ display: "block" }}>{option.text}</span>
              {option.ar ? <span className="fg35-ar">{option.ar}</span> : null}
              {picked !== null && index === correctIndex && option.note ? (
                <span className="fg35-muted" style={{ display: "block", marginTop: 3 }}>{option.note}</span>
              ) : null}
            </button>
          );
        })}
      </div>
      {picked !== null ? (
        <div className="fg35-feedback" data-ok={isRight} role="status">
          <b>{isRight ? "✓ إجابة صحيحة. " : "↺ ليست الاختيار الأنسب بعد. "}</b>
          {isRight && correctText ? <span className="fg35-en" dir="ltr">{correctText} </span> : null}
          <Rich text={typeof explanation === "string" ? explanation : ""} />
          {typeof explanation !== "string" ? explanation : null}
        </div>
      ) : null}
    </div>
  );
}

/** Typed recall with a source-key reveal after the first attempt. */
export function Input35({
  question,
  accept,
  answer,
  explanation,
  placeholder = "اكتب الإجابة بالإنجليزية…",
  multiline = false,
  label,
}: {
  question?: ReactNode;
  accept: string[];
  answer: string;
  explanation: ReactNode;
  placeholder?: string;
  multiline?: boolean;
  label: string;
}) {
  const id = useId();
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const ok = matches35(value, accept);
  return (
    <div>
      {question ? <div className="fg35-prose" style={{ marginTop: 0 }}>{question}</div> : null}
      <label className="fg35-sr" htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea
          id={id}
          className="fg35-textarea"
          dir="ltr"
          rows={2}
          value={value}
          placeholder={placeholder}
          onChange={(event) => {
            setValue(event.target.value);
            if (checked) setChecked(false);
          }}
        />
      ) : (
        <div className="fg35-inputrow">
          <input
            id={id}
            className="fg35-input"
            type="text"
            dir="ltr"
            autoComplete="off"
            value={value}
            placeholder={placeholder}
            onChange={(event) => {
              setValue(event.target.value);
              if (checked) setChecked(false);
            }}
          />
        </div>
      )}
      <div className="fg35-inputrow">
        <button type="button" className={`fg35-btn ${FOCUS_35}`} disabled={!value.trim()} onClick={() => setChecked(true)}>
          تحقق
        </button>
        <button type="button" className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`} onClick={() => setChecked(true)}>
          أظهر مفتاح المصدر
        </button>
      </div>
      {checked ? (
        <div className="fg35-feedback" data-ok={ok} role="status">
          <b>{ok ? "✓ مطابق. " : "✕ راجع الصياغة. "}</b>
          <span className="fg35-en" dir="ltr">{answer}</span>
          <div style={{ marginTop: 4 }}>{explanation}</div>
        </div>
      ) : null}
    </div>
  );
}

/** One item of a supplied exercise: prompt + keyed answer + explanation. */
export function PracticeItem35({
  n,
  prompt,
  answer,
  explanation,
  mode = "repair",
}: {
  n: number;
  prompt: string;
  answer: string;
  explanation: string;
  mode?: "repair" | "text";
}) {
  return (
    <div className="fg35-question" data-practice-item={n}>
      <div className="fg35-q__prompt">
        <span className="fg35-q__n">{n}</span>
        <span className="fg35-wide"><Rich text={prompt} /></span>
      </div>
      <Input35
        label={`إجابة البند ${n}`}
        accept={[answer]}
        answer={answer}
        explanation={<Rich text={explanation} />}
        placeholder={mode === "repair" ? "Write the corrected sentence…" : "Write the missing form…"}
      />
    </div>
  );
}

/** Options drill (am / is / are) with an immediate authorial explanation. */
export function OptionDrill35({
  n,
  prompt,
  options,
  answer,
  explanation,
}: {
  n: number;
  prompt: ReactNode;
  options: string[];
  answer: string;
  explanation: string;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const ok = picked === answer;
  return (
    <div className="fg35-question" data-option-drill={n}>
      <div className="fg35-q__prompt">
        <span className="fg35-q__n">{n}</span>
        <span className="fg35-wide">{prompt}</span>
      </div>
      <div className="fg35-choices fg35-choices--inline" role="group" aria-label={`البند ${n}`}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`fg35-choice ${FOCUS_35}`}
            data-state={picked === null ? undefined : option === answer ? "correct" : picked === option ? "wrong" : "picked"}
            aria-pressed={picked === option}
            onClick={() => setPicked(option)}
          >
            <span className="fg35-en" dir="ltr">{option}</span>
          </button>
        ))}
      </div>
      {picked !== null ? (
        <div className="fg35-feedback" data-ok={ok} role="status">
          <b>{ok ? "✓ صحيح. " : `✕ الصحيح: ${answer}. `}</b>
          <Rich text={explanation} />
        </div>
      ) : null}
    </div>
  );
}

/** Stage-A goal list; learners can mark what they can already do. */
export function TapChecks35({ items }: { items: string[] }) {
  const [on, setOn] = useState<Record<number, boolean>>({});
  const done = Object.values(on).filter(Boolean).length;
  return (
    <div>
      <div className="fg35-stack">
        {items.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`fg35-tapcheck ${FOCUS_35}`}
            aria-pressed={!!on[index]}
            onClick={() => setOn((current) => ({ ...current, [index]: !current[index] }))}
          >
            <span className="fg35-tapcheck__box" aria-hidden>✓</span>
            <span>{item}</span>
          </button>
        ))}
      </div>
      <p className="fg35-muted" aria-live="polite" style={{ marginTop: 6 }}>
        {done === 0 ? "علّم ما تشعر أنك تستطيع فعله الآن؛ سنعود إلى القائمة في نهاية الدرس." : `علّمت ${done} من ${items.length}. أعد تقييم نفسك بعد الاختبار.`}
      </p>
    </div>
  );
}

export function Bullets35({ items }: { items: ReactNode[] }) {
  return (
    <ol className="fg35-numlist">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
}

/** Two-column plan vs prediction framing. */
export function PlanPredict35({
  planTitle = "خطة / نية سابقة",
  plan,
  predictTitle = "توقع من دليل حاضر",
  predict,
}: {
  planTitle?: string;
  plan: ReactNode;
  predictTitle?: string;
  predict: ReactNode;
}) {
  return (
    <div className="fg35-duo">
      <div className="fg35-plan">
        <div className="fg35-plan__title">🌱 {planTitle}</div>
        {plan}
      </div>
      <div className="fg35-predict">
        <div className="fg35-predict__title">☀️ {predictTitle}</div>
        {predict}
      </div>
    </div>
  );
}

export function EnglishLine35({ children }: { children: ReactNode }) {
  return <span className="fg35-en" dir="ltr">{children}</span>;
}

export function Note35({ children }: { children: ReactNode }) {
  return <div className="fg35-teacher-note">{children}</div>;
}

export function Tag35({ children, kind = "neutral" }: { children: ReactNode; kind?: "neutral" | "authored" | "source" }) {
  return <span className={`fg35-tag ${kind === "authored" ? "fg35-tag--authored" : kind === "source" ? "fg35-tag--source" : ""}`}>{children}</span>;
}

export function PlatformInline35({ children }: { children: ReactNode }) {
  return (
    <p className="fg35-muted" style={{ marginTop: 6 }}>
      <PlatformTag text="إضافة تعليمية من المنصة" /> {children}
    </p>
  );
}

export function EnLine({ children }: { children: ReactNode }) {
  return <En className="fg35-strong">{children}</En>;
}
