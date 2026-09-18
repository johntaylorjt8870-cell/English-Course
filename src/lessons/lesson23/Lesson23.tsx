import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  SOURCE_NUMBERED_COUNT,
  LESSON_TITLE_23,
  LESSON_SUBTITLE_23,
  LESSON_ARABIC_TITLE_23,
  LAB_NAME_23,
  LAB_MOTTO_23,
  OPENING_EXCELLENT,
  OPENING_RECALL,
  OPENING_RECALL_ITEMS,
  OPENING_NOW,
  OPENING_KEY_QUESTION,
  OPENING_KEY_QUESTION_EN,
  OPENING_IF,
  OPENING_PAYOFF,
  OBJECTIVES_23,
  COUNTABLE_MEANING,
  COUNTABLE_ANY,
  COUNTABLE_NUMBERS,
  COUNTABLE_THEN,
  COUNTABLE_FOR_EXAMPLE,
  COUNTABLE_BOOK_COUNT,
  COUNTABLE_BOOK_CAN,
  COUNTABLE_SO,
  COUNTABLE_BOOK_EQ,
  COUNTABLE_OTHER,
  COUNTABLE_APPLE_COUNT,
  COUNTABLE_APPLE_EQ,
  COUNTABLE_EXAMPLES,
  COUNTABLE_EXAMPLES_NOTE,
  MAGIC_TEST_ASK,
  MAGIC_TEST_Q,
  MAGIC_TEST_ITEMS,
  MAGIC_TEST_SO,
  TWO_FORMS_LEAD,
  TWO_FORMS_SINGULAR_LABEL,
  TWO_FORMS_SINGULAR,
  TWO_FORMS_PLURAL_LABEL,
  TWO_FORMS_PLURAL,
  TWO_FORMS_LINK,
  REMEMBER_TITLE,
  REMEMBER_SINGULAR,
  REMEMBER_PLURAL,
  REMEMBER_EXAMPLES,
  SURPRISE_TITLE,
  SURPRISE_NOT_ALL,
  SURPRISE_OTHER,
  SURPRISE_LABEL,
  UNCOUNTABLE_MEANING,
  UNCOUNTABLE_DEF,
  UNCOUNTABLE_FOR_EXAMPLE,
  UNCOUNTABLE_EXAMPLES,
  WATER_THINK,
  WATER_USUALLY,
  WATER_NUMBERS,
  WATER_MATERIAL,
  WATER_NO,
  WATER_WE_SAY,
  WATER_SAY,
  WATER_UNITS_LEAD,
  WATER_UNITS,
  WATER_SMART,
  WATER_SMART_1,
  WATER_SMART_2,
  WATER_SMART_3,
  RICE_USUALLY,
  RICE_NUMBERS,
  RICE_BUT,
  RICE_SAY,
  RICE_UNITS_LEAD,
  RICE_UNITS,
  RICE_SMART,
  CORE_COUNTABLE_LABEL,
  CORE_COUNTABLE_DEF,
  CORE_COUNTABLE_ITEMS,
  CORE_UNCOUNTABLE_LABEL,
  CORE_UNCOUNTABLE_DEF,
  CORE_UNCOUNTABLE_ITEMS,
  SMART_LOOK,
  SMART_APPLE,
  SMART_BUT,
  SMART_WATER,
  SMART_USUALLY_NOT,
  SMART_WATERS,
  SMART_BASIC,
  AAN_RULE_LEAD,
  AAN_RULE_TOOL,
  AAN_RULE_FOR_EXAMPLE,
  AAN_GOOD,
  AAN_RULE_BUT,
  AAN_RULE_SO,
  AAN_VERDICTS,
  WHY_BECAUSE,
  WHY_A,
  WHY_AN,
  WHY_WHEN,
  WHY_BOOK,
  WHY_YOU_SAY,
  WHY_ONE_BOOK,
  WHY_BUT,
  WHY_WATER,
  WHY_NOT_PIECE,
  WHY_SO_NOT,
  WHY_A_WATER,
  WHY_BUT_SAY,
  WHY_SOME_WATER,
  RESTAURANT_LEAD,
  RESTAURANT_A_WATER,
  RESTAURANT_PLACE,
  RESTAURANT_SHORT,
  RESTAURANT_SHORT_FORMS,
  RESTAURANT_MEANING,
  RESTAURANT_BUT,
  RESTAURANT_RULE,
  NO_PLURAL_LEAD,
  NO_PLURAL_WORDS,
  NO_PLURAL_PAIRS,
  NO_PLURAL_WE_SAY,
  NO_PLURAL_NOT,
  IMPORTANT_WORDS,
  CHICKEN_SMART,
  CHICKEN_LEAD,
  CHICKEN_EXAMPLE,
  CHICKEN_MAY,
  CHICKEN_ANIMAL,
  CHICKEN_ANIMAL_FORMS,
  CHICKEN_ANIMAL_TYPE,
  CHICKEN_BUT,
  CHICKEN_MEAT,
  CHICKEN_MEAT_FORM,
  CHICKEN_MEAT_TYPE,
  CHICKEN_DONT_MEMORIZE,
  CHICKEN_ASK,
  CHICKEN_ASK_Q,
  COFFEE_LEAD,
  COFFEE_EXAMPLE,
  COFFEE_BUT,
  COFFEE_RESTAURANT,
  COFFEE_MEANING,
  COFFEE_CUPS,
  COFFEE_SO,
  BASIC_RULE_LEAD,
  BASIC_RULE_WORDS,
  BASIC_RULE_AS,
  THERE_LINK,
  THERE_CASES,
  THERE_NOTICE,
  THERE_GOOD,
  THERE_NOT,
  THERE_BAD,
  THERE_REASON,
  THERE_GOLDEN,
  KITCHEN_LEAD,
  KITCHEN_ITEMS,
  KITCHEN_WE_SAY,
  KITCHEN_SENTENCES,
  KITCHEN_NOTE,
  SOME_RECALL,
  SOME_MEANING,
  SOME_WITH_PLURAL,
  SOME_WITH_PLURAL_ITEMS,
  SOME_WITH_UNCOUNTABLE,
  SOME_WITH_UNCOUNTABLE_ITEMS,
  SOME_SO,
  SOME_FORMULAS,
  SOME_EXAMPLES,
  SOME_ATTENTION_NOT,
  SOME_ATTENTION_BAD,
  SOME_ATTENTION_IF,
  SOME_ATTENTION_BUT,
  SOME_ATTENTION_GOOD,
  SOME_ATTENTION_WHY,
  SOME_ATTENTION_AS,
  SOME_ATTENTION_WATER,
  SOME_ATTENTION_WATER_WHY,
  SOME_TWO_TYPES,
  ANY_LEAD,
  ANY_PLACES,
  ANY_WITH_PLURAL,
  ANY_WITH_PLURAL_ITEMS,
  ANY_WITH_UNCOUNTABLE,
  ANY_WITH_UNCOUNTABLE_ITEMS,
  SOME_ANY_COMPARE,
  SOME_ANY_NOTE,
  TWO_QUESTIONS_LEAD,
  TWO_QUESTIONS,
  HOWMANY_WE_USE,
  HOWMANY_FORMULA,
  HOWMANY_WHEN,
  HOWMANY_EXAMPLE,
  HOWMANY_EXAMPLES,
  HOWMUCH_WE_USE,
  HOWMUCH_FORMULA,
  HOWMUCH_WHEN,
  HOWMUCH_EXAMPLES,
  SUPER_KEY_IF,
  SUPER_KEY_NUMBERS,
  SUPER_KEY_MANY,
  SUPER_KEY_IF2,
  SUPER_KEY_MUCH,
  BATTLE_MANY_Q,
  BATTLE_MANY_BECAUSE,
  BATTLE_MANY_WHY,
  BATTLE_MANY_TYPE,
  BATTLE_BUT,
  BATTLE_MUCH_Q,
  BATTLE_MUCH_WHY,
  ADVANCED_PAIRS,
  ADVANCED_NOTE_1,
  ADVANCED_NOTE_2,
  MONEY_LEAD,
  MONEY_TYPE,
  MONEY_SO,
  MONEY_GOOD,
  MONEY_NO_COUNT,
  MONEY_BUT_UNITS,
  MONEY_UNITS,
  INFO_TYPE,
  INFO_SO,
  INFO_GOOD,
  INFO_BAD,
  INFO_BUT,
  INFO_PIECES,
  INFO_COUNT,
  INFO_COUNT_WORD,
  INFO_NOT_ITSELF,
  ADVICE_TYPE,
  ADVICE_WE_SAY,
  ADVICE_GOOD,
  ADVICE_WE_DONT,
  ADVICE_BAD,
  FURNITURE_TYPE,
  FURNITURE_WE_SAY,
  FURNITURE_GOOD,
  FURNITURE_WE_DONT,
  FURNITURE_BAD,
  HOMEWORK_TYPE,
  HOMEWORK_WE_SAY,
  HOMEWORK_GOOD,
  HOMEWORK_WE_DONT,
  HOMEWORK_BAD,
  HOMEWORK_BUT,
  HOMEWORK_ASSIGNMENTS,
  HOMEWORK_IF,
  FACE_TO_FACE_LEAD,
  FACE_TO_FACE_COUNTABLE,
  FACE_TO_FACE_UNCOUNTABLE,
  THREE_TEST_LEAD,
  THREE_TEST_QUESTIONS,
  THREE_TEST_EXAMPLES,
  THREE_TEST_ARROW,
  TRAP_LEAD,
  TRAP_EXAMPLE,
  TRAP_GOOD,
  TRAP_NOT,
  TRAP_BAD,
  TRAP_SO,
  TRAP_IDEA,
  COMMON_ERRORS,
  IQ200_MM_TITLE,
  IQ200_MM_SURFACE,
  IQ200_MM_UNDERSTAND,
  IQ200_MM_MANY,
  IQ200_MM_MUCH,
  IQ200_MM_SO,
  IQ200_MM_MANY_ITEMS,
  IQ200_MM_BUT,
  IQ200_MM_MUCH_ITEMS,
  TRAINING1_23,
  TRAINING1_23_OPTIONS,
  TRAINING1_23_INTRO,
  TRAINING2_23,
  TRAINING2_23_OPTIONS,
  TRAINING2_23_INTRO,
  TRAINING2_23_REMEMBER,
  TRAINING2_23_RULES,
  TRAINING3_23,
  TRAINING3_23_OPTIONS,
  TRAINING4_23,
  TRAINING4_23_OPTIONS,
  DETECTIVE_23,
  DETECTIVE_23_INTRO,
  DETECTIVE_23_ASK,
  DETECTIVE_23_ASK_Q,
  DETECTIVE_23_ASK_KEY,
  DETECTIVE_23_THEN,
  DETECTIVE_23_OPTIONS,
  IQ200_23,
  IQ200_23_TASK,
  IQ200_23_HINT,
  IQ200_23_HINT_Q,
  IQ200_23_OPTIONS,
  THINKING_23,
  THINKING_23_INTRO,
  THINKING_23_TASK,
  THINKING_23_EXAMPLE_LABEL,
  THINKING_23_EXAMPLE,
  THINKING_23_THEN,
  THINKING_23_OPTIONS,
  FINAL_BOSS_23_TITLE,
  FINAL_BOSS_23_IN_ROOM,
  FINAL_BOSS_23_ITEMS,
  FINAL_BOSS_23_OPTIONS,
  FINAL_BOSS_23_TASK,
  FINAL_BOSS_23_MUST,
  FINAL_BOSS_23_REQUIREMENTS,
  FINAL_BOSS_23_THEN,
  FINAL_BOSS_23_QUESTION_TYPES,
  FINAL_BOSS_23_EXAMPLE_LABEL,
  FINAL_BOSS_23_EXAMPLES,
  FINAL_BOSS_23_QUESTION_BANK,
  FINAL_BOSS_23_QUOTA,
  FINAL_BOSS_23_SENTENCE_TARGET,
  GOLDEN_23_COUNTABLE_TITLE,
  GOLDEN_23_COUNTABLE_DEF,
  GOLDEN_23_COUNTABLE_EXAMPLE_LABEL,
  GOLDEN_23_COUNTABLE_EXAMPLES,
  GOLDEN_23_COUNTABLE_CAN_BE,
  GOLDEN_23_COUNTABLE_FORMS,
  GOLDEN_23_COUNTABLE_WITH,
  GOLDEN_23_COUNTABLE_TOOLS,
  GOLDEN_23_UNCOUNTABLE_TITLE,
  GOLDEN_23_UNCOUNTABLE_DEF,
  GOLDEN_23_UNCOUNTABLE_LIKE,
  GOLDEN_23_UNCOUNTABLE_WORDS,
  GOLDEN_23_UNCOUNTABLE_NO,
  GOLDEN_23_UNCOUNTABLE_NO_ITEM,
  GOLDEN_23_UNCOUNTABLE_NO_PLURAL,
  GOLDEN_23_UNCOUNTABLE_WITH,
  GOLDEN_23_UNCOUNTABLE_TOOLS,
  MAGIC_TABLE_23,
  SEVEN_RULES_23,
  ROADMAP_23,
  ROADMAP_23_LEAD,
  ROADMAP_23_HERE,
  ROADMAP_23_NEXT_LEAD,
  ROADMAP_23_NEXT_TITLE,
  ROADMAP_23_NEXT_FULL,
  ROADMAP_23_NEXT_ITEMS,
  ROADMAP_23_CLOSING,
  type Block23,
  type Exercise23,
  type Slide23,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الدرس 23 — THE COUNTING LAB 🧮
// هل يمكنني أن أعدّ هذا الشيء 1، 2، 3...؟
// كل وحدة إنجليزية معزولة LTR.
// ============================================================

function En({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" style={{ direction: "ltr" }} className={`ltr font-en ${className}`}>
      {children}
    </span>
  );
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  const clean = text.replace(/\*\*/g, "");
  return (
    <span className={className}>
      <LatinRuns text={clean} />
    </span>
  );
}

function TextBlock({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`whitespace-pre-line ${className}`}>
      <Rich text={text} />
    </div>
  );
}

function SourceLine({
  en,
  ar,
  tone = "neutral",
}: {
  en: string;
  ar?: string;
  tone?: "neutral" | "good" | "bad" | "focus" | "warn";
}) {
  const tones = {
    neutral: "border-slate-100 bg-white text-slate-900",
    good: "border-emerald-200 bg-emerald-50 text-emerald-900",
    bad: "border-rose-200 bg-rose-50 text-rose-800",
    focus: "border-indigo-300 bg-indigo-50 text-indigo-900",
    warn: "border-amber-300 bg-amber-50 text-amber-900",
  };
  return (
    <div className={`rounded-2xl border-2 p-3 ${tones[tone]}`}>
      <div dir="ltr" className="ltr-row">
        <En className={`block text-left text-lg font-extrabold md:text-xl ${tone === "bad" ? "line-through decoration-rose-300" : ""}`}>
          {en}
        </En>
      </div>
      {ar && (
        <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">
          <Rich text={ar} />
        </div>
      )}
    </div>
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4">
      <span className="text-2xl">{emoji}</span>
      <Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" />
    </div>
  );
}

function Frame({
  mascot,
  step,
  badge,
  title,
  lead,
  children,
  tip,
  sourceHeading,
}: {
  mascot: string;
  step?: string;
  badge?: string;
  title: ReactNode;
  lead?: string;
  children: ReactNode;
  tip?: string;
  sourceHeading?: string;
}) {
  return (
    <section
      dir="rtl"
      className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(79,70,229,0.28)] md:p-9"
    >
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && (
          <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-indigo-700 text-lg font-bold text-white shadow-sm">
            {step}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-indigo-100 px-3.5 py-1.5 text-sm font-bold text-indigo-800">
            <Rich text={badge} />
          </span>
        )}
      </div>
      {sourceHeading && (
        <div
          data-source-section={sourceHeading}
          className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500"
        >
          <span className="rounded-md bg-white px-1.5 py-0.5 text-indigo-700">SOURCE SECTION</span>
          <Rich text={sourceHeading} />
        </div>
      )}
      <h2 className="font-head mt-3 max-w-[90%] text-2xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">
        {title}
      </h2>
      {lead && (
        <div className="mt-2 max-w-[92%] text-lg text-slate-500 md:text-xl">
          <Rich text={lead} />
        </div>
      )}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-indigo-700 to-violet-700 p-4 text-white">
          <span className="text-2xl">🔦</span>
          <span className="text-base font-semibold md:text-lg">
            <Rich text={tip} />
          </span>
        </div>
      )}
    </section>
  );
}

function LabPanel({
  emoji,
  label,
  ar,
  children,
  seq,
}: {
  emoji: string;
  label: string;
  ar?: string;
  children: ReactNode;
  seq?: string;
}) {
  return (
    <div
      data-en-seq={seq}
      className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-violet-50 to-sky-50 p-4"
    >
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-indigo-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <En className="text-[11px] font-black uppercase tracking-[0.18em] text-indigo-700">{label}</En>
        {ar && <Rich text={ar} className="text-sm font-bold text-slate-600" />}
      </div>
      {children}
    </div>
  );
}

function FormulaStrip({
  items,
  tone = "indigo",
}: {
  items: readonly string[];
  tone?: "emerald" | "indigo" | "amber" | "rose" | "sky" | "violet";
}) {
  const colors: Record<string, string> = {
    emerald: "border-emerald-200 bg-white text-emerald-900",
    indigo: "border-indigo-200 bg-white text-indigo-900",
    amber: "border-amber-200 bg-white text-amber-900",
    rose: "border-rose-200 bg-white text-rose-900",
    sky: "border-sky-200 bg-white text-sky-900",
    violet: "border-violet-200 bg-white text-violet-900",
  };
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <En key={item} className={`rounded-xl border-2 px-3 py-2 text-sm font-black ${colors[tone]}`}>
          {item}
        </En>
      ))}
    </div>
  );
}

function Chip({ en, tone = "indigo" }: { en: string; tone?: "indigo" | "violet" | "emerald" | "rose" | "amber" | "slate" }) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-700 text-white",
    violet: "bg-violet-700 text-white",
    emerald: "bg-emerald-700 text-white",
    rose: "bg-rose-700 text-white",
    amber: "bg-amber-600 text-white",
    slate: "bg-white text-indigo-900 border-2 border-indigo-200",
  };
  return <En className={`rounded-xl px-3 py-1.5 text-base font-black ${colors[tone]}`}>{en}</En>;
}

/** شارة نوع الاسم — Countable / Uncountable */
function TypeBadge({ type }: { type: "Countable" | "Uncountable" }) {
  return (
    <En
      className={`rounded-lg px-2.5 py-1 text-xs font-black ${
        type === "Countable" ? "bg-emerald-600 text-white" : "bg-violet-700 text-white"
      }`}
    >
      {type}
    </En>
  );
}

// ============================================================
// 0. الافتتاح — ربط مع الدروس السابقة
// ============================================================
function OpeningRecall() {
  return (
    <LabPanel emoji="🔗" label="CONNECTION TO LESSONS 1–22" ar="نقطة الربط مع كل ما سبق" seq="l23-opening">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={OPENING_EXCELLENT} />
      </div>
      <div className="mt-2 text-center text-base font-bold text-slate-700">
        <Rich text={OPENING_RECALL} />
      </div>
      <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {OPENING_RECALL_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-2 rounded-xl border-2 border-white bg-white/80 p-2 text-sm font-bold text-slate-700">
            <span className="text-indigo-600">◀</span>
            <Rich text={item} />
          </div>
        ))}
      </div>
      <div className="mt-3 text-center text-base font-bold text-slate-700">
        <Rich text={OPENING_NOW} />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-indigo-300 bg-white p-4 text-center">
        <div className="text-lg font-black text-indigo-900 md:text-xl">
          <Rich text={OPENING_KEY_QUESTION} />
        </div>
        <En className="mt-1 block text-base font-black text-indigo-700">{OPENING_KEY_QUESTION_EN}</En>
      </div>
      <div className="mt-3 text-center text-base font-bold text-slate-700">
        <Rich text={OPENING_IF} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {OPENING_PAYOFF.map((item) => (
          <span key={item} className="rounded-lg border-2 border-indigo-200 bg-white px-2.5 py-1 text-sm font-bold text-indigo-800">
            <Rich text={item} />
          </span>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 1. آلة العدّ — ما معنى Countable؟
// ============================================================
type MachineWord = {
  word: string;
  emoji: string;
  type: "Countable" | "Uncountable";
  one: string;
  two: string;
};

const MACHINE_WORDS: MachineWord[] = [
  { word: "apple", emoji: "🍎", type: "Countable", one: "one apple", two: "two apples" },
  { word: "book", emoji: "📖", type: "Countable", one: "one book", two: "two books" },
  { word: "car", emoji: "🚗", type: "Countable", one: "one car", two: "two cars" },
  { word: "student", emoji: "🧑‍🎓", type: "Countable", one: "one student", two: "two students" },
  { word: "egg", emoji: "🥚", type: "Countable", one: "one egg", two: "two eggs" },
  { word: "dog", emoji: "🐶", type: "Countable", one: "one dog", two: "two dogs" },
  { word: "water", emoji: "💧", type: "Uncountable", one: "one water", two: "two waters" },
  { word: "milk", emoji: "🥛", type: "Uncountable", one: "one milk", two: "two milks" },
  { word: "rice", emoji: "🍚", type: "Uncountable", one: "one rice", two: "two rices" },
  { word: "money", emoji: "💵", type: "Uncountable", one: "one money", two: "two moneys" },
  { word: "information", emoji: "📋", type: "Uncountable", one: "one information", two: "two informations" },
  { word: "furniture", emoji: "🛋️", type: "Uncountable", one: "one furniture", two: "two furnitures" },
];

function CountingMachine() {
  const [active, setActive] = useState(0);
  const word = MACHINE_WORDS[active];
  const countable = word.type === "Countable";
  return (
    <LabPanel emoji="🧮" label="COUNTING MACHINE" ar="ضع الاسم في الآلة: هل يقبل 1، 2، 3؟" seq="l23-machine">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={`${COUNTABLE_ANY} `} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1.5">
        {COUNTABLE_NUMBERS.map((n) => (
          <En key={n} className="rounded-lg bg-indigo-700 px-2.5 py-1 text-sm font-black text-white">
            {n}
          </En>
        ))}
      </div>
      <div className="mt-1 text-center text-base font-bold text-slate-700">
        <Rich text={COUNTABLE_THEN} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
        {MACHINE_WORDS.map((item, i) => (
          <button
            key={item.word}
            type="button"
            onClick={() => setActive(i)}
            dir="ltr"
            className={`ltr-row rounded-xl border-2 p-2 text-center transition ${
              active === i ? "border-indigo-500 bg-white shadow" : "border-slate-200 bg-white/70 hover:border-indigo-300"
            }`}
          >
            <span className="block text-2xl">{item.emoji}</span>
            <En className="mt-1 block text-xs font-black text-slate-900">{item.word}</En>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <En className="rounded-xl bg-slate-900 px-3 py-1.5 text-lg font-black text-white">{word.word}</En>
          <span className="text-xl">→</span>
          <TypeBadge type={word.type} />
        </div>
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap items-center justify-center gap-2">
          <En className={`rounded-lg border-2 px-2.5 py-1 text-sm font-black ${countable ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-rose-300 bg-rose-50 text-rose-700 line-through"}`}>
            {word.one} {countable ? "✅" : "❌"}
          </En>
          <En className={`rounded-lg border-2 px-2.5 py-1 text-sm font-black ${countable ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-rose-300 bg-rose-50 text-rose-700 line-through"}`}>
            {word.two} {countable ? "✅" : "❌"}
          </En>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-indigo-100 bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={COUNTABLE_FOR_EXAMPLE} />
        </div>
        <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
          {COUNTABLE_BOOK_COUNT.map((line) => (
            <En key={line} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-800">
              {line}
            </En>
          ))}
        </div>
        <div className="mt-1.5 text-center text-sm font-bold text-slate-700">
          <Rich text={COUNTABLE_BOOK_CAN} />
        </div>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={COUNTABLE_SO} />
        </div>
        <En className="mt-1 block text-center text-lg font-black text-indigo-900">{COUNTABLE_BOOK_EQ}</En>
      </div>
      <div className="mt-2 rounded-2xl border-2 border-indigo-100 bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={COUNTABLE_OTHER} />
        </div>
        <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
          {COUNTABLE_APPLE_COUNT.map((line) => (
            <En key={line} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-800">
              {line}
            </En>
          ))}
        </div>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={COUNTABLE_SO} />
        </div>
        <En className="mt-1 block text-center text-lg font-black text-indigo-900">{COUNTABLE_APPLE_EQ}</En>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white p-2.5">
        <En className="rounded-xl bg-emerald-700 px-3 py-1.5 text-base font-black text-white">{COUNTABLE_MEANING.en}</En>
        <span className="text-sm font-bold text-slate-600">= {COUNTABLE_MEANING.ar}</span>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 2. أمثلة Countable
// ============================================================
function CountableExamples() {
  return (
    <LabPanel emoji="⭐" label="COUNTABLE NOUNS" ar="15 اسمًا معدودًا من المصدر" seq="l23-countable-examples">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
        {COUNTABLE_EXAMPLES.map((row) => (
          <div key={row.en} className="flex items-center justify-center gap-2 rounded-2xl border-2 border-white bg-white p-2.5">
            <En className="rounded-lg bg-indigo-700 px-2.5 py-1 text-base font-black text-white">{row.en}</En>
            <Rich text={`= ${row.ar}`} className="text-sm font-bold text-slate-600" />
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center text-base font-bold text-emerald-900">
        <Rich text={COUNTABLE_EXAMPLES_NOTE} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 3. الاختبار السحري
// ============================================================
const MAGIC_TEST_WORDS = [
  { word: "books", emoji: "📚" },
  { word: "chairs", emoji: "🪑" },
  { word: "students", emoji: "🧑‍🎓" },
  { word: "phones", emoji: "📱" },
];

function MagicTest() {
  const [active, setActive] = useState(0);
  const [n, setN] = useState(3);
  const word = MAGIC_TEST_WORDS[active];
  return (
    <LabPanel emoji="🪄" label="ONE · TWO · THREE TEST" ar="هل أستطيع أن أضع رقمًا أمامه؟" seq="l23-magic-test">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={MAGIC_TEST_ASK} />
      </div>
      <div className="mt-1 rounded-2xl border-2 border-indigo-300 bg-white p-3 text-center text-lg font-black text-indigo-900">
        <Rich text={`«${MAGIC_TEST_Q}»`} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {MAGIC_TEST_WORDS.map((item, i) => (
          <button
            key={item.word}
            type="button"
            onClick={() => setActive(i)}
            dir="ltr"
            className={`ltr-row rounded-xl border-2 p-2 text-center transition ${
              active === i ? "border-indigo-500 bg-white shadow" : "border-slate-200 bg-white/70 hover:border-indigo-300"
            }`}
          >
            <span className="block text-2xl">{item.emoji}</span>
            <En className="mt-1 block text-sm font-black text-slate-900">{item.word}</En>
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {[1, 2, 3, 5, 10, 20].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setN(value)}
            className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${
              n === value ? "border-indigo-500 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <En className="text-2xl font-black text-emerald-700">
          {n} {word.word} ✅
        </En>
      </div>
      <div className="mt-2 rounded-2xl border-2 border-indigo-100 bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-600">
          <Rich text="أمثلة المصدر:" />
        </div>
        <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
          {MAGIC_TEST_ITEMS.map((line) => (
            <En key={line} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-800">
              {line}
            </En>
          ))}
        </div>
        <div className="mt-2 text-center text-sm font-bold text-indigo-900">
          <Rich text={MAGIC_TEST_SO} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 4. شكلان: مفرد / جمع
// ============================================================
function TwoForms() {
  const [mode, setMode] = useState<"singular" | "plural">("singular");
  return (
    <LabPanel emoji="🔥" label="TWO FORMS" ar="الاسم المعدود يمكن أن يكون مفردًا أو جمعًا" seq="l23-two-forms">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={TWO_FORMS_LEAD} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        {(["singular", "plural"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            dir="ltr"
            className={`ltr-row rounded-xl border-2 px-4 py-2 text-sm font-black transition ${
              mode === value ? "border-indigo-500 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            {value === "singular" ? TWO_FORMS_SINGULAR_LABEL : TWO_FORMS_PLURAL_LABEL}
          </button>
        ))}
      </div>
      <div dir="ltr" className="ltr-row mt-3 flex flex-wrap justify-center gap-2">
        {(mode === "singular" ? TWO_FORMS_SINGULAR : TWO_FORMS_PLURAL).map((line) => (
          <En key={line} className="rounded-xl border-2 border-indigo-200 bg-white px-3 py-2 text-base font-black text-indigo-900">
            {line}
          </En>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-white bg-white p-3 text-center">
          <div className="text-sm font-black text-slate-600">{TWO_FORMS_SINGULAR_LABEL}</div>
          <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1">
            {TWO_FORMS_SINGULAR.slice(0, 3).map((line) => (
              <En key={line} className="rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-black text-indigo-800">
                {line}
              </En>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-white bg-white p-3 text-center">
          <div className="text-sm font-black text-slate-600">{TWO_FORMS_PLURAL_LABEL}</div>
          <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1">
            {TWO_FORMS_PLURAL.map((line) => (
              <En key={line} className="rounded-lg bg-violet-50 px-2 py-0.5 text-xs font-black text-violet-800">
                {line}
              </En>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 rounded-2xl bg-white p-3 text-center text-sm font-bold text-indigo-800">
        <Rich text={TWO_FORMS_LINK} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 5. تذكر
// ============================================================
function RememberBoard() {
  return (
    <LabPanel emoji="🧠" label="REMEMBER" ar="مفرد ← a / an، جمع ← رقم" seq="l23-remember">
      <En className="block text-center text-xl font-black text-indigo-900">{REMEMBER_TITLE}</En>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-white bg-white p-3 text-center">
          <div className="text-base font-black text-slate-700">
            <Rich text={REMEMBER_SINGULAR} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex justify-center">
            <Chip en="a / an" />
          </div>
        </div>
        <div className="rounded-2xl border-2 border-white bg-white p-3 text-center">
          <div className="text-base font-black text-slate-700">
            <Rich text={REMEMBER_PLURAL} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex justify-center">
            <En className="rounded-xl bg-violet-700 px-3 py-1.5 text-base font-black text-white">1 · 2 · 3...</En>
          </div>
        </div>
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text="مثلاً:" />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
        {REMEMBER_EXAMPLES.map((line) => (
          <En key={line} className="rounded-xl border-2 border-indigo-200 bg-white px-3 py-2 text-base font-black text-indigo-900">
            {line}
          </En>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 6. المفاجأة — Uncountable
// ============================================================
function UncountableIntro() {
  return (
    <LabPanel emoji="🚨" label="UNCOUNTABLE NOUNS" ar="غير معدود — مادة أو كمية عامة" seq="l23-uncountable">
      <div className="text-center text-lg font-black text-rose-800">
        <Rich text={SURPRISE_TITLE} />
      </div>
      <div className="mt-1 text-center text-base font-bold text-slate-700">
        <Rich text={SURPRISE_NOT_ALL} />
      </div>
      <div className="mt-1 text-center text-base font-bold text-slate-700">
        <Rich text={SURPRISE_OTHER} />
      </div>
      <En className="mt-1 block text-center text-2xl font-black text-violet-800">{SURPRISE_LABEL}</En>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white p-2.5">
        <En className="rounded-xl bg-violet-700 px-3 py-1.5 text-base font-black text-white">{UNCOUNTABLE_MEANING.en}</En>
        <span className="text-sm font-bold text-slate-600">= {UNCOUNTABLE_MEANING.ar}</span>
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center text-base font-semibold leading-relaxed text-slate-700">
        <Rich text={UNCOUNTABLE_DEF} />
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={UNCOUNTABLE_FOR_EXAMPLE} />
      </div>
      <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {UNCOUNTABLE_EXAMPLES.map((row) => (
          <div key={row.en} className="flex items-center justify-center gap-2 rounded-2xl border-2 border-white bg-white p-2.5">
            <En className="rounded-lg bg-violet-700 px-2.5 py-1 text-base font-black text-white">{row.en}</En>
            <Rich text={`= ${row.ar}`} className="text-sm font-bold text-slate-600" />
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 7. مثال الماء — محوّل الوحدات
// ============================================================
function WaterLab() {
  const [mode, setMode] = useState<"material" | "units">("material");
  return (
    <LabPanel emoji="💧" label="WATER UNIT CONVERTER" ar="المادة نفسها أم الوحدات؟" seq="l23-water">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={WATER_THINK} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("material")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${
            mode === "material" ? "border-violet-500 bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <Rich text="المادة نفسها 💧" />
        </button>
        <button
          type="button"
          onClick={() => setMode("units")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${
            mode === "units" ? "border-sky-500 bg-sky-700 text-white" : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <Rich text="الوحدات 🍶" />
        </button>
      </div>
      <div className="mt-3 space-y-2">
        <div
          className={`rounded-2xl border-2 p-3 transition ${
            mode === "material" ? "border-violet-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"
          }`}
        >
          <div className="text-center text-sm font-bold text-slate-700">
            <Rich text={WATER_USUALLY} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
            {WATER_NUMBERS.map((line) => (
              <En key={line} className="rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-2 text-base font-black text-rose-700 line-through">
                {line}
              </En>
            ))}
          </div>
          <div className="mt-1.5 text-center text-sm font-bold text-slate-700">
            <Rich text={`${WATER_MATERIAL} ${WATER_NO}`} />
          </div>
          <div className="mt-1.5 text-center text-sm font-bold text-slate-700">
            <Rich text={WATER_WE_SAY} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
            {WATER_SAY.map((line) => (
              <En key={line} className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
                {line}
              </En>
            ))}
          </div>
        </div>
        <div
          className={`rounded-2xl border-2 p-3 transition ${
            mode === "units" ? "border-sky-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"
          }`}
        >
          <div className="text-center text-sm font-bold text-slate-700">
            <Rich text={WATER_UNITS_LEAD} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
            {WATER_UNITS.map((line) => (
              <En key={line} className="rounded-xl border-2 border-sky-300 bg-sky-50 px-3 py-2 text-base font-black text-sky-900">
                {line}
              </En>
            ))}
          </div>
          <div className="mt-2 rounded-2xl border-2 border-sky-100 bg-sky-50/60 p-3 text-center">
            <div className="text-sm font-bold text-slate-700">
              <Rich text={WATER_SMART} />
            </div>
            <div className="mt-1 text-sm font-bold text-slate-700">
              <Rich text={WATER_SMART_1} />
            </div>
            <div className="mt-1 text-sm font-bold text-slate-700">
              <Rich text={WATER_SMART_2} />
            </div>
            <En className="mt-1 block text-2xl font-black text-sky-800">{WATER_SMART_3}</En>
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 8. مثال الأرز
// ============================================================
function RiceLab() {
  const [mode, setMode] = useState<"material" | "units">("material");
  return (
    <LabPanel emoji="🍚" label="RICE UNIT CONVERTER" ar="لا نعدّ الأرز نفسه — نعدّ الأكياس" seq="l23-rice">
      <div className="mt-1 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("material")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${
            mode === "material" ? "border-violet-500 bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <Rich text="الأرز نفسه 🍚" />
        </button>
        <button
          type="button"
          onClick={() => setMode("units")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${
            mode === "units" ? "border-amber-500 bg-amber-600 text-white" : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <Rich text="الأكياس 🛍️" />
        </button>
      </div>
      <div className="mt-3 space-y-2">
        <div
          className={`rounded-2xl border-2 p-3 transition ${
            mode === "material" ? "border-violet-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"
          }`}
        >
          <div className="text-center text-sm font-bold text-slate-700">
            <Rich text={RICE_USUALLY} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
            {RICE_NUMBERS.map((line) => (
              <En key={line} className="rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-2 text-base font-black text-rose-700 line-through">
                {line}
              </En>
            ))}
          </div>
          <div className="mt-1.5 text-center text-sm font-bold text-slate-700">
            <Rich text={RICE_BUT} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
            {RICE_SAY.map((line) => (
              <En key={line} className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
                {line}
              </En>
            ))}
          </div>
        </div>
        <div
          className={`rounded-2xl border-2 p-3 transition ${
            mode === "units" ? "border-amber-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"
          }`}
        >
          <div className="text-center text-sm font-bold text-slate-700">
            <Rich text={RICE_UNITS_LEAD} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
            {RICE_UNITS.map((line) => (
              <En key={line} className="rounded-xl border-2 border-amber-300 bg-amber-50 px-3 py-2 text-base font-black text-amber-900">
                {line}
              </En>
            ))}
          </div>
          <div className="mt-2 rounded-2xl border-2 border-amber-100 bg-amber-50/60 p-3 text-center text-sm font-bold text-amber-900">
            <Rich text={RICE_SMART} />
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 9. الفرق الأساسي
// ============================================================
function CoreDifference() {
  return (
    <LabPanel emoji="🧠" label="CORE DIFFERENCE" ar="أفراد منفصلة مقابل كتلة أو مفهوم" seq="l23-core-difference">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-white p-4">
          <En className="block text-center text-2xl font-black text-emerald-800">{CORE_COUNTABLE_LABEL}</En>
          <div className="mt-1 text-center text-sm font-bold text-slate-700">
            <Rich text={CORE_COUNTABLE_DEF} />
          </div>
          <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
            {CORE_COUNTABLE_ITEMS.map((line) => (
              <En key={line} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-800">
                {line}
              </En>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-violet-200 bg-white p-4">
          <En className="block text-center text-2xl font-black text-violet-800">{CORE_UNCOUNTABLE_LABEL}</En>
          <div className="mt-1 text-center text-sm font-bold text-slate-700">
            <Rich text={CORE_UNCOUNTABLE_DEF} />
          </div>
          <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
            {CORE_UNCOUNTABLE_ITEMS.map((line) => (
              <En key={line} className="rounded-lg bg-violet-50 px-2.5 py-1 text-sm font-black text-violet-800">
                {line}
              </En>
            ))}
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 10. مقارنة ذكية
// ============================================================
function SmartCompare() {
  return (
    <LabPanel emoji="⭐" label="SMART COMPARISON" ar="apple → apples لكن water → water" seq="l23-smart-compare">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={SMART_LOOK} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4 text-center">
          <En className="text-xl font-black text-emerald-800">{SMART_APPLE}</En>
          <div className="mt-1 text-xs font-bold text-emerald-700">✅</div>
        </div>
        <div className="rounded-2xl border-2 border-violet-200 bg-white p-4 text-center">
          <div className="text-sm font-bold text-slate-600">
            <Rich text={SMART_BUT} />
          </div>
          <En className="mt-1 block text-xl font-black text-violet-800">{SMART_WATER}</En>
        </div>
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <div className="text-sm font-bold text-slate-700">
          <Rich text={SMART_USUALLY_NOT} />
        </div>
        <En className="mt-1 block text-xl font-black text-rose-700 line-through">{SMART_WATERS}</En>
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={SMART_BASIC} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 11. قاعدة a / an
// ============================================================
function AanRule() {
  return (
    <LabPanel emoji="🚨" label="A / AN RULE" ar="a / an مع المفرد المعدود فقط" seq="l23-aan-rule">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={AAN_RULE_LEAD} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex justify-center">
        <En className="rounded-xl bg-indigo-700 px-4 py-2 text-lg font-black text-white">{AAN_RULE_TOOL}</En>
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={AAN_RULE_FOR_EXAMPLE} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
        {AAN_GOOD.map((line) => (
          <En key={line} className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
            {line}
          </En>
        ))}
      </div>
      <div className="mt-2 rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-center text-base font-bold text-rose-800">
        <Rich text={AAN_RULE_BUT} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={AAN_RULE_SO} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
        {AAN_VERDICTS.map((row) => (
          <En
            key={row.en}
            className={`rounded-xl border-2 px-3 py-2 text-base font-black ${
              row.verdict === "good"
                ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                : "border-rose-300 bg-rose-50 text-rose-700 line-through"
            }`}
          >
            {row.en} {row.verdict === "good" ? "✅" : "❌"}
          </En>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 12. لماذا؟
// ============================================================
function WhyRule() {
  return (
    <LabPanel emoji="🧠" label="WHY?" ar="a = واحد، an = واحد" seq="l23-why">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={WHY_BECAUSE} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
        <En className="rounded-xl bg-indigo-700 px-4 py-2 text-lg font-black text-white">{WHY_A}</En>
        <En className="rounded-xl bg-violet-700 px-4 py-2 text-lg font-black text-white">{WHY_AN}</En>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={WHY_WHEN} />
        </div>
        <En className="mt-1 block text-center text-xl font-black text-indigo-900">{WHY_BOOK}</En>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={WHY_YOU_SAY} />
        </div>
        <div className="mt-1 text-center text-base font-bold text-slate-800">
          <Rich text={WHY_ONE_BOOK} />
        </div>
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={WHY_BUT} />
        </div>
        <En className="mt-1 block text-center text-xl font-black text-violet-900">{WHY_WATER}</En>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={WHY_NOT_PIECE} />
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-700">
          <Rich text={WHY_SO_NOT} />
        </div>
        <En className="mt-1 block text-center text-lg font-black text-rose-700 line-through">{WHY_A_WATER}</En>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={WHY_BUT_SAY} />
        </div>
        <En className="mt-1 block text-center text-lg font-black text-emerald-800">{WHY_SOME_WATER}</En>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 13. استثناء المطعم
// ============================================================
function RestaurantException() {
  return (
    <LabPanel emoji="⭐" label="RESTAURANT EXCEPTION" ar="a water في المطعم = a bottle / a glass of water" seq="l23-restaurant">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={RESTAURANT_LEAD} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex justify-center">
        <En className="rounded-xl bg-amber-500 px-4 py-2 text-xl font-black text-white">{RESTAURANT_A_WATER}</En>
      </div>
      <div className="mt-1 text-center text-base font-bold text-slate-700">
        <Rich text={RESTAURANT_PLACE} />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={RESTAURANT_SHORT} />
        </div>
        <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
          {RESTAURANT_SHORT_FORMS.map((line) => (
            <En key={line} className="rounded-xl border-2 border-sky-300 bg-sky-50 px-3 py-2 text-base font-black text-sky-900">
              {line}
            </En>
          ))}
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-700">
          <Rich text={RESTAURANT_MEANING} />
        </div>
      </div>
      <div className="mt-2 rounded-2xl border-2 border-violet-200 bg-violet-50 p-3 text-center">
        <div className="text-sm font-bold text-violet-900">
          <Rich text={RESTAURANT_BUT} />
        </div>
        <En className="mt-1 block text-lg font-black text-violet-900">{RESTAURANT_RULE}</En>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 14. لا تأخذ جمعًا
// ============================================================
function NoPluralRule() {
  return (
    <LabPanel emoji="🧠" label="NO PLURAL" ar="لا جمع عاديًا لغير المعدود" seq="l23-no-plural">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={NO_PLURAL_LEAD} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text="مثلاً:" />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1.5">
        {NO_PLURAL_WORDS.map((word) => (
          <En key={word} className="rounded-lg bg-violet-50 px-2.5 py-1 text-sm font-black text-violet-800">
            {word}
          </En>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {NO_PLURAL_PAIRS.map((pair) => (
          <div key={pair.good} className="rounded-2xl border-2 border-white bg-white p-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-bold text-slate-600">{NO_PLURAL_WE_SAY}</span>
              <En className="rounded-xl bg-emerald-600 px-3 py-1.5 text-base font-black text-white">{pair.good}</En>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-bold text-slate-600">{NO_PLURAL_NOT}</span>
              <En className="rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-1.5 text-base font-black text-rose-700 line-through">
                {pair.bad} ❌
              </En>
            </div>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 15. كلمات مهمة جدًا
// ============================================================
function ImportantWords() {
  return (
    <LabPanel emoji="🔥" label="MUST-KNOW WORDS" ar="17 كلمة غير معدودة يجب حفظها" seq="l23-important-words">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {IMPORTANT_WORDS.map((row) => (
          <div key={row.en} className="flex items-center justify-center gap-2 rounded-2xl border-2 border-white bg-white p-2.5">
            <En className="rounded-lg bg-violet-700 px-2.5 py-1 text-base font-black text-white">{row.en}</En>
            <Rich text={`= ${row.ar}`} className="text-sm font-bold text-slate-600" />
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 16. chicken — حسب المعنى
// ============================================================
function ChickenContext() {
  const [mode, setMode] = useState<"animal" | "meat">("animal");
  return (
    <LabPanel emoji="🐔" label="MEANING SWITCH — chicken" ar="نفس الكلمة، نوعان حسب المعنى" seq="l23-chicken">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={CHICKEN_SMART} />
      </div>
      <div className="mt-1 text-center text-base font-bold text-slate-700">
        <Rich text={CHICKEN_LEAD} />
      </div>
      <En className="mt-1 block text-center text-2xl font-black text-slate-900">{CHICKEN_EXAMPLE}</En>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={CHICKEN_MAY} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("animal")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${
            mode === "animal" ? "border-emerald-500 bg-emerald-700 text-white" : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <Rich text={CHICKEN_ANIMAL} />
        </button>
        <button
          type="button"
          onClick={() => setMode("meat")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${
            mode === "meat" ? "border-violet-500 bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <Rich text={CHICKEN_MEAT} />
        </button>
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        <div
          className={`rounded-2xl border-2 p-3 transition ${
            mode === "animal" ? "border-emerald-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"
          }`}
        >
          <div className="text-center text-sm font-bold text-slate-700">
            <Rich text={CHICKEN_ANIMAL} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
            {CHICKEN_ANIMAL_FORMS.map((line) => (
              <En key={line} className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
                {line}
              </En>
            ))}
          </div>
          <div className="mt-2 text-center">
            <TypeBadge type="Countable" />
          </div>
          <div className="mt-1 text-center text-sm font-bold text-slate-700">
            <Rich text={CHICKEN_ANIMAL_TYPE} />
          </div>
        </div>
        <div
          className={`rounded-2xl border-2 p-3 transition ${
            mode === "meat" ? "border-violet-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"
          }`}
        >
          <div className="text-center text-sm font-bold text-slate-700">
            <Rich text={`${CHICKEN_BUT} ${CHICKEN_MEAT}`} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex justify-center">
            <En className="rounded-xl border-2 border-violet-300 bg-violet-50 px-3 py-2 text-base font-black text-violet-800">
              {CHICKEN_MEAT_FORM}
            </En>
          </div>
          <div className="mt-2 text-center">
            <TypeBadge type="Uncountable" />
          </div>
          <div className="mt-1 text-center text-sm font-bold text-slate-700">
            <Rich text={CHICKEN_MEAT_TYPE} />
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center">
        <div className="text-sm font-bold text-slate-700">
          <Rich text={CHICKEN_DONT_MEMORIZE} />
        </div>
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={CHICKEN_ASK} />
        </div>
        <div className="mt-1 text-base font-black text-indigo-900">
          <Rich text={`«${CHICKEN_ASK_Q}»`} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 17. coffee
// ============================================================
function CoffeeContext() {
  return (
    <LabPanel emoji="🥤" label="MEANING SWITCH — coffee" ar="المشروب عمومًا أم أكواب؟" seq="l23-coffee">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={COFFEE_LEAD} />
      </div>
      <SourceLine en={COFFEE_EXAMPLE} tone="focus" />
      <div className="mt-1 text-center text-base font-bold text-slate-700">
        <Rich text={COFFEE_BUT} />
      </div>
      <SourceLine en={COFFEE_RESTAURANT} tone="warn" />
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={COFFEE_MEANING} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex justify-center">
        <En className="rounded-xl bg-amber-600 px-4 py-2 text-lg font-black text-white">{COFFEE_CUPS}</En>
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center text-sm font-bold text-slate-700">
        <Rich text={COFFEE_SO} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 18. قاعدة المستوى الأساسي
// ============================================================
function BasicLevelRule() {
  return (
    <LabPanel emoji="🧠" label="BASIC-LEVEL RULE" ar="في البداية تعامل معها كغير معدودة" seq="l23-basic-rule">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={BASIC_RULE_LEAD} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {BASIC_RULE_WORDS.map((word) => (
          <En key={word} className="rounded-xl border-2 border-violet-300 bg-violet-50 px-3 py-2 text-base font-black text-violet-800">
            {word}
          </En>
        ))}
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <Rich text={BASIC_RULE_AS} className="text-base font-bold text-slate-800" />
        <div className="mt-1">
          <TypeBadge type="Uncountable" />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 19. العلاقة مع There is / There are
// ============================================================
function ThereBridge() {
  return (
    <LabPanel emoji="🔗" label="THERE IS / THERE ARE SWITCH" ar="درس 21 يلتقي بالدرس 23" seq="l23-there-bridge">
      <div className="text-center text-base font-black text-indigo-900">
        <Rich text={THERE_LINK} />
      </div>
      <div className="mt-2 space-y-2">
        {THERE_CASES.map((row) => (
          <div key={row.en} className="rounded-2xl border-2 border-white bg-white p-3">
            <div className="flex flex-wrap items-center gap-2">
              <En className="rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-800">{row.label}</En>
              <span className="text-sm font-bold text-slate-500">
                <Rich text={`مع ${row.label === "Countable Singular" ? "المفرد المعدود" : row.label === "Countable Plural" ? "الجمع المعدود" : "غير المعدود"}:`} />
              </span>
            </div>
            <En className="mt-1.5 block text-left text-lg font-black text-slate-900">{row.en}</En>
            <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">
              <Rich text={row.ar} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <div className="text-sm font-bold text-slate-700">
          <Rich text={THERE_NOTICE} />
        </div>
        <En className="mt-1 block text-lg font-black text-emerald-800">{THERE_GOOD}</En>
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={THERE_NOT} />
        </div>
        <En className="mt-1 block text-lg font-black text-rose-700 line-through">{THERE_BAD}</En>
        <div className="mt-1 text-sm font-bold text-slate-700">
          <Rich text={THERE_REASON} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 20. قاعدة ذهبية
// ============================================================
function ThereGoldenRule() {
  return (
    <LabPanel emoji="⭐" label="GOLDEN RULE" ar="ثلاث حالات: مفرد معدود، جمع معدود، غير معدود" seq="l23-there-golden">
      <div className="space-y-2">
        {THERE_GOLDEN.map((row) => (
          <div key={row.rule} dir="ltr" className="ltr-row rounded-2xl border-2 border-white bg-white p-3">
            <div dir="rtl" className="text-sm font-black text-slate-600">
              <Rich text={row.label} />
            </div>
            <En className="mt-1 block rounded-xl bg-indigo-50 px-3 py-1.5 text-left text-base font-black text-indigo-900">
              {row.rule}
            </En>
            <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">
              <Rich text={row.exampleLabel} />
            </div>
            <En className="mt-0.5 block text-left text-base font-black text-emerald-800">{row.example}</En>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 21. تحليل المطبخ
// ============================================================
function KitchenAnalysis() {
  const [built, setBuilt] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setBuilt((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <LabPanel emoji="🧪" label="KITCHEN ANALYSIS" ar="اضغط على كل عنصر لتبني جملته" seq="l23-kitchen">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={KITCHEN_LEAD} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {KITCHEN_ITEMS.map((item) => (
          <En key={item.en} className="rounded-xl border-2 border-indigo-200 bg-white px-3 py-2 text-sm font-black text-indigo-900">
            {item.emoji} {item.en}
          </En>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-600">
        <Rich text={KITCHEN_WE_SAY} />
      </div>
      <div className="mt-1.5 grid gap-2">
        {KITCHEN_SENTENCES.map((sentence, i) => {
          const on = built.has(i);
          return (
            <button
              key={sentence}
              type="button"
              onClick={() => toggle(i)}
              dir="ltr"
              className={`ltr-row flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition ${
                on ? "border-indigo-400 bg-white shadow" : "border-slate-200 bg-white/70"
              }`}
            >
              <span className={`text-2xl ${on ? "" : "opacity-30 grayscale"}`}>{KITCHEN_ITEMS[i]?.emoji ?? "🍽️"}</span>
              <En className={`text-base font-black ${on ? "text-slate-900" : "text-slate-400"}`}>{sentence}</En>
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center text-sm font-bold text-indigo-800">
        بنيت {built.size} / {KITCHEN_SENTENCES.length} من جمل المطبخ
      </div>
      <div className="mt-2 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center text-sm font-bold text-amber-900">
        <Rich text={KITCHEN_NOTE} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 22. some
// ============================================================
function SomeLab() {
  return (
    <LabPanel emoji="🧠" label="SOME" ar="كمية غير محددة" seq="l23-some">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={SOME_RECALL} />
      </div>
      <En className="mt-1 block text-center text-xl font-black text-indigo-900">{SOME_MEANING}</En>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-white bg-white p-3">
          <div className="text-center text-sm font-black text-slate-600">
            <Rich text={SOME_WITH_PLURAL} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
            {SOME_WITH_PLURAL_ITEMS.map((line) => (
              <En key={line} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-800">
                {line}
              </En>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-white bg-white p-3">
          <div className="text-center text-sm font-black text-slate-600">
            <Rich text={SOME_WITH_UNCOUNTABLE} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
            {SOME_WITH_UNCOUNTABLE_ITEMS.map((line) => (
              <En key={line} className="rounded-lg bg-violet-50 px-2.5 py-1 text-sm font-black text-violet-800">
                {line}
              </En>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={SOME_SO} />
      </div>
      <FormulaStrip items={SOME_FORMULAS} tone="indigo" />
    </LabPanel>
  );
}

// ============================================================
// 23. أمثلة some
// ============================================================
function SomeExamples() {
  return (
    <LabPanel emoji="⭐" label="SOME EXAMPLES" ar="أربع جمل من المصدر" seq="l23-some-examples">
      <div className="grid gap-2 sm:grid-cols-2">
        {SOME_EXAMPLES.map((row) => (
          <SourceLine key={row.en} en={row.en} ar={row.ar} tone="focus" />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 24. انتبه — some book / some books
// ============================================================
function SomeAttention() {
  return (
    <LabPanel emoji="🚨" label="SOME + PLURAL" ar="some book خطأ إذا قصدنا بعض الكتب" seq="l23-some-attention">
      <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={SOME_ATTENTION_NOT} />
        </div>
        <En className="mt-1 block text-center text-xl font-black text-rose-700 line-through">{SOME_ATTENTION_BAD}</En>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={SOME_ATTENTION_IF} />
        </div>
      </div>
      <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={SOME_ATTENTION_BUT} />
        </div>
        <En className="mt-1 block text-center text-xl font-black text-emerald-800">{SOME_ATTENTION_GOOD}</En>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={SOME_ATTENTION_WHY} />
        </div>
      </div>
      <div className="rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-600">
          <Rich text={SOME_ATTENTION_AS} />
        </div>
        <En className="mt-1 block text-center text-xl font-black text-emerald-800">{SOME_ATTENTION_WATER}</En>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={SOME_ATTENTION_WATER_WHY} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 25. some أمام نوعين
// ============================================================
function SomeTwoTypes() {
  return (
    <LabPanel emoji="🧠" label="SOME — TWO TYPES" ar="جمع معدود أو غير معدود" seq="l23-some-two-types">
      <div className="grid gap-3 md:grid-cols-2">
        {SOME_TWO_TYPES.map((group) => (
          <div key={group.title} className="rounded-3xl border-2 border-white bg-white p-4">
            <En className="block text-center text-base font-black text-indigo-900">{group.title}</En>
            <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
              {group.items.map((line) => (
                <En key={line} className="rounded-lg bg-indigo-50 px-2.5 py-1 text-sm font-black text-indigo-900">
                  {line}
                </En>
              ))}
            </div>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 26. any
// ============================================================
function AnyLab() {
  return (
    <LabPanel emoji="🔥" label="ANY" ar="في الأسئلة والنفي" seq="l23-any">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={ANY_LEAD} />
      </div>
      <div className="mt-1 flex flex-wrap justify-center gap-2">
        {ANY_PLACES.map((place) => (
          <span key={place} className="rounded-lg border-2 border-indigo-200 bg-white px-2.5 py-1 text-sm font-bold text-indigo-800">
            <Rich text={place} />
          </span>
        ))}
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-white bg-white p-3">
          <div className="text-center text-sm font-black text-slate-600">
            <Rich text={ANY_WITH_PLURAL} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 grid gap-1.5">
            {ANY_WITH_PLURAL_ITEMS.map((line) => (
              <En key={line} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-left text-sm font-black text-emerald-800">
                {line}
              </En>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-white bg-white p-3">
          <div className="text-center text-sm font-black text-slate-600">
            <Rich text={ANY_WITH_UNCOUNTABLE} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 grid gap-1.5">
            {ANY_WITH_UNCOUNTABLE_ITEMS.map((line) => (
              <En key={line} className="rounded-lg bg-violet-50 px-2.5 py-1 text-left text-sm font-black text-violet-800">
                {line}
              </En>
            ))}
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 27. مقارنة some / any
// ============================================================
function SomeAnyCompare() {
  const [group, setGroup] = useState<"countable" | "uncountable">("countable");
  return (
    <LabPanel emoji="⭐" label="SOME vs ANY" ar="إثبات ← some، سؤال ونفي ← any" seq="l23-some-any">
      <div className="flex justify-center gap-2">
        {(["countable", "uncountable"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setGroup(value)}
            dir="ltr"
            className={`ltr-row rounded-xl border-2 px-4 py-2 text-sm font-black transition ${
              group === value ? "border-indigo-500 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            {value === "countable" ? "Countable Plural" : "Uncountable"}
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {(["countable", "uncountable"] as const).map((value) => (
          <div
            key={value}
            className={`rounded-3xl border-2 p-3 transition ${
              group === value ? "border-indigo-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-75"
            }`}
          >
            <div className="text-center text-sm font-black text-slate-600">
              <Rich text={value === "countable" ? "مع Countable Plural:" : "مع Uncountable:"} />
            </div>
            <div className="mt-2 grid gap-2">
              {SOME_ANY_COMPARE.filter((row) => row.group === value).map((row) => (
                <SourceLine key={row.en} en={row.en} tone={row.en.includes("some") ? "good" : "focus"} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center text-sm font-bold text-slate-700">
        <Rich text={SOME_ANY_NOTE} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 28. سؤالان مهمان جدًا
// ============================================================
function TwoQuestionsIntro() {
  return (
    <LabPanel emoji="🧠" label="TWO BIG QUESTIONS" ar="How many? و How much?" seq="l23-two-questions">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={TWO_QUESTIONS_LEAD} />
      </div>
      <div dir="ltr" className="ltr-row mt-3 flex flex-wrap justify-center gap-3">
        <En className="rounded-2xl bg-emerald-700 px-6 py-4 text-2xl font-black text-white">{TWO_QUESTIONS[0]}</En>
        <En className="rounded-2xl bg-violet-700 px-6 py-4 text-2xl font-black text-white">{TWO_QUESTIONS[1]}</En>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 29. How many?
// ============================================================
function HowManyLab() {
  return (
    <LabPanel emoji="🔢" label="HOW MANY?" ar="How many + Countable Plural?" seq="l23-how-many">
      <div className="text-center text-sm font-bold text-slate-600">
        <Rich text={HOWMANY_WE_USE} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex justify-center">
        <En className="rounded-2xl bg-emerald-700 px-5 py-3 text-xl font-black text-white">{HOWMANY_FORMULA}</En>
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-700">
        <Rich text={HOWMANY_WHEN} />
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={HOWMANY_EXAMPLE} />
      </div>
      <div className="mt-1.5 grid gap-2">
        {HOWMANY_EXAMPLES.map((row) => (
          <SourceLine key={row.en} en={row.en} ar={row.ar} tone="good" />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 30. How much?
// ============================================================
function HowMuchLab() {
  return (
    <LabPanel emoji="💧" label="HOW MUCH?" ar="How much + Uncountable Noun?" seq="l23-how-much">
      <div className="text-center text-sm font-bold text-slate-600">
        <Rich text={HOWMUCH_WE_USE} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex justify-center">
        <En className="rounded-2xl bg-violet-700 px-5 py-3 text-xl font-black text-white">{HOWMUCH_FORMULA}</En>
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-700">
        <Rich text={HOWMUCH_WHEN} />
      </div>
      <div className="mt-2 grid gap-2">
        {HOWMUCH_EXAMPLES.map((row) => (
          <SourceLine key={row.en} en={row.en} ar={row.ar} tone="focus" />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 31. مفتاح خارق
// ============================================================
function SuperKey() {
  return (
    <LabPanel emoji="🧠" label="SUPER KEY" ar="عدّ ← How many؟ كمية مادة ← How much؟" seq="l23-super-key">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-white p-4 text-center">
          <div className="text-sm font-bold text-slate-700">
            <Rich text={SUPER_KEY_IF} />
          </div>
          <En className="mt-1 block text-2xl font-black text-emerald-800">{SUPER_KEY_NUMBERS}</En>
          <En className="mt-2 block rounded-xl bg-emerald-700 px-4 py-2 text-xl font-black text-white">{SUPER_KEY_MANY}</En>
        </div>
        <div className="rounded-3xl border-2 border-violet-200 bg-white p-4 text-center">
          <div className="text-sm font-bold text-slate-700">
            <Rich text={SUPER_KEY_IF2} />
          </div>
          <En className="mt-2 block rounded-xl bg-violet-700 px-4 py-2 text-xl font-black text-white">{SUPER_KEY_MUCH}</En>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 32. المعركة الكبرى — بوابة many / much
// ============================================================
const BATTLE_WORDS = [
  { word: "apples", type: "Countable" as const, question: "How many apples?" },
  { word: "water", type: "Uncountable" as const, question: "How much water?" },
  { word: "students", type: "Countable" as const, question: "How many students?" },
  { word: "money", type: "Uncountable" as const, question: "How much money?" },
  { word: "children", type: "Countable" as const, question: "How many children?" },
  { word: "rice", type: "Uncountable" as const, question: "How much rice?" },
];

function BigBattle() {
  const [active, setActive] = useState(0);
  const [gate, setGate] = useState<"many" | "much" | null>(null);
  const word = BATTLE_WORDS[active];
  const correct = word.type === "Countable" ? "many" : "much";
  const decided = gate !== null;
  const right = gate === correct;
  return (
    <LabPanel emoji="⚔️" label="MANY vs MUCH GATE" ar="اختر البوابة الصحيحة للاسم" seq="l23-battle">
      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
        {BATTLE_WORDS.map((item, i) => (
          <button
            key={item.word}
            type="button"
            onClick={() => {
              setActive(i);
              setGate(null);
            }}
            dir="ltr"
            className={`ltr-row rounded-xl border-2 p-2 text-center transition ${
              active === i ? "border-indigo-500 bg-white shadow" : "border-slate-200 bg-white/70 hover:border-indigo-300"
            }`}
          >
            <En className="block text-sm font-black text-slate-900">{item.word}</En>
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {(["many", "much"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setGate(value)}
            dir="ltr"
            className={`ltr-row rounded-2xl border-2 px-6 py-3 text-lg font-black transition ${
              gate === value
                ? decided && right
                  ? "border-transparent bg-emerald-600 text-white"
                  : "border-transparent bg-rose-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      {decided && (
        <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center">
          <En className="block text-xl font-black text-indigo-900">{word.question}</En>
          <div className="mt-1 text-sm font-bold text-slate-600">
            <Rich text={`${word.word} → `} />
            <En className="text-sm font-black text-indigo-900">{word.type}</En>
          </div>
        </div>
      )}
      <div className="mt-3 space-y-2 rounded-2xl border-2 border-white bg-white p-3">
        <En className="block text-center text-lg font-black text-emerald-800">{BATTLE_MANY_Q}</En>
        <div className="text-center text-sm font-bold text-slate-600">
          <Rich text={BATTLE_MANY_BECAUSE} />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <En className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-800">{BATTLE_MANY_WHY}</En>
          <En className="rounded-lg bg-emerald-600 px-2.5 py-1 text-sm font-black text-white">{BATTLE_MANY_TYPE}</En>
        </div>
        <div className="text-center text-sm font-bold text-slate-600">
          <Rich text={BATTLE_BUT} />
        </div>
        <En className="block text-center text-lg font-black text-violet-800">{BATTLE_MUCH_Q}</En>
        <div className="text-center text-sm font-bold text-slate-600">
          <Rich text={BATTLE_MANY_BECAUSE} />
        </div>
        <div className="flex justify-center">
          <En className="rounded-lg bg-violet-600 px-2.5 py-1 text-sm font-black text-white">{BATTLE_MUCH_WHY}</En>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 33. أمثلة متقدمة قليلًا
// ============================================================
function AdvancedExamples() {
  return (
    <LabPanel emoji="⭐" label="ADVANCED EXAMPLES" ar="سؤال ثم جواب" seq="l23-advanced">
      <div className="grid gap-2">
        {ADVANCED_PAIRS.map((pair) => (
          <div key={pair.q} className="rounded-2xl border-2 border-white bg-white p-3">
            <En className="block text-left text-base font-black text-indigo-900">{pair.q}</En>
            <En className="mt-1 block text-left text-base font-black text-emerald-800">{pair.a}</En>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
        <div className="text-center text-sm font-bold text-amber-900">
          <Rich text="لاحظ:" />
        </div>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={ADVANCED_NOTE_1} />
        </div>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={ADVANCED_NOTE_2} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 34. money
// ============================================================
function MoneyLab() {
  return (
    <LabPanel emoji="💵" label="MONEY LAB" ar="money غير معدود — نعدّ الوحدات فقط" seq="l23-money">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={MONEY_LEAD} />
      </div>
      <En className="mt-1 block text-center text-xl font-black text-violet-900">{MONEY_TYPE}</En>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={MONEY_SO} />
      </div>
      <div className="mt-1.5 grid gap-1.5">
        {MONEY_GOOD.map((line) => (
          <En
            key={line}
            className={`block rounded-xl border-2 px-3 py-2 text-left text-base font-black ${
              line.includes("❌") ? "border-rose-300 bg-rose-50 text-rose-700 line-through" : "border-emerald-300 bg-emerald-50 text-emerald-800"
            }`}
          >
            {line}
          </En>
        ))}
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-700">
        <Rich text={MONEY_NO_COUNT} />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={MONEY_BUT_UNITS} />
        </div>
        <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
          {MONEY_UNITS.map((line) => (
            <En key={line} className="rounded-lg bg-sky-50 px-2.5 py-1 text-sm font-black text-sky-900">
              {line}
            </En>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 35. information — محوّل الوحدات
// ============================================================
function InformationLab() {
  return (
    <LabPanel emoji="📋" label="INFORMATION UNIT CONVERTER" ar="information → piece / pieces of information" seq="l23-information">
      <En className="block text-center text-xl font-black text-violet-900">{INFO_TYPE}</En>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={INFO_SO} />
      </div>
      <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
        <div dir="ltr" className="ltr-row grid gap-1.5">
          {INFO_GOOD.map((line) => (
            <En key={line} className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">
              {line}
            </En>
          ))}
        </div>
        <div dir="ltr" className="ltr-row grid gap-1.5">
          {INFO_BAD.map((line) => (
            <En key={line} className="rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-2 text-left text-base font-black text-rose-700 line-through">
              {line}
            </En>
          ))}
        </div>
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={INFO_BUT} />
        </div>
        <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
          {INFO_PIECES.map((line) => (
            <En key={line} className="rounded-xl border-2 border-sky-300 bg-sky-50 px-3 py-2 text-base font-black text-sky-900">
              {line}
            </En>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm font-bold text-slate-700">
          <Rich text={INFO_COUNT} />
          <En className="rounded-lg bg-sky-600 px-2.5 py-1 text-sm font-black text-white">{INFO_COUNT_WORD}</En>
          <Rich text={INFO_NOT_ITSELF} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 36. advice
// ============================================================
function AdviceLab() {
  return (
    <LabPanel emoji="💬" label="ADVICE LAB" ar="advice غير معدود — piece of advice" seq="l23-advice">
      <En className="block text-center text-xl font-black text-violet-900">{ADVICE_TYPE}</En>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={ADVICE_WE_SAY} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
        {ADVICE_GOOD.map((line) => (
          <En key={line} className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
            {line}
          </En>
        ))}
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={ADVICE_WE_DONT} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
        {ADVICE_BAD.map((line) => (
          <En key={line} className="rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-2 text-base font-black text-rose-700 line-through">
            {line}
          </En>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 37. furniture
// ============================================================
function FurnitureLab() {
  return (
    <LabPanel emoji="🪑" label="FURNITURE LAB" ar="furniture غير معدود — piece of furniture" seq="l23-furniture">
      <En className="block text-center text-xl font-black text-violet-900">{FURNITURE_TYPE}</En>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={FURNITURE_WE_SAY} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
        {FURNITURE_GOOD.map((line) => (
          <En key={line} className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
            {line}
          </En>
        ))}
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={FURNITURE_WE_DONT} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
        {FURNITURE_BAD.map((line) => (
          <En key={line} className="rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-2 text-base font-black text-rose-700 line-through">
            {line}
          </En>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 38. homework
// ============================================================
function HomeworkLab() {
  return (
    <LabPanel emoji="📝" label="HOMEWORK LAB" ar="homework غير معدود — لكن assignment معدود" seq="l23-homework">
      <En className="block text-center text-xl font-black text-violet-900">{HOMEWORK_TYPE}</En>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={HOMEWORK_WE_SAY} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
        {HOMEWORK_GOOD.map((line) => (
          <En key={line} className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
            {line}
          </En>
        ))}
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={HOMEWORK_WE_DONT} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
        {HOMEWORK_BAD.map((line) => (
          <En key={line} className="rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-2 text-base font-black text-rose-700 line-through">
            {line}
          </En>
        ))}
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={HOMEWORK_BUT} />
        </div>
        <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
          {HOMEWORK_ASSIGNMENTS.map((line) => (
            <En key={line} className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
              {line}
            </En>
          ))}
        </div>
        <div className="mt-1.5 text-center text-sm font-bold text-slate-600">
          <Rich text={HOMEWORK_IF} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 39. وجهًا لوجه
// ============================================================
function FaceToFace() {
  return (
    <LabPanel emoji="🧠" label="FACE TO FACE" ar="المعدود مقابل غير المعدود" seq="l23-face-to-face">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={FACE_TO_FACE_LEAD} />
      </div>
      <div className="mt-2 grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-white p-4">
          <div className="text-center">
            <TypeBadge type="Countable" />
          </div>
          <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
            {FACE_TO_FACE_COUNTABLE.map((word) => (
              <En key={word} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-800">
                {word}
              </En>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-violet-200 bg-white p-4">
          <div className="text-center">
            <TypeBadge type="Uncountable" />
          </div>
          <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
            {FACE_TO_FACE_UNCOUNTABLE.map((word) => (
              <En key={word} className="rounded-lg bg-violet-50 px-2.5 py-1 text-sm font-black text-violet-800">
                {word}
              </En>
            ))}
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 40. الاختبار الثلاثي
// ============================================================
const THREE_TEST_WORDS = [
  {
    word: "book",
    emoji: "📖",
    one: "one book ✅",
    two: "two books ✅",
    plural: "books ✅",
    result: "Countable" as const,
  },
  {
    word: "water",
    emoji: "💧",
    one: "one water ❌",
    two: "two waters ❌",
    plural: "waters ❌",
    result: "Uncountable" as const,
  },
  {
    word: "chair",
    emoji: "🪑",
    one: "one chair ✅",
    two: "two chairs ✅",
    plural: "chairs ✅",
    result: "Countable" as const,
  },
  {
    word: "money",
    emoji: "💵",
    one: "one money ❌",
    two: "two moneys ❌",
    plural: "moneys ❌",
    result: "Uncountable" as const,
  },
];

function ThreeQuestionTest() {
  const [active, setActive] = useState(0);
  const word = THREE_TEST_WORDS[active];
  return (
    <LabPanel emoji="⭐" label="THREE-QUESTION TEST" ar="one؟ two؟ جمع طبيعي؟" seq="l23-three-test">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={THREE_TEST_LEAD} />
      </div>
      <div className="mt-1 grid gap-1.5 sm:grid-cols-3">
        {THREE_TEST_QUESTIONS.map((question) => (
          <div key={question} className="rounded-2xl border-2 border-white bg-white p-2.5 text-center text-sm font-bold text-slate-700">
            <Rich text={question} />
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {THREE_TEST_WORDS.map((item, i) => (
          <button
            key={item.word}
            type="button"
            onClick={() => setActive(i)}
            dir="ltr"
            className={`ltr-row rounded-xl border-2 p-2 text-center transition ${
              active === i ? "border-indigo-500 bg-white shadow" : "border-slate-200 bg-white/70 hover:border-indigo-300"
            }`}
          >
            <span className="block text-2xl">{item.emoji}</span>
            <En className="mt-1 block text-sm font-black text-slate-900">{item.word}</En>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div dir="ltr" className="ltr-row flex flex-wrap items-center justify-center gap-2">
          <En className={`rounded-lg border-2 px-2.5 py-1 text-sm font-black ${word.one.includes("✅") ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-rose-300 bg-rose-50 text-rose-700"}`}>
            {word.one}
          </En>
          <En className={`rounded-lg border-2 px-2.5 py-1 text-sm font-black ${word.two.includes("✅") ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-rose-300 bg-rose-50 text-rose-700"}`}>
            {word.two}
          </En>
          <En className={`rounded-lg border-2 px-2.5 py-1 text-sm font-black ${word.plural.includes("✅") ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-rose-300 bg-rose-50 text-rose-700"}`}>
            {word.plural}
          </En>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <En className="text-lg font-black text-slate-900">{THREE_TEST_ARROW}</En>
          <TypeBadge type={word.result} />
        </div>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {THREE_TEST_EXAMPLES.map((row) => (
          <div key={row.word} className="rounded-2xl border-2 border-white bg-white p-3">
            <En className="block text-center text-lg font-black text-slate-900">{row.word}</En>
            <div dir="ltr" className="ltr-row mt-1 grid gap-1">
              <En className="rounded-lg bg-slate-50 px-2.5 py-1 text-left text-sm font-black text-slate-700">{row.one}</En>
              <En className="rounded-lg bg-slate-50 px-2.5 py-1 text-left text-sm font-black text-slate-700">{row.two}</En>
            </div>
            <div className="mt-1 flex items-center justify-center gap-2">
              <En className="text-sm font-black text-slate-500">{THREE_TEST_ARROW}</En>
              <TypeBadge type={row.result} />
            </div>
            {row.extra && (
              <div className="mt-1 text-center text-xs font-bold text-slate-500">
                <Rich text={row.extra} />
              </div>
            )}
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 41. الفخ
// ============================================================
function TrapNote() {
  return (
    <LabPanel emoji="🪤" label="THE TRAP" ar="لا تعتمد على «هل أستطيع تقسيمه؟»" seq="l23-trap">
      <div className="text-center text-lg font-black text-rose-800">
        <Rich text={TRAP_LEAD} />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center text-base font-semibold leading-relaxed text-slate-700">
        <Rich text={TRAP_EXAMPLE} />
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        <En className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
          {TRAP_GOOD}
        </En>
        <span className="text-sm font-bold text-slate-600">{TRAP_NOT}</span>
        <En className="rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-2 text-base font-black text-rose-700 line-through">
          {TRAP_BAD}
        </En>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3 text-center">
        <div className="text-sm font-bold text-indigo-900">
          <Rich text={TRAP_SO} />
        </div>
        <div className="mt-1 text-base font-black text-indigo-900">
          <Rich text={`«${TRAP_IDEA}»`} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 42. أخطاء شائعة جدًا
// ============================================================
function CommonErrors() {
  return (
    <LabPanel emoji="🚨" label="COMMON ERRORS" ar="ستة أخطاء من المصدر مع التصحيح" seq="l23-common-errors">
      <div className="grid gap-2">
        {COMMON_ERRORS.map((row) => (
          <div key={row.n} className="rounded-2xl border-2 border-white bg-white p-3">
            <div className="text-sm font-black text-rose-700">
              <Rich text={row.n} />
            </div>
            <En className="mt-1 block text-left text-base font-black text-rose-700 line-through decoration-rose-300">{row.wrong}</En>
            <div className="mt-1.5 text-sm font-bold text-slate-600">
              <Rich text={row.correctLabel} />
            </div>
            <En className="mt-0.5 block text-left text-base font-black text-emerald-800">{row.correct}</En>
            {row.alt && (
              <>
                <div className="mt-1 text-sm font-bold text-slate-600">
                  <Rich text={row.altLabel ?? ""} />
                </div>
                <En className="mt-0.5 block text-left text-base font-black text-emerald-800">{row.alt}</En>
              </>
            )}
            {row.why && (
              <div className="mt-1 text-sm font-bold text-slate-700">
                <Rich text={row.why} />
              </div>
            )}
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 43. IQ200 — many / much
// ============================================================
function ManyMuchIQ() {
  return (
    <LabPanel emoji="🧠" label="IQ200 — MANY vs MUCH" ar="لا تحفظ القاعدة سطحيًا — افهم العلاقة" seq="l23-many-much">
      <div className="text-center text-lg font-black text-fuchsia-900">
        <Rich text={IQ200_MM_TITLE} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-700">
        <Rich text={IQ200_MM_SURFACE} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-700">
        <Rich text={IQ200_MM_UNDERSTAND} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3">
          <En className="block text-center text-base font-black text-emerald-800">{IQ200_MM_MANY}</En>
          <div className="mt-1 text-center text-sm font-bold text-slate-600">
            <Rich text={IQ200_MM_SO} />
          </div>
          <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1.5">
            {IQ200_MM_MANY_ITEMS.map((line) => (
              <En key={line} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-800">
                {line}
              </En>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-violet-200 bg-white p-3">
          <En className="block text-center text-base font-black text-violet-800">{IQ200_MM_MUCH}</En>
          <div className="mt-1 text-center text-sm font-bold text-slate-600">
            <Rich text={IQ200_MM_BUT} />
          </div>
          <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1.5">
            {IQ200_MM_MUCH_ITEMS.map((line) => (
              <En key={line} className="rounded-lg bg-violet-50 px-2.5 py-1 text-sm font-black text-violet-800">
                {line}
              </En>
            ))}
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// تمارين المصدر — اختيار محايد ← «تحقق من الإجابات» ← تغذية راجعة
// (نفس نموذج FinalQuiz المشترك: لا كشف قبل الضغط على زر التحقق)
// ============================================================
type DrillItem = { n: number | string; stem: string; answer: number; why: string };

function Drill({
  seq,
  intro,
  options,
  items,
  accent,
  remember,
  rules,
}: {
  seq: string;
  intro: string;
  options: readonly string[];
  items: DrillItem[];
  accent: "indigo" | "sky" | "emerald" | "violet";
  remember?: string;
  rules?: readonly string[];
}) {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const accents: Record<string, string> = {
    indigo: "bg-indigo-700",
    sky: "bg-sky-700",
    emerald: "bg-emerald-700",
    violet: "bg-violet-700",
  };
  const answered = items.reduce((n, _item, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === items.length;
  const score = items.reduce((sum, item, i) => sum + (pick[i] === item.answer ? 1 : 0), 0);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq={seq}>
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
        <div className="text-base font-bold text-slate-700">
          <Rich text={intro} />
        </div>
        {remember && (
          <div className="mt-1 text-sm font-bold text-indigo-900">
            <Rich text={remember} />
          </div>
        )}
        {rules && (
          <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
            {rules.map((rule) => (
              <En key={rule} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-indigo-900">
                {rule}
              </En>
            ))}
          </div>
        )}
      </div>
      {items.map((item, i) => {
        const choice = pick[i];
        const picked = choice !== undefined;
        const right = picked && choice === item.answer;
        let card = "border-slate-200 bg-white";
        if (checked) {
          card = !picked
            ? "border-slate-200 bg-white"
            : right
              ? "border-emerald-300 bg-emerald-50/50"
              : "border-rose-300 bg-rose-50/50";
        } else if (picked) {
          card = "border-slate-300 bg-slate-50/70";
        }
        return (
          <div key={String(item.n)} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-start gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${accents[accent]}`}>
                {item.n}
              </span>
              <En className="min-w-0 flex-1 text-left text-base font-extrabold text-slate-900 md:text-lg">{item.stem}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {options.map((option, oi) => {
                const isA = oi === item.answer;
                const isPick = choice === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                if (checked) {
                  if (isA) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    dir="ltr"
                    className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition active:scale-[0.98] disabled:cursor-default ${cls}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div
                className={`mt-2 pr-11 text-sm font-bold ${
                  !picked ? "text-slate-500" : right ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {!picked ? "⚠ لم تختر إجابة لهذا السؤال. " : right ? "✓ صحيح! " : "✕ "}
                <Rich text={item.why} />
              </div>
            )}
          </div>
        );
      })}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!allAnswered}
                title={allAnswered ? undefined : "أجب عن كل الفقرات أولًا"}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow transition enabled:hover:brightness-110 disabled:opacity-30 ${accents[accent]}`}
              >
                تحقق من الإجابات ({answered}/{items.length})
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className={`grid h-12 w-12 place-items-center rounded-2xl text-lg font-extrabold text-white ${accents[accent]}`}>
                {Math.round((score / items.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">
                نتيجتك: {score} / {items.length}
              </div>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ أعد التدريب
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Training1Ex() {
  return (
    <Drill
      seq="l23-training1"
      intro={TRAINING1_23_INTRO}
      options={TRAINING1_23_OPTIONS}
      items={TRAINING1_23}
      accent="indigo"
    />
  );
}

function Training2Ex() {
  return (
    <Drill
      seq="l23-training2"
      intro={TRAINING2_23_INTRO}
      options={TRAINING2_23_OPTIONS}
      items={TRAINING2_23}
      accent="sky"
      remember={TRAINING2_23_REMEMBER}
      rules={TRAINING2_23_RULES}
    />
  );
}

function Training3Ex() {
  return <Drill seq="l23-training3" intro="أكمل بـ There is أو There are:" options={TRAINING3_23_OPTIONS} items={TRAINING3_23} accent="emerald" />;
}

function Training4Ex() {
  return <Drill seq="l23-training4" intro="أكمل بـ How many أو How much:" options={TRAINING4_23_OPTIONS} items={TRAINING4_23} accent="violet" />;
}

// ============================================================
// Grammar Detective — 10 جمل من المصدر
// ============================================================
function DetectiveEx() {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const answered = DETECTIVE_23.reduce((n, _item, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === DETECTIVE_23.length;
  const score = DETECTIVE_23.reduce((sum, item, i) => sum + (pick[i] === item.answer ? 1 : 0), 0);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l23-detective">
      <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-4 text-center">
        <div className="text-base font-bold text-rose-900">
          <Rich text={DETECTIVE_23_INTRO} />
        </div>
        <div className="mt-1 text-sm font-bold text-slate-700">
          <Rich text={DETECTIVE_23_ASK} />
        </div>
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={DETECTIVE_23_ASK_Q} />
        </div>
        <div className="mt-1 text-base font-black text-rose-800">
          <Rich text={`«${DETECTIVE_23_ASK_KEY}»`} />
        </div>
        <div className="mt-1 text-sm font-bold text-slate-700">
          <Rich text={DETECTIVE_23_THEN} />
        </div>
      </div>
      {DETECTIVE_23.map((item, i) => {
        const choice = pick[i];
        const picked = choice !== undefined;
        const right = picked && choice === item.answer;
        let card = "border-slate-200 bg-white";
        if (checked) {
          card = !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
        } else if (picked) {
          card = "border-slate-300 bg-slate-50/70";
        }
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-600 text-sm font-bold text-white">{item.n}</span>
              <div className="min-w-0 flex-1">
                <En className="block text-left text-base font-extrabold text-slate-900 md:text-lg">{item.sentence}</En>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <En className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-black text-slate-700">{item.noun}</En>
                  <TypeBadge type={item.type} />
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 pr-11">
              {DETECTIVE_23_OPTIONS.map((option, oi) => {
                const isA = oi === item.answer;
                const isPick = choice === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-rose-400";
                if (checked) {
                  if (isA) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    className={`rounded-xl border-2 px-4 py-2 text-base font-black transition active:scale-[0.98] disabled:cursor-default ${cls}`}
                  >
                    <Rich text={option} />
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className="mt-2 space-y-1 pr-11">
                <div className={`text-sm font-bold ${!picked ? "text-slate-500" : right ? "text-emerald-700" : "text-rose-700"}`}>
                  {!picked ? "⚠ لم تختر إجابة لهذه الجملة." : right ? "✓ صحيح!" : "✕ راجع القاعدة."}
                </div>
                <div className="text-sm font-bold text-slate-700">
                  <Rich text={item.rule} />
                </div>
                {item.fix && (
                  <div dir="ltr" className="ltr-row">
                    <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">
                      {item.fix} ✅
                    </En>
                  </div>
                )}
                {item.fixAlt && (
                  <div dir="ltr" className="ltr-row">
                    <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">
                      {item.fixAlt} ✅
                    </En>
                  </div>
                )}
                {!item.fix && (
                  <div dir="ltr" className="ltr-row">
                    <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">
                      {item.sentence} ✅
                    </En>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!allAnswered}
                title={allAnswered ? undefined : "افحص كل الجمل أولًا"}
                className="rounded-xl bg-rose-700 px-4 py-2.5 text-sm font-bold text-white shadow transition enabled:hover:brightness-110 disabled:opacity-30"
              >
                تحقق من الإجابات ({answered}/{DETECTIVE_23.length})
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="grid h-12 w-12 place-items-center rounded-2xl text-lg font-extrabold text-white bg-rose-700">
                {Math.round((score / DETECTIVE_23.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">
                نتيجتك: {score} / {DETECTIVE_23.length}
              </div>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ أعد التحقيق
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// IQ200 Challenge — 8 جمل، واحدة صحيحة
// ============================================================
function IQ200Ex() {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const answered = IQ200_23.reduce((n, _item, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === IQ200_23.length;
  const score = IQ200_23.reduce((sum, item, i) => sum + (pick[i] === item.answer ? 1 : 0), 0);
  const foundCorrect = checked && IQ200_23.some((item, i) => item.answer === 1 && pick[i] === 1);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l23-iq200">
      <div className="rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-4 text-center">
        <div className="text-base font-bold leading-relaxed text-fuchsia-900">
          <Rich text={IQ200_23_TASK} />
        </div>
        <div className="mt-2 rounded-xl bg-white p-2.5 text-sm font-black text-fuchsia-800">
          <Rich text={IQ200_23_HINT} />
        </div>
        <div className="mt-1 text-sm font-bold text-fuchsia-800">
          <Rich text={IQ200_23_HINT_Q} />
        </div>
      </div>
      {IQ200_23.map((item, i) => {
        const choice = pick[i];
        const picked = choice !== undefined;
        const right = picked && choice === item.answer;
        let card = "border-slate-200 bg-white";
        if (checked) {
          card = !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
        } else if (picked) {
          card = "border-slate-300 bg-slate-50/70";
        }
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-fuchsia-600 text-sm font-bold text-white">{item.n}</span>
              <En className="min-w-0 flex-1 text-left text-base font-extrabold text-slate-900 md:text-lg">{item.sentence}</En>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 pr-11">
              {IQ200_23_OPTIONS.map((option, oi) => {
                const isA = oi === item.answer;
                const isPick = choice === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-fuchsia-400";
                if (checked) {
                  if (isA) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    className={`rounded-xl border-2 px-4 py-2 text-base font-black transition active:scale-[0.98] disabled:cursor-default ${cls}`}
                  >
                    <Rich text={option} />
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className="mt-2 space-y-1 pr-11">
                <div className={`text-sm font-bold ${!picked ? "text-slate-500" : right ? "text-emerald-700" : "text-rose-700"}`}>
                  {!picked ? "⚠ لم تختر إجابة." : right ? "✓ صحيح!" : "✕ راجع السبب."}
                </div>
                <div className="text-sm font-bold text-slate-700">
                  <Rich text={item.why} />
                </div>
                {item.fix && (
                  <div dir="ltr" className="ltr-row">
                    <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">
                      {item.fix} ✅
                    </En>
                  </div>
                )}
                {item.fixAlt && (
                  <div dir="ltr" className="ltr-row">
                    <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">
                      {item.fixAlt} ✅
                    </En>
                  </div>
                )}
                {!item.fix && (
                  <div dir="ltr" className="ltr-row">
                    <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">
                      {item.sentence} ✅
                    </En>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!allAnswered}
                title={allAnswered ? undefined : "افحص كل الجمل أولًا"}
                className="rounded-xl bg-fuchsia-700 px-4 py-2.5 text-sm font-bold text-white shadow transition enabled:hover:brightness-110 disabled:opacity-30"
              >
                تحقق من الإجابات ({answered}/{IQ200_23.length})
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="grid h-12 w-12 place-items-center rounded-2xl text-lg font-extrabold text-white bg-fuchsia-700">
                {Math.round((score / IQ200_23.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">
                نتيجتك: {score} / {IQ200_23.length}
                {foundCorrect && <div className="text-emerald-700">🎯 اكتشفت الجملة الصحيحة بين الجمل!</div>}
              </div>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ أعد التحدي
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// تحدي التفكير — 6 كميات من المصدر
// ============================================================
function ThinkingEx() {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("");
  const answered = THINKING_23.reduce((n, _item, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === THINKING_23.length;
  const score = THINKING_23.reduce((sum, item, i) => sum + (pick[i] === item.answer ? 1 : 0), 0);
  const sentenceCount = (text.match(/[.?!]+/g) || []).length;
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l23-thinking">
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
        <div className="text-base font-bold text-slate-700">
          <Rich text={THINKING_23_INTRO} />
        </div>
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          {THINKING_23.map((item) => (
            <En key={item.item} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-indigo-900">
              {item.emoji} {item.item}
            </En>
          ))}
        </div>
        <div className="mt-2 text-base font-bold text-slate-800">
          <Rich text={THINKING_23_TASK} />
        </div>
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={THINKING_23_EXAMPLE_LABEL} />
        </div>
        <En className="mt-1 block rounded-xl bg-white px-3 py-2 text-center text-base font-black text-emerald-800">
          {THINKING_23_EXAMPLE}
        </En>
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={THINKING_23_THEN} />
        </div>
      </div>
      {THINKING_23.map((item, i) => {
        const choice = pick[i];
        const picked = choice !== undefined;
        const right = picked && choice === item.answer;
        let card = "border-slate-200 bg-white";
        if (checked) {
          card = !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
        } else if (picked) {
          card = "border-slate-300 bg-slate-50/70";
        }
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">{item.n}</span>
              <div className="min-w-0 flex-1">
                <En className="block text-left text-lg font-extrabold text-slate-900">
                  {item.emoji} {item.item}
                </En>
              </div>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {THINKING_23_OPTIONS.map((option, oi) => {
                const isA = oi === item.answer;
                const isPick = choice === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                if (checked) {
                  if (isA) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    dir="ltr"
                    className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition active:scale-[0.98] disabled:cursor-default ${cls}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className="mt-2 space-y-1 pr-11">
                <div className={`text-sm font-bold ${!picked ? "text-slate-500" : right ? "text-emerald-700" : "text-rose-700"}`}>
                  {!picked ? "⚠ لم تختر إجابة." : right ? "✓ صحيح!" : "✕ راجع نوع الاسم."}
                </div>
                <div className="text-sm font-bold text-slate-700">
                  <Rich text={item.why} />
                </div>
                <div className="text-xs font-bold text-slate-500">
                  <Rich text="نموذج مبني على نماذج المصدر:" />
                </div>
                <div dir="ltr" className="ltr-row">
                  <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">
                    {item.model}
                  </En>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text="اكتب جملك الست هنا:" />
        </div>
        <textarea
          dir="ltr"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={6}
          placeholder="There are five apples on the table..."
          className="font-en mt-2 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-left text-base font-bold text-slate-800 outline-none focus:border-indigo-400"
        />
        <div className="mt-2 rounded-xl bg-slate-50 p-2.5 text-center text-sm font-bold text-slate-600">
          عدد الجمل: {sentenceCount} / {THINKING_23.length}
        </div>
      </div>
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!allAnswered}
                title={allAnswered ? undefined : "اختر لكل عنصر أولًا"}
                className="rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white shadow transition enabled:hover:brightness-110 disabled:opacity-30"
              >
                تحقق من الإجابات ({answered}/{THINKING_23.length})
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="grid h-12 w-12 place-items-center rounded-2xl text-lg font-extrabold text-white bg-indigo-700">
                {Math.round((score / THINKING_23.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">
                نتيجتك: {score} / {THINKING_23.length}
              </div>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ أعد التحدي
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FINAL BOSS — الغرفة الغامضة
// ============================================================
function FinalBossEx() {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [req, setReq] = useState<Set<number>>(new Set());
  const [slots, setSlots] = useState<{ type: "many" | "much" | null; noun: string | null }[]>([
    { type: null, noun: null },
    { type: null, noun: null },
    { type: null, noun: null },
    { type: null, noun: null },
  ]);
  const [text, setText] = useState("");
  const answered = FINAL_BOSS_23_ITEMS.reduce((n, _item, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === FINAL_BOSS_23_ITEMS.length;
  const score = FINAL_BOSS_23_ITEMS.reduce((sum, item, i) => sum + (pick[i] === item.answer ? 1 : 0), 0);
  const sentenceCount = (text.match(/[.?!]+/g) || []).length;
  const manyCount = slots.filter((slot) => slot.type === "many" && slot.noun).length;
  const muchCount = slots.filter((slot) => slot.type === "much" && slot.noun).length;
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  const questionFor = (slot: { type: "many" | "much" | null; noun: string | null }) =>
    FINAL_BOSS_23_QUESTION_BANK.find((entry) => entry.type === slot.type && entry.noun === slot.noun)?.question;
  return (
    <div className="space-y-4" data-en-seq="l23-final-boss">
      <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="text-center text-lg font-black text-amber-900">
          <Rich text={FINAL_BOSS_23_TITLE} />
        </div>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={FINAL_BOSS_23_IN_ROOM} />
        </div>
        <div dir="ltr" className="ltr-row mt-2 grid gap-1.5 rounded-2xl bg-white p-3 sm:grid-cols-2">
          {FINAL_BOSS_23_ITEMS.map((item) => (
            <En key={item.item} className="rounded-xl bg-slate-50 px-3 py-2 text-left text-sm font-black text-slate-800">
              {item.emoji} {item.item}
            </En>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4">
        <div className="text-center text-base font-bold text-slate-800">
          <Rich text={FINAL_BOSS_23_TASK} />
        </div>
        <div className="mt-1 text-center text-xs font-bold text-slate-500">
          <Rich text="اختر There is / There are لكل محتوى، ثم اضغط «تحقق» لترى الجملة النموذجية." />
        </div>
        <div className="mt-3 space-y-2">
          {FINAL_BOSS_23_ITEMS.map((item, i) => {
            const choice = pick[i];
            const picked = choice !== undefined;
            const right = picked && choice === item.answer;
            let card = "border-slate-200 bg-white";
            if (checked) {
              card = !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
            } else if (picked) {
              card = "border-slate-300 bg-slate-50/70";
            }
            return (
              <div key={item.n} className={`rounded-2xl border-2 p-3 transition ${card}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{item.n}</span>
                  <En className="text-left text-base font-extrabold text-slate-900">
                    {item.emoji} {item.item}
                  </En>
                  <TypeBadge type={item.type} />
                </div>
                <div dir="ltr" className="ltr-row mt-2 flex flex-wrap gap-2 pr-11">
                  {FINAL_BOSS_23_OPTIONS.map((option, oi) => {
                    const isA = oi === item.answer;
                    const isPick = choice === oi;
                    let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                    if (checked) {
                      if (isA) cls = "border-transparent bg-emerald-600 text-white";
                      else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                      else cls = "border-slate-200 bg-white text-slate-300";
                    } else if (isPick) {
                      cls = "border-transparent bg-slate-900 text-white";
                    }
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                        disabled={checked}
                        aria-pressed={isPick}
                        dir="ltr"
                        className={`font-en rounded-xl border-2 px-4 py-2 text-sm font-black transition active:scale-[0.98] disabled:cursor-default ${cls}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {checked && item.model && (
                  <div dir="ltr" className="ltr-row mt-2 pr-11">
                    <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">
                      {item.model}
                    </En>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!allAnswered}
                title={allAnswered ? undefined : "اختر لكل محتوى أولًا"}
                className="rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-bold text-white shadow transition enabled:hover:brightness-110 disabled:opacity-30"
              >
                تحقق من الإجابات ({answered}/{FINAL_BOSS_23_ITEMS.length})
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
                نتيجتك: {score} / {FINAL_BOSS_23_ITEMS.length}
              </div>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ أعد الغرفة
              </button>
            </>
          )}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={FINAL_BOSS_23_MUST} />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {FINAL_BOSS_23_REQUIREMENTS.map((requirement, i) => {
            const on = req.has(i);
            return (
              <button
                key={requirement}
                type="button"
                onClick={() =>
                  setReq((s) => {
                    const next = new Set(s);
                    if (next.has(i)) next.delete(i);
                    else next.add(i);
                    return next;
                  })
                }
                className={`flex items-center gap-2 rounded-2xl border-2 p-2.5 text-right transition ${
                  on ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"
                }`}
              >
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-black ${on ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {on ? "✓" : ""}
                </span>
                <En className="text-sm font-black text-slate-800">{requirement}</En>
              </button>
            );
          })}
        </div>
        <div className="mt-2 rounded-xl bg-slate-50 p-2.5 text-center text-sm font-bold text-slate-600">
          متطلبات محددة: {req.size} / {FINAL_BOSS_23_REQUIREMENTS.length}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-sky-200 bg-white p-4">
        <div className="text-center text-base font-bold text-slate-800">
          <Rich text={FINAL_BOSS_23_THEN} />
        </div>
        <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
          {FINAL_BOSS_23_QUESTION_TYPES.map((questionType) => (
            <En key={questionType} className="rounded-xl bg-sky-700 px-3 py-1.5 text-sm font-black text-white">
              {questionType}
            </En>
          ))}
        </div>
        <div className="mt-2 space-y-2">
          {slots.map((slot, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-sky-700 text-xs font-bold text-white">{i + 1}</span>
                <div dir="ltr" className="ltr-row flex flex-wrap gap-1.5">
                  {(["many", "much"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSlots((s) => s.map((entry, index) => (index === i ? { type, noun: null } : entry)))}
                      dir="ltr"
                      className={`font-en rounded-lg border-2 px-3 py-1 text-sm font-black transition ${
                        slot.type === type ? "border-transparent bg-sky-700 text-white" : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      {type === "many" ? "How many?" : "How much?"}
                    </button>
                  ))}
                </div>
              </div>
              {slot.type && (
                <div dir="ltr" className="ltr-row mt-2 flex flex-wrap gap-1.5 pr-9">
                  {FINAL_BOSS_23_QUESTION_BANK.filter((entry) => entry.type === slot.type).map((entry) => (
                    <button
                      key={entry.noun}
                      type="button"
                      onClick={() => setSlots((s) => s.map((item, index) => (index === i ? { type: slot.type, noun: entry.noun } : item)))}
                      dir="ltr"
                      className={`font-en rounded-lg border-2 px-3 py-1 text-sm font-black transition ${
                        slot.noun === entry.noun ? "border-transparent bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      {entry.noun}
                    </button>
                  ))}
                </div>
              )}
              {questionFor(slot) && (
                <div dir="ltr" className="ltr-row mt-2 pr-9">
                  <En className="block rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-2 text-left text-base font-black text-sky-900">
                    {questionFor(slot)}
                  </En>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-xl bg-slate-50 p-2.5 text-center text-sm font-bold text-slate-600">
          How many? : {manyCount} / {FINAL_BOSS_23_QUOTA.many} · How much? : {muchCount} / {FINAL_BOSS_23_QUOTA.much}
        </div>
        <div className="mt-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
          <div className="text-center text-sm font-bold text-slate-600">
            <Rich text={FINAL_BOSS_23_EXAMPLE_LABEL} />
          </div>
          <div className="mt-1 grid gap-1">
            {FINAL_BOSS_23_EXAMPLES.map((pair) => (
              <div key={pair.q} dir="ltr" className="ltr-row grid gap-1">
                <En className="rounded-lg bg-emerald-50 px-2.5 py-1 text-left text-sm font-black text-emerald-800">{pair.q}</En>
                <En className="rounded-lg bg-sky-50 px-2.5 py-1 text-left text-sm font-black text-sky-900">{pair.a}</En>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text="اكتب وصف الغرفة كاملًا هنا:" />
        </div>
        <textarea
          dir="ltr"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={9}
          placeholder="There are four books in the room..."
          className="font-en mt-2 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-left text-base font-bold text-slate-800 outline-none focus:border-indigo-400"
        />
        <div className="mt-2 rounded-xl bg-slate-50 p-2.5 text-center text-sm font-bold text-slate-600">
          عدد الجمل: {sentenceCount} / {FINAL_BOSS_23_SENTENCE_TARGET}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COVER
// ============================================================
function Cover() {
  return (
    <div className="rounded-[2rem] border-2 border-indigo-300/40 bg-gradient-to-br from-indigo-900 via-violet-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
      <div className="flex flex-wrap items-center gap-4">
        <div className="anim-float grid h-24 w-24 place-items-center rounded-3xl bg-white/15 text-5xl ring-4 ring-white/25">🧮</div>
        <div>
          <div dir="ltr" className="inline-flex items-center rounded-full border-2 border-white/30 bg-white/10 px-4 py-1.5">
            <En className="text-[11px] font-black uppercase tracking-[0.22em] text-indigo-200">{LAB_NAME_23}</En>
          </div>
          <h1 className="font-head mt-3 text-3xl font-bold md:text-4xl">
            <Rich text={LESSON_TITLE_23} />
          </h1>
          <En className="mt-1 block text-xl font-bold text-indigo-200">{LESSON_SUBTITLE_23}</En>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-lg font-bold text-indigo-50">
        <Rich text={LESSON_ARABIC_TITLE_23} />
      </div>
      <div className="mt-4 rounded-2xl bg-white/10 p-5 text-lg leading-relaxed text-indigo-50">
        <Rich text="سنصنّف الأسماء في مختبر العدّ: Countable مقابل Uncountable — ثم نبني عليها a / an، some / any، There is / There are، How many? / How much?، many / much، والوحدات مثل a bottle of water و a piece of information، ونتجنب الأخطاء الشائعة." />
      </div>
      <div dir="ltr" className="ltr-row mt-4 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/10 p-4">
        {["a book", "an apple", "two books", "some water", "How many books?", "How much water?", "There is some water.", "There are some books."].map((line) => (
          <En key={line} className="rounded-xl bg-white/20 px-3 py-2 text-sm font-black">
            {line}
          </En>
        ))}
      </div>
      <div className="mt-5 rounded-xl bg-white/10 p-3 text-center text-sm font-bold text-indigo-100">
        <Rich text={LAB_MOTTO_23} />
      </div>
    </div>
  );
}

function Objectives() {
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[1]} title="أهداف الدرس" lead="بنهاية الدرس يجب أن تعرف:">
      <div className="grid gap-2">
        {OBJECTIVES_23.map((objective) => (
          <div key={objective.n} className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/60 p-3">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">
                {objective.n}
              </span>
              <Rich text={objective.text} className="font-semibold text-slate-800" />
            </div>
            {objective.items.length > 0 && (
              <div dir="ltr" className="ltr-row mt-2 flex flex-wrap gap-2 pr-11">
                {objective.items.map((item) => (
                  <span key={item} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-indigo-900">
                    <En>{item}</En>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// الخلاصة الذهبية
// ============================================================
function GoldenSummary() {
  return (
    <Frame mascot="🏆" sourceHeading={SOURCE_SECTIONS[53]} title="الخلاصة الذهبية">
      <div data-en-seq="l23-golden" className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/50 p-4">
          <En className="block text-center text-2xl font-black text-emerald-800">{GOLDEN_23_COUNTABLE_TITLE}</En>
          <div className="mt-1 text-center text-base font-bold text-slate-700">
            <Rich text={GOLDEN_23_COUNTABLE_DEF} />
          </div>
          <div className="mt-2 text-center text-sm font-bold text-slate-600">
            <Rich text={GOLDEN_23_COUNTABLE_EXAMPLE_LABEL} />
          </div>
          <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1.5">
            {GOLDEN_23_COUNTABLE_EXAMPLES.map((line) => (
              <En key={line} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-emerald-800">
                {line}
              </En>
            ))}
          </div>
          <div className="mt-2 text-center text-sm font-bold text-slate-600">
            <Rich text={GOLDEN_23_COUNTABLE_CAN_BE} />
          </div>
          <div className="mt-1 grid gap-1">
            {GOLDEN_23_COUNTABLE_FORMS.map((form) => (
              <div key={form.label} className="flex items-center justify-center gap-2 rounded-xl bg-white p-2">
                <span className="text-sm font-bold text-slate-600">{form.label}</span>
                <En className="text-base font-black text-emerald-800">{form.en}</En>
              </div>
            ))}
          </div>
          <div className="mt-2 text-center text-sm font-bold text-slate-600">
            <Rich text={GOLDEN_23_COUNTABLE_WITH} />
          </div>
          <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1.5">
            {GOLDEN_23_COUNTABLE_TOOLS.map((line) => (
              <En key={line} className="rounded-lg bg-emerald-600 px-2.5 py-1 text-sm font-black text-white">
                {line}
              </En>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-violet-200 bg-violet-50/50 p-4">
          <En className="block text-center text-2xl font-black text-violet-800">{GOLDEN_23_UNCOUNTABLE_TITLE}</En>
          <div className="mt-1 text-center text-base font-bold text-slate-700">
            <Rich text={GOLDEN_23_UNCOUNTABLE_DEF} />
          </div>
          <div className="mt-2 text-center text-sm font-bold text-slate-600">
            <Rich text={GOLDEN_23_UNCOUNTABLE_LIKE} />
          </div>
          <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1.5">
            {GOLDEN_23_UNCOUNTABLE_WORDS.map((line) => (
              <En key={line} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-violet-800">
                {line}
              </En>
            ))}
          </div>
          <div className="mt-2 text-center text-sm font-bold text-slate-600">
            <Rich text={GOLDEN_23_UNCOUNTABLE_NO} />
          </div>
          <div dir="ltr" className="ltr-row mt-1 flex justify-center">
            <En className="rounded-lg border-2 border-rose-300 bg-rose-50 px-3 py-1 text-base font-black text-rose-700 line-through">
              {GOLDEN_23_UNCOUNTABLE_NO_ITEM}
            </En>
          </div>
          <div className="mt-1 text-center text-sm font-bold text-slate-700">
            <Rich text={GOLDEN_23_UNCOUNTABLE_NO_PLURAL} />
          </div>
          <div className="mt-2 text-center text-sm font-bold text-slate-600">
            <Rich text={GOLDEN_23_UNCOUNTABLE_WITH} />
          </div>
          <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1.5">
            {GOLDEN_23_UNCOUNTABLE_TOOLS.map((line) => (
              <En key={line} className="rounded-lg bg-violet-600 px-2.5 py-1 text-sm font-black text-white">
                {line}
              </En>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// الجدول السحري
// ============================================================
function MagicTable() {
  return (
    <Frame mascot="⭐" sourceHeading={SOURCE_SECTIONS[54]} title="الجدول السحري">
      <div dir="ltr" data-en-seq="l23-magic-table" className="ltr-row overflow-x-auto rounded-3xl border-2 border-indigo-200">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              {MAGIC_TABLE_23.map((column) => (
                <th
                  key={column.title}
                  className={`border-2 border-indigo-100 px-3 py-2 text-base font-black ${
                    column.title.startsWith("Countable") ? "bg-emerald-50 text-emerald-800" : "bg-violet-50 text-violet-800"
                  }`}
                >
                  <En>{column.title}</En>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(...MAGIC_TABLE_23.map((column) => column.rows.length)) }).map((_row, rowIndex) => (
              <tr key={rowIndex}>
                {MAGIC_TABLE_23.map((column) => (
                  <td key={column.title} className="border-2 border-indigo-100 bg-white px-3 py-2">
                    {column.rows[rowIndex] ? (
                      <En className="text-base font-black text-slate-800">{column.rows[rowIndex]}</En>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3 text-center text-sm font-bold text-indigo-900">
        <Rich text="نفس العمودين: صنف الاسم أولًا، ثم ستعرف الأداة والسؤال تلقائيًا." />
      </div>
    </Frame>
  );
}

// ============================================================
// أهم 7 قواعد
// ============================================================
function SevenRules() {
  return (
    <Frame mascot="🔥" sourceHeading={SOURCE_SECTIONS[55]} title="أهم 7 قواعد في الدرس">
      <div data-en-seq="l23-seven-rules" className="grid gap-2">
        {SEVEN_RULES_23.map((rule) => (
          <div key={rule.n} className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/60 p-3">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">
                {rule.n}
              </span>
              <Rich text={rule.text} className="font-semibold text-slate-800" />
            </div>
            {rule.items.length > 0 && (
              <div dir="ltr" className="ltr-row mt-2 flex flex-wrap gap-2 pr-11">
                {rule.items.map((item) => (
                  <En key={item} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-indigo-900">
                    {item}
                  </En>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// خريطة المنهج
// ============================================================
function Roadmap() {
  return (
    <Frame mascot="🗺️" sourceHeading={SOURCE_SECTIONS[56]} title="أين وصلنا في المنهج؟">
      <div data-en-seq="l23-roadmap" className="text-center text-base font-bold text-slate-700">
        <Rich text={ROADMAP_23_LEAD} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {ROADMAP_23.map((item) => (
          <div
            key={item.n}
            className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${
              item.here ? "border-indigo-400 bg-indigo-100 shadow" : "border-slate-100 bg-white"
            }`}
          >
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${item.here ? "bg-indigo-700" : "bg-slate-500"}`}>
              {item.n}
            </span>
            <En className={`text-left text-sm font-bold ${item.here ? "text-indigo-950" : "text-slate-700"}`}>{item.en}</En>
            {item.here && (
              <span className="mr-auto text-xs font-black text-indigo-700">
                <Rich text={ROADMAP_23_HERE} />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-5">
        <div className="text-center text-base font-bold text-slate-800">
          <Rich text={ROADMAP_23_NEXT_LEAD} />
        </div>
        <En className="mt-2 block text-center text-xl font-black text-indigo-900">{ROADMAP_23_NEXT_TITLE}</En>
        <div className="mt-1 text-center text-sm font-bold text-slate-600">
          <Rich text="مثل:" />
        </div>
        <div dir="ltr" className="ltr-row mt-1.5 flex justify-center">
          <En className="rounded-xl border-2 border-indigo-200 bg-white px-3 py-2 text-center text-sm font-black text-indigo-900">
            {ROADMAP_23_NEXT_FULL}
          </En>
        </div>
        <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
          {ROADMAP_23_NEXT_ITEMS.map((line) => (
            <En key={line} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-indigo-900">
              {line}
            </En>
          ))}
        </div>
        <div className="mt-3 text-center text-base font-bold leading-relaxed text-slate-800">
          <Rich text={ROADMAP_23_CLOSING} />
        </div>
      </div>
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <div className="rounded-[2rem] border-2 border-indigo-300/40 bg-gradient-to-br from-indigo-900 via-violet-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
      <div className="text-6xl">🏆</div>
      <h2 className="font-head mt-4 text-3xl font-bold md:text-4xl">أحسنت! أنهيت الدرس 23.</h2>
      <div className="mt-4 text-lg leading-relaxed text-indigo-50">
        <Rich text="أصبحت تصنّف أي اسم: Countable أم Uncountable — وتستخدم a / an و some / any، وThere is / There are، وHow many? / How much?، وmany / much، وعدّ الوحدات مثل a bottle of water و a piece of information، مع تجنّب الأخطاء الشائعة." />
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-center">
        <Rich text={ROADMAP_23_CLOSING} className="font-bold text-indigo-50" />
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={onExit} className="rounded-xl bg-white px-5 py-3 font-bold text-indigo-800 transition hover:bg-indigo-50">
          ← جميع الدروس
        </button>
      </div>
    </div>
  );
}

// ============================================================
// عرض البلوكات والتمارين
// ============================================================
function ExerciseView({ exercise }: { exercise: Exercise23 }) {
  switch (exercise.type) {
    case "training1": return <Training1Ex />;
    case "training2": return <Training2Ex />;
    case "training3": return <Training3Ex />;
    case "training4": return <Training4Ex />;
    case "detective": return <DetectiveEx />;
    case "iq200": return <IQ200Ex />;
    case "thinking": return <ThinkingEx />;
    case "finalBoss": return <FinalBossEx />;
  }
}

function BlockView({ block }: { block: Block23 }) {
  switch (block.type) {
    case "text": return <TextBlock text={block.text} className="text-base font-semibold leading-relaxed text-slate-700 md:text-lg" />;
    case "english": return <SourceLine en={block.en} ar={block.ar} tone={block.tone} />;
    case "mixed": return (
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/60 p-3">
        <Rich text={block.text} className="text-base font-bold text-slate-800 md:text-lg" />
      </div>
    );
    case "note": return <Note emoji={block.emoji} text={block.text} />;
    case "formulaStrip": return <FormulaStrip items={block.items} tone={block.tone ?? "indigo"} />;
    case "openingRecall": return <OpeningRecall />;
    case "countingMachine": return <CountingMachine />;
    case "countableExamples": return <CountableExamples />;
    case "magicTest": return <MagicTest />;
    case "twoForms": return <TwoForms />;
    case "rememberBoard": return <RememberBoard />;
    case "uncountableIntro": return <UncountableIntro />;
    case "waterLab": return <WaterLab />;
    case "riceLab": return <RiceLab />;
    case "coreDifference": return <CoreDifference />;
    case "smartCompare": return <SmartCompare />;
    case "aanRule": return <AanRule />;
    case "whyRule": return <WhyRule />;
    case "restaurantException": return <RestaurantException />;
    case "noPluralRule": return <NoPluralRule />;
    case "importantWords": return <ImportantWords />;
    case "chickenContext": return <ChickenContext />;
    case "coffeeContext": return <CoffeeContext />;
    case "basicLevelRule": return <BasicLevelRule />;
    case "thereBridge": return <ThereBridge />;
    case "thereGoldenRule": return <ThereGoldenRule />;
    case "kitchenAnalysis": return <KitchenAnalysis />;
    case "someLab": return <SomeLab />;
    case "someExamples": return <SomeExamples />;
    case "someAttention": return <SomeAttention />;
    case "someTwoTypes": return <SomeTwoTypes />;
    case "anyLab": return <AnyLab />;
    case "someAnyCompare": return <SomeAnyCompare />;
    case "twoQuestionsIntro": return <TwoQuestionsIntro />;
    case "howManyLab": return <HowManyLab />;
    case "howMuchLab": return <HowMuchLab />;
    case "superKey": return <SuperKey />;
    case "bigBattle": return <BigBattle />;
    case "advancedExamples": return <AdvancedExamples />;
    case "moneyLab": return <MoneyLab />;
    case "informationLab": return <InformationLab />;
    case "adviceLab": return <AdviceLab />;
    case "furnitureLab": return <FurnitureLab />;
    case "homeworkLab": return <HomeworkLab />;
    case "faceToFace": return <FaceToFace />;
    case "threeQuestionTest": return <ThreeQuestionTest />;
    case "trapNote": return <TrapNote />;
    case "commonErrors": return <CommonErrors />;
    case "manyMuchIQ": return <ManyMuchIQ />;
  }
}

function sourceHeadingFor(slide: Slide23): string | undefined {
  return slide.sourceIndex === undefined ? undefined : SOURCE_SECTIONS[slide.sourceIndex];
}

export function SlideView23({ s, onExit }: { s: Slide23; onExit: () => void }) {
  switch (s.kind) {
    case "cover": return <Cover />;
    case "objectives": return <Objectives />;
    case "lesson":
      return (
        <Frame mascot={s.mascot} step={s.step} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.lead} tip={s.tip}>
          {s.blocks.map((block, i) => (
            <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}>
              <BlockView block={block} />
            </div>
          ))}
        </Frame>
      );
    case "ex":
      return (
        <Frame mascot={s.mascot} badge={s.badge} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.subtitle}>
          <ExerciseView exercise={s.ex} />
        </Frame>
      );
    case "goldenSummary": return <GoldenSummary />;
    case "magicTable": return <MagicTable />;
    case "sevenRules": return <SevenRules />;
    case "roadmap": return <Roadmap />;
    case "quiz":
      return (
        <Frame
          mascot={s.mascot}
          badge="الاختبار النهائي"
          title={<Rich text={s.title} />}
          lead="أسئلة جديدة تقيس: Countable / Uncountable، a/an، some/any، There is/are، How many/How much، many/much، information/advice/furniture، والوحدات."
        >
          <FinalQuiz lesson={23} accent="bg-indigo-700" />
        </Frame>
      );
    case "closing": return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide23): string {
  if (slide.kind === "cover") return "الغلاف";
  return slide.title;
}

const SECTION_COLORS: Record<string, string> = {
  "البداية": "text-slate-500",
  "العدّ: Countable": "text-emerald-700",
  "الكمية: Uncountable": "text-violet-700",
  "قواعد a / an": "text-indigo-700",
  "المعنى والسياق": "text-sky-700",
  "There is / There are": "text-cyan-700",
  "some / any": "text-teal-700",
  "How many / How much": "text-amber-700",
  "كلمات خاصة ووحدات": "text-fuchsia-700",
  "المقارنة والاختبار": "text-rose-700",
  "التدريبات والمحقق": "text-orange-700",
  "التحديات النهائية": "text-pink-700",
  "الخاتمة": "text-slate-600",
};

function Rail({
  index,
  setIndex,
  onExit,
  onClose,
}: {
  index: number;
  setIndex: (next: number) => void;
  onExit: () => void;
  onClose?: () => void;
}) {
  const groups = useMemo(() => {
    const out: { section: string; indexes: number[] }[] = [];
    SLIDES.forEach((slide, i) => {
      const last = out[out.length - 1];
      if (last?.section === slide.section) last.indexes.push(i);
      else out.push({ section: slide.section, indexes: [i] });
    });
    return out;
  }, []);
  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">
          → جميع الدروس
        </button>
        <div className="font-head mt-2 text-lg font-bold text-slate-900">
          <Rich text="الدرس 23 · Countable & Uncountable Nouns" />
        </div>
        <En className="text-xs font-semibold text-indigo-700">🧮 {LAB_NAME_23}</En>
        <div className="mt-2 rounded-lg bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-700">
          {SOURCE_NUMBERED_COUNT} قسمًا من المصدر · {SLIDES.length} شريحة
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] ?? "text-slate-400"}`}>
              <Rich text={group.section} />
            </div>
            {group.indexes.map((i) => {
              const active = index === i;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setIndex(i);
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${
                    active ? "bg-indigo-700 text-white shadow" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/25" : "bg-slate-100"}`}>
                    {i + 1}
                  </span>
                  <span className="truncate font-semibold">{slideTitle(SLIDES[i])}</span>
                  <span className="mr-auto text-base">{SLIDES[i].mascot}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسافة</div>
    </aside>
  );
}

export default function Lesson23({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const total = SLIDES.length;
  const navigation = useMemo(
    () => ({
      next: () => setIndex((value) => Math.min(value + 1, total - 1)),
      prev: () => setIndex((value) => Math.max(value - 1, 0)),
    }),
    [total]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (menu) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(target.tagName)) return;
      if (event.key === "ArrowLeft") navigation.next();
      if (event.key === "ArrowRight") navigation.prev();
      if (event.key === " ") {
        event.preventDefault();
        navigation.next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigation, menu]);

  useEffect(() => {
    document.getElementById("l23-main")?.scrollTo({ top: 0 });
  }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return (
    <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f5f4fd] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">
          <Rail index={index} setIndex={setIndex} onExit={onExit} />
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden"
              aria-label="فهرس"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500">
                <Rich text={`${slide.section} · `} />
                <span className="text-slate-800">
                  <Rich text={slideTitle(slide)} />
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-indigo-700 via-violet-600 to-sky-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {index + 1} / {total}
            </span>
          </header>
          <main id="l23-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div key={index} className="pop mx-auto max-w-4xl">
              <SlideView23 s={slide} onExit={onExit} />
            </div>
          </main>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button
                onClick={navigation.prev}
                disabled={index === 0}
                className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30"
              >
                → السابق
              </button>
              <span className="h-6 w-px bg-slate-200" />
              <button
                onClick={navigation.next}
                disabled={index === total - 1}
                className="rounded-full bg-indigo-700 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30"
              >
                التالي ←
              </button>
            </div>
          </div>
        </div>
      </div>
      {menu && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <Rail index={index} setIndex={setIndex} onExit={onExit} onClose={() => setMenu(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
