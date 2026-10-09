import { useMemo, useState } from "react";
import { LatinRuns } from "./bidi";
import { indexTeacherSource, type TeacherSourceGroup } from "./teacherSourceIndex";

/** Only used inside authenticated TeacherSections. Not a new answer bank. */
export default function TeacherSourceBrowser({ lesson, groups }: { lesson: number; groups: readonly TeacherSourceGroup[] }) {
  const indexed = useMemo(() => indexTeacherSource(lesson, groups), [lesson, groups]);
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState("");
  const [number, setNumber] = useState("");
  const group = indexed[selected];
  const matches = group.items.filter(q => (!number || q.id === number) && `${q.number} ${q.segments.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  return <div data-teacher-source={lesson} className="space-y-4">
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-300 bg-slate-50 p-3">
      <label className="min-w-0 flex-1 text-sm font-bold">التمرين / مرجع المصدر
        <select className="mt-1 block w-full rounded-lg border-2 bg-white p-2" value={selected} onChange={e => { setSelected(Number(e.target.value)); setNumber(""); setQuery(""); }}>
          {indexed.map((g, i) => <option key={g.id} value={i} dir="ltr">{g.reference}</option>)}
        </select>
      </label>
      <label className="text-sm font-bold">رقم البند كما ورد في مرجع المعلم
        <select className="mt-1 block rounded-lg border-2 bg-white p-2" value={number} onChange={e => setNumber(e.target.value)}>
          <option value="">كل البنود المرقمة</option>
          {group.items.map(q => <option key={q.id} value={q.id}>{q.number}</option>)}
        </select>
      </label>
      <label className="text-sm font-bold">بحث داخل الإجابات
        <input type="search" className="mt-1 block w-full rounded-lg border-2 bg-white p-2" value={query} onChange={e => setQuery(e.target.value)} />
      </label>
    </div>
    <h4 className="text-lg font-black"><LatinRuns text={group.reference} /></h4>
    <p className="text-xs text-slate-600">صفحة الكتاب: غير مذكورة في بيانات المرجع. نص السؤال الأصلي غير مربوط بهذا الفهرس؛ المرجع أعلاه هو الإحالة المتاحة، وليس رقم صفحة.</p>
    <p role="status" className="text-sm font-bold">{matches.length} بند مرقّم مطابق</p>
    {matches.map(q => <article key={q.id} data-source-item={q.id} className="border-b border-slate-200 py-3">
      <h5 className="font-black">البند {q.number}</h5>
      <div className="mt-2 text-base font-bold"><LatinRuns text={q.segments[0]} /></div>
      {q.segments.length > 1 && <details className="mt-2">
        <summary className="cursor-pointer text-sm font-bold">بقية الإجابة والتفسير كما وردا</summary>
        {q.segments.slice(1).map((text, i) => <p key={i} className="mt-2 text-sm"><LatinRuns text={text} /></p>)}
      </details>}
    </article>)}
    {group.context.length > 0 && <section className="rounded-xl border border-amber-200 bg-amber-50 p-3">
      <h5 className="font-bold">{group.items.length ? "شرح المجموعة والبنود غير المرقمة" : "مرجع غير مرقّم — لا نفترض أرقام أسئلة"}</h5>
      <p className="my-2 text-xs">هذه الأسطر محفوظة كاملة. قد يجمع السطر عدة إجابات أو توجيهات؛ لم نفصلها إلى أسئلة من دون ترقيم موثوق.</p>
      {group.context.map(c => <p key={c.line} data-source-context={c.line} className="mt-2 text-sm leading-relaxed"><LatinRuns text={c.text} /></p>)}
    </section>}
    <details className="rounded-xl border border-slate-200 p-3">
      <summary className="cursor-pointer text-sm font-bold">مرجع المعلم الكامل لهذا التمرين — دون اختصار</summary>
      {group.originalLines.map((text, i) => <p key={i} data-source-original={i} className="mt-2 text-sm leading-relaxed"><LatinRuns text={text} /></p>)}
    </details>
  </div>;
}
