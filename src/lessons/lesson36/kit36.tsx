import type { ReactNode } from "react";
import { En, PlatformTag, Rich } from "../../shared/lessonKit";
import type { SourceSection36 } from "./ledger36";

export const FOCUS_36 = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17354a] focus-visible:ring-offset-2";

export function English36({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <En className={className}>{children}</En>;
}

export function Card36({
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

export function SourceLine36({
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
  const pureEnglish = /[A-Za-z]/.test(text) && !/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
  const marker = /^(الحلول|الحلول المفصلة|الترجمة|التحليل النحوي|التحليل|أسئلة الفهم|نموذج افتتاحي قصير|القاعدة المتقدمة|تنبيه مهم:|أهم الاستخدامات:|الصيغة:|WILL|BE GOING TO|A\. القرار اللحظي — Spontaneous Decision|B\. الخطة المسبقة — Prior Plan|A\. WILL — توقع أو اعتقاد|B\. BE GOING TO — توقع مع إبراز دليل حاضر)$/.test(text);
  return (
    <div
      id={`source-${sectionId}-${kind}-${index}`}
      data-source-unit={`${sectionId}-${kind}-${index}`}
      dir={pureEnglish ? "ltr" : "auto"}
      className={`min-w-0 rounded-xl px-3 py-2 leading-7 ${
        pureEnglish
          ? "border border-[#dce6e4] bg-[#fbfdfc] text-left font-en text-[#18333b]"
          : marker
            ? "border-r-4 border-[#9b6b1f] bg-[#fbf6eb] font-black text-[#24343b]"
            : "text-[#24343b]"
      } ${className}`}
    >
      {pureEnglish ? <span className="block">{highlightFuture ? highlightFutureForms36(text) : text}</span> : <Rich text={text} />}
    </div>
  );
}

function highlightFutureForms36(text: string) {
  const pattern = /\b(?:will|won't)\b|\b(?:am|is|are)\s+going\s+to\b|\b(?:I'm|You're|We're|They're|He's|She's|It's)\s+going\s+to\b/gi;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    nodes.push(<mark key={`${start}-${match[0]}`} className="rounded bg-[#f4e8c3] px-0.5 text-[#24343b]">{match[0]}</mark>);
    cursor = start + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes.length ? nodes : text;
}

export function SourceTable36({ section }: { section: SourceSection36 }) {
  if (!section.tableRows) return null;
  const headers = ["الموقف", "الصيغة النموذجية"] as const;
  const rows = section.tableRows;
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#d8d2c5] bg-white">
      <table dir="rtl" aria-label="الخريطة الأساسية للمقارنة بين WILL وBE GOING TO" className="w-full min-w-[320px] border-collapse text-base">
        <thead>
          <tr className="bg-[#17354a] text-white">
            {headers.map((header, index) => (
              <th key={header} scope="col" data-source-unit={`s03-table-head-${index}`} className="px-3 py-3 text-right font-black">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([situation, form], index) => (
            <tr key={`${situation}-${form}`} className={index % 2 === 0 ? "bg-white" : "bg-[#f3f5f2]"}>
              <th scope="row" data-source-unit={`s03-table-${index}-0`} className="border-t border-[#e2e4de] px-3 py-3 text-right font-bold text-[#24343b]">
                <Rich text={situation} />
              </th>
              <td data-source-unit={`s03-table-${index}-1`} className="border-t border-[#e2e4de] px-3 py-3 text-right font-black text-[#17354a]">
                <span dir="ltr" className="font-en inline-block">{form}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SourceCard36({
  section,
  showReveal = false,
  hideIndexes = [],
  revealHidden = false,
  skipIndexes = [],
  highlightFuture = false,
  extra,
}: {
  section: SourceSection36;
  showReveal?: boolean;
  hideIndexes?: readonly number[];
  revealHidden?: boolean;
  skipIndexes?: readonly number[];
  highlightFuture?: boolean;
  extra?: ReactNode;
}) {
  const hidden = new Set(hideIndexes);
  return (
    <section data-source-section={section.id} className="overflow-hidden rounded-3xl border border-[#d8d2c5] bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-2 bg-[#17354a] px-4 py-3 text-white">
        <h2 className="text-base font-black leading-7 sm:text-lg"><Rich text={section.title} /></h2>
        <span dir="ltr" className="font-en shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
          {section.num == null ? "LESSON 36" : `§${section.num}`}
        </span>
      </header>
      <div className="space-y-1 p-3 sm:p-5">
        {section.tableRows ? <SourceTable36 section={section} /> : null}
        {section.units.map((text, index) => {
          if (skipIndexes.includes(index)) return null;
          if (hidden.has(index) && !revealHidden) return <div key={`${section.id}-${index}`} id={`source-${section.id}-unit-${index}`} data-source-unit={`${section.id}-unit-${index}`} className="rounded-xl border border-dashed border-[#c9d6d0] bg-[#f7faf8] px-3 py-2 text-sm font-bold text-[#53676a]">أجب عن النشاط أولًا لإظهار هذه الجملة من المصدر.</div>;
          return <SourceLine36 key={`${section.id}-${index}`} sectionId={section.id} index={index} text={text} highlightFuture={highlightFuture} />;
        })}
        {extra}
        {section.revealUnits?.length ? (
          <div data-answer-key-for={section.id}>
            {showReveal ? (
              <div className="mt-3 space-y-1 rounded-2xl border border-[#b8d6c0] bg-[#edf5ee] p-3">
                <p className="mb-1 rounded-full bg-[#d9eadc] px-3 py-1 text-sm font-black text-[#28533b]">مفتاح المصدر — بعد المحاولة</p>
                {section.revealUnits.map((text, index) => <SourceLine36 key={`${section.id}-reveal-${index}`} sectionId={section.id} index={index} text={text} kind="reveal" />)}
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

export function PlatformNote36({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-[#b8d6c0] bg-[#edf5ee] p-3 text-sm leading-6 text-[#28533b]">
      <div className="mb-1.5"><PlatformTag text="إضافة تعليمية من المنصة" /></div>
      <div>{children}</div>
    </aside>
  );
}

export function ActionButton36({
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
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
}) {
  const color = variant === "primary"
    ? "border-[#245f62] bg-[#245f62] text-white hover:bg-[#1d5053] disabled:border-[#d8d2c5] disabled:bg-[#ece9e1] disabled:text-[#596965]"
    : "border-[#b9cfc6] bg-white text-[#245f62] hover:bg-[#eef4f0] disabled:border-[#e1e5df] disabled:bg-[#f5f5f2] disabled:text-[#596965]";
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${FOCUS_36} inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-black transition-colors motion-reduce:transition-none disabled:cursor-not-allowed ${color} ${className}`}>
      {children}
    </button>
  );
}

export function EnglishFormula36({ children }: { children: ReactNode }) {
  return <span dir="ltr" className="font-en inline-block rounded-lg border border-[#dce6e4] bg-[#fbfdfc] px-2 py-1 text-[#18333b]">{children}</span>;
}
