import { Fragment, type ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";
import { CERTAINTY_LEVELS_50, type Example50, type Slide50, type Table50, type Tone50 } from "./data";

/** English unit: its own LTR isolate with the Latin face. */
export function En50({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" lang="en" className={`l50-en ${className}`}>
      {children}
    </span>
  );
}

/** Arabic copy that may contain English fragments: shared bidi splitter. */
export function Mixed50({ text }: { text: string }) {
  return (
    <span className="l50-mixed">
      <LatinRuns text={text ?? ""} />
    </span>
  );
}

const ARABIC_TEXT = /[\u0600-\u06FF]/;
const LATIN_TEXT = /[A-Za-z]/;

/** "Arabic: English" headings are split so the colon keeps its place. */
export function Title50({ text }: { text: string }) {
  const at = text.indexOf(":");
  if (at === -1) return <Mixed50 text={text} />;
  const head = text.slice(0, at).trimEnd();
  const tail = text.slice(at + 1).trimStart();
  if (!ARABIC_TEXT.test(head) || !LATIN_TEXT.test(tail)) return <Mixed50 text={text} />;
  return (
    <>
      <Mixed50 text={head} />
      <span className="l50-title-sep" aria-hidden="true">
        :
      </span>
      <Mixed50 text={tail} />
    </>
  );
}

export function toneClass(tone: Tone50 | undefined) {
  return `l50-tone--${tone ?? "review"}`;
}

/** A meaning badge: glyph + Arabic label, so colour never works alone. */
export const MODE_META_50: Record<string, { glyph: string; label: string; tone: Tone50 }> = {
  strong: { glyph: "●", label: "استنتاج قوي", tone: "strong" },
  possible: { glyph: "◐", label: "احتمال", tone: "possible" },
  negative: { glyph: "✕", label: "نفي قوي", tone: "negative" },
  past: { glyph: "↩", label: "عن الماضي", tone: "past" },
  ongoing: { glyph: "≈", label: "نشاط مستمر", tone: "ongoing" },
  review: { glyph: "•", label: "مراجعة", tone: "review" },
};

export function Mode50({ id, className = "" }: { id: keyof typeof MODE_META_50 | string; className?: string }) {
  const meta = MODE_META_50[id] ?? MODE_META_50.review;
  return (
    <span className={`l50-mode ${toneClass(meta.tone)} ${className}`.trim()}>
      <span className="l50-mode-glyph" aria-hidden="true">
        {meta.glyph}
      </span>
      {meta.label}
    </span>
  );
}

/**
 * The certainty gauge: the lesson's signature instrument. Three stops —
 * strong deduction, open possibility, strong negative deduction — always
 * shown with glyph, word and Arabic gloss so colour never works alone.
 */
export function Gauge50({ active }: { active?: string }) {
  return (
    <div className="l50-gauge" data-gauge role="img" aria-label="مقياس الثقة: استنتاج قوي، احتمال، نفي قوي">
      <div className="l50-gauge-track" aria-hidden="true">
        <span className="l50-gauge-seg l50-tone--negative" />
        <span className="l50-gauge-seg l50-tone--possible" />
        <span className="l50-gauge-seg l50-tone--strong" />
      </div>
      <div className="l50-gauge-stops">
        {CERTAINTY_LEVELS_50.map((level) => (
          <div
            className={`l50-gauge-stop ${toneClass(level.tone)} ${active === level.id ? "is-active" : ""}`}
            key={level.id}
            data-gauge-stop={level.id}
          >
            <span className="l50-gauge-glyph" aria-hidden="true">
              {level.glyph}
            </span>
            <En50 className="l50-gauge-form">{level.form}</En50>
            <span className="l50-gauge-ar">{level.ar}</span>
            <span className="l50-gauge-band">{level.gauge}</span>
          </div>
        ))}
      </div>
      <p className="l50-gauge-note">النسب التقريبية للإرشاد فقط — الكلمات تُظهر ثقتك، ولا تقيس احتمالًا رياضيًا ثابتًا.</p>
    </div>
  );
}

export function LensCode50({ code }: { code: string }) {
  return <span className="l50-lens-code">{code}</span>;
}

/* ============================================================
   إطار الشريحة
   ============================================================ */

export function SlideFrame50({
  slide,
  index,
  station,
  children,
}: {
  slide: Slide50;
  index: number;
  station: string;
  children: ReactNode;
}) {
  return (
    <article className={`l50-sheet ${toneClass(slide.tone)}`} data-step-id={slide.id} data-tone={slide.tone ?? "review"}>
      <header className="l50-slide-head">
        <div className="l50-head-row">
          <span className="l50-step-badge" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="l50-station-pill">
            <span className="l50-station-dot" aria-hidden="true" />
            {station}
          </span>
          <LensCode50 code={`LENS 50.${String(index + 1).padStart(2, "0")}`} />
          {slide.mascot && (
            <span className="l50-emblem anim-float" aria-hidden="true">
              {slide.mascot}
            </span>
          )}
        </div>
        <h1 id="l50-title" tabIndex={-1}>
          <Title50 text={slide.title} />
        </h1>
        {slide.lead && (
          <p className="l50-lead">
            <Mixed50 text={slide.lead} />
          </p>
        )}
      </header>
      <div className="l50-slide-content">{children}</div>
      {slide.tip && <Tip50 text={slide.tip} />}
    </article>
  );
}

/* ============================================================
   الصيغة
   ============================================================ */

const ACCENT_CHIP = /must|might|may|could|can't|couldn't|have|been|v-ing|v3|v1/i;

function VerdictText({ text }: { text: string }) {
  const parts = text.split(/\s*·\s*/).filter(Boolean);
  return (
    <div className="l50-formula-verdicts">
      {parts.map((part, i) => {
        const ok = part.includes("✓");
        const bad = part.includes("✗");
        const clean = part.replace(/[✓✗]/g, "").trim();
        const enPart = clean.split(/\s+(?=[\u0600-\u06FF])/)[0] ?? clean;
        const arPart = clean.slice(enPart.length).trim();
        return (
          <span key={i} className={`l50-verdict-line ${ok ? "is-ok" : bad ? "is-bad" : ""}`}>
            <span className="l50-verdict-mark" aria-hidden="true">
              {ok ? "✓" : bad ? "✕" : "•"}
            </span>
            <En50>{enPart}</En50>
            {arPart ? <span>{arPart}</span> : null}
          </span>
        );
      })}
    </div>
  );
}

function Row50({ row }: { row: string }) {
  if (row.includes("✓") || row.includes("✗")) return <VerdictText text={row} />;
  if (row.includes(" + ")) {
    const chunks = row.split(" + ");
    return (
      <div className="l50-formula-row" dir="ltr" lang="en">
        {chunks.map((chunk, i) => (
          <Fragment key={`${chunk}-${i}`}>
            {i > 0 && (
              <span className="l50-formula-plus" aria-hidden="true">
                +
              </span>
            )}
            <span className={`l50-formula-chip ${ACCENT_CHIP.test(chunk) ? "is-accent" : ""}`}>{chunk}</span>
          </Fragment>
        ))}
      </div>
    );
  }
  return (
    <div className="l50-formula-row l50-formula-row--plain" dir="ltr" lang="en">
      <span className="l50-formula-slice">{row}</span>
    </div>
  );
}

export function Formula50({ rows, glosses, tone }: { rows: readonly string[]; glosses?: readonly string[]; tone?: Tone50 }) {
  return (
    <section className={`l50-formula ${toneClass(tone)}`} aria-label="صيغة القاعدة">
      <span className="l50-formula-label">
        <span aria-hidden="true">ƒ</span> الصيغة
      </span>
      <div className="l50-formula-body">
        {rows.map((row, i) => (
          <div className="l50-formula-line" key={`${row}-${i}`}>
            <Row50 row={row} />
            {glosses?.[i] ? (
              <span className="l50-formula-gloss" dir="rtl">
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

function ExampleEn50({ text }: { text: string }) {
  if (!text.includes("✓") && !text.includes("✗")) {
    return (
      <p className="l50-example-en" dir="ltr" lang="en">
        {text}
      </p>
    );
  }
  return (
    <div className="l50-example-verdicts">
      {text
        .split(/\s*\/\s*/)
        .filter(Boolean)
        .map((part, i) => {
          const ok = part.includes("✓");
          const bad = part.includes("✗");
          return (
            <div key={i} className={`l50-example-verdict-line ${ok ? "is-ok" : bad ? "is-bad" : ""}`}>
              <span className="l50-verdict-mark" aria-hidden="true">
                {ok ? "✓" : bad ? "✕" : "•"}
              </span>
              <En50>{part.replace(/[✓✗]/g, "").trim()}</En50>
            </div>
          );
        })}
    </div>
  );
}

export function Examples50({
  items,
  variant = "grid",
}: {
  items: readonly Example50[];
  variant?: "grid" | "list" | "comparison";
}) {
  return (
    <div className={`l50-examples l50-examples--${variant}`}>
      {items.map((item, i) => (
        <article className={`l50-example${item.tone ? ` ${toneClass(item.tone)}` : ""}`} key={`${item.en}-${i}`}>
          {item.tag && (
            <span className="l50-example-tag">
              <En50>{item.tag}</En50>
            </span>
          )}
          <ExampleEn50 text={item.en} />
          <p className="l50-example-ar" dir="rtl" lang="ar">
            <Mixed50 text={item.ar} />
          </p>
        </article>
      ))}
    </div>
  );
}

/* ============================================================
   الجدول
   ============================================================ */

export function Table50View({ table }: { table: Table50 }) {
  return (
    <div className="l50-table-wrap">
      <table className="l50-table">
        <thead>
          <tr>
            {table.head.map((head, i) => (
              <th scope="col" key={head || `h-${i}`}>
                {head ? <Mixed50 text={head} /> : <span className="l50-table-corner" aria-hidden="true">•</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={`${row.label}-${r}`}>
              <th scope="row"><Mixed50 text={row.label} /></th>
              {row.cells.map((cell, c) => (
                <td key={`${cell}-${c}`}><Mixed50 text={cell} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.note && (
        <p className="l50-table-note">
          <Mixed50 text={table.note} />
        </p>
      )}
    </div>
  );
}

/* ============================================================
   ملاحظة ونقاط
   ============================================================ */

const TIP_SENTENCE = /(?<=[.!?؟])\s+(?=[A-Z«"“\u0600-\u06FF])/;

export function Note50({ text, icon = "💡" }: { text: string; icon?: string }) {
  // One sentence per block: two adjacent "English = Arabic" pairs in one RTL
  // paragraph can be reordered as a whole, so each sentence keeps its own line.
  const lines = text.split(TIP_SENTENCE).filter((line) => line.trim());
  return (
    <aside className="l50-note">
      <span className="l50-note-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        {lines.map((line, index) => (
          <p className="l50-note-line block" key={`${index}-${line.slice(0, 12)}`}>
            <Mixed50 text={line} />
          </p>
        ))}
      </div>
    </aside>
  );
}

export function Tip50({ text }: { text: string }) {
  const lines = text.split(TIP_SENTENCE).filter((line) => line.trim());
  return (
    <div className="l50-tip">
      <span className="l50-tip-icon" aria-hidden="true">
        🔎
      </span>
      <span className="l50-tip-text">
        {lines.map((line, index) => (
          <div className="l50-tip-line" key={`${index}-${line.slice(0, 12)}`}>
            <Mixed50 text={line} />
          </div>
        ))}
      </span>
    </div>
  );
}

export function Points50({ points }: { points: readonly string[] }) {
  return (
    <ul className="l50-points">
      {points.map((point) => (
        <li key={point}>
          <span>
            <Mixed50 text={point} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Tag50({ children }: { children: ReactNode }) {
  return <span className="l50-tag">{children}</span>;
}
