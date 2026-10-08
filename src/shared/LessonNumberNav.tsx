import { useEffect, useMemo, useState } from "react";
import { cn } from "../utils/cn";

// ============================================================
// LessonNumberNav — شريط أرقام الدروس بنافذة منزلقة
//
// المشكلة: عرض أرقام الدروس كلها (1 … 31) في صف أفقي واحد يجعل الشريط
// طويلًا ومزدحمًا. الحل: نافذة واحدة تعرض 10 أرقام كحد أقصى، وسهمان
// يحرّكان النافذة رقمًا واحدًا في كل نقرة:
//
//     ← 1 2 3 4 5 6 7 8 9 10 →      ← 2 3 4 5 6 7 8 9 10 11 →     …    ← 22 … 31 →
//
// قواعد ثابتة:
//   • الأسهم تحرّك النافذة فقط — لا تنقل الطالب إلى أي درس.
//   • أرقام الدروس نفسها هي روابط التوجيه الحالية في المشروع (#/lesson/N)
//     بلا أي تغيير في الراوتر.
//   • الدرس الحالي (current) يبقى ظاهرًا: تُزاح النافذة تلقائيًا لتضمّه.
//   • الترتيب يُقرأ 1 2 3 … من اليسار إلى اليمين حتى داخل الواجهة العربية RTL.
//   • لا يتجاوز الشريط عرض حاويته في أي مقاس (لا فائض أفقي في الصفحة).
// ============================================================

/** أقصى عدد من أرقام الدروس يظهر في النافذة الواحدة. */
export const LESSON_WINDOW = 10;

export type LessonNumberItem = {
  /** رقم الدرس */
  n: number;
  /** رابط الدرس — الافتراضي هو توجيه المشروع الحالي #/lesson/N */
  href?: string;
  /** درس غير متاح بعد — لا يُعرض كرابط */
  locked?: boolean;
};

/** توجيه الدروس الحالي في المشروع (hash) — لم يُغيَّر هنا. */
export const lessonHash = (n: number) => `#/lesson/${n}`;

/** يُحرّك بداية النافذة بأقل مقدار ممكن حتى يصبح index داخل المدى. */
function includeIndex(start: number, index: number, size: number, maxStart: number) {
  let next = start;
  if (index < start) next = index;
  else if (index > start + size - 1) next = index - size + 1;
  return Math.min(Math.max(0, next), maxStart);
}

/** نمط زر السهم — الحالة المعطّلة تُميّز بالعتامة والمؤشر لا باللون وحده. */
function arrowClass(disabled: boolean) {
  return cn(
    "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm font-black transition sm:h-8 sm:w-8 sm:text-base",
    disabled
      ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300 opacity-60"
      : "border-slate-300 bg-white text-slate-700 shadow-sm hover:border-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200",
  );
}

export default function LessonNumberNav({
  items,
  current = null,
  windowSize = LESSON_WINDOW,
  label = "التنقل بين أرقام الدروس",
  currentLabel = "الدرس الحالي",
  className,
}: {
  /** سجل الدروس (الرقم + الرابط) — عدد الأرقام يُشتق منه ولا يُفترض ثابتًا */
  items: LessonNumberItem[];
  /** الدرس الحالي إن وُجد — يبقى داخل النافذة وتُميّز بطاقته */
  current?: number | null;
  /** أقصى عدد أرقام في النافذة (الافتراضي 10) */
  windowSize?: number;
  /** وسم التنقل لقارئات الشاشة */
  label?: string;
  /** وسم بطاقة الدرس الحالي */
  currentLabel?: string;
  className?: string;
}) {
  const size = Math.max(1, Math.floor(windowSize));
  const count = items.length;
  const maxStart = Math.max(0, count - size);
  const currentIndex = useMemo(
    () => (current == null ? -1 : items.findIndex((item) => item.n === current)),
    [items, current],
  );

  const [start, setStart] = useState(() => includeIndex(0, currentIndex, size, maxStart));

  // إبقاء الدرس الحالي ظاهرًا — يُعاد الضبط عند تغيّر الدرس الحالي فقط،
  // لا عند تحريك المستخدم للأسهم (فلا تُنتزع النافذة من يده).
  useEffect(() => {
    if (currentIndex < 0) return;
    setStart((s) => includeIndex(s, currentIndex, size, maxStart));
  }, [currentIndex, size, maxStart]);

  // لو تغيّر عدد الدروس (درس جديد لاحقًا) تبقى البداية داخل الحدود.
  useEffect(() => {
    setStart((s) => Math.min(s, maxStart));
  }, [maxStart]);

  if (count === 0) return null;

  const visible = items.slice(start, start + size);
  const first = visible[0];
  const last = visible[visible.length - 1];
  const atStart = start <= 0;
  const atEnd = start >= maxStart;
  const currentVisible = current != null && visible.some((item) => item.n === current);

  return (
    <nav dir="rtl" aria-label={label} className={cn("w-full", className)}>
      <div className="mx-auto flex max-w-md items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm sm:gap-1.5">
        <button
          type="button"
          onClick={() => setStart((s) => Math.max(0, s - 1))}
          disabled={atStart}
          aria-label="الدروس السابقة"
          title="الدروس السابقة"
          className={arrowClass(atStart)}
        >
          <span aria-hidden="true">←</span>
        </button>

        {/* الشريط نفسه LTR: التسلسل يُقرأ 1 2 3 … من اليسار لليمين داخل الواجهة العربية */}
        <ul dir="ltr" className="ltr-row flex min-w-0 flex-1 items-center gap-0.5 sm:gap-1">
          {visible.map((item) => {
            const isCurrent = current != null && item.n === current;
            const chip = cn(
              "font-head grid aspect-square w-full max-w-8 place-items-center rounded-full border-2 text-[11px] font-bold transition sm:text-sm",
              item.locked
                ? "cursor-not-allowed border-slate-100 bg-slate-100 text-slate-400"
                : isCurrent
                  ? "border-transparent bg-gradient-to-br from-sky-500 to-emerald-500 font-black text-white shadow-md ring-2 ring-sky-100"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200",
            );
            const name = `الدرس ${item.n}`;

            return (
              <li key={item.n} className="min-w-0 flex-1">
                {item.locked ? (
                  <span className={chip} aria-label={`${name} — سيُضاف لاحقًا`}>
                    {item.n}
                  </span>
                ) : (
                  <a
                    href={item.href ?? lessonHash(item.n)}
                    aria-label={name}
                    aria-current={isCurrent ? "true" : undefined}
                    title={name}
                    className={chip}
                  >
                    {item.n}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setStart((s) => Math.min(maxStart, s + 1))}
          disabled={atEnd}
          aria-label="الدروس التالية"
          title="الدروس التالية"
          className={arrowClass(atEnd)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* وصف النطاق المعروض + الدرس الحالي — تمييز غير لوني ووضوح لقارئات الشاشة */}
      <p className="sr-only" aria-live="polite">
        {`الدروس المعروضة من ${first.n} إلى ${last.n} من أصل ${count}`}
      </p>
      {currentVisible && (
        <p className="font-head mt-2 text-center text-xs font-bold text-slate-400">
          {currentLabel}: <span className="font-en">{current}</span>
        </p>
      )}
    </nav>
  );
}
