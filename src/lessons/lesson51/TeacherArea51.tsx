import { useEffect, useRef, useState } from "react";
import type { GradedTestResult51 } from "./testKey51";
import type { TeacherGuideProps51 } from "./TeacherGuide51";
import { retryModuleUrl51 } from "./retry51";
import { En51 } from "./kit51";

const PASSWORD = "somer173";
export function isTeacherPassword51(value: string): boolean {
  return value.trim() === PASSWORD;
}

type LoadedGuide = { default: React.ComponentType<TeacherGuideProps51> };

let recoveredGuide51: { url: string } | "retry-entry" | null = null;
async function defaultGuideLoader51(previousError?: unknown, attempt = 0): Promise<LoadedGuide> {
  if (recoveredGuide51 === "retry-entry") return import("./TeacherGuide51?retry") as Promise<LoadedGuide>;
  if (recoveredGuide51) {
    try {
      return (await import(/* @vite-ignore */ recoveredGuide51.url)) as LoadedGuide;
    } catch {
      recoveredGuide51 = null;
    }
  }
  if (!previousError) return import("./TeacherGuide51");
  const url = retryModuleUrl51(previousError, "TeacherGuide51", attempt);
  if (url) {
    const guide = (await import(/* @vite-ignore */ url)) as LoadedGuide;
    recoveredGuide51 = { url };
    return guide;
  }
  const guide = (await import("./TeacherGuide51?retry")) as LoadedGuide;
  recoveredGuide51 = "retry-entry";
  return guide;
}

export function TeacherArea51({
  result,
  loader,
  unlocked: unlockedProp,
  onUnlock,
}: {
  result: GradedTestResult51;
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
          const moduleValue = loader ? await loader() : await defaultGuideLoader51(lastError, attempt);
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
    if (isTeacherPassword51(password)) {
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
      <section className="l51-teacher l51-teacher--locked" id="l51-teacher" data-teacher-locked>
        <div className="l51-teacher-note">
          <span className="l51-teacher-stamp" aria-hidden="true">
            🔒
          </span>
          <div>
            <h2>مساحة المعلّم</h2>
            <p>
              هذه المساحة تُعرض بعد التسليم فقط، وتحتوي مفتاح التصحيح الكامل والبدائل والملاحظات البيداغوجية. احمِها بكلمة
              مرور المعلّم المعتادة.
            </p>
          </div>
        </div>
        <ul className="l51-teacher-features">
          <li>مفتاح الأسئلة الخمسة والعشرين، مع شرح كل إجابة.</li>
          <li>البدائل المقبولة في الترجمة والتصحيح، وأسباب الرفض.</li>
          <li>ملاحظة السؤال 18 ذي التصحيحين، وملاحظات تدريبات الشرط الصفري.</li>
        </ul>
        <form className="l51-teacher-form" onSubmit={submitPassword}>
          <label htmlFor="l51-teacher-password">كلمة مرور المعلّم</label>
          <div className="l51-teacher-row">
            <input
              id="l51-teacher-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={wrong}
              aria-describedby={wrong ? "l51-teacher-error" : undefined}
            />
            <button type="submit" className="l51-button l51-button--dark">
              فتح الدليل
            </button>
          </div>
          {wrong && (
            <p className="l51-teacher-error" id="l51-teacher-error" role="alert">
              كلمة المرور غير صحيحة.
            </p>
          )}
        </form>
      </section>
    );
  }

  return (
    <section className="l51-teacher" id="l51-teacher" data-teacher-open>
      <div className="l51-teacher-head">
        <div>
          <span className="l51-mini-label">TEACHER SPACE</span>
          <h2>دليل المعلم — الدرس 51</h2>
          <p>
            نتيجتك الحالية: <bdi dir="ltr">{result.score} / {result.total}</bdi>. الدليل يُحمّل الآن في ملف منفصل بعد
            التحقق من كلمة المرور.
          </p>
        </div>
        <span className="l51-teacher-stamp" aria-hidden="true">
          <En51>KEY</En51>
        </span>
      </div>
      {loadError && (
        <p className="l51-test-error" role="alert">
          {loadError}{" "}
          <button type="button" className="l51-text-button" onClick={retryGuide}>
            أعد المحاولة
          </button>
        </p>
      )}
      {loading && !Guide && <p className="l51-teacher-loading">جارٍ تحميل الدليل…</p>}
      {Guide ? <Guide result={result} /> : null}
    </section>
  );
}
