import type { ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";
import type { StudentSourceSection40 } from "./studentLedger40";

export function Rich40({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className || undefined}>
      <LatinRuns text={text} />
    </span>
  );
}

export function EnLine40({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "default" | "wrong" | "right";
  className?: string;
}) {
  const toneCls = tone === "wrong" ? "is-wrong" : tone === "right" ? "is-right" : "";
  return (
    <div dir="ltr" className={`tcc-en-box font-en ${toneCls} ${className}`.trim()}>
      {children}
    </div>
  );
}

export function isPureEnglishUnit40(line: string): boolean {
  return /[A-Za-z]/.test(line) && !/[\u0600-\u06FF]/.test(line);
}

const HEADING_LINES_40 = new Set([
  "اكتشاف مهم",
  "الموقف الأول",
  "الموقف الثاني",
  "الموقف الثالث",
  "الموقف الرابع",
  "الموقف الخامس",
  "أمثلة إضافية",
  "أمثلة",
  "تذكر",
  "الجملة الأولى",
  "الجملة الثانية",
  "الجملة الثالثة",
  "ملخص المقارنة",
  "الخطأ الشائع",
  "انتبه إلى الفرق",
  "الترجمة والتحليل",
  "اكتشاف IQ200",
  "التحدي",
  "الحل",
  "الحلول",
  "الحلول المفصلة",
  "القاعدة المتقدمة",
  "أسئلة الفهم",
  "الدرس المستفاد",
  "نموذج افتتاحي إرشادي",
  "القاعدة الذهبية الكبرى",
  "منظومة الحاضر",
  "منظومة الماضي",
  "منظومة المستقبل",
  "المحطة القادمة",
]);

function renderSourceTable40(section: StudentSourceSection40) {
  if (!section.tableHeaders || !section.tableRows) return null;
  return (
    <div
      className="tcc-table-wrap"
      data-source-table={section.id}
      role="region"
      aria-label={section.title}
    >
      <table className="tcc-table">
        <thead>
          <tr>
            {section.tableHeaders.map((header, idx) => (
              <th key={idx} scope="col">
                <Rich40 text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.tableRows.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => {
                const pureEn = isPureEnglishUnit40(cell);
                return (
                  <td key={cIdx}>
                    {pureEn ? (
                      <div dir="ltr" className="font-en font-bold text-left">
                        {cell}
                      </div>
                    ) : (
                      <Rich40 text={cell} />
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

export function SourceBriefing40({
  section,
  unitIndexes,
  includeTable = false,
  headingLabel = "بطاقة الشرح والأمثلة",
}: {
  section: StudentSourceSection40;
  unitIndexes: readonly number[];
  includeTable?: boolean;
  headingLabel?: string;
}) {
  return (
    <section className="tcc-brief" data-source-section={section.id}>
      <div className="tcc-brief-head">
        <span className="tcc-brief-label">
          <span aria-hidden="true">◈</span>
          <Rich40 text={headingLabel} />
        </span>
        <span className="tcc-station-tag">
          <Rich40 text={section.title} />
        </span>
      </div>

      {includeTable && section.tableAfter === -1 ? renderSourceTable40(section) : null}

      <div className="tcc-units">
        {unitIndexes.map((idx) => {
          const line = section.units[idx];
          if (line === undefined) return null;
          const unitKey = `${section.id}-unit-${idx}`;
          const pureEn = isPureEnglishUnit40(line);
          const isWrong = line.includes("❌");
          const isRight = line.includes("✅");

          return (
            <div key={unitKey} data-source-unit={unitKey}>
              {pureEn ? (
                <EnLine40 tone={isWrong ? "wrong" : isRight ? "right" : "default"}>
                  {line}
                </EnLine40>
              ) : HEADING_LINES_40.has(line.trim()) ? (
                <h3 className="tcc-unit-heading">
                  <Rich40 text={line} />
                </h3>
              ) : (
                <p className="tcc-unit-ar">
                  <Rich40 text={line} />
                </p>
              )}
              {includeTable && section.tableAfter === idx ? renderSourceTable40(section) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function PracticeRevealBox40({
  section,
  unlocked,
  title = "الإجابات النموذجية للمراجعة الذاتية",
}: {
  section: StudentSourceSection40;
  unlocked: boolean;
  title?: string;
}) {
  if (!unlocked || !section.revealUnits?.length) return null;
  return (
    <section
      className="tcc-reveal-card"
      data-answer-key-for={section.id}
      aria-live="polite"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h4 className="m-0 text-sm font-black text-emerald-950">
          ✓ <Rich40 text={title} />
        </h4>
        <span className="rounded-full bg-emerald-900 px-2.5 py-0.5 text-xs font-extrabold text-white">
          مفتوحة بعد المحاولة
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {section.revealUnits.map((line, idx) => {
          const key = `${section.id}-reveal-${idx}`;
          return isPureEnglishUnit40(line) ? (
            <div key={key} data-source-unit={key}>
              <EnLine40 tone="right">{line}</EnLine40>
            </div>
          ) : (
            <p
              key={key}
              data-source-unit={key}
              className="m-0 text-sm font-bold leading-relaxed text-emerald-950"
            >
              <Rich40 text={line} />
            </p>
          );
        })}
      </div>
    </section>
  );
}

export function LabShell40({
  title,
  status,
  note,
  children,
  labId,
}: {
  title: string;
  status?: string;
  note?: string;
  children: ReactNode;
  labId?: string;
}) {
  return (
    <section className="tcc-lab" data-lab-id={labId}>
      <div className="tcc-lab-bar">
        <h3 className="tcc-lab-title">
          <span aria-hidden="true">⌘</span>
          <Rich40 text={title} />
        </h3>
        {status ? (
          <span className="tcc-lab-status">
            <Rich40 text={status} />
          </span>
        ) : null}
      </div>
      <div className="tcc-lab-body">
        {note ? (
          <p className="tcc-lab-note">
            <Rich40 text={note} />
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function normalizeEnglishAnswer40(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/\bi'm\b/g, "i am")
    .replace(/\byou're\b/g, "you are")
    .replace(/\bwe're\b/g, "we are")
    .replace(/\bthey're\b/g, "they are")
    .replace(/\bhe's\s+going\s+to\b/g, "he is going to")
    .replace(/\bshe's\s+going\s+to\b/g, "she is going to")
    .replace(/\bit's\s+going\s+to\b/g, "it is going to")
    .replace(/\bthat's\s+going\s+to\b/g, "that is going to")
    .replace(/\bi'll\b/g, "i will")
    .replace(/\byou'll\b/g, "you will")
    .replace(/\bhe'll\b/g, "he will")
    .replace(/\bshe'll\b/g, "she will")
    .replace(/\bit'll\b/g, "it will")
    .replace(/\bwe'll\b/g, "we will")
    .replace(/\bthey'll\b/g, "they will")
    .replace(/\bwon't\b/g, "will not")
    .replace(/\baren't\b/g, "are not")
    .replace(/\bisn't\b/g, "is not")
    .replace(/\bdoesn't\b/g, "does not")
    .replace(/\bdon't\b/g, "do not")
    .replace(/\btraveling\b/g, "travelling")
    .replace(/\borganising\b/g, "organizing")
    .replace(/[.!?]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesAcceptedAnswer40(
  input: string,
  accepted: readonly string[]
): boolean {
  const norm = normalizeEnglishAnswer40(input);
  if (!norm) return false;
  return accepted.some((candidate) => normalizeEnglishAnswer40(candidate) === norm);
}
