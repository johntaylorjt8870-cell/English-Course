import { useEffect, useId, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";

/* ============================================================
   Lesson 59 kit — ADVANCED GRAMMAR CONTROL ROOM
   عناصر عرض مشتركة داخل الدرس فقط. لا تحمل محتوى أي درس آخر.
   ============================================================ */

export function En59({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span dir="ltr" lang="en" className={`l59-en ${className}`.trim()} style={style}>
      {children}
    </span>
  );
}

/**
 * مدى رقمي مثل «1–6» أو «٢١–٢٧».
 *
 * الشرطة (–) محرف محايد، فإذا وقعت بين رقمين داخل فقرة عربية صار المدى يُقرأ
 * معكوسًا: «6–1» بدل «1–6». لا يصلح هنا عزل الكلمات لأن المدى وحدة واحدة؛
 * لذلك يُغلَّف كل مدى في <bdi dir="ltr"> فيُعرض بترتيبه المنطقي داخل العربية.
 */
const RANGE_59 = /([0-9\u0660-\u0669]+[ \u00a0]?[–—-][ \u00a0]?[0-9\u0660-\u0669]+)/g;

/** نص عربي قد يحمل مقاطع إنجليزية أو مدًى رقميًا — يمرّ عبر عازل المشروع. */
export function Mixed59({ text, className = "", style }: { text: string; className?: string; style?: CSSProperties }) {
  const source = text ?? "";
  const parts = source.split(RANGE_59);
  return (
    <span className={className} style={style}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <bdi key={i} dir="ltr" className="l59-range">
            {part}
          </bdi>
        ) : (
          <LatinRuns key={i} text={part} />
        ),
      )}
    </span>
  );
}

/* ------------------------------------------------------------
   الفتحات — أدوار التركيب بألوان ثابتة
   ------------------------------------------------------------ */

export type SlotKind59 = "subject" | "modal" | "be" | "v3" | "extra" | "past" | "ghost";

export const SLOT_LABEL_59: Record<SlotKind59, { en: string; ar: string }> = {
  subject: { en: "Subject", ar: "المبتدأ / المفعول به القديم" },
  modal: { en: "Modal", ar: "الفعل الناقص" },
  be: { en: "be / have been", ar: "صيغة be" },
  v3: { en: "V3", ar: "التصريف الثالث" },
  extra: { en: "Object", ar: "المفعول به / الفاعل القديم" },
  past: { en: "Past", ar: "ماضٍ" },
  ghost: { en: "—", ar: "" },
};

export function Slot59({
  kind,
  text,
  label,
  size = "md",
}: {
  kind: SlotKind59;
  text: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span className={`l59-slot l59-slot--${kind}`} style={size === "lg" ? { fontSize: "clamp(1rem,2.4vw,1.45rem)" } : size === "sm" ? { fontSize: "0.86rem" } : undefined}>
      <span dir="ltr">{text}</span>
      {label !== "" && <small>{label ?? SLOT_LABEL_59[kind].en}</small>}
    </span>
  );
}

/** تركيب: قطع مرتبطة بعلامة + في اتجاه LTR */
export function Formula59({ parts, tail }: { parts: { kind: SlotKind59; text: string; label?: string }[]; tail?: string }) {
  return (
    <div className="l59-formula" dir="ltr">
      {parts.map((p, i) => (
        <span key={`${p.text}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
          {i > 0 && <span className="l59-plus">+</span>}
          <Slot59 kind={p.kind} text={p.text} label={p.label} />
        </span>
      ))}
      {tail && <span style={{ color: "#7c8ea4", fontWeight: 700 }}>{tail}</span>}
    </div>
  );
}

/* ------------------------------------------------------------
   إطار المشهد
   ------------------------------------------------------------ */

export function Scene59({
  n,
  kicker,
  title,
  en,
  subtitle,
  lead,
  children,
  console = false,
}: {
  n?: string;
  kicker?: string;
  title: string;
  /** العنوان الإنجليزي (صيغة أو اسم تركيب) — يُعرض LTR في سطر مستقل */
  en?: string;
  subtitle?: string;
  lead?: string;
  children: ReactNode;
  console?: boolean;
}) {
  return (
    <section className={`l59-scene${console ? " l59-scene--console" : ""}`}>
      {(kicker || n) && (
        <div className="l59-kicker">
          {n && <span>{n}</span>}
          {kicker}
        </div>
      )}
      <h2 className="l59-title">
        <Mixed59 text={title} />
      </h2>
      {en && <div className="l59-title-en">{en}</div>}
      {subtitle && <div className="l59-subtitle">{subtitle}</div>}
      {lead && <p className="l59-lead">{lead}</p>}
      {children}
    </section>
  );
}

/* ------------------------------------------------------------
   زوج Active ⇄ Passive
   ------------------------------------------------------------ */

export function VoicePair59({
  index,
  active,
  activeAr,
  passive,
  passiveAr,
  why,
}: {
  index?: number;
  active: string;
  activeAr: string;
  passive: string;
  passiveAr: string;
  why?: string;
}) {
  return (
    <article className="l59-pair">
      <div className="l59-pair-top">
        {index !== undefined ? <span>{String(index).padStart(2, "0")}</span> : <span aria-hidden>⇄</span>}
        <small>ACTIVE → PASSIVE</small>
      </div>
      <div className="l59-pair-grid">
        <div className="l59-voice l59-voice--active">
          <label>ACTIVE</label>
          <En59>{active}</En59>
          <p>{activeAr}</p>
        </div>
        <div className="l59-arrow" aria-hidden>
          →
        </div>
        <div className="l59-voice l59-voice--passive">
          <label>PASSIVE</label>
          <En59>{passive}</En59>
          <p>{passiveAr}</p>
        </div>
      </div>
      {why && <p className="l59-why">{why}</p>}
    </article>
  );
}

/** سطر إنجليزي + ترجمة عربية */
export function Line59({ en, ar }: { en: string; ar: string }) {
  return (
    <div>
      <En59>{en}</En59>
      <span style={{ display: "block", marginTop: "0.15rem" }}>{ar}</span>
    </div>
  );
}

/* ------------------------------------------------------------
   الأزرار الصغيرة
   ------------------------------------------------------------ */

export function Btn59({
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
    <button type={type} onClick={onClick} disabled={disabled} className={`l59-btn l59-btn--${variant}`}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------
   تمرين: تحقّق ثم اكشف
   ------------------------------------------------------------ */

export type AttemptItem59 = {
  prompt: string;
  hint?: string;
  options?: string[];
  answer: string;
  why: string;
  ar?: string;
};

const tidy = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[\s"'«»“”]+|[\s"'«»“”.!?،,؛;]+$/gu, "")
    .toLowerCase();

export function Attempt59({ item, index }: { item: AttemptItem59; index: number }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const right = tidy(value) === tidy(item.answer);

  return (
    <article className="l59-attempt">
      <div className="l59-attempt-num">{String(index).padStart(2, "0")}</div>
      <div className="l59-attempt-main">
        <p className="l59-prompt">
          <Mixed59 text={item.prompt} />
        </p>
        {item.hint && <p className="l59-hintline">{item.hint}</p>}
        {item.options ? (
          <ChoiceList59
            options={item.options}
            value={value}
            ariaLabel={`اختيارات السؤال ${index}`}
            onPick={(option) => {
              setValue(option);
              setChecked(false);
            }}
          />
        ) : (
          <input
            id={id}
            type="text"
            dir="ltr"
            lang="en"
            aria-label={`إجابة السؤال ${index}`}
            value={value}
            placeholder="اكتب إجابتك هنا…"
            onChange={(event) => {
              setValue(event.target.value);
              setChecked(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && value.trim()) setChecked(true);
            }}
          />
        )}
        <div className="l59-actions">
          <Btn59 onClick={() => setChecked(true)} disabled={!value.trim()}>
            تحقّق من الإجابة
          </Btn59>
          {checked && (
            <Btn59
              variant="soft"
              onClick={() => {
                setValue("");
                setChecked(false);
              }}
            >
              إعادة المحاولة
            </Btn59>
          )}
        </div>
        {checked && (
          <div className={`l59-feedback ${right ? "is-right" : "is-wrong"}`} role="status">
            <b>{right ? "✓ إجابة صحيحة" : "✕ راجع النموذج"}</b>
            <span>
              النموذج: <En59>{item.answer}</En59>
            </span>
            <span>{item.why}</span>
            {item.ar && <span className="l59-small">{item.ar}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------
   صفوف الاختيار: اتجاه الصف يتبع لغة خياراته نفسها
   (خيارات إنجليزية تُقرأ من اليسار، وخيارات عربية من اليمين)
   ------------------------------------------------------------ */

const HAS_ARABIC = /[\u0600-\u06FF]/;

export function choiceDir(options: string[]): "rtl" | "ltr" {
  return options.some((option) => HAS_ARABIC.test(option)) ? "rtl" : "ltr";
}

export function ChoiceList59({
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
    <div className={`l59-choice-list ${className}`.trim()} dir={choiceDir(options)} role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          className={value === option ? "is-selected" : ""}
          onClick={() => onPick(option)}
        >
          {HAS_ARABIC.test(option) ? <span dir="rtl">{option}</span> : <En59>{option}</En59>}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   صفوف مفتوحة (details) للترجمات والمفاتيح
   ------------------------------------------------------------ */

export function Disclosure59({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="l59-disclosure">
      <summary>{summary}</summary>
      {children}
    </details>
  );
}

/* ------------------------------------------------------------
   عدّاد الزيارات المشترك بين الخطوات — يحفظ الحالة أعلى الشجرة
   ------------------------------------------------------------ */

export function useVisited59(total: number) {
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const mark = (index: number) => setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  const pct = useMemo(() => Math.round((visited.size / Math.max(1, total)) * 100), [visited, total]);
  return { visited, mark, pct };
}

/** مقياس صغير يوضح شدة المعنى (احتمال/إلزام/نصيحة) */
export function Meter59({
  value,
  label,
  from,
  to,
  color,
}: {
  value: number;
  label: string;
  from: string;
  to: string;
  color: string;
}) {
  const cells = 5;
  const on = Math.max(0, Math.min(cells, Math.round(value * cells)));
  return (
    <div className="l59-meter">
      <div className="l59-meter-bar" style={{ ["--bar" as string]: color }} aria-hidden>
        {Array.from({ length: cells }, (_, i) => (
          <span key={i} className={i < on ? "is-on" : ""} />
        ))}
      </div>
      <div className="l59-meter-labels">
        <span>{from}</span>
        <span style={{ fontWeight: 700 }}>{label}</span>
        <span>{to}</span>
      </div>
    </div>
  );
}

/** مؤقت صغير لمنع كشف المعلومة قبل المحاولة في المختبرات */
export function useReveal59() {
  const [revealed, setRevealed] = useState<number[]>([]);
  useEffect(() => undefined, []);
  return {
    revealed,
    reveal: (n: number) => setRevealed((prev) => (prev.includes(n) ? prev : [...prev, n])),
    reset: () => setRevealed([]),
  };
}
