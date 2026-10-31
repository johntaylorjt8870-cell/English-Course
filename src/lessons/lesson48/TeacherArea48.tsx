import { useEffect, useRef, useState, type ComponentType } from "react";
import { En48 } from "./kit48";
import { retryModuleUrl48 } from "./retry48";
import type { GradedTestResult48 } from "./testKey48";

type Guide48 = ComponentType<{ result: GradedTestResult48 }>;
type GuideModule48 = { default: Guide48 };
export type GuideLoader48 = (retry: boolean, previousError?: unknown, attempt?: number) => Promise<GuideModule48>;
const loadGuide48: GuideLoader48 = (retry, previousError, attempt = 0) => {
  if (!retry) return import("./TeacherGuide48");
  const url = retryModuleUrl48(previousError, "TeacherGuide48", attempt);
  return url
    ? (import(/* @vite-ignore */ url) as Promise<GuideModule48>)
    : (import("./TeacherGuide48?retry") as unknown as Promise<GuideModule48>);
};
// The project's existing teacher gate is a client-side presentation gate; this
// lesson reuses the same password as Lessons 46 and 47 rather than inventing a
// second policy.
const TEACHER_PASSWORD_48 = "somer173";

export default function TeacherArea48({
  result,
  unlocked,
  onUnlock,
  onLock,
  loader = loadGuide48,
}: {
  result: GradedTestResult48 | null;
  unlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
  loader?: GuideLoader48;
}) {
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const lastError = useRef<unknown>(null);
  const [Guide, setGuide] = useState<Guide48 | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (!unlocked || !result) return;
    let active = true;
    setStatus("loading");
    loader(attempt > 0, lastError.current, attempt)
      .then((module) => {
        if (active) {
          setGuide(() => module.default);
          setStatus("idle");
        }
      })
      .catch((error) => {
        if (active) {
          lastError.current = error;
          setStatus("error");
        }
      });
    return () => {
      active = false;
    };
  }, [unlocked, result, attempt, loader]);

  return (
    <section className="l48-teacher" data-area="teacher">
      <div className="l48-teacher-heading">
        <span aria-hidden="true">🧑‍🏫</span>
        <div>
          <En48>TEACHER&rsquo;S SPACE</En48>
          <h2>دليل المعلم · الدرس 48</h2>
        </div>
      </div>
      <p>بوابة عرض تعمل في المتصفح فقط، وليست حماية خادمية لمحتوى الموقع الثابت.</p>
      {!result ? (
        <div className="l48-note" data-teacher-locked>
          <span className="l48-note-icon" aria-hidden="true">
            🔒
          </span>
          <p>سلّم الاختبار أولًا؛ بعدها يمكن للمعلم فتح الدليل. لن يُحمّل مفتاح الاختبار قبل التسليم.</p>
        </div>
      ) : !unlocked ? (
        <form
          className="l48-teacher-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (password.trim() === TEACHER_PASSWORD_48) {
              setPassword("");
              setWrong(false);
              onUnlock();
            } else setWrong(true);
          }}
        >
          <label htmlFor="l48-teacher-password">كلمة مرور فضاء المعلم</label>
          <input
            id="l48-teacher-password"
            type="password"
            dir="ltr"
            autoComplete="off"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setWrong(false);
            }}
          />
          <button type="submit" className="l48-button l48-button--dark">
            فتح المساحة
          </button>
          {wrong && <p role="alert">كلمة المرور غير صحيحة؛ المساحة ما زالت مقفلة.</p>}
        </form>
      ) : (
        <div className="l48-teacher-open">
          <div className="l48-teacher-actions">
            <span>المساحة مفتوحة · الحلول والتعليلات</span>
            <button type="button" className="l48-button l48-button--outline" onClick={onLock}>
              قفل المساحة
            </button>
          </div>
          {status === "loading" && <p role="status">جارٍ تحميل دليل المعلم…</p>}
          {status === "error" && (
            <div role="alert" data-teacher-error className="l48-feedback is-retry">
              <p>تعذّر تحميل الدليل. إجابات الطالب ونتيجته محفوظتان.</p>
              <button type="button" className="l48-button l48-button--outline" onClick={() => setAttempt((n) => n + 1)}>
                إعادة المحاولة
              </button>
            </div>
          )}
          {status === "idle" && Guide && <Guide result={result} />}
        </div>
      )}
    </section>
  );
}
