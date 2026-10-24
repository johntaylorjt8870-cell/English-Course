// ============================================================
// منطقة المعلم — الدرس 33 (محمية بكلمة مرور المعلم)
// هذه بوابة من جانب المتصفح (client-side gate): الشيفرة كلها تُشحن مع
// الحزمة العامة، فهي تنظيم للعرض ومنع للكشف بالصدفة، لا حماية أمنية.
// ============================================================

import { lazy, Suspense, useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { FOCUS33, Text33 } from "./design33";
import { TEACHER_PASSWORD_33, TEACHER_33_OVERVIEW } from "./teacherData33";
import { FinalTestAnswerKey } from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
// دليل المعلم يُحمَّل كقطعة مستقلة بعد فتح القفل: هو يستورد مفتاح تصحيح
// اختبار الدرس، فلا يجوز أن يصل المفتاح إلى حزمة الطالب الأولية.
const TeacherGuide33 = lazy(() => import("./TeacherGuide33"));

export default function TeacherArea33({ unlocked, onUnlockChange, onGoSolutions }: { unlocked: boolean; onUnlockChange: (v: boolean) => void; onGoSolutions: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  if (!unlocked) {
    return (
      <form
        className="mx-auto max-w-md space-y-3 rounded-3xl border-2 border-slate-300 bg-white p-5"
        data-area="teacher-locked"
        onSubmit={(e) => {
          e.preventDefault();
          if (pw === TEACHER_PASSWORD_33) {
            setErr("");
            setPw("");
            onUnlockChange(true);
          } else {
            setErr("كلمة المرور غير صحيحة.");
          }
        }}
      >
        <h2 className="font-head text-xl font-black text-slate-900">
          <Text33 text="🧑‍🏫 منطقة المعلم" />
        </h2>
        <p className="text-sm font-bold text-slate-600">
          <Text33 text="هذه المنطقة للمعلم فقط: دليل التدريس، حلول الأنشطة، سجل الدقة التعليمية، الـ rubrics، الأخطاء الشائعة، مفتاح اختبار الدرس، والفهرس الحرفي للمادة." />
        </p>
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900">
          <Text33 text="القفل حماية عرض من جانب المتصفح فقط، لا حماية خادم." />
        </p>
        <label htmlFor="l33-teacher-pw" className="block text-sm font-black text-slate-800">
          <Text33 text="كلمة مرور المعلم" />
        </label>
        <input
          id="l33-teacher-pw"
          type="password"
          dir="ltr"
          autoComplete="off"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? "l33-teacher-err" : undefined}
          className="font-en w-full rounded-xl border-2 border-slate-300 px-3 py-2 text-base font-bold outline-none focus:border-emerald-500"
        />
        {err && (
          <p id="l33-teacher-err" role="alert" className="text-sm font-black text-rose-700">
            ✕ <Text33 text={err} />
          </p>
        )}
        <button type="submit" className={`w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-black text-white hover:bg-slate-700 ${FOCUS33}`}>
          🔓 <Text33 text="دخول" />
        </button>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4" data-area="l33-teacher-body">
      <header className="flex flex-wrap items-center justify-between gap-2 rounded-3xl border-2 border-slate-200 bg-white p-4">
        <div>
          <h2 className="font-head text-xl font-black text-slate-900">
            <Text33 text="🧑‍🏫 منطقة المعلم — الدرس 33" />
          </h2>
          <p className="mt-1 text-xs font-bold text-slate-500">
            <Text33 text={TEACHER_33_OVERVIEW.title} />
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onGoSolutions} className={`rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-900 ${FOCUS33}`}>
            <Text33 text="🔑 حلول الاختبار" />
          </button>
          <button type="button" onClick={() => onUnlockChange(false)} className={`rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700 ${FOCUS33}`}>
            <Text33 text="🔒 قفل منطقة المعلم" />
          </button>
        </div>
      </header>

      {/* مفتاح الاختبار النهائي المشترك للدورة — داخل المنطقة المفتوحة بكلمة المرور */}
      <FinalTestAnswerKey lesson={33} questions={FINAL_TESTS[33]} accent="bg-emerald-700" />

      <p className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-600">
        <Rich text="المفتاح أعلاه يخص الاختبار النهائي المشترك للدورة. أما اختبار هذا الدرس (25 سؤالًا في 5 مستويات) فمفتاحه في دليل المعلم أدناه، ولا علاقة بينهما." />
      </p>

      <Suspense
        fallback={
          <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-500">
            <Text33 text="جارٍ تحميل دليل المعلم…" />
          </p>
        }
      >
        <TeacherGuide33 />
      </Suspense>
    </div>
  );
}
