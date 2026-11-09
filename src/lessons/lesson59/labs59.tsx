import { useMemo, useState } from "react";
import { ADVANCED_59, CAUSATIVE_59, ERRORS_59, TRANSFORM_DEMOS_59, V3_LEDGER_59 } from "./content59";
import { Attempt59, Btn59, ChoiceList59, En59, Formula59, Meter59, type SlotKind59 } from "./kit59";

/* ============================================================
   A — Modal Meaning Explorer
   الجملة نفسها والمبني للمجهول سليم دائمًا؛ المتغيّر هو الفعل
   الناقص وحده، وبالتالي يتغيّر المعنى فقط.
   ============================================================ */

type Explore59 = {
  modal: string;
  sentence: string;
  ar: string;
  meaning: string;
  scale: { label: string; from: string; to: string; value: number; color: string };
  note: string;
};

const EXPLORER_59: Explore59[] = [
  {
    modal: "can",
    sentence: "The report can be completed today.",
    ar: "يمكن إنجاز التقرير اليوم.",
    meaning: "قدرة / إمكانية متاحة الآن",
    scale: { label: "الإمكانية", from: "متعذّر", to: "متاح", value: 0.8, color: "#16a8bd" },
    note: "can be + V3: نؤكد أن العمل ممكن، لا أنّه مطلوب.",
  },
  {
    modal: "could",
    sentence: "The report could be completed today.",
    ar: "كان من الممكن إنجاز التقرير اليوم / ربما يمكن إنجازه.",
    meaning: "إمكانية ماضية أو احتمال محتمل",
    scale: { label: "الاحتمال", from: "ضعيف", to: "قوي", value: 0.45, color: "#3f8fd0" },
    note: "could be + V3 يبقى في الحاضر إن كان السياق احتمالًا، ويعود إلى الماضي إن كان السياق قدرة.",
  },
  {
    modal: "must",
    sentence: "The report must be completed today.",
    ar: "يجب إنجاز التقرير اليوم.",
    meaning: "ضرورة قوية / إلزام",
    scale: { label: "الإلزام", from: "اختياري", to: "إلزامي", value: 1, color: "#e08c12" },
    note: "must be + V3: أمر لا خيار فيه. ونفيها must not be + V3 = منع.",
  },
  {
    modal: "should",
    sentence: "The report should be completed today.",
    ar: "ينبغي إنجاز التقرير اليوم.",
    meaning: "نصيحة / توصية",
    scale: { label: "الإلزام", from: "اختياري", to: "إلزامي", value: 0.6, color: "#12885a" },
    note: "should be + V3: الأفضل أن يحدث، لكنه ليس أمرًا صارمًا مثل must.",
  },
  {
    modal: "may",
    sentence: "The report may be completed today.",
    ar: "قد يتم إنجاز التقرير اليوم.",
    meaning: "احتمال قائم",
    scale: { label: "الاحتمال", from: "ضعيف", to: "قوي", value: 0.55, color: "#6b5cf0" },
    note: "may be + V3: احتمال حقيقي، وقد يُستخدم may أيضًا في الاستئذان الرسمي.",
  },
  {
    modal: "might",
    sentence: "The report might be completed today.",
    ar: "ربما يتم إنجاز التقرير اليوم.",
    meaning: "احتمال أضعف وأكثر تحفظًا",
    scale: { label: "الاحتمال", from: "ضعيف", to: "قوي", value: 0.35, color: "#8a63d2" },
    note: "might be + V3: أقرب إلى الترجيح الحذر. كثيرًا ما يتقارب مع may، لكنه أقل تأكيدًا.",
  },
];

export function ModalExplorer59() {
  const [picked, setPicked] = useState(0);
  const current = EXPLORER_59[picked];
  const [attempt, setAttempt] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [target, setTarget] = useState(0);

  return (
    <section className="l59-lab" data-l59-lab="explorer">
      <div className="l59-lab-head">
        <div className="l59-kicker">
          <span>A</span>MODAL SELECTOR
        </div>
        <h2>مستكشف معنى الفعل الناقص</h2>
        <p className="l59-lead">
          التركيب المجهول يبقى سليمًا في كل الحالات (<En59>be + V3</En59>)، لكن تغيير الفعل الناقص وحده يغيّر
          المعنى بالكامل: قدرة ← احتمال ← نصيحة ← إلزام.
        </p>
      </div>

      <div className="l59-lab-panel">
        <div className="l59-explorer-buttons" role="group" aria-label="اختر الفعل الناقص">
          {EXPLORER_59.map((item, i) => (
            <button
              key={item.modal}
              type="button"
              aria-pressed={i === picked}
              onClick={() => {
                setPicked(i);
                setChecked(false);
              }}
            >
              {item.modal}
            </button>
          ))}
        </div>

        <div className="l59-explorer-out" role="status" aria-live="polite">
          <En59 style={{ fontSize: "clamp(1rem,2vw,1.2rem)", fontWeight: 700 }}>{current.sentence}</En59>
          <span>{current.ar}</span>
          <Formula59
            parts={[
              { kind: "subject", text: "The report" },
              { kind: "modal", text: current.modal },
              { kind: "be", text: "be" },
              { kind: "v3", text: "completed" },
            ]}
          />
          <b style={{ color: "#123a53" }}>المعنى الآن: {current.meaning}</b>
          <Meter59
            value={current.scale.value}
            label={current.scale.label}
            from={current.scale.from}
            to={current.scale.to}
            color={current.scale.color}
          />
          <p className="l59-small">{current.note}</p>
        </div>

        <div className="l59-block">
          <h3>اختبر نفسك: أي modal يعطي هذا المعنى؟</h3>
          <p className="l59-small">
            المطلوب: <b>{EXPLORER_59[target].meaning}</b>
          </p>
          <ChoiceList59
            options={EXPLORER_59.map((item) => item.modal)}
            value={attempt ?? ""}
            ariaLabel="اختر الفعل الناقص المطابق للمعنى"
            onPick={(modal) => {
              setAttempt(modal);
              setChecked(false);
            }}
          />
          <div className="l59-actions">
            <Btn59 disabled={!attempt} onClick={() => setChecked(true)}>
              تحقّق
            </Btn59>
            <Btn59
              variant="soft"
              onClick={() => {
                setTarget((target + 1) % EXPLORER_59.length);
                setAttempt(null);
                setChecked(false);
              }}
            >
              معنى آخر ↻
            </Btn59>
          </div>
          {checked && attempt && (
            <div className={`l59-lab-result ${attempt === EXPLORER_59[target].modal ? "is-right" : "is-wrong"}`} role="status">
              {attempt === EXPLORER_59[target].modal ? (
                <span>✓ صحيح — {EXPLORER_59[target].modal} هو التركيب الذي يحمل هذا المعنى.</span>
              ) : (
                <span>
                  ✕ ليس هذا. المعنى المطلوب يعطيه <b>{EXPLORER_59[target].modal}</b> —{" "}
                  {EXPLORER_59[target].note}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   B — Grammar Structure Builder
   المتعلم يبني الجملة من فتحات: Subject · Modal · be / have been · V3
   ============================================================ */

type BuildTask59 = {
  active: string;
  activeAr: string;
  subjectSlot: string;
  modal: string;
  be: string;
  v3: string;
  final: string;
  finalAr: string;
  why: string;
};

const BUILD_TASKS_59: BuildTask59[] = [
  {
    active: "They can repair the road.",
    activeAr: "يمكنهم إصلاح الطريق.",
    subjectSlot: "The road",
    modal: "can",
    be: "be",
    v3: "repaired",
    final: "The road can be repaired.",
    finalAr: "يمكن إصلاح الطريق.",
    why: "لا ماضٍ في التركيب، لذلك be فقط؛ وrepair فعل منتظم ⇒ repaired.",
  },
  {
    active: "They should have signed the documents.",
    activeAr: "كان ينبغي عليهم توقيع الوثائق.",
    subjectSlot: "The documents",
    modal: "should",
    be: "have been",
    v3: "signed",
    final: "The documents should have been signed.",
    finalAr: "كان ينبغي توقيع الوثائق.",
    why: "وجود should عن الماضي يفرض have been؛ وبدون have been يصبح المعنى حاضرًا.",
  },
  {
    active: "Someone must have stolen the money.",
    activeAr: "لا بد أن شخصًا ما قد سرق المال.",
    subjectSlot: "The money",
    modal: "must",
    be: "have been",
    v3: "stolen",
    final: "The money must have been stolen.",
    finalAr: "لا بد أن المال قد سُرق.",
    why: "must مع حدث ماضٍ = استنتاج، وليس ضرورة. steal شاذة: steal → stolen.",
  },
  {
    active: "The workers have to clean the factory.",
    activeAr: "يجب على العمال تنظيف المصنع.",
    subjectSlot: "The factory",
    modal: "has to",
    be: "be",
    v3: "cleaned",
    final: "The factory has to be cleaned.",
    finalAr: "يجب تنظيف المصنع.",
    why: "المبتدأ الجديد factory مفرد ⇒ has to. ثم be + cleaned.",
  },
];

const MODAL_OPTIONS_59 = ["can", "should", "must", "has to", "may"];
const BE_OPTIONS_59 = ["be", "have been", "been", "is"];

export function StructureBuilder59() {
  const [taskIndex, setTaskIndex] = useState(0);
  const [subject, setSubject] = useState("");
  const [modal, setModal] = useState("");
  const [be, setBe] = useState("");
  const [v3, setV3] = useState("");
  const [checked, setChecked] = useState(false);
  const task = BUILD_TASKS_59[taskIndex];

  const done = subject === task.subjectSlot && modal === task.modal && be === task.be && v3 === task.v3;
  const reset = () => {
    setSubject("");
    setModal("");
    setBe("");
    setV3("");
    setChecked(false);
  };

  const ObjectChips = ({
    value,
    onChange,
    options,
    label,
  }: {
    value: string;
    onChange: (next: string) => void;
    options: string[];
    label: string;
  }) => (
    <div className="l59-builder-slot">
      <small>{label}</small>
      <ChoiceList59
        options={options}
        value={value}
        ariaLabel={label}
        className="l59-choice-center"
        onPick={(option) => {
          onChange(option);
          setChecked(false);
        }}
      />
    </div>
  );

  return (
    <section className="l59-lab" data-l59-lab="builder">
      <div className="l59-lab-head">
        <div className="l59-kicker">
          <span>B</span>STRUCTURE BUILDER
        </div>
        <h2>باني التركيب</h2>
        <p className="l59-lead">
          اختر كل فتحة بنفسك. لا يُبنى الحكم على الجملة إلا بعد الضغط على «تحقّق من التركيب»، وحينها يشرح لك
          سبب صحة أو خطأ كل فتحة.
        </p>
      </div>

      <div className="l59-lab-panel">
        <div className="l59-engine-nav" role="group" aria-label="اختر جملة للبناء">
          {BUILD_TASKS_59.map((item, i) => (
            <button
              key={item.active}
              type="button"
              aria-pressed={i === taskIndex}
              onClick={() => {
                setTaskIndex(i);
                reset();
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        <div className="l59-block">
          <small className="l59-tagline">ACTIVE SENTENCE</small>
          <En59 style={{ fontWeight: 700, fontSize: "1.05rem" }}>{task.active}</En59>
          <p className="l59-small">{task.activeAr}</p>
        </div>

        <div className="l59-builder">
          <div className="l59-builder-slots">
            <div className={`l59-builder-slot${subject ? " is-filled" : ""}`}>
              <small>SUBJECT (المفعول به القديم)</small>
              <ChoiceList59
                options={[...new Set([task.subjectSlot, "The road", "The documents"])].slice(0, 3)}
                value={subject}
                ariaLabel="المبتدأ الجديد"
                className="l59-choice-center"
                onPick={(option) => {
                  setSubject(option);
                  setChecked(false);
                }}
              />
            </div>

            <ObjectChips value={modal} onChange={setModal} options={MODAL_OPTIONS_59} label="MODAL" />
            <ObjectChips value={be} onChange={setBe} options={BE_OPTIONS_59} label="BE / HAVE BEEN" />

            <div className="l59-builder-slot">
              <small>V3</small>
              <ChoiceList59
                options={[...new Set([task.v3, "repaired", "built", "steal"])]}
                value={v3}
                ariaLabel="V3"
                className="l59-choice-center"
                onPick={(option) => {
                  setV3(option);
                  setChecked(false);
                }}
              />
            </div>
          </div>

          <div className="l59-builder-out" role="status" aria-live="polite">
            <small style={{ font: "700 0.62rem L59Latin, sans-serif", letterSpacing: "0.1em", color: "#7b8da5" }}>
              YOUR SENTENCE
            </small>
            <span className="l59-en">
              {subject && modal && be && v3 ? `${subject} ${modal} ${be} ${v3}.` : "…"}
            </span>
            {!checked && <p className="l59-small">اختر الفتحات الأربع ثم اضغط «تحقّق من التركيب».</p>}
          </div>

          <div className="l59-actions">
            <Btn59 disabled={!subject || !modal || !be || !v3} onClick={() => setChecked(true)}>
              تحقّق من التركيب
            </Btn59>
            <Btn59 variant="soft" onClick={reset}>
              ↺ مسح
            </Btn59>
          </div>

          {checked && (
            <div className={`l59-lab-result ${done ? "is-right" : "is-wrong"}`} role="status">
              {done ? (
                <>
                  <b>✓ تركيب صحيح</b>
                  <En59>{task.final}</En59>
                  <span>{task.finalAr}</span>
                  <span>{task.why}</span>
                </>
              ) : (
                <>
                  <b>✕ التركيب غير مكتمل الصحة</b>
                  <span>
                    المطلوب: <En59>{task.subjectSlot}</En59> · <En59>{task.modal}</En59> ·{" "}
                    <En59>{task.be}</En59> · <En59>{task.v3}</En59>
                  </span>
                  <span>{task.why}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   C — Modal Perfect Timeline
   ============================================================ */

const TIMELINE_59 = [
  {
    form: "should be completed",
    en: "The report should be completed.",
    ar: "ينبغي إنجاز التقرير.",
    when: "الحاضر / المستقبل",
    pill: "now" as const,
    why: "نصيحة عن شيء يجب أن يحدث الآن أو لاحقًا.",
  },
  {
    form: "should have been completed",
    en: "The report should have been completed.",
    ar: "كان ينبغي أن يكون التقرير قد أُنجز.",
    when: "الماضي",
    pill: "past" as const,
    why: "نصيحة أو لوم على شيء كان ينبغي أن يحدث في الماضي.",
  },
  {
    form: "must be completed",
    en: "The report must be completed.",
    ar: "يجب إنجاز التقرير.",
    when: "الحاضر / المستقبل",
    pill: "now" as const,
    why: "ضرورة أو إلزام الآن — حكم لا استنتاج.",
  },
  {
    form: "must have been completed",
    en: "The report must have been completed.",
    ar: "لا بد أن التقرير قد أُنجز.",
    when: "الماضي",
    pill: "past" as const,
    why: "استنتاج قوي بأن شيئًا وقع في الماضي — ليس أمرًا.",
  },
];

const TIMELINE_TASKS_59 = [
  {
    prompt: "The road should have been repaired.",
    options: ["نصيحة عن الحاضر", "نصيحة عن الماضي", "استنتاج عن الماضي", "إمكانية الآن"],
    answer: "نصيحة عن الماضي",
    why: "should have been + V3 = شيء كان ينبغي أن يحدث في الماضي.",
  },
  {
    prompt: "The road must be repaired.",
    options: ["ضرورة الآن", "استنتاج عن الماضي", "احتمال ضعيف", "نصيحة عن الماضي"],
    answer: "ضرورة الآن",
    why: "must be + V3 = إلزام؛ ولو كانت استنتاجًا عن الماضي لصار must have been + V3.",
  },
  {
    prompt: "The road must have been repaired.",
    options: ["ضرورة الآن", "نصيحة عن الماضي", "استنتاج قوي عن الماضي", "منع"],
    answer: "استنتاج قوي عن الماضي",
    why: "must have been + V3 = «لا بد أنه…» أي استنتاج، لا إلزام.",
  },
  {
    prompt: "The road could have been repaired.",
    options: ["إمكانية في الماضي لم تُستثمر", "إمكانية الآن", "استنتاج قوي", "نصيحة"],
    answer: "إمكانية في الماضي لم تُستثمر",
    why: "could have been + V3 = كان من الممكن… لكنه لم يحدث بالضرورة.",
  },
];

export function TimelineLab59() {
  const [tab, setTab] = useState<"show" | "test">("show");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  return (
    <section className="l59-lab" data-l59-lab="timeline">
      <div className="l59-lab-head">
        <div className="l59-kicker">
          <span>C</span>MODAL PERFECT TIMELINE
        </div>
        <h2>خط الزمن: حاضر أم ماضٍ؟</h2>
        <p className="l59-lead">
          أربع جمل تبدو متشابهة، لكن كلمة <En59>have been</En59> تنقل الجملة من «مطلوب الآن» إلى «كان/لا بد أنه
          في الماضي». اقرأ الشريط الزمني ثم اختبر نفسك.
        </p>
      </div>

      <div className="l59-lab-panel">
        <div className="l59-usage-tabs" role="tablist" aria-label="وضع خط الزمن">
          <button type="button" role="tab" aria-pressed={tab === "show"} onClick={() => setTab("show")}>
            اقرأ الفروق
          </button>
          <button type="button" role="tab" aria-pressed={tab === "test"} onClick={() => setTab("test")}>
            اختبر نفسك
          </button>
        </div>

        {tab === "show" ? (
          <div className="l59-timeline">
            <div className="l59-timebar" aria-hidden>
              <span>NOW / FUTURE</span>
              <i />
              <span>PAST</span>
            </div>
            {TIMELINE_59.map((row) => (
              <div className="l59-timeline-row" key={row.form}>
                <div>
                  <En59 style={{ fontWeight: 700 }}>{row.en}</En59>
                  <small style={{ display: "block" }}>{row.ar}</small>
                </div>
                <div>
                  <span className={`l59-pill l59-pill--${row.pill}`} style={{ marginBottom: "0.25rem" }}>
                    {row.when}
                  </span>
                  <small style={{ display: "block" }}>{row.why}</small>
                </div>
                <div className="l59-formula" style={{ padding: "0.35rem 0.5rem" }}>
                  <En59 style={{ fontWeight: 700, fontSize: "0.86rem" }}>{row.form}</En59>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="l59-practice">
            <p className="l59-small">اختر المعنى لكل جملة، ثم اضغط «تحقّق من الإجابات».</p>
            {TIMELINE_TASKS_59.map((task, i) => (
              <div className="l59-block" key={task.prompt}>
                <h3>
                  {i + 1}. <En59>{task.prompt}</En59>
                </h3>
                <ChoiceList59
                  options={task.options}
                  value={answers[i] ?? ""}
                  ariaLabel={`معنى الجملة ${i + 1}`}
                  onPick={(option) => {
                    setAnswers((prev) => ({ ...prev, [i]: option }));
                    setChecked(false);
                  }}
                />
                {checked && answers[i] && (
                  <div className={`l59-lab-result ${answers[i] === task.answer ? "is-right" : "is-wrong"}`} role="status">
                    {answers[i] === task.answer ? "✓ صحيح — " : `✕ الصحيح: ${task.answer} — `}
                    {task.why}
                  </div>
                )}
              </div>
            ))}
            <div className="l59-actions">
              <Btn59
                disabled={Object.keys(answers).length < TIMELINE_TASKS_59.length}
                onClick={() => setChecked(true)}
              >
                تحقّق من الإجابات
              </Btn59>
              <Btn59
                variant="soft"
                onClick={() => {
                  setAnswers({});
                  setChecked(false);
                }}
              >
                ↺ إعادة
              </Btn59>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   D — Meaning Detective
   ============================================================ */

export type Meaning59 = "إلزام" | "نصيحة" | "إمكانية" | "استنتاج قوي" | "احتمال في الماضي" | "نصيحة أو توقّع في الماضي";

const MEANING_OPTIONS_59: Meaning59[] = ["إلزام", "نصيحة", "إمكانية", "استنتاج قوي", "احتمال في الماضي", "نصيحة أو توقّع في الماضي"];

const DETECTIVE_59: { en: string; ar: string; answer: Meaning59; why: string }[] = [
  { en: "All machines must be checked.", ar: "يجب فحص جميع الآلات.", answer: "إلزام", why: "must be + V3 = ضرورة." },
  {
    en: "The form should be signed by the manager.",
    ar: "ينبغي أن يوقّع المدير النموذج.",
    answer: "نصيحة",
    why: "should be + V3 = توصية، لا أمرًا صارمًا.",
  },
  {
    en: "The results can be announced today.",
    ar: "يمكن الإعلان عن النتائج اليوم.",
    answer: "إمكانية",
    why: "can be + V3 = إمكانية متاحة.",
  },
  {
    en: "The documents must have been lost.",
    ar: "لا بد أن الوثائق قد ضاعت.",
    answer: "استنتاج قوي",
    why: "must have been + V3 = استنتاج عن الماضي، لا إلزام.",
  },
  {
    en: "The flight might have been delayed.",
    ar: "ربما تأخرت الرحلة.",
    answer: "احتمال في الماضي",
    why: "might have been + V3 = احتمال متعلق بالماضي.",
  },
  {
    en: "The report should have been submitted yesterday.",
    ar: "كان ينبغي تسليم التقرير أمس.",
    answer: "نصيحة أو توقّع في الماضي",
    why: "should have been + V3 = نصيحة أو لوم يتعلق بالماضي.",
  },
  {
    en: "This medicine mustn't be used without advice.",
    ar: "يجب عدم استخدام هذا الدواء دون استشارة.",
    answer: "إلزام",
    why: "mustn't be + V3 = منع، وهو شكل من أشكال الإلزام في الاتجاه المعاكس.",
  },
];

export function MeaningDetective59() {
  const [picks, setPicks] = useState<Record<number, Meaning59>>({});
  const [checked, setChecked] = useState(false);
  const answered = Object.keys(picks).length;
  const score = DETECTIVE_59.reduce((n, item, i) => (picks[i] === item.answer ? n + 1 : n), 0);

  return (
    <section className="l59-lab" data-l59-lab="detective">
      <div className="l59-lab-head">
        <div className="l59-kicker">
          <span>D</span>MEANING DETECTIVE
        </div>
        <h2>محقق المعنى</h2>
        <p className="l59-lead">
          سبع جمل، كل واحدة تحمل معنى مختلفًا. لا يظهر التصحيح قبل ضغط «تحقّق من الملاحظات»، ثم يشرح لك السبب في
          كل سطر.
        </p>
      </div>

      <div className="l59-lab-panel">
        <div className="l59-error-list">
          {DETECTIVE_59.map((item, i) => (
            <div className="l59-error-row" key={item.en}>
              <En59 className="l59-righttext">{item.en}</En59>
              <small>{item.ar}</small>
              <ChoiceList59
                options={MEANING_OPTIONS_59}
                value={picks[i] ?? ""}
                ariaLabel={`معنى الجملة ${i + 1}`}
                onPick={(option) => {
                  setPicks((prev) => ({ ...prev, [i]: option as Meaning59 }));
                  setChecked(false);
                }}
              />
              {checked && picks[i] && (
                <div className={`l59-lab-result ${picks[i] === item.answer ? "is-right" : "is-wrong"}`} role="status">
                  {picks[i] === item.answer ? "✓ " : `✕ الصحيح: ${item.answer} — `}
                  {item.why}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="l59-actions">
          <Btn59 disabled={answered < DETECTIVE_59.length} onClick={() => setChecked(true)}>
            تحقّق من الملاحظات
          </Btn59>
          <Btn59
            variant="soft"
            onClick={() => {
              setPicks({});
              setChecked(false);
            }}
          >
            ↺ إعادة
          </Btn59>
          {checked && (
            <span className="l59-small" role="status">
              نتيجتك: {score} / {DETECTIVE_59.length}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   E — Transformation Engine (مراحل حقيقية، لا حل فوري)
   ============================================================ */

export function TransformEngine59() {
  const [taskIndex, setTaskIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const task = TRANSFORM_DEMOS_59[taskIndex];
  const finished = stage >= task.stages.length;

  return (
    <section className="l59-lab" data-l59-lab="engine">
      <div className="l59-lab-head">
        <div className="l59-kicker">
          <span>E</span>TRANSFORMATION ENGINE
        </div>
        <h2>محرّك التحويل المتقدّم</h2>
        <p className="l59-lead">
          التحويل يحدث خطوة بخطوة: نبدأ بالمفعول به، نثبّت الفعل الناقص، ثم نختار بين be وhave been بحسب الزمن.
        </p>
      </div>

      <div className="l59-lab-panel">
        <div className="l59-engine-nav" role="group" aria-label="اختر جملة للتحويل">
          {TRANSFORM_DEMOS_59.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={i === taskIndex}
              onClick={() => {
                setTaskIndex(i);
                setStage(0);
              }}
            >
              {item.modal} · {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        <div className="l59-block">
          <small className="l59-tagline">ACTIVE SENTENCE</small>
          <En59 style={{ fontWeight: 700, fontSize: "1.05rem" }}>{task.active}</En59>
          <p className="l59-small">{task.activeAr}</p>
          <div className="l59-tags">
            <span>
              Subject: <En59>{task.subject}</En59>
            </span>
            <span>
              Modal: <En59>{task.modal}</En59>
            </span>
            <span>
              Base verb: <En59>{task.base}</En59>
            </span>
            <span>
              Object: <En59>{task.object}</En59>
            </span>
          </div>
        </div>

        <div className="l59-engine">
          <div className="l59-engine-stages">
            {task.stages.slice(0, stage).map((row, i) => (
              <div className={`l59-engine-stage${i === stage - 1 ? " is-latest" : ""}`} key={row.label}>
                <i>{i + 1}</i>
                <div>
                  <En59>{row.value}</En59>
                  <small>{row.label}</small>
                </div>
              </div>
            ))}
            {!finished && (
              <div className="l59-engine-stage" data-l59-next-stage>
                <i>{stage + 1}</i>
                <div>
                  <b style={{ color: "#8a5a08" }}>{task.stages[stage].label}</b>
                  <small>
                    اضغط «{stage === 0 ? "ابدأ التحويل" : "الخطوة التالية"}» لتظهر نتيجة هذه الخطوة قبل الانتقال.
                  </small>
                </div>
              </div>
            )}
          </div>

          <div className="l59-actions">
            <Btn59 onClick={() => setStage((s) => Math.min(task.stages.length, s + 1))} disabled={finished}>
              {stage === 0 ? "ابدأ التحويل" : "الخطوة التالية →"}
            </Btn59>
            <Btn59 variant="soft" onClick={() => setStage(0)} disabled={stage === 0}>
              ↺ من البداية
            </Btn59>
          </div>

          {finished && (
            <div className="l59-lab-result is-right" role="status">
              <b>✓ التحويل اكتمل</b>
              <En59 style={{ fontWeight: 700 }}>{task.passive}</En59>
              <span>{task.passiveAr}</span>
              <span>{task.why}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   F — Causative Lab
   ============================================================ */

const CAUSATIVE_CARDS_59 = [
  {
    en: "The car was repaired.",
    ar: "أُصلحت السيارة.",
    who: "لا نعرف من رتّب الإصلاح",
    tag: "PASSIVE",
    note: "مبني للمجهول عادي: نركّز على السيارة وعلى ما وقع عليها. لا نعرف من قام بالإصلاح ولا من رتّبه.",
  },
  {
    en: "I had the car repaired.",
    ar: "جعلت السيارة تُصلح، أي رتّبت لإصلاحها.",
    who: "أنا من رتّب الخدمة",
    tag: "CAUSATIVE",
    note: "have + المفعول به + V3: أنا لم أُصلحها بنفسي، بل رتّبت أن يقوم غيري بذلك؛ وهي الصياغة المحايدة/الرسمية.",
  },
  {
    en: "I got the car repaired.",
    ar: "جعلت السيارة تُصلح (بصياغة أكثر عامية).",
    who: "أنا من رتّب الخدمة",
    tag: "CAUSATIVE · GET",
    note: "get + المفعول به + V3: نفس تركيب have في المعنى، وget أكثر شيوعًا في الكلام اليومي.",
  },
];

const CAUSATIVE_TASKS_59 = [
  {
    prompt: "We had the windows cleaned.",
    options: ["نظّفنا النوافذ بأنفسنا.", "رتّبنا أن ينظّف شخص آخر النوافذ.", "لم تُنظّف النوافذ."],
    answer: "رتّبنا أن ينظّف شخص آخر النوافذ.",
    why: "had + object + V3 = causative: الخدمة نُفّذت بواسطة غيرنا بناءً على ترتيبنا.",
  },
  {
    prompt: "She got her documents translated.",
    options: ["هي ترجمت الوثائق.", "جعلت وثائقها تُترجم (بواسطة مترجم).", "الوثائق لم تُترجم."],
    answer: "جعلت وثائقها تُترجم (بواسطة مترجم).",
    why: "got + object + V3 = causative بصيغة get.",
  },
  {
    prompt: "The documents were translated.",
    options: ["نعرف من رتّب الترجمة.", "مبني للمجهول عادي — لا نعرف من رتّب أو من ترجم.", "الجملة causative."],
    answer: "مبني للمجهول عادي — لا نعرف من رتّب أو من ترجم.",
    why: "were translated = passive بسيط بلا causative، فلا معلومة عن ترتيب الخدمة.",
  },
];

export function CausativeLab59() {
  const [open, setOpen] = useState(0);
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  return (
    <section className="l59-lab" data-l59-lab="causative">
      <div className="l59-lab-head">
        <div className="l59-kicker">
          <span>F</span>CAUSATIVE LAB
        </div>
        <h2>معمل السبب: من قام بالفعل؟ ومن رتّبه؟</h2>
        <p className="l59-lead">
          <En59>{CAUSATIVE_59.formula}</En59> — التركيب نفسه يضيف معلومة جديدة: أن صاحب الجملة رتّب تنفيذ الخدمة.
          اضغط على كل بطاقة لتقرأ الفرق.
        </p>
      </div>

      <div className="l59-lab-panel">
        <div className="l59-causative">
          {CAUSATIVE_CARDS_59.map((card, i) => (
            <article key={card.en} className={open === i ? "is-active" : ""}>
              <small style={{ font: "700 0.6rem L59Latin, sans-serif", letterSpacing: "0.1em", color: "#7b8da5" }}>
                {card.tag}
              </small>
              <En59 style={{ fontWeight: 700 }}>{card.en}</En59>
              <p>{card.ar}</p>
              <Btn59 variant="soft" onClick={() => setOpen(i)}>
                {open === i ? "مفتوحة الآن" : "اقرأ الفرق"}
              </Btn59>
            </article>
          ))}
        </div>

        <div className="l59-note">
          <En59 style={{ fontWeight: 700, fontSize: "1rem", display: "block", marginBottom: "0.25rem" }}>
            {CAUSATIVE_CARDS_59[open].en}
          </En59>
          <b>{CAUSATIVE_CARDS_59[open].who}</b> — {CAUSATIVE_CARDS_59[open].note}
        </div>

        <h3 style={{ fontSize: "1.02rem" }}>اختبر الفرق</h3>
        {CAUSATIVE_TASKS_59.map((task, i) => (
          <div className="l59-block" key={task.prompt}>
            <h3>
              {i + 1}. <En59>{task.prompt}</En59>
            </h3>
            <ChoiceList59
              options={task.options}
              value={picks[i] ?? ""}
              ariaLabel={`معنى causative ${i + 1}`}
              onPick={(option) => {
                setPicks((prev) => ({ ...prev, [i]: option }));
                setChecked(false);
              }}
            />
            {checked && picks[i] && (
              <div className={`l59-lab-result ${picks[i] === task.answer ? "is-right" : "is-wrong"}`} role="status">
                {picks[i] === task.answer ? "✓ " : `✕ الصحيح: ${task.answer} — `}
                {task.why}
              </div>
            )}
          </div>
        ))}
        <div className="l59-actions">
          <Btn59 disabled={Object.keys(picks).length < CAUSATIVE_TASKS_59.length} onClick={() => setChecked(true)}>
            تحقّق من الفروق
          </Btn59>
          <Btn59
            variant="soft"
            onClick={() => {
              setPicks({});
              setChecked(false);
            }}
          >
            ↺ إعادة
          </Btn59>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   G — Error Detective (الأخطاء السبعة من المصدر)
   ============================================================ */

const ERROR_FIX_OPTIONS_59: Record<number, string[]> = {
  21: ["The work can be completed.", "The work can is completed.", "The work can completed."],
  22: ["The rules must be followed.", "The rules must followed.", "The rules must been followed."],
  23: ["The car should be repaired.", "The car should be repair.", "The car should repaired."],
  24: ["The report should have been completed.", "The report should have completed.", "The report should been completed."],
  25: ["The door must have been locked.", "The door must be locked.", "The door must locked."],
  26: ["The report doesn't have to be submitted today.", "The report mustn't be submitted today.", "The report don't have to be submitted today."],
  27: ["The problem should have been solved.", "The problem should be solved.", "The problem should been solved."],
};

export function ErrorDetective59() {
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  return (
    <section className="l59-lab" data-l59-lab="errors">
      <div className="l59-lab-head">
        <div className="l59-kicker">
          <span>G</span>ERROR DETECTION
        </div>
        <h2>كاشف الأخطاء السبعة</h2>
        <p className="l59-lead">
          هذه هي الأخطاء السبعة الشائعة في المبني للمجهول المتقدّم. لكل خطأ ثلاثة اختيارات: اختر الصياغة
          الصحيحة، ولا يظهر التفسير قبل الضغط على «تحقّق من الإصلاحات».
        </p>
      </div>

      <div className="l59-lab-panel">
        <div className="l59-error-list">
          {ERRORS_59.map((error) => (
            <div className="l59-error-row" key={error.n}>
              <small style={{ font: "700 0.62rem L59Latin, sans-serif", letterSpacing: "0.1em", color: "#94a6bc" }}>
                ERROR {String(error.n - 20).padStart(2, "0")} · {error.tag}
              </small>
              <b style={{ color: "#8f1f3c", fontSize: "0.9rem" }}>{error.title}</b>
              <En59 className="l59-wrongtext">{error.wrong}</En59>
              <ChoiceList59
                options={ERROR_FIX_OPTIONS_59[error.n]}
                value={picks[error.n] ?? ""}
                ariaLabel={`إصلاح الخطأ ${error.n - 20}`}
                onPick={(option) => {
                  setPicks((prev) => ({ ...prev, [error.n]: option }));
                  setChecked(false);
                }}
              />
              {checked && picks[error.n] && (
                <div
                  className={`l59-lab-result ${picks[error.n] === error.right ? "is-right" : "is-wrong"}`}
                  role="status"
                >
                  {picks[error.n] === error.right ? <b>✓ إصلاح صحيح</b> : <b>✕ الصياغة الصحيحة: {error.right}</b>}
                  <span>{error.why}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="l59-actions">
          <Btn59 disabled={Object.keys(picks).length < ERRORS_59.length} onClick={() => setChecked(true)}>
            تحقّق من الإصلاحات
          </Btn59>
          <Btn59
            variant="soft"
            onClick={() => {
              setPicks({});
              setChecked(false);
            }}
          >
            ↺ إعادة
          </Btn59>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   H — Slot contrast: which structure is needed?
   ============================================================ */

const CONTRAST_ROWS_59 = [
  {
    id: "must-be",
    label: "must be + V3",
    kind: "modal" as SlotKind59,
    slots: [
      { kind: "modal" as SlotKind59, text: "must" },
      { kind: "be" as SlotKind59, text: "be" },
      { kind: "v3" as SlotKind59, text: "checked" },
    ],
    en: "The machine must be checked.",
    ar: "يجب فحص الآلة.",
    when: "ضرورة الآن",
  },
  {
    id: "must-have-been",
    label: "must have been + V3",
    kind: "past" as SlotKind59,
    slots: [
      { kind: "modal" as SlotKind59, text: "must" },
      { kind: "past" as SlotKind59, text: "have been" },
      { kind: "v3" as SlotKind59, text: "checked" },
    ],
    en: "The machine must have been checked.",
    ar: "لا بد أن الآلة قد فُحصت.",
    when: "استنتاج عن الماضي",
  },
  {
    id: "should-be",
    label: "should be + V3",
    kind: "modal" as SlotKind59,
    slots: [
      { kind: "modal" as SlotKind59, text: "should" },
      { kind: "be" as SlotKind59, text: "be" },
      { kind: "v3" as SlotKind59, text: "checked" },
    ],
    en: "The machine should be checked.",
    ar: "ينبغي فحص الآلة.",
    when: "نصيحة الآن",
  },
  {
    id: "should-have-been",
    label: "should have been + V3",
    kind: "past" as SlotKind59,
    slots: [
      { kind: "modal" as SlotKind59, text: "should" },
      { kind: "past" as SlotKind59, text: "have been" },
      { kind: "v3" as SlotKind59, text: "checked" },
    ],
    en: "The machine should have been checked.",
    ar: "كان ينبغي فحص الآلة.",
    when: "نصيحة أو لوم عن الماضي",
  },
  {
    id: "needs",
    label: "needs to be + V3",
    kind: "subject" as SlotKind59,
    slots: [
      { kind: "subject" as SlotKind59, text: "needs" },
      { kind: "be" as SlotKind59, text: "to be" },
      { kind: "v3" as SlotKind59, text: "checked" },
    ],
    en: "The machine needs to be checked.",
    ar: "تحتاج الآلة إلى أن تُفحص.",
    when: "حاجة إلى إجراء",
  },
  {
    id: "expected",
    label: "is expected to be + V3",
    kind: "extra" as SlotKind59,
    slots: [
      { kind: "extra" as SlotKind59, text: "is expected" },
      { kind: "be" as SlotKind59, text: "to be" },
      { kind: "v3" as SlotKind59, text: "checked" },
    ],
    en: "The machine is expected to be checked.",
    ar: "من المتوقع فحص الآلة.",
    when: "توقّع",
  },
];

export function SlotContrast59() {
  const [picked, setPicked] = useState(0);
  const row = CONTRAST_ROWS_59[picked];
  return (
    <section className="l59-lab" data-l59-lab="contrast">
      <div className="l59-lab-head">
        <div className="l59-kicker">
          <span>H</span>STRUCTURE CONTRAST
        </div>
        <h2>نفس الفعل، ستة تراكيب</h2>
        <p className="l59-lead">
          الفعل الأساسي <En59>check</En59> لا يتغيّر. ما يتغيّر هو الفتحات من حوله — وهي التي تحدّد إن كان
          المعنى إلزامًا أو نصيحة أو استنتاجًا أو توقعًا.
        </p>
      </div>
      <div className="l59-lab-panel">
        <div className="l59-usage-tabs" role="tablist" aria-label="اختر التركيب">
          {CONTRAST_ROWS_59.map((item, i) => (
            <button key={item.id} type="button" role="tab" aria-pressed={i === picked} onClick={() => setPicked(i)}>
              <En59>{item.label}</En59>
            </button>
          ))}
        </div>
        <div className="l59-explorer-out" role="status" aria-live="polite">
          <Formula59 parts={row.slots} />
          <En59 style={{ fontWeight: 700, fontSize: "1.05rem" }}>{row.en}</En59>
          <span>{row.ar}</span>
          <span className="l59-pill l59-pill--mean">{row.when}</span>
        </div>
        <div className="l59-tags">
          {CONTRAST_ROWS_59.map((item) => (
            <span key={item.id}>
              <En59>{item.label}</En59> — {item.when}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   I — Quick drill over the advanced structures (needs / supposed / expected)
   ============================================================ */

export function AdvancedDrill59() {
  const items = useMemo(
    () =>
      ADVANCED_59.flatMap((section) =>
        (section.lines ?? []).map((line) => ({
          prompt: line.en.replace(/\.$/, " ______."),
          answer: "",
          why: "",
          ar: line.ar,
          section: section.title,
        })),
      ),
    [],
  );
  const [i, setI] = useState(0);
  const item = items[i % items.length];

  return (
    <section className="l59-lab" data-l59-lab="advanced-drill">
      <div className="l59-lab-head">
        <div className="l59-kicker">
          <span>I</span>ADVANCED STRUCTURES DRILL
        </div>
        <h2>تدريب التراكيب المتقدّمة</h2>
        <p className="l59-lead">
          جمل المصدر كاملة في محطاتها. هنا نعرضها كتدريب فهم: اقرأ الجملة الإنجليزية واكتب ترجمتها العربية، ثم
          قارن بالمعنى الأصلي في المصدر.
        </p>
      </div>
      <div className="l59-lab-panel">
        <div className="l59-block">
          <h3>
            <En59>{item.prompt}</En59>
          </h3>
          <p className="l59-small">{item.section}</p>
        </div>
        <ArabicRecall59 key={i} target={item.ar} />
        <div className="l59-actions">
          <Btn59 onClick={() => setI(i + 1)}>جملة أخرى ↻</Btn59>
          <span className="l59-small">
            {i + 1} / {items.length}
          </span>
        </div>
      </div>
    </section>
  );
}

function ArabicRecall59({ target }: { target: string }) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const right = value.replace(/[.،؛;!?\s]/gu, "") === target.replace(/[.،؛;!?\s]/gu, "");
  return (
    <div className="l59-attempt" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
      <div className="l59-attempt-main">
        <label className="l59-small" htmlFor="l59-recall">
          اكتب الترجمة العربية كما تتذكّرها:
        </label>
        <input
          id="l59-recall"
          type="text"
          dir="rtl"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setChecked(false);
          }}
          style={{ direction: "rtl", textAlign: "right", fontFamily: "inherit" }}
          placeholder="اكتب الترجمة…"
        />
        <div className="l59-actions">
          <Btn59 disabled={!value.trim()} onClick={() => setChecked(true)}>
            قارن بالمعنى
          </Btn59>
        </div>
        {checked && (
          <div className={`l59-feedback ${right ? "is-right" : "is-wrong"}`} role="status">
            <b>{right ? "✓ مطابق للمعنى الأصلي" : "المعنى الأصلي في المصدر:"}</b>
            <span>{target}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   J — V3 accuracy strip (أفعال شاذة)
   ============================================================ */

export function V3Lab59() {
  const [mode, setMode] = useState<"base" | "v3">("base");
  const [query, setQuery] = useState("");
  const rows = V3_LEDGER_59.filter((row) =>
    query.trim() ? row.base.includes(query.trim().toLowerCase()) || row.v3.includes(query.trim().toLowerCase()) : true,
  );

  return (
    <section className="l59-lab" data-l59-lab="v3">
      <div className="l59-lab-head">
        <div className="l59-kicker">
          <span>J</span>V3 CHECK
        </div>
        <h2>مختبر التصريف الثالث</h2>
        <p className="l59-lead">
          أهم الأفعال التي يستخدمها الدرس في صيغة V3: الأفعال المنتظمة العشرون الأكثر حضورًا، ثم الأفعال الشاذة
          التسعة التي تحتاج حفظًا منفصلًا. جرّب أن تغطّي عمود V3 وتتذكّر الصيغة، ثم اكشف.
        </p>
      </div>
      <div className="l59-lab-panel">
        <div className="l59-control-grid">
          <label>
            اتّجاه العرض
            <select value={mode} onChange={(event) => setMode(event.target.value as "base" | "v3")}>
              <option value="base">Base → V3</option>
              <option value="v3">V3 → Base</option>
            </select>
          </label>
          <label>
            ابحث
            <input type="text" dir="ltr" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="repair / stolen" />
          </label>
        </div>
        <div className="l59-tags">
          {rows.map((row) => (
            <span key={row.base}>
              <En59>{mode === "base" ? row.base : row.v3}</En59>
              <span aria-hidden>→</span>
              <En59>{mode === "base" ? row.v3 : row.base}</En59>
              {row.note && <small style={{ color: "#9a5b1c" }}>{row.note}</small>}
            </span>
          ))}
        </div>
        <p className="l59-small">
          الأفعال الشاذة تستحق الحفظ منفصلة: <En59>send → sent</En59> · <En59>steal → stolen</En59> ·{" "}
          <En59>break → broken</En59> · <En59>wear → worn</En59> · <En59>write → written</En59> ·{" "}
          <En59>build → built</En59> · <En59>cut → cut</En59>.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   K — Practice set renderer (reuses Attempt59)
   ============================================================ */

export function PracticeSet59({
  group,
}: {
  group: { title: string; instruction: string; items: { prompt: string; hint?: string; options?: string[]; answer: string; why: string; ar?: string }[] };
}) {
  return (
    <div className="l59-practice" data-l59-practice={group.title}>
      <p className="l59-lead">{group.instruction}</p>
      <div className="l59-practice-list">
        {group.items.map((item, i) => (
          <Attempt59 key={`${group.title}-${i}`} item={item} index={i + 1} />
        ))}
      </div>
    </div>
  );
}

/** مفتاح سريع للتدريبات — يُستخدم في فضاء المعلم فقط */
export function PracticeKey59({
  groups,
}: {
  groups: { title: string; items: { prompt: string; answer: string; why: string }[] }[];
}) {
  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      {groups.map((group, i) => (
        <details key={group.title}>
          <summary>
            {i + 1}. {group.title} · {group.items.length} بندًا
          </summary>
          <ol>
            {group.items.map((item, j) => (
              <li key={j}>
                <En59>{item.prompt}</En59>
                <p>
                  <b>الإجابة:</b> <En59>{item.answer}</En59>
                </p>
                <p>{item.why}</p>
              </li>
            ))}
          </ol>
        </details>
      ))}
    </div>
  );
}
