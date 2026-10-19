import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { FormEvent, ReactNode } from "react";

const SITE_PASSWORD = "CloseYourEyes173";
const STORAGE_KEY = "englishwithsomer-site-unlocked";

interface SiteLockContextValue {
  lockSite: () => void;
  registerInlineHost: () => () => void;
}

const SiteLockContext = createContext<SiteLockContextValue | null>(null);

export function useSiteLock() {
  const ctx = useContext(SiteLockContext);
  const fallbackLock = useCallback(() => {
    writeUnlockedState(false);
  }, []);
  return ctx?.lockSite ?? fallbackLock;
}

export function useRegisterInlineLockHost(enabled = true) {
  const ctx = useContext(SiteLockContext);
  useLayoutEffect(() => {
    if (!enabled || !ctx) return;
    return ctx.registerInlineHost();
  }, [enabled, ctx]);
}

export function SiteLockButton({ className = "" }: { className?: string }) {
  const lockSite = useSiteLock();
  return (
    <button type="button" onClick={lockSite} aria-label="قفل الموقع" data-site-lock-button="true" className={`site-lock-btn ${className}`.trim()}>
      🔒 قفل الموقع
    </button>
  );
}

function readUnlockedState() {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(STORAGE_KEY) === "unlocked";
  } catch {
    // If storage is unavailable, the gate still works for the current visit.
    return false;
  }
}

function writeUnlockedState(unlocked: boolean) {
  try {
    if (unlocked) window.localStorage.setItem(STORAGE_KEY, "unlocked");
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be disabled by the browser; unlocking remains session-safe.
  }
}

function isElementVisible(el: HTMLElement | null): el is HTMLElement {
  if (!el) return false;
  if (el.closest("[hidden], [aria-hidden='true'], .hidden")) return false;
  return true;
}

function setAttrIfChanged(el: HTMLElement, name: string, value: string) {
  if (el.getAttribute(name) !== value) {
    el.setAttribute(name, value);
  }
}

function findStepNavHost(root: HTMLElement): { container: HTMLElement; beforeNode: ChildNode | null; mode: "pill" | "before-last" | "append" | "column-footer" } | null {
  // 1. Lessons 1, 3–26, 28–31 bottom navigation bar
  const pillBars = root.querySelectorAll<HTMLElement>(
    "div.l30-floating-nav, div.l31-floating-nav, div.absolute.inset-x-0.bottom-4.flex.justify-center",
  );
  for (const bar of pillBars) {
    if (isElementVisible(bar)) {
      setAttrIfChanged(bar, "data-site-lock-host", "true");
      return { container: bar, beforeNode: null, mode: "pill" };
    }
  }

  // 2. Lessons 41–44 step navigation bar (insert before last button so button:last-child stays Next)
  const studioNavs = root.querySelectorAll<HTMLElement>(
    "nav.bottomNav41, nav.bottomNav42, nav.bottomNav43, nav.stepNav44",
  );
  for (const nav of studioNavs) {
    if (isElementVisible(nav)) {
      setAttrIfChanged(nav, "data-site-lock-host", "true");
      return { container: nav, beforeNode: nav.lastElementChild, mode: "before-last" };
    }
  }

  // 3. Lessons 2, 27, 34–40 bottom step navigation bar
  const candidates = [...root.querySelectorAll<HTMLButtonElement>("button")].filter((btn) => {
    if (!isElementVisible(btn)) return false;
    if (btn.hasAttribute("data-site-lock-button")) return false;
    if (btn.closest("header, aside, [role='dialog'], [aria-label*='مناطق']")) return false;
    const txt = (btn.textContent || "").replace(/\s+/g, " ").trim();
    if (!txt || txt.includes("الدرس السابق") || txt.includes("الدرس التالي")) return false;
    return (
      txt.includes("التالي") ||
      txt.includes("الخطوة التالية") ||
      txt.includes("→ السابق") ||
      txt === "السابق" ||
      txt.startsWith("→ الخطوة السابقة")
    );
  });

  if (candidates.length > 0) {
    const lastBtn = candidates[candidates.length - 1];
    const bar = lastBtn.closest<HTMLElement>("footer, nav, div.justify-between");
    if (bar && isElementVisible(bar)) {
      setAttrIfChanged(bar, "data-site-lock-host", "true");
      const parent = lastBtn.parentElement;
      if (parent && parent !== bar && parent.classList.contains("flex")) {
        return { container: parent, beforeNode: null, mode: "append" };
      }
      return { container: bar, beforeNode: null, mode: "append" };
    }
  }

  // 4. Full-viewport h-screen lessons on non-step tabs (test / solutions / teacher)
  const hScreen = root.querySelector<HTMLElement>(".h-screen");
  if (hScreen && isElementVisible(hScreen)) {
    const main = hScreen.querySelector<HTMLElement>("main");
    if (main && main.parentElement) {
      return { container: main.parentElement, beforeNode: null, mode: "column-footer" };
    }
  }

  return null;
}

function PasswordScreen({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password === SITE_PASSWORD) {
      writeUnlockedState(true);
      onUnlock();
      return;
    }

    setPassword("");
    setError(true);
    inputRef.current?.focus();
  }

  return (
    <main
      dir="rtl"
      lang="ar"
      className="paper-dots relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f6fb] px-4 py-10 text-slate-800 sm:px-6"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

      <section className="pop relative w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-slate-300/30 backdrop-blur sm:p-9" aria-labelledby="site-gate-title">
        <div className="mx-auto mb-7 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 text-3xl shadow-lg shadow-sky-500/20" aria-hidden="true">
          🔒
        </div>

        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 shadow-sm">
            <span dir="ltr" className="font-en text-sm font-extrabold tracking-wide text-slate-700">
              EnglishwithSomeR
            </span>
          </div>
          <h1 id="site-gate-title" className="font-head mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            الموقع محمي
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-500">
            هذا الموقع محمي بكلمة مرور.
            <br />
            أدخل كلمة المرور للمتابعة:
          </p>
        </div>

        <form className="mt-8" onSubmit={handleSubmit} noValidate>
          <label htmlFor="site-password" className="font-head mb-2 block text-right text-base font-bold text-slate-700">
            كلمة المرور
          </label>
          <input
            ref={inputRef}
            id="site-password"
            name="password"
            type="password"
            dir="ltr"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError(false);
            }}
            aria-invalid={error}
            aria-describedby={error ? "site-password-error" : "site-password-help"}
            className="font-en w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-base tracking-wide text-slate-800 outline-none transition placeholder:text-right placeholder:font-body placeholder:tracking-normal placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            placeholder="كلمة المرور"
          />
          {error ? (
            <p id="site-password-error" role="alert" className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-right text-sm font-bold text-rose-700">
              كلمة المرور غير صحيحة.
            </p>
          ) : (
            <p id="site-password-help" className="mt-3 text-right text-sm text-slate-400">
              اكتب كلمة المرور كما استلمتها.
            </p>
          )}
          <button
            type="submit"
            className="font-head mt-5 w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300 active:translate-y-0"
          >
            فتح الموقع
          </button>
        </form>

        <p className="mt-7 text-center text-xs leading-6 text-slate-400">
          أدخل كلمة المرور للوصول إلى دروس اللغة الإنجليزية.
        </p>
      </section>
    </main>
  );
}

export default function SitePasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(readUnlockedState);
  const [inlineHostCount, setInlineHostCount] = useState(0);
  const [portalSlot, setPortalSlot] = useState<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const lockSite = useCallback(() => {
    writeUnlockedState(false);
    setUnlocked(false);
  }, []);

  const registerInlineHost = useCallback(() => {
    setInlineHostCount((c) => c + 1);
    return () => setInlineHostCount((c) => Math.max(0, c - 1));
  }, []);

  const contextValue = useMemo(
    () => ({ lockSite, registerInlineHost }),
    [lockSite, registerInlineHost],
  );

  useLayoutEffect(() => {
    if (!unlocked || inlineHostCount > 0) {
      setPortalSlot((prev) => {
        prev?.remove();
        return null;
      });
      return;
    }

    const root = shellRef.current;
    if (!root || typeof document === "undefined") return;

    let slotEl: HTMLElement | null = null;
    let currentContainer: HTMLElement | null = null;
    let observer: MutationObserver | null = null;
    let syncing = false;

    const observeRoot = () => {
      observer?.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "hidden", "aria-hidden", "data-area"],
      });
    };

    const sync = () => {
      if (syncing) return;
      syncing = true;
      observer?.disconnect();

      try {
        if (root.querySelector("[data-lesson-step-nav='true']")) {
          if (slotEl) {
            slotEl.remove();
            slotEl = null;
            currentContainer = null;
            setPortalSlot((prev) => (prev === null ? prev : null));
          }
          return;
        }

        const target = findStepNavHost(root);
        if (!target) {
          if (slotEl) {
            slotEl.remove();
            slotEl = null;
            currentContainer = null;
            setPortalSlot((prev) => (prev === null ? prev : null));
          }
          return;
        }

        const { container, beforeNode, mode } = target;
        setAttrIfChanged(container, "data-site-lock-host", mode);

        const nextClassName = `site-lock-slot site-lock-slot--${mode}`;
        if (!slotEl) {
          slotEl = document.createElement("div");
        }
        if (slotEl.className !== nextClassName) {
          slotEl.className = nextClassName;
        }
        setAttrIfChanged(slotEl, "data-site-lock-slot", mode);

        if (currentContainer && currentContainer !== container) {
          currentContainer.removeAttribute("data-site-lock-host");
        }
        currentContainer = container;

        if (mode === "before-last" && beforeNode && beforeNode.parentNode === container) {
          if (slotEl.parentNode !== container || slotEl.nextSibling !== beforeNode) {
            container.insertBefore(slotEl, beforeNode);
          }
        } else if (slotEl.parentNode !== container) {
          container.appendChild(slotEl);
        }

        const activeSlot = slotEl;
        setPortalSlot((prev) => (prev === activeSlot ? prev : activeSlot));
      } finally {
        syncing = false;
        observeRoot();
      }
    };

    if (typeof MutationObserver !== "undefined") {
      observer = new MutationObserver((records) => {
        const external = records.some(
          (r) =>
            r.target !== slotEl &&
            !(slotEl && slotEl.contains(r.target)) &&
            ![...r.addedNodes, ...r.removedNodes].every((n) => n === slotEl || (slotEl && slotEl.contains(n))),
        );
        if (external) sync();
      });
    }

    sync();

    return () => {
      observer?.disconnect();
      if (slotEl) slotEl.remove();
      if (currentContainer) currentContainer.removeAttribute("data-site-lock-host");
    };
  }, [unlocked, inlineHostCount]);

  if (!unlocked) {
    return <PasswordScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <SiteLockContext.Provider value={contextValue}>
      <div ref={shellRef} className="site-gate-shell">
        {children}
        {inlineHostCount === 0 && portalSlot
          ? createPortal(
              <>
                <SiteLockButton />
                <span aria-hidden="true" className="site-lock-sentinel" />
              </>,
              portalSlot,
            )
          : null}
        {inlineHostCount === 0 && !portalSlot ? (
          <footer className="site-gate-bar" dir="rtl" role="region" aria-label="التحكم بقفل الموقع">
            <SiteLockButton />
          </footer>
        ) : null}
      </div>
    </SiteLockContext.Provider>
  );
}
