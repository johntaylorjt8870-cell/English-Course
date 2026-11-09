import { useState, type ReactNode } from "react";
import {
  BACKSHIFT_TABLE_60,
  ERRORS_60,
  REPORTED_60,
  TENSE_LESSONS_60,
  TOLD_60,
  type Change60,
  type ShiftPair60,
  type Line60,
} from "./content60";
import type { PracticeGroup60 } from "./practice60";
import {
  Attempt60,
  Btn60,
  ChoiceList60,
  En60,
  Mixed60,
  ShiftChip60,
  TransferPair60,
} from "./kit60";

/* ============================================================
   Lesson 60 — المختبرات التفاعلية
   كل مختبر مرتبط مباشرة بما يتعلمه الطالب في المحطات،
   وتُدار الحلول داخليًا: لا كشف قبل محاولة الطالب.
   ============================================================ */

function LabShell({
  id,
  kicker,
  title,
  lead,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <section className="l60-lab" data-l60-lab={id}>
      <header className="l60-lab-head">
        <div className="l60-kicker">
          <span>LAB</span>
          {kicker}
        </div>
        <h2>{title}</h2>
        <p>{lead}</p>
      </header>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------
   1) Direct vs Reported Speech Explorer
   ------------------------------------------------------------ */

type ExplorerItem = {
  pair: ShiftPair60;
  whoDirect: string;
  whoReported: string;
  question: string;
  options: string[];
  answer: string;
  why: string;
};

const EXPLORER_ITEMS: ExplorerItem[] = [
  {
    pair: REPORTED_60.pairs[0],
    whoDirect: "أحمد يتحدث",
    whoReported: "نحن ننقل",
    question: "ما نوع التغيير الذي طرأ على am؟",
    options: ["الزمن: مضارع → ماضٍ", "الضمير تغيّر", "كلمة زمان تغيّرت"],
    answer: "الزمن: مضارع → ماضٍ",
    why: "am → was: رجع الزمن خطوة إلى الماضي بعد said (Backshift).",
  },
  {
    pair: TENSE_LESSONS_60[2].examples[0],
    whoDirect: "علي يتحدث",
    whoReported: "نحن ننقل",
    question: "have finished تحوّلت إلى…؟",
    options: ["had finished", "was finishing", "finished"],
    answer: "had finished",
    why: "المضارع التام يرجع إلى الماضي التام: have/has + V3 ← had + V3.",
  },
  {
    pair: TENSE_LESSONS_60[5].examples[0],
    whoDirect: "هو يتحدث إليّ",
    whoReported: "أنا أنقل",
    question: "لماذا أصبحت you هي me؟",
    options: ["لأن المخاطَب في الأصل هو الراوي نفسه", "تحويل آلي دائم", "خطأ مطبعي"],
    answer: "لأن المخاطَب في الأصل هو الراوي نفسه",
    why: "الضمائر تتبع الأشخاص: هو خاطبَني، فعندما أنقل أنا كلامه تصبح you ← me.",
  },
  {
    pair: TENSE_LESSONS_60[5].examples[1],
    whoDirect: "سارة تتحدث",
    whoReported: "ننقل في اليوم التالي",
    question: "ما التغييران اللذان حدثا هنا؟",
    options: ["will → would وtomorrow → the following day", "الزمن فقط", "المكان فقط"],
    answer: "will → would وtomorrow → the following day",
    why: "فعل مستقبل يرجع خطوة، وكلمة الزمان تتبع يوم النقل الجديد.",
  },
  {
    pair: TENSE_LESSONS_60[4].examples[0],
    whoDirect: "هو يتحدث",
    whoReported: "نحن ننقل",
    question: "was working صارت…؟",
    options: ["had been working", "had worked", "was worked"],
    answer: "had been working",
    why: "الماضي المستمر يرجع إلى الماضي التام المستمر مع الحفاظ على معنى الاستمرار.",
  },
  {
    pair: REPORTED_60.pairs[2],
    whoDirect: "علي يتحدث",
    whoReported: "نحن ننقل",
    question: "ما الذي اختفى من الجملة عند النقل؟",
    options: ["علامتا الاقتباس", "اسم المدينة", "الفعل said"],
    answer: "علامتا الاقتباس",
    why: "في الكلام المنقول نزيل الاقتباس الحرفي ونضيف that الاختيارية.",
  },
];

export function SpeechExplorer60() {
  const [pick, setPick] = useState(0);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const item = EXPLORER_ITEMS[pick];
  const right = value === item.answer;
  return (
    <LabShell
      id="explorer"
      kicker="SPEECH EXPLORER"
      title="مستكشف الكلام المباشر والمنقول"
      lead="اختر رسالة من الاستوديو، وشاهدها وهي تعبر من فم المتحدث إلى قلم الراوي — ثم جاوب عن «ماذا حدث في الطريق؟»."
    >
      <div className="l60-explorer-nav" role="tablist" aria-label="رسائل المستكشف">
        {EXPLORER_ITEMS.map((entry, i) => (
          <button
            key={entry.pair.direct}
            type="button"
            role="tab"
            aria-pressed={i === pick}
            onClick={() => {
              setPick(i);
              setValue("");
              setChecked(false);
            }}
          >
            الرسالة {i + 1}
          </button>
        ))}
      </div>
      <div className="l60-explorer-out">
        <TransferPair60 pair={item.pair} whoDirect={item.whoDirect} whoReported={item.whoReported} />
      </div>
      <div className="l60-decision" style={{ marginTop: "0.9rem" }}>
        <small>{item.question}</small>
        <ChoiceList60 options={item.options} value={value} ariaLabel="سؤال المستكشف" onPick={(v) => { setValue(v); setChecked(false); }} />
        <div className="l60-actions">
          <Btn60 onClick={() => setChecked(true)} disabled={!value}>
            تحقّق
          </Btn60>
        </div>
        {checked && (
          <div className={`l60-lab-result ${right ? "is-right" : "is-wrong"}`} role="status">
            <b>{right ? "✓ صحيح" : "✕ راجع الفقاعات في الأعلى"}</b>
            <span>{item.why}</span>
          </div>
        )}
      </div>
    </LabShell>
  );
}

/* ------------------------------------------------------------
   2) Speech Transformation Studio — قرارات متسلسلة بلا كشف مبكر
   ------------------------------------------------------------ */

type StudioDecision = { key: string; label: string; options: string[]; answer: string; why: string };
type StudioSentence = {
  id: string;
  direct: string;
  directAr: string;
  decisions: StudioDecision[];
  result: string;
  resultAr: string;
  changes: Change60[];
};

const STUDIO_60: StudioSentence[] = [
  {
    id: "ahmed-en",
    direct: 'Ahmed said to me, "I am studying English here today."',
    directAr: "قال أحمد لي: «أنا أدرس الإنجليزية هنا اليوم».",
    decisions: [
      {
        key: "verb",
        label: "① فعل النقل: said to me — ما مقابله الأنسب مع ذكر الشخص؟",
        options: ["told me that", "said me that", "said that to me"],
        answer: "told me that",
        why: "مع ذكر الشخص نستخدم told + الشخص؛ said me تركيب مكسور.",
      },
      {
        key: "pron",
        label: "② الضمير I — إلى ماذا يتحول؟",
        options: ["he", "I", "they"],
        answer: "he",
        why: "المتحدث أحمد (مفرد مذكر)، فتصبح I ← he.",
      },
      {
        key: "tense",
        label: "③ الزمن: am studying — الزمن في الكلام المنقول؟",
        options: ["was studying", "is studying", "had studied"],
        answer: "was studying",
        why: "المضارع المستمر يرجع خطوة واحدة إلى الماضي المستمر.",
      },
      {
        key: "place",
        label: "④ المكان: here — إذا كان الراوي في مكان آخر؟",
        options: ["there", "here", "everywhere"],
        answer: "there",
        why: "here ← there عندما يتغير المكان بين الكلام والنقل.",
      },
      {
        key: "time",
        label: "⑤ الزمان: today — إذا كان النقل في يوم آخر؟",
        options: ["that day", "today", "the next day"],
        answer: "that day",
        why: "today ← that day بحسب جدول كلمات الزمان.",
      },
    ],
    result: "Ahmed told me that he was studying English there that day.",
    resultAr: "أخبرني أحمد بأنه كان يدرس الإنجليزية هناك في ذلك اليوم.",
    changes: [
      { from: "said to me", to: "told me", kind: "verb" },
      { from: "I", to: "he", kind: "pronoun" },
      { from: "am studying", to: "was studying", kind: "tense" },
      { from: "here", to: "there", kind: "place" },
      { from: "today", to: "that day", kind: "time" },
    ],
  },
  {
    id: "sara-ali",
    direct: 'Sara said to Ali, "You are my best friend."',
    directAr: "قالت سارة لعلي: «أنت أفضل أصدقائي».",
    decisions: [
      {
        key: "verb",
        label: "① فعل النقل: said to Ali —",
        options: ["told Ali that", "said Ali that", "told that"],
        answer: "told Ali that",
        why: "told + الشخص + that؛ وsaid Ali بدون to خطأ.",
      },
      {
        key: "pron",
        label: "② الضمير You — المخاطَب هو علي، والراوي طرف ثالث:",
        options: ["he", "you", "I"],
        answer: "he",
        why: "يتحدث الراوي عن علي بضمير الغائب he.",
      },
      {
        key: "poss",
        label: "③ الملكية: my — تشير إلى المتحدثة سارة:",
        options: ["her", "my", "his"],
        answer: "her",
        why: "my تعود على سارة، فتصبح her.",
      },
      {
        key: "tense",
        label: "④ الزمن: are —",
        options: ["were", "are", "had been"],
        answer: "were",
        why: "are ← were بعد فعل نقل ماضٍ.",
      },
    ],
    result: "Sara told Ali that he was her best friend.",
    resultAr: "أخبرت سارة عليًا بأنه أفضل أصدقائها.",
    changes: [
      { from: "said to", to: "told", kind: "verb" },
      { from: "You", to: "he", kind: "pronoun" },
      { from: "my", to: "her", kind: "pronoun" },
      { from: "are", to: "were", kind: "tense" },
    ],
  },
  {
    id: "they-may",
    direct: 'They said, "We may travel tomorrow."',
    directAr: "قالوا: «قد نسافر غدًا».",
    decisions: [
      {
        key: "verb",
        label: "① فعل النقل: لم يُذكر شخص مُخاطَب —",
        options: ["said that", "told that", "said to"],
        answer: "said that",
        why: "بدون ذكر الشخص نستخدم said + that.",
      },
      {
        key: "pron",
        label: "② الضمير We —",
        options: ["they", "we", "you"],
        answer: "they",
        why: "الراوي خارج المجموعة، فتصبح We ← they.",
      },
      {
        key: "modal",
        label: "③ الفعل الناقص may —",
        options: ["might", "may", "must"],
        answer: "might",
        why: "may ← might في الكلام المنقول.",
      },
      {
        key: "time",
        label: "④ الزمان: tomorrow — إذا تغيّر يوم النقل:",
        options: ["the following day", "tomorrow", "yesterday"],
        answer: "the following day",
        why: "tomorrow ← the following day / the next day.",
      },
    ],
    result: "They said that they might travel the following day.",
    resultAr: "قالوا إنهم قد يسافرون في اليوم التالي.",
    changes: [
      { from: "We", to: "they", kind: "pronoun" },
      { from: "may", to: "might", kind: "modal" },
      { from: "tomorrow", to: "the following day", kind: "time" },
    ],
  },
];

export function TransformStudio60() {
  const [sent, setSent] = useState(0);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [run, setRun] = useState(false);
  const sentence = STUDIO_60[sent];
  const complete = sentence.decisions.every((d) => picked[d.key]);

  const switchSent = (i: number) => {
    setSent(i);
    setPicked({});
    setRun(false);
  };

  return (
    <LabShell
      id="studio"
      kicker="TRANSFORMATION STUDIO"
      title="استوديو تحويل الرسائل"
      lead="اختر رسالة، ثم اتخذ قرارات النقل واحدًا تلو الآخر. لن تُعرض النتيجة قبل إكمال كل القرارات — ثم تشغّل التحويل وترى الحكم على كل قرار."
    >
      <div className="l60-studio-sents" role="group" aria-label="اختر رسالة للتحويل">
        {STUDIO_60.map((item, i) => (
          <button key={item.id} type="button" aria-pressed={i === sent} onClick={() => switchSent(i)}>
            <En60>{item.direct.split(",")[0]}…</En60>
          </button>
        ))}
      </div>

      <TransferPair60
        compact
        pair={{ direct: sentence.direct, directAr: sentence.directAr, reported: run ? sentence.result : "؟؟؟", reportedAr: run ? sentence.resultAr : "أكمل القرارات ثم شغّل التحويل." }}
        whoDirect="المتحدث الأصلي"
        whoReported="الراوي"
      />

      <div className="l60-studio-decisions">
        {sentence.decisions.map((decision) => {
          const value = picked[decision.key] ?? "";
          const state = run ? (value === decision.answer ? "is-right" : "is-wrong") : "";
          return (
            <div className={`l60-decision ${state}`} key={decision.key} data-decision={decision.key}>
              <small>
                <Mixed60 text={decision.label} />
              </small>
              <ChoiceList60
                options={decision.options}
                value={value}
                ariaLabel={decision.label}
                onPick={(v) => setPicked((prev) => ({ ...prev, [decision.key]: v }))}
              />
              {run && (
                <p className="l60-small" style={{ margin: "0.45rem 0 0" }}>
                  {value === decision.answer ? "✓ " : `✕ الصحيح: `}
                  {value === decision.answer ? "" : <En60>{decision.answer}</En60>} {decision.why}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="l60-actions">
        <Btn60 variant="bright" onClick={() => setRun(true)} disabled={!complete}>
          ▶ شغّل التحويل
        </Btn60>
        <Btn60 variant="soft" onClick={() => switchSent(sent)} disabled={!Object.keys(picked).length && !run}>
          ↺ إعادة الضبط
        </Btn60>
      </div>

      {!complete && <p className="l60-small">أكمل كل القرارات لتفعيل زر التحويل — {sentence.decisions.filter((d) => picked[d.key]).length} / {sentence.decisions.length} جاهزة.</p>}

      {run && (
        <div className="l60-studio-out" role="status">
          <span className="l60-tagline">FINAL REPORTED SENTENCE</span>
          <b>
            <En60>{sentence.result}</En60>
          </b>
          <p style={{ margin: "0.3rem 0 0.5rem" }}>{sentence.resultAr}</p>
          <div className="l60-path-gates" style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {sentence.changes.map((change) => (
              <ShiftChip60 key={change.from} change={change} size="sm" />
            ))}
          </div>
        </div>
      )}
    </LabShell>
  );
}

/* ------------------------------------------------------------
   3) Backshift Timeline — خط زمني قابل للاستكشاف
   ------------------------------------------------------------ */

const TIMELINE_DETAILS: { from: string; to: string; example?: { direct: string; reported: string }; formNote: string; ar: string }[] = BACKSHIFT_TABLE_60.rows.map((row) => {
  const key = `${row.from}→${row.to}`;
  const examples: Record<string, { direct: string; reported: string; ar: string; formNote: string }> = {
    "Present Simple→Past Simple": {
      direct: 'Ali said, "I work every day."',
      reported: "Ali said that he worked every day.",
      ar: "V1 ← V2 · am/is ← was · are ← were",
      formNote: "المضارع البسيط يرجع خطوة إلى الماضي البسيط.",
    },
    "Present Continuous→Past Continuous": {
      direct: 'He said, "I am studying English."',
      reported: "He said that he was studying English.",
      ar: "am/is/are + V-ing ← was/were + V-ing",
      formNote: "الاستمرارية باقية، والزمن رجع.",
    },
    "Present Perfect→Past Perfect": {
      direct: 'Ali said, "I have finished my homework."',
      reported: "Ali said that he had finished his homework.",
      ar: "has/have + V3 ← had + V3",
      formNote: "التمام انتقل إلى الماضي التام.",
    },
    "Past Simple→Past Perfect": {
      direct: 'He said, "I bought a new phone."',
      reported: "He said that he had bought a new phone.",
      ar: "V2 ← had + V3",
      formNote: "الماضي البسيط يرجع إلى الماضي التام.",
    },
    "Past Continuous→Past Perfect Continuous": {
      direct: 'They said, "We were waiting for the bus."',
      reported: "They said that they had been waiting for the bus.",
      ar: "was/were + V-ing ← had been + V-ing",
      formNote: "الاستمرارية في الماضي ترجع إلى الماضي التام المستمر.",
    },
    "Past Perfect→Past Perfect": {
      direct: 'He said, "I had finished the work."',
      reported: "He said that he had finished the work.",
      ar: "had + V3 — بلا تغيير",
      formNote: "الماضي التام لا يرجع إلى زمن أقدم؛ يبقى كما هو.",
    },
    "will→would": {
      direct: 'He said, "I will help you."',
      reported: "He said that he would help me.",
      ar: "will + V1 ← would + V1",
      formNote: "المستقبل البسيط يرجع إلى would.",
    },
    "can→could": {
      direct: 'He said, "I can swim."',
      reported: "He said that he could swim.",
      ar: "can ← could",
      formNote: "القدرة في المضارع تصبح قدرة ماضية.",
    },
    "may→might": {
      direct: 'Sara said, "I may come later."',
      reported: "Sara said that she might come later.",
      ar: "may ← might",
      formNote: "الاحتمال يرجع خطوة إلى الخلف.",
    },
    "must→had to": {
      direct: 'He said, "I must leave early."',
      reported: "He said that he had to leave early.",
      ar: "must ← had to (للالتزام)",
      formNote: 'للالتزام غالبًا had to؛ وللاستنتاج القوي قد تبقى كما هي: «She must be tired.»',
    },
  };
  const hit = examples[key];
  return {
    from: row.from,
    to: row.to,
    example: hit ? { direct: hit.direct, reported: hit.reported } : undefined,
    formNote: hit ? hit.ar : row.note === "يبقى كما هو" ? "يبقى كما هو — لا نرجع مرة أخرى." : "has / have been + V-ing ← had been + V-ing",
    ar: hit ? hit.formNote : row.note ? `هذا الزمن ${row.note}؛ لا يوجد زمن أقدم نرجع إليه في هذه القاعدة.` : "الرجوع خطوة واحدة إلى الخلف.",
  };
});

export function BackshiftTimeline60() {
  const [sel, setSel] = useState(0);
  const detail = TIMELINE_DETAILS[sel];
  return (
    <LabShell
      id="timeline"
      kicker="BACKSHIFT TIMELINE"
      title="الخط الزمني لرجوع الأزمنة"
      lead="كل صف قطرة زمنية تسافر خطوة واحدة إلى الخلف عند النقل بفعل ماضٍ. اختر أي صف لترى مثاله من الدرس."
    >
      <div className="l60-tl">
        <div className="l60-tl-axis" aria-hidden>
          <span>DIRECT · زمن الكلام</span>
          <span>خطوة إلى الخلف</span>
          <span>REPORTED · زمن النقل</span>
        </div>
        {TIMELINE_DETAILS.map((row, i) => (
          <button key={row.from} type="button" className="l60-tl-row" aria-pressed={i === sel} onClick={() => setSel(i)}>
            <span className="l60-tl-from">{row.from}</span>
            <span className="l60-tl-arrow">⟶</span>
            <span className="l60-tl-to">{row.to}</span>
            <span className="l60-tl-stay">{row.from === row.to ? "يبقى كما هو" : BACKSHIFT_TABLE_60.rows[i].note ?? ""}</span>
          </button>
        ))}
        <div className="l60-tl-detail" role="status" aria-live="polite">
          <div dir="ltr" style={{ fontWeight: 700 }}>
            {detail.from} ⟶ {detail.to}
          </div>
          <div style={{ marginTop: "0.3rem" }}>{detail.ar}</div>
          <div dir="ltr" style={{ fontSize: "0.88rem", opacity: 0.9 }}>
            {detail.formNote}
          </div>
          {detail.example && (
            <div className="l60-explorer-out" style={{ marginTop: "0.55rem", display: "grid", gap: "0.3rem", direction: "ltr" }}>
              <span>
                <b>DIRECT:</b> {detail.example.direct}
              </span>
              <span>
                <b>REPORTED:</b> {detail.example.reported}
              </span>
            </div>
          )}
        </div>
      </div>
    </LabShell>
  );
}

/* ------------------------------------------------------------
   4) Said vs Told Lab
   ------------------------------------------------------------ */

const SAID_TOLD_DRILL: { prompt: string; options: string[]; answer: string; why: string }[] = [
  {
    prompt: "He ______ that he was tired.",
    options: ["said", "told", "said me"],
    answer: "said",
    why: "لا يوجد شخص بعد الفعل، فنستخدم said + that.",
  },
  {
    prompt: "He ______ me that he was busy.",
    options: ["said", "told", "says"],
    answer: "told",
    why: "الشخص (me) مذكور بعد الفعل مباشرةً ⇒ told.",
  },
  {
    prompt: "She ______ to me that she was happy.",
    options: ["said", "told", "told to"],
    answer: "said",
    why: "said to + الشخص تركيب صحيح؛ told لا تقبل to بعدها.",
  },
  {
    prompt: "The teacher ______ the students that they were doing well.",
    options: ["told", "said", "said to the"],
    answer: "told",
    why: "told + الشخص مباشرةً دون to.",
  },
  {
    prompt: "Ali ______ that he had bought a new phone.",
    options: ["said", "told", "told that"],
    answer: "said",
    why: "لا شخص مذكورًا؛ said + that.",
  },
  {
    prompt: "My father ______ me that I had to study.",
    options: ["told", "said", "said that"],
    answer: "told",
    why: "الشخص me بعد الفعل ⇒ told.",
  },
];

export function SaidToldLab60() {
  const [answers, setAnswers] = useState<string[]>(Array(SAID_TOLD_DRILL.length).fill(""));
  const [checked, setChecked] = useState(false);
  const allPicked = answers.every(Boolean);
  return (
    <LabShell
      id="saidtold"
      kicker="SAID vs TOLD LAB"
      title="مختبر SAID وTOLD"
      lead="ثلاث بطاقات تحكم، ثم ست جمل تحتاج فعل النقل الصحيح، وأخيرًا إصلاح الخطأين الأشهر."
    >
      <div className="l60-verb-cards">
        <div className="l60-verb-card">
          <h4>said</h4>
          <p>ننقل الكلام دون ذكر من تلقّاه.</p>
          <code>said + (that) + الجملة</code>
        </div>
        <div className="l60-verb-card">
          <h4>said to</h4>
          <p>نذكر الشخص بحرف الجر to.</p>
          <code>said to + person + (that) + الجملة</code>
        </div>
        <div className="l60-verb-card">
          <h4>told</h4>
          <p>نذكر الشخص مباشرةً بلا to.</p>
          <code>told + person + (that) + الجملة</code>
        </div>
      </div>
      <p className="l60-note">
        طريقة التذكّر: <En60>{TOLD_60.memory[0]}</En60> · <En60>{TOLD_60.memory[1]}</En60>
      </p>

      <div className="l60-practice-list">
        {SAID_TOLD_DRILL.map((item, i) => (
          <div className="l60-detect" key={item.prompt}>
            <p className="l60-prompt" style={{ marginBottom: 0 }}>
              <En60>{item.prompt}</En60>
            </p>
            <ChoiceList60
              options={item.options}
              value={answers[i]}
              ariaLabel={`جملة ${i + 1}`}
              onPick={(v) => {
                setAnswers((prev) => prev.map((old, j) => (j === i ? v : old)));
                setChecked(false);
              }}
            />
            {checked && (
              <div className={`l60-lab-result ${answers[i] === item.answer ? "is-right" : "is-wrong"}`}>
                <b>{answers[i] === item.answer ? "✓ صحيح" : `✕ الصحيح: ${item.answer}`}</b>
                <span>{item.why}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="l60-actions">
        <Btn60 variant="bright" onClick={() => setChecked(true)} disabled={!allPicked}>
          تحقّق من الستة
        </Btn60>
        <Btn60
          variant="soft"
          onClick={() => {
            setAnswers(Array(SAID_TOLD_DRILL.length).fill(""));
            setChecked(false);
          }}
        >
          ↺ مسح الاختيارات
        </Btn60>
      </div>

      <h3>أصلح الخطأين الأشهر</h3>
      <div className="l60-practice-list">
        <Attempt60
          index={1}
          accept={["He told me that he was busy.", "He said to me that he was busy."]}
          item={{
            prompt: "He said me that he was busy.",
            answer: "He told me that he was busy.",
            why: "said لا يتبعها الشخص مباشرةً. صحيح also: He said to me that he was busy.",
          }}
        />
        <Attempt60
          index={2}
          accept={["She said that she was tired.", "She told me that she was tired."]}
          item={{
            prompt: "She told that she was tired.",
            answer: "She said that she was tired.",
            why: "told تحتاج شخصًا بعدها: She told me that… أو نستخدم said.",
          }}
        />
      </div>
    </LabShell>
  );
}

/* ------------------------------------------------------------
   5) Pronoun Perspective Mapper — الإجابة تتبع السياق
   ------------------------------------------------------------ */

type MapperScenario = {
  id: string;
  quote: string;
  quoteAr: string;
  cast: { speaker: string; listener: string; reporterOptions: { id: string; label: string; en: string }[] };
  perspectives: {
    id: string;
    reporter: string;
    mappings: { from: string; to: string; why: string }[];
    result: string;
    resultAr: string;
  }[];
};

const MAPPER_60: MapperScenario[] = [
  {
    id: "ahmed-tired",
    quote: 'Ahmed said, "I am tired."',
    quoteAr: "قال أحمد: «أنا متعب».",
    cast: {
      speaker: "أحمد (المتحدث)",
      listener: "—",
      reporterOptions: [
        { id: "third", label: "زميل ينقل كلام أحمد", en: "a classmate reports it" },
        { id: "self", label: "أحمد نفسه يروي لاحقًا", en: "Ahmed himself reports" },
      ],
    },
    perspectives: [
      {
        id: "third",
        reporter: "الزميل (طرف ثالث)",
        mappings: [{ from: "I", to: "he", why: "الضمير I كان يشير إلى أحمد؛ الراوي الخارجي يقول he." }],
        result: "Ahmed said that he was tired.",
        resultAr: "قال أحمد إنه كان متعبًا.",
      },
      {
        id: "self",
        reporter: "أحمد نفسه",
        mappings: [{ from: "I", to: "I", why: "الراوي هو المتحدث نفسه، فيبقى الضمير I: ما زلت أتحدث عن نفسي." }],
        result: "I said that I was tired.",
        resultAr: "قلتُ إنني كنت متعبًا.",
      },
    ],
  },
  {
    id: "father-me",
    quote: 'My father said to me, "You are a good student."',
    quoteAr: "قال أبي لي: «أنت طالب جيد».",
    cast: {
      speaker: "الأب (المتحدث)",
      listener: "أنا (المستمع)",
      reporterOptions: [
        { id: "listener", label: "أنا أنقل كلام أبي", en: "the listener reports" },
        { id: "sister", label: "أختي تنقل الحوار عنّي", en: "a third person reports" },
      ],
    },
    perspectives: [
      {
        id: "listener",
        reporter: "أنا — المستمع الأصلي",
        mappings: [{ from: "You", to: "I", why: "كان الأب يخاطبني؛ عندما أنقل عن نفسي أستخدم I." }],
        result: "My father told me that I was a good student.",
        resultAr: "أخبرني أبي بأنني طالب جيد.",
      },
      {
        id: "sister",
        reporter: "الأخت (طرف ثالث)",
        mappings: [{ from: "You", to: "he", why: "الأخت تتحدث عنّي بضمير الغائب he لأنني المخاطَب الأصلي." }],
        result: "My father told him that he was a good student.",
        resultAr: "أخبر أبي أخاه… (عنه) بأنه طالب جيد.",
      },
    ],
  },
  {
    id: "boys-ready",
    quote: 'The boys said, "We are ready."',
    quoteAr: "قال الأولاد: «نحن مستعدون».",
    cast: {
      speaker: "الأولاد (مجموعة)",
      listener: "—",
      reporterOptions: [
        { id: "third", label: "مراقب خارجي ينقل", en: "an outsider reports" },
        { id: "member", label: "أحد الأولاد ينقل بنفسه", en: "one of the boys reports" },
      ],
    },
    perspectives: [
      {
        id: "third",
        reporter: "المراقب الخارجي",
        mappings: [{ from: "We", to: "they", why: "الراوي خارج المجموعة فيقول they." }],
        result: "The boys said that they were ready.",
        resultAr: "قال الأولاد إنهم مستعدون.",
      },
      {
        id: "member",
        reporter: "أحد الأولاد",
        mappings: [{ from: "We", to: "we", why: "الراوي من داخل المجموعة، فيبقى We كما هي." }],
        result: "We said that we were ready.",
        resultAr: "قلنا إننا مستعدون.",
      },
    ],
  },
];

export function PronounMapper60() {
  const [scenarioId, setScenarioId] = useState(MAPPER_60[0].id);
  const scenario = MAPPER_60.find((s) => s.id === scenarioId)!;
  const [perspId, setPerspId] = useState(scenario.perspectives[0].id);
  const persp = scenario.perspectives.find((p) => p.id === perspId) ?? scenario.perspectives[0];
  return (
    <LabShell
      id="pronouns"
      kicker="PRONOUN MAPPER"
      title="مخطّط منظور الضمائر"
      lead="الضمير لا يتحوّل بجدول آلي، بل يتبع الأشخاص. اختر المشهد ثم غيّر «من ينقل الكلام؟» وراقب كيف تتغير الضمائر والنتيجة."
    >
      <div className="l60-explorer-nav" role="group" aria-label="مشاهد الضمائر">
        {MAPPER_60.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === scenarioId}
            onClick={() => {
              setScenarioId(s.id);
              setPerspId(s.perspectives[0].id);
            }}
          >
            <En60>{s.quote.split(",")[0]}…</En60>
          </button>
        ))}
      </div>

      <div className="l60-mapper-cast">
        <div className="l60-cast">
          <i aria-hidden>🗣️</i>
          <small>SPEAKER</small>
          <b>{scenario.cast.speaker}</b>
          <En60 style={{ fontSize: "0.82rem", fontWeight: 700 }}>{scenario.quote}</En60>
        </div>
        <div className="l60-cast">
          <i aria-hidden>👂</i>
          <small>LISTENER</small>
          <b>{scenario.cast.listener}</b>
          <span className="l60-small">المخاطَب في الكلام الأصلي</span>
        </div>
        <div className="l60-cast">
          <i aria-hidden>✍️</i>
          <small>REPORTER</small>
          <b>{persp.reporter}</b>
          <div className="l60-choice-list" style={{ justifyContent: "center" }}>
            {scenario.cast.reporterOptions.map((option) => (
              <button key={option.id} type="button" aria-pressed={option.id === persp.id} onClick={() => setPerspId(option.id)}>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="l60-pron-grid">
        {persp.mappings.map((map) => (
          <div className="l60-pron-row" key={map.from}>
            <span>{map.from}</span>
            <em>⟶</em>
            <span>{map.to}</span>
          </div>
        ))}
      </div>
      <ul className="l60-transfer-notes">
        {persp.mappings.map((map) => (
          <li key={`${map.from}-why`}>{map.why}</li>
        ))}
      </ul>

      <div className="l60-studio-out">
        <span className="l60-tagline">RESULT CHANGES WITH THE REPORTER</span>
        <b>
          <En60>{persp.result}</En60>
        </b>
        <p style={{ margin: "0.3rem 0 0" }}>{persp.resultAr}</p>
        <p className="l60-small" style={{ marginBottom: 0 }}>
          لاحظ: الجملة الأصلية واحدة، لكن النتيجة تغيّرت لأن الشخص الذي ينقل الكلام تغيّر.
        </p>
      </div>
    </LabShell>
  );
}

/* ------------------------------------------------------------
   6) Time & Place Shift Explorer — السياق يقرر
   ------------------------------------------------------------ */

const TIME_WORDS = ["now", "today", "tomorrow", "here", "this"];
type TimeContext = "same" | "nextDay" | "nextWeek";
type PlaceContext = "same" | "other";

const SHIFT_RESULT: Record<string, Record<"keep" | "shift", string>> = {
  now: { keep: "now", shift: "then" },
  today: { keep: "today", shift: "that day" },
  tomorrow: { keep: "tomorrow", shift: "the following day" },
  here: { keep: "here", shift: "there" },
  this: { keep: "this", shift: "that" },
};

export function TimePlaceLab60() {
  const [time, setTime] = useState<TimeContext>("nextDay");
  const [place, setPlace] = useState<PlaceContext>("other");
  const timeShifted = time !== "same";
  const placeShifted = place === "other";
  const reasonFor = (word: string, shifted: boolean) => {
    if (shifted) {
      return word === "here" || word === "this"
        ? "الراوي في مكان آخر، فتتجه الإشارة إلى البعيد."
        : "تغيّر يوم/وقت النقل، فالكلمة الأصلية لم تعد تشير إلى اللحظة نفسها.";
    }
    return "السياق نفسه لم يتغير، فيمكن الاحتفاظ بالكلمة الأصلية ويبقى المعنى صحيحًا.";
  };
  return (
    <LabShell
      id="timeshift"
      kicker="TIME & PLACE SHIFT"
      title="مستكشف إزاحة الزمان والمكان"
      lead="التحويلات في الجدول ليست آلية: غيّر وقت النقل ومكان الراوي وراقب متى تتحول الكلمات ومتى تبقى."
    >
      <div className="l60-context-grid">
        <div className="l60-context">
          <b>⏱ متى قيل الكلام؟ ومتى ننقله؟</b>
          <ChoiceList60
            ariaLabel="وقت النقل"
            options={["قيل ونُقل في اللحظة نفسها", "قيل أمس وننقله اليوم", "قيل الأسبوع الماضي وننقله الآن"]}
            value={time === "same" ? "قيل ونُقل في اللحظة نفسها" : time === "nextDay" ? "قيل أمس وننقله اليوم" : "قيل الأسبوع الماضي وننقله الآن"}
            onPick={(v) => setTime(v.includes("نفسها") ? "same" : v.includes("اليوم") ? "nextDay" : "nextWeek")}
          />
        </div>
        <div className="l60-context">
          <b>📍 أين يقف الراوي؟</b>
          <ChoiceList60
            ariaLabel="مكان النقل"
            options={["في المكان نفسه الذي قيل فيه الكلام", "في مكان مختلف"]}
            value={place === "same" ? "في المكان نفسه الذي قيل فيه الكلام" : "في مكان مختلف"}
            onPick={(v) => setPlace(v.includes("نفسه") ? "same" : "other")}
          />
        </div>
      </div>

      <p className="l60-note">
        الجملة الأصلية: <En60>He said, "I will meet you here tomorrow, and I will show you this."</En60>
      </p>

      <div className="l60-shift-out">
        {TIME_WORDS.map((word) => {
          const isPlaceWord = word === "here" || word === "this";
          const shifted = isPlaceWord ? placeShifted : timeShifted;
          const result = SHIFT_RESULT[word][shifted ? "shift" : "keep"];
          return (
            <div className="l60-shift-row" key={word}>
              <span style={{ font: "700 0.92rem L60Latin, sans-serif" }}>{word}</span>
              <span style={{ color: shifted ? "var(--l60-reported)" : "var(--l60-good)", fontWeight: 700 }}>{shifted ? "⟶" : "="}</span>
              <span style={{ font: "700 0.92rem L60Latin, sans-serif", color: shifted ? "var(--l60-reported)" : "inherit" }}>{result}</span>
              <span className="l60-stay-note">{reasonFor(word, shifted)}</span>
            </div>
          );
        })}
      </div>

      <p className="l60-good" style={{ marginTop: "0.9rem" }}>
        القاعدة الحقيقية: حافظ على المعنى. إذا لم يتغيّر الزمان أو المكان بين الكلام والنقل، فقد تبقى الكلمة الأصلية؛
        وإذا تغيّر السياق، حوّل الكلمة حتى لا يضيع المقصود.
      </p>
    </LabShell>
  );
}

/* ------------------------------------------------------------
   7) Exception Detector — هل نحتاج Backshift؟
   ------------------------------------------------------------ */

const EXCEPTION_CARDS: { direct: string; hint?: string; keep: boolean; why: string }[] = [
  {
    direct: 'The teacher said, "The Earth revolves around the Sun."',
    keep: true,
    why: "حقيقة علمية ثابتة — يمكن إبقاء revolves.",
  },
  {
    direct: 'He said, "I am happy."',
    keep: false,
    why: "فعل نقل ماضٍ ولا استثناء: am → was.",
  },
  {
    direct: 'Sara says, "I am tired."',
    hint: "فعل النقل في المضارع",
    keep: true,
    why: "مع says لا نحتاج عادةً إلى Backshift: Sara says that she is tired.",
  },
  {
    direct: 'Sara said, "I live in Ankara."',
    hint: "ما زالت تعيش هناك",
    keep: true,
    why: "الكلام لا يزال صحيحًا وقت النقل، فيمكن الإبقاء: she lives in Ankara (ويجوز الرجوع أيضًا).",
  },
  {
    direct: 'He said, "I will help you."',
    keep: false,
    why: "will → would بعد فعل النقل الماضي.",
  },
  {
    direct: 'The scientist said, "Water freezes at 0°C under standard pressure."',
    keep: true,
    why: "حقيقة علمية عامة — freezes تبقى كما هي.",
  },
  {
    direct: 'He said, "I have lost my wallet."',
    keep: false,
    why: "المضارع التام يرجع إلى الماضي التام: had lost.",
  },
  {
    direct: 'Ali says, "I like football."',
    keep: true,
    why: "فعل النقل مضارع: Ali says that he likes football.",
  },
];

export function ExceptionDetector60() {
  const [marks, setMarks] = useState<(string | null)[]>(Array(EXCEPTION_CARDS.length).fill(null));
  const [checked, setChecked] = useState(false);
  const done = marks.every(Boolean);
  const score = marks.filter((m, i) => (m === "keep") === EXCEPTION_CARDS[i].keep).length;
  return (
    <LabShell
      id="exceptions"
      kicker="EXCEPTION DETECTOR"
      title="كاشف الاستثناءات"
      lead="ليست كل جملة ترجع زمنها إلى الخلف. صنّف كل رسالة: هل نُبقي الزمن أم نطبّق Backshift؟ ثم تحقّق — لا حكم قبل المحاولة."
    >
      <div className="l60-detect-grid">
        {EXCEPTION_CARDS.map((card, i) => (
          <div className="l60-detect" key={card.direct}>
            <p className="l60-prompt" style={{ marginBottom: 0 }}>
              <En60>{card.direct}</En60>
            </p>
            {card.hint && <p className="l60-hintline">{card.hint}</p>}
            <ChoiceList60
              options={["نُبقي الزمن كما هو", "نرجع الزمن خطوة (Backshift)"]}
              value={marks[i] === null ? "" : marks[i] === "keep" ? "نُبقي الزمن كما هو" : "نرجع الزمن خطوة (Backshift)"}
              ariaLabel={`تصنيف الجملة ${i + 1}`}
              onPick={(v) => {
                setMarks((prev) => prev.map((old, j) => (j === i ? (v.startsWith("نُبقي") ? "keep" : "shift") : old)));
                setChecked(false);
              }}
            />
            {checked && (
              <div className={`l60-lab-result ${(marks[i] === "keep") === card.keep ? "is-right" : "is-wrong"}`}>
                <b>{(marks[i] === "keep") === card.keep ? "✓ صحيح" : `✕ الصواب: ${card.keep ? "نُبقي الزمن" : "نرجع الزمن"}`}</b>
                <span>
                  <Mixed60 text={card.why} />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="l60-actions">
        <Btn60 variant="bright" onClick={() => setChecked(true)} disabled={!done}>
          تحقّق من التصنيفات الثمانية
        </Btn60>
        <Btn60
          variant="soft"
          onClick={() => {
            setMarks(Array(EXCEPTION_CARDS.length).fill(null));
            setChecked(false);
          }}
        >
          ↺ مسح
        </Btn60>
      </div>
      {checked && (
        <p className="l60-good" role="status">
          النتيجة: {score} / {EXCEPTION_CARDS.length} — لاحظ أن الاستثناءات ثلاثة أنواع: حقيقة ثابتة، أو كلام لا يزال صحيحًا، أو فعل نقل في المضارع.
        </p>
      )}
    </LabShell>
  );
}

/* ------------------------------------------------------------
   8) Error Detective — الأخطاء السبعة
   ------------------------------------------------------------ */

const ERROR_FIXES: { wrong: string; options: string[]; answer: string; why: string }[] = ERRORS_60.map((error) => {
  const options: Record<number, string[]> = {
    21: ["Ali said that he was tired.", "Ali said that we were tired.", "Ali said that I am tired."],
    22: ["He told me that he was busy.", "He said that to me he was busy.", "He says me that he was busy."],
    23: ["He said that he was happy.", "He said that he has been happy.", "He said that he will be happy."],
    24: ["He said that he had finished the work.", "He said that he had had finished the work.", "He said that he had been finishing the work."],
    25: ["She said that she would come the following day.", "She said that she will come tomorrow.", "She said that she would come yesterday."],
    26: ["The teacher said that water freezes at 0°C.", "The teacher said that water had frozen at 0°C.", "The teacher said that water is freezing at 0°C."],
    27: ["She said that she was tired.", "She told that she had been tired.", "She said that she is tired."],
  };
  return { wrong: error.wrong, options: options[error.n], answer: error.right, why: error.why };
});

export function ErrorDetective60() {
  const [answers, setAnswers] = useState<string[]>(Array(ERROR_FIXES.length).fill(""));
  const [checked, setChecked] = useState(false);
  const done = answers.every(Boolean);
  return (
    <LabShell
      id="errors"
      kicker="ERROR DETECTIVE"
      title="محقّق الأخطاء السبعة"
      lead="كل بطاقة تعرض الجملة الخاطئة من الدرس. اختر الإصلاح الصحيح، ثم تحقّق لتقرأ التفسير كاملًا."
    >
      <div className="l60-error-list">
        {ERROR_FIXES.map((fix, i) => (
          <div className="l60-error-row" key={fix.wrong}>
            <small style={{ font: "700 0.62rem L60Latin, sans-serif", letterSpacing: "0.12em", color: "var(--l60-muted)" }}>
              MISTAKE {String(i + 1).padStart(2, "0")}
            </small>
            <En60 className="l60-wrongtext">{fix.wrong}</En60>
            <ChoiceList60
              options={fix.options}
              value={answers[i]}
              ariaLabel={`إصلاح الخطأ ${i + 1}`}
              onPick={(v) => {
                setAnswers((prev) => prev.map((old, j) => (j === i ? v : old)));
                setChecked(false);
              }}
            />
            {checked && (
              <div className={`l60-lab-result ${answers[i] === fix.answer ? "is-right" : "is-wrong"}`}>
                <b>{answers[i] === fix.answer ? "✓ إصلاح صحيح" : "✕ ليس هذا الإصلاح"}</b>
                <span>
                  الصياغة الصحيحة: <En60>{fix.answer}</En60>
                </span>
                {ERRORS_60[i].rightAlt && (
                  <span>
                    بديل صحيح: <En60>{ERRORS_60[i].rightAlt}</En60>
                  </span>
                )}
                <span>{fix.why}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="l60-actions">
        <Btn60 variant="bright" onClick={() => setChecked(true)} disabled={!done}>
          تحقّق من الإصلاحات السبعة
        </Btn60>
        <Btn60
          variant="soft"
          onClick={() => {
            setAnswers(Array(ERROR_FIXES.length).fill(""));
            setChecked(false);
          }}
        >
          ↺ مسح
        </Btn60>
      </div>
    </LabShell>
  );
}

/* ------------------------------------------------------------
   9) Transformation Challenges — تغييرات متعددة في جملة واحدة
   ------------------------------------------------------------ */

const CHALLENGES: { direct: string; answer: string; accept: string[]; ar: string; changes: Change60[] }[] = [
  {
    direct: 'They said, "We may travel tomorrow."',
    answer: "They said that they might travel the following day.",
    accept: ["They said that they might travel the following day.", "They said they might travel the following day.", "They said that they might travel the next day."],
    ar: "قالوا إنهم قد يسافرون في اليوم التالي.",
    changes: [
      { from: "We", to: "they", kind: "pronoun" },
      { from: "may", to: "might", kind: "modal" },
      { from: "tomorrow", to: "the following day", kind: "time" },
    ],
  },
  {
    direct: 'They said, "We bought this house last year."',
    answer: "They said that they had bought that house the previous year.",
    accept: ["They said that they had bought that house the previous year.", "They said they had bought that house the previous year."],
    ar: "قالوا إنهم اشتروا ذلك المنزل في العام السابق.",
    changes: [
      { from: "bought", to: "had bought", kind: "tense" },
      { from: "this", to: "that", kind: "place" },
      { from: "last year", to: "the previous year", kind: "time" },
    ],
  },
  {
    direct: 'He said, "I will help you."',
    answer: "He said that he would help me.",
    accept: ["He said that he would help me.", "He said he would help me."],
    ar: "قال إنه سيساعدني.",
    changes: [
      { from: "will", to: "would", kind: "modal" },
      { from: "you", to: "me", kind: "pronoun" },
    ],
  },
  {
    direct: 'Mona said, "I am doing my homework."',
    answer: "Mona said that she was doing her homework.",
    accept: ["Mona said that she was doing her homework.", "Mona said she was doing her homework."],
    ar: "قالت منى إنها كانت تؤدي واجبها.",
    changes: [
      { from: "I", to: "she", kind: "pronoun" },
      { from: "my", to: "her", kind: "pronoun" },
      { from: "am doing", to: "was doing", kind: "tense" },
    ],
  },
];

const normalize = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[.]+|[.\s]+$/g, "")
    .toLowerCase();

export function ChallengeStudio60() {
  const [values, setValues] = useState<string[]>(Array(CHALLENGES.length).fill(""));
  const [checked, setChecked] = useState<boolean[]>(Array(CHALLENGES.length).fill(false));
  return (
    <LabShell
      id="challenges"
      kicker="TRANSFORMATION CHALLENGES"
      title="تحديات التحويل الكامل"
      lead="أربع جمل من الدرس نفسه، وكل واحدة تحتاج أكثر من تغيير. اكتب الجملة المنقولة كاملة، ثم تحقّق لترى خريطة التغييرات."
    >
      {CHALLENGES.map((challenge, i) => {
        const right = challenge.accept.some((variant) => normalize(variant) === normalize(values[i]));
        return (
          <div className="l60-challenge" key={challenge.direct}>
            <span className="l60-tagline">CHALLENGE {i + 1} · DIRECT</span>
            <p className="l60-prompt" style={{ marginBottom: 0 }}>
              <En60>{challenge.direct}</En60>
            </p>
            <input
              type="text"
              dir="ltr"
              lang="en"
              value={values[i]}
              aria-label={`التحدي ${i + 1}`}
              placeholder="اكتب الجملة المنقولة كاملة…"
              onChange={(event) => {
                setValues((prev) => prev.map((old, j) => (j === i ? event.target.value : old)));
                setChecked((prev) => prev.map((old, j) => (j === i ? false : old)));
              }}
            />
            <div className="l60-actions">
              <Btn60 onClick={() => setChecked((prev) => prev.map((old, j) => (j === i ? true : old)))} disabled={!values[i].trim()}>
                تحقّق
              </Btn60>
            </div>
            {checked[i] && (
              <div className={`l60-lab-result ${right ? "is-right" : "is-wrong"}`} role="status">
                <b>{right ? "✓ تحويل كامل صحيح" : "✕ قارن إجابتك بالنموذج"}</b>
                <span>
                  <En60>{challenge.answer}</En60>
                </span>
                <span>{challenge.ar}</span>
                <span style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {challenge.changes.map((change) => (
                    <ShiftChip60 key={change.from} change={change} size="sm" />
                  ))}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </LabShell>
  );
}

/* ------------------------------------------------------------
   محرك التدريبات المعروض في محطات p1..p8
   ------------------------------------------------------------ */

export function PracticeSet60({ group }: { group: PracticeGroup60 }) {
  return (
    <div className="l60-practice" data-l60-practice={group.id}>
      <p className="l60-lead">{group.instruction}</p>
      <div className="l60-practice-list">
        {group.items.map((item, i) => (
          <Attempt60 key={`${group.id}-${i}`} item={item} index={i + 1} />
        ))}
      </div>
    </div>
  );
}

/** مفتاح سريع للتدريبات — يُستخدم في فضاء المعلم فقط */
export function PracticeKey60({ groups }: { groups: PracticeGroup60[] }) {
  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      {groups.map((group, i) => (
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
                <p>
                  <Mixed60 text={item.why} />
                </p>
              </li>
            ))}
          </ol>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   سطور الحوار المعاد نقلها (تُستخدم في مشهد الحوار)
   ------------------------------------------------------------ */

export function ReportedLines60({ intro, lines }: { intro: string; lines: Line60[] }) {
  return (
    <div className="l60-block" style={{ borderColor: "#f0c6b3", background: "#fdf6f1" }}>
      <p style={{ margin: "0 0 0.5rem", fontWeight: 700 }}>
        <En60>{intro}</En60>
      </p>
      <div className="l60-lines">
        {lines.map((line) => (
          <div key={line.en}>
            <En60 style={{ fontWeight: 700 }}>{line.en}</En60>
            <span style={{ display: "block" }}>{line.ar}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
