import { useState } from "react";
import { FinalTestAnswerKey } from "../../shared/finalTest";
import { En62, Mixed62, Scene62 } from "./kit62";
import { ORIGINAL_TEST_62, PRACTICES_62, PRACTICE_TOTALS_62 } from "./practice62";
import { TEST_62 } from "./test62";
import { STRUCTURE_TABLE62, ERRORS62, ADMIT_DENY62, SUGGEST_RECOMMEND62, PROMISE_REFUSE_OFFER62, SUMMARY62 } from "./content62";
import { MapTable62 } from "./kit62";

const TEACHER_PASSWORD_62 = "somer173";

function Alternatives62({ answers }: { answers?: string[] }) {
  if (!answers?.length) return null;
  return (
    <div className="l62-accept" data-l62-teacher-alternatives>
      <span>صيغ أخرى مقبولة:</span>
      {answers.map((answer) => (
        <div dir="ltr" key={answer}><En62>{answer}</En62></div>
      ))}
    </div>
  );
}

export default function TeacherArea62() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState("");

  if (!unlocked) {
    return (
      <Scene62 kicker="INSTRUCTOR ACCESS" title="فضاء المعلم" lead="مفتاح الاختبار المشترك والتدريبات والاختبار الأصلي في مساحة مخصصة للمعلم.">
        <section className="l62-teacher-gate" data-teacher-area="62">
          <div className="l62-kicker" dir="ltr">SECURE VIEW / 62</div>
          <h3>افتح لوحة المراجعة</h3>
          <p>هذه البوابة تحجب العرض في الواجهة فقط؛ ليست حماية أمنية لموقع ثابت.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (password.trim() === TEACHER_PASSWORD_62) {
                setUnlocked(true);
                setError(false);
              } else {
                setError(true);
              }
            }}
          >
            <label>
              <span>كلمة مرور المعلم</span>
              <input
                type="password"
                dir="ltr"
                aria-label="كلمة مرور المعلم"
                autoComplete="off"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(false);
                }}
              />
            </label>
            <button className="l62-btn l62-btn--bright" type="submit">فتح فضاء المعلم</button>
          </form>
          {error && <p className="l62-feedback is-wrong" role="alert">كلمة المرور غير صحيحة.</p>}
        </section>
      </Scene62>
    );
  }

  return (
    <Scene62 kicker="INSTRUCTOR CONSOLE" title="لوحة المراجعة للمعلم" lead="اقرأ الإجابة والسبب والفخ لكل سؤال، مع ملاحظة اختلاف المعنى بحسب السياق.">
      <div className="l62-teacher" data-teacher-area="62">
        <div className="l62-teacher-stats">
          <div><b>21</b><span>قسمًا</span></div>
          <div><b>{PRACTICE_TOTALS_62}</b><span>بند تدريب</span></div>
          <div><b>25</b><span>سؤالًا أصليًا</span></div>
          <div><b>15</b><span>سؤالًا نهائيًا</span></div>
          <div><b>5</b><span>مختبرات</span></div>
        </div>

        <p className="l62-note">
          <Mixed62 text="اطلب من المتعلم تحديد القصد (اعتراف، وعد، نصيحة...) قبل اختيار الفعل. كل مجموعة أفعال تتبع تركيباً نحوياً ثابتاً: admit/deny + V-ing، suggest/recommend + V-ing/that، promise/offer/refuse + to، advise/encourage/persuade + object + to، warn/remind + object + (not) to، accuse + of، apologize + for، insist + on، convince + that/to. حروف الجر (of, for, about, on) إجبارية وليست اختيارية." />
        </p>

        <FinalTestAnswerKey lesson={62} questions={TEST_62} accent="bg-[#4c1d95]" />

        <section className="l62-teacher-keys">
          <h3>مفاتيح التدريبات الثمانية</h3>
          {PRACTICES_62.map((group, i) => (
            <div key={group.id} className="l62-key-group">
              <button
                type="button"
                aria-expanded={open === group.id}
                onClick={() => setOpen(open === group.id ? "" : group.id)}
                className="l62-btn l62-btn--soft"
              >
                {i + 1}. <Mixed62 text={group.title} /> <span>{group.items.length} بند</span>
              </button>
              {open === group.id && (
                <ol>
                  {group.items.map((item, j) => (
                    <li key={j}>
                      <div dir="auto"><Mixed62 text={item.prompt} /></div>
                      <div dir="ltr"><En62>{item.displayAnswer ?? item.answer}</En62></div>
                      {item.ar && <p>{item.ar}</p>}
                      <Alternatives62 answers={item.accept} />
                      <p><Mixed62 text={item.why} /></p>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </section>

        <section className="l62-teacher-keys">
          <h3>مفتاح الاختبار الأصلي · 25 سؤالًا</h3>
          <button
            type="button"
            className="l62-btn l62-btn--quiet"
            aria-expanded={open === "original"}
            onClick={() => setOpen(open === "original" ? "" : "original")}
          >
            {open === "original" ? "إخفاء المفتاح" : "عرض المفتاح الكامل"}
          </button>
          {open === "original" && (
            <ol>
              {ORIGINAL_TEST_62.map((item) => (
                <li key={item.n} data-l62-teacher-original={item.n}>
                  <div className="l62-teacher-original-row" dir="ltr" data-l62-teacher-original-row>
                    <bdi dir="ltr">{item.n}.</bdi>
                    <En62>{item.displayAnswer ?? item.answer}</En62>
                  </div>
                  <Alternatives62 answers={item.alt ? [item.alt] : undefined} />
                  <p><Mixed62 text={item.why} /></p>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="l62-teacher-keys">
          <h3>الجداول المرجعية للتدريس</h3>

          <details>
            <summary>جدول التراكيب الـ 21 فعل (القسم 13)</summary>
            <MapTable62
              rows={STRUCTURE_TABLE62.rows.map((row) => ({ direct: row.verb, reported: row.structure, note: row.example }))}
              head={["الفعل", "التركيب", "مثال"]}
            />
          </details>

          <details>
            <summary>الأخطاء العشرة (القسم 15)</summary>
            {ERRORS62.map((error) => (
              <div key={error.n} className="l62-error-row">
                <b className="l62-golden">{error.title}</b>
                <p className="l62-wrongtext">✕ <En62>{error.wrong}</En62></p>
                <p className="l62-righttext">✓ <En62>{error.right}</En62></p>
                {error.alt && <p className="l62-righttext">✓ أو: <En62>{error.alt}</En62></p>}
                <p className="l62-note"><Mixed62 text={error.why} /></p>
              </div>
            ))}
          </details>

          <details>
            <summary>Admit vs Deny (القسم 4)</summary>
            <MapTable62
              rows={ADMIT_DENY62.comparison.map((c) => ({ direct: c.verb, reported: c.example, note: c.ar }))}
              head={["الفعل", "مثال", "المعنى"]}
            />
          </details>

          <details>
            <summary>Suggest vs Recommend (القسم 5)</summary>
            <MapTable62
              rows={[
                { direct: "suggest", reported: SUGGEST_RECOMMEND62.comparison.suggest.en, note: SUGGEST_RECOMMEND62.comparison.suggest.ar },
                { direct: "recommend", reported: SUGGEST_RECOMMEND62.comparison.recommend.en, note: SUGGEST_RECOMMEND62.comparison.recommend.ar },
              ]}
              head={["الفعل", "مثال", "الفرق في المعنى"]}
            />
          </details>

          <details>
            <summary>Promise / Offer / Refuse (القسم 6)</summary>
            <MapTable62
              rows={PROMISE_REFUSE_OFFER62.comparison.map((c) => ({ direct: c.verb, reported: c.en, note: c.ar }))}
              head={["الفعل", "مثال", "المعنى"]}
            />
          </details>
        </section>

        <section className="l62-teacher-keys">
          <h3>الملخص الذهبي للتدريس</h3>
          <ol>
            {SUMMARY62.groups.map((group) => (
              <li key={group.title}>{group.title}</li>
            ))}
          </ol>
          <p className="l62-small">
            ملاحظة تدريسية: ابدأ كل تصحيح بسؤال المتعلم «ما القصد؟» قبل أي تغيير — لأن فعل النقل والضمير والزمان والمكان كلها وظائف للقصد والسياق، لا قواعد آلية.
          </p>
        </section>
      </div>
    </Scene62>
  );
}