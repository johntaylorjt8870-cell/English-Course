import { useCallback, useId, useMemo, useState, type CSSProperties, type ReactNode, createContext, useContext } from "react";
import { LatinRuns } from "../../shared/bidi";
import type { Change62, ChangeKind62, ShiftPair62 } from "./content62";

/* ============================================================
   Lesson 62 kit — THE VERB CHOICE STUDIO
   عناصر عرض خاصة بالدرس 62 فقط: بطاقات فعل، مسارات تحويل،
   مصفوفات تراكيب، وأدوات تفاعلية للتمييز بين الأفعال المتشابهة.
   هوية بصرية مستقلة: لوحة ألوان بنفسجية-زرقاء تميز "دقة الاختيار".
   ============================================================ */

// ------------------------------------------------------------
// سياق ذاكرة الدرس (للحفاظ على حالة المحاولات عبر المكونات)
// ------------------------------------------------------------
interface MemoryValues62 { [key: string]: unknown; }
interface MemoryContextValue62 { values: MemoryValues62; setValue: (key: string, next: unknown) => void; }
const MemoryContext62 = createContext<MemoryContextValue62 | null>(null);

export function MemoryProvider62({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<MemoryValues62>({});
  const setValue = useCallback((key: string, next: unknown) => setValues((old) => ({ ...old, [key]: next })), []);
  const value = useMemo(() => ({ values, setValue }), [values, setValue]);
  return <MemoryContext62.Provider value={value}>{children}</MemoryContext62.Provider>;
}

export function useMemory62<T>(key: string, initial: T): [T, (next: T) => void] {
  const memory = useContext(MemoryContext62);
  if (!memory) throw new Error("Lesson 62 memory provider is missing");
  return [Object.prototype.hasOwnProperty.call(memory.values, key) ? memory.values[key] as T : initial, (next: T) => memory.setValue(key, next)];
}

export function useMemorySnapshot62() {
  const memory = useContext(MemoryContext62);
  if (!memory) throw new Error("Lesson 62 memory provider is missing");
  return memory.values;
}

// ------------------------------------------------------------
// عوازل اتجاه النص
// ------------------------------------------------------------
export function En62({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <span dir="ltr" lang="en" className={`l62-en ${className}`.trim()} style={style}>{children}</span>;
}

const RANGE_62 = /([0-90-9]+[  ]?[–—-][  ]?[0-90-9]+)/g;

export function Mixed62({ text, className = "", style }: { text: string; className?: string; style?: CSSProperties }) {
  const source = text ?? "";
  const parts = source.split(RANGE_62);
  return (
    <span className={className} style={style}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <bdi key={i} dir="ltr" className="l62-range">{part}</bdi>
        ) : (
          <LatinRuns key={i} text={part} />
        ),
      )}
    </span>
  );
}

// ------------------------------------------------------------
// ألوان أنواع التغيير — كل تغيير يحمل نوعه لونًا واسمًا
// ------------------------------------------------------------
export const KIND_STYLE_62: Record<ChangeKind62, { label: string; ar: string; color: string }> = {
  verb: { label: "VERB", ar: "فعل النقل", color: "#7c3aed" },
  tense: { label: "TENSE", ar: "الزمن", color: "#2563eb" },
  pronoun: { label: "PRONOUN", ar: "الضمير", color: "#059669" },
  time: { label: "TIME", ar: "الزمان", color: "#dc2626" },
  place: { label: "PLACE", ar: "المكان / الإشارة", color: "#ea580c" },
  modal: { label: "MODAL", ar: "الفعل الناقص", color: "#db2777" },
  form: { label: "FORM", ar: "الشكل", color: "#65a30d" },
  prep: { label: "PREP", ar: "حرف الجر", color: "#0891b2" },
};

export function ShiftChip62({ change, size = "md" }: { change: Change62; size?: "sm" | "md" }) {
  const style = KIND_STYLE_62[change.kind];
  return (
    <span
      className={`l62-chip l62-chip--${change.kind}${size === "sm" ? " l62-chip--sm" : ""}`}
      style={{ "--chip-color": style.color } as CSSProperties}
      title={change.note}
    >
      <small>{style.label}</small>
      <bdi dir="ltr" className="l62-chip-shift">
        {change.from === "—" ? `+ ${change.to}` : change.to === "—" ? `– ${change.from}` : `${change.from} → ${change.to}`}
      </bdi>
    </span>
  );
}

// ------------------------------------------------------------
// إطار المشهد — هوية بصرية جديدة للدرس 62
// ------------------------------------------------------------
export function Scene62({
  n,
  kicker,
  title,
  en,
  subtitle,
  lead,
  children,
  booth = false,
}: {
  n?: string;
  kicker?: string;
  title: string;
  en?: string;
  subtitle?: string;
  lead?: string;
  children: ReactNode;
  booth?: boolean;
}) {
  return (
    <section className={`l62-scene${booth ? " l62-scene--booth" : ""}`}>
      {(kicker || n) && (
        <div className="l62-kicker">
          {n && <span>{n}</span>}
          {kicker}
        </div>
      )}
      <h2 className="l62-title"><Mixed62 text={title} /></h2>
      {en && <div className="l62-title-en"><En62>{en}</En62></div>}
      {subtitle && <div className="l62-subtitle">{subtitle}</div>}
      {lead && <p className="l62-lead"><Mixed62 text={lead} /></p>}
      {children}
    </section>
  );
}

// ------------------------------------------------------------
// بطاقة فعل نقل — تعرض الفعل، معناه، تراكيبه، وأمثلة
// ------------------------------------------------------------
export type VerbCard62Props = {
  verb: string;
  meaning: string;
  structures: string[];
  examples: { en: string; ar: string }[];
  color: string;
  group: "admit-deny" | "suggest-rec" | "promise-group" | "advise-group" | "warn-group" | "apologize-group" | "explain-group" | "insist-group";
};

export function VerbCard62({ verb, meaning, structures, examples, color, group }: VerbCard62Props) {
  return (
    <article className="l62-verb-card" data-group={group} style={{ "--verb-color": color } as CSSProperties}>
      <header className="l62-verb-head">
        <div className="l62-verb-main">
          <En62 className="l62-verb-word">{verb}</En62>
          <span className="l62-verb-meaning">{meaning}</span>
        </div>
        <span className="l62-verb-badge" style={{ background: color }}>{group}</span>
      </header>
      <div className="l62-verb-structures">
        {structures.map((s, i) => (
          <span key={i} className="l62-struct-tag"><En62>{s}</En62></span>
        ))}
      </div>
      <div className="l62-verb-examples">
        {examples.map((ex, i) => (
          <div key={i} className="l62-ex-row">
            <En62>{ex.en}</En62>
            <span className="l62-ex-ar">{ex.ar}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

// ------------------------------------------------------------
// فقاعة كلام — متحدث أصلي (direct) أو راوٍ (reported)
// ------------------------------------------------------------
export function Bubble62({
  variant,
  who,
  en,
  ar,
  caption,
}: {
  variant: "direct" | "reported";
  who: string;
  en: string;
  ar?: string;
  caption?: string;
}) {
  return (
    <figure className={`l62-bubble l62-bubble--${variant}`}>
      <figcaption>
        <i aria-hidden>{variant === "direct" ? "◉" : "◎"}</i>
        <b>{who}</b>
        <small>{variant === "direct" ? "DIRECT · كلام مباشر" : "REPORTED · كلام منقول"}</small>
      </figcaption>
      <blockquote><En62>{en}</En62></blockquote>
      {ar && <p className="l62-bubble-ar">{ar}</p>}
      {caption && <small className="l62-bubble-cap">{caption}</small>}
    </figure>
  );
}

// ------------------------------------------------------------
// زوج «مباشر → منقول» مع مسار يحمل شرائح التغيير
// ------------------------------------------------------------
export function TransferPair62({
  pair,
  index,
  whoDirect = "المتحدث الأصلي",
  whoReported = "الراوي",
  compact = false,
}: {
  pair: ShiftPair62;
  index?: number;
  whoDirect?: string;
  whoReported?: string;
  compact?: boolean;
}) {
  return (
    <article className={`l62-transfer${compact ? " l62-transfer--compact" : ""}`}>
      <div className="l62-transfer-grid">
        <Bubble62 variant="direct" who={whoDirect} en={pair.direct} ar={pair.directAr} />
        <div className="l62-path" aria-hidden={!pair.changes?.length}>
          <span className="l62-path-arrow">⟶</span>
          {pair.changes && pair.changes.length > 0 && (
            <div className="l62-path-gates">
              {pair.changes.map((change) => (
                <ShiftChip62 key={`${change.from}-${change.to}`} change={change} size="sm" />
              ))}
            </div>
          )}
        </div>
        <Bubble62 variant="reported" who={whoReported} en={pair.reported} ar={pair.reportedAr} />
      </div>
      {pair.changes?.some((c) => c.note) && (
        <ul className="l62-transfer-notes">
          {pair.changes.filter((c) => c.note).map((c) => (
            <li key={`${c.from}-note`}><Mixed62 text={c.note!} /></li>
          ))}
        </ul>
      )}
      {pair.note && <p className="l62-note"><Mixed62 text={pair.note} /></p>}
      {index !== undefined && <span className="l62-transfer-num">{String(index).padStart(2, "0")}</span>}
    </article>
  );
}

// ------------------------------------------------------------
// جدول تحويل: Direct → Reported (+ ملاحظة اختيارية)
// ------------------------------------------------------------
export function MapTable62({
  rows,
  head = ["Direct Speech", "Reported Speech"],
  tone = "paper",
}: {
  rows: { direct: string; reported: string; note?: string }[];
  head?: [string, string] | [string, string, string];
  tone?: "paper" | "booth";
}) {
  const withNote = rows.some((row) => row.note);
  return (
    <div className={`l62-table${tone === "booth" ? " l62-table--booth" : ""}`} role="table">
      <div className="l62-table-head" role="row">
        <span role="columnheader"><En62>{head[0]}</En62></span>
        <span role="columnheader" aria-hidden>⟶</span>
        <span role="columnheader"><En62>{head[1]}</En62></span>
        {withNote && <span role="columnheader">{head[2] ?? "ملاحظة"}</span>}
      </div>
      {rows.map((row) => (
        <div className="l62-table-row" role="row" key={row.direct}>
          <span role="cell"><En62>{row.direct}</En62></span>
          <span role="cell" aria-hidden className="l62-table-arrow">⟶</span>
          <span role="cell"><En62>{row.reported}</En62></span>
          {withNote && <span role="cell" className="l62-table-note">{row.note ?? ""}</span>}
        </div>
      ))}
    </div>
  );
}

// ------------------------------------------------------------
// مصفوفة تراكيب تفاعلية — تعرض 6 تراكيب مع أمثلة
// ------------------------------------------------------------
export type StructureMatrixItem = {
  id: string;
  name: string;
  pattern: string;
  verbs: string[];
  examples: { en: string; ar: string }[];
  color: string;
};

export function StructureMatrix62({ items, onSelect }: { items: StructureMatrixItem[]; onSelect?: (id: string) => void }) {
  return (
    <div className="l62-matrix" role="list" aria-label="مصفوفة التراكيب الستة">
      {items.map((item) => (
        <article
          key={item.id}
          className="l62-matrix-card"
          role="listitem"
          style={{ "--matrix-color": item.color } as CSSProperties}
          onClick={() => onSelect?.(item.id)}
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect?.(item.id); } }}
        >
          <div className="l62-matrix-head">
            <h4><En62>{item.name}</En62></h4>
            <span className="l62-matrix-pattern"><En62>{item.pattern}</En62></span>
          </div>
          <div className="l62-matrix-verbs">
            {item.verbs.map((v) => <span key={v} className="l62-matrix-verb"><En62>{v}</En62></span>)}
          </div>
          {item.examples.map((example, index) => (
            <div className="l62-matrix-example" key={`${item.id}-example-${index}`}>
              <En62>{example.en}</En62>
              <span>{example.ar}</span>
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}

// ------------------------------------------------------------
// زر اختيار تركيب — لتفاعلات "اختر التركيب الصحيح"
// ------------------------------------------------------------
export function StructurePicker62({
  options,
  value,
  onPick,
  disabled = false,
}: {
  options: string[];
  value: string;
  onPick: (next: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="l62-struct-picker" role="group" aria-label="اختر التركيب الصحيح">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          aria-pressed={value === opt}
          disabled={disabled}
          className={`l62-struct-btn${value === opt ? " is-selected" : ""}`}
          onClick={() => onPick(opt)}
        >
          <En62>{opt}</En62>
        </button>
      ))}
    </div>
  );
}

// ------------------------------------------------------------
// أزرار الدرس
// ------------------------------------------------------------
export function Btn62({
  onClick,
  children,
  variant = "solid",
  disabled,
  type = "button",
}: {
  onClick?: () => void;
  children: ReactNode;
  variant?: "solid" | "soft" | "bright" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`l62-btn l62-btn--${variant}`}>
      {children}
    </button>
  );
}

// ------------------------------------------------------------
// تمرين: تحقّق ثم اكشف — لا حكم قبل المحاولة
// ------------------------------------------------------------
export type AttemptItem62 = {
  prompt: string;
  hint?: string;
  options?: string[];
  answer: string;
  why: string;
  ar?: string;
  accept?: string[];
};

const tidy62 = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[\s"'«»“”]+|[\s"'«»“”.!?،,؛;]+$/gu, "")
    .toLowerCase();

export function Attempt62({ item, index, accept }: { item: AttemptItem62; index: number; accept?: string[] }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const accepted = accept && accept.length ? accept : [item.answer];
  const right = accepted.some((a) => tidy62(value) === tidy62(a));

  return (
    <article className="l62-attempt">
      <div className="l62-attempt-num">{String(index).padStart(2, "0")}</div>
      <div className="l62-attempt-main">
        <p className="l62-prompt"><Mixed62 text={item.prompt} /></p>
        {item.hint && <p className="l62-hintline"><Mixed62 text={item.hint} /></p>}
        {item.options ? (
          <ChoiceList62
            options={item.options}
            value={value}
            ariaLabel={`اختيارات السؤال ${index}`}
            onPick={(option) => { setValue(option); setChecked(false); }}
          />
        ) : (
          <input
            id={id}
            type="text"
            dir="auto"
            lang="en"
            aria-label={`إجابة السؤال ${index}`}
            value={value}
            placeholder="اكتب إجابتك هنا…"
            onChange={(event) => { setValue(event.target.value); setChecked(false); }}
            onKeyDown={(event) => { if (event.key === "Enter" && value.trim()) setChecked(true); }}
          />
        )}
        <div className="l62-actions">
          <Btn62 onClick={() => setChecked(true)} disabled={!value.trim()}>تحقّق من الإجابة</Btn62>
          {checked && <Btn62 variant="soft" onClick={() => { setValue(""); setChecked(false); }}>إعادة المحاولة</Btn62>}
        </div>
        {checked && (
          <div className={`l62-feedback ${right ? "is-right" : "is-wrong"}`} role="status">
            <b>{right ? "✓ إجابة صحيحة" : "✕ راجع النموذج"}</b>
            <span>النموذج: <En62>{item.answer}</En62></span>
            <span><Mixed62 text={item.why} /></span>
            {item.ar && <span className="l62-small">{item.ar}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

// ------------------------------------------------------------
// صفوف الاختيار: اتجاه الصف يتبع لغة خياراته نفسها
// ------------------------------------------------------------
const HAS_ARABIC_62 = /[\u0600-\u06FF]/;

export function choiceDir62(options: string[]): "rtl" | "ltr" {
  return options.some((option) => HAS_ARABIC_62.test(option)) ? "rtl" : "ltr";
}

export function ChoiceList62({
  options,
  value,
  onPick,
  ariaLabel,
  className = "",
}: {
  options: string[];
  value: string;
  onPick: (next: string) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div className={`l62-choice-list ${className}`.trim()} dir={choiceDir62(options)} role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          className={value === option ? "is-selected" : ""}
          onClick={() => onPick(option)}
        >
          {HAS_ARABIC_62.test(option) ? (
            <span dir="rtl"><LatinRuns text={option} /></span>
          ) : (
            <En62>{option}</En62>
          )}
        </button>
      ))}
    </div>
  );
}

// ------------------------------------------------------------
// صفوف مفتوحة (details) للترجمات والمفاتيح
// ------------------------------------------------------------
export function Disclosure62({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  return <details className="l62-disclosure"><summary>{summary}</summary>{children}</details>;
}

// ------------------------------------------------------------
// شارة حكم صغيرة (صح/خطأ) بلا اعتماد على اللون وحده
// ------------------------------------------------------------
export function VerdictTag62({ right }: { right: boolean }) {
  return <span className={`l62-verdict ${right ? "is-right" : "is-wrong"}`}>{right ? "✓ صحيح" : "✕ خطأ"}</span>;
}

// ------------------------------------------------------------
// مكون مقارنة فعلين متشابهين — لتمييز الفروق الدقيقة
// ------------------------------------------------------------
export function VerbCompare62({
  left,
  right,
}: {
  left: { verb: string; meaning: string; structure: string; example: { en: string; ar: string }; color: string };
  right: { verb: string; meaning: string; structure: string; example: { en: string; ar: string }; color: string };
}) {
  return (
    <div className="l62-compare" role="region" aria-label={`مقارنة ${left.verb} و ${right.verb}`}>
      <article className="l62-compare-card" style={{ "--compare-color": left.color } as CSSProperties}>
        <header><En62>{left.verb}</En62><span>{left.meaning}</span></header>
        <div className="l62-compare-struct"><En62>{left.structure}</En62></div>
        <div className="l62-compare-ex"><En62>{left.example.en}</En62><span>{left.example.ar}</span></div>
      </article>
      <div className="l62-compare-vs" aria-hidden>↔</div>
      <article className="l62-compare-card" style={{ "--compare-color": right.color } as CSSProperties}>
        <header><En62>{right.verb}</En62><span>{right.meaning}</span></header>
        <div className="l62-compare-struct"><En62>{right.structure}</En62></div>
        <div className="l62-compare-ex"><En62>{right.example.en}</En62><span>{right.example.ar}</span></div>
      </article>
    </div>
  );
}

// ------------------------------------------------------------
// تطبيع ومطابقة إجابات — منسوخ من نمط الدرس 61
// ------------------------------------------------------------
export function normalize62(value: string): string {
  return value.toLowerCase().replace(/[’‘]/g, "'")
    .replace(/[“”\"«»]/g, "").replace(/[.,!?;:،؟]+/g, " ").replace(/\s+/g, " ").trim();
}

export function matches62(value: string, answer: string, accept: string[] = []): boolean {
  const normalized = normalize62(value);
  return normalized.length > 0 && [answer, ...accept].some((candidate) => normalize62(candidate) === normalized);
}

// ------------------------------------------------------------
// مكون تحويل تدريجي — يعرض خطوات التحويل 1-2-3
// ------------------------------------------------------------
export function ConversionSteps62({
  steps,
}: {
  steps: { n: number; label: string; detail: string; color: string }[];
}) {
  return (
    <ol className="l62-conversion-steps">
      {steps.map((step) => (
        <li key={step.n} className="l62-conversion-step" style={{ "--step-color": step.color } as CSSProperties}>
          <span className="l62-step-num">{step.n}</span>
          <div className="l62-step-content">
            <strong>{step.label}</strong>
            <p><Mixed62 text={step.detail} /></p>
          </div>
        </li>
      ))}
    </ol>
  );
}