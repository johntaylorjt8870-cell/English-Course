import { Suspense, lazy, useState } from "react";
import { Rich40 } from "./kit40";

export const TEACHER_PASSWORD_40 = "somer173";

const TeacherGuide40 = lazy(() => import("./TeacherGuide40"));

export interface TeacherArea40Props {
  unlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
  onOpenSolutions?: () => void;
  onBackToLesson?: () => void;
}

export function TeacherArea40({
  unlocked,
  onUnlock,
  onLock,
  onOpenSolutions,
  onBackToLesson,
}: TeacherArea40Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === TEACHER_PASSWORD_40) {
      setError("");
      setCode("");
      onUnlock();
    } else {
      setError("رمز الدخول غير صحيح. أدخل رمز المعلم المعتمد لفتح الدليل التدريسي.");
    }
  };

  return (
    <section
      id="lesson40-teacher"
      className="tcc-exam-shell"
      aria-label="مساحة المعلم للدرس 40"
    >
      <header className="tcc-head">
        <div className="tcc-spectrum-bar" aria-hidden="true" />
        <div className="tcc-head-top">
          <div className="tcc-badges">
            <span dir="ltr" className="tcc-coord font-en">
              TEACHER CONSOLE // L40
            </span>
            <span className="tcc-station-tag">
              {unlocked ? "وضع المعلم مفعّل" : "محمي ببوابة المعلم"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {unlocked ? (
              <>
                {onOpenSolutions ? (
                  <button
                    type="button"
                    className="tcc-btn-primary"
                    onClick={onOpenSolutions}
                  >
                    استعراض صفحة الحلول التفصيلية
                  </button>
                ) : null}
                <button type="button" className="tcc-btn-secondary" onClick={onLock}>
                  قفل مساحة المعلم
                </button>
              </>
            ) : null}
            {onBackToLesson ? (
              <button
                type="button"
                className="tcc-btn-secondary"
                onClick={onBackToLesson}
              >
                العودة إلى خطوات الدرس
              </button>
            ) : null}
          </div>
        </div>

        <h1 className="tcc-title">
          <Rich40 text="مساحة المعلم — دليل التدريس وسلالم التقدير ومفاتيح الحلول" />
        </h1>
        <p className="tcc-purpose">
          بوابة تنظيمية على مستوى الواجهة العميلة تفصل تجربة الطالب عن دليل المعلم وسلالم التصحيح البشري وسجل التغطية.
        </p>
      </header>

      {!unlocked ? (
        <section className="tcc-brief max-w-xl">
          <h2 className="m-0 text-base font-black text-slate-950">
            أدخل رمز المعلم لفتح الدليل التدريسي
          </h2>
          <p className="mt-2 mb-4 text-sm font-bold text-slate-700">
            يُحمَّل دليل المعلم بصورة مؤجلة بعد التحقق من الرمز لعزل مفاتيح الإجابة عن تجربة التعلم والاختبار.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="teacher40-password" className="text-xs font-extrabold text-slate-800">
              رمز المعلم
            </label>
            <input
              id="teacher40-password"
              type="password"
              dir="ltr"
              autoComplete="off"
              placeholder="Enter teacher code..."
              className="tcc-input font-en"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError("");
              }}
            />
            {error ? <div className="tcc-feedback is-err">{error}</div> : null}
            <div>
              <button type="submit" className="tcc-btn-primary">
                فتح مساحة المعلم
              </button>
            </div>
          </form>
        </section>
      ) : (
        <Suspense
          fallback={
            <div className="tcc-brief text-sm font-bold text-slate-800">
              جاري تحميل دليل المعلم وسجل التغطية...
            </div>
          }
        >
          <TeacherGuide40 />
        </Suspense>
      )}
    </section>
  );
}

export default TeacherArea40;
