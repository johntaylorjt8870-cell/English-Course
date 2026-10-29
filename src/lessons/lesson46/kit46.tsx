import { Fragment, type ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";
import type { Example46, Slide46, Tone46 } from "./data";

/** English unit: always its own LTR isolate with the Latin face. */
export function En46({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span dir="ltr" lang="en" className={`l46-en ${className}`}>{children}</span>;
}

/** Arabic sentence that may contain English fragments: shared bidi splitter. */
export function Mixed46({ text }: { text: string }) {
  return <span className="l46-mixed"><LatinRuns text={text} /></span>;
}

export function toneClass(tone: Tone46 | undefined) {
  return `l46-tone--${tone ?? "neutral"}`;
}

// ============================================================
// إطار الشريحة — نفس بنية بطاقة الدرس 1: شارة رقم + شارة مرحلة + إيموجي + عنوان
// ============================================================

export function SlideFrame46({ slide, index, station, children }: {
  slide: Slide46;
  index: number;
  station: string;
  children: ReactNode;
}) {
  return (
    <article className={`l46-sheet ${toneClass(slide.tone)}`} data-step-id={slide.id} data-tone={slide.tone ?? "neutral"}>
      <header className="l46-slide-head">
        <div className="l46-head-row">
          <span className="l46-step-badge" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span className="l46-station-pill">{station}</span>
          {slide.mascot && <span className="l46-emblem anim-drift" aria-hidden="true">{slide.mascot}</span>}
        </div>
        <h1 id="l46-title" tabIndex={-1}><Mixed46 text={slide.title} /></h1>
        {slide.lead && <p className="l46-lead"><Mixed46 text={slide.lead} /></p>}
      </header>
      <div className="l46-slide-content">{children}</div>
      {slide.tip && <Tip46 text={slide.tip} />}
    </article>
  );
}

// ============================================================
// الصيغة — رقائق ملوّنة بدل سطر نصّي مسطّح
// ============================================================

function VerdictText({ text }: { text: string }) {
  // "She mustn't leave. ✓  /  She mustn't to leave. ✗"
  const parts = text.split(/\s*\/\s*/).filter(Boolean);
  return (
    <div className="l46-formula-verdicts">
      {parts.map((part, i) => {
        const ok = part.includes("✓");
        const bad = part.includes("✗");
        const clean = part.replace(/[✓✗]/g, "").trim();
        return (
          <span key={i} className={`l46-verdict-line ${ok ? "is-ok" : bad ? "is-bad" : ""}`}>
            <span className="l46-verdict-mark" aria-hidden="true">{ok ? "✓" : bad ? "✕" : "•"}</span>
            <En46>{clean}</En46>
          </span>
        );
      })}
    </div>
  );
}

function Row46({ row }: { row: string }) {
  if (row.includes("✓") || row.includes("✗")) return <VerdictText text={row} />;
  if (row.includes(" + ")) {
    const chunks = row.split(" + ");
    return (
      <div className="l46-formula-row" dir="ltr" lang="en">
        {chunks.map((chunk, i) => (
          <Fragment key={`${chunk}-${i}`}>
            {i > 0 && <span className="l46-formula-plus" aria-hidden="true">+</span>}
            <span className={`l46-formula-chip ${/mustn|have to|need/i.test(chunk) ? "is-accent" : ""}`}>{chunk}</span>
          </Fragment>
        ))}
      </div>
    );
  }
  const segments = row.split(/\s+(→|·)\s+/);
  return (
    <div className="l46-formula-row l46-formula-row--plain" dir="ltr" lang="en">
      {segments.map((segment, i) =>
        i % 2 === 1
          ? <span key={i} className="l46-formula-arrow" aria-hidden="true">{segment}</span>
          : <span key={i} className="l46-formula-slice">{segment}</span>
      )}
    </div>
  );
}

export function Formula46({ rows, tone }: { rows: readonly string[]; tone?: Tone46 }) {
  return (
    <section className={`l46-formula ${toneClass(tone)}`} aria-label="صيغة القاعدة">
      <span className="l46-formula-label"><span aria-hidden="true">ƒ</span> FORMULA / الصيغة</span>
      <div className="l46-formula-body">
        {rows.map((row, i) => <Row46 row={row} key={`${row}-${i}`} />)}
      </div>
    </section>
  );
}

// ============================================================
// الأمثلة — لوحة إنجليزية + ترجمة عربية
// ============================================================

function ExampleEn46({ text }: { text: string }) {
  if (!text.includes("✓") && !text.includes("✗")) {
    return <p className="l46-example-en" dir="ltr" lang="en">{text}</p>;
  }
  return (
    <div className="l46-example-verdicts">
      {text.split(/\s*\/\s*/).filter(Boolean).map((part, i) => {
        const ok = part.includes("✓");
        const bad = part.includes("✗");
        return (
          <div key={i} className={`l46-example-verdict-line ${ok ? "is-ok" : bad ? "is-bad" : ""}`}>
            <span className="l46-verdict-mark" aria-hidden="true">{ok ? "✓" : bad ? "✕" : "•"}</span>
            <En46>{part.replace(/[✓✗]/g, "").trim()}</En46>
          </div>
        );
      })}
    </div>
  );
}

export function Examples46({ items, variant = "grid" }: { items: readonly Example46[]; variant?: "grid" | "timeline" | "comparison" }) {
  return (
    <div className={`l46-examples l46-examples--${variant}`}>
      {items.map((item, i) => (
        <article className={`l46-example${item.tone ? ` ${toneClass(item.tone)}` : ""}`} key={`${item.en}-${i}`}>
          {item.tag && <span className="l46-example-tag"><En46>{item.tag}</En46></span>}
          <ExampleEn46 text={item.en} />
          <p className="l46-example-ar" dir="rtl" lang="ar"><Mixed46 text={item.ar} /></p>
        </article>
      ))}
    </div>
  );
}

// ============================================================
// ملاحظة و«قاعدة ذهبية»
// ============================================================

export function Note46({ text, icon = "💡" }: { text: string; icon?: string }) {
  return (
    <aside className="l46-note">
      <span className="l46-note-icon" aria-hidden="true">{icon}</span>
      <p><Mixed46 text={text} /></p>
    </aside>
  );
}

export function Tip46({ text }: { text: string }) {
  return (
    <div className="l46-tip">
      <span className="l46-tip-icon" aria-hidden="true">🦉</span>
      <span className="l46-tip-text"><Mixed46 text={text} /></span>
    </div>
  );
}

export function Points46({ points }: { points: readonly string[] }) {
  return (
    <ul className="l46-points">
      {points.map((point, i) => (
        <li key={point}>
          <span className="l46-point-mark" aria-hidden="true">{i + 1}</span>
          <span><Mixed46 text={point} /></span>
        </li>
      ))}
    </ul>
  );
}

export function Tag46({ children }: { children: ReactNode }) {
  return <span className="l46-tag">{children}</span>;
}
