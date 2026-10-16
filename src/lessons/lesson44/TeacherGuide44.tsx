import { Lines44, Panel44, Text44 } from './kit44';
import { section44, STATIONS_44 } from './ledger44';
import { PRACTICE_44 } from './practiceData44';
import { practiceReason44 } from './practiceNotes44';
import { COVERAGE_44, COVERAGE_ACCURACY_NOTES_44, COVERAGE_PLATFORM_ADDITIONS_44 } from './coverage44';
import SolutionsArea44 from './SolutionsArea44';

export default function TeacherGuide44() {
  return <div data-teacher-guide="44">
    <Panel44 kicker="DELIVERY GUIDE / PLATFORM-AUTHORED" title="دليل التدريس — الضرورة والإلزام والقواعد">
      <p>هذا الدليل وكل الشرح التفصيلي إضافات المنصة. نصوص الأسئلة والمفاتيح الموسومة «حل المصدر» من المادة الموردة.</p>
      <h3>الأهداف الأصلية</h3>
      <Lines44 lines={section44(1).lines}/>
      <h3>تسلسل مقترح</h3>
      <ol className="teacherList44">
        <li>الانطلاق (10 دقائق): اعرض مواقف المدرسة والمنزل. ما الذي يجب علينا فعله؟ ثم قدّم MUST وHAVE TO.</li>
        <li>قاعدة MUST (15 دقيقة): Subject + must + V1. لا تتغير مع الفاعل. لا نستخدم musts أو must to.</li>
        <li>استخدامات MUST (15 دقيقة): ضرورة شخصية، قوانين، توصية قوية. السياق يحدد.</li>
        <li>HAVE TO (20 دقيقة): have/has to. تتغير مع الفاعل والزمن. Semi-modal.</li>
        <li>MUST vs HAVE TO (10 دقائق): الفرق اتجاه شائع وليس قانونًا مطلقًا.</li>
        <li>الحوار الأول (10 دقائق): وسم الاستخدامات في Preparing for the Exam.</li>
        <li>النفي (20 دقيقة): MUSTN'T = منع ≠ DON'T HAVE TO = عدم ضرورة. هذا الفرق المحوري.</li>
        <li>السؤال (15 دقيقة): Do/Does + have to. ثم MUST في السؤال.</li>
        <li>الماضي والمستقبل (20 دقيقة): HAD TO، DIDN'T HAVE TO، WILL HAVE TO. آلة الأزمنة.</li>
        <li>MUST vs HAVE TO vs SHOULD (10 دقائق): مقارنة تمهيدية.</li>
        <li>Grammar Detective (15 دقيقة): الأخطاء العشرة — اكتشاف وتصحيح.</li>
        <li>التدريبات الخمسة (30–40 دقيقة): §§28–32 كلها قبل مقارنة الحلول.</li>
        <li>القراءة والكتابة (20 دقيقة): نص Science Centre + أسئلة الفهم + Writing Mission.</li>
        <li>الاختبار (25–35 دقيقة): 25 سؤالًا في خمسة مستويات.</li>
      </ol>
    </Panel44>
    <Panel44 title="التصورات الخاطئة وخطة التصحيح">
      <Lines44 lines={[
        "لا نضيف s إلى MUST: She musts خطأ، والصحيح She must.",
        "بعد MUST يأتي V1 مباشرة: بدون to، وليس V-ing.",
        "MUST لا تتصرف في الماضي: I musted خطأ، والصحيح I had to.",
        "الفرق بين MUSTN'T وDON'T HAVE TO هو الفرق المحوري: المنع ≠ عدم الضرورة.",
        "بعد doesn't/didn't/will/do/does/did نستخدم have — لا has أو had.",
        "DIDN'T HAVE TO لا تخبرنا وحدها إن كان الفعل قد وقع بالفعل.",
        "يمكن استخدام MUST وHAVE TO في القوانين والتعليمات — الفرق اتجاه شائع.",
        "MUST في السؤال صحيح نحويًا، لكن HAVE TO أكثر شيوعًا في المحادثة اليومية.",
      ]}/>
    </Panel44>
    <Panel44 title="مفاتيح كل التدريبات — المصدر ثم شرح المنصة">
      {PRACTICE_44.map(item => <article className="exercise44" key={item.id} data-teacher-answer={item.id}>
        <h4>§{item.section} · {item.number}</h4>
        <b>الأصل</b><Lines44 lines={[item.prompt, ...item.options]}/>
        <b>حل المصدر</b><Lines44 lines={[item.sourceAnswer]}/>
        <b>السبب — شرح المنصة</b><Lines44 lines={[practiceReason44(item.section, item.number)]}/>
      </article>)}
    </Panel44>
    <Panel44 title="مفتاح المصدر الكامل للاختبار النهائي — §34">
      <Lines44 lines={section44(34).lines} prefix="s34"/>
    </Panel44>
    <SolutionsArea44 teacher/>
    <Panel44 title="المحطات ومصفوفة التغطية">
      <div className="actions44">{STATIONS_44.map(station => <span className="label44" key={station.start}><Text44 text={`${station.name}: §§${station.start}–${station.end}`}/></span>)}</div>
      <p>{COVERAGE_44.length} مدخلًا: الغلاف والأقسام 0–38.</p>
      {COVERAGE_44.map(row => <details key={row.id}>
        <summary><Text44 text={`${row.id} — ${row.title} · ${row.units.length} وحدات`}/></summary>
        <p><Text44 text={`${row.destination} → ${row.answerLocation}`}/></p>
        <Lines44 lines={row.items.map(item => `${item.id}: ${item.parts.join(' / ')}`)}/>
      </details>)}
    </Panel44>
    <Panel44 title="تدقيق التغطية والدقة">
      <h3>ما نُقل مباشرة من المصدر</h3>
      <Lines44 lines={COVERAGE_ACCURACY_NOTES_44}/>
      <h3>ما أضافته المنصة</h3>
      <Lines44 lines={COVERAGE_PLATFORM_ADDITIONS_44}/>
    </Panel44>
  </div>;
}
