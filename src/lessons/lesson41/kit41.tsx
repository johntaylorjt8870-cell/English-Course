import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { En41, Text41, Note41, Panel41, Tip41 } from "./design";
import { isCorrect41, isPairCorrect41, itemsFor, type PracticeItem41 } from "./practice41";
import { sectionLines41 } from "./ledger41";

// ============================================================
// مساحة إجابات الدرس — تبقى أثناء الجلسة وتُعاد عند تبديل الشرائح.
// ============================================================
const Workspace41 = createContext<{ values: Record<string, string>; set: (key: string, value: string) => void }>({
  values: {},
  set: () => {},
});

export function Workspace41Provider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const api = useMemo(() => ({ values, set: (key: string, value: string) => setValues((v) => ({ ...v, [key]: value })) }), [values]);
  return <Workspace41.Provider value={api}>{children}</Workspace41.Provider>;
}

export function useAnswer41(key: string): [string, (value: string) => void] {
  const store = useContext(Workspace41);
  return [store.values[key] ?? "", (value) => store.set(key, value)];
}

// ============================================================
// عناصر التفاعل المشتركة
// ============================================================
function Choice41({
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
            {english ? <En41>{option}</En41> : <Text41 text={option} />}
          </button>
        );
      })}
    </div>
  );
}

function Feedback41({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div role="status" className={`mt-3 rounded-2xl border-2 p-3 text-base font-semibold ${ok ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"}`}>
      <span className="mr-1 font-bold">{ok ? "✓ صحيح" : "✕ راجع"}</span> — {children}
    </div>
  );
}

// ============================================================
// مختبر 1 — رئيسي أم مساعد؟
// ============================================================
const ROLE_ROWS = [
  { en: "She is happy.", word: "is", role: "رئيسي", why: "يربط الفاعل بالوصف happy؛ لا يوجد فعل آخر يساعده." },
  { en: "She is studying.", word: "is", role: "مساعد", why: "يساعد studying لبناء Present Continuous: BE + V-ing." },
  { en: "I have a bicycle.", word: "have", role: "رئيسي", why: "معنى الامتلاك؛ bicycle اسم وليس V3." },
  { en: "I have bought a bicycle.", word: "have", role: "مساعد", why: "يبني Present Perfect مع bought (V3)." },
  { en: "I do my homework.", word: "do", role: "رئيسي", why: "معنى إنجاز الواجب؛ ليست للنفي أو السؤال." },
  { en: "Does she do her homework?", word: "does", role: "مساعد", why: "الأولى تبني السؤال؛ والثانية do فعل رئيسي." },
];

export function RoleLab41() {
  const [picks, setPicks] = useAnswer41("lab-roles");
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  return (
    <Panel41 title="رئيسي أم مساعد؟" kicker="LAB 01 · ROLE CHECK">
      <p className="mb-3 text-base text-slate-600">حدد وظيفة الكلمة الملوّنة في كل جملة.</p>
      <div className="grid gap-3">
        {ROLE_ROWS.map((row, i) => {
          const value = chosen[String(i)] ?? "";
          return (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-900 text-sm font-bold text-white">{i + 1}</span>
                <p dir="ltr" className="font-en text-lg font-bold text-slate-800">
                  {row.en}
                </p>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-bold text-slate-600">
                  الكلمة: <En41>{row.word}</En41>
                </span>
              </div>
              <div className="mt-2">
                <Choice41 options={["رئيسي", "مساعد"]} value={value} label={`وظيفة ${row.word} في الجملة ${i + 1}`} english={false} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [String(i)]: next }))} />
              </div>
              {value && <Feedback41 ok={value === row.role}>{value === row.role ? <Text41 text={row.why} /> : <Text41 text={`الصحيح: ${row.role}. ${row.why}`} />}</Feedback41>}
            </div>
          );
        })}
      </div>
    </Panel41>
  );
}

// ============================================================
// مختبر 2 — وظائف المحركات من السياق
// ============================================================
const ENGINE_TABS = [
  { name: "BE", ar: "الربط والاستمرار والمبني للمجهول", forms: "am · is · are · was · were · be · been · being", fns: ["فعل رئيسي رابط", "مساعد في الأزمنة المستمرة", "مساعد في المبني للمجهول"] },
  { name: "DO", ar: "السؤال والنفي والتأكيد", forms: "do · does · did · done · doing", fns: ["مساعد للسؤال والنفي", "التأكيد Emphatic DO", "فعل رئيسي بمعنى يُنجز"] },
  { name: "HAVE", ar: "الأزمنة التامة والامتلاك", forms: "have · has · had · having", fns: ["مساعد في الأزمنة التامة", "مساعد مع BEEN للاستمرار", "فعل رئيسي للامتلاك"] },
];

const CONTEXT_ROWS = [
  { en: "She is happy.", engine: "BE", fn: "فعل رئيسي رابط" },
  { en: "She is studying.", engine: "BE", fn: "مساعد في الأزمنة المستمرة" },
  { en: "Does she study?", engine: "DO", fn: "مساعد للسؤال والنفي" },
  { en: "I do understand you!", engine: "DO", fn: "التأكيد Emphatic DO" },
  { en: "I have a bicycle.", engine: "HAVE", fn: "فعل رئيسي للامتلاك" },
  { en: "She has finished.", engine: "HAVE", fn: "مساعد في الأزمنة التامة" },
];

export function EngineLab41() {
  const [tab, setTab] = useAnswer41("lab-engine-tab");
  const [picks, setPicks] = useAnswer41("lab-engine-fn");
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  const index = Math.min(2, Math.max(0, Number(tab) || 0));
  const engine = ENGINE_TABS[index];
  return (
    <Panel41 title="وظائف المحركات من السياق" kicker="LAB 02 · ENGINE FUNCTIONS">
      <div className="mb-3 grid gap-2 sm:grid-cols-3" role="group" aria-label="اختيار المحرك">
        {ENGINE_TABS.map((item, i) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={i === index}
            onClick={() => setTab(String(i))}
            className={`rounded-2xl border-2 p-3 text-center transition ${i === index ? "border-violet-500 bg-violet-50" : "border-slate-200 bg-white hover:border-violet-300"}`}
          >
            <En41 className="text-2xl font-extrabold text-slate-900">{item.name}</En41>
            <span className="mt-1 block text-xs font-bold text-slate-600">{item.ar}</span>
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        <p className="text-sm font-bold text-slate-500">عائلة الصيغ</p>
        <p dir="ltr" className="font-en mt-1 text-lg font-extrabold text-violet-700">
          {engine.forms}
        </p>
        <ul className="mt-3 space-y-1.5">
          {engine.fns.map((fn) => (
            <li key={fn} className="flex items-center gap-2 text-base font-semibold text-slate-700">
              <span className="h-2 w-2 rounded-full bg-violet-500" aria-hidden="true" />
              <Text41 text={fn} />
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 mb-2 text-base font-bold text-slate-700">حدد وظيفة الفعل المساعد في كل جملة:</p>
      <div className="grid gap-3 md:grid-cols-2">
        {CONTEXT_ROWS.map((row, i) => {
          const value = chosen[String(i)] ?? "";
          const options = ENGINE_TABS.find((e) => e.name === row.engine)!.fns;
          return (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-3">
              <p dir="ltr" className="font-en text-lg font-bold text-slate-800">
                {row.en}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={value === option}
                    onClick={() => setPicks(JSON.stringify({ ...chosen, [String(i)]: option }))}
                    className={`rounded-lg border-2 px-2.5 py-1 text-xs font-bold transition md:text-sm ${value === option ? "border-violet-500 bg-violet-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"}`}
                  >
                    <Text41 text={option} />
                  </button>
                ))}
              </div>
              {value && <Feedback41 ok={value === row.fn}>{value === row.fn ? <Text41 text={`${row.engine}: ${row.fn}.`} /> : <Text41 text={`الصحيح: ${row.fn}.`} />}</Feedback41>}
            </div>
          );
        })}
      </div>
    </Panel41>
  );
}

// ============================================================
// مختبر 3 — بناء جملة BE
// ============================================================
const BE_TASKS = [
  { prompt: "I ______ ready.", options: ["am", "is", "are"], answer: "am", why: "مع I في الحاضر نستخدم am؛ وready وصف، فـ BE هنا فعل رابط رئيسي." },
  { prompt: "She ______ studying.", options: ["is", "does", "has"], answer: "is", why: "الاستمرار يحتاج BE + V-ing، وdoes لا يبني الاستمرار." },
  { prompt: "They ______ tired yesterday.", options: ["was", "were", "did"], answer: "were", why: "الماضي مع They والجمع يأخذ were؛ did لا يصلح مع وصف." },
  { prompt: "She is happy. ← السؤال", options: ["Is she happy?", "Does she is happy?"], answer: "Is she happy?", why: "BE الرابط ينتقل قبل الفاعل مباشرة، دون do-support." },
  { prompt: "He is ready. ← النفي", options: ["He isn't ready.", "He doesn't is ready."], answer: "He isn't ready.", why: "نضع not بعد is؛ لا نضيف doesn't مع BE." },
];

export function BeLab41() {
  const [picks, setPicks] = useAnswer41("lab-be");
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  return (
    <Panel41 title="ابنِ جملة BE خطوة بخطوة" kicker="LAB 03 · BE BUILDER">
      <div className="grid gap-3">
        {BE_TASKS.map((task, i) => {
          const value = chosen[String(i)] ?? "";
          return (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-3">
              <p dir="ltr" className="font-en text-lg font-bold text-slate-800">
                {task.prompt}
              </p>
              <div className="mt-2">
                <Choice41 options={task.options} value={value} label={`اختر الصيغة ${i + 1}`} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [String(i)]: next }))} />
              </div>
              {value && <Feedback41 ok={value === task.answer}>{value === task.answer ? <Text41 text={task.why} /> : <Text41 text={`الصحيح: ${task.answer}. ${task.why}`} />}</Feedback41>}
            </div>
          );
        })}
      </div>
    </Panel41>
  );
}

// ============================================================
// مختبر 4 — does / did + V1
// ============================================================
const DO_TASKS = [
  { statement: "She studies English.", aux: "Does", form: "V1", result: "Does she study English?", why: "does حملت علامة المفرد الغائب، فيعود study إلى V1." },
  { statement: "They visited the museum.", aux: "Did", form: "V1", result: "Did they visit the museum?", why: "did حملت الماضي، فيعود visited إلى visit." },
  { statement: "He doesn't likes coffee.", aux: "doesn't", form: "V1", result: "He doesn't like coffee.", why: "بعد doesn't نستخدم V1 دائمًا." },
  { statement: "He did finished his homework.", aux: "did", form: "V1", result: "He did finish his homework.", why: "حتى did للتأكيد تتطلب V1، فهي تحمل الزمن." },
];

export function DoLab41() {
  const [picks, setPicks] = useAnswer41("lab-do");
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  return (
    <Panel41 title="آلة السؤال والنفي: does / did + V1" kicker="LAB 04 · DO MACHINE">
      <Tip41>
        <Text41 text="اختر المساعد الصحيح، ثم اختر صيغة الفعل الرئيسي، ثم اقرأ النتيجة. لاحظ أن الزمن ينتقل إلى المساعد." />
      </Tip41>
      <div className="mt-3 grid gap-3">
        {DO_TASKS.map((task, i) => {
          const aux = chosen[`${i}-aux`] ?? "";
          const form = chosen[`${i}-form`] ?? "";
          const done = aux !== "" && form !== "";
          const correct = aux === task.aux && form === task.form;
          return (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-3">
              <p dir="ltr" className="font-en text-lg font-bold text-slate-800">
                {task.statement}
              </p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-sm font-bold text-slate-500">1) المساعد</p>
                  <Choice41 options={["Does", "Did", "doesn't"]} value={aux} label={`المساعد ${i + 1}`} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [`${i}-aux`]: next }))} />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-slate-500">2) صيغة الفعل الرئيسي</p>
                  <Choice41 options={["V1", "V-s / V-ed", "V3"]} value={form} label={`الصيغة ${i + 1}`} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [`${i}-form`]: next }))} />
                </div>
              </div>
              {done && (
                <Feedback41 ok={correct}>
                  {correct ? (
                    <span dir="ltr" className="font-en">
                      {task.result} — <Text41 text={task.why} />
                    </span>
                  ) : (
                    <Text41 text={`الصيغة الصحيحة هي ${task.aux} + ${task.form}: ${task.result}. ${task.why}`} />
                  )}
                </Feedback41>
              )}
            </div>
          );
        })}
      </div>
    </Panel41>
  );
}

// ============================================================
// مختبر 5 — HAVE: الأزمنة التامة
// ============================================================
export function HaveLab41() {
  const [tense, setTense] = useAnswer41("lab-have-tense");
  const [continuous, setContinuous] = useAnswer41("lab-have-cont");
  const index = Math.min(2, Math.max(0, Number(tense) || 0));
  const map = [
    { label: "Present Perfect", aux: "has", example: "She has finished her homework." },
    { label: "Past Perfect", aux: "had", example: "She had finished her homework before dinner." },
    { label: "Future Perfect", aux: "will have", example: "She will have finished her homework by 8:00." },
  ];
  const current = map[index];
  const cont = continuous === "yes";
  const sentence = cont
    ? ["She has been studying.", "She had been studying.", "She will have been studying."][index]
    : current.example;
  return (
    <Panel41 title="محرك HAVE: الأزمنة التامة" kicker="LAB 05 · PERFECT ENGINE">
      <div className="flex flex-wrap gap-2" role="group" aria-label="اختيار الزمن">
        {map.map((item, i) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={i === index}
            onClick={() => setTense(String(i))}
            className={`rounded-xl border-2 px-3 py-2 text-sm font-bold transition ${i === index ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"}`}
          >
            <En41>{item.label}</En41>
          </button>
        ))}
      </div>
      <label className="mt-3 flex items-center gap-2 text-base font-bold text-slate-700">
        <input type="checkbox" checked={cont} onChange={(event) => setContinuous(event.target.checked ? "yes" : "")} className="h-4 w-4" />
        <Text41 text="أضف الاستمرار (been + V-ing)" />
      </label>
      <div className="mt-3 rounded-2xl border-2 border-slate-200 bg-white p-4">
        <p className="text-sm font-bold text-slate-500">السلسلة</p>
        <p dir="ltr" className="font-en mt-1 text-xl font-extrabold text-slate-900">
          {cont ? `${current.aux} + been + V-ing` : `${current.aux} + V3`}
        </p>
        <p dir="ltr" className="font-en mt-2 text-lg font-bold text-emerald-700">
          {sentence}
        </p>
      </div>
      <Note41 emoji="🔎">
        <Text41 text="لو كانت HAVE قبل اسم مثل a bicycle أو lunch، فهي فعل رئيسي للامتلاك أو لنشاط، وليست مساعدًا للتام. انظر إلى ما يأتي بعدها." />
      </Note41>
    </Panel41>
  );
}

// ============================================================
// مختبر 6 — المساعد الأول
// ============================================================
const CHAINS = [
  { sentence: "She is studying.", words: ["She", "is", "studying"], first: "is", question: "Is she studying?", negative: "She isn't studying.", why: "is هو المساعد الأول والوحيد." },
  { sentence: "She has been studying.", words: ["She", "has", "been", "studying"], first: "has", question: "Has she been studying?", negative: "She hasn't been studying.", why: "has هو الأول؛ been يبقى بعده." },
  { sentence: "She will have been studying.", words: ["She", "will", "have", "been", "studying"], first: "will", question: "Will she have been studying?", negative: "She won't have been studying.", why: "will هو الأول؛ لا نحرّك have أو been." },
  { sentence: "She studies.", words: ["She", "studies"], first: "لا يوجد", question: "Does she study?", negative: "She doesn't study.", why: "لا يوجد مساعد ظاهر؛ نضيف does ونعيد studies إلى V1." },
];

export function ChainLab41() {
  const [indexRaw, setIndex] = useAnswer41("lab-chain-index");
  const [pick, setPick] = useAnswer41("lab-chain-pick");
  const [mode, setMode] = useAnswer41("lab-chain-mode");
  const index = Math.min(3, Math.max(0, Number(indexRaw) || 0));
  const row = CHAINS[index];
  const correct = pick === row.first;
  return (
    <Panel41 title="ابدأ بالمساعد الأول" kicker="LAB 06 · FIRST AUXILIARY">
      <label className="block text-base font-bold text-slate-700">
        <Text41 text="اختر الجملة" />
        <select
          value={String(index)}
          onChange={(event) => {
            setIndex(event.target.value);
            setPick("");
            setMode("");
          }}
          className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-800"
        >
          {CHAINS.map((chain, i) => (
            <option key={chain.sentence} value={i}>
              {chain.sentence}
            </option>
          ))}
        </select>
      </label>
      <p className="mt-3 text-base font-bold text-slate-700">
        <Text41 text="أي كلمة هي الفعل المساعد الأول؟" />
      </p>
      <div className="mt-2 flex flex-wrap gap-2" dir="ltr" role="group" aria-label="اختيار المساعد الأول">
        {[...row.words, "لا يوجد"].map((word) => (
          <button
            key={word}
            type="button"
            aria-pressed={pick === word}
            onClick={() => {
              setPick(word);
              setMode("");
            }}
            className={`rounded-xl border-2 px-3.5 py-2 text-base font-bold transition ${
              pick === word ? "border-violet-500 bg-violet-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
            }`}
          >
            <En41>{word}</En41>
          </button>
        ))}
      </div>
      {pick && <Feedback41 ok={correct}>{correct ? <Text41 text={`هذا هو المساعد الأول. ${row.why}`} /> : <Text41 text={`ليست نقطة البداية. ابحث عن أول فعل مساعد في السلسلة.`} />}</Feedback41>}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!correct}
          onClick={() => setMode("question")}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40"
        >
          <Text41 text="كوّن سؤالًا" />
        </button>
        <button
          type="button"
          disabled={!correct}
          onClick={() => setMode("negative")}
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-200 disabled:opacity-40"
        >
          <Text41 text="كوّن نفيًا" />
        </button>
      </div>
      {mode && correct && (
        <div className="mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3">
          <p dir="ltr" className="font-en text-lg font-bold text-emerald-900">
            {mode === "question" ? row.question : row.negative}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            <Text41 text={row.first === "لا يوجد" ? "لا يوجد مساعد: نضيف does ونعيد الفعل إلى V1." : "نحرّك المساعد الأول فقط، أو نضع not بعده مباشرة."} />
          </p>
        </div>
      )}
    </Panel41>
  );
}

// ============================================================
// بطاقة تدريب من المصدر
// ============================================================
export function PracticeCard41({ item }: { item: PracticeItem41 }) {
  const [values, setValues] = useAnswer41(`${item.id}-values`);
  const [checked, setChecked] = useAnswer41(`${item.id}-checked`);
  const answers = useMemo(() => JSON.parse(values || "{}") as Record<string, string>, [values]);
  const filled = item.fields.every((_, i) => Boolean(answers[String(i)]?.trim()));
  const pair = item.fields.length > 1;
  const correct = pair ? isPairCorrect41(item, answers["0"] ?? "", answers["1"] ?? "") : isCorrect41(item, answers["0"] ?? "");
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
      {item.options && (
        <div className="mt-2">
          <Choice41
            options={item.options}
            value={answers["0"] ?? ""}
            label={`خيارات السؤال ${item.number}`}
            onChange={(next) => update("0", next)}
          />
        </div>
      )}
      {!item.options && (
        <div className={`mt-2 grid gap-2 ${pair ? "md:grid-cols-2" : ""}`}>
          {item.fields.map((label, i) => (
            <label key={label} className="block text-sm font-bold text-slate-600">
              {label}
              <textarea
                dir="auto"
                rows={2}
                value={answers[String(i)] ?? ""}
                onChange={(event) => update(String(i), event.target.value)}
                className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-base font-medium text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white"
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
          <Text41 text="قارن إجابتي بالحل" />
        </button>
      </div>
      {checked && (
        <Feedback41 ok={correct}>
          <span className="block">
            <Text41 text={`الإجابة: ${item.answer}`} />
          </span>
          <span className="mt-1 block text-sm font-medium leading-relaxed">
            <Text41 text={item.reason} />
          </span>
        </Feedback41>
      )}
    </article>
  );
}

export function PracticeSet41({ section, from, to }: { section: number; from: number; to: number }) {
  const items = itemsFor(section, from, to);
  return (
    <div className="grid gap-3">
      <Tip41>
        <Text41 text="اكتب محاولتك أولًا، ثم اضغط «قارن إجابتي بالحل». المقارنة للمراجعة الذاتية، والحل لا يظهر قبل المحاولة." />
      </Tip41>
      {items.map((item) => (
        <PracticeCard41 key={item.id} item={item} />
      ))}
    </div>
  );
}

// ============================================================
// القراءة
// ============================================================
export function Reading41({ part }: { part: "passage" | "questions-1" | "questions-2" | "questions-3" | "questions-4" }) {
  const lines = sectionLines41(35);
  if (part === "passage") {
    const passage = lines.slice(1, 17);
    return (
      <div className="rounded-3xl border-2 border-sky-100 bg-sky-50/40 p-4 md:p-5">
        <p className="text-sm font-bold text-sky-700">READING · A WEEK OF LEARNING</p>
        <h3 dir="ltr" className="font-en mt-1 text-2xl font-extrabold text-slate-900">
          {passage[0]}
        </h3>
        <div className="mt-3 space-y-2">
          {passage.slice(1).map((line, i) => (
            <p key={i} dir="ltr" className="font-en text-lg leading-9 text-slate-800">
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }
  const ranges: Record<string, [number, number]> = { "questions-1": [1, 2], "questions-2": [3, 4], "questions-3": [5, 7], "questions-4": [8, 10] };
  const [from, to] = ranges[part] ?? [1, 2];
  return <PracticeSet41 section={35} from={from} to={to} />;
}

// ============================================================
// مهمة الكتابة
// ============================================================
const CRITERIA = [
  "جملتان باستخدام BE.",
  "جملتان باستخدام DO أو DOES في السؤال أو النفي.",
  "جملتان باستخدام HAVE أو HAS بوصفهما فعلين مساعدين.",
  "جملة تحتوي على DID للتأكيد.",
  "جملة تستخدم HAVE بوصفه فعلًا رئيسيًا.",
  "جملة تحتوي على أكثر من فعل مساعد.",
  "سؤال في Present Simple.",
  "سؤال في Present Perfect.",
  "جملة باستخدام Future Perfect.",
  "جملة باستخدام Future Perfect Continuous.",
];

export function WritingMission41({ part }: { part: "editor" | "criteria" | "model" }) {
  const [text, setText] = useAnswer41("writing-text");
  const [title, setTitle] = useAnswer41("writing-title");
  const [checks, setChecks] = useAnswer41("writing-checks");
  const done = useMemo(() => JSON.parse(checks || "{}") as Record<string, boolean>, [checks]);
  const sentences = useMemo(() => (text.trim() ? text.trim().split(/[.!?]+\s+/).filter((s) => s.trim().length > 2).length : 0), [text]);

  if (part === "editor") {
    return (
      <div className="space-y-3">
        <Panel41 title="العنوان والفقرة" kicker="WRITING MISSION">
          <label className="block text-sm font-bold text-slate-600">
            <Text41 text="العنوان: My School Life and My Future Goals" />
            <input
              dir="ltr"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="My School Life and My Future Goals"
              className="font-en mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-base font-semibold text-slate-800 outline-none focus:border-violet-400 focus:bg-white"
            />
          </label>
          <label className="mt-3 block text-sm font-bold text-slate-600">
            <Text41 text="اكتب من 12 إلى 15 جملة إنجليزية" />
            <textarea
              dir="ltr"
              rows={9}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="I am a student who enjoys learning new things…"
              className="font-en mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-base leading-8 text-slate-800 outline-none focus:border-violet-400 focus:bg-white"
            />
          </label>
          <p role="status" className={`mt-2 text-sm font-bold ${sentences >= 12 && sentences <= 15 ? "text-emerald-700" : "text-slate-500"}`}>
            <Text41 text={`عدد الجمل التقريبي: ${sentences} — الهدف 12 إلى 15 جملة.`} />
          </p>
        </Panel41>
      </div>
    );
  }
  if (part === "criteria") {
    return (
      <Panel41 title="المعايير العشرة" kicker="CHECKLIST">
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
                <Text41 text={criterion} />
              </label>
            </li>
          ))}
        </ul>
        <Note41 emoji="✍️">
          <Text41 text="لا تنسخ النموذج؛ اكتب فقرتك الخاصة، وحاول استخدام مفردات جديدة. التقييم النهائي يدوي وفق سلم التقييم في مساحة المعلم." />
        </Note41>
      </Panel41>
    );
  }
  return null;
}
