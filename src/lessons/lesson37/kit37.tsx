import { Fragment, type ReactNode } from "react";
import { PlatformTag, Rich } from "../../shared/lessonKit";
import type { SourceSection37 } from "./ledger37";

export const FOCUS_37 =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0369a1] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const ARABIC_RE_37 = /[\u0600-\u06FF]/;
const LATIN_RE_37 = /[A-Za-z]/;
const FORMULA_RE_37 =
  /^(Subject|Will|Wh-word|will not|won't|am\/is\/are|was\/were|will be|V-ing|V1|I\b|You\b|He\b|She\b|It\b|We\b|They\b)/;

const FUTURE_HIGHLIGHT_RE_37 =
  /(\b(?:will not|won't|will|'ll)\s+be\s+[A-Za-z]+ing\b|\bWill\s+(?:I|you|he|she|it|we|they|[A-Za-z]+)\s+be\s+[A-Za-z]+ing\b|\b(?:am|is|are)\s+going\s+to\s+[A-Za-z]+\b|\b(?:will not|won't|will|'ll)\s+[A-Za-z]+\b)/g;

export function isPureEnglish37(text: string): boolean {
  const trimmed = text.trim();
  return Boolean(trimmed) && !ARABIC_RE_37.test(trimmed) && (LATIN_RE_37.test(trimmed) || FORMULA_RE_37.test(trimmed));
}

export function isFormula37(text: string): boolean {
  const trimmed = text.trim();
  return (
    !ARABIC_RE_37.test(trimmed) &&
    (/\bSubject\b/.test(trimmed) ||
      /\bV-ing\b/.test(trimmed) ||
      trimmed === "will not = won't" ||
      trimmed === "Present Simple")
  );
}

export function isDialogueTurn37(text: string): boolean {
  return /^(Lena:|Omar:|لينا:|عمر:|A:|B:|Her friend asks:|Maya replies:)/.test(text.trim());
}

export function renderFutureHighlight37(text: string): ReactNode {
  const parts = text.split(FUTURE_HIGHLIGHT_RE_37);
  return parts.map((part, index) => {
    if (!part) return null;
    if (index % 2 === 1) {
      return (
        <mark key={index} className="rounded-md border border-[#fcd34d] bg-[#fef3c7] px-1.5 py-0.5 font-black text-[#0f172a]">
          {part}
        </mark>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export type FormulaPart37 = {
  role: "wh" | "subject" | "will" | "wont" | "be" | "ving" | "rest";
  en: string;
  ar: string;
};

/** شريط بصري ملوّن يوضّح أجزاء الصيغة (Subject + will + be + V-ing) داخل مرصد الأفق المستقبلي */
export function FormulaRibbon37({
  parts,
  caption,
}: {
  parts: readonly FormulaPart37[];
  caption?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#bae6fd] bg-[#f8fbff] p-3">
      {caption ? <p className="mb-2 text-xs font-black text-[#0c4a6e]">{caption}</p> : null}
      <div dir="ltr" className="fh37-formula-bar font-en">
        {parts.map((part, idx) => (
          <Fragment key={`${part.en}-${idx}`}>
            <span className={`fh37-token fh37-token--${part.role}`}>
              <span className="text-sm font-black sm:text-base">{part.en}</span>
              <span dir="rtl" className="fh37-token__sub font-sans">
                {part.ar}
              </span>
            </span>
            {idx < parts.length - 1 ? (
              <span aria-hidden="true" className="font-black text-[#0369a1]">
                +
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** إضافة تعليمية من المنصة — موسومة دائمًا حتى لا تُنسب إلى المصدر. */
export function PlatformNote37({ children, title = "إضافة تعليمية من المنصة" }: { children: ReactNode; title?: string }) {
  return (
    <aside className="rounded-2xl border border-[#5eead4] bg-[#f0fdfa] p-3.5 text-sm leading-7 text-[#115e59]">
      <div className="mb-1.5">
        <PlatformTag text={title} />
      </div>
      <div>{children}</div>
    </aside>
  );
}

/**
 * عنوان مصدري مختلط: الجزء العربي RTL ثم الجزء الإنجليزي بعد النقطتين في عازل LTR،
 * فلا يهاجر الفاصل أو يظهر معكوسًا في العنوان.
 */
export function SourceTitle37({ text }: { text: string }) {
  const match = text.match(/^(.*[:：])\s+([A-Za-z].*)$/);
  if (match) {
    return (
      <>
        <Rich text={match[1]} />{" "}
        <span dir="ltr" className="font-en inline-block">
          {match[2]}
        </span>
      </>
    );
  }
  return <Rich text={text} />;
}

export function SourceLine37({
  sectionId,
  index,
  text,
  kind = "unit",
  highlightFuture = false,
}: {
  sectionId: string;
  index: number;
  text: string;
  kind?: "unit" | "reveal";
  highlightFuture?: boolean;
}) {
  const unitAttr = `${sectionId}-${kind}-${index}`;
  const trimmed = text.trim();
  const hasError = trimmed.includes("❌");
  const hasCheck = trimmed.includes("✅");
  const pureEnglish = isPureEnglish37(trimmed);
  const formula = isFormula37(trimmed);
  const dialogue = isDialogueTurn37(trimmed);
  const numbered = /^[①②③④⑤⑥⑦⑧⑨⑩㉑㉒㉓㉔㉕]/.test(trimmed);
  const arrowRule = trimmed.includes("→") && !ARABIC_RE_37.test(trimmed);
  const subhead =
    !pureEnglish &&
    trimmed.length < 48 &&
    (trimmed.endsWith(":") ||
      /^(الحالة|الخطأ|المعنى|القاعدة|الفرق|النتيجة|الاستخدام|الصيغة|الإجابة|الحلول|الأسئلة|تحليل|المستوى|ملاحظة|انتبه|خلاصة)/.test(
        trimmed,
      ));

  if (formula || arrowRule) {
    return (
      <div
        id={`source-${unitAttr}`}
        data-source-unit={unitAttr}
        dir="ltr"
        className="font-en my-1.5 rounded-xl border border-[#7dd3fc] bg-[#e0f2fe] px-3.5 py-2.5 text-left text-base font-black leading-7 text-[#0c4a6e]"
      >
        {trimmed}
      </div>
    );
  }

  if (hasError || hasCheck) {
    const tone = hasError
      ? "border-[#fda4af] bg-[#ffe4e6] text-[#9f1239]"
      : "border-[#5eead4] bg-[#ccfbf1] text-[#115e59]";
    return (
      <div
        id={`source-${unitAttr}`}
        data-source-unit={unitAttr}
        dir={pureEnglish ? "ltr" : "auto"}
        className={`my-1.5 rounded-xl border px-3.5 py-2.5 text-base font-bold leading-7 ${
          pureEnglish ? "font-en text-left" : "text-right"
        } ${tone}`}
      >
        {pureEnglish ? trimmed : <Rich text={trimmed} />}
      </div>
    );
  }

  if (pureEnglish) {
    return (
      <div
        id={`source-${unitAttr}`}
        data-source-unit={unitAttr}
        dir="ltr"
        className={`font-en my-1.5 rounded-xl border border-[#bae6fd] bg-[#f0f9ff] px-3.5 py-2.5 text-left text-base font-semibold leading-7 text-[#0f172a] ${
          dialogue ? "border-l-4 border-l-[#0369a1]" : ""
        }`}
      >
        {highlightFuture ? renderFutureHighlight37(trimmed) : trimmed}
      </div>
    );
  }

  if (subhead) {
    return (
      <h3
        id={`source-${unitAttr}`}
        data-source-unit={unitAttr}
        className="mt-3 mb-1 inline-block rounded-lg bg-[#e0f2fe] px-2.5 py-1 text-base font-black leading-7 text-[#0c4a6e]"
      >
        <Rich text={trimmed} />
      </h3>
    );
  }

  return (
    <p
      id={`source-${unitAttr}`}
      data-source-unit={unitAttr}
      className={`my-1 text-base leading-8 text-[#1e293b] ${
        numbered
          ? "rounded-xl border border-[#bae6fd] bg-[#f8fbff] px-3.5 py-2 font-bold text-[#0f172a]"
          : dialogue
            ? "rounded-xl border border-[#5eead4] bg-[#f0fdfa] px-3.5 py-2 font-medium text-[#0f172a]"
            : ""
      }`}
    >
      <Rich text={trimmed} />
    </p>
  );
}

export function Table37({
  headers,
  rows,
  label,
  idPrefix,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  label: string;
  idPrefix: string;
}) {
  return (
    <div className="my-2 overflow-x-auto rounded-2xl border border-[#7dd3fc] bg-white shadow-sm">
      <table dir="rtl" aria-label={label} className="w-full min-w-[20rem] border-collapse text-base">
        <thead>
          <tr className="bg-[#0c4a6e] text-white">
            {headers.map((header, index) => (
              <th
                key={header}
                scope="col"
                data-source-unit={`${idPrefix}-head-${index}`}
                className="px-3.5 py-3 text-right font-black"
              >
                <Rich text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${idPrefix}-row-${rowIndex}`} className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#f0f9ff]"}>
              {row.map((cell, cellIndex) => {
                const pure = isPureEnglish37(cell);
                const value = pure ? (
                  <span dir="ltr" className="font-en inline-block font-bold">
                    {cell}
                  </span>
                ) : (
                  <Rich text={cell} />
                );
                return cellIndex === 0 ? (
                  <th
                    key={`${idPrefix}-${rowIndex}-${cellIndex}`}
                    scope="row"
                    data-source-unit={`${idPrefix}-${rowIndex}-${cellIndex}`}
                    className="border-t border-[#bae6fd] px-3.5 py-3 text-right font-bold text-[#0f172a]"
                  >
                    {value}
                  </th>
                ) : (
                  <td
                    key={`${idPrefix}-${rowIndex}-${cellIndex}`}
                    data-source-unit={`${idPrefix}-${rowIndex}-${cellIndex}`}
                    className="border-t border-[#bae6fd] px-3.5 py-3 text-right font-black text-[#0c4a6e]"
                  >
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

export function SourceCard37({
  section,
  titleOverride,
  badgeOverride,
  showReveal = false,
  hideRevealPrompt = false,
  hideIndexes = [],
  revealHidden = false,
  skipIndexes = [],
  onlyIndexes,
  hideTable = false,
  highlightFuture = false,
  twoColumnExamples = false,
  headerTone = "sky",
  extra,
}: {
  section: SourceSection37;
  titleOverride?: string;
  badgeOverride?: string;
  showReveal?: boolean;
  hideRevealPrompt?: boolean;
  hideIndexes?: readonly number[];
  revealHidden?: boolean;
  skipIndexes?: readonly number[];
  onlyIndexes?: readonly number[];
  hideTable?: boolean;
  highlightFuture?: boolean;
  twoColumnExamples?: boolean;
  headerTone?: "sky" | "teal" | "electric" | "violet";
  extra?: ReactNode;
}) {
  const hidden = new Set(hideIndexes);
  const onlySet = onlyIndexes ? new Set(onlyIndexes) : null;
  const table =
    !hideTable && section.tableRows && section.tableHeaders ? (
      <Table37
        headers={section.tableHeaders}
        rows={section.tableRows}
        label={section.tableLabel ?? `جدول القسم ${section.num ?? ""}`}
        idPrefix={section.id}
      />
    ) : null;
  const tableAfter = section.tableAfter ?? Number.MAX_SAFE_INTEGER;

  const headerBg =
    headerTone === "teal"
      ? "bg-[#0f766e]"
      : headerTone === "electric"
        ? "bg-[#1d4ed8]"
        : headerTone === "violet"
          ? "bg-[#6d28d9]"
          : "bg-[#0c4a6e]";

  return (
    <section
      data-source-section={section.id}
      className="overflow-hidden rounded-3xl border border-[#bae6fd] bg-white shadow-sm"
    >
      <header className={`flex flex-wrap items-center justify-between gap-2 ${headerBg} px-4 py-3 text-white`}>
        <h2 className="min-w-0 text-base font-black leading-7 sm:text-lg">
          <SourceTitle37 text={titleOverride ?? section.title} />
        </h2>
        <span dir="ltr" className="font-en shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-[#0f172a]">
          {badgeOverride ?? (section.num == null ? "HORIZON 37" : `§${section.num}`)}
        </span>
      </header>
      <div className={`p-3.5 sm:p-5 ${twoColumnExamples ? "grid gap-2 md:grid-cols-2" : "space-y-1.5"}`}>
        {tableAfter === -1 ? table : null}
        {section.units.map((text, index) => {
          if (onlySet && !onlySet.has(index)) return null;
          if (skipIndexes.includes(index)) return null;
          const nodes: ReactNode[] = [];
          if (hidden.has(index) && !revealHidden) {
            nodes.push(
              <div
                key={`${section.id}-hidden-${index}`}
                id={`source-${section.id}-unit-${index}`}
                data-source-unit={`${section.id}-unit-${index}`}
                className="rounded-xl border border-dashed border-[#7dd3fc] bg-[#f0f9ff] px-3.5 py-2.5 text-sm font-bold text-[#0c4a6e]"
              >
                أجب عن النشاط أولًا لإظهار هذه الجملة من المصدر.
              </div>,
            );
          } else {
            nodes.push(
              <SourceLine37
                key={`${section.id}-unit-${index}`}
                sectionId={section.id}
                index={index}
                text={text}
                highlightFuture={highlightFuture}
              />,
            );
          }
          if (tableAfter === index && table) {
            nodes.push(
              <div key={`${section.id}-table-${index}`} className={twoColumnExamples ? "md:col-span-2" : ""}>
                {table}
              </div>,
            );
          }
          return nodes;
        })}
        {extra ? <div className={twoColumnExamples ? "md:col-span-2" : ""}>{extra}</div> : null}
        {table && tableAfter > section.units.length ? (
          <div className={twoColumnExamples ? "md:col-span-2" : ""}>{table}</div>
        ) : null}
        {section.revealUnits?.length && !hideRevealPrompt ? (
          <div data-answer-key-for={section.id} className={twoColumnExamples ? "md:col-span-2" : ""}>
            {showReveal ? (
              <div className="mt-3 space-y-1.5 rounded-2xl border border-[#5eead4] bg-[#f0fdfa] p-3.5">
                <p className="mb-1 inline-block rounded-full bg-[#ccfbf1] px-3 py-1 text-sm font-black text-[#115e59]">
                  مفتاح المصدر الكامل — بعد المحاولة
                </p>
                {section.revealUnits.map((text, index) => (
                  <SourceLine37
                    key={`${section.id}-reveal-${index}`}
                    sectionId={section.id}
                    index={index}
                    text={text}
                    kind="reveal"
                  />
                ))}
              </div>
            ) : (
              <p className="mt-3 rounded-xl border border-dashed border-[#7dd3fc] bg-[#f0f9ff] p-3 text-sm font-bold text-[#0c4a6e]">
                <PlatformTag text="الإجابات محفوظة حتى إتمام المحاولة" />
              </p>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** بطاقة محتوى موحّدة داخل مرصد الأفق. */
export function Card37({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-[#bae6fd] bg-white p-4 shadow-sm sm:p-5 ${className}`}>
      {eyebrow ? <p className="text-xs font-black uppercase tracking-[.14em] text-[#0369a1]">{eyebrow}</p> : null}
      {title ? <h2 className="mt-1 text-lg font-black leading-8 text-[#0f172a] sm:text-xl">{title}</h2> : null}
      <div className="mt-3 space-y-3 text-base leading-7 text-[#1e293b]">{children}</div>
    </section>
  );
}

export function ActionButton37({
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
      ? "border-[#0f766e] bg-[#0f766e] text-white hover:bg-[#115e59] disabled:border-[#cbd5e1] disabled:bg-[#f1f5f9] disabled:text-[#475569]"
      : variant === "secondary"
        ? "border-[#7dd3fc] bg-white text-[#0c4a6e] hover:bg-[#e0f2fe] disabled:border-[#cbd5e1] disabled:bg-[#f8fbff] disabled:text-[#475569]"
        : "border-transparent bg-[#e0f2fe] text-[#0c4a6e] hover:bg-[#bae6fd] disabled:text-[#475569]";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${FOCUS_37} inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-black transition-colors motion-reduce:transition-none disabled:cursor-not-allowed ${color} ${className}`}
    >
      {children}
    </button>
  );
}

/** تغذية راجعة موحّدة للأنشطة: تنجح/تُراجع — مع شرح نصي دائم وتباين عالٍ. */
export function Feedback37({
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
      ? "border-[#5eead4] bg-[#f0fdfa] text-[#115e59]"
      : state === "review"
        ? "border-[#fcd34d] bg-[#fef3c7] text-[#92400e]"
        : "border-[#7dd3fc] bg-[#f0f9ff] text-[#0c4a6e]";
  return (
    <div role="status" aria-live="polite" className={`rounded-xl border p-3.5 text-sm leading-6 ${palette}`}>
      <strong className="block font-black">{title}</strong>
      <div className="mt-1">{children}</div>
    </div>
  );
}
