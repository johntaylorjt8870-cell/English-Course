import { useEffect, useRef, useState } from "react";
import type { GradedTestResult52 } from "./testKey52";
import type { TeacherGuideProps52 } from "./TeacherGuide52";
import { retryModuleUrl52 } from "./retry52";
import { En52 } from "./kit52";

const PASSWORD = "somer173";
export function isTeacherPassword52(value: string): boolean {
  return value.trim() === PASSWORD;
}

type LoadedGuide = { default: React.ComponentType<TeacherGuideProps52> };

let recoveredGuide52: { url: string } | "retry-entry" | null = null;
async function defaultGuideLoader52(previousError?: unknown, attempt = 0): Promise<LoadedGuide> {
  if (recoveredGuide52 === "retry-entry") return import("./TeacherGuide52?retry") as Promise<LoadedGuide>;
  if (recoveredGuide52) {
    try {
      return (await import(/* @vite-ignore */ recoveredGuide52.url)) as LoadedGuide;
    } catch {
      recoveredGuide52 = null;
    }
  }
  if (!previousError) return import("./TeacherGuide52");
  const url = retryModuleUrl52(previousError, "TeacherGuide52", attempt);
  if (url) {
    const guide = (await import(/* @vite-ignore */ url)) as LoadedGuide;
    recoveredGuide52 = { url };
    return guide;
  }
  const guide = (await import("./TeacherGuide52?retry")) as LoadedGuide;
  recoveredGuide52 = "retry-entry";
  return guide;
}

export function TeacherArea52({
  result,
  loader,
  unlocked: unlockedProp,
  onUnlock,
}: {
  result: GradedTestResult52;
  /** Test hook: audits inject a failing/succeeding guide loader. */
  loader?: () => Promise<LoadedGuide>;
  /** Controlled by the lesson shell so navigation keeps the space open and retake re-locks it. */
  unlocked?: boolean;
  onUnlock?: () => void;
}) {
  const [internalUnlocked, setInternalUnlocked] = useState(false);
  const unlocked = unlockedProp ?? internalUnlocked;
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const [Guide, setGuide] = useState<LoadedGuide["default"] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const startedRef = useRef(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!unlocked || Guide || startedRef.current) return;
    startedRef.current = true;
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    (async () => {
      let lastError: unknown = null;
      for (let attempt = 1; attempt <= 3; attempt += 1) {
        try {
          const moduleValue = loader ? await loader() : await defaultGuideLoader52(lastError, attempt);
          if (!cancelled) {
            const Component = moduleValue.default;
            setGuide(() => Component);
            setLoading(false);
          }
          return;
        } catch (error) {
          lastError = error;
        }
      }
      if (!cancelled) {
        setLoadError("تعذّر تحميل دليل المعلم. أعد المحاولة.");
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [unlocked, Guide, attempt, loader]);

  function submitPassword(event: React.FormEvent) {
    event.preventDefault();
    if (isTeacherPassword52(password)) {
      setInternalUnlocked(true);
      onUnlock?.();
      setWrong(false);
      setPassword("");
      return;
    }
    setWrong(true);
  }

  function retryGuide() {
    startedRef.current = false;
    setGuide(null);
    setLoadError(null);
    setLoading(false);
    setAttempt((value) => value + 1);
  }

  if (!unlocked) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8" id="l52-teacher" data-teacher-locked>
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-900 text-2xl" aria-hidden="true">
            🔒
          </span>
          <div>
            <h2 className="font-head text-2xl font-bold text-slate-900">مساحة المعلّم</h2>
            <p className="mt-1 text-slate-600">
              تُعرض هذه المساحة بعد التسليم فقط، وتحتوي مفتاح التصحيح الكامل والبدائل والملاحظات البيداغوجية. احمِها بكلمة
              مرور المعلّم المعتادة.
            </p>
          </div>
        </div>
        <ul className="mt-4 grid gap-2 text-slate-700">
          <li className="rounded-2xl border border-slate-200 bg-white p-3">مفتاح الأسئلة الخمسة والعشرين، مع شرح كل إجابة.</li>
          <li className="rounded-2xl border border-slate-200 bg-white p-3">البدائل المقبولة في الترجمة والتصحيح، وأسباب الرفض.</li>
          <li className="rounded-2xl border border-slate-200 bg-white p-3">نماذج القراءة والحوار والكتابة والتحدث.</li>
        </ul>
        <form className="mt-4" onSubmit={submitPassword}>
          <label htmlFor="l52-teacher-password" className="text-sm font-bold text-slate-600">
            كلمة مرور المعلّم
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            <input
              id="l52-teacher-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={wrong}
              aria-describedby={wrong ? "l52-teacher-error" : undefined}
              className="w-56 rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-sky-400"
            />
            <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 font-bold text-white transition hover:bg-slate-700">
              فتح الدليل
            </button>
          </div>
          {wrong && (
            <p className="mt-2 text-sm font-bold text-rose-600" id="l52-teacher-error" role="alert">
              كلمة المرور غير صحيحة.
            </p>
          )}
        </form>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8" id="l52-teacher" data-teacher-open>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-slate-400">TEACHER SPACE</span>
          <h2 className="font-head text-2xl font-bold text-slate-900">دليل المعلم — الدرس 52</h2>
          <p className="mt-1 text-slate-600">
            نتيجتك الحالية:{" "}
            <bdi dir="ltr" className="font-bold">
              {result.score} / {result.total}
            </bdi>
            . الدليل يُحمّل الآن في ملف منفصل بعد التحقق من كلمة المرور.
          </p>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
          <En52>KEY</En52>
        </span>
      </div>
      {loadError && (
        <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-bold text-rose-700" role="alert">
          {loadError}{" "}
          <button type="button" className="rounded-lg bg-slate-900 px-3 py-1 text-white" onClick={retryGuide}>
            أعد المحاولة
          </button>
        </p>
      )}
      {loading && !Guide && <p className="mt-3 text-slate-500">جارٍ تحميل الدليل…</p>}
      {Guide ? (
        <div className="mt-4">
          <Guide result={result} />
        </div>
      ) : null}
    </section>
  );
}
