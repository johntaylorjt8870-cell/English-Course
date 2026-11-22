// ============================================================
// واجهة التحميل أثناء فتح درس (Fix #4 — Lazy Loading)
//
// تُعرض داخل Suspense بينما يُجلب chunk الدرس عند الطلب. مكوّن مستقل
// لا يستورد أي شيء من أي درس، حتى لا تتأثر حزمة التحميل ولا تفشل مع
// فشل درس معيّن.
//
// متوافقة مع لغة التصميم: خلفية #f4f6fb، شريط علوي متدرج، RTL،
// وفونت المنصة. تحمل role="status" وaria-live حتى يصل قارئ الشاشة
// بنفس المعلومة بدل شاشة صامتة.
// ============================================================
export default function LessonLoadingFallback({ lessonNumber }: { lessonNumber?: number }) {
  return (
    <div
      dir="rtl"
      className="font-body flex min-h-screen flex-col items-center justify-center bg-[#f4f6fb] px-4 text-slate-800"
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-lesson-loading="true"
    >
      <span aria-hidden="true" className="sr-only">جارٍ تحميل الدرس</span>
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="h-2 w-full bg-gradient-to-l from-sky-500 to-emerald-500" />
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <svg
            aria-hidden="true"
            className="h-12 w-12 animate-spin text-sky-600"
            viewBox="0 0 50 50"
            fill="none"
          >
            <circle className="opacity-15" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="6" />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M25 5a20 20 0 0 1 20 20h-6a14 14 0 0 0-14-14V5z"
            />
          </svg>
          <div>
            <p className="font-head text-xl font-bold text-slate-900">جارٍ تحميل الدرس…</p>
            <p className="mt-1 text-sm text-slate-500">
              {typeof lessonNumber === "number" ? `الدرس ${lessonNumber}` : "الدرس"} — يُحمَّل عند الطلب، قد تستغرق الثواني الأولى لحظة.
            </p>
          </div>
          <a
            href="#/"
            className="mt-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
          >
            العودة إلى صفحة الدروس
          </a>
        </div>
      </div>
    </div>
  );
}
