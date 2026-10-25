import { useMemo, useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { TEST_LEVELS_35 } from "./testData";
import { FINAL_BOSS_MODEL_35, FINAL_BOSS_REQUIREMENTS_35 } from "./practiceData";
import {
  Card35,
  Choice35,
  Example35,
  FOCUS_35,
  PlatformInline35,
  PlatformNote35,
  SourceGroup35,
  SourceLine35,
  Table35,
} from "./kit35";

/* ----------------------------------------------------------------------------
   Stage E — DEMONSTRATE MASTERY
   The 25-question test briefing, the Final Boss writing mission with a real
   requirements checker, the golden summary, and the curriculum map.
---------------------------------------------------------------------------- */

export default function StageE35({ id, onGoTest, onGoSolutions }: { id: string; onGoTest: () => void; onGoSolutions: () => void }) {
  switch (id) {
    case "test-bridge":
      return <TestBridge35 onGoTest={onGoTest} onGoSolutions={onGoSolutions} />;
    case "boss-brief":
      return <BossBrief35 />;
    case "boss-writing":
      return <BossWriting35 />;
    case "summary-forms":
      return <SummaryForms35 />;
    case "summary-uses":
      return <SummaryUses35 />;
    case "curriculum":
      return <Curriculum35 />;
    case "closing":
      return <Closing35 />;
    default:
      return null;
  }
}

function TestBridge35({ onGoTest, onGoSolutions }: { onGoTest: () => void; onGoSolutions: () => void }) {
  return (
    <div className="fg35-body">
      <Card35 tone="sun" eyebrow={<>🏆 Future Plans Master Test · </>} title="25 سؤالًا في خمسة مستويات">
        <SourceGroup35
          lines={["يتكون الاختبار من 25 سؤالًا، موزعة على خمسة مستويات.", "حاول الإجابة عن جميع الأسئلة قبل فتح الحلول."]}
        />
        <div className="fg35-stack" style={{ marginTop: 9 }}>
          {TEST_LEVELS_35.map((level, index) => (
            <div key={level.id} className="fg35-meter__row" style={{ alignItems: "flex-start" }}>
              <span style={{ fontWeight: 900 }}>
                <span className="fg35-q__n" style={{ display: "inline-grid", marginInlineEnd: 6 }}>{index + 1}</span>
                <Rich text={level.title} />
              </span>
              <span className="fg35-meter__state" dir="ltr">{level.range.replace("الأسئلة", "Q")}</span>
            </div>
          ))}
        </div>
        <div className="fg35-inputrow">
          <button type="button" className={`fg35-btn ${FOCUS_35}`} onClick={onGoTest} data-go-test>
            ابدأ الاختبار (25 سؤالًا)
          </button>
          <button type="button" className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`} onClick={onGoSolutions} data-go-solutions>
            منطقة الحلول 🔐
          </button>
        </div>
        <PlatformNote35>
          الاختبار يبدأ محايدًا: لا تصحيح ولا درجة ولا شرح قبل الضغط على «إرسال الاختبار». بعد الإرسال تظهر الدرجة والتغذية الراجعة لكل سؤال، وتُفتح منطقة الحلول التفصيلية.
        </PlatformNote35>
      </Card35>

      <Card35 tone="mint" eyebrow={<>🗺️ كيف تُقيَّم؟</>} title="20 سؤالًا موضوعيًا + 5 مهام إنتاج">
        <Table35
          ariaLabel="توزيع درجات الاختبار"
          headers={["المستوى", "طريقة التقييم"]}
          rows={[
            { a: "1. اختيار من متعدد (1–5)", b: "تصحيح آلي" },
            { a: "2. إكمال الجمل (6–10)", b: "تصحيح آلي مع قبول بدائل صحيحة" },
            { a: "3. WILL أم GOING TO (11–15)", b: "تصحيح آلي للمساعد/الصيغة" },
            { a: "4. تصحيح الأخطاء (16–20)", b: "تصحيح آلي مع قبول صيغ مكافئة" },
            { a: "5. إنتاج جملة (21–25)", b: "فحص بنيوي آلي + مراجعة بشرية للنموذج" },
          ]}
        />
        <PlatformInline35>
          المهام الكتابية لا تُقاس بكلمة واحدة: لكل سؤال نموذج وبدائل. الفحص الآلي يتحقق من البنية المطلوبة فقط، ويظهر النموذج دائمًا للمقارنة.
        </PlatformInline35>
      </Card35>
    </div>
  );
}

function BossBrief35() {
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>🚀 Final Boss · </>} title="My Future Plans and Predictions">
        <SourceGroup35
          lines={["عنوان المهمة:", "My Future Plans and Predictions", "اكتب فقرة من 12 إلى 15 جملة باللغة الإنجليزية.", "يجب أن تحتوي على:"]}
        />
        <ol className="fg35-numlist" data-boss-requirements>
          {FINAL_BOSS_REQUIREMENTS_35.map((line) => (
            <li key={line}><Rich text={line} /></li>
          ))}
        </ol>
      </Card35>

      <Card35 tone="sun" eyebrow={<>🧭 قبل أن تكتب</>} title="خطة عمل من خمس دقائق">
        <div className="fg35-timeline">
          <div className="fg35-timeline__stop">
            <div className="fg35-timeline__when">1 · الأفكار</div>
            <div className="fg35-timeline__what">اكتب أربع خطط شخصية، ثم جملتي دليل، ثم رأيين.</div>
          </div>
          <div className="fg35-timeline__stop">
            <div className="fg35-timeline__when">2 · الزمن</div>
            <div className="fg35-timeline__what">اختر ثلاثة تعبيرات زمنية مختلفة وضعها في مواضع طبيعية.</div>
          </div>
          <div className="fg35-timeline__stop">
            <div className="fg35-timeline__when">3 · المراجعة</div>
            <div className="fg35-timeline__what">افحص المساعد وV1، ثم السؤالين، ثم عدد الجمل.</div>
          </div>
        </div>
      </Card35>
    </div>
  );
}

const TIME_MARKERS = ["tomorrow", "tonight", "next week", "next month", "next summer", "this weekend", "in two days", "soon", "in the future", "next year"];

function analyseParagraph35(text: string) {
  const lower = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).map((part) => part.trim()).filter((part) => part.length > 1);
  const goingTo = (lower.match(/going to/g) || []).length;
  const will = (lower.match(/\bwill\b/g) || []).length;
  const wont = (lower.match(/\bwon'?t\b|\bwill not\b/g) || []).length;
  const areYou = /are you going to/i.test(text);
  const whatAreYou = /what are you going to/i.test(text);
  const times = TIME_MARKERS.filter((marker) => lower.includes(marker));
  return { sentences: sentences.length, goingTo, will, wont, areYou, whatAreYou, times };
}

function BossWriting35() {
  const [text, setText] = useState("");
  const result = useMemo(() => analyseParagraph35(text), [text]);
  const rows = [
    { label: "12–15 جملة", ok: result.sentences >= 12 && result.sentences <= 15, state: `${result.sentences}` },
    { label: "صيغ going to (خطط + دليل)", ok: result.goingTo >= 6, state: `${result.goingTo}` },
    { label: "will (توقع/اعتقاد + قرار لحظي)", ok: result.will >= 3, state: `${result.will}` },
    { label: "won't (وعد منفي)", ok: result.wont >= 1, state: `${result.wont}` },
    { label: "سؤال Are you going to…?", ok: result.areYou, state: result.areYou ? "✓" : "—" },
    { label: "سؤال What are you going to…?", ok: result.whatAreYou, state: result.whatAreYou ? "✓" : "—" },
    { label: "ثلاثة تعبيرات زمنية مختلفة", ok: result.times.length >= 3, state: `${result.times.length}` },
  ];
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>✍️ مساحة الكتابة · لا تُرسَل تلقائيًا</>} title="اكتب فقرتك هنا">
        <p className="fg35-muted" style={{ marginTop: 0 }}>
          هذه المساحة محلية في متصفحك، ولا تُرسَل إلى أي جهة. المقياس أدناه يفحص البنية تقريبيًا؛ المعلم هو من يقيّم المعنى.
        </p>
        <label className="fg35-sr" htmlFor="l35-writing">فقرتك</label>
        <textarea
          id="l35-writing"
          className="fg35-textarea"
          dir="ltr"
          rows={10}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Next year, I'm going to…"
        />
        <div className="fg35-meter" aria-live="polite">
          {rows.map((row) => (
            <div key={row.label} className="fg35-meter__row" data-ok={row.ok}>
              <span>{row.label}</span>
              <span className="fg35-meter__state" dir="ltr">{row.state}</span>
            </div>
          ))}
        </div>
        <PlatformNote35>
          المقياس لا يفهم المعنى ولا يصحح القواعد النحوية؛ إنه قائمة تحقق لتذكيرك بالمتطلبات الثمانية. راجع فقرتك بعد الكتابة، ثم استخدم النموذج للمقارنة فقط.
        </PlatformNote35>
      </Card35>

      <Card35 tone="sun" eyebrow={<>📄 نموذج إرشادي قصير</>} title="لا تنسخه — قارن به">
        <div className="fg35-stack">
          {FINAL_BOSS_MODEL_35.map((line) => (
            <Example35 key={line} en={line} tone="sun" />
          ))}
        </div>
        <SourceLine35 text="لا تنسخ النموذج؛ المطلوب بناء فقرة خاصة بك، تستخدم فيها المعاني التي تعلمناها." emphasis />
      </Card35>
    </div>
  );
}

function SummaryForms35() {
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>🧠 الملخص الذهبي · </>} title="BE GOING TO — الصيغ الأربع">
        <div className="fg35-summary">
          <div className="fg35-summary__cell">
            <div className="fg35-summary__label">الصيغة المثبتة</div>
            <span className="fg35-en" dir="ltr">Subject + am/is/are + going to + V1</span>
            <Example35 en="I'm going to study tonight." />
          </div>
          <div className="fg35-summary__cell">
            <div className="fg35-summary__label">النفي</div>
            <span className="fg35-en" dir="ltr">Subject + am/is/are + not + going to + V1</span>
            <Example35 en="She isn't going to participate." tone="predict" />
          </div>
          <div className="fg35-summary__cell">
            <div className="fg35-summary__label">السؤال</div>
            <span className="fg35-en" dir="ltr">Am/Is/Are + Subject + going to + V1?</span>
            <Example35 en="Are they going to travel?" tone="sky" />
          </div>
          <div className="fg35-summary__cell">
            <div className="fg35-summary__label">الإجابة القصيرة</div>
            <span className="fg35-en" dir="ltr">Yes, they are. / No, they aren't.</span>
          </div>
          <div className="fg35-summary__cell">
            <div className="fg35-summary__label">أسئلة المعلومات</div>
            <span className="fg35-en" dir="ltr">Wh-word + am/is/are + Subject + going to + V1?</span>
            <Example35 en="Where are you going to stay?" tone="sky" />
          </div>
        </div>
      </Card35>
    </div>
  );
}

function SummaryUses35() {
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>🌱 أهم استخدامين · </>} title="خطة سابقة، أو دليل حاضر">
        <div className="fg35-duo">
          <div className="fg35-plan">
            <div className="fg35-plan__title">① خطة أو نية مستقبلية موجودة مسبقًا</div>
            <Example35 en="We're going to build a new website." />
          </div>
          <div className="fg35-predict">
            <div className="fg35-predict__title">② توقع نبرز فيه دليلًا حاضرًا</div>
            <Example35 en="Look at those clouds! It's going to rain." tone="predict" />
          </div>
        </div>
      </Card35>

      <Card35 tone="sun" eyebrow={<>⚖️ المقارنة الذهبية · </>} title="أربع جمل تختصر الفرق">
        <div className="fg35-ex-grid fg35-ex-grid--two">
          <Example35 en="I'll answer the phone." ar="قرار لحظي." tone="sun" />
          <Example35 en="I'm going to buy a new phone next month." ar="خطة مسبقة." tone="mint" />
          <Example35 en="I think our team will win." ar="توقع أو اعتقاد." tone="sky" />
          <Example35 en="Look at the score! Our team is going to win!" ar="توقع مبني على دليل حاضر." tone="predict" />
        </div>
        <SourceLine35 text="تذكّر أن هذه الاستخدامات نموذجية، وقد تتداخل الصيغتان في سياقات أخرى." emphasis />
        <Choice35
          question="أي جملة تعبّر عن توقع مبني على دليل حاضر؟"
          options={[
            { text: "Look at the score! Our team is going to win!", correct: true },
            { text: "I think our team will win." },
            { text: "I'm going to buy a new phone next month." },
          ]}
          explanation="كلمة Look at the score تشير إلى دليل حاضر. الجملة الثانية اعتقاد، والثالثة خطة."
        />
      </Card35>
    </div>
  );
}

function Curriculum35() {
  const columns = [
    {
      title: "منظومة الحاضر",
      items: ["① Present Simple", "② Present Continuous", "③ Present Perfect", "④ Present Perfect Continuous"],
    },
    {
      title: "منظومة الماضي",
      items: ["⑤ Past Simple", "⑥ Past Continuous", "⑦ Past Perfect", "⑧ Past Perfect Continuous"],
    },
    {
      title: "منظومة المستقبل",
      items: ["⑨ Future Simple — WILL: الدرس 34 مكتمل.", "⑩ BE GOING TO: الدرس 35 مكتمل."],
    },
  ];
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>🗺️ خريطة تقدم المنهج · </>} title="أكملنا حتى الآن">
        <SourceLine35 text="أكملنا حتى الآن:" />
        <div className="fg35-map" style={{ marginTop: 8 }}>
          {columns.map((column) => (
            <div className="fg35-map__col" data-done="true" key={column.title}>
              <div className="fg35-map__title"><Rich text={column.title} /></div>
              <ul className="fg35-map__list">
                {column.items.map((item) => (
                  <li key={item} data-current={/BE GOING TO/.test(item)}>
                    <span className="fg35-map__check">✓</span>
                    <span><Rich text={item} /></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card35>

      <Card35 tone="mint" eyebrow={<>🧭 قراءة الخريطة</>} title="لماذا هذا الموضع مهم؟">
        <p className="fg35-prose">
          الدرس 35 يُغلق الخط الثاني في منظومة المستقبل: بعد <En>WILL</En> في الدرس 34، أصبح لديك الآن صيغتان لوصف المستقبل. الدرس 36 لا يضيف زمنًا جديدًا؛ بل يدرّبك على الاختيار بينهما.
        </p>
        <PlatformInline35>
          الخريطة تعرض الدروس المكتملة فقط. الدروس اللاحقة (Future Continuous وما بعدها) لم تُنجَز بعد، ولا تُعلَّم هنا كمكتملة.
        </PlatformInline35>
      </Card35>
    </div>
  );
}

function Closing35() {
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>🚉 المحطة القادمة · </>} title="الدرس 36: WILL vs BE GOING TO">
        <SourceGroup35
          lines={[
            "المحطة القادمة:",
            "الدرس 36: WILL vs BE GOING TO — Mastering Future Decisions & Predictions",
            "سيكون درس مقارنة وتطبيق شامل، ننتقل فيه من معرفة القاعدتين بصورة منفصلة إلى اختيار الصيغة المناسبة في المواقف الحقيقية، مع التوسع في الحالات التي تصلح فيها الصيغتان، واختلاف المعنى، والحوار الطبيعي.",
            "ثم نتابع إلى Future Continuous، وبعده Future Perfect وFuture Perfect Continuous.",
          ]}
        />
      </Card35>

      <Card35 tone="sun" eyebrow={<>🌻 القاعدة الأهم</>} title="لا يكفي أن الجملة عن المستقبل">
        <SourceGroup35
          lines={[
            "القاعدة الأهم التي نخرج بها اليوم:",
            "لا يكفي أن تعرف أن الجملة تتحدث عن المستقبل؛ عليك أن تفهم هل المتحدث يعلن قرارًا اتخذه الآن، أم يعبّر عن نية سابقة، أم يقدم وعدًا، أم يتوقع شيئًا بناءً على رأيه أو على دليل يلاحظه.",
            "وهذه هي النقلة الحقيقية من حفظ القواعد إلى إتقان استخدامها.",
          ]}
        />
        <PlatformNote35>
          عد إلى أهداف الدرس في المرحلتين A وB، ثم إلى الاختبار والكتابة. إن استطعت شرح الفرق بين خطة سابقة ودليل حاضر بجملتك الخاصة، فقد أتممت جوهر الدرس.
        </PlatformNote35>
      </Card35>

      <Card35 tone="mint" eyebrow={<>📚 هل انتهى الدرس؟</>} title="مراجعة أخيرة قبل الاختبار">
        <Table35
          ariaLabel="ملخص سريع"
          headers={["إن أردت…", "فاختر"]}
          rows={[
            { a: "خطة أو نية موجودة مسبقًا", b: "be going to" },
            { a: "توقعًا تبرزه بدليل حاضر", b: "be going to" },
            { a: "قرارًا لحظيًا أو وعدًا أو عرض مساعدة", b: "will" },
            { a: "توقعًا عامًا أو اعتقادًا", b: "will" },
          ]}
        />
        <p className="fg35-muted" style={{ marginTop: 6 }}>
          هذه اختيارات نموذجية، وليست حدودًا صارمة. راجع  و و قبل أن تعتمد عليها كقواعد مطلقة.
        </p>
      </Card35>
    </div>
  );
}
