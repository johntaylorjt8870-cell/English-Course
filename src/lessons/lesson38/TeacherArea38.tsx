import { lazy, Suspense, useState } from "react";
import { ActionButton38, FOCUS_38 } from "./kit38";

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
          <div role="status" className="rounded-2xl border border-[#d8d2c5] bg-white p-4 text-[#24343b]">
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
      className="mx-auto max-w-lg space-y-4 rounded-3xl border border-[#d8d2c5] bg-white p-5 shadow-sm"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">Teacher Area · Lesson 38</p>
        <h2 className="mt-1 text-xl font-black text-[#17354a]">منطقة المعلم</h2>
        <p className="mt-2 text-sm leading-6 text-[#43575a]">
          مساحة منفصلة عن الطالب والاختبار والحلول، وتضم: خريطة تغطية الأقسام الـ36، مفاتيح التدريبات والقراءة والحوار، حلول الاختبار الـ25
          بمعايير التصحيح، ومرجع القواعد وملاحظات دقة المصدر.
        </p>
      </div>
      <label htmlFor="l38-teacher-password" className="block text-sm font-black text-[#24343b]">
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
        className={`${FOCUS_38} w-full rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-base text-[#24343b]`}
      />
      {error ? (
        <p id="l38-teacher-error" role="alert" className="text-sm font-black text-[#8d3832]">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <ActionButton38 type="submit">دخول المعلم</ActionButton38>
        <ActionButton38 variant="secondary" onClick={onGoSolutions}>
          منطقة الحلول
        </ActionButton38>
      </div>
      <p className="text-xs leading-5 text-[#53676a]">
        لا تظهر الحلول الرسمية قبل اجتياز بوابة المعلم أو تسليم الطالب للاختبار.
      </p>
    </form>
  );
}
