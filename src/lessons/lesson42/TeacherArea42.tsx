import { lazy, Suspense, useState } from "react";
import { Text42 } from "./design42";

// نفس آلية بوابة المعلم المستخدمة في بقية الدروس (بوابة تربوية من جهة العميل).
// دليل المعلم والحلول تُحمَّل عند فتح البوابة فقط.
const TeacherGuide42 = lazy(() => import("./TeacherGuide42"));
export const TEACHER_PASSWORD_42 = "somer173";

// نموذج الحماية الفعلي، معروض في الحالتين: قبل فتح البوابة وبعده. البوابة
// فصلٌ تربوي من جهة العميل وليست أمانًا من جهة الخادم، ولا يجوز تقديمها على
// أنها كذلك للمعلم الذي يقرأ الحلول.
const SECURITY_NOTE_42 =
  "ملاحظة دقيقة: هذه بوابة تربوية من جهة العميل (client-side) تفصل المحتوى عن مسار الطالب وتحمله عند الطلب فقط. ليست أمانًا من جهة الخادم؛ من يستطيع قراءة الحزمة المبنية يستطيع الوصول إلى المفاتيح.";

function SecurityNote42() {
  return (
    <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-500">
      <Text42 text={SECURITY_NOTE_42} />
    </p>
  );
}

export function TeacherArea42({ unlocked, unlock, lock }: { unlocked: boolean; unlock: () => void; lock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  return (
    <section data-area="teacher" className="mx-auto max-w-4xl">
      {unlocked ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-sm font-bold text-emerald-900">
              <Text42 text="مساحة المعلم مفتوحة — الحلول التفصيلية ظاهرة." />
            </p>
            <button type="button" onClick={lock} className="rounded-xl border border-emerald-300 bg-white px-3 py-1.5 text-sm font-bold text-emerald-800">
              <Text42 text="قفل مساحة المعلم" />
            </button>
          </div>
          <SecurityNote42 />
          <Suspense
            fallback={
              <p role="status" className="rounded-2xl bg-white p-4 text-sm font-bold text-slate-500">
                <Text42 text="جارٍ تحميل دليل المعلم…" />
              </p>
            }
          >
            <TeacherGuide42 />
          </Suspense>
        </div>
      ) : (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-extrabold tracking-wide text-violet-700">TEACHER ACCESS</p>
          <h1 className="font-head mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            <Text42 text="بوابة المعلم المحمية" />
          </h1>
          <p className="mt-2 text-base leading-8 text-slate-600">
            <Text42 text="تفصل هذه المساحة مفتاح الاختبار النهائي ومفاتيح التدريبات عن واجهة الطالب. استخدم رمز المعلم المعتمد في المنصة." />
          </p>
          <div className="mt-2">
            <SecurityNote42 />
          </div>
          <form
            className="mt-4 max-w-md"
            onSubmit={(event) => {
              event.preventDefault();
              if (password.trim() === TEACHER_PASSWORD_42) {
                setPassword("");
                setError("");
                unlock();
              } else {
                setError("الرمز غير صحيح. حاول مجددًا.");
              }
            }}
          >
            <label className="block text-sm font-bold text-slate-700">
              <Text42 text="رمز المعلم" />
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "teacher42-error" : undefined}
                className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-base outline-none focus:border-violet-400 focus:bg-white"
              />
            </label>
            <button type="submit" className="mt-3 rounded-xl bg-slate-900 px-5 py-2.5 text-base font-bold text-white transition hover:bg-slate-700">
              <Text42 text="فتح مساحة المعلم" />
            </button>
            {error && (
              <p id="teacher42-error" role="alert" className="mt-2 text-sm font-bold text-rose-700">
                <Text42 text={error} />
              </p>
            )}
          </form>
        </div>
      )}
    </section>
  );
}
