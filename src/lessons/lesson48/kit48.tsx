import { Fragment, type ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";
import type { Example48, Slide48, Table48, Tone48 } from "./data";

/** English unit: its own LTR isolate with the Latin face. */
export function En48({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" lang="en" className={`l48-en ${className}`}>
      {children}
    </span>
  );
}

/** Arabic copy that may contain English fragments: shared bidi splitter. */
export function Mixed48({ text }: { text: string }) {
  return (
    <span className="l48-mixed">
      <LatinRuns text={text} />
    </span>
  );
}

const ARABIC_TEXT = /[\u0600-\u06FF]/;
const LATIN_TEXT = /[A-Za-z]/;

/**
 * "Arabic: English" headings are split so the colon keeps its place instead of
 * drifting to the end of the Latin run inside the RTL paragraph.
 */
export function Title48({ text }: { text: string }) {
  const at = text.indexOf(":");
  if (at === -1) return <Mixed48 text={text} />;
  const head = text.slice(0, at).trimEnd();
  const tail = text.slice(at + 1).trimStart();
  if (!ARABIC_TEXT.test(head) || !LATIN_TEXT.test(tail)) return <Mixed48 text={text} />;
  return (
    <>
      <Mixed48 text={head} />
      <span className="l48-title-sep" aria-hidden="true">
        :
      </span>
      <Mixed48 text={tail} />
    </>
  );
}

export function toneClass(tone: Tone48 | undefined) {
  return `l48-tone--${tone ?? "review"}`;
}

/** شريط إشارة صغير يعبّر عن «درجة» الوظيفة بدل نسب مئوية مخترعة. */
export function SignalBars({ level = 2, tone }: { level?: 1 | 2 | 3; tone?: Tone48 }) {
  return (
    <span className={`l48-signal ${toneClass(tone)}`} aria-hidden="true">
      {[1, 2, 3].map((bar) => (
        <span key={bar} className={bar <= level ? "is-on" : ""} />
      ))}
    </span>
  );
}

/* ============================================================
   إطار الشريحة
   ============================================================ */

export function SlideFrame48({
  slide,
  index,
  station,
  children,
}: {
  slide: Slide48;
  index: number;
  station: string;
  children: ReactNode;
}) {
  return (
    <article className={`l48-sheet ${toneClass(slide.tone)}`} data-step-id={slide.id} data-tone={slide.tone ?? "review"}>
      <span className="l48-corner l48-corner--tl" aria-hidden="true" />
      <span className="l48-corner l48-corner--br" aria-hidden="true" />
      <header className="l48-slide-head">
        <div className="l48-head-row">
          <span className="l48-step-badge" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="l48-station-pill">
            <span className="l48-station-dot" aria-hidden="true" />
            {station}
          </span>
          {slide.mascot && (
            <span className="l48-emblem anim-drift" aria-hidden="true">
              {slide.mascot}
            </span>
          )}
          <SignalBars level={slide.kind === "cover" ? 3 : 2} tone={slide.tone} />
        </div>
        <h1 id="l48-title" tabIndex={-1}>
          <Title48 text={slide.title} />
        </h1>
        {slide.lead && (
          <p className="l48-lead">
            <Mixed48 text={slide.lead} />
          </p>
        )}
      </header>
      <div className="l48-slide-content">{children}</div>
      {slide.tip && <Tip48 text={slide.tip} />}
    </article>
  );
}

/* ============================================================
   الصيغة — رقائق ملوّنة بدل سطر مسطّح
   ============================================================ */

const ACCENT_CHIP = /can|could|may|might|must|have to|should|ought|would|will|needn't|mind/i;

function VerdictText({ text }: { text: string }) {
  const parts = text.split(/\s*\/\s*/).filter(Boolean);
  return (
    <div className="l48-formula-verdicts">
      {parts.map((part, i) => {
        const ok = part.includes("✓");
        const bad = part.includes("✗");
        const clean = part.replace(/[✓✗]/g, "").trim();
        return (
          <span key={i} className={`l48-verdict-line ${ok ? "is-ok" : bad ? "is-bad" : ""}`}>
            <span className="l48-verdict-mark" aria-hidden="true">
              {ok ? "✓" : bad ? "✕" : "•"}
            </span>
            <En48>{clean}</En48>
          </span>
        );
      })}
    </div>
  );
}

function Row48({ row }: { row: string }) {
  if (row.includes("✓") || row.includes("✗")) return <VerdictText text={row} />;
  if (row.includes(" + ")) {
    const chunks = row.split(" + ");
    return (
      <div className="l48-formula-row" dir="ltr" lang="en">
        {chunks.map((chunk, i) => (
          <Fragment key={`${chunk}-${i}`}>
            {i > 0 && (
              <span className="l48-formula-plus" aria-hidden="true">
                +
              </span>
            )}
            <span className={`l48-formula-chip ${ACCENT_CHIP.test(chunk) ? "is-accent" : ""}`}>{chunk}</span>
          </Fragment>
        ))}
      </div>
    );
  }
  const segments = row.split(/\s+(→|·)\s+/);
  return (
    <div className="l48-formula-row l48-formula-row--plain" dir="ltr" lang="en">
      {segments.map((segment, i) =>
        i % 2 === 1 ? (
          <span key={i} className="l48-formula-arrow" aria-hidden="true">
            {segment}
          </span>
        ) : (
          <span key={i} className="l48-formula-slice">
            {segment}
          </span>
        ),
      )}
    </div>
  );
}

export function Formula48({ rows, tone }: { rows: readonly string[]; tone?: Tone48 }) {
  return (
    <section className={`l48-formula ${toneClass(tone)}`} aria-label="صيغة القاعدة">
      <span className="l48-formula-label">
        <span aria-hidden="true">ƒ</span> الصيغة
      </span>
      <div className="l48-formula-body">
        {rows.map((row, i) => (
          <Row48 row={row} key={`${row}-${i}`} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   الأمثلة
   ============================================================ */

function ExampleEn48({ text }: { text: string }) {
  if (!text.includes("✓") && !text.includes("✗")) {
    return (
      <p className="l48-example-en" dir="ltr" lang="en">
        {text}
      </p>
    );
  }
  return (
    <div className="l48-example-verdicts">
      {text
        .split(/\s*\/\s*/)
        .filter(Boolean)
        .map((part, i) => {
          const ok = part.includes("✓");
          const bad = part.includes("✗");
          return (
            <div key={i} className={`l48-example-verdict-line ${ok ? "is-ok" : bad ? "is-bad" : ""}`}>
              <span className="l48-verdict-mark" aria-hidden="true">
                {ok ? "✓" : bad ? "✕" : "•"}
              </span>
              <En48>{part.replace(/[✓✗]/g, "").trim()}</En48>
            </div>
          );
        })}
    </div>
  );
}

export function Examples48({
  items,
  variant = "grid",
}: {
  items: readonly Example48[];
  variant?: "grid" | "list" | "comparison";
}) {
  return (
    <div className={`l48-examples l48-examples--${variant}`}>
      {items.map((item, i) => (
        <article className={`l48-example${item.tone ? ` ${toneClass(item.tone)}` : ""}`} key={`${item.en}-${i}`}>
          {item.tag && (
            <span className="l48-example-tag">
              <En48>{item.tag}</En48>
            </span>
          )}
          <ExampleEn48 text={item.en} />
          <p className="l48-example-ar" dir="rtl" lang="ar">
            <Mixed48 text={item.ar} />
          </p>
        </article>
      ))}
    </div>
  );
}

/* ============================================================
   الجدول
   ============================================================ */

export function Table48View({ table }: { table: Table48 }) {
  return (
    <div className="l48-table-wrap">
      <table className="l48-table">
        <thead>
          <tr>
            {table.head.map((head, i) => (
              <th scope="col" key={head || `h-${i}`}>
                {head ? <En48>{head}</En48> : <span className="l48-table-corner" aria-hidden="true">•</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={`${row.label}-${r}`}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, c) => (
                <td key={`${cell}-${c}`}>{/[A-Za-z]{2,}/.test(cell) ? <En48>{cell}</En48> : <Mixed48 text={cell} />}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.note && (
        <p className="l48-table-note">
          <Mixed48 text={table.note} />
        </p>
      )}
    </div>
  );
}

/* ============================================================
   ملاحظة ونقاط وقاعدة
   ============================================================ */

export function Note48({ text, icon = "💡" }: { text: string; icon?: string }) {
  return (
    <aside className="l48-note">
      <span className="l48-note-icon" aria-hidden="true">
        {icon}
      </span>
      <p>
        <Mixed48 text={text} />
      </p>
    </aside>
  );
}

const TIP_SENTENCE = /(?<=[.!?؟])\s+(?=[A-Z«"“\u0600-\u06FF])/;

export function Tip48({ text }: { text: string }) {
  // One sentence per line: two "English = Arabic" pairs in a single flow can be
  // reordered by the bidi algorithm, so each sentence keeps its own line.
  const lines = text.split(TIP_SENTENCE).filter((line) => line.trim());
  return (
    <div className="l48-tip">
      <span className="l48-tip-icon" aria-hidden="true">
        🦉
      </span>
      <span className="l48-tip-text">
        {lines.map((line, index) => (
          <div className="l48-tip-line" key={`${index}-${line.slice(0, 12)}`}>
            <Mixed48 text={line} />
          </div>
        ))}
      </span>
    </div>
  );
}

export function Points48({ points }: { points: readonly string[] }) {
  return (
    <ul className="l48-points">
      {points.map((point) => (
        <li key={point}>
          <span>
            <Mixed48 text={point} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Tag48({ children }: { children: ReactNode }) {
  return <span className="l48-tag">{children}</span>;
}
