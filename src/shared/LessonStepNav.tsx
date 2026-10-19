import type { ReactNode } from "react";
import { SiteLockButton, useRegisterInlineLockHost } from "./SitePasswordGate";

export interface LessonStepNavProps {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
  prevClassName?: string;
  nextClassName?: string;
  className?: string;
  ariaLabel?: string;
  dir?: "rtl" | "ltr";
  showStepControls?: boolean;
  showNext?: boolean;
  showPrev?: boolean;
  children?: ReactNode;
}

export default function LessonStepNav({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  prevLabel = "→ السابق",
  nextLabel = "التالي ←",
  prevClassName = "",
  nextClassName = "",
  className = "",
  ariaLabel = "التنقل بين خطوات الدرس",
  dir,
  showStepControls = true,
  showNext = true,
  showPrev = true,
  children,
}: LessonStepNavProps) {
  useRegisterInlineLockHost(true);

  return (
    <nav
      aria-label={ariaLabel}
      dir={dir}
      data-lesson-step-nav="true"
      className={`lesson-step-nav ${className}`.trim()}
    >
      <div className="lesson-step-nav__start">
        {showStepControls && showPrev ? (
          <button type="button" disabled={prevDisabled} onClick={onPrev} data-step-nav="prev" className={`lesson-step-nav__btn ${prevClassName}`.trim()}>
            {prevLabel}
          </button>
        ) : null}
      </div>

      {showStepControls && children ? (
        <div className="lesson-step-nav__center">{children}</div>
      ) : null}

      <div className="lesson-step-nav__end">
        {showStepControls && showNext ? (
          <button type="button" disabled={nextDisabled} onClick={onNext} data-step-nav="next" className={`lesson-step-nav__btn ${nextClassName}`.trim()}>
            {nextLabel}
          </button>
        ) : null}
        <SiteLockButton />
      </div>
    </nav>
  );
}
