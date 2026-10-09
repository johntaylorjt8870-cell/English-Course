import { useState } from 'react';
import { LatinRuns } from '../../shared/bidi';
import { LESSON2_REFERENCES } from './teacherReference';

/** Mount only inside the existing successful teacher-authentication branch. */
export default function TeacherArea2() {
  const [selected, setSelected] = useState(LESSON2_REFERENCES[0].id);
  const q = LESSON2_REFERENCES.find(q => q.id === selected)!;
  return <div data-lesson2-source>
    <label className="block font-bold">التمرين والبند
      <select aria-label="التمرين والبند" value={selected} onChange={e => setSelected(e.target.value)} className="m-2 rounded-lg border-2 p-2">
        {LESSON2_REFERENCES.map(q => <option key={q.id} value={q.id}>{q.reference} — البند {q.localOrdinal}</option>)}
      </select>
    </label>
    <p className="my-2 text-sm">الإحالة إلى بيانات الدرس المتاحة. ترتيب البنود محلي، وليس ترقيمًا مطبوعًا موثقًا. صفحة الكتاب ورقم السؤال المطبوع غير متاحين.</p>
    <article data-source-question={q.id} className="rounded-xl border p-4">
      <h4 className="font-bold"><LatinRuns text={q.title} /></h4>
      <p className="my-2"><LatinRuns text={q.prompt} /></p>
      <p className="font-bold">الإجابة: <LatinRuns text={q.answer} /></p>
      <details key={q.id} className="mt-3">
        <summary className="cursor-pointer font-bold">خطوات الحل وبيانات السؤال الأصلية</summary>
        {q.originalHint && <p className="my-2"><LatinRuns text={q.originalHint} /></p>}
        <p className="my-2"><span dir="ltr">Platform Explanation</span></p>
        <p><LatinRuns text={q.platformExplanation} /></p>
        <p className="my-2"><LatinRuns text={q.completed} /></p>
        <dl>{Object.entries(q.original).map(([name, value]) => <div key={name} className="my-2">
          <dt dir="ltr" className="font-bold">{name}</dt>
          <dd data-source-field={name}><LatinRuns text={Array.isArray(value) ? value.join(' | ') : String(value)} /></dd>
        </div>)}</dl>
      </details>
    </article>
  </div>;
}
