/**
 * Lesson 57 visual kit — «مختبر تحويل الجملة» / THE VOICE SHIFT LAB
 *
 * هوية مستقلة تمامًا عن الدروس 1 و52 و55 و56:
 *   • خلفية ورقية حبرية داكنة (ink canvas) مع شبكة مسار خفيفة.
 *   • مسار الجملة: ثلاث محطات أفقية (من قام بالفعل ← الفعل ← ما وقع عليه)
 *     وبينها سهم Shift. عند التحويل تنزلق بطاقة المفعول به إلى أول المسار
 *     وتنزلق بطاقة الفاعل إلى ذيله بعد by.
 *   • الألوان أدوار ثابتة في الدرس كله، ولا تعمل وحدها:
 *     ذهبي = Agent (من قام بالفعل) · كحلي/أزرق = Verb · وردي = Receiver (المفعول).
 *   • كل طوبة تحمل اسمها الإنجليزي ووصفها العربي، والحركة نفسها هي الشرح.
 *
 * لا كِت هنا يحمل محتوى درس آخر: كل الأنماط خاصة بهذا الدرس.
 */
import { Fragment, useId, useState, type ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";

/* ============================================================
   عزل الإنجليزية والعربية المختلطة
   ============================================================ */

export function En57({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" lang="en" className={`l57-en ${className}`.trim()}>
      {children}
    </span>
  );
}

/** نص عربي قد يحمل مقاطع إنجليزية — يمرّ عبر عازل المشروع نفسه. */
export function Mixed57({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <LatinRuns text={text ?? ""} />
    </span>
  );
}

/* ============================================================
   أدوار الجملة — الألوان الثابتة
   ============================================================ */

export type Role57 = "agent" | "be" | "v3" | "receiver" | "by" | "not" | "subject" | "verb" | "object" | "wh";

export const ROLE_META_57: Record<
  Role57,
  { glyph: string; en: string; ar: string; chip: string; solid: string; soft: string; ink: string }
> = {
  agent: {
    glyph: "◆",
    en: "AGENT",
    ar: "من قام بالفعل",
    chip: "l57-chip--agent",
    solid: "l57-solid--agent",
    soft: "l57-soft--agent",
    ink: "var(--l57-agent)",
  },
  receiver: {
    glyph: "●",
    en: "RECEIVER",
    ar: "ما وقع عليه الفعل",
    chip: "l57-chip--receiver",
    solid: "l57-solid--receiver",
    soft: "l57-soft--receiver",
    ink: "var(--l57-receiver)",
  },
  be: {
    glyph: "▮",
    en: "BE",
    ar: "فعل be",
    chip: "l57-chip--be",
    solid: "l57-solid--be",
    soft: "l57-soft--be",
    ink: "var(--l57-be)",
  },
  v3: {
    glyph: "▰",
    en: "V3",
    ar: "التصريف الثالث",
    chip: "l57-chip--v3",
    solid: "l57-solid--v3",
    soft: "l57-soft--v3",
    ink: "var(--l57-v3)",
  },
  by: {
    glyph: "◇",
    en: "BY",
    ar: "حرف الجر by",
    chip: "l57-chip--by",
    solid: "l57-solid--by",
    soft: "l57-soft--by",
    ink: "var(--l57-by)",
  },
  not: {
    glyph: "✕",
    en: "NOT",
    ar: "النفي",
    chip: "l57-chip--not",
    solid: "l57-solid--not",
    soft: "l57-soft--not",
    ink: "var(--l57-not)",
  },
  subject: {
    glyph: "S",
    en: "SUBJECT",
    ar: "الفاعل",
    chip: "l57-chip--agent",
    solid: "l57-solid--agent",
    soft: "l57-soft--agent",
    ink: "var(--l57-agent)",
  },
  verb: {
    glyph: "V",
    en: "VERB",
    ar: "الفعل",
    chip: "l57-chip--v3",
    solid: "l57-solid--v3",
    soft: "l57-soft--v3",
    ink: "var(--l57-v3)",
  },
  object: {
    glyph: "O",
    en: "OBJECT",
    ar: "المفعول به",
    chip: "l57-chip--receiver",
    solid: "l57-solid--receiver",
    soft: "l57-soft--receiver",
    ink: "var(--l57-receiver)",
  },
  wh: {
    glyph: "?",
    en: "WH",
    ar: "أداة استفهام",
    chip: "l57-chip--wh",
    solid: "l57-solid--wh",
    soft: "l57-soft--wh",
    ink: "var(--l57-wh)",
  },
};

/** وسم الدور: رمز + كلمة إنجليزية + وصف عربي (اللون لا يعمل وحده أبدًا). */
export function RoleTag57({ role, label = true }: { role: Role57; label?: boolean }) {
  const meta = ROLE_META_57[role];
  return (
    <span className={`l57-role ${meta.chip}`}>
      <span aria-hidden="true" className="l57-role-glyph">
        {meta.glyph}
      </span>
      <En57>{meta.en}</En57>
      {label && <span className="l57-role-ar">{meta.ar}</span>}
    </span>
  );
}

/* ============================================================
   طوبة كلمة — الوحدة البصرية الأساسية
   ============================================================ */

export function Block57({
  text,
  role,
  sub,
  size = "md",
  ghost = false,
  muted = false,
  dim = false,
  className = "",
}: {
  text: string;
  role?: Role57;
  /** سطر صغير تحت الكلمة: ترجمة أو شرح */
  sub?: string;
  size?: "sm" | "md" | "lg";
  ghost?: boolean;
  muted?: boolean;
  dim?: boolean;
  className?: string;
}) {
  const meta = role ? ROLE_META_57[role] : null;
  const sizeClass = size === "lg" ? "l57-block--lg" : size === "sm" ? "l57-block--sm" : "";
  return (
    <span
      dir="ltr"
      className={`l57-block ${meta ? meta.soft : ""} ${sizeClass} ${ghost ? "l57-block--ghost" : ""} ${
        muted ? "l57-block--muted" : ""
      } ${dim ? "l57-block--dim" : ""} ${className}`.trim()}
    >
      <span className="l57-block-en">
        <En57>{text}</En57>
      </span>
      {sub && (
        <span className="l57-block-sub" dir="rtl">
          <Mixed57 text={sub} />
        </span>
      )}
      {meta && (
        <span className="l57-block-role" aria-hidden="true">
          {meta.en}
        </span>
      )}
    </span>
  );
}

/** مساحة للفعل/الرمز بين الطوبات */
export function Plus57({ children = "+" }: { children?: ReactNode }) {
  return (
    <span className="l57-plus" aria-hidden="true">
      {children}
    </span>
  );
}

/* ============================================================
   Rail — مسار الجملة (التوقيع البصري للدرس)
   ============================================================ */

export type RailToken57 = { text: string; role?: Role57 };

/**
 * مسار جملة أفقي: طوبات + رموز، مع سهم Shift اختياري بين مسارين.
 * يعمل في RTL وLTR لأنه موضوعة LTR بالكامل (الجملة الإنجليزية).
 */
export function Rail57({
  tokens,
  size = "md",
  showRole = true,
  className = "",
}: {
  tokens: RailToken57[];
  size?: "sm" | "md" | "lg";
  showRole?: boolean;
  className?: string;
}) {
  return (
    <div dir="ltr" className={`l57-rail ${className}`.trim()}>
      {tokens.map((t, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="l57-rail-dot" aria-hidden="true" />}
          <span className="l57-rail-stop">
            <Block57 text={t.text} role={showRole ? t.role : undefined} size={size} />
          </span>
        </Fragment>
      ))}
    </div>
  );
}

/** سهم Shift — العنصر الذي يربط المعلوم بالمجهول. */
export function ShiftArrow57({
  label = "SHIFT",
  sub = "تحويل",
  vertical = false,
}: {
  label?: string;
  sub?: string;
  vertical?: boolean;
}) {
  return (
    <div className={`l57-shift ${vertical ? "l57-shift--v" : ""}`} aria-hidden="true">
      <span className="l57-shift-line" />
      <span className="l57-shift-head">{vertical ? "↓" : "→"}</span>
      <span className="l57-shift-label" dir="ltr">
        {label}
      </span>
      <span className="l57-shift-sub">{sub}</span>
    </div>
  );
}

/**
 * VoicePair — البطاقة المزدوجة: Active فوق/يمين، Passive تحت/يسار.
 * تُستخدم في كل مكان نقارن فيه صيغتين، فتبقى الهوية واحدة.
 */
export function VoicePair57({
  active,
  activeAr,
  passive,
  passiveAr,
  note,
  align = "stack",
}: {
  active: string;
  activeAr?: string;
  passive: string;
  passiveAr?: string;
  note?: string;
  align?: "stack" | "grid";
}) {
  return (
    <div className={`l57-pair ${align === "grid" ? "l57-pair--grid" : ""}`.trim()}>
      <div className="l57-pair-card l57-pair-card--active">
        <span className="l57-pair-tag" dir="ltr">
          ACTIVE
        </span>
        <span className="l57-pair-en">
          <En57>{active}</En57>
        </span>
        {activeAr && (
          <span className="l57-pair-ar">
            <Mixed57 text={activeAr} />
          </span>
        )}
      </div>
      <div className="l57-pair-mid" aria-hidden="true">
        <span className="l57-pair-mid-glyph">⇄</span>
        <span className="l57-pair-mid-label" dir="ltr">
          BE + V3
        </span>
      </div>
      <div className="l57-pair-card l57-pair-card--passive">
        <span className="l57-pair-tag" dir="ltr">
          PASSIVE
        </span>
        <span className="l57-pair-en">
          <En57>{passive}</En57>
        </span>
        {passiveAr && (
          <span className="l57-pair-ar">
            <Mixed57 text={passiveAr} />
          </span>
        )}
      </div>
      {note && (
        <p className="l57-pair-note">
          <Mixed57 text={note} />
        </p>
      )}
    </div>
  );
}

/* ============================================================
   Frame — إطار الشريحة
   ============================================================ */

export function Frame57({
  step,
  phase,
  title,
  lead,
  children,
  tip,
  emblem = "⇄",
  tone = "neutral",
  slideId,
}: {
  step: number;
  phase?: string;
  title: string;
  lead?: string;
  children: ReactNode;
  tip?: string;
  emblem?: string;
  tone?: "neutral" | "active" | "passive" | "lab" | "test";
  slideId?: string;
}) {
  return (
    <section className="l57-sheet" data-l57-tone={tone} data-slide={slideId}>
      <header className="l57-sheet-head">
        <div className="l57-sheet-kicker">
          <span className="l57-step-no" dir="ltr">
            {String(step).padStart(2, "0")}
          </span>
          {phase && (
            <span className="l57-phase">
              <span className="l57-phase-dot" aria-hidden="true" />
              <Mixed57 text={phase} />
            </span>
          )}
          <span className="l57-emblem" aria-hidden="true">
            {emblem}
          </span>
        </div>
        <h1 className="l57-sheet-title">
          <Mixed57 text={title} />
        </h1>
        {lead && (
          <p className="l57-sheet-lead">
            <Mixed57 text={lead} />
          </p>
        )}
      </header>
      <div className="l57-sheet-body">{children}</div>
      {tip && (
        <div className="l57-tip">
          <span className="l57-tip-glyph" aria-hidden="true">
            ⚑
          </span>
          <p>
            <Mixed57 text={tip} />
          </p>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   عناصر مساندة
   ============================================================ */

export function Note57({
  text,
  tone = "note",
  title,
}: {
  text: string;
  tone?: "note" | "warn" | "good";
  title?: string;
}) {
  const glyph = tone === "warn" ? "!" : tone === "good" ? "✓" : "i";
  return (
    <div className={`l57-note l57-note--${tone}`}>
      <span className="l57-note-glyph" aria-hidden="true">
        {glyph}
      </span>
      <div>
        {title && (
          <div className="l57-note-title">
            <Mixed57 text={title} />
          </div>
        )}
        <p>
          <Mixed57 text={text} />
        </p>
      </div>
    </div>
  );
}

export function Bullets57({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`l57-bullets ${ordered ? "l57-bullets--ordered" : ""}`.trim()}>
      {items.map((item, i) => (
        <li key={i}>
          <span className="l57-bullet-mark" aria-hidden="true">
            {ordered ? String(i + 1).padStart(2, "0") : "▸"}
          </span>
          <span>
            <Mixed57 text={item} />
          </span>
        </li>
      ))}
    </Tag>
  );
}

/** كشف الأجزاء — زر واحد يفتح التحليل، فلا يُعطى الجواب مجانًا. */
export function Reveal57({
  label = "اكشف التحليل",
  hiddenLabel = "أخفِ التحليل",
  children,
}: {
  label?: string;
  hiddenLabel?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="l57-reveal">
      <button
        type="button"
        className="l57-btn l57-btn--ghost"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? hiddenLabel : label}
      </button>
      <div id={id} className="l57-reveal-body" hidden={!open}>
        {children}
      </div>
    </div>
  );
}

/** بطاقة سؤال بجوابه المخفي — لأنماط أسئلة الفهم والقراءة. */
export function AnswerCard57({
  question,
  answer,
  why,
  index,
}: {
  question: string;
  answer: string;
  why?: string;
  index?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="l57-qa">
      <div className="l57-qa-head">
        {index !== undefined && (
          <span className="l57-qa-no" aria-hidden="true">
            {index}
          </span>
        )}
        <span className="l57-qa-q">
          <En57>{question}</En57>
        </span>
        <button type="button" className="l57-btn l57-btn--tiny" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? "أخفِ" : "الجواب"}
        </button>
      </div>
      <div className="l57-qa-body" hidden={!open}>
        <p className="l57-qa-a">
          <En57>{answer}</En57>
        </p>
        {why && (
          <p className="l57-qa-why">
            <Mixed57 text={why} />
          </p>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Formula — القاعدة كطوبات متسلسلة
   ============================================================ */

export function Formula57({
  parts,
  arrows = true,
  caption,
}: {
  parts: { text: string; role: Role57; sub?: string }[];
  arrows?: boolean;
  caption?: string;
}) {
  return (
    <div className="l57-formula">
      <div className="l57-formula-row">
        {parts.map((p, i) => (
          <Fragment key={i}>
            {i > 0 && arrows && <span className="l57-formula-plus">+</span>}
            <Block57 text={p.text} role={p.role} sub={p.sub} size="md" />
          </Fragment>
        ))}
      </div>
      {caption && (
        <p className="l57-formula-caption">
          <Mixed57 text={caption} />
        </p>
      )}
    </div>
  );
}

/* ============================================================
   جدول أفعال — V1 / V2 / V3
   ============================================================ */

export function VerbGrid57({
  rows,
  highlight = "v3",
}: {
  rows: { v1: string; v2: string; v3: string; ar: string }[];
  highlight?: "v1" | "v2" | "v3";
}) {
  return (
    <div className="l57-verbs">
      {rows.map((row) => (
        <div className="l57-verb-row" key={row.v1 + row.v3}>
          <span className={`l57-verb-cell ${highlight === "v1" ? "is-on" : ""}`} dir="ltr">
            <En57>{row.v1}</En57>
            <em>V1</em>
          </span>
          <span className={`l57-verb-cell ${highlight === "v2" ? "is-on" : ""}`} dir="ltr">
            <En57>{row.v2}</En57>
            <em>V2</em>
          </span>
          <span className={`l57-verb-cell l57-verb-cell--v3 ${highlight === "v3" ? "is-on" : ""}`} dir="ltr">
            <En57>{row.v3}</En57>
            <em>V3</em>
          </span>
          <span className="l57-verb-ar">
            <Mixed57 text={row.ar} />
          </span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   عداد صغير قابل لإعادة الاستخدام
   ============================================================ */

export function Chip57({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "good" | "bad" }) {
  return <span className={`l57-mini-chip l57-mini-chip--${tone}`}>{children}</span>;
}
