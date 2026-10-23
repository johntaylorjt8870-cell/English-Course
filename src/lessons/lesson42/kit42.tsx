import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { En42, Text42, Note42, Panel42, Tip42, Sentence42 } from "./design42";
import { isCorrect42, isPairCorrect42, itemsFor42, type PracticeItem42 } from "./practice42";
import { sectionLines42 } from "./ledger42";

// ============================================================
// مساحة إجابات الدرس — تبقى أثناء الجلسة وتُعاد عند تبديل الشرائح.
// ============================================================
const Workspace42 = createContext<{ values: Record<string, string>; set: (key: string, value: string) => void }>({
  values: {},
  set: () => {},
});

export function Workspace42Provider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const api = useMemo(() => ({ values, set: (key: string, value: string) => setValues((v) => ({ ...v, [key]: value })) }), [values]);
  return <Workspace42.Provider value={api}>{children}</Workspace42.Provider>;
}

export function useAnswer42(key: string): [string, (value: string) => void] {
  const store = useContext(Workspace42);
  return [store.values[key] ?? "", (value) => store.set(key, value)];
}

// ============================================================
// عناصر التفاعل المشتركة
// ============================================================
function Choice42({
  options,
  value,
  onChange,
  label,
  english = true,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  english?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={`rounded-xl border-2 px-3.5 py-2 text-base font-bold transition ${
              active ? "border-violet-500 bg-violet-600 text-white shadow" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
            }`}
          >
            {english ? <En42>{option}</En42> : <Text42 text={option} />}
          </button>
        );
      })}
    </div>
  );
}

function Feedback42({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div role="status" className={`mt-3 rounded-2xl border-2 p-3 text-base font-semibold ${ok ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"}`}>
      <span className="mr-1 font-bold">{ok ? "✓ صحيح" : "✕ راجع"}</span> — {children}
    </div>
  );
}

/** مختبر تصنيف: جملة + خيارات وظيفة + تفسير فوري. */
function Classifier42({
  rows,
  options,
  storeKey,
  english = false,
  intro,
  offset = 0,
}: {
  rows: { en: string; answer: string; why: string }[];
  options: string[];
  storeKey: string;
  english?: boolean;
  intro: string;
  /** بداية الترقيم عندما يُقسَّم المختبر على شريحتين. */
  offset?: number;
}) {
  const [picks, setPicks] = useAnswer42(storeKey);
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  return (
    <>
      <p className="mb-3 text-base text-slate-600">
        <Text42 text={intro} />
      </p>
      <div className="grid gap-3">
        {rows.map((row, i) => {
          const value = chosen[String(i)] ?? "";
          return (
            <div key={row.en} className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-900 text-sm font-bold text-white">{offset + i + 1}</span>
                <p dir="ltr" className="font-en text-lg font-bold text-slate-800">
                  {row.en}
                </p>
              </div>
              <div className="mt-2">
                <Choice42
                  options={options}
                  value={value}
                  label={`وظيفة الجملة ${offset + i + 1}`}
                  english={english}
                  onChange={(next) => setPicks(JSON.stringify({ ...chosen, [String(i)]: next }))}
                />
              </div>
              {value && <Feedback42 ok={value === row.answer}>{value === row.answer ? <Text42 text={row.why} /> : <Text42 text={`الصحيح: ${row.answer}. ${row.why}`} />}</Feedback42>}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ============================================================
// مختبر 1 — باني الجملة: Subject + CAN/COULD + V1
// ============================================================
const BUILD_TASKS = [
  {
    hint: "أستطيع السباحة.",
    subject: "I",
    modal: "can",
    verb: "swim",
    rest: "",
    why: "I + can + swim (V1). القاعدة الذهبية: بعد CAN نستخدم V1 دون to ودون s ودون ing.",
  },
  {
    hint: "تستطيع التحدث بالإنجليزية.",
    subject: "She",
    modal: "can",
    verb: "speak",
    rest: "English",
    why: "مع She لا تتغير can، والفعل speak يبقى V1؛ علامة المفرد لا تُضاف بعد الفعل الناقص.",
  },
  {
    hint: "كانوا يستطيعون الركض بسرعة.",
    subject: "They",
    modal: "could",
    verb: "run",
    rest: "fast",
    why: "الماضي يُحمَل على could، ويبقى run بصيغة V1.",
  },
  {
    hint: "لا أستطيع فتح النافذة.",
    subject: "I",
    modal: "can't",
    verb: "open",
    rest: "the window",
    why: "النفي يُبنى بـ n't على الفعل الناقص نفسه، وبعده V1: open.",
  },
];

const SUBJECTS = ["I", "She", "They", "He"];
const MODALS = ["can", "could", "can't", "couldn't"];
const VERBS = ["swim", "speak", "run", "open", "swims", "speaking", "to swim", "ran"];

export function BuildLab42({ part = 1 }: { part?: 1 | 2 }) {
  // أربعة تمارين على شريحتين بدل شريحة واحدة طويلة.
  const tasks = part === 1 ? BUILD_TASKS.slice(0, 2) : BUILD_TASKS.slice(2);
  const [picks, setPicks] = useAnswer42(`lab-build-${part}`);
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  return (
    <Panel42 title={`ابنِ جملة CAN/COULD قطعة قطعة (${part}/2)`} kicker={`LAB 01${part === 2 ? "B" : "A"} · SENTENCE BUILDER`}>
      <Tip42>
        <Text42 text="اختر الفاعل ثم الفعل الناقص ثم صيغة الفعل الرئيسي. المختبر يسمّي القاعدة التي انكسرت إن وجدت." />
      </Tip42>
      <div className="mt-3 grid gap-3">
        {tasks.map((task, i) => {
          const subject = chosen[`${i}-subject`] ?? "";
          const modal = chosen[`${i}-modal`] ?? "";
          const verb = chosen[`${i}-verb`] ?? "";
          const done = subject !== "" && modal !== "" && verb !== "";
          const correct = subject === task.subject && modal === task.modal && verb === task.verb;
          const broken =
            verb === "" || !["swim", "speak", "run", "open"].includes(verb)
              ? "القاعدة المكسورة: بعد CAN/COULD يأتي V1 فقط — لا s ولا to ولا ing ولا زمن ماضٍ."
              : "";
          return (
            <div key={task.hint} className="rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-sm font-bold text-slate-500">
                <Text42 text={`المعنى المطلوب: ${task.hint}`} />
              </p>
              <div className="mt-2 grid gap-2 md:grid-cols-3">
                <div>
                  <p className="mb-1 text-sm font-bold text-slate-500">1) الفاعل</p>
                  <Choice42 options={SUBJECTS} value={subject} label={`فاعل الجملة ${i + 1}`} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [`${i}-subject`]: next }))} />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-slate-500">2) الفعل الناقص</p>
                  <Choice42 options={MODALS} value={modal} label={`الفعل الناقص ${i + 1}`} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [`${i}-modal`]: next }))} />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-slate-500">3) صيغة الفعل الرئيسي</p>
                  <Choice42 options={VERBS} value={verb} label={`صيغة الفعل ${i + 1}`} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [`${i}-verb`]: next }))} />
                </div>
              </div>
              {done && (
                <div className="mt-3">
                  <Sentence42
                    tokens={[
                      { text: subject, role: "subject" },
                      { text: modal, role: "modal" },
                      { text: verb, role: "main" },
                      ...(task.rest ? [{ text: task.rest, role: "rest" as const }] : []),
                    ]}
                  />
                </div>
              )}
              {done && !correct && broken && (
                <p className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
                  <Text42 text={broken} />
                </p>
              )}
              {done && (
                <Feedback42 ok={correct}>
                  {correct ? (
                    <Text42 text={task.why} />
                  ) : (
                    <Text42 text={`البناء الصحيح: ${task.subject} ${task.modal} ${task.verb}${task.rest ? ` ${task.rest}` : ""}. ${task.why}`} />
                  )}
                </Feedback42>
              )}
            </div>
          );
        })}
      </div>
    </Panel42>
  );
}

// ============================================================
// مختبر 2 — هل تتغير الصيغة مع الفاعل؟
// ============================================================
const FORM_ROWS = [
  { pronoun: "He", plain: "He speaks English.", withModal: "He can speak English.", trap: "He cans speak English." },
  { pronoun: "She", plain: "She writes stories.", withModal: "She can write stories.", trap: "She can writes stories." },
  { pronoun: "Omar", plain: "Omar solves difficult problems.", withModal: "Omar can solve difficult problems.", trap: "Omar can solves difficult problems." },
];

export function FormLab42() {
  const [index, setIndex] = useAnswer42("lab-form-index");
  const active = Number(index || "0");
  const row = FORM_ROWS[active] ?? FORM_ROWS[0];
  return (
    <Panel42 title="آلة الفاعل: هل تتغير can؟" kicker="LAB 02 · SUBJECT MACHINE">
      <Choice42
        options={FORM_ROWS.map((r) => r.pronoun)}
        value={row.pronoun}
        label="اختر الفاعل"
        onChange={(next) => setIndex(String(FORM_ROWS.findIndex((r) => r.pronoun === next)))}
      />
      <div className="mt-3 space-y-2">
        <p className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-500">
          <Text42 text="في Present Simple:" /> <En42 className="text-lg text-slate-800">{row.plain}</En42>
        </p>
        <p className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2">
          <span className="text-sm font-bold text-emerald-800">مع CAN: </span>
          <En42 className="text-lg font-extrabold text-emerald-900">{row.withModal}</En42>
        </p>
        <p className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-3 py-2">
          <span className="text-sm font-bold text-rose-800">غير صحيح: </span>
          <En42 className="text-lg font-bold text-rose-900 line-through decoration-rose-300">{row.trap}</En42>
        </p>
      </div>
      <Note42 emoji="🔬">
        <Text42 text="CAN فعل ناقص ثابت الصيغة مع جميع الضمائر، والفعل الرئيسي الذي يأتي بعده يبقى بصيغة V1. لذلك لا تظهر cans ولا can plays." />
      </Note42>
    </Panel42>
  );
}

// ============================================================
// مختبر 3 — الإجابات القصيرة
// ============================================================
const SHORT_TASKS = [
  { q: "Can you swim?", options: ["Yes, I can.", "No, I can't.", "Yes, I do.", "No, I don't."], answers: ["Yes, I can.", "No, I can't."], why: "إذا كان السؤال يبدأ بـ CAN فإن الإجابة القصيرة تستخدم CAN أيضًا، لا do." },
  { q: "Can she speak English?", options: ["Yes, she can.", "No, she can't.", "Yes, she does.", "No, she doesn't."], answers: ["Yes, she can.", "No, she can't."], why: "الإجابة القصيرة تعيد الفعل الناقص can مع الضمير she." },
  { q: "Can they help us?", options: ["Yes, they can.", "No, they can't.", "Yes, they do.", "Yes, they are."], answers: ["Yes, they can.", "No, they can't."], why: "نعيد can نفسها؛ ولا نقول Yes, I do مع سؤال بدأ بـ can." },
  { q: "Could your grandfather speak English?", options: ["Yes, he could.", "No, he couldn't.", "Yes, he did.", "Yes, he can."], answers: ["Yes, he could.", "No, he couldn't."], why: "سؤال الماضي بـ could يأخذ إجابة قصيرة بـ could / couldn't." },
];

export function ShortLab42() {
  const [picks, setPicks] = useAnswer42("lab-short");
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  return (
    <Panel42 title="اختر الإجابة القصيرة الطبيعية" kicker="LAB 03 · SHORT ANSWERS">
      <p className="mb-3 text-base text-slate-600">
        <Text42 text="لكل سؤال إجابتان مقبولتان: إثبات ونفي. اختر إحداهما." />
      </p>
      <div className="grid gap-3">
        {SHORT_TASKS.map((task, i) => {
          const value = chosen[String(i)] ?? "";
          const ok = task.answers.includes(value);
          return (
            <div key={task.q} className="rounded-2xl border border-slate-200 bg-white p-3">
              <p dir="ltr" className="font-en text-lg font-bold text-slate-900">
                {task.q}
              </p>
              <div className="mt-2">
                <Choice42 options={task.options} value={value} label={`إجابة السؤال ${i + 1}`} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [String(i)]: next }))} />
              </div>
              {value && <Feedback42 ok={ok}>{ok ? <Text42 text={task.why} /> : <Text42 text={`المقبول: ${task.answers.join(" / ")}. ${task.why}`} />}</Feedback42>}
            </div>
          );
        })}
      </div>
    </Panel42>
  );
}

// ============================================================
// مختبر 4 — ترتيب سؤال WH
// ============================================================
const WH_TASKS = [
  { tokens: ["What", "can", "you", "do"], answer: "What can you do?", why: "WH + CAN + Subject + V1." },
  { tokens: ["Where", "can", "we", "find", "this", "book"], answer: "Where can we find this book?", why: "أداة المكان ثم can ثم الفاعل ثم V1 ثم بقية الجملة." },
  { tokens: ["How", "can", "I", "improve", "my", "English"], answer: "How can I improve my English?", why: "How + can + I + improve (V1)." },
  { tokens: ["Why", "can't", "he", "join", "the", "team"], answer: "Why can't he join the team?", why: "النفي can't ينتقل مع الأداة، ويبقى join بصيغة V1." },
];

export function WhLab42() {
  const [state, setState] = useAnswer42("lab-wh");
  const data = useMemo(() => JSON.parse(state || "{}") as Record<string, string[]>, [state]);
  const [taskIndex, setTaskIndex] = useState(0);
  const task = WH_TASKS[taskIndex];
  const built = data[String(taskIndex)] ?? [];
  const remaining = task.tokens.filter((token, i) => !built.includes(`${token}#${i}`));
  const sentence = built.map((entry) => entry.split("#")[0]).join(" ");
  const complete = built.length === task.tokens.length;
  // القطع لا تحمل علامة الاستفهام، بينما `answer` ينتهي بها؛ نُطبّع الطرفين
  // وإلا فلا يمكن لأي ترتيب صحيح أن يُقبل.
  const normalizeOrder42 = (value: string) => value.replace(/\s+/g, " ").replace(/\s*\?\s*$/, "").trim();
  const correct = complete && normalizeOrder42(sentence) === normalizeOrder42(task.answer);

  const push = (token: string, index: number) => {
    const id = `${token}#${index}`;
    if (built.includes(id)) return;
    setState(JSON.stringify({ ...data, [String(taskIndex)]: [...built, id] }));
  };
  const undo = () => setState(JSON.stringify({ ...data, [String(taskIndex)]: built.slice(0, -1) }));
  const clear = () => setState(JSON.stringify({ ...data, [String(taskIndex)]: [] }));

  return (
    <Panel42 title="رتّب سؤال WH مع CAN" kicker="LAB 04 · WH ORDER">
      <Choice42
        options={WH_TASKS.map((_, i) => `سؤال ${i + 1}`)}
        value={`سؤال ${taskIndex + 1}`}
        label="اختر السؤال"
        english={false}
        onChange={(next) => setTaskIndex(Number(next.replace(/\D/g, "")) - 1)}
      />
      <div className="mt-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-3" dir="ltr">
        <p className="font-en min-h-8 text-xl font-extrabold text-slate-900">{sentence || "…"}</p>
      </div>
      <div className="mt-2 flex flex-wrap gap-2" dir="ltr">
        {task.tokens.map((token, i) => {
          const used = built.includes(`${token}#${i}`);
          return (
            <button
              key={`${token}-${i}`}
              type="button"
              disabled={used}
              onClick={() => push(token, i)}
              className="rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 font-en text-lg font-bold text-slate-800 transition enabled:hover:border-violet-400 disabled:opacity-30"
            >
              {token}
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" onClick={undo} disabled={built.length === 0} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-700 disabled:opacity-40">
          <Text42 text="تراجع" />
        </button>
        <button type="button" onClick={clear} disabled={built.length === 0} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-700 disabled:opacity-40">
          <Text42 text="مسح" />
        </button>
      </div>
      {remaining.length === 0 && (
        <Feedback42 ok={correct}>
          {correct ? (
            <Text42 text={`${task.why} ولا نضيف do لأن can فعل مساعد.`} />
          ) : (
            <Text42 text={`الترتيب الصحيح: ${task.answer}. ${task.why}`} />
          )}
        </Feedback42>
      )}
    </Panel42>
  );
}

// ============================================================
// مختبر 5 — آلة الزمن: can أم could أم couldn't
// ============================================================
const TIME_ROWS = [
  { en: "My sister ______ play the piano now.", clue: "now — الحاضر", answer: "can", why: "قدرة حالية." },
  { en: "When I was five, I ______ count to one hundred.", clue: "when I was five — الماضي", answer: "could", why: "قدرة عامة في الماضي." },
  { en: "My grandfather ______ use a computer when he was young, but he can use one now.", clue: "but he can use one now — تقابل مع الحاضر", answer: "couldn't", why: "عدم قدرة في الماضي." },
  { en: "She ______ read English books when she was ten.", clue: "when she was ten — الماضي", answer: "could", why: "قدرة عامة في الماضي." },
  { en: "My little brother ______ read yet.", clue: "yet — الحاضر", answer: "can't", why: "عدم قدرة حالية." },
];

export function TimeLab42({ part = 1 }: { part?: 1 | 2 }) {
  const allRows = TIME_ROWS.map((row) => ({ en: `${row.en}  (${row.clue})`, answer: row.answer, why: row.why }));
  const rows = part === 1 ? allRows.slice(0, 3) : allRows.slice(3);
  return (
    <Panel42 title={`حدّد الزمن ثم اختر الفعل الناقص (${part}/2)`} kicker={`LAB 05${part === 2 ? "B" : "A"} · TIME SWITCH`}>
      <Classifier42
        storeKey={`lab-time-${part}`}
        offset={part === 1 ? 0 : 3}
        rows={rows}
        options={["can", "could", "can't", "couldn't"]}
        intro="اقرأ دليل الزمن في كل جملة، ثم اختر الصيغة."
      />
    </Panel42>
  );
}

// ============================================================
// مختبر 6 — مهارة عامة أم نجاح في موقف محدد؟
// ============================================================
const ABLE_ROWS = [
  { en: "When Omar was young, he could swim very well.", answer: "قدرة عامة", why: "مهارة كان يمتلكها في فترة ماضية، فالطريقة الطبيعية هي COULD." },
  { en: "Yesterday, Omar fell into the water, but he was able to swim to the shore.", answer: "نجاح محدد", why: "حدث واحد نجح فيه، فتُفضَّل was able to (أو managed to)." },
  { en: "My father could speak three languages when he was young.", answer: "قدرة عامة", why: "مهارة لغوية عامة في الماضي." },
  { en: "Although the exam was difficult, Maya was able to answer every question.", answer: "نجاح محدد", why: "إبراز النجاح في امتحان محدد." },
  { en: "The door was stuck, but Daniel managed to open it.", answer: "نجاح محدد", why: "managed to مرادفة لـ was able to في إبراز النجاح." },
  { en: "I couldn't open the window yesterday.", answer: "نفي طبيعي", why: "في النفي couldn't صحيحة وطبيعية حتى لموقف محدد؛ الفرق لا يُطبَّق آليًا." },
];

export function AbleLab42({ part = 1 }: { part?: 1 | 2 }) {
  const rows = part === 1 ? ABLE_ROWS.slice(0, 3) : ABLE_ROWS.slice(3);
  return (
    <Panel42 title={`COULD أم WAS/WERE ABLE TO؟ (${part}/2)`} kicker={`LAB 06${part === 2 ? "B" : "A"} · GENERAL vs SPECIFIC`}>
      <Classifier42
        storeKey={`lab-able-${part}`}
        offset={part === 1 ? 0 : 3}
        rows={rows}
        english={false}
        options={["قدرة عامة", "نجاح محدد", "نفي طبيعي"]}
        intro="صنّف كل جملة: هل تصف مهارة عامة أم نجاحًا في موقف محدد أم نفيًا طبيعيًا؟"
      />
    </Panel42>
  );
}

// ============================================================
// مختبر 7 — إذن أم طلب أم قدرة؟
// ============================================================
const PERMISSION_ROWS = [
  { en: "Can I open the window?", answer: "طلب إذن", why: "المتحدث هو I ويسأل عن الإذن بفعل شيء." },
  { en: "Could I borrow your dictionary, please?", answer: "طلب إذن", why: "Could I…? طلب إذن أكثر لطفًا وتحفظًا." },
  { en: "Can you close the door?", answer: "طلب", why: "المتحدث يطلب من المخاطب أن يفعل؛ could you أدب أكثر." },
  { en: "Could you help me with this exercise?", answer: "طلب", why: "طلب مساعدة مهذب في الحاضر، لا سؤال عن قدرة ماضية." },
  { en: "Can you lift this box? It is very heavy.", answer: "سؤال عن قدرة", why: "ثقل الصندوق يجعل السؤال عن القدرة الجسدية، لا طلبًا." },
  { en: "I can swim.", answer: "قدرة", why: "إثبات قدرة حالية يمتلكها المتحدث." },
];

export function PermissionLab42() {
  return (
    <Panel42 title="الوظيفة التواصلية للجملة" kicker="LAB 07 · PERMISSION · REQUEST · ABILITY">
      <Classifier42
        storeKey="lab-permission"
        english={false}
        options={["طلب إذن", "طلب", "سؤال عن قدرة", "قدرة"]}
        intro="لاحظ الفرق بين النمطين: Can I… تطلب إذنًا، أمّا Can/Could you… فتقدّم طلبًا، وقد يكون السؤال عن قدرة بحسب السياق."
        rows={PERMISSION_ROWS}
      />
    </Panel42>
  );
}

// ============================================================
// مختبر 8 — الرد الطبيعي
// ============================================================
const RESPONSE_TASKS = [
  {
    q: "Could you help me, please?",
    kind: "طلب حالي",
    options: ["Of course!", "Sure!", "Yes, I could.", "I'm sorry, but I can't right now."],
    answers: ["Of course!", "Sure!", "I'm sorry, but I can't right now."],
    why: "نرد على الطلب برد طبيعي (Of course / Sure / No problem) أو اعتذار، لا بإجابة قصيرة تاريخية.",
  },
  {
    q: "Could you swim when you were five?",
    kind: "سؤال عن قدرة ماضية",
    options: ["Yes, I could.", "No, I couldn't.", "Of course!", "No problem."],
    answers: ["Yes, I could.", "No, I couldn't."],
    why: "هنا السؤال عن قدرة ماضية، فالإجابة القصيرة could / couldn't.",
  },
  {
    q: "Could I borrow a pencil, then?",
    kind: "طلب إذن",
    options: ["Certainly. Here you are.", "Of course. Go ahead.", "Yes, I could.", "No problem."],
    answers: ["Certainly. Here you are.", "Of course. Go ahead."],
    why: "الرد على طلب الإذن يكون بمنح الإذن (Certainly / Of course)، لا بإجابة قصيرة عن القدرة.",
  },
  {
    q: "Can I use a calculator for this exercise?",
    kind: "طلب إذن",
    options: ["Not for this one.", "Certainly. Here you are.", "Yes, I can.", "Sure!"],
    answers: ["Not for this one.", "Certainly. Here you are."],
    why: "المعلم يمنح الإذن أو يرفضه؛ ولا يرد بـ Yes, I can لأنه ليس هو السائل.",
  },
];

export function ResponseLab42() {
  const [picks, setPicks] = useAnswer42("lab-response");
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  return (
    <Panel42 title="اختر الرد الطبيعي" kicker="LAB 08 · NATURAL RESPONSES">
      <p className="mb-3 text-base text-slate-600">
        <Text42 text="نوع السؤال يحدد نوع الرد. لاحظ التسمية بجانب كل سؤال." />
      </p>
      <div className="grid gap-3">
        {RESPONSE_TASKS.map((task, i) => {
          const value = chosen[String(i)] ?? "";
          const ok = task.answers.includes(value);
          return (
            <div key={task.q} className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="flex flex-wrap items-center gap-2">
                <p dir="ltr" className="font-en text-lg font-bold text-slate-900">
                  {task.q}
                </p>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                  <Text42 text={task.kind} />
                </span>
              </div>
              <div className="mt-2">
                <Choice42 options={task.options} value={value} label={`رد السؤال ${i + 1}`} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [String(i)]: next }))} />
              </div>
              {value && <Feedback42 ok={ok}>{ok ? <Text42 text={task.why} /> : <Text42 text={`المقبول: ${task.answers.join(" / ")}. ${task.why}`} />}</Feedback42>}
            </div>
          );
        })}
      </div>
    </Panel42>
  );
}

// ============================================================
// مختبر 9 — إمكانية عامة أم احتمال أم اقتراح؟
// ============================================================
const POSSIBILITY_ROWS = [
  { en: "Learning a new language can be challenging.", answer: "إمكانية عامة", why: "CAN تصف ما يمكن أن يحدث عمومًا، لا مهارة يملكها شخص." },
  { en: "Accidents can happen.", answer: "إمكانية عامة", why: "إمكانية عامة بلا موقف محدد." },
  { en: "It could rain tomorrow.", answer: "احتمال", why: "COULD تعبّر عن احتمال مستقبلي غير مؤكد." },
  { en: "An accident could happen if we aren't careful.", answer: "احتمال", why: "احتمال في موقف محدد مشروط بالحذر." },
  { en: "We could visit the museum tomorrow.", answer: "اقتراح", why: "COULD تطرح الزيارة بوصفها اقتراحًا ممكنًا." },
  { en: "You could try a different method.", answer: "اقتراح", why: "اقتراح طريقة بديلة على المخاطب." },
];

export function PossibilityLab42() {
  return (
    <Panel42 title="إمكانية أم احتمال أم اقتراح؟" kicker="LAB 09 · POSSIBILITY & SUGGESTION">
      <Classifier42
        storeKey="lab-possibility"
        english={false}
        options={["إمكانية عامة", "احتمال", "اقتراح"]}
        intro="CAN شائعة في الإمكانية العامة، وCOULD قد تعبّر عن احتمال في موقف معين أو عن اقتراح."
        rows={POSSIBILITY_ROWS}
      />
    </Panel42>
  );
}

// ============================================================
// مختبر 10 — شخّص الخطأ ثم أصلحه (§31)
// ============================================================
const REPAIR_TASKS = [
  { wrong: "She cans swim.", rules: ["لا وجود لـ cans", "لا to بعد can", "لا do-support", "لا will + can"], rule: "لا وجود لـ cans", fixed: "She can swim.", why: "CAN ثابتة مع جميع الضمائر." },
  { wrong: "Do you can swim?", rules: ["لا وجود لـ cans", "لا to بعد can", "لا do-support", "لا will + can"], rule: "لا do-support", fixed: "Can you swim?", why: "CAN فعل مساعد يبني السؤال بنفسه." },
  { wrong: "I can to play chess.", rules: ["لا وجود لـ cans", "لا to بعد can", "لا do-support", "لا will + can"], rule: "لا to بعد can", fixed: "I can play chess.", why: "بعد CAN يأتي V1 مباشرة." },
  { wrong: "I will can speak English.", rules: ["لا وجود لـ cans", "لا to بعد can", "لا do-support", "لا will + can"], rule: "لا will + can", fixed: "I will be able to speak English.", why: "لا يجتمع فعلان ناقصان؛ نستخدم will be able to." },
];

export function RepairLab42({ part = 1 }: { part?: 1 | 2 }) {
  // أربعة تمارين على شريحتين بدل شريحة واحدة طويلة.
  const tasks = part === 1 ? REPAIR_TASKS.slice(0, 2) : REPAIR_TASKS.slice(2);
  const [state, setState] = useAnswer42(`lab-repair-${part}`);
  const data = useMemo(() => JSON.parse(state || "{}") as Record<string, string>, [state]);
  return (
    <Panel42 title={`شخّص القاعدة المكسورة ثم أصلح (${part}/2)`} kicker={`LAB 10${part === 2 ? "B" : "A"} · DIAGNOSE & REPAIR`}>
      <Tip42>
        <Text42 text="الخطوة الأولى تشخيص القاعدة، والخطوة الثانية كتابة الجملة الصحيحة. الزر لا يعمل قبل الخطوتين." />
      </Tip42>
      <div className="mt-3 grid gap-3">
        {tasks.map((task, i) => {
          const rule = data[`${i}-rule`] ?? "";
          const fixed = data[`${i}-fixed`] ?? "";
          const checked = data[`${i}-checked`] ?? "";
          const filled = rule !== "" && fixed.trim().length > 3;
          const ok =
            rule === task.rule &&
            fixed.toLowerCase().replace(/[.?!]/g, "").trim() === task.fixed.toLowerCase().replace(/[.?!]/g, "").trim();
          return (
            <div key={task.wrong} className="rounded-2xl border border-slate-200 bg-white p-3">
              <p dir="ltr" className="font-en text-lg font-bold text-rose-900 line-through decoration-rose-300">
                {task.wrong}
              </p>
              <div className="mt-2">
                <p className="mb-1 text-sm font-bold text-slate-500">1) القاعدة المكسورة</p>
                <Choice42
                  options={task.rules}
                  value={rule}
                  label={`القاعدة المكسورة ${i + 1}`}
                  english={false}
                  onChange={(next) => setState(JSON.stringify({ ...data, [`${i}-rule`]: next, [`${i}-checked`]: "" }))}
                />
              </div>
              <label className="mt-2 block text-sm font-bold text-slate-600">
                2) الجملة الصحيحة
                <textarea
                  dir="auto"
                  rows={2}
                  value={fixed}
                  onChange={(event) => setState(JSON.stringify({ ...data, [`${i}-fixed`]: event.target.value, [`${i}-checked`]: "" }))}
                  className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-base font-medium text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white"
                />
              </label>
              <button
                type="button"
                disabled={!filled}
                onClick={() => setState(JSON.stringify({ ...data, [`${i}-checked`]: "yes" }))}
                className="mt-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40"
              >
                <Text42 text="تحقق من التشخيص والإصلاح" />
              </button>
              {checked && (
                <Feedback42 ok={ok}>
                  {ok ? (
                    <Text42 text={task.why} />
                  ) : (
                    <Text42 text={`القاعدة: ${task.rule}. التصحيح: ${task.fixed}. ${task.why}`} />
                  )}
                </Feedback42>
              )}
            </div>
          );
        })}
      </div>
    </Panel42>
  );
}

// ============================================================
// مختبر 11 — المعنى من السياق (§32)
// ============================================================
const MEANING_ROWS = [
  { en: "Can you open the door? — The door is very heavy.", answer: "سؤال عن قدرة", why: "ثقل الباب دليل سياقي على أن السائل يسأل عن القدرة." },
  { en: "Can you open the door? — I am carrying these boxes.", answer: "طلب", why: "انشغال المتحدث دليل على أنه يطلب من المخاطب أن يفتح الباب." },
  { en: "Could you swim? — We are talking about your childhood.", answer: "قدرة ماضية", why: "الحديث عن الطفولة يجعل السؤال عن قدرة في الماضي." },
  { en: "Could you swim across this river if necessary?", answer: "قدرة افتراضية", why: "if necessary تجعل السؤال عن قدرة افتراضية في موقف متخيّل." },
  { en: "Could you open the window, please?", answer: "طلب", why: "please دليل على طلب مهذب في الحاضر." },
  { en: "It could rain tomorrow.", answer: "احتمال", why: "لا فاعل يطلب إذنًا ولا قدرة؛ tomorrow تجعلها احتمالًا." },
];

export function MeaningLab42() {
  return (
    <Panel42 title="مختبر المعاني: الدليل في السياق" kicker="LAB 11 · MEANING DETECTIVE">
      <Classifier42
        storeKey="lab-meaning"
        english={false}
        options={["سؤال عن قدرة", "طلب", "قدرة ماضية", "قدرة افتراضية", "احتمال"]}
        intro="الجمل متشابهة في الشكل؛ الدليل الذي يحدد الوظيفة يأتي من بقية الموقف."
        rows={MEANING_ROWS}
      />
      <Note42 emoji="🧠">
        <Text42 text="اللغة ليست مجموعة كلمات دالة فقط؛ إنها معنى وسياق وموقف." />
      </Note42>
    </Panel42>
  );
}

// ============================================================
// مختبر 12 — تحليل حوار المغامرة (§33)
// ============================================================
const ADVENTURE_ROWS = [
  { en: "I can ride a bicycle", answer: "قدرة حالية", why: "Maya تصف قدرة تملكها الآن." },
  { en: "I can't swim very well", answer: "عدم قدرة كافية", why: "نفي القدرة الحالية بدرجة كافية." },
  { en: "I couldn't ride a bicycle", answer: "عدم القدرة في الماضي", why: "Daniel يتحدث عن طفولته." },
  { en: "Could someone help me prepare the equipment list?", answer: "طلب مهذب", why: "المعلمة تطلب المساعدة بصيغة مهذبة." },
  { en: "We could divide the tasks between us", answer: "اقتراح", why: "Omar يطرح فكرة، والمعلمة ترد That's a good suggestion." },
  { en: "Could I bring my camera?", answer: "طلب إذن", why: "Daniel يستأذن، والجواب Yes, you can." },
  { en: "It could rain on the day of the trip", answer: "احتمال", why: "توقع غير مؤكد عن الطقس." },
];

export function AdventureLab42({ part = 1 }: { part?: 1 | 2 }) {
  const rows = part === 1 ? ADVENTURE_ROWS.slice(0, 4) : ADVENTURE_ROWS.slice(4);
  return (
    <Panel42 title={`حلّل حوار The School Adventure (${part}/2)`} kicker={`LAB 12${part === 2 ? "B" : "A"} · DIALOGUE ANALYSER`}>
      <Classifier42
        storeKey={`lab-adventure-${part}`}
        offset={part === 1 ? 0 : 4}
        rows={rows}
        english={false}
        options={["قدرة حالية", "عدم قدرة كافية", "عدم القدرة في الماضي", "طلب مهذب", "اقتراح", "طلب إذن", "احتمال"]}
        intro="صنّف كل استخدام لـ CAN وCOULD في الحوار. لاحظ أن الفعلين نفسيهما يعبران عن سبعة معانٍ مختلفة."
      />
    </Panel42>
  );
}

// ============================================================
// التدريب — بطاقة واحدة لكل بند، والحل لا يظهر قبل المحاولة
// ============================================================
export function PracticeCard42({ item }: { item: PracticeItem42 }) {
  const [values, setValues] = useAnswer42(`${item.id}-values`);
  const [checked, setChecked] = useAnswer42(`${item.id}-checked`);
  const answers = useMemo(() => JSON.parse(values || "{}") as Record<string, string>, [values]);
  const filled = item.fields.every((_, i) => Boolean(answers[String(i)]?.trim()));
  const pair = item.fields.length > 1;
  const correct = pair ? isPairCorrect42(item, answers["0"] ?? "", answers["1"] ?? "") : isCorrect42(item, answers["0"] ?? "");
  const update = (key: string, value: string) => {
    setValues(JSON.stringify({ ...answers, [key]: value }));
    setChecked("");
  };
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-3 md:p-4">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-violet-600 text-xs font-bold text-white">{item.number}</span>
        <span className="text-xs font-bold text-slate-500">§{item.section}</span>
      </div>
      <p dir="ltr" className="font-en mt-2 text-lg font-bold text-slate-900">
        {item.prompt}
      </p>
      {item.context?.map((line) => (
        <p key={line} className="mt-1 text-sm font-semibold text-slate-600">
          <Text42 text={line} />
        </p>
      ))}
      {item.options && (
        <div className="mt-2">
          <Choice42 options={item.options} value={answers["0"] ?? ""} label={`خيارات السؤال ${item.number}`} onChange={(next) => update("0", next)} />
        </div>
      )}
      {!item.options && (
        <div className={`mt-2 grid gap-2 ${pair ? "md:grid-cols-2" : ""}`}>
          {item.fields.map((label, i) => (
            <label key={label} className="block text-sm font-bold text-slate-600">
              <Text42 text={label} />
              <textarea
                dir="auto"
                rows={2}
                value={answers[String(i)] ?? ""}
                onChange={(event) => update(String(i), event.target.value)}
                className="font-en mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-base font-medium text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white"
              />
            </label>
          ))}
        </div>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!filled}
          onClick={() => setChecked("yes")}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40"
        >
          <Text42 text="قارن إجابتي بالحل" />
        </button>
      </div>
      {checked && (
        <Feedback42 ok={correct}>
          <span className="block">
            <Text42 text="الإجابة:" /> <span dir="auto" className="font-en">{item.answer}</span>
          </span>
          <span className="mt-1 block text-sm font-medium leading-relaxed">
            <Text42 text={item.reason} />
          </span>
        </Feedback42>
      )}
    </article>
  );
}

export function PracticeSet42({ section, from, to }: { section: number; from: number; to: number }) {
  const items = itemsFor42(section, from, to);
  return (
    <div className="grid gap-3">
      <Tip42>
        <Text42 text="اكتب محاولتك أولًا، ثم اضغط «قارن إجابتي بالحل». المقارنة للمراجعة الذاتية، والحل لا يظهر قبل المحاولة." />
      </Tip42>
      {items.map((item) => (
        <PracticeCard42 key={item.id} item={item} />
      ))}
    </div>
  );
}

// ============================================================
// القراءة — The Young Inventor (§39)
// ============================================================
export function Reading42({ part }: { part: "passage-1" | "passage-2" | "questions-1" | "questions-2" | "questions-3" | "questions-4" }) {
  const lines = sectionLines42(39);
  // 0 = العنوان (يعرضه عنوان الشريحة)، 1–14 = النص، 15 = «أسئلة الفهم» (عنوان
  // الأسئلة لا جزءًا من النص الإنجليزي)، 16–25 = الأسئلة، 26+ = الحلول.
  // النص 14 سطرًا؛ يُعرض على شريحتين (1–7 ثم 8–14) حتى تبقى البطاقة قصيرة.
  if (part === "passage-1" || part === "passage-2") {
    const passage = part === "passage-1" ? lines.slice(1, 8) : lines.slice(8, 15);
    return (
      <div className="rounded-3xl border-2 border-sky-100 bg-sky-50/40 p-4 md:p-5">
        <p className="text-sm font-bold text-sky-700">READING · A NEW SKILL · {part === "passage-1" ? "1/2" : "2/2"}</p>
        {part === "passage-1" && (
          <h3 dir="ltr" className="font-en mt-1 text-2xl font-extrabold text-slate-900">
            {passage[0]}
          </h3>
        )}
        <div className="mt-3 space-y-2">
          {(part === "passage-1" ? passage.slice(1) : passage).map((line, i) => (
            <p key={i} dir="ltr" className="font-en text-lg leading-9 text-slate-800">
              {line}
            </p>
          ))}
        </div>
        {part === "passage-2" && (
          <Note42 emoji="🔎">
            <Text42 text="لاحظ ثلاث وظائف في نص واحد: could للقدرة العامة في الماضي، was able to للنجاح في موقف محدد، وwill be able to للمستقبل." />
          </Note42>
        )}
      </div>
    );
  }
  const ranges: Record<string, [number, number]> = { "questions-1": [1, 3], "questions-2": [4, 6], "questions-3": [7, 8], "questions-4": [9, 10] };
  const [from, to] = ranges[part] ?? [1, 3];
  return <PracticeSet42 section={39} from={from} to={to} />;
}

// ============================================================
// مهمة الكتابة (§42)
// ============================================================
const CRITERIA = [
  "ثلاث جمل باستخدام CAN.",
  "جملتان باستخدام CAN'T.",
  "جملتان باستخدام COULD للتعبير عن قدرة ماضية.",
  "جملة باستخدام COULDN'T.",
  "جملة باستخدام WAS/WERE ABLE TO.",
  "جملتان باستخدام WILL BE ABLE TO.",
  "طلب مهذب باستخدام Could you...?",
  "طلب إذن باستخدام Could I...?",
  "اقتراح باستخدام We could...",
  "جملة تعبّر عن احتمال باستخدام COULD.",
];

function countSentences(text: string): number {
  return text
    .split(/[.!?\n]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 1).length;
}

export function WritingMission42({ part }: { part: "editor" | "criteria" | "model" }) {
  const [draft, setDraft] = useAnswer42("writing-42");
  const [checks, setChecks] = useAnswer42("writing-42-checks");
  const done = useMemo(() => JSON.parse(checks || "{}") as Record<string, boolean>, [checks]);
  const doneCount = Object.values(done).filter(Boolean).length;
  if (part === "editor") {
    return (
      <Panel42 title="مساحة الكتابة" kicker="WRITING · 12–15 SENTENCES">
        <label className="block text-sm font-bold text-slate-600">
          <Text42 text="My Abilities: Past, Present & Future" />
          <textarea
            dir="ltr"
            rows={12}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="When I was younger, I couldn't ..."
            className="font-en mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-base leading-8 text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white"
          />
        </label>
        <p role="status" className="mt-2 text-sm font-bold text-slate-500">
          <Text42 text="عدد الجمل التقريبي:" /> <bdi dir="ltr">{countSentences(draft)} / 12–15</bdi>
        </p>
        <Tip42>
          <Text42 text="العدّاد تقريبي ويعتمد على علامات الترقيم؛ راجع العدد بنفسك. التقييم النهائي يدوي وفق سلم التقييم في مساحة المعلم." />
        </Tip42>
      </Panel42>
    );
  }
  if (part === "criteria") {
    return (
      <Panel42 title="المعايير العشرة" kicker="CHECKLIST">
        <p role="status" className="mb-2 text-sm font-bold text-slate-500">
          <Text42 text="المعايير المستوفاة:" /> <bdi dir="ltr">{doneCount} / {CRITERIA.length}</bdi>
        </p>
        <ul className="grid gap-2 md:grid-cols-2">
          {CRITERIA.map((criterion, i) => (
            <li key={criterion}>
              <label className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  checked={Boolean(done[String(i)])}
                  onChange={(event) => setChecks(JSON.stringify({ ...done, [String(i)]: event.target.checked }))}
                />
                <Text42 text={criterion} />
              </label>
            </li>
          ))}
        </ul>
        <Note42 emoji="✍️">
          <Text42 text="لا تنسخ النموذج؛ اكتب فقرتك الخاصة. التقييم النهائي يدوي وفق سلم التقييم في مساحة المعلم." />
        </Note42>
      </Panel42>
    );
  }
  return null;
}

export const WRITING_CRITERIA_42 = CRITERIA;
