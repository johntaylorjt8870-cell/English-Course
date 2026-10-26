import { Article44, Text44 } from "./kit44";
import { STATIONS_44 } from "./ledger44";
import { PRACTICE_44 } from "./practiceData44";
import { practiceReason44 } from "./practiceNotes44";
import {
  COVERAGE_44,
  COVERAGE_ACCURACY_NOTES_44,
  COVERAGE_PLATFORM_ADDITIONS_44,
} from "./coverage44";
import { teacherSection44 } from "./teacherSource44";
import SolutionsArea44 from "./SolutionsArea44";

const SEQUENCE = [
  "الانطلاق (10 دقائق): اعرض مواقف المنزل والمدرسة والهدف الشخصي، ثم قدّم MUST وHAVE TO.",
  "قاعدة MUST (15 دقيقة): Subject + must + V1 ثابتة مع جميع الضمائر بلا s أو to.",
  "استخدامات MUST (15 دقيقة): تأكيد المتحدث، اللوائح الرسمية، والتوصية الحماسية بحسب السياق.",
  "HAVE TO وتصريفها (20 دقيقة): تركيب Semi-modal يتحول إلى has to مع المفرد الغائب.",
  "المقارنة والحوار الأول (15 دقيقة): اتجاه شائع لا قانون جامد + تحليل حوار Preparing for the Exam.",
  "المنع مقابل عدم الضرورة (20 دقيقة): MUSTN'T = منع قاطع ≠ DON'T HAVE TO = غياب الإلزام.",
  "السؤال والإجابات القصيرة (15 دقيقة): Do/Does + have to، وفخ الإجابة المنفية على Must I...?",
  "الماضي والمستقبل (20 دقيقة): HAD TO وDIDN'T HAVE TO وWILL HAVE TO عبر آلة الأزمنة.",
  "الضرورة مقابل النصيحة والحوار الشامل (15 دقيقة): مقارنة تمهيدية مع SHOULD + حوار مسابقة العلوم.",
  "المحقق النحوي والتدريبات الخمسة (35 دقيقة): تصحيح الأخطاء العشرة ثم التطبيقات المتدرجة.",
  "القراءة والكتابة والاختبار الختامي (35 دقيقة): نص مركز العلوم، مهمة الكتابة، ثم اختبار 25 سؤالًا.",
];

const MISCONCEPTIONS = [
  "إضافة s إلى MUST: مثل She musts خطأ، والصواب She must.",
  "إقحام to بعد MUST: مثل He must to go خطأ، والصواب He must go.",
  "تصريف MUST في الماضي بـ musted: خطأ، والبديل الصحيح هو had to.",
  "الخلط بين MUSTN'T (منع قاطع) وDON'T HAVE TO (عدم ضرورة واختيار).",
  "إبقاء has أو had بعد عوامل النفي والاستفهام والمستقبل (doesn't / didn't / does / did / will).",
  "افتراض أن didn't have to تعني بالضرورة عدم وقوع الفعل في الماضي.",
  "الإجابة بـ No, you mustn't حين يكون المقصود مجرد عدم الضرورة (No, you don't have to).",
];

const SECTIONS = [
  ["tg-goals", "الأهداف"],
  ["tg-sequence", "خطة الحصة"],
  ["tg-misconceptions", "الأخطاء الشائعة"],
  ["tg-practice", "مفاتيح التدريبات"],
  ["tg-test", "مفتاح الاختبار"],
  ["tg-coverage", "مصفوفة التغطية"],
] as const;

export default function TeacherGuide44() {
  const teacherSec = teacherSection44(35);

  return (
    <div className="guide44" data-teacher-guide="44">
      <header className="guideHead44">
        <p className="kicker44">دليل التدريس المنهجي · الدرس 44</p>
        <h2>مرجع المعلم الشامل: MUST &amp; HAVE TO</h2>
        <p>
          يجمع هذا الدليل خطة تقديم المحطات الثلاث عشرة، تشخيص التصورات الخاطئة، مفاتيح التدريبات الخمسة، ومفتاح التصحيح الكامل للاختبار النهائي.
        </p>
      </header>

      <nav className="guideNav44" aria-label="أقسام دليل المعلم">
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>

      <section className="guideSec44" id="tg-goals" aria-labelledby="tg-goals-h">
        <h3 id="tg-goals-h">أهداف الدرس الاثنا عشر</h3>
        <Article44 section={1} />
      </section>

      <section className="guideSec44" id="tg-sequence" aria-labelledby="tg-sequence-h">
        <h3 id="tg-sequence-h">التسلسل الزمني المقترح للتدريس</h3>
        <ol className="timeline44">
          {SEQUENCE.map((item, i) => (
            <li key={i}>
              <span className="timelineNo44 font-en" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p>
                <Text44 text={item} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="guideSec44"
        id="tg-misconceptions"
        aria-labelledby="tg-misconceptions-h"
      >
        <h3 id="tg-misconceptions-h">التصورات الخاطئة وسبل معالجتها</h3>
        <ul className="misconceptions44">
          {MISCONCEPTIONS.map((item) => (
            <li key={item}>
              <Text44 text={item} />
            </li>
          ))}
        </ul>
      </section>

      <section className="guideSec44" id="tg-practice" aria-labelledby="tg-practice-h">
        <h3 id="tg-practice-h">مفاتيح التدريبات الخمسة (25 بندًا)</h3>
        <div className="practiceKeys44">
          <table>
            <thead>
              <tr>
                <th scope="col">التدريب</th>
                <th scope="col">البند</th>
                <th scope="col">الإجابة النموذجية</th>
                <th scope="col">التعليل التربوي</th>
              </tr>
            </thead>
            <tbody>
              {PRACTICE_44.map((item) => (
                <tr key={item.id} data-teacher-answer={item.id}>
                  <td>
                    <bdi dir="ltr">{item.section - 27}</bdi>
                  </td>
                  <td>
                    <p className="keyPrompt44">
                      <Text44 text={item.prompt} />
                    </p>
                    {item.options.length > 0 && (
                      <p className="keyOptions44 font-en" dir="ltr">
                        {item.options.join(" · ")}
                      </p>
                    )}
                  </td>
                  <td className="keyAnswer44">
                    <bdi dir="ltr">{item.sourceAnswer}</bdi>
                  </td>
                  <td>
                    <Text44 text={practiceReason44(item.section, item.number)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="guideSec44" id="tg-test" aria-labelledby="tg-test-h">
        <h3 id="tg-test-h">مفتاح الاختبار النهائي الشامل (25 سؤالًا)</h3>
        <details className="guideDetails44">
          <summary>عرض ورقة أسئلة الاختبار الكاملة</summary>
          <Article44 section={34} />
        </details>
        <details className="guideDetails44">
          <summary>عرض ملخص مفتاح التصحيح النصي وملاحظة المعلم</summary>
          <div className="grid gap-1.5 pt-2">
            {teacherSec.units.map((u) => (
              <p key={u.id} data-teacher-unit={u.id}>
                <Text44 text={u.text} />
              </p>
            ))}
          </div>
        </details>
        <SolutionsArea44 teacher />
      </section>

      <section className="guideSec44" id="tg-coverage" aria-labelledby="tg-coverage-h">
        <h3 id="tg-coverage-h">المحطات ومصفوفة التغطية الكاملة</h3>
        <ol className="stationMap44">
          {STATIONS_44.map((s, i) => (
            <li key={s.start}>
              <span className="stationMapNo44 font-en" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <b>{s.name}</b>{" "}
                <small dir="ltr" className="font-en">
                  {s.en}
                </small>
              </span>
              <span className="stationMapRange44 font-en" dir="ltr">
                {s.start}–{s.end}
              </span>
            </li>
          ))}
        </ol>

        <div className="coverage44">
          {COVERAGE_44.map((row) => (
            <details key={row.id} className="coverageRow44">
              <summary>
                <span dir="ltr" className="coverageLabel44">
                  <bdi className="coverageId44 font-en">{row.id}</bdi>
                  <Text44 text={row.title} />
                </span>
                <span className="coverageCount44 font-en">
                  <bdi dir="ltr">{row.units.length}</bdi>
                </span>
              </summary>
              <p>
                <Text44 text={row.destination} />
              </p>
              <p className="coverageAnswer44">
                <Text44 text={row.answerLocation} />
              </p>
              <ul>
                {row.units.map((unit) => (
                  <li key={unit.id} data-coverage-unit={unit.id}>
                    <Text44 text={unit.text} />
                  </li>
                ))}
                {row.items.map((item) => (
                  <li key={item.id} className="coverageItem44" dir="ltr">
                    <bdi>{item.id}</bdi> — <Text44 text={item.parts.join(" / ")} />
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <div className="accuracyNotes44">
          <h4>ضوابط الدقة العلمية والوفاء للمحتوى</h4>
          <ul>
            {COVERAGE_ACCURACY_NOTES_44.map((note) => (
              <li key={note}>
                <Text44 text={note} />
              </li>
            ))}
          </ul>
          <h4>الأدوات التفاعلية المدمجة</h4>
          <ul>
            {COVERAGE_PLATFORM_ADDITIONS_44.map((note) => (
              <li key={note}>
                <Text44 text={note} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
