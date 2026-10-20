import { lazy, Suspense, useState } from "react";
import { ActionButton36, FOCUS_36 } from "./kit36";

const TeacherGuide36 = lazy(() => import("./TeacherGuide36"));
const TEACHER_PASSWORD_36 = "somer173";

export default function TeacherArea36({ unlocked, onUnlockChange, onGoSolutions }: { unlocked: boolean; onUnlockChange: (value: boolean) => void; onGoSolutions: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (unlocked) {
    return (
      <Suspense fallback={<div role="status" className="rounded-2xl border border-[#e2e8f0] bg-white p-4 text-[#334155]">جارٍ تحميل دليل المعلم…</div>}>
        <TeacherGuide36 onGoSolutions={onGoSolutions} onLock={() => onUnlockChange(false)} />
      </Suspense>
    );
  }

  return (
    <form data-area="lesson36-teacher" onSubmit={(event) => {
      event.preventDefault();
      if (password === TEACHER_PASSWORD_36) {
        setPassword("");
        setError("");
        onUnlockChange(true);
      } else {
        setError("كلمة المرور غير صحيحة.");
      }
    }} className="mx-auto max-w-lg space-y-4 rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
      <div>
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#64748b]">Teacher Area · Lesson 36</p>
        <h2 className="mt-1 text-xl font-black text-[#115e59]">منطقة المعلم</h2>
        <p className="mt-2 text-sm leading-6 text-[#475569]">هذه المساحة منفصلة عن الطالب والاختبار والحلول، وتضم دليلًا منظمًا، خريطة تغطية الأقسام، مفاتيح التدريب، وملاحظات التصحيح المقبول.</p>
      </div>
      <label htmlFor="l36-teacher-password" className="block text-sm font-black text-[#334155]">كلمة مرور المعلم</label>
      <input id="l36-teacher-password" type="password" dir="ltr" autoComplete="off" value={password} onChange={(event) => setPassword(event.currentTarget.value)} aria-invalid={error ? true : undefined} aria-describedby={error ? "l36-teacher-error" : undefined} className={`${FOCUS_36} w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2.5 text-base text-[#334155]`} />
      {error ? <p id="l36-teacher-error" role="alert" className="text-sm font-black text-[#8d3832]">{error}</p> : null}
      <div className="flex flex-wrap gap-2">
        <ActionButton36 type="submit">دخول المعلم</ActionButton36>
        <ActionButton36 variant="secondary" onClick={onGoSolutions}>منطقة الحلول</ActionButton36>
      </div>
      <p className="text-xs leading-5 text-[#64748b]">الإجابات الرسمية لا تظهر هنا قبل اجتياز بوابة المعلم؛ وفي حساب الطالب لا تُفتح الحلول إلا بعد تسليم الاختبار.</p>
    </form>
  );
}
