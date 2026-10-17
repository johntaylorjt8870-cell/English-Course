import { Article44, Text44 } from './kit44';
import { STATIONS_44 } from './ledger44';
import { PRACTICE_44 } from './practiceData44';
import { practiceReason44 } from './practiceNotes44';
import { COVERAGE_44, COVERAGE_ACCURACY_NOTES_44, COVERAGE_PLATFORM_ADDITIONS_44 } from './coverage44';
import SolutionsArea44 from './SolutionsArea44';

const SEQUENCE = [
  'الانطلاق (10 دقائق): اعرض مواقف المدرسة والمنزل. ما الذي يجب علينا فعله؟ ثم قدّم MUST وHAVE TO.',
  'قاعدة MUST (15 دقيقة): Subject + must + V1. لا تتغير مع الفاعل. لا نستخدم musts أو must to.',
  'استخدامات MUST (15 دقيقة): ضرورة شخصية، قوانين، توصية قوية. السياق يحدد.',
  'HAVE TO (20 دقيقة): have/has to. تتغير مع الفاعل والزمن. Semi-modal.',
  'MUST vs HAVE TO (10 دقائق): الفرق اتجاه شائع وليس قانونًا مطلقًا.',
  'الحوار الأول (10 دقائق): وسم الاستخدامات في Preparing for the Exam.',
  "النفي (20 دقيقة): MUSTN'T = منع ≠ DON'T HAVE TO = عدم ضرورة. هذا الفرق المحوري.",
  'السؤال (15 دقيقة): Do/Does + have to. ثم MUST في السؤال.',
  "الماضي والمستقبل (20 دقيقة): HAD TO، DIDN'T HAVE TO، WILL HAVE TO. آلة الأزمنة.",
  'MUST vs HAVE TO vs SHOULD (10 دقائق): مقارنة تمهيدية.',
  'Grammar Detective (15 دقيقة): الأخطاء العشرة — اكتشاف وتصحيح.',
  'التدريبات الخمسة (30–40 دقيقة): §§28–32 كلها قبل مقارنة الحلول.',
  'القراءة والكتابة (20 دقيقة): نص Science Centre + أسئلة الفهم + Writing Mission.',
  'الاختبار (25–35 دقيقة): 25 سؤالًا في خمسة مستويات.',
];
const MISCONCEPTIONS = [
  'لا نضيف s إلى MUST: She musts خطأ، والصحيح She must.',
  'بعد MUST يأتي V1 مباشرة: بدون to، وليس V-ing.',
  'MUST لا تتصرف في الماضي: I musted خطأ، والصحيح I had to.',
  "الفرق بين MUSTN'T وDON'T HAVE TO هو الفرق المحوري: المنع ≠ عدم الضرورة.",
  "بعد doesn't/didn't/will/do/does/did نستخدم have — لا has أو had.",
  'DIDN\'T HAVE TO لا تخبرنا وحدها إن كان الفعل قد وقع بالفعل.',
  'يمكن استخدام MUST وHAVE TO في القوانين والتعليمات — الفرق اتجاه شائع.',
  'MUST في السؤال صحيح نحويًا، لكن HAVE TO أكثر شيوعًا في المحادثة اليومية.',
];
const SECTIONS = [
  ['tg-goals', 'الأهداف'],
  ['tg-sequence', 'تسلسل مقترح'],
  ['tg-misconceptions', 'تصورات خاطئة'],
  ['tg-practice', 'مفاتيح التدريبات'],
  ['tg-test', 'الاختبار والمفاتيح'],
  ['tg-coverage', 'التغطية'],
] as const;

export default function TeacherGuide44() {
  return (
    <div className="guide44" data-teacher-guide="44">
      <header className="guideHead44">
        <p className="kicker44">DELIVERY GUIDE · PLATFORM-AUTHORED</p>
        <h2>دليل التدريس</h2>
        <p>
          هذا الدليل وكل الشرح التفصيلي إضافات المنصة. نصوص الأسئلة والمفاتيح الموسومة «مفتاح المصدر» من المادة الموردة.
        </p>
      </header>
      <nav className="guideNav44" aria-label="أقسام دليل المعلم">
        {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section className="guideSec44" id="tg-goals" aria-labelledby="tg-goals-h">
        <h3 id="tg-goals-h">الأهداف الأصلية</h3>
        <Article44 section={1} />
      </section>

      <section className="guideSec44" id="tg-sequence" aria-labelledby="tg-sequence-h">
        <h3 id="tg-sequence-h">تسلسل مقترح</h3>
        <ol className="timeline44">
          {SEQUENCE.map((item, i) => (
            <li key={i}><span className="timelineNo44" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><p><Text44 text={item} /></p></li>
          ))}
        </ol>
      </section>

      <section className="guideSec44" id="tg-misconceptions" aria-labelledby="tg-misconceptions-h">
        <h3 id="tg-misconceptions-h">التصورات الخاطئة وخطة التصحيح</h3>
        <ul className="misconceptions44">
          {MISCONCEPTIONS.map(item => <li key={item}><Text44 text={item} /></li>)}
        </ul>
        <p className="guideNote44">تُعرض هذه القائمة للمعلم فقط؛ الطالب يصل إلى التصحيح بعد محاولته.</p>
      </section>

      <section className="guideSec44" id="tg-practice" aria-labelledby="tg-practice-h">
        <h3 id="tg-practice-h">مفاتيح كل التدريبات — المصدر ثم شرح المنصة</h3>
        <div className="practiceKeys44">
          <table>
            <thead>
              <tr><th scope="col">§</th><th scope="col">البند</th><th scope="col">المفتاح</th><th scope="col">السبب — شرح المنصة</th></tr>
            </thead>
            <tbody>
              {PRACTICE_44.map(item => (
                <tr key={item.id} data-teacher-answer={item.id}>
                  <td><bdi dir="ltr">{item.section}</bdi></td>
                  <td>
                    <p className="keyPrompt44"><Text44 text={item.prompt} /></p>
                    {item.options.length > 0 && <p className="keyOptions44" dir="ltr">{item.options.join(' · ')}</p>}
                  </td>
                  <td className="keyAnswer44"><bdi dir="ltr">{item.sourceAnswer}</bdi></td>
                  <td><Text44 text={practiceReason44(item.section, item.number)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="guideSec44" id="tg-test" aria-labelledby="tg-test-h">
        <h3 id="tg-test-h">الاختبار النهائي — ورقة المصدر §34 ومفاتيحها</h3>
        <details className="guideDetails44">
          <summary>ورقة الأسئلة الكاملة من المصدر (§34)</summary>
          <Article44 section={34} />
        </details>
        <SolutionsArea44 teacher />
      </section>

      <section className="guideSec44" id="tg-coverage" aria-labelledby="tg-coverage-h">
        <h3 id="tg-coverage-h">المحطات ومصفوفة التغطية</h3>
        <ol className="stationMap44">
          {STATIONS_44.map((s, i) => (
            <li key={s.start}>
              <span className="stationMapNo44" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span><b>{s.name}</b> <small dir="ltr">{s.en}</small></span>
              <span className="stationMapRange44" dir="ltr">{s.start}–{s.end}</span>
            </li>
          ))}
        </ol>
        <p className="guideNote44">{COVERAGE_44.length} مدخلًا: الغلاف والأقسام 0–38.</p>
        <div className="coverage44">
          {COVERAGE_44.map(row => (
            <details key={row.id} className="coverageRow44">
              <summary>
                <span dir="ltr" className="coverageLabel44">
                  <bdi className="coverageId44">{row.id}</bdi>
                  <Text44 text={row.title} />
                </span>
                <span className="coverageCount44"><bdi dir="ltr">{row.units.length}</bdi></span>
              </summary>
              <p><Text44 text={row.destination} /></p>
              <p className="coverageAnswer44"><Text44 text={row.answerLocation} /></p>
              <ul>
                {row.units.map(unit => <li key={unit.id} data-coverage-unit={unit.id}><Text44 text={unit.text} /></li>)}
                {row.items.map(item => (
                  <li key={item.id} className="coverageItem44" dir="ltr">
                    <bdi>{item.id}</bdi> — <Text44 text={item.parts.join(' / ')} />
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
        <div className="accuracyNotes44">
          <h4>ما نُقل مباشرة من المصدر</h4>
          <ul>{COVERAGE_ACCURACY_NOTES_44.map(note => <li key={note}><Text44 text={note} /></li>)}</ul>
          <h4>ما أضافته المنصة</h4>
          <ul>{COVERAGE_PLATFORM_ADDITIONS_44.map(note => <li key={note}><Text44 text={note} /></li>)}</ul>
        </div>
        <p className="guideNote44"><Text44 text="ملاحظة بنيوية: القسم 34 يُعرض كاملًا في منطقة الاختبار (§34 = 62 سطرًا)؛ خطوة الدرس 34 تعرض الموجز والمستويات فقط." /></p>
        <p className="guideNote44"><Text44 text="ملاحظة بوابة: مفاتيح §§28–33 لا تظهر للطالب قبل التحقق من كل بند؛ كتلة «الحلول» المصدرية تُفتح بعد ذلك، وتبقى منسوخة في هذا الدليل." /></p>
      </section>
    </div>
  );
}
