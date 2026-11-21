/**
 * ملف اختبار فقط — لا يُستورد من أي كود إنتاجي.
 *
 * يُستخدم كبديل لحزمة اختبارات المتصفح و jsdom عن الدرس 2. الانهيار محكوم
 * بعلم صريح على globalThis (وضع "crash" افتراضيًا، و"recovered" عند طلب
 * الاختبار) بدل تعديل محتوى درس حقيقي. السبب: React 19 يعيد محاولة الرندر
 * مرة واحدة بعد رمي الخطأ، لذا لا يمكن الاعتماد على "يرمي مرة واحدة فقط".
 */
const MODE_KEY = "__LESSON_ERROR_BOUNDARY_CRASH_FIXTURE__";

type FixtureMode = "crash" | "recovered";

function modeStore(): Record<string, unknown> {
  return globalThis as unknown as Record<string, unknown>;
}

/** وضع الانهيار المتعمّد (افتراضي عند تحميل الحزمة). */
export function resetLessonCrashFixture() {
  modeStore()[MODE_KEY] = "crash";
}

/** السماح للرندر بالنجاح — يُستدعى قبل اختبار زر إعادة المحاولة. */
export function setLessonCrashFixtureRecovered() {
  modeStore()[MODE_KEY] = "recovered";
}

export default function LessonCrashFixture({ onExit }: { onExit?: () => void }) {
  if (modeStore()[MODE_KEY] !== "recovered") {
    throw new Error("TEST-ONLY injected lesson render failure (lesson 2 fixture)");
  }

  return (
    <main id="l2-main" dir="rtl" data-test-lesson-fixture="recovered" className="font-body min-h-screen bg-[#f4f6fb] p-8 text-slate-800">
      <div className="lesson-content-container rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-head text-2xl font-bold text-slate-900">درس تجريبي للتحقق من حدّ الأخطاء</h1>
        <p className="mt-3 leading-8 text-slate-500">
          استُبدل الدرس 2 بهذا المكوّن في حزمة اختبار فقط. المحتوى الحقيقي للدروس لم يُعدَّل.
        </p>
        {onExit ? (
          <button type="button" onClick={onExit} className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white">
            الخروج إلى صفحة الدروس
          </button>
        ) : null}
      </div>
    </main>
  );
}
