import { Solutions32 } from "./TestArea32";
import TeacherWorkspace, { TeacherSection } from "../../shared/TeacherWorkspace";
// ============================================================
// منطقة المعلم — الدرس 32 (محمية بكلمة مرور المعلم)
// ============================================================

import { useState, type ReactNode } from "react";
import { PlatformTag, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { SOURCE_SECTIONS, SOURCE_LEDGER_COUNT_32, SOURCE_NUMBERED_COUNT_32 } from "./ledger32";
import {
  TEACHER_PASSWORD_32, TEACHER_32_OVERVIEW, TEACHER_32_TIMING, TEACHER_32_NOTES, TEACHER_32_SOLUTIONS,
  TEACHER_32_RUBRICS, TEACHER_32_MISTAKES, INTENTIONALLY_WRONG_32, TEACHER_32_TEST_GUIDE,
  TEACHER_32_REMEDIATION, TEACHER_32_SOURCE_NOTE,
} from "./teacherData";
import { FOCUS32 } from "./kit32";
import { FinalTestAnswerKey } from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";

export default function TeacherArea32({ unlocked, onUnlockChange, onGoSolutions }: { unlocked: boolean; onUnlockChange: (v: boolean) => void; onGoSolutions: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  if (!unlocked) {
    return (
      <form
        className="mx-auto max-w-md space-y-3 rounded-3xl border-2 border-slate-300 bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (pw === TEACHER_PASSWORD_32) {
            setErr("");
            setPw("");
            onUnlockChange(true);
          } else {
            setErr("كلمة المرور غير صحيحة.");
          }
        }}
      >
        <h2 className="font-head text-xl font-black text-slate-900"><Rich text="👩‍🏫 منطقة المعلم" /></h2>
        <p className="text-sm font-bold text-slate-600"><Rich text="هذه المنطقة للمعلم فقط: شرح التدريس، حلول الأنشطة، الـ rubrics، الأخطاء الشائعة، وفهرس المصدر الحرفي." /></p>
        <label htmlFor="l32-teacher-pw" className="block text-sm font-black text-slate-800"><Rich text="كلمة مرور المعلم" /></label>
        <input
          id="l32-teacher-pw"
          type="password"
          dir="ltr"
          autoComplete="off"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? "l32-teacher-err" : undefined}
          className="font-en w-full rounded-xl border-2 border-slate-300 px-3 py-2 text-base font-bold outline-none focus:border-emerald-500"
        />
        {err && <p id="l32-teacher-err" role="alert" className="text-sm font-black text-rose-700">✕ {err}</p>}
        <button type="submit" className={`w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-black text-white hover:bg-slate-700 ${FOCUS32}`}>🔓 <Rich text="دخول" /></button>
      </form>
    );
  }

  return (
    <div className="space-y-4" data-area="l32-teacher-body">
<header className="flex flex-wrap items-center justify-between gap-2 rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h2 className="font-head text-xl font-black text-slate-900"><Rich text="👩‍🏫 منطقة المعلم — الدرس 32" /></h2>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onGoSolutions} className={`rounded-xl border-2 border-slate-300 bg-white px-3 py-1.5 text-xs font-black text-slate-700 ${FOCUS32}`}><Rich text="🔑 حلول الاختبار" /></button>
          <button type="button" onClick={() => onUnlockChange(false)} className={`rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700 ${FOCUS32}`}><Rich text="🔒 قفل منطقة المعلم" /></button>
        </div>
      </header>
<TeacherWorkspace lesson={32}>
      {/* مفتاح الاختبار النهائي — داخل منطقة المعلم المفتوحة بكلمة المرور */}
      <TeacherSection title="مفتاح الاختبار النهائي" category="assessment">
<FinalTestAnswerKey lesson={32} questions={FINAL_TESTS[32]} accent="bg-emerald-700" />
</TeacherSection>


      <TeacherSection title="نظرة عامة" category="teaching">
<Card title={TEACHER_32_OVERVIEW.title}>
        <Sub head="أهداف الدرس">
          <ul className="list-disc space-y-1 ps-5 text-sm font-bold text-slate-800">{TEACHER_32_OVERVIEW.objectives.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>
        </Sub>
        <Sub head="المتطلبات السابقة">
          <ul className="list-disc space-y-1 ps-5 text-sm font-bold text-slate-700">{TEACHER_32_OVERVIEW.prerequisites.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>
        </Sub>
        <Sub head="المحاور الأساسية">
          <ul className="list-disc space-y-1 ps-5 text-sm font-bold text-slate-700">{TEACHER_32_OVERVIEW.core.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>
        </Sub>
      </Card>
</TeacherSection>

      <TeacherSection title="توزيع الحصة" category="teaching">
<Card title="⏱️ توزيع الحصة (تقريبي)">
        <ol className="list-decimal space-y-1 ps-5 text-sm font-bold text-slate-700">{TEACHER_32_TIMING.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ol>
      </Card>
</TeacherSection>

      <TeacherSection title="ملاحظات التدريس" category="teaching">
<Card title="🧭 ملاحظات التدريس">
        <p className="text-xs font-black text-amber-900"><PlatformTag /> <Rich text="كل شرح في هذه المنطقة من كتابة المنصة، إلا الاقتباس الموسوم «المصدر»." /></p>
        {TEACHER_32_NOTES.map((n, i) => (
          <Sub key={i} head={n.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-slate-700">{n.lines.map((l, j) => <li key={j}><Rich text={l} /></li>)}</ul>
          </Sub>
        ))}
      </Card>
</TeacherSection>

      <TeacherSection title="حلول تمارين المصدر" category="source">
<Card title="🔑 حلول تمارين المصدر (مرجع المعلم)">
        <p className="text-xs font-bold text-slate-600"><Rich text="الإجابات المعتمدة هي إجابات المصدر. الأخطاء المتعمدة تُدرَّس كتصحيح، ولا تُغيَّر صيغها." /></p>
        {TEACHER_32_SOLUTIONS.map((s, i) => (
          <Sub key={i} head={s.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-slate-700">{s.lines.map((l, j) => <li key={j} className="font-en"><LatinRuns text={l} /></li>)}</ul>
          </Sub>
        ))}
      </Card>
</TeacherSection>

      <TeacherSection title="سلالم التقييم" category="teaching">
<Card title="📊 rubrics للتقييم">
        {TEACHER_32_RUBRICS.map((r, i) => (
          <Sub key={i} head={r.head}>
            <table className="w-full border-collapse text-sm">
              <tbody>
                {r.rows.map((row, j) => (
                  <tr key={j} className="border-t border-slate-200 align-top">
                    <th scope="row" className="w-28 py-1.5 pe-2 text-start text-xs font-black text-slate-900"><Rich text={row.level} /></th>
                    <td className="py-1.5 text-xs font-semibold text-slate-700"><Rich text={row.desc} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Sub>
        ))}
      </Card>
</TeacherSection>

      <TeacherSection title="الأخطاء الشائعة" category="teaching">
<Card title="⚠️ الأخطاء الشائعة وعلاجها">
        {TEACHER_32_MISTAKES.map((m, i) => (
          <Sub key={i} head={m.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-slate-700">{m.lines.map((l, j) => <li key={j}><Rich text={l} /></li>)}</ul>
          </Sub>
        ))}
      </Card>
</TeacherSection>

      <TeacherSection title="تصحيح أخطاء المصدر" category="source">
<Card title="🪤 الأخطاء المتعمدة في المصدر (12) — تُدرَّس كتصحيح">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-sm">
            <caption className="sr-only">الأخطاء المتعمدة في المصدر مع التصحيح</caption>
            <thead>
              <tr className="bg-slate-100 text-xs font-black text-slate-700">
                <th scope="col" className="p-2 text-start">الرقم</th>
                <th scope="col" className="p-2 text-start">الخطأ كما ورد</th>
                <th scope="col" className="p-2 text-start">التصحيح</th>
                <th scope="col" className="p-2 text-start">الموضع</th>
              </tr>
            </thead>
            <tbody>
              {INTENTIONALLY_WRONG_32.map((e) => (
                <tr key={e.id} className="border-t border-slate-200 align-top">
                  <td className="p-2 font-en text-xs font-black">{e.id}</td>
                  <td className="p-2 font-en text-xs font-bold text-rose-800"><LatinRuns text={e.wrong} /></td>
                  <td className="p-2 font-en text-xs font-bold text-emerald-800"><LatinRuns text={e.right} /><br /><span className="font-sans text-[11px] text-slate-500"><Rich text={e.note} /></span></td>
                  <td className="p-2 text-xs font-bold text-slate-600"><Rich text={e.section} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
</TeacherSection>

      <TeacherSection title="دليل الاختبار" category="teaching">
<Card title="🧪 دليل الاختبار للمعلم">
        {TEACHER_32_TEST_GUIDE.map((t, i) => (
          <Sub key={i} head={t.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-slate-700">{t.lines.map((l, j) => <li key={j}><Rich text={l} /></li>)}</ul>
          </Sub>
        ))}
        <p className="text-xs font-bold text-slate-600"><Rich text="توزيع الأسئلة: 6 Basic · 7 Medium · 4 Advanced · 3 Thinking، كلها جديدة وليست نسخًا من أسئلة المصدر." /></p>
      </Card>
</TeacherSection>

      <TeacherSection title="خطة المعالجة" category="teaching">
<Card title="🛠️ خطة المعالجة">
        {TEACHER_32_REMEDIATION.map((t, i) => (
          <Sub key={i} head={t.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-slate-700">{t.lines.map((l, j) => <li key={j}><Rich text={l} /></li>)}</ul>
          </Sub>
        ))}
      </Card>
</TeacherSection>

      <TeacherSection title="فهرس المصدر" category="source">
<Card title="📜 فهرس المصدر الحرفي للمعلم">
        <p className="text-sm font-bold text-slate-700"><Rich text={TEACHER_32_SOURCE_NOTE} /></p>
        <p className="text-xs font-bold text-slate-500"><Rich text={`${SOURCE_NUMBERED_COUNT_32} قسمًا مرقّمًا · ${SOURCE_LEDGER_COUNT_32} وحدة في السجل.`} /></p>
        <ol className="space-y-1">
          {SOURCE_SECTIONS.map((sec, i) => (
            <li key={sec.id}>
              <details>
                <summary className={`cursor-pointer rounded-lg px-2 py-1 text-sm font-bold text-slate-800 hover:bg-slate-50 ${FOCUS32}`}>
                  <span className="font-en text-xs text-slate-400">{i + 1}.</span> <Rich text={sec.title} />
                </summary>
                <ul className="mt-1 space-y-1 ps-6">
                  {sec.units.map((u, j) => <li key={j} className="text-sm font-semibold text-slate-700"><Rich text={u} /></li>)}
                </ul>
              </details>
            </li>
          ))}
        </ol>
      </Card>
</TeacherSection>
    <TeacherSection title="مفتاح منطقة الاختبارات — 20 سؤالًا" category="assessment"><Solutions32 unlocked={true} onGoTest={onGoSolutions} onGoTeacher={onGoSolutions} /></TeacherSection>
</TeacherWorkspace>
</div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
      <h3 className="font-head text-lg font-black text-slate-900"><Rich text={title} /></h3>
      {children}
    </section>
  );
}

function Sub({ head, children }: { head: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5 rounded-2xl bg-slate-50 p-3">
      <h4 className="text-sm font-black text-emerald-900"><Rich text={head} /></h4>
      {children}
    </div>
  );
}
