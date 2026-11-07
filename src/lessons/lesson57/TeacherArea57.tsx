// ============================================================
// الدرس 57 — فضاء المعلم (محمي بكلمة مرور المعلم المعتمدة)
// يعرض: دليل التدريس، مفتاح الاختبار التفاعلي الخمسة عشر سؤالًا،
// ومفتاح التمارين التسعة، وأخطاء الطلاب الشائعة، وخطة الحصص.
// ============================================================

import { useState } from "react";
import { FinalTestAnswerKey } from "../../shared/finalTest";
import { LatinRuns } from "../../shared/bidi";
import { TEST_57 } from "./test57";
import { PRACTICE_GROUPS_57 } from "./practiceData57";
import { COMMON_ERRORS_57, RATING_ROWS_57 } from "./content57";

const TEACHER_PASSWORD_57 = "somer173";

export const TEACHER_GUIDE_57 = {
  overview:
    "الدرس 57 يفتتح وحدة المبني للمجهول. هدفه تأسيسي: التمييز بين Active وPassive، وفهم أن التحويل هو «نقل المفعول به إلى أول الجملة»، ثم إتقان Present Simple Passive (am / is / are + V3).",
  timing: [
    "10 د — المقدمة والمقارنة بين التركيزين (Active / Passive).",
    "15 د — تركيب Active Voice وتحليل Subject / Verb / Object.",
    "20 د — القاعدة Object + be + V3، واختيار be، وتصريفات V3.",
    "15 د — أسباب استخدام المبني للمجهول، وخطوات التحويل الخمس.",
    "20 د — by + Agent، والضمائر، والمفرد والجمع.",
    "20 د — النفي والأسئلة والجواب القصير.",
    "15 د — الأفعال المتعدية واللازمة + الأخطاء الشائعة.",
    "20 د — الحوار والقراءة.",
    "30 د — التمارين التسعة + التدريب الإضافي.",
    "15 د — الاختبار النهائي.",
  ],
  notes: [
    "ابدأ دائمًا بالتحليل: من قام بالفعل؟ على ماذا وقع؟ ثم انتقل إلى الصيغة. الطالب الذي يحلّل لا يخطئ في ترتيب be.",
    "اربط كل اختيار لـ be بالفاعل الجديد فقط — هذه أهم نقطة يخطئ فيها المتعلمون.",
    "وضّح أن by اختيارية، وأن Passive ليس «أصح» من Active؛ الاختيار يعتمد على التركيز.",
    "أكثر أمثلة قسم أسباب الاستخدام في الماضي (was stolen / were delivered). لا تُصلحها: الفكرة مقصودة، وتطبيق الدرس على Present Simple. الأزمنة الأخرى في الدرس التالي.",
    "عند تصحيح التمارين الكتابية، اقبل الصيغ المكافئة (is not = isn't، وجود أو حذف by عندما لا يغيّر المعنى).",
  ],
  mistakes: COMMON_ERRORS_57.map((e) => ({ wrong: e.wrong, right: e.right, why: e.why })),
  rating: RATING_ROWS_57,
};

function Lock57({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  return (
    <form
      className="l57-teacher-gate"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim() === TEACHER_PASSWORD_57) onUnlock();
        else setWrong(true);
      }}
    >
      <div className="l57-note l57-note--note">
        <span className="l57-note-glyph" aria-hidden="true">
          ⊘
        </span>
        <div>
          <div className="l57-note-title">فضاء المعلم — الدرس 57</div>
          <p>
            <LatinRuns text="مفتاح الاختبار النهائي وشروحه، ومفتاح التمارين التسعة، ودليل التدريس. هذه المنطقة للمعلم فقط؛ بوابة عرض في الواجهة وليست حماية أمنية لأن الموقع ثابت." />
          </p>
        </div>
      </div>
      <div className="l57-write-row">
        <input
          type="password"
          dir="ltr"
          autoComplete="off"
          aria-label="كلمة مرور فضاء المعلم"
          placeholder="كلمة المرور"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setWrong(false);
          }}
        />
        <button type="submit" className="l57-btn l57-btn--dark">
          ✧ فتح المساحة
        </button>
      </div>
      {wrong && (
        <p className="l57-verdict is-bad" role="alert">
          <span aria-hidden="true">✕</span> كلمة المرور غير صحيحة — المساحة ما زالت مقفلة.
        </p>
      )}
    </form>
  );
}

export default function TeacherArea57() {
  const [unlocked, setUnlocked] = useState(false);
  if (!unlocked) return <Lock57 onUnlock={() => setUnlocked(true)} />;

  return (
    <div className="l57-teacher" data-teacher-area="57">
      <div className="l57-note l57-note--good">
        <span className="l57-note-glyph" aria-hidden="true">
          ✓
        </span>
        <div>
          <div className="l57-note-title">المساحة مفتوحة</div>
          <p>
            <LatinRuns text="دليل التدريس، توزيع الوقت، الأخطاء الشائعة، مفتاح الاختبار التفاعلي (15)، ومفتاح التمارين (95 بندًا تشمل الأسئلة الخمسة والعشرين الأصلية)." />
          </p>
        </div>
      </div>

      <section className="l57-teacher-block">
        <h3>◆ خريطة الدرس</h3>
        <p>
          <LatinRuns text={TEACHER_GUIDE_57.overview} />
        </p>
      </section>

      <section className="l57-teacher-block">
        <h3>◷ توزيع الوقت المقترح</h3>
        <ul className="l57-bullets">
          {TEACHER_GUIDE_57.timing.map((t) => (
            <li key={t}>
              <span className="l57-bullet-mark" aria-hidden="true">
                ▸
              </span>
              <span>
                <LatinRuns text={t} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="l57-teacher-block">
        <h3>▸ ملاحظات تدريسية</h3>
        <ul className="l57-bullets">
          {TEACHER_GUIDE_57.notes.map((n) => (
            <li key={n}>
              <span className="l57-bullet-mark" aria-hidden="true">
                ▸
              </span>
              <span>
                <LatinRuns text={n} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="l57-teacher-block">
        <h3>✕ الأخطاء الشائعة والتصحيح</h3>
        <div className="l57-teacher-mistakes">
          {TEACHER_GUIDE_57.mistakes.map((m) => (
            <div key={m.wrong} className="l57-teacher-mistake">
              <span className="l57-error-line is-bad" dir="ltr">
                {m.wrong}
              </span>
              <span className="l57-error-line is-ok" dir="ltr">
                {m.right}
              </span>
              <p>
                <LatinRuns text={m.why} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <FinalTestAnswerKey lesson={57} questions={TEST_57} accent="bg-slate-900" />

      <section className="l57-teacher-block">
        <h3>◇ مفتاح التمارين: التسعة + التقييم الأصلي</h3>
        <div className="l57-teacher-keys">
          {PRACTICE_GROUPS_57.map((group) => (
            <div key={group.id} className="l57-teacher-keyblock">
              <h4>
                <LatinRuns text={group.title} />
              </h4>
              <ol>
                {group.items.map((item, i) => (
                  <li key={item.id} data-teacher-practice={item.id}>
                    <span className="l57-teacher-key-no">{i + 1}</span>
                    <span dir="ltr" className="l57-teacher-key-q">
                      {item.prompt}
                    </span>
                    <span dir="ltr" className="l57-teacher-key-a">
                      {item.answer}
                    </span>
                    <span className="l57-teacher-key-why">
                      <LatinRuns text={item.why} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="l57-teacher-block">
        <h3>▦ مقياس تقييم الاختبار الأصلي (25 سؤالًا)</h3>
        <div className="l57-rating">
          {RATING_ROWS_57.map((row) => (
            <div key={row.range} className="l57-rating-row">
              <span className="l57-rating-range">{row.range}</span>
              <span className="l57-rating-label">{row.label}</span>
            </div>
          ))}
        </div>
        <p className="l57-hint">
          <LatinRuns text="هذا المقياس يخص الاختبار الأصلي ذا الخمسة والعشرين سؤالًا (المضاف والتفاعلي مجموعان). الاختبار التفاعلي هنا 15 سؤالًا بنصوص أصلية مختارة، والتمرين العاشر يعرض الأسئلة الخمسة والعشرين الأصلية كلها بنصوصها." />
        </p>
      </section>
    </div>
  );
}
