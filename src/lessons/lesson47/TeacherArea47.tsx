import { useEffect, useRef, useState, type ComponentType } from "react";
import { En47 } from "./kit47";
import { retryModuleUrl47 } from "./retry47";
import type { GradedTestResult47 } from "./testKey47";

type Guide47 = ComponentType<{ result: GradedTestResult47 }>;
type GuideModule47 = { default: Guide47 };
export type GuideLoader47 = (retry: boolean, previousError?: unknown, attempt?: number) => Promise<GuideModule47>;
const loadGuide47: GuideLoader47 = (retry, previousError, attempt = 0) => {
  if (!retry) return import("./TeacherGuide47");
  const url = retryModuleUrl47(previousError, "TeacherGuide47", attempt);
  return url ? import(/* @vite-ignore */ url) as Promise<GuideModule47>
    : import("./TeacherGuide47?retry") as unknown as Promise<GuideModule47>;
};
// The existing project-wide teacher gate is a client-side presentation gate.
const TEACHER_PASSWORD_47 = "somer173";

export default function TeacherArea47({ result, unlocked, onUnlock, onLock, loader = loadGuide47 }: {
  result: GradedTestResult47 | null;
  unlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
  loader?: GuideLoader47;
}) {
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const lastError = useRef<unknown>(null);
  const [Guide, setGuide] = useState<Guide47 | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (!unlocked || !result) return;
    let active = true;
    setStatus("loading");
    loader(attempt > 0, lastError.current, attempt).then((module) => {
      if (active) { setGuide(() => module.default); setStatus("idle"); }
    }).catch((error) => { if (active) { lastError.current = error; setStatus("error"); } });
    return () => { active = false; };
  }, [unlocked, result, attempt, loader]);

  return (
    <section className="l47-teacher" data-area="teacher">
      <div className="l47-teacher-heading">
        <span aria-hidden="true">🧑‍🏫</span>
        <div>
          <En47>TEACHER&rsquo;S SPACE</En47>
          <h2>دليل المعلم · الدرس 47</h2>
        </div>
      </div>
      <p>بوابة عرض تعمل في المتصفح فقط، وليست حماية خادمية لمحتوى الموقع الثابت.</p>
      {!result ? (
        <div className="l47-note" data-teacher-locked>
          <span className="l47-note-icon" aria-hidden="true">🔒</span>
          <p>سلّم الاختبار أولًا؛ بعدها يمكن للمعلم فتح الدليل. لن يُحمّل مفتاح الاختبار قبل التسليم.</p>
        </div>
      ) : !unlocked ? (
        <form
          className="l47-teacher-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (password.trim() === TEACHER_PASSWORD_47) { setPassword(""); setWrong(false); onUnlock(); }
            else setWrong(true);
          }}
        >
          <label htmlFor="l47-teacher-password">كلمة مرور فضاء المعلم</label>
          <input id="l47-teacher-password" type="password" dir="ltr" autoComplete="off" value={password} onChange={(event) => { setPassword(event.target.value); setWrong(false); }} />
          <button type="submit" className="l47-button l47-button--dark">فتح المساحة</button>
          {wrong && <p role="alert">كلمة المرور غير صحيحة؛ المساحة ما زالت مقفلة.</p>}
        </form>
      ) : (
        <div className="l47-teacher-open">
          <div className="l47-teacher-actions">
            <span>المساحة مفتوحة · الحلول والتعليلات</span>
            <button type="button" className="l47-button l47-button--outline" onClick={onLock}>قفل المساحة</button>
          </div>
          {status === "loading" && <p role="status">جارٍ تحميل دليل المعلم…</p>}
          {status === "error" && (
            <div role="alert" data-teacher-error className="l47-feedback is-retry">
              <p>تعذّر تحميل الدليل. إجابات الطالب ونتيجته محفوظتان.</p>
              <button type="button" className="l47-button l47-button--outline" onClick={() => setAttempt((n) => n + 1)}>إعادة المحاولة</button>
            </div>
          )}
          {status === "idle" && Guide && <Guide result={result} />}
        </div>
      )}
    </section>
  );
}
