import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

/**
 * حدّ أخطاء على مستوى الدرس.
 *
 * وظيفته: إذا انهار درس أثناء الرندر أو دورة الحياة (mount/update)، يُعزل
 * الانهيار داخل هذه المساحة ويعرض واجهة عربية للتعافي بدل صفحة بيضاء، مع
 * بقاء بوابة الموقع وصفحة الدروس وشارة القفل تعمل خارج الحدّ.
 *
 * ما لا يغطيه (حدود React المعروفة لصنف Error Boundary):
 *   - الأخطاء داخل معالجات الأحداث (onClick وما شابه) بعد نجاح الرندر.
 *   - أخطاء ردود النداء غير المتزامنة و Promises المرفوضة.
 *   - أخطاء خارج شجرة React (مثل كود خلفية أو setTimeout).
 *   - الأخطاء داخل الواجهة البديلة نفسها (محميّة بحدّ داخلي مصغّر، لا يغطي
 *     أعطالًا خارجة عن شجرة React).
 *
 * لا تُعرض أي تفاصيل تقنية للطالب: الرسالة العامة فقط. التشخيص يُسجَّل في
 * وحدة التحكم عبر componentDidCatch.
 *
 * onRetry (اختياري، Fix #4): يُستدعى عند «إعادة المحاولة» لإعادة إنشاء
 * مكوّن React.lazy بعد فشل تحميل chunk؛ بدون استدعاء خارجي يكتفي الحدّ
 * بتصفير حالته كما كان دائمًا.
 */

const LOG_PREFIX = "[LessonErrorBoundary]";

export interface LessonErrorBoundaryProps {
  children: ReactNode;
  /** رقم الدرس المعروض — يُستخدم في سجل التشخيص فقط، ولا يظهر للطالب. */
  lessonNumber?: number;
  /** أي تغيير في هذه القيمة (مثل رقم الدرس) يصفّر حالة الخطأ ويسمح بالرندر من جديد. */
  resetKey?: string | number;
  /** العودة إلى صفحة الدروس عبر آلية التنقل الحالية (hash). */
  onGoHome: () => void;
  /**
   * يُستدعى عند ضغط «إعادة المحاولة» قبل تصفير الحالة. اختياري (Fix #4):
   * يستخدمه مضيف الدرس الكسول لإنشاء مكوّن React.lazy جديد، فيُعاد جلب
   * الـ chunk المتعذر بدل إعادة رندر نتيجته المخزّنة الفاشلة.
   */
  onRetry?: () => void;
}

interface LessonErrorBoundaryState {
  hasError: boolean;
  resetKey: string | number | undefined;
}

function effectiveResetKey(props: LessonErrorBoundaryProps) {
  return props.resetKey ?? props.lessonNumber;
}

function logRenderError(scope: "lesson" | "fallback", error: unknown, info: ErrorInfo | null, lessonNumber?: number) {
  const where = typeof lessonNumber === "number" ? `lesson ${lessonNumber}` : "lesson (unknown number)";
  const message = error instanceof Error ? error.message : String(error);
  console.error(`${LOG_PREFIX} ${scope} render failed · ${where} · ${message}`, {
    scope,
    lessonNumber: lessonNumber ?? null,
    error,
    componentStack: info?.componentStack ?? null,
  });
}

function LessonCrashFallback({ onRetry, onGoHome }: { onRetry: () => void; onGoHome: () => void }) {
  return (
    <div
      dir="rtl"
      className="font-body flex min-h-[70vh] items-center justify-center bg-[#f4f6fb] px-4 py-16 text-slate-800"
    >
      <div
        role="alert"
        aria-labelledby="lesson-error-title"
        data-lesson-error-fallback="true"
        className="w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="h-2 w-full bg-gradient-to-l from-sky-500 to-emerald-500" />
        <div className="p-8 text-center">
          <div
            aria-hidden="true"
            className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 text-3xl font-bold text-white shadow"
          >
            !
          </div>
          <h2 id="lesson-error-title" className="font-head mt-4 text-2xl font-bold text-slate-900">
            تعذّر عرض هذا الدرس
          </h2>
          <p className="mt-3 leading-8 text-slate-500">
            حدث خطأ غير متوقع أثناء تحميل الدرس. صفحة الدروس وبقية الموقع تعملان بشكل طبيعي.
          </p>
          <p className="mt-1 leading-8 text-slate-500">
            جرّب إعادة المحاولة، أو ارجع إلى صفحة الدروس واختر درسًا آخر.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onRetry}
              data-lesson-error-retry="true"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
            >
              إعادة المحاولة
            </button>
            <button
              type="button"
              onClick={onGoHome}
              data-lesson-error-home="true"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            >
              العودة إلى صفحة الدروس
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * واجهة تعافٍ مصغّرة لا تعتمد على أي مكوّن آخر. تُستخدم فقط إذا انهارت
 * الواجهة البديلة الأساسية نفسها، لمنع انهيار متكرر يصل إلى الصفحة البيضاء.
 */
function MinimalFallback({ onGoHome }: { onGoHome: () => void }) {
  return (
    <div dir="rtl" role="alert" data-lesson-error-fallback="minimal" className="p-8 text-center">
      <p className="text-lg font-bold text-slate-900">تعذّر عرض هذا الدرس.</p>
      <button
        type="button"
        onClick={onGoHome}
        data-lesson-error-home="true"
        className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
      >
        العودة إلى صفحة الدروس
      </button>
    </div>
  );
}

class FallbackGuard extends Component<
  { children: ReactNode; lessonNumber?: number; onGoHome: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logRenderError("fallback", error, info, this.props.lessonNumber);
  }

  render() {
    if (this.state.failed) return <MinimalFallback onGoHome={this.props.onGoHome} />;
    return this.props.children;
  }
}

export class LessonErrorBoundary extends Component<LessonErrorBoundaryProps, LessonErrorBoundaryState> {
  constructor(props: LessonErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, resetKey: effectiveResetKey(props) };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // تغيير المسار/الدرس يصفّر الانهيار السابق دون إعادة تحميل الصفحة.
  static getDerivedStateFromProps(props: LessonErrorBoundaryProps, state: LessonErrorBoundaryState): Partial<LessonErrorBoundaryState> | null {
    const nextKey = effectiveResetKey(props);
    if (nextKey !== state.resetKey) {
      return { hasError: false, resetKey: nextKey };
    }
    return null;
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logRenderError("lesson", error, info, this.props.lessonNumber);
  }

  private handleRetry = () => {
    this.props.onRetry?.();
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <FallbackGuard lessonNumber={this.props.lessonNumber} onGoHome={this.props.onGoHome}>
        <LessonCrashFallback onRetry={this.handleRetry} onGoHome={this.props.onGoHome} />
      </FallbackGuard>
    );
  }
}

export default LessonErrorBoundary;
