import { lazy, Suspense, useState } from "react";
import { ActionButton39, PlatformNote39, FOCUS_39 } from "./kit39";

const TeacherGuide39 = lazy(() => import("./TeacherGuide39"));
const TEACHER_PASSWORD_39 = "somer173";

export default function TeacherArea39({
  unlocked,
  onUnlockChange,
  onGoSolutions,
}: {
  unlocked: boolean;
  onUnlockChange: (value: boolean) => void;
  onGoSolutions: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (unlocked) {
    return (
      <div className="obs-teacher-shell space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="obs-eyebrow">TEACHER CONSOLE</p>
          <div className="flex flex-wrap gap-2">
            <ActionButton39 variant="secondary" onClick={onGoSolutions}>
              منطقة الحلول
            </ActionButton39>
            <ActionButton39 variant="ghost" onClick={() => onUnlockChange(false)}>
              قفل مساحة المعلم
            </ActionButton39>
          </div>
        </div>
        <div className="obs-doc-light">
          <Suspense
            fallback={
              <p role="status" className="p-4 text-sm font-bold text-[#24343b]">
                جارٍ تحميل دليل المعلم…
              </p>
            }
          >
            <TeacherGuide39 onGoSolutions={onGoSolutions} onLock={() => onUnlockChange(false)} />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <form
      data-area="lesson39-teacher"
      onSubmit={(event) => {
        event.preventDefault();
        if (password === TEACHER_PASSWORD_39) {
          setPassword("");
          setError("");
          onUnlockChange(true);
        } else {
          setError("كلمة المرور غير صحيحة.");
        }
      }}
      className="obs-panel mx-auto max-w-xl space-y-3"
    >
      <div>
        <p className="obs-eyebrow">TEACHER AREA · LESSON 39</p>
        <h2 className="obs-panel-title">منطقة المعلم</h2>
        <p className="obs-nuance leading-7">
          مساحة منفصلة عن الطالب والاختبار والحلول، وتضم: خريطة تغطية الأقسام الـ39، مفاتيح التدريبات والقراءة
          والحوارين، حلول الاختبار الـ25 بشرح القاعدة وسبب الخطأ، مرجع المفاهيم الخاطئة، وإرشاد تصحيح مهمة الكتابة.
        </p>
      </div>
      <label htmlFor="l39-teacher-password" className="obs-field">
        <span>كلمة مرور المعلم</span>
        <input
          id="l39-teacher-password"
          type="password"
          dir="ltr"
          autoComplete="off"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "l39-teacher-error" : undefined}
          className={`${FOCUS_39} obs-input font-en`}
        />
      </label>
      {error ? (
        <p id="l39-teacher-error" role="alert" className="obs-verdict is-bad">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <ActionButton39 type="submit">دخول المعلم</ActionButton39>
        <ActionButton39 variant="secondary" onClick={onGoSolutions}>
          منطقة الحلول
        </ActionButton39>
      </div>
      <PlatformNote39>
        لا تظهر الحلول الرسمية قبل اجتياز بوابة المعلم أو تسليم الطالب للاختبار. آلية الدخول نفسها المستخدمة في بقية
        الدروس، ولم تُضف كلمة مرور جديدة.
      </PlatformNote39>
    </form>
  );
}
