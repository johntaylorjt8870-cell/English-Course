import { useRegisterInlineLockHost, SiteLockButton } from "./SitePasswordGate";
import { Signature, SignatureGhost } from "./Signature";
import type { Key, ReactNode, Ref } from "react";

export interface Lesson1ShellItem {
  index: number;
  title: ReactNode;
  mascot?: ReactNode;
  navId?: string;
}

export interface Lesson1ShellGroup {
  section: string;
  items: Lesson1ShellItem[];
}

export interface Lesson1ShellProps {
  children?: ReactNode;
  mainAfter?: ReactNode;
  showStepContent?: boolean;
  contentKey?: Key;
  contentArea?: string;
  railTitle: ReactNode;
  railSubtitle?: ReactNode;
  itemTitleClassName?: string;
  groups: Lesson1ShellGroup[];
  activeIndex: number;
  onSelectStep: (index: number) => void;
  onExit?: () => void;
  railFooter?: ReactNode;
  railAriaLabel?: string;
  markActiveStep?: boolean;
  isMenuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  headerContent: ReactNode;
  progress: number;
  counter: ReactNode;
  counterDir?: "ltr" | "rtl";
  mainId: string;
  mainRef?: Ref<HTMLElement>;
  rootClassName?: string;
  rootDir?: "ltr" | "rtl";
  rootDataLesson?: number;
  rootDataShell?: string;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  showPrev?: boolean;
  showNext?: boolean;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
  navAriaLabel?: string;
}

/**
 * The reusable Lesson 1 shell: keep its original RTL flex order, 18rem rail,
 * progress header, centered slide width, mobile drawer, and floating controls.
 * Lesson-specific content and rail data are supplied by the caller.
 */
export default function Lesson1Shell({
  children,
  mainAfter,
  showStepContent = true,
  contentKey,
  contentArea,
  railTitle,
  railSubtitle,
  itemTitleClassName = "truncate",
  groups,
  activeIndex,
  onSelectStep,
  onExit,
  railFooter,
  railAriaLabel,
  markActiveStep = false,
  isMenuOpen,
  onMenuOpenChange,
  headerContent,
  progress,
  counter,
  counterDir,
  mainId,
  mainRef,
  rootClassName = "style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800",
  rootDir,
  rootDataLesson,
  rootDataShell,
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  showPrev = true,
  showNext = true,
  prevLabel = "→ السابق",
  nextLabel = "التالي ←",
  navAriaLabel,
}: Lesson1ShellProps) {
  // This is the same inline host used by Lesson 1's injected site-lock button.
  useRegisterInlineLockHost(true);

  const rail = (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        {onExit ? (
          <button type="button" onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">
            → جميع الدروس
          </button>
        ) : null}
        <div className="font-head mt-2 text-xl font-bold text-slate-900">{railTitle}</div>
        {railSubtitle}
      </div>
      <nav aria-label={railAriaLabel} className="flex-1 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className="px-3 py-1 text-xs font-bold text-slate-400">{group.section}</div>
            {group.items.map((item) => {
              const active = item.index === activeIndex;
              return (
                <button
                  key={item.navId ?? item.index}
                  type="button"
                  data-step-nav={item.navId}
                  aria-current={markActiveStep && active ? "step" : undefined}
                  onClick={() => {
                    onSelectStep(item.index);
                    onMenuOpenChange(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/20" : "bg-slate-100"}`}>{item.index + 1}</span>
                  <span className={`${itemTitleClassName} font-semibold`}>{item.title}</span>
                  {item.mascot !== undefined ? <span className="mr-auto text-base">{item.mascot}</span> : null}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-100 p-4 text-xs text-slate-400">
        التنقل: الأسهم ← → أو مفتاح المسافة
        {railFooter}
      </div>
    </aside>
  );

  return (
    <div
      dir={rootDir}
      data-lesson={rootDataLesson}
      data-l35-shell={rootDataShell}
      className={rootClassName}
    >
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">
          {rail}
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              type="button"
              onClick={() => onMenuOpenChange(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm lg:hidden"
              aria-label="فهرس الدرس"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500">{headerContent}</div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-orange-400 to-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm" dir={counterDir}>
              {counter}
            </span>
          </header>

          <main id={mainId} ref={mainRef} className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            {showStepContent ? (
              <div key={contentKey} className="pop mx-auto max-w-4xl" data-area={contentArea}>
                {children}
              </div>
            ) : null}
            {mainAfter}
          </main>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3" data-lesson-step-nav="true" data-site-lock-host="pill">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur" role={navAriaLabel ? "group" : undefined} aria-label={navAriaLabel}>
              {showPrev ? (
                <button
                  type="button"
                  data-step-nav="prev"
                  onClick={onPrev}
                  disabled={prevDisabled}
                  className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30"
                >
                  {prevLabel}
                </button>
              ) : null}
              {showPrev && showNext ? <span className="h-6 w-px bg-slate-200" /> : null}
              {showNext ? (
                <button
                  type="button"
                  data-step-nav="next"
                  onClick={onNext}
                  disabled={nextDisabled}
                  className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-slate-700 disabled:opacity-30"
                >
                  {nextLabel}
                </button>
              ) : null}
            </div>
            <div className="site-lock-slot site-lock-slot--pill" data-site-lock-slot="pill">
              <SiteLockButton />
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => onMenuOpenChange(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            {rail}
          </div>
        </div>
      ) : null}
    </div>
  );
}
