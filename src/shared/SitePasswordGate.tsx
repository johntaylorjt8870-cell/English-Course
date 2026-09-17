import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

const SITE_PASSWORD = "CloseYourEyes173";
const STORAGE_KEY = "englishwithsomer-site-unlocked";

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

  function lockSite() {
    writeUnlockedState(false);
    setUnlocked(false);
  }

  if (!unlocked) {
    return <PasswordScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <>
      {children}
      <button
        type="button"
        onClick={lockSite}
        title="قفل الموقع"
        aria-label="قفل الموقع"
        className="fixed bottom-4 left-4 z-[100] rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-bold text-slate-500 shadow-md shadow-slate-900/10 backdrop-blur transition hover:border-slate-300 hover:bg-white hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
      >
        🔒 قفل الموقع
      </button>
    </>
  );
}
