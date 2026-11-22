// ============================================================
// سجلّ محمّلات الدروس — Fix #4 (Lazy Loading)
//
// كل درس مسجّل هنا كدالة import() ديناميكية فقط. هذا الملف نفسه لا يحتوي
// على أي محتوى درسي، ولا يُفعّل أي جلب شبكة: import() تُنفَّذ فقط عندما
// يستدعيها React.lazy فعليًا (أي عندما يطلب المستخدم ذلك الدرس).
//
// لا تُحوّل أي مدخل هنا إلى import ثابت: ذلك يعيد تضمين الدرس في الحزمة
// الرئيسية ويلغي التحميل الكسول بالكامل.
//
// لماذا لا تُستخدم React.lazy هنا مباشرة؟
// نُبقي المحمّلات (factories) نقية حتى يستطيع المضيف (LazyLessonHost)
// إنشاء مكوّن lazy جديد عند «إعادة المحاولة» بعد فشل تحميل chunk:
// React.lazy يخزّن نتيجة الاستدعاء الأول داخليًا (بما فيها الرفض)، لكنه
// لا يملك ذاكرة بين المكوّنات؛ مكوّن lazy جديد ⇒ import() جديد ⇒ محاولة
// جلب حقيقية. المحمّلات هنا هي المفتاح لتلك الآلية.
// ============================================================

import type { ComponentType } from "react";

/**
 * كل الدروس تقبل onExit اختياريًا من جهة المتصل؛ الدروس التي تتطلبها
 * تصرّح بها إلزامية داخليًا، وهذا متوافق مع ComponentType<any> هنا.
 * النوع الدقيق يُطبَّق على حدود المضيف (LessonComponentProps).
 */
export type LessonLoader = () => Promise<{ default: ComponentType<any> }>;

export const LESSON_LOADERS: Readonly<Record<number, LessonLoader>> = {
  1: () => import("./lesson1/Lesson1"),
  2: () => import("./lesson2/Lesson2"),
  3: () => import("./lesson3/Lesson3"),
  4: () => import("./lesson4/Lesson4"),
  5: () => import("./lesson5/Lesson5"),
  6: () => import("./lesson6/Lesson6"),
  7: () => import("./lesson7/Lesson7"),
  8: () => import("./lesson8/Lesson8"),
  9: () => import("./lesson9/Lesson9"),
  10: () => import("./lesson10/Lesson10"),
  11: () => import("./lesson11/Lesson11"),
  12: () => import("./lesson12/Lesson12"),
  13: () => import("./lesson13/Lesson13"),
  14: () => import("./lesson14/Lesson14"),
  15: () => import("./lesson15/Lesson15"),
  16: () => import("./lesson16/Lesson16"),
  17: () => import("./lesson17/Lesson17"),
  18: () => import("./lesson18/Lesson18"),
  19: () => import("./lesson19/Lesson19"),
  20: () => import("./lesson20/Lesson20"),
  21: () => import("./lesson21/Lesson21"),
  22: () => import("./lesson22/Lesson22"),
  23: () => import("./lesson23/Lesson23"),
  24: () => import("./lesson24/Lesson24"),
  25: () => import("./lesson25/Lesson25"),
  26: () => import("./lesson26/Lesson26"),
  27: () => import("./lesson27/Lesson27"),
  28: () => import("./lesson28/Lesson28"),
  29: () => import("./lesson29/Lesson29"),
  30: () => import("./lesson30/Lesson30"),
  31: () => import("./lesson31/Lesson31"),
  32: () => import("./lesson32/Lesson32"),
  33: () => import("./lesson33/Lesson33"),
  34: () => import("./lesson34/Lesson34"),
  35: () => import("./lesson35/Lesson35"),
  36: () => import("./lesson36/Lesson36"),
  37: () => import("./lesson37/Lesson37"),
  38: () => import("./lesson38/Lesson38"),
  39: () => import("./lesson39/Lesson39"),
  40: () => import("./lesson40/Lesson40"),
  41: () => import("./lesson41/Lesson41"),
  42: () => import("./lesson42/Lesson42"),
  43: () => import("./lesson43/Lesson43"),
  44: () => import("./lesson44/Lesson44"),
  45: () => import("./lesson45/Lesson45"),
  46: () => import("./lesson46/Lesson46"),
  47: () => import("./lesson47/Lesson47"),
  48: () => import("./lesson48/Lesson48"),
  49: () => import("./lesson49/Lesson49"),
  50: () => import("./lesson50/Lesson50"),
  51: () => import("./lesson51/Lesson51"),
  52: () => import("./lesson52/Lesson52"),
  53: () => import("./lesson53/Lesson53"),
  54: () => import("./lesson54/Lesson54"),
  55: () => import("./lesson55/Lesson55"),
  56: () => import("./lesson56/Lesson56"),
  57: () => import("./lesson57/Lesson57"),
  58: () => import("./lesson58/Lesson58"),
  59: () => import("./lesson59/Lesson59"),
  60: () => import("./lesson60/Lesson60"),
  61: () => import("./lesson61/Lesson61"),
  62: () => import("./lesson62/Lesson62"),
};

export const LESSON_NUMBERS: ReadonlyArray<number> = Object.keys(LESSON_LOADERS).map(Number);

// ------------------------------------------------------------
// إعادة المحاولة بعد فشل جلب chunk درس (متوافقة مع نمط ?retry الموجود
// في الدروس 46–52). المتصفح يخزّن نتيجة import() الفاشلة للعنوان نفسه،
// فإعادة استدعاء المطالَب ذاته قد يعيد الرفض المخزّن دون جلب جديد.
// الحل: استخراج عنوان الـ chunk الذي فشل (من Resource Timing أو من
// روابط modulepreload التي تزرعها Vite) وإعادة استيراده مع query جديد،
// فيُعامل كوحدة مستقلة ويُعاد جلبها فعليًا. نفس الأصل ونفس اسم الملف
// فقط — لا يُقبل أي عنوان خارجي أو ملف آخر.
// ------------------------------------------------------------
export function lessonChunkRetryUrl(lesson: number, attempt: number): string | null {
  if (typeof window === "undefined") return null;
  const prefix = `Lesson${lesson}-`;
  const fromTiming =
    typeof performance !== "undefined"
      ? performance.getEntriesByType("resource").map((entry) => entry.name).reverse()
      : [];
  const fromPreload =
    typeof document !== "undefined"
      ? [...document.querySelectorAll('link[rel="modulepreload"]')].map((link) => (link as HTMLLinkElement).href)
      : [];
  for (const candidate of [...fromTiming, ...fromPreload]) {
    try {
      const url = new URL(candidate, window.location.href);
      const file = url.pathname.split("/").pop() ?? "";
      if (url.origin !== window.location.origin) continue;
      if (!file.startsWith(prefix) || !file.endsWith(".js")) continue;
      url.searchParams.set("lessonRetry", `${Date.now()}-${attempt}`);
      return url.href;
    } catch {
      /* مرشح غير صالح — نتجاهله وننتقل للتالي */
    }
  }
  return null;
}
