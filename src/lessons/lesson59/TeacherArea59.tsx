import { useState } from "react";
import { FinalTestAnswerKey } from "../../shared/finalTest";
import { LatinRuns } from "../../shared/bidi";
import { TEST_59 } from "./test59";
import { ORIGINAL_TEST_59, PRACTICES_59 } from "./practice59";
import { ERRORS_59, RULE_TABLE_59, SUMMARY_59, V3_LEDGER_59 } from "./content59";
import { En59 } from "./kit59";

const TEACHER_PASSWORD_59 = "somer173";

export default function TeacherArea59() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!unlocked) {
    return (
      <section className="l59-teacher" data-teacher-area="59">
        <div className="l59-teacher-gate">
          <div className="l59-kicker">
            <span>T</span>INSTRUCTOR ACCESS
          </div>
          <h2 className="l59-title">فضاء المعلم · الدرس 59</h2>
          <p className="l59-lead">
            مفتاح الاختبار المشترك (15 سؤالًا)، ومفتاح الاختبار الأصلي (25 سؤالًا)، ومفاتيح التدريبات التسعة،
            والأخطاء السبعة بشرحها، وجدول القواعد الكامل. البوابة هنا حجب عرض في الواجهة فقط، وليست حماية
            أمنية لموقع ثابت.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (password.trim() === TEACHER_PASSWORD_59) {
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
            <button type="submit" className="l59-btn">
              فتح فضاء المعلم
            </button>
          </form>
          {error && (
            <p role="alert" className="l59-warn">
              كلمة المرور غير صحيحة.
            </p>
          )}
        </div>
      </section>
    );
  }

  const sections = [...new Set(ORIGINAL_TEST_59.map((q) => q.section))];

  return (
    <div className="l59-teacher" data-teacher-area="59">
      <section className="l59-teacher-file">
        <div className="l59-kicker">
          <span>59</span>TEACHER FILE
        </div>
        <h3>خريطة تدريس الوحدة</h3>
        <p className="l59-small">
          <LatinRuns
            text={
              "المسار: الأساس في الدرس 57 (Object + be + V3) ثم الأزمنة في الدرس 58، وهنا نضيف الفعل الناقص قبل be. القاعدة المركزية: Modal + be + V3، وتتحوّل إلى Modal + have been + V3 عند الحديث عن الماضي. الأخطاء الأكثر تكرارًا عند الطلاب: إدخال is بعد المودال، ونسيان be، ونسيان been، والخلط بين must be وmust have been، وبين don't have to وmustn't."
            }
          />
        </p>
        <div className="l59-tags">
          {ERRORS_59.map((error) => (
            <span key={error.n}>
              {error.n - 20}. {error.title}
            </span>
          ))}
        </div>
      </section>

      <section className="l59-teacher-file">
        <h3>جدول القواعد الأساسية — 15 تركيبًا</h3>
        <ol>
          {RULE_TABLE_59.map((row) => (
            <li key={row.form}>
              <bdi dir="ltr">{row.form}</bdi> — {row.meaning} — <bdi dir="ltr">{row.example}</bdi>
            </li>
          ))}
        </ol>
      </section>

      <FinalTestAnswerKey lesson={59} questions={TEST_59} accent="bg-[#10203a]" />

      <section className="l59-teacher-file">
        <h3>مفاتيح التدريبات التسعة</h3>
        {PRACTICES_59.map((group, i) => (
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

      <section className="l59-teacher-file">
        <h3>مفتاح الاختبار الأصلي · 25 سؤالًا</h3>
        {sections.map((section) => (
          <details key={section}>
            <summary>
              {section} · {ORIGINAL_TEST_59.filter((q) => q.section === section).length} سؤالًا
            </summary>
            <ol start={ORIGINAL_TEST_59.find((q) => q.section === section)!.n}>
              {ORIGINAL_TEST_59.filter((q) => q.section === section).map((item) => (
                <li key={item.n}>
                  <bdi dir="ltr">{item.answer}</bdi> — {item.why}
                </li>
              ))}
            </ol>
          </details>
        ))}
      </section>

      <section className="l59-teacher-file">
        <h3>فهرس V3 المستخدم في الدرس</h3>
        <p className="l59-small">
          <En59>
            {V3_LEDGER_59.filter((row) => row.note)
              .map((row) => `${row.base} → ${row.v3}`)
              .join(" · ")}
          </En59>
        </p>
        <p className="l59-small">
          ملاحظة تدريسية: الفعل الأساسي في كل تراكيب الدرس يبقى V3، والمتغيّر الوحيد هو المساعد
          (be / have been / to be / been). اطلب من الطالب أن يحدّد الزمن أولًا ثم يختار المساعد.
        </p>
      </section>

      <section className="l59-teacher-file">
        <h3>الملخص الذهبي</h3>
        <ol>
          <li>
            <bdi dir="ltr">Modal + be + V3</bdi> — للضرورة/النصيحة/الاحتمال في الحاضر أو المستقبل.
          </li>
          <li>
            <bdi dir="ltr">Modal + have been + V3</bdi> — للماضي: نصيحة فائتة، إمكانية لم تُستثمر، أو استنتاج.
          </li>
          <li>{SUMMARY_59.golden.last}</li>
        </ol>
      </section>
    </div>
  );
}
