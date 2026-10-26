import { Fragment, type ReactNode } from "react";
import { En, PlatformTag, Rich } from "../../shared/lessonKit";
import type { SourceSection38 } from "./ledger38";

/* ============================================================
   Lesson 38 — Future Achievement Observatory
   مرصد الإنجاز المستقبلي: ورق خرائط دافئ، كحلي ليلي، ونحاس الإنجاز.
   لا يشارك هوية Lesson 37 (سماء فيروزية) ولا هوية خط النهاية السابقة.
   ============================================================ */

export const FOCUS_38 =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b3a5c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf6]";

export const TENSE_38 = {
  simple: {
    en: "will + V1",
    label: "Future Simple",
    chip: "border-[#c9a227] bg-[#f4ead0] text-[#8a5a10]",
    dot: "bg-[#c9a227]",
  },
  continuous: {
    en: "will be + V-ing",
    label: "Future Continuous",
    chip: "border-[#c4b5fd] bg-[#ece8f8] text-[#3b2f6b]",
    dot: "bg-[#3b2f6b]",
  },
  perfect: {
    en: "will have + V3",
    label: "Future Perfect",
    chip: "border-[#1b3a5c] bg-[#e8eef5] text-[#1b3a5c]",
    dot: "bg-[#1b3a5c]",
  },
} as const;

export type TenseKey38 = keyof typeof TENSE_38;

const ARABIC_RANGE = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

/** سطر إنجليزي صِرف لا يحمل أي حرف عربي — يُعرض LTR معزولًا. */
export function isPureEnglish38(text: string) {
  return /[A-Za-z]/.test(text) && !ARABIC_RANGE.test(text);
}

export function English38({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <En className={className}>{children}</En>;
}

export function EnglishFormula38({ children }: { children: ReactNode }) {
  return (
    <span dir="ltr" className="font-en inline-block rounded-lg border border-[#d4c4a0] bg-[#fffdf6] px-2 py-1 text-[#122033]">
      {children}
    </span>
  );
}

export function TenseChip38({ tense, className = "" }: { tense: TenseKey38; className?: string }) {
  const entry = TENSE_38[tense];
  return (
    <span
      data-tense-chip={tense}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-black ${entry.chip} ${className}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${entry.dot}`} />
      <span dir="ltr" className="font-en">
        {entry.en}
      </span>
      <span className="text-[10px] font-bold">{entry.label}</span>
    </span>
  );
}

/** شريط محطات الإنجاز — العلامة البصرية المتكررة في المرصد. */
export function ObservatoryMark38({ label = "STATION", className = "" }: { label?: string; className?: string }) {
  return (
    <div aria-hidden className={`fp38-finishline fao38-stations ${className}`}>
      <span className="fp38-finishline__stripe fao38-stations__beam" />
      <span className="fp38-finishline__label fao38-stations__label" dir="ltr">
        {label}
      </span>
      <span className="fp38-finishline__stripe fao38-stations__beam" />
    </div>
  );
}

/** اسم مستقر للتوافق مع المختبرات والاختبار. */
export const FinishLine38 = ObservatoryMark38;

export function Card38({
  children,
  title,
  eyebrow,
  className = "",
  id,
}: {
  children: ReactNode;
  title?: ReactNode;
  eyebrow?: string;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`fp38-card ${className}`}>
      {eyebrow ? <p className="fp38-eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="mt-1 text-lg font-black leading-snug text-[#122033] sm:text-xl">{title}</h2> : null}
      <div className="mt-3 space-y-3 text-base leading-7 text-[#1a2433]">{children}</div>
    </section>
  );
}

export function LabCard38({
  id,
  eyebrow,
  title,
  platformNote,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  platformNote?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section data-lab={id} className="fp38-lab">
      <p className="fp38-eyebrow">{eyebrow}</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#122033]">{title}</h2>
      {platformNote ? (
        <div className="mt-2">
          <PlatformNote38>{platformNote}</PlatformNote38>
        </div>
      ) : null}
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function PlatformNote38({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-[#b8ddc5] bg-[#f0faf2] p-3 text-sm leading-6 text-[#1c6b3c]">
      <div className="mb-1.5">
        <PlatformTag text="إضافة تعليمية من المنصة" />
      </div>
      <div>{children}</div>
    </aside>
  );
}

export type FormulaPart38 = {
  role: "wh" | "subject" | "will" | "wont" | "have" | "v3" | "rest";
  en: string;
  ar: string;
};

/** شريط بصري لأجزاء Future Perfect داخل مرصد الإنجاز. */
export function FormulaRibbon38({
  parts,
  caption,
}: {
  parts: readonly FormulaPart38[];
  caption?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d4c4a0] bg-[#fffdf6] p-3">
      {caption ? <p className="mb-2 text-xs font-black text-[#1b3a5c]">{caption}</p> : null}
      <div dir="ltr" className="fao38-formula-bar font-en">
        {parts.map((part, idx) => (
          <Fragment key={`${part.en}-${idx}`}>
            <span className={`fao38-token fao38-token--${part.role}`}>
              <span className="text-sm font-black sm:text-base">{part.en}</span>
              <span dir="rtl" className="fao38-token__sub font-sans">
                {part.ar}
              </span>
            </span>
            {idx < parts.length - 1 ? (
              <span aria-hidden="true" className="font-black text-[#1b3a5c]">
                +
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** إطار المرصد — يبقى للتوافق مع مختبرات الدرس. */
export function DeadlineFrame38({
  title,
  caption,
  children,
  tone = "navy",
}: {
  title?: string;
  caption?: string;
  children: ReactNode;
  tone?: "rose" | "amber" | "navy";
}) {
  const header =
    tone === "amber" ? "bg-[#8a5a10]" : tone === "rose" ? "bg-[#9f1239]" : "bg-[#1b3a5c]";
  return (
    <section className="overflow-hidden rounded-3xl border border-[#d4c4a0] bg-white shadow-[0_18px_50px_-32px_rgba(15,39,68,0.45)]">
      <header className={`flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-white ${header}`}>
        <p className="text-sm font-black">
          <Rich text={title ?? "مرصد الإنجاز المستقبلي"} />
        </p>
        <span dir="ltr" className="font-en rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-black text-[#f4ead0]">
          BY → COMPLETE
        </span>
      </header>
      <div className="relative border-2 border-dashed border-[#d4c4a0] bg-[#fffdf6] p-3 sm:p-4">
        {caption ? (
          <p className="mb-2 text-sm font-bold leading-6 text-[#3d4a5c]">
            <Rich text={caption} />
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/** سطر مصدر حرفي مع عزل اتجاهي. */
export function SourceLine38({
  sectionId,
  index,
  text,
  kind = "unit",
  className = "",
  highlightFuture = false,
}: {
  sectionId: string;
  index: number | string;
  text: string;
  kind?: "unit" | "reveal";
  className?: string;
  highlightFuture?: boolean;
}) {
  const pureEnglish = isPureEnglish38(text);
  const marker =
    /^(الصيغة:|النفي:|السؤال:|الإجابة القصيرة:|أسئلة المعلومات:|القاعدة:|القاعدة المتقدمة|القاعدة الذهنية|الاختصار:|إذن:|الترجمة|التحليل|الحلول|الحلول المفصلة|الحلول التفصيلية|أسئلة الفهم|نموذج إرشادي قصير|أهم الاستخدامات|المثال|الأسئلة|الأسئلة:|الفرق:|انتبه:|السؤال الذهبي|مقارنة مهمة جدًا|المقارنة الذهبية|الخريطة الذهبية|جدول المقارنة|مثال آخر)$/.test(
      text,
    );
  const isCorrect = text.includes("✅");
  const isWrong = text.includes("❌");
  return (
    <div
      id={`source-${sectionId}-${kind}-${index}`}
      data-source-unit={`${sectionId}-${kind}-${index}`}
      dir={pureEnglish ? "ltr" : "auto"}
      className={`min-w-0 rounded-xl px-3 py-1 leading-6 ${
        pureEnglish
          ? "border border-[#d4c4a0] bg-[#fffdf6] text-left font-en text-[#122033]"
          : isCorrect
            ? "border border-[#b8ddc5] bg-[#f0faf2] font-bold text-[#1c6b3c]"
            : isWrong
              ? "border border-[#fda4af] bg-[#ffe4e6] font-bold text-[#9f1239]"
              : marker
                ? "border-r-4 border-[#c9a227] bg-[#f4ead0] font-black text-[#122033]"
                : kind === "reveal"
                  ? "text-[#1c6b3c]"
                  : "text-[#1a2433]"
      } ${className}`}
    >
      {pureEnglish ? (
        <span className="block">{highlightFuture ? highlightFutureForms38(text) : text}</span>
      ) : (
        <Title38 text={text} />
      )}
    </div>
  );
}

/** تمييز صيغ المستقبل داخل نص القراءة (بصري فقط). */
export function highlightFutureForms38(text: string) {
  const pattern =
    /\bwill have\s+\w+\b|\bwon't have\s+\w+\b|\bwill be\s+\w+ing\b|\bwon't be\s+\w+ing\b|\b(?:am|is|are)\s+going to\b|\b[A-Za-z]+'ll have\s+\w+\b|\b[A-Za-z]+'ll be\s+\w+ing\b|\bwill\s+\w+\b/gi;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    const phrase = match[0];
    const tone = /have/.test(phrase)
      ? "bg-[#e8eef5] text-[#1b3a5c]"
      : /be\s/.test(phrase)
        ? "bg-[#ece8f8] text-[#3b2f6b]"
        : "bg-[#f4ead0] text-[#8a5a10]";
    nodes.push(
      <mark key={`${start}-${phrase}`} className={`rounded px-0.5 ${tone}`}>
        {phrase}
      </mark>,
    );
    cursor = start + phrase.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes.length ? nodes : text;
}

export function Table38({
  headers,
  rows,
  label,
  idPrefix,
  tone = "navy",
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  label: string;
  idPrefix: string;
  tone?: "rose" | "amber" | "navy";
}) {
  const head =
    tone === "amber" ? "bg-[#8a5a10] text-white" : tone === "rose" ? "bg-[#9f1239] text-white" : "bg-[#1b3a5c] text-white";
  return (
    <div className="fp38-tablewrap">
      <table dir="rtl" aria-label={label} className="w-full min-w-[20rem] border-collapse text-base">
        <thead>
          <tr className={head}>
            {headers.map((header, index) => (
              <th key={`${idPrefix}-head-${header}-${index}`} scope="col" data-source-unit={`${idPrefix}-head-${index}`} className="px-3 py-3 text-right font-black">
                <Rich text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${idPrefix}-row-${rowIndex}`} className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#f7f2e4]"}>
              {row.map((cell, cellIndex) => {
                const pure = isPureEnglish38(cell);
                const value = pure ? (
                  <span dir="ltr" className="font-en inline-block">
                    {cell}
                  </span>
                ) : (
                  <Rich text={cell} />
                );
                return cellIndex === 0 ? (
                  <th key={`${idPrefix}-${rowIndex}-${cellIndex}`} scope="row" data-source-unit={`${idPrefix}-${rowIndex}-${cellIndex}`} className="border-t border-[#ebe3d0] px-3 py-3 text-right font-bold text-[#1a2433]">
                    {value}
                  </th>
                ) : (
                  <td key={`${idPrefix}-${rowIndex}-${cellIndex}`} data-source-unit={`${idPrefix}-${rowIndex}-${cellIndex}`} className="border-t border-[#ebe3d0] px-3 py-3 text-right font-black text-[#1b3a5c]">
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * بطاقة المصدر. `range` يسمح بتقسيم القسم الطويل عبر خطوتين دون تكرار أي سطر.
 * تظهر الجداول ومفتاح المصدر في الخطوة المخصّصة فقط.
 */
export function SourceCard38({
  section,
  range,
  showTable = false,
  showExtraTable = false,
  showReveal = false,
  hideIndexes = [],
  extra,
  highlightFuture = false,
  compact = false,
  tablePosition = "before",
}: {
  section: SourceSection38;
  range?: [number, number];
  showTable?: boolean;
  showExtraTable?: boolean;
  showReveal?: boolean;
  hideIndexes?: readonly number[];
  extra?: ReactNode;
  highlightFuture?: boolean;
  compact?: boolean;
  tablePosition?: "before" | "after";
}) {
  const [from, to] = range ?? [0, section.units.length];
  const hidden = new Set(hideIndexes);
  const visible = section.units.slice(from, to).map((text, offset) => ({ text, index: from + offset }));
  const table = showTable && section.tableRows && section.tableHeaders
    ? <Table38 headers={section.tableHeaders} rows={section.tableRows} label={section.tableLabel ?? "جدول هذا القسم"} idPrefix={section.id} />
    : null;
  const extraTable = showExtraTable && section.extraTableRows && section.extraTableHeaders
    ? <Table38 headers={section.extraTableHeaders} rows={section.extraTableRows} label={section.extraTableLabel ?? "جدول إضافي"} idPrefix={`${section.id}-extra`} tone="amber" />
    : null;

  return (
    <section data-source-section={section.id} data-source-range={`${from}-${to}`} className="fp38-source">
      <header className="border-b border-[#d4c4a0] bg-[#f7f2e4] px-4 py-3">
        <h2 className="min-w-0 text-base font-black leading-7 text-[#122033] sm:text-lg">
          <Title38 text={section.title} />
        </h2>
      </header>
      <div className={`space-y-1.5 ${compact ? "p-3" : "p-3 sm:p-5"}`}>
        {tablePosition === "before" ? table : null}
        {tablePosition === "before" ? extraTable : null}
        {visible.map(({ text, index }) => {
          if (hidden.has(index)) return null;
          return (
            <SourceLine38
              key={`${section.id}-unit-${index}`}
              sectionId={section.id}
              index={index}
              text={text}
              highlightFuture={highlightFuture}
            />
          );
        })}
        {tablePosition === "after" ? table : null}
        {tablePosition === "after" ? extraTable : null}
        {extra}
        {section.revealUnits?.length && showReveal ? (
          <div data-answer-key-for={section.id} className="mt-3 space-y-1 rounded-2xl border border-[#b8ddc5] bg-[#f0faf2] p-3">
            <p className="mb-1 w-fit rounded-full bg-[#d7f0dc] px-3 py-1 text-sm font-black text-[#1c6b3c]">مفتاح المصدر — بعد المحاولة</p>
            {section.revealUnits.map((text, index) => (
              <SourceLine38 key={`${section.id}-reveal-${index}`} sectionId={section.id} index={index} text={text} kind="reveal" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/**
 * عنوان مختلط: إذا كان العنوان «عربي — English» نضع الشطر الإنجليزي في سطر مستقل
 * باتجاه LTR حتى لا ينكسر في منتصفه على شاشات الهاتف. النص نفسه لا يتغير.
 */
export function Title38({ text, className = "" }: { text: string; className?: string }) {
  const match = text.match(/^(.*?)\s+—\s+([A-Za-z][A-Za-z0-9 '’!?.:+\-]*)$/);
  if (!match) return <Rich text={text} className={className} />;
  return (
    <span className={className}>
      <Rich text={match[1]} />
      <span dir="ltr" className="font-en mt-0.5 block text-left">
        {match[2]}
      </span>
    </span>
  );
}

/** علامة أن المفتاح محفوظ — تُستخدم حين لا تكتمل محاولة الخطوة بعد. */
export function SealedKey38({ children = "مفتاح هذه الخطوة يظهر بعد إكمال محاولتك." }: { children?: ReactNode }) {
  return (
    <p className="mt-3 rounded-xl border border-dashed border-[#d4c4a0] bg-[#f7f2e4] p-3 text-sm font-bold text-[#3d4a5c]">
      <PlatformTag text="الإجابات محفوظة حتى المحاولة" />
      <span className="mt-1 block">{children}</span>
    </p>
  );
}

export function ActionButton38({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}) {
  const color =
    variant === "primary"
      ? "border-[#1b3a5c] bg-[#1b3a5c] text-white hover:bg-[#152e4a] disabled:border-[#e6dcc4] disabled:bg-[#efe8d6] disabled:text-[#5c6570]"
      : variant === "secondary"
        ? "border-[#c9b88a] bg-white text-[#1b3a5c] hover:bg-[#e8eef5] disabled:border-[#e6dcc4] disabled:bg-[#f7f2e4] disabled:text-[#5c6570]"
        : "border-transparent bg-[#f7f2e4] text-[#122033] hover:bg-[#efe6d0] disabled:text-[#5c6570]";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${FOCUS_38} inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-black transition-colors motion-reduce:transition-none disabled:cursor-not-allowed ${color} ${className}`}
    >
      {children}
    </button>
  );
}

export function Feedback38({
  state,
  title,
  children,
}: {
  state: "ok" | "review" | "info";
  title: string;
  children: ReactNode;
}) {
  const palette =
    state === "ok"
      ? "border-[#b8ddc5] bg-[#f0faf2] text-[#1c6b3c]"
      : state === "review"
        ? "border-[#f2d49a] bg-[#fff8e8] text-[#7c4a03]"
        : "border-[#d4c4a0] bg-[#f7f2e4] text-[#1a2433]";
  return (
    <div role="status" aria-live="polite" className={`rounded-xl border p-3 text-sm leading-6 ${palette}`}>
      <strong className="block font-black">{title}</strong>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

/** خط زمني أفقي واضح (عرضي) لثلاث نقاط مرجعية. */
export function TimelineRail38({
  points,
  active,
  onSelect,
}: {
  points: readonly { id: string; label: string; sub: string }[];
  active?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="fp38-rail" role="list" aria-label="خط زمني مستقبلي">
      {points.map((point, index) => {
        const isActive = active === point.id;
        const Tag = onSelect ? "button" : "div";
        return (
          <div key={point.id} role="listitem" className="relative min-w-0 flex-1">
            {index < points.length - 1 ? <span aria-hidden className="fp38-rail__line" /> : null}
            <Tag
              {...(onSelect ? { type: "button" as const, onClick: () => onSelect(point.id), "aria-pressed": isActive } : {})}
              data-timeline-point={point.id}
              className={`fp38-rail__point ${isActive ? "fp38-rail__point--active" : ""} ${onSelect ? FOCUS_38 : ""}`}
            >
              <span aria-hidden className="fp38-rail__dot" />
              <span dir="ltr" className="font-en mt-1 block text-xs font-black tracking-[.12em] text-[#1b3a5c]">
                {point.label}
              </span>
              <span className="mt-0.5 block text-xs font-bold leading-5 text-[#3d4a5c]">{point.sub}</span>
            </Tag>
          </div>
        );
      })}
    </div>
  );
}
