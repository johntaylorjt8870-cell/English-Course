import { useState } from "react";
import { FinalTestAnswerKey } from "../../shared/finalTest";
import { TEST_60 } from "./test60";
import { ORIGINAL_TEST_60, ORIGINAL_TEST_SECTIONS_60, PRACTICES_60 } from "./practice60";
import { BACKSHIFT_TABLE_60, ERRORS_60, EXCEPTIONS_60, MODALS_60, PRONOUNS_60, SUMMARY_60, TIME_PLACE_60 } from "./content60";
import { MapTable60 } from "./kit60";

const TEACHER_PASSWORD_60 = "somer173";

export default function TeacherArea60() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!unlocked) {
    return (
      <section className="l60-teacher" data-teacher-area="60">
        <div className="l60-teacher-gate">
          <div className="l60-kicker">
            <span>T</span>INSTRUCTOR ACCESS
          </div>
          <h2 className="l60-title">فضاء المعلم · الدرس 60</h2>
          <p className="l60-lead">
            مفتاح الاختبار المشترك (15 سؤالًا)، ومفتاح الاختبار الأصلي (25 سؤالًا)، ومفاتيح التدريبات الثمانية، وجداول
            Backshift والضمائر وكلمات الزمان والمكان، والأخطاء السبعة بشرحها. البوابة هنا حجب عرض في الواجهة فقط، وليست
            حماية أمنية لموقع ثابت.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (password.trim() === TEACHER_PASSWORD_60) {
                setUnlocked(true);
                setError(false);
              } else {
                setError(true);
              }
            }}
          >
            <input
              type="password"
              dir="ltr"
              autoComplete="off"
              value={password}
              aria-label="كلمة مرور المعلم"
              placeholder="كلمة المرور"
              onChange={(event) => {
                setPassword(event.target.value);
                setError(false);
              }}
            />
            <button type="submit" className="l60-btn">
              فتح فضاء المعلم
            </button>
          </form>
          {error && (
            <p role="alert" className="l60-warn">
              كلمة المرور غير صحيحة.
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="l60-teacher" data-teacher-area="60">
      <section className="l60-teacher-file">
        <div className="l60-kicker">
          <span>60</span>TEACHER FILE
        </div>
        <h3>خريطة تدريس الوحدة</h3>
        <p className="l60-small">
          المسار: الجمل الخبرية من «علامتي اقتباس» إلى «that + جملة منقولة». القاعدة المركزية: فعل النقل said / told في
          الماضي يفرض Backshift غالبًا (Present → Past · will → would · must → had to للالتزام). الأخطاء الأكثر تكرارًا
          عند الطلاب: قول «said me»، ونسيان الشخص بعد «told»، وإرجاع زمن حقيقة علمية، ونسيان تغيير tomorrow وnow.
        </p>
        <div className="l60-tags">
          {ERRORS_60.map((error) => (
            <span key={error.n}>
              {error.n - 20}. {error.title.replace(/^الخطأ \S+[:：]?\s*/, "")}
            </span>
          ))}
        </div>
      </section>

      <section className="l60-teacher-file">
        <h3>جدول Backshift المرجعي — {BACKSHIFT_TABLE_60.rows.length} تحويلًا</h3>
        <MapTable60
          rows={BACKSHIFT_TABLE_60.rows.map((row) => ({ direct: row.from, reported: row.to, note: row.note }))}
          head={["المباشر", "المنقول", "ملاحظة"]}
        />
        <p className="l60-small">
          تنبيه must: {BACKSHIFT_TABLE_60.mustWarning.lead} {BACKSHIFT_TABLE_60.mustWarning.deductionLead}
        </p>
      </section>

      <section className="l60-teacher-file">
        <h3>جداول الضمائر والزمان والمكان والأفعال الناقصة</h3>
        <h4>الضمائر</h4>
        <MapTable60 rows={PRONOUNS_60.table} head={["المباشر", "المنقول", "سياق"]} />
        <p className="l60-small">{PRONOUNS_60.warning}</p>
        <h4>كلمات الزمان</h4>
        <MapTable60 rows={TIME_PLACE_60.timeRows} head={["المباشر", "المنقول"]} />
        <h4>المكان والحركة</h4>
        <MapTable60 rows={TIME_PLACE_60.placeRows} head={["المباشر", "المنقول", "ملاحظة"]} />
        <h4>الأفعال الناقصة</h4>
        <MapTable60 rows={MODALS_60.rows} head={["المباشر", "المنقول", "ملاحظة"]} />
        <h4>الاستثناءات الثلاثة</h4>
        <ol>
          <li>
            <bdi dir="ltr">{EXCEPTIONS_60.facts.title}</bdi> — {EXCEPTIONS_60.facts.lead}
          </li>
          <li>
            <bdi dir="ltr">{EXCEPTIONS_60.stillTrue.title}</bdi> — {EXCEPTIONS_60.stillTrue.lead}
          </li>
          <li>
            <bdi dir="ltr">{EXCEPTIONS_60.presentVerb.title}</bdi> — {EXCEPTIONS_60.presentVerb.lead}
          </li>
        </ol>
      </section>

      <FinalTestAnswerKey lesson={60} questions={TEST_60} accent="bg-[#221a38]" />

      <section className="l60-teacher-file">
        <h3>مفاتيح التدريبات الثمانية</h3>
        {PRACTICES_60.map((group, i) => (
          <details key={group.id}>
            <summary>
              {i + 1}. {group.title} · {group.items.length} بندًا
            </summary>
            <ol>
              {group.items.map((item, j) => (
                <li key={j}>
                  <bdi dir="ltr">{item.prompt}</bdi>
                  <p>
                    <b>الإجابة:</b> <bdi dir="ltr">{item.answer}</bdi>
                  </p>
                  <p>{item.why}</p>
                </li>
              ))}
            </ol>
          </details>
        ))}
      </section>

      <section className="l60-teacher-file">
        <h3>مفتاح الاختبار الأصلي · 25 سؤالًا في أربعة أقسام</h3>
        {ORIGINAL_TEST_SECTIONS_60.map((section) => (
          <details key={section}>
            <summary>
              {section} · {ORIGINAL_TEST_60.filter((q) => q.section === section).length} سؤالًا
            </summary>
            <ol start={ORIGINAL_TEST_60.find((q) => q.section === section)!.n}>
              {ORIGINAL_TEST_60.filter((q) => q.section === section).map((item) => (
                <li key={item.n}>
                  <bdi dir="ltr">{item.answer}</bdi> — {item.why}
                </li>
              ))}
            </ol>
          </details>
        ))}
      </section>

      <section className="l60-teacher-file">
        <h3>الملخص الذهبي للتدريس</h3>
        <ol>
          {SUMMARY_60.groups.map((group) => (
            <li key={group.title}>{group.title}</li>
          ))}
        </ol>
        <p className="l60-small">
          ملاحظة تدريسية: ابدأ كل تصحيح بسؤال الطالب «من المتحدث الأصلي؟ ومن يسمع؟» قبل أي تغيير — لأن الضمير والزمان
          والمكان كلها وظائف للسياق، لا قواعد آلية، كما يؤكد تنبيه الدرس نفسه.
        </p>
      </section>
    </div>
  );
}

export const TEACHER_60_SUMMARY_GROUPS = SUMMARY_60.groups.length;
