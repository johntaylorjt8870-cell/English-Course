// ============================================================
// مضيف الدرس المحمَّل كسولًا — Fix #4 (Lazy Loading)
//
// المسؤوليات:
//   1) إنشاء مكوّن React.lazy لكل درس عند الطلب فقط (ولا شيء عند الفهرس).
//   2) عرض LessonLoadingFallback داخل Suspense أثناء جلب الـ chunk.
//   3) عزل أي فشل تحميل (أو انهيار رندر) داخل LessonErrorBoundary — لا
//      صفحة بيضاء أبدًا.
//   4) «إعادة المحاولة» بعد فشل تحميل chunk: React.lazy يخزّن رفض
//      import() الأول داخليًا، لكنه لا يملك ذاكرة بين المكوّنات؛ لذلك
//      نُنشئ مكوّن lazy جديدًا بزيادة عدّاد المحاولة، فيُستدعى import()
//      من جديد ويُعاد جلب الملف فعليًا (بدون إعادة تحميل الصفحة).
//   5) إعادة ضبط حدّ الأخطاء عند تغيّر الدرس عبر resetKey (كما كان قبل #4).
//
// `loaders` قابلة للاستبدال من الاختبارات فقط؛ الإنتاج يستخدم
// LESSON_LOADERS الحقيقية (انظر src/lessons/loaders.ts).
// ============================================================
import { lazy, Suspense, useMemo, useState } from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import LessonErrorBoundary from "./LessonErrorBoundary";
import LessonLoadingFallback from "./LessonLoadingFallback";
import { LESSON_LOADERS, lessonChunkRetryUrl } from "../lessons/loaders";
import type { LessonLoader } from "../lessons/loaders";

export interface LessonComponentProps {
  onExit?: () => void;
}

export interface LazyLessonHostProps {
  /** رقم الدرس المطلوب (1–62). */
  route: number;
  onExit: () => void;
  /** للاختبار فقط: سجل محمّلات بديل. الإنتاج لا يمرّر هذه الخاصية. */
  loaders?: Readonly<Record<number, LessonLoader>>;
}

export default function LazyLessonHost({ route, onExit, loaders = LESSON_LOADERS }: LazyLessonHostProps) {
  // عدّاد المحاولات: كل زيادة تُنشئ مكوّن lazy جديدًا ⇒ import() جديد.
  const [attempt, setAttempt] = useState(0);

  const LessonComponent = useMemo<LazyExoticComponent<ComponentType<LessonComponentProps>> | null>(() => {
    const base = loaders[route];
    if (!base) return null;
    let effective: LessonLoader = base;
    if (attempt > 0) {
      // المتصفح يخزّن فشل import() للعنوان نفسه؛ أعد الجلب بعنوان cache-busted
      // مطابق لنفس الـ chunk (انظر retryModuleUrl في الدروس 46–52). إن تعذر
      // استخراج العنوان، نسقط على المطالَب الأصلي (يفشل أو ينجح كما كان).
      const retryUrl = lessonChunkRetryUrl(route, attempt);
      if (retryUrl) {
        effective = () => import(/* @vite-ignore */ retryUrl) as Promise<{ default: ComponentType<any> }>;
      }
    }
    return lazy(effective) as unknown as LazyExoticComponent<ComponentType<LessonComponentProps>>;
  }, [loaders, route, attempt]);

  // لا يحدث في الممارسة (App يمرّر فقط أرقام 1–62 وله محمّلات لكل رقم)،
  // لكن نمنع الانهيار ونرجع لا شيء بدل صفحة بيضاء لو تغيّرت البنية لاحقًا.
  if (!LessonComponent) return null;

  return (
    <LessonErrorBoundary
      lessonNumber={route}
      resetKey={`${route}:${attempt}`}
      onGoHome={onExit}
      onRetry={() => setAttempt((a) => a + 1)}
    >
      <Suspense fallback={<LessonLoadingFallback lessonNumber={route} />}>
        <LessonComponent onExit={onExit} />
      </Suspense>
    </LessonErrorBoundary>
  );
}
