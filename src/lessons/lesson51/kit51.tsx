import { Fragment, type ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";
import { type Example51, type Slide51, type Table51, type Tone51 } from "./data";

/** English unit: its own LTR isolate with the Latin face. */
export function En51({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" lang="en" className={`l51-en ${className}`}>
      {children}
    </span>
  );
}

/** Arabic copy that may contain English fragments: shared bidi splitter. */
export function Mixed51({ text }: { text: string }) {
  return (
    <span className="l51-mixed">
      <LatinRuns text={text ?? ""} />
    </span>
  );
}

const ARABIC_TEXT = /[\u0600-\u06FF]/;
const LATIN_TEXT = /[A-Za-z]/;

/** "Arabic: English" headings are split so the colon keeps its place. */
export function Title51({ text }: { text: string }) {
  const at = text.indexOf(":");
  if (at === -1) return <Mixed51 text={text} />;
  const head = text.slice(0, at).trimEnd();
  const tail = text.slice(at + 1).trimStart();
  if (!ARABIC_TEXT.test(head) || !LATIN_TEXT.test(tail)) return <Mixed51 text={text} />;
  return (
    <>
      <Mixed51 text={head} />
      <span className="l51-title-sep" aria-hidden="true">
        :
      </span>
      <Mixed51 text={tail} />
    </>
  );
}

export function toneClass(tone: Tone51 | undefined) {
  return `l51-tone--${tone ?? "review"}`;
}

/** A meaning badge: glyph + Arabic label, so colour never works alone. */
export const MODE_META_51: Record<string, { glyph: string; label: string; tone: Tone51 }> = {
  law: { glyph: "◆", label: "حقيقة عامة", tone: "law" },
  habit: { glyph: "↻", label: "عادة متكررة", tone: "habit" },
  negative: { glyph: "✕", label: "نفي", tone: "negative" },
  future: { glyph: "➜", label: "مستقبل محدد", tone: "future" },
  modal: { glyph: "◐", label: "معنى إضافي", tone: "modal" },
  review: { glyph: "•", label: "مراجعة", tone: "review" },
};

export function Mode51({ id, className = "" }: { id: keyof typeof MODE_META_51 | string; className?: string }) {
  const meta = MODE_META_51[id] ?? MODE_META_51.review;
  return (
    <span className={`l51-mode ${toneClass(meta.tone)} ${className}`.trim()}>
      <span className="l51-mode-glyph" aria-hidden="true">
        {meta.glyph}
      </span>
      {meta.label}
    </span>
  );
}

/**
 * The reaction chain: the lesson's signature diagram. A condition card feeds
 * an arrow that lights into a result card — always with the English formula
 * isolated LTR and an Arabic gloss under each half.
 */
export function FlowChain51({
  condition,
  conditionAr,
  result,
  resultAr,
  active = "law",
}: {
  condition: string;
  conditionAr: string;
  result: string;
  resultAr: string;
  active?: Tone51;
}) {
  return (
    <div className={`l51-flow ${toneClass(active)}`} data-flow-chain role="img" aria-label={`سلسلة السبب والنتيجة: ${conditionAr} ثم ${resultAr}`}>
      <div className="l51-flow-card l51-flow-card--if">
        <span className="l51-flow-tag">CONDITION · IF</span>
        <En51 className="l51-flow-en">{condition}</En51>
        <span className="l51-flow-ar">{conditionAr}</span>
      </div>
      <div className="l51-flow-arrow" aria-hidden="true">
        <span className="l51-flow-beam" />
        <span className="l51-flow-head">➜</span>
        <span className="l51-flow-always">ALWAYS</span>
      </div>
      <div className="l51-flow-card l51-flow-card--result">
        <span className="l51-flow-tag">RESULT</span>
        <En51 className="l51-flow-en">{result}</En51>
        <span className="l51-flow-ar">{resultAr}</span>
      </div>
    </div>
  );
}

/**
 * The repetition meter: how fixed the result is — a general law always
 * repeats, a personal habit usually repeats, a specific future event happens
 * once. Shown with words and a bar, never colour alone.
 */
export const REPETITION_STOPS_51 = [
  { id: "law", form: "ZERO · ALWAYS", ar: "نتيجة ثابتة تتكرر دائمًا", band: "100%" },
  { id: "habit", form: "ZERO · USUALLY", ar: "عادة متكررة في الغالب", band: " غالبًا" },
  { id: "future", form: "FIRST · ONCE", ar: "احتمال مستقبلي لمرة محددة", band: "مرة واحدة" },
] as const;

export function RepetitionMeter51({ active }: { active?: string }) {
  return (
    <div className="l51-meter" data-repetition-meter role="img" aria-label="مقياس التكرار: حقيقة ثابتة، عادة متكررة، حدث مستقبلي محدد">
      <div className="l51-meter-track" aria-hidden="true">
        <span className="l51-meter-fill" />
      </div>
      <div className="l51-meter-stops">
        {REPETITION_STOPS_51.map((stop) => (
          <div className={`l51-meter-stop ${toneClass(stop.id as Tone51)} ${active === stop.id ? "is-active" : ""}`} key={stop.id} data-meter-stop={stop.id}>
            <En51 className="l51-meter-form">{stop.form}</En51>
            <span className="l51-meter-ar">{stop.ar}</span>
            <span className="l51-meter-band">{stop.band}</span>
          </div>
        ))}
      </div>
      <p className="l51-meter-note">النتائج الثابتة تتكرر دائمًا، والعادات تتكرر غالبًا، أما الأحداث المستقبلية المحددة فتحدث مرة في وقت محدد.</p>
    </div>
  );
}

export function Formula51({
  rows,
  glosses,
  tone,
}: {
  rows: readonly string[];
  glosses?: readonly string[];
  tone?: Tone51;
}) {
  return (
    <div className={`l51-formula ${toneClass(tone)}`} dir="ltr" lang="en" data-formula>
      {rows.map((row, index) => (
        <Fragment key={`${row}-${index}`}>
          <div className="l51-formula-row">
            {row.split(" + ").map((chunk, i) => (
              <Fragment key={`${chunk}-${i}`}>
                {i > 0 && (
                  <span className="l51-formula-plus" aria-hidden="true">
                    +
                  </span>
                )}
                <span className="l51-formula-chip">{chunk}</span>
              </Fragment>
            ))}
          </div>
          {glosses?.[index] && (
            <p className="l51-formula-gloss" dir="rtl" lang="ar">
              {glosses[index]}
            </p>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export function Table51View({ table }: { table: Table51 }) {
  return (
    <div className="l51-table-wrap" data-table>
      <table className="l51-table">
        <thead>
          <tr>
            {table.head.map((cell, index) => (
              <th key={index} scope="col">
                <Mixed51 text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">
                <Mixed51 text={row.label} />
              </th>
              {row.cells.map((cell, index) => (
                <td key={index}>
                  {LATIN_TEXT.test(cell) && !ARABIC_TEXT.test(cell) ? (
                    <En51>{cell}</En51>
                  ) : (
                    <Mixed51 text={cell} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.note && <p className="l51-table-note">{table.note}</p>}
    </div>
  );
}

export function Points51({ points }: { points: readonly string[] }) {
  return (
    <ul className="l51-points">
      {points.map((point, index) => (
        <li key={point}>
          <span className="l51-point-no" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Mixed51 text={point} />
        </li>
      ))}
    </ul>
  );
}

export function Examples51({ items, variant = "grid" }: { items: readonly Example51[]; variant?: "grid" | "comparison" }) {
  return (
    <div className={`l51-examples l51-examples--${variant}`}>
      {items.map((example) => (
        <article className={`l51-example ${toneClass(example.tone)}`} key={example.en}>
          <div className="l51-example-top">
            {example.tag && <Tag51>{example.tag}</Tag51>}
            {example.tone && <Mode51 id={example.tone} />}
          </div>
          <p className="l51-example-en" dir="ltr" lang="en">
            {example.en}
          </p>
          <p className="l51-example-ar" dir="rtl" lang="ar">
            <Mixed51 text={example.ar} />
          </p>
        </article>
      ))}
    </div>
  );
}

export function Tag51({ children }: { children: ReactNode }) {
  return <span className="l51-tag">{children}</span>;
}

export function Note51({ text, icon = "📌" }: { text: string; icon?: string }) {
  return (
    <p className="l51-note">
      <span className="l51-note-icon" aria-hidden="true">
        {icon}
      </span>
      <Mixed51 text={text} />
    </p>
  );
}

function Tip51({ text }: { text: string }) {
  return (
    <p className="l51-tip">
      <span className="l51-tip-icon" aria-hidden="true">
        💡
      </span>
      <Mixed51 text={text} />
    </p>
  );
}

/* ============================================================
   إطار الشريحة
   ============================================================ */

export function SlideFrame51({
  slide,
  index,
  station,
  children,
}: {
  slide: Slide51;
  index: number;
  station: string;
  children: ReactNode;
}) {
  return (
    <article className={`l51-sheet ${toneClass(slide.tone)}`} data-step-id={slide.id} data-tone={slide.tone ?? "review"}>
      <header className="l51-slide-head">
        <div className="l51-head-row">
          <span className="l51-step-badge" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="l51-station-pill">
            <span className="l51-station-dot" aria-hidden="true" />
            {station}
          </span>
          <span className="l51-lab-code">LAB 51.{String(index + 1).padStart(2, "0")}</span>
          {slide.mascot && (
            <span className="l51-emblem anim-float" aria-hidden="true">
              {slide.mascot}
            </span>
          )}
        </div>
        <h1 id="l51-title" tabIndex={-1}>
          <Title51 text={slide.title} />
        </h1>
        {slide.lead && (
          <p className="l51-lead">
            <Mixed51 text={slide.lead} />
          </p>
        )}
      </header>
      <div className="l51-slide-content">{children}</div>
      {slide.tip && <Tip51 text={slide.tip} />}
    </article>
  );
}
