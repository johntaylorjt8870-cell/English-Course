import { Suspense, lazy, useState } from "react";
import { Text43, Tip43, Panel43 } from "./design43";
export const TEACHER_PASSWORD_43 = "somer173";


/**
 * مساحة المعلم — محجوبة بكلمة مرور. يتحقق المعلم أولًا، ثم يُحمّل
 * دليل المعلم التفصيلي (TeacherGuide43) عند الطلب فقط.
 */
const LazyTeacherGuide = lazy(() => import("./TeacherGuide43"));

/**
 * مساحة المعلم — محجوبة بكلمة مرور. يتحقق المعلم أولًا، ثم يُحمّل
 * دليل المعلم التفصيلي (TeacherGuide43) عند الطلب فقط.
 */
export default function TeacherArea43() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const unlock = () => {
    if (value.trim() !== TEACHER_PASSWORD_43) {
      setError("كلمة المرور غير صحيحة.");
      return;
    }
    setError("");
    setUnlocked(true);
  };

  if (unlocked) {
    return (
      <Suspense
        fallback={
          <p role="status" className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 text-sm font-bold text-slate-500">
            <Text43 text="جارٍ تحميل دليل المعلم…" />
          </p>
        }
      >
        <LazyTeacherGuide />
      </Suspense>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <Panel43 title="المساحة الموجهة للمعلم" kicker="TEACHER · PASSWORD PROTECTED">
        <p className="text-base font-bold text-slate-700">
          <Text43 text="هذه المساحة مخصصة للمعلم فقط. أدخل كلمة المرور لفتح دليل المعلم ومخطط التدريس." />
        </p>
        <label className="mt-3 block text-sm font-bold text-slate-600">
          <Text43 text="كلمة المرور" />
          <input
            type="password"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") void unlock();
            }}
            className="font-en mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-base font-medium text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white"
          />
        </label>
        {error && (
          <p role="alert" className="mt-2 text-sm font-bold text-rose-700">
            {error}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void unlock()}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
          >
            <Text43 text="فتح المساحة" />
          </button>
        </div>
        <Tip43>
          <Text43 text="التحقق يحدث في المستعرض (الواجهة الطالب)، وهو حاجز عملي يمنع الوصول إلى دليل المعلم من دون كلمة المرور — وليس فحصًا أمنيًا خادميًا." />
        </Tip43>
      </Panel43>
    </div>
  );
}
