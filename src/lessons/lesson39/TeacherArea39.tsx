import { lazy, Suspense, useState } from "react";
import { ActionButton39, FOCUS_39 } from "./kit39";

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
      <Suspense
        fallback={
          <div role="status" className="rounded-2xl border border-[#d8d2c5] bg-white p-4 text-[#24343b]">
            جارٍ تحميل دليل المعلم…
          </div>
        }
      >
        <TeacherGuide39 onGoSolutions={onGoSolutions} onLock={() => onUnlockChange(false)} />
      </Suspense>
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
      className="mx-auto max-w-lg space-y-4 rounded-3xl border border-[#d8d2c5] bg-white p-5 shadow-sm"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">Teacher Area · Lesson 39</p>
        <h2 className="mt-1 text-xl font-black text-[#17354a]">منطقة المعلم</h2>
        <p className="mt-2 text-sm leading-6 text-[#43575a]">
          مساحة منفصلة عن الطالب والاختبار والحلول، وتضم: خريطة تغطية الأقسام الـ39 وملخص الفحص الآلي، مفاتيح التدريبات والقراءة
          والحوارين، حلول الاختبار الـ25 بمعايير التصحيح، ومرجع القواعد والمفاهيم الخاطئة وملاحظات دقة المصدر، وإرشاد تصحيح مهمة الكتابة.
        </p>
      </div>
      <label htmlFor="l39-teacher-password" className="block text-sm font-black text-[#24343b]">
        كلمة مرور المعلم
      </label>
      <input
        id="l39-teacher-password"
        type="password"
        dir="ltr"
        autoComplete="off"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "l39-teacher-error" : undefined}
        className={`${FOCUS_39} w-full rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-base text-[#24343b]`}
      />
      {error ? (
        <p id="l39-teacher-error" role="alert" className="text-sm font-black text-[#8d3832]">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <ActionButton39 type="submit">دخول المعلم</ActionButton39>
        <ActionButton39 variant="secondary" onClick={onGoSolutions}>
          منطقة الحلول
        </ActionButton39>
      </div>
      <p className="text-xs leading-5 text-[#53676a]">
        لا تظهر الحلول الرسمية قبل اجتياز بوابة المعلم أو تسليم الطالب للاختبار. آلية الدخول نفسها المستخدمة في بقية الدروس — لم تُضف كلمة
        مرور جديدة.
      </p>
    </form>
  );
}
