import type { ReactNode } from "react";
import { En, PlatformTag, Rich } from "../../shared/lessonKit";
import { SOURCE_SECTIONS_35 } from "./ledger35";

export const FOCUS_35 = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4c8b84]/30";

export function English35({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <En className={className}>{children}</En>;
}

export function PlatformNote35({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-[#c7d8d3] bg-[#eef4f0] p-3 text-sm leading-6 text-[#243f46]">
      <div className="mb-1.5"><PlatformTag text="إضافة تعليمية من المنصة" /></div>
      <div>{children}</div>
    </aside>
  );
}

export function SourceUnit35({ text, index }: { text: string; index: number }) {
  const pureEnglish = /[A-Za-z]/.test(text) && !/[\u0600-\u06FF]/.test(text);
  const emphasis = /^(الحلول|الحلول المفصلة|التحليل|التحليل النحوي|الترجمة|أمثلة:?|القاعدة:?|لماذا\؟|قارن:?|ملاحظة لغوية:|الموقف الأول:|الموقف الثاني:|أسئلة الفهم|نموذج إرشادي قصير|أهم استخدامين|المقارنة الذهبية|المحطة القادمة:)$/.test(text);
  const correctExample = text.includes("✅");
  const incorrectExample = text.includes("❌");
  return (
    <div
      data-source-unit={index}
      dir="auto"
      className={`min-w-0 rounded-xl px-3 py-2 leading-7 ${
        correctExample
          ? "border border-[#b8d6c0] bg-[#edf5ee] font-bold text-[#315d4e]"
          : incorrectExample
            ? "border border-[#e6c3be] bg-[#fbefed] font-bold text-[#8d433b]"
            : pureEnglish
              ? "border border-[#d9e2e3] bg-white text-[#102b3d]"
              : emphasis
                ? "mt-1 border-r-4 border-[#b57a3b] bg-[#fbf7ee] font-black text-[#293d47]"
                : "text-[#263a44]"
      }`}
    >
      {pureEnglish ? <span dir="ltr" className="font-en block text-left">{text}</span> : <Rich text={text} />}
    </div>
  );
}

/** Verbatim source passage for a single section; answer keys are a separate gated block. */
export function SourcePanel35({
  id,
  units,
  revealUnits,
  revealed = false,
  sourceLabel = "نص الدرس المورّد",
}: {
  id: string;
  units?: string[];
  revealUnits?: string[];
  revealed?: boolean;
  sourceLabel?: string;
}) {
  const section = SOURCE_SECTIONS_35.find((candidate) => candidate.id === id);
  if (!section) return null;
  const shownUnits = units ?? section.units;
  const gatedUnits = revealUnits ?? section.revealUnits;
  return (
    <section
      data-source-section={id}
      className="overflow-hidden rounded-3xl border border-[#d8d2c5] bg-[#fffdf8] shadow-[0_8px_26px_-24px_rgba(20,40,55,.48)]"
    >
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e9e3d7] bg-[#f7f3ea] px-4 py-3">
        <div className="text-[11px] font-black uppercase tracking-[.14em] text-[#8b663c]">{sourceLabel}</div>
        <div className="text-xs font-bold text-[#66777a]">{section.num ? `§${section.num}` : "Future Lab"}</div>
      </header>
      <div className="space-y-1 p-3 sm:p-4">
        {shownUnits.map((text, index) => <SourceUnit35 key={`${id}-${index}`} text={text} index={index} />)}
      </div>
      {gatedUnits?.length ? (
        <div data-answer-feedback={id}>
          {revealed ? (
            <div className="border-t border-[#c9dfd2] bg-[#f1f7f1] p-3 sm:p-4">
              <div className="mb-2 rounded-full bg-[#dcebe0] px-3 py-1 text-xs font-black text-[#315d4e]">مفتاح المصدر — ظهر بعد المحاولة</div>
              <div className="space-y-1">
                {gatedUnits.map((text, index) => <SourceUnit35 key={`${id}-reveal-${index}`} text={text} index={shownUnits.length + index} />)}
              </div>
            </div>
          ) : (
            <div className="border-t border-dashed border-[#d6ded8] px-4 py-3 text-sm font-bold text-[#53676a]">
              🔒 مفتاح المصدر محفوظ حتى تحاول ثم تطلب التحقق.
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}

export function Card35({
  children,
  className = "",
  title,
  eyebrow,
}: {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <section className={`rounded-3xl border border-[#d8d2c5] bg-[#fffdf8] p-4 shadow-[0_10px_30px_-26px_rgba(20,40,55,.5)] sm:p-5 ${className}`}>
      {eyebrow ? <div className="text-[10px] font-black uppercase tracking-[.15em] text-[#8b663c]">{eyebrow}</div> : null}
      {title ? <h3 className="mt-1 text-lg font-black leading-snug text-[#183346]">{title}</h3> : null}
      {children}
    </section>
  );
}

export function SourceTable35({
  headers,
  rows,
  ariaLabel,
  sourceUnitOffset,
}: {
  headers: [string, string];
  rows: [string, string][];
  ariaLabel: string;
  /** Linear source-ledger index of the first table header. */
  sourceUnitOffset?: number;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#d8d2c5] bg-white">
      <table dir="rtl" aria-label={ariaLabel} className="w-full min-w-[290px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#17354a] text-white">
            {headers.map((header, index) => <th key={header} data-source-unit={sourceUnitOffset == null ? undefined : sourceUnitOffset + index} scope="col" className="px-3 py-2 text-right font-black">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${row[1]}`} className={index % 2 ? "bg-[#f7f3ea]" : "bg-white"}>
              <th data-source-unit={sourceUnitOffset == null ? undefined : sourceUnitOffset + 2 + index * 2} scope="row" className="border-t border-[#e6e0d5] px-3 py-2 text-right font-bold text-[#314751]">
                <Rich text={row[0]} />
              </th>
              <td data-source-unit={sourceUnitOffset == null ? undefined : sourceUnitOffset + 3 + index * 2} className="border-t border-[#e6e0d5] px-3 py-2 text-right font-bold text-[#17354a]">
                <span dir="ltr" className="font-en inline-block">{row[1]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ChoiceButton35({
  children,
  selected = false,
  onClick,
  disabled = false,
  className = "",
  pressed,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed ?? selected}
      disabled={disabled}
      onClick={onClick}
      className={`${FOCUS_35} rounded-xl border px-3 py-2 text-sm font-black transition disabled:cursor-default ${
        selected
          ? "border-[#245f62] bg-[#245f62] text-white shadow-sm"
          : "border-[#d6d1c7] bg-white text-[#304750] hover:border-[#59837d] hover:bg-[#f3f6f0]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function LtrSentence35({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div dir="ltr" className={`ltr-row rounded-2xl border border-[#dce3df] bg-white px-4 py-3 text-left text-lg font-black text-[#17354a] ${className}`}>{children}</div>;
}
