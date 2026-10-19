import { useMemo, useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import {
  Bullets35,
  Card35,
  Choice35,
  Example35,
  Formula35,
  PlatformNote35,
  SourceGroup35,
  SourceLine35,
  Table35,
  TapChecks35,
  FOCUS_35,
} from "./kit35";

/* ----------------------------------------------------------------------------
   Stage A — DISCOVER THE MEANING
   Ten short steps covering the cover bridge, objectives 1–10, the programming
   intention story, the core formula, am/is/are, and the V1 golden rule.
---------------------------------------------------------------------------- */

export default function StageA35({ id }: { id: string }) {
  switch (id) {
    case "cover":
      return <CoverStep35 />;
    case "bridge":
      return <BridgeStep35 />;
    case "objectives-a":
      return <ObjectivesA35 />;
    case "objectives-b":
      return <ObjectivesB35 />;
    case "meaning":
      return <MeaningStep35 />;
    case "intention":
      return <IntentionStep35 />;
    case "structure":
      return <StructureStep35 />;
    case "auxiliary":
      return <AuxiliaryStep35 />;
    case "auxiliary-examples":
      return <AuxiliaryExamples35 />;
    case "v1":
      return <V1Step35 />;
    default:
      return null;
  }
}

function CoverStep35() {
  const beds: { icon: string; title: string; en: string; body: string; tone: "plan" | "predict" | "sun" }[] = [
    {
      icon: "🌱",
      title: "نية سبقت الكلام",
      en: "A prior intention",
      body: "قرار اتخذته قبل أن تتحدث: I'm going to learn programming.",
      tone: "plan",
    },
    {
      icon: "🔍",
      title: "دليل تراه الآن",
      en: "Present evidence",
      body: "غيوم سوداء الآن ← It's going to rain. التوقع مبني على ما نلاحظه.",
      tone: "predict",
    },
    {
      icon: "🌤️",
      title: "اختيار واعٍ",
      en: "Meaning before form",
      body: "WILL أم BE GOING TO؟ نختار بحسب ما نريد إبرازه، لا بحسب الزمن وحده.",
      tone: "sun",
    },
  ];
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>🌻 FUTURE GARDEN STUDIO · LESSON 35</>} title="ثلاثة أحواض في حديقة واحدة">
        <div className="fg35-ex-grid" style={{ marginTop: 8 }}>
          {beds.map((bed) => (
            <div key={bed.title} className={bed.tone === "plan" ? "fg35-plan" : bed.tone === "predict" ? "fg35-predict" : "fg35-card"} style={{ padding: 11 }}>
              <div className="fg35-row" style={{ gap: 6 }}>
                <span aria-hidden style={{ fontSize: "1.1rem" }}>{bed.icon}</span>
                <b style={{ fontSize: "0.92rem" }}>{bed.title}</b>
              </div>
              <div className="fg35-card__eyebrow" style={{ marginTop: 2 }}>{bed.en}</div>
              <p className="fg35-prose" style={{ fontSize: "0.88rem", marginTop: 4 }}>{bed.body}</p>
            </div>
          ))}
        </div>
        <div className="fg35-facts">
          <span className="fg35-fact"><b>{61}</b> خطوة قصيرة</span>
          <span className="fg35-fact"><b>38</b> قسمًا مصدريًا</span>
          <span className="fg35-fact"><b>25</b> سؤال اختبار</span>
          <span className="fg35-fact"><b>30</b> بندًا تدريبيًا</span>
        </div>
        <p className="fg35-muted" style={{ marginTop: 8 }}>
          التنقل: استخدم «التالي/السابق» أو خريطة الخطوات. الاختبار في منطقة مستقلة، والحلول لا تُفتح قبل التسليم.
        </p>
      </Card35>

      <Card35 tone="sun" eyebrow={<>📄 من المصدر · المقدمة</>} title="ماذا يضيف هذا الدرس؟">
        <SourceGroup35
          lines={[
            "واليوم سنضيف طريقة جديدة للتعبير عن المستقبل:",
            "BE GOING TO",
            "وسنتعلم كيف نعبّر عن شيء نعتزم فعله، أو خطة اتخذنا قرارها مسبقًا، أو توقع مبني على دليل نلاحظه الآن.",
            "هدفنا ليس حفظ الصيغة فقط، بل أن يصل الطالب إلى مرحلة يستطيع فيها اختيار التعبير المناسب تلقائيًا عندما يتحدث باللغة الإنجليزية.",
          ]}
        />
        <PlatformNote35>
          هذا الدرس لا يستبدل <En>WILL</En>؛ بل يضيف أداة ثانية. ستتعلّم أولًا البنية، ثم المعنى، ثم متى تُصلح الصيغتان معًا.
        </PlatformNote35>
      </Card35>
    </div>
  );
}

function BridgeStep35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>🧭 جسر من الدرس 34</>} title="خمس وظائف عرفناها لـ WILL">
        <SourceGroup35
          lines={[
            "في الدرس 34 تعلمنا التعبير عن المستقبل باستخدام WILL، وفهمنا أن المستقبل ليس مجرد إضافة كلمة will إلى الفعل، بل إن اختيار الصيغة يرتبط بما يريد المتحدث التعبير عنه.",
            "تعلمنا استخدام will في:",
            "① القرارات التي نتخذها لحظة الكلام.",
            "② الوعود.",
            "③ التوقعات والاعتقادات بشأن المستقبل.",
            "④ عروض المساعدة.",
            "⑤ التعبير عن الاستعداد أو الرفض.",
          ]}
        />
      </Card35>

      <Card35 tone="plain" eyebrow={<>🛠️ تحقق سريع · من إعداد المنصة</>} title="هل ما زلت تميّز وظيفة WILL؟">
        <Choice35
          question={<><En>I&apos;ll carry that box for you.</En> — ما الوظيفة الأساسية هنا؟</>}
          options={[
            { text: "عرض مساعدة لحظي", correct: true },
            { text: "خطة اتُّخذت قبل أسبوع" },
            { text: "توقع مبني على دليل حاضر" },
          ]}
          explanation="المتحدث يقدّم مساعدة الآن. عرض المساعدة من الاستخدامات النموذجية لـ WILL."
        />
        <hr className="fg35-divider" />
        <Choice35
          question={<>زميلك يطلب منك المساعدة، فتقول فورًا: <En>I&apos;ll help you.</En> — ما الوظيفة؟</>}
          options={[
            { text: "قرار يُتخذ لحظة الكلام", correct: true },
            { text: "نية موجودة مسبقًا" },
            { text: "وصف حالة مستقبلية بـ be" },
          ]}
          explanation="القرار وُلد في لحظة الطلب، لا قبله؛ لذلك WILL هو الخيار النموذجي. سنرى لاحقًا كيف يتغير الاختيار إذا كانت النية سابقة."
        />
      </Card35>
    </div>
  );
}

function ObjectivesA35() {
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>🎯 الهدف 1–5</>} title="ما ستستطيع فعله بالصيغة نفسها">
        <SourceGroup35 lines={["بنهاية الدرس ستكون قادرًا على:"]} label="نص المصدر · §1" />
        <Bullets35
          items={[
            "① فهم معنى be going to واستخداماته الأساسية.",
            "② التمييز بين الخطط المستقبلية والقرارات اللحظية.",
            "③ استخدام am / is / are مع going to بصورة صحيحة.",
            "④ تكوين الجمل المثبتة والمنفية والاستفهامية.",
            "⑤ تكوين أسئلة Wh والإجابة عنها.",
          ].map((line) => <Rich text={line} />)}
        />
        <PlatformNote35>
          الأهداف الخمسة هنا تخصّ <b>الشكل</b>: المساعد، الفعل الأساسي، والنفي والسؤال. الأهداف الخمسة التالية تخصّ <b>الاختيار</b> بين الصيغتين.
        </PlatformNote35>
      </Card35>

      <Card35 tone="sky" eyebrow={<>🗺️ خريطة المرحلة A</>} title="أين نحن الآن؟">
        <p className="fg35-prose">
          المرحلة A لا تطلب منك إنتاج جمل كثيرة بعد. وظيفتها أن تفهم <b>لماذا</b> توجد هذه الصيغة، ثم تتعرّف على هيكلها قبل أن تبدأ البناء في المرحلة B.
        </p>
        <div className="fg35-timeline">
          <div className="fg35-timeline__stop">
            <div className="fg35-timeline__when">A · الآن</div>
            <div className="fg35-timeline__what">المعنى ← البنية ← المساعد ← V1</div>
          </div>
          <div className="fg35-timeline__stop">
            <div className="fg35-timeline__when">B · التالي</div>
            <div className="fg35-timeline__what">خطط، حوار، وتوقع مبني على دليل</div>
          </div>
          <div className="fg35-timeline__stop">
            <div className="fg35-timeline__when">C–E · لاحقًا</div>
            <div className="fg35-timeline__what">تحويل، تدريب، اختبار، وكتابة</div>
          </div>
        </div>
      </Card35>
    </div>
  );
}

function ObjectivesB35() {
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>🎯 الهدف 6–10</>} title="من الصيغة إلى القرار اللغوي">
        <SourceGroup35 lines={["بنهاية الدرس ستكون قادرًا على:"]} label="نص المصدر · §1" />
        <Bullets35
          items={[
            "⑥ التعبير عن النوايا والخطط الشخصية.",
            "⑦ استخدام be going to للتوقع المبني على دليل حاضر.",
            "⑧ التمييز بين will و be going to من خلال المعنى والسياق.",
            "⑨ اكتشاف الأخطاء النحوية الشائعة وتصحيحها.",
            "⑩ كتابة حوار وفقرة عن المستقبل باستخدام الصيغتين.",
          ].map((line, index) => <Rich key={index} text={line} />)}
        />
      </Card35>

      <Card35 tone="sun" eyebrow={<>✅ تقييم ذاتي · من إعداد المنصة</>} title="أين أنت الآن؟">
        <p className="fg35-muted" style={{ marginTop: 0 }}>
          علّم ما تشعر أنك تستطيع فعله الآن. هذه علاماتك الخاصة، وليست جزءًا من الدرجة النهائية.
        </p>
        <TapChecks35
          items={[
            "أستطيع كتابة جملة مثبتة بـ am/is/are + going to + V1.",
            "أستطيع التمييز بين خطة سابقة وقرار لحظي.",
            "أستطيع شرح الفرق بين توقع مبني على رأي وتوقع مبني على دليل.",
            "أستطيع تكوين سؤال Yes/No وسؤال Wh بهذه الصيغة.",
            "أستطيع تصحيح خطأ في المساعد أو في تصريف الفعل بعد going to.",
          ]}
        />
      </Card35>
    </div>
  );
}

function MeaningStep35() {
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>🧠 من المصدر · §2</>} title="موقف تعلم البرمجة">
        <SourceGroup35
          lines={[
            "تخيل أنك قررت منذ عدة أيام أن تبدأ تعلم البرمجة.",
            "اشتريت كتابًا، وجهزت حاسوبك، وحددت وقتًا يوميًا للتعلم.",
            "يسألك صديقك:",
          ]}
        />
        <div style={{ marginTop: 10 }}>
          <div className="fg35-turn">
            <span className="fg35-turn__who">Friend</span>
            <div className="fg35-turn__body">
              <span className="fg35-en" dir="ltr">What are you going to do next month?</span>
              <span className="fg35-ar">ماذا تنوي أن تفعل الشهر القادم؟</span>
            </div>
          </div>
          <div className="fg35-turn" style={{ marginTop: 7 }} data-who="adam">
            <span className="fg35-turn__who">You</span>
            <div className="fg35-turn__body">
              <span className="fg35-en" dir="ltr">I&apos;m going to learn programming.</span>
              <span className="fg35-ar">سأتعلم البرمجة / أنوي تعلم البرمجة.</span>
            </div>
          </div>
        </div>
      </Card35>

      <Card35 tone="plain" eyebrow={<>🔎 لحظة القرار</>} title="لماذا لم نستخدم will هنا؟">
        <SourceGroup35
          lines={[
            "لاحظ أننا لم نستخدم will.",
            "لماذا؟",
            "لأن القرار لم يُتخذ في لحظة السؤال؛ بل كان لديك قرار أو نية مسبقة.",
          ]}
        />
        <Choice35
          question="أي وصف يطابق الموقف؟"
          options={[
            { text: "القرار كان موجودًا قبل سؤال الصديق.", correct: true },
            { text: "القرار اتُّخذ في اللحظة نفسها لأن going to أسهل." },
            { text: "going to تُستخدم فقط مع كلمة next month." },
          ]}
          explanation="الفارق ليس في الزمن، بل في تاريخ القرار: هنا سبق الكلام. ولهذا يبدو be going to طبيعيًا."
        />
      </Card35>
    </div>
  );
}

function IntentionStep35() {
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>🌱 الفكرة الأولى</>} title="نية أو خطة موجودة قبل لحظة الكلام">
        <SourceGroup35
          lines={[
            "وهنا نصل إلى الفكرة الأولى:",
            "Be going to تستخدم كثيرًا للتعبير عن نية أو خطة مستقبلية موجودة قبل لحظة الكلام.",
            "لكن هذا ليس استخدامها الوحيد، وسنكتشف الاستخدام الثاني بعد قليل.",
          ]}
        />
        <div className="fg35-timeline">
          <div className="fg35-timeline__stop">
            <div className="fg35-timeline__when">قبل أيام</div>
            <div className="fg35-timeline__what">اشتريت كتابًا وجهّزت حاسوبك — النية تكوّنت هنا.</div>
          </div>
          <div className="fg35-timeline__stop">
            <div className="fg35-timeline__when">لحظة الكلام</div>
            <div className="fg35-timeline__what">صديقك يسأل، وأنت تصف نية موجودة أصلًا.</div>
          </div>
          <div className="fg35-timeline__stop">
            <div className="fg35-timeline__when">الشهر القادم</div>
            <div className="fg35-timeline__what">التنفيذ — قد يحدث، وقد تعترضه ظروف.</div>
          </div>
        </div>
      </Card35>

      <Card35 tone="sun" eyebrow={<>🛠️ تحقق سريع</>} title="أي جملة تصف نية سابقة؟">
        <Choice35
          question="اقرأ المواقف الثلاثة واختر الجملة التي تعبّر عن نية تكوّنت قبل الكلام."
          options={[
            { text: <>A. <En>I&apos;m going to join the art club next month.</En> — سجّلت اسمي الأسبوع الماضي.</>, correct: true },
            { text: <>B. <En>I&apos;ll answer the phone!</En> — يرن الهاتف الآن.</> },
            { text: <>C. <En>I think it will rain tomorrow.</En> — رأي عام.</> },
          ]}
          explanation="الجملة A تشير إلى تسجيل سابق، أي نية سبقت لحظة الكلام. B قرار لحظي، وC توقع/اعتقاد."
        />
      </Card35>
    </div>
  );
}

function StructureStep35() {
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>⭐ من المصدر · §3</>} title="القاعدة الأساسية">
        <SourceLine35 text="Subject + am/is/are + going to + V1" emphasis />
        <p className="fg35-prose"><b>أي:</b> الفاعل + am/is/are + going to + الفعل الأساسي.</p>
        <div style={{ marginTop: 9 }}>
          <Formula35
            label="Subject + am/is/are + going to + V1"
            parts={[
              { text: "Subject", role: "subject", hint: "الفاعل" },
              { text: "am / is / are", role: "aux", hint: "المساعد" },
              { text: "going to", role: "going", hint: "جزء من الصيغة" },
              { text: "V1", role: "verb", hint: "الفعل الأساسي" },
            ]}
          />
        </div>
      </Card35>

      <Card35 tone="plan" eyebrow={<>🔬 تشريح جملة</>} title="I am going to study.">
        <Example35 en="I am going to study." ar="سأدرس / أنوي الدراسة." />
        <div className="fg35-stack" style={{ marginTop: 8 }}>
          {[
            ["I", "الفاعل"],
            ["am", "الفعل المساعد المناسب للفاعل"],
            ["going to", "جزء من صيغة التعبير عن المستقبل"],
            ["study", "الفعل الأساسي V1"],
          ].map(([part, role]) => (
            <div key={part} className="fg35-meter__row">
              <span className="fg35-en" dir="ltr">{part}</span>
              <span>{role}</span>
            </div>
          ))}
        </div>
        <hr className="fg35-divider" />
        <Example35 en="She is going to travel." ar="هي تنوي السفر." />
        <Example35 en="They are going to build a robot." ar="هم ينوون بناء روبوت." />
      </Card35>
    </div>
  );
}

function AuxiliaryStep35() {
  const subjects = ["I", "You", "He", "She", "It", "We", "They"] as const;
  const aux: Record<string, string> = { I: "am", You: "are", He: "is", She: "is", It: "is", We: "are", They: "are" };
  const [subject, setSubject] = useState<string>("I");
  const sentence = `${subject} ${aux[subject]} going to read.`;
  const active = useMemo(() => subject, [subject]);
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>🔬 من المصدر · §4</>} title="هذه القاعدة ليست جديدة">
        <SourceLine35 text="هذه القاعدة ليست جديدة؛ تعلمناها في الدرس الثاني، وسنستخدمها الآن داخل تركيب جديد." />
        <Table35
          ariaLabel="اختيار am is are مع الفاعل"
          headers={["الفاعل", "الصيغة"]}
          rows={[
            { a: "I", b: "am going to" },
            { a: "You", b: "are going to" },
            { a: "He", b: "is going to" },
            { a: "She", b: "is going to" },
            { a: "It", b: "is going to" },
            { a: "We", b: "are going to" },
            { a: "They", b: "are going to" },
          ]}
        />
      </Card35>

      <Card35 tone="plan" eyebrow={<>🎛️ محدد المساعد · تفاعلي</>} title="اختر فاعلًا وشاهد الجملة">
        <div className="fg35-choices fg35-choices--inline" role="group" aria-label="اختر الفاعل">
          {subjects.map((item) => (
            <button
              key={item}
              type="button"
              className={`fg35-choice ${FOCUS_35}`}
              data-state={active === item ? "picked" : undefined}
              aria-pressed={active === item}
              onClick={() => setSubject(item)}
            >
              <span className="fg35-en" dir="ltr">{item}</span>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 9 }}>
          <Example35 en={sentence} ar={active === "I" ? "سأقرأ / أنوي القراءة." : "الجملة نفسها بفاعل مختلف؛ المساعد هو الذي تغيّر."} tone="sky" />
        </div>
        <p className="fg35-muted" aria-live="polite" style={{ marginTop: 6 }}>
          {active === "I" ? "مع I نستخدم am دائمًا." : active === "You" || active === "We" || active === "They" ? "مع You / We / They نستخدم are." : "مع He / She / It نستخدم is."}
        </p>
      </Card35>
    </div>
  );
}

function AuxiliaryExamples35() {
  const lines = [
    ["I am going to read.", "أنوي القراءة."],
    ["You are going to read.", "تنوي القراءة."],
    ["He is going to read.", "ينوي القراءة."],
    ["She is going to read.", "تنوي القراءة."],
    ["It is going to rain.", "يبدو أنها ستمطر."],
    ["We are going to read.", "ننوي القراءة."],
    ["They are going to read.", "ينوون القراءة."],
  ] as const;
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>📄 من المصدر · §4</>} title="الفعل الأساسي بعد going to لا يتغير">
        <SourceLine35 text="لاحظ أن الفعل الأساسي بعد going to لا يتغير مع الفاعل." emphasis />
        <div className="fg35-ex-grid fg35-ex-grid--two" style={{ marginTop: 8 }}>
          {lines.map(([en, ar]) => (
            <Example35 key={en} en={en} ar={ar} />
          ))}
        </div>
      </Card35>

      <Card35 tone="plain" eyebrow={<>🚨 خطأ شائع</>} title="play أم plays؟">
        <Example35 en="He is going to play." status="ok" />
        <Example35 en="He is going to plays." status="bad" note="لا نضيف s للفعل بعد going to، حتى لو كان الفاعل He." />
        <SourceLine35 text="He is going to play. ✅" ok />
        <SourceLine35 text="He is going to plays. ❌" bad />
      </Card35>
    </div>
  );
}

function V1Step35() {
  const good = ["going to study", "going to travel", "going to eat", "going to write", "going to buy", "going to have", "going to be"];
  const wrong = ["going to studied", "going to writes", "going to eating", "going to bought"];
  return (
    <div className="fg35-body">
      <Card35 tone="sun" eyebrow={<>🚨 القاعدة الذهبية الأولى · §5</>} title="بعد going to يأتي الفعل الأساسي V1">
        <SourceLine35 text="بعد going to يأتي الفعل الأساسي V1." emphasis />
        <div className="fg35-duo" style={{ marginTop: 8 }}>
          <div className="fg35-plan">
            <div className="fg35-plan__title">✅ صيغ صحيحة</div>
            <div className="fg35-stack">
              {good.map((line) => <span key={line} className="fg35-en" dir="ltr">{line}</span>)}
            </div>
          </div>
          <div className="fg35-predict">
            <div className="fg35-predict__title">❌ صيغ غير صحيحة</div>
            <div className="fg35-stack">
              {wrong.map((line) => <span key={line} className="fg35-en" dir="ltr">{line}</span>)}
            </div>
          </div>
        </div>
      </Card35>

      <Card35 tone="plain" eyebrow={<>📄 من المصدر · §5</>} title="لماذا bought خطأ؟">
        <Example35 en="She is going to buy a new dictionary." status="ok" ar="تنوي شراء قاموس جديد." />
        <Example35 en="She is going to bought a new dictionary." status="bad" />
        <SourceLine35 text="لأن bought هي V2 وV3 من buy، بينما نحتاج V1." emphasis />
        <Choice35
          question="أكمل: They are going to ______ a new website."
          options={[
            { text: "build", correct: true },
            { text: "built" },
            { text: "building" },
          ]}
          explanation="built هي V2/V3، وbuilding هي V-ing. بعد going to نستخدم V1: build."
        />
      </Card35>
    </div>
  );
}

