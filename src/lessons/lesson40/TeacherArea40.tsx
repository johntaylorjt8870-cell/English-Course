import { Suspense, lazy, useState, type FormEvent } from "react";
import { Chip40, MixedBidi } from "./kit40";

// ============================================================
// Lesson 40 — منطقة المعلم المستقلة (TeacherArea40)
//
// تستخدم آلية الوصول المعتمدة في المنصة للدروس الحديثة (37–39)،
// ولا تحمّل دليل المعلم (TeacherGuide40) إلا بعد تفعيل وضع المعلم.
// ============================================================

export const TEACHER_PASSWORD_40 = "somer173";

const LazyTeacherGuide40 = lazy(() => import("./TeacherGuide40"));

export function TeacherArea40({
  unlocked,
  onUnlock,
  onLock,
  onJumpToStep,
  onOpenTest,
  onOpenSolutions,
  onBackToStudent,
}: {
  unlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
  onJumpToStep: (index: number) => void;
  onOpenTest: () => void;
  onOpenSolutions: () => void;
  onBackToStudent: () => void;
}) {
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (passwordInput.trim() === TEACHER_PASSWORD_40) {
      setError("");
      setPasswordInput("");
      onUnlock();
    } else {
      setError("الرمز غير صحيح. يُرجى إدخال رمز المعلم المعتمد في المنصة.");
    }
  }

  return (
    <section
      id="lesson40-teacher"
      dir="rtl"
      aria-label="مساحة المعلم — الدرس 40"
      className="space-y-6"
    >
      {!unlocked ? (
        <div className="rounded-3xl border border-[#d4b475] bg-[#fffdf8] p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Chip40 label="مساحة المعلم محمية 🔒" tone="amber" />
            <button
              type="button"
              onClick={onBackToStudent}
              className="rounded-xl border border-[#245f62] bg-[#ffffff] px-4 py-2 text-xs font-extrabold text-[#245f62] cursor-pointer"
            >
              العودة إلى خطوات الدرس
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-[#17354a]">
            <MixedBidi>🔐 بوابة مساحة المعلم — الدرس 40 (Future Tenses Master Review)</MixedBidi>
          </h2>

          <p className="text-sm font-semibold text-[#24343b] leading-[1.85]">
            <MixedBidi>
              تحتوي هذه المساحة على دليل التدريس ذي المراحل الست، ومفاتيح الحلول الكاملة لتدريبات الدرس والاختبار النهائي (§26)، وسلم تصحيح مهمة الكتابة (§27)، وسجل التغطية المصدري الكامل. أدخل رمز المعلم المعتمد في المنصة لفتحها.
            </MixedBidi>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
            <label htmlFor="teacher40-password" className="sr-only">
              رمز المعلم
            </label>
            <input
              id="teacher40-password"
              type="password"
              dir="ltr"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="أدخل رمز المعلم..."
              className="min-w-[240px] rounded-xl border border-[#b9c8c0] bg-[#ffffff] px-4 py-2.5 font-mono text-sm font-bold text-[#17354a]"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#17354a] px-5 py-2.5 text-sm font-extrabold text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
            >
              فتح مساحة المعلم
            </button>
          </form>

          {error ? (
            <p className="rounded-xl border border-[#cf7d73] bg-[#fbefed] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#8d3832]">
              <MixedBidi>{error}</MixedBidi>
            </p>
          ) : null}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#8fb69a] bg-[#edf5ee] px-4 py-3">
            <span className="text-xs sm:text-sm font-extrabold text-[#28533b]">
              وضع المعلم مفعّل — يمكنك استعراض الحلول الكاملة أو قفل المساحة قبل مشاركة الشاشة مع الطالب.
            </span>
            <button
              type="button"
              onClick={onLock}
              className="rounded-xl border border-[#8d3832] bg-[#fffdf8] px-3.5 py-1.5 text-xs font-extrabold text-[#8d3832] cursor-pointer"
            >
              قفل مساحة المعلم 🔒
            </button>
          </div>

          <Suspense
            fallback={
              <div className="rounded-2xl border border-[#c8c3b4] bg-[#fffdf8] p-6 text-sm font-extrabold text-[#17354a]">
                جارٍ تحميل دليل المعلم الشامل...
              </div>
            }
          >
            <LazyTeacherGuide40
              onJumpToStep={onJumpToStep}
              onOpenTest={onOpenTest}
              onOpenSolutions={onOpenSolutions}
            />
          </Suspense>
        </div>
      )}
    </section>
  );
}
