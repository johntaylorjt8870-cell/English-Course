import { lazy, Suspense, useState } from "react";
import { ActionButton37, FOCUS_37 } from "./kit37";

const TeacherGuide37 = lazy(() => import("./TeacherGuide37"));
const TEACHER_PASSWORD_37 = "somer173";

export default function TeacherArea37({
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
          <div role="status" className="rounded-2xl border border-[#b8dff0] bg-white p-4 text-[#17384a]">
            جارٍ تحميل دليل المعلم…
          </div>
        }
      >
        <TeacherGuide37 onGoSolutions={onGoSolutions} onLock={() => onUnlockChange(false)} />
      </Suspense>
    );
  }

  return (
    <form
      data-area="lesson37-teacher"
      onSubmit={(event) => {
        event.preventDefault();
        if (password === TEACHER_PASSWORD_37) {
          setPassword("");
          setError("");
          onUnlockChange(true);
        } else {
          setError("كلمة المرور غير صحيحة.");
        }
      }}
      className="mx-auto max-w-lg space-y-4 rounded-3xl border border-[#b8dff0] bg-white p-5 shadow-sm"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">Teacher Area · Lesson 37</p>
        <h2 className="mt-1 text-xl font-black text-[#084765]">منطقة المعلم</h2>
        <p className="mt-2 text-sm leading-6 text-[#3e5d70]">
          مساحة منفصلة عن الطالب والاختبار والحلول، وتضم: خريطة تغطية الأقسام الـ38، مفاتيح التدريبات والقراءة والحوار، حلول الاختبار الـ25
          بمعايير التصحيح، ومرجع القواعد وملاحظات دقة المصدر.
        </p>
      </div>
      <label htmlFor="l37-teacher-password" className="block text-sm font-black text-[#17384a]">
        كلمة مرور المعلم
      </label>
      <input
        id="l37-teacher-password"
        type="password"
        dir="ltr"
        autoComplete="off"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "l37-teacher-error" : undefined}
        className={`${FOCUS_37} w-full rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-base text-[#17384a]`}
      />
      {error ? (
        <p id="l37-teacher-error" role="alert" className="text-sm font-black text-[#943c31]">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <ActionButton37 type="submit">دخول المعلم</ActionButton37>
        <ActionButton37 variant="secondary" onClick={onGoSolutions}>
          منطقة الحلول
        </ActionButton37>
      </div>
      <p className="text-xs leading-5 text-[#4b6a7d]">
        لا تظهر الحلول الرسمية قبل اجتياز بوابة المعلم أو تسليم الطالب للاختبار.
      </p>
    </form>
  );
}
