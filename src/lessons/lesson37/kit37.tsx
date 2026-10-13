import type { ReactNode } from "react";
import { En, PlatformTag, Rich } from "../../shared/lessonKit";
import type { SourceSection37 } from "./ledger37";

export const FOCUS_37 =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17354a] focus-visible:ring-offset-2";

const ARABIC_RANGE = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

/** سطر إنجليزي صِرف لا يحمل أي حرف عربي — يُعرض LTR معزولًا. */
export function isPureEnglish37(text: string) {
  return /[A-Za-z]/.test(text) && !ARABIC_RANGE.test(text);
}

export function English37({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <En className={className}>{children}</En>;
}

export function EnglishFormula37({ children }: { children: ReactNode }) {
  return (
    <span dir="ltr" className="font-en inline-block rounded-lg border border-[#dce6e4] bg-[#fbfdfc] px-2 py-1 text-[#18333b]">
      {children}
    </span>
  );
}

export function Card37({
  children,
  title,
  eyebrow,
  className = "",
}: {
  children: ReactNode;
  title?: ReactNode;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-[#d8d2c5] bg-white p-4 shadow-sm sm:p-5 ${className}`}>
      {eyebrow ? <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">{eyebrow}</p> : null}
      {title ? <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b] sm:text-xl">{title}</h2> : null}
      <div className="mt-3 space-y-3 text-base leading-7 text-[#24343b]">{children}</div>
    </section>
  );
}

export function LabCard37({
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
    <Card37 eyebrow={eyebrow} title={title} className="bg-[#fdfcf8]">
      {platformNote ? <PlatformNote37>{platformNote}</PlatformNote37> : null}
      <div data-lab={id} className="space-y-3">
        {children}
      </div>
    </Card37>
  );
}

export function PlatformNote37({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-[#b8d6c0] bg-[#edf5ee] p-3 text-sm leading-6 text-[#28533b]">
      <div className="mb-1.5">
        <PlatformTag text="إضافة تعليمية من المنصة" />
      </div>
      <div>{children}</div>
    </aside>
  );
}

/** لوحة «الكاميرا داخل المستقبل» — إطار عدسة بزوايا متقطعة وشارة تسجيل. */
export function CameraFrame37({
  title,
  caption,
  children,
  tone = "navy",
}: {
  title?: string;
  caption?: string;
  children: ReactNode;
  tone?: "navy" | "amber";
}) {
  const palette =
    tone === "navy"
      ? { shell: "bg-[#17354a] text-white", chip: "bg-white/15 text-[#f0ddb6]", body: "bg-white text-[#24343b]" }
      : { shell: "bg-[#7a5516] text-white", chip: "bg-white/15 text-[#fdf1d8]", body: "bg-[#fffdf6] text-[#24343b]" };
  return (
    <section className="overflow-hidden rounded-3xl border border-[#d8d2c5] bg-white shadow-sm">
      <header className={`flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 ${palette.shell}`}>
        <p className="text-sm font-black">
          <Rich text={title ?? "Future Camera"} />
        </p>
        <span dir="ltr" className={`font-en rounded-full px-2.5 py-1 text-[11px] font-black ${palette.chip}`}>
          ● REC · FUTURE
        </span>
      </header>
      <div className={`relative border-2 border-dashed border-[#c9d6d0] p-3 sm:p-4 ${palette.body}`}>
        {caption ? (
          <p className="mb-2 text-sm font-bold leading-6 text-[#43575a]">
            <Rich text={caption} />
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/**
 * سطر مصدر حرفي: الإنجليزية الصِرفة تُعزل LTR، والمختلط يمرّ عبر LatinRuns،
 * والحلول تُوسَم بخلفية خضراء لأنها «بعد المحاولة».
 */
export function SourceLine37({
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
  const pureEnglish = isPureEnglish37(text);
  const marker = /^(الصيغة:|النفي:|السؤال:|الإجابة القصيرة:|أسئلة المعلومات:|القاعدة:|القاعدة الذهنية|الاختصار:|إذن:|الترجمة|التحليل|التحليل النحوي|الحلول|الحلول التفصيلية|أسئلة الفهم|نموذج إرشادي قصير|أهم الاستخدامات|المحطة القادمة|مثال تمهيدي:|وسنقارن بين:|المثال|الأسئلة|الأسئلة:|الفكرة المشتركة:|الاختلاف:|قاعدة IQ200|سؤال IQ200|انتبه إلى الفرق المتقدم|حوار قصير|لاحظ أن الفكرة واحدة: نشاط مستمر\.)$/.test(
    text,
  );
  const isCorrect = text.includes("✅");
  const isWrong = text.includes("❌");
  return (
    <div
      id={`source-${sectionId}-${kind}-${index}`}
      data-source-unit={`${sectionId}-${kind}-${index}`}
      dir={pureEnglish ? "ltr" : "auto"}
      className={`min-w-0 rounded-xl px-3 py-2 leading-7 ${
        pureEnglish
          ? "border border-[#dce6e4] bg-[#fbfdfc] text-left font-en text-[#18333b]"
          : isCorrect
            ? "border border-[#b8d6c0] bg-[#edf5ee] font-bold text-[#28533b]"
            : isWrong
              ? "border border-[#e6c3be] bg-[#fbefed] font-bold text-[#8d3832]"
              : marker
                ? "border-r-4 border-[#9b6b1f] bg-[#fbf6eb] font-black text-[#24343b]"
                : kind === "reveal"
                  ? "text-[#28533b]"
                  : "text-[#24343b]"
      } ${className}`}
    >
      {pureEnglish ? (
        <span className="block">{highlightFuture ? highlightFutureForms37(text) : text}</span>
      ) : (
        <Rich text={text} />
      )}
    </div>
  );
}

/** تمييز صيغ المستقبل داخل نص القراءة (بصري فقط — النص لا يُخفى أبدًا). */
export function highlightFutureForms37(text: string) {
  const pattern =
    /\bwill be\s+\w+ing\b|\bwon't be\s+\w+ing\b|\b(?:am|is|are)\s+going to\b|\b[A-Za-z]+'ll be\s+\w+ing\b|\bwill\s+\w+\b/gi;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    nodes.push(
      <mark key={`${start}-${match[0]}`} className="rounded bg-[#f4e8c3] px-0.5 text-[#24343b]">
        {match[0]}
      </mark>,
    );
    cursor = start + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes.length ? nodes : text;
}

/** جدول مُعاد بناؤه من المصدر (الخط الزمني · الضمائر · الأزمنة · التعبيرات). */
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
    <div className="overflow-x-auto rounded-2xl border border-[#d8d2c5] bg-white">
      <table dir="rtl" aria-label={label} className="w-full min-w-[20rem] border-collapse text-base">
        <thead>
          <tr className="bg-[#17354a] text-white">
            {headers.map((header, index) => (
              <th
                key={header}
                scope="col"
                data-source-unit={`${idPrefix}-head-${index}`}
                className="px-3 py-3 text-right font-black"
              >
                <Rich text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${idPrefix}-row-${rowIndex}`} className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#f3f5f2]"}>
              {row.map((cell, cellIndex) => {
                const pure = isPureEnglish37(cell);
                const value = pure ? (
                  <span dir="ltr" className="font-en inline-block">
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
                    className="border-t border-[#e2e4de] px-3 py-3 text-right font-bold text-[#24343b]"
                  >
                    {value}
                  </th>
                ) : (
                  <td
                    key={`${idPrefix}-${rowIndex}-${cellIndex}`}
                    data-source-unit={`${idPrefix}-${rowIndex}-${cellIndex}`}
                    className="border-t border-[#e2e4de] px-3 py-3 text-right font-black text-[#17354a]"
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
  showReveal = false,
  hideIndexes = [],
  revealHidden = false,
  skipIndexes = [],
  highlightFuture = false,
  extra,
}: {
  section: SourceSection37;
  showReveal?: boolean;
  hideIndexes?: readonly number[];
  revealHidden?: boolean;
  skipIndexes?: readonly number[];
  highlightFuture?: boolean;
  extra?: ReactNode;
}) {
  const hidden = new Set(hideIndexes);
  const table =
    section.tableRows && section.tableHeaders ? (
      <Table37
        headers={section.tableHeaders}
        rows={section.tableRows}
        label={section.tableLabel ?? `جدول القسم ${section.num ?? ""}`}
        idPrefix={section.id}
      />
    ) : null;
  const tableAfter = section.tableAfter ?? Number.MAX_SAFE_INTEGER;

  return (
    <section data-source-section={section.id} className="overflow-hidden rounded-3xl border border-[#d8d2c5] bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-2 bg-[#17354a] px-4 py-3 text-white">
        <h2 className="text-base font-black leading-7 sm:text-lg">
          <Rich text={section.title} />
        </h2>
        <span dir="ltr" className="font-en shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
          {section.num == null ? "LESSON 37" : `§${section.num}`}
        </span>
      </header>
      <div className="space-y-1 p-3 sm:p-5">
        {tableAfter === -1 ? table : null}
        {section.units.map((text, index) => {
          if (skipIndexes.includes(index)) return null;
          const nodes: ReactNode[] = [];
          if (hidden.has(index) && !revealHidden) {
            nodes.push(
              <div
                key={`${section.id}-hidden-${index}`}
                id={`source-${section.id}-unit-${index}`}
                data-source-unit={`${section.id}-unit-${index}`}
                className="rounded-xl border border-dashed border-[#c9d6d0] bg-[#f7faf8] px-3 py-2 text-sm font-bold text-[#53676a]"
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
          if (tableAfter === index) nodes.push(<div key={`${section.id}-table-${index}`}>{table}</div>);
          return nodes;
        })}
        {extra}
        {section.tableRows && section.tableHeaders && tableAfter > section.units.length ? table : null}
        {section.revealUnits?.length ? (
          <div data-answer-key-for={section.id}>
            {showReveal ? (
              <div className="mt-3 space-y-1 rounded-2xl border border-[#b8d6c0] bg-[#edf5ee] p-3">
                <p className="mb-1 rounded-full bg-[#d9eadc] px-3 py-1 text-sm font-black text-[#28533b]">
                  مفتاح المصدر — بعد المحاولة
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
              <p className="mt-3 rounded-xl border border-dashed border-[#c9d6d0] bg-[#f7faf8] p-3 text-sm font-bold text-[#53676a]">
                <PlatformTag text="الإجابات محفوظة حتى المحاولة" />
              </p>
            )}
          </div>
        ) : null}
      </div>
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
      ? "border-[#245f62] bg-[#245f62] text-white hover:bg-[#1d5053] disabled:border-[#d8d2c5] disabled:bg-[#ece9e1] disabled:text-[#596965]"
      : variant === "secondary"
        ? "border-[#b9cfc6] bg-white text-[#245f62] hover:bg-[#eef4f0] disabled:border-[#e1e5df] disabled:bg-[#f5f5f2] disabled:text-[#596965]"
        : "border-transparent bg-[#f3f5f2] text-[#24343b] hover:bg-[#e6ebe7] disabled:text-[#596965]";
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

/** تغذية راجعة موحّدة للأنشطة: تنجح/تُراجع — مع شرح نصي دائم. */
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
      ? "border-[#b8d6c0] bg-[#edf5ee] text-[#28533b]"
      : state === "review"
        ? "border-[#e3d6b6] bg-[#fbf6eb] text-[#6a4d16]"
        : "border-[#d8d2c5] bg-[#f7faf8] text-[#24343b]";
  return (
    <div role="status" aria-live="polite" className={`rounded-xl border p-3 text-sm leading-6 ${palette}`}>
      <strong className="block font-black">{title}</strong>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}
