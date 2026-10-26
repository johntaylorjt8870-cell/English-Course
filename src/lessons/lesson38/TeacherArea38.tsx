import { Suspense, lazy, useState } from "react";
import { ActionButton38, FOCUS_38, FinishLine38 } from "./kit38";

const TeacherGuide38 = lazy(() => import("./TeacherGuide38"));
const TEACHER_PASSWORD_38 = "somer173";

export default function TeacherArea38({
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
      <Suspense
        fallback={
          <div role="status" className="rounded-2xl border border-[#d4c4a0] bg-white p-4 text-sm font-bold text-[#3d4a5c]">
            جارٍ تحميل دليل المعلم…
          </div>
        }
      >
        <TeacherGuide38 onGoSolutions={onGoSolutions} onLock={() => onUnlockChange(false)} />
      </Suspense>
    );
  }

  return (
    <form
      data-area="lesson38-teacher"
      onSubmit={(event) => {
        event.preventDefault();
        if (password === TEACHER_PASSWORD_38) {
          setPassword("");
          setError("");
          onUnlockChange(true);
        } else {
          setError("كلمة المرور غير صحيحة.");
        }
      }}
      className="mx-auto max-w-xl space-y-3 rounded-3xl border border-[#d4c4a0] bg-white p-5 shadow-sm"
    >
      <FinishLine38 label="TEACHER" />
      <div>
        <p className="fp38-eyebrow mt-2">Teacher Area · Lesson 38</p>
        <h2 className="mt-1 text-xl font-black text-[#122033]">منطقة المعلم</h2>
        <p className="mt-2 text-sm leading-7 text-[#3d4a5c]">
          مساحة منفصلة عن الطالب والاختبار والحلول، وتضم: خريطة تغطية الأقسام الـ36، مفاتيح التدريبات والقراءة والحوارين، حلول الاختبار الـ25
          بشرح القاعدة وسبب الخطأ، ومرجع القواعد وملاحظات دقة المصدر.
        </p>
      </div>
      <label htmlFor="l38-teacher-password" className="block text-sm font-black text-[#122033]">
        كلمة مرور المعلم
      </label>
      <input
        id="l38-teacher-password"
        type="password"
        dir="ltr"
        autoComplete="off"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "l38-teacher-error" : undefined}
        className={`${FOCUS_38} w-full rounded-xl border border-[#c9b88a] bg-white px-3 py-2.5 text-base text-[#122033]`}
      />
      {error ? (
        <p id="l38-teacher-error" role="alert" className="text-sm font-black text-[#a41c36]">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <ActionButton38 type="submit">دخول المعلم</ActionButton38>
        <ActionButton38 variant="secondary" onClick={onGoSolutions}>
          منطقة الحلول
        </ActionButton38>
      </div>
      <p className="text-xs leading-5 text-[#4a5568]">لا تظهر الحلول الرسمية قبل اجتياز بوابة المعلم أو تسليم الطالب للاختبار.</p>
    </form>
  );
}
