import type { ReactNode } from "react";
import { En, PlatformTag, Rich } from "../../shared/lessonKit";
import type { SourceSection38 } from "./ledger38";

/* ============================================================
   Lesson 38 — Finish Line Studio
   نظام بصري مستقل: ورقة عاجية دافئة، وردي/عنبري/بنفسجي،
   وخط نهاية بعلامات مرجعية. لا يشارك هوية Lesson 37.
   ============================================================ */

export const FOCUS_38 =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9f1239] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8f3]";

export const TENSE_38 = {
  simple: {
    en: "will + V1",
    label: "Future Simple",
    chip: "border-[#f2c14e] bg-[#fff8e1] text-[#7c4a03]",
    dot: "bg-[#e8a317]",
  },
  continuous: {
    en: "will be + V-ing",
    label: "Future Continuous",
    chip: "border-[#c4b5fd] bg-[#f5f3ff] text-[#5b21b6]",
    dot: "bg-[#7c3aed]",
  },
  perfect: {
    en: "will have + V3",
    label: "Future Perfect",
    chip: "border-[#fda4af] bg-[#fff1f2] text-[#9f1239]",
    dot: "bg-[#e11d48]",
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
    <span dir="ltr" className="font-en inline-block rounded-lg border border-[#f3d2d9] bg-[#fffaf7] px-2 py-1 text-[#3f1233]">
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

/** شريط خط النهاية — العلامة البصرية المتكررة في الدرس. */
export function FinishLine38({ label = "FINISH", className = "" }: { label?: string; className?: string }) {
  return (
    <div aria-hidden className={`fp38-finishline ${className}`}>
      <span className="fp38-finishline__stripe" />
      <span className="fp38-finishline__label" dir="ltr">
        {label}
      </span>
      <span className="fp38-finishline__stripe" />
    </div>
  );
}

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
      {title ? <h2 className="mt-1 text-lg font-black leading-snug text-[#3f1233] sm:text-xl">{title}</h2> : null}
      <div className="mt-3 space-y-3 text-base leading-7 text-[#2b1633]">{children}</div>
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
      <h2 className="mt-1 text-lg font-black leading-snug text-[#3f1233]">{title}</h2>
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

/** إطار «خط النهاية» — يبقى للتوافق مع مختبرات الدرس. */
export function DeadlineFrame38({
  title,
  caption,
  children,
  tone = "rose",
}: {
  title?: string;
  caption?: string;
  children: ReactNode;
  tone?: "rose" | "amber";
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-[#f0c9d2] bg-white shadow-[0_18px_50px_-32px_rgba(159,18,57,0.45)]">
      <header
        className={`flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-white ${
          tone === "rose" ? "bg-[#9f1239]" : "bg-[#a16207]"
        }`}
      >
        <p className="text-sm font-black">
          <Rich text={title ?? "Finish Line Studio"} />
        </p>
        <span dir="ltr" className="font-en rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-black text-[#ffe9ae]">
          BY → FUTURE
        </span>
      </header>
      <div className="relative border-2 border-dashed border-[#f3d2d9] bg-[#fffaf7] p-3 sm:p-4">
        {caption ? (
          <p className="mb-2 text-sm font-bold leading-6 text-[#6b4a5e]">
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
          ? "border border-[#f3d2d9] bg-[#fffaf7] text-left font-en text-[#3f1233]"
          : isCorrect
            ? "border border-[#b8ddc5] bg-[#f0faf2] font-bold text-[#1c6b3c]"
            : isWrong
              ? "border border-[#f6c2c9] bg-[#fff1f2] font-bold text-[#a41c36]"
              : marker
                ? "border-r-4 border-[#e8a317] bg-[#fff8e8] font-black text-[#3f1233]"
                : kind === "reveal"
                  ? "text-[#1c6b3c]"
                  : "text-[#2b1633]"
      } ${className}`}
    >
      {pureEnglish ? (
        <span className="block">{highlightFuture ? highlightFutureForms38(text) : text}</span>
      ) : (
        <Rich text={text} />
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
      ? "bg-[#ffe4e6] text-[#9f1239]"
      : /be\s/.test(phrase)
        ? "bg-[#ede9fe] text-[#5b21b6]"
        : "bg-[#fef3c7] text-[#7c4a03]";
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
  tone = "rose",
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  label: string;
  idPrefix: string;
  tone?: "rose" | "amber";
}) {
  return (
    <div className="fp38-tablewrap">
      <table dir="rtl" aria-label={label} className="w-full min-w-[20rem] border-collapse text-base">
        <thead>
          <tr className={tone === "rose" ? "bg-[#9f1239] text-white" : "bg-[#a16207] text-white"}>
            {headers.map((header, index) => (
              <th key={`${idPrefix}-head-${header}-${index}`} scope="col" data-source-unit={`${idPrefix}-head-${index}`} className="px-3 py-3 text-right font-black">
                <Rich text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${idPrefix}-row-${rowIndex}`} className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#fff7f2]"}>
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
                  <th key={`${idPrefix}-${rowIndex}-${cellIndex}`} scope="row" data-source-unit={`${idPrefix}-${rowIndex}-${cellIndex}`} className="border-t border-[#f6e3de] px-3 py-3 text-right font-bold text-[#2b1633]">
                    {value}
                  </th>
                ) : (
                  <td key={`${idPrefix}-${rowIndex}-${cellIndex}`} data-source-unit={`${idPrefix}-${rowIndex}-${cellIndex}`} className="border-t border-[#f6e3de] px-3 py-3 text-right font-black text-[#9f1239]">
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
    ? <Table38 headers={section.tableHeaders} rows={section.tableRows} label={section.tableLabel ?? `جدول القسم ${section.num ?? ""}`} idPrefix={section.id} />
    : null;
  const extraTable = showExtraTable && section.extraTableRows && section.extraTableHeaders
    ? <Table38 headers={section.extraTableHeaders} rows={section.extraTableRows} label={section.extraTableLabel ?? "جدول إضافي"} idPrefix={`${section.id}-extra`} tone="amber" />
    : null;

  return (
    <section data-source-section={section.id} data-source-range={`${from}-${to}`} className="fp38-source">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f3d2d9] bg-[#fff7f2] px-4 py-3">
        <h2 className="text-base font-black leading-7 text-[#3f1233] sm:text-lg">
          <Title38 text={section.title} />
        </h2>
        <span dir="ltr" className="font-en shrink-0 rounded-full border border-[#f3c7d1] bg-white px-3 py-1 text-xs font-black text-[#9f1239]">
          {section.num == null ? "OPENING" : `§${section.num}`}
          <span className="mx-1 text-[#c98a9d]">·</span>
          {from + 1}–{to}
        </span>
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
    <p className="mt-3 rounded-xl border border-dashed border-[#e7c8cc] bg-[#fff8f3] p-3 text-sm font-bold text-[#7a5767]">
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
      ? "border-[#9f1239] bg-[#9f1239] text-white hover:bg-[#881337] disabled:border-[#ecd6d5] disabled:bg-[#f6e9e5] disabled:text-[#8a6a72]"
      : variant === "secondary"
        ? "border-[#e9b9c6] bg-white text-[#9f1239] hover:bg-[#fff1f2] disabled:border-[#f0e1dc] disabled:bg-[#fff8f3] disabled:text-[#8a6a72]"
        : "border-transparent bg-[#fdf2ed] text-[#3f1233] hover:bg-[#f9e4dc] disabled:text-[#8a6a72]";
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
        : "border-[#f3d2d9] bg-[#fff8f3] text-[#2b1633]";
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
          <div key={point.id} role="listitem" className="relative flex-1">
            {index < points.length - 1 ? <span aria-hidden className="fp38-rail__line" /> : null}
            <Tag
              {...(onSelect ? { type: "button" as const, onClick: () => onSelect(point.id), "aria-pressed": isActive } : {})}
              data-timeline-point={point.id}
              className={`fp38-rail__point ${isActive ? "fp38-rail__point--active" : ""} ${onSelect ? FOCUS_38 : ""}`}
            >
              <span aria-hidden className="fp38-rail__dot" />
              <span dir="ltr" className="font-en mt-1 block text-xs font-black tracking-[.12em] text-[#9f1239]">
                {point.label}
              </span>
              <span className="mt-0.5 block text-xs font-bold leading-5 text-[#6b4a5e]">{point.sub}</span>
            </Tag>
          </div>
        );
      })}
    </div>
  );
}
