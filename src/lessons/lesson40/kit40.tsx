import { Fragment, type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import type { SourceSection40 } from "./ledger40";

// ============================================================
// Lesson 40 — أدوات العرض المشتركة (Editorial Master Review Lab)
//
// قواعد الإتاحة والتباين المعتمدة في هذا الملف:
//   • جميع الألوان النصية المختارة تحقق نسبة تباين >= 4.5:1 على الأسطح الفاتحة.
//   • لا يُستخدم أي صنف يعتمد على الشفافية المنخفضة للنص.
//   • كل سطر إنجليزي مستقل يُعرض داخل كتلة LTR معزولة، وكل سطر مختلط يمر عبر Rich / LatinRuns.
// ============================================================

const HEADING_PREFIX_RE = /^(🎯|🧠|⭐|🔬|⚡|🎥|🏁|⏳|⚔️|🔍|🚨|🧩|⚙️|🎭|🌦️|🔥|✍️|🕵️|📖|🏆|🔐|🗺️|💡|📌|✅|❌|⚠️)/u;
const NUMBERED_PREFIX_RE = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕]/u;

export function EnBidi({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <En className={className}>{children}</En>;
}

export function MixedBidi({ children }: { children: string }) {
  return <Rich text={children} />;
}

export function pureEnglishLine40(line: string): boolean {
  return !/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(line) && /[A-Za-z]/.test(line);
}

/** عرض سطر مصدري واحد مع عزل اتجاه النص (RTL/LTR) بدقة. */
export function SourceLine40({
  line,
  index,
  sectionId,
  kind = "unit",
}: {
  line: string;
  index?: number;
  sectionId?: string;
  kind?: "unit" | "reveal";
}) {
  const trimmed = line.trim();
  const isPureEn = pureEnglishLine40(trimmed);
  const isWrong = trimmed.includes("❌");
  const isRight = trimmed.includes("✅");
  const isHeading = HEADING_PREFIX_RE.test(trimmed) && index === 0 && kind === "unit";
  const isNumbered = NUMBERED_PREFIX_RE.test(trimmed);
  const unitAttr = sectionId && index != null ? `${sectionId}-${kind}-${index}` : undefined;

  if (isHeading) {
    return (
      <h2
        dir="rtl"
        className="text-xl sm:text-2xl font-extrabold text-[#17354a] leading-[1.6] tracking-normal"
        data-source-line={index}
        data-source-unit={unitAttr}
      >
        <MixedBidi>{trimmed}</MixedBidi>
      </h2>
    );
  }

  if (isPureEn) {
    const toneClass = isWrong
      ? "border-[#cf7d73] bg-[#fbefed] text-[#8d3832]"
      : isRight || kind === "reveal"
        ? "border-[#7ea889] bg-[#edf5ee] text-[#28533b]"
        : "border-[#c7d3cb] bg-[#f7f8f5] text-[#17354a]";
    return (
      <div
        dir="ltr"
        lang="en"
        style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
        className={`rounded-xl border px-3.5 py-2.5 font-mono text-[15px] sm:text-base font-semibold leading-[1.7] ${toneClass}`}
        data-source-line={index}
        data-source-unit={unitAttr}
      >
        <EnBidi>{trimmed}</EnBidi>
      </div>
    );
  }

  const rtlClass = isWrong
    ? "rounded-xl border border-[#cf7d73] bg-[#fbefed] px-3.5 py-2.5 text-[#8d3832] font-semibold"
    : isRight || kind === "reveal"
      ? "rounded-xl border border-[#7ea889] bg-[#edf5ee] px-3.5 py-2.5 text-[#28533b] font-semibold"
      : isNumbered
        ? "rounded-xl border border-[#d5d0c3] bg-[#fdfcf8] px-3.5 py-2.5 text-[#24343b] font-semibold"
        : "text-[#24343b]";

  return (
    <p
      dir="rtl"
      className={`text-base sm:text-[17px] leading-[1.9] ${rtlClass}`}
      data-source-line={index}
      data-source-unit={unitAttr}
    >
      <MixedBidi>{trimmed}</MixedBidi>
    </p>
  );
}

/** عرض نص قسم مصدري كامل بترتيبه الأصلي، مع الجداول المُعاد بناؤها ووحدات الكشف المشروط. */
export function SourceLedgerBlock40({
  section,
  skipIndexes = [],
  showReveal = false,
  children,
}: {
  section: SourceSection40;
  skipIndexes?: readonly number[];
  showReveal?: boolean;
  children?: ReactNode;
}) {
  const skip = new Set<number>(skipIndexes);
  const table =
    section.tableRows && section.tableHeaders ? (
      <Table40
        caption={section.tableLabel ?? `جدول القسم ${section.num ?? ""}`}
        headers={section.tableHeaders}
        rows={section.tableRows}
      />
    ) : null;
  const tableAfter = section.tableAfter ?? Number.MAX_SAFE_INTEGER;

  return (
    <section
      dir="rtl"
      data-source-section={section.id}
      aria-label={section.title}
      className="rounded-2xl border border-[#d5d0c3] bg-[#fffdf8] p-5 sm:p-7 shadow-sm space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e4dfd2] pb-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#b9c8c0] bg-[#eef4f0] px-3 py-1 text-xs font-extrabold text-[#245f62]">
          {section.num == null ? "مقدمة الدرس المورّدة" : `القسم المصدري ${section.num} من 29`}
        </span>
        <span className="text-xs font-bold text-[#43575a]">النص الأصلي محفوظ بترتيبه الكامل</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold text-[#17354a] leading-[1.6]">
        <MixedBidi>{section.title}</MixedBidi>
      </h2>

      <div className="space-y-3">
        {tableAfter === -1 ? table : null}
        {section.units.map((line, index) => {
          if (skip.has(index)) return null;
          return (
            <Fragment key={`${section.id}-unit-${index}`}>
              <SourceLine40 line={line} index={index} sectionId={section.id} kind="unit" />
              {tableAfter === index ? table : null}
            </Fragment>
          );
        })}
        {table && tableAfter > section.units.length ? table : null}
      </div>

      {section.revealUnits && section.revealUnits.length > 0 ? (
        <div data-answer-key-for={section.id} className="pt-2">
          {showReveal ? (
            <div className="rounded-2xl border border-[#8fb69a] bg-[#edf5ee] p-4 space-y-2.5">
              <p className="text-xs sm:text-sm font-extrabold text-[#28533b]">
                مفتاح المصدر — يظهر بعد المحاولة:
              </p>
              {section.revealUnits.map((line, idx) => (
                <SourceLine40
                  key={`${section.id}-reveal-${idx}`}
                  line={line}
                  index={idx}
                  sectionId={section.id}
                  kind="reveal"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#b9c8c0] bg-[#f7f8f5] p-3 text-xs sm:text-sm font-bold text-[#17354a]">
              <span>🛠️ الإجابات محفوظة حتى إتمام المحاولة</span>
            </div>
          )}
        </div>
      ) : null}

      {children ? <div className="pt-3 border-t border-[#e4dfd2] space-y-4">{children}</div> : null}
    </section>
  );
}

export function Callout40({
  tone = "teal",
  title,
  badge,
  children,
}: {
  tone?: "teal" | "navy" | "amber" | "emerald" | "coral";
  title: string;
  badge?: string;
  children: ReactNode;
}) {
  const toneMap = {
    teal: "border-[#9dbbb5] bg-[#eef4f0] text-[#17354a]",
    navy: "border-[#aab8c4] bg-[#eef2f6] text-[#17354a]",
    amber: "border-[#d4b475] bg-[#fbf6eb] text-[#76531e]",
    emerald: "border-[#8fb69a] bg-[#edf5ee] text-[#28533b]",
    coral: "border-[#cf7d73] bg-[#fbefed] text-[#8d3832]",
  } as const;

  return (
    <aside dir="rtl" className={`rounded-2xl border p-4 sm:p-5 space-y-2.5 ${toneMap[tone]}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base sm:text-lg font-extrabold leading-snug">
          <MixedBidi>{title}</MixedBidi>
        </h3>
        {badge ? (
          <span className="rounded-full border border-current px-2.5 py-0.5 text-xs font-extrabold">{badge}</span>
        ) : null}
      </div>
      <div className="text-sm sm:text-base text-[#24343b] leading-[1.85] space-y-2">{children}</div>
    </aside>
  );
}

export function Table40({
  caption,
  headers,
  rows,
  ltrColumns = [],
}: {
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  ltrColumns?: readonly number[];
}) {
  const ltrSet = new Set(ltrColumns);
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#c8c3b4] bg-[#ffffff] shadow-sm">
      <table className="w-full border-collapse text-right text-sm sm:text-base">
        <caption className="border-b border-[#ded9cb] bg-[#f5f3ed] px-4 py-3 text-right text-sm font-extrabold text-[#17354a]">
          <MixedBidi>{caption}</MixedBidi>
        </caption>
        <thead>
          <tr className="border-b border-[#ded9cb] bg-[#eef4f0] text-[#17354a]">
            {headers.map((header, idx) => (
              <th key={idx} scope="col" className="px-4 py-3 font-extrabold">
                <MixedBidi>{header}</MixedBidi>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e6e1d5]">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-[#ffffff]" : "bg-[#fdfcf8]"}>
              {row.map((cell, cIdx) => {
                const isLtr = ltrSet.has(cIdx) || pureEnglishLine40(cell);
                return (
                  <td key={cIdx} className="px-4 py-3 align-top text-[#24343b] leading-[1.75]">
                    {isLtr ? (
                      <div
                        dir="ltr"
                        lang="en"
                        style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                        className="font-mono font-semibold text-[#17354a]"
                      >
                        <EnBidi>{cell}</EnBidi>
                      </div>
                    ) : (
                      <MixedBidi>{cell}</MixedBidi>
                    )}
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

export function Chip40({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "teal" | "amber" | "emerald" | "coral";
}) {
  const map = {
    neutral: "border-[#c7c2b4] bg-[#f5f3ed] text-[#24343b]",
    teal: "border-[#95b8b1] bg-[#eef4f0] text-[#245f62]",
    amber: "border-[#d4b475] bg-[#fbf6eb] text-[#76531e]",
    emerald: "border-[#8fb69a] bg-[#edf5ee] text-[#28533b]",
    coral: "border-[#cf7d73] bg-[#fbefed] text-[#8d3832]",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold ${map[tone]}`}>
      <MixedBidi>{label}</MixedBidi>
    </span>
  );
}

/** لوحة كشف مشروط صريحة بأزرار وصول قياسية (دون details/summary). */
export function RevealPanel40({
  id,
  label,
  open,
  canOpen,
  lockedReason,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  open: boolean;
  canOpen: boolean;
  lockedReason?: string;
  onToggle: () => void;
  children?: ReactNode;
}) {
  const panelId = `${id}-panel`;
  return (
    <div className="rounded-2xl border border-[#c8c3b4] bg-[#f5f3ed] p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-extrabold text-[#17354a]">
            <MixedBidi>{label}</MixedBidi>
          </p>
          {!canOpen && lockedReason ? (
            <p className="text-xs font-bold text-[#76531e]">
              <MixedBidi>{lockedReason}</MixedBidi>
            </p>
          ) : null}
        </div>
        <button
          type="button"
          disabled={!canOpen}
          aria-expanded={open && canOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-extrabold transition ${
            canOpen
              ? "bg-[#17354a] text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
              : "border border-[#c7c2b4] bg-[#e9e5da] text-[#596965] cursor-not-allowed"
          }`}
        >
          {open && canOpen ? "إخفاء الحل المصدري" : "إظهار الحل المصدري بعد المحاولة"}
        </button>
      </div>
      {open && canOpen && children ? (
        <div id={panelId} className="rounded-xl border border-[#d5d0c3] bg-[#fffdf8] p-4 space-y-2.5">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function normalizeEnglishInput40(raw: string): string {
  return raw
    .trim()
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.?!]+$/g, "")
    .toLowerCase();
}
