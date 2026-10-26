import type { ReactNode } from "react";
import { En, PlatformTag, Rich } from "../../shared/lessonKit";
import type { SourceSection39 } from "./ledger39";

// ============================================================
// Lesson 39 — مكوّنات «مرصد الزمن المستقبلي»
//
// طبقة عرض محلية فقط: لا تعدّل أي نمط مشترك في التطبيق. كل الأصناف تبدأ
// بـ `obs-` وتُعرَّف في lesson39.css، فيبقى أثر الدرس محصورًا في نفسه.
// ============================================================

export const FOCUS_39 =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fe3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b18]";

const ARABIC_RANGE = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

/** سطر إنجليزي صِرف لا يحمل أي حرف عربي — يُعرض LTR معزولًا. */
export function isPureEnglish39(text: string) {
  return /[A-Za-z]/.test(text) && !ARABIC_RANGE.test(text);
}

export function English39({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <En className={className}>{children}</En>;
}

/**
 * نص خيار قد يجمع جملتين (تعريف لكل زمن) — كل جملة في سطر مستقل.
 * الفصل يمنع بقاء نقطة نهاية الجملة الأولى ملتصقة بالعبارة الإنجليزية
 * التالية، وهو ما يجعل ترتيب «English: شرح» مقروءًا في سياق RTL.
 */
export function ChoiceText39({ text }: { text: string }) {
  const parts = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
  if (parts.length === 1) return <Rich text={text} />;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i} className="block">
          <Rich text={part} />
        </span>
      ))}
    </>
  );
}

/** صفحة صيغة إنجليزية (LTR دائمًا، ولا تنقلب في سياق عربي). */
export function Formula39({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "gold" | "violet" }) {
  return (
    <span dir="ltr" className={`obs-formula obs-formula--${tone}`}>
      {children}
    </span>
  );
}

export function Card39({
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
    <section className={`obs-panel ${className}`}>
      {eyebrow ? <p className="obs-eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="obs-panel-title">{title}</h2> : null}
      <div className="obs-panel-body">{children}</div>
    </section>
  );
}

/** إطار أداة المرصد: الأداة تُعرَّف بمعرّف يُستخدم في التدقيق. */
export function Instrument39({
  id,
  label,
  title,
  tone = "cyan",
  note,
  children,
}: {
  id: string;
  label: string;
  title: ReactNode;
  tone?: "cyan" | "gold" | "violet" | "teal" | "rose";
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={`obs-instrument obs-tone--${tone}`} data-instrument={id}>
      <header className="obs-instrument-head">
        <span className="obs-instrument-dot" aria-hidden />
        <div className="min-w-0">
          <p dir="ltr" className="obs-instrument-en font-en">
            {label}
          </p>
          <h3 className="obs-instrument-title">
            <Rich text={typeof title === "string" ? title : ""} />
            {typeof title !== "string" ? title : null}
          </h3>
        </div>
        <span dir="ltr" className="obs-instrument-id font-en">
          {id}
        </span>
      </header>
      {note ? <div className="obs-instrument-note">{note}</div> : null}
      <div className="obs-instrument-body">{children}</div>
    </section>
  );
}

export function PlatformNote39({ children }: { children: ReactNode }) {
  return (
    <aside className="obs-note">
      <div className="mb-1.5">
        <PlatformTag text="إضافة تعليمية من المنصة" />
      </div>
      <div>{children}</div>
    </aside>
  );
}

export function ActionButton39({
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
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${FOCUS_39} obs-btn obs-btn--${variant} ${className}`}
    >
      {children}
    </button>
  );
}

/** تغذية راجعة موحّدة: صحيح / راجع / معلومة — مع شرح نصي دائم. */
export function Feedback39({
  state,
  title,
  children,
}: {
  state: "ok" | "review" | "info";
  title: string;
  children: ReactNode;
}) {
  return (
    <div role="status" aria-live="polite" className={`obs-feedback obs-feedback--${state}`}>
      <strong className="block font-black">{title}</strong>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

/** تمييز صيغ المستقبل داخل نص القراءة (بصري فقط — النص لا يُخفى أبدًا). */
export function highlightFutureForms39(text: string) {
  const pattern =
    /\bwill have been\s+\w+ing\b|\bwon't have been\s+\w+ing\b|\bwill have\s+\w+\b|\bwon't have\s+\w+\b|\bwill be\s+\w+ing\b|\b[A-Za-z]+'ll have been\s+\w+ing\b|\b[A-Za-z]+'ll have\s+\w+\b|\bwill\s+\w+\b/gi;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    nodes.push(
      <mark key={`${start}-${match[0]}`} className="obs-mark">
        {match[0]}
      </mark>,
    );
    cursor = start + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes.length ? nodes : text;
}

const MARKER_39 =
  /^(الصيغة:|النفي:|السؤال:|الإجابة القصيرة:|السؤال عن المدة:|القاعدة|القاعدة:|القاعدة المتقدمة|الاختصار:|إذن:|الترجمة|التحليل|الحلول|الحلول المفصلة|الحلول التفصيلية|أسئلة الفهم|نموذج إرشادي قصير|أهم الاستخدامات|المقارنة الذهبية|الجدول الذهبي|أمثلة مقارنة|الخط الزمني|انتبه|السؤال الذهبي|الفرق|التركيب:|السبب:|المثال الأول|المثال الثاني|المثال الثالث|مثال آخر:|لدينا حدثان:|لاحظ العناصر الثلاثة:|اقرأ الحوار التالي:|اقرأ النص التالي بعناية\.|يجب أن تتضمن:|المحطة القادمة|التركيز النموذجي:|ملاحظة: نفترض في المثال أن المقارنة تتم بين التاريخ نفسه من الشهرين\.)$/;

/**
 * سطر مصدر حرفي: الإنجليزية الصِرفة تُعزل LTR، والمختلط يمرّ عبر LatinRuns،
 * والحلول تُوسَم كلون «بعد المحاولة».
 */
export function SourceLine39({
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
  const pureEnglish = isPureEnglish39(text);
  const marker = MARKER_39.test(text);
  const isCorrect = text.includes("✅");
  const isWrong = text.includes("❌");
  const tone = pureEnglish
    ? "obs-src obs-src--en"
    : isCorrect
      ? "obs-src obs-src--ok"
      : isWrong
        ? "obs-src obs-src--bad"
        : marker
          ? "obs-src obs-src--marker"
          : kind === "reveal"
            ? "obs-src obs-src--reveal"
            : "obs-src";
  return (
    <div
      id={`source-${sectionId}-${kind}-${index}`}
      data-source-unit={`${sectionId}-${kind}-${index}`}
      dir={pureEnglish ? "ltr" : "auto"}
      className={`${tone} ${className}`}
    >
      {pureEnglish ? (
        <span className="block">{highlightFuture ? highlightFutureForms39(text) : text}</span>
      ) : (
        <Rich text={text} />
      )}
    </div>
  );
}

/** جدول مُعاد بناؤه من المصدر (بلا إضافة صفوف). */
export function Table39({
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
    <div className="obs-table-wrap">
      <table dir="rtl" aria-label={label} className="obs-table" data-source-table={idPrefix}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={`${idPrefix}-head-${index}`} scope="col">
                <Rich text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${idPrefix}-row-${rowIndex}`} data-source-row={rowIndex}>
              {row.map((cell, cellIndex) => {
                const pure = isPureEnglish39(cell);
                const value = pure ? (
                  <span dir="ltr" className="font-en inline-block text-left">
                    {cell}
                  </span>
                ) : (
                  <Rich text={cell} />
                );
                return cellIndex === 0 ? (
                  <th key={cellIndex} scope="row">
                    {value}
                  </th>
                ) : (
                  <td key={cellIndex}>{value}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** بطاقة مصدر كاملة (تُستخدم في المعلم/الحلول فقط). */
export function SourceCard39({
  section,
  showReveal = false,
}: {
  section: SourceSection39;
  showReveal?: boolean;
}) {
  return (
    <section className="obs-panel" data-source-section={section.id}>
      <header className="obs-panel-head">
        <h2 className="obs-panel-title">
          <Rich text={section.title} />
        </h2>
        <span dir="ltr" className="obs-pill font-en">
          {section.num == null ? "LESSON 39" : `§${section.num}`}
        </span>
      </header>
      <div className="space-y-1.5">
        {section.tableRows && section.tableHeaders && (section.tableAfter ?? 99) === -1 ? (
          <Table39
            headers={section.tableHeaders}
            rows={section.tableRows}
            label={section.tableLabel ?? "جدول"}
            idPrefix={section.id}
          />
        ) : null}
        {section.units.map((text, index) => (
          <SourceLine39 key={index} sectionId={section.id} index={index} text={text} />
        ))}
        {section.tableRows && section.tableHeaders && (section.tableAfter ?? 99) !== -1 ? (
          <Table39
            headers={section.tableHeaders}
            rows={section.tableRows}
            label={section.tableLabel ?? "جدول"}
            idPrefix={section.id}
          />
        ) : null}
        {showReveal && section.revealUnits?.length ? (
          <div className="obs-reveal">
            <p className="obs-reveal-title">مفتاح المصدر — بعد المحاولة</p>
            {section.revealUnits.map((text, index) => (
              <SourceLine39 key={index} sectionId={section.id} index={index} text={text} kind="reveal" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** لوحة كشف حلول المصدر بعد المحاولة. */
export function RevealPanel39({
  section,
  indexes,
  title = "مفتاح المصدر — بعد المحاولة",
  tone = "ok",
}: {
  section: SourceSection39;
  indexes: number[];
  title?: string;
  tone?: "ok" | "info";
}) {
  return (
    <div className={`obs-reveal obs-reveal--${tone}`} data-answer-key-for={section.id}>
      <p className="obs-reveal-title">{title}</p>
      {indexes.map((index) => (
        <SourceLine39
          key={index}
          sectionId={section.id}
          index={index}
          text={section.revealUnits?.[index] ?? ""}
          kind="reveal"
        />
      ))}
    </div>
  );
}
