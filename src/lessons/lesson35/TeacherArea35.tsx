import { useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { FinalTestAnswerKey } from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import { SOURCE_SECTIONS_35 } from "./ledger35";
import { FOCUS_35 } from "./kit35";
import {
  AUXILIARY_ITEMS_35,
  DECISION_PRACTICE_ITEMS_35,
  DETECTIVE_ITEMS_35,
  FINAL_BOSS_MODEL_35,
  FINAL_BOSS_REQUIREMENTS_35,
  READING_ANALYSIS_35,
  READING_ANSWERS_35,
  READING_QUESTIONS_35,
  TRANSFORMATION_ITEMS_35,
} from "./practiceData";
import { TEST_LEVELS_35, TEST_SOLUTIONS_35 } from "./testData";

/* Teacher area — password-gated, separate from the student lesson/test/solutions.
   The repository's established teacher password mechanism is reused unchanged. */
const TEACHER_PASSWORD_35 = "somer173";

const PACING_35 = [
  "المرحلة A (10 خطوات): المعنى، البنية، المساعد، V1 — ١٥ دقيقة.",
  "المرحلة B (14 خطوة): الإثبات، الخطط، الحوار، والدليل — ٢٥ دقيقة.",
  "المرحلة C (15 خطوة): النفي، الأسئلة، WH/WHO، then الحالات المتقدمة — ٢٥ دقيقة.",
  "المرحلة D (13 خطوة): التحقيق والتدريبات والقراءة — ٣٠ دقيقة.",
  "المرحلة E (7 خطوات): الاختبار، الكتابة، الملخص — ٢٥ دقيقة.",
];

const TEACHING_NOTES_35 = [
  {
    head: "علّم المعنى قبل الصيغة",
    lines: [
      "ابدأ كل مثال بسؤال: متى اتُّخذ القرار؟ إن كان قبل الكلام فالنية سابقة، وإن وُلد الآن فالقرار لحظي.",
      "لا تعلّم going to كـ «زمن مستقبل» فقط؛ فهي تغطي الخطط/النوايا والتوقع المبني على دليل حاضر.",
      "اجعل الطالب يسمّي الدليل في جملة التوقع قبل أن يشرح القاعدة.",
    ],
  },
  {
    head: "الفرق تداولي وليس حظرًا",
    lines: [
      "WILL وBE GOING TO تتشابهان في كثير من السياقات. قد تكون الجملتان صحيحتين مع اختلاف التركيز.",
      "لا تصحح جملة صحيحة نحويًا باعتبارها «خطأ» لمجرد أن الخيار الآخر أكثر نموذجية في التمرين. ناقش المعنى، والسياق، ودرجة الشيوع.",
      "تعبيرات مثل tomorrow/next week تحدد الزمن ولا تفرض الصيغة وحدها.",
    ],
  },
  {
    head: "الخطأ النحوي الأكثر تكرارًا",
    lines: [
      "تصريف الفعل بعد going to: يكتب الطالب buys أو bought أو studying. ذكّره أن going to تحل محل will، وما بعد will يكون V1.",
      "نفي بـ doesn't/don't مع going to. النفي الصحيح: am/is/are + not + going to.",
      "سؤال بـ Do/Does. السؤال الصحيح: Am/Is/Are + subject + going to…?",
    ],
  },
  {
    head: "القراءة والكتابة",
    lines: [
      "في القراءة، اطلب من الطالب وضع خط تحت كل going to وتصنيفها: خطة أم دليل. ثم اطلب تصنيف every will: قرار أم وعد أم توقع.",
      "في Final Boss، قيّم المتطلبات الثمانية على حدة. النموذج إرشادي فقط؛ لا تخصم لأن الطالب استخدم أفكارًا مختلفة.",
      "لا تحوّل المهمة إلى اختبار نحوي فقط: الترابط، وضوح الفكرة، ووجود دليل في التوقع أمور مهمة أيضًا.",
    ],
  },
];

export default function TeacherArea35({
  unlocked,
  onUnlockChange,
  onGoSolutions,
}: {
  unlocked: boolean;
  onUnlockChange: (value: boolean) => void;
  onGoSolutions: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!unlocked) {
    return (
      <form
        data-area="lesson35-teacher"
        className="fg35-gate"
        onSubmit={(event) => {
          event.preventDefault();
          if (password === TEACHER_PASSWORD_35) {
            setPassword("");
            setError("");
            onUnlockChange(true);
          } else {
            setError("كلمة المرور غير صحيحة.");
          }
        }}
      >
        <div style={{ fontSize: "1.8rem" }} aria-hidden>👩‍🏫</div>
        <h2>منطقة المعلم · Lesson 35</h2>
        <p className="fg35-prose">
          مساحة منفصلة عن الطالب والاختبار والحلول: تخطيط الحصة، ملاحظات التدريس، مفاتيح التمارين الأصلية، تحليل القراءة، و25 حلًا تفصيليًا.
        </p>
        <label htmlFor="l35-teacher-password">كلمة مرور المعلم</label>
        <input
          id="l35-teacher-password"
          className="fg35-input"
          style={{ width: "100%", marginTop: 6 }}
          type="password"
          dir="ltr"
          autoComplete="off"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "l35-teacher-error" : undefined}
        />
        {error ? <p id="l35-teacher-error" role="alert" className="fg35-error">✕ {error}</p> : null}
        <div className="fg35-inputrow">
          <button type="submit" className={`fg35-btn ${FOCUS_35}`}>🔓 دخول المعلم</button>
          <button type="button" className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`} onClick={onGoSolutions}>منطقة الحلول</button>
        </div>
      </form>
    );
  }

  const detectiveKey = DETECTIVE_ITEMS_35.map((item, index) => ({ n: index + 1, prompt: item.prompt, answer: item.answer, why: item.explanation }));
  const auxKey = AUXILIARY_ITEMS_35.map((item) => ({ n: item.n, prompt: item.prompt, answer: item.answer, why: item.explanation }));
  const transformKey = TRANSFORMATION_ITEMS_35.map((item) => ({ n: item.n, prompt: item.prompt, answer: item.answer, why: item.explanation }));
  const decisionKey = DECISION_PRACTICE_ITEMS_35.map((item) => ({ n: item.n, prompt: item.promptLines.join(" "), answer: item.answer, why: item.explanation }));

  return (
    <div data-area="lesson35-teacher" className="fg35-body">
      <header className="fg35-testhead">
        <div className="fg35-card__eyebrow">
          <span className="fg35-pill fg35-pill--stage">👩‍🏫 TEACHER AREA</span>
          <span className="fg35-pill">25 حلًا</span>
          <span className="fg35-pill">مفاتيح المصدر</span>
        </div>
        <h2>دليل المعلم — الدرس 35</h2>
        <p className="fg35-prose">
          هذه المساحة محمية بكلمة مرور ومستقلة عن منطقة الطالب. الإجابات أدناه لا تُرندَر قبل فتح البوابة.
        </p>
        <div className="fg35-inputrow">
          <button type="button" className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`} onClick={onGoSolutions}>🔑 حلول الاختبار للطالب</button>
          <button type="button" className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`} onClick={() => onUnlockChange(false)}>🔒 قفل المنطقة</button>
        </div>
      </header>

      <section className="fg35-card" data-tone="plain">
        <div className="fg35-card__eyebrow">🔐 §35 · مساحة المعلم — الحلول التفصيلية</div>
        <h3>مفتاح تصحيح الاختبار النهائي — الدرس 35</h3>
        <p className="fg35-prose"><Rich text="حاول حل الاختبار كاملًا أولًا، ثم اكشف الإجابات." /></p>
        <div className="fg35-inputrow">
          <button type="button" className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`} onClick={onGoSolutions}>عرض الحلول التفصيلية</button>
        </div>
        <div className="fg35-teacher-note" style={{ marginTop: 8 }}>
          <b>ملاحظة مصدرية:</b> هذا القسم في المصدر لا يضم أي مفتاح إجابات فعلية. المفتاح الكامل أدناه وبطاقات الشرح كلها مستنتجة من المنصة/المعلم، لا منقولة عن مصدر رسمي.
        </div>
      </section>

      <section className="fg35-card" data-tone="sun">
        <div className="fg35-card__eyebrow">🔐 مفتاح التقييم المشترك</div>
        <h3>التقييم السريع للدورة — 15 سؤالًا</h3>
        <p className="fg35-prose">
          للحفاظ على تكامل نظام التقييم القائم، يعرض هذا القسم مفتاح <En>FinalTest</En> الخاص بالدرس 35 (15 سؤالًا). هذا تقييم منصة مستقل عن اختبار الـ25 سؤالًا في §34.
        </p>
        <FinalTestAnswerKey lesson={35} questions={FINAL_TESTS[35]} accent="bg-[#0f8f7d]" />
      </section>

      <section className="fg35-card" data-tone="mint">
        <div className="fg35-card__eyebrow">🧭 نظرة عامة</div>
        <h3>أهداف التدريس والحدود المصدرية</h3>
        <ul className="fg35-numlist">
          <li>إتقان <En>Subject + am/is/are + going to + V1</En> في الإثبات والنفي والسؤال.</li>
          <li>التمييز بين خطة/نية سابقة، قرار لحظي، وعد، اعتقاد، وتوقع مبني على دليل حاضر.</li>
          <li>الحفاظ على التداخل المشروع بين WILL وBE GOING TO، وعدم تقديم الاستخدامات النموذجية كقواعد مطلقة.</li>
          <li>تطبيق الصيغة في الحوار والقراءة والكتابة.</li>
        </ul>
        <div className="fg35-teacher-note" style={{ marginTop: 8 }}>
          <b>حدود المصدر:</b> §35 يذكر «مساحة المعلم — الحلول التفصيلية» وزر «عرض الحلول التفصيلية» دون إيراد أي إجابات أو شروح. جميع حلول الأسئلة 25 وتفسيراتها هنا <b>مستنتجة من المنصة/المعلم</b>، وليست مفتاحًا رسميًا.
        </div>
      </section>

      <section className="fg35-card" data-tone="sky">
        <div className="fg35-card__eyebrow">⏱️ توزيع مقترح</div>
        <h3>خطط الحصة (توزيع تقريبي · من إعداد المعلم)</h3>
        <ol className="fg35-numlist">
          {PACING_35.map((line) => <li key={line}><Rich text={line} /></li>)}
        </ol>
        <p className="fg35-muted">التوزيع تقريبي؛ يمكن تقسيم الدرس على حصتين بحسب مستوى الصف.</p>
      </section>

      <section className="fg35-card" data-tone="plain">
        <div className="fg35-card__eyebrow">🧠 Pedagogical notes · authored</div>
        <h3>ملاحظات تدريسية</h3>
        <div className="fg35-stack" style={{ marginTop: 8 }}>
          {TEACHING_NOTES_35.map((note) => (
            <div key={note.head}>
              <h4 className="fg35-strong" style={{ margin: "0 0 4px", fontSize: "0.9rem" }}>{note.head}</h4>
              <ul className="fg35-numlist" style={{ marginTop: 0 }}>
                {note.lines.map((line) => <li key={line}><Rich text={line} /></li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <KeySection35 title="Grammar Detective · 8 مفاتيح من المصدر" items={detectiveKey} />
      <KeySection35 title="اختر am / is / are · 8 مفاتيح من المصدر" items={auxKey} />
      <KeySection35 title="تحويل إلى GOING TO · 6 مفاتيح من المصدر" items={transformKey} />
      <KeySection35 title="WILL أم GOING TO · 8 مواقف + تعليل المصدر" items={decisionKey} />

      <section className="fg35-card" data-tone="mint">
        <div className="fg35-card__eyebrow">📖 §33 · Reading key</div>
        <h3>إجابات أسئلة الفهم السبع</h3>
        <ol className="fg35-numlist">
          {READING_ANSWERS_35.map((line, index) => (
            <li key={line}>
              <span className="fg35-muted">Q{index + 1}: <Rich text={READING_QUESTIONS_35[index]?.replace(/^[①-⑦]\s*/, "") ?? ""} /></span>
              <div className="fg35-en" dir="ltr" style={{ marginTop: 2 }}>{line}</div>
            </li>
          ))}
        </ol>
        <h4 className="fg35-strong" style={{ marginTop: 10, fontSize: "0.9rem" }}>التحليل النحوي كما ورد</h4>
        <ul className="fg35-numlist">
          {READING_ANALYSIS_35.map((line) => <li key={line}><Rich text={line} /></li>)}
        </ul>
      </section>

      <section className="fg35-card" data-tone="sun">
        <div className="fg35-card__eyebrow">🚀 Final Boss · المرحلة E</div>
        <h3>متطلبات الفقرة (12–15 جملة)</h3>
        <ol className="fg35-numlist">
          {FINAL_BOSS_REQUIREMENTS_35.map((line) => <li key={line}><Rich text={line} /></li>)}
        </ol>
        <h4 className="fg35-strong" style={{ marginTop: 10, fontSize: "0.9rem" }}>النموذج الإرشادي من المصدر</h4>
        {FINAL_BOSS_MODEL_35.map((line) => (
          <p key={line} className="fg35-en" dir="ltr" style={{ margin: "4px 0" }}>{line}</p>
        ))}
        <div className="fg35-teacher-note" style={{ marginTop: 8 }}>
          <b>روبرك مقترح (20 نقطة):</b> اكتمال المتطلبات الثمانية (8) · دقة المساعد وV1 والنفي والسؤال (4) · وضوح الدليل في التوقع (2) · الترابط والطول 12–15 جملة (3) · تنوع زمني وطبيعية السياق (3).
        </div>
      </section>

      <section className="fg35-card" data-tone="plain">
        <div className="fg35-card__eyebrow">🔑 §34 · 25 حلًا تفصيليًا</div>
        <h3>مفتاح الاختبار — إجابات مستنتجة</h3>
        <p className="fg35-prose">
          هذه هي الحلول نفسها المعروضة في منطقة الحلول بعد التسليم. المعلم يراها هنا مباشرة. كل بطاقة تذكر الفخ الشائع والبدائل المقبولة.
        </p>
        {TEST_LEVELS_35.map((level) => (
          <div key={level.id} style={{ marginTop: 10 }}>
            <h4 className="fg35-strong" style={{ fontSize: "0.9rem" }}><Rich text={level.title} /></h4>
            <div className="fg35-stack">
              {TEST_SOLUTIONS_35.filter((solution) => level.questions.some((question) => question.n === solution.n)).map((solution) => (
                <article className="fg35-solution" key={solution.n} data-teacher-solution={solution.n}>
                  <div className="fg35-solution__head">
                    <span className="fg35-q__n">{solution.n}</span>
                    <span className="fg35-tag fg35-tag--authored">Platform-derived</span>
                  </div>
                  <p className="fg35-muted" style={{ marginTop: 4 }}><Rich text={solution.prompt} /></p>
                  <div className="fg35-en" dir="ltr" style={{ marginTop: 3 }}>{solution.answer}</div>
                  {solution.alternatives.length ? (
                    <p className="fg35-muted" style={{ marginTop: 2 }}>بدائل: <span className="fg35-en" dir="ltr">{solution.alternatives.join(" · ")}</span></p>
                  ) : null}
                  <p className="fg35-prose" style={{ fontSize: "0.86rem", marginTop: 3 }}><b>الشرح: </b><Rich text={solution.explanation} /></p>
                  <p className="fg35-muted" style={{ marginTop: 2 }}><b>الفخ: </b><Rich text={solution.trap} /></p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="fg35-card" data-tone="mint">
        <div className="fg35-card__eyebrow">🗂️ Source ledger</div>
        <h3>فهرس الأقسام المصدرية ({SOURCE_SECTIONS_35.length} مدخلًا)</h3>
        <p className="fg35-muted">كل قسم مصدري ووجهته داخل الدرس. محتوى §35 (الحلول) غير موجود في المصدر؛ لذلك لا يُنسب إليه شيء.</p>
        <ol className="fg35-numlist">
          {SOURCE_SECTIONS_35.map((section) => (
            <li key={section.id}>
              <Rich text={section.title} />
              <span className="fg35-muted"> — <En>{section.id}</En></span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function KeySection35({ title, items }: { title: string; items: { n: number; prompt: string; answer: string; why: string }[] }) {
  return (
    <section className="fg35-card" data-tone="plain">
      <div className="fg35-card__eyebrow">✅ Source exercise key</div>
      <h3>{title}</h3>
      <div className="fg35-stack" style={{ marginTop: 8 }}>
        {items.map((item) => (
          <div key={item.n} className="fg35-question">
            <div className="fg35-q__prompt">
              <span className="fg35-q__n">{item.n}</span>
              <span className="fg35-wide"><Rich text={item.prompt} /></span>
            </div>
            <p className="fg35-en" dir="ltr" style={{ marginTop: 4, color: "#0a6b5e" }}>{item.answer}</p>
            <p className="fg35-muted" style={{ marginTop: 2 }}><b>تعليل تعليمي: </b><Rich text={item.why} /></p>
          </div>
        ))}
      </div>
    </section>
  );
}
