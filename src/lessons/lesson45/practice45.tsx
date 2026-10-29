import { useState } from "react";
import { En45, Note45, SentenceCard45, Text45 } from "./design45";
import { normalizeEn45 } from "./testData45";

export type WorkspaceState45 = {
  choiceAnswers: Record<string, string>;
  choiceChecked: Record<string, boolean>;
  textAnswers: Record<string, string>;
  textStatus: Record<string, "idle" | "ok" | "bad" | "revealed">;
  readingOpen: Record<string, boolean>;
  readingDrafts: Record<string, string>;
  writingDraft: string;
  writingModelOpen: boolean;
  selfChecks: Record<number, boolean>;
};

export function createInitialWorkspace45(): WorkspaceState45 {
  return {
    choiceAnswers: {},
    choiceChecked: {},
    textAnswers: {},
    textStatus: {},
    readingOpen: {},
    readingDrafts: {},
    writingDraft: "",
    writingModelOpen: false,
    selfChecks: {},
  };
}

// ============================================================
// المختبر 1: مولّد النصيحة وباني الجملة التفاعلي (مطابق لروح Lesson 1 Builder)
// ============================================================
const ADVICE_SITUATIONS = [
  {
    id: "exam",
    label: "امتحان مهم غدًا",
    tokens: [
      { en: "You", role: "subject" as const, ar: "الفاعل" },
      { en: "should", role: "modal" as const, ar: "فعل النصيحة" },
      { en: "revise", role: "verb" as const, ar: "فعل أساسي V1" },
      { en: "the most important topics first", role: "rest" as const, ar: "التكملة" },
    ],
    ar: "ينبغي أن تراجع أهم الموضوعات أولًا.",
  },
  {
    id: "tired",
    label: "التعب والسهر المتكرر",
    tokens: [
      { en: "You", role: "subject" as const, ar: "الفاعل" },
      { en: "should", role: "modal" as const, ar: "فعل النصيحة" },
      { en: "go", role: "verb" as const, ar: "فعل أساسي V1" },
      { en: "to bed earlier", role: "rest" as const, ar: "التكملة" },
    ],
    ar: "ينبغي أن تنام في وقت أبكر.",
  },
  {
    id: "phone",
    label: "قضاء وقت طويل على الهاتف",
    tokens: [
      { en: "You", role: "subject" as const, ar: "الفاعل" },
      { en: "shouldn't", role: "neg" as const, ar: "نفي النصيحة" },
      { en: "spend", role: "verb" as const, ar: "فعل أساسي V1" },
      { en: "too much time on your phone", role: "rest" as const, ar: "التكملة" },
    ],
    ar: "من الأفضل ألا تقضي وقتًا طويلًا على هاتفك.",
  },
  {
    id: "words",
    label: "نسيان المفردات الجديدة",
    tokens: [
      { en: "You", role: "subject" as const, ar: "الفاعل" },
      { en: "should", role: "modal" as const, ar: "فعل النصيحة" },
      { en: "use", role: "verb" as const, ar: "فعل أساسي V1" },
      { en: "each new word in a sentence", role: "rest" as const, ar: "التكملة" },
    ],
    ar: "ينبغي أن تستخدم كل كلمة جديدة في جملة.",
  },
] as const;

export function AdviceLab45() {
  const [picked, setPicked] = useState<string>("exam");
  const current = ADVICE_SITUATIONS.find((s) => s.id === picked) ?? ADVICE_SITUATIONS[0];

  return (
    <div className="space-y-4 rounded-3xl border-2 border-violet-200 bg-violet-50/50 p-5">
      <div>
        <span className="rounded-full bg-violet-600 px-3 py-0.5 text-xs font-bold text-white">
          مختبر تفاعلي
        </span>
        <h3 className="font-head mt-1.5 text-xl font-bold text-slate-900">
          مولّد النصيحة الذكية · <En45>Advice Generator</En45>
        </h3>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          اختر موقفًا وراقب تشريح الجملة النحوي:
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {ADVICE_SITUATIONS.map((s) => {
          const active = s.id === current.id;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              onClick={() => setPicked(s.id)}
              className={`rounded-2xl border-2 px-4 py-2.5 text-sm font-bold transition md:text-base ${
                active
                  ? "border-violet-600 bg-violet-600 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <SentenceCard45 tokens={[...current.tokens]} ar={current.ar} badge="نصيحة عملية" />
    </div>
  );
}

// ============================================================
// المختبر 2: مفتاح المعنى (SHOULD vs MUST vs HAVE TO vs MUSTN'T vs DON'T HAVE TO)
// ============================================================
const MEANING_MODES = [
  {
    id: "should",
    label: "SHOULD",
    en: "You should wear a helmet.",
    ar: "ينبغي أن ترتدي خوذة.",
    tag: "نصيحة وتوصية هادئة",
    why: "ننصح بالفعل لأنه مفيد وآمن، دون فرض عقوبة قانونية.",
    tone: "border-sky-300 bg-sky-50 text-sky-950",
  },
  {
    id: "must",
    label: "MUST",
    en: "You must wear a helmet.",
    ar: "يجب أن ترتدي خوذة.",
    tag: "إلزام قوي أو تعليمات مؤكدة",
    why: "ضرورة ملزمِة يفرضها المتحدث بقوة أو تنص عليها لائحة صريحة.",
    tone: "border-orange-300 bg-orange-50 text-orange-950",
  },
  {
    id: "have",
    label: "HAVE TO",
    en: "You have to wear a helmet.",
    ar: "يجب عليك ارتداء خوذة.",
    tag: "ضرورة خارجية أو متطلب نظامي",
    why: "قاعدة أو قانون خارجي مفروض على الجميع.",
    tone: "border-violet-300 bg-violet-50 text-violet-950",
  },
  {
    id: "shouldnt",
    label: "SHOULDN'T",
    en: "You shouldn't enter this room.",
    ar: "من الأفضل ألا تدخل هذه الغرفة.",
    tag: "نصيحة بعدم الفعل",
    why: "الدخول غير مناسب، لكننا ننصح بالتجنب ولا نعلن حظرًا رسميًا.",
    tone: "border-amber-300 bg-amber-50 text-amber-950",
  },
  {
    id: "mustnt",
    label: "MUSTN'T",
    en: "You mustn't enter this room.",
    ar: "يُمنع عليك دخول هذه الغرفة.",
    tag: "منع باتّ وحظر",
    why: "الفعل ممنوع تمامًا وغير مسموح به.",
    tone: "border-rose-300 bg-rose-50 text-rose-950",
  },
  {
    id: "dont",
    label: "DON'T HAVE TO",
    en: "You don't have to enter this room.",
    ar: "لست مضطرًا إلى دخول هذه الغرفة.",
    tag: "عدم ضرورة (اختياري)",
    why: "لا يوجد إلزام بالدخول؛ لك حرية الاختيار.",
    tone: "border-emerald-300 bg-emerald-50 text-emerald-950",
  },
] as const;

export function MeaningLab45() {
  const [selected, setSelected] = useState<string>("should");
  const active = MEANING_MODES.find((m) => m.id === selected) ?? MEANING_MODES[0];

  return (
    <div className="space-y-4 rounded-3xl border-2 border-sky-200 bg-sky-50/40 p-5">
      <div>
        <span className="rounded-full bg-sky-600 px-3 py-0.5 text-xs font-bold text-white">
          مقارنة تفاعلية
        </span>
        <h3 className="font-head mt-1.5 text-xl font-bold text-slate-900">
          مفتاح درجة القوة والمعنى · <En45>Meaning Switch</En45>
        </h3>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          بدّل الفعل المساعد ولاحظ كيف يتحول المعنى من النصيحة إلى الإلزام أو المنع أو عدم الضرورة:
        </p>
      </div>

      <div dir="ltr" className="flex flex-wrap gap-2">
        {MEANING_MODES.map((m) => {
          const picked = m.id === active.id;
          return (
            <button
              key={m.id}
              type="button"
              aria-pressed={picked}
              onClick={() => setSelected(m.id)}
              className={`font-en rounded-2xl border-2 px-4 py-2 text-sm font-extrabold transition ${
                picked
                  ? "border-slate-900 bg-slate-900 text-white shadow"
                  : "border-slate-200 bg-white text-slate-800 hover:border-sky-400"
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      <div className={`rounded-2xl border-2 p-4 ${active.tone}`}>
        <div dir="ltr" className="flex flex-wrap items-center justify-between gap-2 text-left">
          <span lang="en" className="font-en text-xl font-extrabold md:text-2xl">
            {active.en}
          </span>
          <span
            dir="rtl"
            className="rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold shadow-xs"
          >
            {active.tag}
          </span>
        </div>
        <p className="mt-2 text-lg font-bold">{active.ar}</p>
        <p className="mt-1 text-sm font-semibold opacity-90">{active.why}</p>
      </div>
    </div>
  );
}

// ============================================================
// المختبر 3: عدسة الماضي (SHOULD HAVE vs SHOULDN'T HAVE vs Past Expectation)
// ============================================================
const PAST_LENS_ITEMS = [
  {
    id: "should",
    label: "SHOULD HAVE + V3",
    en: "I should have studied earlier.",
    ar: "كان ينبغي أن أدرس في وقت أبكر.",
    reality: "الواقع في الماضي: لم أدرس باكرًا، وأشعر الآن بالندم أو مراجعة النفس.",
    badge: "فعل لم يحدث وكان الأفضل حدوثه",
  },
  {
    id: "shouldnt",
    label: "SHOULDN'T HAVE + V3",
    en: "I shouldn't have stayed up so late.",
    ar: "لم يكن ينبغي أن أسهر إلى هذا الوقت المتأخر.",
    reality: "الواقع في الماضي: سهرتُ فعلًا، وأرى الآن أن ذلك القرار كان خاطئًا.",
    badge: "فعل وقع وكان الأفضل تجنبه",
  },
  {
    id: "expectation",
    label: "Past Expectation",
    en: "The train should have arrived by now.",
    ar: "من المفترض أن القطار قد وصل بحلول الآن.",
    reality: "الوظيفة هنا ليست ندمًا، بل توقع منطقي لحدث يُفترض اكتماله الآن.",
    badge: "توقع متعلق بحدث اكتمل",
  },
] as const;

export function PastLab45() {
  const [kind, setKind] = useState<string>("should");
  const item = PAST_LENS_ITEMS.find((x) => x.id === kind) ?? PAST_LENS_ITEMS[0];

  return (
    <div className="space-y-4 rounded-3xl border-2 border-orange-200 bg-orange-50/40 p-5">
      <div>
        <span className="rounded-full bg-orange-600 px-3 py-0.5 text-xs font-bold text-white">
          عدسة الماضي
        </span>
        <h3 className="font-head mt-1.5 text-xl font-bold text-slate-900">
          قراءة الواقع خلف <En45>SHOULD HAVE + V3</En45>
        </h3>
      </div>

      <div dir="ltr" className="flex flex-wrap gap-2">
        {PAST_LENS_ITEMS.map((x) => {
          const picked = x.id === item.id;
          return (
            <button
              key={x.id}
              type="button"
              aria-pressed={picked}
              onClick={() => setKind(x.id)}
              className={`font-en rounded-2xl border-2 px-4 py-2 text-sm font-extrabold transition ${
                picked
                  ? "border-orange-600 bg-orange-600 text-white shadow"
                  : "border-slate-200 bg-white text-slate-800 hover:border-orange-300"
              }`}
            >
              {x.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-orange-200 bg-white p-4 shadow-xs">
        <div dir="ltr" className="flex flex-wrap items-center justify-between gap-2 text-left">
          <span lang="en" className="font-en text-xl font-extrabold text-slate-900 md:text-2xl">
            {item.en}
          </span>
          <span
            dir="rtl"
            className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-900"
          >
            {item.badge}
          </span>
        </div>
        <p className="mt-2 text-base font-bold text-slate-700">{item.ar}</p>
        <p className="mt-2 rounded-xl bg-amber-50 px-3.5 py-2 text-sm font-bold text-amber-950">
          🔍 <Text45 text={item.reality} />
        </p>
      </div>
    </div>
  );
}

// ============================================================
// المختبر 4: مختبر نبرة النصيحة اللبقة (Politeness Tone Studio)
// ============================================================
const POLITENESS_TONES = [
  {
    id: "direct",
    label: "نصيحة مباشرة",
    en: "You should talk to your teacher.",
    ar: "ينبغي أن تتحدث مع معلمك.",
    note: "واضحة ومباشرة ومناسبة مع الأصدقاء المقربين.",
  },
  {
    id: "think",
    label: "رأي مهذّب (I think)",
    en: "I think you should talk to your teacher.",
    ar: "أعتقد أنه ينبغي أن تتحدث مع معلمك.",
    note: "إضافة I think تجعل النصيحة ألطف وأقل حدة.",
  },
  {
    id: "maybe",
    label: "تخفيف لطيف (Maybe)",
    en: "Maybe you should take a short break first.",
    ar: "ربما ينبغي أن تأخذ استراحة قصيرة أولًا.",
    note: "تقدّم الفكرة بلطف دون إشعار المخاطب بالضغط.",
  },
  {
    id: "could",
    label: "اقتراح خيار (Could)",
    en: "You could also ask a friend for help.",
    ar: "يمكنك أيضًا أن تطلب مساعدة صديق.",
    note: "تعرض خيارًا مفتوحًا بدل التوجيه المباشر.",
  },
] as const;

export function PolitenessLab45() {
  const [tone, setTone] = useState<string>("think");
  const active = POLITENESS_TONES.find((t) => t.id === tone) ?? POLITENESS_TONES[1];

  return (
    <div className="space-y-4 rounded-3xl border-2 border-emerald-200 bg-emerald-50/40 p-5">
      <div>
        <span className="rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white">
          مختبر اللباقة
        </span>
        <h3 className="font-head mt-1.5 text-xl font-bold text-slate-900">
          مختبر نبرة النصيحة · <En45>Tone Studio</En45>
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {POLITENESS_TONES.map((t) => {
          const picked = t.id === active.id;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={picked}
              onClick={() => setTone(t.id)}
              className={`rounded-2xl border-2 px-4 py-2 text-sm font-bold transition ${
                picked
                  ? "border-emerald-600 bg-emerald-600 text-white shadow"
                  : "border-slate-200 bg-white text-slate-800 hover:border-emerald-300"
              }`}
            >
              <Text45 text={t.label} />
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-white p-4">
        <En45 className="block text-left text-xl font-extrabold text-slate-900 md:text-2xl">
          {active.en}
        </En45>
        <p className="mt-2 text-base font-bold text-slate-700">{active.ar}</p>
        <p className="mt-1.5 text-sm font-semibold text-emerald-900">
          💡 <Text45 text={active.note} />
        </p>
      </div>
    </div>
  );
}

// ============================================================
// تمارين الاختيار التفاعلية (التدريب 1 والتدريب 5)
// ============================================================
export type ChoiceDrillItem45 = {
  id: string;
  en: string;
  options: readonly string[];
  answer: string;
  why: string;
  optionsDir?: "ltr" | "rtl";
};

export function ChoicePracticeSet45({
  groupId,
  items,
  workspace,
  onChangeWorkspace,
}: {
  groupId: string;
  items: readonly ChoiceDrillItem45[];
  workspace: WorkspaceState45;
  onChangeWorkspace: (updater: (prev: WorkspaceState45) => WorkspaceState45) => void;
}) {
  const checked = Boolean(workspace.choiceChecked[groupId]);
  const allPicked = items.every((item) => Boolean(workspace.choiceAnswers[item.id]));
  const score = items.filter((item) => workspace.choiceAnswers[item.id] === item.answer).length;

  const setPick = (itemId: string, opt: string) => {
    if (checked) return;
    onChangeWorkspace((prev) => ({
      ...prev,
      choiceAnswers: { ...prev.choiceAnswers, [itemId]: opt },
    }));
  };

  const checkAll = () => {
    if (!allPicked) return;
    onChangeWorkspace((prev) => ({
      ...prev,
      choiceChecked: { ...prev.choiceChecked, [groupId]: true },
    }));
  };

  const resetGroup = () => {
    onChangeWorkspace((prev) => {
      const nextAnswers = { ...prev.choiceAnswers };
      for (const item of items) delete nextAnswers[item.id];
      const nextChecked = { ...prev.choiceChecked };
      delete nextChecked[groupId];
      return {
        ...prev,
        choiceAnswers: nextAnswers,
        choiceChecked: nextChecked,
      };
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {items.map((item, idx) => {
          const picked = workspace.choiceAnswers[item.id];
          const isOk = checked && picked === item.answer;
          const isBad = checked && picked !== item.answer;

          return (
            <div
              key={item.id}
              className={`rounded-3xl border-2 p-4 transition md:p-5 ${
                isOk
                  ? "border-emerald-300 bg-emerald-50/60"
                  : isBad
                    ? "border-rose-300 bg-rose-50/60"
                    : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-baseline gap-3">
                  <span className="font-head grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                  <En45 className="text-left text-lg font-extrabold text-slate-900 md:text-xl">
                    {item.en}
                  </En45>
                </div>

                <div
                  dir={item.optionsDir ?? "ltr"}
                  className="flex flex-wrap items-center gap-2"
                >
                  {item.options.map((opt) => {
                    const active = picked === opt;
                    const showRight = checked && opt === item.answer;
                    const showWrong = checked && active && opt !== item.answer;

                    let style = "border-slate-200 bg-slate-50 text-slate-800 hover:border-violet-300";
                    if (!checked && active) {
                      style = "border-violet-600 bg-violet-600 text-white shadow-xs";
                    } else if (showRight) {
                      style = "border-emerald-500 bg-emerald-600 text-white";
                    } else if (showWrong) {
                      style = "border-rose-500 bg-rose-600 text-white";
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={checked}
                        aria-pressed={active}
                        onClick={() => setPick(item.id, opt)}
                        className={`rounded-xl border-2 px-3.5 py-2 text-sm font-extrabold transition md:text-base ${
                          (item.optionsDir ?? "ltr") === "ltr" ? "font-en" : ""
                        } ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {checked && (
                <div className="mt-3 border-t border-slate-200/70 pt-2.5 text-sm font-bold">
                  <span className={isOk ? "text-emerald-800" : "text-rose-800"}>
                    {isOk ? "✓ صحيح!" : `✕ الصواب: ${item.answer}`}
                  </span>
                  <span className="mx-2 text-slate-300">·</span>
                  <span className="font-semibold text-slate-700">
                    <Text45 text={item.why} />
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        {!checked ? (
          <>
            <button
              type="button"
              disabled={!allPicked}
              onClick={checkAll}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-base font-bold text-white shadow transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              تحقق من الإجابات ✓
            </button>
            <span className="text-sm font-bold text-slate-500">
              اختر إجابة لكل جملة لتفعيل التحقق الفوري
            </span>
          </>
        ) : (
          <>
            <span className="font-head text-lg font-bold text-emerald-900">
              النتيجة: <bdi dir="ltr">{score} / {items.length}</bdi>
            </span>
            <button
              type="button"
              onClick={resetGroup}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
            >
              إعادة التدريب ↺
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// تمارين الكتابة والتصحيح الفردي (Grammar Detective + التدريبات 2 و3 و4) — مطابق لـ ComposeItem في الدرس الأول
// ============================================================
export type TextDrillItem45 = {
  id: string;
  promptEn: string;
  hintAr?: string;
  modelAnswer: string;
  accepted: readonly string[];
  why: string;
  badgeBroken?: boolean;
};

export function TextPracticeSet45({
  items,
  workspace,
  onChangeWorkspace,
}: {
  items: readonly TextDrillItem45[];
  workspace: WorkspaceState45;
  onChangeWorkspace: (updater: (prev: WorkspaceState45) => WorkspaceState45) => void;
}) {
  const setVal = (id: string, val: string) => {
    onChangeWorkspace((prev) => ({
      ...prev,
      textAnswers: { ...prev.textAnswers, [id]: val },
      textStatus: { ...prev.textStatus, [id]: "idle" },
    }));
  };

  const checkItem = (item: TextDrillItem45) => {
    const raw = workspace.textAnswers[item.id] ?? "";
    const norm = normalizeEn45(raw);
    if (!norm) return;
    const ok = item.accepted.map(normalizeEn45).includes(norm);
    onChangeWorkspace((prev) => ({
      ...prev,
      textStatus: { ...prev.textStatus, [item.id]: ok ? "ok" : "bad" },
    }));
  };

  const revealItem = (item: TextDrillItem45) => {
    onChangeWorkspace((prev) => ({
      ...prev,
      textAnswers: { ...prev.textAnswers, [item.id]: item.modelAnswer },
      textStatus: { ...prev.textStatus, [item.id]: "revealed" },
    }));
  };

  const resetItem = (item: TextDrillItem45) => {
    onChangeWorkspace((prev) => ({
      ...prev,
      textAnswers: { ...prev.textAnswers, [item.id]: "" },
      textStatus: { ...prev.textStatus, [item.id]: "idle" },
    }));
  };

  return (
    <div className="space-y-3.5">
      {items.map((item, idx) => {
        const val = workspace.textAnswers[item.id] ?? "";
        const status = workspace.textStatus[item.id] ?? "idle";

        return (
          <div
            key={item.id}
            className={`rounded-3xl border-2 p-4 transition md:p-5 ${
              status === "ok"
                ? "border-emerald-300 bg-emerald-50/50"
                : status === "bad"
                  ? "border-rose-300 bg-rose-50/50"
                  : status === "revealed"
                    ? "border-amber-300 bg-amber-50/50"
                    : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex flex-wrap items-start gap-3">
              <span className="font-head grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                {item.hintAr && (
                  <p className="mb-1 text-sm font-bold text-slate-500">
                    <Text45 text={item.hintAr} />
                  </p>
                )}
                <div
                  dir="ltr"
                  lang="en"
                  className={`font-en text-left text-lg font-extrabold md:text-xl ${
                    item.badgeBroken ? "text-rose-900" : "text-slate-900"
                  }`}
                >
                  {item.badgeBroken && (
                    <span className="mr-2 rounded-md bg-rose-100 px-2 py-0.5 text-xs font-extrabold text-rose-800">
                      ✕ خطأ
                    </span>
                  )}
                  {item.promptEn}
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                type="text"
                dir="ltr"
                lang="en"
                value={val}
                onChange={(e) => setVal(item.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    checkItem(item);
                  }
                }}
                placeholder="Write your answer here..."
                aria-label={`إجابة البند ${idx + 1}`}
                className="font-en min-w-[210px] flex-1 rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-base font-bold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-violet-500 focus:bg-white md:text-lg"
              />
              <button
                type="button"
                disabled={!val.trim()}
                onClick={() => checkItem(item)}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-xs transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                تحقق ✓
              </button>
              <button
                type="button"
                onClick={() => revealItem(item)}
                className="rounded-xl bg-amber-100 px-3.5 py-2.5 text-sm font-bold text-amber-900 transition hover:bg-amber-200"
              >
                الحل 💡
              </button>
              {val && (
                <button
                  type="button"
                  onClick={() => resetItem(item)}
                  aria-label="مسح المحاولة"
                  className="rounded-xl bg-slate-100 px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
                >
                  ↺
                </button>
              )}
            </div>

            {status === "ok" && (
              <div className="mt-2.5 text-sm font-bold text-emerald-800">
                ✓ ممتاز! إجابة صحيحة — <Text45 text={item.why} />
              </div>
            )}
            {status === "bad" && (
              <div className="mt-2.5 text-sm font-bold text-rose-800">
                ✕ راجع الصياغة وحاول مجددًا (أو اضغط «الحل 💡» لعرض النموذج).{" "}
                <Text45 text={item.why} />
              </div>
            )}
            {status === "revealed" && (
              <div className="mt-2.5 text-sm font-bold text-amber-950">
                💡 الحل النموذجي: <En45 className="font-extrabold">{item.modelAnswer}</En45> —{" "}
                <Text45 text={item.why} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// أسئلة فهم القراءة التفاعلية (10 أسئلة دون كشف مسبق)
// ============================================================
export type ReadingQuestion45 = {
  id: string;
  qEn: string;
  qAr: string;
  answerEn: string;
  answerAr: string;
};

export function ReadingQuestions45({
  items,
  workspace,
  onChangeWorkspace,
}: {
  items: readonly ReadingQuestion45[];
  workspace: WorkspaceState45;
  onChangeWorkspace: (updater: (prev: WorkspaceState45) => WorkspaceState45) => void;
}) {
  return (
    <div className="space-y-3.5">
      {items.map((item, idx) => {
        const draft = workspace.readingDrafts[item.id] ?? "";
        const open = Boolean(workspace.readingOpen[item.id]);

        return (
          <div
            key={item.id}
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xs md:p-5"
          >
            <div className="flex items-start gap-3">
              <span className="font-head grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white">
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div
                  dir="ltr"
                  lang="en"
                  className="font-en text-left text-lg font-extrabold text-slate-900"
                >
                  {item.qEn}
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  <Text45 text={item.qAr} />
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                type="text"
                dir="ltr"
                lang="en"
                value={draft}
                onChange={(e) =>
                  onChangeWorkspace((prev) => ({
                    ...prev,
                    readingDrafts: { ...prev.readingDrafts, [item.id]: e.target.value },
                  }))
                }
                placeholder="Write your answer based on the story..."
                aria-label={`إجابة سؤال القراءة ${idx + 1}`}
                className="font-en min-w-[200px] flex-1 rounded-2xl border-2 border-slate-200 bg-slate-50 px-3.5 py-2 text-left text-base font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-violet-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={() =>
                  onChangeWorkspace((prev) => ({
                    ...prev,
                    readingOpen: { ...prev.readingOpen, [item.id]: !open },
                  }))
                }
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
              >
                {open ? "إخفاء النموذج" : "قارن بالإجابة النموذجية 💡"}
              </button>
            </div>

            {open && (
              <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5">
                <div dir="ltr" lang="en" className="font-en text-left text-base font-extrabold text-emerald-950">
                  {item.answerEn}
                </div>
                <p className="mt-1 text-sm font-bold text-emerald-800">
                  <Text45 text={item.answerAr} />
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// مهمة الكتابة التفاعلية مع مؤشر المتطلبات الحي ومسودة محفوظة
// ============================================================
const MODEL_PARAGRAPH_45 =
  "Last year, I had trouble organising my study time. My teacher told me that I should make a weekly plan. She also said that I ought to divide difficult tasks into smaller steps. At first, I didn't follow her advice. I wasted a lot of time, and I didn't finish my project on time. I should have listened to her earlier. I shouldn't have left everything until the last minute. Now I understand that I should manage my time carefully. You ought to review your priorities every week too. I shouldn't spend too much time on unimportant activities, and students shouldn't ignore helpful feedback. Next week, I have another important project, so what should I do first? I'd better start preparing today. If I follow my plan, everything should be ready before the deadline.";

export function WritingMission45({
  workspace,
  onChangeWorkspace,
}: {
  workspace: WorkspaceState45;
  onChangeWorkspace: (updater: (prev: WorkspaceState45) => WorkspaceState45) => void;
}) {
  const text = workspace.writingDraft;
  const lower = text.toLowerCase().replace(/[’‘]/g, "'");

  // فحص إرشادي حي لمتطلبات الكتابة الثمانية
  const affirmativeShouldMatches =
    lower.match(/\bshould\b(?!\s*(not|n't|have|'ve))/g)?.length ?? 0;
  const shouldntMatches =
    lower.match(/\b(shouldn't|should\s+not)\b(?!\s*have)/g)?.length ?? 0;
  const oughtMatches = lower.match(/\bought\s+to\b/g)?.length ?? 0;
  const shouldHaveMatches =
    lower.match(/\b(should\s+have|should've)\s+[a-z]+/g)?.length ?? 0;
  const shouldntHaveMatches =
    lower.match(/\b(shouldn't\s+have|should\s+not\s+have)\s+[a-z]+/g)?.length ?? 0;
  const hadBetterMatches =
    lower.match(/\b(had\s+better|'d\s+better)\s+[a-z]+/g)?.length ?? 0;
  const questionShould = /\bshould\s+(i|we|he|she|they|you|[a-z]+)\b[^.?!]*\?/.test(lower);
  const sentenceCount = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 4).length;

  const checks = [
    { label: "3 جمل مثبتة بـ SHOULD + V1", done: affirmativeShouldMatches >= 3 },
    { label: "جملتان بـ SHOULDN'T + V1", done: shouldntMatches >= 2 },
    { label: "جملتان بـ OUGHT TO + V1", done: oughtMatches >= 2 },
    { label: "جملتان بـ SHOULD HAVE + V3", done: shouldHaveMatches >= 2 },
    { label: "جملة بـ SHOULDN'T HAVE + V3", done: shouldntHaveMatches >= 1 },
    { label: "جملة بـ HAD BETTER / 'D BETTER", done: hadBetterMatches >= 1 },
    { label: "سؤال واحد باستخدام SHOULD...?", done: questionShould },
    { label: "طول الفقرة (12 إلى 15 جملة تقريبًا)", done: sentenceCount >= 12 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-2.5 sm:grid-cols-2">
        {checks.map((c, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 text-sm font-bold ${
              c.done
                ? "border-emerald-300 bg-emerald-50 text-emerald-950"
                : "border-slate-200 bg-slate-50 text-slate-700"
            }`}
          >
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-extrabold text-white ${
                c.done ? "bg-emerald-600" : "bg-slate-300"
              }`}
              aria-hidden="true"
            >
              {c.done ? "✓" : idx + 1}
            </span>
            <Text45 text={c.label} />
          </div>
        ))}
      </div>

      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-slate-600">
          <span>مساحة الكتابة الحرة (تُحفظ تلقائيًا أثناء تنقلك داخل الدرس)</span>
          <span dir="ltr" className="font-en rounded-full bg-slate-100 px-3 py-0.5 text-xs font-extrabold text-slate-700">
            {sentenceCount} sentences
          </span>
        </div>
        <textarea
          rows={8}
          dir="ltr"
          lang="en"
          value={text}
          onChange={(e) =>
            onChangeWorkspace((prev) => ({ ...prev, writingDraft: e.target.value }))
          }
          placeholder="Write your 12–15 sentence paragraph here..."
          aria-label="مسودة فقرة الكتابة الإنجليزية"
          className="font-en w-full rounded-3xl border-2 border-slate-200 bg-slate-50/70 p-4 text-left text-base font-medium leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white md:text-lg"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() =>
            onChangeWorkspace((prev) => ({
              ...prev,
              writingModelOpen: !prev.writingModelOpen,
            }))
          }
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          {workspace.writingModelOpen ? "إخفاء النموذج الإرشادي" : "اعرض نموذجًا إرشاديًا للمقارنة 💡"}
        </button>
        {text && (
          <button
            type="button"
            onClick={() =>
              onChangeWorkspace((prev) => ({ ...prev, writingDraft: "" }))
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            مسح المسودة ↺
          </button>
        )}
      </div>

      {workspace.writingModelOpen && (
        <Note45 emoji="📝" title="نموذج إرشادي تطبيقي: Advice That Changed My Life">
          <div dir="ltr" lang="en" className="font-en mt-2 rounded-2xl border border-amber-200 bg-white p-4 text-left text-base font-semibold leading-relaxed text-slate-800">
            {MODEL_PARAGRAPH_45}
          </div>
          <p className="mt-2.5 text-sm font-bold text-amber-950">
            <Text45 text="تحدي المراجعة الذاتية: استخرج كل جملة فيها SHOULD من فقرتك وصنّفها إلى Advice أو Expectation أو Past Regret/Criticism." />
          </p>
        </Note45>
      )}
    </div>
  );
}
