import { lazy, Suspense, useState } from 'react';
import { Glyph44, Text44 } from './kit44';

// Same established client-side teacher mechanism/password as Lessons 38–43.
export const TEACHER_PASSWORD_44 = 'somer173';
const TeacherGuide44 = lazy(() => import('./TeacherGuide44'));

export function TeacherArea44({ unlocked, unlock, lock }: { unlocked: boolean; unlock: () => void; lock: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  if (unlocked) {
    return (
      <section data-area="teacher" className="teacherArea44">
        <header className="teacherOpenHead44">
          <div>
            <p className="kicker44" dir="ltr">TEACHER SPACE · محمي</p>
            <h2>مساحة المعلم مفتوحة</h2>
            <p>دليل التدريس، مفاتيح التدريبات، والحلول التفصيلية للاختبار.</p>
          </div>
          <button type="button" className="btn44 btn44--ghost" onClick={lock}>
            <Glyph44 name="lock" /> قفل مساحة المعلم
          </button>
        </header>
        <Suspense fallback={<p role="status" className="areaLoading44">جارٍ تحميل الدليل…</p>}>
          <TeacherGuide44 />
        </Suspense>
      </section>
    );
  }
  return (
    <section data-area="teacher" className="teacherGate44">
      <div className="teacherGateCard44">
        <span className="teacherLock44" aria-hidden="true"><Glyph44 name="lock" /></span>
        <p className="kicker44">TEACHER ACCESS</p>
        <h2>بوابة المعلم المحمية</h2>
        <p className="teacherGateText44">
          دليل التدريس ومفاتيح التدريبات والاختبار. استخدم رمز المعلم المعتمد في المنصة.
          المحتوى لا يُحمَّل قبل إدخال الرمز الصحيح.
        </p>
        <form onSubmit={e => {
          e.preventDefault();
          if (password.trim() === TEACHER_PASSWORD_44) { setPassword(''); setError(''); unlock(); }
          else setError('الرمز غير صحيح. حاول مجددًا.');
        }}>
          <label className="field44">
            <span className="fieldLabel44">رمز المعلم</span>
            <input type="password" autoComplete="current-password" value={password}
              onChange={e => setPassword(e.target.value)} required aria-invalid={!!error}
              aria-describedby={error ? 'teacher44-error' : undefined} />
          </label>
          <button type="submit" className="btn44 btn44--solid">فتح مساحة المعلم <Glyph44 name="arrow" /></button>
          {error && <p id="teacher44-error" className="fb44 fb44--no teacherErr44" role="alert">{error}</p>}
        </form>
        <p className="teacherGateFoot44"><Text44 text="المفاتيح تبقى خارج واجهة الطالب حتى التسليم." /></p>
      </div>
    </section>
  );
}
