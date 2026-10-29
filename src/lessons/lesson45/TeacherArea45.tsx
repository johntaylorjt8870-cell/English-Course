import { Component, lazy, Suspense, useState, type ReactNode } from "react";
import { En45, Text45 } from "./design45";

const TeacherGuide45 = lazy(() => import("./TeacherGuide45"));

class TeacherChunkBoundary45 extends Component<
  { children: ReactNode; retryKey: number; onRetry: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: { retryKey: number }) {
    if (prevProps.retryKey !== this.props.retryKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-900"
        >
          <span>⚠️ تعذّر تحميل دليل المعلم. يرجى التحقق من الاتصال وإعادة المحاولة.</span>
          <button
            type="button"
            onClick={this.props.onRetry}
            className="rounded-xl bg-rose-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-rose-800"
          >
            إعادة المحاولة ↺
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export const TEACHER_PASSWORD_45 = "somer173";

const CLIENT_GATE_NOTE =
  "تنبيه تقني صادق: هذه البوابة التربوية تعمل في المتصفح لفصل مفتاح الإجابات عن مسار تعلّم الطالب وتحميله عند الطلب فقط، وليست حماية أمنية من جهة الخادم.";

export default function TeacherArea45({
  unlocked,
  onUnlock,
  onLock,
}: {
  unlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
}) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  if (!unlocked) {
    return (
      <div data-area="teacher" className="space-y-4 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-200 text-2xl" aria-hidden="true">
            🧑‍🏫
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-left">
              <En45 className="text-lg font-extrabold text-slate-800">Teacher’s Space</En45>
            </div>
            <div className="text-sm font-bold text-slate-600">
              فضاء المعلم — الدرس 45 · مفتاح الأسئلة الـ 25 والشروح التفصيلية
            </div>
          </div>
          <span className="rounded-full bg-white px-3.5 py-1 text-sm font-bold text-slate-500 shadow-xs">
            🔒 مقفلة
          </span>
        </div>

        <p className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-relaxed text-slate-600">
          <Text45 text={CLIENT_GATE_NOTE} />
        </p>

        <form
          className="flex flex-wrap items-center gap-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim() === TEACHER_PASSWORD_45) {
              setValue("");
              setWrong(false);
              onUnlock();
            } else {
              setWrong(true);
            }
          }}
        >
          <input
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (wrong) setWrong(false);
            }}
            placeholder="كلمة المرور"
            aria-label="كلمة مرور فضاء المعلم"
            dir="ltr"
            autoComplete="off"
            className="font-en w-48 rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2.5 text-left text-base font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500"
          />
          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-base font-bold text-white shadow transition hover:bg-slate-700"
          >
            🔓 فتح المساحة
          </button>
          <span className="text-sm font-bold text-slate-500">خاص بالمعلم والمراجعة الصفية</span>
        </form>

        {wrong && (
          <p role="alert" className="shake text-sm font-bold text-rose-700">
            ✕ كلمة المرور غير صحيحة — المساحة ما زالت مقفلة.
          </p>
        )}
      </div>
    );
  }

  return (
    <div data-area="teacher" className="pop space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-xl text-white" aria-hidden="true">
            🧑‍🏫
          </span>
          <div>
            <div className="text-sm font-extrabold text-emerald-950">
              فضاء المعلم مفتوح — مفتاح الاختبار النهائي (25 سؤالًا)
            </div>
            <div className="text-xs font-semibold text-emerald-800">
              يُحمَّل هذا الدليل عند الطلب فقط ولا يظهر للطالب قبل فتح البوابة.
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onLock}
          className="rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-900 transition hover:bg-emerald-100"
        >
          🔒 قفل المساحة
        </button>
      </div>

      <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
        <Text45 text={CLIENT_GATE_NOTE} />
      </p>

      <TeacherChunkBoundary45
        retryKey={retryKey}
        onRetry={() => setRetryKey((k) => k + 1)}
      >
        <Suspense
          key={retryKey}
          fallback={
            <p role="status" className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-base font-bold text-slate-500">
              جارٍ تحميل مفتاح الإجابات...
            </p>
          }
        >
          <TeacherGuide45 />
        </Suspense>
      </TeacherChunkBoundary45>
    </div>
  );
}
