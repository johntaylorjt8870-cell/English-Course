import { lazy, Suspense, useState } from "react";
import { ActionButton36, Card36, FOCUS_36 } from "./kit36";

const TeacherGuide36 = lazy(() => import("./TeacherGuide36"));
const TEACHER_PASSWORD_36 = "somer173";

export default function TeacherArea36({
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
      <div data-area="l36-teacher">
        <Suspense fallback={<div role="status" className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-600">جارٍ تحميل دليل المعلم…</div>}>
          <TeacherGuide36 onGoSolutions={onGoSolutions} onLock={() => onUnlockChange(false)} />
        </Suspense>
      </div>
    );
  }

  return (
    <form
      data-area="l36-teacher"
      onSubmit={(event) => {
        event.preventDefault();
        if (password === TEACHER_PASSWORD_36) {
          setPassword("");
          setError("");
          onUnlockChange(true);
        } else {
          setError("كلمة المرور غير صحيحة.");
        }
      }}
      className="mx-auto max-w-lg space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div>
        <h2 className="font-head text-xl font-bold text-slate-900">منطقة المعلم</h2>
        <p className="mt-1 text-sm leading-7 text-slate-600">
          مساحة منفصلة تضم خريطة تغطية الدرس، مفاتيح التدريبات والقراءة، الحلول التفصيلية للاختبار، وملاحظات الدقة التعليمية.
        </p>
      </div>
      <label htmlFor="l36-teacher-password" className="block text-sm font-bold text-slate-800">كلمة مرور المعلم</label>
      <input
        id="l36-teacher-password"
        type="password"
        dir="ltr"
        autoComplete="off"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "l36-teacher-error" : undefined}
        className={`${FOCUS_36} w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900`}
      />
      {error ? (
        <p id="l36-teacher-error" role="alert" className="text-sm font-bold text-rose-800">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <ActionButton36 type="submit">دخول المعلم</ActionButton36>
        <ActionButton36 variant="secondary" onClick={onGoSolutions}>الحلول التفصيلية</ActionButton36>
      </div>
      <p className="text-xs leading-6 text-slate-500">لا تظهر الحلول الرسمية هنا قبل اجتياز البوابة؛ وفي حساب الطالب لا تُفتح الحلول إلا بعد تسليم الاختبار.</p>
    </form>
  );
}

export function TeacherLocked36() {
  return (
    <Card36 title="منطقة المعلم مقفلة">
      <p className="text-sm text-slate-600">تحتاج هذه المساحة إلى كلمة مرور المعلم.</p>
    </Card36>
  );
}
