import type { ReactNode } from "react";
import { PlatformTag, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { Text33, En33, FOCUS33 } from "./design33";
import { SOURCE_SECTIONS_33, SOURCE_NUMBERED_COUNT_33, SOURCE_UNIT_COUNT_33, SOURCE_CORRECTIONS_33, INTENTIONALLY_WRONG_33 } from "./ledger33";
import { COVERAGE_SUMMARY_33, COVERAGE_33, uncoveredUnits33, duplicatedUnits33 } from "./coverage33";
import {
  TEACHER_33_OVERVIEW,
  TEACHER_33_TIMING,
  TEACHER_33_NOTES,
  TEACHER_33_SOLUTIONS,
  TEACHER_33_ACCURACY,
  TEACHER_33_RUBRICS,
  TEACHER_33_MISTAKES,
  TEACHER_33_TEST_GUIDE,
  TEACHER_33_REMEDIATION,
  TEACHER_33_SOURCE_NOTE,
} from "./teacherData33";
import { SOLUTIONS_33 } from "./key33";
import SolutionsArea33 from "./SolutionsArea33";

// ============================================================
// دليل المعلم للدرس 33 — يُرسم داخل منطقة المعلم المفتوحة بكلمة المرور فقط.
// يجوز هنا عرض الفهرس التقني للمصدر وأرقام الوحدات ومفاتيح التصحيح.
// ============================================================

export default function TeacherGuide33() {
  return (
    <div className="space-y-4" data-teacher-guide="33">
      <Card title="🧭 نظرة عامة">
        <Stat label="الأقسام المرقّمة في المادة" value={TEACHER_33_OVERVIEW.sections} />
        <Stat label="وحدات نصية محفوظة" value={TEACHER_33_OVERVIEW.units} />
        <Stat label="صفحات الدرس" value={TEACHER_33_OVERVIEW.slides} />
        <Stat label="أسئلة الاختبار" value={TEACHER_33_OVERVIEW.testQuestions} />
        <Stat label="مفاتيح تصحيح مفصّلة" value={TEACHER_33_OVERVIEW.keys} />
        <Stat label="أخطاء مقصودة تُدرَّس كتصحيح" value={TEACHER_33_OVERVIEW.wrongCatalogue} />
        <p className="text-sm font-semibold text-slate-700">
          <Rich text={TEACHER_33_OVERVIEW.identity} />
        </p>
        <p className="text-xs font-bold text-slate-500">
          <Rich text={TEACHER_33_OVERVIEW.stations} />
        </p>
      </Card>

      <Card title="⏱️ توزيع الحصة (تقريبي)">
        <ol className="list-decimal space-y-1 ps-5 text-sm font-semibold text-slate-700">
          {TEACHER_33_TIMING.map((t, i) => (
            <li key={i}>
              <Rich text={t} />
            </li>
          ))}
        </ol>
      </Card>

      <Card title="📝 ملاحظات التدريس">
        <ProvenanceLine />
        {TEACHER_33_NOTES.map((n, i) => (
          <Sub key={i} head={n.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-slate-700">
              {n.lines.map((l, j) => (
                <li key={j}>
                  <Rich text={l} />
                </li>
              ))}
            </ul>
          </Sub>
        ))}
      </Card>

      <Card title="✅ سجل الدقة التعليمية">
        <ProvenanceLine />
        {TEACHER_33_ACCURACY.map((n, i) => (
          <Sub key={i} head={n.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-slate-700">
              {n.lines.map((l, j) => (
                <li key={j}>
                  <Rich text={l} />
                </li>
              ))}
            </ul>
          </Sub>
        ))}
        {SOURCE_CORRECTIONS_33.map((correction) => (
          <div key={correction.id} className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-3" data-correction={correction.id}>
            <p className="text-xs font-black text-amber-900">
              <Rich text={`تصحيح مطبَّق — المعرّف: ${correction.id} · الموضع التقني: ${correction.section} · الوحدة ${correction.unit} · المصدر: ${correction.origin === "source-note" ? "دليل من ملاحظة المادة نفسها" : "أضافته المنصة"}`} />
            </p>
            <p className="mt-1 text-sm font-semibold text-amber-900">
              <Rich text={`النص كما ورد: ${correction.original}`} />
            </p>
            <p className="text-sm font-semibold text-emerald-900">
              <Rich text={`النص المعتمد: ${correction.applied}`} />
            </p>
            <p className="mt-1 text-sm font-semibold text-amber-900">
              <Rich text={`السبب والدليل: ${correction.reason}`} />
            </p>
          </div>
        ))}
      </Card>

      <Card title="🔑 حلول تمارين المادة (مرجع المعلم)">
        <p className="text-xs font-bold text-slate-600">
          <Rich text="الإجابات المعروضة للطالب هي نفسها أدناه. البنود الموسومة «منصة» مفاتيحها أُعدّت في المنصة، والبقية واردة نصًّا في المادة." />
        </p>
        {TEACHER_33_SOLUTIONS.map((group, i) => (
          <Sub key={i} head={group.head}>
            <ul className="space-y-2">
              {group.rows.map((row, j) => (
                <li key={j} className="rounded-xl border border-slate-200 bg-white p-2">
                  {row.wrong && (
                    <p className="font-en text-sm font-bold text-rose-800">
                      <LatinRuns text={row.wrong} />
                    </p>
                  )}
                  <p className="font-en text-sm font-bold text-emerald-800">
                    <LatinRuns text={row.right} />
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-600">
                    <Rich text={row.note} />
                  </p>
                </li>
              ))}
            </ul>
          </Sub>
        ))}
      </Card>

      <Card title="🧪 مفتاح اختبار الدرس (25 سؤالًا)">
        <ProvenanceLine />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[38rem] border-collapse text-sm">
            <caption className="sr-only">مفتاح تصحيح اختبار الدرس 33</caption>
            <thead>
              <tr className="bg-slate-100 text-xs font-black text-slate-700">
                <th scope="col" className="p-2 text-start">
                  الرقم
                </th>
                <th scope="col" className="p-2 text-start">
                  الإجابة
                </th>
                <th scope="col" className="p-2 text-start">
                  الزمن
                </th>
                <th scope="col" className="p-2 text-start">
                  السبب
                </th>
              </tr>
            </thead>
            <tbody>
              {SOLUTIONS_33.map((entry) => (
                <tr key={entry.id} className="border-t border-slate-200 align-top" data-key-row={entry.id}>
                  <td className="p-2 font-en text-xs font-black">
                    {entry.number}
                    <span className="block font-sans text-[10px] font-bold text-slate-500">L{entry.level}</span>
                  </td>
                  <td className="p-2 text-xs font-bold text-emerald-800">
                    <LatinRuns text={entry.answer} />
                    {entry.accept && entry.accept.length > 0 && (
                      <span className="block font-en text-[10px] font-bold text-slate-500">تُقبل: {entry.accept.join(" · ")}</span>
                    )}
                  </td>
                  <td className="p-2 text-xs font-bold text-slate-700">
                    <En33 className="text-xs">{entry.tense}</En33>
                  </td>
                  <td className="p-2 text-xs font-semibold text-slate-600">
                    <Rich text={entry.reason} />
                    {entry.provenance === "platform" && <PlatformTag />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Sub head="الحلول كما يراها الطالب (عرض كامل)">
          <SolutionsArea33 answers={{}} teacher />
        </Sub>
      </Card>

      <Card title="🪤 الأخطاء المتعمدة في المادة — تُدرَّس كتصحيح">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[33rem] border-collapse text-sm">
            <caption className="sr-only">الأخطاء المتعمدة مع التصحيح</caption>
            <thead>
              <tr className="bg-slate-100 text-xs font-black text-slate-700">
                <th scope="col" className="p-2 text-start">
                  المعرّف
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
              {INTENTIONALLY_WRONG_33.map((e) => (
                <tr key={e.id} className="border-t border-slate-200 align-top">
                  <td className="p-2 font-en text-xs font-black">{e.id}</td>
                  <td className="p-2 font-en text-xs font-bold text-rose-800">
                    <LatinRuns text={e.wrong} />
                  </td>
                  <td className="p-2 font-en text-xs font-bold text-emerald-800">
                    <LatinRuns text={e.right} />
                    <span className="block font-sans text-[11px] text-slate-500">
                      <Rich text={e.note} />
                    </span>
                  </td>
                  <td className="p-2 text-xs font-bold text-slate-600">
                    <Rich text={e.section} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="📊 rubrics للتقييم">
        {TEACHER_33_RUBRICS.map((r, i) => (
          <Sub key={i} head={r.head}>
            <table className="w-full border-collapse text-sm">
              <tbody>
                {r.rows.map((row, j) => (
                  <tr key={j} className="border-t border-slate-200 align-top">
                    <th scope="row" className="w-28 py-1.5 pe-2 text-start text-xs font-black text-slate-900">
                      <Rich text={row.level} />
                    </th>
                    <td className="py-1.5 text-xs font-semibold text-slate-700">
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
        {TEACHER_33_MISTAKES.map((m, i) => (
          <Sub key={i} head={m.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-slate-700">
              {m.lines.map((l, j) => (
                <li key={j}>
                  <Rich text={l} />
                </li>
              ))}
            </ul>
          </Sub>
        ))}
      </Card>

      <Card title="🧪 دليل الاختبار وعزل المفتاح">
        <ProvenanceLine />
        {TEACHER_33_TEST_GUIDE.map((t, i) => (
          <Sub key={i} head={t.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-slate-700">
              {t.lines.map((l, j) => (
                <li key={j}>
                  <Rich text={l} />
                </li>
              ))}
            </ul>
          </Sub>
        ))}
      </Card>

      <Card title="🛠️ خطة المعالجة">
        {TEACHER_33_REMEDIATION.map((t, i) => (
          <Sub key={i} head={t.head}>
            <ul className="list-disc space-y-1 ps-5 text-sm font-semibold text-slate-700">
              {t.lines.map((l, j) => (
                <li key={j}>
                  <Rich text={l} />
                </li>
              ))}
            </ul>
          </Sub>
        ))}
      </Card>

      <Card title="📇 تقرير التغطية التقني">
        <p className="text-xs font-bold text-slate-600">
          <Rich text={`${COVERAGE_SUMMARY_33.numberedBlocks} قسمًا مرقّمًا · ${COVERAGE_SUMMARY_33.units} وحدة · ${COVERAGE_SUMMARY_33.slides} صفحة · ${COVERAGE_SUMMARY_33.stations} محطات · ${COVERAGE_SUMMARY_33.testQuestions} سؤالًا في ${COVERAGE_SUMMARY_33.testLevels} مستويات · ${COVERAGE_SUMMARY_33.practiceItems} بند تفاعل مقترن بالمحاولة`} />
        </p>
        <p className="text-xs font-bold text-emerald-800">
          <Rich text={`وحدات غير مغطاة: ${uncoveredUnits33().length} · وحدات مكررة: ${duplicatedUnits33().length} (يجب أن يكونا صفرًا)`} />
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-xs">
            <caption className="sr-only">تغطية وحدات المادة على صفحات الدرس</caption>
            <thead>
              <tr className="bg-slate-100 text-xs font-black text-slate-700">
                <th scope="col" className="p-2 text-start">
                  القسم
                </th>
                <th scope="col" className="p-2 text-start">
                  الوحدات
                </th>
                <th scope="col" className="p-2 text-start">
                  معروضة / مقترنة
                </th>
                <th scope="col" className="p-2 text-start">
                  الصفحات
                </th>
              </tr>
            </thead>
            <tbody>
              {COVERAGE_33.map((row) => (
                <tr key={row.id} className="border-t border-slate-200 align-top" data-coverage-row={row.id}>
                  <td className="p-2 font-bold text-slate-700">
                    <span className="font-en text-[10px] text-slate-400">[{row.id}] </span>
                    <Rich text={row.title} />
                  </td>
                  <td className="p-2 font-en font-black">{row.units}</td>
                  <td className="p-2 font-en font-bold text-slate-600">
                    {row.renderedUnits} / {row.gatedUnits}
                    <span className="block font-sans text-[10px] text-slate-500">
                      <Rich text={row.answerLocation} />
                    </span>
                  </td>
                  <td className="p-2 font-en font-semibold text-slate-600">
                    <Rich text={row.slides.join(" · ")} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="📜 فهرس المادة الحرفي للمعلم">
        <div className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900">
          <Rich text={TEACHER_33_SOURCE_NOTE} />
        </div>
        <p className="text-xs font-bold text-slate-500">
          <Rich text={`${SOURCE_NUMBERED_COUNT_33} قسمًا مرقّمًا · ${SOURCE_UNIT_COUNT_33} وحدة في السجل.`} />
        </p>
        <ol className="space-y-1">
          {SOURCE_SECTIONS_33.map((sec, i) => (
            <li key={sec.id}>
              <details>
                <summary className={`cursor-pointer rounded-lg px-2 py-1 text-sm font-bold text-slate-800 hover:bg-slate-50 ${FOCUS33}`}>
                  <span className="font-en text-xs text-slate-400">
                    {i + 1}. [{sec.id}]
                  </span>{" "}
                  <Rich text={sec.title} /> <span className="font-en text-xs text-slate-400">({sec.lines.length})</span>
                </summary>
                <ul className="mt-1 space-y-1 ps-6">
                  {sec.lines.map((u, j) => (
                    <li key={j} className="text-sm font-semibold text-slate-700">
                      <span className="font-en text-[10px] text-slate-400">{j}.</span> <Rich text={u} />
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

function ProvenanceLine() {
  return (
    <p className="text-xs font-black text-amber-900">
      <PlatformTag /> <Rich text="كل شرح في هذه المنطقة من كتابة المنصة، إلا ما نُسب صراحةً إلى المادة التعليمية." />
    </p>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-1.5">
      <span className="text-xs font-bold text-slate-600">
        <Text33 text={label} />
      </span>
      <bdi dir="ltr" className="font-en text-sm font-black text-slate-900">
        {value}
      </bdi>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
      <h3 className="font-head text-lg font-black text-slate-900">
        <Rich text={title} />
      </h3>
      {children}
    </section>
  );
}

function Sub({ head, children }: { head: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5 rounded-2xl bg-slate-50 p-3">
      <h4 className="text-sm font-black text-emerald-900">
        <Rich text={head} />
      </h4>
      {children}
    </div>
  );
}
