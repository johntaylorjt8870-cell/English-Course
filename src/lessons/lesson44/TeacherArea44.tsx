import { lazy, Suspense, useState } from "react";
import { Glyph44, Text44 } from "./kit44";

// Shared client-side teacher password convention used across Lessons 38–44.
export const TEACHER_PASSWORD_44 = "somer173";
const TeacherGuide44 = lazy(() => import("./TeacherGuide44"));

export function TeacherArea44({
  unlocked,
  unlock,
  lock,
  onOpenSolutions,
  onBackToLearn,
}: {
  unlocked: boolean;
  unlock: () => void;
  lock: () => void;
  onOpenSolutions?: () => void;
  onBackToLearn?: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (unlocked) {
    return (
      <section data-area="teacher" className="teacherArea44">
        <header className="teacherOpenHead44">
          <div>
            <p className="kicker44">مساحة المعلم مفتوحة</p>
            <h2>دليل التدريس ومفاتيح التصحيح الكاملة</h2>
            <p>
              يشمل خطة الحصة، معالجة الأخطاء الشائعة، مفاتيح التدريبات الخمسة، ومفتاح الاختبار النهائي الشامل.
            </p>
          </div>
          <div className="taskActions44">
            {onOpenSolutions && (
              <button
                type="button"
                className="btn44 btn44--solid"
                onClick={onOpenSolutions}
              >
                عرض بطاقات الحلول <Glyph44 name="arrow" />
              </button>
            )}
            <button type="button" className="btn44 btn44--ghost" onClick={lock}>
              <Glyph44 name="lock" /> قفل مساحة المعلم
            </button>
          </div>
        </header>
        <Suspense
          fallback={
            <p role="status" className="areaLoading44">
              جارٍ تحميل دليل المعلم...
            </p>
          }
        >
          <TeacherGuide44 />
        </Suspense>
      </section>
    );
  }

  return (
    <section data-area="teacher" className="teacherGate44">
      <div className="teacherGateCard44">
        <span className="teacherLock44" aria-hidden="true">
          <Glyph44 name="lock" />
        </span>
        <p className="kicker44">بوابة المعلم التنظيمية</p>
        <h2>الدخول إلى مساحة المعلم</h2>
        <p className="teacherGateText44">
          أدخل رمز المعلم المعتمد في المنصة لفتح دليل التدريس ومفاتيح التدريبات والاختبار النهائي.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password.trim() === TEACHER_PASSWORD_44) {
              setPassword("");
              setError("");
              unlock();
            } else {
              setError("الرمز غير صحيح. يرجى التحقق والمحاولة مرة أخرى.");
            }
          }}
        >
          <label className="field44">
            <span className="fieldLabel44">رمز المعلم</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={!!error}
              aria-describedby={error ? "teacher44-error" : undefined}
            />
          </label>
          <div className="taskActions44">
            <button type="submit" className="btn44 btn44--solid">
              فتح مساحة المعلم <Glyph44 name="arrow" />
            </button>
            {onBackToLearn && (
              <button
                type="button"
                className="btn44 btn44--ghost"
                onClick={onBackToLearn}
              >
                العودة إلى التعلّم
              </button>
            )}
          </div>
          {error && (
            <p
              id="teacher44-error"
              className="fb44 fb44--no teacherErr44"
              role="alert"
            >
              {error}
            </p>
          )}
        </form>
        <p className="teacherGateFoot44">
          <Text44 text="ملاحظة تقنية: هذه البوابة تنظيمية داخل المتصفح لفصل مسار المتعلم عن مراجع التصحيح أثناء الدرس." />
        </p>
      </div>
    </section>
  );
}

export default TeacherArea44;
