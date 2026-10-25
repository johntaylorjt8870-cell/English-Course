import { useId, useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import {
  AUXILIARY_ITEMS_35,
  DECISION_PRACTICE_ITEMS_35,
  DETECTIVE_ITEMS_35,
  READING_ANALYSIS_35,
  READING_ANSWERS_35,
  READING_QUESTIONS_35,
  TRANSFORMATION_ITEMS_35,
} from "./practiceData";
import {
  Card35,
  Choice35,
  Example35,
  FOCUS_35,
  Input35,
  OptionDrill35,
  PlatformInline35,
  PlatformNote35,
  PracticeItem35,
  SourceGroup35,
  SourceLine35,
} from "./kit35";

/* ----------------------------------------------------------------------------
   Stage D — PRACTISE AND REASON
   The four supplied exercises, all eight WILL/GOING TO scenarios, the
   "both forms" discussion, and the complete Science Festival reading.
---------------------------------------------------------------------------- */

export default function StageD35({ id }: { id: string }) {
  switch (id) {
    case "detective-1":
      return <Detective35 from={0} to={4} title="الجمل 1–4" />;
    case "detective-2":
      return <Detective35 from={4} to={8} title="الجمل 5–8" />;
    case "aux-1":
      return <Aux35 from={0} to={4} />;
    case "aux-2":
      return <Aux35 from={4} to={8} />;
    case "transform-1":
      return <Transform35 from={0} to={3} />;
    case "transform-2":
      return <Transform35 from={3} to={6} />;
    case "scenarios-1":
      return <Scenarios35 from={0} to={4} />;
    case "scenarios-2":
      return <Scenarios35 from={4} to={8} />;
    case "both-forms":
      return <BothForms35 />;
    case "reading-1":
      return <Reading1_35 />;
    case "reading-2":
      return <Reading2_35 />;
    case "comprehension-1":
      return <Comprehension35 from={0} to={4} />;
    case "comprehension-2":
      return <Comprehension35 from={4} to={7} />;
    case "reading-analysis":
      return <ReadingAnalysis35 />;
    default:
      return null;
  }
}

function Detective35({ from, to, title }: { from: number; to: number; title: string }) {
  const items = DETECTIVE_ITEMS_35.slice(from, to);
  return (
    <div className="fg35-body">
      <Card35 tone="predict" eyebrow={<>🕵️ Grammar Detective · </>} title={`صحّح الأخطاء · ${title}`}>
        <SourceLine35 text="صحح الأخطاء:" />
        <div className="fg35-stack" style={{ marginTop: 8 }}>
          {items.map((item) => (
            <PracticeItem35 key={item.n} n={item.n} prompt={item.prompt} answer={item.answer} explanation={item.explanation} />
          ))}
        </div>
        <PlatformInline35>
          اكتب الجملة كاملة بعد التصحيح. بعد محاولتك، اكشف الإجابة ثم اقرأ التعليل النحوي.
        </PlatformInline35>
      </Card35>
    </div>
  );
}

function Aux35({ from, to }: { from: number; to: number }) {
  const items = AUXILIARY_ITEMS_35.slice(from, to);
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>✍️ اختر AM / IS / ARE · </>} title={`أكمل الجمل · البنود ${from + 1}–${to}`}>
        <SourceLine35 text="أكمل:" />
        <div className="fg35-stack" style={{ marginTop: 8 }}>
          {items.map((item) => (
            <OptionDrill35
              key={item.n}
              n={item.n}
              prompt={<Rich text={item.prompt} />}
              options={["am", "is", "are"]}
              answer={item.answer}
              explanation={item.explanation}
            />
          ))}
        </div>
      </Card35>
    </div>
  );
}

const TRANSFORM_ACCEPT: Record<number, string[]> = {
  1: ["am going to start", "I am going to start", "I'm going to start", "I am going to start a new reading challenge", "I'm going to start a new reading challenge"],
  2: ["isn't going to sell", "is not going to sell", "He isn't going to sell", "He is not going to sell", "He isn't going to sell his old guitar", "He is not going to sell his old guitar"],
  3: ["Are you going to join", "Are you going to join the club"],
  4: ["are going to make", "The children are going to make", "The children are going to make a paper airplane"],
  5: ["aren't going to cancel", "are not going to cancel", "We aren't going to cancel", "We are not going to cancel", "We aren't going to cancel our plans", "We are not going to cancel our plans"],
  6: ["Is Sara going to study", "Is Sara going to study architecture"],
};

function Transform35({ from, to }: { from: number; to: number }) {
  const items = TRANSFORMATION_ITEMS_35.slice(from, to);
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>🧩 أكمل باستخدام GOING TO · </>} title="حوّل الأفعال بين القوسين">
        <SourceLine35 text="حوّل الأفعال بين القوسين إلى صيغة المستقبل المناسبة." />
        <div className="fg35-stack" style={{ marginTop: 8 }}>
          {items.map((item) => (
            <div className="fg35-question" key={item.n} data-practice-item={item.n}>
              <div className="fg35-q__prompt">
                <span className="fg35-q__n">{item.n}</span>
                <span className="fg35-wide"><Rich text={item.prompt} /></span>
              </div>
              <Input35
                label={`إجابة البند ${item.n}`}
                accept={TRANSFORM_ACCEPT[item.n] ?? [item.answer]}
                answer={item.answer}
                explanation={<Rich text={item.explanation} />}
                placeholder="Write the missing part (full sentence is fine)…"
                multiline
              />
            </div>
          ))}
        </div>
        <PlatformInline35>
          يمكنك كتابة الجزء الناقص فقط أو الجملة كاملة؛ كلاهما مقبول. بعد محاولتك، اكشف الصيغة ثم راجع سببها.
        </PlatformInline35>
      </Card35>
    </div>
  );
}

function Scenarios35({ from, to }: { from: number; to: number }) {
  const items = DECISION_PRACTICE_ITEMS_35.slice(from, to);
  return (
    <div className="fg35-body">
      <Card35 tone="sun" eyebrow={<>🔥 WILL أم GOING TO؟ · </>} title={`المواقف ${from + 1}–${to}`}>
        <SourceLine35 text="اختر الصيغة الأنسب بحسب الموقف." />
        <div className="fg35-stack" style={{ marginTop: 8 }}>
          {items.map((item) => (
            <ScenarioItem35 key={item.n} item={item} />
          ))}
        </div>
      </Card35>
    </div>
  );
}

function ScenarioItem35({ item }: { item: (typeof DECISION_PRACTICE_ITEMS_35)[number] }) {
  const [picked, setPicked] = useState<string | null>(null);
  const target = item.answer === "won't" ? "won't" : item.answer.includes("going to") ? "be going to" : "will";
  const ok = picked === target;
  return (
    <div className="fg35-question" data-scenario={item.n}>
      <div className="fg35-q__prompt">
        <span className="fg35-q__n">{item.n}</span>
        <span className="fg35-wide">
          {item.promptLines.map((line) => (
            <span key={line} style={{ display: "block" }}><Rich text={line} /></span>
          ))}
        </span>
      </div>
      <div className="fg35-choices fg35-choices--inline" role="group" aria-label={`الموقف ${item.n}`}>
        {["will", "be going to", "won't"].map((option) => (
          <button
            key={option}
            type="button"
            className={`fg35-choice ${FOCUS_35}`}
            data-state={picked === null ? undefined : option === target ? "correct" : picked === option ? "wrong" : "picked"}
            aria-pressed={picked === option}
            onClick={() => setPicked(option)}
          >
            <span className="fg35-en" dir="ltr">{option}</span>
          </button>
        ))}
      </div>
      {picked ? (
        <div className="fg35-feedback" data-ok={ok} role="status">
          <b>الحلول المفصلة — {ok ? "✓ صحيح. " : `✕ الأنسب هنا: ${target}. `}</b>
          <span className="fg35-en" dir="ltr">{item.answer}</span> — <Rich text={item.explanation} />
          <div className="fg35-muted" style={{ marginTop: 3 }}>
            هذا هو الاختيار النموذجي في هذا الاختبار؛ وقد تختلف الصيغة في سياق آخر بحسب ما يريد المتحدث إبرازه.
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BothForms35() {
  return (
    <div className="fg35-body">
      <Card35 tone="sky" eyebrow={<>🧠 IQ200 · </>} title="ثلاث جمل صحيحة، وثلاثة منظورات">
        <SourceGroup35
          lines={[
            "اقرأ الجملة:",
            "I think our school will organize a science festival next year.",
            "يمكن أن تكون صحيحة إذا كنت تعبّر عن توقع.",
            "لكن:",
            "Our school is going to organize a science festival next year.",
            "صحيحة أيضًا إذا كنت تتحدث عن خطة موجودة لدى المدرسة.",
            "والآن:",
            "Our school will organize a science festival next year.",
            "قد تُستخدم كذلك للإعلان عن حدث مستقبلي.",
          ]}
        />
      </Card35>

      <Card35 tone="sun" eyebrow={<>🧭 الاختيار بحسب المعنى</>} title="خمسة أسئلة تسألها لنفسك">
        <SourceGroup35 lines={["إذن اختيار الصيغة لا يعتمد فقط على الزمن الذي سيحدث فيه الفعل.", "بل يعتمد على:"]} />
        <SourceGroup35
          lines={[
            "- هل توجد خطة؟",
            "- هل نتخذ القرار الآن؟",
            "- هل نقدم وعدًا؟",
            "- هل نتوقع شيئًا؟",
            "- هل نبرز دليلًا حاضرًا؟",
            "وهنا يبدأ التفكير الحقيقي باللغة الإنجليزية.",
          ]}
        />
        <Choice35
          question="مدرسة أعلنت رسميًا عن تنظيم مهرجان. أي جملة تناسب الإعلان؟"
          options={[
            { text: "Our school will organize a science festival next year.", correct: true },
            { text: "Our school is organizing a science festival yesterday." },
            { text: "Our school going to organize a science festival next year." },
          ]}
          explanation="الإعلان الرسمي عن حدث مستقبلي يمكن أن يستخدم will. الجملة الثانية تجمع present continuous مع yesterday، والثالثة تفتقد المساعد."
        />
        <PlatformNote35>
          لا توجد إجابة واحدة صحيحة دائمًا. لو كان المتحدث يصف خطة المدرسة الداخلية لكان <En>is going to organize</En> طبيعيًا أيضًا. السؤال هو: ما الذي يريد إبرازه؟
        </PlatformNote35>
      </Card35>
    </div>
  );
}

function Reading1_35() {
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>📖 Reading Challenge · </>} title="A Big Plan for the School · الجزء الأول">
        <SourceLine35 text="اقرأ النص التالي بعناية." />
        <div className="fg35-reading">
          <h3 dir="ltr">A Big Plan for the School</h3>
          <p dir="ltr">Maya and Daniel are preparing for their school&apos;s science festival.</p>
          <p dir="ltr">They decided last week to create an interactive model of a smart city.</p>
          <p dir="ltr">Maya says:</p>
          <p dir="ltr">&quot;We&apos;re going to build small houses, roads, and traffic lights. We&apos;re also going to add solar panels to the buildings.&quot;</p>
          <p dir="ltr">Daniel looks at the materials on the table.</p>
          <p dir="ltr">&quot;Oh no! We don&apos;t have enough batteries.&quot;</p>
          <p dir="ltr">Maya replies:</p>
          <p dir="ltr">&quot;Don&apos;t worry. I&apos;ll buy some after school.&quot;</p>
        </div>
        <PlatformInline35>
          اقرأ دون توقف عند كل كلمة. المطلوب في هذه المرحلة: من؟ وماذا؟ ومتى اتُّخذ القرار؟
        </PlatformInline35>
      </Card35>
    </div>
  );
}

function Reading2_35() {
  return (
    <div className="fg35-body">
      <Card35 tone="predict" eyebrow={<>📖 Reading Challenge · </>} title="A Big Plan for the School · الجزء الثاني">
        <div className="fg35-reading">
          <p dir="ltr">Daniel looks at the weather forecast and says:</p>
          <p dir="ltr">&quot;Look! A storm is approaching. It&apos;s going to rain heavily this afternoon.&quot;</p>
          <p dir="ltr">Maya answers:</p>
          <p dir="ltr">&quot;Then we&apos;ll move our equipment inside.&quot;</p>
          <p dir="ltr">Their teacher enters the room.</p>
          <p dir="ltr">&quot;Do you think your project will impress the visitors?&quot;</p>
          <p dir="ltr">Daniel smiles.</p>
          <p dir="ltr">&quot;I hope it will!&quot;</p>
        </div>
      </Card35>

    </div>
  );
}

function ReadingQuestion35({ n, prompt, answer }: { n: number; prompt: string; answer: string }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [shown, setShown] = useState(false);
  return (
    <div className="fg35-question" data-reading-q={n}>
      <div className="fg35-q__prompt">
        <span className="fg35-q__n">{n}</span>
        <span className="fg35-en" dir="ltr">{prompt}</span>
      </div>
      <label className="fg35-sr" htmlFor={id}>إجابتك عن السؤال {n}</label>
      <textarea
        id={id}
        className="fg35-textarea"
        dir="ltr"
        rows={2}
        value={value}
        placeholder="Write your answer in English…"
        onChange={(event) => setValue(event.target.value)}
      />
      <div className="fg35-inputrow">
        <button type="button" className={`fg35-btn fg35-btn--ghost ${FOCUS_35}`} onClick={() => setShown((current) => !current)} aria-expanded={shown}>
          {shown ? "إخفاء الإجابة" : "أظهر الإجابة"}
        </button>
        <span className="fg35-muted">قارن الفكرة، لا الحروف.</span>
      </div>
      {shown ? (
        <div className="fg35-feedback" data-ok="true" role="status">
          <b>الحلول — الإجابة: </b>
          <span className="fg35-en" dir="ltr">{answer}</span>
        </div>
      ) : null}
    </div>
  );
}

function ReadingAnalysis35() {
  return (
    <div className="fg35-body">
      <Card35 tone="mint" eyebrow={<>🔬 التحليل النحوي </>} title="لماذا كل صيغة؟">
        <SourceLine35 text="التحليل النحوي" />
        <div className="fg35-stack">
          {READING_ANALYSIS_35.map((line) => (
            <SourceLine35 key={line} text={line} />
          ))}
        </div>
        <PlatformInline35>
          اقرأ التحليل بعد محاولة الإجابة، لا قبلها.
        </PlatformInline35>
      </Card35>
    </div>
  );
}

function Comprehension35({ from, to }: { from: number; to: number }) {
  const questions = READING_QUESTIONS_35.slice(from, to);
  const answers = READING_ANSWERS_35.slice(from, to);
  return (
    <div className="fg35-body">
      <Card35 tone="plan" eyebrow={<>🧠 أسئلة الفهم · </>} title={`الأسئلة ${from + 1}–${to}`}>
        <div className="fg35-stack">
          {questions.map((prompt, index) => (
            <ReadingQuestion35 key={prompt} n={from + index + 1} prompt={prompt} answer={answers[index]} />
          ))}
        </div>
      </Card35>

      <Card35 tone="sun" eyebrow={<>📌 تنبيه</>} title="لا تنسخ الجملة حرفيًا">
        <p className="fg35-prose">
          الأسئلة تطلب معلومات من النص. يمكنك الإجابة بجملة كاملة أو بعبارة قصيرة واضحة. المفتاح يظهر عند الطلب حتى تقارن فهمك.
        </p>
      </Card35>
    </div>
  );
}

