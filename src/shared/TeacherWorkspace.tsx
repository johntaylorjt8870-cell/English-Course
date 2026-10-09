import { createContext, useContext, Children, isValidElement, useId, useState, type ReactNode } from "react";
import { LatinRuns } from "./bidi";

const TeachingMode = createContext(false);

/** Collapse only in the teacher workspace; student correction views are unchanged. */
export function TeachingDetails({ children }: { children: ReactNode }) {
  const teaching = useContext(TeachingMode);
  return teaching ? <details className="mt-3 rounded-xl border border-slate-200 p-3">
    <summary className="cursor-pointer text-sm font-bold">التفسير · <span dir="ltr">Platform Explanation</span></summary>
    {children}
  </details> : <>{children}</>;
}

export type TeacherCategory = "assessment" | "source" | "teaching";
const categories: { id: TeacherCategory; label: string }[] = [
  { id: "source", label: "حلول الكتاب والمراجع" },
  { id: "assessment", label: "مفاتيح الاختبارات" },
  { id: "teaching", label: "إعداد الدرس والتدريس" },
];
export function TeacherSection({ children }: { title: string; category: TeacherCategory; children: ReactNode }) {
  return <>{children}</>;
}

/** Presentation only. Mount exclusively INSIDE the existing authentication gate.
 * Original content stays intact; sections are explicit, never inferred from text.
 */
export default function TeacherWorkspace({ lesson, children }: { lesson: number; children: ReactNode }) {
  const id = useId();
  const [active, setActive] = useState<number | null>(null);
  const elements = Children.toArray(children).filter(isValidElement<{ title: string; category: TeacherCategory; children: ReactNode }>);
  const sections = elements.filter((element) => element.type === TeacherSection);
  const controls = elements.filter((element) => element.type !== TeacherSection);
  return (
    <section data-teacher-workspace={lesson} dir="rtl" className="space-y-4 min-w-0">
      {controls}
      <header className="rounded-2xl border-2 border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black">مساحة المعلم · الدرس {lesson}</h2>
          <a href="#/" className="rounded-xl border px-3 py-2 font-bold underline">قائمة الدروس</a>
        </div>
        <label className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold">
          الانتقال إلى درس
          <select aria-label="اختيار درس للمعلم" value={lesson} onChange={(e) => { window.location.hash = `/lesson/${e.target.value}`; }} className="rounded-lg border-2 bg-white p-2">
            {Array.from({ length: 32 }, (_, i) => <option key={i} value={i + 1}>الدرس {i + 1}</option>)}
          </select>
          <span className="text-xs text-slate-500">افتح منطقة المعلم في الدرس المختار؛ بوابتها مستقلة.</span>
        </label>
      </header>
      <div className="grid items-start gap-4 md:grid-cols-[15rem_minmax(0,1fr)]">
        <nav aria-label="أقسام مساحة المعلم" className="rounded-2xl border-2 border-slate-200 bg-white p-3">
          <button type="button" aria-current={active === null ? "page" : undefined} onClick={() => setActive(null)} className="mb-3 w-full rounded-lg border p-2 text-start font-bold">فهرس الدرس</button>
          {categories.filter((cat) => sections.some((s) => s.props.category === cat.id)).map((cat) => <div key={cat.id} className="mb-4">
            <h3 className="mb-1 text-xs font-black text-slate-500">{cat.label}</h3>
            {sections.map((s, i) => s.props.category === cat.id && <button key={i} type="button" aria-controls={`${id}-${i}`} aria-current={active === i ? "page" : undefined} onClick={() => setActive(i)} className={`block w-full rounded-lg px-3 py-2 text-start text-sm font-bold ${active === i ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}><LatinRuns text={s.props.title} /></button>)}
          </div>)}
        </nav>
        <div className="min-w-0">
          {active === null && <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
            <h3 className="text-lg font-black">فهرس الدرس {lesson}</h3>
            <p className="mt-2 text-sm text-slate-600">اختر الحل أو مفتاح الاختبار من القائمة. إجابات الاختبار النهائي منفصلة عن منطقة الاختبارات. الشروح والمراجع محفوظة في أقسامها.</p>
            <ol className="mt-4 divide-y divide-slate-200">{sections.map((s, i) => <li key={i}><button type="button" onClick={() => setActive(i)} className="w-full py-3 text-start font-bold underline"><LatinRuns text={`${i + 1}. ${s.props.title}`} /></button></li>)}</ol>
          </div>}
          {sections.map((s, i) => <section key={i} id={`${id}-${i}`} aria-label={s.props.title} hidden={active !== i} style={{ display: active === i ? undefined : "none" }}>
            <h3 tabIndex={-1} className="mb-3 text-lg font-black"><LatinRuns text={s.props.title} /></h3>
            <TeachingMode.Provider value={true}>{s}</TeachingMode.Provider>
          </section>)}
        </div>
      </div>
    </section>
  );
}
