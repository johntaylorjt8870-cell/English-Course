import { useEffect, useRef, useState } from "react";
import type { GradedTestResult49 } from "./testKey49";
import type { TeacherGuideProps49 } from "./TeacherGuide49";
import { retryModuleUrl49 } from "./retry49";
import { En49 } from "./kit49";

const PASSWORD = "somer173";
export function isTeacherPassword49(value: string): boolean {
  return value.trim() === PASSWORD;
}

type LoadedGuide = { default: React.ComponentType<TeacherGuideProps49> };

let recoveredGuide49: { url: string } | "retry-entry" | null = null;
async function defaultGuideLoader49(previousError?: unknown, attempt = 0): Promise<LoadedGuide> {
  if (recoveredGuide49 === "retry-entry") return import("./TeacherGuide49?retry") as Promise<LoadedGuide>;
  if (recoveredGuide49) {
    try {
      return (await import(/* @vite-ignore */ recoveredGuide49.url)) as LoadedGuide;
    } catch {
      recoveredGuide49 = null;
    }
  }
  if (!previousError) return import("./TeacherGuide49");
  const url = retryModuleUrl49(previousError, "TeacherGuide49", attempt);
  if (url) {
    const guide = (await import(/* @vite-ignore */ url)) as LoadedGuide;
    recoveredGuide49 = { url };
    return guide;
  }
  const guide = (await import("./TeacherGuide49?retry")) as LoadedGuide;
  recoveredGuide49 = "retry-entry";
  return guide;
}

export function TeacherArea49({
  result,
  loader,
  unlocked: unlockedProp,
  onUnlock,
}: {
  result: GradedTestResult49;
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
          const moduleValue = loader ? await loader() : await defaultGuideLoader49(lastError, attempt);
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
    if (isTeacherPassword49(password)) {
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
      <section className="l49-teacher l49-teacher--locked" id="l49-teacher" data-teacher-locked>
        <div className="l49-teacher-note">
          <span className="l49-teacher-stamp" aria-hidden="true">
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
        <ul className="l49-teacher-features">
          <li>مفتاح الأسئلة الخمسة والعشرين، مع شرح كل إجابة.</li>
          <li>البدائل المقبولة، وأسباب رفض الصيغ النحوية الخاطئة.</li>
          <li>ملاحظات بيداغوجية على السؤالين 3 و4 في التصحيح.</li>
        </ul>
        <form className="l49-teacher-form" onSubmit={submitPassword}>
          <label htmlFor="l49-teacher-password">كلمة مرور المعلّم</label>
          <div className="l49-teacher-row">
            <input
              id="l49-teacher-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={wrong}
              aria-describedby={wrong ? "l49-teacher-error" : undefined}
            />
            <button type="submit" className="l49-button l49-button--dark">
              فتح الدليل
            </button>
          </div>
          {wrong && (
            <p className="l49-teacher-error" id="l49-teacher-error" role="alert">
              كلمة المرور غير صحيحة.
            </p>
          )}
        </form>
      </section>
    );
  }

  return (
    <section className="l49-teacher" id="l49-teacher" data-teacher-open>
      <div className="l49-teacher-head">
        <div>
          <span className="l49-mini-label">TEACHER SPACE</span>
          <h2>دليل المعلم — الدرس 49</h2>
          <p>
            نتيجتك الحالية: <bdi dir="ltr">{result.score} / {result.total}</bdi>. الدليل يُحمّل الآن في ملف منفصل بعد
            التحقق من كلمة المرور.
          </p>
        </div>
        <span className="l49-teacher-stamp" aria-hidden="true">
          <En49>KEY</En49>
        </span>
      </div>
      {loadError && (
        <p className="l49-test-error" role="alert">
          {loadError}{" "}
          <button type="button" className="l49-text-button" onClick={retryGuide}>
            أعد المحاولة
          </button>
        </p>
      )}
      {loading && !Guide && <p className="l49-teacher-loading">جارٍ تحميل الدليل…</p>}
      {Guide ? <Guide result={result} /> : null}
    </section>
  );
}
