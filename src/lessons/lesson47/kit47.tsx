import { Fragment, type ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";
import type { Example47, Slide47, Table47, Tone47 } from "./data";

/** English unit: always its own LTR isolate with the Latin face. */
export function En47({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span dir="ltr" lang="en" className={`l47-en ${className}`}>{children}</span>;
}

/** Arabic sentence that may contain English fragments: shared bidi splitter. */
export function Mixed47({ text }: { text: string }) {
  return <span className="l47-mixed"><LatinRuns text={text} /></span>;
}

/**
 * Heading text can contain "Arabic: English" or "English: Arabic". Rendering it
 * as one bidi run lets the colon drift to the far end of the Latin run, so the
 * two sides are emitted separately with the colon kept between them.
 */
const ARABIC_TEXT = /[\u0600-\u06FF]/;
const LATIN_TEXT = /[A-Za-z]/;

export function Title47({ text }: { text: string }) {
  const at = text.indexOf(":");
  if (at === -1) return <Mixed47 text={text} />;
  const head = text.slice(0, at).trimEnd();
  const tail = text.slice(at + 1).trimStart();
  // Only an Arabic label followed by an English phrase needs the explicit
  // separator element; an English label already pairs correctly through Mixed47.
  if (!ARABIC_TEXT.test(head) || !LATIN_TEXT.test(tail)) return <Mixed47 text={text} />;
  return (
    <>
      <Mixed47 text={head} />
      <span className="l47-title-sep" aria-hidden="true">:</span>
      <Mixed47 text={tail} />
    </>
  );
}

export function toneClass(tone: Tone47 | undefined) {
  return `l47-tone--${tone ?? "neutral"}`;
}

/* ============================================================
   إطار الشريحة — بنية بطاقة الدرس الأول: شارة رقم + شارة محطة + شخصية + عنوان
   ============================================================ */

export function SlideFrame47({ slide, index, station, children }: {
  slide: Slide47;
  index: number;
  station: string;
  children: ReactNode;
}) {
  return (
    <article className={`l47-sheet ${toneClass(slide.tone)}`} data-step-id={slide.id} data-tone={slide.tone ?? "neutral"}>
      <header className="l47-slide-head">
        <div className="l47-head-row">
          <span className="l47-step-badge" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span className="l47-station-pill">{station}</span>
          {slide.mascot && <span className="l47-emblem anim-drift" aria-hidden="true">{slide.mascot}</span>}
        </div>
        <h1 id="l47-title" tabIndex={-1}><Title47 text={slide.title} /></h1>
        {slide.lead && <p className="l47-lead"><Mixed47 text={slide.lead} /></p>}
      </header>
      <div className="l47-slide-content">{children}</div>
      {slide.tip && <Tip47 text={slide.tip} />}
    </article>
  );
}

/* ============================================================
   الصيغة — رقائق ملوّنة بدل سطر نصّي مسطّح
   ============================================================ */

const ACCENT_CHIP = /would|rather|like|mind|have to|should|could/i;

function VerdictText({ text }: { text: string }) {
  const parts = text.split(/\s*\/\s*/).filter(Boolean);
  return (
    <div className="l47-formula-verdicts">
      {parts.map((part, i) => {
        const ok = part.includes("✓");
        const bad = part.includes("✗");
        const clean = part.replace(/[✓✗]/g, "").trim();
        return (
          <span key={i} className={`l47-verdict-line ${ok ? "is-ok" : bad ? "is-bad" : ""}`}>
            <span className="l47-verdict-mark" aria-hidden="true">{ok ? "✓" : bad ? "✕" : "•"}</span>
            <En47>{clean}</En47>
          </span>
        );
      })}
    </div>
  );
}

function Row47({ row }: { row: string }) {
  if (row.includes("✓") || row.includes("✗")) return <VerdictText text={row} />;
  if (row.includes(" + ")) {
    const chunks = row.split(" + ");
    return (
      <div className="l47-formula-row" dir="ltr" lang="en">
        {chunks.map((chunk, i) => (
          <Fragment key={`${chunk}-${i}`}>
            {i > 0 && <span className="l47-formula-plus" aria-hidden="true">+</span>}
            <span className={`l47-formula-chip ${ACCENT_CHIP.test(chunk) ? "is-accent" : ""}`}>{chunk}</span>
          </Fragment>
        ))}
      </div>
    );
  }
  const segments = row.split(/\s+(→|·)\s+/);
  return (
    <div className="l47-formula-row l47-formula-row--plain" dir="ltr" lang="en">
      {segments.map((segment, i) =>
        i % 2 === 1
          ? <span key={i} className="l47-formula-arrow" aria-hidden="true">{segment}</span>
          : <span key={i} className="l47-formula-slice">{segment}</span>
      )}
    </div>
  );
}

export function Formula47({ rows, tone }: { rows: readonly string[]; tone?: Tone47 }) {
  return (
    <section className={`l47-formula ${toneClass(tone)}`} aria-label="صيغة القاعدة">
      <span className="l47-formula-label"><span aria-hidden="true">ƒ</span> الصيغة</span>
      <div className="l47-formula-body">
        {rows.map((row, i) => <Row47 row={row} key={`${row}-${i}`} />)}
      </div>
    </section>
  );
}

/* ============================================================
   الأمثلة — لوحة إنجليزية + ترجمة عربية
   ============================================================ */

function ExampleEn47({ text }: { text: string }) {
  if (!text.includes("✓") && !text.includes("✗")) {
    return <p className="l47-example-en" dir="ltr" lang="en">{text}</p>;
  }
  return (
    <div className="l47-example-verdicts">
      {text.split(/\s*\/\s*/).filter(Boolean).map((part, i) => {
        const ok = part.includes("✓");
        const bad = part.includes("✗");
        return (
          <div key={i} className={`l47-example-verdict-line ${ok ? "is-ok" : bad ? "is-bad" : ""}`}>
            <span className="l47-verdict-mark" aria-hidden="true">{ok ? "✓" : bad ? "✕" : "•"}</span>
            <En47>{part.replace(/[✓✗]/g, "").trim()}</En47>
          </div>
        );
      })}
    </div>
  );
}

export function Examples47({ items, variant = "grid" }: { items: readonly Example47[]; variant?: "grid" | "list" | "comparison" }) {
  return (
    <div className={`l47-examples l47-examples--${variant}`}>
      {items.map((item, i) => (
        <article className={`l47-example${item.tone ? ` ${toneClass(item.tone)}` : ""}`} key={`${item.en}-${i}`}>
          {item.tag && <span className="l47-example-tag"><En47>{item.tag}</En47></span>}
          <ExampleEn47 text={item.en} />
          <p className="l47-example-ar" dir="rtl" lang="ar"><Mixed47 text={item.ar} /></p>
        </article>
      ))}
    </div>
  );
}

/* ============================================================
   جدول المقارنة
   ============================================================ */

export function Table47View({ table }: { table: Table47 }) {
  return (
    <div className="l47-table-wrap">
      <table className="l47-table">
        <thead>
          <tr>
            <th scope="col"><span className="l47-table-corner" aria-hidden="true">•</span></th>
            {table.head.map((head) => (
              <th scope="col" key={head}><En47>{head}</En47></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={`${row.label}-${r}`}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, c) => (
                <td key={`${cell}-${c}`}>
                  {/[A-Za-z]/.test(cell) ? <En47>{cell}</En47> : <Mixed47 text={cell} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.note && <p className="l47-table-note"><Mixed47 text={table.note} /></p>}
    </div>
  );
}

/* ============================================================
   ملاحظة ونقاط وقاعدة ذهبية
   ============================================================ */

export function Note47({ text, icon = "💡" }: { text: string; icon?: string }) {
  return (
    <aside className="l47-note">
      <span className="l47-note-icon" aria-hidden="true">{icon}</span>
      <p><Mixed47 text={text} /></p>
    </aside>
  );
}

export function Tip47({ text }: { text: string }) {
  return (
    <div className="l47-tip">
      <span className="l47-tip-icon" aria-hidden="true">🦉</span>
      <span className="l47-tip-text"><Mixed47 text={text} /></span>
    </div>
  );
}

export function Points47({ points }: { points: readonly string[] }) {
  return (
    <ul className="l47-points">
      {points.map((point) => (
        <li key={point}>
          <span><Mixed47 text={point} /></span>
        </li>
      ))}
    </ul>
  );
}

export function Tag47({ children }: { children: ReactNode }) {
  return <span className="l47-tag">{children}</span>;
}
