import { Fragment, type ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";
import type { Example49, Slide49, Table49, Tone49 } from "./data";

/** English unit: its own LTR isolate with the Latin face. */
export function En49({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" lang="en" className={`l49-en ${className}`}>
      {children}
    </span>
  );
}

/** Arabic copy that may contain English fragments: shared bidi splitter. */
export function Mixed49({ text }: { text: string }) {
  return (
    <span className="l49-mixed">
      <LatinRuns text={text ?? ""} />
    </span>
  );
}

const ARABIC_TEXT = /[\u0600-\u06FF]/;
const LATIN_TEXT = /[A-Za-z]/;

/** "Arabic: English" headings are split so the colon keeps its place. */
export function Title49({ text }: { text: string }) {
  const at = text.indexOf(":");
  if (at === -1) return <Mixed49 text={text} />;
  const head = text.slice(0, at).trimEnd();
  const tail = text.slice(at + 1).trimStart();
  if (!ARABIC_TEXT.test(head) || !LATIN_TEXT.test(tail)) return <Mixed49 text={text} />;
  return (
    <>
      <Mixed49 text={head} />
      <span className="l49-title-sep" aria-hidden="true">
        :
      </span>
      <Mixed49 text={tail} />
    </>
  );
}

export function toneClass(tone: Tone49 | undefined) {
  return `l49-tone--${tone ?? "review"}`;
}

/** A meaning badge: glyph + Arabic label, so colour never works alone. */
export const MODE_META_49: Record<string, { glyph: string; label: string; tone: Tone49 }> = {
  deduction: { glyph: "◆", label: "استنتاج قوي", tone: "deduction" },
  possibility: { glyph: "◌", label: "احتمال", tone: "possibility" },
  regret: { glyph: "↩", label: "ندم / انتقاد", tone: "regret" },
  opportunity: { glyph: "⤫", label: "فرصة ضائعة", tone: "opportunity" },
  unnecessary: { glyph: "⌁", label: "عدم ضرورة", tone: "unnecessary" },
  hypothetical: { glyph: "⇢", label: "نتيجة افتراضية", tone: "hypothetical" },
  impossible: { glyph: "✕", label: "غير ممكن", tone: "impossible" },
  review: { glyph: "•", label: "مراجعة", tone: "review" },
};

export function Mode49({ id, className = "" }: { id: keyof typeof MODE_META_49 | string; className?: string }) {
  const meta = MODE_META_49[id] ?? MODE_META_49.review;
  return (
    <span className={`l49-mode ${toneClass(meta.tone)} ${className}`.trim()}>
      <span className="l49-mode-glyph" aria-hidden="true">
        {meta.glyph}
      </span>
      {meta.label}
    </span>
  );
}

export function FileCode49({ code, label }: { code: string; label?: string }) {
  return (
    <span className="l49-file-code">
      {code}
      {label ? ` · ${label}` : ""}
    </span>
  );
}

/* ============================================================
   إطار الشريحة
   ============================================================ */

export function SlideFrame49({
  slide,
  index,
  station,
  children,
}: {
  slide: Slide49;
  index: number;
  station: string;
  children: ReactNode;
}) {
  return (
    <article className={`l49-sheet ${toneClass(slide.tone)}`} data-step-id={slide.id} data-tone={slide.tone ?? "review"}>
      <span className="l49-corner l49-corner--tl" aria-hidden="true" />
      <span className="l49-corner l49-corner--br" aria-hidden="true" />
      <header className="l49-slide-head">
        <div className="l49-head-row">
          <span className="l49-step-badge" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="l49-station-pill">
            <span className="l49-station-dot" aria-hidden="true" />
            {station}
          </span>
          <FileCode49 code={`FILE 49.${String(index + 1).padStart(2, "0")}`} />
          {slide.mascot && (
            <span className="l49-emblem anim-drift" aria-hidden="true">
              {slide.mascot}
            </span>
          )}
        </div>
        <h1 id="l49-title" tabIndex={-1}>
          <Title49 text={slide.title} />
        </h1>
        {slide.lead && (
          <p className="l49-lead">
            <Mixed49 text={slide.lead} />
          </p>
        )}
      </header>
      <div className="l49-slide-content">{children}</div>
      {slide.tip && <Tip49 text={slide.tip} />}
    </article>
  );
}

/* ============================================================
   الصيغة
   ============================================================ */

const ACCENT_CHIP = /must|might|may|could|should|ought|would|needn't|have|v3/i;

function VerdictText({ text }: { text: string }) {
  const parts = text.split(/\s*\/\s*/).filter(Boolean);
  return (
    <div className="l49-formula-verdicts">
      {parts.map((part, i) => {
        const ok = part.includes("✓");
        const bad = part.includes("✗");
        const clean = part.replace(/[✓✗]/g, "").trim();
        return (
          <span key={i} className={`l49-verdict-line ${ok ? "is-ok" : bad ? "is-bad" : ""}`}>
            <span className="l49-verdict-mark" aria-hidden="true">
              {ok ? "✓" : bad ? "✕" : "•"}
            </span>
            <En49>{clean}</En49>
          </span>
        );
      })}
    </div>
  );
}

function Row49({ row }: { row: string }) {
  if (row.includes("✓") || row.includes("✗")) return <VerdictText text={row} />;
  if (row.includes(" + ")) {
    const chunks = row.split(" + ");
    return (
      <div className="l49-formula-row" dir="ltr" lang="en">
        {chunks.map((chunk, i) => (
          <Fragment key={`${chunk}-${i}`}>
            {i > 0 && (
              <span className="l49-formula-plus" aria-hidden="true">
                +
              </span>
            )}
            <span className={`l49-formula-chip ${ACCENT_CHIP.test(chunk) ? "is-accent" : ""}`}>{chunk}</span>
          </Fragment>
        ))}
      </div>
    );
  }
  const segments = row.split(/\s+(→|·)\s+/);
  return (
    <div className="l49-formula-row l49-formula-row--plain" dir="ltr" lang="en">
      {segments.map((segment, i) =>
        i % 2 === 1 ? (
          <span key={i} className="l49-formula-arrow" aria-hidden="true">
            {segment}
          </span>
        ) : (
          <span key={i} className="l49-formula-slice">
            {segment}
          </span>
        ),
      )}
    </div>
  );
}

export function Formula49({ rows, glosses, tone }: { rows: readonly string[]; glosses?: readonly string[]; tone?: Tone49 }) {
  return (
    <section className={`l49-formula ${toneClass(tone)}`} aria-label="صيغة القاعدة">
      <span className="l49-formula-label">
        <span aria-hidden="true">ƒ</span> الصيغة
      </span>
      <div className="l49-formula-body">
        {rows.map((row, i) => (
          <div className="l49-formula-line" key={`${row}-${i}`}>
            <Row49 row={row} />
            {glosses?.[i] ? (
              <span className="l49-formula-gloss" dir="rtl">
                {glosses[i]}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   الأمثلة
   ============================================================ */

function ExampleEn49({ text }: { text: string }) {
  if (!text.includes("✓") && !text.includes("✗")) {
    return (
      <p className="l49-example-en" dir="ltr" lang="en">
        {text}
      </p>
    );
  }
  return (
    <div className="l49-example-verdicts">
      {text
        .split(/\s*\/\s*/)
        .filter(Boolean)
        .map((part, i) => {
          const ok = part.includes("✓");
          const bad = part.includes("✗");
          return (
            <div key={i} className={`l49-example-verdict-line ${ok ? "is-ok" : bad ? "is-bad" : ""}`}>
              <span className="l49-verdict-mark" aria-hidden="true">
                {ok ? "✓" : bad ? "✕" : "•"}
              </span>
              <En49>{part.replace(/[✓✗]/g, "").trim()}</En49>
            </div>
          );
        })}
    </div>
  );
}

export function Examples49({
  items,
  variant = "grid",
}: {
  items: readonly Example49[];
  variant?: "grid" | "list" | "comparison";
}) {
  return (
    <div className={`l49-examples l49-examples--${variant}`}>
      {items.map((item, i) => (
        <article className={`l49-example${item.tone ? ` ${toneClass(item.tone)}` : ""}`} key={`${item.en}-${i}`}>
          {item.tag && (
            <span className="l49-example-tag">
              <En49>{item.tag}</En49>
            </span>
          )}
          <ExampleEn49 text={item.en} />
          <p className="l49-example-ar" dir="rtl" lang="ar">
            <Mixed49 text={item.ar} />
          </p>
        </article>
      ))}
    </div>
  );
}

/* ============================================================
   الجدول
   ============================================================ */

export function Table49View({ table }: { table: Table49 }) {
  return (
    <div className="l49-table-wrap">
      <table className="l49-table">
        <thead>
          <tr>
            {table.head.map((head, i) => (
              <th scope="col" key={head || `h-${i}`}>
                {head ? <En49>{head}</En49> : <span className="l49-table-corner" aria-hidden="true">•</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={`${row.label}-${r}`}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, c) => (
                <td key={`${cell}-${c}`}>{/[A-Za-z]{2,}/.test(cell) ? <Mixed49 text={cell} /> : <Mixed49 text={cell} />}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.note && (
        <p className="l49-table-note">
          <Mixed49 text={table.note} />
        </p>
      )}
    </div>
  );
}

/* ============================================================
   ملاحظة ونقاط وقاعدة
   ============================================================ */

export function Note49({ text, icon = "💡" }: { text: string; icon?: string }) {
  // One sentence per block: two adjacent "English = Arabic" pairs in one RTL
  // paragraph can be reordered as a whole, so each sentence keeps its own line.
  const lines = text.split(TIP_SENTENCE).filter((line) => line.trim());
  return (
    <aside className="l49-note">
      <span className="l49-note-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        {lines.map((line, index) => (
          <p className="l49-note-line block" key={`${index}-${line.slice(0, 12)}`}>
            <Mixed49 text={line} />
          </p>
        ))}
      </div>
    </aside>
  );
}

const TIP_SENTENCE = /(?<=[.!?؟])\s+(?=[A-Z«"“\u0600-\u06FF])/;

export function Tip49({ text }: { text: string }) {
  // One sentence per line: two "English = Arabic" pairs in a single flow can be
  // reordered by the bidi algorithm, so each sentence keeps its own line.
  const lines = text.split(TIP_SENTENCE).filter((line) => line.trim());
  return (
    <div className="l49-tip">
      <span className="l49-tip-icon" aria-hidden="true">
        🦉
      </span>
      <span className="l49-tip-text">
        {lines.map((line, index) => (
          <div className="l49-tip-line" key={`${index}-${line.slice(0, 12)}`}>
            <Mixed49 text={line} />
          </div>
        ))}
      </span>
    </div>
  );
}

export function Points49({ points }: { points: readonly string[] }) {
  return (
    <ul className="l49-points">
      {points.map((point) => (
        <li key={point}>
          <span>
            <Mixed49 text={point} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Tag49({ children }: { children: ReactNode }) {
  return <span className="l49-tag">{children}</span>;
}
