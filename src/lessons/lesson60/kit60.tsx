import { useId, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";
import type { Change60, ChangeKind60, ShiftPair60 } from "./content60";

/* ============================================================
   Lesson 60 kit — THE COMMUNICATION & STORY TRANSFER STUDIO
   عناصر عرض خاصة بالدرس 60 فقط: فقاعات كلام، ومسارات نقل،
   وبوابات تحويل، وشرائح تغيير ملوّنة بحسب نوعها.
   لا تحمل محتوى أي درس آخر، ولا تنسخ هوية الدرس 59.
   ============================================================ */

export function En60({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span dir="ltr" lang="en" className={`l60-en ${className}`.trim()} style={style}>
      {children}
    </span>
  );
}

/**
 * مدى رقمي مثل «1–6» أو «٢١–٢٧»: الشرطة محرف محايد، فإذا وقعت بين رقمين
 * داخل فقرة عربية قُرئ المدى معكوسًا. يُغلَّف كل مدى في <bdi dir="ltr">.
 */
const RANGE_60 = /([0-9٠-٩]+[  ]?[–—-][  ]?[0-9٠-٩]+)/g;

/** نص عربي قد يحمل مقاطع إنجليزية أو مدًى رقميًا — يمرّ عبر عازل المشروع. */
export function Mixed60({ text, className = "", style }: { text: string; className?: string; style?: CSSProperties }) {
  const source = text ?? "";
  const parts = source.split(RANGE_60);
  return (
    <span className={className} style={style}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <bdi key={i} dir="ltr" className="l60-range">
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
   ألوان أنواع التغيير — كل تغيير يحمل نوعه لونًا واسمًا
   ------------------------------------------------------------ */

export const KIND_STYLE_60: Record<ChangeKind60, { label: string; ar: string }> = {
  verb: { label: "VERB", ar: "فعل النقل" },
  tense: { label: "TENSE", ar: "الزمن" },
  pronoun: { label: "PRONOUN", ar: "الضمير" },
  time: { label: "TIME", ar: "الزمان" },
  place: { label: "PLACE", ar: "المكان / الإشارة" },
  modal: { label: "MODAL", ar: "الفعل الناقص" },
  form: { label: "FORM", ar: "الشكل" },
};

/** شريحة تغيير واحد: from → to مصنّفة اللون، مع تعليل اختياري */
export function ShiftChip60({ change, size = "md" }: { change: Change60; size?: "sm" | "md" }) {
  return (
    <span className={`l60-chip l60-chip--${change.kind}${size === "sm" ? " l60-chip--sm" : ""}`} title={change.note}>
      <small>{KIND_STYLE_60[change.kind].label}</small>
      <bdi dir="ltr" className="l60-chip-shift">
        {change.from === "—" ? `+ ${change.to}` : change.to === "—" ? `– ${change.from}` : `${change.from} → ${change.to}`}
      </bdi>
    </span>
  );
}

/* ------------------------------------------------------------
   إطار المشهد
   ------------------------------------------------------------ */

export function Scene60({
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
  /** عنوان إنجليزي (مصطلح أو صيغة) — LTR في سطر مستقل */
  en?: string;
  subtitle?: string;
  lead?: string;
  children: ReactNode;
  /** مشهد «الاستوديو» الداكن للمقاطع المحورية */
  booth?: boolean;
}) {
  return (
    <section className={`l60-scene${booth ? " l60-scene--booth" : ""}`}>
      {(kicker || n) && (
        <div className="l60-kicker">
          {n && <span>{n}</span>}
          {kicker}
        </div>
      )}
      <h2 className="l60-title">
        <Mixed60 text={title} />
      </h2>
      {en && <div className="l60-title-en">{en}</div>}
      {subtitle && <div className="l60-subtitle">{subtitle}</div>}
      {lead && (
        <p className="l60-lead">
          <Mixed60 text={lead} />
        </p>
      )}
      {children}
    </section>
  );
}

/* ------------------------------------------------------------
   فقاعة الكلام — متحدث أصلي (direct) أو راوٍ (reported)
   ------------------------------------------------------------ */

export function Bubble60({
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
    <figure className={`l60-bubble l60-bubble--${variant}`}>
      <figcaption>
        <i aria-hidden>{variant === "direct" ? "◉" : "◎"}</i>
        <b>{who}</b>
        <small>{variant === "direct" ? "DIRECT · كلام مباشر" : "REPORTED · كلام منقول"}</small>
      </figcaption>
      <blockquote>
        <En60>{en}</En60>
      </blockquote>
      {ar && <p className="l60-bubble-ar">{ar}</p>}
      {caption && <small className="l60-bubble-cap">{caption}</small>}
    </figure>
  );
}

/* ------------------------------------------------------------
   زوج «مباشر → منقول» مع مسار يحمل شرائح التغيير
   ------------------------------------------------------------ */

export function TransferPair60({
  pair,
  index,
  whoDirect = "المتحدث الأصلي",
  whoReported = "الراوي",
  compact = false,
}: {
  pair: ShiftPair60;
  index?: number;
  whoDirect?: string;
  whoReported?: string;
  compact?: boolean;
}) {
  return (
    <article className={`l60-transfer${compact ? " l60-transfer--compact" : ""}`}>
      <div className="l60-transfer-grid">
        <Bubble60 variant="direct" who={whoDirect} en={pair.direct} ar={pair.directAr} />
        <div className="l60-path" aria-hidden={!pair.changes?.length}>
          <span className="l60-path-arrow">⟶</span>
          {pair.changes && pair.changes.length > 0 && (
            <div className="l60-path-gates">
              {pair.changes.map((change) => (
                <ShiftChip60 key={`${change.from}-${change.to}`} change={change} size="sm" />
              ))}
            </div>
          )}
        </div>
        <Bubble60 variant="reported" who={whoReported} en={pair.reported} ar={pair.reportedAr} />
      </div>
      {pair.changes?.some((c) => c.note) && (
        <ul className="l60-transfer-notes">
          {pair.changes
            .filter((c) => c.note)
            .map((c) => (
              <li key={`${c.from}-note`}>
                <Mixed60 text={c.note!} />
              </li>
            ))}
        </ul>
      )}
      {pair.note && (
        <p className="l60-note">
          <Mixed60 text={pair.note} />
        </p>
      )}
      {index !== undefined && <span className="l60-transfer-num">{String(index).padStart(2, "0")}</span>}
    </article>
  );
}

/* ------------------------------------------------------------
   جدول تحويل: Direct → Reported (+ ملاحظة اختيارية)
   ------------------------------------------------------------ */

export function MapTable60({
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
    <div className={`l60-table${tone === "booth" ? " l60-table--booth" : ""}`} role="table">
      <div className="l60-table-head" role="row">
        <span role="columnheader">
          <En60>{head[0]}</En60>
        </span>
        <span role="columnheader" aria-hidden>
          ⟶
        </span>
        <span role="columnheader">
          <En60>{head[1]}</En60>
        </span>
        {withNote && <span role="columnheader">{head[2] ?? "ملاحظة"}</span>}
      </div>
      {rows.map((row) => (
        <div className="l60-table-row" role="row" key={row.direct}>
          <span role="cell">
            <En60>{row.direct}</En60>
          </span>
          <span role="cell" aria-hidden className="l60-table-arrow">
            ⟶
          </span>
          <span role="cell">
            <En60>{row.reported}</En60>
          </span>
          {withNote && (
            <span role="cell" className="l60-table-note">
              {row.note ?? ""}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   الأزرار الصغيرة
   ------------------------------------------------------------ */

export function Btn60({
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
    <button type={type} onClick={onClick} disabled={disabled} className={`l60-btn l60-btn--${variant}`}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------
   تمرين: تحقّق ثم اكشف — لا حكم قبل المحاولة
   ------------------------------------------------------------ */

export type AttemptItem60 = {
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

/** قبول الصيغ المتعددة: answer قد يكون «صيغة1 أو صيغة2» عبر accept */
export function Attempt60({ item, index, accept }: { item: AttemptItem60; index: number; accept?: string[] }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const accepted = accept && accept.length ? accept : [item.answer];
  const right = accepted.some((a) => tidy(value) === tidy(a));

  return (
    <article className="l60-attempt">
      <div className="l60-attempt-num">{String(index).padStart(2, "0")}</div>
      <div className="l60-attempt-main">
        <p className="l60-prompt">
          <Mixed60 text={item.prompt} />
        </p>
        {item.hint && (
          <p className="l60-hintline">
            <Mixed60 text={item.hint} />
          </p>
        )}
        {item.options ? (
          <ChoiceList60
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
            dir="auto"
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
        <div className="l60-actions">
          <Btn60 onClick={() => setChecked(true)} disabled={!value.trim()}>
            تحقّق من الإجابة
          </Btn60>
          {checked && (
            <Btn60
              variant="soft"
              onClick={() => {
                setValue("");
                setChecked(false);
              }}
            >
              إعادة المحاولة
            </Btn60>
          )}
        </div>
        {checked && (
          <div className={`l60-feedback ${right ? "is-right" : "is-wrong"}`} role="status">
            <b>{right ? "✓ إجابة صحيحة" : "✕ راجع النموذج"}</b>
            <span>
              النموذج: <En60>{item.answer}</En60>
            </span>
            <span>
              <Mixed60 text={item.why} />
            </span>
            {item.ar && <span className="l60-small">{item.ar}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------
   صفوف الاختيار: اتجاه الصف يتبع لغة خياراته نفسها
   ------------------------------------------------------------ */

const HAS_ARABIC = /[؀-ۿ]/;

export function choiceDir60(options: string[]): "rtl" | "ltr" {
  return options.some((option) => HAS_ARABIC.test(option)) ? "rtl" : "ltr";
}

export function ChoiceList60({
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
    <div className={`l60-choice-list ${className}`.trim()} dir={choiceDir60(options)} role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          className={value === option ? "is-selected" : ""}
          onClick={() => onPick(option)}
        >
          {HAS_ARABIC.test(option) ? (
            <span dir="rtl">
              <LatinRuns text={option} />
            </span>
          ) : (
            <En60>{option}</En60>
          )}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   صفوف مفتوحة (details) للترجمات والمفاتيح
   ------------------------------------------------------------ */

export function Disclosure60({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  return (
    <details className="l60-disclosure">
      <summary>{summary}</summary>
      {children}
    </details>
  );
}

/* ------------------------------------------------------------
   عدّاد الزيارات المشترك بين الخطوات
   ------------------------------------------------------------ */

export function useVisited60(total: number) {
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const mark = (index: number) => setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  const pct = useMemo(() => Math.round((visited.size / Math.max(1, total)) * 100), [visited, total]);
  return { visited, mark, pct };
}

/* ------------------------------------------------------------
   شارة حكم صغيرة (صح/خطأ) بلا اعتماد على اللون وحده
   ------------------------------------------------------------ */

export function VerdictTag60({ right }: { right: boolean }) {
  return <span className={`l60-verdict ${right ? "is-right" : "is-wrong"}`}>{right ? "✓ صحيح" : "✕ خطأ"}</span>;
}
