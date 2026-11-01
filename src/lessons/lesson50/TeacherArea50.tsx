import { useEffect, useRef, useState } from "react";
import type { GradedTestResult50 } from "./testKey50";
import type { TeacherGuideProps50 } from "./TeacherGuide50";
import { retryModuleUrl50 } from "./retry50";
import { En50 } from "./kit50";

const PASSWORD = "somer173";
export function isTeacherPassword50(value: string): boolean {
  return value.trim() === PASSWORD;
}

type LoadedGuide = { default: React.ComponentType<TeacherGuideProps50> };

let recoveredGuide50: { url: string } | "retry-entry" | null = null;
async function defaultGuideLoader50(previousError?: unknown, attempt = 0): Promise<LoadedGuide> {
  if (recoveredGuide50 === "retry-entry") return import("./TeacherGuide50?retry") as Promise<LoadedGuide>;
  if (recoveredGuide50) {
    try {
      return (await import(/* @vite-ignore */ recoveredGuide50.url)) as LoadedGuide;
    } catch {
      recoveredGuide50 = null;
    }
  }
  if (!previousError) return import("./TeacherGuide50");
  const url = retryModuleUrl50(previousError, "TeacherGuide50", attempt);
  if (url) {
    const guide = (await import(/* @vite-ignore */ url)) as LoadedGuide;
    recoveredGuide50 = { url };
    return guide;
  }
  const guide = (await import("./TeacherGuide50?retry")) as LoadedGuide;
  recoveredGuide50 = "retry-entry";
  return guide;
}

export function TeacherArea50({
  result,
  loader,
  unlocked: unlockedProp,
  onUnlock,
}: {
  result: GradedTestResult50;
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
          const moduleValue = loader ? await loader() : await defaultGuideLoader50(lastError, attempt);
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
    if (isTeacherPassword50(password)) {
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
      <section className="l50-teacher l50-teacher--locked" id="l50-teacher" data-teacher-locked>
        <div className="l50-teacher-note">
          <span className="l50-teacher-stamp" aria-hidden="true">
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
        <ul className="l50-teacher-features">
          <li>مفتاح الأسئلة الخمسة والعشرين، مع شرح كل إجابة.</li>
          <li>البدائل المقبولة في الترجمة والتصحيح، وأسباب الرفض.</li>
          <li>ملاحظة تدريب الاختيار الأول (التذكيرات الثلاثة) وملاحظة السؤال 17 ذي التصحيحين.</li>
        </ul>
        <form className="l50-teacher-form" onSubmit={submitPassword}>
          <label htmlFor="l50-teacher-password">كلمة مرور المعلّم</label>
          <div className="l50-teacher-row">
            <input
              id="l50-teacher-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={wrong}
              aria-describedby={wrong ? "l50-teacher-error" : undefined}
            />
            <button type="submit" className="l50-button l50-button--dark">
              فتح الدليل
            </button>
          </div>
          {wrong && (
            <p className="l50-teacher-error" id="l50-teacher-error" role="alert">
              كلمة المرور غير صحيحة.
            </p>
          )}
        </form>
      </section>
    );
  }

  return (
    <section className="l50-teacher" id="l50-teacher" data-teacher-open>
      <div className="l50-teacher-head">
        <div>
          <span className="l50-mini-label">TEACHER SPACE</span>
          <h2>دليل المعلم — الدرس 50</h2>
          <p>
            نتيجتك الحالية: <bdi dir="ltr">{result.score} / {result.total}</bdi>. الدليل يُحمّل الآن في ملف منفصل بعد
            التحقق من كلمة المرور.
          </p>
        </div>
        <span className="l50-teacher-stamp" aria-hidden="true">
          <En50>KEY</En50>
        </span>
      </div>
      {loadError && (
        <p className="l50-test-error" role="alert">
          {loadError}{" "}
          <button type="button" className="l50-text-button" onClick={retryGuide}>
            أعد المحاولة
          </button>
        </p>
      )}
      {loading && !Guide && <p className="l50-teacher-loading">جارٍ تحميل الدليل…</p>}
      {Guide ? <Guide result={result} /> : null}
    </section>
  );
}
