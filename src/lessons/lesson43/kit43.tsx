import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { En43, Text43, Note43, Panel43, Tip43, Sentence43 } from "./design43";
import { isCorrect43, isPairCorrect43, itemsFor43, type PracticeItem43 } from "./practice43";
import { sectionLines43 } from "./ledger43";

// ============================================================
// مساحة إجابات الدرس — تبقى أثناء الجلسة وتُعاد عند تبديل الشرائح.
// ============================================================
const Workspace43 = createContext<{ values: Record<string, string>; set: (key: string, value: string) => void }>({
  values: {},
  set: () => {},
});

export function Workspace43Provider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const api = useMemo(
    () => ({ values, set: (key: string, value: string) => setValues((v) => ({ ...v, [key]: value })) }),
    [values],
  );
  return <Workspace43.Provider value={api}>{children}</Workspace43.Provider>;
}

export function useAnswer43(key: string): [string, (value: string) => void] {
  const store = useContext(Workspace43);
  return [store.values[key] ?? "", (value) => store.set(key, value)];
}

// ============================================================
// نتيجة الاختبار — تُقرأ من الprops بعد الحسم
// ============================================================
export function TestResult43({
  submitted,
  graded,
  onReset,
}: {
  submitted: boolean;
  graded: { score: number; total: number } | null;
  onReset: () => void;
}) {
  if (!submitted || !graded) {
    return (
      <Panel43 title="نتيجة الاختبار" kicker="EXAM · 25 QUESTIONS · 5 LEVELS">
        <p className="text-base font-bold text-slate-700">
          <Text43 text="لم تُسجّل محاولة بعد. انتقل إلى مساحة التقييم وأكمل الأسئلة ثم اضغط submit." />
        </p>
      </Panel43>
    );
  }
  return (
    <Panel43 title="نتيجة الاختبار" kicker="EXAM · 25 QUESTIONS · 5 LEVELS">
      <p className="text-3xl font-extrabold text-violet-700">
        <bdi dir="ltr">{graded.score} / {graded.total}</bdi>
      </p>
      <Tip43>
        <Text43 text="هذه النتيجة تُحسب من الإجابات التي سجلتها في مساحة التقييم. النماذج التفصيلية للحلول لا تُعرض للطالب إلا بعد تسجيل المحاولة." />
      </Tip43>
      <button
        type="button"
        onClick={onReset}
        className="mt-3 rounded-xl border-2 border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
      >
        <Text43 text="إعادة المحاولة" />
      </button>
    </Panel43>
  );
}

// ============================================================
// عناصر التفاعل المشتركة
// ============================================================
function Choice43({
  options,
  value,
  onChange,
  label,
  english = true,
  compact = false,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  english?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "gap-1.5" : ""}`} role="group" aria-label={label}>
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={`rounded-lg border-2 px-2.5 py-1.5 text-sm font-bold transition ${
              active ? "border-violet-500 bg-violet-600 text-white shadow" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
            }`}
          >
            {english ? <En43>{option}</En43> : <Text43 text={option} />}
          </button>
        );
      })}
    </div>
  );
}

function Feedback43({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div role="status" className={`mt-3 rounded-2xl border-2 p-3 text-base font-semibold ${ok ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"}`}>
      <span className="mr-1 font-bold">{ok ? "✓ صحيح" : "✕ راجع"}</span> — {children}
    </div>
  );
}

/** مختبر تصنيف: جملة + خيارات وظيفة + تفسير فوري. */
function Classifier43({
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
  offset?: number;
}) {
  const [picks, setPicks] = useAnswer43(storeKey);
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  return (
    <>
      <p className="mb-3 text-base text-slate-600">
        <Text43 text={intro} />
      </p>
      <div className="grid gap-2.5 md:grid-cols-2">
        {rows.map((row, i) => {
          const value = chosen[String(i)] ?? "";
          return (
            <div key={row.en} className="rounded-xl border border-slate-200 bg-white p-2.5">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-slate-900 text-xs font-bold text-white">{offset + i + 1}</span>
                <p dir="ltr" lang="en" className="font-en text-base font-bold leading-7 text-slate-800">
                  {row.en}
                </p>
              </div>
              <div className="mt-1.5">
                <Choice43
                  options={options}
                  value={value}
                  label={`تصنيف الجملة ${offset + i + 1}`}
                  english={english}
                  compact
                  onChange={(next) => setPicks(JSON.stringify({ ...chosen, [String(i)]: next }))}
                />
              </div>
              {value && (
                <Feedback43 ok={value === row.answer}>
                  {value === row.answer ? <Text43 text={row.why} /> : <Text43 text={`الصحيح: ${row.answer}. ${row.why}`} />}
                </Feedback43>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ============================================================
// مختبر 1 — طيف الاحتمال الكيفي (§2): لا نسب مئوية ثابتة
// ============================================================
const SPECTRUM_ROWS = [
  { en: "She is at home.", answer: "مؤكد", why: "المتحدث يقرر المعلومة بوصفها واقعًا مؤكدًا، فلا فعل ناقص هنا." },
  { en: "The team will win.", answer: "مؤكد", why: "WILL تقدم توقعًا مباشرًا، أي أن المتحدث يقرر الفوز لا يراه احتمالًا." },
  { en: "She may be at home.", answer: "ممكن", why: "MAY تجعل وجودها في المنزل احتمالًا، لا حقيقة مؤكدة." },
  { en: "The shop may not be open.", answer: "ممكن", why: "MAY NOT تعبّر عن احتمال عدم الحدوث، لا عن منع." },
  { en: "It might rain tomorrow.", answer: "ممكن", why: "MIGHT تعبّر هي الأخرى عن احتمال مستقبلي." },
  { en: "He may be tired.", answer: "ممكن", why: "احتمال يتعلق بحالة الحاضر، والسياق لا يفرض تحفظًا أكبر." },
  { en: "It might not work.", answer: "ممكن", why: "احتمال سلبي في المستقبل." },
  { en: "She might be at home.", answer: "ممكن", why: "MAY وMIGHT لا تُعطيان نسبًا مئوية ثابتة؛ التصنيف هنا كيفي فقط." },
];

export function SpectrumLab43() {
  return (
    <Panel43 title="الطيف الاحتمالي — تصنيف كيفي" kicker="LAB 01 · QUALITATIVE SPECTRUM">
      <Classifier43
        storeKey="lab-spectrum"
        english={false}
        options={["مؤكد", "مرجح", "ممكن", "بعيد", "مستحيل"]}
        intro="صنّف كل جملة على الطيف الاحتمالي. هذا الطيف كيفي؛ لا توجد نسب مئوية ثابتة لـ MAY أو MIGHT."
        rows={SPECTRUM_ROWS}
      />
      <Note43 emoji="🌌">
        <Text43 text="MAY وMIGHT تعبّران عن الاحتمال، ولا تخبراننا بنسبة مئوية. المهم أن تعرف: هل الجملة تقرر واقعًا أم ترى احتمالًا؟" />
      </Note43>
    </Panel43>
  );
}

// ============================================================
// مختبر 2 — باني الجملة: Subject + MAY/MIGHT + V1 (§3)
// ============================================================
const BUILD_TASKS = [
  { hint: "قد أسافر غدًا.", subject: "I", modal: "may", verb: "travel", rest: "tomorrow", why: "I + may + travel (V1). القاعدة الذهبية: بعد MAY نستخدم V1 دون to ودون s ودون ing." },
  { hint: "ربما تزور جدتها.", subject: "She", modal: "might", verb: "visit", rest: "her grandmother", why: "مع She لا تتغير might، والفعل visit يبقى V1؛ علامة المفرد لا تُضاف بعد الفعل الناقص." },
  { hint: "قد يصلون متأخرين.", subject: "They", modal: "may", verb: "arrive", rest: "late", why: "MAY ثابتة مع They، ويبقى arrive بصيغة V1." },
  { hint: "ربما نحتاج إلى وقت إضافي.", subject: "We", modal: "might", verb: "need", rest: "more time", why: "MIGHT + V1: need لا needs ولا needing." },
];

const SUBJECTS = ["I", "She", "They", "We"];
const MODALS = ["may", "might", "mays", "mights"];
const VERBS = ["travel", "travels", "traveling", "to travel", "visit", "visits", "visiting", "to visit", "arrive", "arrives", "arriving", "to arrive", "need", "needs", "needing", "to need"];

export function BuilderLab43({ part = 1 }: { part?: 1 | 2 | 3 | 4 }) {
  const tasks = BUILD_TASKS.slice(part - 1, part);
  const [picks, setPicks] = useAnswer43(`lab-builder-${part}`);
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  return (
    <Panel43 title={`ابنِ جملة MAY/MIGHT قطعة قطعة (${part}/4)`} kicker={`LAB 02 · SENTENCE BUILDER ${part}/4`}>
      <Tip43>
        <Text43 text="اختر الفاعل ثم الفعل الناقص ثم صيغة الفعل الرئيسي. المختبر يسمّي القاعدة التي انكسرت إن وجدت." />
      </Tip43>
      <div className="mt-2 grid gap-2.5">
        {tasks.map((task, i) => {
          const subject = chosen[`${i}-subject`] ?? "";
          const modal = chosen[`${i}-modal`] ?? "";
          const verb = chosen[`${i}-verb`] ?? "";
          const done = subject !== "" && modal !== "" && verb !== "";
          const correct = subject === task.subject && modal === task.modal && verb === task.verb;
          const broken =
            verb === "" || verb.endsWith("s") || verb.endsWith("ing") || verb.startsWith("to ")
              ? "القاعدة المكسورة: بعد MAY/MIGHT يأتي V1 فقط — لا s ولا to ولا ing."
              : "";
          return (
            <div key={task.hint} className="rounded-xl border border-slate-200 bg-white p-2.5">
              <p className="text-sm font-bold text-slate-500">
                <Text43 text={`المعنى المطلوب: ${task.hint}`} />
              </p>
              <div className="mt-2 grid gap-2 md:grid-cols-3">
                <div>
                  <p className="mb-1 text-sm font-bold text-slate-500">1) الفاعل</p>
                  <Choice43 options={SUBJECTS} value={subject} label={`فاعل الجملة ${i + 1}`} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [`${i}-subject`]: next }))} />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-slate-500">2) الفعل الناقص</p>
                  <Choice43 options={MODALS} value={modal} label={`الفعل الناقص ${i + 1}`} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [`${i}-modal`]: next }))} />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-slate-500">3) صيغة الفعل الرئيسي</p>
                  <Choice43 options={VERBS} value={verb} label={`صيغة الفعل ${i + 1}`} onChange={(next) => setPicks(JSON.stringify({ ...chosen, [`${i}-verb`]: next }))} />
                </div>
              </div>
              {done && (
                <div className="mt-3">
                  <Sentence43
                    tokens={[
                      { text: subject, role: "subject" },
                      { text: modal, role: "modal" },
                      { text: verb, role: "main" },
                      { text: task.rest, role: "rest" as const },
                    ]}
                  />
                </div>
              )}
              {done && !correct && broken && (
                <p className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
                  <Text43 text={broken} />
                </p>
              )}
              {done && (
                <Feedback43 ok={correct}>
                  {correct ? (
                    <Text43 text={task.why} />
                  ) : (
                    <Text43 text={`البناء الصحيح: ${task.subject} ${task.modal} ${task.verb} ${task.rest}. ${task.why}`} />
                  )}
                </Feedback43>
              )}
            </div>
          );
        })}
      </div>
    </Panel43>
  );
}

// ============================================================
// مختبر 3 — آلة الفاعل: هل يتغير الفعل الناقص؟ (§4)
// ============================================================
const FORM_PRONOUNS = ["I", "You", "He", "She", "It", "We", "They"];

export function FormLab43() {
  const [index, setIndex] = useAnswer43("lab-form-index");
  const active = Number(index || "0");
  const pronoun = FORM_PRONOUNS[active] ?? FORM_PRONOUNS[0];
  return (
    <Panel43 title="آلة الفاعل: هل تتغير MAY وMIGHT؟" kicker="LAB 03 · SUBJECT MACHINE">
      <Choice43
        options={FORM_PRONOUNS}
        value={pronoun}
        label="اختر الفاعل"
        onChange={(next) => setIndex(String(FORM_PRONOUNS.indexOf(next)))}
      />
      <div className="mt-3 space-y-2">
        <p className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2">
          <span className="text-sm font-bold text-emerald-800">MAY: </span>
          <En43 className="text-lg font-extrabold text-emerald-900">{pronoun} may travel.</En43>
        </p>
        <p className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2">
          <span className="text-sm font-bold text-emerald-800">MIGHT: </span>
          <En43 className="text-lg font-extrabold text-emerald-900">{pronoun} might travel.</En43>
        </p>
        <p className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-3 py-2">
          <span className="text-sm font-bold text-rose-800">غير صحيح: </span>
          <En43 className="text-lg font-bold text-rose-900 line-through decoration-rose-300">{pronoun} mays travel.</En43>
        </p>
      </div>
      <Note43 emoji="🔬">
        <Text43 text="MAY وMIGHT ثابتتان مع جميع الضمائر، ولا نضيف s ولا es، ولا نستخدم do أو does أو did لتكوين السؤال." />
      </Note43>
    </Panel43>
  );
}

// ============================================================
// مختبر 4 — قرص الاحتمال: الزمن المقصود (§5/§9)
// ============================================================
const DIAL_ROWS = [
  { en: "She may be at home now.", answer: "الحاضر", why: "now يحدد أن الاحتمال يتعلق بالحاضر." },
  { en: "It may rain tomorrow.", answer: "المستقبل", why: "tomorrow يحدد احتمالًا مستقبليًا." },
  { en: "He might have forgotten the appointment.", answer: "الماضي", why: "MIGHT HAVE + V3 احتمال يتعلق بحدث ماضٍ." },
  { en: "We might travel tomorrow.", answer: "المستقبل", why: "tomorrow يحدد المستقبل." },
  { en: "She might be asleep.", answer: "الحاضر", why: "لا دليل على المستقبل؛ الجملة عن حالة الحاضر." },
  { en: "They might know the answer.", answer: "الحاضر", why: "احتمال يتعلق بالمعرفة الآن." },
  { en: "The keys might be in your bag.", answer: "الحاضر", why: "احتمال عن مكان الحاضر." },
  { en: "He might need a break.", answer: "الحاضر", why: "احتمال عن حاجة حالية." },
];

export function DialLab43() {
  return (
    <Panel43 title="قرص الاحتمال: في أي زمن تتحدث؟" kicker="LAB 04 · TIME READING">
      <Classifier43
        storeKey="lab-dial"
        english={false}
        options={["الحاضر", "المستقبل", "الماضي"]}
        intro="اقرأ الجملة وحدد الزمن الذي يعبر عنه الاحتمال. السياق هو الذي يحدد الزمن المقصود."
        rows={DIAL_ROWS}
      />
    </Panel43>
  );
}

// ============================================================
// مختبر 5 — مركّب MAY BE: افحص التركيب (§7)
// ============================================================
const MAYBE_COMPOSER_ROWS = [
  { en: "He may be tired.", answer: "MAY + BE", why: "MAY ثم الصيغة الأساسية من BE لربط الفاعل بوصف." },
  { en: "She may know the answer.", answer: "MAY + V1", why: "MAY ثم فعل رئيسي عادي بصيغة V1." },
  { en: "The answer may be correct.", answer: "MAY + BE", why: "MAY + BE + خبر." },
  { en: "They may need some help.", answer: "MAY + V1", why: "MAY ثم V1 مباشرة." },
  { en: "She may have missed the bus.", answer: "MAY + have + V3", why: "احتمال يتعلق بالماضي." },
  { en: "He may have lost his keys.", answer: "MAY + have + V3", why: "MAY HAVE + V3." },
];

export function MaybeComposerLab43() {
  return (
    <Panel43 title="افحص الجملة وصنّف تركيبها" kicker="LAB 05 · MAY + BE COMPOSER">
      <Classifier43
        storeKey="lab-maybe-composer"
        options={["MAY + BE", "MAY + V1", "MAY + have + V3"]}
        intro="صنّف كل جملة: هل فيها MAY + BE أم MAY + فعل رئيسي أم احتمال ماضٍ؟"
        rows={MAYBE_COMPOSER_ROWS}
      />
      <Note43 emoji="🔗">
        <Text43 text="بعد MAY نستخدم الصيغة الأساسية من BE: be لا is ولا are. She may is tired خطأ." />
      </Note43>
    </Panel43>
  );
}

// ============================================================
// مختبر 6 — هل يمكن تبديل MAY وMIGHT؟ (§11)
// ============================================================
const SWAP_ROWS = [
  { en: "She may come later. / She might come later.", answer: "قابل للتبديل", why: "الجملتان صحيحتان، والاختيار يعتمد على درجة التحفظ والأسلوب." },
  { en: "We may need more information. / We might need more information.", answer: "قابل للتبديل", why: "المصدر يقرر أن كلتاهما صحيحتان." },
  { en: "This plan may work. / This plan might work.", answer: "قابل للتبديل", why: "كلتاهما صحيحتان — الاختيار أسلوبي." },
  { en: "May I ask a question? / Might I ask a question?", answer: "قد لا يكون", why: "MAY هي الصيغة الطبيعية لطلب الإذن؛ MIGHT صيغة رسمية قديمة وليست الافتراض اليومي." },
  { en: "Yes, you may. / Yes, you might.", answer: "قد لا يكون", why: "منح الإذن الطبيعي هو yes, you may." },
  { en: "You may enter. / You might enter.", answer: "قد لا يكون", why: "MAY هي الصيغة المعتادة لمنح الإذن." },
];

export function SwapLab43() {
  return (
    <Panel43 title="هل يمكن تبديل MAY وMIGHT؟" kicker="LAB 06 · INTERCHANGEABILITY">
      <Classifier43
        storeKey="lab-swap"
        english={false}
        options={["قابل للتبديل", "قد لا يكون"]}
        intro="في كثير من الجمل اليومية يمكن تبديل الصيغتين، لكن ليس في جميع الاستخدامات — خاصة طلب الإذن ومنحه."
        rows={SWAP_ROWS}
      />
      <Note43 emoji="🚫">
        <Text43 text="لا تربط MAY أو MIGHT بنسبة مئوية ثابتة: لا توجد قاعدة نسبية ثابتة تجعل إحداهما دائمًا أقوى." />
      </Note43>
    </Panel43>
  );
}

// ============================================================
// مختبر 7 — احتمال عدم الحدوث أم منع؟ (§13)
// ============================================================
const NEGATION_ROWS = [
  { en: "She may not come tomorrow.", answer: "احتمال عدم الحدوث", why: "MAY NOT هنا تعبّر عن أن عدم المجيء أمر محتمل، لا عن منع." },
  { en: "We may not finish the project today.", answer: "احتمال عدم الحدوث", why: "احتمال أن لا ننهي المشروع اليوم." },
  { en: "He may not know the answer.", answer: "احتمال عدم الحدوث", why: "احتمال عدم المعرفة." },
  { en: "The shop may not be open.", answer: "احتمال عدم الحدوث", why: "احتمال أن لا يكون المتجر مفتوحًا." },
  { en: "You may not enter this room.", answer: "منع (رسمي)", why: "في بعض السياقات الرسمية يمكن أن تحمل MAY NOT معنى عدم السماح." },
  { en: "I might not attend the meeting.", answer: "احتمال عدم الحدوث", why: "احتمال عدم الحضور." },
];

export function NegationLab43() {
  return (
    <Panel43 title="MAY NOT — احتمال عدم الحدوث أم منع؟" kicker="LAB 07 · NEGATION MEANING">
      <Classifier43
        storeKey="lab-negation"
        english={false}
        options={["احتمال عدم الحدوث", "منع (رسمي)"]}
        intro="MAY NOT تعبّر في الأغلب عن احتمال عدم الحدوث، وقد تحمل معنى المنع في سياقات رسمية. السياق مهم."
        rows={NEGATION_ROWS}
      />
    </Panel43>
  );
}

// ============================================================
// مختبر 8 — MAY NOT أم MUST NOT؟ (§14)
// ============================================================
const MUSTNOT_ROWS = [
  { en: "She ______ come tomorrow.", answer: "may not", why: "احتمال عدم المجيء — ليس منعًا." },
  { en: "You ______ enter this room.", answer: "must not", why: "MUST NOT تعبّر عن المنع قاطعًا." },
  { en: "He ______ know the answer.", answer: "may not", why: "احتمال عدم المعرفة." },
  { en: "You ______ smoke here.", answer: "must not", why: "المنع قاطع." },
  { en: "They ______ arrive on time.", answer: "may not", why: "احتمال عدم الوصول في الوقت." },
  { en: "Students ______ use phones in class.", answer: "must not", why: "قاعدة مانعة." },
];

export function MustNotLab43() {
  const [picks, setPicks] = useAnswer43("lab-mustnot");
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  return (
    <Panel43 title="اختر MAY NOT أم MUST NOT" kicker="LAB 08 · PROBABILITY vs PROHIBITION">
      <p className="mb-3 text-base text-slate-600">
        <Text43 text="MAY NOT تعبّر عن احتمال عدم الحدوث، أما MUST NOT فتعبّر عن المنع. اقرأ السياق." />
      </p>
      <div className="grid gap-3">
        {MUSTNOT_ROWS.map((row, i) => {
          const value = chosen[String(i)] ?? "";
          return (
            <div key={row.en} className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-900 text-sm font-bold text-white">{i + 1}</span>
                <p dir="ltr" lang="en" className="font-en text-lg font-bold text-slate-800">
                  {row.en}
                </p>
              </div>
              <div className="mt-2">
                <Choice43
                  options={["may not", "must not"]}
                  value={value}
                  label={`اختيار الجملة ${i + 1}`}
                  onChange={(next) => setPicks(JSON.stringify({ ...chosen, [String(i)]: next }))}
                />
              </div>
              {value && (
                <Feedback43 ok={value === row.answer}>
                  {value === row.answer ? <Text43 text={row.why} /> : <Text43 text={`الصحيح: ${row.answer}. ${row.why}`} />}
                </Feedback43>
              )}
            </div>
          );
        })}
      </div>
    </Panel43>
  );
}

// ============================================================
// مختبر 9 — سلم اللباقة: Can I < Could I < May I < Might I (§15)
// ============================================================
const FORMALITY_LADDER = [
  { form: "Can I...?", ar: "طبيعي وشائع في المحادثة اليومية.", tone: "border-sky-200 bg-sky-50 text-sky-900", dot: "bg-sky-500" },
  { form: "Could I...?", ar: "مهذب وأقل مباشرة عادةً.", tone: "border-violet-200 bg-violet-50 text-violet-900", dot: "bg-violet-500" },
  { form: "May I...?", ar: "مهذب، وقد يكون أكثر رسمية.", tone: "border-orange-200 bg-orange-50 text-orange-900", dot: "bg-orange-500" },
  { form: "Might I...?", ar: "MIGHT I صيغة رسمية قديمة — ليست الافتراض اليومي.", tone: "border-slate-300 bg-slate-100 text-slate-700", dot: "bg-slate-500" },
];

const PERMISSION_ROWS = [
  { en: "تفتح النافذة في اجتماع عائلي لطيف.", answer: "Can I", why: "كلام يومي طبيعي." },
  { en: "تطلب من معلمك الإذن بلطف في الصف.", answer: "Could I", why: "طلب مهذب أقل مباشرة." },
  { en: "تطلب الإذن في سياق رسمي.", answer: "May I", why: "MAY أكثر رسمية." },
  { en: "صيغة مهذبة جدًا رسمية أو قديمة.", answer: "Might I", why: "MIGHT صيغة رسمية قديمة — لا تجعلها الافتراض اليومي." },
  { en: "تطلب من صديقك الإذن بسرعة.", answer: "Can I", why: "كلام يومي بين الأصدقاء." },
];

export function PermissionLab43() {
  return (
    <Panel43 title="سلم اللباقة — اختر الصيغة" kicker="LAB 09 · FORMALITY LADDER">
      <div className="grid gap-2 md:grid-cols-2">
        {FORMALITY_LADDER.map((rung) => (
          <div key={rung.form} className={`flex items-start gap-3 rounded-2xl border-2 p-3 ${rung.tone}`}>
            <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${rung.dot}`} aria-hidden="true" />
            <div>
              <En43 className="text-lg font-extrabold">{rung.form}</En43>
              <p className="text-sm font-bold">{rung.ar}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Classifier43
          storeKey="lab-permission"
          options={["Can I", "Could I", "May I", "Might I"]}
          intro="صنّف كل موقف بحسب درجة الرسمية والتهذيب المطلوبة."
          rows={PERMISSION_ROWS}
        />
      </div>
    </Panel43>
  );
}

// ============================================================
// مختبر 10 — صِل الموقف بالصيغة (§17)
// ============================================================
const PERMISSION_SCENARIOS = [
  { en: "تطلب من زميلك الإذن باستعمال حاسوبه.", answer: "Could I", why: "طلب مهذب." },
  { en: "تطلب من مديرك الإذن بدخول المكتب.", answer: "May I", why: "سياق رسمي." },
  { en: "تستأذن صديقك في استعمال قلمه.", answer: "Can I", why: "كلام يومي." },
  { en: "تكتب رسالة رسمية تطلب فيها الإذن.", answer: "May I", why: "MAY أكثر ملاءمة للأسلوب الرسمي." },
  { en: "تطلب الإذن في موقف رسمي قديم الطراز.", answer: "Might I", why: "MIGHT صيغة قديمة رسمية — ليست الافتراض اليومي." },
];

export function PermissionScenariosLab43() {
  return (
    <Panel43 title="صِل الموقف بالصيغة" kicker="LAB 10 · SCENARIO MATCHING">
      <Classifier43
        storeKey="lab-permission-scenarios"
        english={false}
        options={["Can I", "Could I", "May I", "Might I"]}
        intro="في كل موقف اختر الصيغة الأنسب. نعتمد عمليًا Can I وCould I وMay I، أما Might I فرسمية/قديمة."
        rows={PERMISSION_SCENARIOS}
      />
    </Panel43>
  );
}

// ============================================================
// مختبر 11 — MAYBE مقابل MAY BE (§18)
// ============================================================
const MAYBE_ROWS = [
  { en: "Maybe she is tired.", answer: "ظرف مستقل (Maybe)", why: "Maybe ظرف مستقل، وما بعدها جملة كاملة." },
  { en: "She may be tired.", answer: "MAY + BE", why: "may فعل ناقص + be الصيغة الأساسية من BE." },
  { en: "Maybe we'll travel tomorrow.", answer: "ظرف مستقل (Maybe)", why: "Maybe تقف في بداية الجملة كظرف." },
  { en: "He may be tired.", answer: "MAY + BE", why: "MAY + BE + خبر." },
  { en: "The answer may be correct.", answer: "MAY + BE", why: "MAY + BE." },
  { en: "Maybe he forgot the meeting.", answer: "ظرف مستقل (Maybe)", why: "Maybe ظرف مستقل." },
];

export function MaybeLab43() {
  return (
    <Panel43 title="صنّف التعبير: Maybe أم may be؟" kicker="LAB 11 · ADVERB vs MODAL+BE">
      <Classifier43
        storeKey="lab-maybe"
        english={false}
        options={["ظرف مستقل (Maybe)", "MAY + BE"]}
        intro="MAYBE كلمة واحدة مستقلة، أما MAY BE كلمتان: فعل ناقص + الصيغة الأساسية من BE."
        rows={MAYBE_ROWS}
      />
      <Note43 emoji="🔥">
        <Text43 text="She maybe tired خطأ؛ الصواب She may be tired أو Maybe she is tired." />
      </Note43>
    </Panel43>
  );
}

// ============================================================
// مختبر 12 — محلّل احتمال الماضي (§20)
// ============================================================
const PAST_TASKS = [
  { sentence: "She may have missed the bus.", modal: "may", have: "have", v3: "missed" },
  { sentence: "They may have arrived early.", modal: "may", have: "have", v3: "arrived" },
  { sentence: "He may have lost his keys.", modal: "may", have: "have", v3: "lost" },
  { sentence: "The teacher may have changed the schedule.", modal: "may", have: "have", v3: "changed" },
  { sentence: "She might have forgotten her homework.", modal: "might", have: "have", v3: "forgotten" },
  { sentence: "We might have made a mistake.", modal: "might", have: "have", v3: "made" },
];

export function PastLab43() {
  const [picks, setPicks] = useAnswer43("lab-past");
  const chosen = useMemo(() => JSON.parse(picks || "{}") as Record<string, string>, [picks]);
  return (
    <Panel43 title="فكّك الجملة: فعل ناقص + have + V3" kicker="LAB 12 · PAST POSSIBILITY ANALYSER">
      <p className="mb-3 text-base text-slate-600">
        <Text43 text="اختر الفعل الناقص ثم have ثم V3. لا نؤكد أن الحدث وقع؛ نحن نطرحه احتمالًا يتعلق بالماضي." />
      </p>
      <div className="grid gap-2.5 md:grid-cols-2">
        {PAST_TASKS.map((task, i) => {
          const modal = chosen[`${i}-modal`] ?? "";
          const have = chosen[`${i}-have`] ?? "";
          const v3 = chosen[`${i}-v3`] ?? "";
          const filled = modal !== "" && have !== "" && v3 !== "";
          const correct = modal === task.modal && have === task.have && v3 === task.v3;
          const update = (key: string, value: string) => setPicks(JSON.stringify({ ...chosen, [`${i}-${key}`]: value }));
          return (
            <div key={task.sentence} className="rounded-xl border border-slate-200 bg-white p-2.5">
              <p dir="ltr" lang="en" className="font-en text-base font-bold leading-7 text-slate-900">
                {task.sentence}
              </p>
              <div className="mt-2 grid gap-2 md:grid-cols-3">
                <div>
                  <p className="mb-1 text-sm font-bold text-slate-500">الفعل الناقص</p>
                  <Choice43 options={["may", "might"]} value={modal} label={`الفعل الناقص ${i + 1}`} onChange={(next) => update("modal", next)} />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-slate-500">HAVE</p>
                  <Choice43 options={["have"]} value={have} label={`HAVE ${i + 1}`} onChange={(next) => update("have", next)} />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-slate-500">V3</p>
                  <Choice43 options={task.v3 === "missed" ? ["missed", "miss", "missing"] : task.v3 === "arrived" ? ["arrived", "arrive", "arriving"] : task.v3 === "lost" ? ["lost", "lose", "losing"] : task.v3 === "changed" ? ["changed", "change", "changing"] : task.v3 === "forgotten" ? ["forgotten", "forgot", "forgetting"] : ["made", "make", "making"]} value={v3} label={`V3 ${i + 1}`} onChange={(next) => update("v3", next)} />
                </div>
              </div>
              {filled && (
                <Feedback43 ok={correct}>
                  {correct ? (
                    <Text43 text="MAY/MIGHT + have + V3 يعبّر عن احتمال يتعلق بالماضي، لا عن خبر بأنه وقع." />
                  ) : (
                    <Text43 text={`التركيب الصحيح: ${task.modal} have ${task.v3}. V3 هي صيغة الماضي بعد have.`} />
                  )}
                </Feedback43>
              )}
            </div>
          );
        })}
      </div>
    </Panel43>
  );
}

// ============================================================
// مختبر 13 — مصفوفة الأفعال الأربعة (§24)
// ============================================================
const MATRIX_ROWS = [
  { en: "I can swim.", answer: "قدرة حالية", why: "CAN للقدرة الحالية." },
  { en: "I could swim when I was six.", answer: "قدرة عامة في الماضي", why: "COULD للقدرة العامة في الماضي." },
  { en: "It can be cold here in winter.", answer: "إمكانية عامة", why: "CAN للإمكانية العامة." },
  { en: "It may be cold tomorrow.", answer: "احتمال", why: "MAY للاحتمال في موقف معين." },
  { en: "It might be cold tomorrow.", answer: "احتمال", why: "MIGHT للاحتمال." },
  { en: "May I ask a question?", answer: "طلب إذن", why: "MAY لطلب الإذن." },
  { en: "Could you help me?", answer: "طلب", why: "COULD لطلب مهذب." },
  { en: "We might visit the museum tomorrow.", answer: "احتمال أو اقتراح", why: "MIGHT للاحتمال أو الاقتراح بحسب السياق." },
];

export function MatrixLab43() {
  return (
    <Panel43 title="مصفوفة الأفعال الأربعة" kicker="LAB 13 · FOUR-MODAL MATRIX">
      <Classifier43
        storeKey="lab-matrix"
        english={false}
        options={["قدرة حالية", "قدرة عامة في الماضي", "إمكانية عامة", "احتمال", "احتمال أو اقتراح", "طلب إذن", "طلب"]}
        intro="صنّف كل جملة على المصفوفة. كل فعل ناقص يضيف معنى مختلفًا، والسياق هو الذي يحدد الوظيفة."
        rows={MATRIX_ROWS}
      />
    </Panel43>
  );
}

// ============================================================
// مختبر 14 — دليل القرار (§25)
// ============================================================
const DECISION_ROWS = [
  { en: "هل أتحدث عن قدرة حالية؟", answer: "CAN", why: "القدرة الحالية تستخدم CAN." },
  { en: "هل أتحدث عن قدرة عامة في الماضي؟", answer: "COULD", why: "القدرة العامة في الماضي تستخدم COULD." },
  { en: "هل أطلب الإذن؟", answer: "CAN أو COULD أو MAY", why: "بحسب مستوى الرسمية والتهذيب." },
  { en: "هل أتحدث عن إمكانية عامة؟", answer: "CAN", why: "CAN شائعة في الإمكانية العامة." },
  { en: "هل أتحدث عن احتمال غير مؤكد؟", answer: "MAY أو MIGHT أو COULD", why: "بحسب السياق." },
  { en: "هل أتحدث عن احتمال يتعلق بالماضي؟", answer: "MAY HAVE أو MIGHT HAVE", why: "MAY/MIGHT + have + V3." },
];

export function DecisionLab43() {
  return (
    <Panel43 title="اختر الفعل من الموقف" kicker="LAB 14 · DECISION GUIDE">
      <Classifier43
        storeKey="lab-decision"
        options={["CAN", "COULD", "MAY", "MIGHT", "CAN أو COULD أو MAY", "MAY أو MIGHT أو COULD", "MAY HAVE أو MIGHT HAVE"]}
        intro="اسأل نفسك عن المعنى أولًا، ثم اختر الفعل. ليس المطلوب حفظ كلمة واحدة لكل معنى بل فهم العلاقة بين المعنى والسياق."
        rows={DECISION_ROWS}
      />
    </Panel43>
  );
}

// ============================================================
// مختبر 15 — محلّل الحوار (§26)
// ============================================================
const DETECTIVE_ROWS = [
  { en: "It may be", answer: "احتمال في الحاضر", why: "MAY + BE احتمال يتعلق بالحاضر." },
  { en: "It might be", answer: "احتمال في الحاضر", why: "MIGHT + BE احتمال يتعلق بالحاضر." },
  { en: "Could someone have moved it?", answer: "سؤال عن احتمال يتعلق بالماضي", why: "COULD HAVE + V3 سؤال عن احتمال ماضٍ." },
  { en: "Maybe", answer: "ظرف بمعنى ربما", why: "MAYBE ظرف مستقل." },
  { en: "may have put", answer: "احتمال في الماضي", why: "MAY HAVE + V3." },
  { en: "might have left", answer: "احتمال في الماضي", why: "MIGHT HAVE + V3." },
  { en: "May I check...?", answer: "طلب إذن", why: "MAY I...? تطلب الإذن." },
  { en: "you may", answer: "منح الإذن", why: "yes, you may تمنح الإذن." },
];

export function DetectiveLab43() {
  return (
    <Panel43 title="وسم الاستخدامات في حوار The Missing Science Project" kicker="LAB 15 · DIALOGUE ANALYSER">
      <Classifier43
        storeKey="lab-detective"
        english={false}
        options={["احتمال في الحاضر", "احتمال في الماضي", "سؤال عن احتمال يتعلق بالماضي", "ظرف بمعنى ربما", "طلب إذن", "منح الإذن"]}
        intro="صنّف كل استخدام لـ MAY وMIGHT في الحوار الشامل. لاحظ أن الفعلين نفسيهما يعبران عن وظائف مختلفة."
        rows={DETECTIVE_ROWS}
      />
    </Panel43>
  );
}

// ============================================================
// التدريب — بطاقة واحدة لكل بند، والحل لا يظهر قبل المحاولة
// ============================================================
export function PracticeCard43({ item }: { item: PracticeItem43 }) {
  const [values, setValues] = useAnswer43(`${item.id}-values`);
  const [checked, setChecked] = useAnswer43(`${item.id}-checked`);
  const answers = useMemo(() => JSON.parse(values || "{}") as Record<string, string>, [values]);
  const filled = item.fields.every((_, i) => Boolean(answers[String(i)]?.trim()));
  const pair = item.fields.length > 1;
  const correct = pair ? isPairCorrect43(item, answers["0"] ?? "", answers["1"] ?? "") : isCorrect43(item, answers["0"] ?? "");
  const update = (key: string, value: string) => {
    setValues(JSON.stringify({ ...answers, [key]: value }));
    setChecked("");
  };
  return (
    <article data-practice-item={item.id} className="rounded-2xl border border-slate-200 bg-white p-3 md:p-4">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-violet-600 text-xs font-bold text-white">{item.number}</span>
        <span className="text-xs font-bold text-slate-500">§{item.section}</span>
      </div>
      <p dir="ltr" lang="en" className="font-en mt-2 text-lg font-bold text-slate-900">
        {item.prompt}
      </p>
      {item.context?.map((line) => (
        <p key={line} className="mt-1 text-sm font-semibold text-slate-600">
          <Text43 text={line} />
        </p>
      ))}
      {item.options && (
        <div className="mt-2">
          <Choice43 options={item.options} value={answers["0"] ?? ""} label={`خيارات السؤال ${item.number}`} onChange={(next) => update("0", next)} />
        </div>
      )}
      {!item.options && (
        <div className={`mt-2 grid gap-2 ${pair ? "md:grid-cols-2" : ""}`}>
          {item.fields.map((label, i) => (
            <label key={label} className="block text-sm font-bold text-slate-600">
              <Text43 text={label} />
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
          data-practice-check
          disabled={!filled}
          onClick={() => setChecked("yes")}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40"
        >
          <Text43 text="قارن إجابتي بالحل" />
        </button>
      </div>
      {checked && (
        <Feedback43 ok={correct}>
          <span className="block">
            <Text43 text="الإجابة:" /> <span dir="auto" className="font-en">{item.answer}</span>
          </span>
          <span className="mt-1 block text-sm font-medium leading-relaxed">
            <Text43 text={item.reason} />
          </span>
          <span className="mt-1 block text-xs font-semibold text-slate-500">
            <Text43 text="هذه مقارنة للمراجعة الذاتية، ولا يُصحَّح آليًا." />
          </span>
        </Feedback43>
      )}
    </article>
  );
}

export function PracticeSet43({ section, from, to }: { section: number; from: number; to: number }) {
  const items = itemsFor43(section, from, to);
  return (
    <div className="grid gap-3">
      <Tip43>
        <Text43 text="اكتب محاولتك أولًا، ثم اضغط «قارن إجابتي بالحل». المقارنة للمراجعة الذاتية، والحل لا يظهر قبل المحاولة." />
      </Tip43>
      {items.map((item) => (
        <PracticeCard43 key={item.id} item={item} />
      ))}
    </div>
  );
}

// ============================================================
// القراءة — The Unexpected School Trip (§32)
// ============================================================
export function Reading43({ part }: { part: "passage-1" | "passage-2" }) {
  const lines = sectionLines43(32);
  // 0 = العنوان، 1–19 = النص (10 أسطر فعلية)، 20 = «أسئلة الفهم» (عنوان لا جزءًا من النص).
  const body = part === "passage-1" ? lines.slice(1, 10) : lines.slice(10, 20);
  return (
    <div className="rounded-3xl border-2 border-sky-100 bg-sky-50/40 p-4 md:p-5">
      <p className="text-sm font-bold text-sky-700">READING · A DAY FULL OF POSSIBILITIES · {part === "passage-1" ? "1/2" : "2/2"}</p>
      {part === "passage-1" && (
        <h3 dir="ltr" lang="en" className="font-en mt-1 text-2xl font-extrabold text-slate-900">
          {lines[0]}
        </h3>
      )}
      <div className="mt-3 space-y-2">
        {body.map((line, i) => (
          <p key={i} dir="ltr" lang="en" className="font-en text-lg leading-9 text-slate-800">
            {line}
          </p>
        ))}
      </div>
      {part === "passage-2" && (
        <Note43 emoji="🔎">
          <Text43 text="لاحظ أربع وظائف في نص واحد: MAY/MIGHT للاحتمال، MAY HAVE للاحتمال الماضي، MAYBE ظرف، وMAY I لطلب الإذن." />
        </Note43>
      )}
    </div>
  );
}

// ============================================================
// مهمة الكتابة (§35)
// ============================================================
const WRITING_CRITERIA = [
  "ثلاث جمل باستخدام MAY.",
  "ثلاث جمل باستخدام MIGHT.",
  "جملتين باستخدام MAY NOT أو MIGHT NOT.",
  "جملة باستخدام MAY BE.",
  "جملة تبدأ بكلمة MAYBE.",
  "جملتين باستخدام MAY HAVE أو MIGHT HAVE.",
  "طلب إذن باستخدام May I...?",
  "مقارنة واحدة بين CAN وMAY أو MIGHT.",
];

function countSentences43(text: string): number {
  return text
    .split(/[.!?\n]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 1).length;
}

export function WritingMission43({ part }: { part: "editor" | "criteria" | "model" }) {
  const [draft, setDraft] = useAnswer43("writing-43");
  const [checks, setChecks] = useAnswer43("writing-43-checks");
  const done = useMemo(() => JSON.parse(checks || "{}") as Record<string, boolean>, [checks]);
  const doneCount = Object.values(done).filter(Boolean).length;
  if (part === "editor") {
    return (
      <Panel43 title="مساحة الكتابة" kicker="WRITING · 12–15 SENTENCES">
        <label className="block text-sm font-bold text-slate-600">
          <Text43 text="A Day of Possibilities" />
          <textarea
            dir="ltr"
            rows={12}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Our class is planning a trip next week. We may visit..."
            className="font-en mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-base leading-8 text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white"
          />
        </label>
        <p role="status" className="mt-2 text-sm font-bold text-slate-500">
          <Text43 text="عدد الجمل التقريبي:" /> <bdi dir="ltr">{countSentences43(draft)} / 12–15</bdi>
        </p>
        <Tip43>
          <Text43 text="العدّاد تقريبي ويعتمد على علامات الترقيم؛ راجع العدد بنفسك. التقييم النهائي يدوي وفق سلم التقييم في مساحة المعلم." />
        </Tip43>
      </Panel43>
    );
  }
  if (part === "criteria") {
    return (
      <Panel43 title="المعايير الثمانية" kicker="CHECKLIST">
        <p role="status" className="mb-2 text-sm font-bold text-slate-500">
          <Text43 text="المعايير المستوفاة:" /> <bdi dir="ltr">{doneCount} / {WRITING_CRITERIA.length}</bdi>
        </p>
        <ul className="grid gap-2 md:grid-cols-2">
          {WRITING_CRITERIA.map((criterion, i) => (
            <li key={criterion}>
              <label className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  checked={Boolean(done[String(i)])}
                  onChange={(event) => setChecks(JSON.stringify({ ...done, [String(i)]: event.target.checked }))}
                />
                <Text43 text={criterion} />
              </label>
            </li>
          ))}
        </ul>
        <Note43 emoji="✍️">
          <Text43 text="لا تنسخ النموذج؛ اكتب فقرتك الخاصة. التقييم النهائي يدوي وفق سلم التقييم في مساحة المعلم." />
        </Note43>
      </Panel43>
    );
  }
  return (
    <Panel43 title="الفقرة النموذجية" kicker="MODEL PARAGRAPH">
      <div className="space-y-2">
        {sectionLines43(35).slice(13, 22).map((line, i) => (
          <p key={i} dir="ltr" lang="en" className="font-en text-lg leading-9 text-slate-800">
            {line}
          </p>
        ))}
      </div>
      <Note43 emoji="✍️">
        <Text43 text="هذه فقرة نموذجية من إضافة المنصة (§35 «نموذج إرشادي») تُظهر كل الاستخدامات المطلوبة، وهي تسع جمل فقط. اكتب فقرتك الكاملة بنفسك ولا تنسخها." />
      </Note43>
    </Panel43>
  );
}

export const WRITING_CRITERIA_43 = WRITING_CRITERIA;
