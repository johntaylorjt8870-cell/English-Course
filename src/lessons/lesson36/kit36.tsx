import type { ReactNode } from "react";
import { En, PlatformTag, Rich } from "../../shared/lessonKit";
import type { SourceSection36 } from "./ledger36";

export const FOCUS_36 = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-2";

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
    <section className={`rounded-3xl border border-[#e2e8f0] bg-white p-4 shadow-sm sm:p-5 ${className}`}>
      {eyebrow ? <p className="text-xs font-black uppercase tracking-[.12em] text-[#64748b]">{eyebrow}</p> : null}
      {title ? <h2 className="mt-1 text-lg font-black leading-snug text-[#334155] sm:text-xl">{title}</h2> : null}
      <div className="mt-3 space-y-3 text-base leading-7 text-[#334155]">{children}</div>
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
          ? "border border-[#cbd5e1] bg-[#ffffff] text-left font-en text-[#1e293b]"
          : marker
            ? /WILL/.test(text) ? "border-r-4 border-[#38bdf8] bg-[#f0f9ff] font-black text-[#0369a1]" : /GOING TO/.test(text) ? "border-r-4 border-[#f43f5e] bg-[#fff1f2] font-black text-[#be123c]" : "border-r-4 border-[#f59e0b] bg-[#fef3c7] font-black text-[#334155]"
            : "text-[#334155]"
      } ${className}`}
    >
      {pureEnglish ? <span className="block">{highlightFuture ? highlightFutureForms36(text) : text}</span> : <Rich text={text} />}
    </div>
  );
}

function highlightFutureForms36(text: string) {
  const pattern = /\b(?:will|won't|'ll)\b|\b(?:am|is|are|m|'re|'s)\s+going\s+to\b|\b(?:I'm|You're|We're|They're|He's|She's|It's)\s+going\s+to\b/gi;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    const isWill = /will|won't|'ll/i.test(match[0]);
    const bg = isWill ? "bg-[#38bdf8] text-white border-[#0284c7]" : "bg-[#f43f5e] text-white border-[#e11d48]";
    nodes.push(<mark key={`${start}-${match[0]}`} className={`rounded-md border-b-2 px-1 py-0.5 font-bold ${bg}`}>{match[0]}</mark>);
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
    <div className="overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-white">
      <table dir="rtl" aria-label="الخريطة الأساسية للمقارنة بين WILL وBE GOING TO" className="w-full min-w-[320px] border-collapse text-base">
        <thead>
          <tr className="bg-[#0d9488] text-white">
            {headers.map((header, index) => (
              <th key={header} scope="col" data-source-unit={`s03-table-head-${index}`} className="px-3 py-3 text-right font-black">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([situation, form], index) => (
            <tr key={`${situation}-${form}`} className={index % 2 === 0 ? "bg-white" : "bg-[#f1f5f9]"}>
              <th scope="row" data-source-unit={`s03-table-${index}-0`} className="border-t border-[#e2e8f0] px-3 py-3 text-right font-bold text-[#334155]">
                <Rich text={situation} />
              </th>
              <td data-source-unit={`s03-table-${index}-1`} className="border-t border-[#e2e8f0] px-3 py-3 text-right font-black text-[#0d9488]">
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
    <section data-source-section={section.id} className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-sm">
      <header className="relative overflow-hidden flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-[#0ea5e9] via-[#8b5cf6] to-[#ec4899] px-5 py-4 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <h2 className="text-base font-black leading-7 sm:text-lg"><Rich text={section.title} /></h2>
        <span dir="ltr" className="font-en shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
          {section.num == null ? "LESSON 36" : `§${section.num}`}
        </span>
      </header>
      <div className="space-y-1 p-3 sm:p-5">
        {section.tableRows ? <SourceTable36 section={section} /> : null}
        {section.units.map((text, index) => {
          if (skipIndexes.includes(index)) return null;
          if (hidden.has(index) && !revealHidden) return <div key={`${section.id}-${index}`} id={`source-${section.id}-unit-${index}`} data-source-unit={`${section.id}-unit-${index}`} className="rounded-xl border border-dashed border-[#94a3b8] bg-[#f8fafc] px-3 py-2 text-sm font-bold text-[#64748b]">أجب عن النشاط أولًا لإظهار هذه الجملة من المصدر.</div>;
          return <SourceLine36 key={`${section.id}-${index}`} sectionId={section.id} index={index} text={text} highlightFuture={highlightFuture} />;
        })}
        {extra}
        {section.revealUnits?.length ? (
          <div data-answer-key-for={section.id}>
            {showReveal ? (
              <div className="mt-3 space-y-1 rounded-2xl border border-[#5eead4] bg-[#ccfbf1] p-3">
                <p className="mb-1 rounded-full bg-[#99f6e4] px-3 py-1 text-sm font-black text-[#0f766e]">مفتاح المصدر — بعد المحاولة</p>
                {section.revealUnits.map((text, index) => <SourceLine36 key={`${section.id}-reveal-${index}`} sectionId={section.id} index={index} text={text} kind="reveal" />)}
              </div>
            ) : (
              <p className="mt-3 rounded-xl border border-dashed border-[#94a3b8] bg-[#f8fafc] p-3 text-sm font-bold text-[#64748b]">
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
    <aside className="rounded-2xl border border-[#5eead4] bg-[#ccfbf1] p-3 text-sm leading-6 text-[#0f766e]">
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
    ? "border-[#8b5cf6] bg-[#8b5cf6] text-white hover:bg-[#7c3aed] disabled:border-[#e2e8f0] disabled:bg-[#f1f5f9] disabled:text-[#94a3b8]"
    : "border-[#b9cfc6] bg-white text-[#8b5cf6] hover:bg-[#ccfbf1] disabled:border-[#e2e8f0] disabled:bg-[#f8fafc] disabled:text-[#94a3b8]";
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${FOCUS_36} inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-black transition-colors motion-reduce:transition-none disabled:cursor-not-allowed ${color} ${className}`}>
      {children}
    </button>
  );
}

export function EnglishFormula36({ children }: { children: ReactNode }) {
  return <span dir="ltr" className="font-en inline-block rounded-lg border border-[#cbd5e1] bg-[#ffffff] px-2 py-1 text-[#1e293b]">{children}</span>;
}
