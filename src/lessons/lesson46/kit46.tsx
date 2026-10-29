import type { ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";
import type { Example46, Slide46 } from "./data";

export function En46({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span dir="ltr" lang="en" className={`l46-en ${className}`}>{children}</span>;
}
export function Mixed46({ text }: { text: string }) {
  return <span className="l46-mixed"><LatinRuns text={text} /></span>;
}

export function SlideFrame46({ slide, index, children }: { slide: Slide46; index: number; children: ReactNode }) {
  return (
    <article className={`l46-sheet l46-sheet--${slide.kind}`} data-step-id={slide.id}>
      <header className="l46-slide-head">
        <div className="l46-page-marker"><En46>FIELD NOTES / {String(index + 1).padStart(2, "0")}</En46><span aria-hidden="true">✳</span></div>
        <h1 id="l46-title" tabIndex={-1}><Mixed46 text={slide.title} /></h1>
        {slide.lead && <p><Mixed46 text={slide.lead} /></p>}
      </header>
      <div className="l46-slide-content">{children}</div>
    </article>
  );
}

export function Formula46({ children }: { children: string }) {
  return <div className="l46-formula"><span className="l46-formula-label">FORMULA</span><div dir="ltr" lang="en">{children}</div></div>;
}

export function Examples46({ items, variant = "grid" }: { items: readonly Example46[]; variant?: "grid" | "timeline" | "comparison" }) {
  return (
    <div className={`l46-examples l46-examples--${variant}`}>
      {items.map((item, i) => (
        <div className={`l46-example l46-example--${item.tone || "neutral"}`} key={`${item.en}-${i}`}>
          {item.tag && <span className="l46-example-tag"><En46>{item.tag}</En46></span>}
          <p className="l46-example-en" dir="ltr" lang="en">{item.en}</p>
          <p className="l46-example-ar" dir="rtl"><Mixed46 text={item.ar} /></p>
        </div>
      ))}
    </div>
  );
}

export function Note46({ text }: { text: string }) {
  return <aside className="l46-note"><span aria-hidden="true">✳</span><p><Mixed46 text={text} /></p></aside>;
}
