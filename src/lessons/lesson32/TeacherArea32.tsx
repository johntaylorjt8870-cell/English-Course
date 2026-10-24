// ============================================================
// منطقة المعلم — الدرس 32 · THE DURATION STREAM
// محمية بكلمة مرور المعلم (somer173) — الحماية لا تُخفَّف.
// المحتوى: توجيه تدريسي كامل (لا مفاتيح إجابات جافة):
//   نظرة عامة · توزيع الحصة · خريطة التدفق · ملاحظات التدريس ·
//   حلول تمارين المصدر · rubrics · الأخطاء الشائعة · الأخطاء المتعمدة (12) ·
//   دليل الاختبار + جدول الأسئلة العشرين بمهاراتها ومراجعها وشروحها ·
//   خطة المعالجة · فهرس المصدر الحرفي (40 قسمًا).
// ============================================================

import { useState, type ReactNode } from "react";
import { PlatformTag, Rich, En } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { SOURCE_SECTIONS, SOURCE_LEDGER_COUNT_32, SOURCE_NUMBERED_COUNT_32 } from "./ledger32";
import {
  TEACHER_PASSWORD_32, TEACHER_32_OVERVIEW, TEACHER_32_TIMING, TEACHER_32_FLOW, TEACHER_32_NOTES,
  TEACHER_32_SOLUTIONS, TEACHER_32_RUBRICS, TEACHER_32_MISTAKES, INTENTIONALLY_WRONG_32,
  TEACHER_32_TEST_GUIDE, TEACHER_32_REMEDIATION, TEACHER_32_SOURCE_NOTE,
} from "./teacherData";
import { TEST_32, TEST_32_SKILLS, LEVEL_LABEL_32 } from "./testData";
import { FOCUS32, SourceBadge32 } from "./kit32";
import { FinalTestAnswerKey } from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";

/** عدد الأسطر الحرفية في سجل المصدر */
const SOURCE_LINES_32 = SOURCE_SECTIONS.reduce((n, sec) => n + sec.units.length, 0);

const TYPE_AR: Record<string, string> = {
  single: "اختيار واحد", tf: "صح / خطأ", multi: "اختيار متعدد", order: "ترتيب",
  match: "مطابقة", spot: "حدّد الخطأ", typed: "كتابة",
};

export default function TeacherArea32({ unlocked, onUnlockChange, onGoSolutions }: { unlocked: boolean; onUnlockChange: (v: boolean) => void; onGoSolutions: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  // ---------------- البوابة (مقفلة) ----------------
  if (!unlocked) {
    return (
      <form
        className="l32-teacher-gate mx-auto max-w-md space-y-3"
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
        <h2 className="l32-h text-xl font-black text-[#312a8f]"><Rich text="👩‍🏫 منطقة المعلم" /></h2>
        <p className="text-sm font-bold text-[#46507f]">
          <Rich text="هذه المنطقة للمعلم فقط: توجيه التدريس، حلول أنشطة المصدر، الـ rubrics، الأخطاء الشائعة والمتعمدة، جدول الاختبار المشروح، وفهرس المصدر الحرفي." />
        </p>
        <label htmlFor="l32-teacher-pw" className="block text-sm font-black text-[#131b3f]"><Rich text="كلمة مرور المعلم" /></label>
        <input
          id="l32-teacher-pw"
          type="password"
          dir="ltr"
          autoComplete="off"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? "l32-teacher-err" : undefined}
          className={`font-en w-full rounded-xl border-2 border-[#c6c2f6] bg-white px-3 py-2 text-base font-bold text-[#131b3f] outline-none focus:border-[#4338ca] ${FOCUS32}`}
        />
        {err && <p id="l32-teacher-err" role="alert" className="text-sm font-black text-[#b91c1c]">✕ {err}</p>}
        <button type="submit" className={`l32-tap l32-tap-primary w-full justify-center ${FOCUS32}`}>🔓 <Rich text="دخول" /></button>
        <p className="text-xs font-bold text-[#5b6697]"><Rich text="لا يظهر أي محتوى قبل الدخول الصحيح." /></p>
      </form>
    );
  }

  // ---------------- المحتوى (مفتوح) ----------------
  return (
    <div className="space-y-3" data-area="l32-teacher-body">
      {/* مفتاح الاختبار النهائي — داخل منطقة المعلم المفتوحة بكلمة المرور */}
      <FinalTestAnswerKey lesson={32} questions={FINAL_TESTS[32]} accent="bg-[#4338ca]" />

      <header className="l32-card l32-card-indigo flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="l32-h text-xl font-black text-[#312a8f]"><Rich text="👩‍🏫 منطقة المعلم — الدرس 32 · تيّار المدة" /></h2>
          <p className="mt-1 text-xs font-bold text-[#3c4670]">
            <Rich text={`40 خطوة · ${SOURCE_NUMBERED_COUNT_32} قسمًا مرقّمًا من ${SOURCE_LEDGER_COUNT_32} قسمًا · ${SOURCE_LINES_32} سطرًا مصدريًا محفوظًا · اختبار من 20 سؤالًا جديدًا.`} />
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onGoSolutions} className={`l32-tap l32-tap-soft ${FOCUS32}`}>🔑 <Rich text="حلول الاختبار" /></button>
          <button type="button" onClick={() => onUnlockChange(false)} className={`l32-tap l32-tap-quiet ${FOCUS32}`}>🔒 <Rich text="قفل منطقة المعلم" /></button>
        </div>
      </header>

      <Card title={TEACHER_32_OVERVIEW.title} tone="indigo">
        <Sub head="أهداف الدرس">
          <ul className="l32-teach">{TEACHER_32_OVERVIEW.objectives.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>
        </Sub>
        <Sub head="المتطلبات السابقة">
          <ul className="l32-teach">{TEACHER_32_OVERVIEW.prerequisites.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>
        </Sub>
        <Sub head="المحاور الأساسية">
          <ul className="l32-teach">{TEACHER_32_OVERVIEW.core.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>
        </Sub>
      </Card>

      <Card title="⏱️ توزيع الحصة (تقريبي)" tone="aqua">
        <ol className="l32-teach list-decimal ps-5">{TEACHER_32_TIMING.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ol>
      </Card>

      <Card title="🧭 خريطة التدفق: قسم ← خطوات ← تفاعل ← ما تراقبه" tone="aqua">
        <div className="overflow-x-auto">
          <table className="l32-teacher-table w-full min-w-[38rem] border-collapse text-xs">
            <caption className="sr-only">خريطة أقسام الدرس وخطواته وتفاعلاته</caption>
            <thead>
              <tr>
                <th scope="col" className="p-2 text-start">الخطوات</th>
                <th scope="col" className="p-2 text-start">القسم</th>
                <th scope="col" className="p-2 text-start">التفاعل في الدرس</th>
                <th scope="col" className="p-2 text-start">ما يراقبه المعلم</th>
              </tr>
            </thead>
            <tbody>
              {TEACHER_32_FLOW.map((f) => (
                <tr key={f.range} className="align-top">
                  <td className="p-2 font-en font-black">{f.range}</td>
                  <td className="p-2 font-bold"><Rich text={f.title} /></td>
                  <td className="p-2"><Rich text={f.interaction} /></td>
                  <td className="p-2"><Rich text={f.watch} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="🧭 ملاحظات التدريس" tone="gold">
        <p className="flex flex-wrap items-center gap-1.5 text-xs font-black text-[#855505]">
          <PlatformTag />
          <span dir="rtl"><Rich text="كل شرح في هذه المنطقة من كتابة المنصة، إلا الاقتباس الموسوم «المصدر»." /></span>
        </p>
        {TEACHER_32_NOTES.map((n, i) => (
          <Sub key={i} head={n.head}>
            <ul className="l32-teach">{n.lines.map((l, j) => <li key={j}><Rich text={l} /></li>)}</ul>
          </Sub>
        ))}
      </Card>

      <Card title="🔑 حلول تمارين المصدر (مرجع المعلم)" tone="indigo">
        <p className="text-xs font-bold text-[#46507f]">
          <Rich text="الإجابات المعتمدة هي إجابات المصدر. الأخطاء المتعمدة تُدرَّس كتصحيح، ولا تُغيَّر صيغها في السجل." />
        </p>
        <div className="flex flex-wrap items-center gap-2"><SourceBadge32 src teacherOnly /></div>
        {TEACHER_32_SOLUTIONS.map((s, i) => (
          <Sub key={i} head={s.head}>
            <ul className="l32-teach">{s.lines.map((l, j) => <li key={j}><LatinRuns text={l} /></li>)}</ul>
          </Sub>
        ))}
      </Card>

      <Card title="📊 rubrics للتقييم" tone="coral">
        {TEACHER_32_RUBRICS.map((r, i) => (
          <Sub key={i} head={r.head}>
            <table className="l32-teacher-table w-full border-collapse text-xs">
              <caption className="sr-only">{`rubric: ${r.head}`}</caption>
              <tbody>
                {r.rows.map((row, j) => (
                  <tr key={j} className="align-top">
                    <th scope="row" className="w-28 p-2 text-start font-black"><Rich text={row.level} /></th>
                    <td className="p-2"><Rich text={row.desc} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Sub>
        ))}
      </Card>

      <Card title="⚠️ الأخطاء الشائعة وعلاجها" tone="coral">
        {TEACHER_32_MISTAKES.map((m, i) => (
          <Sub key={i} head={m.head}>
            <ul className="l32-teach">{m.lines.map((l, j) => <li key={j}><Rich text={l} /></li>)}</ul>
          </Sub>
        ))}
      </Card>

      <Card title="🪤 الأخطاء المتعمدة في المصدر (12) — تُدرَّس كتصحيح" tone="coral">
        <div className="overflow-x-auto">
          <table className="l32-teacher-table w-full min-w-[34rem] border-collapse text-xs">
            <caption className="sr-only">الأخطاء المتعمدة في المصدر مع التصحيح والموضع</caption>
            <thead>
              <tr>
                <th scope="col" className="p-2 text-start">الرقم</th>
                <th scope="col" className="p-2 text-start">الخطأ كما ورد</th>
                <th scope="col" className="p-2 text-start">التصحيح</th>
                <th scope="col" className="p-2 text-start">الموضع</th>
              </tr>
            </thead>
            <tbody>
              {INTENTIONALLY_WRONG_32.map((e) => (
                <tr key={e.id} className="align-top">
                  <td className="p-2 font-en font-black">{e.id}</td>
                  <td className="p-2 font-en font-bold text-[#7f1414]"><LatinRuns text={e.wrong} /></td>
                  <td className="p-2 font-en font-bold text-[#14532d]">
                    <LatinRuns text={e.right} />
                    <br />
                    <span className="text-[11px] font-bold text-[#5b6697]"><Rich text={e.note} /></span>
                  </td>
                  <td className="p-2 font-bold"><Rich text={e.section} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="🧪 دليل الاختبار للمعلم" tone="gold">
        {TEACHER_32_TEST_GUIDE.map((t, i) => (
          <Sub key={i} head={t.head}>
            <ul className="l32-teach">{t.lines.map((l, j) => <li key={j}><Rich text={l} /></li>)}</ul>
          </Sub>
        ))}
        <p className="text-xs font-bold text-[#46507f]">
          <Rich text="توزيع الأسئلة: 6 Basic · 7 Medium · 4 Advanced · 3 Thinking — كلها جديدة ومؤلفة بسيناريوهات غير موجودة في الشرح." />
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="l32-chip l32-chip-indigo"><Rich text="المهارات المقيسة:" /></span>
          {TEST_32_SKILLS.map((sk) => <span key={sk} className="l32-chip l32-chip-aqua"><Rich text={sk} /></span>)}
        </div>

        <Sub head="جدول الأسئلة العشرين: المهارة · مرجع المصدر · الإجابة · الشرح">
          <div className="overflow-x-auto">
            <table className="l32-teacher-table w-full min-w-[46rem] border-collapse text-xs">
              <caption className="sr-only">جدول أسئلة اختبار الدرس 32 مع المهارات والمراجع والإجابات والشروح</caption>
              <thead>
                <tr>
                  <th scope="col" className="p-2 text-start">#</th>
                  <th scope="col" className="p-2 text-start">النوع / المستوى</th>
                  <th scope="col" className="p-2 text-start">المهارة</th>
                  <th scope="col" className="p-2 text-start">مرجع المصدر</th>
                  <th scope="col" className="p-2 text-start">الإجابة</th>
                  <th scope="col" className="p-2 text-start">شرح المنصة + الفخ</th>
                </tr>
              </thead>
              <tbody>
                {TEST_32.map((q) => (
                  <tr key={q.n} className="align-top">
                    <td className="p-2 font-en font-black">{q.n}</td>
                    <td className="p-2 font-bold">
                      <Rich text={TYPE_AR[q.type]} />
                      <br />
                      <span dir="ltr" className="font-en text-[11px]"><En>{LEVEL_LABEL_32[q.level]}</En></span>
                    </td>
                    <td className="p-2"><Rich text={q.skill} /></td>
                    <td className="p-2"><Rich text={q.ref} /></td>
                    <td className="p-2"><Rich text={q.answerText} /></td>
                    <td className="p-2">
                      <Rich text={q.why} />
                      {q.trap && <><br /><span className="font-bold text-[#a32a4c]"><Rich text={`⚠️ ${q.trap}`} /></span></>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Sub>
      </Card>

      <Card title="🛠️ خطة المعالجة" tone="aqua">
        {TEACHER_32_REMEDIATION.map((t, i) => (
          <Sub key={i} head={t.head}>
            <ul className="l32-teach">{t.lines.map((l, j) => <li key={j}><Rich text={l} /></li>)}</ul>
          </Sub>
        ))}
      </Card>

      <Card title="📜 فهرس المصدر الحرفي للمعلم" tone="slate">
        <p className="text-sm font-bold text-[#3c4670]"><Rich text={TEACHER_32_SOURCE_NOTE} /></p>
        <p className="text-xs font-bold text-[#5b6697]">
          <Rich text={`${SOURCE_NUMBERED_COUNT_32} قسمًا مرقّمًا · ${SOURCE_LEDGER_COUNT_32} قسمًا في السجل · ${SOURCE_LINES_32} سطرًا حرفيًا.`} />
        </p>
        <ol className="space-y-1">
          {SOURCE_SECTIONS.map((sec, i) => (
            <li key={sec.id}>
              <details>
                <summary className={`cursor-pointer rounded-xl px-2 py-1 text-sm font-bold text-[#131b3f] hover:bg-[#eef1f7] ${FOCUS32}`}>
                  <span className="font-en text-xs text-[#5b6697]">{i + 1}.</span> <Rich text={sec.title} />
                  <span className="l32-chip ms-2"><Rich text={`${sec.units.length} وحدة`} /></span>
                </summary>
                <ul className="l32-teach mt-1 ps-6">
                  {sec.units.map((u, j) => <li key={j}><Rich text={u} /></li>)}
                </ul>
              </details>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

const TONE: Record<string, string> = {
  aqua: "l32-card-aqua",
  indigo: "l32-card-indigo",
  coral: "l32-card-coral",
  gold: "l32-card-gold",
  slate: "l32-card-slate",
};

function Card({ title, tone = "aqua", children }: { title: string; tone?: string; children: ReactNode }) {
  return (
    <section className={`l32-card ${TONE[tone] ?? ""} space-y-2.5`}>
      <h3 className="l32-h text-lg font-black text-[#131b3f]"><Rich text={title} /></h3>
      {children}
    </section>
  );
}

function Sub({ head, children }: { head: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5 rounded-2xl border border-[#e8edf9] bg-[#f8faff] p-2.5">
      <h4 className="l32-h text-sm font-black text-[#0b5f77]"><Rich text={head} /></h4>
      {children}
    </div>
  );
}
