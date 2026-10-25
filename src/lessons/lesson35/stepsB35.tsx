import { useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import {
  Card35,
  Choice35,
  Dialog35,
  Example35,
  Formula35,
  PlatformInline35,
  PlatformNote35,
  SourceGroup35,
  SourceLine35,
} from "./kit35";

/* ----------------------------------------------------------------------------
   Stage B — BUILD THE SENTENCE
   Affirmative forms, contractions, gonna, plans and intentions, the complete
   weekend dialogue, evidence-based predictions, and the WILL overlap nuance.
---------------------------------------------------------------------------- */

export default function StageB35({ id }: { id: string }) {
  switch (id) {
    case "affirmative":
      return <Affirmative35 />;
    case "affirmative-examples":
      return <AffirmativeExamples35 />;
    case "contractions":
      return <Contractions35 />;
    case "gonna":
      return <Gonna35 />;
    case "plans":
      return <Plans35 />;
    case "plans-more":
      return <PlansMore35 />;
    case "guarantee":
      return <Guarantee35 />;
    case "dialogue-1":
      return <Dialogue1_35 />;
    case "dialogue-2":
      return <Dialogue2_35 />;
    case "dialogue-analysis":
      return <DialogueAnalysis35 />;
    case "evidence-intro":
      return <EvidenceIntro35 />;
    case "evidence-cards":
      return <EvidenceCards35 />;
    case "evidence-practice":
      return <EvidencePractice35 />;
    case "will-not-wrong":
      return <WillNotWrong35 />;
    default:
      return null;
  }
}

function Affirmative35() {
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>🏗️ </>} title="الجملة المثبتة — Affirmative">
        <SourceLine35 text="Subject + am/is/are + going to + V1 + Rest" emphasis />
        <div style={{ marginTop: 8 }}>
          <Formula35
            label="Subject + am/is/are + going to + V1 + Rest"
            parts={[
              { text: "Subject", role: "subject" },
              { text: "am/is/are", role: "aux" },
              { text: "going to", role: "going" },
              { text: "V1", role: "verb" },
              { text: "Rest", role: "rest", hint: "بقية الجملة" },
            ]}
          />
        </div>
        <PlatformInline35>
          <b>Rest</b> تعني بقية الجملة: المكان، أو الوقت، أو المفعول. ليست جزءًا ثابتًا من الصيغة، وقد تُحذف إذا كان المعنى واضحًا: <En>I&apos;m going to study.</En>
        </PlatformInline35>
      </Card35>

      <Card35 tone="mint" eyebrow={<>📄 </>} title="مثال كامل">
        <Example35 en="I am going to organize my desk this evening." ar="سأنظم مكتبي هذا المساء." />
        <div className="fg35-meter" style={{ marginTop: 8 }}>
          <div className="fg35-meter__row"><span><En>I</En> · الفاعل</span><span className="fg35-meter__state">Subject</span></div>
          <div className="fg35-meter__row"><span><En>am</En> · المساعد</span><span className="fg35-meter__state">am/is/are</span></div>
          <div className="fg35-meter__row"><span><En>going to</En> · الصيغة</span><span className="fg35-meter__state">going to</span></div>
          <div className="fg35-meter__row"><span><En>organize</En> · فعل أساسي</span><span className="fg35-meter__state">V1</span></div>
          <div className="fg35-meter__row"><span><En>my desk this evening</En> · بقية الجملة</span><span className="fg35-meter__state">Rest</span></div>
        </div>
      </Card35>
    </div>
  );
}

function AffirmativeExamples35() {
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>📄 </>} title="أربع جمل مثبتة أخرى">
        <SourceLine35 text="أمثلة جديدة:" />
        <div className="fg35-ex-grid">
          <Example35 en="He is going to learn how to cook." ar="ينوي تعلم الطبخ." />
          <Example35 en="We are going to visit the science exhibition next Saturday." ar="ننوي زيارة المعرض العلمي السبت القادم." />
          <Example35 en="My sister is going to start a photography course." ar="تنوي أختي البدء بدورة في التصوير الفوتوغرافي." />
          <Example35 en="The students are going to create a school magazine." ar="ينوي الطلاب إنشاء مجلة مدرسية." />
        </div>
      </Card35>

      <Card35 tone="sun" eyebrow={<>🛠️ تحقق · من إعداد المنصة</>} title="اختر المساعد الصحيح">
        <Choice35
          question={<><En>The students ______ going to create a school magazine.</En></>}
          options={[
            { text: "are", correct: true },
            { text: "is" },
            { text: "am" },
          ]}
          explanation="The students جمع، لذلك are. لاحظ أن create بقيت V1."
        />
        <hr className="fg35-divider" />
        <Choice35
          question={<><En>My sister ______ going to start a photography course.</En></>}
          options={[
            { text: "is", correct: true },
            { text: "are" },
            { text: "am" },
          ]}
          explanation="My sister مفرد غائب، لذلك is. والكلمة الأساسية بعد going to هي start لا starts."
        />
      </Card35>
    </div>
  );
}

function Contractions35() {
  const pairs = [
    ["I am going to", "I'm going to"],
    ["You are going to", "You're going to"],
    ["He is going to", "He's going to"],
    ["She is going to", "She's going to"],
    ["We are going to", "We're going to"],
    ["They are going to", "They're going to"],
  ] as const;
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>🗣️ </>} title="ستة اختصارات">
        <SourceLine35 text="يمكن اختصار am / is / are مع الفاعل." />
        <div className="fg35-ex-grid fg35-ex-grid--two" style={{ marginTop: 8 }}>
          {pairs.map(([full, short]) => (
            <div key={full} className="fg35-ex">
              <span className="fg35-en" dir="ltr">{full} → {short}</span>
            </div>
          ))}
        </div>
      </Card35>

      <Card35 tone="mint" eyebrow={<>📄 </>} title="أمثلة في المحادثة">
        <div className="fg35-ex-grid fg35-ex-grid--two">
          <Example35 en="I'm going to call my cousin." />
          <Example35 en="She's going to prepare dinner." />
          <Example35 en="We're going to watch a documentary." />
          <Example35 en="They're going to plant some trees." />
        </div>
        <PlatformInline35>
          الاختصار مطلوب في الكلام الطبيعي، لكن الصيغة الكاملة تبقى صحيحة especially في الكتابة الرسمية.
        </PlatformInline35>
      </Card35>

      <Card35 tone="sun" eyebrow={<>🛠️ تحقق سريع</>} title="أي اختصار صحيح؟">
        <Choice35
          question="كيف نختصر They are going to…؟"
          options={[
            { text: "They're going to…", correct: true },
            { text: "Their going to…" },
            { text: "They's going to…" },
          ]}
          explanation="الاختصار يستبدل are بـ 're: They're. أما Their فهي ملكية، وThey's غير موجودة."
        />
      </Card35>
    </div>
  );
}

function Gonna35() {
  return (
    <div className="fg35-body">
      <Card35 tone="predict" eyebrow={<>🔊 gonna · </>} title="كلمة تسمعها كثيرًا">
        <SourceGroup35
          lines={[
            "ملاحظة لغوية:",
            "قد تسمع في المحادثات غير الرسمية كلمة gonna بدل going to عندما تأتي قبل الفعل.",
            "I'm gonna study.",
            "لكننا في الدروس والكتابة المدرسية سنعتمد الصيغة القياسية:",
            "I'm going to study.",
            "ولا نستخدم gonna في الكتابة الرسمية أو الاختبارات النحوية.",
          ]}
        />
        <PlatformNote35>
          <b>gonna</b> ليست كلمة مستقلة في الكتابة القياسية؛ هي تمثيل لفظي لـ going to. افهمها عند السماع، واستخدم going to في الاختبار والمقال.
        </PlatformNote35>
      </Card35>

      <Card35 tone="plain" eyebrow={<>🛠️ تحقق · السجل اللغوي</>} title="أي جملة تناسب اختبارًا نحويًا؟">
        <Choice35
          question="اختر الصياغة المناسبة في ورقة اختبار."
          options={[
            { text: "I'm going to study tonight.", correct: true },
            { text: "I'm gonna study tonight." },
            { text: "I gonna study tonight." },
          ]}
          explanation="الصيغة القياسية هي going to. الثانية مسموعة في الكلام غير الرسمي، والثالثة تسقط to وتُعدّ غير قياسية حتى في الكلام."
        />
      </Card35>
    </div>
  );
}

function Plans35() {
  const [step, setStep] = useState(1);
  const stops = [
    { label: "منذ أسبوع", body: "ليلى قررت أن تنضم إلى نادي الرسم." },
    { label: "التحضير", body: "جهّزت أدواتها وسجّلت اسمها." },
    { label: "لحظة الكلام", body: "I'm going to join an art club next month." },
  ];
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>🎯 الاستخدام الأول · </>} title="خطة اتُّخذ قرارها مسبقًا">
        <SourceGroup35
          lines={[
            "نستخدم be going to عندما نتحدث عن خطة مستقبلية اتخذنا قرارها مسبقًا.",
            "تخيل الموقف التالي:",
            "ليلى قررت منذ أسبوع أن تنضم إلى نادي الرسم.",
            "جهزت أدواتها وسجلت اسمها.",
          ]}
        />
        <div className="fg35-timeline" style={{ marginTop: 9 }}>
          {stops.map((stop, index) => (
            <button
              key={stop.label}
              type="button"
              className="fg35-timeline__stop"
              style={{ textAlign: "right", cursor: "pointer", borderColor: step === index + 1 ? "#0f8f7d" : undefined, background: step === index + 1 ? "#ecfbf3" : "#fff" }}
              aria-pressed={step === index + 1}
              onClick={() => setStep(index + 1)}
            >
              <div className="fg35-timeline__when">{stop.label}</div>
              <div className="fg35-timeline__what"><Rich text={stop.body} /></div>
            </button>
          ))}
        </div>
        <p className="fg35-muted" aria-live="polite">اضغط أي محطة لمراجعتها. الخطوة {step} من 3.</p>
      </Card35>

      <Card35 tone="mint" eyebrow={<>📄 </>} title="ما تقوله ليلى">
        <SourceLine35 text="تقول:" />
        <Example35 en="I'm going to join an art club next month." ar="سأنضم إلى نادي للرسم الشهر القادم." tone="predict" />
        <SourceGroup35
          lines={["هذا ليس قرارًا لحظيًا.", "بل خطة موجودة قبل الحديث."]}
        />
        <Choice35
          question="أي عبارة من الجملة السابقة تدل على أن الخطة قديمة؟"
          options={[
            { text: "She decided a week ago and already registered.", correct: true },
            { text: "She says next month." },
            { text: "She uses I'm." },
          ]}
          explanation="next month تحدد الزمن فقط، ولا تدل على تاريخ القرار. الدلالة تأتي من السياق: قرار سابق وتسجيل سابق."
        />
      </Card35>
    </div>
  );
}

function PlansMore35() {
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>📄 </>} title="أربع خطط أخرى">
        <SourceLine35 text="أمثلة أخرى:" />
        <div className="fg35-ex-grid">
          <Example35 en="We are going to renovate our kitchen." ar="نخطط لتجديد مطبخنا." />
          <Example35 en="He is going to take a driving course." ar="ينوي الالتحاق بدورة لتعلم القيادة." />
          <Example35 en="They are going to organize a charity event." ar="يخططون لتنظيم فعالية خيرية." />
          <Example35 en="I am going to improve my pronunciation." ar="أنوي تحسين لفظي باللغة الإنجليزية." />
        </div>
      </Card35>

      <Card35 tone="sun" eyebrow={<>🛠️ تحقق · معنى الفعل</>} title="ماذا تعني هذه الخطط؟">
        <Choice35
          question={<><En>They are going to organize a charity event.</En> — ما المعنى الأقرب؟</>}
          options={[
            { text: "لديهم خطة لتنظيم فعالية خيرية.", correct: true },
            { text: "قرروا الآن، أثناء الحديث، تنظيم الفعالية." },
            { text: "يتوقعون أن ينظّم شخص آخر فعالية." },
          ]}
          explanation="organize هنا فعل أساسي بعد going to، والجملة تصف خطة قائمة. لو كان القرار لحظيًا لكان will هو الأنسب."
        />
      </Card35>
    </div>
  );
}

function Guarantee35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sun" eyebrow={<>🧠 </>} title="لا، ليست ضمانًا مطلقًا">
        <SourceGroup35
          lines={[
            "لا.",
            "وهذه نقطة مهمة جدًا.",
            "Be going to تعبّر عن النية أو الخطة، لكنها لا تضمن أن الحدث سيقع حتمًا.",
            "مثال:",
            "I'm going to start exercising next week.",
            "أنوي البدء بممارسة الرياضة الأسبوع القادم.",
            "قد تحدث ظروف تمنع تنفيذ الخطة.",
            "إذن:",
            "نية أو خطة ≠ ضمان مطلق بحدوث الشيء.",
            "وكذلك لا يشترط أن تكون الخطة مفصلة بالدقيقة والساعة.",
            "يكفي أن يكون المتحدث قد كوّن نية مسبقة.",
          ]}
        />
      </Card35>

      <Card35 tone="plain" eyebrow={<>🛠️ تحقق في المعنى</>} title="أي استنتاج صحيح؟">
        <Choice35
          question={<><En>I&apos;m going to start exercising next week.</En> — ماذا تعني الجملة بدقة؟</>}
          options={[
            { text: "لديّ نية، لكنها قد تتغير إذا حدثت ظروف.", correct: true },
            { text: "سأمارس الرياضة حتمًا، ولا يمكن أن يتغير شيء." },
            { text: "أمارس الرياضة الآن." },
          ]}
          explanation="النية ليست عقدًا. الجملة تصف خطة موجودة، لكنها لا تضمن التنفيذ، ولا تشترط تفصيلًا دقيقًا للخطة."
        />
      </Card35>
    </div>
  );
}

function Dialogue1_35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>🎭 </>} title="Weekend Plans · الافتتاح">
        <SourceLine35 text="اقرأ الحوار:" />
        <Dialog35
          turns={[
            { who: "Nora", en: "What are you going to do this weekend?", ar: "ماذا تنوي أن تفعل في عطلة نهاية الأسبوع؟" },
            { who: "Adam", en: "I'm going to visit my grandparents.", ar: "سأزور جدّي وجدّتي." },
            { who: "Nora", en: "That sounds nice! Are you going to stay there all weekend?", ar: "جميل! هل ستبقى عندهما طوال عطلة نهاية الأسبوع؟" },
          ]}
        />
      </Card35>

      <Card35 tone="sun" eyebrow={<>🛠️ تحقق · وظيفة السؤال</>} title="ماذا تطلب نورا في سؤالها الثاني؟">
        <Choice35
          question={<><En>Are you going to stay there all weekend?</En></>}
          options={[
            { text: "تسأل عن خطة موجودة: هل تنوي البقاء؟", correct: true },
            { text: "تطلب من آدم البقاء." },
            { text: "تتوقع أن يبقى بناءً على دليل تراه." },
          ]}
          explanation="السؤال عن نية/ترتيب. ليست طلبًا (Will you…?) وليست توقعًا مبنيًا على دليل."
        />
      </Card35>
    </div>
  );
}

function Dialogue2_35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>🎭 </>} title="Weekend Plans · النهاية">
        <SourceLine35 text="الترجمة:" />
        <Dialog35
          turns={[
            { who: "Adam", en: "No, I'm not. I'm going to return on Saturday evening.", ar: "لا. سأعود مساء السبت." },
            { who: "Nora", en: "What about Sunday?", ar: "وماذا عن الأحد؟" },
            { who: "Adam", en: "I'm going to prepare for my science exam.", ar: "سأستعد لامتحان العلوم." },
          ]}
        />
        <PlatformNote35>
          لاحظ النفي القصير <En>No, I&apos;m not.</En> — لا نقول <En>No, I don&apos;t.</En> ولا <En>No, I won&apos;t.</En> في هذا التدريب.
        </PlatformNote35>
      </Card35>

      <Card35 tone="plain" eyebrow={<>🛠️ تحقق · الإجابة القصيرة</>} title="أكمل الرد المنفي">
        <Choice35
          question={<><En>Are you going to stay there all weekend?</En> — ما الرد المنفي الصحيح؟</>}
          options={[
            { text: "No, I'm not.", correct: true },
            { text: "No, I don't." },
            { text: "No, I won't." },
          ]}
          explanation="السؤال بدأ بـ Are you…؟ فالجواب المنفي هو I'm not. السؤال ليس بـ Do، ولا يطلب will."
        />
      </Card35>
    </div>
  );
}

function DialogueAnalysis35() {
  const rows = [
    ["I'm going to visit...", "خطة مسبقة."],
    ["Are you going to stay...?", "سؤال عن خطة مستقبلية."],
    ["I'm going to return...", "نية أو ترتيب ضمن الخطة."],
    ["I'm going to prepare...", "نشاط يعتزم القيام به."],
  ] as const;
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>🧩  · التحليل</>} title="كل جملة لها وظيفة">
        <div className="fg35-stack">
          {rows.map(([en, ar]) => (
            <div className="fg35-meter__row" key={en} style={{ alignItems: "flex-start" }}>
              <span className="fg35-en" dir="ltr" style={{ fontSize: "0.9rem" }}>{en}</span>
              <span style={{ fontWeight: 800 }}><Rich text={ar} /></span>
            </div>
          ))}
        </div>
      </Card35>

      <Card35 tone="mint" eyebrow={<>🗣️ نسخة كاملة للمراجعة</>} title="الحوار كاملًا في مكان واحد">
        <Dialog35
          turns={[
            { who: "Nora", en: "What are you going to do this weekend?", ar: "ماذا تنوي أن تفعل في عطلة نهاية الأسبوع؟" },
            { who: "Adam", en: "I'm going to visit my grandparents.", ar: "سأزور جدّي وجدّتي." },
            { who: "Nora", en: "That sounds nice! Are you going to stay there all weekend?", ar: "جميل! هل ستبقى عندهما طوال عطلة نهاية الأسبوع؟" },
            { who: "Adam", en: "No, I'm not. I'm going to return on Saturday evening.", ar: "لا. سأعود مساء السبت." },
            { who: "Nora", en: "What about Sunday?", ar: "وماذا عن الأحد؟" },
            { who: "Adam", en: "I'm going to prepare for my science exam.", ar: "سأستعد لامتحان العلوم." },
          ]}
        />
        <PlatformNote35>
          هذه إعادة عرض كاملة للحوار بعد تحليله، حتى تراجعه كوحدة واحدة قبل قراءة الدرس التالي. لا تحتوي أي محتوى جديد.
        </PlatformNote35>
      </Card35>
    </div>
  );
}

function EvidenceIntro35() {
  return (
    <div className="fg35-body">
      <Card35 tone="predict" eyebrow={<>⚡ الاستخدام الثاني · </>} title="Predictions Based on Present Evidence">
        <SourceGroup35
          lines={[
            "هذا الاستخدام مهم جدًا، وهو ما يجعل be going to أكثر من مجرد أداة للتعبير عن الخطط.",
            "تخيل أنك تنظر من النافذة.",
            "ترى غيومًا سوداء كثيفة، والرياح تشتد.",
            "تقول:",
          ]}
        />
        <Example35 en="Look at those clouds! It's going to rain." ar="انظر إلى تلك الغيوم! يبدو أنها ستمطر." tone="predict" />
        <SourceGroup35 lines={["لماذا استخدمنا going to؟", "لأن توقعنا مبني على دليل نلاحظه الآن."]} />
      </Card35>

      <Card35 tone="sun" eyebrow={<>🔎 دليل ← توقع</>} title="مثال ثانٍ: الطفل والجفرة">
        <SourceGroup35
          lines={["مثال آخر:", "طفل يركض بسرعة نحو حفرة ولا ينظر أمامه.", "تقول:"]}
        />
        <Example35 en="Watch out! He's going to fall!" ar="انتبه! سيسقط!" tone="predict" />
        <SourceLine35 text="لدينا دليل واضح أمامنا يجعلنا نتوقع ما سيحدث." />
        <PlatformInline35>
          السؤال المفيد: <b>ما الذي أراه الآن؟</b> إذا كان الجواب دليلًا مرئيًا، فـ BE GOING TO تعبير طبيعي عن التوقع.
        </PlatformInline35>
      </Card35>
    </div>
  );
}

function EvidenceCards35() {
  const cards = [
    {
      evidenceEn: "The glass is near the edge of the table.",
      evidenceAr: "الكأس قريب من حافة الطاولة.",
      predEn: "It's going to fall!",
      predAr: "سيسقط!",
    },
    {
      evidenceEn: "The sky is getting darker.",
      evidenceAr: "السماء تصبح أكثر ظلمة.",
      predEn: "There's going to be a storm.",
      predAr: "يبدو أن عاصفة ستحدث.",
    },
    {
      evidenceEn: "The team is playing extremely well.",
      evidenceAr: "الفريق يلعب بصورة ممتازة.",
      predEn: "They're going to win!",
      predAr: "يبدو أنهم سيفوزون!",
    },
    {
      evidenceEn: "The boy isn't looking where he's walking.",
      evidenceAr: "الصبي لا ينظر إلى المكان الذي يمشي فيه.",
      predEn: "He's going to hit the door!",
      predAr: "سيصطدم بالباب!",
    },
  ];
  return (
    <div className="fg35-body">
      <Card35 tone="predict" eyebrow={<>🔍 </>} title="أربعة أدلة الآن، وأربعة توقعات">
        <div className="fg35-evidence">
          {cards.map((card, index) => (
            <div className="fg35-evidence__card" key={card.evidenceEn}>
              <span className="fg35-evidence__tag">دليل {index + 1}</span>
              <span className="fg35-en" dir="ltr" style={{ marginTop: 4 }}>{["①", "②", "③", "④"][index]} {card.evidenceEn}</span>
              <span className="fg35-ar">{card.evidenceAr}</span>
              <hr className="fg35-divider" />
              <span className="fg35-en" dir="ltr" style={{ color: "#9c3c2c" }}>{card.predEn}</span>
              <span className="fg35-ar">{card.predAr}</span>
            </div>
          ))}
        </div>
      </Card35>
    </div>
  );
}

function EvidencePractice35() {
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>🧠 الفكرة المشتركة · </>} title="نلاحظ دليلًا الآن ← نتوقع نتيجة مستقبلية">
        <SourceGroup35 lines={["الفكرة المشتركة:", "نلاحظ دليلًا الآن ← نتوقع نتيجة مستقبلية."]} offset={16} />
      </Card35>

      <Card35 tone="plain" eyebrow={<>🛠️ مختبر قصير · من إعداد المنصة</>} title="ماذا يقول الدليل؟">
        <Choice35
          question="ترى طفلًا يركض على أرضية مبللة. ما التوقع المناسب؟"
          options={[
            { text: "He's going to slip!", correct: true },
            { text: "He slips every day." },
            { text: "I think he slips tomorrow." },
          ]}
          explanation="الدليل مرئي الآن (أرضية مبللة وطفل يركض)، لذلك التوقع بـ going to طبيعي. الجملة الثانية مضارع عادة، والثالثة تركيب غير صحيح."
        />
        <hr className="fg35-divider" />
        <Choice35
          question="السماء صافية تمامًا، وتقول: «سأشتري مظلة الشهر القادم». أي جملة تعبّر عن نية؟"
          options={[
            { text: "I'm going to buy an umbrella next month.", correct: true },
            { text: "It's going to rain next month." },
            { text: "It rains next month." },
          ]}
          explanation="شراء المظلة نية شخصية، لا توقع مبني على دليل. الجملة الثانية توقع بلا دليل حاضر، والثالثة مضارع عادة."
        />
      </Card35>
    </div>
  );
}

function WillNotWrong35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>🧠 </>} title="لا، التوقع بـ WILL ليس خطأ">
        <SourceGroup35
          lines={[
            "لا.",
            "قارن:",
            "I think it will rain tomorrow.",
            "أعتقد أنها ستمطر غدًا.",
            "قد يكون هذا رأيًا أو توقعًا عامًا.",
            "أما:",
            "Look at those dark clouds! It's going to rain.",
            "انظر إلى تلك الغيوم الداكنة! يبدو أنها ستمطر.",
            "هنا نبرز دليلًا حاضرًا.",
          ]}
        />
      </Card35>

      <Card35 tone="sun" eyebrow={<>⚖️ الحد الفاصل الناعم</>} title="قاعدة مفيدة، وليست قانونًا يمنع">
        <SourceGroup35
          lines={[
            "لكن انتبه:",
            "هذا الفرق مفيد جدًا في التعلم، وليس قانونًا يمنع استخدام will عندما يوجد دليل.",
            "في اللغة الطبيعية قد تتداخل الصيغتان، ويتغير الاختيار بحسب السياق وما يريد المتحدث إبرازَه.",
          ]}
        />
        <PlatformNote35>
          في الاختبارات، اختر الصيغة الأكثر نموذجية للسياق. في الحياة، تذكّر أن المتحدث قد يختار <En>will</En> حتى مع وجود دليل إذا أراد إبراز الاعتقاد بدل الإشارة إلى ما يراه.
        </PlatformNote35>
      </Card35>
    </div>
  );
}

