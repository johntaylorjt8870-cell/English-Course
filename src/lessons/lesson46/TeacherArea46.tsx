import { useEffect, useRef, useState, type ComponentType } from "react";
import { En46 } from "./kit46";
import { retryModuleUrl46 } from "./retry46";
import type { GradedTestResult46 } from "./testKey46";

type Guide46 = ComponentType<{ result: GradedTestResult46 }>;
type GuideModule46 = { default: Guide46 };
export type GuideLoader46 = (retry: boolean, previousError?: unknown, attempt?: number) => Promise<GuideModule46>;
const loadGuide46: GuideLoader46 = (retry, previousError, attempt = 0) => {
  if (!retry) return import("./TeacherGuide46");
  const url = retryModuleUrl46(previousError, "TeacherGuide46", attempt);
  return url ? import(/* @vite-ignore */ url) as Promise<GuideModule46>
    : import("./TeacherGuide46?retry") as unknown as Promise<GuideModule46>;
};
// The existing project-wide teacher gate is a client-side presentation gate.
const TEACHER_PASSWORD_46 = "somer173";

export default function TeacherArea46({ result, unlocked, onUnlock, onLock, loader = loadGuide46 }: {
  result: GradedTestResult46 | null;
  unlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
  loader?: GuideLoader46;
}) {
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const lastError = useRef<unknown>(null);
  const [Guide, setGuide] = useState<Guide46 | null>(null);
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
    <section className="l46-teacher" data-area="teacher">
      <div className="l46-teacher-heading"><span aria-hidden="true">⌑</span><div><En46>TEACHER'S SPACE</En46><h2>دليل المعلم · الدرس 46</h2></div></div>
      <p>بوابة عرض تعمل في المتصفح فقط، وليست حماية خادمية لمحتوى الموقع الثابت.</p>
      {!result ? (
        <div className="l46-note" data-teacher-locked><span aria-hidden="true">🔒</span><p>سلّم الاختبار أولًا؛ بعدها يمكن للمعلم فتح الدليل. لن يُحمّل مفتاح الاختبار قبل التسليم.</p></div>
      ) : !unlocked ? (
        <form className="l46-teacher-form" onSubmit={(event) => {
          event.preventDefault();
          if (password.trim() === TEACHER_PASSWORD_46) { setPassword(""); setWrong(false); onUnlock(); }
          else setWrong(true);
        }}>
          <label htmlFor="l46-teacher-password">كلمة مرور فضاء المعلم</label>
          <input id="l46-teacher-password" type="password" dir="ltr" autoComplete="off" value={password} onChange={(event) => { setPassword(event.target.value); setWrong(false); }} />
          <button type="submit" className="l46-button l46-button--dark">فتح المساحة</button>
          {wrong && <p role="alert">كلمة المرور غير صحيحة؛ المساحة ما زالت مقفلة.</p>}
        </form>
      ) : (
        <div className="l46-teacher-open">
          <div className="l46-teacher-actions"><span>المساحة مفتوحة · الحلول والتعليلات</span><button type="button" className="l46-button l46-button--outline" onClick={onLock}>قفل المساحة</button></div>
          {status === "loading" && <p role="status">جارٍ تحميل دليل المعلم…</p>}
          {status === "error" && <div role="alert" data-teacher-error className="l46-feedback is-retry"><p>تعذّر تحميل الدليل. إجابات الطالب ونتيجته محفوظتان.</p><button type="button" className="l46-button l46-button--outline" onClick={() => setAttempt((n) => n + 1)}>إعادة المحاولة</button></div>}
          {status === "idle" && Guide && <Guide result={result} />}
        </div>
      )}
    </section>
  );
}
