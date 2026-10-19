// ============================================================
// منطقة المعلم — الدرس 34 (محمية بكلمة مرور المعلم)
// ============================================================

import { useState, type ReactNode } from "react";
import { PlatformTag, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { SOURCE_SECTIONS_34, SOURCE_LEDGER_COUNT_34, SOURCE_NUMBERED_COUNT_34 } from "./ledger34";
import {
  TEACHER_PASSWORD_34,
  TEACHER_34_OVERVIEW,
  TEACHER_34_TIMING,
  TEACHER_34_NOTES,
  TEACHER_34_SOLUTIONS,
  TEACHER_34_RUBRICS,
  TEACHER_34_MISTAKES,
  INTENTIONALLY_WRONG_34,
  TEACHER_34_TEST_GUIDE,
  TEACHER_34_REMEDIATION,
  TEACHER_34_SOURCE_NOTE,
} from "./teacherData";
import { FOCUS34 } from "./kit34";
import DetailedSolutions34 from "./DetailedSolutions34";
import { DETAILED_TEST_SOLUTIONS_34 } from "./solutionsData34";
import { FinalTestAnswerKey } from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";

export default function TeacherArea34({
  unlocked,
  onUnlockChange,
  onGoSolutions,
}: {
  unlocked: boolean;
  onUnlockChange: (v: boolean) => void;
  onGoSolutions: () => void;
}) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  if (!unlocked) {
    return (
      <form
        className="l34-teacher-gate mx-auto max-w-md space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (pw === TEACHER_PASSWORD_34) {
            setErr("");
            setPw("");
            onUnlockChange(true);
          } else {
            setErr("كلمة المرور غير صحيحة.");
          }
        }}
      >
        <h2 className="text-xl font-black text-teal-950">
          <Rich text="👩‍🏫 منطقة المعلم" />
        </h2>
        <p className="text-sm font-bold text-teal-700">
          <Rich text="هذه المنطقة للمعلم فقط: شرح التدريس، حلول الأنشطة، الـ rubrics، الأخطاء الشائعة، وفهرس المصدر الحرفي." />
        </p>
        <label htmlFor="l34-teacher-pw" className="block text-sm font-black text-teal-900">
          <Rich text="كلمة مرور المعلم" />
        </label>
        <input
          id="l34-teacher-pw"
          type="password"
          dir="ltr"
          autoComplete="off"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? "l34-teacher-err" : undefined}
          className="w-full rounded-xl border-2 border-teal-300 px-3 py-2 text-base font-bold outline-none focus:border-teal-600"
        />
        {err && (
          <p id="l34-teacher-err" role="alert" className="text-sm font-black text-rose-700">
            ✕ {err}
          </p>
        )}
        <button
          type="submit"
          className={`w-full rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-black text-white hover:bg-teal-700 ${FOCUS34}`}
        >
          🔓 <Rich text="دخول" />
        </button>
      </form>
    );
  }

  return (
    <div className="l34-teacher" data-area="l34-teacher-body">
      {/* مفتاح الاختبار النهائي — داخل منطقة المعلم المفتوحة بكلمة المرور */}
      <FinalTestAnswerKey lesson={34} questions={FINAL_TESTS[34]} accent="bg-teal-800" />
      <header className="flex flex-wrap items-center justify-between gap-2 rounded-3xl border-2 border-teal-200 bg-white p-4">
        <h2 className="text-xl font-black text-teal-950">
          <Rich text="👩‍🏫 منطقة المعلم — الدرس 34" />
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onGoSolutions}
            className={`rounded-xl border-2 border-teal-300 bg-white px-3 py-1.5 text-xs font-black text-teal-800 ${FOCUS34}`}
          >
            <Rich text="🔑 حلول الاختبار" />
          </button>
          <button
            type="button"
            onClick={() => onUnlockChange(false)}
            className={`rounded-xl bg-teal-100 px-3 py-1.5 text-xs font-black text-teal-800 ${FOCUS34}`}
          >
            <Rich text="🔒 قفل منطقة المعلم" />
          </button>
        </div>
      </header>

      <Card title={TEACHER_34_OVERVIEW.title}>
        <Sub head="أهداف الدرس">
          <ul className="list-disc space-y-1 ps-5 text-sm font-bold text-teal-900">
            {TEACHER_34_OVERVIEW.objectives.map((t, i) => (
              <li key={i}>
                <Rich text={t} />
              </li>
            ))}
          </ul>
        </Sub>
        <Sub head="المتطلبات السابقة">
          <ul className="list-disc space-y-1 ps-5 text-sm font-bold text-teal-800">
            {TEACHER_34_OVERVIEW.prerequisites.map((t, i) => (
              <li key={i}>
                <Rich text={t} />
              </li>
            ))}
          </ul>
        </Sub>
        <Sub head="المحاور الأساسية">
          <ul className="list-disc space-y-1 ps-5 text-sm font-bold text-teal-800">
            {TEACHER_34_OVERVIEW.core.map((t, i) => (
              <li key={i}>
                <Rich text={t} />
              </li>
            ))}
          </ul>
        </Sub>
      </Card>

      <Card title="⏱️ توزيع الحصة (تقريبي)">
        <ol className="list-decimal space-y-1 ps-5 text-sm font-bold text-teal-800">
          {TEACHER_34_TIMING.map((t, i) => (
            <li key={i}>
              <Rich text={t} />
            </li>
          ))}
        </ol>
      </Card>

      <Card title="🧭 ملاحظات التدريس">
        <p className="text-xs font-black text-amber-900">
          <PlatformTag /> <Rich text="كل شرح في هذه المنطقة من كتابة المنصة، إلا الاقتباس الموسوم «المصدر»." />
        </p>
        {TEACHER_34_NOTES.map((n, i) => (
          <Sub key={i} head={n.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-teal-800">
              {n.lines.map((l, j) => (
                <li key={j}>
                  <Rich text={l} />
                </li>
              ))}
            </ul>
          </Sub>
        ))}
      </Card>

      <Card title="🔑 حلول تمارين المصدر (مرجع المعلم)">
        <p className="text-xs font-bold text-teal-700">
          <Rich text="الإجابات المعتمدة هي إجابات المصدر. الأخطاء المتعمدة تُدرَّس كتصحيح، ولا تُغيَّر صيغها." />
        </p>
        {TEACHER_34_SOLUTIONS.map((s, i) => (
          <Sub key={i} head={s.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-teal-800">
              {s.lines.map((l, j) => (
                <li key={j} dir="auto">
                  <LatinRuns text={l} />
                </li>
              ))}
            </ul>
          </Sub>
        ))}
      </Card>

      <Card title="🧪 الحلول التفصيلية للاختبار — 25 سؤالًا">
        <p className="text-xs font-bold text-teal-700">
          <Rich text="مفتاح كامل مشتق وفق قواعد الدرس (المصدر يعِد بعرض الحلول دون سردها): إجابة صحيحة + سبب + بنية نحوية لكل سؤال، ونماذج وبدائل مقبولة للأسئلة الخمسة الحرة." />
        </p>
        <p className="text-[11px] font-bold text-amber-800">
          <Rich text={`الإجمالي: ${DETAILED_TEST_SOLUTIONS_34.length} / 25 — تُقبل البدائل عندما تحقق وظيفة الجملة والبناء نفسه.`} />
        </p>
        <DetailedSolutions34 />
      </Card>

      <Card title="📊 rubrics للتقييم">
        {TEACHER_34_RUBRICS.map((r, i) => (
          <Sub key={i} head={r.head}>
            <table className="w-full border-collapse text-sm">
              <tbody>
                {r.rows.map((row, j) => (
                  <tr key={j} className="border-t border-teal-200 align-top">
                    <th scope="row" className="w-28 py-1.5 pe-2 text-start text-xs font-black text-teal-950">
                      <Rich text={row.level} />
                    </th>
                    <td className="py-1.5 text-xs font-semibold text-teal-800">
                      <Rich text={row.desc} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Sub>
        ))}
      </Card>

      <Card title="⚠️ الأخطاء الشائعة وعلاجها">
        {TEACHER_34_MISTAKES.map((m, i) => (
          <Sub key={i} head={m.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-teal-800">
              {m.lines.map((l, j) => (
                <li key={j} dir="auto">
                  <LatinRuns text={l} />
                </li>
              ))}
            </ul>
          </Sub>
        ))}
      </Card>

      <Card title={`🪤 الأخطاء المتعمدة في المصدر (${INTENTIONALLY_WRONG_34.length}) — تُدرَّس كتصحيح`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[33rem] border-collapse text-sm">
            <caption className="sr-only">الأخطاء المتعمدة في المصدر مع التصحيح</caption>
            <thead>
              <tr className="bg-teal-100 text-xs font-black text-teal-800">
                <th scope="col" className="p-2 text-start">
                  الرقم
                </th>
                <th scope="col" className="p-2 text-start">
                  الخطأ كما ورد
                </th>
                <th scope="col" className="p-2 text-start">
                  التصحيح
                </th>
                <th scope="col" className="p-2 text-start">
                  الموضع
                </th>
              </tr>
            </thead>
            <tbody>
              {INTENTIONALLY_WRONG_34.map((e) => (
                <tr key={e.id} className="border-t border-teal-200 align-top">
                  <td className="p-2 text-xs font-black text-teal-900">{e.id}</td>
                  <td className="p-2 text-xs font-bold text-rose-800" dir="ltr">
                    <LatinRuns text={e.wrong} />
                  </td>
                  <td className="p-2 text-xs font-bold text-emerald-800" dir="ltr">
                    <LatinRuns text={e.right} />
                    <br />
                    <span className="text-[11px] text-teal-600" dir="rtl">
                      <Rich text={e.note} />
                    </span>
                  </td>
                  <td className="p-2 text-xs font-bold text-teal-700">
                    <Rich text={e.section} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="🧪 دليل الاختبار للمعلم">
        {TEACHER_34_TEST_GUIDE.map((t, i) => (
          <Sub key={i} head={t.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-teal-800">
              {t.lines.map((l, j) => (
                <li key={j}>
                  <Rich text={l} />
                </li>
              ))}
            </ul>
          </Sub>
        ))}
        <p className="text-xs font-bold text-teal-700">
          <Rich text="توزيع الأسئلة: 5 مستويات × 5 أسئلة = 25 سؤالًا من قسم المصدر ㉞ (Future Simple Master Test)." />
        </p>
      </Card>

      <Card title="🛠️ خطة المعالجة">
        {TEACHER_34_REMEDIATION.map((t, i) => (
          <Sub key={i} head={t.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-teal-800">
              {t.lines.map((l, j) => (
                <li key={j} dir="auto">
                  <LatinRuns text={l} />
                </li>
              ))}
            </ul>
          </Sub>
        ))}
      </Card>

      <Card title="📜 فهرس المصدر الحرفي للمعلم">
        <div className="rounded-xl bg-amber-50 px-3 py-2 text-[12px] font-bold text-amber-900">
          <Rich text={TEACHER_34_SOURCE_NOTE} />
        </div>
        <p className="text-xs font-bold text-teal-600">
          <Rich text={`${SOURCE_NUMBERED_COUNT_34} قسمًا مرقّمًا · ${SOURCE_LEDGER_COUNT_34} وحدة في السجل.`} />
        </p>
        <ol className="space-y-1">
          {SOURCE_SECTIONS_34.map((sec, i) => (
            <li key={sec.id}>
              <details>
                <summary className={`cursor-pointer rounded-lg px-2 py-1 text-sm font-bold text-teal-900 hover:bg-teal-50 ${FOCUS34}`}>
                  <span className="text-xs text-teal-400">{i + 1}.</span> <Rich text={sec.title} />
                </summary>
                <ul className="mt-1 space-y-1 ps-6">
                  {sec.units.map((u, j) => (
                    <li key={j} className="text-sm font-semibold text-teal-800">
                      <Rich text={u} />
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 rounded-3xl border-2 border-teal-200 bg-white p-4">
      <h3 className="text-lg font-black text-teal-950">
        <Rich text={title} />
      </h3>
      {children}
    </section>
  );
}

function Sub({ head, children }: { head: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5 rounded-2xl bg-teal-50/70 p-3">
      <h4 className="text-sm font-black text-teal-900">
        <Rich text={head} />
      </h4>
      {children}
    </div>
  );
}
