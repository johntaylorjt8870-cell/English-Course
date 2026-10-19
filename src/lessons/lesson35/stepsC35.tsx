import { useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import {
  Card35,
  Choice35,
  Example35,
  FOCUS_35,
  Formula35,
  Input35,
  PlatformInline35,
  PlatformNote35,
  SourceGroup35,
  SourceLine35,
  Table35,
} from "./kit35";

/* ----------------------------------------------------------------------------
   Stage C — TRANSFORM AND ASK
   Negatives, questions, short answers, WH/WHO, time expressions,
   going to + be, there is/are, the WILL comparison, and the two
   advanced meaning labs (decision timing & opinion vs evidence).
---------------------------------------------------------------------------- */

export default function StageC35({ id }: { id: string }) {
  switch (id) {
    case "negative":
      return <Negative35 />;
    case "negative-short":
      return <NegativeShort35 />;
    case "negative-errors":
      return <NegativeErrors35 />;
    case "yesno":
      return <YesNo35 />;
    case "short-answers":
      return <ShortAnswers35 />;
    case "question-intent":
      return <QuestionIntent35 />;
    case "wh":
      return <Wh35 />;
    case "who":
      return <Who35 />;
    case "time":
      return <Time35 />;
    case "going-to-be":
      return <GoingToBe35 />;
    case "there":
      return <There35 />;
    case "compare-table":
      return <CompareTable35 />;
    case "bakery":
      return <Bakery35 />;
    case "opinion-evidence":
      return <OpinionEvidence35 />;
    case "movement":
      return <Movement35 />;
    case "movement-practice":
      return <MovementPractice35 />;
    default:
      return null;
  }
}

function Negative35() {
  return (
    <div className="fg35-body">
      <Card35 tone="predict" eyebrow={<>🚫 من المصدر · §14</>} title="النفي — Negative Form">
        <SourceLine35 text="Subject + am/is/are + not + going to + V1" emphasis />
        <div style={{ marginTop: 8 }}>
          <Formula35
            label="Subject + am/is/are + not + going to + V1"
            parts={[
              { text: "Subject", role: "subject" },
              { text: "am/is/are", role: "aux" },
              { text: "not", role: "going", hint: "النفي" },
              { text: "going to", role: "going" },
              { text: "V1", role: "verb" },
            ]}
          />
        </div>
        <p className="fg35-muted" style={{ marginTop: 8 }}>
          not يأتي بعد المساعد مباشرة، وقبل going to. لا نضع not بعد going.
        </p>
      </Card35>

      <Card35 tone="mint" eyebrow={<>📄 من المصدر · §14</>} title="أربع جمل منفية">
        <div className="fg35-ex-grid">
          <Example35 en="I am not going to buy that jacket." ar="لا أنوي شراء تلك السترة." tone="predict" />
          <Example35 en="She is not going to participate." ar="هي لا تنوي المشاركة." tone="predict" />
          <Example35 en="We are not going to cancel the trip." ar="لا ننوي إلغاء الرحلة." tone="predict" />
          <Example35 en="They are not going to move to another city." ar="لا ينوون الانتقال إلى مدينة أخرى." tone="predict" />
        </div>
      </Card35>
    </div>
  );
}

function NegativeShort35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sun" eyebrow={<>✂️ من المصدر · §14</>} title="الاختصارات">
        <SourceGroup35
          lines={["الاختصارات:", "is not → isn't", "are not → aren't", "أما مع I فنقول عادة:", "I'm not going to..."]}
        />
        <Example35 en="I'm not going to waste my time." ar="لن أضيّع وقتي / لا أنوي تضييع وقتي." tone="predict" />
        <PlatformInline35>
          نستخدم <En>I&apos;m not</En> لا <En>I amn&apos;t</En>. أما <En>You aren&apos;t</En> و<En>She isn&apos;t</En> فاختصاران قياسيان.
        </PlatformInline35>
      </Card35>

      <Card35 tone="plain" eyebrow={<>🛠️ تحقق</>} title="اختر النفي الصحيح">
        <Choice35
          question={<><En>They ______ going to move to another city.</En></>}
          options={[
            { text: "aren't", correct: true },
            { text: "don't" },
            { text: "isn't" },
          ]}
          explanation="They جمع ← are + not → aren't. لا نستخدم don't مع going to."
        />
      </Card35>
    </div>
  );
}

function NegativeErrors35() {
  return (
    <div className="fg35-body">
      <Card35 tone="predict" eyebrow={<>🚨 من المصدر · §15</>} title="أخطاء شائعة في النفي">
        <div className="fg35-ex-grid">
          <Example35 en="He doesn't going to travel." status="bad" />
          <Example35 en="He isn't going to travel." status="ok" />
          <Example35 en="They don't going to study." status="bad" />
          <Example35 en="They aren't going to study." status="ok" />
          <Example35 en="I am going not to buy it." status="bad" note="في النفي الأساسي الذي نتعلمه هنا." />
          <Example35 en="I'm not going to buy it." status="ok" />
        </div>
        <SourceGroup35 lines={["لماذا؟", "لأن النفي يكون بإضافة not بعد am/is/are.", "لا نحتاج do أو does."]} />
      </Card35>

      <Card35 tone="sun" eyebrow={<>🕵️ تحقق · من إعداد المنصة</>} title="صحّح الجملة">
        <Input35
          label="صحح جملة النفي"
          question={<><En>He doesn&apos;t going to travel.</En></>}
          accept={["He isn't going to travel.", "He is not going to travel."]}
          answer="He isn't going to travel."
          explanation="نحذف doesn't ونضع isn't بعد He. الفعل travel يبقى V1."
        />
      </Card35>
    </div>
  );
}

function YesNo35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>❓ من المصدر · §16</>} title="نضع am/is/are قبل الفاعل">
        <SourceGroup35
          lines={[
            "الجملة المثبتة:",
            "She is going to attend the workshop.",
            "السؤال:",
            "Is she going to attend the workshop?",
            "القاعدة:",
            "Am/Is/Are + Subject + going to + V1?",
          ]}
        />
        <div style={{ marginTop: 8 }}>
          <Formula35
            label="Am/Is/Are + Subject + going to + V1?"
            parts={[
              { text: "Am/Is/Are", role: "aux" },
              { text: "Subject", role: "subject" },
              { text: "going to", role: "going" },
              { text: "V1", role: "verb" },
            ]}
          />
        </div>
      </Card35>

      <Card35 tone="mint" eyebrow={<>📄 من المصدر · §16</>} title="أربعة أسئلة">
        <div className="fg35-ex-grid">
          <Example35 en="Are you going to study tonight?" ar="هل تنوي الدراسة الليلة؟" tone="sky" />
          <Example35 en="Is he going to repair the bicycle?" ar="هل ينوي إصلاح الدراجة؟" tone="sky" />
          <Example35 en="Are they going to join the school trip?" ar="هل ينوون الانضمام إلى الرحلة المدرسية؟" tone="sky" />
          <Example35 en="Is it going to rain?" ar="هل يبدو أنها ستمطر؟" tone="sky" />
        </div>
      </Card35>
    </div>
  );
}

function ShortAnswers35() {
  return (
    <div className="fg35-body">
      <Card35 tone="plain" eyebrow={<>💬 من المصدر · §17</>} title="أعد المساعد نفسه">
        <Table35
          ariaLabel="أسئلة وإجابات قصيرة"
          headers={["السؤال", "الإجابة القصيرة"]}
          rows={[
            { a: "Are you going to study tonight?", b: "Yes, I am. / No, I'm not." },
            { a: "Is she going to attend the workshop?", b: "Yes, she is. / No, she isn't." },
            { a: "Are they going to participate?", b: "Yes, they are. / No, they aren't." },
          ]}
        />
        <SourceGroup35
          lines={[
            "لاحظ:",
            "السؤال بدأ بـ Are، ولذلك نستخدم are أو am بحسب الفاعل في الإجابة.",
            "لا تقل:",
            "Yes, I will. ❌ كإجابة قصيرة نحوية مباشرة عن سؤال يبدأ بـ Are you going to...?",
            "الصيغة المطلوبة في هذا التدريب:",
            "Yes, I am. ✅",
          ]}
        />
      </Card35>

      <Card35 tone="sun" eyebrow={<>🛠️ اكتب الإجابة</>} title="سؤال عن خطة">
        <Input35
          label="إجابة قصيرة إيجابية"
          question={<><En>Are you going to study tonight?</En> — أجب إيجابًا بإجابة قصيرة.</>}
          accept={["Yes, I am.", "Yes I am", "Yes, I am"]}
          answer="Yes, I am."
          explanation="السؤال يبدأ بـ Are you، والإجابة تستخدم am مع I. لا نستخدم will."
        />
      </Card35>
    </div>
  );
}

function QuestionIntent35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>🧩 من المصدر · §18</>} title="سؤالان، معنيان مختلفان">
        <div className="fg35-duo">
          <div className="fg35-plan" style={{ borderColor: "#c6ddf7", background: "linear-gradient(160deg,#f7fbff,#eaf3ff)" }}>
            <div className="fg35-plan__title" style={{ color: "#1c4a86" }}>Will you…?</div>
            <Example35 en="Will you help me?" ar="هل ستساعدني؟" tone="sky" />
            <SourceLine35 text="قد يكون طلبًا للمساعدة أو سؤالًا عن الاستعداد." />
          </div>
          <div className="fg35-predict">
            <div className="fg35-predict__title">Are you going to…?</div>
            <Example35 en="Are you going to help me?" ar="هل تنوي مساعدتي؟" tone="predict" />
            <SourceLine35 text="هنا نسأل عن نية الشخص أو خطته." />
          </div>
        </div>
        <hr className="fg35-divider" />
        <SourceGroup35
          lines={[
            "مثال آخر:",
            "Will you call Sara?",
            "هل ستتصل بسارة؟ / هل يمكنك الاتصال بها؟",
            "Are you going to call Sara?",
            "هل تنوي الاتصال بسارة؟",
            "الجملتان صحيحتان، لكن المعنى والسياق قد يختلفان.",
          ]}
        />
      </Card35>

      <Card35 tone="sun" eyebrow={<>🛠️ تحقق · القصد</>} title="أي سؤال يطلب خدمة الآن؟">
        <Choice35
          question="تريد أن تطلب من زميل أن يفتح النافذة الآن بأدب."
          options={[
            { text: "Will you open the window?", correct: true },
            { text: "Are you going to open the window?" },
            { text: "Do you open the window?" },
          ]}
          explanation="Will you…? مناسب لطلب/عرض. Are you going to…? يسأل عن خطة، وقد يبدو غريبًا كطلب مباشر في هذا الموقف."
        />
      </Card35>
    </div>
  );
}

function Wh35() {
  const questions = [
    ["What are you going to study?", "ماذا تنوي أن تدرس؟"],
    ["Where is she going to stay?", "أين تنوي الإقامة؟"],
    ["When are they going to leave?", "متى ينوون المغادرة؟"],
    ["Why is he going to sell his bicycle?", "لماذا ينوي بيع دراجته؟"],
    ["How are we going to solve this problem?", "كيف سنحل هذه المشكلة؟"],
    ["Who are you going to invite?", "من تنوي أن تدعو؟"],
  ] as const;
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>🔎 من المصدر · §19</>} title="Wh-word + am/is/are + Subject + going to + V1?">
        <SourceLine35 text="Wh-word + am/is/are + Subject + going to + V1?" emphasis />
        <div className="fg35-ex-grid fg35-ex-grid--two" style={{ marginTop: 8 }}>
          {questions.map(([en, ar]) => (
            <Example35 key={en} en={en} ar={ar} tone="sky" />
          ))}
        </div>
      </Card35>

      <Card35 tone="sun" eyebrow={<>🛠️ تحقق · ترتيب السؤال</>} title="أي سؤال صحيح؟">
        <Choice35
          question="تريد السؤال عن مكان إقامة she."
          options={[
            { text: "Where is she going to stay?", correct: true },
            { text: "Where she is going to stay?" },
            { text: "Where does she going to stay?" },
          ]}
          explanation="كلمة الاستفهام أولًا، ثم is، ثم she. لا نستخدم does، ولا نترك ترتيب الجملة المثبتة."
        />
      </Card35>
    </div>
  );
}

function Who35() {
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>🧠 من المصدر · §20</>} title="WHO في موقعين مختلفين">
        <div className="fg35-duo">
          <div className="fg35-plan">
            <div className="fg35-plan__title">Who = الفاعل</div>
            <Example35 en="Who is going to lead the team?" ar="من سيقود الفريق؟" />
            <SourceLine35 text="هنا Who هي الفاعل." />
          </div>
          <div className="fg35-predict">
            <div className="fg35-predict__title">Who = المفعول</div>
            <Example35 en="Who are you going to invite?" ar="من تنوي دعوته؟" tone="predict" />
            <SourceLine35 text="هنا You هو الفاعل، وWho تشير إلى الشخص الذي ستدعوه." />
          </div>
        </div>
        <SourceLine35 text="هذا الفرق مشابه لما تعلمناه سابقًا في أسئلة Who مع الأزمنة الأخرى." />
      </Card35>

      <Card35 tone="sun" eyebrow={<>🛠️ تحقق</>} title="أين Who؟">
        <Choice35
          question="في السؤال Who are you going to invite? — من الفاعل؟"
          options={[
            { text: "you", correct: true },
            { text: "who" },
            { text: "لا يوجد فاعل" },
          ]}
          explanation="you هي الفاعل الذي سيدعو، وWho مفعول الفعل invite. ولهذا جاء are مع you."
        />
      </Card35>
    </div>
  );
}

function Time35() {
  const expressions = [
    ["tomorrow", "غدًا"],
    ["tonight", "الليلة"],
    ["next week", "الأسبوع القادم"],
    ["next month", "الشهر القادم"],
    ["next summer", "الصيف القادم"],
    ["this weekend", "عطلة نهاية الأسبوع هذه"],
    ["in two days", "بعد يومين"],
    ["soon", "قريبًا"],
    ["in the future", "في المستقبل"],
  ] as const;
  return (
    <div className="fg35-body">
      <Card35 tone="sun" eyebrow={<>⏰ من المصدر · §21</>} title="تسع تعبيرات زمنية شائعة">
        <SourceLine35 text="يمكن استخدام be going to مع تعبيرات مثل:" />
        <div className="fg35-choices fg35-choices--inline" style={{ marginTop: 8 }}>
          {expressions.map(([en, ar]) => (
            <span key={en} className="fg35-fact" style={{ justifyContent: "space-between" }}>
              <b className="fg35-en" dir="ltr">{en}</b>
              <span>{ar}</span>
            </span>
          ))}
        </div>
      </Card35>

      <Card35 tone="mint" eyebrow={<>📄 من المصدر · §21</>} title="ثلاث جمل بأزمنة مختلفة">
        <div className="fg35-ex-grid">
          <Example35 en="We're going to start a new project next week." ar="سنبدأ مشروعًا جديدًا الأسبوع القادم." />
          <Example35 en="She's going to meet her cousin tomorrow." ar="ستنوي مقابلة قريبها غدًا." />
          <Example35 en="I'm going to organize my notes tonight." ar="سأنظم ملاحظاتي الليلة." />
        </div>
        <SourceGroup35
          lines={["لكن كما تعلمنا:", "وجود tomorrow أو next week لا يفرض استخدام going to.", "المعنى هو الذي يحدد الصيغة المناسبة."]}
        />
      </Card35>
    </div>
  );
}

function GoingToBe35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>🧠 من المصدر · §22</>} title="لوصف حالة مستقبلية: going to + be">
        <SourceGroup35 lines={["هذه نقطة يقع فيها كثير من الطلاب.", "عندما نريد وصف حالة مستقبلية، نستخدم:", "am/is/are + going to + be"]} />
        <div className="fg35-ex-grid fg35-ex-grid--two" style={{ marginTop: 8 }}>
          <Example35 en="I'm going to be a doctor." ar="أنوي أن أصبح طبيبًا." tone="sky" />
          <Example35 en="She is going to be very happy." ar="ستكون سعيدة جدًا." tone="sky" />
          <Example35 en="They are going to be late." ar="يبدو أنهم سيتأخرون." tone="sky" />
          <Example35 en="The test is going to be difficult." ar="يبدو أن الاختبار سيكون صعبًا." tone="sky" />
        </div>
      </Card35>

      <Card35 tone="predict" eyebrow={<>🚨 الخطأ والتصحيح</>} title="be هي الفعل الأساسي">
        <SourceGroup35 lines={["لا تقل:", "She is going to is happy. ❌", "She is going to be happy. ✅", "لأن الفعل بعد going to يجب أن يكون V1."]} />
        <Choice35
          question="أكمل: They ______ going to ______ ready soon."
          options={[
            { text: "are / be", correct: true },
            { text: "are / are" },
            { text: "is / be" },
          ]}
          explanation="They تأخذ are، والفعل الأساسي بعد going to هو be. لا نكرر are بعد going to."
        />
      </Card35>
    </div>
  );
}

function There35() {
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>🔬 من المصدر · §23</>} title="وجود شيء في المستقبل">
        <SourceGroup35
          lines={[
            "تعلمنا سابقًا استخدام:",
            "There is",
            "There are",
            "للتعبير عن وجود شيء.",
            "كيف نتحدث عن وجود شيء في المستقبل؟",
            "نستخدم:",
            "There is going to be...",
            "There are going to be...",
          ]}
        />
      </Card35>

      <Card35 tone="mint" eyebrow={<>📄 من المصدر · §23</>} title="أمثلة: إثبات، نفي، وسؤال">
        <div className="fg35-ex-grid">
          <Example35 en="There is going to be a meeting tomorrow." ar="سيكون هناك اجتماع غدًا." />
          <Example35 en="There are going to be several activities at the festival." ar="ستكون هناك عدة أنشطة في المهرجان." />
          <Example35 en="There isn't going to be enough time." ar="لن يكون هناك وقت كافٍ." tone="predict" />
          <Example35 en="Are there going to be any exams next week?" ar="هل ستكون هناك امتحانات الأسبوع القادم؟" tone="sky" />
        </div>
        <SourceLine35 text="هذه إضافة مهمة لأنها تربط الدرس 35 بالدروس السابقة بدل تعلم كل قاعدة بمعزل عن الأخرى." />
      </Card35>
    </div>
  );
}

function CompareTable35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sun" eyebrow={<>⚔️ من المصدر · §24</>} title="المقارنة الأساسية">
        <SourceLine35 text="لنضع الصيغتين جنبًا إلى جنب." />
        <Table35
          ariaLabel="مقارنة استخدامات will و be going to"
          headers={["المعنى المقصود", "الصيغة الشائعة"]}
          rows={[
            { a: "قرار يُتخذ في لحظة الكلام", b: "will" },
            { a: "نية أو خطة موجودة مسبقًا", b: "be going to" },
            { a: "وعد", b: "will" },
            { a: "عرض مساعدة لحظي", b: "will" },
            { a: "توقع مبني على رأي عام", b: "will" },
            { a: "توقع نبرز فيه دليلًا حاضرًا", b: "be going to" },
          ]}
        />
        <SourceLine35 text="هذا الجدول يوضح الاستخدامات النموذجية، وليس حدودًا صارمة تمنع التداخل." emphasis />
      </Card35>
    </div>
  );
}

function Bakery35() {
  return (
    <div className="fg35-body">
      <Card35 tone="predict" eyebrow={<>🎭 الموقف الأول · §25</>} title="قرار وُلد الآن">
        <SourceGroup35 lines={["أنت جالس مع عائلتك.", "فجأة يقول والدك:", "We don't have any bread.", "لا يوجد لدينا خبز.", "فترد فورًا:"]} />
        <Example35 en="I'll go to the bakery." ar="سأذهب إلى المخبز." tone="predict" />
        <SourceGroup35 lines={["لماذا will؟", "لأن القرار اتُّخذ الآن."]} />
      </Card35>

      <Card35 tone="plan" eyebrow={<>🎭 الموقف الثاني · §25</>} title="نية سبقت الكلام">
        <SourceGroup35 lines={["أنت قررت منذ الصباح الذهاب إلى المخبز، وأخبرت عائلتك بذلك.", "تقول:"]} />
        <Example35 en="I'm going to go to the bakery this evening." ar="أنوي الذهاب إلى المخبز هذا المساء." />
        <SourceGroup35 lines={["لماذا going to؟", "لأن النية موجودة مسبقًا.", "الفرق ليس في فعل go.", "الفرق في توقيت اتخاذ القرار والسياق."]} />
      </Card35>

      <Card35 tone="plain" eyebrow={<>🛠️ ماذا تغيّر؟</>} title="نفس الفعل، قرار مختلف">
        <Choice35
          question="والدك يكتشف فجأة أن الخبز انتهى، فتقول:"
          options={[
            { text: "I'll go to the bakery.", correct: true },
            { text: "I'm going to go to the bakery this evening, because I planned it this morning." },
            { text: "I go to the bakery." },
          ]}
          explanation="القرار لحظي، فلا تُستخدم خطة سابقة. الجملة الثانية تصف موقفًا مختلفًا (نية من الصباح)، والثالثة عادة يومية."
        />
      </Card35>
    </div>
  );
}

function OpinionEvidence35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>🔮 الموقف الأول · §26</>} title="توقع أو اعتقاد">
        <SourceGroup35 lines={["تتحدث عن مستقبل السيارات بعد عشرين عامًا.", "تقول:"]} />
        <Example35 en="I think most cars will be electric." ar="أعتقد أن معظم السيارات ستكون كهربائية." tone="sky" />
        <SourceLine35 text="هذا توقع أو اعتقاد." />
      </Card35>

      <Card35 tone="predict" eyebrow={<>🔮 الموقف الثاني · §26</>} title="دليل مرئي الآن">
        <SourceGroup35 lines={["ترى طفلًا يحمل كوبًا ممتلئًا، والكوب يميل بشدة.", "تقول:"]} />
        <Example35 en="He's going to spill the juice!" ar="سيسكب العصير!" tone="predict" />
        <SourceGroup35 lines={["لماذا؟", "لأنك تلاحظ دليلًا حاضرًا."]} />
        <PlatformInline35>
          لاحظ أن الفعل <En>spill</En> نفسه لا يحدد الصيغة. الذي يحددها هو أن المتحدث يرى سبب التوقع الآن.
        </PlatformInline35>
      </Card35>
    </div>
  );
}

function Movement35() {
  const items = [
    { en: "I am going to the library.", label: "movement" as const, why: "going هنا فعل go + ing، وto the library وجهة حركة." },
    { en: "I am going to read a book.", label: "future" as const, why: "بعد going to يأتي V1 هو read، فهي صيغة مستقبل." },
    { en: "I am going to the park.", label: "movement" as const, why: "بعد to اسم مكان (the park)، لا فعل أساسي." },
    { en: "I am going to play in the park.", label: "future" as const, why: "بعد going to فعل أساسي (play)، ثم مكان." },
  ];
  const [answers, setAnswers] = useState<Record<number, "movement" | "future">>({});
  return (
    <div className="fg35-body">
      <Card35 tone="predict" eyebrow={<>🚨 من المصدر · §27</>} title="ليست كل جملة فيها going to مستقبلًا">
        <SourceGroup35
          lines={[
            "هذه من أهم النقاط المتقدمة في الدرس.",
            "قارن:",
            "I am going to the library.",
            "أنا ذاهب إلى المكتبة.",
            "هنا going هي الفعل go بصيغة ing، وto the library تحدد وجهة الحركة.",
            "أما:",
            "I am going to read a book.",
            "أنوي قراءة كتاب.",
            "هنا:",
            "going to + V1",
            "تعبير عن المستقبل.",
          ]}
        />
      </Card35>

      <Card35 tone="plain" eyebrow={<>📐 الفرق في سطرين</>} title="انتبه إلى ما يأتي بعد to">
        <SourceGroup35
          lines={[
            "لاحظ الفرق:",
            "I am going to the park.",
            "بعد to لدينا اسم مكان.",
            "I am going to play in the park.",
            "بعد going to لدينا الفعل الأساسي play.",
            "لكن انتبه: ليست كل عبارة تحتوي على going to ثم اسم تعبيرًا عن الحركة فقط؛ السياق والتركيب هما اللذان يحددان المعنى.",
          ]}
        />
      </Card35>
    </div>
  );
}

function MovementPractice35() {
  const items = [
    { en: "I am going to the library.", label: "movement" as const, why: "going هنا فعل go + ing، وto the library وجهة حركة." },
    { en: "I am going to read a book.", label: "future" as const, why: "بعد going to يأتي V1 هو read، فهي صيغة مستقبل." },
    { en: "I am going to the park.", label: "movement" as const, why: "بعد to اسم مكان (the park)، لا فعل أساسي." },
    { en: "I am going to play in the park.", label: "future" as const, why: "بعد going to فعل أساسي (play)، ثم مكان." },
  ];
  const [answers, setAnswers] = useState<Record<number, "movement" | "future">>({});
  return (
    <div className="fg35-body">
      <Card35 tone="sun" eyebrow={<>🛠️ صنّف الجملة · تفاعلي</>} title="حركة أم نية مستقبلية؟">
        <div className="fg35-stack">
          {items.map((item, index) => {
            const picked = answers[index];
            const correct = picked === item.label;
            return (
              <div key={item.en} className="fg35-question">
                <div className="fg35-q__prompt">
                  <span className="fg35-q__n">{index + 1}</span>
                  <span className="fg35-en" dir="ltr">{item.en}</span>
                </div>
                <div className="fg35-choices fg35-choices--inline" style={{ marginTop: 6 }}>
                  {[
                    { key: "movement" as const, text: "حركة إلى مكان" },
                    { key: "future" as const, text: "نية مستقبلية" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      className={`fg35-choice ${FOCUS_35}`}
                      data-state={!picked ? undefined : option.key === item.label ? "correct" : picked === option.key ? "wrong" : "picked"}
                      aria-pressed={picked === option.key}
                      onClick={() => setAnswers((current) => ({ ...current, [index]: option.key }))}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
                {picked ? (
                  <div className="fg35-feedback" data-ok={correct} role="status">
                    <b>{correct ? "✓ صحيح. " : "↺ راجع البنية. "}</b>
                    <Rich text={item.why} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <SourceGroup35
          lines={[
            "لاحظ الفرق:",
            "I am going to the park.",
            "بعد to لدينا اسم مكان.",
            "I am going to play in the park.",
            "بعد going to لدينا الفعل الأساسي play.",
            "لكن انتبه: ليست كل عبارة تحتوي على going to ثم اسم تعبيرًا عن الحركة فقط؛ السياق والتركيب هما اللذان يحددان المعنى.",
          ]}
        />
      </Card35>
    </div>
  );
}
