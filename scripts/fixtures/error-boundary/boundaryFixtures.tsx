/**
 * مكوّنات اختبار فقط لحدّ الأخطاء — لا تُستورد من أي كود إنتاجي.
 * الانهيارات هنا مقصودة ومحسوبة، وليست جزءًا من أي درس حقيقي.
 *
 * السبب في العلم الصريح: React 19 يعيد محاولة الرندر بعد رمي الخطأ، لذا
 * المكوّن الذي "يرمي مرة واحدة" قد ينجح في المحاولة الثانية دون ظهور الحدّ.
 */
let mode: "crash" | "recovered" = "crash";

export function resetBoundaryFixtures() {
  mode = "crash";
}

export function setBoundaryFixtureRecovered() {
  mode = "recovered";
}

export function ThrowingLesson({ message = "TEST-ONLY injected render failure" }: { message?: string }): never {
  throw new Error(message);
}

/** يرمي خطأ طالما بقي الوضع "crash"؛ وينجح فور تحويله إلى "recovered". */
export function ControlledLesson({ label = "تم استئناف عرض الدرس بعد إعادة المحاولة" }: { label?: string }) {
  if (mode !== "recovered") {
    throw new Error("TEST-ONLY controlled render failure");
  }
  return <p data-testid="recovered-lesson">{label}</p>;
}

export function StableLesson({ label }: { label: string }) {
  return <p data-testid="stable-lesson">{label}</p>;
}
